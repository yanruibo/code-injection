



            var inmobi_conf = {
                siteid : "40d6d5e58321479a957e86b4f60ac3d0",
                slot : "15",
                autoRefresh: 4, // in seconds (number)
                sticky: "bottom",
                targetWindow : "_blank"   
            };
        






// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)
    var $body   = $(document.body)

    var navHeight = $('.navbar').outerHeight(true) + 10

    $body.scrollspy({
      target: '.bs-sidebar',
      offset: navHeight
    })

    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

    $('.bs-docs-container [href=#]').click(function (e) {
      e.preventDefault()
    })

    // back to top
    setTimeout(function () {
      var $sideBar = $('.bs-sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop      = $sideBar.offset().top
            var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
            var navOuterHeight = $('.bs-docs-nav').height()

            return (this.top = offsetTop - navOuterHeight - sideBarMargin)
          }
        , bottom: function () {
            return (this.bottom = $('.bs-footer').outerHeight(true))
          }
        }
      })
    }, 100)

    setTimeout(function () {
      $('.bs-top').affix()
    }, 100)

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "[data-toggle=tooltip]",
      container: "body"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    $('.bs-docs-navbar').tooltip({
      selector: "a[data-toggle=tooltip]",
      container: ".bs-docs-navbar .nav"
    })

    // popover demo
    $("[data-toggle=popover]")
      .popover()

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('.bs-docs-carousel-example').carousel()
})

}(window.jQuery)


var watchID = null;
var view = true;
var viewAlert = true;
//variable for GA
var ua = "";
var isAndroid = "";
var isIOS = "";
var type = "";
var device = "";
var urlOrari = "";
var url892000 = "";
var flagViewBanner = false;

document.addEventListener("deviceready", onDeviceReady, false);
//onSuccess();
/**
 * Device is reay
 * @returns {undefined}
 */
