












/* Global */
var timeout;
var currentDicteeLvl;
var current;

function onNotificationGCM(e) {
 
    switch( e.event )
    {
        case 'registered':
            if (e.regid.length > 0) {
                // post to webapp
                var request = $.post("http://timbresdelorthographe.com/concours/tweets/gcm_server_php/register.php", { "regId": e.regid, "name": device.platform, "email": device.uuid });

                request.done(function (msg) {
                    window.localStorage.setItem("activatepush", true);
                    window.localStorage.setItem("regid", e.regid);
                });

                request.fail(function (msg) {
                    navigator.notification.alert('Enregistrement impossible: ' + msg, alertDismissed, 'Inscription aux tweets');
                    window.localStorage.removeItem("activatepush");
                });
            }
            break;

        case 'message':
            if (typeof navigator.notification !== 'undefined' && typeof navigator.notification.alert !== 'undefined') {
                navigator.notification.alert(e.message, alertDismissed, 'OrthoTweet du jour');
            } else
                alert(e.message);
            /*if (e.foreground) {
                if (typeof navigator.notification !== 'undefined') {
                    navigator.notification.confirm(e.message.substring(0, 100) + '...', function (btn) {
                        if (btn == 1) navigator.app.loadUrl('http://www.timbresdelorthographe.com/concours/tweets/index.php?id='+e.msgcnt, { openExternal: true });
                    }, 'OrthoTweet du jour', 'Lire la suite,Fermer');
                }
            } else {
                //window.clearTimeout(timeout);
                navigator.app.loadUrl('http://www.timbresdelorthographe.com/concours/tweets/index.php?id='+e.msgcnt, { openExternal: true });
            }*/
            break;
 
        case 'error':
            alert('GCM error = '+e.msg);
            break;
 
        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = 'flip';
    $.mobile.listview.prototype.options.inset = true;
    $.mobile.changePage.defaults.allowSamePageTransition = true;
    $.mobile.listview.prototype.options.filterPlaceholder = "";
    $.mobile.listview.prototype.options.filterTheme = "a";
    $.mobile.pushStateEnabled = false;
    $.mobile.allowCrossDomainPages = true;
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    document.addEventListener("backbutton", onBackKeyDown, false);
    
    if(typeof device === 'undefined') device = {};
    device.platform = device.platform || 'unknown';
    device.uuid = device.uuid || '-1';
    device.name = device.name || 'unknown';
    device.version = device.version || 'unknown';

    if(window.localStorage.getItem("activatepush")===null||window.localStorage.getItem("activatepush")) {
        registerPush();
    }
}

function onBackKeyDown(e){
    if($.mobile.activePage.is('#home')) {
        e.preventDefault();
        navigator.app.exitApp();
    }  else {
        navigator.app.backHistory();
    }
}

function alertDismissed() {}

function hideSplash() {
  if(typeof $.mobile !== 'undefined' && $.mobile.activePage.is('#splash-page')) {
    $.mobile.changePage("#home", "fade");
  }
}

/* Push */
function registerPush() {
    if (typeof(window.plugins) !== 'undefined' && typeof(window.plugins.pushNotification) !== 'undefined') {
        var pushNotification = window.plugins.pushNotification;
        if (device.platform === 'android' || device.platform === 'Android') {
            pushNotification.register(successHandler, errorHandler, { "senderID": "800436485059", "ecb": "onNotificationGCM" });
        }
        else {
            pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
        }
    }
}

function unregisterPush() {
    if (typeof(window.plugins) !== 'undefined' && typeof(window.plugins.pushNotification) !== 'undefined') {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.unregister(successHandler, errorHandler);
    }

    var request;
    if (device.platform === 'android' || device.platform === 'Android') {
        request = $.post("http://timbresdelorthographe.com/concours/tweets/gcm_server_php/unregister.php", { "regId": window.localStorage.getItem("regid"), "name": "android", "email": typeof device !== "undefined"?device.uuid:"undefined" });
    } else {
        request = $.post("http://timbresdelorthographe.com/concours/tweets/apns/task.php", { 
            "task": "unregister",
            "devicetoken": result,
            "devicename": device.name,
            "devicemodel": device.platform,
            "deviceuid": device.uuid,
            "deviceversion": device.version,
            "appname": "tdo-ios",
            "appversion": "2.0"
        });
    }

    request.done(function (msg) {
        window.localStorage.removeItem("activatepush");
        window.localStorage.setItem("activatepush", false);
    });

    request.fail(function (msg) {
        navigator.notification.alert('Désabonnement impossible: ' + msg, alertDismissed, 'Désinscription aux tweets');
        window.localStorage.setItem("activatepush", true);
    });
}

function onNotificationAPN(event) {
    var pushNotification = window.plugins.pushNotification;
        
    if (event.alert) {
        if (typeof navigator.notification !== 'undefined' && typeof navigator.notification.alert !== 'undefined') {
            navigator.notification.alert(event.alert, alertDismissed, 'OrthoTweet du jour');
        } else
            alert(event.alert);
    }
    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge);
    }
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
}

function tokenHandler (result) {
    // post to webapp
    var request = $.post("http://timbresdelorthographe.com/concours/tweets/apns/task.php", { 
            "task": "register",
            "devicetoken": result,
            "devicename": device.name,
            "devicemodel": device.platform,
            "deviceuid": device.uuid,
            "deviceversion": device.version,
            "appname": "tdo-ios",
            "appversion": "2.0"
        });

    request.done(function (msg) {
        window.localStorage.setItem("activatepush", true);
        window.localStorage.setItem("regid", token);
    });

    request.fail(function (msg) {
        navigator.notification.alert('Enregistrement impossible: ' + msg, alertDismissed, 'Inscription aux tweets');
        window.localStorage.removeItem("activatepush");
    });

}

// result contains any message sent from the plugin call
function successHandler(result) {
    //alert('Callback Success! Result = '+result)
}
function errorHandler(error) {
    //alert('Callback error! Error = '+error);
}

/* Splash */
$('#splash-page').live('pageinit', function (event) {
    $.ajax({
        type: 'GET',
        url: 'http://timbresdelorthographe.com/concours/ads/json.php',
        dataType: "json", // data type of response
        error: function (xhr, status, thrownError) {
            alert('Erreur ' + status + ': ' + thrownError);
        },
        success: function (ad) {
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            var adImage = new Image();
            adImage.src = ad.image + '&x=' + x + '&y=' + y + '&o=' + window.orientation + '&r=' + window.devicePixelRatio;

            adImage.onload = function () {
                if (typeof navigator.splashscreen !== 'undefined')
                    navigator.splashscreen.hide();
                $("#ad-link").attr("href", ad.url);
                $('#ad-link').append(this);
                $('#splash').css('background-color', ad.color);
                if(timeout!=='undefined') window.clearTimeout(timeout);
                timeout = setTimeout(hideSplash, 5000);
            };
        }
    });
});
$('#splash-page').live('pageshow', function(event) {
    timeout = setTimeout(hideSplash, 10000);
});
/* Quiz */
$('#quiz-menu').live('pagebeforeshow', function(event) {
    var ul = $('#quiz-list'), html = '';
    for(var i = 0; i < quiz.quiz.length; i++)
        html += '<li><a href="#quiz1" onclick="current=quiz.quiz[' + i + '].questions; for(var i = 0; i < current.length; i++) {current[i].reponse = [];}">' + quiz.quiz[i].nom + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);
    
    ul.closest('.iscroll-wrapper').iscrollview("refresh");

    showSolution = false;
    currentQuestion = 0;
    concours = false;
});

function initQuiz(q,t) {
    $('#precedent'+q).bind("click", function(event, ui) {
        current[currentQuestion].reponse = [];
        for(var i = 0; i < current[currentQuestion].reponses.length; i++) {
            if($('#reponse' + q + '_' + i).is(':checked')) {
                current[currentQuestion].reponse.push(i);
            }
        }
        currentQuestion--;
        $.mobile.changePage($('#quiz'+t), { transition: 'slide', reverse: true });
    });
    $('#suivant' + q).bind("click", function(event, ui) {
        
        current[currentQuestion].reponse = [];
        for(var i = 0; i < current[currentQuestion].reponses.length; i++) {
            if($('#reponse' + q + '_' + i).is(':checked')) {
                current[currentQuestion].reponse.push(i);
            }
        }
        if(currentQuestion < current.length-1) {
            currentQuestion++;
            $.mobile.changePage($('#quiz' + t), {transition: 'slide'});
        } else {
            $.mobile.changePage($('#quiz-result'), {transition: 'slide'});
        }
    });
    $('#quiz-aide' + q).bind("click", function(event, ui) {
        if(typeof navigator.notification !== 'undefined') {
            navigator.notification.alert("Sélectionnez la ou les bonnes réponses puis validez", alertDismissed, 'Aide');
        } else {
            alert("Sélectionnez la ou les bonnes réponses puis validez");
        }
    });
    $('#retour-quiz-menu' + q).bind("click", function(event, ui) {
        if(concours) {
            $.mobile.changePage($('#concours-quiz-level'), {reverse: 'true'});
        } else {
            $.mobile.changePage($('#quiz-menu'), {reverse: 'true'});
        }
    });
    
}

$('#quiz1').live('pageinit', function(event) {
    initQuiz(1, 2);
});

$('#quiz2').live('pageinit', function(event) {
    initQuiz(2, 1);
});

function showQuiz(q){
    if(typeof current === 'undefined'|| isNaN(currentQuestion)) {
        alert('Erreur: Erreur d\'initialisation du Quiz');
        $.mobile.changePage($('#home'), {transition: 'flip', reverse: true});
        return;
    }
    $('#step'+q).html((currentQuestion + 1) + '/' + current.length);
    $('#question'+q).html(current[currentQuestion].question);

    var html = '<div data-role="controlgroup">';
    for(var i = 0; i < current[currentQuestion].reponses.length; i++) {
        html += '<input type="checkbox" name="reponse' + q + '_' + i + '" id="reponse' + q + '_' + i + '" data-iconpos="right"';
        if(typeof current[currentQuestion].reponse !== 'undefined' && $.inArray(i, current[currentQuestion].reponse) !== -1) {
            html += ' checked="true"';
            if(showSolution && $.inArray(i, current[currentQuestion].solution) === -1) {
                html += ' data-theme="f"';
            } else if(showSolution) {
                html += ' data-theme="j"';
            } 
        } else {
            if(showSolution && $.inArray(i, current[currentQuestion].solution) !== -1) {
                if(current[currentQuestion].solution.length > 1)
                    html += ' data-theme="f"';
                else
                    html += ' data-theme="j"';
            }
        }
        if(showSolution) html += ' disabled="true"';
        html += '/>\n<label for="reponse' + q + '_' + i + '">' + (String.fromCharCode(97 + i)) + '/ ' + current[currentQuestion].reponses[i] + '</label>';
    }
    html += '</div>';
    $('#reponses'+q).html(html);
    $('#reponses'+q).trigger("create");

    if(currentQuestion < 2) {
        
        if(!showSolution) {
            $('#suivant'+q).html('Suivant');
            $('#precedent'+q).closest('.ui-btn').show();
            $('#correction'+q).hide();
            if(currentQuestion === 0) {
                $('#precedent' + q).attr('disabled', true);
                $('#precedent' + q).addClass('ui-disabled');
            }
        } else {
            $('#suivant'+q).html('Suite');
            $('#precedent'+q).closest('.ui-btn').hide();
            $('#correction'+q).show();
        }
        $('#precedent'+q).button('refresh');
        $('#suivant'+q).button('refresh');
    } else if(!showSolution) {
        $('#precedent'+q).attr('disabled', false);
        $('#precedent'+q).removeClass('ui-disabled');
        $('#precedent'+q).button('refresh');
    }
    
    if(currentQuestion === current.length - 1) {
        $('#suivant'+q).html('Terminer');
        $('#suivant'+q).button('refresh');
    }

    if(showSolution) {
        $('#correction'+q).html(current[currentQuestion].correction);
    }

    $('#reponses'+q).closest('.iscroll-wrapper').iscrollview("refresh");
}

$('#quiz1').live('pagebeforeshow', function(event) {
    showQuiz(1);
});
$('#quiz2').live('pagebeforeshow', function(event) {
    showQuiz(2);
});

$('#quiz-result').live('pageinit', function(event) {
    $('#quiz-restart').bind("click", function(event, ui) {
        currentQuestion = 0;
        showSolution = false;
        for(var i = 0; i < current.length; i++) {
            current[i].reponse = [];
        }
        $.mobile.changePage($('#quiz1'), { reverse: true });
    });
    $('#quiz-solution').bind("click", function(event, ui) {
        currentQuestion = 0;
        showSolution = true;
        $.mobile.changePage($('#quiz1'), { reverse: true });
    });
    $('#retour-quiz-menu').bind("click", function(event, ui) {
        if(concours) {
            $.mobile.changePage($('#concours-quiz-level'), {reverse: 'true'});
        } else {
            $.mobile.changePage($('#quiz-menu'), {reverse: 'true'});
        }
    });
});
$('#quiz-result').live('pagebeforeshow', function(event) {
    var note = 0, i;
    for(i = 0; i < current.length; i++) {
        if($(current[i].solution).not(current[i].reponse).length === 0
                && $(current[i].reponse).not(current[i].solution).length === 0) {
            note++;
        }
    }
    $('#note').html('<img alt="note" src="images/notes/' + Math.round((note/current.length)*20) + '-20.png" />');

});

/* Dictees */
$('#dictees-menu').live('pageinit', function(event) {
    var ul = $('#dictees-list'), html = '', i;

    for(i = 0; i < dictees.dictees.length; i++)
        html += '<li><a href="#dictees-level" onclick="current=dictees.dictees[' + i + '];">' + dictees.dictees[i].nom + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);

    ul.closest('.iscroll-wrapper').iscrollview("refresh");

    concours = false;
});

$('#dictees-level').live('pageinit', function(event) {
    $('#retour-dictees-menu').bind("click", function(event, ui) {
        if(concours) {
            $.mobile.changePage($('#concours-dictee-level'), { reverse: 'true' });
        } else {
            $.mobile.changePage($('#dictees-menu'), { reverse: 'true' });
        }
    });
});

$('#dictee').live('pageinit', function(event) {
    $('#dictee-aide').bind("click", function(event, ui) {
        var msg;
        if(currentDicteeLvl === 0) msg = 'Comptez le nombre de fautes, sélectionnez un chiffre puis validez';
        else if(currentDicteeLvl === 1) msg = 'Sélectionnez les mots mal orthographiés puis validez';
        else if(currentDicteeLvl === 2) msg = 'Sélectionnez les mots mal orthographiés, corrigez-les puis validez';
        if(typeof navigator.notification !== 'undefined') {
            navigator.notification.alert(msg, alertDismissed, 'Aide');
        } else {
            alert(msg);
        }
    });
});

function splitTexte(t) {
    return $.trim(current.texte.replace(/&nbsp;/g, " ").replace(/<\/?p>/g, " ").replace(/[\[\]\.,\/#!$%\^&\*;:{}=`~()«»\"?—–]/g, "").replace(/\s{2,}/g, " ")).split(' ');
}

$('#dictee').live('pagebeforeshow', function(event) {
    if(typeof current === 'undefined' || isNaN(currentDicteeLvl)) {
        alert('Erreur d\'initialisation de la dictée');
        $.mobile.changePage($('#home'), { transition: 'flip', reverse: true });
        return;
    }
    var html = '', texte = current.texte, words = splitTexte(current.texte), i, index = 0, word;
    current.positions = [];
    current.mots = [];	$('#fautes').val(0);
    if(currentDicteeLvl === 0) {
        html = texte.replace('_', ' ');
        $('#dictee-form').show();
    } else {
        $('#dictee-form').hide();
        for(i = 0; i < words.length; i++) {
            word = words[i].replace('_', ' ');
            index = texte.indexOf(words[i]);
            html += texte.substring(0, index) + '<span class="word" onclick="selectWord(this, ' + i + ', \'' + escape(word) + '\');" title="'+i+'">' + word + '</span>';
            texte = texte.substring(index + word.length);
        }
        html += texte;
    }
    $('#dictee-content').html(html);
    $('#dictee-content').closest('.iscroll-wrapper').iscrollview("refresh");
});

var selMot, selMotPos, selMotElem; 
function selectWord(o, x, m) {
    var idx=current.positions.indexOf(x), w = unescape(m);
    if(idx===-1) {
        if(currentDicteeLvl === 2) {
            selMot=w;
            selMotPos=x;
            selMotElem=o;
            if(typeof navigator !== 'undefined' && typeof navigator.notification !== 'undefined' && typeof navigator.notification.prompt !== 'undefined') {
               navigator.notification.prompt(
                    'Correction',
                    onPromptCorrection,
                    'Corriger',
                    ['Ok','Annuler'],
                    w
                );
            } else {
               addMot(prompt('Corriger:', w), w, x, o);
            }
            
        } else {
            current.positions.push(x);
            //console.log(current.positions);
            $(o).addClass('faute');
        }
    } else {
        current.positions.splice(idx, 1);
        if(currentDicteeLvl === 2) 
            current.mots = current.mots.slice(idx, idx);
        $(o).removeClass('faute corrige');
		$(o).html(w);
        //console.log(current.positions);
    }
}

function onPromptCorrection(results) {
    if(results.buttonIndex===1) addMot(results.input1, selMot, selMotPos, selMotElem);
}

function addMot(mot, w, x, o) {
    if(typeof mot !== 'undefined' && mot!==w && $.trim(mot)!=='') {
        current.positions.push(x);
        $(o).html(mot);
        $(o).addClass('corrige');
        current.mots.push(mot);
        //console.log(current.positions);
        //console.log(current.mots);
    }
}

$('#dictee-result').live('pagebeforeshow', function (event) {
    var nbFautes = 0, html;
    if (currentDicteeLvl === 0) {
        nbFautes = $('#fautes').val();
        $('#dictee-back').closest('.ui-btn').show();
        $('#dictee-restart').closest('.ui-btn').hide();
        $('#dictee-resoudre').closest('.ui-btn').hide();
    } else {
        $('#dictee-back').closest('.ui-btn').hide();
        $('#dictee-restart').closest('.ui-btn').show();
        $('#dictee-resoudre').closest('.ui-btn').show();

        /*console.log(current.fautes);
        console.log(current.positions);
        console.log(current.correction);
        console.log(current.mots);*/

        for (var i = 0; i < current.fautes.length; i++) {
            var pos = current.positions.indexOf(current.fautes[i]);
            if (pos !== -1 && (
                    currentDicteeLvl === 1 || (currentDicteeLvl === 2 && current.mots[pos].replace('_', ' ').match(new RegExp('^' + current.correction[i] + '$'))))) {
                nbFautes++;
                console.log("Faute+ " + nbFautes + ": " + current.fautes[i] + " pos " + pos);
            } /*else
                console.log(current.fautes[i] + " introuvable ");*/
        }
        //console.log("Score+ " + nbFautes);
        if (currentDicteeLvl === 1) {
            for (var i = 0; i < current.positions.length; i++) {
                var pos = current.fautes.indexOf(current.positions[i]);
                if (pos === -1) {
                    nbFautes--;
                    //console.log("Faute- " + nbFautes + ": " + current.positions[i]);
                }
            }
        }
        //console.log("Score- " + nbFautes);
    }
    html = '<img alt="' + Math.max(Math.min(nbFautes, 20), 0) + '" src="images/notes2/' + Math.max(Math.min(nbFautes, 20), 0) + '.png" /><img alt="/" src="images/notes2/slash.png" /><img alt="' + Math.min(current.fautes.length, 20) + '" src="images/notes2/' + Math.min(current.fautes.length, 20) + '.png" />';
    if (nbFautes === current.fautes.length && (currentDicteeLvl === 0 || current.positions.length === current.fautes.length))
        html += '<br/><img alt="bravo" src="images/BRAVO.png" />';
    $('#note2').html(html);

});


$('#dictee-solution').live('pagebeforeshow', function(event) {
    var html = '', texte = current.texte, words = splitTexte(current.texte), i, index = 0, word, pos;

    for(i = 0; i < words.length; i++) {
        word = words[i].replace('_', ' ');
        index = texte.indexOf(words[i]);
        html += texte.substring(0, index) + '<span class="word';
        pos = current.fautes.indexOf(i);
        if(pos !== -1) {
            if(currentDicteeLvl === 1) {
                html += ' faux">' + word;
            } else {
                html += ' faute">' + current.correction[pos].split('|')[0];
            }

        } else html += '">' + word;
        html += '</span>';
        texte = texte.substring(index + word.length);
    }
    html += texte + '<br/>';
    if(currentDicteeLvl === 2) {
        html += '<p>CORRECTION :<br/>';
        for(i = 0; i < current.fautes.length; i++) {
            html += words[current.fautes[i]].replace('_', ' ') + ' &rarr;&nbsp;' + current.correction[i].split('|')[0] + '<br/>';
        }
        html += '</p>';
    }

    html += '<p>VOS REPONSES :<br/>';
    //justes
    for(i = 0; i < current.fautes.length; i++) {
        pos = current.positions.indexOf(current.fautes[i]);
        if(pos!=-1 && (
                    currentDicteeLvl == 1 || (currentDicteeLvl == 2 && current.mots[pos].replace('_', ' ').match(new RegExp('^'+current.correction[i]+'$'))))) {
            html += '<span class="faute">' + words[current.fautes[i]].replace('_', ' ');
            if(currentDicteeLvl == 2) html += ' &rarr; ' + current.correction[i].split('|')[0];
            html += '</span><br/>';
        }
    }
    //fausses
    for(i = 0; i < current.positions.length; i++) {
        pos = current.fautes.indexOf(current.positions[i]);
        if(pos == -1 || (currentDicteeLvl == 2 && !current.mots[i].replace('_', ' ').match(new RegExp('^'+current.correction[pos]+'$')))) {
            html += '<span class="faux">' +words[current.positions[i]].replace('_', ' ');
            if(currentDicteeLvl == 2) html += ' &rarr; ' + current.mots[i];
            html += '</span><br/>';
        }
    }
    html += '</p>';
    $('#solution-content').html(html);
    $('#solution-content').closest('.iscroll-wrapper').iscrollview("refresh");
});

/* Astuces */
$('#astuces-menu').live('pageinit', function(event) {
    var ul = $('#astuces-list'), html = '', i;

    for(i = 0; i < astuces.length; i++)
        html += '<li data-icon="false"><a href="#astuce" onclick="currentAstuce='+i+';">' + (i+1) + '. ' + astuces[i].titre + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);
    
    ul.closest('.iscroll-wrapper').iscrollview("refresh");
});

$('#astuce').live('pagebeforeshow', function(event) {
    if(typeof currentAstuce === 'undefined' || isNaN(currentAstuce)) {
        alert('Erreur d\'initialisation de l\'astuce');
        $.mobile.changePage($('#home'), {transition: 'flip', reverse: true});
        return;
    }
    $('#fiche').html('Fiche n°'+(currentAstuce + 1));
    var html = '<p>«&nbsp;' + astuces[currentAstuce].titre + '&nbsp;»</p><div style="font-weight: normal; text-align:justify;">';
    html += astuces[currentAstuce].texte + '</div>';
    $('#astuce-text').html(html);
    $('#astuce-text').closest('.iscroll-wrapper').iscrollview('refresh');
});

/* Concours */
$('#concours-annee').live('pagebeforeshow', function(event) {
    var ul = $('#annees-list'), html = '', i;
    currentQuestion = 0;
    showSolution = false;
    concours = true;
    currentQuestion = 0;
    for(i in currentConcours)
        html += '<li><a href="' + dest 
            + '" onclick="current=currentConcours[\'' + i 
            + '\'];for(var i = 0; i < current.length; i++) {current[i].reponse = [];}">' 
            + i + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);
    ul.closest('.iscroll-wrapper').iscrollview("refresh");
    if( $.mobile.fixedtoolbar.prototype.options.supportBlacklist() && $.support.scrollTop )  $(".ui-footer-fixed" ).fixedtoolbar( "updatePosition" );
    if(dest === '#dictees-level') $('#concours-annee-logo').html('<img alt="Dictee" style="max-height:50%; max-width:50%;" src="images/Titre_dictees_ecran_principal.png" />');
    else $('#concours-annee-logo').html('<img alt="Quiz" style="max-height:50%; max-width:50%;" src="images/Titre_quiz_ecran_principal.png" />');
});

function onConfirm(buttonIndex) {
    if(buttonIndex === 2) {    
        if(typeof navigator !== 'undefined' && typeof navigator.notification !== 'undefined' && typeof navigator.notification.prompt !== 'undefined') {
           navigator.notification.prompt(
                'Entrez votre adresse email',
                onPromptMail,
                'Inscription', 
                ['Ok','Annuler'],
                '@'
            );
        } else {
           mail = prompt('Entrez votre adresse email');
        }
        
    } else alert(buttonIndex);
}

function onPromptMail(results) {
    if(results.buttonIndex===1) addMail(results.input1);
}

function addMail(mail) {
    var request;
    if(mail !== null) {
        request = $.post("http://timbresdelorthographe.com/concours/add-mail.php", { "email": mail });

        request.done(function(msg) {
            if(typeof navigator.notification !== 'undefined') {
                navigator.notification.alert(msg, alertDismissed, 'Inscription');
            } else {
                alert('Inscription: ' + msg);
            }
        });

        request.fail(function(jqXHR, textStatus) {
            if(typeof navigator.notification !== 'undefined') {
                navigator.notification.alert("Vous devez vous connecter à internet", alertDismissed, 'Erreur');
            } else {
                alert("Erreur: connexion impossible");
            }
        });
    }
}

$('#concours-about').live('pageinit', function(event) {
    $('#inscription').bind("click", function(event, ui) {
        var msg = "LES TIMBRES DE L’ORTHOGRAPHE 2013 / 2014\nRÈGLEMENT\n\nLes Editions de l’Opportun Sarl dont le siège social est situé 43 avenue du 11 novembre à La Varenne St-Hilaire (94210) organisent le concours des Timbrés de l’orthographe. Les Timbrés de l’orthographe veulent promouvoir par le jeu le bon usage de la langue française auprès du grand public et permettre à chacun de tester ses connaissances.\nApple® n’est pas associée à l’organisation de ce concours et ne le commandite pas.\n\n Les Timbrés de l’orthographe sont ouverts à toute personne ayant, à la date du 1er janvier 2013, son domicile principal situé en France, sans condition de nationalité. Les collaborateurs des Editions de l’Opportun Sarl, les membres du jury et les membres de leur famille (ascendants, descendants, conjoint) ne peuvent s’inscrire aux Timbrés de l’orthographe.\n\n Les concurrents sont répartis en trois catégories :\n\n Cadets : concurrents nés entre 2001 et 2005\n Juniors : concurrents nés entre 1996 et 2000\n Adultes : concurrents nés en ou avant 1995\n\n Catégorie «LA POSTE» Les organisateurs se réservent la possibilité de créer une catégorie spéciale «LA POSTE» permettant aux salariés du Groupe La Poste et de l’ensemble de ses filiales de concourir aux Timbrés de l’orthographe dans la catégorie « Adultes », en faisant toutefois l’objet d'un classement identifié et séparé. Les concurrents nés avant le 1 er janvier 1994, âgés de 18 ans et plus au 31 décembre 2012 et appartenant au personnel des différentes sociétés du groupe La Poste, pourront participer à cette catégorie « LA POSTE ». Cette catégorie pourra disposer d’un règlement spécifique et adapté.\n\n Catégorie «RESTE DU MONDE» Les organisateurs se réservent aussi la possibilité de créer d’autres catégories spéciales permettant aux personnes domiciliées hors de France au 1 er janvier 2013 de participer aux Timbrés de l’orthographe dans une catégorie « RESTE DU MONDE » spécifique. Cette éventuelle catégorie « RESTE DU MONDE » pourra faire l'objet d'un règlement particulier. En tout état de cause, celui-ci s'inscrira dans le cadre du présent règlement.\n\n LES ÉPREUVES\n Les épreuves comportent des tests de sélection publiés dans différents titres de la presse quotidienne et magazines de presse ainsi que sur le site internet de l’opération : www.timbresdelorthographe.fr. Ces tests de sélection comportent pour chaque catégorie 10 questions à choix multiples propres à ladite catégorie. La participation au concours des Timbrés de l’orthographe est entièrement gratuite. Les participants ont jusqu’au vendredi 31 janvier 2014 minuit pour compléter et retourner leur test de sélection, soit par courrier à l’adresse  indiquée  sur  le  bulletin,  soit  via  le  site  internet www.timbresdelorthographe.fr.\n\n\n Les résultats de ces tests de sélection (bonnes réponses et personnes qualifiées) seront communiqués à partir du vendredi 28 février 2014. Les concurrents sélectionnés pour la suite du concours des Timbrés de l’orthographe seront informés personnellement par les Editions de l’Opportun, soit par courrier postal, soit par courrier électronique. Par la suite, ils seront informés de la date et du lieu d’organisation des finales régionales et de la finale nationale par les Editions de l’Opportun au plus tard dix jours avant chacune des épreuves. Les courriers seront envoyés à l'adresse indiquée lors de leur inscription au concours des Timbrés de l’orthographe.\n\n Pour les tests de sélection, quel que soit le support de participation (papier ou internet), seuls les concurrents ayant rempli complètement leur bulletin d'inscription - nom, prénom, adresse, âge, autorisation parentale pour les mineurs - et ayant réussi cette épreuve de tests de sélection seront appelés à participer aux épreuves suivantes. Le jury se réserve le droit d’envoyer une épreuve complémentaire aux concurrents ayant été sélectionnés pour l’une des finales régionales si leur trop grand nombre le justifie (afin de les départager). Les concurrents ayant réussi cette épreuve complémentaire seront alors sélectionnés pour les finales régionales. Lors des finales régionales, les concurrents jouent dans la région dont relève le domicile qu'ils ont indiqué sur leur bulletin d'inscription lors des tests de sélection. Il est toutefois possible, en cas de déménagement, de demander au jury un changement d’affectation par courrier à l’adresse des Editions de l’Opportun, et ce 7 jours avant l’organisation des finales régionales. Le jury se réserve toutefois le droit de refuser une dérogation si cela pose un problème d’organisation des finales régionales. La liste des villes organisatrices des finales  régionales  sera  publiée  sur  le  site  internet www.timbresdelorthographe.fr ,   au plus tard le 3 mars 2014.\n\n Les épreuves des finales régionales comporteront une série de 30 questions posées sous forme de questionnaire à choix multiples (QCM) mais aussi une dictée, rédigée par Daniel Picouly, parrain de l’opération. Selon la catégorie à laquelle ils participent (cadets, juniors, adultes ou postiers) les candidats répondront à 10, 20 ou 30 questions et feront tout ou partie de la dictée. Le classement des concurrents est effectué en fonction du nombre total d’erreurs qu'ils auront commises (QCM + dictée), les concurrents ayant commis le moins d’erreurs étant les mieux classés. Les résultats de chaque candidat seront communiqués par courrier ou par courriel au plus tard 31 jours après la tenue des finales régionales. Le jury se réserve le droit d’envoyer une épreuve complémentaire aux concurrents ayant été sélectionnés pour la finale nationale si leur trop grand nombre le justifie (afin de les départager). Cette épreuve  complémentaire  sera  uniquement  constituée  de  QCM complémentaires.\n\n La finale nationale se déroulera pour l'ensemble des concurrents sélectionnés en un lieu unique qui leur sera précisé en temps utile par les organisateurs. Lors de la finale nationale, les candidats devront répondre, comme pour les finales régionales à un maximum de 30 QCM (10 pour les cadets, 20 pour les juniors et 30 pour les adultes) et écrire correctement une dictée également rédigée par le parrain de l’opération. Le classement tiendra compte du nombre d’erreurs commises tant aux QCM qu’à la dictée. De nouveau, en cas de nécessité de départager d’éventuels ex æquo, le jury pourra proposer, le jour de la finale nationale, une épreuve complémentaire uniquement constituée de QCM.\n\n Pour chaque catégorie, le jury désignera 4 candidats qui se verront décerner un « Timbre d’or », un « Timbre d’argent », un « Timbre de bronze » et un « Prix spécial du jury », en fonction de leur classement au sein de leur catégorie lors de la finale nationale mais aussi eu égard à leur parcours tout au long du concours des Timbrés de l’orthographe.\n\n LE JURY\n Le jury des Timbrés de l’orthographe, présidé par le parrain de l’opération, Daniel Picouly, est composé notamment de Stéphane Chabenat (gérant des Editions de l’Opportun), Carole Solet et Aurélie Giraudet (Groupe La Poste), Bénédicte Gaillard et Camille Martinez (linguistes) et Servanne Morin (chef de projet). Il est précisé que la composition du jury pourra évoluer tout au long du concours. Les décisions du jury sont sans appel. Le jury est seul habilité à définir le contenu de chacune des épreuves. Le déroulement des différentes épreuves se fait également sous son autorité. Seul le jury pourra définir la liste des concurrents qualifiés pour chacune des épreuves (finales régionales et finale nationale) et trancher, éventuellement, tout cas litigieux. Le jury est seul habilité à prendre en toute circonstance toute décision de suppression, modification ou maintien d'une épreuve des Timbrés de l’orthographe ; d'exclusion ou de rattrapage d'un concurrent.\n\n Pour l'orthographe, n'est considérée comme exacte la graphie des mots que telle qu'elle apparaît en entrée principale dans le Petit Larousse Illustré de la langue française, dans sa dernière édition parue en date du 1er janvier 2014. A l'occasion des finales régionales et de la finale nationale qui comportent toutes les deux une dictée, il sera fait stricte application, par les organisateurs et les animateurs, des règles de prononciation indiquées dans l’ouvrage de référence.\n\n Le contenu de toute épreuve se déroulant par correspondance ou à distance (c’est par exemple le cas des tests de sélection et des questions complémentaires éventuelles des finales régionales) ne pourra en aucun cas être modifié par les organisateurs dès lors qu’il aura été expédié ou mis à la disposition des candidats.\n\n La correction des finales régionales se fait sous le contrôle de jury national qui désignera, pour chacune des villes organisatrices, une équipe le représentant sur place le jour de ces finales régionales. Aucun résultat ne pourra être communiqué lors des finales régionales, seuls les bonnes réponses seront diffusées à l’ensemble des candidats, après la tenue des finales régionales. Les résultats, une fois validés par le jury national, sont proclamés le jour même de leur validation sur le site internet www.timbresdelorthographe.com.\n\n Il est précisé que les copies corrigées ne pourront en aucun cas être communiquées aux concurrents.\n\n Pour les finales régionales et la finale nationale, chaque concurrent doit se munir de sa convocation et d'une pièce d'identité. Aucun autre document ni appareil ne sera autorisé dans la salle durant les épreuves. Toute tentative de fraude ou de tricherie entraînera l'élimination immédiate et définitive du ou des fautifs.\n\n Au-delà d'un délai de dix jours ouvrés après la publication des résultats de chaque épreuve sur le site internet www.timbresdelorthographe.fr, il ne sera plus admis aucune contestation ni réclamation.\n\n Pour la finale nationale, les frais de voyage des concurrents seront pris partiellement en charge par les Editions de l’Opportun dans le cadre suivant : remboursement de frais de voyage avancés par les finalistes, quel que soit le mode de transport utilisé entre le domicile indiqué sur le bulletin d'inscription aux tests de sélection et le lieu de l'épreuve dans la limite de 50 € TTC (cinquante euros toutes taxes comprises) pour chaque candidat qualifié. Cette prise en charge ne pourra être définitive qu’avec la remise par les candidats des justificatifs de transport originaux aux Editions de l’Opportun, et cela au plus tard quinze jours ouvrés après la tenue de la finale nationale.\n\n En participant au concours des Timbrés de l’orthographe, les concurrents autorisent la publication et l'utilisation de leurs nom, adresse et image, et renoncent expressément à tous droits et indemnités à ce titre. Pour les candidats mineurs, une autorisation parentale sera nécessaire pour tous les candidats qualifiés pour les finales régionales.\n\n En cas de modification, suspension ou interruption des Timbrés de l’orthographe pour quelque cause que ce soit, la responsabilité des organisateurs, comme celle des membres du jury, ne saurait être engagée. Cette responsabilité ne pourra pas davantage être retenue en cas de retard ou de perte lors de l'acheminement du courrier soit du fait d'un concurrent (erreur d'adresse, d'affranchissement, de mode de transport, etc.), soit du fait des administrations postales.\n\n La participation au concours des Timbrés de l’orthographe oblige tout candidat à se soumettre au présent règlement et aux décisions du jury.\n\n Rédigé à Paris, le 8 octobre 2013\n\n Le règlement du concours des Timbrés de l’orthographe est déposé en l’Etude de la SCP Yannick POULAIN – Michaëla VIGNERAS – Huissiers de Justice Associés – Ziap de CHATEAUROUX-DEOLS Rue Georges Clémenceau – Bâtiment 620 – Porte D - 36130 – DEOLS – Tél : 02 54 35 75 89 Fax : 02 54 35 75 96 Email : scp.poulain.vigneras@orange.fr\n\n Il peut y être consulté. Une copie peut en être adressée sur toute demande par mail, fax ou courrier";
        if(typeof navigator.notification !== 'undefined') {
            navigator.notification.confirm(msg, onConfirm, 'RÈGLEMENT', 'Annuler,J\'accepte');
        } else {
            if(confirm(msg)) onConfirm(2);
            else onConfirm(1);
        }
    });
});

/* Orthotweets */
$('#tweets-menu').live('pagebeforeshow', function(event) {
    var ul = $('#tweets-cat-list'), html = '';
    for(var i = 0; i < tweets.length; i++)
        html += '<li><a href="#tweets-categorie" onclick="current=tweets[' + i + '];">' + tweets[i].categorie + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);
    
    ul.closest('.iscroll-wrapper').iscrollview("refresh");

    if(window.localStorage.getItem("activatepush")!==null&&window.localStorage.getItem("activatepush")) {
        $("#activatepush").attr("checked",true).checkboxradio("refresh");
    } else {
        $("#activatepush").attr("checked",false).checkboxradio("refresh");
    }
});

$('#activatepush').live('change', function (event) {
    if ($("#activatepush").is(':checked')) {        
        registerPush();
    } else {
        unregisterPush();
    }
});

$('#gotweet').live('click',function (event) {
    navigator.app.loadUrl('http://www.timbresdelorthographe.com/concours/tweets/index.php', { openExternal:true });
});

$('#tweets-categorie').live('pagebeforeshow', function(event) {
    var ul = $('#tweets-list'), html = '';
    for(var i = 0; i < current.liste.length; i++)
        html += '<li><a href="#tweet" onclick="currentTweet=current.liste[' + i + '];">' + current.liste[i] + '</a></li>';
    ul.html(html);
    ul.listview('refresh', true);
    
    ul.closest('.iscroll-wrapper').iscrollview("refresh");
});

$('#tweet').live('pagebeforeshow', function(event) {
    if(typeof currentTweet === 'undefined') {
        alert('Erreur d\'initialisation du tweet');
        $.mobile.changePage($('#home'), {transition: 'flip', reverse: true});
        return;
    }
    var html = '<div style="font-weight: normal; text-align:justify;">';
    html += currentTweet + '</div>';
    $('#tweet-text').html(html);
    $('#tweet-text').closest('.iscroll-wrapper').iscrollview("refresh");
});

﻿var quiz =
{
    concours: {
        selection: {
            '2010': [
				{
				    question: "Les verbes dont l’infinitif se termine par <i>-er</i> sont des verbes du&nbsp;:",
				    reponses: ["1<sup>er</sup> groupe", "2<sup>e</sup> groupe", "3<sup>e</sup> groupe"],
				    solution: [0],
				    correction: "Les verbes dont l’infinitif se termine par <i>-er</i> forment le 1<sup>er</sup> groupe. Le 2<sup>e</sup> groupe est constitué des verbes dont l’infinitif se termine par <i>-ir</i> et qui présentent un radical en <i>-iss-</i> dans leur conjugaison <i>(nous finissons, finissant…).</i> Les autres verbes forment le 3<sup>e</sup> groupe. <i>Aller</i> ayant une conjugaison irrégulière à certains temps, il est peut être classé dans le 3<sup>e</sup> groupe."
				}, {
				    question: "Mettez ces noms au pluriel et chassez l’intrus.",
				    reponses: ["Cheval", "Bocal", "Carnaval"],
				    solution: [2],
				    correction: "De ces trois noms, <i>carnaval</i> est le seul dont le pluriel est en <i>s</i> et non en <i>aux (des chevaux, des bocaux, des carnavals).</i>"
				}, {
				    question: "Les adverbes sont des mots invariables.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Les adverbes sont des mots invariables car ils s’écrivent toujours de la même façon&nbsp;: ils ne se mettent ni au pluriel ni au féminin (à l’exception de  <i>tout</i> qui, dans certains cas, s’accorde). "
				}, {
				    question: "Quand deux mots ont le même sens, on dit qu’ils sont&nbsp;:",
				    reponses: ["Homonymes", "Synonymes"],
				    solution: [1],
				    correction: "Deux synonymes ont le même sens ou des sens proches. Les homonymes sont des mots qui se prononcent de la même façon, mais qui ont des sens différents."
				}, {
				    question: "La phrase suivante comporte une faute&nbsp;: «&nbsp;Se test n’est pas difficile.&nbsp;»",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Il y a une faute dans la phrase&nbsp;: il faut écrire <i>ce</i> et non <i>se.</i>"
				}, {
				    question: "Une phrase dans laquelle on pose une question est une phrase&nbsp;:",
				    reponses: ["Exclamative", "Affirmative", "Interrogative"],
				    solution: [2],
				    correction: "La phrase interrogative permet de poser directement une question <i>(Le facteur est-il passé&nbsp;?). </i>La phrase exclamative permet d’exprimer un sentiment (peur, étonnement, admiration…) par rapport à ce que l’on dit <i>(Comme c’est facile&nbsp;!). </i>Une phrase affirmative est une phrase construite sans négation."
				}, {
				    question: "Quel est l’infinitif du verbe de la phrase&nbsp;: «&nbsp;Le lièvre court vite&nbsp;»&nbsp;?",
				    reponses: ["Courer", "Courir", "Tomber"],
				    solution: [1],
				    correction: "<i>Court </i>est ici le verbe <i>courir</i> au présent de l’indicatif<i>. </i>Le verbe <i>courer</i> n’existe pas."
				}, {
				    question: "Quel est le sujet dans la phrase suivante&nbsp;: «&nbsp;Le matin, le facteur distribue le courrier&nbsp;»&nbsp;?",
				    reponses: ["Le matin", "Le facteur", "Le courrier"],
				    solution: [1],
				    correction: "<i>Le facteur </i>est le groupe de mots qui répond à la question <i>Qui est-ce qui distribue le courrier&nbsp;?</i> <i>Le matin</i> est un complément circonstanciel et <i>le courrier </i>un complément d’objet direct."
				}, {
				    question: "Avec quel mot pouvez-vous compléter le proverbe suivant&nbsp;: «&nbsp;Après la pluie, vient le beau …&nbsp;»&nbsp;?",
				    reponses: ["Tant", "Taon", "Temps"],
				    solution: [2],
				    correction: "<i>Temps </i>ne doit pas être confondu avec ses homonymes <i>tant</i> (adverbe) et <i>taon</i> («&nbsp;grosse mouche&nbsp;»)."
				}, {
				    question: "Observez la finale de ces mots et chassez l’intrus.",
				    reponses: ["Maisonnette", "Fillette", "Assiette"],
				    solution: [2],
				    correction: "Dans <i>assiette</i>, la finale <i>-ette</i> ne correspond pas au suffixe <i>-ette</i> (qui signifie «&nbsp;petit&nbsp;») que l’on retrouve dans <i>maisonnette </i>(petite maison) et <i>fillette</i> (petite fille)."
				}, {
				    question: "Combien de fautes la phrase suivante contient-elle&nbsp;? «&nbsp;Ceux qui on bien répondu aux questions participeront à la finale.&nbsp;»",
				    reponses: ["0", "1", "2"],
				    solution: [1],
				    correction: "Il y a une seule erreur dans la phrase&nbsp;: il faut écrire le verbe <i>ont</i> et non le pronom <i>on.</i>"
				}, {
				    question: "Laquelle de ces deux phrases est à la forme négative&nbsp;?",
				    reponses: ["Le facteur est passé.", "Le facteur n’est pas passé."],
				    solution: [1],
				    correction: "Une phrase à la forme négative contient une négation telle que <i>ne… pas</i>, <i>ne… jamais</i>, <i>ne… rien</i>, etc."
				}, {
				    question: "Lequel de ces mots est construit avec un préfixe et un suffixe&nbsp;?",
				    reponses: ["Bondir", "Rebond", "Rebondissement"],
				    solution: [2],
				    correction: "<i>Rebondissement</i> est le seul de ces trois mots construit avec un préfixe <i>(re-)</i> et un suffixe <i>(-ement).</i> Ce nom est dérivé du verbe <i>bondir.</i>"
				}, {
				    question: "Avec quel mot peut-on compléter le proverbe&nbsp;: «&nbsp;Les bons … font les bons amis&nbsp;»&nbsp;?",
				    reponses: ["Comptes", "Comtes", "Contes"],
				    solution: [0],
				    correction: "<i>Compte </i>(calcul) ne doit pas être confondu avec ses homonymes <i>conte </i>(histoire) et <i>comte </i>(noble)."
				}, {
				    question: "À quel temps est conjugué le verbe <i>distribuer</i> dans la phrase&nbsp;: «&nbsp;Le facteur avait distribué le courrier&nbsp;?&nbsp;»",
				    reponses: ["À l’imparfait", "Au plus-que-parfait", "Au presque parfait"],
				    solution: [1],
				    correction: "Le plus-que-parfait est un temps composé que l’on forme avec l’auxiliaire à l’imparfait (ici, <i>avait</i>) et le participe passé du verbe (ici, <i>distribué</i>). L’imparfait de <i>distribuer</i> dans cette phrase serait <i>distribuait.</i> Quant au presque parfait, c’est un temps qui n’existe pas&nbsp;!"
				}, {
				    question: "Parmi ces noms, lequel n’est pas un pronom&nbsp;?",
				    reponses: ["Me", "Moi", "Mon"],
				    solution: [2],
				    correction: "<i>Me </i>et <i>moi </i>sont des pronoms personnels de la 1<sup>re</sup> personne du singulier <i>(Il me parle. Parle-moi).</i> <i>Mon </i>est un déterminant (ou adjectif) possessif&nbsp;: il précède toujours un nom <i>(mon courrier).</i>"
				}, {
				    question: "Les terminaisons sont les mêmes pour tous les verbes à l’imparfait de l’indicatif.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Tous les verbes conjugués à l’imparfait ont pour terminaisons&nbsp;: <i>-ais, -ais, -ait, -ions, -iez, -aient (j’étais, j’avais, je chantais, je finissais, je partais…). </i>Les verbes du 2<sup>e</sup> groupe ajoutent <i>-iss- </i>au radical de leur infinitif."
				}, {
				    question: "Mettez ces mots au pluriel et chassez l’intrus.",
				    reponses: ["Bijou", "Caribou", "Écrou", "Verrou"],
				    solution: [0],
				    correction: "De ces quatre noms, <i>bijou </i>est le seul dont le pluriel est en <i>x (des bijoux) </i>et non en <i>s (des caribous, des écrous, des verrous).</i>"
				}, {
				    question: "Laquelle de ces phrases est correctement écrite&nbsp;?",
				    reponses: ["Si vous êtes comme çi, si vous êtes comme ça.", "Si vous êtes comme çi, si vous êtes comme ca.", "Si vous êtes comme ci, si vous êtes comme ça.", "Si vous êtes comme ci, si vous êtes comme ca."],
				    solution: [2],
				    correction: "On met une cédille au <i>c</i> devant les voyelles <i>a, o </i>et <i>u</i> pour marquer le son [s] (<i>ça </i>se prononce comme <i>sa </i>; sans la cédille, il se prononcerait comme <i>cas</i>). La lettre <i>c</i> se prononçant toujours [s] devant <i>e</i> et <i>i, </i>on ne met jamais de cédille au <i>c</i> devant ces deux voyelles. Il faut donc écrire <i>ci</i> et <i>ça.</i>"
				}, {
				    question: "Quelle est la forme du verbe <i>dire </i>à la 2<sup>e</sup> personne du pluriel de l’indicatif&nbsp;?",
				    reponses: ["Vous disez", "Vous dites", "Vous dîtes"],
				    solution: [1, 2],
				    correction: "<i>Vous dites </i>est le présent de l’indicatif, <i>vous dîtes </i>est le passé simple de l’indicatif. <i>Vous disez </i>(que l’on construit par analogie avec <i>nous disons</i>) est une forme qui n’existe pas."
				}, {
				    question: "De ces deux termes, lequel est synonyme de <i>partial</i>&nbsp;?",
				    reponses: ["Objectif", "Subjectif"],
				    solution: [1],
				    correction: "Celui qui est partial, c’est celui qui prend parti. Le synonyme de <i>objectif</i> est donc <i>impartial </i>et non <i>partial.</i>"
				}, {
				    question: "Le participe passé d’un verbe conjugué à un temps composé avec l’auxiliaire <i>avoir</i> ne s’accorde jamais avec le sujet.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le participe passé conjugué avec <i>avoir</i> ne peut s’accorder qu’avec le complément d’objet direct si ce complément est placé avant le participe passé. En revanche, il est vrai que le participe passé conjugué avec <i>avoir</i> ne s’accorde jamais avec le sujet. Dans une phrase telle que «&nbsp;Les lettres ont été distribuées&nbsp;»<i>, </i>le participe passé n’est pas conjugué avec <i>avoir, </i>mais avec <i>être </i>(c’est un passif), lui-même conjugué avec <i>avoir.</i>"
				}, {
				    question: "Quelle est la nature de <i>les </i>dans la phrase&nbsp;: «&nbsp;Je les connais tous&nbsp;»&nbsp;?",
				    reponses: ["Article", "Pronom", "Conjonction"],
				    solution: [1],
				    correction: "Le pronom est un mot qui peut occuper la fonction d’un nom&nbsp;: il est le plus souvent sujet ou complément d’un verbe (ici, <i>les </i>est complément d’objet direct du verbe <i>connais</i>). L’article précède toujours un nom et les conjonctions servent à relier deux mots ou groupes de mots."
				}, {
				    question: "Lequel de ces mots ne contient pas le préfixe négatif <i>in-</i>&nbsp;?",
				    reponses: ["Incliné", "Inouï", "Intolérant"],
				    solution: [0],
				    correction: "On peut décomposer <i>inouï </i>en <i>in-</i> + <i>ouï </i>: qui n’est pas ouï (entendu) et <i>intolérant </i>en <i>in-</i> + <i>tolérant </i>(qui n’est pas tolérant). Dans <i>incliné, </i>le préfixe <i>in-</i> marque la direction et s’ajoute au radical <i>-clin-</i> qui signifie «&nbsp;pente&nbsp;» et que l’on retrouve dans <i>anticlinal, déclin</i>…"
				}, {
				    question: "Parmi ces noms, quel est celui dont on ne peut savoir s’il est au singulier ou au pluriel&nbsp;?",
				    reponses: ["Adieux", "Aveux", "Cheveux", "Heureux"],
				    solution: [3],
				    correction: "De ces quatre noms, <i>heureux</i> est le seul dont le pluriel est identique au singulier <i>(un heureux, des heureux).</i> Les autres noms s’écrivent sans <i>x </i>au singulier <i>(un adieu, un aveu, un cheveu)</i>."
				}, {
				    question: "Parmi ces catégories grammaticales, lesquelles sont constituées de mots invariables&nbsp;?",
				    reponses: ["Les adjectifs", "Les adverbes", "Les conjonctions", "Les noms", "Les prépositions"],
				    solution: [1, 2, 4],
				    correction: "Les adverbes <i>(vite, loin, gentiment…)</i>, les conjonctions <i>(et, ou, que, quand…)</i> et les prépositions <i>(à, de, dans, pour…)</i> sont des mots invariables&nbsp;: contrairement aux noms et aux adjectifs, ils ne peuvent recevoir de marques de genre (masculin ou féminin) ni de nombre (singulier ou pluriel)."
				}, {
				    question: "<i>Zéro</i> est un mot qui vient de l’arabe.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le français a emprunté <i>zero</i> à l’italien. Ce <i>zero</i> italien vient d’une déformation de <i>zefiro, </i>issu lui-même de <i>zephirum</i> que les latinistes du Moyen Âge ont créé pour traduire l’arabe <i>sifr</i> qui signifie «&nbsp;vide, zéro&nbsp;»."
				}
			],
            '2011': [
				{
				    question: "Les verbes dont l’infinitif se termine par <i>-ir</i> sont toujours des verbes du 2<sup>e</sup> groupe.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Les verbes du 2<sup>e</sup> groupe ont un infinitif en <i>-ir</i> et font leur 1<sup>re</sup> personne du pluriel au présent de l’indicatif en <i>-issons (nous grandissons), </i>ce qui n’est pas le cas des verbes tels que <i>courir, partir, sortir… </i>qui sont des verbes du 3<sup>e</sup> groupe."
				}, {
				    question: "Mettez ces adjectifs au féminin et chassez l’intrus.",
				    reponses: ["Beau", "Splendide", "Magnifique", "Superbe"],
				    solution: [0],
				    correction: "Parmi ces quatre adjectifs, <i>beau </i>est le seul dont la forme du féminin est différente de celle du masculin. <i>Splendide, magnifique </i>et <i>superbe, </i>comme les autres adjectifs se terminant par un <i>e </i>au masculin, ont la même forme au masculin et au féminin."
				}, {
				    question: "Quelle est l’affirmation juste&nbsp;?",
				    reponses: ["Le verbe s’accorde avec le sujet", "Le sujet s’accorde avec le verbe"],
				    solution: [0],
				    correction: "Le verbe s’accorde en personne et en nombre avec son sujet."
				}, {
				    question: "Ces noms viennent d’une même langue étrangère, sauf un. Lequel&nbsp;?",
				    reponses: ["Football", "Ordinateur", "Sandwich", "Week-end"],
				    solution: [1],
				    correction: "<i>Football, sandwich </i>et<i> week-end</i> sont des noms empruntés à l’anglais. <i>Ordinateur</i> a été créé dans les années 1950, à partir du latin <i>ordo, ordonis, </i>«&nbsp;bon ordre&nbsp;», pour remplacer l’anglais <i>computer.</i>"
				}, {
				    question: "Parmi ces verbes, lequel appartient au registre familier&nbsp;?",
				    reponses: ["Avaler", "Bouffer", "Dévorer", "Manger"],
				    solution: [1],
				    correction: "Le registre familier comprend des mots et des tournures que l’on peut employer dans des échanges avec des personnes proches, familières. <i>Bouffer</i> ne conviendrait pas dans un texte neutre (registre courant) tel qu’un devoir, un courrier administratif, un compte rendu, etc."
				}, {
				    question: "Combien de fautes comporte la phrase&nbsp;: «&nbsp;Je répond au questions du test&nbsp;»&nbsp;?",
				    reponses: ["0", "1", "2", "3"],
				    solution: [2],
				    correction: "<i>Répondre </i>est à la 1<sup>re</sup> personne du singulier du présent de l’indicatif&nbsp;: il doit donc se terminer par <i>s</i> <i>(je réponds).</i> <i>Questions </i>est au pluriel&nbsp;: le déterminant qui le précède doit donc être au pluriel <i>(aux).</i>"
				}, {
				    question: "Quelle est la phrase négative&nbsp;?",
				    reponses: ["Je n’aurai aucune réponse fausse", "J’aurai quelques réponses fausses"],
				    solution: [0],
				    correction: "Une phrase négative comporte une négation telle que <i>ne… pas, ne… jamais, ne… aucun…, </i>qui, le plus souvent encadre le verbe. Une phrase négative peut avoir un sens «&nbsp;positif&nbsp;», et inversement, une phrase positive (ou affirmative) – c'est-à-dire une phrase qui ne comporte pas de négation – peut avoir un sens «&nbsp;négatif&nbsp;»."
				}, {
				    question: "Parmi ces verbes, quels sont ceux qui ont pour infinitif <i>être</i>&nbsp;?",
				    reponses: ["Ai", "Aient", "Ait", "Es", "Est"],
				    solution: [3, 4],
				    correction: "Ces deux formes sont le présent de l’indicatif du verbe<i> être, </i>respectivement à la 2<sup>e</sup> et 3<sup>e</sup> personne du singulier.<i> Ai, aient</i> et <i>ait </i>sont des formes du verbe <i>avoir </i>(1<sup>re</sup> personne du singulier du présent de l’indicatif, 3<sup>e</sup> personne du pluriel du présent du subjonctif, 3<sup>e</sup> personne du singulier du présent du subjonctif)."
				}, {
				    question: "Quel est le complément d’objet dans la phrase suivante&nbsp;: «&nbsp;Le matin, le facteur distribue le courrier&nbsp;»&nbsp;?",
				    reponses: ["Le matin", "Le facteur", "Le courrier"],
				    solution: [2],
				    correction: "Le complément d’objet direct (COD) répond à la question «&nbsp;Qu’est-ce que…&nbsp;?&nbsp;»&nbsp;: <i>Qu’est-ce que distribue le facteur&nbsp;? Le courrier.</i> Il peut également être encadré par «&nbsp;C’est… que&nbsp;»&nbsp;: <i>C’est le courrier que le facteur distribue.</i>"
				}, {
				    question: "S’il y en a, retrouver le ou les pluriels mal orthographiés.",
				    reponses: ["Journeaux	", "Cheveaux", "Châteaux", "Râteaux"],
				    solution: [0, 1],
				    correction: "Pour former le pluriel des noms qui se terminent par <i>-al</i> au singulier (hormis les exceptions qui ont un pluriel en <i>-als</i>), on remplace -<i>al </i>par <i>-aux</i>&nbsp;: <i>journaux, chevaux. </i>Il n’y a donc jamais de <i>e </i>au pluriel dans ces noms."
				}, {
				    question: "Le préfixe se place au début d’un mot, le suffixe à la fin.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Les préfixes et suffixes servent à créer un nouveau mot à partir d’un radical (ou d’un mot). Le préfixe se place au début&nbsp;: <i>in-égal</i>&nbsp;; le suffixe à la fin&nbsp;: <i>égal-iser.</i>"
				}, {
				    question: "Combien de temps compte le mode subjonctif&nbsp;?",
				    reponses: ["1", "2", "3", "4"],
				    solution: [3],
				    correction: "Le subjonctif a deux temps simples&nbsp;: le présent <i>(que je chante)</i> et l’imparfait <i>(que je chantasse)</i>. Il a aussi deux temps composés&nbsp;: le passé <i>(que j’aie chanté)</i> et le plus-que-parfait (<i>que j’eusse chanté)</i>."
				}, {
				    question: "Avec quel mot peut-on compléter l’expression «&nbsp;le cachet de la poste faisant…&nbsp;»&nbsp;?",
				    reponses: ["Foi", "Foie", "Fois"],
				    solution: [0],
				    correction: "L’expression <i>faire foi</i> signifie «&nbsp;être la preuve, être ce qui permet d’attester&nbsp;». Dans ce sens, <i>foi </i>est synonyme de <i>garantie, preuve.</i>"
				}, {
				    question: "Combien de fautes comporte la phrase suivante «&nbsp;La factrice a livrée touts les colis&nbsp;»&nbsp;?",
				    reponses: ["0", "1", "2", "3"],
				    solution: [2],
				    correction: "Le participe passé conjugué avec l’auxiliaire <i>avoir </i>ne s’accorde jamais avec son sujet. Il faut donc écrire <i>livré.</i> Au pluriel, on écrit <i>tous</i> et non <i>touts.</i>"
				}, {
				    question: "Que signifie l’expression <i>passer comme une lettre à la poste</i>&nbsp;?",
				    reponses: ["Passer facilement", "Disparaître", "Passer inaperçu"],
				    solution: [0],
				    correction: "L’expression s’emploie aussi bien à propos d’un aliment que l’on absorbe facilement que d’un fait qui se déroule sans incident."
				}, {
				    question: "Combien d’adverbes contient le proverbe&nbsp;: «&nbsp;Les absents ont toujours tort&nbsp;»&nbsp;?",
				    reponses: ["0", "1", "2", "3"],
				    solution: [1],
				    correction: "Cette phrase comporte un adverbe&nbsp;: <i>toujours.</i> <i>Tort</i> n’est pas un adverbe, mais un nom commun <i>(un tort).</i>"
				}, {
				    question: "Parmi ces mots, lesquels résultent d’une apocope (suppression d’une ou plusieurs syllabes finales d’un mot plus long)&nbsp;?",
				    reponses: ["Métro", "Stylo", "Commando", "Mécano"],
				    solution: [0, 1, 3],
				    correction: "<i>Métro</i> est l’apocope de <i>métropolitain, stylo </i>de<i> stylographe</i> et <i>mécano </i>de <i>mécanicien.</i> Pour ce dernier nom, en plus de l’apocope, il y a eu ajout du suffixe populaire <i>-o.</i>"
				}, {
				    question: "Ces mots peuvent être un verbe ou un nom, sauf un. Lequel&nbsp;?",
				    reponses: ["Cloporte", "Escorte", "Porte", "Sorte"],
				    solution: [0],
				    correction: "<i>Cloporte</i> est un nom masculin (il désigne un petit arthropode qui vit dans les zones humides et sombres)<i>. Escorte </i>est soit le nom <i>une escorte,</i> soit le verbe <i>escorter (j’escorte) </i>;<i> porte</i> est soit le nom <i>une porte, </i>soit le verbe <i>porter (je porte) </i>;<i> sorte</i> est soit le nom <i>une sorte</i>, soit le verbe <i>sortir (que je sorte).</i>"
				}, {
				    question: "Comment écrit-on le verbe <i>interrompre </i>à la 3<sup>e</sup> personne du singulier du présent de l’indicatif&nbsp;?",
				    reponses: ["Il interromp ", "Il interrompt", "Il interromt"],
				    solution: [1],
				    correction: "<i>Interrompre, </i>tout comme <i>rompre, </i>se conjugue toujours sur le même radical (<i>interromp-</i>) et garde son <i>p</i> dans toute sa conjugaison. La 3<sup>e</sup> personne du singulier du présent de l’indicatif se termine par <i>t.</i>"
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["La plupart des facteurs porte une casquette", "La plupart des facteurs portes une casquette", "La plupart des facteurs portent une casquette"],
				    solution: [2],
				    correction: "Lorsque <i>la plupart</i> est suivi d’un nom au pluriel, les accords se font toujours au pluriel. <i>La plupart </i>fonctionne comme un déterminant (ou adjectif) indéfini tel que <i>plusieurs, certains…</i> et non comme un nom (on ne peut pas dire <i>une plupart,</i> on ne peut pas le qualifier par un adjectif)."
				}, {
				    question: "Un <i>e</i> placé devant une consonne double ne porte jamais d’accent.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Lorsqu’il est suivi d’une consonne double (la même consonne répétée), le <i>e</i> se prononce toujours comme s’il était accentué. L’accent est alors inutile."
				}, {
				    question: "Laquelle de ces phrases est correcte&nbsp;?",
				    reponses: ["Pourquoi certains se croivent-ils toujours meilleurs que les autres&nbsp;?", "Pourquoi certains se croyent-ils toujours meilleurs que les autres&nbsp;?", "Pourquoi certains se croient-ils toujours meilleurs que les autres&nbsp;?"],
				    solution: [2],
				    correction: "Le verbe <i>croire</i> n’a jamais pour radical <i>croiv-. </i>Il se conjugue sur le radical <i>croy-</i> lorsque la terminaison commence par une voyelle autre que le <i>e</i> muet <i>(nous croyons, ils croyaient</i>…<i>)</i> et sur le radical <i>croi-</i> lorsque la terminaison est muette <i>(je crois, ils croient…).</i>"
				}, {
				    question: "De ces deux termes, lequel est synonyme de <i>frugal </i>?",
				    reponses: ["Sobre", "Copieux"],
				    solution: [0],
				    correction: "Un repas frugal est un repas qui se compose de mets simples et peu abondants. <i>Copieux</i> est le contraire de <i>frugal.</i>"
				}, {
				    question: "Le participe passé d’un verbe conjugué à un temps composé avec l’auxiliaire <i>avoir</i> ne peut s’accorder qu’avec son complément d’objet direct.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "L’affirmation est exacte puisqu’elle est l’équivalent de «&nbsp;Lorsqu’il faut accorder le participe passé d’un verbe conjugué à un temps composé avec l’auxiliaire <i>avoir</i>, cet accord se fait seulement avec le complément d’objet direct (COD)&nbsp;», sous-entendu «&nbsp;l’accord ne peut pas se faire avec le sujet, par exemple&nbsp;». Le fait de ne pas préciser que le COD doit être placé avant le participe passé ne retire en rien l’exactitude de l’affirmation."
				}, {
				    question: "Dans la phrase suivante, quelle est la nature de laproposition soulignée&nbsp;: «&nbsp;Nous espérons que les participants aux <i>Timbrés de l’orthographe</i> seront nombreux&nbsp;»&nbsp;?",
				    reponses: ["Proposition coordonnée", "Proposition subordonnée relative", "Proposition subordonnée conjonctive"],
				    solution: [2],
				    correction: "Les propositions subordonnées conjonctives sont introduites par des conjonctions de subordination telles que <i>que, si, quand, quoique…</i> Les relatives, elles, sont introduites par un pronom relatif <i>(qui, que, quoi, dont, où)</i> qui est mis à la place de son antécédent. Ici <i>que</i> ne remplace aucun autre mot, il n’a pas d’antécédent, c’est bien une conjonction de subordination. Les propositions coordonnées sont reliées entre elles par une conjonction de coordination <i>(mais, ou, et, donc, or, ni, car).</i>"
				}, {
				    question: "Parmi ces racines, laquelle porte le sens de «&nbsp;soleil&nbsp;»&nbsp;?",
				    reponses: ["Therm-", "Hélio-", "Chrys-"],
				    solution: [1],
				    correction: "La racine <i>hélio-</i> vient du grec <i>helios</i> qui signifie «&nbsp;soleil&nbsp;». Cette racine sert à former des mots tels que <i>héliothérapie, héliogravure…</i>"
				}, {
				    question: "Parmi ces modes, lequel fait partie des modes impersonnels&nbsp;?",
				    reponses: ["Infinitif", "Indicatif", "Impératif"],
				    solution: [0],
				    correction: "Les modes impersonnels sont les modes pour lesquels il n’y a pas de conjugaison en personne, contrairement aux modes personnels pour lesquels la forme du verbe change selon la personne (1<sup>re</sup> personne du singulier, 2<sup>e</sup> personne du singulier…). Ainsi, au présent de l’infinitif, un verbe a une seule forme (<i>manger</i> par exemple), alors qu’au présent de l’indicatif ou de l’impératif, le verbe a plusieurs formes <i>(mange, manges, mangeons…).</i>"
				}, {
				    question: "Parmi ces adjectifs, quels sont ceux dont on ne peut savoir s’ils sont au féminin ou au masculin&nbsp;?",
				    reponses: ["Allègre", "Drôle", "Gaie", "Joviale"],
				    solution: [0, 1],
				    correction: "<i>Gaie</i> et <i>joviale</i> sont les féminins de <i>gai</i> et <i>jovial</i>. Les adjectifs qui se terminent par <i>e</i> au masculin gardent la même forme au féminin&nbsp;: en dehors de tout contexte, on ne peut donc pas savoir si <i>allègre</i> et <i>drôle</i> sont au féminin ou au masculin."
				}, {
				    question: "Lequel de ces mots n’est pas une conjonction de coordination&nbsp;?",
				    reponses: ["Car", "Et", "Ou", "Outre"],
				    solution: [3],
				    correction: "<i>Outre</i> est une préposition ou un adverbe, mais pas une conjonction de coordination."
				}, {
				    question: "Le nom <i>poubelle</i> vient du nom de monsieur Eugène Poubelle qui vécut au xix<sup>e</sup> siècle. Qui était ce personnage&nbsp;?",
				    reponses: ["Un brigand", "Un maraîcher", "Un médecin", "Un préfet"],
				    solution: [3],
				    correction: "En 1884, le préfet de la Seine Eugène Poubelle a rendu obligatoire l’usage de récipients pour le ramassage des ordures ménagères."
				}
			],
            '2012': [
                {
					question: "Parmi ces noms, lequel ne forme pas son pluriel en <i>-x</i>&nbsp;?",
					reponses: ["Pneu ", "Jeu ", "Feu"],
					solution: [0],
					correction: "Le nom <i>pneu, </i>qui est une abréviation de <i>pneumatique,</i> s’écrit avec un <i>s</i> au pluriel&nbsp;: <i>des pneus.</i>"
				}, {
					question: "Parmi ces verbes, quels sont ceux qui ont pour infinitif <i>aller</i>&nbsp;?",
					reponses: ["Allais ", "Iront ", "Vaux ", "Vont"],
					solution: [0, 1, 3],
					correction: "La forme <i>vaux</i> est la 1<sup>re</sup> ou 2<sup>e </sup>personne du singulier du présent de l’indicatif du verbe <i>valoir.</i>"
				}, {
					question: "Comment s’appelle le registre auquel appartiennent les mots <i>bouffer, costaud </i>ou<i> foutu </i>?",
					reponses: ["Le registre familier ", "Le registre rigolo ", "Le registre soutenu"],
					solution: [0],
					correction: "Parmi les registres de langue, le registre familier est celui que l’on utilise dans la conversation courante entre personnes proches, de même niveau. Le registre littéraire est celui que l’on utilise dans les écrits littéraires, dans les discours solennels, lorsqu’on veut marquer une certaine distance vis-à-vis de celui auquel on s’adresse. Le «&nbsp;registre rigolo&nbsp;» n’est pas un registre de langue."
				}, {
					question: "À quelle langue a été emprunté le nom <i>chewing-gum</i>?",
					reponses: ["À l’allemand ", "Au chinois ", "À l’anglais ", "À l’arabe"],
					solution: [2],
					correction: "En anglais, le nom <i>chewing gum </i>est formé du verbe <i>to chew</i> qui signifie «&nbsp;mâcher&nbsp;» et du nom <i>gum</i> qui signifie «&nbsp;gomme&nbsp;»."
				}, {
					question: "<i>Le, la, les</i> sont des articles, mais ce sont aussi des pronoms.",
					reponses: ["Vrai ", "Faux"],
					solution: [0],
					correction: "Lorsqu’ils précèdent un nom, <i>le, la, les</i> sont des articles <i>(le concours).</i> Lorsqu’ils sont compléments d’un verbe, <i>le, la, les </i>sont des pronoms <i>(je le sais).</i>"
				}, {
					question: "La phrase «&nbsp;Réponds aux questions du test&nbsp;» est une phrase&nbsp;:",
					reponses: ["Déclarative ", "Exclamative ", "Impérative ", "Interrogative"],
					solution: [2],
					correction: "Le plus souvent, la phrase impérative sert à donner un ordre, un conseil. Elle n’a pas de groupe sujet."
				}, {
					question: "Combien de fautes la phrase «&nbsp;Le facteur a-t-il fait sa tournée a bicyclette&nbsp;?&nbsp;» compte-t-elle&nbsp;?",
					reponses: ["0 ", "1 ", "2 ", "3"],
					solution: [1],
					correction: "Il faut écrire la préposition <i>à</i> devant le nom <i>bicyclette</i> et non <i>a </i>qui est le verbe <i>avoir</i> à la 3<sup>e</sup> personne du singulier du présent de l’indicatif."
				}, {
					question: "Parmi ces noms, lequel est synonyme de <i>missive </i>?",
					reponses: ["Collection ", "Lettre ", "Mission ", "Projectile"],
					solution: [1],
					correction: "Le nom <i>missive</i> s’emploie comme synonyme littéraire ou plaisant de <i>lettre</i> au sens de «&nbsp;message écrit&nbsp;»."
				}, {
					question: "Parmi ces affirmations concernant les verbes du 2<sup>e</sup> groupe, laquelle ou lesquelles sont vraies&nbsp;?",
					reponses: ["À la 1<sup>re</sup> personne du pluriel du présent de l’indicatif, ils se terminent par <i>-issons</i>.", "Leur infinitif se termine par <i>-ir</i>.", "Leur participe passé se termine par <i>-it</i>."],
					solution: [0],
					correction: "Le participe passé des verbes du 2<sup>e </sup>groupe se termine par <i>i (fini)</i> auquel on ajoute les marques de féminin et de pluriel en cas d’accord."
				}, {
					question: "À l’écrit, lequel de ces adjectifs ne forme pas son féminin comme les trois autres&nbsp;?",
					reponses: ["Barbu ", "Bleu ", "Mou ", "Uni"],
					solution: [2],
					correction: "Le féminin de l’adjectif <i>mou</i> est <i>molle.</i> Pour les trois autres adjectifs, on forme le féminin en ajoutant <i>e</i> à la forme du masculin."
				}, {
					question: "Parmi ces mots, lequel n’est pas une préposition&nbsp;?",
					reponses: ["Avec ", "Bien ", "Chez ", "Dans"],
					solution: [1],
					correction: "<i>Bien </i>n’est pas une préposition, mais un adverbe. Il peut être complément d’un verbe <i>(bien écrire), </i>d’un adjectif <i>(bien aimable) </i>ou d’un autre adverbe <i>(bien vite).</i>"
				}, {
					question: "Avec quel mot doit-on compléter le proverbe «&nbsp;Bien mal … ne profite jamais&nbsp;»&nbsp;?",
					reponses: ["Acquis ", "Acquit ", "Acqui ", "À qui"],
					solution: [0],
					correction: "Le proverbe doit être complété avec le participe passé du verbe <i>acquérir, </i>soit <i>acquis.</i>"
				}, {
					question: "Retrouver le ou les féminins mal orthographiés.",
					reponses: ["Inquiette ", "Replète ", "Simplette ", "Sujète"],
					solution: [0, 3],
					correction: "L’adjectif <i>inquiet</i> a pour féminin <i>inquiète</i> et <i>sujet</i> a pour féminin <i>sujette.</i>"
				}, {
					question: "Selon l’expression, au creux de quoi se trouve-t-on lorsqu’on est dans une période difficile&nbsp;?",
					reponses: ["L’âme ", "La lame ", "La mer ", "La vague"],
					solution: [3],
					correction: "On dit <i>être au creux de la vague </i>(ou <i>dans le creux de la vague</i>) lorsqu’on traverse une période difficile."
				}, {
					question: "Combien de temps compte le mode impératif&nbsp;?",
					reponses: ["1 ", "2 ", "3 ", "4"],
					solution: [1],
					correction: "Le mode impératif compte deux temps&nbsp;: le présent <i>(pars) </i>et le passé composé <i>(sois parti).</i>"
				}, {
					question: "Avec quel auxiliaire les verbes pronominaux doivent-ils se conjuguer aux temps composés&nbsp;?",
					reponses: ["Être ", "Avoir ", "Être <i>ou</i> avoir <i>selon les cas</i>"],
					solution: [0],
					correction: "Les verbes pronominaux se conjuguent avec l’auxiliaire <i>être</i> aux temps composés <i>(se tromper&nbsp; &rarr; il s’est trompé).</i>"
				}, {
					question: "La phrase «&nbsp;Sais-tu si il est déjà parti&nbsp;?&nbsp;» est correcte.",
					reponses: ["Vrai ", "Faux"],
					solution: [1],
					correction: "La conjonction <i>si</i> doit s’élider devant <i>il.</i> Il faut donc écrire <i>s’il est déjà parti.</i>"
				}, {
					question: "Quelle est l’étymologie de l’interjection familière <i>lol</i>&nbsp;?",
					reponses: ["C’est l’acronyme de l’expression anglaise <b><i>l</i></b><i>aughing</i> <b><i>o</i></b><i>ut</i> <b><i>l</i></b><i>oud</i> qui signifie «&nbsp;rire aux éclats&nbsp;».", "C’est le titre d’une revue américaine consacrée aux blagues.", "C’est le nom de scène d’un humoriste anglais qui s’est fait connaître sur internet. "],
					solution: [0],
					correction: "L’acronyme utilisé initialement dans les textos et les discussions en ligne se répand peu à peu dans la langue courante comme interjection pour marquer le caractère comique ou ironique de ce qui vient d’être énoncé."
				}, {
					question: "Parmi ces verbes, lequel ou lesquels ne sont pas à l’imparfait&nbsp;?",
					reponses: ["Il paraissait ", "Il courrait ", "Il gravissait ", "Il devait"],
					solution: [1],
					correction: "La forme <i>courrait</i> est la 3<sup>e</sup> personne du singulier du présent du conditionnel du verbe <i>courir.</i> L’imparfait de <i>courir</i> est <i>il courait.</i> Tous les autres verbes sont à l’imparfait."
				}, {
					question: "Quelle est la fonction du groupe <i>de la bicyclette</i> dans la phrase «&nbsp;Les facteurs font souvent de la bicyclette&nbsp;»&nbsp;?",
					reponses: ["Complément d’objet direct du verbe <i>faire</i>", "Complément d’objet indirect du verbe <i>faire</i>", "Complément circonstanciel de moyen du verbe <i>faire</i>"],
					solution: [0],
					correction: "Le verbe <i>faire</i> est un verbe transitif direct, il se construit avec des compléments d’objet directs <i>(faire quelque chose).</i>"
				}, {
					question: "Avec quel mot doit-on compléter le proverbe «&nbsp;Chose promise, chose …&nbsp;»&nbsp;?",
					reponses: ["Du ", "Dû ", "Due ", "Dûe"],
					solution: [2],
					correction: "Le proverbe doit être complété avec le participe passé du verbe <i>devoir</i> au féminin singulier, qui s’écrit <i>due</i> sans accent circonflexe."
				}, {
					question: "Laquelle de ces phrases est correctement écrite&nbsp;?",
					reponses: ["Elle ne se serait jamais permise cela.", "Elle ne se serait jamais permise celà.", "Elle ne se serait jamais permis cela.", "Elle ne se serait jamais permis celà."],
					solution: [2],
					correction: "Bien que conjugué avec l’auxiliaire <i>être, </i>le participe passé <i>permis</i> ne s’accorde pas avec le sujet. Il ne peut s’accorder qu’avec un complément d’objet direct qui le précède, ce qui n’est pas le cas ici. Le pronom démonstratif <i>cela</i> s’écrit sans accent."
				}, {
					question: "Parmi ces noms, lesquels sont masculins?",
					reponses: ["Antidote ", "Colchique ", "Coriandre ", "Nacre"],
					solution: [0, 1],
					correction: "Les noms <i>coriandre </i>et <i>nacre</i> sont féminins."
				}, {
					question: "Le moyen français, c’est&nbsp;:",
					reponses: ["Le français tel qu’on le parle dans les couches populaires", "Le français courant, qui n’est ni littéraire ni familier", "Le français tel qu’on le parlait aux XIV<sup>e</sup> et XV<sup>e</sup> siècles"],
					solution: [2],
					correction: "Le moyen français est la forme du français qui a succédé à l’ancien français et a précédé le français classique qui l’a peu à peu remplacé au cours du XVI<sup>e</sup> siècle."
				}, {
					question: "Quel est le sens de la racine d’origine grecque <i>rhin-</i> que l’on trouve par exemple dans <i>rhinite </i>ou<i> rhinocéros </i>?",
					reponses: ["Corne ", "Front ", "Nez ", "Tête"],
					solution: [2],
					correction: "La racine <i>rhin-</i> vient du grec ancien <i>rhinos</i> qui signifie «&nbsp;nez&nbsp;»."
				}, {
					question: "À quel temps est conjugué le verbe de la phrase «&nbsp;La factrice aura livré tous les colis avant midi&nbsp;»&nbsp;?",
					reponses: ["Au présent ", "Au futur ", "Au futur proche ", "Au futur antérieur"],
					solution: [3],
					correction: "Le verbe <i>livrer </i>est au futur antérieur&nbsp;: il est formé de l’auxiliaire <i>avoir </i>au futur <i>(aura)</i> et du participe passé du verbe <i>(livré)</i>."
				}, {
					question: "Retrouver le ou les verbes qui ne peuvent pas être verbes d’état.",
					reponses: ["Être ", "Avoir ", "Rester ", "Demeurer"],
					solution: [1],
					correction: "Le verbe <i>avoir</i> ne peut relier un sujet et à son attribut, il ne peut donc pas être verbe d’état. Les autres verbes peuvent être verbes d’état, c'est-à-dire relier un sujet à son attribut&nbsp;: <i>elle est belle, elle reste belle, elle demeure belle.</i>"
				}, {
					question: "Quel est le passé simple du verbe <i>survenir</i>&nbsp;?",
					reponses: ["Ils survenèrent ", "Ils survinssent ", "Ils survinrent"],
					solution: [2],
					correction: "Les verbes construits sur <i>venir</i> forment leur passé simple sur le radical <i>vin-</i> auquel on ajoute la terminaison <i>-rent</i> de la 3<sup>e</sup> personne du pluriel. <i>Ils survinssent</i> est la 3<sup>e</sup> personne du pluriel de l’imparfait du subjonctif."
				}, {
					question: "La phrase «&nbsp;Mais où est donc Ornicar&nbsp;?&nbsp;» permet de retenir la liste&nbsp;:",
					reponses: ["Des conjonctions de subordination", "Des conjonctions de coordination", "Des prépositions", "Des adverbes de liaison"],
					solution: [1],
					correction: "Les conjonctions de coordination sont&nbsp;: <i>mais, ou, et, donc, or, ni, car.</i>"
				}, {
					question: "Le nom <i>maroquin</i> et son dérivé <i>maroquinerie</i> viennent du nom propre <i>Maroc</i>.",
					reponses: ["Vrai ", "Faux"],
					solution: [0],
					correction: "Le maroquin est un type de cuir que l’on fabriquait au Maroc."
				}
            ]
        },
        region: {
            '2011': [
				{
				    question: "Quel est le contraire de <i>peuplé&nbsp;?</i>",
				    reponses: ["Désert", "Habité ", "Occupé"],
				    solution: [0],
				    correction: "Un endroit désert est un endroit où personne n’habite, qui n’est pas peuplé."
				}, {
				    question: "Le passé simple est un temps composé de l’indicatif.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Comme son nom l’indique, le passé simple <i>(il chanta) </i>est un temps simple. Les temps composés sont formés avec un auxiliaire conjugué à un temps simple et le participe passé du verbe <i>(il a chanté)</i>."
				}, {
				    question: "Lequel de ces mots ne fait pas partie de la famille de <i>terre</i>&nbsp;? ",
				    reponses: ["Terrain", "Terrible ", "Atterrir", "Terrasse"],
				    solution: [1],
				    correction: "L’adjectif <i>terrible </i>est un dérivé de <i>terreur, </i>non de <i>terre.</i>"
				}, {
				    question: "Combien de pronoms contient la phrase suivante&nbsp;: «&nbsp;Nous avons lu la lettre que nos correspondants nous ont envoyée&nbsp;»&nbsp;?",
				    reponses: ["Un ", "Deux ", "Trois ", "Quatre"],
				    solution: [2],
				    correction: "Il y a trois pronoms&nbsp;: <i>nous </i>(pronom personnel, sujet de <i>avons lu</i>), <i>que </i>(pronom relatif mis pour <i>lettre</i>, complément d’objet direct de <i>ont envoyée</i>) et <i>nous </i>(pronom personnel, complément d’objet second de <i>ont envoyée</i>)."
				}, {
				    question: "Le nom <i>éolienne </i>vient du nom propre <i>Éole. </i>Qui était Éole&nbsp;?",
				    reponses: ["L’inventeur de cette machine", "Le maire de la ville où fut installée la première éolienne ", "Le dieu du vent dans la mythologie grecque"],
				    solution: [2],
				    correction: "Éole était le dieu du vent dans la mythologie grecque. Les ailes des éoliennes tournent grâce au vent qui souffle."
				}, {
				    question: "Comment appelle-t-on le complément d’objet construit sans préposition&nbsp;?",
				    reponses: ["Le complément d’objet second", "Le complément d’objet indirect", "Le complément d’objet direct"],
				    solution: [2],
				    correction: "Le complément d’objet rattaché au verbe sans préposition est un complément d’objet direct."
				}, {
				    question: "Un mot polysémique est un mot qui a&nbsp;: ",
				    reponses: ["Plusieurs sens", "Plusieurs prononciations ", "Plusieurs orthographes"],
				    solution: [0],
				    correction: "<i>Poly- </i>veut dire «&nbsp;plusieurs&nbsp;» et <i>sèm-, </i>«&nbsp;sens&nbsp;» (comme dans <i>sémantique</i>)."
				}, {
				    question: "À combien de personnes se conjugue l’impératif&nbsp;?",
				    reponses: ["Une ", "Trois ", "Six"],
				    solution: [1],
				    correction: "L’impératif se conjugue à trois personnes&nbsp;: la 2<sup>e</sup> du singulier <i>(écris)</i>, la 1<sup>re </sup>du pluriel <i>(écrivons) </i>et la 2<sup>e</sup> du pluriel <i>(écrivez)</i>."
				}, {
				    question: "Quelle expression se rapproche le plus par son sens de «&nbsp;Zou&nbsp;!&nbsp;»&nbsp;? ",
				    reponses: ["Allez&nbsp;!", "Chouette&nbsp;! ", "Zut!"],
				    solution: [0],
				    correction: "<i>Zou</i> est une interjection employée surtout à l’oral pour inciter à l’action."
				}, {
				    question: "Parmi ces mots, lequel n’a jamais existé en latin&nbsp;? ",
				    reponses: ["Virus", "Motus ", "Rictus", "Papyrus"],
				    solution: [1],
				    correction: "<i>Motus </i>est une création plaisante sur <i>mot </i>auquel on a donné une forme latine."
				}, {
				    question: "Parmi ces mots, lequel est un pronom démonstratif&nbsp;? ",
				    reponses: ["Se", "Ce ", "Leur ", "Ces"],
				    solution: [1],
				    correction: "<i>Ce </i>est un pronom démonstratif (comme <i>cela, ceci...</i>). <i>Se </i>est un pronom personnel, <i>leur </i>est un déterminant possessif ou un pronom personnel et <i>ces </i>est un déterminant démonstratif."
				}, {
				    question: "Que signifie l’élément <i>syn</i>- que l’on trouve par exemple dans <i>synonyme, synchrone, synergie, </i>etc.&nbsp;?",
				    reponses: ["Avec ", "Pendant ", "Sous", "Parmi"],
				    solution: [0],
				    correction: "<i>Syn- </i>signifie «&nbsp;avec&nbsp;», «&nbsp;ensemble&nbsp;»&nbsp;: des synonymes sont des mots <i>(onym-) </i>qui vont ensemble."
				}, {
				    question: "Lequel de ces verbes n’est pas conjugué au futur&nbsp;? ",
				    reponses: ["Nous dirons", "Nous courons ", "Nous vendrons ", "Nous pourrons"],
				    solution: [1],
				    correction: "<i>Nous courons </i>est le présent de l’indicatif de <i>courir. </i>Au futur, le verbe s’écrit avec deux <i>r </i>: <i>nous courrons.</i>"
				}, {
				    question: "Qu’est-ce qu’un homme de lettres&nbsp;? ",
				    reponses: ["Un correcteur", "Un facteur ", "Un écrivain", "Un imprimeur"],
				    solution: [2],
				    correction: "Au pluriel, <i>lettres </i>a le sens de «&nbsp;littérature&nbsp;», sens que l’on retrouve par exemple dans l’expression <i>des études de lettres</i>. Un homme (ou une femme) de lettres, c’est un écrivain."
				}, {
				    question: "La phrase «&nbsp;Je me demande qui a sonné&nbsp;?&nbsp;» est correctement ponctuée. ",
				    reponses: ["Vrai", "Faux "],
				    solution: [1],
				    correction: "«&nbsp;Je me demande qui a sonné&nbsp;» est une phrase déclarative (= je me demande cela) et non une interrogative&nbsp;; elle doit donc se terminer par un point simple. Seules les phrases interrogatives peuvent se terminer par un point d’interrogation (Qui a sonné&nbsp;?)."
				}, {
				    question: "Parmi ces verbes, lequel ne se conjugue pas comme les autres&nbsp;? ",
				    reponses: ["Nettoyer", "Envoyer ", "Aboyer ", "Tutoyer"],
				    solution: [1],
				    correction: "Au futur, <i>envoyer</i> se conjugue sur le radical <i>enverr- (j’enverrai), </i>alors que les autres verbes se conjuguent sur un radical en <i>-oier- (je nettoierai)</i>."
				}, {
				    question: "Lequel de ces mots n’est pas un emprunt à l’italien&nbsp;? ",
				    reponses: ["Trémolo", "Zigoto ", "Risotto ", "Bravo"],
				    solution: [1],
				    correction: "<i>Zigoto </i>est formé sur le nom familier <i>zig (un zig </i>= une personne)<i>. </i>On l’écrivait autrefois <i>zigoteau.</i>"
				}, {
				    question: "<i>Kenavo</i> signifie&nbsp;: ",
				    reponses: ["Au revoir", "Bonjour ", "Merci"],
				    solution: [0],
				    correction: "<i>Kenavo</i> est le salut breton que l’on utilise lorsqu’on quitte quelqu'un."
				}, {
				    question: "Lequel de ces adjectifs est synonyme de <i>concis</i>&nbsp;? ",
				    reponses: ["Prolixe", "Laconique ", "Diffus ", "Diligent"],
				    solution: [1],
				    correction: "<i>Laconique </i>signifie «&nbsp;qui s’exprime en peu de mots&nbsp;»&nbsp;: c’est un synonyme de <i>concis. </i>L’adjectif vient du nom propre <i>Laconie, </i>nom d’une province grecque dont les habitants étaient réputés s’exprimer de manière concise."
				}, {
				    question: "À quel mot l’abréviation <i>4°</i> correspond-elle&nbsp;?",
				    reponses: ["Quatrième", "Quatrièmement ", "Quart ", "Quarto"],
				    solution: [3],
				    correction: "Le <i>o</i> en exposant correspond au <i>o</i> de <i>quarto</i>. L’abréviation de <i>quatrième</i> est <i>4<sup>e</sup></i>, avec un <i>e</i> en exposant."
				}, {
				    question: "Quelle est la fonction du groupe <i>de la viande </i>dans la phrase «&nbsp;Elle fait cuire de la viande&nbsp;»&nbsp;?",
				    reponses: ["Complément d’objet direct", "Complément d’objet indirect ", "Sujet"],
				    solution: [2],
				    correction: "<i>De la viande </i>est sujet du verbe <i>cuire </i>(c’est la viande qui cuit)."
				}, {
				    question: "Parmi ces noms de sport, lequel n’est pas un emprunt à l’anglais&nbsp;? ",
				    reponses: ["Badminton", "Handball ", "Catch ", "Squash"],
				    solution: [1],
				    correction: "<i>Handball </i>est un emprunt à l’allemand (le <i>a </i>se prononce [a] comme en allemand, et non [o] comme dans le nom anglais <i>football</i>)."
				}, {
				    question: "<i>Courrier </i>et <i>courir </i>sont de même famille étymologique.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le nom <i>courrier </i>vient de l’italien <i>corriere, </i>lui-même formé sur le verbe <i>correre </i>qui signifie «&nbsp;courir&nbsp;» et qui, comme <i>courir, </i>remonte au latin <i>currere.</i>"
				}, {
				    question: "Si l’on traduit les éléments qui composent son nom, le dinosaure est&nbsp;:",
				    reponses: ["Un animal géant", "Un monstre ancien ", "Un reptile effrayant ", "Un serpent ailé"],
				    solution: [2],
				    correction: "En grec ancien, <i>sauros </i>veut dire «&nbsp;reptile&nbsp;» et <i>deinos, </i>«&nbsp;terrible, qui inspire la crainte&nbsp;»."
				}, {
				    question: "Quelle est la forme du verbe <i>acquérir </i>qui n’existe pas&nbsp;?",
				    reponses: ["Il acquérait", "Il acquérira ", "Il acquière ", "Il acquît"],
				    solution: [1],
				    correction: "Le futur de <i>acquérir </i>se forme sur le radical <i>acquerr- (il acquerra) </i>et non sur l’infinitif."
				}, {
				    question: "Parmi ces noms familiers employés à propos d’un logement insalubre, lequel est issu de l’alsacien&nbsp;?",
				    reponses: ["Galetas ", "Turne ", "Taudis"],
				    solution: [1],
				    correction: "En alsacien, <i>turn </i>signifie «&nbsp;prison&nbsp;». Il est à rapprocher de l’allemand <i>Turm, </i>«&nbsp;tour&nbsp;»."
				}, {
				    question: "Le nom <i>chicon</i> ne désigne pas le même aliment selon qu’il est employé dans le nord ou le centre-ouest de la France.",
				    reponses: ["Vrai ", "Faux"],
				    solution: [0],
				    correction: "Dans le Nord, le chicon est une endive&nbsp;; dans le centre-ouest de la France, c’est une laitue romaine."
				}
			],
            '2012': [
				{
				    question: "Lequel de ces noms n’a pas un pluriel en <i>-s</i>&nbsp;?",
				    reponses: ["Chou", "Clou", "Sou"],
				    solution: [0],
				    correction: "Les noms qui se terminent par <i>-ou </i>au singulier prennent un <i>s</i> au pluriel, sauf sept noms dont <i>chou (des choux).</i>"
				}, {
				    question: "Les prépositions sont des mots invariables.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Quel que soit son emploi dans la phrase, quels que soient les autres mots avec lesquels elle forme un groupe, une préposition s’écrit toujours de la même façon, elle ne change pas de forme, elle est invariable."
				}, {
				    question: "Lequel de ces mots ne comporte pas de préfixe&nbsp;?",
				    reponses: ["Débattre", "Décembre", "Défaire", "Détour"],
				    solution: [1],
				    correction: "<i>Débattre, défaire </i>et<i> détour</i> sont des dérivés de <i>battre, faire </i>et <i>tour</i> construits avec le préfixe <i>dé-</i> qui peut exprimer le contraire, un renforcement, une direction… <i>Décembre</i> vient du latin <i>decem </i>qui signifie «&nbsp;dix&nbsp;» (c’était le 10<sup>e</sup> mois du calendrier romain)."
				}, {
				    question: "Lequel de ces verbes n’est pas au futur&nbsp;?",
				    reponses: ["Il concourra", "Nous répondrons", "Je jouerais", "Ils gagneront"],
				    solution: [2],
				    correction: "La terminaison <i>-ais</i> est une terminaison du présent du conditionnel et non du futur de l’indicatif."
				}, {
				    question: "La plupart des mots de la langue française viennent&nbsp;: ",
				    reponses: ["De l’anglais", "Du gaulois", "Du latin"],
				    solution: [2],
				    correction: "C’est le latin parlé en Gaule après l’invasion romaine qui a donné naissance au français. Le gaulois n’a pas survécu car ce n’était pas une langue écrite. Le français comporte malgré tout quelques mots d’origine gauloise."
				}, {
				    question: "Quelle est la liste qui donne des déterminants possessifs (ou adjectifs possessifs)&nbsp;?",
				    reponses: ["Le – la – les", "Ce – cette – ces", "Mon – ma – mes"],
				    solution: [2],
				    correction: "<i>Le, la, les</i> sont des articles définis et <i>ce, cette, ces </i>des déterminants démonstratifs (ou adjectifs démonstratifs). Les possessifs servent entre autres à marquer l’appartenance, la possession <i>(mon crayon).</i>"
				}, {
				    question: "Quelle est la liste dont les mots sont présentés dans l’ordre alphabétique&nbsp;?",
				    reponses: ["Chat– cheval – chèvre – chien", "Chien – chat – cheval – chèvre", "Chat – chèvre – cheval – chien"],
				    solution: [0],
				    correction: "Chat – cheval – chèvre – chien"
				}, {
				    question: "Lequel de ces verbes n’est pas un verbe du 2<sup>e</sup> groupe&nbsp;?",
				    reponses: ["Franchir", "Courir", "Gravir"],
				    solution: [1],
				    correction: "Les verbes du 2<sup>e</sup> groupe ont un infinitif en <i>-ir </i>et une 1<sup>re</sup> personne du pluriel du présent de l’indicatif en <i>-issons, </i>ce qui n’est pas le cas de <i>courir (nous courons)</i> qui est un verbe du 3<sup>e</sup> groupe."
				}, {
				    question: "Laquelle de ces expressions est équivalente à <i>basta&nbsp;!</i>",
				    reponses: ["Assez&nbsp;!", "Encore&nbsp;!", "Jamais&nbsp;!"],
				    solution: [0],
				    correction: "En corse, comme en italien, <i>basta</i> signifie «&nbsp;assez, ça suffit&nbsp;». L’interjection est tirée du verbe <i>bastare,</i> qui signifie «&nbsp;suffire&nbsp;»."
				}, {
				    question: "Lequel de ces mots ne fait pas partie de la famille de <i>bord</i>&nbsp;?",
				    reponses: ["Aborder", "Subordonner", "Déborder", "Transborder"],
				    solution: [1],
				    correction: "Le verbe <i>subordonner</i> est construit à partir de <i>ordonner</i> avec <i>sub-</i> qui signifie «&nbsp;sous&nbsp;»&nbsp;: littéralement, subordonner, c’est ordonner, ranger en dessous."
				}, {
				    question: "Combien de pronoms comporte la phrase suivante&nbsp;: «&nbsp;Nous sélectionnerons tous les candidats qui auront bien répondu à ce test&nbsp;»&nbsp;?",
				    reponses: ["0", "1", "2", "3"],
				    solution: [2],
				    correction: "Les deux pronoms sont <i>nous </i>(pronom personnel de la 1<sup>re</sup> personne du pluriel) et <i>qui</i> (pronom relatif ayant pour antécédent <i>candidats</i>)."
				}, {
				    question: "Lequel ou lesquels de ces noms d’animaux viennent d’un nom propre&nbsp;?",
				    reponses: ["Renard", "Bélier", "Paon", "Caméléon"],
				    solution: [0],
				    correction: "À l’origine, <i>renart</i> est le nom que porte l’animal dans <i>Le Roman de Renart.</i> Le nom commun était <i>goupil, </i>mais <i>renard </i>a fini par s’imposer."
				}, {
				    question: "Parmi ces verbes, lequel n’est pas un synonyme des trois autres&nbsp;?",
				    reponses: ["Renoncer", "Dévoyer", "Abandonner", "Se départir"],
				    solution: [1],
				    correction: "Le verbe <i>dévoyer</i> signifie «&nbsp;pervertir, détourner de la morale, du droit chemin&nbsp;»."
				}, {
				    question: "Lequel ou lesquels de ces mots ne sont pas des articles contractés&nbsp;?",
				    reponses: ["Des", "Au", "À", "Du"],
				    solution: [2],
				    correction: "Seul <i>à</i> ne correspond pas à un article contracté, c’est une préposition. <i>Des</i> correspond à la contraction de <i>de les, au </i>à celle de <i>à les</i> et <i>du </i>à celle de <i>de le.</i>"
				}, {
				    question: "Le participe passé d’un verbe conjugué à un temps composé avec l’auxiliaire <i>être</i> s’accorde toujours avec le sujet.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Les verbes pronominaux se conjuguent toujours avec l’auxiliaire <i>être</i> aux temps composés, mais leur participe passé ne s’accorde pas toujours avec le sujet. On écrit <i>elles se sont succédé, ils se sont téléphoné</i> sans accorder le participe passé."
				}, {
				    question: "Comment se conjugue le verbe <i>promouvoir</i> à la 3<sup>e</sup> personne du singulier du présent de l’indicatif&nbsp;?",
				    reponses: ["Il promeuve", "Il promeut", "Il promouvoit", "Il promouvoie"],
				    solution: [1],
				    correction: "La forme <i>promeuve</i> est un présent du subjonctif (1<sup>re</sup> ou 3<sup>e</sup> personne du singulier). Les formes <i>promouvoit </i>et <i>promouvoie </i>n’existent pas."
				}, {
				    question: "Avant de désigner le service d’acheminement du courrier, quel sens avait le nom <i>poste</i>&nbsp;?",
				    reponses: ["Transport maritime", "Relais de chevaux", "Comptoir colonial", "Port d’escale"],
				    solution: [1],
				    correction: "Les postes étaient des étapes sur un parcours où l’on pouvait changer de cheval pour poursuivre sa route."
				}, {
				    question: "Lequel de ces noms ne désigne pas un gâteau à base de pâte briochée&nbsp;?",
				    reponses: ["Ganache", "Kouglof", "Couque"],
				    solution: [0],
				    correction: "La ganache est une crème composée de chocolat fondu et de crème. Le kouglof est une brioche alsacienne et la couque est une brioche de la région du Nord et de Belgique."
				}, {
				    question: "Quel est le sens de la racine <i>phor-</i> que l’on retrouve dans <i>amphore, phosphore, euphorie…</i>?",
				    reponses: ["Monter", "Porter", "Briller", "Cacher"],
				    solution: [1],
				    correction: "L’élément <i>phor-</i> vient du grec <i>pherein</i> qui signifie «&nbsp;porter&nbsp;». L’amphore est le récipient que l’on porte avec deux <i>(amph-)</i> anses, le phosphore porte la lumière <i>(phos-)…</i>"
				}, {
				    question: "Ces mots peuvent être déterminant indéfini (ou adjectif indéfini) ou pronom, sauf un. Lequel&nbsp;?",
				    reponses: ["Aucun", "Certains", "Chaque", "Plusieurs"],
				    solution: [2],
				    correction: "<i>Chaque</i> accompagne toujours un nom, c’est un déterminant indéfini (ou adjectif indéfini). Il ne peut pas être employé seul comme un pronom. Le pronom qui lui correspond est <i>chacun</i>."
				}, {
				    question: "Dans la phrase&nbsp;: «&nbsp;Le jury est composé de plusieurs membres&nbsp;», quelle est la fonction du groupe <i>de plusieurs membres</i>&nbsp;?",
				    reponses: ["Complément de l’adjectif <i>composé</i>", "Complément d’objet indirect du verbe <i>composer</i>", "Complément d’agent du verbe <i>composer</i>"],
				    solution: [2],
				    correction: "On reconnaît le complément d’agent en transformant la phrase à la voix active&nbsp;: il devient le sujet du verbe <i>(plusieurs membres composent le jury).</i>"
				}, {
				    question: "Parmi ces mots, lequel ou lesquels ne commencent pas par un <i>h </i>aspiré&nbsp;?",
				    reponses: ["Handicapé", "Hameçon", "Hérisson", "Hurler"],
				    solution: [1],
				    correction: "Seul <i>hameçon </i>commence par un <i>h </i>muet&nbsp;: on dit <i>l’hameçon </i>et non <i>le hameçon, </i>mais on dit bien <i>le handicapé, le hérisson </i>et <i>je hurle, </i>sans élision."
				}, {
				    question: "Il n’y a pas de futur au subjonctif.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le futur est un temps spécifique à l’indicatif, il n’existe pas aux autres modes."
				}, {
				    question: "Dans quelle phrase les majuscules sont-elles correctement employées&nbsp;?",
				    reponses: ["Les français férus de langue française surveillent leur français.", "Les Français férus de langue française surveillent leur français.", "Les Français férus de langue Française surveillent leur Français.", "Les Français férus de langue française surveillent leur Français."],
				    solution: [1],
				    correction: "On met une majuscule aux noms de peuples <i>(les Français)</i>, mais on n’en met ni aux adjectifs <i>(la langue française) </i>ni aux noms de langue <i>(leur français).</i>"
				}, {
				    question: "Quel est le plus-que-parfait du subjonctif du verbe <i>asseoir</i> à la 3<sup>e</sup> personne du singulier&nbsp;?",
				    reponses: ["Il fût assis", "Il eut assis", "Il eût assis", "Il fut assis"],
				    solution: [2],
				    correction: "<i>Asseoir</i> est un verbe transitif, il se conjugue donc avec <i>avoir</i> aux temps composés. Pour former le plus-que-parfait du subjonctif, on met l’auxiliaire à l’imparfait du subjonctif <i>(avoir –&gt; eût)</i> et on le fait suivre du participe passé du verbe <i>(asseoir –&gt; assis). Il fut assis </i>et<i> il fût assis</i> sont des formes passives&nbsp;; <i>il eut assis</i> est un passé antérieur de l’indicatif."
				}, {
				    question: "En Auvergne, les bergers fabriquaient leurs fromages dans&nbsp;:",
				    reponses: ["Des barons", "Des borons", "Des burons"],
				    solution: [2],
				    correction: "Les burons sont de petites cabanes de bergers. Dans d’autres régions, on parle de <i>jasserie, de mazuc…</i>"
				}, {
				    question: "Les verbes <i>envoyer</i> et <i>voir</i> ont les mêmes terminaisons au présent du subjonctif.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Au présent du subjonctif, tous les verbes (sauf <i>être</i> et<i> avoir</i>) ont les mêmes terminaisons&nbsp;: <i>-e, -es, -e, -ions, -iez, -ent. </i>On écrira dont <i>il faut qu’il envoie, il faut qu’il voie.</i>"
				}
			],
            '2013': [
                {
					question: "Lequel de ces verbes n’est pas un verbe du 3<sup>e</sup> groupe&nbsp;?",
					reponses: ["Applaudir ", "Cueillir ", "Dormir"],
					solution: [0],
					correction: "Le verbe <i>applaudir</i> appartient au 2<sup>e </sup>groupe (on retrouve <i>-iss-</i> dans sa conjugaison&nbsp;: <i>nous applaudissons, applaudissant</i>), ce qui est la caractéristique des verbes de ce groupe."
				},{
					question: "Si un mot commence par un <i>h</i> muet, on ne peut pas faire la liaison avec le mot qui précède.",
					reponses: ["Vrai ", "Faux"],
					solution: [1],
					correction: "C’est lorsqu’un mot commence par un <i>h</i> aspiré que la liaison n’est pas possible. Par exemple, on prononcera <i>les heures</i> en faisant entendre [z] entre <i>les</i> et <i>heures</i> car le <i>h </i>de <i>heure</i> est muet."
				},{
					question: "Parmi ces adjectifs, lequel n’est pas synonyme des trois autres&nbsp;?",
					reponses: ["Gai ", "Jovial ", "Mélancolique ", "Joyeux"],
					solution: [2],
					correction: "L’adjectif <i>mélancolique </i>signifie «&nbsp;qui a des pensées tristes, qui exprime des pensées tristes&nbsp;». Il a donc un sens contraire aux trois autres adjectifs."
				},{
					question: "Devant quelles voyelles faut-il mettre un <i>e </i>après le <i>g</i> pour que celui-ci se prononce [&#658;] (comme dans <i>je</i>)?",
					reponses: ["A", "I ", "O", "U"],
					solution: [0, 2, 3],
					correction: "Devant un <i>i</i>, la lettre <i>g</i> se prononce [&#658;] <i>(girafe, agile...)</i>. Inutile donc de mettre un <i>e</i>. En revanche, devant <i>a, o, u,</i> le <i>g</i> se prononce [g] <i>(gagner, fourgon, aigu…).</i> Il faut donc mettre un <i>e</i> si l’on veut obtenir le son [&#658;] <i>(cageot, orangeade…)</i>."
				},{
					question: "Lequel de ces mots ne fait pas partie de la famille de <i>tour</i>&nbsp;?",
					reponses: ["Entourer ", "Étourdi ", "Contour"],
					solution: [1],
					correction: "On retrouve bien <i>tour</i> dans <i>entourer</i> («&nbsp;disposer sur le tour de quelque chose&nbsp;») et <i>contour </i>(«&nbsp;ligne qui marque le tour de quelque chose&nbsp;»), mais pas dans <i>étourdi</i>."
				},{
					question: "Quelle est la liste qui donne des déterminants démonstratifs (ou adjectifs démonstratifs)&nbsp;?",
					reponses: ["Ce – cette – ces", "Son – sa – ses", "Un – une – des"],
					solution: [0],
					correction: "<i>Son, sa </i>et<i> ses </i>sont des déterminants (ou adjectifs) possessifs et <i>un, une</i> et<i> des </i>sont des articles indéfinis."
				},{
					question: "S’il y en a, lequel ou lesquels de ces verbes ne se terminent pas par <i>d </i>à la 3<sup>e</sup> personne du singulier du présent de l’indicatif&nbsp;?",
					reponses: ["Prendre ", "Rendre ", "Pendre", "Aucun"],
					solution: [3],
					correction: "Ces trois verbes gardent le <i>d</i> du radical de l’infinitif à la 3<sup>e</sup> personne du singulier du présent de l’indicatif (<i>rendre </i>et<i> pendre</i> le gardent d’ailleurs dans toute leur conjugaison). On écrit&nbsp;: <i>il prend, il rend, il pend.</i>"
				},{
					question: "Quel est le groupe de mots qui a pour fonction complément du nom dans la phrase «&nbsp;Le facteur a vendu tous les calendriers de La Poste&nbsp;»&nbsp;?",
					reponses: ["Le facteur ", "Tous les calendriers", "La Poste"],
					solution: [2],
					correction: "Un complément du nom est rattaché par une préposition au nom qu’il précise. Ici, <i>La Poste</i> est complément du nom <i>calendriers.</i>"
				},{
					question: "Dans le Nord, les paroles peu sérieuses ou dépourvues de sens sont appelées&nbsp;:",
					reponses: ["Des carabistouilles ", "Des citrouilles ", "Des grenouilles"],
					solution: [0],
					correction: "Le nom <i>carabistouille, </i>que l’on emploie essentiellement au pluriel, est fréquent dans le Nord et en Belgique. Il figure également dans le titre de différents ouvrages de littérature jeunesse&nbsp;: <i>Mystères et carabistouilles,</i> d’Arnaud Alméras («&nbsp;J’aime lire&nbsp;», Bayard jeunesse, 1999), <i>Castagrogne de Carabistouille, </i>de Marie-Odile Judes («&nbsp;P’tits albums&nbsp;», Flammarion Père Castor, 1998)."
				},{
					question: "Quelle est la fonction du nom <i>finaliste</i> dans la phrase «&nbsp;Nous serons finalistes au concours des Timbrés&nbsp;»&nbsp;?",
					reponses: ["Attribut du sujet <i>nous</i>", "Complément d’objet direct du verbe <i>être</i>", "Complément d’objet indirect du verbe <i>être</i>", "Complément du nom <i>concours</i>"],
					solution: [0],
					correction: "L’attribut est relié au sujet par un verbe d’état (ici, <i>serons</i>). Le verbe <i>être</i> n’a jamais de complément d’objet."
				},{
					question: "Parmi ces noms, lequel ne désigne pas une catégorie grammaticale&nbsp;?",
					reponses: ["Apposition ", "Conjonction ", "Interjection ", "Préposition"],
					solution: [0],
					correction: "Contrairement à <i>conjonction, interjection </i>et <i>préposition</i> qui sont des noms désignant des catégories grammaticales, <i>apposition</i> est le nom que l’on donne à la fonction du nom, du pronom ou du groupe de mots qui complète un autre nom dans un rapport d’équivalence (il désigne le même être ou la même chose que le nom auquel il se rapporte). Dans la phrase: «&nbsp;Passion de tous les Timbrés, l’orthographe est aujourd'hui à l’honneur&nbsp;», <i>passion de tous les Timbrés </i>est apposé au nom <i>orthographe.</i>"
				},{
					question: "Comment s’appelle le temps que l’on forme avec l’auxiliaire au présent du subjonctif et le participe passé&nbsp;?",
					reponses: ["Le parfait du subjonctif", "Le passé composé du subjonctif", "Le passé du subjonctif", "Le plus-que-parfait du subjonctif"],
					solution: [2],
					correction: "Le verbe <i>gagner</i> au passé du subjonctif donne&nbsp;: <i>que j’aie gagné. </i>Il n’existe pas de temps qui porte le nom de <i>parfait du subjonctif </i>ou de <i>passé composé du subjonctif. </i>Le plus-que-parfait du subjonctif est formé avec l’auxiliaire à l’imparfait du subjonctif suivi du participe passé <i>(que j’eusse gagné).</i>"
				},{
					question: "Dans un dictionnaire, que signifie l’abréviation <i>fam. </i>?",
					reponses: ["Fameux ", "Familial ", "Familier ", "Famine"],
					solution: [2],
					correction: "La marque <i>familier, </i>le plus souvent abrégée en <i>fam.</i> dans les dictionnaires, indique que le terme défini s’emploie uniquement dans une communication entre proches, entre personnes qui se connaissent bien."
				},{
					question: "Dans quelle phrase le verbe <i>bouillir</i> est-il correctement conjugué&nbsp;?",
					reponses: ["Je boue d’impatience.", "Je bouille d’impatience.", "Je bous d’impatience.", "Je bouts d’impatience."],
					solution: [2],
					correction: "Tout comme un grand nombre de verbes en <i>-ir</i> du 3<sup>e</sup> groupe <i>(partir, servir, dormir…)</i> qui perdent leur dernière consonne du radical aux trois premières personnes du présent de l’indicatif <i>(je pars, je sers, je dors…), bouillir </i>perd <i>-ill</i> qui correspond à la semi-consonne [j] ([buji&#640;]). On ajoute ensuite la désinence <i>s</i> de la 1<sup>re</sup> personne du singulier du présent de l’indicatif des verbes du 3<sup>e</sup> groupe et on obtient&nbsp;: <i>je bous.</i>"
				},{
					question: "Tous les noms et adjectifs se terminant par <i>-el</i> au masculin singulier doublent le <i>l</i> au féminin.",
					reponses: ["Vrai ", "Faux"],
					solution: [0],
					correction: "Tous les adjectifs se terminant par -<i>el</i> au masculin se terminent par <i>-elle</i> au féminin&nbsp;: <i>annuel&nbsp; &rarr; annuelle&nbsp;; virtuel&nbsp; &rarr; virtuelle…</i>"
				},{
					question: "Dans quelle région le terme familier et péjoratif <i>plouc</i> a-t-il fait son apparition avant de se répandre dans la langue française&nbsp;?",
					reponses: ["En Auvergne ", "En Bretagne ", "En Île-de-France ", "Dans le Nord"],
					solution: [1],
					correction: "L’origine de ce terme familier et péjoratif est incertaine, mais il semblerait qu’il s’agisse d’une formation plaisante faite à partir des noms de communes bretonnes commençant par <i>Ploug- (Plougastel-Daoulas, Plouguerneau, Plougasnou…)</i>."
				},{
					question: "Quelle est la fonction de la subordonnée soulignée dans la phrase «&nbsp;Je ne sais pas quand le facteur passera&nbsp;»&nbsp;?",
					reponses: ["Complément circonstanciel du verbe <i>savoir</i>", "Complément d’agent du verbe <i>savoir</i>", "Complément d’objet direct du verbe <i>savoir</i>", "Complément d’objet indirect du verbe <i>savoir</i>"],
					solution: [2],
					correction: "<i>Savoir</i> est un verbe transitif qui se construit avec un complément d’objet direct <i>(savoir quelque chose).</i> Ici, la proposition peut être remplacée par <i>cela</i> ou <i>le (je ne sais pas cela, je ne le sais pas)</i> qui mettent en évidence la fonction de COD."
				},{
					question: "L’expression <i>de derrière les fagots</i> est synonyme de&nbsp;:",
					reponses: ["Mauvais ", "Moyen ", "Excellent"],
					solution: [2],
					correction: "L’expression s’appliquait à l’origine à un vin que l’on avait laissé vieillir à la cave, derrière les fagots, et qui présentait donc des qualités remarquables."
				},{
					question: "Un contempteur est une personne qui&nbsp;:",
					reponses: ["Admire ", "Dénigre ", "Médite ", "Prie"],
					solution: [1],
					correction: "Le contempteur de quelque chose est celui qui méprise et dénigre cette chose avec violence."
				},{
					question: "Laquelle ou lesquelles de ces phrases comportent un <i>ne </i>explétif&nbsp;?",
					reponses: ["Je crains qu’il ne se soit trompé.", "Je le ferai si ce n’est déjà fait.", "Je ne saurai répondre.", "Ne vous déplaise&nbsp;!"],
					solution: [0],
					correction: "L’adverbe <i>ne </i>est dit explétif lorsqu’il ne sert pas à marquer la négation et que sa présence est facultative <i>(Je crains qu’il ne se soit trompé = je crains qu’il se soit trompé).</i> Dans les trois autres phrases, supprimer le <i>ne</i> changerait le sens de la phrase ou de la proposition."
				},{
					question: "Quelle est la forme du verbe <i>boire</i> à la 1<sup>re</sup> personne du singulier de l’imparfait du subjonctif&nbsp;?",
					reponses: ["Busse ", "Buvasse ", "Buvisse"],
					solution: [0],
					correction: "L’imparfait du subjonctif se forme à partir du passé simple de l’indicatif auquel on ajoute les terminaisons propres à ce temps (<i>-sse</i> pour la 1<sup>re</sup> personne du singulier). Le passé simple de <i>boire</i> est <i>je bus,</i> donc à l’imparfait du subjonctif, on a <i>que je busse.</i>"
				},{
					question: "Combien d’adverbes comporte la phrase «&nbsp;Quelque cinq cents candidats participeront dans quelque temps à la toute dernière épreuve des <i>Timbrés de l’orthographe</i>&nbsp;»&nbsp;?",
					reponses: ["0 ", "1 ", "2 ", "3"],
					solution: [2],
					correction: "Les deux adverbes sont <i>quelque (quelque cinq cents candidats) </i>et <i>toute. Quelque </i>qui précède <i>temps</i> n’est pas un adverbe, mais un déterminant (ou adjectif) indéfini."
				},{
					question: "La phrase «&nbsp;Quant à mon absence, s’en est-elle enquise&nbsp;?&nbsp;» est correcte.",
					reponses: ["Vrai ", "Faux"],
					solution: [0],
					correction: "<i>S’enquérir</i> se construit avec un complément introduit par <i>de (s’enquérir de quelque chose). </i>La pronominalisation de ce complément se fait donc avec <i>en.</i> En tant que verbe pronominal, <i>s’enquérir </i>se conjugue avec l’auxiliaire <i>être </i>aux temps composés et le pronom <i>en </i>doit précéder l’auxiliaire."
				},{
					question: "Si un Toulousain vous dit qu’il a les mains qui pèguent, il veut dire&nbsp;:",
					reponses: ["Qu’il a froid aux mains", "Que ses mains collent", "Que ses mains gercent", "Que ses mains tremblent"],
					solution: [1],
					correction: "Le verbe <i>péguer</i> vient de l’occitan <i>pegar, </i>qui signifie également «&nbsp;coller&nbsp;» et qui est de même famille étymologique que <i>poix </i>(<i>pix, picis</i> en latin)."
				},{
					question: "À quels temps et mode est conjugué le verbe de la proposition subordonnée dans la phrase «&nbsp;Il fallait que le questionnaire fût complété sans erreur&nbsp;»&nbsp;?",
					reponses: ["Passé simple de l’indicatif", "Passé antérieur de l’indicatif", "Imparfait du subjonctif", "Plus-que-parfait du subjonctif"],
					solution: [2],
					correction: "Le verbe de la proposition subordonnée est <i>fût complété</i>. Il s’agit d’une forme passive. Le temps d’un verbe passif est celui de l’auxiliaire <i>être</i> ou celui que le verbe aurait s’il était à la forme active <i>(il fallait que l’on complétât le questionnaire sans erreur).</i> Le verbe de la proposition est donc à l’imparfait du subjonctif."
				},{
					question: "Parmi ces verbes, lequel ou lesquels se conjuguent à tous les temps et tous les modes comme <i>dire </i>?",
					reponses: ["Médire ", "Prédire ", "Redire"],
					solution: [2],
					correction: "Contrairement à <i>dire,</i> <i>prédire</i> et <i>médire </i>ont une forme régulière à la 2<sup>e</sup> personne du pluriel du présent de l’indicatif et de l’impératif <i>(prédisez, médisez)</i> alors que <i>redire</i> présente la même irrégularité que <i>dire</i> <i>(redites).</i>"
				},{
					question: "Les noms des quatre points cardinaux sont des emprunts à l’allemand.",
					reponses: ["Vrai ", "Faux"],
					solution: [1],
					correction: "Les noms des quatre points cardinaux font partie des plus anciens anglicismes du français&nbsp;; ils ont été empruntés au XII<sup>e</sup> siècle à l’ancien anglais&nbsp;: <i>nord</i> vient de <i>north, sud </i>de<i> suth </i>(aujourd'hui <i>south</i>), <i>est </i>de <i>east</i> et <i>ouest</i> de <i>west.</i>"
				}
            ]
        },
        nation: {
            '2011': [
				{
				    question: "On ne met jamais de cédille à un <i>c</i> qui précède un <i>e </i>ou un <i>i.</i>",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "La cédille placée sous un <i>c </i>indique que le <i>c</i> doit se prononcer &nbsp;»se&nbsp;» et non «&nbsp;ke&nbsp;». Mais devant un <i>e</i> ou un <i>i</i>, le <i>c </i>se prononce toujours «&nbsp;se&nbsp;», la cédille est donc inutile. On ne la met que lorsque <i>c</i> précède les voyelles <i>a, o</i> ou <i>u.</i>"
				}, {
				    question: "Quel est le synonyme de <i>timbré</i> pris dans son sens familier&nbsp;?",
				    reponses: ["Cacheté", "Fou", "Sonore"],
				    solution: [1],
				    correction: "Quand on dit de quelqu'un qu’il est timbré, c’est qu’on dit de lui qu’il est fou. Au XIV<sup>e</sup> siècle, le nom <i>timbre</i> désignait une cloche qui ne possédait pas de tympan à l’intérieur et que l’on faisait tinter en la frappant avec un marteau (aujourd'hui encore, on parle du timbre d’une bicyclette, par exemple). <i>Timbre </i>s’est employé ensuite par analogie au figuré comme synonyme de <i>tête</i> (la tête est arrondie comme un timbre). Si l’emploi de <i>timbre </i>pour <i>tête</i> a aujourd'hui disparu, on a gardé <i>timbré </i>dans le sens «&nbsp;qui a reçu un coup sur le timbre, sur la tête&nbsp;» et donc «&nbsp;qui est un peu fou&nbsp;». On disait d’ailleurs autrefois dans le même sens&nbsp;: «&nbsp;il a le timbre fêlé&nbsp;»."
				}, {
				    question: "Les terminaisons du présent du conditionnel sont les mêmes que celles&nbsp;:",
				    reponses: ["Du présent de l’indicatif", "Du futur de l’indicatif ", "De l’imparfait de l’indicatif"],
				    solution: [2],
				    correction: "Tous les verbes conjugués au présent du conditionnel ont les mêmes terminaisons que celles de l’imparfait de l’indicatif. Par exemple&nbsp;: <i>j’aimais (a-i-s), j’aimerais (a-i-s)&nbsp;; ils finissaient (a-i-e-n-t), ils finiraient (a-i-e-n-t)</i>, etc. C’est le radical du futur de l’indicatif qu’on utilise comme radical du présent du conditionnel. Ainsi pour conjuguer un verbe à ce temps, on prend le radical de son futur et on lui ajoute les terminaisons de l’imparfait. Ça marche à tous les coups&nbsp;!"
				}, {
				    question: "Quelle est la liste des articles indéfinis&nbsp;?",
				    reponses: ["Du, de la, des", "Le, la, les ", "Un, une, des"],
				    solution: [2],
				    correction: "<i>Un, une, des </i>sont appelés articles indéfinis parce qu’on les emploie généralement avec des noms qui désignent un être, une chose, etc. dont on n’a pas encore parlé, qui semble inconnu (d’où le terme <i>indéfini</i>), par opposition aux articles définis <i>(le, la, les), </i>qui, eux, sont employés généralement avec des noms qui désignent un être, une chose, etc. dont on a déjà parlé, qui est supposé connu. <i>Du, de la, des </i>sont les articles partitifs. On les emploie généralement pour indiquer qu’on considère une partie d’un tout. Par exemple&nbsp;: <i>Gargantua mange du bœuf </i>(par opposition à <i>Gargantua mange un bœuf </i>ou <i>Gargantua mange le bœuf</i> qui indiqueraient qu’il mange un bœuf en entier)."
				}, {
				    question: "Quel est le sens du radical <i>graph-</i> que l’on retrouve par exemple dans <i>orthographe, géographie, biographie, </i>etc.&nbsp;?",
				    reponses: ["Étudier ", "Écrire ", "Travailler"],
				    solution: [1],
				    correction: "Le radical <i>graph-</i> vient du grec ancien <i>graphein</i> qui signifiait «&nbsp;écrire&nbsp;». Ainsi, l’orthographe, c’est l’art d’écrire droit <i>(ortho-), </i>juste&nbsp;; la géographie, c’est ce que l’on écrit, décrit sur la Terre <i>(géo-)</i>&nbsp;; la biographie, c’est ce que l’on écrit sur la vie <i>(bio-)</i> de quelqu'un."
				}, {
				    question: "Dans quelle phrase <i>facteur</i> est-il complément du nom&nbsp;?",
				    reponses: ["La voiture du facteur est jaune. ", "La voiture jaune appartient au facteur.", "La voiture jaune est celle du facteur."],
				    solution: [0],
				    correction: "Dans cette phrase, <i>facteur</i> est complément du nom <i>voiture, </i>il complète le nom <i>voiture.</i> Dans la phrase <b>b</b>., <i>facteur</i> est complément d’objet indirect du verbe <i>appartenir&nbsp;; </i>et dans la phrase <b>c.</b>, <i>facteur </i>est complément du pronom <i>celle."
				}, {
				    question: "<i>S’amuser </i>et<i> se distraire </i>sont&nbsp;:",
				    reponses: ["Des antonymes ", "Des homonymes ", "Des pseudonymes ", "Des synonymes"],
				    solution: [3],
				    correction: "<i>S’amuser </i>et <i>se distraire </i>ont des sens qui sont proches, qui sont voisins. Ce sont donc des synonymes. Les antonymes (également appelés contraires) sont des mots dont les sens s’opposent (par exemple&nbsp;: <i>grand </i>et <i>petit</i>). Les homonymes sont des mots qui se prononcent de la même façon, mais qui s’écrivent différemment (par exemple <i>ver </i>–<i> ver de terre</i> –<i>, v-e-r </i>et <i>verre –&nbsp;verre à boire&nbsp;– v-e-r-r-e</i>). Un pseudonyme, quant à lui, est un nom, un faux nom, que se choisit une personne pour se faire appeler (par exemple, Pablo Ruiz est plus connu sous son pseudonyme Picasso)."
				}, {
				    question: "L’auxiliaire d’un verbe conjugué au plus-que-parfait est&nbsp;: ",
				    reponses: ["Au présent", "À l’imparfait ", "Au passé simple ", "Au plus-que-parfait"],
				    solution: [1],
				    correction: "Un verbe conjugué au plus-que-parfait est composé de l’auxiliaire <i>être</i> ou <i>avoir</i> à l’imparfait et du participe passé du verbe. Ainsi, le plus-que-parfait du verbe <i>écrire</i> est <i>j’avais écrit.</i> L’auxiliaire au présent sert à former le passé composé (par exemple&nbsp;: <i>j’ai écrit</i>) et l’auxiliaire au passé simple sert à former le passé antérieur (par exemple&nbsp;: <i>j’eus écrit</i>). Si l’auxiliaire est au plus-que-parfait, on obtient un temps surcomposé (par exemple&nbsp;: <i>j’avais eu écrit</i>)."
				}, {
				    question: "Une chocolatine est&nbsp;:",
				    reponses: ["Un bol de chocolat chaud ", "Un bonbon au chocolat", "Un petit pain au chocolat"],
				    solution: [2],
				    correction: "Dans les boulangeries du Sud-Ouest, on vend non pas des «&nbsp;petits pains au chocolat&nbsp;» (ou des «&nbsp;pains au chocolat&nbsp;»), mais des chocolatines. Le nom <i>chocolatine </i>est également utilisé au Québec et au Nouveau-Brunswick."
				}, {
				    question: "On dit d’un collectionneur de timbres que c’est&nbsp;:",
				    reponses: ["Un philatéliste ", "Un timbrophile ", "Un philatimbriste"],
				    solution: [0],
				    correction: "<i>Philatéliste</i> est un dérivé du nom <i>philatélie, </i>lui-même composé&nbsp;: – du radical <i>phil- </i>qui signifie «&nbsp;qui aime, qui est amateur de, qui collectionne&nbsp;» (<i>phil- </i>vient du grec ancien<i> philein</i> qui signifie «&nbsp;aimer&nbsp;»)&nbsp;; – et d’un élément tiré du grec ancien <i>atéleia</i> qui signifie «&nbsp;affranchissement&nbsp;». <i>Timbrophile</i> et <i>philatimbriste</i> sont des créations de pure fantaisie."
				}, {
				    question: "Parmi ces termes, lequel ne désigne pas une catégorie grammaticale&nbsp;?",
				    reponses: ["Interjection", "Épithète ", "Conjonction ", "Adverbe"],
				    solution: [1],
				    correction: "<i>Épithète</i> est le nom d’une fonction et non pas celui d’une catégorie grammaticale. Par exemple, lorsqu’on analyse une phrase telle que «&nbsp;Le meilleur candidat a remporté le concours&nbsp;», on dira que <i>meilleur </i>appartient à la catégorie grammaticale des adjectifs qualificatifs et que sa fonction est épithète du nom <i>candidat</i>."
				}, {
				    question: "Si quelqu'un tire le diable par la queue, cela signifie&nbsp;:",
				    reponses: ["Qu’il part en courant", "Qu’il cherche la bagarre ", "Qu’il manque d’argent"],
				    solution: [2],
				    correction: "<i>Tirer le diable par la queue </i>est une façon imagée de dire «&nbsp;vivre avec très peu de ressources, manquer d’argent&nbsp;». L’origine de l’expression reste incertaine, plusieurs hypothèses ont été émises, mais aucune n’est sûre. En revanche, l’on sait que l’expression existait déjà au début du XVII<sup>e</sup> siècle, mais elle signifiait «&nbsp;travailler beaucoup pour gagner sa vie.&nbsp;»"
				}, {
				    question: "Parmi ces formes verbales, laquelle n’existe pas&nbsp;?",
				    reponses: ["Il résout", "Il résolut ", "Il résolvera ", "Il résolvait"],
				    solution: [2],
				    correction: "Le futur du verbe <i>résoudre</i> se construit sur le radicale <i>résoudr- </i>et non <i>résolv-. </i>On dira donc «&nbsp;demain, il résoudra l’énigme&nbsp;». <i>Il résout</i> est un présent de l’indicatif&nbsp;; <i>il résolut</i> est un passé simple de l’indicatif et <i>il résolvait, </i>un imparfait du subjonctif."
				}, {
				    question: "Parmi ces mots, lequel n’est pas issu du verlan&nbsp;?",
				    reponses: ["Loubard", "Lerche ", "Beur ", "Barjo"],
				    solution: [1],
				    correction: "<i>Lerche</i> s’emploie essentiellement en tournure négative&nbsp;: <i>pas lerche, </i>qui signifie «&nbsp;pas beaucoup&nbsp;». C’est un mot créé à partir de <i>cher</i> selon les principes du <i>largonji, </i>qui est un argot des bouchers qui transforme les mots en remplaçant la consonne initiale par un <i>l </i>(ici le <i>ch </i>de <i>cher</i> devient <i>l</i>), en déplaçant cette consonne initiale en fin de mot (ici, on déplace le <i>ch</i> après <i>ler</i>) et en terminant par un suffixe libre (ici <i>-e</i>). <i>Loufoque, </i>par exemple est le largonji de <i>fou (louf + oque)</i>. Le verlan, lui consiste à inverser les syllabes des mots ou des expressions&nbsp;: <i>verlan</i> est le verlan de <i>l’envers</i> dans <i>à l’envers</i>. Ainsi, <i>chelou </i>est le verlan de <i>louche </i>; <i>beur </i>celui de<i> reub, </i>qui est une façon de prononcer <i>arabe </i>; et <i>barjo </i>est le verlan de <i>jobard.</i>"
				}, {
				    question: "Un point simple peut terminer une phrase impérative.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Seules les phrases exclamatives se terminent obligatoirement par un point d’exclamation (par exemple&nbsp;: <i>Quelle belle journée&nbsp;!</i>). La phrase impérative (celle dans laquelle on donne un ordre ou on émet une interdiction) se termine normalement par un point simple. On peut mettre un point d’exclamation si on veut lui donner davantage de force.</i>"
				}, {
				    question: "Quel est l’infinitif de <i>nous fûmes</i>&nbsp;?",
				    reponses: ["Être", "Faire ", "Fumer"],
				    solution: [0],
				    correction: "<i>Nous fûmes</i> est la 1<sup>re</sup> personne du pluriel du passé simple du verbe <i>être, </i>à ne pas confondre avec <i>nous fîmes</i>, qui est lui, le passé simple de <i>faire. </i>Aucune forme de <i>fumer </i>ne comporte d’accent circonflexe sur le <i>u</i>, et au passé simple, <i>fumer </i>donne <i>nous fumâmes.</i>"
				}, {
				    question: "Comment se termine le proverbe&nbsp;: «&nbsp;Qui sème le vent récolte…&nbsp;»&nbsp;?",
				    reponses: ["La tempête", "Le tempo", "La révolte"],
				    solution: [0],
				    correction: "Le proverbe «&nbsp;Qui sème le vent récolte la tempête&nbsp;» s’emploie pour dire «&nbsp;celui qui met le trouble quelque part doit s’attendre à en subir de fâcheuses conséquences&nbsp;». Ce proverbe relativement récent (il n’est enregistré que dans la 8<sup>e</sup> édition du Dictionnaire de l’Académie française de 1932-1935) est une allusion au Livre d’Osée de l’Ancien Testament&nbsp;: «&nbsp;Puisqu’ils ont semé du vent, ils moissonneront la tempête&nbsp;; ils n’auront pas un épi de blé&nbsp;; ce qui poussera ne donnera point de farine, et s’il y en avait, des étrangers la dévoreraient.&nbsp;» «&nbsp;Qui sème le vent récolte le tempo&nbsp;» est le titre du premier album du rappeur MC Solaar, sorti en 1991."
				}, {
				    question: "Selon son étymologie, <i>peuchère </i>signifie&nbsp;:",
				    reponses: ["Pas cher", "Pécheur", "Prêcheur"],
				    solution: [1],
				    correction: "<i>Peuchère,</i> dont l’emploi ne se limite plus aujourd'hui au sud-est de la France, est une interjection servant à marquer la surprise, l’admiration, l’attendrissement ou la pitié. Il s’agit de la forme francisée du provençal <i>pecaïre</i> qui signifie «&nbsp;pécheur&nbsp;», lequel <i>pecaïre </i>s’employait dès le XIII<sup>e</sup> siècle comme interjection de compassion."
				}, {
				    question: "Quand on va à la ducasse, on va&nbsp;:",
				    reponses: ["Visiter un château", "Faire la fête", "À la chasse"],
				    solution: [1],
				    correction: "<i>Ducasse</i> est un nom propre au nord de la France et à la Belgique et sert à désigner une fête patronale, une fête de village, de quartier, une kermesse. <i>Ducasse</i> est une déformation de <i>dicasse, dicasse </i>étant lui-même une déformation de <i>dédicace </i>pris dans le sens «&nbsp;consécration d’une église, d’un temple&nbsp;», puis par métonymie «&nbsp;fête qui a lieu lors de cette consécration&nbsp;». Aujourd'hui, la ducasse ne revêt plus forcément un caractère religieux."
				}, {
				    question: "Parmi ces expressions, laquelle ne correspond pas à un pléonasme&nbsp;?",
				    reponses: ["Aujourd’hui", "Au fur et à mesure", "En lieu et place de", "Le vivre et le couvert"],
				    solution: [3],
				    correction: "Dans l’expression <i>le vivre et le couvert, </i>équivalent de <i>nourri et logé, vivre </i>signifie «&nbsp;nourriture&nbsp;» (aujourd'hui, on emploie surtout <i>vivres </i>au pluriel&nbsp;: <i>les vivres</i>)&nbsp;; <i>couvert</i> est, lui, à prendre dans le sens qu’il avait autrefois et dont Littré donne la définition suivante&nbsp;: «&nbsp;Logis où l’on est couvert des intempéries&nbsp;». L’expression est souvent transformée en <i>le gîte et le couvert, </i>où là, c’est <i>gîte</i> qui désigne le logement et <i>couvert </i>qui désigne la nourriture (celle qu’on mange quand le couvert est mis). <i>Hui </i>signifie «&nbsp;jour&nbsp;». Ainsi <i>aujourd’hui, </i>c’est «&nbsp;au jour du jour&nbsp;». Quant à <i>fur, </i>c’est un ancien mot qui ne subsiste aujourd'hui plus que dans cette expression, mais qui signifiait «&nbsp;taux, mesure&nbsp;». L’expression <i>au fur </i>s’employait seule dans le sens de «&nbsp;à mesure&nbsp;». Enfin <i>lieu </i>et <i>place</i> sont parfaitement synonymes dans l’expression issue du vocabulaire juridique <i>en lieu et place de</i> qui signifie simplement «&nbsp;à la place de&nbsp;»."
				}, {
				    question: "Quelle est la nature de <i>lesquelles</i> dans la phrase&nbsp;: «&nbsp;Pourriez-vous m’expliquer les règles de l’accord du participe passé, lesquelles règles me semblent bien compliquées&nbsp;?&nbsp;»&nbsp;?",
				    reponses: ["Pronom interrogatif", "Déterminant (ou adjectif) interrogatif", "Pronom relatif", "Déterminant (ou adjectif) relatif"],
				    solution: [3],
				    correction: "<i>Lequel </i>peut être un pronom interrogatif (par exemple&nbsp;: <i>Lequel préfères-tu&nbsp;?</i>) ou un pronom relatif (par exemple&nbsp;: <i>c’est une personne pour laquelle j’ai de la sympathie</i>). Mais ici, lequel est un déterminant relatif (appelé également adjectif relatif). Il se place (comme tous les déterminants) devant un nom déjà cité (ici <i>règles</i>) que l’on reprend dans la proposition qu’il introduit. Le nom déterminé par lequel peut ne pas avoir été cité, mais il se réfère à quelque chose dont on a déjà parlé. C’est ce qui se passe lorsqu’on utilise <i>auquel cas, </i>seul emploi courant du déterminant relatif qui, sinon, est plutôt réservé aux langues juridique, administrative ou littéraire."
				}, {
				    question: "Au XVI<sup>e</sup> siècle, le français a fait de nombreux emprunts à l’italien. Dans quel domaine en particulier&nbsp;?",
				    reponses: ["L’armée", "La gastronomie", "La médecine", "La peinture"],
				    solution: [0],
				    correction: "Au XVI<sup>e</sup> siècle (époque où la cour accueillait de nombreux compatriotes de Catherine de Médicis, épouse du roi de France Henri II), l’italien avait la réputation qu’a aujourd'hui l’anglais en France. Les défenseurs de la langue française de l’époque se plaignaient de l’invasion des italianismes. L’un des domaines le plus touché par ces emprunts est celui de l’armée, de la guerre. De cette époque, nous avons gardé <i>canon </i>(<i>cannone </i>en italien), <i>soldat (soldato), sentinelle (sentinella), cartouche (cartuccia), </i>etc. D’autres domaines comme la musique <i>(piano, violon, concert…) </i>et l’architecture <i>(balustrade, balcon, campanile…)</i> ont été également marqués par les emprunts à l’italien."
				}, {
				    question: "Il existe en français au moins un nom qui, en passant du singulier au pluriel, reste identique à l’écrit, mais change à l’oral.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le plus souvent, le pluriel des noms se marque par l’ajout d’un <i>s</i> ou d’un <i>x </i>à la forme du singulier. Et cet ajout de <i>s</i> ne modifie généralement pas la prononciation du nom&nbsp;: <i>une table, des tables&nbsp;; un jeu, des jeux </i>(mais <i>œuf</i>, où l’on entend le <i>f </i>au singulier change à l’oral puisque le <i>f</i> ne se fait plus entendre&nbsp;: <i>des œufs</i> rime avec <i>eux</i>)<i>.</i> La plupart des noms qui se terminent par <i>al</i> et certains noms qui se terminent par <i>ail</i> changent à l’écrit et à l’oral&nbsp;: <i>un cheval, des chevaux&nbsp;; un travail, des travaux.</i> Enfin, les noms qui se terminent par <i>s, x </i>ou <i>z </i>au singulier ne prennent pas de marque de pluriel (ou plus exactement, ils prennent la marque «&nbsp;zéro&nbsp;») et gardent donc la même forme à l’écrit et à l’oral&nbsp;: <i>un tapis, des tapis&nbsp;; un prix, des prix&nbsp;; un nez, des nez.</i> Sauf… <i>os </i>qui s’écrit de la même façon au singulier et au pluriel. Mais à l’oral, <i>os </i>perd son <i>s</i> quand il est au pluriel&nbsp;: <i>des</i> <i>os </i>rime avec <i>des eaux </i>(e-a-u-x)."
				}, {
				    question: "Parmi ces noms, un seul ne provient pas d’un nom propre. Lequel&nbsp;?",
				    reponses: ["Sansonnet", "Robinet", "Martinet", "Estaminet"],
				    solution: [3],
				    correction: "Si l’étymologie de <i>estaminet</i> (petit café, débit de boisson populaire) n’est pas certaine, les linguistes et lexicographes s’accordent à dire que c’est un emprunt au wallon <i>staminê </i>(de même sens) qui lui-même viendrait sans doute du wallon <i>stamon </i>qui désigne le poteau auquel la vache est liée près de sa mangeoire, en référence aux poteaux que l’on trouvait dans ces cafés. <i>Sansonnet</i> (autre nom de l’étourneau) et <i>martinet </i>sont des diminutifs respectifs des prénoms <i>Sansom </i>et <i>Martin, </i>sans que l’on sache exactement expliquer le lien entre le prénom et l’oiseau. <i>Robinet</i> est lui aussi un diminutif, celui de <i>Robin, </i>nom que l’on donnait souvent au Moyen Âge au mouton. Si le dispositif servant à régler le débit d’un fluide s’appelle <i>robinet, </i>c’est que les premiers robinets avaient souvent la forme d’une tête de mouton."
				}, {
				    question: "Quels sont les temps et mode de <i>asseoir</i> dans la phrase&nbsp;: «&nbsp;Il fut assis toute la journée&nbsp;»&nbsp;?",
				    reponses: ["Passé simple de l’indicatif", "Passé antérieur de l’indicatif", "Passé du subjonctif", "Plus-que-parfait du subjonctif"],
				    solution: [0],
				    correction: "Bien que <i>fut assis</i> soit une forme composée, il s’agit bien d’un passé simple de l’indicatif, le verbe <i>asseoir</i> étant ici conjugué au passif (ce qui explique la forme composée). <i>Asseoir </i>est un verbe transitif qui se conjugue avec l’auxiliaire <i>avoir. </i>Ainsi, son passé composé est <i>il a assis </i>(et non <i>il est assis</i> qui est le présent de son passif)."
				}, {
				    question: "Parmi ces noms, lequel n’est pas issu de l’alsacien&nbsp;?",
				    reponses: ["Choucroute", "Kouglof", "Muesli", "Quetsche"],
				    solution: [2],
				    correction: "<i>Muesli </i>est un emprunt au suisse-allemand <i>Muësli, </i>lui-même formé sur <i>Muës</i> qui signifie «&nbsp;purée&nbsp;» avec le suffixe diminutif <i>-li. </i>C’est le docteur Bircher-Benner, diététicien à Zurich, qui a mis au point au début du xx<sup>e</sup> siècle la recette du muesli qui se composait alors de flocons d’avoine trempé dans du lait sucré et accompagné de pommes et de noisettes ou d’amandes râpées. <i>Choucroute </i>vient de l’alsacien <i>sûrkrût </i>(<i>sûr </i>signifiant «&nbsp;aigre&nbsp;» et <i>krût</i> «&nbsp;herbe&nbsp;») et non de <i>chou </i>et <i>croûte</i>. <i>Kouglof </i>(avec ses nombreuses variantes selon les lieux&nbsp;: <i>kougloupf, kougelhopf, glouglouf…</i>&nbsp;)est également un nom alsacien <i>gugelhupf </i>où <i>gugel</i> veut dire «&nbsp;boule&nbsp;» et <i>hupf </i>«&nbsp;levée avec de la levure&nbsp;». Quant à <i>quetsche, </i>c’est un mot alsacien lui-même emprunté à l’allemand <i>Zwetsche</i>."
				}, {
				    question: "Le nom <i>bijou</i> a été emprunté au breton.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Bijou</i> vient du breton <i>bizou</i> qui signifie «&nbsp;anneau&nbsp;». C’est un dérivé de <i>biz, </i>qui, lui, signifie «&nbsp;doigt&nbsp;». L’hypothèse du linguiste Pierre Guiraud selon laquelle <i>bijou</i> serait un nom wallon issu de l’ancien verbe <i>biseler, </i>qui signifiait «&nbsp;tailler en biseau&nbsp;» est compromise par le fait que la première attestation de <i>bijou </i>se trouve dans un texte breton."
				}
			],
            '2012': [
				{
				    question: "On peut dire de <i>vert</i>, <i>verre</i>, <i>ver</i> et <i>vers</i> qu’ils sont&nbsp;:",
				    reponses: ["Antonymes", "Synonymes", "Homonymes"],
				    solution: [2],
				    correction: "Des <i>homonymes</i> sont des mots qui se prononcent de la même façon (la racine <i>homo-</i> signifie «&nbsp;même, identique&nbsp;»). Des <i>antonymes</i> ont des sens contraires, des <i>synonymes</i> ont des sens proches."
				}, {
				    question: "Quelle est la fonction de <i>leur</i> dans la phrase «&nbsp;Je leur écrirai la semaine prochaine&nbsp;»&nbsp;?",
				    reponses: ["Complément d’objet direct  du verbe écrire", "Complément d’objet indirect  du verbe écrire ", "Complément circonstanciel du verbe écrire "],
				    solution: [1],
				    correction: "Le complément d’objet indirect est relié au verbe par une préposition <i>(j’écrirai à eux…)</i>."
				}, {
				    question: "Il n’y a pas de 1<sup>re</sup> personne du singulier à l’impératif.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "L’impératif ne se conjugue qu’à trois personnes&nbsp;: la 2<sup>e</sup> personne du singulier <i>(parle)</i>, la 1<sup>re</sup> personne du pluriel <i>(parlons)</i> et la 2<sup>e</sup> personne du pluriel <i>(parlez).</i>"
				}, {
				    question: "Que peut-on dire de la phrase «&nbsp;Que ce test est facile&nbsp;!&nbsp;»&nbsp;?",
				    reponses: ["C’est une phrase interrogative", "C’est une phrase exclamative", "C’est une phrase déclarative"],
				    solution: [1],
				    correction: "Les phrases exclamatives se terminent par un point d’exclamation. L’adverbe <i>que</i> placé en tête de phrase est caractéristique de ce type de phrase."
				}, {
				    question: "L’accent aigu peut porter&nbsp;:",
				    reponses: ["Sur toutes les voyelles, sauf y", "Seulement sur a, e et u", "Seulement sur e"],
				    solution: [2],
				    correction: "Le <i>e</i> est la seule voyelle à pouvoir porter un accent aigu. L’accent grave peut porter sur le <i>e, </i>le <i>a</i> et le <i>u. </i>Quant à l’accent circonflexe, il peut porter sur toutes les voyelles, sauf le <i>y.</i>"
				}, {
				    question: "Parmi ces mots, lequel ou lesquels ne sont pas des déterminants&nbsp;?",
				    reponses: ["Cet", "Mon", "Se", "Un"],
				    solution: [2],
				    correction: "<i>Se</i> est le pronom personnel réfléchi de la 3<sup>e</sup> personne singulier ou pluriel. Il ne s’emploie jamais pour déterminer un nom."
				}, {
				    question: "Devant quelle ou quelles lettres écrit-on <i>m</i> au lieu de <i>n</i>&nbsp;?",
				    reponses: ["B", "D", "M", "P"],
				    solution: [0, 2, 3],
				    correction: "Hormis dans quelques exceptions, on écrit <i>m</i> au lieu de <i>n</i> devant <i>m, b </i>et <i>p&nbsp;: immédiat, imbattable, impair.</i>"
				}, {
				    question: "Ces mots peuvent être un verbe ou un nom, sauf un. Lequel&nbsp;?",
				    reponses: ["Remplace", "Glace", "Place", "Trace"],
				    solution: [0],
				    correction: "<i>Remplace</i> est une forme du verbe <i>remplacer, </i>mais ce n’est pas un nom. <i>Glace </i>est soit le nom <i>(une glace), </i>soit le verbe <i>glacer (il glace)&nbsp;; place</i> est soit le nom <i>(une place), </i>soit le verbe <i>placer (il place)&nbsp;; trace </i>est soit le nom <i>(une trace), </i>soit le verbe <i>tracer (il trace).</i>"
				}, {
				    question: "Dans quelle région de France utilise-t-on le nom <i>puy</i> pour désigner un sommet montagneux&nbsp;?",
				    reponses: ["En Auvergne", "En Bretagne", "En Picardie"],
				    solution: [0],
				    correction: "Les <i>puys</i> sont des sommets montagneux, souvent d’origine volcanique. Un des départements de l’Auvergne est le Puy-de-Dôme qui porte le nom d’un des anciens volcans de la région."
				}, {
				    question: "Ces noms désignent des types de lettres particulières, sauf un. Lequel&nbsp;?",
				    reponses: ["Un aérogramme", "Une bulle", "Une épître", "Une coursive"],
				    solution: [3],
				    correction: "Une <i>coursive</i> est un couloir que l’on trouve à bord d’un navire. L’<i>aérogramme</i> est une lettre qui est transportée par avion, la <i>bulle </i>est une lettre écrite par un pape et l’<i>épître</i> est une lettre écrite par un auteur ancien ou un apôtre."
				}, {
				    question: "Parmi ces termes, lequel ne désigne pas une fonction grammaticale&nbsp;?",
				    reponses: ["Attribut", "Épithète", "Apostrophe", "Interjection"],
				    solution: [3],
				    correction: "L’<i>interjection</i> est une catégorie grammaticale qui regroupe des mots tels que <i>ha&nbsp;! ouf&nbsp;!</i> Un mot est en fonction d’<i>attribut</i> lorsqu’il se rapporte au sujet ou au complément d’objet direct par l’intermédiaire d’un verbe. Un adjectif est <i>épithète</i> lorsqu’il se rapporte directement à un nom ou à un pronom. L’<i>apostrophe</i> est le mot utilisé dans la phrase pour désigner l’être auquel on s’adresse."
				}, {
				    question: "Observer comment sont formés ces noms et trouver l’intrus.",
				    reponses: ["Biscuit", "Biberon", "Bifidus", "Bipède"],
				    solution: [1],
				    correction: "Dans <i>biberon, bi</i> ne correspond pas au préfixe <i>bi-</i> («&nbsp;deux&nbsp;») que l’on retrouve dans les autres noms."
				}, {
				    question: "Parmi ces formes verbales, laquelle ou lesquelles n’existent pas&nbsp;?",
				    reponses: ["Il accueillira", "Il émouvra", "Il prévoira", "Il résoudra"],
				    solution: [0],
				    correction: "Le futur du verbe <i>accueillir</i> se construit sur le radical <i>accueiller-.</i> On dit donc <i>il accueillera. Émouvra </i>est le futur de <i>émouvoir, prévoira</i> celui de <i>prévoir</i> et <i>résoudra </i>celui de <i>résoudre</i>."
				}, {
				    question: "Parmi ces mots, lequel ou lesquels ne sont pas des acronymes&nbsp;?",
				    reponses: ["Radar", "Spam", "Laser", "Fivète"],
				    solution: [1],
				    correction: "<i>Spam</i> est un mot anglais tiré du nom d’une marque de jambon en boîte sans cesse répété par les Monty Python dans un de leurs sketchs. <i>Radar</i> est l’acronyme de <b><i>ra</i></b><i>dio <b>d</b>etecting <b>a</b>nd <b>r</b>anging</i>, <i>laser</i> celui de <b><i>l</i></b><i>ight <b>a</b>mplification by <b>s</b>timulated <b>e</b>mission of <b>r</b>adiation</i> et <i>fivète</i>, celui de <b><i>f</i></b><i>écondation <b>i</b>n <b>v</b>itro <b>e</b>t <b>t</b>ransfert d'<b>e</b>mbryon</i>."
				}, {
				    question: "Quelle est la phrase correctement ponctuée&nbsp;?",
				    reponses: ["Ceux, qui aiment jouer avec la langue française, sont aujourd'hui à la Sorbonne", "Ceux qui aiment jouer avec la langue française, sont aujourd'hui à la Sorbonne", "Ceux qui aiment jouer avec la langue française sont aujourd'hui à la Sorbonne"],
				    solution: [2],
				    correction: "On ne sépare jamais un verbe de son sujet par une virgule, même si le sujet est long."
				}, {
				    question: "Dans quelle phrase, le verbe <i>élire</i> est-il correctement conjugué&nbsp;?",
				    reponses: ["Les Français élisèrent un nouveau président", "Les Français élirent un nouveau président", "Les Français élurent un nouveau président"],
				    solution: [2],
				    correction: "Le verbe <i>élire</i> se conjugue sur le même modèle que <i>lire&nbsp;: </i>son passé simple est en <i>u</i> et non en <i>i.</i> La terminaison <i>-èrent</i> est réservée aux verbes du 1<sup>er</sup> groupe."
				}, {
				    question: "Quelle expression emploie-t-on pour parler de l’argent&nbsp;?",
				    reponses: ["Le nœud de la guerre", "Le nerf de la guerre", "Le jeu de la guerre", "Le fer de la guerre"],
				    solution: [1],
				    correction: "Dans cette expression, <i>nerf</i> a gardé le sens figuré qu’il avait en latin «&nbsp;force, partie essentielle&nbsp;». C’est parce que les finances sont cruciales dans une guerre qu’on emploie cette expression pour parler de l’argent."
				}, {
				    question: "À quelle langue régionale ou à quel dialecte a été emprunté l’adverbe familier quèsaco&nbsp;?",
				    reponses: ["Au provençal", "Au breton", "À l’alsacien", "Au normand"],
				    solution: [0],
				    correction: "L’adverbe <i>quèsaco</i> qui signifie «&nbsp;qu’est-ce que c’est&nbsp;?&nbsp;» est une adaptation de l’expression provençale <i>qu’es aquò</i>, de même sens."
				}, {
				    question: "Qu’est-ce qu’un verbe défectif&nbsp;?",
				    reponses: ["Un verbe qui ne se conjugue pas à tous les temps", "Un verbe qui n’admet pas de complément d’objet direct", "Un verbe qui ne peut se mettre à la voix passive"],
				    solution: [0],
				    correction: "Un verbe «&nbsp;défectif&nbsp;» est un verbe dont certaines formes font «&nbsp;défaut&nbsp;». <i>Paître, </i>par exemple, n’a ni passé simple, ni imparfait du subjonctif, ni participe passé (il ne se conjugue donc pas aux temps composés)."
				}, {
				    question: "Celui qui rompt les chiens&nbsp;: ",
				    reponses: ["S’enfuit devant un danger", "Met fin à une conversation qui tourne en sa défaveur", "Met fin à un long célibat"],
				    solution: [1],
				    correction: "L’expression est utilisée au sens propre dans le vocabulaire de la chasse et signifie «&nbsp;rappeler les chiens pour leur faire cesser leur poursuite&nbsp;»."
				}, {
				    question: "Parmi ces noms, lequel ne fait pas partie de la famille étymologique des trois autres&nbsp;?",
				    reponses: ["Chien", "Chenil", "Chiot", "Chenet"],
				    solution: [2],
				    correction: "D’abord écrit <i>chiaux, chiot </i>est une forme dialectale de l’ancien français <i>chael, </i>lui-même issu du latin <i>catulus, </i>qui désignait d’une façon générale le petit d’un animal. Il est donc sans rapport avec <i>canis</i> qui a donné <i>chien </i>(d’abord <i>chen</i>, dont sont issus <i>chenil</i> et <i>chenet, </i>les chenets étant souvent décorés de têtes de chien sculptées)."
				}, {
				    question: "Quelle est la fonction de la proposition soulignée dans la phrase&nbsp;: «&nbsp;Je ne saurais douter <u>que vous répondrez correctement à la question</u>&nbsp;»&nbsp;?",
				    reponses: ["Complément d’objet direct du verbe <i>savoir</i>", "Complément d’objet indirect du verbe <i>savoir</i>", "Complément d’objet direct du verbe <i>douter</i>", "Complément d’objet indirect du verbe <i>douter</i>"],
				    solution: [3],
				    correction: "Le verbe <i>douter</i> construit ses compléments d’objet avec la préposition <i>de</i> <i>(douter de quelque chose).</i> La préposition disparaît lorsque le complément est une proposition subordonnée complétive. Cela n’en reste pas moins un complément d’objet indirect."
				}, {
				    question: "Parmi les adjectifs suivants, lequel est un gentilé&nbsp;?",
				    reponses: ["Gaullien", "Républicain", "Cégétiste", "Français"],
				    solution: [3],
				    correction: "Le gentilé est le dérivé d’un nom propre de lieu qui sert entre autres à nommer les habitants de ce lieu. <i>Français</i> est ainsi le gentilé de <i>France</i>."
				}, {
				    question: "Lorsqu’on fait chabrot&nbsp;:",
				    reponses: ["On revient bredouille d’une partie de chasse ou de pêche", "On termine une partie de belote en emportant le dernier pli", "On verse du vin dans le reste de sa soupe ou de son bouillon", "On tremblote de la voix, comme une chèvre"],
				    solution: [2],
				    correction: "Il existe la variante <i>faire chabrol. </i>Cette expression est surtout utilisée dans le centre-ouest et le sud-ouest de la France."
				}, {
				    question: "Parmi ces mots, lequel ou lesquels ne sont pas des mots-valises&nbsp;?",
				    reponses: ["Courriel", "Logiciel", "Fadette", "Mobinaute"],
				    solution: [1],
				    correction: "Un mot-valise est un mot créé à partir de deux autres dont on n’a gardé qu’une partie. Le nom <i>logiciel</i> est un nom dérivé de <i>logique</i>.<i> Courriel </i>a été créé à partir de <i>courri(er) </i>et de <i>él(ectronique), fadette</i> à partir de <i>fa(cture) </i>et de <i>dét(aillé),</i> et <i>mobinaute</i> à partir de <i>mobi(le) </i>et <i>(inter)naute.</i>"
				}, {
				    question: "Lorsqu’un Lyonnais va à la fête, il va&nbsp;:",
				    reponses: ["À la vogue", "À la bogue", "À la mogue", "À la rogue"],
				    solution: [0],
				    correction: "Attesté dès le XVI<sup>e</sup> siècle dans la région lyonnaise, le nom <i>vogue </i>pris dans le sens de «&nbsp;fête&nbsp;» tend à se répandre dans le sud-est de la France."
				}, {
				    question: "Le verbe <i>satisfaire</i> se conjugue à tous les temps et tous les modes sur le modèle de <i>faire</i>.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Le verbe <i>satisfaire</i> suit entièrement la conjugaison de <i>faire. </i>On dira ainsi <i>vous satisfaites </i>(et non <i>vous satisfaisez</i>)."
				}
			],
            '2013': [
                				{
					question: "Lequel de ces adjectifs n’est pas synonyme de <i>timbré</i>&nbsp;?",
					reponses: ["Affranchi", "Fou", "Libre"],
					solution: [2],
					correction: "<i>Timbré</i> n’a pas pour synonyme <i>libre. </i>Il a pour synonyme <i>affranchi</i> quand on parle d’une lettre, d’une enveloppe. Il a pour synonyme <i>fou</i> quand il est pris dans son sens figuré."
				},{
					question: "Dans l’ouest de la France, une poche est aussi&nbsp;:",
					reponses: ["Une chaussure", "Un sac", "Un mouchoir"],
					solution: [1],
					correction: "La poche est le sac en plastique ou en papier dans lequel on met ses courses, ce que l’on vient d’acheter. On emploie aussi dans ce sens <i>pochon.</i>"
				},{
					question: "Le nom <i>impératif </i>désigne un mode.",
					reponses: ["Vrai", "Faux"],
					solution: [0],
					correction: "Le mode impératif est celui qui permet d’exprimer un ordre, une interdiction, un conseil. Il fait partie des modes personnels."
				},{
					question: "Donner sa langue au chat, c’est&nbsp;: ",
					reponses: ["Raconter des histoires, des mensonges", "Demander la solution à une question", "Avoir quelque chose dans la gorge qui gêne pour parler"],
					solution: [1],
					correction: "Lorsqu’on ne connaît pas la réponse à une question posée et qu’on la demande, on dit qu’on donne sa langue au chat. Avoir quelque chose dans la gorge qui gêne pour parler, c’est avoir un chat dans la gorge."
				},{
					question: "On met une cédille au <i>c </i>:",
					reponses: ["Parce que c’est plus joli", "Pour montrer que le <i>c</i> se prononce [k] comme dans <i>queue</i>", "Pour montrer que le <i>c</i> se prononce [s] comme dans <i>ce</i>"],
					solution: [2],
					correction: "On écrit <i>c</i> avec une cédille devant <i>a, o</i> et <i>u</i> pour montrer que le <i>c</i> se prononce [s]. Sans cette cédille, le <i>c</i> se prononce [k] devant ces voyelles."
				},{
					question: "Parmi ces mots, lequel ou lesquels ne sont pas des pronoms&nbsp;?",
					reponses: ["Le", "Ce", "Cet", "Se"],
					solution: [2],
					correction: "<i>Cet</i> est un déterminant (ou adjectif) démonstratif&nbsp;: il accompagne toujours un nom."
				},{
					question: "Quelle est la terminaison du participe passé des verbes du 1<sup>er</sup> groupe&nbsp;?",
					reponses: ["É", "Er", "Ez", "Ais"],
					solution: [0],
					correction: "Tous les verbes du 1<sup>er</sup> groupe ont un participe passé qui se termine par <i>é</i> (hormis les cas d’accord). Il est donc important de bien identifier le temps d’un verbe qui se termine par le son [e] avant de l’écrire."
				},{
					question: "La terminaison <i>-ais</i> est une terminaison&nbsp;:",
					reponses: ["Du futur", "Du présent du conditionnel", "De l’imparfait", "Du passé simple"],
					solution: [1,2],
					correction: "La terminaison<i> -ais</i> est celle de la 1<sup>re</sup> ou 2<sup>e</sup> personne du singulier de l’imparfait et du conditionnel présent."
				},{
					question: "Combien d’articles comporte la phrase «&nbsp;J’ai mis ma lettre dans une enveloppe et je dois la poster dès que possible&nbsp;»&nbsp;?",
					reponses: ["1", "2", "3"],
					solution: [0],
					correction: "Le seul article est <i>une</i> qui est un article indéfini. <i>Ma</i> est un déterminant possessif (ou adjectif possessif) et <i>la</i> est un pronom personnel."
				},{
					question: "Observer comment sont formés ces adjectifs et trouver l’intrus.",
					reponses: ["Illogique", "Impeccable", "Insomniaque", "Irascible"],
					solution: [3],
					correction: "Les adjectifs <i>illogique, impeccable et insomniaque </i>sont formés avec le préfixe <i>in-</i> qui marque la négation. Dans <i>irascible, </i>on n’a pas affaire au préfixe <i>in-, </i>qui s’écrit <i>ir-</i> devant un radical commençant par <i>r. </i>L’adjectif est construit sur le radical de <i>ire</i> qui signifie «&nbsp;colère&nbsp;»."
				},{
					question: "Laquelle ou lesquelles de ces formes sont correctes&nbsp;?",
					reponses: ["Assoies-toi", "Asseois-toi", "Assieds-toi", "Assis-toi"],
					solution: [2],
					correction: "Le verbe <i>asseoir</i> a deux conjugaisons&nbsp;: celle en «&nbsp;oi&nbsp;» et celle en «&nbsp;ie&nbsp;». Le verbe est ici conjugué au présent de l’impératif. La seule forme correcte présentée ici est <i>assieds-toi, </i>l’autre forme correcte, non présentée ici, est <i>assois-toi</i>."
				},{
					question: "Quelle est la forme du verbe <i>pouvoir</i> à la 1<sup>re</sup> personne du singulier du futur de l’indicatif&nbsp;?",
					reponses: ["Pourai", "Pourrai", "Pourais", "Pourrais"],
					solution: [1],
					correction: "Le verbe <i>pouvoir</i> construit son futur (et donc son présent du conditionnel) sur le radical <i>pourr-, </i>avec deux <i>r</i>. Les formes <i>pourai </i>et<i> pourais</i> (avec un seul <i>r</i>) n’existent pas. Quant à <i>pourrais, </i>avec deux <i>r </i>et un <i>s</i>, il s’agit de la 1<sup>re</sup> personne du présent du conditionnel."
				},{
					question: "Quel est l’autre nom de la pelle à poussière dans le nord de la France&nbsp;?",
					reponses: ["Ramassette", "Pellette", "Poussiérette", "Recueillette"],
					solution: [0],
					correction: "Dans le nord de la France, ainsi qu’en Belgique, on utilise le nom <i>ramassette</i> pour parler d’une pelle à poussière."
				},{
					question: "Parmi ces mots, lequel ou lesquels ne sont pas issus du verlan&nbsp;?",
					reponses: ["Ripou", "Daron", "Keuf", "Teuf"],
					solution: [1],
					correction: "<i>Daron</i> est vraisemblablement issu de l’ancien français <i>daru</i> qui signifie «&nbsp;fort&nbsp;». <i>Ripou</i> est le verlan de <i>pourri&nbsp;; keuf </i>celui de<i> flic, </i>avec suppression de la dernière syllabe&nbsp;: <i>fli-que </i>donne <i>queu – f(li) </i>qui donne <i>keuf. </i>Il en va de même pour <i>teuf, </i>verlan de <i>fête&nbsp;: fê-teu </i>donne <i>teu-f(ê)</i> qui donne <i>teuf.</i>"
				},{
					question: "L’expression «&nbsp;au pied de la lettre&nbsp;» signifie&nbsp;:",
					reponses: ["Dans l’ordre alphabétique", "Au bas d’une lettre", "Au sens littéral"],
					solution: [2],
					correction: "Prendre un mot ou une expression au pied de la lettre, c’est le prendre dans son sens premier, dans son sens propre et non au sens figuré ou dans un sens atténué. Par extension, <i>au pied de la lettre</i> signifie «&nbsp;exactement, scrupuleusement&nbsp;»."
				},{
					question: "Dans la phrase «&nbsp;C’est le plus petit&nbsp;», on a affaire à&nbsp;:",
					reponses: ["Un superlatif d’égalité", "Un superlatif d’infériorité", "Un superlatif de supériorité"],
					solution: [2],
					correction: "Le superlatif d’égalité n’existe pas. Pour savoir si l’on a affaire à un superlatif d’infériorité ou à un superlatif de supériorité, on regarde… non pas l’adjectif, mais l’adverbe qui l’introduit. <i>Le moins</i> correspond au superlatif d’infériorité et <i>le plus </i>au superlatif de supériorité. Ici, on a bien affaire à un superlatif de supériorité. <i>Le moins grand</i> aurait été un superlatif d’infériorité."
				},{
					question: "En grammaire, une phrase complexe est une phrase&nbsp;:",
					reponses: ["Qui comporte au moins deux compléments", "Qui comporte au moins deux propositions", "Dont on ne comprend pas le sens", "Qui compte plus de vingt mots"],
					solution: [1],
					correction: "En grammaire, une phrase complexe comporte au moins deux propositions, qu’il s’agisse de deux propositions indépendantes (par exemple <i>elle a joué et elle a gagné</i>) ou d’une principale et de sa subordonnée (par exemple, <i>elle a gagné parce qu’elle a joué)</i>. La phrase complexe peut comporter plus de deux propositions."
				},{
					question: "Pour lequel ou lesquels de ces verbes ne peut-on savoir s’ils sont au présent de l’indicatif ou au passé simple&nbsp;?",
					reponses: ["Je grandis", "Je dis", "J’élis", "Je vis"],
					solution: [0,1,3],
					correction: "<i>J’élis </i>est le présent du verbe <i>élire. </i>Au passé simple, on aura <i>j’élus.</i> <i>Je grandis </i>et <i>je dis</i> sont soit le présent soit le passé simple respectivement des verbes <i>grandir </i>et <i>dire.</i> Quant à <i>je vis, </i>c’est soit le passé de <i>voir, </i>soit le présent de <i>vivre.</i>"
				},{
					question: "Parmi ces verbes, lequel n’est pas défectif&nbsp;?",
					reponses: ["Absoudre", "Traire", "Clore"],
					solution: [0],
					correction: "Les verbes défectifs ont des «&nbsp;défauts&nbsp;» dans leur conjugaison&nbsp;: il est certains temps auxquels on ne les conjugue pas. C’est le cas de <i>traire </i>qu’on ne conjugue pas au passé simple (et donc non plus à l’imparfait du subjonctif) et de <i>clore</i> qu’on ne conjugue ni à l’imparfait de l’indicatif ni au passé simple (et donc non plus à l’imparfait du subjonctif). De plus, les deux premières personnes du pluriel du présent de l’indicatif de ce verbe sont inusitées. Quant à <i>absoudre, </i>il se conjugue à tous les temps, à tous les modes et à toutes les personnes. Il n’a donc rien de défectif."
				},{
					question: "La forme <i>haïssiez </i>est&nbsp;: ",
					reponses: ["Un imparfait de l’indicatif", "Un présent du subjonctif", "Un imparfait du subjonctif"],
					solution: [0,1,2],
					correction: "Les verbes du 2<sup>e</sup> groupe (ceux qui ajoutent <i>-iss-</i> dans leur conjugaison), dont fait partie <i>haïr, </i>ont ceci de particulier que, aux deux premières personnes du pluriel, leurs formes se confondent à l’imparfait de l’indicatif, au présent du subjonctif et à l’imparfait du subjonctif."
				},{
					question: "Quelle est la nature de <i>point</i> dans «&nbsp;Rien ne sert de courir, il faut partir à point&nbsp;»&nbsp;?",
					reponses: ["Préposition", "Nom", "Adverbe", "Conjonction"],
					solution: [1],
					correction: "Il s’agit ici du nom <i>point</i> qui désigne selon la définition du <i>Petit Robert </i>une «&nbsp;partie précise et définie d’une durée&nbsp;». On lui ajoute d’ailleurs souvent l’adjectif <i>nommé.</i> Et c’est ce même <i>point</i> que l’on retrouve dans l’expression <i>sur le point de.</i>"
				},{
					question: "Parmi ces mots, lequel ne fait pas partie de la même famille étymologique que les trois autres&nbsp;?",
					reponses: ["Forain", "Forum", "Foire", "Fourbu"],
					solution: [2],
					correction: "Les origines de <i>forain, forum </i>et <i>fourbu</i> remontent à l’adverbe latin <i>foris </i>qui signifie «&nbsp;dehors&nbsp;». <i>Forain</i> a eu d’abord le sens de «&nbsp;étranger&nbsp;». <i>Forum, </i>mot latin, a d’abord désigné l’enclos en dehors et autour de la maison. Quant à <i>fourbu,</i> c’est le participe passé de l’ancien verbe <i>forboire</i> qui signifie «&nbsp;boire à l’excès&nbsp;». Le nom <i>foire, </i>lui, vient du bas latin <i>feria, </i>de même sens."
				},{
					question: "Que peut-on dire de la proposition soulignée dans la phrase «&nbsp;Sais-tu <u>si le facteur est déjà passé</u>&nbsp;?&nbsp;»&nbsp;?",
					reponses: ["C’est une proposition subordonnée circonstancielle", "C’est une proposition subordonnée conjonctive", "C’est une interrogation directe", "C’est une interrogation indirecte"],
					solution: [1,3],
					correction: "On peut dire de cette proposition que c’est une subordonnée conjonctive car elle est introduite par la conjonction de subordination <i>si.</i> C’est également une interrogation indirecte car la question est rapportée dans une proposition subordonnée. L’interrogation directe aurait été&nbsp;: «&nbsp;Le facteur est-il déjà passé&nbsp;?&nbsp;». La fonction de cette subordonnée n’est pas complément circonstanciel, mais complément d’objet direct de <i>sais (Sais-tu cela&nbsp;?).</i>"
				},{
					question: "Prendre quelqu'un sans vert, c’est&nbsp;:",
					reponses: ["Le réprimander", "Le prendre au dépourvu", "L’encourager", "Le consoler"],
					solution: [1],
					correction: "L’expression vient d’un jeu qui se jouait au mois de mai (on disait <i>jouer au vert</i>). Littré nous explique&nbsp;: «&nbsp;ceux qui [y] jouaient devaient porter, tout le mois, une feuille verte cueillie le jour même&nbsp;; chaque joueur, pris sans être muni de cette feuille, était puni de quelque amende.&nbsp;»"
				},{
					question: "Quel est l’infinitif du participe passé <i>issu</i>&nbsp;?",
					reponses: ["Issir", "Issire", "Issoir", "Issoire"],
					solution: [0],
					correction: "<i>Sortir</i> a supplanté peu à peu à partir du XVI<sup>e</sup> siècle l’ancien verbe <i>issir</i> dont il était le synonyme. Ce dernier est sorti définitivement de l’usage au XVII<sup>e</sup> siècle. Seul le participe passé <i>issu</i> et son féminin <i>issue </i>ont survécu."
				},{
					question: "Lorsqu’un Franc-Comtois mange un matefaim, il mange&nbsp;:",
					reponses: ["Une quiche", "Une crêpe", "Un baba au rhum", "Un cake salé"],
					solution: [1],
					correction: "Les matefaims (ceux qui «&nbsp;matent&nbsp;» la faim) sont d’épaisses galettes, à l’origine de pommes de terre. Aujourd'hui, on fait des matefaims avec de la farine, des œufs, de l’eau et du fromage et des matefaims sucrés."
				},{
					question: "Les phrases nominales sont celles qui ne sont constituées que d’un seul nom.",
					reponses: ["Vrai", "Faux"],
					solution: [1],
					correction: "Une phrase nominale est une phrase dont le noyau est un nom, contrairement à la phrase «&nbsp;normale&nbsp;» qui, elle, est construite autour d’un verbe. La phrase nominale peut comprendre d’autres mots que le nom noyau&nbsp;: «&nbsp;Félicitations à tous les candidats qui auront répondu à la question sans se tromper&nbsp;» est une phrase nominale."
				}
            ]
        }
    },
    quiz: [
		{
		    nom: "L’étymologie",
		    questions: [
				{
				    question: "«&nbsp;Nénuphar&nbsp;» est un nom qui vient du grec ancien.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Nénuphar </i>vient de l’arabe <i>ninufar</i> et non du grec. C’est pour cette raison que la graphie <i>nénufar</i> est aujourd’hui admise."
				}, {
				    question: "Parmi ces fruits, lequel porte un nom qui ne vient pas du latin&nbsp;?",
				    reponses: ["Abricot", "Citron", "Pomme", "Prune"],
				    solution: [0],
				    correction: "<i>Abricot</i> est un emprunt à l’espagnol <i>albaricoque</i> ou au portugais <i>albricoque</i>, eux-mêmes empruntés à l’arabe <i>al-barqûq</i>."
				}, {
				    question: "Le français appartient à une famille de langues à laquelle appartient également l’hindi.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "L’hindi (langue officielle de l’Inde) et le français (tout comme de nombreuses langues d’Europe et d’Asie) ont un ancêtre commun appelé l’indo-européen, qui a donné naissance à plus de mille langues."
				}, {
				    question: "Parmi ces noms, lequel n’appartient pas à la même famille étymologique que «&nbsp;chien&nbsp;»&nbsp;?",
				    reponses: ["Chenet", "Chenille", "Chiot"],
				    solution: [2],
				    correction: "<i>Chenille </i>vient d’un diminutif du latin <i>canis </i>(<i>canicula</i>, «&nbsp;petite chienne &nbsp;») et <i>chenet</i> a été formé directement sur <i>chien.</i> Quant à <i>chiot</i>, il vient du latin <i>catulus</i> qui désignait d’une façon générale le petit d’un animal."
				}, {
				    question: "«&nbsp;Calvaire&nbsp;» et «&nbsp;chauve&nbsp;» appartiennent à la même famille étymologique.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Calvaire </i>vient du latin <i>calva </i>qui signifie «&nbsp;crâne &nbsp;» (le nom hébreu<i> Golgota</i> fut traduit par «&nbsp;lieu du crâne &nbsp;» en latin). <i>Chauve</i>, lui, vient de <i>calvus</i>, qui signifie également «&nbsp;chauve &nbsp;»."
				}, {
				    question: "Le nom «&nbsp;arènes&nbsp;» vient du latin <i>arena</i>. Que signifiait-il chez les Romains&nbsp;?",
				    reponses: ["Le lieu du sable", "Le lieu du sacre", "Le lieu du sang"],
				    solution: [0],
				    correction: "<i>Sable</i> se disait <i>arena</i> en latin. C’est par métonymie que le nom a désigné l’espace recouvert de sable."
				}, {
				    question: "«&nbsp;Escampette&nbsp;» et «&nbsp;camp&nbsp;» sont de la même famille étymologique.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Escampette</i>, que l’on ne trouve plus aujourd’hui que dans l’expression <i>prendre la poudre d’escampette</i> signifiant «&nbsp;s’enfuir &nbsp;», est un dérivé de l’ancien verbe <i>escamper</i>, lui-même emprunté à l’italien <i>scampare</i> formé à partir du latin <i>campus </i>qui nous a donné <i>camp</i>, mais aussi<i> champ</i>."
				}, {
				    question: "Le nom «&nbsp;gaz&nbsp;» est un emprunt à l’arabe.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Ce nom n’a été emprunté à aucune langue. Il a été créé par le chimiste flamand Jean-Baptiste Van Helmont (1579&nbsp;–&nbsp;1644) à partir du grec <i>chaos</i>, <i>ch</i> étant prononcé [g] par les Flamands."
				}, {
				    question: "Cherchez la langue d’origine de ces noms et vous trouverez l’intrus.",
				    reponses: ["Couffin", "Échec", "Goujat", "Gourbi"],
				    solution: [2],
				    correction: "<i>Couffin, échec</i> et <i>gourbi</i> ont une origine arabe alors que <i>goujat</i> vient de l’hébreu<i> goya</i>, «&nbsp;servante non juive &nbsp;», par l’intermédiaire de l’ancien provençal <i>gojat</i> qui signifiait «&nbsp;garçon &nbsp;»."
				}, {
				    question: "«&nbsp;Sardine&nbsp;» et «&nbsp;Sardaigne&nbsp;» ont même étymologie.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "C’est parce que ce poisson est très présent le long des côtes de la Sardaigne que les Grecs l’ont appelé <i>sardinê</i>, «&nbsp;poisson de Sardaigne &nbsp;»."
				}, {
				    question: "«&nbsp;Météore&nbsp;» vient d’un mot grec qui signifie&nbsp;:",
				    reponses: ["Qui s’échappe du ciel", "Qui s’élève dans les airs", "Qui tombe sur la terre"],
				    solution: [1],
				    correction: "En grec ancien, l’adjectif <i>meteoros</i> signifiait «&nbsp;qui est en haut &nbsp;» ou «&nbsp;qui s’élève dans les airs. &nbsp;»"
				}, {
				    question: "De quand datent les premières attestations du nom «&nbsp;thérapeute&nbsp;»&nbsp;?",
				    reponses: ["XVIII<sup>e</sup> siècle", "XIX<sup>e</sup> siècle", "XX<sup>e</sup> siècle"],
				    solution: [0],
				    correction: "<i>Thérapeute</i> est attesté dès 1704 dans le dictionnaire de Trévoux, mais dans un sens différent de celui que nous lui connaissons aujourd’hui&nbsp;: un thérapeute était alors celui «&nbsp;qui sert Dieu &nbsp;». "
				}, {
				    question: "D’un point de vue étymologique, «&nbsp;plonger&nbsp;» veut dire «&nbsp;tomber dans l’eau avec du plomb&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Plonger</i> vient du latin populaire <i>plumbicare</i> qui signifiait «&nbsp;lester de plomb pour faire descendre dans l’eau &nbsp;», ce verbe étant dérivé du latin classique <i>plumbum</i>, «&nbsp;plomb &nbsp;»."
				}, {
				    question: "Le nom «&nbsp;hasard&nbsp;» vient de l’arabe <i>az-ard</i>. Que signifie ce nom dans cette langue&nbsp;?",
				    reponses: ["Le bol", "La chance", "Le dé", "La réussite"],
				    solution: [2],
				    correction: "<i>Hasard</i> a été emprunté au Moyen Âge à l’arabe par l’intermédiaire de l’espagnol pour désigner un jeu de dés."
				}, {
				    question: "Dans son sens étymologique, «&nbsp;tomber&nbsp;» signifie «&nbsp;faire une chute dans une tombe&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Malgré les apparences,<i> tomber</i> et <i>tombe </i>n’ont pas la même étymologie&nbsp;: <i>tomber</i> est formé à partir du radical onomatopéique <i>tumb-,</i> qui évoque le bruit d’une chute, alors que <i>tombe </i>vient du latin <i>tumba</i>, de même sens."
				}, {
				    question: "Parmi ces noms, lequel vient d’un patronyme&nbsp;?",
				    reponses: ["Barème", "Œdème", "Système"],
				    solution: [0],
				    correction: "François Barrême (1638 – 1703) était un mathématicien qui a donné un nouvel essor à la comptabilité. Un de ses ouvrages connu sous le titre de <i>Barême universel</i> est à l’origine du nom commun que l’on emploie aujourd’hui."
				}, {
				    question: "Le nom «&nbsp;salade&nbsp;» vient de l’espagnol.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Salade </i>a été emprunté à l’italien du Nord <i>salata</i>."
				}, {
				    question: "Quel instrument de musique tire son nom de son inventeur&nbsp;?",
				    reponses: ["Le basson", "Le clavecin", "Le saxophone"],
				    solution: [2],
				    correction: "En 1846, le Belge Adolphe Sax déposa le brevet de ce nouvel instrument de musique."
				}, {
				    question: "Le verbe «&nbsp;échouer&nbsp;» et le nom «&nbsp;échec&nbsp;» appartiennent à la même famille étymologique.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Le nom <i>échec </i>(<i>eschac</i> en ancien français) est un emprunt au persan <i>san</i>, «&nbsp;roi &nbsp;» par l’intermédiaire de l’arabe. Quant à l’étymologie de <i>échouer</i>, elle est inconnue."
				}, {
				    question: "«&nbsp;Couteau&nbsp;» et «&nbsp;couper&nbsp;» appartiennent à la même famille étymologique.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Couteau</i> vient du latin<i> cultellus</i> alors que <i>couper </i>vient de<i> colpare</i> qui signifiait «&nbsp;séparer par un coup &nbsp;»."
				}
			]
		},
        {
            nom: "L'orthographe",
            questions: [
				{
				    question: "Le nom EVENEMENT peut s’écrire événement ou évènement.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Les dictionnaires ont longtemps donné la seule forme avec deux accents aigus,<i> événement</i>, bien que cette graphie contredise la règle selon laquelle on écrit<i> è</i> lorsque la syllabe suivante contient un <i>e</i> muet. Depuis les rectifications de l’orthographe, les deux graphies sont admises et enregistrées dans les dictionnaires."
				}, {
				    question: "Parmi ces mots, lesquels sont mal orthographiés&nbsp;?",
				    reponses: ["Cathéchisme", "Cathédrale", "Érythème", "Éthymologie"],
				    solution: [0, 3],
				    correction: "On écrit <i>catéchisme</i> et <i>étymologie</i>, sans <i>h</i> après le <i>t</i>, même si cela fait moins «&nbsp;savant&nbsp;»&nbsp;!"
				}, {
				    question: "Quels sont les mots d’un nom composé (ouvre-boîte, arc-en-ciel, etc.) qui peuvent se mettre au pluriel lorsque le nom composé est au pluriel&nbsp;?",
				    reponses: ["Les adjectifs", "Les noms", "Les prépositions", "Les verbes"],
				    solution: [0, 1],
				    correction: "Seuls les noms et les adjectifs peuvent prendre les marques du pluriel (les prépositions sont des mots toujours invariables et les verbes ne se mettent pas au pluriel dans les noms composés)&nbsp;: des ouvre-boîtes, des arcs-en-ciel."
				}, {
				    question: "Quel est le bon pluriel&nbsp;?",
				    reponses: ["Les terminals de l’aéroport", "Les terminaux de l’aéroport"],
				    solution: [1],
				    correction: "Même si dans ce sens, <i>terminal </i>vient de l’anglais, il n’échappe pas à la règle et forme son pluriel en remplaçant <i>-al</i> par <i>-aux</i>."
				}, {
				    question: "Laquelle de ces expressions est correcte&nbsp;?",
				    reponses: ["Un récit empreint d’humour ", "Un récit emprunt d’humour"],
				    solution: [0],
				    correction: "<i>Un récit empreint d’humour</i> est un récit qui porte l’empreinte d’humour; l’adjectif vient du verbe <i>empreindre</i>."
				}, {
				    question: "Le participe passé d’un verbe conjugué avec l’auxiliaire<i> être</i> s’accorde toujours avec son sujet.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Cette règle est vraie pour les verbes intransitifs tels que <i>aller, venir, naître</i>, etc., mais elle ne s’applique pas systématiquement aux verbes pronominaux (se parler, se nuire...)."
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["Il a vécu un véritable martyr", "Il a vécu un véritable martyre"],
				    solution: [1],
				    correction: "<i>Martyre</i> s’écrit avec un <i>e </i>final quand il désigne les souffrances. Quand il désigne la personne, il s’écrit sans <i>e</i> (s’il s’agit d’un homme)&nbsp;: la mort d’un martyr, la mort d’une martyre."
				}, {
				    question: "Tous les adverbes qui se terminent par le son [amã] (qui riment avec maman, comme bruyamment) s’écrivent avec deux <i>m</i>.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Cette règle est vraie&nbsp;: il n’y a aucune exception. "
				}, {
				    question: "Laquelle de ces indications horaires est correctement écrite&nbsp;?",
				    reponses: ["Trois heures et demi", "Trois heures et demie", "Trois heures et demies"],
				    solution: [1],
				    correction: "Lorsque <i>et demi</i> suit un nom, il s’accorde uniquement en genre (masculin ou féminin) avec ce nom. On écrit donc <i>trois heures et demie</i>."
				}, {
				    question: "Parmi ces mots, lesquels portent un accent indu&nbsp;?",
				    reponses: ["Chapître", "Cloître", "Épître", "Goître"],
				    solution: [0, 3],
				    correction: "<i>Chapitre</i> et <i>goitre </i>ne portent jamais d’accent circonflexe. Depuis les rectifications de l’orthographe, il est possible de supprimer l’accent circonflexe sur le <i>i</i> et le <i>u </i>(une boite, une buche). Mieux vaut donc ne pas mettre d’accent plutôt que d’en mettre un qui n’aurait pas lieu d’être."
				}, {
				    question: "Parmi ces noms, lequel est féminin&nbsp;?",
				    reponses: ["Colchique", "Effluve", "Épithète", "Hémisphère"],
				    solution: [2],
				    correction: "<i>Epithète </i>est un nom féminin&nbsp;: attention donc aux accords."
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["Nous travaillons ensemble depuis de longues années", "Nous travaillons ensembles depuis de longues années"],
				    solution: [0],
				    correction: "<i>Ensemble</i> est ici un adverbe&nbsp;; il est donc invariable."
				}, {
				    question: "Quel nombre maximum de consonnes consécutives peut-on trouver dans un mot&nbsp;?",
				    reponses: ["3", "4", "5"],
				    solution: [2],
				    correction: "L’adjectif <i>transphrastique </i>ne compte pas moins de cinq consonnes consécutives."
				}, {
				    question: "Le pluriel révèlera l’intrus parmi ces noms. Trouvez-le.",
				    reponses: ["Cérémonial", "Choral", "Orignal", "Récital"],
				    solution: [2],
				    correction: "Contrairement aux trois autres noms qui ont un pluriel en <i>s</i>, <i>orignal </i>(élan du Canada) a un pluriel en <i>-aux</i>&nbsp;: des orignaux."
				}, {
				    question: "A la 3<sup>e</sup> personne du pluriel, les verbes conjugués à un mode personnel se terminent toujours par «&nbsp;-nt&nbsp;», quels que soient le temps et le mode.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Il n’y a aucune exception à cette règle&nbsp;: si <i>-s</i> est la marque du pluriel des noms et des adjectifs, <i>-nt</i> est celle des verbes."
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["Il a appris l’Italien à Rome", "Il a appris l’italien à Rome"],
				    solution: [1],
				    correction: "Les noms de langue s’écrivent toujours avec une minuscule (sauf, bien sûr, s’ils sont placés en début de phrase). "
				}, {
				    question: "Parmi ces noms, lequel est masculin&nbsp;?",
				    reponses: ["Astérisque", "Écritoire", "Équivoque", "Nacre"],
				    solution: [0],
				    correction: "<i>Astérisque </i>est un nom masculin&nbsp;: attention donc aux accords."
				}, {
				    question: "En français, il n’existe qu’un seul mot qui s’écrit avec un accent grave sur le «&nbsp;u&nbsp;»&nbsp;: où. ",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Où </i>est le seul mot s’écrivant avec <i>ù</i>, mais il est très fréquent et ne doit pas être confondu avec son homonyme <i>ou</i> (sans accent)."
				}, {
				    question: "Parmi ces noms, quel est l’intrus&nbsp;?",
				    reponses: ["Des bijoux", "Des choux", "Des courroux", "Des genoux"],
				    solution: [2],
				    correction: "<i>Courroux</i> s’écrit avec un <i>x </i>au singulier, contrairement à <i>bijou, chou</i> et <i>genou.</i>"
				}, {
				    question: "Quel est le titre correctement écrit&nbsp;? ",
				    reponses: ["Y-a-t’il un pilote dans l’avion&nbsp;?", "Y-a-t-il un pilote dans l’avion&nbsp;?", "Y a-t-il un pilote dans l’avion&nbsp;?", "Y a-t’il un pilote dans l’avion&nbsp;?"],
				    solution: [2],
				    correction: "On ne met jamais de trait d’union entre le verbe et le pronom qui le précède (donc <i>Y a</i>)&nbsp;; le <i>t </i>qui permet de faire la liaison entre le verbe et son sujet inversé <i>il</i> ou <i>elle </i>s’écrit toujours entre deux traits d’union (donc <i>a-t-il</i>)&nbsp;: Y a-t-il un pilote dans l’avion&nbsp;?"
				}
			]
        },
        {
            nom: "La conjugaison",
            questions: [
				{
				    question: "Un de ces verbes n’est pas à l’imparfait. Lequel&nbsp;?",
				    reponses: ["Je bondissais", "Il s’élançait", "Nous courrions", "Elles accéléraient"],
				    solution: [2],
				    correction: "Nous <i>courrions </i>est au conditionnel présent."
				}, {
				    question: "Tous ces verbes sont du 2<sup>e</sup> groupe, sauf un. Lequel&nbsp;?",
				    reponses: ["Agir", "Déglutir", "Haïr", "Languir", "Pervertir", "Pressentir", "Sertir", "Vrombir", ],
				    solution: [5],
				    correction: "<i>Pressentir </i>est du 3<sup>e</sup> groupe (nous pressentons)."
				}, {
				    question: "Comment s’appelle le temps formé avec l’auxiliaire à l’imparfait de l’indicatif et le participe passé&nbsp;?",
				    reponses: ["Le plus-que-parfait", "Le plus-qu’imparfait", "Le passé de l’imparfait"],
				    solution: [0],
				    correction: "C’est le plus-que-parfait."
				}, {
				    question: "Quelle est la forme correcte du verbe<i> bouillir</i> à l’imparfait du subjonctif&nbsp;?",
				    reponses: ["Qu’il bouillît", "Qu’il bouillisse", "Qu’il bouillusse"],
				    solution: [0],
				    correction: "À l’imparfait du subjonctif, il y a toujours un accent circonflexe à la 3<sup>e</sup> personne du singulier."
				}, {
				    question: "Quelle est la forme correcte du verbe <i>se mouvoir</i> au présent de l’indicatif&nbsp;?",
				    reponses: ["Je me meuve", "Je me meus", "Je me meux"],
				    solution: [1],
				    correction: "b&nbsp;: Je me meus"
				}, {
				    question: "Quelle est la forme correcte du verbe <i>résoudre</i>&nbsp;?",
				    reponses: ["Nous résolverons", "Nous résoudrons"],
				    solution: [1],
				    correction: "<i>Résolv-</i> est le radical utilisé pour former l’imparfait de l’indicatif et le présent du subjonctif, pas le futur."
				}, {
				    question: "Un verbe défectif est un verbe&nbsp;:",
				    reponses: ["Qui a plus de deux radicaux", "Qui ne se conjugue pas à tous les temps", "Qui exprime une idée négative"],
				    solution: [1],
				    correction: "Le verbe <i>gésir</i>, par exemple, ne se conjugue qu’au présent, à l’imparfait et au participe présent."
				}, {
				    question: "Combien de temps compte le subjonctif&nbsp;?",
				    reponses: ["2", "3", "4", "5"],
				    solution: [2],
				    correction: "Le présent (<i>que je fasse</i>), l’imparfait (<i>que je fisse</i>), le passé (<i>que j’aie fait</i>), le plus-que-parfait (<i>que j’eusse fait</i>)."
				}, {
				    question: "Qu’appelle-t-on un temps surcomposé&nbsp;?",
				    reponses: ["Un temps composé dans lequel l’auxiliaire est lui-même à un temps composé", "Un temps formé du participe passé précédé d’un auxiliaire au passif", "Les temps surcomposés n’existent pas"],
				    solution: [0],
				    correction: "<i>J’ai eu fini</i>, par exemple."
				}, {
				    question: "Parmi ces verbes, lequel est défectif&nbsp;?",
				    reponses: ["Naître", "Paître", "Paraître"],
				    solution: [1],
				    correction: "<i>Paître</i> n’a ni passé simple ni participe passé."
				}, {
				    question: "Parmi ces affirmations, laquelle est vraie&nbsp;?",
				    reponses: ["Aux temps composés, être et avoir se conjuguent avec l’auxiliaire avoir", "Aux temps composés, être et avoir se conjuguent avec l’auxiliaire être", "Aux temps composés, être se conjugue avec l’auxiliaire être et avoir avec l’auxiliaire avoir", "Aux temps composés, être se conjugue avec l’auxiliaire avoir et avoir avec l’auxiliaire être"],
				    solution: [0],
				    correction: "<i>Être</i> et <i>avoir</i> se conjuguent avec <i>avoir</i>&nbsp;: <i>j’ai eu envie de rire</i>&nbsp;; <i>j’avais été malade</i>"
				}, {
				    question: "Quel est l’infinitif de <i>cherra</i>&nbsp;: «&nbsp;Tire la chevillette, la bobinette cherra&nbsp;»&nbsp;?",
				    reponses: ["Cherrer", "Choyer", "Choir"],
				    solution: [2],
				    correction: "<i>Choir </i>est sorti de l’usage courant et a été remplacé par <i>tomber.</i>"
				}, {
				    question: "Laquelle de ces affirmations est vraie&nbsp;?",
				    reponses: ["Les verbes dont l'infinitif se termine par&nbsp;-cer s'écrivent parfois avec une cédille parce que c’est plus joli", "Les verbes dont l'infinitif se termine par&nbsp;-cer s'écrivent parfois avec une cédille pour montrer que le c se prononce [s]", "Le c des verbes dont l'infinitif se termine par&nbsp;-cer ne prend jamais de cédille puisqu’il n’y en a pas à l’infinitif"],
				    solution: [1],
				    correction: "Devant les terminaisons qui commencent par <i>a</i> ou <i>o</i>, il faut écrire <i>ç</i>&nbsp;: nous <i>plaçons</i>, je <i>plaçais</i>."
				}, {
				    question: "Un intrus s’est glissé parmi ces verbes.",
				    reponses: ["S’obstiner", "Se réfugier", "Se plaindre", "Se raviser", "S’exclamer"],
				    solution: [2],
				    correction: "Le verbe <i>plaindre</i> peut être employé sans le pronom <i>se</i>, ce qui n’est pas le cas des autres verbes."
				}, {
				    question: "À combien de formes de la conjugaison le mot <i>ris</i> correspond-il&nbsp;?",
				    reponses: ["1", "2", "3", "4", "5"],
				    solution: [4],
				    correction: "Je ris (présent de l’indicatif et passé simple), tu ris (présent de l’indicatif et passé simple), ris (présent de l’impératif)."
				}, {
				    question: "Je <i>sus</i> est une forme&nbsp;:",
				    reponses: ["Du verbe suer", "Du verbe savoir", "Des verbes suer et savoir"],
				    solution: [1],
				    correction: "C’est le passé simple de <i>savoir</i>, à ne pas confondre avec <i>je sue</i> (présent de l’indicatif ou du subjonctif de <i>suer</i>)."
				}, {
				    question: "Qu’appelle-t-on un verbe pronominal&nbsp;?",
				    reponses: ["Un verbe qui peut être employé comme un nom", "Un verbe qui se conjugue toujours avec un pronom complément", "Un verbe qui se conjugue sans pronom sujet"],
				    solution: [1],
				    correction: "S’enfuir, s’écrouler, se méfier... sont des verbes pronominaux."
				}, {
				    question: "Ces noms sont formés à partir de participe passé d’anciens verbes, sauf un. Lequel&nbsp;?",
				    reponses: ["Issue", "Tissu", "Chute", "Fétu"],
				    solution: [3],
				    correction: "<i>Fétu</i> vient du bas latin <i>festucum</i>&nbsp;; <i>issue</i> vient de<i> issir</i> qui signifiait «&nbsp;sortir&nbsp;», <i>tissu</i> de <i>tistre</i>, ancienne forme de <i>tisser</i>, et <i>chute</i> de <i>choir</i> «&nbsp;tomber&nbsp;»."
				}, {
				    question: "Que peut-on dire&nbsp;?",
				    reponses: ["Assieds-toi", "Assis-toi", "Assois-toi"],
				    solution: [0, 2],
				    correction: "Le verbe <i>asseoir </i>a deux conjugaisons&nbsp;: l’une en <i>oi/oy,</i> l’autre en <i>ie/ey.</i>"
				}, {
				    question: "À quel temps est conjugué <i>aimer</i> dans <i>aimé-je</i>&nbsp;?",
				    reponses: ["Au présent", "Au passé simple", "À l’imparfait", "Cette forme n’existe pas"],
				    solution: [0],
				    correction: "Lorsqu’on inverse le pronom sujet <i>je</i> au présent, on accentue le <i>e</i>."
				}
            ]
        },
        {
            nom: "Le sens des mots",
            questions: [
				{
				    question: "Qu’est-ce que la <i>flavescence</i>&nbsp;?",
				    reponses: ["Une odeur", "Une texture", "Une couleur"],
				    solution: [2],
				    correction: "Ce qui est <i>flavescent</i> est blond, doré."
				}, {
				    question: "Votre belle-mère vous annonce qu’elle<i> tire le diable par la queue</i>. Quelle est votre réaction&nbsp;?",
				    reponses: ["Vous vous réjouissez, car enfin elle va s’installer loin de chez vous", "Vous vous inquiétez, car elle va encore vous demander de l’argent", "Vous vous offusquez de ses écarts de conduite"],
				    solution: [1],
				    correction: "<i>Tirer le diable par la queue</i> signifie «&nbsp;avoir peu de moyens pour vivre&nbsp;»."
				}, {
				    question: "Dans la liste des mots qui évoquent la blancheur, quel est l’intrus&nbsp;?",
				    reponses: ["Lactescence ", "Chenu", "Blafard ", "Candeur", "Moreau"],
				    solution: [4],
				    correction: "Un moreau est un cheval noir."
				}, {
				    question: "D’un point de vue étymologique, de quel mot <i>amygdale</i> se rapproche-t-il?",
				    reponses: ["Mygale", "Amande", "Amide"],
				    solution: [1],
				    correction: "<i>Amande</i> vient du latin populaire <i>amandula</i>, déformation du latin classique <i>amygdala</i>, qui signifiait «&nbsp;amande&nbsp;»&nbsp;: les amygdales sont en forme d’amande."
				}, {
				    question: "Parmi les noms suivants, lequel n’est pas un synonyme de <i>nourriture</i>&nbsp;?",
				    reponses: ["Manne", "Pitance", "Chère", "Placentation"],
				    solution: [3],
				    correction: "La placentation est la formation du placenta."
				}, {
				    question: "Que signifie l’élément <i>chrys-</i> tiré du grec&nbsp;?",
				    reponses: ["Or", "Dieu", "Pierre"],
				    solution: [0],
				    correction: "Le chrysanthème, c’est la fleur (<i>anthème</i>) d’or (<i>chrys</i>)."
				}, {
				    question: "Si vous voulez utiliser une expression hypocoristique à propos de votre fils, vous direz&nbsp;:",
				    reponses: ["Le fruit de ma chair", "Mon rejeton", "Mon petit lapin"],
				    solution: [2],
				    correction: "Un terme hypocoristique est un terme que l’on emploie avec une valeur affective."
				}, {
				    question: "Quel est l’intrus dans cette famille étymologique&nbsp;?",
				    reponses: ["Esseulé ", "Solo ", "Solitaire", "Isolé ", "Désoler"],
				    solution: [3],
				    correction: "<i>Isolé </i>vient de l’italien <i>isolato</i> qui signifie «&nbsp;indépendant comme une île&nbsp;» et non du latin <i>solus </i>qui signifiait «&nbsp;seul&nbsp;»."
				}, {
				    question: "Parmi ces noms, un seul n’est pas issu d’un nom de personne. Lequel&nbsp;?",
				    reponses: ["Olibrius", "Silhouette", "Avanie", "Diesel"],
				    solution: [2],
				    correction: "<i>Avanie</i> n’est pas le nom d’une personne. Ce nom vient de l’italien <i>avania.</i>"
				}, {
				    question: "D’où vient l’expression «&nbsp;battre en brèche&nbsp;»&nbsp;? ",
				    reponses: ["Du sport", "De l’art militaire", "De la ferronnerie", "De la médecine"],
				    solution: [1],
				    correction: "<i>Battre en brèche</i>, au sens propre, c’est faire une ouverture dans une enceinte fortifiée."
				}, {
				    question: "Quel synonyme peut-on donner à <i>aquilin</i> dans l’expression «&nbsp;nez aquilin&nbsp;»&nbsp;?",
				    reponses: ["Camus", "Droit", "Crochu", "Busqué"],
				    solution: [3],
				    correction: "<i>Un nez aquilin</i> est un nez en forme de bec d’aigle."
				}, {
				    question: "Parmi les mots suivants, lequel n’a jamais existé en latin&nbsp;?	",
				    reponses: ["Anus", "Argus", "Crocus", "Motus"],
				    solution: [3],
				    correction: "<i>Motus </i>est une latinisation plaisante du nom mot."
				}, {
				    question: "<i>Pantalon</i> était à l’origine un nom propre.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "C’était le nom d’un personnage de la commedia dell’arte."
				}, {
				    question: "Ces mots ont été empruntés à l’arabe par l’intermédiaire de l’italien, sauf un. Lequel&nbsp;?",
				    reponses: ["Abricot", "Artichaut", "Coton", "Orange"],
				    solution: [0],
				    correction: "<i>Abricot</i> vient bien de l’arabe, mais par l’intermédiaire de l’espagnol (ou du portugais)."
				}, {
				    question: "Quel nom donne-t-on à un court poème satirique&nbsp;?",
				    reponses: ["Épitaphe", "Épigramme", "Épigraphe", "Épitome"],
				    solution: [1],
				    correction: "L’épigramme a été très en vogue aux XVII<sup>e</sup> et XVIII<sup>e</sup> siècles dans les querelles littéraires."
				}, {
				    question: "Quel proverbe évoque la procrastination&nbsp;?",
				    reponses: ["C’est en forgeant qu’on devient forgeron", "Chat échaudé craint l’eau froide", "Ne remets pas au lendemain ce que tu peux faire le jour même"],
				    solution: [2],
				    correction: "La procrastination consiste à repousser toujours à plus tard ce que l’on a à faire."
				}, {
				    question: "Ces mots ont été empruntés à l’espagnol, sauf un. Lequel&nbsp;?",
				    reponses: ["Calebasse", "Canari", "Cannibale", "Capitaine"],
				    solution: [3],
				    correction: "<i>Capitaine</i> vient du latin <i>capitaneus</i>, lui-même tiré de <i>caput</i> qui signifie «&nbsp;tête&nbsp;»."
				}, {
				    question: "De quel mot <i>pusillanime</i> est-il synonyme&nbsp;?",
				    reponses: ["Indigent", "Généreux", "Audacieux", "Craintif"],
				    solution: [3],
				    correction: "<i>Une personne pusillanime</i> est une personne qui manque d’audace."
				}, {
				    question: "Parmi les mots suivants, quel est l’intrus&nbsp;?",
				    reponses: ["Hermaphrodite", "Omnipotent", "Psychologue", "Technocrate"],
				    solution: [1],
				    correction: "<i>Omnipotent</i> est le seul mot formé à partir du latin et non du grec."
				}, {
				    question: "Ces mots viennent de l’arabe, sauf un. Lequel&nbsp;?",
				    reponses: ["Alcool", "Cafard", "Herbe", "Sucre"],
				    solution: [2],
				    correction: "<i>Herbe</i> vient du latin <i>herba</i>."
				}
			]
        },
        {
            nom: "Proverbes et dictons",
            questions: [
				{
				    question: "Le proverbe «&nbsp;Il y a loin de la coupe aux lèvres&nbsp;» est une métaphore religieuse.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Ce proverbe est une allusion à l’Antiquité, lorsque Grecs et Romains, en position allongée, portaient à leurs lèvres la coupe contenant leur breuvage, ce qui ne se faisait pas sans difficulté."
				}, {
				    question: "Quelle figure de style retrouve-t-on dans le proverbe «&nbsp;Il faut manger pour vivre et non pas vivre pour manger&nbsp;»&nbsp;?",
				    reponses: ["Une anacoluthe", "Un chiasme", "Un euphémisme"],
				    solution: [1],
				    correction: "Le <i>chiasme</i> est une figure de style consistant à opposer deux propositions dans lesquelles l’ordre des mots est inversé&nbsp;: «&nbsp;Il faut manger (A) pour vivre (B) et non vivre (B) pour manger (A)&nbsp;»."
				}, {
				    question: "Le proverbe «&nbsp;Rien ne sert de courir, il faut partir à point&nbsp;» est la morale d’une fable de Jean de La Fontaine.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "C’est la morale de la fable <i>Le lièvre et la tortue</i>&nbsp;: bien qu’elle soit beaucoup plus lente à la course que le lièvre, la tortue a remporté la victoire car elle est partie suffisamment tôt."
				}, {
				    question: "Comment écrit-on le premier mot du proverbe «&nbsp;…beau mentir qui vient de loin&nbsp;»&nbsp;?",
				    reponses: ["A", "À"],
				    solution: [0],
				    correction: "Il s’agit du verbe <i>avoir </i>; le proverbe signifie&nbsp;: Celui qui vient de loin a toutes les facilités de raconter ce qu’il veut puisqu’on ne peut pas vérifier ses dires."
				}, {
				    question: "Le proverbe «&nbsp;A vaincre sans péril, on triomphe sans gloire&nbsp;» est une citation de&nbsp;:",
				    reponses: ["Corneille ", "Hugo", "Racine"],
				    solution: [0],
				    correction: "Il s’agit d’une réplique du Comte s’adressant à Don Rodrigue, extraite du <i>Cid</i> de Pierre Corneille (acte II, scène 2)."
				}, {
				    question: "Comment écrit-on le deuxième mot du proverbe suivant&nbsp;: «&nbsp;Un&nbsp;... vaut mieux que deux tu l’auras&nbsp;»&nbsp;?",
				    reponses: ["Tien", "Tiens", "Tient"],
				    solution: [1],
				    correction: "Il s’agit du verbe <i>tenir </i>à la 2<sup>e</sup> personne du singulier du présent de l’indicatif (tiens)."
				}, {
				    question: "Le proverbe «&nbsp;Quand le bâtiment va, tout va&nbsp;» est une métaphore tirée de la marine.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "C’est Martin Nadaud, maçon et député de la Creuse, qui est à l’origine du proverbe. Dans un discours à l’Assemblée nationale, en&nbsp;1850, il avait dit&nbsp;: «&nbsp;Vous le savez, à Paris, lorsque le bâtiment va, tout profite de son activité.&nbsp;» Bâtiment n’a donc ici pas le sens de «&nbsp;navire&nbsp;»."
				}, {
				    question: "Quelle est la nature grammaticale de «bien&nbsp;» dans le proverbe «&nbsp;bien mal acquis ne profite jamais&nbsp;»&nbsp;?",
				    reponses: ["Adjectif", "Adverbe ", "Nom"],
				    solution: [2],
				    correction: "<i>Bien</i>  est ici un nom masculin&nbsp;: un bien qui a été acquis de façon malhonnête n’est jamais vraiment profitable."
				}, {
				    question: "Quelle figure de style est employée dans le proverbe&nbsp;: «&nbsp;Qui s’excuse s’accuse&nbsp;»&nbsp;?",
				    reponses: ["L’assonance", "L’hypallage", "La redondance"],
				    solution: [0],
				    correction: "<i>L’assonance</i> consiste à répéter un son dans une même phrase."
				}, {
				    question: "Le proverbe «&nbsp;A chacun son métier, les vaches seront bien gardées&nbsp;» est tiré de la morale d’une fable de Jean de La Fontaine.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Ce proverbe est tiré de la fable <i>Le vacher et le garde-chasse</i>, de l’académicien Jean-Pierre Claris de Florian (1755 – 1794)."
				}, {
				    question: "Selon le proverbe, qui<i> la faim fait-elle sortir du bois</i>&nbsp;?",
				    reponses: ["Le cerf", "Le loup", "Le renard"],
				    solution: [1],
				    correction: "«&nbsp;La faim fait sortir le loup du bois&nbsp;» signifie que la nécessité peut nous pousser à agir contre nos habitudes, nos envies."
				}, {
				    question: "D’après le proverbe, à qui <i>la chance sourit-elle</i>&nbsp;?",
				    reponses: ["Aux audacieux", "Aux courageux", "Aux fortunés"],
				    solution: [0],
				    correction: "Seuls ceux qui ont l’audace d’entreprendre quelque chose de risqué peuvent espérer réussir."
				}, {
				    question: "Comment se termine cet ancien dicton&nbsp;: «&nbsp;Qui se garde à carreau...&nbsp;»&nbsp;?",
				    reponses: ["...prend tout sur le dos", "...ne risque jamais gros", "...n’est jamais capot"],
				    solution: [2],
				    correction: "Le dicton&nbsp;: «&nbsp;Qui se garde à carreau n’est jamais capot&nbsp;» signifie qu’en prenant des précautions, on n’échoue jamais. C’est une métaphore tirée des jeux de cartes (être capot signifiant «&nbsp;ne faire aucune levée&nbsp;»)."
				}, {
				    question: "Le proverbe&nbsp;: «&nbsp;Chassez le naturel, il revient au galop&nbsp;» est tiré du Nouveau Testament.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Ce proverbe est tiré des <i>Glorieux</i>, comédie de Destouches (1680 –&nbsp;1754), créée en&nbsp;1732. Destouches s’était inspiré d’un vers d’Horace."
				}, {
				    question: "D’après le proverbe, qu’est-ce qui constitue <i>la politesse des rois</i>&nbsp;?",
				    reponses: ["L’exactitude", "La galanterie", "Le beau langage"],
				    solution: [0],
				    correction: "On dit que «&nbsp;l’exactitude est la politesse des rois&nbsp;» était la phrase favorite de Louis XVIII."
				}, {
				    question: "Que signifie le proverbe&nbsp;: «&nbsp;Quand le vin est tiré, il faut le boire&nbsp;»&nbsp;?",
				    reponses: ["Quand on s’est trop engagé dans une affaire, on ne peut plus reculer", "Il faut savoir assumer les conséquences de ses actes"],
				    solution: [0],
				    correction: "<i>Quand le vin a été tiré du tonneau</i>, il n’est plus possible de le remettre dans le tonneau&nbsp;: il faut donc aller au bout de ce que l’on a entrepris."
				}, {
				    question: "D’après le proverbe, qui est <i>mère de tous les vices</i>&nbsp;?",
				    reponses: ["La gourmandise", "La jalousie", "L’oisiveté"],
				    solution: [2],
				    correction: "«&nbsp;L’oisiveté (ou la paresse) est mère de tous les vices&nbsp;» rappelle que lorsque l’on est inactif, on prend rapidement de nombreux défauts."
				}, {
				    question: "«&nbsp;L’enfer est pavé de bonnes intentions&nbsp;» est un proverbe issu d’une citation de Jean-Paul Sartre.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "La citation à valeur proverbiale de Jean-Paul Sartre est «&nbsp;Pas besoin de gril, l’enfer c’est les autres.&nbsp;» (Huis clos,&nbsp;1944). "
				}, {
				    question: "D’après sa construction, quel est le sens du proverbe&nbsp;: «&nbsp;Tout est bien qui finit bien&nbsp;»&nbsp;?",
				    reponses: ["Tout ce qui est bien finit bien", "Tout ce qui finit bien est bien"],
				    solution: [1],
				    correction: "La proposition relative «&nbsp;qui finit bien&nbsp;» se rattache au pronom <i>tout</i> mais ne peut le suivre directement (on a le même cas de figure avec «&nbsp;tel est pris qui croyait prendre&nbsp;»). Aujourd'hui, on utilise plutôt ce proverbe pour parler du dénouement heureux d’une situation au déroulement incertain."
				}, {
				    question: "D’après le proverbe, que faut-il garder pour la soif&nbsp;?",
				    reponses: ["Une flasque", "Une gourde", "Une poire", "Une pomme"],
				    solution: [2],
				    correction: "«&nbsp;Il faut toujours garder une poire pour la soif&nbsp;» signifie qu’il faut savoir faire des réserves, savoir épargner en prévision de moments difficiles."
				}
			]
        },
        {
            nom: "Synonymes et les antonymes",
            questions: [
				{
				    question: "Lequel de ces adjectifs est synonyme de «&nbsp;primesautier&nbsp;»&nbsp;?",
				    reponses: ["Nouveau", "Printanier", "Spontané"],
				    solution: [2],
				    correction: "Le <i>primesaut</i>, c’est étymologiquement le premier saut, le premier bond. <i>Primesautier</i> est donc synonyme de <i>spontané.</i>"
				}, {
				    question: "L’expression «&nbsp;de derrière les fagots&nbsp;» est synonyme de&nbsp;:",
				    reponses: ["Médiocre", "Excellent"],
				    solution: [1],
				    correction: "A l’origine, cette expression s’appliquait au vin, le meilleur, celui qui avait vieilli à la cave."
				}, {
				    question: "Lequel de ces deux termes est synonyme de «&nbsp;thuriféraire&nbsp;»&nbsp;?",
				    reponses: ["Courageux", "Flatteur"],
				    solution: [1],
				    correction: "Au sens propre, le <i>thuriféraire</i> est celui <i>qui porte l’encens, qui encense.</i>"
				}, {
				    question: "Parmi ces adjectifs, lequel ne contient pas le préfixe négatif <i>dé-</i>?",
				    reponses: ["Débonnaire", "Décalé", "Délivre"],
				    solution: [0],
				    correction: "L’adjectif <i>débonnaire</i> vient de l’ancienne expression <i>de bon air</i>, où <i>air </i>signifiait «&nbsp;souche, origine&nbsp;»."
				}, {
				    question: "Parmi ces adjectifs, lequel est synonyme de «&nbsp;déliquescent&nbsp;»&nbsp;?",
				    reponses: ["Décadent", "Malingre", "Délicat", "Descendant"],
				    solution: [0],
				    correction: "Au sens propre, <i>déliquescent</i> signifie «&nbsp;qui a la possibilité de se liquéfier&nbsp;». Dans son sens figuré, il signifie «&nbsp;qui périclite peu à peu&nbsp;». "
				}, {
				    question: "«&nbsp;Admonition&nbsp;» et «&nbsp;admonestation&nbsp;» sont synonymes.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Admonition</i> et <i>admonestation</i>, fréquents dans le vocabulaire juridique, s’emploient tous les deux au sens figuré pour évoquer une sévère réprimande."
				}, {
				    question: "Lequel de ces adjectifs est antonyme de «&nbsp;hyalin&nbsp;»&nbsp;?",
				    reponses: ["Opaque", "Transparent"],
				    solution: [0],
				    correction: "<i>Ce qui est hyalin</i> a la transparence du verre."
				}, {
				    question: "Au XIX<sup>e</sup> siècle, «&nbsp;mec&nbsp;» était synonyme de&nbsp;:",
				    reponses: ["Fou", "Maître", "Métèque"],
				    solution: [1],
				    correction: "Le sens premier de <i>mec</i> était «&nbsp;maître, chef&nbsp;»."
				}, {
				    question: "Lequel de ces mots ne contient pas le préfixe négatif <i>in-</i>&nbsp;?",
				    reponses: ["Incliné", "Inhibé", "Inouï"],
				    solution: [0],
				    correction: "Le préfixe <i>in- </i>de <i>incliner</i> signifie «&nbsp;vers&nbsp;»&nbsp;: incliner s’emploie alors pour «&nbsp;pencher vers&nbsp;»."
				}, {
				    question: "«&nbsp;Prolixe&nbsp;» et «&nbsp;laconique&nbsp;» sont antonymes.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Prolixe</i> signifie «&nbsp;qui s’exprime avec trop de mots&nbsp;», alors que <i>laconique</i> signifie «&nbsp;qui s’exprime en peu de mots&nbsp;». <i>Prolixe</i> a une connotation péjorative que n’a pas <i>laconique</i>."
				}, {
				    question: "De ces deux termes, lequel est l’antonyme de «&nbsp;partial&nbsp;»&nbsp;?",
				    reponses: ["Objectif", "Subjectif"],
				    solution: [0],
				    correction: "<i>Celui qui est partial</i> est celui qui prend parti, qui n’est donc pas objectif. "
				}, {
				    question: "«&nbsp;Interlope&nbsp;» a pour antonyme «&nbsp;légal&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Interlope</i> signifie «&nbsp;dont l’activité est illégale&nbsp;»."
				}, {
				    question: "Cherchez leur antonyme et vous trouverez l’intrus.",
				    reponses: ["Avouable", "Capable", "Fiable", "Solvable"],
				    solution: [2],
				    correction: "<i>Fiable </i>est le seul qui n’a pas d’antonyme formé avec le préfixe <i>in-.</i>"
				}, {
				    question: "Les expressions «&nbsp;arriver comme mars en carême&nbsp;» et «&nbsp;arriver comme marée en carême&nbsp;» sont synonymes.",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Arriver comme mars en carême</i> signifie «&nbsp;arriver à coup sûr, inévitablement&nbsp;» alors que <i>arriver comme marée en carême</i> signifie «&nbsp;arriver juste à propos&nbsp;»."
				}, {
				    question: "Lequel de ces adjectifs est synonyme de «&nbsp;accort&nbsp;»&nbsp;?",
				    reponses: ["Aimable", "Harmonieux", "Semblable"],
				    solution: [0],
				    correction: "<i>Une personne accorte</i> est une personne aimable, affable."
				}, {
				    question: "Le radical <i>drom-</i> tiré du grec a pour synonyme&nbsp;:",
				    reponses: ["Courir", "Lutter", "Tourner"],
				    solution: [0],
				    correction: "Ce radical sert à former des mots qui évoquent l’idée de course&nbsp;: hippodrome, vélodrome. On le retrouve aussi dans <i>dromadaire</i>."
				}, {
				    question: "Parmi ces adjectifs, lequel est synonyme de «&nbsp;cacochyme&nbsp;»&nbsp;?",
				    reponses: ["Maladif", "Parallèle", "Vaporeux"],
				    solution: [0],
				    correction: "<i>Cacochyme</i> signifie «&nbsp;en mauvaise santé, de faible constitution&nbsp;». Il a pour synonyme <i>maladif</i>."
				}, {
				    question: "L’expression «&nbsp;faire pièce à quelque chose&nbsp;» est synonyme de «&nbsp;faire allusion à quelque chose&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "<i>Faire pièce à quelque chose</i>, c’est s’y opposer, le contredire."
				}, {
				    question: "«&nbsp;Réticence&nbsp;» a pour synonyme «&nbsp;dissimulation&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Dans son sens premier, aujourd'hui vieilli hormis dans son emploi juridique, <i>réticence </i>signifie «&nbsp;omission volontaire de ce qui devrait être dit&nbsp;»."
				}, {
				    question: "Comment appelle-t-on la figure de style consistant à associer deux termes dont les sens s’opposent&nbsp;?",
				    reponses: ["Anaphore", "Chiasme", "Oxymore"],
				    solution: [2],
				    correction: "<i>Clair obscur, rêve éveillé, hâte-toi lentement</i> sont des oxymores que l’on cite souvent."
				}
			]
        },
        {
            nom: "Grammaire",
            questions: [
				{
				    question: "Que diriez-vous&nbsp;?",
				    reponses: ["Je n’ai rien dit pour ne pas qu’il soit déçu	", "Je n’ai rien dit pour qu’il ne soit pas déçu"],
				    solution: [1],
				    correction: "La négation <i>ne... pas</i> encadre le verbe conjugué. (À ne pas confondre avec <i>pour ne pas</i> devant un infinitif&nbsp;: <i>je n’ai rien dit pour ne pas le décevoir</i>.)"
				}, {
				    question: "Aux temps composés, le verbe <i>tomber</i> se conjugue toujours avec l’auxiliaire <i>être </i>?",
				    reponses: ["Vrai ", "Faux"],
				    solution: [1],
				    correction: "<i>Tomber</i> peut se construire avec un complément d’objet direct (<i>tomber la veste, tomber un adversaire</i>&nbsp;: dans ce cas, il se conjugue avec l’auxiliaire <i>avoir</i>)."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Il confrontera ta version et la mienne", "Il confrontera ta version à la mienne", "Il confrontera ta version avec la mienne"],
				    solution: [0, 1, 2],
				    correction: "Les trois phrases sont correctes."
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["Ces murs ont l’air sain", "Ces murs ont l’air sains"],
				    solution: [1],
				    correction: "<i>Avoir l’air</i> signifie ici «&nbsp;paraître&nbsp;»&nbsp;: <i>sain</i> se rapporte à <i>murs</i> et non à <i>air</i>."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Je voudrais des fraises, achètes-en-moi", "Je voudrais des fraises, achète-moi-s-en", "Je voudrais des fraises, achète-m’en"],
				    solution: [2],
				    correction: "Attention à l’ordre des pronoms."
				}, {
				    question: "Les deux phrases suivantes sont correctes et ont le même sens&nbsp;: «&nbsp;C’est une erreur qu’on commet souvent&nbsp;» et «&nbsp;C’est une erreur que l’on commet souvent&nbsp;»?",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "Vrai&nbsp;: l’emploi de<i> l’</i> devant <i>on</i>, quoique conseillé et plus soutenu, n’est jamais obligatoire."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Je vais vous expliquer qu’est-ce qu’il s’est passé", "Je vais vous expliquer ce qu’il s’est passé", "Je vais vous expliquer ce qui s’est passé"],
				    solution: [1, 2],
				    correction: "Ce qu’il s’est passé = il s’est passé cela&nbsp;; ce qui s’est passé = cela s’est passé."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;?",
				    reponses: ["La revue comporte quatre-vingt pages", "La revue comporte quatre-vingts pages"],
				    solution: [1],
				    correction: "Le cardinal <i>quatre-vingts</i> s’écrit avec<i> s</i> quand il n’est suivi d’aucun autre nombre."
				}, {
				    question: "Les deux phrases suivantes ont le même sens: «&nbsp;Ce n’est pas aussi grave que ce que je craignais&nbsp;» et «&nbsp;Ce n’est pas aussi grave que ce que je ne craignais&nbsp;»&nbsp;?",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<b>Vrai&nbsp;:</b> le <i>ne </i>de la subordonnée n’a pas le sens négatif et sa présence est facultative."
				}, {
				    question: "Quelle est la construction correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Crier après quelqu'un", "Crier contre quelqu'un", "Crier sur quelqu'un"],
				    solution: [1],
				    correction: "Quand le verbe contient une idée d’opposition, on le construit généralement avec <i>contre</i>."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Je ne sais pas qu’est-ce qu’il faut faire", "Je ne sais pas ce qu’il faut faire", "Je ne sais pas ce qui faut faire"],
				    solution: [1],
				    correction: "La tournure <i>qu’est-ce que</i> ne s’emploie que lorsque l’on pose une question."
				}, {
				    question: "On peut dire «&nbsp;Il reste une place libre&nbsp;» ou «&nbsp;Il reste une place de libre&nbsp;».",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "L’emploi de la préposition <i>de</i> est facultatif dans ce cas."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Plusieurs réponses sont peut-être possibles.)",
				    reponses: ["Peut-on avoir confiance aux médias&nbsp;?", "Peut-on avoir confiance dans les médias&nbsp;?", "Peut-on avoir confiance en les médias&nbsp;?"],
				    solution: [1],
				    correction: "<i>Avoir confiance</i> se construit avec <i>dans</i> ou <i>en</i> (jamais avec <i>à</i>, mais <i>en</i> ne s’emploie jamais devant <i>les</i>)."
				}, {
				    question: "Lorsqu’il précède un nom, <i>aucun</i> est toujours au singulier. ",
				    reponses: ["Vrai", "Faux"],
				    solution: [1],
				    correction: "Il est toujours au singulier sauf si le nom ne s’emploie qu’au pluriel (<i>aucuns frais</i>)."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;?",
				    reponses: ["Si tu le vois, parle-lui-en", "Si tu le vois, parle-lui-z-en", "Si tu le vois, parles-en-lui"],
				    solution: [0],
				    correction: "Le pronom <i>en</i> est toujours placé après les autres pronoms compléments."
				}, {
				    question: "La phrase «&nbsp;Elle porte des gants marron&nbsp;» est correctement écrite.",
				    reponses: ["Vrai ", "Faux"],
				    solution: [0],
				    correction: "<i>Marron</i> employé comme adjectif de couleur ne s’accorde pas (<i>des gants marron</i> = des gants de la couleur du marron)."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;?",
				    reponses: ["Je te raccompagnerai jusqu’à chez toi", "Je te raccompagnerai jusque chez toi"],
				    solution: [1],
				    correction: "<i>Jusque</i> s’emploie le plus souvent avec <i>à</i> <i>(jusqu’à</i>), mais il peut être employé avec un adverbe ou une autre préposition (<i>ici</i>, <i>chez</i>), auquel cas <i>à</i> ne peut être employé."
				}, {
				    question: "La phrase «&nbsp;Il me reste quelque quatre-vingt-dix kilomètres à parcourir&nbsp;» est correctement écrite.",
				    reponses: ["Vrai", "Faux"],
				    solution: [0],
				    correction: "<i>Quelque </i>signifie ici «&nbsp;environ&nbsp;»&nbsp;: c’est un adverbe, il est donc invariable&nbsp;; <i>vingt </i>est suivi de <i>dix </i>: il ne prend donc pas de<i> s</i>."
				}, {
				    question: "Quelle est la phrase correctement écrite&nbsp;?",
				    reponses: ["Quel que soit la nature et la fonction d’un mot, il faut l’écrire sans erreur", "Quelques soient la nature et la fonction d’un mot, il faut l’écrire sans erreur", "Quelles que soient la nature et la fonction d’un mot, il faut l’écrire sans erreur"],
				    solution: [2],
				    correction: "Le verbe<i> soient</i> et le pronom attribut <i>quelles</i> s’accordent avec le sujet la nature et la fonction."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;? (Il y a peut-être plusieurs réponses.)",
				    reponses: ["Lesquelles histoires te plaisent le plus&nbsp;?", "Lesquelles des histoires te plaisent le plus&nbsp;?", "Quelles histoires te plaisent le plus&nbsp;?"],
				    solution: [1, 2],
				    correction: "<i>Lequel</i> est un pronom&nbsp;: on ne doit pas l’employer comme un déterminant."
				}
			]
        },
        {
            nom: "Expressions",
            questions: [
				{
				    question: "Que diriez-vous&nbsp;?",
				    reponses: ["Elle s’est fait remarquer dès son premier film", "Elle s’est faite remarquer dès son premier film"],
				    solution: [0],
				    correction: "Le participe passé de <i>faire </i>reste toujours invariable quand il est suivi d’un infinitif (ici <i>remarquer</i>)."
				}, {
				    question: "Dans la phrase «&nbsp;Il faut que j’(étiqueter) mes pots de confiture&nbsp;», le verbe rime avec ",
				    reponses: ["Dicte", "Enquête"],
				    solution: [1],
				    correction: "<i>Étiqueter </i>se conjugue sur le même modèle que <i>feuilleter </i>:<i> j’étiquette</i> ou <i>j’étiquète</i>."
				}, {
				    question: "Quel est l’intrus&nbsp;?",
				    reponses: ["Argutie", "Épizootie", "Orthodontie"],
				    solution: [0],
				    correction: "<i>Argutie</i> se prononce toujours avec le son [s]. Pour <i>épizootie </i>et <i>orthodontie</i>, on peut prononcer [t] ou [s]."
				}, {
				    question: "Dans l’expression <i>au grand dam de</i>, certains prononcent <i>dam </i>comme <i>dans</i>. Cette prononciation appartient à la langue&nbsp;:",
				    reponses: ["Familière", "Courante", "Soutenue"],
				    solution: [2],
				    correction: "Cette prononciation était la seule en vigueur autrefois."
				}, {
				    question: "Que peut-on dire&nbsp;? (Plusieurs réponses sont peut-être possibles.)",
				    reponses: ["Elle n'est pas prête de recommencer", "Elle n'est pas près de recommencer", "Elle n'est pas prête à recommencer", "Elle n'est pas près à recommencer"],
				    solution: [1, 2],
				    correction: "On emploie <i>près de</i> ou <i>prêt à</i>, mais pas <i>près à</i> ni <i>prêt de</i>."
				}, {
				    question: "Que peut-on dire&nbsp;?",
				    reponses: ["Il faudrait mieux prendre un parapluie", "Il vaudrait mieux prendre un parapluie"],
				    solution: [1],
				    correction: "<i>Falloir mieux </i>n’a pas de sens."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;?",
				    reponses: ["Mérite-t-il la punition qu’on lui afflige&nbsp;?", "Mérite-t-il la punition qu’on lui inflige&nbsp;?"],
				    solution: [1],
				    correction: "<i>Infliger quelque chose à quelqu’un</i>, c’est lui faire subir quelque chose comme une contrainte, une peine. À ne pas confondre avec <i>affliger quelqu’un</i> qui signifie «&nbsp;causer une douleur morale, décevoir&nbsp;»."
				}, {
				    question: "Il y a un intrus parmi ces mots dont la première syllabe peut se prononcer comme <i>cas </i>ou comme <i>quoi.</i> Lequel&nbsp;?",
				    reponses: ["Quadrature", "Quasi", "Quarté", "Quadriphonie"],
				    solution: [1],
				    correction: "La première syllabe de <i>quasi</i> se prononce toujours [ka]."
				}, {
				    question: "Que diriez vous&nbsp;?",
				    reponses: ["Les soldes estivales sont-elles plus avantageuses que les soldes hivernales&nbsp;?", "Les soldes estivaux sont-ils plus avantageux que les soldes hivernaux&nbsp;?"],
				    solution: [1],
				    correction: "<i>Solde</i> est masculin dans ce sens."
				}, {
				    question: "Pourquoi déconseille-t-on de dire «&nbsp;car en effet&nbsp;»&nbsp;?",
				    reponses: ["Parce que car et en effet ont le même sens&nbsp;: c’est un pléonasme", "Parce qu’on ne peut pas faire suivre une conjonction (car) par un adverbe (en effet)"],
				    solution: [0],
				    correction: "a."
				}, {
				    question: "Quelle est la phrase correcte ",
				    reponses: ["L’équipe a été rassénérée par sa victoire", "L’équipe a été rassérénée par sa victoire"],
				    solution: [1],
				    correction: "<i>Rasséréner </i>est de la même famille que <i>serein</i>."
				}, {
				    question: "À quoi se trouve confronté Don Rodrigue dans <i>Le Cid</i>&nbsp;?",
				    reponses: ["À un dilemme", "À un dilemne"],
				    solution: [0],
				    correction: "Le nom <i>dilemne</i> n’existe pas."
				}, {
				    question: "Que diriez-vous&nbsp;?",
				    reponses: ["Elle s’est permis de me faire une remarque que je n’ai pas appréciée", "Elle s’est permise de me faire une remarque que je n’ai pas appréciée"],
				    solution: [0],
				    correction: "<i>Elle s’est permis</i> (il n’y a pas d’accord avec le sujet dans ce cas)."
				}, {
				    question: "Que doit-on dire&nbsp;?",
				    reponses: ["Cet entêté s’est carapaçonné dans ses certitudes", "Cet entêté s’est caparaçonné dans ses certitudes"],
				    solution: [1],
				    correction: "L’adjectif vient de <i>caparaçon</i> (nom qui désigne une armure ou un harnais d’ornement pour les chevaux) et non pas de <i>carapace</i>."
				}, {
				    question: "Le nom <i>carrousel</i> rime avec&nbsp;:",
				    reponses: ["Sel", "Zèle"],
				    solution: [1],
				    correction: "Ce nom s’écrit avec un seul <i>s </i>qui se prononce [z] entre deux voyelles."
				}, {
				    question: "Quelle expression peut-on employer pour dire&nbsp;: «&nbsp;rapidement&nbsp;»&nbsp;?",
				    reponses: ["En cinq sept", "En cinq sets", "En cinq sec"],
				    solution: [2],
				    correction: "Cette expression vient de l’écarté, jeu de cartes qui se joue en cinq coups."
				}, {
				    question: "Parmi les affirmations suivantes, quelle est la bonne&nbsp;?",
				    reponses: ["On doit dire «&nbsp;un acte répréhensible&nbsp;»", "On doit dire «&nbsp;un acte répréhensif&nbsp;»", "On peut dire «&nbsp;un acte répréhensible&nbsp;» ou «&nbsp;un acte répréhensif&nbsp;»"],
				    solution: [2],
				    correction: "<i>Un acte répréhensible</i> mérite d’être réprimandé, <i>un acte répréhensif</i> est un acte qui réprimande."
				}, {
				    question: "Quelle est l’affirmation juste&nbsp;?",
				    reponses: ["Dans almanach, ch se prononce comme le ch de match", "Dans almanach, ch se prononce [k]", "Dans almanach, ch ne se prononce pas"],
				    solution: [2],
				    correction: "Mais on prononce [k] en liaison (<i>un almanach ancien</i>)."
				}, {
				    question: "Quelle est la phrase correcte&nbsp;?",
				    reponses: ["C’est méritant de sa part", "C’est méritoire de sa part"],
				    solution: [1],
				    correction: "<i>Méritant</i> s’emploie à propos d’une personne, et non à propos d’une action."
				}, {
				    question: "Un intrus s’est glissé parmi ces verbes. Lequel&nbsp;?",
				    reponses: ["Narguer", "Écanguer", "Arguer", "Taguer", "Haranguer"],
				    solution: [2],
				    correction: "Dans <i>arguer</i>, on prononce le <i>u</i> (on retrouve ce <i>u</i> dans <i>argument</i>)."
				}
			]
        }
	]
};

﻿var dictees = {
    concours: {
        region: {
            '2011': {
                auteur: "PHILIPPE DELERM",
                nom: "L'amer et le sucré",
                annee: "2011",
                texte: "<p>C'est une idée amère, mais il faut bien le constater&nbsp;: le goût de l'amertume vient avec les années. Cela relève peut-être purement de la physiologie. Peut-être. Il y a des exceptions, comme en orthographe, mais c'est ainsi&nbsp;: on a rarement vu des écoliers faire la fine bouche devant les bonbons de la boulangère, que leur préférence aille aux rouleaux de réglisse incrustés d'une pastille rose, aux crocodiles d'un vert ou d'un jaune presque phosphorescents, ou bien à ces petites langues parfumées au fruit de la Passion, saupoudrées de neige acide. Tout cela est d'autant plus tentant que les parents se veulent très dissuasifs à l'égard de ces merveilles sensées promettre un avenir redoutable. Mais les enfants vivent au présent, ou bien au futur proche. Préadolescents, ils gagnent en liberté. Dans les fast-foods, le pain américain et le ketchup ne sont jamais trop sucrés. Et puis le temps file. Dans les festivals de rock, on leur servira seulement de la bière, et que s'est-il passé&nbsp;? Quelques années auparavant, ils pinçaient les lèvres de dégoût devant la boisson fermentée qui tout à coup les désaltère. </p><p>Les effluves du houblon soudain appréciés, c'est bien le début d'une toute autre histoire. Les foudres engrangées dans les caves des abbayes wallonnes ne seront bientôt plus seuls en cause. Le goût adulte fait son miel des bizarreries les moins ragoûtantes&nbsp;: champignons kaki pour la couleur, spongieux quant à la texture, et pour l'odeur… Quand la pourriture se fait noble, c'est l'apogée triomphale du mycologue, de l'œnologue, du fromager, de tous ces gastronomes qui ont quitté leur culotte courte pour parler gravement des plaisirs haut de gamme, de la psaliotte et du clitocybe, de l'appenzell ou du géromé. Quelques rares qu'ils puissent paraître, les noms que j'ai choisi d'inviter ici font l'ordinaire jubilatoire des spécialistes. </p><p>L'âge venant, le \"C'est un peu sucré!\" prend des allures de reproche, voire même de constat rédhibitoire. Les huîtres et les œufs d'esturgeon tiennent le haut du pavé, et le vrai foie gras, celui dont la fausse douceur exhume un goût de fiel. Même les charmes anciens du chocolat sont dévoyés avec des taux ébourrifants de cacao. </p><p>L'amer apaise les adultes. À raffiner avec lui, ils se consolent du bonheur qu'ils n'auront pas trouvé. Mais le parcours n'est pas bouclé. À ceux qui connaîtront le très grand âge, un goût d'enfance reviendra. Et ils pourront enfin sucrer les fraises en toute impunité.</p>",
                fautes: [108, 194, 199, 245, 272, 281, 352],
                correction: ["censées", "tout", "engrangés", "triomphal", "psalliote", "Quelque", "ébouriffants"]
            },
            '2012': {
                nom: "Les anges de Rio",
                texte: "<p>Alors que chaque jour Rio développait davantage ses tentacules constituées de maisons marrons, de toitures rouges, de volets turquoises, les enfants du bidonville avaient aménagé une scène de théâtre à ciel ouvert. Là, ils donnaient libre cours à leur imagination&nbsp;: ils jouaient des saynètes, chantaient à tue-tête, s'exerçaient à la danse.</p><p>Tous les dimanche à seize heures pile, ces artistes en herbe offraient une représentation qu'ils avaient rodée pendant la semaine. </p><p>Sur ce sol où chèvres et moutons s'étaient succédé, l'art avait désormais pris ses quartiers. Certes, ce n'était pas un repère de talents. Quand Pablo se risquait à interpréter une chanson en américain&nbsp;–&nbsp;langue dont il n'avait nuls rudiments –, on n'entendait qu'un galimatias confus, un charabia absurde où surnageaient, distincts, çà et là, les mots qu'il prenait pour du brésilien. Si Jairo fredonnait, on souffrait aussi le martyre tant il produisait de sons faux&nbsp;: quoi_que la ligne mélodique s'avérat juste, chacune des notes qu'il émettait sonnait un ou deux commas plus bas que celle de ses camarades, ce qui donnait l'impression d'un bourdon au sein du chœur. </p><p>Quoiqu'il en soit, leur chef, Pamela, quinze ans, avait su tirer parti de tous ces défauts et transformait les prestations ratées en numéros burlesques. </p><p>–&nbsp;Je veux bien qu'on rit, mais pas de vous, réitérait-elle à loisir, dressée debout sur l'estrade en ruine.</p><p>Au fil des triomphes, tout le monde voulait faire partie de cette troupe hors pair. Certes, Pamela incorpora le plus de candidats possibles. Mais arrivée à quatre-vingts garçons et quatre-vingt-dix filles qu'elle avait acceptés d'accueillir, elle avoua ne pouvoir prendre la population tout entière.</p><p>Géhenne devenue paradis, la favela exultait quelle que fût la production dominicale. Ces jeunes thaumaturges régalaient de leurs chants montant vers le ciel le public carioca qui, ne fût-ce que le temps de la représentation, faisait fi des décombres dispersés, du chaos des ordures et des immondices pourris. Répétant pour eux et pour l'azur, les enfants se baptisèrent «&nbsp;La compagnie verticale&nbsp;».</p>",
                fautes: [9, 12, 18, 53, 91, 145, 149, 178, 206, 242, 253, 311],
                correction: ["constitués", "marron", "turquoise", "dimanches", "repaire", "quoique", "s'avérât", "Quoi qu'il", "rie", "possible", "accepté", "pourries"]
            },
            '2013': {
                nom: "Le thé de la solitude",
                texte: "<p>Il y avait des siècles, en Asie, un empereur assoupi à l'ombre d'un arbre avait posé sur l'herbe le bol d'eau qu'il venait de faire bouillir. Pendant sa sieste, les feuilles d'un théier avoisinant, transportées par un doux zéphir, virevoltèrent dans sa tasse. En se réveillant et en y goûtant, l'empereur tomba amoureux de l'arôme qui s'en serait dégagé. Ainsi naquit l’épopée du thé. Cette légende, Léa la savoure chaque jour.</p><p>C’est depuis son escapade londonienne et une virée dans un magasin de thé, dont l'impressionnante devanture emprunte de sérénité et la façade bleu turquoise l'avaient subjuguée, que Léa s’était entichée de tout ce qui peut être en relation avec ce breuvage mythique, son histoire, ses variétés, ses secrets, ses différences et sa préparation. Mue par une exubérance inédite, elle avait erré à l'envi ce jour-là dans les rayons pimpants exhibant une myriade de boîtes multicolores.</p><p>Cette marotte anglaise est devenue obsessionnelle. Aussi son entourage se plaint-il que Léa se montre si attachée à tant de détails tels que l’épaisseur de la tasse – en porcelaine fine, bien entendu, et tiède, je vous prie&nbsp;! – ou encore la facture de la théière, lourde, somptueuse, en fonte cuivrée, que l’on aura dûe ébouillanter auparavant. De même, personne ne comprend qu’elle voit tant d’importance dans la manière de humer les exalaisons d'un thé de Chine fumé ou l'effluve plus subtile et raffinée encore d'un grand darjeeling. Les affres provoqués par ce cérémonial en déroutent plus d’un&nbsp;: comme si le simple fait de déguster cette boisson unique devait être dicté par une série de lois immuables, comme s’il s'agissait d'un grand cru. Ne pas oublier la petite passoire. Ensuite, laisser infuser, cinq minutes, pas une de plus, ah&nbsp;! ça&nbsp;! Elle contrarie sans ressipiscence ses invités avec le nuage de lait, à ajouter après, pas avant, signe d'un faux pas d'une ignorance et d'une inélégance confondante. </p><p>Las&nbsp;! Toujours est-il qu'à force de rebattre les oreilles de tout le monde avec son savoir-faire d'outre-Manche, chacun de ses amis, même les plus fidèles, la fuient à l’heure du thé. Désormais, Léa prend son breuvage toute esseulée.</p>",
                fautes: [38, 87, 198, 207, 216, 225, 227, 234, 283, 287, 309, 336, 346],
                correction: ["zéphyr", "empreinte", "dû", "voie", "exhalaisons", "subtil", "raffiné", "provoquées", "çà", "résipiscence", "confondantes", "fuit", "tout"]
            }
        },
        nation: {
            '2011': {
				auteur: "PHILIPPE DELERM",
				nom: "On est en finale",
				annee: "2011",
				texte: "<p>«&nbsp;On est en finale&nbsp;!&nbsp;» On imagine sans effort la mélodie qui accompagne cette phrase de triomphe, sans trop savoir s'il s'agit bien là de l'«&nbsp;air des lampions&nbsp;», connue de tous et attribué à une musique assez peu mélodieuse. Son compositeur semble avoir renoncé à se manifester, gâchant par pudeur des droits pharaoniques.</p><p>Le «&nbsp;on est en finale&nbsp;» est d'essence nettement sportive et concerne à l'évidence les sports tel que le football et le rugby. Il résonne d'une fierté franco-française, d'un orgeuil de clocher. On ne saurait l'associer à des victoires planétaires. </p><p>On y perçoit aussi des connotations printanières, voir l'approche de l'été. Le sport de balle étant la préoccupation majeure de nos concitoyens, il serait d'autant plus tentant d'appliquer l'euphorie du «&nbsp;On est en finale&nbsp;!&nbsp;» à une épreuve intellectuelle qui s'immisserait voluptueusement dans le calendrier. L'exclamation resterait tout intime, mais la mine réjouie de cinq cent timbrés d'orthographe de tous âges pourrait rivaliser avec les vociférations dues aux espérances de gloire, et signifier autant, dans la subtilité matoise du silence. </p><p>Quoiqu'en dise Pierre de Coubertin, l'essentiel n'est pas de participer, mais d'être en finale. Partir à plus de vingt milles et se retrouver cinq cents en arrivant au port, voilà de quoi inverser la dynamique cornélienne, et justifier un triple salchow mental – oui, on peut être assis, un stylo à la main, et sauter de joie en son fort intérieur. Et puis quoi&nbsp;? La sélection s'est faite sans violence. Pas d'ecchymoses relevés sur les adversaires, pas davantage d'échauffourées. On a fait tous les efforts qu'on a pu pour suivre le cours d'une dictée rapide à défaut d'être redoutable. Et voilà. Cinq cents timbrés silencieux comme des bernard-l'ermites à l'écoute d'un nouveau texte.</p><p>Connaissant la gourmandise de l'auteur, ils se sont appropriés, à force de révisions, l'orthographe de plats dépaysants&nbsp;: goulash relevé de paprika, bortsch, haggis ou waterzoï. Certains juniors ont fait la grimace, déçus de n'être pas confrontés à ces difficultés qu'ils auraient maîtrisé. D'autres candidats avaient prospecté dans tous les brics-à-brac de la nomenclature sportive, et se disent déjà que leur savoir leur servira l'année prochaine. Ils seront en finale, le rendez-vous est pris.</p>",
				fautes: [28, 68, 81, 99, 131, 146, 171, 190, 229, 242, 277, 291, 324, 332],
				correction: ["connu", "tels", "orgueil", "voire", "s'immiscerait", "cents", "Quoi qu'en", "mille", "for", "relevées", "bernard-l'ermite", "approprié", "maîtrisées", "bric-à-brac"]
			},
            '2012': {
                nom: "ADIEU À LA TERRE",
                texte: "<p>Il avait quitté son mas, son champ de dahlias rouges et de colchiques rosées, ses bosquets et prairies parfumés où il aimait accomplir de longues balades. Désormais, il ne remplirait plus sa vieille besace de pommes de pin tombées au sol, d'amendes sauvages, de champignons charnus. En effet, il avait, sans un remord, abandonné sa terre d'adoption pour retourner à la ville d'où il était parti il y a quelques décennies de cela. </p><p>Quelle volte-face inattendue&nbsp;! Depuis des années, avec une constance dépourvue d'ambiguïté, Georges avait investi dans sa ferme à fonds perdu et, quoi_qu'il fût nouveau sur ces coteaux provençaux, ses rares voisins pensaient avoir affaire à un paysan passionné, profond, opiniâtre, peu exubérant, qui finirait par faire fructifier des terres sèches que nulles alluvions ne nourrissaient. Récemment, sur ces arpents qu'étaient sensés avoir enrichi l'engrais et l'arrosage fréquents, il n'avait obtenu que de maigres récoltes. </p><p>Certains raillaient son amateurisme. </p><p>- De même qu'on ne fait pas sauter les culs-de-jattes en hauteur, on ne transforme pas un citadin en paysan&nbsp;!</p><p>Le vigneron répliqua&nbsp;:</p><p>- Votre explication ne me convainc pas. Je ne crois pas qu'aucun agriculteur en n'ait jamais fait autant. S'il n'avait engagé aucuns frais, j'admettrais que Georges se détourne, qu'il voie une autre solution, qu'il acquière vite un appartement en ville. Mais lui…</p><p>Quels que soient, quel_que obscur qu'aient pu paraître, aux esprits gourds des villageois, les méandres de sa pensée, le résultat était là&nbsp;: Georges partait et laissait quelque trois mille ares derrière lui. Adieu pénates adorés&nbsp;! Adieu coteaux&nbsp;! Adieu effluves embaumés de la mer&nbsp;! </p><p>Certains assuraient que sa femme l'avait découragé. Celle-ci n'avait pas la cote, manquant de turiféraires et multipliant les sicophantes. Le jour des au revoir, sous les myrobolans mirobolants, peu importait que Georges flânât ou qu'il se hâtât, les yeux des voisins se dirigeaient vers son épouse. Toute heureuse, toute couverte de soie dorée, perchée sur de hauts talons fuschia, elle s'était frotté les mains en public, s'était laissée aller à chantonner à tue-tête, et s'était même crue autorisée à klaxonner le long du chemin.</p><p>Cependant, les plus subtils se demandaient encore&nbsp;: pourquoi&nbsp;?</p>",
                fautes: [13, 41, 52, 94, 133, 135, 139, 160, 188, 219, 220, 273, 277, 305, 317],
                correction: ["rosés", "d'amandes", "remords", "quoiqu'il", "censés", "enrichis", "fréquent", "culs-de-jatte", "ait", "quelque", "obscurs", "thuriféraires", "sycophantes", "Tout", "fuchsia"]
            },
            '2013': {
                nom: "L'appel du sucre",
                texte: "<p>Très tôt, Stéphane arrive à l'usine. Son labeur consiste à faire redémarrer les machines assoupies depuis la pause nocturne. Les quatre cent cannes récoltées commencent à être livrées. Elles doivent être traitées sur-le-champ, sinon elles risquent de se déshydrater et leur précieuse teneur en sucre n'en serait que diminuée. </p><p>À force, Stéphane ne remarque plus l'odeur particulière qui saisit dès l'entrée franchie, composée de relents de mélasse opiniâtre, parfois pestilentielle. L'extraction du jus de canne, obtenu par broyage à travers une série de bruyants cylindres, demande une attention particulière. Dès potron-minet, il lui faut également veiller sur la bagasse, résidu fibreux glané concomittamment au liquide brunâtre. </p><p>Quel_que soit l’étape du processus de fabrication, Stéphane s’en occupe avec minutie&nbsp;: l’épuration du vezou additionné de lait de chaux, suivie de l'évaporation, puis de la cuisson et, enfin, de la cristallisation. Mais c'est phase de la centrifugeuse qui a sa préférence, immense essoreuse dont la sourde rumeur l’enivre avec la vigueur exaltante de tambours géants. Exangue, mouillé par la sueur comme s’il eut plu à verse, le cœur battant au rythme de l'usine qui l’a vue grandir depuis les années quatre-vingts, pleinement dévouée, Stéphane s'affaire à son travail, travail qui par parenthèses ne conviendrait nullement aux sybarites. </p><p>Son acolyte, le rondouillard Gaspard, vêtu d’un sarrau aux stries kakis, salue Stéphane alors qu'ils se retrouvent nez à nez dans une coursive tout en longueur. </p><p>–&nbsp;Ça roule&nbsp;? lance Gaspard, hilare, les joues écarlates. </p><p>Mais Stéphane ne manque pas de lui rappeler les tâches qu’ils se sont répartis&nbsp;:</p><p>–&nbsp;N'oublie pas de vérifier la température. Note tout, sinon on va à vau-l'eau. Ferme bien le sas. La dernière fois, quel pataquès&nbsp;!</p><p>Gaspard soupire, l'échine lasse. Un cauchemar, ce personnage&nbsp;! Ça beau être un canon moulé dans une salopette, je n’en voudrais pas&nbsp;! Cette hurluberlue est mariée avec son usine, soudée corps et âme avec elle. Sa seule obsession&nbsp;: le sucre, même pas la caïpirinia&nbsp;!</p>",
                fautes: [21, 67, 69, 102, 106, 120, 162, 163, 169, 187, 198, 214, 251, 282, 316],
                correction: ["cents", "opiniâtres", "pestilentiels", "concomitamment", "Quelle que", "vesou", "Exsangue", "mouillée", "eût", "quatre-vingt", "parenthèse", "kaki", "réparties", "Ç'a", "caïpirinha"]
            }
        }
    },
    dictees: [
        {
            texte: "En reconduisant la Patronne, comme il se trouvait assis en face d'elle, il rencontra encore une fois son œil caressant et fuyant, qui semblait troubler. Il pensait&nbsp;: «&nbsp;Bigre, je crois qu'elle mort&nbsp;»&nbsp;; et il souriait en reconaissant qu'il avait vraiment de la chance auprés des femmes, car Mme de Marelle, depuis le recommencement de leur tendresse, parraissait l'aimer avec frénésie.",
            nom: "Bel-Ami",
            auteur: "Guy de MAUPASSANT",
            annee: "1885",
            fautes: [24, 31, 36, 43, 56],
            correction: ["troublé", "mord", "reconnaissant", "auprès", "paraissait"]
        }, {
            texte: "C'est ainsi que, soit en surchargeant ses réservoirs, soit en descendant obliquemment au moyen de ses plants inclinés, le Nautilus atteignit successivement des profondeurs de trois, quatre, cinq, sept, neuf et dix milles mètres, et le résultat définitif de ces expériences fût que la mer présentait une température permanente de quatre degrés et demis, à une profondeur de mille mètres, sous toutes les latitudes.",
            nom: "Vingt Mille Lieues sous les mers",
            auteur: "Jules VERNE",
            annee: "1869",
            fautes: [11, 16, 32, 41, 53],
            correction: ["obliquement", "plans", "mille", "fut", "demi"]
        }, {
            texte: "Cette chaise que j'ai occupé si longtemps à la droite du barron sera la proie du gouverneur. Ô malheureux que je suis&nbsp;! Un âne bâté, un ivrogne sans pudeur, me relègue au bas bout de la table&nbsp;! Le majordôme lui versera le premier verre de Malaga, et lorsque les plats arriveront à moi, ils seront à moitié froid, et les meilleurs morceaux déjà avalés&nbsp;; il ne restera plus autour des perdreaux ni choux ni carottes. ",
            nom: "On ne badine pas avec l'amour",
            auteur: "Alfred de MUSSET",
            annee: "1834",
            fautes: [4, 11, 38, 57],
            correction: ["occupée", "baron", "majordome", "froids"]
        }, {
            texte: "M. Myriel n'avait pas de bien, sa famille étant ruinée par la révolution. Sa sœur touchait une rante viagère de cinq cents francs qui, au presbythère, suffisait à sa dépense personelle. M. Myriel recevait de l'État comme êvèque un traitement de quinze milles francs. Le jour même où il vint se loger dans la maison de l'hôpital, M. Myriel détermina l'emploi de cette somme, une fois pour toutes.",
            nom: "Les Misérables",
            auteur: "Victor HUGO",
            annee: "1862",
            fautes: [17, 25, 30, 37, 42],
            correction: ["rente", "presbytère", "personnelle", "évêque", "mille"]
        }, {
            texte: "Je ne savais point que Rouletabille fût pieu et son ardente prière m'étonna. Quant il relevat la tête, ses yeux étaient plein de larmes. Il ne les cachait pas&nbsp;; il ne se préocupait nullement de ce qui se passait autours de lui&nbsp;; il était tout entier à sa prière et peut-être à son chagrin. Quel chagrin&nbsp;? Ne devait'il pas être heureux d'assister à une union désirée de tous&nbsp;? Le bonheur de Robert Darzac et de Mathilde Stangerson n'était-il point son œuvre&nbsp;? ",
            nom: "Le Parfum de la dame en noir",
            auteur: "Gaston LEROUX",
            annee: "1908",
            fautes: [7, 13, 15, 21, 32, 39, 57],
            correction: ["pieux", "Quand", "releva", "pleins", "préoccupait", "autour", "devait-il"]
        }, {
            texte: "[Ma mère] avait peur d'interrompre une conversation où elle n'aurai pas eu à être mêlé. Et, en effet, à tout moment mon père rappellait au marquis quelque mesure utile qu'ils avaient décidée de soutenir à la prochaine séance de Commission, et il le faisait sur le ton particulier qu'ont ensembles dans un milieu différent — pareils en cela à deux collégiens — deux collègues à qui leurs habitudes professionnelles créent des souvenirs communs où n'ont pas accès les autres et auquel ils s'excusent de se reporter devant eux.",
            nom: "À l'ombre des jeunes filles en fleurs",
            auteur: "Marcel PROUST",
            annee: "1919",
            fautes: [9, 14, 23, 31, 49, 78],
            correction: ["n'aurait", "mêlée", "rappelait", "décidé", "ensemble", "auxquels"]
        }, {
            texte: "Les cuivres du couchant baissait dans les branches demies-nues de la forêt, élargissant l'horizon, amplifiant les lignes, enoblissant le paysage qu'un puissant soufle de vent vivifiait. Des chiens de garde, au loin, aboyaient au bout de leurs chaînes&nbsp;; un corbeau rappelait ses compagnons pour le couché, les Velrans s'étaient tu, on n'entendait rien des Longevernes. ",
            nom: "La Guerre des boutons",
            auteur: "Louis PERGAUD",
            annee: "1912",
            fautes: [4, 8, 17, 22, 45, 49],
            correction: ["baissaient", "demi-nues", "ennoblissant", "souffle", "coucher", "tus"]
        }, {
            texte: "L'élève de M. Snowdrop, George Arthurson, joli garçon d'une vingtaine d'années, était le fils d'un des plus vieux ami du docteur, et ce dernier l'aimait comme son propre fils. Le jeune homme ne fût pas insensible à la beauté de miss Bertha, mais, en honête garçon qu'il était, il refoulla son sentiment au fonds de son cœur et se jeta dans l'étude pour occuper ses esprits. ",
            nom: "À se tordre, Histoires chatnoiresques",
            auteur: "Alphonse ALLAIS",
            annee: "1891",
            fautes: [18, 33, 44, 49, 53],
            correction: ["amis", "fut", "honnête", "refoula", "fond"]
        }, {
            texte: "Madame Latournelle, fille du greffier du tribunal de première instance se trouve suffisament autorisée par sa naissance à se dire issu d'une famille parlementaire. Cette prétension indique déjà pourquoi cette femme, un peu trop couperosée, tache de se donner la majestée du tribunal dont les jugements sont griffonnés par monsieur son père. Elle prend du tabac, se tient roide comme un pieux, se pose en femme considérable, et ressemble parfaitement à une momie à laquelle le galvanisme aurait rendue la vie pour un instant. ",
            nom: "Modeste Mignon",
            auteur: "Honoré de BALZAC",
            annee: "1844",
            fautes: [12, 20, 25, 35, 40, 61, 78],
            correction: ["suffisamment", "issue", "prétention", "tâche", "majesté", "pieu", "rendu"]
        }, {
            texte: "Une des plus belles moustaches modernes, celle du roi Victor-Emmanuel, qui lui coupait si bien le visage en deux comme une héroïque balaffre, ne lui permettait pas de manger en publique&nbsp;; et, quand il mangeait tout seul, les portes bien clôses, il fallait qu'il les releva avec un foulard, dont il attachait les bouts derrière sa tête. Combien alors ne devait'il pas envier la moustache du Chat, qui se relève d'elle-même et toute seule, et ne le gène en aucune façon dans les plus pompeux festins d'apparat&nbsp;!",
            nom: "Le Chat",
            auteur: "Théodore de BANVILLE",
            annee: "1882",
            fautes: [22, 30, 40, 45, 60, 77],
            correction: ["balafre", "public", "closes", "relevât", "devait-il", "gêne"]
        }, {
            texte: "L'expéditionaire Sainthomme, du bureau des fondations, était un maigre personnage de qui le maladif visage, éternellement en moiteur, avait l'humidité jaune claire des pommes de terre crues, fraîchement pelées. Entre les accros d'un veston ancaustiqué ainsi qu'un meuble, sur les vastes glacis duquel on aurait aimé s'élancer, couvert d'épaisses fourrures et les pieds chaussés de patins, il dissimulait tant bien que mal l'attristante infâmie de ses dessous.",
            nom: "Messieurs les ronds-de-cuir",
            auteur: "Georges COURTELINE",
            annee: "1893",
            fautes: [0, 21, 31, 34, 63],
            correction: ["L'expéditionnaire", "clair", "accrocs", "encaustiqué", "infamie"]
        }, {
            texte: "Il y en a un [pape] surtout, un bon vieux, qu'on appelait Boniface... Ô&nbsp;! celui-là, que de larmes on a versé en Avignon quand il est mort&nbsp;! C'était un prince si aimable, si avenant&nbsp;! Il vous riait si bien du haut de sa mûle&nbsp;! Et quand vous passiez près de lui, — fussiez-vous un pauvre petit tireur de garance ou le grand viguier de la ville, — il vous donnait sa bénédiction si poliement&nbsp;!",
            nom: "Lettres de mon moulin",
            auteur: "Alphonse DAUDET",
            annee: "1866",
            fautes: [13, 20, 43, 71],
            correction: ["Oh", "versées", "mule", "poliment"]
        }, {
            texte: "Flaubert disait&nbsp;: «&nbsp;Ah&nbsp;! ces hommes du XVIIe siècle&nbsp;! Comme ils savaient le latin&nbsp;! Comme ils lisaient lentemment&nbsp;!&nbsp;» Même sans dessin d'écrire soi-même, il faut lire avec lenteur, quoique ce soit, en se demandant toujours si l'on a bien compris et si l'idée que vous venez de recevoir est bien celle de l'auteur et non la votre. «&nbsp;Est-ce bien celà&nbsp;?&nbsp;» doit être la question continuelle que le lecteur se fait à lui_même.",
            nom: "L'Art de lire",
            auteur: "Émile FAGUET",
            annee: "1912",
            fautes: [16, 19, 27, 55, 58, 70],
            correction: ["lentement", "dessein", "quoi que", "vôtre", "cela", "lui-même"]
        }, {
            texte: "Ici les rire devinrent unanimes. Chacun s'écria&nbsp;: «&nbsp;Mais il n'a jamais eu de voix&nbsp;!&nbsp;» et les épigrammes recommencèrent de plus belles. Nous rendons justice à M. de Lusigny, sa contenance était admirable. Il opposa à cette émeute de salon le sang-froid le plus grâcieux, la bonomie la plus spirituelle&nbsp;; il avait l'air si heureux d'être maltraité par tout le monde, il paraissait si fier d'être coupable, que Léontine elle-même finit par se laisser touchée en sa faveure.",
            nom: "Il ne faut pas jouer avec la douleur",
            auteur: "Delphine Gay de GIRARDIN",
            annee: "1853",
            fautes: [2, 20, 43, 45, 73, 76],
            correction: ["rires", "belle", "gracieux", "bonhomie|bonhommie", "toucher", "faveur"]
        }, {
            texte: "Quand au jardin lui-même, il retournait doucement à l'état de hallier ou de forêt vierge. À l'exception d'un carré où se pomelaient quelques choux aux feuilles veinées et vert-de-grisé, et qu'étoilaient des soleils d'or au cœur noir, dont la présence témoignaient d'une sorte de culture, la nature reprenait ses droits sur cette espace abandonné et en effaçait les traces du travail de l'homme qu'elle semble aimer à faire disparaître.",
            nom: "Le Capitaine Fracasse",
            auteur: "Théophile GAUTIER",
            annee: "1863",
            fautes: [0, 21, 28, 40, 51],
            correction: ["Quant", "pommelaient", "vert-de-grisées", "témoignait", "cet"]
        }, {
            texte: "Voilà précisèment la cause de mon malheur, Excellence. Quand on a rapporté au ministre que je faisais, je puis dire assez joliment, des bouquets à Chloris, que j'envoyiais des énigmes aux journeaux, qu'il couraient des madrigaux de ma façon&nbsp;; en un mot, quand il a su que j'étais imprimé tout vif, il a prit la chose au tragique et m'a fait ôter mon emploi, sous prétextes que l'amour des lettres est incompatible avec l'esprit des affaires.",
            nom: "Le Barbier de Séville",
            auteur: "Pierre-Augustin Caron de BEAUMARCHAIS",
            annee: "1775",
            fautes: [1, 27, 31, 33, 53, 65],
            correction: ["précisément", "j'envoyais", "journaux", "courait", "pris", "prétexte"]
        }, {
            texte: "Les deux frères étaient tout contraste&nbsp;: Salaün, petit, trappu, les épaules larges, la tête énorme, le cuir raiche et noir&nbsp;; Thomassin, grand, bien pris, avec une jolie tête d'un rose à peine hâllé, des yeux clairs et une barbe blonde qui frisait. De même souche maternelle, il semblait qu'ils fussent étrangers l'un à l'autre. Leur mère, à qui, suivant l'usage breton, on continuait de donner son nom de fille, Anne-Yvonne Barzic, avait épousée, à dix-sept ans, un cultivateur de l'Île-Grande, Évariste Salaün, un plein Breton comme elle, noueux, carré de corps et d'esprit, qui mourrut trois mois juste après les noces, la laissant enceinte.",
            nom: "Le Crucifié de Keraliès",
            auteur: "Charles LE GOFFIC",
            annee: "1891",
            fautes: [8, 17, 32, 72, 94],
            correction: ["trapu", "rêche", "hâlé", "épousé", "mourut"]
        }, {
            texte: "J'avais loué à Cordoue un guide et deux chevaux, et m'étais mis en campagne avec les Commentaires de César et quelques chemises pour tout bagages. Certain jour, errant dans la partie élevée de la plaine de Cachena, harrassé de fatigue, mourant de soif, brûlé par un soleil de plomb, je donnai au diable de bon cœur César et les fils de Pompée, lorsque j'aperçus, assez loin du sentier que je suivais, une petite pelouse verte parsemée de jons et de roseaux. Cela m'annonçait le voisinage d'une source.",
            nom: "Carmen",
            auteur: "Prosper MÉRIMÉE",
            annee: "1846",
            fautes: [24, 37, 50, 77],
            correction: ["bagage", "harassé", "donnais", "joncs"]
        }, {
            texte: "Ils [ces amants] se seraient faits un crime de se dérôber la circonstance de leur vie la plus minutieuse. Ces suppositions singulières&nbsp;: «&nbsp;Si le ciel qui m'a placé sur le trône m'eût fait naître dans un état obscur, eussiez-vous daigner descendre jusqu'à moi, Mirzoza m'eut-elle couronnée&nbsp;?... Si Mirzoza venait à perdre le peu de charmes qu'on lui trouve, Mangogul l'aimerai-t-il toujours&nbsp;?&nbsp;» ces suppositions, dis-je, qui excercent les amants ingénieux, brouillent quelquefois les amants délicats, et font mentir si souvent les amants les plus sincères, étaient usées pour eux.",
            nom: "Les Bijoux indiscrets",
            auteur: "Denis DIDEROT",
            annee: "1748",
            fautes: [5, 10, 39, 44, 59, 65],
            correction: ["fait", "dérober", "daigné", "m'eût-elle", "l'aimerait-il", "exercent"]
        }, {
            texte: "Je viens prier non les dieux, mais les législateurs, qui doivent être les organes et les interprêtes des lois éternelles que la Divinité a dicté aux hommes, d'effacer du code des Français les lois de sang qui comandent des meurtres juridiques, et que repoussent leur mœurs et leur constitution nouvelle. Je veux leurs prouver,&nbsp;1° que la peine de mort est essentiellement injuste&nbsp;;&nbsp;2° qu'elle n'est pas la plus réprimente des peines, et qu'elle multiplit les crimes beaucoup plus qu'elle ne les prévient.",
            nom: "Discours sur la peine de mort",
            auteur: "Maximilien de ROBESPIERRE",
            annee: "1791",
            fautes: [16, 24, 37, 44, 52, 69, 74],
            correction: ["interprètes", "dictées", "commandent", "leurs", "leur", "réprimante", "multiplie"]
        }, {
            texte: "Il y avait au milieux de la terrasse un petit lit d'ivoire, couvert de peaux de linx avec des coussins en plumes de perroquet, animal fathidique consacré aux Dieux, et dans les quatre coins s'élevaient quatre longues cassolettes remplies de nard, d'encen, de cinnamome et de myrhe. L'esclave alluma les parfums. Salammbô regarda l'étoile polaire&nbsp;; elle salua lentement les quatre points du ciel.",
            nom: "Salammbô",
            auteur: "GUSTAVE FLAUBERT",
            annee: "1879",
            fautes: [4, 16, 25, 41, 46],
            correction: ["milieu", "lynx", "fatidique", "d'encens", "myrrhe"]
        }, {
            texte: "Madame Derville voyait avec étonnemment que son amie, toujours grondé par M. de Rénal, à cause de l'excessive simplicité de sa toilette, venait de prendre des bâts à jour et de charmants petits souliers arrivés de Paris. Depuis trois jours, la seule distraction de madame de Rénal avait été de taillé, et de faire faire en toute hate, par Élisa, une robe d'été, d'une jolie petite étofe fort à la mode.",
            nom: "Le Rouge et le Noir",
            auteur: "STENDHAL",
            annee: "1884",
            fautes: [4, 9, 26, 50, 57, 66],
            correction: ["étonnement", "grondée", "bas", "tailler", "hâte", "étoffe"]
        }, {
            texte: "Le lendemain soir, la Griotte repartit en chasse comme de coûtume. Il lui sembla qu'elle suivrait Pierre plus aisémment. Il marchait au milieu de la route sans tourner la tête de droite et de gauche, comme une personne honête qui se promène, pour se promener, et n'a rien à craindre. Il s'enfonca tranquillement dans l'ombre des accacias. Elle crut le tenir, avec l'autre peut-être. Mais brusquement il se retourna.",
            nom: "Sourires pincés",
            auteur: "JULES RENARD",
            annee: "1890",
            fautes: [10, 18, 38, 51, 56],
            correction: ["coutume", "aisément", "honnête", "s'enfonça", "acacias"]
        }, {
            texte: "Cependant frère Monsoreau descendait un des escaliers qui conduisaient de la nef au cœur, et venait ouvrir la porte de bronze donnant dans la cripte située entre les deux escaliers. En même temps, le moine du milieu abaissait son capuchon, et montrait la grande cicatrice, noble signe auxquels les parisiens reconnaissaient avec tant d'ivresse celui qui déja passait pour le héros des catholiques, en attendant qu'il devînt leur martyre.",
            nom: "La Dame de Monsoreau",
            auteur: "ALEXANDRE DUMAS",
            annee: "1890",
            fautes: [13, 24, 47, 49, 56, 68],
            correction: ["chœur", "crypte", "auquel", "Parisiens", "déjà", "martyr"]
        }, {
            texte: "La passion s'honnore et jouit parfois de ses douleurs, mais le mal que j'éprouvais était affreux. Je redescendi au salon, où quelques personnes causaient près de la porte du jardin. Le piano était ouvert, et moi, si souvent calmée ou exhaltée par la musique, j'y cherchais quelque secours, en pensant à une jeune amie irlandaise dont la tristesse et l'affection me revinrent en mémoire. Alors aussi la pensée que Jérôme était malheureux vint régner sur tout autre.",
            nom: "Les Enchantements de Prudence",
            auteur: "MADAME DE SAMAN",
            annee: "1873",
            fautes: [2, 17, 40, 75],
            correction: ["s'honore", "redescendis", "exaltée", "toute"]
        }, {
            texte: "Le proscrit suivit la fée jusqu'à une corniche de rochers si étroite et si efrayante que l'âne et le mulet reculèrent épouvantés&nbsp;; mais la fée les charma, et ils passèrent. Quand à l'homme, il avait tellement le désir d'échaper à ceux qui le poursuivaient qu'il ne fut pas nécessaire de lui faciner la vue. Il suivit les animeaux, et, dès qu'il eût mis le pied dans le Val-aux-Fées, il reconnut, dans celle qui le conduisait, une fée du premier ordre.",
            nom: "La Coupe",
            auteur: "GEORGE SAND",
            annee: "1876",
            fautes: [14, 30, 38, 51, 57, 61],
            correction: ["effrayante", "Quant", "d'échapper", "fasciner", "animaux", "eut"]
        }, {
            texte: "Des jeunes gens du village, très élégant dans leurs pelisses à col de loutre, parlaient avec déférance au vieux Nazaire Larouche, un grand homme gris au larges épaules osseuses qui n'avait rien changé pour la messe à sa tenue de tous les jours&nbsp;: vêtement court de toile brune doublé de peau de mouton, culottes râpiécées et gros bas de laine grise dans des moccassins en peau d'orignal.",
            nom: "Maria Chapdelaine",
            auteur: "LOUIS HÉMON",
            annee: "1938",
            fautes: [6, 16, 25, 54, 63],
            correction: ["élégants", "déférence", "aux", "rapiécées", "mocassins"]
        }, {
            texte: "Le docteur Marion, dont je n'hésite pas à mêler le nom à  cette plaisanterie du plus mauvais goût, me fournit une petite quantitée d'acide tartrique et de bicarbonnate de soude. A sec, ces deux corps ne réagissent point l'un sur l'autre. Dissous, ils se décomposent&nbsp;: l'acide tartrique se jette sur la soude avec une brutalité sans exemple, châssant ce pauvre bougre d'acide carbonnique qui se retire avec une vive effervessence, à l'instart de ces maris trompés qui claquent les portes pour faire voir qu'ils ne sont pas contents.",
            nom: "Deux et deux font cinq",
            auteur: "ALPHONSE ALLAIS",
            annee: "1895",
            fautes: [22, 27, 57, 62, 69, 71],
            correction: ["quantité", "bicarbonate", "chassant", "carbonique", "effervescence", "l'instar"]
        }, {
            texte: "On répéte trop souvent, et non sans quelque raison, que les Français sont casaniers et qu'ils ont peur de s'expatrier, ne fût-ce que momentanément&nbsp;; on ne saurait donc trop encourager les jeunes qui montrent de l'initiative et féliciter les parents qui savent se résigner à voir leurs enfants s'éloigner d'eux quelques temps pour se créer un avenir. Bon courage donc, mes chèrs neuveux, et puissiez-vous réussir dans vos entreprises, c'est le souhait que votre vieil oncle forme au fonds de son cœur&nbsp;!  ",
            nom: "Un sauvage à Paris",
            auteur: "HENRI DE GRAFFIGNY",
            annee: "1912",
            fautes: [1, 50, 61, 62, 78],
            correction: ["répète", "quelque", "chers", "neveux", "fond"]
        }, {
            texte: "[M. de La Tremlays] regardait [Vaunoy] comme un excellent et loyal parents. Les commenseaux du château faisaient comme le maître, et Vaunoy avait l'estime de tout le monde. Il n'y avaient que deux personnages auprès desquels il n'avait point su trouvé grâce&nbsp;: le premier et le plus considérable était Job, le chien favorit de Nicolas TremI&nbsp;; le second n'était autre que Jean-Blanc, l'Albinos. Chaque fois que Vaunoy entrait au salon, Job fixait sur lui ses rondes prunelles et grognait dans ses soies jusqu'à ce que M. de La Tremlays lui eut imposé péremptoirement silence.",
            nom: "La Forêt de Rennes",
            auteur: "PAUL FÉVAL",
            annee: "1838",
            fautes: [11, 13, 30, 40, 52, 90],
            correction: ["parent", "commensaux", "avait", "trouver", "favori", "eût"]
        }, {
            texte: "Un matin que Suzanne reposait, plongée dans un afaissement qui tenait le milieu entre le sommeil et la mort, le docteur ouvrît la fenêtre pour renouveller l'air de l'appartement, et il ne fut pas peu surpris d'appercevoir Jousselin qui, appuyé contre un arbre, ne quittait pas de vue la maison. Tous les jours l'employé venait à pied de Bayeux avec l'espérance de revoire encore une fois Suzanne&nbsp;; mais cette consolation lui manquait&nbsp;: Suzanne ne paraissait plus&nbsp;! ",
            nom: "Monsieur de Boisdhyver",
            auteur: "CHAMPFLEURY",
            annee: "1857",
            fautes: [8, 21, 25, 36, 62],
            correction: ["affaissement", "ouvrit", "renouveler", "d'apercevoir", "revoir"]
        }, {
            texte: "Soudain, tandis que je pensais à tous ces smockings pliés et ambulants qui rentraient en Angleterre, un personnage extravaguant surgit parmis ces bagages. [...] Son châpeau, au temps du bel âge de son feutre, avait du être dur&nbsp;; maintenant, il était plutôt mou. Ce galurin représentait cependant l'unique objet Européen de cette garde-robe. Une longue lévite déboutonnée et remplissant l'office de par-dessus laissait entrevoir une seconde lévite un peu verte que serrait à la taille un cordon fatigué.",
            nom: "Le Juif errant est arrivé",
            auteur: "ALBERT LONDRES",
            annee: "1930",
            fautes: [8, 18, 20, 24, 34, 48, 60],
            correction: ["smokings", "extravagant", "parmi", "chapeau", "dû", "européen", "pardessus"]
        }, {
            texte: "Ceux qu'une nation éclairée a choisi pour rédiger ses lois, pour veiller sur ses intêrets, pour détourner les dangers qui la menacent, ne se laisseront pas séduire par le langage hipocryte d'une fausse philosophie. Ils ne confondront point les sophismes qui conduiraient à une dangeureuse impunité, avec cette sévérité scrupuleuse, nécessaire pour la sécurité de l'innocence.",
            nom: "Réflections sur l'accusation judiciaire",
            auteur: "CONDORCET",
            annee: "ÉDITIONS DE 1847",
            fautes: [5, 14, 30, 44],
            correction: ["choisis", "intérêts", "hypocrite", "dangereuse"]
        }, {
            texte: "Les chiqueurs, les hommes à grands feutres gris et à pantalons trop larges qui flânent, cravaté de rouge, de midi à minuit, sur le port, pendant qu'aux bords des quais, dans une lumineuse poussière d'or, halettent et se démènent, les bras et les reins nus, comme moirée de sueur, les portefaix déchargeurs de farine, de blé, d'alpha ou de pains d'huile, ceux-là même dont Puget a immortalisés, dans ses cariatides, les profils de médailles et les pectoreaux musclés de gladiateurs. Marseille&nbsp;! ",
            nom: "Heures d'Afrique",
            auteur: "JEAN LORRAIN",
            annee: "1899",
            fautes: [15, 35, 46, 56, 66, 76],
            correction: ["cravatés", "halètent", "moirés", "d'alfa", "immortalisé", "pectoraux"]
        }, {
            texte: "Tout ce qu'elle [Emma] comprenait, la pauvre créature, c'est qu'elle était la cause de tout les malheurs qui allaient arrivés. Un coup de sabre la ferait veuve ou orpheline, et quelque fût l'événement, tout était fini pour elle. Le meurtrier de Meo ne serait plus son père&nbsp;: le meurtrier de son père ne serait jamais son mari. Elle se débattait en désespéré contre la certitude de son malheur, et ne voyait nul chemin pour y échapper.",
            nom: "Trente et quarante",
            auteur: "EDMOND ABOUT",
            annee: "ÉDITION 1900",
            fautes: [14, 19, 30, 61],
            correction: ["tous", "arriver", "quel que", "désespéré"]
        }, {
            texte: "Un homme vient d'être nomé à une place considérable&nbsp;; vous en rencontrez un autre qui était sur les rangs pour le même emploi&nbsp;; il vous dit pis que pendre du premier&nbsp;; il l'accuse d'inepsie, d'improbité&nbsp;; il accummule contre lui les inculpations et les injures&nbsp;; mais vous parla-t-il sur ce ton deux heures entières, tous ce qu'il vous dira se traduit par un seul mot&nbsp;: envieux.",
            nom: "Contes et opuscules en vers et en prose",
            auteur: "FRANÇOIS ANDRIEUX",
            annee: "1800",
            fautes: [4, 33, 36, 46, 53],
            correction: ["nommé", "d'ineptie", "accumule", "parlât-il", "tout"]
        }, {
            texte: "Sur un petit bureau lacqué de blanc, une bougie oubliée brûlait encore, parmi des feuillets manuscrits, des lettres toutes prêtes dans des envellopes aux monogrammes dorés. Il y avait là aussi du papier à musique sur lequel des notes avaient été griffonnées, comme dans la fièvre de composer. Et quelque livres traînaient parmi de frèles bibelots de Saxe&nbsp;: le dernier de la contesse de Noailles, voisinant avec des poésies de Baudelaire et de Verlaine, la philosophie de Kant et celle de Nietzsche. ",
            nom: "Les Désenchantées",
            auteur: "PIERRE LOTI",
            annee: "1908",
            fautes: [4, 22, 49, 54, 62],
            correction: ["laqué", "enveloppes", "quelques", "frêles", "comtesse"]
        }, {
            texte: "Déjà les premiers rayons du jour doraient les murs rougeâtres de Lutèce&nbsp;; la citée gaulloise se montrait, peu à peu, à travers les vapeurs des marécages qui l'environnent&nbsp;; rien ne troublait le silence des campagnes&nbsp;; nulle barque n'apparaissaient sur le fleuve, et ce n'était encore que le premier réveille de la nature. Une jeune druidesse devansant le jour, a quitté sa paisible demeure; ses longs cheveux d'ébène flottent en désordre sur ses blanches épaules.",
            nom: "Théodora ou la famille chrétienne",
            auteur: "CAMILLE PAGANEL",
            annee: "1825",
            fautes: [13, 14, 37, 48, 55],
            correction: ["cité", "gauloise", "n'apparaissait", "réveil", "devançant"]
        }, {
            texte: "A gauche, la voix qui conduisait à l'écurie, était barrée par un éboulement. Le voyage recommençat, plus pénible et plus dangereux. Des chauve-souris, effarées, volettaient, se collaient, à la voûte de l'accrochage. Il dût se hâter pour ne pas perdre de vue la lumière, il se jeta dans la même galerie&nbsp;; seulement, où l'enfant passait à l'aise, avec sa souplesse de serpent, lui ne pouvait se glisser sans meurtrir ces membres.",
            nom: "Germinal",
            auteur: "ÉMILE ZOLA",
            annee: "1885",
            fautes: [3, 15, 22, 24, 33, 69],
            correction: ["voie", "recommença", "chauves-souris", "voletaient", "dut", "ses"]
        }, {
            texte: "Ce sentiment d'une circonspection exagérée est innée à toutes les natures honêtes qui se trouvent sous le coût d'une catastrophe&nbsp;; leur puissance d'intuition, leur rapidité de calcul, toutes leurs belles qualités, qui marchent d'habitude l'œil fier et le front haut, se trouvent soudain abattus par la honte et la peur du scandale, comme un chêne par l'ouragan. Il n'y a que les vrais sélérats qui puissent conserver en pareil cas leur présence d'esprit.  ",
            nom: "Les Aventures du chevalier de Floustignac",
            auteur: "ADRIEN PAUL",
            annee: "1861",
            fautes: [6, 11, 17, 43, 63],
            correction: ["inné", "honnêtes", "coup", "abattues", "scélérats"]
        }
    ]
};

var tweets = [
    {
        categorie: "Origine & sens des mots",
        liste: [
            "Quand on est <i>grisé</i>, on devrait être triste, comme la couleur. Eh bien non, on est ivre de bonheur mais... la tête dans le brouillard !",
            "Comme son nom l’indique, la <i>berline</i> est née... à Berlin. Bien sûr, à la fin du XVIIe siècle, elle était encore tirée par des chevaux !",
            "En général, ce sont les adultes qui commettent des <i>adultères</i>. Pourtant, le mot vient du latin<i> alterare</i>, altérer : le serment de fidélité ?",
            "L’homme a toujours voulu voler comme un oiseau (<i>avis</i> en latin). C’est pourquoi l’<i>avion</i> a fini par remplacer l’aéroplane.",
            "Si Guillotin a préconisé l’usage de la <i>guillotine</i>, son invention revient au médecin Louis. La preuve : on la nomma d’abord « louisette » !",
            "Par le passé, <i>rien</i> (<i>rem</i> en latin) était une chose, sens que l’on retrouve encore dans « ce petit rien », « république » ou « réifier ».",
            "Pour bannir un citoyen, les Grecs inscrivaient son nom sur une coquille d’huître (<i>ostrakon</i>), d’où le lien entre <i>ostréiculture</i> et <i>ostracisme</i>.",
            "Avant, on « buvait » un<i> sorbet</i> qui était une boisson orientale. Depuis le XVIIIe siècle, on mange cette glace composée d’eau et de fruits.",
            "L’« e<i>́rection </i>papale » ne relève pas de la vie intime du souverain pontife mais consiste à ériger un nouveau diocèse par décret du pape.",
            "Peut-on sérieusement envisager de faire toute sa carrière dans la<i> finance</i> quand on sait que le mot découle du verbe... « finir » ?",
            "Si vous en avez marre de lire partout « Rest in Peace » dès qu’une popstar décède, utilisez le latin <i>Requiescat in pace</i>, plus classe !",
            "L’adjectif <i>kafkaïen</i>, du nom de l’écrivain Franz Kafka, renvoie à une situation sinistre, confuse et absurde, dans laquelle on se perd.",
            "En ancien français, <i>(h)abiller</i> signifiait « préparer une bille de bois ». Sous l’influence d’<i>habit</i>, il a donné « couvrir de vêtements ».",
            "« Peuchère ! » ne fait aucunement référence au coût de la vie. L’interjection vient du méridional <i>pécaïre</i> qui veut dire « pécheur ».",
            "À l’origine, le <i>crime e</i>́tait... une décision judiciaire ! Au fil du temps, par métonymie, le terme s’est appliqué à l’action coupable.",
            "Même si sa flamme ondule et vacille, la <i>bougie </i>ne vient pas du verbe « bouger » mais de la ville de Bougie (<i>Béjaïa</i>), en Algérie.",
            "Comme son nom l’indique, le « bis-cuit » est une mince galette... cuite deux fois !<i> Idem</i> pour la « bis-cotte », de l’italien <i>biscotto</i>.",
            "Avant de devenir un pronom personnel indéfini, « on » – qui s’est d’abord orthographié <i>om</i>, puis <i>hom</i> – désignait l’homme au sens large.",
            "C’est en référence au <i>Roman de Renart </i>(XIIIe siècle) que le canidé à longue queue dénommé goupil est devenu « renart », puis « renard ».",
            "« C’est ubuesque ! » disent souvent les journalistes. Tiré du personnage de théâtre<i> Ubu</i>, l’adjectif signifie « cruellement grotesque ».",
            "H, J, M = heure, jour, mois. Je pars en congés dans 3 mois, soit M–3 et non J–3 mois ! NB : H–24 = J–1 et J–31 (ou 28, 29, 30) = M–1.",
            "Au Moyen Âge, le <i>prud’homme</i> (preux + homme) avait tout d’un chevalier. En se professionnalisant, il a troqué la vaillance contre la sagesse.",
            "Le <i>revers</i> de la médaille, c’est le mauvais côté de quelque chose. L’autre côté est l’<i>avers</i> (et non l’envers, contraire de l’endroit).",
            "En vieux français, <i>hui</i> signifie « ce jour », aujourd’hui « au jour de ce jour ». « Au jour d’aujourd’hui » est donc un double pléonasme !",
            "Nous devons la <i>charlotte</i>, ce bonnet à bords froncés, devenu jetable et élastiqué, à Charlotte Corday, célèbre pour avoir assassiné Marat.",
            "Je t’aime encore ou toujours ? Avec <i>encore</i>, l’amour existe à l’instant T (mais jusqu’à quand ?) ; avec <i>toujours</i>, il durera quoi qu’il arrive.",
            "<i>Naguère</i> veut dire « il n’y a guère ». Il est donc plus proche dans le temps que<i> jadis</i>, contraction de<i> ja a dis</i>, « il y a déjà des jours ».",
            "On doit à Gargantua et Pantagruel les adjectifs <i>gargantuesque</i> et <i>pantagruélique</i> pour qualifier un repas copieux ou caractériser la démesure.",
            "Le <i>cosmonaute </i>est russe, l’<i>astronaute</i> est américain et le <i>spationaute</i> est de toutes les nationalités, y compris française.",
            "<i>Rhume</i> et<i> rhumatisme</i>, même combat ? Hors du nez ou entre les articulations, du liquide s’écoule (<i>rheuma</i> en grec) dans les deux cas !",
            "Si vous lisez ces lignes, vous n’êtes pas « il-lettré », qui ignore les lettres, encore moins « an-alpha-bète », qui ne sait ni A ni B.",
            "Comment Lucifer, qui « apporte la lumière » (du latin <i>lux</i>, <i>lucis</i>, lumière et <i>ferre</i>, apporter), est-il devenu le prince des ténèbres ?",
            "Tel dictateur avait de la <i>notoriété</i> : il était connu de tous. Tel chanteur avait de la <i>popularité</i> : il était aimé de tous. Nuance.",
            "Étymologiquement, le <i>chaos </i>est un « gouffre », mais ce n’est pas le néant pour autant. Au contraire, c’est un état de grande confusion.",
            "Nous informons nos aimables lecteurs... qu’avant d’être simplement plaisant ou poli, quelqu’un d’<i>aimable </i>est « digne d’être aimé ».",
            "« De bon matin, j’ai rencontré le train de trois grands rois » : la SNCF n’existant pas il y a 2 000 ans, le <i>train</i> désigne ici le cortège.",
            "« Tire la chevillette et la bobinette cherra » = pour ouvrir la porte, tire la petite tige afin de faire tomber (choir) la pièce en bois.",
            "Beijing est le nom officiel de la capitale chinoise. Pékin est une vieille transcription à laquelle les Français sont très attachés !",
            "Dire « je vais voir cette vidéo » est redondant car <i>video</i> signifie « je vois » en latin. C’est la même chose pour<i> audio</i>, « j’entends ».",
            "Mozart était un pianiste <i>génial</i> car sa précocité et son talent relèvent du <i>génie</i>. De là à dire que l’anniversaire de Martial était génial...",
            "Titre destiné à un homme, <i>Monsieur</i> n’est autre que la contraction de « mon seigneur », qui a donné « mon sieur » puis « monsieur ».",
            "<i>Égocentrique</i>, e<i>́goïste</i>, e<i>́gotique</i> : dans les trois cas, l’individu pense trop à lui et pas assez aux autres. Un conseil : passez votre tour !",
            "Réduire au <i>maximum</i> ou au <i>minimum</i> ? Au maximum met l’accent sur l’action de réduire, tandis qu’au minimum attire l’attention sur le résultat.",
            "Le Moyen Âge a laissé deux adjectifs : l’un neutre, <i>médiéval</i>, l’autre péjoratif, <i>moyenâgeux</i>, c’est-à-dire « vieillot, rétrograde ».",
            "Le petit doigt de la main est l’<i>auriculaire</i> car il rentre dans l’oreille (<i>auricula</i> en latin). D’où le « témoin auriculaire », qui entend !",
            "Un <i>malentendu</i> (une parole ou une action mal comprise) n’est pas forcément un <i>quiproquo</i> (prendre une personne ou une chose pour une autre).",
            "Dire de quelqu’un « c’est un beau personnage ! » peut sous-entendre qu’il joue un rôle. On préfèrera donc « c’est une belle personne ! ».",
            "<i>Calciner</i>, « transformer en chaux », implique une combustion totale. <i>Carboniser</i>, « transformer en charbon », serait moins radical.",
            "L’expression « remède de bonne femme » a-t-elle été déformée ? Pour certains, il s’agit d’un remède de bonne <i>fama</i> (« réputation » en latin).",
            "En 490 avant J.-C., après une course de 40 km, un soldat arriva à Athènes pour annoncer la victoire des Grecs sur les Perses à... Marathon !",
            "Le <i>crépuscule </i>est le moment qui suit le coucher du soleil mais c’est aussi celui qui précède le lever du soleil (le crépuscule du matin).",
            "Au XVIe siècle, la petite écrevisse de mer prend le nom de « crevette » car elle fait des sauts dans l’eau... comme une chevrette en liberté !",
            "L’expression en <i>loucedé </i>signifie « en douce » en louchébem, l’argot des bouchers. Aucun lien avec l’anglais<i> loose</i> (perdre).",
            "Suffit-il de mettre un pied sur une <i>estrade </i>(une partie surélevée) pour se retrouver sur un <i>piédestal</i> et susciter l’admiration ?",
            "Un <i>désert </i>n’est pas toujours couvert de sable. Aux XVIIe et XVIIIe siècles, c’est un endroit solitaire, loin des mondanités.",
            "Littéralement, un franc-maçon est un « maçon libre » (<i>free mason</i> en anglais) qui appartient, dès le Moyen Âge, à une corporation !",
            "Célèbre grâce à Bonaparte, le prénom Napoléon est d’origine germanique. Sous influence italienne, l’allemand <i>Nibelung</i> est devenu <i>Napoleone</i>.",
            "Avant, <i>Spam</i> était une marque de jambon en boîte répétée en boucle dans une publicité à la radio. Aujourd’hui, c’est un courriel indésirable.",
            "En droit, le verbe <i>stipuler</i> signifie « énoncer comme condition dans un contrat ». En toute logique, une loi ne stipule pas, elle <i>dispose</i>.",
            "On mange bien des « pommes de terre ». Alors, pourquoi ne pas avoir nommé la tomate « pomme d’or » (<i>pomodoro</i>) comme nos voisins italiens ?",
            "Le lien entre la <i>presbytie </i>(difficulté à voir de près) et le <i>presbytère</i> (maison du curé) ? Ils sont l’apanage des anciens, du grec <i>presbus</i>.",
            "Pourquoi dit-on <i>cartésien</i> plutôt que « descartésien » ? Parce que l’adjectif s’est formé sur le nom latin de Descartes : <i>Cartesius</i>.",
            "Le <i>pédologue</i> étudie le sol (du grec <i>pedon</i>), le <i>podologue</i> soigne les pieds (<i>podos</i>) et le <i>pédagogue</i> enseigne aux enfants (<i>paidos</i>).",
            "Celui qui soutient une cause est le<i> défenseur</i>. À l’inverse, celui qui la combat est le <i>pourfendeur</i>, qui « fend avec un sabre ».",
            "Pour taquiner discrètement quelqu’un sur son « monosourcil », dites-lui qu’il a de la taroupe sur la glabelle (du poil entre les sourcils) !",
            "Cet après-midi, il est cinq heures moins le quart (heure traditionnelle), 16 h 45 (heure digitale) mais pas « 17 heures moins le quart » !",
            "Qu’il désigne la cloche frappée par un marteau ou la tête au sens figuré, le <i>timbre</i> peut être fêlé, d’où l’expression « être timbré »."
        ]
    },
    {
        categorie: "Grammaire & conjugaison",
        liste: [
            "L’épitaphe « ci-gît » vient du verbe gésir, « être couché par terre » (voire dans la terre !). De nos jours, on utilise « ici repose ».",
            "Lorsqu’une chose est <i>vraie</i>, elle est <i>avérée</i> (du latin <i>verus</i>, vrai). C’est donc un vrai pléonasme de dire qu’elle s’est « avérée vraie » !",
            "« Finies les vacances ! » = les vacances sont finies. « Fini les vacances ! » = c’est fini, les vacances (on passe aux choses sérieuses).",
            "Si je me déplace sur un véhicule, j’utilise la préposition « à » (moto, cheval). Si je suis à l’intérieur, je dis « en » (voiture, avion).",
            "L'accord du participe passé <i>laissé </i>suivi d’un infinitif n'étant pas obligatoire, laissez-vous aller à écrire « elle s’est <i>laissé</i> aller »!",
            "Avec vous, pas besoin d’y regarder à deux fois : « à » première vue, « au » premier regard, « de » prime abord, vous avez fait votre choix !",
            "Faute de remède véritable, on atténue, on cache, on évite un problème. De la même manière, on <i>pallie</i> un problème, sans ajouter « à » !",
            "<i>Voire</i> signifiant « même », la tournure « voire même » a été considérée comme pléonastique... avant d’être acceptée par l’Académie française.",
            "On vit <i>sur</i> une île ou <i>sur</i> un nuage qui sont en hauteur, mais peut-on habiter <i>sur</i> Paris ? Oui, quand « sur le territoire » est sous-entendu.",
            "C’est <i>moi</i> qui <i>ai</i> répondu (moi qui = je), c’est<i> toi</i> qui <i>as</i> copié (toi qui = tu) et c’est le <i>prof </i>qui <i>a</i> corrigé (le prof qui = il). Compris ?",
            "S'il est préférable de la remplacer par « en revanche » lorsque c'est possible, la locution « par contre » n'est pas fautive pour autant.",
            "Continuer « à » ou « de » ? Les deux ! Mais les oreilles délicates préfèreront continuer d’apporter plutôt que continuer à apporter.",
            "Vous vous êtes déshabillé(e) dans la rue, autrement dit « au vu » ou « à la vue » de tous. Même des policiers ? Allez hop, en garde à vue !",
            "En France, si l’on met la chanson festive « Le petit bonhomme en mousse » au pluriel, on obtient « les petits <i>bons</i>hommes en mousse ».",
            "Dans « tous les jeudis soir », je n’accorde pas « soir » qui a le rôle d’un adverbe (sous-entendu « au soir »). <i>Idem </i>pour matin et midi.",
            "L’adjectif<i> tabou</i>, qui désigne ce qui est sacré ou interdit, s’accorde avec le nom qu’il qualifie : un sujet <i>tabou</i>, une maladie <i>taboue</i>.",
            "Avant, on allait <i>en</i> Arles ou <i>en</i> Avignon qui étaient des territoires. Désormais, on se rend <i>à</i> Arles et a<i>̀</i> Avignon car ce sont des villes.",
            "Parce que vous êtes né un 1er janvier, on vous souhaite « bonne » année (nom féminin) et « bon » anniversaire (nom masculin) le même jour.",
            "Il paraît logique d’<i>apporter</i> un objet et d’<i>amener </i>un être vivant, sauf dans la marine, où l’on amène (fait descendre) les voiles.",
            "<i>Vu</i> ou <i>vues</i> tes fautes d’orthographe ? Ici, « vu » est une locution invariable que l’on peut remplacer par « étant donné ».",
            "Les antonymes <i>bénin</i> (du latin <i>belignus</i>, bienveillant) et<i> malin</i> (du latin <i>malignus</i>, méchant) font « bénigne » et « maligne » au féminin.",
            "<i>Au</i> reste ou <i>du</i> reste ? Pour annoncer en début de phrase ce qui n’a pas encore été énoncé, vous avez le choix de la préposition.",
            "Qu’elle soit féminine, masculine ou « trotte-menu », la <i>gent</i> ne prend jamais de « e » final. Dans « gente dame », <i>gent </i>est un adjectif.",
            "La <i>Seconde </i>Guerre mondiale (c’est la dernière en date) mais le <i>deuxième</i> but des Bleus contre le Brésil en 1998 (il y en a eu un troisième).",
            "Même si l’on est tenté de donner à <i>espèce</i> le genre de son complément, le mot est féminin. On devrait donc dire « une espèce d’idiot » !",
            "2 000 euros <i>brut </i>et 10 tonnes <i>net</i> sont invariables car l’on sous-entend « un salaire brut de 2 000 euros » et « un poids net de 10 tonnes ».",
            "Jadis employée par Ronsard, la forme « assis-toi » est passée dans le langage populaire. On lui préfère « assieds-toi » ou « assois-toi ».",
            "La nuit <i>en entier</i> ou <i>en entière </i>? L’expression « en entier » étant invariable, il faut dire soit <i>la nuit en entier</i>, soit la nuit<i> entière</i>.",
            "À ne pas confondre, le participe passé <i>stupéfié</i> et l’adjectif <i>stupéfait</i> : « Cette nouvelle m’a stupéfié, j’en suis resté stupéfait ».",
            "Figurez-vous que l’adjectif <i>enclin</i> existe au féminin ! Alors, ne vous gênez pas pour dire que votre voisine est peu<i> encline</i> à l’utiliser.",
            "<i>Aucun</i> a d’abord eu le sens positif de « quelqu’un », qui a survécu dans le pronom d’<i>aucuns</i> : « certains, certaines personnes ».",
            "<i>De toute façon </i>ou <i>de toutes façons </i>? C’est au singulier qu’on emploie cette locution qui signifie « de quelque façon que ce soit ».",
            "Durant la IVe République, connue pour son instabilité, 24 gouvernements <i>se sont succédé</i>. Le participe passé, lui, n’a jamais varié !",
            "En tant qu’adverbe, <i>fort</i> (beaucoup, très) est invariable : au sujet d’hommes ayant fait fortune, on écrira « ils étaient fort riches ».",
            "<i>Un</i> ou <i>une</i> après-midi ? Les deux sont acceptés mais l’Académie française préfère « un après-midi ». Après tout, « midi » est bien masculin !",
            "Je participe (prends part) a<i>̀</i> l’opération « tri sélectif » car elle participe (relève) <i>de</i> la nécessité de préserver l’environnement.",
            "S’il est vrai qu’à l’oral la liaison crée l’illusion d’une négation, il est incorrect d’écrire « on a pas faim » pour « on n’a pas faim ».",
            "Tous les contes débutent par « il était une fois ». En langue littéraire et poétique, on rencontre souvent « il est » au lieu de « il y a ».",
            "En France, depuis 1990, l’italien <i>scenario</i> s’accentue et fait « scénarios » au pluriel. Avec ses deux « i », <i>scenarii</i> se dit... en Italie !",
            "L’adverbe <i>tout</i> est invariable, sauf devant un mot féminin commençant par une consonne. D’en haut, la terre <i>tout</i> entière paraît <i>toute</i> petite.",
            "<i>Parfois</i> et <i>quelquefois</i> sont préférables à « des fois », formule familière.<i> Idem</i> pour <i>au cas où</i>, plus raffiné que « des fois que ».",
            "<i>Échéant</i> est le participe présent du verbe échoir (arriver, se produire). <i>Le cas échéant</i> signifie donc « si l’occasion se présente ».",
            "À la question « viendras-tu pique-niquer avec nous dimanche ? », il faut répondre « cela dépend du temps » et non « cela dépend le temps ».",
            "La femme qui vous a précédé dans votre emploi est votre... prédécesseur ! En effet, les noms en <i>-seur</i> n’ont (officiellement) pas de féminin.",
            "Lorsqu’une phrase commence par « ainsi » ou « aussi », le sujet qui suit est souvent (mais pas toujours) inversé. Ainsi soit-il !",
            "On emploie familièrement « émotionné » au lieu d’e<i>́mu</i> (pourtant plus court !), sans doute en référence à <i>commotionné</i>, de sens voisin.",
            "D’une femme aussi belle qu’intelligente, on dit que sa beauté « le dispute à » son intelligence, tournure galante reposant sur la rivalité.",
            "Depuis le XVIIe siècle, « de » indique l’appartenance. « À » ne subsiste guère que dans le langage rural, populaire ou dans « fils à papa ».",
            "Elle s’est rendu compte, ils se sont rendu compte : ici « rendu » reste invariable car il est suivi du complément d’objet direct « compte ».",
            "« Je t’appelle <i>depuis</i> Marseille » est un emploi abusif de l’adverbe de temps « depuis ». N’est-il pas plus simple d’appeler de Marseille ?",
            "S’il a un rapport avec l’argent, un problème est<i> pécuniaire</i> et non « pécunier », qui s’emploie (trop) souvent par confusion avec<i> financie</i>r.",
            "Ce qui est relatif aux prisons est <i>pénitentiaire</i>, au masculin et au féminin. Attention, dans la chanson de Johnny, <i>pénitencier</i> est un nom.",
            "Le participe passé s’accorde avec « on » mis pour « nous », mais dans l’émission <i>On n’est pas couché</i>, il ne vise personne en particulier.",
            "Pour éviter le son [con], il faut placer un « l’ » devant « on ». Comme le disait Boileau « ce <i>que l’on</i> conçoit bien s’énonce clairement... »",
            "Il ne fait pas beau ici <i>aussi</i> ou ici <i>non</i> <i>plus</i> ? « Non plus » remplace « aussi » à la forme négative, sauf dans<i> Je t’aime, moi non plus</i> !",
            "Faut-il exclure « je m’excuse » qui reviendrait à se pardonner soi-même ? Pas si l’on prend <i>s’excuser </i>au sens de « présenter ses excuses ».",
            "Pourquoi <i>j’écris</i> prend-il un « s » et <i>j’ai écrit</i> un « t » ? Dans le premier cas c’est un verbe conjugué, dans le second un participe passé.",
            "Lui : « Salut la Basquaise ! » Elle : « Mais je ne suis pas un poulet ! » Pourtant, madame, au féminin <i>basque</i> fait basque... ou basquaise !",
            "À propos d’un individu peu séduisant, ne dites pas « il me repousse », car cela revient à dire que c’est vous qui êtes repoussant(e) !",
            "S’il « commence à apparaître », on peut dire, au choix, que le jour <i>point </i>(du verbe « poindre ») ou <i>pointe</i> (du verbe « pointer »).",
            "Lu dans un restaurant : « réception tout événements ». <i>Tout</i> étant un adjectif, on choisit entre « tous événements » et « tout événement ».",
            "Doit-on dire « ce qu’il s’est passé » ou « ce qui s’est passé » ? Pas besoin de choisir, les deux tournures sont acceptées.",
            "Apparue au XVIIe siècle, l’expression « remettre quelqu’un » (en mémoire) est plutôt familière. Alors, pourquoi ne pas le « reconnaître » ?",
            "Je veux encore du chocolat, « Donnes- en-moi », allez, « Donne-moi-z-en » ! Tu n’auras rien du tout, la forme correcte étant « Donne-m’en » !",
            "Une femme qui est tombée dans un piège s’est <i>fait</i> avoir (et non « faite » !) : le participe passé <i>fait</i> suivi d’un infinitif est invariable.",
            "Pourquoi « je ne sais pas qui c’est » devient « je sais pas c’est qui » dans la bouche des enfants, ou pire, dans celle des grands ?",
            "À l’oral, pour introduire une remarque accessoire, dites « entre parenthèses » et pour atténuer le sens d’un mot, « entre guillemets »."
        ]
    },
    {
        categorie: "Paronymes",
        liste: [
            
            "J’ai appris <i>sur le tas</i> à cuisiner la polenta (en pratiquant), mais j’ai appris <i>sur le tard</i> la recette du tartare (tardivement).",
            "<i>Originel</i> et <i>original</i> remontent tous deux « à l’origine ». Fâché de n’être qu’une pâle copie, <i>original</i> est devenu unique, voire excentrique.",
            "Le Béotien, issu de Béotie, en Grèce, désigne couramment un individu peu cultivé, tandis que le Boétien vit à Boé, dans le Lot-et-Garonne.",
            "Êtes-vous plutôt d’un calme <i>olympien</i>, à l’image des dieux du mont Olympe ou d’une forme <i>olympique</i>, comme les athlètes des jeux d’Olympie ?",
            "Le <i>catéchisme </i>est l’enseignement de la religion chrétienne. De même sens, la <i>catéchèse</i> se veut moins dogmatique et plus pragmatique.",
            "Un travail préparatoire ou préparatif ? Un travail qui prépare est préparatoire (adjectif) et peut s’intégrer dans les préparatifs (nom).",
            "Mahatma, « grande âme », est le chef spirituel de l’Inde. À ne pas confondre avec Matmatah, le groupe de rock breton qui chante<i> Emma</i>.",
            "L’adjectif <i>romain </i>concerne Rome et ses habitants. Ce sont les langues formées du latin et l’art pré-gothique qui sont « romans ».",
            "Le <i>défendeur </i>se défend en justice (contre un demandeur). Le <i>défenseur</i> défend une cause, une personne ou une équipe (contre un attaquant).",
            "Celui qui fait une grosse bêtise est <i>bourrelé</i> de remords, comme s’il était son propre bourreau. Plus élégant et plus exact que « bourré » !",
            "Dès qu’il est synonyme de difficulté, utilisez le mot <i>problème</i>. Plus technique, la <i>problématique</i> regroupe les enjeux liés à un sujet.",
            "Il est probable qu’un endroit <i>désaffecté</i>, non occupé, voire laissé à l’abandon, nécessite (avant d’être réaffecté) d’être <i>désinfecté</i>.",
            "L’adjectif <i>indien</i> est relatif à l’Inde mais pour éviter toute confusion avec l’indigène d’Amérique, on a inventé <i>hindou</i>, avec ou sans « h ».",
            "Placée à côté d’un mot, la petite étoile (*) qui renvoie à une note est un <i>astérisque</i>. C’est le guerrier gaulois qui s’appelle Astérix !",
            "La colonne érigée place de la Concorde à Paris est un <i>obélisque</i>. À ne pas confondre avec Obélix, autre monument... de bande dessinée !",
            "À moins que vous ayez l’habitude de câliner votre steak haché, vous appréciez la <i>tendreté</i> d’une viande, et non sa « tendresse » !",
            "<i>Frôler</i> et <i>friser</i> signifient tous deux « passer très près de » mais on dira plus facilement « friser le ridicule » et « frôler la mort ».",
            "<i>Congeler</i>, c’est-à-dire faire passer à l’état solide par l’action du froid, existait bien avant <i>surgeler</i>, destiné aux produits alimentaires.",
            "Ce qui est <i>visible</i> n’est pas toujours<i> lisible</i> (ex : une image) et ce qui est <i>lisible </i>n’est pas toujours <i>visible</i> (ex : le braille).",
            "J’écris une lettre a<i>̀ l’attention</i> (à l’adresse) de mon banquier, mais je donne une fête a<i>̀ l’intention</i> (en l’honneur) de mon frère.",
            "Il y a quatre ingrédients (farine, œuf, beurre, sucre) à parts égales dans un <i>quatre-quarts</i> et quatre roues motrices dans un <i>quatre-quatre</i>.",
            "Voici deux ressentiments tenaces : la <i>rancune</i>, qui contient l’idée de vengeance, et la <i>rancœur</i>, plus passive, sorte de forte amertume.",
            "Un<i> accident</i> est toujours un événement malheureux. Un <i>incident</i> n’est grave que par ses conséquences : il est alors « diplomatique » !",
            "La <i>dentition</i> désigne la formation et l’éruption des dents. La <i>denture</i> regroupe l’ensemble des dents d’un homme, d’un animal ou d’une roue !",
            "Dès qu’il s’agit de la <i>conjoncture</i> (situation économique) de leur pays, les politiques se perdent en vaines <i>conjectures</i> (idées creuses).",
            "Après une maladie ou un malaise, on <i>recouvre</i> la santé ou ses esprits, du verbe « recouvrer », qui se distingue de retrouver et de recouvrir.",
            "Traiter un ami d’<i>alcoolique</i> revient à dire qu’il est atteint d’alcoolisme. Si c’est un buveur occasionnel, il lui arrive d’être <i>alcoolisé</i>.",
            "Ce qui est <i>complexe</i> (qui contient plusieurs idées) n’est pas forcément<i> compliqué</i> (difficile à comprendre), et inversement.",
            "L’<i>impudent</i> est sans pudeur quand l’<i>imprudent</i> n’est pas prudent. Mais à force, il peut être imprudent de se montrer impudent !",
            "Quand on souffre de lassitude musculaire, on est<i> courbatu</i>. Sous l’influence d’Émile Zola, « courbaturé » est entré en concurrence.",
            "En général, vous vérifiez la <i>véracité</i> d’un propos et non sa « voracité ». Sauf si votre interlocuteur a les dents qui rayent le plancher !",
            "L’<i>infraction</i> et l’<i>effraction</i> désignent toutes deux l’action d’enfreindre ou de violer. Pour l’une la loi, pour l’autre la propriété.",
            "Souvent à tort, en un <i>tournemain</i> (en aussi peu de temps qu’il en faut pour tourner la main) devient « en un tour de main » (avec adresse).",
            "Est-ce l’<i>attention</i> ou l’<i>intention </i>qui compte ? Tout dépend si l’on s’attache à la beauté du geste ou au but dans lequel il est fait.",
            "Au sens propre, ils sont relatifs à l’enfance, mais au sens figuré, <i>infantile </i>est puéril alors qu’<i>enfantin</i> est « d’une grande simplicité ».",
            "Dans le langage grossier, on utilise souvent <i>chiant </i>et <i>chieur</i> indifféremment. Or, <i>chiant</i> signifie « ennuyeux » et <i>chieur </i>« emmerdeur ».",
            "Un aliment <i>roboratif</i> rend « robuste » : il est fortifiant. Un aliment<i> bourratif</i> « bourre » : il assouvit rapidement la faim.",
            "<i>Sécréter</i>, c’est produire une sécrétion. <i>Secréter</i>, c’est user du « secret », solution chimique, pour fabriquer le feutre des chapeaux.",
            "La <i>colite</i> (inflammation du côlon) concurrence la <i>colique</i>, couramment employée pour « diarrhée » ou des douleurs sans rapport avec le côlon.",
            "En français, le dessert au lait fermenté se nomme<i> yaourt</i>. Issu du turc, yogourt s’emploie plutôt en Suisse, en Belgique et au Québec.",
            "Entre 2000 et 2002, mon <i>acné</i> juvénile a atteint son<i> acmé</i>, c’est-à-dire son apogée (se dit aussi de la phase critique d’une maladie).",
            "Les <i>consorts</i> ont un intérêt commun dans une affaire, tandis que les <i>consœurs</i> sont des femmes exerçant la même profession libérale.",
            "Faisant fi de leur origine religieuse, le <i>serment </i>est devenu synonyme de « promesse » et le <i>sermon</i> a pris le sens de « remontrance ».",
            "Année de congé initialement accordée à certains employés dans le public et le privé, l’<i>année sabbatique</i> est forcément... sympathique !",
            "La chanteuse Natalie Imbruglia est d’origine italienne comme l’<i>imbroglio</i> (situation embrouillée), à cela près qu’il s’écrit avec deux « o ».",
            "Pour désigner un mélange d’éléments différents, ne vous gênez pas pour employer le français « mixte » plutôt que l’anglais <i>mix</i>.",
            "On va <i>de conserve</i>, ensemble, dans une même direction et on agit de<i> concert</i>, ce qui suppose en plus une entente, un accord commun.",
            "La poussée soudaine d’un sentiment ou d’une émotion est un accès (de colère). À ne pas confondre avec l’<i>excès</i> (de pouvoir), synonyme d’abus.",
            "Le <i>majeur</i> d’un concours ou d’une promotion est âgé d’au moins 18 ans, ce qui n’en fait pas le <i>major</i>, c’est-à-dire le premier !",
            "Le point commun entre <i>chrétien</i> et <i>crétin</i> est... étymologique ! Les deux termes dérivent du latin <i>christianus</i>, « disciple du Christ ».",
            "Si, en France, une ancienne Première dame pousse la chansonnette, en Allemagne, Angela Merkel n’est pas « chansonnière » mais <i>chancelière</i> !",
            "La différence entre un <i>termite</i> et un <i>ermite </i>? Le <i>termite </i>vit en colonies et ronge du bois alors que l’<i>ermite</i> vit seul et ronge son frein.",
            "Quelqu’un qui fuit la compagnie n’est ni asocial(inadapté à la vie en société) ni <i>associable</i> (que l’on peut associer), mais <i>insociable</i>.",
            "Sous l’influence de « gourmand » (qui mange avec avidité), le <i>gourmet</i> (qui s’y connaît en vin) est devenu amateur de bonne chère.",
            "Quelque chose qui ne coûte rien est <i>gratuit </i>dans le langage courant, <i>gratis</i> pour les amateurs de latin ou <i>gratos</i>, familièrement.",
            "<i>Civil</i> ou <i>civique</i> ? Ils sont l’un comme l’autre relatifs aux citoyens, mais pour « poli, bien élevé », c’est <i>civil</i> qu’il faut employer.",
            "Respectueux des règles, vous faites toujours les choses <i>en bonne et due forme</i>, peu importe que ce soit « en bon uniforme » !",
            "Avant de manger un œuf dur, il vaut mieux l’e<i>́caler</i>, c’est-à-dire en retirer la coquille. Ce sont les poissons ou les huîtres qu’on e<i>́caille</i> !",
            "Ce qui est <i>mystique</i>, relatif aux « mystères » d’une religion, peut ou non être <i>mythique</i>, c’est-à-dire reposer sur un « mythe ».",
            "Par confusion avec <i>prendre garde</i> (faire attention), l’expression <i>sans crier gare</i> (sans prévenir) devient <i>sans crier garde</i> !",
            "<i>Détox</i> ou <i>désintox </i>? Il s’agit d’éliminer les toxines de l’organisme (détoxication), drogue et alcool compris (désintoxication).",
            "<i>Bénit(e) </i>se dit d’une chose ayant reçu la bénédiction du prêtre : pain bénit, eau bénite. Pour le reste, c’est <i>béni(e)</i> qu’il faut employer.",
            "Le<i> luxe</i> et la<i> luxure</i> ont en commun l’excès (<i>luxus </i>en latin) de plaisirs coûteux et superflus pour l’un, de plaisirs sexuels pour l’autre.",
            "L’<i>habileté</i> (qualité synonyme d’adresse, d’ingéniosité) est une <i>habilité</i> (une aptitude, une compétence) requise dans certains métiers.",
            "La date de <i>péremption</i> indique jusqu’à quand un aliment peut être consommé. Le droit de <i>préemption</i> permet d’acquérir un bien en priorité.",
            "« Je vous saurais gré » (verbe « savoir ») = « je vous serais reconnaissant » (verbe « être »), le tout au conditionnel s’il vous plaît !",
            "Est-on <i>doué</i> ou <i>doté</i> de qualités ? Les deux ! « Doué » vient du douaire et « doté » de la dot, biens échangés entre époux lors du mariage.",
            "Deux sciences, deux lettres de différence : l’<i>haptonomie</i>, science de l’affectivité versus l’<i>aptonymie</i>, science des noms prédestinés.",
            "Empathique, je me mets à la place de l’autre (je ressens <i>en</i> lui), ce qui ne m’oblige pas à être sympathique (ressentir <i>avec</i> lui) !"
        ]
    },
    {
        categorie: "Orthographe & prononciation",
        liste: [
            "Le sandwich rond crudités-thon-œuf se nomme <i>pan-bagnat</i>, expression provençale de Nice signifiant « pain baigné » (d’huile d’olive).",
            "Depuis 1979, on a le droit d’écrire e<i>́vènement</i> comme il se prononce. Libre à vous de préférer « événement », conforme à « événementiel ».",
            "Même s’il contient plusieurs questions- réponses, un <i>quiz </i>ne prend qu’un seul « z », comme show-biz. Donc pas assez pour faire le buzz !",
            "Vous êtes chef d’entreprise ? Bravo, vous contribuez à l’<i>entrepreneuriat</i> français, et non à l’« entreprenariat », plus facile à prononcer.",
            "Pour faciliter la mémorisation (du latin <i>memoria</i>), on utilise des moyens <i>mnémotechniques</i> (du grec <i>mnêmê</i>, qui a aussi donné « amnésique »).",
            "<i>Oignon</i> se prononce et peut s’écrire [ognon]. En vieux français, le « i » placé devant <i>-gn</i> était muet. Montaigne se disait donc [Montagne].",
            "En France, depuis le début du xxe siècle, <i>M.</i> est l’abréviation de Monsieur. Jusqu’à nouvel ordre, <i>Mr.</i> est réservé à l’anglais <i>Mister</i>.",
            "Quand on est <i>obnubilé</i>, on est littéralement « couvert de nuages » (<i>nubes</i> en latin). Quant à « omnibuler », il est inconnu au bataillon !",
            "« Hippo » ou « hypo » ? Si le mot se rapporte au cheval, c’est<i> hippo</i> (hippocampe). S’il exprime la faiblesse, c’est <i>hypo</i> (hypothermie).",
            "Dans football, basketball ou volleyball, <i>ball</i>, terme anglais, se prononce [bol]. Mais « handball », d’origine allemande, se dit hand[bal].",
            "Sous l’influence du suffixe <i>-ard</i> ou du couple bavard-bavarder, <i>cauchemar</i>, sans « d », a donné « cauchemarder ». Et <i>bazar</i>... « bazarder » !",
            "Pourquoi<i> déstabiliser</i> prend-il un accent aigu et pas destiner ou destituer ? Parce qu’il est composé du préfixe<i> dé-</i> et du verbe <i>stabiliser</i> !",
            "Le<i> marc</i> (de café) vient du verbe <i>marcher</i> pris au sens de « fouler, piétiner, écraser », pour obtenir le résidu dans lequel on lit l’avenir.",
            "Le<i> fuchsia</i>, arbrisseau exotique aux fleurs pourpres, tire son orthographe si particulière de Leonhart Fuchs, botaniste allemand.",
            "Le Moyen Âge a beau s’étirer sur près de 1 000 ans, de la chute de l’Empire romain à la prise de Constantinople, il s’écrit sans tiret.",
            "Les mots <i>puits</i> et <i>corps</i> prennent un « s » au singulier, sans doute en hommage à leurs ancêtres latins : <i>puteus</i> et <i>corpus</i>.",
            "Si l’on fait entendre le « s » de <i>cassis </i>s’agissant du fruit, il est d’usage de ne pas le prononcer quand on parle de la ville de Cassis.",
            "Chez vous, personne ne reste sur le seuil. C’est bien, mais ce n’est pas une raison pour écrire « acceuil » au lieu d’<i>accueil</i> !",
            "On sort rarement<i> indemne</i> (encore moins indemnisé !) d’un <i>dilemme</i> qui contient deux « m » et autant de propositions contradictoires.",
            "Le Luberon, cette belle région du midi, ne se prononce pas « avé l’assent » mais comme elle s’écrit, c’est-à-dire [Lubeuron].",
            "<i>Poids</i> prend un « s » au singulier car il s’écrivait <i>pondus</i> en latin et <i>pois</i> en ancien français. On retrouve ce « s » dans le verbe <b>peser</b>.",
            "L’adjectif <i>rébarbatif</i> qualifie un homme à la barbe revêche, et au figuré ce qui est très ennuyeux. « Réverbatif » est donc un barb... arisme !",
            "Pour faire du <i>reblochon</i> – et non du « roblochon » – on repinçait (<i>reblyochi </i>en savoyard) le pis de la vache après la première traite.",
            "Même si <i>quatre</i> ne prend jamais de « s », « entre quatre yeux » (en tête à tête) se prononce et peut s’écrire [entre quatre-z- yeux].",
            "Jusqu’au lundi inclu, inclus ou inclut ? Du latin <i>inclusus</i>, le participe passé d’<i>inclure</i> est « inclus » au masculin, « incluse » au féminin.",
            "En France, <i>trafic</i> s’écrit avec un seul « f », contre deux en anglais. C’est la même chose pour<i> coton</i> qui ne double son « t » qu’en anglais.",
            "Si je prononce « P.I.B. » en détachant chaque lettre, c’est un sigle. Si je prononce « Pib » en un seul mot, c’est un acronyme.",
            "On a beau parler de la réouverture (d’un centre commercial par exemple), le verbe correspondant est <i>rouvrir</i> et non « réouvrir » !",
            "En France, ce qui nous sert à communiquer et nous distingue des animaux est appelé « langage ».<i> Language</i> est son équivalent anglais.",
            "Sous l'influence du provençal, la dorade, ce poisson dont la tête est ornée d'un croissant doré, s'écrit aussi « daurade ».",
            "Comment prononcer « puzzle » : à l’anglaise [peuzeul], à la française [peuzle] ou à la paresseuse [peulze] ? C’est un véritable casse-tête !",
            "Relais ou relai ? On a d’abord écrit relai, puis relais, enfin en 1990, on est revenu à <i>relai</i>, pour s’aligner sur « balai » et « délai ».",
            "Il n’y a pas d’accent aigu sur le premier « e » de <i>rehausser</i>. En revanche, il ne faut pas l’oublier dans « rétrécir » et « rébellion » !",
            "Prononcez <i>tagliatelle</i> à l’italienne (sans faire entendre le « g ») et vous saurez pourquoi ces pâtes sont « taillées » comme un ruban.",
            "C’est vrai, un <i>souci</i> arrive rarement seul. Mais ce n’est pas une raison pour lui mettre, telle une souris, un « s » au singulier.",
            "Orthographié « phantasme » par le passé, <i>fantasme </i>commence désormais par un « f », sans doute pour se rapprocher de « fantaisie ».",
            "Pourquoi le mollusque marin appelé <i>calmar </i>se transforme-t-il en « calamar » sur notre liste de courses et sur la carte des restaurants ?",
            "La <i>genèse </i>ne prend pas d’accent aigu sur son premier « e », ni dans ses dérivés scientifiques comme ostéogenèse (création de tissu osseux).",
            "Le témoin <i>oculaire </i>voit de ses propres yeux (du latin <i>oculus</i>). Mais ce qui est <i>occulte</i> (du latin <i>occultus</i>, caché) lui a peut-être échappé...",
            "En marketing, un <i>senior</i> a plus de 50 ans, en entreprise au moins 3 ans d’expérience et, en français, il peut aussi s’écrire « sénior ».",
            "N’en déplaise aux rappeurs de <i>Sexion d’Assaut</i>, la division d’attaque s’écrit « section » (du latin <i>sectio</i>) en français comme en anglais !",
            "Une robe ajustée à la taille peut être <i>cintrée</i> ou <i>ceinturée</i>, mais en aucun cas « ceintrée », vieux terme de marine destiné aux navires !",
            "Malgré tout le respect qu’on leur doit, il n’y a pas de majuscule au « p » de président de la République ni au « m » de Premier ministre.",
            "Est-ce parce que <i>abasourdir</i> est proche d’<i>assourdir</i> (rendre sourd) que certains oublient de prononcer [abazourdir] ?",
            "L’expression « en filigrane » (implicitement) vient de l’italien <i>grana</i> (grain). Il n’y a donc aucune raison d’écrire « en filigramme ».",
            "En référence à son origine néerlandaise, yacht s’est d’abord prononcé [iak], mais au xxe siècle, c’est l’anglais [iot] qui l’a emporté.",
            "Même si elle peut être garnie de sucre, de confiture, de chantilly ou de chocolat chaud, une <i>gaufre</i> ne contient qu’un seul « f ».",
            "Parce qu’il faut au moins cela pour rassembler cinquante États, les États- Unis d’Amérique sont reliés par un trait d’union.",
            "Le préfixe grec <i>dys-</i> exprime le mal ou la difficulté (ex : dysfonctionnement) et le préfixe latin <i>dis-</i>, la séparation (ex : discontinu).",
            "Contrairement au <i>blizzard</i>, ce vent froid du nord accompagné de neige, l’adjectif <i>bizarre</i> prend un « z », deux « r » et un « e » final.",
            "Lu sur un site de voyage : « le service laisse un peu indésiré ». De deux choses l’une : soit il est indésirable, soit il laisse à désirer !",
            "Sans que l’on sache vraiment pourquoi, Clemenceau tenait à écrire son nom sans accent aigu. Qui oserait contrarier « le Tigre » ?",
            "Le vin ou le beurre peuvent être « extra secs », mais ce qui est intérieur, propre, essentiel à quelque chose, est <i>intrinsèque</i>.",
            "Un jeune Français est un Français (nom propre = F) qui est jeune alors qu’un jeune français est un jeune qui est français (adjectif = f).",
            "Mot savant par excellence, e<i>́tymologie</i> ne prend pas de « h » pour autant ! Il est issu du grec<i> etumos</i>, « vrai », et <i>logia</i>, « recherche ».",
            "Libre à vous de donner tout à chacun si vous en avez les moyens, mais l’expression signifiant « n’importe qui » s’écrit « tout un chacun ».",
            "Pourquoi a-t-on l’habitude de prononcer « Michel-Ange » à l’italienne [mikelange], et « Léonard de Vinci » à la française [devinssi] ?",
            "Ce qui est privé de sang, très pâle ou, au sens figuré, ce qui n’a plus de vigueur (un pays, une économie) est <i>exsangue</i>, et non « exangue ».",
            "Ce n’est pas parce qu’elle est visqueuse comme la mélasse qu’il faut écrire <i>limace</i> avec deux « s ». Allez, ne faites pas la grimace !",
            "Faut-il prononcer le « s » final d’<i>ananas</i> ? En France, les deux prononciations sont admises, mais [anana] appartiendrait au langage soutenu.",
            "L’aborigène n’habite pas dans les arbres (<i>arbor</i> en latin) mais dans le <i>pays</i> où il vit « depuis l’origine » (<i>ab</i> + origine).",
            "Qu’il soit servi archifroid, architiède ou archichaud, le légume dont on suce les feuilles et dont on mange le cœur est un <i>artichaut</i>.",
            "Quand on agit par <i>acquit</i> de conscience, on est « acquitté ». Alors, pour décharger totalement sa conscience, on l’écrit avec un « t ».",
            "Il n’est pas nécessaire de faire une randonnée pour se retrouver « en rang d’oignon », c’est-à-dire sur une même ligne !",
            "Si « soupoudrer » s’emploie à toutes les sauces, c’est <i>saupoudrer</i> qui signifie « poudrer de sel » mais aussi de farine, de sucre, de poivre."
        ]
    },
    {
        categorie: "Homonymes",
        liste: [
            "Reconnaissant envers un ami, vous lui rendez<i> la pareille</i> (un service équivalent) et nonl’<i>appareil</i>, même si vous lui renvoyez l’ascenseur !",
            "À force de<i> bayer </i>aux corneilles (rêvasser, regarder en l’air, bref, s’ennuyer), vous allez <i>bâiller</i> pour de bon et énerver votre boss.",
            "La <i>ballade</i>, c’est celle que chante Gérard Lenorman. Mais quand on se promène, on fait une <i>balade</i>, avec deux pieds et un seul « l ».",
            "Ils ont beau faire tous deux référence au « tronc » et être plantés dans le sol, le pied de vigne est un<i> cep</i> et le champignon un <i>cèpe</i>.",
            "Vous êtes « septique » ? Attention, vous produisez de la putréfaction ! Vous en doutez ? Alors, après le « s » ajoutez un « c» !",
            "On se lance corps et âme dans une cause que l’on défend « à cor (du nom de l’instrument à vent) et à cri », c’est-à-dire avec grand bruit.",
            "<i>In fine</i> ne veut pas dire que vous allez bien (<i>I’m fine</i> en anglais). Cette locution latine signifie « à la fin » ou « finalement ».",
            "Si tu arrives en retard à la conférence du <i>fonds </i>mondial pour la langue française, fonds-toi dans le décor : reste au <i>fond</i> de la salle !",
            "À 20 000 <i>lieues</i> sous les mers (très, très profondément), on doit être émerveillé par les <i>lieux</i>, mais peut-on voir nager des<i> lieus</i> ?",
            "La <i>cène</i> est le dernier repas que Jésus partagea avec ses apôtres. Vous pouvez admirer la <i>scène</i> sur le tableau de Léonard de Vinci.",
            "Cendrillon aurait pu porter des pantoufles de <i>vair</i>, fourrées avec de la peau d’écureuil gris. Or, Charles Perrault les préféra en<i> verre</i>.",
            "Le <i>bât </i>est une selle que l’on attache sur le dos des bêtes de somme. Si vous écrivez « bas » à la place, c’est là que le bât blesse !",
            "Un lieu en grand désordre n’est pas « sans dessus dessous » mais <i>sens</i> (anciennement <i>c’en</i>) <i>dessus dessous</i> : ce qui était dessus est dessous !",
            "<i>Dont acte</i> (et non<i> don’t act</i>) signifie dans le langage juridique « ce dont je vous donne acte » et par extension « tenez- vous-le pour dit ».",
            "Si je suis convaincu(e) de quelque chose, j’y crois très fort en mon <i>for</i> intérieur, du latin <i>forum</i>, c’est-à-dire en mon « tribunal intime ».",
            "Dans d’<i>ores et déjà</i>, « ores » est la forme adverbiale de la conjonction « or ». Dans d’<i>or et d’argent</i>, l’or est un métal précieux.",
            "« Nul n’est <i>censé </i>(supposé) ignorer la loi » mais lorsqu’elle est injuste, il peut être <i>sensé</i> (de bon sens) de lui désobéir.",
            "Ce n’est pas parce que tu as<i> envie</i> de manger des endives que tu dois t’en resservir à l’<i>envi</i> (à qui mieux mieux, autant que faire se peut) !",
            "Afin que leur vie se déroule sous de meilleurs <i>auspices</i>, les orphelins, les infirmes et les vieillards trouvaient refuge à l’<i>hospice</i>.",
            "Pour retrouver leur<i> repaire</i> (leur refuge), les animaux ont coutume d’uriner sur le parcours, ce qui leur sert de <i>repère</i> (d’indice).",
            "Avec un « d », <i>quand</i>, du latin <i>quando</i>, indique le moment. Avec un « t », <i>quant</i> (à), du latin <i>quantum</i>, signifie « en ce qui concerne ».",
            "Pour une aventure à l’<i>hôtel</i>, certains hommes de pouvoir n’hésitent pas à sacrifier leur carrière sur l<i>’autel </i>du plaisir.",
            "Un point de vue <i>différent</i>, avec un « t » comme dans « distinct », peut causer un <i>différend</i>, avec un « d » comme dans « désaccord ».",
            "À moins de monter dans une machine à explorer le temps, il est plus facile de changer d’<i>air</i> (atmosphérique) que d’e<i>̀re</i> (d’époque).",
            "Celui qui a bu jusqu’à satiété – voire jusqu’à l’ivresse – a bu tout son <i>soûl </i>(ou soul) et non tout son « sou », plus dur à avaler !",
            "L’interjection <i>eh</i> ! donne de la force à nos propos (eh bien ! eh non !) tandis que la conjonction de coordination et relie les mots.",
            "Un « château saignant » est soit un manoir hanté, soit un châteaubriant (ou chateaubriand), épaisse tranche de filet de bœuf grillée.",
            "Avec un « e », le<i> golfe</i> désigne une vaste échancrure dans les terres. Sans « e », le <i>golf </i>est un sport écossais de plein air.",
            "Il ne faut pas confondre le <i>colloque</i>, réunion de spécialistes en salle, avec la <i>coloc’</i>, réunion d’étudiants... en appartement !",
            "Une personne ou une chose créée <i>ad hoc</i> est qualifiée pour une activité ou destinée à un effet. En revanche, c’est Hergé qui a créé Haddock !",
            "Invariable dans « je t’envoie plein (= beaucoup) de baisers », <i>plein</i> s’accorde dans « des courriers pleins (= remplis) de baisers ».",
            "<i>Feu</i> mon grand-père est décédé il y a peu, mais pas dans les flammes. Il a « accompli sa destinée », du latin <i>fatum</i> qui a donné « fatal ».",
            "Comme le tailleur qui tapait les coutures pour les aplatir, on bat un adversaire <i>à plates coutures</i>. Plus radical qu’à « plat d’coutures » !",
            "Pendant que certains reconnaissent avoir de la <i>veine</i> (de la chance), d’autres sont persuadés que leur existence est<i> vaine</i> (inutile).",
            "Parole de frimeurs : « Quand nous marchons <i>côte à côte</i>, toutes les filles se retournent sur notre passage. C’est fou comme on a la <i>cote</i> ! »",
            "Le <i>basilic</i>, plante aromatique, et la <i>basilique</i>, église chrétienne, dérivent tous deux de l’adjectif grec <i>basilikos</i> qui signifie « royal ».",
            "Celui qui souffre le <i>martyre</i> est un <i>martyr</i>, anciennement <i>martre</i>. Ce terme serait à l’origine de Montmartre, « Mont des martyrs ».",
            "Si vous avez raté le <i>coche</i>, vous avez manqué une occasion. Mais si vous avez raté le <i>coach</i>, il est encore temps de reprendre rendez-vous !",
            "« À chacun selon son dû » se dit « à tout seigneur, tout honneur », et pour les amateurs d’hémoglobine, « à tout saigneur, toute horreur » !",
            "<i>Satirique</i>, une œuvre est railleuse et mordante. <i>Satyrique</i>, elle met en scène des satyres, créatures lubriques de la mythologie grecque.",
            "On peut être <i>près</i> de partir, « sur le point de partir », sans pour autant être <i>prêt à</i> partir, c’est-à-dire « préparé, disposé au départ ».",
            "En droit, ce qui ne dure qu’un an est <i>annal</i> et s’écrit avec deux « n » afin d’éviter toute confusion avec son homonyme ana... tomique !",
            "L’<i>amende</i> est la peine pécuniaire et l’<i>amande</i> le fruit de l’amandier. Avant, <i>amende</i> s’écrivait « amande » et <i>amande</i> « amende ». Vous suivez ?",
            "À la chasse, le <i>cuissot</i> désigne la cuisse des gros gibiers (cerf, chevreuil, sanglier...). En boucherie, le <i>cuisseau</i> est un morceau du veau.",
            "À l’oral, on prononce « je vaincs, tu vaincs, il vainc » (du verbe « vaincre ») comme « je vins, tu vins, il vint » (du verbe « venir »).",
            "« Au temps pour moi » = reprenons au moment où je me suis trompé. (C’est) « autant pour moi » = j’ai moi aussi commis une erreur.",
            "On dit « quoi ? » quand on n’a pas compris, « quoi ! » quand on est étonné ou indigné. Et quand on n’a plus rien à dire, on reste <i>coi</i>.",
            "J’ai <i>affaire</i> à quelqu’un quand je suis en rapport avec lui. Mais j’ai<i> à faire</i> quelque chose quand je dois réaliser une tâche.",
            "Un <i>barbu</i> est un homme qui a de la barbe et, péjorativement, un intégriste musulman. La <i>barbue</i> est un poisson de mer plat, voisin du turbot.",
            "<i>Fut</i> ou <i>fût</i> ? Tout dépend si vous souhaitez employer le verbe « être » au passé simple (fut) ou au subjonctif imparfait (qu’il fût).",
            "C’est en forgeant que l’on devient forgeron, en communiquant que l’on devient communicant et en adhérant que l’on devient adhérent.",
            "Le<i> jeûne</i>, privation de nourriture, prend un accent circonflexe sur le « u » pour se distinguer du <i>jeune</i>, qui est peu avancé en âge.",
            "À l’oral, comment distinguer les clients <i>finaux </i>(ultimes) des clients <i>finauds</i> (rusés) ? En employant l’autre pluriel de final : finals !",
            "« Quoi que » (je fasse) dit Goldman, soit « quelle que soit la chose ». Dans la chanson <i>Quoique</i> (encore que), Bruel nuance chaque parole.",
            "Construction figée, « force est de constater » (il est force de constater) est invariable, et cela, vous êtes bien forcé de le constater !",
            "Quand <i>nôtre</i> et <i>vôtre</i> suivent l’article « le », ils portent un chapeau, mais quand ils passent devant un nom, ils le retirent.",
            "« Arrête ! » cria-t-elle. « Y’a pas d’arête dans le bifteck. » répondit-il. Voilà une conversation qui ne manque pas d’« r » !",
            "Se cogner contre un poteau rose peut faire aussi mal que de découvrir le « pot au rose », un secret intentionnellement caché.",
            "Le dicton « mariage pluvieux, mariage heureux » n’a jamais été vérifié, même sous la forme « plus vieux » qui, pour certains, est la bonne.",
            "Il ne faut pas nécessairement huit personnes pour se réunir « à huis clos ». Il suffit de fermer toutes les portes (<i>huis</i> en vieux français).",
            "L’abus de <i>médoc</i>, vin de la région bordelaise, ou de <i>médocs</i>, médicaments prescrits par le doc’, est dangereux pour la santé.",
            "Comme son nom l’indique, le <i>volatile</i>, volaille de basse-cour, vole (au vent), alors qu’un corps ou une substance <i>volatil(e) </i>s’évapore.",
            "La barre de métal munie de deux poids servant à se muscler est un <i>haltère</i>. Sans « h », <i>altère</i> vient du verbe « altérer », « rendre autre »."
        ]
    }
];

﻿var astuces = [
	{
		titre: "L’accent de <i>cime</i> est tombé dans l’<i>abîme</i>&nbsp;!",
		texte: "<p>Bien qu’étant au sommet, pointu, d’un arbre ou d’une montagne, une <i>cime </i>n’a pas de chapeau sous forme d’accent circonflexe. Allez savoir pourquoi&nbsp;!... Sans doute, tout simplement, parce que rien n’a jamais justifié la présence de cet accent&nbsp;: <i>cime </i>vient du latin <i>cyma, </i>«&nbsp;pousse&nbsp;», d’après le grec <i>kuma, </i>«&nbsp;qui est gonflé&nbsp;».</p><p>En revanche, issu du latin chrétien <i>abyssus</i>, déformé en <i>abismus, abîme </i>comporte un accent circonflexe apparu à la disparition du <i>s </i>médian, là encore. Un accent circonflexe qu’on retrouve dans <i>abîmé(e) </i>et <i>abîmer</i>...</p><p>À noter la graphie <i>abyme, </i>sans accent sur le <i>y</i>, qui est, de loin, la plus usitée dans l’expression <i>mise en abyme</i>, usuelle en héraldique, en littérature, en art (peinture), au cinéma... pour décrire le fait d’insérer un petit écu à l’intérieur d’un grand, un récit à l’intérieur du récit principal, dont il reprend la forme et l’argument&nbsp;; une même peinture dans une autre peinture&nbsp;; etc. Une célèbre fromagerie, qui a pour emblème un ruminant hilare, illustre, par la grâce du fameux dessinateur et caricaturiste français Benjamin Rabier, ce système de la mise en abyme… </p><p>Le jour où l’on met en place la partie la plus élevée d’un édifice que l’on achève est un jour de fête (comme dirait Jacques Tati), mais aussi un jour de... <i>faîte</i>. Ce synonyme de <i>cime, </i>de <i>sommet, </i>de <i>pinacle, </i>s’écrit avec un accent circonflexe... et vous avez sans doute, ou peut-être, deviné pourquoi. Eh oui&nbsp;! Un <i>s </i>a disparu, qui figurait dans l’étymon <i>fest, feste, </i>du latin <i>fastigium...</i></p><p>Et l’accent circonflexe figure également dans <i>faîtage, faîteau </i>et <i>faîtière. </i>«&nbsp;On ne grimpe pas sur le faîte sans chapeau, car il y fait frais&nbsp;!&nbsp;»</p>"
	},{
		titre: "C’est définitif&nbsp;: au futur et au conditionnel, on garde l’accent de l’infinitif&nbsp;!",
		texte: "<p>Les formes conjuguées du futur et du conditionnel qui contiennent l’infinitif d’un verbe conservent l’accentuation <i>(é) </i>de cet infinitif&nbsp;: <i>céder </i>: <i>il cédera</i>, <i>elles céderont </i>; <i>accélérer </i>: <i>tu accéléreras, vous accélérerez.</i></p>"
	},{
		titre: "Pour rentrer à l’X (= Polytechnique), il faut perdre son accent...",
		texte: "<p>Aucun accent ne doit précéder un <i>x </i>: celui-ci équivaut à deux consonnes <i>gz </i>(dans <i>exactitude</i>) ou <i>ks </i>(dans <i>convexe</i>)&nbsp;! Alors, du <i>sexe </i>au <i>latex, </i>pas d’accent aigu ou grave&nbsp;!</p>"
	},{
		titre: "Même à titre d’<i>essai</i>, jamais d’accent devant une consonne double&nbsp;!",
		texte: "<p><i>Essai </i>en fait la démonstration&nbsp;: on ne met pas d’accent sur le <i>e </i>précédant une consonne double. Pas besoin <i>d’erratum, </i>donc, si l’on a écrit <i>ecchymose, tendresse, mademoiselle, belladone, effacer, </i>etc.</p>"
	},{
		titre: "Je m’<i>aperçois</i> qu’il n’y a qu’un <i>p</i> à <i>apercevoir</i>.",
		texte: "<p>Ou bien&nbsp;: «&nbsp;J’aperçois un Apache&nbsp;!&nbsp;»... Nous avons préféré opter pour le nom propre – donc avec majuscule – désignant un Amérindien (naguère, on aurait dit «&nbsp;Peau-Rouge&nbsp;»), plutôt que pour le nom commun <i>apache</i>, «&nbsp;voyou, truand, malfaiteur&nbsp;». Comme le nom commun est issu du nom propre, on peut juger de l’opinion des Français du début du XX<sup>e</sup> siècle sur les Indiens d’Amérique... Il est vrai que les Apaches s’étaient fait remarquer par leur férocité et leurs ruses (ainsi que leur courage). Un seul <i>p </i>à <i>Apache </i>: un seul <i>p </i>à <i>apercevoir</i>...</p><p>Si l’on aime le miel, la gelée royale et le pollen, on peut préférer mémoriser le <i>p </i>solitaire d’<i>apercevoir </i>par&nbsp;: «&nbsp;J’aperçois un apiculteur&nbsp;!&nbsp;» La série <i>apicole </i>(adj.), <i>apiculteur(-rice) </i>(n.), <i>apiculture </i>(n. f.) s’écrit en effet avec un <i>p </i>(du latin <i>apis</i>, «&nbsp;abeille&nbsp;»).</p><p>À l’image d’<i>apercevoir</i>, quelques mots commencent par le digramme <i>ap- </i>: <i>apaiser, apitoyer, aplanir, aplatir, apostropher, aposter, apurer.</i></p><p>Précision utile, peut-être&nbsp;: <i>aposter </i>est un verbe transitif direct ayant l’acception de «&nbsp;placer, installer quelqu’un à un poste afin de surveiller, de guetter, ou en vue de commettre un mauvais coup&nbsp;». Plusieurs formulettes sont possibles afin de retenir l’orthographe, à savoir le <i>p </i>unique&nbsp;:</p><p>−&nbsp;«&nbsp;L’apiculteur tentait d’apitoyer l’apache.&nbsp;»<br />−&nbsp;«&nbsp;L’Apache apostrophait l’apiculteur.&nbsp;» <br />−&nbsp;«&nbsp;L’apiculteur doit apurer ses comptes&nbsp;!&nbsp;» <br />−&nbsp;«&nbsp;L’apiculteur voulait apaiser les Apaches, en les apitoyant.&nbsp;» <br />−&nbsp;«&nbsp;Les Apaches ont aposté des guetteurs, qui s’apostrophent par-delà les terrains aplanis...&nbsp;» <br />−&nbsp;«&nbsp;Les Apaches s’apostrophaient violemment, menaçant d’aplatir leurs ennemis intimes&nbsp;!&nbsp;»</p>"
	},{
		titre: "On se nourrit deux fois chaque jour…",
		texte: "<p>En principe, on prend tous les jours deux repas principaux&nbsp;: le déjeuner et le dîner (on écartera le petit(-)déjeuner – avec ou sans trait d’union –, quand bien même serait-il copieux, façon anglo-saxonne&nbsp;; de même, l’éventuel brunch, et la collation de&nbsp;16 heures ou&nbsp;17 heures...).</p><p>Puisque l’on se nourrit deux fois par jour, il est normal d’écrire avec deux <i>r </i>le verbe <i>nourrir.</i></p>"
	},{
		titre: "… mais on ne meurt qu’une fois&nbsp;!...",
		texte: "<p>C’est ce que pensent les gens sensés, en tout cas, et bien que des journalistes s’obstinent à «&nbsp;pondre&nbsp;» chaque jour, dans la presse nationale et dans la presse quotidienne régionale, des titres ainsi formulés&nbsp;: «&nbsp;Cinquième mort d’un automobiliste au passage à niveau de Happuy-sur- le-Champignon&nbsp;». Titres laissant donc entendre que, quatre fois ressuscité, un conducteur vient de trépasser à nouveau (provisoirement&nbsp;??). La formulation rigoureuse étant: «&nbsp;Mort d’un cinquième automobiliste au passage...&nbsp;».</p><p>On ne meurt qu’une fois, comme la garde impériale à Waterloo, et il est donc logique qu’il n’y ait qu’un <i>r </i>à <i>mourir </i>!</p>"
	},{
		titre: "Il faut absolument deux <i>chandelles</i> pour ce <i>chandelier</i>.",
		texte: "<p>«&nbsp;Deux chandelles, c’est-à-dire... deux <i>l </i>pour «&nbsp;ce chandelier&nbsp;», soit un <i>l</i>. Par ailleurs, la prononciation donne aussi la réponse&nbsp;: <i>èl </i>= deux <i>l </i>tandis que <i>e </i>= un <i>l</i>.</p><p><i>N.B</i>.&nbsp;: idem pour <i>échelle </i>et <i>échelon, ficelle </i>et <i>ficeler</i>... ou encore <i>j’épelle </i>et <i>épeler</i>, ou <i>j’appelle </i>et <i>appeler.</i></p>"
	},{
		titre: "Sur leurs deux jambes, les artistes du <i>ballet</i> interprètent la danse du <i>balai</i>",
		texte: "<p>Les danseurs du <i>ballet </i>expriment tout leur art sur leurs deux jambes, ce qui peut justifier les deux <i>l </i>du mot <i>ballet</i>, alors que, le <i>balai </i>n’ayant qu’un manche, son nom s’écrit avec un seul <i>l.</i></p>"
	},{
		titre: "Les adjectifs qualificatifs se terminant sur le son <i>anciel</i> sont plus <i>athées </i>que proches du <i>ciel</i>.",
		texte: "<p>Généralement – quoique apparentés à un substantif en <i>ence </i>–, les adjectifs qualificatifs terminés par le son <i>anciel </i>sont... athées <i>(= «&nbsp;à t&nbsp;»)&nbsp;: confidentiel (confidence), démentiel (démence), essentiel (essence), présidentiel (présidence), providentiel (providence).</i></p>"
	},{
		titre: "Ce compte-rendu est trop <i>succinct </i>pour être <i>sensé </i>!",
		texte: "<p>En tout cas, le mot <i>succinct</i>, lui, n’est pas... «&nbsp;sans c&nbsp;»&nbsp;: cette lettre y figure trois fois. Nous disons bien «&nbsp;trois&nbsp;», et non deux, car il y a devant le <i>t </i>un <i>c </i>muet, qui est souvent oublié à l’écrit. Il ne se prononce pas non plus, en principe, dans l’adverbe <i>succinctement</i>, qui du coup n’est pas d’une grande aide (toutefois, l’usage oscille)... C’est par l’étymologie que l’on trouve son origine, donc la réponse, à savoir le latin <i>succinctus</i>, qui signifiait... «&nbsp;court-vêtu&nbsp;»&nbsp;!</p>"
	},{
		titre: "<i>Instinctivement</i>, je mets respectueusement un <i>c</i> à <i>instinct </i>et à <i>respect</i>&nbsp;!",
		texte: "<p>Toujours cette perplexité avec l’éventualité d’un <i>c </i>devant un <i>t </i>final, dans <i>instinct </i>et dans <i>respect</i>... Le recours à d’autres mots de leurs familles permet de faire ressortir cette «&nbsp;lettre de plus&nbsp;» que, pourtant, l’on n’entend pas&nbsp;! <i>Instinctivement</i>, d’une part, et <i>respectueux</i>/ <i>respectueuse</i>, <i>respecter</i>, <i>respectabilité</i>, etc., d’autre part, donnent la réponse.</p>"
	},{
		titre: "Les <i>satellites volent</i> autour de la <i>Terre</i>...",
		texte: "<p>Ils tournent, ils gravitent, sur une orbite, plutôt, mais, bon, disons que c’est une image poétique&nbsp;! Pour voler, comme les oiseaux, il faut deux ailes... soit deux <i>l</i>. Il n’y a qu’un <i>t </i>à <i>Terre</i>, donc idem pour <i>satellite </i>! Plus d’hésitation sur le nombre de <i>l </i>et de <i>t </i>dans ce mot.</p>"
	},{
		titre: "En <i>s’appuyant </i>bien sur ses <i>deux pieds</i>, on a plus de force&nbsp;!",
		texte: "<p>Bien campé sur ses pieds, que ce soit pour jouer à la pétanque ou pour exercer une poussée, on a effectivement bien plus de force&nbsp;! Deux pieds qui doivent alors permettre de mémoriser les deux <i>p </i>d’<i>appuyer</i>.</p>"
	},{
		titre: "Avec <i>orgueil</i>, le président se réjouissait du bon<i> accueil </i>que lui réservait la foule...",
		texte: "<p>Après les consonnes <i>c </i>et <i>g, </i>c’est le <i>u </i>qui vient en premier, puisque la prononciation donne <i>queuille </i>et <i>gueuille </i>(et non <i>ceuille </i>et <i>jeuille</i>). Derrière d’autres lettres, le <i>e </i>vient avant le <i>u </i>: <i>feuille, fauteuil, portefeuille, chèvrefeuille, millefeuille, cerfeuil, deuil...</i></p><p>Avec <i>ue</i>, encore&nbsp;: <i>cercueil, recueil, écueil...</i></p><p>Dans les mots féminins, la terminaison est toujours en&nbsp;-<i>euille </i>: <i>feuille</i>.</p>"
	},{
		titre: "J’ai lu ce <i>magazine</i> de A à Z",
		texte: "<p><i>Magasin, magazine</i>, il y a de quoi s’y perdre, parfois. Dites-vous, alors, que vous lisez attentivement tout <i>magazine </i>de A à Z, ce qui souligne que c’est un z, et non un s, qui figure dans ce terme venu de l’anglais et issu lui-même du français... <i>magasin</i>. C’est également un <i>z</i>, et des <i>a</i>, que l’on a dans <i>mazagran</i>, nom d’un verre à pied, en porcelaine épaisse généralement, utilisé pour boire le café. Naguère, le mot a désigné le café lui-même servi dans un verre. Ce mot fait partie des noms communs issus, par antonomase, de noms propres de lieux.</p><p>... Nous sommes en&nbsp;1840. À Mazagran, petit village algérien situé près de Mostaganem (que l’on surnomma plus tard, par un à-peu-près facile, dans les milieux militaires, «&nbsp;Mange ta gamelle&nbsp;»),&nbsp;123 Français commandés par le capitaine Lelièvre tinrent tête, du&nbsp;4 au&nbsp;6 février, aux&nbsp;12&nbsp;000 Arabes qui les assiégeaient.</p><p>On dit que, pour mettre en échec jour et nuit un ennemi très supérieur en nombre, les assiégés burent moult cafés, dans des verres à pied assez hauts, en grès ou en porcelaine épaisse, qui pouvaient être tenus en main même si la boisson était brûlante.</p><p>Le fait d’armes fut célébré et popularisé, mais c’est seulement en&nbsp;1865 que le mot <i>mazagran </i>est repéré dans un texte français. Il désigne alors soit un café, chaud ou froid, bu dans un verre, soit un café froid étendu d’eau, mais cet emploi est sorti depuis longtemps de l’usage. Reste l’autre acception&nbsp;: «&nbsp;récipient en forme de verre à pied épais, avec parfois une anse&nbsp;».</p><p><i>«&nbsp;Ce Lelièvre est un fameux lapin&nbsp;!&nbsp;», </i>dit-on à l’époque, par un jeu de mots fondé sur la signification populaire de <i>lapin </i>au sens de «&nbsp;gaillard&nbsp;», d’«&nbsp;individu courageux&nbsp;».</p><p>Pour mémoriser le <i>z </i>de <i>Mazagran </i>: <i>«&nbsp;Chez les </i>zouaves<i>, chacun a son propre </i>mazagran <i>!&nbsp;». </i>Quant au <i>s </i>de <i>magasin</i>, il peut se mémoriser par le pluriel de <i>grands magasins </i>: <i>«&nbsp;Sophie adore faire ses courses dans les grands magasins&nbsp;» </i>ou, plus simplement, par l’initiale du prénom&nbsp;:</p><p><i>«&nbsp;Sophie tient un magasin.&nbsp;»</i></p>"
	},{
		titre: "Le<i> fantôme</i> ne se découvre jamais devant la muette&nbsp;!",
		texte: "<p>«&nbsp;La muette&nbsp;» en question n’est pas celle de Portici, rendue célèbre par l’opéra du Français François-Esprit Auber, mais la syllabe muette finale du mot <i>fantôme</i>. Certes, la formule la plus ludique, pour garder en mémoire que ce dernier mot a un «&nbsp;chapeau&nbsp;», un accent circonflexe, c’est de se dire qu’«&nbsp;un fantôme n’est jamais nu-tête&nbsp;», que cet esprit farceur et effrayant se dissimule toujours, selon la tradition, sous un drap, sous un suaire blanc...</p><p>Au-delà, une seconde «&nbsp;ficelle&nbsp;» −&nbsp;exprimée par notre titre – met en lumière une quasi-constante du français&nbsp;: devant une syllabe muette, un <i>a</i>, un <i>i</i>, un <i>o </i>sont souvent affublés du «&nbsp;chapeau&nbsp;», alors qu’il n’en est pas de même s’il n’y a pas de syllabe finale muette&nbsp;:</p><p><i>−&nbsp;fantôme</i>, mais&nbsp;: <i>fantomal, fantomatique...</i></p><p><i>−&nbsp;arôme, </i>mais&nbsp;: <i>aromate, aromatique, aromatisation, aromatiser...</i></p><p><i>−&nbsp;cône</i>, mais&nbsp;: <i>conicité, conifère, conique...</i></p><p>Ce qu’il faut mémoriser au coup par coup par «&nbsp;Le cuisinier met toujours l’accent sur l’arôme, sur les parfums&nbsp;» et par «&nbsp;Le cône a toujours un sommet pointu, un chapeau pointu&nbsp;».<br />Il convient en effet de ne pas généraliser l’histoire de notre fantôme ne se découvrant jamais, car un certain nombre de voyelles précédant une syllabe finale muette n’ont pas d’accent circonflexe <i>(cotre, gnome, zone...), </i>ou bien conservent ce «&nbsp;chapeau&nbsp;» même devant des syllabes non muettes <i>(câblage, câble, câblé(e), câbleau, câblerie, câblier, câblogramme, câblot, crâne, crânement, crânerie, crâneur, crânien...).</i></p>"
	},{
		titre: "À mes <i>remerciements </i>et à mes <i>paiements</i>, j’ai ajouté des <i>œufs</i>&nbsp;!",
		texte: "<p>Cette formulette permettra peut-être de mémoriser que tous les noms forgés sur des verbes se terminant en&nbsp;-<i>ayer</i>,&nbsp;-<i>ier</i>,&nbsp;-<i>ouer</i>,&nbsp;-<i>oyer </i>et&nbsp;-<i>uer </i>et ayant un suffixe en&nbsp;-<i>ment </i>ont un <i>e </i>médian entre la racine et ce suffixe. On voit donc des <i>e </i>(des «&nbsp;œufs&nbsp;») au milieu de ces substantifs...</p><p>– payer&nbsp;: paiement – renier&nbsp;: reniement – s’engouer&nbsp;: engouement – aboyer&nbsp;: aboiement – dénuer (se)&nbsp;: dénuement</p><p>UNE SEULE EXCEPTION&nbsp;: <i>châtiment </i>(de <i>châtier</i>, pourtant).</p>"
	},{
		titre: "Le chapeau du <i>psychiatre</i> a roulé dans l’<i>âtre</i>&nbsp;!",
		texte: "<p>Il faut se faire une raison&nbsp;: la représentation caricaturale des médecins de Molière, avec un immense chapeau noir pointu, ne correspond en rien à l’orthographe des termes terminés en <i>-iatre </i>désignant des professionnels de la médecine. Du <i>psychiatre </i>au <i>pédiatre, </i>de l’<i>hippiatre </i>au <i>gériatre, </i>AUCUN ne sort en chapeau&nbsp;! Et cela vaut également pour les suffixes <i>-iatrie </i>et <i>-iatrique </i>: <i>gériatrie, psychiatrique...</i></p><p>La formulette donnée en titre est donc à retenir absolument... L’accent circonflexe sur le <i>a </i>d’<i>âtre </i>est dû à... la disparition du <i>s </i>de l’étymon latin <i>astracum, </i>d’après le grec <i>ostrakon</i>, «&nbsp;coquille&nbsp;», puis «&nbsp;morceau de brique&nbsp;».</p>"
	},{
		titre: "Il a le verbe haut, avec son accent&nbsp;! Il veut toujours<i> paraître</i>&nbsp;!",
		texte: "<p>Les verbes dont l’infinitif se termine en <i>aitre </i>ou en <i>oitre </i>ont un accent circonflexe sur le <i>i</i>, et aussi dans les formes conjuguées lorsque, de la même façon, ce <i>i </i>précède un <i>t </i>: <i>naître, paraître, apparaître, disparaître, connaître...&nbsp;; il naît, il disparaîtra, elle apparaît, il connaît...&nbsp;; croître, décroître...&nbsp;; ils accroîtront, elle croîtra, le soleil décroît...</i></p><p>Sinon, dans tous les autres cas, il n’y a pas cet accent circonflexe&nbsp;: <i>elle naquit, ils disparaissent, tu connais, ils croissent...</i></p><p>Par ailleurs, il y a un accent circonflexe sur le <i>i </i>et sur le <i>e </i>des formes conjuguées de <i>croître </i>quand ces formes, sinon, pourraient être homographes de celles de <i>croire</i>. On évite ainsi les confusions, les quiproquos...&nbsp;: <i>Cet arbre croît rapidement </i>; <i>les eaux de la rivière crûrent, enflèrent, en une matinée </i>; <i>avec les pluies continues, ces plantes ont crû anormalement&nbsp;; elle croit toujours au Père Noël&nbsp;! </i>; <i>ils crurent à une explosion </i>; <i>ses parents ont cru ses balivernes...</i></p><p>Les participes passés de <i>croître </i>et de <i>recroître, </i>comme celui de <i>devoir </i>– et pour la même raison&nbsp;: se distinguer d’homonymes potentiellement homographes – prennent un accent circonflexe au masculin singulier&nbsp;: <i>crû </i>et <i>recrû</i>. On ne les confond pas, ainsi, avec <i>cru, </i>participe passé de <i>croire</i>, ou avec l’adjectif <i>recru</i>, «&nbsp;fatigué&nbsp;» (attention&nbsp;: «&nbsp;recru de fatigue&nbsp;» est un pléonasme à éviter&nbsp;!).</p><p><i>N.B. </i>: il en va de même pour le participe passé de <i>mouvoir </i>; celui-ci ne prend un accent circonflexe qu’au masculin singulier <i>(mû), </i>pour devancer toute confusion avec la lettre grecque <i>mu</i>.</p>"
	},{
		titre: "Hier, j’ai vu le <i>joaillier</i>, le <i>marguillier</i> et le <i>quincaillier</i>... mais pas l’<i>écailler </i>!",
		texte: "<p>Phonétiquement, <i>hier </i>peut être découpé en <i>i-e-r </i>(de même que <i>t-i-r </i>peut exprimer <i>théière </i>!). Et ce sont ces trois lettres que l’on trouve à la fin de <i>joaillier, </i>de <i>marguillier </i>et de <i>quincaillier</i>... des mots où certains ont tendance à oublier le second <i>i</i>.</p><p>En revanche, <i>écailler </i>(féminin <i>écaillère</i>), nom du commerçant qui ouvre et vend des huîtres, qui vend des fruits de mer, ne comporte pas ce <i>i </i>derrière les deux <i>l</i>.</p><p>Au sens moderne, <i>marguillier </i>– terme que Prosper Mérimée avait glissé dans sa fameuse dictée – désigne la personne chargée de la garde et de l’entretien d’une église.</p>"
	},{
		titre: "Du côté de chez Proust&nbsp;: <i>aiguillier, boutillier, coquillier, groseillier, joaillier, marguillier, médaillier, millier, quincaillier</i> et <i>vanillier.</i>",
		texte: "<p>Chef-lieu de canton d’Eure-et-Loir, Illiers a pris le nom valorisant d’Illiers-Combray du fait que Marcel Proust, dans <i>La Recherche</i>, a dépeint cette commune sous le nom de Combray...</p><p>Ici, seule <i>Illiers </i>nous intéresse, avec ses <i>i-l-l-i-e-r</i>, six lettres qui constituent la terminaison de quelques mots dont il convient de connaître l’orthographe.</p><p>Nous avons vu par ailleurs, déjà, <i>joaillier, marguillier </i>et <i>quincaillier.</i></p><p>À ne pas confondre avec le verbe <i>aiguiller</i>, «&nbsp;diriger, orienter&nbsp;», le substantif <i>aiguillier </i>désigne soit une personne qui fabrique des aiguilles, soit un porte-aiguilles. <i>Boutillier</i>, quoique rare, est plus usité que les variantes <i>bouteiller </i>(sans <i>i </i>après les deux <i>l</i>), ou <i>bouteillier</i>, relevée chez Victor Hugo. Le <i>boutillier </i>était un grand officier royal chargé de l’intendance du vin&nbsp;: <i>le grand boutillier de France. </i>Avec lui, on connaît l’échanson&nbsp;! Le <i>coquillier </i>est une collection de coquillages, de coquilles, ou le meuble, le local, contenant cette collection&nbsp;; le mot est aussi adjectif: <i>l’industrie coquillière, du calcaire coquillier... </i>Le <i>coquillier </i>est aussi un dragueur&nbsp;: un bateau de pêche utilisé pour draguer la coquille Saint-Jacques.</p><p>Un <i>médaillier</i>... n’est pas un <i>médaillé</i>, titulaire d’une ou de plusieurs médailles, mais un meuble ou une petite armoire destinés à accueillir une collection de médailles. Le mot désigne aussi la collection elle-même. Enfin, le <i>vanillier </i>est la liane dont le fruit est la vanille.</p><p>Tentons une formule mnémonique globale&nbsp;:</p><p>«&nbsp;À Illiers, le marguillier et le joaillier cultivent des groseilliers, tandis que le quincaillier fabricant de médailliers s’occupe d’un vanillier. Sur l’Eure, à bord d’un coquillier breton, un aiguillier propriétaire d’un millier de bonnes bouteilles se prend pour un boutillier royal.&nbsp;»</p>"
	},{
		titre: "À <i>Tulle</i>, on coince la <i>bulle </i>sans <i>scrupule</i>.",
		texte: "<p>La quasi-totalité des mots se terminant sur le son <i>-ul </i>s’écrivent en <i>-ule (scrupule, crépuscule, fascicule, vestibule, pellicule, opercule, émule, mule, somnambule, pécule, funambule...). </i>Seules exceptions&nbsp;: <i>bulle, tulle </i>(nom commun issu par antonomase du nom propre du chef-lieu de la Corrèze) et <i>nulle </i>(adj. et n. f.).</p><p>Quelques termes masculins en <i>-ul </i>: <i>calcul, consul, cumul, recul.</i></p>"
	},{
		titre: "La <i>demoiselle</i> aux <i>belles dentelles</i> adore la <i>marelle</i> et les <i>mirabelles</i>&nbsp;! Mais elle n’est pas un <i>modèle</i> pour le <i>zèle</i> auprès de la <i>fidèle clientèle</i>...",
		texte: "<p>Une grande majorité de noms féminins à la terminaison en <i>el </i>s’écrivent en <i>-elle </i>: <i>aquarelle, bielle, bretelle, cannelle, citronnelle, chanterelle, coccinelle...</i></p><p>Seuls quelques mots féminins ont pour terminaison <i>-èle </i>: <i>clientèle, fidèle (une), infidèle (une), une parallèle... </i>De même, quelques noms masculins&nbsp;: <i>fidèle </i>[également adjectif épicène], <i>infidèle </i>[également adjectif épicène], <i>modèle, parallèle, zèle.</i></p>"
	},{
		titre: "Ce vieillard <i>décrépit </i>est tout dépité&nbsp;!",
		texte: "<p>Il n’a pas perdu son crépi, tel un mur, ce malheureux ancien, mais il est en état de <i>décrépitude</i>, de grande sénescence... <i>Décrépitude </i>indiquait la lettre finale de <i>décrépit</i>, tout comme le féminin <i>décrépite</i>.</p><p>Il ne faut pas confondre une façade <i>décrépie </i>(qui a perdu son crépi) avec une vieillarde <i>décrépite </i>! Le français, langue bien vivante, évoluant sans cesse, des dictionnaires acceptent aujourd’hui de qualifier de <i>décrépit(e) </i>une chose&nbsp;: une maison, une façade, un mur délabrés, ayant entre autres perdu leur crépi&nbsp;! En revanche, il est toujours incorrect de dire d’une personne qu’elle est «&nbsp;décrépie&nbsp;»... sauf, peut-être, avec humour sarcastique, s’il s’agit de quelqu’un d’outrageusement fardé et dont le «&nbsp;revêtement&nbsp;» a disparu&nbsp;!!</p><p>Il convient donc de ne pas se laisser induire en erreur par les paroles d’une chanson populaire du XIX<sup>e</sup> siècle où il est dit&nbsp;:</p><p>Quand je photographie une vieille décrépie, C’est cinq francs debout, trois francs accroupie. Mais si c’est une jeune fille, c’est seulement vingt sous. Et si elle m’embrasse c’est plus rien du tout&nbsp;!</p>"
	},{
		titre: "<i>Loir/Loire</i>&nbsp;: reçu <i>5 sur&nbsp;5</i> tout en montant les escaliers <i>quatre à quatre</i> ",
		texte: "<p>Les Français ne connaissent pas la géographie, déplore-t-on à raison... Car ce constat est confirmé par les «&nbsp;réponses&nbsp;» (<i>sic</i>)... ou les silences suivant, dans des jeux télévisés, les questions portant sur ce thème. Moins graves, intrinsèquement, mais néanmoins fâcheuses, les erreurs d’orthographe commises sur des noms qui devraient être connus de tous...</p><p>Il est quelque peu étonnant de voir des hésitations sur les noms des départements, mais ne tombons pas dans le travers de la paille et de la poutre...&nbsp;! Après tout, la perplexité au sujet des départements comportant soit le nom du <i>Loir</i>, soit le nom de la <i>Loire </i>peut être compréhensible.</p><p>Une très heureuse coïncidence vient au secours des hésitants&nbsp;: les noms de ces départements se répartissent, pur hasard, en deux catégories. On trouve en effet soit l’association de deux noms de quatre lettres <i>(Eure-et-Loir, Loir-et-Cher), </i>soit l’association de deux noms de cinq lettres <i>(Indre-et-Loire, Maine-et-Loire, Saône-et-Loire). </i>Il n’y a pas d’exception, <i>Loire-Atlantique </i>n’étant pas l’addition de deux noms de cours d’eau. Bien entendu, il faut être certain de l’orthographe du nom associé.</p>"
	},{
		titre: "“<i>Ah&nbsp;!</i>”, fit-elle en voyant la <i>Saône</i>.",
		texte: "<p>Depuis peu reine de France, Marie-Antoinette visitait Lyon... On montra entre autres à la jeune souveraine un beau cours d’eau, en lui disant&nbsp;: <i>«&nbsp;C’est la Saône&nbsp;!&nbsp;»</i>, en prononçant <i>Çaune</i>, naturellement. <i>«&nbsp;Mais, </i>s’étonna-t-elle, <i>à Paris on prononce </i>Saine <i>! </i>». Sans doute eut-elle droit, alors, à un respectueux cours de géographie. Marie-Antoinette était bien pardonnable pour cette bévue... Aujourd’hui, combien de Français, tous passés par l’Éducation nationale, pourraient dire quel cours d’eau passe à Innsbruck ou lequel coule à Graz&nbsp;?...</p><p>En tout cas, le <i>a </i>de <i>Saône </i>est muet (alors que celui de <i>Caen </i>ne l’est pas). La formulette historico-mnémonique peut permettre de se souvenir de sa présence.</p>"
	},{
		titre: "La fourmi, la perdrix, la souris et la brebis sont privées d’œufs, de bougie et de sortie&nbsp;!",
		texte: "<p>La plupart des noms féminins se terminant sur le son <i>i </i>s’écrivent en&nbsp;-<i>ie</i>. Il y a toutefois quelques exceptions, en particulier des noms d’animaux&nbsp;: <i>brebis, fourmi, perdrix </i>et <i>souris. </i>Ces dernières sont donc privées d’œufs (d’<i>e</i>... final, en tout cas).</p><p>Il n’y a pas de masculin au mot <i>souris</i>, on ne dit pas «&nbsp;un souris&nbsp;» (ce qui introduirait une ambiguïté, <i>souris </i>étant un synonyme vieilli de «&nbsp;sourire&nbsp;»). On dit, alors, «&nbsp;une souris mâle&nbsp;»&nbsp;: ainsi, Jerry (de <i>Tom et Jerry</i>) est une souris mâle&nbsp;!</p><p><i>N.B.&nbsp;: souris </i>n’est pas un mot épicène, puisque l’on ne dit pas «&nbsp;un souris&nbsp;» et «&nbsp;une souris&nbsp;», ce qui est le cas pour <i>enfant</i>, par exemple <i>(un enfant capricieux, une gracieuse enfant)</i>.</p><p>«&nbsp;Cé pô juste&nbsp;!&nbsp;»&nbsp;: chez les fourmis noires, les fourmis mâles vivent quelques mois, les fourmis femelles et la reine plusieurs années.</p>"
	},{
		titre: "La période <i>glaciaire </i>plaisait bien aux ours <i>polaires</i>&nbsp;!",
		texte: "<p>L’ours blanc aime bien le froid, les grands froids, à condition qu’il lui reste de la bonne nourriture à «&nbsp;se mettre dans le cornet&nbsp;» (...à glace). Il «&nbsp;aime être au pôle&nbsp;», comme Virginie «&nbsp;aimait trop Paul&nbsp;» et que Paris «&nbsp;est métropole&nbsp;»...</p><p>Malheureusement, ce n’est pas le cas, et les plantigrades s’aventurent jusque dans les villages, fouillant les poubelles et effrayant les habitants. Dans certains pays, tel le Canada, on s’efforce de sauver les grosses peluches: endormies par une bonne piqûre, celles-ci sont transportées loin des villages, et on leur laisse quelque nourriture pour passer le cap difficile.</p><p>Au lieu des boîtes à ordures, les ours préféreraient peut-être ouvrir des <i>glacières </i>remplies de bonnes choses...</p><p><i>Période glaciaire/des glacières </i>: voici qui nous donne une clé pour l’orthographe des mots se terminant sur le son <i>cierre </i>: les adjectifs sont en&nbsp;-<i>ciaire </i>(sauf quand il y a dans la même famille de mots un nom en&nbsp;-<i>cière</i>), les substantifs en&nbsp;-<i>cière</i>... Vérifions si cette récurrence est exacte (à de rares exceptions près)&nbsp;:</p><p>Si adjectifs&nbsp;: </p><p><i>bénéficiaire</i>(également nom&nbsp;: <i>un[e] bénéficiaire</i>)/ <i>fiduciaire </i>(également nom&nbsp;: <i>une fiduciaire</i>)/ glaciaire/ judiciaire<br /><br /></p><p>Si substantifs&nbsp;: <br />une épicière/ une financière/ une gibecière/ une glacière/ une mercière/ <i>une nourricière </i>(également adjectif)/ <i>une policière </i>(également adjectif)/ une romancière/ une saucière/ une sorcière/ une souricière/ une tenancière</p><p><br />Assez convaincant, n’est-ce pas&nbsp;?<br /><br /></p>"
	},{
		titre: "Nous avons séjourné sans <i>aucuns</i> frais chez des <i>Cajuns</i> francophones, en Louisiane&nbsp;!",
		texte: "<p>Erreur très fréquente&nbsp;: la mise au singulier d’<i>aucun </i>dans la locution <i>aucuns frais. </i>Pourtant, le pluriel est une évidence&nbsp;: au sens de «&nbsp;dépenses&nbsp;», le mot frais est EXCLUSIVEMENT un pluriel. Personne ne dit&nbsp;: «&nbsp;J’ai eu un gros frais pendant les vacances (durant le week-end, ces derniers mois...)&nbsp;», mais&nbsp;: «&nbsp;J’ai eu de gros frais, avec cette maison...&nbsp;».</p><p>Adjectif indéfini, <i>aucuns </i>doit s’accorder, et être au pluriel. Idem avec d’autres termes figés au pluriel&nbsp;: <i>aucunes funérailles officielles ne sont prévues&nbsp;; aucunes rillettes au menu&nbsp;!&nbsp;; aucuns honoraires ne seront à payer </i>(... c’est rare).</p><p>C’est également la logique (qui est un «&nbsp;truc&nbsp;» très fiable&nbsp;!) qui fige au pluriel le pronom indéfini <i>d’aucuns</i>, puisqu’il signifie «&nbsp;quelques-uns, plusieurs, certains&nbsp;»...&nbsp;: «&nbsp;Chez les HUNS, d’AUCUNS n’aimaient pas du tout le steak tartare&nbsp;!&nbsp;»</p>"
	}
];
