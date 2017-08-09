


                    NLMobile.toolbar("ngOffertaCorrelata");
                

                        NLMobile.subheaderOfferta("ngOffertaCorrelataSubheader");
                    



                    NLMobile.toolbar("ngStrutture");
                

                    NLMobile.searchBox(
                        "#ngStruttureSearchBox",
                        API_STRUTTURE + "?language=" + NLUtility.language(), 
                        API_STRUTTURE_HANDLER, 
                        ".ng-strutture", 
                        false, 
                        false, 
                        null, 
                        NLTranslator.translate("Cerca strutture..."), 
                        "idCategoria", 
                        NLTranslator.translate("Seleziona una categoria..."));
                



                    NLMobile.toolbar("ngRubricaGallery");
                

                        NLMobile.subheaderRubricaNotizia("ngRubricaGallerySubheader");
                    



                    NLMobile.toolbar("ngStruttura");
                

                        NLMobile.subheaderStruttura("ngStrutturaSubheader");
                    



                    NLMobile.toolbar("ngRubricaNotizia");
                

                        NLMobile.subheaderRubricaNotizia("ngRubricaNotiziaSubheader");
                    



                    NLMobile.header("ngHome", true, 10);
                



                    NLMobile.toolbar("ngOfferte");
                

                    NLMobile.searchBox(
                        "#ngOfferteSearchBox", 
                        API_OFFERTE + "?language=" + NLUtility.language(), 
                        API_OFFERTE_HANDLER, 
                        ".ng-offerte", 
                        false, 
                        false, 
                        null, 
                        NLTranslator.translate("Cerca offerte..."), 
                        "idCategoria", 
                        NLTranslator.translate("Seleziona una categoria..."));
                





                    NLMobile.toolbar("ngRubrica");
                

                    NLMobile.searchBox(
                        "#ngRubricaSearchBox",
                        API_RUBRICA + "?language=" + NLUtility.language(), 
                        API_RUBRICA_HANDLER, 
                        ".ng-rubrica", 
                        false, 
                        false, 
                        null, 
                        NLTranslator.translate("Cerca rubriche..."),
                        "idCategoria", 
                        NLTranslator.translate("Seleziona una categoria..."));
                



                    NLMobile.toolbar("ngOfferta");
                

                        NLMobile.subheaderOfferta("ngOffertaSubheader");
                    



				NLMobile.toolbar("ngPrivacy");
			

				NLMobile.header("ngPrivacy");
			



			NLMobile.toolbar("ngRichiestaInfo");
			



                    NLMobile.toolbar("ngStrutturaGallery");
                

                        NLMobile.subheaderStruttura("ngStrutturaGallerySubheader");
                    



                    NLMobile.toolbar("ngStrutturaInfo");
                

                        NLMobile.subheaderStruttura("ngStrutturaInfoSubheader");
                    

document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">');
document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black">');

document.write('<link rel="stylesheet" href="jquery.mobile/themes/pugliaetmores.min.css" />');
document.write('<link rel="stylesheet" href="jquery.mobile/jquery.mobile.structure-1.0.1.min.css" />');
document.write('<link rel="stylesheet" href="jquery.mobile/datebox/jquery.mobile.datebox.min.css" />');
document.write('<link rel="stylesheet" href="photoswipe/photoswipe.css" />');

document.write('<link rel="stylesheet" href="css/photoswipe.css" />');
document.write('<link rel="stylesheet" href="css/pugliaetmores.css" />');


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

//document.write('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true" ></script>');

document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.services.js"></script>');
document.write('<script type="text/javascript" src="jquery.mobile/map/ui/jquery.ui.map.extensions.js"></script>');
document.write('<script type="text/javascript" src="photoswipe/code.photoswipe.jquery-3.0.4.mod.js"></script>');

