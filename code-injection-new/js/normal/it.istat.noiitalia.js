




    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // Empty
    }
    
    function togliMaschera(){
    	dojo.style("maschera", 'zIndex', 1);
    }
	
    function inserisciMaschera(){
    	dojo.style("maschera", 'zIndex', 100);
    }
	
	function showNoticeToast(msg) {
		inserisciMaschera();
	        $().toastmessage('showToast', {
	             text     : msg,
	             sticky   : true,
	             position : 'middle-center',
	             type     : 'notice',
	             closeText: '',
	             close    : function () {togliMaschera();}
	             
	        });
	    }
 
    


		dojoConfig = {
			baseUrl : "js/",
			parseOnLoad : false,
			tlmSiblingOfDojo : false,
			packages : [ {
				name : "dojo",
				location : "lib/dojo"
			}, {
				name : "dijit",
				location : "lib/dijit"
			}, {
				name : "dojox",
				location : "lib/dojox"
			}, {
				name : "noiitalia",
				location : "noiitalia"
			} ]
		};
	


		require(
				[ "dojo/ready", "noiitalia/graficiIpad", "noiitalia/tabellaValori",  "noiitalia/generaleIpad", "dojo/on",
						"dijit/registry", "dojo/data/ItemFileReadStore",
						"dojo/parser", "dojo/dom", "dojox/gesture/tap", 
						"dojo/_base/array", "dojo/query", "dojo/dom-construct",
						"dojox/widget/Standby",
						"dojox/mobile/RoundRectDataList",
						"dojox/mobile", 
						"dojox/mobile/Accordion", 
						"dojox/mobile/ScrollableView",						
						"dojox/mobile/SwapView", "dojox/mobile/PageIndicator",
						"dijit/_base/manager", 
						"dojo/dom-class", "dojo/dom-prop",						
						"dojox/mobile/ContentPane"],
						
				function(ready, graficiIpad, tabellaValori, generaleIpad, on, registry, ItemFileReadStore, parser, dom, tap, array, query, domConstruct, Standby) {
				
    				//Leggo  il file del menu
					var menuStore = new ItemFileReadStore({
						url : "js/noiitalia/menu.json"
					});	
					
					var buildMenu = function(selezione)  {
						
						//rimuovo la vecchia e aggiungo la nuova immagine di sottosezione
						domConstruct.destroy("spank");
						
						
						//prima cosa : svuotare la vecchia lista_sottosezioni
						domConstruct.empty("lista_sottosezioni");
						
						//Fetch del menu; nel metodo onItem stabilisco se l'elemento appartiene o meno alla sezione cliccata						
						menuStore.fetch({
							//query:{ sezId : selezione  OR indicatore : "S" + selezione + "*" }, 
							onItem : function(item, request) {
								
								     if (item.type == "sezione" && item.sezId[0] == selezione)  {
							              var img = domConstruct.toDom("<div id='spank' class='listacolor' style='line-height:2.7em; position:relative; top:4px;'><img id='img_sezione' src='images/ico/" + selezione + ".png' hspace='6px'  style='vertical-align:-2px;'>" + item.nomeSez + "</div>");
						                      domConstruct.place(img, "lista_sottosezioni", "before");
							         }
							        
								    //considero l'item solo se ƒç una sottosezione della sezione selezionata
								    if (item.type == "sottosezione" && item.indicatore[0].substr(1,2) == selezione)  {
								       
								     console.log("[NOIITALIA]" + item.label);
								     var list_item = new dojox.mobile.ListItem({									
									      label: item.label,
									      moveTo: "dataView"								    
								     });								
								    	
									 domConstruct.place(list_item.domNode, "lista_sottosezioni");	
									 
									 //event handler
									 on(list_item, tap, function(evt) {	
									    
									     //cancello il contenuto del div dati, prima di caricare il nuovo contenuto
										 domConstruct.empty("contenutoGrafici");		
										 //cancello anche la sezione del titolo,se gi≈ï esiste
										 var titolo = dom.byId("titoloGrafico");
					                     if (titolo) 
							               domConstruct.empty("titoloGrafico");
										 
										 if	 (item.box == "y") {									 
											contenutoInfoBox = item.boxContent;
										    titolo = item.titolo + "<a id='infoBox' href='javascript:showNoticeToast(\""+contenutoInfoBox+"\")'><img src='images/infox.png' style='margin-left: 5px; margin-top: 4px;'/></a>";
										 } else {
										   titolo = item.titolo;
										   contenutoInfoBox = "";
										 }
										 
										 //metto in standby la dataView
					                     standby.show();
										 
										 generaleIpad.load_data(item.indicatore, item.tipologiaGrafico, item.label, titolo, contenutoInfoBox);
										 registry.byId("sottosezioneView").performTransition("dataView",1,"slide");
										 
										 //mostro la view
										 standby.hide();
									  });									  
									 
									 list_item.startup();
									  
							        } 
							     							     
							},
							onComplete : function() {
								registry.byId("lista_sottosezioni").startup();
								domConstruct.place("lista_sottosezioni", "spank", "after");		
							}
						});

					 }
										
					ready(function() {
					
					  standby = new Standby({target: 'foo', color:'lightgray', image:'images/ajax.gif'});
                      document.body.appendChild(standby.domNode);
					  standby.startup();
						
					  dojo.query("#sezioni li").forEach(function(node, index, nodelist){
						    on(node, tap, function(evt) {							    	
						    	selezione = (index<9 ? "0"+(index+1) : ""+(index+1));
						    	console.log("[NOIITALIA] Scheda selezionata: " + selezione);
						    	buildMenu(selezione);
							 });
						});
							
						ready(generaleIpad.init);
						
						parser.parse();

    				    document.body.addEventListener('touchmove', function(e) {
                               e.preventDefault();
                        }, false);  						
						
					});
					
				});
	







    function togliMaschera(){
    	dojo.style("maschera", 'zIndex', 1);
    }
	
    function inserisciMaschera(){
    	dojo.style("maschera", 'zIndex', 100);
    }
    
    function apriChiudiACCORDION(ID){
    	if (dojo.style(ID,"display") == "none"){
     		dojo.fx.wipeIn({ node: dojo.byId(ID)}).play();
     		dojo.byId("BUTTON"+ID).innerHTML="<img src='images/ico/meno.png'/>";
     	}
    	else{
     		dojo.fx.wipeOut({node: dojo.byId(ID)}).play();
    		dojo.byId("BUTTON"+ID).innerHTML="<img src='images/ico/piu.png'/>";
    	}
    }
    
	
	function showNoticeToast(msg) {
		inserisciMaschera();
		    $().toastmessage('showToast', {
	             text     : msg[0],
	             sticky   : true,
	             position : 'middle-center',
	             type     : 'notice',
	             closeText: '',
	             close    : function () {
	             						togliMaschera();
	             						}
	             
	        });
	    }
 
    


		dojoConfig = {
			baseUrl : "js/",
			parseOnLoad : false,
			tlmSiblingOfDojo : false,
			packages : [ {
				name : "dojo",
				location : "lib/dojo"
			}, {
				name : "dijit",
				location : "lib/dijit"
			}, {
				name : "dojox",
				location : "lib/dojox"
			}, {
				name : "noiitalia",
				location : "noiitalia"
			} ]
		};
	


		require(
				[ "dojo/ready", "noiitalia/grafici", "noiitalia/generale", "noiitalia/tabellaValori", "dojo/on",
						"dijit/registry", "dojo/data/ItemFileReadStore",
						"dojo/parser", "dojo/dom", "dojox/gesture/tap", 
						"dojo/_base/array", "dojo/query", "dojo/dom-construct",
						"dojox/widget/Standby",
						"dojox/mobile/RoundRectDataList",
						"dojox/mobile", 
						"dojox/mobile/Accordion", 
						"dojox/mobile/ScrollableView",						
						"dojox/mobile/SwapView", "dojox/mobile/PageIndicator",
						"dijit/_base/manager", 
						"dojo/dom-class", "dojo/dom-prop",						
						"dojox/mobile/ContentPane"],
						
				function(ready, grafici, generale, tabellaValori, on, registry, ItemFileReadStore, parser, dom, tap, array, query, domConstruct, Standby) {
				
    				//Leggo  il file del menu
					var menuStore = new ItemFileReadStore({
						url : "js/noiitalia/menu.json"
					});	
					
					var buildMenu = function(selezione)  {
						
						//rimuovo la vecchia e aggiungo la nuova immagine di sottosezione
						domConstruct.destroy("spank");
						
						
						//prima cosa : svuotare la vecchia lista_sottosezioni
						domConstruct.empty("lista_sottosezioni");
						
						//Fetch del menu; nel metodo onItem stabilisco se l'elemento appartiene o meno alla sezione cliccata						
						menuStore.fetch({
							//query:{ sezId : selezione  OR indicatore : "S" + selezione + "*" }, 
							onItem : function(item, request) {
								
								     if (item.type == "sezione" && item.sezId[0] == selezione)  {
							              var img = domConstruct.toDom("<div id='spank' class='listacolor' style='line-height:2.7em; position:relative; top:4px;'><img id='img_sezione' src='images/ico/" + selezione + ".png' hspace='6px'  style='vertical-align:-2px;'>" + item.nomeSez + "</div>");
						                      domConstruct.place(img, "lista_sottosezioni", "before");
							         }
							        
								    //considero l'item solo se ƒç una sottosezione della sezione selezionata
								    if (item.type == "sottosezione" && item.indicatore[0].substr(1,2) == selezione)  {
								       
								     console.log("[NOIITALIA]" + item.label);
								     var list_item = new dojox.mobile.ListItem({									
									      label: item.label,
									      moveTo: "dataView"								    
								     });								
								    	
									 domConstruct.place(list_item.domNode, "lista_sottosezioni");	
									 
									 //event handler
									 on(list_item, tap, function(evt) {	
									 	 // riporto la dataView in alto
									     var scrollDataView = registry.byId("dataView");
										 scrollDataView.scrollTo({x:0 ,y: 0});
									     //cancello il contenuto del div dati, prima di caricare il nuovo contenuto
										 domConstruct.empty("contenutoGrafici");		
										 //cancello anche la sezione del titolo,se gi≈ï esiste
										 var titolo = dom.byId("titoloGrafico");
					                     if (titolo) 
							               domConstruct.empty("titoloGrafico");
										 
										 if	 (item.box == "y") {	
										   var infobox = dojo.byId("infobox");
											dojo.style(infobox, "display", "");
											contenutoInfoBox = item.boxContent;	
										    titolo = item.titolo;  
																					
										 } else {
											dojo.style(dojo.byId("infobox"), "display", "none");
										    titolo = item.titolo;
										    contenutoInfoBox = "";
										 }
										 	 
										 //metto in standby la dataView
					                     standby.show();
										 
										 generale.load_data(item.indicatore, item.tipologiaGrafico, item.label, titolo, contenutoInfoBox);
										 registry.byId("sottosezioneView").performTransition("dataView",1,"slide");
										 
										 //mostro la view
										 standby.hide();
										 
										

									  });									  
									 
									 list_item.startup();
							        } 
							     							     
							},
							onComplete : function() {
							
								registry.byId("lista_sottosezioni").startup();
								domConstruct.place("lista_sottosezioni", "spank", "after");		 
							}
						});

					 }
										
					ready(function() {					
					
					  standby = new Standby({target: 'foo', color:'lightgray', image:'images/ajax.gif'});
                      document.body.appendChild(standby.domNode);
					  standby.startup();

				// EVENTI PER APRIRE E CHIUDERE L'ACCORDION
						var sguardodinsieme = dojo.byId("sguardodinsieme")
						dojo.connect(sguardodinsieme, tap, function(evt){
							apriChiudiACCORDION("sguardodinsiemeITEM");
						});
						var definizioni = dojo.byId("definizioni")
						dojo.connect(definizioni, tap, function(evt){
							apriChiudiACCORDION("definizioniITEM");
						});			
						var regioni = dojo.byId("regioni")
						dojo.connect(regioni, tap, function(evt){
							apriChiudiACCORDION("regioniITEM");
						});						

				// EVENTO PER APRIRE IL BOXCONTENT
						var infobox = dojo.byId("infobox");
						on(infobox, tap, function(evt){
							showNoticeToast(contenutoInfoBox);
						});	
							 							
					  dojo.query("#sezioni li").forEach(function(node, index, nodelist){
						    on(node, tap, function(evt) {							    	
						    	selezione = (index<9 ? "0"+(index+1) : ""+(index+1));
						    	console.log("[NOIITALIA] Scheda selezionata: " + selezione);
						    	buildMenu(selezione);
							 });
						});
							
						//generale.init;
						
						parser.parse();

						document.body.addEventListener('touchmove', function(e) {
                              e.preventDefault();
                       }, false);  
						
        // Wait for Cordova to load
    //
 	document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the back button
    //
    function onBackKeyDown() {
    	var accordion = registry.byId("accordion");
        if(registry.byId("dataView").isVisible())
			registry.byId("dataView").performTransition("sottosezioneView",-1,'slide');	
        else if(registry.byId("sottosezioneView").isVisible())
			registry.byId("sottosezioneView").performTransition("homeView",-1,'slide');
        else
			navigator.app.exitApp();
    }

    
					});
					
				});
	


