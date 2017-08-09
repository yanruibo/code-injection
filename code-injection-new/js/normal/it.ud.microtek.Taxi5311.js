

 $('#annullaPrenotazioneFallita').bind('pagebeforecreate', function(event)      
 {
    $('.telefono').html($.getTelefonoRadiotaxi());
    $('.telefono').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi()); 
 });
 
 $('#annullaPrenotazioneFallita').bind('pageinit', function(event)      
 {            
     $.localizeMe('#annullaPrenotazioneFallita');
 });
 


 $('#annullaPrenotazioneSuccess').bind('pageinit', function(event)
 {        
     $.localizeMe('#annullaPrenotazioneSuccess');
 });
 


	 $('#step3').bind('pagebeforeshow',function(event) 
	 {		 
		 $('#code').val('');
	 });

	 $('#step3').bind('pageinit', function(event)     
     {	
    	   $.localizeMe('#step3'); 
    	   
    	   $('.radiotaxiName').text($.getRadiotaxiName());
    	   
    	   $('.yearApp').text($.getCurrentYear());
    	   
    	   $('.appName').text($.getAppName());
    	   
    	   $('.telefono').html($.getTelefonoRadiotaxi());
         $('.telefono').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi());  
         
         function getDati()
         {         
            var parametri = $.getAction('validaUtente') + 
                      '&cellulare=' + localStorage.getItem('cellulare') +
                      '&username=' + localStorage.getItem('username') +
                      '&codice=' + $('#code').val();                       
            
            return encodeURIComponent(parametri);
         } 
    	 
     
         $('.controllaRegistrazione').click(function() { 
	         
        	   if ($('#code').val() == '')
				{
        		   $.myAlert($.localizeThis('IndicareUnCodice'));
					$('#code').focus();
					return false;
				}								 	      
                
	         $.mobile.showPageLoadingMsg ();
	         $.inviaDati(getDati(),
	        		         function(data) {                     
	                        $.mobile.hidePageLoadingMsg ();	                        	                       
	                        
	                        localStorage.setItem('codice', '');
	   
	                        if (data == true)
	                        {
	                        	localStorage.setItem('codice', $('#code').val());
	                        	
	                           $.mobile.changePage("step4.html");	                           	                           	                         
	                        }
	                        else
	                        {
	                           $.mobile.changePage("stepFail.html");
	                        }
	                     },
	                     function() {
	                       $.mobile.hidePageLoadingMsg ();
	                       $.mobile.changePage("stepFail.html");
	                     }
	         );	                             
	      });
     });
	 
	 $('#step3').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
	


 $('#noConnettivitaCentrale').bind('pageinit', function(event)      
 {         
     $.localizeMe('#noConnettivitaCentrale');
     
     $('#riprova_noConnettivitaCentrale').click(function()
     {
         $.mobile.showPageLoadingMsg ();
         $.initApp();
     });
 });
 


	 $('#step2').bind('pagebeforeshow',function(event) 
	 {		
		 $('#nome').val('');           
       $('#cellulare').val('');
       if (sessionStorage.getItem('reg_nome') != null &&
           sessionStorage.getItem('reg_nome') != '')
    	 {
    	    $('#nome').val(sessionStorage.getItem('reg_nome'));
    	 }
       
       if (sessionStorage.getItem('reg_cell') != null &&
           sessionStorage.getItem('reg_cell') != '')
       {
          $('#cellulare').val(sessionStorage.getItem('reg_cell'));
       }
       
       $('#internationalCode').val($.getPrefissoDefault());
       if (sessionStorage.getItem('prefissoInternazione') != null &&
    		  sessionStorage.getItem('prefissoInternazione') != '')
    	 {
    	   $('#internationalCode').val(sessionStorage.getItem('prefissoInternazione'));    	   
    	 }                    
	 });	 

	  $('#step2').bind('pageinit', function(event)   
     {
    	 $.localizeMe('#step2'); 
    	 
    	 $('.radiotaxiName').text($.getRadiotaxiName());
    	 
    	 $('.yearApp').text($.getCurrentYear());
    	 
    	 $('.appName').text($.getAppName());
    	 
    	 $('#internationalCode').click(function(){   
    		 sessionStorage.setItem('reg_nome', $('#nome').val());
    		 sessionStorage.setItem('reg_cell', $('#cellulare').val());
    		 $.mobile.changePage("elencoPrefissi.html");
       });
    	 
    	 function getDati($telefono)
       {             		 
          var parametri = $.getAction('registrazione') + 
                    '&cellulare=' + $telefono +
                    '&username=' + $('#nome').val();                                       
          
          return encodeURIComponent(parametri);
       }
    	 
       $('.inviaRegistrazione').click(function(){
	         
    	      if ($('#nome').val() == '')
				{
    	    	   $.myAlert($.localizeThis('IndicareUnNome'));
					$('#nome').focus();
					return false;
				}
				
				if ($('#cellulare').val() == '')
				{
					$.myAlert($.localizeThis('IndicareUnCellulare'));
					$('#cellulare').focus();
					return false;
				}
				
				
				$('#nome').val($('#nome').val().toUpperCase());
				
				$telefono = $('#internationalCode').val() + $('#cellulare').val();
				
				$telefono = $telefono.replace('+', '00');							
                
            /// Invia richiesta sms con codice autorizzativo
            $.mobile.showPageLoadingMsg ();
            $.inviaDati(getDati($telefono),
            		   function(data) {                     
	                     $.mobile.hidePageLoadingMsg ();	                     
	
	                     localStorage.setItem('cellulare', '');
	                     localStorage.setItem('username', '');	                    	                    
	                     
	                     if (data == true)
	                     {
	                        $.mobile.changePage("step3.html");
	                        
	                        localStorage.setItem('cellulare', $telefono);
	                        localStorage.setItem('username', $('#nome').val());
	                     }
	                     else
	                     {
	                        $.mobile.changePage("stepFail.html");
	                     }
	                  },
	                  function() {
	                    $.mobile.hidePageLoadingMsg ();
	                    $.mobile.changePage("stepFail.html");
	                  }
	           );	                        						                          
        });                    
     }); 
	  
	  $('#step2').bind('pagebeforecreate', function(event)      
     {
       $.customizeMe();
     });
	


 $('#orientation').bind('pageinit', function(event)     
 {         
     $.localizeMe('#orientation');
 });
 


 $('#prenotazioneSuccess').bind('pageinit', function(event)     
 {         
     $.localizeMe('#prenotazioneSuccess');
 });
 


	$('#pois').bind('pagebeforeshow', function(event) 
	{
	   $.checkUptime();
	
  	   $('.cancellaPois').remove();
      
      $(localStorage.getItem($.getNomeCollezionePOIS())).find('cat').each(function()
      {
        var $cat = $(this);
        
        var $des = $cat.find('des').text();
        
        var titoloTemplate = $('#titoloElencoTemplate').clone();
        
        titoloTemplate.removeAttr('id');
        titoloTemplate.removeAttr('style');
        titoloTemplate.addClass('cancellaPois');
        titoloTemplate.text($des);  
        
        titoloTemplate.appendTo('.recordPois');
        
        $(this).find('p').each(function()
        {
         var $pois = $(this);           
         var nome = $pois.find('n').text();               
         var ind =  $pois.find('i').text();
         var civ =  $pois.find('c').text();
         var dis =  $pois.find('d').text();
         var des =  $pois.find('e').text();
         
         var template = $('#poisTemplate').clone();
         
         template.removeAttr('id');
         template.removeAttr('style');
         template.addClass('cancellaPois');
         
         template.find('.poisLink').text(nome);                                    
         
         template.find('.poisLink').click(function() {            	              	  
       	   $.setCorsaValues(ind, civ, dis, des);
             $.mobile.changePage('corsa.html', {reverse: true});
         });
         
         template.appendTo('.recordPois');
        });
      });
  	
     $.activateScroll('wrapper-pois');
  });
	
	$('#pois').bind('pagebeforecreate', function(event)      
   {
     $.customizeMe();
   });
  
   $('#pois').bind('pageinit', function(event)       
   {             	 
       $.localizeMe('#pois');           
   });
   


 $('#prenotazioneFallita').bind('pageinit', function(event)      
 {         
     $.localizeMe('#prenotazioneFallita');
 });
 


 $('#riregistrati').bind('pageinit', function(event)      
 {         
     $.localizeMe('#riregistrati');
     
     localStorage.setItem('codice', '');
 });
 

    
     $('#elencoPrefissi').bind('pageinit', function(event)     
     {
       $.localizeMe('#elencoPrefissi'); 
       
       $('.radiotaxiName').text($.getRadiotaxiName());                       
       
       $('.yearApp').text($.getCurrentYear());      
       
       $('.appName').text($.getAppName());
     });
     
     $('#elencoPrefissi').bind('pageshow', function(event)     
     {
    	 $.activateScroll('wrapper-elencoPrefissi');
     });
     
     $('#elencoPrefissi').bind('pagebeforeshow', function(event)     
     {     	 
    	 $('.addManualPrefix').click(function() {                                
             sessionStorage.setItem('prefissoInternazione', $('#pre').val());
             $.mobile.changePage('step2.html', {reverse: true});
       });
    	 
    	 $('.cancellaPrefissi').remove();
    	 
    	 $.get('prefissi.xml', function(data) 
       {      	     	
	    	 $(data).find('cat').each(function()
	       {
	        var $cat = $(this);	        	        
	        
	        var $des = $cat.find('des').text();
	        
	        var titoloTemplate = $('#titoloPrefissoTemplate').clone();
	        
	        titoloTemplate.removeAttr('id');
	        titoloTemplate.removeAttr('style');
	        titoloTemplate.addClass('cancellaPrefissi');
	        //titoloTemplate.text($des);  
	        
	        titoloTemplate.appendTo('.recordPrefisso');
	        
	        $(this).find('p').each(function()
	        {
	         var $pre = $(this);           
	         var nome = $pre.find('n').text();
	         var $prefisso = $pre.find('i').text();
	         
	         var template = $('#prefissoTemplate').clone();
	         
	         template.removeAttr('id');
	         template.removeAttr('style');
	         template.addClass('cancellaPrefissi');
	         
	         template.find('.prefissoLink').text(nome);                                    
	         
	         template.find('.prefissoLink').click(function() {                                
	             sessionStorage.setItem('prefissoInternazione', $prefisso);
	             $.mobile.changePage('step2.html', {reverse: true});
	         });
	         
	         template.appendTo('.recordPrefisso');	         	         
	        });
	       });	    		    	
    	 });    	     	
     });
     
     $('#elencoPrefissi').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
   


    $('#prenotazione').bind('pagebeforeshow',function(event) 
    {
    	  $.checkUptime();
    	  
    	  var values = $.getCorsaValues();
        
        $('#descrizioneIndirizzo').html(values.indirizzo + ' ' + values.civico + ' - ' + values.distretto);
        
        $('#giorno').val('');
        $('#orario').val('');
    });
    
    jQuery.extend(jQuery.mobile.datebox.prototype.options, {
        'dateFormat': 'DD.MM.YYYY',
        'headerFormat': 'DD.MM.YYYY',
        'setTimeButtonLabel' : $.localizeThis('ImpostaOrario'),
        'calTodayButtonLabel' : $.localizeThis('SaltaAOggi'),
        'setDateButtonLabel' : $.localizeThis('ImpostaLaData'),
        'daysOfWeekShort' : $.localizeThis('GiorniDellaSettimana'),
        'monthsOfYear' : $.localizeThis('MesiDellAnno')
    });
    
    $('#prenotazione').bind('pageinit', function(event)       
    {         
        $.localizeMe('#prenotazione');
        
        $('.richiediPrenotazione').click(function() {
        	   if ($('#orario').val() == '')
            {
              $.myAlert($.localizeThis('IndicareUnOrario'));
              $('#orario').focus();
              return false;
            }
            
            if ($('#giorno').val() == '')
            {
              $.myAlert($.localizeThis('IndicareUnGiorno'));
              $('#giorno').focus();
              return false;
            }
            
            function getDati()
            {
            	var values = $.getCorsaValues();
            	
               var parametri = $.getAction('inserisciCorsa') + 
                         '&cellulare=' + $.getCellulare() +
                         '&username=' + $.getUsername() +                                      
                         '&ind=' + values.distretto + ' ' + values.indirizzo + ' ' + values.civico +                                            
                         '&orario=' + $('#orario').val() + 
                         '&giorno=' + $('#giorno').val();                                     
               
               if (sessionStorage.getItem('note') != null &&
            		 sessionStorage.getItem('note') != 'null')
            	{
            	    parametri += '&note=' + sessionStorage.getItem('note');
            	}               
               if (sessionStorage.getItem('caratteristiche') != null && 
            		 sessionStorage.getItem('caratteristiche') != 'null')
               {
                   parametri += '&car=' + sessionStorage.getItem('caratteristiche');
               }
               
               $.setCorsaValues('', '', '', '');
               sessionStorage.setItem('note', '');
               sessionStorage.setItem('caratteristiche', '');                                                        
               
               return encodeURIComponent(parametri);
            }                      
            
            $.mobile.showPageLoadingMsg ();
            $.inviaDati(getDati(),
            		function(data) {                     
                       $.mobile.hidePageLoadingMsg ();
                       //$.myAlert(data);
                                            
                       if (data == 'automatico')
                       {
                          $.mobile.changePage("prenotazioneSuccess.html", { role : "dialog"});
                       }
                       else if (data == 'true')
                       {
                          $.mobile.changePage("prenotazioneSuccess.html", { role : "dialog"});
                       }
                       else
                       {
                          $.mobile.changePage("prenotazioneFallita.html", { role : "dialog"});
                       }                                                         
                    },
                    function() {
                      $.mobile.hidePageLoadingMsg ();                                           
                      
                      $.mobile.changePage("prenotazioneFallita.html", { role : "dialog"});                                           
                    }
             );           
        });
    });
    
    $('#prenotazione').bind('pagebeforecreate', function(event)      
    {
       $.customizeMe();
    });
    


    /*$('#posizioneTaxi').live("pageshow", function() {
        
    });*/
    
    $('#posizioneTaxi').bind("pageshow", function() 
    {    	      	
	     $('#map_posizioneTaxi').gmap({
	            'zoom': 16, 
	            'zoomControl': false, 
	            'streetViewControl': false, 
	            'panControl': false, 
	            'mapTypeControl': false,     
	            'overviewMapControl': false,
	            'center': new google.maps.LatLng($.geo_getLatitude(), $.geo_getLongitude()),
	            'callback': function(map) {                               
	               google.maps.event.addListener(map, 'mousedown', function() {                                      
	                  $.geo_setMoved(true);                            
	               });                               
	            }
	     }); 	     	    
    	
    	  var $taxiLat = sessionStorage.getItem('latitude');
    	  $taxiLat /= 60000;
        var $taxiLon = sessionStorage.getItem('longitude');
        $taxiLon /= 60000;               
    	       	
        function setMapPositionTaxi(position)
        {
            /// Rimuovo tutti i marker precedenti
            $('#map_posizioneTaxi').gmap('findMarker', 'tag', 'home', function(found, marker) {
               if (found) {
                  // bye bye
                  marker.setMap(null);           
               }
            });         
            
            $('#map_posizioneTaxi').gmap('addMarker', {'tag': 'home', 'position': position, 'icon': 'glyphish/stato/puntatore-blu.png'});
            
            /// Evitare di centrare se mi sono spostato            
           	var $c1 = Math.abs(($taxiLat * 60000) - (position.lat() * 60000));
            var $c2 = Math.abs(($taxiLon * 60000) - (position.lng() * 60000))*0.69;
            var $d =  Math.sqrt($c1*$c1 + $c2*$c2);
            
            $d *= 1.8532;
            $d = Math.round($d);
            
            var $centroLat = ($taxiLat + position.lat()) / 2;
            var $centroLon = ($taxiLon + position.lng()) / 2;                             
            
            var $zoom = $.geo_getZoomLevel($d);                             
         	
            $('#map_posizioneTaxi').gmap({ 'zoom': $zoom, 'center': new google.maps.LatLng($centroLat, $centroLon)});            
        }
        
        $.geo_initialize(setMapPositionTaxi, null);
        
        $('#map_posizioneTaxi').gmap('findMarker', 'tag', 'taxi', function(found, marker) {
            if (found) {
               // bye bye
               marker.setMap(null);           
            }
         });               
        
        $('#map_posizioneTaxi').gmap('addMarker', {'tag': 'taxi', 'position': new google.maps.LatLng($taxiLat,$taxiLon), 'icon': 'glyphish/stato/puntatore.png'});              
        
        setMapPositionTaxi(new google.maps.LatLng($.geo_getLatitude(), $.geo_getLongitude()));
    }); 

    $('#posizioneTaxi').bind('pageinit', function(event)      
    {         
        $.localizeMe('#posizioneTaxi');                                                                                                            
    });
    
    $('#posizioneTaxi').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
    


 $('#corsaInGestione').bind('pageinit', function(event)    
 {         
     $.localizeMe('#corsaInGestione');
 });
 


 $('#noConnettivita').bind('pageinit', function(event)      
 {         
     $.localizeMe('#noConnettivita');
     
     $('#riprova_noConnettivita').click(function()
     {
    	   $.mobile.showPageLoadingMsg ();
    	   $.initApp();
     });
 });
 


   var $lastAbsDettaglioCorsa;
   
   function getDatiDettaglioCorsa()
   {         
       var parametri = $.getAction('dettaglioCorsa') + 
                 '&cellulare=' + $.getCellulare() +                     
                 '&username=' + $.getUsername() +                     
                 '&abs=' + sessionStorage.getItem('absCorsa');                     
       
       return encodeURIComponent(parametri);
   } 
   
   function DettaglioCorsa() {                            
       $.mobile.showPageLoadingMsg ();
       $.inviaDati(getDatiDettaglioCorsa(),
    		      function(html) {
                  $.mobile.hidePageLoadingMsg (); 
                  $('.caricamentoInCorso').hide();                                                                                 
                  $('.dettaglio').html(html);
                  if ($.isEnabledStorno())
                	{
                	   $('.annulla').show();
                	}
                  
                  sessionStorage.setItem('codtax', $('#codtax').val());
                  sessionStorage.setItem('latitude', $('#latitude').val());
                  sessionStorage.setItem('longitude', $('#longitude').val());
                  
                  $.activateScroll('wrapper-dettaglioCorsa');
                  
                  $('#refreshDettaglioCorsa').data('time', new Date().getTime());
                  $lastAbsDettaglioCorsa = sessionStorage.getItem('absCorsa');
               },
               function() {   
                 $.mobile.hidePageLoadingMsg (); 
                 $(".dettaglio").html("<li class=\"ui-li ui-li-static ui-body-c ui-corner-top ui-corner-bottom\">" + $.localizeThis('ErroreInFaseDiCaricamento') + "</li>");
                 
                 $.activateScroll('wrapper-dettaglioCorsa');
               }
         );       
    }
   
    $('#dettaglioCorsa').bind('pagebeforeshow', function(event) 
    {
    	  $.checkUptime();
    	
    	  var t = new Date().getTime();      
        // Aggiorniamo cmq dopo 30 sec
        if ((t - $('#refreshDettaglioCorsa').data('time') > 30000) || $lastAbsDettaglioCorsa != sessionStorage.getItem('absCorsa')) 
        {
        	   $('.caricamentoInCorso').show();
            $('.dettaglio').html('');   
            $('.annulla').hide();
                    
            DettaglioCorsa();       
        }            	    	            
    });
   
    $('#dettaglioCorsa').bind('pageinit', function(event)     
    {
    	function getDati()
      {         
         var parametri = $.getAction('annullaOrdine') + 
                   '&cellulare=' + $.getCellulare() +
                   '&username=' + $.getUsername() +
                   '&corsa=true' + 
                   '&abs=' + sessionStorage.getItem('absCorsa');                                    
         
         return encodeURIComponent(parametri);
      }
    	
    	function annullaCorsa()
    	{
    		$.mobile.showPageLoadingMsg ();
    		$.inviaDati(getDati(),
    				  function(data) {                     
                    $.mobile.hidePageLoadingMsg ();                                         
                    
                    if (data == 'true')
                    {
                       $.mobile.changePage("annullaCorsaSuccess.html", { role : "dialog"});
                    }                     
                    else
                    {
                       $.mobile.changePage("annullaCorsaFallita.html", { role : "dialog"});
                    }               
                 },
                 function(xhr, text, err) {
                   $.mobile.hidePageLoadingMsg ();                 
                   
                   $.mobile.changePage("annullaCorsaFallita.html", { role : "dialog"});
                 }
           );         
    	}
    	
    	$('.annulla').click(function() 
    	{ 
    		if ($.myConfirm($.localizeThis('AnnullaCorsa'), 
    				     function(button) {
                       if (button == 1)
                       {
                    	     annullaCorsa();
                       }
                    })
             ) 
         {
    			annullaCorsa();
         }    		         
      }); 
    	
    	$.localizeMe('#dettaglioCorsa');    	    
         
      $('#refreshDettaglioCorsa').click(DettaglioCorsa);
      
      $('#refreshDettaglioCorsa').data('time', 0);
      
      $lastAbsDettaglioCorsa = null;
    });
    
    $('#dettaglioCorsa').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
   


	 function Clock()
    {
       var time = new Date();
       var hours = time.getHours();
       if (hours < 10){
          hours = "0" + hours;   
       }               
       var minutes = time.getMinutes();
       if (minutes < 10){
          minutes = "0" + minutes;   
        }
       var seconds = time.getSeconds();
       if (seconds < 10){
        seconds = "0" + seconds;   
        }
       var clock = $.localizeThis("UltimoAggiornamento") + hours + ":" + minutes + ":" + seconds;
       $('#clock').html(clock);
       $('#clock').data('time', new Date().getTime());
    }
        
    function getDatiElencoCorse()
    {         
       var parametri = $.getAction('elencoCorse') + 
                 '&cellulare=' + $.getCellulare() +                     
                 '&username=' + $.getUsername();                         
       
       return encodeURIComponent(parametri);
    }               
    
    function ElencoCorse() 
    {   
        $('ul.elencoCorse').hide();
        $('#caricamentoElencoCorse').hide();
        $('#notificaCentraleElencoCorse').hide();
        
        $.mobile.showPageLoadingMsg ();
        $.inviaDati(getDatiElencoCorse(),
        		function(html) {                                          
                   $.mobile.hidePageLoadingMsg ();  
                   
                   $('.cancellaLeMieCorse').remove();                                                                                      
                   
                   $(html).find('C').each(function()
                   {
                       var $corsa = $(this);           
                       var abs   =  $corsa.find('L').text();               
                       var addr  =  $corsa.find('A').text();
                       var dist  =  $corsa.find('D').text();
                       var esito =  $corsa.find('E').text();
                       var icon  =  $corsa.find('I').text();                           
                       
                       var template = $('#leMieCorseTemplate').clone();
                       
                       template.removeAttr('id');
                       template.removeAttr('style');
                       template.addClass('cancellaLeMieCorse');
                                                  
                       template.find('.leMieCorseLink').data('abs', abs);                           
                       template.find('.leMieCorseIndirizzo').text(addr);                                    
                       template.find('.leMieCorseDistretto').text(dist);
                       template.find('.leMieCorseEsito').text(esito);
                       //template.find('.leMieCorseIcona').addClass(icon);
                       if (icon == 'ui-icon-alert')
                    	  {
                         template.find('.leMieCorseIcona').hide();
                         template.find('.leMieCorseIcona2').addClass(icon);
                    	  }
                       else
                    	  {
                    	   template.find('.leMieCorseIcona2').hide();
                    	  }
                       
                       template.find('.leMieCorseLink').click(function()                     		  
                    	  {                                  
                    	      if ($(this).data('abs') != '')
                    	    	{
                    	         sessionStorage.setItem('absCorsa', $(this).data('abs'));                                                                                          
                              $.mobile.changePage('dettaglioCorsa.html');
                    	    	}
                       });
                       
                       template.appendTo('.recordLeMieCorse');
                   });         
                   
                   $(html).find('M').each(function()
                   {
                       var $messaggio = $(this);                                                     
                       
                       $('#messaggioCentraleElencoCorse').html($messaggio.text());
                       $('#notificaCentraleElencoCorse').show();
                   });
                   
                   $('ul.elencoCorse').show();
                   Clock();              
                   
                   $.activateScroll('wrapper-lemiecorse');
                },
                function() {                   
                  $.mobile.hidePageLoadingMsg ();
                  $("#msgCaricamentoElencoCorse").html($.localizeThis('ErroreInFaseDiCaricamento'));                    
                  $('#caricamentoElencoCorse').show();                    
                  $('ul.elencoCorse').hide();
                  Clock();
                  
                  $.activateScroll('wrapper-lemiecorse');
                }
           );        
    };
	 
	 $('#lemiecorse').bind('pageshow', function(event) 
	 {
		 var t = new Date().getTime();		 
		 // Aggiorniamo cmq dopo 60 sec
		 if (t - $('#clock').data('time') > 60000) 
       {
           ElencoCorse();       
       }
    });
	
	 $('#lemiecorse').bind('pagebeforeshow', function(event) {   
		  $.activateScroll('wrapper-lemiecorse');
	 });
	
	 $('#lemiecorse').bind('pageinit', function(event)     
	 {    	         
    	  $.localizeMe('#lemiecorse');    	    	 
        
        $('#refreshLeMieCorse').click(ElencoCorse);                               
        
        $('ul.elencoCorse').hide();
        $('#caricamentoElencoCorse').hide();
        $('#notificaCentraleElencoCorse').hide();
        
        $('#clock').data('time', 0);
	 });
	 
	 $('#lemiecorse').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
   


 $('#corsaBlackList').bind('pagebeforecreate', function(event)      
 {
    $('.telefono').html($.getTelefonoRadiotaxi());
    $('.telefono').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi()); 
 });
 
 $('#corsaBlackList').bind('pageinit', function(event)       
 {         
     $.localizeMe('#corsaBlackList');          
 });
 

    
	$('#preferiti').bind('pagebeforeshow', function(event) 
	{
		$.checkUptime();			

		$.popolatePreferiti('#entryPreferiti','.recordPreferiti', 'wrapper-preferiti');			
	});

    $('#preferiti').bind('pageinit', function(event) 	 	
	 {	        
        $.localizeMe('#preferiti');                
    });
    
    $('#preferiti').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
    

     
   $('#lemiecorse_help').bind(
    'pagebeforeshow',
    function(event) {
    	$.activateScroll('wrapper-lemiecorse_help');    	
    });
   



 $('#annullaCorsaSuccess').bind('pageinit', function(event)
 {        
     $.localizeMe('#annullaCorsaSuccess');
 });
 

     
	$('#gpreferiti').bind('pagebeforeshow', function(event) 
   {
		$.checkUptime();					
		
		$('.cancellami').remove();
		
		$.popolatePreferiti('#entryTemplate','.recordGpreferiti', 'wrapper-gpreferiti');
	});
		
	$('#gpreferiti').bind('pageinit', function(event)
	{           
       $.localizeMe('#gpreferiti');
   });
	
	$('#gpreferiti').bind('pagebeforecreate', function(event)      
   {
     $.customizeMe();
   });
	


      $('#stepFail').bind('pageinit', function(event){          
        $.localizeMe('#stepFail');
        
        $('.radiotaxiName').text($.getRadiotaxiName());
        
        $('.yearApp').text($.getCurrentYear());
        
        $('.appName').text($.getAppName());
        
        $('.telefonoRadiotaxi').html($.getTelefonoRadiotaxi());
        $('.telefonoRadiotaxi').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi());  
      });
      
      $('#stepFail').bind('pagebeforecreate', function(event)      
      {
        $.customizeMe();
      });
    

    
     $('#step1').bind('pageinit', function(event)      
     {
       $.localizeMe('#step1'); 
       
       $('.radiotaxiName').text($.getRadiotaxiName());
       
       $('.yearApp').text($.getCurrentYear());
       
       $('.appName').text($.getAppName());
       
       var s = $('#logo').attr('src');             
       
       $('#logo').attr('src', s.replace('RadioTaxi', $.getIconPath()));             
     });  
     
     $('#step1').bind('pagebeforecreate', function(event)      
     {
       $.customizeMe();
     });
   


     $('#condizioni').bind('pagebeforecreate', function(event)      
	  {
		 $.customizeMe();
	  });
   
     $('#condizioni').bind('pageinit', function(event)     
     {
       $.localizeMe('#condizioni'); 
       
       $('.radiotaxiName').text($.getRadiotaxiName());                       
       
       $('.yearApp').text($.getCurrentYear());
              
       $.get('condizioni/' + $.getIconPath() + '.html', function(data) {    	   
    	   $('#condizioniUtilizzo').html(data);
    	   $.activateScroll('wrapper-condizioni');
    	 });
     });     
   


 $('#corsaSuccess').bind('pageinit', function(event)
 {        
     $.localizeMe('#corsaSuccess');
 });
 

       
    $('#trovami').bind("pageshow", function() {     	    	    	     	      	      
        $('#chiama-control').css('margin-left', ($('#map_canvas').width() / 2) - 10);                                                               
        
        $('#map_canvas').gmap('refresh');                                          
        
        $('div.gmnoprint').hide();
        
        $.geo_setMapInit(true);
    });
    
    $('#trovami').bind("pagebeforeshow", function() 
    {
    	  $.checkUptime();
    	  
    	  function failGeoLocation(error)
  	     {
  	       $('#indirizzoTrovami').text(error);
  	       $('#distrettoTrovami').text('');
  	     }
    	
    	  function addressGeoLocation(indirizzo, civico, comune, distretto)
        {
           $('#indirizzoTrovami').text(indirizzo + ' ' + civico);                   
           $('#distrettoTrovami').text(comune + ' ' + distretto);
        }               
        
        function setMapPosition(position)
        {        	                    	           	           	           	           	         	  
            /// Rimuovo tutti i marker precedenti
            $('#map_canvas').gmap('find', 'markers', { 'property': 'tag', 'value': 'home' }, function(marker, found) {            	            	
            	            	
            	if (found) {            	               	              	   
                  // bye bye               
                  marker.setMap(null);                                   
               }
            });                       
            
            $('#map_canvas').gmap('addMarker', {'tag': 'home', 'position': position, 'icon': 'themes/glyphish/stato/puntatore-blu.png'});
                        
            
            /// Evitare di centrare se mi sono spostato
            if (!$.geo_getMoved())
            {
               //$('#map_canvas').gmap({ 'center': position});
            	$('#map_canvas').gmap('option', 'center', position);
            }     
        }                        
                
        $.geo_initialize(setMapPosition, addressGeoLocation, failGeoLocation);               
    });       
   
    $('#trovami').bind('pagebeforehide', function(event, ui)      
	 {              
	   var map = $.geo_getMap();
	   if (map != null)
	   {	    
	      google.maps.event.clearInstanceListeners(map);
	      $.geo_setMap(null);
	   }
	 });
    
    $('#trovami').bind('pagebeforecreate', function(event)      
    {
    	$.customizeMe();
    });
    
    $('#trovami').bind('pageinit', function(event)      
    {         
        $.localizeMe('#trovami');                 
        
        $('#chiama-trovami').click(function(){
        	   $.setCorsaValues($.geo_getIndirizzo(), $.geo_getCivico(), $.geo_getDistretto(), '');        	   
            $.mobile.changePage('corsa.html', {reverse: true});
        });
        
        $('#ricolocami').click(function(){
        	   $.geo_setMoved(false);        	          	  
        	   
        	   $('#map_canvas').gmap('option', 'center', new google.maps.LatLng($.geo_getLatitude(),$.geo_getLongitude()));                                                                                     	   
        }); 
        
        $.geo_setMapInit(false);
        
        $('#map_canvas').gmap({
            'zoom': 16, 
            'zoomControl': false, 
            'streetViewControl': false, 
            'panControl': false, 
            'mapTypeControl': false,     
            'overviewMapControl': false,
            'center': new google.maps.LatLng($.geo_getLatitude(), $.geo_getLongitude()),
            'callback': function(map) { 
            	$.geo_setMap(map);               
                
                google.maps.event.addListener(map, 'bounds_changed', function() 
                {   
                   var p = new google.maps.LatLng($.geo_getLatitude(), $.geo_getLongitude()); 
                   if ($.geo_isMapInit())
                   {                    
                      p = map.getCenter();  
                      
                      $.geo_setMovedPosition(p);                                                                              
                   }
                   else
                   {
                      p = $.geo_getMovedPosition();
                      
                      $('#map_canvas').gmap('option', 'center', p); 
                   }
                   
                   if ($.geo_getGeocoder()) 
                   {                   
                     $.geo_getGeocoder().geocode({'latLng': p}, $.fetchStreet);                    
                   }
                }); 
                
                google.maps.event.addListener(map, 'mousedown', function() 
                {                  
                   $.geo_setMoved(true);                         
                });
            }
        });                                       
          
        $('#map_canvas').gmap('addControl', 'chiama-control', google.maps.ControlPosition.LEFT_CENTER);
        $('#map_canvas').gmap('addControl', 'indirizzo-control', google.maps.ControlPosition.TOP_CENTER);                
    });
    


    function ClockPrenotazioni()
    {
       var time = new Date();
       var hours = time.getHours();
       if (hours < 10){
          hours = "0" + hours;   
       }               
       var minutes = time.getMinutes();
       if (minutes < 10){
          minutes = "0" + minutes;   
        }
       var seconds = time.getSeconds();
       if (seconds < 10){
        seconds = "0" + seconds;   
        }
       var clock = $.localizeThis("UltimoAggiornamento") + hours + ":" + minutes + ":" + seconds;
       $('#clockPrenotazioni').html(clock);
       $('#clockPrenotazioni').data('time', new Date().getTime());
    }
        
    function getDatiElencoPrenotazioni()
    {         
       var parametri = $.getAction('elencoPrenotazioni') + 
                 '&cellulare=' + $.getCellulare() +                     
                 '&username=' + $.getUsername();                         
       
       return encodeURIComponent(parametri);
    }
    
    function getDatiCancellaPrenotazione(absPrenotazione)
    {         
       var parametri = $.getAction('annullaOrdine') + 
                 '&cellulare=' + $.getCellulare() +
                 '&username=' + $.getUsername() +
                 '&prenotazione=true' + 
                 '&abs=' + absPrenotazione;                                    
       
       return encodeURIComponent(parametri);
    }
    
    function CancellaPrenotazione(absPrenotazione)
    {
    	if (absPrenotazione != '')
      {
    		$.mobile.showPageLoadingMsg ();
    		$.inviaDati(getDatiCancellaPrenotazione(absPrenotazione),
    				  function(data) {                     
                    $.mobile.hidePageLoadingMsg ();                                         
                    
                    if (data == 'true')
                    {
                       $.mobile.changePage("annullaPrenotazioneSuccess.html", { role : "dialog"});
                    }                     
                    else
                    {
                       $.mobile.changePage("annullaPrenotazioneFallita.html", { role : "dialog"});
                    }               
                 },
                 function(xhr, text, err) {
                   $.mobile.hidePageLoadingMsg ();                 
                   
                   $.mobile.changePage("annullaPrenotazioneFallita.html", { role : "dialog"});
                 }
          );         
      }
    }
    
    function ElencoPrenotazioni() 
    {   
        $('ul.elencoPrenotazioni').hide();
        $('#caricamentoElencoPrenotazioni').hide();
        $('#notificaCentraleElencoPrenotazioni').hide();
        
        $.mobile.showPageLoadingMsg ();
        $.inviaDati(getDatiElencoPrenotazioni(),
        		     function(html) {                                          
                   $.mobile.hidePageLoadingMsg ();                                       
                   
                   $('.cancellaLeMiePrenotazioni').remove();                                                                                      
                   
                   $(html).find('C').each(function()
                   {
                       var $corsa = $(this);           
                       var abs   =  $corsa.find('L').text();               
                       var addr  =  $corsa.find('A').text();
                       var dist  =  $corsa.find('D').text();
                       var esito =  $corsa.find('E').text();
                       var icon  =  $corsa.find('I').text();                           
                       
                       var template = $('#leMiePrenotazioniTemplate').clone();
                       
                       template.removeAttr('id');
                       template.removeAttr('style');
                       template.addClass('cancellaLeMiePrenotazioni');
                                                  
                       template.find('.leMieCorseDeleteLink').data('abs', abs);                           
                       template.find('.leMiePrenotazioniIndirizzo').text(addr);                                    
                       template.find('.leMiePrenotazioniDistretto').text(dist);
                       template.find('.leMiePrenotazioniEsito').text(esito);
                       template.find('.leMiePrenotazioniIcona').addClass(icon);                           
                       
                       template.find('.leMieCorseDeleteLink').click(function()                             
                       {                     	                          	        
                    	        if ($.myConfirm($.localizeThis('RimuoviPrenotazione'), 
                                   function(button) {
                                      if (button == 1)
                                      {
                                    	  CancellaPrenotazione($(this).data('abs'));
                                      }
                                   })
                                ) 
                             {
                    	        	  CancellaPrenotazione($(this).data('abs'));
                             }                       	                       	  
                       });
                       
                       template.appendTo('.recordLeMiePrenotazioni');
                   });         
                   
                   $(html).find('M').each(function()
                   {
                       var $messaggio = $(this);                                                     
                       
                       $('#messaggioCentraleElencoPrenotazioni').html($messaggio.text());
                       $('#notificaCentraleElencoPrenotazioni').show();
                   });
                   
                   $('ul.elencoPrenotazioni').show();
                   ClockPrenotazioni();              
                   
                   $.activateScroll('wrapper-prenota');
                },
                function() {                   
                  $.mobile.hidePageLoadingMsg ();
                  $("#msgCaricamentoElencoPrenotazioni").html($.localizeThis('ErroreInFaseDiCaricamento'));                    
                  $('#caricamentoElencoPrenotazioni').show();                    
                  $('ul.elencoPrenotazioni').hide();
                  ClockPrenotazioni();
                  
                  $.activateScroll('wrapper-prenota');
                }
          );        
    }
    
    $('#prenota').bind('pageshow', function(event) 
    {
       var t = new Date().getTime();       
       // Aggiorniamo cmq dopo 60 sec
       if (t - $('#clockPrenotazioni').data('time') > 60000) 
       {
           ElencoPrenotazioni();       
       }
    });
    
    $('#prenota').bind('pagebeforeshow', function(event) 
    {
    	$.checkUptime();
    	
    	if ($.isEnabledPrenotazioni())
      {
    		$('#bloccoPrenotazioneChiama').hide();
         $('#bloccoPrenotazioniElenco').show();           
      }
      else
      {
         $('#bloccoPrenotazioneChiama').show();
         $('#bloccoPrenotazioniElenco').hide();
      }
    	    	
    	$.activateScroll('wrapper-prenota');
    });
    
    $('#prenota').bind('pageinit', function(event)       
    {         
        $.localizeMe('#prenota');
        
        $('.telefono').html($.getTelefonoRadiotaxi());
        $('.telefono').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi()); 
        
        if ($.isEnabledPrenotazioni())
        {
        	   $('#refreshLeMiePrenotazioni').click(ElencoPrenotazioni);                               
        
	         $('ul.elencoPrenotazioni').hide();
	         $('#caricamentoElencoPrenotazioni').hide();
	         $('#notificaCentraleElencoPrenotazioni').hide();
	         
	         $('#clockPrenotazioni').data('time', 0);
        }
    });
    
    $('#prenota').bind('pagebeforecreate', function(event)      
    {
       $.customizeMe();
    });
    


	   $('#step4').bind('pageinit', function(event){
			$.localizeMe('#step4');

			$('.yearApp').text($.getCurrentYear());
			
			$('.appName').text($.getAppName());

			$('.radiotaxiName').text($.getRadiotaxiName());
			
			$('.terminaRegistrazione').click(function(){				
				$.mobile.changePage("corsa.html");				
			});
		});
	   
	  $('#step4').bind('pagebeforecreate', function(event)      
     {
       $.customizeMe();
     });
	


   $('#addpreferiti').bind('pagebeforeshow',function(event) 
   {							
	   $('#nome_preferiti').val('');          
      $('#indirizzo_preferiti').val('');
      $('#civico_preferiti').val('');          
      $('#distretto_preferiti').val('');
   }); 
   
   $('#addpreferiti').bind('pagebeforecreate', function(event)      
   {
      $.customizeMe();
   });
   
   $('#addpreferiti').bind('pageinit', function(event) 
   {
	   $.localizeMe('#addpreferiti');	   	  
	   
	   /* Autocompletamento */
	   $.setAutocomplete('#indirizzo_preferiti', 'indirizzo_preferiti', 'strade');       	        
      $.setAutocomplete('#distretto_preferiti', 'distretto_preferiti', 'distretti');
   
	   openDb();                     
       
       $('.createEntry').click(function(){	            				
				if ($('#indirizzo_preferiti').val() == '')
				{
					$.myAlert($.localizeThis('IndicareUnIndirizzo'));
					$('#indirizzo_preferiti').focus();
					return false;
				}							
		          
	         if ($("#civico_preferiti").val() == '')
	         {
	        	  $.myAlert($.localizeThis('IndicareUnCivico'));
	           $("#civico_preferiti").focus();
	           return false;
	         }
	          
	         if ($("#distretto_preferiti").val() == '')
	         {
	        	  $.myAlert($.localizeThis('IndicareUnDistretto'));
	           $("#distretto_preferiti").focus();
	           return false;
	         }				    	          	     
    	      
    	      var preferito = {id: new Date().getTime(),
    	    	                 nome: $('#nome_preferiti').val(),
    	    	                 citta: $('#distretto_preferiti').val(),
    	    	                 indirizzo: $('#indirizzo_preferiti').val(),
    	    	                 civico: $('#civico_preferiti').val()    	    	                     
    	                      };
    	      
    	      $.addPreferito(preferito);
    	      
				$.mobile.changePage('gpreferiti.html', { transition: "slideup"});
           });                    
   });
   


 $('#annullaCorsaFallita').bind('pagebeforecreate', function(event)      
 {	 
	 $('.telefono').html($.getTelefonoRadiotaxi());
	 $('.telefono').attr('href', 'tel:' + $.getFullTelefonoRadiotaxi()); 
 });
 
 $('#annullaCorsaFallita').bind('pageinit', function(event)      
 {         	  
     $.localizeMe('#annullaCorsaFallita');
 });
 


 $('#corsaFallita').bind('pageinit', function(event)      
 {         
     $.localizeMe('#corsaFallita');
 });
 

      
    $('#corsa').bind('pagebeforeshow',function(event) 
    { 
    	  $.checkUptime();
    	
    	  $("#jCryption").remove();     	  
    	  
    	  var values = $.getCorsaValues();
    	  
        $('#poisBlock').hide();
        if (values.pois != '' && values.pois != null)
        {
        	 $('#poisCorsa').html(values.pois);
        	 $('#poisBlock').show();
        }                             
        
        $('#indirizzo').val(values.indirizzo);                        
      
        $('#distretto').val(values.distretto); 
        
        $('#civico').val(values.civico);  
        
        $('.note').val('');
        
        $('.caratteristiche option:selected').removeAttr("selected");
        $('.caratteristiche').selectmenu("refresh");
        
        $.setCorsaValues('', '', '', '');
        
        /// Gestione prenotazioni
        if ($.isEnabledPrenotazioni())
        {
        	  $('#bloccoCorsa').hide();
        	  $('#bloccoCorsaPrenotazione').show();        	  
        }
        else
        {
        	  $('#bloccoCorsa').show();
        	  $('#bloccoCorsaPrenotazione').hide();
        }
    }); 
    
    $('#corsa').bind('pageinit', function(event)
    {     	     	
    	 $.localizeMe('#corsa');    	    	
    	 
    	 var unaCaratteristicaTrovata = false;    	     	 
    	 
       $(localStorage.getItem($.getNomeCollezioneCaratteristiche())).find('c').each(function()
       {
          var $caratteristica = $(this); 
          var value = $caratteristica.attr("value");
          var description = $caratteristica.find($.getLanguage()).text();                                   
          
          var html = '<option value="' + value + '">' + description + '</option>';            

          $('select.caratteristiche').append(html);
          
          unaCaratteristicaTrovata = true;
       });	      	          	 
    	 
       if (unaCaratteristicaTrovata)
    	 {
    	    $('#caratteristicheFieldSet').show();
    	 }    	 
       else
  	    {
    	    $('#caratteristicheFieldSet').hide();
  	    }
    	
   	 /* Autocompletamento */              
       $.setAutocomplete('#indirizzo', 'indirizzo', 'strade');
   	              
       $.setAutocomplete('#distretto', 'distretto', 'distretti');             

       
      function getDati()
      {         
         var parametri = $.getAction('inserisciCorsa') + 
                   '&cellulare=' + $.getCellulare() +
                   '&username=' + $.getUsername() +                                      
                   '&ind=' + $('#distretto').val() + ' ' + $("#indirizzo").val() + ' ' + $("#civico").val() +                   
                   '&note=' + $(".note").val();
         
         if ($(".caratteristiche").val() != null)
        	{
        	    parametri += '&car=' + $(".caratteristiche").val();
        	}
         
         return encodeURIComponent(parametri);
      }
      
      function InserisciOrdine()
      {
    	    $.mobile.showPageLoadingMsg ();
          $.inviaDati(getDati(),
                  function(data) {                     
                     $.mobile.hidePageLoadingMsg ();                     
                     
                     if (data == 'blacklist')
                     {
                        $.mobile.changePage("corsaBlackList.html", { role : "dialog"});
                     }
                     else if (data == 'user_not_found')
                     {
                        $.mobile.changePage("riregistrati.html", { role : "dialog"});
                     }
                     else if (data == 'automatico' || data == 'true')
                     {
                        $.setUltimaCorsaValues($('#indirizzo').val(), $('#civico').val(), $('#distretto').val(), '');
                        $.mobile.changePage("corsaSuccess.html", { role : "dialog"});
                     }                     
                     else
                     {
                        $.mobile.changePage("corsaFallita.html", { role : "dialog"});
                     }               
                  },
                  function(xhr, text, err) {
                    $.mobile.hidePageLoadingMsg ();                 
                    
                    $.mobile.changePage("corsaFallita.html", { role : "dialog"});
                  }
           );  
      }
      
      function Validate()
      {
    	    if ($('#indirizzo').val() == '')
          {
            $.myAlert($.localizeThis('IndicareUnIndirizzo'));
            $('#indirizzo').focus();
            return false;
          }
          
          if ($('#civico').val() == '')
          {
            $.myAlert($.localizeThis('IndicareUnCivico'));
            $('#civico').focus();
            return false;
          }
          
          if ($('#distretto').val() == '')
          {
            $.myAlert($.localizeThis('IndicareUnDistretto'));
            $('#distretto').focus();
            return false;
          }                   
          
          return true;
      }
      
      $('.prenota').click(function() {
    	  if (!Validate())
        {
          return false;  
        }    	      	 
    	  
    	  $.setCorsaValues($('#indirizzo').val(), $('#civico').val(), $('#distretto').val(), '');
    	  sessionStorage.setItem('note', $(".note").val());
    	  sessionStorage.setItem('caratteristiche', $(".caratteristiche").val());
    	  
    	  $.mobile.changePage("prenotazione.html");
      });
      
      $('.richiedi').click(function() {
    	    if (!Validate())
    	    {
    	    	return false;	
    	    } 
    	    
    	    if ($.isCorsaDuplicata($('#indirizzo').val(), $('#civico').val(), $('#distretto').val(), ''))
          {
              if ($.myConfirm($.localizeThis('OrdineDuplicato'), 
                    function(button) {
                       if (button == 1)
                       {
                     	  InserisciOrdine();
                       }
                       else
                       {
                     	  $('#indirizzo').focus();
                       }
                    })
                  ) 
              {
                 InserisciOrdine();
              }               
          }
    	    else
    	    {
    	    	 InserisciOrdine();
    	    }
      });            
    });
    
    $('#corsa').bind('pagebeforecreate', function(event)      
    {
      $.customizeMe();
    });
   

