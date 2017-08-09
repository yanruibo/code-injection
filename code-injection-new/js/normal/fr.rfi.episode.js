



















            window.location.hash = "";
        

document.getElementById("content").getElementsByTagName('div')[0].setAttribute('id','current_show');
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
        app.controllers.file.define_path(function(){
            app.views.home.render();
            app.utils.stats.set_info();
            app.utils.stats.stats_saved();
            app.utils.stats.stats_click('p=accueil::accueil::accueil::accueil','c=accueil&p=accueil&l3=accueil&l4=accueil', null, null );
        });

}



(function(app) {
    app.utils = app.utils || {};

    var openInBorwser = function (url, options) {
        url = encodeURI(url);
        window.open(url, '_system');
    };

    app.utils.external = {
        openInBorwser : openInBorwser/*,
        openInApp : openInApp*/
    };
    
})(window.app = window.app || {});

(function(){
    var eventBus = window.eventBus = {};
    var subscribersMap = {};

    var dispatchEvent = function(event) {
        // Defer execution to next event loop
        setTimeout(function() {
            var subscribers = subscribersMap[event.type];

            if(!subscribers) {
                return;
            }

            var subscribersSize = subscribers.length;
            for(var i = 0; i < subscribersSize; i++) {
                subscribers[i](event);
            }
        }, 1);
        
    };

    var addSubscriber = function(eventType, subscriber) {
        if(!subscribersMap[eventType]) {
            subscribersMap[eventType] = [];
        }

        if(subscribersMap[eventType].indexOf(subscriber) == -1) {
            subscribersMap[eventType].push(subscriber); 
        }
    };

    var removeSubscriber = function(eventType, subscriber) {
        if(!subscribersMap[eventType]) {
            return;
        }

        var subscribers = subscribersMap[eventType];
        var subscriberIndex = subscribers.indexOf(subscriber);
        if(subscriberIndex != -1) {
            subscribers.splice(subscriberIndex, 1);
        }
    };

    /**
     * @method publish
     * @param event: 
     *        {Object} with a mandatory 'type' property
     */
     eventBus.publish = function(event) {
        dispatchEvent(event);
    };

    /**
     * @method subscribe
     * @param eventTypes:
     *        {String} Event types names
     * @param subscriber:
     *         {function} Subscriber
     */
    eventBus.subscribe = function(/* eventTypes ..., subscriber */) {
        var args = [].slice.apply(arguments);
        var subscriber = args.pop();
        var events = args;

        var eventsSize = events.length;
        for(var i = 0; i < eventsSize; i++) {
            addSubscriber(events[i], subscriber);
        }
    };

    eventBus.unsubscribe = function(/* eventTypes ..., subscriber */) {
        var args = [].slice.apply(arguments);
        var subscriber = args.pop();
        var events = args;

        var eventsSize = events.length;
        for(var i = 0; i < eventsSize; i++) {
            removeSubscriber(events[i], subscriber);
        }
    };
})();

(function(app) {
    app.utils = app.utils || {};

    var getEnhancedStatuses = function() {
        var statuses = app.controllers.config.getStatuses();
        var casesStatus = app.controllers.cases.getCasesStatus();

        var statusesSize = statuses.length;
        for(var i = 0; i < statusesSize; i++) {
            var status = statuses[i];
            status.nbDossier = casesStatus[status.value];
        }

        return statuses;
    };

    var arrayMove = function (array, pos1, pos2) {
        // local variables
        var i, tmp;
        // cast input parameters to integers
        pos1 = parseInt(pos1, 10);
        pos2 = parseInt(pos2, 10);
        // if positions are different and inside array
        if (pos1 !== pos2 &&
            0 <= pos1 && pos1 <= array.length &&
            0 <= pos2 && pos2 <= array.length) {
            // save element from position 1
            tmp = array[pos1];
            // move element down and shift other elements up
            if (pos1 < pos2) {
                for (i = pos1; i < pos2; i++) {
                    array[i] = array[i + 1];
                }
            }
            // move element up and shift other elements down
            else {
                for (i = pos1; i > pos2; i--) {
                    array[i] = array[i - 1];
                }
            }
            // put element from position 1 to destination
            array[pos2] = tmp;
        }

        return array;
    };

    app.utils.utils = {
        getEnhancedStatuses: getEnhancedStatuses,
        arrayMove: arrayMove
    };
    
})(window.app = window.app || {});