function onDeviceReady() {
    trackPage();  //monitor GA
    if (viewAlert) {
        viewAlert = false;
        navigator.notification.alert(
                'Gentile utente,\nnon siamo direttamente responsabili delle informazioni riportate in questa applicazione.\nCi scusiamo per eventuali disagi', // message
                '', // callback
                '', // title
                'Ok'// buttonName
                );
    }
    $("#exit").click(function(){
        exit();
    }); 
    
    var options = {frequency: 3000, enableHighAccuracy: true,timeout: 8000};
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

/**
 * Start app
 * @param {type} position
 * @returns {undefined}
 */
function onSuccess(position) { 
    //call API app "farmacia"
    if (view) {
        view = false;
        app = "farmacie";
        $.ajax({
            cache: false,
            url: "http://api.892000.it/app.php?app=" + app + "&utl=antonio&token=4nt0n10",
            type: 'GET',
            beforeSend: function() {
            },
            complete: function() {
            },
            dataType: 'json',
            error: function(jqXHR, textStatus, errorThrown) {
                $("#loader").fadeOut("fast");
                $("#error").fadeIn("fast");
            },
            success: function(data) {
                //json = (eval("(" + data + ")"));
                json = data;
                //console.log(json)
                if ($(".testo_footer").is(':hidden')) {
                    $(".testo_footer").append(json[0].footer)
                }
                if (json[0].orari != undefined) {
                    $.ajax({
                        cache: false,
                        url: "http://api.892000.it/engine_1.php?cosa=" + app + "+" + json[0].orari + "&dove=&vicinoa=&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&page=1&aziende=1&export=json&utl=antonio&token=4nt0n10",
                        type: 'GET',
                        beforeSend: function() {
                        },
                        complete: function() {
                        },
                        dataType: 'json',
                        error: function(jqXHR, textStatus, errorThrown) {
                            $("#loader").fadeOut("fast");
                            $("#error").fadeIn("fast");
                        },
                        success: function(data) {
                            //console.log(data);  
                            //1° risultato
                            result(data,0);
                            //2° risultato
                            result(data,1);
                            //3° risultato
                            result(data,2);
                            //stampa a video
                            $("#loader").fadeOut("fast");
                            $(".result").fadeIn("fast");
                            $("#container_aggiorna").fadeIn("fast")
                            $("#panelContenuto").fadeIn("fast")
                            $("#panelContenuto2").fadeIn("fast")
                            $("#panelContenuto3").fadeIn("fast")                            
                            $("#otherResult").fadeIn("fast")
                            $("#footer").fadeIn("fast")
                            //other result
                            if (data.summary.nresults > 3){
                                $(".other").fadeIn("fast");
                                $('body').on('click', '#otherResult', function() {
                                   for (var t=3;t<10;t++){
                                       if(t <= data.summary.nresults){
                                           result(data,t);
                                           $("#panelContenuto"+(t+1)).fadeIn("fast")
                                           $(".result").fadeIn("fast");
                                           if(flagViewBanner) $("#panelContenutoOpec2").fadeIn("fast");
                                       }
                                   }
                                   $(".other").fadeOut("fast");
                                });
                            }
                        }
                    })
                }
            }
        })
        var latlng = "";
        //call API client 892000
        $.ajax({
                cache: false,
                url: "http://api.892000.it/geolocation.php?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true&utl=antonio&token=4nt0n10",
                type: 'GET',
                beforeSend: function() {
                },
                complete: function() {
                },
                dataType: 'html',
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#panelContenutoOpec").fadeOut("fast");
                    $("#panelContenutoOpec2").fadeOut("fast");
                },
                success: function(data) {
                    if(data != ""){
                        //show opec cli 
                        $.ajax({
                            cache: false,
                            url: "http://api.892000.it/clienti.php?dove="+data+"&utl=antonio&token=4nt0n10",
                            type: 'GET',
                            beforeSend: function() {
                            },
                            complete: function() {
                            },
                            dataType: 'html',
                            error: function(jqXHR, textStatus, errorThrown) {
                                $("#panelContenutoOpec").fadeOut("fast");
                                $("#panelContenutoOpec2").fadeOut("fast");
                            },
                            success: function(opec) {
                                if(opec != ""){
                                    $.ajax({
                                        cache: false,
                                        url: "http://api.892000.it/engine_1.php?opec=" + opec + "&aziende=1&export=json&utl=antonio&token=4nt0n10",
                                        type: 'GET',
                                        beforeSend: function() {
                                        },
                                        complete: function() {
                                        },
                                        dataType: 'json',
                                        error: function(jqXHR, textStatus, errorThrown) {
                                            $("#panelContenutoOpec").fadeOut("fast");
                                            $("#panelContenutoOpec2").fadeOut("fast");
                                        },
                                        success: function(banner) {
                                            if(banner != ""){
                                                //console.log(banner)
                                                resultOpec(banner,99);
                                                $(".result").fadeIn("fast");
                                                $("#panelContenutoOpec").fadeIn("fast");
                                                flagViewBanner = true;
                                                //$("#panelContenutoOpec2").fadeIn("fast");
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
        });
        //open link in external browser
        $("body").on("click",".linkExt",function(e){
            e.preventDefault();
            window.open($(this).attr("href"), '_system', 'location=yes');
        });
    }
}

/**
 * Error function
 * @param {type} error
 * @returns {undefined}
 */
function onError(error) {
    ///alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    $("#error_gps").fadeIn("fast");
    $("#close_app").fadeIn("fast");
    $("#loader").fadeOut("fast");
    var el = document.getElementById("close_app");
    el.addEventListener("click", exit, false);
}

/**
 * Exit app
 * @returns {undefined}
 */
function exit() {
    navigator.app.exitApp();
}

/**
 * Refresh page, reset coordinate
 * @returns {undefined}
 */
function clearWatch() {
    view = true;
    if (watchID != null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;        
        $(".result").remove();
        $("#error_gps").fadeOut("fast");
        $("#error").fadeOut("fast");
        $("#panelContenuto").fadeOut("fast");
        $("#container_aggiorna").fadeOut("fast");
        $("#panelContenuto2").fadeOut("fast");
        $("#panelContenuto3").fadeOut("fast");
        $("#panelContenuto4").fadeOut("fast");
        $("#panelContenuto5").fadeOut("fast");
        $("#panelContenuto6").fadeOut("fast");
        $("#panelContenuto7").fadeOut("fast");
        $("#panelContenuto8").fadeOut("fast");
        $("#panelContenuto9").fadeOut("fast");
        $("#panelContenuto10").fadeOut("fast");
        $("#panelContenutoOpec").fadeOut("fast");
        $("#panelContenutoOpec2").fadeOut("fast");
        $("#otherResult").fadeOut("fast");
        $("#loader").fadeIn("fast");
        flagViewBanner = false;
    }
    onDeviceReady();
}

/**
 * print result 
 * @param {type} data
 * @param {type} id
 * @returns {undefined}
 */
function result(data,id){
    var classToday = ""
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'-'+mm+'-'+yyyy;
    var segnala = "";
    var contatti = "";
    var vas = "";
    var descrizione = "";
    var indirizzo = "";
    var comune = "";
    var provincia = "";
    var distanza = "";
    var categorie = "";
    var orari = ""
    var cucina = ""
    var title_cucina = ""
    var servizi = "";
    var title_servizi = "";
    var locale = "";
    var title_locale = ""
    var carte = "";
    var orarioCertificato = "";
    var orario = "Orario";
    if (data.results.listing.row[id].indirizzo != undefined)
        indirizzo = data.results.listing.row[id].indirizzo
    else
        indirizzo = "";

    if (data.results.listing.row[id].comune != undefined)
        comune = data.results.listing.row[id].comune
    else
        comune = "";

    if (data.results.listing.row[id].provincia != undefined)
        provincia = "(" + data.results.listing.row[id].provincia + ")"
    else
        provincia = ""

    if ((data.results.listing.row[id].linea_aria != undefined) && (data.results.listing.row[id].linea_aria > 0))
        distanza = "<br/><b>Distanza: </b> " + data.results.listing.row[id].linea_aria + " metri"
    else
        distanza = ""

    //più contatti
    if(data.results.listing.row[id].contatti.contatto.length !== undefined){
        for (var i in data.results.listing.row[id].contatti.contatto) {
            if ((data.results.listing.row[id].contatti.contatto[i].tipo != '[object Object]') && (data.results.listing.row[id].contatti.contatto[i].tipo != undefined)) {
                if ((data.results.listing.row[id].contatti.contatto[i].tipo == "F") || (data.results.listing.row[id].contatti.contatto[i].tipo == "M") || (data.results.listing.row[id].contatti.contatto[i].tipo == "NV")) {
                    contatti += "<div class='numero'>" + data.results.listing.row[id].contatti.contatto[i].prefisso + data.results.listing.row[id].contatti.contatto[i].numero + '</div><a href="tel:' + data.results.listing.row[id].contatti.contatto[i].prefisso + data.results.listing.row[id].contatti.contatto[i].numero + '" class="chiama btn btn-sm btn-default marginL15">Chiama</a><br/><br/>'

                }
                else if (data.results.listing.row[id].contatti.contatto[i].tipo == "EMAIL") {
                    //contatti += "<div class='mail'>" + data.results.listing.row[id].contatti.contatto[i].numero + '</div><a href="mailto:' + data.results.listing.row[id].contatti.contatto[i].numero + '" class="scrivi btn btn-sm btn-info marginL15">Scrivi</a><br/><br/>'
                    contatti += "<div class='mail'><a href='mailto:" + data.results.listing.row[id].contatti.contatto[i].numero + "'>" + data.results.listing.row[id].contatti.contatto[i].numero + '</a></div><br/><br/>'
                }
                else
                    contatti += "<b>" + data.results.listing.row[id].contatti.contatto[i].tipo + "</b> " + data.results.listing.row[id].contatti.contatto[i].prefisso + data.results.listing.row[id].contatti.contatto[i].numero + "<br/><br/>"
            }
        }
    }
    //un solo contatto
    else{
        if ((data.results.listing.row[id].contatti.contatto.tipo != '[object Object]') && (data.results.listing.row[id].contatti.contatto.tipo != undefined)) {
            if ((data.results.listing.row[id].contatti.contatto.tipo == "F") || (data.results.listing.row[id].contatti.contatto.tipo == "M") || (data.results.listing.row[id].contatti.contatto.tipo == "NV")) {
                contatti += "<div class='numero'>" + data.results.listing.row[id].contatti.contatto.prefisso + data.results.listing.row[id].contatti.contatto.numero + '</div><a href="tel:' + data.results.listing.row[id].contatti.contatto.prefisso + data.results.listing.row[id].contatti.contatto.numero + '" class="chiama btn btn-sm btn-default marginL15">Chiama</a><br/><br/>'

            }
            else if (data.results.listing.row[id].contatti.contatto.tipo == "EMAIL") {
                contatti += "<div class='mail'>" + data.results.listing.row[id].contatti.contatto.numero + '</div><a href="mailto:' + data.results.listing.row[id].contatti.contatto.numero + '" class="scrivi btn btn-sm btn-default marginL15">Scrivi</a><br/><br/>'
            }
            else
                contatti += "<b>" + data.results.listing.row[id].contatti.contatto.tipo + "</b> " + data.results.listing.row[id].contatti.contatto.prefisso + data.results.listing.row[id].contatti.contatto.numero + "<br/><br/>"
        }
    }

    if ((data.results.listing.row[id].descrizione != '[object Object]') && (data.results.listing.row[id].descrizione != undefined)) {
        descrizione = "<br/><br/><b>Descrizione</b><br/>" + data.results.listing.row[id].descrizione
    }
    if ((data.results.listing.row[id].vas != '[object Object]') && (data.results.listing.row[id].vas != undefined)) {
        vas = ("<br/><br/><b>Caratteristiche</b><br/>" + data.results.listing.row[id].vas)
    }
    if ((data.results.listing.row[id].category_name != '[object Object]') && (data.results.listing.row[id].category_name != undefined)) {
        categorie = "<b>Categoria:</b> " + data.results.listing.row[id].category_name
    }
    if ((data.results.listing.row[id].oggetti.oggetto != '[object Object]') && (data.results.listing.row[id].oggetti.oggetto != undefined)) {
        var print_orari = 0
        var print_cucina = 0
        var print_servizi = 0
        var print_carte = 0
        var print_locale = 0
        for (var i in data.results.listing.row[id].oggetti.oggetto) {
            switch (data.results.listing.row[id].oggetti.oggetto[i].nome_oggetto) {
                case 'DSG':
                case 'EHO':
                case 'ERC':
                case 'IAU':
                case 'ICO':
                case 'IGA':
                case 'IOF':
                case 'RIF':
                case 'SAL':
                case 'SUT':
                case 'UFP':
                case 'VFA':
                case 'EMC':
                case 'EMC_O':
                case 'HMC':
                case 'CLI':
                case 'PAL':
                case 'PE':                    
                    //giorni
                    if ((data.results.listing.row[id].oggetti.oggetto[i].template != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].template != '[object Object]')) {
                        if(today === data.results.listing.row[id].oggetti.oggetto[i].template) classToday="today"
                        else classToday = ""
                        orari += ('<div class="tab_data '+classToday+'"><b>' + data.results.listing.row[id].oggetti.oggetto[i].template + '</b></div>')
                    }
                    //orari
                    if (data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) {
                        if (data.results.listing.row[id].oggetti.oggetto[i].testo == '[object Object]')
                            orari += ('<div class="tab_orari '+classToday+'">chiuso</div>')
                        else{
                            var str = data.results.listing.row[id].oggetti.oggetto[i].testo;
                            var newStr = str.substring(0, str.length-1); 
                             orari += '<div class="tab_orari '+classToday+'">' + newStr + '</div>'
                        }                           
                    }
                    //orario certificato
                    if(data.results.listing.row[id].oggetti.oggetto[i].catalogo == 1){
                        orarioCertificato = "* Orario comunicato direttamente dalla farmacia<br/> <u>salvo modifiche impreviste</u>";
                        orario = "Orari *";
                    }
                    print_orari++;
                    break;
                case 'CU':
                    if (title_cucina == "")
                        title_cucina = "<br/><br/><b>Cucina: </b>"
                    if ((data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].testo != '[object Object]')) {
                        cucina += ('<br/>' + data.results.listing.row[id].oggetti.oggetto[i].testo)
                    }
                    print_cucina++;
                    break;
                case 'SE':
                    if (title_servizi == "")
                        title_servizi = "<br/><br/><b>Servizi: </b>"
                    if ((data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].testo != '[object Object]')) {
                        servizi += ('<br/>' + data.results.listing.row[id].oggetti.oggetto[i].testo)
                    }
                    print_servizi++;
                    break;
                case 'CC':
                    if ((data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].testo != '[object Object]')) {
                        carte += ('<div style="float:left;margin-right:10px"><img src="gui/icons/b/' + data.results.listing.row[id].oggetti.oggetto[i].testo.toUpperCase() + '.gif"></div>')
                    }
                    print_carte++;
                    break;
                case 'LO':
                    if (title_locale == "")
                        title_locale = "<br/><br/><b>Locale: </b>"
                    if ((data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].testo != '[object Object]')) {
                        locale += ('<div class="ui-block-a">' + data.results.listing.row[id].oggetti.oggetto[i].testo + '</div>')
                    }
                    print_locale++;
                    break;
                case 'PR':
                    if ((data.results.listing.row[id].oggetti.oggetto[i].testo != undefined) && (data.results.listing.row[id].oggetti.oggetto[i].testo != '[object Object]')) {
                        if (data.results.listing.row[id].oggetti.oggetto[i].id_tipologia == 1)
                            segnala = "<br/><br/>" + (data.results.listing.row[id].oggetti.oggetto[i].testo.toLowerCase() + " <b>presente</b>");
                        else
                            segnala = "<br/><br/>" + (data.results.listing.row[id].oggetti.oggetto[i].testo.toLowerCase() + " <b>non presente</b>");
                    }
                    break;
            }
        }
    }

    $("#contenuto"+(id+1)).append('<div class="result" style="display:none">'
            + '<strong class="intestazione">' + data.results.listing.row[id].ragione_sociale.substr(0, 1).toUpperCase() + data.results.listing.row[id].ragione_sociale.substr(1).toLowerCase() + '</strong>'
            + '<div class="info_address">'
            + indirizzo.toLowerCase()
            + '<br/>' + comune.toUpperCase()
            + ' ' + provincia
            + distanza
            + '</div>'
            + '<div class="panelBtn">'
            + '<a href="geo:' + data.results.listing.row[id].latitudine + ',' + data.results.listing.row[id].longitudine + '?q=' + (indirizzo.replace(/ /g, "+")).toLowerCase() + '+' + (comune.replace(/ /g, "+")).toLowerCase() + '" class="btn btn-sm btn-success"><b>Navigatore</b></a>'
            //+ '<a href="google.streetview:cbll=' + data.results.listing.row[id].latitudine + ',' + data.results.listing.row[id].longitudine + '&cbp=1,North,,0,1.0&mz=1.0" class="btn btn-sm btn-success"><b>StreetView</b></a>'
            + '</div>'
            + '<div class="panel panel-default">'
            + '<div class="panel-heading">'
            + '<h3 class="panel-title">Contatti</h3>'
            + '</div>'
            + '<div class="panel-body">'
            + contatti
            + '</div>'
            + '</div>'
            + '<div class="panel panel-default">'
            + '<div class="panel-heading">'
            + '<h3 class="panel-title">' + orario + '</h3>'
            + '</div>'
            + '<div class="panel-body">'
            + '<span class="orarioCertificato">' + orarioCertificato + '</span>'
            + orari
            + '</div>'
            + '</div>'
            + '<div class="panel panel-default">'
            + '<div class="panel-heading">'
            + '<h3 class="panel-title">Informazioni</h3>'
            + '</div>'
            + '<div class="panel-body">'
            + categorie
            + segnala
            + descrizione
            + vas
            + title_servizi + servizi
            + title_cucina + cucina
            + title_locale + locale
            + carte
            + '</div>'
            + '</div>'
            + '<div id="market" class="alert alert-info">'
            + json[0].market
            + '</div>'
            + '</div>')
}


function replaceAll(str,find,subst){
    var re = new RegExp(find, 'g');
    str = str.replace(re, subst);
    return str;
}

/**
 * Print info opec
 * @param {type} data
 * @param {type} id
 * @returns {undefined}
 */
function resultOpec(data,id){
    
    var indirizzo = "";
    var comune = "";
    var provincia = "";
    var distanza = "";
    var categorie = "";
    var opec = ""
    var insegna = ""
    var ragSociale = "";
    var url = "";
    
    if((typeof data.listing.row.insegna !== "object")&&(data.listing.row.insegna !== "")) insegna = data.listing.row.insegna;
    if((typeof data.listing.row.ragione_sociale !== "object")&&(data.listing.row.ragione_sociale !== "")) ragSociale = data.listing.row.ragione_sociale;
    
    if((insegna != "")&&(ragSociale != "")){
        url = insegna.toLowerCase().trim() + "-" + ragSociale.toLowerCase().trim();
    }
    else url = insegna.toLowerCase().trim() + ragSociale.toLowerCase().trim();
    
       
    if (data.listing.row.codiceOPEC !== undefined) opec = data.listing.row.codiceOPEC;
    else opec = "";
    
    if (data.listing.row.indirizzo !== undefined) indirizzo = data.listing.row.indirizzo;
    else indirizzo = "";

    if (data.listing.row.comune !== undefined) comune = data.listing.row.comune;
    else comune = "";

    if (data.listing.row.provincia !== undefined) provincia = "(" + data.listing.row.provincia + ")"
    else provincia = ""

    if ((data.listing.row.linea_aria !== undefined) && (data.listing.row.linea_aria > 0)) distanza = "<br/><b>Distanza: </b> " + data.listing.row.linea_aria + " metri";
    else distanza = ""

   
    if ((data.listing.row.category_name !== '[object Object]') && (data.listing.row.category_name != undefined)) {
        categorie = "<b>Categoria:</b> " + data.listing.row.category_name;
    }
    
    url = replaceAll(url," ","_");
    url = replaceAll(url,"'","_");
    var re = new RegExp("[^0-9A-Za-z_]", "g");
    url = url.replace(re,"");
    url = replaceAll(url,"__","_");
    url = replaceAll(url,"__","_");
    url = replaceAll(url,"__","_");
    url = "http://www.892000.it/" + url + "-" + opec

    $("#contenutoOpec").append('<div class="result" style="display:none" >'
            + '<strong class="intestazione"><a href="'+url+'" class="linkExt">' + data.listing.row.ragione_sociale.substr(0, 1).toUpperCase() + data.listing.row.ragione_sociale.substr(1).toLowerCase() + '</a></strong><br/>'
            + indirizzo.toLowerCase()
            + '<br/>' + comune.toUpperCase()
            + ' ' + provincia
            + distanza
            + '<br/>' + categorie.toLowerCase()
            + '<br/><br/><a href="'+url+'" class="linkExt btn btn-xs btn-default" target="_blank" >Visita 892000</a>'
            + '</div>');
    
    $("#contenutoOpec2").append('<div class="result" style="display:none" >'
            + '<strong class="intestazione"><a href="'+url+'" class="linkExt">' + data.listing.row.ragione_sociale.substr(0, 1).toUpperCase() + data.listing.row.ragione_sociale.substr(1).toLowerCase() + '</a></strong><br/>'
            + indirizzo.toLowerCase()
            + '<br/>' + comune.toUpperCase()
            + ' ' + provincia
            + distanza
            + '<br/>' + categorie.toLowerCase()
            + '<br/><br/><a href="'+url+'" class="linkExt btn btn-xs btn-default" target="_blank" >Visita 892000</a>'
            + '</div>');
}
            
/**
 * Track GA report
 * @returns {undefined}
 */         
function trackPage(){
    //match device
    ua = navigator.userAgent.toLowerCase();
    isAndroid = navigator.userAgent.match(/(android)/i) ? true : false ;
    isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false ;
    if(isAndroid) device = "android";
    else if(isIOS) device = "ios";
    //monitor analytics
    ga_storage._setAccount('UA-18988158-1');
    ga_storage._trackPageview(device + '/farmacia-di-turno','Farmacia di turno v1.5');
}  
