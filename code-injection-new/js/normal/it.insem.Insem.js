
var site_url = 'http://areariservata.insem.it/';
var services_url = site_url + 'app/visual-kit/kit2/';

var news_list = [];
var appuntamenti_list = new Array();
var utente = new Array();

// id_utente = 0 => utente non loggato (!!!)
utente['id_utente'] = 0;

// Utility per il debug dell'applicazione: consente di effettuare il dump delle variabili
// object e di inspezionarne il contenuto
function dump(obj, parent)
{
    // Go through all the properties of the passed-in object
    for (var i in obj)
    {
        if (parent) 
            var msg = "type: [" + Object.prototype.toString.call(obj) + "]\n" + parent + "." + i + "\n" + obj[i];
        else 
            var msg = "type: [" + Object.prototype.toString.call(obj) + "]\n" + i + "\n" + obj[i];
        
        if (!confirm(msg))
            return;
        
        if (typeof obj[i] == "object")
        {
            if (parent)
                dump(obj[i], parent + "." + i);
            else 
                dump(obj[i], i);
        }
    }
}

function empty_undefined(value)
{
    if (value)
        return value;
    else
        return "";
}

function isValidEmail(email)
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(email);
}

jQuery.fn.forceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 || 
                key == 9 ||
                key == 46 ||
                key == 190 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

function utf8_decode(str_data) {
  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1>>10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}



// NEWS
function services_news(tipo, callback)
{
    // if (news_list.length === 0)
    {
        showWaitBox();
        
        var _url = services_url + "news.php";
        if (tipo == 'sito')
            _url = services_url + "news_utente.php";
        
        // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
        $.ajax({
            url: _url,
            type: 'post',
            // data: '___=' + encodeURIComponent(___) + '&____=' + encodeURIComponent(___),
            dataType: 'xml',
            error: function(e, b, errorThrown)
            {
            	alert('error');
            	alert(errorThrown);
                // DEBUG //
                console.log((e));
                console.log((b));
                console.log((errorThrown));
                
                hideWaitBox();
               
                callback('err', tipo);
            },
            success: function(data)
            {
                news_list.length = 0;
               
                var i = 20;
                
                $(data).find('notizia').each(function() {
                	if (i > 0)
                	{
	                    var id = $(this).find('id').text().replace(">", "");
	                    var _data = $(this).find('data').text();
	                    var titolo = $(this).find('titolo').text();
	                    var corpo = utf8_decode($.base64.decode($(this).find('corpo').text()));
	                    
	                    var notizia = {};
	                    notizia.id = id;
	                    notizia.data = _data;
	                    notizia.titolo = titolo;
	                    notizia.corpo = corpo;
	                    
	                    news_list.push(notizia);
	                 	
		                i = i - 1;
	                 }
	                 else
	                 	return false;
                });
                
                hideWaitBox();
                
                callback('ok', tipo);
            }
        });
        
        return false;
    };
};




// LOGIN
function services_login(username, password, callback)
{
    showWaitBox();
    
    // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
    $.ajax({
        url: services_url + "login.php",
        type: 'get',
        data: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
        dataType: 'xml',
        error: function(e, b, errorThrown)
        {
            // DEBUG //
            console.log((e));
            console.log((b));
            console.log((errorThrown));
            
            hideWaitBox();
           
            callback('err');
        },
        success: function(data)
        {
            $(data).find('agente').each(function() {
                var id_utente = $(this).find('id_utente').text().replace(">", "");
                var associato = $(this).find('associato').text();
                var livello = $(this).find('livello').text();
                var nome = $(this).find('nome').text();
                var cognome = $(this).find('cognome').text();
                var user = $(this).find('user').text();
                var mail = $(this).find('name').text();
                var token = $(this).find('token').text();
                
                utente['id_utente'] = id_utente;
                utente['associato'] = associato;
                utente['livello'] = livello;
                utente['nome'] = nome;
                utente['cognome'] = cognome;
                utente['user'] = user;
                utente['mail'] = mail;
                utente['token'] = token;
            });
            
            hideWaitBox();
           
            if (utente['id_utente'] > 0)
                callback('ok');
            else
                callback('no');
        }
    });
    
    return false;
}




// CHECK IBAN
function services_iban(iban, callback)
{
    showWaitBox();
    
    // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
    $.ajax({
        url: "http://www.ibanbic.be/IBANBIC.asmx",
        type: 'post',
        data: '\
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
               <soapenv:Header/>\
               <soapenv:Body>\
                  <tem:controleIBAN>\
                     <tem:iban>' + iban + '</tem:iban>\
                  </tem:controleIBAN>\
               </soapenv:Body>\
            </soapenv:Envelope>\
        ',
        dataType: 'xml',
        contentType: 'text/xml; charset="utf-8"',
        error: function(e, b, errorThrown)
        {
            // DEBUG //
            console.log((e));
            console.log((b));
            console.log((errorThrown));
            
            hideWaitBox();
           
            callback('err');
        },
        success: function(data)
        {
            var result = $.text(data);
           
            callback(result);
           
            hideWaitBox();
        }
    });
    
    return false;
}