(function(app) {
    app.utils = app.utils || {};

    var general_info = {
        app_version : '1.0',
        os : '',
        os_version : '',
        language : '',
        device_id : '',
        device_type : 'indeterminé',
        orientation : '1'
    };

    var is_connected = function () {
        if (navigator.connection.type === Connection.NONE){
            return false;
        }
        else if (navigator.connection.type === Connection.WIFI){
            return 'wifi';
        }
        else return 'gsm';
    };

    var stats_saved = function () {
        setTimeout(function(){        
            var var_is_connected = is_connected();
            if(var_is_connected) {
                if(localStorage) {
                    var max = localStorage.getItem( 'xiti_iter' );
                    for (var i = 0; i < max; i++) {
                        var attr = localStorage.getItem('xiti_' + i ).split('//');
                        xiti_click (attr[0], general_info, attr[1], var_is_connected, attr[2], attr[3]);
                    }
                    localStorage.clear();
                }
            } 
        },0);
    };

    var set_info = function () {     
        general_info.os = window.device.platform.toLowerCase();
        general_info.os_version = window.device.version;
        general_info.device_id = window.device.uuid;
        if( general_info.os.toLowerCase() === 'ios' ) general_info.device_type = 'iphone';
        navigator.globalization.getLocaleName(
            function (locale) {
                general_info.language = locale.value.replace('_', '-');
                 general_info.language =  general_info.language.toLowerCase();
            },
            function () {
                general_info.language = window.navigator.language.toLowerCase();
            }
        );    
    };


    var get_info = function () {
        if(general_info.os === ''){
            set_info();
        }
        return general_info;
    };

    var xiti_date = function () {
        // AAAAMMJJHHMMSS
        var date = new Date();
        var year =  date.getFullYear();
        var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return '' + year + month + day + hour + minute + second;
    };

    var set_in_storage = function (xiti_p, media_fct, media_time) {
        var date = xiti_date();
        var storage_string = xiti_p + '//' + date + '//' + media_fct + '//' + media_time;
        if(localStorage) {
            if ( !localStorage.getItem('xiti_iter') ) localStorage.setItem('xiti_iter', 0);
            localStorage.setItem( 'xiti_' + localStorage.getItem( 'xiti_iter' ) , storage_string );
            localStorage.setItem( 'xiti_iter', parseInt( localStorage.getItem('xiti_iter'), 10 ) + 1 );       
        } 
    };

    var xiti_click = function (xiti_p, infos, time, cn, media_fct, media_time) {
        var xiti = app.controllers.config.infos_xiti;
        var xiti_complete = '';
        var s2 = infos.os === 'ios' ? xiti.s2.ios : xiti.s2.other;
        if(time && !media_fct){
            xiti_complete = "http://" + xiti.serv + 
                            ".xiti.com/hit.xitif?s=" + xiti.s + 
                            "&s2=" + s2 + 
                            "&" + xiti_p +
                            "&x1=" + infos.orientation +
                            "&idclient=" + infos.device_id +
                            "&os=[" + infos.os + "]-[" + infos.os_version + "]" + 
                            "&mfmd=[" + infos.device_type + "]-[" + infos.device_type + "]" + 
                            "&lng=" + infos.language +
                            "&cn=offline" +
                            "&apvr=[" + infos.app_version + "]" + 
                            "&olt=" + time;
        }
        else if(media_fct){
            if(!cn) cn = "offline";
            xiti_complete = "http://" + xiti.serv + 
                            ".xiti.com/hit.xitif?s=" + xiti.s + 
                            "&s2=" + s2 + 
                            "&" + xiti_p +
                            "&a=" + media_fct +
                            "&m1=" + media_time +
                            "&m6=" + "clip" +
                            "&type=" + "audio" +
                            "&idclient=" + infos.device_id +
                            "&os=[" + infos.os + "]-[" + infos.os_version + "]" + 
                            "&mfmd=[" + infos.device_type + "]-[" + infos.device_type + "]" + 
                            "&lng=" + infos.language +
                            "&cn=" + cn +
                            "&apvr=[" + infos.app_version + "]";
            if(time) xiti_complete = xiti_complete + "&olt=" + time;
        }
        else {
            xiti_complete = "http://" + xiti.serv + 
                            ".xiti.com/hit.xitif?s=" + xiti.s + 
                            "&s2=" + s2 + 
                            "&" + xiti_p +
                            "&x1=" + infos.orientation +
                            "&idclient=" + infos.device_id +
                            "&os=[" + infos.os + "]-[" + infos.os_version + "]" + 
                            "&mfmd=[" + infos.device_type + "]-[" + infos.device_type + "]" + 
                            "&lng=" + infos.language +
                            "&cn=" + cn +
                            "&apvr=[" + infos.app_version + "]";
        }
        $.get(xiti_complete);
    };   

    var estat_click = function (estat_line) {
        var estat = app.controllers.config.infos_estat;
        var estat_complete = "http://prof.estat.com/m/web/" + estat.id + "?" + estat_line ;
        $.get(estat_complete);
    };  

    var stats_click = function (xiti_p, estat_line, media_fct, media_time) {
        setTimeout(function(){
            var general_info = get_info();
            var var_is_connected = is_connected();
            if(var_is_connected) {
                if(xiti_p) xiti_click(xiti_p, general_info, '', var_is_connected, media_fct, media_time);
                if(estat_line) estat_click(estat_line);
            }
            else {
                set_in_storage(xiti_p, media_fct, media_time);
            }
        },0);
    };  
 

    app.utils.stats = {
        is_connected : is_connected,
        stats_saved : stats_saved,
        set_info : set_info,
        get_info : get_info,
        xiti_date : xiti_date,
        set_in_storage : set_in_storage,
        xiti_click : xiti_click,
        estat_click : estat_click,
        stats_click : stats_click
    };
    
})(window.app = window.app || {});

(function (app) {
    app.controllers = app.controllers || {};

    // liste des fichiers pour le dl total
    var list_audio = function () {
        return [ 'ep2', 'ep3','ep4','ep5','ep6','ep7','ep8'];
    };

    var info_page =  {
        'home' : {},
        'ep1' : {
            name : 'lescopines',
            bkg : 'map_episode_1.png',
            file: 'lescopines.mp3',
            folder: '/android_asset/www/audio/', 
            dl_folder: '',
            link_1:{
                id:"sound_two",
                episode:"ep2"
                },
            link_2:{
                id:"sound_four",
                episode:"ep4"
                }
        },
        'ep2' : {
            name : 'aujourdhuivousprenezletrain',
            bkg : 'map_episode_2.png',
            file: 'aujourdhuivousprenezletrain.mp3',
            folder: 'download', 
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_one",
                episode:"ep1"
                },
            link_2:{
                id:"sound_five",
                episode:"ep5"
                }
        },
        'ep3' : {
            name : 'unhommedisparait',
            bkg : 'map_episode_3.png',
            file: 'unhommedisparait.mp3',
            folder: 'download', 
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_one",
                episode:"ep1"
                },
            link_2:{
                id:"sound_two",
                episode:"ep2"
                }
        },
        'ep4' : {
            name : 'tgvbourgsaintmaurice',
            bkg : 'map_episode_4.png',
            file: 'tgvbourgsaintmaurice.mp3',
            folder: 'download', 
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_five",
                episode:"ep5"
                },
            link_2:{
                id:"sound_one",
                episode:"ep1"
                }
        },
        'ep5' : {
            name : 'aujdhuivousprenezletrain2',
            bkg : 'map_episode_5.png',
            file: 'aujdhuivousprenezletrain2.mp3',
            folder: 'download', 
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_six",
                episode:"ep6"
                },
            link_2:{
                id:"sound_two",
                episode:"ep2"
                }
        },
        'ep6' : {
            name : 'lafindumonde',
            bkg : 'map_episode_6.png',
            file: 'lafindumonde.mp3',
            folder: 'download',
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_seven",
                episode:"ep7"
                },
            link_2:{
                id:"sound_three",
                episode:"ep3"
                }
        },
        'ep7' : {
            name : 'ledernierwagon',
            bkg : 'map_episode_7.png',
            file: 'ledernierwagon.mp3',
            folder: 'download',
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_eight",
                episode:"ep8"
                },
            link_2:{
                id:"sound_six",
                episode:"ep6"
                }
        },
        'ep8' : {
            name : 'alloallo',
            bkg : 'map_episode_8.png',
            file: 'alloallo.mp3',
            folder: 'download',
            dl_folder: 'http://oblique.radiofrance.fr/files/fiction/',
            link_1:{
                id:"sound_four",
                episode:"ep4"
                },
            link_2:{
                id:"sound_three",
                episode:"ep3"
                }
        }
    };

    var social_conf = {
        fb : {
            msg : "message test sur FB www.google.fr"
        },
        twitter : {
            msg : "message test sur twitter www.google.fr"
        },
        mail : {
            sbj : "Fictions sonores Radio France",
            msg : "message test sur mail www.google.fr"
        }
    };

    var infos_conf = {
        contact : "applimobile@radiofrance.com",
        design : "http://polenordstudio.fr/",
        dev : "http://www.smile.fr/",
        host : "http://www.typhon.com/fr/"
    };

    var infos_xiti = {
        serv : 'logc279',
        s    : '529604',
        s2 : {
            ios : 1,
            other : 2
        }
    };

    var infos_estat = {
        id : '257057210148'
    };


    var errors_label = {
        media : [
            "Action abandonée",
            "Problème réseau",
            "Erreur à la lecture",
            "Format audio non supporté"
        ],
        file : [
            "Fichier non trouvé",
            "Problème de permission",
            "Action abandonée",
            "Fichier corrompu",
            "Erreur d'encodage",
            "Fichier non modifiable",
            "Fichier non valide",
            "Erreur dans le nom du fichier",
            "Modification invalide",
            "Pas assez d'espace disponible",
            "Fichier non valide",
            "Chemin invalide"
        ]
    };

    
    // Public members
    app.controllers.config = {
        list_audio: list_audio,
        info_page: info_page,
        social_conf: social_conf,
        infos_conf : infos_conf,
        infos_xiti : infos_xiti,
        infos_estat : infos_estat,
        errors_label : errors_label
    };
})(window.app = window.app || {});

