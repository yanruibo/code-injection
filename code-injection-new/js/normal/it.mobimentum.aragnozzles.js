




		$(document).bind('mobileinit', function() {
			// jQuery mobile settings
			$.extend($.mobile, {
				defaultPageTransition: 'none',
	            defaultDialogTransition: 'none',
			});
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			
			// cfr. http://stackoverflow.com/questions/4891906/jquery-mobile-default-data-theme
			$.mobile.listview.prototype.options.dividerTheme = 'a';
			
			// Disable overscroll / viewport moving on everything but scrollable divs
			$('body').on('touchmove', function (e) {
				if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
			});
		});
        





















	        var app = {
	        	page: 'app.html',
			    init: function() {
			    	// Orientamento device
			    	window.localStorage.setItem('arag_orientation', 'tablet');
					
					// Init GA plugin
// 					initGA();
				    trackPage('/');
			    	
			    	// Controlla se ho già scelto la lingua
			    	var language = window.localStorage.getItem('language');
					console.log('LANGUAGE from storage: '+language);
					
					if (language) {
						// Scelta già effettuata, vai all'app
				        document.location.href = 'app-web.html?'+language;
					}					
					else {
						// Scelta non effettuata, vai alla scelta evidenziando quella di sistema
						var locale = navigator.language || navigator.userLanguage; 
						locale = locale.split('\-')[0];
				        document.location.href = 'lang-web.html?'+locale;
					}			    	
			    },
			};
        






		$(document).bind('mobileinit', function() {
			// jQuery mobile settings
			$.extend($.mobile, {
				defaultPageTransition: 'none',
	            defaultDialogTransition: 'none',
			});
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			
			// cfr. http://stackoverflow.com/questions/4891906/jquery-mobile-default-data-theme
			$.mobile.listview.prototype.options.dividerTheme = 'a';
		});
        




	        var app = {
	        	page: 'app.html',
			    init: function() {
			    	// Genera elenco bandierine
			    	var html = '';
			    	for (lang in SUPPORTED_LANGUAGES) {
		            	// Flags: http://www.printableworldflags.com/flag-icon
			    		html += '<a onclick="changeLanguage(\''+lang+'\')" class="flag flag-'+lang+'">'
			    			+'<img src="arag/images/flag-'+lang+'.png" />'
			    			+'</a>';
			    	}
			    	$('#langsel-langs').html(html);
			    	
			    	// Lingua di default (sistema)
			    	var deflang = window.location.href.substring(window.location.href.indexOf('?')+1);
			    	console.log('DEFAULT LANGUAGE', deflang);
			    	if (deflang) $('.flag-'+deflang).addClass('deflang')
			    },
			};
        





	        var app = {
	        	page: 'app.html',
			    init: function() {
			    	console.log('ARAG deviceready()');
			        document.addEventListener('deviceready', this.onDeviceReady, false);
			    },
			    onDeviceReady: function() {
			    	// Orientamento device
			    	var forced_orientation = 'phone'; // XXX phone|tablet
			    	var indexof = window.location.href.indexOf('?');
			    	if (indexof > -1) forced_orientation = window.location.href.substring(indexof+1);
			    	if (forced_orientation) window.localStorage.setItem('arag_orientation', forced_orientation);
					
					// Init GA plugin
					initGA();
				    trackPage('/');
			    	
			    	// Controlla se ho già scelto la lingua
			    	var language = window.localStorage.getItem('language');
					console.log('LANGUAGE from storage: '+language);
					
					if (language) {
						// Scelta già effettuata, vai all'app
				        document.location.href = 'app.html?'+language;
					}					
					else {
						// Scelta non effettuata, vai alla scelta evidenziando quella di sistema
						if (device.platform == 'Generic') {
							// Fix simulatore
					        document.location.href = 'lang.html?en';
						}
						else {
							// Usa lingua dispositivo
							navigator.globalization.getLocaleName(
								function (locale) {
									if (typeof(locale.value) != undefined) locale = locale.value;
									locale = locale.split('_')[0];
							        document.location.href = 'lang.html?'+locale;
									
								},
								function () {
									console.log('PHONEGAP LOCALE ERROR!');
							        document.location.href = 'lang.html?en';
								}
							);
						}
					}			    	
			    },
			};
        





		$(document).bind('mobileinit', function() {
			// jQuery mobile settings
			$.extend($.mobile, {
				defaultPageTransition: 'none',
	            defaultDialogTransition: 'none',
			});
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			
			// cfr. http://stackoverflow.com/questions/4891906/jquery-mobile-default-data-theme
			$.mobile.listview.prototype.options.dividerTheme = 'a';
		});
        




	        var app = {
	        	page: 'app-web.html',
			    init: function() {
			    	// Genera elenco bandierine
			    	var html = '';
			    	for (lang in SUPPORTED_LANGUAGES) {
		            	// Flags: http://www.printableworldflags.com/flag-icon
			    		html += '<a onclick="changeLanguage(\''+lang+'\')" class="flag flag-'+lang+'">'
			    			+'<img src="arag/images/flag-'+lang+'.png" />'
			    			+'</a>';
			    	}
			    	$('#langsel-langs').html(html);
			    	
			    	// Lingua di default (sistema)
			    	var deflang = window.location.href.substring(window.location.href.indexOf('?')+1);
			    	console.log('DEFAULT LANGUAGE', deflang);
			    	if (deflang) $('.flag-'+deflang).addClass('deflang')
			    },
			};
        





		$(document).bind('mobileinit', function() {
			// jQuery mobile settings
			$.extend($.mobile, {
				defaultPageTransition: 'none',
	            defaultDialogTransition: 'none',
			});
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			
			// cfr. http://stackoverflow.com/questions/4891906/jquery-mobile-default-data-theme
			$.mobile.listview.prototype.options.dividerTheme = 'a';
			
			// Disable overscroll / viewport moving on everything but scrollable divs
			$('body').on('touchmove', function (e) {
				if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
			});
		});
        

















/*

				*** ANALYTICS ***

- app avviata: /
- configuratore: /configurator/<curtype>
- ricerca semplice: /configurator/<curtype>/simple
- ricerca avanzata: /configurator/<curtype>/advanced
- catalogo: /catalog
- dettaglio ugello: /catalog/nozzle/<id> o /configurator/nozzle/<id>

 */

// GA plugin
var gaPlugin = null;

function initGA() {
	if (window.plugins && window.plugins.gaPlugin && gaPlugin == null) {
		gaPlugin = window.plugins.gaPlugin;
	    gaPlugin.init(
	    		function(result) { console.log('GA init OK: '+result); }, 
	    		function(result) { console.log('GA init ERR: '+result); }, 
	    		'UA-42060646-2', 10);
	}	
}

function exitGA() {
	if (gaPlugin) gaPlugin.exit(
			function(result) { console.log('GA exit OK: '+result); }, 
			function(result) { console.log('GA exit ERR: '+result); });	
	
}

function trackEvent(category, eventAction, eventLabel, eventValue) {
	// cfr. https://github.com/phonegap-build/GAPlugin/blob/master/README.md
	console.log('GA: trackEvent()='+category+'/'+eventAction);
	if (gaPlugin) gaPlugin.trackEvent(
			function(result) { console.log('GA exit OK: '+result); }, 
			function(result) { console.log('GA exit ERR: '+result); }, 
			category, eventAction, eventLabel, eventValue);
}

function trackPage(url) {
	// cfr. https://github.com/phonegap-build/GAPlugin/blob/master/README.md
	console.log('GA: trackPage()='+url);
	if (gaPlugin) gaPlugin.trackPage(
			function(result) { console.log('GA exit OK: '+result); }, 
			function(result) { console.log('GA exit ERR: '+result); }, 
			url);
}


// Flag for tablets
var tablet = false;

// Tablet limit for grid layout
tabletLimit = 1000;

var appTablet = {
    initiate: function() {
        // Waiting for UI to be ready before launche the application.
        UI.initiate();
        appTablet.bindEvents();
    },
    bindEvents: function() {
        // Appling events on windows
        var currentWindow = $(window);
        // currentWindow.addEventListener('orientationchange', eventsHandler.onOrientationChange, false );
        currentWindow.on('orientationchange', eventsHandler.onOrientationChange);
        // Setting beaviour for each click on calaog function
    }
};

var eventsHandler = {
    onCatalogSelection: function(event) {
        // Change behaviour in case of tablet layout
        if( tablet ) {
            // Manage event from here
            event.preventDefault();
            initNozzle(nozzleid);
        }
    },
    /**
     * Do something when orientation change.
     * @param  {object} event (Optional) Unused. Event object given by JQuery event launcher.
     */
    onOrientationChange: function (event) {
        // DEV: Maybe useful
        // if(event.orientation) {
        // if(event.orientation == 'portrait'){
        //      // portrait settings
        //  }
        //  else if(event.orientation == 'landscape') {
        //      // landscape settings
        //  };
        // };

        // Check size compatibility.
        UI.checkSize();
    }
};