// LIST APPUNTAMENTI
function services_appuntamenti(tipo_data, utente, data, callback)
{
    showWaitBox();
    
    var _data = 'associato=' + encodeURIComponent(utente['associato']) + '&livello=' + encodeURIComponent(utente['livello']);
    
    var today = new Date();
    var today_1 = moment(today).add('days', 1);
    var today_2 = moment(today).add('days', 2);
    var today_3 = moment(today).add('days', 3);
    var today_4 = moment(today).add('days', 4);
    
    var stoday = moment(today).format('YYYY-MM-DD');
    var stoday_1 = today_1.format('YYYY-MM-DD');
    var stoday_2 = today_2.format('YYYY-MM-DD');
    var stoday_3 = today_3.format('YYYY-MM-DD');
    var stoday_4 = today_4.format('YYYY-MM-DD');
    
    if (tipo_data == 'all')
        _data = _data + '&data_attuale=1&oggi=' + encodeURIComponent(stoday) + '&data4=' + encodeURIComponent(stoday_4);
    else if (tipo_data == '1')
        _data = _data + '&data_attuale=' + encodeURIComponent(stoday_1);
    else if (tipo_data == '2')
        _data = _data + '&data_attuale=' + encodeURIComponent(stoday_2);
    else if (tipo_data == '3')
        _data = _data + '&data_attuale=' + encodeURIComponent(stoday_3);
    else if (tipo_data == '4')
        _data = _data + '&data_attuale=' + encodeURIComponent(stoday_4);
    else // if (tipo_data == '0')
        _data = _data + '&data_attuale=' + encodeURIComponent(stoday);
    
    // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
    $.ajax({
        url: services_url + "appuntamenti.php",
        type: 'get',
        data: _data,
        dataType: 'xml',
        error: function(e, b, errorThrown)
        {
            // DEBUG //
            console.log((e));
            console.log((b));
            console.log((errorThrown));
            
            hideWaitBox();
           
            callback('err');
        },
        success: function(data)
        {
            appuntamenti_list = [];
            appuntamenti_list.length = 0;
           
            $(data).find('appuntamento').each(function() {
                
                var id = $(this).find('id').text();
                var ragione = $(this).find('ragione').text();
                var indirizzo = $(this).find('indirizzo').text();
                var citta = $(this).find('citta').text();
                var cap = $(this).find('cap').text();
                var latitudine = $(this).find('latitudine').text();
                var longitudine = $(this).find('longitudine').text();
                var luogo_incontro = $(this).find('luogo_incontro').text();
                var cap_incontro = $(this).find('cap_incontro').text();
                var citta_incontro = $(this).find('citta_incontro').text();
                var data = $(this).find('data').text();
                var ora = $(this).find('ora').text();
                
                var appuntamento = new Array();
                appuntamento['id'] = id;
                appuntamento['ragione'] = ragione;
                appuntamento['indirizzo'] = indirizzo;
                appuntamento['citta'] = citta;
                appuntamento['cap'] = cap;
                appuntamento['latitudine'] = latitudine;
                appuntamento['longitudine'] = longitudine;
                appuntamento['luogo_incontro'] = luogo_incontro;
                appuntamento['cap_incontro'] = cap_incontro;
                appuntamento['citta_incontro'] = citta_incontro;
                appuntamento['data'] = data;
                appuntamento['ora'] = ora;
                
                appuntamenti_list[id] = appuntamento;
            });
            
            hideWaitBox();
           
            if (utente['id_utente'] > 0)
                callback('ok');
            else
                callback('no');
        }
    });
    
    return false;
}
























    /*
    	: \xE0
    	: \xE8
    	: \xE9
    	: \xED
    	: \xF2
    	: \xF9
    */
        var counter = 3 * 60 * 60; // 3 ore in secondi
        var paused = false;
        
        var ScrollerHome = null;
        var ScrollerAzienda = null;
        var ScrollerCorporate = null;
        var ScrollerWeb = null;
        var ScrollerMobile = null;
        
        var ScrollerNewsList = null;
        var ScrollerNewsDetail = null;
        
        var ScrollerVisualKit = null;
        var ScrollerPoleposition = null;
        var ScrollerGeoposition = null;
        var ScrollerPayperclick = null;
        var ScrollerDoubleclick = null;
        var ScrollerWeb2 = null;
        var ScrollerMobile2 = null;
        var ScrollerEcommerce = null;
        var ScrollerSocialnetwork = null;
        var ScrollerAdv = null;
        
        var ScrollerModulistica1 = null;
        var ScrollerModulistica2 = null;
        /* var ScrollerModulistica3 = null;
        var ScrollerModulistica4 = null;
        var ScrollerModulistica5 = null;
        var ScrollerModulistica6 = null; */
        
        var ScrollerAppuntamenti = null;
        var ScrollerRagioneSociale = null;
        
        var ScrollerPreventivoServizi = null;
        var ScrollerPreventivoServizi2 = null;
        var ScrollerPreventivoServizi3 = null;

        var current_latitude = null;
        var current_longitude = null;
        var current_address = null;
        
        var sezione = 'pre-login';
        
        var db = null;
        
        var upload_list = [];
        
        // navigator.splashscreen.show();
        
        
        
        var gmap_name = '';
        var gmap_latitude = 0;
        var gmap_longitude = 0;
        
        
        var id_azienda = 0;
        
        
        function show_map(latitude, longitude, name)
        {
            change_page('map', 'opacity+scale');
            
        	gmap_name = name;
        	gmap_latitude = latitude;
        	gmap_longitude = longitude;
        
            setTimeout(function() {
                map_initialize(name, latitude, longitude, 'map-canvas');
            }, 500);
        }
        
        function open_gmap()
        {
            // ANDROID
        	// navigator.app.loadUrl('geo:' + gmap_latitude + ',' + gmap_longitude + '?q=' + gmap_latitude + ',' + gmap_longitude + ' (' + gmap_name + ')&z=16');
            
            // iOS
            // alert('http://maps.google.com/maps?' + gmap_latitude + ',' + gmap_longitude + '&z=16' + '&q=' + encodeURIComponent(gmap_name));
            window.open('http://maps.google.com/maps?' + 'q=' + encodeURIComponent(gmap_name) + '@' + gmap_latitude + ',' + gmap_longitude + '&z=16', '_system', 'resizable=1,fullscreen=1');
        }
        
        // GOOGLE MAPS - begin //
        var map = undefined;

        function map_initialize(name, latitude, longitude, map_id)
        {
            var mapOptions = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
                disableDoubleClickZoom: false,
                mapTypeControl: false,
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            map = new google.maps.Map(document.getElementById(map_id), mapOptions);
            var myLatLng = new google.maps.LatLng(latitude, longitude);
            
            var name = name.trim();
            var contentString =
                '<div id="content" style="z-index:9999">'+
                '<h2 class="fmap-hading">' + name + '</h2>'+
                '</div>';
            
            var marker = new google.maps.Marker({
                position: myLatLng,
                icon: "immagini/mapdot.png",
                title: name,
                map: map,
                infoContent: contentString
            });
            /*
            createInfoWindow(marker, contentString);
            
            var infoWindow = new google.maps.InfoWindow();
            
            function createInfoWindow(marker, contentString) {
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, this);
                });
            }
            */
        }
        // GOOGLE MAPS - end //
        
        
        function reset_info_clienti()
        {
        	$(".box-preventivo-top-right input[type=text]").val('');
        	$(".box-preventivo-top-right input[type=radio]").removeAttr('checked');
        	$(".box-preventivo-top-right #info-cliente-rate-0").attr('checked', 'checked');
        }
        
        function invia_info_clienti()
        {
        	if (($('#info-cliente-denominazione').val() == '') ||
        		($('#info-cliente-referente').val() == '') ||
        		($('#info-cliente-sito').val() == '') ||
        		($(".box-preventivo-top-right #info-cliente-rate-0").is(':checked')))
        	{
        		navigator.notification.alert('Tutte le informazioni del cliente devono essere valorizzate.', null, "Kit Agenti - Insem", "Ok");
        		
        		return;
        	}
        	
        	var coda = '';
        	
    		servizi_selected_list.forEach(function(value, id) {
	        	coda = coda + value.nome + ';' + value.prezzo + ';';
    		});
        	
        	services_preventivo(coda, $('#info-cliente-denominazione').val(), $('#info-cliente-referente').val(), 
        		$('#info-cliente-sito').val(), $(".box-preventivo-top-right input[type=radio]:checked").val(), invia_info_clienti_next);
        }
        
        function invia_info_clienti_next(result)
        {
        	$('#preventivo-message').html(result);
        	
			change_page('preventivo-2');
        }
        
        function select_servizio(nome_servizio)
        {
        	services_select_servizio(nome_servizio, select_servizio_next);
        }
        
        function update_servizi_selected_list()
        {
        	
        }
        
        function aggiorna_totale_servizi()
        {
        	tot_servizi_selected = 0;
        	
    		servizi_selected_list.forEach(function(value, id) {
    			tot_servizi_selected = tot_servizi_selected + parseFloat(value.prezzo);
    		});
    		
    		$('#totale-servizi-selezionati').html(accounting.formatMoney(tot_servizi_selected, {symbol: "&euro;&nbsp;"}));
        }
        
        function reset_servizi_selezionati()
        {
        	$("#preventivo-servizi3-carousel-scroller li").hide().remove();
        	
        	servizi_selected_list.splice(0, servizi_selected_list.length);
        	
    		setTimeout(function() { 
	    		aggiorna_totale_servizi();
    		}, 300);
        }
        
        function delete_servizio(id_servizio)
        {
        	servizi_selected_list.splice(id_servizio, 1);
		    
		    $("#preventivo-servizio-" + id_servizio).hide().remove();
		    
    		setTimeout(function() { 
        		ScrollerPreventivoServizi3.refresh();
    		
	    		aggiorna_totale_servizi();
    		}, 300);
        }
        
        function confirm_servizio(key_servizio)
        {
        	var id_servizio = servizi_list[key_servizio].id;
        	
        	var found = 0;
        	
    		servizi_selected_list.forEach(function(value, id) {
    			if (value.cat == servizi_list[key_servizio].cat)
	        		found = 1;
    		});
    		
    		if (found)
    			return;
        	
        	servizi_selected_list[id_servizio] = servizi_list[key_servizio];
        	
			var len = servizi_selected_list.length;
			var value = servizi_selected_list[id_servizio];
			
			// alert(servizi_list[key_servizio].id + ' - ' + servizi_selected_list[key_servizio].id); 
			
		   	$('ul#preventivo-servizi3-carousel-scroller')
		     	.append($("<li></li>")
		     		.attr("id", "preventivo-servizio-" + value.id)
		     		.append($("<button></button>")
						.attr("value", value.id)
						.attr("cat", value.cat)
						.attr("prezzo", value.prezzo)
						.attr("stato", value.stato)
						.click(function() {delete_servizio(value.id);})
						.text(value.nome))); 
			
    		setTimeout(function() { 
        		ScrollerPreventivoServizi3.refresh();
				
	    		aggiorna_totale_servizi();
    		}, 300);
        }
        
        function select_servizio_next(result)
        {
        	if (result != 'err')
        	{
        		$('ul#preventivo-servizi2-carousel-scroller').html('');
        		
				$.each(servizi_list, function(key, value) {
				     $('ul#preventivo-servizi2-carousel-scroller')
				         .append($("<li></li>").append($("<button></button>")
					         .attr("value", value.id)
					         .attr("cat", value.cat)
					         .attr("prezzo", value.prezzo)
					         .attr("stato", value.stato)
					         .attr("onclick", "confirm_servizio('" + key + "');")
					         .text(value.nome))); 
				});
        		
        		setTimeout(function() { 
	        		ScrollerPreventivoServizi2.refresh();
        		}, 300);
        	}
        	else
        		alert('err');
        }
        
        function CaricaNews(tipo)
        {
            // alert(tipo);
            services_news(tipo, CaricaNews_next);
        }
        
        
        // FORM FUNCTIONS //
        function CaricaFormInfo()
        {
        	setTimeout(function() { services_regioni(services_regioni_next);}, 0);
        	setTimeout(function() { services_tipidocumento(services_tipidocumento_next); }, 300);
        	
        	setTimeout(function() { services_tipipagamento(services_tipipagamento_next); }, 600);
        	setTimeout(function() { services_tipicontratto(services_tipicontratto_next); }, 900);
        	setTimeout(function() { services_numerovisite(services_numerovisite_next); }, 1200);
        	setTimeout(function() { services_affiancato(services_affiancato_next); }, 1500);
        	setTimeout(function() { services_omaggio(services_omaggio_next); }, 1800);
        	setTimeout(function() { services_prodotto(services_prodotto_next); }, 2100);
        	setTimeout(function() { services_acconto(services_acconto_next); }, 2400);
        	setTimeout(function() { services_tipi_acconto(carica_tipi_acconto_next); }, 2700);
        	
        	setTimeout(function() { services_tipi_dominio(carica_tipi_dominio_next); }, 3000);
        }
        
        // AZIENDA
        function services_regioni_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-azienda-regione").html('');
        		
 				$('#carica-azienda-regione')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(regioni_list, function(key, value) {
				     $('#carica-azienda-regione')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }
        
        
        function services_tipidocumento_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-azienda-tipodocumento").html('');
        		
 				$('#carica-azienda-tipodocumento')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(tipidocumento_list, function(key, value) {
				     $('#carica-azienda-tipodocumento')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }
        
        
        function carica_tipi_dominio_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-tipo-dominio").html('');
        		
 				$('#carica-contratto-tipo-dominio')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(tipi_dominio_list, function(key, value) {
				     $('#carica-contratto-tipo-dominio')
				         .append($("<option></option>")
				         .attr("value", value.id)
				         .text(value.nome));
				});
        	}
        }
        
        
        // CONTRATTO
        function services_tipipagamento_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-tipopagamento").html('');
        		
 				$('#carica-contratto-tipopagamento')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(tipipagamento_list, function(key, value) {
				     $('#carica-contratto-tipopagamento')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }

        function services_tipicontratto_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-tipocontratto").html('');
        		
 				$('#carica-contratto-tipocontratto')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(tipicontratto_list, function(key, value) {
				     $('#carica-contratto-tipocontratto')
				         .append($("<option></option>")
				         .attr("value", value.id)
				         .text(value.nome)); 
				});
        	}
        }

        function services_numerovisite_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-numerovisite").html('');
        		
 				$('#carica-contratto-numerovisite')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(numerovisite_list, function(key, value) {
				     $('#carica-contratto-numerovisite')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }

        function services_affiancato_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-affiancato").html('');
        		
 				$('#carica-contratto-affiancato')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(affiancato_list, function(key, value) {
				     $('#carica-contratto-affiancato')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }

        function services_omaggio_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-omaggio").html('');
        		
 				$('#carica-contratto-omaggio')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(omaggio_list, function(key, value) {
				     $('#carica-contratto-omaggio')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }
        

        function services_prodotto_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-prodotto").html('');
        		
 				$('#carica-contratto-prodotto')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(prodotti_list, function(key, value) {
				     $('#carica-contratto-prodotto')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }
        

        function services_acconto_next(result)
        {
        	if (result == 'ok')
        	{
        		$("#carica-contratto-acconto").html('');
        		
 				$('#carica-contratto-acconto')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(acconti_list, function(key, value) {
				     $('#carica-contratto-acconto')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
        	}
        }
        // -------------- //
        
        function CaricaNews_next(result_code, tipo)
        {
            if (result_code != 'err')
            {
                // !!!
                $('#news-list-area h2').text('NEWS ' + tipo.toUpperCase());
                
                $('ul#news-list-scroller li').remove();
                $('ul#news-detail-scroller li').remove();
                
                var i = 20;
                
                news_list.forEach(function(news, id) {
                	if (i > 0)
                	{
	                    var li = $('<li />');
	                    li.attr('id', id);
	                    li.html('<li><em>' + news.data + '</em><br /><a onclick="dettaglio_news(' + id + ')">' + news.titolo + '</a></li>');
	                    
	                    $('ul#news-list-scroller').append(li);
	                }
	                i = i - 1;
                });
        		
                setTimeout(function() {
                	ScrollerNewsDetail.refresh();
	                ScrollerNewsList.refresh();
                }, 1000);
            }
        }
        
        function dettaglio_news(id)
        {
            var notizia = news_list[String(id)];
            
            $('#news-detail-area h3').text(notizia['data']);
            $('#news-detail-area h4').text(notizia['titolo']);
            $('#news-detail-scroller-wrapper ul li').remove();
            
            var li = $('<li />').text(notizia['corpo']);
            $('#news-detail-scroller-wrapper ul').append(li);
            
            ScrollerNewsDetail.refresh();
        }
        
	    function init_scroller()
	    {
	        ScrollerHome = new iScroll('home-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
                
                onScrollMove: function() {
                	$('.top-text').hide();
                	$('.bottom-text').hide();
                	$('.title-text').hide();
                	$('.title-text').css('margin-left', '100%');
                },
                onScrollEnd: function() {
                	var len = parseInt($('#home-carousel-scroller-wrapper').css('width').replace('px', ''));
                	var pos = (0 - this.x) / len;
                	var strpos = ("0" + pos).substr(-2);
                	
                	$('.top-text.first').fadeIn('fast');
                	$('.bottom-text.first').fadeIn('fast');
                	// $('.title-text').fadeIn('fast');
                	$('.slide-' + strpos + '.title-text').show();
                	$('.slide-' + strpos + '.title-text').animate({'margin-left': '0%'}, 600);
                },
	        });
            
	        ScrollerAzienda = new iScroll('azienda-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerCorporate = new iScroll('corporate-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerWeb = new iScroll('web-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerMobile = new iScroll('mobile-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
            // vertical
	        ScrollerNewsList = new iScroll('news-list-scroller-wrapper', {
	            snap: false,
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
            
            // vertical
	        ScrollerNewsDetail = new iScroll('news-detail-scroller-wrapper', {
	            snap: false,
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
            
	        ScrollerVisualKit = new iScroll('visualkit-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerModulistica1 = new iScroll('modulistica-carousel-scroller-wrapper-listino_12', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            
	        ScrollerModulistica2 = new iScroll('modulistica-carousel-scroller-wrapper-listino_24', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            
            /*
	        ScrollerModulistica3 = new iScroll('modulistica-carousel-scroller-wrapper-promozioni', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            
	        ScrollerModulistica4 = new iScroll('modulistica-carousel-scroller-wrapper-listino_12_sa', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            
	        ScrollerModulistica5 = new iScroll('modulistica-carousel-scroller-wrapper-listino_24_sa', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            
	        ScrollerModulistica6 = new iScroll('modulistica-carousel-scroller-wrapper-promozioni_sa', {
	            snap: false,
	            momentum: true,
	            hScrollbar: true,
	            vScrollbar: true,
                hScroll: true,
                vScroll: true,
                useTransition: false,
                zoom: true,
                zoomMin: 0.2,
                zoomMax: 1,
	        });
            */
            
	        ScrollerPoleposition = new iScroll('poleposition-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerGeoposition = new iScroll('geoposition-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerPayperclick = new iScroll('payperclick-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerDoubleclick = new iScroll('doubleclick-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerWeb2 = new iScroll('web2-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerMobile2 = new iScroll('mobile2-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerEcommerce = new iScroll('ecommerce-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerSocialnetwork = new iScroll('socialnetwork-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
	        ScrollerAdv = new iScroll('adv-carousel-scroller-wrapper', {
	            snap: 'li',
	            momentum: false,
	            hScrollbar: false,
	            vScrollbar: false,
	            vScroll: false,
                useTransition: false,
	        });
            
            
            // vertical
	        ScrollerAppuntamenti = new iScroll('appuntamenti-scroller-wrapper', {
	            snap: 'li',
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
            
            
            // vertical
	        ScrollerRagioneSociale = new iScroll('ragione-sociale-scroller-wrapper', {
	            snap: 'li',
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
	        
            // vertical
	        ScrollerPreventivoServizi = new iScroll('preventivo-servizi-scroller-wrapper', {
	            snap: false,
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
	        
            // vertical
	        ScrollerPreventivoServizi2 = new iScroll('preventivo-servizi2-scroller-wrapper', {
	            snap: false,
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
	        
            // vertical
	        ScrollerPreventivoServizi3 = new iScroll('preventivo-servizi3-scroller-wrapper', {
	            snap: false,
	            momentum: true,
	            hScrollbar: false,
	            vScrollbar: false,
	            hScroll: false,
                useTransition: false,
	        });
        }
        
        var changing_page = false;
        var actual_page = 'home';
        
	    function change_page(page, animation_type)
	    {
            if (changing_page)
                return;
            
            changing_page = true;
            
	        if ($('#page-' + page)[0] == $('.page.active')[0])
	            return;
	        
	        var to_show = $('#page-' + page);
	        var to_hide = $('.page.active');
	        
	        if (animation_type == 'card back')
	        {
	            to_show.css('z-index', '99');
	            to_hide.css('z-index', '100');
	            to_show.show();
	            
	            // Freezes positions
	            window.scrollTo(0, 1);
	            window.scrollTo(0, 0);
	            // ------ //
	            
	            // to_hide.transition({ x: $(window).width() + 20 }, function()
	            // to_hide.transition({ opacity: 0, scale: 1.6 }, function()
	            // to_hide.transition({ opacity: 0 }, function()
	            to_hide.transition({ rotate: '-=90deg', x: '-=' + $(window).width() * 2 }, function()
	            {
	                to_hide.removeClass('active');
	                to_hide.hide();
	                to_hide.css('transform', 'none');
	                to_hide.css('display', 'none');
	                to_show.addClass('active');
	            });
	        }
	        else if (animation_type == 'opacity+scale')
	        {
	            to_show.css('z-index', '100');
	            to_show.css({opacity: '0', scale: '0.6'});
	
	            to_show.show();
	            
	            // Freezes positions
	            window.scrollTo(0, 1);
	            window.scrollTo(0, 0);
	            // ------ //
	            
	            to_show.transition({ opacity: 1, scale: 1.0 }, function()
	            {
	                to_hide.removeClass('active');
	                to_hide.hide();
	                to_hide.css('transform', 'none');
	                to_hide.css('display', 'none');
	                to_show.addClass('active');
	            });
	        }
	        else if (animation_type == 'opacity+scale back')
	        {
	            to_show.css('z-index', '99');
	            to_hide.css('z-index', '100');
	            to_show.show();
	            
	            // Freezes positions
	            window.scrollTo(0, 1);
	            window.scrollTo(0, 0);
	            // ------ //
	            
	            // to_hide.transition({ x: $(window).width() + 20 }, function()
	            to_hide.transition({ opacity: 0, scale: 0.6 }, function()
	            // to_hide.transition({ opacity: 0 }, function()
	            // to_hide.transition({ rotate: '+=90deg', x: '+=' + $(window).width() * 2 }, function()
	            {
	                to_hide.removeClass('active');
	                to_hide.hide();
	                to_hide.css('transform', 'none');
	                to_hide.css('display', 'none');
	                to_show.addClass('active');
	            });
	        }
	        else
	        {
	            to_show.css('z-index', '99');
	            to_hide.css('z-index', '100');
	            to_show.show();
	            
	            // Freezes positions
	            window.scrollTo(0, 1);
	            window.scrollTo(0, 0);
	            // ------ //
	            
	            // to_hide.transition({ x: $(window).width() + 20 }, function()
	            // to_hide.transition({ opacity: 0, scale: 1.6 }, function()
	            // to_hide.transition({ opacity: 0 }, function()
	            to_hide.transition({ rotate: '+=90deg', x: '+=' + $(window).width() * 2 }, function()
	            {
	                to_hide.removeClass('active');
	                to_hide.hide();
	                to_hide.css('transform', 'none');
	                to_hide.css('display', 'none');
	                to_show.addClass('active');
	            });
	        }
	        
	        actual_page = page;
            
            if (page == 'azienda')
            {
                setTimeout(function() {
                    ScrollerAzienda.refresh();
                }, 500);
            }
            
            if (page == 'corporate')
            {
                setTimeout(function() {
                    ScrollerCorporate.refresh();
                }, 500);
            }
            
            if (page == 'web')
            {
                setTimeout(function() {
                    ScrollerWeb.refresh();
                }, 500);
            }
            
            if (page == 'mobile')
            {
                setTimeout(function() {
                    ScrollerMobile.refresh();
                }, 500);
            }
            
            if (page == 'news')
            {
                if (sezione == 'pre-login')
                    $('#cerca-agenti-button').hide();
                else
                    $('#cerca-agenti-button').show();
                
                setTimeout(function() {
                    CaricaNews('sito');
                }, 500);
            }
            
            if (page == 'login')
            {
                $('#username').val('');
                $('#password').val('');
            }
            
            setTimeout(function() {
                changing_page = false;
            }, 500);
            
            if (page == 'visualkit')
            {
                setTimeout(function() {
                    ScrollerVisualKit.refresh();
                }, 500);
            }
            
            if (page == 'poleposition')
            {
                setTimeout(function() {
                    ScrollerPoleposition.refresh();
                }, 500);
            }
            
            if (page == 'geoposition')
            {
                setTimeout(function() {
                    ScrollerGeoposition.refresh();
                }, 500);
            }
            
            if (page == 'payperclick')
            {
                setTimeout(function() {
                    ScrollerPayperclick.refresh();
                }, 500);
            }
            
            if (page == 'doubleclick')
            {
                setTimeout(function() {
                    ScrollerDoubleclick.refresh();
                }, 500);
            }
            
            if (page == 'web2')
            {
                setTimeout(function() {
                    ScrollerWeb2.refresh();
                }, 500);
            }
            
            if (page == 'mobile2')
            {
                setTimeout(function() {
                    ScrollerMobile2.refresh();
                }, 500);
            }
            
            if (page == 'ecommerce')
            {
                setTimeout(function() {
                    ScrollerEcommerce.refresh();
                }, 500);
            }
            
            if (page == 'socialnetwork')
            {
                setTimeout(function() {
                    ScrollerSocialnetwork.refresh();
                }, 500);
            }
            
            if (page == 'adv')
            {
                setTimeout(function() {
                    ScrollerAdv.refresh();
                }, 500);
            }
            
            if (page == 'preventivo')
            {
                setTimeout(function() {
                    ScrollerPreventivoServizi.refresh();
                }, 500);
            }
            
            if (page == 'modulistica')
            {
                ScrollerModulistica1.zoom(0, 0, 0.2, 0);
                ScrollerModulistica2.zoom(0, 0, 0.2, 0);
                /* ScrollerModulistica3.zoom(0, 0, 0.2, 0);
                ScrollerModulistica4.zoom(0, 0, 0.2, 0);
                ScrollerModulistica5.zoom(0, 0, 0.2, 0);
                ScrollerModulistica6.zoom(0, 0, 0.2, 0); */
                
                setTimeout(function() {
                    ScrollerModulistica1.refresh();
                    /* ScrollerModulistica2.refresh();
                    ScrollerModulistica3.refresh();
                    ScrollerModulistica4.refresh();
                    ScrollerModulistica5.refresh();
                    ScrollerModulistica6.refresh(); */
                }, 500);
            }
            
            if (page == 'carica-azeinda')
            {
            	reset_page_carica_azeinda()
            }
            
            if (page == 'carica-azeinda-2')
            {
            	reset_page_carica_azeinda_2();
            }
            
            if (page == 'carica-contratto')
            {
            	reset_page_carica_contratto();
            }
            
            if (page == 'carica-contratto-2')
            {
            	reset_page_carica_contratto_2();
            }
            
            if (page == 'carica-contratto-3')
            {
            	reset_page_carica_contratto_3();
            }
            
            if (page == 'carica-contratto-4')
            {
            	reset_page_carica_contratto_4();
            }
	    }
	    
	    function reset_page_carica_azeinda()
	    {
			$('#carica-azienda-ragione-sociale').val('');
			$('#carica-azienda-codice-fiscale').val('');
			$('#carica-azienda-partita-iva').val('');
			$('#carica-azienda-regione option:first').attr('selected', 'selected');
			$('#carica-azienda-indirizzo').val('');
			$('#carica-azienda-citta').val('');
			$('#carica-azienda-cap').val('');
			$('#carica-azienda-provincia').val('');
			$('#carica-azienda-telefono').val('');
			$('#carica-azienda-fax').val('');
			$('#carica-azienda-email').val('');
			$('#carica-azienda-banca').val('');
			$('#carica-azienda-iban').val('');
	    	
			// -- //
    		$('#carica-azienda-btn-step2').hide();
    		$('#carica-azienda-btn-back').show();
    		
    		$('#carica-azienda-form input').removeAttr('disabled');
    		$('#carica-azienda-form select').removeAttr('disabled');
    		$('#carica-azienda-form button').show();
    		
    		$('#carica-azienda-form .message').hide();
	    }
	    
	    function reset_page_carica_azeinda_2()
	    {
			$('#carica-azienda-cognome').val('');
			$('#carica-azienda-nome').val('');
			$('#carica-azienda-tipodocumento option:first').attr('selected', 'selected');
			$('#carica-azienda-numero-documento').val('');
			$('#carica-azienda-luogo-di-nascita').val('');
			$('#carica-azienda-provincia-di-nascita').val('');
			$('#carica-azienda-data-di-nascita').val('');
			$('#carica-azienda-indirizzo-2').val('');
			$('#carica-azienda-citta-2').val('');
			$('#carica-azienda-provincia-2').val('');
			$('#carica-azienda-codice-fiscale-2').val('');
			
			// -- //
    		$('#carica-azienda-btn-fine').hide();
    		
    		$('#carica-azienda-2-form input').removeAttr('disabled');
    		$('#carica-azienda-2-form select').removeAttr('disabled');
    		$('#carica-azienda-2-form button').show();
    		
    		$('#carica-azienda-2-form .message').hide();
	    }
	    
	    function reset_page_carica_contratto()
	    {
			$('#carica-contratto-numero').val('');
			$('#carica-contratto-ragione-sociale-text').val('');
			$('#carica-contratto-ragione-sociale').val('');
			$('#carica-contratto-data-inizio').val('');
			$('#carica-contratto-tipopagamento option:first').attr('selected', 'selected');
			$('#carica-contratto-tipocontratto option:first').attr('selected', 'selected');
			$('#carica-contratto-numerovisite option:first').attr('selected', 'selected');
			$('#carica-contratto-affiancato option:first').attr('selected', 'selected');
			$('#carica-contratto-omaggio option:first').attr('selected', 'selected');
			$('#carica-contratto-note').val('');
	    	
			// -- //
    		$('#carica-contratto-btn-step2').hide();
    		$('#carica-contratto-btn-back').show();
    		
    		$('#carica-contratto-form input').removeAttr('disabled');
    		$('#carica-contratto-form select').removeAttr('disabled');
    		$('#carica-contratto-form button').show();
    		
    		$('#carica-contratto-form .message').hide();
	    }
	    
	    function reset_page_carica_contratto_2()
	    {
			$('#carica-contratto-prodotto option:first').attr('selected', 'selected');
			$('#carica-contratto-offerta option:first').attr('selected', 'selected');
			$('#carica-contratto-data-inizio').val('');
			$('#carica-contratto-importo').val('');
			$('#carica-contratto-rate').val('');
			$('#carica-contratto-acconto').val('');
			$('#carica-contratto-tipo-acconto option:first').attr('selected', 'selected');
			
			// -- //
    		$('#carica-contratto-2-btn-step3').hide();
    		
    		$('#carica-contratto-2-form input').removeAttr('disabled');
    		$('#carica-contratto-2-form select').removeAttr('disabled');
    		$('#carica-contratto-2-form button').show();
    		
    		$('#carica-contratto-2-form .message').hide();
    		$('#carica-contratto-btn-step3').hide();
	    }
	    
	    function reset_page_carica_contratto_3()
	    {
			$('#carica-contratto-tipo-dominio option:first').attr('selected', 'selected');
			$('#carica-contratto-nome-dominio').val('');
			$('#carica-contratto-ftp-url').val('');
			$('#carica-contratto-ftp-user').val('');
			$('#carica-contratto-ftp-password').val('');
			
			$('#carica-contratto-keywords').val('');
			$('#carica-contratto-descrizione').val('');
			
			// -- //
    		$('#carica-contratto-3-form input').removeAttr('disabled');
    		$('#carica-contratto-3-form select').removeAttr('disabled');
    		$('#carica-contratto-3-form button').show();
    		
    		$('#carica-contratto-3-form .message').hide();
    		$('#carica-contratto-btn-step4').hide();
	    }
	    
	    function reset_page_carica_contratto_4()
	    {
    		$('#carica-contratto-4-form .img-delete').hide();
    		$('#btn-carica-contratto-4-upload').removeAttr('disabled');
    		$('#btn-carica-contratto-4-invia').removeAttr('disabled');
    		
    		upload_list = [];
    		
    		$('#carica-contratto-btn-step5').hide();
	    }
	    
	    function carica_contratto_upload()
	    {
	    	if (upload_list.length == 10)
	    	{
	    		navigator.notification.alert('Non \xE8 consentito caricare pi\xF9 di 10 immagini.', null, "Kit Agenti - Insem", "Ok");
	    		return;
	    	}
	    	
	    	this.capture(Camera.PictureSourceType.CAMERA);
	    }
	    
		// capture either new or existing photo:
		function capture(sourceType)
		{
		  	navigator.camera.getPicture(this.onCaptureSuccess, this.onCaptureFail, {
			  	quality: 75,
			    destinationType: Camera.DestinationType.FILE_URI,
			    encodingType: Camera.EncodingType.JPEG,
			    saveToPhotoAlbum: false,
			    sourceType: sourceType,
			    correctOrientation: true,
				targetWidth: 2048,
				targetHeight: 2048
		  	});
		};
		

		// if photo is captured successfully, then upload to server:
		function onCaptureSuccess(imageURI) 
		{
		  	upload_list[upload_list.length] = imageURI;
		  	
		  	showWaitBox();
		  	
            setTimeout(function() {
				set_images_src();
				
                hideWaitBox();
            }, 1000);
		};
	    
        function onCaptureFail(message)
        {
	        navigator.notification.alert('Si \xE8 verificato un problema in fase di caricamento dell\'immagine: ' + 
	          	message, null, "Kit Agenti - Insem", "Ok");
        };
		
		function delete_image(id_image)
		{
			// on success... delete file
			function delete_file_entry(fileEntry) {
				fileEntry.remove();
			}
			
			var imageURI = upload_list[id_image - 1];
			
			window.resolveLocalFileSystemURI(imageURI, delete_file_entry);
			
			upload_list.splice(id_image - 1, 1);
			
            showWaitBox();
            
            setTimeout(function() {
				set_images_src();
				
                hideWaitBox();
            }, 1000);
		}
		
		
		function delete_images()
		{
			// on success... delete file
			function delete_file_entrys(fileEntry) {
				if (fileEntry)
					fileEntry.remove();
			}
			
            showWaitBox();
            
        	for (var i = 1; i <= upload_list.length; i++)
			{
				var imageURI = upload_list[i - 1];
				
				window.resolveLocalFileSystemURI(imageURI, delete_file_entrys);
			}
			
			upload_list = [];
			
            setTimeout(function() {
				set_images_src();
				
                hideWaitBox();
            }, 1000);
		}
		
		function set_images_src()
		{
			for (var i = 1; i <= 10; i ++)
			{
				if (upload_list[i - 1])
				{
				  	$('img#contratto-thumb-' + i).attr('src', upload_list[i - 1]);
				  	$('#img-delete-' + i).show();
				}
				else
				{
				  	$('img#contratto-thumb-' + i).attr('src', 'immagini/no-image.jpg');
				  	$('#img-delete-' + i).hide();
				}
			}
			
		}
		
		
		
		
        
        function populateDB(tx)
        {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id_utente INTEGER unique, associato INTEGER, livello INTEGER, ' +
            ' nome TEXT, cognome TEXT, user TEXT, name TEXT, token TEXT, counter REAL)');
        }
        
        function onErrorDBP(err)
        {
            // navigator.notification.alert('Si \xE8 verificato un problema interno.', null, "Kit Agenti - Insem", "Ok");
        }
        
        function onSuccessDBP()
        {
            // do nothing...
        }
	    
        // Store user in database
        function store_user_in_db()
        {
            function addUser(tx) {
                tx.executeSql('DELETE FROM Users');
                
                tx.executeSql('INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [utente['id_utente'], utente['associato'], utente['livello'], utente['nome'], utente['cognome'],
                    utente['user'], utente['name'], utente['token'], counter]);
            }
            
            function onErrorDBI(err) {
                // navigator.notification.alert('store_user_in_db ERR: ' + err, null, "Kit Agenti - Insem", "Ok");
            }
            
            function onSuccessDBI() {
                // navigator.notification.alert('store_user_in_db OK', null, "Kit Agenti - Insem", "Ok");
            }
            
            db.transaction(addUser, onErrorDBI, onSuccessDBI);
        }
	    
        
        // Get user from database
        function get_user_from_db()
        {
            function onErrorDBQ(err)
            {
                // navigator.notification.alert('get_user_from_db ERR: ' + err, null, "Kit Agenti - Insem", "Ok");
            }
            
            function onErrorDBget(err)
            {
                // navigator.notification.alert('get_user_from_db OK', null, "Kit Agenti - Insem", "Ok");
            }
            
            function onSuccessDBQ(tx, results)
            {
                // Caricamento dati
                var len = results.rows.length;
                
                if (!len)
                {
                    // navigator.notification.alert(String('%no.data').toLocaleString(), null, "Kit Agenti - Insem", "Ok");
                }
                else
                {
                    var i = len - 1;
                    
                    utente['id_utente'] = results.rows.item(i).id_utente;
                    utente['associato'] = results.rows.item(i).associato;
                    utente['livello'] = results.rows.item(i).livello;
                    utente['nome'] = results.rows.item(i).nome;
                    utente['cognome'] = results.rows.item(i).cognome;
                    utente['user'] = results.rows.item(i).user;
                    utente['name'] = results.rows.item(i).name;
                    utente['token'] = results.rows.item(i).token;
                    
                    counter = results.rows.item(i).counter;
                    
                    LogoutTimer();
                }
            }
            
            function getUser(tx)
            {
                tx.executeSql('SELECT * FROM Users', [], onSuccessDBQ, onErrorDBQ);
            }
            
            if (db != null)
            	db.transaction(getUser, onErrorDBget);
        }
        
        
        
        // If you want to prevent dragging, uncomment this section
        function preventBehavior(e) 
        { 
            e.preventDefault(); 
        };
        document.addEventListener("touchmove", preventBehavior, false);
        
        function onPausedApp(e)
        {
            paused = true;
        };
        document.addEventListener("pause", onPausedApp, false);
        
        function onResumedApp(e)
        { 
            get_user_from_db();
            paused = false;
        };
        document.addEventListener("resume", onResumedApp, false);
        
	    function onBodyLoad()
	    {
	        document.addEventListener("deviceready", onDeviceReady, false);
            
            // database //
            get_user_from_db();
			
			w = $(window).width();
			h = $(window).height();
	        
            // navigator.notification.alert($(window).width(), null, "Kit Agenti - Insem", "Ok");
	        // navigator.notification.alert($(window).height(), null, "Kit Agenti - Insem", "Ok");
	        
            // -- //
            $('.carousel-scroller-wrapper-inner').width(w);
	        $('.carousel-scroller-wrapper-inner').height(h);
	        
	        $('.carousel-scroller-inner').height(h);
	        $('.carousel-scroller-inner').width(w * $('.carousel-scroller-wrapper-inner li').length);
	        
	        $('.carousel-scroller-inner li').width(w);
	        $('.carousel-scroller-inner li').height(h);
            // -- //
            
            // -- //
            $('#content-news').height(h - 72);
	        $('#news-list-scroller-wrapper').height(h - 118);
	        $('#news-detail-scroller-wrapper').height(h - 138);
	        $('#appuntamenti-scroller-wrapper').height(h - 98);
	        $('#appuntamenti-scroller-wrapper').width(w / 2 - 50);
	        $('#map-canvas').height(h - 140);
            $('#content-dett_appuntamento').height(h - 72);
            // -- //
            
            $('.box-bottom').width(w);

            // -- //
	        // $('#content-login').height(h - 72);
            // -- //
            
            // -- //
	        $('#modulistica-carousel-scroller-wrapper-listino_12').height(h - 72);
	        $('#modulistica-carousel-scroller-wrapper-listino_12').width(w);
            
	        $('#modulistica-carousel-scroller-wrapper-listino_24').height(h -72);
	        $('#modulistica-carousel-scroller-wrapper-listino_24').width(w);
            
	        /* $('#modulistica-carousel-scroller-wrapper-promozioni').height(h - 72);
	        $('#modulistica-carousel-scroller-wrapper-promozioni').width(h);
            
	        $('#modulistica-carousel-scroller-wrapper-listino_12_sa').height(h - 72);
	        $('#modulistica-carousel-scroller-wrapper-listino_12_sa').width(w);
            
	        $('#modulistica-carousel-scroller-wrapper-listino_24_sa').height(h -72);
	        $('#modulistica-carousel-scroller-wrapper-listino_24_sa').width(w);
            
	        $('#modulistica-carousel-scroller-wrapper-promozioni_sa').height(h - 72);
	        $('#modulistica-carousel-scroller-wrapper-promozioni_sa').width(h); */
            // -- //
            
            $('#home-carousel-scroller-wrapper').width(w);
	        $('#home-carousel-scroller-wrapper').height(h);
            
	        $('ul#home-carousel-scroller').height(h);
	        $('ul#home-carousel-scroller').width(w * $('#home-carousel-scroller-wrapper li.scroll-li').length);
	        
	        $('ul#home-carousel-scroller li').width(w);
	        $('ul#home-carousel-scroller li').height(h);
	        
	        $('#home-footer').width(w);
            
            setTimeout(function () {
                init_scroller();
            }, 500);
            
            setTimeout(function() {
            	if (ScrollerHome != null)
                	ScrollerHome.refresh();
            }, 700);
            
            setTimeout(function() {
                CaricaFormInfo();
            }, 300);
		}
		
        
	    function onDeviceReady()
	    {
	    	// alert(navigator);
	    	// alert(navigator.notification);
            // navigator.notification.alert('debug', null, "Kit Agenti - Insem", "Ok");
            
            $("#rate-importo").forceNumericOnly();
            $("#rate-numero_rate").forceNumericOnly();
            $("#rate-acconto_perc").forceNumericOnly();
            
            // Get current position address
            navigator.geolocation.getCurrentPosition(onSuccessCP, onErrorCP, {enableHighAccuracy:true});
            
            navigator.splashscreen.hide();
            
            // Create database
            db = window.openDatabase('insem-kit', '1.0', "Insem Kit DB", 128);
            db.transaction(populateDB, onErrorDBP, onSuccessDBP);
	    }
        
        // WAITBOX - START
        var WaitBoxNumber = 0;
        
        function showWaitBox()
        {
            WaitBoxNumber = WaitBoxNumber + 1;
            localWaitBoxNumber = WaitBoxNumber;
            
            $('#overlay-wait').show();
            
            $('#main-area :input').attr('disabled', true);
            
            unbreakWaitBox(localWaitBoxNumber);
        }
        
        function unbreakWaitBox(localNumber)
        {
            setTimeout(function () {
	            if (localNumber == WaitBoxNumber)
	            {
	                hideWaitBox();
	                navigator.notification.alert(String('Errore di connessione.').toLocaleString(), null, "Kit Agenti - Insem", "Ok");
	            }
            }, 40000);
        }
        
        function hideWaitBox()
        {
            $('#main-area :input').removeAttr('disabled');
            
            $('#overlay-wait').hide();
            
            WaitBoxNumber = WaitBoxNumber + 1;
        }
        // WAITBOX - END
	    
	    var footer_home_visible = false;
	    
	    function toggle_footer_home()
	    {
	    	if (!footer_home_visible)
	    	{
	    		$('#home-footer').animate({
	    			bottom: '0px'
	    		}, 200);
	    		
	    		$('#home-buttons-arrow img').animate({
	    			rotate: '+=180deg'
	    		}, 200);
	    		
	    		footer_home_visible = true;
	    	}
	    	else // if (footer_home_visible)
	    	{
	    		$('#home-footer').animate({
	    			bottom: '-144px'
	    		}, 200);
	    		
	    		$('#home-buttons-arrow img').animate({
	    			rotate: '-=180deg'
	    		}, 200);
	    		
	    		footer_home_visible = false;
	    	}
	    }
        
        
        function login_reset()
        {
            $('#username').val('');
            $('#password').val('');
            
            $('#username').focus();
        }
        
        function login_connetti()
        {
            if (($('#username').val() == '') || ($('#password').val() == ''))
            {
                navigator.notification.alert('I campi Username e Password devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
            }
            else
            {
                services_login($('#username').val(), $('#password').val(), login_connetti_next);
            }
        }
        
        function timer_debug()
        {
            navigator.notification.alert('counter: ' + counter, null, "Kit Agenti - Insem", "Ok");
            navigator.notification.alert('actual_page: ' + actual_page, null, "Kit Agenti - Insem", "Ok");
            counter = 10;
        }
        
        function login_connetti_next(result_code)
        {
            if (result_code == 'ok')
            {
                // database //
                store_user_in_db();
                
                navigator.notification.alert('Login effettuato con successo.\nBentornato, ' + utente['nome'] + ' ' + utente['cognome'] + '.', null, "Kit Agenti - Insem", "Ok");
                
                change_page('area_agenti', 'opacity+scale');
                
                sezione = 'post-login';
                
                LogoutTimer();
            }
            else
            {
                showWaitBox();
                
                setTimeout(function() {
                    hideWaitBox();
                    navigator.notification.alert('Login errato.', null, "Kit Agenti - Insem", "Ok");
                }, 10000);
            }
        }
        
        function do_login()
        {
            if (utente['id_utente'] == 0)
            {
                sezione = 'pre-login';
                change_page('login');
            }
            else
            {
                sezione = 'post-login';
                change_page('area_agenti', 'opacity+scale');
            }
        }
        
        function logout()
        {
            utente['id_utente'] = 0;
            utente['associato'] = null;
            utente['livello'] = null;
            utente['nome'] = null;
            utente['cognome'] = null;
            utente['user'] = null;
            utente['mail'] = null;
            utente['token'] = null;
            
            if (actual_page != 'home')
	            change_page('home', 'opacity+scale back');
            
            sezione = 'pre-login';
        }
        
        
        function LogoutTimer()
        {
            // Timer che determina il logout entro 3 ore
            setInterval(function() {
                if ((!paused) && (utente['id_utente'] > 0))
                {
                    counter = counter - 1;
                    
                    if (counter % 10 == 0)
                    {
                        store_user_in_db();
                    }
                    
                    if (counter <= 0)
                    {
                        logout();
                        navigator.notification.alert('TEMPO ESAURITO\nEffettua nuovamente il login.', null, "Kit Agenti - Insem", "Ok");
                        counter = 3 * 60 * 60; // secondi
                        LogoutTimer();
                    }
                }
            }, 1000);
        }
        
        
        function visualizza_modulo(modulo)
        {
            $('#content-modulistica .scroller-wrapper').hide();
            $('#modulistica-carousel-scroller-wrapper-' + modulo).show();
            
            $('button.modulo').removeClass('active');
            $('button.modulo.' + modulo).addClass('active');
            
            setTimeout(function() {
                ScrollerModulistica1.refresh();
                ScrollerModulistica2.refresh();
                /* ScrollerModulistica3.refresh();
                ScrollerModulistica4.refresh();
                ScrollerModulistica5.refresh();
                ScrollerModulistica6.refresh(); */
            }, 500);
        }
        
        
        function send_email_contatti()
        {
            if (
                ($('#contatti-servizio').val() == "") ||
                ($('#contatti-azienda').val() == "") ||
                ($('#contatti-citta').val() == "") ||
                ($('#contatti-telefono').val() == "") ||
                ($('#contatti-settore').val() == "") ||
                ($('#contatti-referente').val() == "") ||
                ($('#contatti-email').val() == "") ||
                ($('#contatti-note').val() == "")
            )
            {
                navigator.notification.alert("Attenzione: tutti i campi devono essere valorizzati.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
        
            if (!isValidEmail($('#contatti-email').val()))
            {
                navigator.notification.alert("Attenzione: il formato dell'email \xE8 errato.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
        
            window.location.href = 'mailto:gianfranco.fedele@insem.it?subject=Kit Agenti - Richiesta preventivo&body='
                + '<p><strong>servizio</strong>: ' + $('#contatti-servizio').val() +'</p>'
                + '<p><strong>azienda</strong>: ' + $('#contatti-azienda').val() +'</p>'
                + '<p><strong>citt\xE0</strong>: ' + $('#contatti-citta').val() +'</p>'
                + '<p><strong>telefono</strong>: ' + $('#contatti-telefono').val() +'</p>'
                + '<p><strong>settore</strong>: ' + $('#contatti-settore').val() +'</p>'
                + '<p><strong>referente</strong>: ' + $('#contatti-referente').val() +'</p>'
                + '<p><strong>e-mail</strong>: ' + $('#contatti-email').val() +'</p>'
                + '<p><strong>note</strong>: ' + $('#contatti-note').val() +'</p>'
                ;
        }
        
        
        function carica_azienda()
        {
			if (($('#carica-azienda-ragione-sociale').val().length == 0) ||
				($('#carica-azienda-codice-fiscale').val().length == 0) ||
				($('#carica-azienda-partita-iva').val().length == 0) ||
				($('#carica-azienda-regione').val() == 0) ||
				($('#carica-azienda-indirizzo').val().length == 0) ||
				($('#carica-azienda-citta').val().length == 0) ||
				($('#carica-azienda-cap').val().length == 0) ||
				($('#carica-azienda-provincia').val().length == 0) ||
				($('#carica-azienda-telefono').val().length == 0) ||
				($('#carica-azienda-fax').val().length == 0) ||
				($('#carica-azienda-email').val().length == 0) ||
				($('#carica-azienda-banca').val().length == 0) ||
				($('#carica-azienda-iban').val().length == 0))
            {
                navigator.notification.alert('Per procedere tutti i campi del form devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (!isValidEmail($('#carica-azienda-email').val()))
            {
                navigator.notification.alert("L'indirizzo di email non \xE8 valido.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
        	
            setTimeout(function() {
                services_carica_azienda(
					$('#carica-azienda-ragione-sociale').val(),
					$('#carica-azienda-codice-fiscale').val(),
					$('#carica-azienda-partita-iva').val(),
					$('#carica-azienda-regione').val(),
					$('#carica-azienda-indirizzo').val(),
					$('#carica-azienda-citta').val(),
					$('#carica-azienda-cap').val(),
					$('#carica-azienda-provincia').val(),
					$('#carica-azienda-telefono').val(),
					$('#carica-azienda-fax').val(),
					$('#carica-azienda-email').val(),
					$('#carica-azienda-banca').val(),
					$('#carica-azienda-iban').val(),
                	carica_azienda_next);
            }, 500);
        }
        
        function carica_azienda_next(result_code)
        {
        	if (!isNaN(result_code))
        	{
        		$('#carica-azienda-btn-back').hide();
        		$('#carica-azienda-btn-step2').show();
        		
        		$('#carica-azienda-form input').attr('disabled', 'disabled');
        		$('#carica-azienda-form select').attr('disabled', 'disabled');
        		$('#carica-azienda-form button').hide();
        		
        		$('#carica-azienda-form .message').show();
        		
        		// CARICA L'ID AZIENDA //
        		id_azienda = result_code;
        	}
        }
        
        
        function carica_azienda_fine()
        {
        	if (id_azienda == 0)
            {
                navigator.notification.alert('Caricamento azienda interrotto. Sar\xE0 necessario ricaricare i dati dell\'azienda.', null, "Kit Agenti - Insem", "Ok");
                change_page('home', 'card back');
                return;
            }
        	
			if (($('#carica-azienda-cognome').val().length == 0) ||
				($('#carica-azienda-nome').val().length == 0) ||
				($('#carica-azienda-tipodocumento').val().length == 0) ||
				($('#carica-azienda-numero-documento').val() == 0) ||
				($('#carica-azienda-luogo-di-nascita').val().length == 0) ||
				($('#carica-azienda-provincia-di-nascita').val().length == 0) ||
				($('#carica-azienda-data-di-nascita').val().length == 0) ||
				($('#carica-azienda-indirizzo-2').val().length == 0) ||
				($('#carica-azienda-citta-2').val().length == 0) ||
				($('#carica-azienda-provincia-2').val().length == 0) ||
				($('#carica-azienda-codice-fiscale-2').val().length == 0))
            {
                navigator.notification.alert('Per procedere tutti i campi del form devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (!isValidDate($('#carica-azienda-data-di-nascita').val()))
            {
                navigator.notification.alert("La data di nascita non \xE8 valida.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
        	
            setTimeout(function() {
                services_carica_azienda_fine(
					$('#carica-azienda-cognome').val(),
					$('#carica-azienda-nome').val(),
					$('#carica-azienda-tipodocumento').val(),
					$('#carica-azienda-numero-documento').val(),
					$('#carica-azienda-luogo-di-nascita').val(),
					$('#carica-azienda-provincia-di-nascita').val(),
					$('#carica-azienda-data-di-nascita').val(),
					$('#carica-azienda-indirizzo-2').val(),
					$('#carica-azienda-citta-2').val(),
					$('#carica-azienda-provincia-2').val(),
					$('#carica-azienda-codice-fiscale-2').val(),
					id_azienda,
                	carica_azienda_fine_next);
            }, 500);
        }
        
        function carica_azienda_fine_next(result_code)
        {
        	if (result_code == 1)
        	{
        		$('#carica-azienda-btn-fine').show();
        		
        		$('#carica-azienda-2-form input').attr('disabled', 'disabled');
        		$('#carica-azienda-2-form select').attr('disabled', 'disabled');
        		$('#carica-azienda-2-form button').hide();
        		
        		$('#carica-azienda-2-form .message').show();
        		
        		id_azienda = 0;
        	}
        }
        
		
		
		function carica_offerte()
        {
        	var id_prodotto = $('#carica-contratto-prodotto').val();
        	
            services_offerta(id_prodotto, carica_offerte_next);
        }
        
        function carica_importo()
        {
        	var id_prodotto = $('#carica-contratto-prodotto').val();
        	var id_offerta = $('#carica-contratto-offerta').val();
        	
            services_offerta_costo(id_prodotto, id_offerta, carica_offerta_costo_next);
        }
        
        function carica_offerte_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Non posso caricare le offerte\nper problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'ok')
            {
        		$('#carica-contratto-offerta').html('');
        		
 				$('#carica-contratto-offerta')
			         .append($("<option></option>")
			         .attr("value", '0')
			         .text(' - seleziona - ')); 
        		
				$.each(offerte_list, function(key, value) {
				     $('#carica-contratto-offerta')
				         .append($("<option></option>")
				         .attr("value", value.id)
				         .text(value.nome)); 
				});
            }
        }
		
        
        function carica_tipi_acconto_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Non posso caricare le tipologie di acconto\nper problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'ok')
            {
        		$("#carica-contratto-tipo-acconto").html('');
        		
 				$('#carica-contratto-tipo-acconto')
			         .append($("<option></option>")
			         .attr("value", '')
			         .text(' - seleziona - '));
        		
				$.each(tipi_acconto_list, function(key, value) {
				     $('#carica-contratto-tipo-acconto')
				         .append($("<option></option>")
				         .attr("value", key)
				         .text(value.nome)); 
				});
            }
        }
		
        
        function carica_offerta_costo_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Non posso stabilire il costo dell\'offerta\nper problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'ok')
            {
        		$("#carica-contratto-importo").val(costo.importo);
        		$("#carica-contratto-rate").val(costo.rate);
            }
        }
		
		
		
		
        
        // CARICA CONTRATTO
        function carica_contratto()
        {
			if (($('#carica-contratto-numero').val().length == 0) ||
				($('#carica-contratto-ragione-sociale').val() == 0) ||
				($('#carica-contratto-data-inizio').val().length == 0) ||
				
				($('#carica-contratto-tipopagamento').val() == '') ||
				($('#carica-contratto-tipocontratto').val() == '') ||
				($('#carica-contratto-numerovisite').val() == '') ||
				($('#carica-contratto-affiancato').val() == '') ||
				($('#carica-contratto-omaggio').val() == '') ||

				($('#carica-contratto-note').val().length == 0))
            {
                navigator.notification.alert('Per procedere tutti i campi del form devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
                
                return;
            }
            
            if (!isValidDate($('#carica-contratto-data-inizio').val()))
            {
                navigator.notification.alert("La data di inizio pagamento non \xE8 valida.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (($('#carica-contratto-tipocontratto').val() == 'Da telemarketing') && ($('#carica-contratto-codice-lead').val() == ''))
            {
                navigator.notification.alert("Per i contratti provenienti da telemarketing va indicato il codice lead.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
        	
            setTimeout(function() {
                services_carica_contratto(
					$('#carica-contratto-numero').val(),
					$('#carica-contratto-ragione-sociale').val(),
					$('#carica-contratto-data-inizio').val(),
					
					$('#carica-contratto-tipopagamento option:selected').text(),
					$('#carica-contratto-tipocontratto').val(),
					$('#carica-contratto-numerovisite').val(),
					$('#carica-contratto-affiancato').val(),
					$('#carica-contratto-omaggio').val(),
					
					$('#carica-contratto-codice-lead').val(),
					$('#carica-contratto-note').val(),
                	carica_contratto_next);
            }, 500);
        }
        
        function carica_contratto_next(result_code)
        {
        	if (!isNaN(result_code))
        	{
        		$('#carica-contratto-btn-back').hide();
        		$('#carica-contratto-btn-step2').show();
        		
        		$('#carica-contratto-form input').attr('disabled', 'disabled');
        		$('#carica-contratto-form select').attr('disabled', 'disabled');
        		$('#carica-contratto-form button').hide();
        		
        		$('#carica-contratto-form .message').show();
        		
        		// CARICA L'ID contratto //
        		id_contratto = result_code;
        	}
        }
        
        
        // CARICA CONTRATTO - Step2
        function carica_contratto_2()
        {
			if (($('#carica-contratto-prodotto').val() == 0) ||
				($('#carica-contratto-offerta').val() == 0) ||
				($('#carica-contratto-importo').val() == '') ||
				($('#carica-contratto-rate').val() == '') ||
				($('#carica-contratto-acconto').val() == '') ||
				($('#carica-contratto-tipo-acconto').val() == ''))
            {
                navigator.notification.alert('Per procedere tutti i campi del form devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
                
                return;
            }
            
            if (!IsNumeric($('#carica-contratto-importo').val()))
            {
                navigator.notification.alert("L'importo non \xE8 valido.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (!IsNumeric($('#carica-contratto-rate').val()))
            {
                navigator.notification.alert("Il numero delle rate non \xE8 valido.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (!IsNumeric($('#carica-contratto-acconto').val()))
            {
                navigator.notification.alert("L'acconto non \xE8 valido.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            setTimeout(function() {
                services_carica_contratto_2(
                	id_contratto,
                	
    			    $('#carica-contratto-prodotto').val(),
    				$('#carica-contratto-offerta').val(),
    				$('#carica-contratto-importo').val(),
    				$('#carica-contratto-rate').val(),
    				$('#carica-contratto-acconto').val(),
    				$('#carica-contratto-tipo-acconto').val(),
    				
                	carica_contratto_2_next);
            }, 500);
        }
        
        function carica_contratto_2_next(result_code)
        {
        	if (result_code != 'err')
        	{
        		navigator.notification.confirm('Vuoi procedere col caricamento di un altro prodotto?', carica_contratto_2_next_confirm, 'Caricamento effettuato.', 'S\xEC,No');
        	}
        	else
        	{
        		navigator.notification.confirm('Si \xE8 verificato un problema interno.', null, "Kit Agenti - Insem", "Ok");
        	}
        }
        
        function carica_contratto_2_next_confirm(button)
        {
        	if (button == '2') // "No"
        	{
	    		$('#carica-contratto-2-btn-step3').show();
	    		
	    		$('#carica-contratto-2-form input').attr('disabled', 'disabled');
	    		$('#carica-contratto-2-form select').attr('disabled', 'disabled');
	    		$('#carica-contratto-2-form button').hide();
	    		
	    		$('#carica-contratto-2-form .message').show();
	    		$('#carica-contratto-btn-step3').show();
    		}
    		else // if (button == '1') // "S\xEC"
    		{
    			reset_page_carica_contratto_2();
    		}
        }
        
        
        
        // CARICA CONTRATTO - Step3
        function carica_contratto_3()
        {
			if (($('#carica-contratto-tipo-dominio').val() == 0) ||
				($('#carica-contratto-nome-dominio').val() == 0) ||
				($('#carica-contratto-ftp-url').val() == '') ||
				($('#carica-contratto-ftp-user').val() == '') ||
				($('#carica-contratto-ftp-password').val() == '') ||
				($('#carica-contratto-keywords').val() == '') ||
				($('#carica-contratto-descrizione').val() == ''))
            {
                navigator.notification.alert('Per procedere tutti i campi del form devono essere valorizzati.', null, "Kit Agenti - Insem", "Ok");
                
                return;
            }
            
            setTimeout(function() {
                services_carica_contratto_3(
                	id_contratto,
                	
    			    $('#carica-contratto-tipo-dominio').val(),
    				$('#carica-contratto-nome-dominio').val(),
    				$('#carica-contratto-ftp-url').val(),
    				$('#carica-contratto-ftp-user').val(),
    				$('#carica-contratto-ftp-password').val(),
    				$('#carica-contratto-keywords').val(),
    				$('#carica-contratto-descrizione').val(),
    				
                	carica_contratto_3_next);
            }, 500);
        }
        
        
        function carica_contratto_3_next(result_code)
        {
        	if (result_code != 'err')
        	{
        		navigator.notification.confirm('Vuoi procedere col caricamento di un altro dominio?', carica_contratto_3_next_confirm, 'Caricamento effettuato.', 'S\xEC,No');
        	}
        	else
        	{
        		navigator.notification.alert('Si \xE8 verificato un problema interno.', null, "Kit Agenti - Insem", "Ok");
        	}
        }
        
        
        function carica_contratto_3_next_confirm(button)
        {
        	if (button == '2') // "No"
        	{
	    		$('#carica-contratto-3-form input').attr('disabled', 'disabled');
	    		$('#carica-contratto-3-form select').attr('disabled', 'disabled');
	    		$('#carica-contratto-3-form button').hide();
	    		
	    		$('#carica-contratto-3-form .message').show();
	    		$('#carica-contratto-btn-step4').show();
    		}
    		else // if (button == '1') // "S\xEC"
    		{
    			reset_page_carica_contratto_3();
    		}
        }
        
        
        // CARICA CONTRATTO - Step4
        function carica_contratto_4()
        {
        	if (upload_list.length < 3)
        	{
        		navigator.notification.alert('Le immagini da inviare devono essere almeno 3.', null, "Kit Agenti - Insem", "Ok");
        		
        		return;
        	}
        	
        	navigator.notification.confirm('Confermi l\'invio delle immagini?', carica_contratto_4_confirm, 'Conferma invio immagini.', 'S\xEC,No');
        }
        
        
        // CARICA CONTRATTO - Step5
        function carica_contratto_5()
        {
            services_carica_contratto_5(
            	id_contratto,
			    upload_list.length,
				
            	carica_contratto_5_next);
        }
        
        function carica_contratto_5_next(result_code)
        {
        	if (result_code != 'OK')
        	{
        		navigator.notification.alert('Si \xE8 verificato un problema interno durante il caricamento delle immagini.', "Kit Agenti - Insem", "Ok");
        		
        		return;
        	}
        	
        	delete_images();

    		change_page('carica-contratto-5');
        		
    		$('#carica-contratto-4-form .img-delete').hide();
    		$('#btn-carica-contratto-4-upload').show();
    		$('#btn-carica-contratto-4-invia').show();
			
			$('#carica-contratto-btn-step5').hide();
			$('#content-carica-contratto-4 .message').hide();
		}
		        
        
        function carica_contratto_4_confirm(button)
        {
        	if (button == '1') // "S"
        	{
        		var ft, params;
        		
			  	// callback if the photo fails to upload successfully.
			  	function onUploadFail(error) {
			  	  	navigator.notification.alert('Si \xE8 verificato un problema interno durante il caricamento di una delle immagini.', "Kit Agenti - Insem", "Ok");
			  	};
			    
			    ft = new FileTransfer();
			    
        		for (var i = 1; i <= upload_list.length; i ++)
        		{
        			if (upload_list[i - 1])
        			{
        				var imageURI = upload_list[i - 1];
        				
					  	var options = new FileUploadOptions();
					  	var idx = (i - 1);
					  	
					  	// parameter name of file:
					  	options.fileKey = "userfile";
					  	
					  	// name of the file:
					  	// options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
					  	options.fileName = id_contratto + '_' + idx + '_.jpg';
					  	
					  	// mime type:
					  	options.mimeType = "image/jpeg";
		        		
					    /* params = {val1: "some value", val2: "some other value"}; options.params = params; */
					    
				    	ft.upload(imageURI, services_url + 'form/step4.php?id_contratto=' + 
				    		id_contratto + '&indice=' + idx, null, onUploadFail, options);
				    }
        		}
        		
	    		$('#carica-contratto-4-form .img-delete').hide();
	    		$('#btn-carica-contratto-4-upload').hide();
	    		$('#btn-carica-contratto-4-invia').hide();
				
				$('#carica-contratto-btn-step5').show();
				$('#content-carica-contratto-4 .message').show();
			}
		}
        
        
        
        
        function cerca_ragione_sociale()
        {
            if ($('#carica-ragione-sociale').val() != '')
            {
                if ($('#carica-ragione-sociale').val().length < 3)
                {
                    navigator.notification.alert('Il testo per la ricerca deve contenere almeno 3 caratteri.', null, "Kit Agenti - Insem", "Ok");
                    return;
                }
				                
                setTimeout(function() {
                    services_cerca_ragione_sociale($('#carica-ragione-sociale').val(), cerca_ragione_sociale_next);
                }, 500);
            }
        }
        
        function cerca_ragione_sociale_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Sto verificando problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'ok')
            {
            	$('#lista-ragione-sociale').html('');
            	
                // POPOLA LISTA
                ragione_sociale_list.forEach(function(ragione) {
                	var id = ragione['id'];
                	
                	if (ragione['id'].substr(ragione['id'].length - 1, ragione['id'].length) == '>')
                		id = ragione['id'].substr(0, ragione['id'].length - 1);
                	
                	var nome = ragione['nome'];
                	
                	var temp = $('<li class="list-element"><button class="add-inline" style="float:right" onclick="select_ragione_sociale(\'' + nome + '\', \'' + id + '\');">&nbsp;</button> ' + ragione['nome'] + '</li>');
                    $('#lista-ragione-sociale').append(temp);
				});
                
                return;
            }
        }
        
        function select_ragione_sociale(nome, id)
        {
        	$('#carica-ragione-sociale').val(nome);
        	
        	$('#carica-contratto-ragione-sociale-text').val(nome);
        	$('#carica-contratto-ragione-sociale').val(id);
        	
        	// $('#carica-contratto-data-inizio').focus();
        	$('#overlay-ragione-sociale').hide();
        	$('#overlay-white-bkg').hide();
        }

        
        
        
        function verifica_iban()
        {
            // services_iban('IT91P0895139100000000348466', '');
            if ($('#iban-iban').val() != '')
            {
                if (($('#iban-iban').val().length > 0) && ($('#iban-iban').val().length < 27))
                {
                    navigator.notification.alert('L\'IBAN contiente un numero di caratteri errato.', null, "Kit Agenti - Insem", "Ok");
                    return;
                }
                
                $('#iban-paese').val($('#iban-iban').val().substr(0, 2));
                $('#iban-contr').val($('#iban-iban').val().substr(2, 2));
                $('#iban-cin').val($('#iban-iban').val().substr(4, 1));
                $('#iban-abi').val($('#iban-iban').val().substr(5, 5));
                $('#iban-cab').val($('#iban-iban').val().substr(10, 5));
                $('#iban-cc').val($('#iban-iban').val().substr(15, 12));
                
                setTimeout(function() {
                    services_iban($('#iban-iban').val(), verifica_iban_next);
                }, 500);
            }
        }
        
        function verifica_iban_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Non posso verificare l\'IBAN\nper problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'true')
            {
                navigator.notification.alert('Il codice IBAN \xE8 corretto.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
        }
        
        
        function calcola_rate()
        {
            if (
                ($('#rate-importo').val() == "") ||
                ($('#rate-numero_rate').val() == "")
            )
            {
                navigator.notification.alert("Attenzione: importo e numero rate devono essere valorizzati.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
			if (
                (isNaN($('#rate-importo').val())) ||
                (isNaN($('#rate-numero_rate').val())) ||
                (isNaN($('#rate-acconto_perc').val()))
            )
            {
                navigator.notification.alert("Attenzione: tutti i campi sono numerici.", null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            showWaitBox();
            
            var anticipo_calc = 0;
            var rata_calc = 0;
            
            var importo = $('#rate-importo').val();
            var numero_rate = $('#rate-numero_rate').val();
            
            var acconto_perc = 0;
            if ($('#rate-numero_rate').val() != "")
                acconto_perc = $('#rate-acconto_perc').val();
            
            if (!$('#rate-partner').is(':checked'))
            {
                anticipo_calc = (importo / 100) * acconto_perc;
                rata_calc = (importo - anticipo_calc) / numero_rate;
            }
            else
            {
                anticipo_calc = (importo / 100) * acconto_perc;
                rata_calc = ((importo - anticipo_calc) / numero_rate) * 1.22;
                
                decimal_rata_calc = (rata_calc - Math.floor(rata_calc));
                
                rata_calc = Math.floor(rata_calc);
                
                if (decimal_rata_calc <= 0.5)
                    rata_calc = Math.floor(rata_calc) + 0.5;
                else
                    rata_calc = Math.floor(rata_calc) + 1;
                
                rata_calc = rata_calc / 1.22;
            }
            
            $('#rate-acconto-calc .val').html(accounting.formatMoney(anticipo_calc, {symbol: "&euro;&nbsp;"}));
            $('#rate-rata-calc .val').html(accounting.formatMoney(rata_calc, {symbol: "&euro;&nbsp;"}));
            
            setTimeout(function() {
                hideWaitBox();
            }, 1200);
        }
        
        
        function visualizza_appuntamento(id)
        {
            $('#dett_appuntamento-ragione').text(appuntamenti_list[id].ragione);
            $('#dett_appuntamento-indirizzo').text(appuntamenti_list[id].indirizzo);
            $('#dett_appuntamento-citta').text(appuntamenti_list[id].cap + ' - ' + appuntamenti_list[id].citta);
            
            $('#dett_appuntamento-luogo_incontro').text(appuntamenti_list[id].luogo_incontro);
            $('#dett_appuntamento-cap_incontro').text(appuntamenti_list[id].cap_incontro);
            $('#dett_appuntamento-citta_incontro').text(appuntamenti_list[id].citta_incontro);
            
            $('#dett_appuntamento-data').text('data: ' + appuntamenti_list[id].data);
            $('#dett_appuntamento-ora').text('ora: ' + appuntamenti_list[id].ora);
            
            change_page('dett_appuntamento');
        }
        
        function mappa_appuntamento(id)
        {
            codeAddress(appuntamenti_list[id].indirizzo + ', ' + appuntamenti_list[id].citta + ', ' + appuntamenti_list[id].cap, appuntamenti_list[id].ragione, mappa_appuntamento_next);
        }
        
        function mappa_appuntamento_next(result_code, ragione)
        {
            show_map(result_code.jb, result_code.kb, ragione);
        }
        
        
        
        function carica_appuntamenti(data_diff)
        {
            var today = new Date();
            var data = moment(today).add('days', data_diff).format('YYYY-MM-DD');
            
            services_appuntamenti(data_diff, utente, data, carica_appuntamenti_next);
        }
        
        function carica_appuntamenti_next(result_code)
        {
            if (result_code == 'err')
            {
                navigator.notification.alert('Non posso caricare gli appuntamenti\nper problemi di connessione.', null, "Kit Agenti - Insem", "Ok");
                return;
            }
            
            if (result_code == 'ok')
            {
                $('ul#lista-appuntamenti').html('');
                
                appuntamenti_list.forEach(function(appuntamento) {
                    var li = $('<li />');
                    li.attr('id', appuntamento['id']);
                    li.html('<li><em>' + appuntamento['data'] + ' - ' + appuntamento['ora'] + '</em><br />' + appuntamento['ragione'] +
                        '<br /><button onclick="visualizza_appuntamento(' + appuntamento['id'] +
                        ')">dettaglio</button>&nbsp;&nbsp;&nbsp;<button onclick="mappa_appuntamento(' + appuntamento['id'] +
                        ')">mappa</button></li>');
                    
                    $('ul#lista-appuntamenti').append(li);
                    
                    ScrollerAppuntamenti.refresh();
                });
                
                
            }
        }
        
        // RICALCOLA LA POSIZIONE ATTUALE
        function reset_current_location()
        {
            // Get current position address
            navigator.geolocation.getCurrentPosition(onSuccessCP, onErrorCP);
        }
        
        
        // GEOCODER: determina l'indirizzo sulla base di lat e lang
        function codeLatLng(lat, lng)
        {
            var latlng = new google.maps.LatLng(lat, lng);
            var geocoder = new google.maps.Geocoder();
            
            geocoder.geocode({'latLng': latlng}, function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    if (results[0])
                    {
                        current_address = results[0].formatted_address;
                    }
                }
                else
                {
                    navigator.notification.alert('Problemi di connessione con Google. Codice dell\'errore: ' + status, null, "Kit Agenti - Insem", "Ok");
                }
            });
        }

        // GEOCODER: determina lat e lang sulla base dell'indirizzo
        function codeAddress(address, ragione, callback)
        {
            var geocoder = new google.maps.Geocoder();
            var _latlng = null;
            
            geocoder.geocode({'address': address}, function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    if (results[0])
                    {
                        _latlng = results[0].geometry.location;
                    }
                    else
                        _latlng = null;
                }
                else
                {
                    navigator.notification.alert('Problemi di connessione con Google. Codice dell\'errore: ' + status, null, "Kit Agenti - Insem", "Ok");
                    _latlng = null;
                }
                
                callback(_latlng, ragione);
            });
        }

        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        var onSuccessCP = function(position)
        {
            current_latitude = position.coords.latitude;
            current_longitude = position.coords.longitude;
        };

        // onError Callback receives a PositionError object
        //
        function onErrorCP(error)
        {
            navigator.notification.alert('code: '    + error.code    + '\n' +
            	'message: ' + error.message + '\n', null, "Kit Agenti - Insem", "Ok");
        }
        
        
        
        /* function home_slide_next_text(element)
        {
        	if (element.find('.top-text.first').is(':visible') && (element.find('.top-text.last').length))
        	{
        		element.find('.top-text.first').fadeOut(200, function() {
        			element.find('.top-text.last').fadeIn();
        		});
        	}
        	else
        	{
        		element.find('.top-text.last').fadeOut(200, function() {
        			element.find('.top-text.first').fadeIn();
        		});
        	}
        	
        	if (element.find('.bottom-text.first').is(':visible') && (element.find('.bottom-text.last').length))
        	{
        		element.find('.bottom-text.first').fadeOut(200, function() {
        			element.find('.bottom-text.last').fadeIn();
        		});
        	}
        	else
        	{
        		element.find('.bottom-text.last').fadeOut(200, function() {
        			element.find('.bottom-text.first').fadeIn();
        		});
        	}
        } */
        
        

    

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

