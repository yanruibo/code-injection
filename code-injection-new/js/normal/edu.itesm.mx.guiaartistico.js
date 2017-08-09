








			//* CÓDIGO QR *//

			var indice = 0;
			var artista;
			var obra;

			function escanear(){
				window.plugins.barcodeScanner.scan( function(result) {
		         	indice = result.text;
		         	successEscaner();
		         	}, function(error) {
		        		alert("No se pudo completar el escaneo: " + error);
		            }
		    	);
			}

			//* BASE DE DATOS *//

			var db = window.openDatabase("guiaartistico_DB","1.0","UNA BD", 200000);
			document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				db.transaction(populateDB, errorCB, successCB);
			}

			function populateDB(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS ficha (id TEXT PRIMARY KEY NOT NULL, titulo TEXT NOT NULL, fecha TEXT NOT NULL, corriente TEXT NOT NULL, autor TEXT NOT NULL, nacionalidad TEXT NOT NULL, www TEXT NOT NULL )');
       	        tx.executeSql('REPLACE INTO ficha VALUES ("1", "Mona Lisa", "1503", "Clasicismo", "Leonardo Da Vinci", "Italiana", "http://es.wikipedia.org/wiki/Leonardo_da_Vinci")');
				tx.executeSql('REPLACE INTO ficha VALUES ("2", "Mujer con una flor", "1932", "Cubismo", "Pablo Picasso", "Espanola", "http://es.wikipedia.org/wiki/Pablo_Picasso")');
       	     	tx.executeSql('REPLACE INTO ficha VALUES ("3", "La noche estrellada", "1889", "Impresionismo", "Vincent Van Gogh", "Holandesa", "http://es.wikipedia.org/wiki/Vincent_van_Gogh")');
       	     	tx.executeSql('REPLACE INTO ficha VALUES ("4", "La libertad guiando al pueblo", "1830", "Romanticismo", "Eugene Delacroix", "Francesa", "http://es.wikipedia.org/wiki/Eugene_Delacroix")');
       	     	tx.executeSql('REPLACE INTO ficha VALUES ("5", "La tentacion de San Antonio", "1946", "Surrealismo", "Salvador Dali", "Espanola", "http://es.wikipedia.org/wiki/Salvador_Dali")');
			}

			function successCB(){

			}

			function errorCB(err){
       			alert('Error al ejecutar el query: ' + err.message);
       		}


			function successEscaner(){
				db.transaction(queryDB, errorCB);
       		}

			function queryDB(tx){
				tx.executeSql('SELECT * FROM ficha where id = "' + indice + '"', [], querySuccess, errorCB);
       		}

       		function querySuccess(tx,result){
       			$('#info').empty();
                $.each(result.rows,function(index){
                        var row = result.rows.item(index);
                        obra = row['titulo'];
                        artista = row['autor'];
                        $('#info').append('<b>T&iacute;tulo:</b> ' + row['titulo'] + '<br /> <b>Fecha:</b> ' + row['fecha'] + '<br /> <b>Corriente:</b> ' + row['corriente'] + '<br /> <b>Autor: </b>' + row['autor'] + ' (<a href="' + row['www'] + '">Bio</a>)<br /> <b>Nacionalidad:</b> ' + row['nacionalidad'] + '<br />');
                });

                var chica = document.getElementById('chica');
				chica.style.display ='block';
				chica.src="img/Foto_0"+indice+".jpg";
        	}

       		function share(subject,text) {
       		 var share = cordova.require("cordova/plugin/share");
       		 var msj = text + '"' + obra + '" de ' + artista;
       		 share.show({subject: subject, text: msj},
       		  function() {
       		   //console.log("PhoneGap Plugin: Share: callback success");
       		  },
       		  function() {
       		   console.log("PhoneGap Plugin: Share: callback error");
       		  }
       		 );
       		}


		






cordova.define("cordova/plugin/share", function (require, exports, module) {
 var exec = require("cordova/exec");
  module.exports = {
   show: function (message, win, fail) {
    exec(win, fail, "Share", "show", [message]);
   }
  };
});



			$(document).bind("mobileinit", function(){
	  			$.mobile.touchOverflowEnabled = true;
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
function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

function msg()
{
    alert("button clicked");
}
function msg()
{
    alert("button clicked");
}

