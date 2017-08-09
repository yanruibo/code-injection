






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        













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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


var arr_obj_callback_mapAll = new Array();

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
	switch(id){
	    case "deviceready":
		$.mobile.defaultPageTransition = "none";
		$.mobile.defaultDialogTransition = "none";
		
		
		// DB
		var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
		db.transaction(app.createDB, app.errorCB, app.successCB);
		
		// Multilingua		
		 /*
		 $(".multilanguage").each(function(){
		     var id = $(this).attr("id");
		     window.plugins.localizable.get(id);		     
		 });
		 */
		    navigator.globalization.getLocaleName(
		      function (locale) {
			var lan = locale.value.substr(0,2);
			switch(lan){
			    case "it":
				$("#lang-lista").val("ita");
				for (var lab in localizable_ita) {  
				    $("#"+lab).html(localizable_ita[lab]);
				} 				
				break;
			    case "fr":
				$("#lang-lista").val("fra");
				for (var lab in localizable_fra) {  
				    $("#"+lab).html(localizable_fra[lab]);
				} 				
				break;
			    case "de":
				$("#lang-lista").val("deu");
				for (var lab in localizable_deu) {  
				    $("#"+lab).html(localizable_deu[lab]);
				} 								
				break;
			    default:
				$("#lang-lista").val("eng");
				for (var lab in localizable_eng) {  
				    $("#"+lab).html(localizable_eng[lab]);
				} 								
				break;			    
			}
			cur_lang = $("#lang-lista").val();
			
			$(".indietro").html(labellang[cur_lang].indietro);			
		      },
		      function () {
		      
		      }
		    );		
		break;
	}
    },
    
    htmlentities: function (string, quote_style, charset, double_encode) {
    
      var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
	symbol = '';
      string = string == null ? '' : string + '';
    
      if (!hash_map) {
	return false;
      }
    
      if (quote_style && quote_style === 'ENT_QUOTES') {
	hash_map["'"] = '&#039;';
      }
    
      if (!!double_encode || double_encode == null) {
	for (symbol in hash_map) {
	  if (hash_map.hasOwnProperty(symbol)) {
	    string = string.split(symbol).join(hash_map[symbol]);
	  }
	}
      } else {
	string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
	  for (symbol in hash_map) {
	    if (hash_map.hasOwnProperty(symbol)) {
	      text = text.split(symbol).join(hash_map[symbol]);
	    }
	  }
    
	  return text + entity;
	});
      }
    
      return string;
    },    
    
    createDB: function(tx){            
	tx.executeSql('CREATE TABLE IF NOT EXISTS ALEXALA_PREFERITI_RISORSE (id unique, foto, nome, ambito, categoria, localita, indirizzo, telefono, ok_telefono, n_stelle, prezzo_min, prezzo_max, numero, difficolta, lunghezza_km, tempo_percorrenza, dislivello_in_metri, tipologia_bicicletta, latlng, email, web, data_inserimento)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ALEXALA_PREFERITI_EVENTI (id unique, foto, nome, descrizione, evento_tipo, localita, indirizzo, telefono, ok_telefono, date_gruppi, evento_info, latlng, email, web, data_inserimento)');
	var db_exists = window.localStorage.getItem("alexala_db_exists");
	if (!db_exists){
	    window.localStorage.setItem("alexala_db_exists", true);
	}	
    },
    
    errorCB:function(err) {
        alert("Error processing SQL: "+err.message);
    },
    
    successCB: function() {
        //alert("success!");
    },
    
    loadFavorites: function(cgPage){	
	if (cgPage){
	    showLoading();
	}
	var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	db.transaction(function(tx){
	    var pageToShow="preferitiRisorse";
	    var query = "SELECT * FROM ALEXALA_PREFERITI_RISORSE ORDER BY ambito, nome";	    
	    tx.executeSql(query,[],function(tx, results){		
		var html = "";
		if (results.rows.length > 0){		    
		    var $db = "";
		    var ambito = "";
		    for (var i=0; i<results.rows.length; i++){
			$db = results.rows.item(i);						
			if (ambito != $db.ambito){
			    html += '<li data-role="list-divider">'+$db.ambito+'</li>';
			    ambito = $db.ambito;
			}
			html += '<li>';
			html += '<a href="#" onclick="app.loadSchedaOffline(\''+$db.id+'\',\'ALEXALA_PREFERITI_RISORSE\'); return false;">';					
			html += '<img src="'+$db.foto+'" />';
			html += '<h3>'+$db.nome+'</h3>';
			html += '<p><strong>'+$db.categoria+'</strong></p>';
			html += '<p>'+$db.localita+'</p>';					
			html += '</a>';
			html += '</li>';			
		    }		    
		}else{
		    html = "<li>"+labellang[cur_lang].nessuna_risorsa+"</li>";
		}

		var toRefresh = 1*$("#listview_preferiti_risorse_initialized").val();		    
		$("#resultsPreferitiRisorse").html(html);		
		if (toRefresh){
		    $("#resultsPreferitiRisorse").listview("refresh");    
		} 		    		
			
		query = "SELECT * FROM ALEXALA_PREFERITI_EVENTI ORDER BY data_inserimento DESC";	    
		tx.executeSql(query,[],function(tx, results){		
		    html = "";
		    if (results.rows.length > 0){			
			var $db = "";			
			for (var i=0; i<results.rows.length; i++){
			    $db = results.rows.item(i);						
			    html += '<li>';
			    html += '<a href="#" onclick="app.loadSchedaOffline(\''+$db.id+'\',\'ALEXALA_PREFERITI_EVENTI\'); return false;">';					
			    html += '<img src="'+$db.foto+'" />';
			    html += '<h3>'+$db.nome+'</h3>';
			    html += '<p><strong>'+$db.evento_tipo+'</strong></p>';
			    html += '<p>'+$db.localita+'</p>';
			    html += '<p>'+$db.date_gruppi+'</p>';					
			    html += '</a>';
			    html += '</li>';			
			}						
			pageToShow = "preferitiEventi";			
		    }else{
			html = "<li>"+labellang[cur_lang].nessun_evento+"</li>";
		    }
		    toRefresh = 1*$("#listview_preferiti_eventi_initialized").val();		    
		    $("#resultsPreferitiEventi").html(html);
		    if (toRefresh){
			$("#resultsPreferitiEventi").listview("refresh");    
		    } 		    
		    if (cgPage){
			$.mobile.changePage("#"+pageToShow);                                              
			$.mobile.loading( 'hide' );
		    }
		    return false;
		});		
		return false;		
	    });
	}, app.errorCB);			
    },

    loadSchedaOffline:function(id_entita, table){
	var online = checkConnectionState();	
	if (online){	    
	    switch(table){
		case "ALEXALA_PREFERITI_RISORSE":
		    loadSchedaFromFavorites(id_entita);
		    break;
		case "ALEXALA_PREFERITI_EVENTI":
		    loadSchedaEventoFromFavorites(id_entita);
		    break;
	    }	    
	}else{
	    var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	    db.transaction(function(tx){	    
		var query = "SELECT * FROM "+table+" WHERE id = '"+id_entita+"'";	    
		showLoading();
		tx.executeSql(query,[],function(tx, results){		
		    if (results.rows.length > 0){
			var html = "";
			var $db = results.rows.item(0);
			switch(table){
			    case "ALEXALA_PREFERITI_EVENTI":
				html += '<div data-role="page" class="pageView eventoSchedaPreferiti" id="schedaEntita_'+id_entita+'">';
				html += '<div data-role="header" data-id="myheader" data-theme="a" data-position="fixed">';
				html += '<a href="#preferitiEventi" class="indietro custom-button left-arrow" data-icon="custom" data-corners="false" data-role="button" data-inline="true">'+labellang[cur_lang].indietro+'</a>';
				html += '<h1>Alexala</h1>';
				html += '<div class="right-buttons">';
				html += '<a href="#home" class="custom-button home-button" data-icon="custom" data-iconpos="notext" data-corners="false" data-role="button" data-inline="true" >Menu</a>';
				html += '</div>';
				html += '</div>';
				html += '<div data-role="content" data-theme="c" id="contentSchedaEntita">';
				if ($db.foto){
				    html += '<div class="content-picture" style="position: relative;"><img src="'+$db.foto+'" /></div>';
				}
				if ($db.nome){
				    html += '<h4 class="centered">'+$db.nome+'</h4>';
				}
				if ($db.descrizione){
				    html += '<ul data-role="listview" class="details" data-inset="true">';
				    html += '<li><p><br />'+$db.descrizione+'</p></li>';
				    html += '</ul>';
				}
				html += '<ul data-role="listview" class="details" data-inset="true">';
				if ($db.evento_tipo){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].tipologia_evento+'</h3>';
				    html += '<p>'+$db.evento_tipo+'</p>';
				    html += '</li>';
				}
				if ($db.indirizzo){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].indirizzo+'</h3>';
				    html += '<p>'+$db.indirizzo+'</p>';
				    html += '</li>';
				}
				if ($db.telefono && !$db.ok_telefono){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].telefono+'</h3>';
				    html += '<p>'+$db.telefono+'</p>';
				    html += '</li>';
				}
				if ($db.date_gruppi){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].date_evento+'</h3>';
				    html += '<p>'+$db.date_gruppi+'</p>';
				    html += '</li>';
				}
				if ($db.evento_info){
				    html += '<li>';
				    html += '<h3>Info</h3>';
				    html += '<p>'+$db.evento_info+'</p>';
				    html += '</li>';
				}
				html += '</ul>';
				
				html += '<ul data-role="listview" data-inset="true">';
				if ($db.ok_telefono){
				    html += '<li><a href="tel:'+$db.telefono+'"><img src="img/phone.png" alt="Chiama" class="ui-li-icon" />'+labellang[cur_lang].chiama+'</a></li>';
				    html += '<li>';
				    if ($db.nome){
					html += '<input type="hidden" class="nome" value="'+addslashes(stripslashes($db.nome))+'" />';
				    }
				    if ($db.telefono){
					html += '<input type="hidden" class="telefono" value="'+$db.telefono+'" />';
				    }
				    if ($db.indirizzo){
					html += '<input type="hidden" class="indirizzo" value="'+addslashes(stripslashes($db.indirizzo))+'" />';
				    }
				    if ($db.foto){
					html += '<input type="hidden" class="foto" value="'+$db.foto+'" />';
				    }
				    html += '<a href="#" onclick="addToContact(this);"><img src="img/icon-contact.png" alt="Aggiungi a Rubrica" class="ui-li-icon" />'+labellang[cur_lang].aggiungi_a_rubrica+'</a>';
				    html += '</li>';
				}
				html += '</ul>';

				html += '<ul data-role="listview" data-inset="true" class="addToFavorites" style="display: none;">';
				html += '<li data-theme="e"><a href="#" onclick="app.addToFavorites(\''+$db.id+'\');"><img src="img/star_up.png" alt="'+labellang[cur_lang].aggiungi_ai_preferiti+'" class="ui-li-icon" />'+labellang[cur_lang].aggiungi_ai_preferiti+'</a></li>';
				html += '</ul>';
				html += '<ul data-role="listview" data-inset="true" class="removeFromFavorites" style="display: block;">';
			        html += '<li data-theme="e"><a href="#" onclick="app.removeFromFavorites(\''+$db.id+'\');"><img src="img/star_down.png" alt="'+labellang[cur_lang].rimuovi_dai_preferiti+'" class="ui-li-icon" />'+labellang[cur_lang].rimuovi_dai_preferiti+'</a></li>';
				html += '</ul>';
				
				html += '<div id="campi_preferito_'+$db.id+'">';
				html += '<input type="hidden" class="tipo_preferito" value="ALEXALA_PREFERITI_EVENTI" />';
				html += '<input type="hidden" class="campo_preferito" name="id" value="'+$db.id+'" />';
				html += '<input type="hidden" class="campo_preferito" name="foto" value="'+$db.foto+'" />';
				html += '<input type="hidden" class="campo_preferito" name="nome" value="'+htmlspecialchars($db.nome, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="descrizione" value="'+htmlspecialchars($db.descrizione, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="evento_tipo" value="'+htmlspecialchars($db.evento_tipo, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="localita" value="'+htmlspecialchars($db.nome, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="indirizzo" value="'+htmlspecialchars($db.indirizzo, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="telefono" value="'+htmlspecialchars($db.telefono, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="ok_telefono" value="'+$db.ok_telefono+'" />';
				html += '<input type="hidden" class="campo_preferito" name="date_gruppi" value="'+htmlspecialchars($db.date_gruppi, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="evento_info" value="'+htmlspecialchars($db.evento_info, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="latlng" value="'+htmlspecialchars($db.latlng, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="email" value="'+htmlspecialchars($db.email, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="web" value="'+htmlspecialchars($db.web, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="data_inserimento" value="'+time()+'" />';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				
				$("body").append(html);
				$.mobile.changePage("#schedaEntita_"+id_entita);                                              
				$.mobile.loading( 'hide' );		    				
				break;
			    case "ALEXALA_PREFERITI_RISORSE":
				html += '<div data-role="page" class="pageView risorsaSchedaPreferiti" id="schedaEntita_'+id_entita+'">';
				html += '<div data-role="header" data-id="myheader" data-theme="a" data-position="fixed">';
				html += '<a href="#preferitiRisorse" class="indietro custom-button left-arrow" data-icon="custom" data-corners="false" data-role="button" data-inline="true">'+labellang[cur_lang].indietro+'</a>';
				html += '<h1>Alexala</h1>';
				html += '<div class="right-buttons">';
				html += '<a href="#home" class="custom-button home-button" data-icon="custom" data-iconpos="notext" data-corners="false" data-role="button" data-inline="true" >Menu</a>';
				html += '</div>';
				html += '</div>';				
				html += '<div data-role="content" data-theme="c" id="contentSchedaEntita">';
				if ($db.foto){
				    html += '<div class="content-picture" style="position: relative;"><img src="'+$db.foto+'" /></div>';
				}
				if ($db.nome){
				    html += '<h4 class="centered">'+$db.nome+'</h4>';
				}
				html += '<ul data-role="listview" class="details" data-inset="true">';
				if ($db.categoria){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].categoria+'</h3>';
				    html += '<p>'+$db.ambito+' - '+$db.categoria+'</p>';
				    html += '</li>';
				}
				if ($db.indirizzo){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].indirizzo+'</h3>';
				    html += '<p>'+$db.indirizzo+'</p>';
				    html += '</li>';
				}
				if ($db.telefono && !$db.ok_telefono){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].telefono+'</h3>';
				    html += '<p>'+$db.telefono+'</p>';
				    html += '</li>';
				}
				if ($db.n_stelle){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].n_stelle+'</h3>';
				    html += '<p>'+$db.n_stelle+'</p>';
				    html += '</li>';
				}
				if (1*$db.prezzo_min || 1*$db.prezzo_max){
				    html += '<li>';
				    html += '<h3 class="no-white-space">'+labellang[cur_lang].prezzo_giornaliero_doppia+'</h3>';
				    html += '<p>';
				    if (1*$db.prezzo_min){
					html += labellang[cur_lang].da+' &euro; '+number_format($db.prezzo_min,2,",",".");
				    }
				    if (1*$db.prezzo_max){
					html += labellang[cur_lang].a+' &euro; '+number_format($db.prezzo_max,2,",",".");
				    }
				    html += '</p>';
				    html += '</li>';
				}
				if ($db.numero){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].numero+'</h3>';
				    html += '<p>'+$db.numero+'</p>';
				    html += '</li>';
				}
				if ($db.difficolta){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].difficolta+'</h3>';
				    html += '<p>'+$db.difficolta+'</p>';
				    html += '</li>';
				}				
				if ($db.lunghezza_km){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].lunghezza_km+'</h3>';
				    html += '<p>'+$db.lunghezza_km+'</p>';
				    html += '</li>';
				}
				if ($db.tempo_percorrenza){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].tempo_percorrenza+'</h3>';
				    html += '<p>'+$db.tempo_percorrenza+'</p>';
				    html += '</li>';
				}				
				if ($db.dislivello_in_metri){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].dislivello_in_metri+'</h3>';
				    html += '<p>'+$db.dislivello_in_metri+'</p>';
				    html += '</li>';
				}				
				if ($db.tipologia_bicicletta){
				    html += '<li>';
				    html += '<h3>'+labellang[cur_lang].tipologia_bicicletta+'</h3>';
				    html += '<p>'+$db.tipologia_bicicletta+'</p>';
				    html += '</li>';
				}								
				html += '</ul>';
				
				html += '<ul data-role="listview" data-inset="true">';
				if ($db.ok_telefono){
				    html += '<li><a href="tel:'+$db.telefono+'"><img src="img/phone.png" alt="Chiama" class="ui-li-icon" />'+labellang[cur_lang].chiama+'</a></li>';
				    html += '<li>';
				    if ($db.nome){
					html += '<input type="hidden" class="nome" value="'+addslashes(stripslashes($db.nome))+'" />';
				    }
				    if ($db.telefono){
					html += '<input type="hidden" class="telefono" value="'+$db.telefono+'" />';
				    }
				    if ($db.indirizzo){
					html += '<input type="hidden" class="indirizzo" value="'+addslashes(stripslashes($db.indirizzo))+'" />';
				    }
				    if ($db.foto){
					html += '<input type="hidden" class="foto" value="'+$db.foto+'" />';
				    }
				    html += '<a href="#" onclick="addToContact(this);"><img src="img/icon-contact.png" alt="Aggiungi a Rubrica" class="ui-li-icon" />'+labellang[cur_lang].aggiungi_a_rubrica+'</a>';
				    html += '</li>';
				}
				html += '</ul>';

				html += '<ul data-role="listview" data-inset="true" class="addToFavorites" style="display: none;">';
				html += '<li data-theme="e"><a href="#" onclick="app.addToFavorites(\''+$db.id+'\');"><img src="img/star_up.png" alt="'+labellang[cur_lang].aggiungi_ai_preferiti+'" class="ui-li-icon" />'+labellang[cur_lang].aggiungi_ai_preferiti+'</a></li>';
				html += '</ul>';
				html += '<ul data-role="listview" data-inset="true" class="removeFromFavorites" style="display: block;">';
			        html += '<li data-theme="e"><a href="#" onclick="app.removeFromFavorites(\''+$db.id+'\');"><img src="img/star_down.png" alt="'+labellang[cur_lang].rimuovi_dai_preferiti+'" class="ui-li-icon" />'+labellang[cur_lang].rimuovi_dai_preferiti+'</a></li>';
				html += '</ul>';
								
				html += '<div id="campi_preferito_'+$db.id+'">';
				html += '<input type="hidden" class="tipo_preferito" value="ALEXALA_PREFERITI_RISORSE" />';
				html += '<input type="hidden" class="campo_preferito" name="id" value="'+$db.id+'" />';
				html += '<input type="hidden" class="campo_preferito" name="foto" value="'+$db.foto+'" />';
				html += '<input type="hidden" class="campo_preferito" name="nome" value="'+htmlspecialchars($db.nome, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="ambito" value="'+htmlspecialchars($db.ambito, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="categoria" value="'+htmlspecialchars($db.categoria, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="localita" value="'+htmlspecialchars($db.nome, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="indirizzo" value="'+htmlspecialchars($db.indirizzo, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="telefono" value="'+htmlspecialchars($db.telefono, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="ok_telefono" value="'+$db.ok_telefono+'" />';
				html += '<input type="hidden" class="campo_preferito" name="n_stelle" value="'+htmlspecialchars($db.n_stelle, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="prezzo_min" value="'+htmlspecialchars($db.prezzo_min, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="prezzo_max" value="'+htmlspecialchars($db.prezzo_max, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="numero" value="'+htmlspecialchars($db.numero, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="difficolta" value="'+htmlspecialchars($db.difficolta, 'ENT_QUOTES')+'" />';            
				html += '<input type="hidden" class="campo_preferito" name="lunghezza_km" value="'+htmlspecialchars($db.lunghezza_km, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="tempo_percorrenza" value="'+htmlspecialchars($db.tempo_percorrenza, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="dislivello_in_metri" value="'+htmlspecialchars($db.dislivello_in_metri, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="tipologia_bicicletta" value="'+htmlspecialchars($db.tipologia_bicicletta, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="latlng" value="'+htmlspecialchars($db.latlng, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="email" value="'+htmlspecialchars($db.email, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="web" value="'+htmlspecialchars($db.web, 'ENT_QUOTES')+'" />';
				html += '<input type="hidden" class="campo_preferito" name="data_inserimento" value="'+time()+'" />';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				
				$("body").append(html);
				$.mobile.changePage("#schedaEntita_"+id_entita);                                              
				$.mobile.loading( 'hide' );		    
				break;
			}
		    }
		    return false;
		});
	    }, app.errorCB);
	}
    },    
        
    hasFavorites: function(){
	var db_exists = window.localStorage.getItem("alexala_db_exists");
	if (db_exists){
	    var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	    db.transaction(function(tx){	    
		var query = "SELECT * FROM ALEXALA_PREFERITI_RISORSE";	    
		tx.executeSql(query,[],function(tx, results){
		    if (results.rows.length > 0){
			$("#menuFavorites").show();
		    }else{
			var query = "SELECT * FROM ALEXALA_PREFERITI_EVENTI";	    
			tx.executeSql(query,[],function(tx, results){		
			    if (results.rows.length > 0){
				$("#menuFavorites").show();
			    }else{
				$("#menuFavorites").hide();
			    }
			    return false;
			});
		    }
		    return false;
		});
	    }, app.errorCB);
	}
    },
    
    addToFavorites: function(id_entita){	
	console.log("addToFavorites");
	var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	db.transaction(function(tx){	    
	    var table = $("#campi_preferito_"+id_entita).find(".tipo_preferito").val();
	    var fields = new Array();
	    var values = new Array();
	    $("#campi_preferito_"+id_entita).find(".campo_preferito").each(function(){
		fields.push($(this).attr("name"));
		values.push($(this).attr("value"));
	    });
	    var query = "";
	    query += "REPLACE INTO "+table+" (";
	    var tot_field = fields.length;
	    var field_list = "";
	    var i = 0;
	    while (i < tot_field){
		    field_list += fields[i];
		    i++;
		    if (i < tot_field){
			    field_list += " ,";
		    }
	    }
	    query += field_list+") VALUES (";	    
	    var value_list = "";	
	    i = 0;
	    while (i < tot_field){
		    value_list += "'"+sqlescape(values[i])+"'";
		    i++;
		    if (i < tot_field){
			    value_list += " ,";
		    }
	    }
	    query += value_list+")";
	    console.log(query);
	    tx.executeSql(query,[],function(tx, results){
		app.isInFavorites(id_entita);
	    });
	}, app.errorCB);
    },

    updateFavorites: function(id_entita){	
	app.addToFavorites(id_entita);
    },
    
    removeFromFavorites: function(id_entita){
	var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	db.transaction(function(tx){
	    var table = $("#campi_preferito_"+id_entita).find(".tipo_preferito").val();
	    var query = "DELETE FROM "+table+" WHERE id = '"+id_entita+"'";
	    console.log(query);
	    tx.executeSql(query,[],function(tx, results){
		app.isInFavorites(id_entita);
	    });
	}, app.errorCB);	
    },

    
    isInFavorites: function(id_entita){
	var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	db.transaction(function(tx){
	    var table = $("#campi_preferito_"+id_entita).find(".tipo_preferito").val();
	    console.log(table);
	    var query = "SELECT * FROM "+table+" WHERE id = '"+id_entita+"'";
	    console.log(query);
	    tx.executeSql(query,[],function(tx, results){
		
		if (results.rows.length > 0){
		    $("#schedaEntita_"+id_entita).find(".addToFavorites").hide();
		    $("#schedaEntita_"+id_entita).find(".removeFromFavorites").show();
		    var $db = results.rows.item(0);
		    $("#campi_preferito_"+id_entita).find(".campo_preferito[name='data_inserimento']").val($db.data_inserimento);
		}else{
		    $("#schedaEntita_"+id_entita).find(".addToFavorites").show();
		    $("#schedaEntita_"+id_entita).find(".removeFromFavorites").hide();		    
		}
		
		console.log("Returned rows = " + results.rows.length);
		return false;
	    });
	}, app.errorCB);	
    }
};