document.write("Giunto alla quinta edizione, <b>&#34;Noi Italia. 100 statistiche per capire il Paese in cui viviamo&#34;</b> offre un'ampia e articolata produzione di indicatori aggiornati e puntuali, che riguardano aspetti economici, sociali, demografici e ambientali del nostro Paese, permettendo di focalizzare la nostra collocazione nel contesto europeo e individuare le differenze regionali che caratterizzano il Paese.");
document.write("Noi Italia &egrave; stato progettato per consentire non solo agli esperti, ma a tutti i cittadini una migliore comprensione dell'evoluzione dei fenomeni di maggiore attualit&agrave;.");
document.write("<br>&nbsp;<br>");
document.write("Gli indicatori, raccolti in <b>19 settori</b> per un totale di <b>118 schede</b>, si possono consultare in modo interattivo attraverso innovativi strumenti di visualizzazione grafica dei dati statistici; &egrave; possibile, inoltre, scaricare i dati su un foglio elettronico, approfondirne i diversi aspetti grazie ai link presenti in ogni pagina.  Inoltre quest'anno saranno messi a disposizione degli utenti ulteriori formati di consultazione in forma digitale, come e-pub e App per smartphone.");
document.write("<br>&nbsp;<br>");

// Testo ingelese
document.write("<b>&#34;Noi Italia. 100 statistics to understand the country we live in&#34;</b> has reached its fifth edition. It provides users with a wide range of updated and accurate indicators ranging from economic to social, demographic and environmental aspects, thus enabling users to understand the role of Italy within Europe and the territorial differences which characterise it.");
document.write("<br>&nbsp;<br>");
document.write("Noi Italia is designed to allow not only stakeholders but also common users to better understand the evolution of the most current issues.");
document.write("Indicators are classified in <b>118 factsheets</b> and cover <b>19 areas</b> of interest: they can be looked up in an interactive way through innovative visualisation tools. Moreover, indicators are downloadable on spreadsheets and can be studied in details through links available on each page. Starting from this year,  additional browsing tools will be available to users: ePubs and Apps for smartphones.");
document.write("<br>&nbsp;<br>");

afterEach(function() {
    document.getElementById('stage').innerHTML = '';
});

var helper = {
    trigger: function(obj, name) {
        var e = document.createEvent('Event');
        e.initEvent(name, true, true);
        obj.dispatchEvent(e);
    }
};


describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'deviceready');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.deviceready.calls.length > 0);
            }, 'deviceready should be called once', 500);

            runs(function() {
                expect(app.deviceready).toHaveBeenCalled();
            });
        });
    });

    describe('deviceready', function() {
        it('should report that it fired', function() {
            spyOn(app, 'report');
            app.deviceready();
            expect(app.report).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('report', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="status pending">Pending</p>',
                            '    <p class="status complete hide">Complete</p>',
                            '</div>'].join('\n');
        });

        it('should show the completion state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .complete:not(.hide)');
            expect(el).toBeTruthy();
        });

        it('should hide the pending state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .pending.hide');
            expect(el).toBeTruthy();
        });
    });
});


isLoaded = true;


	// <!--
	var noInit = false;
		
	function init(){
		if(noInit){ return; }
		var hasParentDojo = false;
		try{
			hasParentDojo = window.parent != window && window.parent["dojo"];
		}catch(e){
			alert("Initializing iframe_history.html failed. If you are using a cross-domain Dojo build,"
				+ " please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"
				+ " to the path on your domain to iframe_history.html");
			throw e;
		}

		if(hasParentDojo){
			//Set the page title so IE history shows up with a somewhat correct name.
			document.title = window.parent.document.title;
			
			//Notify parent that we are loaded.
			var pdj = window.parent.dojo;
			if(pdj["back"]){
				pdj.back._iframeLoaded(null, window.location);
			}
		}

	}
	// -->
	











