


                    NightGuide.toolbar("ngProfilo");
                



                    NightGuide.toolbar("ngProfiloFoto");
                

                    NightGuide.header("ngProfiloFoto");
                







            NLUtility.setCookie(NightGuide.COOKIE_UTENTE, null, -1);
            NLUtility.setCookie(NightGuide.COOKIE_CITTA, null, -1);
            NLUtility.setCookie(NightGuide.COOKIE_SEARCH_ADVISOR, null, -1);
        





                    NightGuide.toolbar("ngProfiloEmail");
                

                    NightGuide.header("ngProfiloEmail");
                



                    NightGuide.toolbar("ngProfiloEmailDone");
                

                    NightGuide.header("ngProfiloEmailDone");
                



                    NightGuide.toolbar("ngProfiloNotifiche");
                

                    NightGuide.header("ngProfiloNotifiche");
                



                    NightGuide.toolbar("ngVetrine");
                

                    NightGuide.header("ngVetrine");
                

                    NightGuide.searchBox(
                        "#ngVetrineSearchBox", 
                        "vetrine.php", 
                        "NightGuide.addVetrina", 
                        ".ng-vetrine", 
                        false, 
                        true, 
                        null, 
                        "Cerca vetrina per nome...", 
                        "idCategoria", 
                        "Seleziona una categoria...");
                



                    NightGuide.toolbar("ngLocale");
                

                        NightGuide.subheaderLocale("ngLocaleSubheader");
                    



                    NightGuide.toolbar("ngRegisterDone");
                

                    NightGuide.header("ngRegisterDone");
                



                    NightGuide.toolbar("ngFoto");
                

                    NightGuide.header("ngFoto");
                

                    NightGuide.searchBox(
                        "#ngFotoSearchBox", 
                        "foto.php", 
                        "NightGuide.addFoto", 
                        ".ng-foto", 
                        true, 
                        false, 
                        null, 
                        "Cerca evento per nome...");
                



                    NightGuide.toolbar("ngVisite");
                

                    NightGuide.header("ngVisite");
                



                    NightGuide.toolbar("ngRecover");
                



                    NightGuide.toolbar("ngLocaleAppuntamenti");
                

                        NightGuide.subheaderLocale("ngLocaleAppuntamentiSubheader");
                    



                    NightGuide.toolbar("ngLocaleInfo");
                

                        NightGuide.subheaderLocale("ngLocaleInfoSubheader");
                    





                    NightGuide.toolbar("ngBase");
                

                    NightGuide.header("ngBase");
                



                    NightGuide.header("ngHome", true, 45);
                



                    NightGuide.toolbar("ngAppuntamenti");
                

                    NightGuide.header("ngAppuntamenti");
                

                    NightGuide.searchBox(
                        "#ngAppuntamentiSearchBox", 
                        "appuntamenti.php", 
                        "NightGuide.addAppuntamento", 
                        ".ng-appuntamenti", 
                        true, 
                        true, 
                        null, 
                        "Cerca...");
                



                    NightGuide.toolbar("ngRegister");
                

                                NightGuide.dateBox($('#liCompleanno'), "compleanno", null, null, null, null);
                            



                    NightGuide.toolbar("ngCitta");
                

                    NightGuide.header("ngCitta", true);
                



                    NightGuide.toolbar("ngProfiloDone");
                

                    NightGuide.header("ngProfiloDone");
                





                    NightGuide.toolbar("ngAppuntamento");
                

                        NightGuide.subheaderLocale("ngLocaleSubheader");
                    



                    NightGuide.toolbar("ngRecoverDone");
                

                    NightGuide.header("ngRecoverDone");
                







                    NightGuide.toolbar("ngMappa");
                



                    NightGuide.toolbar("ngCondizioni");
                

                    NightGuide.header("ngCondizioni");
                



                    NightGuide.toolbar("ngLocaleGeo");
                



                    NightGuide.toolbar("ngTest");
                

                    NightGuide.header("ngTest");
                    setTimeout(function(){NLUtility.showLoading()},500);
                



                    NightGuide.toolbar("ngProfiloGeo");
                



                    NightGuide.toolbar("ngVetrina");
                

                        NightGuide.subheaderLocale("ngVetrinaSubheader");
                    



                    NightGuide.toolbar("ngUtentiRisultato");
                



                    NightGuide.toolbar("ngOfferta");
                

                        NightGuide.subheaderLocale("ngLocaleSubheader");
                    



                    NightGuide.toolbar("ngPrivacy");
                

                    NightGuide.header("ngPrivacy");
                



                    NightGuide.toolbar("ngLocali");
                

                    NightGuide.header("ngLocali");
                

                    NightGuide.searchBox(
                        "#ngLocaliSearchBox", 
                        "locali.php", 
                        "NightGuide.addLocale", 
                        ".ng-locali", 
                        false, 
                        true, 
                        null, 
                        "Cerca locale per nome...", 
                        "idCategoria", 
                        "Seleziona una categoria...");
                



                    NightGuide.toolbar("ngCredits");
                

                    NightGuide.header("ngCredits");
                



                    NightGuide.toolbar("ngConversazioni");
                

                    NightGuide.header("ngConversazioni");
                



                    NightGuide.toolbar("ngGallery");
                

                        NightGuide.subheaderLocale("ngLocaleSubheader");
                    



                    NightGuide.toolbar("ngProfiloCancella");
                

                    NightGuide.header("ngProfiloCancella");
                



                    NightGuide.toolbar("ngOpzioni");
                

                    NightGuide.header("ngOpzioni");
                



                    NightGuide.toolbar("ngUtenti");
                



                    NightGuide.toolbar("ngLoginFb");
                

                    NightGuide.header("ngLoginFb");
                



                    NightGuide.toolbar("ngProfiloModifica");
                

                                NightGuide.dateBox($('#ngProfiloModificaCompleanno'), "compleanno");
                            



                    NightGuide.toolbar("ngProfiloPassword");
                

                    NightGuide.header("ngProfiloPassword");
                



                    NightGuide.toolbar("ngMessaggi");
                

                    NightGuide.header("ngMessaggi");
                



                    NightGuide.toolbar("ngLocaleGalleries");
                

                        NightGuide.subheaderLocale("ngLocaleGalleriesSubheader");
                    

document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">');
document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');

document.write('<link rel="stylesheet" href="jquery.mobile/themes/nightguide.min.css" />');
document.write('<link rel="stylesheet" href="jquery.mobile/jquery.mobile.structure-1.0.1.min.css" />');
document.write('<link rel="stylesheet" href="jquery.mobile/datebox/jquery.mobile.datebox.min.css" />');
document.write('<link rel="stylesheet" href="photoswipe/photoswipe.css" />');

document.write('<link rel="stylesheet" href="css/photoswipe.css" />');
document.write('<link rel="stylesheet" href="css/nightguide.css" />');


if (window.navigator.userAgent.toLowerCase().indexOf("ipad") > -1)
{
    document.write('<link rel="stylesheet" href="css/ipad.css" />');
}

document.write('<script type="text/javascript" src="js/json2.js"></script>');
document.write('<script type="text/javascript" src="photoswipe/lib/klass.min.js"></script>');
document.write('<script type="text/javascript" src="jquery/jquery-1.7.1.min.js"></script>');
document.write('<script type="text/javascript" src="jquery/jquery.md5.js"></script>');
document.write('<script type="text/javascript" src="js/jquerymobile.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/jquery.mobile-1.0.1.min.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/datebox/jquery.mobile.datebox.min.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/datebox/i8n/jquery.mobile.datebox.i18n.it.utf8.js"></script>');

document.write('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true" ></script>');
//document.write('<script type="text/javascript" src="js/googleanalytics.js" ></script>');

//document.write('<script type="text/javascript" src="js/gm.js" ></script>');
document.write('<script type="text/javascript" src="js/ga.js" ></script>');
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37414385-1']);
_gaq.push(['_setDomainName', 'none']);

document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.services.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.extensions.js"></script>');
document.write('<script type="text/javascript" src="photoswipe/code.photoswipe.jquery-3.0.4.mod.js"></script>');

document.write('<script type="text/javascript" src="js/configuration.js"></script>');
document.write('<script type="text/javascript" src="js/utility.js"></script>');
document.write('<script type="text/javascript" src="js/nightguide.js"></script>');
document.write('<script type="text/javascript" src="js/phonegap.js"></script>');
document.write('<script type="text/javascript" src="js/encoder.js"></script>');
document.write('<script type="text/javascript" src="js/facebook.js"></script>');
document.write('<script type="text/javascript" src="js/twitter.js"></script>');
document.write('<script type="text/javascript" src="js/app.js"></script>');



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-27321389-6']);
//_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
ga.src = 'js/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function NLSearchDate(date, url, listview)
{
    NLUtility.log('NLSearchDate');
    url += (url.indexOf("?") > -1) ? ("&") : ("?");
    url += "date=" + NLUtility.formatDate(this.input.context.value);
 
    NLUtility.log(url);
    
    NLUtility.showLoading();
    
    $.ajax({
        url: url,
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.log(data);
            NLUtility.hideLoading();
            $(listview).children().remove();
            $(listview).append(data);
            $(listview).listview('refresh');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLUtility.showError("Ricerca per data fallita. Verifica la connessione ad internet!");
        }
    }); 
    
    return false;
}

function NLSearchDateEx(date)
{
    $('.ui-page-active').find('#ngSearchExForm').submit();
}

if (typeof NLUtility == "undefined" || !NLUtility) {    
    var NLUtility = {};
}

NLUtility.NOTIFYING = false;

NLUtility.more = function(url, listview)
{
    NLUtility.log("NLUtility.more " + url);
    var $more = $(listview).children().last();
    $more.addClass("ng-more-disabled");
    
    var $link = $more.find("a");
    var onclick = $link.attr('onclick');
    $link.removeAttr('onclick');
    
    var $loading = $more.find(".ng-more-loading");
    $loading.show();
    
    $.ajax({
        url: url,
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            $more.remove();
            $(listview).append(data);
            $(listview).listview('refresh');    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $loading.hide();
            $more.removeClass("ng-more-disabled");
            $link.attr('onclick', onclick);
            NLUtility.showError("Paginazione fallita. Verifica la connessione ad internet!");
        }
    }); 
}

NLUtility.formatDate = function(date) {
    var formattedDate = date;
    var splitDate = date.split("/");
    if (splitDate.length == 3) {
        formattedDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
    }
    return formattedDate;
}

NLUtility.searchEx = function(sender, selectName, addFunction)
{
    var $form = $(sender);
    var listview = $form.find('input[name="element"]').val();    
    var url = NG_URL + $form.find('input[name="url"]').val();
    url += ((url.indexOf("?") > -1)?("&"):("?")) + "pagesize="+NG_PAGESIZE+"&idCitta="+NightGuide.getCitta().id;
    var date = $form.find('input[name="date"]').val();
    if (date && date.length)
    {
        url += "&date=" + NLUtility.formatDate(date);
    }
    var selectValue = null;
    if (selectName)
    {
        selectValue = $form.find('select[name="'+selectName+'"]').val();
        if (selectValue && selectValue.length)
        {
            url += "&" + selectName + "=" + selectValue;
        }
    }
        
    var $search, lat, lng, failed = false;
    
    var geo = $form.find('input[name="geosearch"]:checked').val();
    if (!geo || geo == "0")
    {
        $search = $form.find('input[name="term"]');
        var term = $search.val();
        if (term && term.length > 0)
        {
            url += "&search=" + term;
        }
        //$form.find('select[name="distance"]').val('').selectmenu('refresh');
        
        NLUtility._searchEx(url, listview, $search, addFunction, 0);
    }
    else
    {   
        if (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined")
        {
            NLUtility.showLoading();
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    NLUtility.hideLoading();
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    url += "&lat=" + lat + "&lng=" + lng;
                    
                    var distance = $form.find('select[name="distance"]').val();
                    if (distance && distance.length > 0)
                    {
                        url += "&distance=" + distance;
                    }    
                    //$form.find('input[name="term"]').val("");
                    
                    NLUtility._searchEx(url, listview, $search, addFunction, 0);
                }, 
                function(error) {
                    NLUtility.log('geolocation error: '+error.code+' message: '+error.message);
                    NLUtility.showError("Non è possibile determinare la tua posizione!");
                    failed = true;
                });
        }
    }
    
    return false;
}

NLUtility._searchEx = function(url, listview, $search, addFunction, startindex)
{
    NLUtility.log("_searchEx: " + url + "&startindex=" + startindex);
    
    NLUtility.showLoading();

    $.ajax({
        url: url + "&startindex=" + startindex,
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            NLUtility.log(data);
            $(listview).children().remove();
            for (var i = 0; i < data.length; i++) {
                eval(addFunction+"('"+listview+"',"+JSON.stringify(data[i])+")");
            }
            if (data.length == NG_PAGESIZE) {
                NightGuide.addMore(url, startindex + NG_PAGESIZE, listview, addFunction);
            }
            $(listview).listview('refresh');
            if ($search) $search.blur();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLUtility.showError("Ricerca fallita. Verifica la connessione ad internet!");
        }
    }); 
}

NLUtility.showError = function(msg)
{
    NLUtility.showAlert(msg, true);
}

NLUtility.showMessage = function(msg)
{
    NLUtility.showAlert(msg, false);
}

NLUtility.showAlert = function(msg, isError)
{
    //NLUtility.log("NLUtility.showAlert: " + msg);
    
    NLUtility.hideLoading();
    
    var theme = (isError) ? ("a") : ("c");

    $( "<div class='ui-loader ui-overlay-shadow ui-body-" + theme + " ui-corner-all'><h1>"+ msg +"</h1></div>" )
        .css({"display": "block", "opacity": 0.86, "top": $(window).scrollTop() + 200})
        .appendTo( $.mobile.pageContainer )
        .delay( 2000 )
        .fadeOut( 2000, function() {
                $(this).remove();
        });
}

NLUtility.checkEmail = function(email)
{
    var emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegEx.test(email);
}