function checkConnectionState(){
    var networkState = navigator.connection.type;
    if(networkState == Connection.NONE || networkState == Connection.UNKNOWN){
	return false;
    }
    return true;
}

function checkConnection() {
    

    if (!checkConnectionState()){
        navigator.notification.alert(
            labellang[cur_lang].devi_essere_connesso,  // message
            function(){
		removeActiveLink();    
	    },         // callback
            'Alexala',            // title
            'OK'                  // buttonName
        );
        return false;
    }
    return true;
}

var arrFirtsViewOnMap = new Array();

var markerArray = new Array();

var initi_map = false;
var initi_map_all = false;

var mapIsInitialized = false;
var mapAllIsInitialized = false;

/*
$("#home").live("pageshow", function(){        
    plugins.navigationBar.hideLeftButton();
    plugins.navigationBar.hideRightButton();
});


$("#touristBoard, #eventi, #ricerca, #gallery, #contatti, #preferitiEventi, #preferitiRisorse").live("pagebeforeshow", function(){
        plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	 
	});
        plugins.navigationBar.setupRightButton("Menu", null, function() {
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.touristBoardPost").live("pagebeforeshow", function(){
        plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#touristBoard",{transition: "slide", reverse:true});	 
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.eventoScheda").live("pagebeforeshow", function(){
        plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( "#eventi",{transition: "slide", reverse:true});	 
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.risorsaScheda").live("pagebeforeshow", function(){
        var backpage = $(this).attr("data-back");	
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();
	    if (backpage == "mapPageAll"){
		viewAllOnMap();	
	    }else{
		$.mobile.changePage( "#searchResult",{transition: "slide", reverse:true});
	    }	    
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.risorsaSchedaPreferiti").live("pagebeforeshow", function(){
        var backpage = "#preferitiRisorse";	
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    app.loadFavorites(false);
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();
	    $.mobile.changePage(backpage,{transition: "slide", reverse:true});	    
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	    
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.eventoSchedaPreferiti").live("pagebeforeshow", function(){
        var backpage = "#preferitiEventi";	
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    app.loadFavorites(false);
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();
	    $.mobile.changePage(backpage,{transition: "slide", reverse:true});	    
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	    
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.videoPage").live("pagebeforeshow", function(){
        var backpage = "#gallery";	
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    app.loadFavorites(false);
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();
	    $.mobile.changePage(backpage,{transition: "slide", reverse:true});	    
        });
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	    
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});


$("#searchResult").live("pagebeforeshow", function(){        
	var backpage = "#"+$(this).attr("data-back");	
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});
        });
        plugins.navigationBar.setupRightButton(labellang[cur_lang].mappa, null, function() {	 
	 //$.mobile.changePage( "#home",{transition: "slide", reverse:true});
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 	 
	    viewAllOnMap();	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$("#mapPageAll").live("pagebeforeshow", function(){        
	var backpage = "#searchResult";
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});	 
        });
        plugins.navigationBar.setupRightButton(labellang[cur_lang].lista, null, function() {
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$("#mapPage").live("pagebeforeshow", function(){        
	var backpage = "#"+$(this).attr("data-back");
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});	 
        });
        plugins.navigationBar.setupRightButton(labellang[cur_lang].scheda, null, function() {
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});

$(".pageView.elencoAmbitiCategorie").live("pagebeforeshow", function(){        
	var backpage = "#"+$(this).attr("data-back");
	plugins.navigationBar.setupLeftButton(labellang[cur_lang].indietro, null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( backpage,{transition: "slide", reverse:true});
	});
        plugins.navigationBar.setupRightButton("Menu", null, function() {	 
	    plugins.navigationBar.hideLeftButton();
	    plugins.navigationBar.hideRightButton();	 
	    $.mobile.changePage( "#home",{transition: "slide", reverse:true});	 
	});
    plugins.navigationBar.showLeftButton();
    plugins.navigationBar.showRightButton();
});
*/