var UI = {
    initiate: function(callback) {
        // Check if callback is been initialized
        callback = typeof callback === 'function' ? callback : UI.UIReady;
        // Select appropriate element for UI
        if( tablet )
            UI.tablet();
        else
            UI.phone();
        // Launch callback function
        callback();
    },
    // Tablet instruction to renderize correctly
    tablet: function() {
        console.log('Initialize tablet UI');
        // TODO: Improve performance adding a selector to prevent DOM scan four times
        // Remove class to prevent width 100% of JQM layout.
        $('[data-role="page"]').removeClass('phone').addClass('tablet');
//        $('.tablet-hidden').hide();
//        $('.phone-hidden').show();
        $('.tablet-scrollable').attr('data-iscroll','');
    },
    // Smartphone instruction to renderize on smartphone
    phone: function() {
        console.log('Initialize phone UI');
        // TODO: Improve performance adding a selector to prevent DOM scan four times
        // Setting body class to body for JQM Grid
        $('[data-role="page"]').removeClass('tablet').addClass('phone');
//        $('.tablet-hidden').show();
//        $('.phone-hidden').hide();
        $('.tablet-scrollable').removeAttr('data-iscroll');
    },

    checkSize: function() {
    	
    	// Orientation from storage
    	var orientation = window.localStorage.getItem('arag_orientation');
    	tablet = orientation == 'tablet';
    	UI.initiate();
    	
    	
//        var viewport = $(window);
//        console.log('Android UA set to ' +androidUA);
//        var viewWidth = androidUA ? viewport.height() : viewport.width();
//        var viewHeight = androidUA ? viewport.width() : viewport.height();
//
//        // DEV:
//        console.log('Dimensioni schermo: ' +viewWidth +'x' +viewHeight);
//        alert("Screen size: "+$(window).width()+"x"+$(window).height()+"\nOrientation: "+window.orientation+"\nAndroid: "+androidUA);
//        if( viewWidth < tabletLimit ) {
//            // DEV:
//            console.log('UI Mode: phone');
//            // Setting variable to identify phone layout
//            tablet = false;
//            UI.initiate();
//        }
//        else {
//            // DEV:
//            console.log('UI Mode: tablet');
//            // Setting variable for tablet identification
//            tablet = true;
//            UI.initiate();
//        }
    },
    // Default behaviour to have when chang layout.
    UIReady: function() {
        // if no page setted point to home page
        if( !$.mobile.activePage || $.mobile.activePage.attr('id') == 'lang' ) {
            $.mobile.changePage('#home');
        }
        // If some page is already setted
        else {
            // DEV:
            console.log('Creazione della pagina');
            $.mobile.activePage.trigger('create');
        }

    },
    // Just to check if UI is setted to tablet or not
    isTablet: function() {
        return tablet;
    }
};

//$(document).ready(function() {
//    // Check width of the display
//    UI.checkSize();
//    init();
//    // If resizing due to orientation change
//    // FIXME: Useless if use device orientation sensors
//    // $(window).resize(function() {
//    //  if (currentWindow.width() > tabletLimit )
//    //      $('body').addClass('phone');
//    //  else
//    //      $('body').removeClass('phone');
//    // });
//});


function initNozzle(cod, nozzlepressure, nozzledelivery, nozzlespeed) {
	console.log('initNozzle(): cod='+cod+', delivery='+nozzledelivery+', pressure='+nozzlepressure);
	
	// Unità di misura
	var units = getUnits();

	// Language
	var language = window.localStorage.getItem('language');
	
	// Colonna descrizione
	var descrcol = 'CARATTERISTICHE_ENG';
	if (SUPPORTED_LANGUAGES[language].descrcol) descrcol = SUPPORTED_LANGUAGES[language].descrcol;
	if (units == 'us') descrcol += '_USA';

	$('.nozzle-wrapper').hide();
	$('.nozzle-wrapper div[data-role="collapsible"]').trigger('collapse');
	
	showLoading();
	
	// Ricerca prodotto
	var sql = 'SELECT c.NOME_IMMAGINE, c.CODICE, c.ID_REF_IMMAGINE as REF_OK, f.* FROM codici c INNER JOIN famiglie f ON c.ID_FAMIGLIA=f.ID_FAMIGLIA WHERE CODICE=?';
	var data = [cod];
	console.log(sql, cod);
	html5sql.process([{ sql: sql, data: data, }],
		function(transaction, results) {
			if (results.rows.length > 0) {
				var nozzle = results.rows.item(0);
	
				// Abbiamo un ugello (e questo ci fa molto piacere!)
				var nozzle = results.rows.item(0), id_ref_immagine = parseInt($.trim(nozzle.REF_OK));
				
				// Seleziona dati ugello
				// FIXME: con la bind variable non funziona! sarà colpa delle colonne omonime??
				var sql = 'SELECT DISTINCT c.* FROM immagini_assegnate a INNER JOIN immagini_classificazione c ON a.NOME_IMMAGINE=c.NOME_IMMAGINE WHERE a.ID_REF_IMMAGINE='+id_ref_immagine;
				var data = [];
				console.log(sql);
				html5sql.process([{ sql: sql, data: data, }],
					function(transaction, results) {
						// Titolo pagina
						if ($.mobile.activePage.attr('id') == 'catalog') $$('.ui-title').text(nozzle.CODICE);
		
						// Family
						$('.nozzle-family').text(nozzle.DESCR_FAMIGLIA);
						
						// Valori calcolati
						var nozzlecompute = $('.nozzle-compute');
						if (nozzlepressure != null && nozzledelivery != null) {
							var deliveryunits = 'l/min', pressureunits = 'bar', speedunits = 'km/h';
							if (units == 'us') {
								nozzledelivery *= lmin2galmin;
								nozzledelivery = parseFloat(nozzledelivery).toFixed(2);
								nozzlepressure = nozzlepressure; // essendo calcolato è già nell'unità corretta
								nozzlespeed = nozzlespeed; // è già nell'unità corretta
								deliveryunits = 'GPM'; // gal/min
								pressureunits = 'PSI';
								speedunits = 'MPH';
							}
//							nozzlecompute.html(
//								 'Working delivery: <strong>'+nozzledelivery+'</strong> '+deliveryunits+'<br/>'
//								+'Working pressure: <strong>'+nozzlepressure+'</strong> '+pressureunits+'<br/>'
//								+'Speed: <strong>'+nozzlespeed+'</strong> '+speedunits
//							).show();
							nozzlecompute.html(
								 '<div class="nozzle-compute-el"><img src="arag/images/delivery.png" /><br/>Delivery:<br/><strong>'+nozzledelivery+'</strong> '+deliveryunits+'</div>'
								+'<div class="nozzle-compute-el"><img src="arag/images/pressure.png" /><br/>Pressure:<br/><strong>'+nozzlepressure+'</strong> '+pressureunits+'</div>'
								+'<div class="nozzle-compute-el"><img src="arag/images/speed.png" /><br/>Speed:<br/><strong>'+nozzlespeed+'</strong> '+speedunits+'</div>'
							).show();
						}
						else nozzlecompute.hide();
						
						// Description
						var descr = typeof(nozzle[descrcol]) != 'undefined' ? nozzle[descrcol] : '';
						$('.nozzle-descr').html(descr ? descr.replace(/\\n/g, '<br/>') : '');
		
						// Image
						$('.nozzle-img').html('<img src="arag/nozzles/'+nozzle.NOME_IMMAGINE+'" width="100%" />');
		
						// Campi con immagini
						var fields = {
							CARATTERISTICHE: $('.nozzle-features'),
							CARATTERISTICHE_USA: $('.nozzle-features-usa'),
							UTILIZZO: $('.nozzle-use'),
							DIMENSIONI: $('.nozzle-dimens'),
							DIMENSIONI_USA: $('.nozzle-dimens-usa'),
						};
						fields.CARATTERISTICHE.find('img').remove();
						fields.CARATTERISTICHE_USA.find('img').remove();
						fields.UTILIZZO.find('img').remove();
						fields.DIMENSIONI.find('img').remove();
						fields.DIMENSIONI_USA.find('img').remove();
						
						// Aggiungi immagini
						for (var i = 0; i < results.rows.length; i++) {
							var image = results.rows.item(i);
							if (typeof(fields[image.CLASSIFICAZIONE]) != 'undefined') {
								// Fix spazi
								var src = image.NOME_IMMAGINE.replace(' ', '_');
								
								// Immagine
								fields[image.CLASSIFICAZIONE].append('<img src="arag/nozzles/'+src+'" />');
							}
						}

						// Fix immagini USA
						if (units == 'us') {
							fields.CARATTERISTICHE.hide();
							fields.CARATTERISTICHE_USA.show();
							fields.DIMENSIONI.hide();
							fields.DIMENSIONI_USA.show();
						}
						else {
							fields.CARATTERISTICHE.show();
							fields.CARATTERISTICHE_USA.hide();
							fields.DIMENSIONI.show();
							fields.DIMENSIONI_USA.hide();
						}
						
						$('.nozzle-wrapper').show();
						
						hideLoading();
				    },
				    function(error, statement) {
				        console.error("SQL Error: "+error.message+": "+statement);
				        productNotFound();
				    }        
				);		
			}
			else { productNotFound(); }
	    },
	    function(error, statement) {
	        console.error("SQL Error: "+error.message+": "+statement);
	        productNotFound();
	    }        
	);		
} // initNozzle

