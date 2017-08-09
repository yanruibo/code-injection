























































































			last_click_time = new Date().getTime();
			document.addEventListener('click', function (e) {
				//Check if has skipPatch a true
				if($(e.target).attr('skipPatch')!='true'){
    				click_time = e['timeStamp'];
    				if (click_time && (click_time - last_click_time) < 1000) {
    					try{
        				e.stopImmediatePropagation();
        				}catch (ex){
        					//RP - No hacemos nada, es para evitar problemas donde da error
        				}
        				e.preventDefault();
        				return false;
    				}
    				last_click_time = click_time;
    			}
			}, true);
		

				//Gestion de la pantalla en Android
				$(window).on('resize',function(){
						if($.mobile.activePage.attr('id') == 'lista_vuelos'){
								autoScrollPageContentRole('lista_vuelos');
						}
					});
					
			

	        app.initialize();
	    

//Arranque de sistemas, configuraciones, etc etc etc
var GestorIdiomas;
var GestorPrefs;
var GestorPOIs;
var GestorAirports;
var GestorAirlines;

var GestorDepartureFlights;
var GestorArrivalFlights;
var GestorSearchFlights;
var GestorFlightDetails;
var GestorCacheFlights;
var GestorSettings; 

var Proxy;
var History;
var PoiRepository;
var GestorContexto;
var GestorViajes;
var GestorResParking;
var GestorFavouritePOIs;
var GestorPOIDetails;
var GestorBanners;
var GestorSurveys;
var GestorPromotions;
var GestorNotificaciones;
var GestorPush;
var GestorOL;
var GestorPosition;
var GestorCod2D;
var ActualPage;//La página actual
var tabSalidas = true;

//RP - 1.2.1 FIX - Se calcula el height para evitar problemas de teclado
var initialWindowHeight = null;


var ConstPages={
	'Element_Menu' : 'divMenu',
	'Element_Banner' : 'imgBanner',
	'Element_Surveys' : 'divSurveys',
	'Element_CodBar' : 'codBar',
		
};

/*
 * Cuidado, el orden de inicilización de los 'objetos' es importante
 */
function init(){

    //console.log('Metodo init');
    Proxy = new _Proxy();
	var wsDao = new NetDao();
	var bdDao = new BDDao();
	GestorSettings = new _SettingsManager();
	PoiRepository = new _PoiRepository();
    GestorPrefs = new _GestorPrefs();
   	Utils = new _Utils();
	GestorIdiomas = new _GestorIdiomas();
    GestorNotificaciones = new _GestorNotifications();
	GestorViajes = new _GestorViajes();
	GestorResParking = new _GestorResParking();
	GestorContexto = new _GestorContexto();
	GestorDepartureFlights = new _GestorFlights();
    GestorArrivalFlights = new _GestorFlights();
    GestorSearchFlights = new _GestorFlights();
    GestorFlightDetails = new _GestorFlightDetails();
    GestorCacheFlights = new _GestorCacheFlights();
	GestorAirports = new _GestorAirports();
	GestorAirlines = new _GestorAirlines();
	GestorPOIs = new _GestorPOIs();
	GestorFavouritePOIs = new _GestorFavouritePOIs();
	GestorPOIDetails = new _GestorPOIDetails();
	GestorBanners = new _GestorBanners();
	GestorSurveys = new _GestorSurveys();
	GestorPromotions = new _GestorPromotions();
	GestorPush = new _GestorPush();
	GestorOL = new _GestorOL();
	GestorPosition = new _GestorPosition();
    GestorCod2D = new _GestorCod2D();
	History = new _History();
	PoiRepository.init(wsDao);
	
    //Nos sirve la creacion por defecto (Si compartimos POST, JSON, etc, puede usarse para todos)
    Proxy.addOp('isValidUser',null,wsDao);
        
    bdDao.init();
    GestorSettings.init(bdDao);
    GestorIdiomas.init(initCallBack);
    
    GestorViajes.init(bdDao, wsDao);//Se arranca aquí para calcular el viaje
    GestorResParking.init(bdDao);
    GestorContexto.init(wsDao);
    
    GestorDepartureFlights.init(wsDao);
    GestorArrivalFlights.init(wsDao);
    GestorSearchFlights.init(wsDao);
    GestorFlightDetails.init(wsDao);
    GestorAirports.init(wsDao);
    
    var _idCAirport='MAD';
    
    
     console.log('AGD getDEFAULT_AIRPORT')
	GestorSettings.getSetting('DEFAULT_AIRPORT',function(data){
		 console.log('AGD getDEFAULT_AIRPORT OK: ' + JSON.stringify(data))
		if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
		{
			initWithAirport(wsDao,bdDao,data[0].SETTING_VALUE);
		} 
		else
			initWithAirport(wsDao,bdDao,_idCAirport);
	},
	function(err){
		console.log('Error en la recuperación de setting getDEFAULT_AIRPORT: ' + err);
		initWithAirport(wsDao,bdDao,_idCAirport);
	});
    
    

 }

function initWithAirport(wsDao, bdDao, idCAirport){
	GestorContexto.CONTEXT().UC_AIRPORT =GestorAirports.getAirportById(idCAirport);
    
    GestorAirports.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);

    GestorAirlines.init(wsDao);
    
    GestorFavouritePOIs.init(bdDao);

    GestorPOIDetails.init(wsDao);


	GestorBanners.init(wsDao);
	GestorBanners.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	
	GestorSurveys.init(wsDao);
	GestorSurveys.setLanguage(GestorContexto.CONTEXT().UC_LANGUAGE_ID, false);
	GestorSurveys.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	
	GestorPromotions.init(wsDao);
	GestorPromotions.setLanguage(GestorContexto.CONTEXT().UC_LANGUAGE_ID, false);
	GestorPromotions.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);

    // GestorPush.init();
 
    GestorNotificaciones.init(bdDao);
}

//Encargado de comprobar que los sistemas estan cargados y por tanto cambiar de pagina a index
//Es invocado al acabar de cargar todos los subsistemas
var core_arrancado = false;
function initCallBack(){
	console.log('Init callback');
	if(!core_arrancado){
		if(GestorIdiomas!=null){
			core_arrancado = true;
			//console.log(GestorIdiomas.getLang());
			//console.log('Inyeccion CSS');
			GestorContexto.CONTEXT().UC_LANGUAGE_ID = GestorIdiomas.getLang();
			GestorContexto.setAirportTime();
			//Se hace aquí para mostrar los mensajes con los datos ya modificados
			
			
			//Al inicio se eliminan siempre los viajes antiguos y de paso se cargan los viajes
	    	GestorViajes.deleteOldTravels(GestorViajes.loadTravels);
	    	GestorResParking.removeOldRes();
	    
			
			GestorAirports.updateAirports();
			
			
			loadPanelFlights();
			
            // FJORDAN:
            // Start Google Analytics v3.x
            window.plugins.analytics.startTrackerWithId(
                // Tracker Id
                Constantes.GOOGLE_ANALYTICS_ID,
                // Success
                function() {
                    console.log('FJORDAN > GOOGLE ANALYTICS > Started GAnalytics');
                },
                // Error
                function() {
                    console.log('FJORDAN > GOOGLE ANALYTICS > Failed to start GAnalytics');
                }
            );
            
            // TODO: Remove, this is JUST for debug !
            window.plugins.analytics.debugMode();
            // /FJORDAN

            /*
			window.plugins.analytics.start(
				function(){
					console.log('Started GAnalytics');
					},
				function(){
					console.log('Failed to start GAnalytics');
				});
			*/
			//RP - 1.2.1 FIX - Se calcula el height para evitar problemas de teclado
			if(initialWindowHeight==null){
				initialWindowHeight = $(window).height();
			}

			browseFromClick('waiting.html','none');
		}
	}
}

//SE pone aquí porque se llama desde varios sitios para resetear los paneles
function loadPanelFlights(){
		GestorContexto.setAirportTime(function(){
		GestorDepartureFlights.setParams(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID, null, GestorAirports.applyAirportMarginDateTimeFrom(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,true), GestorAirports.applyAirportMarginDateTimeTo(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,true), null, null, null, null, 40, null, 'N');
		GestorDepartureFlights.findDepartureFlights(null, null);
		
		GestorArrivalFlights.setParams(null, GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID, GestorAirports.applyAirportMarginDateTimeFrom(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,false), GestorAirports.applyAirportMarginDateTimeTo(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,false), null, null, null, null, 40, null, 'N');
		GestorArrivalFlights.findArrivalFlights(null, null);	
	});
}

function exitApp(){
	navigator.app.exitApp();
}

//Controlador hacia atras para emplear en los botones y en los eventos
function backAction(e){
	//$.mobile.showPageLoadingMsg();
	//console.log('Pa atras');
    console.log("FJORDAN: backAction: " + History.topPage());
    if(e!=null)
    	e.preventDefault();
    
    if(mobiScrollShowing!=null){ //se esta mostrando el mobiscroll
   		mobiScrollShowing.hide();
    } else { //No se esta mostrando el mobiscroll
    	if(History.size()==0){
          //console.log('Vacia la pila, salimos');
          //showConfirm(GestorIdiomas.getLiteral('exit_app'),exitApp);
          exitApp();
          
      	}
  		else { //Hay historia (Vaciar siempre la pila antes de cambiar)
  			if(History.topPage()=='#index'){
  		  		//Como es index, vacio la pila
  		  		History.clear();
          		GestorAirports.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
          		browse("index.html","none");

     		} else if(History.topPage()=='#panel_vuelos'){
     	  		History.pop();
          		browse("panel_vuelos.html","none");          		

     		} else if(History.topPage()=='#detalle_vuelo'){
     	  		History.pop();
          		browse( "detalle_vuelo.html","none");
        	} else if(History.topPage()=='#detalle_poi'){
     	  		History.pop();
          		browse( "detalle_poi.html","none");
     		} else if(History.topPage()=='#lista_vuelos'){
     	  		History.pop();
          		browse( "lista_vuelos.html","none");
     		} else if(History.topPage()=='#notificaciones'){
     	  		History.pop();
          		browse( "notificaciones.html","none");
     		} else if(History.topPage()=='#planificador'){
     	  		History.pop();
          		browse( "planificador.html","none");
     		} else if(History.topPage()=='#pois'){
     	  		History.pop();
          		browse( "pois.html","none");
     		} else if(History.topPage()=='#preferencias'){
     	  		History.pop();
          		browse( "preferences.html","none");
     		} else if(History.topPage()=='#buscar_vuelos'){
     	  		History.pop();
          		browse( "buscar_vuelos.html","none");
     		} else if(History.topPage()=='#opciones'){
     	  		History.pop();
          		browse( "opciones.html","none");
     		} else if(History.topPage()=='#plaza_parking'){
     	  		History.pop();
          		browse( "plaza_parking.html","none");
     		} else if(History.topPage()=='#reservas'){
     	  		History.pop();
          		browse( "reservas.html","none");
     		} else if(History.topPage()=='#search'){
     	  		History.pop();
          		browse( "search.html","none");
     		} else if(History.topPage()=='#promotions'){
     	  		History.pop();
          		browse( "lista_promociones.html","none");
     		}
     	}
     }
     //$.mobile.hidePageLoadingMsg();
}

/**Hace de controlador para cuando en los Android se vuelve atrás con el botón*/
function createBackController() {
    document.addEventListener("backbutton", function(e){
    	backAction(e);
   }, false);
   
}

//Se llama desde todas las pantallas para ejecutar las traducciones, la codBar, publicidad... 
function initPage(page){
	
	//console.log('Estamos con el INIT - ' + page);
	
	if($('#' + ConstPages.Element_CodBar).length){
		paintCODBar(ConstPages.Element_CodBar);
	} 

	if($('#' + ConstPages.Element_Banner).length){
		GestorBanners.paintBanner(ConstPages.Element_Banner);
	} 
	
	if($('#' + ConstPages.Element_Surveys).length){
		GestorSurveys.paintSurveys(ConstPages.Element_Surveys);
	}
	
	if($('#' + ConstPages.Element_Menu).length){
		paintMenu(ConstPages.Element_Menu);
	}
	
	GestorIdiomas.refresca(page);
	ActualPage = page.id;
	$(page).trigger('create');

}


function paintCODBar(targetId){
	var _id = '#';
	if($.objectHasContent(targetId)){
		_id += targetId;
	}else{
		_id += ConstPages.Element_CodBar;
	}
	
	if($(_id).length){
		$(_id).replaceWith(getCODBar());
		//$(_id).trigger('create');
	}
}

function paintUpdatingCODBar(targetId){
	var _id = '#';
	if($.objectHasContent(targetId)){
		_id += targetId;
	}else{
		_id += ConstPages.Element_CodBar;
	}
	
	if($(_id).length){
		$(_id).replaceWith(getUpdatingCODBar());
	}
}


function paintMenu(targetId){
	$('#' + targetId).replaceWith(_getMenu()).trigger('refresh');
}

function _getMenu(){
	
	var htmlData;
	 htmlData='<div id="divMenu" class="divMenu" ><div data-role="navbar" class="nav-glyphish"><ul>';
		 htmlData+='<li ><a href="javascript:eventFooterVuelos();navigatePanelFlights(false);" id="mnu_buscar_vuelos" data-theme="footerNavbar" data-icon="custom"></a></li>';
		 htmlData+='<li ><a href="javascript:eventFooterPlanner();browseFromClick(\'planificador.html\',\'none\',null,false);" id="mnu_planificador" data-theme="footerNavbar" data-icon="custom"></a></li>';
		 htmlData+='<li ><a href="javascript:eventFooterTransport();navigateMenuTansportPOIs(false);" id="mnu_transportes" data-theme="footerNavbar" data-icon="custom"></a></li>';
		 htmlData+='<li ><a href="javascript:eventFooterTiendas();navigateMenuShopPOIs(false);" id="mnu_tiendas" data-theme="footerNavbar" data-icon="custom"></a></li>';
		 htmlData+='<li ><a href="javascript:eventFooterServicios();navigateMenuServicesPOIs(false);" id="mnu_servicios" data-theme="footerNavbar" data-icon="custom"></a></li>';
		 htmlData+='<li ><a href="javascript:eventFooterSearch();navigateMenuSearch();" id="mnu_search" data-theme="footerNavbar" data-icon="custom"></a></li>';
	 htmlData+='</ul></div></div>';

	return htmlData;
}




						


/**
 *Hace tracking añadir vuelo al planificador
 */
function eventDetalleAddFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Añadir a Mis Vuelos", null, null, function() {
		//console.log('Success Event: Añadir a Mis Vuelos')
	}, function() {
		//console.log('Fail Event: Añadir a Mis Vuelos')
	});
}

/**
 *Hace tracking quitar vuelo al planificador
 */
function eventDetalleDelFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Quitar de Mis Vuelos", null, null, function() {
		//console.log('Success Event: Quitar de Mis Vuelos')
	}, function() {
		//console.log('Fail Event: Quitar de Mis Vuelos')
	});
}

/**
 *Hace tracking del estado de la localizacion
 */
function eventLoc(value) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var valStr;
	if (value) {
		valStr = ConstF.analyticsBoolSi;
	} else {
		valStr = ConstF.analyticsBoolNo;
	}
	window.plugins.analytics.trackEvent(catStr, "Localizacion", valStr, null, function() {
		//console.log('Success Event: Localizacion ' + valStr)
	}, function() {
		//console.log('Fail Event: Localizacion ' + valStr)
	});
}

/**
 *Hace tracking del estado de las notificaciones
 */
function eventNotif(value) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var valStr;
	if (value) {
		valStr = ConstF.analyticsBoolSi;
	} else {
		valStr = ConstF.analyticsBoolNo;
	}
	window.plugins.analytics.trackEvent(catStr, "Notificaciones", valStr, null, function() {
		//console.log('Success Event: Notificaciones ' + valStr)
	}, function() {
		//console.log('Fail Event: Notificaciones ' + valStr)
	});
}

/**
 *Hace tracking del estado de las notificaciones
 */
function eventLang(value) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Idioma", value, null, function() {
		//console.log('Success Event: Idioma ' + value)
	}, function() {
		//console.log('Fail Event: Idioma ' + value)
	});
}

/**
 * Funciones Globales que usan todas las paginas de analytics
 */

/**
 * Devuelve el string de la categoria de los eventos 
 */
function getCategory(page){
	var catStr;
	switch(page) {
		case "buscar_vuelos":
			if (_searchMode == 'llegadas'){
 				catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-BusquedaVuelosLlegada";
		 	}else if (_searchMode == 'salidas'){
 				catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-BusquedaVuelosSalida";
			}else{//_searchMode == 'numVuelo' - - Default mode
 				catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-BusquedaVuelosNumVuelo";
			}
			break;
		case "detalle_poi":
			var params = GestorPOIDetails.getParameters();
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-DetallePOI";
			catStr += "-" + params.CATEGORY + "-" + params.TYPE + "-" + params.NAME;
			break;
		case "detalle_vuelo":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-DetalleVuelo";
			break;
		case "lista_vuelos":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-ResultadoBusquedaVuelos";
			break;
		case "opciones":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-MenuAdicional";
			break;
		case "notificaciones":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Notificaciones";
			break;
		case "panel_vuelos":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID;
			if (tabSalidas) {
				catStr += "-PanelVuelosSalida";
			} else {
				catStr += "-PanelVuelosLlegada";
			}
			break;
		case "planificador":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-MisVuelos";
			break;
		case "preferencias":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Configuracion";
			break;
		case "pois":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-ListadoPOIsMapas-";
			if(originPOI=='transport'){
				catStr += 'Transportes';
			} else if(originPOI=='shops'){
				catStr += 'Tiendas';
			} else if(originPOI=='others'){
				catStr += 'Servicios';
			}
			break;
		case "select_airport":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-CambioAeropuerto";
			break;
		case "index":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Home";
			break;
		case "waiting":
			catStr = "Cargando";
			break;
		case "survey_list":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Encuestas";
			break;				
		case "search":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-BusquedaAeropuerto";
			break;	
		case "reservas":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-ReservaParking";
			break;
		case "promotions":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Promociones";
			break;	
		case "plaza_parking":
			catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-MisVuelos";
			break;			
			
	
	}
	
	return catStr;
}

/**
 *					       EVENTOS GENERICOS
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/


/**
 * Tracking de la pagina
 */
function trackPage(pageId) {
	var catStr;
	
	if(pageId!=null){
		catStr = getCategory(pageId);
	} else{
		catStr = getCategory($.mobile.activePage.attr('id'));
	}
	window.plugins.analytics.trackView(catStr, function() {
		console.log("Track-"+catStr+" success");
	}, function() {
		console.log("Track-"+catStr+" failure");
	});
}

/**
 *Hace tracking del boton de volver
 */
function eventBack() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Volver", null, null, function() {
		//console.log('Success Event: Back')
	}, function() {
		//console.log('Fail Event: Back')
	});
}

/**
 *Hace tracking del boton de home
 */
function eventHome() {
    console.log('FJORDAN: Llamando a eventHome');
    
	var attr_id = $.mobile.activePage.attr('id');
	var catStr = getCategory(attr_id);
	window.plugins.analytics.trackEvent(catStr, "Home", null, null, function() {
		console.log('FJORDAN: Success Event: Home');
	}, function() {
		console.log('FJORDAN: Fail Event: Home');
	});
}

/**
 *					        EVENTOS FOOTER
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/


/**
 * Evento footer para los vuelos
 */
function eventFooterVuelos() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Vuelos", null, function() {
			//console.log('Success Event: Menu pie Grupo Vuelos')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo Vuelos')
		});
	}
}

/**
 * Evento footer para el planificador
 */
function eventFooterPlanner() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Mis Vuelos", null, function() {
			//console.log('Success Event: Menu pie Grupo Mis Vuelos')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo Mis Vuelos')
		});
	}
}

/**
 * Evento footer para transportes y parkings
 */
function eventFooterTransport() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Transporte y parking", null, function() {
			//console.log('Success Event: Menu pie Grupo Transporte y parking')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo Transporte y parking')
		});
	}
}

/**
 * Evento footer para tiendas y restaurantes
 */
function eventFooterTiendas() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Tiendas y ocio", null, function() {
			//console.log('Success Event: Menu pie Grupo Tiendas y ocio')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo Tiendas y ocio')
		});
	}
}

/**
 * Evento footer para VIP y otros servicios
 */
function eventFooterServicios() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Otros servicios", null, function() {
			//console.log('Success Event: Menu pie Grupo Otros servicios')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo Otros servicios')
		});
	}
}

/**
 * Evento footer para settings
 */
function eventFooterSettings() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "MenuAdicional", null, function() {
			//console.log('Success Event: Menu pie Grupo MenuAdicional')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo MenuAdicional')
		});
	}
}

/**
 * Footer event for Search screen.
 */
function eventFooterSearch() {
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	if (catStr != "") {
		window.plugins.analytics.trackEvent(catStr, "Menu pie Grupo", "Search", null, function() {
			//console.log('Success Event: Menu pie Grupo MenuAdicional')
		}, function() {
			//console.log('Fail Event: Menu pie Grupo MenuAdicional')
		});
	}
}

/**
 *					       EVENTOS CODBAR
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/


/**
 * Evento para cuando se hace click en la codbar 
 * @param {Object} hasFlight
 */
function eventClickCodbar(hasFlight){
	var currPage = $.mobile.activePage.attr('id');
	var catStr = "";
	catStr = getCategory(currPage);
	
	var action;
	if(hasFlight){
		action = "Ver Vuelo";
	} else{
		action = "Buscar Vuelo";
	}
	
	var label;
	switch(currPage){
		case "index":
			label = "Home";
			break;
		case "panel_vuelos":
			if (tabSalidas) {
				label = "PanelVuelosSalida";
			} else {
				label = "PanelVuelosLlegada";
			}
			break;
		case "buscar_vuelos":
			if (_searchMode == 'llegadas'){
 				label = "BusquedaVuelosLlegada";
		 	}else if (_searchMode == 'salidas'){
 				label = "BusquedaVuelosSalida";
			}else{//_searchMode == 'numVuelo' - - Default mode
 				label = "BusquedaVuelosNumVuelo";
			}
			break;
		case "lista_vuelos":
			label = "ResultadoBusquedaVuelos";
			break;
		case "planificador":
			label = "MisVuelos";
			break;
		case "detalle_vuelo":
			label = "DetalleVuelo";
			break;
		case "detalle_poi":
			label = "DetallePOI";
			break;
		case "notificaciones":
			label = "Notificaciones";
			break;
		case "pois":
			label = "ListadoPOIsMapas";
			break;
		case "search":
			label = "BusquedaAeropuerto";
			break;
		case "reservas":
			label = "ReservaParking";
			break;
		case "survey_list":
			label = "Encuestas";
			break;	
		case "promotions":
			label = "Promociones";
			break;
		case "plaza_parking":
			label = "MisVuelos";
			break;
	}
	
	if (catStr != "" && action != "" && label != "") {
		window.plugins.analytics.trackEvent(catStr, action, label, null, function() {
			//console.log('Success Event: CODBAR '+catStr+' '+ action + ' '+label)
		}, function() {
			//console.log('Fail Event: CODBAR '+catStr+' '+ action + ' '+label)
		});
	}
}



/**
 *Hace tracking del boton de seleccionar el mas cercano
 */
function eventSelectNear() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Seleccionar mas cercano", null, null, function() {
		//console.log('Success Event: Seleccionar mas cercano')
	}, function() {
		//console.log('Fail Event: Seleccionar mas cercano')
	});
}

/**
 *Hace tracking al seleccionar un aeropuerto
 */
function eventSelect(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Seleccionar", iata, null, function() {
		//console.log('Success Event: Seleccionar:'+iata)
	}, function() {
		//console.log('Fail Event: Seleccionar:'+iata)
	});
}

/**
 *Hace tracking del boton de aceptar
 */
function eventAceptar() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Aceptar", null, null, function() {
		//console.log('Success Event: Aceptar')
	}, function() {
		//console.log('Fail Event: Aceptar')
	});
}

/**
 *Hace tracking del boton de cancelar
 */
function eventCancelar() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Cancelar", null, null, function() {
		//console.log('Success Event: Cancelar')
	}, function() {
		//console.log('Fail Event: Cancelar')
	});
}

/**
 *Hace tracking de acceder a la configuracion
 */
function eventConfig() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Configuracion", null, null, function() {
		//console.log('Success Event: Configuracion')
	}, function() {
		//console.log('Fail Event: Configuracion')
	});
}

/**
 *Hace tracking de acceder al cambio de aeropuerto
 */
function eventChangeAirport() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Cambiar aeropuerto", null, null, function() {
		//console.log('Success Event: Cambiar aeropuerto')
	}, function() {
		//console.log('Fail Event: Cambiar aeropuerto')
	});
}

/**
 *Hace tracking de acceder a la informacion al pasajero
 */
function eventInfoPassenger() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Informacion al pasajero", null, null, function() {
		//console.log('Success Event: Informacion al pasajero')
	}, function() {
		//console.log('Fail Event: Informacion al pasajero')
	});
}

/**
 *Hace tracking al acceder al detalle de un vuelo de la lista
 */
function eventListaSeeFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Ver Vuelo", null, null, function() {
		//console.log('Success Event: Ver Vuelo')
	}, function() {
		//console.log('Fail Event: Ver Vuelo')
	});
}

/**
 *Hace tracking de la descarga de cupones de promociones
 */
function eventDescargarCupon(idPromo) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "DescargarPromocion", idPromo, null, function() {
		//console.log('Success Event: Vuelos')
	}, function() {
		//console.log('Fail Event: Vuelos')
	});
}


/**
 *Hace tracking de visitar los POIs de una promocion
 */
function eventVisitarEstablecimiento(idPromo) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "VisitarEstablecimiento", idPromo, null, function() {
		//console.log('Success Event: Vuelos')
	}, function() {
		//console.log('Fail Event: Vuelos')
	});
}

/**
 *Hace tracking filtrar promociones por categoría
 */
function eventFiltrarPromocion(idPCategoria) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "FiltrarPromocion", idPCategoria, null, function() {
		//console.log('Success Event: Vuelos')
	}, function() {
		//console.log('Fail Event: Vuelos')
	});
}

/**
 *Hace tracking del boton de favoritos
 */
function eventFavoritos() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Favoritos", null, null, function() {
		//console.log('Success Event: Favoritos')
	}, function() {
		//console.log('Fail Event: Favoritos')
	});
}

/**
 *Hace tracking del cambio de terminal
 */
function eventChangeTerminal(terminal) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Seleccione terminal", terminal, null, function() {
		//console.log('Success Event: Seleccione terminal '+terminal)
	}, function() {
		//console.log('Fail Event: Seleccione terminal '+terminal)
	});
}

/**
 *Hace tracking del cambio de planta
 */
function eventChangeFloor(floor) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Seleccione planta", floor, null, function() {
		//console.log('Success Event: Seleccione planta '+floor)
	}, function() {
		//console.log('Fail Event: Seleccione planta '+floor)
	});
}

/**
 *Hace tracking del cambio de categoria
 */
function eventSelectCat(cat) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Seleccion grupo", cat, null, function() {
		//console.log('Success Event: Seleccion grupo '+cat)
	}, function() {
		//console.log('Fail Event: Seleccion grupo '+cat)
	});
}

/**
 *Hace tracking del cambio de planta
 */
function eventPoiDetail(cat,tipo) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, cat, tipo, null, function() {
		//console.log('Success Event: '+cat+' '+tipo)
	}, function() {
		//console.log('Fail Event: '+cat+' '+tipo)
	});
}

/**
 *Hace tracking del cambio de planta
 */
function eventPoiFavourite(cat,tipo) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, cat, "Favorito-"+tipo, null, function() {
		//console.log('Success Event: '+cat+' '+"Favorito-"+tipo)
	}, function() {
		//console.log('Fail Event: '+cat+' '+"Favorito-"+tipo)
	});
}

/*
tracking del bot�n mapa de un POI
*/
function eventPoiListMap(cat,tipo) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, cat, "Mapa-"+tipo, null, function() {
		//console.log('Success Event: '+cat+' '+"Mapa-"+tipo)
	}, function() {
		//console.log('Fail Event: '+cat+' '+"Mapa-"+tipo)
	});
}


function eventPoiListSearchText(textSearch) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Buscar POI", textSearch, null, function() {
		//console.log('Success Event: '+ "Buscar POI" +' '+ textSearch);
	}, function() {
		//console.log('Fail Event: '+"Buscar POI"+' '+ textSearch);
	});
}


/**
 *Hace tracking de ocultar o mostrar el slider de categorias
 */
function eventSlideCat(expand) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var label;
	if(expand){
		label = "Mostrar";
	} else{
		label = "Ocultar";
	}
	window.plugins.analytics.trackEvent(catStr, "Plegado grupos", label, null, function() {
		//console.log('Success Event: Plegado grupos '+label)
	}, function() {
		//console.log('Fail Event: Plegado grupos '+label)
	});
}

/**
 *Hace tracking de ocultar o mostrar el slider del listado
 */
function eventSlideListado(expand) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var label;
	if(expand){
		label = "Mostrar";
	} else{
		label = "Ocultar";
	}
	window.plugins.analytics.trackEvent(catStr, "Plegado lista", label, null, function() {
		//console.log('Success Event: Plegado lista '+label)
	}, function() {
		//console.log('Fail Event: Plegado lista '+label)
	});
}


function eventActiveSearchPos() {
	var catStr = getCategory($.mobile.activePage.attr('id'));

	window.plugins.analytics.trackEvent(catStr, "Mostrar Panel Busqueda", null, null, function() {
		//console.log('Success Event: Mostrar Panel Busqueda ')
	}, function() {
		//console.log('Fail Event: Mostrar Panel Busqueda ')
	});
}


/**
 *					      EVENTOS DEL MAPA
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/

/**
 *Hace tracking al seleccionar un POI en el mapa
 */
function eventMapSelectPOI(categoria) {
	var catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Mapas";
	window.plugins.analytics.trackEvent(catStr, "POI", categoria, null, function() {
		//console.log('Success Event: POI '+categoria)
	}, function() {
		//console.log('Fail Event: POI '+categoria)
	});
}

/**
 *Hace tracking al ir al detalle de un POI desde el mapa
 */
function eventMapPOIDetail(categoria) {
	var catStr = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID + "-Mapas";
	window.plugins.analytics.trackEvent(catStr, "Boton POI", categoria, null, function() {
		//console.log('Success Event: Boton POI '+categoria)
	}, function() {
		//console.log('Fail Event: Boton POI '+categoria)
	});
}



/**
 *Hace tracking del Mapa desde detalle
 */
function eventPoiDetailMap() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Mapa", null, null, function() {
		//console.log('Success Event: '+cat+' '+tipo)
	}, function() {
		//console.log('Fail Event: '+cat+' '+tipo)
	});
}


/**
 *Hace tracking de Reserva de parking desde detalle
 */
function eventPoiDetailRes() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Reserva de Parking", null, null, function() {
		//console.log('Success Event: '+cat+' '+tipo)
	}, function() {
		//console.log('Fail Event: '+cat+' '+tipo)
	});
}



function eventSearchAirportSearchText(textSearched) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Buscar Texto", textSearched, null, function() {
		//console.log('Success Event: Buscar Texto')
	}, function() {
		//console.log('Fail Event: Buscar Texto')
	});
}


function eventSearchAirportTerminal(terminalName) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Terminal", terminalName, null, function() {
		//console.log('Success Event: Terminal')
	}, function() {
		//console.log('Fail Event: Terminal')
	});
}


function eventSearchAirportCat(catSearched) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Categoria", catSearched, null, function() {
		//console.log('Success Event: Categoria')
	}, function() {
		//console.log('Fail Event: Categoria')
	});
}


/**
 *Hace tracking del boton de Vuelos
 */
function eventBuscadorVuelos() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Boton buscador vuelos", null, null, function() {
		//console.log('Success Event: Boton buscador vuelos')
	}, function() {
		//console.log('Fail Event: Boton buscador vuelos')
	});
}

/**
 *Hace tracking de los cambios de pestaña
 */
function eventPanelChangeTab(newTab) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var cat;
	if(newTab=='salidas'){
		cat = "Salidas";
	} else if(newTab=='llegadas'){
		cat = "Llegadas";
	}
	window.plugins.analytics.trackEvent(catStr, cat, null, null, function() {
		//console.log('Success Event: '+catStr+' '+cat)
	}, function() {
		//console.log('Fail Event: '+catStr+' '+cat)
	});
}

/**
 *Hace tracking al navegar al vuelo
 */
function eventPanelSelectVuelo() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var label;
	if(tabSalidas){
		label="ListaVuelosSalida";
	} else{
		label="ListaVuelosLlegada";
	}
	window.plugins.analytics.trackEvent(catStr, "Ver Vuelo", label, null, function() {
		//console.log('Success Event: '+catStr + " "+label)
	}, function() {
		//console.log('Fail Event: '+catStr+ " "+label)
	});
}

/**
 *Hace tracking del boton de Vuelos
 */
function eventVuelos() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Vuelos", null, null, function() {
		//console.log('Success Event: Vuelos')
	}, function() {
		//console.log('Fail Event: Vuelos')
	});
}

/**
 *Hace tracking del boton de Mis Vuelos
 */
function eventMisVuelos() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Mis vuelos", null, null, function() {
		//console.log('Success Event: Mis vuelos')
	}, function() {
		//console.log('Fail Event: Mis vuelos')
	});
}

/**
 *Hace tracking del boton de Transportes y parking
 */
function eventTransp() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Transportes y parking", null, null, function() {
		//console.log('Success Event: Transportes y parking')
	}, function() {
		//console.log('Fail Event: Transportes y parking')
	});
}

/**
 *Hace tracking del boton de Tiendas y Restaurantes
 */
function eventTiendas() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Tiendas", null, null, function() {
		//console.log('Success Event: Tiendas y Restaurantes')
	}, function() {
		//console.log('Fail Event: Tiendas y Restaurantes')
	});
}

/**
 *Hace tracking del boton de Restaurantes
 */
function eventRestaurantes() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Restaurantes", null, null, function() {
		//console.log('Success Event: Tiendas y Restaurantes')
	}, function() {
		//console.log('Fail Event: Tiendas y Restaurantes')
	});
}
/**
 *Hace tracking del boton de PMR
 */
function eventPMR() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Personas Movilidad Reducida", null, null, function() {
		//console.log('Success Event: Personas Movilidad Reducida')
	}, function() {
		//console.log('Fail Event: Personas Movilidad Reducida')
	});
}
/**
 *Hace tracking del boton de Servicios y Salas VIP
 */
function eventServices() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Servicios y Salas VIP", null, null, function() {
		//console.log('Success Event: Servicios y Salas VIP')
	}, function() {
		//console.log('Fail Event: Servicios y Salas VIP')
	});
}

function eventReservaSalaVIP() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Reserva Salas VIP", null, null, function() {
		//console.log('FJORDAN: Success Event: Servicios y Salas VIP');
	}, function() {
		//console.log('FJORDAN: Fail Event: Servicios y Salas VIP');
	});
}
/**
 *Hace tracking del boton de Otras opciones
 */
function eventOtros() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Otras opciones", null, null, function() {
		//console.log('Success Event: Otras opciones')
	}, function() {
		//console.log('Fail Event: Otras opciones')
	});
}


/**
 *RPS - 12/03/14  
 *Hace tracking del boton de Social Sharing
 */
function eventSocialSharing() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Social Sharing", null, null, function() {
		//console.log('Success Event: SocialSharing')
	}, function() {
		//console.log('Fail Event: SocialSharing')
	});
}

/**
 *RPS - 12/03/14  
 *Hace tracking del boton de Wifi
 */
function eventWifi() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Wifi", null, null, function() {
		//console.log('Success Event: Wifi')
	}, function() {
		//console.log('Fail Event: Wifi')
	});
}


/**
 *RPS - 12/03/14 
 *Hace tracking del boton de Social Sharing
 * Se estqaba utilizando eventSearch y no tiene nada que ver, ese era para 
 */
function eventSearchPOI() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Search", null, null, function() {
		//console.log('Success Event: Search')
	}, function() {
		//console.log('Fail Event: Search')
	});
}


/**
 *RPS - 15/05/14 
 *Hace tracking del boton de Reserva de Parkings
 */
function eventReservaParking() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Reserva de Parking", null, null, function() {
		//console.log('Success Event: Reserva de Parking')
	}, function() {
		//console.log('Fail Event: Reserva de Parking')
	});
}

/**
 *Hace tracking del boton de Notificaciones
 */
function eventIndexNotif() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Notificaciones", null, null, function() {
		//console.log('Success Event: Notificaciones')
	}, function() {
		//console.log('Fail Event: Notificaciones')
	});
}
/**
 *Hace tracking de acceder al listado de encuestas
 */
function eventShowSurveys() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Encuestas", null, null, function() {
	}, function() {
	});
}

/**
 *Hace tracking de acceder al listado de encuestas
 */
function eventShowPromotions() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Promociones", null, null, function() {
	}, function() {
	});
}

/**
 *Hace tracking cuando pulsas al boton de añadir
 */
function eventAddFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Añadir a Mis Vuelos", null, null, function() {
		//console.log('Success Event: Añadir a Mis Vuelos')
	}, function() {
		//console.log('Fail Event: Añadir a Mis Vuelos')
	});
}

/**
 *Hace tracking quitar vuelo al planificador
 */
function eventDelFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Quitar de Mis Vuelos", null, null, function() {
		//console.log('Success Event: Quitar de Mis Vuelos')
	}, function() {
		//console.log('Fail Event: Quitar de Mis Vuelos')
	});
}

/**
 *Hace tracking al ver un vuelo del planificador
 */
function eventSeeFlight() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Ver Vuelo", null, null, function() {
		//console.log('Success Event: Ver Vuelo')
	}, function() {
		//console.log('Fail Event: Ver Vuelo')
	});
}

/**
 *Hace tracking cuando pulsas al boton de anular Parking
 */
function eventAnulParking() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Anular Reserva Parking", null, null, function() {
		//console.log('Success Event: Anular Reserva Parking')
	}, function() {
		//console.log('Fail Event: Anular Reserva Parking')
	});
}

/**
 *Hace tracking quitar Parking al planificador
 */
function eventDelParking() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Quitar Reserva Parking", null, null, function() {
		//console.log('Success Event: Quitar Reserva Parking')
	}, function() {
		//console.log('Fail Event: Quitar Reserva Parking')
	});
}

/**
 *Hace tracking quitar Parking al planificador
 */
function eventSaveParkingPlace() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Guardar Plaza", null, null, function() {
		//console.log('Success Event: Guardar Plaza')
	}, function() {
		//console.log('Fail Event: Guardar Plaza')
	});
}

/**
 *Hace tracking al ver un Parking del planificador
 */
function eventSeeParking() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Ver Parking", null, null, function() {
		//console.log('Success Event: Ver Parking')
	}, function() {
		//console.log('Fail Event: Ver Parking')
	});
}

/**
 *Hace tracking cuando salta un error de conexion
 */
function eventErrorConexion() {
	window.plugins.analytics.trackEvent("Cargando", "ErrorConexion", null, null, function() {
		//console.log('Success Event: ErrorConexion')
	}, function() {
		//console.log('Fail Event: ErrorConexion')
	});
}

/**
 *Hace tracking cuando salta un error de servidor
 */
function eventErrorServer() {
	window.plugins.analytics.trackEvent("Cargando", "ErrorServidor", null, null, function() {
		//console.log('Success Event: ErrorServidor')
	}, function() {
		//console.log('Fail Event: ErrorServidor')
	});
}

/**
 *Hace tracking del boton de reintentar check conexion
 */
function eventRetryConexion() {
	window.plugins.analytics.trackEvent("Cargando", "ReintentarConexion", null, null, function() {
		//console.log('Success Event: ReintentarConexion')
	}, function() {
		//console.log('Fail Event: ReintentarConexion')
	});
}

/**
 *Hace tracking del boton de reintentar check conexion
 */
function eventRetryServer() {
	window.plugins.analytics.trackEvent("Cargando", "ReintentarServidor", null, null, function() {
		//console.log('Success Event: ReintentarServidor')
	}, function() {
		//console.log('Fail Event: ReintentarServidor')
	});
}

/**
 *Hace tracking del boton de reservar
 */
function eventParkingReservar() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Reservar", null, null, function() {
		//console.log('Success Event: Reservar')
	}, function() {
		//console.log('Fail Event: Reservar')
	});
}


/**
 *Hace tracking del boton de buscar
 */
function eventSearch() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Boton Buscar", null, null, function() {
		//console.log('Success Event: Boton Buscar '+catStr)
	}, function() {
		//console.log('Fail Event: Boton Buscar '+catStr)
	});
}

/**
 *Hace tracking de los combos de fecha y hora
 */
function eventFechaHora(date,id) {

	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Fecha hora", id, null, function() {
		//console.log('Success Event: Fecha hora '+catStr)
	}, function() {
		//console.log('Fail Event: Fecha hora '+catStr)
	});
}

/**
 *Hace tracking de los cambios de pestaña
 */
function eventBuscarChangeTab(newTab) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	var cat;
	if(newTab=='numVuelo'){
		cat = "Vuelos";
	} else if(newTab=='salidas'){
		cat = "Salidas";
	} else if(newTab=='llegadas'){
		cat = "Llegadas";
	}
	window.plugins.analytics.trackEvent(catStr, cat, null, null, function() {
		//console.log('Success Event: '+catStr+' '+cat)
	}, function() {
		//console.log('Fail Event: '+catStr+' '+cat)
	});
}


/**
 *					    TAB BUSCAR NUM VUELO
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/

/**
 *Hace tracking del boton de Leer Codigo
 */
function eventReadCode() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Leer codigo", null, null, function() {
		//console.log('Success Event: Leer codigo')
	}, function() {
		//console.log('Fail Event: Leer codigo')
	});
}

/**
 *Hace tracking al cambiar el aeropuerto
 */
function eventNumVueloAirport(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Aeropuerto", iata, null, function() {
		//console.log('Success Event: Aeropuerto '+iata)
	}, function() {
		//console.log('Fail Event: Aeropuerto '+iata)
	});
}

/**
 *Hace tracking al cambiar el aeropuerto
 */
function eventNumVueloNumVuelo() {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Numero de vuelo", null, null, function() {
		//console.log('Success Event: Numero de vuelo')
	}, function() {
		//console.log('Fail Event: Numero de vuelo')
	});
}

/**
 *					     TAB BUSCAR SALIDAS
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/

/**
 *Hace tracking al cambiar el aeropuerto de origen
 */
function eventSalidasOrigen(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Origen", iata, null, function() {
		//console.log('Success Event: Origen '+iata)
	}, function() {
		//console.log('Fail Event: Origen '+iata)
	});
}

/**
 *Hace tracking al cambiar el aeropuerto de destino
 */
function eventSalidasDestino(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Destino", iata, null, function() {
		//console.log('Success Event: Destino '+iata)
	}, function() {
		//console.log('Fail Event: Destino '+iata)
	});
}

/**
 *Hace tracking al cambiar la compañia
 */
function eventSalidasCia(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Compañia", iata, null, function() {
		//console.log('Success Event: Compañia '+iata)
	}, function() {
		//console.log('Fail Event: Compañia '+iata)
	});
}

/**
 *					     TAB BUSCAR LLEGADAS
 *                           ___________
 *                          _     |     _
 *                         / \   _|_   / \
 *                        ( O )-/   \-( O )
 *   _                     \_/ /\___/\ \_/                     _
 *  (_)_______________________( ( . ) )_______________________(_) -mj
 *                             \_____/
 **/

/**
 *Hace tracking al cambiar el aeropuerto de origen
 */
function eventLlegadasOrigen(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Origen", iata, null, function() {
		//console.log('Success Event: Origen '+iata)
	}, function() {
		//console.log('Fail Event: Origen '+iata)
	});
}

/**
 *Hace tracking al cambiar el aeropuerto de destino
 */
function eventLlegadasDestino(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Destino", iata, null, function() {
		//console.log('Success Event: Destino '+iata)
	}, function() {
		//console.log('Fail Event: Destino '+iata)
	});
}

/**
 *Hace tracking al cambiar la compañia
 */
function eventLlegadasCia(iata) {
	var catStr = getCategory($.mobile.activePage.attr('id'));
	window.plugins.analytics.trackEvent(catStr, "Compañia", iata, null, function() {
		//console.log('Success Event: Compañia '+iata)
	}, function() {
		//console.log('Fail Event: Compañia '+iata)
	});
}


/*Variable global que almacena temporalmente el diccionario en la carga dinamica*/
var dictInObj;

/**
 * Gestor de Idiomas
 */
function _GestorIdiomas() {
	var me = this;

	var lang_disponibles = [];
	var lang_actual;//Por defecto

	/**
	 *Inicializa el gestor de idiomas cargando los disponibles y estableciendo el que se tenga en preferencias 
	 */
	me.init=function(callBack){
	
		me.addLang('es_ES');
		me.addLang('en_GB');
    	//console.log('Anadidos los lenguajes');
		GestorSettings.getSetting('LANGUAGE_ID',function(data){

			var lang = "es_ES";
			
			if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
			{
				console.log('getSetting LANGUAGE_ID:' + JSON.stringify(data));
				lang = data[0].SETTING_VALUE;
			} 
			
			me.setLang(lang,callBack);	
		},
		function(err){
			console.log('Error en la recuperación de setting LANGUAGE_ID: ' + err);
			me.setLang("es_ES",callBack);	
		});
		
	};


	/**
	 * Anade el lenguaje a los disponibles (es, en, fr...)
	 * @param {Object} id
	 * devuelve false si ya existe, true si se anade
	 */
	me.addLang = function(id) {
		if(lang_disponibles.indexOf(id) == -1) {
			lang_disponibles.push(id);
			return true;
		} else {
			return false;
		}
	};
	/**
	 * Quita un lenguaje de los disponibles (es, en, fr...)
	 * @param {Object} id
	 * devuelve false si no existe, true si se ha quitado
	 */
	me.removeLang = function(id) {
		if(lang_disponibles.indexOf(id) != -1) {
			lang_disponibles.slice(indexOf(id), 1);
			return true;
		} else {
			return false;
		}
	};
	/**
	 * Fija el lenguaje a emplear (Si existe otro, automaticamente se actualizara la pagina)
	 * @param {Object} id El mensaje a fijar
	 * @param {Object} callback callback para cargar dinamicamente el diccionario
	 * devuelve true si lleva a cabo, false si falla o no existe el lenguaje
	 */
	me.setLang = function(id,callback) {
        //console.log('Fijar nuevo idioma'+id);
        GestorSettings.setSetting('LANGUAGE_ID',id, function (){
        	if(lang_disponibles.indexOf(id) != -1) {
				obtenerDicc(id,callback);
				lang_actual = id;
				//TODO:Refrescar traduccion al vuelo
				return true;
			} else {
				return false;
			}
        });
		
	};

	me.getLang = function() {
		return lang_actual;
	};
	
	me.getAvailableLangs = function(){
		return lang_disponibles;
	};
	
	/**
	 * Metodo privado para obtener y cargar el diccionario
	 * @param {Object} id
	 * @param {Object} callback callback para cargar dinamicamente el diccionario
	 */
	var obtenerDicc = function(id,callback) {
		//console.log('Obteniendo dicc');
        //Evitamos la cache de iOS
        var ruta;
        if(core_arrancado==false){
            ruta = "js/lang/"+id+"/js/resources.js";
        } else {
//            ruta = "lang/"+id+"/js/resources.js";
            ruta = "../../js/lang/"+id+"/js/resources.js";
            
        }
        console.log('ruta diccionario:'+ruta);
        
      
	  try {
          
          
          //Original:
	  		$.getScript(ruta, function(data, textStatus, jqxhr) {
                    // console.log('Carga diccionario:'+JSON.stringify(dictInObj));
                    jsIn.addDict(dictInObj);
                    if(callback!=null){
                        callback();
                    }
                }).fail(function(jqxhr, settings, exception) {
                    console.log('Error Carga diccionario:'+JSON.stringify(jqxhr));
                    console.log('Error Carga diccionario:'+settings);
                    console.log('Error Carga diccionario:'+exception);
			});
	  /*
		var head = document.getElementsByTagName("head")[0];
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = ruta;
		script.charset ="utf-8";
		
		script.onload = function() { 
			//Todo ok cargamos el diccionario
			console.log('Carga diccionario:'+JSON.stringify(dictInObj));
			jsIn.addDict(dictInObj);
            if(callback!=null){
                callback();
            } 
		 };
		
		script.onerror = function(e) { console.log("Fallo en nuestro apaño de getScript") };
		head.appendChild(script);
		 */
		}catch(e){
			console.log("Error de carga de diccionario getScript" + e.message) ;
		}
		
	};
	
	me.refresca = function(pag){
        //console.log('Traduciendo toda la pagina');
		//Refresca los span con lang
		$(pag).find('span[lang=true]').each(function(){
			var trad = this.id.split("|");
			var nom = trad[0];
			trad.splice(0,1);
			$(this).html(__(nom,trad));
		});
		
		// Traducción de los flips
		$(pag).find('select[lang=true][data-role=slider]').each(function(){
			var langIdValue0 = $(this).attr('langIdValue0');
			var langIdValue1 = $(this).attr('langIdValue1');
			
			if (langIdValue0 != null && langIdValue1 != null)
			{
				var langValue0 = me.getLiteral(langIdValue0);
				var langValue1 = me.getLiteral(langIdValue1);
				
				me.translateFlip(this.id,langValue0,langValue1);
			}
		});
	};
	
	me.getLiteral = function(idLiteral){
        // console.log("FJORDAN: getLiteral : " + idLiteral + " -> " + __(idLiteral));
		return __(idLiteral);
	};
	
	me.translateFlip = function (flipId, label0Text, label1Text){
		var mySlider     = $('#' + flipId);
		var activeLabel1  = $(mySlider).parent().find('span.ui-slider-label:first');
	    var activeLabel0  = $(mySlider).parent().find('span.ui-slider-label:last');
		    
		activeLabel0.text(label0Text);
		activeLabel1.text(label1Text);
	};
}

dictInObj = {
		
	//-----------------LITERALES GENERALES------------------------
	'backButton':'Volver',
	'homeButton':'Home',
	'salidas': 'Salidas',
	'llegadas': 'Llegadas',
	//-----------------------------------------------------------

	//-----------------LITERALES DE MENÚS------------------------
	'menu_title':'Otras Opciones',
	'menu_notifications':'Novedades & Ofertas',
	'menu_settings':'Configuración',
	'menu_changeAirport':'Cambiar aeropuerto',
	'menu_showSurveys' : 'Encuestas',
	'menu_showPromotions' : 'Promociones',
	'menu_vuelos': 'Vuelos',
	'menu_planificador': 'Mis vuelos',
	'menu_transportes': 'Transportes y Parking',
	'menu_tiendas': 'Tiendas y Restaurantes',
	'menu_servicios': 'Servicios y PMR',
	'menu_ajustes': 'Otras opciones',
	'menu_infoPasajero': 'Información al pasajero',
	'menu_search': 'Buscar en el aeropuerto',
	'menu_reservaParking': 'Reserva de Parking',
	'menu_reservaVIP': 'Reserva de Sala VIP',
	'menu_social_sharing':'Recomiendanos',
	'menu_searchFlights':'Buscar vuelos',
	'menu_wifi':'15 minutos gratis',
	//-----------------------------------------------------------
			
	//-----------------LITERALES DE ENCUESTAS--------------------
	"surveys_title" : "Encuestas",
	"mensaje_seleccione_encuesta" : "Elija la encuesta que desea completar",
	"mensaje_no_encuesta" : "Actualmente no hay encuestas disponibles.",
	//-----------------------------------------------------------
			
	//-----------------LITERALES DE PROMOCIONES--------------------
	"promotions_title" : "Promociones",
	"mensaje_no_promocion" : "No hay promociones en el aeropuerto.",
	"cupon" : "Cupón",
	"disponible_en" : "Disponible en...",
	"ofertas_en" : "Ofertas en",
	//-----------------------------------------------------------			
			
	//-----------------LITERALES DE INDEX------------------------
	'index_aeropuerto': 'aeropuerto',
	'error_iOS5':'Versión no soportada',
			
	'sharing_msg':'La única App oficial de Aena  con información de vuelos comerciales y servicios para toda la Red: http://goo.gl/1Hxgg6',
	'sharing_subject':'AENA',

	//-----------------------------------------------------------
					
	'constYes':'SÍ',
	'constNo':'NO',
	'constES_ES':'Español',
	'constEN_GB':'English',
			
	//-----------------SEARCH---------------------------------
	'search_all_terminals': 'Todas',
	'search_placeholder': 'Buscar',		
	'search_invalid_text': 'El filtro de texto debe contener al menos 3 caracteres',
	'search_not_found_1': 'No se han encontrado resultados con los criterios:',
	'search_not_found_2': 'Texto: ',
	'search_not_found_3': '</li><li style=\"text-align:left\">Terminal: ',
	'search_not_found_4': '</li></ul>',
	'search_not_found_5': 'Categoría: ', 	
	'search_not_found_6': 'Filtros de búsqueda utilizados:',
	'search_not_found_7': 'Planta', 
	'search_not_found_8': 'Terminal',
	'search_not_found_9': 'Categorías',
	'search_not_found_10': 'No hay filtros seleccionados',
	'search_not_found_11': 'Puede ampliar su búsqueda en:',
	'search_not_found_12': 'Todas las Categorías',
	'search_not_found_13': 'Todo el Aeropuerto',
	'search_not_found_14': 'Terminales:',
	//--------------------------------------------------------
	
	//-----------------PANEL DE VUELOS------------------------
	'panel_Title':'Panel de vuelos',
	'panel_SearchButton':'Buscador de vuelos',
	'panel_lastUpdateText':'Última actualización: ',
	//-----------------------------------------------------------
			
	'localizadorTabHeader': 'Vuelos',
	'miVueloTabHeader': 'Mi Vuelo',
	'notificationsHeader': 'Notificaciones',
	'acceptText': 'Aceptar',
	'cancelText': 'Cancelar',
	'dayText': 'Día',
	'hourText': 'Horas',
	'minuteText': 'Minutos',
	'monthText': 'Mes',
	'hoursText':' hrs. ',
	'secText': 'Segundos',
	'yearText': 'Año',
	'dateText': 'Fecha',
	'airlineText':'Aerolínea',
	'airportText':'Aeropuerto',
	'airportsText':'Aeropuertos',
	'normativesText':'Normativas',
	'doorText':'Pta.',
	'flightText':'Vuelo',
	'noDeterminedtext':'Sin determinar',
	'addText':'Añadir',
	'airportFrom':'Aeropuerto de origen',
	'airportTo':'Aeropuerto de destino',
	'gateText':'Puerta',
	'baggageRoomText':'Sala',
	'terminalText':'Terminal',
	'carouselText':'Cinta',
	'checkInCounterText':'Mostrador',
	'transportsText':'Transportes',
	'loadingMessage': ' ',
	'loadingErrorMessage':'No ha sido posible obtener la información.<p />Por favor, compruebe que tiene conectividad.',
	'loadingNoDataMessage':'No ha sido posible recuperar vuelos que cumplan con el criterio. ',
	'noVueloDeterminado':'Seleccione un vuelo >',
			
	'estimatedHour':'H.Est.:',
	'exit_app':'¿Desea salir de la aplicación?',
	'perimeterFloor':' ',
	//-----------------------------------------------------------
			
	'airport_Title':'Aeropuerto',
	'airport_CiudadesHeader':'Ciudades cercanas',
	'airport_Informacion':'Informacion',
	'airport_Tiendas':'Ocio',
	'airport_Informacion':'Info',
	'airport_Pmrs':'PMRs',
	'airport_Accesos':'Accesos',
	'airport_ServiciosMedicos':'Médico',
	'airport_Transporte':'Transporte',
	'airport_Vuelos':'Vuelos',
	'airport_ControlesSeguridad':'Seguridad',
	'airport_Planos':'Planos',
	'airport_Parking':'Parking',
			
	'prefs_Title':'Configuración',
	'prefs_dispId':'Identificador de dispositivo:',
	'prefs_dispVersion':'Versión:',
	'prefs_Localizar':'Permitir localización automática:',
	'prefs_Aeropuerto':'Aeropuerto por defecto:',
	'prefs_Notificaciones':'Permitir envío de mensajes de notificación:',
	'prefs_Idioma':'Idioma:',
			
	'city_Title':'Detalle de la ciudad',
	'city_Normativas':'Normativas',
	'city_PDI':'Puntos de interés',
			
	'comp_Title':'Detalles de la compañía',
	'comp_URL':'URL:',
	'comp_Tlfno_Info':'Teléfono de información y reservas:',
	'comp_Tlfno_Ofi':'Teléfono oficinas centrales:',
	'comp_Mostradores':'Mostradores de facturación:',
	'comp_Ver_Mostradores':'Ver mostradores en el mapa',
	'comp_Normativas':'Normativas',

	'flightSearch_Title':'Búsqueda de vuelos',
	'flightSearch_FlightNumber':'Número de vuelo',
	'flightSearch_Select2DCodeButton':'Seleccionar utilizando código 2D',
	'flightSearch_FromControl':'Origen',
	'flightSearch_ToControl':'Destino',
	'flightSearch_DateTimeControl':'Fecha/Hora desde',
	'flightSearch_DateTimeControlTo':'Fecha/Hora hasta',
	'flightSearch_DateTime_err': 'La fecha de finalización es igual o anterior a la fecha de inicio',
	'flightSearch_AirlineControl':'Compañía',
	'flightSearch_SearchButton':'Buscar',
	'flightSearch_FromComboLabel':'Aeropuerto de origen:',
	'flightSearch_ToComboLabel':'Aeropuerto de destino:',
	'flightSearch_AirlineComboLabel':'Aerolínea:',
	'flightSearch_ToAirportLoadingMessage':'Cargando aeropuertos de destino.',
	'flightSearch_ToAirportErrorMessage':'No se recuperaron destinos.',
	'flightSearch_FromAirportLoadingMessage':'Cargando aeropuertos de origen.',
	'flightSearch_FromAirportErrorMessage':'No se recuperaron orígenes.',
	'flightSearch_AirlinesLoadingMessage':'Cargando aerolíneas del aeropuerto.',
	'flightSearch_AirlinesErrorMessage':'No se recuperaron aerolíneas del aeropuerto.',
	'flightSearch_NoCorrectFlightMessage':'El número de vuelo es obligatorio.',
	'flightSearch_NoData':'No ha sido posible recuperar vuelos que cumplan con el criterio. <p />Por favor, Modifique los criterios de búsqueda.',
			
	'field_flightDetailPageTitle':'Ficha del vuelo',
	'flightDetail_defaultFlightLabel':'Vuelo Predeterminado:',
	'flightDetail_identifierLabel':'Identificador',
	'flightDetail_dateLabel':'Fecha',
	'flightDetail_airlineLabel':'Compañía',
	'flightDetail_CheckInLabel':'Mostradores facturación',
	'flightDetail_scheduledDepartureLabel':'Salida programada',
	'flightDetail_scheduledBoardingLabel':'Hora inicio embarque',
	'flightDetail_scheduledArrivalLabel':'Llegada programada',
	'flightDetail_estimatedDepartureLabel':'Salida estimada',
	'flightDetail_estimatedArrivalLabel':'Llegada estimada',
	'flightDetail_terminalLabel':'Terminal',
	'flightDetail_gateLabel':'Puerta',
	'flightDetail_checkInLabel':'Facturación',
	'flightDetail_stateLabel':'Estado',
	'flightDetail_travelAdded':'El vuelo se ha añadido a Mi viaje',
	'flightDetail_confirmTravelDelete':'¿Confirma que desea eliminar el vuelo?',
	'flightDetail_confirmResDelete':'¿Confirma que desea eliminar la reserva de parking?',
	'flightDetail_travelDeleted':'El vuelo se ha eliminado de Mi viaje',
	'flightDetail_error':'Ha ocurrido un problema al obtener la información. <p /> Por favor inténtelo de nuevo.',
	'flightDetail_NoData':'El sistema no tiene información sobre el vuelo. <p /> Verifique que no es un vuelo antiguo.',
	'flightDetail_Stopover':'Escalas',
	'flightDetail_addButton':'Añadir a Mi viaje',
			
	'codBar_title':'Su vuelo',
	'codBar_currentStateLabel':'Fase actual:',
	'codBar_AbrevTerminal':'Terminal',
	'codBar_checkInAbrevMostr':'Mostrador',
	'codBar_NoState':'Pulse para ver detalles del vuelo>',
	'codBar_AbrevGate':'Puerta',
	'codBar_AbrevBelt':'Cinta',
	'codBar_AbrevSlCta':'Sala/Cinta',
	'codBar_AbrevSl':'Sala',
	'codBar_AbrevCta':'Cinta',
	'codBar_actualizando':'Actualizando...',
	'codBar_reviseConexion':'Revise conexión',
			
	'normatives_title':'Normativas',
			
	'notifications_title':'Novedades & Ofertas',
	'notifications_NoNotif':'En esta opción encontrará novedades y ofertas disponibles en el aeropuerto',
	'notifications_NewNotif':'¡Nueva!',
			
	'planner_title':'Mi viaje',
	'planner_addButton':'Añadir vuelo',
	'planner_deleteButton':'Quitar de Mi viaje',
	'planner_noDataMessage':'<br>Añade tu vuelo y te mantendremos informado.<br><br>',
	'planner_deleteTravelWarning':'¿Confirma que desea eliminar el viaje?',
	'planner_FechaSal':'Sal. ',
	'planner_FechaArr':'LLg. ',
	'planner_cancel_info': 'Sus datos para realizar la cancelación son:',
	'planner_cancel_mail': 'Correo:',
	'planner_cancel_loc': 'Localizador:',
			
			
	'flightList_title':'Listado de vuelos',

	'selectTravel_select2DCodeButton':'Lea la tarjeta<br>de embarque',
			
	'poisFilter_selectText':'Seleccione categorías',
			
	'pois_title':'Puntos de interés',
	'pois_listTabText':'Listado',
	'pois_mapTabText':'Mapa',
	'pois_maps':'Mapas',
	'pois_allTerminalsText':'Todas las terminales',
	'pois_allFloorsText':'Todas las plantas',
	'pois_noPOIsInFilter':'No hay puntos de interés para el filtro actual.',
	'pois_noCategoriesSelected':'Selecciona una categoría del menú inferior para mostrar establecimientos y servicios.',
	'pois_allFloors':'Todas las plantas',
	'noPOIsInList':'Estos elementos se encuentran disponibles en la opción mapa.',
	'poiRecinto' : 'Recinto',
			
	'selectAirport_title':'Cambiar aeropuerto',
	'selectAirport_selectNearestButton':'Seleccionar el más cercano',
			
	'transports_title':'Transportes',
			
	'POIDetail_title':' ',
	'POIDetail_noData':'No se ha recuperado detalle del elemento.',
	'POIDetail_viewMap':'Ver en el mapa',
	'POIDetail_reserva':'Reservar',
			
	'flightObs_RET':'Retrasado',
	'flightObs_HOR':'En hora',
	'flightObs_SCO':'Sin confirmar',
	'flightObs_CON':'Confirmado',
	'flightObs_NPT':'Nueva Puerta',
	'flightObs_NPR':'Nueva Pta/Rtr',
	'flightObs_NSH':'Nueva Sala',
	'flightObs_NSR':'Nueva Sala/Rtr',
	'flightObs_DES':'Desviado',
	'flightObs_CAN':'Cancelado',
	'flightObs_INF':'Info nueva',
	'flightObs_OPE':'Entrega equip.',
	'flightObs_OPF':'Entrega equip.',
	'flightObs_EMB':'Embarcando',
	'flightObs_ULL':'Ult.Llamada',
	'flightObs_CER':'Cerrado',
	'flightObs_FLY':'En vuelo',
	'flightObs_FNL':'Aproximándose',
	'flightObs_LND':'En tierra',
	'flightObs_IBK':'Entrega equip.',
	'flightObs_BTR':'Prox. Embarque',
	'flightObs_BOR':'Finalizado',
			
	'flightSearch_FilterText_FlightNumber':'Número de vuelo ',
	'flightSearch_FilterText_In':' en ',
	'flightSearch_FilterText_Departures':'Salidas desde ',
	'flightSearch_FilterText_To':' a ',
	'flightSearch_FilterText_AnyDestination':'cualquier destino',
	'flightSearch_FilterText_DateTime':', con fecha/hora ',
	'flightSearch_FilterText_DateTimeTo':' hasta fecha/hora ',
	'flightSearch_FilterText_Airline':'compañía  ',
	'flightSearch_FilterText_AnyAirline':'cualquier compañía.',
	'flightSearch_FilterText_Arrivals':'Llegadas a ',
	'flightSearch_FilterText_From':' desde ',
	'flightSearch_FilterText_And':'y ',
	'flightSearch_FilterText_AnyOrigin':'cualquier origen ', 
	'flightSearch_FilterText_Cod2D':'Código leído: ', 
			
	'reservas_title':'Reserva tu plaza de parking',
	'reservas_terminal_title':'Terminal',
	'reservas_entrada':'Fecha de entrada en el aparcamiento',
	'reservas_salida':'Fecha de salida del aparcamiento',
	'reservas_terminos_y_condiciones':'Acepto los Términos y Condiciones',
	'reservas_ver_terminos_y_condiciones':'Ver Términos y Condiciones',
	'reservas_promocion': 'Código de promoción',
	'reservas_terminos_y_condiciones_no':'Para empezar la Reserva debe aceptar los Términos y Condiciones',
	'reservas_btn':'Reservar',
	'reservas_no_disponible':'Lo sentimos pero no se puede realizar ninguna reserva desde el móvil para este aeropuerto.',
	'reservas_entrada_null':'La fecha de entrada no puede ser vacía.',
	'reservas_salida_null':'La fecha de salida no puede ser vacía.',
	'reservas_fechas_err':'La fecha de entrada no puede ser posterior a la de salida.',
			
	'autoLocate_WarningDetection':'Se ha detectado que su aeropuerto más cercano es ',
	'autoLocate_WarningQuestion':'. ¿Desea seleccionar este aeropuerto?',
	'autoLocate_alreadySelected': 'Actualmente ya tiene seleccionado su aeropuerto más cercano.',
			
	'nextTravelNear': 'El vuelo % esta próximo, ¿Quiere cambiar el vuelo de la barra de estado por este?',
			
			
		
	'pullUpLoadMore':' ',
	'pullUpLoading':' ',
	'pullUpRefresh':' ',
			
	'listado':'Directorio',
	'grupos':'Filtrar por',
	'busq':'Buscar',
		
	'noDisponible':'No disponible',
	'checkConnectionGoogle':'Comprobando conexión...',
	'checkConnectionGoogleFail':'Se ha detectado un error de conexión. Compruebe que tiene acceso desde el móvil a Internet.',
	'checkConnectionService':'Comprobando servicios...',
	'checkConnectionServiceFail':'Nuestros servicios no están disponibles.Por favor, inténtelo de nuevo más tarde.',
	'checkRegistering':'Registrando...',
	'checkRegisteringFail':'Registrando...(El proceso está tardando demasiado. Asegúrate que dispones de conexión en tu móvil)',
	'reintentar':'Reintentar',
	'quitarReserva':'Quitar',
	'anularReserva':'Anular',
	'parkingEntrada':'Entrada:',
	'parkingSalida':'Salida:',
	'parkingImporte':'Importe:',
	'parkingPlaza':'Plaza:',
	'parkingLoc':'Localizador:',
	'parkingSavePlaza':'Guardar plaza',
	'plaza_Title':'Detalle reserva',
	'res_Title':'Reservar Parking'
};






/**
 * Objeto que lleva la historia porque la del navegador hace lo que quiera
 */
function _History() {
	var me = this;
	
	var pages = [];
	var params = [];

	/* Guarda en la pila el id de la pagina y sus parametros*/
	me.push = function (page,param){
		pages[pages.length] = page;
		params[params.length] = params;
		//console.log('Push');
		debug();
	}

	/* Desapila la pagina y sus parametros*/
	me.pop = function(){
		pages.splice(-1,1);
		params.splice(-1,1);
		//console.log('Pop');
		debug();
	}
	
	/* Devuelve los parametros de la pagina en la pos de la pila*/
	me.getParams = function(pos){
		return params[pos];
	}
	
	/* Fija los parametros de la pagina de la pos de la pila*/
	me.setParams = function(pos,data){
		params[pos] = data;
		//console.log('Set Params');
		debug();
	}
	
	/* Devuelve la pagina que esta en top*/
	me.topPage = function(){
		return pages[pages.length-1];
	}
	
	/* Devuelve los parametros de la pagina que esta en top*/
	me.topParams = function(){
		return params[params.length-1];
	}
	
	/* Devuelve el tamaño de la pila*/
	me.size = function(){
		return pages.length;
	}
	
	/* Vacia la pila*/
	me.clear = function(){
		pages.splice(0,pages.length);
		params.splice(0,params.length);
		//console.log('Clear');
		debug();
	}
	
	/* Hace Debug, TODO: Borrar de produccion*/
	var debug = function(){
		//console.log('Debug');
		for(var i=0;i<pages.length;i++){
			//console.log('Page-'+i+': '+pages[i]);
			if(params[i]!=null){ 
				//console.log('Params-'+i+': '+params[i].toString());
			} else {
				//console.log('Params-'+i+': Sin params');
			}
		}
	}
	
	
}


//Cuando se invoca con isMenu, deja la historia lista para que al volver atras vuelva a index
function browseFromClick(relativeUrl, transition, params, isMenu) {
	var attr_id = $.mobile.activePage.attr('id');
	
	if(attr_id == 'pois' && relativeUrl == 'pois.html') {
		//Si no hay planta seleccionada, expandir el listado
		if(GestorPOIs.SELECTED_FLOORS_ID().length==0){
			slideRightListado();
		}
		reloadPoisPage();
		
	} else if (attr_id == 'planificador' && relativeUrl == 'planificador.html') {
		$('#planificador').trigger('pageshow');
		
	} else if(attr_id == 'detalle_vuelo' && relativeUrl == 'detalle_vuelo.html'){
		_travelDetailId = null;
		$('#detalle_vuelo').trigger('pageshow');
		
	}else {
		if(attr_id == 'pois' && relativeUrl != 'detalle_poi.html'){
			//Se deja solo el terminal y siempre se expande el listado
			_listState = 1;
			GestorPOIs.clearFloorFilters();
			GestorPOIs.clearPoiIds();
		}
		reloadMap = true;
		if(true == isMenu) {
			History.clear();
			if(relativeUrl != 'index.html') {
				History.push('#index');
			}
			
		} else {
			//Guardamos primero en la historia la pag actual
			var id = '#' + attr_id;
			if(id != '#init' && id!='#waiting') {
				console.log('HISTORIA: '+id);
				History.push(id, params);
			}
		}
		// console.log("FJORDAN: relativeUrl: " + relativeUrl);
		browse(relativeUrl, transition);
	}
}

//Cuando se invoca con isMenu, deja la historia lista para que al volver atras vuelva a index
function browse(relativeUrl, transition) {	
	var id = relativeUrl.replace(".html", "");
	
	if(ActualPage != id) {//Solamente se navega si se cambia de página
		$.mobile.showPageLoadingMsg();

		if(relativeUrl == 'index.html' || relativeUrl == 'pages/index.html') {
			GestorAirports.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
		}		
		
		if(id=='waiting'){
			$.mobile.changePage('pages/'+id+'/'+relativeUrl, {transition : transition});
		}else{
			
			$.mobile.changePage('../'+id+'/'+relativeUrl, {transition : transition});	
		}
		
		
	}
}

function browseExternalURLWithExternalBrowser(url){
	var ref=window.open(url,'_system','location=no,hidden=yes,toolbar=no');
	ref.addEventListener('loadstart', function(event) { $.mobile.showPageLoadingMsg(); });
	ref.addEventListener('loadstop', function(event) { $.mobile.hidePageLoadingMsg();ref.show(); });
    ref.addEventListener('exit', function(event) { $.mobile.hidePageLoadingMsg() });
}

function browseExternalURL(url, method, data){
    var options = 'location=no,hidden=yes,toolbar=no';
    if (method == "POST") {
        options += ',method=POST';
        if (data != null) {
            options += ',postdata=' + data;
        }
    }
	var ref=window.open(url, '_blank', options);
	ref.addEventListener('loadstart', function(event) { $.mobile.showPageLoadingMsg(); });
	ref.addEventListener('loadstop', function(event) { $.mobile.hidePageLoadingMsg();ref.show(); });
    ref.addEventListener('exit', function(event) { $.mobile.hidePageLoadingMsg() });
}

function browseAirpotPOI() {
	GestorPOIs.setAirport(GestorAirports.SELECTED_AIRPORT().AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.clearPoiIds();
	GestorPOIs.fillAllTypesSelectedInCategories(['parking', 'restaurantes-cafeterias', 'tiendas-ocio']);
	catExpanded = null;
	typeExpanded = null;
	browseFromClick('pois.html', 'none');
}

function browsePOI(poiCategoryId, poiTypeId) {

	GestorPOIs.setAirport(GestorAirports.SELECTED_AIRPORT().AIRPORT_ID);
	if(poiCategoryId != null && poiCategoryId != 'undefined') {//Si no se pasa se quiere todo el aeropuerto
		GestorPOIs.clearTypesSelected();
		GestorPOIs.clearPoiIds();
		if(poiTypeId != null && poiTypeId != 'undefined') {//Si no se pasa se quiere todo el aeropuerto
			//si tenemos poiTypeId es uno concreto así que no cargamos la categoría
			GestorPOIs.addSelectedType(poiTypeId);
		} else {
			GestorPOIs.fillAllTypesSelectedInCategory(poiCategoryId);
		}
	}
	catExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	typeExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	

	browseFromClick('pois.html', 'none');
}

/*
 function browseSearchFlights(airport) {
 if($.objectHasContent(airport)) {
 GestorSearchFlights.setDefaultAirpot(airport);
 GestorCacheFlights.changeAirport(airport);
 } else {
 GestorSearchFlights.setDefaultAirpot(GestorContexto.CONTEXT().UC_AIRPORT);
 GestorCacheFlights.changeAirport(GestorContexto.CONTEXT().UC_AIRPORT);
 }
 browseFromClick('buscar_vuelos.html', 'none');
 }
 */

function navigateMenuPOIs(isMenu,listCategories){
	
		
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.clearPoiIds();
	GestorPOIs.fillAllTypesSelectedInCategories(listCategories);
	
	catExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	typeExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);	
	}

}

function navigateMenuTansportPOIs(isMenu) {
	originPOI='transport';
	navigateMenuPOIs(isMenu,['parking', 'transportes-accesos', 'alquiler-coches']);
	/*
	originPOI='transport';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(['parking', 'transportes-accesos', 'alquiler-coches']);
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);	
	}

	*/
}

function navigateMenuShopPOIs(isMenu) {
	originPOI='shops';
	navigateMenuPOIs(isMenu,['tiendas-ocio']);
	
	/*
	originPOI='shops';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(['tiendas-ocio']);
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);
	}

	*/
}

function navigateMenuRestaurantes(isMenu) {
	originPOI='shops';
	navigateMenuPOIs(isMenu,['restaurantes-cafeterias']);
	/*
	originPOI='shops';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(['restaurantes-cafeterias']);
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);
	}

	*/
}

function navigateMenuPMR(isMenu) {
	originPOI='others';
	navigateMenuPOIs(isMenu,['personas-movilidad-reducida']);
	/*
	originPOI='others';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(['personas-movilidad-reducida']);
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);
	}
*/
}
function navigateMenuServicesPOIs(isMenu) {
	
	originPOI='others';
	navigateMenuPOIs(isMenu,['informacion', 'otros-servicios', 'sala-vip-centro-reuniones','personas-movilidad-reducida','zona-llegada-salida','servicios-bancarios','servicios-medicos']);
	/*
	originPOI='others';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(['informacion', 'otros-servicios', 'sala-vip-centro-reuniones','personas-movilidad-reducida','zona-llegada-salida','servicios-bancarios','servicios-medicos']);
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);
	}
*/
}


function navigatePromotionPOIs(isMenu, categorias, poiIds) {
	originPOI='shops';
	GestorPOIs.clearAllFilters();
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	GestorPOIs.setPoiIds(poiIds);
	GestorPOIs.setText('');
	GestorPOIs.fillAllTypesSelectedInCategories(categorias);

	catExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	typeExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	
	if(isMenu!=null && isMenu){
		browseFromClick('pois.html', 'none', null, true);
	} else {
		browseFromClick('pois.html', 'none', null, false);
	}
}

function navigateSearchFlights() {
	GestorSearchFlights.setDefaultAirpot(GestorContexto.CONTEXT().UC_AIRPORT);
	GestorCacheFlights.changeAirport(GestorContexto.CONTEXT().UC_AIRPORT);
	browseFromClick('buscar_vuelos.html', 'none', null, false);
}

function navigatePanelFlights(isMenu) {
	GestorSearchFlights.setDefaultAirpot(GestorContexto.CONTEXT().UC_AIRPORT);
	GestorCacheFlights.changeAirport(GestorContexto.CONTEXT().UC_AIRPORT);
	if(isMenu!=null && isMenu){
		browseFromClick('panel_vuelos.html', 'none', null, true);
	} else {
		browseFromClick('panel_vuelos.html', 'none', null, false);
	}
}

function navigateDefaultFlight() {
	if($.objectHasContent(GestorContexto.CONTEXT().UC_FLIGHT)) {
		var flight = GestorContexto.CONTEXT().UC_FLIGHT;
		// FJORDAN : TO TEST !!!
		flight.indPlanificador  ='S';
		GestorFlightDetails.setParamFlight(flight);		
		browseFromClick('detalle_vuelo.html', 'none');
	}
}

function navigateMenuSearch(isMenu) {
	originPOI = 'others';
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.clearTypesSelected();
	browseFromClick('search.html', 'none', null, (isMenu != null && isMenu));	
}

var backAirportToHome = true;
function navigateChangeairport(backHome) {
	backAirportToHome = backHome;
	browseFromClick('select_airport.html','none',null,false);
}

function navigateSurveyList() {
	var deviceOS  = device.platform;  //fetch the device operating system
    var deviceOSVersion = device.version;  //fetch the device OS version
    var versionNumber = parseInt(deviceOSVersion, 10);

/** comienzo bloque encuesta **/    
//    if (deviceOS.indexOf('Android') >= 0 && versionNumber < 4) {
//   		browseFromClick('pagina_externa.html','none',null,false);
//	}  else {
//		browseFromClick('encuesta.html','none',null,false);
//	}
/** fin bloque encuesta **/
    
/**** Si no se puede solucionar en iOS descomentar esta parte y borrar la parte de arriba(bloque encuesta) */
    if (deviceOS.indexOf('Android') >= 0 && versionNumber >= 4) {
    	browseFromClick('encuesta.html','none',null,false);
	}  else {
		browseFromClick('pagina_externa.html','none',null,false);
	}
/** ***/	
}

function navigatePromotionList() {
	browseFromClick('lista_promociones.html','none',null,false);
}

/**
 * Abre un webview y carga la web del parking 
 */
function navigateReservaParking(){
	browseFromClick('reservas.html','none',null,false);
}


jQuery.asyncTimerExecution  = function (method,interval, flag)
{
	method();
	setTimeout(
		function(){
			//console.log('seguimos pidiendo ' + flag() + ' ' + method.toString() );
			if (flag())
				$.asyncTimerExecution(method,interval,flag);
		},
		interval
	);
}

/*
 Agrupa por el campo JSONParamName y mete los elementos en un array para cada grupo
 * */
jQuery.getGroupedArrayFromJSONArray  = function(data, JSONParamName) {
	var result = [];
	
	$.each(data, function() {

		if (!result[this[JSONParamName]])
		{
			result[this[JSONParamName]] = [];
		}
		result[this[JSONParamName]].push(this); 
	});
	
	return result;//El orden llega de BD
	//return sortOnKeys(result);
};

function sortOnKeys(dict) {

    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for(var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
};

/*
 Filtra el objeto JSON por igualdad y con AND
 el formato de los parámetros es 
 			   	var _params=[{'NAME':'','VALUE':''},{'NAME':'','VALUE':''}]
 * */
jQuery.getFilteredArrayFromJSONArray  = function(data,JSONParameters) {
	var result = [];
	$.each(data, function() {
		var ret=this;
		for(var i=0; i<JSONParameters.length; i++){
				var _val = JSONParameters[i].VALUE;
				var _elem =this[JSONParameters[i].NAME]; 
				if(_val==null){_val='null';}
				if(_elem==null){_elem='null';}
				if(_elem != _val){
					ret=null;
				}
		}
		
		if(ret!=null && ret!= 'undefined') result.push(this);
	
	});	

	return result;
};

/*
 Filtra el objeto JSON por igualdad y con OR
 el formato de los parámetros es 
 			   	var _params=[{'NAME':'','VALUE':''},{'NAME':'','VALUE':''}]
 * */
jQuery.getORFilteredArrayFromJSONArray  = function(data,JSONParameters) {
	var result = [];
	$.each(data, function() {
		var ret=null;
		for(var i=0; i<JSONParameters.length; i++){
			var _val = JSONParameters[i].VALUE;
			var _elem =this[JSONParameters[i].NAME]; 
			if(_val==null){_val='null';}
			if(_elem==null){_elem='null';}
			if(_elem == _val){
				ret=this;
				break;
			}
		}
		
		if(ret!=null && ret!= 'undefined') result.push(this);
	});	

	return result;
};

jQuery.getSingleObjectByPKFromJSONArray =  function (data, field, value){
	 
	 var _itemRes = null;
	 if (data != null){  
	
	  $.each(data, function(i, _itemIterado) {	
	         if (_itemIterado[field] == value) {
	             _itemRes = this;
	             return false; 
	         }
	  });
	 }
	 return _itemRes;
};

/*
 * Hace las comprobaciones de null, '' y undefined en el objeto para saber si tiene valor
 */
jQuery.objectHasContent = function (obj){
	return (obj!=null && obj!='' && obj!= 'undefined' && obj!='null');
};

jQuery.notNullString = function (str){
	if ($.objectHasContent(str))
		return str;
	else
		return '';
};
/**
 * Función que permite reemplazar TODAS las subcadenas encontradas
 * en un string por otra nueva subcadena.
 */
jQuery.strReplaceAll = function(text, search, newstring){
    while (text.toString().indexOf(search) != -1)
        text = text.toString().replace(search,newstring);
    return text;
};


/**
 * Devuelve el objeto con la lectura del codigo 2D 
 * @param {Object} code El String leido
 */
function decode2D(code){
	var result = new Object();
	
	var iFC = code.indexOf('M');
	var escalas = 1;
	
	if(IsNumeric(code.substring(iFC+1, iFC+2))){
		escalas = code.substring(iFC+1, iFC+2);
	} else { // NO ES UN NUMERO
		escalas = 1;
	}
	

	if(iFC==0){
		try{
			var pNombreApell=code.substring(iFC+2,iFC+21);
			var barra = pNombreApell.indexOf('/');//"/".
			var passengerLastname;
			var passengerName;
			if (barra!=-1){		
				passengerLastname=pNombreApell.substring(0,barra);
				passengerLastname=passengerLastname.trim();//Quito los espacios que tenga delante y detras del texto.
				passengerName=pNombreApell.substring(barra+1,pNombreApell.length);
				passengerName=passengerName.trim();
			}else{
				passengerName = pNombreApell.trim();
				passengerLastname ="";
			}
			result.passengerLastname = passengerLastname;
			result.passengerName = passengerName;
			
			//console.log('nombre:'+passengerLastname);
			//console.log('apellidos:'+passengerName);
			
			var escalaActual = 0;
			iFC = iFC+23; // Se utilizará como indice desde el pasajero
			var encontradoApto = false;
			
			while (!encontradoApto && escalaActual < escalas){
				
					// SE PONEN LOS DATOS. Si solo hay una si no todas hast encontrado.

					// VUELO DESDE
					var flightFrom=code.substring(iFC+7,iFC+10);
					flightFrom=flightFrom.trim();
					result.flightFrom = flightFrom;
					//console.log('FlightFrom:'+flightFrom);
					
					if (flightFrom==null || flightFrom=="") { // NO PUEDE IR VACIO, SI LO VA ES INVALIDO
						return null;
					}

					var flightTo=code.substring(iFC+10,iFC+13);
					flightTo=flightTo.trim();
					result.flightTo = flightTo;
					//console.log("FlightTo: "+flightTo);
					
					if (flightTo==null || flightTo=="") { // NO PUEDE IR VACIO, SI LO VA ES INVALIDO
						return null;
					}

					var flightCompany=code.substring(iFC+13,iFC+16);
					flightCompany=flightCompany.trim();
					result.flightCompany = flightCompany;
					//console.log("FlightCompany: "+flightCompany);
					
					if (flightCompany==null || flightCompany=="") { // NO PUEDE IR VACIO, SI LO VA ES INVALIDO
						return null;
					}

					// Se recogen 5 por RYR que el primero lo deja en blanco.
					var flightCode=code.substring(iFC+16,iFC+21);
					flightCode=flightCode.trim();
					result.flightCode = flightCode;
					//console.log("FlightCode: "+flightCode);
					
					if (flightCode==null || flightCode=="") { // NO PUEDE IR VACIO, SI LO VA ES INVALIDO
						return null;
					}

					var flightDate=code.substring(iFC+21,iFC+24);
					flightDate=flightDate.trim();
					result.flightDate = flightDate;
					//console.log("FlightDateOriginal: "+flightDate);

					//Procesamos el flightDate y devolvemos ya una fecha como dios manda (Si es un dia posterior al actual, es del año que viene)
					var flightDateProcesado = dateOfFlight(flightDate);
					result.flightDateProcesado = flightDateProcesado;
					//console.log('Fechafinal: '+flightDateProcesado.toDateString());

					var compartmentCode = code.substring(iFC+24,iFC+25);
					result.compartmentCode = compartmentCode;
					//console.log("CompartmentCode: "+compartmentCode);

					var passengerSeatnumber=code.substring(iFC+25,iFC+29);
					passengerSeatnumber=passengerSeatnumber.trim();
					result.passengerSeatnumber = passengerSeatnumber;
					//console.log("PassengerSeatNumber: "+passengerSeatnumber);

					var passengerCode=code.substring(iFC+29,iFC+34);
					passengerCode=passengerCode.trim();
					result.passengerCode = passengerCode;
					//console.log("PassengerCode: "+passengerCode);
					
					var passengerStatus = code.substring(iFC+34,iFC+35);
					result.passengerStatus = passengerStatus
					//console.log("\tPassengerStatus: "+passengerStatus);

					escalaActual++;
			    
					if (escalaActual < escalas){
						//si aún quedan más escalas por leer en el código 2D de la tarjeta de embarque
						//se le suma al índice inicial la longitud de los items obligatorios (=37) y la longitud
						//de los items opcionales (que vienen expresados en el último campo de los obligatorios)
						var longitudCondiciones = parseInt(code.substring(iFC+35, iFC+37).trim(), 16);
						iFC += 37;
						iFC += longitudCondiciones;
					}					

				}
			
		}catch(err){ //Codigo Invalido
			result = null;
		}
	}
	
	return result;
}

/**
 *Devuelve la fecha a partir de un dia del año actual si no ha pasado el dia, o del año siguiente si ha pasado 
 * @param {Object} day El numero de ese año
 */
function dateOfFlight(day){
  var res;
  try{
  	var date = new Date(new Date().getFullYear(), 0); 
  	var currDateDay = currentDay(); //Fecha de hoy sin milisegundos
  	var flightDate = new Date(date.setDate(day));  //Fecha del vuelo sin milisegundos
  	if(flightDate<currDateDay){ // Si es anterior a hoy hay que sumarle un año
  		date = new Date(new Date().getFullYear()+1, 0); 
  		flightDate = new Date(date.setDate(day));
  	} 
  	res = new Date(Date.UTC(flightDate.getFullYear(),flightDate.getMonth(),flightDate.getDate(),0));
  	
  }catch(err){
  	res = null;
  }
  return res;
}

/**
 *Devuelve el dia actual del año 
 */
function currentDay(){
	var now = new Date();
	var result = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	return result;
}

function IsNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var mobiScrollShowing;
function fillCmbList(controlId,label,data,idField,descField,emptyOption,selectedId){
	var html = '';
	if (emptyOption){
		html += '<option value=""> </option>';
	}
	for(var i=0; i<data.length; i++){
		
		//data[i][idField]
		html+='<option value="' + data[i][idField] + '" ';
		if($.objectHasContent(selectedId)){ 
			if(data[i][idField] == selectedId){html+= ' selected="true" ';}
		}
		html+= ' >' + data[i][descField] + '</ option>';
		//data[i][descField]
	}

	$('#' + controlId).html(html);
	
	$('#' + controlId).scroller({
        preset: 'select',
        theme: 'default',
        display: 'modal',
        mode: 'scroller',
        inputClass: 'i-txt',
        setText: GestorIdiomas.getLiteral('acceptText'),
        cancelText: GestorIdiomas.getLiteral('cancelText'),
        headerText: label,
        showLabel: false,
        rows: 7,
    });
}

function fillCmbTerminalList(terminals, controlId,label,selectedId){
	var html = '';
	for(var i=0; i<terminals.length; i++){
		html+='<option value="' + terminals[i].TERMINAL_ID +  '" ';
		if($.objectHasContent(selectedId)){ 
			if(terminals[i].TERMINAL_ID == selectedId){html+= ' selected="true" ';}
		}
		
		html+= ' >' + terminals[i].TERMINAL_NAME[GestorContexto.CONTEXT().UC_LANGUAGE_ID] + '</ option>';
	}

	$('#' + controlId).html(html);
	
	$('#' + controlId).scroller({
        preset: 'select',
        theme: 'default',
        display: 'modal',
        mode: 'scroller',
        inputClass: 'i-txt',
        setText: GestorIdiomas.getLiteral('acceptText'),
        cancelText: GestorIdiomas.getLiteral('cancelText'),
        headerText: label,
        showLabel: false,
        analyticsEventHandler: eventChangeTerminal
    });	    
}

function fillCmbFloorList(floors, controlId,label,selectedId){
	var html = '';
	for(var i=0; i<floors.length; i++){
		html+='<option value="' + floors[i].FLOOR_ID +  '" ';
		if($.objectHasContent(selectedId)){ 
			if(floors[i].FLOOR_ID == selectedId){html+= ' selected="true" ';}
		}
		
		html+= ' >' + floors[i].FLOOR_NAME[GestorContexto.CONTEXT().UC_LANGUAGE_ID] + '</ option>';
	}

	$('#' + controlId).html(html);
	
	$('#' + controlId).scroller({
        preset: 'select',
        theme: 'default',
        display: 'modal',
        mode: 'scroller',
        inputClass: 'i-txt',
        setText: GestorIdiomas.getLiteral('acceptText'),
        cancelText: GestorIdiomas.getLiteral('cancelText'),
        headerText: label,
        showLabel: false,
        analyticsEventHandler: eventChangeFloor
    });	    
}


function paintDateScroll(dateId,format,defaultValue,allowYesterday, onSelect){
	var now = new Date();
	if (allowYesterday) {
		now.setDate(now.getDate()-1);
	}

	var empty = function() {};

    $('#' + dateId).scroller({
	    preset: format,
	    minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
	    theme: 'default',
	    display: 'modal',
	    mode: 'scroller',
	    dateFormat: 'dd/mm/yy',
	    dateOrder: 'ddmmy',
	    dayText: GestorIdiomas.getLiteral('dayText'),
	    hourText: GestorIdiomas.getLiteral('hourText'),
	    minuteText: GestorIdiomas.getLiteral('minuteText'),
	    monthText: GestorIdiomas.getLiteral('monthText'),
	    secText: GestorIdiomas.getLiteral('secText'),
	    timeFormat: 'HH:ii',
	    timeWheels: 'HHii',
	    yearText: GestorIdiomas.getLiteral('yearText'),
	    setText: GestorIdiomas.getLiteral('acceptText'),
	    cancelText: GestorIdiomas.getLiteral('cancelText'),
	    analyticsEventHandler: eventFechaHora,
	    // Events
        onSelect: onSelect || empty,
    });
    
    $('#' + dateId).attr('class','i-txt');
    
    if (defaultValue != null) {
    	 $('#' + dateId).scroller('setDate', defaultValue, true);
    }
    	
}


function fillCmbLanguageScroll(controlId,label,selectedId){
	
	
	var html = '';
	for(var i=0; i<GestorIdiomas.getAvailableLangs().length; i++){
		 var lang = GestorIdiomas.getAvailableLangs()[i];
		html+='<option value="' + lang + '" ';
		if(selectedId){ 
			if(lang == selectedId){html+= ' selected="true" ';}
		}
		html+= '>' + GestorIdiomas.getLiteral("const" + lang.toUpperCase()) + '</ option>';
	}

	$('#' + controlId).html(html);
		
	$('#' + controlId).scroller({
	        preset: 'select',
	        theme: 'default',
	        display: 'modal',
	        mode: 'scroller',
	        inputClass: 'i-txt',
	        setText: GestorIdiomas.getLiteral('acceptText'),
	        cancelText: GestorIdiomas.getLiteral('cancelText'),
	        headerText: label,
	        showLabel: false
	});			
}


function setDatePickerProperty(datepickerId, option, dateAsString)
{
	var currentDatePickerValue = $.scroller.parseDate('dd/mm/yy', dateAsString);
	$("#"+datepickerId).scroller('option', option, currentDatePickerValue);
}

// EXTENSIONES DE FORMATO

jQuery.numberFormat  = function (num, length) {
	     var r = "" + num;
	     while (r.length < length) {
	          	         r = "0" + r;
         }
         return r; 
};

Date.prototype.setISO8601IgnoreLocalTimeOffSet = function (string) {

	if(string != null){
		// parenthese matches:
		// year month day    hours minutes seconds  
		// dotmilliseconds 
		// tzstring plusminus hours minutes
		var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
		 
		var d = [];
		d = string.toString().match(re);
		 
		// "2010-12-07T11:00:00.000-09:00" parses to:
		//  ["2010-12-07T11:00:00.000-09:00", "2010", "12", "07", "11",
		//     "00", "00", ".000", "-09:00", "-", "09", "00"]
		// "2010-12-07T11:00:00.000Z" parses to:
		//  ["2010-12-07T11:00:00.000Z",      "2010", "12", "07", "11", 
		//     "00", "00", ".000", "Z", undefined, undefined, undefined]
		 
		if (! d) {
			throw "Couldn't parse ISO 8601 date string '" + string + "'";
		}
		 
		// parse strings, leading zeros into proper ints
		var a = [1,2,3,4,5,6,10,11];
		for (var i in a) {
			d[a[i]] = parseInt(d[a[i]], 10);
		}
		d[7] = parseFloat(d[7]);
		 
		// Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])
		// note that month is 0-11, not 1-12
		// see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC
		var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);
		
		// if there are milliseconds, add them
		if (d[7] > 0) {  
			ms += Math.round(d[7] * 1000);
		}
		
	
		// Para ignorar la zona horaria local
		ms += new Date(ms).getTimezoneOffset() * 60 * 1000;
		
		// if there's a timezone, calculate it
		// if (d[8] != "Z" && d[10]) {
			// var offset = d[10] * 60 * 60 * 1000;
			// if (d[11]) {
		  		// offset += d[11] * 60 * 1000;
			// }
			// if (d[9] == "+") { ms -= offset; } else { ms += offset; }
		// }
		
	
		this.setTime(ms);
	}
};

Date.prototype.dateFromISO = function(val){
	// Test si el javascript puede parsear la fecha
	var diso= Date.parse('2011-04-26T13:16:50Z');
    if(diso=== 1303823810000) {
    	return new Date(Date.parse(val));
    
    } else { 
      	// No puede.... tenemos que hacerlo a mano
      	var day, tz, 
          rx= /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/, 
      	p= rx.exec(val) || [];
      	if(p[1]){
      		day= p[1].split(/\D/).map(function(itm){
      			return parseInt(itm, 10) || 0;
        	});
    	  	day[1]-= 1;
      		day= new Date(Date.UTC.apply(Date, day));
      		if(!day.getDate()) { 
      			return NaN;
      		}
      
      		if(p[5]){
      			tz= parseInt(p[5], 10)*60;
        		if(p[6]) { 
        			tz += parseInt(p[6], 10);
        		}
        		if(p[4]== "+") { 
	    			tz*= -1;
	    		}
    			if(tz) { 
        			day.setUTCMinutes(day.getUTCMinutes()+ tz);
        		}
			}
        	return day;
		}
        return NaN;
	}
};



Date.prototype.toUTCDateHard = function() {
		var _dat = new Date(this.getTime() + 0);
		var _res = new Date(Date.UTC(_dat.getFullYear(), _dat.getMonth(), _dat.getDate(), _dat.getHours(), _dat.getMinutes()));
		return _res;
		}
		
Date.prototype.toUTCDate = function() {
	var date = this;
	return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
};

function convertDateToUTC(date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }

Date.prototype.toShortTimeString = function () {
    return this.getHours().toString() + ':' + $.numberFormat(this.getMinutes(),2).toString(); 
};

Date.prototype.toShortDateString = function () {
	var curr_date = this.getDate();
	var curr_month = this.getMonth();
	curr_month++;
	var curr_year = this.getFullYear();
	return curr_date + "/" + $.numberFormat(curr_month,2) + "/" + curr_year;
};

Date.prototype.toDetalleVueloFormat = function () {
    return this.toShortTimeString() + GestorIdiomas.getLiteral('hoursText') + this.toShortDateString();
};

jQuery.CutString = function (_data,_charNum){
	var _ret =_data.toString();

	if($.objectHasContent(_ret)&& _ret.length > _charNum){
		_ret = _data.toString().substring(0,_charNum -3) + "...";
	}
	return _ret;
};


/**Utilidades varias*/
function _Utils() {
    
    var me = this;
    
    /* Devuelve el id del dispositivo.
     * Dependiente de 'device' */
    me.getUniqueId = function() {
        return device.uuid;
    };
    
    
    /* Devuelve el nombre del dispositivo.
     * Dependiente de 'device' */
    me.getName = function() {
        return device.name;
    };
    
    /* Devuelve la versión de Cordova.
     * Dependiente de 'device' */
    me.getCordova = function() {
        return device.cordova;
    };
    
    /* Devuelve la plataforma.
     * Dependiente de 'device' */
    me.getPlatform = function() {
        return device.platform;
    };
    
    /* Devuelve la versión.
     * Dependiente de 'device' */
    me.getVersion = function() {
        return device.version;
    };
    
    /* Devuelve si es Android. */
    me.isAndroid = function() {
        return navigator.userAgent.toLowerCase().indexOf('android') >= 0;
    };
    
    /* Devuelve si es Android Mobile. */
    me.isAndroidMobile = function() {
    	var lowerUserAgent =  navigator.userAgent.toLowerCase();
        return lowerUserAgent.indexOf('android') >= 0 && lowerUserAgent.indexOf('mobile') >= 0;
    };
    
     /* Devuelve si es Android Tablet. */
    me.isAndroidTablet = function() {
    	var lowerUserAgent =  navigator.userAgent.toLowerCase();
        return lowerUserAgent.indexOf('android') >= 0 && !lowerUserAgent.indexOf('mobile') >= 0;
    };
    
    /* Devuelve si es Iphone. */
    me.isIphone = function() {
        return navigator.userAgent.toLowerCase().indexOf('iphone') >= 0;
    };
    
    /* Devuelve si es Ipod. */
    me.isIpod = function() {
        return navigator.userAgent.toLowerCase().indexOf('ipod') >= 0;
    };
    
    /* Devuelve si es Ipad. */
    me.isIpad = function() {
        return navigator.userAgent.toLowerCase().indexOf('ipad') >= 0;
    };
    
    /* Devuelve si es Ipad. */
    me.isWindowsPhone = function() {
        return navigator.userAgent.toLowerCase().indexOf('windows phone') >= 0;
    };
    
    /**
     * Remplaza los acentos por caracteres normales
 	 * @param {Object} str Cadena a reemplazar acentos
     */
    me.stripAcutes = function(str){
    	var rExps=[
 			{re:/[\xC0-\xC6]/g, ch:'A'},
 			{re:/[\xE0-\xE6]/g, ch:'a'},
 			{re:/[\xC8-\xCB]/g, ch:'E'},
 			{re:/[\xE8-\xEB]/g, ch:'e'},
 			{re:/[\xCC-\xCF]/g, ch:'I'},
 			{re:/[\xEC-\xEF]/g, ch:'i'},
 			{re:/[\xD2-\xD6]/g, ch:'O'},
 			{re:/[\xF2-\xF6]/g, ch:'o'},
 			{re:/[\xD9-\xDC]/g, ch:'U'},
 			{re:/[\xF9-\xFC]/g, ch:'u'},
 			{re:/[\xD1]/g, ch:'N'},
 			{re:/[\xF1]/g, ch:'n'} ];

 		for(var i=0, len=rExps.length; i<len; i++)
  			str=str.replace(rExps[i].re, rExps[i].ch);
 		return str;
    };
}

function paintUpperIconMessage(targetId,message,globalClass,imageSrc,textClass){
	$('#' + targetId).html(_getUpperIconMessage(message,globalClass,imageSrc,textClass)).trigger('create');
}

function paintLeftIconMessage(targetId,message,globalClass,imageSrc,textClass,maxHeight){
	$('#' + targetId).html(_getLeftIconMessage(message,globalClass,imageSrc,textClass,maxHeight)).trigger('create');
}

function paintTitlePoi(targetId,message,globalClass,textClass,isLink){
	$('#' + targetId).html(_getPaintTitlePoi(message,globalClass,textClass,isLink));
}


function _getUpperIconMessage(message,globalClass,imageSrc,textClass){
	
	var htmlData;
	htmlData='<div class="' + globalClass + '" align="center" width="100%">';
	htmlData+='<table  width="100%"><tr>';
	htmlData+='<td align="center"><br/>';
		if (imageSrc != null)
			htmlData+='<img src="' + $.mobile.path.get() + imageSrc + '"/>';
	htmlData+='<div class="' + textClass + '">' + message + '</div>';
	htmlData+='</td>';
	htmlData+='</tr></table>';
	htmlData+='</div>';
						
	return htmlData;
}

function _getLeftIconMessage(message,globalClass,imageSrc,textClass,maxHeight){
	
	var htmlData;
	if(maxHeight > 0) {
		htmlData='<div class="' + globalClass + '" align="center" width="100%" style="max-height:' + maxHeight + 'px; overflow: scroll">';
	} else {
	htmlData='<div class="' + globalClass + '" align="center" width="100%">';
	}
	htmlData+='<table width="100%" ><tr>';

		htmlData+='<td align="center">';
		if (imageSrc != null){
			htmlData+='<img src="' + $.mobile.path.get() + imageSrc + '"/>';
		}
		htmlData+='<div class="' + textClass + '" >' + message + '</div>';
		htmlData+='</td>';	
	
	
	htmlData+='</tr></table>';
	htmlData+='</div>';
						
	return htmlData;
}

function _getPaintTitlePoi(message,globalClass,textClass,isLink){
	if(message.length>75){
		message = message.substring(0,73) + "...";
	}
	//console.log('IsLink:'+isLink);
	var htmlData;
	htmlData='<div class="' + globalClass + '" align="center">';
	htmlData+='<table width="100%"><tr>';
	htmlData+='<td align="center">';
	htmlData+='<div class="' + textClass + '">' + message + '</div>';
	if(isLink){
		//console.log('is link');
		htmlData+='</td><td align="right"><img class="iconEnlace" style="padding-top:10px" src="'+$.mobile.path.get() +'../../themes/default/common/img/flecha_dcha.png"/>';
	} 
	htmlData+='</td></tr></table>';
	htmlData+='</div>';
						
	return htmlData;
}


var map;
var toLoc = false;

function _GestorOL(){
	var me = this;
	var aenaWms;
	var wpaMaps;
	
	//Sprinters de categorias y algunos tipos
	//Parking
	var sprinterParkings;
	var sprinterParkingPmr;
	
	//Sala VIP
	var sprinterSalaVip;
	
	//Alquiler de Coches
	var sprinterCompaniaAlquilerCoches;
	
	//Tiendas ocio
	var sprinterTiendasOcio;
	var sprinterFarmacia;
	
	//Restaurantes y Cafeterias
	var sprinterRestaurantesYCafeterias;
	
	//PMR
	var sprinterPmr;
	var sprinterParkingPmr2;
	
	//Transportes y accesos
	var sprinterTransportes;
	var sprinterAutobus;
	var sprinterAutobusLanzadera;
	var sprinterIntercambiadorTransportes;
	var sprinterMetro;
	var sprinterTaxi;
	var sprinterTren;
	var sprinterTrenEntreTerminales;
	
	//Informacion
	var sprinterInformacion;
	var sprinterTouroperadores;
	
	//Otros servicios
	var sprinterOtrosServicios;
	var sprinterAseos;
	var sprinterControlSeguridad;
	var sprinterServicioMedico;
	var sprinterDesfibriladores;
	var sprinterPrimerosAuxilios;
	
	//Salidas y llegadas
	var sprinterSalidasLlegadas;
	var sprinterFacturacion;
	var sprinterPuertaEmbarque;
	var sprinterRecogidaEquipaje;
	
	//Selected layer
	var sprinterSelected;
	
	me.getSelectedLayer = function(){
		return sprinterSelected;
	};
	
	var vector;
	var mapaVisible=false;

	//Controles
	var control;
	
	/**
	 * Arranca el mapa
	 */
	me.initMap = function () {
		OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
    	vector = new OpenLayers.Layer.Vector("Vector Layer", {});
    	//Variables usadas para ir generando estilos
    	var style; 
    	var selStyle = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_seleccionado.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	/*Parkings*/
		style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_parkings.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        	});
    	sprinterParkings = new OpenLayers.Layer.Vector("sprinterParkings", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_parking_pmr.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	sprinterParkingPmr = new OpenLayers.Layer.Vector("sprinterParkingPmr", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Sala VIP*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_salas_vip.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	sprinterSalaVip = new OpenLayers.Layer.Vector("sprinterSalaVip", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Compañia alquiler de coches*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_alquiler_vehiculos.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        	});
    	sprinterCompaniaAlquilerCoches = new OpenLayers.Layer.Vector("sprinterCompaniaAlquilerCoches", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Tienda ocio*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_zona_comercial.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterTiendasOcio = new OpenLayers.Layer.Vector("sprinterTiendasOcio", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_servicios_medicos.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
    	sprinterFarmacia = new OpenLayers.Layer.Vector("sprinterFarmacia", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Restaurantes y cafeterias*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_restaurantes.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterRestaurantesYCafeterias = new OpenLayers.Layer.Vector("sprinterRestaurantesYCafeterias", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Pmr*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_pmr.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterPmr = new OpenLayers.Layer.Vector("sprinterPmr", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_parking_pmr.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
    	sprinterParkingPmr2 = new OpenLayers.Layer.Vector("sprinterParkingPmr2", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Transportes y accesos*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_transportes.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        	
    	sprinterTransportes = new OpenLayers.Layer.Vector("sprinterTransportes", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_autobus.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterAutobus = new OpenLayers.Layer.Vector("sprinterAutobus", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_autobus_lanzadera.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        	});
        	
    	sprinterAutobusLanzadera = new OpenLayers.Layer.Vector("sprinterAutobusLanzadera", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_intercambiador.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        	});
        	
    	sprinterIntercambiadorTransportes = new OpenLayers.Layer.Vector("sprinterIntercambiadorTransportes", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_metro.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        	
    	sprinterMetro = new OpenLayers.Layer.Vector("sprinterMetro", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_taxi.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        	
    	sprinterTaxi = new OpenLayers.Layer.Vector("sprinterTaxi", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_tren.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        	
    	sprinterTren = new OpenLayers.Layer.Vector("sprinterTren", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_trenes_terminales.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });

    	sprinterTrenEntreTerminales = new OpenLayers.Layer.Vector("sprinterTrenEntreTerminales", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Informacion*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_touroperadores.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	sprinterInformacion = new OpenLayers.Layer.Vector("sprinterInformacion", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_touroperadores.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
    	sprinterTouroperadores = new OpenLayers.Layer.Vector("sprinterTouroperadores", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Otros servicios*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_otros_servicios.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterOtrosServicios = new OpenLayers.Layer.Vector("sprinterOtrosServicios", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_lavabos.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
    	sprinterAseos = new OpenLayers.Layer.Vector("sprinterAseos", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_seguridad.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterControlSeguridad = new OpenLayers.Layer.Vector("sprinterControlSeguridad", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_servicios_medicos.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterServicioMedico = new OpenLayers.Layer.Vector("sprinterServicioMedico", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	sprinterDesfibriladores = new OpenLayers.Layer.Vector("sprinterDesfibriladores", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	sprinterPrimerosAuxilios = new OpenLayers.Layer.Vector("sprinterPrimerosAuxilios", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	/*Salidas y llegadas*/
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_llegadas_salidas.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
    	sprinterSalidasLlegadas = new OpenLayers.Layer.Vector("sprinterSalidasLlegadas", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_facturacion.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterFacturacion = new OpenLayers.Layer.Vector("sprinterFacturacion", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
		
		style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_puertas_embarque.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
        
     	
    	sprinterPuertaEmbarque = new OpenLayers.Layer.Vector("sprinterPuertaEmbarque", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	style = new OpenLayers.Style({
            	externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/poi_equipajes.png",
            	graphicOpacity: Constantes.indoor_ico_opacity,
            	graphicWidth: Constantes.indoor_ico_width,
            	graphicHeight: Constantes.indoor_ico_height,
            	graphicYOffset: Constantes.indoor_ico_offsety
        });
    	
    	sprinterRecogidaEquipaje = new OpenLayers.Layer.Vector("sprinterRecogidaEquipaje", {
        	styleMap: new OpenLayers.StyleMap({
            	"default": style,
            	"select": selStyle
        	})
    	});
    	
    	sprinterSelected = new OpenLayers.Layer.Vector("sprinterRecogidaEquipaje",{
        	styleMap: new OpenLayers.StyleMap({
            	"default": selStyle,
            	"select": selStyle
        	})
    	});
    	
    	//console.log('Sprinters finish');
    	
   		var actualTerm = me.getCurrentTerminalPosition();
   		if(me.isAirportGeolocated()){
   			aenaWms = new OpenLayers.Layer.WMS("AenaWMS",
        		ConstF.base_WS+"/mapa",
        		{	map: ConstF.mapUrl,
        			layers: me.getCurrentLayers(),
        		}
    		);
    		wpaMaps = null;
    		
    		// create map
    		//console.log('initMap - creacion del mapa');
    		map = new OpenLayers.Map({
    			div: "map_layer",
    			numZoomLevels:1000,
    			controls: [
    				new OpenLayers.Control.Attribution(),
    				new OpenLayers.Control.TouchNavigation({
    					dragPanOptions: {
    						enableKinetic: true
    				},
    				pinchZoomOptions: {
    					autoActivate: true
    				}
    			})
    			],
    			layers: [
        			aenaWms,
        			vector
    			],
    			center: new OpenLayers.LonLat(actualTerm[0],actualTerm[1]),
    			zoom: ConstF.zoom2D
			});
      	} else {
      		//console.log('TMS');
      		aenaWms = null;
    		wpaMaps = new OpenLayers.Layer.TMS("TMS", 
    			me.getCurrentLayerWpa(), { 'type':'png', 'getURL':me.wpaUrlFunc});
    			
    		// create map	
    		map = new OpenLayers.Map({
    			div: "map_layer",
    			numZoomLevels:5,
   	 			maxExtent: new OpenLayers.Bounds(-2048,-2048,2048,2048),
    			maxResolution:4096 / 256,
    			controls: [
    				new OpenLayers.Control.Attribution(),
    				new OpenLayers.Control.TouchNavigation({
    					dragPanOptions: {
    						enableKinetic: true
    					},
    					pinchZoomOptions: {
    						autoActivate: true
    					}
    				})
    			],
    			layers: [
        			wpaMaps,
        			vector
    			],
    			zoom: ConstF.zoom3D
			});
			var lonLat = new OpenLayers.LonLat(0, 0) ;
  			lonLat.transform(map.displayProjection,map.getProjectionObject());
  			map.setCenter(lonLat);
      	}
	};
	
	/**
	 * Fija la visibilidad del mapa
	 */
	me.setMapaVisible = function(state){
		mapaVisible = state;

		if(state == false && $('#sliderListaDivBtn').length){
			$('#sliderListaDivBtn').hide();//RP - Inc. 1111 - Se oculta siempre que no tengamos terminal, en ocasiones por tiempos de cálculo no lo hacía
		}
	};
	
	/**
	 * Devuelve si el mapa esta visible o no
	 */
	me.getMapaVisible = function(){
		return mapaVisible;
	};
	
	/**
	 * Devuelve los POIS parseados ya del GeoJSON
	 */
	me.getFeatures = function() {
		//Recogemos los POIs seleccionados, de la planta y terminal seleccionados y creamos el geojson
		var pois;
		if(!notFavouritePOISVisible){ //Sacamos solo los favoritos
			pois = GestorPOIs.getFavouritePoisDisplayed();
		} else {
			pois = GestorPOIs.POIS(); //Ya los tenemos cargados
		}

		var feat = {'parkings':[],'parkingPmr':[],
					'salaVip':[],
					'alquiler':[],
					'tiendas':[],'farmacia':[],
					'restaurantes':[],
					'pmr':[],'parkingPmr2':[],
					'transportes':[],'autobus':[],'autobusLanzadera':[],'intercambiadorTrans':[],'metro':[],'taxi':[],'tren':[],'trenTerm':[],
					'info':[],'tourOperadores':[],
					'otros':[],'aseos':[],'seguridad':[],'medico':[],'desfibriladores':[],'auxilios':[],
					'salidasLlegadas':[],'facturacion':[],'puertaEmbarque':[],'recogida':[]
					};

		for(var i=0;i<pois.length;i++){
			var lat;
			var lon;
			if(me.isAirportGeolocated()){
				lat = pois[i].latitudAspa;
				lon = pois[i].longitudAspa;
			} else {
				var finalCoord = me.transformCoordWPA(pois[i].latitud,pois[i].longitud);
				lat = finalCoord[0]; 
				lon = finalCoord[1]; 
			}
			
			var _params = [{
					'NAME' : 'POI_CATEGORY_ID',
					'VALUE' : pois[i].codigoGrupo
			}];
			var categ = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_CATEGORIES(), _params);
			if ($.isEmptyObject(categ)) {
				continue;
			}
			var categ_desc = categ[0]['POI_CATEGORY_DESC'][GestorIdiomas.getLang()];
			
			_params = [{
					'NAME' : 'POI_TYPE_ID',
					'VALUE' : pois[i].codigoTipo
			}];
			var type = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_TYPES(), _params);
			var type_desc = type[0]['POI_TYPE_DESC'][GestorIdiomas.getLang()];
			
			var idPoi = pois[i].idPoi;
			var detalle = pois[i].detalle;
			var term = pois[i].areaTerminal;
			var floor = pois[i].plantaEdificio;
			var nom;
			var codigoTipo = pois[i].codigoTipo;
			if(GestorContexto.CONTEXT().UC_LANGUAGE_ID=='en_GB' && pois[i].tituloEnGb!=null && pois[i].tituloEnGb!=''){
				nom = pois[i].tituloEnGb;
			} else {
				nom = pois[i].tituloEsEs;
			}
			if(lat!=null && lon!=null){
				//console.log(codigoTipo);
				switch(codigoTipo){
					
					/*Parkings*/
					case 'parkings':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-larga-estancia':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-bajo-coste':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-express':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-motocicletas':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-pmr':
						feat.parkingPmr[feat.parkingPmr.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parking-vip':
						feat.parkings[feat.parkings.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
						
					/*Sala VIP*/
					case 'centro-negocios':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'informacion-empresas':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'sala-personalidades':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'sala-prensa':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'sala-reuniones':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'sala-vip':
						feat.salaVip[feat.salaVip.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					
					/*Alquiler de coches*/
					case 'compania-alquiler-coches':
						feat.alquiler[feat.alquiler.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
						
					/*Tiendas y ocio*/
					case 'alimentacion':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'articulos-bebes':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'botiquin-farmacia':
						feat.farmacia[feat.farmacia.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'cambio-moneda':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'duty-free':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'farmacia':
						feat.farmacia[feat.farmacia.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'floristeria':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'hogar':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'joyeria-bisuteria':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'loteria-apuestas':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'moda-complementos':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'multitienda':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'ocio-entretenimiento':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'optica':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'parafarmacia':
						feat.farmacia[feat.farmacia.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'peluqueria':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'perfumeria-cosmetica':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'prensa-libros':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'spa':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
					case 'tabaco':
						feat.tiendas[feat.tiendas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
						break;
						
					/*Restaurantes y Cafeterias*/
					case 'bares-cafeterias':
						feat.restaurantes[feat.restaurantes.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'restaurantes-cafeterias':
						feat.restaurantes[feat.restaurantes.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					
					/*PMR*/
					case 'informacion-pmr':
						feat.pmr[feat.pmr.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'parking-pmr':
						feat.parkingPmr2[feat.parkingPmr2.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'personas-discapacidad-auditiva':
						feat.pmr[feat.pmr.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'punto-encuentro-pmr':
						feat.pmr[feat.pmr.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					
					/*Transportes*/
					case 'autobus':
						feat.autobus[feat.autobus.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'autobus-lanzadera':
						feat.autobusLanzadera[feat.autobusLanzadera.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'informacion-transportes':
						feat.transportes[feat.transportes.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'intercambiador-transportes':
						feat.intercambiadorTrans[feat.intercambiadorTrans.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'mar':
						feat.transportes[feat.transportes.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'metro':
						feat.metro[feat.metro.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'taxi':
						feat.taxi[feat.taxi.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'tren':
						feat.tren[feat.tren.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'tren-entre-terminales':
						feat.trenTerm[feat.trenTerm.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					
					/*Informacion*/
					case 'agencia-viajes':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'companias-aereas':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'equipaje-extraviado':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'hotel':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'informacion-general-aena':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'informacion-pmr':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'informacion-transitos':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'informacion-turistica':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'objetos-perdidos':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'punto-encuentro':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'reserva-hoteles':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'touroperadores':
						feat.tourOperadores[feat.tourOperadores.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'venta-billetes':
						feat.info[feat.info.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					
					/*Otros Servicios*/
					case 'aseos':
						feat.aseos[feat.aseos.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'banco':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'cajero-automatico':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'capilla':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'correos':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'desfibriladores':
						feat.desfibriladores[feat.desfibriladores.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'fuerzas-seguridad':
						feat.seguridad[feat.seguridad.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'guarderia-zona-juegos':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'internet':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'intervencion-armas':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'maquina-expendedora':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'maquina-recarga-moviles':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'mezquita':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'ocio-cultura':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'primeros-auxilios':
						feat.auxilios[feat.auxilios.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'punto-fumadores':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'sala-bebes':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'sala-menores-no-acompanados':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'sala-multiconfesional':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'servicio-medico':
						feat.medico[feat.medico.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'sillas-bebes':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'telefono-publico':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'transporte-mercancias':
						feat.otros[feat.otros.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					
					/*Zona llegada/salida*/
					case 'aduana':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'auto-check-in':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'control-pasaportes-llegadas':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'control-pasaportes-salidas':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'control-pasaportes-transito':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'control-seguridad':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'control-seguridad-transito':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'facturacion':
						feat.facturacion[feat.facturacion.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'puerta-embarque':
						feat.puertaEmbarque[feat.puertaEmbarque.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'recogida-equipaje':
						feat.recogida[feat.recogida.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'sala-embarque':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'vestibulo-llegadas':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'vestibulo-llegadas-helipuerto':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'vestibulo-salidas':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;
					case 'zonas-embarque-helipuerto':
						feat.salidasLlegadas[feat.salidasLlegadas.length] = { "type": "Feature", "geometry": {"type": "Point", "coordinates": [lon,lat]},
							"properties": {"nombre": nom,"idPoi":idPoi,"categoria":categ_desc,"tipo":type_desc,"detalle":detalle,"term":term,"floor":floor}};
					break;

				}
			}
		};
		
		var finalGeoJSON = {'parkings':[],'parkingPmr':[],
							'salaVip':[],
							'alquiler':[],
							'tiendas':[],'farmacia':[],
							'restaurantes':[],
							'pmr':[],'parkingPmr2':[],
							'transportes':[],'autobus':[],'autobusLanzadera':[],'intercambiadorTrans':[],'metro':[],'taxi':[],'tren':[],'trenTerm':[],
							'info':[],'tourOperadores':[],
							'otros':[],'aseos':[],'seguridad':[],'medico':[],'desfibriladores':[],'auxilios':[],
							'salidasLlegadas':[],'facturacion':[],'puertaEmbarque':[],'recogida':[]
							};
					
        var reader = new OpenLayers.Format.GeoJSON();
        
        /*Parkings*/
        //console.log('leyendo parkings');
        finalGeoJSON.parkings = reader.read({
			"type": "FeatureCollection",
            "features": feat.parkings
        	});
        	
        finalGeoJSON.parkingPmr = reader.read({
			"type": "FeatureCollection",
            "features": feat.parkingPmr
        	});
        	
        /*Sala VIP*/
        //console.log('leyendo salaVip');
        finalGeoJSON.salaVip = reader.read({
			"type": "FeatureCollection",
            "features": feat.salaVip
        	});
        
        /*Alquiler*/
        //console.log('leyendo Alquiler');
        finalGeoJSON.alquiler = reader.read({
			"type": "FeatureCollection",
            "features": feat.alquiler
        	});
        	
        /*Tiendas*/
        //console.log('leyendo Tiendas');
        finalGeoJSON.tiendas = reader.read({
			"type": "FeatureCollection",
            "features": feat.tiendas
        	});
        
        finalGeoJSON.farmacia = reader.read({
			"type": "FeatureCollection",
            "features": feat.farmacia
        	});
        	
        /*Restaurantes*/
        //console.log('leyendo Restaurantes');
        finalGeoJSON.restaurantes = reader.read({
			"type": "FeatureCollection",
            "features": feat.restaurantes
        	});
        	
        /*PMR*/
        //console.log('leyendo PMR');
        finalGeoJSON.pmr = reader.read({
			"type": "FeatureCollection",
            "features": feat.pmr
        	});
        	
        finalGeoJSON.parkingPmr2 = reader.read({
			"type": "FeatureCollection",
            "features": feat.parkingPmr2
        	});
        	
        /*Transportes*/
        //console.log('leyendo Transportes');
        finalGeoJSON.transportes = reader.read({
			"type": "FeatureCollection",
            "features": feat.transportes
        	});
        	
        finalGeoJSON.autobus = reader.read({
			"type": "FeatureCollection",
            "features": feat.autobus
        	});
        	
        finalGeoJSON.autobusLanzadera = reader.read({
			"type": "FeatureCollection",
            "features": feat.autobusLanzadera
        	});
        	
        finalGeoJSON.intercambiadorTrans = reader.read({
			"type": "FeatureCollection",
            "features": feat.intercambiadorTrans
        	});
        	
        finalGeoJSON.metro = reader.read({
			"type": "FeatureCollection",
            "features": feat.metro
        	});
        	
        finalGeoJSON.taxi = reader.read({
			"type": "FeatureCollection",
            "features": feat.taxi
        	});
        	
        finalGeoJSON.tren = reader.read({
			"type": "FeatureCollection",
            "features": feat.tren
        	});
        	
        finalGeoJSON.trenTerm = reader.read({
			"type": "FeatureCollection",
            "features": feat.trenTerm
        	});
        
        /*Informacion*/
        //console.log('leyendo Informacion');
        finalGeoJSON.info = reader.read({
			"type": "FeatureCollection",
            "features": feat.info
        	});
        	
        finalGeoJSON.tourOperadores = reader.read({
			"type": "FeatureCollection",
            "features": feat.tourOperadores
        	});
        	
        /*Otros*/
       //console.log('leyendo Otros');
        finalGeoJSON.otros = reader.read({
			"type": "FeatureCollection",
            "features": feat.otros
        	});
        	
        finalGeoJSON.aseos = reader.read({
			"type": "FeatureCollection",
            "features": feat.aseos
        	});
        	
        finalGeoJSON.seguridad = reader.read({
			"type": "FeatureCollection",
            "features": feat.seguridad
        	});
        	
        finalGeoJSON.medico = reader.read({
			"type": "FeatureCollection",
            "features": feat.medico
        	});
        	
        finalGeoJSON.desfibriladores = reader.read({
			"type": "FeatureCollection",
            "features": feat.desfibriladores
        	});
        	
        finalGeoJSON.auxilios = reader.read({
			"type": "FeatureCollection",
            "features": feat.auxilios
        	});
        
        /*Salidas y llegadas*/
       // console.log('leyendo Salidas y llegadas');
        finalGeoJSON.salidasLlegadas = reader.read({
			"type": "FeatureCollection",
            "features": feat.salidasLlegadas
        	});
        	
        finalGeoJSON.facturacion = reader.read({
			"type": "FeatureCollection",
            "features": feat.facturacion
        	});
        	
        finalGeoJSON.puertaEmbarque = reader.read({
			"type": "FeatureCollection",
            "features": feat.puertaEmbarque
        	});
        	
        finalGeoJSON.recogida = reader.read({
			"type": "FeatureCollection",
            "features": feat.recogida
        	});

        return finalGeoJSON;
   };
    
    /**
     * Borra todas las capas que existian
     */
    me.deleteOldLayers = function(){
    	var layers;
    	
		/*Parkings*/
		layers = map.getLayersByName('sprinterParkings');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterParkings');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterParkingPmr');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterParkingPmr');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Sala VIP*/
		layers = map.getLayersByName('sprinterSalaVip');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterSalaVip');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Alquiler de coches*/
		layers = map.getLayersByName('sprinterCompaniaAlquilerCoches');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterCompaniaAlquilerCoches');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Tiendas y ocio*/
		layers = map.getLayersByName('sprinterTiendasOcio');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTiendasOcio');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterFarmacia');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterFarmacia');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Restaurantes y Cafeterias*/
		layers = map.getLayersByName('sprinterRestaurantesYCafeterias');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterRestaurantesYCafeterias');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*PMR*/
		layers = map.getLayersByName('sprinterPmr');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterPmr');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterParkingPmr2');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterParkingPmr2');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Transportes y accesos*/
		layers = map.getLayersByName('sprinterTransportes');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTransportes');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterAutobus');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterAutobus');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterAutobusLanzadera');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterAutobusLanzadera');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterIntercambiadorTransportes');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterIntercambiadorTransportes');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterMetro');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterMetro');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterTaxi');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTaxi');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterTren');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTren');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterTrenEntreTerminales');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTrenEntreTerminales');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Informacion*/
		layers = map.getLayersByName('sprinterInformacion');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterInformacion');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterTouroperadores');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterTouroperadores');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Otros servicios*/
		layers = map.getLayersByName('sprinterOtrosServicios');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterOtrosServicios');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterAseos');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterAseos');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterControlSeguridad');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterControlSeguridad');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterServicioMedico');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterServicioMedico');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterDesfibriladores');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterDesfibriladores');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterPrimerosAuxilios');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterPrimerosAuxilios');
			map.removeLayer(layers[layerIndex]);
		}
		
		/*Salidas y llegadas*/
		layers = map.getLayersByName('sprinterSalidasLlegadas');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterSalidasLlegadas');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterFacturacion');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterFacturacion');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterPuertaEmbarque');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterPuertaEmbarque');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterRecogidaEquipaje');
	   	for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterRecogidaEquipaje');
			map.removeLayer(layers[layerIndex]);
		}
		
		layers = map.getLayersByName('sprinterSelected');
		for(var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			//console.log('Borrando sprinterSelected');
			map.removeLayer(layers[layerIndex]);
		}
    };
    
    /**
     * Refresca la capa de POIs con los seleccionados de la planta seleccionada
     */
    me.refreshPois = function(){    	
    	map.removeControl(control);
    	//console.log('Refresh POIS');
    	
    	clearSelection();
    	
    	//Parking
		sprinterParkings.removeAllFeatures();
		sprinterParkingPmr.removeAllFeatures();
	
		//Sala VIP
		sprinterSalaVip.removeAllFeatures();
	
		//Alquiler de Coches
		sprinterCompaniaAlquilerCoches.removeAllFeatures();
	
		//Tiendas ocio
		sprinterTiendasOcio.removeAllFeatures();
		sprinterFarmacia.removeAllFeatures();
	
		//Restaurantes y Cafeterias
		sprinterRestaurantesYCafeterias.removeAllFeatures();
		//PMR
		sprinterPmr.removeAllFeatures();
		sprinterParkingPmr2.removeAllFeatures();

		//Transportes y accesos
		sprinterTransportes.removeAllFeatures();
		sprinterAutobus.removeAllFeatures();
		sprinterAutobusLanzadera.removeAllFeatures();
		sprinterIntercambiadorTransportes.removeAllFeatures();
		sprinterMetro.removeAllFeatures();
		sprinterTaxi.removeAllFeatures();
		sprinterTren.removeAllFeatures();
		sprinterTrenEntreTerminales.removeAllFeatures();
	
		//Informacion
		sprinterInformacion.removeAllFeatures();
		sprinterTouroperadores.removeAllFeatures();
	
		//Otros servicios
		sprinterOtrosServicios.removeAllFeatures();
		sprinterAseos.removeAllFeatures();
		sprinterControlSeguridad.removeAllFeatures();
		sprinterServicioMedico.removeAllFeatures();
		sprinterDesfibriladores.removeAllFeatures();
		sprinterPrimerosAuxilios.removeAllFeatures();
	
		//Salidas y llegadas
		sprinterSalidasLlegadas.removeAllFeatures();
		sprinterFacturacion.removeAllFeatures();
		sprinterPuertaEmbarque.removeAllFeatures();
		sprinterRecogidaEquipaje.removeAllFeatures();
		
		//Selected
		sprinterSelected.removeAllFeatures();
		
		me.deleteOldLayers();
		
		var added = [];
    	
    	var sprinters = me.getFeatures();
    	
    	/*Parkings*/
    	//console.log('Refresh Parkings');
    	if(sprinters.parkings.length>0){
    		sprinterParkings.addFeatures(sprinters.parkings);
    		map.addLayer(sprinterParkings);
    		added[added.length] = sprinterParkings;
    	}
    	if(sprinters.parkingPmr.length>0){
    		sprinterParkingPmr.addFeatures(sprinters.parkingPmr);
    		map.addLayer(sprinterParkingPmr);
    		added[added.length] = sprinterParkingPmr;
    	}
    	
    	/*Sala VIP*/
    	//console.log('Refresh SalaVIP');
    	if(sprinters.salaVip.length>0){
    		sprinterSalaVip.addFeatures(sprinters.salaVip);
    		map.addLayer(sprinterSalaVip);
    		added[added.length] = sprinterSalaVip;
    	}
    	
    	/*Alquiler Coches*/
    	//console.log('Refresh Alquiler Coches');
    	if(sprinters.alquiler.length>0){
    		sprinterCompaniaAlquilerCoches.addFeatures(sprinters.alquiler);
    		map.addLayer(sprinterCompaniaAlquilerCoches);
    		added[added.length] = sprinterCompaniaAlquilerCoches;
    	}
    	
    	/*Tiendas y Ocio*/
    	//console.log('Refresh Tiendas y Ocio');
    	if(sprinters.tiendas.length>0){
    		sprinterTiendasOcio.addFeatures(sprinters.tiendas);
    		map.addLayer(sprinterTiendasOcio);
    		added[added.length] = sprinterTiendasOcio;
    	}
    	if(sprinters.farmacia.length>0){
    		sprinterFarmacia.addFeatures(sprinters.farmacia);
    		map.addLayer(sprinterFarmacia);
    		added[added.length] = sprinterFarmacia;
    	}
    	
    	/*Restaurantes y Cafeterias*/
    	//console.log('Refresh Restaurantes y Cafeterias');
    	if(sprinters.restaurantes.length>0){
    		sprinterRestaurantesYCafeterias.addFeatures(sprinters.restaurantes);
    		map.addLayer(sprinterRestaurantesYCafeterias);
    		added[added.length] = sprinterRestaurantesYCafeterias;
    	}
    	
    	/*PMR*/
    	//console.log('Refresh PMR');
    	if(sprinters.pmr.length>0){
    		sprinterPmr.addFeatures(sprinters.pmr);
    		map.addLayer(sprinterPmr);
    		added[added.length] = sprinterPmr;
    	}
    	if(sprinters.parkingPmr2.length>0){
    		sprinterParkingPmr2.addFeatures(sprinters.parkingPmr2);
    		map.addLayer(sprinterParkingPmr2);
    		added[added.length] = sprinterParkingPmr2;
    	}
    	
    	/*Transportes*/
    	//console.log('Refresh Transportes');
    	if(sprinters.transportes.length>0){
    		sprinterTransportes.addFeatures(sprinters.transportes);
    		map.addLayer(sprinterTransportes);
    		added[added.length] = sprinterTransportes;
    	}
    	if(sprinters.autobus.length>0){
    		sprinterAutobus.addFeatures(sprinters.autobus);
    		map.addLayer(sprinterAutobus);
    		added[added.length] = sprinterAutobus;
    	}
    	if(sprinters.autobusLanzadera.length>0){
    		sprinterAutobusLanzadera.addFeatures(sprinters.autobusLanzadera);
    		map.addLayer(sprinterAutobusLanzadera);
    		added[added.length] = sprinterAutobusLanzadera;
    	}
    	if(sprinters.intercambiadorTrans.length>0){
    		sprinterIntercambiadorTransportes.addFeatures(sprinters.intercambiadorTrans);
    		map.addLayer(sprinterIntercambiadorTransportes);
    		added[added.length] = sprinterIntercambiadorTransportes;
    	}
    	if(sprinters.metro.length>0){
    		sprinterMetro.addFeatures(sprinters.metro);
    		map.addLayer(sprinterMetro);
    		added[added.length] = sprinterMetro;
    	}
    	if(sprinters.taxi.length>0){
    		sprinterTaxi.addFeatures(sprinters.taxi);
    		map.addLayer(sprinterTaxi);
    		added[added.length] = sprinterTaxi;
    	}
    	if(sprinters.tren.length>0){
    		sprinterTren.addFeatures(sprinters.tren);
    		map.addLayer(sprinterTren);
    		added[added.length] = sprinterTren;
    	}
    	if(sprinters.trenTerm.length>0){
    		sprinterTrenEntreTerminales.addFeatures(sprinters.trenTerm);
    		map.addLayer(sprinterTrenEntreTerminales);
    		added[added.length] = sprinterTrenEntreTerminales;
    	}
    	
    	/*Informacion*/
    	//console.log('Refresh Informacion');
    	if(sprinters.info.length>0){
    		sprinterInformacion.addFeatures(sprinters.info);
    		map.addLayer(sprinterInformacion);
    		added[added.length] = sprinterInformacion;
    	}
    	if(sprinters.tourOperadores.length>0){
    		sprinterTouroperadores.addFeatures(sprinters.tourOperadores);
    		map.addLayer(sprinterTouroperadores);
    		added[added.length] = sprinterTouroperadores;
    	}
    	
    	/*Otros*/
    	//console.log('Refresh Otros');
    	if(sprinters.otros.length>0){
    		sprinterOtrosServicios.addFeatures(sprinters.otros);
    		map.addLayer(sprinterOtrosServicios);
    		added[added.length] = sprinterOtrosServicios;
    	}
    	if(sprinters.aseos.length>0){
    		sprinterAseos.addFeatures(sprinters.aseos);
    		map.addLayer(sprinterAseos);
    		added[added.length] = sprinterAseos;
    	}
    	if(sprinters.seguridad.length>0){
    		sprinterControlSeguridad.addFeatures(sprinters.seguridad);
    		map.addLayer(sprinterControlSeguridad);
    		added[added.length] = sprinterControlSeguridad;
    	}
    	if(sprinters.medico.length>0){
    		sprinterServicioMedico.addFeatures(sprinters.medico);
    		map.addLayer(sprinterServicioMedico);
    		added[added.length] = sprinterServicioMedico;
    	}
    	if(sprinters.desfibriladores.length>0){
    		sprinterDesfibriladores.addFeatures(sprinters.desfibriladores);
    		map.addLayer(sprinterDesfibriladores);
    		added[added.length] = sprinterDesfibriladores;
    	}
    	if(sprinters.auxilios.length>0){
    		sprinterPrimerosAuxilios.addFeatures(sprinters.auxilios);
    		map.addLayer(sprinterPrimerosAuxilios);
    		added[added.length] = sprinterPrimerosAuxilios;
    	}
    	
    	/*Salidas y Llegadas*/
    	//console.log('Refresh Salidas y Llegadas');
    	if(sprinters.salidasLlegadas.length>0){
    		sprinterSalidasLlegadas.addFeatures(sprinters.salidasLlegadas);
    		map.addLayer(sprinterSalidasLlegadas);
    		added[added.length] = sprinterSalidasLlegadas;
    	}
    	if(sprinters.facturacion.length>0){
    		sprinterFacturacion.addFeatures(sprinters.facturacion);
    		map.addLayer(sprinterFacturacion);
    		added[added.length] = sprinterFacturacion;
    	}
    	if(sprinters.puertaEmbarque.length>0){
    		sprinterPuertaEmbarque.addFeatures(sprinters.puertaEmbarque);
    		map.addLayer(sprinterPuertaEmbarque);
    		added[added.length] = sprinterPuertaEmbarque;
    	}
    	if(sprinters.recogida.length>0){
    		sprinterRecogidaEquipaje.addFeatures(sprinters.recogida);
    		map.addLayer(sprinterRecogidaEquipaje);
    		added[added.length] = sprinterRecogidaEquipaje;
    	}
    	
    	//Selected
    	map.addLayer(sprinterSelected); 
    	map.setLayerIndex(sprinterSelected, 99);
    	added[added.length] = sprinterSelected;
    	
    	if(added.length>0){
    		control =  new OpenLayers.Control.SelectFeature(added, {
        						autoActivate:true,
        						onSelect: onSelectFunction});
        	map.addControl(control);
    	}
    	
    	//Miramos si hay que marcar alguna como seleccionada
    	if(GestorPOIDetails.getCoordsMap()!=null){
    		me.showPoiFromDetalleSelected();
    	}
    };

	/**
	 * Devuelve el array de capas a mostrar actual ejemplo: [MAD_T4_-2]
	 */
	me.getCurrentLayers=function() {
		var floorId = GestorPOIs.SELECTED_FLOORS_ID()[1];
		floorId = floorId.substring(floorId.indexOf('_')+1);
		var floor = GestorAirports.getFloorEquivalence(floorId);
		var layer = GestorPOIs.SELECTED_AIRPORT_ID() + "_" + GestorPOIs.SELECTED_TERMINALS_ID()[1] + "_" + floor;
		return [layer];
	};
	
	/**
	 * Devuelve la url de la capa de la web publica
	 */
	me.getCurrentLayerWpa=function() {
		var floorId = GestorPOIs.SELECTED_FLOORS_ID()[1];
		floorId = floorId.substring(floorId.indexOf('_')+1);
		var floor = GestorAirports.getFloorById(GestorPOIs.SELECTED_AIRPORT_ID(),GestorPOIs.SELECTED_TERMINALS_ID()[1],floorId);
		return floor[0].WPA_FLOOR;
	};
	
	/**
	 * Transforma las coordenadas de la WPA en coordenadas de su mapa para pintar los POIs
	 */
	me.transformCoordWPA = function(lat,lon){
		//Norte: 85.051123
		//Sur: 85.02071
		//Este: -179.648485
		//Oeste:   -180
		//Sistema de Coordenadas de la WPA
		var latZero = (85.051123 - 85.02071)/2 + 85.02071;
		var longZero = (180 - 179.648485)/2 -180;
	
		// var latZero = 85.0359165; // = (85.051123 - 85.02071)/2 + 85.02071;
		// var longZero = -179.8242425; // = (180 - 179.648485)/2 -180;
	
		var distLat = lat - latZero;
		var distLon = lon - longZero;
		var finalLat = ((distLat)/(85.051123 - 85.02071))*4096;
		// var finalLat = ((distLat)/(0.030413))*4096;
		// var finalLat = distLat * 134679.249;
		// var finalLat = (lat - 85.0359165) * 134679.249;
		
		var finalLon = ((distLon)/(180 - 179.648485))*4096;
		// var finalLon = ((distLon)/(0.351515))*4096;
		// var finalLon = distLon * 11652.4188;
		// var finalLon = (lon + 179.8242425) * 11652.4188;
		
		return [finalLat,finalLon];
	};
	
	/**
	 * Carga las capas de Google maps de la WPA
	 */
	me.wpaUrlFunc=function(bounds){
		var res = this.map.getResolution();
        var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
        var path;
        
        switch(z){
        	case 0:
        		path =  z + "/1" + "." + this.type;
        		break;
        	case 1:
        		var tmp = (y*2) + x +1;
        		path =   z + "/" + tmp + "." + this.type;
        		break;
        	case 2:
        		var tmp = (y*4) + x +1;
        		path =  z + "/" + tmp + "." + this.type;
        		break;
        	case 3:
        		var tmp = (y*8) + x +1;
        		path =  z + "/" + tmp + "." + this.type;
        		break;
        	case 4:
        		var tmp = (y*16) + x +1;
        		path =  z + "/" + tmp + "." + this.type;
        		break;
        	case 5:
        		var tmp = (y*32) + x +1;
        		path = z + "/" + tmp + "." + this.type;
        		break;
        	default:
        		//console.log("X: "+x);
        		//console.log("Y: "+y);
        		
        }
        
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
		//console.log('asd:'+url+path);
        return url + path;
	};
	
	/**
	 * Devuelve [Longitud,Latitud]
	 */
	me.getCurrentTerminalPosition=function(){
		var _params=[{'NAME':'TERMINAL_ID','VALUE':GestorPOIs.SELECTED_TERMINALS_ID()[1]},
			{'NAME':'AIRPORT_ID','VALUE':GestorPOIs.SELECTED_AIRPORT_ID()}];
		var term = $.getFilteredArrayFromJSONArray(GestorAirports.TERMINALS(),_params);
		var coords = [term[0].LONGITUDE,term[0].LATITUDE];
		return coords;
	};
	
	/**
	 * Devuelve si el aeropuerto actual esta geolocalizado
	 */
	me.isAirportGeolocated=function(){
		var _params=[{'NAME':'AIRPORT_ID','VALUE':GestorPOIs.SELECTED_AIRPORT_ID()}];
			
		var airport = $.getFilteredArrayFromJSONArray(GestorAirports.AIRPORTS(),_params);
		if(airport.length==0){
			return "";
		} else {
			return airport[0].mapWithGeo;
		}
	};

	/**
	 * Actualiza el mapa con la nueva planta seleciconada
	 */
	me.cambiaPlanta=function(terminalId,floorId) {
		me.refreshPois();
	 	if(me.isAirportGeolocated()){
				var newLayers = me.getCurrentLayers();
				var coords = me.getCurrentTerminalPosition();
				aenaWms.mergeNewParams({
					'layers' : newLayers
				});
				map.moveTo(new OpenLayers.LonLat(coords[0],coords[1]));
				map.zoomTo(ConstF.zoom2D);
		} else { //La funcion es la misma, solo hay que recargar el mapa
				wpaMaps.setUrl(me.getCurrentLayerWpa());
				wpaMaps.redraw();
				map.zoomTo(ConstF.zoom3D);
		}
	};
	
	/**
	 * Mueve el mapa a mi actual ubicacion
	 */
	me.toCurrentPosition = function(){
		var lon = GestorPosition.lastLongitude();
		var lat = GestorPosition.lastLatitude();
		if(lon!=null && lat!=null){
			me.pintaUbicacion();
       		//map.moveTo(new OpenLayers.LonLat(lon,lat));
       		map.zoomToExtent(vector.getDataExtent());
       	}
	};
	/**
	 * Actualiza en el mapa el pintado del monigote con la ultima posicion disponible
	 */
	me.pintaUbicacion = function(){
		if(me.isAirportGeolocated() && eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
			var lon = GestorPosition.lastLongitude();
			var lat = GestorPosition.lastLatitude();
			var prec =GestorPosition.lastAccuracy();
			if(mapaVisible && lon!=null && lat!=null && prec!=null){
				var styleGeofencing = {
        			fillOpacity: 0.1,
        			fillColor: '#000',
        			strokeColor: '#5C0F31',
        			strokeOpacity: 0.4
    			};
            	
				vector.removeAllFeatures();
        		vector.addFeatures([
            		new OpenLayers.Feature.Vector(
                		new OpenLayers.Geometry.Point(lon,lat),
                		{},
                		{
                    		externalGraphic: "../../themes/default/common/img/indoor_POI_Categories/ico_mapa_pois_persona.png",
            				graphicOpacity: Constantes.position_ico_opacity,
            				graphicWidth: Constantes.position_ico_width,
            				graphicHeight: Constantes.position_ico_height,
            				graphicYOffset: Constantes.position_ico_offsety
                		}
            		), 
					new OpenLayers.Feature.Vector(
                		OpenLayers.Geometry.Polygon.createRegularPolygon(
                    		new OpenLayers.Geometry.Point(lon, lat),
                    		prec/(2*111200),
                    		50,
                    		0
                		),
                		{},
                		styleGeofencing
            		)         		
        		]);
        		vector.refresh();
 
        	}
		}
	};
	
	/**Devuelve el nivel actual de zoom*/
	me.getCurrentZoom = function(){
		if(map!=null){
			return map.getZoom();
		} else {
			return null;
		}
	};
	/** Devuelve el centro de coordenadas que se estan visualizando actualmente*/
	me.getCurrentPosView = function(){
		if(map!=null){
			return map.getCenter();
		} else {
			return null;
		}
	};
	
	/**
	 * Muestra el detalle del poi que hay en detalle seleccionado en el mapa
	 */
	me.showPoiFromDetalleSelected = function(){
		var param = GestorPOIDetails.getParameters();
		if(control!=null){
			for(var i=0;i<control.layers.length;i++){ //Buscamos por todas las capas hasta encontrar el que hay que cambiar
				for(var j=0;j<control.layers[i].features.length;j++){
					var fea = control.layers[i].features[j];
					if(fea.attributes.idPoi==param.ASSET_ID){
						control.select(control.layers[i].features[j]);
						return;
					}
				}
			}
		}
	};

	me.setZoomForPOI = function() {
		if (map != null) {
			if(me.isAirportGeolocated()){
				map.zoomTo(ConstF.zoom2D * 1.75);
			} else {
				map.zoomTo(ConstF.zoom3D * 1.75);
			}
		}
	};
	//RP - Se añade la función para reiniciar el zoom en algunos clicks de ventana 
	me.setZoomToDefault = function() {
		if (map != null) {
			if(me.isAirportGeolocated()){
				map.zoomTo(ConstF.zoom2D);
			} else {
				map.zoomTo(ConstF.zoom3D);
			}
		}
	};
}


function _GestorPosition(){
	var me = this;
	var _lastAccuracy;
	var _lastLon;
	var _lastLat;
	var _first = true; //Indica si es la primera vez que se detecta una posicion
	var service;
	
	/**
	 *Arranca el hilo que obtiene posiciones 
	 */
	me.init = function(){
		if(eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
			me.startGeoService();
		} 
	};
	
	me.startGeoService = function(){
		service = setInterval(function(){
			navigator.geolocation.getCurrentPosition(function(position) {
						   GestorContexto.CONTEXT().UC_LATITUDE=position.coords.latitude.toString();
						   GestorContexto.CONTEXT().UC_LONGITUDE=position.coords.longitude.toString();
						   _lastLon = position.coords.longitude;
						   _lastLat = position.coords.latitude;
						   _lastAccuracy = position.coords.accuracy;
						   GestorOL.pintaUbicacion();
						   //Si es la primera vez, lanzar el modulo de aeropuertos cercanos
						   if(_first){
						   		_first = false;
						   		if(eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
						   			me.buscaAeropuertoCercano(false);
						   		}
						   	}
			}, function(error) {
			    			//console.log('watchPosition - ERROR:' + JSON.stringify(error));
			    			//console.log('error:'+JSON.stringify(error));
			    			GestorContexto.CONTEXT().UC_LATITUDE='';
			    			GestorContexto.CONTEXT().UC_LONGITUDE='';
			},{maximumAge:ConstF.delay_geolocation_maximumAge, timeout:ConstF.delay_geolocation_timeout,enableHighAccuracy: false});
		},ConstF.delay_geolocation_timeout);
	};
	
	me.stopGeoService = function(){
		navigator.geolocation.clearWatch(service);
	};

	/**
	 *Devuelve la ultima longitud obtenida 
	 */
	me.lastLongitude = function(){return _lastLon;};
	
	/**
	 *Devuelve la ultima latitud obtenida 
	 */
	me.lastLatitude = function(){return _lastLat;};
	
	/**
	 *Devuelve la ultima precision obtenida 
	 */
	me.lastAccuracy = function(){return _lastAccuracy;};
	
	/**
	 * Lanza el alert de Aeropuerto cercano cuando estamos suficientemente cerca de uno 
	 * @notifActual: true si quieres que explicitamente indique que ya es el que tienes seleccionado
	 */
	me.buscaAeropuertoCercano = function(notifActual){
		var aeropuertoMasCercano;
		var distAlMasCercano;
		//De cada aeropuerto miramos el rango y la distancia de las temrinales
		var airports = GestorAirports.AIRPORTS();
		for(var i=0;i<airports.length;i++){
			var _params=[{'NAME':'AIRPORT_ID','VALUE':airports[i].AIRPORT_ID}];
			var airportTerms = $.getFilteredArrayFromJSONArray(GestorAirports.TERMINALS(),_params);
			for(var j=0;j<airportTerms.length;j++){
				var distancia = me.distanciaGeodesica(_lastLat,_lastLon,airportTerms[j].LATITUDE,airportTerms[j].LONGITUDE);
				if(distancia < airports[i].KM_RANGE){
					if(aeropuertoMasCercano == null){
						aeropuertoMasCercano = airports[i];
						distAlMasCercano = distancia;
					} else { //Comparamos la distancia con el anterior encontrado
						if(distancia<distAlMasCercano){
							aeropuertoMasCercano = airports[i];
							distAlMasCercano = distancia;
						}
					}
				}
			}
		}
		if(aeropuertoMasCercano!=null){
			if(aeropuertoMasCercano.AIRPORT_ID!=GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID){
				//console.log('Aeropuerto mas cercano:'+aeropuertoMasCercano.AIRPORT_ID);
				//console.log('Distancia:'+distAlMasCercano);
				showConfirm(GestorIdiomas.getLiteral('autoLocate_WarningDetection') + aeropuertoMasCercano.AIRPORT_NAME + GestorIdiomas.getLiteral('autoLocate_WarningQuestion'),
							function ()
							{
								GestorPOIs.clearAllFilters();
								GestorAirports.setAirportManual(false);
								GestorAirports.changeDefaultAirport(aeropuertoMasCercano.AIRPORT_ID);
								GestorAirports.setAirport(aeropuertoMasCercano.AIRPORT_ID);
								GestorAirports.setAirportManual(true);
								if (ActualPage != 'init')
								{
									if (ActualPage == 'index')
										$($.mobile.activePage).trigger('pageshow');
									else
										browseFromClick('index.html','none',null,true);
								}

							});
			} else {
				//console.log('Ya es el aeropuerto que tiene');
				if(notifActual){
					showPopup(GestorIdiomas.getLiteral('autoLocate_alreadySelected'));
				}
			}
		} else {
			//console.log('Ningun aeropuerto esta dentro del rango');
		}
	};
	
	
	/**
	 *Devuelve la distancia geodesica entre dos puntos 
 	 * @param {Object} lat1
 	 * @param {Object} long1
 	 * @param {Object} lat2
 	 * @param {Object} long2
	 */
	me.distanciaGeodesica = function(lat1, long1, lat2, long2){ 
		var degtorad = 0.01745329; 
  		var radtodeg = 57.29577951; 
  		var dlong = (long1 - long2); 
  		var dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad)) 
   			+ (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad) 
   			* Math.cos(dlong * degtorad)); 
    
  		var dd = Math.acos(dvalue) * radtodeg; 
  
  		//miles = (dd * 69.16); 
  		km = (dd * 111.302); 
		return km; 
	};
}


function _GestorSurveys() {
	var me = this;
	
	var _airportID = '';
	var _languageID = '';
	var _surveys = [];
	
	// INICIALIZACIÓN
	// Se registra el gestor de encuestas con el gestor de servicios web
	me.init = function(wsDao) {
		Proxy.addOp('GetSurveys', null, wsDao);
	}
	
	
	// FUNCIONES
	
	// Asigna el aeropuerto con el que trabajar� el gestor de encuestas
	me.setAirport = function(airportId){
		if (_airportID != airportId)
		{
			_airportID = airportId;
			_surveys = [];
			//me.loadAirportSurveys();
		}
	}
	
	// Asigna el lenguaje con el que trabajar� el gestor de encuestas
	me.setLanguage = function(languageId, forceLoad){
		if (_languageID != languageId)
		{
			_languageID = languageId;
			_surveys = [];
			if (!!forceLoad) {
				//me.loadAirportSurveys();
			}
		}
	}
	
	// Obtiene la lista de encuestas vigentes disponibles en el aeropuerto
	me.loadAirportSurveys = function(okCB){
		
		//console.log('************************* TIEMPOS loadAirportSurveys - Se tratan de recuperar');
		
		if ($.objectHasContent(_airportID)){
			_languageID = GestorIdiomas.getLang();
			
			//console.log("Obtener encuestas");
			var _param = {'AIRPORT_ID':_airportID, 
					      'LANGUAGE_ID':_languageID};
											         
			//console.log('Obtener encuestas - PETICION:: ' + JSON.stringify(_param));
			Proxy.execute('GetSurveys', 
						_param,
						function(data){
							//console.log('************************* TIEMPOS loadAirportSurveys - Lo tenemos' + JSON.stringify(data));
							console.log('Obtener encuestas - RESPUESTA::' + JSON.stringify(data).substr(0,100));
							_surveys = data;
							if (okCB!=null && okCB!='undefined') okCB();
						},
						function(err){
							//console.log('************************* TIEMPOS loadAirportEncuestas - Error');
							//console.log('Obtener encuestas - ERROR:' + JSON.stringify(err));
							/*
							_surveys = [];
							_surveys[0] = {};
							_surveys[0]['survUrl'] = 'http://www.opinator.com/l/o2r';
							 okCB();
							 */
							showModalPopup(GestorIdiomas.getLiteral('loadingErrorMessage'));
							
						},
						ConstF.prioridadSoloNet);
			//console.log('Obtener encuestas finalizada');
		}
		else
		{
			//console.log('Obtener encuestas - ERROR: No se ha definido aeropuerto.');
			if (okCB!=null && okCB!='undefined') okCB();
		}
	};
	
	me.areThereAnySurvey = function() {
		return _surveys.length > 0;
	};
	
	// Pinta el listado de encuestas
	me.paintSurveys = function (targetId, okCB){
		me.getSurveyHTML(function (surveyHTML){
								if ($.objectHasContent(surveyHTML)){
									$('#' + targetId).replaceWith(surveyHTML);
									$('#' + targetId).trigger('create');
								}
								if (okCB != null && okCB!='undefined') okCB();
								if($('#waitingForSurvey')){//Solamente si va por p�gina externa
									$('#waitingForSurvey').css('display','none');
									autoScrollPageContentRole('surveys');
								}
							});
	}
	
	// Devuelve el HTML donde se pinta el listado de encuestas
	me.getSurveyListHTML = function (okCB){
		var _htmlData = '';
		var i;
		if (_surveys.length==0) {
			_htmlData+= _getUpperIconMessage(GestorIdiomas.getLiteral('mensaje_no_encuesta'), 'controlSection', null, 'controlSectionHeader');
		} else {
			for (i=0; i<_surveys.length; i++) {
				if ($.objectHasContent(_surveys[i])){
					_htmlData=_htmlData+'<div class="section-advertisingSection" id="divSurveys">';
				
					var _imageSrc = '';
					var _url = _surveys[i]['survUrl'];
					
					var _isURLValid = $.objectHasContent(_url);

					if ($.objectHasContent(_surveys[i]['survImage'])) _imageSrc =  "data:image/jpeg;base64," + _surveys[i]['survImage'].replace(/_/g,'/').replace(/-/g,'+');
					if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
						if(_isURLValid){
							_htmlData+='<a href="' + _url + '" target="_blank" rel="external">';
						}
						_htmlData+='<img id="publi" src="' + _imageSrc + '" width="100%" height="100%" alt="' + _surveys[i]['survAltText'] + '">';
						if(_isURLValid){
							_htmlData+='</a>';
						}
					} else {
						if(_isURLValid){
                            _htmlData+='<a href="#" onclick="javascript:browseExternalURL(\'' + _url + '\');">';
							// _htmlData+='<a href="javascript:navigator.app.loadUrl(\'' + _url + '\',{\'openExternal\':true});">';
						}
						_htmlData+='<img id="publi" src="' + _imageSrc + '" width="100%" height="100%" alt="' + _surveys[i]['survAltText'] + '">';
						if(_isURLValid){
							_htmlData+='</a>';
						}
					}
					_htmlData+='</div><br>';
					
				}
				else {
					_htmlData+='<div id="divSurveys" class="section-advertisingSection"></div>';
				}
			}
		}
		okCB(_htmlData);
	}
	
	// Devuelve el HTML donde se pinta el listado de encuestas
	me.getSurveyHTML = function (okCB){
		var _htmlData = '';
		if (_surveys.length >0 && $.objectHasContent(_surveys[0])){
				_htmlData += '<div id="listaEncuestas">';
				_htmlData += '<iframe id="iframeSurveys" width="100%" height="85%" frameborder="0" style="overflow:scroll;white-space:nowrap;" ';
				_htmlData += 'marginheight="0" marginwidth="0" ';
				_htmlData += 'src="' + _surveys[0]['survUrl']  + '" > ';
				_htmlData += '</iframe>';
				_htmlData += '</div>';
		} else {
			_htmlData += _getUpperIconMessage(GestorIdiomas.getLiteral('mensaje_no_encuesta'), 'controlSection', null, 'controlSectionHeader');
		}
		okCB(_htmlData);
	}
	
	// Devuelve el HTML donde se pinta el listado de encuestas
	me.openSurvey = function (okCB){
		if (_surveys.length >0 && $.objectHasContent(_surveys[0])){
			browseExternalURL(_surveys[0]['survUrl']);
		} else {
			showModalPopup(GestorIdiomas.getLiteral('mensaje_no_encuesta'));
		}
	}
	
	// -----------------------------------------------------------------------------------------------------------------------
	
}

/*
 SE OCUPA DE MANTENER CACHEADOS LOS PARÃ�METROS DE BÃšSQUEDA DE VUELOS
 * */
function _GestorCacheFlights() {
	var me = this;

	var _data = {
				FLIGHT:{AIRPORT_ID:'',FLIGHT_NUMBER:'',DATE:''},
				DEPARTURE:{AIRPORT_ID_DEP:'',AIRPORT_ID_ARR:'',DATE:'',AIRLINE_ID_IATA:''},
				ARRIVAL:{AIRPORT_ID_DEP:'',AIRPORT_ID_ARR:'',DATE:'',AIRLINE_ID_IATA:''},
			};
		
	me.DATA = function(){return _data}; 	
	
	me.changeAirport = function(airport){
		
		if(airport.AIRPORT_ID != _data.FLIGHT.AIRPORT_ID){
			_data.FLIGHT.AIRPORT_ID = airport.AIRPORT_ID;
			_data.FLIGHT.FLIGHT_NUMBER='';
			_data.FLIGHT.DATE='';
		}
		
		if(airport.AIRPORT_ID != _data.DEPARTURE.AIRPORT_ID_DEP){
			
			_data.DEPARTURE.AIRPORT_ID_DEP = airport.AIRPORT_ID;
			_data.DEPARTURE.AIRPORT_ID_ARR = '';
			_data.DEPARTURE.DATE='';
			_data.DEPARTURE.AIRLINE_ID_IATA='';
		}
		
		if(airport.AIRPORT_ID != _data.ARRIVAL.AIRPORT_ID_ARR){
			_data.ARRIVAL.AIRPORT_ID_ARR = airport.AIRPORT_ID;
			_data.ARRIVAL.AIRPORT_ID_DEP = '';
			_data.ARRIVAL.DATE='';
			_data.ARRIVAL.AIRLINE_ID_IATA='';
		}
		
	};
}

function _GestorAirports() {
	var me = this;

	// VARIABLES --------------------------------------------------------------------------------------------------------------

	/*ESTAN PREFIJADOS Y POR TANTO NO SE CARGAN DE WS*/
	var _airports = [{
		"AIRPORT_ID" : "LCG",
		"AIRPORT_OACI" : "LECO",
		"AIRPORT_NAME" : "A Coruña",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 20,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, 
	{
		"AIRPORT_ID" : "MAD",
		"AIRPORT_OACI" : "LEMD",
		"AIRPORT_NAME" : "Adolfo Suárez Madrid-Barajas",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 100,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, 
	{
		"AIRPORT_ID" : "ABC",
		"AIRPORT_OACI" : "LEAB",
		"AIRPORT_NAME" : "Albacete",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "AEI",
		"AIRPORT_OACI" : "LEAG",
		"AIRPORT_NAME" : "Algeciras",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "ALC",
		"AIRPORT_OACI" : "LEAL",
		"AIRPORT_NAME" : "Alicante-Elche",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 50,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "LEI",
		"AIRPORT_OACI" : "LEAM",
		"AIRPORT_NAME" : "Almería",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "OVD",
		"AIRPORT_OACI" : "LEAS",
		"AIRPORT_NAME" : "Asturias",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "BJZ",
		"AIRPORT_OACI" : "LEBZ",
		"AIRPORT_NAME" : "Badajoz",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "BCN",
		"AIRPORT_OACI" : "LEBL",
		"AIRPORT_NAME" : "Barcelona-El Prat",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 80,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "BIO",
		"AIRPORT_OACI" : "LEBB",
		"AIRPORT_NAME" : "Bilbao",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "RGS",
		"AIRPORT_OACI" : "LEBG",
		"AIRPORT_NAME" : "Burgos",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "JCU",
		"AIRPORT_OACI" : "GECE",
		"AIRPORT_NAME" : "Ceuta",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "ODB",
		"AIRPORT_OACI" : "LEBA",
		"AIRPORT_NAME" : "Córdoba",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "VDE",
		"AIRPORT_OACI" : "GCHI",
		"AIRPORT_NAME" : "El Hierro",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "GRX",
		"AIRPORT_OACI" : "LEGR",
		"AIRPORT_NAME" : "F.G.L Granada-Jaén",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "FUE",
		"AIRPORT_OACI" : "GCFV",
		"AIRPORT_NAME" : "Fuerteventura",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "GRO",
		"AIRPORT_OACI" : "LEGE",
		"AIRPORT_NAME" : "Girona-Costa Brava",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "LPA",
		"AIRPORT_OACI" : "GCLP",
		"AIRPORT_NAME" : "Gran Canaria",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "HSK",
		"AIRPORT_OACI" : "LEHC",
		"AIRPORT_NAME" : "Huesca-Pirineos",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "IBZ",
		"AIRPORT_OACI" : "LEIB",
		"AIRPORT_NAME" : "Ibiza",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "XRY",
		"AIRPORT_OACI" : "LEJR",
		"AIRPORT_NAME" : "Jerez",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "QGZ",
		"AIRPORT_OACI" : "GCGM",
		"AIRPORT_NAME" : "La Gomera",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	},{
		"AIRPORT_ID" : "SPC",
		"AIRPORT_OACI" : "GCLA",
		"AIRPORT_NAME" : "La Palma",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "ACE",
		"AIRPORT_OACI" : "GCRR",
		"AIRPORT_NAME" : "Lanzarote",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "LEN",
		"AIRPORT_OACI" : "LELN",
		"AIRPORT_NAME" : "León",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "RJL",
		"AIRPORT_OACI" : "LERJ",
		"AIRPORT_NAME" : "Logroño-Agoncillo",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "AGP",
		"AIRPORT_OACI" : "LEMG",
		"AIRPORT_NAME" : "Málaga-Costa del Sol",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	},{
		"AIRPORT_ID" : "MLN",
		"AIRPORT_OACI" : "GEML",
		"AIRPORT_NAME" : "Melilla",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "MAH",
		"AIRPORT_OACI" : "LEMH",
		"AIRPORT_NAME" : "Menorca",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "MJV",
		"AIRPORT_OACI" : "LELC",
		"AIRPORT_NAME" : "Murcia-San Javier",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	},  {
		"AIRPORT_ID" : "PMI",
		"AIRPORT_OACI" : "LEPA",
		"AIRPORT_NAME" : "Palma de Mallorca",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "PNA",
		"AIRPORT_OACI" : "LEPP",
		"AIRPORT_NAME" : "Pamplona",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "REU",
		"AIRPORT_OACI" : "LERS",
		"AIRPORT_NAME" : "Reus",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 20,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "SLM",
		"AIRPORT_OACI" : "LESA",
		"AIRPORT_NAME" : "Salamanca",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "EAS",
		"AIRPORT_OACI" : "LESO",
		"AIRPORT_NAME" : "San Sebastián",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING": true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "SDR",
		"AIRPORT_OACI" : "LEXJ",
		"AIRPORT_NAME" : "Santander",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "SCQ",
		"AIRPORT_OACI" : "LEST",
		"AIRPORT_NAME" : "Santiago",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "SVQ",
		"AIRPORT_OACI" : "LEZL",
		"AIRPORT_NAME" : "Sevilla",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "TFN",
		"AIRPORT_OACI" : "GCXO",
		"AIRPORT_NAME" : "Tenerife Norte",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "TFS",
		"AIRPORT_OACI" : "GCTS",
		"AIRPORT_NAME" : "Tenerife Sur",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "VLC",
		"AIRPORT_OACI" : "LEVC",
		"AIRPORT_NAME" : "Valencia",
		"HIGH_TRAFFIC_AIRPORT" : true,
		"KM_RANGE" : 50,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "VLL",
		"AIRPORT_OACI" : "LEVD",
		"AIRPORT_NAME" : "Valladolid",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 40,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "VGO",
		"AIRPORT_OACI" : "LEVX",
		"AIRPORT_NAME" : "Vigo",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "VIT",
		"AIRPORT_OACI" : "LEVT",
		"AIRPORT_NAME" : "Vitoria",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":false, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}, {
		"AIRPORT_ID" : "ZAZ",
		"AIRPORT_OACI" : "LEZG",
		"AIRPORT_NAME" : "Zaragoza",
		"HIGH_TRAFFIC_AIRPORT" : false,
		"KM_RANGE" : 30,
		"RESERVA_PARKING":true, 
		"mapWithGeo" : false,
		"RESERVE_VIP_ROOM": false,
		"RESERVE_VIP_ROOM_URL": null
	}];

	//_terminals[0].TERMINAL_NAME['en']
	var _terminals = [{
		"AIRPORT_ID" : "ABC",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 38.945433,
		"LONGITUDE" : -1.880255,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "ACE",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T1",
		"LATITUDE" : 28.95034,
		"LONGITUDE" : -13.60859,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T1",
			"en_GB" : "Terminal T1"
		},
		"TERMINAL_SHORT_NAME": "T1"		
	}, {
		"AIRPORT_ID" : "ACE",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2",
		"LATITUDE" : 28.952198,
		"LONGITUDE" : -13.606798,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2",
			"en_GB" : "Terminal T2"
		},
		"TERMINAL_SHORT_NAME": "T2"
	}, {
		"AIRPORT_ID" : "AEI",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 36.128967,
		"LONGITUDE" : -5.441118,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "AGP",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T1",
		"LATITUDE" : 36.673031,
		"LONGITUDE" : -4.487936,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T1",
			"en_GB" : "Terminal T1"
		},
		"TERMINAL_SHORT_NAME": "T1"
	}, {
		"AIRPORT_ID" : "AGP",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2",
		"LATITUDE" : 36.67403,
		"LONGITUDE" : -4.489374,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2",
			"en_GB" : "Terminal T2"
		},
		"TERMINAL_SHORT_NAME": "T2"
	}, {
		"AIRPORT_ID" : "AGP",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T3",
		"LATITUDE" : 36.675131,
		"LONGITUDE" : -4.490919,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T3",
			"en_GB" : "Terminal T3"
		},
		"TERMINAL_SHORT_NAME": "T3"
	}, {
		"AIRPORT_ID" : "AGP",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "TERMINAL-AVIACION-GENERAL",
		"LATITUDE" : 36.669572,
		"LONGITUDE" : -4.481499,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal de Av. General",
			"en_GB" : "General Aviation Terminal"
		},
		"TERMINAL_SHORT_NAME": "TAC"
	}, {
		"AIRPORT_ID" : "ALC",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 38.287997,
		"LONGITUDE" : -0.557154,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "BCN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T1",
		"LATITUDE" : 41.289352,
		"LONGITUDE" : 2.075279,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T1",
			"en_GB" : "Terminal T1"
		},
		"TERMINAL_SHORT_NAME": "T1"
	},
    /*
    {
		"AIRPORT_ID" : "BCN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2A",
		"LATITUDE" : 41.301604,
		"LONGITUDE" : 2.07412,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2 A",
			"en_GB" : "Terminal T2 A"
		},
		"TERMINAL_SHORT_NAME": "T2A"
	}, {
		"AIRPORT_ID" : "BCN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2B",
		"LATITUDE" : 41.303377,
		"LONGITUDE" : 2.078755,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2 B",
			"en_GB" : "Terminal T2 B"
		},
		"TERMINAL_SHORT_NAME": "T2B"
	}, {
		"AIRPORT_ID" : "BCN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2C",
		"LATITUDE" : 41.304489,
		"LONGITUDE" : 2.082124,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2 C",
			"en_GB" : "Terminal T2 C"
		},
		"TERMINAL_SHORT_NAME": "T2C"
	}, 
    */
    {
        "AIRPORT_ID" : "BCN",
        "RESERVA_PARKING":true,
        "TERMINAL_ID" : "T2",
        "LATITUDE" : 41.303377,
        "LONGITUDE" : 2.078755,
        "TERMINAL_NAME" : {
            "es_ES" : "Terminal T2",
            "en_GB" : "Terminal T2"
        },
        "TERMINAL_SHORT_NAME": "T2"
    },
    {
		"AIRPORT_ID" : "BIO",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 43.305163,
		"LONGITUDE" : -2.906184,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "BJZ",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 38.893555,
		"LONGITUDE" : -6.819634,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "EAS",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 43.356475,
		"LONGITUDE" : -1.793057,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "FUE",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 28.452392,
		"LONGITUDE" : -13.869284,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "GRO",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 41.89818,
		"LONGITUDE" : 2.765819,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "GRX",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 37.185108,
		"LONGITUDE" : -3.777001,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "HSK",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.08241,
		"LONGITUDE" : -0.322723,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "IBZ",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 38.876075,
		"LONGITUDE" : 1.368098,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "JCU",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 35.891944,
		"LONGITUDE" : -5.306219,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "LCG",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 43.302676,
		"LONGITUDE" : -8.380511,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "LEI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 36.847607,
		"LONGITUDE" : -2.369313,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "LEN",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.590737,
		"LONGITUDE" : -5.646173,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	},
	{
		"AIRPORT_ID" : "LPA",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 27.939498,
		"LONGITUDE" : -15.388455,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	},
	{
		"AIRPORT_ID" : "MAD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T1",
		"LATITUDE" : 40.463945,
		"LONGITUDE" : -3.570356,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T1",
			"en_GB" : "Terminal T1"
		},
		"TERMINAL_SHORT_NAME": "T1"
	}, {
		"AIRPORT_ID" : "MAD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T2",
		"LATITUDE" : 40.46826,
		"LONGITUDE" : -3.569565,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T2",
			"en_GB" : "Terminal T2"
		},
		"TERMINAL_SHORT_NAME": "T2"
	}, {
		"AIRPORT_ID" : "MAD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T3",
		"LATITUDE" : 40.471399,
		"LONGITUDE" : -3.57083,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T3",
			"en_GB" : "Terminal T3"
		},
		"TERMINAL_SHORT_NAME": "T3"
	}, {
		"AIRPORT_ID" : "MAD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T4",
		"LATITUDE" : 40.491528,
		"LONGITUDE" : -3.591692,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T4",
			"en_GB" : "Terminal T4"
		},
		"TERMINAL_SHORT_NAME": "T4"
	}, {
		"AIRPORT_ID" : "MAD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T4S",
		"LATITUDE" : 40.494286,
		"LONGITUDE" : -3.567295,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal T4S",
			"en_GB" : "Terminal T4S"
		},
		"TERMINAL_SHORT_NAME": "T4S"
	}, {
		"AIRPORT_ID" : "MAH",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 39.864804,
		"LONGITUDE" : 4.224973,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "MJV",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 37.775362,
		"LONGITUDE" : -0.818417,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "MLN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 35.277235,
		"LONGITUDE" : -2.957468,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "ODB",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 37.844529,
		"LONGITUDE" : -4.843748,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "OVD",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 43.559465,
		"LONGITUDE" : -6.032878,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "PMI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "ModuloA",
		"LATITUDE" : 39.550184,
		"LONGITUDE" : 2.729223,
		"TERMINAL_NAME" : {
			"es_ES" : "Módulo A",
			"en_GB" : "Module A"
		},
		"TERMINAL_SHORT_NAME": "ModA"
	}, {
		"AIRPORT_ID" : "PMI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "ModuloB",
		"LATITUDE" : 39.549456,
		"LONGITUDE" : 2.731876,
		"TERMINAL_NAME" : {
			"es_ES" : "Módulo B",
			"en_GB" : "Module B"
		},
		"TERMINAL_SHORT_NAME": "ModB"		
	}, {
		"AIRPORT_ID" : "PMI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "ModuloC",
		"LATITUDE" : 39.548662,
		"LONGITUDE" : 2.736905,
		"TERMINAL_NAME" : {
			"es_ES" : "Módulo C",
			"en_GB" : "Module C"
		},
		"TERMINAL_SHORT_NAME": "ModC"
	}, {
		"AIRPORT_ID" : "PMI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "ModuloD",
		"LATITUDE" : 39.5457,
		"LONGITUDE" : 2.732635,
		"TERMINAL_NAME" : {
			"es_ES" : "Módulo D",
			"en_GB" : "Module D"
		},
		"TERMINAL_SHORT_NAME": "ModD"
	}, {
		"AIRPORT_ID" : "PMI",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 39.547851,
		"LONGITUDE" : 2.731025,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "PNA",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.768486,
		"LONGITUDE" : -1.640589,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "QGZ",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 28.03,
		"LONGITUDE" : -17.2147222,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "REU",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 41.146806,
		"LONGITUDE" : 1.154192,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "RGS",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.354826,
		"LONGITUDE" : -3.622774,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "RJL",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.455939,
		"LONGITUDE" : -2.314859,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "SCQ",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.89766,
		"LONGITUDE" : -8.419969,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "SDR",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 43.423331,
		"LONGITUDE" : -3.824165,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "SLM",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 40.940328,
		"LONGITUDE" : -5.502305,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "SPC",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 28.621484,
		"LONGITUDE" : -17.752694,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "SVQ",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 37.423208,
		"LONGITUDE" : -5.899465,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "TFN",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 28.487402,
		"LONGITUDE" : -16.34624,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "TFS",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 28.047572,
		"LONGITUDE" : -16.577661,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "VDE",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 27.814046,
		"LONGITUDE" : -17.885195,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "VGO",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.225403,
		"LONGITUDE" : -8.632658,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "VIT",
		"RESERVA_PARKING":false, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 42.883574,
		"LONGITUDE" : -2.73109,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "VLC",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 39.491415,
		"LONGITUDE" : -0.47363,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "VLL",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 41.706007,
		"LONGITUDE" : -4.845075,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "XRY",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 36.750318,
		"LONGITUDE" : -6.063949,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}, {
		"AIRPORT_ID" : "ZAZ",
		"RESERVA_PARKING":true, 
		"TERMINAL_ID" : "T",
		"LATITUDE" : 41.663375,
		"LONGITUDE" : -1.00821,
		"TERMINAL_NAME" : {
			"es_ES" : "Terminal",
			"en_GB" : "Terminal"
		},
		"TERMINAL_SHORT_NAME": "T"
	}];

	var _floors = [{
		"AIRPORT_ID" : "ABC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ABC/ABC_T_P0/"
	}, {
		"AIRPORT_ID" : "ACE",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ACE/ACE_T1_P0/"
	}, {
		"AIRPORT_ID" : "ACE",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ACE/ACE_T1_P1/"
	}, {
		"AIRPORT_ID" : "ACE",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ACE/ACE_T2_P0/"
	}, {
		"AIRPORT_ID" : "AEI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AEI/AEI_T_P0/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T1_P0/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T1_P1/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T2_P-1/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T2_P0/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "35",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Entreplanta",
			"en_GB" : "Mezzanine"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T2_P0E/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T2_P1/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T3_P-1/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T3_P0/"
	}, {
		"AIRPORT_ID":"AGP",
		"TERMINAL_ID":"T3",
		"FLOOR_ID":"35",
		"DEFAULT_AIRPORT_FLOOR":false,
		"FLOOR_NAME":{
			"es_ES":"Entreplanta",
			"en_GB":"Mezzanine"
		},
		"WPA_FLOOR":"http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T3_P0E/"
	},{
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T3_P1/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_T3_P2/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "Terminal-Aviacion-General",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_TAG_P0/"
	}, {
		"AIRPORT_ID" : "AGP",
		"TERMINAL_ID" : "Terminal-Aviacion-General",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/AGP/AGP_TAG_P1/"
	}, {
		"AIRPORT_ID" : "ALC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "50",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -2",
			"en_GB" : "Floor -2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ALC/ALC_T_P-2/"
	}, {
		"AIRPORT_ID" : "ALC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ALC/ALC_T_P0/"
	}, {
		"AIRPORT_ID" : "ALC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ALC/ALC_T_P2/"
	}, {
		"AIRPORT_ID" : "ALC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "20",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 3",
			"en_GB" : "Floor 3"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ALC/ALC_T_P3/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T1_P0/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T1_P1/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T1_P2/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "20",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 3",
			"en_GB" : "Floor 3"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T1_P3/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2A",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2A_P0/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2A",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2A_P1/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2B",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2B_P0/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2B",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2B_P1/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2C",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2C_P0/"
	}, {
		"AIRPORT_ID" : "BCN",
		"TERMINAL_ID" : "T2C",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BCN/BCN_T2C_P1/"
	}, {
		"AIRPORT_ID" : "BIO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BIO/BIO_AP_P0/"
	}, {
		"AIRPORT_ID" : "BIO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BIO/BIO_T_P0/"
	}, {
		"AIRPORT_ID" : "BIO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BIO/BIO_T_P1/"
	}, {
		"AIRPORT_ID":"BIO",
		"TERMINAL_ID":"T",
		"FLOOR_ID":"20",
		"DEFAULT_AIRPORT_FLOOR":false,
		"FLOOR_NAME":{
			"es_ES":"Planta 3",
			"en_GB":"Floor 3"
		},
		"WPA_FLOOR":"http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BIO/BIO_T_P2/"
	},{
		"AIRPORT_ID" : "BJZ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/BJZ/BJZ_T_P0/"
	}, {
		"AIRPORT_ID" : "EAS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/EAS/EAS_T_P0/"
	}, {
		"AIRPORT_ID" : "EAS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/EAS/EAS_T_P1/"
	}, {
		"AIRPORT_ID" : "FUE",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/FUE/FUE_T_P0/"
	}, {
		"AIRPORT_ID" : "FUE",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/FUE/FUE_T_P1/"
	}, {
		"AIRPORT_ID" : "GRO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/GRO/GRO_T_P0/"
	}, {
		"AIRPORT_ID" : "GRO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/GRO/GRO_T_P1/"
	}, {
		"AIRPORT_ID" : "GRX",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/GRX/GRX_T_P0/"
	}, {
		"AIRPORT_ID" : "HSK",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/HSK/HSK_T_P0/"
	}, {
		"AIRPORT_ID" : "IBZ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/IBZ/IBZ_T_P0/"
	}, {
		"AIRPORT_ID" : "IBZ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/IBZ/IBZ_T_P1/"
	}, {
		"AIRPORT_ID" : "JCU",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/JCU/JCU_T_P0/"
	}, {
		"AIRPORT_ID" : "LCG",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LCG/LCG_T_P0/"
	}, {
		"AIRPORT_ID" : "LCG",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LCG/LCG_T_P1/"
	}, {
		"AIRPORT_ID" : "LEI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LEI/LEI_T_P-1/"
	}, {
		"AIRPORT_ID" : "LEI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LEI/LEI_T_P0/"
	}, {
		"AIRPORT_ID" : "LEN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LEN/LEN_T_P0/"
	}, {
		"AIRPORT_ID" : "LPA",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "P0:Lleg/Fact",
			"en_GB" : "F0:Arr/Check-in"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LPA/LPA_T_P0/"
	}, {
		"AIRPORT_ID" : "LPA",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "P1:Salidas",
			"en_GB" : "F1:Departure"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LPA/LPA_T_P1/"
	}, {
		"AIRPORT_ID" : "LPA",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "P2",
			"en_GB" : "F2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/LPA/LPA_T_P2/"
	},  {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T1_P0/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T1_P1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T1",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T1_P2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T2_P0/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T2_P1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T2",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T2_P2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T3_P0/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T3_P1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T3",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T3_P2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4",
		"FLOOR_ID" : "50",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -2",
			"en_GB" : "Floor -2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4_P-2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4_P-1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4_P0/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4_P1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4_P2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4S",
		"FLOOR_ID" : "50",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -2",
			"en_GB" : "Floor -2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4S_P-2/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4S",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4S_P-1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4S",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4S_P0/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4S",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4S_P1/"
	}, {
		"AIRPORT_ID" : "MAD",
		"TERMINAL_ID" : "T4S",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAD/MAD_T4S_P2/"
	}, {
		"AIRPORT_ID" : "MAH",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAH/MAH_T_P0/"
	}, {
		"AIRPORT_ID" : "MAH",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAH/MAH_T_P1/"
	}, {
		"AIRPORT_ID" : "MAH",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MAH/MAH_T_P2/"
	}, {
		"AIRPORT_ID" : "MJV",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MJV/MJV_T_P0/"
	}, {
		"AIRPORT_ID" : "MLN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/MLN/MLN_T_P0/"
	}, {
		"AIRPORT_ID" : "ODB",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ODB/ODB_T_P0/"
	}, {
		"AIRPORT_ID" : "OVD",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/OVD/OVD_T_P0/"
	}, {
		"AIRPORT_ID" : "OVD",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/OVD/OVD_T_P1/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloA",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MA_P0/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloA",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MA_P1/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloB",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MB_P0/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloB",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MB_P1/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloC",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MC_P1/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloD",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MD_P0/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "ModuloD",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_MD_P1/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_T_P0/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_T_P2/"
	}, {
		"AIRPORT_ID" : "PMI",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "15",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 4",
			"en_GB" : "Floor 4"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PMI/PMI_T_P4/"
	}, {
		"AIRPORT_ID" : "PNA",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/PNA/PNA_T_P0/"
	}, {
		"AIRPORT_ID" : "QGZ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/QGZ/QGZ_T_P0/"
	},{
		"AIRPORT_ID" : "REU",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/REU/REU_T_P0/"
	}, {
		"AIRPORT_ID" : "RGS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/RGS/RGS_T_P0/"
	}, {
		"AIRPORT_ID" : "RJL",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/RJL/RJL_T_P0/"
	}, {
		"AIRPORT_ID" : "RJL",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/RJL/RJL_T_P0/"
	}, {
		"AIRPORT_ID" : "SCQ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SCQ/SCQ_T_P0/"
	}, {
		"AIRPORT_ID" : "SCQ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SCQ/SCQ_T_P1/"
	}, {
		"AIRPORT_ID" : "SDR",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SDR/SDR_T_P0/"
	}, {
		"AIRPORT_ID" : "SDR",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SDR/SDR_T_P1/"
	}, {
		"AIRPORT_ID" : "SLM",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SLM/SLM_T_P0/"
	}, {
		"AIRPORT_ID" : "SPC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SPC/SPC_T_P0/"
	}, {
		"AIRPORT_ID":"SPC",
		"TERMINAL_ID":"T",
		"FLOOR_ID":"45",
		"DEFAULT_AIRPORT_FLOOR":false,
		"FLOOR_NAME":{
			"es_ES":"Planta -1",
			"en_GB":"Floor -1"
		},
		"WPA_FLOOR":"http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SPC/SPC_T_P-1/"
	},{
		"AIRPORT_ID" : "SPC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SPC/SPC_T_P1/"
	}, {
		"AIRPORT_ID" : "SVQ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SVQ/SVQ_T_P0/"
	}, {
		"AIRPORT_ID" : "SVQ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/SVQ/SVQ_T_P1/"
	}, {
		"AIRPORT_ID" : "TFN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFN/TFN_T_P-1/"
	}, {
		"AIRPORT_ID" : "TFN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFN/TFN_T_P0/"
	}, {
		"AIRPORT_ID" : "TFN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "35",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Entreplanta",
			"en_GB" : "Mezzanine"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFN/TFN_T_P0E/"
	}, {
		"AIRPORT_ID" : "TFN",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFN/TFN_T_P1/"
	}, {
		"AIRPORT_ID" : "TFS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "45",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta -1",
			"en_GB" : "Floor -1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFS/TFS_T_P-1/"
	}, {
		"AIRPORT_ID" : "TFS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFS/TFS_T_P0/"
	}, {
		"AIRPORT_ID" : "TFS",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/TFS/TFS_T_P1/"
	}, {
		"AIRPORT_ID" : "VDE",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VDE/VDE_T_P0/"
	}, {
		"AIRPORT_ID" : "VGO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VGO/VGO_T_P0/"
	}, {
		"AIRPORT_ID" : "VGO",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VGO/VGO_T_P1/"
	}, {
		"AIRPORT_ID" : "VIT",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VIT/VIT_T_P0/"
	}, {
		"AIRPORT_ID" : "VLC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VLC/VLC_T_P0/"
	}, {
		"AIRPORT_ID" : "VLC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VLC/VLC_T_P1/"
	}, {
		"AIRPORT_ID" : "VLC",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "25",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 2",
			"en_GB" : "Floor 2"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VLC/VLC_T_P2/"
	}, {
		"AIRPORT_ID" : "VLL",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VLL/VLL_T_P0/"
	}, {
		"AIRPORT_ID" : "VLL",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/VLL/VLL_T_P1/"
	}, {
		"AIRPORT_ID" : "XRY",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/XRY/XRY_T_P0/"
	}, {
		"AIRPORT_ID" : "XRY",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "30",
		"DEFAULT_AIRPORT_FLOOR" : false,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 1",
			"en_GB" : "Floor 1"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/XRY/XRY_T_P1/"
	}, {
		"AIRPORT_ID" : "ZAZ",
		"TERMINAL_ID" : "T",
		"FLOOR_ID" : "40",
		"DEFAULT_AIRPORT_FLOOR" : true,
		"FLOOR_NAME" : {
			"es_ES" : "Planta 0",
			"en_GB" : "Floor 0"
		},
		"WPA_FLOOR" : "http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ZAZ/ZAZ_T_P0/"
	},{
		"AIRPORT_ID":"ZAZ",
		"TERMINAL_ID":"T",
		"FLOOR_ID":"30",
		"DEFAULT_AIRPORT_FLOOR":false,
		"FLOOR_NAME":{
			"es_ES":"Planta 1",
			"en_GB":"Floor 1"
		},
		"WPA_FLOOR":"http://www.aena-aeropuertos.es/csee/ccurl/cartografia/ZAZ/ZAZ_T_P1/"
	}];

	me.AIRPORTS = function() {
		return _airports;
	};
	me.TERMINALS = function() {
		return _terminals;
	};
	var _selectedAirport;
	me.SELECTED_AIRPORT = function() {
		return _selectedAirport;
	};

	// Para mecanismo de caché en la búsqueda de vuelo (en combinación con SELECTED AIRPORT)
	var _connectedAirportsFrom = [];
	var _connectedAirportsTo = [];
	me.CONNECTED_AIRPORTS_FROM = function() {
		return _connectedAirportsFrom;
	};
	me.CONNECTED_AIRPORTS_TO = function() {
		return _connectedAirportsTo;
	};

	var _isAirportManual = false;
	me.IS_AIRPORT_MANUAL = function() {
		return _isAirportManual;
	};
	me.setAirportManual = function(isManual) {
		_isAirportManual = isManual;
	};

	// INICIALIZACION ---------------------------------------------------------------------------------------------------------

	// Función de inicialización del gestor de aeropuertos con el resgistor de las operaciones de WS necesarias
	me.init = function(wsDao) {
		Proxy.addOp('BuscarAeropuertosDestino', null, wsDao);
		Proxy.addOp('BuscarAeropuertosOrigen', null, wsDao);
		Proxy.addOp('GetAirports', null, wsDao);
		//Sobreescribe los aeropuertos,terminales y plantas si se han guardado con anterioridad

		var tmpAirports = GestorPrefs.getPref(ConstF.PREF_AEROPUERTOS);
		if($.objectHasContent(tmpAirports)) {
			tmpAirports = JSON.parse(tmpAirports);		
		}

		var tmpTerminals = GestorPrefs.getPref(ConstF.PREF_TERMINALES);
		if($.objectHasContent(tmpTerminals)) {
			tmpTerminals = JSON.parse(tmpTerminals);
			// tmpTerminals = JSON.parse(GestorPrefs.getPref(ConstF.PREF_TERMINALES));
		}

		var tmpFloors = GestorPrefs.getPref(ConstF.PREF_FLOORS);
		if($.objectHasContent(tmpFloors)) {
			tmpFloors = JSON.parse(tmpFloors);
			// tmpFloors = JSON.parse(GestorPrefs.getPref(ConstF.PREF_FLOORS));
		}
        /*
console.log("FJORDAN: Aeropuertos: " + tmpAirports);
console.log("FJORDAN: Terminales: " + tmpTerminals);
console.log("FJORDAN: Floors: " + tmpFloors);

// DUMP localStorage
		console.log("FJORDAN: Dump localstorage");
		for ( var key in window.localStorage ){
			console.log("FJORDAN: -----------------------------------------------------------------")
			console.log("FJORDAN: localStorage key: " + key);
			console.log("FJORDAN: localStorage value: " + window.localStorage.getItem( key ));
		}
		console.log("FJORDAN: END Dump localstorage");
         */
		if($.objectHasContent(tmpAirports) && $.objectHasContent(tmpTerminals) && $.objectHasContent(tmpFloors)) {
			_airports = tmpAirports;
			_terminals = tmpTerminals;
			_floors = tmpFloors;
			console.log('FJORDAN: Aeropuertos cargados de los WS');
		} else {
			console.log('FJORDAN: Se cargan los de por defecto');
		}

	};

	// ------------------------------------------------------------------------------------------------------------------------

	// FUNCIONES --------------------------------------------------------------------------------------------------------------

	// Función de modificación del aeropuerto seleccionado
	me.setAirport = function(airportId) {
		if(_selectedAirport == null || airportId != _selectedAirport.AIRPORT_ID) {
			_selectedAirport = $.getSingleObjectByPKFromJSONArray(_airports, 'AIRPORT_ID', airportId);
			// Vaciado del caché
			_connectedAirportsFrom = [];
			_connectedAirportsTo = [];
			reloadMap = true;
			/**Legacy para cuando recuerde posiciones*/
			fromMapTab = false;
			lastPosition = null;
			lastZoom = null;
			/**---------------------------*/
			catExpanded = null;
			typeExpanded = null;
			GestorDepartureFlights.clearFlights();
			GestorArrivalFlights.clearFlights();
			GestorPOIs.clearAllFilters();
		}
	};

	// Función que devuelve todos los aeropuestos conectados con un aeropueto determinado
	// (airportId) con vuelos que PARTEN desde ese aeropuerto (airportId).
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getConnectedAirportsFrom = function(okCB) {

		//console.log("Recuperación de aeropuerto destino");

		if(_connectedAirportsFrom.length == 0) {

			var _param = {
				'arg0' : _selectedAirport.AIRPORT_ID
			};

			//console.log('Recuperación de aeropuerto destino - PETICION:: ' + JSON.stringify(_param));
			Proxy.execute('BuscarAeropuertosDestino', _param, function(data) {
				//console.log('Recuperación de aeropuerto destino - RESPUESTA:' + JSON.stringify(data).substr(0,100));
				_connectedAirportsFrom = data;
				okCB();
			}, function(err) {
				//console.log('Recuperación de aeropuerto destino - ERROR:' + JSON.stringify(err));
				okCB();
			}, ConstF.prioridadSoloNet);
			//console.log('Recuperación de aeropuerto destino finalizada');
		} else {
			//console.log('Recuperación de aeropuerto destino ya cacheados');
			okCB();
		}
	};
	// Función que devuelve todos los aeropuestos conectados con un aeropueto determinado
	// (airportId) con vuelos que LLEGAN hasta ese aeropuerto (airportId).
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getConnectedAirportsTo = function(okCB) {

		//console.log("Recuperación de aeropuerto origen");

		if(_connectedAirportsTo.length == 0) {
			var _param = {
				'arg0' : _selectedAirport.AIRPORT_ID
			};

			//console.log('Recuperación de aeropuerto origen - PETICION:: ' + JSON.stringify(_param));
			Proxy.execute('BuscarAeropuertosOrigen', _param, function(data) {
				//console.log('Recuperación de aeropuerto origen - RESPUESTA:' + JSON.stringify(data).substr(0,100));
				_connectedAirportsTo = data;
				okCB();
			}, function(err) {
				//console.log('Recuperación de aeropuerto origen - ERROR:' + JSON.stringify(err));
				okCB();
			}, ConstF.prioridadSoloNet);
			//console.log('Recuperación de aeropuerto origen finalizada');
		} else {
			//console.log('Recuperación de aeropuerto origen ya cacheados');
			okCB();
		}
	};
	// Función que devuelve todo el JSON de un aeropuerto a partir del AIRPORTID;
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getAirportById = function(airportId) {
		return $.getSingleObjectByPKFromJSONArray(_airports, 'AIRPORT_ID', airportId);
	};

	// Función que devuelve el JSON de las plantas de un aeropuerto
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getAirportFloors = function(airportId) {
		var _params = [{
			'NAME' : 'AIRPORT_ID',
			'VALUE' : airportId
		}];
		return $.getFilteredArrayFromJSONArray(_floors, _params);
	};

	// Función que devuelve el JSON de la planta por defecto de un aeropuerto
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getDefaultAirportFloor = function(airportId) {
		var _airportFloors = me.getAirportFloors(airportId);
		_params = [{
			'NAME' : 'DEFAULT_AIRPORT_FLOOR',
			'VALUE' : true
		}];
		return $.getFilteredArrayFromJSONArray(_airportFloors, _params);
	};

	// Función que devuelve el JSON de las plantas de un aeropuerto
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getFloorById = function(airportId, terminalId, floorId) {
		var _params = [];
		if(airportId){
			_params.push({
				'NAME' : 'AIRPORT_ID',
				'VALUE' : airportId
			});
		}
		
		if(terminalId){
			_params.push({
				'NAME' : 'TERMINAL_ID',
				'VALUE' : terminalId
			});
		}
		
		if(floorId){
			_params.push({
				'NAME' : 'FLOOR_ID',
				'VALUE' : floorId
			});
		}

		return $.getFilteredArrayFromJSONArray(_floors, _params);
	};

	// Función que devuelve el JSON de las terminales de un aeropuerto
	// Método "estático" no tienen en cuenta el aeropuerto seleccionado sino el pasado por argumento
	me.getTerminals = function(airportId) {
		var _params = [{
			'NAME' : 'AIRPORT_ID',
			'VALUE' : airportId
		}];
		return $.getFilteredArrayFromJSONArray(_terminals, _params);
	};
	
	/**
	 * Devuelve la terminal de ese aeropuerto 
	 */
	me.getTerminalById = function(airportId,terminalId) {
		var _params = [{
			'NAME' : 'AIRPORT_ID',
			'VALUE' : airportId
		}, {
			'NAME' : 'TERMINAL_ID',
			'VALUE' : terminalId
		}];
		return $.getFilteredArrayFromJSONArray(_terminals, _params);
	};
	
	me.applyAirportMarginDateTimeFrom = function(airport, dateTime, isDeparture) {
		var _dateFromMargin = 0;
		if(isDeparture){ //Departures
			if(airport.HIGH_TRAFFIC_AIRPORT) {
				_dateFromMargin = ConstF.Dep_HTA_From_Margin;
			} else {
				_dateFromMargin = ConstF.Dep_LTA_From_Margin;
			}
		} else{ //Arrivals
			if(airport.HIGH_TRAFFIC_AIRPORT) {
				_dateFromMargin = ConstF.Arr_HTA_From_Margin;
			} else {
				_dateFromMargin = ConstF.Arr_LTA_From_Margin;
			}
		}
		
		var _dat = new Date(dateTime.getTime() + _dateFromMargin * 60000);
		var _res = new Date(Date.UTC(_dat.getFullYear(), _dat.getMonth(), _dat.getDate(), _dat.getHours(), _dat.getMinutes()));
		return _res;
	};

	me.applyAirportMarginDateTimeTo = function(airport, dateTime, isDeparture) {
		var _dateToMargin = 0;
		if(isDeparture){ //Departures
			if(airport.HIGH_TRAFFIC_AIRPORT) {
				_dateToMargin = ConstF.Dep_HTA_To_Margin;
			} else {
				_dateToMargin = ConstF.Dep_LTA_To_Margin;
			}
		} else{ //Arrivals
			if(airport.HIGH_TRAFFIC_AIRPORT) {
				_dateToMargin = ConstF.Arr_HTA_To_Margin;
			} else {
				_dateToMargin = ConstF.Arr_LTA_To_Margin;
			}
		}
		var _dat = new Date(dateTime.getTime() + _dateToMargin * 60000);
		var _res = new Date(Date.UTC(_dat.getFullYear(), _dat.getMonth(), _dat.getDate(), _dat.getHours(), _dat.getMinutes()));
		return _res;
	};

	me.applyAirportMarginDateTimeNum = function(airport,dateTime) {
		//RP 15/05/2014 - Se pasa la fecha TO en las consultas
		//var _dateToMargin = 15 * 24 * 60;
		var _dateToMargin = ConstF.Search_To_Margin;
		
		//En minutos

		var _dat = new Date(dateTime.getTime() + _dateToMargin * 60000);
		var _res = new Date(Date.UTC(_dat.getFullYear(), _dat.getMonth(), _dat.getDate(), _dat.getHours(), _dat.getMinutes()));
		return _res;
	};
	/**
	 * Devuelve la equivalencia que nos dieron la WPA de numero de planta y id
	 * @param {Object} floorId
	 */
	me.getFloorEquivalence = function(floorId) {
		var equivalence;
		switch(floorId) {
			case '10':
				equivalence = '5';
				break;
			case '15':
				equivalence = '4';
				break;
			case '20':
				equivalence = '3';
				break;
			case '25':
				equivalence = '2';
				break;
			case '30':
				equivalence = '1';
				break;
			case '35':
				equivalence = '0E';
				break;
			case '40':
				equivalence = '0';
				break;
			case '45':
				equivalence = '-1';
				break;
			case '50':
				equivalence = '-2';
				break;
			case '55':
				equivalence = '-3';
				break;
			case '60':
				equivalence = '-4';
				break;
			case '65':
				equivalence = '-5';
				break;
		}
		return equivalence;
	};
	/*
	 me.applyAirportMarginDateTimeFrom = function(airport, dateTime)
	 {
	 var _dateFromMargin = 0;
	 if (airport.HIGH_TRAFFIC_AIRPORT){
	 _dateFromMargin = ConstF.HTA_From_Margin;
	 }
	 else{
	 _dateFromMargin = ConstF.LTA_From_Margin;
	 }
	 return new Date(dateTime.getTime() + _dateFromMargin*60000);
	 }

	 me.applyAirportMarginDateTimeTo = function(airport, dateTime)
	 {
	 var _dateToMargin = 0;
	 if (airport.HIGH_TRAFFIC_AIRPORT){
	 _dateToMargin = ConstF.HTA_To_Margin;
	 }
	 else{
	 _dateToMargin = ConstF.LTA_To_Margin;
	 }

	 return new Date(dateTime.getTime() + _dateToMargin*60000);
	 }
	 */
	me.isAENAAirport = function(airportID) {
		return (GestorAirports.getAirportById(airportID) != null);
	};

	me.changeDefaultAirport = function(_airportId) {
		if(me.isAENAAirport(_airportId) && _airportId != GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID && !_isAirportManual) {
			var _airport = GestorAirports.getAirportById(_airportId);
			GestorContexto.CONTEXT().UC_AIRPORT = _airport;
			GestorContexto.setAirportTime();
			//GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME=new Date();
			GestorBanners.setAirport(_airportId);
			GestorSurveys.setAirport(_airportId);
			GestorPromotions.setAirport(_airportId);
			GestorCacheFlights.changeAirport(_airport);
			//Se limpia el listado de vuelos de los paneles
			GestorArrivalFlights.clearFlights();
			GestorDepartureFlights.clearFlights();
			//Se recarga con el nuevo aeropuerto
			loadPanelFlights();
			
			catExpanded = null;
			typeExpanded = null;
			
			GestorPOIs.setAirport(_airportId);
			GestorPOIs.clearAllFilters();
			
			//RPLAZA  - 11/04/2014
			//GestorPrefs.setPref('DEFAULT_AIRPORT',_airportId);//Se establece en preferencias siempre que se cambia
			GestorSettings.setSetting('DEFAULT_AIRPORT',_airportId);
			
			var currPg = $.mobile.activePage.attr('id');
			$('#'+currPg).trigger('pageshow');
					
		}
	};
	/*Actualiza aeropuertos, terminales y plantas si toca*/
	me.updateAirports = function(okCB, errCB) {
		var lastUpdateMilli = GestorPrefs.getPref(ConstF.PREF_LAST_UPDATE_AIRPORTS);
		var lastUpdate;
		var limitUpdate;
		var today = new Date();

		if(lastUpdateMilli != null) {
			lastUpdate = new Date(parseInt(lastUpdateMilli));
			//console.log('Ultima actualizacion:' + lastUpdate.toString());
			limitUpdate = new Date(lastUpdate.getTime());
			limitUpdate.setDate(limitUpdate.getDate() + ConstF.daysUpdateAirports);
			//console.log('Limite de validez:'+limitUpdate.toString());
		}

		if(lastUpdateMilli == null || today > limitUpdate) {
			var _newAirports;
			var _newTerminals;
			var _newFloors;
			getAirportUpdate(function(dataAir) {
				if(dataAir != null) {
					//console.log('Aeropuertos conseguidos');
					console.log("FJORDAN: NUEVOS AEROPUERTOS desde el WS");
					_newAirports = dataAir;
					getTerminalUpdate(function(dataTerm) {
						if(dataTerm != null) {
							//console.log('Terminales conseguidas');
							_newTerminals = dataTerm;
							getFloorUpdate(function(dataFloor) {
								if(dataFloor != null) {
									//console.log('Plantas conseguidas');
									_newFloors = dataFloor;
									replaceNewAirportData(_newAirports, _newTerminals, _newFloors);
									if (okCB) {
										okCB();
									}
								} else {
									//console.log('Error consiguiendo plantas');
									if (errCB) {
										errCB();
									}
								}
							});
						} else {
							//console.log('Error consiguiendo terminales');
							if (errCB) {
								errCB();
							}
						}
					});
				} else {
					//console.log('No se pudo conseguir aeropuertos');
					if (errCB) {
						errCB();
					}
				}
			});
		} else {
			//console.log('No es necesario actualizar');
			if (errCB) {
				errCB();
			}
		}
	};
	function getAirportUpdate(okCB) {
		var _param = {
			'method' : 'airports'
		};
		Proxy.execute('GetAirports', _param, function(data) {
			okCB(data);
		}, function(err) {
			okCB(null);
		}, ConstF.prioridadSoloNet);
	}

	function getTerminalUpdate(okCB) {
		var _param = {
			'method' : 'terminals'
		};
		Proxy.execute('GetAirports', _param, function(data) {
			okCB(data);
		}, function(err) {
			okCB(null);
		}, ConstF.prioridadSoloNet);
	}

	function getFloorUpdate(okCB) {
		var _param = {
			'method' : 'floors'
		};
		Proxy.execute('GetAirports', _param, function(data) {
			okCB(data);
		}, function(err) {
			okCB(null);
		}, ConstF.prioridadSoloNet);
	}

	function replaceNewAirportData(airports, terminals, floors) {
		console.log('FJORDAN: Reemplazando nuevos datos');
		GestorPrefs.setPref(ConstF.PREF_AEROPUERTOS, JSON.stringify(airports));				
		GestorPrefs.setPref(ConstF.PREF_TERMINALES, JSON.stringify(terminals));
		GestorPrefs.setPref(ConstF.PREF_FLOORS, JSON.stringify(floors));
		var today = new Date();
		GestorPrefs.setPref(ConstF.PREF_LAST_UPDATE_AIRPORTS, today.getTime().toString());
		
		
		if($.objectHasContent(airports)) {
			_airports = airports;
		}
		
		if($.objectHasContent(terminals)) {
			_terminals = terminals;
		}
				
		if($.objectHasContent(floors)) {
			_floors = floors;
		}
		
		console.log('FJORDAN: Reemplazados correctamente');
	}


}

function _GestorFlights() {
	var me = this;

	var _defaultAirport;

	var _parameters = {  
			DEP_AIRPORT_ID: '',
			ARR_AIRPORT_ID: '',
			DATE_FROM:'',
			DATE_TO:'',
			AIRLINE_ID_IATA:'',
			FLIGHT_NUMBER:'',
			SEARCH_MODE:'',
			MAX_RESULTS:'',
			FIRST_RESULT:'',
			IATA_AND_NUMBER:'',
			PAGINATED:false,
			IND_PLANIFICADOR:'N', //N-> SCENA, S->SCENA+GESLOT
		}; 
	
	var _descriptiveParameters = {  
			DEP_AIRPORT_NAME: '',
			ARR_AIRPORT_NAME: '',
			DATE: '',
			DATE_TO: '',
			AIRLINE_NAME:'',
			COD2D_DES:''
		};

	var _searchFlights = [];
	var _searchFlightsUpdateTime = null; //Ultimo tiempo en hora del aeropuerto del que se realizo al busqueda
	var _lastMobileUpdateTime = null; //Tiempo de la ultima actualizacion del vuelo correctamente en tiempo del dispositivo
	
	var _lastDataByFlightNumber = []; //Guardamos los ultimos resultados recogidos de las llamadas Arr y Dep
	
	me.DEFAULT_AIRPORT = function(){return _defaultAirport};
	me.PARAMETERS = function(){return _parameters};
	me.DESCRIPTIVE_PARAMETERS = function(){return _descriptiveParameters};
	me.SEARCH_FLIGHTS = function(){return _searchFlights};
	me.SEARCH_FLIGHTS_UPDATE_TIME = function(){return _searchFlightsUpdateTime};
	me.LAST_MOBILE_UPDATE = function(){return _lastMobileUpdateTime};
	
	// Función de inicialización del gestor de vuelos con el resgistro de las operaciones de WS necesarias
	me.init= function(wsDao){
			//console.log('Inicializando GestorFlights');
			Proxy.addOp('BuscarVuelosSalida',null,wsDao);
			Proxy.addOp('BuscarVuelosLlegada',null,wsDao);
	};
	
	me.clearFlights = function(){
			_searchFlights = [];
			_searchFlightsUpdateTime = null;
			_lastMobileUpdateTime = null;
			_parameters.FIRST_RESULT = 0;
	}

	me.defaultDateTo = function(_dateTime) {
		var _res = new Date(_dateTime.getFullYear(), _dateTime.getMonth(), _dateTime.getDate(), 23, 59, 59);
		return _res;
	}
	
	me.setDefaultAirpot = function(airport){_defaultAirport = airport;}
	
	me.setParams = function(depAirportId, arrAirportId, dateFrom, dateTo, airlineIdIATA, airlineIdAsset, flightNumber, searchMode, maxResults,firstResult,indPlanificador)
	{

		_parameters.DEP_AIRPORT_ID = depAirportId;
		_parameters.ARR_AIRPORT_ID = arrAirportId;
		_parameters.DATE_FROM=dateFrom;
		_parameters.DATE_TO=dateTo;
		_parameters.AIRLINE_ID_IATA=airlineIdIATA;
		_parameters.FLIGHT_NUMBER=flightNumber;
		_parameters.SEARCH_MODE=searchMode;
		_parameters.MAX_RESULTS=maxResults;
		
		_parameters.PAGINATED= (firstResult==0);
		_parameters.FIRST_RESULT=firstResult;
		if(!$.objectHasContent(indPlanificador)) {
            indPlanificador = 'N';
        }
        _parameters.IND_PLANIFICADOR = indPlanificador;
	};
	
	me.setNextPage = function(){
		_parameters.FIRST_RESULT = _parameters.FIRST_RESULT + _parameters.MAX_RESULTS;
	}
	
	me.setDescriptiveParams = function(depAirportName, arrAirportName, date, airlineName, cod2D, dateTo)
	{
		_descriptiveParameters.DEP_AIRPORT_NAME=depAirportName;
		_descriptiveParameters.ARR_AIRPORT_NAME=arrAirportName;
		_descriptiveParameters.DATE=date;
		_descriptiveParameters.DATE_TO=dateTo;
		_descriptiveParameters.AIRLINE_NAME=airlineName;
		_descriptiveParameters.COD2D_DES=cod2D;
	};
	
	me.findFlights = function(okCB,errCB){
				
		if (_parameters.SEARCH_MODE == 'numVuelo' )	{
			//RP 15/05/2014 - Se pasa la fecha TO en las consultas
			//_parameters.DATE_TO=null;
			me.findFlightByFlightNumber(okCB,errCB);			
		}
		else if (_parameters.SEARCH_MODE == 'salidas' )	{
			//RP 15/05/2014 - Se pasa la fecha TO en las consultas
			//_parameters.DATE_TO=null;
			me.findDepartureFlights(okCB,errCB);
		}
		else if (_parameters.SEARCH_MODE == 'llegadas' )	{
			//RP 15/05/2014 - Se pasa la fecha TO en las consultas
			//_parameters.DATE_TO=null;
			me.findArrivalFlights(okCB,errCB);
		} else if (_parameters.SEARCH_MODE == 'cod2D' )	{
			//RP 15/05/2014 - Se pasa la fecha TO en las consultas
			//_parameters.DATE_TO=null;
			me.findFlightByFlightNumber(okCB,errCB);			
		}
		else { 
			_searchFlights = [];
			_searchFlightsUpdateTime = null;
			_lastMobileUpdateTime = null;
			if (okCB != null) okCB();
		}
	}

	me.findDepartureFlights = function(okCB,errCB){
		
		//console.log("Buscar Vuelo Salida");
		var _param = {'codAeropuerto':_parameters.DEP_AIRPORT_ID };
		if ($.objectHasContent(_parameters.ARR_AIRPORT_ID)) _param['codAeropuertoDest'] = _parameters.ARR_AIRPORT_ID;
		if ($.objectHasContent(_parameters.DATE_FROM)) _param['fechaProgramadaDesde'] = _parameters.DATE_FROM;
		if ($.objectHasContent(_parameters.DATE_TO)) _param['fechaProgramadaHasta'] = _parameters.DATE_TO;
		if ($.objectHasContent(_parameters.AIRLINE_ID_IATA)) _param['iataCia'] = _parameters.AIRLINE_ID_IATA;
		if ($.objectHasContent(_parameters.MAX_RESULTS)) _param['maxResults'] = _parameters.MAX_RESULTS;
		if ($.objectHasContent(_parameters.FIRST_RESULT)) _param['firstResult'] = _parameters.FIRST_RESULT;
		if ($.objectHasContent(_parameters.IND_PLANIFICADOR)) _param['indPlanificador'] = _parameters.IND_PLANIFICADOR;
						
		
		//var _date = new Date();
		//console.log('************************* TIEMPOS  Se inicia la búsqueda (BuscarVuelosSalida): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
		
		Proxy.execute('BuscarVuelosSalida', 
						_param,
						function(data){
							//var _date = new Date();
							//console.log('************************* TIEMPOS  Se obtiene la respuesta (BuscarVuelosSalida): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
							if (data != null)
							{
								_lastMobileUpdateTime = new Date();
								if(_parameters.PAGINATED && _parameters.FIRST_RESULT>0){
									//Si tiene paginación y además no es la primera
									me.concatFlights(data);
								}else{
									
									_searchFlights = data;
								}
								_searchFlightsUpdateTime = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
							}
							if(okCB != null) okCB(data);
						},
						function(err){
							//console.log('BuscarVuelosSalida - ERROR');
							if(errCB != null) errCB();
							else if(okCB != null) okCB();//Aunque vaya a OK este controla que si no hay información muestra un mensaje
						},
						ConstF.prioridadSoloNet);
		//console.log('Buscar Vuelo Salida finalizada');
	}
	
	me.findArrivalFlights = function(okCB,errCB){
		
		//console.log("Buscar Vuelo Llegada");
		var _param = {'codAeropuerto': _parameters.ARR_AIRPORT_ID};
		if ($.objectHasContent(_parameters.DEP_AIRPORT_ID)) _param['codAeropuertoOrig'] = _parameters.DEP_AIRPORT_ID;
		if ($.objectHasContent(_parameters.DATE_FROM)) _param['fechaProgramadaDesde'] = _parameters.DATE_FROM;
		if ($.objectHasContent(_parameters.DATE_TO)) _param['fechaProgramadaHasta'] = _parameters.DATE_TO;
		if ($.objectHasContent(_parameters.AIRLINE_ID_IATA)) _param['iataCia'] = _parameters.AIRLINE_ID_IATA;
		if ($.objectHasContent(_parameters.MAX_RESULTS)) _param['maxResults'] = _parameters.MAX_RESULTS;
		if ($.objectHasContent(_parameters.FIRST_RESULT)) _param['firstResult'] = _parameters.FIRST_RESULT;
		if ($.objectHasContent(_parameters.IND_PLANIFICADOR)) _param['indPlanificador'] = _parameters.IND_PLANIFICADOR;
		
		//var _date = new Date();
		//console.log('************************* TIEMPOS  Se inicia la búsqueda (BuscarVuelosLlegada): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
		Proxy.execute('BuscarVuelosLlegada', 
						_param,
						function(data){
							if (data != null)
							{
								_lastMobileUpdateTime = new Date();
								//var _date = new Date();
								//console.log('************************* TIEMPOS  Se obtiene la respuesta (BuscarVuelosLlegada): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());					
								if(_parameters.PAGINATED && _parameters.FIRST_RESULT>0){
									//Si tiene paginación y además no es la primera
									me.concatFlights(data);
								}else{
									_searchFlights = data;
								}
								_searchFlightsUpdateTime = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
							}
							if(okCB != null) okCB(data);
						},
						function(err){
							//console.log('BuscarVuelosLlegada - ERROR:');
							if(errCB != null) errCB();
							else if(okCB != null)okCB();//Aunque vaya a OK este controla que si no hay información muestra un mensaje
						},
						ConstF.prioridadSoloNet);
	}

	me.findFlightByFlightNumber = function(okCB,errCB){
		//console.log("Buscar Flight Number");
		
		var _param = {'codAeropuerto':_parameters.DEP_AIRPORT_ID,
					  'numVuelo':_parameters.FLIGHT_NUMBER,
					  'iataCia':_parameters.AIRLINE_ID_IATA};
					  
		_lastDataByFlightNumber = [];
		
		if ($.objectHasContent(_parameters.MAX_RESULTS)) _param['maxResults'] = _parameters.MAX_RESULTS;
		
		if ($.objectHasContent(_parameters.FIRST_RESULT)) _param['firstResult'] = _parameters.FIRST_RESULT;
		
					  
		if ($.objectHasContent(_parameters.DATE_FROM)) _param['fechaProgramadaDesde'] = _parameters.DATE_FROM;
		if ($.objectHasContent(_parameters.DATE_TO)) _param['fechaProgramadaHasta'] = _parameters.DATE_TO;
											         
		if ($.objectHasContent(_parameters.IND_PLANIFICADOR)) _param['indPlanificador'] = _parameters.IND_PLANIFICADOR;								         
		
		
							
		me.findFlightByFlightNumberDep(	function(data){
											if (data != null && data.length>0)
											{
												//var _date = new Date();
												//console.log('************************* TIEMPOS  Se obtiene la respuesta (BuscarVuelosSalida por código): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
												me.concatFlights(data);
												for(var i=0; i<data.length; i++){
													_lastDataByFlightNumber.push(data[i]);
												}
												
												_searchFlightsUpdateTime = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
												me.findFlightByFlightNumberArr(okCB,errCB,_param);
												//if (okCB!=null) okCB();
											}else{
												//_searchFlights = [];
												//console.log('vacio, llamamos a arr');
												_lastDataByFlightNumber=[];
												me.findFlightByFlightNumberArr(okCB,errCB,_param);
											}
										},function(data){
											//console.log('BuscarVuelosSalida por código - ERROR:');
											me.findFlightByFlightNumberArr(okCB,errCB,_param);
										},_param);
	}
	
	me.findFlightByFlightNumberDep = function(okCB,errCB,_param){
		//var _date = new Date();
		//console.log('************************* TIEMPOS  Se inicia la búsqueda (BuscarVuelosSalida por código): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
		Proxy.execute('BuscarVuelosSalida', _param,okCB,errCB,ConstF.prioridadSoloNet);
	}
	
	me.findFlightByFlightNumberArr = function(okCB,errCB,_param){
		
				//var _date = new Date();
				//console.log('************************* TIEMPOS  Se inicia la búsqueda (BuscarVuelosLlegada por código): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
		
				Proxy.execute('BuscarVuelosLlegada', 
							_param,
							function(data){
								//var _date = new Date();
								//console.log('************************* TIEMPOS  Se obtiene la respuesta(BuscarVuelosLlegada por código): ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
		
								if (data != null && data.length>0)
								{
									//console.log('nuevos resultados');
									me.concatFlights(data);
										for(var i=0; i<data.length; i++){
											_lastDataByFlightNumber.push(data[i]);
										}
									_searchFlightsUpdateTime = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
								}
								//Ordenamos por fecha
								_lastDataByFlightNumber.sort(flightSorting);
								
								if (okCB!=null) okCB(_lastDataByFlightNumber);
							},
							function(err){
								//console.log('BuscarVuelosLlegada por código - ERROR:');
								if(errCB != null) errCB();
								else okCB();//Aunque vaya a OK este controla que si no hay información muestra un mensaje
							},
							ConstF.prioridadSoloNet);
											

	}
	
	/**
	 *Metodo de ordenacion de vuelos en base a sus fechas programadas 
	 */
	var flightSorting = function(a,b){
		var res = 0;
		
		if(a.fechaSalidaProgramadaAsString!=null && b.fechaSalidaProgramadaAsString!=null){
			res = (a.fechaSalidaProgramadaAsString>b.fechaSalidaProgramadaAsString)?1:-1;
		} else if(a.fechaLlegadaProgramadaAsString!=null && b.fechaLlegadaProgramadaAsString!=null){
			res = (a.fechaLlegadaProgramadaAsString>b.fechaLlegadaProgramadaAsString)?1:-1;
		} else if(a.fechaLlegadaProgramadaAsString!=null && b.fechaSalidaProgramadaAsString!=null){
			res = (a.fechaLlegadaProgramadaAsString>b.fechaSalidaProgramadaAsString)?1:-1;
		} else if(a.fechaSalidaProgramadaAsString!=null && b.fechaLlegadaProgramadaAsString!=null){
			res = (a.fechaSalidaProgramadaAsString>b.fechaLlegadaProgramadaAsString)?1:-1;
		} 
		
		return res;
	}
	
	me.concatFlights = function(data){
		for(var i=0; i<data.length; i++){
			_searchFlights.push(data[i]);
		}
	}
	
	me.setSearchFilghts= function(flightsList){_searchFlights = flightsList;}
	
}



/**
 * Coordina todas las reservas de los parking de la aplicacion 
 */
function _GestorResParking(){
	var me = this;
	
	var _reservaDetail = null;
	
	var equivalence = {
		'ACE1':'Parking General T1',
		'ACE2':'Parking General T2', //
		'AGP1':'Parking General P1',
		'AGP2':'Parking General P2', // 		
 		'AGP3':'Parking Larga Estancia P3', //
 		'AGP4':'Parking VIP', //
 		'AGP7':'Parking General P7', //
 		'ALC1':'Parking General P1',
		'ALC3':'Parking alto gálibo P3', //
		'ALC5':'Parking Larga Estancia P5', //
		'ALC6':'Parking Preferente', //
		'BCN1':'Parking General T1',
		'BCN2':'Parking General Terminal C', //
		'BCN3':'Parking General T2', //
		'BCN4':'Parking General T1', //
		'BCN5':'Parking General Superficie T1', //
		'BCN6':'Parking VIP', //
		'BCN7':'Parking Larga Estancia', //
		'BIO1': 'Parking General P1',
		'BIO2':'Parking Larga Estancia P2', //
		'EAS1':'Parking General',
		'FUE1':'Parking General',
		'GRX1':'Parking General',
		'IBZ1':'Parking General P1',
 		'IBZ2':'Parking General P3',
 		'IBZ3':'Parking General E3',
		'MAD1':'Parking General P1',
		'MAD2':'Parking General P2',
		'MAD4':'Parking General P4',
		'MAD5':'Parking Bajo coste T4',
		'MAD6':'Parking Bajo coste T123',		
		'MAD7':'Parking Larga Estancia T123',
		'MAD8':'Parking Larga Estancia T4',
		'MAD9':'Parking VIP',
 		'MAH1':'Parking General P1',
 		'MAH2':'Parking Larga Estancia P2',
 		'MJV1':'Parking General',
 		'MJV2':'Parking Larga Estancia', 
 		'OVD1':'Parking General',
 		'REU2':'Parking General P2',
 		'REU3':'Parking General P3',
 		'REU4':'Parking General P4',
 		'REU5':'Parking Larga Estancia P5',
 		'SCQ1':'Valet Directo S1',	
 		'SCQ2':'Parking Valet Joven', 		
 		'SCQ3':'Público S3/S4  (propio)',
 		'SCQ4':'Parking Valet Plus', 		
 		'SDR1':'Parking General', 
 		'SPC1':'Parking General P1',
 		'SPC2':'Parking General P2',
 		'SVQ1':'Parking General',
 		'SVQ2':'Parking Larga Estancia',
 		'SVQ3':'Parking VIP',
 		'TFN1':'Parking General',
 		'TFS1':'Parking General P1',
 		'TFS2':'Parking General P2',
 		'VGO1':'Parking General',
 		'VLC1':'Parking General',
 		'VLC2':'Parking Larga Estancia', 
 		'VLL1':'Parking General',
 		'ZAZ1':'Parking General P1',
 		'ZAZ2':'Parking General P2',
 		'LCG1':'Parking General P1',
 		'LEI1':'Parking General',	
		'GRO1':'Parking General',
		'LPA1':'Parking General',
		'XRY1':'Parking General P1',
 		'XRY2':'Parking General P2', 	 						
 		'MLN1':'Parking General',
		'PMI1':'Parking General',
		'PMI2':'Parking Larga Estancia',
		'PMI3':'Parking VIP',
		'PMI4':'Parking Preferente',
 		'PMI5':'Parking Abonados Público',
 		'PNA1':'Parking General'	
	};
	
	var terminals_equivalence = {
		'ACE_T1': 'ACE1',
		'ACE_T2': 'ACE1',
		'AGP_Terminal-Aviacion-General': 'AGP1',
		'AGP_T1': 'AGP1',
		'AGP_T2': 'AGP1',
		'AGP_T3': 'AGP1',
		'ALC_T':'ALC1',
		'BCN_T1':'BCN1',
//		'BCN_T2A':'BCN2',
//		'BCN_T2B':'BCN2',
//		'BCN_T2C':'BCN2',
        'BCN_T2':'BCN2',
		'BIO_T':'BIO1',
		'EAS_T': 'EAS1',
		'FUE_T': 'FUE1',
		'GRX_T': 'GRX1',
		'IBZ_T': 'IBZ1',
		'MAD_T1':'MAD1',
		'MAD_T2':'MAD2',
		'MAD_T3':'MAD3',
		'MAD_T4':'MAD4',
		'MAD_T4S':'MAD4',
		'MAH_T': 'MAH1',
		'MJV_T': 'MJV1',
		'OVD_T': 'OVD1',
		'REU_T': 'REU1',
		'SCQ_T': 'SCQ1',
		'SDR_T': 'SDR1',
		'SPC_T': 'SPC1',
		'SVQ_T': 'SVQ1',
		'TFN_T': 'TFN1',
		'TFS_T': 'TFS1',
		'VGO_T': 'VGO1',
		'VLC_T': 'VLC1',
		'VLL_T': 'VLL1',
		'ZAZ_T': 'ZAZ1',
		'LCG_T': 'LCG1',
		'LEI_T': 'LEI1',
		'GRO_T': 'GRO1',
		'LPA_T': 'LPA1',
		'XRY_T': 'ZRY1',
		'MLN_T': 'MLN1',
		'PMI_T':'PMI1',
		'PMI_ModuloA':'PMI1',
		'PMI_ModuloB':'PMI1',
		'PMI_ModuloC':'PMI1',
		'PMI_ModuloD':'PMI1',
		'PNA_T': 'PNA1'
	};
	
	var monthEquivalence = {
		0:'01',
		1:'02',
		2:'03',
		3:'04',
		4:'05',
		5:'06',
		6:'07',
		7:'08',
		8:'09',
		9:'10',
		10:'11',
		11:'12',
	};
	
	var langEquivalence = {
		'es_ES':'ES',
		'en_GB':'UK'
	};
	
	/**
	 * Devuelve el nombre del parking 
	 */
	me.getParkingName = function(code){
		return equivalence[code];
	};
	
	/**
	 * Devuelve el codigo de terminal de Chauntry 
	 */
	me.getTerminalEq = function(airport,term){
		return terminals_equivalence[airport+'_'+term];
	};
	
	/**
	 * Devuelve el codigo del mes a partir del mes del Date 
	 */
	me.getMonthEq = function(month){
		return monthEquivalence[month];
	};
	
	/**
	 * Devuelve el codigo de idioma de Chauntry 
	 */
	me.getLangEq = function(lang){
		return langEquivalence[lang];
	}
	;
	me.setReservaDetail = function(resId,resName,resParkingId,resAirportId,resInDate,resOutDate,resPrice,resPlaza,resLoc,resMail){
		_reservaDetail = {'RES_ID':resId,
							'RES_NAME':resName,
							'RES_IN_DATE':resInDate,
							'RES_OUT_DATE':resOutDate,
							'RES_PRICE':resPrice,
							'RES_PLAZA':resPlaza,
							'RES_LOC':resLoc,
							'RES_PARKING_ID':resParkingId,
							'RES_AIRPORT_ID':resAirportId,
							'RES_MAIL':resMail};
	};
	
	me.getReservaDetail = function(){
		return _reservaDetail;
	};
	
	/**
	 * Arranca el core del Gestor 
	 */
	me.init = function(bdDao){
		bdDao.addQuery('getAllReservations',getAllReservations_Query);
		Proxy.addOp('getAllReservations', bdDao, null);
	    
	    bdDao.addQuery('insertReservation',insertReservation_Query);
	    bdDao.addConstrParam('insertReservation', insertReservation_Params);
	    Proxy.addOp('insertReservation', bdDao, null);
	    
	    bdDao.addQuery('deleteReservation',deleteReservation_Query);
	    bdDao.addConstrParam('deleteReservation', deleteReservation_Params);
	    Proxy.addOp('deleteReservation', bdDao, null);
	    
	    bdDao.addQuery('deleteReservationByAllData',deleteReservationByAllData_Query);
	    bdDao.addConstrParam('deleteReservationByAllData', deleteReservationByAllData_Params);
	    Proxy.addOp('deleteReservationByAllData', bdDao, null);
	    
	    bdDao.addQuery('deleteReservationsBefore',deleteReservationsBefore_Query);
	    bdDao.addConstrParam('deleteReservationsBefore', deleteReservationsBefore_Params);
	    Proxy.addOp('deleteReservationsBefore', bdDao, null);
	    
	    bdDao.addQuery('updatePlaza',updatePlaza_Query);
	    bdDao.addConstrParam('updatePlaza', updatePlaza_Params);
	    Proxy.addOp('updatePlaza', bdDao, null);
	};
	
	/**
	 * Devuelve todas las reservas, bien desde memoria si estan ya cargadas, o bien desde bbdd
     * @param {Object} okCB
	 */
	me.loadRes = function(okCB,errCB){
		Proxy.execute('getAllReservations',
						null,
						function(data){														
							okCB(data);
						},
						function(err){
							console.log('Error cargando reservas'+ err);
							if(errCB != null) errCB();
						},
						ConstF.prioridadSoloBD);
	};
	
	/**
	 * Elimina la reserva indicada mediante su id 
 	 * @param {Object} resId
 	 * @param {Object} okCB
	 */
	me.deleteRes = function(resId,okCB){
		var _param = {"datosConsulta": {"RES_ID": resId}};		
		
		Proxy.execute('deleteReservation', 
						_param,
						function(data){
							me.loadRes(function(data){
								console.log('Borrado:'+resId);
								okCB(data);
							});
						},
						function(err){
							console.log("Error al eliminar la reserva: " + err);
						},
						ConstF.prioridadSoloBD);
	};
	
	/**
	 * Elimina la reserva indicada mediante su localizador, email y parkingId
 	 * @param {Object} resId
 	 * @param {Object} okCB
	 */
	me.deleteResByAllData = function(mail,reference,parkingId,okCB){
		var _param = {"datosConsulta": {"RES_PARKING_ID": parkingId,
										"RES_MAIL":mail,
										"RES_LOC":reference}};		
		
		Proxy.execute('deleteReservationByAllData', 
						_param,
						function(data){
							me.loadRes(function(data){
								console.log('Borrado:'+parkingId);
								okCB(data);
							});
						},
						function(err){
							console.log("Error al eliminar la reserva (via cancelar): " + err);
						},
						ConstF.prioridadSoloBD);
	};
	
	/**
	 * Inserta la reserva en la base de datos
 	 * @param {Object} res
 	 * @param {Object} okCB
	 */
	me.insertRes = function(res,okCB){
		var _param = {"datosConsulta": res};	
		
		Proxy.execute('insertReservation', 
						_param,
						function(data){
							me.loadRes(function(data){
								// console.log('FJORDAN: Insertado:'+JSON.stringify(res));
								// console.log('FJORDAN: loadRes:'+JSON.stringify(data));
								okCB(data);
							});
						},
						function(err){
							console.log("Error al insertar la reserva: " + err);
						},
						ConstF.prioridadSoloBD);
	};
	
	/**
	 * Borra las reservas de cuya salida han pasado mas de 6 horas 
     * @param {Object} okCB
	 */
	me.removeOldRes = function(okCB){
		var _date  = new Date();
		_date.setHours(_date.getHours()-ConstF.hoursLimitRes);

		var _param = {"datosConsulta": {"RES_DATE":_date}};	
		Proxy.execute('deleteReservationsBefore', 
						_param,
						function(data){
							console.log('Borrados antiguas reservas');
							if(okCB != null) okCB();
						},
						function(err){},
						ConstF.prioridadSoloBD);
	};
	
	me.mostrarError = function(mensaje) {
		showPopup(unescape(mensaje));
	};
	
	/**
	 * Guarda la confirmacion de la reserva (invocado desde el WebView)
 	 * @param {Object} mail
     * @param {Object} reference
     * @param {Object} dateIn
     * @param {Object} dateOut
 	 * @param {Object} terminal
 	 * @param {Object} airport
 	 * @param {Object} cost
	 */
	me.guardarReserva = function(mail,reference,dateIn,dateOut,parkingId,terminal,airport,cost){
		var obj = {};
		obj.RES_PARKING_ID = parkingId;
		obj.RES_NAME = terminal;
		obj.RES_AIRPORT_ID = airport;
		obj.RES_IN_DATE = new Date().dateFromISO(dateIn);
		obj.RES_OUT_DATE = new Date().dateFromISO(dateOut);
		obj.RES_PRICE = cost;
		obj.RES_LOC = reference;
		obj.RES_MAIL = mail;
		
		// console.log("FJORDAN: guardarReserva: " + JSON.stringify(obj));
		me.insertRes(obj,
			function(){
					
				// console.log('Insertado'+JSON.stringify(obj));
				browseFromClick('planificador.html','none',null,false);
			});
	};
	
	/**
	 * Borra la reserva (invocado desde el webview)
 	 * @param {Object} mail
     * @param {Object} reference
     * @param {Object} parkingId
	 */
	me.cancelarReserva = function(mail,reference,parkingId){
		
		me.deleteResByAllData(mail,reference,parkingId,
			function(obj){
				console.log('Cancelada:'+JSON.stringify(obj));
				browseFromClick('planificador.html','none',null,false);
			});
	};
	
	me.actualizaPlaza = function(resId,resPlaza,okCB){
		var _param = {"datosConsulta": {"RES_ID":resId, "RES_PLAZA":resPlaza}};	
		Proxy.execute('updatePlaza', 
						_param,
						function(data){
							if(okCB != null) okCB();
						},
						function(err){},
						ConstF.prioridadSoloBD);
	};
}

	
function _GestorNotifications() {
	var me = this;
	var _HasNewNotf = false;
	var _notifications;
	
	var _unSavedTypes = [ConstF.notifFlightType]; //Array con las notificaciones que no se guardan

			   
	me.NOTIFICATIONS = function(){return _notifications};
	me.HAS_NEW_NOTIF = function(){return _HasNewNotf};
	
	me.setNewNotif = function(isnew){
		_HasNewNotf = isnew;	
	}
	
	me.init = function(bdDao){
		
		bdDao.addQuery('insertNotif',insertNotif_Query);
	    bdDao.addConstrParam('insertNotif', insertNotif_Params);
	    Proxy.addOp('insertNotif', bdDao, null);
	    
	    bdDao.addQuery('getAllNotif',getAllNotif_Query);
	    Proxy.addOp('getAllNotif', bdDao, null);
	    
	    bdDao.addQuery('deleteOldNotif',deleteOldNotifications_Query);
	     bdDao.addConstrParam('deleteOldNotif', deleteOldNotifications_Params);
	    Proxy.addOp('deleteOldNotif', bdDao, null);

		me.deleteOldNotif();

	    	
		me.loadAllNotif();
	}
	
	//Recibe msg.title, msg.type, msg.msg
	me.handleMessage = function(msg){
        console.log("GestorNotifications.handleMessage: " + JSON.stringify(msg));
		me.registerNotif(msg);
		try{
            console.log("handleMessage: " + msg.title + "; " + msg.alert);
			showPopup(msg.payload.title + '<br>' + msg.payload.msg);
//            showPopup(msg.title + '<br>' + msg.alert);
			if($.mobile.activePage.attr('id') == 'index' && _HasNewNotf){
				$('#HasNotif').html(GestorIdiomas.getLiteral('notifications_NewNotif'));
			}
		}catch(e){
            console.log("ERROR !!!: " + JSON.stringify(e));
			//Si falla no importa porque solamente no se notifica
		}
	}
	
	/*A este se llama siempre, el handle es solamente si teníamos la aplicación abierta*/
	me.registerNotif = function (msg){
		//Lo añade a la tabla i pinta lo necesario
		//alert('Almacenamos la notificación = '+ msg.title);
		if(_unSavedTypes.indexOf(msg.payload.type)==-1){
//        if(_unSavedTypes.indexOf(msg.type)==-1){
			me.setNewNotif(true);
			me.addNotif(msg,me.loadAllNotif);
		}
	}
	
	me.handleError = function(err){
		//console.log(err);
	}
	
	
	me.actualizaNotificacionesPantalla = function(){
		
		GestorContexto.refreshUI();
		
		if(ActualPage=="notificaciones"){
			$('#notificaciones').trigger('pageshow');
		}
	}
	
	
    
	me.loadAllNotif = function () {
		
		Proxy.execute('getAllNotif',
						null,
						function(data){
							_notifications= data;
							//console.log("Recuperar notificaciones - RESPUESTA: " + JSON.stringify(data));
							me.actualizaNotificacionesPantalla();
				
						},
						function(err){
							//console.log("Recuperar notificaciones - ERROR: " + err);
						},
						ConstF.prioridadSoloBD);
	}
	
	// Función que añade un nuevo viaje
	me.addNotif = function (notif,okCB){
		var _param = {"datosConsulta": {"NOTIF_TYPE_ID": notif.payload.type,
										"NOTIF_TITLE": notif.payload.title,
										"NOTIF_MSG": notif.payload.msg,
										"NOTIF_DATE": new Date(), 
										}};
											
		
		Proxy.execute('insertNotif', 
						_param,
						function(data){
							if (okCB != null) okCB(data);
						},
						function(err){
							//console.log("Error al insertar notificaciones: " + JSON.stringify(err));
						},
						ConstF.prioridadSoloBD);
		//console.log("Inserción terminada");
		
	}

	// Función que elimina un viaje (travelID)
	me.deleteOldNotif = function (){
		var _date  = new Date();
		_date.setDate(_date.getDate() - ConstF.daysNotifications);
		var _param = {"datosConsulta": {"NOTIF_DATE": _date}};	
		Proxy.execute('deleteOldNotif',
						_param,
						function(data){
							//console.log("Borrar notificaciones - RESPUESTA: " + JSON.stringify(data));
						},
						function(err){
							//console.log("Borrar notificaciones - ERROR: " + JSON.stringify(err));
						},
						ConstF.prioridadSoloBD);
	}
	
}

function _GestorPromotions() {
	var me = this;
	
	var _airportID = '';
	var _languageID = '';
	var _promotions = [];
	
	
	// INICIALIZACIÓN
	// Se registra el gestor de promociones con el gestor de servicios web
	me.init = function(wsDao) {
		Proxy.addOp('GetPromotions', null, wsDao);
	};
	
	
	// FUNCIONES
	
	// Asigna el aeropuerto con el que trabajará el gestor de promociones
	me.setAirport = function(airportId){
		if (_airportID != airportId) {
			_airportID = airportId;
			_promotions = [];
			me.loadAirportPromotions();
		}
	};
	
	// Asigna el lenguaje con el que trabajará el gestor de promociones
	me.setLanguage = function(languageId, forceLoad){
		if (languageId && _languageID != languageId) {
			_languageID = languageId;
			_promotions = [];
			if (!!forceLoad) {
				me.loadAirportPromotions();
			}
		}
	};
	
	// Obtiene la lista de promociones vigentes disponibles en el aeropuerto
	me.loadAirportPromotions = function(okCB){
		
		//console.log('************************* TIEMPOS loadAirportPromotions - Se tratan de recuperar');
		_languageID = GestorIdiomas.getLang();
		if ($.objectHasContent(_airportID)){
			
			//console.log("Obtener promociones");

			var _param = {'AIRPORT_ID':_airportID, 
					      'LANGUAGE_ID':_languageID};
											         
			//console.log('Obtener promociones - PETICION:: ' + JSON.stringify(_param));
			Proxy.execute('GetPromotions', 
						_param,
						function(data){
							//console.log('************************* TIEMPOS loadAirportPromotions - Lo tenemos' + JSON.stringify(data));
							//console.log('Obtener promociones - RESPUESTA::' + JSON.stringify(data).substr(0,100));
							_promotions = data;
							if (okCB!=null && okCB!='undefined') { okCB(); }
						},
						function(err){
							//console.log('************************* TIEMPOS loadAirportPromotions - Error');
							//console.log('Obtener promociones - ERROR:' + JSON.stringify(err));
							paintUpperIconMessage('listaPromociones', GestorIdiomas.getLiteral('loadingErrorMessage'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'controlSectionHeader');
							//if (okCB!=null && okCB!='undefined') { okCB(); }
						},
						ConstF.prioridadSoloNet);
			//console.log('Obtener promociones finalizada');
		}
		else
		{
			//console.log('Obtener promociones - ERROR: No se ha definido aeropuerto.');
			if (okCB!=null && okCB!='undefined') { okCB(); }
		}
	};
	
	me.areThereAnyPromotion = function() {
		return _promotions.length > 0;
	};

	// Pinta el listado de promociones
	me.paintPromotions = function (targetId, okCB){
		me.getPromotionHTMLWithoutGrouping(function (promotionHTML){
								if ($.objectHasContent(promotionHTML)){
									$('#waitingPromotions').css('display','none');
									$('#' + targetId).replaceWith(promotionHTML);
									$('#' + targetId).trigger('create');
									autoScrollPageContentRole('promotions');
								}
								if (okCB != null && okCB!='undefined') okCB();
							});
	}
	
	var categoryLookup = {};
	var categoryLookupComplex = {};
	
	categoryLookup['companias-aereas'] = 'informacion';
	categoryLookup['facturacion'] = 'zona-llegada-salida';
	categoryLookup['llegadas'] = 'zona-llegada-salida';
	categoryLookup['salidas'] = 'zona-llegada-salida';
	categoryLookup['seguridad'] = 'otros-servicios';
	categoryLookup['tiendas'] = 'tiendas-ocio';
	categoryLookup['transportes'] = 'transportes-accesos';
	categoryLookup['turismo'] = 'informacion';

	categoryLookupComplex['conexion-vuelos'] = {};
	categoryLookupComplex['otros-servicios'] = {};
	categoryLookupComplex['servicios-familias'] = {};
	categoryLookupComplex['servicios-business'] = {};
	categoryLookupComplex['conexion-vuelos']['informacion-transitos'] = 'informacion';
	categoryLookupComplex['conexion-vuelos']['control-pasaportes-transito'] = 'zona-llegada-salida';
	categoryLookupComplex['conexion-vuelos']['autobus-lanzadera'] = 'transportes-accesos';
	categoryLookupComplex['otros-servicios']['peluqueria'] = 'tiendas-ocio';
	categoryLookupComplex['otros-servicios']['sala-prensa'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-business']['spa'] = 'tiendas-ocio';
	categoryLookupComplex['servicios-business']['centro-negocios'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-business']['informacion-empresas'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-business']['sala-personalidades'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-business']['sala-reuniones'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-business']['sala-vip'] = 'sala-vip-centro-reuniones';
	categoryLookupComplex['servicios-familias']['Articulos-bebes'] = 'tiendas-ocio';
	categoryLookupComplex['servicios-familias']['guarderia-zona-juegos'] = 'otros-servicios';
	categoryLookupComplex['servicios-familias']['sala-bebes'] = 'otros-servicios';
	categoryLookupComplex['servicios-familias']['sillas-bebes'] = 'otros-servicios';

	var translateCategory = function(code, type) {
		return categoryLookup[code] ? 
				categoryLookup[code] : (
						categoryLookupComplex[code] && categoryLookupComplex[code][type] ? categoryLookupComplex[code][type] : code);
	};
	
	var translateCategoryType = function(type) {
		var lang = GestorIdiomas.getLang();
		var transalatedDescrition = type;
		var found = false;
		for(var i = 0; i < ConstF.PoisTypes.length && !found; i++) {
			if(ConstF.PoisTypes[i].POI_TYPE_ID == type) {
				found = true;
				if (lang=='es_ES') {
					transalatedDescrition = ConstF.PoisTypes[i].POI_TYPE_DESC.es_ES;
				} else {
					if (lang=='en_GB') {
						transalatedDescrition = ConstF.PoisTypes[i].POI_TYPE_DESC.en_GB; 	
					} 
				}
			}
		}
		return transalatedDescrition;
	}
	
	// Devuelve el HTML donde se pinta el listado de encuestas
	me.getPromotionHTML = function (okCB){
		var _htmlData = '';
		if (_promotions.length==0) {
			_htmlData += _getUpperIconMessage(GestorIdiomas.getLiteral('mensaje_no_promocion'), 'controlSection', null, 'controlSectionHeader');
			okCB(_htmlData);
			return;
		}
		
		var promoListHeight = 20*(_promotions.length+2);

		_htmlData += '<div class="collapsibleLista" data-role="collapsible-set" id="listaPromociones" style="height: '+ promoListHeight +'em">';
		var _hmtlByCategoryType = [];

		var i;
		var j;
		for (i=0; i<_promotions.length; i++) {
			if ($.objectHasContent(_promotions[i])){
				var _url = _promotions[i]['voucher'];
				var _imageSrc = _promotions[i]['image'];
				var _isURLValid = $.objectHasContent(_url) && _promotions[i]['voucher'] && _promotions[i]['image'];
				var categorias = '';
				var poiIds = '';
				if (!_promotions[i].pois[0]) continue; 
				var categoryCode = _promotions[i].pois[0].category.code;
				var categoryType = _promotions[i].pois[0].category.type;
				
				for (j=0; j<_promotions[i].pois.length; j++) {
					var categoriaTraducida = translateCategory(categoryCode, categoryType);
					if (categorias.indexOf(categoriaTraducida)<0) {
						if (categorias!='') {
							categorias += ', ';
						}
						categorias += "'" + categoriaTraducida + "'";
					}
					if (poiIds!='') {
						poiIds += ', ';
					}
					poiIds += _promotions[i].pois[j].id;
				}
				categorias = '[' + categorias + ']';
				poiIds = '[' + poiIds + ']';
				
				if (!_hmtlByCategoryType[categoryType]) {
					_hmtlByCategoryType[categoryType]= '<div data-role="collapsible" data-inset="false" data-cat="true" id="'+categoryType+'" data-collapsed="true" data-theme="collapsibleMain" data-iconpos="right"  data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d"><h3>'+ GestorIdiomas.getLiteral('ofertas_en') + ' ' + translateCategoryType(categoryType) + '</h3>';
					_hmtlByCategoryType[categoryType]+='<div class="bloqueOfertas" id="' + categoryType + '">'
				}
                
				if(_isURLValid){
					_hmtlByCategoryType[categoryType]+='<div class="fichaOferta" id="promo_' + i + '">';
					_hmtlByCategoryType[categoryType]+=    '<img id="promo_img_' + i +'" src="' + _imageSrc + '" width="100%"  alt="" title="' + _promotions[i]['title'] + '"/>';
					_hmtlByCategoryType[categoryType]+=    '<div class="datos" id="promo_datos_' + i + '">';
					_hmtlByCategoryType[categoryType]+=        '<p class="prod">' + _promotions[i]['title'] + '</p>';
					_hmtlByCategoryType[categoryType]+=        '<div id="promo_prod_'+ i + '">' + _promotions[i]['description'] + '</div>';
					_hmtlByCategoryType[categoryType]+=    '</div>';
					_hmtlByCategoryType[categoryType]+=    '<div id="promo_disponible_"' + i + '" class="disponible" onclick="navigatePromotionPOIs(false, ' + categorias + ', ' + poiIds+');eventVisitarEstablecimiento();">' + GestorIdiomas.getLiteral('disponible_en') + '</div>';
					
					_hmtlByCategoryType[categoryType]+=    '<span class="download" onclik="eventDescargarCupon(';
					_hmtlByCategoryType[categoryType]+= "'" + _promotions[i]['title'] + "'";
					_hmtlByCategoryType[categoryType]+=');">';
                    
                    
                    //_hmtlByCategoryType[categoryType]+=        '<a href="#" onclick="javascript:browseExternalURL(\'' + _url + '\');">';
                    console.log ('URL CUPON:'+ _url);
//					if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
//						_hmtlByCategoryType[categoryType]+=    '<a href="' + _url + '" target="_blank" rel="external">';
//					} else {
//						_hmtlByCategoryType[categoryType]+=    '<a href="javascript:navigator.app.loadUrl(\'' + _url + '\',{\'openExternal\':true});">';
//					}
                    _hmtlByCategoryType[categoryType]+=    '<a href="#" onclick="javascript:browseExternalURLWithExternalBrowser(\'' + _url + '\');">';
					
					_hmtlByCategoryType[categoryType]+=           GestorIdiomas.getLiteral('cupon');
					_hmtlByCategoryType[categoryType]+=        '</a>';
					_hmtlByCategoryType[categoryType]+=    '</span>';
					_hmtlByCategoryType[categoryType]+='</div>';
				}
			}
		}
		var catType ='';
		for (catType in _hmtlByCategoryType) {
			_hmtlByCategoryType[catType] += '</div>';
			_hmtlByCategoryType[catType] += '</div>';
			_htmlData+=_hmtlByCategoryType[catType];
		}
		
		_htmlData+='<div class="fichaOferta"></div>';
		_htmlData+='</div>';
		okCB(_htmlData);
	}

	// Devuelve el HTML donde se pinta el listado de encuestas
	me.getPromotionHTMLWithoutGrouping = function (okCB){
		var _htmlData = '';
		if (_promotions.length==0) {
			_htmlData += _getUpperIconMessage(GestorIdiomas.getLiteral('mensaje_no_promocion'), 'controlSection', null, 'controlSectionHeader');
			okCB(_htmlData);
			return;
		}
		
		var _hmtlByCategoryType = [];

		var i;
		var j;
		for (i=0; i<_promotions.length; i++) {
			if ($.objectHasContent(_promotions[i])){
				var _url = _promotions[i]['voucher'];
				var _imageSrc = _promotions[i]['image'];
				var _isURLValid = $.objectHasContent(_url) && _promotions[i]['voucher'] && _promotions[i]['image'];
				var categorias = '';
				var poiIds = '';
				if (!_promotions[i].pois[0]) continue; 
				var categoryCode = _promotions[i].pois[0].category.code;
				var categoryType = _promotions[i].pois[0].category.type;
				
				for (j=0; j<_promotions[i].pois.length; j++) {
					var categoriaTraducida = translateCategory(categoryCode, categoryType);
					if (categorias.indexOf(categoriaTraducida)<0) {
						if (categorias!='') {
							categorias += ', ';
						}
						categorias += "'" + categoriaTraducida + "'";
					}
					if (poiIds!='') {
						poiIds += ', ';
					}
					poiIds += _promotions[i].pois[j].id;
				}
				categorias = '[' + categorias + ']';
				poiIds = '[' + poiIds + ']';
				
				if (!_hmtlByCategoryType[categoryType]) {
					
					_hmtlByCategoryType[categoryType]=  '<div class="separadorOfertas" onclick="';
					_hmtlByCategoryType[categoryType]+= "document.getElementById('" + categoryType + "').style.display = (document.getElementById('" + categoryType + "').style.display === 'none' ? 'block' : 'none');"
					_hmtlByCategoryType[categoryType]+= "document.getElementById('collapse" + categoryType + "').innerHTML = (document.getElementById('" + categoryType + "').style.display === 'none' ? '+' : '-');"
					_hmtlByCategoryType[categoryType]+= "eventFiltrarPromocion('" + categoryType + "') ;"
					_hmtlByCategoryType[categoryType]+= "autoScrollPageContentRole('promotions');";
					_hmtlByCategoryType[categoryType]+= '"';
					//_hmtlByCategoryType[categoryType]+= '><span id="collapse' + categoryType +'">[+]</span><h3>'+GestorIdiomas.getLiteral('ofertas_en') + ' ' + translateCategoryType(categoryType) + '</h3></div>';
					//_hmtlByCategoryType[categoryType]+= '><span class="collapseTitle">' + translateCategoryType(categoryType) + '</span><span class="collapseIcon" id="collapse' + categoryType +'">+</span></div>';
					_hmtlByCategoryType[categoryType]+= '><table class="collapseTable"><tr><td width="90%><span class="collapseTitle">' + translateCategoryType(categoryType) + '</span></td><td><span class="collapseIcon" id="collapse' + categoryType +'">+</span></td></tr></table></div>';
					_hmtlByCategoryType[categoryType]+='<div class="bloqueOfertas" id="' + categoryType + '" style="display:none">'
				}
                
				if(_isURLValid){
					_hmtlByCategoryType[categoryType]+='<div class="fichaOferta" id="promo_' + i + '">';
					_hmtlByCategoryType[categoryType]+=    '<img id="promo_img_' + i +'" src="' + _imageSrc + '" width="100%"  alt="" title="' + _promotions[i]['title'] + '"/>';
					_hmtlByCategoryType[categoryType]+=    '<div class="datos" id="promo_datos_' + i + '">';
					_hmtlByCategoryType[categoryType]+=        '<div id="promo_prod_'+ i + '">' + _promotions[i]['description'] + '</div>';
					_hmtlByCategoryType[categoryType]+=        '<p class="prod">' + _promotions[i]['title'] + '</p>';
					_hmtlByCategoryType[categoryType]+=    '</div>';
					_hmtlByCategoryType[categoryType]+=    '<div id="promo_disponible_"' + i + '" class="disponible" onclick="navigatePromotionPOIs(false, ' + categorias + ', ' + poiIds+');eventVisitarEstablecimiento('; 
					_hmtlByCategoryType[categoryType]+= "'" + _promotions[i]['title'] + "'";
					_hmtlByCategoryType[categoryType]+= ');"><p>' + GestorIdiomas.getLiteral('disponible_en') + '</p></div>';
					
					_hmtlByCategoryType[categoryType]+=    '<span class="download" onclick="eventDescargarCupon(';
					_hmtlByCategoryType[categoryType]+= "'" + _promotions[i]['title'] + "'";
					_hmtlByCategoryType[categoryType]+=');">';

/***** JULIO CASTILLO - Descarga de cupon - Tratamos iPhone y Android de la misma manera *****/
					// _hmtlByCategoryType[categoryType]+=    '<a href="javascript:navigator.app.loadUrl(\'' + _url + '\',{\'openExternal\':true});">';
                    //_hmtlByCategoryType[categoryType]+=    '<a href="#" onclick="javascript:browseExternalURL(\'' + _url + '\');">';
                    _hmtlByCategoryType[categoryType]+=    '<a href="#" onclick="javascript:browseExternalURLWithExternalBrowser(\'' + _url + '\');">';
                    
                    
/***** también se puede probar con
 *  window.open(_url, '_blank','location=no');
 */					
/***** JULIO CASTILLO - Así estaba antes *****/
/*					
					if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
						_hmtlByCategoryType[categoryType]+=    '<a href="' + _url + '" target="_blank" rel="external">';
					} else {
						_hmtlByCategoryType[categoryType]+=    '<a href="javascript:navigator.app.loadUrl(\'' + _url + '\',{\'openExternal\':true});">';
					}
*/					
					_hmtlByCategoryType[categoryType]+=           GestorIdiomas.getLiteral('cupon');
					_hmtlByCategoryType[categoryType]+=        '</a>';
					_hmtlByCategoryType[categoryType]+=    '</span>';
					_hmtlByCategoryType[categoryType]+='</div>';
					//console.log(_hmtlByCategoryType[categoryType]);
				}
			}
		}
		var catType ='';
		for (catType in _hmtlByCategoryType) {
			_hmtlByCategoryType[catType] += '</div>';
			_hmtlByCategoryType[catType] += '</div>';
			_htmlData+=_hmtlByCategoryType[catType];
		}
		
		_htmlData+='<div class="fichaOferta"></div>';
		_htmlData+='</div>';

		okCB(_htmlData);
	}
	
	
	// -----------------------------------------------------------------------------------------------------------------------
	
}

/*
 OBJETO QUE TIENE CARGADO UN VUELO Y POR TANTO GESTIONA SUS DETALLES
 * */
function _GestorFlightDetails() {

	var me = this;
	var _parameters = {
		DEP_AIRPORT_ID : '',
		ARR_AIRPORT_ID : '',
		DEP_AIRPORT_OACI: '',
		ARR_AIRPORT_OACI: '',
		DATE_FROM : '',
		DATE_TO : '',
		AIRLINE_ID_IATA : '',
		FLIGHT_NUMBER : '',
		SEARCH_MODE : '',
		INDPLANIFICADOR: ''
	};
	var _flightDetails = [];

	me.FLIGHT_DETAILS = function() {
		return _flightDetails;
	};
	
	me.getParams = function(){
		return _parameters;
	};

	me.setFlight = function(flight) {
		_flightDetails = flight;
	};
	
	// Función de inicialización del gestor de detalles del vuelo con el resgistor de las operaciones de WS necesarias
	me.init = function(wsDao) {
		Proxy.addOp('GetDetalleVuelo', null, wsDao);
	};
	
	/*
	 Función de definición de los parámetros del gestor. Se llama antes de pedir el detalle
	 */
	me.setParams = function(depAirportId, arrAirportId, depOaci, arrOaci, dateFrom, dateTo, airlineIdIATA, flightNumber, indPlanificador) {
		_parameters.DEP_AIRPORT_ID = depAirportId;
		_parameters.ARR_AIRPORT_ID = arrAirportId;
		_parameters.DEP_AIRPORT_OACI = depOaci;
		_parameters.ARR_AIRPORT_OACI = arrOaci;
		_parameters.DATE_FROM = dateFrom;
		_parameters.DATE_TO = dateTo;
		_parameters.AIRLINE_ID_IATA = airlineIdIATA;
		_parameters.FLIGHT_NUMBER = flightNumber;
		if($.objectHasContent(indPlanificador)) {
			_parameters.INDPLANIFICADOR = indPlanificador;
		} else {
			_parameters.INDPLANIFICADOR = 'N';
		}
		//Al establecer parámetros se borra el vuelo.
		_flightDetails = [];
	};

	/*
	 Función de definición de los parámetros del gestor. Se llama antes de pedir el detalle. Sobrecarga con un vuelo ya almacenado
	 */
	me.setParamFlight = function(flight) {
		_parameters.DEP_AIRPORT_ID = flight.aeropuertoOrigen;
		_parameters.ARR_AIRPORT_ID = flight.aeropuertoDestino;
		_parameters.DEP_AIRPORT_OACI = flight.aeropuertoOrigenOACI;
		_parameters.ARR_AIRPORT_OACI = flight.aeropuertoDestinoOACI;;
		if($.objectHasContent(flight.pkSalida)) {
			_parameters.DATE_FROM = flight.fechaSalidaProgramadaAsString;
			_parameters.DATE_TO = flight.fechaSalidaProgramadaAsString;
		} else if($.objectHasContent(flight.pkLlegada)) {
			_parameters.DATE_FROM = flight.fechaLlegadaProgramadaAsString;
			_parameters.DATE_TO = flight.fechaLlegadaProgramadaAsString;
		}
		if($.objectHasContent(flight.indPlanificador)) {
			_parameters.INDPLANIFICADOR = flight.indPlanificador;
		} else {
			_parameters.INDPLANIFICADOR = 'N';
		}
		_parameters.AIRLINE_ID_IATA = flight.codCia;
		_parameters.FLIGHT_NUMBER = flight.numVuelo;

		//Al establecer parámetros se borra el vuelo.
		_flightDetails = [];

	};

	/**
	 *Devuelve el detalle de un vuelo 
	 */
	me.getFlightDetail = function(okCB, errCB) {

		_flightDetails = [];
		if(_parameters != null && _parameters.DEP_AIRPORT_ID != null && _parameters.ARR_AIRPORT_ID != null && _parameters.DATE_FROM != null && _parameters.DATE_TO != null && _parameters.AIRLINE_ID_IATA != null && _parameters.FLIGHT_NUMBER != null) {

			var _param = {
				'codAeropuertoOrig' : _parameters.DEP_AIRPORT_ID,
				'codAeropuertoDest' : _parameters.ARR_AIRPORT_ID,
				'fechaProgramadaDesde' : _parameters.DATE_FROM,
				'fechaProgramadaHasta' : _parameters.DATE_TO,
				'numVuelo' : _parameters.FLIGHT_NUMBER,
				'iataCia' : _parameters.AIRLINE_ID_IATA,
				'indPlanificador' : _parameters.INDPLANIFICADOR
			};
			
			//console.log('unai:detalle de vuelo:'+JSON.stringify(_param));
			//console.log('DETALLE DE VUELO - ' + JSON.stringify(_param));
			//var _date = new Date();
			//console.log('************************* TIEMPOS  Se inicia la búsqueda (GetDetalleVuelo): ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
			
			if(!isAppPaused){
				Proxy.execute('GetDetalleVuelo', _param, function(data) {
					//var _date = new Date();
					//console.log('************************* TIEMPOS  Se obtiene la respuesta (GetDetalleVuelo): ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
					_flightDetails = data;
					//console.log('DETALLE DE VUELO OK - ' + JSON.stringify(data));
					okCB();
				}, function(err) {
					
					//console.log('DETALLE DE VUELO Recuperación de detalles de vuelo - ERROR:');
					if(errCB != null)
						errCB();
					else
						okCB();
					//Aunque vaya a OK este controla que si no hay información muestra un mensaje
				}, ConstF.prioridadSoloNet);
			}else{
				okCB();
			}
		} else {
			okCB();
		}
	};


	me.isSameFlight = function(flightToCompare) {

		return (_flightDetails.pkSalida == flightToCompare.pkSalida && _flightDetails.pkLlegada == flightToCompare.pkLlegada);
	};

	me.formatFlight = function(flightData) {
		
		//console.log(JSON.stringify(flightData));
		var _formattedFlight = [];
		_formattedFlight['FLIGHT_NUMBER'] = flightData.numVuelo;
		
		_formattedFlight['AIRPORT_ARR_ID'] = flightData.aeropuertoDestino;
		_formattedFlight['AIRPORT_ARR_NAME'] = flightData.aeropuertoDestinoNombre;

		_formattedFlight['FLIGHT_STATE'] = flightData.estado;
		
		_formattedFlight['AIRPORT_DEP_ID'] = flightData.aeropuertoOrigen;
		_formattedFlight['AIRPORT_DEP_NAME'] = flightData.aeropuertoOrigenNombre;
		
		
		_formattedFlight['AIRLINE_ID_IATA'] = flightData.codCia;
		_formattedFlight['FLIGHT_BAG_CAROUSEL_1'] = flightData.cintaPrimera;
		_formattedFlight['FLIGHT_BAG_CAROUSEL_2'] = flightData.cintaSegunda;
		if (_formattedFlight['FLIGHT_BAG_CAROUSEL_1']!= null){
			if (_formattedFlight['FLIGHT_BAG_CAROUSEL_2']!= null) {
				_formattedFlight['FLIGHT_BAG_CAROUSEL'] = _formattedFlight['FLIGHT_BAG_CAROUSEL_1'] + '-' + _formattedFlight['FLIGHT_BAG_CAROUSEL_2'];  
			} else { 
				_formattedFlight['FLIGHT_BAG_CAROUSEL'] = _formattedFlight['FLIGHT_BAG_CAROUSEL_1']; 
			}
		}
		else{
			if (_formattedFlight['FLIGHT_BAG_CAROUSEL_2']!= null){ _formattedFlight['FLIGHT_BAG_CAROUSEL'] = _formattedFlight['FLIGHT_BAG_CAROUSEL_2']; } 
		}

		if ($.objectHasContent(flightData.fechaLlegadaProgramadaAsString)) {
			_formattedFlight['FLIGHT_ARR_TIME_PROG'] = new Date();
			_formattedFlight['FLIGHT_ARR_TIME_PROG'].setISO8601IgnoreLocalTimeOffSet(flightData.fechaLlegadaProgramadaAsString);
		}
		
		if ($.objectHasContent(flightData.fechaLlegadaEstimadaAsString)) {
			_formattedFlight['FLIGHT_ARR_TIME_REAL'] = new Date();
			_formattedFlight['FLIGHT_ARR_TIME_REAL'].setISO8601IgnoreLocalTimeOffSet(flightData.fechaLlegadaEstimadaAsString);
		}
		
		if ($.objectHasContent(flightData.estadoSalida)){
			_formattedFlight['FLIGHT_DEP_OBS'] = GestorIdiomas.getLiteral('flightObs_' + flightData.estadoSalida, '');
		}
		else{
			_formattedFlight['FLIGHT_DEP_OBS'] = ''; // GestorIdiomas.getLiteral('flightObs_HOR');
		}
		
		if ($.objectHasContent(flightData.estadoLlegada)){
			_formattedFlight['FLIGHT_ARR_OBS'] = GestorIdiomas.getLiteral('flightObs_' + flightData.estadoLlegada, '');
		}
		else{
			_formattedFlight['FLIGHT_ARR_OBS'] = ''; // GestorIdiomas.getLiteral('flightObs_HOR');
		}
		
		_formattedFlight['AIRPORT_ARR_TERMINAL_ID'] = $.notNullString(flightData.terminalLlegada);
		
		
		_formattedFlight['FLIGHT_ARR_ROOM_1'] = $.notNullString(flightData.salaLlegada);
		_formattedFlight['FLIGHT_ARR_ROOM_2'] = $.notNullString(flightData.salaSegundaLlegada);
		if ($.objectHasContent(_formattedFlight['FLIGHT_ARR_ROOM_1']) && $.objectHasContent(_formattedFlight['FLIGHT_ARR_ROOM_2']))
			_formattedFlight['FLIGHT_ARR_ROOM'] = _formattedFlight['FLIGHT_ARR_ROOM_1'] + '-' + _formattedFlight['FLIGHT_ARR_ROOM_2'];
		else  
			_formattedFlight['FLIGHT_ARR_ROOM'] = _formattedFlight['FLIGHT_ARR_ROOM_1'];
		
	
		
		if ($.objectHasContent(flightData.fechaSalidaProgramadaAsString)) {
			_formattedFlight['FLIGHT_DEP_TIME_PROG'] = new Date();
			_formattedFlight['FLIGHT_DEP_TIME_PROG'].setISO8601IgnoreLocalTimeOffSet(flightData.fechaSalidaProgramadaAsString);
		}
		
		if (flightData.fechaSalidaEstimadaAsString!=null) {
			_formattedFlight['FLIGHT_DEP_TIME_REAL'] = new Date();
			_formattedFlight['FLIGHT_DEP_TIME_REAL'].setISO8601IgnoreLocalTimeOffSet(flightData.fechaSalidaEstimadaAsString);
		}
		
		
		_formattedFlight['FLIGHT_DEP_GATE_1'] = $.notNullString(flightData.puertaEmbarquePrimera);
		_formattedFlight['FLIGHT_DEP_GATE_2'] = $.notNullString(flightData.puertaEmbarqueSegunda);
		if ($.objectHasContent(_formattedFlight['FLIGHT_DEP_GATE_1']) && $.objectHasContent(_formattedFlight['FLIGHT_DEP_GATE_2']))
			_formattedFlight['FLIGHT_DEP_GATE'] = _formattedFlight['FLIGHT_DEP_GATE_1'] + '-' + _formattedFlight['FLIGHT_DEP_GATE_2'];
		else  
			_formattedFlight['FLIGHT_DEP_GATE'] = _formattedFlight['FLIGHT_DEP_GATE_1'];
		
		if ($.objectHasContent(flightData.aperturaPuertaEmbarqueAsString)) {
			_formattedFlight['FLIGHT_DEP_GATE_OPEN_TIME'] = new Date();
			_formattedFlight['FLIGHT_DEP_GATE_OPEN_TIME'].setISO8601IgnoreLocalTimeOffSet(flightData.aperturaPuertaEmbarqueAsString);
		}

		_formattedFlight['FLIGHT_CHKIN_LOCATION_FROM'] = $.notNullString(flightData.checkInDesde);
		_formattedFlight['FLIGHT_CHKIN_LOCATION_TO'] = $.notNullString(flightData.checkInHasta);
		
		if ($.objectHasContent(_formattedFlight['FLIGHT_CHKIN_LOCATION_FROM']) && $.objectHasContent(_formattedFlight['FLIGHT_CHKIN_LOCATION_TO'])){
			_formattedFlight['FLIGHT_CHKIN_LOCATION'] = _formattedFlight['FLIGHT_CHKIN_LOCATION_FROM'] + "-" + _formattedFlight['FLIGHT_CHKIN_LOCATION_TO'];
		}else{
			_formattedFlight['FLIGHT_CHKIN_LOCATION'] = _formattedFlight['FLIGHT_CHKIN_LOCATION_FROM'];
		}
		

		_formattedFlight['AIRPORT_DEP_TERMINAL_ID'] = $.notNullString(flightData.terminalSalida);

		_formattedFlight['NUM_VUELO_DESC_SALIDA'] = flightData.codCiaNumVueloSalidaSipad;
		_formattedFlight['NUM_VUELO_DESC_LLEGADA'] = flightData.codCiaNumVueloLlegadaSipad;

		_formattedFlight['CIA_DESC_SALIDA'] = flightData.desCiaSalidaSipad;
		_formattedFlight['CIA_DESC_LLEGADA'] = flightData.desCiaLlegadaSipad;
		
		_formattedFlight['ESCALAS'] = flightData.escalas;

		
		return _formattedFlight;
	};


	me.canAddToPlanner= function (flight){
		return flight.estado !='BOR';
	}


}


/**
 * Handle all the application setting. 
 */
function _SettingsManager() {
	var me = this;
	
	me.init = function(bdDao) {
		bdDao.addQuery('getSetting', getSetting_Query);
		bdDao.addConstrParam('getSetting', getSetting_Params);
		Proxy.addOp('getSetting', bdDao, null);
		
		bdDao.addQuery('insertSetting', insertSetting_Query);
		bdDao.addConstrParam('insertSetting', insertSetting_Params);
		Proxy.addOp('insertSetting', bdDao, null);
		
		bdDao.addQuery('updateSetting', updateSetting_Query);
		bdDao.addConstrParam('updateSetting', updateSetting_Params);
		Proxy.addOp('updateSetting', bdDao, null);
		
		bdDao.addQuery('deleteSetting', deleteSetting_Query);
		bdDao.addConstrParam('deleteSetting', deleteSetting_Params);
		Proxy.addOp('deleteSetting', bdDao, null);
	};
	
	/**
	 * Gets a Setting from database. Returns an object like: 
	 * [{
	 * 	"SETTING_NAME":"clave",
	 * 	"SETTING_ID":"1",
	 * 	"SETTING_VALUE":"valor"
	 * }]
 	 * @param {Object} name Name of the setting.
 	 * @param {Object} okCB Successful callback.
 	 * @param {Object} errCB Error callback.
	 */
	me.getSetting = function(name, okCB, errCB) {
		var _param = {
			'SETTING_NAME': name
		};
		
		Proxy.execute('getSetting',
					  _param,
					  function(data) {
					  	// OK	
						if (okCB != null) {
							okCB(data);
						}
					  }, 
					  function(err) {
					  	// Error
					  	// console.log("FJORDAN: Error getting new Setting: " + err);
					  	if(errCB != null) {
					  		errCB(err);
					  	}
					  },
					  ConstF.prioridadSoloBD);
	};
	
	/**
	 * Insert a new Setting in database if it doesn't exist or updates an existing one. 
 	 * @param {Object} name Name of the setting.
 	 * @param {Object} value Value of the setting.
 	 * @param {Object} okCB Successful callback.
 	 * @param {Object} errCB Error callback.
	 */
	me.setSetting = function(name, value, okCB, errCB) {
		var _param = {
			'SETTING_NAME': name,
			'SETTING_VALUE': value
		};
		// console.log("FJORDAN: setSetting");
		Proxy.execute('getSetting',
					  _param,
					  function(data) {
					  	// console.log("FJORDAN: setSetting getting OK: " + data);
					  	// OK	
					  	if (data.length == 0) {
					  		// Insert. The setting does not exist.
					  		me.createSetting(name, value, okCB, errCB);
					  	} else {
					  		// update
					  		me.updateSetting(name, value, okCB, errCB);
					  	}
					  	
					  }, 
					  function(err) {
					  	// Error
					  	// console.log("FJORDAN: Error setting new Setting: " + err);
					  	if(errCB != null) {
					  		errCB(err);
					  	}
					  },
					  ConstF.prioridadSoloBD);
	};
	
	/**
	 * Insert a new Setting in database. 
 	 * @param {Object} name Name of the setting.
 	 * @param {Object} value Value of the setting.
 	 * @param {Object} okCB Successful callback.
 	 * @param {Object} errCB Error callback.
	 */
	me.createSetting = function(name, value, okCB, errCB) {
		var _param = {
			'SETTING_NAME': name,
			'SETTING_VALUE': value
		};
		
		Proxy.execute('insertSetting',
					  _param,
					  function(data) {
					  	// OK	
						// console.log("FJORDAN: OK inserting setting: " + data);
					  	if(okCB != null) {
					  		okCB(data);
					  	}
					  }, 
					  function(err) {
					  	// Error
					  	// console.log("FJORDAN: Error inserting setting: " + err);
					  	if(errCB != null) {
					  		errCB(err);
					  	}
					  },
					  ConstF.prioridadSoloBD);
	};
	
	/**
	 * Update an existing setting in database. 
 	 * @param {Object} name Name of the setting.
 	 * @param {Object} value Value of the setting.
 	 * @param {Object} okCB Successful callback.
 	 * @param {Object} errCB Error callback.
	 */
	me.updateSetting = function(name, value, okCB, errCB) {
		var _param = {
			'SETTING_NAME': name,
			'SETTING_VALUE': value
		};
		
		Proxy.execute('updateSetting',
					  _param,
					  function(data) {
					  	// OK	
					  	// console.log("FJORDAN: OK updating setting: " + data);
					  	if(okCB != null) {
					  		okCB(data);
					  	}
					  }, 
					  function(err) {
					  	// Error
					  	// console.log("FJORDAN: Error updating setting: " + err);
					  	if(errCB != null) {
					  		errCB(err);
					  	}
					  },
					  ConstF.prioridadSoloBD);
	};
	
	/**
	 * Update an existing setting in database. 
 	 * @param {Object} name Name of the setting.
 	 * @param {Object} okCB Successful callback.
 	 * @param {Object} errCB Error callback.
	 */
	me.deleteSetting = function(name, okCB, errCB) {
		var _param = {
			'SETTING_NAME': name
		};
		
		Proxy.execute('deleteSetting',
					  _param,
					  function(data) {
					  	// OK	
					  	// console.log("FJORDAN: OK deleting setting: " + data);
					  	if(okCB != null) {
					  		okCB(data);
					  	}
					  }, 
					  function(err) {
					  	// Error
					  	// console.log("FJORDAN: Error deleting setting: " + err);
					  	if(errCB != null) {
					  		errCB(err);
					  	}
					  },
					  ConstF.prioridadSoloBD);
	};
};


function _GestorBanners() {
	var me = this;
	
	/*ESTÁN PREFIJADOS Y POR TANTO NO SE CARGAN DE WS*/

	// VARIABLES --------------------------------------------------------------------------------------------------------------
	
	var _airportID='';
	var _banners=[];
	//[{"advId":1,"advImage":"fw==","advName":"adv1","advUrl":"url1","advDateFrom":"2012-01-10T12:00:00.000+0100","advDateTo":"2013-01-01T12:00:00.000+0100","airportId":"MAD","advAltText":"txt1"}

	// -----------------------------------------------------------------------------------------------------------------------

	// INICIALIZACION ---------------------------------------------------------------------------------------------------------
	
	// Función de inicialización del gestor de banners con el resgistor de las operaciones de WS necesarias
	me.init= function(wsDao){
			//console.log('Inicializando _GestorBanners');
			Proxy.addOp('GetAdvertisements',null,wsDao);
	};
	
	// -----------------------------------------------------------------------------------------------------------------------
	
	// FUNCIONES -------------------------------------------------------------------------------------------------------------
	
	// Función que asigna el aeropeurto del gestor de banners
	me.setAirport = function(airportId){
		if (_airportID != airportId)
		{
			_airportID = airportId;
			_banners = [];
			me.loadAirportBanners();
		}
	};
	
	// Función que carga los anuncios del aeropuerto llamando al WS
	me.loadAirportBanners = function(okCB){
		
		//console.log('************************* TIEMPOS loadAirportBanners - Se tratan de recuperar');
		
		if ($.objectHasContent(_airportID)){
			
			//console.log("Obtener publicidad");
			var _param = {'AIRPORT_ID':_airportID};		
											         
			//console.log('Obtener publicidad - PETICION:: ' + JSON.stringify(_param));
			Proxy.execute('GetAdvertisements', 
						_param,
						function(data){
							//console.log('************************* TIEMPOS loadAirportBanners - Lo tenemos' + JSON.stringify(data));
							//console.log('Obtener publicidad - RESPUESTA::' + JSON.stringify(data).substr(0,100));
							_banners = data;
							if (okCB!=null && okCB!='undefined') okCB();
						},
						function(err){
							//console.log('************************* TIEMPOS loadAirportBanners - Error');
							//console.log('Obtener publicidad - ERROR:' + JSON.stringify(err));
							if (okCB!=null && okCB!='undefined') okCB();
						},
						ConstF.prioridadSoloNet);
			//console.log('Obtener publicidad finalizada');
		}
		else
		{
			//console.log('Obtener publicidad - ERROR: No se ha definido aeropuerto.');
			if (okCB!=null && okCB!='undefined') okCB();
		}
		

	};
	
	// Función que obtiene un banner aleatorio de los disponible
	me.getRandomBanner = function(okCB)
	{
		//console.log('************************* TIEMPOS getRandomBanner - ' + _banners.length);
		
		if (_banners.length>0)
		{
			okCB(_banners[Math.floor((Math.random()*10000)%_banners.length)]);
		}
		else
		{
			me.loadAirportBanners(function(){
											if (_banners.length>0)
											{
												return okCB(_banners[Math.floor((Math.random()*10000)%_banners.length)]);
											}
											else
											{
												return okCB(null);
											}
										});
		}
	};
	
	// Función que pinta el banner en pantalla
	me.paintBanner = function (targetId, okCB){
		me.getBannerHTML(function (bannerHTML){
								if ($.objectHasContent(bannerHTML)){
									$('#' + targetId).replaceWith(bannerHTML);
									$('#' + targetId).trigger('create');
								}
								if (okCB != null && okCB!='undefined') okCB();
							});
	};
	
	// Función que devuelve el HTML de un banner
	me.getBannerHTML = function (okCB){
		me.getRandomBanner(function(banner){
									var _htmlData;
									if ($.objectHasContent(banner)){
										_htmlData='<div class="section-advertisingSection" id="imgBanner">';
									
										var _imageSrc = '';
										var _url = banner['advUrl'];
										
										//if(!$.objectHasContent(_url)){_url="http://google.es"}
										//if(!$.objectHasContent(_url)){_url="#"}
										var _isURLValid = $.objectHasContent(_url);
										
										
										if ($.objectHasContent(banner['advImage'])) _imageSrc =  "data:image/jpeg;base64," + banner['advImage'].replace(/_/g,'/').replace(/-/g,'+');
										if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
											if(_isURLValid){
												// _htmlData+='<a href="' + _url + '" target="_blank" rel="external">';
												_htmlData+='<a href="#" onclick="browseExternalURLWithExternalBrowser(\'' + _url + '\');">';
											}
											_htmlData+='<img id="publi" src="' + _imageSrc + '" width="100%" height="100%" alt="' + banner['advAltText'] + '">';
											if(_isURLValid){
												_htmlData+='</a>';
											}
										} else {
											if(_isURLValid){
												_htmlData+='<a href="#" onclick="browseExternalURLWithExternalBrowser(\'' + _url + '\');">';
											}
											_htmlData+='<img id="publi" src="' + _imageSrc + '" width="100%" height="100%" alt="' + banner['advAltText'] + '">';
											if(_isURLValid){
												_htmlData+='</a>';
											}
										}
										_htmlData+='</div>';
										okCB(_htmlData);
									}
									else {okCB('<div id="imgBanner" class="section-advertisingSection"></div>');}
								});
	};
	
	// -----------------------------------------------------------------------------------------------------------------------
	
}

function _GestorViajes() {
	var me = this;
	var _selectedTravel=null;
	var _travels=null;
	
	me.init = function(bdDao, wsDao)
	{
		bdDao.addQuery('getAllTravels',getAllTravels_Query);
	    Proxy.addOp('getAllTravels', bdDao, null);
	    
	    bdDao.addQuery('getTravel',getTravel_Query);
	    bdDao.addConstrParam('getTravel', getTravel_Params);
	    Proxy.addOp('getTravel', bdDao, null);
	    
	    bdDao.addQuery('insertTravel',insertTravel_Query);
	    bdDao.addConstrParam('insertTravel', insertTravel_Params);
	    Proxy.addOp('insertTravel', bdDao, null);


		bdDao.addQuery('updateTravel',updateTravel_Query);
	    bdDao.addConstrParam('updateTravel', updateTravel_Params);
	    Proxy.addOp('updateTravel', bdDao, null);


	    
	    bdDao.addQuery('deleteTravel',deleteTravel_Query);
	    bdDao.addConstrParam('deleteTravel', deleteTravel_Params);
	    Proxy.addOp('deleteTravel', bdDao, null);
	    
	    
	    bdDao.addQuery('selectNextTravel',selectNextTravel_Query);
	    Proxy.addOp('selectNextTravel', bdDao, null);
	    
	    bdDao.addQuery('deleteTravelsBefore',deleteTravelsBefore_Query);
	    bdDao.addConstrParam('deleteTravelsBefore', deleteTravelsBefore_Params);
	    Proxy.addOp('deleteTravelsBefore', bdDao, null);
	
	}

	me.TRAVELS = function(){return _travels};
	me.SELECTED_TRAVEL = function(){return _selectedTravel};
	me.SELECTED_FLIGHT = function(){
									if($.objectHasContent(_selectedTravel))
										if($.objectHasContent(_selectedTravel.FLIGHT)){
											return JSON.parse(_selectedTravel.FLIGHT);
										}else{return null}
									};
	
		
	
	// Función que recupera todos los viajes almacenados y selecciona además el que corresponde como siguiente
	me.loadTravels = function (okCB) {
		
		if(okCB == null){//Si no hemos pasado Callback es que es automático. Actualizamos directamente el contexto
		 okCB = GestorContexto.setContextFlightNewData;
		}
		
		Proxy.execute('getAllTravels',
						null,
						function(data){
							if($.objectHasContent(data)){
								_travels = data;
								_selectedTravel = data[0];
							}else{
								_travels = null;
								_selectedTravel=null;
							}
							GestorContexto.setFlight(me.SELECTED_FLIGHT(),okCB,false,true);//Se establece en contexto el que toca y esto refresca el resto
						},
						function(err){//console.log("Error al recuperar viajes: " + err);
							_selectedTravel=null;
							_travels = null;
							GestorContexto.setFlight(null,okCB,false,false);//Se establece en contexto que no tenemos ninguno
						},
						ConstF.prioridadSoloBD);
	}
	
	// Función que añade un nuevo viaje a partir de un vuelo. Psteriormente recarga este gestor,
	me.addTravel = function (flight,okCB){
		var _date  = new Date();
		if($.objectHasContent(flight.fechaSalidaProgramadaAsString)){
			_date.setISO8601IgnoreLocalTimeOffSet(flight.fechaSalidaProgramadaAsString);
		} else {
			_date.setISO8601IgnoreLocalTimeOffSet(flight.fechaLlegadaProgramadaAsString);
		}
		
		var _param = {"datosConsulta": {"FLIGHT": JSON.stringify(flight),
										"TRAVEL_DATE": _date,
										"pkSalida":flight.pkSalida,
										"pkLlegada": flight.pkLlegada
										}};		
												         
		
		Proxy.execute('insertTravel', 
						_param,
						function(data){
							me.loadTravels(function(){
								GestorContexto.resetNextFlightCheck();
								GestorContexto.resetChangeAirportAuto();
								GestorContexto.setContextFlightNewData();
								okCB();
							});
						},
						function(err){
							//console.log("Error al insertar viaje: " + err);
						},
						ConstF.prioridadSoloBD);
	}
	
	
	me.updateTravel = function (flight,travelID){
		
		var _date  = new Date();
		if($.objectHasContent(flight.fechaSalidaProgramadaAsString)){
			_date.setISO8601IgnoreLocalTimeOffSet(flight.fechaSalidaProgramadaAsString);
		} else {
			_date.setISO8601IgnoreLocalTimeOffSet(flight.fechaLlegadaProgramadaAsString);
		}
		
		var _param = {"datosConsulta": {"FLIGHT": JSON.stringify(flight),
										"TRAVEL_DATE": _date,
										"pkSalida":flight.pkSalida,
										"pkLlegada": flight.pkLlegada,
										"TRAVEL_ID": travelID
										}};		
												         
		
		Proxy.execute('updateTravel', 
						_param,
						function(data){
						//OK
						},
						function(err){
							//console.log("Error al actualizar viaje: " + err);
						},
						ConstF.prioridadSoloBD);
	}
	
	

	// Función que elimina un viaje (travelID)
	me.removeTravel = function (travelID, okCB){

		var _param = {"datosConsulta": {"TRAVEL_ID": travelID}};		
		
		Proxy.execute('deleteTravel', 
						_param,
						function(data){
							me.loadTravels(function(){
								GestorContexto.resetNextFlightCheck();
								GestorContexto.resetChangeAirportAuto();
								GestorContexto.setContextFlightNewData();
								okCB();
							});
						},
						function(err){
							//console.log("Error al eliminar viaje: " + err);
						},
						ConstF.prioridadSoloBD);
		
		
	}
	
	/*
	 * Elimina los vuelos antiguos
	 */
	me.deleteOldTravels = function(okCB){
		//Nos cargamos los vuelos que se han pasado de fecha
		var _date  = new Date();
		_date.setDate(_date.getDate() - ConstF.daysLimitTravels);
		
		var _param = {"datosConsulta": {"TRAVEL_DATE": _date}};	
		Proxy.execute('deleteTravelsBefore', 
						_param,
						function(data){
							if(okCB != null) okCB();
						},
						function(err){},
						ConstF.prioridadSoloBD);
	}
	
	me.getTravelByFlight = function(flight){
		
		var _travel = null;
		//Localizarlo en viajes y si existe devolverlo 
		//_travels
		if($.objectHasContent(_travels)){
			var	_params=[{'NAME':'pkSalida','VALUE':flight.pkSalida},{'NAME':'pkLlegada','VALUE':flight.pkLlegada}];
			var _aux = $.getFilteredArrayFromJSONArray(_travels,_params);
			//Se ha localizado así que lo tenemos ya
			if(_aux.length>0){ _travel = _aux[0];}
		}		
		return _travel; 
	}


}

function _GestorContexto() {
	var me = this;

	var controlPosicion = null;
	var _isContextFlightUpdated=false;//Se utiliza para saber si la información está actualizada o no.
	/**
	 * Se utiliza para saber cuando fue la ultima vez que cargo correctamente el contexto
	 * Se inicializa al arrancar puesto que podemos arrancar con un vuelo de contexto almacenado 
	 */
	var _lastLoadContext=new Date(); 
	
	var _flightNearFlightChecked = false; //Flag para ver si se ha realizado el chequeo de vuelos planificados muy pegados en el tiempo
	var _checkTime = new Date(); //Baliza para ver cuando hay que comprobar lo de los vuelos
	var _changedAirportAuto = false; //Flag que indica si el aeropuerto ya se ha cambiado de manera automatica

	var USER_CONTEXT = {
		UC_UUID : '',
		UC_AIRPORT : '',
		UC_LANGUAGE_ID : '',
		UC_DISPOSITIVE_TYPE : '',
		UC_TOKEN : '',
		UC_PUSH_TOKEN : '',
		UC_FLIGHT : '',
		UC_SELECTED_FLIGHT_PHASE : 'CHECK-IN', //'CHECK-IN','BOARDING','ARRIVAL' fijado en la pantalla detalle_codbar
		UC_LATITUDE : '',
		UC_LONGITUDE : '',
		UC_ALLOW_NOTIFICATIONS : 'true',
		UC_ALLOW_LOCATION : 'true',
		UC_ENTITY : '',
		UC_AIRPORT_LOCAL_TIME : new Date(),
	};

	var SMALL_CONTEXT = {
		UC_ENTITY : '',
		UC_TOKEN : '',
		UC_LANGUAGE_ID : ''
		//TMS:new Date().getTime()
	};
	

	me.SORT_CONTEXT = function(){
		SMALL_CONTEXT.UC_TOKEN = USER_CONTEXT.UC_TOKEN;
		SMALL_CONTEXT.UC_ENTITY = USER_CONTEXT.UC_ENTITY;
		SMALL_CONTEXT.UC_LANGUAGE_ID = USER_CONTEXT.UC_LANGUAGE_ID;
		//SMALL_CONTEXT.TMS = new Date().getTime();
		return SMALL_CONTEXT;}

	me.CONTEXT = function() {return USER_CONTEXT};
	me.UC_FLIGHT_UPDATED = function() {return _isContextFlightUpdated};
	me.LAST_LOAD_CONTEXT = function() {return _lastLoadContext};
	/**
	 *Resetea el cambio automatico de aeropuerto 
	 */
	me.resetChangeAirportAuto = function(){
		_changedAirportAuto = false;
	}

	/*
	 *Inicializa el contexto
	 */
	me.init = function(wsDao) {

		Proxy.addOp('RegisterDevice', null, wsDao, true);
		Proxy.addOp('Time', null, wsDao, true);

		
		me.CONTEXT().UC_DISPOSITIVE_TYPE = me.getMobileType();
		var _lang = GestorIdiomas.getLang();
		me.CONTEXT().UC_LANGUAGE_ID = _lang;
		me.CONTEXT().UC_UUID = Utils.getUniqueId();

		// var _allowNotif = 'true';
		// if($.objectHasContent(GestorPrefs.getPref('ALLOW_NOTIFACTIONS'))) {
			// _allowNotif = GestorPrefs.getPref('ALLOW_NOTIFACTIONS');
		// }
		// me.CONTEXT().UC_ALLOW_NOTIFICATIONS = _allowNotif.toString();

		// console.log('AGD getALLOW_NOTIFACTIONS')
		GestorSettings.getSetting('ALLOW_NOTIFACTIONS',function(data){
			// console.log('AGD getALLOW_NOTIFACTIONS OK: ' + JSON.stringify(data))
			if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
			{
				//alert('Tenemos UC_PUSH_TOKEN en preferencias = ' + GestorPrefs.getPref('UC_PUSH_TOKEN'));
				me.CONTEXT().UC_ALLOW_NOTIFICATIONS =  data[0].SETTING_VALUE;
			} 
			else
				me.CONTEXT().UC_ALLOW_NOTIFICATIONS = 'true';
		},
		function(err){
			console.log('Error en la recuperación de setting getALLOW_NOTIFACTIONS: ' + err);
			me.CONTEXT().UC_ALLOW_NOTIFICATIONS = 'true';
		});

		// var _allowLocation = 'true';
		// if($.objectHasContent(GestorPrefs.getPref('ALLOW_AUTO-LOCATION'))) {
			// _allowLocation = GestorPrefs.getPref('ALLOW_AUTO-LOCATION');
		// }
		// me.CONTEXT().UC_ALLOW_LOCATION = _allowLocation.toString();
		
		// console.log('AGD getALLOW_AUTO-LOCATION')
		GestorSettings.getSetting('ALLOW_AUTO-LOCATION',function(data){
			// console.log('AGD getALLOW_AUTO-LOCATION OK: ' + JSON.stringify(data))
			if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
			{
				//alert('Tenemos UC_PUSH_TOKEN en preferencias = ' + GestorPrefs.getPref('UC_PUSH_TOKEN'));
				me.CONTEXT().UC_ALLOW_LOCATION =  data[0].SETTING_VALUE;
			} 
			else
				me.CONTEXT().UC_ALLOW_LOCATION = 'true';
		},
		function(err){
			console.log('Error en la recuperación de setting getALLOW_AUTO-LOCATION: ' + err);
			me.CONTEXT().UC_ALLOW_LOCATION = 'true';
		});
		
		
		//alert('Tenemos UC_ALLOW_LOCATION = ' + _allowLocation.toString());
		
		// if($.objectHasContent(GestorPrefs.getPref('UC_PUSH_TOKEN'))) {
			//alert('Tenemos UC_PUSH_TOKEN en preferencias = ' + GestorPrefs.getPref('UC_PUSH_TOKEN'));
			// me.CONTEXT().UC_PUSH_TOKEN = GestorPrefs.getPref('UC_PUSH_TOKEN');
		// }
		// console.log('AGD getUC_PUSH_TOKEN')
		GestorSettings.getSetting('UC_PUSH_TOKEN',function(data){
			// console.log('AGD getUC_PUSH_TOKEN OK: ' + JSON.stringify(data))
			if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
			{
				//alert('Tenemos UC_PUSH_TOKEN en preferencias = ' + GestorPrefs.getPref('UC_PUSH_TOKEN'));
				me.CONTEXT().UC_PUSH_TOKEN = data[0].SETTING_VALUE;
			} 
		},
		function(err){
			console.log('Error en la recuperación de setting UC_PUSH_TOKEN: ' + err);
		});
		
		//console.log('TOKEN - ' + GestorPrefs.getPref('UC_TOKEN'));
		// if($.objectHasContent(GestorPrefs.getPref('UC_TOKEN'))) {
			// me.CONTEXT().UC_TOKEN = GestorPrefs.getPref('UC_TOKEN');
			// me.CONTEXT().UC_ENTITY = GestorPrefs.getPref('UC_ENTITY');
// 			
			// me.initRegistered(wsDao);
		// } else {
			// registerLoop(wsDao);
		// }
		
        
        // Parche: FJORDAN -> Se fuerza SIEMPRE al registro
        console.log('FJORDAN: get UC_TOKEN');
        // Se obtiene el UC_TOKEN desde la base de datos interna
        GestorSettings.getSetting('UC_TOKEN',
                                  function(data) {
                                    // Ok, tenemos el valor de UC_TOKEN
                                    console.log('FJORDAN: Value for UC_TOKEN from Database: ' + JSON.stringify(data));
                                    if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE)) {
                                        // Si tenemos valor, lo establecemos, en otro caso nos quedamos con el valor null
                                        me.CONTEXT().UC_TOKEN = data[0].SETTING_VALUE;
                                    } else {
                                        me.CONTEXT().UC_TOKEN = null;
                                    }
                                    console.log('FJORDAN: Current value for UC_TOKEN in Context: ' + me.CONTEXT().UC_TOKEN);
                                  
                                    // Se obtiene el valor de UC_ENTITY
                                    GestorSettings.getSetting('UC_ENTITY',
                                                              function(data) {
                                                                // Ok, tenemos el valor de UC_ENTITY
                                                                console.log('FJORDAN: Value for UC_ENTITY from Database: ' + JSON.stringify(data));
                                                                if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE)) {
                                                                    // Si tenemos valor, lo establecemos, en otro caso nos quedamos con el valor null
                                                                    me.CONTEXT().UC_ENTITY = data[0].SETTING_VALUE;
                                                                } else {
                                                                    me.CONTEXT().UC_ENTITY = null;
                                                                }
                                                                console.log('FJORDAN: Current value for UC_ENTITY in Context: ' + me.CONTEXT().UC_ENTITY);
                                                              
                                                                // Forzar el registro
                                                                registerLoop(wsDao);
                                                              },
                                                              function(error) {
                                                                // error ...
                                                                console.log('FJORDAN: Error en la recuperación de setting UC_ENTITY: ' + err);
                                                                registerLoop(wsDao);
                                                              });
                                  },
                                  function(error) {
                                    // Error !
                                    console.log('FJORDAN: Error en la recuperación de setting UC_TOKEN: ' + err);
                                    registerLoop(wsDao);
                                  });
        
        /*
		 console.log('FJORDAN: getUC_TOKEN')
		GestorSettings.getSetting('UC_TOKEN',function(data){
			 console.log('FJORDAN: getUC_TOKEN OK: ' + JSON.stringify(data))
			if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
			{
				me.CONTEXT().UC_TOKEN = data[0].SETTING_VALUE;
				 console.log('FJORDAN: getUC_TOKEN result: ' + me.CONTEXT().UC_TOKEN);
				 console.log('FJORDAN: getUC_ENTITY')
				GestorSettings.getSetting('UC_ENTITY',function(data){
					 console.log('FJORDAN: getUC_ENTITY OK: ' + JSON.stringify(data))
					if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
					{
						me.CONTEXT().UC_ENTITY = data[0].SETTING_VALUE;
						console.log('FJORDAN: getUC_ENTITY result: ' + me.CONTEXT().UC_ENTITY);
						me.initRegistered(wsDao);
                                          
                        // Gestor PUSH
                        GestorPush.init();
					}
					else{
						registerLoop(wsDao);
					}
				},
				function(err){
					console.log('Error en la recuperación de setting UC_ENTITY: ' + err);
					registerLoop(wsDao);
				});
			} 
			else{
				registerLoop(wsDao);	
			}
		},
		function(err){
			console.log('Error en la recuperación de setting UC_TOKEN: ' + err);
			registerLoop(wsDao);
		});
        */

	}


	/*
	 Devuelve true si el vuelo cumple con el criterio de fecha necesario para enviarlo al ESB y para pintarlo en la CODBAR
	 * */
	me.flightOnDate = function(){

		var limitCodBarDate = new Date();
		limitCodBarDate.setDate(limitCodBarDate.getDate() + ConstF.daysShowCodbar);
		
		var _tmpDate = new Date();
		if($.objectHasContent(me.CONTEXT().UC_FLIGHT.fechaSalidaProgramadaAsString)) {
			_tmpDate.setISO8601IgnoreLocalTimeOffSet(me.CONTEXT().UC_FLIGHT.fechaSalidaProgramadaAsString)
		} else if($.objectHasContent(me.CONTEXT().UC_FLIGHT.fechaLlegadaProgramadaAsString)) {
			_tmpDate.setISO8601IgnoreLocalTimeOffSet(me.CONTEXT().UC_FLIGHT.fechaLlegadaProgramadaAsString)
		}

		return (_tmpDate< limitCodBarDate);
	
	}


	me.setContextTime = function(dateTimeTo) {
		if($.objectHasContent(dateTimeTo)) {
			me.CONTEXT().UC_AIRPORT_LOCAL_TIME = new Date();
			me.CONTEXT().UC_AIRPORT_LOCAL_TIME.setISO8601IgnoreLocalTimeOffSet(dateTimeTo);
		} else {
			me.CONTEXT().UC_AIRPORT_LOCAL_TIME = new Date();
		}
	}

	me.setAirportTime = function(okCB) {

		var _param = {
			'arg0' : me.CONTEXT().UC_AIRPORT.AIRPORT_ID
		};

		Proxy.execute('Time', _param, function(data) {
			me.setContextTime(data.LOCAL_TIME);
			if(okCB != null && okCB != 'undefined') {
				okCB()
			}
		}, function(err) {
			me.setContextTime(null);
			if(okCB != null && okCB != 'undefined') {
				okCB()
			}
		}, ConstF.prioridadSoloNet);
	}
	
	
	/**
	 * Resetea el flag para que se vuelvan a comprobar los vuelos muy pegados en el planificador 
	 */
	me.resetNextFlightCheck = function(){
		//console.log('unai: Reseteada la comprobacion de flights muy pegados en el tiempo');
		_flightNearFlightChecked = false;
		var tmp = new Date();
		_checkTime = new Date(tmp.getTime()+ConstF.checkNextTravelSeparationTime);
	}
	
	/**
	 * Callback invocado cuando tenemos los datos del vuelo actual y del vuelo siguiente 
	 */
	var checkNextTravelsOkCB = function(currFlight,dataNextFlight){
		//Comprobamos que la llegada estimada esta cerca de la salida estimada y en ese caso sacamos el popup
		var _estimadaSalidaNext;
		var _estimadaLlegadaCurr;
		if($.objectHasContent(currFlight.fechaLlegadaEstimadaAsString)) {
			_estimadaLlegadaCurr = new Date();
			_estimadaLlegadaCurr.setISO8601IgnoreLocalTimeOffSet(currFlight.fechaLlegadaEstimadaAsString)
			//console.log('unai:estimadaLlegadaActual:'+_estimadaLlegadaCurr.toISOString());
			if($.objectHasContent(dataNextFlight.fechaSalidaEstimadaAsString)) {
				_estimadaSalidaNext = new Date();
				_estimadaSalidaNext.setISO8601IgnoreLocalTimeOffSet(dataNextFlight.fechaSalidaEstimadaAsString)
				//console.log('unai:estimadaSalidaSig:'+_estimadaSalidaNext.toISOString());
				//Miramos si esta en el limite
				var _checkDate = new Date(_estimadaLlegadaCurr.getTime()+ConstF.timeBetweenFlightsPlannified);
				//console.log('unai:Salida+margen:'+_checkDate.toISOString());
				if(_checkDate >= _estimadaSalidaNext){ //Supera el rango
					//console.log('unai:sacar popup');
					showNextTravelDialog(dataNextFlight, function(){
						//console.log('unai: Borrando el vuelo actual para que se sustituya por el siguiente');
						var _viajTravel = GestorViajes.getTravelByFlight(currFlight);
						var _tId = _viajTravel.TRAVEL_ID;
						GestorViajes.removeTravel(_tId, function(){
							//console.log('unai: Borrado ok');
							if($.mobile.activePage.attr('id') == 'planificador'){
								//Refresh
								cargaViajes('listaViajes');
							}
						});
					});
				} else{
					//console.log('unai: No esta a menos de media hora, no se añade');
				}
			} else{
				//console.log('unai: No se hace nada, porque no hay fecha de salida programada');
			}
		} else{
			//console.log('unai: No se hace nada, porque no hay fecha de llegada programada');
		}
	}
	
	/**
	 * Callback de error cuando no hemos podido obtener detalles del siguiente vuelo 
	 */
	var checkNextTravelsErrCB = function(currFlight,nextFlight){
		//console.log('unai:Error obteniendo detalle del siguiente vuelo. Programamos un nuevo intento.');
		_flightNearFlightChecked = false;
		setTimeout(function(){
			//Comprobamos que no ha cambiado lo planificado, mientras esperamos a volver a intentarlo
			var _travels = GestorViajes.TRAVELS();
			if(_travels.length>1 && _travels[1].pkSalida === nextFlight.pkSalida){
				if(currFlight.pkLlegada === me.CONTEXT().UC_FLIGHT.pkLlegada){
					//console.log('unai:No han cambiado ningun vuelo del planificador, volvemos a intentar obtener el detalle');
					me.checkNextTravels(currFlight); //Recursivo hasta que se obtiene
				} else{
					//console.log('unai:No coincide el vuelo planificado. Lo han cambiado.');
				}
			} else{
				//console.log('unai:No coincide el siguiente vuelo. Lo han cambiado');
			}
		},ConstF.timeAfterNextAttemptToGetDetail);
		
	}
	
	/**
	 * Se encarga de chequear si hay vuelos planificados pegados entre ellos. Recibe el ultimo detalle de vuelo como parametro
	 */
	me.checkNextTravels = function(_currFlightDetails){
		var now = new Date();
		if(!_flightNearFlightChecked && _checkTime<now){
			//console.log('unai: Chequeando si esta cercano en el tiempo');
			//Cambiamos el flag para que ningun callback sea ya capaz de entrar aqui y procesamos
			_flightNearFlightChecked = true;
			var _travels = GestorViajes.TRAVELS();
			if(_travels.length>1){ //Hay mas de uno, comprobar el siguiente
				var _next = JSON.parse(_travels[1].FLIGHT);
				//console.log('unai: Siguiente planificado:'+JSON.stringify(_next));
				if($.objectHasContent(_next.pkSalida)){ //Miramos si tiene fecha de salida programada, si no la comprobacion ha finalizado
					var wsDao = new NetDao();		
					var GDetail = new _GestorFlightDetails();
					GDetail.init(wsDao);
					GDetail.setParamFlight(_next);
					GDetail.getFlightDetail(function(){
						var _f = GDetail.FLIGHT_DETAILS();
						if($.objectHasContent(_f)){
							//console.log('unai:Si hay detalle');
							checkNextTravelsOkCB(_currFlightDetails,_f);
						} else{
							//console.log('unai:El detalle');
							checkNextTravelsErrCB(_currFlightDetails,_next);
						}
						
					},function(){
						checkNextTravelsErrCB(_currFlightDetails,_next); //Se pasa el siguiente por si cambia en la siguiente ejecucion el vuelo, cancelar la operacion
					});
				} else{
					//console.log('unai: El siguiente vuelo no es un vuelo de salida.');
				}
			} else{
				//console.log('unai: No hay mas viajes planificados despues de este');
			}
		} else{
			//console.log('unai:Este vuelo ya se ha chequeado o esta en proceso de chequeo');
		}
	}

	me.setcontextPhase = function() {
	
		var _flight = me.CONTEXT().UC_FLIGHT;
		
		/*
		 * Estado de scena, se procesa primero el vuelo de salida si existe y luego el vuelo de llegada, por lo tanto:
		 *
		 * - _estado contiene el estado scena del vuelo de salida, a no ser que no haya vuelo de salida, o estado sipa de salida es BOR.
		 * En este caso, toma el estado scena del vuelo de llegada.
		 */
		var _estado = _flight.estado;
		
		// calculo si trabajo con un vuelo de salida, de llegada o ambos
		var vueloSalida = false;
		var vueloLlegada = false;
		if ($.objectHasContent(_flight.pkSalida) && !$.objectHasContent(_flight.pkLlegada)) {
			vueloSalida = true;
		} else if (!$.objectHasContent(_flight.pkSalida) && $.objectHasContent(_flight.pkLlegada)) {
			vueloLlegada = true;
		}
		
		/*
		 * Los casos que se pueden dar son:
		 *
		 * 1 - CHECK-IN: SCH, INI
		 * 2 - BOARDING: BTR, BRD, LSC, CLS, RDY, OBK, LIM
		 * 3 - ELIMINACION: BOR
		 * 4 - ARRIVAL: SCH, INI, FLY, FIR, FNL, LND, LIM, IBK
		 */
		
		if (vueloSalida) {
		
			// Solo es vuelo de salida
		
			switch (_estado) {
				// caso 2
				case 'BTR': case 'BRD': case 'LSC': case 'CLS': case 'RDY': case 'OBK': case 'LIM':
					me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'BOARDING';
					GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoOrigen);
					me.refreshUI();
					break;
				// caso 3
				case 'BOR':
					// Quitamos el vuelo del planificador
					var trav = GestorViajes.getTravelByFlight(_flight);
					// Se hace porque se puede haber eliminado a mano justo en ese momento
					if (trav != null) {
						GestorViajes.removeTravel(trav.TRAVEL_ID, function(){
							me.refreshUI();
						});
						// El gestor de viajes al recalcularse terminar refrescando todo
					}
					break;
				// caso 1
				default:
					// También entran los estados: DIV, CAN, SUS
					me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'CHECK-IN';
					GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoOrigen);
					me.refreshUI();
			}
		
		} else if (vueloLlegada) {
		
			// Solo es vuelo de llegada
		
			switch (_estado) {
				// caso 3
				case 'BOR':
					// Quitamos el vuelo del planificador
					var trav = GestorViajes.getTravelByFlight(_flight);
					// Se hace porque se puede haber eliminado a mano justo en ese momento
					if (trav != null) {
						GestorViajes.removeTravel(trav.TRAVEL_ID, function(){
							me.refreshUI();
						});
						// El gestor de viajes al recalcularse terminar refrescando todo
					}
					break;
				// caso 4
				default:
					// También entran los estados: CAN
					me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'ARRIVAL';
					//console.log('unai:Detectado cambio a llegada. Chequear');
					me.checkNextTravels(_flight);
					//Hacemos el cambio automatico, solo la primera vez 
					if(!_changedAirportAuto){
						//console.log('unai:primer cambio automatico de aeropuerto');
						GestorAirports.setAirportManual(false);
						GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoDestino);
						_changedAirportAuto = true;
					}
					me.refreshUI();
			}
		
		} else {
		
			// Es vuelo de salida y de llegada
		
			// Para el caso de ambos vuelos, debo mirar el estado sipa, para saber la finalización de cada vuelo
			var estadoSalida = _flight.estadoSalida;
			var estadoLlegada = _flight.estadoLlegada;
			
			if (!$.objectHasContent(estadoSalida) || estadoSalida != 'BOR') {
			
				switch (_estado) {
					// caso 2
					case 'BTR': case 'BRD': case 'LSC': case 'CLS': case 'RDY': case 'OBK': case 'LIM':
						me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'BOARDING';
						GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoOrigen);
						me.refreshUI();
						break;
					// caso 1
					default:
						// También entran los estados: DIV, CAN, SUS
						me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'CHECK-IN';
						if(me.CONTEXT().UC_AIRPORT.AIRPORT_ID!=me.CONTEXT().UC_FLIGHT.aeropuertoDestino){
							GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoOrigen);
						}
						me.refreshUI();
				}
			
			} else if (!$.objectHasContent(estadoLlegada) || estadoLlegada != 'BOR') {
			
				// caso 4
				// También entran los estados: CAN
				me.CONTEXT().UC_SELECTED_FLIGHT_PHASE = 'ARRIVAL';
				//console.log('unai:Detectado cambio a llegada. Chequear');
				me.checkNextTravels(_flight);
				if(!_changedAirportAuto){
						//console.log('unai:primer cambio automatico de aeropuerto');
						GestorAirports.setAirportManual(false);
						GestorAirports.changeDefaultAirport(me.CONTEXT().UC_FLIGHT.aeropuertoDestino);
						_changedAirportAuto = true;
				}
				me.refreshUI();
			
			} else {
				
				// caso 3
				// Quitamos el vuelo del planificador
				var trav = GestorViajes.getTravelByFlight(_flight);
				// Se hace porque se puede haber eliminado a mano justo en ese momento
				if (trav != null) {
					GestorViajes.removeTravel(trav.TRAVEL_ID, function(){
						me.refreshUI();
					});
					// El gestor de viajes al recalcularse terminar refrescando todo
				}
				
			}
		
		}

	}
	/**
	 * Arrancado en el init y se queda infinitamente haciendo peticiones a RegisterDevice
	 */
	var registerLoop = function(wsDao) {
		console.log('FJORDAN: registerLoop')
		var _param = {};
		Proxy.execute('RegisterDevice', _param, function(data) {
            console.log('FJORDAN: registerLoop OK: Response: ' + JSON.stringify(data));
			var _token = $.getSingleObjectByPKFromJSONArray(data.fields, 'nameField', 'UC_TOKEN');
			var _entity = data.entity.idEntity;

			//GestorPrefs.setPref('UC_TOKEN', _token.values[0].value);
			var _tokenValue = _token.values[0].value;
			console.log('FJORDAN: setUC_TOKEN: ' + _tokenValue );
			GestorSettings.setSetting('UC_TOKEN',_tokenValue);
                      
			//GestorPrefs.setPref('UC_ENTITY', _entity);
			console.log('FJORDAN: setUC_ENTITY: ' + _entity );
			GestorSettings.setSetting('UC_ENTITY',_entity);
                      
			me.CONTEXT().UC_TOKEN = _tokenValue;
			me.CONTEXT().UC_ENTITY = _entity;
			me.initRegistered(wsDao);
                      
			//Recargamos la pagina actual:
			$($.mobile.activePage).trigger('pageshow');
			//Lanzamos la actualizacion de vuelos
			GestorAirports.updateAirports();
                      
            // Gestor PUSH
            GestorPush.init();
                      
		}, function(err) {
			//console.log('AGD registerLoop err: '+ JSON.stringify(err)) 
			setTimeout(function() {
				registerLoop(wsDao)
			}, ConstF.register_interval);
			//Llamada recursiva hasta que lo consiga
			//console.log('RegisterDevice - ERROR:' + JSON.stringify(err));
		}, ConstF.prioridadSoloNet);
	};


	/*
	 Se llama este método si se ha realizado correctamente el registro
	 * */
	me.initRegistered = function(wsDao) {
		
		Proxy.addOp('SetContext', null, wsDao);
		Proxy.addOp('SetPushTokenContext', null, wsDao);
		//Desbloqueamos IO
		Proxy.unlock();
		
		//Se lanza el bucle para fijar el contexto y localizar los últimos datos del vuelo de contexto 
		$.asyncTimerExecution(function() {
			me.setContextFlightNewData();

		}, ConstF.delay_contextUpdate, function() {
			return true;
		});
		
	};

	me.setContextFlightNewData = function (){
		
		if($.objectHasContent(me.CONTEXT().UC_FLIGHT)) {//Si hay vuelo en el contexto
		
			var wsDao = new NetDao();		
			var GestorFlight = new _GestorFlightDetails();
			GestorFlight.init(wsDao);
			GestorFlight.setParamFlight(me.CONTEXT().UC_FLIGHT);
			GestorFlight.getFlightDetail(function(){
											//OK - Se ha localizado el vuelo de contexto
											var _f = GestorFlight.FLIGHT_DETAILS();
											if($.objectHasContent(_f)){
												//console.log('VUELO CONTEXTO:' + JSON.stringify(_f));
												//Puede que el vuelo que se trae ya no esté en contexto
												if(GestorFlight.isSameFlight(me.CONTEXT().UC_FLIGHT)){
													me.setFlight(_f,null,true,true);
												}
												if($.objectHasContent(GestorViajes.SELECTED_TRAVEL())){
													var travelId = GestorViajes.SELECTED_TRAVEL().TRAVEL_ID;
													GestorViajes.updateTravel(_f,travelId);
												}
											}else{//Dejamos la información que teníamos pero informamos que el contexto no se ha fijado
												_isContextFlightUpdated=false;
												me.refreshUI();	
											}
										}
										, function(){
											//ERR- no se ha localizado el vuelo de contexto
											_isContextFlightUpdated=false;
											me.refreshUI();
										});
		}
		me._setContext();//Llamamos para establecer el contexto en servidor
	};

	/*
	 Función que tiene la lógica para determinar si se debe enviar el contexto a servidor y en caso afirmativo
	 lo envía
	 * */
	me._setContext=function(){
				//Se lanza la actualización del contexto.
			Proxy.execute('SetContext',{}, function(data) {
				console.log('SETCONTEXT:' + JSON.stringify(data));
				//Si todo va bien se modifica la hora de contexto con la que se ha devuelto
				var _airportTime = $.getSingleObjectByPKFromJSONArray(data.fields, 'nameField', 'UC_AIRPORT_LOCAL_TIME');
				var _time = _airportTime.values[0].value;
				me.setContextTime(_time);
			}, function(err) {}, ConstF.prioridadSoloNet);
	};

	/*
	 A este método se llama siempre que se quiere fijar el vuelo en el contexto, 
	 para fijar uno o para elimiar el que se tiene.
	 Lo llama el planificador y además el bucle
	 * */
	me.setFlight = function(_flight, okCB,isUpdated,isNew) {
		_isContextFlightUpdated=isUpdated;//Se establece si tenemos información correcta o no al fijar el vuelo
		
		if(isNew){ //Nos indica si es un vuelo nuevo, para tener en cuenta la fecha de caducidad
			_lastLoadContext = new Date();
		}
		
		if($.objectHasContent(_flight)) {
			//Si tenemos vuelo lo fijamos en contexto y en la ventana incial
			me.CONTEXT().UC_FLIGHT = _flight;
			me.setcontextPhase();//YA ejecuta un RefreshUI
		} else {
			//No tenemos vuelo planificado, no se puede fijar en el contexto.
			me.CONTEXT().UC_FLIGHT = null;
			me.refreshUI();
		}
		
		
		
		if(okCB != null) okCB();
		
	}
	
	me.refreshUI = function() {
		//Acutalizar codbar y la ventana de CODBAR si está abierta
		if($('#' + ConstPages.Element_CodBar).length) {
			paintCODBar(ConstPages.Element_CodBar);
		}
		if($('#contextAirport').length) {
			//SE refresca el tiempo y el aeropuerto
			$('#contextAirport').html(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_NAME);
			//getWeather();
		}
		//console.log('---------------------------- refreshUI' + $('#planificador').length);
		if($('#planificador').length) {
			//console.log('---------------------------- refreshUI llamamos a cargaViajes');
			cargaViajes('listaViajes');
		}
	}

	//Devuelve el codigo con el que funcionamos en el ESB en notificaciones
	me.getMobileType = function() {
		var res = '';
		if(device.platform == 'Android') {
			res = ConstF.mobileAndroid;
		} else if(device.platform == 'iPhone') {
			res = ConstF.mobileIphone;
		} else if(device.platform == 'iPad') {
			res = ConstF.mobileIphone;
		} else if(device.platform == 'iOS') {
            res = ConstF.mobileIphone;
		}
		
		return res;
	}

	var pushTokenLoop = function(token) {//Se invoca a cada arranque o cuando se obtiene el Push. Bucle infinito hasta que conteste ESB
		console.log("PUSH Context --- token: "+token);
		var _param = {};
		GestorContexto.CONTEXT().UC_PUSH_TOKEN = token;
		console.log("PUSH Context --- Set Push Token Context - PETICION: " + JSON.stringify(_param));

        Proxy.execute('SetPushTokenContext', _param, function(data) {
			console.log("PUSH Context --- Set Push Token guardado correcto");
			//GestorPrefs.setPref('UC_PUSH_TOKEN', token);
			// console.log('AGD setUC_PUSH_TOKEN: ' + token );
			GestorSettings.setSetting('UC_PUSH_TOKEN',token);
                      
		}, function(err) {
			console.log("PUSH Context --- Fallo en la invocacion a Set Push Token: " + err);
			setTimeout(function() {
				pushTokenLoop(token)
			}, ConstF.setpushtoken_interval);
		}, ConstF.prioridadSoloNet);
	}

	me.setPushTokenContext = function(token) {
        console.log("PUSH Context --- setPushTokenContext: "+token);
		pushTokenLoop(token);
	}
}

function getCODBar() {

	var htmlData = "";
	if($.objectHasContent(GestorViajes.SELECTED_FLIGHT())) {
		htmlData = _getDataCODBAR();
	} else {//No tenemos vuelo en el planificador
		htmlData = '<div id="codBar" class="codBarDiv-commonHeader" onclick="eventClickCodbar(false);navigateSearchFlights();">';
		htmlData += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">';
		htmlData += '<tr><td class="codBarInfoCell-commonHeader" >';
		htmlData += GestorIdiomas.getLiteral('noVueloDeterminado');
		htmlData += '</td></tr>';
		htmlData += '</table></div>';
	}
	return htmlData;
}

/**
 *Invocado desde el evento de resume recibir la CODBAR con Updating o Seleccione vuelo
 */
function getUpdatingCODBar(){
	var htmlData = "";
	if($.objectHasContent(GestorViajes.SELECTED_FLIGHT())) { //Actualizando segundo planog
		htmlData = '<div id="codBar" class="codBarDiv-commonHeader" onclick="eventClickCodbar(false);navigateSearchFlights();">';
		htmlData += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">';
		htmlData += '<tr><td class="codBarInfoCell-commonHeader" >';
		htmlData += GestorIdiomas.getLiteral('codBar_actualizando')+'</td>';
		htmlData += '<td><img src="../../themes/default/common/img/ajax-loader.gif" class="codBarAjaxLoad"/>';
		htmlData += '</td></tr>';
		htmlData += '</table></div>';
	} else {//No tenemos vuelo en el planificador
		htmlData = '<div id="codBar" class="codBarDiv-commonHeader" onclick="eventClickCodbar(false);navigateSearchFlights();">';
		htmlData += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">';
		htmlData += '<tr><td class="codBarInfoCell-commonHeader" >';
		htmlData += GestorIdiomas.getLiteral('noVueloDeterminado');
		htmlData += '</td></tr>';
		htmlData += '</table></div>';
	}
	return htmlData;
}

function _getDataCODBARFlight(flight){
	
	var tooOld = false;
	if(GestorContexto.LAST_LOAD_CONTEXT()!=null){
		var now = new Date();
		var limitUpdated = new Date(GestorContexto.LAST_LOAD_CONTEXT().getTime()+ConstF.codbarMaxiumAge);
		if(now>limitUpdated){
			tooOld = true;
		}
	} 
	
	var _classNoUpdated='';
	var htmlData = '<div id="codBar" class="codBarDiv-commonHeader" onclick="eventClickCodbar(true);navigateDefaultFlight();">';
	htmlData += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">';
	
	if(tooOld){ //Demasiado antigua
		htmlData += '<tr>';
		htmlData += '<td class="codBarInfoCell-commonHeader">'+GestorIdiomas.getLiteral('codBar_reviseConexion')+'</td>';
		htmlData += '</tr>';
	} else { //No es demasiado antigua
		if(!GestorContexto.UC_FLIGHT_UPDATED()) _classNoUpdated ='codBar-flightNotUpdated';//Si no tenemos datos reales se añade esta clase
	
		var _time = ConstF.noDataString;
		switch (GestorContexto.CONTEXT().UC_SELECTED_FLIGHT_PHASE) {
	        case 'CHECK-IN': case 'BOARDING':
	            if($.objectHasContent(flight.FLIGHT_DEP_TIME_REAL)) {
	                   _time = flight.FLIGHT_DEP_TIME_REAL.toShortTimeString()
	            }
	            var _gate = ConstF.noDataString;
	            if($.objectHasContent(flight.FLIGHT_DEP_GATE)) _gate = flight.FLIGHT_DEP_GATE;
	            
                var _mostrador = ConstF.noDataString;
                if($.objectHasContent(flight.FLIGHT_CHKIN_LOCATION)) _mostrador = flight.FLIGHT_CHKIN_LOCATION;

	            
	            htmlData += '<tr>';
	            htmlData += '<td class="codBarFirst codBarInfoCell-commonHeader '+_classNoUpdated+'" style="width:45px;" >' + flight.NUM_VUELO_DESC_SALIDA + '</td>';
	            htmlData += '<td class="codBarTimeCell-commonHeader '+_classNoUpdated+'" >' + _time + '</td>';
	            htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'" >'; 
	           // '<span style="display:block;">'+GestorIdiomas.getLiteral('codBar_checkInAbrevMostr')+' ' + _mostrador+'</span>'+
	            //'<span style="display:block;">'+GestorIdiomas.getLiteral('codBar_AbrevGate') + ' ' + _gate + '</span>'+

	            if (_mostrador != ConstF.noDataString){
	                htmlData += '<span>'+GestorIdiomas.getLiteral('codBar_checkInAbrevMostr')+ ' ' + _mostrador +'</span> ';
	            }
	            if (_gate != ConstF.noDataString){
	                htmlData += '<span>'+GestorIdiomas.getLiteral('codBar_AbrevGate') + ' ' + _gate+'</span>';
	            }

	            
	            htmlData += '</td>';
	            htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'">' + flight.FLIGHT_DEP_OBS + '</td>';
	            htmlData += '</tr>';
	
				break;
			case 'ARRIVAL': //Si llegamos aquí es que tenemos datos de llegada, en otro caso se ha pintado antes otra barra
		
				if($.objectHasContent(flight.FLIGHT_ARR_TIME_REAL)) {
					_time = flight.FLIGHT_ARR_TIME_REAL.toShortTimeString();
				}

				var _gate = ConstF.noDataString;
				var _carrousel = ConstF.noDataString;

				if($.objectHasContent(flight.FLIGHT_ARR_ROOM_1)) {
					_gate = flight.FLIGHT_ARR_ROOM_1;
				} else if($.objectHasContent(flight.FLIGHT_ARR_ROOM_2)) {
					_gate = flight.FLIGHT_ARR_ROOM_2;
				}

				if($.objectHasContent(flight.FLIGHT_BAG_CAROUSEL_1)) {
					_carrousel = flight.FLIGHT_BAG_CAROUSEL_1;
				} else if($.objectHasContent(flight.FLIGHT_BAG_CAROUSEL_2)) {
					_carrousel = flight.FLIGHT_BAG_CAROUSEL_2;
				}

				htmlData += '<tr>';			
				htmlData += '<td class="codBarFirst codBarInfoCell-commonHeader '+_classNoUpdated+'" style="width:45px;" >' + flight.NUM_VUELO_DESC_LLEGADA + '</td>';
				htmlData += '<td class="codBarTimeCell-commonHeader '+_classNoUpdated+'" >' + _time + '</td>';

                // htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'" >' + GestorIdiomas.getLiteral('codBar_AbrevSl') + ' ' + _gate + ' </td>';
                // htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'">/</td>';
                // htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'" >' + GestorIdiomas.getLiteral('codBar_AbrevCta') + ' ' + _carrousel + ' </td>';

                htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'" >';
                if (_gate != ConstF.noDataString) {
                    htmlData += '<span>' + GestorIdiomas.getLiteral('codBar_AbrevSl') + ' ' + _gate + ' </span>';
                }
                if (_carrousel != ConstF.noDataString) {
                    htmlData += '<span>' + GestorIdiomas.getLiteral('codBar_AbrevCta') + ' ' + _carrousel + ' </span>';
                }
                htmlData += '</td>';

				htmlData += '<td class="codBarInfoCell-commonHeader '+_classNoUpdated+'" >' + flight.FLIGHT_ARR_OBS + '</td>';
				htmlData += '</tr>';
			
			break;
		}
	}

	htmlData += '</table></div>';
	return htmlData;
	
}


/*
 Se llama a este método sabiendo que se tiene un vuelo en el planificador como vuelo seleccionado y por tanto está en el contexto.
 * */
function _getDataCODBAR() {
	
	var flight = GestorContexto.CONTEXT().UC_FLIGHT;
	var htmlData='';
	var showCodBarInfo = true;
	
	//Si el vuelo está en llegada y no tenemos fecha de llegada no se pinta.
	if(GestorContexto.CONTEXT().UC_SELECTED_FLIGHT_PHASE == 'ARRIVAL' && !$.objectHasContent(flight.fechaLlegadaEstimadaAsString)) {
		showCodBarInfo = false;
	}
	flight = GestorFlightDetails.formatFlight(flight);
	//Solo pintamos a partir de X dias antes del vuelo. Este método de contexto devuelve si está en el rango o no.
	if(showCodBarInfo) showCodBarInfo = GestorContexto.flightOnDate();
	
	if(showCodBarInfo){//Tenemos que pintar la información
		htmlData = _getDataCODBARFlight(flight);
	}else{//Tenemos vuelo en el planificador pero no se tiene por que mostrar en el contexto.
		var desc = $.notNullString(flight.AIRLINE_ID_IATA) + $.notNullString(flight.FLIGHT_NUMBER);
		
		if($.objectHasContent(flight.NUM_VUELO_DESC_SALIDA)){
			desc = flight.NUM_VUELO_DESC_SALIDA;
		} else if($.objectHasContent(flight.NUM_VUELO_DESC_LLEGADA)){
			desc = flight.NUM_VUELO_DESC_LLEGADA;
		}
		
		htmlData = '<div id="codBar" class="codBarDiv-commonHeader" onclick="eventClickCodbar(true);navigateDefaultFlight();">';
		htmlData += '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%"><tr>';
		htmlData += '<td class="codBarInfoCell-commonHeader" >';
		htmlData += desc + ' - ' +GestorIdiomas.getLiteral('codBar_NoState');
		htmlData += '</td></tr>';
		htmlData += '</table></div>';
	}
	
	return htmlData;
}



function _ensureCodBarData(fieldData) {
	var _ret = ConstF.noDataString;
	if($.objectHasContent(fieldData)) {
		_ret = fieldData;
	}
	return _ret;

}


// Gestor de aerolíneas
// Almacena en sesión la lista de aerolíneas
function _GestorAirlines() {
	var me = this;

	// VARIABLES --------------------------------------------------------------------------------------------------------------
	var _selectedAirport;

	var _airlines = [];
	me.AIRLINES = function(){return _airlines;};

	var _selectedAirline;
	
	// POSIBLEMENTE SOBRE PQ NO HABRA DETALLE_COMP.HTML
	me.SELECTED_AIRLINE = function(){return _selectedAirline;};

	// ------------------------------------------------------------------------------------------------------------------------

	// INICIALIZACION ---------------------------------------------------------------------------------------------------------
	
	// Función de inicialización del gestor de aerolineas con el resgistro de las operaciones de WS necesarias
	me.init= function(wsDao){
			//console.log('Inicializando GestorAirlines');
			Proxy.addOp('GetCompAereas',null,wsDao);
		
	};
	
	// ------------------------------------------------------------------------------------------------------------------------

	// FUNCIONES --------------------------------------------------------------------------------------------------------------
	
	me.setAirport = function(airportId){
		if (me._selectedAirport != airportId)
			_airlines = [];
		me._selectedAirport = airportId;
	};
	
	// Función que devuelve todas las aerolíneas que operan en un aeropueto determinado
	// (airportId).
	me.getAirlinesFromAirport = function(okCB){
		//console.log('Obtener Aerolíneas');
		
		if (_airlines.length == 0)
		{
			var _param = {'CODIGO_AEROPUERTO':me._selectedAirport};		
												         
			//console.log('Obtener Aerolíneas - PETICION: ' + JSON.stringify(_param));
			Proxy.execute('GetCompAereas', 
							_param,
							function(data){
								//console.log('Obtener Aerolíneas - RESPUESTA:' + JSON.stringify(data).substr(0,100));								
								_airlines = data
								okCB();
							},
							function(err){
								//console.log('Obtener Aerolíneas - ERROR:' + JSON.stringify(err));
								okCB();
							},
							ConstF.prioridadSoloNet);
			//console.log('Obtener Aerolíneas finalizada');
		}
		else
		{
			//console.log('Obtener Aerolíneas ya cacheadas.');
			okCB();
		}
	};
		

	// POSIBLEMENTE SOBRE PQ NO HABRA DETALLE_COMP.HTML
	// Función para modificar la aerolínea seleccionada
	// Se fija desde detalle_vuelo y se utiliza en detalle_comp
	me.setAirline = function(airlineId){
		if(_selectedAirline==null || airlineId!=_selectedAirline.AIRLINE_ID){
			_selectedAirline= $.getSingleObjectByPKFromJSONArray(_airlines,'AIRLINE_ID',airlineId);
		}
	};
		
	
	// ------------------------------------------------------------------------------------------------------------------------				   
}

function _GestorPOIs() {
	var me = this;

	// VARIABLES --------------------------------------------------------------------------------------------------------------

	var _parameters = {
		AIRPORT_ID : '',
		TERMINALS_ID : [], //Puede tener varias terminales: [T2,T3,T4] 
		FLOORS_ID : [], //Puede tener varias plantas y puede venir alguna por planta Ej: [20,45,T2_30]
		POIS_ID : [], //Puede tener IDs de POIS determinados para filtrar por estos pois espec�ficos
		TEXT: '' //Texto para filtrar
	};

	var _selectedPoisTypes = [];
	//Se establece con los que se han seleccionado.
	var _selected_pois = [];
	//Esta contiene la lista de Pois reales a mostar. _pois contiene todos los del terminal aeropuerto y planta

	me.SELECTED_AIRPORT_ID = function() {
		return _parameters.AIRPORT_ID;
	};
	
	/**
	 * Devuelve el array de terminales seleccionadas con una excepcion
	 * Si no hay ninguna y solo hay un floor compuesto por Terminal_Planta, se devuelve la terminal de ese string
	 */
	me.SELECTED_TERMINALS_ID = function() {
		if(_parameters.TERMINALS_ID.length>0){
			return _parameters.TERMINALS_ID;
		} else { 
			if(_parameters.FLOORS_ID.length==1 && _parameters.FLOORS_ID[0].indexOf('_')!=-1){
				var floor = _parameters.FLOORS_ID[0];
				return  [floor.substring(0,floor.indexOf('_'))];
			} else {
				return _parameters.TERMINALS_ID;
			}
		}
		
	};
	
	/**
	 * Devuelve el array de floors seleccionados con una excepcion
	 * Si solo hay un floor compuesto por Terminal_Planta, se devuelve el floor de ese string 
	 */
	me.SELECTED_FLOORS_ID = function() {
		//Si solo hay un floor y tiene forma Terminal_planta se devuelve la planta, si no todos
		if(_parameters.FLOORS_ID.length==1 && _parameters.FLOORS_ID[0].indexOf('_')!=-1){
			var floor = _parameters.FLOORS_ID[0];
			return  [floor.substring(floor.indexOf('_')+1)];
		} else {
			return _parameters.FLOORS_ID;
		}
	};
	
	me.POIS_TYPES = function() {
		return ConstF.PoisTypes;
	};
	me.POIS_CATEGORIES = function() {
		return ConstF.PoisCategories;
	};
	me.SELECTED_POIS_TYPES = function() {
		return _selectedPoisTypes;
	};
	me.AIRPORT_POIS = function() {
		return PoiRepository.getLoadedPois(_parameters.AIRPORT_ID);
	};
	me.TEXT = function(){
		return _parameters.TEXT;
	};
	me.setText = function(str){
		_parameters.TEXT = str;
	};
	me.POIS = function() {
		return _selected_pois;
	};

	// ------------------------------------------------------------------------------------------------------------------------

	// FUNCIONES --------------------------------------------------------------------------------------------------------------	// INICIALIZACION ---------------------------------------------------------------------------------------------------------

	/**
	 *Limpia la lista de POIS.
	 */
	me.clearSelectedPoiList = function() {
		_selected_pois.length = 0;
	};
	/**
	 * Setea la lista de identificadores de POIS espec�ficos a filtrar
	 */
	me.setPoiIds = function(arrayWithPoiIds) {
		_parameters.POIS_ID = arrayWithPoiIds;
	};

	/**
	 * Limpia la lista de identificadores de POIS espec�ficos a filtrar
	 */
	me.clearPoiIds = function() {
		_parameters.POIS_ID = [];
	};

	/*
	 * Carga la lista de POIs teniendo en cuenta los diferentes filtros.
	 *  ESTE es el metodo maestro que debemos llamar siempre para refrescar la lista
	 */
	me.fillAirportPoiList = function(okCB) {

		var existsInList = function(list, id, funProjection) {
			var found = false;
			var j;
			for (j=0; j<list.length && !found; j++) {
				
				if (funProjection(list[j]) == id) {
					found = true;
				}
			}
			return found;
		};
		
		var filterPOIsById = function(data) {
			var filteredPois = data;
			var filtered = '';
			if (_parameters.POIS_ID.length!=0) {
				var k;
				filteredPois = [];
				for (k=0; k<data.length; k++) {
					if (existsInList(_parameters.POIS_ID, data[k].idPoi, function(elem){return elem}) 
						 /*  && !existsInList(filteredPois, data[k].idPoi, function(elem){return elem.idPoi})*/) {
						filtered = filtered + data[k].idPoi + ', ';
						filteredPois.push(data[k]);
					}
				}
			}
			//console.log('Filtered = ' + filtered);
			return filteredPois;
		};

		//Para optimizar
		if(_selectedPoisTypes.length==0){
			_selected_pois = [];
			okCB([]); //Vacio
		} else {
			if(_parameters.TERMINALS_ID.length==1 && _parameters.FLOORS_ID.length==1 && _parameters.FLOORS_ID[0].indexOf('_')==-1){
			 	//Si solo hay una terminal y una planta (formato 25,30,40) se optimiza la llamada (T4_1)
				PoiRepository.searchPois(_parameters.AIRPORT_ID, _parameters.TEXT, [], [_parameters.TERMINALS_ID[0]+'_'+_parameters.FLOORS_ID[0]], [], _selectedPoisTypes, function(data) {
					data = filterPOIsById(data);
					_selected_pois = data;
					okCB(data);
				}, function(){
					okCB(null);
				});
			}  else if(_parameters.TERMINALS_ID.length==1 && _parameters.FLOORS_ID.length==1 && _parameters.FLOORS_ID[0].indexOf(_parameters.TERMINALS_ID[0])!=-1){ //Solo un terminal y la planta formato T4_20 coincide con el terminal
				PoiRepository.searchPois(_parameters.AIRPORT_ID, _parameters.TEXT, [], _parameters.FLOORS_ID, [], _selectedPoisTypes, function(data) {
					data = filterPOIsById(data);
					_selected_pois = data;
					okCB(data);
				}, function(){
					okCB(null);
				});
			}else { //Se pasa todo
				PoiRepository.searchPois(_parameters.AIRPORT_ID, _parameters.TEXT, _parameters.TERMINALS_ID, _parameters.FLOORS_ID, [], _selectedPoisTypes, function(data) {
					data = filterPOIsById(data);
					_selected_pois = data;
					okCB(data);
				}, function(){
					okCB(null);
				});
			}
		}
	};

	/*
	 *  Te devuelve los favoritos que se mostrarian
	 */
	me.getFavouritePoisDisplayed = function() {

		var _favourites = GestorFavouritePOIs.favouritePois();
		var result = [];

		//Vamos viendo si el favorito esta en la lista de pois
		for(var i = 0; i < _favourites.length; i++) {
			var fav = _favourites[i];
			for(var j = 0; j < _selected_pois.length; j++) {
				var sel = _selected_pois[j];
				if(fav.idPoi == sel.idPoi) {
					result[result.length] = sel;
					break;
				}
			}
		}
		return result;
	};

	/*
	 * Cambia el aeropuerto y recarga la lista de tipos, categorías y pois en base a este
	 */
	me.setAirport = function(airportId) {
		if(airportId != _parameters.AIRPORT_ID) {//Si no es el que tenemos cacheado.
			me.clearAllFilters();
			_parameters.AIRPORT_ID = airportId;
			me.fillAllTypesSelected();
		}
	};

	/*
	 * Fija una unica terminal y una unica planta como filtro
	 */
	me.setTerminalFloor = function(terminalId, floorId) {
		me.clearAllTerminalFloorFilters();
		me.addTerminalFloor(terminalId,floorId);
	};
	
	/**
	 * Añade toda una terminal como filtro 
	 */
	me.addTerminal = function(terminalId){
		if(_parameters.TERMINALS_ID.length == 0){
			_parameters.TERMINALS_ID.push('null');
		}
		if(_parameters.TERMINALS_ID.indexOf(terminalId)==-1) {
			_parameters.TERMINALS_ID.push(terminalId);
		}
	};
	
	/**
	 * Añade la planta de un terminal como filtro
	 */
	me.addTerminalFloor = function(terminalId,floorId){
		if(_parameters.TERMINALS_ID.length == 0){ //POIs de recinto
			_parameters.TERMINALS_ID.push('null');
		}
		if(_parameters.FLOORS_ID.length == 0){ //POIs de recinto
			_parameters.FLOORS_ID.push('null');
		}
		if(_parameters.FLOORS_ID.indexOf(terminalId+"_"+floorId)==-1){
			_parameters.FLOORS_ID.push(terminalId+"_"+floorId);
		}
		if(_parameters.TERMINALS_ID.length>0 && _parameters.TERMINALS_ID.indexOf(terminalId)==-1){
			_parameters.TERMINALS_ID.push(terminalId); //Añadimos la terminal porque si no, no filtrara por las tuberias
		}
	};
	
	/**
	 * Añade todas las terminales del aeropuerto seleccionado. 
	 */
	me.fillAllTerminalsAndFloorFilters = function() {
		me.clearAllTerminalFloorFilters();		
		var terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
		var floors = GestorAirports.getAirportFloors(GestorPOIs.SELECTED_AIRPORT_ID());
		
		if (terminals != null || terminals.length == 0) {
			return;
		}
		
		for(var i = 0; i < terminals.length; i++) {
			me.addTerminal(terminals[i].TERMINAL_ID);
			
			if (floors == null || floors.length == 0) {
				continue;
			}
			for( var j = 0; j < floors.length; j++) {
				if (floors[j].TERMINAL_ID == terminals[i]) {
					me.addTerminalFloor(terminals[i].TERMINAL_ID, floors[j].FLOOR_ID);
				}
			}			
		}
	};
	
	/**
	 * Añade todas las plantas de la terminal (o terminales) que esten seleccionadas 
	 */
	me.fillFloorsForSelectedTerminalFilter = function() {
		// Clear floors
		me.clearFloorFilters();
		var floors = GestorAirports.getAirportFloors(GestorPOIs.SELECTED_AIRPORT_ID());
		if (_parameters.TERMINALS_ID == null || _parameters.TERMINALS_ID.length == 0 || floors == null || floors.length == 0) {
			return;
		}
		
		for( var i = 0; i < _parameters.TERMINALS_ID.length; i++) {
			var terminal = _parameters.TERMINALS_ID[i];
			for( var j = 0; j < floors.length; j++) {
				if (floors[j].TERMINAL_ID == terminal) {
					me.addTerminalFloor(terminal, floors[j].FLOOR_ID);
				}
			}			
		}
	};

	/**
	 * Quita todos los filtros por terminal y planta 
	 */
	me.clearAllTerminalFloorFilters = function(){
		_parameters.FLOORS_ID.length = 0;
		_parameters.TERMINALS_ID.length = 0;
	};
	
	/**
	 * Quita todos los filtros por terminal y planta 
	 */
	me.clearFloorFilters = function(){
		_parameters.FLOORS_ID.length = 0;
	};
	
	/**
	 * Quita todos los metodos de filtrado 
	 */
	me.clearAllFilters = function(){
		me.clearAllTerminalFloorFilters();
		me.clearTypesSelected();
		_parameters.TEXT = '';
	};

	// -----------------------------------------------------------------------------------------------------------------------

	// GESTION DE MODOS DE SELECCION DE LOS TIPOS Y LAS CATEGORIAS -----------------------------------------------------------

	// Función que elimina todos los tipos seleccionados
	me.clearTypesSelected = function() {
		_selectedPoisTypes.length = 0;
	};

	/**
	 * Funcion que añade todos las categorias como seleccionadas. 
	 */
	me.fillAllCategoriesSelected = function() {
		me.clearTypesSelected();
		var length = ConstF.PoisCategories.length;
		for(var i = 0; i < length; i++) {
			me.fillAllTypesSelectedInCategory(ConstF.PoisCategories[i].POI_CATEGORY_ID);
		}
	};
	
	// Función que marca todos los tipos como seleccionados
	me.fillAllTypesSelected = function() {
		me.clearTypesSelected();
		for(var i = 0; i < ConstF.PoisTypes.length; i++) {
			_selectedPoisTypes.push(ConstF.PoisTypes[i].POI_TYPE_ID);
		}
	};

	// Función que marca como seleccionados todos los tipos de una categoría (categoryId)
	me.fillAllTypesSelectedInCategory = function(idCategory) {
		for(var i = 0; i < ConstF.PoisTypes.length; i++) {
			if(ConstF.PoisTypes[i].POI_CATEGORY_ID == idCategory) {
				me.addSelectedType(ConstF.PoisTypes[i].POI_TYPE_ID);
			}
		}
	};

	// Función que marca como seleccionados todos los tipos de una categoría (categoryId)
	me.fillAllTypesSelectedInCategories = function(categories) {
		for(var j = 0; j < categories.length; j++) {
			var idCategory = categories[j];
			for(var i = 0; i < ConstF.PoisTypes.length; i++) {
				if(ConstF.PoisTypes[i].POI_CATEGORY_ID == idCategory) {
					me.addSelectedType(ConstF.PoisTypes[i].POI_TYPE_ID);
				}
			}
		}
	};

	// Función que marca como NO seleccionados todos los tipos de una categoría (categoryId)
	me.removeAllTypesSelectedInCategory = function(idCategory) {
		for(var i = 0; i < ConstF.PoisTypes.length; i++) {
			if(ConstF.PoisTypes[i].POI_CATEGORY_ID == idCategory) {
				var idType = ConstF.PoisTypes[i].POI_TYPE_ID;
				if(me.hasTypeSelected(idType)) {
					me.removeSelectedType(idType);
				}
			}
		}
	};

	// Función que indica si un determinado tipo (idType) está seleccionado
	me.hasTypeSelected = function(idType) {
		if(_selectedPoisTypes.indexOf(idType) != -1) {
			return true;
		} else {
			return false;
		}
	};

	// Función que indica si una determinada categoría (categoryId) está seleccionada (todos sus tipos seleccionados)
	me.getCategorySelectionMode = function(idCategory) {
		var _params = [{
			'NAME' : 'POI_CATEGORY_ID',
			'VALUE' : idCategory
		}];
		var _typesfromCategoryPOI = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_TYPES(), _params);

		var _numTypes = _typesfromCategoryPOI.length;
		var _numTypesSelected = 0;

		for(var i = 0; i < _numTypes; i++) {
			if(me.hasTypeSelected(_typesfromCategoryPOI[i].POI_TYPE_ID)) {
				_numTypesSelected += 1;
			}
		}
		if(_numTypesSelected == 0) {
			return 'none';
		} else if(_numTypesSelected == _numTypes) {
			return 'complete';
		} else {
			return 'partial';
		}

	};

	// Función que marca como seleccionado un determinado tipo (idType)
	me.addSelectedType = function(idType) {
		if(_selectedPoisTypes.indexOf(idType) == -1) {
			_selectedPoisTypes.push(idType);
			//Filtar la lista de POIS para tener todos los de los selected
			return true;
		} else {
			return false;
		}
	};

	// Función que marca como NO seleccionado un determinado tipo (idType)
	me.removeSelectedType = function(idType) {
		if(_selectedPoisTypes.indexOf(idType) != -1) {
			_selectedPoisTypes.splice(_selectedPoisTypes.indexOf(idType), 1);
			//Filtar la lista de POIS para tener todos los de los selected
			return true;
		} else {
			return false;
		}
	};

	/**
	 *Detecta automaticamente la terminal mas cercana por posicion
	 */
	me.autoDetectFloor = function() {
		var lon = GestorPosition.lastLongitude();
		var lat = GestorPosition.lastLatitude();
		if(lon != null && lat != null) {
			var _airportFloors = GestorAirports.getAirportFloors(_parameters.AIRPORT_ID);
			var _airportTerminals = GestorAirports.getTerminals(_parameters.AIRPORT_ID);
			_params = [{
				'NAME' : 'DEFAULT_AIRPORT_FLOOR',
				'VALUE' : true
			}];
			var defaultFloors = $.getFilteredArrayFromJSONArray(_airportFloors, _params);
			var termMasCercana;
			var floorPorDefecto;
			var distanciaAlMasCercano;
			var distancia;
			//Buscamos su terminal y calculamos la distancia
			for(var i = 0; i < defaultFloors.length; i++) {
				for(var j = 0; j < _airportTerminals.length; j++) {
					if(defaultFloors[i].TERMINAL_ID == _airportTerminals[j].TERMINAL_ID) {
						distancia = GestorPosition.distanciaGeodesica(lat, lon, _airportTerminals[j].LATITUDE, _airportTerminals[j].LONGITUDE);
						if(i == 0 || distancia < distanciaAlMasCercano) {
							distanciaAlMasCercano = distancia;
							termMasCercana = _airportTerminals[j];
							floorPorDefecto = defaultFloors[i];
							break;
						}
					}
				}
			}
			me.setTerminalFloor(floorPorDefecto.TERMINAL_ID, floorPorDefecto.FLOOR_ID);
		}
	};
}

// Gestor de DETALLE DE POI -----------------------------------------------------------------------------------------------------------
function _GestorPOIDetails() {
	var me = this;

	// VARIABLES --------------------------------------------------------------------------------------------------------------

	var _parameters = {
		AIRPORT_ID : '',
		ASSET_ID : '', //Ya no es el assetId, es el poiId, pero esto se ha quedado a lo legacy...
		CATEGORY: '', //Analytics
		TYPE: '', //Analytics
		NAME: '', //Analytics
		LAT : null,
		LON : null,
		TERMINAL : '', //Terminal para fijar el mapa
		FLOOR : '' //Planta para fijar el mapa
	};

	var _poiDetails = [];
	me.POI_DETAILS = function() {
		return _poiDetails;
	};

	// -----------------------------------------------------------------------------------------------------------------------

	// INICIALIZACION ---------------------------------------------------------------------------------------------------------

	// Función de inicialización del gestor de detalles de POIs con el resgistor de las operaciones de WS necesarias
	me.init = function(wsDao) {
		Proxy.addOp('GetPoiDetails', null, wsDao);
	};
	// -----------------------------------------------------------------------------------------------------------------------

	// FUNCIONES -------------------------------------------------------------------------------------------------------------

	// Función de definición de los parámetros del gestor. Se llama antes de pedir el detalle del POI para fijar los valores de
	// la solicitud
	me.setParameters = function(airportId, assetId, category,  type, name, lat, lon, terminal, floor) {
		if(_parameters.AIRPORT_ID != airportId || _parameters.ASSET_ID != assetId) {
			_poiDetails = [];
		}
		_parameters.AIRPORT_ID = airportId;
		_parameters.ASSET_ID = assetId;
		_parameters.CATEGORY = category;
		_parameters.TYPE = type;
		_parameters.NAME = name;
		_parameters.LAT = lat;
		_parameters.LON = lon;
		_parameters.TERMINAL = terminal;
		_parameters.FLOOR = floor;

	};

	me.getParameters = function() {
		return _parameters;
	};
	/**
	 * Devuelve las coordenadas del mapa [lat,lon] o null
	 */
	me.getCoordsMap = function() {
		if(_parameters.LAT != null && _parameters.LON != null) {
			return [_parameters.LAT, _parameters.LON];
		} else {
			return null;
		}
	};
	/**
	 *  Devuelve la capa a pintar [terminal,floor] o null
	 */
	me.getTerminalFloorMap = function() {
		if(_parameters.TERMINAL != '' && _parameters.FLOOR != '') {
			return [_parameters.TERMINAL, _parameters.FLOOR];
		} else {
			return null;
		}
	};
	// Función que solicita el Detalle de un POI a través de WS
	me.getPOIDetail = function(okCB) {
		if(_poiDetails.length == 0) {
			if(_parameters != null && _parameters.AIRPORT_ID != null && _parameters.ASSET_ID != null) {
				//console.log("Recuperación de detalles de POI iniciada");
				var _param = {
					'CODIGO_AEROPUERTO' : _parameters.AIRPORT_ID,
					'IDASSET' : _parameters.ASSET_ID.toString()
				};

				//console.log('Recuperación de detalles de POI - PETICION: ' + JSON.stringify(_param));
				Proxy.execute('GetPoiDetails', _param, function(data) {
					//console.log('Recuperación de detalles de POI - RESPUESTA:' + JSON.stringify(data));
					_poiDetails = data;
					okCB();
				}, function(err) {
					//console.log('Recuperación de detalles de POI - ERROR:' + JSON.stringify(err));
					_poiDetails = [];
					okCB();
				}, ConstF.prioridadSoloNet);
				//console.log('Recuperación de detalles de POI finalizada');
			} else {
				//console.log('Recuperación de detalles de POI - ERROR: No existen datos de consulta.');
				okCB();
			}
		} else {
			//console.log('Recuperación de detalles de POI ya cacheado.');
			okCB();
		}

	};

	me.getPOITitle = function(poi) {
		var _lang = GestorIdiomas.getLang();

		var _value = poi['tituloEsEs'];
		if(_lang == 'en_GB' && $.objectHasContent(poi['tituloEnGb'])) {
			_value = poi['tituloEnGb'];
		}
		return _value;
	};
	
	me.getPOIEventTitle = function(poi) {
		return poi['tituloEsEs'];
	};

	me.getPOIObs = function(poi) {
		var _lang = GestorIdiomas.getLang();

		var _value = poi['observacionesEsEs'];
		if(_lang == 'en_GB' && $.objectHasContent(poi['observacionesEnGb'])) {
			_value = poi['observacionesEnGb'];
		}
		return _value;
	};

	me.getPOIPlanta = function(poi) {

		var _value = GestorAirports.getFloorById(poi['codigoAeropuerto'], poi['areaTerminal'], poi['plantaEdificio']);
		if($.objectHasContent(_value)) {
			var _lang = GestorIdiomas.getLang();
			_value = _value[0]['FLOOR_NAME'][_lang];
		} else {
			_value = GestorIdiomas.getLiteral('perimeterFloor');
		}

		return _value;
	};
	
	me.getPOIPlantaByIds = function(airportId, terminalId, floorId) {

		var _value = GestorAirports.getFloorById(airportId, terminalId, floorId);
		if($.objectHasContent(_value)) {
			var _lang = GestorIdiomas.getLang();
			_value = _value[0]['FLOOR_NAME'][_lang];
		} else {
			_value = GestorIdiomas.getLiteral('perimeterFloor');
		}

		return _value;
	};

	/** Resetea el detalle del POI */
	me.clear = function(){
		_parameters = {
			AIRPORT_ID : '',
			ASSET_ID : '', //Ya no es el assetId, es el poiId, pero esto se ha quedado a lo legacy...
			LAT : null,
			LON : null,
			TERMINAL : '', //Terminal para fijar el mapa
			FLOOR : '' //Planta para fijar el mapa
		};
		_poiDetails = [];
	};
}	   

var notFavouritePOISVisible = true;
// Gestor de POIs FAVORITOS -----------------------------------------------------------------------------------------------------------
function _GestorFavouritePOIs() {
	var me = this;
	var _favouritePois = [];

	me.favouritePois = function() {
		return _favouritePois
	};

	// INICIALIZACION ---------------------------------------------------------------------------------------------------------

	// Función de inicialización del gestor de aeropuertos con el resgistor de las operaciones de BBDD necesarias
	me.init = function(bdDao) {
		bdDao.addQuery('getAllFavouritePOIs', getAllFavouritePOIs_Query);
		Proxy.addOp('getAllFavouritePOIs', bdDao, null);

		bdDao.addQuery('insertFavouritePOI', insertFavouritePOI_Query);
		bdDao.addConstrParam('insertFavouritePOI', insertFavouritePOI_Params);
		Proxy.addOp('insertFavouritePOI', bdDao, null);

		bdDao.addQuery('deleteFavouritePOI', deleteFavouritePOI_Query);
		bdDao.addConstrParam('deleteFavouritePOI', deleteFavouritePOI_Params);
		Proxy.addOp('deleteFavouritePOI', bdDao, null);
		me.getFavouritePOIs(function(){}); //Precarga de favoritos
	}
	// -----------------------------------------------------------------------------------------------------------------------

	// FUNCIONES -------------------------------------------------------------------------------------------------------------

	// Función de recuperación de los POIs favoritos (BBDD)
	me.getFavouritePOIs = function(okCB) {
		//console.log("Lectura de Favourite POIs");
		Proxy.execute('getAllFavouritePOIs', null, function(data) {
			_favouritePois = data;
			okCB(data);
		}, function(err) {
			//console.log("Error al recuperar POIs favoritos: " + JSON.stringify(err));
			_favouritePois = [];
			okCB([]);
		}, ConstF.prioridadSoloBD);
		//console.log("Lectura terminada");
	}
	// Función de inserción de un POI favorito (BBDD)
	me.addFavouritePOI = function(poiId, okCB) {

		var _param = {
			"datosConsulta" : {
				"idPoi" : poiId
			}
		};

		//console.log("Favourite POI a insertar: " + JSON.stringify(_param));
		Proxy.execute('insertFavouritePOI', _param, function(data) {
			_favouritePois[_favouritePois.length] = {
				'idPoi' : poiId
			};
			okCB(data);
		}, function(err) {
			//console.log("Error al insertar POI favorito: " + JSON.stringify(err));
		}, ConstF.prioridadSoloBD);
		//console.log("Inserción terminada");

	}
	// Función de borrado de un POI favorito (BBDD)
	me.removeFavouritePOI = function(poiId, okCB) {

		var _param = {
			"datosConsulta" : {
				"idPoi" : poiId
			}
		};

		//console.log("Favourite POI a quitar: " + JSON.stringify(_param));
		Proxy.execute('deleteFavouritePOI', _param, function(data) {
			for(var i = 0; i < _favouritePois.length; i++) {
				if(_favouritePois[i].idPoi == poiId) {
					_favouritePois.splice(i, 1);
					break;
				}
			}
			okCB(data);
		}, function(err) {
			//console.log("Error al eliminar POI favorito: " + err);
		}, ConstF.prioridadSoloBD);
		//console.log("Borrado terminado");

	}
	// Función de comprobación de si un POI es favorito (BBDD)
	me.isFavouritePOI = function(poiId, okCB) {
		me.getFavouritePOIs(function(data) {
			var filtered = $(data).filter(function() {
				return (this.idPoi == poiId);
			});
			okCB(filtered.length > 0);
		});
	}
	// Función de modificación dle estadod e favorito de un POI (BBDD)
	// Si no lo era pasa a serlo (inserción), si lo era deja de serlo  (borrado)
	me.switchFavouriteState = function(poiId, okCB) {
		//console.log('switchFavouriteState: '+poiId)
		me.isFavouritePOI(poiId, function(data) {
			if(data) {
				//console.log('switchFavouriteState ELIMINAR');
				me.removeFavouritePOI(poiId, okCB);
			} else {
				//console.log('switchFavouriteState INSERTAR');
				me.addFavouritePOI(poiId, okCB);
			}
		})
	}
	// -----------------------------------------------------------------------------------------------------------------------
}

jQuery.initializeScroll  = function (scrollObject, scrollDivID)
{
	if (scrollObject== null)
	{
		setTimeout(function(){
							scrollObject = new iScroll(scrollDivID, 
							{
								snap: true,
								momentum: false,
								hScrollbar: false,
							});
							$($.mobile.activePage).trigger('create');
		},100);
	}
} 

jQuery.initializeScroll = function (scrollObject, scrollDivID, scrollIndicatorID)
{
	if (scrollObject== null)
	{
		setTimeout(function(){
							scrollObject = new iScroll(scrollDivID, 
							{
								snap: true,
								momentum: false,
								hScrollbar: false,
								onScrollEnd: function () {
												document.querySelector('#' + scrollIndicatorID + ' > li.active').className = '';
												document.querySelector('#' + scrollIndicatorID + ' > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
											}
							});
							$($.mobile.activePage).trigger('create');
		},100);
	}
}

// jQuery.initializeSalidasScroll = function (scrollDivID, scrollIndicatorID)
// {
	// if (salidasScroll== null)
	// {
		// setTimeout(function(){
							// salidasScroll = new iScroll(scrollDivID, 
							// {
								// snap: true,
								// momentum: false,
								// hScrollbar: false,
								// onScrollEnd: function () {
												// document.querySelector('#' + scrollIndicatorID + ' > li.active').className = '';
												// document.querySelector('#' + scrollIndicatorID + ' > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
											// }
							// });
							// $($.mobile.activePage).trigger('create');
		// },100);
	// }
// }

// jQuery.initializeLlegadasScroll = function (scrollDivID, scrollIndicatorID)
// {
	// if (llegadasScroll== null)
	// {
		// setTimeout(function(){
							// llegadasScroll = new iScroll(scrollDivID, 
							// {
								// snap: true,
								// momentum: false,
								// hScrollbar: false,
								// onScrollEnd: function () {
												// document.querySelector('#' + scrollIndicatorID + ' > li.active').className = '';
												// document.querySelector('#' + scrollIndicatorID + ' > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
											// }
							// });
							// $($.mobile.activePage).trigger('create');
		// },100);
	// }
// }

// jQuery.initializeNotificationsScroll = function (scrollDivID)
// {
	// if (notificacionesScroll== null)
	// {
		// setTimeout(function(){
							// notificacionesScroll = new iScroll(scrollDivID, 
							// {
								// snap: true,
								// momentum: false,
								// hScrollbar: false
							// });
							// $($.mobile.activePage).trigger('create');
		// },100);
	// }
// }

// var llegadasScroll = null;
// var salidasScroll  = null;
// var notificacionesScroll  = null;

function showPopup(message){
	var id= new Date().getTime();
    var _dialog = createDialog(id);
    var _dialogPanel = $('<div class="alpha_frente">' + 
		    			'<div class="textSection" >' + 
		    					message +  
		    			'</div>' + 
		    			'<div class="buttonSection" align="center"><table><tr><td><a href="" data-role="button" onclick="hideDialog('+id+')" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('acceptText') +'</a></td></tr></table></div>' + 
		    		'</div>')
    .appendTo($(_dialog))
    .trigger('create');


   	centerDialogPanel(_dialogPanel);
    return false;
}

function showNextTravelDialog(_nextFlight, resultFunctionNoParams){
	// Añade la función resultado a una variable interna
	var id= new Date().getTime();
	this._resultFunctionNoParams = resultFunctionNoParams;
	
	var msg = GestorIdiomas.getLiteral('nextTravelNear');
	var flightString;
	if($.objectHasContent(_nextFlight.codCiaNumVueloSalidaSipad)){
		flightString = _nextFlight.codCiaNumVueloSalidaSipad;
	} else{
		flightString = _nextFlight.codCia + _nextFlight.numVuelo;
	}

	msg = msg.replace(/%/, flightString);
	
    var _dialog = createDialog(id);
    var _dialogPanel = $('<div class="alpha_frente">' + 
		    			'<div class="textSection" >' + 
		    					msg + 
		    			'</div>' + 
		    			'<div class="buttonSection" align="center"><table><tr>' +
		    				'<td><a href="" data-role="button" onclick="hideDialog('+id+');if(_resultFunctionNoParams != null){_resultFunctionNoParams();}" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('constYes') + '</a></td>' +
		    				'<td><a href="" data-role="button" onclick="hideDialog('+id+');" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('constNo') + '</a></td>' +
		    			'</tr></table></div>' + 
		    		'</div>')
    .appendTo($(_dialog))
    .trigger('create');
   
   	centerDialogPanel(_dialogPanel);
    return false;
}

function showModalPopup(message, callback) {
	var id= new Date().getTime();
	this._resultFunctionNoParams = callback;
    var _dialog = createDialog(id);
    
    var _dialogPanel = $('<div class="alpha_frente">' + 
		    			'<div class="textSection" >' + 
		    					message +  
		    			'</div>' + 
		    			'<div class="buttonSection" align="center">' + 
		    				'<table>' + 
		    					'<tr>' + 
		    						'<td>' +
		    							'<a href="#" data-role="button" onclick="hideDialog('+id+');if(_resultFunctionNoParams != null){_resultFunctionNoParams();}" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('acceptText') +'</a>' + 
		    						'</td>' + 
		    					'</tr>' + 
		    				'</table>' + 
		    			'</div>' + 
		    		'</div>')
    .appendTo($(_dialog))
    .trigger('create');
   
   	centerDialogPanel(_dialogPanel);
    return false;
}

function showConfirm(message, resultFunctionNoParams){
	// Añade la función resultado a una variable interna
	var id= new Date().getTime();
	this._resultFunctionNoParams = resultFunctionNoParams;

    var _dialog = createDialog(id);
    var _dialogPanel = $('<div class="alpha_frente">' + 
		    			'<div class="textSection" >' + 
		    					message + 
		    			'</div>' + 
		    			'<div class="buttonSection" align="center"><table><tr>' +
		    				'<td><a href="" data-role="button" onclick="hideDialog('+id+');if(_resultFunctionNoParams != null){_resultFunctionNoParams();}" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('acceptText') + '</a></td>' +
		    				'<td><a href="" data-role="button" onclick="hideDialog('+id+');" data-theme="buttonOscuro" >' + GestorIdiomas.getLiteral('cancelText') + '</a></td>' +
		    			'</tr></table></div>' + 
		    		'</div>')
    .appendTo($(_dialog))
    .trigger('create');
   
   	centerDialogPanel(_dialogPanel);
    return false;
}

function createDialog(id){
	
	//RP - 1.2.1 FIX - Se calcula el height para evitar problemas de teclado
	var mobileHeight =null;
	if(initialWindowHeight==null){
		mobileHeight = $(window).height();
	}else{
		mobileHeight = initialWindowHeight;
	}
		
	var _dialog = $('<div id="divMensaje_'+id+'" data-theme="a" class="cuadroCentrado">' + 
		    			'<div class="alpha_fondo">&nbsp;</div>' + 
		    		'</div>')
    .css({ "width":$(window).width(), "height":mobileHeight})
    .appendTo($("body"));
       
    return _dialog;
}

function centerDialogPanel(dialogPanel){
	var _offsetWidth = $(dialogPanel).width()/2;
   	var _offsetHeight = $(dialogPanel).height()/2 - $(window).scrollTop();
   	$(dialogPanel).css('margin-top', - _offsetHeight + 'px');
   	$(dialogPanel).css('margin-left', - _offsetWidth + 'px');
}

function hideDialog(id){
	
	var _divMsg = $("#divMensaje_" + id);
	$(_divMsg).css({"display":"none"}).remove();	
}


var _resultFunctionNoParams;

/** Pronostico meteorologico */
function _ForecastUtil() {
    
    var me = this;
    
    /**
     * Obtiene el METAR de un aeropuerto y lo procesa
     */
    me.getForecast = function(icao, okCB, errorCB) {
		//console.log("Solicitada petición para " + icao);
		
      	$.ajax({
			url : Constantes.url_metar+icao,
			dataType: "xml",
			cache:true,
			success : function(data){
				//console.log('Petición procesada con éxito.');
						var forecastResult = new _ForecastResult();
						/* Información de las condiciones actuales ---------------------------- */				
						var metar = $(data).find('METAR');
						forecastResult.setObsOaci($(metar).find('station_id').text());
						forecastResult.setObsTime($(metar).find('observation_time').text());
						forecastResult.setTemp($(metar).find('temp_c').text());
						forecastResult.setVisHoriz($(metar).find('visibility_statute_mi').text());
						forecastResult.setWxString($(metar).find('wx_string').text());
						var skyCond = $(metar).find('sky_condition');
						
						//Nos quedamos con la peor condicion de techo de nubes
						var cobertura;
						var techoNub;
						var code;
						if(skyCond!=null){
							for(var i=0;i<skyCond.length;i++){
								if(cobertura==null){ //Fijamos la primera que llega
									cobertura = $(skyCond[i]).attr('sky_cover');
									if(cobertura=='CAVOK'){ //CAVOK no lleva techo de nubes
										break;
									} else if(cobertura == 'OVC'){ //Es la mayor que puede haber
										techoNub = $(skyCond[i]).attr('cloud_base_ft_agl');
										break;
									} else {
										code = me.getCode(cobertura);
									}
									
								} else { //Comparamos con la actual, en orden decreciente OVC, BKN, SCT, FEW
									var tmpCobertura;
									tmpCobertura = $(skyCond[i]).attr('sky_cover');
									var tmpCode = me.getCode(tmpCobertura);
									if(tmpCode < code){
										code = tmpCode;
										cobertura = tmpCobertura;
										techoNub = $(skyCond[i]).attr('cloud_base_ft_agl');
										if(cobertura=='OVC'){
											break;
										}
									}
								}
							}
						}
						forecastResult.setCobCielo(cobertura);
						forecastResult.setTechNubes(techoNub);
						//console.log('Lanzar OKCB.');
						okCB(forecastResult);
				},
			error: function (err){
				//console.log('Weather:Error en la petición.');
				//console.log('WeatherError:'+JSON.stringify(err));
				errorCB(err);
				}
			});
    }
    
    /**
     * Parametriza en codigos para que sea mas sencillo ordenar por prioridad OVC,BKN,SCT,FEW
     */
    me.getCode = function(densidadNubes){
    	var res;
    	switch(densidadNubes){
    		case 'OVC' : res = Constantes.OVC_code;
    					break;
    		case 'BKN' : res = Constantes.BKN_code;
    					break;
    		case 'SCT' : res = Constantes.SCT_code;
    					break;
    		case 'FEW' : res = Constantes.FEW_code;
    					break;
    	}
    	return res;
    }
}

/**
 * Objeto resultante de la llamada al METAR
 */
function _ForecastResult()
{
	var me = this;
	
	/**
	 * Fecha de la observacion
	 */
	var obsTime;
	
	me.getObsTime=function(){return obsTime}
	
	me.setObsTime = function (obs){
		obsTime = obs;
	}
	
	/**
	 * Estacion observada
	 */
	var obsOaci;
	
	me.getObsOaci=function(){return obsOaci}
	
	me.setObsOaci = function (oaci){
		obsOaci = oaci;
	}
	
	/**
	 * Temperatura
	 */
	var temp;
	
	me.getTemp=function(){return temp}
	
	me.setTemp = function (t){
		temp = t;
	}
	
	/**
	 * Visibilidad horizontal
	 */
	var visHoriz;
	
	me.getVisHoriz=function(){return visHoriz}
	
	me.setVisHoriz = function (v){
		visHoriz = v;
	}
	
	/**
	 * Cobertura de cielo (SCT,FEW....) (De la peor OVC,BKN,SCT,FEW)
	 */
	var cobCielo;
	
	me.getCobCielo=function(){return cobCielo}
	
	me.setCobCielo = function (cob){
		cobCielo = cob;
	}
	
	/**
	 * Alt. techo de nubes (En ft) (De la peor)
	 */
	var techNubes;
	
	me.getTechNubes=function(){return techNubes}
	
	me.setTechNubes = function (nub){
		techNubes = nub;
	}
	
	/**
	 * String chachi de las condiciones del cielo (RA,SHRA, -SHRA, BC)
	 */
	var wxString;
	
	me.getWxString=function(){return wxString}
	
	me.setWxString = function (wx){
		wxString = wx;
	}
	
	/**
	 * El iata del aeropuerto (No se obtiene del servicio)
	 */
	var iata;
	
	me.getIata = function(){return iata}
	
	me.setIata = function(ia){
		iata = ia;
	}
	
	/**
	 * En base a los parametros del objeto devuelve la clase a mostrar
	 */
	me.getIcon = function(){
		//CAVOK
		var res;
		if(cobCielo=='CAVOK'){
			if(parseInt(me.getTemp())>25){
				res = 'sol_calor';
			} else {
				res = 'sol';
			}
		} else if(cobCielo=='OVC'){
			if(wxString.search(/TS/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'tormenta1';
				} else if(wxString.indexOf('-')!=-1){
					res = 'tormenta';
				} else {
					res = 'tormenta1';
				}
			} else if(wxString.search(/SN/)!=-1 || wxString.search(/SG/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'nieve2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'nieve';
				} else {
					res = 'nieve1';
				}
			}else if(wxString.search(/GR/)!=-1 || wxString.search(/GS/)!=-1){
				res='granizo';
			}else if(wxString.search(/RA/)!=-1 || wxString.search(/DZ/)!=-1 || wxString.search(/SH/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'lluvia2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'lluvia0';
				} else {
					res = 'lluvia1';
				}
			}else if(wxString.search(/BR/)!=-1 || wxString.search(/FG/)!=-1 || wxString.search(/FU/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'niebla2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'niebla';
				} else {
					res = 'niebla1';
				}
			} else { //Vacio o raro
				res = 'nublado2';
			}
			
		} else if(cobCielo=='BKN') {
			if(wxString.search(/TS/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'tormenta1';
				} else if(wxString.indexOf('-')!=-1){
					res = 'tormenta';
				} else {
					res = 'tormenta1';
				}
			} else if(wxString.search(/SN/)!=-1 || wxString.search(/SG/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'nieve2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'nieve';
				} else {
					res = 'nieve1';
				}
			}else if(wxString.search(/GR/)!=-1 || wxString.search(/GS/)!=-1){
				res='granizo';
			}else if(wxString.search(/RA/)!=-1 || wxString.search(/DZ/)!=-1 || wxString.search(/SH/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'lluvia2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'lluvia0';
				} else {
					res = 'lluvia1';
				}
			}else if(wxString.search(/BR/)!=-1 || wxString.search(/FG/)!=-1 || wxString.search(/FU/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'niebla2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'niebla';
				} else {
					res = 'niebla1';
				}
			}else { //Vacio o raro
				res = 'nublado1';
			}
			
		} else if(cobCielo=='SCT'){
			if(wxString.search(/TS/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'tormenta1';
				} else if(wxString.indexOf('-')!=-1){
					res = 'tormenta';
				} else {
					res = 'tormenta';
				}
			} else if(wxString.search(/SN/)!=-1 || wxString.search(/SG/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'nieve2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'nieve';
				} else {
					res = 'nieve';
				}
			}else if(wxString.search(/GR/)!=-1 || wxString.search(/GS/)!=-1){
				res='granizo';
			}else if(wxString.search(/RA/)!=-1 || wxString.search(/DZ/)!=-1 || wxString.search(/SH/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'lluvia2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'lluvia';
				} else {
					res = 'lluvia0';
				}
			}
			else if(wxString.search(/BR/)!=-1 || wxString.search(/FG/)!=-1 || wxString.search(/FU/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'niebla2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'niebla';
				} else {
					res = 'niebla';
				}
			}else { //Vacio o raro
				res = 'nublado1';
			}
			
		} else if(cobCielo=='FEW'){
			if(wxString.search(/TS/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'tormenta1';
				} else if(wxString.indexOf('-')!=-1){
					res = 'tormenta';
				} else {
					res = 'tormenta';
				}
			} else if(wxString.search(/SN/)!=-1 || wxString.search(/SG/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'nieve2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'nieve';
				} else {
					res = 'nieve';
				}
			}else if(wxString.search(/GR/)!=-1 || wxString.search(/GS/)!=-1){
				res='granizo';
			}else if(wxString.search(/RA/)!=-1 || wxString.search(/DZ/)!=-1 || wxString.search(/SH/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'lluvia2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'lluvia';
				} else {
					res = 'lluvia0';
				}
			}else if(wxString.search(/BR/)!=-1 || wxString.search(/FG/)!=-1 || wxString.search(/FU/)!=-1){
				if(wxString.indexOf('+')!=-1){
					res = 'niebla2';
				} else if(wxString.indexOf('-')!=-1){
					res = 'niebla';
				} else {
					res = 'niebla';
				}
			}else { //Vacio o raro
				res = 'nublado';
			}
		} else { //NSC o SKC (No es CAVOK pero tampoco hay nubes ni CB)
			if(parseInt(me.getTemp())>25){
				res = 'sol_calor';
			} else {
				res = 'sol';
			}
		}
		return res;
	}
	
}

/* -------------------------------------------------------------------------------- */


function _WeatherBar(){
	
	var me = this;
	
	 me.addWeatherBar = function(weatherBarOptions, okCB, errorCB) {
	 	var forecastUtil = new _ForecastUtil();
 	
	 	var theme = $('#'+weatherBarOptions.getDivID()).attr('data-theme');
	 	// Existe el aeropuerto
	 	if (weatherBarOptions.getOaci() != null)
	 	{
	 		forecastUtil.getForecast(weatherBarOptions.getOaci(),
	 			function (data){
	 				data.setIata(weatherBarOptions.getIata());
	 				$('#'+weatherBarOptions.getDivID()).html(me.getWeatherBarHtml(data, theme));
					okCB();
	 			},
	 			function(err){
					errorCB(err);
				}
			);
	 	}
	 }
	 
	 me.getWeatherBarHtml = function(forecastResult, theme) {
	 	
	 	var _temp ="-";
	 	if($.objectHasContent(forecastResult.getTemp())){_temp = parseInt(forecastResult.getTemp()).toString() + '&deg; C';}
	 	
	 	var src = "../../themes/default/common/img/weatherIcons/";
	 	switch(forecastResult.getIcon()){
	 		case "granizo":
	 			src += "ico_granizo.png"
	 			break;
	 		case "lluvia0":
	 			src += "ico_lluvia0.png";
	 			break;
	 		case "lluvia1":
	 			src += "ico_lluvia1.png";
	 			break;
	 		case "lluvia2":
	 			src += "ico_lluvia2.png";
	 			break;
	 		case "lluvia":
	 			src += "ico_lluvia.png";
	 			break;
	 		case "niebla":
	 			src += "ico_niebla.png";
	 			break;
	 		case "niebla1":
	 			src += "ico_niebla1.png";
	 			break;
	 		case "niebla2":
	 			src += "ico_niebla2.png";
	 			break;
	 		case "nieve":
	 			src += "ico_nieve.png";
	 			break;
	 		case "nieve1":
	 			src += "ico_nieve1.png";
	 			break;
	 		case "nieve2":
	 			src += "ico_nieve2.png";
	 			break;
	 		case "nublado":
	 			src += "ico_nublado.png";
	 			break;
	 		case "nublado1":
	 			src += "ico_nublado1.png";
	 			break;
	 		case "nublado2":
	 			src += "ico_nublado2.png";
	 			break;
	 		case "sol":
	 			src += "ico_sol.png";
	 			break;
	 		case "sol_calor":
	 			src += "ico_sol_calor.png";
	 			break;
	 		case "tormenta":
	 			src += "ico_tormenta.png";
	 			break;
	 		case "tormenta1":
	 			src += "ico_tormenta1.png";
	 			break;
	 	}
	 	
	 	var _ret = '<img class="weatherTableCond" src="'+src+'"/>' +
					'<span class="weatherTableTemp-' + theme + '">' +  _temp +'</span>';
				
		return _ret;
	 }
	
}

function _WeatherBarOptions(){
	var me = this;
	var iata;
	me.getIata = function(){return iata}
	me.setIata = function(ia){
		iata = ia;
	}
	
	var oaci;
	me.getOaci = function(){return oaci}
	me.setOaci = function(oac){
		oaci = oac;
	}
	
	var divID;
	me.getDivID = function(){return divID}
	me.setDivID = function(id){
		divID = id;
	}
}


var touchY = 0;
var oldMatrix; //antigua transformacion
var elemWrapper; //wrapper modificado

/**
 * Ata los eventos
 */
function createKeyboardHandler() {
	/*if(Utils.isAndroid()){ //&& Utils.getVersion().match(/4./)) {//Gestion de los inputs en Android que funciona mal
		//console.log('Android 4 detectado');
		//document.addEventListener("showkeyboard", showKeyboardHandler, false);
		document.addEventListener("hidekeyboard", hideKeyboardHandler, false);
		$(document).on('touchstart','input', function(e) {
			touchY = e.originalEvent.touches[0].pageY;
		});
		$(document).on('click', 'input', clickHandler);
	}*/
}

/**
 * Hace la transformacion para mostrar el evento
 */
function clickHandler() {
	PageScroll.activateLock();
	var inputInvoker = $(this);
	setTimeout(function() {//Esperamos un poco al touchstart
		//Colocamos el cursor al final:
		var val = $(inputInvoker).val();
		$(inputInvoker).val("").val(val);
		//Si esta dentro del 45% inferior lo subimos (moviles pequeños)
		var lastY = touchY;
		var screenSize = $(window).height();
		if(lastY > screenSize * 0.55) {
			//alert('resizar');
			var wrapper = $('div.ScrollWrapper');
			var matrix = $(wrapper).css('-webkit-transform');
			oldMatrix = matrix;
			elemWrapper = wrapper;
			//Formato: matrix(1, 0, 0, 1, 0, -4) (Donde -4px es el scroll que se aplica)
			matrix = matrix.substr(7, matrix.length - 8).split(', ');
			//Modificamos el ultimo parametro
			matrix[matrix.length - 1] = matrix[matrix.length - 1] - 100;
			//Construimos de nuevo el matrix
			var finalMatrix = 'matrix(';
			for(var i = 0; i < matrix.length; i++) {
				finalMatrix = finalMatrix + matrix[i] + ', ';
			}
			//Quitamos el ultimo ', ' y ponemos )
			finalMatrix = finalMatrix.substr(0, finalMatrix.length - 2) + ')';
			//alert(finalMatrix);
			$(wrapper).css('webkit-transform', finalMatrix);
			//console.log('Modificada transformacion');
		}
	}, 200);
}

/**
 * Deshace la transformacion para el evento
 */
function hideKeyboardHandler() {
	PageScroll.releaseLock();
	if(oldMatrix!= null && elemWrapper!=null){
		$(elemWrapper).css('webkit-transform',oldMatrix);
		elemWrapper = null;
		oldMatrix = null;
		//console.log('Revertida la transformacion');
	}
}


jQuery(function($){

	tabs = function(options,param) {
		var defaults = {  
			selector: '.tabs',
			selectedClass: 'selected'
		};  
		
		if(typeof options == 'string') defaults.selector = options;
		var options = $.extend(defaults, options); 

		return $(options.selector).each(function(){

			var obj = this;	
			var targets = Array();
	
			function show(i){
				$.each(targets,function(index,value){
					$(value).hide();
				})
				$(targets[i]).fadeIn('fast');
				$(obj).children().removeClass(options.selectedClass);
				selected = $(obj).children().get(i);
				$(selected).addClass(options.selectedClass);
			};
	
			$('a',this).each(function(i){

				targets.push($(this).attr('href'));
				$(this).click(function(e){
					e.preventDefault();
					show(i);
				});
			});
			if(param!=null){
				show(param);
			}else {
				show(0);
			}
	
		});			
	}
	// initialize the function
	// as a parameter we are sending a selector. For this particular script we must select the unordered (or ordered) list item element 
	

});

function setProportionalWidthForTabs(pageId, controls, correctionFactor)
{
	var _numberOfControls = controls.length;
	var _pageWidth = parseInt($('#'+pageId).css('width'))-correctionFactor;
	var _tabWidth = (_pageWidth / _numberOfControls) >> 0;
	var _lastTabWidth = _pageWidth - ((_numberOfControls-1)*_tabWidth);
	for(var _i = 0;_i<controls.length-1; _i++)
	{
		$(controls[_i]).css('width',_tabWidth+'px')
	}
	$(controls[_numberOfControls-1]).css('width',_lastTabWidth+'px');
}


var PageScroll = null;
var LastContentScroll = null;

// "PUBLIC" ASPA SCROLL FUNCTIONS ---------------------------------------------------------------------------

/**
 * Coge la pagina actual, calcula el tamaño que tiene que ocupar el content
 * se lo aplica y le pone un scroll 
 * Se pasa por parámetro el id de la pagina
 */
function autoScrollPageContentRole(pageId){
	//console.log('AutoScrollPageContentRole desde '+pageId);
	if (document.getElementById(pageId)!=null)
	{
		//RP - 1.2.1 FIX - Se calcula el height para evitar problemas de teclado
		var mobileHeight =null;
		if(initialWindowHeight==null){
			mobileHeight = $(window).height();
		}else{
			mobileHeight = initialWindowHeight;
		}
		//RP - 1.2.1 FIX - FIN
		//console.log('mobileHeight: '+ mobileHeight);
		
		var header = $('#'+pageId+' div[data-role="header"]');
		//console.log('header: '+ header.height());
		var footer = $('#'+pageId+' div[data-role="footer"]');
		//console.log('footer: '+ footer.height());
		var content = $('#'+pageId+' div[data-role="content"]');
		//console.log('content: '+ content.height());
		
		/* Fijamos al maximo el content*/
		var contentSize = mobileHeight-header.height()-footer.height();
		
		// ----------------------------------------------------------------------------------
		// Workaround to resolve rendering problems when using useTransform=false in iscroll
		// Needed for bug: No tap in mobiscrolls or inputs after scrolling  
		// Potential user-agent filter (bug only detected in Android 2.3)
		$(content).css('position','relative');
		$(content).children().first().css('width','100%');
		// ----------------------------------------------------------------------------------
		
		setContentControlHeight(content,contentSize);
		
		if(pageId=='lista_vuelos'){
			createScroll(content, true, false, true);
		} else { 
	 		createScroll(content, true, false, false);
	 	}
	 	//$($.mobile.activePage).trigger('create');
	}
	else
	{
		//console.log('NULACO: ' + pageId);
	}
}

/**
 * Aplica autoscroll a un determinado control contenido restándole a la altura de la ventana la de los controlse
 * pasados por parámetro. 
 */
function autoScrollDefiningContentWithSize(contentControl, size, useTransform, addScrollPagingEvents){
	//console.log('AutoScrollDefiningContent desde '+contentControl);
	if (document.getElementById(contentControl)!=null)
	{
		var content = $('#'+contentControl);	
			
		/* Fijamos al maximo el content*/
		setContentControlHeight(content,size);
									
	 	createScroll(content,false, useTransform === true, addScrollPagingEvents === true);	 	
	 						
	 	$($.mobile.activePage).trigger('create');
	}
	else
	{
		//console.log('NULACO: ' + pageId);
	}
}

// ---------------------------------------------------------------------------------------------




// ASPA SCROLL FUNCTIONS -----------------------------------------------------------------------

function setContentControlHeight(content, contentSize)
{
	/* Fijamos al maximo el content*/
	content.height(contentSize);
	content.css('max-height',contentSize);
	content.css('height',contentSize);
	content.css('min-height',contentSize);
	$($.mobile.activePage).trigger('create');
	//console.log('Content fijado automaticamente a:' + contentSize);
}

var pullUpEl;
var pullUpOffset;

function createScroll(content, toMainScroll, useTransform, addScrollPagingEvents) {
	
	// Default scroll options
	var scrollOptions = {hScrollbar: false, 
						hideScrollbar: true};
								
	// Adding extra options depending on parameters-----
	scrollOptions.useTransform = useTransform === true;	
	//-------------------------------------------------
	
	// Default scroll events
	var scrollEvents = { onBeforeScrollStart: defaultOnBeforeScrollStart }
	
	// Adding extra event depending on parameters-----
	if (addScrollPagingEvents === true){
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
		scrollEvents.onRefresh = function(){
			//console.log('Refresh');
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = GestorIdiomas.getLiteral('pullUpLoadMore');
			}
		};
		scrollEvents.onScrollMove = function(){
			//console.log('move');
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = GestorIdiomas.getLiteral('pullUpRefresh');
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = GestorIdiomas.getLiteral('pullUpLoadMore');
				this.maxScrollY = pullUpOffset;
			}
		};
		scrollEvents.onScrollEnd = function(){
			//console.log('end');
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = GestorIdiomas.getLiteral('pullUpLoading');				
				PaintNextPage();	// Execute custom function (ajax call?)
			}
		}
	}
	//-------------------------------------------------

	if(toMainScroll){
		PageScroll = createOrResetScroll(PageScroll,$(content).get(0), scrollOptions, scrollEvents)
	}
	else{
		LastContentScroll = createOrResetScroll(LastContentScroll,$(content).get(0), scrollOptions, scrollEvents)
	}
}

function createOrResetScroll(scrollVar, scrollWrapper, scrollOptions, scrollEvents){
	if (scrollVar != null){
		// TODO use scrollVar.refresh(); when neeeded
		scrollVar.destroy(); 
		scrollVar = null;
	}
	
	return createScrollWitOptions(scrollWrapper, scrollOptions, scrollEvents)
}

// ---------------------------------------------------------------------------------------------





// SCROLL CORE FUNCTIONS -----------------------------------------------------------------------------

function createScrollWitOptions(wrapperDOMobject ,basicProperties, events){
	var options = basicProperties
	if (events.onBeforeScrollStart) options.onBeforeScrollStart = events.onBeforeScrollStart;
	if (events.onBeforeScrollStart) options.onRefresh = events.onRefresh;
	if (events.onBeforeScrollStart) options.onScrollMove = events.onScrollMove;
	if (events.onBeforeScrollStart) options.onScrollEnd = events.onScrollEnd; 
	
	return new iScroll(wrapperDOMobject, options);
}

function defaultOnBeforeScrollStart (e) {
	var target = e.target;
	while (target.nodeType != 1) {
		target = target.parentNode;
	}
	if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
		e.preventDefault();
	}
} 

// ---------------------------------------------------------------------------------------------



//Posicion actual
var _menuswipe_curr=0;

//Num de elementos a mostrar
// cambiar tb en la linea 213 y en la linea 19
var _menuswipe_elem=6;

//Numero de elementos a del div 
var _menuswipe_tam=0;

var _menuswipe_sem = 0;

var posiciones =[]; //Array que va a almacenar la posicion que tienen que ocupar

//Crea el html
function _menuswipe_create(id){
	//Reset
	_menuswipe_curr=0;
	_menuswipe_elem=6; // Elementos por pagina
	_menuswipe_tam=0;
	_menuswipe_mutex = false;
	var posiciones =[];
	
	$('#'+id).addClass('menuswipe');
	var tam_disponible = $(window).width()-44; //MODO VENTANA COMPLETA
	//var tam_disponible = $(window).width()- 44 - $(window).width()*0.20; //44 de las flechas  y ocupa el %css //MODO BOTON FILTRO
	var tam_elem = _menuswipe_elem * 36;
	var totalMargin = (tam_disponible - tam_elem)/_menuswipe_elem;
	var eachSideMargin = totalMargin / 2;
	
	//Ponemos clases a los elementos
	$('#'+id+' a').each(function(index){
			if(index<_menuswipe_elem){
				//var pos = (index+1) * 20;
				var pos = 22+eachSideMargin+(totalMargin+36)*index;
				
				$(this).css('left',pos+'px');
				$(this).addClass('menuswipe_item_show');	
				
			} else {
				$(this).addClass('menuswipe_item');
			}	
			
			// Definir la imagen a la que se inicializa
			var imageSrc = "";
			if($(this).attr("selectionMode")=="complete"){
				imageSrc = $(this).attr("chkImageSrc");
			}
			else if($(this).attr("selectionMode")=="none"){
				imageSrc = $(this).attr("unchkImageSrc");
			}
			else if($(this).attr("selectionMode")=="partial"){
				imageSrc = $(this).attr("partchkImageSrc");
			}
			 
			$(this).children('img').each(function(){
					$(this).attr('src',imageSrc);
			});
			
			//Calculamos los elementos que hay y le metemos el estilo y el evento de click para cambiar de estado
			_menuswipe_tam++;
	});	

	//Calculamos el multiplo mas cercano de _menuswipe_elem con el tam
	while((_menuswipe_tam % _menuswipe_elem)!=0){
		_menuswipe_tam++;
	}

	//Insertamos los controles
	var html = $('#'+id).html();
	html = '<a class="menuswipe_left" href="#"><img src="' + $.mobile.path.get() + '../../themes/default/common/menuswipe/flecha_izda.png"/></a>' + html;
	html = html + '<a class="menuswipe_right" href="#"><img src="' + $.mobile.path.get() + '../../themes/default/common/menuswipe/flecha_dcha.png"/></a>';
	$('#'+id).html(html);	

	//Eventos
	$('#'+id+' .menuswipe_left').off('click').on('click',function(){_menuswipe_left(id);});
	$('#'+id+' .menuswipe_right').off('click').on('click',function(){_menuswipe_right(id);});
	$('#'+id).off('swipeleft').on('swipeleft',function(event){
		_menuswipe_left(id);
     	});
	$('#'+id).off('swiperight').on('swiperight',function(event){
		_menuswipe_right(id);
     	});
   /* $('#'+id+' .menuswipe_item_show').off('click').on('click',
    					function(){
							_menuswipe_click(this);
						});
	$('#'+id+' .menuswipe_item').off('click').on('click',
    					function(){
							_menuswipe_click(this);
						});		*/	
}

//Evento para hacer automatico el cambio de estado y que sea transparente al usuario
function _menuswipe_click(item){
	//console.log('click');
	if($(item).attr("selectionMode")=="none" || $(item).attr("selectionMode")=="partial"){
		$(item).attr("selectionMode","complete");
		var imageSrc = $(item).attr("chkImageSrc");
		$(item).children('img').each(function(){
					// var ruta = $(this).attr('src');
					// ruta = ruta.substring(0,ruta.length-8); //Quitamos la extension y el _act o _des
					// ruta = ruta + Constantes.ico_activo;
					//console.log('ruta: '+imageSrc);
					$(this).attr('src',imageSrc);
				});	
		//console.log('Activado');
	} else if($(item).attr("selectionMode")=="complete"){
		$(item).attr("selectionMode","none");
		var imageSrc = $(item).attr("unchkImageSrc");
		$(item).children('img').each(function(){
					// var ruta = $(this).attr('src');
					// ruta = ruta.substring(0,ruta.length-8); //Quitamos la extension y el _act o _des
					// ruta = ruta + Constantes.ico_inactivo;
					//console.log('ruta: '+imageSrc);
					$(this).attr('src',imageSrc);
				});	
		//console.log('Desactivado');
	}
}

function _menuswipe_left(id){
	if(_menuswipe_sem>0){
		return;
	}
	
	//Calculamos el indice del primer elemento del array
	_menuswipe_curr = (_menuswipe_curr + _menuswipe_elem) % _menuswipe_tam;	
	_menuswipe_change(id,'left');
}

function _menuswipe_right(id){
	if(_menuswipe_sem>0){
		return;
	}
	
	//Calculamos el indice del primer elemento del array
	_menuswipe_curr = (_menuswipe_curr - _menuswipe_elem) % _menuswipe_tam;	
	if(_menuswipe_curr<0){
		_menuswipe_curr = _menuswipe_tam - _menuswipe_elem;
	}
	_menuswipe_change(id,'right');
}

function _menuswipe_change(id,dir){
	//console.log(dir);
	var finalDir; //La dir final donde acaban
	var width = $(window).width()*0.80; //% width css
	//console.log('Window width '+width);
	if(dir=='right'){
		finalDir = '+='+width+'px';
	} else if(dir=='left'){
		finalDir = '-='+width+'px';
	}
	var mostrados = $('#'+id+' .menuswipe_item_show');
	var todos = $('#'+id+' a:not(.menuswipe_left):not(.menuswipe_right)'); //Todos los items menos las flechas(para mantener la posicion en el documento)
		
	//Guardamos la posicion actual
	$(mostrados).each(function(index){
		//Vamos metiendo nuestras posiciones si no las tenemos
		if(posiciones[index]==null){
			posiciones[index] = $(this).position().left;
			//console.log('pos-'+index+':'+posiciones[index]);
		}
		_menuswipe_sem++;
	});
		
	//Transicion para los que no se estan mostrando
	$(todos).each(function(index){
		if($(this).hasClass('menuswipe_item')){
			var lim_inf = _menuswipe_curr;
			var lim_sup = _menuswipe_curr + _menuswipe_elem;
			//console.log('lim inf '+lim_inf);
			//console.log('lim sup '+lim_sup);
			if((lim_inf <= index) && (index < lim_sup)){ //Es a los que afecta y se tienen que mostrar
				//console.log('indexxx '+index);
				$(this).removeClass('menuswipe_item').addClass('menuswipe_item_show'); //Los mostramos
				var actualPos = posiciones[index-lim_inf];
				var pos;
				if(dir=='left'){ //Las posicionamos en +width y las movemos a la izquierda
					pos = actualPos + width;
				} else if(dir=='right'){ //Las posicionamos en width y las movemos a la derecha
					pos = actualPos - width;
				}
				//Fijamos la posicion inicial
				$(this).css('left',pos+'px');
				//Hago la transicion
				if(dir=='left'){
					//console.log('Transicion de '+pos+ ' a ' + (pos-width));
					$(this).animate({left: '-='+width+'px'},'fast',function(){});
				} 
				if(dir=='right'){
					//console.log('Transicion de '+pos+ ' a ' + (pos+width));
					$(this).animate({left: '+='+width+'px'},'fast',function(){});
				}
			}
		}	
	});
	//Transicion para los que se estan mostrando
	$(mostrados).each(function(){
			$(this).animate({left: finalDir},'fast',function(){
					//Cuando ha acabado la animacion
					$(this).removeClass('menuswipe_item_show').addClass('menuswipe_item');
					_menuswipe_sem--;
			});
	});
}

function _menuswipe_reset(id){
	$('#'+id).html('');
	_menuswipe_curr=0;
	_menuswipe_elem=6;
	_menuswipe_tam=0;
	_menuswipe_sem = 0;
	posiciones =[];
}



//Des/Chequea todos los hijos de la categoria
function checkAll(check){
	var catId = $(check).attr('categoryId');
	//Cojo mi estado
	var state = $(check).attr('checked');
	var newstate;
	if(state!=null){
		newstate = state;
	} else {
		newstate = false;
	}
	
	$('div[categoryId="'+catId+'"] input[type="checkbox"]').each(function(){
		$(this).attr("checked",newstate).checkboxradio("refresh");
		//No deberia estar en la clase de utilidad. Quitar si se necesita usar este metodo:
		clickType($(this));
	});
}

//Si todos estan deshabilitados o habilitados, quitar el padre
function checkSup(check){
	var change = true;
	var state = $(check).attr('checked');
	var catId = $(check).parents('div:eq(1)').attr('categoryId');
	
	//Si estoy deshabilitado, mi padre debe estar deshabilitado
	if(state==null){
		$('input[categoryId='+catId+']').attr('checked',false).checkboxradio("refresh");
	} else { //Si todos estamos habilitados, mi padre tambien
		var flag = true;
		$('div[categoryId="'+catId+'"] input[type="checkbox"]').each(function(){
			if($(this).attr('checked')!='checked'){
				flag = false;
			}
		});
		if(flag==true){
			$('input[categoryId='+catId+']').attr('checked','checked').checkboxradio("refresh");
		}
	}

}

(function ($) {

    var defaults = {
        inputClass: ''
    }

    $.scroller.presets.select = function(inst) {
        var s = $.extend({}, defaults, inst.settings),
            elm = $(this),
            id = this.id + '_dummy',
            l1 = $('label[for="' + this.id + '"]').attr('for', id),
            l2 = $('label[for="' + id + '"]'),
            label = l2.length ? l2.text() : elm.attr('name'),
            invalid = [],
            w = [{}];

        w[0][label] = {};

        var main = w[0][label];

        $('option', elm).each(function() {
            var v = $(this).attr('value');
            main['_' + v] = $(this).text();
            if ($(this).prop('disabled')) invalid.push(v);
        });

        $('#' + id).remove();

        var input = $('<input type="text" id="' + id + '" value="' + main['_' + elm.val()] + '" class="' + s.inputClass + '" readonly />').insertBefore(elm);
		
		$(input).on('tap',function(){
			inst.show();
		});
        if (s.showOnFocus)
            input.focus(function() { inst.show() });

        elm.hide().closest('.ui-field-contain').trigger('create');

        return {
            width: 200,
            wheels: w,
            headerText: false,
            formatResult: function(d) {
                return main[d[0]];
            },
            parseValue: function() {
                return ['_' + elm.val()];
            },
            validate: function(dw) {
                $.each(invalid, function(i, v) {
                    $('li[data-val="_' + v + '"]', dw).removeClass('dw-v');
                });
            },
            onSelect: function(v, inst) {
                input.val(v);
                elm.val(inst.values[0].replace(/_/, '')).trigger('change');
            },
            onChange: function(v, inst) {
                if (s.display == 'inline') {
                    input.val(v);
                    elm.val(inst.temp[0].replace(/_/, '')).trigger('change');
                }
            },
            onClose: function() {
                input.blur();
            }
        }
    }

})(jQuery);


(function ($) {

    var date = new Date(),
        defaults = {
            dateFormat: 'mm/dd/yy',
            dateOrder: 'mmddy',
            timeWheels: 'hhiiA',
            timeFormat: 'hh:ii A',
            startYear: date.getFullYear() - 100,
            endYear: date.getFullYear() + 1,
            monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            shortYearCutoff: '+10',
            monthText: 'Month',
            dayText: 'Day',
            yearText: 'Year',
            hourText: 'Hours',
            minuteText: 'Minutes',
            secText: 'Seconds',
            ampmText: '&nbsp;',
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            separator: ' '
        },
        preset = function(inst) {
            var that = $(this),
                format;
            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                switch (that.attr('type')) {
                    case 'date':
                        format = 'yy-mm-dd';
                        break;
                    case 'datetime':
                        format = 'yy-mm-ddTHH:ii:ssZ';
                        break;
                    case 'datetime-local':
                        format = 'yy-mm-ddTHH:ii:ss';
                        break;
                    case 'month':
                        format = 'yy-mm';
                        defaults.dateOrder = 'mmyy';
                        break;
                    case 'time':
                        format = 'HH:ii:ss';
                        break;
                }
                // Check for min/max attributes
                var min = that.attr('min'),
                    max = that.attr('max');
                if (min)
                    defaults.minDate = $.scroller.parseDate(format, min);
                if (max)
                    defaults.maxDate = $.scroller.parseDate(format, max);
            }

            // Set year-month-day order
            var s = $.extend({}, defaults, inst.settings),
                offset = 0,
                wheels = [],
                ord = [],
                o = {},
                f = { y: 'getFullYear', m: 'getMonth', d: 'getDate', h: getHour, i: getMinute, s: getSecond, ap: getAmPm },
                p = s.preset,
                dord = s.dateOrder,
                tord = s.timeWheels,
                regen = dord.match(/D/),
                ampm = tord.match(/a/i),
                hampm = tord.match(/h/),
                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
                defd = new Date(),
                stepH = s.stepHour,
                stepM = s.stepMinute,
                stepS = s.stepSecond,
                mind = s.minDate,
                maxd = s.maxDate;

            format = format ? format : hformat;

            if (p.match(/date/i)) {

                // Determine the order of year, month, day wheels
                $.each(['y', 'm', 'd'], function(i, v) {
                    var i = dord.search(new RegExp(v, 'i'));
                    if (i > -1)
                        ord.push({ o: i, v: v });
                });
                ord.sort(function(a, b) { return a.o > b.o ? 1 : -1; });
                $.each(ord, function(i, v) {
                    o[v.v] = i;
                });

                var w = {};
                for (var k = 0; k < 3; k++) {
                    if (k == o.y) {
                        offset++;
                        w[s.yearText] = {};
                        var start = mind ? mind.getFullYear() : s.startYear,
                            end = maxd ? maxd.getFullYear() : s.endYear;
                        for (var i = start; i <= end; i++)
                            w[s.yearText][i] = dord.match(/yy/i) ? i : (i + '').substr(2, 2);
                    }
                    else if (k == o.m) {
                        offset++;
                        w[s.monthText] = {};
                        for (var i = 0; i < 12; i++)
                            w[s.monthText][i] =
                                dord.match(/MM/) ? s.monthNames[i] :
                                dord.match(/M/) ? s.monthNamesShort[i] :
                                dord.match(/mm/) && i < 9 ? '0' + (i + 1) : i + 1;
                    }
                    else if (k == o.d) {
                        offset++;
                        w[s.dayText] = {};
                        for (var i = 1; i < 32; i++)
                            w[s.dayText][i] = dord.match(/dd/i) && i < 10 ? '0' + i : i;
                    }
                }
                wheels.push(w);
            }

            if (p.match(/time/i)) {
                var w = {};
                if (tord.match(/h/i)) {
                    o.h = offset++; // Hours wheel order
                    w[s.hourText] = {};
                    for (var i = 0; i < (hampm ? 12 : 24); i += stepH)
                        w[s.hourText][i] = hampm && i == 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i;
                }
                if (tord.match(/i/)) {
                    o.i = offset++; // Minutes wheel order
                    w[s.minuteText] = {};
                    for (var i = 0; i < 60; i += stepM)
                        w[s.minuteText][i] = tord.match(/ii/) && i < 10 ? '0' + i : i;
                }
                if (tord.match(/s/)) {
                    o.s = offset++; // Seconds wheel order
                    w[s.secText] = {};
                    for (var i = 0; i < 60; i += stepS)
                        w[s.secText][i] = tord.match(/ss/) && i < 10 ? '0' + i : i;
                }
                if (ampm) {
                    o.ap = offset++; // ampm wheel order
                    var upper = tord.match(/A/);
                    w[s.ampmText] = { 0: upper ? 'AM' : 'am', 1: upper ? 'PM' : 'pm' };
                }
                wheels.push(w);
            }

            function get(d, i, def) {
                if (o[i] !== undefined)
                    return +d[o[i]];
                if (def !== undefined)
                    return def;
                return defd[f[i]] ? defd[f[i]]() : f[i](defd);
            }

            function step(v, step) {
                return Math.floor(v / step) * step;
            }

            function getHour(d) {
                var hour = d.getHours();
                hour = hampm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepH);
            }

            function getMinute(d) {
                return step(d.getMinutes(), stepM);
            }

            function getSecond(d) {
                return step(d.getSeconds(), stepS);
            }

            function getAmPm(d) {
                return ampm && d.getHours() > 11 ? 1 : 0;
            }

            function getDate(d) {
                var hour = get(d, 'h', 0);
                return new Date(get(d, 'y'), get(d, 'm'), get(d, 'd'), get(d, 'ap') ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
            }

            inst.setDate = function(d, fill, time) {
                // Set wheels
                for (var i in o)
                    this.temp[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                this.setValue(true, fill, time);
            }

            inst.getDate = function(d) {
                return getDate(d);
            }

            return {
                wheels: wheels,
                headerText: function(v) {
                    return $.scroller.formatDate(hformat, getDate(inst.temp), s);
                },
                /**
                 * Builds a date object from the wheel selections and formats it to the given date/time format
                 * @param {Array} d - An array containing the selected wheel values
                 * @return {String} - The formatted date string
                 */
                formatResult: function(d) {
                    return $.scroller.formatDate(format, getDate(d), s);
                },
                /**
                 * Builds a date object from the input value and returns an array to set wheel values
                 * @return {Array} - An array containing the wheel values to set
                 */
                parseValue: function(val) {
                    var d = new Date(),
                        result = [];
                    try {
                        d = $.scroller.parseDate(format, val, s);
                    }
                    catch (e) {
                    }
                    // Set wheels
                    for (var i in o)
                        result[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                    return result;
                },
                /**
                 * Validates the selected date to be in the minDate / maxDate range and sets unselectable values to disabled
                 * @param {Object} dw - jQuery object containing the generated html
                 * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
                 */
                validate: function(dw, i) {
                    var temp = inst.temp,
                        mins = { m: 0, d: 1, h: 0, i: 0, s: 0, ap: 0 },
                        maxs = { m: 11, d: 31, h: step(hampm ? 11 : 23, stepH), i: step(59, stepM), s: step(59, stepS), ap: 1 },
                        w = (mind || maxd) ? ['y', 'm', 'd', 'ap', 'h', 'i', 's'] : ((i == o.y || i == o.m || i === undefined) ? ['d'] : []), // Validate day only, if no min/max date set
                        minprop = true,
                        maxprop = true;
                    $.each(w, function(x, i) {
                        if (o[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                maxdays = 31,
                                val = get(temp, i),
                                t = $('ul', dw).eq(o[i]),
                                y, m;
                            if (i == 'd') {
                                y = get(temp, 'y'),
                                m = get(temp, 'm');
                                maxdays = 32 - new Date(y, m, 32).getDate();
                                max = maxdays;
                                if (regen)
                                    $('li', t).each(function() {
                                        var that = $(this),
                                            d = that.data('val'),
                                            w = new Date(y, m, d).getDay();
                                        that.html(dord.replace(/[my]/gi, '').replace(/dd/, d < 10 ? '0' + d : d).replace(/d/, d).replace(/DD/, s.dayNames[w]).replace(/D/, s.dayNamesShort[w]));
                                    });
                            }
                            if (minprop && mind) {
                                min = mind[f[i]] ? mind[f[i]]() : f[i](mind);
                            }
                            if (maxprop && maxd) {
                                max = maxd[f[i]] ? maxd[f[i]]() : f[i](maxd);
                            }
                            if (i != 'y') {
                                var i1 = $('li[data-val="' + min + '"]', t).index(),
                                    i2 = $('li[data-val="' + max + '"]', t).index();
                                $('li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                                if (i == 'd') { // Hide days not in month
                                    $('li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                                }
                                if (val < min)
                                    val = min;
                                if (val > max)
                                    val = max;
                            }
                            if (minprop)
                                minprop = val == min;
                            if (maxprop)
                                maxprop = val == max;
                            // Disable some days
                            if (s.invalid && i == 'd') {
                                var idx = [];
                                // Disable exact dates
                                if (s.invalid.dates)
                                    $.each(s.invalid.dates, function(i, v) {
                                        if (v.getFullYear() == y && v.getMonth() == m) {
                                            idx.push(v.getDate() - 1);
                                        }
                                    });
                                // Disable days of week
                                if (s.invalid.daysOfWeek) {
                                    var first = new Date(y, m, 1).getDay();
                                    $.each(s.invalid.daysOfWeek, function(i, v) {
                                        for (var j = v - first; j < maxdays; j += 7)
                                            if (j >= 0)
                                                idx.push(j);
                                    });
                                }
                                // Disable days of month
                                if (s.invalid.daysOfMonth)
                                    $.each(s.invalid.daysOfMonth, function(i, v) {
                                        v = (v + '').split('/');
                                        if (v[1]) {
                                            if (v[0] - 1 == m)
                                                idx.push(v[1] - 1);
                                        }
                                        else
                                            idx.push(v[0] - 1);
                                    });
                                $.each(idx, function(i, v) {
                                    $('li', t).eq(v).removeClass('dw-v');
                                });
                            }
                        }
                    });
                },
                methods: {
                    /**
                    * Returns the currently selected date.
                    * @param {Boolean} temp - If true, return the currently shown date on the picker, otherwise the last selected one
                    * @return {Date}
                    */
                    getDate: function(temp) {
                        //var inst = $(this).data('scroller');
                        var inst = $(this).scroller('getInst');
                        if (inst)
                            return inst.getDate(temp ? inst.temp : inst.values);
                    },
                    /**
                    * Sets the selected date
                    * @param {Date} d - Date to select.
                    * @param {Boolean} [fill] - Also set the value of the associated input element. Default is true.
                    * @return {Object} - jQuery object to maintain chainability
                    */
                    setDate: function(d, fill, time) {
                        if (fill == undefined) fill = false;
                        return this.each(function () {
                            var inst = $(this).scroller('getInst');
                            if (inst)
                                inst.setDate(d, fill, time);
                        });
                    }
                }
            }
        };

    $.scroller.presets.date = preset;
    $.scroller.presets.datetime = preset;
    $.scroller.presets.time = preset;

    /**
    * Format a date into a string value with a specified format.
    * @param {String} format - Output format.
    * @param {Date} date - Date to format.
    * @param {Object} settings - Settings.
    * @return {String} - Returns the formatted date string.
    */
    $.scroller.formatDate = function (format, date, settings) {
        if (!date) return null;
        var s = $.extend({}, defaults, settings),
            // Check whether a format character is doubled
            look = function(m) {
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) { n++; i++; };
                return n;
            },
            // Format a number, with leading zero if necessary
            f1 = function(m, val, len) {
                var n = '' + val;
                if (look(m))
                    while (n.length < len)
                        n = '0' + n;
                return n;
            },
            // Format a name, short or long as requested
            f2 = function(m, val, s, l) {
                return (look(m) ? l[val] : s[val]);
            },
            output = '',
            literal = false;
        for (var i = 0; i < format.length; i++) {
            if (literal)
                if (format.charAt(i) == "'" && !look("'"))
                    literal = false;
                else
                    output += format.charAt(i);
            else
                switch (format.charAt(i)) {
                    case 'd':
                        output += f1('d', date.getDate(), 2);
                        break;
                    case 'D':
                        output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                        break;
                    case 'o':
                        output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                        break;
                    case 'm':
                        output += f1('m', date.getMonth() + 1, 2);
                        break;
                    case 'M':
                        output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
                        break;
                    case 'y':
                        output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                        break;
                    case 'h':
                        var h = date.getHours();
                        output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
                        break;
                    case 'H':
                        output += f1('H', date.getHours(), 2);
                        break;
                    case 'i':
                        output += f1('i', date.getMinutes(), 2);
                        break;
                    case 's':
                        output += f1('s', date.getSeconds(), 2);
                        break;
                    case 'a':
                        output += date.getHours() > 11 ? 'pm' : 'am';
                        break;
                    case 'A':
                        output += date.getHours() > 11 ? 'PM' : 'AM';
                        break;
                    case "'":
                        if (look("'"))
                            output += "'";
                        else
                            literal = true;
                        break;
                    default:
                        output += format.charAt(i);
                }
        }
        return output;
    }

    /**
    * Extract a date from a string value with a specified format.
    * @param {String} format - Input format.
    * @param {String} value - String to parse.
    * @param {Object} settings - Settings.
    * @return {Date} - Returns the extracted date.
    */
    $.scroller.parseDate = function (format, value, settings) {
        var def = new Date();
        if (!format || !value) return def;
        value = (typeof value == 'object' ? value.toString() : value + '');
        var s = $.extend({}, defaults, settings),
            year = def.getFullYear(),
            month = def.getMonth() + 1,
            day = def.getDate(),
            doy = -1,
            hours = def.getHours(),
            minutes = def.getMinutes(),
            seconds = 0, //def.getSeconds(),
            ampm = -1,
            literal = false,
            // Check whether a format character is doubled
            lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            },
            // Extract a number from the string value
            getNumber = function(match) {
                lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
                    (match == 'y' ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substr(iValue).match(digits);
                if (!num)
                    return 0;
                    //throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            // Extract a name from the string value and convert to an index
            getName = function(match, s, l) {
                var names = (lookAhead(match) ? l : s);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                return 0;
                //throw 'Unknown name at position ' + iValue;
            },
            // Confirm that a literal character matches the string value
            checkLiteral = function() {
                //if (value.charAt(iValue) != format.charAt(iFormat))
                    //throw 'Unexpected literal at position ' + iValue;
                iValue++;
            },
            iValue = 0;

        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    checkLiteral();
            else
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', s.dayNamesShort, s.dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', s.monthNamesShort, s.monthNames);
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case 'H':
                        hours = getNumber('H');
                        break;
                    case 'h':
                        hours = getNumber('h');
                        break;
                    case 'i':
                        minutes = getNumber('i');
                        break;
                    case 's':
                        seconds = getNumber('s');
                        break;
                    case 'a':
                        ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
                        break;
                    case 'A':
                        ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else
                            literal = true;
                        break;
                    default:
                        checkLiteral();
                }
        }
        if (year < 100)
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= s.shortYearCutoff ? 0 : -100);
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                var dim = 32 - new Date(year, month - 1, 32).getDate();
                if (day <= dim)
                    break;
                month++;
                day -= dim;
            } while (true);
        }
        hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));
        var date = new Date(year, month - 1, day, hours, minutes, seconds);
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
            throw 'Invalid date';
        return date;
    }

})(jQuery);


(function ($) {
    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
            rows: 5,
            width: 70,
            showLabel: false
        }
    }

    $.scroller.themes['android-ics'] = theme;
    $.scroller.themes['android-ics light'] = theme;

})(jQuery);



(function ($) {

    $.scroller.themes.android = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'clickpick',
            height: 50
        }
    }

})(jQuery);



(function ($) {

    $.scroller.themes.ios = {
        defaults: {
            dateOrder: 'MMdyy',
            rows: 5,
            height: 30,
            width: 55,
            headerText: false,
            showLabel: false
        }
    }

})(jQuery);


function BDDao() {
	var me = this;
	
	var db;
	var queries={}; //Constructores de Queries (Devuelven la query parametrizada con ?)
	var params_conv={}; //Constructores de params (Devuelven array)
	
	me.init = function(){
		db = window.openDatabase(ConstF.DatabaseNombre, 
				ConstF.DatabaseRev, ConstF.DataBaseDesc, ConstF.DatabaseTam);
		if(db==null){
			//console.log("Imposible abrir BD");
		} else {
			me.createSchema(
				function(){
					//console.log("Error creando Esquema");
				},
				function(){
					//console.log("Esquema creado OK");
			});
		}
	};
	
	me.createSchema = function(errorCB,okCB){ //TODO: Pasar el Schema por parametro
		me.trans(function(tx) {

          //TRAVEL_RETURN_DATE y TRAVEL_GO_DATE se cargan además en el update de los vuelos con la hora para poder tener el siguiente
          tx.executeSql('CREATE TABLE IF NOT EXISTS TRAVELS (TRAVEL_ID INTEGER PRIMARY KEY AUTOINCREMENT, FLIGHT text,TRAVEL_DATE INTEGER,pkSalida varchar(100),pkLlegada varchar(100))');
          tx.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITE_POIS (idPoi INTEGER, PRIMARY KEY(idPoi))');
          tx.executeSql('CREATE TABLE IF NOT EXISTS NOTIFICACIONS (NOTIF_ID INTEGER PRIMARY KEY AUTOINCREMENT,NOTIF_TITLE varchar(25),NOTIF_MSG varchar(180),NOTIF_TYPE_ID varchar(1),NOTIF_DATE INTEGER)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS RESERVATIONS (RES_ID INTEGER PRIMARY KEY AUTOINCREMENT,RES_NAME varchar(10), RES_PARKING_ID varchar(8), RES_AIRPORT_ID varchar(8), RES_IN_DATE INTEGER,RES_OUT_DATE INTEGER,RES_PRICE VARCHAR(10),RES_PLAZA varchar(20), RES_LOC varchar(10),RES_MAIL varchar(100))');
		  // Preferences          
          tx.executeSql('CREATE TABLE IF NOT EXISTS SETTINGS (SETTING_ID INTEGER PRIMARY KEY AUTOINCREMENT,SETTING_NAME varchar(25),SETTING_VALUE text)');
          
   		},errorCB,okCB);
	};
	
	me.trans = function(operacion, errorTrans, okTrans) {
		db.transaction(operacion, errorTrans,okTrans);
	};
	
	me.execute = function(metodo, param, okCB, errorCB){
				
		var query = queries[metodo];
		var constrP = params_conv[metodo];
		//console.log(query);
		//console.log(constrP);
		if(query==null){ //No hay metodo
			return false;
		}
		//Hacemos la transacción con la query
		me.trans(
			function(tx){
				var finalParam=[];
				if(constrP!=null){
					finalParam = constrP(param);
				} else {
					//console.log("No hay constructor de parametros, ejecutando Query sin parametros");
				}
				var queryFinal = query(param);
				
				//console.log("QUERY: "+ queryFinal);
				//console.log("PARAMS: " + finalParam.toString());
				tx.executeSql(queryFinal,finalParam,okCB,
					function(tx,err){
						//console.log("Error code:"+err.code);
						errorCB(err);
					});
				},
			function(){
				//console.log("ERROR TRANS");
			},
			function(){
				//console.log("OK TRANS");
	}
		);		
	};
	
	//SOLO VA CON COSAS QUE NO DEVUELVA RESULTADOS
	me.executeAll = function(metodo, param, okCB, errorCB){
		var query = queries[metodo];
		var constrP = params_conv[metodo];
		var resultadoFinal = []; //Aqui almacenamos los arrays de arrays
		var colaQueries =  []; //Array con las queries a ejecutar
		var paramsQueries = []; //Array de arrays con los params a ejecutar
		if(query==null){ //No hay metodo
			return false;
		}
		
		//Hacemos la transacción  teniendo en cuenta que recibimos un array de array
		for(var i=0;i<param.length;i++){
			colaQueries[i] = query(param[i]);
			if(constrP!=null){
				paramsQueries[i] = constrP(param[i]);
			} else {
				//console.log("No hay constructor de parametros, ejecutando Query sin parametros");
			}
		}
		
			//Hacemos las transiciones con todas las queries
			me.trans(
				function(tx){ //Dentro de la transaccion hacemos todas las SQL
					for(var j=0;j<colaQueries.length;j++){
						//console.log("QUERY: "+ colaQueries[j]);
						//console.log("PARAMS: " + paramsQueries[j].toString());
					
						tx.executeSql(colaQueries[j],paramsQueries[j],
							function(){ /*OK */},
							function(tx,err){//console.log("Error processing SQL:"+err.code);
							});
					}
				},
				function(tx,err){ //ERR TRANS
					errorCB(err);
				},
				function(){ //OK TRANS
					//console.log("OK TRANS");
					okCB();
				}
			);
	};
		
	
	//Query en formato function(tx,param){tx.executeSql();}
	me.addQuery = function(nombreMetodo,query){
		if(queries[nombreMetodo]==null){
			queries[nombreMetodo] = query;
			return true;
		} else{
			return false;
		}
	};
	
	me.addConstrParam = function(nombreMetodo,constr){
		if(params_conv[nombreMetodo]==null){
			params_conv[nombreMetodo] = constr;
			return true;
		} else {
			return false;
		}
	};
}

function NetDao() {
	var me = this;
	
	/** Por defecto POST con json en entrada/salida*/
	var WS = ConstF.base_WS;
	var method = ConstF.POST;
	var tipoContenido = ConstF.JsonContent;
	var tipoDatos = ConstF.JsonTipoDatos;
	
	me.setWS = function (url){
		WS = url;
	};
	
	me.setMethod = function(tipo){
		method = tipo;
	};
	
	me.setContentType = function(tipoContent){
		tipoContenido = tipoContent;
	};
	
	me.setTipoDatos = function(d){
		tipoDatos = d;
	};

	me.execute = function(metodo, param, okCB, errorCB) {
		//console.log("AJAX - Llamanado WS, metodo: "+ metodo);
		//console.log("AJAX - PARAM:"+JSON.stringify(param));
		
		var ctx = GestorContexto.SORT_CONTEXT();
		if(metodo== 'SetContext' || metodo=='SetPushTokenContext' ||  metodo=='RegisterDevice'){//Para no enviar siempre todo el contexto
			ctx = GestorContexto.CONTEXT();
		}
		
		
		var obj = {"aspa": {
  					"service":metodo,
  					"param":param,
  					"context":ctx
  					}
				};
		
		var dat = new Date();
		console.log('FJORDAN: OUT: '+dat.toISOString()+' - '+JSON.stringify(obj));
		
		//Primero comprobamos la disponibilidad
		getConexion(function(){
			$.ajax({
				type : method,
				url : WS,
				data : JSON.stringify(obj),
				timeout: ConstF.timeoutRequest,
				contentType : tipoContenido,
				dataType : tipoDatos,
				async: true,
				success : function(data){
					var d = new Date();
					//console.log('IN: '+d.toISOString()+' - origReq:'+JSON.stringify(obj)+' resp:'+JSON.stringify(data));
					okCB(data);
				},
				error : errorCB
			});
		}, function(jqXHR, textStatus, errorThrown){ //Devolvemos el error de timeout o lo que sea para el proxy
			//console.log("No hay conexion al WS");
			//console.log("ErrjqXHR:"+JSON.stringify(jqXHR));
			//console.log("ErrSta:"+textStatus);
			//console.log("ErrEThrow:"+errorThrown);
			errorCB(jqXHR, textStatus, errorThrown);
		});
	};
	
	//Devuelve true si hay conexion al WS, false si no
	var getConexion = function(okCB,errorCB){
		okCB();
		// console.log("AJAX - Comprobando disponibilidad WS");
		 /*$.ajax({
			 type: ConstF.GET,
			 url: ConstF.check_WS,
			 timeout: ConstF.timeoutBase,
			 success: okCB,
			 error : errorCB
		 });
		 */
	};
}


function _Proxy() {
	var me	= this;
	var operaciones={};
	var operacionesPriv={}; //Se saltan el bloqueo de IO
	var daosBD={};
	var daosNet={};
	var lockOp = true; //Bloqueo de operaciones de IO
	
	/**True si se añade, false si ya existe*/
	me.addOp = function(nombreInvoc,bdDao,netDao,privilegiada){
		if(operaciones[nombreInvoc]==null){
			operaciones[nombreInvoc] = nombreInvoc;
			daosBD[nombreInvoc] = bdDao;
			daosNet[nombreInvoc] = netDao;
			if(privilegiada!=null && privilegiada==true){
				operacionesPriv[nombreInvoc]= nombreInvoc;
			}
		} else {
			return false;
		}
	};
	
	me.quitaOp = function(nombreInvoc){
		operaciones[nombreInvoc] = null;
		daosBD[nombreInvoc] = null;
		daosNet[nombreInvoc] = null;
		operacionesPriv[nombreInvoc]= nombreInvoc;
	};
	
	me.hasBD = function(nombreInvoc){
		if(daosBD[nombreInvoc]!=null){
			return true;
		} else {
			return false;
		}
	};
	
	me.hasNet = function(nombreInvoc){
		if(daosNet[nombreInvoc]!=null){
			return true;
		} else {
			return false;
		}
	};
	
	me.lock = function(){
		lockOp = true;
	};
	
	me.unlock = function(){
		lockOp = false;
	};
	
	/**
	 * Invoca a la operacion de persistencia 
 	* @param {Object} nombreInvoc El nombre de la operacion
 	* @param {Object} param Los parametros
 	* @param {Object} okCB El callback en caso de exito (recibira los datos y en el segundo param de donde proceden)
 	* @param {Object} errorCB El callback en caso de error
 	* @param {Object} prioridad el mecanismo de prioridad que establezcamos
	 */
	/** MECANISMOS DE PRIORIDAD: Solo aplican en el caso que para el mismo metodo haya Net y BD
	 * prioridadBD: Va primero a BD y si devuelve vacio, luego a Net
	 * prioridadNet: Va primero a Net, si da timeout el check o devuelve vacio, va a BD
	 * prioridadSoloBD: Va unicamente a la BD
	 * prioridadSoloNet: Va unicamente a Net
	 * SIEMPRE EN CASO DE ERROR SE VA A EJECUTAR EL errorCB (Salvo error de timeout en prioridadNet)
	 */
	me.execute = function(nombreInvoc,param,okCB,errorCB,prioridad){
// 		
		// if(ConstF.prioridadSoloNet == prioridad)
			// console.log("PROXY: Ejecutando op: "+nombreInvoc);

		if(operaciones[nombreInvoc]==null){
			errorCB();
			return false;
		}
		
		/**
		 * Se bloquean todas las peticiones salvo las privilegiadas y las de BD 
		 */
		if(lockOp && operacionesPriv[nombreInvoc]==null && prioridad!=ConstF.prioridadSoloBD){
			//console.log('Operacion bloqueada:' + nombreInvoc);
			errorCB();
			return false;
		} else {
			//console.log('Permitida:' +nombreInvoc);
		}
		
		//Net y BD disponibles
		if(me.hasBD(nombreInvoc)&&me.hasNet(nombreInvoc)){
			//console.log('Net y BD disponibles');
			//Gestion de la prioridad
			if(prioridad == ConstF.prioridadBD){ //Primero BD, en caso de vacio WS
				//console.log("PRIORIDAD BD");
				daosBD[nombreInvoc].execute(nombreInvoc,param,
					function(tx,results){ //Mapea el resultado al estilo del ajax
						if(results.rows.length==0){
							//console.log("Vacio BD, vamos al WS");
							daosNet[nombreInvoc].execute(nombreInvoc, param, 
								function(data){
									okCB(data,ConstF.resultadoNet,param);
								}, 
							errorCB);
						} else {
							var len = results.rows.length;
									var array_temp = [];
									for(var i=0;i<len;i++){
										array_temp[i] = results.rows.item(i);
									}
								var data = array_temp;
								okCB(data,ConstF.resultadoBD,param);
						}
					},errorCB);
			} else if(prioridad == ConstF.prioridadNet){ //Primero WS, en caso de vacio BD
				//console.log("PRIORIDAD WS");
				daosNet[nombreInvoc].execute(nombreInvoc, param, 
					function(data){
						if(data.length==0){
							//console.log("Vacio WS, vamos a BD");
							daosBD[nombreInvoc].execute(nombreInvoc,param,
								function(tx,results){ //Mapea el resultado al estilo del ajax
									var len = results.rows.length;
									var array_temp = [];
									for(var i=0;i<len;i++){
										array_temp[i] = results.rows.item(i);
									}
								var data = array_temp;
								okCB(data,ConstF.resultadoBD,param);
								},
							errorCB);
						} else {
							//console.log("OK WS");
							okCB(data,ConstF.resultadoNet,param);
						}
					}, function(jqXHR, textStatus, errorThrown){
							//console.log("Fallo conexion, vamos a BD");
							daosBD[nombreInvoc].execute(nombreInvoc,param,
								function(tx,results){ //Mapea el resultado al estilo del ajax
									var len = results.rows.length;
									var array_temp = [];
									for(var i=0;i<len;i++){
										array_temp[i] = results.rows.item(i);
									}
								var data = array_temp;
								okCB(data,ConstF.resultadoBD,param);
								},
							errorCB);
					});
			} else if(prioridad == ConstF.prioridadSoloBD){
				//console.log("PRIORIDAD Solo BD");
				daosBD[nombreInvoc].execute(nombreInvoc,param,
					function(tx,results){ //Mapea el resultado al estilo del ajax
						var len = results.rows.length;
						var array_temp = [];
						for(var i=0;i<len;i++){
							array_temp[i] = results.rows.item(i);
						}
						var data = array_temp;
						okCB(data,ConstF.resultadoBD);
					},
					function(err){ //Mapea el error al estilo del ajax
						errorCB(err);
					});
			} else if(prioridad == ConstF.prioridadSoloNet){
				//console.log("PRIORIDAD Solo Net");
				daosNet[nombreInvoc].execute(nombreInvoc, param, 
					function(data){
						okCB(data,ConstF.resultadoNet,param);
					}, 
				errorCB);
			}
		} else { //Solo una de ellos o ninguna
			if(me.hasBD(nombreInvoc)){ //Solo hay acceso BD
				//console.log('BD disponible');
				daosBD[nombreInvoc].execute(nombreInvoc,param,
					function(tx,results){ //Mapea el resultado al estilo del ajax
						var len = results.rows.length;
						var array_temp = [];
						for(var i=0;i<len;i++){
							array_temp[i] = results.rows.item(i);
						}
						var data = array_temp;
						okCB(data,ConstF.resultadoBD,param);
					},
					function(err){ //Mapea el error al estilo del ajax
						errorCB(err);
					});
			}
			if(me.hasNet(nombreInvoc)){ //Solo hay Net
				//console.log('Net disponible');
	      		//var _date = new Date();
				//console.log('************************* TIEMPOS  Se lanza ajax: ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
				daosNet[nombreInvoc].execute(nombreInvoc, param, 
					function(data){
						okCB(data,ConstF.resultadoNet,param);
					}, 
				errorCB);
			}
		}
		return false;
	};
	
	/**
	 * Realiza multiples queries con los parametros pasados dentro de la transaccion 
	 * NO USAR CON DELETE NI CON SELECT, NO SEAIS VAGOS Y METED OR EN EL WHERE ;)
 	* @param {Object} nombreInvoc El nombre de la operacion
 	* @param {Object} param Los parametros (Array de Arrays)
 	* @param {Object} okCB El callback en caso de exito (recibira los datos y en el segundo param de donde proceden)
 	* @param {Object} errorCB El callback en caso de error
	 */
	me.executeAll = function(nombreInvoc,param,okCB,errorCB){
		//console.log("PROXY: Ejecutando op multiple: "+nombreInvoc);
		if(operaciones[nombreInvoc]==null){
			errorCB();
			return false;
		}
		
		//Invoco a la base de datos y le paso el array de arrays para que gestione ella la transaccion
		if(me.hasBD(nombreInvoc)){ 
				daosBD[nombreInvoc].executeAll(nombreInvoc,param,
					function(resultados){ 
						okCB(resultados,ConstF.resultadoBD,param);
					},
					function(err){ //Mapea el error al estilo del ajax
						errorCB(err);
					});
			}
		return false;
	};
}

/**
 * Encargado de gestionar las colecciones de POIs dar metodos de busqueda
 * y filtrado
 */
function _PoiRepository() {
	var me = this;
	var poisLoaded = {};
	//Lista completa de POIs de cada aeropuerto cargado

	me.init = function(wsDao) {
		Proxy.addOp('GetPoiList', null, wsDao);
	};

	/**
	 * Devuelve una lista con los POIs del aeropuerto de acuerdo a los filtros (Se hace un AND entre todos los filtros)
	 * @param {Object} airportId El aeropuerto
	 * @param {Object} text Texto a filtrar
	 * @param {Object} termArray Terminales a filtrar ej: ['T1','T2','T4']
	 * @param {Object} floorArray Plantas a filtrar ej: ['T1_40','T1_45','T2_30','25','35']
	 * @param {Object} catArray Categorias a filtrar ej: ['tiendas-ocio','equipajes']
	 * @param {Object} typesArray Tipos a filtrar: ['parkings','informacion-pmr']
	 * @param {Object} okCB: function([]) donde se devuelven los pois solicitados. (Asincrono o sincrono dependiendo de cache)
	 * @param {Object} errorCB: function() en caso de error
	 *
	 * Instrucciones para los pequeños Poneys del Repositorio:
	 * Los filtros siguen el orden de los parametros, hay que verlo como una sucesion de tuberias
	 * Las condiciones indicadas dentro de cada filtro son OR
	 * Si se pasa el array vacio se supone que no hay filtro
	 * Si se busca el piso T1_40 y se han pasado terminales, por ejemplo: ['T2'] obviamente el AND no devolvera nada
	 * Si se busca tipo parkings y se han pasado categorias y no esta la del parking, el AND no devolvera nada
	 */
	me.searchPois = function(airportId, text,termArray, floorArray, catArray, typesArray, okCB, errorCB) {
		if(poisLoaded[airportId] == null || poisLoaded[airportId].length == 0) {//Los cargamos
			var _param = {
				"AIRPORT_ID" : airportId
			};
			Proxy.execute('GetPoiList', _param, function(data) {
				poisLoaded[airportId] = data;
				if(okCB!=null) okCB(filtrado(data, text.toUpperCase(), termArray, floorArray, catArray, typesArray));
			}, function(err) {
				 if(errorCB!=null)  errorCB();
			}, ConstF.prioridadSoloNet);
		} else {//Se filtran directamente
			if(okCB!=null) okCB(filtrado(poisLoaded[airportId], text.toUpperCase(), termArray, floorArray, catArray, typesArray));
		}
	};
	/**
	 * Devuelve los pois en cache de ese aeropuerto
	 */
	me.getLoadedPois = function(airportId) {
		if(poisLoaded[airportId] != null)
			return poisLoaded[airportId];
		else
			return [];
	};
	/**
	 * Metodo de filtrado por tuberias
	 */
	var filtrado = function(poiList, text, termArray, floorArray, catArray, typesArray) {
		var finalList = poiList;
		var params = [];
		
		//Favoritos
		if(!notFavouritePOISVisible){
			var fav = GestorFavouritePOIs.favouritePois();
			for(var i=0;i<fav.length;i++){
				params.push({
					'NAME' : 'idPoi',
					'VALUE' : fav[i].idPoi
				});
			}
		}

		if(params.length>0){
			finalList = $.getORFilteredArrayFromJSONArray(finalList, params);
		}

		params = [];
		//Terminales
		for(var i = 0; i < termArray.length; i++) {
			params.push({
				'NAME' : 'areaTerminal',
				'VALUE' : termArray[i]
			});
		}

		if(params.length > 0)
			finalList = $.getORFilteredArrayFromJSONArray(finalList, params);

		//Plantas
		var tmpList = [];
		params = [];
		//Aqui genericos (30,40,50...)
		var paramsTFloor = [];
		//Aqui especificos (T1_50, T2_20...)
		for(var i = 0; i < floorArray.length; i++) {
			if(floorArray[i].indexOf('_') != -1) {
				var guion = floorArray[i].indexOf('_');
				var term = floorArray[i].substring(0, guion);
				var floor = floorArray[i].substring(guion + 1);
				paramsTFloor.push([{
					'NAME' : 'areaTerminal',
					'VALUE' : term
				}, {
					'NAME' : 'plantaEdificio',
					'VALUE' : floor
				}]);
			} else {
				params.push({
					'NAME' : 'plantaEdificio',
					'VALUE' : floorArray[i]
				});
			}
		}

		if(params.length > 0)
			tmpList = $.getORFilteredArrayFromJSONArray(finalList, params);

		if(paramsTFloor.length > 0) {
			for(var i = 0; i < paramsTFloor.length; i++) {
				tmpList = tmpList.concat($.getFilteredArrayFromJSONArray(finalList, paramsTFloor[i]));
			}
		}
		if(params.length > 0 || paramsTFloor.length > 0)
			finalList = tmpList;

		//Categorias
		params = [];
		for(var i = 0; i < catArray.length; i++) {
			params.push({
				'NAME' : 'codigoGrupo',
				'VALUE' : catArray[i]
			});
		}
		if(params.length > 0)
			finalList = $.getORFilteredArrayFromJSONArray(finalList, params);

		//Tipos
		params = [];
		for(var i = 0; i < typesArray.length; i++) {
			params.push({
				'NAME' : 'codigoTipo',
				'VALUE' : typesArray[i]
			});
		}
		if(params.length > 0)
			finalList = $.getORFilteredArrayFromJSONArray(finalList, params);
			
		//Texto
		if($.objectHasContent(text)){
			text = Utils.stripAcutes(text);
			var tmpLista = [];
			for(var i=0;i<finalList.length;i++){
				var elem = finalList[i];
				if(GestorIdiomas.getLang()=='es_ES'){ //Unai opinaba que mejor sacar el if y duplicar el for para que fuera mas eficiente Alfonsillo
					if((elem.tituloEsEs!=null && Utils.stripAcutes(elem.tituloEsEs).toUpperCase().indexOf(text)!=-1)||
						(elem.observacionesEsEs!=null && Utils.stripAcutes(elem.observacionesEsEs).toUpperCase().indexOf(text)!=-1)||
						(elem.nombreGrupoEsEs!=null && Utils.stripAcutes(elem.nombreGrupoEsEs).toUpperCase().indexOf(text)!=-1)||
						(elem.nombreTipoEsEs!=null && Utils.stripAcutes(elem.nombreTipoEsEs).toUpperCase().indexOf(text)!=-1)){
							tmpLista[tmpLista.length] = elem;	
					}
				} else{
					if((elem.tituloEnGb!=null && Utils.stripAcutes(elem.tituloEnGb).toUpperCase().indexOf(text)!=-1)||
						(elem.observacionesEnGb!=null && Utils.stripAcutes(elem.observacionesEnGb).toUpperCase().indexOf(text)!=-1)||
						(elem.nombreGrupoEnGb!=null && Utils.stripAcutes(elem.nombreGrupoEnGb).toUpperCase().indexOf(text)!=-1)||
						(elem.nombreTipoEnGb!=null && Utils.stripAcutes(elem.nombreTipoEnGb).toUpperCase().indexOf(text)!=-1)){
							tmpLista[tmpLista.length] = elem;
					}
				}
			}
			finalList = tmpLista;
		}
				
		// finalList.sort(sortPois);		
		if (GestorIdiomas.getLang() == 'es_ES') {
			objSort(finalList, 'orden', 'nombreGrupoEsEs', 'nombreTipoEsEs', 'tituloEsEs', 'areaTerminal', ['plantaEdificio', true]);
		} else {
			objSort(finalList, 'orden', 'nombreGrupoEnGb', 'nombreTipoEnGb', 'tituloEnGb', 'areaTerminal', ['plantaEdificio', true]);
		}
		return finalList;
	};

	/**
	 *	objSort(homes, 'city') --> sort by city (ascending, case in-sensitive)
	 *	objSort(homes, ['city', true]) --> sort by city (descending, case in-sensitive)
	 *	objSort(homes, 'city', true) --> sort by city then price (ascending, case sensitive)
	 *	objSort(homes, 'city', 'price') --> sort by city then price (both ascending, case in-sensitive)
	 *	objSort(homes, 'city', ['price', true]) --> sort by city (ascending) then price (descending), case in-sensitive) 
	 */
	function objSort() {
	    var args = arguments,
    	    array = args[0],
        	case_sensitive, keys_length, key, desc, a, b, i;

    	if (typeof arguments[arguments.length - 1] === 'boolean') {
        	case_sensitive = arguments[arguments.length - 1] || false;
        	keys_length = arguments.length - 1;
    	} else {
        	case_sensitive = false;
        	keys_length = arguments.length;
    	}

    	return array.sort(function (obj1, obj2) {
        	for (i = 1; i < keys_length; i++) {
            	key = args[i];
            	if (typeof key !== 'string') {
                	desc = key[1] || false;
                	key = key[0];
                	a = obj1[args[i][0]];
                	b = obj2[args[i][0]];
            	} else {
	                desc = false;
    	            a = obj1[args[i]];
        	        b = obj2[args[i]];
            	}

            	if (case_sensitive === false && typeof a === 'string') {
            		a = (a == null) ? null : a.toLowerCase().trim(); 
            		b = (b == null) ? null : b.toLowerCase().trim();
            	}

            	if (! desc) {
                	if (a < b) return -1;
                	if (a > b) return 1;
            	} else {
                	if (a > b) return -1;
                	if (a < b) return 1;
            	}
        	}
        	return 0;
    	});
	} //end of objSort() function
	
	/**
	 *Ordenacion de POIs - Estandar de la funcion sort de javascript
	 * @param {Object} a
	 * @param {Object} b
	 */
	var sortPois = function(a, b) {
		var res = 0;
		if(a.orden > b.orden) {//Orden
			res = 1;
		} else if(a.orden < b.orden) {
			res = -1;
		} else {//NombreGrupo
			if(a.nombreGrupoEsEs > b.nombreGrupoEsEs) {
				res = 1;
			} else if(a.nombreGrupoEsEs < b.nombreGrupoEsEs) {
				res = -1;
			} else {//Nombre tipo
				if(a.nombreTipoEsEs > b.nombreTipoEsEs) {
					res = 1;
				} else if(a.nombreTipoEsEs < b.nombreTipoEsEs) {
					res = -1;
				} else {//Titulo
					if(a.tituloEsEs > b.tituloEsEs) {
						res = 1;
					} else if(a.tituloEsEs < b.tituloEsEs) {
						res = -1;
					} else{ //Terminal
						if(a.areaTerminal > b.areaTerminal) {
							res = 1;
						} else if(a.areaTerminal < b.areaTerminal) {
							res = -1;
						} else { //Planta (Va al reves, plantas altas numero peque)
							if(a.plantaEdificio > b.plantaEdificio) {
								res = -1;
							} else if(a.plantaEdificio < b.plantaEdificio) {
								res = 1;
							}
						}
					}
				}
			}
		}
		
		return res;
	};
}

/**
 * Get a single setting. 
 * @param {Object} _params Parameters of the query (name of the setting).
 */
function getSetting_Query(_params) {
	var _query;
	if (_params != null) {
		_query = "SELECT * FROM SETTINGS WHERE SETTING_NAME = ?";
	}
	console.log("getSetting_Query: " + _query);
	return _query;
}

/**
 * Parameters used to get a single setting. 
 * @param {Object} _params Parameters of the query (name of the setting).
 */
function getSetting_Params(_params) {
	var _paramsFinales = [];
	_paramsFinales[0] = _params.SETTING_NAME;
	return _paramsFinales;
}

/**
 * Insert a single setting. 
 * @param {Object} _params Parameters of the query (name and value of the setting to insert).
 */
function insertSetting_Query(_params) {
	var _query;
	if (_params != null) {
		_query = "INSERT INTO SETTINGS (SETTING_NAME, SETTING_VALUE) VALUES (?, ?)";
	}
	console.log("insertSetting_Query: " + _query);
	return _query;
}

/**
 * Parameters used to insert a single setting. 
 * @param {Object} _params Parameters of the query (name and value of the setting to insert).
 */
function insertSetting_Params(_params) {
	var _paramsFinales = [];
	_paramsFinales[0] = _params.SETTING_NAME;
	_paramsFinales[1] = _params.SETTING_VALUE;
	return _paramsFinales;
}

/**
 * Update a single setting. 
 * @param {Object} _params Parameters of the query (name and value of the setting to insert).
 */
function updateSetting_Query(_params) {
	var _query;
	if (_params != null) {
		_query = "UPDATE SETTINGS SET SETTING_VALUE = ? WHERE SETTING_NAME = ?";
	}
	console.log("updateSetting_Query: " + _query);
	return _query;
}

/**
 * Parameters used to update a single setting. 
 * @param {Object} _params Parameters of the query (name and value of the setting to update).
 */
function updateSetting_Params(_params) {
	var _paramsFinales = [];
	_paramsFinales[0] = _params.SETTING_VALUE;
	_paramsFinales[1] = _params.SETTING_NAME;
	return _paramsFinales;
}

/**
 * Delete a single setting. 
 * @param {Object} _params Parameters of the query (name of the setting).
 */
function deleteSetting_Query(_params) {
	var _query;
	if (_params != null) {
		_query = "DELETE FROM SETTINGS WHERE SETTING_NAME = ?";
	}
	console.log("deleteSetting_Query: " + _query);
	return _query;
}

/**
 * Parameters used to delete a single setting. 
 * @param {Object} _params Parameters of the query (name of the setting).
 */
function deleteSetting_Params(_params) {
	var _paramsFinales = [];
	_paramsFinales[0] = _params.SETTING_NAME;
	return _paramsFinales;
}

function getAllTravels_Query(_params){
	var _query = "SELECT * FROM TRAVELS";
	_query += " ORDER BY TRAVEL_DATE ASC"
	//console.log("getAllTravels_Query: " + _query);
	return _query;
}

function getTravel_Query(_params){
	var _query = "SELECT * FROM TRAVELS";
	if(_params!=null){
		_query = _query +" WHERE TRAVEL_ID = ?";
	}
	_query += " ORDER BY TRAVEL_DATE ASC"
	//console.log("getTravel_Query: " + _query);
	return _query;
}

function getTravel_Params(_params){
	//console.log("getTravel_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.TRAVEL_ID;
	return _paramsFinales;
}



function insertTravel_Query(_params){
	var _query 
	if (_params != null){
		_query = "INSERT INTO TRAVELS (FLIGHT,TRAVEL_DATE,pkSalida,pkLlegada) values (?,?,?,?)";
	}
	//console.log("insertTravel_Query: " + _query);
	return _query; 
	
}

function insertTravel_Params(_params){
	//console.log("insertTravel_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.FLIGHT;
	_paramsFinales[1] = _params.datosConsulta.TRAVEL_DATE.getTime();
	_paramsFinales[2] = _params.datosConsulta.pkSalida;
	_paramsFinales[3] = _params.datosConsulta.pkLlegada;
	
	return _paramsFinales;
}

function deleteTravel_Query(_params){
	var _query;
	if (_params != null){ 
		_query = "DELETE FROM TRAVELS where TRAVEL_ID = ?";
	} 
	//console.log("deleteTravel_Query: " + _query);	
	return _query; 
}

function deleteTravel_Params(_params){	
	//console.log("deleteTravel_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.TRAVEL_ID;	
	return _paramsFinales;
}

function selectNextTravel_Query(_params){
	
	var _query;
	_query = "SELECT * FROM TRAVELS "
	_query += "ORDER BY TRAVEL_DATE ASC LIMIT 1"
	return _query; 
}

function deleteTravelsBefore_Query(_params){
	var _query;
	_query = "DELETE FROM TRAVELS where TRAVEL_DATE < ?";
	return _query; 
}

function deleteTravelsBefore_Params(_params){	
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.TRAVEL_DATE.getTime();
	//console.log(_paramsFinales);
	return _paramsFinales;
}



function updateTravel_Query(_params){
	var _query 
	if (_params != null){
			_query = "UPDATE TRAVELS SET FLIGHT = ?, TRAVEL_DATE = ? , pkSalida = ?, pkLlegada = ? WHERE TRAVEL_ID = ?" ;
	}
	return _query; 
	
}

function updateTravel_Params(_params){
	
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.FLIGHT;
	 _paramsFinales[1] = _params.datosConsulta.TRAVEL_DATE.getTime();
	 _paramsFinales[2] = _params.datosConsulta.pkSalida;
	 _paramsFinales[3] = _params.datosConsulta.pkLlegada;
	 _paramsFinales[4] = _params.datosConsulta.TRAVEL_ID;
	 
	
	return _paramsFinales;
}

function getAllReservations_Query(_params){
	var _query = "SELECT * FROM RESERVATIONS ORDER BY RES_IN_DATE ASC";
	return _query;
}


function insertReservation_Query(_params){
	var _query; 
	if (_params != null){
		// console.log("FJORDAN: insertReservation_Query:" + JSON.stringify(_params));
		_query = "INSERT INTO RESERVATIONS (RES_NAME,RES_PARKING_ID,RES_AIRPORT_ID,RES_IN_DATE,RES_OUT_DATE,RES_PRICE,RES_LOC,RES_MAIL) values (?,?,?,?,?,?,?,?)";
	}
	//console.log("insertReservations_Query: " + _query);
	return _query; 
}

function insertReservation_Params(_params){
	//console.log("FJORDAN: insertReservations_Params:" + JSON.stringify(_params.datosConsulta));
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.RES_NAME;
	_paramsFinales[1] = _params.datosConsulta.RES_PARKING_ID;
	_paramsFinales[2] = _params.datosConsulta.RES_AIRPORT_ID;
	_paramsFinales[3] = _params.datosConsulta.RES_IN_DATE.getTime();
	_paramsFinales[4] = _params.datosConsulta.RES_OUT_DATE.getTime();
	_paramsFinales[5] = _params.datosConsulta.RES_PRICE;
	_paramsFinales[6] = _params.datosConsulta.RES_LOC;
	_paramsFinales[7] = _params.datosConsulta.RES_MAIL;
	
	return _paramsFinales;
}

function deleteReservation_Query(_params){
	var _query;
	if (_params != null){ 
		_query = "DELETE FROM RESERVATIONS where RES_ID = ?";
	} 
	//console.log("deleteReservations_Query: " + _query);	
	return _query; 
}

function deleteReservation_Params(_params){	
	//console.log("deleteReservations_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.RES_ID;	
	return _paramsFinales;
}

function deleteReservationByAllData_Query(_params){
	var _query;
	if (_params != null){ 
		_query = "DELETE FROM RESERVATIONS where RES_MAIL = ? AND RES_LOC = ? AND RES_PARKING_ID = ?";
	} 
	//console.log("deleteReservations_Query: " + _query);	
	return _query; 
}

function deleteReservationByAllData_Params(_params){	
	//console.log("deleteReservations_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.RES_MAIL;	
	_paramsFinales[1] = _params.datosConsulta.RES_LOC;	
	_paramsFinales[2] = _params.datosConsulta.RES_PARKING_ID;	
	return _paramsFinales;
}

function deleteReservationsBefore_Query(_params){
	var _query;
	_query = "DELETE FROM RESERVATIONS where RES_OUT_DATE < ?";
	return _query; 
}

function deleteReservationsBefore_Params(_params){	
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.RES_DATE.getTime();
	//console.log(_paramsFinales);
	return _paramsFinales;
}

function updatePlaza_Query(_params){
	var _query; 
	if (_params != null){
		_query = "UPDATE RESERVATIONS SET RES_PLAZA = ? WHERE RES_ID = ?";
	}
	//console.log("insertReservations_Query: " + _query);
	return _query; 
}

function updatePlaza_Params(_params){
	//console.log("insertReservations_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.RES_PLAZA;
	_paramsFinales[1] = _params.datosConsulta.RES_ID;
	
	return _paramsFinales;
}

function getAllFavouritePOIs_Query(_params){
	var _query = "SELECT * FROM FAVOURITE_POIS";
	//console.log("getAllFavouritePOIs_Query: " + _query);
	return _query;
}

function insertFavouritePOI_Query(_params){
	var _query; 
	if (_params != null){
		_query = "INSERT INTO FAVOURITE_POIS (idPoi) values (?)";
	}
	//console.log("insertFavouritePOI_Query: " + _query);
	return _query; 
	
}

function insertFavouritePOI_Params(_params){
	//console.log("insertFavouritePOI_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.idPoi;
	return _paramsFinales;
}

function deleteFavouritePOI_Query(_params){
	var _query;
	if (_params != null){ 
		_query = "DELETE FROM FAVOURITE_POIS where idPoi = ?";
	} 
	//console.log("deleteFavouritePOI_Query: " + _query);	
	return _query; 
}

function deleteFavouritePOI_Params(_params){	
	//console.log("deleteFavouritePOI_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.idPoi;	
	return _paramsFinales;
}


function getAllNotif_Query(_params){
	var _query = "SELECT * FROM NOTIFICACIONS order by NOTIF_DATE desc LIMIT 20";
	//console.log("getAllNotif_Query: " + _query);
	return _query;
}


function insertNotif_Query(_params){
	var _query; 
	if (_params != null){
		_query = "INSERT INTO NOTIFICACIONS (NOTIF_TYPE_ID,NOTIF_TITLE,NOTIF_MSG,NOTIF_DATE) values (?,?,?,?)";
	}
	//console.log("insertNotif_Query: " + _query);
	return _query; 
	
}

function insertNotif_Params(_params){
	//console.log("insertNotif_Params:" + JSON.stringify(_params.datosConsulta))
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.NOTIF_TYPE_ID;
	_paramsFinales[1] = _params.datosConsulta.NOTIF_TITLE;
	_paramsFinales[2] = _params.datosConsulta.NOTIF_MSG;
	_paramsFinales[3] = _params.datosConsulta.NOTIF_DATE.getTime();
	
	return _paramsFinales;
}

function deleteOldNotifications_Query(_params){
	var _query = "DELETE FROM NOTIFICACIONS where NOTIF_DATE <= ?";
	//console.log("deleteOldNotifications_Query: " + _query);
	return _query;
}

function deleteOldNotifications_Params(_params){
	var _paramsFinales = [];
	_paramsFinales[0] = _params.datosConsulta.NOTIF_DATE.getTime();
	//console.log(_paramsFinales);
	return _paramsFinales;
}


/**
 * Gestor de Preferencias
 */
function _GestorPrefs() {
	var me = this;

	me.setPref = function(key,value){
		return window.localStorage.setItem(key, value);
	};
	
	me.getPref = function(key){
		return window.localStorage.getItem(key);
	};
	
	me.borraPref = function(key){
		return window.localStorage.removeItem(key);
	};
	
	me.clear = function(){
		return window.localStorage.clear();
	};
	
	me.setSesionPref = function(key,value){
		return window.sessionStorage.setItem(key, value);
	};
	
	me.getSesionPref = function(key){
		return window.sessionStorage.getItem(key);
	};
	
	me.borraSessionPref = function(key){
		return window.sessionStorage.removeItem(key);
	};
	
	me.clearSession = function(){
		return window.sessionStorage.clear();
	};
}


var Constantes = {
	'ico_activo' : '_act.png',
	'ico_inactivo' : '_des.png',
	'indoor_ico_width':20,
	'indoor_ico_height':26,
	'indoor_ico_offsety':-26,
	'indoor_ico_opacity':1.0,
	'position_ico_width':26,
	'position_ico_height':43,
	'position_ico_offsety':-43,
	'position_ico_opacity':1.0,
	'OVC_code':'0',
	'BKN_code':'1',
	'SCT_code':'2',
	'FEW_code':'3',
	'url_metar':'http://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&mostRecent=true&hoursBeforeNow=2&stationString=',
	//'GCM_SENDER_ID':'29007690876', //El nuestro
	'GCM_SENDER_ID':'652867984588', //AENA
    'GOOGLE_ANALYTICS_ID': 'UA-22451727-5'
};

var ConstF = {
		'DatabaseNombre' : 'test',
		'DatabaseRev' : '1.0',
		'DataBaseDesc' : 'Test BD',
		'DatabaseTam' : 5*1024*1024,
		'err_timeout' : 'timeout',
		'prioridadBD' : 'bd',
		'prioridadNet' : 'net',
		'prioridadSoloBD' : 'soloBD',
		'prioridadSoloNet' : 'soloNet',
		'resultadoBD' : 'resultBD', //Indica que el resultado se ha sacado de la BD
		'resultadoNet' : 'resultNet', //Indica que el resultado se ha sacado de la red
		
		//'base_WS' : 'http://10.223.1.139:7003/esb/services/aspa', //WIFI
		//'check_WS': 'http://10.223.1.139:7003/esb/services/check', //WIFI
		
		//'base_WS' : 'http://213.0.103.29/esb/services/aspa', //Internet
		//'check_WS': 'http://213.0.103.29/esb/services/check', //Internt
		
		//'base_WS' : 'http://10.223.7.75:19082/esb/services/aspa', // WIFI ¿? (servidor Windows)
		//'check_WS': 'http://10.223.7.75:19082/esb/services/check', / /WIFI ¿? (servidor Windows)
		
		// 'base_WS' : 'http://sc1083.sscc.ae.aena.es:8021/esb/services/aspa', //AENA DES
		// 'check_WS': 'http://sc1083.sscc.ae.aena.es:8021/esb/services/check', //AENA DES
		//'base_WS' : 'http://sscc02julcasti.sscc.ae.aena.es:7001/esb/services/aspa', //DES LOCAL
		//'check_WS': 'http://sscc02julcasti.sscc.ae.aena.es:7001/esb/services/check', //DES LOCAL
		// 'base_WS' : 'http://sscc02julcasti.sscc.ae.aena.es:9082/esb/services/aspa', //DES MULE LOCAL
		// 'check_WS': 'http://sscc02julcasti.sscc.ae.aena.es:9081/esb/services/check', //DES MULE LOCAL
		// 'base_WS' : 'http://mulepr.aena.es:80/esb/services/aspa', //AENA TEST - mulepr
		// 'check_WS': 'http://mulepr.aena.es:80/esb/services/check', //AENA TEST - mulepr
		
        /* URLS Servidores AENA: */
        /* Desarrollo */
        // 'base_WS': 'http://sc1083.sscc.ae.aena.es:8021/esb/services/aspa',
        // 'check_WS': 'http://sc1083.sscc.ae.aena.es:8021/esb/services/check',
    
        /* Pruebas CIS */
         //'base_WS': 'http://aspa.cpiaena.es/esb/services/aspa',
         //'check_WS': 'http://aspa.cpiaena.es/esb/services/check',
		
		/*Test Aena Internet*/
		 //'base_WS': 'https://aspa-test.aena-aeropuertos.es/esb/services/aspa',
		 //'check_WS': 'https://aspa-test.aena-aeropuertos.es/esb/services/check',
    
        /* Preproduccion */
         //'base_WS': 'https://aspapr.aena.es/esb/services/aspa',
         //'check_WS': 'https://aspapr.aena.es/esb/services/check',
    
        /* Produccion */
        'base_WS' : 'https://aspa.aena-aeropuertos.es:443/esb/services/aspa', //AENA PROD
		'check_WS': 'https://aspa.aena-aeropuertos.es:443/esb/services/check', //AENA PROD

        // 'checkConnectionUrl':'http://www.google.com/',
        'checkConnectionUrl':'http://www.aena-aeropuertos.es/csee/Satellite/HomeAenaAeropuertos/',
    
        'versionRelease': '1.5.0.1',
    
		'timeoutBase' : 10*1000, //Timeout para el GET a la base del WS para chequear disponibilidad
		'timeoutRequest' : 1*30*1000, //Timeout para hacer las peticiones al WS
		'POST' : 'POST',
		'GET' : 'GET',
		'JsonContent' : 'application/json; charset=utf-8',
		'JsonTipoDatos' : 'json',
		'POIsCategoryIconsPath':'../../themes/default/common/img/POI_Categories/',
		/* Departures */
		'Dep_HTA_From_Margin':'0',
		'Dep_HTA_To_Margin':'120',
		'Dep_LTA_From_Margin':'0',
		'Dep_LTA_To_Margin':'720',
		/* Arrivals */
		'Arr_HTA_From_Margin':'-10',
		'Arr_HTA_To_Margin':'120',
		'Arr_LTA_From_Margin':'-30',
		'Arr_LTA_To_Margin':'720',
		'Search_To_Margin':'21600',
		'mobileAndroid':'0',
		'mobileIphone':'1',
		'mapUrl': 'airports.map', //Connectis
		//'mapUrl': '/usr/local/apache2/htdocs/aena/airports.map', //AENA
		'delay_contextUpdate':30000,
		'delay_geolocation_maximumAge':0,
		'delay_geolocation_timeout':5000,
		'delay_notificacionsUpdate':30000,
		'delay_positionUpdate':5000,
		'delay_flightPanelUpdate':60000,
		'register_interval':10000,
		'setpushtoken_interval':60000,
		'url_wpa':'http://www.aena-aeropuertos.es/csee/ccurl/cartografia/',
		'noDataString':'-',
		'daysLimitTravels':1, //Dias que se guardan en el planificador antes de expirar los vuelos
		'hoursLimitRes':6, //Horas que se guardan las reservas de parking tras expirar la salida
		'daysShowCodbar':1, //Dias anteriores al vuelo en el que salen cosas en la codbar
		'daysNotifications':2, //Dias que se guardan las notificaciones
		'daysUpdateAirports':2, //Dias cada cuales se actualizan los aeropuertos
		'PREF_AEROPUERTOS':'LIST_AEROPUERTOS',
		'PREF_TERMINALES':'LIST_TERMINALES',
		'PREF_FLOORS':'LIST_FLOORS',
		'PREF_LAST_UPDATE_AIRPORTS':'LAST_DATE_AIRPORTS',
		'flightNumberSearchPageSize': 10,
		'departureSearchPageSize': 20,
		'arriveSearchPageSize': 20,
		'codbarMaxiumAge': 5*60*1000, //edad maxima de la codbar antes de sacar Actualizando
		'flightDataMaxiumAge': 5*60*1000, //edad maxima de los datos de vuelos antes de sacar error
		'checkNextTravelSeparationTime': 1*60*1000,
		'zoom3D': 2,
		'zoom2D': 18,
		'checkConnectionTimeout':15*1000,
		'timeAfterNextAttemptToGetDetail':10*1000, //Tiempo que tarda en volver a invocar el detalle de vuelo si casca, en la comprobacion de vuelos pegados
		'timeBetweenFlightsPlannified':12*60*60*1000, //Tiempo entre vuelos planificados para que salte el popup de cambiar de vuelo
		'PoisTypes': [ /*Parking*/
						{'POI_TYPE_ID':'parking-bajo-coste','POI_TYPE_DESC':{'es_ES':'Parking de bajo coste','en_GB':'Low-cost car park'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parking-express','POI_TYPE_DESC':{'es_ES':'Parking express','en_GB':'Express parking'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parking-larga-estancia','POI_TYPE_DESC':{'es_ES':'Parking de larga estancia','en_GB':'Long-stay car park'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parking-motocicletas','POI_TYPE_DESC':{'es_ES':'Parking de motocicletas','en_GB':'Motorcycle parking'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parking-pmr','POI_TYPE_DESC':{'es_ES':'Parking PMR','en_GB':'PRM Parking'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parkings','POI_TYPE_DESC':{'es_ES':'Parking general','en_GB':'General car park'},'POI_CATEGORY_ID':'parking'},
						{'POI_TYPE_ID':'parking-vip','POI_TYPE_DESC':{'es_ES':'Parking VIP','en_GB':'VIP parking'},'POI_CATEGORY_ID':'parking'},
						/*Sala Vip*/
						{'POI_TYPE_ID':'centro-negocios','POI_TYPE_DESC':{'es_ES':'Centro de negocios','en_GB':'Business centre'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						{'POI_TYPE_ID':'informacion-empresas','POI_TYPE_DESC':{'es_ES':'Información empresarial','en_GB':'Business information'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						{'POI_TYPE_ID':'sala-personalidades','POI_TYPE_DESC':{'es_ES':'Sala de personalidades','en_GB':'VIP lounge'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						{'POI_TYPE_ID':'sala-prensa','POI_TYPE_DESC':{'es_ES':'Prensa','en_GB':'Press'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						{'POI_TYPE_ID':'sala-reuniones','POI_TYPE_DESC':{'es_ES':'Sala de reuniones','en_GB':'Meeting room'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						{'POI_TYPE_ID':'sala-vip','POI_TYPE_DESC':{'es_ES':'Sala VIP','en_GB':'VIP lounge'},'POI_CATEGORY_ID':'sala-vip-centro-reuniones'},
						/*Alquiler Coches*/
						{'POI_TYPE_ID':'compania-alquiler-coches','POI_TYPE_DESC':{'es_ES':'Oficinas de alquiler de coches','en_GB':'Car hire offices.'},'POI_CATEGORY_ID':'alquiler-coches'},
						/*Tiendas ocio*/
						{'POI_TYPE_ID':'alimentacion','POI_TYPE_DESC':{'es_ES':'Alimentación','en_GB':'Food'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'articulos-bebes','POI_TYPE_DESC':{'es_ES':'Artículos para bebés','en_GB':'Items for babies'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'botiquin-farmacia','POI_TYPE_DESC':{'es_ES':'Botiquín de farmacia','en_GB':'Pharmacy shop'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'cambio-moneda','POI_TYPE_DESC':{'es_ES':'Cambio de moneda','en_GB':'Currency exchange'},'POI_CATEGORY_ID':'servicios-bancarios'},
						{'POI_TYPE_ID':'duty-free','POI_TYPE_DESC':{'es_ES':'Duty Free','en_GB':'Duty Free'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'farmacia','POI_TYPE_DESC':{'es_ES':'Farmacia','en_GB':'Pharmacy'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'floristeria','POI_TYPE_DESC':{'es_ES':'Floristería','en_GB':'Florist'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'hogar','POI_TYPE_DESC':{'es_ES':'Regalos y hogar','en_GB':'Gifts and home'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'joyeria-bisuteria','POI_TYPE_DESC':{'es_ES':'Joyería y bisutería','en_GB':'Jewellery and costume jewellery'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'loteria-apuestas','POI_TYPE_DESC':{'es_ES':'Loteria y apuestas','en_GB':'Lottery and betting'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'moda-complementos','POI_TYPE_DESC':{'es_ES':'Moda y complementos','en_GB':'Fashion and accessories'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'multitienda','POI_TYPE_DESC':{'es_ES':'Multitienda','en_GB':'Multi-shop'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'ocio-entretenimiento','POI_TYPE_DESC':{'es_ES':'Ocio y entretenimiento','en_GB':'Leisure and entertainment'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'optica','POI_TYPE_DESC':{'es_ES':'Óptica','en_GB':'Optician'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'parafarmacia','POI_TYPE_DESC':{'es_ES':'Parafarmacia','en_GB':'Parapharmacy'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'peluqueria','POI_TYPE_DESC':{'es_ES':'Peluquería','en_GB':'Hairdresser'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'perfumeria-cosmetica','POI_TYPE_DESC':{'es_ES':'Perfumería y cosmética','en_GB':'Perfumery and cosmetics'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'prensa-libros','POI_TYPE_DESC':{'es_ES':'Prensa y libros','en_GB':'Press and books'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'spa','POI_TYPE_DESC':{'es_ES':'Spa-Centro termal','en_GB':'Spa-wellness centre'},'POI_CATEGORY_ID':'tiendas-ocio'},
						{'POI_TYPE_ID':'tabaco','POI_TYPE_DESC':{'es_ES':'Tabaco','en_GB':'Tobacco'},'POI_CATEGORY_ID':'tiendas-ocio'},
						/*Restaurantes y Cafeterias*/
						{'POI_TYPE_ID':'bares-cafeterias','POI_TYPE_DESC':{'es_ES':'Bares y cafeterías','en_GB':'Bars and cafeterias'},'POI_CATEGORY_ID':'restaurantes-cafeterias'},
						{'POI_TYPE_ID':'restaurantes-cafeterias','POI_TYPE_DESC':{'es_ES':'Restaurantes y comida rápida','en_GB':'Restaurants and fast food'},'POI_CATEGORY_ID':'restaurantes-cafeterias'},
						/*PMR*/
						{'POI_TYPE_ID':'informacion-pmr','POI_TYPE_DESC':{'es_ES':'Información PMR','en_GB':'PRM information'},'POI_CATEGORY_ID':'personas-movilidad-reducida'},
						{'POI_TYPE_ID':'parking-pmr','POI_TYPE_DESC':{'es_ES':'Parking PMR','en_GB':'PRM Parking'},'POI_CATEGORY_ID':'personas-movilidad-reducida'},
						{'POI_TYPE_ID':'personas-discapacidad-auditiva','POI_TYPE_DESC':{'es_ES':'Personas discapacidad auditiva','en_GB':'People with hearing impairment'},'POI_CATEGORY_ID':'personas-movilidad-reducida'},
						{'POI_TYPE_ID':'punto-encuentro-pmr','POI_TYPE_DESC':{'es_ES':'Puntos de encuentro PMR','en_GB':'PRM meeting points'},'POI_CATEGORY_ID':'personas-movilidad-reducida'},
						/*Transportes y accessos*/
						{'POI_TYPE_ID':'autobus','POI_TYPE_DESC':{'es_ES':'Autobús','en_GB':'Bus'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'autobus-lanzadera','POI_TYPE_DESC':{'es_ES':'Conexión entre terminales','en_GB':'Connections between terminals'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'informacion-transportes','POI_TYPE_DESC':{'es_ES':'Información de transportes','en_GB':'Transport info'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'intercambiador-transportes','POI_TYPE_DESC':{'es_ES':'Intercambiador de transportes','en_GB':'Transportation hub'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'mar','POI_TYPE_DESC':{'es_ES':'Puerto','en_GB':'Port'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'metro','POI_TYPE_DESC':{'es_ES':'Metro','en_GB':'Underground'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'taxi','POI_TYPE_DESC':{'es_ES':'Taxi','en_GB':'Taxis'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'tren','POI_TYPE_DESC':{'es_ES':'Tren','en_GB':'Trains'},'POI_CATEGORY_ID':'transportes-accesos'},
						{'POI_TYPE_ID':'tren-entre-terminales','POI_TYPE_DESC':{'es_ES':'Tren entre terminales','en_GB':'Train between terminals'},'POI_CATEGORY_ID':'transportes-accesos'},
						/*Informacion*/
						{'POI_TYPE_ID':'agencia-viajes','POI_TYPE_DESC':{'es_ES':'Agencia de viajes','en_GB':'Travel agency'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'equipaje-extraviado','POI_TYPE_DESC':{'es_ES':'Equipaje extraviado','en_GB':'Lost luggage'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'hotel','POI_TYPE_DESC':{'es_ES':'Hoteles','en_GB':'Hotels'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'informacion-companias-aereas','POI_TYPE_DESC':{'es_ES':'Información de compañías aéreas','en_GB':'Airline information'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'informacion-general-aena','POI_TYPE_DESC':{'es_ES':'Información de Aena','en_GB':'Aena information'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'informacion-pmr','POI_TYPE_DESC':{'es_ES':'Información PMR','en_GB':'PRM information'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'informacion-transitos','POI_TYPE_DESC':{'es_ES':'Información de conexión de vuelos','en_GB':'Connecting flight information'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'informacion-turistica','POI_TYPE_DESC':{'es_ES':'Información turística','en_GB':'Tourist information'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'objetos-perdidos','POI_TYPE_DESC':{'es_ES':'Objetos perdidos','en_GB':'Lost property'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'punto-encuentro','POI_TYPE_DESC':{'es_ES':'Punto de encuentro','en_GB':'Meeting point'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'reserva-hoteles','POI_TYPE_DESC':{'es_ES':'Reserva hoteles','en_GB':'Hotel bookings'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'touroperadores','POI_TYPE_DESC':{'es_ES':'Touroperadores','en_GB':'Tour operators'},'POI_CATEGORY_ID':'informacion'},
						{'POI_TYPE_ID':'venta-billetes','POI_TYPE_DESC':{'es_ES':'Venta de billetes','en_GB':'Ticket sales'},'POI_CATEGORY_ID':'informacion'},
						/*Otros servicios*/
						{'POI_TYPE_ID':'aseos','POI_TYPE_DESC':{'es_ES':'Aseos','en_GB':'Toilets'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'banco','POI_TYPE_DESC':{'es_ES':'Banco','en_GB':'Bank'},'POI_CATEGORY_ID':'servicios-bancarios'},
						{'POI_TYPE_ID':'cajero-automatico','POI_TYPE_DESC':{'es_ES':'Cajeros automáticos','en_GB':'ATMs'},'POI_CATEGORY_ID':'servicios-bancarios'},
						{'POI_TYPE_ID':'capilla','POI_TYPE_DESC':{'es_ES':'Capilla','en_GB':'Chapel'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'correos','POI_TYPE_DESC':{'es_ES':'Correos','en_GB':'Post office'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'desfibriladores','POI_TYPE_DESC':{'es_ES':'Desfibriladores','en_GB':'Defibrillators'},'POI_CATEGORY_ID':'servicios-medicos'},
						{'POI_TYPE_ID':'fuerzas-seguridad','POI_TYPE_DESC':{'es_ES':'Fuerzas de seguridad','en_GB':'Security personnel'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'guarderia-zona-juegos','POI_TYPE_DESC':{'es_ES':'Guardería y zona de juegos','en_GB':'Nursery and play area'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'internet','POI_TYPE_DESC':{'es_ES':'Internet','en_GB':'Internet'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'intervencion-armas','POI_TYPE_DESC':{'es_ES':'Intervención de armas','en_GB':'Weapons Inspection'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'maquina-expendedora','POI_TYPE_DESC':{'es_ES':'Máquinas expendedoras','en_GB':'Vending machines'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'maquina-recarga-moviles','POI_TYPE_DESC':{'es_ES':'Máquina de recarga de móviles','en_GB':'Mobile phone charging machine'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'mezquita','POI_TYPE_DESC':{'es_ES':'Mezquita','en_GB':'Mosque'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'ocio-cultura','POI_TYPE_DESC':{'es_ES':'Ocio y cultura','en_GB':'Leisure and culture'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'primeros-auxilios','POI_TYPE_DESC':{'es_ES':'Primeros auxilios','en_GB':'First aid'},'POI_CATEGORY_ID':'servicios-medicos'},
						{'POI_TYPE_ID':'punto-fumadores','POI_TYPE_DESC':{'es_ES':'Punto de fumadores','en_GB':'Smoking area'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'sala-bebes','POI_TYPE_DESC':{'es_ES':'Sala de bebés','en_GB':'Baby lounge'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'sala-menores-no-acompanados','POI_TYPE_DESC':{'es_ES':'Sala de menores no acompañados','en_GB':'Unaccompanied child lounge'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'sala-multiconfesional','POI_TYPE_DESC':{'es_ES':'Sala multiconfesional','en_GB':'Multidenominational lounge'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'servicio-medico','POI_TYPE_DESC':{'es_ES':'Servicio médico','en_GB':'Medical service'},'POI_CATEGORY_ID':'servicios-medicos'},
						{'POI_TYPE_ID':'sillas-bebes','POI_TYPE_DESC':{'es_ES':'Sillas bebés','en_GB':'Pushchairs'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'telefono-publico','POI_TYPE_DESC':{'es_ES':'Teléfono público','en_GB':'Public payphone'},'POI_CATEGORY_ID':'otros-servicios'},
						{'POI_TYPE_ID':'transporte-mercancias','POI_TYPE_DESC':{'es_ES':'Transporte de mercancías','en_GB':'Goods transport'},'POI_CATEGORY_ID':'otros-servicios'},
						/*Zona llegada/salida*/
						{'POI_TYPE_ID':'aduana','POI_TYPE_DESC':{'es_ES':'Aduana','en_GB':'Customs'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'auto-check-in','POI_TYPE_DESC':{'es_ES':'Máquinas de auto check-in','en_GB':'Automatic check-in machines'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'control-pasaportes-llegadas','POI_TYPE_DESC':{'es_ES':'Control de pasaportes de llegadas','en_GB':'Arrival passport control'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'control-pasaportes-salidas','POI_TYPE_DESC':{'es_ES':'Control de pasaportes de salidas','en_GB':'Departure passport control'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'control-pasaportes-transito','POI_TYPE_DESC':{'es_ES':'Control de pasaportes de tránsito','en_GB':'Transit passport control'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'control-seguridad','POI_TYPE_DESC':{'es_ES':'Control de seguridad','en_GB':'Security checks'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'control-seguridad-transito','POI_TYPE_DESC':{'es_ES':'Control de seguridad pasajeros en tránsito','en_GB':'Security checkpoint for passengers in transit'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'facturacion','POI_TYPE_DESC':{'es_ES':'Mostradores','en_GB':'Desks'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'puerta-embarque','POI_TYPE_DESC':{'es_ES':'Puertas de embarque','en_GB':'Boarding gates'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'recogida-equipaje','POI_TYPE_DESC':{'es_ES':'Recogida de equipaje','en_GB':'Baggage reclaim'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'sala-embarque','POI_TYPE_DESC':{'es_ES':'Zonas de embarque','en_GB':'Boarding area'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'vestibulo-llegadas','POI_TYPE_DESC':{'es_ES':'Vestíbulo de llegadas','en_GB':'Arrivals lobby'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'vestibulo-llegadas-helipuerto','POI_TYPE_DESC':{'es_ES':'Vestíbulo de llegadas','en_GB':'Arrivals lobby'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'vestibulo-salidas','POI_TYPE_DESC':{'es_ES':'Vestíbulo de salidas','en_GB':'Departures lobby'},'POI_CATEGORY_ID':'zona-llegada-salida'},
						{'POI_TYPE_ID':'zonas-embarque-helipuerto','POI_TYPE_DESC':{'es_ES':'Zonas de embarque','en_GB':'Boarding area'},'POI_CATEGORY_ID':'zona-llegada-salida'},
				   ],
		'PoisCategories':[
							{'POI_CATEGORY_ID':'parking','POI_CATEGORY_DESC':{'es_ES':'Parking','en_GB':'Parking'},'POI_CATEGORY_ICON_CHK':'poi_parking_act.png','POI_CATEGORY_ICON_UNCHK':'poi_parking_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_parking_mix.png','MENUSWIPE_INDEX':0},
							{'POI_CATEGORY_ID':'sala-vip-centro-reuniones','POI_CATEGORY_DESC':{'es_ES':'Salas VIP y Centros de reuniones','en_GB':'VIP and Meeting Rooms'},'POI_CATEGORY_ICON_CHK':'poi_salas_vip_act.png','POI_CATEGORY_ICON_UNCHK':'poi_salas_vip_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_salas_vip_mix.png','MENUSWIPE_INDEX':1},
							{'POI_CATEGORY_ID':'alquiler-coches','POI_CATEGORY_DESC':{'es_ES':'Alquiler de Coches','en_GB':'Rent a Car'},'POI_CATEGORY_ICON_CHK':'poi_alquiler_coches_act.png','POI_CATEGORY_ICON_UNCHK':'poi_alquiler_coches_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_alquiler_coches_mix.png','MENUSWIPE_INDEX':2},
							{'POI_CATEGORY_ID':'tiendas-ocio','POI_CATEGORY_DESC':{'es_ES':'Tiendas y Ocio','en_GB':'Shopping'},'POI_CATEGORY_ICON_CHK':'poi_zona_comercial_act.png','POI_CATEGORY_ICON_UNCHK':'poi_zona_comercial_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_zona_comercial_mix.png','MENUSWIPE_INDEX':3},
							{'POI_CATEGORY_ID':'restaurantes-cafeterias','POI_CATEGORY_DESC':{'es_ES':'Restaurantes y Cafeterías','en_GB':'Restaurants'},'POI_CATEGORY_ICON_CHK':'poi_restaurantes_act.png','POI_CATEGORY_ICON_UNCHK':'poi_restaurantes_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_restaurantes_mix.png','MENUSWIPE_INDEX':4},
							{'POI_CATEGORY_ID':'personas-movilidad-reducida','POI_CATEGORY_DESC':{'es_ES':'PMRs','en_GB':'PRMs'},'POI_CATEGORY_ICON_CHK':'poi_pmr_act.png','POI_CATEGORY_ICON_UNCHK':'poi_pmr_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_pmr_mix.png','MENUSWIPE_INDEX':5},
							{'POI_CATEGORY_ID':'transportes-accesos','POI_CATEGORY_DESC':{'es_ES':'Transportes y Accesos','en_GB':'Transports and Access'},'POI_CATEGORY_ICON_CHK':'poi_transportes_act.png','POI_CATEGORY_ICON_UNCHK':'poi_transportes_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_transportes_mix.png','MENUSWIPE_INDEX':6},
							{'POI_CATEGORY_ID':'informacion','POI_CATEGORY_DESC':{'es_ES':'Mostradores de Información','en_GB':'Information desks'},'POI_CATEGORY_ICON_CHK':'poi_mostradores_info_act.png','POI_CATEGORY_ICON_UNCHK':'poi_mostradores_info_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_mostradores_info_mix.png','MENUSWIPE_INDEX':7},
							{'POI_CATEGORY_ID':'zona-llegada-salida','POI_CATEGORY_DESC':{'es_ES':'Zona de llegada/salida','en_GB':'Arrivals/Departure Area'},'POI_CATEGORY_ICON_CHK':'poi_llegadas_y_salidas_act.png','POI_CATEGORY_ICON_UNCHK':'poi_llegadas_y_salidas_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_llegadas_y_salidas_mix.png','MENUSWIPE_INDEX':8},
							{'POI_CATEGORY_ID':'otros-servicios','POI_CATEGORY_DESC':{'es_ES':'Otros Servicios','en_GB':'Other services'},'POI_CATEGORY_ICON_CHK':'poi_otros_servicios_act.png','POI_CATEGORY_ICON_UNCHK':'poi_otros_servicios_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_otros_servicios_mix.png','MENUSWIPE_INDEX':9},						
							{'POI_CATEGORY_ID':'servicios-bancarios','POI_CATEGORY_DESC':{'es_ES':'Servicios Bancarios','en_GB':'Banking services'},'POI_CATEGORY_ICON_CHK':'poi_banca_act.png','POI_CATEGORY_ICON_UNCHK':'poi_banca_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_banca_mix.png','MENUSWIPE_INDEX':10},
							{'POI_CATEGORY_ID':'servicios-medicos','POI_CATEGORY_DESC':{'es_ES':'Servicios Médicos','en_GB':'Medical services'},'POI_CATEGORY_ICON_CHK':'poi_servicios_medicos_act.png','POI_CATEGORY_ICON_UNCHK':'poi_servicios_medicos_des.png','POI_CATEGORY_ICON_PARTIALCHK':'poi_servicios_medicos_mix.png','MENUSWIPE_INDEX':11},
				   ],
		'infoPasajeroWeb': {
			"es_ES": 'http://www.aena-aeropuertos.es/csee/Satellite/aeropuertos/es/Page/1046686258511/Pasajeros.html',
			"en_GB": 'http://www.aena-aeropuertos.es/csee/Satellite/aeropuertos/en/Page/1046686258511/Passengers.html'
		},
		'notifFlightType':'1',
		'analyticsBoolSi':'Si',
		'analyticsBoolNo':'No',
	    // URLS
	    // PRODUCCION:		
	    'urlParking':'https://parking.aena-aeropuertos.es/espmobilenewbooking/startpage.aspx?utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles',
	    'urlTermsAndConditions': {
			"es_ES": "https://parking.aena-aeropuertos.es/espmobilenewbooking/BookingTermsAndConditions.aspx?nw=1&lang=ES&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "https://parking.aena-aeropuertos.es/espmobilenewbooking/BookingTermsAndConditions.aspx?nw=1&lang=UK&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
		'urlCancelParking': {
			"es_ES": "https://parking.aena-aeropuertos.es/aenaespmyb/enamendvalidate.aspx?utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "https://parking.aena-aeropuertos.es/aenaespmyb/enamendvalidate.aspx?utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
		'urlLanguageChanger': {
			"es_ES": "https://parking.aena-aeropuertos.es/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=esamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "https://parking.aena-aeropuertos.es/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=enamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
	    
	    // DESARROLLO
		/*
		'urlParking':'http://aenaspain.chauntrylab2.com/espmobilenewbooking/startpage.aspx?utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles',
		'urlTermsAndConditions': {
			"es_ES": "http://aenaspain.chauntrylab2.com/espmobilenewbooking/BookingTermsAndConditions.aspx?lang=ES&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "http://aenaspain.chauntrylab2.com/espmobilenewbooking/BookingTermsAndConditions.aspx?lang=UK&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
	    'urlCancelParking': {
			"es_ES": "http://aenaspain.chauntrylab2.com/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=esamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "http://aenaspain.chauntrylab2.com/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=enamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
		'urlLanguageChanger': {
			"es_ES": "http://aenaspain.chauntrylab2.com/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=esamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles",
			"en_GB": "http://aenaspain.chauntrylab2.com/aenaespmyb/responder.aspx?func=ChangeLanguage&rval=enamendvalidate&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles"
		},
	    */
	    // DESARROLLO -> 'urlParking':'http://aenaspain.chauntrylab2.com/espmobilenewbooking/startpage.aspx?utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles',
	    // 'urlParking':'http://10.223.1.139:7003/esb/ChauntryDummy.html',
		// TEST DUMMY -> 'urlParking':'http://www.laisla.fm/test/ChauntryDummy.html',
		// 'urlCancelParking':'http://aenaspain.chauntrylab2.com/aenaespmyb/amendvalidate.aspx',
		// 'urlCancelParking':'https://parking.aena-aeropuertos.es/aenaespmyb/AmendValidate.aspx',
	    
		'urlSalasVIP': {
			'es_ES': 'https://wwwssl.aena-aeropuertos.es/csee/Satellite?pagename=Compra_accesos_salas_vip&Language=ES_ES&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles',
			'en_GB': 'https://wwwssl.aena-aeropuertos.es/csee/Satellite?pagename=Compra_accesos_salas_vip&Language=EN_GB&utm_source=ASPA&utm_medium=App%2BASPA&utm_campaign=Moviles',	
		},
		'urlWifi': {
			'LCG': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-A-Coruna/es/Page/1237560566076/1237560661054/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-A-Coruna/en/Page/1237560566076/1237560661054/'
			},
			'ALC': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Alicante/es/Page/1237560866822/1237560866807/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Alicante/en/Page/1237560866822/1237560866807/'
			},
			'LEI': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Almeria/es/Page/1237560714906/1237560714876/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Almeria/en/Page/1237560714906/1237560714876/'
			},
			'OVD': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Asturias/es/Page/1237560776106/1237560776098/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Asturias/en/Page/1237560776106/1237560776098/'
			},
			'BCN': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Barcelona/es/Page/1237561190526/1237561190259/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Barcelona/en/Page/1237561190526/1237561190259/'
			},
			'BIO': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Bilbao/es/Page/1237563485225/1237563485215/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Bilbao/en/Page/1237563485225/1237563485215/'
			},
			'GRX': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Federico-Garcia-Lorca-Granada-Jaen/es/Page/1237560663420/1237560663331/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Federico-Garcia-Lorca-Granada-Jaen/en/Page/1237560663420/1237560663331/'
			},
			'FUE': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Fuerteventura/es/Page/1237560527956/1237560526834/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Fuerteventura/en/Page/1237560527956/1237560526834/'
			},
			'GRO': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Girona-Costa-Brava/es/Page/1237560584623/1237560584601/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Girona-Costa-Brava/en/Page/1237560584623/1237560584601/'
			},
			'LPA': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Gran-Canaria/es/Page/1237560723401/1237560722538/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Gran-Canaria/en/Page/1237560723401/1237560722538/'
			},
			'IBZ': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Ibiza/es/Page/1237560505592/Wi-Fi.html#Wi-Fi',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Ibiza/en/Page/1237560505592/Wi-Fi.html#Wi-Fi'
			},
			'XRY': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Jerez/es/Page/1237560692824/1237560692668/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Jerez/en/Page/1237560692824/1237560692668/'
			},
			'ACE': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Lanzarote/es/Page/1237560490408/1237560490309/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Lanzarote/en/Page/1237560490408/1237560490309/'
			},
			'SPC': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-La-Palma/es/Page/1237560486502/1237560594034/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-La-Palma/en/Page/1237560486502/1237560594034/'
			},
			'LEN': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Leon/es/Page/1237560562327/1237560614679/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Leon/en/Page/1237560562327/1237560614679/'
			},
			'MAD': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Madrid-Barajas/es/Page/1237560969566/1237560969504/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Madrid-Barajas/en/Page/1237560969566/1237560969504/'
			},
			'AGP': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Malaga/es/Page/1237560944234/1237560928114/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Malaga/en/Page/1237560944234/1237560928114/'
			},
			'MAH': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Menorca/es/Page/1237560546676/1237560545853/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Menorca/en/Page/1237560546676/1237560545853/'
			},
			'PMI': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Palma-Mallorca/es/Page/1237560768257/1237560767372/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Palma-Mallorca/en/Page/1237560768257/1237560767372/'
			},
			'REU': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Reus/es/Page/1237560518515/1237560517630/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Reus/en/Page/1237560518515/1237560517630/'
			},
			'SDR': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Santander/es/Page/1237560546656/1237560546215/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Santander/en/Page/1237560546656/1237560546215/'
			},
			'SCQ': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Santiago/es/Page/1237560579103/1237560579095/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Santiago/en/Page/1237560579103/1237560579095/'
			},
			'SVQ': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Sevilla/es/Page/1237560766668/1237560766660/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Sevilla/en/Page/1237560766668/1237560766660/'
			},
			'TFN': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Tenerife-Norte/es/Page/1237560556109/1237560555428/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Tenerife-Norte/en/Page/1237560556109/1237560555428/'
			},
			'TFS': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Tenerife-Sur/es/Page/1237560683273/1237560567652/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Tenerife-Sur/en/Page/1237560683273/1237560567652/'
			},
			'VLC': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Valencia/es/Page/1237560828060/1237560828052/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Valencia/en/Page/1237560828060/1237560828052/'
			},
			'VGO': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Vigo/es/Page/1237560569423/1237560569404/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Vigo/en/Page/1237560569423/1237560569404/'
			},
			'ZAZ': {
				'es_ES': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Zaragoza/es/Page/1237560521951/1237560685856/',
				'en_GB': 'http://www.aena-aeropuertos.es/csee/Satellite/Aeropuerto-Zaragoza/en/Page/1237560521951/1237560685856/'
			}
		}
	};



var pushNotification;


function _GestorPush() {
	
	
	var me = this;
	
	me.init = function(){
		
		pushNotification = window.plugins.pushNotification;
		
		var token = me.getPushToken();
        console.log("PUSH ------- PushNotificationPlugin: " + pushNotification);
		console.log("PUSH ------- TENEMOS EL TOKEN ->  "+ token);
		
		//if(!$.objectHasContent(token)){
			me.register();//Se llama siempre porque puede ser neceario
		//}
	}
	
	me.getPushToken = function(){
		return GestorContexto.CONTEXT().UC_PUSH_TOKEN;
	}
	
	me.setPushToken = function(token){
        console.log("PUSH ------- setPushToken: " + token);
		GestorContexto.setPushTokenContext(token);
	}
	
	me.unregister = function(){
		if(me.getPushToken().length > 0){
			pushNotification.unregister(callbackSuccessUnreg, callbackFailUnreg);
		}
	}
	
	me.register = function(){
		
        console.log("PUSH ------- Register for Platform: " + device.platform);
		if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){

		    pushNotification.register(
		    		callbackSuccessReg,
		    		callbackFailReg,
		    {
		        "senderID":Constantes.GCM_SENDER_ID,
		        "ecb":"onNotification"
		    });
		} else {
		    pushNotification.register(
		    tokenHandler,
		    callbackFailReg,
		    {
		        "badge":"true",
		        "sound":"true",
		        "alert":"true",
		        "ecb":"onNotificationAPN"
		    });
		}
		
	}
	
//	me.getPendingNotifications = function(okCB,errorCB){
//		//alert('Llamamos a getPendingNotifications');
//		window.GCM.getPendingNotifications(function(e){
//			var notifs = JSON.parse(e);
//			//alert('Tenemos '+ notifs.length + ' notificaciones pendientes - ' + JSON.stringify(e));
//			okCB(notifs);
//		},errorCB);
//	}
		
}



//Solicitado RegId a google
function callbackSuccessReg(e){
	console.log("PUSH ------- We have successfully registered: " + JSON.stringify(e));
}

function callbackFailReg(e){
	console.log("PUSH ------- Failed registration -> " + JSON.stringify(e));
}

function callbackSuccessUnreg(e){
	console.log("PUSH ------- Unregistered: " + JSON.stringify(e));
}

function callbackFailUnreg(e){
	console.log("PUSH ------- Failed unregistration -> " + JSON.stringify(e));
}	

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log("PUSH ------- device token = " + result);
    console.log("PUSH ------- Registrado en Apple: " + result);
    
    GestorPush.setPushToken(result);
}

//iOS
function onNotificationAPN (e) {
    console.log("onNotificationAPN : " + JSON.stringify(e));
    if ( e.alert )
    {
        var msg = {"payload":
            {
            "type": e.type,
            "title": e.title || '',
            "msg": e.alert
            }
        };

        console.log("onNotificationAPN : msg : " + JSON.stringify(msg));
        GestorNotificaciones.handleMessage(msg);

        // navigator.notification.alert("GestorPUSH - onNotificationAPN" + e.alert);
    }

    if ( e.sound )
    {
        var snd = new Media(e.sound);
        snd.play();
    }

    if ( e.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, e.badge);
    }
}

//Para el resto
function onNotification(e) {
	
	console.log("PUSH ------- PUSH:"+JSON.stringify(e));

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
        	GestorPush.setPushToken(e.regid);
        	console.log('PUSH ------- Registrado:' + e.regid);            
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            console.log('PUSH ------- Handle INLINE Message:' + e.payload.msg);
            GestorNotificaciones.handleMessage(e);
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                console.log('PUSH ------- Handle COLDSTART Message:' + e.payload.msg);
                GestorNotificaciones.handleMessage(e);
            }
            else
            {
            	console.log('PUSH ------- Handle BACKGROUND Message:' + e.payload.msg);
                GestorNotificaciones.handleMessage(e);
            }
        }
        /*
         * Con PhoneGap no funciona siempre, se intenta reproducir desde codigo nativo: GCMIntentService
        if ( e.sound )
        {
        	console.log('PUSH ------- SOUND: ' + e.sound);
            var snd = new Media(e.sound, function(e) {
            	console.log('PUSH ------- SOUND: Success: ' + JSON.stringify(e));
            }, function(e) {
            	console.log('PUSH ------- SOUND: Error: ' + JSON.stringify(e));
            });
            snd.play();
        }
        */
    break;

    case 'error':
    	 console.log('PUSH ------- MSG Error:' + e.msg);
    break;

    default:
    	 console.log('PUSH ------- Evento desconocido');
    break;
  }
}





function _GestorCod2D() {
	
	var me = this;
	var result;

	me.readBarcode = function(){
		result = null;
		
		//Initialize decoder with default params	
   		BarcodeScanner.MWBinitDecoder(function(){
   			
			BarcodeScanner.MWBsetActiveCodes(MWB_CODE_MASK_PDF);
			BarcodeScanner.MWBsetLevel(2);
   			BarcodeScanner.MWBsetFlags(MWB_CODE_MASK_PDF);

			// Call the barcode scanner screen
			 BarcodeScanner.MWBstartScanning(function(result) 
   			 {
				 
                if (result.type == 'Cancel'){
                    //Perform some action on scanning canceled if needed
                } else
				if (result && result.code){
					
					  var result = decode2D(result.code);
					  console.log("Readed"+JSON.stringify(result));
					  //Invocamos directamente a las funciones de buscar_vuelos
					  GestorCod2D.setResult(result);
					  _searchMode = 'cod2D';
					  searchFlights();
					
				}
                        
			 });



		});

	}
	
	me.setResult = function(res){
		result = res;
	}

	me.getResult = function(){
		return result;
	}
	
}



				$('#detalle_poi').on('pageshow',function(event){
					initPage(this);
					reloadMap = true;
					trackPage();
					var _airp = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
					$('#airport_Id').html(_airp.AIRPORT_NAME);
					$('#poiDetail').css('display','none');
					paintUpperIconMessage('waitingPoiDetail',GestorIdiomas.getLiteral('loadingMessage'),'controlSectionDark','../../themes/default/common/img/ajax-loader.gif','controlSectionHeader');
					
					loadPOIDetails();
					
					autoScrollPageContentRole('detalle_poi');
	      		});
	      		
	      		//Devuelve array en formato: {cabecera:titulo,tlf:[]}
	      		//Si no se parsea bien: []
	      		function parseTlf(tlfString){
	      			var res = [];
	      			//Lo primero hacemos un trim porque no me fio nada...
	      			tlfString.replace(/^\s+/g,'').replace(/\s+$/g,'');
	      			while(tlfString.length>0){
	      				//Cazamos el <dt>
	      				var punteroInicio = tlfString.indexOf('<dt>');
	      				var punteroFin = tlfString.indexOf('</dt>');
	      				if(punteroInicio!=-1&&punteroFin!=-1){
	      					punteroInicio += '<dt>'.length;
	      					var titulo = {'cabecera':tlfString.slice(punteroInicio,punteroFin),'tlf':[]};
	      					//Nos cargamos el <dt></dt> procesado y ahora nos quedamos con el <dd>
	      					punteroFin += '</dt>'.length;
	      					tlfString = tlfString.substr(punteroFin);
	      					punteroInicio = tlfString.indexOf('<dd>')+'<dd>'.length;
	      					punteroFin = tlfString.indexOf('</dd>');
	      					var telefonos = tlfString.slice(punteroInicio,punteroFin);
	      					if(telefonos.indexOf('<ul>')!=-1){ //Es una lista
	      						//quitamos los ul
	      						var ulIn = telefonos.indexOf('<ul>');
	      						var ulEnd = telefonos.indexOf('</ul>');
	      						telefonos = telefonos.slice(ulIn,ulEnd);
	      						while(telefonos.length>0){ //Extraemos de cada li el telefono
	      							var liIn = telefonos.indexOf('<li>')+'<li>'.length;
	      							var liEnd = telefonos.indexOf('</li>');
	      							titulo.tlf[titulo.tlf.length] = telefonos.slice(liIn,liEnd);
	      							liEnd += '</li>'.length;
	      							telefonos = telefonos.substr(liEnd);  	
	      						}
	      						
	      					} else { //Es solo un telefono
	      					   titulo.tlf[titulo.tlf.length] = telefonos;  					
	      					}
	      					//Quitamos la parte del <dd></dd>
	      					punteroFin += '</dd>'.length;
	      					tlfString = tlfString.substr(punteroFin);
	      				} else { //Malformado no devolvemos nada
	      					return [];
	      				}
	      				res[res.length] = titulo;
	      			}
	      			return res;
	      		}
	      		
	      		function openPoiMap(){
	      			//Navegamos a la pantalla del mapa
	      			var coords = GestorPOIDetails.getCoordsMap();
					var floorMap = GestorPOIDetails.getTerminalFloorMap(); //TODO: por ahora siempre va a coincidir con la planta
					fromMapTab = true;
					
					GestorPOIs.setTerminalFloor(floorMap[0],floorMap[1]);
					_listState = 0;
	      			lastPosition = new OpenLayers.LonLat(coords[1],coords[0]);
	      			if(lastZoom==null){
	      				if(GestorOL.isAirportGeolocated()){
							lastZoom = ConstF.zoom2D;
						} else {
							lastZoom = ConstF.zoom3D;
						}
	      			}
	      			eventPoiDetailMap();
	      			browseFromClick('pois.html','none',null,false);
	      		}
	      		
	      		function openRes(){
	      			eventPoiDetailRes();
	      			browseFromClick('reservas.html','none',null,false);
	      		}
	      		
	      		function openResVIP(url) {
	      			//window.plugins.childBrowser.showWebPage(url + GestorIdiomas.getLang());
	      			browseExternalURL(url + GestorIdiomas.getLang());
	      			
	      		}
	      		function loadPOIDetails(){
					GestorPOIDetails.getPOIDetail(function(){
				
						var resultado = GestorPOIDetails.POI_DETAILS();
						var coords = GestorPOIDetails.getCoordsMap();
						var floorMap = GestorPOIDetails.getTerminalFloorMap();
						if (resultado != null)
						{
							
							if (resultado.length != 0 && resultado.KEYS != null && resultado.VALUES != null)
							{
								var listHtml = '<div class="controlSection">';
								//El primero siempre es el título
								var _name = resultado.VALUES[0];
								if(! $.objectHasContent(_name)) {
									_name = GestorIdiomas.getLiteral('POIDetail_noData');
								}
								var param = GestorPOIDetails.getTerminalFloorMap();
								var textTerminalPlanta = '';
								
								if(param.length==2 && param[0]!=null && param[1]!=null && param[0]!='null' && param[1]!='null'){
									var _terminal = param[0];
									var _floor = param[1];
									var _air = GestorPOIDetails.getParameters().AIRPORT_ID;
									var _planta = GestorPOIDetails.getPOIPlantaByIds(_air,_terminal,_floor);
									textTerminalPlanta = _terminal + ' ' + _planta;
								} else {
									textTerminalPlanta = GestorIdiomas.getLiteral('poiRecinto');
								}
								
								listHtml += '<div class="detallePoiHeader">' + _name + '<br/><span class="detallePoiHeaderTerm">'+textTerminalPlanta+'</span></div>';
							

								//A partir del primero tenemos campos estándar
								for(var _i=1 ; _i < resultado.KEYS.length; _i++)
								{
									var _isURL = (resultado.KEYS[_i].toLowerCase().indexOf('web') !=-1);
									var _isEmail=(resultado.KEYS[_i].toLowerCase().indexOf('email') !=-1);
									var _isTlfno = (resultado.KEYS[_i].toLowerCase().indexOf('teléfono') !=-1
													|| resultado.KEYS[_i].toLowerCase().indexOf('telefono') !=-1 
													|| resultado.KEYS[_i].toLowerCase().indexOf('phone') !=-1);
									
									
									//console.log('Fin comparaciones')

									var _contentClass = 'controlSectionContent';
									if (_i == resultado.KEYS.length-1 && (coords==null || floorMap == null)) { 
										_contentClass = 'lastcontrolSectionContent';
									}
									
									listHtml += '<table width="100%" cellpadding="0" cellspacing="0">';
										listHtml += '<tr>';
											listHtml += '<td>';
												listHtml += '<div class="controlSectionHeader titlePoiDetail">' + resultado.KEYS[_i] + '</div>';
												listHtml += '<div class="' + _contentClass + '">';
												for(var _j=0;_j<resultado.VALUES[_i].length;_j++){
													if(_isURL){
														if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
															listHtml+= '<a class="poiLink" href="'+resultado.VALUES[_i][_j]+'" target="_blank" rel="external">'+resultado.VALUES[_i][_j]+"</a>";
														} else{
															listHtml+= '<a class="poiLink" href="#" onclick="javascript:browseExternalURLWithExternalBrowser(\'' +resultado.VALUES[_i][_j] + '\');">'+resultado.VALUES[_i][_j]+"</a>";
														}
													} else if(_isEmail){
														listHtml+= '<a class="poiLink" href="mailto:' +resultado.VALUES[_i][_j] + '">'+resultado.VALUES[_i][_j]+"</a>";
													} else if(_isTlfno){
														
														var tlfTmp = parseTlf(resultado.VALUES[_i][_j]);
														for(var k=0;k<tlfTmp.length;k++){
															listHtml += tlfTmp[k].cabecera +'<br/>';
															for(var l=0;l<tlfTmp[k].tlf.length;l++){
																listHtml+= '<a class="poiLink" href="tel:' +tlfTmp[k].tlf[l] + '">'+tlfTmp[k].tlf[l]+"</a></br>";
															}
														}
														if(tlfTmp.length==0){//Error de parseo
															//listHtml+= GestorIdiomas.getLiteral('noDisponible')+'</br>';
															listHtml+= resultado.VALUES[_i][_j];
														}
														
														
													} else {
														listHtml+= resultado.VALUES[_i][_j];
													}
													if(_j!=resultado.VALUES[_i].length-1){
														listHtml += '<br />';
													}
												}
												listHtml += '</div>';
											listHtml += '</td>';
											listHtml += '<td width="10%" class="' + _contentClass + '">';
												if (_isEmail){ listHtml += '<img src="' + $.mobile.path.get() + 'img/ico_mail.png" />'; }
												if (_isURL){ listHtml += '<img src="' + $.mobile.path.get() + 'img/ico_web.png"  />'; }
												if (_isTlfno){ listHtml += '<img src="' + $.mobile.path.get() + 'img/ico_telefono.png"  />'; }
											listHtml += '</td>';
										listHtml += '</tr>';
									listHtml += '</table>';
								}
								
								listHtml+='</div>';
								
								if(GestorPOIDetails.getParameters().CATEGORY=="Parking"){
									var airport = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
									if(airport.RESERVA_PARKING){
        								var terminals = GestorAirports.getTerminals(airport.AIRPORT_ID);
        								var finalTerminals = [];
        								for(var i=0;i<terminals.length;i++){
        									if(terminals[i].RESERVA_PARKING){
        										finalTerminals[finalTerminals.length] = terminals[i];
        									}
        								}
        								if(finalTerminals.length>0){
        									listHtml += '<a href="javascript:openRes();" data-role="button" data-theme="button">'+GestorIdiomas.getLiteral('POIDetail_reserva')+'<img id="resIcoParkingRes" src="../../themes/default/common/img/ico_parking.png"/></a>';
        								}
        							} 
								}
								
								if(GestorPOIDetails.getParameters().TYPE=="Sala VIP"){
									var airport = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
									// Reserva Sala VIP
        							if ('URL_RESERVA_SALA_VIP' in airport) {
        								if(airport.URL_RESERVA_SALA_VIP.length > 0) {
        									var uriJS = "javascript:browseExternalURLWithExternalBrowser('" + airport.URL_RESERVA_SALA_VIP + GestorIdiomas.getLang().toUpperCase() + "');";
        									listHtml += '<a href="#" onclick="' + uriJS + '" data-role="button" data-theme="button">'+GestorIdiomas.getLiteral('POIDetail_reserva')+'<img id="resIcoSalaVIPRes" src="../../themes/default/common/img/icon/ico_salas_vip.png"/></a>';
        								}
        							}
								}
								
								if (coords!=null && floorMap != null) {
										listHtml += '<a href="javascript:openPoiMap();" data-role="button" data-theme="button">'+GestorIdiomas.getLiteral('POIDetail_viewMap')+'<img id="mapIcoShowMap" src="../../themes/default/common/img/ico_mapa.png"/></a>';
								}
								
								listHtml+='<div style="height:15px"></div>'; //Feo pero no lo veo
								$('#poiDetail').html(listHtml);
							}
							else
							{
									paintUpperIconMessage('poiDetail',GestorIdiomas.getLiteral('loadingErrorMessage'),'controlSection','../../themes/default/common/img/ico_error.png','controlSectionHeader');
							}

							$('#detalle_poi').trigger('create');
							$('#waitingPoiDetail').css('display','none');
							$('#poiDetail').css('display','block');
							setTimeout(function(){autoScrollPageContentRole('detalle_poi');},200);
							
							//console.log('Terminado');
						}
					});
	      		}
	      		
      		

/**
 * Javascript used to work with the Search screen. 
 * It allows to create some UI elements and handles the events/actions sent from the screen.
 */
function SearchUI() {
};

// ----- INTERNAL VARS ------------
/** Current selected tab. */
var _searchSelectedTabId = '';

/**
 * Private method.
 * Used to create an item for the Category Grid.
 * @param {object} categoryId Id of the category to extract from the Array ConstF.PoisCategories[]
 * @param {object} gridClass jQuery grid class.  
 */
var createItem = function(categoryId, gridClass) {
	var item = {
		ITEM_ID: '',
		ITEM_IMAGE: '',
		ITEM_NAME: '',
		ITEM_CLASS: gridClass
	};	
	var category = $.getSingleObjectByPKFromJSONArray(ConstF.PoisCategories, 'POI_CATEGORY_ID', categoryId) || {};	
	// var category = ConstF.PoisCategories[index] || {}; 	
	item['ITEM_ID'] = category['POI_CATEGORY_ID'];
	item['ITEM_IMAGE'] = '../../themes/default/common/img/SearchIcons/' + category['POI_CATEGORY_ICON_UNCHK'];
	item['ITEM_NAME'] = category['POI_CATEGORY_DESC'][GestorIdiomas.getLang()];
	
	return item;	
};

/**
 * Creates the default elements for the Grid (Search screen). 
 */
SearchUI.prototype.defaultElements = function() {
	var items = new Array();
	
	items.push(createItem('parking', "ui-block-a")); // Parking
	items.push(createItem('alquiler-coches', "ui-block-b")); // Alquiler de Coches
	items.push(createItem('sala-vip-centro-reuniones', "ui-block-c")); // Salas VIP
	items.push(createItem('tiendas-ocio', "ui-block-a")); // Tiendas y Ocio
	items.push(createItem('restaurantes-cafeterias', "ui-block-b")); // Restaurantes
	items.push(createItem('personas-movilidad-reducida', "ui-block-c")); // PMR
	items.push(createItem('transportes-accesos', "ui-block-a")); // Transportes y Accesos
	items.push(createItem('zona-llegada-salida', "ui-block-b")); // LLegadas y salidas
	items.push(createItem('informacion', "ui-block-c")); // Información
	items.push(createItem('servicios-bancarios', "ui-block-a")); // Servicios Bancarios
	items.push(createItem('otros-servicios', "ui-block-b")); // Otros servicios
	items.push(createItem('servicios-medicos', "ui-block-c")); // Servicios medicos

	return items;
};

/**
 * Public method.
 * Creates the complete grid for category search.
 */
SearchUI.prototype.createPOICategoryGrid = function(gridContainerId) {
	var me = this;
	var _grid_items = me.defaultElements();
	var _grid_length = _grid_items.length;
	
	for(var i=0; i<_grid_length; i++){
		var item = _grid_items[i];					
		var html = '<div class="' + item.ITEM_CLASS + ' search_category_cell" id="#' + item.ITEM_ID + '" style="padding-bottom: 10px">';
		if (item.ITEM_ID == "") {
			html += '&nbsp;';	
		} else {
			html += '<a href="#' + item.ITEM_ID + '" onclick="eventSearchSelectPOICategory(\'' + item.ITEM_ID + '\');"><img src="' + item.ITEM_IMAGE + '" style="width:60px" /></a><br />';// + item.ITEM_NAME;
		}						
		html += '</div>'; 
		$(gridContainerId).append (html);
	};
	
	$('#search').trigger('create');
	autoScrollPageContentRole('search');
};

SearchUI.prototype.hideTerminalBar = function() {
	var _terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
	return (_terminals.length <= 1);
};

/** 
 * Public method.
 * Create the terminals bar. 
 */
SearchUI.prototype.createTerminalBar = function(pageId, tabBarId) {
	//var me = this;
	// 1. List of Terminals for selected airport				
	var _terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
	// console.log("FJORDAN: Terminals: " + JSON.stringify(_terminals) + "; Length: " + _terminals.length);
	var allTerminals = GestorIdiomas.getLiteral('search_all_terminals');
	_terminals.splice(0, 0, {
		"TERMINAL_ID" : "",
		"TERMINAL_NAME" : {
			"es_ES" : allTerminals,
			"en_GB" : allTerminals
		},
		"TERMINAL_SHORT_NAME": allTerminals
	});

	// 2. Precalculate the width of each tab element. Done this way for opmization.
	var _terminals_length = _terminals.length;
	var _pageWidth = $('#' + pageId).width() - (_terminals_length + 3); // apply correction factor
	var _tabWidth = parseInt((_pageWidth / _terminals_length) >> 0);
	var _lastTabWidth = parseInt(_pageWidth - ((_terminals_length-1)*_tabWidth));				
				
	// 3. Iterate and create the list
	for(var i = 0; i < _terminals_length; i++) {
		// tab vars
		var _terminalId = _terminals[i].TERMINAL_ID;
		// var _terminalName = _terminals[i].TERMINAL_SHORT_NAME;
		var _terminalName = _terminals[i].TERMINAL_SHORT_NAME || _terminals[i].TERMINAL_NAME[GestorIdiomas.getLang()];
		// Tab Identifiers
		var tabId = '#tab' + _terminalId;
		var tabLinkId = '#tab' + _terminalId + 'Link';
		// Tab size (width)
		var tabWidth = (i == (_terminals_length - 1)) ? _lastTabWidth : _tabWidth;
		// tab Element				
		var item = '<li id="' + tabId + '" style="width:' + tabWidth + 'px">';
		item += '<a href="' + tabLinkId + '" onclick="eventSearchAirportTerminal(\'' + _terminalName + '\');eventChangeTab(\'' + tabId + '\');">' + _terminalName + '</a>';					
		item += '</li>';
		$("#" + tabBarId).append (item);
	}	
				
	// 4. default selection of first element (All terminals).
	tabs('nav ul');		
	_searchSelectedTabId = '#tab';
	
	$('#search').trigger('create');
	autoScrollPageContentRole('search');
};
/**
 * Save the value for the new selected tab.
 * @param {Object} tabId identifier of the new selected tab. 
 */
var eventChangeTab = function(tabId) {
	_searchSelectedTabId = tabId;
};

/**
 * Open the POI List screen applying the filter: selected category (only this filter).
 * @param {Object} poiCategory Selected Category.
 */
var eventSearchSelectPOICategory = function(poiCategory) {
	// Remove all filters.
	GestorPOIs.clearAllFilters();
	// Text of the input box
	var text = $('#searchPOIText').val();
	// Validate
	if (text.length > 0 && text.length < 3) {
		showPopup(GestorIdiomas.getLiteral('search_invalid_text'));
		return;
	}
	eventSearchAirportCat(poiCategory);
	// Add text filter only if is valid.
	if (text && text.length > 0) {
		GestorPOIs.setText(text);	
	}	
	
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	GestorPOIs.fillAllTypesSelectedInCategory(poiCategory);
	// Terminal Filter
	var terminalId = '';
	if (_searchSelectedTabId && _searchSelectedTabId.length > 4) {
		terminalId = _searchSelectedTabId.substring(4);
		GestorPOIs.addTerminal(terminalId); 
		GestorPOIs.fillFloorsForSelectedTerminalFilter();
	} else {
		GestorPOIs.fillAllTerminalsAndFloorFilters();
	}
	
	setCalledPOIsScreenFromSearch(true);
	// Do filter
	GestorPOIs.fillAirportPoiList(function(data){
		if (data == null || $.isEmptyObject(data)) {
			// error
			var _params = [{
				'NAME' : 'POI_CATEGORY_ID',
				'VALUE' : poiCategory
			}];
			var categ = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_CATEGORIES(), _params);
			var categ_desc = categ[0]['POI_CATEGORY_DESC'][GestorIdiomas.getLang()];				
			var terminalName = '';
			if (terminalId == '') {
				terminalName = GestorIdiomas.getLiteral("search_all_terminals");
			} else {
				var _terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
				var _params = [{
					'NAME' : 'TERMINAL_ID',
					'VALUE' : terminalId
				}];
				var terminal = $.getFilteredArrayFromJSONArray(_terminals, _params);
				terminalName = terminal[0]['TERMINAL_NAME'][GestorIdiomas.getLang()];
			}
			
			var msg = GestorIdiomas.getLiteral("search_not_found_1");
			msg += '<ul><li style=\"text-align:left\">';
			msg += GestorIdiomas.getLiteral("search_not_found_5"); // Categoria:
			msg += categ_desc;
			msg += '</li>';
			if (text != '') {
				msg += '<li style=\"text-align:left\">';
				msg += GestorIdiomas.getLiteral("search_not_found_2") + text;
				msg += '</li>';
			}
			msg += '<li style=\"text-align:left\">';
			msg += GestorIdiomas.getLiteral("search_not_found_14");
			msg += terminalName;
			msg += '</li>';
			msg += '</ul>';			
						
			showPopup(msg);
		} else {
			// show list
			catExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
			typeExpanded = null;//variable de POIs_UI para determinar cual expandir, en este caso la primera
	
			browseFromClick('pois.html', 'none', null, false);	
		}		
	});	 	
};

/**
 * Event from Search button. 
 * Open the POI List screen applying the filter: selected terminal and text (only this filters, it does not apply the category).
 */
var eventSearchPOIList = function() {
	// Selected terminal: #tab[TERMINAL_ID]
	// if TERMINAL_ID is empty -> all terminals
	// if TERMINAL_ID is not empty -> select only that terminal
	var terminalId = '';
	// Text of the input box
	var text = $('#searchPOIText').val();
    if (text != null) {
        text = text.trim();
    }
	// Validate
	if (!text || text.length < 3) {
		showPopup(GestorIdiomas.getLiteral('search_invalid_text'));
		return;
	}
	
	eventSearchAirportSearchText(text);
	
	// Remove all filters.
	GestorPOIs.clearAllFilters();
	// Set filters
	GestorPOIs.setAirport(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID);
	// Add All Categories	
	GestorPOIs.fillAllCategoriesSelected();
	// Add text filter only if is valid.
	if (text && text.length > 0) {
		GestorPOIs.setText(text);	
	}		
	if (_searchSelectedTabId && _searchSelectedTabId.length > 4) {
		terminalId = _searchSelectedTabId.substring(4);
	GestorPOIs.addTerminal(terminalId); 
		GestorPOIs.fillFloorsForSelectedTerminalFilter();
	} else {
		GestorPOIs.fillAllTerminalsAndFloorFilters();
	}
	
	setCalledPOIsScreenFromSearch(true);
	// Do filter
	GestorPOIs.fillAirportPoiList(function(data){
		if (data == null || $.isEmptyObject(data)) {
			// error
			// alert(JSON.stringify(data));
			var terminalName = '';
			if (terminalId == '') {
				terminalName = GestorIdiomas.getLiteral("search_all_terminals");
			} else {
				var _terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
				var _params = [{
					'NAME' : 'TERMINAL_ID',
					'VALUE' : terminalId
				}];
				var terminal = $.getFilteredArrayFromJSONArray(_terminals, _params);
				terminalName = terminal[0]['TERMINAL_NAME'][GestorIdiomas.getLang()];
			}			 
						
			var msg = GestorIdiomas.getLiteral("search_not_found_1");
			msg += '<ul>';
			if (text != '') {
				msg += '<li style=\"text-align:left\">';
				msg += GestorIdiomas.getLiteral("search_not_found_2") + text;
				msg += '</li>';
			}
			msg += '<li style=\"text-align:left\">';
			msg += GestorIdiomas.getLiteral("search_not_found_14");
			msg += terminalName;
			msg += '</li>';
			msg += '</ul>';			
						
			showPopup(msg);
			
		} else {
			// show list
			
			browseFromClick('pois.html', 'none', null, false);	
		}		
	});	 
};


			$('#search').on('pageshow', function(event) {
				initPage(this);
				trackPage();
				
				var _search = new SearchUI();
				if (_search.hideTerminalBar()) {
					$('#terminalTabBar').hide();	
				}				
				
				// Name of the airport in title bar
				var _airp = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
				$('#airport_Id').html(_airp.AIRPORT_NAME);
				// SearchBox
				$('#searchPOIText').attr("placeholder", GestorIdiomas.getLiteral('search_placeholder')).blur();
				$('#searchPOIText').keypress(function(event) {
					if(event.which == 13) {
						// do search
						eventSearchPOIList();
						return false;
					}
					return true;
				});				
				// TABS for Terminal selection
				_search.createTerminalBar('search', 'tabBarItems');
				// GRID
				_search.createPOICategoryGrid("div#launcher_grid");		
						$('#search').trigger('create');
				setTimeout(function () {						
						autoScrollPageContentRole('search');
					},
					500
				);																		
			});
			


				$(document).undelegate('#notificaciones', 'pageshow');
				$(document).delegate('#notificaciones', 'pageshow', function(event) {
	        		initPage(this);
	        		trackPage();
	        		cargaNotifications('divDataNotif');
	        		autoScrollPageContentRole('notificaciones');
	      		});
	      		
	      		function cargaNotifications(notificationsDivId){
      				var listHtml = '';

					var notifications = GestorNotificaciones.NOTIFICATIONS();
					
					GestorNotificaciones.setNewNotif(false);//Se reinicia la variable porque ya las hemos visitado
					
					if($.objectHasContent(notifications)){
						
						for(var i=0; i<notifications.length; i++){
							listHtml+='<div class="controlSection">';
			
								listHtml+='<div class="controlSectionHeader" >';
								listHtml+= notifications[i].NOTIF_TITLE  + '</div>';
								
									if($.objectHasContent(notifications[i].NOTIF_DATE)){
										var _notifDate = new Date(parseInt(notifications[i].NOTIF_DATE, 10));
										listHtml+='<div class="lastcontrolSectionContent">';
										listHtml+=  _notifDate.toShortDateString() + ' '  + _notifDate.toShortTimeString();
										listHtml+='</div>';  
									}
									listHtml+='<div class="lastcontrolSectionContent" >';
										listHtml+= notifications[i].NOTIF_MSG;
									listHtml+='</div>';
							listHtml+='</div>';
						}
						
					}else{
						listHtml = _getUpperIconMessage(GestorIdiomas.getLiteral('notifications_NoNotif'),'controlSection',null,'controlSectionHeader');
					}
      				$('#' + notificationsDivId).html(listHtml);
      				$('#' + notificationsDivId).trigger('create');
      			}
      		


				$('#planificador').on('pageshow', function(event) {
					initPage(this);
					trackPage();
					cargaViajes('listaViajes');
					cargaReservas('listaReservas');
					
					$("#chauntryloader").html('<object data="' + ConstF.urlLanguageChanger[GestorIdiomas.getLang()] + '"/>');				   	
				});

				function cargaViajes(divId) {
					
						var travels = GestorViajes.TRAVELS();
						var html = "<div>";

						if($.objectHasContent(travels)) {//Tenemos viajes
							if(travels.length > 0) {
								for(var i = 0; i < travels.length; i++) {

									var _flight = JSON.parse(travels[i].FLIGHT);
									var _formattedFlight = GestorFlightDetails.formatFlight(_flight);

									var _fecha = _flight.fechaSalidaProgramadaAsString;
									if(!$.objectHasContent(_fecha))
										_fecha = _flight.fechaLlegadaProgramadaAsString;

									html += '<div class="controlSectionDark">';
									html += '<div class="controlSectionDarkContent" style="border-bottom:0px;">';

									html += '<div class="controlSectionDarkFila" onclick="eventSeeFlight();browseDetail(\'' + _flight.aeropuertoOrigen + '\',\'' + _flight.aeropuertoDestino + '\',\'' + _flight.aeropuertoOrigenOACI + '\',\'' + _flight.aeropuertoDestinoOACI + '\',\'' + _fecha + '\',\'' + _fecha + '\',\'' + _flight.codCia + '\',\'' + _flight.numVuelo + '\')">';
									html += '<div class="controlSectionDarkImage"><img src="' + $.mobile.path.get() + '../../themes/default/common/img/icon/ico_salidas.png" height="32" ></div>';
									html += '<div class="controlSectionDarkAerop">';
									html += '<span>' + _formattedFlight.AIRPORT_DEP_NAME + ' '+String.fromCharCode(0x7E) +' ' + _formattedFlight.AIRPORT_ARR_NAME;

									var _numVuelo = _formattedFlight.NUM_VUELO_DESC_SALIDA;
									if(!$.objectHasContent(_numVuelo)) {
										_numVuelo = _formattedFlight.NUM_VUELO_DESC_LLEGADA;
									}

									html += ' (' + _numVuelo + ')</span>';
									html += '<div class="controlSectionDarkFila">';
									html += '<div class="controlSectionDarkCampo">';
									var _date = _formattedFlight.FLIGHT_DEP_TIME_PROG;
									var _time = "";
									if($.objectHasContent(_date)) {
										_date = _date.toShortDateString();
										_time = _formattedFlight.FLIGHT_DEP_TIME_PROG.toShortTimeString();
									} else {
										_date = ConstF.noDataString;
									}
									html += GestorIdiomas.getLiteral('planner_FechaSal') + _date + ' ' + _time + ' h';

									_date = _formattedFlight.FLIGHT_ARR_TIME_PROG;
									_time = "";
									if($.objectHasContent(_date)) {
										_date = _date.toShortDateString();
										_time = _formattedFlight.FLIGHT_ARR_TIME_PROG.toShortTimeString();
									} else {
										_date = ConstF.noDataString;
									}
									html += '<br>' + GestorIdiomas.getLiteral('planner_FechaArr') + _date + ' ' + _time + ' h';

									html += '</div>';
									html += '</div>';
									html += '</div>';
									html += '<div class="controlSectionDarkFila">';
									html += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/flecha_dcha.png">';
									html += '</div>';
									html += '</div>';
									html += '<div class="lastcontrolSectionDarkContent">';
									html += '<a href="javascript:eventDelFlight();removeTravel(' + travels[i].TRAVEL_ID + ');" data-role="button" data-theme="button" data-icon="mydelete" >' + GestorIdiomas.getLiteral('planner_deleteButton') + '</a>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								}
							} else {
								html = _getUpperIconMessage(GestorIdiomas.getLiteral('planner_noDataMessage'), 'controlSection', null, 'controlSectionHeader');
							}
						} else {
							html = _getUpperIconMessage(GestorIdiomas.getLiteral('planner_noDataMessage'), 'controlSection', null, 'controlSectionHeader');

						}

						html += '</div>';
						$('#' + divId).html(html);
						$('#' + divId).trigger('create');
						//$('#planificador').trigger('create');
						
						//autoScrollPageContentRole('planificador');
				}

				
				function removeTravel(_travelDetailId) {
						showConfirm(GestorIdiomas.getLiteral('flightDetail_confirmTravelDelete'),function(){
										GestorViajes.removeTravel(_travelDetailId, function() {
												cargaViajes('listaViajes');
										});
								}
						);
				}
				
	
				
		

				function browseDetail(depAirportId, arrAirportId, depOaci, arrOaci, dateFrom, dateTo, airlineIdIATA, flightNumber) {
					GestorFlightDetails.setParams(depAirportId, arrAirportId, depOaci, arrOaci, dateFrom, dateTo, airlineIdIATA, flightNumber, 'S');
					browseFromClick('detalle_vuelo.html', 'none');
				}
				
				function browseResParking(resId,resName,resParkingId,resAirportId,resInDate,resOutDate,resPrice,resPlaza,resLoc,resMail){
					GestorResParking.setReservaDetail(resId,resName,resParkingId,resAirportId,resInDate,resOutDate,resPrice,resPlaza,resLoc,resMail);
					browseFromClick('plaza_parking.html', 'none');
				}
				
				function cargaReservas(divId) {
						GestorResParking.loadRes(function(_reservas){
							var html = "<div>";
							if($.objectHasContent(_reservas)) { //No es nulo
								if(_reservas.length>0){ //Hay mas de uno
									for(var i = 0; i < _reservas.length; i++) {
										var reserva = _reservas[i];
										var dateIn = new Date(parseInt(reserva.RES_IN_DATE,10));
										var dateOut = new Date(parseInt(reserva.RES_OUT_DATE,10));
										var endDateIn = dateIn.toUTCDate().toShortDateString() + ' ' + dateIn.toUTCDate().toShortTimeString() + ' h';
										var endDateOut = dateOut.toUTCDate().toShortDateString() + ' ' + dateOut.toUTCDate().toShortTimeString() + ' h';
										var plaza = 'null';
										if($.objectHasContent(reserva.RES_PLAZA)){
											plaza = reserva.RES_PLAZA;
										}
										html += '<div class="controlSectionDark">';
											html += '<div class="controlSectionDarkContent" style="border-bottom:0px;">';
												html += '<div class="controlSectionDarkFila" onclick="eventSeeParking();browseResParking(\''+reserva.RES_ID+'\',\''+reserva.RES_NAME+'\',\''+reserva.RES_PARKING_ID+'\',\''+reserva.RES_AIRPORT_ID+'\',\''+endDateIn+'\',\''+endDateOut+'\',\''+reserva.RES_PRICE+'\',\''+plaza+'\',\''+reserva.RES_LOC+'\',\''+reserva.RES_MAIL+'\');">';
													html += '<div class="controlSectionDarkImage"><img src="' + $.mobile.path.get() + '../../themes/default/common/img/icon/ico_parking.png" height="32" ></div>';
													html += '<div class="controlSectionDarkAerop">';
														var resName = GestorResParking.getParkingName(reserva.RES_PARKING_ID);
														html += '<span>' + resName +'</span>';
														html += '<div class="controlSectionDarkFila">';
															html += '<div class="controlSectionDarkCampo">';
																try{
																	html += GestorIdiomas.getLiteral('parkingImporte')+decodeURIComponent(reserva.RES_PRICE);
																}catch (e){
																		html += GestorIdiomas.getLiteral('parkingImporte')+ "Error decoding Chauntry.";
																}
																html += '<br>' +GestorIdiomas.getLiteral('parkingLoc')+decodeURIComponent(reserva.RES_LOC);
																html += '<br>' +GestorIdiomas.getLiteral('parkingPlaza');
																if($.objectHasContent(reserva.RES_PLAZA)){
																	html+=reserva.RES_PLAZA;
																}
																html += '<br>' +GestorIdiomas.getLiteral('parkingEntrada') + endDateIn;
																html += '<br>' + GestorIdiomas.getLiteral('parkingSalida') + endDateOut;
															html += '</div>';
														html += '</div>';
													html += '</div>';
													html += '<div class="controlSectionDarkFila">';
														html += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/flecha_dcha.png">';
													html += '</div>';
												html += '</div>';
											html += '</div>';
										html += '</div>';
									}
								} 
							} 
							html += '</div>';
							$('#' + divId).html(html);
							$('#' + divId).trigger('create');
							//$('#planificador').trigger('create');
							autoScrollPageContentRole('planificador');
						},function (){
							//Aunque tengamos error debe actualizarlo
							autoScrollPageContentRole('planificador');
							});
				}

			


				$('#surveys').on('pageshow',function(event){
					trackPage();
					initPage(this);
					$("#infoSection").css('display','block');
					paintUpperIconMessage('infoSection',GestorIdiomas.getLiteral('loadingMessage'),'controlSection','../../themes/default/common/img/ajax-loader.gif','controlSectionHeader');
					loadSurveys();
        			
        			if(!eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
        				$('#divBtnAirport').css('display','none');
        			}
        			
        			autoScrollPageContentRole('surveys');
        			startIntervalresize();
      			});

				function loadSurveys() {
					GestorSurveys.loadAirportSurveys(function() { GestorSurveys.paintSurveys('listaEncuestas',function(){$("#infoSection").css('display','none');autoScrollPageContentRole('surveys');});});
				}

				var intervalResize;
				
				function startIntervalresize() {
					intervalResize = setInterval(resize, 1000);
				}
				
				function stopIntervalResize() {
					if (intervalResize) {
						clearInterval(intervalResize);
					}
				}
				
				function resize() {
					var $ifr = $('#iframeSurveys');
					var $divf = $('#listaEncuestas');
					if ($ifr && $divf) {
						$divf[0].setAttribute("height", "2000px");
						$ifr[0].setAttribute("width", "100px");
						$ifr[0].setAttribute("height", "85%");
						autoScrollPageContentRole('surveys');
						$ifr[0].setAttribute("width", "99%");
					}
					
					//Código Ernesto para resolver el problema en los Android 5
					jQuery('#listaEncuestas, iframe#iframeSurveys').css({'width':'100%', 'min-width':'100%','height':'100%!important', 'min-height':'100%','position':'absolute'});
				}	
				
			


				$('#waiting').on('pageinit',function(){
					trackPage('waiting');
				});
				$('#waiting').on('pageshow', function(event) {
					waitCheckConnection();	
					GestorIdiomas.refresca('#waiting');
					var width = $('.btnBox').width();
					var margin = -width/2;
					$('.btnBox').css('margin-left',margin+'px');
					$('#retry').css('display','none').trigger('create');
				});
			

/**
 * Funciones empleadas por la pagina waiting.html para chequear conexion 
 */

function hideError(){
	$('#retry').css('display','none');
	$('#errMsg').css('display','none');
	$('#waitingMsg').css('display','block');
	$('#coverLetter').css('display','block');
	$('#planeLoader').css('display','block');
}

function showError(){
	$('#waitingMsg').css('display','none');
	$('#coverLetter').css('display','none');
	$('#planeLoader').css('display','none');
	$('#errMsg').css('display','block');
	$('#retry').css('display','block');
}

/**
 * Chequea si hay conexion y si no la hay, lo notifica y saca icono al usuario
 * Si la hay, comprueba si el servicio esta levantado 
 * Si la hay, comprueba si hay token
 */
function waitCheckConnection(){
	$.ajax({
		type : ConstF.GET,
		url : ConstF.checkConnectionUrl,
		timeout: ConstF.checkConnectionTimeout,
		cache: false,
		async: true,
		success : waitCheckService,
		error : function(){
			eventErrorConexion();
			$('#errMsg').html(GestorIdiomas.getLiteral('checkConnectionGoogleFail'));
			$('#retry').off('click').on('click',function(){
				eventRetryConexion();
				$('#waitingMsg').html(GestorIdiomas.getLiteral('checkConnectionGoogle'));
				hideError();
				setTimeout(waitCheckConnection,1000);
			});
			showError();
		}
	});
}

/**
 * Invocado cuando hemos visto que hay conexion 
 * Chequea si nuestro servicio esta levantado
 */
function waitCheckService(){
	$('#waitingMsg').html(GestorIdiomas.getLiteral('checkConnectionService'));
	$.ajax({
		type : ConstF.GET,
		url : ConstF.check_WS,
		timeout: ConstF.checkConnectionTimeout,
		cache: false,
		async: true,
		success : updateData,
		error : function(){
			eventErrorServer();
			$('#errMsg').html(GestorIdiomas.getLiteral('checkConnectionServiceFail'));
			$('#retry').off('click').on('click',function(){
				eventRetryServer();
				$('#waitingMsg').html(GestorIdiomas.getLiteral('checkConnectionService'));
				hideError();
				setTimeout(waitCheckService,1000);
			});
			showError();
		}
	});
}

function updateData() {
	console.log("FJORDAN: updateData...");
	GestorAirports.updateAirports(
		function(){
			console.log("FJORDAN: updateData... OK");
			waitCheckToken();
		}, 
		function() {
			console.log("FJORDAN: updateData... ERROR");
			waitCheckToken();
		});
}


var registerAttempts = 0;
function waitCheckToken(){
	console.log("FJORDAN: waitCheckToken !!");
	var token = GestorContexto.CONTEXT().UC_TOKEN;
	if($.objectHasContent(token)){
		checkSuccess();
	} else {
		registerAttempts++;
		if(registerAttempts<10){
			$('#waitingMsg').html(GestorIdiomas.getLiteral('checkRegistering'));
		} else {
			$('#waitingMsg').html(GestorIdiomas.getLiteral('checkRegisteringFail'));
		}
		setTimeout(waitCheckToken,5000);;
	}
}

/**
 *Invocado cuando se han pasado todos los chequeos 
 */
function checkSuccess(){
	console.log("FJORDAN: GOTO INIT !!");
	browseFromClick('index.html','none');
	GestorPosition.init();
}



				$('#survey_list').on('pageshow',function(event){
					trackPage();
					initPage(this);
					loadSurveys();
        			
        			if(!eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
        				$('#divBtnAirport').css('display','none');
        			}
        			
        			autoScrollPageContentRole('survey_list');
      			});

				//paintLeftIconMessage('mensajeSeleccionEncuesta', GestorIdiomas.getLiteral('mensaje_no_encuesta'), null, null, 'flightPanelMessage_textCell');

				function loadSurveys() {
					GestorSurveys.loadAirportSurveys(function() { GestorSurveys.paintSurveys('listaEncuestas') });
				}
				
			


				$('#pois').on('pageshow', function(event) {
					initPage(this);	
					trackPage();

					if($.objectHasContent(GestorPOIs.TEXT())){
						$('#searchPOI').val(GestorPOIs.TEXT());
					}
					
					$('#sliderSearchPoisBtn').find('.ui-icon').css('display','none');
					
					$('.localizadorButton-commonHeader').css('display','none');
					
					/*IOS quitamos los botones de zoom*/
					if(Utils.isIphone() || Utils.isIpod() || Utils.isIpad()){
						$('#navZoom').css('display','none');
					}
					
					/* Ajustes para pantallas de tablets*/
					if($(window).height()>1000){
						$('#sliderListaDivBtn').css('top','140px');
					}
					
					/* Atamos a los eventos del menu que te recuerde donde estabas en el mapa*/
					$('#listMenu').find('a').on('click', function() {
						lastPosition = GestorOL.getCurrentPosView();
						lastZoom = GestorOL.getCurrentZoom();
					});
					
					$('#searchPOI').on("keypress", function(event){   
						 if (event.keyCode === 13) { //Enter key in Android
						 	filterPOIsByName();
						 	event.preventDefault();
						 }
					});
					
					var _airp = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
					$('#airport_Id').html(_airp.AIRPORT_NAME);

					paintUpperIconMessage('info_div', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
					
					// menu_swipe de CATEGORIAS ---------------------------------------------
					cargarPoisCategories('pois_bar');					
					_menuswipe_create('pois_bar');
					
					setFavouriteButtonState();
					// ----------------------------------------------------------------------

					fixPoisHeight();
					
					initCmbTerminals();
					
					initPOIs();
				
					/** Eventos*/	
					activateSwipeLeftRight(false);

					$('#sliderCatBtn').off('swipe').on('swipe',function(e){
						e.preventDefault();
						toggleSwipeCat();
					});
					
					$('#divMenu').off('swipeup').on('swipeup',function(e){
						e.preventDefault();
						slideUpCat('cats');
					});
					
					$('#divMenu').off('swipedown').on('swipedown',function(e){
						e.preventDefault();
						slideDownCat(true);
					});
					
					autoScrollPageContentRole('pois');
				});
				
			

var originPOI; //Variable global para ver con que opcion del footer se ha entrado a la pantalla de POIs
var mapHeight;
var listHeight;
var listHeight_Expandido;
var listHeight_Contraido;
var showSearchDetails = false;
var deepSearchHasResults = true;
/**
 * Gestionan el estado de los collapsibles 
 */
var catExpanded = null;
var typeExpanded = null;
// Filtros utilizados en la busqueda.
var filterCategories = false;
var filterPlants = false;
var filterTerminals = false;

var showSearchInAllCategoriesButton = true;
var showSearchInAllAirportButton = true;


var reloadMap = false;
var fromMapTab = false;
var lastPosition = null;
//Ultima posicion cuando se saca el detalle del POI
var lastZoom = null;
//Ultimo zoom cuando se saca el detalle del POI

/**
 *Funcion global para arrancar el mapa
 */
function arrancaMapa() {//Centro y zoom si queremos que se ubique en alguna parte
	//console.log('arrancando Mapa');
	if(GestorOL.isAirportGeolocated() && eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)) {
		$('.localizadorButton-commonHeader').css('display', 'block');
	} else {
		$('.localizadorButton-commonHeader').css('display', 'none');
	}
	// fix height of content
	function fixContentHeight() {
		//console.log('Fixing content height');
		$('#map_layer').height(mapHeight);
		//Lo tenemos de cuando hemos cargado POIs
		$('#map_layer').width($(window).width());
		$('#poiTitle').css('display', 'none');
		if(window.map && window.map instanceof OpenLayers.Map && !reloadMap) {
			//console.log('Actualizando tamano del Mapa y capa a mostrar');
			GestorOL.refreshPois();
			if(fromMapTab && lastPosition != null && lastZoom != null) {//Venimos de cambiar POIs
				map.moveTo(lastPosition, lastZoom);
			}
			map.updateSize();
		} else {
			// initialize map
			//console.log('Init Mapa');
			GestorOL.initMap();
			if(fromMapTab && lastPosition != null && lastZoom != null) {//Arrancamos el mapa desde 0
				map.moveTo(lastPosition, lastZoom);
			}
			reloadMap = false;
		}
	}

	fixContentHeight();
	//Lo cambio porque ahora el DOM ya esta cargado

	// Map zoom
	if(!Utils.isIphone() && !Utils.isIpod() && !Utils.isIpad()) {
		
		$("#zoomIn" ).off("click");//RP - Se quita antes de asociarlo porque se ejecutaba n veces
		$("#zoomIn").click(function() {
			map.zoomIn();
		});
		$("#zoomOut" ).off("click");$("#zoomIn" ).off("click");//RP - Se quita antes de asociarlo porque se ejecutaba n veces
		$("#zoomOut").click(function() {
			map.zoomOut();
		});
	}
}





/**
 * Funcion general que se encarga de pintar la caja con el nombre
 * @param {Object} feature recibe el feature que le han seleccionado
 */
function onSelectFunction(feature) {
	//Moverlo de capa para que no se cambie al hacer zoom o moverse
	var selectionLayer = GestorOL.getSelectedLayer();
    selectionLayer.removeAllFeatures();
	var featCopy = feature.clone();

	selectionLayer.addFeatures([featCopy]);
	selectionLayer.redraw();

	//Mostramos la caja donde corresponde
	//console.log('Selected:'+feature.attributes.assetId);
	var coords = feature.geometry.getBounds().getCenterLonLat();
	var idPoi = feature.attributes.idPoi;
	var categoria = feature.attributes.categoria;
	var tipo = feature.attributes.tipo;
	var name = feature.attributes.nombre;
	var detalle = feature.attributes.detalle;
	var term = feature.attributes.term;
	var floor = feature.attributes.floor;
	eventMapSelectPOI(categoria);
	if(idPoi != null && detalle != 0) {
		//console.log('No null');
		paintTitlePoi('poiTitle', name, 'poiTitleSection', 'poiTitleSectionText', true);
		$('#poiTitle').css('display', 'block');
		$('#poiTitle').unbind('click').click(function() {
			reloadMap = true;
			eventMapPOIDetail(categoria);
			browsePOIDetail(idPoi,categoria,tipo,name,coords.lat,coords.lon,term,floor);
		});
	} else {
		paintTitlePoi('poiTitle', feature.attributes.nombre, 'poiTitleSection', 'poiTitleSectionText', false);
		$('#poiTitle').css('display', 'block');
		$('#poiTitle').unbind('click');
	}
}

function clearSelection() {
	$('#poiTitle').css('display', 'none');
	$('#poiTitle').unbind('click');
}

function fixPoisHeight() {
	
	//RP - 1.2.1 FIX - Se calcula el height para evitar problemas de teclado
	var mobileHeight =null;
	if(initialWindowHeight==null){
		mobileHeight = $(window).height();
	}else{
		mobileHeight = initialWindowHeight;
	}
	
	var content = $('#pois_content'), viewHeight = mobileHeight;

	//Por css se los tamaÃ±os, calculo el tam max en px:
	var tamHeader = 56;
	var tamCabTab = 23;
	var tamTemSel = 32;
	var tamBar = 44;

	var tamMax = viewHeight - tamHeader - tamCabTab - tamTemSel + 40; //Ese 40 no veo de donde viene
	mapHeight = tamMax - 42;
	listHeight = tamMax - 42; // <-- Magic number !
	listHeight_Expandido = tamMax - 124;
	listHeight_Contraido = tamMax - 72;

	content.css('height', tamMax);
	//Fijamos el background del aeropuerto:
	$('#backgroundAirport').css('height', tamMax);
	getAirportBackground(GestorPOIs.SELECTED_AIRPORT_ID(), function(url) {
		$('#backgroundAirport').css('background-image', 'url(\'' + url + '\')');
	});

}



/**
 * Devuelve la ruta a la imagen del aeropuerto en caso de que exista, o la de por defecto
 * @param {Object} airportId
 * @param {Object} okCB
 */
function getAirportBackground (airportId, okCB) {
	$.ajax({
		type : 'GET',
		url : $.mobile.path.get() + 'img/' + airportId + '.jpg',
		success : function(data) {//Existe la imagen
			okCB($.mobile.path.get() + 'img/' + airportId + '.jpg');
		},
		error : function(data) {//No existe la imagen
			okCB($.mobile.path.get() + 'img/defaultBackGroundAirport.jpg');
		}
	});
}


function changeStar(poiTable) {

	var _favouritePOIControl = $(poiTable).find('a');

	var theme = $(_favouritePOIControl).attr('data-theme');

	if(theme == 'stars') {
		$(_favouritePOIControl).attr('data-theme', 'starsUnselected');
		$(_favouritePOIControl).removeClass('ui-btn-up-stars').addClass('ui-btn-up-starsUnselected');
	} else {
		$(_favouritePOIControl).attr('data-theme', 'stars');
		$(_favouritePOIControl).removeClass('ui-btn-up-starsUnselected').addClass('ui-btn-up-stars');
	}
	$(_favouritePOIControl).trigger('create');
}

// ---------------------------------------------------------------------------
// FUNCIONES: Lista de POIs --------------------------------------------------
// ---------------------------------------------------------------------------

// Carga dinÃ¡mica de los POIs en la lista de POIs
function addPoisCategories(poisCategoriesArray, poisDivId) {
	if(GestorPOIs.POIS().length > 0) {

		// RecuperaciÃ³n de los POIS favoritos de la tabla interna. Tanto si la recuperaciÃ³n es exitosa como si hay un error
		// se devuelve un array del tipo [ {'idPoi':1,'idAsset':2}, {'idPoi':5',idAsset':3}, {'idPoi':8',idAsset':5} ] o un array vacÃ­o se hay un error
		GestorFavouritePOIs.getFavouritePOIs(function(data) {
			// ConversiÃ³n del array de JSON en un array de int
			var _favouritePOIsIds = [];

			$(data).each(function() {
				_favouritePOIsIds.push(this.idPoi);
			});

			var listHtml = '<div class="collapsibleLista" data-role="collapsible-set" >';
			var poiCounter = 1;
			// Show always open the first Category and Type when refreshing the screen
			var isFirstCategory = (catExpanded==null); //true;
			var isFirstType = (typeExpanded==null); //true;
			
			for(var category in poisCategoriesArray) {
	
				var _params = [{
					'NAME' : 'POI_CATEGORY_ID',
					'VALUE' : category
				}];
				var categ = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_CATEGORIES(), _params);
				if ($.isEmptyObject(categ) || $.isEmptyObject(categ[0])) {
					continue;
				}
				var categ_desc = categ[0]['POI_CATEGORY_DESC'][GestorIdiomas.getLang()];
				var categ_event = categ[0]['POI_CATEGORY_DESC']['es_ES'];
				var categ_id = categ[0]['POI_CATEGORY_ID'];
				var collapseCat = true;
				if((catExpanded!=null && catExpanded==categ_id) || (isFirstCategory && catExpanded!=categ_id)){
					collapseCat = false;
				}
				isFirstCategory = false;
				
				listHtml += '<div data-role="collapsible" data-cat="true" id="'+categ_id+'" data-collapsed="'+collapseCat.toString()+'" data-theme="collapsibleMain" data-iconpos="right" data-content-theme="collapsibleMainContent"  data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d"><h3>' + categ_desc + '</h3><div data-role="collapsible-set">';
				var _showedPois = [];
				//SE utiliza para no repetir IdPOIS
				var _lastType = null;
				var _elemPint = false;
				for(var poiIndex in poisCategoriesArray[category]) {
					//Miramos si se ha escrito el titulo del tipo
					var _currType = poisCategoriesArray[category][poiIndex]['codigoTipo'];
					
					if(poisCategoriesArray[category][poiIndex]['visible'] != 0) {
						_elemPint = true;
						//Se ha pintado al menos uno
						if(_lastType != _currType) {
							_lastType = _currType;
							var _params = [{
								'NAME' : 'POI_TYPE_ID',
								'VALUE' : _lastType
							}];
							var type = $.getFilteredArrayFromJSONArray(GestorPOIs.POIS_TYPES(), _params);
							var text = type[0]['POI_TYPE_DESC'][GestorIdiomas.getLang()];
							var type_event = type[0]['POI_TYPE_DESC']['es_ES'];
							var type_id = type[0]['POI_TYPE_ID'];
							var collapseType = true;
							if((typeExpanded!=null && typeExpanded==type_id) || (isFirstType && typeExpanded!=type_id)){
								collapseType = false;
							}
							isFirstType = false;
							
							listHtml += '</div><div data-role="collapsible" data-typePoi="true" id="'+type_id+'" data-collapsed="'+collapseType.toString()+'" data-theme="collapsiblesTitle" data-iconpos="right" data-content-theme="collapsiblesTitleContent" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d"><h3>' + text + '</h3>';
						}

						// Definir el tema de la estrella dependien de si es POI favorito ------
						var _starTheme = "starsUnselected";
						var _displayMode = '';
						var _poidID = poisCategoriesArray[category][poiIndex]['idPoi'];

						if((_poidID != null && _poidID != 0) && $.inArray(parseInt(_poidID), _favouritePOIsIds) > -1)
							_starTheme = "stars";
						else {
							if(!notFavouritePOISVisible)
								var _displayMode = 'none';
						}
						// ---------------------------------------------------------------------

						var _obs = GestorPOIDetails.getPOIObs(poisCategoriesArray[category][poiIndex]);
						var _planta = GestorPOIDetails.getPOIPlanta(poisCategoriesArray[category][poiIndex]);
						var _floor = poisCategoriesArray[category][poiIndex]['plantaEdificio'];
						var _terminal = poisCategoriesArray[category][poiIndex]['areaTerminal'];
						var _lat = null;
						var _lon = null;

						if(GestorOL.isAirportGeolocated()) {
							_lat = poisCategoriesArray[category][poiIndex]['latitudAspa'];
							_lon = poisCategoriesArray[category][poiIndex]['longitudAspa'];
						} else {
							_lat = poisCategoriesArray[category][poiIndex]['latitud'];
							_lon = poisCategoriesArray[category][poiIndex]['longitud'];
							if($.objectHasContent(_lat) && $.objectHasContent(_lon)) {
								var _tmp = GestorOL.transformCoordWPA(_lat, _lon);
								_lat = _tmp[0];
								_lon = _tmp[1];
							}
						}

						if(!$.objectHasContent(_lat) || !$.objectHasContent(_lon)) {//Si estan vacias, a null
							_lat = null;
							_lon = null;
						}

						var _currAssetType = poisCategoriesArray[category][poiIndex]['assetType'];
						var _title = GestorPOIDetails.getPOITitle(poisCategoriesArray[category][poiIndex]);
						var _titleEvent = GestorPOIDetails.getPOIEventTitle(poisCategoriesArray[category][poiIndex]);
						var _showLink = (poisCategoriesArray[category][poiIndex]['detalle'] != 0);

						if(_showedPois.indexOf(_poidID) == -1) {//Si no estÃ¡
							_showedPois.push(_poidID);

							var textTerminalPlanta = '';
							if(_terminal == null && _floor == null) {
								textTerminalPlanta = GestorIdiomas.getLiteral('poiRecinto');
							} else {
								textTerminalPlanta = _terminal + ' ' + _planta;
							}

							if(_poidID == null || _poidID == 0) {//Si el idPoi es null no se puede guardar como favorito ni enlazar - NO DEBERÃ�A SUCEDER NUNCA PERO ESTÃ� PARA QUE NO DE ERROR POR SI LAS MOSCAS
								listHtml += '<table id="table' + poiCounter + '" class="listaPOIsLista" cellpadding="0" cellspacing="0" width="100%" favourite="' + (_starTheme == "stars") + '" poiId="' + _poidID + 'style="display:' + _displayMode + '" >';
								listHtml += '<tr><td width="10%"></td>';
								if(_lat==null || _lon==null || _terminal == null || _floor == null){
									listHtml += '<td width="80%">';
								} else{
									listHtml += '<td width="70%">';
								}
								
								listHtml += '<div class="title-listaPOIsLista">' + _title + '</div>';
								if($.objectHasContent(_obs)) {
									listHtml += '<div class="description-listaPOIsLista">' + _obs + '</div>';
								}
								listHtml += '<div class="description-listaPOIsLista">' + textTerminalPlanta + '</div></td>';
								
								if(_lat!=null && _lon!=null && _terminal != null && _floor != null){
									listHtml += '</td><td width="10%"><a data-role="button" onclick="toMap(' + _poidID + ',\'' + categ_event + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');" data-theme="mapa" data-icon="mapa" data-iconpos="notext">Mapa</a>';
								}

								listHtml += '<td width="10%"></td></tr></table>';
							} else {//Si todo esta relleno comportamiento por defecto

								listHtml += '<table id="table' + poiCounter + '" class="listaPOIsLista" cellpadding="0" cellspacing="0" width="100%" favourite="' + (_starTheme == "stars") + '" poiId="' + _poidID + '" style="display:' + _displayMode + '" >';
								listHtml += '<tr><td width="10%">';
								listHtml += '<a data-role="button" id="star' + poiCounter + '" onclick="favouritePOI_click(\'table' + poiCounter + '\',\''+categ_desc+'\',\''+text+ '\',\''+categ_event+'\',\''+type_event+'\');"  data-theme="' + _starTheme + '" data-icon="star" data-iconpos="notext" >Favorito</a>';
								listHtml += '</td>';
								if(_lat==null || _lon==null || _terminal == null || _floor == null){
									listHtml += '<td width="80%">';
								} else{
									listHtml += '<td width="70%">';
								}
								listHtml += '<div class="title-listaPOIsLista" ';
								if(_showLink) {
									listHtml += 'onclick="eventPoiDetail(\''+categ_event+'\',\''+type_event+'\');browsePOIDetail(' + _poidID + ',\'' + categ_event + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');"';
								}
								listHtml += '>' + _title + '</div>';
								
								if($.objectHasContent(_obs)) {

									listHtml += '<div class="description-listaPOIsLista" ';
									if(_showLink) {
										listHtml += 'onclick="eventPoiDetail(\''+categ_event+'\',\''+type_event+'\');browsePOIDetail(' + _poidID + ',\'' + categ_event + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');"';
									}
									listHtml += '>' + _obs + '</div>';
								}
								listHtml += '<div class="description-listaPOIsLista" ';
								if(_showLink) {
									listHtml += 'onclick="eventPoiDetail(\''+categ_event+'\',\''+type_event+'\');browsePOIDetail(' + _poidID + ',\'' + categ_event + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');"';
								}
								listHtml += '>' + textTerminalPlanta + '</div>';
								if(_lat!=null && _lon!=null && _terminal != null && _floor != null){
									listHtml += '</td><td width="10%"><a data-role="button" onclick="toMap(' + _poidID + ',\'' + categ_event + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');" data-theme="mapa" data-icon="mapa" data-iconpos="notext">Mapa</a>';
								}
								listHtml += '</td><td width="10%">';
								if(_showLink) {
									listHtml += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/flecha_dcha.png"  class="iconEnlace" onclick="browsePOIDetail(' + _poidID + ',\'' + categ_desc + '\',\''+ type_event + '\',\'' + _titleEvent+'\',' + _lat + ',' + _lon + ',\'' + _terminal + '\',\'' + _floor + '\');" >';
								}
								
								listHtml += '</td>';
								listHtml +='</tr></table>';
								
							}
						}
						poiCounter += 1;
					}
				}

				if(!_elemPint) {//No se ha pintado ninguno, ponemos mensaje de ver en mapa

					listHtml += '<table class="listaPOIsLista" cellpadding="0" cellspacing="0" width="100%">';
					listHtml += '<tr>';
					listHtml += '<td width="90%">';
					listHtml += '<div class="description-listaPOIsLista" onclick="$(\'#tabMapaLink a\').click();">' + GestorIdiomas.getLiteral('noPOIsInList') + '</div>';
					listHtml += '</td><td width="10%">';
					listHtml += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/flecha_dcha.png"  class="iconEnlace" onclick="$(\'#tabMapaLink a\').click();" >';
					listHtml += '</td></tr></table>';
				}
				listHtml += '</div></div>';
			}

			listHtml += '</div>';

			$('#' + poisDivId).html(listHtml);
			$('#' + poisDivId).trigger('create');

			$('#info_div').css('display', 'none');
			$('#content_div').css('display', '');

			$('[data-role=collapsible]').on('collapse', function(e) {
				if($(e.target).attr('data-cat')!=null && catExpanded==$(e.target).attr('id')){ //es una categoria
					catExpanded = null;
				}
				if($(e.target).attr('data-typePoi')!=null && typeExpanded==$(e.target).attr('id')){ //es un tipo
					typeExpanded = null;
				}
				LastContentScroll.refresh();
			});

			$('[data-role=collapsible]').on('expand', function(e) {
				if($(e.target).attr('data-cat')!=null){ //es una categoria
					catExpanded = $(e.target).attr('id');
				}
				if($(e.target).attr('data-typePoi')!=null){ //es un tipo
					typeExpanded = $(e.target).attr('id');
				}
				LastContentScroll.refresh();
			});
			// if (_catState == 0) { // contraido
 			//	autoScrollDefiningContentWithSize('div_lista', listHeight_Contraido, true, false);
			//} else { // expandido
				autoScrollDefiningContentWithSize('div_lista', listHeight_Expandido, true, false);	
			//}			
		});
	} else {
		$('#info_div').css('display', 'none');
		$('#content_div').css('display', '');

		var searchDetails = "";
		// if (showSearchDetails) {
			// searchDetails = " " + GestorIdiomas.getLiteral('search_not_found_6');
			searchDetails += "<ul>";
			var strBusq = $('#searchPOI').val();
			if (strBusq) {
				searchDetails += "<li style=\"text-align:left\">";
				searchDetails += GestorIdiomas.getLiteral('search_not_found_2') + strBusq;
				searchDetails += "</li>";
			}
			/*
			if (filterPlants) {
				searchDetails += "<li style=\"text-align:left\">";
				searchDetails += GestorIdiomas.getLiteral('search_not_found_7');
				searchDetails += "</li>";	
			}
			if (filterTerminals) {
				searchDetails += "<li style=\"text-align:left\">";
				searchDetails += GestorIdiomas.getLiteral('search_not_found_8');
				searchDetails += "</li>";	
			}
			if (filterCategories) {
				searchDetails += "<li style=\"text-align:left\">";
				searchDetails += GestorIdiomas.getLiteral('search_not_found_9');
				searchDetails += "</li>";	
			}
			if (!filterPlants && !filterTerminals && !filterCategories && !strBusq) {
				searchDetails += "<li style=\"text-align:left\">";
				searchDetails += GestorIdiomas.getLiteral('search_not_found_10');
				searchDetails += "</li>";	
			}
			*/
			searchDetails += "</ul>";
			
			// Se ocultan los botones "buscar en todas categorias" y "buscar en todo el aeropuerto" segun se utilicen.
			if (showSearchInAllCategoriesButton || showSearchInAllAirportButton) {
			searchDetails += GestorIdiomas.getLiteral('search_not_found_11');
			searchDetails += "<br /><br />";
				searchDetails += '<div class="buttonSection" align="center"><table>';			
				if (showSearchInAllCategoriesButton) {
					searchDetails += '<tr><td style="text-align:center"><a href="#" data-role="button" data-theme="buttonOscuro" onclick="javascript:searchInAllCategories();">' + GestorIdiomas.getLiteral('search_not_found_12') + '</a></td></tr>';	
				}
				if (showSearchInAllAirportButton) {
					searchDetails += '<tr><td style="text-align:center"><a href="#" data-role="button" data-theme="buttonClaro" onclick="javascript:searchInAllAirport();">' + GestorIdiomas.getLiteral('search_not_found_13') + '</a></td></tr>';	
				}			
				searchDetails += '</table>';
			searchDetails += "</div>";
			}			
			showSearchDetails = false;
		// }
		// Tras el filtrado no hay POIs		
		var text = '';
		if(GestorPOIs.SELECTED_POIS_TYPES().length>0 || deepSearchHasResults == false){
			text = GestorIdiomas.getLiteral('pois_noPOIsInFilter');				

		} else{
			text = GestorIdiomas.getLiteral('pois_noCategoriesSelected');			
			
		}
		text += searchDetails;
		
		paintLeftIconMessage('div_lista', text, 'controlSection', '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell', listHeight_Expandido - 20);
		slideRightListado();		
	}
}

function searchInAllCategories() {	
	// Se oculta el boton de buscar en todas las categorias. La acciÃ³n ya se ha realizado
	showSearchInAllCategoriesButton = false;

	paintUpperIconMessage('div_lista', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
	
	filterCategories = true;
	// Se busca en todas las categorias
	GestorPOIs.fillAllCategoriesSelected();
	// Se marcan en el menu inferior todas las categorias como seleccionadas
	refreshPoisCategories('pois_bar');
	
	showSearchDetails = false;
	deepSearchHasResults = true;
	//Tenemos que filtrar la variable pois para traer solamente los del tipo que queremos
	
	var _categoryIdField = 'codigoGrupo';	
	GestorPOIs.fillAirportPoiList(function(data) {		
		// Hay resultados con el filtro actual ?
		if (GestorPOIs.POIS().length > 0) {
			// Si hay resultados
			var poisCategoriesArray = $.getGroupedArrayFromJSONArray(data, _categoryIdField);
			addPoisCategories(poisCategoriesArray, 'div_lista');
			PageScroll.refresh();
		
		} else {
			// No hay resultados	
			// Se busca eliminando el filtro de Planta (se aÃ±aden todas las plantas). Solo buscar por terminal
			// Se aÃ±aden todas las plantas que tiene la terminal => Buscar por terminal
			// Se limpia el Combo de Plantas
			resetCmbFloors();
			
			GestorPOIs.fillFloorsForSelectedTerminalFilter();
			filterPlants = true;
			
			GestorPOIs.fillAirportPoiList(function(data2) {				
				deepSearchHasResults = (GestorPOIs.POIS().length > 0);
				// Resultados de la busqueda sin criterio de Planta
				var poisCategoriesArray2 = $.getGroupedArrayFromJSONArray(data2, _categoryIdField);
				addPoisCategories(poisCategoriesArray2, 'div_lista');
				PageScroll.refresh();
			});
		}		
	});
	if(GestorOL.getMapaVisible()){
		GestorOL.refreshPois();
	}
	
}

function searchInAllAirport() {	
	// Se oculta el boton de buscar en todo el aeropuerto. La acciÃ³n ya se ha realizado
	showSearchInAllAirportButton = false;

	paintUpperIconMessage('div_lista', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
	
	// Se quitan los filtros de Terminal y Planta
	// Para el Aeropuerto seleccionado se aÃ±aden todas las terminales y plantas como criterio de busqueda.
	// Reset del Combo de Plantas
	resetCmbFloors();
	// Reset del Combo de Terminales
	var termGeneric = GestorIdiomas.getLiteral('pois_maps');
	drawAirportName(termGeneric);
	
	GestorPOIs.fillAllTerminalsAndFloorFilters();
	filterPlants = true;
	filterTerminals = true;
	
	showSearchDetails = false;
	deepSearchHasResults = true;
	//Tenemos que filtrar la variable pois para traer solamente los del tipo que queremos
	var _categoryIdField = 'codigoGrupo';	
	GestorPOIs.fillAirportPoiList(function(data) {	
		deepSearchHasResults = (GestorPOIs.POIS().length > 0);	
		var poisCategoriesArray = $.getGroupedArrayFromJSONArray(data, _categoryIdField);
		addPoisCategories(poisCategoriesArray, 'div_lista');
		PageScroll.refresh();		
	});
	if(GestorOL.getMapaVisible()){
		GestorOL.refreshPois();
	}
}

// ---------------------------------------------------------------------------
// FUNCIONES: menu_swipe de CATEGORIAS ---------------------------------------
// ---------------------------------------------------------------------------

// Carga dinÃ¡mica de las categorÃ­as al menu_swipe
function cargarPoisCategories(poisCategoriesBarId) {
	var listHtml = '';
	var pois_categories = GestorPOIs.POIS_CATEGORIES();
	// Orden alfabÃ©tico de categorÃ­as
	pois_categories.sort(function(a, b) {
		return (a.MENUSWIPE_INDEX < b.MENUSWIPE_INDEX) ? -1 : 1;
	});

	var poiCategoryIconsPath = ConstF.POIsCategoryIconsPath;

	for(var i = 0; i < pois_categories.length; i++) {
		var id = pois_categories[i].POI_CATEGORY_ID;
		var event = pois_categories[i]['POI_CATEGORY_DESC']['es_ES'];
		var _categorySelectionMode = GestorPOIs.getCategorySelectionMode(id);
		listHtml += '<a id="'+id+'" onclick="catExpanded=null;typeExpanded=null;setFilterCategory(this,\'' + id + '\',\''+event+'\');" selectionMode="' + _categorySelectionMode + '" unchkImageSrc="' + $.mobile.path.get() + '' + poiCategoryIconsPath + pois_categories[i].POI_CATEGORY_ICON_UNCHK + '" chkImageSrc="' + poiCategoryIconsPath + pois_categories[i].POI_CATEGORY_ICON_CHK + '" partchkImageSrc="' + poiCategoryIconsPath + pois_categories[i].POI_CATEGORY_ICON_PARTIALCHK + '"  >';
		listHtml += '<img src="' + $.mobile.path.get() + '"/ >';
		listHtml += '</a>';
	}

	$('#' + poisCategoriesBarId).html(listHtml);
	$('#' + poisCategoriesBarId).trigger('create');
}

/**
 *Refresca y repinta el estado de las categorias del menuswipe 
 */
function refreshPoisCategories(poisCategoriesBarId){
	var pois_categories = GestorPOIs.POIS_CATEGORIES();
	for(var i = 0; i < pois_categories.length; i++) {
		var id = pois_categories[i].POI_CATEGORY_ID;
		var _categorySelectionMode = GestorPOIs.getCategorySelectionMode(pois_categories[i].POI_CATEGORY_ID);
		$('#'+id).attr('selectionMode',_categorySelectionMode);
		var imageSrc = "";
		if(_categorySelectionMode=="complete"){
			imageSrc = $('#'+id).attr("chkImageSrc");
		} else if(_categorySelectionMode=="none"){
			imageSrc = $('#'+id).attr("unchkImageSrc");
		} else if(_categorySelectionMode=="partial"){
			imageSrc = $('#'+id).attr("partchkImageSrc");
		}

		$('#'+id).children('img').each(function(){
			$(this).attr('src',imageSrc);
		});
		
	}
}

// Aplica el filtro de categorÃ­a del menu_swipe a la lista de botones
function setFilterCategory(control, poiCategoryId,poiCategoryEvent) {
	var _previousSelectionMode = $(control).attr("selectionMode");
	paintUpperIconMessage('div_lista', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
	//Cuidado se deben aÃ±adir tipos y el click es la categorÃ­a
	//se queda todo a medias hasta tener los pois correctos.

	if(_previousSelectionMode == "complete") {
		GestorPOIs.removeAllTypesSelectedInCategory(poiCategoryId);
	} else {
		eventSelectCat(poiCategoryEvent);
		GestorPOIs.fillAllTypesSelectedInCategory(poiCategoryId);
	}
	
	//Si no hay planta seleccionada, expandir el listado
	if(GestorPOIs.SELECTED_FLOORS_ID().length==0){
		slideRightListado();
	}

	refreshPoisCategories('pois_bar');
	refreshPoisList();
}
/*
function refreshPoisList() {
	//Tenemos que filtrar la variable pois para traer solamente los del tipo que queremos
	paintUpperIconMessage('div_lista', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
	var _categoryIdField = 'codigoGrupo';
	GestorPOIs.fillAirportPoiList(function(data) {
		var poisCategoriesArray = $.getGroupedArrayFromJSONArray(data, _categoryIdField);
		addPoisCategories(poisCategoriesArray, 'div_lista');
		PageScroll.refresh();
	});
	if(GestorOL.getMapaVisible()){
		GestorOL.refreshPois();
	}
}
*/

function refreshPoisList() {
	filterCategories = false;
	filterPlants = false;
	filterTerminals = false;

	showSearchDetails = false;
	deepSearchHasResults = true;
	
	// Activamos los botones de buscar en todas las categorias y todo el aeropuerto (busqueda extendida)
	showSearchInAllCategoriesButton = true;
	showSearchInAllAirportButton = true;
	//Tenemos que filtrar la variable pois para traer solamente los del tipo que queremos
	paintUpperIconMessage('div_lista', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
	var _categoryIdField = 'codigoGrupo';	
	GestorPOIs.fillAirportPoiList(function(data) {
		// Hay resultados con el filtro actual ?
		if (GestorPOIs.POIS().length > 0) {
			// Si hay resultados
			var poisCategoriesArray = $.getGroupedArrayFromJSONArray(data, _categoryIdField);
			addPoisCategories(poisCategoriesArray, 'div_lista');
			PageScroll.refresh();
		
		} else {
			// No hay resultados	
			// No hay resultados
			// Se busca eliminando el filtro de Planta
			GestorPOIs.clearFloorFilters();
			// Se limpia el Combo de Plantas
			resetCmbFloors();
			filterPlants = true;
						
			GestorPOIs.fillAirportPoiList(function(data2) {				
				showSearchDetails = (GestorPOIs.POIS().length == 0);
				// Resultados de la busqueda sin criterio de Planta
				var poisCategoriesArray2 = $.getGroupedArrayFromJSONArray(data2, _categoryIdField);
				addPoisCategories(poisCategoriesArray2, 'div_lista');
				PageScroll.refresh();
			});
		}
		
	});
	if(GestorOL.getMapaVisible()){
		GestorOL.refreshPois();
	}
}

function resetCmbFloors() {
	$('#poiTitle').css('display', 'none');
	$('#floorIco').removeClass('iconFloor').addClass('iconTermMap').attr('src','../../themes/default/common/img/ico_mapa.png');
	$('#backgroundAirport').css('display', 'block');
	$('#selectedFloorLink').html(GestorIdiomas.getLiteral('pois_maps'));
	$('.localizadorButton-commonHeader').css('display', 'none');
	GestorOL.setMapaVisible(false);
	activateSwipeLeftRight(false);
	slideRightListado();
		
}

/**
 * Carga el combo de terminales
 */
function initCmbTerminals() {
	var airport = GestorAirports.getAirportById(GestorPOIs.SELECTED_AIRPORT_ID());
	var termGeneric = GestorIdiomas.getLiteral('pois_allTerminalsText');
	drawAirportName(termGeneric);

	//Rellenamos las terminales poniendo en la primera una terminal ficticia que emula a todo el aeropuerto
	var _terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());

	_terminals.splice(0, 0, {
		"TERMINAL_ID" : "",
		"TERMINAL_NAME" : {
			"es_ES" : termGeneric,
			"en_GB" : termGeneric
		}
	});

	//Ponemos la que este seleccionada
	var selTerminals = GestorPOIs.SELECTED_TERMINALS_ID();
	var termSelected = "";
	//Por defecto ninguna terminal seleccionada
	if(selTerminals.length > 0) {
		termSelected = selTerminals[1];
	}
	
	//Si solo hay una, esa esta seleccionada
	if(_terminals.length==2){
		termSelected = _terminals[1].TERMINAL_ID;
	}

	fillCmbTerminalList(_terminals, 'cmbAirportTerminal', GestorIdiomas.getLiteral('pois_allTerminalsText'), termSelected);
}

/**
 * Adecua el CSS a la pinta que tiene la cabecera cuando se muestra como titulo el nombre del aeropuerto 
 * Antes aeropuerto. AHORA TERMINAL. //TODO: ACtualizar a terminal si al final se deja asi
 */
function drawAirportName(airportName){
	$('.section-TerminalSection').css({'width':'78%','left':'11%','display':'block'});
	$('#termIco').removeClass('iconTerm').addClass('iconTermMap').attr('src','../../themes/default/common/img/ico_mapa.png');
	$('.section-FloorSection').html('').css({'width':'0%','display':'none'});
	$('#selectedTerminalLink').html(airportName);
}

/**
 * Carga el combo de floors 
 */
function initCmbFloors(terminalId) {
	//Rellenamos las plantas colocando en la primera una ficticia que emula a todas las plantas
	var floors = GestorAirports.getFloorById(GestorPOIs.SELECTED_AIRPORT_ID(), terminalId);

	floors.splice(0, 0, {
		"FLOOR_ID" : "",
		"FLOOR_NAME" : {
			"es_ES" : GestorIdiomas.getLiteral('pois_allFloors'),
			"en_GB" : GestorIdiomas.getLiteral('pois_allFloors')
		}
	});

	//Ponemos la que este seleccionada
	var selFloors = GestorPOIs.SELECTED_FLOORS_ID();
	var floorSelected = "";
	//Por defecto ninguna terminal seleccionada
	if(selFloors.length > 0) {
		floorSelected = selFloors[1];
		//Lo parseamos
		floorSelected = floorSelected.substring(floorSelected.indexOf('_')+1);
	}

	fillCmbFloorList(floors, 'cmbAirportFloor', GestorIdiomas.getLiteral('pois_allFloorsText'), floorSelected);

}

function showTerminalSelect() {
	$('#cmbAirportTerminal').scroller('show');
}

function showFloorSelect() {
	$('#cmbAirportFloor').scroller('show');
}

function ocultaCombos(){
	$('.section-TerminalSection').css('display', 'none');
	$('.section-FloorSection').css('display','none');
}

/**
 * Invocado cuando se cambia el combo. Si el terminalId es "" entonces se ha seleccionado el aeropuerto
 * y por tanto no se filtra ninguna terminal
 * Se puede definir un floor por defecto para fijar un floor al cambiar la terminal, si la terminal no es vacia
 */
function changeTerminalSelection(terminalId,flPredefinedId,dontSlide) {
	GestorPOIs.clearAllTerminalFloorFilters();
	
	if(!dontSlide){
		slideRightListado();
	}
	if(terminalId == "") {//aeropuerto
		var termGeneric = GestorIdiomas.getLiteral('pois_maps');
		drawAirportName(termGeneric);
	} else {//Terminal
		if(flPredefinedId!=null){
			GestorPOIs.addTerminalFloor(terminalId, flPredefinedId);
		} else {
			GestorPOIs.addTerminal(terminalId);
		}
		var term = GestorAirports.getTerminalById(GestorPOIs.SELECTED_AIRPORT_ID(),terminalId)[0];
		$('#selectedTerminalLink').html(term.TERMINAL_NAME[GestorContexto.CONTEXT().UC_LANGUAGE_ID]);
		$('#termIco').removeClass('iconTermMap').addClass('iconTerm').attr('src','../../themes/default/common/img/flecha_dcha.png');
		$('.section-TerminalSection').css({'width':'39%','left':'1%','display':'block'});
		var html = '<a href="#" id="selectedFloorLink">' + GestorIdiomas.getLiteral('pois_maps') + '</a><img id="floorIco" class="iconTermMap" src="../../themes/default/common/img/ico_mapa.png"/>';
		html += '<div style="display:none">';
		html += '<select id="cmbAirportFloor" data-role="none" onchange="catExpanded=null;typeExpanded=null;GestorPOIDetails.clear();changeFloorSelection(this.value);"></select>';
		html += '</div>';
		$('.section-FloorSection').html(html).css({'width':'58%','left':'41%','display':'block'});
		initCmbFloors(terminalId);
	}
	
	$('#poiTitle').css('display', 'none');
	$('.localizadorButton-commonHeader').css('display', 'none');
	$('#backgroundAirport').css('display', 'block');
	GestorOL.setMapaVisible(false);
	activateSwipeLeftRight(false);
	refreshPoisList();
}

function changeFloorSelection(floorId) {
	if(!fromMapTab){
		lastPosition = null;
		lastZoom = null;
	}
	GestorPOIs.clearFloorFilters();
	if(floorId == "") {//Todas las plantas
		$('#poiTitle').css('display', 'none');
		$('#floorIco').removeClass('iconFloor').addClass('iconTermMap').attr('src','../../themes/default/common/img/ico_mapa.png');
		$('#backgroundAirport').css('display', 'block');
		$('#selectedFloorLink').html(GestorIdiomas.getLiteral('pois_maps'));
		$('.localizadorButton-commonHeader').css('display', 'none');
		GestorOL.setMapaVisible(false);
		activateSwipeLeftRight(false);
		slideRightListado();
		refreshPoisList();
		
	} else {//Sacar el mapa
		
		$('#floorIco').removeClass('iconTermMap').addClass('iconFloor').attr('src','../../themes/default/common/img/flecha_dcha.png');
		var currTerminal = GestorPOIs.SELECTED_TERMINALS_ID()[1];
		//En el 0 esta el null de recinto
		var floor = GestorAirports.getFloorById(GestorPOIs.SELECTED_AIRPORT_ID(),currTerminal,floorId)[0];
		GestorPOIs.addTerminalFloor(currTerminal, floorId);
		refreshPoisList();
		
		// Cuidado ! La busqueda puede haber eliminado el filtro de plantas
		if (GestorPOIs.SELECTED_FLOORS_ID().length > 0) {		
		$('#poiTitle').css('display', 'none');
		$('#backgroundAirport').css('display', 'none');
		$('#selectedFloorLink').html(floor.FLOOR_NAME[GestorContexto.CONTEXT().UC_LANGUAGE_ID]);
		GestorOL.setMapaVisible(true);
		activateSwipeLeftRight(true);
		arrancaMapa();
		GestorOL.cambiaPlanta(currTerminal, floorId);
		if(GestorPOIs.POIS().length!=0){
				// console.log("FJORDAN: slideLeftListado 1");
			slideLeftListado();
		} else{
			slideRightListado();
		}
		} else {
			$('#poiTitle').css('display', 'none');
			$('#floorIco').removeClass('iconFloor').addClass('iconTermMap').attr('src','../../themes/default/common/img/ico_mapa.png');
			$('#backgroundAirport').css('display', 'block');
			$('#selectedFloorLink').html(GestorIdiomas.getLiteral('pois_maps'));
			$('.localizadorButton-commonHeader').css('display', 'none');
			GestorOL.setMapaVisible(false);
			activateSwipeLeftRight(false);
			slideRightListado();
		}
	}
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

function browsePOIDetail(poiId, category, type, name, lat, lon, terminal, floor) {
	/*Nos quedamos con su ubicacion por si vuelve al mapa...*/
	lastPosition = GestorOL.getCurrentPosView();
	lastZoom = GestorOL.getCurrentZoom();
	GestorPOIDetails.setParameters(GestorPOIs.SELECTED_AIRPORT_ID(), poiId, category, type, name, lat, lon, terminal, floor);
	browseFromClick('detalle_poi.html', 'none');
}

function setFavouriteButtonState() {
	if(notFavouritePOISVisible)
		$('#favouriteButton').find('div').attr('class', 'favoritosButtonDes-commonHeader');
	else
		$('#favouriteButton').find('div').attr('class', 'favoritosButton-commonHeader');

	$('#favouriteButton').trigger('create');
}

function changeNotFavouriteVisibility() {
	notFavouritePOISVisible = !notFavouritePOISVisible;
	setFavouriteButtonState();

	var tablas = $('table[favourite=false]');
	var newNotFavouriteVisibility = '';
	if(!notFavouritePOISVisible)
		newNotFavouriteVisibility = 'none';

	tablas.css('display', newNotFavouriteVisibility);

	// A veces tarda en refrescart el contenido y no hace el autoscroll
	refreshPoisList();

	if(GestorOL.getMapaVisible()) {
		//console.log('Refrescando mapa por cambio en favoritos');
		GestorOL.refreshPois();
	}
}

function activateSwipeLeftRight(activate) {
	$('#sliderlista').off('swipeleft');
	$('#sliderlista').off('swiperight');
	if (activate) {
		$('#sliderlista').on('swipeleft',function(e){
			/** e.preventDefault(); */
			slideLeftListado();
			return false;
		});					
		$('#sliderlista').on('swiperight',function(e){
			/** e.preventDefault(); */
			slideRightListado();
			return false;
		});
	}
};

var _listState = 1; //1 - expandido , 0 - contraido

//Semaforo para la animacion
function toggleSwipeListado() {
	if($('#sliderListaDivBtn').hasClass('btnLista-left')) {
		eventSlideListado(true);
		slideRightListado();
	} else {
		eventSlideListado(false);
		slideLeftListado();
	}
}

function slideLeftListado() {
	_listState = 0;
	$('#div_lista').removeClass('lista-right').addClass('lista-left');
	$('#sliderListaDivBtn').removeClass('btnLista-right').addClass('btnLista-left');
	
	$('#sliderListaDivBtn span.ui-icon').removeClass('ui-icon-arrow-d').addClass('ui-icon-arrow-u');
	if (GestorOL.getMapaVisible()) {
		$('#sliderListaDivBtn').show();	
	} else {
		$('#sliderListaDivBtn').hide();
	}	
}

function slideRightListado() {
	_listState = 1;
	$('#div_lista').removeClass('lista-left').addClass('lista-right');
	$('#sliderListaDivBtn').removeClass('btnLista-left').addClass('btnLista-right');
	
	$('#sliderListaDivBtn span.ui-icon').removeClass('ui-icon-arrow-u').addClass('ui-icon-arrow-d');
	if (GestorOL.getMapaVisible()) {
		$('#sliderListaDivBtn').show();	
	} else {
		$('#sliderListaDivBtn').hide();
	}	
}

var _catState = 1; //1 - expandido , 0 - contraido

function slideDownCat(bTransition) {
	_catState = 0;
	$('#pois_bar').removeClass('bar-up').addClass('bar-down');
	$('#search_bar').removeClass('bar-up').addClass('bar-down');
	$('#sliderCatBtn').removeClass('btnCat-up').addClass('btnCat-down');
	$('#sliderSearchPoisBtn').removeClass('btnCat-up').addClass('btnCat-down');
	
	if(bTransition){
		$('#sliderCatBtn').one('webkitTransitionEnd',
			function(){
				$('#pois_bar').css('z-index','-9999');
				$('#search_bar').css('z-index','-9999');
			}
		);
	}else{
		$('#pois_bar').css('z-index','-9999');
		$('#search_bar').css('z-index','-9999');
	}
	
	$('#sliderCatBtn span.ui-icon').removeClass('ui-icon-arrow-d').addClass('ui-icon-arrow-u');
	$('#sliderSearchPoisBtn span.ui-icon').removeClass('ui-icon-arrow-d').addClass('ui-icon-arrow-u');
	
	$('#sliderCatBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-inactive')
							.addClass('btnCat-down')
							.addClass('ui-btn-up-buttonOscuro');
	$('#sliderCatBtn').find('.ui-icon').css('display','block');
	
	$('#sliderSearchPoisBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-inactive')
							.addClass('btnCat-down')
							.addClass('ui-btn-up-buttonOscuro');
	$('#sliderSearchPoisBtn').find('.ui-icon').css('display','block');
	
	autoScrollDefiningContentWithSize('div_lista', listHeight_Contraido, true, false);	
};

function slideUpCat(caller) {
	_catState = 1;
	$('#pois_bar').css('z-index','200');
	$('#pois_bar').removeClass('bar-down').addClass('bar-up');
	$('#search_bar').css('z-index','200');
	$('#search_bar').removeClass('bar-down').addClass('bar-up');
	$('#sliderCatBtn').removeClass('btnCat-down').addClass('btnCat-up');
	$('#sliderSearchPoisBtn').removeClass('btnCat-down').addClass('btnCat-up');
	
	$('#sliderCatBtn span.ui-icon').removeClass('ui-icon-arrow-u').addClass('ui-icon-arrow-d');
	$('#sliderSearchPoisBtn span.ui-icon').removeClass('ui-icon-arrow-u').addClass('ui-icon-arrow-d');
	
	if(caller=='search'){
		$('#sliderSearchPoisBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-down')
							.addClass('btnCat-up')
							.addClass('ui-btn-up-buttonOscuro');
		$('#sliderSearchPoisBtn').find('.ui-icon').css('display','block');
		//Desactivar
		$('#sliderCatBtn').attr('data-theme','buttonClaro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonOscuro')
							.removeClass('ui-btn-hover-buttonOscuro')
							.removeClass('ui-btn-down-buttonOscuro')
							.removeClass('btnCat-down')
							.addClass('btnCat-inactive')
							.addClass('ui-btn-up-buttonClaro');
		$('#sliderCatBtn').find('.ui-icon').css('display','none');
		$('#sliderSearchPoisBtn').trigger('create');
		$('#pois_bar').css('display','none');
		$('#search_bar').css('display','block');
	} else{
		$('#sliderCatBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-down')
							.addClass('btnCat-up')
							.addClass('ui-btn-up-buttonOscuro');
		$('#sliderCatBtn').find('.ui-icon').css('display','block');
		//Desactivar
		$('#sliderSearchPoisBtn').attr('data-theme','buttonClaro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonOscuro')
							.removeClass('ui-btn-hover-buttonOscuro')
							.removeClass('ui-btn-down-buttonOscuro')
							.removeClass('btnCat-down')
							.addClass('btnCat-inactive')
							.addClass('ui-btn-up-buttonClaro');
		$('#sliderSearchPoisBtn').find('.ui-icon').css('display','none');
		$('#sliderCatBtn').trigger('create');
		$('#search_bar').css('display','none');
		$('#pois_bar').css('display','block');		
	}
	autoScrollDefiningContentWithSize('div_lista', listHeight_Expandido, true, false);
}

var calledFromSearch = false;

function setCalledPOIsScreenFromSearch(b) {
	calledFromSearch = b;
}

function initPOIs() {
	// No hay filtros
	filterCategories = false;
	filterPlants = false;
	filterTerminals = false;

	var floorUnique = false;
	var terminals = [];
	var floors = [];
	
	if (calledFromSearch) {
		// TODO: ocultaCombos(); ?
		ocultaCombos();
		terminals = GestorPOIs.SELECTED_TERMINALS_ID();
		floors = GestorPOIs.SELECTED_FLOORS_ID();
			
	} else {
		terminals = GestorAirports.getTerminals(GestorPOIs.SELECTED_AIRPORT_ID());
		floors = GestorAirports.getAirportFloors(GestorPOIs.SELECTED_AIRPORT_ID());
	
	ocultaCombos();
	//Miramos si hay un solo floor
	if(floors!=null && floors.length==1){
			GestorPOIs.addTerminalFloor(floors[0].TERMINAL_ID, floors[0].FLOOR_ID);
			floorUnique = true;
	} else{
		//Miramos si hay solo una planta
		if(terminals!=null && terminals.length==1){
			GestorPOIs.addTerminal(terminals[0].TERMINAL_ID);
		}
	}
	}
	// console.log("FJORDAN: calledFromSearch 1: " + calledFromSearch);
	//Filtramos y pintamos
	GestorPOIs.fillAirportPoiList(function(data) {		
		// console.log("FJORDAN: fillAirportPoiList");
		if(data==null){
			paintLeftIconMessage('info_div', GestorIdiomas.getLiteral('loadingErrorMessage'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell');
		} else {
			// var _categoryIdField = 'codigoGrupo';
			// var poisCategoriesArray = $.getGroupedArrayFromJSONArray(data, _categoryIdField);
			// addPoisCategories(poisCategoriesArray, 'div_lista');			
			if(floorUnique){
				changeTerminalSelection(floors[0].TERMINAL_ID,floors[0].FLOOR_ID);
				changeFloorSelection(floors[0].FLOOR_ID);
				
			} else if(GestorPOIs.SELECTED_TERMINALS_ID().length > 0 && !calledFromSearch) { //Teniamos algo preseleccionado
				if(GestorPOIs.SELECTED_FLOORS_ID().length>0){
					var floorSelected = GestorPOIs.SELECTED_FLOORS_ID()[1];
					var termSelected = floorSelected.substring(0,floorSelected.indexOf('_'));
					floorSelected = floorSelected.substring(floorSelected.indexOf('_')+1);
					changeTerminalSelection(termSelected,floorSelected,true);
					changeFloorSelection(floorSelected);
				
				} else {
					changeTerminalSelection(GestorPOIs.SELECTED_TERMINALS_ID()[1]);
				}
				
			} else if(GestorPOIs.SELECTED_TERMINALS_ID().length > 0 && calledFromSearch) { //Teniamos algo preseleccionado
				changeTerminalSelection(GestorPOIs.SELECTED_TERMINALS_ID()[1]);
				changeFloorSelection("");

			}else {
				changeTerminalSelection("");
				if(fromMapTab && map != null) {
					GestorOL.refreshPois();
				}
			}
			calledFromSearch = false;
		}
	});
	
	//Para mantener el estado de los paneles anterior
	if(_catState == 0){
		slideDownCat(false);
	} else {		
		slideUpCat('cats');
	}	
	if (calledFromSearch) {
		slideRightListado();
	} else {
		if(_listState == 0) {
			slideLeftListado();
		} else { 
			slideRightListado();
		}
	}	
	// console.log("FJORDAN: calledFromSearch 2: " + calledFromSearch);
}

function favouritePOI_click(poiTableId, cat, tipo, event_cat, event_tipo) { //Usamos categoria y tipo para el evento de Analytics
	// RecuperaciÃ³n del idPoi
	var _poiTable = $('#' + poiTableId);
	var _poiId = $(_poiTable).attr('poiId');
	
	var attrFav = $(_poiTable).attr('favourite');
	if(!eval(attrFav)){ //No es favorito y se va a pasar a favorito
		eventPoiFavourite(event_cat,event_tipo);
	}

	// ModificaciÃ³n del estado de favorito del POI
	GestorFavouritePOIs.switchFavouriteState(_poiId, function() {
		// Cambio en la presentaciÃ³n si la persuistencia en BBDD ha sido correcta
		$('[poiId='+_poiId+']').each(function(){
			changeStar($(this));
			var _poiFavourite = $(this).attr('favourite');
			var _newPOIFavourite = !eval(_poiFavourite);
			$(this).attr('favourite', _newPOIFavourite);
			if(!_newPOIFavourite && !notFavouritePOISVisible)
				$(this).css('display', 'none');
		});
		$('#div_lista').trigger('create');	
		if(GestorOL.getMapaVisible()) {
			GestorOL.refreshPois();
		}
	});
}

function reloadPoisPage(){
	_menuswipe_reset('pois_bar');
	$('#info_div').css('display','block');
	$('#content_div').css('display','none');
	$('#backgroundAirport').css('display','block');
	$('#pois').trigger('pageshow');
}

function toMap(poiId, category, type, name,lat,lon,terminal,floor){
	/*console.log('ToMap-Lat:'+lat);
	console.log('ToMap-Lon:'+lon);
	console.log('ToMap-Term:'+terminal);
	console.log('ToMap-Floor:'+floor);*/
	
	eventPoiListMap(category,type);
	
	fromMapTab = true;
	lastPosition = new OpenLayers.LonLat(lon,lat);
	if(lastZoom==null){
		if(GestorOL.isAirportGeolocated()){
			lastZoom = ConstF.zoom2D;
		} else {
			lastZoom = ConstF.zoom3D;
		}
	 }
	changeTerminalSelection(terminal,floor);
	changeFloorSelection(floor);
	GestorPOIDetails.setParameters(GestorPOIs.SELECTED_AIRPORT_ID(), poiId, category, type, name, lat, lon, terminal, floor);
	var selectionLayer = GestorOL.getSelectedLayer();
    selectionLayer.removeAllFeatures();
    GestorOL.refreshPois();
	GestorOL.showPoiFromDetalleSelected();	
	GestorOL.setZoomForPOI();
}

function activeSearchPos(){
	if($('#sliderSearchPoisBtn').hasClass('btnCat-inactive')) {
		eventActiveSearchPos();
		//Activar el boton
		setTimeout(function(){$('#sliderSearchPoisBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-inactive')
							.addClass('btnCat-up')
							.addClass('ui-btn-up-buttonOscuro');
		$('#sliderSearchPoisBtn').find('.ui-icon').css('display','block');
		//Desactivar
		$('#sliderCatBtn').attr('data-theme','buttonClaro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonOscuro')
							.removeClass('ui-btn-hover-buttonOscuro')
							.removeClass('ui-btn-down-buttonOscuro')
							.removeClass('btnCat-up')
							.addClass('btnCat-inactive')
							.addClass('ui-btn-up-buttonClaro');
		$('#sliderCatBtn').find('.ui-icon').css('display','none');
		},200);
		$('#pois_bar').css('display','none');
		$('#search_bar').css('display','block');
	} else if($('#sliderSearchPoisBtn').hasClass('btnCat-down')) {
		eventSlideCat(true);
		slideUpCat('search');
	} else { //btnCat-up
		eventSlideCat(false);
		slideDownCat(true);
	}
}

function activeCats() {
	if($('#sliderCatBtn').hasClass('btnCat-inactive')) {
		//Activar el boton
		setTimeout(function(){$('#sliderCatBtn').attr('data-theme','buttonOscuro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonClaro')
							.removeClass('ui-btn-hover-buttonClaro')
							.removeClass('ui-btn-down-buttonClaro')
							.removeClass('btnCat-inactive')
							.addClass('btnCat-up')
							.addClass('ui-btn-up-buttonOscuro');
		$('#sliderCatBtn').find('.ui-icon').css('display','block');
		//Desactivar
		$('#sliderSearchPoisBtn').attr('data-theme','buttonClaro')
							.attr('data-icon','arrow-d')
							.removeClass('ui-btn-up-buttonOscuro')
							.removeClass('ui-btn-hover-buttonOscuro')
							.removeClass('ui-btn-down-buttonOscuro')
							.removeClass('btnCat-up')
							.addClass('btnCat-inactive')
							.addClass('ui-btn-up-buttonClaro');
		$('#sliderSearchPoisBtn').find('.ui-icon').css('display','none');
		},200);
		$('#search_bar').css('display','none');
		$('#pois_bar').css('display','block');
	} else if($('#sliderCatBtn').hasClass('btnCat-down')) {
		eventSlideCat(true);
		slideUpCat('cats');
	} else {
		eventSlideCat(false);
		slideDownCat(true);
	}
}
/**
 * Se permite la busqueda con 0 caracteres o con 3 o mas caracteres.
 * No se permite la busqueda con 1 o 2 caracteres. 
 */
function filterPOIsByName(){
	var strBusq = $('#searchPOI').val();
	if(strBusq!=null){
		strBusq = strBusq.trim();
	}
	
	if (!$.objectHasContent(strBusq)){
		GestorPOIs.setText('');
	} else{
		eventPoiListSearchText(strBusq);
		if (strBusq.trim().length < 3) {
			showPopup(GestorIdiomas.getLiteral('search_invalid_text'));
			return;
		}
		GestorPOIs.setText(strBusq);
	}
	console.log('Buscando'+strBusq);
	refreshPoisList();
}




			function activeButton(btn){
				$(btn).removeClass('ui-btn-up-c').addClass('ui-btn-down-c').addClass('ui-btn-active');
				//$(btn).addClass('ui-btn-active');
			}
			
			function deactiveButton(btn){
				$(btn).removeClass('ui-btn-down-c').removeClass('ui-btn-active').addClass('ui-btn-up-c');
				//$(btn).removeClass('ui-btn-active');
			}
			
			function isActive(btn){
				return $(btn).hasClass('ui-btn-active');
			}
			
			$('#preferencias').on('pageshow',function(event){
        		initPage(this);
        		trackPage();
        		
        		// Inicializaci贸n de controles 1 ----------------------------------------
        		$('#dispGUID').html(GestorContexto.CONTEXT().UC_UUID);
        		$('#dispVersion').html(ConstF.versionRelease);
        		
        		console.log('-------- CTX UC_ALLOW_LOCATION:'+ GestorContexto.CONTEXT().UC_ALLOW_LOCATION)
        		if (eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)) {
        			activeButton("#checkbox_loc_si");
        		} else{
        			activeButton("#checkbox_loc_no");
        		}
        		
        		$("#checkbox_loc_si").off('click').on('click',function(e){
        			toggleAllowAutoLocation();
        		});
        		
        		$("#checkbox_loc_no").off('click').on('click',function(e){
        			toggleAllowAutoLocation();
        		});
					
				if (eval(GestorContexto.CONTEXT().UC_ALLOW_NOTIFICATIONS)){
					activeButton("#checkbox_notif_si");
				} else {
					activeButton("#checkbox_notif_no");;
				}
				
				$("#checkbox_notif_si").off('click').on('click',function(e){
        			toggleAllowNotifications();
        		});
        		
        		$("#checkbox_notif_no").off('click').on('click',function(e){
        			toggleAllowNotifications();
        		});
				
				// ----------------------------------------------------------------------
				
				
				
        		autoScrollPageContentRole('preferencias');
      		});
      		
			$(function(){
				// Inicializaci贸n de controles 2 ----------------------------------------
				// Al ser combos no se pueden inicializar en el page_show por custiones de presentaci贸n
				//RPS - 12/03/14
				//fillCmbList('cmbAeropuertoDefecto',GestorIdiomas.getLiteral('prefs_Aeropuerto'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,GestorPrefs.getPref('DEFAULT_AIRPORT'));
				fillCmbLanguageScroll('cmbIdioma',GestorIdiomas.getLiteral('prefs_Idioma'),GestorIdiomas.getLang());
				// ----------------------------------------------------------------------
			});
			
			/**
			 *Cambia el estado de los checkbox, guarda la preferencia y arranca o no el servicio de Geoloc 
			 */
			function toggleAllowAutoLocation(){
				var activated = isActive('#checkbox_loc_si');
				if(activated){ //Desactivar
					deactiveButton('#checkbox_loc_si');
					activeButton('#checkbox_loc_no');
					// GestorPrefs.setPref('ALLOW_AUTO-LOCATION',false.toString());
					GestorSettings.setSetting('ALLOW_AUTO-LOCATION',false.toString());
					// console.log('AGD setALLOW_AUTO-LOCATION: ' + false.toString());
					GestorContexto.CONTEXT().UC_ALLOW_LOCATION = false.toString();
					GestorPosition.stopGeoService();
					eventLoc(false);
				} else{
					activeButton('#checkbox_loc_si');
					deactiveButton('#checkbox_loc_no');
					//GestorPrefs.setPref('ALLOW_AUTO-LOCATION',true.toString());
					GestorSettings.setSetting('ALLOW_AUTO-LOCATION',true.toString());
					// console.log('AGD setALLOW_AUTO-LOCATION: ' + true.toString());
					GestorContexto.CONTEXT().UC_ALLOW_LOCATION = true.toString();
					GestorPosition.startGeoService();
					eventLoc(true);
				}
			}

			/**
			 *Cambia el estado de los checkbox y guarda la preferencia 
			 */
      		function toggleAllowNotifications(){
      			var activated = isActive('#checkbox_notif_si');
      			if(activated){
      				deactiveButton('#checkbox_notif_si');
      				activeButton('#checkbox_notif_no');
      				// GestorPrefs.setPref('ALLOW_NOTIFACTIONS',false.toString());
      				GestorSettings.setSetting('ALLOW_NOTIFACTIONS',false.toString());
					// console.log('AGD setALLOW_NOTIFACTIONS: ' + false.toString());
      				GestorContexto.CONTEXT().UC_ALLOW_NOTIFICATIONS = false.toString();
      				eventNotif(false);
      			} else{
      				activeButton('#checkbox_notif_si');
      				deactiveButton('#checkbox_notif_no');
      				// GestorPrefs.setPref('ALLOW_NOTIFACTIONS',true.toString());
      				GestorSettings.setSetting('ALLOW_NOTIFACTIONS',true.toString());
					// console.log('AGD setALLOW_NOTIFACTIONS: ' + true.toString());
      				GestorContexto.CONTEXT().UC_ALLOW_NOTIFICATIONS = true.toString();
      				eventNotif(true);
      			}
      		}
      		
      		//RPS - 12/03/14
      		/*
      		function SetDefaultAirport(){
      			var _defaultAirportId = $('#cmbAeropuertoDefecto').val(); 
				GestorPrefs.setPref('DEFAULT_AIRPORT',_defaultAirportId);
				GestorAirports.setAirportManual(false);		//Se dice que no para modificarlo 	
				GestorAirports.changeDefaultAirport(_defaultAirportId);
				GestorAirports.setAirportManual(true);	//Ya no se puede volver a modificar si no es desde esta ventana		
      		}
			*/
			
			function SetLanguage(){
                var lang = $('#cmbIdioma').val();
                if(GestorIdiomas.getLang()!= lang){
					eventLang(lang);
					GestorContexto.CONTEXT().UC_LANGUAGE_ID = lang;
                	GestorIdiomas.setLang(lang,function(){
						
						// fillCmbList('cmbAeropuertoDefecto',GestorIdiomas.getLiteral('prefs_Aeropuerto'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,GestorPrefs.getPref('DEFAULT_AIRPORT'));
						
						// console.log('AGD getDEFAULT_AIRPORT')
						GestorSettings.getSetting('DEFAULT_AIRPORT',function(data){
							// console.log('AGD getDEFAULT_AIRPORT OK: ' + JSON.stringify(data))
							if ($.objectHasContent(data) && data.length == 1 && $.objectHasContent(data[0].SETTING_VALUE))
							{
								fillCmbList('cmbAeropuertoDefecto',GestorIdiomas.getLiteral('prefs_Aeropuerto'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,data[0].SETTING_VALUE);
							} 
							else
								fillCmbList('cmbAeropuertoDefecto',GestorIdiomas.getLiteral('prefs_Aeropuerto'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,'');
						},
						function(err){
							console.log('Error en la recuperaci贸n de setting getDEFAULT_AIRPORT: ' + err);
							fillCmbList('cmbAeropuertoDefecto',GestorIdiomas.getLiteral('prefs_Aeropuerto'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,'');
						});
						fillCmbLanguageScroll('cmbIdioma',GestorIdiomas.getLiteral('prefs_Idioma'),GestorIdiomas.getLang());
						$('#preferencias').trigger('pageshow');
					});
				}
			}
			
      		


				var _travelDetailId = null;
				//Si coindcide con un viaje se informa

				$('#detalle_vuelo').on('pageshow', function(event) {
					//var _date = new Date();
					//console.log('************************* TIEMPOS  Pantalla detalle  - Se accede(pageshow): ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());

					initPage(this);
					trackPage();
					
					//Por si se esta refrescando, ocultamos y mostramos las capas adecuadas:
					$("#flight_detail").css('display','none');
					$("#infoSection").css('display','block');
					getWeather();
					paintUpperIconMessage('infoSection', GestorIdiomas.getLiteral('loadingMessage'), 'controlSectionDark', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionDarkHeader');
					autoScrollPageContentRole('detalle_vuelo');
					
					loadFlightDetails();
				});

				function loadFlightDetails() {
					//var _date = new Date();
					//console.log('************************* TIEMPOS  Pantalla detalle  - Inicia búsqueda: ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
					//Ya se han establecido los parámetros, se carga aquí para que la navegación sea antes del pintado.
					GestorFlightDetails.getFlightDetail(OKFlight, ErrFlight);
				}

				function OKFlight() {

					//var _date = new Date();
					//console.log('************************* TIEMPOS  Pantalla detalle  - Inicia pintado: ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());

					var _flight = GestorFlightDetails.FLIGHT_DETAILS();
					if($.objectHasContent(_flight)) {

						var _isAENAAirportDeparture = GestorAirports.isAENAAirport(_flight.aeropuertoOrigen);
						var _isAENAAirportArrival = GestorAirports.isAENAAirport(_flight.aeropuertoDestino);
						var _formattedFlight = GestorFlightDetails.formatFlight(_flight);

						$('#fieldFlight_Number_Dep').html(_formattedFlight.NUM_VUELO_DESC_SALIDA);
						$('#fieldFlight_Airline_Dep').html(_formattedFlight.CIA_DESC_SALIDA);

						$('#fieldFlight_Number_Arr').html(_formattedFlight.NUM_VUELO_DESC_LLEGADA);
						$('#fieldFlight_Airline_Arr').html(_formattedFlight.CIA_DESC_LLEGADA);

						$('#fieldFlight_DepAirport').html(_formattedFlight.AIRPORT_DEP_NAME + ' (' + _formattedFlight.AIRPORT_DEP_ID + ')');
						if(_formattedFlight.FLIGHT_DEP_TIME_PROG != null) {
							$('#fieldFlightDeparture_ProgTime').html(_formattedFlight.FLIGHT_DEP_TIME_PROG.toDetalleVueloFormat());
							$('#departureDetailFields').css('display', '');
						} else {
							$('#departureDetailFields').css('display', 'none');
						}

						$('#fieldFlightDeparture_Terminal').html(_formattedFlight.AIRPORT_DEP_TERMINAL_ID);
						$('#fieldFlightDeparture_Gate').html(_formattedFlight.FLIGHT_DEP_GATE);
						$('#fieldFlightDeparture_Obs').html(_formattedFlight.FLIGHT_DEP_OBS);

						if($.objectHasContent(_formattedFlight.FLIGHT_DEP_GATE_OPEN_TIME)) {
							$('#fieldFlightDeparture_EmbTime').html(_formattedFlight.FLIGHT_DEP_GATE_OPEN_TIME.toShortTimeString() + GestorIdiomas.getLiteral('hoursText'));
						}

						$('#fieldFlightDeparture_CheckIn').html(_formattedFlight.FLIGHT_CHKIN_LOCATION);

						$('#fieldFlight_ArrAirport').html(_formattedFlight.AIRPORT_ARR_NAME + ' (' + _formattedFlight.AIRPORT_ARR_ID + ')');					
						if(_formattedFlight.FLIGHT_ARR_TIME_PROG != null) {
							$('#fieldFlightArrival_ProgTime').html(_formattedFlight.FLIGHT_ARR_TIME_PROG.toDetalleVueloFormat());
							$('#arrivalDetailFields').css('display', '');
						} else {
							$('#arrivalDetailFields').css('display', 'none');
						}

						$('#fieldFlightArrival_Terminal').html(_formattedFlight.AIRPORT_ARR_TERMINAL_ID);
						$('#fieldFlightArrival_Gate').html(_formattedFlight.FLIGHT_ARR_ROOM);
						$('#fieldFlightArrival_Carrousel').html(_formattedFlight.FLIGHT_BAG_CAROUSEL);
						$('#fieldFlightArrival_Obs').html(_formattedFlight.FLIGHT_ARR_OBS);

						if($.objectHasContent(_formattedFlight.FLIGHT_ARR_TIME_REAL)) {
							$('#fieldFlightArrival_EstTime').html(_formattedFlight.FLIGHT_ARR_TIME_REAL.toDetalleVueloFormat());
						}

						if($.objectHasContent(_formattedFlight.FLIGHT_DEP_TIME_REAL)) {
							$('#fieldFlightDeparture_EstTime').html(_formattedFlight.FLIGHT_DEP_TIME_REAL.toDetalleVueloFormat());
						}

						paintEscalas(_formattedFlight);
						paintTravelHTML(_flight);
						$('#detalle_vuelo').trigger('create');
						$('#infoSection').css('display', 'none');
						setTimeout(function(){$('#flight_detail').css('display', 'block');},0);
						

					} else {
						paintUpperIconMessage('infoSection', GestorIdiomas.getLiteral('flightDetail_NoData'), 'controlSectionDark', '../../themes/default/common/img/ico_error.png', 'controlSectionDarkHeader');
						$('#detalle_vuelo').trigger('create');
					}
					
					setTimeout(function(){PageScroll.refresh();},400);
					//var _date = new Date();
					//console.log('************************* TIEMPOS  Pantalla detalle  - Termina pintado: ' + _date.getMinutes() + ":" + _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
				}

				function ErrFlight() {

					paintUpperIconMessage('infoSection', GestorIdiomas.getLiteral('flightDetail_error'), 'controlSectionDark', '../../themes/default/common/img/ico_error.png', 'controlSectionDarkHeader');
					autoScrollPageContentRole('detalle_vuelo');
				}

				function paintEscalas(_formattedFlight) {
					var _scalas = _formattedFlight.ESCALAS;
					if($.objectHasContent(_scalas)) {
						var _Html = '<div class="controlSectionDarkFila"><div class="controlSectionDarkAerop"><div class="controlSectionDarkCampo"><span><label>' + GestorIdiomas.getLiteral('flightDetail_Stopover') + '</label></span></div>';

						for(var i = 0; i < _scalas.length; i++) {
							var _scala = _scalas[i];
							
							_Html += '<div class="controlSectionDarkFila">';
							_Html += '<div class="controlSectionDarkAeropEscala">';
							_Html += _scala.aeropuertoNombre+'('+_scala.aeropuerto+')';
							_Html += '</div>';
							_Html += '</div>';
						}

						_Html += '</div></div>';

						$('#detailEscalas').html(_Html);
						$('#detailEscalas').trigger('create');
						$('#detailEscalas').css('display', 'block');

					} else {
						$('#detailEscalas').css('display', 'none');
					}
				}

				function paintTravelHTML(_flight) {
					var _travel = null;
										
					if(_flight != null) {
						var _travel = GestorViajes.getTravelByFlight(_flight);
						if($.objectHasContent(_travel)) {
							_travelDetailId = _travel.TRAVEL_ID;
							//Mostramos el botón de delete
							$('#divTravelRemove').css('display','');
							$('#divTravelAdd').css('display','none');
							
						} else {
							//mostramos el botón de add
							$('#divTravelRemove').css('display','none');
							$('#divTravelAdd').css('display','');
							
							if(!GestorFlightDetails.canAddToPlanner(_flight)){
								$('#divButtons').css('display','none');
							}
						}
					} else {
						//No mostramos botón
						$('#divButtons').css('display','none');
					}
				}

				function addTravel() {
					var _flight = GestorFlightDetails.FLIGHT_DETAILS();
					GestorViajes.addTravel(_flight, function() {
						
						showPopup(GestorIdiomas.getLiteral('flightDetail_travelAdded'));
						paintTravelHTML(_flight);
						
					});

				}

				/*Elimina el vuelo como viaje. Necesita tener informado el _travelDetailId
				 Este lo carga la página al detectar si el vuelo está o no planificado.
				 * */
				function removeTravel() {

					showConfirm(GestorIdiomas.getLiteral('flightDetail_confirmTravelDelete'), function() {
						GestorViajes.removeTravel(_travelDetailId, function() {
							showPopup(GestorIdiomas.getLiteral('flightDetail_travelDeleted'));
							paintTravelHTML(GestorFlightDetails.FLIGHT_DETAILS());
						});
					});
				}
				
				function getWeather() {
					var fl = GestorFlightDetails.getParams();
					var weatherBarOptionsOrig = new _WeatherBarOptions();
					weatherBarOptionsOrig.setIata(fl.DEP_AIRPORT_ID);
					weatherBarOptionsOrig.setOaci(fl.DEP_AIRPORT_OACI);
					console.log('Meteo:'+fl.DEP_AIRPORT_ID+'-'+fl.DEP_AIRPORT_OACI);
					weatherBarOptionsOrig.setDivID('meteoDep');
					var weatherBarOrig = new _WeatherBar();
					weatherBarOrig.addWeatherBar(weatherBarOptionsOrig, function() {
						console.log("ok meteo dep")
						autoScrollPageContentRole('detalle_vuelo');
					},function(err){console.log("Error meteo dep")});
					
					var weatherBarDest = new _WeatherBar();
					var weatherBarOptionsDest = new _WeatherBarOptions();
					weatherBarOptionsDest.setIata(fl.ARR_AIRPORT_ID);
					weatherBarOptionsDest.setOaci(fl.ARR_AIRPORT_OACI);
					console.log('Meteo:'+fl.ARR_AIRPORT_ID+'-'+fl.ARR_AIRPORT_OACI);
					weatherBarOptionsDest.setDivID('meteoArr');
					weatherBarDest.addWeatherBar(weatherBarOptionsDest, function() {
						console.log("ok meteo arr")
						autoScrollPageContentRole('detalle_vuelo');
					}, function(err) {console.log("Error meteo arr")});
				}

			


			
			$('#plaza_parking').on('pageshow',function(event){
        		initPage(this);
        		
        		var reserva = GestorResParking.getReservaDetail();
        		
        		var html = "<div>";
				html += '<div class="controlSection">';
				html += '<div class="controlSectionContent" style="border-bottom:0px;">';
				html += '<div class="controlSectionFila">';
				html += '<div class="controlSectionImage"><img src="' + $.mobile.path.get() + '../../themes/default/common/img/icon/ico_parking.png" height="32" ></div>';
				html += '<div class="controlSectionAerop">';
				var resName = GestorResParking.getParkingName(reserva.RES_PARKING_ID);
				html += '<span>' + resName +'</span>';
				html += '<div class="controlSectionFila">';
				html += '<div class="controlSectionCampo">';
				html += GestorIdiomas.getLiteral('parkingImporte')+decodeURIComponent(reserva.RES_PRICE);
				html += '<br>' +GestorIdiomas.getLiteral('parkingLoc')+decodeURIComponent(reserva.RES_LOC);
				html += '<br>' +GestorIdiomas.getLiteral('parkingEntrada') + reserva.RES_IN_DATE;
				html += '<br>' + GestorIdiomas.getLiteral('parkingSalida') + reserva.RES_OUT_DATE;
				html += '<br>' +GestorIdiomas.getLiteral('parkingPlaza') +'<input id="resPlazaInput" type="text" value="';
				if($.objectHasContent(reserva.RES_PLAZA)){
					html+=reserva.RES_PLAZA;
				}
				html +='">';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '<div class="lastControlSectionContent">';
				html += '<a href="javascript:eventSaveParkingPlace();guardaPlaza();" data-role="button" data-theme="buttonOscuro" id="guardaPlaza">' + GestorIdiomas.getLiteral('parkingSavePlaza') + '</a>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				$('#data').html(html);
				$('#plaza_parking').trigger('create');
        		autoScrollPageContentRole('plaza_parking');
      		});
      		
      		function guardaPlaza(){
      			var reserva = GestorResParking.getReservaDetail();
      			var plaza = $('#resPlazaInput').val();
      			GestorResParking.actualizaPlaza(reserva.RES_ID,plaza,function(){
      				console.log('Actualizado-'+reserva.RES_ID+':'+plaza);
      				setTimeout(function(){backAction();},500); //Esperamos a que baje el teclado
      			});
      		}
			
      		


					var _airportFlight = GestorSearchFlights.DEFAULT_AIRPORT().AIRPORT_ID;
					var _airportArr_Origen =null;
					var _airportArr_Destino=GestorSearchFlights.DEFAULT_AIRPORT().AIRPORT_ID;
					var _airportDep_Origen =GestorSearchFlights.DEFAULT_AIRPORT().AIRPORT_ID;
					var _airportDep_Destino =null;
					
					var _dateVuelos = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
					var _dateVuelosTO = GestorSearchFlights.defaultDateTo(_dateVuelos);
					var _dateVuelosTOAuthomatic = true;
					
					var _dateDep = GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME; //new Date();
					var _dateDepTO = GestorSearchFlights.defaultDateTo(_dateDep);
					var _dateDepTOAuthomatic = true;
					
					var _dateArr =GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME;
					var _dateArrTO = GestorSearchFlights.defaultDateTo(_dateArr);
					var _dateArrTOAuthomatic = true;
					
					var _airlineDep =null;
					var _airlineArr =null;
					var _searchMode = 'numVuelo';

				$('#buscar_vuelos').on('pageshow',function(event){
                    $('#nav-tabsUp').css('display', '');
                    $('#buscar_vuelos_content').css('display', '');
                    // $('#buscar_vuelos_footer').css('display', '');
                                       
					initPage(this);
					trackPage();
                                       
					tabs('nav ul');
					
					populateCmbDestinoSalidas(_airportDep_Origen,_airportDep_Destino);
	   				populateCmbOrigenLlegadas(_airportArr_Destino,_airportArr_Origen);
    				
					populateCmbAerolineasSalidas(_airportDep_Origen,_airlineDep);
					populateCmbAerolineasLlegadas(_airportArr_Destino,_airlineArr);

					setProportionalWidthForTabs('buscar_vuelos',[$('#tabLocalizadorLink'),$('#tabSalidasLink'),$('#tabLlegadasLink')],6);
                                       
					autoScrollPageContentRole('buscar_vuelos');
					
					if (_searchMode == 'llegadas'){
 						$('#tabLlegadasBtn').click();
		 			}else if (_searchMode == 'salidas'){
 						$('#tabSalidasBtn').click();
					}else{//_searchMode == 'numVuelo' - - Default mode
 						$('#tabLocalizadorBtn').click();
				    }
                                       
                    
	      		});

				function populateCacheData(){
										
					var _cache = GestorCacheFlights.DATA();
					
					if($.objectHasContent(_cache.FLIGHT.FLIGHT_NUMBER))  
					 	$('#numVuelo').val(_cache.FLIGHT.FLIGHT_NUMBER);
					
					if($.objectHasContent(_cache.FLIGHT.AIRPORT_ID)) 
						_airportFlight = _cache.FLIGHT.AIRPORT_ID;
					
					
					if($.objectHasContent(_cache.ARRIVAL.AIRPORT_ID_DEP)) 
						_airportArr_Origen = _cache.ARRIVAL.AIRPORT_ID_DEP;
						
					if($.objectHasContent(_cache.ARRIVAL.AIRPORT_ID_ARR))
						 _airportArr_Destino=_cache.ARRIVAL.AIRPORT_ID_ARR;
						 					
					// if($.objectHasContent(_cache.ARRIVAL.DATE))
						// _dateArr = _cache.ARRIVAL.DATE;

					if($.objectHasContent(_cache.ARRIVAL.AIRLINE_ID_IATA))
						_airlineArr = _cache.ARRIVAL.AIRLINE_ID_IATA;
						

					if($.objectHasContent(_cache.DEPARTURE.AIRPORT_ID_DEP)) 
						_airportDep_Origen =_cache.DEPARTURE.AIRPORT_ID_DEP;
						
					if($.objectHasContent(_cache.DEPARTURE.AIRPORT_ID_ARR)) 
						_airportDep_Destino =_cache.DEPARTURE.AIRPORT_ID_ARR;
					
					// if($.objectHasContent(_cache.DEPARTURE.DATE))
						// _dateDep = _cache.DEPARTURE.DATE;

					if($.objectHasContent(_cache.DEPARTURE.AIRLINE_ID_IATA))
						_airlineDep = _cache.DEPARTURE.AIRLINE_ID_IATA;
					
					 if($.objectHasContent(GestorSearchFlights.PARAMETERS().SEARCH_MODE)){ _searchMode = GestorSearchFlights.PARAMETERS().SEARCH_MODE;}	
				}

				 $(function(){
					 populateCacheData();
						
					 fillCmbList('cmbAeropuertoNumeroVuelo',GestorIdiomas.getLiteral('airportFrom'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,_airportFlight);
					 fillCmbList('cmbOrigenSalidas',GestorIdiomas.getLiteral('airportFrom'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,_airportDep_Origen);
					 fillCmbList('cmbDestinoLlegadas',GestorIdiomas.getLiteral('airportTo'),GestorAirports.AIRPORTS(),'AIRPORT_ID','AIRPORT_NAME',false,_airportArr_Destino);
 					
					 // DATE FIELDS
					 // Vuelos
					 paintDateScroll('datHoraFechaVuelos','datetime', _dateVuelos, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {
			         	if (_dateVuelosTOAuthomatic) {
			            	var _selectedDate = $('#datHoraFechaVuelos').scroller('getDate');
			                var _newDate = GestorSearchFlights.defaultDateTo(_selectedDate);
			                $('#datHoraFechaVuelosTO').scroller('setDate', _newDate, true);
			            }
			         });
					 paintDateScroll('datHoraFechaVuelosTO','datetime', _dateVuelosTO, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {
			                _dateVuelosTOAuthomatic = false;
			            });
					 // Salidas
					 paintDateScroll('datHoraFechaSalidas','datetime', _dateDep, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {						 
						if (_dateDepTOAuthomatic == true) {
							var _selectedDate = $('#datHoraFechaSalidas').scroller('getDate');
			             	var _newDate = GestorSearchFlights.defaultDateTo(_selectedDate);			  
			               	$('#datHoraFechaSalidasTO').scroller('setDate', _newDate, true);
			            }
			         });
					 paintDateScroll('datHoraFechaSalidasTO','datetime', _dateDepTO, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {
						 _dateDepTOAuthomatic = false;
			            });
					 // Llegadas
					 paintDateScroll('datHoraFechaLlegadas','datetime', _dateArr, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {						 
						if (_dateArrTOAuthomatic) {
							var _selectedDate = $('#datHoraFechaLlegadas').scroller('getDate');
			                var _newDate = GestorSearchFlights.defaultDateTo(_selectedDate);
			           		$('#datHoraFechaLlegadasTO').scroller('setDate', _newDate, true);
			            }
			         });
					 paintDateScroll('datHoraFechaLlegadasTO','datetime', _dateArrTO, /* allowYesterday=*/true, /*onSelect=*/function(newValue, inst) {
						_dateArrTOAuthomatic = false;
			         });
				 });

				function updateCmbDestinoSalidas(newFromAirportId)
				{
					var _cmbDestinoSalidasValue = $('#cmbDestinoSalidas option:selected').val();
					$('#cmbDestinoSalidas').append('');
					$('#cmbDestinoSalidasDivId').trigger('create');
					populateCmbDestinoSalidas(newFromAirportId,_cmbDestinoSalidasValue);

				}
				
				function updateCmbOrigenLlegadas(newToAirportId)
				{
					var _cmbOrigenLlegadasValue = $('#cmbOrigenLlegadas option:selected').val();
					
					$('#cmbOrigenLlegadas').append('');
					$('#cmbOrigenLlegadasDivId').trigger('create');
					populateCmbOrigenLlegadas(newToAirportId,_cmbOrigenLlegadasValue);
				}


				function populateCmbDestinoSalidas(fromAirportId,defaultValue)
				{
					$('#cmbDestinoSalidasControlDivId').css('display','none');
					$('#cmbDestinoSalidasMessagesDivId').css('display','');
					paintLeftIconMessage('cmbDestinoSalidasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_ToAirportLoadingMessage'));
					$('#cmbDestinoSalidasDivId').trigger('update');
					GestorAirports.setAirport(fromAirportId);
					GestorAirports.getConnectedAirportsFrom(function (){
																			if (GestorAirports.CONNECTED_AIRPORTS_FROM()!= null && GestorAirports.CONNECTED_AIRPORTS_FROM().length >0)
																			{
																				fillCmbList('cmbDestinoSalidas',GestorIdiomas.getLiteral('airportTo'),GestorAirports.CONNECTED_AIRPORTS_FROM(),'cdides','dsdes',true,defaultValue);
																				$('#cmbDestinoSalidasControlDivId').css('display','');
																				$('#cmbDestinoSalidasMessagesDivId').css('display','none');
																				$('#cmbDestinoSalidasDivId').trigger('create');
																			}
																			else
																			{
																				paintLeftIconMessage('cmbDestinoSalidasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_ToAirportErrorMessage'));
																				$('#cmbDestinoSalidasControlDivId').css('display','none');
																				$('#cmbDestinoSalidasDivId').trigger('update');																									
																			}
																		});
				}

				function populateCmbOrigenLlegadas(toAirportId,defaultValue)
				{
					$('#cmbOrigenLlegadasControlDivId').css('display','none');
					$('#cmbOrigenLlegadasMessagesDivId').css('display','');
					paintLeftIconMessage('cmbOrigenLlegadasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_FromAirportLoadingMessage'));
					$('#cmbOrigenLlegadasDivId').trigger('update');
					GestorAirports.setAirport(toAirportId);
					GestorAirports.getConnectedAirportsTo(function (){
																		if (GestorAirports.CONNECTED_AIRPORTS_TO()!= null && GestorAirports.CONNECTED_AIRPORTS_TO().length >0)
																		{
																			fillCmbList('cmbOrigenLlegadas',GestorIdiomas.getLiteral('airportFrom'),GestorAirports.CONNECTED_AIRPORTS_TO(),'cdiorg','dsorg',true,defaultValue);
																			$('#cmbOrigenLlegadasControlDivId').css('display','');
																			$('#cmbOrigenLlegadasMessagesDivId').css('display','none');
																			$('#cmbOrigenLlegadasDivId').trigger('create');
																		}
																		else
																		{
																			paintLeftIconMessage('cmbOrigenLlegadasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_FromAirportErrorMessage'));
																			$('#cmbOrigenLlegadasControlDivId').css('display','none');
																			$('#cmbOrigenLlegadasDivId').trigger('update');																									
																		}
																});
   				
				}
				
				function updateCmbAerolineasSalidas(newFromAirportId)
				{
					var _cmbAerolineasSalidasValue = $('#cmbAerolineasSalidas option:selected').val();
					$('#cmbAerolineasSalidas').append('');
					$('#cmbAerolineasSalidasDivId').trigger('create');
					populateCmbAerolineasSalidas(newFromAirportId,_cmbAerolineasSalidasValue);

				}
				
				function updateCmbAerolineasLlegadas(newToAirportId)
				{
					var _cmbAerolineasLlegadasValue = $('#cmbAerolineasLlegadas option:selected').val();
					
					$('#cmbAerolineasLlegadas').append('');
					$('#cmbAerolineasLlegadasDivId').trigger('create');
					populateCmbAerolineasLlegadas(newToAirportId,_cmbAerolineasLlegadasValue);
				}
				
				
				function populateCmbAerolineasSalidas(fromAirportId,defaultValue)
				{
					$('#cmbAerolineasSalidasControlDivId').css('display','none');
					$('#cmbAerolineasSalidasMessagesDivId').css('display','');
					paintLeftIconMessage('cmbAerolineasSalidasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_AirlinesLoadingMessage'));
					$('#cmbAerolineasSalidasDivId').trigger('update');
					GestorAirlines.setAirport(fromAirportId);
					GestorAirlines.getAirlinesFromAirport(function (){
																		if (ActualPage == 'buscar_vuelos')
																		{
																			var _airlines = GestorAirlines.AIRLINES();
																			
																			if (_airlines != null && _airlines.length >0)
																			{
																				fillCmbList('cmbAerolineasSalidas',GestorIdiomas.getLiteral('flightSearch_AirlineComboLabel'),_airlines,'id','name',true,defaultValue);
																				$('#cmbAerolineasSalidasMessagesDivId').css('display','none');
																				$('#cmbAerolineasSalidasControlDivId').css('display','');
																				$('#cmbAerolineasSalidasDivId').trigger('create');
																			}
																			else
																			{
																				paintLeftIconMessage('cmbAerolineasSalidasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_AirlinesErrorMessage'));
																				$('#cmbAerolineasSalidasControlDivId').css('display','none');
																				$('#cmbAerolineasSalidasDivId').trigger('update');																									
																			}
																		}
																});
				}
				
				function populateCmbAerolineasLlegadas(toAirportId,defaultValue)
				{
					$('#cmbAerolineasLlegadasControlDivId').css('display','none');
					$('#cmbAerolineasLlegadasMessagesDivId').css('display','');
					paintLeftIconMessage('cmbAerolineasLlegadasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_AirlinesLoadingMessage'));
					$('#cmbAerolineasLlegadasDivId').trigger('update');
					GestorAirlines.setAirport(toAirportId);
					GestorAirlines.getAirlinesFromAirport(function (){
																		if (ActualPage == 'buscar_vuelos')
																		{
																			var _airlines = GestorAirlines.AIRLINES();
																			if (_airlines!= null && _airlines.length >0)
																			{
																				fillCmbList('cmbAerolineasLlegadas',GestorIdiomas.getLiteral('flightSearch_AirlineComboLabel'),_airlines,'id','name',true,defaultValue);
																				$('#cmbAerolineasLlegadasControlDivId').css('display','');
																				$('#cmbAerolineasLlegadasMessagesDivId').css('display','none');
																				$('#cmbAerolineasLlegadasDivId').trigger('create');
																			}
																			else
																			{
																				paintLeftIconMessage('cmbAerolineasLlegadasMessagesDivId',GestorIdiomas.getLiteral('flightSearch_AirlinesErrorMessage'));
																				$('#cmbAerolineasLlegadasControlDivId').css('display','none');
																				$('#cmbAerolineasLlegadasDivId').trigger('update');																									
																			}
																		}
																});
				}
				
				function fillCacheSearch(){
					var _cache = GestorCacheFlights.DATA();
					
					_cache.FLIGHT.AIRPORT_ID =$('#cmbAeropuertoNumeroVuelo').val();
					_cache.FLIGHT.FLIGHT_NUMBER = $('#numVuelo').val();
					_cache.FLIGHT.DATE=$('#datHoraFechaVuelos').scroller('getDate');
					
					_cache.DEPARTURE.AIRPORT_ID_DEP=$('#cmbOrigenSalidas').val();
					_cache.DEPARTURE.AIRPORT_ID_ARR=$('#cmbDestinoSalidas').val();
					_cache.DEPARTURE.DATE= $('#datHoraFechaSalidas').scroller('getDate');
					_cache.DEPARTURE.AIRLINE_ID_IATA= $('#cmbAerolineasSalidas').val();
					
					_cache.ARRIVAL.AIRPORT_ID_DEP= $('#cmbOrigenLlegadas').val();
					_cache.ARRIVAL.AIRPORT_ID_ARR= $('#cmbDestinoLlegadas').val();
					_cache.ARRIVAL.DATE= $('#datHoraFechaLlegadas').scroller('getDate');
					_cache.ARRIVAL.AIRLINE_ID_IATA= $('#cmbAerolineasLlegadas').val();
					
				}
				
				function searchFlights()
				{
					var _validationOK = false;
					//var _date = new Date();
					//console.log('************************* TIEMPOS  Se ha pulsado el botón buscar: ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds() + ' --- ' + _date.getTime());
					
					if (_searchMode == 'numVuelo')
					{
						// Búsqueda por número de vuelo
						
						var _numVuelo =  $('#numVuelo').val();
						
						//var _numVueloExpression = '^[a-zA-Z0-9]{2}[a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?$';
						//var _numVueloRegex = new RegExp(_numVueloExpression);
						if ($.objectHasContent(_numVuelo))// && _numVuelo.match(_numVueloRegex))
						{							
							var _dateTimeFrom = $('#datHoraFechaVuelos').scroller('getDate');
							var _dateTimeTo = $('#datHoraFechaVuelosTO').scroller('getDate');
							if (_dateTimeFrom >= _dateTimeTo) {
								showPopup(GestorIdiomas.getLiteral('flightSearch_DateTime_err'));
								_validationOK = false;;
							} else {															
								//var _num ='';
								_numVuelo = $.trim(_numVuelo);
								_numVuelo = _numVuelo.replace(/-/g,'');
								_numVuelo = _numVuelo.replace(/ /g,'');
							
								var	_comp ='';
								//var _num = _numVuelo.match(/\d+/);
								var	_num = '%' + _numVuelo.toUpperCase() + '%';							
							
								var _airportId = $('#cmbAeropuertoNumeroVuelo').val();
								var _airportName = $('#cmbAeropuertoNumeroVuelo option:selected').text();
							
								/*
								var _dateTime = $('#datHoraFechaVuelos').scroller('getDate');							
								var _dateTimeFrom = GestorAirports.applyAirportMarginDateTimeFrom(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime,true);
								var _dateTimeTo = GestorAirports.applyAirportMarginDateTimeNum(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime);
								*/														
								GestorSearchFlights.setParams(_airportId,_airportId,
										                      _dateTimeFrom.toUTCDateHard(), _dateTimeTo.toUTCDateHard(),
															  _comp,null,_num,_searchMode,ConstF.flightNumberSearchPageSize,0,'S');
							
								GestorSearchFlights.setDescriptiveParams(_airportName, _airportName, _dateTimeFrom, null, null, _dateTimeTo);
								_validationOK = true;
							}
						}
						else
						{
							_validationOK = false;
							showPopup(GestorIdiomas.getLiteral('flightSearch_NoCorrectFlightMessage'));
						}
					}
					else if (_searchMode == 'salidas')
					{						
						var _dateTimeFrom = $('#datHoraFechaSalidas').scroller('getDate');
						var _dateTimeTo = $('#datHoraFechaSalidasTO').scroller('getDate');
						
						
						if (_dateTimeFrom >= _dateTimeTo) {
							showPopup(GestorIdiomas.getLiteral('flightSearch_DateTime_err'));
							_validationOK = false;;
						} else {
							// Búsqueda de vuelos de salida
							var _departureAirportId = $('#cmbOrigenSalidas').val();
							var _departureAirportName = null;
							if (_departureAirportId != null && _departureAirportId != '') _departureAirportName = $('#cmbOrigenSalidas option:selected').text();
							
							var _arrivalAirportId = $('#cmbDestinoSalidas').val();
							if (_arrivalAirportId == '') _arrivalAirportId = null;
							var _arrivalAirportName = null;
							if (_arrivalAirportId != null) _arrivalAirportName = $('#cmbDestinoSalidas option:selected').text();
							/*
							var _dateTime = $('#datHoraFechaSalidas').scroller('getDate');
							var _dateTimeFrom = GestorAirports.applyAirportMarginDateTimeFrom(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime,true);
							var _dateTimeTo = GestorAirports.applyAirportMarginDateTimeNum(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime);
							*/
							
							var _airlineId = $('#cmbAerolineasSalidas').val();
							if (_airlineId == '') _airlineId = null;
							var _airlineName = null;
							if (_airlineId != null) _airlineName = $('#cmbAerolineasSalidas option:selected').text();
							//RP 15/05/2014 - Se pasa la fecha TO en las consultas se utiliza applyAirportMarginDateTimeNum
							GestorSearchFlights.setParams(_departureAirportId,_arrivalAirportId,
									                      _dateTimeFrom.toUTCDateHard(),_dateTimeTo.toUTCDateHard(),
														  _airlineId,null,null,_searchMode,ConstF.departureSearchPageSize,0,'S');
							GestorSearchFlights.setDescriptiveParams(_departureAirportName, _arrivalAirportName, _dateTimeFrom, _airlineName, null, _dateTimeTo);
							_validationOK = true;
						}
					}
					else if (_searchMode == 'llegadas')
					{
						var _dateTimeFrom = $('#datHoraFechaLlegadas').scroller('getDate');
						var _dateTimeTo = $('#datHoraFechaLlegadasTO').scroller('getDate');
						
						
						if (_dateTimeFrom >= _dateTimeTo) {
							showPopup(GestorIdiomas.getLiteral('flightSearch_DateTime_err'));
							_validationOK = false;;
						} else {												
							// Búsqueda de vuelos de salida
							var _departureAirportId = $('#cmbOrigenLlegadas').val();
							if (_departureAirportId == '') _departureAirportId = null;
							var _departureAirportName = null;
							if (_departureAirportId != null) _departureAirportName = $('#cmbOrigenLlegadas option:selected').text();
						
							var _arrivalAirportId = $('#cmbDestinoLlegadas').val();
							var _arrivalAirportName = null;
							if (_arrivalAirportId != null && _arrivalAirportId != '') _arrivalAirportName = $('#cmbDestinoLlegadas option:selected').text();
							/*
							var _dateTime = $('#datHoraFechaLlegadas').scroller('getDate');
							var _dateTimeFrom = GestorAirports.applyAirportMarginDateTimeFrom(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime,false);
							var _dateTimeTo = GestorAirports.applyAirportMarginDateTimeNum(GestorSearchFlights.DEFAULT_AIRPORT(),_dateTime);
							*/
						
							var _airlineId = $('#cmbAerolineasLlegadas').val();
							if (_airlineId == '') _airlineId = null;
							var _airlineName = null;
							if (_airlineId != null) _airlineName = $('#cmbAerolineasLlegadas option:selected').text();
							//RP 15/05/2014 - Se pasa la fecha TO en las consultas se utiliza applyAirportMarginDateTimeNum
							GestorSearchFlights.setParams(_departureAirportId,_arrivalAirportId,
														  _dateTimeFrom.toUTCDateHard(),_dateTimeTo.toUTCDateHard(),
														  _airlineId,null,null,_searchMode,ConstF.arriveSearchPageSize,0,'S');
							GestorSearchFlights.setDescriptiveParams(_departureAirportName, _arrivalAirportName, _dateTimeFrom, _airlineName, null, _dateTimeTo);
							_validationOK = true;
						}
					} else if(_searchMode == 'cod2D'){
						var res = GestorCod2D.getResult();
						var _departureAirportId = res.flightFrom;
						var _arrivalAirportId = res.flightTo;
						var _dateFrom = res.flightDateProcesado; //Ya viene a las 00:00:00
						var _dateTo = new Date(Date.UTC(_dateFrom.getFullYear(), _dateFrom.getMonth(), _dateFrom.getUTCDate(),23,59,59));
								
						var _compIata = res.flightCompany;
						var _flightNum = res.flightCode;
						GestorSearchFlights.setParams(_departureAirportId,_arrivalAirportId,_dateFrom,_dateTo,_compIata,null,_flightNum,_searchMode, null, 0, 'S');
						var desc = _departureAirportId +"-" +_arrivalAirportId+ " "+ _compIata+_flightNum.toString();
						GestorSearchFlights.setDescriptiveParams(null, null, null, null, desc, null);
						_validationOK = true;
					}
					
					if(_validationOK){
						fillCacheSearch();
						browseFromClick('lista_vuelos.html','none');
					}
				}

      		


			$('#opciones').on('pageshow', function(event) {
				initPage(this);
				trackPage();
				autoScrollPageContentRole('opciones');
                          /*
                if(GestorContexto.CONTEXT().UC_DISPOSITIVE_TYPE==ConstF.mobileIphone){
                	$("#passengerInfo").attr('href',ConstF.infoPasajeroWeb[GestorIdiomas.getLang()]);
                    $("#passengerInfo").attr('target','_blank');
                    $("#passengerInfo").attr('rel','external');
                } else {
                          */
                    var uriJS = "javascript:browseExternalURLWithExternalBrowser('" + ConstF.infoPasajeroWeb[GestorIdiomas.getLang()] + "');";
                    $("#passengerInfo").attr('onclick',uriJS);
                // }
			});
			


			function isActive(btn){
				return $(btn).hasClass('ui-btn-active');
			}
			function activeButton(btn){
				$(btn).removeClass('ui-btn-up-c').addClass('ui-btn-down-c').addClass('ui-btn-active');
			}
			function deactiveButton(btn){
				$(btn).removeClass('ui-btn-down-c').removeClass('ui-btn-active').addClass('ui-btn-up-c');
			}	
			/**
			 * Cambia el estado de los checkbox 
			 */
			function toggleTyC(){				
				var activated = isActive('#checkbox_tyc_si');
				if(activated){ //Desactivar
					deactiveButton('#checkbox_tyc_si');
					activeButton('#checkbox_tyc_no');
					
				} else{
					activeButton('#checkbox_tyc_si');
					deactiveButton('#checkbox_tyc_no');					
				}				
			}
			
			$('#reservas').on('pageshow',function(event){
        		initPage(this);
        		trackPage();
        		autoScrollPageContentRole('reservas');
        		
        		// Activar NO en Terminos y condiciones
        		activeButton("#checkbox_tyc_no");
        		
        		$("#checkbox_tyc_si").off('click').on('click',function(e){        			
        			toggleTyC();
        		});
        		
        		$("#checkbox_tyc_no").off('click').on('click',function(e){
        			toggleTyC();
        		});
        		
//                var tyc_link = "javascript:window.open('" + ConstF.urlTermsAndConditions[GestorIdiomas.getLang()] + "','_system');";
        		var tyc_link = "javascript:browseExternalURLWithExternalBrowser('" + ConstF.urlTermsAndConditions[GestorIdiomas.getLang()] + "');";
                $("#tyc_link").attr('onclick',tyc_link);
      		});
      		
      		$(function(){
				paintDateScroll('datReservaEntrada','datetime');
				paintDateScroll('datReservaSalida','datetime');
				var airport = GestorAirports.SELECTED_AIRPORT();
        		if(airport.RESERVA_PARKING){
        			var terminals = GestorAirports.getTerminals(airport.AIRPORT_ID);
        			var finalTerminals = [];
        			for(var i=0;i<terminals.length;i++){
        				if(terminals[i].RESERVA_PARKING){
        					var eq = GestorResParking.getTerminalEq(airport.AIRPORT_ID,terminals[i].TERMINAL_ID);
        					if($.objectHasContent(eq)){
        						finalTerminals[finalTerminals.length] = terminals[i];
        					}
        				}
        			}
        			if(finalTerminals.length>0){
        				fillCmbTerminalList(finalTerminals, 'cmbTerminalReserva', GestorIdiomas.getLiteral('pois_allTerminalsText'), null);
        			} else{
        				paintLeftIconMessage('reservas_content', GestorIdiomas.getLiteral('reservas_no_disponible'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell');
        			}
        		} else{
        			paintLeftIconMessage('reservas_content', GestorIdiomas.getLiteral('reservas_no_disponible'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell');
        		}
			});
      		
      		function openBrowser(){
      			//Primero chequeamos los inputs porque el mobiscroll no hace las cosas bien
      			var _dateFromInput = $('#datReservaEntrada').val();
      			var _dateEndInput = $('#datReservaSalida').val();
      			if(isActive('#checkbox_tyc_no')) {
      				showPopup(GestorIdiomas.getLiteral('reservas_terminos_y_condiciones_no'));
      			} else if(!$.objectHasContent(_dateFromInput)){
      				showPopup(GestorIdiomas.getLiteral('reservas_entrada_null'));
      			} else if(!$.objectHasContent(_dateEndInput)){
      				showPopup(GestorIdiomas.getLiteral('reservas_salida_null'));
      			} else{
      				var _dateFrom = $('#datReservaEntrada').scroller('getDate');
      				var _dateEnd = $('#datReservaSalida').scroller('getDate');
      				if(!checkDates(_dateFrom,_dateEnd)){ //NO hay error
      					var params = "ddd=";
      					//Ida
      					var dia;
      					if(_dateFrom.getDate()<10){
      						dia = '0'+_dateFrom.getDate().toString();
      					} else{
      						dia = _dateFrom.getDate().toString();
      					}
      					params+=dia;
      					params += "&ddmy="+GestorResParking.getMonthEq(_dateFrom.getMonth())+_dateFrom.getFullYear();
      					
      					var h;
      					var m;
      					if(_dateFrom.getHours()<10){
      						h = '0'+_dateFrom.getHours().toString();
      					} else{
      						h = _dateFrom.getHours().toString();
      					}
      					if(_dateFrom.getMinutes()<10){
      						m = '0'+_dateFrom.getMinutes().toString();
      					} else{
      						m = _dateFrom.getMinutes().toString();
      					}
      					
      					params += "&ddt=" +h+":"+m;
      					
      					//Vuelta
      					if(_dateEnd.getDate()<10){
      						dia = '0'+_dateEnd.getDate().toString();
      					} else{
      						dia = _dateEnd.getDate().toString();
      					}
      					params += "&rdd=" + dia;
      					params += "&rdmy="+GestorResParking.getMonthEq(_dateEnd.getMonth())+_dateEnd.getFullYear();

						if(_dateEnd.getHours()<10){
      						h = '0'+_dateEnd.getHours().toString();
      					} else{
      						h = _dateEnd.getHours().toString();
      					}
      					if(_dateEnd.getMinutes()<10){
      						m = '0'+_dateEnd.getMinutes().toString();
      					} else{
      						m = _dateEnd.getMinutes().toString();
      					}      					

      					params += "&rdt=" +h+":"+m;
      					//Cod promocional
      					params += "&pc=" + $('#codigoPromocion').val();
      					//Terminales
      					var air = GestorAirports.SELECTED_AIRPORT().AIRPORT_ID;
      					var term = $('#cmbTerminalReserva option:selected').val();
      					//params += "&ap="+air;
      					// Si en el parametro ap pasamos el codigo del aeropuerto y a�adimos un nuevo parametro â€œtrâ€� en el que pasemos la terminal
      					params += "&ap="+air;
      					params += "&tr="+GestorResParking.getTerminalEq(air,term); 
      					// params += "&ap="+GestorResParking.getTerminalEq(air,term);
      					params += "&isjsenabled=Y";
      					params += "&postproduct=CP";
      					params += "&lang="+GestorResParking.getLangEq(GestorIdiomas.getLang());
      					//Otros
      					//window.plugins.childBrowser.postPage(ConstF.urlParking, params);
      					console.log('URL PARKING -> URL : ' + ConstF.urlParking);
                        console.log('URL PARKING -> METHOD : POST');
                        console.log('URL PARKING -> PARAMS : ' + params);
      					browseExternalURL(ConstF.urlParking, "POST", params);
      				}	
      			}
      		}
      		
      		function checkDates(dateFrom, dateEnd){
      			var error = false;
      			if(!$.objectHasContent(dateFrom)){
      				showPopup(GestorIdiomas.getLiteral('reservas_entrada_null'));
      				error = true;
      			} else if(!$.objectHasContent(dateEnd)){
      				showPopup(GestorIdiomas.getLiteral('reservas_salida_null'));
      				error = true;
      			} else{
      				if(dateFrom>=dateEnd){
      					showPopup(GestorIdiomas.getLiteral('reservas_fechas_err'));
      					error = true;
      				}
      			}
      			return error;
      		}
			
      		


				$('#panel_vuelos').on('pageshow', function(event) {
					initPage(this);
					trackPage();					
					autoScrollPageContentRole('panel_vuelos');
					
					if(tabSalidas){
						tabs('nav ul');
					} else { //Sacamos la de llegadas
						tabs('nav ul', 1);
					}
					
					$('#contextAirportTitle').html(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_NAME);
					
					checkFlightCaducity();
					
					//Primero pintamos y acto seguido actualizamos
					paintDepartureFlights(GestorDepartureFlights.SEARCH_FLIGHTS(), true);
					paintArrivalFlights(GestorArrivalFlights.SEARCH_FLIGHTS(), true);
					GestorContexto.setAirportTime(loadFlights);

					
				});

				$(function() {
					setProportionalWidthForTabs('panel_vuelos', [$('#tabSalidasPanelLink'), $('#tabLlegadasPanelLink')], 6);
				});
				
				/**
				 *Chequea la caducidad del panel de vuelos 
				 */
				function checkFlightCaducity(){
					//Chequeamos caducidad
					var lastUpdateDeparture = GestorDepartureFlights.LAST_MOBILE_UPDATE();
					var lastUpdateArrivals = GestorArrivalFlights.LAST_MOBILE_UPDATE();
					var lastUpdateFl = null;
							
					if(lastUpdateDeparture!=null && lastUpdateArrivals!=null){
						if(lastUpdateDeparture>lastUpdateArrivals){
							lastUpdateFl = lastUpdateArrivals;
						} else {
							lastUpdateFl = lastUpdateDeparture;
						}
					} else if(lastUpdateDeparture!=null){
						lastUpdateFl = lastUpdateDeparture;
					} else if(lastUpdateArrivals!=null){
						lastUpdateFl = lastUpdateArrivals;
					}
						
					if(lastUpdateFl!=null){
						var now = new Date();
						var limitUpdated = new Date(lastUpdateFl.getTime()+ConstF.flightDataMaxiumAge);
						if(now>limitUpdated){ //Demasiado tiempo sin actualizar, limpiamos y refrescamos la ventana
							GestorDepartureFlights.clearFlights();
							GestorArrivalFlights.clearFlights();			
						}
					}
				}
				
				function loadFlights(){
						cargaDepartureFlights();
						cargaArrivalFlights();	
				}
			
				function cargaDepartureFlights() {
	
					$.asyncTimerExecution(function() {
						var _airport = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID;
						GestorDepartureFlights.setParams(_airport, null, GestorAirports.applyAirportMarginDateTimeFrom(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,true), GestorAirports.applyAirportMarginDateTimeTo(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,true), null, null, null, null, 40, null,'N');
						GestorDepartureFlights.findDepartureFlights(function() {
							if(ActualPage == 'panel_vuelos' && _airport == GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID) {
								paintDepartureFlights(GestorDepartureFlights.SEARCH_FLIGHTS(), false);
							}
						}, function(){
							if(ActualPage == 'panel_vuelos' && _airport == GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID) {
								paintDepartureFlights(GestorDepartureFlights.SEARCH_FLIGHTS(), false);
							}
							checkFlightCaducity();
						});
					}, ConstF.delay_flightPanelUpdate, function() {
						return (ActualPage == 'panel_vuelos' && !isAppPaused);
					});
				}

				function paintDepartureFlights(departureFlights,initial) {
					
					if(departureFlights.length != 0) {
						var listHTML = '<div><center>';
						
						for(var flightNumber = 0; flightNumber < departureFlights.length; flightNumber++) {

							var _flight = departureFlights[flightNumber];
							var _formattedFlight = GestorFlightDetails.formatFlight(_flight);

							var flightClass = 'vueloNoSeleccionado-vuelosLista';
							if($.objectHasContent(GestorContexto.CONTEXT().UC_FLIGHT))
								if(_flight.pkSalida == GestorContexto.CONTEXT().UC_FLIGHT.pkSalida)
									flightClass = 'vueloSeleccionado-vuelosLista';

							var flightStateClass = '';
							if(_flight.estadoSalida == 'RET' || _flight.estadoSalida == 'RSR' || _flight.estadoSalida == 'NPR')
								flightStateClass = 'vueloRetrasado-vuelosLista';

							listHTML += '<div id="Dep'+flightNumber+'" onclick="eventPanelSelectVuelo();browseDetail(\'' + _flight.pkSalida +'\',\'' + _flight.pkLlegada +'\',\''+_flight.aeropuertoOrigen+'\',\''+_flight.aeropuertoDestino+'\',true,\'Dep'+flightNumber+'\');">';
							listHTML += '<table width="95%" cellpadding="0" cellspacing="0" class="' + flightClass + '" style="table-layout:fixed">';
							listHTML += '<tr>';
							if(_formattedFlight.FLIGHT_DEP_TIME_PROG != null) {
								listHTML += '<td width="11%" style="vertical-align:middle;">' + _formattedFlight.FLIGHT_DEP_TIME_PROG.toShortTimeString() + '</td>';
							} else {
								listHTML += '<td width="11%"></td>';
							}
							listHTML += '<td width="19%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.NUM_VUELO_DESC_SALIDA + '</div></td>';
							listHTML += '<td width="27%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.AIRPORT_ARR_NAME + '</div></td>';
							listHTML += '<td width="21%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.AIRPORT_DEP_TERMINAL_ID + ' ' + _formattedFlight.FLIGHT_DEP_GATE + '</div></td>';
							listHTML += '<td width="22%" class="' + flightStateClass + '"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.FLIGHT_DEP_OBS + '</div></td>';
							listHTML += '</tr>';
							listHTML += '</table>';
							listHTML += '</div>';
						}
						
						listHTML += '</center></div>';					
						$('#salidasWrapper').html(listHTML).trigger('create');
						
						
					} else {
						if(initial)
							paintLeftIconMessage('salidasWrapper', GestorIdiomas.getLiteral('loadingMessage'), null, '../../themes/default/common/img/ajax-loader.gif', 'flightPanelMessage_textCell');
						else {

							paintLeftIconMessage('salidasWrapper', GestorIdiomas.getLiteral('loadingNoDataMessage'), null, '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell');
						}
					}

					if($.objectHasContent(GestorDepartureFlights.SEARCH_FLIGHTS_UPDATE_TIME())){
						$('#departuresLastUpdate').html(GestorDepartureFlights.SEARCH_FLIGHTS_UPDATE_TIME().toShortTimeString());
					} else {
						$('#departuresLastUpdate').html(' - ');
					}

					
					setTimeout(function(){
							autoScrollPageContentRole('panel_vuelos');
					}, 1000);
							

				}

				function cargaArrivalFlights() {

					$.asyncTimerExecution(function() {
						var _airport = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID;
						GestorArrivalFlights.setParams(null, _airport, GestorAirports.applyAirportMarginDateTimeFrom(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,false), GestorAirports.applyAirportMarginDateTimeTo(GestorContexto.CONTEXT().UC_AIRPORT, GestorContexto.CONTEXT().UC_AIRPORT_LOCAL_TIME,false), null, null, null, null, 40, null, 'N');
						GestorArrivalFlights.findArrivalFlights(function() {
							if(ActualPage == 'panel_vuelos' && _airport == GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID) {
								paintArrivalFlights(GestorArrivalFlights.SEARCH_FLIGHTS(), false);
							}
						}, function(){
							if(ActualPage == 'panel_vuelos' && _airport == GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID) {
								paintArrivalFlights(GestorArrivalFlights.SEARCH_FLIGHTS(), false);
							}
							checkFlightCaducity();
						});
					}, ConstF.delay_flightPanelUpdate, function() {
						return (ActualPage == 'panel_vuelos' && !isAppPaused);
					});
				}

				function paintArrivalFlights(arrivalFlights,initial) {
					if(arrivalFlights.length != 0) {
						var listHTML = '<div><center>';

						for(var flightNumber = 0; flightNumber < arrivalFlights.length; flightNumber++) {


							var _flight = arrivalFlights[flightNumber];
							var _formattedFlight = GestorFlightDetails.formatFlight(_flight);

							var flightClass = 'vueloNoSeleccionado-vuelosLista';
							if($.objectHasContent(GestorContexto.CONTEXT().UC_FLIGHT))
								if(_flight.pkLlegada == GestorContexto.CONTEXT().UC_FLIGHT.pkLlegada)
									flightClass = 'vueloSeleccionado-vuelosLista';

							var flightStateClass = '';
							if(_flight.estadoLlegada == 'RET' || _flight.estadoLlegada == 'RSR' || _flight.estadoLlegada == 'NPR')
								flightStateClass = 'vueloRetrasado-vuelosLista';



							listHTML += '<div id="Arr'+flightNumber+'"  onclick="eventPanelSelectVuelo();javascript:browseDetail(\'' + _flight.pkSalida +'\',\'' + _flight.pkLlegada +'\',\''+_flight.aeropuertoOrigen+'\',\''+_flight.aeropuertoDestino+'\',false,\'Arr'+flightNumber+'\');">';
							listHTML += '<table width="95%" cellpadding="0" cellspacing="0" class="' + flightClass + '" style="table-layout:fixed" >';
							listHTML += '<tr>';
							if(_formattedFlight.FLIGHT_ARR_TIME_PROG != null) {
								listHTML += '<td width="11%" style="white-space: nowrap;text-overflow: ellipsis;">' + _formattedFlight.FLIGHT_ARR_TIME_PROG.toShortTimeString() + '</td>';
							} else {
								listHTML += '<td width="11%"></td>';
							}

							listHTML += '<td width="19%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.NUM_VUELO_DESC_LLEGADA + '</div></td>';
							listHTML += '<td width="22%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.AIRPORT_DEP_NAME + '</div></td>';
							listHTML += '<td width="17%"><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.AIRPORT_ARR_TERMINAL_ID + ' ' + _formattedFlight.FLIGHT_ARR_ROOM + '</div></td>';
							listHTML += '<td width="21%" class="' + flightStateClass + '" ><div style="white-space: nowrap; overflow:hidden;  text-overflow: ellipsis;">' + _formattedFlight.FLIGHT_ARR_OBS + '</div></td>';
							listHTML += '</tr>';
							listHTML += '</table>';

							listHTML += '</div>';
						}

						listHTML += '</center></div>';
						$('#llegadasWrapper').html(listHTML).trigger('create');
						
						

					} else {
						if(initial)
							paintLeftIconMessage('llegadasWrapper', GestorIdiomas.getLiteral('loadingMessage'), null, '../../themes/default/common/img/ajax-loader.gif', 'flightPanelMessage_textCell');
						 else {
						 	paintLeftIconMessage('llegadasWrapper', GestorIdiomas.getLiteral('loadingNoDataMessage'), null, '../../themes/default/common/img/ico_error.png', 'flightPanelMessage_textCell');
						 }
					}
					if($.objectHasContent(GestorArrivalFlights.SEARCH_FLIGHTS_UPDATE_TIME())){
						$('#arrivalsLastUpdate').html(GestorArrivalFlights.SEARCH_FLIGHTS_UPDATE_TIME().toShortTimeString());
					} else {
						$('#arrivalsLastUpdate').html(' - ');
					}
						
						
					 setTimeout(function(){
							autoScrollPageContentRole('panel_vuelos');
					}, 1000);
				}


      			function browseDetail(pkSalida,pkLlegada,iataOrig, iataDest, isDep,IdElem)
      			{
      				$('#'+IdElem).addClass('vuelo-selectedFlight').trigger('refresh');
      				var _aux;
					_params=[{'NAME':'pkSalida','VALUE':pkSalida},{'NAME':'pkLlegada','VALUE':pkLlegada}];
					
					if (isDep){
						//Escalas
						if($.objectHasContent(iataDest)){
							_params.push({'NAME':'aeropuertoDestino', 'VALUE':iataDest});
						}
      					_aux = $.getFilteredArrayFromJSONArray(GestorDepartureFlights.SEARCH_FLIGHTS(),_params);
      				}else{
      					//Escalas
      					if($.objectHasContent(iataOrig)){
      						_params.push({'NAME':'aeropuertoOrigen', 'VALUE':iataOrig});
      					}
      					_aux = $.getFilteredArrayFromJSONArray(GestorArrivalFlights.SEARCH_FLIGHTS(),_params);	
      				}
      					
      		
					if(_aux.length>=1){
						_aux[0].indPlanificador = 'N';
						GestorFlightDetails.setParamFlight(_aux[0]);
						browseFromClick('detalle_vuelo.html','none');
					}
      			}

			


				$('#promotions').on('pageshow',function(event){
					initPage(this);
					trackPage();
					paintUpperIconMessage('waitingPromotions',GestorIdiomas.getLiteral('loadingMessage'),'controlSectionDark','../../themes/default/common/img/ajax-loader.gif','controlSectionDarkHeader');
					autoScrollPageContentRole('promotions');
					loadPromotions();
      			});

				function loadPromotions() {
					GestorPromotions.loadAirportPromotions(function() { GestorPromotions.paintPromotions('listaPromociones') });
				}
				
			


				$('#select_airport').on('pageshow',function(event){
					trackPage();
					initPage(this);
        			cargaAeropuertos();
        			
        			if(!eval(GestorContexto.CONTEXT().UC_ALLOW_LOCATION)){
        				
        				$('#divBtnAirport').css('display','none');
        			}
        			
        			autoScrollPageContentRole('select_airport');
      			});
      			

      			function cargaAeropuertos(){
      				
      				var html;
      				html = '<div id="divAirports" data-role="fieldcontain"><fieldset data-role="controlgroup">';
      				var airports = GestorAirports.AIRPORTS();

					for(var i=0;i<airports.length;i++){
						html+='<input onclick="eventSelect(\''+airports[i].AIRPORT_ID+'\')" skipPatch="true" data-theme="check" type="radio" name="aeropuertos" id="aer_' + airports[i].AIRPORT_ID + '" value="' + airports[i].AIRPORT_ID + '"';
						if(airports[i].AIRPORT_ID == GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID){html+='checked="checked"';};						  
						html+= ' />';
         				html+='<label skipPatch="true" class="label-radios" for="aer_' + airports[i].AIRPORT_ID + '">' + airports[i].AIRPORT_NAME + '</label>';
					}
					
					html +='</fieldset></div>';

      				$('#listaAeropuertos').html(html);
      				$('#listaAeropuertos').trigger('create');
      			}
      			
      			function saveAirport()
      			{
      				var _airportId = $('input:radio[name=aeropuertos]:checked').val();
      				// FJOR - 11/04/2014
      				GestorPOIs.clearAllFilters();
      				// FJOR - 11/04/2014 - end
      				GestorAirports.setAirportManual(false);		//Se dice que no para modificarlo 			
      				GestorAirports.setAirport(_airportId);		
					GestorAirports.changeDefaultAirport(_airportId);
					GestorAirports.setAirportManual(true);	//Ya no se puede volver a modificar si no es desde esta ventana		
	
      				browseFromClick('index.html','none',null,true);
      			}
      			
      			function cancelBtn_Click(){
      				if(backAirportToHome){
      					browseFromClick('index.html','none',null,true);
      				}else{
      					browseFromClick('opciones.html','none',null,true);
      				}
      			}
      			
			


				$('#lista_vuelos').on('pageshow', function(event) {
					initPage(this);
					trackPage();
					tabs('nav ul');

					GestorSearchFlights.clearFlights();
					addFilterInfo();

					paintUpperIconMessage('flightListDiv', GestorIdiomas.getLiteral('loadingMessage'), 'controlSection', '../../themes/default/common/img/ajax-loader.gif', 'controlSectionHeader');
					
					cargaVuelos('flightListDiv');
					
					autoScrollPageContentRole('lista_vuelos');
				});

				function addFilterInfo() {
					if(GestorSearchFlights.PARAMETERS().SEARCH_MODE == "numVuelo") {
						var _title = GestorIdiomas.getLiteral('flightSearch_FilterText_FlightNumber') + $.strReplaceAll(GestorSearchFlights.PARAMETERS().AIRLINE_ID_IATA.toString().toUpperCase(),"%","") + $.strReplaceAll(GestorSearchFlights.PARAMETERS().FLIGHT_NUMBER.toString().toUpperCase(),'%','') + GestorIdiomas.getLiteral('flightSearch_FilterText_In') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DEP_AIRPORT_NAME.toUpperCase();
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTime') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortTimeString() + ' hrs. ';
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTimeTo') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortTimeString() + ' hrs. ';
						// if(GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME != null) {
						//	_title += GestorIdiomas.getLiteral('flightSearch_FilterText_Airline') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME.toUpperCase() + '.';
						// } else {
						//	_title += GestorIdiomas.getLiteral('flightSearch_FilterText_AnyAirline');
						// } 
						
						$('#filterApplied').html(_title);
					
					} else if(GestorSearchFlights.PARAMETERS().SEARCH_MODE == "salidas") {

						var _title = GestorIdiomas.getLiteral('flightSearch_FilterText_Departures') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DEP_AIRPORT_NAME.toUpperCase() + GestorIdiomas.getLiteral('flightSearch_FilterText_To');
						if(GestorSearchFlights.DESCRIPTIVE_PARAMETERS().ARR_AIRPORT_NAME != null) {
							_title += GestorSearchFlights.DESCRIPTIVE_PARAMETERS().ARR_AIRPORT_NAME.toUpperCase();
						} else {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_AnyDestination');
						}
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTime') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortTimeString() + ' hrs. ';
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTimeTo') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortTimeString() + ' hrs. ';
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_And');

						if(GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME != null) {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_Airline') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME.toUpperCase() + '.';
						} else {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_AnyAirline');
						}
						$('#filterApplied').html(_title);
						
					} else if(GestorSearchFlights.PARAMETERS().SEARCH_MODE == "llegadas") {
						var _title = GestorIdiomas.getLiteral('flightSearch_FilterText_Arrivals') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().ARR_AIRPORT_NAME.toUpperCase() + GestorIdiomas.getLiteral('flightSearch_FilterText_From');
						if(GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DEP_AIRPORT_NAME != null) {
							_title += GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DEP_AIRPORT_NAME.toUpperCase();
						} else {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_AnyOrigin');
						}
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTime') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE.toShortTimeString() + ' hrs. ';
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_DateTimeTo') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortDateString() + ' ' + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().DATE_TO.toShortTimeString() + ' hrs. ';						
						_title += GestorIdiomas.getLiteral('flightSearch_FilterText_And');

						if(GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME != null) {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_Airline') + GestorSearchFlights.DESCRIPTIVE_PARAMETERS().AIRLINE_NAME.toUpperCase() + '.';
						} else {
							_title += GestorIdiomas.getLiteral('flightSearch_FilterText_AnyAirline');
						}
						$('#filterApplied').html(_title);
						
					} else if(GestorSearchFlights.PARAMETERS().SEARCH_MODE == "cod2D") {
						var _title = GestorIdiomas.getLiteral('flightSearch_FilterText_Cod2D');
						_title += GestorSearchFlights.DESCRIPTIVE_PARAMETERS().COD2D_DES.toUpperCase();

						$('#filterApplied').html(_title);
					}
				}

				var _previousDate;//Se saca la variable para respetarla en la paginación
				function cargaVuelos(divId) {

					//var _date = new Date();
					//console.log('************************* TIEMPOS  Pantalla listado  - Inicia búsqueda: ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());

					GestorSearchFlights.findFlights(function(data) {
						
						//var _date = new Date();
						//console.log('************************* TIEMPOS  Pantalla listado  - Inicia pintado: ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());
						if(GestorSearchFlights.SEARCH_FLIGHTS().length > 0) {
							//Tenemos que pintar. Añadimos los de data que son los recuperados

							var listHtml = "<div>";
							var style;
							var flights = data;
							
							// Campo para marcar cuál es la fecha del vuelo anterior. Si es diferente que el vuelo actual y puesto que se da por hecho que vienen ordenador
							// Se debe insertar la cabecerá de nuevo día
							
							for(var i = 0; i < flights.length; i++) {

								var _flight = flights[i];
								var _formattedFlight = GestorFlightDetails.formatFlight(_flight);

								if(_formattedFlight.FLIGHT_STATE == 'DEL') {
									style = 'color: #FF8849;';
								} else {
									style = '';
								}

								// Campo que se evalua para hacer la agrupación por fecha. Es diferente para vuelos de salida que para los de llegada
								var _dateField = 'FLIGHT_DEP_TIME_PROG';
								if($.objectHasContent(_flight.pkLlegada)) _dateField = 'FLIGHT_ARR_TIME_PROG';
								if(_previousDate == null || _previousDate.toShortDateString() != _formattedFlight[_dateField].toShortDateString()) {
									listHtml += '<div class="date-listaVuelosLista" >' + _formattedFlight[_dateField].toShortDateString() + '</div>';
									_previousDate = _formattedFlight[_dateField];
								}

								listHtml += '<div onclick="javascript:eventListaSeeFlight();browseDetail(\'' + _flight.pkSalida + '\',\'' + _flight.pkLlegada + '\',\'' +_flight.aeropuertoOrigen + '\',\''+ _flight.aeropuertoDestino+'\');" class="listaVuelosLista">';
								listHtml += '<table cellpadding="2" cellspacing="0" width="100%">';
								listHtml += '<tr>';
								listHtml += '<td  width="20%" rowspan="3">';
								
								if (_formattedFlight[_dateField]) {
									listHtml += '<div class="title-listaVuelosLista">' + _formattedFlight[_dateField].toShortTimeString() + '</div>';
								} else {
									listHtml += '<div class="title-listaVuelosLista">' + '</div>';
								}
								
								if($.objectHasContent(_flight.pkSalida)) {
									listHtml += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/icon/ico_salidas.png"  />';
								} else if($.objectHasContent(_flight.pkLlegada)) {
									listHtml += '<img src="' + $.mobile.path.get() + '../../themes/default/common/img/icon/ico_llegadas.png" />';
								}

								listHtml += '</td>';
								listHtml += '<td width="70%">';
								listHtml += '<div class="flight-listaVuelosLista" >' + _formattedFlight.AIRPORT_DEP_NAME + ' - ' + _formattedFlight.AIRPORT_ARR_NAME + '</div>';
								listHtml += '</td>';
								listHtml += '<td width="10%" rowspan="3"><img src="' + $.mobile.path.get() + '../../themes/default/common/img/flecha_dcha.png"  class="iconEnlace"/></td>';
								listHtml += '</tr>';
								listHtml += '<tr>';
								listHtml += '<td>';
								
								if($.objectHasContent(_flight.pkSalida)) {
									listHtml += '<span class="title-listaVuelosLista" >' + _formattedFlight.NUM_VUELO_DESC_SALIDA + '</span>&nbsp;&nbsp;';
									var _phaseInfo = "";
									if($.objectHasContent(_formattedFlight.AIRPORT_DEP_TERMINAL_ID) || $.objectHasContent(_formattedFlight.FLIGHT_DEP_GATE)) {
										if($.objectHasContent(_formattedFlight.AIRPORT_DEP_TERMINAL_ID)) {
											_phaseInfo += _formattedFlight.AIRPORT_DEP_TERMINAL_ID;
										}
										if($.objectHasContent(_formattedFlight.FLIGHT_DEP_GATE)) {
											if(_phaseInfo != '') {
												_phaseInfo += ' - ';
											}
											_phaseInfo += GestorIdiomas.getLiteral('doorText') + _formattedFlight.FLIGHT_DEP_GATE;
										}
									}
									listHtml += '<span class="description-listaVuelosLista" >' + _phaseInfo + '</span>';
								} else if($.objectHasContent(_flight.pkLlegada)) {
									listHtml += '<span class="title-listaVuelosLista" >' + _formattedFlight.NUM_VUELO_DESC_LLEGADA + '</span>&nbsp;&nbsp;';
									var _phaseInfo = "";
									if($.objectHasContent(_formattedFlight.AIRPORT_ARR_TERMINAL_ID) || $.objectHasContent(_formattedFlight.FLIGHT_ARR_ROOM) || $.objectHasContent(_formattedFlight.FLIGHT_BAG_CAROUSEL)) {
										if($.objectHasContent(_formattedFlight.AIRPORT_ARR_TERMINAL_ID)) {
											_phaseInfo += GestorIdiomas.getLiteral('codBar_AbrevTerminal') + _formattedFlight.AIRPORT_ARR_TERMINAL_ID;
										}
										if($.objectHasContent(_formattedFlight.FLIGHT_ARR_ROOM)) {
											if(_phaseInfo != '') {
												_phaseInfo += ' - ';
											}
											_phaseInfo += _formattedFlight.FLIGHT_ARR_ROOM;
										}
										if($.objectHasContent(_formattedFlight.FLIGHT_BAG_CAROUSEL)) {
											if(_phaseInfo != '') {
												_phaseInfo += ' - ';
											}
											_phaseInfo += GestorIdiomas.getLiteral('carouselText') + _formattedFlight.FLIGHT_BAG_CAROUSEL;
										}
									}
									listHtml += '<span class="description-listaVuelosLista" >' + _phaseInfo + '</span>';
								}

								listHtml += '</td>';
								listHtml += '</tr>';
								listHtml += '<tr>';
								listHtml += '<td>';
								if($.objectHasContent(_flight.pkSalida)) {
									
									if (_formattedFlight.FLIGHT_DEP_TIME_REAL) {
										listHtml += '<div class="description-listaVuelosLista" style="' + style + '">' + GestorIdiomas.getLiteral('estimatedHour') + '<b>' + _formattedFlight.FLIGHT_DEP_TIME_REAL.toShortTimeString() + '</b> - ' + _formattedFlight.FLIGHT_DEP_OBS + '</div>';
									} else {
										listHtml += '<div class="description-listaVuelosLista" style="' + style + '">' + GestorIdiomas.getLiteral('estimatedHour') + _formattedFlight.FLIGHT_DEP_OBS + '</div>';
									}									
									
								} else if($.objectHasContent(_flight.pkLlegada)) {
									
									if (_formattedFlight.FLIGHT_ARR_TIME_REAL) {
										listHtml += '<div class="description-listaVuelosLista" style="' + style + '">' + GestorIdiomas.getLiteral('estimatedHour') + '<b>' + _formattedFlight.FLIGHT_ARR_TIME_REAL.toShortTimeString() + '</b> - ' + _formattedFlight.FLIGHT_ARR_OBS + '</div>';
									} else {
										listHtml += '<div class="description-listaVuelosLista" style="' + style + '">' + GestorIdiomas.getLiteral('estimatedHour') + _formattedFlight.FLIGHT_ARR_OBS + '</div>';
									}

								}

								listHtml += '</td>';
								listHtml += '</tr>';
								listHtml += '</table>';
								listHtml += '</div>';
							}

							listHtml += '</div>';


							if(GestorSearchFlights.SEARCH_FLIGHTS().length == data.length){//Si es la primera vez
								$('#' + divId).html(listHtml).trigger('create');
							}else{
								$('#' + divId).append(listHtml).trigger('refresh');
							}
							
							
							if(data.length>=GestorSearchFlights.PARAMETERS().MAX_RESULTS){
								$('#pullUpText').html(GestorIdiomas.getLiteral('pullUpLoadMore'));
								$('#pullUp').css('display','');
								$('#pullUp').trigger('refresh');
							} else {
								$('#pullUp').css('display','none');
							}
							
						} else {
							$('#pullUp').css('display','none');
							$('#pullUp').trigger('refresh');
							paintUpperIconMessage(divId, GestorIdiomas.getLiteral('flightSearch_NoData'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'controlSectionHeader');
						}

						//var _date = new Date();
						//console.log('************************* TIEMPOS  Pantalla listado  - Termina pintado: ' + _date.getMinutes() + ":" +  _date.getSeconds() + ':' + _date.getMilliseconds()+ ' --- ' + _date.getTime());

						$('#' + divId).trigger('create');
						setTimeout(function() {
							//autoScrollPageContentRole('lista_vuelos')
							PageScroll.refresh();
							//$.mobile.hidePageLoadingMsg(); 
						}, 1000);
						_mutexNextPageFlight = false;
					}, errCB);
				}

				function errCB() {
					$('#pullUp').css('display','none');
					paintUpperIconMessage('flightListDiv', GestorIdiomas.getLiteral('loadingErrorMessage'), 'controlSection', '../../themes/default/common/img/ico_error.png', 'controlSectionHeader');
					$('#flightListDiv').trigger('create');
					setTimeout(function() {
						autoScrollPageContentRole('lista_vuelos');
					}, 1000);
					_mutexNextPageFlight = false;
				}

				function browseDetail(pkSalida, pkLlegada,iataOrig, iataDest) {
					//var _date = new Date();
					//console.log('************************* TIEMPOS - Pulsar detalle de vuelo: ' + _date.getTime());
					
					_params = [{
						'NAME' : 'pkSalida',
						'VALUE' : pkSalida
					}, {
						'NAME' : 'pkLlegada',
						'VALUE' : pkLlegada
					}];
					
					//Escalas
					if($.objectHasContent(iataDest)){
							_params.push({'NAME':'aeropuertoDestino', 'VALUE':iataDest});
					}
					
					if($.objectHasContent(iataOrig)){
      						_params.push({'NAME':'aeropuertoOrigen', 'VALUE':iataOrig});
      				}
					
					var _aux = $.getFilteredArrayFromJSONArray(GestorSearchFlights.SEARCH_FLIGHTS(), _params);

					if(_aux.length >= 1) {
						//console.log('Navegamos a detalle de vuelo:' + JSON.stringify(_aux[0]));
						_aux[0].indPlanificador = 'S';
						GestorFlightDetails.setParamFlight(_aux[0]);
						browseFromClick('detalle_vuelo.html', 'none');
					}
				}
				
				var _mutexNextPageFlight = false;
				function PaintNextPage(){
					//$.mobile.showPageLoadingMsg(); 
					/*Cerrojo Mutex*/
					if(_mutexNextPageFlight){
						//console.log('Operacion en curso, bloqueando');
						return;
					}
					_mutexNextPageFlight = true;
					
					GestorSearchFlights.setNextPage();
					cargaVuelos('flightListDiv');
				}

			


				$('#index').on('pageshow', function(event) {
					initPage(this);
					trackPage();
					
					// Images
					var imgLang = GestorIdiomas.getLang();
					if(!imgLang) imgLang = "es_ES";//RP, se blinda por si en algĂşn momento no se recupera
					$('#metromenu_buscar_img').attr('src', './img/buscar-' + imgLang + '.jpg');
					$('#metromenu_mi_viaje_img').attr('src', './img/miviaje-' + imgLang + '.jpg');
					$('#metromenu_vuelos_img').attr('src', './img/vuelos-' + imgLang + '.jpg');
					$('#metromenu_transporte_img').attr('src', './img/transporte-' + imgLang + '.jpg');
					$('#metromenu_parking_img').attr('src', './img/parking-' + imgLang + '.jpg');
					$('#metromenu_pmr_img').attr('src', './img/pmr-' + imgLang + '.jpg');
					$('#metromenu_tiendas_img').attr('src', './img/tiendas-' + imgLang + '.jpg');
					$('#metromenu_restaurantes_img').attr('src', './img/restaurantes-' + imgLang + '.jpg');
					$('#metromenu_wifi_img').attr('src', './img/wifi-' + imgLang + '.jpg');
					$('#metromenu_salasvip_img').attr('src', './img/salasvip-' + imgLang + '.jpg');
					$('#metromenu_servicios_img').attr('src', './img/servicios-' + imgLang + '.jpg');
					$('#metromenu_compartir_img').attr('src', './img/compartir-' + imgLang + '.jpg');
					$('#metromenu_encuestas_img').attr('src', './img/opina-' + imgLang + '.jpg');
					$('#metromenu_promociones_img').attr('src', './img/promociones-' + imgLang + '.jpg');
					$('#metromenu_opciones_img').attr('src', './img/opciones-' + imgLang + '.jpg');					
					
					// var airport = GestorContexto.CONTEXT().UC_AIRPORT;
					var airportId = GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_ID;
					var airport = GestorAirports.getAirportById(airportId);
					
				
					// console.log("FJORDAN: airportId: " + airportId);
					// console.log("FJORDAN: airport: " + JSON.stringify(airport));
					// console.log("FJORDAN: airport from DB: " + JSON.stringify(airport2));
					
					if(airport.RESERVA_PARKING){
						$('#metromenu_parking').css('display','none');						
        				var terminals = GestorAirports.getTerminals(airport.AIRPORT_ID);
        				var finalTerminals = [];
        				for(var i=0;i<terminals.length;i++){
        					if(terminals[i].RESERVA_PARKING){
        						var eq = GestorResParking.getTerminalEq(airport.AIRPORT_ID,terminals[i].TERMINAL_ID);
        						if($.objectHasContent(eq)){
        							$('#metromenu_parking').css('display','');
        							break;
        						}
        					}
        				}
        				/*
        				if(finalTerminals.length==0){
        					$('#home_reserva_parking').css('display','none');
        				} else {
        					$('#home_reserva_parking').css('display','');
        				}
        				*/
        			} else{
        				$('#metromenu_parking').css('display','none');
        			}
        			
        			// Reserva Sala VIP
        			// console.log("FJORDAN AIRPORT: " + JSON.stringify(airport));
        			if (airport.RESERVE_VIP_ROOM == true) {
        				$('#metromenu_salasvip').css('display', '');
        				var uriJS = "javascript:eventReservaSalaVIP();browseExternalURLWithExternalBrowser('" + airport.RESERVE_VIP_ROOM_URL + '&Language=' + GestorIdiomas.getLang().toUpperCase() + "');";
                    	$("#metromenu_salasvip").attr('onclick',uriJS);
                    	
        			} else {
        				$('#metromenu_salasvip').css('display', 'none');
        			}
					
					//RPLAZA  - 11/04/2014
					$('#metromenu_wifi').css('display', 'none');
					var wifiData = ConstF.urlWifi[airport.AIRPORT_ID];
					if (!$.isEmptyObject(wifiData)) {
						var urlWifi = wifiData[GestorIdiomas.getLang()];
						var uriJSWifi = "javascript:eventWifi();browseExternalURLWithExternalBrowser('" + urlWifi + "');";
                    	$("#metromenu_wifi").attr('onclick',uriJSWifi);
						$('#metromenu_wifi').css('display', '');	
					}
					
					//RPLAZA  - 11/04/2014
					if(navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
						$('#metromenu_compartir').css('display', 'none');
					}
					
					$('#contextAirport').html(GestorContexto.CONTEXT().UC_AIRPORT.AIRPORT_NAME);

                    // Se limpia la busqueda de POIs (si hay alguna..)
                    GestorPOIs.clearAllFilters();
                               
					//Se pone en un timeout para dar tiempo a registrarla
					setTimeout( function(){
						if(GestorNotificaciones.HAS_NEW_NOTIF()) {
							$('#HasNotif').html(GestorIdiomas.getLiteral('notifications_NewNotif'));
						}
					}, 500);
				
					$('#index').trigger('create');		
					setTimeout(function(){
						autoScrollPageContentRole('index');	
					},1000)
							
				});
					
				//RPLAZA  - 11/04/2014
				function SocialSharing(){
				  //Se debe ocultar el boton pero dejamos el doble blindaje por si falla
				  if (!navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
						window.plugins.socialsharing.share(GestorIdiomas.getLiteral('sharing_msg'), GestorIdiomas.getLiteral('sharing_subject'));
				  } else {
				  	showPopup(GestorIdiomas.getLiteral('error_iOS5'));
				}
				}
			


				$('#externalPage').on('pageshow',function(event){
					initPage(this);
					trackPage();
					paintUpperIconMessage('waitingForSurvey',GestorIdiomas.getLiteral('loadingMessage'),'controlSection','../../themes/default/common/img/ajax-loader.gif','controlSectionHeader');
					loadSurveys();
				});
			
				function loadSurveys() {
					GestorSurveys.loadAirportSurveys(function() { GestorSurveys.paintSurveys('listaEncuestas') });
				};

			