$( document ).ready(function(){
    $("#btnOpenGeolocator").live("click",function(){
       setPosition(0,"","",""); 
    });
    $.mobile.allowCrossDomainPages = true;
});

$("#home").live("pagebeforeshow", function(event, ui){
   removeActiveLink(".home-menu");
   app.hasFavorites();
});

$("#home").live('pageshow',function(event, ui){    
    $("body").addClass("brown");
    $("body").removeClass("white");
    $(".elencoAmbitiCategorie").remove();        
});

$("#home").live('pagehide',function(event, ui){    
    $("body").removeClass("brown");
    $("body").addClass("white");    
});

$("#preferitiEventi").live('pageshow',function(event, ui){    
    $(".eventoSchedaPreferiti").remove();
    var listview_preferiti_eventi_initialized = 1*$("#listview_preferiti_eventi_initialized").val();
    if (!listview_preferiti_eventi_initialized) $("#listview_preferiti_eventi_initialized").val(1);
});

$("#preferitiRisorse").live('pageshow',function(event, ui){    
    $(".risorsaSchedaPreferiti").remove();
    var listview_preferiti_risorse_initialized = 1*$("#listview_preferiti_risorse_initialized").val();
    if (!listview_preferiti_risorse_initialized) $("#listview_preferiti_risorse_initialized").val(1);    
});

$("#searchResult").live('pageshow',function(event, ui){    
    $(".risorsaScheda").remove();
});

$("#touristBoard").live('pageshow',function(event, ui){    
    //$(".touristBoardPost").remove();    
});

$(".pageView.touristBoardPost").live('pagehide',function(event, ui){    
    $(".touristBoardPost").remove();    
});

$(".pageView.videoPage").live('pagehide',function(event, ui){
    $(".videoPage").remove();
});

$("#eventi").live('pageshow',function(event, ui){        
    $(".eventoScheda").remove();    
});

$("#ricerca").live('pageshow',function(event, ui){        
    $(".elencoAmbitiCategorie").remove();    
});

$("#mapPage").live('pageinit',function(event, ui){
    initi_map = true;    
});

$("#mapPageAll").live('pageinit',function(event, ui){
    initi_map_all = true;    
});

$("#mapPage").live('pageshow',function(event, ui){
    if (initi_map){
        initialize();
        mapIsInitialized = true;
        viewOnMap(arrFirtsViewOnMap[0],arrFirtsViewOnMap[1],arrFirtsViewOnMap[2]);
        initi_map = false;
    }else{
        google.maps.event.trigger(map, 'resize');
        var latlng = arrFirtsViewOnMap[0];
        var ltln = latlng.split(",");
        var lat = ltln[0];
        var lng = ltln[1];        
        var markerCoord = new google.maps.LatLng(lat, lng);
        map.panTo(markerCoord);            
    }    
});

$("#mapPageAll").live('pageshow',function(event, ui){
    if (initi_map_all){
        initialize_all();
        mapAllIsInitialized = true;
        viewAllOnMap();
        initi_map_all = false;
    }else{
        google.maps.event.trigger(mapAll, 'resize');
    }    
});

$( "#struttureRicettive" ).live('pageshow',function(event, ui){
  if (!$("#catStruttureRicettive li").length){
      var poststr = "&id_ambito="+id_ambito_strutture_ricettive+"&lang_lista="+$("#lang-lista").val();
      getAmbitoCategorie(poststr,"catStruttureRicettive");
  }
});

function loadTouristBoardPost(id_blog){
    if (checkConnection()){
	var poststr = "&id_blog="+id_blog+"&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getTouristBoardPost.php", poststr, function(data){
	    $("body").append(data);                              
	    $.mobile.changePage("#post_"+id_blog);                                              
	    $.mobile.loading( 'hide' );
	});
    }
}

function getRicerca(){
    if (checkConnection()){
	var poststr="&os=android&lang_lista="+$("#lang-lista").val();
	if (!$("#ricerca").length){
	    showLoading();	
	    $.post(http_target_ws+"/ws/getRicerca.php", poststr, function(data){	    
		$("body").append(data);
		$.mobile.changePage("#ricerca");
		$.mobile.loading( 'hide' );
	    });
	}else{
	    $.mobile.changePage("#ricerca");
	}
    }
}

function getTouristBoard(poststr, onload){    
    if (checkConnection()){
	poststr += "&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();    
	$.post(http_target_ws+"/ws/getTouristBoard.php", poststr, function(data){
	    $.mobile.changePage("#touristBoard");
	    if (!onload){
		$("#resultsTouristBoard").append(data);
	    }else{
		$("#resultsTouristBoard").html(data);
	    }
	    $("#resultsTouristBoard").listview("refresh");                        
	    $.mobile.loading( 'hide' );
	    if ($("#resultsTouristBoard li.last").length){
		$("#moreResultsTouristBoard").hide();
	    }else{
		$("#moreResultsTouristBoard").show();
	    }        
	    //$.mobile.loading( 'hide' )                        
	});
    }
}

function getEventi(poststr,onload){
    if (checkConnection()){
	poststr += "&entita=evento&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getResults.php", poststr, function(data){
	    $.mobile.changePage("#eventi");
	    //if (!onload){
	    //    $("#resultsEventi").append(data);
	    //}else{
		$("#resultsEventi").html(data);
	    //}
	    /*
	    $("#resultsEventi").listview("refresh");                        
	    $.mobile.loading( 'hide' );
	    if ($("#resultsEventi li.last").length){
		$("#moreResultsEventi").hide();
	    }else{
		$("#moreResultsEventi").show();
	    } 
	    */
	    $("#listview-eventi").listview();               
	    $.mobile.loading( 'hide' )                        
	});
    }
}

function navEventi(data_eventi){
    if (checkConnection()){
	var poststr = "&data_eventi="+data_eventi+"&lang_lista="+$("#lang-lista").val();
	getEventi(poststr);
    }
}

function getGallery(poststr, onload){
    if (checkConnection()){
	poststr += "&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getGallery.php", poststr, function(data){
	    $.mobile.changePage("#gallery");
	    if (!onload){
		$("#resultsGallery").append(data);
	    }else{
		$("#resultsGallery").html(data);
	    }
	    $("#resultsGallery").listview("refresh");                        
	    $.mobile.loading( 'hide' );
	    if ($("#resultsGallery li.last").length){
		$("#moreResultsGallery").hide();
	    }else{
		$("#moreResultsGallery").show();
	    }        
	    $.mobile.loading( 'hide' )                        
	});
    }
}

function getAmbitoCategorie(poststr, target){
    if (checkConnection()){
	poststr += "&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getAmbitoCategorie.php", poststr, function(data){
	    $("#"+target).html(data);
	    $("#"+target).listview("refresh");
	    $.mobile.loading( 'hide' )        
	});
    }
}

function openGallery(id_photogallery){
    if (checkConnection()){
	var poststr = "&id_photogallery="+id_photogallery+"&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getGalleryPhotos.php", poststr, function(data){
	    var arr_images = new Array();
	    $(data).find("photo").each(function(i){
		arr_images[i] = {url: "http://"+www_url+"/"+$(this).find("img").text(), caption: $(this).find("dida").text()};            
	    })
	    $.mobile.loading( 'hide' );
	    (function(window, PhotoSwipe){
	    var
		    options = {
			    preventHide: false,
			    getImageSource: function(obj){
				    return obj.url;
			    },
			    getImageCaption: function(obj){
				    return obj.caption;
			    },
		    loop: false
		    },
		    instance = PhotoSwipe.attach( 
		    arr_images, 
			    options 
		    );
		    instance.addEventHandler(PhotoSwipe.EventTypes.onBeforeShow, function(e){						
			    $("#swipeMask").fadeIn("normal", function(){
				//plugins.navigationBar.hide();			    
				$(this).hide();
			    });
		    });
		    
		    instance.addEventHandler(PhotoSwipe.EventTypes.onBeforeHide, function(e){
			    //plugins.navigationBar.show();			
		    });
		    
		    instance.show(0);
	   }(window, window.Code.PhotoSwipe));                    
	},"xml");
    }
}

function openVideo(id_videogallery){
    if (checkConnection()){
	var poststr = "&id_videogallery="+id_videogallery+"&os=android"+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	$.post(http_target_ws+"/ws/getVideo.php", poststr, function(data){
	    $("body").append(data);                              
	    $.mobile.changePage("#video_"+id_videogallery);                                              
	    $.mobile.loading( 'hide' );        
	});
    }
}


function loadListaRisorse(id_categoria, id_ambito, nome_sezione){
    if (checkConnection()){
	var poststr = "&entita=risorsa&origin="+$("#latlng").val()+"&os=android"+"&lang_lista="+$("#lang-lista").val();
	$("#id_categoria, #id_ambito").removeAttr("value");
	if (id_categoria){
	    poststr += "&id_categoria="+id_categoria;
	    $("#id_categoria").val(id_categoria);        
	}
	if (id_ambito){
	    poststr += "&id_ambito="+id_ambito;
	    $("#id_ambito").val(id_ambito);
	}
	
	if (!$("#latlng").val()){
	    setPosition(1,id_categoria,id_ambito,nome_sezione);
	}else{
	    showLoading();
	    $.post(http_target_ws+"/ws/getResults.php",poststr,function(data){
		$("#searchedCat").html(nome_sezione);
		var toRefresh = $("#resultsList li").length;
		$("#resultsList").html(data);
		if (toRefresh){
		    $("#resultsList").listview("refresh");    
		}            
		if ($("#resultsList li.last").length){
		    $("#moreResultsList").hide();
		}else{
		    $("#moreResultsList").show();
		}                    
		$.mobile.changePage("#searchResult");            
		$.mobile.loading( 'hide' );
	    });
	}
    }
}

function loadMoreResultsTouristBoard(){
    if (checkConnection()){
	var poststr = "&lang_lista="+$("#lang-lista").val();
	$("#resultsTouristBoard").find("input.campo_blog[name='id_blog']").each(function(){
	   poststr += "&ignore_ids[]="+$(this).val(); 
	});
	
	showLoading();
	getTouristBoard(poststr);
    }
}

function loadMoreResultsGallery(){
    if (checkConnection()){
	var poststr = "n_gallery="+$("#resultsGallery li").length+"&lang_lista="+$("#lang-lista").val();
	showLoading();
	getGallery(poststr);
    }
}

function loadMoreResultsEventi(){
    if (checkConnection()){
	var poststr = "";
	var page = ($("#resultsEventi").find("input.campo_scheda[name='id_entita']").length / limit_da_mostrare);
	page++;
	poststr += "&page="+page+"&lang_lista="+$("#lang-lista").val();    
	showLoading();
	getEventi(poststr);
    }
}

function loadMoreResults(){
    if (checkConnection()){
	var poststr = "&entita=risorsa&origin="+$("#latlng").val()+"&os=android"+"&lang_lista="+$("#lang-lista").val();
	/*
	var id_categoria = $("#id_categoria").val();
	
	if (id_categoria){
	    poststr += "&id_categoria="+id_categoria;                
	}
	*/
	$("#searchResult .results_cat").each(function(){
	   poststr += "&"+$(this).attr("name")+"="+$(this).attr("value"); 
	});
	var id_ambito = $("#id_ambito").val();   
	if (id_ambito){
	    poststr += "&id_ambito="+id_ambito;        
	} 
	$("#resultsList").find("input.campo_scheda[name='id_entita']").each(function(){
	   poststr += "&ignore_ids[]="+$(this).val(); 
	});
    
	showLoading();
	$.post(http_target_ws+"/ws/getResults.php",poststr,function(data){        
	    var toRefresh = $("#resultsList li").length;
	    $("#resultsList").append(data);
	    if (toRefresh){
		$("#resultsList").listview("refresh");    
	    }                    
	    $.mobile.loading( 'hide' );
	    if ($("#resultsList li.last").length){
		$("#moreResultsList").hide();
	    }else{
		$("#moreResultsList").show();
	    }        
	});
    }
}