function productNotFound(err) {
	if (typeof(err) != 'undefined') console.log('SQL ERROR: ', err);	

	// No ugello? No party!
	navigator.notification.alert('Sorry, the product you selected could not be found on our database.', function() {
		// Chiudi dettaglio
		hideLoading();
		history.back();
	}, 'Nozzle not found', 'OK');
} // productNotFound


var curtype = null;

function showConfigurator(type) {
	// Resetta ai valori di default se cambio tipo di macchina
	if (curtype == null || curtype != type) {
		// Imposta valori slider e etichette
		var barlabel = 'h3[data-localize="cfg_barlength"]';
		if (configuratorPageShown) barlabel += ' .ui-btn-text';
		barlabel += ', span[data-localize="cfg_barlength"]';
		var slider = $('#barlength');
		var sliderugelli = $('#nozzlesnum');
		var sliderspeed = $('#speed');
		var sliderflow = $('#flow');
		var sliderpressuremin = $('#pressure-min');
		var sliderpressuremax = $('#pressure-max');
		var advsearch = $('#advanced-search');
		var spraycoverage = $('#spraycoverage-wrapper');
		var antidriftwrapper = $('#antidrift-wrapper');
		var materialwrapper = $('#material-wrapper');
		var units = getUnits();
		
		if (type == 'utilizzo_atomizzatore') {
			// Atomizzatore
			$(barlabel).html(strings.interfilare_length);
			
			// 1 l/ha = 0.1069 US GPA
			if (units != 'us') sliderflow.attr('min', 0).attr('max', 2000).attr('step', 20).attr('value', 200).val(200);
			else sliderflow.attr('min', 0).attr('max', 210).attr('step', 7).attr('value', 21).val(21);
			// 1 m = 39.37 inch
			if (units != 'us') slider.attr('min', 2).attr('max', 10).attr('step', 0.1).attr('value', 2.5).val(2.5); 			// m
			else slider.attr('min', 80).attr('max', 400).attr('step', 4).attr('value', 100).val(100);							// us
			sliderugelli.attr('min', 2).attr('max', 32).attr('step', 2).attr('value', 14).val(14);								// m+us
			// 1 bar = 14.5038 PSI
			if (units != 'us') sliderpressuremin.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 4).val(4); 		// m
			else sliderpressuremin.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 15).val(15);					// us
			if (units != 'us') sliderpressuremax.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 15).val(15);	// m
			else sliderpressuremax.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 120).val(120);					// us
			// 1 km/h = 0.62137 mph
			if (units != 'us') sliderspeed.attr('min', 1).attr('max', 30).attr('step', 0.5).attr('value', 6).val(6);			// m
			else sliderspeed.attr('min', 1).attr('max', 20).attr('step', 0.5).attr('value', 4).val(4);							// us
					
			// Query
			curtype = 'utilizzo_atomizzatore';
			advsearch.show();
			spraycoverage.show();
			antidriftwrapper.show();
			materialwrapper.show();
		}
		else if (type == 'utilizzo_irrorazione') {
			// Diserbo
			$(barlabel).html(strings.cfg_barlength);
			
			// 1 l/ha = 0.1069 US GPA
			if (units != 'us') sliderflow.attr('min', 0).attr('max', 2000).attr('step', 20).attr('value', 200).val(200);
			else sliderflow.attr('min', 0).attr('max', 210).attr('step', 7).attr('value', 21).val(21);
			// 1 m = 39.37 inch
			if (units != 'us') slider.attr('min', 2).attr('max', 50).attr('step', 0.5).attr('value', 10).val(10);				// m
			else slider.attr('min', 80).attr('max', 2000).attr('step', 20).attr('value', 400).val(400);							// us
			sliderugelli.attr('min', 2).attr('max', 100).attr('step', 2).attr('value', 20).val(20);								// m+us
			// 1 bar = 14.5038 PSI
			if (units != 'us') sliderpressuremin.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 1).val(1);		// m
			else sliderpressuremin.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 15).val(15);					// us
			if (units != 'us') sliderpressuremax.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 5).val(5);		// m
			else sliderpressuremax.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 120).val(120);					// us
			// 1 km/h = 0.62137 mph
			if (units != 'us') sliderspeed.attr('min', 1).attr('max', 30).attr('step', 0.5).attr('value', 6).val(6);			// m
			else sliderspeed.attr('min', 1).attr('max', 20).attr('step', 0.5).attr('value', 4).val(4);							// us
			
			// Query
			curtype = 'utilizzo_irrorazione';
			advsearch.show();
			spraycoverage.show();
			antidriftwrapper.show();
			materialwrapper.show();
		}
		else if (type == 'trattamento_spalla') {
			// Pompa spalla
			$(barlabel).html(strings.workbar_length);
			
			// 1 l/ha = 0.1069 US GPA
			if (units != 'us') sliderflow.attr('min', 0).attr('max', 2000).attr('step', 20).attr('value', 240).val(240);
			else sliderflow.attr('min', 0).attr('max', 210).attr('step', 7).attr('value', 27).val(28);
			// 1 m = 39.37 inch
			if (units != 'us') slider.attr('min', 0.3).attr('max', 1.5).attr('step', 0.1).attr('value', 0.5).val(0.5);
			else slider.attr('min', 10).attr('max', 60).attr('step', 2).attr('value', 10).val(10);
			sliderugelli.attr('min', 1).attr('max', 3).attr('step', 1).attr('value', 1).val(1);
			// 1 bar = 14.5038 PSI
			if (units != 'us') sliderpressuremin.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 1).val(1);		// m
			else sliderpressuremin.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 15).val(15);					// us
			if (units != 'us') sliderpressuremax.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 5).val(5);		// m
			else sliderpressuremax.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 120).val(120);					// us
			// 1 km/h = 0.62137 mph
			if (units != 'us') sliderspeed.attr('min', 0.1).attr('max', 6).attr('step', 0.1).attr('value', 3.6).val(3.6);		// m
			else sliderspeed.attr('min', 0.1).attr('max', 4).attr('step', 0.1).attr('value', 2.2).val(2.2);						// us
	
			// Query
			curtype = 'trattamento_spalla';
			advsearch.show();
			spraycoverage.hide();
			antidriftwrapper.hide();
			materialwrapper.hide();
		}
		else if (type == 'PSP') {
			// PSP
			$(barlabel).html(strings.cfg_barlength);
			
			// 1 l/ha = 0.1069 US GPA
			if (units != 'us') sliderflow.attr('min', 0).attr('max', 2000).attr('step', 20).attr('value', 200).val(200);
			else sliderflow.attr('min', 0).attr('max', 210).attr('step', 7).attr('value', 21).val(21);
			// 1 m = 39.37 inch
			if (units != 'us') slider.attr('min', 2).attr('max', 50).attr('step', 0.5).attr('value', 10).val(10);
			else slider.attr('min', 80).attr('max', 2000).attr('step', 20).attr('value', 80).val(80);
			sliderugelli.attr('min', 2).attr('max', 100).attr('step', 2).attr('value', 20).val(20);
			// 1 bar = 14.5038 PSI
			if (units != 'us') sliderpressuremin.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 2).val(2);		// m
			else sliderpressuremin.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 15).val(15);					// us
			if (units != 'us') sliderpressuremax.attr('min', 0).attr('max', 20).attr('step', 0.5).attr('value', 5).val(5);		// m
			else sliderpressuremax.attr('min', 0).attr('max', 300).attr('step', 5).attr('value', 120).val(120);					// us
			// 1 km/h = 0.62137 mph
			if (units != 'us') sliderspeed.attr('min', 1).attr('max', 30).attr('step', 0.5).attr('value', 6).val(6);			// m
			else sliderspeed.attr('min', 1).attr('max', 20).attr('step', 0.5).attr('value', 4).val(4);							// us
	
			// Query
			curtype = 'PSP';
			advsearch.hide();