/*
 * [1984] - [2011] Microtek srl Udine 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Microtek srl Udine and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Microtek srl Udine
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Microtek srl Udine.
*/
var lang_ = {	
  it_it : {
    Indirizzo   : "Indirizzo",
    Preferiti   : "Preferiti",
    POIs        : "POIs",
    Trovami     : "Trovami",
    Elenco      : "Elenco",
    Taxi        : "Taxi!",
    Corse       : "Corse",
    Prenota     : "Prenota",
    Prenotazioni: "Prenotazioni",
    PRENOTAZIONE: "PRENOTAZIONE",    
    PREFERITI   : "PREFERITI",    
    Civico      : "Civico",
    Distretto   : "Distretto",
    Aggiungi    : "Aggiungi",
    Indietro    : "Indietro",
    Chiudi      : "Chiudi",   
    Aggiorna    : "Aggiorna",
    Nuovo       : "NUOVO",   
    CONTINUA    : "CONTINUA",
    Caratteristiche: "Caratteristiche",
    NomeECognome: "Nome e Cognome",
    Cellulare   : "Cellulare",
    Note        : "Note",
    Richiedi    : "Richiedi",
    Attenzione  : "Attenzione!",
    Successo    : "Successo!",
    Attendere   : "Attendere...",
    Condizioni  : "Condizioni",
    CorseSuccess: "Corse",    
    EntraIn     : "Entra in ",
    Riprova     : "Riprova",
    Orario      : "Orario",
    Giorno      : "Giorno",
    Annulla     : "Annulla",
    ImpostaOrario      : "Imposta Orario",
    SaltaAOggi         : "Salta a oggi",
    ImpostaLaData      : "Imposta la Data",
    UltimoAggiornamento: "Ultimo aggiornamento: ",
    RimuoviFavorito    : "Rimuovi favorito",
    RimuoviPrenotazione: "Questa procedura cancellerà la prenotazione. Continuare?",
    AnnullaCorsa       : "Questa procedura annullerà la corsa. Continuare?",
    LeMieCorse         : "LE MIE CORSE",    
    AggiungiPreferiti  : "Aggiungi anche un nome al preferito. Questo ti permetterà di ricercarlo più facilmente",
    IndicareUnIndirizzo: "Indicare un indirizzo.",
    IndicareUnCivico   : "Indicare un civico.",
    IndicareUnDistretto: "Indicare un distretto.",
    IndicareUnNome     : "Indicare un nome.",
    IndicareUnCellulare: "Indicare un cellulare.",
    IndicareUnCodice   : "Indicare il codice di accesso.",
    IndicareUnOrario   : "Indicare un orario.",
    IndicareUnGiorno   : "Indicare un giorno.", 
    VerificaServizi    : "Verifica servizi Radiotaxi.",
    OperazionePrende   : "L'operazione prende qualche secondo.",
    OrdineDuplicato    : "Attenzione! Desidera un altro taxi allo stesso indirizzo?",
    CorsaAnnullataCorrettamente   : "La corsa è stata annullata correttamente.",
    LaCorsaNonEStataAnnullata     : "La corsa non è stata annullata!",
    ErroreInFaseAnnullamentoCorsa : "Vi ricordiamo che è possibile annullare le corse solo entro un certo tempo. " + 
                                    "Per qualsiasi dubbio la preghiamo di contattare la nostra centrale al:",
    PrenotazioneAnnullataCorrettamente    : "La prenotazione è stata cancellata correttamente.",
    LaPrenotazioneNonEStataCancellata     : "La prenotazione non è stata cancellata!",
    ErroreInFaseCancellazionePrenotazione : "Vi ricordiamo che è possibile cancellare le prenotazioni solo entro un certo tempo. " + 
                                            "Per qualsiasi dubbio la preghiamo di contattare la nostra centrale al:",
    MancanzaConnettivita:          "<h2>Connessione Internet non disponibile.</h2>" +
                                   "<p>Non è stato possibile accedere ad Internet." +
                                   "Vi preghiamo di controllare le impostazioni del telefono e riprovare. Grazie.</p>",
    MancanzaConnettivitaCentrale: "<h2>Impossibile comunicare con la centrale.</h2>" +
      							    "<p>A causa di un problema tecnico non è stato possibile comunicare con la nostra centrale." +
      							    "Vi preghiamo di attendere qualche istante e riprovare. Grazie.</p>",
    LaCorsaNonEStataInserita    : "La corsa non è stata inserita",
    LaPrenotazioneNonEStataInserita    : "La prenotazione non è stata inserita",
    AutenticazioneFallita       : "Autenticazione fallita!",
    ErroreInFaseDiAutenticazione: "Spiacenti, a causa di un problema interno non siamo riusciti ad autenticarti. Ti preghiamo di effettuare nuovamente la procedura di registrazione.",
    ErroreInFaseInserimentoCorsa: "Spiacenti, si è verificato un errore durante l'inserimento della corsa. La preghiamo di riprovare o di contattare la nostra centrale. ",
    ErroreInFaseInserimentoPrenotazione: "Spiacenti, si è verificato un errore durante l'inserimento della prenotazione. La preghiamo di riprovare o di contattare la nostra centrale.",
    ErroreSeiInBlackList        : "Spiacenti, accesso negato. La preghiamo di contattare la nostra centrale al:",
    CorsaInseritaCorrettamente  : "La corsa è stata inserita correttamente.",
    PrenotazioneInseritaCorrettamente  : "La prenotazione è stata inserita correttamente.",
    CorsaInseritaInGestione     : "La corsa è in gestione da un operatore.",
    VisionareCorseInSezione     : "Puoi visionare lo stato delle tue corse nella sezione \"Corse\"",
    VisionarePrenotazioniInSezione     : "Puoi visionare lo stato delle tue prenotazioni nella sezione \"Prenotazioni\"",
    VisionareCorseInGestione    : "Poichè l'indirizzo indicato non è stato riconosciuto in automatico dal sistema, la tua richiesta sarà processata manualmente da un operatore. A breve la potrai vedere nella sezione \"Corse\".",
    ErroreInFaseDiCaricamento   : "Spiacenti... non è stato possibile comunicare con la centrale. Si prega di riprovare.",
    PerPrenotareUnTaxiChiama    : "Per poter prenotare un taxi chiama il numero:",
    NoPosizione                 : "Non è stato possibile determinare la tua posizione.",
    LaMiaPosizione              : "La mia posizione",
    BenvenutoIn                 : "Benvenuto in",
    RegistrazioneDescrizione    : "L'applicazione che ti permette di richiedere un taxi in modo facile ed intuitivo.",
    RegistrazionePochiIstanti   : "La procedura di registrazione prenderà pochi istanti.",
    RegistrazioneGeneralita     : "Inserisci le tue generalità ed il tuo numero di cellulare. Poi premi continua.",
    RegistrazioneFallita        : "Durante la registrazione si è verificato un errore. La preghiamo di riprovare o di chiamare la nostra centrale al numero",
    RegistrazioneCodiceAccesso  : "Un codice di accesso ti è stato spedito via SMS. Inseriscilo qua sotto",
    RegistrazioneCodicePerso    : "Se entro 60 secondi non hai ricevuto il tuo codice di accesso, un operatore sarà a tua disposizione al numero: ",
    RegistrazioneSuccesso       : "La registrazione è andata a buon fine.",
    RegistrazioneDescrServizio  : "Adesso puoi richiedere un taxi:" + 
						          "<ul>" + 
						          "<li>inserendo manualmente l'indirizzo</li>" +
						          "<li>tramite un punto di interesse</li>" +
						          "<li>localizzandoti tramite il GPS del tuo cellulare</li>" +
						          "<li>usando un indirizzo precedentemente salvato nella sezione \"Preferiti\"</li>" +
						          "</ul>",
	RegistrazioneIndicarePrefisso: "Inserisci il tuo prefisso nazionale o selezionalo dall'elenco:",
    ValutazioneProdottoMicrotek : "Benvenuta " + $.getRadiotaxiName() + ". Per poter visionare e valutare la nostra applicazione dovete obbligatoriamente installarla cliccando sull\'icona `%icon` e poi <strong>Aggiungi a Home</strong>.",
    Orientazione                : "<h2>Modalità landscape non abilitata.</h2><p>L'applicazione supporta solo la modalità portrait. Questo avviso non comparirà nell'applicazione finale.</p>",               
    GiorniDellaSettimana        : ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
    MesiDellAnno                : ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    PH_CodiceDiAccesso : "Codice di Accesso",
    PH_Indirizzo       : "Ad esempio: Via Roma",
    PH_Distretto       : "Ad esempio: " + $.getDistrettoDefault(),
    PH_CasaUfficio     : "Casa/Ufficio",
  },
  de_de : {
	 Indirizzo   : "Adresse",
	 Preferiti   : "Favoriten",
	 POIs        : "POIs",
	 Trovami     : "Finde Mich!",
	 Elenco      : "Liste",
	 Taxi        : "Taxi",
	 Corse       : "Bestell-Liste",
	 Prenota     : "Vorbestell.",
	 Prenotazioni: "Vorbestell.",
	 PRENOTAZIONE: "Vorbestellung",	 
	 PREFERITI   : "Favoriten",
	 Civico      : "HausNr.",
	 Distretto   : "Bezirk",
	 Aggiungi    : "Zusetzen",
	 Indietro    : "Zurück",
	 Chiudi      : "Zurück",
	 Aggiorna    : "Aktualisieren",
	 Nuovo       : "Neu",
	 CONTINUA    : "WEITER",
	 Caratteristiche: "Eigenschaften",
	 NomeECognome: "Vorname und Nachname",
	 Cellulare   : "Handynummer",
	 Note        : "Zusätzliche Infos",
	 Richiedi    : "Bestellen",
	 Attenzione  : "Achtung!",
	 Successo    : "Fertig!",
	 Attendere   : "Bitte warten...",
	 Condizioni  : "Bedingungen",
	 CorseSuccess: "Weiter",
	 EntraIn     : "Zu ",
	 Riprova     : "Verbindung versuchen",
	 Orario      : "Zeit",
	 Giorno      : "Datum",
	 Annulla     : "Stornieren",
	 ImpostaOrario      : "Zeit auswählen",
     SaltaAOggi         : "Zum heutigen Datum",
     ImpostaLaData      : "Datum auswählen",     
	 UltimoAggiornamento: "Letzte Aktualisierung: ",
	 RimuoviFavorito    : "Beliebte löschen",
	 RimuoviPrenotazione: "Möchten Sie die Vorbestellung stornieren?",
	 AnnullaCorsa       : "Möchten Sie die Bestellung stornieren?",
	 LeMieCorse         : "Bestell-Liste",
	 AggiungiPreferiti  : "Es ist möglich, der beliebten Adresse einen personalisierten Namen zu zuweisen. So werden Sie schnell und einfach Ihre beliebte Adresse finden!",
	 IndicareUnIndirizzo: "Bitte eine gültige Adresse eintippen.",
	 IndicareUnCivico   : "Bitte eine gültige Hausnummer eintippen.",
	 IndicareUnDistretto: "Bitte einen gültigen Bezirk eintippen.",
	 IndicareUnNome     : "Bitte einen Namen eintippen.",
	 IndicareUnCellulare: "Bitte die eigene Handynummer eintippen.",
	 IndicareUnCodice   : "Bitte den Zugangskode eintippen.",
	 IndicareUnOrario   : "Bitte die Zeit auswählen.",
	 IndicareUnGiorno   : "Bitte das Datum auswählen.",
	 VerificaServizi    : "Prüfung der Anwendung...",
	 OperazionePrende   : "Die Operation könnte einige<br> Sekunden dauern.",
	 OrdineDuplicato    : "Aufgepasst! Möchten Sie ein anderes Taxi zu dieser Abholadresse?",
	 CorsaAnnullataCorrettamente   : "Die Bestellung wurde erfolgreich storniert.",
	 LaCorsaNonEStataAnnullata     : "Die Bestellung wurde nicht storniert!",
	 ErroreInFaseAnnullamentoCorsa : "Ops! Es ist zu spät! Der Taxifahrzeug ist bereits zu Ihnen unterwegs! Benötigen Sie weitere Infos? " + 
	                                 "Kontaktieren Sie unsere Taxizentrale unter:",
	 PrenotazioneAnnullataCorrettamente    : "Die Vorbestellung wurde erfolgreich storniert.",
	 LaPrenotazioneNonEStataCancellata     : "Die Vorbestellung wurde nicht storniert!",
	 ErroreInFaseCancellazionePrenotazione : "Ops! Es ist zu spät! Der Taxifahrzeug ist bereits zu Ihnen unterwegs! Benötigen Sie weitere Infos? " + 
     										 "Kontaktieren Sie unsere Taxizentrale unter:",
     MancanzaConnettivita        : "<h2>Internet-Verbindung nicht verfügbar.</h2>" +
                                   "<p>Leider ist es unmöglich auf Internet zu zugreifen." +
     	                           "Prüfen Sie bitte die Handy-Einstellungen und versuchen Sie die Verbindung nochmals. Danke.</p>",
     MancanzaConnettivitaCentrale: "<h2>Achtung! Ein Fehler ist bei der Verbindung mit der Taxizentrale aufgetreten.</h2>" +
		  						   "<p>Bitte warten Sie einen Augenblick und versuchen Sie dann nochmal Ihr Taxi Zu Bestellen!" +
		  						   "Wir bitten um Entschuldigung für die Unannehmlichkeit!</p>",
	 LaCorsaNonEStataInserita    : "Die Bestellung wurde nicht angenommen.",
	 LaPrenotazioneNonEStataInserita    : "Die Vorbestellung wurde nicht angenommen.",
	 AutenticazioneFallita       : "Achtung! Die Beglaubigung ist gescheitert!",
	 ErroreInFaseDiAutenticazione: "Leider ist die Beglaubigung wegen eines internen Fehlers gescheitert. Bitte registrieren Sie sich nochmals.",
	 ErroreInFaseInserimentoCorsa: "Achtung! Ein Fehler ist bei Annahme Ihrer Bestellung aufgetreten. Wir bitten Sie höflichst, die Taxizentrale unter der Nummer zu kontaktieren.",
	 ErroreInFaseInserimentoPrenotazione: "Achtung! Ein Fehler ist bei Annahme Ihrer Vorbestellung aufgetreten. Wir bitten Sie höflichst, die Taxizentrale unter der Nummer zu kontaktieren.",
	 ErroreSeiInBlackList        : "Zugriff verweigert. Kontaktieren Sie bitte die Zentrale an:",
	 CorsaInseritaCorrettamente  : "Ihre Bestellung wurde erfolgreich angenommen.",
	 PrenotazioneInseritaCorrettamente  : "Ihre Vorbestellung wurde erfolgreich angenommen.",
	 CorsaInseritaInGestione     : "Ihre Bestellung wird bearbeitet...",
	 VisionareCorseInSezione     : "Sie können sich den Zustand Ihrer Bestellungen in der Sektion \"Bestellungen\" anschauen.",
	 VisionarePrenotazioniInSezione     : "Sie können sich den Zustand Ihrer Vorbestellungen in der Sektion \"Vorbestell.\" anschauen.",
	 VisionareCorseInGestione    : "Poichè l'indirizzo indicato non è stato riconosciuto in automatico dal sistema, la tua richiesta sarà processata manualmente da un operatore. A breve la potrai vedere nella sezione \"Corse\".",
	 ErroreInFaseDiCaricamento   : "Leider ist momentan keine Verbindung möglich. Versuchen sie es später nochmals.",
	 PerPrenotareUnTaxiChiama    : "Zur Taxi-Vorbestellung, bitte die TaxiZentrale anrufen. Klicken Sie bitte auf die untenliegende Telefonnummer.",
	 NoPosizione                 : "Achtung! Ihre Position konnte nicht ermittelt werden.",
	 LaMiaPosizione              : "Meine Position",
	 BenvenutoIn                 : "Herzlich Willkommen in ",
	 RegistrazioneDescrizione    : "Die hochentwickelte App, die die Taxibestellung einfacher und schneller macht!",
	 RegistrazionePochiIstanti   : "Die Registrierung dauert nur ein paar Sekunden.",
	 RegistrazioneGeneralita     : "Bitte tippen Sie Ihre Personalien und Handynummer ein. Dann betätigen Sie \"Weiter\".",
	 RegistrazioneFallita        : "Achtung! Ein Fehler ist bei der Registrierung aufgetreten. Bitte versuchen Sie später noch mal Ihr Taxi zu bestellen, oder kontaktieren Sie die Taxizentrale unter der Nummer ",
	 RegistrazioneCodiceAccesso  : "Ein Zugangscode wurde per SMS an Ihre Handynummer gesandt. Tippen Sie bitte den Code hier unten ein",
	 RegistrazioneCodicePerso    : "Wenn Sie innerhalb 60 Sekunden keinen Zugangscode per SMS bekommen, wenden Sie sich bitte an die Taxizentrale unter der Nummer: ",
	 RegistrazioneSuccesso       : "Die Registrierung wurde erfolgreich angenommen.",
	 RegistrazioneDescrServizio  : "Jetzt können Sie Ihr Taxi bestellen:" + 
								   "<ul>" + 
								   "<li>Tippen Sie die Abholadresse ein</li>" +
								   "<li>Wählen Sie ein POI aus</li>" +
								   "<li>GPS-Ortung durch Ihr Handy</li>" +
								   "<li>Wählen sie eine Adresse aus der Sektion \"Favoriten\" aus</li>" +
								   "</ul>",	
     RegistrazioneIndicarePrefisso: "Bitte die internationale Vorwahlnummer eintippen, oder sie aus der Liste auswählen:",
	 ValutazioneProdottoMicrotek : "Willkommen " + $.getRadiotaxiName() + "!! Um das Testen der App zu starten, betätigen Sie das Icon `%icon`,um die App zu installieren und dann <strong>Zum Home-Bildschirm</strong>.",
	 Orientazione                : "<h2> Landscape-Modalität nicht freigegeben.</h2><p>Die Anwendung verwendet nur die Portrait-Modalität. Diese Meldung wird bei der auf Apple-Store registrierten Anwendung nicht angezeigt.</p>",
	 GiorniDellaSettimana        : ['So','Mo','Di','Mi','Do','Fr','Sa'],
	 MesiDellAnno                : ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
	 PH_CodiceDiAccesso : "Zugangscode",
	 PH_Indirizzo       : "Z.B.: Domplatz.",
	 PH_Distretto       : "Z.B.: " + $.getDistrettoDefault(),
	 PH_CasaUfficio     : "Haus/Büro",	 
  },
  en_us : {
	 Indirizzo   : "Address",
	 Preferiti   : "Favourites",
	 POIs        : "POIs",
	 Trovami     : "Find Me!",
	 Elenco      : "List",
	 Taxi        : "Taxi",
	 Corse       : "Journey List",
	 Prenota     : "Book",
	 Prenotazioni: "Bookings",
	 PRENOTAZIONE: "Booking",	 
	 PREFERITI   : "Favourites",
	 Civico      : "Nr.",
	 Distretto   : "District",
	 Aggiungi    : "Add",
	 Indietro    : "Back",
	 Chiudi      : "Close",
	 Aggiorna    : "Update",
	 Nuovo       : "New",
	 CONTINUA    : "CONTINUE",
	 Caratteristiche: "Additional services",
	 NomeECognome: "Name and Surname",
	 Cellulare   : "Phone Number",
	 Note        : "Note",
	 Richiedi    : "Request",
	 Attenzione  : "Attention!",
	 Successo    : "Success!",
	 Attendere   : "Please wait...",
	 Condizioni  : "Conditions of use",
	 CorseSuccess: "Continue",
	 EntraIn     : "To",
	 Riprova     : "Try again",
	 Orario      : "Time",
	 Giorno      : "Date",
	 Annulla     : "Cancel",
	 ImpostaOrario      : "Select time",
     SaltaAOggi         : "Back to today",
     ImpostaLaData      : "Select date",     
	 UltimoAggiornamento: "Last Update: ",
	 RimuoviFavorito    : "Remove Favourite",
	 RimuoviPrenotazione: "Do you really want to cancel the booking?",
	 AnnullaCorsa       : "Do you really want to cancel the journey?",
	 LeMieCorse         : "Journey List",
	 AggiungiPreferiti  : "It is possible to bookmark your favourite addresses. This way you can request easily and quickly a cab.",
	 IndicareUnIndirizzo: "Please indicate a valid address.",
	 IndicareUnCivico   : "Please indicate a valid house number.",
	 IndicareUnDistretto: "Please indicate a valid district.",
	 IndicareUnNome     : "Please insert a name.",
	 IndicareUnCellulare: "Please indicate your phone number.",
	 IndicareUnCodice   : "Please insert the access code.",
	 IndicareUnOrario   : "Please select the time.",
	 IndicareUnGiorno   : "Please select the date.",
	 VerificaServizi    : "Checking the Radiotaxi services.",
	 OperazionePrende   : "The operation could take some<br> seconds.",
	 OrdineDuplicato    : "Attention! Would you like another taxi at the same address?",
	 CorsaAnnullataCorrettamente   : "The journey was succesfully cancelled.",
	 LaCorsaNonEStataAnnullata     : "The journey wasn't been cancelled!",
	 ErroreInFaseAnnullamentoCorsa : "Attention! Please note, that a journey cannot be cancelled after a certain time. " + 
	                                 "Do you need further information?  Please contact our taxi call-center at following number:",
	 PrenotazioneAnnullataCorrettamente : "The booking has been succesfully cancelled.",
	 LaPrenotazioneNonEStataCancellata     : "The booking hasn't been cancelled!",
	 ErroreInFaseCancellazionePrenotazione : "Attention! Please note, that a booking cannot be cancelled after a certain time. " + 
	                                         "Do you need further information?  Please contact our taxi call-center at following number:",
	 MancanzaConnettivita        : "<h2>Internet connection not available!</h2>" +
	                               "<p>It is impossibile to connect to Internet. " +
	           	                   "Please check your mobile setup and try again. Thanks.</p>",
	 MancanzaConnettivitaCentrale: "<h2>Attention! An error occurred while connecting with the taxi call center.</h2>" +
		  						   "<p>Please try again in a few minutes!" +
		  						   "We are really sorry for the unconvenience!</p>",
	 LaCorsaNonEStataInserita    : "Your request wasn't treated.",
	 LaPrenotazioneNonEStataInserita    : "Your booking wasn't treated.",
	 AutenticazioneFallita       : "Attention! Autentication failed!",
	 ErroreInFaseDiAutenticazione: "Due to an internal error Your autentication failed. You are kindly requested to registrer yourself once again.",
	 ErroreInFaseInserimentoCorsa: "Attention! An error occurred while treating your request. Please, contact directly the taxi call-center. ",
	 ErroreInFaseInserimentoPrenotazione: "Attention! An error occurred while treating your booking. Please, contact directly the taxi call-center. ",
	 ErroreSeiInBlackList        : "Access denied. Please contact directly the taxi call-center at following number:",
	 CorsaInseritaCorrettamente  : "Your request has successfully been treated.",
	 PrenotazioneInseritaCorrettamente  : "Your booking has successfully been treated.",
	 CorsaInseritaInGestione     : "Your request is beeing trated...",
	 VisionareCorseInSezione     : "You can check the status of your requests in the section \"Journey list\".",
	 VisionarePrenotazioniInSezione     : "You can check the status of your bookings in the section \"Bookings\".",
	 VisionareCorseInGestione    : "As the given address wasn't automstically recognized by the system, your request will be treated directly by an operator. You'll find it in a while into the section \"Journey List\".",
	 ErroreInFaseDiCaricamento   : "Attention! No connection with the taxi call-center available. Please try again in a while.",
	 PerPrenotareUnTaxiChiama    : "In order to book a cab, please contact directly the taxi call-center. Please click on the following phonenumber:",
	 NoPosizione                 : "Attention! It is not possible to pick your position.",
	 LaMiaPosizione              : "My position",
	 BenvenutoIn                 : "Welcome to",
	 RegistrazioneDescrizione    : "The App that makes easier to get a taxi!",
	 RegistrazionePochiIstanti   : "The registration will take just some minutes.",
	 RegistrazioneGeneralita     : "Please insert your personal data and phone number. Then click on \"Continue\".",
	 RegistrazioneFallita        : "Attention! An error occurred during the registration. Please try again in a while or contact the taxi call-center at ",
	 RegistrazioneCodiceAccesso  : "An access code was sent per SMS to the given phone number. Please insert the code in the field below",
	 RegistrazioneCodicePerso    : "If you don't receive any access code in the next 60 seconds, you're kindly required to contact the taxi call-center:",
	 RegistrazioneSuccesso       : "Registration successed!",
	 RegistrazioneDescrServizio  : "Now you can request your cab:" + 
								   "<ul>" + 
								   "<li>Indicate your pick-up adress</li>" +
								   "<li>Select a POI</li>" +
								   "<li>Pick my GPS-Position</li>" +
								   "<li>Select an address from the section \"Favourites\"</li>" +
								   "</ul>",	
	 RegistrazioneIndicarePrefisso: "Please insert your country calling code or select it from the list below:",
	 ValutazioneProdottoMicrotek : "Welcome" + $.getRadiotaxiName() + "!! In order to test the APP, click on the icon `%icon` to install the APP and then select <strong>Home</strong>.",
	 Orientazione                : "<h2> Landscape-Mode disabled.</h2><p>The APP uses only Portrait-Mode. The present message won't be shown using the Apple Store registered APP version.</p>",
	 GiorniDellaSettimana        : ['Su','Mo','Tu','We','Th','Fr','Sa'],
	 MesiDellAnno                : ['January', 'February', 'March', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	 PH_CodiceDiAccesso : "Access code",
	 PH_Indirizzo       : "E.g.: Domplatz.",
	 PH_Distretto       : "E.g.: " + $.getDistrettoDefault(),
	 PH_CasaUfficio     : "Home/Office",	
   },   
};

lang_['en_en'] = lang_['en_us'];
lang_['en_gb'] = lang_['en_us'];

var language = navigator.language.replace('-', '_').toLowerCase();

var lang = $.getUrlVar('lang');

if (lang != '')
{
	language = lang;
}

if (language.length == 2)
{
	language = language + "_" + language;
}

var lang = language in lang_ ? lang_[language] : lang_[$.getDefaultLang()]; 




/*
 * [1984] - [2012] Microtek srl Udine 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Microtek srl Udine and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Microtek srl Udine
 * and its suppliers and may be covered by Italy and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Microtek srl Udine.
*/
var userdef = 'INNS';
var verapp  = '2.0';
var inDebug = false;

var customizazzione = {
	TEST : {
		radiotaxi : 'Test',
		radiotaxiName : 'Taxi Test',
		telefono : '1234',
		appName : 'Taxi1234',
		iconPath: 'Default',
		defaultLang: 'de_de',
		prenotazioni: true,
		distrettoDefault: "Test",
		notifichePush: false,
		storno: true,
		prefisso: '+39',
		prefissoLocale: '432',
		latitudine: 46.112270,
		longitudine: 13.217282,
	},
	INNS : {
		radiotaxi : 'INNS',
		radiotaxiName : 'Taxi Innsbruck',
		telefono : '5311',
		appName : 'Taxi5311',
		iconPath: 'Taxi5311',
		defaultLang: 'de_de',
		prenotazioni: false,
		distrettoDefault: "Innsbruck",
		notifichePush: true,
		storno: true,
		prefisso: '+43',
		prefissoLocale: '512',
		latitudine: 47.263082,
		longitudine: 11.399130,
	},
	SALZ : {
		radiotaxi : 'SALZ',
		radiotaxiName : 'Taxi Salzburg',
		telefono : '8111',
		appName : 'Taxi 8111',
		iconPath: 'Taxi8111',
		defaultLang: 'de_de',
		prenotazioni: true,
		distrettoDefault: "Altstadt",
		notifichePush: true,
		storno: true,
		prefisso: '+43',
		prefissoLocale: '662',
		latitudine: 47.810438,
		longitudine: 13.042895,
	},
	COL : {
		radiotaxi : 'COL',
		radiotaxiName : 'Taxi-Ruf Köln',
		telefono : '2882',
		appName : 'Taxi Köln',
		iconPath: 'TaxiKoln',
		defaultLang: 'de_de',
		prenotazioni: false,
		distrettoDefault: "Altstadt",
		notifichePush: true,
		storno: false,
		prefisso: '+49',
		prefissoLocale: '221',
		latitudine: 50.917090,
		longitudine: 6.954860,
	},
	NOR : {
		radiotaxi : 'NOR',
		radiotaxiName : 'Taxi Nürnberg',
		telefono : '19410',
		appName : 'Taxi19410',
		iconPath: 'Taxi19410',
		defaultLang: 'de_de',
		prenotazioni: true,
		distrettoDefault: "Altstadt",
		notifichePush: false,
		storno: true,
		prefisso: '+49',
		prefissoLocale: '911',
		latitudine: 49.489266,
		longitudine: 11.106120,
	},
	YELLOW : {
		radiotaxi : 'YELLOW',
		radiotaxiName : 'Yellow Taxi',
		telefono : '026969',
		appName : 'YellowTaxi',
		iconPath: 'Default',
		defaultLang: 'it_it',
		prenotazioni: true,
		distrettoDefault: "Milano",
		notifichePush: false,
		storno: true,
		prefisso: '+39',
		prefissoLocale: '2',
		latitudine: 46.112270,
		longitudine: 13.217282,
	}
};

// 2.0 - Rinnovata l'interfaccia grafica per IOs
//     - Perfezionata la gestione del GPS
//     - Migliorata nettamente la gestione della crifatura
// 1.8 - Modificata la digitura in Lang in caso di mancata connessione verso il server
//     - Introdotta customizzazione per storno corsa
//     - Spostato e migrato i preferiti su localStorage per nuova gestione in IOs 5.1
// 1.7 - Modifica al codice js e css per supportare dispositivi Android
//     - Aggiornata libreria iScroll, Datebox
//     - Introdotta PushNotification per Android
//     - Disabilitato la transition page in apertura (rende l'app molto piu' fluida)
//     - Introdotto il concetto di connettivita' persa, se google map non raggiunbile
//     - La transition page per aggiungere i preferiti non routa bensì scrolla giù e su
// 1.6 - Possibilità di annullare una corsa o di cancellare una prenotazione 
//     - Avviso stesso ordine entro 10 min
// 1.5 - Registrazione facilitata con l'indicazione del prefisso internazione
//     - Aggiunto en_gb sulla localizzazione
//     - Aggiunto coordinate di default in caso di GPS non attivato
//     - Localizzazione delle caratteristiche selettive
//     - Numero civico possibile inserire anche le lettere
// 1.4 - Abilitata la gestione PUSH
//       Modificato alcune scritte in tedesco
// 1.3 - Identificazione sessione utente tramite id app
// 1.2 - Nel caso in cui non ci siano punti di interesse, nell'header scompare il pulsante
//     - Aggiornata funzione detect smartphones per Android
// 1.1 - 


var PushNotification = function() {

}

// call this to register for push notifications
PushNotification.prototype.register = function(success, fail, options) {
    cordova.exec(success, fail, "PushNotification", "registerAPN", options);
};

// call this to notify the plugin that the device is ready
PushNotification.prototype.startNotify = function(notificationCallback) {
    cordova.exec(null, null, "PushNotification", "startNotify", []/* BUG - dies on null */);
};

// use this to log from JS to the Xcode console - useful!
PushNotification.prototype.log = function(message) {
    cordova.exec(null, null, "PushNotification", "log", [{"msg":message,}]);
};


cordova.addConstructor(function() 
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
	window.plugins.pushNotification = new PushNotification();
});