function loadScheda(obj, map_back){
    if (checkConnection()){
	var id_entita = $(obj).find("input.campo_scheda[name='id_entita']").val();
	//if (!$("#schedaEntita_"+id_entita).length){
	    var poststr = "&os=android&ok_preferiti=1"+"&lang_lista="+$("#lang-lista").val();
	    if (map_back) poststr += "&map_back=mapPageAll";
	    $(obj).find(".campo_scheda").each(function(){
	       if ($(this).val()){
		if ($(this).attr("name") != "telefono"){
		    poststr += "&"+$(this).attr("name")+"="+escape($(this).val());    
		}else{
		    poststr += "&"+$(this).attr("name")+"="+MyEncodeURI($(this).val());
		}            
	       } 
	    });
	    showLoading();
	    $.post(http_target_ws+"/ws/getScheda.php",poststr,function(data){                        
		$("body").append(data);                      
		$("#schedaEntita_"+id_entita).find(".current-position").html($("#localita").val());
		app.isInFavorites(id_entita);
		$.mobile.changePage("#schedaEntita_"+id_entita);                                              
		$.mobile.loading( 'hide' );
	    });
	/*    
	}else{
	    $("#schedaEntita_"+id_entita).find(".current-position  .ui-btn-text").html($("#localita").val());        
	    $.mobile.changePage("#schedaEntita_"+id_entita);
	}
	*/
    }
}

function loadSchedaEvento(obj){
    if (checkConnection()){
	var id_entita = $(obj).find("input.campo_scheda[name='id_entita']").val();
	//if (!$("#schedaEntita_"+id_entita).length){
	    var poststr = "&os=android&ok_preferiti=1"+"&lang_lista="+$("#lang-lista").val();
	    $(obj).find(".campo_scheda").each(function(){
	       if ($(this).val()){
		if ($(this).attr("name") != "telefono"){
		    poststr += "&"+$(this).attr("name")+"="+escape($(this).val());    
		}else{
		    poststr += "&"+$(this).attr("name")+"="+MyEncodeURI($(this).val());
		}            
	       } 
	    });
	    showLoading();
	    $.post(http_target_ws+"/ws/getSchedaEvento.php",poststr,function(data){                        
		$("body").append(data);                      
		$("#schedaEntita_"+id_entita).find(".current-position").html($("#localita").val());
		app.isInFavorites(id_entita);
		$.mobile.changePage("#schedaEntita_"+id_entita);                                              
		$.mobile.loading( 'hide' );
	    });
	/*
	}else{
	    $("#schedaEntita_"+id_entita).find(".current-position  .ui-btn-text").html($("#localita").val());        
	    $.mobile.changePage("#schedaEntita_"+id_entita);
	}
	*/
    }
}

function loadSchedaFromFavorites(id_entita){
    $(".risorsaScheda").remove();
    $(".risorsaSchedaPreferiti").remove();
    if (checkConnection()){	
	//if (!$("#schedaEntita_"+id_entita).length){
	    var poststr = "&id_entita="+id_entita+"&os=android&ok_preferiti=1"+"&lang_lista="+$("#lang-lista").val()+"&fromFavorites=1";	    
	    showLoading();
	    $.post(http_target_ws+"/ws/getScheda.php",poststr,function(data){                        
		$("body").append(data);                      		
		app.isInFavorites(id_entita);
		$.mobile.changePage("#schedaEntita_"+id_entita);                                              
		$.mobile.loading( 'hide' );
		app.updateFavorites(id_entita);
	    });
	/*    
	}else{
	    $("#schedaEntita_"+id_entita).find(".current-position  .ui-btn-text").html($("#localita").val());        
	    $.mobile.changePage("#schedaEntita_"+id_entita);
	}
	*/
    }
}

function loadSchedaEventoFromFavorites(id_entita){
    $(".eventoScheda").remove();
    $(".eventoSchedaPreferiti").remove();
    if (checkConnection()){		
	    var poststr = "&id_entita="+id_entita+"&os=android&ok_preferiti=1"+"&lang_lista="+$("#lang-lista").val()+"&fromFavorites=1";
	    showLoading();
	    $.post(http_target_ws+"/ws/getSchedaEvento.php",poststr,function(data){                        
		$("body").append(data);                      		
		app.isInFavorites(id_entita);
		$.mobile.changePage("#schedaEntita_"+id_entita);                                              
		$.mobile.loading( 'hide' );
		app.updateFavorites(id_entita);
	    });
    }
}


function loadAmbitiCategorie(area, area_descrizione, icon, data_back){
    if (checkConnection()){
	if (!icon) icon = "ricerca";
	var poststr = "&os=android&icon="+icon+"&area="+area+"&area_descrizione="+escape(area_descrizione)+"&lang_lista="+$("#lang-lista").val();    
	if (data_back) poststr += "&data_back="+data_back;
	var page = "elencoAmbitiCategorie_"+area;
	showLoading();
	$.post(http_target_ws+"/ws/getAmbitiCategorie.php",poststr,function(data){
	    $("body").append(data);                      
	    if ($("#localita").val())
		$("#"+page).find(".current-position").html($("#localita").val());
	    $.mobile.changePage("#"+page);                                              
	    $.mobile.loading( 'hide' );        
	});
    }
}

function viewOnMap(latlng, nome, indirizzo){                    
    arrFirtsViewOnMap[0] = latlng;
    arrFirtsViewOnMap[1] = nome;
    arrFirtsViewOnMap[2] = indirizzo;

    console.log(arrFirtsViewOnMap[0]+" "+arrFirtsViewOnMap[1]+" "+arrFirtsViewOnMap[2]);
    
    showLoading();
    $.mobile.changePage("#mapPage");
    $.mobile.loading( 'hide' );
    
    if (mapIsInitialized){
            
        for(var i = 0; i < markerArray.length; i++){
            markerArray[i].setMap(null);
        }
        
        var ltln = latlng.split(",");
        var lat = ltln[0];
        var lng = ltln[1];
        var markerCoord = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
                        position: markerCoord,
                        map: map,
                        title: nome                                        
                });
        markerArray.push(marker);
        var tooltip = '<div class="mapBubble"><div><h1>'+nome+'</h1><p>' + indirizzo +'</p></div><span class="pulcino"></span></div>';
/*
    	var infowindow = new google.maps.InfoWindow({
                            content: tooltip
                         });
*/
        var infowindow = new InfoBubble({
                  map: map,
                  content: tooltip,                      
                  shadowStyle: 1,
                  padding: 0,                      
                  borderRadius: 10,
                  hideCloseButton: false
                });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        
        map.panTo(markerCoord);    
    }
}

function viewAllOnMap(){
	
        showLoading();
        $.mobile.changePage("#mapPageAll");
        $.mobile.loading( 'hide' );
    if (mapAllIsInitialized){
        for(var i = 0; i < markerArray.length; i++){
            markerArray[i].setMap(null);
        }
        var bounds = new google.maps.LatLngBounds();
        var arr_lat = new Array();
        var arr_lng = new Array();
        $("#resultsList li").each(function(i){        
            var latlng = new String($(this).find("input.campo_scheda[name='latlng']").val());
            var ltln = latlng.split(",");
            var lat = ltln[0];
            var lng = ltln[1];            
            arr_lat[i] = lat;
            arr_lng[i] = lng;
            var nome = $(this).find("input.campo_scheda[name='nome']").val();
            var indirizzo = $(this).find("input.campo_scheda[name='indirizzo']").val();
            var markerCoord = new google.maps.LatLng(lat, lng);
            bounds.extend(markerCoord);
            var marker = new google.maps.Marker({
                            position: markerCoord,
                            map: mapAll,
                            title: nome                                        
                    });
            markerArray.push(marker);
            var tooltip = '<div class="mapBubble"><div><h1>'+nome+'</h1><p>' + indirizzo +'</p></div><span class="pulcino"></span></div>';
        	/*
            var infowindow = new google.maps.InfoWindow({
                                content: tooltip
                             });
            */
            var infowindow = new InfoBubble({
                      map: mapAll,
                      content: tooltip,                      
                      shadowStyle: 1,
                      padding: 0,                      
                      borderRadius: 10,
                      hideCloseButton: false
                    });   
                             
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(mapAll,marker);
            });                
        });
        
        var avg_lat = 0;
        var avg_lng = 0;
        var i = 0;
        for(i = 0; i<arr_lat.length;i++){
            avg_lat+= 1*arr_lat[i];
        }
        for(i = 0; i<arr_lng.length;i++){
            avg_lng+= 1*arr_lng[i];
        }                    
        avg_lat = avg_lat / arr_lat.length;
        avg_lng = avg_lng / arr_lng.length;        
        var centerPoint = new google.maps.LatLng(avg_lat, avg_lng);
        
        mapAll.setCenter(centerPoint);
    }    
}

function setPosition(callback,id_categoria,id_ambito,nome_sezione){
    if (checkConnection()){
	$.mobile.changePage("#myPosition");
	if (callback){
	    $("#btnSetPosition").unbind("click");
	    $("#btnSetPosition").bind("click", function(){
		savePosition();            
		loadListaRisorse(id_categoria, id_ambito, nome_sezione);
	    });
	}else{
	    $("#btnSetPosition").unbind("click");
	    $("#btnSetPosition").bind("click", function(){
		savePosition();
	    });        
	}
    }
}

function setPositionMultiSearch(filter_container, ambito){
    if (checkConnection()){
	$.mobile.changePage("#myPosition");    
	$("#btnSetPosition").unbind("click");
	$("#btnSetPosition").bind("click", function(){
	    savePosition();            
	    searchRisorse(filter_container, ambito);
	});
    }
}

function showLoading(){
    $.mobile.loading( 'show', {
    	text: '',
    	textVisible: true,
    	theme: 'b',
    	html: ""
    });    
}

function searchRisorse(filter_container, ambito){
    if (checkConnection()){
	if (!$("#latlng").val()){
	    setPositionMultiSearch(filter_container, ambito);
	}else{        
	    $("#searchResult").remove();
	    if (!$("#"+filter_container+" .checkbox_cat:checked").length){
		navigator.notification.alert(
		    labellang[cur_lang].seleziona_almeno_una_categoria,  // message
		    function(){},         // callback
		    'Alexala',            // title
		    'OK'                  // buttonName
		);
			//alert("Seleziona almeno una categoria per effettuare la ricerca");
		return false;
	    }
	    var poststr = "&os=android&entita=risorsa&loadPage=1&origin="+$("#latlng").val()+"&ambito_descrizione="+escape(ambito)+"&lang_lista="+$("#lang-lista").val();    
	    $("#"+filter_container+" .checkbox_cat:checked").each(function(){
	       poststr += "&"+$(this).attr("name")+"="+$(this).attr("value"); 
	    });
	    poststr += "&icon=ricerca&&area="+$("#area_ricerca").val();
	    showLoading();    
	    $.post(http_target_ws+"/ws/getResults.php",poststr,function(data){
		//$("#searchedCat").html(ambito);
		/*
		var toRefresh = $("#resultsList li").length;
		$("#resultsList").html(data);
		if (toRefresh){
		    $("#resultsList").listview("refresh");    
		} 
		*/           
		$("body").append(data);                                                                                         
		if ($("#resultsList li.last").length){
		    $("#moreResultsList").hide();
		}else{
		    $("#moreResultsList").show();
		}                    
		$("#searchResult").find(".current-position").html($("#localita").val());
		$.mobile.changePage("#searchResult");            
		$.mobile.loading( 'hide' );
	    }); 
	}
    }
}

function activateLink(obj){
    $(obj).parent().parent().parent().addClass("ui-btn-active");
}

function removeActiveLink(selector){
    $(""+selector+" li.ui-btn-active").removeClass("ui-btn-active");
}

function MyEncodeURI(val){
    var cVal = new String(val);
    var new_val = encodeURI(cVal);
    new_val = new_val.replace("+","%2B");
    return new_val;
}

function openInAppBrowser(obj){
    //cordova.exec("ChildBrowserCommand.showWebPage", $(obj).attr("rel"));
    //var ref = window.open($(obj).attr("rel"),"_blank","location=yes");
    /*
    ref.addEventListener('exit', function() {
	var db = window.openDatabase("alexala_db", "1.0", "Alexala DB", 1000000);
	db.transaction(app.createDB, app.errorCB, app.successCB);            
    });
    */
    navigator.app.loadUrl($(obj).attr("rel"), { openExternal:true } );
}