//			spraycoverage.show();
//			antidriftwrapper.show();
//			materialwrapper.show();
		}
		
		// Refresh slider
		if (slider.hasClass('ui-slider-input')) {
			slider.slider('refresh');
			sliderugelli.slider('refresh');
			sliderspeed.slider('refresh');
			sliderpressuremin.slider('refresh');
			sliderpressuremax.slider('refresh');
			sliderflow.slider('refresh');
		}
	
		// Elimina risultati precedenti
		$('#nozzle-delivery').html('');
		$('#nozzles').find('li:not(li[data-role="list-divider"])').remove();
		
		// Di default apri la ricerca base
		$('#basesearch').trigger('expand');
	}
	
	// Vai al configuratore
	$.mobile.changePage('#configurator');
	$('#configurator-panel').panel('close');
}

var useadvsearch = false;
function initConfigurator() {
	// Panel menu (tablet)
//	$('#configurator-panel').panel({
//	  open: function( event, ui ) {
//		alert("OPEN");
//		$('#configurator-panel').addClass('tablet-scrollable');
//	  }
//	});
	
	// GA
	trackPage('/configurator/'+curtype);
	useadvsearch = false;
//	$$('#advanced-search').unbind().bind('tap', function() { useadvsearch = true; });
	
	// Slider e altri selettori
	var flow = $$('#flow'), speed = $$('#speed'), barlength = $$('#barlength'), nozzlesnum = $$('#nozzlesnum');
	var pressuremin = $$('#pressure-min'), pressuremax = $$('#pressure-max'), dropsize = $$('#dropsize');

	// Configurator tips (tutorial)
	if (!storage.getItem('cfg-tip')) {
		var anchor = flow;
		$('#configurator-tip')
			.popup('open', { transition:'slide', positionTo:anchor })
			.popup({
				'afteropen': function() {
					setTimeout(function() {
						anchor.addClass('hl-el');
						$('#configurator-tip-popup').css({'margin-right':10, 'margin-left':anchor.width()+30});
					}, 500);
				},
				'afterclose': function() {
					anchor.removeClass('hl-el');
				}
			});
		
		storage.setItem('cfg-tip', 1);
	}

	// Refresh per cambio unità di misura
	flow.slider('refresh');
	speed.slider('refresh');
//	spacing.slider('refresh');
	barlength.slider('refresh');
	pressuremin.slider('refresh');
	pressuremax.slider('refresh');

	// Range pressione
	pressuremin.off('slidestop').on('slidestop', function(eventi, ui) {
		if (parseFloat(pressuremax.val()) < parseFloat(pressuremin.val())) pressuremax.val(pressuremin.val()).slider('refresh');
		useadvsearch = true;
		doSearch();
	});
	pressuremax.off('slidestop').on('slidestop', function(eventi, ui) {
		if (parseFloat(pressuremax.val()) < parseFloat(pressuremin.val())) pressuremin.val(pressuremax.val()).slider('refresh');
		useadvsearch = true;
		doSearch();
	});
	
	// Pulsante "next" su Android
	var BTN_NEXT = 13;
//	flow.off('keyup').on('keyup', function(e) {
//		if (e.which == BTN_NEXT) { speed.focus(); setTimeout(function() { speed.trigger('click'); }, 1000); }
//	});
	$$('.ui-slider input[type=number]').on('keyup', function(e) { if (e.which == BTN_NEXT) doSearch(); });
	
	// Valori custom per la dimensione goccia
	var dropsizeval = $$('#dropsize-val');
	if (dropsizeval.size() == 0) {
		dropsize.hide().after('<input type="text" id="dropsize-val" readonly />');
		dropsizeval = $$('#dropsize-val');
		dropsizeval.prop('class', dropsize.prop('class'));
	}
	var donottrackdrop = true;
	dropsize.off('change').on('change', function() {
		if (!donottrackdrop) useadvsearch = true;
		switch (dropsize.val()) {
		case '0': dropsizeval.val('');   break;
		case '1': dropsizeval.val('VF'); break;
		case '2': dropsizeval.val('F');  break;
		case '3': dropsizeval.val('M');  break;
		case '4': dropsizeval.val('C');  break;
		case '5': dropsizeval.val('VC'); break;
		}
	});
	dropsize.trigger('change');
	donottrackdrop = false;
	
	// Drop icons
	var dropiconmargin = $$('.ui-content').width() - $$('#dropsize-val').width() - 48 /*icons*/ - 30 /* padding */ - 50 /* ??? */;
	$$('#dropsize-icon-small').css('margin-right', dropiconmargin);
	
	// Seleziona tutto quando clicco nell'area di testo
	// cfr. http://stackoverflow.com/questions/9924506/selecting-text-on-focus-using-jquery-not-working-in-iphone-ipad-browsers
	// cfr. http://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari
//	jQuery.validator.unobtrusive.parse(".ui-page-active form");
	$$('.ui-slider input[type=number]').off('mouseup').on('mouseup', function (e) { e.preventDefault(); });
	$$('.ui-slider input[type=number]').on('focus').on('focus', function() { this.select(); this.setSelectionRange(0, 9999); });

	// GA useadvsearch
	$$('#advsearch3, #advsearch4').off('change').on('change', function() { useadvsearch = true; });
	
	function doSearch() {
		// Parsing valori
		var flowval = flow.val(), speedval = speed.val();
		var nozzlesnumval = nozzlesnum.val();
		var spacingval = barlength.val() * 100 / nozzlesnumval; // spacingval era in cm ma ora è in m
		var pressureminval = pressuremin.val(), pressuremaxval = pressuremax.val();
		var dropsizetextval = dropsizeval.val();
		
		// GA
		trackPage('/configurator/'+curtype+'/'+(useadvsearch ? 'advanced' : 'simple'));

		// Esegui query
		filterNozzles(flowval, speedval, spacingval, pressureminval, pressuremaxval, nozzlesnumval, dropsizetextval);
	}
	
	// Click pulsante: esegui ricerca
	$$('#searchbtn').unbind().bind('tap', function() {
		// Cerca ugelli
		doSearch();
		
		// Scroll page to first element
		$.mobile.silentScroll($$('#results').get(0).offsetTop-50);
	});
	
	// Live search
	flow.off('slidestop').on('slidestop', doSearch);
	speed.off('slidestop').on('slidestop', doSearch);
	barlength.off('slidestop').on('slidestop', doSearch);
	nozzlesnum.off('slidestop').on('slidestop', doSearch);
	dropsize.off('slidestop').on('slidestop', doSearch);
	
	// Non permettere selezione dalla track ma solo dal quadratino
	disableSliderTrack($('#configurator .ui-slider'));
	
	configuratorPageShown = true;
} // initConfigurator

function disableSliderTrack($slider){
	function isTouchInSliderHandle($slider, coords){
		var x = coords.pageX, y = coords.pageY;
		var $handle = $slider.find(".ui-slider-handle");
		if ($handle) {
			var left = $handle.offset().left;
			var right = (left + $handle.outerWidth());
			var top = $handle.offset().top;
			var bottom = (top + $handle.outerHeight());
			
			return (x >= left && x <= right && y >= top && y <= bottom);    
		}
		else {
			return false;
		}
	}

	function isTouchInSliderTextfield($slider, coords){
		var x = coords.pageX, y = coords.pageY;
		var $handle = $slider.find(".ui-input-text");
		var left = $handle.offset().left;
		var right = (left + $handle.outerWidth());
		var top = $handle.offset().top;
		var bottom = (top + $handle.outerHeight());
		
		return (x >= left && x <= right && y >= top && y <= bottom);    
	}
	
    $slider.bind("mousedown", function(event) {
    	return isTouchInSliderHandle($(this), event) || 
    		isTouchInSliderTextfield($(this), event);
    });
    $slider.bind("touchstart", function(event) {
    	return isTouchInSliderHandle($(this), event.originalEvent.touches[0]) || 
    		isTouchInSliderTextfield($(this), event.originalEvent.touches[0]);
    });
}

