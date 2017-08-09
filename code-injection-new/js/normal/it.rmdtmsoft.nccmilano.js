







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
        







            
			// Global Var
			var NCCPhone = "+393669337755" ;
			var NCCEmail = "robertob74@icloud.com" ;
			var latlng = new google.maps.LatLng(45.465669,9.185257);
            var myOptions = {
					center: latlng,
					zoom:10,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				} ;
			var map ;
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var strLastDa = "" ;
			var strLastA = "" ;
			var	homeScroll = "" ;
			var specialTransferIScroll = "" ;
			var localitaDaIScroll = "" ;
			var localitaAIScroll = "" ;
						
            /* 
                PhoneGap Inizio
            */
            function onBodyLoad()
            {	                
                document.addEventListener("deviceready", onDeviceReady, false);
            }
            
            function onDeviceReady()
            {
				checkConnection () ;	
            }
            
            /*
             
             Permette di bloccare (o meno) una rotazione del dispositivo (in questo caso Landscape)
             
             */
            function shouldRotateToOrientation ( rotation )
            {
                switch  (rotation)
                {   // Portrait
                    case 0:
                    case 180:
                    return true;
                    // Landscape
                    case 90:
                    case -90:  
                    return false;
                }    
            }
            
            function checkConnection ()
            {
				var networkState = navigator.network.connection.type ;
				
                if ( networkState == Connection.UNKNOWN || networkState == Connection.NONE ) 
                {
                    messaggio = "Nessuna connessione disponibile, impossibile visualizzare i dati" ;
                    navigator.notification.alert(messaggio, msgNone ,"Attenzione","OK");
                    return "" ;
                }    
                else
                {
			        var states = {} ;
                    
                    states[Connection.UNKNOWN]  = 'Connessione Sconosciuta' ;
                    states[Connection.ETHERNET] = 'Rete Ethernet' ;
                    states[Connection.WIFI]     = 'Rete WiFi' ;
                    states[Connection.CELL_2G]  = 'Cellulare 2G' ;
                    states[Connection.CELL_3G]  = 'Cellulare 3G' ;
                    states[Connection.CELL_4G]  = 'Cellulare 4G' ;
                    states[Connection.NONE]     = 'Nessuna connessione' ;
                    
                    //alert ( states[networkState] ) ; 
                    
                    return states[networkState] ;
                }    
                                 
            }
            
            function msgNone() {
                
            }
            
            /*
                PhoneGap Fine
            */
            
            
			/* 
                JQTouch Start
            */
            
            var jQT = new $.jQTouch({
				icon: 'jqtouch.png',
				addGlossToIcon: false,
				startupScreen: './img/testata.png',
				statusBar: 'black',
				preloadImages: [
								'./scroll_themes/android/img/backButton.png',
								'./scroll_themes/android/img/backButtonActive.png',
								'./scroll_themes/android/img/button.png',
								'./scroll_themes/android/img/buttonActive.png',
								'./scroll_themes/android/img/toolbar.png',
								'./scroll_themes/android/img/loading.gif'
								],
				slideSelector: '.slide'
			});
            
            $(document).ready(function(e)
            {
							  
				$('#descrizioneServizio').load ( './inc/ita.html' , function (){
				
					// Creazione iScroll - Home
																			  
					homeScroll = null ;
																			
					homeScroll = new iScroll('homeScroll', {
						snap: false,
						momentum: true,
						hScrollbar: false,
						vScrollbar:false,
						bounce:true,
						lockDirection:true
					});
																			
					setTimeout(function () {
						homeScroll.refresh();						
					}, 1000);
												
				}) ;
                
				
							  
                // Caricamento Percorso (MappA)
                $('#percorsoG').bind('pageAnimationStart',function(event, info)
                {
                
					if (info.direction == 'out' )
					{						
						$("#distanzatempo").html ("Durata: Distanza:") ;
                        $("#importo").html( "Importo:" ) ;
						
					}
                                    
                    if (info.direction == 'in' )
                    {	                                    
                    	             
					}
				}) ;
				
				// Caricamento Pannello Tariffe Fisse	
				$('#item4').bind('pageAnimationStart',function(event, info)
				{
					if (info.direction == 'in' )
					{
						// Creazione iScroll - Special Transfer
						specialTransferIScroll = null ;
								 
						specialTransferIScroll = new iScroll('specialTransferScroll', {
							snap: false,
							momentum: true,
							hScrollbar: false,
							vScrollbar:false,
							bounce:true,
							lockDirection:true
						});
								 
						setTimeout(function () {
							specialTransferIScroll.refresh();
						}, 100);
								 
					}			
				
					if (info.direction == 'out' )
					{						
						// Calcolo Preventivo
						calcolaPreventivo ( "F" , document.getElementById('preventivo').value ) ;
					}
					
				});
				
				// Caricamento Pannello Localita Da	
				$('#localitaDa').bind('pageAnimationStart',function(event, info)
				{
					if (info.direction == 'in' )
					{
						document.getElementById('preventivo').value = "" ;
									  
						// Creazione iScroll - Localita Da
						localitaDaIScroll = null ;
									  
						localitaDaIScroll = new iScroll('localitaDaScroll', {
							snap: false,
							momentum: true,
							hScrollbar: false,
							vScrollbar:false,
							bounce:true,
							lockDirection:true
						});
									  
						setTimeout(function () {
							localitaDaIScroll.refresh();
						}, 100);
									  
					}			
				
					if (info.direction == 'out' )
					{
						// setLocalita ( "DA" , strLastDa );						
					}
					
				});
				
				// Caricamento Pannello Localita A	
				$('#localitaA').bind('pageAnimationStart',function(event, info)
				{
					if (info.direction == 'in' )
					{
						document.getElementById('preventivo').value = "" ;
									 
						// Creazione iScroll - Localita A
						localitaAIScroll = null ;
									 
						localitaAIScroll = new iScroll('localitaAScroll', {
							snap: false,
							momentum: true,
							hScrollbar: false,
							vScrollbar:false,
							bounce:true,
							lockDirection:true
						});
									 
						setTimeout(function () {
							localitaAIScroll.refresh();
						}, 100);
									 
					}							
				
					if (info.direction == 'out' )
					{
						setLocalita ( "A" , document.getElementById('inputLocA').value );
			 		}
					
				});
							  
				// Caricamento Pannello Localita Da
				$('#mappaGoogle').bind('pageAnimationStart',function(event, info)
				{
					if (info.direction == 'in' )
					{
						setTimeout("calcolaPercorso ()",500);
					}
					
					if (info.direction == 'out' )
					{
													
					}
													 
				});
                
											
            }) ;   
			 
            
        

			
			var args;
		   
		











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
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
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