define(
		[ "dojo/ready", "dojo/on", "dojo/dom", "dojo/dom-prop",
				"dojo/dom-construct",  "dijit/registry", "dojo/fx",
				"dojo/_base/fx", "dojo/dom-style",
				"dojo/parser", "dojo/query", "dojox/gesture/tap",
				"dojox/mobile/SimpleDialog","dojox/mobile/Button",
				"dojo/dom-geometry", "dojox/grid/DataGrid",
				"dojox/mobile/Pane", "dojox/data/CsvStore",
				"dojo/store/DataStore", "dojo/store/Memory", "dojo/data/ObjectStore",
				"dojox/mobile/SwapView", "dojo/window",
				"dojox/mobile/PageIndicator", "dojox/mobile", "dojo/dom-class"
				 ],

		function(ready, on, dom, domProp, domConstruct, registry, 
				fx, baseFx, style ,parser, query,  tap, SimpleDialog,
				Button, geometry, DataGrid, Pane, 
				CsvStore, DataStore, Memory, ObjectStore, 
				SwapView, win) {	
			
			var t;	 
			var colori =  new Array(
			{hex: "#C50149;"},	{hex: "#27A22D;"},	{hex: "#9F7F66;"}, 	{hex: "#006EAB;"},	{hex: "#EE820F;"},
			{hex: "#437A1C;"}, 	{hex: "#515BA1;"},	{hex: "#814A0A;"},	{hex: "#E31C18;"},	{hex: "#009EC5;"},
			{hex: "#D15E9B;"},	{hex: "#1E2983;"},	{hex: "#7CB955;"},	{hex: "#61A4D3;"},	{hex: "#AB0232;"},
			{hex: "#F29400;"}, 	{hex: "#99A49C;"},	{hex: "#9F4590;"},	{hex: "#694994;"} 	 );
			
		   	// ******************************************************************************************************
	   		// ******************************************************************************************************
    		//  Funzione che formatta un numero per la sua visualizzazione nel datagrid
     	    // ******************************************************************************************************
	    	// ******************************************************************************************************
			function number_format(numero, decimali) {
				var num2 = numero.toString().split('.');
				var decimals = (num2[1]) ? ','+num2[1] : (decimali? ',0' : '');
				var thousands;
				if (parseFloat(numero)>=0) {
				  thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join('.');
				  return thousands.split('').reverse().join('')+decimals;	
				} else {
				  thousands = (num2[0].substr(1)).split('').reverse().join('').match(/.{1,3}/g).join('.');
			      return "-"+thousands.split('').reverse().join('')+decimals;
				} 
						    
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che formatta i valori usando la funzione number_format definita sopra
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatVal(val, decimali){
				if (val) {
				    string = number_format(val, decimali);
				} else {
					string = " "
				}
				  
		        return string;
		    }	
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che calcola la dimensione dell'istogramma per il dato valore
     		// ******************************************************************************************************
			// ******************************************************************************************************
			function elabora(valore, max, min) {	
			 	 // Get the viewport-size of the document:
				var vs = win.getBox();			    
				var cellWidth = vs.w * 0.30; //destiniamo al grafico il 35% del display
				
				var geom = {}; //creo un oggetto che conterr‡ posizione relativa e dimensione del DIV
					
			    var valore_float = parseFloat(valore); //trasformo il valore in un numero
				var valore_ass = Math.abs(valore_float); //valore assoluto
					
				if (max >=0) {
					 if (min>0)  {
						 geom.padding = 0;
					  }  
					  if (min<=0) {
						var val_min_assoluto = Math.abs(min);  
						//devo considerare anche il valore assoluto del minimo, per capire quanto si estendono gli istogrammi
						max+=val_min_assoluto;
						geom.padding = val_min_assoluto*cellWidth/max;
						if (valore_float<0)  {
						  geom.padding-= (valore_ass*cellWidth/max); //porto 'indietro' gli istogrammi dei valori negativi 
						}
					  }
				} else {
						 //caso in cui il massimo Ë negativo : il valore assoluto del minimo sar‡ il 'massimo'
					     var valore_max_assoluto = Math.abs(min);   
						 //faccio partire gli istogrammi da dx, a tornar indietro
					     geom.padding = cellWidth - (valore_ass*cellWidth)/valore_max_assoluto;		                        					 
				}  
					  
				geom.dimensione =  (valore_ass * cellWidth)/Math.abs(max);	   				            		
				return geom;					
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che genera l'istogramma per il valore passato, in relazione al massimo e al minimo dei valori 
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatGraph(val, max, min, colore){			
				if(!val){
		            return "";
		        }
				var geom = elabora(val, max, min);				
				var string = "<div style='position:relative;left:" + geom.padding + "px;width:" + geom.dimensione + "px;background:" + colore.hex + ";height:8px;'></div>";
		     	return string;
		    }
			
			/* ******************************************************************************************************
			 *  RGB usati per gli istogrammi 
			*  ******************************************************************************************************/
			function getColore(indice) {				
				
				return colori[indice];
					
			}
			
			/* ******************************************************************************************************
			 *  CREA GRAFICI SORTATI
			*  ******************************************************************************************************/
			function creaGraficiSortati(a,b,c,d,e) {				
								domConstruct.create("div",
	                                     {id:"grafico_" + scelta,
										  style:"min-height:"+testHeight+";width:100%",
										  }, "SwapView_" + scelta);
					
			}
			
			function chiamata(){
				alert("QUI ");
				
			}

			/* ******************************************************************************************************
			 *  SORT Tabella
			*  ******************************************************************************************************/
			function sortTabella(indiceT,COLONNA) {	
					var appo;
					console.log("DENTRO sortTabella "+t[indiceT].ordinamento);
				if (t[indiceT].ordinamento=="DISCENDENTE"){
					t[indiceT].ordinamento="ASCENDENTE";
					for (var i=0;i<t[indiceT].tabellaValori.length-1;i++){
						for (var j=i+1;j<t[indiceT].tabellaValori.length;j++){
							if (t[indiceT].tabellaValori[i][COLONNA]<t[indiceT].tabellaValori[j][COLONNA]){
								for (var k=0;k<=2;k++){
									appo=t[indiceT].tabellaValori[i][k];
									t[indiceT].tabellaValori[i][k]=t[indiceT].tabellaValori[j][k];
									t[indiceT].tabellaValori[j][k]=appo;
								}
							}
					}
					}
				}
				else{
					t[indiceT].ordinamento="DISCENDENTE";
					for (var i=0;i<t[indiceT].tabellaValori.length-1;i++)
						for (var j=i+1;j<t[indiceT].tabellaValori.length;j++){
							if (t[indiceT].tabellaValori[i][COLONNA]>t[indiceT].tabellaValori[j][COLONNA])
								for (var k=0;k<=2;k++){
									appo=t[indiceT].tabellaValori[i][k];
									t[indiceT].tabellaValori[i][k]=t[indiceT].tabellaValori[j][k];
									t[indiceT].tabellaValori[j][k]=appo;
							}
					}
				}				
				//console.log(t);
				var tabella="<table width='100%' class='tabellabella' cellspacing=0 cellpadding=4 id='datagrid_"+t[indiceT].anno+"'>";
				
				tabella+="<thead><tr >";
				tabella+="<th id='THID0_"+t[indiceT].anno+"' align=left>"+t[indiceT].regione+"<img src='images/ico/sugiu2.png' border=0></th>";
				tabella+="<th id='THID1_"+t[indiceT].anno+"' align=right><img src='images/ico/sugiu2.png' border=0 >"+t[indiceT].anno+"</th>";
				tabella+="<th align=left id='THID2_"+t[indiceT].anno+"'><img src='images/ico/sugiu2.png'  border=0>&nbsp;</th>";
				tabella+="</tr></thead>";
									
				for (var k=0;k<t[indiceT].tabellaValori.length;k++){
					if (k % 2 == 0)
						bg="#ffffff";
					else
						bg="#eeeeee";
					tabella+="<tbody><tr style='background:"+bg+";'>";
					tabella+="<td>"+t[indiceT].tabellaValori[k][0]+"</td>";
					tabella+="<td align=right>"+formatVal(t[indiceT].tabellaValori[k][1],t[indiceT].decimali)+"</td>";
					tabella+="<td>"+formatGraph(t[indiceT].tabellaValori[k][2],t[indiceT].valoreMax,t[indiceT].valoreMin,t[indiceT].colore)+"</td>";
					tabella+="</tr></tbody>";
				}
				tabella+="</table>";
				//alert("QUI");
				

				dojo.byId("grafico_"+t[indiceT].anno).innerHTML=tabella;
				
				var thID0 = dom.byId("THID0_"+t[indiceT].anno);
				var thID1 = dom.byId("THID1_"+t[indiceT].anno);
				var thID2 = dom.byId("THID2_"+t[indiceT].anno);
				
				on(thID0, tap, function(){
					sortTabella(indiceT,0);
					})
					
				on(thID1, tap, function(){
					sortTabella(indiceT,1);
					})
					
				on(thID2, tap, function(){
					sortTabella(indiceT,2);
					})
			}
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////
			return {

				// ******************************************************************************************************
				// ******************************************************************************************************
				// Funzione che crea le swapViews dei grafici
				// ******************************************************************************************************
				// ******************************************************************************************************
				creaGrafici : function(tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox) {
					var sezione = indicatore[0].substr(1,2);
					var scheda = indicatore[0].substr(4,2);
					var colore = getColore(parseFloat(sezione)-1); 
					t=new Array();	 
					
					console.log("[NOIITALIA-grafici] Accesso al file dati : " + indicatore + " chiave : " + tipologiaGrafico);
					
					var csvStore = new dojox.data.CsvStore({
						identifier: tipologiaGrafico,
						url : "dati/S" + sezione + "/I" + scheda + "/" + indicatore + ".csv",
						separator : ";"
					});							
										
					csvStore.fetch({
						
					   onError : function (err) {							
							// distruggo il vecchio contenuto del div grafici e lo ricreo
						    domConstruct.empty("contenutoGrafici");					   
					    },
					
					   onComplete : function(items, arg) {	

						   
						     var valoreMax;
						     var valoreMin;
						     var valoreDecimali;
						     var valoreColore;
						     var indiceT=-1;

						     var anni = csvStore.getAttributes(items[0]);
						     console.log(anni);						     
						    
							var titolo = dom.byId("titoloGrafico");

					        if (titolo) {
							  domConstruct.empty("titoloGrafico");
							  dom.byId("titoloGrafico").innerHTML="&nbsp;" +titolo_grafico;							  
							} 
							
						    var massimi = new Array(), minimi = new Array(), decimali = new Array();
							//calcola max e min per anno		
							//calcola anche la necessit‡ di aggiungere decimali ai numeri interi (nel caso ci siano dati decimali nella serie)
							for(var i = 1; i < anni.length; i++) {	
							
                             app = new Array();						     
							 
						    								
							 decimaliSN = false;
							 for (var j = 1; j <= items.length; j++) {
							    	//valore regione per l'anno
							    	valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));
							    	if (valore) { 
									   app.push(valore);  //considero il valore solo se != NaN
									   decimaliSN = decimaliSN || (valore%1)!=0; // se ho almeno un valore decimale, lo segnalo nella var. booleana
									} 
							 }
							 //calcolo massimi e minimi dal vettore di appoggio
							 massimi[i-1] = Math.max.apply(null, app);
							 minimi[i-1] = Math.min.apply(null, app);
							 //imposto il valore dei decimali nell'i-esima riga
							 decimali[i-1] = decimaliSN;
							}
						    
							//crea il modello dati
						    var model = new Array();
						    for(var i = 1; i < anni.length; i++) {
							  for (var j = 1; j <= items.length; j++) {
							    
							    model_row = {};						    		
						    	model_row.anno = anni[i];						    
						    	
								//nome regione
							    model_row.regione = csvStore.getValue(items[j-1], anni[0]);
							    //valore regione per l'anno
							    model_row.valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));							    
							    
							    //prendo il max e il min dal vettore di appoggio che contiene i soli valori numerici
							    model_row.max = massimi[i-1];
							    model_row.min = minimi[i-1];
								model_row.decimali = decimali[i-1];
								
								if (model_row.valore) { model.push(model_row); } //considero il valore solo se != NaN
							     
							   } //fine for regioni
							} // fine for anni
						    
						    var store = new Memory({data:model, idProperty: "anno"});
						   
 						    //dataStore = new ObjectStore({ objectStore: memoryStore});
 						   //store = new DataStore({store: memoryStore});
 						    
					        							 
						    // Creazione del Page Indicator per le Swap Views
							oldPI = registry.byId("pagecontrol");
		
							if (oldPI) {			
									oldPI.destroy();
									oldPI = null;
						    }
					        var PI = new dojox.mobile.PageIndicator({id:"pagecontrol",
					        style:"border-top:1px solid #ddd;"});
						    domConstruct.place(PI.domNode, "contenutoGrafici");
						    PI.startup();		
						    
						    var layout = new Array(), grid = new Array();
						  
						    //creo tutte le swapViews
						    for (var j = anni.length-1; j > 0; j--) { 
							 var tabellaValori=new Array();	 
						     var indiceTV=0;
						     var scelta = anni[j];
						    	
								//creo la swapview dell'anno (se gi‡ esiste prima la distruggo)
								oldWidget = registry.byId("SwapView_" + scelta);
		
								if (oldWidget) {			
									oldWidget.destroy();
									oldWidget = null;
								}
								
						    	var view = new SwapView({
									id : "SwapView_" + scelta
								});					
						    	
								domConstruct.place(view.domNode, "contenutoGrafici");
								
								//la swap View conterr‡ il div del grafico
								var testHeight= "800px;";
								if (indicatore[0] == "S02I07") testHeight = "1400px;";
								
								view.startup();
								
								domConstruct.create("div",
	                                     {id:"grafico_" + scelta,
										  style:"min-height:"+testHeight+";width:100%",
										  }, "SwapView_" + scelta);
										
								store.query({anno:scelta}).forEach(function(results){
									tabellaValori[indiceTV]=new Array(results.regione,results.valore,results.valore);
									//alert(tabellaValori[indiceTV]);
									indiceTV++;
									valoreMax=results.max;
									valoreMin=results.min;
									valoreDecimali=results.decimali;
								});
								indiceT++;
								t[indiceT]=new tabellaV(anni[0],scelta,tabellaValori,valoreMin,valoreMax,valoreDecimali,"DISCENDENTE",colore,tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox);
								console.log("CHIAMA sortTabella "+t);
								//t[anni].sorta();
								sortTabella(indiceT,1);
						    } // fine for (var j = anni.length-1; j > 0; j--)
						} // fine onComplete					
					}); //fine fetch
				}

			}

		}

);