function filterNozzles(flow, speed, distance, pressuremin, pressuremax, nozzlesnum, dropsizetextval) {
	// Mostra caricamento
	showLoading();
	setTimeout(function() {
	
	// Conversione INVERSA unità di misura (i dati sul catalogo sono in unità metriche)
	var pressuremin_psi = pressuremin / bar2psi_rate;
	var pressuremax_psi = pressuremax / bar2psi_rate;
	if (getUnits() == 'us') {
		flow *= flow_rate;
		speed *= speed_rate;
		distance *= spacing_rate / 100;
		pressuremin /= bar2psi_rate;
		pressuremax /= bar2psi_rate;
	}
	
	// Calcolo range delivery
	var delivery = flow * speed * distance / 60000;
	var tolerance = delivery * 0.05;
//	var deliverymin = delivery - tolerance, deliverymax = delivery + tolerance;
	var max_delivery = delivery * nozzlesnum;

	console.log('Valori convertiti: flow='+flow+', speed='+speed+', distance='+distance+' pressuremin='+pressuremin+', pressuremax'+pressuremax+', delivery='+delivery);

	// Conversione unità di misura visualizzate
	var unit = 'l/min';
	var delivery_display = delivery;
	var delivery_psi = delivery * lmin2galmin;
	var max_delivery_display = max_delivery;
	var helper_table = 'configurator_helper';
	if (getUnits() == 'us') {
		delivery_display *= lmin2galmin;
		max_delivery_display *= lmin2galmin;
		unit = 'GPM'; // gal/min
		helper_table = 'configurator_helper_psi';
	}
	delivery_display = parseFloat(delivery_display).toFixed(2);
	max_delivery_display = parseFloat(max_delivery_display).toFixed(2);
	
	// Display delivery range
	$$('#nozzle-delivery').html(
		 strings.cat_delivery+': '+delivery_display+' '+unit
		+'<br/>'+strings.cfg_max_delivery+': '+max_delivery_display+' '+unit
	);
	
	// Select sul db
	var sql = 'SELECT DISTINCT c.CODICE, c.NOME_IMMAGINE, f.PRESSIONE, f.FLOW, h.FLOW_MIN, h.FLOW_MAX'
		+' FROM configurator f'
		+' INNER JOIN '+helper_table+' h ON h.CODICE=f.CODICE'
		+' INNER JOIN codici c ON c.CODICE=f.CODICE'
		+' INNER JOIN caratteristiche_famiglie m ON m.ID_FAMIGLIA=c.ID_FAMIGLIA'
		
	// Ricerca standard
	var where = [];
	var data = [];
	
	// Portata
//	where.push('f.FLOW >= ?');
//	where.push('f.FLOW <= ?');
//	data.push(deliverymin);
//	data.push(deliverymax);
	
	// Portata v2
	where.push('(h.FLOW_MIN <= ? AND h.FLOW_MAX >= ?)');
//	where.push('(h.FLOW_MIN >= ? OR h.FLOW_MAX <= ?)');
//	where.push('(h.FLOW_MIN <= ? OR h.FLOW_MAX >= ?)');
//	data.push(deliverymin);
//	data.push(deliverymax);
	if (getUnits() != 'us') {
		data.push(delivery);
		data.push(delivery);
	}
	else {
		data.push(delivery_psi);
		data.push(delivery_psi);
	}
	
	// Pressione v2
//	if (curtype != 'PSP') {
//		if (getUnits() != 'us') {
//			where.push('(h.BAR_MIN >= ? OR h.BAR_MAX <= ?)');
////			where.push('h.BAR_MIN <= ? AND h.BAR_MAX >= ?');
//			data.push(pressuremin);
//			data.push(pressuremax);
//		}
//		else {
//			where.push('(h.PSI_MIN >= ? OR h.PSI_MAX <= ?)');
//			data.push(pressuremin_psi);
//			data.push(pressuremax_psi);
//		}
//	}
	
	// Pre-configuratore
	if (curtype == 'PSP') {
		where.push('c.CODICE LIKE ?');
		data.push('PSP%');
	}
	else if (curtype) {
		where.push(curtype+' = ?');
		data.push('1');
	}
	
	// Ricerca avanzata
	if (curtype != 'PSP' && curtype != 'trattamento_spalla') {
		$$('#advanced-search select').each(function() {
			var advwhere = [], vals = $(this).val();
			for (val in vals) { advwhere.push(vals[val] + ' = ?'); data.push('1'); }
			if (advwhere.length > 0) where.push('(' + advwhere.join(' OR ') + ')');
		});
	}
		
	// Antideriva
	if (curtype != 'PSP' && curtype != 'trattamento_spalla' && $$('#advsearch5').attr('checked')) {
		where.push('ugelli_antideriva = ?');
		data.push('1');
	}
	
	// Dimensione goccia
	if (curtype != 'PSP' && dropsizetextval) {
		where.push('f.DROPSIZE = ?');
		data.push(dropsizetextval);
	}
	
	// Where
	sql += ' WHERE ' + where.join(' AND ');

	// Ordinamento
	sql += ' ORDER BY c.CODICE ASC';
	
	// Stampa query esatta
	var stringquery = ''; var pieces = sql.split('?');
	for (var i = 0; i < pieces.length; i++) { stringquery += pieces[i]; if (data[i]) stringquery += data[i]; }
	console.log(stringquery);
	
	// Esegui query
	html5sql.process([{ sql: sql, data: data, }],
		function(transaction, results) {
			console.log('RESULTS: ', results.rows.length);
			
			// Parsing risultati
			var nozzles = { count:{}, list:[] };
			for (var i = 0; i < results.rows.length; i++) {
				// De-duplica
				var r = results.rows.item(i);
//				console.log('RESULT: ', r);
				
				if (typeof(nozzles.count[r.CODICE]) == 'undefined' || true) {
					// Prima occorrenza dell'ugello
					nozzles.count[r.CODICE] = 0;
					nozzles.list.push(r);
				}
//				else {
//					// Ugello già presente nella lista, tengo il conto anche se non serve a una mazza!
//					nozzles.count[r.CODICE]++;
//				}
			}
			
			// Callback per aggiornamento UI
			layoutNozzles(nozzles.list, delivery, speed, pressuremin, pressuremax);
	    },
	    function(error, statement) {
	        console.error("SQL Error: "+error.message+": "+statement);
	        navigator.notification.alert(error.message, null, 'Error', 'OK');
	    	hideLoading();
	    }        
	);
	
	}, 300); // setTimeout
	
} // filterNozzles

function layoutNozzles(nozzles, delivery, speed, pressuremin, pressuremax) {
	var ul = $$('#nozzles');
	
	ul.find('li:not(li[data-role="list-divider"])').remove();
	var count = ul.find('li[data-role="list-divider"] .ui-li-count');
  
	var html = '';
	var n_results = 0; // <- ATTENZIONE: i risultati in [nozzles] devono ancora essere filtrati sulla pressione
	
	var units_usa = getUnits() == 'us';
	var uniq_nozzles = {};
	
	if (nozzles.length > 0) {
		// Deduplica risultati
		for (i in nozzles) {
			var nozzle = nozzles[i];
			
			// Calcolo pressione di lavoro
			var pressure = Math.pow(delivery / nozzle.FLOW, 2) * nozzle.PRESSIONE;

			// Filtro pressione
			if (curtype != 'PSP' && (pressure < pressuremin || pressure > pressuremax)) {
				console.log('Filtering: '+nozzle.CODICE+' (pressure='+pressure+' not in range ['+pressuremin+'-'+pressuremax+'])');
				continue;
			}
			
			var diff = Math.abs(delivery - pressure);
			if (uniq_nozzles[nozzle.CODICE] && uniq_nozzles[nozzle.CODICE] < diff) {
				console.log('Filtering: '+nozzle.CODICE+' (diff='+diff+' less than previous='+uniq_nozzles[nozzle.CODICE]);
				continue;
			}
			uniq_nozzles[nozzle.CODICE] = {pressure:pressure, diff:diff, nozzle:nozzle};
		}
		
		for (i in uniq_nozzles) {
			var nozzle = uniq_nozzles[i].nozzle;
			var pressure = uniq_nozzles[i].pressure;

			// Unità USA
			var unit = 'bar';
			if (units_usa) { unit = 'PSI'; pressure *= bar2psi_rate; }
			
			// Arrotondamento
			pressure = parseFloat(pressure).toFixed(2);
			delivery = parseFloat(delivery).toFixed(2);
			speed = parseFloat(speed).toFixed(1);
			
//			var thumb = 'arag/images/drop.png';
			var thumb = 'arag/nozzles/'+nozzle.NOME_IMMAGINE;
			
			html += '<li>'
//				+'<a href="#nozzle" data-url="?cod='+nozzle.CODICE+'" nozzleid="'+nozzle.CODICE+'" pressure="'+pressure+'" delivery="'+delivery+'" speed="'+speed+'">'
				+'<a href="javascript:showNozzleFromConfigurator(\''+nozzle.CODICE+'\', \''+pressure+'\', \''+delivery+'\', \''+speed+'\')">'
				+'<img src="'+thumb+'" class="ui-li-icon ui-li-thumb" />'
				+' '+nozzle.CODICE+' '
				+' <span class="ui-li-count">'+pressure+' '+unit+'</span>'
				+'</a>'
				+'</li>';
			
			n_results++;
		}
	}
	
	if (n_results == 0) {
		// No results
		html = '<li>'+strings.cfg_no_results+'</li>';
	}
	
	ul.html(html).listview('refresh').show()/*.find('a').bind('tap', function() {
		// FIXME: Bug jQuery 1.8: non supporta i parametri nell'url!!!
		nozzleid = $(this).attr('nozzleid');
		nozzlepressure = $(this).attr('pressure');
		nozzledelivery = $(this).attr('delivery');
		nozzlespeed = $(this).attr('speed');
	});*/
		
	// Hide loading
	hideLoading();
	
} // layoutNozzles