NLUtility.checkAlpha = function(text)
{
    var alphaRegEx = /^[a-zA-Zàèéìòùç '.,\-_]+$/;
    return alphaRegEx.test(text);
}

NLUtility.checkUsername = function(text)
{
    var userRegEx = /^[0-9a-zA-Zàèéìòùç '.,\-_]+$/;
    return userRegEx.test(text);
}

NLUtility.sendImage = function(src, img, edited) 
{
    if (typeof Camera == "undefined" || typeof navigator.camera == "undefined")
    {
        NLUtility.showError("Per selezionare una nuova foto devi scaricare l'app dallo store.");
        return;
    }
    
    var source = (src == 'library') ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;

    var options = {
        quality: 45, 
        sourceType: source, 
        destinationType: Camera.DestinationType.DATA_URL,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG
        /*
        targetWidth: 400,
        targetHeight: 300
        */
    };
    
    navigator.camera.getPicture(success, fail, options);
    
    function success(imageData) {
            $(img).attr('src', 'data:image/jpeg;base64,' + imageData);
            $(edited).val("true");
    }

    function fail(message) {NLUtility.log("Camera Error: " + message);}
}

NLUtility.scrollToBottom = function()
{
    NLUtility.log("scrollToBottom");
    //$.mobile.silentScroll($(document).height());
    $('html,body').animate({scrollTop: $(document).height()});
}

NLUtility.sendMessage = function($form, id, messaggio, callback)
{
    NLUtility.log("sendMessage("+id+", "+messaggio+")");
    var utente = NightGuide.getUtente();
    
    //NLUtility.showLoading();
    $("#ngMessaggiLoading").show();
    $("#ngMessaggiInvia").hide();
    var $messaggio = $form.find('input[name="messaggio"]');
    $messaggio.attr('readonly', true);
    
    $.ajax({
        url: NG_URL + "messaggi.php",
        data: {"action": "send", "id": id, "username": utente.username, "password": utente.password, "messaggio": messaggio},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                //NLUtility.hideLoading();
                $("#ngMessaggiLoading").hide();
                $("#ngMessaggiInvia").show();
                $messaggio.attr('readonly', false);
                NLUtility.addMessages(data, callback);
                $form.find('input[name="messaggio"]').val("");
            }
            else {
                $("#ngMessaggiLoading").hide();
                $("#ngMessaggiInvia").show();
                $messaggio.attr('readonly', false);
                NLUtility.showError('Impossibile inviare il messaggio!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#ngMessaggiLoading").hide();
            $("#ngMessaggiInvia").show();
            $messaggio.attr('readonly', false);
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLUtility.updateMessages = function()
{
    //NLUtility.log("updateMessages");
    
    if (!NightGuide.isLogged()) {
        NLUtility.log("--- stop updateMessages ---");
        return;
    }
    
    if ($("#ngMessaggi").length > 0) {
        var id = $('#ngMessaggiForm').find('input[name="id"]').val();
        //NLUtility.log("id destinatario = "+id);
        if (id && id > 0)
        {
            var utente = NightGuide.getUtente();
            if (utente)
            {
                $.ajax({
                    url: NG_URL + "messaggi.php",
                    data: {"username": utente.username, "password": utente.password, "id": id},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        NLUtility.hideLoading();
                        if (data && data.messaggi) {
                            NLUtility.addMessages(data.messaggi);
                            if (NightGuide.isLogged()) {
                                setTimeout("NLUtility.updateMessages()", 2000);
                            }
                            else {
                                NLUtility.log ("--- stop updateMessages ---");
                            }
                        }
                        //else {
                        //    NLUtility.showError('Impossibile scaricare i nuovi messaggi!');
                        //}
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                });
            }
        }
    }
    else {
        NLUtility.log ("--- stop updateMessages ---");
    }
}

NLUtility.addMessages = function(data, callback)
{
    //NLUtility.log("addMessages");
    //NLUtility.log(data);

    var $messaggi = $(".ng-messaggi");
    if ($messaggi.length == 0)
        return;
    
    var count = 0;
    //$(".ng-messaggio,.ng-messaggio-destinatario", data).each(function() {
    for(var i = 0; i < data.length; i++)
    {
        //NLUtility.log(data[i].id);
        if ($('div[data-id="'+data[i].id+'"]', $("#ngMessaggi")).length == 0) 
        {
            NightGuide.addMessaggio(".ng-messaggi", data[i]);
            count++;
        }
    }
    
    
    if (count > 0) {
        if (callback) {
            callback();
        }
        NLUtility.scrollToBottom();
    }
}

NLUtility.createBadge = function(selector)
{
    $(selector).each(function() {
        if ($(this).find(".ng-badge").length == 0)
        {
            $badge = $('<div/>').attr({"class":"ng-badge"});
            $(this).append($badge);
        }
    });
}

NLUtility.playSound = function(filename)
{
    if (!NG_PHONEGAP)
        return;
    
    //NLUtility.log("play sound");
    //var audio = document.getElementById("ngAudio");
    //audio.play();
    //$("#ngAudio").jPlayer("play");
    
    //NLUtility.log("playSound "+NL_BASEPATH + "/audio/message.mp3");
    
    if (typeof Media != "undefined")
    {
        //var host = $.mobile.path.parseUrl(document.location).host;
        var mediaPath = NG_URL + "audio/" + filename;
        myMedia = new Media(mediaPath,
            function() {NLUtility.log("playSound success");},
            function(error) {NLUtility.log("playSound error code: " + error.code + ", message: " + error.message);}
        );
        myMedia.play();
    }
}

NLUtility.azzeraNotifiche = function()
{
    $('.ng-badge').remove();
    $("#ngMessaggiCount").text("");
    $("#ngVisiteCount").text("");

    if (NG_PHONEGAP) {
        window.plugins.toolBar.update("ngToolBar", "btnMessaggi", "", "icon_messaggi.png", 0);
        window.plugins.toolBar.update("ngToolBar", "btnVisite", "", "icon_visite.png", 0);
    }
}

NLUtility.notify = function()
{
    //NLUtility.log("notify");
    
    if (!NightGuide.isLogged()) 
    {
        NLUtility.NOTIFYING = false;
        return;
    }
    
    NLUtility.NOTIFYING = true;
    
    $.ajax({
        url: NG_URL + "notify.php",
        data: {username: NightGuide.getUtente().username, password: NightGuide.getUtente().password},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (!data || !NightGuide.isLogged()) {
                NLUtility.azzeraNotifiche();
                return;
            }
            
            //NLUtility.log(data);
            
            if (data.messaggi == 0) {
                $('.ng-icon-messaggi').find('.ng-badge').remove();
                $("#ngMessaggiCount").text("");
                if (NG_PHONEGAP) {
                    window.plugins.toolBar.update("ngToolBar", "btnMessaggi", "", "icon_messaggi.png", 0);
                }
            }
            else {
                NLUtility.updateBadge('.ng-icon-messaggi', data.messaggi, "ngMessaggiCount", "messaggio.mp3");
            }
            
            if (data.visite == 0) {
                $('.ng-icon-visite').find('.ng-badge').remove();
                $("#ngVisiteCount").text("");
                if (NG_PHONEGAP) {
                    window.plugins.toolBar.update("ngToolBar", "btnVisite", "", "icon_visite.png", 0);
                }
            }
            else {
                NLUtility.updateBadge('.ng-icon-visite', data.visite, "ngVisiteCount", "visita.mp3");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            NLUtility.log(NG_URL + "notify.php irraggiungibile!");
        }
    });
   
    if (NightGuide.isLogged()) {
        setTimeout("NLUtility.notify()", 2000);
    }
}

NLUtility.updateBadge = function(selector, count, id, sound)
{
    NLUtility.createBadge(selector);
    $badge = $(selector).find('.ng-badge');
    
    old = $("#"+id).text();
    if (!old || old.length == 0)
        old = 0;
    
    //NLUtility.log(old);
    
    $badge.each(function() { 
        $(this).text(count); 
    });
    
    $("#"+id).text(count);
    
    if (NG_PHONEGAP && old != count)
    {
        if (id == "ngMessaggiCount")
        {
            window.plugins.toolBar.update("ngToolBar", "btnMessaggi", "", "icon_messaggi.png", count);
            if ($.mobile.activePage.attr("id") == "ngConversazioni")
            {
                NightGuide.updateConversazioni(true);
            }
        }
        else if (id == "ngVisiteCount")
        {
            window.plugins.toolBar.update("ngToolBar", "btnVisite", "", "icon_visite.png", count);
            if ($.mobile.activePage.attr("id") == "ngVisite")
            {
                NightGuide.updateVisite(true);
            }
        }
    }
    
    if (count > old)
    {
        NLUtility.playSound(sound);
    }
}

NLUtility.restoreBadge = function(id, selector)
{
    //NLUtility.log("restoreBadge: id = " + id + " selector = " + selector);
    var count = $("#"+id).text();
    if (count > 0) {
        NLUtility.createBadge(selector);
        $(selector).find(".ng-badge").each(function() {
            $(this).text(count);
        });
    } 
}

NLUtility.adjustTop = function(element)
{
    $(element).css("top", $(".ui-header").height());
}

NLUtility.urlencode = function(text)
{
    if (text)
        return NLEncoder.encode(text);
    else
        return "";
}

NLUtility.urldecode = function(text)
{
    if (text)
        return NLEncoder.decode(text);
    else
        return text;
}

NLUtility.clearDomCache = function()
{
    NLUtility.log("NLUtility.clearDomCache: " + $('div[data-dom-cache="true"]').length);
    $('div[data-dom-cache="true"]').remove();
}

NLUtility.isAndroid = function()
{
    return window.navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

NLUtility.isIPhone = function()
{
    return window.navigator.userAgent.toLowerCase().indexOf("iphone") > -1
        || window.navigator.userAgent.toLowerCase().indexOf("ipod") > -1; 
}

NLUtility.isIPad = function()
{
    return window.navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
}

NLUtility.isIOS = function()
{
    return NLUtility.isIPhone() || NLUtility.isIPad();
}

NLUtility.setCookie = function(c_name,value,exdays)
{
    //NLUtility.log("NLUtility.setCookie");
    if (NG_PHONEGAP)
    {
        if (exdays > 0) {
            //NLUtility.log("Save to LocalStorage");
            window.localStorage.setItem(c_name, value);
        }
        else {
            //NLUtility.log("Remove from LocalStorage");
            window.localStorage.removeItem(c_name);
        }
    }
    else
    {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
        //NLUtility.log(document.cookie);
    }
}

NLUtility.getCookie = function(c_name)
{
    //NLUtility.log("NLUtility.getCookie: " + c_name);
    //NLUtility.log(document.cookie);
    if (NG_PHONEGAP)
    {
        //NLUtility.log("Read from LocalStorage");
        return window.localStorage.getItem(c_name);
    }
    else
    {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
        {
        var x = cookies[i].substr(0, cookies[i].indexOf("="));
        var y = cookies[i].substr(cookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g,"");
        if (x == c_name)
        {
            //NLUtility.log(x + " = " + y);
            //NLUtility.log(unescape(y));
            return unescape(y);
        }
        }

        //NLUtility.log("cookie not found");
        return null;
    }
}

NLUtility.pageBeforeChange = function(event, data)
{
    if (NG_PHONEGAP && typeof data.toPage == "string")
    {
        NLUtility.log("NLUtility.pageBeforeChange: " + data.toPage);
        var splitted = data.toPage.split('?');
        if (splitted.length > 0)
        {
            var page = splitted[0];
            if (splitted.length > 1)
            {
                var queryParams = splitted[1].split('&');
                var query = {};
                for(var i = 0; i < queryParams.length; i++)
                {
                    var splittedParam = queryParams[i].split("=");
                    if (splittedParam.length > 0) {
                        var key = splittedParam[0];
                        if (splittedParam.length > 1) {
                            var value = splittedParam[1];
                            query[key] = value;
                        }
                    }
                    
                }
                data.toPage = page;
                var storageKey = page.substring(page.lastIndexOf("/")+1);
                NLUtility.log("LOCAL STORAGE KEY = " + storageKey);
                NLUtility.log(query);
                window.localStorage.setItem(storageKey, JSON.stringify(query));
                return;
            }
        }
        //window.localStorage.removeItem(page);
    }
    else
    {
        NLUtility.log("NLUtility.pageBeforeChange: skip");
    }
}

NLUtility.getUrlVars = function(url)
{
    if (NG_PHONEGAP)
    {
        if (!url)
            url = window.location.href;
        
        var storageKey = url.substring(url.lastIndexOf("/")+1);
        NLUtility.log("NLUtility.getUrlVars KEY = " + storageKey);
        
        var vars = [];
        
        var query = window.localStorage.getItem(storageKey);
        if (query)
        {
            NLUtility.log("KEY EXISTS");
            vars = JSON.parse(query);
            NLUtility.log(vars);
        }
        else
        {
            NLUtility.log("KEY NOT EXISTS");
        }
        
        return vars;
    }
    else
    {
        return NLUtility.getUrlVarsFromURL(url);
    }
}

NLUtility.getUrlVarsFromURL = function(url)
{
    var vars = [];
    var hash;

    if (!url)
        url = window.location.href;

    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}

NLUtility.getUrlVar = function(key, url)
{
    var v = NLUtility.getUrlVars(url)[key];
    //NLUtility.log("NLUtility.getUrlVar: " + key + " = "+ v);
    return v;
}

NLUtility.getUrlVarAsString = function(key, url)
{
    var urlVar = NLUtility.getUrlVar(key, url);
    if (urlVar == undefined)
        return "";
    else
        return urlVar;
}

NLUtility.getUrlBasePath = function()
{
    return window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
}

NLUtility.round = function(number, decimals)
{
    return number.substring(0, number.indexOf(".") + decimals + 1);
}

NLUtility.stripAlphaChars = function(s)
{
    return s.replace(/[^0-9]/g, '');
}

NLUtility.htmldecode = function(encodedStr)
{
    return $("<div/>").html(encodedStr).text();
}

NLUtility.showLoading = function()
{
    //NLUtility.log('NLUtility.showLoading');
    $('body').addClass('ui-loading');
}

NLUtility.hideLoading = function()
{
    //NLUtility.log('NLUtility.hideLoading');
    $('body').removeClass('ui-loading');
}

NLUtility.getPageURL = function(event)
{
    var url;
    if (event && event.target)
        url = $(event.target).attr("data-url");
    
    if (url && url.indexOf(".html") == -1)
        url = event.target.baseURI;
    
    return url;
}

NLUtility.formatDateTime = function(datetime)
{
    var formattedDateTime = datetime;
    var splittedDateTime = datetime.split(' ');
    if (splittedDateTime.length == 2) {
        var splittedDate = splittedDateTime[0].split('-');
        if (splittedDate.length == 3) {
            var date = splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0];
            var time = splittedDateTime[1];
            formattedDateTime = date + ' ' + time;
        }   
    }    
    return formattedDateTime;
}

NLUtility.formatCurrency = function(n)
{ 
   var decimals = 2;
   var decimal_sep = ",";
   var thousands_sep = ".";
   var c = isNaN(decimals) ? 2 : Math.abs(decimals); 
   var d = decimal_sep || ',', 

   t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,

   sign = (n < 0) ? '-' : '',

   i = parseInt(n = Math.abs(n).toFixed(c)) + '', 

   j = ((j = i.length) > 3) ? j % 3 : 0; 
   
   return "&euro;" + sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
}

NLUtility.markerURL = function(color, width, height)
{
    return "http://chart.apis.google.com/chart?cht=mm&chs="+width+"x"+height+"&chco=FFFFFF,"+color+",000000&ext=.png";
}

NLUtility.markerShadowURL = function()
{
    return "http://maps.google.com/mapfiles/shadow50.png";
}

NLUtility.removeHeader = function()
{
    NLUtility.log("NLUtility.removeHeader");
    $(".ui-header").remove();
}

NLUtility.addSpacer = function(pageId)
{
    NLUtility.log("NLUtility.addSpacer");
    var $page = $("#"+pageId);
    var $content = $page.find(".ui-content");
    if ($content.find('.ng-spacer').length == 0)
    {
        if ($content.find(".ng-header").length > 0)
        {
            $content.find(".ng-header").css({'padding-top':'55px'});
            NLUtility.log("Header padding top added");
        }
        else
        {
            var $spacer = $('<div class="ng-spacer"/>');
            $content.prepend($spacer);
            NLUtility.log("Spacer added");
        }
    }
}

NLUtility.removeSpacer = function(pageId)
{
    NLUtility.log("NLUtility.removeSpacer");
    var $content = $("#"+pageId).find(".ui-content");
    if ($content.find(".ng-header").length > 0)
    {
        $content.find(".ng-header").css({'padding-top':'10px'});
        NLUtility.log("Header padding top removed");
    }
    else
    {
        $content.find(".ng-spacer").remove();
        NLUtility.log("Spacer removed");
    }
}

NLUtility.log = function(msg)
{
    if (NG_LOG)
    {
        if (window.console) console.log(msg);
    }
}

NLUtility.goBack = function()
{
    NLUtility.log("history.length = " + history.length);
    if (history.length == 2)
    {
        $.mobile.changePage("home.html");
    }
    else
    {
        history.go(-1);
    }
}

NLUtility.screenWidth = function()
{
    var w = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
    NLUtility.log("NLUtility.screenWidth = " + w);
    return w;
}

$(document).ready(function(){
    $("#jplayer").jPlayer({
        ready: function () {
            NLUtility.log("jplayer is ready");
            $(this).jPlayer("setMedia", {
                m4a: NL_BASEPATH+"/audio/message.m4a",
                oga: NL_BASEPATH+"/audio/message.ogg"
            });
        },
        swfPath: NL_BASEPATH+"/jplayer",
        supplied: "m4a, oga"
    });
});


document.addEventListener('deviceready', function() {      
    $('#frame').preventUglyScroll();
    alert('ok');
});

// Prevent ugly scrolling on this element
(function($){
    $.fn.preventUglyScroll = function(){

        var node = this[0];

        node.ontouchstart = function(event) {
            touchStart = event;
            frameStart = $(node).offset().top;
        }

        node.ontouchmove = function(event){

            // block all two finger gestures
            if(event.touches.length > 1) {
                event.preventDefault();
                return false;
            }

            event.preventDefault();

            var yDiff     = event.pageY - touchStart.pageY;
            var newTop  = yDiff + frameStart;
            var hMin     = 460 - $(node).height();
            if(newTop <= 0 && newTop > hMin) {
                $(node).css('margin-top', newTop);
            }
        }
    }
})(jQuery);


if (typeof NLTwitter == "undefined" || !NLTwitter) {    
    var NLTwitter = {};
}

NLTwitter.REDIRECT = TW_REDIRECT;

NLTwitter.tweetOfferta = function(id, idCitta)
{
    NLUtility.log("NLTwitter.tweetOfferta");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-offerta.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLTwitter.tweetDialog(
                data.url + "/offerta/offerta.php?idofferta="+id, 
                "Non perderti l'offerta " + data.nome + " di " + data.nomevetrina + " su NightGuide.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLTwitter.tweetVetrina = function(id, idCitta)
{
    NLUtility.log("NLTwitter.tweetVetrina");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-vetrina.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLTwitter.tweetDialog(
                data.url + data.nomevetrinaseo, 
                "Non perderti le offerte di " + data.nome + " su NightGuide.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLTwitter.tweetLocale = function(id, idCitta)
{
    NLUtility.log("NLTwitter.tweetLocale");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-locale.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLTwitter.tweetDialog(
                data.url + "/locali/locale.php/idluogo=" + id + "/index.htm", 
                "Visita il locale " + data.nome + " su NightGuide.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLTwitter.tweetAppuntamento = function(id, idCitta)
{
    NLUtility.log("NLTwitter.tweetAppuntamento");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-appuntamento.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLTwitter.tweetDialog(
                data.url + "/appuntamento/serata.php?idserata=" + id, 
                "Non perderti l'appuntamento " + data.nome + " " + data.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLTwitter.tweetFoto = function(id, idCitta)
{
    NLUtility.log("NLTwitter.tweetFoto");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-gallery.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLTwitter.tweetDialog(
                data.url + "/foto/gallery.php?idgallery=" + id,
                "Guarda le foto della serata " + data.nome + " " + data.data + " presso " + data.nomelocale);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLTwitter.tweetDialog = function(url, text)
{
    NLUtility.log("NLTwitter.tweetDialog");
    
    if (typeof window.plugins != "undefined" 
        && typeof window.plugins.childBrowser != "undefined")
    {
        NLUtility.log("ChildBrowser available");
        
        var cb = window.plugins.childBrowser;

        cb.onLocationChange = function(loc)
        {
            if (loc.indexOf("https://twitter.com/intent/tweet/complete") == 0) 
            {
                NLUtility.log("ChildBrowser location is redirect")
                cb.close();
                NLUtility.showMessage("Tweet inviato");
            }
        };
        
        var page = "https://twitter.com/intent/tweet"
            + "?url=" + NLUtility.urlencode(url)
            + "&via=" + NLUtility.urlencode(TW_NAME)
            + "&text=" + NLUtility.urlencode(text);
            //+ "&hashtags=" + hashtags;
        
        NLUtility.log(page);
        
        cb.showWebPage(page);
    }
    else
    {
        NLUtility.showError("Per condividere su Twitter devi scaricare l'app dallo store!");
    }
}

/*

NLTwitter.TOKEN = "";
NLTwitter.SECRET_TOKEN = "";
NLTwitter.USER_NAME = "";
NLTwitter.USER_ID = "";

NLTwitter.tweet = function(message)
{
    NLUtility.log("NLTwitter.tweet: " + message);
    
    var cb = window.plugins.childBrowser;
    if (cb)
    {
        NLTwitter.connect(function()
        {
            NLUtility.log("callback");
        });
    }
}

NLTwitter.connect = function(callback)
{
    NLUtility.log("NLTwitter.connect");
    
    accessor = {
        consumerKey   : TW_CONSUMER_KEY,
        consumerSecret: TW_CONSUMER_SECRET,
        serviceProvider: { 
            signatureMethod     : "HMAC-SHA1",
            requestTokenURL     : "http://api.twitter.com/oauth/request_token",
            userAuthorizationURL: "https://api.twitter.com/oauth/authorize",
            accessTokenURL      : "https://api.twitter.com/oauth/access_token",
            echoURL             : "http://localhost/oauth-provider/echo"
        }
    };

    var message = {
        method: "post", 
        action: accessor.serviceProvider.requestTokenURL,
        parameters: [["scope", "http://www.google.com/m8/feeds/"]]
    };
    
    var requestBody = OAuth.formEncode(message.parameters);
    
    OAuth.completeRequest(message, accessor);
    
    var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
    
    var requestToken = new XMLHttpRequest();
    
    requestToken.onreadystatechange = function receiveRequestToken() {
        NLUtility.log("receiveRequestToken");
        if (requestToken.readyState == 4) {
            NLUtility.log("ReadyState == 4");
            NLUtility.log("RequestToken.responseText: " + requestToken.responseText);
            var results = OAuth.decodeForm(requestToken.responseText);
            NLUtility.log("Results: " + results);
            var oauth_token = OAuth.getParameter(results, "oauth_token");
            NLUtility.log("OAuth Token: " + oauth_token);
            var authorize_url = "http://api.twitter.com/oauth/authorize?oauth_token="+oauth_token;
            NLUtility.log("Authorize URL: " + authorize_url);
            var cb = window.plugins.childBrowser;
            if (cb)
            {
                cb.onLocationChange = function(loc){
                    if (loc.indexOf(NLTwitter.REDIRECT) > -1) 
                    {
                        NLUtility.log("Location is redirect");
                        cb.close();
                        var results = OAuth.decodeForm(requestToken.responseText);
                        NLUtility.log(results);
                        message = {
                            method: "post", 
                            action: accessor.serviceProvider.accessTokenURL
                        };
                        OAuth.completeRequest(message, 
                        { 
                            consumerKey : accessor.consumerKey,
                            consumerSecret: accessor.consumerSecret,
                            token : OAuth.getParameter(results, "oauth_token"),
                            tokenSecret : OAuth.getParameter(results, "oauth_token_secret")
                        }
                        );
                        var requestAccess = new XMLHttpRequest();
                        requestAccess.onreadystatechange = function receiveAccessToken() {
                            NLUtility.log("receiveRequestToken");
                            if (requestAccess.readyState == 4) {
                                NLUtility.log("ReadyState == 4");
                                var params = NLTwitter.getUrlVars(requestAccess.responseText);
                                NLUtility.log("Params: " + params);
                                NLTwitter.TOKEN = params["oauth_token"];
                                NLUtility.log("TOKEN: " + NLTwitter.TOKEN );
                                NLTwitter.SECRET_TOKEN = params["oauth_token_secret"];
                                NLUtility.log("SECRET_TOKEN: " + NLTwitter.SECRET_TOKEN );
                                NLTwitter.USER_NAME = params["screen_name"];
                                NLUtility.log("USER_NAME: " + NLTwitter.USER_NAME );
                                NLTwitter.USER_ID = params["user_id"];
                                NLUtility.log("USER_ID: " + NLTwitter.USER_ID );
                                if (callback)
                                {
                                    NLUtility.log("Callback");
                                    callback();
                                }
                            }
                        };
                        requestAccess.open(message.method, message.action, true);
                        requestAccess.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
                        NLUtility.log("RequestAccess.send");
                        requestAccess.send(); 
                    }
                };
                
                NLUtility.log("ChildBrowser.showWebPage: " + authorize_url);
                cb.showWebPage(authorize_url);
            }
        }
    };
    
    requestToken.open(message.method, message.action, true);
    requestToken.setRequestHeader("Authorization", authorizationHeader);
    requestToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    NLUtility.log("RequestToken.send");
    requestToken.send(requestBody);
}

// helper
NLTwitter.getUrlVars = function (url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;  
}
 
// helper
NLTwitter.createOAuthAjaxData = function(url, method, params, success, error) {
    var ajax_data = {
        url: url,
        data: params,
        dataType: 'json',
        type: method,
        timeout: 60*1000,
        beforeSend: function(req){
            var message = {
                method: method,
                action: url
            };
            var message_params = params;
            message.parameters = message_params;
            NLUtility.log(message.parameters);
            OAuth.completeRequest(message, {
                consumerKey: accessor.consumerKey,
                consumerSecret: accessor.consumerSecret,
                token: NLTwitter.TOKEN,
                tokenSecret: NLTwitter.SECRET_TOKEN
            });
            NLUtility.log(message);
            req.setRequestHeader("oauth_consumer_key", accessor.consumerKey);
            req.setRequestHeader("oauth_nonce", message.parameters['oauth_nonce']);
            req.setRequestHeader("oauth_signature_method", 'HMAC-SHA1');
            req.setRequestHeader("oauth_token", NLTwitter.TOKEN);
            req.setRequestHeader("oauth_timestamp", message.parameters['oauth_timestamp']);
            req.setRequestHeader("oauth_version", '1.0');
            req.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        },
        success: success,
        error: error
    }
    return ajax_data;
}

NLTwitter.test = function()
{
    var success = function(data, responseText) {
        current_twitter_user = data;
    };

    var error = function(error){
        NLUtility.log(error['responseText']);
        current_twitter_user = null;
        NLUtility.log("problem getting twitter user");
    };

    var ajax_data = NLTwitter.createOAuthAjaxData('http://api.twitter.com/1/users/show.json', 'get', {
        screen_name: NLTwitter.USER_NAME, 
        user_id: NLTwitter.USER_ID
    }, success, error);

    $.ajax(ajax_data);
}
*/



window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@207000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=m@207000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,null,null,"m@207000000"],[["http://khm0.googleapis.com/kh?v=125\u0026hl=it-IT\u0026","http://khm1.googleapis.com/kh?v=125\u0026hl=it-IT\u0026"],null,null,null,1,"125"],[["http://mt0.googleapis.com/vt?lyrs=h@207000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=h@207000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,"imgtp=png32\u0026",null,"h@207000000"],[["http://mt0.googleapis.com/vt?lyrs=t@130,r@207000000\u0026src=api\u0026hl=it-IT\u0026","http://mt1.googleapis.com/vt?lyrs=t@130,r@207000000\u0026src=api\u0026hl=it-IT\u0026"],null,null,null,null,"t@130,r@207000000"],null,null,[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=70\u0026hl=it-IT\u0026","http://khm1.googleapis.com/kh?v=70\u0026hl=it-IT\u0026"],null,null,null,null,"70"],[["http://mt0.googleapis.com/mapslt?hl=it-IT\u0026","http://mt1.googleapis.com/mapslt?hl=it-IT\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=it-IT\u0026","http://mt1.googleapis.com/mapslt/ft?hl=it-IT\u0026"]],[["http://mt0.googleapis.com/vt?hl=it-IT\u0026","http://mt1.googleapis.com/vt?hl=it-IT\u0026"]],[["http://mt0.googleapis.com/mapslt/loom?hl=it-IT\u0026","http://mt1.googleapis.com/mapslt/loom?hl=it-IT\u0026"]]],["it-IT","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/it_it/mapfiles/api-3/11/11","3.11.11"],[1973254268],1.0,null,null,null,null,1,"",null,null,0,"http://khm.googleapis.com/mz?v=125\u0026",null,"https://earthbuilder.google.com","https://earthbuilder.googleapis.com"], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/it_it/mapfiles/api-3/11/11/main.js");
})();

// http://netzreport.googlepages.com/online_tool_for_url_en_decoding.html

if (typeof NLEncoder == "undefined" || !NLEncoder) {    
    var NLEncoder = {};
}

NLEncoder.unreserved = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.~";
NLEncoder.reserved = "!*'();:@&=+$,/?%#[]";
NLEncoder.allowed = NLEncoder.unreserved + NLEncoder.reserved;
NLEncoder.hexchars = "0123456789ABCDEFabcdef";

// --------------------------------- Encoding -------------------------------

// This function returns a percent sign followed by two hexadecimal digits.
// Input is a decimal value not greater than 255.
NLEncoder.gethex = function(decimal) {
    return "%" + NLEncoder.hexchars.charAt(decimal >> 4) + NLEncoder.hexchars.charAt(decimal & 0xF);
}

NLEncoder.encode = function(decoded) {
    // Some variables:
    var encoded = "";

    for (var i = 0; i < decoded.length; i++ ) {
        var ch = decoded.charAt(i);
        // Check if character is an unreserved character:
        if (NLEncoder.unreserved.indexOf(ch) != -1) {
            encoded = encoded + ch;
        } else {

            // The position in the Unicode table tells us how many bytes are needed.
            // Note that if we talk about first, second, etc. in the following, we are
            // counting from left to right:
            //
            //   Position in   |  Bytes needed   | Binary representation
            //  Unicode table  |   for UTF-8     |       of UTF-8
            // ----------------------------------------------------------
            //     0 -     127 |    1 byte       | 0XXX.XXXX
            //   128 -    2047 |    2 bytes      | 110X.XXXX 10XX.XXXX
            //  2048 -   65535 |    3 bytes      | 1110.XXXX 10XX.XXXX 10XX.XXXX
            // 65536 - 2097151 |    4 bytes      | 1111.0XXX 10XX.XXXX 10XX.XXXX 10XX.XXXX

            var charcode = decoded.charCodeAt(i);

            // Position 0 - 127 is equal to percent-encoding with an ASCII character encoding:
            if (charcode < 128) {
                encoded = encoded + NLEncoder.gethex(charcode);
            }

            // Position 128 - 2047: two bytes for UTF-8 character encoding.
            if (charcode > 127 && charcode < 2048) {
                // First UTF byte: Mask the first five bits of charcode with binary 110X.XXXX:
                encoded = encoded + NLEncoder.gethex((charcode >> 6) | 0xC0);
                // Second UTF byte: Get last six bits of charcode and mask them with binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex((charcode & 0x3F) | 0x80);
            }

            // Position 2048 - 65535: three bytes for UTF-8 character encoding.
            if (charcode > 2047 && charcode < 65536) {
                // First UTF byte: Mask the first four bits of charcode with binary 1110.XXXX:
                encoded = encoded + NLEncoder.gethex((charcode >> 12) | 0xE0);
                // Second UTF byte: Get the next six bits of charcode and mask them binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex(((charcode >> 6) & 0x3F) | 0x80);
                // Third UTF byte: Get the last six bits of charcode and mask them binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex((charcode & 0x3F) | 0x80);
            }

            // Position 65536 - : four bytes for UTF-8 character encoding.
            if (charcode > 65535) {
                // First UTF byte: Mask the first three bits of charcode with binary 1111.0XXX:
                encoded = encoded + NLEncoder.gethex((charcode >> 18) | 0xF0);
                // Second UTF byte: Get the next six bits of charcode and mask them binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex(((charcode >> 12) & 0x3F) | 0x80);
                // Third UTF byte: Get the last six bits of charcode and mask them binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex(((charcode >> 6) & 0x3F) | 0x80);
                // Fourth UTF byte: Get the last six bits of charcode and mask them binary 10XX.XXXX:
                encoded = encoded + NLEncoder.gethex((charcode & 0x3F) | 0x80);
            }

        }

    }  // end of for ...

    // Write result:
    return encoded;
}

NLEncoder.encodeASCII = function(decoded) {
    // Some variables:
    var encoded = "";

    // Remember non-ASCII characters, which will not be encoded:
    var notascii = "";

    for (var i = 0; i < decoded.length; i++ ) {
        var ch = decoded.charAt(i);
        // Check if character is an unreserved character:
        if (NLEncoder.unreserved.indexOf(ch) != -1) {
            encoded = encoded + ch;
        } else {
            // If position in the Unicode table is smaller than 128, then we have
            // an ASCII character:
            var charcode = decoded.charCodeAt(i);
            if (charcode < 128) {
                encoded = encoded + NLEncoder.gethex(charcode);
            } else {
                encoded = encoded + ch;
                notascii = notascii + ch + " ";
            }
        }
    }

    // Display warning message if necessary:
    if (notascii != "") NLUtility.log("Warning: Non-ASCII characters in decoded text!\n\nThus, these characters have not been encoded:\n" + notascii);
    
    return encoded;
}

// --------------------------------- Decoding -------------------------------

// This function returns the decimal value of two hexadecimal digits.
// Input is a percent sign followed by two hexadecimal digits. If the input
// string is shorter than three characters, the percent sign is missing or if
// not a hexadecimal numeral is used, then the decimal value 256 is returned:
NLEncoder.getdec = function(hexencoded) {
    if (hexencoded.length == 3) {
        if (hexencoded.charAt(0) == "%") {
            if (NLEncoder.hexchars.indexOf(hexencoded.charAt(1)) != -1 && NLEncoder.hexchars.indexOf(hexencoded.charAt(2)) != -1) {
                return parseInt(hexencoded.substr(1,2),16);
            }
        }
    }
    return 256;
}

NLEncoder.decode = function(encoded) {
    // Some variables:
    var decoded = "";
    // Remember characters that are not allowed in a URL:
    var notallowed = "";
    // Remember illegal percent encoding:
    var illegalencoding = "";

    // UTF-8 bytes from left to right:
    var byte1, byte2, byte3, byte4 = 0;

    var i = 0;
    while (i < encoded.length) {
        var ch = encoded.charAt(i);
        // Check for percent-encoded string:
        if (ch == "%") {

            // Check for legal percent-encoding of first byte:
            if (NLEncoder.getdec(encoded.substr(i,3)) < 255) {

                // Get the decimal values of all (potential) UTF-bytes:
                byte1 = NLEncoder.getdec(encoded.substr(i,3));
                byte2 = NLEncoder.getdec(encoded.substr(i+3,3));
                byte3 = NLEncoder.getdec(encoded.substr(i+6,3));
                byte4 = NLEncoder.getdec(encoded.substr(i+9,3));

                // Check for one byte UTF-8 character encoding:
                if (byte1 < 128) {
                    decoded = decoded + String.fromCharCode(byte1);
                    i = i + 3;
                }

                // Check for illegal one byte UTF-8 character encoding:
                if (byte1 > 127 && byte1 < 192) {
                    decoded = decoded + encoded.substr(i,3);
                    illegalencoding = illegalencoding + encoded.substr(i,3) + " ";
                    i = i + 3;
                }

                // Check for two byte UTF-8 character encoding:
                if (byte1 > 191 && byte1 < 224) {
                    if (byte2 > 127 && byte2 < 192) {
                        decoded = decoded + String.fromCharCode(((byte1 & 0x1F) << 6) | (byte2 & 0x3F));
                    } else {
                        decoded = decoded + encoded.substr(i,6);
                        illegalencoding = illegalencoding + encoded.substr(i,6) + " ";
                    }
                    i = i + 6;
                }

                // Check for three byte UTF-8 character encoding:
                if (byte1 > 223 && byte1 < 240) {
                    if (byte2 > 127 && byte2 < 192) {
                        if (byte3 > 127 && byte3 < 192) {
                            decoded = decoded + String.fromCharCode(((byte1 & 0xF) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F));
                        } else {
                            decoded = decoded + encoded.substr(i,9);
                            illegalencoding = illegalencoding + encoded.substr(i,9) + " ";
                        }
                    } else {
                        decoded = decoded + encoded.substr(i,9);
                        illegalencoding = illegalencoding + encoded.substr(i,9) + " ";
                    }
                    i = i + 9;
                }

                // Check for four byte UTF-8 character encoding:
                if (byte1 > 239) {
                    if (byte2 > 127 && byte2 < 192) {
                        if (byte3 > 127 && byte3 < 192) {
                            if (byte4 > 127 && byte4 < 192) {
                                decoded = decoded + String.fromCharCode(((byte1 & 0x7) << 18) | ((byte2 & 0x3F) << 12) | ((byte3 & 0x3F) << 6) | (byte4 & 0x3F));
                            } else {
                                decoded = decoded + encoded.substr(i,12);
                                illegalencoding = illegalencoding + encoded.substr(i,12) + " ";
                            }
                        } else {
                            decoded = decoded + encoded.substr(i,12);
                            illegalencoding = illegalencoding + encoded.substr(i,12) + " ";
                        }
                    } else {
                        decoded = decoded + encoded.substr(i,12);
                        illegalencoding = illegalencoding + encoded.substr(i,12) + " ";
                    }
                    i = i + 12;
                }

            } else {  // the first byte is not legally percent-encoded
                decoded = decoded + encoded.substr(i,3);
                illegalencoding = illegalencoding + encoded.substr(i,3) + " ";
                i = i + 3;
            }

        } else {  // the string is not percent encoded
            // Check if character is an allowed character:
            if (NLEncoder.allowed.indexOf(ch) == -1) notallowed = notallowed + ch + " ";
            decoded = decoded + ch;
            i++;
        }
    }  // end of while ...

    // Display warning message if necessary:
    var warning = "";
    if (notallowed != "") warning = warning + "Characters not allowed in a URL:\n" + notallowed + "\n\n";
    if (illegalencoding != "") warning = warning + "Illegal percent-encoding (for UTF-8):\n" + illegalencoding  + "\n\n";
    if (warning != "") NLUtility.log("Warning: Illegal characters/strings in encoded text!\n\n" + warning);
    
    return decoded;
}

NLEncoder.decodeASCII = function(encoded) {

    // Some variables:
    var decoded = "";
    // Remember characters that are not allowed in a URL:
    var notallowed = "";
    // Remember illegal percent encoding:
    var illegalencoding = "";

    var i = 0;
    while (i < encoded.length) {
        var ch = encoded.charAt(i);
        // Check for percent-encoded string:
        if (ch == "%") {
            // Check if percent-encoded string represents an ASCII character:
            if (NLEncoder.getdec(encoded.substr(i,3)) < 128) {
                decoded = decoded + unescape(encoded.substr(i,3));
            } else {
                decoded = decoded + encoded.substr(i,3);
                illegalencoding = illegalencoding + encoded.substr(i,3) + " ";
            }
            i = i + 3;
        } else {
            // Check if character is an allowed character:
            if (NLEncoder.allowed.indexOf(ch) == -1) notallowed = notallowed + ch + " ";
            decoded = decoded + ch;
            i++;
        }
    }

    // Display warning message if necessary:
    var warning = "";
    if (notallowed != "") warning = warning + "Characters not allowed in a URL:\n" + notallowed + "\n\n";
    if (illegalencoding != "") warning = warning + "Illegal percent-encoding (for ASCII):\n" + illegalencoding  + "\n\n";
    if (warning != "") NLUtility.log("Warning: Illegal characters/strings in encoded text!\n\n" + warning);
    
    return decoded;
}


if (typeof NLFacebook == "undefined" || !NLFacebook) {    
    var NLFacebook = {};
}

NLFacebook.ACCESS_TOKEN = "";
NLFacebook.REDIRECT = FB_APP_REDIRECT;

NLFacebook.feedOfferta = function(id, idCitta)
{
    NLUtility.log("NLFacebook.feedOfferta");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-offerta.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLUtility.log(data);

            NLFacebook.feedDialog(
                data.url + "/offerta/offerta.php?idofferta="+id, 
                data.immagine, 
                "Non perderti l'offerta " + data.nome + " di " + data.nomevetrina + " su NightGuide.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}

NLFacebook.feedVetrina = function(id, idCitta)
{
    NLUtility.log("NLFacebook.feedVetrina");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-vetrina.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLUtility.log(data);

            NLFacebook.feedDialog(
                data.url + "/vetrina/"+data.nomevetrinaseo, 
                data.immagine, 
                "Non perderti le offerte di " + data.nome + " su NightGuide.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}

NLFacebook.feedLocale = function(id, idCitta)
{
    NLUtility.log("NLFacebook.feedLocale");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-locale.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            
            NLUtility.log(data);

            NLFacebook.feedDialog(
                data.url + "/locali/locale.php/idluogo=" + id + "/index.htm", 
                data.immagine, 
                "Visita il locale " + data.nome + " su NightGuide.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}

NLFacebook.feedAppuntamento = function(id, idCitta)
{
    NLUtility.log("NLFacebook.feedAppuntamento");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-appuntamento.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();

            NLFacebook.feedDialog(
                data.url + "/appuntamento/serata.php?idserata=" + id, 
                data.immagine,
                "Non perderti l'appuntamento " + data.nome + ' ' + data.data,
                data.nomelocale,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLFacebook.feedFoto = function(id, image, preview, idCitta)
{
    NLUtility.log("NLFacebook.feedFoto");
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "social-gallery.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            NLFacebook.feedDialog(
                image, //data.url + "/foto/gallery.php?idgallery=" + id,
                preview,
                "Guarda le foto della serata " + data.nome + ' ' + data.data + ' presso ' + data.nomelocale,
                data.nomelocale,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLFacebook.feedDialog = function(link, picture, name, caption, description)
{
    NLUtility.log("NLFacebook.feedDialog");
    
    NLUtility.log("PICTURE = " + picture);
    
    if (typeof window.plugins != "undefined" 
            && typeof window.plugins.childBrowser != "undefined")
    {
        NLUtility.log("ChildBrowser available");
        
        var cb = window.plugins.childBrowser;
        cb.onLocationChange = function(loc)
        {
            if(loc.indexOf(NLFacebook.REDIRECT) == 0)
            {
                cb.close();
                NLUtility.showMessage("Condivisione completata");
            }
        }

        var url = "https://www.facebook.com/dialog/feed"
            + "?app_id=" + FB_APP_ID
            + "&link=" + NLUtility.urlencode(link)
            + "&picture=" + NLUtility.urlencode(picture)
            + "&name=" + NLUtility.urlencode(name)
            + "&caption=" + NLUtility.urlencode(caption)
            + "&description=" + NLUtility.urlencode(description)
            + "&display=touch"
            + "&redirect_uri=" + NLFacebook.REDIRECT;
            
        NLUtility.log(url);
        
        cb.showWebPage(url);
    }
    else
    {
        NLUtility.showError("Per condividere su Facebook devi scaricare l'app dallo store!");
    }    
   
}

NLFacebook.connect = function(callback)
{
    NLUtility.log("NLFacebook.connect");
    
    if (typeof window.plugins != "undefined" 
            && typeof window.plugins.childBrowser != "undefined")
    {
        NLUtility.log("ChildBrowser available");
        
        if (NLFacebook.ACCESS_TOKEN.length == 0)
        {
            NLUtility.log("No access token available, connecting...");
            NLFacebook._connect(callback);
        }
        else
        {
            NLUtility.log("Access Token: " + NLFacebook.ACCESS_TOKEN);
            var url  = NG_URL + "facebook.php";
            
            var params = {action: "me", accesstoken: NLFacebook.ACCESS_TOKEN};
            
            NLUtility.showLoading();

            $.ajax({
                url: url,
                data: params,
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    NLUtility.log("me done");
                    NLUtility.hideLoading();
                    if (data && data.id)
                    {
                        NLUtility.log("ID: " + data.id);
                        NLUtility.log("Authenticated, callback...");
                        if (callback) callback();
                    }
                    else
                    {
                        NLUtility.log("Not authenticated, connect...");
                        if (data && data.error && data.error.message)
                        {
                            NLUtility.log("Error: " + data.error.message);
                        }
                        NLFacebook._connect(callback);
                    } 
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        }    
    }
}

NLFacebook._connect = function(callback)
{
    NLUtility.log("NLFacebook._connect");

    var cb = window.plugins.childBrowser;
    cb.onLocationChange = function(loc)
    {
        NLUtility.log("onLocationChange: " + loc);
        if(loc.indexOf(NLFacebook.REDIRECT) == 0)
        {
            NLUtility.log("ChildBrowser Location is redirect");

            var result = unescape(loc).split("#")[1];
            result = unescape(result);
            NLFacebook.ACCESS_TOKEN = result.split("&")[0].split("=")[1];		
            //var expires = result.split("&")[1].split("=")[1];

            NLUtility.log("Access token: " + NLFacebook.ACCESS_TOKEN);

            if (callback)
            {
                NLUtility.log("Callback...");
                callback();
            }
            else
            {
                NLUtility.log("No callback, close browser.");
                cb.close();
            }
        }
    }

    var url  = "https://www.facebook.com/dialog/oauth"
        + "?client_id=" + FB_APP_ID
        + "&redirect_uri=" + NLFacebook.REDIRECT
        + "&scope="+ FB_APP_PERMS
        + "&response_type=token"
        + "&display=touch";
    
    NLUtility.log(url);

    cb.showWebPage(url);
}

NLFacebook.profile = function(callback)
{
    NLUtility.log("NLFacebook.profile");
    
    if (typeof window.plugins != "undefined" 
            && typeof window.plugins.childBrowser != "undefined")
    {
        NLUtility.log("ChildBrowser available");
        
        this.connect(function()
        {
            NLUtility.log("Profile callback");
            NLFacebook._profile(callback);
        });
    }
    else
    {
        NLUtility.showError("Per usare Facebook devi scaricare l'app dallo store!");
    }
}

NLFacebook._profile = function(callback)
{
    NLUtility.log("NLFacebook._profile");
   
    var url = NG_URL + "facebook.php";

    var params = {
        action: "me",
        accesstoken: NLFacebook.ACCESS_TOKEN
    };

   
    NLUtility.showLoading();
   
    $.ajax({
        url: url,
        data: params,
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.log("profile done");

            NLUtility.hideLoading();
            window.plugins.childBrowser.close();

            if (!data || !data.id)
            {
                NLUtility.log("profile error");
                /*
                if (data && data.error && data.error.message)
                {
                    NLUtility.log("Error: " + data.error.message)
                }
                */
            }
            
            if (callback)
                callback(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLFacebook.logout = function()
{
    NLFacebook.ACCESS_TOKEN = "";
    if (NG_PHONEGAP && NLUtility.isIOS())
    {
        window.plugins.childBrowser.logout();
    }
}

/*
* IMPORTANT!!!
* REMEMBER TO ADD  rel="external"  to your anchor tags. 
* If you don't this will mess with how jQuery Mobile works
*/

/*
$(document).delegate(".gallery-page", "pageinit", function(event) {
    NLUtility.log("gallery-page");
    if (!$(".gallery").hasClass("ng-anonymous"))
    {
        NLUtility.log("photoswipe");
        if ($(".gallery a").length > 0)
        {
            var options = {
                captionAndToolbarAutoHideDelay: 0,
                captionAndToolbarFlipPosition: true,
                getImageCaption: function(el)
                {
                    var $img = $(el).find("img");
                    var id = $img.attr("data-id");
                    var idCitta = $img.attr("data-citta");
                    var url = $img.attr('data-url').replace("'", "\'");

                    NLUtility.log(url);

                    var fb = '<a href="#" onclick="javascript:NLFacebook.feedFoto('+id+',\''+url+'\','+idCitta+');"><img src="img/fb-condividi.png"></a>';
                    
                    var tw = '<a href="#" onclick="javascript:NLTwitter.tweetFoto('+id+','+idCitta+');"><img src="img/tweet.png"></a>';
                    
                    return $(fb+'&nbsp;'+tw);
                }
            }
            
            NLUtility.log("Options:");
            NLUtility.log(options);
            
            var instance = $(".gallery a").photoSwipe(options);  
            instance.addEventHandler(Code.PhotoSwipe.EventTypes.onBeforeShow, function(e){
                NLUtility.log('onBeforeShow');
                if (window.navigator.userAgent.toLowerCase().indexOf("android") > -1)
                {
                    // Workaround per problema su Android
                    NLUtility.log('silentScroll');
                    $.mobile.silentScroll(0);
                }
            });
            instance.addEventHandler(Code.PhotoSwipe.EventTypes.onShow, function(e){
                    NLUtility.log('onShow');
                    // Workaround per problema su Android
                    if (window.navigator.userAgent.toLowerCase().indexOf("android") > -1)
                    {
                        NLUtility.log("background to black");
                        $(".ui-page").css("background-color", "#000000");
                    }
            });

            instance.addEventHandler(Code.PhotoSwipe.EventTypes.onHide, function(e){
                    NLUtility.log('onHide');
                    // Workaround per problema su Android
                    if (window.navigator.userAgent.toLowerCase().indexOf("android") > -1)
                    {
                        NLUtility.log("background to gray");
                        $(".ui-page").css("background-color", "#F0F0F0");
                    }
            });

        }
    }
});
*/

/*
$(document).delegate(".gallery-page", "pageshow", function(e) {
    NLUtility.log("pageshow " + $(e.target).attr('id'));
    var currentPage = $(e.target);
    var options = {captionAndToolbarFlipPosition: true};
    var photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options, currentPage.attr('id'));
});

$(document).delegate(".gallery-page", "pagehide", function(e) {
    NLUtility.log("pagehide " + $(e.target).attr('id'));
    var currentPage = $(e.target);
    var photoSwipeInstance = window.Code.PhotoSwipe.getInstance(currentPage.attr('id'));
    if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
        window.Code.PhotoSwipe.detatch(photoSwipeInstance);
    }
});
*/

/*

Configuration:

allowUserZoom: Allow the user to zoom / pan around images. Default = true

autoStartSlideshow: Automatically starts the slideshow mode when PhotoSwipe is activated. Default = false

allowRotationOnUserZoom: iOS only - Allow the user to rotate images whilst zooming / panning. Default = false

backButtonHideEnabled: This will hide the gallery when the user hits the back button. Useful for Android and Blackberry. Works in BB6, Android v2.1 and above and iOS 4 and above. Default = true

captionAndToolbarAutoHideDelay: How long to wait before the caption and toolbar automatically disappear. Default = 5000. Set to 0 to prevent auto disappearing

captionAndToolbarFlipPosition: Place the caption at the bottom and the toolbar at the top. Default = false

captionAndToolbarHide: Hide the caption and toolbar. Default = false

captionAndToolbarOpacity: The opacity of the caption and toolbar. Default = 0.8

captionAndToolbarShowEmptyCaptions: Shows a blank caption area even if a caption cannot be found for the current image. Default = true

cacheMode: Code.PhotoSwipe.Cache.Mode.normal (default) or Code.PhotoSwipe.Cache.Mode.aggressive. Changes how PhotoSwipe manages it's cache. Aggressive will purposely set images that are not either the current, next or previous to be an empty "spacer" type image. This helps on older iOS versions if you have excessively large images. In the main, normal should suffice

doubleTapSpeed: Double tap speed in milliseconds. Default = 300

doubleTapZoomLevel: When the user double taps an image, the default "zoom-in" level. Default = 2.5

enableDrag: Enables dragging the next / previous image into view. Default = true

enableKeyboard: Enables keyboard support. Default = true

enableMouseWheel: Enables mouse wheel support. Default = true

fadeInSpeed: The speed of any fading-in elements in milliseconds. Default = 250

fadeOutSpeed: The speed of any fading-out elements in milliseconds. Default = 250

imageScaleMethod: How images will fit onto the screen. Either "fit", "fitNoUpscale" or "zoom". "fit" ensures the image always fits the screen. "fitNoUpscale" works like "fit" but will never upscale the image. "zoom" the image will always fill the full screen, this may cause the image to be "zoomed" in and cropped. Default = "fit"

invertMouseWheel: By default, moving the mouse wheel down will move to the next image, up to the previous. Setting this to true reverses this. Default = false

jQueryMobile: Whether PhotoSwipe is integrated into a jQuery Mobile project or not. By default, PhotoSwipe will try and work this out for you

jQueryMobileDialogHash: The window hash tag used by jQuery Mobile and dialog pages. Default = "&ui-state=dialog"

loop: Whether the gallery auto-loops back to the beginning when you reach the end. Default = true

margin: The margin between each image in pixels. Default = 20

maxUserZoom: The maximum a user can zoom into an image. Default = 5.0 (set to zero for this to be ignored)

minUserZoom: The minimum a user can zoom out of an image. Default = 0.5 (set to zero for this to be ignored)

mouseWheelSpeed: How responsive the mouse wheel is. Default = 500

nextPreviousSlideSpeed: How fast images are displayed when the next/previous buttons are clicked in milliseconds. Default = 0 (immediately)

preventHide: Prevents the user closing PhotoSwipe. Also hides the "close" button from the toolbar. Useful for "exclusive mode" (see examples/08-exclusive-mode.html). Default = false

preventSlideshow: Prevents the slideshow being activated. Also hides the "play" button from the toolbar. Default = false

slideshowDelay: The delay between showing the next image when in slideshow mode in milliseconds. Default = 3000

slideSpeed: How fast images slide into view in milliseconds. Default = 250

swipeThreshold: How many pixels your finger has to move across the screen to register a swipe gesture. Default = 50

swipeTimeThreshold: A swipe must take no longer than this value in milliseconds to be registered as a swipe gesture. Default = 250

slideTimingFunction: Easing function used when sliding. Default = "ease-out"

zIndex: The intial zIndex for PhotoSwipe. Default = 1000

*/

(function(){var g=void 0,h=!0,j=null,l=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,n=Math,da=decodeURIComponent;function ea(a,b){return a.name=b}
var p="push",fa="test",ia="slice",q="replace",ja="load",ka="floor",la="charAt",ma="value",r="indexOf",na="match",oa="port",pa="createElement",qa="path",s="name",v="host",w="toString",x="length",y="prototype",ra="clientWidth",z="split",sa="stopPropagation",ta="scope",A="location",ua="search",B="protocol",va="clientHeight",wa="href",C="substring",xa="apply",ya="navigator",D="join",E="toLowerCase",F;function za(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Aa(a){return"function"==typeof a}function Ba(a){return a!=g&&-1<(a.constructor+"")[r]("String")}function G(a,b){return g==a||"-"==a&&!b||""==a}function Ca(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[r](a[la](0));)a=a[C](1);for(;a&&-1<" \n\r\t"[r](a[la](a[x]-1));)a=a[C](0,a[x]-1);return a}function Da(){return n.round(2147483647*n.random())}function Ea(){}
function H(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);I(68);return escape(a)}function J(a){a=a[z]("+")[D](" ");if(da instanceof Function)try{return da(a)}catch(b){I(17)}else I(68);return unescape(a)}var Fa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ga=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function Ha(a,b){if(a){var c=K[pa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=K.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function L(a){return a&&0<a[x]?a[0]:""}function Ia(a){var b=a?a[x]:0;return 0<b?a[b-1]:""}var Ja=function(){this.prefix="ga.";this.R={}};Ja[y].set=function(a,b){this.R[this.prefix+a]=b};Ja[y].get=function(a){return this.R[this.prefix+a]};Ja[y].contains=function(a){return this.get(a)!==g};function Ka(a){0==a[r]("www.")&&(a=a[C](4));return a[E]()}function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[r]("://");0<=c&&(d.protocol=a[C](0,c),a=a[C](c+3));c=a[ua]("/|\\?|#");if(0<=c)d.host=a[C](0,c)[E](),a=a[C](c);else return d.host=a[E](),d;c=a[r]("#");0<=c&&(d.anchor=a[C](c+1),a=a[C](0,c));c=a[r]("?");0<=c&&(Ma(d.d,a[C](c+1)),a=a[C](0,c));d.anchor&&b&&Ma(d.d,d.anchor);a&&"/"==a[la](0)&&(a=a[C](1));d.path=a;return d}
function Oa(a,b){function c(a){var b=(a.hostname||"")[z](":")[0][E](),c=(a[B]||"")[E](),c=1*a[oa]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";0==a[r]("/")||(a="/"+a);return[b,""+c,a]}var d=b||K[pa]("a");d.href=K[A][wa];var e=(d[B]||"")[E](),f=c(d),k=d[ua]||"",m=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[r]("//")?a=e+a:0==a[r]("/")?a=m+a:!a||0==a[r]("?")?a=m+f[2]+(a||k):0>a[z]("/")[0][r](":")&&(a=m+f[2][C](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[B]||"")[E](),host:e[0],
port:e[1],path:e[2],Oa:d[ua]||"",url:a||""}}function Ma(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[p](c)}for(var d=Ca(b)[z]("&"),e=0;e<d[x];e++)if(d[e]){var f=d[e][r]("=");0>f?c(d[e],"1"):c(d[e][C](0,f),d[e][C](f+1))}}function Pa(a,b){if(G(a)||"["==a[la](0)&&"]"==a[la](a[x]-1))return"-";var c=K.domain;return a[r](c+(b&&"/"!=b?b:""))==(0==a[r]("http://")?7:0==a[r]("https://")?8:0)?"0":a};var Qa=0;function Ra(a,b,c){!(1<=Qa)&&!(1<=100*n.random())&&(a=["utmt=error","utmerr="+a,"utmwv=5.3.8","utmn="+Da(),"utmsp=1"],b&&a[p]("api="+b),c&&a[p]("msg="+H(c[C](0,100))),M.w&&a[p]("aip=1"),Sa(a[D]("&")),Qa++)};var Ta=0,Ua={};function N(a){return Va("x"+Ta++,a)}function Va(a,b){Ua[a]=!!b;return a}
var Wa=N(),Xa=Va("anonymizeIp"),Ya=N(),$a=N(),ab=N(),bb=N(),O=N(),P=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(),Eb=N(),Fb=N(h),Gb=Va("currencyCode"),Hb=Va("page"),Ib=Va("title"),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Qb=N(),Rb=N(),Q=N(h),Sb=N(h),Tb=N(h),Ub=N(h),Vb=N(h),Wb=N(h),Zb=N(h),$b=N(h),ac=N(h),bc=N(h),cc=N(h),R=N(h),dc=N(h),ec=N(h),fc=
N(h),gc=N(h),hc=N(h),ic=N(h),jc=N(h),S=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=N(h),pc=N(h),qc=N(h),rc=Va("campaignParams"),sc=N(),tc=Va("hitCallback"),uc=N();N();var vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N(),Ec=N(),Fc=N(),Gc=N(),Hc=N(),Ic=N();N();var Mc=N(),Nc=N(),Oc=N();function Pc(a){var b=this.plugins_;if(b)return b.get(a)}var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&I(d),c[xa](this,arguments)}catch(a){throw Ra("exc",b,a&&a[s]),a;}}},Qc=function(a,b,c,d){U[y][a]=function(){try{return I(c),za(this.a.get(b),d)}catch(e){throw Ra("exc",a,e&&e[s]),e;}}},V=function(a,b,c,d,e){U[y][a]=function(f){try{I(c),e==g?this.a.set(b,za(f,d)):this.a.set(b,e)}catch(k){throw Ra("exc",a,k&&k[s]),k;}}};var Rc=RegExp(/(^|\.)doubleclick\.net$/i),Sc=function(a,b){return Rc[fa](K[A].hostname)?h:"/"!==b?l:(0==a[r]("www.google.")||0==a[r](".google.")||0==a[r]("google."))&&!(-1<a[r]("google.org"))?h:l},Tc=function(a){var b=a.get(bb),c=a.c(P,"/");Sc(b,c)&&a[sa]()};var Zc=function(){var a={},b={},c=new Uc;this.g=function(a,b){c.add(a,b)};var d=new Uc;this.e=function(a,b){d.add(a,b)};var e=l,f=l,k=h;this.T=function(){e=h};this.j=function(a){this[ja]();this.set(sc,a,h);a=new Vc(this);e=l;d.execute(this);e=h;b={};this.n();a.Ja()};this.load=function(){e&&(e=l,this.Ka(),Wc(this),f||(f=h,c.execute(this),Xc(this),Wc(this)),e=h)};this.n=function(){if(e)if(f)e=l,Xc(this),e=h;else this[ja]()};this.get=function(c){Ua[c]&&this[ja]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ja]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.z=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.Ka=function(){if(k){var b=this.c(bb,""),c=this.c(P,"/");Sc(b,c)||(a[O]=a[hb]&&""!=b?Yc(b):1,k=l)}}};Zc[y].stopPropagation=function(){throw"aborted";};
var Vc=function(a){var b=this;this.q=0;var c=a.get(tc);this.Ua=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ja=function(){!b.q&&c&&ca(c,10)};a.set(uc,b,h)};function $c(a,b){b=b||[];for(var c=0;c<b[x];c++){var d=b[c];if(""+a==d||0==d[r](a+"."))return d}return"-"}
var bd=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(6!==b[x]||ad(b[0],c))return l;c=1*b[1];var d=1*b[2],e=1*b[3],f=1*b[4];b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return l;a.set(Q,c);a.set(Vb,d);a.set(Wb,e);a.set(Zb,f);a.set($b,b);return h},cd=function(a){var b=a.get(Q),c=a.get(Vb),d=a.get(Wb),e=a.get(Zb),f=a.b($b,1);return[a.b(O,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][D](".")},dd=function(a){return[a.b(O,1),a.b(cc,0),a.b(R,1),a.b(dc,0)][D](".")},ed=function(a,b,c){c=c?"":a.c(O,"1");var d=b[z](".");
if(4!==d[x]||ad(d[0],c))d=j;a.set(cc,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(dc,d?1*d[3]:a.get(ab));return d!=j||!ad(b,c)},fd=function(a,b){var c=H(a.c(Tb,"")),d=[],e=a.get(Fb);if(!b&&e){for(var f=0;f<e[x];f++){var k=e[f];k&&1==k[ta]&&d[p](f+"="+H(k[s])+"="+H(k[ma])+"=1")}0<d[x]&&(c+="|"+d[D]("^"))}return c?a.b(O,1)+"."+c:j},gd=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(2>b[x]||ad(b[0],c))return l;b=b[ia](1)[D](".")[z]("|");0<b[x]&&a.set(Tb,J(b[0]));if(1>=b[x])return h;b=b[1][z](-1==b[1][r](",")?
"^":",");for(c=0;c<b[x];c++){var d=b[c][z]("=");if(4==d[x]){var e={};ea(e,J(d[1]));e.value=J(d[2]);e.scope=1;a.get(Fb)[d[0]]=e}}return h},hd=function(a){var b;b=function(b,e){if(!G(a.get(b))){var f=a.c(b,""),f=f[z](" ")[D]("%20"),f=f[z]("+")[D]("%20");c[p](e+"="+f)}};var c=[];b(ic,"utmcid");b(nc,"utmcsr");b(S,"utmgclid");b(kc,"utmgclsrc");b(lc,"utmdclid");b(mc,"utmdsid");b(jc,"utmccn");b(oc,"utmcmd");b(pc,"utmctr");b(qc,"utmcct");return(b=c[D]("|"))?[a.b(O,1),a.b(ec,0),a.b(fc,1),a.b(gc,1),b][D]("."):
""},id=function(a,b,c){c=c?"":a.c(O,"1");b=b[z](".");if(5>b[x]||ad(b[0],c))return a.set(ec,g),a.set(fc,g),a.set(gc,g),a.set(ic,g),a.set(jc,g),a.set(nc,g),a.set(oc,g),a.set(pc,g),a.set(qc,g),a.set(S,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),l;a.set(ec,1*b[1]);a.set(fc,1*b[2]);a.set(gc,1*b[3]);var d=b[ia](4)[D](".");b=function(a){return(a=d[na](a+"=(.*?)(?:\\|utm|$)"))&&2==a[x]?a[1]:g};c=function(b,c){c?(c=e?J(c):c[z]("%20")[D](" "),a.set(b,c)):a.set(b,g)};-1==d[r]("=")&&(d=J(d));var e="2"==b("utmcvr");
c(ic,b("utmcid"));c(jc,b("utmccn"));c(nc,b("utmcsr"));c(oc,b("utmcmd"));c(pc,b("utmctr"));c(qc,b("utmcct"));c(S,b("utmgclid"));c(kc,b("utmgclsrc"));c(lc,b("utmdclid"));c(mc,b("utmdsid"));return h},ad=function(a,b){return b?a!=b:!/^\d+$/[fa](a)};var Uc=function(){this.filters=[]};Uc[y].add=function(a,b){this.filters[p]({name:a,s:b})};Uc[y].execute=function(a){try{for(var b=0;b<this.filters[x];b++)this.filters[b].s.call(W,a)}catch(c){}};function jd(a){100!=a.get(vb)&&a.get(Q)%1E4>=100*a.get(vb)&&a[sa]()}function kd(a){ld(a.get(Wa))&&a[sa]()}function md(a){"_file:"==K[A][B]&&a[sa]()}function nd(a){a.get(Ib)||a.set(Ib,K.title,h);a.get(Hb)||a.set(Hb,K[A].pathname+K[A][ua],h)};var od=new function(){var a=[];this.set=function(b){a[b]=h};this.Xa=function(){for(var b=[],c=0;c<a[x];c++)a[c]&&(b[n[ka](c/6)]=b[n[ka](c/6)]^1<<c%6);for(c=0;c<b[x];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[la](b[c]||0);return b[D]("")+"~"}};function I(a){od.set(a)};var W=window,K=document,ld=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},pd=function(a){var b=[],c=K.cookie[z](";");a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[x];d++){var e=c[d][na](a);e&&b[p](e[1])}return b},X=function(a,b,c,d,e,f){e=ld(e)?l:Sc(d,c)?l:h;if(e){if(b&&0<=W[ya].userAgent[r]("Firefox")){b=b[q](/\n|\r/g," ");e=0;for(var k=b[x];e<k;++e){var m=b.charCodeAt(e)&255;if(10==m||13==m)b=b[C](0,e)+"?"+b[C](e+1)}}b&&2E3<b[x]&&(b=b[C](0,2E3),I(69));
a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date).getTime()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");K.cookie=a}};var qd,rd,sd=function(){if(!qd){var a={},b=W[ya],c=W.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[E]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=K.characterSet||K.charset||"-";try{var d=K.documentElement,e=K.body,f=e&&e[ra]&&e[va],b=[];d&&(d[ra]&&d[va])&&("CSS1Compat"===K.compatMode||!f)?b=[d[ra],d[va]]:f&&(b=[e[ra],e[va]]);a.Wa=b[D]("x")}catch(k){I(135)}qd=a}},td=function(){sd();for(var a=qd,b=W[ya],a=b.appName+
b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(K.cookie?K.cookie:"")+(K.referrer?K.referrer:""),b=a[x],c=W.history[x];0<c;)a+=c--^b++;return Yc(a)},ud=function(a){sd();var b=qd;a.set(Lb,b.Q);a.set(Mb,b.P);a.set(Pb,b.language);a.set(Qb,b.characterSet);a.set(Nb,b.javaEnabled);a.set(Rb,b.Wa);if(a.get(ib)&&a.get(jb)){if(!(b=rd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[ya])?b.plugins:g)&&0<b[x])for(c=0;c<b[x]&&!e;c++)d=b[c],-1<d[s][r]("Shockwave Flash")&&(e=d.description[z]("Shockwave Flash ")[1]);
else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(k){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(m){}e&&(e=e[z](" ")[1][z](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}rd=b;a.set(Ob,rd)}else a.set(Ob,"-")};var vd=function(a){if(Aa(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[C](0,d),this.h=b[C](d+1)):-1!=c&&-1==d?(this.l=b[C](0,c),this.h=b[C](c+1)):c>d?(this.i=b[C](0,d),this.l=b[C](d+1,c),this.h=b[C](c+1)):(this.i=b[C](0,d),this.h=b[C](d+1));this.k=a[ia](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[y],"push",Y[y][p],5);T(Y[y],"_getPlugin",Pc,121);T(Y[y],
"_createAsyncTracker",Y[y].Sa,33);T(Y[y],"_getAsyncTracker",Y[y].Ta,34);this.I=new Ja;this.p=[]};F=Y[y];F.Na=function(a,b,c){var d=this.I.get(a);if(!Aa(d))return l;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};F.push=function(a){var b=Z.Va[xa](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[x]&&!Z.O(b[0])&&!(b.shift(),0<Z.p[x]););Z.p=Z.p.concat(b);return 0};F.Va=function(a){for(var b=[],c=0;c<arguments[x];c++)try{var d=new vd(arguments[c]);d.J?this.O(d):b[p](d)}catch(e){}return b};
F.O=function(a){try{if(a.s)a.s[xa](W);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Ma){if(!this.Na(a.k[0],b,a.k[2])){if(!a.Pa){var c=Oa(""+a.k[1]);var d=c[B],e=K[A][B];var f;if(f="https:"==d||d==e?h:"http:"!=d?l:"http:"==e){var k;a:{var m=Oa(K[A][wa]);if(!(c.Oa||0<=c.url[r]("?")||0<=c[qa][r]("://")||c[v]==m[v]&&c[oa]==m[oa]))for(var t="http:"==c[B]?80:443,u=M.S,b=0;b<u[x];b++)if(c[v]==u[b][0]&&(c[oa]||t)==(u[b][1]||t)&&0==c[qa][r](u[b][2])){k=h;break a}k=
l}f=k&&!ld()}f&&(a.Pa=Ha(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][xa](b,a.k)}}catch(Za){}};F.Sa=function(a,b){return M.r(a,b||"")};F.Ta=function(a){return M.u(a)};var yd=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<k[x];d++)if(g!=f[a][k[d]]){c=l;break}c&&(f[a]=g)}}function d(a){var b="",c=l,d,e;for(d=0;d<k[x];d++)if(e=a[k[d]],g!=e){c&&(b+=k[d]);for(var c=[],f=g,ha=g,ha=0;ha<e[x];ha++)if(g!=e[ha]){f="";ha!=mb&&g==e[ha-1]&&(f+=ha[w]()+Za);for(var Cd=e[ha],Jc="",Yb=g,Kc=g,Lc=g,Yb=0;Yb<Cd[x];Yb++)Kc=
Cd[la](Yb),Lc=Na[Kc],Jc+=g!=Lc?Lc:Kc;f+=Jc;c[p](f)}b+=m+c[D](u)+t;c=l}else c=h;return b}var e=this,f=[],k=["k","v"],m="(",t=")",u="*",Za="!",Na={"'":"'0"};Na[t]="'1";Na[u]="'2";Na[Za]="'3";var mb=1;e.Ra=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[x];b++)g!=f[b]&&(a+=b[w]()+d(f[b]));return a};e.Qa=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[x];c++)g!=f[c]&&!a.Ra(c)&&(b+=c[w]()+d(f[c]));return b};e.f=function(b,c,d){if(!wd(d))return l;a(b,"k",c,d);return h};e.o=function(b,
c,d){if(!xd(d))return l;a(b,"v",c,d[w]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.N,88);T(e,"_clearKey",e.L,85);T(e,"_clearValue",e.M,86)};function wd(a){return"string"==typeof a}function xd(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||n.round(a)!=a||NaN==a||a==ba?l:h};var zd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},Ad=function(){var a=zd(h).hid;a==j&&(a=Da(),zd(h).hid=a);return a},Dd=function(a){a.set(Kb,Ad());var b=zd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&("0"==c&&I(112),a.set(Zb,c),a.get(Sb)&&a.set(Wb,c));b=b.vid;a.get(Sb)&&b&&(b=b[z]("."),1*b[1]||I(112),a.set(Q,1*b[0]),a.set(Vb,1*b[1]))}};var Ed,Fd=function(a,b,c){var d=a.c(bb,""),e=a.c(P,"/"),f=a.b(cb,0);a=a.c(Wa,"");X(b,c,e,d,a,f)},Xc=function(a){var b=a.c(bb,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",cd(a),c,b,d,a.get(cb));X("__utmb",dd(a),c,b,d,a.get(db));X("__utmc",""+a.b(O,1),c,b,d);var e=hd(a,h);e?X("__utmz",e,c,b,d,a.get(eb)):X("__utmz","",c,b,"",-1);(e=fd(a,l))?X("__utmv",e,c,b,d,a.get(cb)):X("__utmv","",c,b,"",-1)},Wc=function(a){var b=a.b(O,1);if(!bd(a,$c(b,pd("__utma"))))return a.set(Ub,h),l;var c=!ed(a,$c(b,
pd("__utmb")));a.set(bc,c);id(a,$c(b,pd("__utmz")));gd(a,$c(b,pd("__utmv")));Ed=!c;return h},Gd=function(a){!Ed&&!(0<pd("__utmb")[x])&&(X("__utmd","1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),1E4),0==pd("__utmd")[x]&&a[sa]())};var Jd=function(a){a.get(Q)==g?Hd(a):a.get(Ub)&&!a.get(Mc)?Hd(a):a.get(bc)&&Id(a)},Kd=function(a){a.get(hc)&&!a.get(ac)&&(Id(a),a.set(fc,a.get($b)))},Hd=function(a){var b=a.get(ab);a.set(Sb,h);a.set(Q,Da()^td(a)&2147483647);a.set(Tb,"");a.set(Vb,b);a.set(Wb,b);a.set(Zb,b);a.set($b,1);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,b);a.set(Fb,[]);a.set(Ub,l);a.set(bc,l)},Id=function(a){a.set(Wb,a.get(Zb));a.set(Zb,a.get(ab));a.z($b);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,a.get(ab));a.set(bc,l)};var Ld="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "),Sd=function(a){if(a.get(kb)&&
!a.get(Mc)){for(var b=!G(a.get(ic))||!G(a.get(nc))||!G(a.get(S))||!G(a.get(lc)),c={},d=0;d<Md[x];d++){var e=Md[d];c[e]=a.get(e)}(d=a.get(rc))?(I(149),e=new Ja,Ma(e,d),d=e):d=La(K[A][wa],a.get(gb)).d;if(!("1"==Ia(d.get(a.get(ub)))&&b)){var f=d,k=function(b,c){c=c||"-";var d=Ia(f.get(a.get(b)));return d&&"-"!=d?J(d):c},d=Ia(f.get(a.get(nb)))||"-",e=Ia(f.get(a.get(qb)))||"-",m=Ia(f.get(a.get(pb)))||"-",t=Ia(f.get("gclsrc"))||"-",u=Ia(f.get("dclid"))||"-",Za=k(ob,"(not set)"),Na=k(rb,"(not set)"),mb=
k(sb),k=k(tb);if(G(d)&&G(m)&&G(u)&&G(e))d=l;else{var Xb=!G(m)&&!G(t),Xb=G(e)&&(!G(u)||Xb),Bd=G(mb);if(Xb||Bd){var ga=Nd(a),ga=La(ga,h);if((ga=Od(a,ga))&&!G(ga[1]&&!ga[2]))Xb&&(e=ga[0]),Bd&&(mb=ga[1])}Pd(a,d,e,m,t,u,Za,Na,mb,k);d=h}d=d||Qd(a);!d&&(!b&&a.get(ac))&&(Pd(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h);if(d&&(a.set(hc,Rd(a,c)),b="(direct)"==a.get(nc)&&"(direct)"==a.get(jc)&&"(none)"==a.get(oc),a.get(hc)||a.get(ac)&&!b))a.set(ec,a.get(ab)),a.set(fc,a.get($b)),a.z(gc)}}},Qd=function(a){var b=
Nd(a),c=La(b,h);if(!(b!=g&&b!=j&&""!=b&&"0"!=b&&"-"!=b&&0<=b[r]("://"))||c&&-1<c[v][r]("google")&&c.d.contains("q")&&"cse"==c[qa])return l;if((b=Od(a,c))&&!b[2])return Pd(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(ac))return l;a:{for(var b=a.get(Bb),d=Ka(c[v]),e=0;e<b[x];++e)if(-1<d[r](b[e])){a=l;break a}Pd(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[qa]);a=h}return a},Od=function(a,b){for(var c=a.get(zb),d=0;d<c[x];++d){var e=c[d][z](":");if(-1<b[v][r](e[0][E]())){var f=b.d.get(e[1]);
if(f&&(f=L(f),!f&&-1<b[v][r]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[r](e[3]))){a:{for(var c=f,d=a.get(Ab),c=J(c)[E](),k=0;k<d[x];++k)if(c==d[k]){c=h;break a}c=l}return[e[2]||e[0],f,c]}}}return j},Pd=function(a,b,c,d,e,f,k,m,t,u){a.set(ic,b);a.set(nc,c);a.set(S,d);a.set(kc,e);a.set(lc,f);a.set(jc,k);a.set(oc,m);a.set(pc,t);a.set(qc,u)},Md=[jc,ic,S,lc,nc,oc,pc,qc],Rd=function(a,b){function c(a){a=(""+a)[z]("+")[D]("%20");return a=a[z](" ")[D]("%20")}function d(c){var d=""+(a.get(c)||"");c=
""+(b[c]||"");return 0<d[x]&&d==c}if(d(S)||d(lc))return I(131),l;for(var e=0;e<Md[x];e++){var f=Md[e],k=b[f]||"-",f=a.get(f)||"-";if(c(k)!=c(f))return h}return l},Td=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Nd=function(a){a=Pa(a.get(Jb),a.get(P));try{if(Td[fa](a))return I(136),a+"?q="}catch(b){I(145)}return a};var Ud,Vd,Wd=function(a){Ud=a.c(S,"");Vd=a.c(kc,"")},Xd=function(a){var b=a.c(S,""),c=a.c(kc,"");b!=Ud&&(-1<c[r]("ds")?a.set(mc,g):!G(Ud)&&-1<Vd[r]("ds")&&a.set(mc,Ud))};var Zd=function(a){Yd(a,K[A][wa])?(a.set(Mc,h),I(12)):a.set(Mc,l)},Yd=function(a,b){if(!a.get(fb))return l;var c=La(b,a.get(gb)),d=L(c.d.get("__utma")),e=L(c.d.get("__utmb")),f=L(c.d.get("__utmc")),k=L(c.d.get("__utmx")),m=L(c.d.get("__utmz")),t=L(c.d.get("__utmv")),c=L(c.d.get("__utmk"));if(Yc(""+d+e+f+k+m+t)!=c){d=J(d);e=J(e);f=J(f);k=J(k);f=$d(d+e+f+k,m,t,c);if(!f)return l;m=f[0];t=f[1]}if(!bd(a,d,h))return l;ed(a,e,h);id(a,m,h);gd(a,t,h);ae(a,k,h);return h},ce=function(a,b,c){var d;d=cd(a)||"-";
var e=dd(a)||"-",f=""+a.b(O,1)||"-",k=be(a)||"-",m=hd(a,l)||"-";a=fd(a,l)||"-";var t=Yc(""+d+e+f+k+m+a),u=[];u[p]("__utma="+d);u[p]("__utmb="+e);u[p]("__utmc="+f);u[p]("__utmx="+k);u[p]("__utmz="+m);u[p]("__utmv="+a);u[p]("__utmk="+t);d=u[D]("&");if(!d)return b;e=b[r]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[r]("?");0<e&&(c=b[C](e),b=b[C](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},$d=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Yc(a+b+c))return I(127),[b,c];var k=b[q](/ /g,"%20"),
m=c[q](/ /g,"%20");if(d==Yc(a+k+m))return I(128),[k,m];k=k[q](/\+/g,"%20");m=m[q](/\+/g,"%20");if(d==Yc(a+k+m))return I(129),[k,m];try{var t=b[na]("utmctr=(.*?)(?:\\|utm|$)");if(t&&2==t[x]&&(k=b[q](t[1],H(J(t[1]))),d==Yc(a+k+c)))return I(139),[k,c]}catch(u){}b=J(b)}c=J(c)}};var de="|",fe=function(a,b,c,d,e,f,k,m,t){var u=ee(a,b);u||(u={},a.get(Cb)[p](u));u.id_=b;u.affiliation_=c;u.total_=d;u.tax_=e;u.shipping_=f;u.city_=k;u.state_=m;u.country_=t;u.items_=u.items_||[];return u},ge=function(a,b,c,d,e,f,k){a=ee(a,b)||fe(a,b,"",0,0,0,"","","");var m;a:{if(a&&a.items_){m=a.items_;for(var t=0;t<m[x];t++)if(m[t].sku_==c){m=m[t];break a}}m=j}t=m||{};t.transId_=b;t.sku_=c;t.name_=d;t.category_=e;t.price_=f;t.quantity_=k;m||a.items_[p](t);return t},ee=function(a,b){for(var c=
a.get(Cb),d=0;d<c[x];d++)if(c[d].id_==b)return c[d];return j};var he,ie=function(a){if(!he){var b;b=K[A].hash;var c=W[s],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[na](d)||c&&c[na](d))?b[1]:L(pd("GASO")))&&b[na](/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i))Fd(a,"GASO",""+b),M._gasoDomain=a.get(bb),M._gasoCPath=a.get(P),a=c[1],Ha("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Da(),"_gasojs");he=h}};var ae=function(a,b,c){c&&(b=J(b));c=a.b(O,1);b=b[z](".");!(2>b[x])&&/^\d+$/[fa](b[0])&&(b[0]=""+c,Fd(a,"__utmx",b[D](".")))},be=function(a,b){var c=$c(a.get(O),pd("__utmx"));"-"==c&&(c="");return b?H(c):c};var ke=function(a,b){var c=n.min(a.b(Dc,0),100);if(a.b(Q,0)%100>=c)return l;a:{if(c=(c=W.performance||W.webkitPerformance)&&c.timing){var d=c.navigationStart;if(0==d)I(133);else{c=[c.loadEventStart-d,c.domainLookupEnd-c.domainLookupStart,c.connectEnd-c.connectStart,c.responseStart-c.requestStart,c.responseEnd-c.responseStart,c.fetchStart-d,c.domInteractive-d,c.domContentLoadedEventStart-d];break a}}c=g}c||(W.top!=W?c=g:(d=(c=W.external)&&c.onloadT,c&&!c.isValidLoadTime&&(d=g),2147483648<d&&(d=g),
0<d&&c.setPageReadyTime(),c=d==g?g:[d]));if(c==g)return l;d=c[0];if(d==g||d==ba||isNaN(d))return l;if(0<d){a:{for(d=1;d<c[x];d++)if(isNaN(c[d])||c[d]==ba||0>c[d]){d=l;break a}d=h}d?b(je(c)):b(je(c[ia](0,1)))}else Fa(W,"load",function(){ke(a,b)},l);return h},me=function(a,b,c,d){var e=new yd;e.f(14,90,b[C](0,64));e.f(14,91,a[C](0,64));e.f(14,92,""+le(c));d!=g&&e.f(14,93,d[C](0,64));e.o(14,90,c);return e},le=function(a){return isNaN(a)||0>a?0:5E3>a?10*n[ka](a/10):5E4>a?100*n[ka](a/100):41E5>a?1E3*n[ka](a/
1E3):41E5},je=function(a){for(var b=new yd,c=0;c<a[x];c++)b.f(14,c+1,""+le(a[c])),b.o(14,c+1,a[c]);return b};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Nc)[a])&&b[x])for(var c={type:a,target:e,stopPropagation:function(){throw"aborted";}},d=0;d<b[x];d++)b[d].call(e,c)}}var e=this;this.a=new Zc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set($a,a||"");this.set(Ya,c||"");this.set(ab,n.round((new Date).getTime()/1E3));this.set(P,"/");this.set(cb,63072E6);this.set(eb,15768E6);this.set(db,18E5);this.set(fb,l);
this.set(yb,50);this.set(gb,l);this.set(hb,h);this.set(ib,h);this.set(jb,h);this.set(kb,h);this.set(lb,h);this.set(ob,"utm_campaign");this.set(nb,"utm_id");this.set(pb,"gclid");this.set(qb,"utm_source");this.set(rb,"utm_medium");this.set(sb,"utm_term");this.set(tb,"utm_content");this.set(ub,"utm_nooverride");this.set(vb,100);this.set(Dc,1);this.set(Ec,l);this.set(wb,"/__utm.gif");this.set(xb,1);this.set(Cb,[]);this.set(Fb,[]);this.set(zb,Ld[ia](0));this.set(Ab,[]);this.set(Bb,[]);this.B("auto");this.set(Jb,
K.referrer);a=this.a;try{var f=La(K[A][wa],l),k=da(Ia(f.d.get("utm_referrer")))||"";k&&a.set(Jb,k);var m=W.gaData&&W.gaData.expId;m||(m=da(L(f.d.get("utm_expid")))||"");m&&a.set(Oc,""+m)}catch(t){I(146)}this.set(Nc,{hit:[],load:[]});this.a.g("0",Zd);this.a.g("1",Wd);this.a.g("2",Jd);this.a.g("3",Sd);this.a.g("4",Xd);this.a.g("5",Kd);this.a.g("6",d("load"));this.a.g("7",ie);this.a.e("A",kd);this.a.e("B",md);this.a.e("C",Jd);this.a.e("D",jd);this.a.e("E",Tc);this.a.e("F",ne);this.a.e("G",Gd);this.a.e("H",
nd);this.a.e("I",ud);this.a.e("J",Dd);this.a.e("K",d("hit"));this.a.e("L",oe);this.a.e("M",pe);0===this.get(ab)&&I(111);this.a.T();this.H=g};F=U[y];F.m=function(){var a=this.get(Db);a||(a=new yd,this.set(Db,a));return a};F.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};F.K=function(a){if(this.get(Ec))return l;var b=this,c=ke(this.a,function(c){b.set(Hb,a,h);b.t(c)});this.set(Ec,c);return c};
F.Fa=function(a){a&&Ba(a)?(I(13),this.set(Hb,a,h)):"object"===typeof a&&a!==j&&this.La(a);this.H=a=this.get(Hb);this.a.j("page");this.K(a)};F.F=function(a,b,c,d,e){if(""==a||(!wd(a)||""==b||!wd(b))||c!=g&&!wd(c)||d!=g&&!xd(d))return l;this.set(wc,a,h);this.set(xc,b,h);this.set(yc,c,h);this.set(zc,d,h);this.set(vc,!!e,h);this.a.j("event");return h};
F.Ha=function(a,b,c,d,e){var f=this.a.b(Dc,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return l;c=1*(""+c);if(""==a||(!wd(a)||""==b||!wd(b)||!xd(c)||isNaN(c)||0>c||0>f||100<f)||d!=g&&(""==d||!wd(d)))return l;this.t(me(a,b,c,d));return h};F.Ga=function(a,b,c,d){if(!a||!b)return l;this.set(Ac,a,h);this.set(Bc,b,h);this.set(Cc,c||K[A][wa],h);d&&this.set(Hb,d,h);this.a.j("social");return h};F.Ea=function(){this.set(Dc,10);this.K(this.H)};F.Ia=function(){this.a.j("trans")};
F.t=function(a){this.set(Eb,a,h);this.a.j("event")};F.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){I(91);b.F(a,c,d,e)}}};F.ma=function(a){return this.get(a)};F.xa=function(a,b){if(a)if(Ba(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};F.addEventListener=function(a,b){var c=this.get(Nc)[a];c&&c[p](b)};F.removeEventListener=function(a,b){for(var c=this.get(Nc)[a],d=0;c&&d<c[x];d++)if(c[d]==b){c.splice(d,1);break}};F.qa=function(){return"5.3.8"};
F.B=function(a){this.get(hb);a="auto"==a?Ka(K.domain):!a||"-"==a||"none"==a?"":a[E]();this.set(bb,a)};F.va=function(a){this.set(hb,!!a)};F.na=function(a,b){return ce(this.a,a,b)};F.link=function(a,b){if(this.a.get(fb)&&a){var c=ce(this.a,a,b);K[A].href=c}};F.ua=function(a,b){this.a.get(fb)&&(a&&a.action)&&(a.action=ce(this.a,a.action,b))};
F.za=function(){this.v();var a=this.a,b=K.getElementById?K.getElementById("utmtrans"):K.utmform&&K.utmform.utmtrans?K.utmform.utmtrans:j;if(b&&b[ma]){a.set(Cb,[]);for(var b=b[ma][z]("UTM:"),c=0;c<b[x];c++){b[c]=Ca(b[c]);for(var d=b[c][z](de),e=0;e<d[x];e++)d[e]=Ca(d[e]);"T"==d[0]?fe(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&ge(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};F.$=function(a,b,c,d,e,f,k,m){return fe(this.a,a,b,c,d,e,f,k,m)};F.Y=function(a,b,c,d,e,f){return ge(this.a,a,b,c,d,e,f)};
F.Aa=function(a){de=a||"|"};F.ea=function(){this.set(Cb,[])};F.wa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(yb))a=l;else if(!b||!c||128<b[x]+c[x])a=l;else{1!=d&&2!=d&&(d=3);var f={};ea(f,b);f.value=c;f.scope=d;e.get(Fb)[a]=f;a=h}a&&this.a.n();return a};F.ka=function(a){this.a.get(Fb)[a]=g;this.a.n()};F.ra=function(a){return(a=this.a.get(Fb)[a])&&1==a[ta]?a[ma]:g};F.Ca=function(a,b,c){this.m().f(a,b,c)};F.Da=function(a,b,c){this.m().o(a,b,c)};F.sa=function(a,b){return this.m().getKey(a,b)};
F.ta=function(a,b){return this.m().N(a,b)};F.fa=function(a){this.m().L(a)};F.ga=function(a){this.m().M(a)};F.ja=function(){return new yd};F.W=function(a){a&&this.get(Ab)[p](a[E]())};F.ba=function(){this.set(Ab,[])};F.X=function(a){a&&this.get(Bb)[p](a[E]())};F.ca=function(){this.set(Bb,[])};F.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[E]()][D](":");if(d||e)a=[a,d,e][D](":");d=this.get(zb);d.splice(c?0:d[x],0,a)}};F.da=function(){this.set(zb,[])};
F.ha=function(a){this.a[ja]();var b=this.get(P),c=be(this.a);this.set(P,a);this.a.n();ae(this.a,c);this.set(P,b)};F.ya=function(a,b){if(0<a&&5>=a&&Ba(b)&&""!=b){var c=this.get(Fc)||[];c[a]=b;this.set(Fc,c)}};F.V=function(a){a=""+a;if(a[na](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Ic)||[];b[p](a);this.set(Ic,b)}};F.v=function(){this.a[ja]()};F.Ba=function(a){a&&""!=a&&(this.set(Tb,a),this.a.j("var"))};var ne=function(a){"trans"!==a.get(sc)&&500<=a.b(cc,0)&&a[sa]();if("event"===a.get(sc)){var b=(new Date).getTime(),c=a.b(dc,0),d=a.b(Zb,0),c=n[ka](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(dc,b),a.set(R,n.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[sa]()}},pe=function(a){"event"===a.get(sc)&&a.set(R,n.max(0,a.b(R,10)-1))};var qe=function(){var a=[];this.add=function(b,c,d){d&&(c=H(""+c));a[p](b+"="+c)};this.toString=function(){return a[D]("&")}},re=function(a,b){(b||2!=a.get(xb))&&a.z(cc)},se=function(a,b){b.add("utmwv","5.3.8");b.add("utms",a.get(cc));b.add("utmn",Da());var c=K[A].hostname;G(c)||b.add("utmhn",c,h);c=a.get(vb);100!=c&&b.add("utmsp",c,h)},te=function(a,b){b.add("utmac",Ca(a.get(Wa)));a.get(Oc)&&b.add("utmxkey",a.get(Oc),h);a.get(vc)&&b.add("utmni",1);var c=a.get(Ic);c&&0<c[x]&&b.add("utmdid",c[D]("."));
var c=function(a,b){b&&d[p](a+"="+b+";")},d=[];c("__utma",cd(a));c("__utmz",hd(a,l));c("__utmv",fd(a,h));c("__utmx",be(a));b.add("utmcc",d[D]("+"),h);a.get(Xa)!==l&&(a.get(Xa)||M.w)&&b.add("aip",1);b.add("utmu",od.Xa())},ue=function(a,b){for(var c=a.get(Fc)||[],d=[],e=1;e<c[x];e++)c[e]&&d[p](e+":"+H(c[e][q](/%/g,"%25")[q](/:/g,"%3A")[q](/,/g,"%2C")));d[x]&&b.add("utmpg",d[D](","))},ve=function(a,b){a.get(ib)&&(b.add("utmcs",a.get(Qb),h),b.add("utmsr",a.get(Lb)),a.get(Rb)&&b.add("utmvp",a.get(Rb)),
b.add("utmsc",a.get(Mb)),b.add("utmul",a.get(Pb)),b.add("utmje",a.get(Nb)),b.add("utmfl",a.get(Ob),h))},we=function(a,b){a.get(lb)&&a.get(Ib)&&b.add("utmdt",a.get(Ib),h);b.add("utmhid",a.get(Kb));b.add("utmr",Pa(a.get(Jb),a.get(P)),h);b.add("utmp",H(a.get(Hb),h),h)},xe=function(a,b){for(var c=a.get(Db),d=a.get(Eb),e=a.get(Fb)||[],f=0;f<e[x];f++){var k=e[f];k&&(c||(c=new yd),c.f(8,f,k[s]),c.f(9,f,k[ma]),3!=k[ta]&&c.f(11,f,""+k[ta]))}!G(a.get(wc))&&!G(a.get(xc),h)&&(c||(c=new yd),c.f(5,1,a.get(wc)),
c.f(5,2,a.get(xc)),e=a.get(yc),e!=g&&c.f(5,3,e),e=a.get(zc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Qa(d),h):d&&b.add("utme",d.A(),h)},ye=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[w]()},
ze=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[w]()},Ae=function(a,b){var c=a.get(sc);if("page"==c)c=new qe,re(a,b),se(a,c),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[w]()];else if("event"==c)c=new qe,re(a,b),se(a,c),
c.add("utmt","event"),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[w]()];else if("var"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","var"),!b&&te(a,c),c=[c[w]()];else if("trans"==c)for(var c=[],d=a.get(Cb),e=0;e<d[x];++e){c[p](ye(a,d[e],b));for(var f=d[e].items_,k=0;k<f[x];++k)c[p](ze(a,f[k],b))}else"social"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Ac),h),c.add("utmsa",a.get(Bc),h),c.add("utmsid",a.get(Cc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[w]()]):
"feedback"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","feedback"),c.add("utmfbid",a.get(Gc),h),c.add("utmfbpr",a.get(Hc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[w]()]):c=[];return c},oe=function(a){var b,c=a.get(xb),d=a.get(uc),e=d&&d.Ua,f=0;if(0==c||2==c){var k=a.get(wb)+"?";b=Ae(a,h);for(var m=0,t=b[x];m<t;m++)Sa(b[m],e,k,h),f++}if(1==c||2==c){b=Ae(a);m=0;for(t=b[x];m<t;m++)try{Sa(b[m],e),f++}catch(u){u&&Ra(u[s],g,u.message)}}d&&(d.q=f)};var Be=function(){return"https:"==K[A][B]||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com"},Ce=function(a){ea(this,"len");this.message=a+"-8192"},De=function(a){ea(this,"ff2post");this.message=a+"-2036"},Sa=function(a,b,c,d){b=b||Ea;if(d||2036>=a[x]){var e=b;b=c||Be()+"/__utm.gif?";var f=new Image(1,1);f.src=b+a;f.onload=function(){f.onload=j;f.onerror=j;e()};f.onerror=function(){f.onload=j;f.onerror=j;e()}}else if(8192>=a[x]){var k=b;if(0<=W[ya].userAgent[r]("Firefox")&&
![].reduce)throw new De(a[x]);var m;b=Be()+"/p/__utm.gif";if(c=W.XDomainRequest)m=new c,m.open("POST",b);else if(c=W.XMLHttpRequest)c=new c,"withCredentials"in c&&(m=c,m.open("POST",b,h),m.setRequestHeader("Content-Type","text/plain"));m?(m.onreadystatechange=function(){4==m.readyState&&(k(),m=j)},m.send(a),b=h):b=g;b||Ee(a,k)}else throw new Ce(a[x]);},Ee=function(a,b){if(K.body){a=aa(a);try{var c=K[pa]('<iframe name="'+a+'"></iframe>')}catch(d){c=K[pa]("iframe"),ea(c,a)}c.height="0";c.width="0";
c.style.display="none";c.style.visibility="hidden";var e=K[A],e=Be()+"/u/post_iframe.html#"+aa(e[B]+"//"+e[v]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Fa(W,"beforeunload",f);var k=l,m=0,t=function(){if(!k){try{if(9<m||c.contentWindow[A][v]==K[A][v]){k=h;f();Ga(W,"beforeunload",f);b();return}}catch(a){}m++;ca(t,200)}};Fa(c,"load",t);K.body.appendChild(c);c.src=e}else ca(function(){Ee(a,b)},100)};var $=function(){this.G=this.w=l;this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;var a=function(a,c,d){T($[y],a,c,d)};a("_createTracker",$[y].r,55);a("_getTracker",$[y].oa,0);a("_getTrackerByName",$[y].u,51);a("_getTrackers",$[y].pa,130);a("_anonymizeIp",$[y].aa,16);a("_forceSSL",$[y].la,125);a("_getPlugin",Pc,120);a=function(a,c,d){T(U[y],a,c,d)};Qc("_getName",$a,58);Qc("_getAccount",Wa,64);Qc("_visitCode",Q,54);Qc("_getClientInfo",
ib,53,1);Qc("_getDetectTitle",lb,56,1);Qc("_getDetectFlash",jb,65,1);Qc("_getLocalGifPath",wb,57);Qc("_getServiceMode",xb,59);V("_setClientInfo",ib,66,2);V("_setAccount",Wa,3);V("_setNamespace",Ya,48);V("_setAllowLinker",fb,11,2);V("_setDetectFlash",jb,61,2);V("_setDetectTitle",lb,62,2);V("_setLocalGifPath",wb,46,0);V("_setLocalServerMode",xb,92,g,0);V("_setRemoteServerMode",xb,63,g,1);V("_setLocalRemoteServerMode",xb,47,g,2);V("_setSampleRate",vb,45,1);V("_setCampaignTrack",kb,36,2);V("_setAllowAnchor",
gb,7,2);V("_setCampNameKey",ob,41);V("_setCampContentKey",tb,38);V("_setCampIdKey",nb,39);V("_setCampMediumKey",rb,40);V("_setCampNOKey",ub,42);V("_setCampSourceKey",qb,43);V("_setCampTermKey",sb,44);V("_setCampCIdKey",pb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",yb,0,1);V("_setVisitorCookieTimeout",cb,28,1);V("_setSessionCookieTimeout",db,26,1);V("_setCampaignCookieTimeout",eb,29,1);V("_setReferrerOverride",Jb,49);V("_setSiteSpeedSampleRate",Dc,132);a("_trackPageview",U[y].Fa,1);a("_trackEvent",
U[y].F,4);a("_trackPageLoadTime",U[y].Ea,100);a("_trackSocial",U[y].Ga,104);a("_trackTrans",U[y].Ia,18);a("_sendXEvent",U[y].t,78);a("_createEventTracker",U[y].ia,74);a("_getVersion",U[y].qa,60);a("_setDomainName",U[y].B,6);a("_setAllowHash",U[y].va,8);a("_getLinkerUrl",U[y].na,52);a("_link",U[y].link,101);a("_linkByPost",U[y].ua,102);a("_setTrans",U[y].za,20);a("_addTrans",U[y].$,21);a("_addItem",U[y].Y,19);a("_clearTrans",U[y].ea,105);a("_setTransactionDelim",U[y].Aa,82);a("_setCustomVar",U[y].wa,
10);a("_deleteCustomVar",U[y].ka,35);a("_getVisitorCustomVar",U[y].ra,50);a("_setXKey",U[y].Ca,83);a("_setXValue",U[y].Da,84);a("_getXKey",U[y].sa,76);a("_getXValue",U[y].ta,77);a("_clearXKey",U[y].fa,72);a("_clearXValue",U[y].ga,73);a("_createXObj",U[y].ja,75);a("_addIgnoredOrganic",U[y].W,15);a("_clearIgnoredOrganic",U[y].ba,97);a("_addIgnoredRef",U[y].X,31);a("_clearIgnoredRef",U[y].ca,32);a("_addOrganic",U[y].Z,14);a("_clearOrganic",U[y].da,70);a("_cookiePathCopy",U[y].ha,30);a("_get",U[y].ma,
106);a("_set",U[y].xa,107);a("_addEventListener",U[y].addEventListener,108);a("_removeEventListener",U[y].removeEventListener,109);a("_addDevId",U[y].V);a("_getPlugin",Pc,122);a("_setPageGroup",U[y].ya,126);a("_trackTiming",U[y].Ha,124);a("_initData",U[y].v,2);a("_setVar",U[y].Ba,22);V("_setSessionTimeout",db,27,3);V("_setCookieTimeout",eb,25,3);V("_setCookiePersistence",cb,24,1);a("_setAutoTrackOutbound",Ea,79);a("_setTrackOutboundSubdomains",Ea,81);a("_setHrefExamineLimit",Ea,80)};F=$[y];
F.oa=function(a,b){return this.r(a,g,b)};F.r=function(a,b,c){b&&I(23);c&&I(67);b==g&&(b="~"+M.U++);a=new U(b,a,c);M.C[b]=a;M.D[p](a);return a};F.u=function(a){a=a||"";return M.C[a]||M.r(g,a)};F.pa=function(){return M.D[ia](0)};F.aa=function(){this.w=h};F.la=function(){this.G=h};var Fe=function(a){if("prerender"==K.webkitVisibilityState)return l;a();return h};var M=new $;var Ge=W._gat;Ge&&Aa(Ge._getTracker)?M=Ge:W._gat=M;var Z=new Y;var He=function(){var a=W._gaq,b=l;if(a&&Aa(a[p])&&(b="[object Array]"==Object[y][w].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[p][xa](Z,a)};if(!Fe(He)){I(123);var Ie=l,Je=function(){!Ie&&Fe(He)&&(Ie=h,Ga(K,"webkitvisibilitychange",Je))};Fa(K,"webkitvisibilitychange",Je)};function Yc(a){var b=1,c=0,d;if(a){b=0;for(d=a[x]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b};})();


$(document).ready(function() {
    NLUtility.log("--- DOCUMENT READY ---");
    
    $('<div id="ngMessaggiCount"></div>').appendTo("body");
    $('<div id="ngVisiteCount"></div>').appendTo("body");
    
    NLUtility.notify();
    
    if (NightGuide.getCitta())
    {
        NLUtility.log("idCitta = " + NightGuide.getCitta().id);
    }
    
    if (NightGuide.getUtente())
    {
        var utente = NightGuide.getUtente();
        NLUtility.log("username = " + utente.username);
        NLUtility.log("password = " + utente.password);
        NLUtility.log(utente);
    }
    
    document.addEventListener('deviceready', 
        function() {
            NLUtility.log("--- DEVICE READY ---");
            NG_PHONEGAP = true;
            
            if (NightGuide.isLogged() && !NLUtility.NOTIFYING)
            {
                NLUtility.notify();
            }
            
            if (NLUtility.isIOS())
            {
                NG_DEVICE_ID = $.md5(device.uuid);
                NLUtility.log("NG_DEVICE_ID = " + NG_DEVICE_ID);
            }
            else if (NLUtility.isAndroid())
            {
                window.plugins.deviceId.getId(
                    function(devId) {
                        NLUtility.log("deviceId: " + devId);
                        NG_DEVICE_ID = devId;
                        NLUtility.log("NG_DEVICE_ID = " + NG_DEVICE_ID);
                    },
                    function(e) {
                        NLUtility.log("deviceId Error: " + e);
                        NG_DEVICE_ID = null;
                    }
                );
            }

            var cb;
            if (NLUtility.isIOS())
            {
                cb = ChildBrowser.install();
                //NG_TOOLBAR_HEIGHT = 45;
            }
            else if (NLUtility.isAndroid()) 
            {
                cb = ChildBrowser;
                //NG_TOOLBAR_HEIGHT = 45;
            }
            
            if (cb != null)
            {
                NLUtility.log("ChildBrowser installed");
                //cb.onLocationChange = function(loc) { NLUtility.onLocationChanged(loc); };
                //cb.onClose = function() { NLUtility.onCloseBrowser() };
                cb.onOpenExternal = function() {NLUtility.log("Open External");};
                //window.plugins.childBrowser.showWebPage("http://google.com");
                
                //cb.logout();
                //NLUtility.log("Cookies deleted");
            }
            
            window.plugins.toolBar.create(
                "ngToolBar", true,
                function(e) 
                { 
                    NLUtility.log("ngToolBar: " + e);
                    
                    window.plugins.toolBar.addLeft(
                        "ngToolBar", "btnBack", "", "icon_indietro.png", 0, function() {
                            //NLUtility.log("btnBack"); 
                            NLUtility.goBack();
                        },
                        function(e) {NLUtility.log("btnBack: " + e);},
                        function(e) {NLUtility.log("btnBack Error: " + e);}
                    );
                    
                    window.plugins.toolBar.addCenter(
                        "ngToolBar", "btnMessaggi", "", "icon_messaggi.png", 0, function() { 
                            if (NightGuide.isLogged()) {
                                $.mobile.changePage('conversazioni.html');
                            } 
                            else {
                                $.mobile.changePage('login.html?back=1&url=conversazioni.html',{role:'dialog'});
                            }
                        },
                        function(e) {NLUtility.log("btnMessaggi: " + e);},
                        function(e) {NLUtility.log("btnMessaggi Error: " + e);}
                    );

                    window.plugins.toolBar.addCenter(
                        "ngToolBar", "btnVisite", "", "icon_visite.png", 0, function() { 
                            if (NightGuide.isLogged()) {
                                $.mobile.changePage('visite.html');
                            }
                            else{
                                $.mobile.changePage('login.html?back=1&url=visite.html',{role:'dialog'});
                            }
                        },
                        function(e) {NLUtility.log("btnVisite: " + e);},
                        function(e) {NLUtility.log("btnVisite Error: " + e);}
                    );
                        
                    window.plugins.toolBar.addRight(
                        "ngToolBar", "btnHome", "", "icon_home.png", 0, function() {$.mobile.changePage("home.html", {"reverse": true})},
                        function(e) {NLUtility.log("btnHome: " + e);},
                        function(e) {NLUtility.log("btnHome Error: " + e);}
                    );
                },
                function(e) {NLUtility.log("ToolBar Error: " + e);}
            );
                
            document.addEventListener("backbutton", function() {
                NLUtility.log("backbutton");
                if (NLUtility.isAndroid() && $.mobile.activePage)
                {
                    if (NG_PHOTOSWIPE_INSTANCE)
                    {
                        NLUtility.log('hide photoswipe');
                        NG_PHOTOSWIPE_INSTANCE.hide();
                        return;
                    }
                    
                    if (($.mobile.activePage.attr("id") == "ngHome")
                        || ($.mobile.activePage.attr("id") == "ngCitta" && NLUtility.getUrlVar("back", NLUtility.getPageURL(event)) == "0"))
                    {
                        navigator.app.exitApp();
                        return;
                    }
                    /*
                    else if (($.mobile.activePage.attr("id") == "ngGallery"))
                    {
                    }
                    */
                }
                NLUtility.goBack();
            }, false);
        }, 
        false
    );
});

$(document).bind("orientationchange", function(event) {
    /*
    NLUtility.log(event);
    NLUtility.log("Window height: " + $(window).height());
    NLUtility.log("Page height: " + $.mobile.activePage.height());
    NLUtility.log("Content height: " + $.mobile.activePage.find(".ui-content").height());
    */
    var winHeight = $(window).height();
    var $content = $.mobile.activePage.find(".ui-content");
    if ($content.height() < winHeight)
    {
        $content.height(winHeight);
    }
});

/*
$(document).bind("scrollstop", function() {
    if ($.mobile.activePage.attr("id") == "ngGallery")
    {
        NLUtility.log("Scroll position: " + $(document).scrollTop());
    }
});
*/

/*
$(document).ajaxError(
    function(event, jqXHR, ajaxSettings, thrownError) { 
        if (thrownError != "" && thrownError != "abort") {
            NLUtility.showError("Si è verificato un errore: " + thrownError);
        }
    }
);
*/

$(document).bind("pagebeforechange", function (event, data) {
    NLUtility.log("pagebeforechange global");
    
    if (typeof data.toPage == "string")
    {
        var url = data.toPage;
        var page = url.substring(url.lastIndexOf("/")+1);
        NLUtility.log("google analytics push: " + page);
        _gaq.push(['_trackPageview', page]);
    }

    NLUtility.pageBeforeChange(event, data);
});

$(document).bind("pageinit", function (event) {
    NLUtility.log("pageinit global");
    NLUtility.log(NightGuide.getCitta());
    NLUtility.log("event.target.id: "+event.target.id);
    if (!NightGuide.getCitta() && event.target.id != "ngCitta" && event.target.id != "ngIndex")
    {
        $.mobile.changePage("citta.html?back=0", {"transition": "pop"});
    }
});

$(document).delegate("#ngIndex", "pageshow", function(event) {
    NLUtility.log("ngIndex pageshow");
    //NLUtility.log(NightGuide.getCitta());
    $("#ngIndexLoading").show();
    if (!NG_PHONEGAP && (NLUtility.isIOS() || NLUtility.isAndroid())) 
    {
        NLUtility.log("Delayed start");
        setTimeout(function(){NightGuide.start(event)},1000);
    }
    else
    {
        NightGuide.start(event);
    }
    
});

$(document).bind("pagebeforeshow", function (event) {
    NLUtility.log("pagebeforeshow: " + event.target.id);
    NightGuide.updateAuthTags();
    if (NG_PHONEGAP)
    {
        if (!$(event.target).hasClass("ui-dialog")) 
        {
            NLUtility.log("Remove HTML toolbar");
            NLUtility.removeHeader();
        }
        
        if (event.target.id == "ngHome" || event.target.id == "ngIndex"
            || $(event.target).hasClass("ui-dialog")
            || (event.target.id == "ngCitta" && NLUtility.getUrlVarAsString("back") == "0"))
        {
            NLUtility.log("Hide native toolbar");
            window.plugins.toolBar.hide("ngToolBar");
            if (event.target.id == "ngCitta" && NLUtility.getUrlVarAsString("back") == "0")
            {
                NLUtility.addSpacer(event.target.id);
            }
            /*
            if (NLUtility.isIOS())
            {
                NLUtility.removeSpacer(event.target.id);
            }
            */
        }
        else
        {
            NLUtility.log("Show native toolbar");
            window.plugins.toolBar.show("ngToolBar", true);
            if (NLUtility.isIOS())
            {
                NLUtility.addSpacer(event.target.id);
            }
        }
    }
});


$(document).bind("pageshow", function (event) {
    NLUtility.log("pageshow: " + event.target.id);
   
    //NLUtility.log($.mobile.activePage);
    /*
    if (NG_PHONEGAP)
    {
        
        if (event.target.id == "ngHome")
            window.plugins.toolBar.hide("ngToolBar");
        else
            window.plugins.toolBar.show("ngToolBar", true);
    }
    */
});


$(document).bind("pagechange", function (toPage, info) {
    //NLUtility.log("pagechange");
    //NLUtility.log(info);
    // INFO: We don't want jqm to keep the first page indefinitely, we need to break the cache, even if we are doing ajax
    if ($.mobile.firstPage && info.options.fromPage && info.toPage
        && ($.mobile.firstPage == info.options.fromPage)
        && (info.options.fromPage[0].id != info.toPage[0].id))
    {
        $.mobile.firstPage.remove();
        // We only need to remove 1 time from DOM, so unbind the unused event
        $(document).unbind("pagechange", this);
        NLUtility.log("first page removed");
    }

    NLUtility.restoreBadge("ngMessaggiCount", ".ng-icon-messaggi");
    NLUtility.restoreBadge("ngVisiteCount", ".ng-icon-visite");
});

$(document).delegate("#ngLocaleGeo", "pageshow", function(event) {
    NLUtility.log("ngLocaleGeo");
    var latLocale = NLUtility.getUrlVarAsString("lat", NLUtility.getPageURL(event));
    var lngLocale = NLUtility.getUrlVarAsString("lng", NLUtility.getPageURL(event));
    var destination = latLocale+','+lngLocale;
    $('#ngLocaleGeoMap').height(($(window).height()-$(".ui-header").height())*0.75);
    
    if (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined")
    {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                NLUtility.log("Geolocation source: " + lat + ","+lng);
                NLUtility.log("Geolocation destination: " + destination);
                var clientPosition = new google.maps.LatLng(lat, lng);
                $('#ngLocaleGeoMap').gmap({'center': clientPosition, 'zoom': 15, 'disableDefaultUI':false, 'callback': function(map) {
                        NLUtility.log("Map ready");
                        $('#ngLocaleGeoMap').css({'background-image':'none'});
                        var self = this;
                        self.displayDirections(
                            {'origin': lat+','+lng, 'destination': destination, 'travelMode': google.maps.DirectionsTravelMode.DRIVING},
                            {'panel': document.getElementById('ngLocaleGeoDirections')}, 
                            function(response, status) {
                                    NLUtility.log("Directions Response:");
                                    NLUtility.log(response);
                                    if ( status === 'OK' )
                                    {
                                        NLUtility.log("Directions OK");
                                        $('#ngLocaleGeoResults').show();
                                        
                                        // Aggiunge uno spazio prima e dopo gli slash
                                        setTimeout(function(){
                                            NLUtility.log("Show directions");
                                            $(".adp-substep b").each(function() {
                                                var text = $(this).text();
                                                text = text.replace(/\//g, " / ");
                                                NLUtility.log("Direction: " + text);
                                                $(this).text(text);
                                            });
                                        });
                                    }
                                    else
                                    {
                                        NLUtility.log("Directions KO");
                                        $('#ngLocaleGeoResults').hide();
                                    }
                                }
                            );
                }});
            }, 
            function(error) {
                NLUtility.log('Geolocation error: '+error.code+' message: '+error.message);
                //NLUtility.showError("Non è possibile determinare la posizione di partenza!");
                $('#ngLocaleGeoMap').gmap({'center': destination, 'zoom': 15, 'disableDefaultUI':false, 'callback': function(map) {
                        NLUtility.log("Map ready");
                        $('#ngLocaleGeoMap').css({'background-image':'none'});
                        var self = this;
                        self.addMarker({'id': 'client', 'position': destination, 'bounds': false});
                }});
            });
    }
});
    
$(document).delegate("#ngProfiloGeo", "pageshow", function(event) {
    NLUtility.log("ngProfiloGeo");
    NLUtility.adjustTop('#ngProfiloGeoMap');
    
    if (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined")
    {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                NLUtility.log("Position: " + lat + ", " + lng);
                var clientPosition = new google.maps.LatLng(lat, lng);
                $('#ngProfiloGeoMap').gmap({'center': clientPosition, 'zoom': 15, 'disableDefaultUI':false, 'callback': function(map) {
                        NLUtility.log("Map ready");
                        $('#ngProfiloGeoMap').css({'background-image':'none'});
                        var self = this;
                        self.addMarker({'id': 'client', 'position': clientPosition, 'bounds': false});
                        self.watchPosition(function(position, status) {
                            NLUtility.log("watchPosition");
                            if ( status === 'OK' ) {
                                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                if ( !self.get('markers').client ) {
                                        self.addMarker({'id': 'client', 'position': latlng, 'bounds': false});
                                } else {
                                        self.get('markers').client.setPosition(latlng);
                                        map.panTo(latlng);
                                }
                            }
                        });
                }});
            }, 
            function(error) {
                NLUtility.log('Geolocation error: '+error.code+' message: '+error.message);
                $('#ngProfiloGeoMap').css({'background-image':'none'});
                NLUtility.showError("Non è possibile determinare la tua posizione!");
            });
    }

});

$(document).delegate("#ngConversazioni", "pageinit", function(event) {
    NLUtility.log("ngConversazioni pageinit");   
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }

    NightGuide.updateConversazioni(false);
});

$(document).delegate("#ngMessaggi", "pageinit", function(event) {
    NLUtility.log("ngMessaggi");
    
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utenteLoggato = NightGuide.getUtente();
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    $('#ngMessaggiForm').find('input[name="id"]').val(id);
    
    if (id && id != "0")
    {
        $('#ngMessaggiDestinatario').hide();
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "messaggi.php",
            data: {"username": utenteLoggato.username, "password": utenteLoggato.password, "id": id},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                if (data)
                {
                    if (data.destinatario)
                    {
                        $("#ngMessaggiSubtitle").show();
                        $("#ngMessaggiSubtitleLink").attr('href','profilo.html?id='+data.destinatario.iduser);
                        $("#ngMessaggiSubtitleUser").text(data.destinatario.username);
                    }
                    //else
                    //{
                    //    $('#ngMessaggiDestinatario').show();
                    //}
                    
                    if (data.messaggi && data.messaggi.length > 0)
                    {
                        for(var i = 0; i < data.messaggi.length; i++) 
                        {
                            NightGuide.addMessaggio(".ng-messaggi", data.messaggi[i]);
                        }
                    }
                    
                    setTimeout("NLUtility.scrollToBottom()", 1000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    }
    else
    {
        $('#ngMessaggiDestinatario').show();
    }

    var startId = $('#ngMessaggiForm').find('input[name="id"]').val();
    if (startId > 0) {
        NLUtility.log("--- start updateMessages ---");
        NLUtility.updateMessages();
    }
   
    $("#ngMessaggiForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var messaggio = $form.find('input[name="messaggio"]').val();
        var id = $form.find('input[name="id"]').val();
        NLUtility.log("ngMessaggiForm id = " + id);

        if (messaggio == null || messaggio.length == 0) {
            return;
        }
        
        if ((id == null || id.length == 0 || id == "0") 
            && ($('#destinatario').length == 0 || $('#destinatario').val() == null || $('#destinatario').val().length == 0))
        {
            return;
        }
        
        if ($('#destinatario').val() == utenteLoggato.username)
        {
            NLUtility.showError('Non puoi inviare un messaggio a te stesso!');
            return;
        }
        
        if ((id == null || id.length == 0 || id == "0") && $('#destinatario').val().length > 0)
        {
            var username = $('#destinatario').val();
            NLUtility.log("Nuova conversazione con " + username);
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + "messaggi.php",
                data: {"action": "utente", "username": username},
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data && data.result) {
                        NLUtility.hideLoading();
                        NLUtility.log("User ID: " + data.id);
                        $form.find('input[name="id"]').val(data.id);
                        NLUtility.sendMessage($form, data.id, messaggio, function() {
                            $(".ng-destinatario").remove();
                            if (!startId || startId < 1) {
                                NLUtility.log("--- start updateMessages (new) ---");
                                NLUtility.updateMessages();
                            }
                        });
                    }
                    else {
                        NLUtility.showError('Non ci sono utenti con questo nickname!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        }
        else
        {
            NLUtility.log("Continua la conversazione");
            NLUtility.sendMessage($form, id, messaggio);
        }
    });
});
    
$(document).delegate("#ngConversazioniDelete", "pageinit", function(event) {
    NLUtility.log("ngConversazioniDelete");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    $("#ngConversazioniDeleteButton").attr("data-id", id);
    
    $("#ngConversazioniDeleteButton").click(function(event) {
        event.preventDefault();
        var id = $(this).attr('data-id');
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "conversazioni.php",
            data: {"action": "delete", "id": id, "username": utente.username, "password": utente.password},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                NLUtility.hideLoading();
                if (!data.result) {
                    NLUtility.showError("Non è possibile cancellare la conversazione!");
                    return;
                }
                else {
                    $('#ngConversazione'+id).remove();
                }
                $('.ui-dialog').dialog('close');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngHome", "pageinit", function(event) {
    NLUtility.log("ngHome pageinit");
    //NG_STARTED = true;
    if (!NG_PHONEGAP)
    {
        $(".ng-header").css({'marginTop':'38px'});
    }
    $(".ng-home-block").each(function(index) {
        $(this).click(function(e) {
            $(this).addClass("ng-home-block-selected");
        });
    });
});

$(document).delegate("#ngHome", "pageshow", function(event) {
    NLUtility.log("ngHome pageshow");
    NLUtility.clearDomCache();
    NLUtility.hideLoading();
});

$(document).delegate("#ngProfiloFoto", "pageinit", function(event) {
    NLUtility.log("ngProfiloFoto");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    
    if (utente) {
        $("#ngProfiloFotoImage").attr("src", utente.foto);
    }
    
    $("#ngProfiloFotoCamera").click(function() 
    {
        NLUtility.sendImage("camera", "#ngProfiloFotoImage", "#ngProfiloFotoEdited");
    });
    
    $("#ngProfiloFotoLibrary").click(function() 
    {
        NLUtility.sendImage("library", "#ngProfiloFotoImage", "#ngProfiloFotoEdited");
    });
    
    $("#ngProfiloFotoConferma").click(function()
    {
        NLUtility.log("ngProfiloFotoConferma");
        
        var edited = $("#ngProfiloFotoEdited").val();
        if (edited != "true")
        {
            NLUtility.log("Image not changed");
            $.mobile.changePage("profilo.html");
            return;
        }
        
        var src = $("#ngProfiloFotoImage").attr("src");
        var base64 = src.substring(23);
        
        NLUtility.log("Image as base64: " + base64);
        
        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "image", "username": utente.username, "password": utente.password, "image": base64},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data.result == "true") {
                    NLUtility.hideLoading();
                    utente.foto = data.foto;
                    $.mobile.changePage("profilo.html");
                }
                else {
                    NLUtility.showError("Modifica dell'immagine non riuscita!");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngLoginFb", "pageinit", function(event) {
    NLUtility.log("ngLoginFb");
    var accesstoken = NLUtility.getUrlVarAsString("accesstoken", NLUtility.getPageURL(event));
    if (accesstoken)
    {
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "facebook.php",
            data: {"action" : "me", "accesstoken": accesstoken},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data) {
                    NLUtility.hideLoading();
                    $("#ngLoginFbNome").text("("+data.name+")");
                }
                else {
                    NLUtility.showError('Richiesta profilo facebook fallita!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    }
});

$(document).delegate("#ngLogin", "pageinit", function(event) {
    NLUtility.log("ngLogin");
    $("#ngLoginForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var username = $form.find('input[name="username"]').val();
        var password = $form.find('input[name="password"]').val();
        var referer = $form.find('input[name="referer"]').val();
        var facebook = $form.find('input[name="facebook"]').attr('checked');
        var accesstoken = $form.find('input[name="accesstoken"]').val();
        
        if (username == null || username.length == 0 || password == null || password.length == 0) {
            return;
        }

        var options = {
            username: username, 
            password: password,
            deviceid: NG_DEVICE_ID
        };

        if (facebook)
        {
            options.accesstoken = accesstoken;
        }

        NLUtility.showLoading();

        NLUtility.log("Login options:");
        NLUtility.log(options);

        $.ajax({
            url: NG_URL + "login.php",
            data: options,
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data && data.iduser) {
                    NLUtility.hideLoading();
                    NightGuide.setUtente(data);
                    NLUtility.notify();
                    if (referer && referer.length > 0)
                        $.mobile.changePage(referer);
                    else
                        $('.ui-dialog').dialog('close');
                }
                else {
                    NLUtility.showError('Login non riuscito!<br/>Verifica i dati e riprova.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
        
    });
    
    var $additionalFields = $("#ngLoginAdditionalFields");
    var accesstoken = NLUtility.getUrlVarAsString("accesstoken", NLUtility.getPageURL(event));
    var url = NLUtility.getUrlVarAsString('url', NLUtility.getPageURL(event));
    if (accesstoken)
    {
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "facebook.php",
            data: {"action" : "me", "accesstoken": accesstoken},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data) {
                    NLUtility.hideLoading();
                    $("<p>Facebook Connect:</p>").appendTo($additionalFields);
                    $('<label for="facebook">Collega con '+data.name+'</label>').appendTo($additionalFields);
                    $('<input type="checkbox" name="facebook" id="facebook" checked="checked"/>').appendTo($additionalFields);
                    $('<input type="hidden" name="accesstoken" value="'+accesstoken+'"/>').appendTo($additionalFields);
                    $('<input type="hidden" name="referer" value="home.html"/>').appendTo($additionalFields);
                    $additionalFields.trigger('create');
                }
                else {
                    NLUtility.showError('Richiesta profilo facebook fallita!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    }
    else
    {
        $('<input type="hidden" name="referer" value="'+url+'" />').appendTo($additionalFields);
        $('<div class="ng-center"><a id="ngLoginFacebook" href="#"><img src="img/fb-login.png" /></a></div>').appendTo($additionalFields);
        $('<hr/>').appendTo($additionalFields);
        $('<a href="register.html" data-role="button" data-theme="c" class="ng-small">Registrazione</a>').appendTo($additionalFields);
        $('<div class="ng-center"><a id="ngLoginFacebookRegister" href="#"><img src="img/fb-register.png" /></a></div>').appendTo($additionalFields);
        $('<hr/>').appendTo($additionalFields);
        $('<a href="recover.html" data-role="button" data-theme="c" class="ng-small">Recupero password</a>').appendTo($additionalFields);
        
        $additionalFields.trigger('create');
        
        $("#ngLoginFacebook").click(function() {
            NLUtility.log("ngLoginFacebook");
            NLFacebook.profile(function(data) {
                if (data && !data.error)
                {
                    NLUtility.log(data);

                    var $form = $("#ngLoginForm");
                    var referer = $form.find('input[name="referer"]').val();
                    
                    NLUtility.showLoading();
                    $.ajax({
                        url: NG_URL + "login.php",
                        data: {action: "facebook", accesstoken: NLFacebook.ACCESS_TOKEN, deviceid: NG_DEVICE_ID},
                        type: "POST",
                        dataType: "json",
                        timeout: NG_TIMEOUT,
                        success: function(data) {
                            NLUtility.hideLoading();
                            if (data && data.iduser) {
                                NightGuide.setUtente(data);
                                if (referer && referer.length > 0)
                                {
                                    $.mobile.changePage(referer);
                                }
                                else
                                {
                                    NLUtility.hideLoading();
                                    $('.ui-dialog').dialog('close');
                                }
                            }
                            else {
                                $.mobile.changePage("login-fb.html?accesstoken=" + NLFacebook.ACCESS_TOKEN + "&referer=" + referer);
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                        }
                    });
                }
            });
        });

        $("#ngLoginFacebookRegister").click(function() {
            NLUtility.log("ngLoginFacebookRegister");

            NLFacebook.profile(function(data) {
                if (data && !data.error)
                {
                    NLUtility.log(data);
                    $.mobile.changePage("register.html?accesstoken=" + NLFacebook.ACCESS_TOKEN);
                }
                else
                {
                    NLUtility.showError('Accesso a Facebook non riuscito!');
                }   
            });
        });
    }
});


$(document).delegate("#ngRecover", "pageinit", function(event) {
    NLUtility.log("ngRecover");
    $("#ngRecoverForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var username = $form.find('input[name="username"]').val();
        
        if (username == null || username.length == 0) {
            return;
        }

        NLUtility.showLoading();

        $.ajax({
            url: NG_URL + "recover.php",
            data: {username: username},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data && data.result == "true") {
                    NLUtility.hideLoading();
                    $.mobile.changePage("recover-done.html");
                }
                else {
                    NLUtility.showError('Recupero password non riuscito!<br/>Verifica i dati e riprova.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngProfiloPassword", "pageinit", function(event) {
    NLUtility.log("ngProfiloPassword");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    
    $("#ngProfiloPasswordForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var password = $.trim($form.find('input[name="password"]').val());
        var password2 = $.trim($form.find('input[name="password2"]').val());
        
        if (password == null || password.length == 0 || password2 == null || password2.length == 0)
        {
            return;
        }
    
        if (password != password2)
        {
            NLUtility.showError("Le password non corrispondono!");
            return;
        }

        NLUtility.showLoading();

        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "password", "username": utente.username, "password": utente.password, "newpassword": password},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data && data.result == "true") {
                    NLUtility.hideLoading();
                    utente.password = data.password;
                    $.mobile.changePage("profilo-done.html");
                }
                else {
                    NLUtility.showError('Cambio password non riuscito!<br/>Verifica i dati e riprova.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngProfiloEmail", "pageinit", function(event) {
    NLUtility.log("ngProfiloEmail");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    
    $("#ngProfiloEmailForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var email = $.trim($form.find('input[name="email"]').val());
        var email2 = $.trim($form.find('input[name="email2"]').val());
        
        if (email == null || email.length == 0 || email2 == null || email2.length == 0)
        {
            return;
        }
    
        if (email != email2)
        {
            NLUtility.showError("Le e-mail non corrispondono!");
            return;
        }
        
        if (!NLUtility.checkEmail(email))
        {
            NLUtility.showError("E-mail non valida!");
            return;
        }

        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "email", "username": utente.username, "password": utente.password, "email": email},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data.result == "true") {
                    NLUtility.hideLoading();
                    utente.email = email;
                    $.mobile.changePage("profilo-email-done.html");
                }
                else {
                    NLUtility.showError('Cambio e-mail non riuscito!<br/>Verifica i dati e riprova.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngProfiloNotifiche", "pageinit", function(event) {
    NLUtility.log("ngProfiloNotifiche");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    
    $("#ngProfiloNotificheForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var notifiche = $form.find('input[name="notifiche"]').val();
        
        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "notifiche", "username": utente.username, "password": utente.password, "notifiche": notifiche},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (data.result == "true") {
                    NLUtility.hideLoading();
                    utente.mp_notice_sent = data.notifiche;
                    $.mobile.changePage("profilo-done.html");
                }
                else {
                    NLUtility.showError('Cambio notifiche via e-mail non riuscito!');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
    
    var $form = $("#ngProfiloNotificheForm");
    if (utente.mp_notice_sent)
        $form.find('input[id="notifiche_si"]').attr("checked", true).checkboxradio('refresh');
    else
        $form.find('input[id="notifiche_no"]').attr("checked", true).checkboxradio('refresh');
});


$(document).delegate("#ngProfiloModifica", "pageinit", function(event) {
    NLUtility.log("ngProfiloModifica");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    
    $("#ngProfiloModificaForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        
        var compleanno = $form.find('input[name="compleanno"]').val();
        var sesso = $form.find('input[name="sesso"]:checked').val();
        var provincia = $form.find('select[name="provincia"]').val();
        var altezza = $.trim($form.find('input[name="altezza"]').val());
        var peso = $.trim($form.find('input[name="peso"]').val());
        var occhi = $form.find('select[name="occhi"]').val();
        var capelli = $form.find('select[name="capelli"]').val();
        var stile = $form.find('select[name="stile"]').val();
        var carattere = $form.find('select[name="carattere"]').val();
        var statoaffettivo = $form.find('select[name="statoaffettivo"]').val();
        var amo = $.trim($form.find('input[name="amo"]').val());
        var odio = $.trim($form.find('input[name="odio"]').val());
        var hobbies = $.trim($form.find('input[name="hobbies"]').val());
        var sportpraticati = $.trim($form.find('input[name="sportpraticati"]').val());
        var descriviti = $.trim($form.find('textarea[name="descriviti"]').val());
        
        var options = {
            action: "edit", 
            username: utente.username,
            password: utente.password,
            compleanno: compleanno, 
            sesso: sesso, 
            provincia: provincia,
            altezza: altezza,
            peso: peso,
            occhi: occhi,
            capelli: capelli,
            stile: stile,
            carattere: carattere,
            statoaffettivo: statoaffettivo,
            amo: amo,
            odio: odio,
            hobbies: hobbies,
            sportpraticati: sportpraticati,
            descriviti: descriviti
        };
        
        NLUtility.log("ngProfiloModifica options:");
        NLUtility.log(options);
        
        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + "profilo.php",
            data: options,
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                NLUtility.log(data);
                if (data && data.result == "true") {
                    NLUtility.hideLoading();
                    NightGuide.setUtente(data.utente);
                    $.mobile.changePage("profilo-done.html");
                }
                else {
                    NLUtility.showError("Modifica del profilo non riuscita! Verifica i dati e riprova.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });

    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "values.php",
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                var $form = $("#ngProfiloModificaForm");
                var keys = ["capelli", "carattere", "occhi", "statoaffettivo", "stile"];
                if (data["province"])
                {
                    var $select = $form.find('select[name="provincia"]');
                    for(var key in data["province"])
                    {
                        $option = $('<option>', {"value": data.province[key].sigla, "text": data.province[key].nome}).appendTo($select);
                    }
                    $select.selectmenu('refresh');
                    
                    for(var i = 0; i < keys.length; i++)
                    {
                        var $sel = $form.find('select[name="'+keys[i]+'"]');
                        //NLUtility.log(keys[i] + " : " + $sel.length);
                        for(var k in data[keys[i]])
                        {
                            //NLUtility.log(data[keys[i]][k].id + " = " + data[keys[i]][k].nome);
                            $option = $('<option>', {"value": data[keys[i]][k].id, "text": data[keys[i]][k].nome}).appendTo($sel);
                        }
                        $sel.selectmenu('refresh');
                    }
                }

                NLUtility.showLoading();
                $.ajax({
                    url: NG_URL + "profilo.php",
                    data: {"id": utente.iduser, "username": utente.username, "password": utente.password},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            //NLUtility.log(data);
                            NLUtility.hideLoading();

                            $("#ngProfiloModificaNomeCognome").text("Modifica profilo di " + data.nomecognome);

                            var splittedCompleanno = data.compleanno.split('-');
                            var compleanno = splittedCompleanno[2] + "/" + splittedCompleanno[1] + "/" + splittedCompleanno[0];
                            $form.find('input[name="compleanno"]').val(compleanno);

                            if (data.sesso)
                                $form.find('input[id="femmina"]').attr("checked", true).checkboxradio('refresh');
                            else
                                $form.find('input[id="maschio"]').attr("checked", true).checkboxradio('refresh');

                            
                            $form.find('select[name="provincia"]').find("option").each(function(index) {
                                if ($(this).val() == data.provincia) {
                                    $(this).attr("selected", true);
                                    $(this).parent().selectmenu('refresh');
                                }
                            });
                            
                            var altezza = (data.altezza == 0)?(null):(data.altezza);
                            $form.find('input[name="altezza"]').val(altezza);
                            
                            var peso = (data.peso == 0)?(null):(data.peso);
                            $form.find('input[name="peso"]').val(peso);
                            for(var i = 0; i < keys.length; i++)
                            {
                                $form.find('select[name="'+keys[i]+'"]').find("option").each(function(index) {
                                    //NLUtility.log(keys[i]);
                                    if ($(this).val() == data[keys[i]]) {
                                        $(this).attr("selected", true);
                                        $(this).parent().selectmenu('refresh');
                                    }
                                });
                            }
                        
                            $form.find('input[name="amo"]').val(data.amo);
                            $form.find('input[name="odio"]').val(data.odio);
                            $form.find('input[name="hobbies"]').val(data.hobbies);
                            $form.find('input[name="sportpraticati"]').val(data.sportpraticati);
                            $form.find('textarea[name="descriviti"]').html(data.descriviti);
                            
                        }
                        else {
                            NLUtility.showError('Ricerca profilo fallita!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else {
                NLUtility.showError('Richiesta valori fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngRegister", "pageinit", function(event) {
    NLUtility.log("ngRegister pageinit");
    
    $("#ngRegisterForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        
        var nomecognome = $.trim($form.find('input[name="nomecognome"]').val());
        var email = $.trim($form.find('input[name="email"]').val());
        var email2 = $.trim($form.find('input[name="email2"]').val());
        var sesso = $form.find('input[name="sesso"]:checked').val();
        var compleanno = $form.find('input[name="compleanno"]').val();
        var provincia = $form.find('select[name="provincia"]').val();
        var username = $.trim($form.find('input[name="username"]').val());
        var password = $.trim($form.find('input[name="password"]').val());
        var password2 = $.trim($form.find('input[name="password2"]').val());
        var privacy = $form.find('input[name="privacy"]').attr('checked');
        var condizioni = $form.find('input[name="condizioni"]').attr('checked');
        var facebook = $form.find('input[name="facebook"]').attr('checked');
        var accesstoken = $form.find('input[name="accesstoken"]').val();

        if (nomecognome == null || nomecognome.length == 0
            || email == null || email.length == 0
            || email2 == null || email2.length == 0
            || sesso == null || sesso.length == 0
            || compleanno == null || compleanno.length == 0
            || provincia == null || provincia.length == 0
            || username == null || username.length == 0
            || password == null || password.length == 0
            || password2 == null || password2.length == 0)
        {
            NLUtility.showError("Devi specificare tutti i campi!");
            return;
        }

        if (email != email2)
        {
            NLUtility.showError("Le e-mail non corrispondono!");
            return;
        }
        
        if (password != password2)
        {
            NLUtility.showError("Le password non corrispondono!");
            return;
        }
        
        if (!NLUtility.checkEmail(email))
        {
            NLUtility.showError("Email non valida!");
            return;
        }
        
        if (!NLUtility.checkAlpha(nomecognome))
        {
            NLUtility.showError("Nome e cognome non valido!");
            return;
        }
        
        if (!NLUtility.checkUsername(username))
        {
            NLUtility.showError("Username non valido!");
            return;
        }

        if (!privacy || !condizioni)
        {
            NLUtility.showError("Devi accettare le condizioni d'uso e sulla privacy");
            return;
        }
        
        var options = { 
            action: "register", 
            idCitta: NightGuide.getCitta().id,
            nomecognome: nomecognome, 
            email: email, 
            sesso: sesso, 
            compleanno: compleanno, 
            provincia: provincia, 
            username: username, 
            password: password
        };
            
        if (facebook)
        {
            options.accesstoken = accesstoken;
        }
            
        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + "register3.php",
            data: options,
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                if (!data || !data.result)
                {
                    NLUtility.showError("Registrazione non riuscita!");
                }  
                else if (data.result == "")
                {
                    NLUtility.showError("Registrazione non riuscita (codice "+data.code+")");
                }
                else if (data.result == "ok") 
                {
                    NLUtility.hideLoading();
                    $.mobile.changePage("register-done.html");
                }
                else 
                {
                    NLUtility.showError(data.result);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
    
    var accesstoken = NLUtility.getUrlVarAsString("accesstoken", NLUtility.getPageURL(event));
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "province.php",
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                var $form = $("#ngRegisterForm");
                var $select = $form.find('select[name="provincia"]');
                for(var key in data)
                {
                    $option = $('<option>', {"value": data[key].sigla, "text": data[key].nome}).appendTo($select);
                }
                $select.selectmenu('refresh');
            }
            else {
                NLUtility.showError('Richiesta province fallita!');
            }
            
            var $facebookFields = $("#ngRegisterFacebookFields");

            if (accesstoken)
            {
                NLUtility.showLoading();
                $.ajax({
                    url: NG_URL + "facebook.php",
                    data: {"action": "me", "accesstoken": accesstoken},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            NLUtility.hideLoading();

                            var $form = $("#ngRegisterForm");
                            $form.find('input[name="nomecognome"]').val(data.name);
                            $form.find('input[name="email"]').val(data.email);
                            $form.find('input[name="email2"]').val(data.email);
                            if (data.gender == "male")
                                $form.find('input[id="maschio"]').attr("checked", true).checkboxradio('refresh');
                            else
                                $form.find('input[id="femmina"]').attr("checked", true).checkboxradio('refresh');

                            var splittedBirthday = data.birthday.split('/');
                            var birthday = splittedBirthday[1] + "/" + splittedBirthday[0] + "/" + splittedBirthday[2];
                            $form.find('input[name="compleanno"]').val(birthday);

                            $facebookFieldset = $('<fieldset data-role="controlgroup"/>').appendTo($facebookFields);
                            $('<legend>Facebook Connect:</legend>').appendTo($facebookFieldset);
                            $('<label for="facebook">Collega con '+data.name+'</label>').appendTo($facebookFieldset);
                            $('<input type="checkbox" name="facebook" id="facebook" checked="checked" />').appendTo($facebookFieldset);
                            $('<input type="hidden" name="accesstoken" value="'+accesstoken+'"/>').appendTo($facebookFieldset);
                            $facebookFields.trigger('create');
                        }
                        else {
                            NLUtility.showError('Richiesta profilo facebook fallita!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
});


$(document).delegate("#ngCitta", "pageinit", function(event) {
    NLUtility.log("ngCitta pageinit");
    
    var back = NLUtility.getUrlVar("back", NLUtility.getPageURL(event));
    if (back == "0") {
        NLUtility.removeHeader();
    }
    
    $("#ngCittaForm").submit(function(event) {
        NLUtility.log("ngCittaForm submit");
        event.preventDefault();
        var $form = $(this);
        var id = $form.find('select[name="id"]').val();
        var nome = $form.find('select[name="id"] option[value="'+id+'"]').text();
        NightGuide.setCitta(id, nome);
        NLUtility.log("changePage to home.html");
        setTimeout(function(){$.mobile.changePage("home.html")}, 300);
        return false;
    });
    
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "citta.php",
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                if (data.length > 0)
                {
                    $select = $("#ngCittaSelect");
                    $select.children().remove();
                    $('<option value="">Seleziona una città</option>').appendTo($select);
                    for(var key in data)
                    {
                        $option = $('<option>', {"value": data[key].id, "text": data[key].nome}).appendTo($select);
                        if (NightGuide.getCitta() && NightGuide.getCitta().id == data[key].id)
                            $option.attr("selected", "selected");
                    }
                    $select.selectmenu('refresh');
                }
            }
            else {
                NLUtility.showError('Richiesta città fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngLogout", "pageinit", function(event) {
    NLUtility.log("ngLogout");
    NightGuide.logout();
});

$(document).delegate("#ngAppuntamenti", "pageinit", function(event) {
    NLUtility.log("ngAppuntamenti pageinit");   
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "appuntamenti.php",
        data: {"idCitta": NightGuide.getCitta().id, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NightGuide.addListItems(
                    ".ng-appuntamenti", 
                    data, 
                    "appuntamenti.php", 
                    "NightGuide.addAppuntamento", 
                    "Nessun evento trovato", 
                    null
                );
            }
            else {
                NLUtility.showError('Caricamento appuntamenti fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngFoto", "pageinit", function(event) {
    NLUtility.log("ngFoto pageinit");   
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "foto.php",
        data: {"idCitta": NightGuide.getCitta().id, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NightGuide.addListItems(
                    ".ng-foto", 
                    data, 
                    "foto.php", 
                    "NightGuide.addFoto", 
                    "Nessun evento trovato", 
                    null
                );
            }
            else {
                NLUtility.showError('Caricamento eventi fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngLocali", "pageinit", function(event) {
    NLUtility.log("ngLocali pageinit");
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "locali.php",
        data: {"idCitta": NightGuide.getCitta().id, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NightGuide.addListItems(
                    ".ng-locali", 
                    data, 
                    "locali.php", 
                    "NightGuide.addLocale", 
                    "Nessun locale trovato", 
                    null
                );
            }
            else {
                NLUtility.showError('Caricamento locali fallito!');
            }
            
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + "locali-categorie.php",
                data: {"idCitta": NightGuide.getCitta().id},
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        var $select = $("#ngLocali").find('select[name="idCategoria"]');
                        for(var key in data)
                        {
                            $option = $('<option>', {"value": data[key].id, "text": data[key].nome}).appendTo($select);
                        }
                        $select.selectmenu('refresh');
                    }
                    else {
                        NLUtility.showError('Richiesta categorie fallita!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngLocale", "pageinit", function(event) {
    NLUtility.log("ngLocale pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "locale.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();

                NightGuide.updateSubheaderLocale("ngLocale", data.immagine, data.nome, data.header);
  
                var $menu = $('.ng-locale-menu');
                var $menuitem, $link;
                
                var paramCitta = "&idCitta=" + ((data.idCitta) ? (data.idCitta) : (NightGuide.getCitta().id));

                if (data.gallery && data.gallery.primafoto)
                {
                    var imgGallery = (data.gallery.primafoto)?(NG_URL+'thumb.php?w=80&h=60&f='+data.gallery.primafoto):("img/empty-logo.png");
                    $menuitem = $('<div class="ng-locale-menu-item">').appendTo($menu);
                    $link = $('<a href="locale-galleries.html?id='+data.id+paramCitta+'">').appendTo($menuitem);
                    $('<img src="'+imgGallery+'"/>').appendTo($link);
                    $('<p>Gallery</p>').appendTo($link);
                }
                
                if (data.appuntamento)
                {
                    var imgAppuntamento = (data.appuntamento.immagine)?(NG_URL+'thumb.php?w=80&h=60&f='+data.appuntamento.immagine):("img/empty-logo.png");
                    $menuitem = $('<div class="ng-locale-menu-item">').appendTo($menu);
                    $link = $('<a href="locale-appuntamenti.html?id='+data.id+paramCitta+'">').appendTo($menuitem);
                    $('<img src="'+imgAppuntamento+'"/>').appendTo($link);
                    $('<p>Appuntamenti</p>').appendTo($link);
                }
                
                var $listview = $("#ngLocaleDati");
                
                if (data.oramattinadalle && data.oramattinadalle.length > 0 && data.oramattinaalle && data.oramattinaalle.length > 0)
                {
                    var orariomattina = " dalle " + data.oramattinadalle + " alle " + data.oramattinaalle             
                    $('<li><img src="img/locale-orario.png" class="ui-li-icon"><p>Orario mattina: '+orariomattina+'</p></a></li>').appendTo($listview);
                }
                
                if (data.oraseradalle && data.oraseradalle.length > 0 && data.oraseraalle && data.oraseraalle.length > 0)
                {
                    var orariosera = " dalle " + data.oraseradalle + " alle " + data.oraseraalle;
                    $('<li><img src="img/locale-orario.png" class="ui-li-icon"><p>Orario sera: '+orariosera+'</p></a></li>').appendTo($listview);
                }
                
                if (data.giornichiusura && data.giornichiusura.length > 0)
                {
                    $('<li><img src="img/locale-chiusura.png" class="ui-li-icon"><p>Giorno chiusura: '+data.giornichiusura+'</p></a></li>').appendTo($listview);
                }
                
                if (data.telefono1 && data.telefono1.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono1)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono1+'</p></a></li>').appendTo($listview);
                }
                
                if (data.telefono2 && data.telefono2.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono2)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono2+'</p></a></li>').appendTo($listview);
                }
                if (data.telefono3 && data.telefono3.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono3)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono3+'</p></a></li>').appendTo($listview);
                }
                
                if (data.indirizzo && data.lat > 0 && data.lng > 0) {
                    $('<li><a href="locale-geo.html?lat='+data.lat+'&lng='+data.lng+'"><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></a></li>').appendTo($listview);
                }
                else if(data.indirizzo && data.indirizzo.length > 0) {
                    $('<li><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></li>').appendTo($listview);
                }

                if (data.web && data.web.length > 0)
                {
                    $('<li><a href="'+data.web+'" target="_blank"><img src="img/locale-sito.png" class="ui-li-icon"><p>Sito Web</p></a></li>').appendTo($listview);
                }
                
                if (data.email) {
                    $('<li><a href="mailto:'+data.email+'"><img src="img/locale-email.png" class="ui-li-icon"><p>'+data.email+'</p></a></li>').appendTo($listview);
                }
                
                if (data.facebook && data.facebook.length > 0)
                {
                    $('<li><a href="'+data.facebook+'" target="_blank"><img src="img/locale-facebook.png" class="ui-li-icon"><p>Pagina Facebook</p></a></li>').appendTo($listview);
                }
                
                if (data.twitter && data.twitter.length > 0)
                {
                    $('<li><a href="'+data.twitter+'" target="_blank"><img src="img/locale-twitter.png" class="ui-li-icon"><p>Pagina Twitter</p></a></li>').appendTo($listview);
                }
                
                $listview.listview('refresh');
            }
            else {
                NLUtility.showError('Caricamento locale fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngLocale", "pageinit", function(event) {
    NLUtility.log("ngLocale pageinit");   
    $("ngLocaleGalleries").remove();
    $("ngLocaleAppuntamenti").remove();
});

$(document).delegate("#ngAppuntamento", "pageinit", function(event) {
    NLUtility.log("ngAppuntamento pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    $('#ngAppuntamentoImage').hide();
    $('#ngAppuntamentoSocial').hide();
    $('.ng-appuntamento-title').hide();
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "appuntamento.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
 
                NightGuide.updateSubheaderLocale("ngAppuntamento", data.immaginelocale, data.nomelocale, data.headerlocale);

                if (data.immagine) {
                    $('#ngAppuntamentoImage').attr("src", data.immagine);
                    $('#ngAppuntamentoImage').show();
                }
                else {
                    $('#ngAppuntamentoImage').hide();
                }

                if (data.nome) {
                    $('.ng-appuntamento-title').show();
                    $('#ngAppuntamentoTitle').html(data.nome);
                    $('#ngAppuntamentoTitle').show();
                    $('#ngAppuntamentoDate').html(data.data);
                    $('#ngAppuntamentoDate').show();
                    $('#ngAppuntamentoDateOnly').hide();
                }
                else {
                    $('#ngAppuntamentoDateOnly').html(data.data);
                    $('#ngAppuntamentoDateOnly').show();
                    $('#ngAppuntamentoTitle').hide();
                    $('#ngAppuntamentoDate').hide();
                }

                if (data.descrizione) {
                    $('#ngAppuntamentoDesc').html(data.descrizione);
                }
                
                $('#ngAppuntamentoSocial').show();
                
                var $listview = $("#ngAppuntamentoLocale");

                if (data.telefono1) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono1)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono1+'</p></a></li>').appendTo($listview);
                }

                if (data.telefono2) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono2)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono2+'</p></a></li>').appendTo($listview);
                }
                
                if (data.telefono3) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono3)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono3+'</p></a></li>').appendTo($listview);
                }

                NLUtility.showLoading();
                $.ajax({
                    url: NG_URL + "locale.php",
                    data: {"idCitta": idCitta, "id": data.idlocale},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            NLUtility.log(data);
                            NLUtility.hideLoading();

                            if (data.email) {
                                $('<li><a href="mailto:'+data.email+'"><img src="img/locale-email.png" class="ui-li-icon"><p>'+data.email+'</p></a></li>').appendTo($listview);
                            }

                            if (data.indirizzo && data.lat > 0 && data.lng > 0) {
                                $('<li><a href="locale-geo.html?lat='+data.lat+'&lng='+data.lng+'"><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></a></li>').appendTo($listview);
                            }
                            else if(data.indirizzo) {
                                $('<li><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></li>').appendTo($listview);
                            }

                            $listview.listview('refresh');
                        }
                        else {
                            NLUtility.showError('Caricamento locale fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                }); 
            }
            else {
                NLUtility.showError('Caricamento evento fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngGallery", "pageinit", function(event) {
    NLUtility.log("ngGallery pageinit");  
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "gallery.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                
                NightGuide.updateSubheaderLocale("ngGallery", data.immaginelocale, data.nomelocale, data.headerlocale);
                
                if (data.nome) {
                    $('#ngGalleryName').html(data.nome);
                }

                if (data.nomefotografo) {
                    $('#ngGalleryFotografo').html("Foto di "+data.nomefotografo);
                }
                
                if (data.descrizione) {
                    $('#ngGalleryDesc').html(NLUtility.htmldecode(data.descrizione));
                }

                var $foto = $('#ngGalleryImages');
                
                if (data.anteprime && data.immagini)
                {
                    for (var i = 0; i < data.anteprime.length; i++)
                    {   
                        var $link;
                        if (NightGuide.isLogged())
                            $link = $('<a href="'+data.immagini[i]+'"/>').appendTo($foto);
                        else
                            $link = $('<a href="#" onclick="javascript:$.mobile.changePage(\'login.html?back=1\',{\'role\':\'dialog\'})"/>').appendTo($foto);

                        var number = (i+1) + ' di ' + data.anteprime.length;
                        $('<img data-id="'+data.id+'" data-number="'+number+'" data-citta="'+idCitta+'" data-save="'+data.immagini[i]+'" data-url="'+data.fotoshare[i]+'" data-preview="'+data.anteprime[i]+'" src="'+NG_URL+'thumb.php?w=74&h=74&f='+NLUtility.urlencode(data.anteprime[i])+'" alt="'+data.nome+'"/>').appendTo($link);
                    }

                    if (NightGuide.isLogged())
                    {
                        NightGuide.photoswipe("ngGalleryImages");
                    }
                }

            }
            else {
                NLUtility.showError('Caricamento foto fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngLocaleAppuntamenti", "pageinit", function(event) {
    NLUtility.log("ngLocaleAppuntamenti pageinit");   
    
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "locale.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                
                NightGuide.updateSubheaderLocale("ngLocaleAppuntamenti", data.immagine, data.nome, data.header);
                
                NLUtility.showLoading();
                $.ajax({
                    url: NG_URL + "locale-appuntamenti.php",
                    data: {"id": id, "idCitta": idCitta, "startindex": 0, "pagesize": NG_PAGESIZE},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            NLUtility.hideLoading();
                            for(var i = 0; i < data.length; i++)
                            {
                                if (!data[i].idCitta)
                                    data[i].idCitta = idCitta;
                            }
                            NightGuide.addListItems(
                                ".ng-locale-appuntamenti", 
                                data, 
                                "locale-appuntamenti.php", 
                                "NightGuide.addAppuntamento", 
                                "Nessun appuntamento trovato", 
                                null
                            );
                        }
                        else {
                            NLUtility.showError('Caricamento appuntamenti locale fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                }); 
            }
            else {
                NLUtility.showError('Caricamento locale fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });    
});

$(document).delegate("#ngLocaleGalleries", "pageinit", function(event) {
    NLUtility.log("ngLocaleGalleries pageinit");   
    
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "locale.php",
        data: {"id": id, "idCitta": idCitta},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                
                NightGuide.updateSubheaderLocale("ngLocaleGalleries", data.immagine, data.nome, data.header);
                
                NLUtility.showLoading();
                $.ajax({
                    url: NG_URL + "locale-galleries.php",
                    data: {"id": id, "idCitta": idCitta, "startindex": 0, "pagesize": NG_PAGESIZE},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            NLUtility.hideLoading();
                            for(var i = 0; i < data.length; i++)
                            {
                                if (!data[i].idCitta)
                                    data[i].idCitta = idCitta;
                            }
                            NightGuide.addListItems(
                                ".ng-locale-galleries", 
                                data, 
                                "locale-galleries.php", 
                                "NightGuide.addFoto", 
                                "Nessun evento trovato", 
                                null
                            );
                        }
                        else {
                            NLUtility.showError('Caricamento eventi locale fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                }); 
            }
            else {
                NLUtility.showError('Caricamento locale fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });    
});

$(document).delegate("#ngLocaleInfo", "pageinit", function(event) {
    NLUtility.log("ngLocaleInfo pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "locale.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();

                NightGuide.updateSubheaderLocale("ngLocaleInfo", data.immagine, data.nome);
                
                if (data.descrizione) {
                    $('#ngLocaleInfoDesc').html(NLUtility.htmldecode(data.descrizione));
                }
                
                var $foto = $('#ngLocaleInfoFoto');
                
                if (data.anteprime && data.immagini)
                {
                    for (var i = 0; i < data.anteprime.length; i++)
                    {
                        if (data.anteprime[i] && data.immagini[i]) {
                            var $link = $('<a href="'+data.immagini[i]+'"/>').appendTo($foto);
                            var number = (i+1) + ' di ' + data.anteprime.length;
                            $('<img data-id="'+data.id+'" data-number="'+number+'" data-citta="'+idCitta+'" data-save="'+data.immagini[i]+'" data-url="'+data.anteprime[i]+'" data-preview="'+data.anteprime[i]+'" src="'+NG_URL+'thumb.php?w=74&h=74&f='+NLUtility.urlencode(data.anteprime[i])+'" alt="'+data.nome+'"/>').appendTo($link);
                        }
                    }
                }
                
                if ($foto.children().length > 0) {
                    $foto.show();
                }
                else {
                    $foto.hide();
                }
                
                NightGuide.photoswipe("ngLocaleInfoFoto");
            }
            else {
                NLUtility.showError('Caricamento locale fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngUtenti", "pageinit", function(event) {
    NLUtility.log("ngUtenti pageinit");
        
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "values.php",
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                var $form = $("#ngUtentiForm");
                if (data["province"])
                {
                    var $select = $form.find('select[name="provincia"]');
                    for(var key in data["province"])
                    {
                        $option = $('<option>', {"value": data.province[key].sigla, "text": data.province[key].nome}).appendTo($select);
                    }
                    $select.selectmenu('refresh');
                    
                    var keys = ["capelli", "carattere", "occhi", "statoaffettivo", "stile"];
                    for(var i = 0; i < keys.length; i++)
                    {
                        var $sel = $form.find('select[name="'+keys[i]+'"]');
                        //NLUtility.log(keys[i] + " : " + $sel.length);
                        for(var k in data[keys[i]])
                        {
                            //NLUtility.log(data[keys[i]][k].id + " = " + data[keys[i]][k].nome);
                            $option = $('<option>', {"value": data[keys[i]][k].id, "text": data[keys[i]][k].nome}).appendTo($sel);
                        }
                        $sel.selectmenu('refresh');
                    }
                }
            }
            else {
                NLUtility.showError('Richiesta valori fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
    
    $("#ngUtentiForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        var sesso = $form.find('input[name="sesso"]:checked').val();
        var etaInizio = $form.find('input[name="etaInizio"]').val();
        var etaFine = $form.find('input[name="etaFine"]').val();
        var provincia = $form.find('select[name="provincia"]').val();
        var match = $form.find('select[name="match"]').val();
        var username = $.trim($form.find('input[name="username"]').val());
        var foto = ($form.find('input[name="foto"]').attr('checked'))?(1):(0);
        var online = ($form.find('input[name="online"]').attr('checked'))?(1):(0);
        var statoaffettivo = $form.find('select[name="statoaffettivo"]').val();
        var occhi = $form.find('select[name="occhi"]').val();
        var capelli = $form.find('select[name="capelli"]').val();
        var stile = $form.find('select[name="stile"]').val();
        var carattere = $form.find('select[name="carattere"]').val();
        
        var url = "utenti-risultato.html";
        url += "?sesso="+sesso;
        url += "&etaInizio="+etaInizio;
        url += "&etaFine="+etaFine;
        url += "&provincia="+provincia;
        url += "&match="+match;
        url += "&username="+NLEncoder.encode(username);
        url += "&foto="+foto;
        url += "&online="+online;
        url += "&statoaffettivo="+statoaffettivo;
        url += "&occhi="+occhi;
        url += "&capelli="+capelli;
        url += "&stile="+stile;
        url += "&carattere="+carattere;
        
        NLUtility.log(url);
        $.mobile.changePage(url);
    });
});

$(document).delegate("#ngUtenti", "pageshow", function(event) {
    NLUtility.log("ngUtenti pageshow");
    $("#ngUtentiRisultato").remove();
});

$(document).delegate("#ngUtentiRisultato", "pageinit", function(event) {
    NLUtility.log("ngUtentiRisultato pageinit");
        
    var url = NLUtility.getPageURL(event);
    var sesso = NLUtility.getUrlVarAsString("sesso", url);
    var etaInizio = NLUtility.getUrlVarAsString("etaInizio", url);
    var etaFine = NLUtility.getUrlVarAsString("etaFine", url);
    var username = NLUtility.getUrlVarAsString("username", url);
    var match = NLUtility.getUrlVarAsString("match", url);
    var foto = NLUtility.getUrlVarAsString("foto", url);
    var online = NLUtility.getUrlVarAsString("online", url);
    var statoaffettivo = NLUtility.getUrlVarAsString("statoaffettivo", url);
    var occhi = NLUtility.getUrlVarAsString("occhi", url);
    var capelli = NLUtility.getUrlVarAsString("capelli", url);
    var stile = NLUtility.getUrlVarAsString("stile", url);
    var carattere = NLUtility.getUrlVarAsString("carattere", url);
    var provincia = NLUtility.getUrlVarAsString("provincia", url);
    
    var options = {"startindex" : 0, "pagesize": NG_PAGESIZE, "sesso": sesso, "etaInizio" : etaInizio, "etaFine": etaFine,
            "username": username, "match": match, "foto": foto, "online": online, "statoaffettivo": statoaffettivo,
            "occhi": occhi, "capelli": capelli, "stile": stile, "carattere": carattere, "provincia": provincia};
        
    NLUtility.log(options);
    
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "utenti.php",
        data: options,
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NightGuide.addListItems(
                    ".ng-utenti", 
                    data, 
                    "utenti.php", 
                    "NightGuide.addUtente", 
                    "Nessun utente trovato", 
                    {"sesso": sesso, "etaInizio" : etaInizio, "etaFine": etaFine, "username": username, "match": match, 
                        "foto": foto, "online": online, "statoaffettivo": statoaffettivo, "occhi": occhi, "capelli": capelli, 
                        "stile": stile, "carattere": carattere, "provincia": provincia}
                );
            }
            else {
                NLUtility.showError('Ricerca utenti fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
});

$(document).delegate("#ngProfilo", "pageinit", function(event) {
    NLUtility.log("ngProfilo pageinit");
    
    $("#ngProfiloFoto").hide();
    $("#ngProfiloMessaggio").hide();
    
    $("#ngProfiloOpzioni").hide();
    $("#ngProfiloBlocca").hide();
    $("#ngProfiloSblocca").hide();
});

$(document).delegate("#ngProfilo", "pageshow", function(event) {
    NLUtility.log("ngProfilo pageshow");
    
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    if ((!id || id == "0") && NightGuide.isLogged()) {
        id = NightGuide.getUtente().iduser;
    }
    
    var options =  {"id": id};
    
    if (NightGuide.isLogged()) {
        var utente = NightGuide.getUtente();
        options.username = utente.username;
        options.password = utente.password;
    }
    
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "profilo.php",
        data: options,
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                
                $("#ngProfiloNome").text("Profilo di "+data.username);
                
                if (NightGuide.isLogged() && NightGuide.getUtente().iduser == id)
                    $("#ngProfiloMessaggio").hide();
                else
                    $("#ngProfiloMessaggio").show();
                
                if (data.foto) {
                    $("#ngProfiloFoto .ng-profilo-foto").attr("src", data.foto);
                    $("#ngProfiloFoto").show();
                }
                else {
                    $("#ngProfiloFoto").hide();
                }
                
                var $listview = $("#ngProfiloListView");
                
                var splittedCompleanno = data.compleanno.split('-');
                var compleanno = splittedCompleanno[2] + "/" + splittedCompleanno[1] + "/" + splittedCompleanno[0];

                var altezza = (data.altezza == 0)?(null):(data.altezza);
                var peso = (data.peso == 0)?(null):(data.peso);
                
                NightGuide.addProfileField($listview, "Stato", (data.isonline == 1) ? ('<img src="img/icon-utente-online.png" class="ng-status"/> Online') : ('<img src="img/icon-utente-offline.png" class="ng-status"/> Offline'));
                NightGuide.addProfileField($listview, "Sesso", (data.sesso) ? ("Donna") : ("Uomo"));
                NightGuide.addProfileField($listview, "Data di nascita", compleanno, ' ('+data.eta+' anni)');
                NightGuide.addProfileField($listview, "Provincia", data.nomeprovincia);
                NightGuide.addProfileField($listview, "Località", data.location);
                NightGuide.addProfileField($listview, "Altezza", altezza, " (cm)");
                NightGuide.addProfileField($listview, "Peso", peso, " (kg)");
                NightGuide.addProfileField($listview, "Occhi", data.nomeocchi);
                NightGuide.addProfileField($listview, "Capelli", data.nomecapelli);
                NightGuide.addProfileField($listview, "Stile", data.nomestile);
                NightGuide.addProfileField($listview, "Carattere", data.nomecarattere);
                NightGuide.addProfileField($listview, "Stato affettivo", data.nomestatoaffettivo);
                NightGuide.addProfileField($listview, "Amo", data.amo);
                NightGuide.addProfileField($listview, "Odio", data.odio);
                NightGuide.addProfileField($listview, "Sport praticati", data.sportPraticati);
                NightGuide.addProfileField($listview, "Hobbies", data.hobbies);
                
                if (data.descriviti && data.descriviti.length > 0) {
                    $('<li data-role="list-divider">Descrizione</li><li><div class="ng-profilo-descrizione">'+data.descriviti+'</div></li>').appendTo($listview);
                }
                
                if ((data.im_icq && data.im_icq.length > 0) 
                    || (data.im_msn && data.im_msn.length > 0) 
                    || (data.im_yahoo && data.im_yahoo.length > 0) 
                    || (data.website && data.website.length > 0)) 
                {
                    $('<li data-role="list-divider">Contatti</li>').appendTo($listview);
                    NightGuide.addProfileField($listview, "ICQ", data.im_icq);
                    NightGuide.addProfileField($listview, "MSN", data.im_msn);
                    NightGuide.addProfileField($listview, "Yahoo", data.im_yahoo);
                    var website = (data.website == "http://") ? (null) : (data.website);
                    NightGuide.addProfileField($listview, "Sito web", website);
                }

                $listview.listview('refresh');
                
                if (NightGuide.isLogged() && id != NightGuide.getUtente().iduser)
                {
                    $("#ngProfiloOpzioni").show();
                    NLUtility.log("data.inmyblacklist = " + data.inmyblacklist);
                    if (data.inmyblacklist)
                    {
                        NLUtility.log("L'utente risulta bloccato");
                        NLUtility.log("ngProfiloSblocca = " + $("#ngProfiloSblocca").length);
                        NLUtility.log("ngProfiloBlocca = " + $("#ngProfiloBlocca").length);
                        $("#ngProfiloSblocca").show();
                        $("#ngProfiloBlocca").hide();
                    }
                    else
                    {
                        NLUtility.log("L'utente non risulta bloccato");
                        NLUtility.log("ngProfiloSblocca = " + $("#ngProfiloSblocca").length);
                        NLUtility.log("ngProfiloBlocca = " + $("#ngProfiloBlocca").length);
                        $("#ngProfiloBlocca").show();
                        $("#ngProfiloSblocca").hide();
                    }
                }
            }
            else {
                NLUtility.showError('Ricerca profilo fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
});

$(document).delegate("#ngProfiloBlocca", "pageinit", function(event) {
    NLUtility.log("ngProfiloBlocca");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    $("#ngProfiloBloccaButton").attr("data-id", id);
    
    $("#ngProfiloBloccaButton").click(function(event) {
        event.preventDefault();
        var id = $(this).attr('data-id');
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "blocca", "id": id, "username": utente.username, "password": utente.password},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                NLUtility.hideLoading();
                if (!data.result) {
                    NLUtility.showError("Non è possibile aggiungere l'utente alla tua lista nera!");
                }
                else {
                    NLUtility.showMessage("L'utente è stato aggiunto alla tua lista nera.");
                    $('.ui-dialog').dialog('close');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngProfiloSblocca", "pageinit", function(event) {
    NLUtility.log("ngProfiloSblocca");
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }
    
    var utente = NightGuide.getUtente();
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    $("#ngProfiloSbloccaButton").attr("data-id", id);
    
    $("#ngProfiloSbloccaButton").click(function(event) {
        event.preventDefault();
        var id = $(this).attr('data-id');
        NLUtility.showLoading();
        $.ajax({
            url: NG_URL + "profilo.php",
            data: {"action": "sblocca", "id": id, "username": utente.username, "password": utente.password},
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                NLUtility.hideLoading();
                if (!data.result) {
                    NLUtility.showError("Non è possibile cancellare l'utente dalla tua lista nera!");
                }
                else {
                    NLUtility.showMessage("L'utente è stato cancellato dalla tua lista nera.");
                    $('.ui-dialog').dialog('close');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});

$(document).delegate("#ngAttiva", "pageinit", function(event) {
    NLUtility.log("ngAttiva pageinit");
    
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    var codice = NLUtility.getUrlVarAsString("codice", NLUtility.getPageURL(event));
    NLUtility.log("id: " + id);
    NLUtility.log("codice: " + id);
    
    $("#ngAttivaOk").hide();
    $("#ngAttivaKo").hide();
    
    if (NLUtility.isIOS())
    {
        NLUtility.removeHeader();
        
        $("#ngAttivaContinua").click(function(event) {
            event.preventDefault();
            document.location.replace("nightguide://");
        });
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "profilo.php",
        data: {"action": "attiva", "id": id, "codice": codice},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data && data.result) {
                NLUtility.hideLoading();
                if (data.result == "true") {
                    NLUtility.log("Attivazione riuscita");
                    $("#ngAttivaOk").show();
                }
                else {
                    NLUtility.log("Attivazione non riuscita");
                    $("#ngAttivaKo").show();
                }
            }
            else {
                NLUtility.showError('Attivazione fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
});

$(document).delegate("#ngAttivaEmail", "pageinit", function(event) {
    NLUtility.log("ngAttivaEmail pageinit");
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    var codice = NLUtility.getUrlVarAsString("codice", NLUtility.getPageURL(event));
    
    $("#ngAttivaEmailOk").hide();
    $("#ngAttivaEmailKo").hide();
    
    if (NLUtility.isIOS())
    {
        NLUtility.removeHeader();
        
        $("#ngAttivaEmailContinua").click(function(event) {
            event.preventDefault();
            document.location.replace("nightguide://");
        });
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "profilo.php",
        data: {"action": "attivaemail", "id": id, "codice": codice},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data && data.result) {
                NLUtility.hideLoading();
                if (data.result == "true")
                    $("#ngAttivaEmailOk").show();
                else
                    $("#ngAttivaEmailKo").show();
            }
            else {
                NLUtility.showError('Attivazione e-mail fallita!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
});

$(document).delegate("#ngCredits", "pageinit", function(event) {
    NLUtility.log("ngCredits pageinit");   
    $("#ngCreditsVersion").text(NG_VERSION);
});

$(document).delegate("#ngVisite", "pageinit", function(event) {
    NLUtility.log("ngVisite pageinit");   
    if (!NightGuide.isLogged())
    {
        $.mobile.changePage("home.html");
        return;
    }

    NightGuide.updateVisite(false);
});

$(document).delegate("#ngVetrine", "pageinit", function(event) {
    NLUtility.log("ngVetrine pageinit");
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "vetrine.php",
        data: {"idCitta": NightGuide.getCitta().id, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NightGuide.addListItems(
                    ".ng-vetrine", 
                    data, 
                    "vetrine.php", 
                    "NightGuide.addVetrina", 
                    "Nessuna vetrina trovata", 
                    null
                );
            }
            else {
                NLUtility.showError('Caricamento vetrine fallito!');
            }
            
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + "vetrine-categorie.php",
                data: {"idCitta": NightGuide.getCitta().id},
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        var $select = $("#ngVetrine").find('select[name="idCategoria"]');
                        for(var key in data)
                        {
                            $option = $('<option>', {"value": data[key].id, "text": data[key].nome}).appendTo($select);
                        }
                        $select.selectmenu('refresh');
                    }
                    else {
                        NLUtility.showError('Richiesta categorie fallita!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngVetrina", "pageinit", function(event) {
    NLUtility.log("ngVetrina pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "vetrina.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();

                NightGuide.updateSubheaderLocale("ngVetrina", data.immagine, data.nome, data.header);
                
                if (data.descrizione) {
                    $('#ngVetrinaDesc').html(NLUtility.htmldecode(data.descrizione));
                    $('#ngVetrinaDesc').parent().show();
                }
                else {
                    $('#ngVetrinaDesc').parent().hide();
                }
                
                var $foto = $('#ngVetrinaFoto');
                
                if (data.anteprime && data.immagini)
                {
                    for (var i = 0; i < data.anteprime.length; i++)
                    {
                        if (data.anteprime[i] && data.immagini[i]) {
                            var $link = $('<a href="'+data.immagini[i]+'"/>').appendTo($foto);
                            var number = (i+1) + ' di ' + data.anteprime.length;
                            $('<img data-id="'+data.id+'" data-number="'+number+'" data-citta="'+idCitta+'" data-save="'+data.immagini[i]+'" data-url="'+data.anteprime[i]+'" data-preview="'+data.anteprime[i]+'" src="'+NG_URL+'thumb.php?w=74&h=74&f='+NLUtility.urlencode(data.anteprime[i])+'" alt="'+data.nome+'"/>').appendTo($link);
                        }
                    }
                }
                
                if ($foto.children().length > 0) {
                    $foto.show();
                }
                else {
                    $foto.hide();
                }
                
                NightGuide.photoswipe("ngVetrinaFoto");
                
                var $listview = $("#ngVetrinaDati");
                
                if (data.oramattinadalle && data.oramattinadalle.length > 0 && data.oramattinaalle && data.oramattinaalle.length > 0)
                {
                    var orariomattina = " dalle " + data.oramattinadalle + " alle " + data.oramattinaalle             
                    $('<li><img src="img/locale-orario.png" class="ui-li-icon"><p>Orario mattina: '+orariomattina+'</p></a></li>').appendTo($listview);
                }
                
                if (data.oraseradalle && data.oraseradalle.length > 0 && data.oraseraalle && data.oraseraalle.length > 0)
                {
                    var orariosera = " dalle " + data.oraseradalle + " alle " + data.oraseraalle;
                    $('<li><img src="img/locale-orario.png" class="ui-li-icon"><p>Orario sera: '+orariosera+'</p></a></li>').appendTo($listview);
                }
                
                if (data.giornichiusura && data.giornichiusura.length > 0)
                {
                    $('<li><img src="img/locale-chiusura.png" class="ui-li-icon"><p>Giorno chiusura: '+data.giornichiusura+'</p></a></li>').appendTo($listview);
                }
                
                if (data.telefono1 && data.telefono1.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono1)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono1+'</p></a></li>').appendTo($listview);
                }
                
                if (data.telefono2 && data.telefono2.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono2)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono2+'</p></a></li>').appendTo($listview);
                }
                if (data.telefono3 && data.telefono3.length > 0) {
                    $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono3)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono3+'</p></a></li>').appendTo($listview);
                }
                
                if (data.indirizzo && data.lat > 0 && data.lng > 0) {
                    $('<li><a href="locale-geo.html?lat='+data.lat+'&lng='+data.lng+'"><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></a></li>').appendTo($listview);
                }
                else if(data.indirizzo && data.indirizzo.length > 0) {
                    $('<li><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></li>').appendTo($listview);
                }

                if (data.web && data.web.length > 0)
                {
                    $('<li><a href="'+data.web+'" target="_blank"><img src="img/locale-sito.png" class="ui-li-icon"><p>Sito Web</p></a></li>').appendTo($listview);
                }
                
                if (data.email) {
                    $('<li><a href="mailto:'+data.email+'"><img src="img/locale-email.png" class="ui-li-icon"><p>'+data.email+'</p></a></li>').appendTo($listview);
                }
                
                if (data.facebook && data.facebook.length > 0)
                {
                    $('<li><a href="'+data.facebook+'" target="_blank"><img src="img/locale-facebook.png" class="ui-li-icon"><p>Pagina Facebook</p></a></li>').appendTo($listview);
                }
                
                if (data.twitter && data.twitter.length > 0)
                {
                    $('<li><a href="'+data.twitter+'" target="_blank"><img src="img/locale-twitter.png" class="ui-li-icon"><p>Pagina Twitter</p></a></li>').appendTo($listview);
                }
                
                $listview.listview('refresh');
                
                NLUtility.showLoading();
                
                $.ajax({
                    url: NG_URL + "offerte.php",
                    data: {"id": id, "idCitta": idCitta, "startindex": 0, "pagesize": NG_PAGESIZE},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            NLUtility.hideLoading();
                            for(var i = 0; i < data.length; i++)
                            {
                                if (!data[i].idCitta)
                                    data[i].idCitta = idCitta;
                            }
                            NightGuide.addListItems(
                                ".ng-offerte", 
                                data, 
                                "offerte.php", 
                                "NightGuide.addOfferta", 
                                "Nessuna offerta disponibile", 
                                null,
                                "Offerte"
                            );
                        }
                        else {
                            NLUtility.showError('Caricamento offerte fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else {
                NLUtility.showError('Caricamento vetrina fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngOfferta", "pageinit", function(event) {
    NLUtility.log("ngOfferta pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    var idCitta = NLUtility.getUrlVarAsString("idCitta", NLUtility.getPageURL(event));
    if (!idCitta) {
        idCitta = NightGuide.getCitta().id;
    }
    
    $('#ngOffertaImage').hide();
        
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "offerta.php",
        data: {"idCitta": idCitta, "id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
 
                NightGuide.updateSubheaderLocale("ngOfferta", data.immaginevetrina, data.nomevetrina, data.header);

                //var immagine = (data.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(data.immagine)) : ("img/empty-logo.png");
                var nome = (data.nome) ? (data.nome) : ("");
                var prezzo = NLUtility.formatCurrency(data.prezzo);
                var scontato = NLUtility.formatCurrency(data.prezzo - (data.prezzo * data.sconto / 100));
                
                $('#ngOffertaImage').attr("src", data.immagine);
                $('#ngOffertaImage').show();
                
                $('#ngOffertaTitle').text(nome);
                $('#ngOffertaPrezzo').html(prezzo);
                $('#ngOffertaScontato').html(scontato);
                $('#ngOffertaDisponibilita').text((data.disponibilita > 0)?(data.disponibila):("esaurito"));
                $('#ngOffertaInizio').text(data.datainizio);
                $('#ngOffertaFine').text(data.datafine);
                $('#ngOffertaDesc').html(NLUtility.htmldecode(data.descrizione));
                
                NLUtility.showLoading();
                
                $.ajax({
                    url: NG_URL + "vetrina.php",
                    data: {"idCitta": idCitta, "id": id},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            //NLUtility.log(data);
                            NLUtility.hideLoading();

                            var $listview = $("#ngOffertaVetrina");

                            if (data.telefono1 && data.telefono1.length > 0) {
                                $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono1)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono1+'</p></a></li>').appendTo($listview);
                            }

                            if (data.telefono2 && data.telefono2.length > 0) {
                                $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono2)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono2+'</p></a></li>').appendTo($listview);
                            }
                            if (data.telefono3 && data.telefono3.length > 0) {
                                $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.telefono3)+'"><img src="img/locale-telefono.png" class="ui-li-icon"><p>'+data.telefono3+'</p></a></li>').appendTo($listview);
                            }

                            if (data.indirizzo && data.lat > 0 && data.lng > 0) {
                                $('<li><a href="locale-geo.html?lat='+data.lat+'&lng='+data.lng+'"><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></a></li>').appendTo($listview);
                            }
                            else if(data.indirizzo && data.indirizzo.length > 0) {
                                $('<li><img src="img/locale-mappa.png" class="ui-li-icon"><p>'+data.indirizzo+'</p></li>').appendTo($listview);
                            }

                            if (data.web && data.web.length > 0)
                            {
                                $('<li><a href="'+data.web+'" target="_blank"><img src="img/locale-sito.png" class="ui-li-icon"><p>Sito Web</p></a></li>').appendTo($listview);
                            }

                            if (data.facebook && data.facebook.length > 0)
                            {
                                $('<li><a href="'+data.facebook+'" target="_blank"><img src="img/locale-facebook.png" class="ui-li-icon"><p>Pagina Facebook</p></a></li>').appendTo($listview);
                            }

                            if (data.twitter && data.twitter.length > 0)
                            {
                                $('<li><a href="'+data.twitter+'" target="_blank"><img src="img/locale-twitter.png" class="ui-li-icon"><p>Pagina Twitter</p></a></li>').appendTo($listview);
                            }

                            $listview.listview('refresh');
                        }
                        else {
                            NLUtility.showError('Caricamento vetrina fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else {
                NLUtility.showError('Caricamento offerta fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngMappa", "pageinit", function(event) {
    NLUtility.log("ngMappa pageinit");
    
    $('#ngMappaImgVetrineCon').attr("src", MM_ICON_VETRINE_CON);
    $('#ngMappaImgVetrineSenza').attr("src", MM_ICON_VETRINE_SENZA);
    $('#ngMappaImgLocaliCon').attr("src", MM_ICON_LOCALI_CON);
    $('#ngMappaImgLocaliSenza').attr("src", MM_ICON_LOCALI_SENZA);
   
    //NLUtility.log("Getting location");
    if (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined")
    {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                NLUtility.log("GEOLOCATION");
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                NLUtility.log("lat: "+lat);
                NLUtility.log("lng: "+lng);

                NLUtility.log("ClientPosition:");
                var clientPosition = new google.maps.LatLng(lat, lng);
                NLUtility.log(clientPosition);
                $('#ngMap').gmap({'center': clientPosition, 'zoom': 9, 'disableDefaultUI':false, 'callback': function(map) {
                        NLUtility.log("Map ready");
                        $('#ngMap').css({'background-image':'none'});
                        /*
                        this.addMarker({'position': clientPosition, 'bounds': true}).click(function(){
                            $('#ngMap').gmap('openInfoWindow', { 'content': "Tu sei qui" }, this);
                        });
                        */
                }});

                NLUtility.showLoading();

                $.ajax({
                    url: NG_URL + "mappa.php",
                    data: {"lat": lat, "lng": lng},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data) {
                            //NLUtility.log(data);
                            NLUtility.hideLoading();
                            $('#ngMap').gmap('addMarker', {
                                'position': lat+','+lng, 
                                'bounds': false,
                                'icon': 'img/map_user_position.png'
                            }).click(function() {
                                $('#ngMap').gmap('openInfoWindow', {'content': 'Tu sei qui!'}, this);
                            });
                            NightGuide.addMarkers(data.vetrineCon, MM_TYPE_VETRINE_CON, MM_ICON_VETRINE_CON, "vetrina.html", "ngMappaVetrineCon");
                            NightGuide.addMarkers(data.vetrineSenza, MM_TYPE_VETRINE_SENZA, MM_ICON_VETRINE_SENZA, "vetrina.html", "ngMappaVetrineSenza");
                            NightGuide.addMarkers(data.localiCon, MM_TYPE_LOCALI_CON, MM_ICON_LOCALI_CON, "locale-appuntamenti.html", "ngMappaLocaliCon");
                            NightGuide.addMarkers(data.localiSenza, MM_TYPE_LOCALI_SENZA, MM_ICON_LOCALI_SENZA, "locale.html", "ngMappaLocaliSenza");
                        }
                        else {
                            NLUtility.showError('Caricamento offerta fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                }); 
            }, 
            function(error) {
                NLUtility.log('Geolocation error: '+error.code+' message: '+error.message);
                NLUtility.showError(error.message);
                $('#ngMap').css({'background-image':'none'});
            });
    }
});

$(document).delegate("#ngMappa", "pageshow", function(event) {
    NLUtility.log("ngMappa pageshow");
    if (NLUtility.isIOS()) 
    {
        if (NG_PHONEGAP)
            $('#ngMap').height($(window).height() - $(".ng-map-legend").height() - $(".ng-spacer").height());
        else
            $('#ngMap').height($(window).height() - $(".ui-header").height());
    }
    else
    {
        if (NG_PHONEGAP) {
          $('#ngMap').height($(window).height() - $(".ng-map-legend").height());
          if (NLUtility.isAndroid()) {
            $('#ngMap').width($(window).width());
          }
        }
        else {
            $('#ngMap').height($(window).height() - $(".ng-map-legend").height() - $(".ui-header").height());
        }
    }
});

$(document).delegate("#ngOpzioni", "pageinit", function(event) {
    NLUtility.log("ngOpzioni pageinit");
    if (NightGuide.isLogged())
    {
        $("#ngOpzioniUsername").text(NightGuide.getUtente().username);
    }
    else
    {
        $("#ngOpzioniUsername").text("");
    }
});



var NG_URL = "http://www.nightguide.it/mobile/app/services/";

var NG_VERSION          = "1.3";
var NG_LOG              = false;
var NG_DEVICE_ID        = null;

var NG_TIMEOUT          = 60000;
var NG_PHONEGAP         = false;
var NG_PAGESIZE         = 10;

var NG_PHOTOSWIPE_INSTANCE = null;
var NG_PHOTOSWIPE_VISIBLE  = false;

var NG_MORE             = "Mostra altri";

var FB_APP_ID       = "137422686278141";
var FB_APP_SECRET   = "bb7cb8e6d30f8f7327ee3f61601d60c7";
var FB_APP_PERMS    = "email,user_birthday,publish_stream";
var FB_APP_REDIRECT = "http://www.nightguide.it/mobile/app/services/facebook.php";

var TW_NAME         = "Nightguide";
var TW_REDIRECT     = "http://www.nightguide.it/mobile/app/services/twitter.php";

var MM_COLOR_VETRINE_CON    = "00FF00";
var MM_COLOR_VETRINE_SENZA  = "FF0000";
var MM_COLOR_LOCALI_CON     = "FFFF00";
var MM_COLOR_LOCALI_SENZA   = "0000FF";

var MM_TYPE_VETRINE_CON     = "VETRINE_CON";
var MM_TYPE_VETRINE_SENZA   = "VETRINE_SENZA";
var MM_TYPE_LOCALI_CON      = "LOCALI_CON";
var MM_TYPE_LOCALI_SENZA    = "LOCALI_SENZA";

var MM_ICON_VETRINE_CON    = "img/map_vetrine_con.png";
var MM_ICON_VETRINE_SENZA  = "img/map_vetrine_senza.png";
var MM_ICON_LOCALI_CON     = "img/map_locali_con.png";
var MM_ICON_LOCALI_SENZA   = "img/map_locali_senza.png";

if (typeof NightGuide == "undefined" || !NightGuide) {    
    var NightGuide = {};
}

NightGuide.COOKIE_EXPIRE_DAYS = 50 * 365;
NightGuide.COOKIE_CITTA = "ngCookieCitta";
NightGuide.COOKIE_UTENTE = "ngCookieUtente";
NightGuide.COOKIE_SEARCH_ADVISOR = "ngCookieSearchAdvisor";

NightGuide.utente = null;

NightGuide.ajaxError = function(jqXHR, textStatus, errorThrown) {
    NLUtility.log("AJAX ERROR");
    NLUtility.log("textStatus:");
    NLUtility.log(textStatus)
    NLUtility.log("errorThrown:");
    NLUtility.log(errorThrown);
    NLUtility.log("jqXHR:");
    NLUtility.log(jqXHR);
    NLUtility.showError("Non è possibile completare la richiesta. Verifica la connessione ad internet!");
}

NightGuide.toolbar = function(id)
{
    //NLUtility.log("NightGuide.toolbar: " + id);

    var html = '<a href="#" data-rel="back">Indietro</a>';
    html += '<div class="ng-menu">';
    html += "<a href=\"javascript:void(0)\" onclick=\"javascript:if(NightGuide.isLogged()){$.mobile.changePage('conversazioni.html')}else{$.mobile.changePage('login.html?url=conversazioni.html',{'role':'dialog'})}\" class=\"ng-icon-messaggi\"></a>";
    html += "<a href=\"javascript:void(0)\" onclick=\"javascript:if(NightGuide.isLogged()){$.mobile.changePage('visite.html')}else{$.mobile.changePage('login.html?url=visite.html',{'role':'dialog'})}\" class=\"ng-icon-visite\"></a>";
    html += '<a href="home.html" class="ng-icon-home ui-btn-right" data-direction="reverse"></a>';
    html += '</div>';

    $("#"+id+" div[data-role='header']").prepend($(html));
}

NightGuide.header = function(id, transparent, marginTop)
{
    //NLUtility.log("NightGuide.header: " + id);
    
    var citta = NightGuide.getCitta();
    var suffix = (citta && citta.nome) ? (citta.nome.toLowerCase()) : ("www");

    var $header = $("<div/>", {"class": "ng-header"});
    
    if (transparent)
        $header.addClass("ng-bg-transparent");
    
    if (marginTop)
        $header.css({'margin-top': marginTop});
    
    $("<img/>", {"src": "img/citta-"+suffix+".png"}).appendTo($header);
    
    $("#"+id+" div[data-role='content']").prepend($header);
}

NightGuide.getCitta = function()
{
    var c = NLUtility.getCookie(NightGuide.COOKIE_CITTA);
    if (c)
        return JSON.parse(c);
    
    return null;
}

NightGuide.setCitta = function(id, nome)
{
    NLUtility.log("NightGuide.setCitta: id="+id+", nome="+nome);
    
    NLUtility.setCookie(
        NightGuide.COOKIE_CITTA, 
        JSON.stringify({"id": id, "nome": nome}), 
        NightGuide.COOKIE_EXPIRE_DAYS
    );
}

NightGuide.getUtente = function()
{
    var c = NLUtility.getCookie(NightGuide.COOKIE_UTENTE);
    if (c)
        return JSON.parse(c);
    else
        return null;
}

NightGuide.setUtente = function(utente)
{
    NLUtility.log("Username: " + utente.username + " Password: " + utente.password);
    NLUtility.setCookie(
        NightGuide.COOKIE_UTENTE,
        JSON.stringify(utente), 
        NightGuide.COOKIE_EXPIRE_DAYS
    );
}

NightGuide.getSearchAdvisor = function()
{
    var c = NLUtility.getCookie(NightGuide.COOKIE_SEARCH_ADVISOR);
    if (c)
        return JSON.parse(c);
    else
        return null;
}

NightGuide.setSearchAdvisor = function(shown)
{
    NLUtility.setCookie(
        NightGuide.COOKIE_SEARCH_ADVISOR,
        JSON.stringify(shown), 
        NightGuide.COOKIE_EXPIRE_DAYS
    );
}

NightGuide.logout = function()
{
    var utente = NightGuide.getUtente();
    NLUtility.showLoading();
    $.ajax({
        url: NG_URL + "logout.php",
        data: {"username": utente.username, "password": utente.password},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data && data.result) {
                NLUtility.hideLoading();
                NLUtility.setCookie(NightGuide.COOKIE_UTENTE, null, -1);
                NLFacebook.logout();
                NightGuide.updateAuthTags();
                NLUtility.azzeraNotifiche();
                NLUtility.showError("Logout eseguito correttamente.");
            }
            else {
                NLUtility.showError('Logout non riuscito!<br/>Verifica la connessione ad internet.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}

NightGuide.isLogged = function()
{
    //NLUtility.log("NightGuide.isLogged");
    //NLUtility.log(NightGuide.getUtente());
    return (NightGuide.getUtente() != null);
}

NightGuide.updateAuthTags = function()
{
    if (NightGuide.isLogged())
    {
        $("*[data-ng-auth='true']").css("display", "block");
        $("*[data-ng-auth='false']").css("display", "none");
    }
    else
    {
        $("*[data-ng-auth='true']").css("display", "none");
        $("*[data-ng-auth='false']").css("display", "block");
    }
}

NightGuide.addMore = function(url, startindex, element, addFunction)
{
    var $listitem = $('<li data-icon="false" class="ng-more"/>').appendTo($(element));
    var $link = $("<a href=\"#\" onclick=\"NightGuide._more('"+url+"',"+startindex+",'"+element+"','"+addFunction+"')\">").appendTo($listitem);
    $('<h3>Mostra altri...<img src="img/loading.gif" class="ng-more-loading" /></h3>').appendTo($link);
}

NightGuide.more = function(url, startindex, count, element, params, addFunction) 
{
    if (count == NG_PAGESIZE) {
        url += '?idCitta=' + NightGuide.getCitta().id + '&pagesize=' + NG_PAGESIZE;
        for(key in params)
        {
            var value = params[key];
            if (value) {
                url += '&' + key + '=' + NLUtility.urlencode(value);
            }
        }
        NightGuide.addMore(url, startindex + NG_PAGESIZE, element, addFunction);
    }
}

NightGuide._more = function(url, startindex, listview, addFunction)
{
    NLUtility.log("NightGuide._more");

    var $more = $(listview).children().last();
    $more.addClass("ng-more-disabled");
    
    var $link = $more.find("a");
    var onclick = $link.attr('onclick');
    $link.removeAttr('onclick');
    
    var $loading = $more.find(".ng-more-loading");
    $loading.show();

    NLUtility.log(url+"&startindex="+startindex);
    
    $.ajax({
        url: url+"&startindex="+startindex,
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            $more.remove();
            if (data)
            {
                for(var i = 0; i < data.length; i++)
                {
                    eval(addFunction+"('"+listview+"',"+JSON.stringify(data[i])+")");
                }
                if (data.length == NG_PAGESIZE)
                {
                    NightGuide.addMore(url, startindex + NG_PAGESIZE, listview, addFunction);
                }
                $(listview).listview('refresh');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $loading.hide();
            $more.removeClass("ng-more-disabled");
            $link.attr('onclick', onclick);
            NLUtility.showError("Errore in fase di paginazione");
        }
    }); 
}

NightGuide.searchBox = function(parent, url, addFunction, element, 
    showDate, showGeo, params, placeholder, selectName, selectEmptyText,
    selectDataSource, selectFieldValue, selectFieldText) 
{
    paramCount = 0;
    for (var key in params) {
        var value = params[key];
        if (value) {
            url += (paramCount == 0) ? ('?') : ('&');
            url += key + '=' + NLUtility.urlencode(value);
            paramCount++;
        }
    }

    submitParams = "this,";
    
    if (selectName)
        submitParams += "'"+selectName+"',";
    else
        submitParams += "null,";
    
    if(addFunction)
        submitParams += "'"+addFunction+"',";
    else
        submitParams += "null,";
    
    submitParams += "0";


    var onsubmit = "return(NLUtility.searchEx("+submitParams+"));";
    var $form = $('<form data-ajax="false" action="" class="ng-search-ex" id="ngSearchExForm" onsubmit="'+onsubmit+'"/>').appendTo($(parent));
    $('<input type="hidden" name="url" value="'+url+'"/>').appendTo($form);
    $('<input type="hidden" name="element" value="'+element+'"/>').appendTo($form);
    
    NLUtility.log("Advisor: " + NightGuide.getSearchAdvisor());
    if (showGeo && !NightGuide.getSearchAdvisor())
    {
        $advisor = $('<div class="ng-advisor-edge"></div><div class="ng-advisor">Puoi usare questi bottoni per decidere se cercare per nome o in base alla distanza in km da te.</div>').appendTo($form);
        $advisor.click(function(){
            NightGuide.setSearchAdvisor(true);
            $advisor.fadeOut()
        });
    }

    var $div;
    var $select;
    
    if (showGeo) {
        $div = $('<div class="ng-search-ex-type"/>').appendTo($form);
        var $fieldcontain = $('<div data-role="fieldcontain"/>').appendTo($div);
        var $fieldset = $('<fieldset data-role="controlgroup" data-type="horizontal"/>').appendTo($fieldcontain);
        var onclickText = "javascript:$('.ng-search-ex-detail-term').show();$('.ng-search-ex-detail .ui-select').hide();$(this.form).submit();";
        $('<input type="radio" name="geosearch" id="geosearch-off" value="0" checked="checked" onclick="'+onclickText+'" />').appendTo($fieldset);
        $('<label class="ui-shadow-inset" for="geosearch-off"><span class="ng-search-ex-type-text"></span></label>').appendTo($fieldset);
        var onclickGeo = "javascript:$('.ng-search-ex-detail-term').hide();$('.ng-search-ex-detail .ui-select').show();$(this.form).submit();";
        $('<input type="radio" name="geosearch" id="geosearch-on" value="1" onclick="'+onclickGeo+'" />').appendTo($fieldset);
        $('<label class="ui-shadow-inset" for="geosearch-on"><span class="ng-search-ex-type-geo"></span></label>').appendTo($fieldset);
    }

    if (showDate) {
        $div = $('<div class="ng-search-ex-date"/>').appendTo($form); //ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-body-c
        var closeCallback = "NLSearchDateEx";
        NightGuide.dateBox($div, "date", null, "Data...", closeCallback);
    }

    var css = "";
    if (showDate)
        css += " ng-search-ex-detail-date";
    if (showGeo)
        css += " ng-search-ex-detail-geo";

    $div = $('<div class="ng-search-ex-detail'+css+'"/>').appendTo($form);
    var onkeyup = 'javascript:if(event && event.keyCode == 13){$(this.form).submit();}';
    $('<input type="text" name="term" class="ng-search-ex-detail-term" placeholder="'+placeholder+'" onkeyup="'+onkeyup+'"/>').appendTo($div);
    var onchange = "javascript:$(this).trigger('updatelayout');$(this.form).submit();";
    var onblur = "$(this).trigger('updatelayout');";
    $select = $('<select name="distance" class="ng-search-ex-detail-geo" onchange="'+onchange+'" onblur="'+onblur+'"/>').appendTo($div);
    $('<option value="" selected="selected">Distanza...</option>').appendTo($select);
    $('<option value="5">5 km</option>').appendTo($select);
    $('<option value="10">10 km</option>').appendTo($select);
    $('<option value="20">20 km</option>').appendTo($select);
    $('<option value="30">30 km</option>').appendTo($select);
    $('<option value="50">50 km</option>').appendTo($select);
    $('<option value="75">75 km</option>').appendTo($select);
    $('<option value="100">100 km</option>').appendTo($select);

    if (selectName)
    {
        $div = $('<div class="ng-search-ex-select"/>').appendTo($form);
        $select = $('<select name="'+selectName+'" onchange="'+onchange+'" onblur="'+onblur+'">').appendTo($div);
        if (selectEmptyText)
        {
            $('<option value="">'+selectEmptyText+'</option>').appendTo($select);
        }
        if (selectDataSource) {
            for(var i = 0; i < selectDataSource.length; i++) {
                var item = selectDataSource[i];
                var $option = $('<option value="'+item.selectFieldValue+'"/>').appendTo($select);
                if (item[selectFieldValue] == NLUtility.getUrlVar[selectName])
                {
                    $option.attr('selected',"true");
                }
                $option.text(item[selectFieldText]);
            }
        }
    }
}

NightGuide.dateBox = function($parent, name, value, placeholder, closeCallback, closeCallbackArgs) 
{
    var args = '[';
    if (closeCallbackArgs) {
        for (var i = 0; i < closeCallbackArgs.length; i++) {
            args += '"'+closeCallbackArgs[i]+'"';
            if (i < closeCallbackArgs.length - 1)
                args += ',';
        }
    }
    args += ']';
    
    if (!value) value = "";
    if (!placeholder) placeholder = "";
    if (!closeCallback) closeCallback = "";
    if (!closeCallbackArgs) closeCallbackArgs = "";
    
    var input = '<input name="'+name+'" id="'+name+'" type="date" readonly="readonly" value="'+value+'" ';
    input += 'placeholder="'+placeholder+'" ';
    input += 'onchange="'+onchange+'" ';
    input += 'data-role="datebox" ';
    input += 'data-options=\'{"defaultDate":"'+value+'","closeCallback":"'+closeCallback+'","closeCallbackArgs":'+args+',"mode":"flipbox","noButtonFocusMode":true,"useClearButton":true,"centerWindow":true}\'>';
    $(input).appendTo($parent);
}

NightGuide.addLocale = function(listview, item)
{
    var immagine = (item.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagine)) : ("img/empty-logo.png");
    var nome = (item.nome) ? (item.nome) : ("");
    var indirizzo = (item.indirizzo) ? (item.indirizzo) : ("");
    var paramCitta = "&idCitta=" + ((item.idCitta) ? (item.idCitta) : (NightGuide.getCitta().id));
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="locale.html?id='+item.id+paramCitta+'"/>').appendTo($listitem);
    $('<img src="'+immagine+'" />').appendTo($link);
    $('<h3>'+nome+'</h3>').appendTo($link);
    $('<p>'+indirizzo+'</p>').appendTo($link);
    if (item.distanzakm)
    {
        $('<p class="ui-li-aside">'+NLUtility.round(item.distanzakm, 1)+' km</p>').appendTo($link);
    }
}

NightGuide.addAppuntamento = function(listview, item)
{
    var immagine = (item.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagine)) : ("img/empty-logo.png");
    var nome = (item.nome) ? (item.nome) : ("");
    var nomelocale = (item.nomelocale) ? (item.nomelocale) : ("");
    var data = (item.data) ? (item.data) : ("");
    var paramCitta = "&idCitta=" + ((item.idCitta) ? (item.idCitta) : (NightGuide.getCitta().id));
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="appuntamento.html?id='+item.id+paramCitta+'"/>').appendTo($listitem);
    $('<img src="'+immagine+'" />').appendTo($link);
    $('<h3>'+nome+'</h3>').appendTo($link);
    $('<p><strong>'+nomelocale+'</strong><br/>'+data+'</p>').appendTo($link);
    if (item.distanzakm)
    {
        $('<p class="ui-li-aside">'+NLUtility.round(item.distanzakm, 1)+' km</p>').appendTo($link);
    }
}

NightGuide.addFoto = function(listview, item)
{
    var primafoto = (item.primafoto) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.primafoto)) : ("");
    var immagine = (item.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagine)) : ("img/empty-logo.png");
    var nome = (item.nome) ? (item.nome) : ("");
    var nomelocale = (item.nomelocale) ? (item.nomelocale) : ("");
    var data = (item.data) ? (item.data) : ("");
    var paramCitta = "&idCitta=" + ((item.idCitta) ? (item.idCitta) : (NightGuide.getCitta().id));
    
    //if (immagine == "img/empty-logo.png" && primafoto.length > 0)
    if (primafoto.length > 0)
        immagine = primafoto;
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="gallery.html?id='+item.id+paramCitta+'"/>').appendTo($listitem);
    $('<img src="'+immagine+'" />').appendTo($link);
    $('<h5>'+nome+'</h5>').appendTo($link);
    $('<p><strong>'+nomelocale+'</strong><br/>'+data+'</p>').appendTo($link);
}

NightGuide.addUtente = function(listview, item)
{  
    var sesso = (item.sesso)?("Donna"):("Uomo");
    var online = (item.isonline)?('<img src="img/icon-utente-online.png" class="ng-status"/> Online'):('<img src="img/icon-utente-offline.png" class="ng-status"/> Offline');
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="profilo.html?id='+item.iduser+'"/>').appendTo($listitem);
    $('<img src="'+NG_URL+'thumb.php?f='+NLUtility.urlencode(item.foto)+'" />').appendTo($link);
    $('<h3>'+item.username+'</h3>').appendTo($link);
    $('<p>'+online+' - '+sesso+' - '+item.eta+' - '+item.nomeprovincia+'</p>').appendTo($link);
}

NightGuide.addVisita = function(listview, item)
{                    
    var sesso = (item.sesso)?("Donna"):("Uomo");
    NLUtility.log("SESSO = " + item.sesso);
    
    var online = (item.isonline)?('<img src="img/icon-utente-online.png" class="ng-status"/> Online'):('<img src="img/icon-utente-offline.png" class="ng-status"/> Offline');
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="profilo.html?id='+item.idUtente+'"/>').appendTo($listitem);
    $('<img src="'+NG_URL+'thumb.php?f='+NLUtility.urlencode(item.fotoutente)+'" />').appendTo($link);
    $('<p>'+NLUtility.formatDateTime(item.data)+'</p>').appendTo($link);
    $('<h3>'+item.nomeutente+'</h3>').appendTo($link);
    $('<p>'+online+' - '+sesso+' - '+item.eta+' - '+item.nomeprovincia+'</p>').appendTo($link);
}

NightGuide.subheaderLocale = function(id)
{
    NLUtility.log("NightGuide.subheaderLocale");
    var citta = NightGuide.getCitta();
    var suffix = (citta && citta.nome) ? (citta.nome.toLowerCase()) : ("www");

    var $header = $("<div/>", {"class": "ng-header"});
    $("<img/>", {"src": "img/citta-"+suffix+".png"}).appendTo($header);
    
    var $parent = $("#"+id+"");
    $header.appendTo($parent);
    var $divOut = $('<div class="ng-locale-header-logo">').appendTo($parent);
    var $divIn = $('<div class="ng-locale-header-logo-img">').appendTo($divOut);
    $('<img class="ngLocaleSubheaderLogo" src="img/empty-logo.png">').appendTo($divIn);
    $('<p class="ngLocaleSubheaderName">&nbsp;</p>').appendTo($divOut);
}

NightGuide.updateSubheaderLocale = function(id, immagine, nome, header)
{
    NLUtility.log("NightGuide.updateSubheaderLocale");
    $("#"+id).find(".ngLocaleSubheaderLogo").attr("src", (immagine)?(immagine):("img/empty-logo.png"));
    $("#"+id).find(".ngLocaleSubheaderName").html((nome)?(nome):("NightGuide"));
    if (header) 
    {
        var headerWidth = 500;
        var headerHeight = 213;
        var screenWidth = NLUtility.screenWidth();
        if (screenWidth < headerWidth)
        {
            headerHeight = (screenWidth * 213)/500;
            header = NG_URL + "thumb.php?w="+screenWidth+"&h="+headerHeight+"&f="+header;
        }
        NLUtility.log("HEADER: " + header);
        var $header = $("#"+id).find(".ng-header");
        $header.find("img").remove();
        $header.css({"background-color": '#000'});
        $header.css({"background-image": 'url("'+header+'")'});
        $header.css({"background-position": 'bottom left'});
        $header.css("height", headerHeight - 20);
    }
}

NightGuide.photoswipe = function(id)
{
    NLUtility.log("NightGuide.photoswipe");
    if ($("#"+id).children().length > 0)
    {
        var options = {
            captionAndToolbarAutoHideDelay: 0,
            captionAndToolbarFlipPosition: true,
            getImageCaption: function(el)
            {
                var $img = $(el).find("img");
                var id = $img.attr("data-id");
                var idCitta = $img.attr('data-citta');
                var url = $img.attr('data-url').replace("'", "\'");
                var preview = $img.attr('data-preview').replace("'", "\'");
                var number = $img.attr('data-number');
                var saveUrl = $img.attr('data-save').replace("'", "\'");

                var counter = '<div class="ng-foto-number"><span>'+number+'</span></div>';
                
                var fb = '<a href="#" onclick="javascript:NLFacebook.feedFoto('+id+',\''+url+'\',\''+preview+'\','+idCitta+');"><img src="img/fb-condividi.png"></a>';

                var tw = '<a href="#" onclick="javascript:NLTwitter.tweetFoto('+id+','+idCitta+');"><img src="img/tweet.png"></a>';
                
                var save = '<a href="#" onclick="javascript:NightGuide.saveToPhotoAlbum(\''+saveUrl+'\');"><img src="img/save.png"></a>';

                return $(counter+'&nbsp;'+fb+'&nbsp;'+tw+'&nbsp;'+save);
            }
        }

        //NLUtility.log("Options:");
        //NLUtility.log(options);

        var instance = $("#"+id+" a").photoSwipe(options);  

        instance.addEventHandler(Code.PhotoSwipe.EventTypes.onBeforeShow, function(e){
            NLUtility.log('onBeforeShow');
            if (NLUtility.isAndroid())
            {
                // Workaround per problema su Android
                NLUtility.log('silentScroll');
                $.mobile.silentScroll(0);
            }
            if (NG_PHONEGAP) {
                window.plugins.toolBar.hide("ngToolBar");    
            }
        });
        instance.addEventHandler(Code.PhotoSwipe.EventTypes.onShow, function(e){
            NLUtility.log('onShow');
            NG_PHOTOSWIPE_INSTANCE = instance;
            NG_PHOTOSWIPE_VISIBLE = true;
            // Workaround per problema su Android
            if (NLUtility.isAndroid())
            {
                NLUtility.log("background to black");
                $(".ui-page").css("background-color", "#000000");
            }
        });

        instance.addEventHandler(Code.PhotoSwipe.EventTypes.onHide, function(e){
            NLUtility.log('onHide');
            NG_PHOTOSWIPE_INSTANCE = null;
            NG_PHOTOSWIPE_VISIBLE = false;
            // Workaround per problema su Android
            if (NLUtility.isAndroid())
            {
                NLUtility.log("background to gray");
                $(".ui-page").css("background-color", "#F0F0F0");
            }
            if (NG_PHONEGAP) {
                window.plugins.toolBar.show("ngToolBar", true);
            }
        });

    }
}

NightGuide.addProfileField = function($listview, label, value, custom) 
{
    if (value) 
    {
        if (value.indexOf("http://") == 0) {
            value = '<a href="'+value+'" target="_blank">'+value+'</a>';
        }
        
        if (!custom) {
            custom = "";
        }
    
        var $li = $('<li class="ng-field"/>').appendTo($listview);
        $('<div class="ng-label"/>').text(label).appendTo($li);
        $('<div class="ng-value"/>').html(value+custom).appendTo($li);
    }
}

NightGuide.addConversazione = function(listview, item)
{  
    var $listitem = $('<li id="ngConversazione'+item.idUtente+'"/>').appendTo($(listview));
    var $link = $('<a href="messaggi.html?id='+item.idUtente+'"/>').appendTo($listitem);
    var online = (item.isonline)?('<img src="img/icon-utente-online.png" class="ng-status"/>'):('<img src="img/icon-utente-offline.png" class="ng-status"/>');
    $('<img src="'+NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagineUtente)+'"/>').appendTo($link);
    $('<p>'+NLUtility.formatDateTime(item.dataUltimoMessaggio)+'</p>').appendTo($link);
    $('<h3>'+item.testoUltimoMessaggio+'</h3>').appendTo($link);
    $('<p>'+online+'&nbsp;<strong>'+item.nomeUtente+'</strong>').appendTo($link);
    if (item.numeroMessaggiNonLetti > 0) {
        $('<span class="ui-li-count">'+item.numeroMessaggiNonLetti+'</span>').appendTo($link);
    }
    $('<a class="ng-conversazioni-delete" href="conversazioni-delete.html?id='+item.idUtente+'" data-rel="dialog">Cancella</a>').appendTo($listitem);
}


NightGuide.addMessaggio = function(listview, item)
{  
    var utenteLoggato = NightGuide.getUtente();
    var css = "";
    if (item.idUtente != utenteLoggato.iduser)
        css = "-destinatario";
    
    var $msg = $('<div data-id="'+item.id+'" class="ng-messaggio'+css+'"/>').appendTo($(listview));
    var $txt = $('<div class="ng-messaggio-testo">').appendTo($msg);
    $('<p class="ng-messaggio-data">'+NLUtility.formatDateTime(item.dataCreazione)+'</p>').appendTo($txt);
    $('<p>'+item.testo+'</p>').appendTo($txt);
    $('<div class="ng-messaggio-foto"><img src="'+NG_URL+'thumb.php?w=40&h=40&f='+item.fotoutente+'"/></div>').appendTo($msg);
    $('<div class="ng-messaggio-edge"></div>').appendTo($msg);
}

NightGuide.addVetrina = function(listview, item)
{
    var immagine = (item.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagine)) : ("img/empty-logo.png");
    var nome = (item.nome) ? (item.nome) : ("");
    var indirizzo = (item.indirizzo) ? (item.indirizzo) : ("");
    var paramCitta = "&idCitta=" + ((item.idCitta) ? (item.idCitta) : (NightGuide.getCitta().id));
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="vetrina.html?id='+item.id+paramCitta+'"/>').appendTo($listitem);
    $('<img src="'+immagine+'" />').appendTo($link);
    $('<h3>'+nome+'</h3>').appendTo($link);
    $('<p>'+indirizzo+'</p>').appendTo($link);
    if (item.distanzakm)
    {
        $('<p class="ui-li-aside">'+NLUtility.round(item.distanzakm, 1)+' km</p>').appendTo($link);
    }
}

NightGuide.addOfferta = function(listview, item)
{
    var immagine = (item.immagine) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(item.immagine)) : ("img/empty-logo.png");
    var nome = (item.nome) ? (item.nome) : ("");
    var prezzo = NLUtility.formatCurrency(item.prezzo);
    var scontato = NLUtility.formatCurrency(item.prezzo - (item.prezzo * item.sconto / 100));
    var paramCitta = "&idCitta=" + ((item.idCitta) ? (item.idCitta) : (NightGuide.getCitta().id));
    
    var $listitem = $('<li/>').appendTo($(listview));
    var $link = $('<a href="offerta.html?id='+item.id+paramCitta+'"/>').appendTo($listitem);
    $('<img src="'+immagine+'" />').appendTo($link);
    $('<h1>'+nome+'</h1>').appendTo($link);
    
    $('<p/>').html('Prezzo: <strike class="ng-red-price">'+prezzo+'</strike> <strong>'+scontato+'</strong>').appendTo($link);
    $('<p/>').html('Disponibilità: <strong>'+item.disponibilita+'</strong>').appendTo($link);
    $('<p/>').html(item.datainizio+' - '+item.datafine).appendTo($link);
}

NightGuide.addMarkers = function(markers, tipo, icona, url, checkBoxId)
{
    for(var i = 0; i < markers.length; i++) {
        var item = markers[i];
        NLUtility.log(item);
        $('#ngMap').gmap('addMarker', {
            'tipo': tipo, 
            'position': item.lat+','+item.lng, 
            'bounds': false,
            'icon': icona, //NLUtility.markerURL(colore, 18, 24),
            'item_id': item.id,
            'item_idcitta': item.idCitta,
            'item_url': url,
            'item_km': item.distanzakm,
            'item_tel': item.telefono,
            'item_img': item.immagine,
            'item_name': item.nome,
            'item_desc': item.descrizione,
            'item_date': item.data,
            'item_datestart': item.datainizio,
            'item_dateend': item.datafine,
            'item_km': item.distanzakm
        }).click(function() {
            var paramCitta = "&idCitta=" + ((this.item_idcitta) ? (this.item_idcitta) : (NightGuide.getCitta().id));
            var page = this.item_url+'?id='+this.item_id+paramCitta;
            var src = (this.item_img) ? (NG_URL+'thumb.php?f='+NLUtility.urlencode(this.item_img)) : ("img/empty-logo.png");
            var img = '<img src="'+src+'" class="ng-map-info-img"/>';
            var name = (this.item_name)?('<strong>'+this.item_name+'</strong>'):('<strong>NightGuide</strong>');
            var desc = (this.item_desc)?('<br/><strong>Presso: </strong>'+this.item_desc):('');
            var tel = (this.item_tel)?('<br/><strong>Tel: </strong>'+this.item_tel):('');
            var km = (this.item_km)?('<br/><strong>Distanza: </strong>'+NLUtility.round(this.item_km, 1)+' km'):('');
            var date = (this.item_date)?('<br/><strong>Data: </strong>'+this.item_date):('');
            var datestart = (this.item_datestart)?('<br/><strong>Dal: </strong>'+this.item_datestart):('');
            var dateend = (this.item_dateend)?('<br/><strong>Al: </strong>'+this.item_dateend):('');
            var details = '<a class="ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-c" href="#" onclick="javascript:$.mobile.changePage(\''+page+'\')"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Dettagli</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></span></a>';
            var content = img + '<div class="ng-map-info">' + name + '<span style="font-size:0.8em">' + date + datestart + dateend + desc + tel + km + '</span></div>' + details;
            NLUtility.log(content);
            $('#ngMap').gmap('openInfoWindow', {'content': content}, this);
        });
    }
    
    $('#'+checkBoxId).click(function() {
        var self = this;
        $('#ngMap').gmap('find', 'markers', {'property': 'tipo', 'value': tipo}, function(marker, found) {
            if (found) {
                marker.setVisible(self.checked);   
            }
        });
    });
}

NightGuide.addListItems = function(listview, data, servicePage, addFunction, emptyText, params, title)
{
    var $listview = $(listview);
    
    if (title)
    {
        $('<li data-role="list-divider">'+title+'</li>').appendTo($listview);
    }
    
    if (data.length == 0) 
    {
        $('<li>'+emptyText+'</li>').appendTo($listview);
    }
    else 
    {
        for(var i = 0; i < data.length; i++)
        {            
            eval(addFunction+"('"+listview+"',"+JSON.stringify(data[i])+")");
        }

        if (!params)
            params = null;
        
        NightGuide.more(
            NG_URL + servicePage, 
            0, 
            data.length, 
            listview, 
            params, 
            addFunction);
    }
    
    $listview.listview('refresh');
}

NightGuide.start = function(event)
{
    NLUtility.log("NightGuide.start");
    $("#ngIndexLoading").hide();
    if (!NightGuide.getCitta()) 
    {
        NLUtility.log("No city...");
        setTimeout(function(){$.mobile.changePage("citta.html?back=0", {"transition": "pop"})},200);
    }
    else 
    {
        NLUtility.log("City already set...");
        if (!NG_PHONEGAP)
        {
            NLUtility.log("Phonegap not ready... wait 200ms then go to home...");
            setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
        }
        else if (NLUtility.isIOS() || NLUtility.isAndroid())
        {
            NLUtility.log("Reading app preferences");
            window.plugins.applicationPreferences.get('apns', 
                function(result) {
                    var params = result.split("-");
                    NLUtility.log("APNS TYPE = " + params[0]);
                    if (params[0] == "1" && params[1]) 
                    {
                        NLUtility.log("APNS ID   = " + params[1]);
                        setTimeout(function(){$.mobile.changePage("messaggi.html?id="+params[1], {"transition": "pop"})},200);
                        return;
                    }
                    else if (params[0] == "2") 
                    {
                        setTimeout(function(){$.mobile.changePage("visite.html", {"transition": "pop"})},200);
                        return;
                    }
                    else
                    {
                        setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                    }
                }, 
                function(error) {
                    setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                }
            );
            /*
            window.plugins.applicationPreferences.get('apns', 
                function(result) {
                    NLUtility.log("App preferences read successfully");
                    
                    if (result && result.length > 0)
                    {
                        window.plugins.applicationPreferences.set('apns', '', 
                            function() {
                                NLUtility.log("APNS key reset successfully");
                            }, 
                            function() {
                                NLUtility.log("APNS key reset error!");
                        });
                    }
                    
                    if (!result || result.length == 0)
                    {
                        NLUtility.log("APNS is empty, redirect to home");
                        setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                        return;
                    }
                    else
                    {
                        var params = result.split("-");
                        NLUtility.log("APNS TYPE = " + params[0]);
                        if (params[0] == "1" && params[1]) 
                        {
                            NLUtility.log("APNS ID   = " + params[1]);
                            NLUtility.log("Redirect to messaggi");
                            setTimeout(function(){$.mobile.changePage("messaggi.html?id="+params[1], {"transition": "pop"})},200);
                            return;
                        }
                        else if (params[0] == "2") 
                        {
                            NLUtility.log("Redirect to visite");
                            setTimeout(function(){$.mobile.changePage("visite.html", {"transition": "pop"})},200);
                            return;
                        }
                        else
                        {
                            NLUtility.log("Redirect to home");
                            setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                            return;
                        }
                    }
                    
                }, 
                function(error) {
                    NLUtility.log("App preferences read error!");
                    setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                }
            );
            */
        }
        /*
        else if (NLUtility.isIOS())
        {
            window.plugins.applicationPreferences.get('apns', 
                function(result) {
                    var params = result.split("-");
                    NLUtility.log("APNS TYPE = " + params[0]);
                    if (params[0] == "1" && params[1]) 
                    {
                        NLUtility.log("APNS ID   = " + params[1]);
                        setTimeout(function(){$.mobile.changePage("messaggi.html?id="+params[1], {"transition": "pop"})},200);
                        return;
                    }
                    else if (params[0] == "2") 
                    {
                        setTimeout(function(){$.mobile.changePage("visite.html", {"transition": "pop"})},200);
                        return;
                    }
                    else
                    {
                        setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                    }
                }, 
                function(error) {
                    setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
                }
            );
        }
        else if (NLUtility.isAndroid())
        {
            var type = NLUtility.getUrlVarsFromURL(NLUtility.getPageURL(event))["type"];
            var id = NLUtility.getUrlVarsFromURL(NLUtility.getPageURL(event))["id"];
            
            NLUtility.log("C2M TYPE = " + type);
            NLUtility.log("C2M ID   = " + id);
            
            if (type) 
            {
                if (type == "1" && id) 
                {
                    setTimeout(function(){$.mobile.changePage("messaggi.html?id="+id, {"transition": "pop"})},200);
                    return;
                }
                else if (type == "2") 
                {
                    setTimeout(function(){$.mobile.changePage("visite.html", {"transition": "pop"})},200);
                    return;
                }
            }
            setTimeout(function(){$.mobile.changePage("home.html", {"transition": "pop"})},200);
        }
        */
    }
}

NightGuide.saveToPhotoAlbum = function(url)
{
    NLUtility.log("NightGuide.saveToPhotoAlbum: " + url);
    
    if (!NG_PHONEGAP)
    {
        NLUtility.showError("Per salvare la foto devi scaricare l'app dallo store!");
    }
    else
    {
        window.plugins.imageHelper.saveToPhotoAlbum(url,
            function() { // SUCCESS
                NLUtility.log("ImageHelper Success");
            },
            function() { // FAIL
                NLUtility.log("ImageHelper Fail");
            }
        );
        NLUtility.showMessage("Immagine salvata nell'album fotografico.");
    }
}

NightGuide.updateConversazioni = function(silent)
{
    NLUtility.log("NightGuide.updateConversazioni");
    
    var utente = NightGuide.getUtente();
    
    if (!silent)
        NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "conversazioni.php",
        data: {"username": utente.username, "password": utente.password, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            //NLUtility.log(data);
            if (data) {
                NLUtility.hideLoading();
                $(".ng-conversazioni").find("li").remove();
                NightGuide.addListItems(
                    ".ng-conversazioni", 
                    data, 
                    "conversazioni.php", 
                    "NightGuide.addConversazione", 
                    "Nessuna conversazione disponibile", 
                    {"username": utente.username, "password": utente.password}
                );
            }
            else {
                NLUtility.showError('Caricamento conversazioni fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}

NightGuide.updateVisite = function(silent)
{
    var utente = NightGuide.getUtente();
    
    if (silent)
        NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "visite.php",
        data: {"username": utente.username, "password": utente.password, "startindex": 0, "pagesize": NG_PAGESIZE},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                $(".ng-visite").find("li").remove();
                NightGuide.addListItems(
                    ".ng-visite", 
                    data, 
                    "visite.php", 
                    "NightGuide.addVisita", 
                    "Non ci sono visite", 
                    {"username": utente.username, "password": utente.password}
                );
                    
                $.ajax({
                    url: NG_URL + "visite.php",
                    data: {"action": "azzera", "username": utente.username, "password": utente.password},
                    type: "POST",
                    dataType: "json",
                    timeout: NG_TIMEOUT,
                    success: function(data) {
                        if (data && data.result) {
                            NLUtility.hideLoading();
                        }
                        else {
                            NLUtility.showError('Azzeramento visite fallito!');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
                    }
                }); 
            }
            else {
                NLUtility.showError('Caricamento visite fallito!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
}