(function(c){var b={inEffect:{opacity:"show"},inEffectDuration:600,stayTime:3000,text:"",sticky:false,type:"notice",position:"top-right",closeText:"",close:null};
var a={init:function(d){if(d){c.extend(b,d)
}},showToast:function(f){var g={};
c.extend(g,b,f);
var j,e,d,i,h;
j=(!c(".toast-container").length)?c("<div></div>").addClass("toast-container").addClass("toast-position-"+g.position).appendTo("body"):c(".toast-container");
e=c("<div></div>").addClass("toast-item-wrapper");
d=c("<div></div>").hide().addClass("toast-item toast-type-"+g.type).appendTo(j).html(c("<p>").append(g.text)).animate(g.inEffect,g.inEffectDuration).wrap(e);
i=c("<div></div>").addClass("toast-item-close").prependTo(d).html(g.closeText).click(function(){c().toastmessage("removeToast",d,g)
});
h=c("<div></div>").addClass("toast-item-image").addClass("toast-item-image-"+g.type).prependTo(d);
if(navigator.userAgent.match(/MSIE 6/i)){j.css({top:document.documentElement.scrollTop})
}if(!g.sticky){setTimeout(function(){c().toastmessage("removeToast",d,g)
},g.stayTime)
}return d
},showNoticeToast:function(e){var d={text:e,type:"notice"};
return c().toastmessage("showToast",d)
},showSuccessToast:function(e){var d={text:e,type:"success"};
return c().toastmessage("showToast",d)
},showErrorToast:function(e){var d={text:e,type:"error"};
return c().toastmessage("showToast",d)
},showWarningToast:function(e){var d={text:e,type:"warning"};
return c().toastmessage("showToast",d)
},removeToast:function(e,d){e.animate({opacity:"0"},600,function(){e.parent().animate({height:"0px"},300,function(){e.parent().remove()
})
});
if(d&&d.close!==null){d.close()
}}};
c.fn.toastmessage=function(d){if(a[d]){return a[d].apply(this,Array.prototype.slice.call(arguments,1))
}else{if(typeof d==="object"||!d){return a.init.apply(this,arguments)
}else{c.error("Method "+d+" does not exist on jQuery.toastmessage")
}}}
})(jQuery);