function showNozzleFromConfigurator(cod, pressure, delivery, speed) {
	// GA
	trackPage('/configurator/nozzle/'+cod);
	
	initNozzle(cod, pressure, delivery, speed);
	$.mobile.changePage('#nozzle');
}


// Language
var SUPPORTED_LANGUAGES = {
	'en': { name: 'English', 		descrcol: 'CARATTERISTICHE_ENG', },
	'br': { name: 'Brazilian', 		descrcol: 'CARATTERISTICHE_BRA', },
	'it': { name: 'Italiano', 		descrcol: 'CARATTERISTICHE_ITA', },
	'es': { name: 'Español', 		descrcol: 'CARATTERISTICHE_SPA', },
//	'ru': { name: 'Русские', 		descrcol: 'CARATTERISTICHE_RUS', },
	'fr': { name: 'Français', 		descrcol: 'CARATTERISTICHE_FRA', },
	'de': { name: 'Deutsch', 		descrcol: 'CARATTERISTICHE_GER', },
	'cn': { name: '中国的', 			descrcol: 'CARATTERISTICHE_ENG', },
//	'sa': { name: 'العربية', 		descrcol: '', },
	'pl': { name: 'Polski', 		descrcol: 'CARATTERISTICHE_POL', },
//	'hu': { name: 'Magyar', 		descrcol: 'CARATTERISTICHE_HUN', },
//	'cz': { name: 'Česky', 			descrcol: 'CARATTERISTICHE_CZE', },
	'hi': { name: 'Hindi', 			descrcol: 'CARATTERISTICHE_ENG', },
};

function changeLanguage(language) {
	console.log('CHANGE LANGUAGE: '+language+', supported='+typeof(SUPPORTED_LANGUAGES[language]));
	
	// Controlla se è supportato, se no default a "en"
	var supported = typeof(SUPPORTED_LANGUAGES[language]) != 'undefined';
	if (!supported) language = 'en';
	
	// Salva lingua
	window.localStorage.setItem('language', language);
	
	// Vai all'app
	var page;
	if (typeof(app) != 'undefined' && app.page) {
		// Sono nell'index o scelta linguaggio
		page = app.page;
	}
	else {
		// Sono nella home
		var tokens = window.location.href.split('\/');
		page = tokens[tokens.length-1].split('\?')[0];
	}
    document.location.href = page+'?'+language;
}


// Conversione unità di misura
var flow_rate = 1/0.1069;
var speed_rate = 1/0.62137;
var spacing_rate = 1/0.3937;
var bar2psi_rate = 14.5037738;
var lmin2galmin = 0.26;

function initHome() {
	console.log('initHome()');
	
	// Salva on change
	$$('#controlunits input').unbind().bind('change', function() {
		saveUnits();
	});
	
	// Avvio dell'app
	if (typeof(getUnits()) == 'undefined') {
		// Valore memorizzato
		var units = storage.getItem('unit');
		if (units == null) units = 'm';
		$$('#units-'+units).attr('checked', true).checkboxradio("refresh");
		
		// Trigger per cambiare le unità di misura all'avvio dell'app
		saveUnits();
	}
} // initHome

function getUnits() {
	return $('#home #controlunits input:checked').val();
} // getUnits

function saveUnits() {
	var units = getUnits();
	
	// Salva unità di misura
	storage.setItem('unit', units);
	
	// Modifica configuratore
	var flow = $('#configurator #flow');
	var speed = $('#configurator #speed');
//	var spacing = $('#configurator #spacing');
	var barlength = $('#configurator #barlength');
	var nozzlesnum = $('#configurator #nozzlesnum');
	var pressuremin = $('#configurator #pressure-min');
	var pressuremax = $('#configurator #pressure-max');
	var flowunits = $('#configurator #flow-units');
	var speedunits = $('#configurator #speed-units');
	var spacingunits = $('#configurator #spacing-units');
	var pressureunits = $('#configurator #pressure-units');
	if (units != 'us') {
		// Sistema metrico
		
		flow.attr('min', 0).attr('max', 2000).attr('step', 20).attr('value', 200).val(200);
		flowunits.text('l/ha');
		
		speed.attr('min', 1).attr('max', 30).attr('step', 0.5).attr('value', 6).val(6);
		speedunits.text('km/h');

//		spacing.attr('min', 0).attr('max', 200).attr('step', 10).attr('value', 50).val(50);
//		spacingunits.text('cm');
		
		barlength.attr('min', 2).attr('max', 50).attr('step', 0.5).attr('value', 10).val(10);
		nozzlesnum.attr('min', 2).attr('max', 100).attr('step', 2).attr('value', 20).val(20);
		spacingunits.text('m');
		
		pressuremin.attr('min', 0).attr('max', 20).attr('step', 0.1).attr('value', 2).val(2);
		pressuremax.attr('min', 0).attr('max', 20).attr('step', 0.1).attr('value', 5).val(5);
		pressureunits.text('bar');
	}
	else {
		// Sistema anglosassone
		
		// 1 l/ha = 0.1069 US GPA
		flow.attr('min', 0).attr('max', 210).attr('step', 7).attr('value', 21).val(21);
		flowunits.text('GPA');
		
		// 1 km/h = 0.62137 mph
		speed.attr('min', 1).attr('max', 20).attr('step', 0.5).attr('value', 4).val(4);
		speedunits.text('MPH');

		// 1 cm = 0.3937 inch
//		spacing.attr('min', 0).attr('max', 80).attr('step', 5).attr('value', 20).val(20);
		spacingunits.text('in');

		// 1 bar = 14.5038 PSI
		pressuremin.attr('min', 0).attr('max', 290).attr('step', 2).attr('value', 70).val(70);
		pressuremax.attr('min', 0).attr('max', 290).attr('step', 2).attr('value', 100).val(100);
		pressureunits.text('PSI');
	}
	
	// Refresh slider, solo se sono già stati inizializzati (i.e. ho aperto almeno una volta il configuratore)
	if (flow.hasClass('ui-slider-input')) {
		flow.slider('refresh');
		speed.slider('refresh');
//		spacing.slider('refresh');
		
		// Svuota lista
		$('#configurator #nozzles').html('');
		$('#configurator #nozzle-delivery').html('');
	}
	
	// Resetta configuratore
	curtype = null;
} // saveUnits


// Cambiare il numero di versione per fare DROP e CREATE e ripopolare le tabelle
var dbver = '27';

// Nome del file da importare
var sqlfile = './arag/db/arag_2_4.sql';

function initDB() {
	// Open database
	html5sql.openDatabase('it.mobimentum.aragnozzles', 'Arag Nozzles Database', 1*1024*1024);
	
	// Versione database
	var thisver = storage.getItem('dbver');
	
	console.log('initDB(): local='+thisver+", dbver="+dbver);

	// Controlla versione database
	var homewrapper = $('#home-wrapper'), dbimport = $('#db-import');
	if (thisver != dbver) {
		// Show loading
		homewrapper.hide();
		dbimport.show();

		// Import database CONFIGURATORE
		$.get(sqlfile, function(sql) {
			var startTime = new Date();
			html5sql.process(sql,
				function() {
					// OK
					console.log("Database created in: "+((new Date() - startTime))+"ms");
					
					// Crea tabelle helper - unità metriche
					var sql = 'SELECT CODICE, '
						+'MIN(FLOW) AS FLOW_MIN, MAX(FLOW) AS FLOW_MAX, '
						+'MIN(PRESSIONE) AS BAR_MIN, MAX(PRESSIONE) AS BAR_MAX '
						+'FROM configurator GROUP BY CODICE';
					
					html5sql.process([{ sql:sql, }],
						function(transaction, results) {
							// Create table
							var sql = 'DROP TABLE IF EXISTS "configurator_helper"; '
								+'CREATE TABLE "configurator_helper" ('
								+'"CODICE" varchar(255) NOT NULL,'
								+'"FLOW_MIN" decimal(10,2) DEFAULT 0,'
								+'"FLOW_MAX" decimal(10,2) DEFAULT 0,'
								+'"BAR_MIN" decimal(10,2) DEFAULT 0,'
								+'"BAR_MAX" decimal(10,2) DEFAULT 0);';
						
							// Insert data
							for (var i = 0; i < results.rows.length; i++) {
								var r = results.rows.item(i);
								sql += 'INSERT INTO "configurator_helper" '
									+'VALUES("'+r.CODICE+'", '+r.FLOW_MIN+', '+r.FLOW_MAX+', '+r.BAR_MIN+', '+r.BAR_MAX+');';
							}
							
							// Execute query
							var startTime = new Date();
							html5sql.process(sql,
								function() {
									// OK
									console.log("Helper tables (metric) created in: "+((new Date() - startTime))+"ms");
									
									// Crea tabelle helper - unità usa
									var sql = 'SELECT CODICE, '
										+'MIN(FLOW) AS FLOW_MIN, MAX(FLOW) AS FLOW_MAX, '
										+'MIN(PRESSIONE) AS PSI_MIN, MAX(PRESSIONE) AS PSI_MAX '
										+'FROM configurator_psi GROUP BY CODICE';
									
									html5sql.process([{ sql:sql, }],
										function(transaction, results) {
											// Create table
											var sql = 'DROP TABLE IF EXISTS "configurator_helper_psi"; '
												+'CREATE TABLE "configurator_helper_psi" ('
												+'"CODICE" varchar(255) NOT NULL,'
												+'"FLOW_MIN" decimal(10,2) DEFAULT 0,'
												+'"FLOW_MAX" decimal(10,2) DEFAULT 0,'
												+'"PSI_MIN" decimal(10,2) DEFAULT 0,'
												+'"PSI_MAX" decimal(10,2) DEFAULT 0);';
										
											// Insert data
											for (var i = 0; i < results.rows.length; i++) {
												var r = results.rows.item(i);
												sql += 'INSERT INTO "configurator_helper_psi" '
													+'VALUES("'+r.CODICE+'", '+r.FLOW_MIN+', '+r.FLOW_MAX+', '+r.PSI_MIN+', '+r.PSI_MAX+');';
											}
											
											// Execute query
											var startTime = new Date();
											html5sql.process(sql,
												function() {
													// OK
													console.log("Helper tables (psi) created in: "+((new Date() - startTime))+"ms");
													
													// Salva versione db
													storage.setItem('dbver', dbver);
													
													// Fine configuratore, sblocco tutto
													dbimport.hide();
													homewrapper.show();
												},
												function(error, failingQuery) {
													// Error!
													console.log("SQL Error: "+error.message+": "+failingQuery);
												}
											);
										},
										function(error, failingQuery) {
											// Error!
											console.log("SQL Error: "+error.message+": "+failingQuery);
										}
									);
								},
								function(error, failingQuery) {
									// Error!
									console.log("SQL Error: "+error.message+": "+failingQuery);
								}
							);
						}
					);
				},
				function(error, failingQuery) {
					// Error!
					console.log("SQL Error: "+error.message+": "+failingQuery);
				}
			);
		});
	}
	else {
		// Database ok!
		dbimport.hide();
		homewrapper.show();
	}
} // initDB