/* When this function is called, Cordova has been initialized and is ready to roll */
function pushInitState() {
	// IMPORTANT: must start notify after device is ready,
	// otherwise you will not be able to receive the launching notification in
	// callback
	// PushNotification.startNotify();
	window.plugins.pushNotification.log("onDeviceReady called");
	window.plugins.pushNotification.startNotify();
}

// Customized callback for receiving notification
PushNotification.prototype.notificationCallback = function(notification) {
	window.plugins.pushNotification.log("Received a notification.");
	var msg = '';
	for ( var property in notification) {
		msg += property + ' : ' + notification[property] + '<br>';
	}	

	$.myAlert(notification['alert']);

	$.mobile.changePage('lemiecorse.html', {transition: "none"});
};

// when APN register succeeded
function pushSuccessCallback(e) {
	window.plugins.pushNotification.log("Device registered. Device token: " + e.deviceToken);
	pushRegisterUAPush(e.deviceToken, e.host, e.appKey, e.appSecret);
}

// when APN register failed
function pushErrorCallback(e) {
	window.plugins.pushNotification.log("Error during registration: " + e.error);
}

// register button action
function pushRegisterAPN() {

	window.plugins.pushNotification.log("Registering with APNS via the App Delegate");

	window.plugins.pushNotification.register(pushSuccessCallback,
			pushErrorCallback, [ {
				alert : true,
				badge : true,
				sound : true
			} ]);

	// or unregister
	// navigator.pushNotification.register();
}

