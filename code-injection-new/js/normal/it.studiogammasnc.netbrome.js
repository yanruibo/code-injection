






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


/**
 * Codice sviluppato da Studio Gamma s.n.c. di Morstabilini R. & C.
 * www.studiogammasnc.it
 */


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    angular.bootstrap(document, ["angularApp"]);
    document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
    var l = window.location.toString();
    var parts = l.split('#/');
    var host = parts[0];
    var page = parts[1];
    if (page == 'home') {
        navigator.app.exitApp();
    } else if (page == 'ordini') {
        // window.location = host + "#/home";
        navigator.app.exitApp();
    } else if (page == 'ordini/') {
        navigator.app.exitApp();
    } else if (page.indexOf('ordine/') == 0) {
        // visto che la pagina di un ordine ha indirizzo #/ordine/123
        // dove 123 è l'id, verifico che page inizi con 'ordine/'
        window.location = host + "#/ordini";
    } else {
        alert('Pagina non riconosciuta: ' + page);
    }
}





///////////////////////////////////////////// push notification:


// questa non so quando viene chiamata. Nel metodo logout effettuo
// una chiamata a unregister.php che non esisteva nell'esempio trovato
// su internet.
window.onbeforeunload  =  function(e) {
    var registrationId = localStorage.registrationId;
    if (registrationId != undefined) {
    // if ( gApp.gcmregid.length > 0 ) {
      // The same routines are called for success/fail on the unregister. 
      // You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM
    }
};

/*
document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
  $("#app-status-ul").append('<li>deviceready event received</li>' );

  $("#app-status-ul").append('<li>calling GCMRegistrar.register, register our Sender ID with Google</li>' );
}, false );
*/

function GCM_Event(e) {
    switch( e.event )  {
    case 'registered':
        // the definition of the e variable is json return defined in GCMReceiver.java
        // In my case on registered I have EVENT and REGID defined
        localStorage.registrationId = JSON.stringify(e.regid);
        if ( e.regid.length > 0 ) {
            // google ha risposto alla richiesta di registrazione mandando un
            // registration ID che ora mando al server in modo che lo memorizzi
            // nel database
            $.ajax({
                type: "POST",
                url: getSiteAddress() + "/Notifiche/gcm/register.php",
                data: {
                    "IDutente": JSON.parse(localStorage.IDutente),
                    "regId": e.regid
                },
                success: function(result) {
                    if (result) {
                        result = JSON.parse(result);
                        if (result.risultato != "ok") {
                            showAlert('Errore durante la registrazione del device.', 'Errore');
                            // alert(result);
                        }
                    } else {
                        showAlert('Errore durante la registrazione del device.', 'Errore');
                    }
                },
                error: function() {
                    showAlert('Registrazione device fallita.', 'Errore');
                }
            });
        }
        break

    case 'message':
        /*
        // the definition of the e variable is json return defined in GCMIntentService.java
        // In my case on registered I have EVENT, MSG and MSGCNT defined    
        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');
        */
        // se la pagina è '#/ordini' ricaricala, altrimenti non fare nulla...
        break;
    case 'error':
        // $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        showAlert(e.msg, 'Errore');
        break;
    default:
        // $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        showAlert("Notifica non riconosciuta", 'Errore');
        break;
    }
}

// mi sembra che non venga mai eseguito:
function GCM_Success(e) {
    // $("#app-status-ul").append('<li>GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:registered -> REGID back from Google</li>');
    alert('GCM_Success');
}

// mi sembra che non venga mai eseguito:
function GCM_Fail(e) {
    // $("#app-status-ul").append('<li>GCM_Fail -> GCM plugin failed to register</li>');
    // $("#app-status-ul").append('<li>GCM_Fail -> ' + e.msg + '</li>');
    alert('GCM_Fail');
}

/**
 * Funzione richiamata quando si effettua il logout. Avvisa il server di 
 * netbrome di cancellare la registrazione di questo device dalla tabella 
 * notifiche_gcm_user
 */