function initCatalog() {
	var loading = $$('#catalog-loading');
	var filterform = $$('.ui-listview-filter');
	var ul = $$('#products');

	// GA
	trackPage('/catalog');

	$('.nozzle-wrapper').hide();
	
	// Lazy load
	if (ul.find('li').size() == 0) {
		// Mostra caricamento
		loading.show();
		showLoading();
		
		setTimeout(function() {
		
		/**
		 * Lettura catalogo:
		 * 
		 * - entro nella tabella `codici` con il codice prodotto (es. SF11001)
		 * 
		 * - dalla tabella `codici` ottengo:
		 *   ID_FAMIGLIA = 1: famiglia a cui appartiene (es. SF11001 => SF)
		 *   ID_REF_IMMAGINE = 12: certo tutte le `immagini_assegnate` al prodotto
		 *   NOME_IMMAGINE = SF11001.jpg: foto grande
		 *   
		 * - con i NOME_IMMAGINE della tabella `immagini_assegnate` controllo in 
		 *   `immagini_classificazione` a quale sezione corrisponde l'immagine:
		 *   CARATTERISTICHE
		 *   DIMENSIONI
		 *   FOTO
		 *   UTILIZZO
		 */

		// Carica catalogo
		var sql = 'SELECT ID_FAMIGLIA, COUNT(*) as C FROM codici GROUP BY ID_FAMIGLIA';
		var data = [];
		html5sql.process([{ sql: sql, data: data, }],
			function(transaction, results) {
				// Elementi per categoria
				var count = {};
				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					count[row.ID_FAMIGLIA] = row.C;
				}

				var sql = 'SELECT c.*, f.DESCR_BREVE, h.ORDINE '
					+'FROM codici c INNER JOIN famiglie f ON c.ID_FAMIGLIA = f.ID_FAMIGLIA '
					+'INNER JOIN caratteristiche_famiglie h ON c.ID_FAMIGLIA = h.ID_FAMIGLIA '
					+'ORDER BY h.ORDINE, c.ID_FAMIGLIA, c.CODICE';
				var data = [];
				html5sql.process([{ sql: sql, data: data, }],
					function(transaction, results) {
						var html = '';
						
						var family = '';
						for (var i = 0; i < results.rows.length; i++) {
							var nozzle = results.rows.item(i);
							
							// Divider
							if (nozzle.DESCR_BREVE != family) {
								family = nozzle.DESCR_BREVE;
								html += '<li data-role="list-divider">'
										+'<span>'+nozzle.DESCR_BREVE+'</span>'
										+' <span class="ui-li-count">'+count[nozzle.ID_FAMIGLIA]+'</span>'
										+'</li>';
							}
							
							// Thumbnail
		//					var thumb = 'arag/images/drop.png';
							var thumb = 'arag/nozzles/'+nozzle.NOME_IMMAGINE;
							
							// Elemento del catalogo
							html += '<li>'
//								+'<a href="#nozzle" data-url="?cod='+nozzle.CODICE+'" nozzleid="'+nozzle.CODICE+'">'
								+'<a href="javascript:showNozzleFromCatalog(\''+nozzle.CODICE+'\')">'
								+'<img src="'+thumb+'" class="ui-li-icon ui-li-thumb" />'
								+' '+nozzle.CODICE+' '
								+'</a>'
								+'</li>';
						}
						
						// Aggiorna lista
						ul.html(html).listview('refresh').show().find('a').bind('tap', function() {
							// FIXME: Bug jQuery 1.8: non supporta i parametri nell'url!!!
							nozzleid = $(this).attr('nozzleid');
							nozzlepressure = null;
							nozzledelivery = null;
							nozzlespeed = null;
						});
					
						loading.hide();
						filterform.show();
						hideLoading();
					},
					function(error, statement){
						console.error("SQL Error: "+error.message+": "+statement);
						
						loading.hide();
						hideLoading();
					}
				);
			},
			function(error, statement){
				console.error("SQL Error: "+error.message+": "+statement);
				
				loading.hide();
				hideLoading();
			}
		);		

		}, 300); // setTimeout
	}
} // initCatalog

function showNozzleFromCatalog(cod) {
	// GA
	trackPage('/catalog/nozzle/'+cod);

	initNozzle(cod);
	if (!tablet) $.mobile.changePage('#nozzle');
}


// Storage locale (html5), usato per salvare le preferenze
var storage = null;

// Identifier of Android platform
var androidUA = false;

// Stringhe localizzate
var strings = {};

function init() {
//    document.addEventListener('deviceready', function() {
    	// User-agent
    	var ua = navigator.userAgent;
    	console.log('deviceready(): ua='+ua);
    	
    	// Init local storage
		storage = window.localStorage;

    	// Pulsante back (Android)
		if (ua.match(/Android/) && !ua.match(/ITL41F/)) {
			androidUA = true;
			document.addEventListener('backbutton', function() {
				// Esci solo su pagina principale
				var id = $.mobile.activePage.attr('id');
				if (id == 'home' || id == 'configurator' || id == 'catalog') {
					// Conferma uscita app
					navigator.notification.confirm("Do you really want to quit the app?", function(btn) {
						if (btn == 1) navigator.app.exitApp();
					}, 'Exit confirmation');
				}
				else {
					// Standard behavior
					history.back();
				}
			}, true);
		}
		
		// Router
		$.mobile.routerlite.pagechange('#home', function(page, path) {
			initHome();
		});
		$.mobile.routerlite.pagechange('#configurator', function(page, path) {
			initConfigurator();
		});
		$.mobile.routerlite.pagechange('#catalog', function(page, path) {
			initCatalog();
		});
//		$.mobile.routerlite.pagechange('#nozzle', function(page, path) {
//			var cod = getparam(page, 'cod');
//			initNozzle(cod ? cod : nozzleid);
//		});
		
		// Set language
    	var language = window.location.href.substring(window.location.href.indexOf('?')+1);
		console.log('LANGUAGE from url: '+language);
		initApp(language);
	    
//    }, true);
} // init

function exitApp() {
	// GA cleanup
	exitGA();
}