// register urban airship push service after APN is registered successfully
function pushRegisterUAPush(deviceToken, host, appKey, appSecret) {

	window.plugins.pushNotification.log("Registering with Urban Airship.");

	var request = new XMLHttpRequest();

	// open the client and encode our URL
	request.open('PUT', host + 'api/device_tokens/' + deviceToken, true,
			appKey, appSecret);

	// callback when request finished
	request.onload = function() {
		window.plugins.pushNotification.log('Status: ' + this.status);

		if (this.status == 200 || this.status == 201) 
		{
			$.setDeviceToken(deviceToken);
			
			// register UA push success
			window.plugins.pushNotification.log('UA push service successfully registered.');
		} else {
			// error
			window.plugins.pushNotification.log('Error when registering UA push service. Error: ' + this.statusText);
		}
	};

	request.send();
}



function AndroidPushCallback()
{
	cordova.exec(window.plugins.pushNotification.apidCallback, 
	             window.plugins.pushNotification.apidCallback, 
	             'PushNotificationPlugin',
	             'apidCallBack',
	             []);	
}

var PushNotification = {
    registerCallback: function(successCallback, failureCallback) {

        return cordova.exec(
        		AndroidPushCallback,           // called when signature capture is successful
        		AndroidPushCallback,           // called when signature capture encounters an error
               'PushNotificationPlugin',  // Tell PhoneGap that we want to run "PushNotificationPlugin"
               'registerCallback',        // Tell the plugin the action we want to perform
               []);                       // List of arguments to the plugin
    },
    notificationCallback: function(json) {
        var data = window.JSON.parse(json);
        
        $.myAlert(data.msg);
        $.mobile.changePage('lemiecorse.html', {transition: "none"});
    },
    apidCallback: function(apid) {      	
    	$.setDeviceToken(apid);
    }    
};

