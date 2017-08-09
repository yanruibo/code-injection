
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







    // Wait for Cordova to load
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // specify contact search criteria
        var options = new ContactFindOptions();
        options.filter="";          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
        filter = ["displayName","phoneNumbers"];

        document.location.href="#iniciar";
        // find contacts
        navigator.contacts.find(filter, onSuccess, onError, options);
    }

    function onSuccessSave(contact) {
        //alert("Numeros Actualizados");
    };

    
    
    // onSuccess: Get a snapshot of the current contacts
    
    function onSuccess(contacts) {
    	//alert(contacts.length);
    	$(".registros").append("total de contactos revisados: " + contacts.length);
    	var contadorFix = 0;
    	
        for (var i=0; i<contacts.length; i++) {
        	//alert("contacto numero: " + i);
            // display phone numbers
            
            if(contacts[i].phoneNumbers == null){
            
            }else{
            	//alert("tiene :" + contacts[i].phoneNumbers.length + " numero.");
            	for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
                    //alert("Value: "  + contacts[i].phoneNumbers[j].value);
                    var numero = contacts[i].phoneNumbers[j].value;
                    numero = numero.replace(/\s/g,'');
                    var comparacion = "+562";
                    var comparacion2 = "02";
                    var fix = "";
                    
                    //var corte = numero.toLowerCase().indexOf("+562");
             	    
                    // Cuando es con +562
                    if ( (numero.indexOf(comparacion) != -1) && (numero.length < 12) ) {
                    	//alert(numero.indexOf(comparacion) + " && " + numero.length + " numero: " +numero    );
    					
						fix = "+5622"+ numero.substring(4,11);
						contadorFix = contadorFix + 1;
						$("#numeros").append("<tr><td>"+contadorFix+"</td><td>"+ contacts[i].displayName + ": " + fix +"</td>");	
            			
						contacts[i].phoneNumbers[j].value = fix;
						//alert(contacts[i].phoneNumbers[j].value);
						contacts[i].save(onSuccessSave,onError);

            			
            			
            		}else{
            		// Cuando es con solo con 02	
            			var aux = numero.substring(0,2);
            			if(aux == "02") {
            				fix = "+5622"+ numero.substring(2,9);
    						
            				contadorFix = contadorFix + 1;
            				$("#numeros").append("<tr><td>"+contadorFix+"</td><td>"+ contacts[i].displayName + ": " + fix +"</td></tr>");		
            			
    						contacts[i].phoneNumbers[j].value = fix;
    						//alert(contacts[i].phoneNumbers[j].value);
    						contacts[i].save(onSuccessSave,onError);
            			
            				
            			}

            		}

                }	
            }
            
        }
        //$("#numeros").append("<p>Se modifican: "+ contadorFix +" Contactos.</p>");	
        
        if(contadorFix == 0){
        	alert("Tus contactos ya fueron Actualizados");
        }else{
            alert("Se actualizan: "+ contadorFix +" Contactos.");
        }
		
    };


    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('onError!');
    }

    