Handlebars.registerHelper('notificationsLength', app.controllers.notifications.getLength);

Handlebars.registerHelper('getNotifications', function (options) {
    var context  = {
        notifications: app.controllers.notifications.getNotifications()
    };
    return options.fn(context);
});

Handlebars.registerHelper('getNews', function (options) {
    var context  = {
        news: app.controllers.news.getNews()
    };
    return options.fn(context);
});

// TODO: rename
Handlebars.registerHelper('isPrivate', function (options) {
    var profile = app.controllers.user.getProfile(),
        html  = "";
    if (profile.type === "particulier" && options.fn) {
        html = options.fn(this);
    } else if (options.inverse) {
        html = options.inverse(this);
    }
    return html;
});

Handlebars.registerHelper('isAuthorizedPrescriber', function (options) {
    var profile = app.controllers.user.getProfile(),
        html  = "";
    if (profile.type === "prescripteur" && profile.agree && options.fn) {
        html = options.fn(this);
    } else if (options.inverse) {
        html = options.inverse(this);
    }
    return html;
});

Handlebars.registerHelper('isVIPPrescriber', function (options) {
    var profile = app.controllers.user.getProfile(),
        html  = "";
    if (profile.type === "prescripteur" && profile.vip && options.fn) {
        html = options.fn(this);
    } else if (options.inverse) {
        html = options.inverse(this);
    }
    return html;
});

Handlebars.registerHelper('formatDate', function(timestamp) {
        if(!timestamp) {
            return 'Date inconnue';
        }
        
        var date = new Date(parseInt(timestamp, 10)),
            day = '' + date.getDate(),
            month = '' + (date.getMonth() + 1),
            year = '' + date.getFullYear(),
            result = '';
    
        if (day.length < 2) {
            day = '0' + day;
        }
        if (month.length < 2) {
            month = '0' + month;
        }
        return day + "-" + month + "-" + year;
	}
);

Handlebars.registerHelper('statusColorClass', function(status) {
    switch(status) {
        case "ACC": 
            return 'green';
        case "AET": 
            return 'purple';
        case "INC": 
            return 'yellow';
        case "ECC": 
            return 'orange';
        case "AER": 
            return 'gray';
        default:
            return 'gray';
    }
});

Handlebars.registerHelper("ifAtIndex", function(checkedIndex, options) {
    var currentIndex = (options.data.index === undefined ? -1 : options.data.index);
    return currentIndex === checkedIndex ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifShouldEnableOfflineMode', function(options) {
    var shouldShow = app.controllers.user.isLoggedIn() && window.device.platform !== 'web';
    return  shouldShow ? options.fn(this) : '';
});