cordova.addConstructor(function() {	
    cordova.addPlugin("pushNotification", PushNotification);
});


$(document).bind('mobileinit', function(){
        /*alert('ciao');
        $.support.touchOverflow = true;
        $.mobile.touchOverflowEnabled = true;*/
	
	$.mobile.pushStateEnabled = false;
	
	if ($.isAndroid())
    {
    	$.mobile.defaultPageTransition = 'none';
    	$.mobile.defaultDialogTransition = 'none';
    }
});

// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
        if(factory && (typeof factory.create == 'undefined')) {
          // If NP_Initialize() returns an error, factory will still be created.
          // We need to make sure this case doesn't cause Gears to appear to
          // have been initialized.
          factory = null;
        }
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();


/*
 * [1984] - [2011] Microtek srl Udine 
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Microtek srl Udine and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Microtek srl Udine
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Microtek srl Udine.
*/
var db;
var shortName = 'Preferiti';
var version = '1.0';
var displayName = 'Preferiti';
var maxSize = 65536;

function seNonEsisteCreaTabellaPreferiti() {
	db
			.transaction(function(transaction) {
				transaction
						.executeSql('CREATE TABLE IF NOT EXISTS preferiti '
								+ ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, citta TEXT, indirizzo TEXT, civico TEXT)');
			});
}

