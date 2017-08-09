






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
        

// window.plugins.emailComposer

function EmailComposer() {
	this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType = {
Cancelled:0,
Saved:1,
Sent:2,
Failed:3,
NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML,attachments) {
	var args = {};
	if(toRecipients)
		args.toRecipients = toRecipients;
	if(ccRecipients)
		args.ccRecipients = ccRecipients;
	if(bccRecipients)
		args.bccRecipients = bccRecipients;
	if(subject)
		args.subject = subject;
	if(body)
		args.body = body;
	if(bIsHTML)
		args.bIsHTML = bIsHTML;
    if(attachments)
        args.attachments = attachments;
    
	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

EmailComposer.prototype.showEmailComposerWithCallback = function(callback, subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments) {
	this.resultCallback = callback;
	this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,isHTML,attachments]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
}

cordova.addConstructor(function()  {
					   if(!window.plugins)
					   {
					   window.plugins = {};
					   }
                       
					   // shim to work in 1.5 and 1.6
					   if (!window.Cordova) {
					   window.Cordova = cordova;
					   };
                       
					   window.plugins.emailComposer = new EmailComposer();
					   });

/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Configure properties individually
$(document).bind("mobileinit", function(){
                 $.mobile.autoInitialize = false;
});

$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
                     
    
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(api).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});

