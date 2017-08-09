




            app.initialize();
        










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


$(document).bind("mobileinit", function() {
	//$.extend($.mobile, {
	$.extend($.mobile.page.prototype.options, {
		backBtnText: "Indietro",
		addBackBtn: true,
		headerTheme: 'b',
		footerTheme: 'b'
		// Navigation
		/*
	    $.mobile.page.prototype.options.backBtnText: "Indietro",
	    $.mobile.page.prototype.options.addBackBtn: true
	    $.mobile.page.prototype.options.backBtnTheme    = "d";

	    // Page
	    $.mobile.page.prototype.options.headerTheme = "a";  // Page header only
	    $.mobile.page.prototype.options.contentTheme    = "c";
	    $.mobile.page.prototype.options.footerTheme = "a";

	    // Listviews
	    $.mobile.listview.prototype.options.headerTheme = "a";  // Header for nested lists
	    $.mobile.listview.prototype.options.theme           = "c";  // List items / content
	    $.mobile.listview.prototype.options.dividerTheme    = "d";  // List divider

	    $.mobile.listview.prototype.options.splitTheme   = "c";
	    $.mobile.listview.prototype.options.countTheme   = "c";
	    $.mobile.listview.prototype.options.filterTheme = "c";
	    $.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
	    */
	});
});