Handlebars.registerHelper('ifOffline', function(options) {
    return app.controllers.user.isInOfflineMode() ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('getProducts', function (options) {
    var context  = {
        products: app.controllers.user.getProducts()
    };
    return options.fn(context);
});

Handlebars.registerHelper('getStatuses', function(options) {
    var context = {
        statuses: app.controllers.config.getStatuses()
    };
    return options.fn(context);
});

Handlebars.registerHelper('linkToFolderSearch', function(folderStatus) {
    return "#search/?statusMode=" + folderStatus;
});

Handlebars.registerHelper('userAvatarSrc', function() {
    var userProfile = app.controllers.user.getProfile();

    return userProfile.type === 'prescripteur' ? 'images/batiments.png' : 'images/profil.png';
});

this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};

this["app"]["templates"]["episode"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n<header >\n    <div id=\"back\" class=\"img_button\"></div>\n    <div id=\"page_title\">Correspondance</div>\n    <div id=\"download_all\" class=\"img_button hidden\"> </div>     \n</header>\n\n<section data-role=\"content\" data-iscroll class=\"scroller\">\n  <div id=\"player\">\n    <div class=\"player_ctrl\">\n      <div id=\"player_play_pause\" class=\"icon-pause\"></div>\n      <div id=\"player_stop\" class=\"icon-stop\"></div>\n    </div>\n    <div class=\"player_bar\">\n      <div class=\"progress progress-striped active\">\n        <div id=\"player_progress_bar\" class=\"bar\" style=\"width: 0%;\"></div>\n      </div>   \n    </div>\n    <div id=\"player_time\">\n      <p class=\"palyer_time_content\">\n        <i id=\"player_time_current\">0:00</i>/<i id=\"player_time_total\">0:00</i>\n      </p>\n    </div>\n  </div>\n   "
    + "\n  <img  src=\"images/";
  if (stack1 = helpers.bkg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bkg; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" border=\"0\" width=\"100%\" usemap=\"#map_episode\" class=\"img_page_episode resizeable\" id=\"img_episode\" />\n  <map name=\"map_episode\" id=\"map_episode\">\n    <area shape=polygon coords=\"355,429,325,396,317,387,317,387,311,371,317,355,325,341,339,336,351,337,365,343,375,354,380,369,379,384,379,384,379,384\" data-coords=\"355,429,325,396,317,387,317,387,311,371,317,355,325,341,339,336,351,337,365,343,375,354,380,369,379,384,379,384,379,384\" href=\"\" alt=\"fb\" id=\"linkto_fb\">\n    <area shape=polygon coords=\"434,416,403,388,403,388,395,374,391,362,394,349,400,337,413,328,429,325,446,333,454,343,459,359,456,376,456,376\" data-coords=\"434,416,403,388,403,388,395,374,391,362,394,349,400,337,413,328,429,325,446,333,454,343,459,359,456,376,456,376\" href=\"\" alt=\"twitter\" id=\"linkto_twitter\">\n    <area shape=polygon coords=\"515,408,488,381,480,371,474,363,473,350,476,334,486,322,501,315,521,319,535,332,538,348,536,365\" data-coords=\"515,408,488,381,480,371,474,363,473,350,476,334,486,322,501,315,521,319,535,332,538,348,536,365\" href=\"\" alt=\"mail\" id=\"linkto_mail\">\n    <area shape=polygon coords=\"186,573,197,562,193,525,201,517,575,468,575,574,217,622,207,618,201,582,201,582\" data-coords=\"186,573,197,562,193,525,201,517,575,468,575,574,217,622,207,618,201,582,201,582\" href=\"\" data-episode=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.link_1),stack1 == null || stack1 === false ? stack1 : stack1.episode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"sound\" id=\"link_1\" >\n    <area shape=polygon coords=\"135,707,147,694,142,661,148,652,524,604,532,610,543,696,538,705,163,754,155,747,149,714,149,714\" data-coords=\"135,707,147,694,142,661,148,652,524,604,532,610,543,696,538,705,163,754,155,747,149,714,149,714\" href=\"\" data-episode=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.link_2),stack1 == null || stack1 === false ? stack1 : stack1.episode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"sound\" id=\"link_2\" >\n  </map>\n</section>";
  return buffer;
  });

this["app"]["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id='home_div'>\n    <header >\n        <div id=\"infos\" class=\"img_button\"></div>\n        <div id=\"page_title\">Destinations</div>\n        <div id=\"download_all\" class=\"img_button\"> </div>       \n    </header>\n\n    <section >\n        <img class=\"home resizeable\" src=\"images/map_home.png\" border=\"0\" width=\"100%\" heigh=\"100%\" usemap=\"#map_home\" id=\"img_home\"/>\n        <map name=\"map_home\" id='map_home'>\n            <area shape=\"poly\" coords=\"113,162,97,154,110,139,105,103,108,99,489,44,493,47,507,143,503,148,122,203,118,200,114,162,114,162\" data-coords=\"113,162,97,154,110,139,105,103,108,99,489,44,493,47,507,143,503,148,122,203,118,200,114,162,114,162\" nohref data-episode=\"ep1\" class=\"sound\" id=\"sound_one\" />\n            <area shape=\"poly\" coords=\"94,333,108,320,102,283,106,278,484,225,490,227,503,322,500,328,121,382,116,379,110,342,94,334\" data-coords=\"94,333,108,320,102,283,106,278,484,225,490,227,503,322,500,328,121,382,116,379,110,342,94,334\" nohref data-episode=\"ep2\" class=\"sound\" id=\"sound_two\" />\n            <area shape=\"poly\" coords=\"218,496,228,479,240,492,444,463,449,467,463,562,459,567,81,621,75,618,61,524,64,518,218,496\" data-coords=\"218,496,228,479,240,492,444,463,449,467,463,562,459,567,81,621,75,618,61,524,64,518,218,496\" nohref data-episode=\"ep3\" class=\"sound\" id=\"sound_three\" />\n            <area shape=\"poly\" coords=\"475,661,492,671,478,685,483,720,480,725,99,777,95,773,82,680,85,673,465,622,471,625,475,662,475,662\" data-coords=\"475,661,492,671,478,685,483,720,480,725,99,777,95,773,82,680,85,673,465,622,471,625,475,662,475,662\" nohref data-episode=\"ep4\" class=\"sound\" id=\"sound_four\" />\n            <area shape=\"poly\" coords=\"482,907,499,917,485,930,490,965,486,971,108,1022,102,1018,89,924,92,919,472,867,478,870,482,907\" data-coords=\"482,907,499,917,485,930,490,965,486,971,108,1022,102,1018,89,924,92,919,472,867,478,870,482,907\" nohref data-episode=\"ep5\" class=\"sound\" id=\"sound_five\" />\n            <area shape=\"poly\" coords=\"147,1160,155,1143,169,1157,497,1112,503,1116,515,1212,512,1216,132,1268,127,1265,115,1169,117,1164,147,1160,147,1160\" data-coords=\"147,1160,155,1143,169,1157,497,1112,503,1116,515,1212,512,1216,132,1268,127,1265,115,1169,117,1164,147,1160,147,1160\"  nohref data-episode=\"ep6\" class=\"sound\" id=\"sound_six\" />\n            <area shape=\"poly\" coords=\"173,1421,157,1412,170,1399,165,1363,169,1357,547,1304,553,1306,566,1402,563,1407,184,1461,178,1458,173,1421,173,1421\" data-coords=\"173,1421,157,1412,170,1399,165,1363,169,1357,547,1304,553,1306,566,1402,563,1407,184,1461,178,1458,173,1421,173,1421\" nohref data-episode=\"ep7\" class=\"sound\" id=\"sound_seven\" />\n            <area shape=\"poly\" coords=\"309,1620,320,1603,332,1617,427,1604,432,1607,444,1703,440,1709,62,1760,57,1757,43,1662,46,1656,308,1621\" data-coords=\"309,1620,320,1603,332,1617,427,1604,432,1607,444,1703,440,1709,62,1760,57,1757,43,1662,46,1656,308,1621\" nohref data-episode=\"ep8\" class=\"sound\" id=\"sound_eight\" />\n        </map>\n    </section>\n\n    <div id=\"aide\" class=\"show\">\n        <div id=\"popin_bg\"></div>\n        <div class=\"popin_container\">\n            <div class=\"popin_txt\">   \n                <h1>Transportez-vous</h1> \n                <div class=\"popin_scroll\">\n                    <p>Vous aimez qu'on vous raconte des histoires.</p>\n                    <p> Vous prenez régulièrement le train, le métro, les transports.</p>\n                    <p>Vous vous y ennuyez, souvent.</p>\n                    <p>Vous auriez envie d'y écouter des fictions originales, qui partiraient de votre quotidien pour vous emmener ailleurs.</p>\n                    <p>France Culture l’a fait : voilà une première saison de 8 fictions sur le thème du train, à écouter en mobilité, sur vos téléphones ou vos tablettes. Ecoutez.</p>                    \n                </div> \n                <div id=\"close_btn\">x</div>\n            </div>\n        </div>\n    </div>\n\n</div> \n<div style=\"clear:both;\"></div> \n";
  });