function getPuntiPassaggio ( strDa , strA )
{
    var puntiPassaggio = {      location: strDa,      stopover:false    };
    
    // Fiumicini - Staz. Tiburtina
    if ( ( strDa == "via Leonardo da Vinci, Fiumicino" && strA == "Stazione Tiburtina, Roma" ) || 
         ( strA == "via Leonardo da Vinci, Fiumicino" && strDa == "Stazione Tiburtina, Roma" ) )
    {
        puntiPassaggio = {      location:"41.857288,12.493858",      stopover:false    } ;
    } 
    
    return puntiPassaggio ;
}

/*
 Calcola il percorso tramite Google Maps (ed eventualmente lo fa vedere sulla mappa)
*/
function calcolaPercorso ()
{
	console.log ( "calcolaPercorso::" ) ;
    
    $("#direction").html( document.getElementById('inputLocDa').value + " -> " + document.getElementById('inputLocA').value ) ; 
    
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsDisplay.setMap(map);
	
    console.log ( "calcolaPercorso::Valore Da:" + document.getElementById('inputLocDa').value ) ;
    console.log ( "calcolaPercorso::Valore A:" + document.getElementById('inputLocA').value ) ;
    
	if ( document.getElementById('inputLocDa').value == "" || document.getElementById('inputLocA').value == "" ) return ;
	
	// Progress Status
    $('#preventivoScroll').append('<div id="progress">calcolo percorso...</div>');
    
    var strDa = document.getElementById('inputLocDa').value ;
    var strA  = document.getElementById('inputLocA').value ;
    
    // Recupera eventuali punti di passaggio intermedio per percorsi prestabiliti
    puntiPassaggio = getPuntiPassaggio ( strDa , strA ) ;     
    
    /* Opzioni per calcolo Route
    {  
        origin: LatLng | String, 
        destination: LatLng | String,  
        travelMode: TravelMode,  
        unitSystem: UnitSystem, 
        waypoints[]: DirectionsWaypoint,  
        optimizeWaypoints: Boolean,  
        provideRouteAlternatives: Boolean, 
        avoidHighways: Boolean,  
        avoidTolls: Boolean  
        region: String
    }
    
    */
        
    // Opzioni Viaggio/Percorso
    var request = {
		origin: strDa , 
		destination: strA,        
		travelMode: google.maps.DirectionsTravelMode.DRIVING,
        waypoints: [ puntiPassaggio ] ,
        optimizeWaypoints: true       
    };    
    
    // Esecuzione Query su GoogleMaps         
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
             
			directionsDisplay.setDirections(response) ;
				
            // Recupero Distanza:
            distKM = response.routes[0].legs[0].distance.value / 1000 ;
            distKM = truncate ( distKM );                
			                
			// Recupero Durata:
			durataH = response.routes[0].legs[0].duration.value / 3600 ;
			durataM = truncate(( response.routes[0].legs[0].duration.value - (truncate (durataH) * 3600) ) / 60) ;
			$("#distanzatempo").html ( "Distanza: " + distKM + "km Durata: " + truncate(durataH) + "h"+ durataM + "m" );
                            
			//directionsDisplay.setDirections(response);
                        
			// Calcolo Preventivo
			calcolaPreventivo ( "V" , distKM ) ;
                            
			$('#progress').remove();
        }
		else
		{
			// Errore 
			$('#progress').remove();
			navigator.notification.alert("Impossibile calcolare il percorso (verificare gli indirizzi e la disponibilità della rete).", msgNone ,"Errore","OK");
		}
	});                                     
    
} 