function openMailComposer(to){
    var args = {};
    args.toRecipients = to;
    Cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

function checkAndAddContact(contacts) {
    
};

function onErrorContact(contactError) {
    
};

function onSuccessContact(contacts) {
    navigator.notification.alert(
	labellang[cur_lang].contatto_salvato,  // message
	function(){},         // callback
	'Alexala',            // title
	'OK'                  // buttonName
    );
};


function addToContact(obj){
    var $field_container = $(obj).parent();    
    var nome = "";
    var telefono = "";
    var indirizzo = "";
    var foto = "";
    var email = "";
    
    if ($field_container.find(".nome").val()){
	nome = $field_container.find(".nome").val();
    }

    if ($field_container.find(".telefono").val()){
	telefono = $field_container.find(".telefono").val();
    }

    if ($field_container.find(".indirizzo").val()){
	indirizzo = $field_container.find(".indirizzo").val();
    }
    
    if ($field_container.find(".foto").val()){
	foto = $field_container.find(".foto").val();
    }

    if ($field_container.find(".email").val()){
	email = $field_container.find(".email").val();
    }        
        
    var options = new ContactFindOptions();
    options.filter=stripslashes(nome);
    options.multiple=true; 
    var fields = ["displayName","nickname"];
    navigator.contacts.find(fields, function(contacts){
	if (!contacts.length){
	    var contact = navigator.contacts.create();
	    contact.displayName = stripslashes(nome);
	    contact.nickname = stripslashes(nome);       //specify both to support all devices	    
	    var phoneNumbers = new Array();
	    phoneNumbers[0] = new ContactField('home', telefono, false);
	    contact.phoneNumbers = phoneNumbers;
	    if (foto){
		var photos = new Array();
		photos[0] = new ContactField("url",foto,false);
		contact.photos = photos;
	    }

	    if (indirizzo){
		var addresses = new Array();
		addresses[0] = new ContactAddress();
		addresses[0].formatted = stripslashes(indirizzo);
		contact.addresses = addresses;
	    }
	    
	    if (email){
	        var emails = new Array();
		emails[0] = new ContactField('home', email, false);
		contact.emails = emails;
	    }
	    // save to device
	    contact.save(onSuccessContact,onErrorContact);
	}else{
	    navigator.notification.alert(
		labellang[cur_lang].contatto_gia_presente,  // message
		function(){},         // callback
		'Alexala',            // title
		'OK'                  // buttonName
	    );	    
	}
    },
    onErrorContact,
    options);    
}

function addslashes(str) {
    str=str.replace(/\\/g,'\\\\');
    str=str.replace(/\'/g,'\\\'');
    str=str.replace(/\"/g,'\\"');
    str=str.replace(/\0/g,'\\0');
    return str;
}
function stripslashes(str) {
    str=str.replace(/\\'/g,'\'');
    str=str.replace(/\\"/g,'"');
    str=str.replace(/\\0/g,'\0');
    str=str.replace(/\\\\/g,'\\');
    return str;
}

function number_format (number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function htmlspecialchars (string, quote_style, charset, double_encode) {
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined' || quote_style === null) {
    quote_style = 2;
  }
  string = string.toString();
  if (double_encode !== false) { // Put this first to avoid double-encoding
    string = string.replace(/&/g, '&amp;');
  }
  string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      }
      else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/'/g, '&#039;');
  }
  if (!noquotes) {
    string = string.replace(/"/g, '&quot;');
  }

  return string;
}

function time () {
  return Math.floor(new Date().getTime() / 1000);
}

function sqlescape(str){
    str = stripslashes(str);
    str = str.replace(/\'/g,'&#39;');    
    return str;
}

function setLocalizableString(result, id){
    if (id == "lang-lista"){
	$("#lang-lista").val(result);
    }else{
	$("#"+id).html(result);
    }    
}

function htmlentities (string, quote_style, charset, double_encode) {

  var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
    symbol = '';
  string = string == null ? '' : string + '';

  if (!hash_map) {
    return false;
  }

  if (quote_style && quote_style === 'ENT_QUOTES') {
    hash_map["'"] = '&#039;';
  }

  if (!!double_encode || double_encode == null) {
    for (symbol in hash_map) {
      if (hash_map.hasOwnProperty(symbol)) {
        string = string.split(symbol).join(hash_map[symbol]);
      }
    }
  } else {
    string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
      for (symbol in hash_map) {
        if (hash_map.hasOwnProperty(symbol)) {
          text = text.split(symbol).join(hash_map[symbol]);
        }
      }

      return text + entity;
    });
  }

  return string;
}


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


var geocoder;
var map;
var mapAll;
var infowindow = new google.maps.InfoWindow();
var marker;
var center_lat = 44.8794212147;
var center_lng = 8.65873830333;
var markersArray = new Array();

$(document).ready(function(){
   geocoder = new google.maps.Geocoder(); 
   //initialize();
});

function getMyCoords(){
    $.mobile.showPageLoadingMsg("b", "Ottengo la posizione", true);
    navigator.geolocation.getCurrentPosition(setMyCoords,handle_errors);
}

function nonGeoPosition(){
    $("#lat, #lng, #latlng, #localita").removeAttr("value");
    $(".search_type").toggleClass("hide");
    $("#address").removeAttr("disabled").removeAttr("value");
    $("#search_type").val("address");    
}

function setMyCoords(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;	
    $("#lat").val(lat);
	$("#lng").val(lon);
    $("#latlng").val(lat + "," + lon);
	var latlng = new google.maps.LatLng(lat, lon);   
	geocoder.geocode({
		'latLng' : latlng
	}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			if(results[0]) {
			    $("#localita").val(results[0].address_components[2].long_name);
				document.getElementById("you").innerHTML = results[0].formatted_address;
                $("#geo-position-ul").listview("refresh");
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
        $.mobile.hidePageLoadingMsg();    
        $(".search_type").toggleClass("hide");
        $("#address").removeAttr("value").attr("disabled","disabled");  
        $("#search_type").val("geoposition");  
	});         
}

function setMyCoordsRefresh(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;	
    $("#lat").val(lat);
	$("#lng").val(lon);
    $("#latlng").val(lat + "," + lon);
	var latlng = new google.maps.LatLng(lat, lon);   
	geocoder.geocode({
		'latLng' : latlng
	}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			if(results[0]) {
			    $("#localita").val(results[0].address_components[2].long_name);
				document.getElementById("you").innerHTML = results[0].formatted_address;
                $("#geo-position-ul").listview("refresh");
			}
		} else {
			alert("Geocoder failed due to: " + status);
		}
        $.mobile.hidePageLoadingMsg();    
	});         
}

function refreshMyCoords(){
    $.mobile.showPageLoadingMsg("b", "Aggiorno la posizione", true);
    navigator.geolocation.getCurrentPosition(setMyCoordsRefresh,handle_errors);
}

function handle_errors(error) {
	$.mobile.hidePageLoadingMsg();
    switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("user did not share geolocation data");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("could not detect current position");
			break;
		case error.TIMEOUT:
			alert("retrieving position timed out");
			break;
		default:
			alert("unknown error");
			break;
	}
}

function savePosition(){
    
    if ($("#search_type").val() == "address"){
        geocoder.geocode( { 'address': $("#address").val()}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var res = results[0].geometry.location;
        	var lati = res.lat();
        	var lngi = res.lng();
            $("#lat").val(lati);
        	$("#lng").val(lngi);
            $("#latlng").val(lati + "," + lngi);               
            $("#localita").val(results[0].address_components[0].long_name);
            $(".current-position").each(function(){
               if ($(this).find(".ui-btn-text").length){
                    $(this).find(".ui-btn-text").html($("#localita").val());
               }else{
                    $(this).html($("#localita").val());
               } 
            });
            $('#myPosition').dialog('close'); 
            
          } else {
            $.mobile.hidePageLoadingMsg();
            var error_msg = "";
            switch(status){
                case "ZERO_RESULTS":
                    error_msg = "Non e' stato inserito un indirizzo valido";
                    break;
            }
            alert(error_msg);
          }
        });        
    }else{        
        $(".current-position").each(function(){
           if ($(this).find(".ui-btn-text").length){
                $(this).find(".ui-btn-text").html($("#localita").val());
           }else{
                $(this).html($("#localita").val());
           } 
        });
        $('#myPosition').dialog('close'); 
    }        
}