define(
		[ "dojo/ready", "dojo/on", "dojo/dom", "dojo/dom-prop",
				"dojo/dom-construct",  "dijit/registry", "dojo/fx",
				"dojo/_base/fx", "dojo/dom-style",
				"dojo/parser", "dojo/query", "dojox/gesture/tap",
				"dojox/mobile/SimpleDialog","dojox/mobile/Button",
				"dojo/dom-geometry", "dojox/grid/DataGrid",
				"dojox/mobile/Pane", "dojox/data/CsvStore",
				"dojo/store/DataStore", "dojo/store/Memory", "dojo/data/ObjectStore",
				"dojox/mobile/SwapView", "dojo/window",
				"dojox/mobile/PageIndicator", "dojox/mobile", "dojo/dom-class"
				 ],

		function(ready, on, dom, domProp, domConstruct, registry, 
				fx, baseFx, style ,parser, query,  tap, SimpleDialog,
				Button, geometry, DataGrid, Pane, 
				CsvStore, DataStore, Memory, ObjectStore, 
				SwapView, win) {	
			
            var t;
			var colori =  new Array(
			{hex: "#C50149;"},	{hex: "#27A22D;"},	{hex: "#9F7F66;"}, 	{hex: "#006EAB;"},	{hex: "#EE820F;"},
			{hex: "#437A1C;"}, 	{hex: "#515BA1;"},	{hex: "#814A0A;"},	{hex: "#E31C18;"},	{hex: "#009EC5;"},
			{hex: "#D15E9B;"},	{hex: "#1E2983;"},	{hex: "#7CB955;"},	{hex: "#61A4D3;"},	{hex: "#AB0232;"},
			{hex: "#F29400;"}, 	{hex: "#99A49C;"},	{hex: "#9F4590;"},	{hex: "#694994;"} 	 );
			
		   	// ******************************************************************************************************
	   		// ******************************************************************************************************
    		//  Funzione che formatta un numero per la sua visualizzazione nel datagrid
     	    // ******************************************************************************************************
	    	// ******************************************************************************************************
			function number_format(numero, decimali) {
				var num2 = numero.toString().split('.');
				var decimals = (num2[1]) ? ','+num2[1] : (decimali? ',0' : '');
				var thousands;
				if (parseFloat(numero)>=0) {
				  thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join('.');
				  return thousands.split('').reverse().join('')+decimals;	
				} else {
				  thousands = (num2[0].substr(1)).split('').reverse().join('').match(/.{1,3}/g).join('.');
			      return "-"+thousands.split('').reverse().join('')+decimals;
				} 
						    
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che formatta i valori usando la funzione number_format definita sopra
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatVal(val, decimali){
				if (val) {
				    string = number_format(val, decimali);
				} else {
					string = " "
				}
				  
		        return string;
		    }	
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che calcola la dimensione dell'istogramma per il dato valore
     		// ******************************************************************************************************
			// ******************************************************************************************************
			function elabora(valore, max, min) {	
			 	 // Get the viewport-size of the document:
				var vs = win.getBox();			    
				var cellWidth = vs.w * 0.50; //destiniamo al grafico il 55% del display
				
				var geom = {}; //creo un oggetto che conterr‡ posizione relativa e dimensione del DIV
					
			    var valore_float = parseFloat(valore); //trasformo il valore in un numero
				var valore_ass = Math.abs(valore_float); //valore assoluto
					
				if (max >=0) {
					 if (min>0)  {
						 geom.padding = 0;
					  }  
					  if (min<=0) {
						var val_min_assoluto = Math.abs(min);  
						//devo considerare anche il valore assoluto del minimo, per capire quanto si estendono gli istogrammi
						max+=val_min_assoluto;
						geom.padding = val_min_assoluto*cellWidth/max;
						if (valore_float<0)  {
						  geom.padding-= (valore_ass*cellWidth/max); //porto 'indietro' gli istogrammi dei valori negativi 
						}
					  }
				} else {
						 //caso in cui il massimo Ë negativo : il valore assoluto del minimo sar‡ il 'massimo'
					     var valore_max_assoluto = Math.abs(min);   
						 //faccio partire gli istogrammi da dx, a tornar indietro
					     geom.padding = cellWidth - (valore_ass*cellWidth)/valore_max_assoluto;		                        					 
				}  
					  
				geom.dimensione =  (valore_ass * cellWidth)/Math.abs(max);	   				            		
				return geom;					
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che genera l'istogramma per il valore passato, in relazione al massimo e al minimo dei valori 
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatGraph(val, max, min, colore){			
				if(!val){
		            return "";
		        }
				var geom = elabora(val, max, min);				
				var string = "<div style='position:relative;left:" + geom.padding + "px;width:" + geom.dimensione + "px;background:" + colore.hex + ";height:8px;'></div>";
		     	return string;
		    }
			
			/* ******************************************************************************************************
			 *  RGB usati per gli istogrammi 
			*  ******************************************************************************************************/
			function getColore(indice) {				
				
				return colori[indice];
					
			}
			
			/* ******************************************************************************************************
			 *  CREA GRAFICI SORTATI
			*  ******************************************************************************************************/
			function creaGraficiSortati(a,b,c,d,e) {				
								domConstruct.create("div",
	                                     {id:"grafico_" + scelta,
										  style:"min-height:"+testHeight+";width:100%",
										  }, "SwapView_" + scelta);
					
			}
			
			function chiamata(){
				alert("QUI ");
				
			}

			/* ******************************************************************************************************
			 *  SORT Tabella
			*  ******************************************************************************************************/
			function sortTabella(indiceT,COLONNA) {	
					var appo;
					console.log("DENTRO sortTabella "+t[indiceT].ordinamento);
				if (t[indiceT].ordinamento=="DISCENDENTE"){
					t[indiceT].ordinamento="ASCENDENTE";
					for (var i=0;i<t[indiceT].tabellaValori.length-1;i++){
						for (var j=i+1;j<t[indiceT].tabellaValori.length;j++){
							if (t[indiceT].tabellaValori[i][COLONNA]<t[indiceT].tabellaValori[j][COLONNA]){
								for (var k=0;k<=2;k++){
									appo=t[indiceT].tabellaValori[i][k];
									t[indiceT].tabellaValori[i][k]=t[indiceT].tabellaValori[j][k];
									t[indiceT].tabellaValori[j][k]=appo;
								}
							}
					}
					}
				}
				else{
					t[indiceT].ordinamento="DISCENDENTE";
					for (var i=0;i<t[indiceT].tabellaValori.length-1;i++)
						for (var j=i+1;j<t[indiceT].tabellaValori.length;j++){
							if (t[indiceT].tabellaValori[i][COLONNA]>t[indiceT].tabellaValori[j][COLONNA])
								for (var k=0;k<=2;k++){
									appo=t[indiceT].tabellaValori[i][k];
									t[indiceT].tabellaValori[i][k]=t[indiceT].tabellaValori[j][k];
									t[indiceT].tabellaValori[j][k]=appo;
							}
					}
				}				
				//console.log(t);
				var tabella="<table width='100%' class='tabellabella' cellspacing=0 cellpadding=4 id='datagrid_"+t[indiceT].anno+"'>";
				
				tabella+="<thead><tr >";
				tabella+="<th id='THID0_"+t[indiceT].anno+"' align=left>"+t[indiceT].regione+"<img src='images/ico/sugiu2.png' border=0></th>";
				tabella+="<th id='THID1_"+t[indiceT].anno+"' align=right><img src='images/ico/sugiu2.png' border=0 >"+t[indiceT].anno+"</th>";
				tabella+="<th align=left id='THID2_"+t[indiceT].anno+"'><img src='images/ico/sugiu2.png'  border=0>&nbsp;</th>";
				tabella+="</tr></thead>";
									
				for (var k=0;k<t[indiceT].tabellaValori.length;k++){
					if (k % 2 == 0)
						bg="#ffffff";
					else
						bg="#eeeeee";
					tabella+="<tbody><tr style='background:"+bg+";'>";
					tabella+="<td>"+t[indiceT].tabellaValori[k][0]+"</td>";
					tabella+="<td align=right>"+formatVal(t[indiceT].tabellaValori[k][1],t[indiceT].decimali)+"</td>";
					tabella+="<td>"+formatGraph(t[indiceT].tabellaValori[k][2],t[indiceT].valoreMax,t[indiceT].valoreMin,t[indiceT].colore)+"</td>";
					tabella+="</tr></tbody>";
				}
				tabella+="</table>";
				//alert("QUI");
				

				dojo.byId("grafico_"+t[indiceT].anno).innerHTML=tabella;
				
				var thID0 = dom.byId("THID0_"+t[indiceT].anno);
				var thID1 = dom.byId("THID1_"+t[indiceT].anno);
				var thID2 = dom.byId("THID2_"+t[indiceT].anno);
				
				on(thID0, tap, function(){
					sortTabella(indiceT,0);
					})
					
				on(thID1, tap, function(){
					sortTabella(indiceT,1);
					})
					
				on(thID2, tap, function(){
					sortTabella(indiceT,2);
					})
			}
			
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////
			return {

				// ******************************************************************************************************
				// ******************************************************************************************************
				// Funzione che crea le swapViews dei grafici
				// ******************************************************************************************************
				// ******************************************************************************************************
				creaGrafici : function(tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox) {
					
					var sezione = indicatore[0].substr(1,2);
					var scheda = indicatore[0].substr(4,2);
					var colore = getColore(parseFloat(sezione)-1); 
					t=new Array();
					
					console.log("[NOIITALIA-grafici] Accesso al file dati : " + indicatore + " chiave : " + tipologiaGrafico);
					
					var csvStore = new dojox.data.CsvStore({
						identifier: tipologiaGrafico,
						url : "dati/S" + sezione + "/I" + scheda + "/" + indicatore + ".csv",
						separator : ";"
					});							
										
					csvStore.fetch({
						
					   onError : function (err) {							
							// distruggo il vecchio contenuto del div grafici e lo ricreo
						    domConstruct.empty("contenutoGrafici");					   
					    },
					
					   onComplete : function(items, arg) {						  
							
						     var valoreMax;
						     var valoreMin;
						     var valoreDecimali;
						     var valoreColore;
						     var indiceT=-1;						 

						     var anni = csvStore.getAttributes(items[0]);
						     console.log(anni);						     
						    
							var titolo = dom.byId("titoloGrafico");
					        if (titolo) {
							  domConstruct.empty("titoloGrafico");
							  dom.byId("titoloGrafico").innerHTML="&nbsp;" +titolo_grafico;							  
							} else {
							 domConstruct.place("<div id='titoloGrafico' style='width:100%'>&nbsp;" + titolo_grafico + "</div>", "accordion", "after");
							}
							 							
						    var massimi = new Array(), minimi = new Array(), decimali = new Array();
							//calcola max e min per anno		
							//calcola anche la necessit‡ di aggiungere decimali ai numeri interi (nel caso ci siano dati decimali nella serie)
							for(var i = 1; i < anni.length; i++) {	
                             app = new Array();						    								
							 decimaliSN = false;
							 for (var j = 1; j <= items.length; j++) {
							    	//valore regione per l'anno
							    	valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));
							    	if (valore) { 
									   app.push(valore);  //considero il valore solo se != NaN
									   decimaliSN = decimaliSN || (valore%1)!=0; // se ho almeno un valore decimale, lo segnalo nella var. booleana
									} 
							 }
							 //calcolo massimi e minimi dal vettore di appoggio
							 massimi[i-1] = Math.max.apply(null, app);
							 minimi[i-1] = Math.min.apply(null, app);
							 //imposto il valore dei decimali nell'i-esima riga
							 decimali[i-1] = decimaliSN;
							}
						    
							//crea il modello dati
						    var model = new Array();
						    for(var i = 1; i < anni.length; i++) {
							  for (var j = 1; j <= items.length; j++) {
							    
							    model_row = {};						    		
						    	model_row.anno = anni[i];						    
						    	
								//nome regione
							    model_row.regione = csvStore.getValue(items[j-1], anni[0]);
							    //valore regione per l'anno
							    model_row.valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));							    
							    
							    //prendo il max e il min dal vettore di appoggio che contiene i soli valori numerici
							    model_row.max = massimi[i-1];
							    model_row.min = minimi[i-1];
								model_row.decimali = decimali[i-1];
								
								if (model_row.valore) { model.push(model_row); } //considero il valore solo se != NaN
							     
							   } //fine for regioni
							} // fine for anni
						    
						     var store = new Memory({data:model, idProperty: "anno"});
		
 						   // dataStore = new ObjectStore({ objectStore: memoryStore});
							
							var infoBox = dom.byId("infoBox");
					        							 
						    // Creazione del Page Indicator per le Swap Views
							oldPI = registry.byId("pagecontrol");
		
							if (oldPI) {			
									oldPI.destroy();
									oldPI = null;
						    }
					        var PI = new dojox.mobile.PageIndicator({id:"pagecontrol",
					        style:"border-top:1px solid #ddd;"});
						    domConstruct.place(PI.domNode, "contenutoGrafici");
						    PI.startup();		
						    
						    var layout = new Array(), grid = new Array();
						  
						    //creo tutte le swapViews
						    for (var j = anni.length-1; j > 0; j--) { 
						    
    						 	var tabellaValori=new Array();	 
						        var indiceTV=0;
						    	var scelta = anni[j];
						    	
								//creo la swapview dell'anno (se gi‡ esiste prima la distruggo)
								oldWidget = registry.byId("SwapView_" + scelta);
		
								if (oldWidget) {			
									oldWidget.destroy();
									oldWidget = null;
								}
								
						    	var view = new SwapView({
									id : "SwapView_" + scelta
								});					
						    	
								domConstruct.place(view.domNode, "contenutoGrafici");
								
								//la swap View conterr‡ il div del grafico
								var testHeight= "800px;";
								if (indicatore[0] == "S02I07") testHeight = "1400px;";
								
								view.startup();
								
								domConstruct.create("div",
	                                     {id:"grafico_" + scelta,
										  style:"min-height:"+testHeight+";width:100%",
										  }, "SwapView_" + scelta);
										
								store.query({anno:scelta}).forEach(function(results){
									tabellaValori[indiceTV]=new Array(results.regione,results.valore,results.valore);
									//alert(tabellaValori[indiceTV]);
									indiceTV++;
									valoreMax=results.max;
									valoreMin=results.min;
									valoreDecimali=results.decimali;
								});
								indiceT++;
								t[indiceT]=new tabellaV(anni[0],scelta,tabellaValori,valoreMin,valoreMax,valoreDecimali,"DISCENDENTE",colore,tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox);
								console.log("CHIAMA sortTabella "+t);
								//t[anni].sorta();
								sortTabella(indiceT,1);
						    } // fine for (var j = anni.length-1; j > 0; j--)						    
						    
					} // fine onComplete					
					}); //fine fetch
					
				}

			}

		}

);


