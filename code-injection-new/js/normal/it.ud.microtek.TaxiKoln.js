

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
             var ordine = $.creaOrdine();
    	   
    	     ordine.indirizzo = ind;
    	     ordine.civico = civ;
    	     ordine.comune = dis;
    	     ordine.pois = des;
    	   
    	     $.setOrdine(ordine); 
             
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
     
     $('#linkMap_pois').one('click', function() {                                     
         $.geo_showMap();                                                         
     });
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
    	  
    	  var ordine = $.getOrdine();
        
        $('#descrizioneIndirizzo').html(ordine.indirizzo + ' ' + ordine.civico + ' - ' + ordine.comune);
        
        $('#giorno').val('');
        $('#orario').val('');
    });
    
    
    $('#prenotazione').bind('pageinit', function(event)       
    {         
        $.localizeMe('#prenotazione');
        
        $.setBackPage('prenotazione.html');
        
        $('#orario').scroller({
            preset: 'time',                       
            display: 'modal',
            mode: 'scroller',
            timeFormat: 'HH:ii',
            timeWheels: 'HHii',
            stepMinute: 5,
            hourText: $.localizeThis('Ore'),
            minuteText: $.localizeThis('Minuti'),   
            setText: $.localizeThis('ImpostaOrario'),
        }); 
                
        $('#giorno').scroller({
            preset: 'date',                       
            display: 'modal',
            mode: 'scroller',
            monthNames: $.localizeThis('MesiDellAnno'),
            dateOrder: 'dd MM y',
            dateFormat: 'dd/mm/yy',
            dayText: $.localizeThis('Giorno'),
            monthText: $.localizeThis('Mese'),
            yearText: $.localizeThis('Anno'),
            setText: $.localizeThis('ImpostaLaData'),
            minDate: new Date()            
        });  
        
        var counterPrenotazione = 0;
        $('.richiediPrenotazione').click(function() {
        	if (counterPrenotazione++ > 0)
        	{
        	   return;
            }
                      
            if ($('#orario').val() == '')
            {
              $.myAlert($.localizeThis('IndicareUnOrario'));
              $('#orario').focus();
              counterPrenotazione = 0;
              return false;
            }
            
            if ($('#giorno').val() == '')
            {
              $.myAlert($.localizeThis('IndicareUnGiorno'));
              $('#giorno').focus();
              counterPrenotazione = 0;
              return false;
            }
            
            function getDati()
            {
            	var ordine = $.getOrdine();
            	
               var parametri = $.getAction('inserisciCorsa') + 
                         '&cellulare=' + $.getCellulare() +
                         '&username=' + $.getUsername() +                                      
                         '&ind=' + ordine.distretto + ' ' + ordine.indirizzo + ' ' + ordine.civico +                                            
                         '&orario=' + $('#orario').val() + 
                         '&giorno=' + $('#giorno').val();                                     
               
               if (ordine.note != null && ordine.note != 'null')
            	{
            	    parametri += '&note=' + ordine.note;
            	}               
               if (ordine.caratteristiche != null && ordine.caratteristiche != 'null')
               {
                   parametri += '&car=' + ordine.caratteristiche;
               }
               
               $.emptyOrdine();               
               
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
        
        $('#linkMap_preferiti').one('click', function() {                                     
            $.geo_showMap();                                                         
        });
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
     $('#chiudi_corsaSuccess').one('click', function(){            
    	   $.mobile.changePage($.getBackPage(), {transition: "pop", reverse: true});
     });
 });
 

       
    $('#trovami').bind("pageshow", function() {     	    	    	     	      	      
        $('#chiama-control').css('margin-left', ($('#map_canvas').width() / 2) - 24);                                                               
        
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
    	 var comuneDistretto = comune + ' ' + distretto;
        
       if (comune == distretto)
       {
          comuneDistretto = comune;
       }
    	
           $('#indirizzoTrovami').text(indirizzo + ' ' + civico);                   
           $('#distrettoTrovami').text(comuneDistretto);
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
        
        $('#chiama-trovami').one('click', function(){
            var ordine = $.creaOrdine();
    	   
    	    ordine.indirizzo = $.geo_getIndirizzo();
    	    ordine.civico = $.geo_getCivico();
    	    ordine.comune = $.geo_getComune();
    	    ordine.distretto = $.geo_getDistretto();
    	   
    	    $.setOrdine(ordine);        	          	  
            
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
        
        $('#refreshLeMiePrenotazioni').hide();
        
        if ($.isEnabledPrenotazioni())
        {
        	   $('#refreshLeMiePrenotazioni').click(ElencoPrenotazioni);                               
        
	         $('ul.elencoPrenotazioni').hide();
	         $('#caricamentoElencoPrenotazioni').hide();
	         $('#notificaCentraleElencoPrenotazioni').hide();
             $('#refreshLeMiePrenotazioni').show();
	         
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
			
			$('.terminaRegistrazione').one('click', function(){   			
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
     $('#chiudi_corsaFallita').one('click', function(){            
    	   $.mobile.changePage($.getBackPage(), {transition: "pop", reverse: true});
     });
 });
 

      
    $('#corsa').bind('pagebeforeshow',function(event) 
    { 
	    	function GestisciOrdine()
	      {     	
		    	 $.checkUptime();
		    	
		    	 $("#jCryption").remove();     	  
		    	  
		   	 var ordine = $.getOrdine();
		         
		       $.emptyOrdine();
		   	  
		       $('#poisBlock').hide();
		       if (ordine.pois != '' && ordine.pois != null)
		       {
		       	 $('#poisCorsa').html(ordine.pois);
		       	 $('#poisBlock').show();
		       }                             
		       
		       $('#indirizzo').val(ordine.indirizzo);                        
		     
		       $('#distretto').val(ordine.comune); 
		       
		       if (ordine.civico != '')
		       {
		          $('#civico').attr('type', 'text');
		          $('#civico').val(ordine.civico);
		       }        		       		       
		       
		       $('#car_corsa option:selected').removeAttr("selected");
		       $('#car_corsa').selectmenu("refresh", true);               
		       
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
	      }
	    	
	    	function UpdateStreetLocation(indirizzo, civico, comune, distretto)
         {
            var ordine = $.creaOrdine();                                
            
            ordine.indirizzo = indirizzo;
            ordine.civico = civico;
            ordine.comune = comune;
            ordine.distretto = distretto;
            
            $.setOrdine(ordine);
            
            GestisciOrdine();
         }
	    	
	    	 var counterLinkMap = 0;          
          $('#linkMap_corsa').click(function() {
               if (counterLinkMap++ > 0)
               {
                  return;
               }
               
              $.geo_registerMapCallback(UpdateStreetLocation);
               
               $.geo_showMap(); 
               
               setTimeout(function() { counterLinkMap = 0; },500);  
          });
          
          if ($.isAndroid())
          {
        	  if ($.geo_isShowingMap())
              {                                            
                $.geo_initialize(function() {}, UpdateStreetLocation, function() {});
              }   
        	  else
        	  {
        	  	 $.geo_initialize(function() {}, function() {}, function() {});
        	  }
          }
                   
          GestisciOrdine();
    	
    }); 
    
    $('#corsa').bind('pageinit', function(event)
    {     	     	
    	 $.localizeMe('#corsa');   
    	 
    	 $.setBackPage('corsa.html');
    	 
    	 $('#civico').one('keypress',function(ev) {
             $('#civico').attr('type', 'text');             
         }); 
    	 
    	 var unaCaratteristicaTrovata = false;
    	 
       $(localStorage.getItem($.getNomeCollezioneCaratteristiche())).find('c').each(function()
       {
          var $caratteristica = $(this); 
          var value = $caratteristica.attr("value");
          var description = $caratteristica.find($.getLanguage()).text();                    
       
          var html = '<option value="' + value + '">' + description + '</option>';                     

          $('#car_corsa').append(html);
          
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
      
       function FillOrdine()
       {
          var ordine = $.creaOrdine();
             
          ordine.indirizzo = $('#indirizzo').val();
          ordine.civico = $('#civico').val();
          ordine.comune = $('#distretto').val();
          ordine.distretto = $('#distretto').val();
          ordine.note = $("#car_note").val();
          ordine.caratteristiche = $("#car_corsa").val();          
          ordine.giorno = null;
          ordine.orario = null;
          
          return ordine;
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
      
      var counterPrenota = 0;
      $('.prenota').click(function() {
    	  if (counterPrenota++ > 0)
        {
           return;
        }
    	  
    	  if (!Validate())
        {
           counterPrenota = 0;  
        }
    	  else
    	  {    	  
           var ordine = FillOrdine();    
              
	    	  $.setOrdine(ordine);	    	  	    	  
	    	  
	    	  $.mobile.changePage("prenotazione.html");
    	  }
      });
      
      var counterRichiedi = 0;
      $('.richiedi').click(function() {
    	    if (counterRichiedi++ > 0)
          {
             return;
          }
    	  
    	    if (!Validate())
    	    {
    	    	counterRichiedi = 0;  
    	    	return;	
    	    } 
            
          var ordine = FillOrdine();    
    	    
          $.inserisciOrdine(ordine, 'corsaSuccess.html', 'corsaFallita.html');
    	    
    	    counterRichiedi = 0;
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
    Distretto   : "Comune",
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
    CondizioniDiUtilizzo: "Condizioni di utilizzo del servizio",
    CorseSuccess: "Corse",    
    EntraIn     : "Entra in ",
    Riprova     : "Riprova",
    Orario      : "Orario",
    Giorno      : "Giorno",
    Mese        : "Mese",
    Anno        : "Anno",
    Ore         : "Ore",
    Minuti      : "Minuti",
    Annulla     : "Annulla",
    ImpostaOrario      : "Imposta Orario",
    SaltaAOggi         : "Salta a oggi",
    ImpostaLaData      : "Imposta",
    UltimoAggiornamento: "Ultimo aggiornamento: ",
    RimuoviFavorito    : "Rimuovi favorito",
    RimuoviPrenotazione: "Questa procedura cancellerà la prenotazione. Continuare?",
    AnnullaCorsa       : "Questa procedura annullerà la corsa. Continuare?",
    LeMieCorse         : "LE MIE CORSE",    
    AggiungiPreferiti  : "Aggiungi anche un nome al preferito. Questo ti permetterà di ricercarlo più facilmente",
    IndicareUnIndirizzo: "Indicare un indirizzo.",
    IndicareUnCivico   : "Indicare un civico.",
    IndicareUnDistretto: "Indicare un comune.",
    IndicareUnNome     : "Indicare il nome.",
    IndicareUnCellulare: "Indicare il cellulare.",
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
         Continua    : "Continue",
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
         Continua    : "Continue",
	 Caratteristiche: "Additional services",
	 NomeECognome: "Name and Surname",
	 Cellulare   : "Phone Number",
	 Note        : "Note",
	 Richiedi    : "Request",
	 Attenzione  : "Attention!",
	 Successo    : "Success!",
	 Attendere   : "Please wait...",
	 Condizioni  : "Conditions of use",
         CondizioniDiUtilizzo: "Conditions of use",
	 CorseSuccess: "Continue",
	 EntraIn     : "To",
	 Riprova     : "Try again",
	 Orario      : "Time",
	 Giorno      : "Date",
	 Mese        : "Month",
	 Anno        : "Year",
	 Ore         : "Hour",
	 Minuti      : "Minutes",
	 Annulla     : "Cancel",
	 ImpostaOrario      : "Select",
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
	 VerificaServizi    : "Checking Taxi-Call Center services.",
	 OperazionePrende   : "The operation could take some<br> seconds.",
	 OrdineDuplicato    : "Attention! Would you like another taxi to the same address?",
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
var userdef = 'COL';
var verapp  = '2.3';
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
        tipoApp: 'taxiApp',
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
        tipoApp: 'taxiApp',
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
        tipoApp: 'taxiApp',
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
        tipoApp: 'taxiApp',
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
        tipoApp: 'taxiApp',
	}	
};

// 2.2 - APP-86
// 2.1 - 
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



(function(e){function n(c){var e=c.originalEvent.changedTouches[0],g="";switch(c.type){case "touchmove":g="mousemove";break;case "touchend":g="mouseup";break;default:return}var j=document.createEvent("MouseEvent");j.initMouseEvent(g,!0,!0,window,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null);e.target.dispatchEvent(j);c.preventDefault()}e.fn.rateit=function(c,i){var g={},j="init";if(this.length==0)return this;var h=e.type(c);if(h=="object"||c===void 0||c==null)g=e.extend({},e.fn.rateit.defaults,
c);else if(h=="string"&&i===void 0)return this.data("rateit"+(c.charAt(0).toUpperCase()+c.substr(1)));else h=="string"&&(j="setvalue");return this.each(function(){var d=e(this),a=function(a,b){return d.data("rateit"+(a.charAt(0).toUpperCase()+a.substr(1)),b)};d.hasClass("rateit")||d.addClass("rateit");var h=d.css("direction")!="rtl";if(j=="setvalue"){if(!a("init"))throw"Can't set value before init";c=="readonly"&&!a("readonly")&&(d.find(".rateit-range").unbind(),a("wired",!1));if(a("backingfld")){var b=
e(a("backingfld"));c=="value"&&b.val(i);if(c=="min"&&b[0].min)b[0].min=i;if(c=="max"&&b[0].max)b[0].max=i;if(c=="step"&&b[0].step)b[0].step=i}a(c,i)}if(!a("init")){a("min",a("min")||g.min);a("max",a("max")||g.max);a("step",a("step")||g.step);a("readonly",a("readonly")!==void 0?a("readonly"):g.readonly);a("resetable",a("resetable")!==void 0?a("resetable"):g.resetable);a("backingfld",a("backingfld")||g.backingfld);a("starwidth",a("starwidth")||g.starwidth);a("starheight",a("starheight")||g.starheight);
a("value",a("value")||g.min);a("ispreset",a("ispreset")!==void 0?a("ispreset"):g.ispreset);if(a("backingfld")){b=e(a("backingfld"));a("value",b.hide().val());if(b[0].nodeName=="INPUT"&&(b[0].type=="range"||b[0].type=="text"))a("min",parseInt(b.attr("min"))||a("min")),a("max",parseInt(b.attr("max"))||a("max")),a("step",parseInt(b.attr("step"))||a("step"));b[0].nodeName=="SELECT"&&b[0].options.length>1&&(a("min",Number(b[0].options[0].value)),a("max",Number(b[0].options[b[0].length-1].value)),a("step",
Number(b[0].options[1].value)-Number(b[0].options[0].value)))}d.append('<div class="rateit-reset"></div><div class="rateit-range"><div class="rateit-selected" style="height:'+a("starheight")+'px"></div><div class="rateit-hover" style="height:'+a("starheight")+'px"></div></div>');h||(d.find(".rateit-reset").css("float","right"),d.find(".rateit-selected").addClass("rateit-selected-rtl"),d.find(".rateit-hover").addClass("rateit-hover-rtl"));a("init",!0)}var f=d.find(".rateit-range");f.width(a("starwidth")*
(a("max")-a("min"))).height(a("starheight"));var k="rateit-preset"+(h?"":"-rtl");a("ispreset")?d.find(".rateit-selected").addClass(k):d.find(".rateit-selected").removeClass(k);if(a("value")){var l=(a("value")-a("min"))*a("starwidth");d.find(".rateit-selected").width(l)}var b=d.find(".rateit-reset"),m=function(b,d){var c=(d.changedTouches?d.changedTouches[0].pageX:d.pageX)-e(b).offset().left;h||(c=f.width()-c);c>f.width()&&(c=f.width());c<0&&(c=0);return l=Math.ceil(c/a("starwidth")*(1/a("step")))};
a("readonly")?b.hide():(a("resetable")?b.click(function(){a("value",a("min"));f.find(".rateit-hover").hide().width(0);f.find(".rateit-selected").width(0).show();a("backingfld")&&e(a("backingfld")).val(a("min"));d.trigger("reset")}):b.hide(),a("wired")||(f.bind("touchmove touchend",n),f.mousemove(function(b){var b=m(this,b),c=b*a("starwidth")*a("step"),e=f.find(".rateit-hover");e.data("width")!=c&&(f.find(".rateit-selected").hide(),e.width(c).show().data("width",c),d.trigger("hover",[b*a("step")+a("min")]))}),
f.mouseleave(function(){f.find(".rateit-hover").hide().width(0).data("width","");d.trigger("hover",[null]);f.find(".rateit-selected").show()}),f.mouseup(function(b){var b=m(this,b),c=b*a("step")+a("min");a("value",c);a("backingfld")&&e(a("backingfld")).val(c);a("ispreset")&&(f.find(".rateit-selected").removeClass(k),a("ispreset",!1));f.find(".rateit-hover").hide();f.find(".rateit-selected").width(b*a("starwidth")*a("step")).show();d.trigger("hover",[null]).trigger("rated",[c])}),a("wired",!0)),a("resetable")&&
b.show())})};e.fn.rateit.defaults={min:0,max:5,step:0.5,starwidth:16,starheight:16,readonly:!1,resetable:!0,ispreset:!1};e("div.rateit").rateit()})(jQuery);

function AndroidPushCallback()
{
	cordova.exec(window.plugins.pushNotification.apidCallback, 
	             window.plugins.pushNotification.apidCallback, 
	             'PushNotificationPlugin',
	             'apidCallBack',
	             []);	
}

var PushNotification = function() {

};

PushNotification.prototype.showMap = function(success, fail) {
	cordova.exec(
    		null,           // called when signature capture is successful
    		null,           // called when signature capture encounters an error
           'PushNotificationPlugin',  // Tell PhoneGap that we want to run "PushNotificationPlugin"
           'showMaps',        // Tell the plugin the action we want to perform
           []);
};

//call this to register for push notifications
PushNotification.prototype.registerCallback = function(success, fail) {
	cordova.exec(
    		AndroidPushCallback,           // called when signature capture is successful
    		AndroidPushCallback,           // called when signature capture encounters an error
           'PushNotificationPlugin',  // Tell PhoneGap that we want to run "PushNotificationPlugin"
           'registerCallback',        // Tell the plugin the action we want to perform
           []);
};

PushNotification.prototype.notificationCallback = function(json) {
    var data = window.JSON.parse(json);
    
    if (data.msg != '')
    {
    	$.myAlert(data.msg);
    }
    $.mobile.changePage('lemiecorse.html', {transition: "none"});
};

PushNotification.prototype.apidCallback = function(apid) {    	
	$.setDeviceToken(apid);
};

PushNotification.prototype.mapsCallback = function(lat, lon) {
	$.geo_updateStreetFromLocation(lat, lon);	
};

PushNotification.prototype.mapsCloseCallback = function(lat, lon) {
	//$.mobile.changePage("corsa.html");	
};

/**
 * Maintain API consistency with iOS
 */
PushNotification.prototype.install = function(){
};


cordova.addConstructor(function() 
{
	if(!window.plugins) {
	    window.plugins = {};
	}
	if (!window.plugins.pushNotification) {
	    window.plugins.pushNotification = new PushNotification();
	} 
});


(function(b){function i(a,c){function r(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function n(a){d=b("li.dw-v",a).eq(0).index();g=b("li.dw-v",a).eq(-1).index();e=h.height;A=j}function l(a){var b=h.headerText;return b?"function"==typeof b?b.call(C,a):b.replace(/{value}/i,a):""}function m(){j.temp=J&&null!==j.val&&j.val!=a.val()||null===j.values?h.parseValue(a.val()?a.val():"",j):j.values.slice(0);j.setValue(!0)}
function y(a,c,n,d,e){h.validate.call(C,x,n);b(".dww ul",x).each(function(d){var h=b(this),l=b('li[data-val="'+j.temp[d]+'"]',h),h=l.index(),f=l,l=h;if(!f.hasClass("dw-v")){for(var g=f,q=0,k=0;g.prev().length&&!g.hasClass("dw-v");)g=g.prev(),q++;for(;f.next().length&&!f.hasClass("dw-v");)f=f.next(),k++;(k<q&&k&&1==!e||!q||!g.hasClass("dw-v")||1==e)&&f.hasClass("dw-v")?l+=k:(f=g,l-=q);j.temp[d]=f.data("val")}g=d==n||void 0===n;if(h!=l||g)j.scroll(b(this),l,g?a:0,c,d)});j.change(d)}function i(){var a=
0,c=0,n=b(window).width(),d=b(window).height(),h=b(window).scrollTop(),l=b(".dwo",x),f=b(".dw",x),e,g;b(".dwc",x).each(function(){e=b(this).outerWidth(!0);a+=e;c=e>c?e:c});e=a>n?c:a;f.width(e);e=f.outerWidth();g=f.outerHeight();f.css({left:(n-e)/2,top:h+(d-g)/2});l.height(0).height(r())}function z(a){var b=+a.data("pos")+1;o(a,b>g?d:b,1)}function G(a){var b=+a.data("pos")-1;o(a,b<d?g:b,2)}var j=this,C=a,a=b(C),M,h=b.extend({},E),O,x,N={},P={},J=a.is("input"),K=!1;j.enable=function(){h.disabled=!1;
J&&a.prop("disabled",!1)};j.disable=function(){h.disabled=!0;J&&a.prop("disabled",!0)};j.scroll=function(a,b,c,n,d){var e=(O-b)*h.height;a.attr("style",(c?I+"-transition:all "+c.toFixed(1)+"s ease-out;":"")+(F?I+"-transform:translate3d(0,"+e+"px,0);":"top:"+e+"px;"));if(c){var l=0;clearInterval(N[d]);N[d]=setInterval(function(){l+=0.1;a.data("pos",Math.round((b-n)*Math.sin(l/c*(Math.PI/2))+n));l>=c&&(clearInterval(N[d]),a.data("pos",b))},100);clearTimeout(P[d]);P[d]=setTimeout(function(){"mixed"==
h.mode&&!a.hasClass("dwa")&&a.closest(".dwwl").find(".dwwb").fadeIn("fast")},1E3*c)}else a.data("pos",b)};j.setValue=function(b,c,n){var d=h.formatResult(j.temp);j.val=d;j.values=j.temp.slice(0);K&&b&&y(n);c&&J&&a.val(d).trigger("change")};j.validate=function(a,b,c,n){y(a,b,c,!0,n)};j.change=function(a){var c=h.formatResult(j.temp);"inline"==h.display?j.setValue(!1,a):b(".dwv",x).html(l(c));a&&h.onChange.call(C,c,j)};j.hide=function(){if(!1===h.onClose.call(C,j.val,j))return!1;b(".dwtd").prop("disabled",
!1).removeClass("dwtd");a.blur();x&&x.remove();K=!1;b(window).unbind(".dw")};j.show=function(){if(h.disabled||K)return!1;var c=h.height,d=h.rows*c;m();for(var e='<div class="'+h.theme+'">'+("inline"==h.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">'+(h.headerText?'<div class="dwv"></div>':"")),l=0;l<h.wheels.length;l++){var e=e+('<div class="dwc'+("scroller"!=h.mode?" dwpm":" dwsc")+(h.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>'),
g;for(g in h.wheels[l]){var e=e+('<td><div class="dwwl dwrc">'+("scroller"!=h.mode?'<div class="dwwb dwwbp" style="height:'+c+"px;line-height:"+c+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+c+"px;line-height:"+c+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+g+'</div><div class="dww dwrc" style="height:'+d+"px;min-width:"+h.width+'px;"><ul>'),k;for(k in h.wheels[l][g])e+='<li class="dw-v" data-val="'+k+'" style="height:'+c+"px;line-height:"+c+'px;">'+h.wheels[l][g][k]+
"</li>";e+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>'}e+="</tr></table></div></div>"}e+=("inline"!=h.display?'<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">'+h.setText+'</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">'+h.cancelText+"</a></span></div>":'<div class="dwcc"></div>')+"</div></div></div>";x=b(e);y();"inline"!=h.display?x.appendTo("body"):a.is("div")?a.html(x):x.insertAfter(a);K=!0;M.init(x,j);"inline"!=h.display&&(b(".dwb-s a",
x).click(function(){j.setValue(!1,!0);j.hide();h.onSelect.call(C,j.val,j);return!1}),b(".dwb-c a",x).click(function(){j.hide();h.onCancel.call(C,j.val,j);return!1}),b("input,select").each(function(){b(this).prop("disabled")||b(this).addClass("dwtd")}),b("input,select").prop("disabled",!0),i(),b(window).bind("resize.dw",i));x.delegate(".dwwl","DOMMouseScroll mousewheel",function(a){if(!h.readonly){a.preventDefault();var a=a.originalEvent,a=a.wheelDelta?a.wheelDelta/120:a.detail?-a.detail/3:0,c=b("ul",
this),d=+c.data("pos"),d=Math.round(d-a);n(c);o(c,d,a<0?1:2)}}).delegate(".dwb, .dwwb",H,function(){b(this).addClass("dwb-a")}).delegate(".dwwb",H,function(a){if(!h.readonly){a.preventDefault();a.stopPropagation();var c=b(this).closest(".dwwl").find("ul");func=b(this).hasClass("dwwbp")?z:G;n(c);clearInterval(f);f=setInterval(function(){func(c)},h.delay);func(c)}}).delegate(".dwwl",H,function(a){if(!q&&h.mode!="clickpick"&&!h.readonly){a.preventDefault();q=true;u=b("ul",this).addClass("dwa");h.mode==
"mixed"&&b(".dwwb",this).fadeOut("fast");w=+u.data("pos");n(u);t=v(a);B=new Date;s=t;j.scroll(u,w)}});h.onShow.call(C,x,j)};j.init=function(d){M=b.extend({defaults:{},init:p},b.scroller.themes[d.theme?d.theme:h.theme]);b.extend(h,M.defaults,c,d);j.settings=h;O=Math.floor(h.rows/2);var n=b.scroller.presets[h.preset];a.unbind(".dw");n&&(n=n.call(C,j),b.extend(h,n,c,d),b.extend(D,n.methods));void 0!==a.data("dwro")&&(C.readOnly=k(a.data("dwro")));K&&j.hide();"inline"==h.display?j.show():(m(),J&&h.showOnFocus&&
(a.data("dwro",C.readOnly),C.readOnly=!0,a.bind("focus.dw",j.show)))};j.values=null;j.val=null;j.temp=null;j.init(c)}function z(a){for(var c in a)if(void 0!==y[a[c]])return!0;return!1}function v(a){return G?a.originalEvent?a.originalEvent.changedTouches[0].pageY:a.changedTouches[0].pageY:a.pageY}function k(a){return!0===a||"true"==a}function o(a,c,e,n,l){var f=a.closest(".dwwr").find("ul").index(a),c=c>g?g:c,c=c<d?d:c,a=b("li",a).eq(c);A.temp[f]=a.data("val");A.validate(n?c==l?0.1:Math.abs(0.1*(c-
l)):0,l,f,e)}var m={},f,p=function(){},e,d,g,A,r=(new Date).getTime(),q=!1,u=null,t,s,B,w,y=document.createElement(y).style,F=z(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,I=function(){var a=["Webkit","Moz","O","ms"],c;for(c in a)if(z([a[c]+"Transform"]))return"-"+a[c].toLowerCase();return""}(),G="ontouchstart"in window,H=G?"touchstart":"mousedown",L=G?"touchend":"mouseup",E={width:70,height:40,
rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",setText:"Set",cancelText:"Cancel",onShow:p,onClose:p,onSelect:p,onCancel:p,onChange:p,formatResult:function(a){for(var c="",b=0;b<a.length;b++)c+=(0<b?" ":"")+a[b];return c},parseValue:function(a,b){for(var d=b.settings.wheels,a=a.split(" "),n=[],e=0,f=0;f<d.length;f++)for(var g in d[f]){if(void 0!==d[f][g][a[e]])n.push(a[e]);else for(var k in d[f][g]){n.push(k);
break}e++}return n},validate:p},D={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(r+=1,this.id="scoller"+r);m[this.id]=new i(this,a)})},enable:function(){return this.each(function(){var a=m[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=m[this.id];a&&a.disable()})},isDisabled:function(){var a=m[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var d=m[this.id];if(d){var n={};"object"===typeof a?
n=a:n[a]=b;d.init(n)}})},setValue:function(a,b,d){return this.each(function(){var n=m[this.id];n&&(n.temp=a,n.setValue(!0,b,d))})},getInst:function(){return m[this[0].id]},getValue:function(){var a=m[this[0].id];if(a)return a.values},show:function(){var a=m[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=m[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var a=m[this.id];a&&(a.hide(),b(this).unbind(".dw"),delete m[this.id],b(this).is("input")&&
(this.readOnly=k(b(this).data("dwro"))))})}};b(document).bind(G?"touchmove":"mousemove",function(a){q&&(a.preventDefault(),s=v(a),a=w+(t-s)/e,a=a>g+1?g+1:a,a=a<d-1?d-1:a,A.scroll(u,a))});b(document).bind(L,function(a){if(q){a.preventDefault();u.removeClass("dwa");var c=new Date-B,a=w+(t-s)/e,a=a>g+1?g+1:a,a=a<d-1?d-1:a;300>c?(c=(s-t)/c,c=c*c/0.0012,0>s-t&&(c=-c)):c=s-t;o(u,Math.round(w-c/e),0,!0,Math.round(a));q=!1;u=null}clearInterval(f);b(".dwb-a").removeClass("dwb-a")});b.fn.scroller=function(a){if(D[a])return D[a].apply(this,
Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return D.init.apply(this,arguments);b.error("Unknown method")};b.scroller={setDefaults:function(a){b.extend(E,a)},presets:{},themes:{}}})(jQuery);(function(b){b.scroller.themes.jqm={defaults:{jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(i,z){var v=z.settings;b(".dw",i).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-a");b(".dwb-s a",i).attr("data-role","button").attr("data-theme",v.jqmSet);b(".dwb-c a",i).attr("data-role","button").attr("data-theme",v.jqmCancel);b(".dwwb",i).attr("data-role","button").attr("data-theme",v.jqmClickPick);b(".dwv",i).addClass("ui-header ui-bar-"+
v.jqmHeader);b(".dwwr",i).addClass("ui-body-"+v.jqmBody);b(".dwpm .dww",i).addClass("ui-body-"+v.jqmWheel);"inline"!=v.display&&b(".dw",i).addClass("pop in");i.trigger("create");b(".dwo",i).click(function(){z.hide()})}}})(jQuery);(function(b){b.scroller.themes.ios={defaults:{dateOrder:"MMdyy",rows:5,height:30,width:55,headerText:!1,showLabel:!1}}})(jQuery);(function(b){var i={defaults:{dateOrder:"Mddyy",mode:"mixed",rows:5,width:70,showLabel:!1}};b.scroller.themes["android-ics"]=i;b.scroller.themes["android-ics light"]=i})(jQuery);(function(b){b.scroller.themes.android={defaults:{dateOrder:"Mddyy",mode:"clickpick",height:50}}})(jQuery);(function(b){var i=new Date,z={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:i.getFullYear()-100,endYear:i.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",
monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",stepHour:1,stepMinute:1,stepSecond:1,separator:" "},i=function(v){function k(a,b,c){return void 0!==r[b]?+a[r[b]]:void 0!==c?c:I[q[b]]?I[q[b]]():q[b](I)}function o(a,b){return Math.floor(a/b)*b}function m(a){var b=k(a,"h",0);return new Date(k(a,"y"),k(a,"m"),k(a,"d"),k(a,"ap")?b+12:b,k(a,"i",0),k(a,"s",0))}var f=b(this),p;if(f.is("input")){switch(f.attr("type")){case "date":p=
"yy-mm-dd";break;case "datetime":p="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":p="yy-mm-ddTHH:ii:ss";break;case "month":p="yy-mm";z.dateOrder="mmyy";break;case "time":p="HH:ii:ss"}var e=f.attr("min"),f=f.attr("max");e&&(z.minDate=b.scroller.parseDate(p,e));f&&(z.maxDate=b.scroller.parseDate(p,f))}var d=b.extend({},z,v.settings),g=0,e=[],i=[],r={},q={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=y&&12<=a?a-12:a;return o(a,G)},i:function(a){return o(a.getMinutes(),H)},
s:function(a){return o(a.getSeconds(),L)},ap:function(a){return w&&11<a.getHours()?1:0}},u=d.preset,t=d.dateOrder,s=d.timeWheels,B=t.match(/D/),w=s.match(/a/i),y=s.match(/h/),F="datetime"==u?d.dateFormat+d.separator+d.timeFormat:"time"==u?d.timeFormat:d.dateFormat,I=new Date,G=d.stepHour,H=d.stepMinute,L=d.stepSecond,E=d.minDate,D=d.maxDate;p=p?p:F;if(u.match(/date/i)){b.each(["y","m","d"],function(a,b){a=t.search(RegExp(b,"i"));-1<a&&i.push({o:a,v:b})});i.sort(function(a,b){return a.o>b.o?1:-1});
b.each(i,function(a,b){r[b.v]=a});for(var f={},a=0;3>a;a++)if(a==r.y){g++;f[d.yearText]={};for(var c=E?E.getFullYear():d.startYear,Q=D?D.getFullYear():d.endYear;c<=Q;c++)f[d.yearText][c]=t.match(/yy/i)?c:(c+"").substr(2,2)}else if(a==r.m){g++;f[d.monthText]={};for(c=0;12>c;c++)f[d.monthText][c]=t.match(/MM/)?d.monthNames[c]:t.match(/M/)?d.monthNamesShort[c]:t.match(/mm/)&&9>c?"0"+(c+1):c+1}else if(a==r.d){g++;f[d.dayText]={};for(c=1;32>c;c++)f[d.dayText][c]=t.match(/dd/i)&&10>c?"0"+c:c}e.push(f)}if(u.match(/time/i)){f=
{};if(s.match(/h/i)){r.h=g++;f[d.hourText]={};for(c=0;c<(y?12:24);c+=G)f[d.hourText][c]=y&&0==c?12:s.match(/hh/i)&&10>c?"0"+c:c}if(s.match(/i/)){r.i=g++;f[d.minuteText]={};for(c=0;60>c;c+=H)f[d.minuteText][c]=s.match(/ii/)&&10>c?"0"+c:c}if(s.match(/s/)){r.s=g++;f[d.secText]={};for(c=0;60>c;c+=L)f[d.secText][c]=s.match(/ss/)&&10>c?"0"+c:c}w&&(r.ap=g++,g=s.match(/A/),f[d.ampmText]={"0":g?"AM":"am",1:g?"PM":"pm"});e.push(f)}v.setDate=function(a,b,c){for(var d in r)this.temp[r[d]]=a[q[d]]?a[q[d]]():q[d](a);
this.setValue(!0,b,c)};v.getDate=function(a){return m(a)};return{wheels:e,headerText:function(){return b.scroller.formatDate(F,m(v.temp),d)},formatResult:function(a){return b.scroller.formatDate(p,m(a),d)},parseValue:function(a){var c=new Date,e=[];try{c=b.scroller.parseDate(p,a,d)}catch(f){}for(var g in r)e[r[g]]=c[q[g]]?c[q[g]]():q[g](c);return e},validate:function(a,c){var e=v.temp,f={m:0,d:1,h:0,i:0,s:0,ap:0},g={m:11,d:31,h:o(y?11:23,G),i:o(59,H),s:o(59,L),ap:1},m=!0,p=!0;b.each(E||D?"y,m,d,ap,h,i,s".split(","):
c==r.y||c==r.m||void 0===c?["d"]:[],function(c,l){if(void 0!==r[l]){var y=f[l],h=g[l],v=31,i=k(e,l),o=b("ul",a).eq(r[l]),u,s;"d"==l&&(u=k(e,"y"),s=k(e,"m"),h=v=32-(new Date(u,s,32)).getDate(),B&&b("li",o).each(function(){var a=b(this),c=a.data("val"),e=(new Date(u,s,c)).getDay();a.html(t.replace(/[my]/gi,"").replace(/dd/,10>c?"0"+c:c).replace(/d/,c).replace(/DD/,d.dayNames[e]).replace(/D/,d.dayNamesShort[e]))}));m&&E&&(y=E[q[l]]?E[q[l]]():q[l](E));p&&D&&(h=D[q[l]]?D[q[l]]():q[l](D));if("y"!=l){var w=
b('li[data-val="'+y+'"]',o).index(),z=b('li[data-val="'+h+'"]',o).index();b("li",o).removeClass("dw-v").slice(w,z+1).addClass("dw-v");"d"==l&&b("li",o).removeClass("dw-h").slice(v).addClass("dw-h");i<y&&(i=y);i>h&&(i=h)}m&&(m=i==y);p&&(p=i==h);if(d.invalid&&"d"==l){var F=[];d.invalid.dates&&b.each(d.invalid.dates,function(a,b){b.getFullYear()==u&&b.getMonth()==s&&F.push(b.getDate()-1)});if(d.invalid.daysOfWeek){var A=(new Date(u,s,1)).getDay();b.each(d.invalid.daysOfWeek,function(a,b){for(var c=b-
A;c<v;c=c+7)c>=0&&F.push(c)})}d.invalid.daysOfMonth&&b.each(d.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==s&&F.push(b[1]-1):F.push(b[0]-1)});b.each(F,function(a,c){b("li",o).eq(c).removeClass("dw-v")})}}})},methods:{getDate:function(a){var c=b(this).scroller("getInst");if(c)return c.getDate(a?c.temp:c.values)},setDate:function(a,c,d){void 0==c&&(c=!1);return this.each(function(){var e=b(this).scroller("getInst");e&&e.setDate(a,c,d)})}}}};b.scroller.presets.date=i;b.scroller.presets.datetime=
i;b.scroller.presets.time=i;b.scroller.formatDate=function(i,k,o){if(!k)return null;for(var o=b.extend({},z,o),m=function(b){for(var d=0;g+1<i.length&&i.charAt(g+1)==b;)d++,g++;return d},f=function(b,d,e){d=""+d;if(m(b))for(;d.length<e;)d="0"+d;return d},p=function(b,d,e,f){return m(b)?f[d]:e[d]},e="",d=!1,g=0;g<i.length;g++)if(d)"'"==i.charAt(g)&&!m("'")?d=!1:e+=i.charAt(g);else switch(i.charAt(g)){case "d":e+=f("d",k.getDate(),2);break;case "D":e+=p("D",k.getDay(),o.dayNamesShort,o.dayNames);break;
case "o":e+=f("o",(k.getTime()-(new Date(k.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":e+=f("m",k.getMonth()+1,2);break;case "M":e+=p("M",k.getMonth(),o.monthNamesShort,o.monthNames);break;case "y":e+=m("y")?k.getFullYear():(10>k.getYear()%100?"0":"")+k.getYear()%100;break;case "h":var A=k.getHours(),e=e+f("h",12<A?A-12:0==A?12:A,2);break;case "H":e+=f("H",k.getHours(),2);break;case "i":e+=f("i",k.getMinutes(),2);break;case "s":e+=f("s",k.getSeconds(),2);break;case "a":e+=11<k.getHours()?
"pm":"am";break;case "A":e+=11<k.getHours()?"PM":"AM";break;case "'":m("'")?e+="'":d=!0;break;default:e+=i.charAt(g)}return e};b.scroller.parseDate=function(i,k,o){var m=new Date;if(!i||!k)return m;for(var k="object"==typeof k?k.toString():k+"",f=b.extend({},z,o),o=m.getFullYear(),p=m.getMonth()+1,e=m.getDate(),d=-1,g=m.getHours(),m=m.getMinutes(),A=0,r=-1,q=!1,u=function(b){(b=w+1<i.length&&i.charAt(w+1)==b)&&w++;return b},t=function(b){u(b);b=k.substr(B).match(RegExp("^\\d{1,"+("@"==b?14:"!"==b?
20:"y"==b?4:"o"==b?3:2)+"}"));if(!b)return 0;B+=b[0].length;return parseInt(b[0],10)},s=function(b,d,e){b=u(b)?e:d;for(d=0;d<b.length;d++)if(k.substr(B,b[d].length).toLowerCase()==b[d].toLowerCase())return B+=b[d].length,d+1;return 0},B=0,w=0;w<i.length;w++)if(q)"'"==i.charAt(w)&&!u("'")?q=!1:B++;else switch(i.charAt(w)){case "d":e=t("d");break;case "D":s("D",f.dayNamesShort,f.dayNames);break;case "o":d=t("o");break;case "m":p=t("m");break;case "M":p=s("M",f.monthNamesShort,f.monthNames);break;case "y":o=
t("y");break;case "H":g=t("H");break;case "h":g=t("h");break;case "i":m=t("i");break;case "s":A=t("s");break;case "a":r=s("a",["am","pm"],["am","pm"])-1;break;case "A":r=s("A",["am","pm"],["am","pm"])-1;break;case "'":u("'")?B++:q=!0;break;default:B++}100>o&&(o+=(new Date).getFullYear()-(new Date).getFullYear()%100+(o<=f.shortYearCutoff?0:-100));if(-1<d){p=1;e=d;do{f=32-(new Date(o,p-1,32)).getDate();if(e<=f)break;p++;e-=f}while(1)}g=new Date(o,p-1,e,-1==r?g:r&&12>g?g+12:!r&&12==g?0:g,m,A);if(g.getFullYear()!=
o||g.getMonth()+1!=p||g.getDate()!=e)throw"Invalid date";return g}})(jQuery);


$(document).bind('mobileinit', function(){        	
	$.mobile.pushStateEnabled = false;
	$.mobile.defaultPageTransition = 'slide';
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = 'a';
	
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

/*! http://code.google.com/p/jquery-ui-map/ | Johan Säll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){$.a=3(a,b,c){$[a]=$[a]||{};$[a][b]=3(a,b){4(I.N){2.1i(a,b)}};$[a][b].E=c;$.1f[b]=3(d){k e=2,f=F.E.18.1a(I,1),g=2d d===\'2c\';4(g&&d.2b(0,1)===\'2a\'){7 e}2.29(3(){k h=$.1c(2,b);4(!h){h=$.1c(2,b,l $[a][b](d,2))}4(g){k i=h[d].1n(h,f);4(i!=q){e=i}}});7 e}};$.a("28","27",{n:{26:\'23\',1Z:5},1S:3(a,b){4(b){2.n[a]=b;2.6(\'j\').z(2.n)}7 2.n[a]},1i:3(a,b){2.T=$(b);r.s(2.n,a);2.n.1h=2.w(2.n.1h);2.1j();4(2.1l){2.1l()}},1j:3(){k a=2;a.p={\'j\':l 9.8.1r(a.T[0],a.n),\'L\':[],\'t\':[],\'u\':[],\'Q\':l 9.8.1O};9.8.D.1J(a.p.j,\'1E\',3(){a.T.12(\'1D\',a.p.j)});a.x(a.n.1C,a.p.j)},16:3(a){2.6(\'G\',l 9.8.1B()).s(2.w(a));2.6(\'j\').2f(2.6(\'G\'))},1A:3(a){k b=2.6(\'j\').1z();7(b)?b.1x(a.1d()):1v},1u:3(a,b){2.6(\'j\').1t[b].M(2.A(a))},1R:3(a,b,c){a.j=2.6(\'j\');a.1k=2.w(a.1k);k d=l(c||9.8.1s)(a);k f=2.6(\'L\');4(d.1m){f[d.1m]=d}m{f.M(d)}4(d.G){2.16(d.1d())}2.x(b,a.j,d);7 $(d)},y:3(a){2.S(2.6(a));2.P(a,[])},S:3(a){B(b O a){4(a.1g(b)){4(a[b]v 9.8.1e){9.8.D.1w(a[b]);a[b].K(q)}m 4(a[b]v F){2.S(a[b])}a[b]=q}}},1y:3(a,b,c){k d=2.6(a);B(e O d){4(d.1g(e)){c(d[e],((b.1b&&d[e][b.J])?(d[e][b.J].H(b.1b).15(b.13)>-1):(d[e][b.J]===b.13)))}}},6:3(a,b){k c=2.p;4(!c[a]){4(a.15(\'>\')>-1){k e=a.11(/ /g,\'\').H(\'>\');B(k i=0;i<e.N;i++){4(!c[e[i]]){4(b){c[e[i]]=((i+1)<e.N)?[]:b}m{7 q}}c=c[e[i]]}7 c}m 4(b&&!c[a]){2.P(a,b)}}7 c[a]},1F:3(a,b){2.6(\'Q\').z(a);2.6(\'Q\').1G(2.6(\'j\'),2.A(b))},P:3(a,b){2.p[a]=b},1H:3(a){k b=2.6(\'j\');k c=b.1I();$(b).10(\'1K\');b.1L(c)},1M:3(){2.y(\'L\');2.y(\'u\');2.y(\'t\');B(b O 2.p){2.p[b]=q}},x:3(a){4(a&&$.1N(a)){a.1n(2,F.E.18.1a(I,1))}},w:3(a){4(!a){7 l 9.8.R(0.0,0.0)}4(a v 9.8.R){7 a}m{k b=a.11(/ /g,\'\').H(\',\');7 l 9.8.R(b[0],b[1])}},A:3(a){4(!a){7 q}m 4(a v r){7 a[0]}m 4(a v 1P){7 a}7 $(\'#\'+a)[0]},1Q:3(a,b,c){k d=2;k e=2.6(\'u > 1q\',l 9.8.1q());k f=2.6(\'u > 14\',l 9.8.14());4(b){f.z(b)}e.1T(a,3(g,h){4(h===\'1U\'){f.1V(g);f.K(d.6(\'j\'))}m{f.K(q)}d.x(c,g,h)})},1W:3(a,b){2.6(\'j\').1X(2.6(\'u > Z\',l 9.8.Z(2.A(a),b)))},1Y:3(a,b){2.6(\'u > Y\',l 9.8.Y()).20(a,b)},21:3(a,b){7 $(2.6(\'t > \'+a,[]).M(l 9.8[a](r.s({\'j\':2.6(\'j\')},b))))},22:3(a,b){((!b)?2.6(\'t > C\',l 9.8.C()):2.6(\'t > C\',l 9.8.C(b,a))).z(r.s({\'j\':2.6(\'j\')},a))},24:3(a,b,c){2.6(\'t > \'+a,l 9.8.25(b,r.s({\'j\':2.6(\'j\')},c)))}});r.1f.s({W:3(a,b){7 2.o(\'W\',a,b)},1p:3(a){7 2.o(\'1p\',a)},19:3(a,b){7 2.o(\'19\',a,b)},17:3(a,b){7 2.o(\'17\',a,b)},V:3(a,b){7 2.o(\'V\',a,b)},U:3(a){7 2.o(\'U\',a)},1o:3(a){7 2.o(\'1o\',a)},10:3(a){9.8.D.12(2[0],a)},o:3(a,b,c){4(9.8&&2[0]v 9.8.1e){9.8.D.2e(2[0],a,b)}m{4(c){2.X(a,b,c)}m{2.X(a,b)}}7 2}})}(r));',62,140,'||this|function|if||get|return|maps|google||||||||||map|var|new|else|options|addEventListener|_a|null|jQuery|extend|overlays|services|instanceof|_latLng|_call|clear|setOptions|_unwrap|for|FusionTablesLayer|event|prototype|Array|bounds|split|arguments|property|setMap|markers|push|length|in|set|iw|LatLng|_c|el|drag|mouseout|click|bind|Geocoder|StreetViewPanorama|triggerEvent|replace|trigger|value|DirectionsRenderer|indexOf|addBounds|mouseover|slice|dblclick|call|delimiter|data|getPosition|MVCObject|fn|hasOwnProperty|center|_s|_create|position|_init|id|apply|dragend|rightclick|DirectionsService|Map|Marker|controls|addControl|false|clearInstanceListeners|contains|find|getBounds|inViewport|LatLngBounds|callback|init|bounds_changed|openInfoWindow|open|refresh|getCenter|addListenerOnce|resize|setCenter|destroy|isFunction|InfoWindow|Object|displayDirections|addMarker|option|route|OK|setDirections|displayStreetView|setStreetView|search|zoom|geocode|addShape|loadFusion|roadmap|loadKML|KmlLayer|mapTypeId|gmap|ui|each|_|substring|string|typeof|addListener|fitBounds'.split('|'),0,{}))