/*
 Calcola il preventivo in base ai KM
*/
function calcolaPreventivo ( astr_tipoPreventivo , an_km )
{
	console.log ( "calcolaPreventivo:: " + astr_tipoPreventivo + " " + an_km + " " + document.getElementById('preventivo').value ) ;
	
	document.getElementById('tipoPreventivo').value = astr_tipoPreventivo ;
		
	var strVeicolo = document.getElementById('veicolo').value ;
	
	nPreventivo = 0;
	
	if ( astr_tipoPreventivo == "V" )
	{
		if ( strVeicolo == "CAR" || strVeicolo == "" )
		{
			console.log ( "calcolaPreventivo:: VAN" ) ;
			if ( an_km <= 20 ) nPreventivo = 35 ;
			if ( an_km > 20 && an_km <= 25  ) nPreventivo = 45 ;
			if ( an_km > 25 && an_km <= 35  ) nPreventivo = 60 ;
			if ( an_km > 35 && an_km <= 45  ) nPreventivo = 70 ;
			if ( an_km > 45 && an_km <= 50  ) nPreventivo = 80 ;
			if ( an_km > 50 ) nPreventivo = ( an_km * 2 ) * 0.90 ;
				
			
		}
		else
		{
			// VAN
			console.log ( "calcolaPreventivo:: VAN" ) ;
			if ( an_km <= 20 ) nPreventivo = 55 ;
			if ( an_km > 20 && an_km <= 25  ) nPreventivo = 65 ;
			if ( an_km > 25 && an_km <= 35  ) nPreventivo = 75 ;
			if ( an_km > 35 && an_km <= 45  ) nPreventivo = 85 ;
			if ( an_km > 45 && an_km <= 50  ) nPreventivo = 95 ;
			if ( an_km > 50 ) nPreventivo = ( an_km * 2 ) * 1.20 ;
			
		}
		
		// Arrotondamento in eccesso ai 5 euro
		nIntero = ( truncate ( nPreventivo / 5 ) * 5 ) ;
		if ( nPreventivo - nIntero > 0 ) nPreventivo = nIntero + 5 ;
		else nPreventivo = nIntero ;
		
		// Patch per tragitti simili al Special Transfer
		var strDa = document.getElementById('inputLocDa').value ;
		var strA  = document.getElementById('inputLocA').value ;
		
		strDa = strDa.toLowerCase ();
		strA = strA.toLowerCase ();
		console.log ( "calcolaPreventivo:: strDa: " + strDa + " strA: " + strA ) ;
		
		document.getElementById('preventivo').value	= nPreventivo + " Euro" ;
		
		$("#importo").html ( "Importo: " + nPreventivo + " Euro" );
		
		
	}
	else
	{
        // $("#textSpecialTransfer").html ( document.getElementById('preventivo').value );
	}
}

function resetPreventivo ()
{
	$("#distanzatempo").html ( "Distanza:  Durata: " ) ; 
	document.getElementById('preventivo').value	= " Euro" ;
	$("#importo").html ( "Importo: " );
}

/*
	Invia Email tramite Plugin
*/
function sendEmail ()
{
	console.log ( "sendEmail::" + NCCEmail ) ;
	
	strLocDa			= document.getElementById('inputLocDa').value ;
	strLocA				= document.getElementById('inputLocA').value ;
	var strVeicolo		= " (" + document.getElementById('veicolo').value + ")" ;
	var strPreventivo	= document.getElementById('preventivo').value  ;
	
	var strST = "" ;
	if ( document.getElementById('tipoPreventivo').value == "F" )
	{
		strST = " (Special Transfer) " ;
		strVeicolo = "" ;
		strPreventivo += " Euro" ;
	}

	strBody = strLocDa + ' - ' + strLocA + strST + ' ' + strPreventivo + strVeicolo ;
	console.log ( "sendEmail:: " + strBody )  ;
	
	window.open( "mailto:"+NCCEmail+"?subject=Preventivo/prenotazione&body=" + strBody ) ; 
    
}