document.write('<script type="text/javascript" src="js/configuration.js"></script>');
document.write('<script type="text/javascript" src="js/utility.js"></script>');
document.write('<script type="text/javascript" src="js/NLMobile.js"></script>');
document.write('<script type="text/javascript" src="js/phonegap.js"></script>');
document.write('<script type="text/javascript" src="js/encoder.js"></script>');
//document.write('<script type="text/javascript" src="js/facebook.js"></script>');
//document.write('<script type="text/javascript" src="js/twitter.js"></script>');
document.write('<script type="text/javascript" src="js/translator.js"></script>');
document.write('<script type="text/javascript" src="js/app.js"></script>');


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
    url += ((url.indexOf("?") > -1)?("&"):("?")) + "pagesize="+NG_PAGESIZE;//+"&idCitta="+NLMobile.getCitta().id;
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
    NLUtility.log("searchEx: " + url);
    
    NLUtility.showLoading();

    $.ajax({
        url: url + "&startindex=" + startindex,
        data: {},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            NLUtility.hideLoading();
            $(listview).children().remove();
            NLUtility.log("VALUTAZIONE SEARCH");
            if (!data || data.length == 0) {
                NLUtility.log("VALUTAZIONE NULLO");
                $('<li>Non ci sono risultati per tale ricerca</li>').appendTo($(listview));
            } else {
                NLUtility.log("VALUTAZIONE DATA");
                for (var i = 0; i < data.length; i++) {
                    eval(addFunction+"('"+listview+"',"+JSON.stringify(data[i])+")");
                }
                if (data.length == NG_PAGESIZE) {
                    NLMobile.addMore(url, startindex + NG_PAGESIZE, listview, addFunction);
                }
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
    
    var theme = (isError) ? ("e") : ("c");

    $( "<div class='ui-loader ui-overlay-shadow ui-body-" + theme + " ui-corner-all'><h1>"+ msg +"</h1></div>" )
        .css({"display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 200})
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
    var utente = NLMobile.getUtente();
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + "messaggi.php",
        data: {"action": "send", "id": id, "username": utente.username, "password": utente.password, "messaggio": messaggio},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                NLUtility.addMessages(data, callback);
                $form.find('input[name="messaggio"]').val("");
            }
            else {
                NLUtility.showError('Impossibile inviare il messaggio!');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });
}

NLUtility.updateMessages = function()
{
    //NLUtility.log("updateMessages");
    
    if (!NLMobile.isLogged()) {
        NLUtility.log("--- stop updateMessages ---");
        return;
    }
    
    if ($("#ngMessaggi").length > 0) {
        var id = $('#ngMessaggiForm').find('input[name="id"]').val();
        //NLUtility.log("id destinatario = "+id);
        if (id && id > 0)
        {
            var utente = NLMobile.getUtente();
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
                            if (NLMobile.isLogged()) {
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
                        NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.addMessaggio(".ng-messaggi", data[i]);
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
/*
NLUtility.notify = function()
{
    //NLUtility.log("notify");
    
    if (!NLMobile.isLogged()) 
    {
        NLUtility.NOTIFYING = false;
        return;
    }
    
    NLUtility.NOTIFYING = true;
    
    $.ajax({
        url: NG_URL + "notify.php",
        data: {username: NLMobile.getUtente().username, password: NLMobile.getUtente().password},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (!data || !NLMobile.isLogged()) {
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
            //NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
            NLUtility.log(NG_URL + "notify.php irraggiungibile!");
        }
    });
   
    if (NLMobile.isLogged()) {
        setTimeout("NLUtility.notify()", 2000);
    }
}
*/

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
        }
        else if (id == "ngVisiteCount")
        {
            window.plugins.toolBar.update("ngToolBar", "btnVisite", "", "icon_visite.png", count);
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
        if (window.console && msg) console.log(msg);
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

NLUtility.language = function () 
{
	if (NLUtility.isAndroid())
	{
		if (lang = navigator.userAgent.match(/[a-z]{2}-[a-z]{2}/))
		{
			return lang[0];
		}
	}
	
	return navigator.language;
}


﻿if (typeof NLTranslator == "undefined" || !NLTranslator) 
{
    var NLTranslator = {};
}

NLTranslator.translate = function (key) 
{
    var lang = NLUtility.language().substring(0, 2);

    switch (key) {
        case "Offerte":
            return (lang == "it") ? ("Offerte") : ("Offers");
        case "Strutture":
            return (lang == "it") ? ("Strutture") : ("Structures");
        case "Rubriche":
            return (lang == "it") ? ("Rubriche") : ("Insights");
        case "Cerca...":
            return (lang == "it") ? ("Cerca...") : ("Search...");
        case "Offerte Correlate":
            return (lang == "it") ? ("Offerte Correlate") : ("Related offers");
        case "Descrizione":
            return (lang == "it") ? ("Descrizione") : ("Description");
        case "Contattaci":
            return (lang == "it") ? ("Contattaci") : ("Contact us");
        case "Sito Web":
            return (lang == "it") ? ("Sito Web") : ("Web Site");
        case "Scrivici":
            return (lang == "it") ? ("Scrivici") : ("Write us");
        case "Cerca offerte...":
            return (lang == "it") ? ("Cerca offerte...") : ("Search offers...");
        case "Seleziona una categoria...":
            return (lang == "it") ? ("Seleziona una categoria...") : ("Select a category...");
        case "Puoi usare questi bottoni per decidere se cercare per nome o in base alla distanza in km da te.":
            return (lang == "it") ? ("Puoi usare questi bottoni per decidere se cercare per nome o in base alla distanza in km da te.") : ("You can use these buttons to choose whether to search by name or by distance in km from you.");
        case "Condizioni sulla privacy":
            return (lang == "it") ? ("Condizioni sulla privacy") : ("Privacy Policy");
        case "Indietro":
            return (lang == "it") ? ("Indietro") : ("Back");
        case "Richiesta Informazioni":
            return (lang == "it") ? ("Richiesta Informazioni") : ("Request Information");
        case "Nome*:":
            return (lang == "it") ? ("Nome*:") : ("Name*:");
        case "Cognome*:":
            return (lang == "it") ? ("Cognome*:") : ("Surname*:");
        case "Telefono:":
            return (lang == "it") ? ("Telefono:") : ("Phone:");
        case "Messaggio*:":
            return (lang == "it") ? ("Messaggio*:") : ("Message*:");
        case "Accetto l'informativa sulla privacy":
            return (lang == "it") ? ("Accetto l'informativa sulla privacy") : ("I accept the privacy policy");
        case "Leggi le condizioni sulla privacy":
            return (lang == "it") ? ("Leggi le condizioni sulla privacy") : ("Read the privacy policy");
        case "* Campo obbligatorio":
            return (lang == "it") ? ("* Campo obbligatorio") : ("* Mandatory field");
        case "Invia":
            return (lang == "it") ? ("Invia") : ("Send");
        case "Dettagli":
            return (lang == "it") ? ("Dettagli") : ("Details");
        case "Cerca strutture...":
            return (lang == "it") ? ("Cerca strutture...") : ("Search structures...");
        case "Cerca rubriche...":
            return (lang == "it") ? ("Cerca rubriche...") : ("Search insights...");
        case "Devi specificare tutti i campi!":
            return (lang == "it") ? ("Devi specificare tutti i campi!") : ("You must specify all fields!");
        case "Email non valida!":
            return (lang == "it") ? ("Email non valida!") : ("Invalid email!");
        case "Nome non valido!":
            return (lang == "it") ? ("Nome non valido!") : ("Invalid name!");
        case "Cognome non valido!":
            return (lang == "it") ? ("Cognome non valido!") : ("Invalid surname!");
        case "Devi accettare l'informativa sulla privacy!":
            return (lang == "it") ? ("Devi accettare l'informativa sulla privacy!") : ("You must agree to the privacy policy!");
        case "Invio richiesta non riuscito!":
            return (lang == "it") ? ("Invio richiesta non riuscito!") : ("Sending request failed!");
        case "Invio richiesta riuscito":
            return (lang == "it") ? ("Invio richiesta riuscito") : ("Request sent successfully!");
        case "Caricamento fallito!":
            return (lang == "it") ? ("Caricamento fallito!") : ("Loading failed!");
        case "Nessuna offerta trovata":
            return (lang == "it") ? ("Nessuna offerta trovata") : ("No offer found");
        case "Richiesta fallita!":
            return (lang == "it") ? ("Richiesta fallita!") : ("Request failed!");
        case "Nessuna offerta correlata trovata":
            return (lang == "it") ? ("Nessuna offerta correlata trovata.") : ("No related offer found.");
        case "Richiesta informazioni":
            return (lang == "it") ? ("Richiesta informazioni") : ("Information request");
        case "Nessuna notizia trovata!":
            return (lang == "it") ? ("Nessuna notizia trovata!") : ("No news found!");
        case "Richiesta Disponibilità":
            return (lang == "it") ? ("Richiesta Disponibilit&agrave;") : ("Availability Request");
        case "Offerte Struttura":
            return (lang == "it") ? ("Offerte Struttura") : ("Structure offers");
        case "Servizi Struttura":
            return (lang == "it") ? ("Servizi Struttura") : ("Structure services");
        case "Mostra altri...":
            return (lang == "it") ? ("Mostra altri...") : ("More...");
        case "Non è possibile completare la richiesta. Verifica la connessione ad internet!":
            return (lang == "it") ? ("Non è possibile completare la richiesta. Verifica la connessione ad internet!") : ("Cannnot complete the request. Please verify your internet connection!");
        case "Offerte Pubblicate: ":
            return (lang == "it") ? ("Offerte Pubblicate: ") : ("Available offers: ");
        case "Distanza...":
            return (lang == "it") ? ("Distanza...") : ("Distance...");
        case "Struttura":
            return (lang == "it") ? ("Struttura") : ("Structure");
        case "Contatti":
            return (lang == "it") ? ("Contatti") : ("Contacts");
    }

    return key;
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


if (typeof NLMobile == "undefined" || !NLMobile) {
	var NLMobile = {};
}

NLMobile.COOKIE_EXPIRE_DAYS = 50 * 365;
NLMobile.COOKIE_SEARCH_ADVISOR = "ngCookieSearchAdvisor";

NLMobile.ajaxError = function(jqXHR, textStatus, errorThrown) {
	NLUtility.log("AJAX Error: " + textStatus + " " + errorThrown);
	NLUtility.log(jqXHR);
	NLUtility.showError(NLTranslator.translate("Non è possibile completare la richiesta. Verifica la connessione ad internet!"));
}

// CALLED ON APPLICATION START

NLMobile.start = function(event) {
	NLUtility.log("NLMobile.start");
	$("#ngIndexLoading").hide();

	if (!NG_PHONEGAP) {
		setTimeout(function() {
			$.mobile.changePage("home.html", {
				"transition" : "pop"
			})
		}, 200);
	} else if (NLUtility.isIOS()) {
		window.plugins.applicationPreferences.get('apns', function(result) {
			var params = result.split("-");
			NLUtility.log("APNS TYPE = " + params[0]);
			setTimeout(function() {
				$.mobile.changePage("home.html", {
					"transition" : "pop"
				})
			}, 200);

		}, function(error) {
			setTimeout(function() {
				$.mobile.changePage("home.html", {
					"transition" : "pop"
				})
			}, 200);
		});
	} else if (NLUtility.isAndroid()) {
		var type = NLUtility.getUrlVarsFromURL(NLUtility.getPageURL(event))["type"];
		var id = NLUtility.getUrlVarsFromURL(NLUtility.getPageURL(event))["id"];

		NLUtility.log("C2M TYPE = " + type);
		NLUtility.log("C2M ID   = " + id);

		setTimeout(function() {
			$.mobile.changePage("home.html", {
				"transition" : "pop"
			})
		}, 200);
	}

}

NLMobile.toolbar = function(id) {
	NLUtility.log("NLMobile.toolbar: " + id);
	var html = '<a href="#" data-rel="back">Indietro</a>';
	html += '<div class="ng-menu">';
	html += '<a href="home.html" class="ng-icon-home ui-btn-right" data-direction="reverse"></a>';
	html += '</div>';

	$("#" + id + " div[data-role='header']").prepend($(html));
}

NLMobile.header = function(id, transparent, marginTop) {
	NLUtility.log("NLMobile.header: " + id);
	var $header = $("<div/>", {
		"class" : "ng-header"
	});

	if (transparent)
		$header.addClass("ng-bg-transparent");

	if (marginTop)
		$header.css({
			'margin-top' : marginTop
		});
		
		
		
    $link = $('<a href="#">').appendTo($header);
	$("<img/>", {
		"src" : "img/logo.png"
	}).appendTo($link);
	
	$link.click(function(event) {
		// This is just a wrapper for device.platform
		if (NLUtility.isAndroid()) {
		  navigator.app.loadUrl(NG_PEM_URL,{ openExternal:true } );
		} else {
		  window.location.href = NG_PEM_URL;
		}
	});

	$("#" + id + " div[data-role='content']").prepend($header);
}

NLMobile.subheaderOfferta = function(id) {
	NLUtility.log("NLMobile.subheaderOfferta");

	var $header = $("<div/>", {
		"class" : "ng-header"
	});
	$("<img/>", {
		"src" : "img/logo.png"
	}).appendTo($header);

	var $parent = $("#" + id + "");
	$header.appendTo($parent);
	var $divOut = $('<div class="ng-offerta-header-logo">').appendTo($parent);
	var $divIn = $('<div class="ng-offerta-header-logo-img">')
			.appendTo($divOut);
	$('<img class="ngOffertaSubheaderLogo" src="img/empty-logo2.png">')
			.appendTo($divIn);
	$('<p class="ngOffertaSubheaderName">&nbsp;</p>').appendTo($divOut);

}

NLMobile.updateSubheaderOfferta = function(id, immagine, titolo, categoria, header) {
	NLUtility.log("NLMobile.updateSubheaderOfferta");
	$("#" + id).find(".ngOffertaSubheaderLogo").attr("src",
			(immagine) ? (immagine) : ("img/empty-logo2.png"));

	$("#" + id).find(".ngOffertaSubheaderName").html(
			(titolo) ? (titolo) : ("PugliaEtMores"));
	if (header) {
		var headerWidth = 500;
		var headerHeight = 213;
		var screenWidth = NLUtility.screenWidth();

		if (screenWidth < headerWidth) {
			headerHeight = (screenWidth * 213) / 500;
		}

		$.ajax({
			url : NG_URL + API_THUMBNAILER + "?p=" + header + "&w="
					+ Math.floor(screenWidth) + "&h="
					+ Math.floor(headerHeight),
			data : {
				"p" : header,
				"w" : Math.floor(screenWidth),
				"h" : Math.floor(headerHeight)
			},
			type : "POST",
			dataType : "json",
			timeout : NG_TIMEOUT,
			success : function(data) {
				if (data) {

					var $header = $(".ng-header");
					$header.find("img").remove();

					$header.css({
						"background-color" : '#FDF8D8'
					});
					$header.css({
						"background-image" : 'url("' + data.url + '")'
					});
					$header.css({
						"background-position" : 'bottom left'
					});
					$header.css("height", headerHeight - 20);

				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});

	}
}

NLMobile.subheaderRubricaNotizia = function(id) {
	NLUtility.log("NLMobile.subheaderRubricaNotizia");

	var $header = $("<div/>", {
		"class" : "ng-header"
	});

	$("<img/>", {
		"src" : "img/logo.png"
	}).appendTo($header);

	var $parent = $("#" + id + "");
	$header.appendTo($parent);
	var $divOut = $('<div class="ng-rubrica-notizia-header-logo">').appendTo(
			$parent);
	var $divIn = $('<div class="ng-rubrica-notizia-header-logo-img">')
			.appendTo($divOut);
	$('<img class="ngRubricaNotiziaSubheaderLogo" src="img/empty-logo2.png">')
			.appendTo($divIn);
	$('<p class="ngRubricaNotiziaSubheaderName">&nbsp;</p>').appendTo($divOut);
}

NLMobile.updateSubheaderRubricaNotizia = function(id, immagine, nome, header) {
	NLUtility.log("NLMobile.updateSubheaderRubricaNotizia");
	$("#" + id).find(".ngRubricaNotiziaSubheaderLogo").attr("src",
			(immagine) ? (immagine) : ("img/empty-logo2.png"));
	$("#" + id).find(".ngRubricaNotiziaSubheaderName").html(
			(nome) ? (nome) : ("PugliaEtMores"));
	if (header) {
		var headerWidth = 500;
		var headerHeight = 213;
		var screenWidth = NLUtility.screenWidth();

		if (screenWidth < headerWidth) {
			headerHeight = (screenWidth * 213) / 500;
		}

		$.ajax({
			url : NG_URL + API_THUMBNAILER + "?p=" + header + "&w="
					+ Math.floor(screenWidth) + "&h="
					+ Math.floor(headerHeight),
			data : {
				"p" : header,
				"w" : Math.floor(screenWidth),
				"h" : Math.floor(headerHeight)
			},
			type : "POST",
			dataType : "json",
			timeout : NG_TIMEOUT,
			success : function(data) {
				if (data) {

					var $header = $(".ng-header");
					$header.find("img").remove();

					$header.css({
						"background-color" : '#FDF8D8'
					});
					$header.css({
						"background-image" : 'url("' + data.url + '")'
					});
					$header.css({
						"background-position" : 'bottom left'
					});
					$header.css("height", headerHeight - 20);

				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				 NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});

	}
}

NLMobile.subheaderStruttura = function(id) {
	NLUtility.log("NLMobile.subheaderStruttura");

	var $header = $("<div/>", {
		"class" : "ng-header"
	});
	$("<img/>", {
		"src" : "img/logo.png"
	}).appendTo($header);

	var $parent = $("#" + id + "");
	$header.appendTo($parent);
	var $divOut = $('<div class="ng-struttura-header-logo">').appendTo($parent);
	var $divIn = $('<div class="ng-struttura-header-logo-img">').appendTo(
			$divOut);
	$('<img class="ngStrutturaSubheaderLogo" src="img/empty-logo2.png">')
			.appendTo($divIn);
	$('<p class="ngStrutturaSubheaderName">&nbsp;</p>').appendTo($divOut);
}

NLMobile.updateSubheaderStruttura = function(id, immagine, nome, header) {
	NLUtility.log("NLMobile.updateSubheaderStruttura");
	$("#" + id).find(".ngStrutturaSubheaderLogo").attr("src",
			(immagine) ? (immagine) : ("img/empty-logo2.png"));
	$("#" + id).find(".ngStrutturaSubheaderName").html(
			(nome) ? (nome) : ("PugliaEtMores"));

	if (header) {
		var headerWidth = 500;
		var headerHeight = 213;
		var screenWidth = NLUtility.screenWidth();

		if (screenWidth < headerWidth) {
			headerHeight = (screenWidth * 213) / 500;
		}

		$.ajax({
			url : NG_URL + API_THUMBNAILER + "?p=" + header + "&w="
					+ Math.floor(screenWidth) + "&h="
					+ Math.floor(headerHeight),
			data : {
				"p" : header,
				"w" : Math.floor(screenWidth),
				"h" : Math.floor(headerHeight)
			},
			type : "POST",
			dataType : "json",
			timeout : NG_TIMEOUT,
			success : function(data) {
				if (data) {

					var $header = $(".ng-header");
					$header.find("img").remove();

					$header.css({
						"background-color" : '#FDF8D8'
					});
					$header.css({
						"background-image" : 'url("' + data.url + '")'
					});
					$header.css({
						"background-position" : 'bottom left'
					});
					$header.css("height", headerHeight - 20);

				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
			}
		});

	}
}

/*******************************************************************************
 * 
 * 
 * PAGE LISTVIEW HANDLER
 * 
 ******************************************************************************/

NLMobile.addPrimoPiano = function(listview, item) {
	if (!item)
		return;

	var immagine = (item.ThumbImage) ? (item.ThumbImage)
			: ("img/empty-logo.png");
	var titolo = (item.Titolo) ? (item.Titolo) : ("");
	var $listitem = $('<li/>').appendTo($(listview));

	var $link;

	var dettaglio = item.Dettaglio;

	if (dettaglio) {
		if (dettaglio.Struttura) {
			if (dettaglio.Struttura.Id)
				$link = $(
						'<a href="struttura.html?id=' + dettaglio.Struttura.Id
								+ '"/>').appendTo($listitem);
		} else if (dettaglio.Offerta) {
			if (dettaglio.Offerta.Struttura) {
				if (dettaglio.Offerta.Struttura.Id)
					$link = $(
							'<a href="struttura.html?id='
									+ dettaglio.Offerta.Struttura.Id + '"/>')
							.appendTo($listitem);
			} else {
				if (dettaglio.Offerta.Id)
					$link = $(
							'<a href="offerta.html?id=' + dettaglio.Offerta.Id
									+ '"/>').appendTo($listitem);
			}
		} else if (dettaglio.OffertaCategoria) {
			if (dettaglio.OffertaCategoria.Id)
				$link = $(
						'<a href="offerte.html?id='
								+ dettaglio.OffertaCategoria.Id + '"/>')
						.appendTo($listitem);
		}
	}

	$('<img src="' + immagine + '" />').appendTo(
			($link) ? ($link) : ($listitem));
	$('<h3>' + titolo + '</h3>').appendTo(($link) ? ($link) : ($listitem));
	if (item.StelleAsHtml)
		$(item.StelleAsHtml).appendTo(($link) ? ($link) : ($listitem));
	if (item.Extra)
		$('<p>' + item.Extra + '</p>')
				.appendTo(($link) ? ($link) : ($listitem));
	if (dettaglio.OffertaCategoria)
		if (dettaglio.OffertaCategoria.Id)
			$('<p>' + NLTranslator.translate("Offerte Pubblicate: ") + dettaglio.OffertaCategoria.NumeroOfferte + '</p>').appendTo(($link) ? ($link) : ($listitem));

}

NLMobile.addOfferta = function(listview, item) {
	var immagine = (item.ThumbImage) ? (item.ThumbImage)
			: ("img/empty-logo.png");
	var titolo = (item.Titolo) ? (item.Titolo) : ("");

	var $listitem = $('<li/>').appendTo($(listview));
	var $link = $('<a href="offerta.html?id=' + item.Id + '"/>').appendTo(
			$listitem);
	$('<img src="' + immagine + '" />').appendTo($link);
	$('<h3>' + titolo + '</h3>').appendTo($link);
}

NLMobile.addOffertaCorrelata = function(listview, item) {
	var immagine = (item.ThumbImage) ? (item.ThumbImage) : ("img/empty-logo.png");
	var titolo = (item.Titolo) ? (item.Titolo) : ("");

	var $listitem = $('<li/>').appendTo($(listview));

	var $link = $('<a href=offerta-correlata.html?id=' + item.Id +' />').appendTo($listitem);

	$('<img src="' + immagine + '" />').appendTo($link);
	$('<p>' + titolo + '</p>').appendTo($link);
}

NLMobile.addRubrica = function(listview, item) {
	var immagine = (item.ThumbImageFrontEnd) ? (item.ThumbImageFrontEnd)
			: ("img/empty-logo.png");
	var titolo = (item.Titolo) ? (item.Titolo) : ("");
	var datacreazione = (item.DataCreazione) ? (item.DataCreazione) : ("");

	var $listitem = $('<li/>').appendTo($(listview));
	var $link = $('<a href="rubrica-news.html?id=' + item.Id + '"/>').appendTo(
			$listitem);
	$('<img src="' + immagine + '" />').appendTo($link);
	$('<h3>' + titolo + '</h3>').appendTo($link);
	$('<p>' + datacreazione + '</p>').appendTo($link);
}

NLMobile.addStrutture = function(listview, item) {
	var immagine = (item.ThumbImageFrontEnd1) ? (item.ThumbImageFrontEnd1)
			: ("img/empty-logo.png");
	var nome = (item.Nome) ? (item.Nome) : ("");
	var zona = (item.Zona) ? (item.Zona) : ("");
	var indirizzoCompleto = (item.IndirizzoCompleto) ? (item.IndirizzoCompleto)
			: ("");

	var $listitem = $('<li/>').appendTo($(listview));
	var $link = $('<a href="struttura.html?id=' + item.Id + '"/>').appendTo(
			$listitem);
	$('<img src="' + immagine + '" />').appendTo($link);
	$('<h3>' + nome + '</h3>').appendTo($link);

	var $content = ""
	if (item.IndirizzoCompleto && item.Zona)
		$content = zona + ' - ' + indirizzoCompleto;
	else if (item.IndirizzoCompleto)
		$content = indirizzoCompleto;
	else if (item.Zona)
		$content = zona;

	if (item.StelleAsHtml)
		$(item.StelleAsHtml).appendTo(($link) ? ($link) : ($listitem));
	if (item.Extra)
		$('<b>' + item.Extra + '</b>')
				.appendTo(($link) ? ($link) : ($listitem));

	$('<p>' + $content + '</p>').appendTo($link);
}

/*******************************************************************************
 * 
 * 
 * SEARCH METHOD
 * 
 ******************************************************************************/

NLMobile.searchBox = function(parent, url, addFunction, element, showDate,
		showGeo, params, placeholder, selectName, selectEmptyText,
		selectDataSource, selectFieldValue, selectFieldText) {
	paramCount = 0;
	for ( var key in params) {
		var value = params[key];
		if (value) {
		    url += (paramCount == 0 && url.indexOf('?') < 0) ? ('?') : ('&');
			url += key + '=' + NLUtility.urlencode(value);
			paramCount++;
		}
	}

	submitParams = "this,";

	if (selectName)
		submitParams += "'" + selectName + "',";
	else
		submitParams += "null,";

	if (addFunction)
		submitParams += "'" + addFunction + "',";
	else
		submitParams += "null,";

	submitParams += "0";

	var onsubmit = "return(NLUtility.searchEx(" + submitParams + "));";
	var $form = $(
			'<form data-ajax="false" action="" class="ng-search-ex" id="ngSearchExForm" onsubmit="'
					+ onsubmit + '"/>').appendTo($(parent));
	$('<input type="hidden" name="url" value="' + url + '"/>').appendTo($form);
	$('<input type="hidden" name="element" value="' + element + '"/>')
			.appendTo($form);

	NLUtility.log("Advisor: " + NLMobile.getSearchAdvisor());
	if (showGeo && !NLMobile.getSearchAdvisor()) {
		$advisor = $(
				'<div class="ng-advisor-edge"></div><div class="ng-advisor">' + NLTranslator.translate("Puoi usare questi bottoni per decidere se cercare per nome o in base alla distanza in km da te.") + '</div>')
				.appendTo($form);
		$advisor.click(function() {
			NLMobile.setSearchAdvisor(true);
			$advisor.fadeOut()
		});
	}

	var $div;
	var $select;

	if (showGeo) {
		$div = $('<div class="ng-search-ex-type"/>').appendTo($form);
		var $fieldcontain = $('<div data-role="fieldcontain"/>').appendTo($div);
		var $fieldset = $(
				'<fieldset data-role="controlgroup" data-type="horizontal"/>')
				.appendTo($fieldcontain);
		var onclickText = "javascript:$('.ng-search-ex-detail-term').show();$('.ng-search-ex-detail .ui-select').hide();$(this.form).submit();";
		$(
				'<input type="radio" name="geosearch" id="geosearch-off" value="0" checked="checked" onclick="'
						+ onclickText + '" />').appendTo($fieldset);
		$(
				'<label class="ui-shadow-inset" for="geosearch-off"><span class="ng-search-ex-type-text"></span></label>')
				.appendTo($fieldset);
		var onclickGeo = "javascript:$('.ng-search-ex-detail-term').hide();$('.ng-search-ex-detail .ui-select').show();$(this.form).submit();";
		$(
				'<input type="radio" name="geosearch" id="geosearch-on" value="1" onclick="'
						+ onclickGeo + '" />').appendTo($fieldset);
		$(
				'<label class="ui-shadow-inset" for="geosearch-on"><span class="ng-search-ex-type-geo"></span></label>')
				.appendTo($fieldset);
	}

	if (showDate) {
		$div = $('<div class="ng-search-ex-date"/>').appendTo($form); // ui-input-search
																		// ui-shadow-inset
																		// ui-btn-corner-all
																		// ui-btn-shadow
																		// ui-body-c
		var closeCallback = "NLSearchDateEx";
		NLMobile.dateBox($div, "date", null, "Data...", closeCallback);
	}

	var css = "";
	if (showDate)
		css += " ng-search-ex-detail-date";
	if (showGeo)
		css += " ng-search-ex-detail-geo";

	$div = $('<div class="ng-search-ex-detail' + css + '"/>').appendTo($form);
	var onkeyup = 'javascript:if(event && event.keyCode == 13){$(this.form).submit();}';
	$(
			'<input type="text" name="term" class="ng-search-ex-detail-term" placeholder="'
					+ placeholder + '" onkeyup="' + onkeyup + '"/>').appendTo(
			$div);
	var onchange = "javascript:$(this).trigger('updatelayout');$(this.form).submit();";
	var onblur = "$(this).trigger('updatelayout');";
	$select = $(
			'<select name="distance" class="ng-search-ex-detail-geo" onchange="'
					+ onchange + '" onblur="' + onblur + '"/>').appendTo($div);
	$('<option value="" selected="selected">' + NLTranslator.translate("Distanza...") + '</option>').appendTo(
			$select);
	$('<option value="5">5 km</option>').appendTo($select);
	$('<option value="10">10 km</option>').appendTo($select);
	$('<option value="20">20 km</option>').appendTo($select);
	$('<option value="30">30 km</option>').appendTo($select);
	$('<option value="50">50 km</option>').appendTo($select);
	$('<option value="75">75 km</option>').appendTo($select);
	$('<option value="100">100 km</option>').appendTo($select);

	if (selectName) {
		$div = $('<div class="ng-search-ex-select"/>').appendTo($form);
		$select = $(
				'<select name="' + selectName + '" onchange="' + onchange
						+ '" onblur="' + onblur + '">').appendTo($div);
		if (selectEmptyText) {
			$('<option value="">' + selectEmptyText + '</option>').appendTo(
					$select);
		}
		if (selectDataSource) {
			for ( var i = 0; i < selectDataSource.length; i++) {
				var item = selectDataSource[i];
				var $option = $(
						'<option value="' + item.selectFieldValue + '"/>')
						.appendTo($select);
				if (item[selectFieldValue] == NLUtility.getUrlVar[selectName]) {
					$option.attr('selected', "true");
				}
				$option.text(item[selectFieldText]);
			}
		}
	}
}

NLMobile.getSearchAdvisor = function() {
	var c = NLUtility.getCookie(NLMobile.COOKIE_SEARCH_ADVISOR);
	if (c)
		return JSON.parse(c);
	else
		return null;
}

NLMobile.setSearchAdvisor = function(shown) {
	NLUtility.setCookie(NLMobile.COOKIE_SEARCH_ADVISOR, JSON.stringify(shown),
			NLMobile.COOKIE_EXPIRE_DAYS);
}

NLMobile.more = function (url, startindex, count, element, params, addFunction) {
    if (count == NG_PAGESIZE) {
        if (url.indexOf('?') < 0)
            url += '?';
        else
            url += "&";
        url += 'pagesize=' + NG_PAGESIZE;

        for (key in params) {
            var value = params[key];
            if (value) {
                url += '&' + key + '=' + NLUtility.urlencode(value);
            }
        }

        NLMobile.addMore(url, startindex + NG_PAGESIZE, element, addFunction);
    }
}

NLMobile.addMore = function(url, startindex, element, addFunction) {
	var $listitem = $('<li data-icon="false" class="ng-more"/>').appendTo(
			$(element));
	var $link = $(
			"<a href=\"#\" onclick=\"NLMobile._more('" + url + "',"
					+ startindex + ",'" + element + "','" + addFunction
					+ "')\">").appendTo($listitem);
	$('<h3>' + NLTranslator.translate("Mostra altri...") + '<img src="img/loading.gif" class="ng-more-loading" /></h3>').appendTo($link);
}

NLMobile._more = function(url, startindex, listview, addFunction) {
	NLUtility.log("NLMobile._more");

	var $more = $(listview).children().last();
	$more.addClass("ng-more-disabled");

	var $link = $more.find("a");
	var onclick = $link.attr('onclick');
	$link.removeAttr('onclick');

	var $loading = $more.find(".ng-more-loading");
	$loading.show();

	NLUtility.log(url + "&startindex=" + startindex);

	$.ajax({
		url : url + "&startindex=" + startindex,
		data : {},
		type : "POST",
		dataType : "json",
		timeout : NG_TIMEOUT,
		success : function(data) {
			$more.remove();
			if (data) {
				for ( var i = 0; i < data.length; i++) {
					eval(addFunction + "('" + listview + "',"
							+ JSON.stringify(data[i]) + ")");
				}
				if (data.length == NG_PAGESIZE) {
					NLMobile.addMore(url, startindex + NG_PAGESIZE, listview,
							addFunction);
				}
				$(listview).listview('refresh');
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$loading.hide();
			$more.removeClass("ng-more-disabled");
			$link.attr('onclick', onclick);
			NLUtility.showError("Errore in fase di paginazione");
		}
	});
}

NLMobile.dateBox = function($parent, name, value, placeholder, closeCallback,
		closeCallbackArgs) {
	var args = '[';
	if (closeCallbackArgs) {
		for ( var i = 0; i < closeCallbackArgs.length; i++) {
			args += '"' + closeCallbackArgs[i] + '"';
			if (i < closeCallbackArgs.length - 1)
				args += ',';
		}
	}
	args += ']';

	if (!value)
		value = "";
	if (!placeholder)
		placeholder = "";
	if (!closeCallback)
		closeCallback = "";
	if (!closeCallbackArgs)
		closeCallbackArgs = "";

	var input = '<input name="' + name + '" id="' + name
			+ '" type="date" readonly="readonly" value="' + value + '" ';
	input += 'placeholder="' + placeholder + '" ';
	input += 'onchange="' + onchange + '" ';
	input += 'data-role="datebox" ';
	input += 'data-options=\'{"defaultDate":"'
			+ value
			+ '","closeCallback":"'
			+ closeCallback
			+ '","closeCallbackArgs":'
			+ args
			+ ',"mode":"flipbox","noButtonFocusMode":true,"useClearButton":true,"centerWindow":true}\'>';
	$(input).appendTo($parent);
}

NLMobile.photoswipe = function(id) {
	NLUtility.log("NLMobile.photoswipe");
	NLUtility.log("ID: " + id);
	if ($("#" + id).children().length > 0) {
		var options = {
			captionAndToolbarAutoHideDelay : 0,
			captionAndToolbarFlipPosition : true,
			getImageCaption : function(el) {
				var $img = $(el).find("img");
				var id = $img.attr("data-id");
				// var idCitta = $img.attr('data-citta');
				var url = $img.attr('data-url').replace("'", "\'");
				var preview = $img.attr('data-preview').replace("'", "\'");

				/*
				 * var fb = '<a href="#"
				 * onclick="javascript:NLFacebook.feedFoto('+id+',\''+url+'\',\''+preview+'\','+idCitta+');"><img
				 * src="img/fb-condividi.png"></a>';
				 * 
				 * var tw = '<a href="#"
				 * onclick="javascript:NLTwitter.tweetFoto('+id+','+idCitta+');"><img
				 * src="img/tweet.png"></a>';
				 * 
				 * var save = '<a href="#"
				 * onclick="javascript:NLMobile.saveToPhotoAlbum(\''+url+'\');"><img
				 * src="img/save.png"></a>';
				 * 
				 * return $(fb+'&nbsp;'+tw+'&nbsp;'+save);
				 */
				return;
			}
		}

		// NLUtility.log("Options:");
		// NLUtility.log(options);

		var instance = $("#" + id + " a").photoSwipe(options);
		NLUtility.log("Instance: " + instance);

		instance.addEventHandler(Code.PhotoSwipe.EventTypes.onBeforeShow,
				function(e) {
					NLUtility.log('onBeforeShow');
					if (NLUtility.isAndroid()) {
						// Workaround per problema su Android
						NLUtility.log('silentScroll');
						$.mobile.silentScroll(0);
					}
					if (NG_PHONEGAP) {
						window.plugins.toolBar.hide("ngToolBar");
					}
				});
		instance.addEventHandler(Code.PhotoSwipe.EventTypes.onShow,
				function(e) {
					NLUtility.log('onShow');
					// Workaround per problema su Android
					if (NLUtility.isAndroid()) {
						NLUtility.log("background to black");
						$(".ui-page").css("background-color", "#000000");
					}
				});

		instance.addEventHandler(Code.PhotoSwipe.EventTypes.onHide,
				function(e) {
					NLUtility.log('onHide');
					// Workaround per problema su Android
					if (NLUtility.isAndroid()) {
						NLUtility.log("background to gray");
						$(".ui-page").css("background-color", "#F0F0F0");
					}
					if (NG_PHONEGAP) {
						window.plugins.toolBar.show("ngToolBar", true);
					}
				});

	}
}

NLMobile.addListItems = function(listview, data, servicePage, addFunction,
		emptyText, params, title) {
	var $listview = $(listview);

	if (title) {
		$('<li data-role="list-divider">' + title + '</li>')
				.appendTo($listview);
	}

	if (data.length == 0) {
		$('<li>' + emptyText + '</li>').appendTo($listview);
	} else {
		for ( var i = 0; i < data.length; i++) {
			eval(addFunction + "('" + listview + "'," + JSON.stringify(data[i])
					+ ")");
		}

		if (!params)
			params = null;

		NLMobile.more(NG_URL + servicePage, 0, data.length, listview, params,
				addFunction);
	}

	$listview.listview('refresh');
}


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
                "Non perderti l'offerta " + data.nome + " di " + data.nomevetrina + " su NLMobile.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                "Non perderti le offerte di " + data.nome + " su NLMobile.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                "Visita il locale " + data.nome + " su NLMobile.it");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                "Non perderti l'offerta " + data.nome + " di " + data.nomevetrina + " su NLMobile.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                "Non perderti le offerte di " + data.nome + " su NLMobile.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                "Visita il locale " + data.nome + " su NLMobile.it", 
                data.nome,
                data.descrizione);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
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

/**********************************************************************
*
*               Device Event Handler
*
*
***********************************************************************/

$(document).bind("pagebeforechange", function (event, data) {
    NLUtility.log("pagebeforechange global");
    NLUtility.pageBeforeChange(event, data);

    NLUtility.log("translations");
    $("[data-translate]").each(function (index) {
    	NLUtility.log("translate FROM: " + $(this).text() + " TO: " + NLTranslator.translate($(this).attr("data-translate")));
        $(this).text(NLTranslator.translate($(this).attr("data-translate")));
    });
});

$(document).bind("pageinit", function (event) {
    NLUtility.log("pageinit global");
    NLUtility.log("event.target.id: " + event.target.id);
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

$(document).bind("pagebeforeshow", function (event) {
    NLUtility.log("pagebeforeshow: " + event.target.id);
    //NLMobile.updateAuthTags();
    if (NG_PHONEGAP)
    {
        if (!$(event.target).hasClass("ui-dialog")) 
        {
            NLUtility.log("Remove HTML toolbar");
            NLUtility.removeHeader();
        }
        
        if (event.target.id == "ngHome" || event.target.id == "ngIndex"
            || $(event.target).hasClass("ui-dialog"))
        {
            NLUtility.log("Hide native toolbar");
            window.plugins.toolBar.hide("ngToolBar");
            if (NLUtility.isIOS())
            {
                NLUtility.removeSpacer(event.target.id);
            }
            
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

/**********************************************************************
*
*               Document Ready
*
*
***********************************************************************/

$(document).ready(function () {
    NLUtility.log("document ready");
	NLUtility.log("LANGUAGE: " + NLUtility.language());
    //NLUtility.notify();

    document.addEventListener('deviceready',
        function () {
            NLUtility.log("deviceready");
            NG_PHONEGAP = true;

			NLUtility.log("LANGUAGE: " + NLUtility.language());

			/*
            if (NLUtility.isIOS()) {
                NG_DEVICE_ID = $.md5(device.uuid);
                NLUtility.log("NG_DEVICE_ID = " + NG_DEVICE_ID);
            }
            else if (NLUtility.isAndroid()) {
                window.plugins.deviceId.getId(
                    function (devId) {
                        NLUtility.log("deviceId: " + devId);
                        NG_DEVICE_ID = devId;
                        NLUtility.log("NG_DEVICE_ID = " + NG_DEVICE_ID);
                    },
                    function (e) {
                        NLUtility.log("deviceId Error: " + e);
                        NG_DEVICE_ID = null;
                    }
                );
            }

            var cb;
            if (NLUtility.isIOS()) {
                cb = ChildBrowser.install();
                //NG_TOOLBAR_HEIGHT = 45;
            }
            else if (NLUtility.isAndroid()) {
                cb = ChildBrowser;
                //NG_TOOLBAR_HEIGHT = 45;
            }

            if (cb != null) {
                NLUtility.log("ChildBrowser installed");
                //cb.onLocationChange = function(loc) { NLUtility.onLocationChanged(loc); };
                //cb.onClose = function() { NLUtility.onCloseBrowser() };
                cb.onOpenExternal = function () { NLUtility.log("Open External"); };
                //window.plugins.childBrowser.showWebPage("http://google.com");

                //cb.logout();
                //NLUtility.log("Cookies deleted");
            }
            */

            window.plugins.toolBar.create(
                "ngToolBar", true,
                function (e) {
                    NLUtility.log("ngToolBar: " + e);

                    window.plugins.toolBar.addLeft(
                        "ngToolBar", "btnBack", "", "icon_indietro.png", 0, function () {
                            //NLUtility.log("btnBack"); 
                            NLUtility.goBack();
                        },
                        function (e) { NLUtility.log("btnBack: " + e); },
                        function (e) { NLUtility.log("btnBack Error: " + e); }
                    );

                    window.plugins.toolBar.addCenter(
                            "ngToolBar", "logo", "", "logo.png", 0, function () {
                                if (NLUtility.isAndroid()) {
                                    navigator.app.loadUrl(NG_PEM_URL, { openExternal: true });
                                } else {
                                    window.location.href = NG_PEM_URL;
                                }
                            }
                    );

                    window.plugins.toolBar.addRight(
                        "ngToolBar", "btnHome", "", "icon_home.png", 0, function () { $.mobile.changePage("home.html", { "reverse": true }) },
                        function (e) { NLUtility.log("btnHome: " + e); },
                        function (e) { NLUtility.log("btnHome Error: " + e); }
                    );
                },
                function (e) { NLUtility.log("ToolBar Error: " + e); }
            );

            document.addEventListener("backbutton", function () {
                NLUtility.log("backbutton");
                if (NLUtility.isAndroid() && $.mobile.activePage) {
                    if ($.mobile.activePage.attr("id") == "ngHome") {
                        navigator.app.exitApp();
                        return;
                    }
                }
                NLUtility.goBack();
            }, false);
        },
        false
    );
});


/**********************************************************************
*
*               document Delegate
*
*
***********************************************************************/

$(document).delegate("#ngRichiestaInfo", "pageinit", function(event) {
    NLUtility.log("ngrichiestaInfo pageinit");
    
    var type = NLUtility.getUrlVar("type", NLUtility.getPageURL(event));
    var id = NLUtility.getUrlVar("id", NLUtility.getPageURL(event));
    
    if (type && type =="strut") {
        $('#richiesta-info-title').html("Richiesta Disponibilit&agrave;");
    }
    
    $("#ngRequireInfoForm").submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        
        var name = $.trim($form.find('input[name="name"]').val());
        var surname = $.trim($form.find('input[name="surname"]').val());
        var phone = $.trim($form.find('input[name="phone"]').val());
        var email = $.trim($form.find('input[name="email"]').val());
        var message = $form.find('textarea[name="message"]').val();
        var privacy = $form.find('input[name="privacy"]').attr('checked');
  

        if (name == null || name.length == 0
            || surname == null || surname.length == 0
            || email == null || email.length == 0
            || message == null || message.length == 0)
        {
            NLUtility.showError(NLTranslator.translate("Devi specificare tutti i campi!"));
            return;
        }

        if (!NLUtility.checkEmail(email))
        {
            NLUtility.showError(NLTranslator.translate("Email non valida!"));
            return;
        }
        
        if (!NLUtility.checkAlpha(name))
        {
            NLUtility.showError(NLTranslator.translate("Nome non valido!"));
            return;
        }
        
        if (!NLUtility.checkAlpha(surname))
        {
            NLUtility.showError(NLTranslator.translate("Cognome non valido!"));
            return;
        }

        if (!privacy)
        {
            NLUtility.showError(NLTranslator.translate("Devi accettare l'informativa sulla privacy!"));
            return;
        }
        
        var options = { 
            name: name, 
            surname: surname, 
            email: email, 
            phone: phone, 
            message: message,
            language: NLUtility.language()
        };
               
        NLUtility.showLoading();
        
        $.ajax({
            url: NG_URL + API_RICHISTA_INFO + "?type=" + type + "&id=" + id,
            data: options,
            type: "POST",
            dataType: "json",
            timeout: NG_TIMEOUT,
            success: function(data) {
                NLUtility.hideLoading();
                if (!data || !data.Result)
                {
                    NLUtility.showError(NLTranslator.translate("Invio richiesta non riuscito!"));
                }  
                else if (data.Result == "")
                {
                    NLUtility.showError(NLTranslator.translate("Invio richiesta non riuscito!"));
                }
                else if (data.Result == "ok") 
                {
                    NLUtility.showMessage(NLTranslator.translate("Invio richiesta riuscito")); 
                    $form.find('input[name="name"]').val("");
                    $form.find('input[name="surname"]').val("");
                    $form.find('input[name="phone"]').val("");
                    $form.find('input[name="email"]').val("");
                    $form.find('textarea[name="message"]').val("");
                    $form.find('input[name="privacy"]').attr('checked',false).checkboxradio("refresh");
                }
                

            },
            error: function(jqXHR, textStatus, errorThrown) {
                NightGuide.ajaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
});


$(document).delegate("#ngIndex", "pageshow", function(event) {
    NLUtility.log("ngIndex pageshow");
    $("#ngIndexLoading").show();
    if (!NG_PHONEGAP && (NLUtility.isIOS() || NLUtility.isAndroid())) 
    {
        NLUtility.log("Delayed start");
        setTimeout(function(){NLMobile.start(event)},1000);
    }
    else
    {
        NLMobile.start(event);
    }
});

$(document).delegate("#ngHome", "pageinit", function (event) {
    NLUtility.log("ngHome pageinit");
    //NG_STARTED = true;
    if (!NG_PHONEGAP) {
        $(".ng-header").css({ 'marginTop': '38px' });
    }
    $(".ng-home-block").each(function (index) {
        $(this).click(function (e) {
            $(this).addClass("ng-home-block-selected");
        });
    });
});

$(document).delegate("#ngHome", "pageshow", function (event) {
    NLUtility.log("ngHome pageshow");
    NLUtility.clearDomCache();
    NLUtility.hideLoading();
    NLUtility.showLoading();

    $.ajax({
        url: NG_URL + API_HOME,
        data: { "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function (data) {
            if (data) {
                NLUtility.hideLoading();
                var container = $("#ng-home");
                for (var i in data) {
                    var primo_piano = data[i].PrimoPianoFrontEnd;
                    if (primo_piano && primo_piano.length > 0) {
                        $listview = $("<ul>",
                                        { "data-role": "listview",
                                            "data-inset": "true",
                                            "class": "ng-primo-piano-" + data[i].Id
                                        }
                                      );
                        $listview.appendTo(container);
                        $listview.listview();
                        if (data[i].Titolo) {
                            $('<li data-role="list-divider">' + data[i].Titolo + '</li>').appendTo($listview);
                        }
                        for (var j in primo_piano) {
                            NLMobile.addPrimoPiano($listview, primo_piano[j]);
                        }
                        $listview.listview('refresh');
                    }
                }

            }
            else {
                NLUtility.showError(NLTranslate.translate("Caricamento fallito!"));
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    });

    var container = $("#ng-home-primo-piano-info");
    $listview = $("<ul>",
						{ "data-role": "listview",
						    "data-inset": "true",
						    "class": "ng-primo-piano-info"
						}
					  );
    $listview.appendTo(container);
    $listview.listview();

    $('<li data-role="list-divider">' + NLTranslator.translate("Contatti") + '</li>').appendTo($listview);

    $('<li><a href="tel:' + NG_PEM_PHONE + '"><img src="img/icon-phone.png" class="ui-li-icon"><p>' + NLTranslator.translate("Contattaci") + '</p></a></li>'
	  ).appendTo($listview);

    $li_web_site = $('<li>').appendTo($listview);
    $link = $('<a href="#">').appendTo($li_web_site);
    $label = $('<img src="img/icon-web.png" class="ui-li-icon"><p>' + NLTranslator.translate("Sito Web") + '</p>').appendTo($link);
    $link.click(function (event) {
        // This is just a wrapper for device.platform
        if (NLUtility.isAndroid()) {
            navigator.app.loadUrl(NG_PEM_URL, { openExternal: true });
        } else {
            window.location.href = NG_PEM_URL;
        }
    });


    $('<li><a href="' + NG_PEM_MAIL + '"><img src="img/icon-mail.png" class="ui-li-icon"><p>' + NLTranslator.translate("Scrivici") + '</p></a></li>'
	  ).appendTo($listview);

    $li_web_site_credits = $('<li>').appendTo($listview);
    $link_credits = $('<a href="#">').appendTo($li_web_site_credits);

    $label = $('<img src="img/nealogic-32.png" id="credits-nealogic-icon" class="ui-li-icon"><p>Developed by</p><img style="margin-left:3px" src="img/nealogic.png" class="ui-li-icon" id="credits-nealogic">').appendTo($link_credits);
    $link_credits.click(function (event) {
        // This is just a wrapper for device.platform
        if (NLUtility.isAndroid()) {
            navigator.app.loadUrl(NG_NEALOGIC_URL, { openExternal: true });
        } else {
            window.location.href = NG_NEALOGIC_URL;
        }
    });
    $listview.listview('refresh');

});



$(document).delegate("#ngOfferte", "pageinit", function(event) {
    NLUtility.log("ngOfferte pageinit");   
    NLUtility.showLoading();
  
    var idCategoria = NLUtility.getUrlVar("id", NLUtility.getPageURL(event));
    
    NLUtility.log(idCategoria);
    $.ajax({
        url: NG_URL + API_OFFERTE + "?startindex=" + 0 + "&pagesize=" + NG_PAGESIZE + "&idCategoria=" + idCategoria + "&language=" + NLUtility.language(),
        data: { "startindex": 0, "pagesize": NG_PAGESIZE, "id": idCategoria },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NLMobile.addListItems(
                    ".ng-offerte", 
                    data,
                    API_OFFERTE + "?language=" + NLUtility.language(), 
                    API_OFFERTE_HANDLER, 
                    NLTranslator.translate("Nessuna offerta trovata"), 
                    null
                );
            }
            else {
                NLUtility.showError("Caricamento fallito!");
            }
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + API_OFFERTE_CATEGORY,
                data: { "language": NLUtility.language() },
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        var $select = $("#ngOfferte").find('select[name="idCategoria"]');
                        for(var key in data)
                        {
                            $option = $('<option>', {"value": data[key].Id, "text": data[key].Titolo}).appendTo($select);
                        }
                        $select.selectmenu('refresh');
                    }
                    else {
                        NLUtility.showError(NLTranslator.translate("Richiesta fallita!"));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});


$(document).delegate("#ngOffertaCorrelata", "pageinit", function(event) {
    NLUtility.log("ngOffertaCorrelata pageinit");   
    NLUtility.showLoading();
    var id = NLUtility.getUrlVar("id", NLUtility.getPageURL(event));
    
    $('#ngOffertaImage').hide();
        
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_OFFERTA + "?id=" + id,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
            
                NLUtility.hideLoading();
                
                var header;
                if(data.Struttura)
                    header = (data.Struttura.ImmagineFrontEndWithPath1) ? (data.Struttura.ImmagineFrontEndWithPath1) : (null);
                    
                var titolo = (data.Titolo) ? (data.Titolo) : ("");
                    
                NLMobile.updateSubheaderOfferta(
                    "ngOffertaCorrelata", 
                    data.ThumbImage, 
                    titolo,
                    (data.Categoria && data.Categoria.Titolo) ? (data.Categoria.Titolo) : (""),
                    header
                );
  
                //$('#ngOffertaTitle').text(titolo);
                
                if (data.Struttura) {
                    $listview = $('#ngOffertaStruttura');
                    $('<li data-role="list-divider">' + NLTranslator.translate("Struttura") + '</li>').appendTo($listview);
                    NLMobile.addStrutture($listview, data.Struttura);
                    $listview.listview('refresh');
                }
            }
            else {
                NLUtility.showError("Caricamento fallito!");
            }
            
            NLUtility.showLoading();
            
            $.ajax({
                url: NG_URL + API_OFFERTA_CORRELATA +"?id=" + id +"&startindex=" + 0 +"&pagesize=" + NG_PAGESIZE + "&language=" + NLUtility.language(),
                data: { "id": id, "startindex": 0, "pagesize": NG_PAGESIZE },
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        NLMobile.addListItems(
                            "#ngOfferteCorrelate", 
                            data,
                            API_OFFERTA_CORRELATA + "?language=" + NLUtility.language(), 
                            API_OFFERTE_HANDLER, 
                            NLTranslator.translate("Nessuna offerta correlata trovata"), 
                            null
                        );
                    }
                    else {
                        NLUtility.showError(NLTranslator.translate("Richiesta fallita!"));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
			
        },
            error: function(jqXHR, textStatus, errorThrown) {
                NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
    
});


$(document).delegate("#ngOfferta", "pageinit", function(event) {
    NLUtility.log("ngOfferta pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
   
    $('#ngOffertaImage').hide();
        
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_OFFERTA + "?id=" + id,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                
                var header;
                if(data.Struttura)
                    header = (data.Struttura.ImmagineFrontEndWithPath1) ? (data.Struttura.ImmagineFrontEndWithPath1) : (null);
                   
                var titolo = (data.Titolo) ? (data.Titolo) : ("");
                
           
                NLMobile.updateSubheaderOfferta("ngOfferta", data.ThumbImage,
                		titolo, 
                		(data.Categoria && data.Categoria.Titolo) ? (data.Categoria.Titolo) : (""), 
                		header);
  
                
                
                var $listview = $('#ngOffertaTitle');
                var $link;
                //$('<li data-role="list-divider"><h3>' + titolo + '</h3></li>').appendTo($listview);
                $info = $('<li>').appendTo($listview)
                $link = $('<a href="richiesta-info.html?type=off&id='+id+'">').appendTo($info);
                $('<img src="img/icon-descrizione.png" class="ui-li-icon"/>').appendTo($link);
                $('<p>' + NLTranslator.translate("Richiesta Informazioni") + '</p>').appendTo($link);
                /*
                if (data.Struttura.Phone && data.Struttura.Phone.length > 0) {
                    $('<li><a href="tel:'
                        + data.Struttura.Phone[0].Number
                        + '"><img src="img/icon-phone.png" class="ui-li-icon"><p>Contattaci</p></a></li>'
                      ).appendTo($listview);
                }
           
                if (!data.Struttura.Codificata) {
                    if (data.Struttura.SitoWeb && data.Struttura.SitoWeb.length > 0) {
                        $('<li><a href="'+data.Struttura.SitoWeb
                          +'" target="_blank"><img src="img/icon-web.png" class="ui-li-icon"><p>Sito Web</p></a></li>'
                          ).appendTo($listview);
                    }
                    if (data.Struttura.SitoWeb2 && data.Struttura.SitoWeb2.length > 0) {
                        $('<li><a href="'+data.Struttura.SitoWeb2
                          +'" target="_blank"><img src="img/icon-web.png" class="ui-li-icon"><p>Sito Web</p></a></li>'
                          ).appendTo($listview);
                    }
                    if (data.Struttura.Email) {
                        $('<li><a href="mailto:'+data.Struttura.Email
                          +'"><img src="img/icon-mail.png" class="ui-li-icon"><p>Scrivici</p></a></li>'
                          ).appendTo($listview);
                    }
                }
				*/
           
                $listview.listview('refresh');
           
                if (data.Struttura) {
                    $listview = $('#ngOffertaStruttura');
                    $('<li data-role="list-divider">' + NLTranslator.translate("Struttura") + '</li>').appendTo($listview);
                    NLMobile.addStrutture($listview, data.Struttura);
                    $listview.listview('refresh');
                }
                
                var $listview = $("#ngOffertaInfoDati");
                
                if (data.Descrizione) {
                    $('#ngOffertaInfoDesc').html(data.Descrizione);
                }  
                
                $listview.listview('refresh');
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
            
            //NLUtility.showLoading();
            $.ajax({
                url: NG_URL + API_COUNT_OFFERTA_CORRELATA + "?id=" + id,
                data: { "id": id, "language": NLUtility.language() },
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        var $listview = $('#ngOffertaCorrelata');
                        if (data.CountOffertaCorrelata) {
                        	var $listitem = $('<li/>').appendTo($listview);
                            var $link = $('<a href="offerta-correlata.html?id='+id+'"/>').appendTo($listitem);
                            $('<h3>' + NLTranslator.translate("Offerte Correlate") + ' : '+ data.CountOffertaCorrelata +'</h3>').appendTo($link);
                        } else {
                            $('<li>' + NLTranslator.translate("Nessuna offerta correlata trovata") + '</li>').appendTo($listview);
                        }
                        $listview.listview('refresh');
                    }
                    else {
                        NLUtility.showError(NLTranslator.translate("Richiesta fallita!"));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });  
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngRubrica", "pageinit", function(event) {
    NLUtility.log("ngRubrica pageinit");   
    NLUtility.showLoading();
  
    $.ajax({
        url: NG_URL + API_RUBRICA + "?startindex=" + 0 + "&pagesize=" + NG_PAGESIZE + "&language=" + NLUtility.language(),
        data: { "startindex": 0, "pagesize": NG_PAGESIZE  },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NLMobile.addListItems(
                    ".ng-rubrica", 
                    data,
                    API_RUBRICA + "?language=" + NLUtility.language(), 
                    API_RUBRICA_HANDLER, 
                    NLTranslator.translate("Nessuna notizia trovata!"), 
                    null
                );
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
            
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + API_RUBRICA_CATEGORY,
                data: { "language": NLUtility.language() },
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        var $select = $("#ngRubrica").find('select[name="idCategoria"]');
                        for(var key in data)
                        {
                            $option = $('<option>', {"value": data[key].Id, "text": data[key].Nome}).appendTo($select);
                        }
                        $select.selectmenu('refresh');
                    }
                    else {
                        NLUtility.showError(NLTranslator.translate("Richiesta fallita!"));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngRubricaNotizia", "pageinit", function(event) {
    NLUtility.log("ngRubricaNotizia pageinit");   
    $("ngRubricaNotiziaGalleries").remove();
    //$("ngLocaleAppuntamenti").remove();
});

$(document).delegate("#ngRubricaNotizia", "pageinit", function(event) {
    NLUtility.log("ngRubricaNotizia pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_RUBRICA_NOTIZIA + "?id=" + id,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                   
                var immagine;                
                if (data.ThumbImageFrontEnd)
                    immagine = data.ThumbImageFrontEnd;
                else if (data.ThumbImage)
                    immagine = data.ThumbImage;
                                
                NLMobile.updateSubheaderRubricaNotizia("ngRubricaNotizia", immagine, data.CategoriaAsString, null);

                var $link;
                
                if (data.Gallery && data.Gallery.length > 0)
                {
                    var $listview = $('#ngRubricaNotiziaDati');
                    $gallery = $('<li>').appendTo($listview)
                    $link = $('<a href="rubrica-gallery.html?id='+data.Id+'">').appendTo($gallery);
                    $('<img src="img/icon-gallery.png" class="ui-li-icon"/>').appendTo($link);
                    $('<p>Gallery</p>').appendTo($link);
                }
              
                if (data.Titolo || data.DataCreazione) 
                    $('.ng-appuntamento-title').show();
                else 
                    $('.ng-appuntamento-title').hide();
                    
                if (data.Titolo) {
                    $('#ngRubricaNotiziaTitle').html(data.Titolo);
                    $('#ngRubricaNotiziaTitle').show();
                }
                if (data.DataCreazione) {
                    $('#ngRubricaNotiziaDate').html(data.DataCreazione);
                    $('#ngRubricaNotiziaDate').show();
                }
               
                if (data.Descrizione) {
                    $('#ngRubricaNotiziaDesc').html(data.Descrizione);
                }
                
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngRubricaGallery", "pageinit", function(event) {
    NLUtility.log("ngRubricaGallery pageinit");  
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_RUBRICA_NOTIZIA + "?id=" + id ,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                
                var immagine;                
                if (data.ThumbImageFrontEnd)
                    immagine = data.ThumbImageFrontEnd;
                else if (data.ThumbImage)
                    immagine = data.ThumbImage;  
                
                NLMobile.updateSubheaderRubricaNotizia("ngRubricaGallerySubheader", immagine, data.CategoriaAsString, null);
               
                if (data.Titolo) {
                    $('#ngGalleryName').html(data.Titolo);
                }

                var $foto = $('#ngGalleryImages');
                
                if (data.Gallery)
                {
                    for (var i = 0; i < data.Gallery.length; i++)
                    {   
                        var $link = $('<a href="'+data.Gallery[i].ImmagineWithPath+'"/>').appendTo($foto);
                        $('<img data-id="'+data.Id+'" data-url="'+data.Gallery[i].ThumbImage
                            +'" data-preview="'+data.Gallery[i].ThumbImage
                            +'" src="'+ data.Gallery[i].ThumbImage
                            +'" alt="'+data.Nome+'"/>').appendTo($link);
                    }
                    NLMobile.photoswipe("ngGalleryImages");
                }
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngStrutture", "pageinit", function(event) {
    NLUtility.log("ngStrutture pageinit");   
    NLUtility.showLoading();
  
    $.ajax({
        url: NG_URL + API_STRUTTURE + "?startindex=" + 0 +"&pagesize=" + NG_PAGESIZE + "&language=" + NLUtility.language(),
        data: { "startindex": 0, "pagesize": NG_PAGESIZE },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                NLMobile.addListItems(
                    ".ng-strutture", 
                    data,
                    API_STRUTTURE + "?language=" + NLUtility.language(), 
                    API_STRUTTURE_HANDLER, 
                    "Nessuna Struttura trovata", 
                    null
                );
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
            
            NLUtility.showLoading();
            $.ajax({
                url: NG_URL + API_STRUTTURE_CATEGORY,
                data: { "language": NLUtility.language() },
                type: "POST",
                dataType: "json",
                timeout: NG_TIMEOUT,
                success: function(data) {
                    if (data) {
                        NLUtility.hideLoading();
                        var $select = $("#ngStrutture").find('select[name="idCategoria"]');
                        for(var key in data)
                        {
                            $optionGroup = $("<optgroup>",{"label": data[key].Nome}).appendTo($select);
                            var sottoCategoria = data[key].SottoCategoriaStruttura;
                            NLUtility.log("ngStrutture pageinit");  
                            for (var key in sottoCategoria) {
                                $option = $('<option>', {"value": sottoCategoria[key].Id, "text": sottoCategoria[key].Nome}).appendTo($optionGroup);
                            }
                        }
                        $select.selectmenu('refresh');
                    }
                    else {
                        NLUtility.showError(NLTranslator.translate("Richiesta fallita!"));
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngStruttura", "pageinit", function(event) {
    NLUtility.log("ngStruttura pageinit");   
    $("ngStrutturaGalleries").remove();
    //$("ngLocaleAppuntamenti").remove();
});

$(document).delegate("#ngStruttura", "pageinit", function(event) {
    NLUtility.log("ngStruttura pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_STRUTTURA + "?id=" + id,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.hideLoading();
                
                var immagine;
                if(data.ThumbImageFrontEnd2)
                    immagine = data.ThumbImageFrontEnd2;
                else if (data.ThumbImageFrontEnd1)
                    immagine = data.ThumbImageFrontEnd1;
                    
                var titolo = data.Nome;
                
                if (data.StelleAsHtml)
                    titolo += " " + data.StelleAsHtml;
                if (data.Extra)
                    titolo += " " + data.Extra
                    
                NLMobile.updateSubheaderStruttura(
                    "ngStruttura", 
                    immagine, 
                    titolo , 
                    data.ImmagineFrontEndWithPath1
                );
  
                var $listview = $("#ngStrutturaDati");
                var $link;
                
                $info = $('<li>').appendTo($listview)
                $link = $('<a href="richiesta-info.html?type=strut&id='+data.Id+'">').appendTo($info);
                $('<img src="img/icon-descrizione.png" class="ui-li-icon"/>').appendTo($link);
                $('<p>'+ NLTranslator.translate("Richiesta Disponibilità") + '</p>').appendTo($link);
                
                $descrizione = $('<li>').appendTo($listview)
                $link = $('<a href="struttura-info.html?id='+data.Id+'">').appendTo($descrizione);
                $('<img src="img/icon-descrizione.png" class="ui-li-icon"/>').appendTo($link);
                $('<p>' + NLTranslator.translate("Descrizione") + '</p>').appendTo($link);
              
                if (data.Gallery && data.Gallery.length > 0)
                {
                    $gallery = $('<li>').appendTo($listview)
                    $link = $('<a href="struttura-gallery.html?id='+data.Id+'">').appendTo($gallery);
                    $('<img src="img/icon-gallery.png" class="ui-li-icon"/>').appendTo($link);
                    $('<p>Gallery</p>').appendTo($link);
                }
                
                if (data.Phone && data.Phone.length > 0) {
                    for(var i = 0; i < data.Phone.length; i++) {
                        $('<li><a href="tel:'
                           + data.Phone[i].Number
                           + '"><img src="img/icon-phone.png" class="ui-li-icon"><p>'
                           + data.Phone[i].Label+'</p></a></li>').appendTo($listview);
                    }
                }
                
                if (!data.Codificata) {
                    
                    if(data.TelefonoTitolare && data.TelefonoTitolare.length > 0) {
                         $('<li><a href="tel:'+NLUtility.stripAlphaChars(data.TelefonoTitolare)+'"><img src="img/icon-phone.png" class="ui-li-icon"><p>'+data.TelefonoTitolare+'</p></a></li>').appendTo($listview);
                    }
                    if(data.Indirizzo && data.Indirizzo.length > 0) {
                        $('<li><img src="img/icon-marker.png" class="ui-li-icon"><p>'+data.Indirizzo+'</p></li>').appendTo($listview);
                    }
                    if (data.SitoWeb && data.SitoWeb.length > 0) {
                        $('<li><a href="'+data.SitoWeb+'" target="_blank"><img src="img/icon-web.png" class="ui-li-icon"><p>' + NLTranslator.translate("Sito Web") + '</p></a></li>').appendTo($listview);
                    }
                    if (data.SitoWeb2 && data.SitoWeb2.length > 0) {
                        $('<li><a href="'+data.SitoWeb2+'" target="_blank"><img src="img/icon-web.png" class="ui-li-icon"><p>' + NLTranslator.translate("Sito Web") + '</p></a></li>').appendTo($listview);
                    }
                    if (data.Email) {
                        $('<li><a href="mailto:'+data.Email+'"><img src="img/icon-mail.png" class="ui-li-icon"><p>'+data.Email+'</p></a></li>').appendTo($listview);
                    }
                }
                
                /*
                if (data.Listino && data.Listino.length > 0) {
                    $('<li><p>' +data.Listino + '</p></li>').appendTo($listview);
                }*/
                
                $listview.listview('refresh');
                
                var offerte = data.Offerte;
                
                if(offerte && offerte.length > 0) {
                    $listview = $("<ul>", 
                                    {"data-role": "listview", 
                                     "data-inset":"true" ,
                                     "class":"ng-struttura-offerte"
                                    }
                                  );
                    $listview.appendTo($('#ngStrutturaInfo'));
                    $listview.listview();
                    $('<li data-role="list-divider">' + NLTranslator.translate("Offerte Struttura") + '</li>').appendTo($listview);
                    for (var i = 0; i < offerte.length; i++)
                    {
                        $('<li><a href="offerta.html?id='+offerte[i].Id+'">'
                        +'<img src="' 
                        + offerte[i].ThumbImage
                        + '" >'
                        +'<h3>' + offerte[i].Titolo+'</h3></a></li>').appendTo($listview);
                    }
                    $listview.listview('refresh');
                }
                
                var servizi = data.Servizi;
                if(servizi && servizi.length > 0) {
                    $listview = $("<ul>", 
                                    {"data-role": "listview", 
                                     "data-inset":"true" ,
                                     "class":"ng-struttura-servizi"
                                    }
                                  );
                    $listview.appendTo($('#ngStrutturaInfo'));
                    $listview.listview();
                    $('<li data-role="list-divider">' + NLTranslator.translate("Servizi Struttura") + '</li>').appendTo($listview);
                    for (var i = 0; i < servizi.length; i++)
                    {
                        if (servizi[i].ThumbImage && servizi[i].ServizioAsString) {
                            $('<li><img src="' +servizi[i].ThumbImage
                              +'" class="ui-li-icon"><p>' + servizi[i].ServizioAsString +'</p></li>').appendTo($listview);
                        }
                        
                    }
                    $listview.listview('refresh');
                }    
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngStrutturaGallery", "pageinit", function(event) {
    NLUtility.log("ngStrutturaGallery pageinit");  
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_STRUTTURA+ "?id=" + id ,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                NLUtility.log(data);
                NLUtility.hideLoading();
                
                var immagine;
                if(data.ThumbImageFrontEnd2)
                    immagine = data.ThumbImageFrontEnd2;
                else if (data.ThumbImageFrontEnd1)
                    immagine = data.ThumbImageFrontEnd1;
                    
				var titolo = data.Nome;
                
                if (data.StelleAsHtml)
                    titolo += " " + data.StelleAsHtml;
                if (data.Extra)
                    titolo += " " + data.Extra
					
                NLMobile.updateSubheaderStruttura("ngStrutturaGallerySubheader", immagine, titolo, data.ImmagineFrontEndWithPath1);
                
				/*
                if (data.Nome) {
                    $('#ngGalleryName').html(data.Nome);
                }*/

                var $foto = $('#ngGalleryImages');
                
                if (data.Gallery)
                {
                    for (var i = 0; i < data.Gallery.length; i++)
                    {   
                        var $link = $('<a href="'+data.Gallery[i].ImmagineWithPath+'"/>').appendTo($foto);
                        $('<img data-id="'+data.Id+'" data-url="'+data.Gallery[i].ThumbImage
                            +'" data-preview="'+data.Gallery[i].ThumbImage
                            +'" src="'+ data.Gallery[i].ThumbImage
                            +'" alt="'+data.Nome+'"/>').appendTo($link);
                    }
                    NLMobile.photoswipe("ngGalleryImages");
                }
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngStrutturaInfo", "pageinit", function(event) {
    NLUtility.log("ngStrutturaInfo pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
  
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_STRUTTURA + "?id=" + id,
        data: { "id": id, "language": NLUtility.language() },
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
                
                var immagine;
                if(data.ThumbImageFrontEnd2)
                    immagine = data.ThumbImageFrontEnd2;
                else if (data.ThumbImageFrontEnd1)
                    immagine = data.ThumbImageFrontEnd1;
                 
				var titolo = data.Nome;
                
                if (data.StelleAsHtml)
                    titolo += " " + data.StelleAsHtml;
                if (data.Extra)
                    titolo += " " + data.Extra
				 
                NLMobile.updateSubheaderStruttura("ngStrutturaInfo", immagine, titolo, data.ImmagineFrontEndWithPath1);
                
                if (data.Descrizione) {
                    $('#ngStrutturaInfoDesc').html(data.Descrizione);
                }
                
                var $foto = $('#ngStrutturaInfoFoto');
               
                if ($foto.children().length > 0) {
                    $foto.show();
                }
                else {
                    $foto.hide();
                }
                
                NLMobile.photoswipe("ngStrutturaInfoFoto");
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});

$(document).delegate("#ngNotizia", "pageinit", function(event) {
    NLUtility.log("ngNotizia pageinit");   
    var id = NLUtility.getUrlVarAsString("id", NLUtility.getPageURL(event));
    
    $('#ngNotiziaImage').hide();
    $('.ng-notizia-title').hide();
    
    NLUtility.showLoading();
    
    $.ajax({
        url: NG_URL + API_NOTIZIA,
        data: {"id": id},
        type: "POST",
        dataType: "json",
        timeout: NG_TIMEOUT,
        success: function(data) {
            if (data) {
                //NLUtility.log(data);
                NLUtility.hideLoading();
 
                NLMobile.updateSubheaderLocale("ngNotizia", data.immaginelocale, data.nomelocale, data.headerlocale);

                if (data.immagine) {
                    $('#ngNotiziaImage').attr("src", data.immagine);
                    $('#ngNotiziamage').show();
                }
                else {
                    $('#ngNotiziaImage').hide();
                }

                if (data.nome) {
                    $('.ng-appuntamento-title').show();
                    $('#ngNotiziaTitle').html(data.nome);
                    $('#ngNotiziaTitle').show();
                    $('#ngNotiziaDate').html(data.data);
                    $('#ngNotiziaDate').show();
                    $('#ngNotiziaDateOnly').hide();
                }
                else {
                    $('#ngNotiziaDateOnly').html(data.data);
                    $('#ngNotiziaDateOnly').show();
                    $('#ngNotiziaTitle').hide();
                    $('#ngNotiziaDate').hide();
                }

                if (data.descrizione) {
                    $('#ngNotiziaDesc').html(data.descrizione);
                }
               
                NLUtility.showLoading();
            }
            else {
                NLUtility.showError(NLTranslator.translate("Caricamento fallito!"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            NLMobile.ajaxError(jqXHR, textStatus, errorThrown);
        }
    }); 
});



var NG_URL = "http://www.pugliaetmores.it/portal/mobile/apis/";

var NG_VERSION          = "1.0";
var NG_LOG              = false;
var NG_DEVICE_ID        = null;

var NG_TIMEOUT          = 60000;
var NG_PHONEGAP         = false;
var NG_PAGESIZE         = 20;

var NG_MORE             = "Mostra altri";
var NG_PEM_URL = "http://www.pugliaetmores.it";
var NG_NEALOGIC_URL = "http://www.nealogic.it/";
var NG_PEM_PHONE = "+390804676776";
var NG_PEM_MAIL = "mailto:info@pugliaetmores.it";
/*
var FB_APP_ID       = "";
var FB_APP_SECRET   = "";
var FB_APP_PERMS    = "email,user_birthday,publish_stream";
var FB_APP_REDIRECT = "http://www.pugliaetmores.it/mobile/app/services/facebook.aspx";

var TW_NAME         = "";
var TW_REDIRECT     = "http://www.pugliaetmores.it/mobile/app/services/twitter.aspx";
*/

//CATEGORY API
var API_STRUTTURE_CATEGORY = "CategorieStruttura.aspx";
var API_RUBRICA_CATEGORY = "CategorieRubrica.aspx";
var API_OFFERTE_CATEGORY = "CategorieOfferta.aspx";
//
var API_HOME = "CategoriePrimoPiano.aspx";
var API_RUBRICA = "ListRubricaFrontEnd.aspx";
var API_STRUTTURE = "ListStrutturaFrontEnd.aspx";
var API_OFFERTE = "ListOffertaFrontEnd.aspx";
var API_OFFERTA_CORRELATA = "ListOffertaCorrelata.aspx";
var API_COUNT_OFFERTA_CORRELATA = "CountOffertaCorrelata.aspx";
var API_RICHISTA_INFO = "RichiestaInfo.aspx";
//
var API_RUBRICA_NOTIZIA = "Rubrica.aspx";
var API_STRUTTURA = "Struttura.aspx";
var API_OFFERTA = "Offerta.aspx" 

var API_STRUTTURA_GALLERY = "StrutturaGallery.aspx";
var API_RUBRICA_GALLERY = "RubricaGallery.aspx";

var API_HOME_HANDLER = "NLMobile.addPrimoPiano";
var API_OFFERTE_HANDLER = "NLMobile.addOfferta";
var API_RUBRICA_HANDLER = "NLMobile.addRubrica";
var API_STRUTTURE_HANDLER =  "NLMobile.addStrutture";
var API_OFFERTE_CORRELATA_HANDLER = "NLMobile.addOffertaCorrelata";

var API_THUMBNAILER = "Thumbnailer.aspx";