this["app"]["templates"]["info"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<header >\n    <div id=\"back\" class=\"img_button\"></div>\n    <div id=\"page_title\">Fictions</div>\n</header>\n\n<section data-role=\"content\" data-iscroll class=\"scroller padding_side_10\">\n  <img  src=\"images/map_infos.png\" border=\"0\" width=\"100%\" usemap=\"#map_infos\" class=\"img_page_infos resizeable\" id=\"img_infos\" />\n  <map name=\"map_infos\" id=\"map_infos\">\n    <area shape=\"poly\" coords=\"218,632,216,594,219,590,352,585,356,587,357,626,354,629,220,635,217,632,217,632\" data-coords=\"218,632,216,594,219,590,352,585,356,587,357,626,354,629,220,635,217,632,217,632\" id=\"linkto_contact\" href=\"\">\n    <area shape=\"poly\" coords=\"243,1200,241,1163,245,1159,407,1152,411,1156,412,1194,409,1197,246,1203,242,1200\" data-coords=\"243,1200,241,1163,245,1159,407,1152,411,1156,412,1194,409,1197,246,1203,242,1200\" id=\"linkto_design\" href=\"\">\n    <area shape=\"poly\" coords=\"248,1331,247,1294,249,1290,383,1285,386,1287,388,1326,385,1328,251,1334,248,1331\" data-coords=\"248,1331,247,1294,249,1290,383,1285,386,1287,388,1326,385,1328,251,1334,248,1331\" id=\"linkto_dev\" href=\"\">\n    <area shape=\"poly\" coords=\"254,1464,252,1425,256,1422,388,1416,391,1419,393,1457,390,1460,255,1466,253,1464\" data-coords=\"254,1464,252,1425,256,1422,388,1416,391,1419,393,1457,390,1460,255,1466,253,1464\" id=\"linkto_host\" href=\"\">\n  </map>\n</section>";
  });

  (function (app) {
    app.views = app.views || {};
    var change_page = function (page, iddest, effect, attr) {

      function clear_content(){
        document.getElementById("content").removeChild(document.getElementById("current_show")); 
        document.getElementById("next_page").id = "current_show";
      }

      function callback_change(page_type, attributes){

        function dl_callback (){
            document.getElementById('player').className = ''; 
            app.controllers.sound.release();
            var download_track = document.getElementById('download_all');
            download_track.className = 'hidden';
            download_track.innerHTML = '';
            setTimeout(function(){
              var path = app.controllers.file.path_app();
              app.controllers.file.is_indir(attributes.file, function(){
                app.controllers.sound.playAudio(path + '/' + attributes.file, "player_play_pause", "player_stop", "player_progress_bar", "player_time", attributes.name);
              }, null);             
            },200);   
        }

        function getPhoneGapPath() {

            var path_tmp = window.location.pathname;
            path_tmp = path_tmp.substr( 0, path_tmp.length - 10 );
            return path_tmp;

        }

        function isindir_success() {
          var path = app.controllers.file.path_app();
          app.controllers.sound.playAudio(path + '/' + attributes.file, "player_play_pause", "player_stop", "player_progress_bar", "player_time", attributes.name);
        }

        function isindir_fail() {
          if (info_device.os === 'ios' && attributes.folder !== 'download') {
            var ios_path = getPhoneGapPath();
            app.controllers.sound.playAudio(ios_path + 'audio/' + attributes.file, "player_play_pause", "player_stop", "player_progress_bar", "player_time", attributes.name);
          }
          else if (info_device.os === 'android' && attributes.folder !== 'download') {
            app.controllers.sound.playAudio(attributes.folder+attributes.file, "player_play_pause", "player_stop", "player_progress_bar", "player_time", attributes.name);
          }
          else{
            document.getElementById('player').className = 'no_media'; 
            setTimeout(function(){
              app.controllers.file.download_file (attributes.dl_folder, attributes.file, dl_callback, null, true);
            },10);
          }
        }

        var context = null;

         clear_content();
        if (page_type == 'episode'){

          context = attributes;
          var info_device = app.utils.stats.get_info();
          
            var current_media_src = app.controllers.sound.current_media_src();
            if (current_media_src.indexOf(attributes.file) > -1 && !app.controllers.sound.get_is_stopped()){
              app.controllers.sound.player_ctrl_init("player_play_pause", "player_stop", "player_progress_bar", "player_time");
            }
            else{
              app.controllers.sound.release();

              app.controllers.file.is_indir(attributes.file,isindir_success,isindir_fail);
            }
            app.utils.stats.stats_click('p=episodes::' + attributes.name + '::' + attributes.name + '::' + attributes.name, 'c=episodes&p=' + attributes.name + '&l3=' + attributes.name + '&l4=' + attributes.name, null, null );
            app.views.episode.render(context);
            
          }
          else if (page_type == 'home'){
          app.utils.stats.stats_click('p=accueil::accueil::accueil::accueil','c=accueil&p=accueil&l3=accueil&l4=accueil', null, null );
          app.views.home.render();
         }
         else if (page_type == 'info'){
           app.views.info.render();
         }
       }
        var pages_attributes = app.controllers.config.info_page;

        var next_page_attr = null;

        if (attr){
          if (attr['data-episode']){
            next_page_attr = pages_attributes[attr['data-episode'].value];
          }
        }

        var data_html = app.templates[page](next_page_attr);

        var new_page = document.createElement("div");
        new_page.setAttribute('id','next_page');
        new_page.innerHTML = data_html;
        document.getElementById("content").appendChild(new_page);

        $("#current_show").animate({"left": "-=100%"}, "slow", callback_change(page, next_page_attr));

      };
      
      // Public members
      app.controllers.nav = {
        change_page: change_page
      };
      
    })(window.app = window.app || {});