$(document).ready(function(){
  // define the application
  var ViaAdda = {};
  (function(app){
      // variable definitions go here
      app.init = function(){
          //host = 'http://localhost:8000';
          host = 'http://viaadda.mosta.webfactional.com';
          EDIZIONE = 24; // edizione corrente
          app.bindings();
          userLogged = false;
          csrf_token = "";
          formazione_id = 0;
          rosa = {};
      
      }
      app.bindings = function(){
          // elenco dei bind, ossia delle funzioni richiamate dopo qualche evento
          $("#calendarioPage").bind("pagebeforecreate", app.updateCalendario);
          $("#homePage").bind("pageshow", app.updateHome);
          $("#formazionePage").bind("pagebeforeshow", app.updateFormazione);
          $("#panchinariPage").bind("pagebeforeshow", app.updatePanchinari);
          $("#loginPage").bind("pageshow", app.updateLogin);
          $("#logoutPage").bind("pagebeforeshow", app.updateLogout);
          $("#partitaPage").bind("pageshow", app.updatePartita);
          $("#classificaPage").bind("pagebeforecreate", app.updateClassifica);
      }
      app.updateCalendario = function(e) {
          var records = "";
          $.get('http://viaadda.mosta.webfactional.com/competizione/10/calendario/', {}, function(res,code) {
              var tags = ""
              var partite = [];
              var partita = undefined;
              var records = res.rows;
              for (var i = 0; i < records.length; i++) {
                  turno = records[i]['turno_giornata'];
                  if (partite[turno] == undefined) {
                      partite[turno] = [];
                  }
                  partite[turno].push(records[i]);
              }
              // remove first element and then reverse the array to show the matches from the last day to the first one.
              partite.splice(0, 1);
              partite = partite.reverse();
              // prima cicla su tutte le giornate
              for (var i = 0; i < partite.length; i++) {
                  tags += "<li data-role=\"list-divider\">" + partite[i][0]['turno_giornata'] + ".a giornata</li>";
                  //tags += "Nuova giornata";
                  // per ogni giornata, cicla su tutte le partite
                  for (var y = 0; y < partite[i].length; y++) {
                      partita = partite[i][y];
                      tags+="<li><a href=\"#partitaPage?id=" + partita['id'] +"\">" + partita['allenatore_casa'] + " - " + partita['allenatore_ospite'] 
                      + ": " + partita['gol_casa'] + " - " + partita['gol_ospite'] + " (" + partita['punteggio_casa'] + " - " + partita['punteggio_ospite'] + ")</a></li>";
                  }
              }
              $("#calendarioList").html(tags).listview("refresh");
          }, "json");
      }
      app.updatePartita = function(e) {
          var thisPage = $(this);
          // var thisUrl = thisPage.data("url");
          var thisUrl = $(".ui-page-active").attr("data-url");
          var thisId = thisUrl.split("=")[1];
          $.get('http://viaadda.mosta.webfactional.com/partita/' + thisId + '/dettagli/', {}, function(res,code) {
              var tags = ""
              var records = res.data;
              var giocatore = undefined;
              var allenatore_casa = records['allenatore_casa'];
              var allenatore_ospite = records['allenatore_ospite'];
              $("h1",thisPage).text(allenatore_casa + " - " + allenatore_ospite);
              
              tags += "<li data-role=\"list-divider\">" + allenatore_casa + " - titolari</li>";
              for (var i = 0; i < records['formazione_casa']['titolari'].length; i++) {
                  giocatore = records['formazione_casa']['titolari'][i];
                  classe_giocatore = giocatore['giocante']?'giocante':'non_giocante';
                  tags+="<li class=\"" + classe_giocatore + "\">" + giocatore['nome'] + ": " + giocatore['punteggio'] + " " + giocatore['descrizione_punteggio'] + "</li>";
              }
              tags += "<li data-role=\"list-divider\">" + allenatore_casa + " - riserve</li>";
              for (var i = 0; i < records['formazione_casa']['riserve'].length; i++) {
                  giocatore = records['formazione_casa']['riserve'][i];
                  classe_giocatore = giocatore['giocante']?'giocante':'non_giocante';
                  tags+="<li class=\"" + classe_giocatore + "\">" + giocatore['nome'] + ": " + giocatore['punteggio'] + " " + giocatore['descrizione_punteggio'] + "</li>";
              }
              tags += "<li data-role=\"list-divider\">" + allenatore_ospite + " - titolari</li>";
              for (var i = 0; i < records['formazione_ospite']['titolari'].length; i++) {
                  giocatore = records['formazione_ospite']['titolari'][i];
                  classe_giocatore = giocatore['giocante']?'giocante':'non_giocante';
                  tags+="<li class=\"" + classe_giocatore + "\">" + giocatore['nome'] + ": " + giocatore['punteggio'] + " " + giocatore['descrizione_punteggio'] + "</li>";
              }
              tags += "<li data-role=\"list-divider\">" + allenatore_ospite + " - riserve</li>";
              for (var i = 0; i < records['formazione_ospite']['riserve'].length; i++) {
                  giocatore = records['formazione_ospite']['riserve'][i];
                  classe_giocatore = giocatore['giocante']?'giocante':'non_giocante';
                  tags+="<li class=\"" + classe_giocatore + "\">" + giocatore['nome'] + ": " + giocatore['punteggio'] + " " + giocatore['descrizione_punteggio'] + "</li>";
              }
              $("#partitaList").html(tags).listview("refresh");
          }, "json");
      }
      app.updateClassifica = function(e) {
          var records = "";
          $.get('http://viaadda.mosta.webfactional.com/competizione/10/classifica/', {}, function(res,code) {
              var tags = ""
              var records = res.rows;
              for (var i = 0; i < records.length; i++) {
                  tags+="<li>" + records[i]['allenatore'] + ": " + records[i]['punti'] + " (" + records[i]['somma'] + ")</li>";
              }
              $("#classificaList").html(tags).listview("refresh");
          }, "json");
      }
      app.updateHome = function(e) {
          var $formazioneDiv = $('#formazioneDiv');
          var $loginDiv = $('#loginDiv');
          var $logoutDiv = $('#logoutDiv');
          var $msg = $('#msg');
        
          if ((!userLogged) && (localStorage['srnm'] != undefined && localStorage['psswrd'] != undefined)) {
              // qui andrebbe fatta la chiamata al server per il login. Nella 
              // success() si dovrebbe settare userLogged = true;
          }
        
          if (userLogged) {
              $formazioneDiv.removeClass('oscurato').addClass('mostrato');
              $loginDiv.removeClass('mostrato').addClass('nascosto');
              $logoutDiv.removeClass('nascosto').addClass('mostrato');
              $msg.text('');
          } else {
              $formazioneDiv.removeClass('mostrato').addClass('oscurato');
              $loginDiv.removeClass('nascosto').addClass('mostrato');
              $logoutDiv.removeClass('mostrato').addClass('nascosto');
              $msg.text('Prima di accedere alla pagina per fare la formazione devi effettuare il login.');
          }
      }
      app.updateFormazione = function(e) {
          if (!userLogged) {
              alert('Pagina non accessibile, effetua prima il login.');
              $.mobile.changePage($('#homePage'));
          }
          var records = "";
          $.get(host + '/formazione/window/', {}, function(res,code) {
              var tags = ""
              var formazione = res.data.formazione;
              formazione_id = formazione.id;
              var titolari = formazione.titolari;
              var riserve = formazione.riserve;
              var altri_giocatori = formazione.altri_giocatori;
              var partita = res.data.partita;
              var records = [titolari, riserve, altri_giocatori];
              var portiere = [];
              var difensore = [];
              var centrocampista = [];
              var attaccante = [];
              var ruoli = [titolari, riserve, altri_giocatori];
              for (var i = 0; i < ruoli.length; i++) {
                  for (var y = 0; y < ruoli[i].length; y++) {
                      // se il giocatore non è stato ceduto, mettilo nell'array giusto
                      if (!ruoli[i][y]['ceduto']) {
                          // crea un dizionario con la rosa.
                          rosa[ruoli[i][y]['id']] = ruoli[i][y]['nome'];
                        
                          // aggiungi ad ogni giocatore una variabile per salvare lo stato
                          if (i == 0) {
                              ruoli[i][y]['stato'] = 'titolare';
                          } else if ( i == 1) {
                              ruoli[i][y]['stato'] = 'panchinaro';
                          } else {
                              ruoli[i][y]['stato'] = 'tribuna';
                          }
                        
                          // crea 4 array con i giocotori della rosa divisi per ruolo:
                          switch (ruoli[i][y]['ruolo']) {
                              case "p":
                                  portiere.push(ruoli[i][y])
                                  break;
                              case "d":
                                  difensore.push(ruoli[i][y])
                                  break;
                              case "c":
                                  centrocampista.push(ruoli[i][y])
                                  break;
                              case "a":
                                  attaccante.push(ruoli[i][y])
                                  break;
                          }
                      }
                  }
              }
              var giocatori = [portiere, difensore, centrocampista, attaccante];
              for (var i = 0; i < 4; i++) {
                  for (var y = 0; y < giocatori[i].length; y++) {
                      tags += "<li id='li_" + giocatori[i][y]['id'] + "' class='" + giocatori[i][y]['stato'] + "'><div data-role='fieldcontain'>";
                      tags += "  <label for='select-choice-" + giocatori[i][y]['id'] + "' class='select'>" + giocatori[i][y]['nome'] + ":</label>";
                      tags += "  <select name='select-choice-" + giocatori[i][y]['id'] + "' id='select-choice-" + giocatori[i][y]['id'] + "' data-ruolo='" + giocatori[i][y]['ruolo'] + "'>";
                      tags += "    <option value='titolare'";
                      if (giocatori[i][y]['stato'] == 'titolare') {
                          tags += " selected='selected'";
                      }
                      tags += ">campo</option>";
                      tags += "    <option value='panchinaro'";
                      if (giocatori[i][y]['stato'] == 'panchinaro') {
                          tags += " selected='selected'";
                      }
                      tags += ">panchina</option>";
                    
                      tags += "    <option value='tribuna'";
                      if (giocatori[i][y]['stato'] == 'tribuna') {
                          tags += " selected='selected'";
                      } 
                      tags += ">tribuna</option>";
                      tags += "  </select>";
                      tags += "</div></li>";
                  }
                
              }
              $("#formazioneList").html(tags).listview("refresh");
              $('select').selectmenu();
              $('select').bind('change', app.cambia_colore_giocatore);
          }, "json");
      }
      app.updatePanchinari = function(e) {
          var tags = "";
          for (var i=0; i < 12; i++) {
              tags += "<li data-id='" + arr_panchinari[i] + "'>" + rosa[arr_panchinari[i]] + "</li>";
          }
          $("#panchinariList").html(tags).listview("refresh");
          
          $( "#panchinariList" ).sortable();
          $( "#panchinariList" ).disableSelection();
          <!-- Refresh list to the end of sort to have a correct display -->
          $( "#panchinariList" ).bind( "sortstop", function(event, ui) {
              $('#panchinariList').listview('refresh');
          });
      }
      app.updateLogin = function(e) {
          if (csrf_token == "") {
              $.get(host + '/csrf/', {}, function(res,code) {
                  csrf_token = res;
              });
          }
      }
      app.updateLogout = function(e) {
          userLogged = false;
          csrf_token = "";
          delete localStorage['srnm'];
          delete localStorage['psswrd'];
      }
      /**
       * Funzione attivata quando si mette un giocatore in campo, panchina o tribuna;
       * aggiorna il colore di sfondo del giocatore.
       */
      app.cambia_colore_giocatore = function(e){
          $sel = $(this);
          var id_giocatore = app.get_id_giocatore($sel.attr('id')); 
          $('#li_' + id_giocatore).removeClass('titolare panchinaro tribuna').addClass($sel.val());
      }
      /**
       * Funzione che restituisce l'id del giocatore ricevendo l'id di un 
       * select, ossia qualcosa del tipo "select-choice-1255".
       */
      app.get_id_giocatore = function(id_select) {
          var id_giocatore = id_select.split('-')[2];
          return id_giocatore;
      }
      /**
       * Funzione che verifica che la formazione schierata sia valida.
       */
      app.controllaFormazione = function(e) {
          n_titolari = 0;         // numero dei titolari selezionati
          n_panchinari = 0;       // numero dei panchinari selezionati
          n_portieri = 0;         // numero dei portieri selezionati
          n_difensori = 0;        // numero dei difensori selezionati
          n_centrocampisti = 0;   // numero dei centrocampisti selezionati
          n_attaccanti = 0;       // numero degli attaccanti selezionati
          n_portieri_panca = 0;   // numero dei portieri in panchina
          arr_titolari = [];      // array con i giocatori titolari
          arr_panchinari = [];    // array con i giocatori panchinari
          $("#formazioneList select").each(function(){
              if ($(this).val() == 'titolare') {
                  n_titolari++;
                  switch ($(this).data('ruolo')) {
                      case "p":
                          n_portieri++;
                          break;
                      case "d":
                          n_difensori++;
                          break;
                      case "c":
                          n_centrocampisti++;
                          break;
                      case "a":
                          n_attaccanti++;
                          break;
                  }
                  arr_titolari.push(app.get_id_giocatore($(this).attr('id')))
              } else if ($(this).val() == 'panchinaro') {
                  n_panchinari++;
                  if ($(this).data('ruolo') == 'p') {
                      n_portieri_panca++;
                  }
                  arr_panchinari.push(app.get_id_giocatore($(this).attr('id')))
              }
          });
          // dopo aver ciclato su tutti i select della pagina e seguo i 
          // controlli:
          if (n_titolari != 11) {
              alert('Devi schierare 11 titolari');
              return false;
          }
          if (n_panchinari != 12 || n_portieri_panca == 0 ) {
              alert('Devi schierare 12 panchinari di cui almeno un portiere.');
              return false;
          }
          var schema = n_difensori*100 + n_centrocampisti*10 + n_attaccanti;
          var schemaValidi = [ 352, 343, 451, 442, 433, 541, 532];
          if (schemaValidi.indexOf(schema) == -1) {
              alert('Schema non valido');
              return false;
          }
          return true;
      }
      /**
       * Funzione attivata quando si clicca 'Salva' nella pagina della formazione
       */
      $('#salvaFormazione').click(function(event){
          event.preventDefault();
          if (!app.controllaFormazione()) {
              return;
          }
          // controlli ok. Mostra pagina per modificare ordine panchinari.
          $.mobile.changePage($('#panchinariPage'));
      });
      /**
       * Funzione che invia al server la formazione con l'elenco dei titolari
       * e delle riserve.
       */
      $('#inviaFormazione').click(function(event){
          event.preventDefault();
          // ricrea l'array dei panchinari per leggere il nuovo ordine: 
          arr_panchinari = [];
          $('#panchinariList li').each(function(){
              arr_panchinari.push($(this).data('id'));
          });
          var dati_formazione = {
              csrfmiddlewaretoken: csrf_token,
              formazioneId: formazione_id,
              titolari: arr_titolari,
              riserve: arr_panchinari
          }
          $.ajax({
              type: "POST",
              url: host + "/formazione/modifica/",
              cache: false,
              //data: JSON.stringify(credentials),
              data: dati_formazione,
              contentType: "application/json; charset=utf-8",
          })
          .done( function (data, status) {
              alert('Formazione salvata.');
              $.mobile.changePage($('#homePage'));
          })
          .fail( function(data, status) {
              // non ho capito come mai, ma viene richiamata questa funzione
              // anche in caso di successo. Se nella risposta c'è success=True
              // tratta il risultato come un successo.
              if (data.responseText.indexOf('success": true')) {
                  alert('Modifiche salvate.');
                  $.mobile.changePage($('#homePage'));
              } else {
                  alert('Si è verificato un errore, modifiche non salvate.');
              }
              
          });
      });
      $("#loginSubmit").click(function(event) {
          event.preventDefault();
          var credentials = { 
              username: $('#login_username').val(), 
              password: $('#login_password').val(),
              csrfmiddlewaretoken: csrf_token
          };
          $.ajax({
              type: "POST",
              url: host + "/login_per_sfigati/",
              cache: false,
              //data: JSON.stringify(credentials),
              data: credentials,
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                  userLogged = true;
                  $.mobile.changePage($('#homePage'));
                  localStorage['srnm'] = JSON.stringify(credentials['username']);
                  localStorage['psswrd'] = JSON.stringify(credentials['password']);
              },
              error: function() { // server couldn't be reached or other error }
                  alert('Autenticazione non completata, verificare i dati immessi.');
              }
          });
      });
      app.init();
  })(ViaAdda);
  //ViaAdda.updateHome();
});


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
        
        
        //// inizio sergio
        /*
        alert('ok');
        function callNativePlugin( returnSuccess ) { 
            
		    HelloPlugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, returnSuccess );
		    alert('ok2'); 
		} 
		function nativePluginResultHandler (result) { 
		   alert("SUCCESS: \r\n"+result ); 
		} 
		function nativePluginErrorHandler (error) { 
		   alert("ERROR: \r\n"+error ); 
		} 
        */
        //// fine sergio
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


        function callNativePlugin( returnSuccess ) { 
            
		    HelloPlugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, returnSuccess );
		    alert('ok2'); 
		} 
		function nativePluginResultHandler (result) { 
		   alert("SUCCESS: \r\n"+result ); 
		} 
		function nativePluginErrorHandler (error) { 
		   alert("ERROR: \r\n"+error ); 
		} 
		function mostraAlert() {
		   alert('asdf');
		}