var unregister = function() {
    var IDutente = localStorage.IDutente;
    if (IDutente) {
        IDutente = JSON.parse(IDutente);
    } 
    var registrationId = localStorage.registrationId;
    if (registrationId) {
        registrationId = JSON.parse(registrationId);
    }
    if (IDutente && registrationId) {
        $.ajax({
            type: "POST",
            url: getSiteAddress() + "/Notifiche/gcm/unregister.php",
            data: {
                "IDutente": JSON.parse(localStorage.IDutente),
                "regId": JSON.parse(localStorage.registrationId)
            },
            success: function(result) {
                result = JSON.parse(result);
                if (result.risultato != "ok") {
                    showAlert("Registrazione utente non cancellata", 'Errore');
                }
            },
            error: function() {
                showAlert('Cancellazione della registrazione fallita', 'Errore');
            }
        });
    } else {
        showAlert('Cancellazione registrazione non effettuabile', 'Errore');
    }
}

///////////////////////////////////////////// end push notification


/**
 * Codice sviluppato da Studio Gamma s.n.c. di Morstabilini R. & C.
 * www.studiogammasnc.it
 */


// var angularApp = angular.module("angularApp", []);
// questa modifica serve per leggere facilmente i dati passati nelle POST
var angularApp = angular.module('angularApp', [], function($httpProvider) {
      // Use x-www-form-urlencoded Content-Type
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
     
      // Override $http service's default transformRequest
      $httpProvider.defaults.transformRequest = [function(data)
      {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */ 
        var param = function(obj)
        {
          var query = '';
          var name, value, fullSubName, subName, subValue, innerObj, i;
          
          for(name in obj)
          {
            value = obj[name];
            
            if(value instanceof Array)
            {
              for(i=0; i<value.length; ++i)
              {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value instanceof Object)
            {
              for(subName in value)
              {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value !== undefined && value !== null)
            {
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
          }
          
          return query.length ? query.substr(0, query.length - 1) : query;
        };
        
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
      }];
    })
    .directive('blink', function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                function showElement() {
                    $element.css("color", "#222");
                    $timeout(hideElement, 2500);
                }
                function hideElement() {
                    $element.css("color", "white");
                    $timeout(showElement, 500);
                }
                showElement();
            },
            template: '<span ng-transclude></span>',
            replace: true
        };
    })
    .filter('truncate', function() {
        return function(input, start, end, dots) {
            if (isNaN(start)) {
                return input;
            }
            if (!angular.isString(input)) {
                return input;
            }
            var out = input.substring(start, end);
            if ((dots==true) &&(input.length > end)) {
                out += "...";
            }
            return out;
        }
    });



angularApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        }).
        when('/ordini/', {
            templateUrl: 'ordini.html',
            controller: 'OrdiniController'
        }).
        when('/ordine/:idOrdine', {
            templateUrl: 'ordine.html',
            controller: 'OrdineController'
        }).
        when('/notifiche', {
            templateUrl: 'notifiche.html',
            controller: 'NotificationController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);


/**
 * Funzione che mostra un alert nativo se si sta usando un device e un 
 * alert web se si sta sviluppando usando un browser.
 * @param message
 * @param title
 */
function showAlert(message, title) {
    if (navigator.notification) {
        // nativo 
        navigator.notification.alert(message, null, title, "ok");
    } else {
        // browser
        alert(title ? (title + ": " + message): message);
    }
}

function loadUrl(url){
    // navigator.app.loadUrl(url, { openExternal:true });  // system Browser
    window.open( url, '_blank' );   // inAppBrowser
    return false;
}


function showConfirm(question, funzioneBrowser, funzioneDevice) {
    if (isNativo()) {
        navigator.notification.confirm(
            question,
            funzioneDevice,
            "Sei sicuro?"
        );
    } else {
        if (confirm(question)) {
            funzioneBrowser();
        }
    }
}

/**
 * Funzione che restituisce true se si sta eseguendo l'app
 * su un device mobile, false se si sta testando l'app in un browser
 */
function isNativo() {
    if (window.location.protocol != 'http:') {
        // nativo 
        return true;
    } else {
        // browser
        return false
    }
}

function getSiteAddress(){
    if (isNativo()) {
        // return "http://192.168.0.55";
        return "http://www.netbrome.com";
    } else {
        return "http://localhost.netbrome.com";
    }
}

function openExternalLink(site){
    navigator.app.loadUrl( site, { openExternal:true });
}


/**
 * Codice sviluppato da Studio Gamma s.n.c. di Morstabilini R. & C.
 * www.studiogammasnc.it
 */


angularApp.controller("HomeController", function ($scope, $http, $location) {
    $scope.username = '';
    $scope.password = '';
    $scope.siteAddress = getSiteAddress();
    
    var ragione = localStorage.ragione;
    if ((ragione != undefined)&&(ragione != "undefined")) {
        $scope.ragione = JSON.parse(ragione);
        // alert('ragione diverso da undefined');
    } else {
        $scope.ragione = undefined;
        // alert('ragione uguale ad undefined');
    }
    $scope.autenticato = $scope.ragione != undefined;
    // alert("$scope.autenticato: " + $scope.autenticato);
    if ($scope.autenticato == true) {
        $location.path('/ordini');
    }
    
    $scope.doLogin = function(){
        /*
        $http.get('http://localhost.netbrome.com/Services/client/login.php').success(function(data) {
        //$http.get('http://192.168.0.55/Services/client/getOrdini.php?idNegozio=268').success(function(data) {
            var negozioInfo = data[0];
            $scope.ragione = negozioInfo[3];
            $scope.autenticato = true;
            localStorage.ragione = JSON.stringify($scope.ragione);
        });
        */
        var md5 = CryptoJS.MD5($scope.username + $scope.password).toString();
        $http.post(getSiteAddress() + '/Services/client/login.php', {
            'username': $scope.username,
            'md5': md5
        }).success(function(data) {
            // console.log(data);
            
            // se la ragione sociale dell'utente contiene un '&' allora
            // il tipo della risposta è String e devo togliere i tag XML:
            if (typeof data !== 'object') {
                data = data.replace('<Std.Result>', '');
                data = data.replace('</Std.Result>', '');
                data = JSON.parse(data);
            }
            if ((data.ragione != undefined) &&
                 (data.IDutente != undefined)) {
                // login ok, ho ricevuto tutti i parametri che mi servono
                $scope.ragione = data.ragione;
                $scope.autenticato = true;
                localStorage.ragione = JSON.stringify($scope.ragione);
                
                if (data.costoConsegna == undefined) {
                    data.costoConsegna = 0;
                }
                
                // ora avviso google di mandare le notifiche di nuovi 
                // ordini a questo device:
                var PROJECT_ID = "463879715557"
                window.plugins.GCM.register(PROJECT_ID, "GCM_Event", 
                        GCM_Success, GCM_Fail );
                // se la chiamata ha successo, google genera la notifica "registered"
                // e nel metodo GCM_Event si effettua una chiamata POST al
                // server di netbrome per memorizzare nel db il registration ID
                
                // che maniera idiota di usare le maiuscole!
                localStorage.IDutente = JSON.stringify(data.IDutente);
                localStorage.md5 = JSON.stringify(md5);
                localStorage.costoConsegna = JSON.stringify(data.costoConsegna);
                
                // dopo il login vado in automatico alla pagina degli ordini
                $location.path('/ordini');
            } else {
                // qualcosa è andato storto...
                if (data.error != undefined) {
                    showAlert(data.msg, 'Login fallito');
                } else {
                    // errore non riconosciuto, guardare i log del server
                    showAlert('Si è verificato un errore durante il login',
                            'Login fallito');
                }
            }
        }).error(function(data, status, headers, config){
            alert('Errore durante la ricezione dei dati, riprovare più tardi.');
            // alert(data);
            // alert(status);
        });
    }
    
    $scope.doLogout = function(){
        // avvisa il server di cancellare questo device dall'elenco dei
        // device da notificare quando arriva un nuovo ordine
        unregister();
        
        $scope.ragione = undefined;
        $scope.autenticato = false;
        delete localStorage.ragione;
        delete localStorage.IDutente;
    }
    
});




angularApp.controller("OrdineController", function ($scope, $routeParams, $http, 
        $location, ordiniService) {
    $scope.ordine = {};
    $scope.idOrdine = $routeParams.idOrdine;
    var md5 = JSON.parse(localStorage.md5);
    $scope.costoConsegna = JSON.parse(localStorage.costoConsegna);
    
    var IDutente = JSON.parse(localStorage.IDutente);
    $scope.userIsAdmin = false;
    // 3 è l'id dell'amministratore
    // TODO: rimuovere valore hardcodato!
    if (IDutente == 3) {
        $scope.userIsAdmin = true;
    }
    
    var params = {
        'idOrdine': $scope.idOrdine,
        'IDutente': IDutente,
        'md5': md5
    };
    
    $('#bottoneAggiorna').text('Ordini');
    
    $http.post(getSiteAddress() + '/Services/client/getDettagliOrdine.'
            + 'php', params).success(function(data) {
                // console.log(data);
                if (typeof data !== 'object') {
                    data = data.replace('<Std.Result>', '');
                    data = data.replace('</Std.Result>', '');
                    data = JSON.parse(data);
                } 
                
                if (data.error != undefined) {
                    showAlert(data.msg, 'Richiesta fallita');
                } else {
                    $scope.ordine = data;
                }
            }).error(function(data, status, headers, config){
                alert('Errore durante la ricezione dei dati, riprovare più tardi.');
                // alert(data);
                // alert(status);
            });

    $scope.accetta = function(idOrdine) {
        ordiniService.accettaOrdine(idOrdine).then(
            function(data){
                if (data.risultato == "ok") {
                    var msg = "Ordine " + idOrdine + " accettato.";
                    if (data.mandaSms == true) {
                        msg += " Un SMS di avviso è stato inviato al cliente.";
                        document.getElementById('hiddenFrame').src = 
                            "http://www.netbrome.com/sms/pagina.php?ido=" 
                            + idOrdine + "&ok=ok";
                    }
                    showAlert(msg, 'Ordine accettato.');
                    $scope.ordine.confermato = "SI";
                }
            },
            function(errorMessage){
                showAlert(errorMessage, 'Errore');
            }
        );
    }

    $scope.rifiuta = function(idOrdine) {
        ordiniService.rifiutaOrdine(idOrdine).then(
            function(data){
                if (data.risultato == "ok") {
                    var msg = "Ordine " + idOrdine + " rifiutato.";
                    if (data.mandaSms == true) {
                        msg += " Un SMS di avviso è stato inviato al cliente.";
                        document.getElementById('hiddenFrame').src = 
                            "http://www.netbrome.com/sms/pagina.php?ido=" 
                            + idOrdine + "&ok=no";
                    }
                    showAlert(msg, 'Ordine rifiutato.');
                    $scope.ordine.confermato = "NO";
                }
            },
            function(errorMessage){
                showAlert(errorMessage, 'Errore');
            }
        );
    }

    $scope.elimina = function(idOrdine) {
        ordiniService.eliminaOrdine(idOrdine).then(
            function(data){
                showAlert('Ordine eliminato', 'Fatto!');
                $location.path('/ordini'); // path not hash
            },
            function(errorMessage){
                //$scope.error=errorMessage;
                showAlert(errorMessage, 'Error');
            }
        );
    }
});


/*
angularApp.controller("NotificationController", function ($scope, NotificationService) {
    $scope.showAlert = function () {
        NotificationService.alert("You caused an alert.", "Alert", "Ok", function () {
            $scope.message = "You clicked it!"
        })
    }; 
});
*/


angularApp.controller("NotificationController", function ($scope, NotificationService) {

    $scope.showAlert = function () {
        NotificationService.alert("You caused an alert.", "Alert", "Ok", function () {
            $scope.message = "You clicked it!"
        })
    };
    $scope.showConfirm = function () {
        NotificationService.confirm("Do you like this?", "Please Confirm"
            , [
                {
                    title: "No",
                    buttonAction: function () {
                        $scope.message = ":-(";
                    }
                },
                {
                    title: "Yes",
                    buttonAction: function () {
                        $scope.message = ":-)";
                    }
                }
            ]
        );
    };
    $scope.showPrompt = function () {
        NotificationService.prompt("Please enter your name", "Enter Name",
            [
                {title: "Cancel",
                    buttonAction: function (input) {
                        $scope.message = input;
                    }

                },
                {title: "Ok",
                    buttonAction: function (input) {
                        $scope.message = input;
                    }

                }
            ]);
    };
    $scope.causeBeep = function(){
        NotificationService.beep();
    };
    $scope.causeVibrate = function(){
        NotificationService.vibrate();
    };
});


angularApp.controller("OrdiniController", function ($scope, $http, ordiniService) {
    $scope.ordini = [];
    $scope.ordiniLength = 'lettura in corso';
    $scope.userIsAdmin = false;
    
    var ragione = localStorage.ragione;
    if ((ragione != undefined)&&(ragione != "undefined")) {
        $scope.ragione = JSON.parse(ragione);
    } else {
        $scope.ragione = undefined;
    }
    
    // il bottone è nascosto in homepage ma deve essere visibile 
    // nelle altre pagine:
    $('#bottoneAggiorna').css('display', 'inline-block').text('Aggiorna');
    
    $('#bannerPubblicita').css('display', 'block');
    
    var IDutente = localStorage.IDutente;
    
    if (IDutente != undefined) {
        // 3 è l'id dell'amministratore, in localStorage è salvato come stringa
        // TODO: rimuovere valore hardcodato!
        if (IDutente == '"3"') {
            $scope.userIsAdmin = true;
        }
        $http.get(getSiteAddress() + '/Services/client/getOrdini.'
                + 'php?idNegozio=' + IDutente).success(function(data) {
                    
                    if (typeof data !== 'object') {
                        try {
                            data = data.replace('<Std.Result>', '');
                            data = data.replace('</Std.Result>', '');
                            data = JSON.parse(data);
                            $scope.ordini = data;
                        } catch(e) {
                            $scope.ordini = [];
                        }
                    } else {
                        $scope.ordini = data;
                    }
                    
                    $scope.ordiniLength = data.length;
                    
                }).error(function(data, status, headers, config){
                    alert('Errore durante la ricezione dei dati, riprovare più tardi.');
                    // alert(data);
                    // alert(status);
                });
    }
    
    $scope.accetta = function(idOrdine) {
        ordiniService.accettaOrdine(idOrdine).then(
            function(data){
                if (data.risultato == "ok") {
                    var msg = "Ordine " + idOrdine + " accettato.";
                    if (data.mandaSms == true) {
                        msg += " Un SMS di avviso è stato inviato al cliente.";
                        document.getElementById('hiddenFrame').src = 
                            "http://www.netbrome.com/sms/pagina.php?ido=" 
                            + idOrdine + "&ok=ok";
                    }
                    showAlert(msg, 'Ordine accettato.');
                    for(var i = $scope.ordini.length-1; i >= 0; i--) {
                        if($scope.ordini[i].IDordine == idOrdine+"") {
                            $scope.ordini[i].confermato = "SI";
                        }
                    }
                }
            },
            function(errorMessage){
                showAlert(errorMessage, 'Errore');
            }
        );
    }
    
    $scope.rifiuta = function(idOrdine) {
        ordiniService.rifiutaOrdine(idOrdine).then(
            function(data){
                if (data.risultato == "ok") {
                    var msg = "Ordine " + idOrdine + " rifiutato.";
                    if (data.mandaSms == true) {
                        msg += " Un SMS di avviso è stato inviato al cliente.";
                        document.getElementById('hiddenFrame').src = 
                            "http://www.netbrome.com/sms/pagina.php?ido=" 
                            + idOrdine + "&ok=no";
                    }
                    showAlert(msg, 'Ordine rifiutato.');
                    for(var i = $scope.ordini.length-1; i >= 0; i--) {
                        if($scope.ordini[i].IDordine == idOrdine+"") {
                            $scope.ordini[i].confermato = "NO";
                        }
                    }
                }
            },
            function(errorMessage){
                showAlert(errorMessage, 'Errore');
            }
        );
    }
    
    $scope.elimina = function(idOrdine) {
        ordiniService.eliminaOrdine(idOrdine).then(
            function(data){
                for(var i = $scope.ordini.length-1; i >= 0; i--) {
                    if($scope.ordini[i].IDordine == idOrdine+"") {
                        $scope.ordini.splice(i, 1);
                    }
                }
            },
            function(errorMessage){
                showAlert(errorMessage, 'Errore');
            }
        );
    }
    
});

/*angularApp.factory("NotificationService", function () {
    return {
        alert: function (message, title, buttonText, buttonAction) {
            navigator.notification.alert(message,
                buttonAction,
                title,
                buttonText);
        }
    }
});
*/

angularApp.factory("NotificationService", function ($rootScope) {

    function getButtonLabels(buttons){
        var buttonTitles = [];

        angular.forEach(buttons, function(value){
            buttonTitles.push(value.title);
        });
        return buttonTitles;
    }

    return {
        alert: function (message, title, buttonText, buttonAction) {
            navigator.notification.alert(message,
                function () {
                    $rootScope.$apply(function () {
                        buttonAction();
                    })
                },
                title,
                buttonText);
        },
        confirm: function (message, title, buttons) {

            var buttonLabels = getButtonLabels(buttons);

            navigator.notification.confirm(
                message,
                function (buttonIndex) {
                    $rootScope.$apply(function () {
                        buttons[buttonIndex - 1].buttonAction();
                    });
                },
                title,
                buttonLabels
            );
        },
        prompt : function(message, title, buttons){
            var buttonLabels = getButtonLabels(buttons);
            navigator.notification.prompt(
                message,
                function (results) {
                    $rootScope.$apply(function () {
                        buttons[results.buttonIndex - 1].buttonAction(results.input1);
                    });
                },
                title,
                buttonLabels
            );
        },
        beep : function(){
            navigator.notification.beep();
        },
        vibrate : function(){
            navigator.notification.vibrate();
        }

    }
});


angularApp.service('ordiniService', function($http, $q) {

    this.accettaOrdine = function(idOrdine) {
        var IDutente = JSON.parse(localStorage.IDutente);
        var md5 = JSON.parse(localStorage.md5);
        var params = {
            'idOrdine': idOrdine,
            'IDutente': IDutente,
            'md5': md5
        };

        //Creating a deferred object
        var deferred = $q.defer();

        $http.post(getSiteAddress() + '/Services/client/accettaOrdine.php',
                params).success(function(data) {
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("Si è verificato un errore.");
        });
        //Returning the promise object
        return deferred.promise;
    };
  
    this.rifiutaOrdine = function(idOrdine) {
        var IDutente = JSON.parse(localStorage.IDutente);
        var md5 = JSON.parse(localStorage.md5);
        var params = {
            'idOrdine': idOrdine,
            'IDutente': IDutente,
            'md5': md5
        };

        //Creating a deferred object
        var deferred = $q.defer();

        $http.post(getSiteAddress() + '/Services/client/rifiutaOrdine.php',
                params).success(function(data) {
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("Si è verificato un errore.");
        });
        //Returning the promise object
        return deferred.promise;
    };
  
    this.eliminaOrdine = function(idOrdine) {
        
        // questa funzione va messa qui dentro perché se creo una
        // funzione "sorella" di this.eliminaOrdine poi sul device
        // non funziona
        var doEliminaOrdine = function(idOrdine){
            var IDutente = JSON.parse(localStorage.IDutente);
            var md5 = JSON.parse(localStorage.md5);
            var params = {
                'idOrdine': idOrdine,
                'IDutente': IDutente,
                'md5': md5
            };

            //Creating a deferred object
            var deferred = $q.defer();

            $http.post(getSiteAddress() + '/Services/client/eliminaOrdine.php',
                    params).success(function(data) {
                deferred.resolve(data);
            }).error(function(){
                deferred.reject("Si è verificato un errore.");
            });
            //Returning the promise object
            return deferred.promise;
        }
        
        var question = "Eliminare ordine " + idOrdine + "?";
        
        // Non riesco ad usare la finestra nativa di conferma, uso sempre
        // quella javascript.
        // Guardare http://mirobetm.blogspot.it/2013/05/notification-and-confirm-service-using.html
        if (confirm(question)) {
            return doEliminaOrdine(idOrdine);
        }/*
        if (isNativo()) {
            navigator.notification.confirm(
                question,
                function(buttonIndex){
                    alert(buttonIndex);
                    if (buttonIndex == 1) {
                        // l'utente ha premuto ok
                        return doEliminaOrdine(idOrdine);
                    } else {
                        return false;
                    }
                },
                "Sei sicuro?"
            );
        } else {
            if (confirm(question)) {
                return doEliminaOrdine(idOrdine);
            }
        }*/
    }
    
});