(function (app) {
    app.controllers = app.controllers || {};

    
        // Audio player variables 
        var my_media = null;
        var mediaTimer = null;
        var elt_play_pause = null;
        var elt_stop = null;
        var elt_progress_bar = null;
        var elt_timer = null;          
        var elt_timer_current = null;        
        var elt_timer_max = null;
        var current_media_duration = null;
        var current_media_src = '';

        // Progress bar variables
        var progress_bar_onstart = null;
        var bar_width = null; 
        var parent_pos = null;
        var current_name = '';

        var is_paused = false;
        var is_stopped = true; 


        var save_id_play_pause = '';
        var save_id_stop = '';
        var save_id_progress_bar = '';
        var save_id_timer = '';

        var move = false;


        var player_ctrl_init = function (id_play_pause, id_stop, id_progress_bar, id_timer){
            elt_play_pause = document.getElementById(id_play_pause);
            elt_stop = document.getElementById(id_stop);
            elt_progress_bar = document.getElementById(id_progress_bar);     
            elt_timer = document.getElementById(id_timer);   
            elt_timer_current = document.getElementById('player_time_current');        
            elt_timer_max = document.getElementById('player_time_total');      

            if(elt_stop) elt_stop.addEventListener('click', stopAudio);
            if(elt_play_pause) {
                elt_play_pause.addEventListener('click', playOrPause);
                if (is_paused) elt_play_pause.className = 'icon-play';
            }
            if(elt_progress_bar) elt_progress_bar.parentElement.addEventListener('touchstart', touchstart);
            if(elt_progress_bar) elt_progress_bar.parentElement.addEventListener('touchend', touchend);
            if(elt_progress_bar) elt_progress_bar.parentElement.addEventListener('touchmove', touchmove);
        };

        var get_elt_progress_bar = function (){
            return elt_progress_bar;
        };

        var get_is_paused = function (){
            return is_paused;
        };

        var set_is_paused = function (val){
            is_paused = val;
        };

        var get_is_stopped = function (){
            return is_stopped;
        };

        var set_is_stopped = function (val){
            is_stopped = val;
        };

        var set_audio_timer = function (){
            if (mediaTimer === null) {
                mediaTimer = setInterval(function() {
                    my_media.getCurrentPosition(
                        function(position) {
                            var bar = get_elt_progress_bar();
                            if (position > -1 && bar) { 
                                    // console.log(position);
                                    if(!move) bar.style.width = positionToPercent(position,my_media.getDuration()) + '%';
                                    elt_timer_max.innerHTML = durationFormat(my_media.getDuration()) ;
                                    elt_timer_current.innerHTML = durationFormat(position) ;
                                if (current_media_duration === null){
                                    current_media_duration = my_media.getDuration();
                                    app.utils.stats.stats_click('p=episodes::' + name + '::' + name + '::' + name, '', 'play', my_media.getDuration() );
                                }
                            }
                        },
                        function(e) {
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        };



        // Play audio
        //
        var playAudio = function (src, id_play_pause, id_stop, id_progress_bar, id_timer, name) {
            
            player_ctrl_init(id_play_pause, id_stop, id_progress_bar, id_timer);
            

            save_id_play_pause = id_play_pause;
            save_id_stop = id_stop;
            save_id_progress_bar = id_progress_bar;
            save_id_timer = id_timer;
            set_is_paused(false);
            set_is_stopped(false);

            if (src) current_media_src = src;
            current_name = name;
            if (my_media === null) {
                // Create Media object from src
                my_media = new Media(src, onSuccess, onError);
                
            } 
            my_media.play();
            set_audio_timer();
        };

        var positionToPercent = function (pos, max){
            var result = (pos/max)*100;
            return result.toFixed(2);
        };

        var percentToPposition = function (percent, max){
            return max*(percent/100);
        };

        var durationFormat = function (duration){
            var minute = (duration/60 >> 0);
            var seconde = (duration%60 >> 0) < 10 ? '0' + (duration%60 >> 0) : (duration%60 >> 0);
            return minute + ':' + seconde;
        };

        var getPos = function (ele){
            var x=0;
            var y=0;
            while(true){
                x += ele.offsetLeft;
                y += ele.offsetTop;
                if(ele.offsetParent === null){
                    break;
                }
                ele = ele.offsetParent;
            }
            return [x, y];
        };

        var array_test = null;

        var touchstart = function (event){
            event.preventDefault();
            array_test = [];
            pos_start =  event.changedTouches[0].pageX;
            progress_bar_onstart = elt_progress_bar.style.width;
            bar_width = elt_progress_bar.parentElement.offsetWidth; 
            parent_pos = getPos(elt_progress_bar.parentElement);

            elt_progress_bar.className = "bar no_animation";
        };

        var test1 = null;
        var test2 = null;

        var touchend = function (event){
             event.preventDefault();
            var gap = null;
            var time_pos = null;
             move = false;
            if(array_test.length > 0){
                gap = array_test[array_test.length-1];
                time_pos = (gap/bar_width)*current_media_duration;
                my_media.seekTo(time_pos*1000); 
            }
            else{
                gap = pos_start-parent_pos[0];
                time_pos = (gap/bar_width)*current_media_duration;
                my_media.seekTo(time_pos*1000); 
            }

            elt_progress_bar.className = "bar";
            array_test = null;
        };

        var touchmove = function (event){
            event.preventDefault();
             move = true;
            array_test.push(event.touches[0].pageX-parent_pos[0]);

            var gap = (event.touches[0].pageX-parent_pos[0]);
            var gap_percent = (gap*100)/bar_width;
            var time_pos = (gap/bar_width)*current_media_duration;
            elt_timer_current.innerHTML = durationFormat(time_pos);
             elt_progress_bar.style.width = gap_percent + '%';
        };


        var timeshift = function (time){
            my_media.seekTo(time);
        };

        var playOrPause = function (event) {
             event.preventDefault();
            if (event.target.className == 'icon-play'){
                event.target.className = 'icon-pause';
                endPauseAudio();
            }
            else if (event.target.className == 'icon-pause'){
                event.target.className = 'icon-play';
                pauseAudio();
            }
        };


        // Pause audio
        //
        var pauseAudio = function () {
            // alert('##### Pause Audio');
            if (my_media) {
                set_is_paused(true);
                set_is_stopped(false);
                my_media.pause();
                app.utils.stats.stats_click('p=episodes::' + current_name + '::' + current_name + '::' + current_name, '', 'pause', my_media.getDuration() );
            }
        };
        // Re start audio
        //
        var endPauseAudio = function () {
            if (my_media) {
                set_is_paused(false);
                set_is_stopped(false);
                player_ctrl_init(save_id_play_pause, save_id_stop, save_id_progress_bar, save_id_timer);
                playAudio(null,save_id_play_pause, save_id_stop, save_id_progress_bar, save_id_timer);
                app.utils.stats.stats_click('p=episodes::' + current_name + '::' + current_name + '::' + current_name, '', 'play', my_media.getDuration() );
            }
        };

        // Stop audio
        //
        var stopAudio = function () {
            if (my_media) {
                elt_play_pause.className = 'icon-play';
                elt_progress_bar.style.width = '0%';
                elt_timer_current.innerHTML = durationFormat(0) ;
                set_is_paused(false);
                set_is_stopped(true);
                my_media.stop();
                app.utils.stats.stats_click('p=episodes::' + current_name + '::' + current_name + '::' + current_name, '', 'stop', my_media.getDuration() );
            }

            clearInterval(mediaTimer);
            mediaTimer = null;
        };

        // onSuccess Callback
        //
        var onSuccess = function () {
            elt_play_pause.className = 'icon-play';
        };

        // onError Callback
        //
        var onError = function (error) {
            var errors = [
                error.MEDIA_ERR_ABORTED,
                error.MEDIA_ERR_NETWORK,
                error.MEDIA_ERR_DECODE,
                error.MEDIA_ERR_NONE_SUPPORTED
            ];
            if( errors.indexOf(error.code) > -1 ){
                alert(app.controllers.config.errors_label.media[error.code] + '\n');
            }
        };

        // Set audio position
        //
        var setAudioPosition = function (position) {
            document.getElementById('audio_position').innerHTML = position;
        };

        // release Callback
        //
        var release = function () {
            if (my_media) {
                my_media.stop();
                app.utils.stats.stats_click('p=episodes::' + current_name + '::' + current_name + '::' + current_name, '', 'stop', my_media.getDuration() );
                my_media.release();
            }

            clearInterval(mediaTimer);
            
            // Progress bar variables
            progress_bar_onstart = null;
            bar_width = null; 
            parent_pos = null;

            // Audio player variables 
            mediaTimer = null;
            elt_play_pause = null;
            elt_stop = null;
            elt_progress_bar = null;
            elt_timer = null;          
            elt_timer_current = null;        
            elt_timer_max = null;
            current_media_duration = null;
            my_media = null;
        };   

        var get_current_media_src = function (position) {
            return current_media_src;
        };
    
    // Public members
    app.controllers.sound = {
        current_audio: my_media,
        playAudio:playAudio,
        seekTo : timeshift,
        pauseAudio : pauseAudio,
        endPauseAudio : endPauseAudio,
        stopAudio : stopAudio,
        setAudioPosition : setAudioPosition,
        release : release,
        current_media_src : get_current_media_src,
        player_ctrl_init : player_ctrl_init,
        is_paused : is_paused,
        get_is_paused : get_is_paused,
        get_is_stopped : get_is_stopped
    };
})(window.app = window.app || {});

(function (app) {
    app.controllers = app.controllers || {};

    var path_device = null;
    var path_app = null;
    var dir_app_obj = null;
    var obj_dir = null;
    var dl_nb = -1;
    var current_list_download = null;
    var all_file = false;

    var errors_alert = function (code, msg){
        if (app.utils.stats.is_connected()){
            if(code !== null & msg !== null) alert(msg + ' : \n' + app.controllers.config.errors_label.file[code]);
            else if(code) alert(app.controllers.config.errors_label.file[err]);
            else if(msg) alert(msg);
        }
        else alert('Une connexion réseau est nécessaire pour télécharger ce fichier.');
    };

    var path_app_set = function (){
        if (path_app !== null) return path_app;
        else {
            get_device_path();
            return path_app;
        }
    };


    var path_obj_set = function (){
        if (obj_dir !== null) return obj_dir;
        else {
            get_device_path();
            return obj_dir;
        }
    };

    var get_device_path = function (callback){    
        var dir_app_name = 'rfi_appepisode';
        function success(parent) {
     
            path_app = parent.fullPath;
            obj_dir = parent;

            if (callback) callback();
        }

        function fail(err) {
            alert("L'appication ne peut ecrire sur votre téléphone");
        }

        var get_error = null;

        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(
            window.LocalFileSystem.PERSISTENT, 
            0, 
            function (e) {
                path_device = e.root.fullPath;
                dir_app_obj = e.root;
                dir_app_obj.getDirectory(dir_app_name, {create: true, exclusive: false}, success, fail);
            }, 
            function (e) {
                get_error = true;
            }
        );

        if(get_error !== true) {return path_device;}
        else alert("L'appication ne peut ecrire sur votre téléphone");
    };


    var is_indir = function (filename, fct_success, fct_fail){
        var root = path_obj_set();

        var result = false;

        // Retrieve an existing file, or create it if it does not exist
        root.getFile(filename, {create: false}, fct_success, fct_fail);

        return result;
    };

    var check_all_sounds = function () {

        var result = true;
        var list_audio = app.controllers.config.list_audio();
        var info_page = app.controllers.config.info_page;
        var max = list_audio.length;
        var id = 0;
        var download_track = document.getElementById('download_all');

        function check_fail(){
            download_track.className = 'img_button';
        }

        function iterate(){
            if(id < max){
                ++id;
                download_track.className = 'img_button hidden';
                is_indir(info_page[list_audio[id]].file, iterate, check_fail);
            }
        }

        iterate();
    };

    var all_sounds_states = function () {

        return all_file;
    };


    var download_file = function (serv_url, file_name, callback, callback_error, progress) {

        var fileTransfer = new FileTransfer();
        var uri = encodeURI(serv_url + '/' + file_name);
        var path_copy ='';

        if (path_app !== null){
            path_copy = path_app + '/' + file_name;
        }
        else {
            var dir = get_device_path();
            if (dir !== null) path_copy = dir + '/' + file_name;
        }

        if (progress) {
            var download_track = document.getElementById('download_all');
            fileTransfer.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {    
                    download_track.className = 'img_button in_dl';
                     if (progressEvent.lengthComputable) {
                        var percent_load = ((progressEvent.loaded / progressEvent.total) * 50) << 0;
                        download_track.innerHTML = percent_load + '%';
                     }
                    
                } 
            };
        }

        fileTransfer.download(
            uri,
            path_copy,
            callback,
            callback_error || function(error) {
                errors_alert(error.code);
            },
            true
        );
    };

    var download_all_files = function () {

        var list_audio = app.controllers.config.list_audio();
        var info_page = app.controllers.config.info_page;
        var download_track = document.getElementById('download_all');
        var id = 0;
        var dl_nb = list_audio.length;
        var file_nb = list_audio.length;
        var current_list_download = null;

        function get_id(){
            return id;
        }

        function get_file_nb(){
            return file_nb;
        }

        function get_dl_nb(){
            return dl_nb;
        }

        function dl_all_error (error){
            window.clearInterval(current_list_download);
            download_track.className = 'img_button';
            download_track.innerHTML = '';
            dl_nb = 0;
            errors_alert(error.code, 'Erreur lors du télécharchement\n');
        }

        function check_n_dl () {

            if (dl_nb){

                var serv = info_page[list_audio[id]].dl_folder;
                var name = info_page[list_audio[id]].file;
                ++id;
                --dl_nb;
                download_file(serv, name, function(){check_n_dl(id);}, dl_all_error, false);
            }
            else {
                window.clearInterval(current_list_download);
                download_track.className = 'img_button hidden';
                download_track.innerHTML = '';
            }
        }

        if (window.confirm('Voulez-vous télécharger toutes les fictions? (soit 56,2 Mo) ?')) {

            

            download_track.innerHTML = (id+1) + ' / ' + list_audio.length;
            download_track.className = 'img_button in_dl';

            current_list_download = setInterval(function() {
                var ininterval_id = get_id();
                var ininterval_dl_nb = get_dl_nb();
                var ininterval_file_nb = get_file_nb();
                // alert('interval, id : ' + ininterval_id);
                if (ininterval_dl_nb){            
                    download_track.innerHTML = (ininterval_id+1) + ' / ' + ininterval_file_nb;
                    download_track.className = 'img_button in_dl';
                }
            },1000);

            check_n_dl();


        }
        
    };
    
    // Public members
    app.controllers.file = {
        path_app: path_app_set,
        obj_dir:path_obj_set,
        define_path: get_device_path,
        is_indir: is_indir,
        download_file: download_file,
        check_all_sounds:check_all_sounds,
        download_all_files:download_all_files,
        all_sounds_states : all_sounds_states
    };
})(window.app = window.app || {});

(function (app) {
    app.views = app.views || {};
    
     var render = function (context) {

        app.views.fct_resize.resize($('#img_infos'));

        function return_home_fct(event){
            event.preventDefault(); 
            app.controllers.nav.change_page('home', '#content', 'slideright', null );
        }
        function goto_contact(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser('mailto:' + app.controllers.config.infos_conf.contact);
        }
        function goto_design(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser(app.controllers.config.infos_conf.design);
        }
        function goto_dev(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser(app.controllers.config.infos_conf.dev);
        }
        function goto_host(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser(app.controllers.config.infos_conf.host);
        }
        //les liens :
        var return_home     = document.getElementById('back');     
        var link_contact    = document.getElementById('linkto_contact');     
        var link_design     = document.getElementById('linkto_design');     
        var link_dev        = document.getElementById('linkto_dev');     
        var link_host       = document.getElementById('linkto_host');     

        //les events
        if(return_home)  return_home.addEventListener('click', return_home_fct);
        if(link_contact) link_contact.addEventListener('click', goto_contact);
        if(link_design)  link_design.addEventListener('click', goto_design);
        if(link_dev)     link_dev.addEventListener('click', goto_dev);
        if(link_host)    link_host.addEventListener('click', goto_host);

        $('.resizeable').each(function(){
            $(this).load(function(){app.views.fct_resize.resize($(this));});
        });

        $(window).resize(function() {
          $('.resizeable').each(function(){
            app.views.fct_resize.resize($(this));
          });
        });

    };


    
    // Public members
    app.views.info = {
        render: render
    };
    
})(window.app = window.app || {});


(function (app) {
    app.views = app.views || {};
    
 
    var popin_state = true;
    var close_popin =  null;

    var get_popin_state = function () {
        return popin_state;
    };

    var set_popin_state = function (status) {
        popin_state = status;
    };
 

    var render = function (statuses) {      

        app.views.fct_resize.resize($('#img_home'));

        function click_area (event){
            event.preventDefault();
            // console.log('click_area');
            // alert('click_area');
            app.controllers.nav.change_page('episode', '#content', 'slideright', event.target.attributes );
        }

        function click_info (event){
            event.preventDefault();
            app.controllers.nav.change_page('info', '#content', 'slideright', event.target.attributes );
        }

        function close_popin_fct (event){
            event.preventDefault();
            set_popin_state(false);
            add_area_event ();
            if (close_popin) close_popin.className = 'hidden';
            document.body.style.overflow = 'visible';
                            document.getElementById('current_show').style.overflow = 'visible';
                document.getElementById('current_show').style.height = 'auto';
        }

        function add_area_event (){
            var areas= document.getElementsByTagName('area');
            for (var area in areas) {
                if( (area >> 0) == area){
                    // console.log('area n : ' + area);
                    // alert('area n : ' + area);
                    areas[area].addEventListener('click', click_area);
                }
            }  
        }


        var close_popin = document.getElementById('aide');
        

        if (close_popin){
            if (popin_state) {
                // document.body.style.overflow = 'hidden';      
                // document.getElementById('img_home').style.overflow = 'hidden'; 
                document.getElementById('current_show').style.overflow = 'hidden';
                document.getElementById('current_show').style.height = '100%';

                var bg = document.getElementById('popin_bg');
                var close_btn = document.getElementById('close_btn');
                
                bg.style.zIndex = '98';

                bg.addEventListener('click', close_popin_fct);
                close_btn.addEventListener('click', close_popin_fct);
                close_btn.addEventListener('touchmove', close_popin_fct/*, true*/);
                close_btn.addEventListener('touchend', close_popin_fct/*, true*/);

            } else {
                close_popin.className = 'hidden';
                // document.body.style.overflow = 'visible';

                add_area_event ();

            }
        }

        var download_track = document.getElementById('download_all');
        if(download_track) {
            download_track.addEventListener('click', app.controllers.file.download_all_files);
            app.controllers.file.check_all_sounds();
        }

        var link_info = document.getElementById('infos');
        if (link_info) link_info.addEventListener('click', click_info);
      

        $('.resizeable').each(function(){
            $(this).load(function(){app.views.fct_resize.resize($(this));});
        });

        $(window).resize(function() {
          $('.resizeable').each(function(){
            app.views.fct_resize.resize($(this));
          });
        });
    };
    
    // Public members
    app.views.home = {
        render: render
    };

    // About routing
    var routeHomeListener = function () {
        app.views.home.render('');
    };

    
})(window.app = window.app || {});


(function (app) {
    app.views = app.views || {};
    
 

    var resize = function (img) {

      var width = $(img).width();
      var height = $(img).height();

      var orig = new Image();
      orig.src = $(img).attr('src');
      var map_name = $(img).attr('usemap');
      $('area', map_name).each(function(){
        areaResize($(this).attr('id'), orig.width, orig.height, width, height, $(this).attr('data-coords')); 
      });
    };

    var myAreaResize = function () {
      $('.resizeable').ready(function() {
        $('.resizeable').load(function(){
          resize($(this));
        });
      });
    };

    /**
     * Generate new area coordinate
     */
    var areaResize = function (areaId, baseWidth, baseHeight, newWidth, newHeight, baseCoords) {
      var newCoords = "";
      var baseCoordsArray = String(baseCoords).split(",");

      for (var i = 0; i < baseCoordsArray.length; i++) {
        if (String(baseCoordsArray[i]).length > 0) {
          if (i % 2 === 0) {
            // x coordinate
            newCoords += String(parseInt((newWidth / baseWidth) * parseInt(String(baseCoordsArray[i]), 10),10));
          }
          else {
            // y coordinate
            newCoords += String(parseInt((newHeight / baseHeight) * parseInt(String(baseCoordsArray[i]), 10),10));
          }
        }
        if (i < baseCoordsArray.length - 1) newCoords += ",";
      }

      document.getElementById(areaId).coords = newCoords;
    };


 


    
    // Public members
    app.views.fct_resize = {
        resize: resize,
        myAreaResize: myAreaResize,
        areaResize: areaResize
    };
    
})(window.app = window.app || {});



(function (app) {
    app.views = app.views || {};
    
     var render = function (context) {

        app.views.fct_resize.resize($('#img_episode'));

        function return_home_fct(event){
            event.preventDefault(); 
            app.controllers.nav.change_page('home', '#content', 'slideright', null );
        }
        function goto_fb(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser('http://facebook.com/sharer/sharer.php?m=self&u=Transportez-vous avec la nouvelle appli France Culture  http://bit.ly/14QS4lk');
        }
        function goto_twitter(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser('http://twitter.com/share?text=Transportez-vous avec la nouvelle appli France Culture  http://bit.ly/14QS4lk');
        }
        function open_mail(event){
            event.preventDefault(); 
            app.utils.external.openInBorwser('mailto:' + '?subject=Découvre cette application France Culture&body=Transportez-vous avec la nouvelle appli France Culture  http://bit.ly/14QS4lk');
        }
        function page_episode(event){
            event.preventDefault(); 
            var episode = event.target.getAttribute('data-episode');
             app.controllers.nav.change_page('episode', '#content', 'slideright', event.target.attributes );
        }

        setTimeout(function(){
            //les liens :
            var return_home = document.getElementById('back');     
            var link_fb = document.getElementById('linkto_fb');     
            var link_twitter = document.getElementById('linkto_twitter');     
            var link_mailto = document.getElementById('linkto_mail');     
            var link_link1 = document.getElementById('link_1');     
            var link_link2 = document.getElementById('link_2');  

            //les events
            if(return_home)     return_home.addEventListener('click', return_home_fct);
            if(link_fb)         link_fb.addEventListener('click', goto_fb);
            if(link_twitter)    link_twitter.addEventListener('click', goto_twitter);
            if(link_mailto)     link_mailto.addEventListener('click', open_mail);
            if(link_link1)      link_link1.addEventListener('click', page_episode);
            if(link_link2)      link_link2.addEventListener('click', page_episode);
        },10);


        $('.resizeable').each(function(){
            $(this).load(function(){app.views.fct_resize.resize($(this));});
        });

        $(window).resize(function() {
          $('.resizeable').each(function(){
            app.views.fct_resize.resize($(this));
          });
        });

    };


    
    // Public members
    app.views.episode = {
        render: render
    };
    
})(window.app = window.app || {});