function tabellaV(regione,anno,tabellaValori,valoreMin,valoreMax,valoreDecimali,ordinamento,colore,tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox) {
	this.regione=regione;
	this.anno=anno;
	this.tabellaValori=tabellaValori;
	this.valoreMin=valoreMin;
	this.valoreMax=valoreMax;
	this.valoreDecimali=valoreDecimali;
	this.ordinamento=ordinamento;
	this.colore=colore;
	this.tipologiaGrafico=tipologiaGrafico;
	this.indicatore=indicatore;
	this.titolo_pagina=titolo_pagina;
	this.titolo_grafico=titolo_grafico;
	this.contenutoInfoBox=contenutoInfoBox;
}

define([ "dojo/ready",
         "noiitalia/grafici",
         "dojo/parser",         
         "dijit/registry",
         "dojo/on", 
         "dojox/gesture/tap", 
         "dojo/dom", 
         "dojo/dom-prop", 
		 "dojo/dom-construct",
		 "dojo/dom-style",
		 "dojo/data/ItemFileReadStore",
         "dojo/fx",
		 "dojo/_base/fx",
		 ],	 

function(ready, grafici, parser, registry, on, tap, dom, domProp, domConstruct, domStyle, ItemFileReadStore, fx, baseFx) {
	
	return {

		init : function() {
			alert("QUI");
                
		},
		
	   
		load_data : function (indicatore, tipologiaGrafico, titolo_pagina, titolo_grafico, contenutoInfoBox) {
			
			var sezione = indicatore[0].substr(1,2);
			var scheda = indicatore[0].substr(4,2);
			var colore = "color" + sezione;
			
			console.log("[NOIITALIA-generale] Lettura file dei testi della sez. " + sezione + " scheda: " + scheda);    
			
			var testoStore = new ItemFileReadStore({
				url : "testi/S" + sezione +  "_testo.json"
			});
			
			testoStore.fetch({
				query:{indicatore: "S" + sezione + "I" + scheda},
				onItem : function(item, request) {
					
					dom.byId("commento").innerHTML = titolo_pagina;	
					dom.byId("commento").style.backgroundImage="url(images/ico/" + sezione + ".png)";			
                   	dojo.byId("sguardodinsieme").innerHTML="<div class='mblAccordion mblAccordionTitle mblAccordionHasIcon mblAccordionTitleAnchor'>Uno sguardo d&#39;insieme<div align='right' style='float:right;' id='BUTTONsguardodinsiemeITEM'><img src='images/ico/piu.png'/></div></div><div id='sguardodinsiemeITEM' style='padding-left:20px;padding-right:20px;text-align:justify;display:none;'>" + item.sguardodinsieme + "</div>";
					dojo.byId("definizioni").innerHTML="<div class='mblAccordion mblAccordionTitle mblAccordionHasIcon mblAccordionTitleAnchor'>Definizioni utilizzate<div align='right' style='float:right;' id='BUTTONdefinizioniITEM'><img src='images/ico/piu.png'/></div></div><div id='definizioniITEM' style='padding-left:20px;padding-right:20px;text-align:justify;display:none;'>" + item.definizioni +"</div>";
					
					if (item.regioni != "") {
					  dojo.byId("regioni").innerHTML="<div class='mblAccordion mblAccordionTitle mblAccordionHasIcon mblAccordionTitleAnchor'>L&#39;Italia e le sue regioni<div align='right' style='float:right;' id='BUTTONregioniITEM'><img src='images/ico/piu.png'/></div></div><div id='regioniITEM' style='padding-left:20px;padding-right:20px;text-align:justify;display:none;'>" + item.regioni +  "</div>";
					  //dojo.byId("regioni")._at.labelNode.innerHTML = "L&#39;Italia e le sue regioni";					  
					} else {
					  dojo.byId("regioni").innerHTML="<div class='mblAccordion mblAccordionTitle mblAccordionHasIcon mblAccordionTitleAnchor'>L&#39;Italia e i suoi capoluoghi<div align='right' style='float:right;' id='BUTTONregioniITEM'><img src='images/ico/piu.png'/></div></div><div id='regioniITEM' style='padding-left:20px;padding-right:20px;text-align:justify;display:none;'>" +  item.capoluoghi + "</div>";
				      //dojo.byId("regioni")._at.labelNode.innerHTML = "L&#39;Italia e i suoi capoluoghi";					  
					}
					 //creo il grafico
					 grafici.creaGrafici(tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox);					
				},
				onError: function(error, request){
					dom.byId("commento").innerHTML = "Dati non disponibili";
					dojo.byId("sguardodinsieme").innerHTML="Dati non disponibili";
					dojo.byId("definizioni").innerHTML="Dati non disponibili";
					dojo.byId("regioni").innerHTML="Dati non disponibili";
	            },
				onComplete : function() {								
					console.log("[NOIITALIA-generale] testi e grafici completati");
					
				}
			});
				
			//Collasso i vari pannelli dell'accordion prima di passare alla dataView
    		    dojo.byId("sguardodinsieme").innerHTML="";
    		    dojo.byId("definizioni").innerHTML="";
    		    dojo.byId("regioni").innerHTML="";
           }
		
	  }
	}
);