// Función para administrar los mensajes de respuesta enviados por el Plugin del correo!
function resultOperation(result){
    
    
    switch(result)
    {
        case 0:
            navigator.notification.alert(
                                         "Se ha cancelado el envio del correo!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
            break;
        case 1:
            navigator.notification.alert(
                                         "El correo ha sido salvado pero no enviado!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
            break;
        case 2:
            navigator.notification.alert(
                                         "Se ha enviado el correo exitosamente!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
            break;
        case 3:
            navigator.notification.alert(
                                         "Ocurrio un error en el envio del correo!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
            break;
        case 4:
            navigator.notification.alert(
                                         "El correo no se ha logrado enviar!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
            break;
        default:
            navigator.notification.alert(
                                         "Ocurrio un error en el envio del correo!",  // message
                                         alertDismissed,         // callback
                                         "Scarab App",           // title
                                         "OK"                    // buttonName
                                         );
    }
}


//Mensaje auxiliar de confirmación
function alertDismissed() {
    // do something
}

// Show a custom alert -- when se está a punto de enviar el correo!
//
function showAlertEnvio() {
    navigator.notification.alert(
                                 "El mail sera enviado a soporte.scarab@pragma.com.co",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que no se anexado la foto!
function showAlerSinImagen() {
    navigator.notification.alert(
                                 "No se ha anexado la foto!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que usuario y password son requeridos!
function showAlerSinUsuarioPass() {
    navigator.notification.alert(
                                 "Usuario y Password son requeridos!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que la autenticacion ha fallado!
function showAlerFalloAutenticacion() {
    navigator.notification.alert(
                                 "No se ha reconocido tu usuario o contraseña!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que la autenticacion ha fallado!
function showAlertEnvioExitoso() {
    navigator.notification.alert(
                                 "El correo ha sido enviado exitosamente a app@pragma.com.co!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que la autenticacion ha fallado!
function showAlertEnvioFail() {
    navigator.notification.alert(
                                 "No fué posible enviar el correo, verifique la conexión a datos!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}
// mensaje que advierte que la autenticacion ha fallado!
function showAlertFormaCampos() {
    navigator.notification.alert(
                                 "La información está incompleta, inténtalo de nuevo. Debes diligenciar todos los campos marcados con (*)!",  // message
                                 alertDismissed,         // callback
                                 "Scarab App",           // title
                                 "OK"                    // buttonName
                                 );
}









	
    function sendmail() {
        
        var i;
        var fullpath = "";
        var split;

		// recolecta los valores que inserto el usuario
		var requerimiento = $("#idrequerimiento").val();
		var clasificacion = $("#idclasificacion").val();
		var categoria = $("#idcategoria").val();
		var equipo = $("#idequipo").val();
		
		var photo = localStorage.getItem('photo');
	    var asunto = 'Soporte Scarab App';
        
        if ((categoria.length == 0) || (equipo.length == 0) || (requerimiento.length == 0)){
            showAlertFormaCampos();
            return false;
        }
		
		//Llama a servicio para envio de correo
        callServiceMail(asunto, clasificacion, requerimiento, categoria, equipo, photo);

	}
    
    function loginform() {
        
        //Recolecta el Usuario y Password
        var usuario = $("#idusuario").val();
        var passsword = $("#idcontrasena").val();
        var validacion = "ok";
        
        if ((usuario.length == 0) || (passsword.length == 0)){
            showAlerSinUsuarioPass();
            return false;
        } else {
            callService(usuario, passsword);
        }
    }
    
    function callService(usuario, passsword){
        
        $.mobile.loading( 'show', {
                         text: 'Verificando usuario!',
                         textVisible: true,
                         theme: 'd',
                         html: ""
                         });
        
        /*var productServiceUrl = 'https://interno.pragma.com.co/WSScarabApp/services/ScarabApp?wsdl';*/
        var productServiceUrl = 'http://quiron:8080/WSScarabApp/services/ScarabApp?wsdl';
        
        var soapMessage =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.scarab.pragma.com"> \
        <soapenv:Header/> \
        <soapenv:Body> \
        <ws:authenticateWithCredentials> \
        <ws:user> ' + usuario +'@pragma.com.co</ws:user> \
        <ws:pwd> ' + passsword + '</ws:pwd> \
        </ws:authenticateWithCredentials> \
        </soapenv:Body> \
        </soapenv:Envelope> \
        ';
        
         $.ajax({
         url: productServiceUrl,
         type: "POST",
         dataType: "xml",
         data: soapMessage,
         complete: endSaveProduct,
         contentType: "text/xml; charset=\"utf-8\""
         });
        
    }
    
    function endSaveProduct(xmlHttpRequest, status)
    {
        var result = false;
        var userlogin = $("#idusuario").val() + '@pragma.com.co';
        var passlogin = $("#idcontrasena").val();
        var now = new Date().getTime();
        var expiresAt = now + 720 * 60 * 60 * 1000;
        
        result = $(xmlHttpRequest.responseXML).find('return').text();
        $.mobile.loading( "hide" );
        
        if (result == "true"){
            
            localStorage.setItem('userlogin', userlogin);
            localStorage.setItem('passlogin', passlogin);
            localStorage.setItem('expiresAt', expiresAt);
            
            $("#idusuario").val("");
            $("#idcontrasena").val("");
            $.mobile.changePage("#page-home");
        }else{
           
            showAlerFalloAutenticacion();
            $("#idusuario").val("");
            $("#idcontrasena").val("");
        }
        
    }
    
    function callServiceMail(asunto, clas, req, cat, equ, photo){
        
        var to = 'yair.carreno@pragma.com.co'; /* app@pragma.com.co  ... yair.carreno@pragma.com.co*/
        var userlogin = localStorage.getItem('userlogin');
        var passlogin = localStorage.getItem('passlogin');
        var iamgendata = localStorage.getItem('iamgendata');
        
        $.mobile.loading( 'show', {
                         text: 'Preparando envio de tu solicitud...',
                         textVisible: true,
                         theme: 'd',
                         html: ""
                         });
        
        /*var productServiceUrl = 'https://interno.pragma.com.co/WSScarabApp/services/ScarabApp?wsdl';*/
        var productServiceUrl = 'http://quiron:8080/WSScarabApp/services/ScarabApp?wsdl';
        
        var soapMessage =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.scarab.pragma.com"> \
        <soapenv:Header/> \
        <soapenv:Body> \
        <ws:send> \
        <ws:user>' + userlogin + '</ws:user> \
        <ws:pass>' + passlogin + '</ws:pass> \
        <ws:to>' + to + '</ws:to> \
        <ws:asunto>' + asunto + '</ws:asunto> \
        <ws:clas>' + clas + '</ws:clas> \
        <ws:req>' + req + '</ws:req> \
        <ws:cat>' + cat + '</ws:cat> \
        <ws:equi>' + equ + '</ws:equi> \
        <ws:codigofoto>' + photo + '</ws:codigofoto> \
        </ws:send> \
        </soapenv:Body> \
        </soapenv:Envelope> \
        ';
        
        $.ajax({
               url: productServiceUrl,
               type: "POST",
               dataType: "xml",
               data: soapMessage,
               complete: endSaveMail,
               contentType: "text/xml; charset=\"utf-8\""
               });
        
    }
    
    function endSaveMail(xmlHttpRequest, status)
    {
        var resultsendMail = false;
        var anexoImagen = document.getElementById('cameraImage');
        
        resultsendMail = $(xmlHttpRequest.responseXML).find('return').text();
        $.mobile.loading( "hide" );
        
        if (resultsendMail == "true"){
            showAlertEnvioExitoso();
            $("#idrequerimiento").val("");
            anexoImagen.src = "images/foto1.png";
            localStorage.setItem('photo', "");
            $("#idcategoria").val("");
            $("#idcategoria").selectmenu('refresh');
            
        } else {
            showAlertEnvioFail();
        }
    }
    
    function cerrarSession() {
        
        var expiresAt = new Date().getTime() - 24 * 60 * 60 * 1000;//Obliga a que la fecha de expiracion sea menor
        localStorage.setItem('userlogin', null);
        localStorage.setItem('passlogin', null);
        localStorage.setItem('expiresAt', expiresAt);
        $.mobile.changePage("#page-home-login");
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