function openDb() {
	db = openDatabase(shortName, version, displayName, maxSize);

	seNonEsisteCreaTabellaPreferiti();
}

function migrazioneVecchiPreferitiNuovaGestione()
{
	openDb();
	
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM preferiti', [], function(
				transaction, result) {			

			for ( var i = 0; i < result.rows.length; i++) {
				var row = result.rows.item(i);
				
				var preferito = {id: i,
   	                 nome: row.nome,
   	                 citta: row.citta,
   	                 indirizzo: row.indirizzo,
   	                 civico: row.civico    	    	                     
                     };
				
				$.addPreferito(preferito);
			}
			
			transaction.executeSql('DELETE FROM preferiti', null, null, errorHandler3);			
		});
	});
	
	
}

function createEntry(nome, citta, indirizzo, civico) {

	db
			.transaction(function(transaction) {
				transaction
						.executeSql(
								'INSERT INTO preferiti (nome, citta, indirizzo, civico) VALUES (?, ?, ?, ?);',
								[ nome, citta, indirizzo, civico ], function() {
									/* Decidere cosa fare in caso di successo della query: per ora nulla.*/
								}, errorHandler1);
			});
}

function errorHandler1(transaction, error) {
	$.myAlert('1: ' + error);
}

function errorHandler2(transaction, error) {
	$.myAlert('2: ' + error);
}