/*
	Invia SMS tramite Plugin
*/
function sendSMS ()
{
	console.log ( "sendSMS::" + NCCPhone ) ;

	strLocDa			= document.getElementById('inputLocDa').value ;
	strLocA				= document.getElementById('inputLocA').value ;
	var strVeicolo		= " (" + document.getElementById('veicolo').value + ")" ;
	var strPreventivo	= document.getElementById('preventivo').value  ;
	
	var strST = "" ;
	if ( document.getElementById('tipoPreventivo').value == "F" )
	{
		strST = " (ST) " ;
		strVeicolo = "" ;
		strPreventivo += " Euro" ;
	}
	
	strSMS = 'Preventivo prenotazione' + strST + ': ' + strLocDa + ' - ' + strLocA + ' ' + strPreventivo + strVeicolo ;
	console.log ( "sendSMS:: " + strSMS ) ;
	
	window.open( "sms:"+NCCPhone+"?body=" + strSMS ) ;
}

/*
	Chiama un numero
*/
function callNumber ()
{
	//window.plugins.phoneDialer.dial( NCCPhone );
	document.location.href = 'tel:'+NCCPhone;
}


/*
	Imposta i dati della località
*/
function setLocalita ( astr_type , astr_loc )
{
	console.log ( "setLocalita:: " + astr_type + " " + astr_loc ) ;
	if ( astr_type == "DA" ) 
	{
		document.getElementById('inputLocDa').value = astr_loc ; 
		strLastDa = astr_loc ; 
		$("#textLocDa").html ('<span class="itemLocalita" >Da: ' + astr_loc + '</span>' ) ;
	}
	else 
	{
		document.getElementById('inputLocA').value = astr_loc ;
		strLastA = astr_loc ; 
		$("#textLocA").html ('<span class="itemLocalita" >A: ' + astr_loc + '</span>' ) ;
	}
				
}

function setSpecialTransfer ( an_importo , astr_locDa , astr_locA )
{
	console.log ( "setSpecialTransfer:: " + an_importo + " " + astr_locDa + " " + astr_locA ) ;
	document.getElementById('preventivo').value = an_importo; 
	$('#textImportoST').html ( 'Importo: ' + an_importo + ' Euro' ) ;
	
	document.getElementById('inputLocDa').value = astr_locDa ;
	document.getElementById('inputLocA').value = astr_locA;
	
	$('#textLocDaST').html ('Da: ' + astr_locDa ) ; 
	$('#textLocAST').html ('A: ' + astr_locA ) ; 
	
	

}

// TODO: mettere in common
function truncate(n) {
   return n | 0; // bitwise operators convert operands to 32-bit integers
}


function getURLParam(strParamName)
{
    var strReturn = "";
    var strHref = window.location.href;
    
    if ( strHref.indexOf("?") > -1 ){
        var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
        var aQueryString = strQueryString.split("&");
        
        for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
            if ( aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
                var aParam = aQueryString[iParam].split("=");               
                strReturn = aParam[1];                
                break;
            }
        }
    }
    return unescape(strReturn);
}    






!function ($, iScroll) {
  $.ender({
    iScroll: function (options) {
      return new iScroll(this[0], options)
    }
  }, true)
}(ender, require('iscroll').iScroll)

/**
 * SMS Composer plugin for Cordova
 * window.plugins.SMSComposer
 * 
 * @constructor
 */
function SMSComposer()
{
	this.resultCallback = null;
}

SMSComposer.ComposeResultType =
{
Cancelled:0,
Sent:1,
Failed:2,
NotSent:3
}

SMSComposer.prototype.showSMSComposer = function(toRecipients, body)
{
	
	var args = {};
	
	if(toRecipients)
		args.toRecipients = toRecipients;
	
	if(body)
		args.body = body;
	
	Cordova.exec("SMSComposer.showSMSComposer",args);
}

SMSComposer.prototype.showSMSComposerWithCB = function(cbFunction,toRecipients,body)
{
	this.resultCallback = cbFunction;
	this.showSMSComposer.apply(this,[toRecipients,body]);
}

SMSComposer.prototype._didFinishWithResult = function(res)
{
	this.resultCallback(res);
}

Cordova.addConstructor(function() {
					   
					   if(!window.plugins)	{
					   window.plugins = {};
					   }
					   window.plugins.smsComposer = new SMSComposer();
					   });


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

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
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
	
	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

// this will be forever known as the orch-func -jm
EmailComposer.prototype.showEmailComposerWithCB = function(cbFunction,subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
	this.resultCallback = cbFunction;
	this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML]);
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


var PhoneDialer = function() {
    
}

// call this to register for push notifications
PhoneDialer.prototype.dial = function(phnum) {
    PhoneGap.exec(null, null, "PhoneDialer", "dialPhone", [{"number":phnum,}]);
};


PhoneGap.addConstructor(function() {
    if(!window.plugins) {
        window.plugins = {};
    }
    window.plugins.phoneDialer = new PhoneDialer();
                       
});