define([ "dojo/ready",
         "noiitalia/graficiIpad",
         "dojo/parser",         
         "dijit/registry",
         "dojo/on", 
         "dojox/gesture/tap", 
         "dojo/dom", 
         "dojo/dom-prop", 
		 "dojo/dom-construct",
		 "dojo/dom-style",
		 "dojo/data/ItemFileReadStore",
         "dojo/fx",
		 "dojo/_base/fx"
		 ],	 

function(ready, graficiIpad, parser, registry, on, tap, dom, domProp, domConstruct, domStyle, ItemFileReadStore, fx, baseFx) {
	
	return {

		init : function() {
			
                
		},
		
	   
		load_data : function (indicatore, tipologiaGrafico, titolo_pagina, titolo_grafico, contenutoInfoBox) {
			
			var sezione = indicatore[0].substr(1,2);
			var scheda = indicatore[0].substr(4,2);
			var colore = "color" + sezione;
			
			console.log("[NOIITALIA-generale] Lettura file dei testi della sez. " + sezione + " scheda: " + scheda);    
			
			var testoStore = new ItemFileReadStore({
				url : "testi/S" + sezione +  "_testo.json"
			});
			
			testoStore.fetch({
				query:{indicatore: "S" + sezione + "I" + scheda},
				onItem : function(item, request) {
					
					dom.byId("commento").innerHTML = titolo_pagina;	
					dom.byId("commento").style.backgroundImage="url(images/ico/" + sezione + ".png)";			
                   	registry.byId("sguardodinsieme").set("content", "<div style='padding: 20px;text-align:justify'>" + item.sguardodinsieme + "</div>");
					registry.byId("definizioni").set("content","<div style='padding: 20px;text-align:justify'>" + item.definizioni +"</div>");
					
					if (item.regioni != "") {
					  registry.byId("regioni").set("content","<div style='padding: 20px;text-align:justify'>" + item.regioni +  "</div>");
					  registry.byId("regioni")._at.labelNode.innerHTML = "L&#39;Italia e le sue regioni";					  
					} else {
					  registry.byId("regioni").set("content","<div style='padding: 20px;text-align:justify'>" +  item.capoluoghi + "</div>");
				      registry.byId("regioni")._at.labelNode.innerHTML = "L&#39;Italia e i suoi capoluoghi";					  
					}
					 //creo il grafico
					 graficiIpad.creaGrafici(tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox);
										
				},
				onError: function(error, request){
					dom.byId("commento").innerHTML = "Dati non disponibili";
					registry.byId("sguardodinsieme").set("content","Dati non disponibili");
					registry.byId("definizioni").set("content","Dati non disponibili");
					registry.byId("regioni").set("content","Dati non disponibili");
	            },
				onComplete : function() {								
					console.log("[NOIITALIA-generale] testi e grafici completati");				
				}
			});
			
			//Collasso i vari pannelli dell'accordion prima di passare alla dataView
			registry.byId("accordion").collapse(registry.byId("sguardodinsieme"));
			registry.byId("accordion").collapse(registry.byId("definizioni"));
			registry.byId("accordion").collapse(registry.byId("regioni"));
           }
		
	  }
	}
);