function errorHandler3(transaction, error) {
	$.myAlert('3: ' + error);
}

function deleteEntry(clickedEntryId, clickedEntry)
{
	deleteEntryById(clickedEntryId);

	//La seguente si occupa di far scomparire la riga della lista corrispondente al Preferito eliminato.
	clickedEntry.slideUp();
}

function refreshEntries(elementToClone, elementoToAppend, elementToScroll) {

	$('.cancellami').remove();

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM preferiti', [], function(
				transaction, result) {			

			for ( var i = 0; i < result.rows.length; i++) {
				var row = result.rows.item(i);

				var newEntryRow = $(elementToClone).clone();

				newEntryRow.removeAttr('id');
				newEntryRow.removeAttr('style');
				newEntryRow.addClass('cancellami');

				/* ogni riga della unordered list avra' un identificativo univoco che ci permettera' di operare (es. eliminare)*/
				newEntryRow.data('entry', row.id);

				newEntryRow.appendTo(elementoToAppend);

				newEntryRow.find('.nome').text(row.nome);
				newEntryRow.find('.citta').text(row.citta);
				newEntryRow.find('.indirizzo').text(row.indirizzo);
				newEntryRow.find('.civico').text(row.civico);										
				
				newEntryRow.find('.link').data('entry', {ind : row.indirizzo, civ : row.civico, dis : row.citta});
				
				newEntryRow.find('.link').click(function(){					   
				   var clickedEntry = $(this);
				   
            	   $.setCorsaValues(clickedEntry.data('entry').ind, 
            			   clickedEntry.data('entry').civ, clickedEntry.data('entry').dis, '');                                   
                   $.mobile.changePage('corsa.html', {reverse: true});
	            });

				/* Definiamo l'evento di cancellazione nel momento in cui premiamo su Delete in corrispondenza di un Preferito*/
				newEntryRow.find('.delete').click(function() {
					var clickedEntry = $(this).parent();
					var clickedEntryId = clickedEntry.data('entry');

					if ($.myConfirm($.localizeThis('RimuoviFavorito') + '?', 
							function(button) {
								if (button == 1)
								{
									deleteEntry(clickedEntryId, clickedEntry);
								}
							})
					   ) 
					{
						deleteEntry(clickedEntryId, clickedEntry);
					}
				});						

			}
			
			$.activateScroll(elementToScroll);
			
		}, errorHandler2);
	});
}