function initialize() {
	var latlng = new google.maps.LatLng(center_lat,center_lng);    
    var zoomCtrl = {
            position: google.maps.ControlPosition.TOP_LEFT,
            style: google.maps.ZoomControlStyle.SMALL 
        }
	    
    var myOptions = {
		zoom : 10,
        zoomControl: true,
        zoomControlOptions: zoomCtrl,
        streetViewControl: false,
		center : latlng,        
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
}

function initialize_all() {
	var latlng = new google.maps.LatLng(center_lat,center_lng);    
    var zoomCtrl = {
            position: google.maps.ControlPosition.TOP_LEFT,
            style: google.maps.ZoomControlStyle.SMALL 
        }
	    
    var myOptions = {
		zoom : 10,
        zoomControl: true,
        zoomControlOptions: zoomCtrl,
        streetViewControl: false,
		center : latlng,        
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}
	mapAll = new google.maps.Map(document.getElementById("map_canvas_all"),myOptions);
}


function InfoBubble(opt_options){this.extend(InfoBubble,google.maps.OverlayView);this.tabs_=[];this.activeTab_=null;this.baseZIndex_=100;this.isOpen_=false;var options=opt_options||{};if(options['backgroundColor']==undefined){options['backgroundColor']=this.BACKGROUND_COLOR_;}if(options['borderColor']==undefined){options['borderColor']=this.BORDER_COLOR_;}if(options['borderRadius']==undefined){options['borderRadius']=this.BORDER_RADIUS_;}if(options['borderWidth']==undefined){options['borderWidth']=this.BORDER_WIDTH_;}if(options['padding']==undefined){options['padding']=this.PADDING_;}if(options['arrowPosition']==undefined){options['arrowPosition']=this.ARROW_POSITION_;}if(options['disableAutoPan']==undefined){options['disableAutoPan']=false;}if(options['disableAnimation']==undefined){options['disableAnimation']=false;}if(options['minWidth']==undefined){options['minWidth']=this.MIN_WIDTH_;}if(options['shadowStyle']==undefined){options['shadowStyle']=this.SHADOW_STYLE_;}if(options['arrowSize']==undefined){options['arrowSize']=this.ARROW_SIZE_;}if(options['arrowStyle']==undefined){options['arrowStyle']=this.ARROW_STYLE_;}this.buildDom_();this.setValues(options);}window['InfoBubble']=InfoBubble;InfoBubble.prototype.ARROW_SIZE_=15;InfoBubble.prototype.ARROW_STYLE_=0;InfoBubble.prototype.SHADOW_STYLE_=1;InfoBubble.prototype.MIN_WIDTH_=50;InfoBubble.prototype.ARROW_POSITION_=50;InfoBubble.prototype.PADDING_=10;InfoBubble.prototype.BORDER_WIDTH_=1;InfoBubble.prototype.BORDER_COLOR_='#ccc';InfoBubble.prototype.BORDER_RADIUS_=10;InfoBubble.prototype.BACKGROUND_COLOR_='#fff';InfoBubble.prototype.extend=function(obj1,obj2){return(function(object){for(var property in object.prototype){this.prototype[property]=object.prototype[property];}return this;}).apply(obj1,[obj2]);};InfoBubble.prototype.buildDom_=function(){var bubble=this.bubble_=document.createElement('DIV');bubble.style['position']='absolute';bubble.style['zIndex']=this.baseZIndex_;var tabsContainer=this.tabsContainer_=document.createElement('DIV');tabsContainer.style['position']='relative';var close=this.close_=document.createElement('IMG');close.style['position']='absolute';close.style['width']=this.px(12);close.style['height']=this.px(12);close.style['right']="13px";close.style['top']="13px";close.style['border']=0;close.style['zIndex']=this.baseZIndex_+1;close.style['cursor']='pointer';close.src="img/close-infowindow.jpg";var that=this;google.maps.event.addDomListener(close,'click',function(){that.close();google.maps.event.trigger(that,'closeclick');});var contentContainer=this.contentContainer_=document.createElement('DIV');contentContainer.style['overflowX']='auto';contentContainer.style['overflowY']='auto';contentContainer.style['cursor']='default';contentContainer.style['clear']='both';contentContainer.style['position']='relative';var content=this.content_=document.createElement('DIV');contentContainer.appendChild(content);var arrow=this.arrow_=document.createElement('DIV');arrow.style['position']='relative';var arrowOuter=this.arrowOuter_=document.createElement('DIV');var arrowInner=this.arrowInner_=document.createElement('DIV');var arrowSize=this.getArrowSize_();arrowOuter.style['position']=arrowInner.style['position']='absolute';arrowOuter.style['left']=arrowInner.style['left']='50%';arrowOuter.style['height']=arrowInner.style['height']='0';arrowOuter.style['width']=arrowInner.style['width']='0';arrowOuter.style['marginLeft']=this.px(-arrowSize);arrowOuter.style['borderWidth']=this.px(arrowSize);arrowOuter.style['borderBottomWidth']=0;var bubbleShadow=this.bubbleShadow_=document.createElement('DIV');bubbleShadow.style['position']='absolute';bubble.style['display']=bubbleShadow.style['display']='none';bubble.appendChild(this.tabsContainer_);bubble.appendChild(close);bubble.appendChild(contentContainer);arrow.appendChild(arrowOuter);arrow.appendChild(arrowInner);bubble.appendChild(arrow);var stylesheet=document.createElement('style');stylesheet.setAttribute('type','text/css');this.animationName_='_ibani_'+Math.round(Math.random()*10000);var css='.'+this.animationName_+'{-webkit-animation-name:'+this.animationName_+';-webkit-animation-duration:0.5s;'+'-webkit-animation-iteration-count:1;}'+'@-webkit-keyframes '+this.animationName_+' {from {'+'-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% '+'{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}';stylesheet.textContent=css;document.getElementsByTagName('head')[0].appendChild(stylesheet);};InfoBubble.prototype.setBackgroundClassName=function(className){this.set('backgroundClassName',className);};InfoBubble.prototype['setBackgroundClassName']=InfoBubble.prototype.setBackgroundClassName;InfoBubble.prototype.backgroundClassName_changed=function(){this.content_.className=this.get('backgroundClassName');};InfoBubble.prototype['backgroundClassName_changed']=InfoBubble.prototype.backgroundClassName_changed;InfoBubble.prototype.setTabClassName=function(className){this.set('tabClassName',className);};InfoBubble.prototype['setTabClassName']=InfoBubble.prototype.setTabClassName;InfoBubble.prototype.tabClassName_changed=function(){this.updateTabStyles_();};InfoBubble.prototype['tabClassName_changed']=InfoBubble.prototype.tabClassName_changed;InfoBubble.prototype.getArrowStyle_=function(){return parseInt(this.get('arrowStyle'),10)||0;};InfoBubble.prototype.setArrowStyle=function(style){this.set('arrowStyle',style);};InfoBubble.prototype['setArrowStyle']=InfoBubble.prototype.setArrowStyle;InfoBubble.prototype.arrowStyle_changed=function(){this.arrowSize_changed();};InfoBubble.prototype['arrowStyle_changed']=InfoBubble.prototype.arrowStyle_changed;InfoBubble.prototype.getArrowSize_=function(){return parseInt(this.get('arrowSize'),10)||0;};InfoBubble.prototype.setArrowSize=function(size){this.set('arrowSize',size);};InfoBubble.prototype['setArrowSize']=InfoBubble.prototype.setArrowSize;InfoBubble.prototype.arrowSize_changed=function(){this.borderWidth_changed();};InfoBubble.prototype['arrowSize_changed']=InfoBubble.prototype.arrowSize_changed;InfoBubble.prototype.setArrowPosition=function(pos){this.set('arrowPosition',pos);};InfoBubble.prototype['setArrowPosition']=InfoBubble.prototype.setArrowPosition;InfoBubble.prototype.getArrowPosition_=function(){return parseInt(this.get('arrowPosition'),10)||0;};InfoBubble.prototype.arrowPosition_changed=function(){var pos=this.getArrowPosition_();this.arrowOuter_.style['left']=this.arrowInner_.style['left']=pos+'%';this.redraw_();};InfoBubble.prototype['arrowPosition_changed']=InfoBubble.prototype.arrowPosition_changed;InfoBubble.prototype.setZIndex=function(zIndex){this.set('zIndex',zIndex);};InfoBubble.prototype['setZIndex']=InfoBubble.prototype.setZIndex;InfoBubble.prototype.getZIndex=function(){return parseInt(this.get('zIndex'),10)||this.baseZIndex_;};InfoBubble.prototype.zIndex_changed=function(){var zIndex=this.getZIndex();this.bubble_.style['zIndex']=this.baseZIndex_=zIndex;this.close_.style['zIndex']=zIndex+1;};InfoBubble.prototype['zIndex_changed']=InfoBubble.prototype.zIndex_changed;InfoBubble.prototype.setShadowStyle=function(shadowStyle){this.set('shadowStyle',shadowStyle);};InfoBubble.prototype['setShadowStyle']=InfoBubble.prototype.setShadowStyle;InfoBubble.prototype.getShadowStyle_=function(){return parseInt(this.get('shadowStyle'),10)||0;};InfoBubble.prototype.shadowStyle_changed=function(){var shadowStyle=this.getShadowStyle_();var display='';var shadow='';var backgroundColor='';switch(shadowStyle){case 0:display='none';break;case 1:shadow='40px 15px 10px rgba(33,33,33,0.3)';backgroundColor='transparent';break;case 2:shadow='0 0 2px rgba(33,33,33,0.3)';backgroundColor='rgba(33,33,33,0.35)';break;}this.bubbleShadow_.style['boxShadow']=this.bubbleShadow_.style['webkitBoxShadow']=this.bubbleShadow_.style['MozBoxShadow']=shadow;this.bubbleShadow_.style['backgroundColor']=backgroundColor;if(this.isOpen_){this.bubbleShadow_.style['display']=display;this.draw();}};InfoBubble.prototype['shadowStyle_changed']=InfoBubble.prototype.shadowStyle_changed;InfoBubble.prototype.showCloseButton=function(){this.set('hideCloseButton',false);};InfoBubble.prototype['showCloseButton']=InfoBubble.prototype.showCloseButton;InfoBubble.prototype.hideCloseButton=function(){this.set('hideCloseButton',true);};InfoBubble.prototype['hideCloseButton']=InfoBubble.prototype.hideCloseButton;InfoBubble.prototype.hideCloseButton_changed=function(){this.close_.style['display']=this.get('hideCloseButton')?'none':'';};InfoBubble.prototype['hideCloseButton_changed']=InfoBubble.prototype.hideCloseButton_changed;InfoBubble.prototype.setBackgroundColor=function(color){if(color){this.set('backgroundColor',color);}};InfoBubble.prototype['setBackgroundColor']=InfoBubble.prototype.setBackgroundColor;InfoBubble.prototype.backgroundColor_changed=function(){var backgroundColor=this.get('backgroundColor');this.contentContainer_.style['backgroundColor']=backgroundColor;this.arrowInner_.style['borderColor']=backgroundColor+' transparent transparent';this.updateTabStyles_();};InfoBubble.prototype['backgroundColor_changed']=InfoBubble.prototype.backgroundColor_changed;InfoBubble.prototype.setBorderColor=function(color){if(color){this.set('borderColor',color);}};InfoBubble.prototype['setBorderColor']=InfoBubble.prototype.setBorderColor;InfoBubble.prototype.borderColor_changed=function(){var borderColor=this.get('borderColor');var contentContainer=this.contentContainer_;var arrowOuter=this.arrowOuter_;contentContainer.style['borderColor']=borderColor;arrowOuter.style['borderColor']=borderColor+' transparent transparent';contentContainer.style['borderStyle']=arrowOuter.style['borderStyle']=this.arrowInner_.style['borderStyle']='solid';this.updateTabStyles_();};InfoBubble.prototype['borderColor_changed']=InfoBubble.prototype.borderColor_changed;InfoBubble.prototype.setBorderRadius=function(radius){this.set('borderRadius',radius);};InfoBubble.prototype['setBorderRadius']=InfoBubble.prototype.setBorderRadius;InfoBubble.prototype.getBorderRadius_=function(){return parseInt(this.get('borderRadius'),10)||0;};InfoBubble.prototype.borderRadius_changed=function(){var borderRadius=this.getBorderRadius_();var borderWidth=this.getBorderWidth_();this.contentContainer_.style['borderRadius']=this.contentContainer_.style['MozBorderRadius']=this.contentContainer_.style['webkitBorderRadius']=this.bubbleShadow_.style['borderRadius']=this.bubbleShadow_.style['MozBorderRadius']=this.bubbleShadow_.style['webkitBorderRadius']=this.px(borderRadius);this.tabsContainer_.style['paddingLeft']=this.tabsContainer_.style['paddingRight']=this.px(borderRadius+borderWidth);this.redraw_();};InfoBubble.prototype['borderRadius_changed']=InfoBubble.prototype.borderRadius_changed;InfoBubble.prototype.getBorderWidth_=function(){return parseInt(this.get('borderWidth'),10)||0;};InfoBubble.prototype.setBorderWidth=function(width){this.set('borderWidth',width);};InfoBubble.prototype['setBorderWidth']=InfoBubble.prototype.setBorderWidth;InfoBubble.prototype.borderWidth_changed=function(){var borderWidth=this.getBorderWidth_();this.contentContainer_.style['borderWidth']=this.px(borderWidth);this.tabsContainer_.style['top']=this.px(borderWidth);this.updateArrowStyle_();this.updateTabStyles_();this.borderRadius_changed();this.redraw_();};InfoBubble.prototype['borderWidth_changed']=InfoBubble.prototype.borderWidth_changed;InfoBubble.prototype.updateArrowStyle_=function(){var borderWidth=this.getBorderWidth_();var arrowSize=this.getArrowSize_();var arrowStyle=this.getArrowStyle_();var arrowOuterSizePx=this.px(arrowSize);var arrowInnerSizePx=this.px(Math.max(0,arrowSize-borderWidth));var outer=this.arrowOuter_;var inner=this.arrowInner_;this.arrow_.style['marginTop']=this.px(-borderWidth);outer.style['borderTopWidth']=arrowOuterSizePx;inner.style['borderTopWidth']=arrowInnerSizePx;if(arrowStyle==0||arrowStyle==1){outer.style['borderLeftWidth']=arrowOuterSizePx;inner.style['borderLeftWidth']=arrowInnerSizePx;}else{outer.style['borderLeftWidth']=inner.style['borderLeftWidth']=0;}if(arrowStyle==0||arrowStyle==2){outer.style['borderRightWidth']=arrowOuterSizePx;inner.style['borderRightWidth']=arrowInnerSizePx;}else{outer.style['borderRightWidth']=inner.style['borderRightWidth']=0;}if(arrowStyle<2){outer.style['marginLeft']=this.px(-(arrowSize));inner.style['marginLeft']=this.px(-(arrowSize-borderWidth));}else{outer.style['marginLeft']=inner.style['marginLeft']=0;}if(borderWidth==0){outer.style['display']='none';}else{outer.style['display']='';}};InfoBubble.prototype.setPadding=function(padding){this.set('padding',padding);};InfoBubble.prototype['setPadding']=InfoBubble.prototype.setPadding;InfoBubble.prototype.getPadding_=function(){return parseInt(this.get('padding'),10)||0;};InfoBubble.prototype.padding_changed=function(){var padding=this.getPadding_();this.contentContainer_.style['padding']=this.px(padding);this.updateTabStyles_();this.redraw_();};InfoBubble.prototype['padding_changed']=InfoBubble.prototype.padding_changed;InfoBubble.prototype.px=function(num){if(num){return num+'px';}return num;};InfoBubble.prototype.addEvents_=function(){var events=['mousedown','mousemove','mouseover','mouseout','mouseup','mousewheel','DOMMouseScroll','touchstart','touchend','touchmove','dblclick','contextmenu','click'];var bubble=this.bubble_;this.listeners_=[];for(var i=0,event;event=events[i];i++){this.listeners_.push(google.maps.event.addDomListener(bubble,event,function(e){e.cancelBubble=true;if(e.stopPropagation){e.stopPropagation();}}));}};InfoBubble.prototype.onAdd=function(){if(!this.bubble_){this.buildDom_();}this.addEvents_();var panes=this.getPanes();if(panes){panes.floatPane.appendChild(this.bubble_);panes.floatShadow.appendChild(this.bubbleShadow_);}};InfoBubble.prototype['onAdd']=InfoBubble.prototype.onAdd;InfoBubble.prototype.draw=function(){var projection=this.getProjection();if(!projection){return;}var latLng=(this.get('position'));if(!latLng){this.close();return;}var tabHeight=0;if(this.activeTab_){tabHeight=this.activeTab_.offsetHeight;}var anchorHeight=this.getAnchorHeight_();var arrowSize=this.getArrowSize_();var arrowPosition=this.getArrowPosition_();arrowPosition=arrowPosition/100;var pos=projection.fromLatLngToDivPixel(latLng);var width=this.contentContainer_.offsetWidth;var height=this.bubble_.offsetHeight;if(!width){return;}var top=pos.y-(height+arrowSize);if(anchorHeight){top-=anchorHeight;}var left=pos.x-(width*arrowPosition);this.bubble_.style['top']=this.px(top);this.bubble_.style['left']=this.px(left);var shadowStyle=parseInt(this.get('shadowStyle'),10);switch(shadowStyle){case 1:this.bubbleShadow_.style['top']=this.px(top+tabHeight-1);this.bubbleShadow_.style['left']=this.px(left);this.bubbleShadow_.style['width']=this.px(width);this.bubbleShadow_.style['height']=this.px(this.contentContainer_.offsetHeight-arrowSize);break;case 2:width=width*0.8;if(anchorHeight){this.bubbleShadow_.style['top']=this.px(pos.y);}else{this.bubbleShadow_.style['top']=this.px(pos.y+arrowSize);}this.bubbleShadow_.style['left']=this.px(pos.x-width*arrowPosition);this.bubbleShadow_.style['width']=this.px(width);this.bubbleShadow_.style['height']=this.px(2);break;}};InfoBubble.prototype['draw']=InfoBubble.prototype.draw;InfoBubble.prototype.onRemove=function(){if(this.bubble_&&this.bubble_.parentNode){this.bubble_.parentNode.removeChild(this.bubble_);}if(this.bubbleShadow_&&this.bubbleShadow_.parentNode){this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);}for(var i=0,listener;listener=this.listeners_[i];i++){google.maps.event.removeListener(listener);}};InfoBubble.prototype['onRemove']=InfoBubble.prototype.onRemove;InfoBubble.prototype.isOpen=function(){return this.isOpen_;};InfoBubble.prototype['isOpen']=InfoBubble.prototype.isOpen;InfoBubble.prototype.close=function(){if(this.bubble_){this.bubble_.style['display']='none';this.bubble_.className=this.bubble_.className.replace(this.animationName_,'');}if(this.bubbleShadow_){this.bubbleShadow_.style['display']='none';this.bubbleShadow_.className=this.bubbleShadow_.className.replace(this.animationName_,'');}this.isOpen_=false;};InfoBubble.prototype['close']=InfoBubble.prototype.close;InfoBubble.prototype.open=function(opt_map,opt_anchor){var that=this;window.setTimeout(function(){that.open_(opt_map,opt_anchor);},0);};InfoBubble.prototype.open_=function(opt_map,opt_anchor){this.updateContent_();if(opt_map){this.setMap(opt_map);}if(opt_anchor){this.set('anchor',opt_anchor);this.bindTo('anchorPoint',opt_anchor);this.bindTo('position',opt_anchor);}this.bubble_.style['display']=this.bubbleShadow_.style['display']='';var animation=!this.get('disableAnimation');if(animation){this.bubble_.className+=' '+this.animationName_;this.bubbleShadow_.className+=' '+this.animationName_;}this.redraw_();this.isOpen_=true;var pan=!this.get('disableAutoPan');if(pan){var that=this;window.setTimeout(function(){that.panToView();},200);}};InfoBubble.prototype['open']=InfoBubble.prototype.open;InfoBubble.prototype.setPosition=function(position){if(position){this.set('position',position);}};InfoBubble.prototype['setPosition']=InfoBubble.prototype.setPosition;InfoBubble.prototype.getPosition=function(){return(this.get('position'));};InfoBubble.prototype['getPosition']=InfoBubble.prototype.getPosition;InfoBubble.prototype.position_changed=function(){this.draw();};InfoBubble.prototype['position_changed']=InfoBubble.prototype.position_changed;InfoBubble.prototype.panToView=function(){var projection=this.getProjection();if(!projection){return;}if(!this.bubble_){return;}var anchorHeight=this.getAnchorHeight_();var height=this.bubble_.offsetHeight+anchorHeight;var map=this.get('map');var mapDiv=map.getDiv();var mapHeight=mapDiv.offsetHeight;var latLng=this.getPosition();var centerPos=projection.fromLatLngToContainerPixel(map.getCenter());var pos=projection.fromLatLngToContainerPixel(latLng);var spaceTop=centerPos.y-height;var spaceBottom=mapHeight-centerPos.y;var needsTop=spaceTop<0;var deltaY=0;if(needsTop){spaceTop*=-1;deltaY=(spaceTop+spaceBottom)/2;}pos.y-=deltaY;latLng=projection.fromContainerPixelToLatLng(pos);if(map.getCenter()!=latLng){map.panTo(latLng);}};InfoBubble.prototype['panToView']=InfoBubble.prototype.panToView;InfoBubble.prototype.htmlToDocumentFragment_=function(htmlString){htmlString=htmlString.replace(/^\s*([\S\s]*)\b\s*$/,'$1');var tempDiv=document.createElement('DIV');tempDiv.innerHTML=htmlString;if(tempDiv.childNodes.length==1){return(tempDiv.removeChild(tempDiv.firstChild));}else{var fragment=document.createDocumentFragment();while(tempDiv.firstChild){fragment.appendChild(tempDiv.firstChild);}return fragment;}};InfoBubble.prototype.removeChildren_=function(node){if(!node){return;}var child;while(child=node.firstChild){node.removeChild(child);}};InfoBubble.prototype.setContent=function(content){this.set('content',content);};InfoBubble.prototype['setContent']=InfoBubble.prototype.setContent;InfoBubble.prototype.getContent=function(){return(this.get('content'));};InfoBubble.prototype['getContent']=InfoBubble.prototype.getContent;InfoBubble.prototype.updateContent_=function(){if(!this.content_){return;}this.removeChildren_(this.content_);var content=this.getContent();if(content){if(typeof content=='string'){content=this.htmlToDocumentFragment_(content);}this.content_.appendChild(content);var that=this;var images=this.content_.getElementsByTagName('IMG');for(var i=0,image;image=images[i];i++){google.maps.event.addDomListener(image,'load',function(){that.imageLoaded_();});}google.maps.event.trigger(this,'domready');}this.redraw_();};InfoBubble.prototype.imageLoaded_=function(){var pan=!this.get('disableAutoPan');this.redraw_();if(pan&&(this.tabs_.length==0||this.activeTab_.index==0)){this.panToView();}};InfoBubble.prototype.updateTabStyles_=function(){if(this.tabs_&&this.tabs_.length){for(var i=0,tab;tab=this.tabs_[i];i++){this.setTabStyle_(tab.tab);}this.activeTab_.style['zIndex']=this.baseZIndex_;var borderWidth=this.getBorderWidth_();var padding=this.getPadding_()/2;this.activeTab_.style['borderBottomWidth']=0;this.activeTab_.style['paddingBottom']=this.px(padding+borderWidth);}};InfoBubble.prototype.setTabStyle_=function(tab){var backgroundColor=this.get('backgroundColor');var borderColor=this.get('borderColor');var borderRadius=this.getBorderRadius_();var borderWidth=this.getBorderWidth_();var padding=this.getPadding_();var marginRight=this.px(-(Math.max(padding,borderRadius)));var borderRadiusPx=this.px(borderRadius);var index=this.baseZIndex_;if(tab.index){index-=tab.index;}var styles={'cssFloat':'left','position':'relative','cursor':'pointer','backgroundColor':backgroundColor,'border':this.px(borderWidth)+' solid '+borderColor,'padding':this.px(padding/2)+' '+this.px(padding),'marginRight':marginRight,'whiteSpace':'nowrap','borderRadiusTopLeft':borderRadiusPx,'MozBorderRadiusTopleft':borderRadiusPx,'webkitBorderTopLeftRadius':borderRadiusPx,'borderRadiusTopRight':borderRadiusPx,'MozBorderRadiusTopright':borderRadiusPx,'webkitBorderTopRightRadius':borderRadiusPx,'zIndex':index,'display':'inline'};for(var style in styles){tab.style[style]=styles[style];}var className=this.get('tabClassName');if(className!=undefined){tab.className+=' '+className;}};InfoBubble.prototype.addTabActions_=function(tab){var that=this;tab.listener_=google.maps.event.addDomListener(tab,'click',function(){that.setTabActive_(this);});};InfoBubble.prototype.setTabActive=function(index){var tab=this.tabs_[index-1];if(tab){this.setTabActive_(tab.tab);}};InfoBubble.prototype['setTabActive']=InfoBubble.prototype.setTabActive;InfoBubble.prototype.setTabActive_=function(tab){if(!tab){this.setContent('');this.updateContent_();return;}var padding=this.getPadding_()/2;var borderWidth=this.getBorderWidth_();if(this.activeTab_){var activeTab=this.activeTab_;activeTab.style['zIndex']=this.baseZIndex_-activeTab.index;activeTab.style['paddingBottom']=this.px(padding);activeTab.style['borderBottomWidth']=this.px(borderWidth);}tab.style['zIndex']=this.baseZIndex_;tab.style['borderBottomWidth']=0;tab.style['marginBottomWidth']='-10px';tab.style['paddingBottom']=this.px(padding+borderWidth);this.setContent(this.tabs_[tab.index].content);this.updateContent_();this.activeTab_=tab;this.redraw_();};InfoBubble.prototype.setMaxWidth=function(width){this.set('maxWidth',width);};InfoBubble.prototype['setMaxWidth']=InfoBubble.prototype.setMaxWidth;InfoBubble.prototype.maxWidth_changed=function(){this.redraw_();};InfoBubble.prototype['maxWidth_changed']=InfoBubble.prototype.maxWidth_changed;InfoBubble.prototype.setMaxHeight=function(height){this.set('maxHeight',height);};InfoBubble.prototype['setMaxHeight']=InfoBubble.prototype.setMaxHeight;InfoBubble.prototype.maxHeight_changed=function(){this.redraw_();};InfoBubble.prototype['maxHeight_changed']=InfoBubble.prototype.maxHeight_changed;InfoBubble.prototype.setMinWidth=function(width){this.set('minWidth',width);};InfoBubble.prototype['setMinWidth']=InfoBubble.prototype.setMinWidth;InfoBubble.prototype.minWidth_changed=function(){this.redraw_();};InfoBubble.prototype['minWidth_changed']=InfoBubble.prototype.minWidth_changed;InfoBubble.prototype.setMinHeight=function(height){this.set('minHeight',height);};InfoBubble.prototype['setMinHeight']=InfoBubble.prototype.setMinHeight;InfoBubble.prototype.minHeight_changed=function(){this.redraw_();};InfoBubble.prototype['minHeight_changed']=InfoBubble.prototype.minHeight_changed;InfoBubble.prototype.addTab=function(label,content){var tab=document.createElement('DIV');tab.innerHTML=label;this.setTabStyle_(tab);this.addTabActions_(tab);this.tabsContainer_.appendChild(tab);this.tabs_.push({label:label,content:content,tab:tab});tab.index=this.tabs_.length-1;tab.style['zIndex']=this.baseZIndex_-tab.index;if(!this.activeTab_){this.setTabActive_(tab);}tab.className=tab.className+' '+this.animationName_;this.redraw_();};InfoBubble.prototype['addTab']=InfoBubble.prototype.addTab;InfoBubble.prototype.updateTab=function(index,opt_label,opt_content){if(!this.tabs_.length||index<0||index>=this.tabs_.length){return;}var tab=this.tabs_[index];if(opt_label!=undefined){tab.tab.innerHTML=tab.label=opt_label;}if(opt_content!=undefined){tab.content=opt_content;}if(this.activeTab_==tab.tab){this.setContent(tab.content);this.updateContent_();}this.redraw_();};InfoBubble.prototype['updateTab']=InfoBubble.prototype.updateTab;InfoBubble.prototype.removeTab=function(index){if(!this.tabs_.length||index<0||index>=this.tabs_.length){return;}var tab=this.tabs_[index];tab.tab.parentNode.removeChild(tab.tab);google.maps.event.removeListener(tab.tab.listener_);this.tabs_.splice(index,1);delete tab;for(var i=0,t;t=this.tabs_[i];i++){t.tab.index=i;}if(tab.tab==this.activeTab_){if(this.tabs_[index]){this.activeTab_=this.tabs_[index].tab;}else if(this.tabs_[index-1]){this.activeTab_=this.tabs_[index-1].tab;}else{this.activeTab_=undefined;}this.setTabActive_(this.activeTab_);}this.redraw_();};InfoBubble.prototype['removeTab']=InfoBubble.prototype.removeTab;InfoBubble.prototype.getElementSize_=function(element,opt_maxWidth,opt_maxHeight){var sizer=document.createElement('DIV');sizer.style['display']='inline';sizer.style['position']='absolute';sizer.style['visibility']='hidden';if(typeof element=='string'){sizer.innerHTML=element;}else{sizer.appendChild(element.cloneNode(true));}document.body.appendChild(sizer);var size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);if(opt_maxWidth&&size.width>opt_maxWidth){sizer.style['width']=this.px(opt_maxWidth);size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);}if(opt_maxHeight&&size.height>opt_maxHeight){sizer.style['height']=this.px(opt_maxHeight);size=new google.maps.Size(sizer.offsetWidth,sizer.offsetHeight);}document.body.removeChild(sizer);delete sizer;return size;};InfoBubble.prototype.redraw_=function(){this.figureOutSize_();this.positionCloseButton_();this.draw();};InfoBubble.prototype.figureOutSize_=function(){var map=this.get('map');if(!map){return;}var padding=this.getPadding_();var borderWidth=this.getBorderWidth_();var borderRadius=this.getBorderRadius_();var arrowSize=this.getArrowSize_();var mapDiv=map.getDiv();var gutter=arrowSize*2;var mapWidth=mapDiv.offsetWidth-gutter;var mapHeight=mapDiv.offsetHeight-gutter-this.getAnchorHeight_();var tabHeight=0;var width=(this.get('minWidth')||0);var height=(this.get('minHeight')||0);var maxWidth=(this.get('maxWidth')||0);var maxHeight=(this.get('maxHeight')||0);maxWidth=Math.min(mapWidth,maxWidth);maxHeight=Math.min(mapHeight,maxHeight);var tabWidth=0;if(this.tabs_.length){for(var i=0,tab;tab=this.tabs_[i];i++){var tabSize=this.getElementSize_(tab.tab,maxWidth,maxHeight);var contentSize=this.getElementSize_(tab.content,maxWidth,maxHeight);if(width<tabSize.width){width=tabSize.width;}tabWidth+=tabSize.width;if(height<tabSize.height){height=tabSize.height;}if(tabSize.height>tabHeight){tabHeight=tabSize.height;}if(width<contentSize.width){width=contentSize.width;}if(height<contentSize.height){height=contentSize.height;}}}else{var content=(this.get('content'));if(typeof content=='string'){content=this.htmlToDocumentFragment_(content);}if(content){var contentSize=this.getElementSize_(content,maxWidth,maxHeight);if(width<contentSize.width){width=contentSize.width;}if(height<contentSize.height){height=contentSize.height;}}}if(maxWidth){width=Math.min(width,maxWidth);}if(maxHeight){height=Math.min(height,maxHeight);}width=Math.max(width,tabWidth);if(width==tabWidth){width=width+2*padding;}arrowSize=arrowSize*2;width=Math.max(width,arrowSize);if(width>mapWidth){width=mapWidth;}if(height>mapHeight){height=mapHeight-tabHeight;}if(this.tabsContainer_){this.tabHeight_=tabHeight;this.tabsContainer_.style['width']=this.px(tabWidth);}this.contentContainer_.style['width']=this.px(width);this.contentContainer_.style['height']=this.px(height);};InfoBubble.prototype.getAnchorHeight_=function(){var anchor=this.get('anchor');if(anchor){var anchorPoint=(this.get('anchorPoint'));if(anchorPoint){return-1*anchorPoint.y;}}return 0;};InfoBubble.prototype.anchorPoint_changed=function(){this.draw();};InfoBubble.prototype['anchorPoint_changed']=InfoBubble.prototype.anchorPoint_changed;InfoBubble.prototype.positionCloseButton_=function(){var br=this.getBorderRadius_();var bw=this.getBorderWidth_();var right=2;var top=2;if(this.tabs_.length&&this.tabHeight_){top+=this.tabHeight_;}top+=bw;right+=bw;var c=this.contentContainer_;if(c&&c.clientHeight<c.scrollHeight){right+=15;}this.close_.style['right']=this.px(13);this.close_.style['top']=this.px(13);};