define(
		[ "dojo/ready", "dojo/on", "dojo/dom", "dojo/dom-prop",
				"dojo/dom-construct",  "dijit/registry", "dojo/fx",
				"dojo/_base/fx", "dojo/dom-style",
				"dojo/parser", "dojo/query", "dojox/gesture/tap",
				"dojox/mobile/SimpleDialog","dojox/mobile/Button",
				"dojo/dom-geometry", "dojox/grid/DataGrid",
				"dojox/mobile/Pane", "dojox/data/CsvStore",
				"dojo/store/DataStore", "dojo/store/Memory", "dojo/data/ObjectStore",
				"dojox/mobile/SwapView", "dijit/layout/ContentPane", "dojo/window",
				"dojox/mobile/PageIndicator", "dojox/mobile", "dojo/dom-class"
				 ],

		function(ready, on, dom, domProp, domConstruct, registry, 
				fx, baseFx, style ,parser, query,  tap, SimpleDialog,
				Button, geometry, DataGrid, Pane, 
				CsvStore, DataStore, Memory, ObjectStore, 
				SwapView, ContentPane, win) {	
			
			var colori =  new Array(
			{hex: "#C50149;"},	{hex: "#27A22D;"},	{hex: "#9F7F66;"}, 	{hex: "#006EAB;"},	{hex: "#EE820F;"},
			{hex: "#437A1C;"}, 	{hex: "#515BA1;"},	{hex: "#814A0A;"},	{hex: "#E31C18;"},	{hex: "#009EC5;"},
			{hex: "#D15E9B;"},	{hex: "#1E2983;"},	{hex: "#7CB955;"},	{hex: "#61A4D3;"},	{hex: "#AB0232;"},
			{hex: "#F29400;"}, 	{hex: "#99A49C;"},	{hex: "#9F4590;"},	{hex: "#694994;"} 	 );
			
		   	// ******************************************************************************************************
	   		// ******************************************************************************************************
    		//  Funzione che formatta un numero per la sua visualizzazione nel datagrid
     	    // ******************************************************************************************************
	    	// ******************************************************************************************************
			function number_format(numero, decimali) {
				var num2 = numero.toString().split('.');
				var decimals = (num2[1]) ? ','+num2[1] : (decimali? ',0' : '');
				var thousands;
				if (parseFloat(numero)>=0) {
				  thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join('.');
				  return thousands.split('').reverse().join('')+decimals;	
				} else {
				  thousands = (num2[0].substr(1)).split('').reverse().join('').match(/.{1,3}/g).join('.');
			      return "-"+thousands.split('').reverse().join('')+decimals;
				} 
						    
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che formatta i valori usando la funzione number_format definita sopra
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatVal(val, decimali){
				if (val) {
				    string = number_format(val, decimali);
				} else {
					string = " "
				}
				  
		        return string;
		    }	
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che calcola la dimensione dell'istogramma per il dato valore
     		// ******************************************************************************************************
			// ******************************************************************************************************
			function elabora(valore, max, min) {	
			 	 // Get the viewport-size of the document:
				var vs = win.getBox();			    
				var cellWidth = vs.w * 0.30; //destiniamo al grafico il 35% del display
				
				var geom = {}; //creo un oggetto che conterr‡ posizione relativa e dimensione del DIV
					
			    var valore_float = parseFloat(valore); //trasformo il valore in un numero
				var valore_ass = Math.abs(valore_float); //valore assoluto
					
				if (max >=0) {
					 if (min>0)  {
						 geom.padding = 0;
					  }  
					  if (min<=0) {
						var val_min_assoluto = Math.abs(min);  
						//devo considerare anche il valore assoluto del minimo, per capire quanto si estendono gli istogrammi
						max+=val_min_assoluto;
						geom.padding = val_min_assoluto*cellWidth/max;
						if (valore_float<0)  {
						  geom.padding-= (valore_ass*cellWidth/max); //porto 'indietro' gli istogrammi dei valori negativi 
						}
					  }
				} else {
						 //caso in cui il massimo Ë negativo : il valore assoluto del minimo sar‡ il 'massimo'
					     var valore_max_assoluto = Math.abs(min);   
						 //faccio partire gli istogrammi da dx, a tornar indietro
					     geom.padding = cellWidth - (valore_ass*cellWidth)/valore_max_assoluto;		                        					 
				}  
					  
				geom.dimensione =  (valore_ass * cellWidth)/Math.abs(max);	   				            		
				return geom;					
			}
			
			// ******************************************************************************************************
			// ******************************************************************************************************
			// Funzione che genera l'istogramma per il valore passato, in relazione al massimo e al minimo dei valori 
     		// ******************************************************************************************************
			// ******************************************************************************************************			
			function formatGraph(val, max, min, colore){			
				if(!val){
		            return "";
		        }
				var geom = elabora(val, max, min);				
				var string = "<div style='position:relative;left:" + geom.padding + "px;width:" + geom.dimensione + "px;background:" + colore.hex + ";height:8px;'></div>";
		     	return string;
		    }
			
			/* ******************************************************************************************************
			 *  RGB usati per gli istogrammi 
			*  ******************************************************************************************************/
			function getColore(indice) {				
				
				return colori[indice];
					
			}
			
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////
			return {

				// ******************************************************************************************************
				// ******************************************************************************************************
				// Funzione che crea le swapViews dei grafici
				// ******************************************************************************************************
				// ******************************************************************************************************
				creaGrafici : function(tipologiaGrafico, indicatore, titolo_pagina, titolo_grafico, contenutoInfoBox) {
					
					var sezione = indicatore[0].substr(1,2);
					var scheda = indicatore[0].substr(4,2);
					var colore = getColore(parseFloat(sezione)-1); 
					
					console.log("[NOIITALIA-grafici] Accesso al file dati : " + indicatore + " chiave : " + tipologiaGrafico);
					
					var csvStore = new dojox.data.CsvStore({
						identifier: tipologiaGrafico,
						url : "dati/S" + sezione + "/I" + scheda + "/" + indicatore + ".csv",
						separator : ";"
					});							
										
					csvStore.fetch({
						
					   onError : function (err) {							
							// distruggo il vecchio contenuto del div grafici e lo ricreo
						    domConstruct.empty("contenutoGrafici");					   
					    },
					
					   onComplete : function(items, arg) {						  
							
						     							 
						     var anni = csvStore.getAttributes(items[0]);
						     console.log(anni);						     
						    
							var titolo = dom.byId("titoloGrafico");
					        if (titolo) {
							  domConstruct.empty("titoloGrafico");
							  dom.byId("titoloGrafico").innerHTML="&nbsp;" +titolo_grafico;							  
							} else {
							 domConstruct.place("<div id='titoloGrafico'>&nbsp;" + titolo_grafico + "</div>", "accordion", "after");			
							}
							 							
						    var massimi = new Array(), minimi = new Array(), decimali = new Array();
							//calcola max e min per anno		
							//calcola anche la necessit‡ di aggiungere decimali ai numeri interi (nel caso ci siano dati decimali nella serie)
							for(var i = 1; i < anni.length; i++) {	
                             app = new Array();						    								
							 decimaliSN = false;
							 for (var j = 1; j <= items.length; j++) {
							    	//valore regione per l'anno
							    	valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));
							    	if (valore) { 
									   app.push(valore);  //considero il valore solo se != NaN
									   decimaliSN = decimaliSN || (valore%1)!=0; // se ho almeno un valore decimale, lo segnalo nella var. booleana
									} 
							 }
							 //calcolo massimi e minimi dal vettore di appoggio
							 massimi[i-1] = Math.max.apply(null, app);
							 minimi[i-1] = Math.min.apply(null, app);
							 //imposto il valore dei decimali nell'i-esima riga
							 decimali[i-1] = decimaliSN;
							}
						    
							//crea il modello dati
						    var model = new Array();
						    for(var i = 1; i < anni.length; i++) {
							  for (var j = 1; j <= items.length; j++) {
							    
							    model_row = {};						    		
						    	model_row.anno = anni[i];						    
						    	
								//nome regione
							    model_row.regione = csvStore.getValue(items[j-1], anni[0]);
							    //valore regione per l'anno
							    model_row.valore = parseFloat(csvStore.getValue(items[j-1], anni[i]));							    
							    
							    //prendo il max e il min dal vettore di appoggio che contiene i soli valori numerici
							    model_row.max = massimi[i-1];
							    model_row.min = minimi[i-1];
								model_row.decimali = decimali[i-1];
								
								if (model_row.valore) { model.push(model_row); } //considero il valore solo se != NaN
							     
							   } //fine for regioni
							} // fine for anni
						    
						    var memoryStore = new Memory({data:model, idProperty: "anno"});
						    
		 					/*  //TEST
						    memoryStore.query({anno:"2011"}, { sort:[{attribute:"valore", descending: true}] }).forEach(function(item){
						    	console.log("[anno 2011] - " + item.regione + ":" + item.valore);						    	
					        });
							*/
							
 						    dataStore = new ObjectStore({ objectStore: memoryStore});
							
							var infoBox = dom.byId("infoBox");
					        //se Ë previsto un infoBox..creo un dialog
					        if (infoBox) {	
					          var dlg = dom.byId("infoBoxText");
                              dlg.innerHTML=contenutoInfoBox;
					          
							   //gestione click sull'infoBox
					           on(infoBox, tap, function (evt) {	
					        	   style.set(dom.byId("sfondoInfoBox"), "height", "100%");
					        	   style.set(dom.byId("sfondoInfoBox"), "opacity", "0.4");
					        	   fx.wipeIn({ node: sfondoInfoBox}).play();
					        	   fx.wipeIn({ node: infoBoxDialog}).play();									
						       });							  
							 };	
							 
						    // Creazione del Page Indicator per le Swap Views
							oldPI = registry.byId("pagecontrol");
		
							if (oldPI) {			
									oldPI.destroy();
									oldPI = null;
						    }
					        var PI = new dojox.mobile.PageIndicator({id:"pagecontrol",
					        style:"border-top:1px solid #ddd;"});
						    domConstruct.place(PI.domNode, "contenutoGrafici");
						    PI.startup();		
						    
						    var layout = new Array(), grid = new Array();
						  
						    //creo tutte le swapViews
						    for (var j = anni.length-1; j > 0; j--) { 
						    	
						    	var scelta = anni[j];
						    	
								//creo la swapview dell'anno (se gi‡ esiste prima la distruggo)
								oldWidget = registry.byId("SwapView_" + scelta);
		
								if (oldWidget) {			
									oldWidget.destroy();
									oldWidget = null;
								}
								
						    	var view = new SwapView({
									id : "SwapView_" + scelta
								});					
						    	
								domConstruct.place(view.domNode, "contenutoGrafici");
								
								//la swap View conterr‡ il div del grafico
								var testHeight= "700px;";
								if (indicatore[0] == "S02I07") testHeight = "1400px;";
								domConstruct.place("<div id='grafico_" + scelta + "' data-dojo-type='dojox.grid.DataGrid' style='min-height:" +  testHeight + "'></div>", "SwapView_" + scelta, "first");
								
								view.startup();
								 
								grid[scelta] = new DataGrid({
					            store: dataStore,
					            query: { anno: scelta },
					            escapeHTMLInData:false,
								style:"padding-top:10px;",
				                selectionMode : 'none',
				                sortInfo: -2, //significa che l'ordinamento di default Ë decrescente sulla seconda colonna
					            queryOptions: {},
					            structure: [  { field:  "regione", styles: 'text-align: left;' , name: tipologiaGrafico, width: "45%" },
				                              { field:  "valore", name: scelta, styles: 'text-align: right;' , width: "20%", fields: ["valore", "decimali"], formatter: function(fields) {
                                                 var val = fields[0], decimali = fields[1];
												 return formatVal(val,decimali); }
											  },
				                              { field:  "valore", name: ' ', width: "auto", fields: ["valore", "max", "min"], formatter: function(fields){
											      var val = fields[0], max = fields[1] , min = fields[2];
				                            	  return formatGraph(val, max, min, colore); }
				                               }
				                              ] 
				     	        }, document.createElement('div'));
				                
				                // append the new grid to the div "gridContainer":
				                dojo.byId("grafico_" + scelta).appendChild(grid[scelta].domNode);
				                
				                // questa funzione serve per identificare le righe della grid e nel caso specifico,
				                // cambiare il loro background alternativamente 1 riga si 1 riga no
				                dojo.connect(grid[scelta], 'onStyleRow', this, function (row) {
				                	var item = grid[scelta].getItem(row.index);
				                    if (row.index % 2 == 0) {
				                        row.customStyles += 'background:#dddddd;';				                       
				                    }

				                });
				                
				                // Call startup, in order to render the grid:
				                grid[scelta].startup();						    
									   
						    } // fine for (var j = anni.length-1; j > 0; j--)						    
						    
					} // fine onComplete					
					}); //fine fetch
					
				}

			}

		}

);