function deleteEntryById(id) {
	db.transaction(function(transaction) {
		transaction.executeSql('DELETE FROM preferiti WHERE id=?;', [ id ],
				null, errorHandler3);
	});
}


var PushNotification = function() {

}

// call this to register for push notifications
PushNotification.prototype.register = function(success, fail, options) {
    PhoneGap.exec(success, fail, "PushNotification", "registerAPN", options);
};

// call this to notify the plugin that the device is ready
PushNotification.prototype.startNotify = function(notificationCallback) {
    PhoneGap.exec(null, null, "PushNotification", "startNotify", []/* BUG - dies on null */);
};

// use this to log from JS to the Xcode console - useful!
PushNotification.prototype.log = function(message) {
    PhoneGap.exec(null, null, "PushNotification", "log", [{"msg":message,}]);
};


PhoneGap.addConstructor(function() 
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
	window.plugins.pushNotification = new PushNotification();
});

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){$.a=3(a,b,c){$[a]=$[a]||{};$[a][b]=3(a,b){4(I.N){2.1i(a,b)}};$[a][b].E=c;$.1f[b]=3(d){k e=2,f=F.E.18.1a(I,1),g=2d d===\'2c\';4(g&&d.2b(0,1)===\'2a\'){7 e}2.29(3(){k h=$.1c(2,b);4(!h){h=$.1c(2,b,l $[a][b](d,2))}4(g){k i=h[d].1n(h,f);4(i!=q){e=i}}});7 e}};$.a("28","27",{n:{26:\'23\',1Z:5},1S:3(a,b){4(b){2.n[a]=b;2.6(\'j\').z(2.n)}7 2.n[a]},1i:3(a,b){2.T=$(b);r.s(2.n,a);2.n.1h=2.w(2.n.1h);2.1j();4(2.1l){2.1l()}},1j:3(){k a=2;a.p={\'j\':l 9.8.1r(a.T[0],a.n),\'L\':[],\'t\':[],\'u\':[],\'Q\':l 9.8.1O};9.8.D.1J(a.p.j,\'1E\',3(){a.T.12(\'1D\',a.p.j)});a.x(a.n.1C,a.p.j)},16:3(a){2.6(\'G\',l 9.8.1B()).s(2.w(a));2.6(\'j\').2f(2.6(\'G\'))},1A:3(a){k b=2.6(\'j\').1z();7(b)?b.1x(a.1d()):1v},1u:3(a,b){2.6(\'j\').1t[b].M(2.A(a))},1R:3(a,b,c){a.j=2.6(\'j\');a.1k=2.w(a.1k);k d=l(c||9.8.1s)(a);k f=2.6(\'L\');4(d.1m){f[d.1m]=d}m{f.M(d)}4(d.G){2.16(d.1d())}2.x(b,a.j,d);7 $(d)},y:3(a){2.S(2.6(a));2.P(a,[])},S:3(a){B(b O a){4(a.1g(b)){4(a[b]v 9.8.1e){9.8.D.1w(a[b]);a[b].K(q)}m 4(a[b]v F){2.S(a[b])}a[b]=q}}},1y:3(a,b,c){k d=2.6(a);B(e O d){4(d.1g(e)){c(d[e],((b.1b&&d[e][b.J])?(d[e][b.J].H(b.1b).15(b.13)>-1):(d[e][b.J]===b.13)))}}},6:3(a,b){k c=2.p;4(!c[a]){4(a.15(\'>\')>-1){k e=a.11(/ /g,\'\').H(\'>\');B(k i=0;i<e.N;i++){4(!c[e[i]]){4(b){c[e[i]]=((i+1)<e.N)?[]:b}m{7 q}}c=c[e[i]]}7 c}m 4(b&&!c[a]){2.P(a,b)}}7 c[a]},1F:3(a,b){2.6(\'Q\').z(a);2.6(\'Q\').1G(2.6(\'j\'),2.A(b))},P:3(a,b){2.p[a]=b},1H:3(a){k b=2.6(\'j\');k c=b.1I();$(b).10(\'1K\');b.1L(c)},1M:3(){2.y(\'L\');2.y(\'u\');2.y(\'t\');B(b O 2.p){2.p[b]=q}},x:3(a){4(a&&$.1N(a)){a.1n(2,F.E.18.1a(I,1))}},w:3(a){4(!a){7 l 9.8.R(0.0,0.0)}4(a v 9.8.R){7 a}m{k b=a.11(/ /g,\'\').H(\',\');7 l 9.8.R(b[0],b[1])}},A:3(a){4(!a){7 q}m 4(a v r){7 a[0]}m 4(a v 1P){7 a}7 $(\'#\'+a)[0]},1Q:3(a,b,c){k d=2;k e=2.6(\'u > 1q\',l 9.8.1q());k f=2.6(\'u > 14\',l 9.8.14());4(b){f.z(b)}e.1T(a,3(g,h){4(h===\'1U\'){f.1V(g);f.K(d.6(\'j\'))}m{f.K(q)}d.x(c,g,h)})},1W:3(a,b){2.6(\'j\').1X(2.6(\'u > Z\',l 9.8.Z(2.A(a),b)))},1Y:3(a,b){2.6(\'u > Y\',l 9.8.Y()).20(a,b)},21:3(a,b){7 $(2.6(\'t > \'+a,[]).M(l 9.8[a](r.s({\'j\':2.6(\'j\')},b))))},22:3(a,b){((!b)?2.6(\'t > C\',l 9.8.C()):2.6(\'t > C\',l 9.8.C(b,a))).z(r.s({\'j\':2.6(\'j\')},a))},24:3(a,b,c){2.6(\'t > \'+a,l 9.8.25(b,r.s({\'j\':2.6(\'j\')},c)))}});r.1f.s({W:3(a,b){7 2.o(\'W\',a,b)},1p:3(a){7 2.o(\'1p\',a)},19:3(a,b){7 2.o(\'19\',a,b)},17:3(a,b){7 2.o(\'17\',a,b)},V:3(a,b){7 2.o(\'V\',a,b)},U:3(a){7 2.o(\'U\',a)},1o:3(a){7 2.o(\'1o\',a)},10:3(a){9.8.D.12(2[0],a)},o:3(a,b,c){4(9.8&&2[0]v 9.8.1e){9.8.D.2e(2[0],a,b)}m{4(c){2.X(a,b,c)}m{2.X(a,b)}}7 2}})}(r));',62,140,'||this|function|if||get|return|maps|google||||||||||map|var|new|else|options|addEventListener|_a|null|jQuery|extend|overlays|services|instanceof|_latLng|_call|clear|setOptions|_unwrap|for|FusionTablesLayer|event|prototype|Array|bounds|split|arguments|property|setMap|markers|push|length|in|set|iw|LatLng|_c|el|drag|mouseout|click|bind|Geocoder|StreetViewPanorama|triggerEvent|replace|trigger|value|DirectionsRenderer|indexOf|addBounds|mouseover|slice|dblclick|call|delimiter|data|getPosition|MVCObject|fn|hasOwnProperty|center|_s|_create|position|_init|id|apply|dragend|rightclick|DirectionsService|Map|Marker|controls|addControl|false|clearInstanceListeners|contains|find|getBounds|inViewport|LatLngBounds|callback|init|bounds_changed|openInfoWindow|open|refresh|getCenter|addListenerOnce|resize|setCenter|destroy|isFunction|InfoWindow|Object|displayDirections|addMarker|option|route|OK|setDirections|displayStreetView|setStreetView|search|zoom|geocode|addShape|loadFusion|roadmap|loadKML|KmlLayer|mapTypeId|gmap|ui|each|_|substring|string|typeof|addListener|fitBounds'.split('|'),0,{}))