function initApp(language) {
	console.log('initApp(): language='+language);
	
	// Filtri avanzati, li inizializzo qui PRIMA della localizzazione
//	createSelect([
//	    { value: 'utilizzo_atomizzatore', l10n: 'f_atomizzatore' },
//	    { value: 'utilizzo_irrorazione', l10n: 'f_irrorazione' },
//	    { value: 'trattamento_spalla', l10n: 'cfg_knapsack' },
//	    ], '#advsearch1');
	createSelect([
  	    { value: 'materiale_ceramica', l10n: 'f_ceramica' },
  	    { value: 'materiale_plastica', l10n: 'f_plastica' },
  	    ], '#advsearch3');
	createSelect([
  	    { value: 'ugelli_ventaglio', l10n: 'f_ventaglio' },
  	    { value: 'ugelli_cono', l10n: 'f_cono' },
  	    { value: 'ugelli_specchio', l10n: 'f_specchio' },
  	    ], '#advsearch4');
//	createSelect([
//  	    { value: 'ugelli_antideriva', l10n: 'f_antideriva' },
//  	    ], '#advsearch5');

	// Localize!
	$('[data-localize]').localize('lang/arag', { language:language });
	strings = $.localize.data['lang/arag'];
	
	// Filter bar localization
	$('#products').attr('data-filter-placeholder', strings.cat_filter);
	
	// Init database
	initDB();
	
	// Init elenco lingue
	var html = '';
	for (lang in SUPPORTED_LANGUAGES) {
		var caption = SUPPORTED_LANGUAGES[lang].name;
		var sel = language == lang ? 'selected' : '';
		html += '<option value="'+lang+'" '+sel+'>'+caption+'</option>';
	}
	$('#select-lang').html(html).unbind().bind('change', function() {
		var language = $(this).val();
		changeLanguage(language);
	});

	// Check tablet size
	UI.checkSize();
	appTablet.initiate();

	// Pulsante back/panel
	var backbtn = '<a data-role="button" data-rel="back" data-icon="back" data-iconpos="left" data-localize="app_back" class="tablet-hidden">Back</a>';
	var panelbtn = '<a data-role="button" data-icon="grid" data-iconpos="notext" href="##PANEL#" class="phone-hidden"></a>';
	$('.back-panel-btn').each(function() {
		var el = $(this);
		var panelbtnhtml = el.attr('data-panel') ? panelbtn.replace('#PANEL#', el.attr('data-panel')) : '';
		var backbtnhtml = el.attr('data-back') ? backbtn : '';
		el.replaceWith(tablet ? panelbtnhtml : backbtnhtml);
	});
	
	// Init first page (home)
	$.mobile.changePage('#home');
	
} // initApp

/**
 * Helper per creazione filtri avanzati
 */
function createSelect(opts, el) {
	var select = $(el);
	
	var html = '';
	for (i in opts) {
		var opt = opts[i];
		html += '<option selected value="'+opt.value+'" data-localize="'+opt.l10n+'"></option>';
	}
	select.html(html);
	
	// Controlla se ho cambiato lingua dopo aver già inizializzato il select
	if (configuratorPageShown) select.selectmenu('refresh', true);
} // createSelect
var configuratorPageShown = false;

function getparam(page, name) {
	var url = $(page).attr('data-url');
	var v = decodeURI((RegExp(name+'='+'(.+?)(&|$)').exec(url)||[,null])[1]);
  
	return v == 'null' ? null : v;
} // getparam

/**
 * Shortcut per selettore jQuery "locale" alla pagina.
 */
function $$(sel) {
	return $(sel, $.mobile.activePage);
}

$.blockUI.defaults.css = {};
function showLoading() {
	$('div[data-role="page"]').block({
		message:'<img src="arag/images/ajax-loader.gif" />',
		overlayCSS:{ opacity:0.55 }
	});
} // showLoading

function hideLoading() {
	$('div[data-role="page"]').unblock();
} // hideLoading


// Generated by CoffeeScript 1.3.3
(function() {
  var $, normaliseLang;

  $ = jQuery;

  normaliseLang = function(lang) {
    lang = lang.replace(/_/, '-').toLowerCase();
    if (lang.length > 3) {
      lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
    }
    return lang;
  };

  $.defaultLanguage = normaliseLang(navigator.language || navigator.userLanguage);

  $.localize = function(pkg, options) {
    var defaultCallback, fileExtension, intermediateLangData, jsonCall, lang, loadLanguage, localizeElement, localizeForSpecialKeys, localizeImageElement, localizeInputElement, localizeOptgroupElement, notifyDelegateLanguageLoaded, regexify, setAttrFromValueForKey, setTextFromValueForKey, valueForKey, wrappedSet;
    if (options == null) {
      options = {};
    }
    wrappedSet = this;
    intermediateLangData = {};
    fileExtension = options.fileExtension || "json";
    loadLanguage = function(pkg, lang, level) {
      var file;
      if (level == null) {
        level = 1;
      }
      switch (level) {
        case 1:
          intermediateLangData = {};
          if (options.loadBase) {
            file = pkg + ("." + fileExtension);
            return jsonCall(file, pkg, lang, level);
          } else {
            return loadLanguage(pkg, lang, 2);
          }
          break;
        case 2:
          if (lang.length >= 2) {
            file = "" + pkg + "-" + (lang.substring(0, 2)) + "." + fileExtension;
            return jsonCall(file, pkg, lang, level);
          }
          break;
        case 3:
          if (lang.length >= 5) {
            file = "" + pkg + "-" + (lang.substring(0, 5)) + "." + fileExtension;
            return jsonCall(file, pkg, lang, level);
          }
      }
    };
    jsonCall = function(file, pkg, lang, level) {
      var ajaxOptions, successFunc;
      if (options.pathPrefix != null) {
        file = "" + options.pathPrefix + "/" + file;
      }
      successFunc = function(d) {
        $.extend(intermediateLangData, d);
        notifyDelegateLanguageLoaded(intermediateLangData);
        return loadLanguage(pkg, lang, level + 1);
      };
      ajaxOptions = {
        url: file,
        dataType: "json",
        async: false,
        timeout: options.timeout != null ? options.timeout : 500,
        success: successFunc
      };
      if (window.location.protocol === "file:") {
        ajaxOptions.error = function(xhr) {
          return successFunc($.parseJSON(xhr.responseText));
        };
      }
      return $.ajax(ajaxOptions);
    };
    notifyDelegateLanguageLoaded = function(data) {
      if (options.callback != null) {
        return options.callback(data, defaultCallback);
      } else {
        return defaultCallback(data);
      }
    };
    defaultCallback = function(data) {
      $.localize.data[pkg] = data;
      return wrappedSet.each(function() {
        var elem, key, value;
        elem = $(this);
        key = elem.data("localize");
        key || (key = elem.attr("rel").match(/localize\[(.*?)\]/)[1]);
        value = valueForKey(key, data);
        return localizeElement(elem, key, value);
      });
    };
    localizeElement = function(elem, key, value) {
      if (elem.is('input')) {
        localizeInputElement(elem, key, value);
      } else if (elem.is('img')) {
        localizeImageElement(elem, key, value);
      } else if (elem.is('optgroup')) {
        localizeOptgroupElement(elem, key, value);
      } else if (!$.isPlainObject(value)) {
        elem.html(value);
      }
      if ($.isPlainObject(value)) {
        return localizeForSpecialKeys(elem, value);
      }
    };
    localizeInputElement = function(elem, key, value) {
      if (elem.is("[placeholder]")) {
        return elem.attr("placeholder", value);
      } else {
        return elem.val(value);
      }
    };
    localizeForSpecialKeys = function(elem, value) {
      setAttrFromValueForKey(elem, "title", value);
      return setTextFromValueForKey(elem, "text", value);
    };
    localizeOptgroupElement = function(elem, key, value) {
      return elem.attr("label", value);
    };
    localizeImageElement = function(elem, key, value) {
      setAttrFromValueForKey(elem, "alt", value);
      return setAttrFromValueForKey(elem, "src", value);
    };
    valueForKey = function(key, data) {
      var keys, value, _i, _len;
      keys = key.split(/\./);
      value = data;
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        value = value != null ? value[key] : null;
      }
      return value;
    };
    setAttrFromValueForKey = function(elem, key, value) {
      value = valueForKey(key, value);
      if (value != null) {
        return elem.attr(key, value);
      }
    };
    setTextFromValueForKey = function(elem, key, value) {
      value = valueForKey(key, value);
      if (value != null) {
        return elem.text(value);
      }
    };
    regexify = function(string_or_regex_or_array) {
      var thing;
      if (typeof string_or_regex_or_array === "string") {
        return "^" + string_or_regex_or_array + "$";
      } else if (string_or_regex_or_array.length != null) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = string_or_regex_or_array.length; _i < _len; _i++) {
            thing = string_or_regex_or_array[_i];
            _results.push(regexify(thing));
          }
          return _results;
        })()).join("|");
      } else {
        return string_or_regex_or_array;
      }
    };
    lang = normaliseLang(options.language ? options.language : $.defaultLanguage);
    if (!(options.skipLanguage && lang.match(regexify(options.skipLanguage)))) {
      loadLanguage(pkg, lang, 1);
    }
    return wrappedSet;
  };

  $.fn.localize = $.localize;

  $.localize.data = {};

}).call(this);