var id_ambito_strutture_ricettive = "5ecf15a6a5233c75832c4490eb3724d4";
//var http_target_ws = "http://mobile.alexala.enesi.it";
//var www_url = "sid2.enesi.it";
var http_target_ws = "http://m.alexala.it";
var www_url = "sid.alexala.it";
var limit_da_mostrare = 8;

var localizable_ita = new Array();

localizable_ita["menu-eventi"] = "Eventi";
localizable_ita["header-eventi"] = "Eventi";
localizable_ita["preferitiRisorse-eventi"] = "Eventi";
localizable_ita["preferitiRisorse-risorse"] = "Risorse";
localizable_ita["preferitiEventi-eventi"] = "Eventi";
localizable_ita["preferitiEventi-risorse"] = "Risorse";
localizable_ita["menu-dove-dormire"] = "Dove dormire";
localizable_ita["menu-preferiti"] = "Preferiti";
localizable_ita["titolo-preferiti"] = "Preferiti";
localizable_ita["titolo-preferiti-2"] = "Preferiti";
localizable_ita["menu-ricerca"] = "Ricerca";
localizable_ita["menu-contatti"] = "Contatti";
localizable_ita["find-us-on"]="Puoi trovarci su";
localizable_ita["find-us-on-contatti"]="Puoi trovarci su";
localizable_ita["carica-altri-post"]="carica altri&hellip;";
localizable_ita["carica-altri-gallery"]="carica altre";
localizable_ita["contatto-text"]="Agenzia di Accoglienza e Promozione Turistica Locale della provincia di Alessandria";
localizable_ita["indirizzo-di-partenza"]="Indirizzo di partenza:";
localizable_ita["la-tua-posizione"]="La tua posizione:";
localizable_ita["usa-posizione-attuale"]="Usa la tua posizione attuale";
localizable_ita["aggiorna-posizione"]="Aggiorna la tua posizione";
localizable_ita["immetti-indirizzo"]="Immetti indirizzo manualmente";
localizable_ita["btnSetPosition"]="Salva e continua";

var localizable_eng = new Array();

localizable_eng["menu-eventi"] = "Events";
localizable_eng["header-eventi"] = "Events";
localizable_eng["preferitiRisorse-eventi"] = "Events";
localizable_eng["preferitiRisorse-risorse"] = "Resources";
localizable_eng["preferitiEventi-eventi"] = "Events";
localizable_eng["preferitiEventi-risorse"] = "Resources";
localizable_eng["menu-dove-dormire"] = "Accommodation";
localizable_eng["menu-preferiti"] = "Favorites";
localizable_eng["titolo-preferiti"] = "Favorites";
localizable_eng["titolo-preferiti-2"] = "Favorites";
localizable_eng["menu-ricerca"] = "Search";
localizable_eng["menu-contatti"] = "Contacts";
localizable_eng["find-us-on"]="Find us on";
localizable_eng["find-us-on-contatti"]="Find us on";
localizable_eng["carica-altri-post"]="load more&hellip;";
localizable_eng["carica-altri-gallery"]="load more";
localizable_eng["contatto-text"]="Agenzia di Accoglienza e Promozione Turistica Locale della provincia di Alessandria";
localizable_eng["indirizzo-di-partenza"]="Starting address:";
localizable_eng["la-tua-posizione"]="Your position:";
localizable_eng["usa-posizione-attuale"]="Use your current position";
localizable_eng["aggiorna-posizione"]="Update your position";
localizable_eng["immetti-indirizzo"]="Enter address manually";
localizable_eng["btnSetPosition"]="Save and continue";

var localizable_fra = new Array();

localizable_fra["menu-eventi"] = "&Eacute;v&eacute;nements ";
localizable_fra["header-eventi"] = "&Eacute;v&eacute;nements";
localizable_fra["preferitiRisorse-eventi"] = "&Eacute;v&eacute;nements";
localizable_fra["preferitiRisorse-risorse"] = "P.O.I.";
localizable_fra["preferitiEventi-eventi"] = "&Eacute;v&eacute;nements";
localizable_fra["preferitiEventi-risorse"] = "P.O.I.";
localizable_fra["menu-dove-dormire"] = "H&eacute;bergement";
localizable_fra["menu-preferiti"] = "Favoris";
localizable_fra["titolo-preferiti"] = "Favoris";
localizable_fra["titolo-preferiti-2"] = "Favoris";
localizable_fra["menu-ricerca"] = "Rechercher";
localizable_fra["menu-contatti"] = "Contacts";
localizable_fra["find-us-on"]="Vous pouvez nous trouver sur";
localizable_fra["find-us-on-contatti"]="Vous pouvez nous trouver sur";
localizable_fra["carica-altri-post"]="charger plus&hellip;";
localizable_fra["carica-altri-gallery"]="charger plus";
localizable_fra["contatto-text"]="Agenzia di Accoglienza e Promozione Turistica Locale della provincia di Alessandria";
localizable_fra["indirizzo-di-partenza"]="Adresse de d&eacute;part:";
localizable_fra["la-tua-posizione"]="Votre position:";
localizable_fra["usa-posizione-attuale"]="Utilisez votre position actuelle";
localizable_fra["aggiorna-posizione"]="Mettez &agrave; jour votre emplacement";
localizable_fra["immetti-indirizzo"]="Entrez l'adresse manuellement";
localizable_fra["btnSetPosition"]="Enregistrer et continuer";

var localizable_deu = new Array();

localizable_deu["menu-eventi"] = "Geschehen";
localizable_deu["header-eventi"] = "Geschehen";
localizable_deu["preferitiRisorse-eventi"] = "Geschehen";
localizable_deu["preferitiRisorse-risorse"] = "P.O.I.";
localizable_deu["preferitiEventi-eventi"] = "Geschehen";
localizable_deu["preferitiEventi-risorse"] = "P.O.I.";
localizable_deu["menu-dove-dormire"] = "Unterkunft";
localizable_deu["menu-preferiti"] = "Favoriten";
localizable_deu["titolo-preferiti"] = "Favoriten";
localizable_deu["titolo-preferiti-2"] = "Favoriten";
localizable_deu["menu-ricerca"] = "Suche";
localizable_deu["menu-contatti"] = "Kontakte";
localizable_deu["find-us-on"]="Sie k&ouml;nnen uns auf Sie ";
localizable_deu["find-us-on-contatti"]="Sie k&ouml;nnen uns auf Sie ";
localizable_deu["carica-altri-post"]="Legen Sie immer&hellip;";
localizable_deu["carica-altri-gallery"]="Legen Sie immer";
localizable_deu["contatto-text"]="Agenzia di Accoglienza e Promozione Turistica Locale della provincia di Alessandria";
localizable_deu["indirizzo-di-partenza"]="Startadresse:";
localizable_deu["la-tua-posizione"]="Ihr Standort:";
localizable_deu["usa-posizione-attuale"]="Verwenden Sie Ihren aktuellen Standort";
localizable_deu["aggiorna-posizione"]="Aktualisieren Sie Ihren Standort";
localizable_deu["immetti-indirizzo"]="Geben Sie manuell adressieren";
localizable_deu["btnSetPosition"]="Speichern und Fortfahren";

var labellang = new Array();

labellang["ita"] = {
	"devi_essere_connesso":"ATTENZIONE! Devi essere connesso ad internet per poter visualizzare la sezione desiderata",
	"indietro": "Indietro",
	"mappa": "Mappa",
	"lista":"Lista",
	"scheda":"Scheda",
	"ottengo_posizione": "Ottengo posizione",
        "aggiorno_posizione":"Aggiorno posizione",
        "indirizzo_non_valido":"Non e' stato inserito un indirizzo valido",
	"seleziona_almeno_una_categoria":"Seleziona almeno una categoria per effettuare la ricerca",
	"contatto_salvato":"Contatto salvato",
	"contatto_gia_presente":"Contatto gia' presente",
	"categoria":"Categoria",
	"indirizzo":"Indirizzo",
	"telefono":"Telefono",
	"n_stelle":"N&deg; Stelle",
	"prezzo_giornaliero_doppia":"Prezzo giornaliero camera doppia con bagno in alta stagione",
	"da":"da",
	"a":"a",
	"numero":"Numero",
	"difficolta":"Difficolt&agrave;",
	"lunghezza_km":"Lunghezza KM",
	"tempo_percorrenza":"Tempo percorrenza",
	"dislivello_in_metri":"Dislivello in metri",
	"tipologia_bicicletta":"Tipologia bicicletta",
	"chiama":"Chiama",
	"aggiungi_ai_preferiti":"Aggiungi ai Preferiti",
	"rimuovi_dai_preferiti":"Rimuovi dai Preferiti",
	"aggiungi_a_rubrica": "Aggiungi a Rubrica",
	"tipologia_evento": "Tipologia Evento",
	"date_evento":"date evento",
	"nessun_evento":"Nessun evento presente nei preferiti",
	"nessuna_risorsa":"Nessuna risorsa presente nei preferiti",
	"dove_dormire":"Dove dormire"
};

labellang["eng"] = {
	"devi_essere_connesso":"WARNING! You must be connected to Internet to view the desired section",
	"indietro": "Back",
	"mappa": "Map",
	"lista":"List",
	"scheda":"Sheet",
	"ottengo_posizione": "Retrieving Position",
        "aggiorno_posizione":"Updating position",
        "indirizzo_non_valido":"Not entered a valid address",
	"seleziona_almeno_una_categoria":"Select at least one category to search",
	"contatto_salvato":"Contact saved",
	"contatto_gia_presente":"Contact already 'present",
	"categoria":"Category",
	"indirizzo":"Address",
	"telefono":"Phone",
	"n_stelle":"N&deg; Stars",
	"prezzo_giornaliero_doppia":"Daily price double room with bathroom in high season",
	"da":"from",
	"a":"to",
	"numero":"Number",
	"difficolta":"Difficulty",
	"lunghezza_km":"Lenght Km",
	"tempo_percorrenza":"Journey time",
	"dislivello_in_metri":"Difference in height",
	"tipologia_bicicletta":"Kind of bike",
	"chiama":"Call",
	"aggiungi_ai_preferiti":"Add to Favorites",
	"rimuovi_dai_preferiti":"Remove from Favorites",
	"aggiungi_a_rubrica": "Add to Contacts",
	"tipologia_evento": "Event Type",
	"date_evento":"event dates",
	"nessun_evento":"No events already in Favorites",
	"nessuna_risorsa":"No resources already in Favourites",
	"dove_dormire":"Accommodation"
};

labellang["fra"] = {
	"devi_essere_connesso":"ATTENTION! Vous devez &ecirc;tre connect&eacute; &agrave; Internet pour afficher la section d&eacute;sir&eacute;e ",
	"indietro": "Arrière ",
	"mappa": "Carte",
	"lista":"Liste",
	"scheda":"Détails ",
	"ottengo_posizione": "Obtenir la position",
        "aggiorno_posizione":"Mise à jour de la position ",
        "indirizzo_non_valido":"Vous n'avez pas entré une adresse valide  ",
	"seleziona_almeno_una_categoria":"Sélectionnez au moins une catégorie de recherche  ",
	"contatto_salvato":"Contact enregistré  ",
	"contatto_gia_presente":"Contactez déjà  ",
	"categoria":"Catégorie",
	"indirizzo":"Adresse",
	"telefono":"Téléphone ",
	"n_stelle":"étoiles",
	"prezzo_giornaliero_doppia":"Chambre Prix par jour double avec salle de bains en haute saison",
	"da":"de",
	"a":"à",
	"numero":"Nombre",
	"difficolta":"Difficultè",
	"lunghezza_km":"Longuerur Km",
	"tempo_percorrenza":"Temps de trajet",
	"dislivello_in_metri":"Différence de hauteur ",
	"tipologia_bicicletta":"Type de vélo ",
	"chiama":"Appeler",
	"aggiungi_ai_preferiti":"Ajouter aux Favoris",
	"rimuovi_dai_preferiti":"Retirer des favoris",
	"aggiungi_a_rubrica": "Ajouter aux contacts",
	"tipologia_evento": "Type d'événement ",
	"date_evento":"les dates des événements ",
	"nessun_evento":"Aucun événement ce dans mes favoris ",
	"nessuna_risorsa":"Aucune ressource déjà en favoris ",
	"dove_dormire":"Hébergement"
};

labellang["deu"] = {
	"devi_essere_connesso":"WARNUNG! Sie müssen mit dem Internet verbunden werden, um den gewünschten Bereich zu sehen ",
	"indietro": "Zurück  ",
	"mappa": "Karte",
	"lista":"Liste",
	"scheda":"Details",
	"ottengo_posizione": "Holen Position",
        "aggiorno_posizione":"Aktualisieren Position",
        "indirizzo_non_valido":"Sie haben keine gültige Adresse eingegeben  ",
	"seleziona_almeno_una_categoria":"Wählen Sie mindestens eine Kategorie zu suchen ",
	"contatto_salvato":"Kontakt gespeichert",
	"contatto_gia_presente":"Kontakt bereits",
	"categoria":"Kategorie",
	"indirizzo":"Adresse",
	"telefono":"Telefon",
	"n_stelle":"Sterne",
	"prezzo_giornaliero_doppia":"Tagespreis Doppelzimmer mit Bad in der Hochsaison",
	"da":"von",
	"a":"aus",
	"numero":"Anzahl",
	"difficolta":"Schwierigkeiten",
	"lunghezza_km":"Länge Km  ",
	"tempo_percorrenza":"Fahrzeit",
	"dislivello_in_metri":"Höhenunterschied ",
	"tipologia_bicicletta":"Art von Fahrrad",
	"chiama":"Rufen",
	"aggiungi_ai_preferiti":"Zu Favoriten hinzufügen  ",
	"rimuovi_dai_preferiti":"Aus Favoriten entfernen",
	"aggiungi_a_rubrica": "Zu Kontakten hinzufügen ",
	"tipologia_evento": "Ereignistyp",
	"date_evento":"Veranstaltungstermine",
	"nessun_evento":"Keine Veranstaltung in diesem zu meinen Favoriten hinzufügen ",
	"nessuna_risorsa":"Keine Ressourcen bereits in Favoriten",
	"dove_dormire":"Unterkunft"
};


var cur_lang = "";
