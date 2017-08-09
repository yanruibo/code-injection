






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
        









function clientBean(pkey, name){
	this.Name = name;
	this.PublicKey = pkey;
	this.Inactivedate;
	this.Active;
	this.Email;
	this.Password;
	this.Username;
	this.Idclient;
	this.Surname;
}

function ErrorBean(ErrorMessage, ErrorCode){
	this.ErrorMessage = ErrorMessage;
	this.ErrorCode = ErrorCode;
}

function SessionBean(idclient, cKey, cstate, idmobilea3, a3userlinked) {
    this.A3userlinked = a3userlinked
    this.IdMobileA3 = idmobilea3;
	this.Idclient = idclient;
	this.ClientKey = cKey;
	this.ClientState = cstate;
}




function LoginData(idclient, username, pwd){
	this.Idclient = idclient;
	this.Username = username;
	this.Pwd = pwd;
}


//carga de idioma
var g_locale = 'es'
loadLang(g_locale);

//url de servicios

/****  *****/
/** boolean: true para ejecutar desde el navegador (incluyendo ripple)
 * false para ejecutar desde mobile
 */
/****  *****/
var fromDesktop = false;

/**
 * url que se usará si fromDesktop = true
 */
var g_urlJsonServicesDesktop = 'http://localhost:8732/jsonServices';
//var g_urlJsonServicesDesktop = 'http://appa3asesor.articsoluciones.es/a3asesorMobile/jsonServices'


/**
 * Id de la aplicación en servidor
 */
var g_idApp = 8;

/**
 * url que se usará si fromDesktop = false
 */
//var g_urlJsonServicesMobile = 'http://192.168.1.129/WkeMobileService/jsonServices';

//var g_urlJsonServicesMobile = 'http://192.168.43.191/WkeMobileService/jsonServices';

var g_urlJsonServicesMobile = 'http://appa3asesor.articsoluciones.es/a3asesorMobile/jsonServices';
//var g_urlJsonServicesMobile = 'http://dev.articsoluciones.net/a3asesorMobile/jsonServices';
//en httpS sii el certificado ssl del servidor esta firmado por una entidad certificadora correcta (accv creo que no vale)
//var g_urlJsonServicesMobile = 'https://dev.articsoluciones.net/a3asesorMobile/jsonServices';

var g_urlWsa3 = "http://appa3asesor.a3software.com/default.aspx";
var g_token_wsa3 = "6216E12B-2AD9-4617-A3E6-5CDFDC72A0A7";
	


var g_configService = 'ConfigService.svc';
var g_resourceService = 'ResourceService.svc';
var g_pollService = 'PollService.svc';
var g_mAppService = 'MobileAppService.svc';
var g_publicKey = '16598742';

var CLIENT_STATE_ACTIVE = 1;
var CLIENT_STATE_ACTIVE_PENDING = 2;
var CLIENT_STATE_EMAIL_PENDING = 3;
var CLIENT_STATE_DESACTIVATED = 4;

var g_hasIconnection = true;
var msg_no_connection = "Necesita conexión a internet";
var tit_generic = "Error";
	
var g_err_99 = "Error en servidor.";
var g_err_88 = "Sesión de usuario incorrecta.";
var g_err_77 = "Usuario no logueado.";

var tit_share_err = "Error al compartir";
var msg_share_err = "No se ha podido compartir el contenido";

function hasIconnection(titMsg){	
	if(g_hasIconnection){
		return true;
	}else{
		if(titMsg != undefined && titMsg != null && titMsg != ''){
			alertNative(msg_no_connection, null, titMsg, "Ok");
		}		
		return false;
	}	
}

function checkNetworkConnection(){
	var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    //alert('Connection type: ' + states[networkState]);
    if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
        g_hasIconnection = false;
    	return false;
    } else {
         g_hasIconnection = true;
    	return true;
    }    
}

function isFromDesktop(){
	return fromDesktop;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}


function getUrlRestService(serviceName, seMethod, params, includeKey, showNoInetMsg) {
    var msgNoConnect = tit_generic;
    if (showNoInetMsg != undefined && !showNoInetMsg) {
        msgNoConnect = "";
    }
    if (hasIconnection(msgNoConnect)) {
		if(fromDesktop){
			url = g_urlJsonServicesDesktop;
		}else{
			url = g_urlJsonServicesMobile
		}
		url += "/" + serviceName + "/" + seMethod;
		if (includeKey){
			url += "/" + g_publicKey
		}
		if (params != null){
			for(i=0;i<params.length;i++){
				url += "/" + params[i];
			}	
		}	
		return url;
	}else return null;
}

function alertNative(msg, callbackFunc, title, btnName){
	if(navigator.notification != undefined){
		navigator.notification.alert(msg, callbackFunc, title, btnName);	
	}else{
		alert(msg);
	}		
}

navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

function getDevicePlatform(){
	try{
		return device.platform;
	}catch(err){
		return navigator.sayswho[0];
	}	
}
function getDevicePlatformVersion(){
	try{
		return device.version;
	}catch(err){
		return navigator.sayswho[1];
	}	
}

function isRegistered(){
	var isReg = window.localStorage.getItem("loginData")
	if (isReg != null){
		return true;
	}else return false;
}

function isRegisteredAndActive(){
	var rtn = false;
	var sbean = getSessionBean();
	if (sbean != null){				
		if(sbean.ClientState == CLIENT_STATE_ACTIVE){
			rtn = true; 
		}
	}
	return rtn;
}


function saveSessionBean(sbean){
	window.sessionStorage.setItem("sbean", JSON.stringify(sbean));
}

function getSessionBean(){
	var sbean = window.sessionStorage.getItem("sbean");	
	if (sbean != null){
		return JSON.parse(sbean);
	}else if(isRegistered()){
		//tiene datos de registro, intentamos hacer el login ahora, por si al iniciar la app no la hubier hecho
		//por no tener acceso a internet
		doSilenceseLogin(null, false, true);
		return JSON.parse(window.sessionStorage.getItem("sbean"));
	}else return null;
}


var tit_error_login = "Error de login";
var err_login_clie_88 = "Error durante la autenticación contra el servidor. Clave pública incorrecta.";
var err_login_clie_99 = "Error durante la autenticación contra el servidor. Vuelve a introducir tus datos de acceso.";
var err_login_clie_1 = "Es posible que tu cuenta haya sido eliminada. Vuelve a introducir tus datos de acceso.";
	
//pagina a la que ir si el login silencioso est� correcto
var sloginRedirectOk = '';
function doSilenceseLogin(redirectOkPage, redirectOnError, regInA3){	
	console.log("doSilenceseLogin");
	var ldata = window.localStorage.getItem("loginData");
	if(ldata != null){
		ldata = JSON.parse(ldata);		
		sloginRedirectOk = redirectOkPage;
		//var urlJson = getUrlRestService(g_configService, "login", [g_idApp, ldata.Username, ldata.Pwd], true);
		var urlJson = getUrlRestService(g_configService, "login", null, false, false);
		if (urlJson != null) {
		    var req = new Object()
		    req.pkey = g_publicKey;
		    req.idapp = g_idApp;
		    req.username = ldata.Username;
		    req.pwd = ldata.Pwd;
		    $.ajax({ url: urlJson, type: "POST",
		        data: JSON.stringify(req), async: false, dataType: 'json',contentType: "application/json",
		        success: function (resp) {
		            resp = JSON.parse(resp);
		            if (resp.hasOwnProperty('ErrorCode')) {
		                alertNative(eval('err_login_clie_' + resp.ErrorCode), null, tit_error_login, "Ok")
		                if (resp.ErrorCode == 1) {
		                    //usuario no existe,borramo logindata y redirigimos a p�gin de login
		                    window.localStorage.removeItem("loginData");
		                    if (redirectOnError) {
		                        $.mobile.changePage("config.html#loginPage", { transition: "slide" });
		                    }
		                } else {
		                    //error en servidor
		                    if (redirectOnError) {
		                        $.mobile.changePage("config.html#loginPage", { transition: "slide" });
		                    }
		                }
		            } else {
		                saveSessionBean(resp);
		                //obtenemos la parte dinamica del menu
		                getDynamicMenu(true);
		                if (regInA3) {
		                    //llamamos a los servicios de a3 para registrar el acceso
		                    regAccesA3();
                        }		                
		                //redirigimos
		                if (sloginRedirectOk != null) {
		                    $.mobile.changePage(sloginRedirectOk, { transition: "slide" });
		                }
		            }
		        }
		    });
		}
	}	
}

function getDynamicMenu(forceReadServer){
	var dmenu = window.sessionStorage.getItem("dynmenu");
	if (dmenu == null || forceReadServer){
		var urlJson = getUrlRestService(g_resourceService, "dmenu",null, false);
		if (urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			req.idapp = g_idApp;
			req.lang = g_locale;
			$.ajax({url: urlJson, async: false, dataType: 'json',type: "POST", data: JSON.stringify(req),contentType: "application/json",
				  success: function (resp) {
					  console.log("peticion recibida de 'getDynamicMenu'")
					  resp = JSON.parse(resp);
						if (resp.hasOwnProperty('ErrorCode')){
							alertNative(eval('g_err_'+resp.ErrorCode), null, "Error", "Ok")									
						}else{
							//console.log(resp)
							window.sessionStorage.setItem("dynmenu", JSON.stringify(resp));
							dmenu = JSON.stringify(resp);
						}
				  }
				});
		}
	}
	
	return JSON.parse(dmenu);
		
}

function share(subject, text){
	if(isFromDesktop()){
		alert("Función no disponible para PC")
	}else{
		window.plugins.share.show({
		    subject: subject,
		    text: text},
		    function() {}, // Success function
		    function() {alertNative(msg_share_err, null, tit_share_err, "Ok");} // Failure function
		);	
	}
	
}

/**
 * En android solo soportado para version 4.0 o superior
 * @param title
 * @param location
 * @param notes
 * @param startDate tipo Date
 * @param endDate tipo Date
 */
function addEventToCalendarDevice(title,location,notes,startDate,endDate){
	m_title = title;
	m_location = location;
	m_notes = notes;
	m_startDate = startDate;
	m_endDate = endDate;
	if(getDevicePlatform() == 'iOS'){
		//TODO: IOS
		alertNative("No implementado", null, "Evento a calenario", "Ok")
	}else if(getDevicePlatform() == 'Android'){
		//android
		//sólo para version 4.0 o superiores
		if(getDevicePlatformVersion().indexOf("4") == 0){
			confirmNative("¿Desea incorporar el evento '" + title + "' al calendario de su dispositivo?",
					onConfirmAdd2calAndroid, "Crear evento", "Sí, No");				
		}
		
	}else{
		alertNative("Plataforma no soportada", null, "Evento a calenario", "Ok")
	}
}
var m_title;
var m_location;
var m_notes;
var m_startDate;
var m_endDate;
function onConfirmAdd2calAndroid(buttonIndex) {
    if (buttonIndex == 1){
    	window.plugins.calendarPlugin.createEvent(m_title,m_location,m_notes,m_startDate,m_endDate, function() { }, function() { });
    }
}


/**
 * 
 * @param msg
 * @param callbackFunc Le llegara el indice del boton apretado
 * @param title
 * @param buttonLabels separados por coma
 */
function confirmNative(msg, callbackFunc, title, buttonLabels){
	if(navigator.notification != undefined){		
		navigator.notification.confirm(
		        msg,
		        callbackFunc,              // callback to invoke with index of button pressed
		        title,            // title
		        buttonLabels          // buttonLabels
		    );
	}		
}

/**
 * REgistra el acceso de un usuario contra los servicios web de a3
 * @param 
 * @returns
 */
function regAccesA3(){
    console.log("entramos en regAccesA3:I= " + getSessionBean().IdMobileA3);    
    var resp;
	//de momento con el id cliente del backoffice
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: false, type: "POST", data: "F=WS01&I=" + getSessionBean().IdMobileA3,
    complete: function (e, xhr, settings) {        
            if (e.status === 200) {                
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error registrando acceso a3 (WS01), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    console.log("regAccesA3 correcto");
                }
            } else {
                alertNative("Error registrando acceso a3 (WS01), code: " + e.status, null, "Error", "Ok")
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS01:TOK incorrecto");
                } else if (e.status === 405) {
                    //Método incorrecto
                    console.log("WS01:Método incorrecto");
                } else {
                    console.log("WS01:Error en regAccesA3, statusCode: " + e.status);
                }
            }
        }
    });		
}

function loadAppProfiles() {    
//    var urlJson = getUrlRestService(g_configService, "aprofiles", [g_idApp, g_locale], true);
//    if (urlJson != null) {
//        console.log("entramos en loadAppProfiles")
//        $.ajax({ url: urlJson, type: "POST", dataType: 'json', contentType: "application/json", async: false, success: function saveAppProfiles(profilesStr) {
//            console.log("resp loadAppProfiles: " + profilesStr);
//            window.sessionStorage.setItem("appProfiles", profilesStr);
//        } 
//        });
//    } else {
//        console.log("urlJson null en loadAppProfiles")
//    }

    var urlJson = getUrlRestService(g_configService, "aprofiles", null, false);
    if (urlJson != null) {
        var req = new Object()
        req.pkey = g_publicKey;
        req.idapp = g_idApp;
        req.lang = g_locale;
        //console.log("entramos en loadAppProfiles: " + g_publicKey + ", " + g_idApp + ", " + g_locale)
        $.ajax({ url: urlJson, async: false, dataType: 'json', type: "POST", data: JSON.stringify(req), contentType: "application/json",
            success: function (profilesStr) {
                //console.log("resp loadAppProfiles: " + profilesStr);
                window.sessionStorage.setItem("appProfiles", profilesStr);
            }
        });
    } else {
        console.log("urlJson null en loadAppProfiles")
    }

}



sp_dict = { 
		"news"  : "Noticias",
		"menu"  : "Menú",
		"close_menu"  : "Cerrar menú",
		"rss"  : "Noticias",
		"resources"  : "Corner 2.0",
		"courses"  : "Cursos",
		"calendar"  : "Calendario",
		"polls"  : "Encuestas",
		"applications"  : "Aplicaciones",
		"config" : "Configuración",
		"home" : "Inicio",
		"open" : "Abrir"
		//"Dynamic Content" : "Your browser window is %s x %s",
		//"Ordered Dynamic Content": "%2$s is the height of your browser window, and %1$s is the width."
	};


function loadLang(langCode){
	if (langCode == 'es'){
		$.i18n.setDictionary(sp_dict);
	}	
}

var tit_reg_data = "Información de registro";
var dmenuItems;

function printPanelMenu(idCurrentPage, isactive, idDivRolPage){
	dmenuItems = getDynamicMenu(false);
	if (dmenuItems == undefined){
		dmenuItems = [];
	}
    var cdisabled = "";
    var classNotices = "submenuclose";
    if (idCurrentPage == 'opBOEs' || idCurrentPage == 'opLastNotices' || idCurrentPage == 'opNewVersions') {
        classNotices = "submenuopen";
    }

	var classConfig = "submenuclose";
	if (idCurrentPage == 'opEula' || idCurrentPage == 'opContact' || idCurrentPage == 'opReg'){
		classConfig = "submenuopen";
    }
    var profList = JSON.parse(window.sessionStorage.getItem("appProfiles"));
    var classCourses = "submenuclose";
    if (idCurrentPage.indexOf('opCur') != -1) {
        classCourses = "submenuopen";
    }
	idCurrentOp = idCurrentPage;
	idPage2fade = idDivRolPage;
	//en principio siempre estar� el men� activo
//	if(!isactive){		
//		cdisabled = 'class="ui-disabled"'
//	}

	var menuDiv = '<div data-role="panel" data-position-fixed="false" data-display="overlay" class="fsize17" data-iconpos="left" data-position="right" data-theme="menu"' +
	'id="nav-panel">' +
	'<ul data-role="listview" id="listMenu" data-theme="menu" class="nav-search" data-iconpos="left" data-icon="">' +
	'	<li class="ui-btn-icon-left" data-iconshadow="false" data-icon="delete"><a id="closeMen" href="#"  data-iconpos="left" data-rel="close">' +
	'			</a></li>' +
	'	<!--li><a id="opNew" href="newsWke.html" rel="external">Noticias</a></li-->';
	
	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position < 10){
			menuDiv +='<li><a onclick="openDynMenu(' + i + ')" id='+ dmenuItems[i].code +' href="#panel-fixed-page2">'+ dmenuItems[i].name +'</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" data-icon="a3Avisos" class="ui-btn-icon-left"><a id="opNotices">Avisos</a></li>' +
	'	<li data-iconshadow="false"  data-iconpos="left" data-icon="a3Boe" id="liBoes" class="' + classNotices + ' ui-btn-icon-left"><a id="opBOEs">BOEs <span id="count_opBoes" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>' +
	'	<li data-iconshadow="false" data-iconpos="left" data-icon="a3ultav" id="liLastNotices" class="' + classNotices + ' ui-btn-icon-left"><a id="opLastNotices">Últ. avisos <span id="count_opCom" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>' +
	'	<li data-iconshadow="false" data-iconpos="left" data-icon="a3Nversiones" id="liNewVersions" class="' + classNotices + ' ui-btn-icon-left"><a id="opNewVersions">Nuevas versiones <span id="count_opNvers" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
	

	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 10 && dmenuItems[i].position < 20){
		    menuDiv += '<li data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3news" ' + cdisabled + '><a id="opNew">Noticias <span id="count_opNew" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span> </a></li>';

var dataicon;
for (i = 0; i < dmenuItems.length; i++) {
    dataicon = "";
    if (dmenuItems[i].position >= 20 && dmenuItems[i].position < 30) {
    //a piñon, hasta que esté dinamico
        if (dmenuItems[i].code == "dyn_7"){
            dataicon = ' class="ui-btn-icon-left" data-icon="solucWke" '
        } else if (dmenuItems[i].code == "dyn_9") {
            dataicon = ' class="ui-btn-icon-left" data-icon="asestv" '
        }
		    menuDiv += '<li data-iconshadow="false" '+ dataicon +' ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left"  data-icon="a3corner" ' + cdisabled + '><a id="opResources">Corner 2.0 <span id="count_opResources" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span> </a></li>';

	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 30 && dmenuItems[i].position < 40){
		    menuDiv += '<li  data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

//menuDiv += '	<li data-icon="a3cursos" ' + cdisabled + '><a id="opCourses" href="#panel-fixed-page2">Cursos <span id="count_opCourses" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3cursos"><a id="opCourses"  href="#panel-fixed-page2">Cursos</a></li>';
    if (getSessionBean() != null) {
        menuDiv += '	<li data-iconshadow="false"  id="liCuMyprof" class="' + classCourses + '"><a id="opCurMyprof">Mis perfiles <span id="count_opCurMyprof" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
    } else {
        menuDiv += '	<li data-iconshadow="false"  id="liCuAll" class="' + classCourses + '"><a id="opCurAll">Todos <span id="count_opCurAll" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
    }        

    //por cada perfil añadimos un submenu
    
    if (profList != undefined) {
        for (i = 0; i < profList.length; i++) {
            menuDiv += '<li data-iconshadow="false"  id="liCu_' + profList[i].a3code + '" class="' + classCourses + '"><a onclick="$(\'#count_opCur_' + profList[i].a3code + '\').hide();openPage(null, \'cursosList.html?name=' + profList[i].nombre + '&id=opCur_' + profList[i].a3code + '&prof=' + profList[i].a3code + '\', \'opCur_' + profList[i].a3code + '\');" id="opCur_' + profList[i].a3code + '">' + profList[i].nombre + ' <span id="count_opCur_' + profList[i].a3code + '" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
        }
    }
	
	
	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 40 && dmenuItems[i].position < 50){
		    menuDiv += '<li data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3eventos" ' + cdisabled + '><a id="opCal" href="#panel-fixed-page2">Calendario <span id="count_opCal" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span></a></li>';
	
	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 50 && dmenuItems[i].position < 60){
			menuDiv +='<li><a onclick="openDynMenu(' + i + ')" id='+ dmenuItems[i].code +' href="#panel-fixed-page2">'+ dmenuItems[i].name +'</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3encuestas" ' + cdisabled + '><a id="opPolls" >Encuestas <span id="count_opPolls" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span> </a></li>';
	
	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 60 && dmenuItems[i].position < 70){
		    menuDiv += '<li data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3apli" ' + cdisabled + '><a id="opApps">Aplicaciones <span id="count_opApps" class="ui-li-has-count ui-li-count ui-btn-up-c ui-btn-corner-all" style="display:none;float:right;right:35px;"></span> </a></li>';
	
	for(i=0;i<dmenuItems.length;i++){
		if(dmenuItems[i].position >= 70 && dmenuItems[i].position < 80){
		    menuDiv += '<li data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
	}

var regDataMenu = 'Registro';
if (getSessionBean() != null) {
    regDataMenu = 'Mis datos'
}

menuDiv += '	<li data-iconshadow="false" class="ui-btn-icon-left" data-icon="a3conf"><a id="opconf">Configuración</a></li>' +
	'	<li data-iconshadow="false"  data-icon="a3eula" id="liEula" class="' + classConfig + '  ui-btn-icon-left"><a id="opEula">Acuerdo de licencia</a></li>' +
	'	<li data-iconshadow="false"  data-icon="a3contact" id="liContact" class="' + classConfig + '  ui-btn-icon-left"><a id="opContact">Contacto</a></li>' +
	'	<li data-iconshadow="false"  data-icon="a3reg" id="liReg" class="' + classConfig + '  ui-btn-icon-left"><a id="opReg">' + regDataMenu + '</a></li>';


    var liInLast = false;
	for(i=0;i<dmenuItems.length;i++){
	    if (dmenuItems[i].position >= 80) {
	        liInLast = true;
		    menuDiv += '<li data-iconshadow="false" ><a onclick="openDynMenu(' + i + ')" id=' + dmenuItems[i].code + ' href="#panel-fixed-page2">' + dmenuItems[i].name + '</a></li>';
		}
    }
    if (!liInLast) {
        //dummy para que no se visualice mal el menu al expandir el menu de configuracion
        menuDiv += '<li data-iconshadow="false" ></li>';
    }

menuDiv += '</ul></div>';
	
	$('#' + idDivRolPage).append(menuDiv)
		//$('#' + idCurrentPage).attr('href', '#');
		//$('#' + idCurrentPage).attr('data-rel', 'close');
		loadLinks(dmenuItems);
		
	//consultamos si hay elementos nuevos del menu estatico
	hasNewElements("opNew");
	hasNewElements("opResources");
	hasNewElements("opPolls");
	hasNewElements("opApps");
	hasNewElementsa3();

	//coloreamos la op de menu seleccionada

	$('#' + idCurrentPage).parent().addClass("itemActive");

	
}
var page2load = '';
var idPage2fade = '';
var idCurrentOp = '';

function openPage(event, page2open, menuOp){
	if(event != null){
		event.preventDefault();
		event.stopImmediatePropagation();
}

    if(idCurrentOp != menuOp){
    	page2load = page2open;            
    }else{
    	page2load = '';
    }    		
    $( "#nav-panel" ).panel( "close" );
}

function openDynMenu(idx) {
    var url = dmenuItems[idx].url2load;
    var target;
    if (hasIconnection("Menú")) {
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");        
        if (getSessionBean() != null) {
            if (url.indexOf('?') != -1) {
                url += "&I=" + getSessionBean().IdMobileA3
            } else {
                url += "?I=" + getSessionBean().IdMobileA3
            }
        }
        if (dmenuItems[idx].showembed != null && !dmenuItems[idx].showembed) {
            if (getDevicePlatform() == 'Android' && url.indexOf('.mp4') != -1) {
                target = "_system";
            } else {
                target = "_blank";
            }            
            window.open(url, target, 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
        } else {
            openPage(null, 'externalPage.html?id=' + dmenuItems[idx].code + '&titmenu=' + dmenuItems[idx].name + '&url2load=' + url, dmenuItems[idx].code);
        }
    }
}

function loadLinks(){

    $("#opBOEs").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opBOEs').parent().addClass("itemActive");
        if (getSessionBean() != null && getSessionBean().A3userlinked) {
            $('#count_opBoes').hide();
            openPage(e, "boesList.html", "opBOEs");
        } else {
            openPage(e, "noregPage.html?id=opBOEs&t=linka3", "opBOEs");
        }
        return false;
    });

    $("#opLastNotices").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opLastNotices').parent().addClass("itemActive");
        if (getSessionBean() != null && getSessionBean().A3userlinked) {
            $('#count_opCom').hide();
            openPage(e, "avisosList.html", "opLastNotices");
        } else {
            openPage(e, "noregPage.html?id=opLastNotices&t=linka3", "opLastNotices");
        }
        return false;
    });

    $("#opNewVersions").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opNewVersions').parent().addClass("itemActive");
        if (getSessionBean() != null && getSessionBean().A3userlinked) {
            $('#count_opNvers').hide();
            openPage(e, "newVersList.html", "opNewVersions");
        } else {
            openPage(e, "noregPage.html?id=opNewVersions&t=linka3", "opNewVersions");
        }
        return false;
    }); 

    $("#opNotices").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        openCloseSubmenu('liBoes');
        openCloseSubmenu('liLastNotices');
        openCloseSubmenu('liNewVersions');        
        return false;
    });

    $("#opPolls").click(function (e) {
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opPolls').parent().addClass("itemActive");
        if (getSessionBean() != null) {
            openPage(e, "pollList.html", "opPolls");
            saveLastAccessDate("opPolls");
        } else {
            openPage(e, "noregPage.html?id=opPolls", "opPolls");
        }
    });
	
	$("#opconf").click(function(e){	
		//e.preventDefault();
        //e.stopImmediatePropagation();
        openCloseSubmenu('liEula');
        openCloseSubmenu('liContact');
        openCloseSubmenu('liReg');
        return false;
        });

    $("#opResources").click(function (e) {
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opResources').parent().addClass("itemActive");
        if (getSessionBean() != null) {
            openPage(e, "resourcesList.html", "opResources");
            saveLastAccessDate("opResources");
        } else {
            openPage(e, "noregPage.html?id=opResources", "opResources");            
        }
        
     });

     $("#opEula").click(function (e) {
         if (hasIconnection("Acuerdo de licencia")) {
             $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
             $('#opEula').parent().addClass("itemActive");
             openPage(e, "config.html?op=opEula#eulaPage", "opEula");
         }
         
     });

     $("#opContact").click(function (e) {
         $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
         $('#opContact').parent().addClass("itemActive");
        openPage(e, "config.html?op=opContact#contactPage", "opContact");
    });
	
	$("#opReg").click(function(e){
	    if (hasIconnection(tit_reg_data)) {
	        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
	        $('#opReg').parent().addClass("itemActive");
        	if (getSessionBean() == null){
     		  openPage(e, "config.html?op=opReg2#loginPage", "opReg");     		 
     	   }else{
     		  openPage(e, "config.html?op=opReg1#regPage", "opReg");  
     	   }
        }	 
    });

$("#opNew").click(function (e) {
    $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");    
    $('#opNew').parent().addClass("itemActive");
    if (getSessionBean() != null) {
        openPage(e, "rssList.html", "opNew");
        saveLastAccessDate("opNew");
    } else {
        openPage(e, "noregPage.html?id=opNew", "opNew");
    }

});


$("#opCurAll").click(function (e) {
    $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
    $('#opCurAll').parent().addClass("itemActive");
    openPage(e, "cursosList.html?id=opCurAll", "opCurAll");
    return false;
});

$("#opCurMyprof").click(function (e) {
    $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
    $('#opCurMyprof').parent().addClass("itemActive");
    $('#count_opCurMyprof').hide();
    openPage(e, "cursosList.html?id=opCurMyprof", "opCurMyprof");
    return false;
});


$("#opCourses").click(function (e) {
    //openPage(e, "cursosList.html", "opCourses");
    if (getSessionBean() != null) {
        openCloseSubmenu('liCuMyprof');
    } else {
        openCloseSubmenu('liCuAll');
    }

    var profList = JSON.parse(window.sessionStorage.getItem("appProfiles"));
    if (profList != undefined) {
        for (i = 0; i < profList.length; i++) {
            openCloseSubmenu("liCu_" + profList[i].a3code );
        }
    }

    return false;
});

$("#opApps").click(function (e) {
    if (hasIconnection("Apps móviles")) {
        $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
        $('#opApps').parent().addClass("itemActive");
        openPage(e, "mAppList.html", "opApps");
        saveLastAccessDate("opApps");
    }
    
});
	

	$("#opCal").click(function(e){
	    //openPage(e, "CalendarList.html", "opCal");
	    $('#' + idCurrentOp).parent().parent().parent().removeClass("itemActive");
	    $('#opCal').parent().addClass("itemActive");
	    if (getSessionBean() != null) {
	        $('#count_opCal').hide();
	        openPage(e, "eventsList.html", "opCal");	        
	    } else {
	        openPage(e, "noregPage.html?id=opCal", "opCal");
	    }
	});


	//se ejecuta cuando se cierra el panel
	$("#nav-panel").on("panelclose", function (event, ui) {
	    changePageMenu();
	});
	
}

function changePageMenu() {    
    if (page2load != '') {
        $('#' + idPage2fade).fadeOut('slow', function () {
            // Animation complete.
            console.log("pag a cargar: " + page2load)
            location.href = page2load;
        });
    }
}

function openCloseSubmenu(liMenu){
	if($("#"+liMenu).attr('class').indexOf('submenuclose') != -1){
		$("#"+liMenu).removeClass('submenuclose');
		$("#"+liMenu).addClass('submenuopen');	
	}else{
		$("#"+liMenu).addClass('submenuclose');
		$("#"+liMenu).removeClass('submenuopen');
	}
	
}

function translateMenu(){
	//comentado porque es incompatible con las burbujas
//	$('a#opNews').text($.i18n._('news'));
//	$('a#closeMen').text($.i18n._('close_menu'));
//	$('a#opRss').text($.i18n._('rss'));
//	$('a#opResources').text($.i18n._('resources'));
//	$('a#opCourses').text($.i18n._('courses'));
//	$('a#opCal').text($.i18n._('calendar'));
//	$('a#opPolls').text($.i18n._('polls'));
//	$('a#opApps').text($.i18n._('applications'));
//	$('a#opconf').text($.i18n._('config')); 
}

function saveLastAccessDate(idOptMenu){
	if(g_hasIconnection){
		var urlJson = getUrlRestService(g_configService, "mlad", null, false);
		if(urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			if(req.sbean != null){
				req.idapp = g_idApp;
				req.idOptMenu = idOptMenu;
				$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), dataType: "json",
			              contentType: "application/json"
			            } );	
			}			
		}
	}
}

function hasNewElementsa3(){
	if(g_hasIconnection){		
		var sbean = getSessionBean();
		var new_elements;
		var resp;
		if (sbean != null){
			//console.log("consultamos hasNewElementsa3");
			idmobile = sbean.IdMobileA3;
			$.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
			    xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
			}, async: true, type: "GET", data: "F=WS05&I=" + idmobile,
			    complete: function (e, xhr, settings) {
			        if (e.status === 200) {
			            resp = JSON.parse(e.responseText);
			            if (resp.Error.cod != 0) {
			                //alertNative("Error accediendo al servicio de situación de usuario (WS05), code: " + resp.Error.cod, null, "Error", "Ok")
			                console.log("Error accediendo al servicio de situación de usuario (WS05), code: " + resp.Error.cod);
			            } else {
			                new_elements = resp.Contenido;
			                //console.log("hasNewElementsa3 - nuevos cursos: " + new_elements.cursos);
			                if (new_elements.cursos > 0) {
			                    $("#count_opCurMyprof").text(new_elements.cursos);
			                    $('#count_opCurMyprof').show();
			                } else {
			                    $('#count_opCurMyprof').hide();
			                }
			                if (new_elements.boe > 0) {
			                    $("#count_opBoes").text(new_elements.boe);
			                    $('#count_opBoes').show();
			                } else {
			                    $('#count_opBoes').hide();
			                }
			                if (new_elements.com > 0) {
			                    $("#count_opCom").text(new_elements.com);
			                    $('#count_opCom').show();
			                } else {
			                    $('#count_opCom').hide();
			                }
			                
			                if (new_elements.nver > 0) {
			                    $("#count_opNvers").text(new_elements.nver);
			                    $('#count_opNvers').show();
			                } else {
			                    $('#count_opNvers').hide();
			                }
			                if (new_elements.even > 0) {
			                    $("#count_opCal").text(new_elements.even);
			                    $('#count_opCal').show();
			                } else {
			                    $('#count_opCal').hide();
			                }

			                //contador en perfiles de cursos
			                if (new_elements.cursosPerfil != undefined && new_elements.cursosPerfil != null) {
			                    for (i = 0; i < new_elements.cursosPerfil.length; i++) {
			                        if (new_elements.cursosPerfil[i].ncursos > 0) {
			                            $("#count_opCur_" + new_elements.cursosPerfil[i].IdPerfilA3).text(new_elements.cursosPerfil[i].ncursos);
			                            $("#count_opCur_" + new_elements.cursosPerfil[i].IdPerfilA3).show();
			                        } else {
			                            $("#count_opCur_" + new_elements.cursosPerfil[i].IdPerfilA3).hide();
			                        }
			                    }
			                }


			            }


			        } else {
			            //falla la conexion			        	
			            //alertNative("Error accediendo al servicio de situación de usuario (WS05), code: " + e.status, null, "Error", "Ok")
			            console.log("Error accediendo al servicio de situación de usuario (WS05), code: " + e.status)
			            if (e.status === 403) {
			                //TOK incorrecto
			                console.log("WS05:TOK incorrecto");
			            } else {
			                console.log("WS05:Error en hasNewElementsa3, statusCode: " + e.status);
			            }
			        }

			    }
			});
		}
		
		
	}
}

function hasNewElements(idOptMenu){
	if(g_hasIconnection){
		var urlJson = getUrlRestService(g_configService, "gnesm", null, false);
		if(urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			if(req.sbean != null){
				req.idapp = g_idApp;
				req.lang = g_locale;
				req.idOptMenu = idOptMenu;
				req.platform = getDevicePlatform();
				$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: hasNewelemResp, dataType: "json",
			              contentType: "application/json"
			            } );	
			}			
		}
	}
}

function hasNewelemResp(resp){
	resp = JSON.parse(resp)
	if (resp != null){		
		if (resp.hasOwnProperty('ErrorCode')){		
			//alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load, "Ok")
		}else{
			//formato resp, String con formato idOptMenu:nelementos
			var opt = resp.split(":")[0];
			var nElements = resp.split(":")[1];
			if (nElements > 0){
				//alert("pinta burbuja en " + opt + "con " + nElements)				
				$("#count_" + opt).text(nElements);
				$('#count_' + opt).show();
			}
		}
	}
	
}

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar las últimas versiones";

	

function loadLastNvers(){
    console.log("entramos en loadLastNvers");
	var sbean = getSessionBean();
	var idmobile = "";
	if (sbean != null){
	    idmobile = sbean.IdMobileA3;
	}
	var nversData = null;
	var lastVersion = window.localStorage.getItem("nversDataVersion");
	if (lastVersion == null){
		lastVersion = 0;
    }
    var resp;
    console.log("entramos en loadLastNvers, lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: true, type: "GET", data: "F=WS11&V=" + lastVersion + "&I=" + idmobile,
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error accediendo a listado de nuevas versiones (WS11), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    if (resp.Contenido == null) {
                        console.log("loadLastNvers - con la ultima version");
                        //ya dispone de la última version, no se pinta
                        nversData = window.localStorage.getItem("nversData");
                        if (nversData != null) {
                            nversData = JSON.parse(nversData);
                        }
                    } else {
                        //hay version nueva, se pinta
                        nversData = resp.Contenido;
                        console.log("loadLastNvers - nueva version: " + nversData.version);
                        //guardamos el contenido y la version
                        window.localStorage.setItem("nversData", JSON.stringify(nversData));
                        window.localStorage.setItem("nversDataVersion", nversData.version);
                    }
                }

            } else {
                //falla la conexion, mostramos el ultimo guardado
                nversData = window.localStorage.getItem("nversData");
                if (nversData != null) {
                    nversData = JSON.parse(nversData);
                }
                if (hasIconnection()) {
                    alertNative("Error accediendo a listado de nuevas versiones (WS11), statusCode: " + e.status, null, "Error", "Ok")
                }
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS11:TOK incorrecto");
                } else {
                    console.log("WS11:Error en loadLastNvers, statusCode: " + e.status);
                }
            }
            var liData = "<li class='ui-disabled'><h1>No hay registros</h1></li>";
            if (nversData != null && nversData.ver.length > 0) {
                loadedNvers = true;
                liData = "";
                for (i = 0; i < nversData.ver.length; i++) {
                    nvers = nversData.ver[i];
                    href = 'externalPage.html?htmlBack=newVersList.html&url2load=' + nvers.Enlace + '&titmenu=' + nvers.Titular;

                    liData += "<li><a data-transition='slide'  href='" + href + "' >" +
		    		"<div class='title-news'>" + nvers.Titular + "</div>" +
		    				"<p class='date-news'> Versión: " + nvers.Ver + "</p></a></li>";
                }

            }
            $('#nversList').html(liData)
            $('#nversList').listview("refresh");

            $.mobile.loading('hide');
        }
    });
}

$("#btnAddEvent").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var startDate = new Date("2013-05-20 10:00 PM")
    var endDate = new Date("2013-05-20 11:00 PM")
    var title = "Evento de prueba";
    var location = "C/ Jalance, Valencia";
    var notes = "notas";
    addEventToCalendarDevice(title,location,notes,startDate,endDate);
    
    return false;
});



var tit_loading = "Cargando listado...";
var tit_loading_new = "Cargando noticia...";
var tit_error_load = "Erro al cargar los RSS";
	
var tit_loading_news = "Cargando noticias...";

function loadActiveRss(){	
	$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_resourceService, "arss", null, false);
	
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idapp = g_idApp;
		req.lang = g_locale
		
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadRssListResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}	
}

var rssList = null;
function loadRssListResp(resp){	
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp == null){
		$('#rssList').html("<li class='ui-disabled'><h1>No hay registros</h1></li>");
   	 	$('#rssList').listview("refresh");
	}else{
		if (resp.hasOwnProperty('ErrorCode')){		
			alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load, "Ok")
		}else{
			loadedRss = true;
			rssList = resp;
			//cargamos los rss		
			var lis = "";
			var stit;
			for(i=0;i<rssList.length;i++){
				var rss = rssList[i];
				stit = rss.subtitle
				if(stit == null){
					stit = "";
				}
	lis += "<li data-icon='event' data-theme='b' id='rss" + i + "'><a class='show-page-loading-msg' data-msgtext='" + rss.iditem + "'  data-msgembed='" + rss.ShowEmbedded + "' href='#rssPage' >" +
			    		"<img src='data:image/png;base64," + rss.srcimg + "'><div class='title-news'>" + rss.title + "</div><p class='author-news'>" + stit + "</p></a> </li>"		    
		  }
			
			$('#rssList').html(lis)
	   	 	$('#rssList').listview("refresh");

	   	 	$(document).on("click", ".show-page-loading-msg", function () {
	   	 	    var $this = $(this),
			        msgText = $this.jqmData("msgtext");

	   	 	    if (hasIconnection("Noticias")) {
	   	 	        $.mobile.loading('show', { text: tit_loading_news, textVisible: true, theme: 'b' });
	   	 	        loadRss(msgText, $this.jqmData("msgembed"));

	   	 	        //pagin de noticias
	   	 	        $.mobile.loading('hide');
	   	 	        //$.mobile.changePage("#rssPage", { transition: "slide" });
                }

	   	 	});	
			
		}
	}
}




function loadRss(id, showembed){	
	for(i=0;i<rssList.length;i++){
		var rss = rssList[i];
		if (rss.iditem == id){
			$('#titrss').text(rss.title)
	    	getOnlineFeed(rss.url, 'articleList', true, 40, showembed);	    	   	
			break;
		}
	}
}

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar los avisos";

	

function loadLastNotices(){
    console.log("entramos en loadLastNotices");
	var sbean = getSessionBean();
	var idmobile = "";
	if (sbean != null){
	    idmobile = sbean.IdMobileA3;
	}
	var avisosData = null;
	var lastVersion = window.localStorage.getItem("avisosDataVersion");
	if (lastVersion == null){
		lastVersion = 0;
    }
    var resp;
    console.log("entramos en loadLastNotices, lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: true, type: "GET", data: "F=WS10&V=" + lastVersion + "&I=" + idmobile,
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error accediendo a listado de comunicados (WS10), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    if (resp.Contenido == null) {
                        console.log("loadLastNotices - con la ultima version");
                        //ya dispone de la última version, no se pinta
                        avisosData = window.localStorage.getItem("avisosData");
                        if (avisosData != null) {
                            avisosData = JSON.parse(avisosData);
                        }
                    } else {
                        //hay version nueva, se pinta
                        avisosData = resp.Contenido;
                        console.log("loadLastNotices - nueva version: " + avisosData.version);
                        //guardamos el contenido y la version
                        window.localStorage.setItem("avisosData", JSON.stringify(avisosData));
                        window.localStorage.setItem("avisosDataVersion", avisosData.version);
                    }
                }

            } else {
                //falla la conexion, mostramos el ultimo guardado
                avisosData = window.localStorage.getItem("avisosData");
                if (avisosData != null) {
                    avisosData = JSON.parse(avisosData);
                }
                if (hasIconnection()) {
                    alertNative("Error accediendo a listado de comunicados (WS10), statusCode: " + e.status, null, "Error", "Ok")
                }
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS10:TOK incorrecto");
                } else {
                    console.log("WS10:Error en loadLastNotices, statusCode: " + e.status);
                }
            }
            var liData = "<li class='ui-disabled'><h1>No hay registros</h1></li>";
            if (avisosData != null && avisosData.com.length > 0) {
                loadedAvisos = true;
                liData = "";
                for (i = 0; i < avisosData.com.length; i++) {
                    comunic = avisosData.com[i];
                    href = 'externalPage.html?htmlBack=avisosList.html&url2load=' + comunic.Enlace + '&titmenu=' + comunic.Titular;

                    liData += "<li><a data-transition='slide'  href='" + href + "' >" +
		    		"<div class='title-news'>" + comunic.Titular + "</div>" +
		    				"<p class='date-news'>" + new Date(comunic.Fecha).format("dd/mm/yyyy") + "</p></a></li>";
                }

            }
            $('#avisosList').html(liData)
            $('#avisosList').listview("refresh");

            $.mobile.loading('hide');
        }
    });
}

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar la información";
var tit_loading_content = "Cargando contenido...";
var tit_err_load_content = "Error al cargar el contenido";

var tit_donwloading = "Guardando documento...";

var tit_donwload_ok = "Documento descargado";
var tit_donwload_err = "Error en la descarga";
var msg_donwload_ok = "Se ha guardado en: ";
var msg_donwload_err = "Código de error: ";

var tit_err_mark_fav = "Error al marcar favorito";
var tit_error_loadfav = "Error al cargar los favoritos";

var RTYPE_VIDEO = 2;
var RTYPE_IMAGE = 3;
var RTYPE_DOC = 4;
var RTYPE_HTML = 5;
var RTYPE_ARTICE = 6;
	
	
var favList;
function getMyFavourites(){	
	$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_resourceService, "gmyfavs", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: function getFavsResp(resp){
			resp = JSON.parse(resp)
			if (resp.hasOwnProperty('ErrorCode')){		
				alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_loadfav, "Ok");				
			}else{
				favList = resp;				
			}
			loadActiveResources();
		}, dataType: "json", contentType: "application/json"} );	
	}else{
		$.mobile.loading('hide');
	}	
}

function isInFavs(idresource){	
	for(j=0;j<favList.length;j++){
		if(idresource == favList[j]){
			return true;
		}
	}
	return false;
}

function addToFavs(idresource){	
	favList[favList.length] = idresource;
}

function removeFromFavs(idresource){
	newFavList = new Array();
	idx = 0;
	for(j=0;j<favList.length;j++){
		if(idresource != favList[j]){
			newFavList[idx] = favList[j]
			idx++;
		}
	}
	favList = newFavList;
}

function loadActiveResources() {
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
	var urlJson = getUrlRestService(g_resourceService, "aresources", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idapp = g_idApp;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadResListResp, dataType: "json",
	              contentType: "application/json"
	            } );
	} else {
	    $.mobile.loading('hide');
	}	
}

var resList = null;
function loadResListResp(resp){	
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp == null){
		$('#resList').html("<li class='ui-disabled'><h1>No hay registros</h1></li>");
   	 	$('#resList').listview("refresh");
	}else{
		if (resp.hasOwnProperty('ErrorCode')){		
			alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load, "Ok")
		}else{
			loadedRes = true;
			resList = resp;
			//cargamos los res		
			var lis = "";
			var lisFavs = "";
			var stit;
			for(i=0;i<resList.length;i++){
				res = resList[i];
				href = '';
				stit = res.subtitle
				if(stit == null){
					stit = "";
				}			
				if(!res.showembedded){
					href = '#';
				}else{
					if(res.idrtype == RTYPE_ARTICE){
						href = "#contPage";
					}else if(res.idrtype == RTYPE_IMAGE){
						href = "#imagePage";
					}else{
						href = "#iframePage";
					}
				}
					
			    
//			    if(isInFavs(res.iditem)){
//			    	lisFavs += "<li id='lifav_"+res.iditem+"'><a data-transition='slide' onclick='loadResource("+ res.iditem +")' href='"+ href +"' >" +
//		    		"<img src='data:image/png;base64," + res.srcimg + "'><div class='title-news'>" + res.title + "</div>" +
//		    				"<p class='author-news'>" + stit + "</p><p class='date-news' >" + new Date(res.regdate).format("dd/mm/yyyy") + "</p></a>" +
//		    						"<a href='#' data-icon='event' data-theme='b' onclick='openOpts(" + res.cancheckfav + "," + res.canshare + ",\"" + res.title + "\"," + res.iditem + ")'></a></li>";
//			    }
			    
			    lis += "<li id='li_"+res.iditem+"'><a data-transition='slide' onclick='loadResource("+ res.iditem +")' href='"+ href +"' >" +
	    		"<img src='data:image/png;base64," + res.srcimg + "'><div class='title-news'>" + res.title + "</div>" +
	    				"<p class='author-news'>" + stit + "</p><p  class='date-news' >" + new Date(res.regdate).format("dd/mm/yyyy") + "</p></a>" +
	    						"<!--a href='#' data-icon='event' data-theme='b' onclick='openOpts("+res.cancheckfav + "," + res.canshare +",\""+ res.title +"\","+res.iditem+")'></a--!></li>";
		  }
			$('#resList').html(lis)
	   	 	$('#resList').listview("refresh");
			
//			if(lisFavs == ''){
//				lisFavs = "<li class='ui-disabled'><h1>Sin favoritos</h1></li>"
//			}
//			$('#favResList').html(lisFavs)
//	   	 	$('#favResList').listview("refresh");
		}
	}
}

var title2share = '';
var idresOpened = '';
var isfavOpened;
function openOpts(canCheckFav, canShare, title, idres){
	isfavOpened = isInFavs(idres);
	idresOpened = idres;
	if(!canCheckFav){
		$("#divFav").hide();
	}else{
		$("#divFav").show();
	}
	if(!canShare){
		$("#divShare").hide();
	}else{
        title2share = title;
        if (getDevicePlatform() != 'iOS') {
            $("#divShare").show();
        }		
		if(isfavOpened){			
			$("#imgFav").attr("src", "../myimg/fav.png")
			$("#btnFav").text("Quitar favorito");
		}else{
			$("#imgFav").attr("src","../myimg/fav_dis.png")
			$("#btnFav").text("Marcar como favorito");
		}
	}
	$( "#optsPopUp" ).popup( "open", {transition: 'pop', positionTo: 'window'} );
}

$("#btnShare").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var urlJson = getUrlRestService(g_resourceService, "rdata", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idresource = idresOpened;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: function doShare(resp){
			resp = JSON.parse(resp)
			if (resp.hasOwnProperty('ErrorCode')){		
				alertNative(eval('g_err_'+resp.ErrorCode), null, tit_err_load_content, "Ok")
			}else{
				share(title2share, resp.content);	
			}
		}, dataType: "json",
	              contentType: "application/json"
	            } );	
	}
    
    });

var resourceLoaded = false;
function loadResource(id){		
	var urlJson = getUrlRestService(g_resourceService, "rdata", null, false);
	if(urlJson != null){
		resourceLoaded = false;
		var req = new Object()
		req.sbean = getSessionBean();
		req.idresource = id;
		req.lang = g_locale;
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadContentResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}
}

function loadContentResp(resp){	
	resourceLoaded = true;
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_err_load_content, "Ok")
	}else{
		
		if(resp.idrtype == RTYPE_ARTICE){
			$('#regdate').html(new Date(resp.regdate).format("dd/mm/yyyy"));
			$('#titRes').html(resp.title);
			$('#title').html(resp.title);
			$('#stitle').html(resp.subtitle);
			$('#contentText').html(resp.content);
		}else if(resp.idrtype == RTYPE_IMAGE){
			$('#m_regdate').html(new Date(resp.regdate).format("dd/mm/yyyy"));
			$('#m_titRes').html(resp.title);
			$('#m_title').html(resp.title);
			$('#m_stitle').html(resp.subtitle);
		
			showImgLoading();
			$('#m_img').attr('src', resp.content);
			$('#m_img').attr('alt', resp.title);	
			$('#m_imgrc').attr('href', resp.content);
			$('#m_img').show();
		
			if(resp.showdesc){				
				$('#m_description').html(resp.description);
			}else{
				$('#m_description').html("");
			}
		}else{			
			if(!resp.showembedded){
				//location.href = resp.content;
			    var ref = window.open(resp.content, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
			}else{
				$('#titIframe').html(resp.title);
				showIframeLoading();
				if(resp.idrtype == RTYPE_DOC){
					$('#btnSaveDoc').show();
					urlDoc = encodeURI(decodeURI(resp.content))
					$('#contentFrame').attr('src', 'http://docs.google.com/viewer?url=' + urlDoc + '&embedded=true');
				}else{
					$('#contentFrame').attr('src', resp.content);	
				}
				
				if(resp.showdesc || resp.idrtype == RTYPE_DOC){
					$('#infoTit').html(resp.title);
					$('#infoDesc').html(resp.description);
					$('#btnMoreInfo').show();
				}else{
					$('#btnMoreInfo').hide();
					$('#infoTit').html("");
					$('#infoDesc').html("");
				}
			}
		}
	}
}

//https://gist.github.com/nathanpc/2464060
var urlDoc;
function downloadFile(){	
	if(isFromDesktop()){
		alert("FunciÓn no disponible desde PC")
	}else{
		$('#descrip').popup('close')
		$.mobile.loading( 'show', {text: tit_donwloading,textVisible: true,theme: 'b'});
    window.requestFileSystem(
                 LocalFileSystem.PERSISTENT, 0, 
                 function onFileSystemSuccess(fileSystem) {
                 fileSystem.root.getFile(
                             "dummy.html", {create: true, exclusive: false}, 
                             function gotFileEntry(fileEntry){
                             var sPath = fileEntry.fullPath.replace("dummy.html","");
                             var fileTransfer = new FileTransfer();
                             fileEntry.remove();

                             fileTransfer.download(
                            		 urlDoc,
                                       sPath + decodeURI(urlDoc.substring(urlDoc.lastIndexOf('/')+1)),
                                       function(theFile) {
                                       console.log("download complete: " + theFile.toURI());
                                       showLink(theFile.toURI());
                                       },
                                       function(error) {
                                       console.log("download error source " + error.source);
                                       console.log("download error target " + error.target);
                                       console.log("upload error code: " + error.code);
                                       alertNative(msg_donwload_err + error.code, null, tit_donwload_err, "Ok")
                                       }
                                       );
                             }, 
                             fail);
                 }, 
                 fail);
    
	}
	
}

function showLink(url){
	$.mobile.loading('hide');
    alertNative(msg_donwload_ok + url, null, tit_donwload_ok, "Ok")
}


function fail(evt) {
	$.mobile.loading('hide');
	alertNative(msg_donwload_err + evt.target.error.code, null, tit_donwload_err, "Ok")
    console.log(evt.target.error.code);
}

$("#btnFav").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    servOp = "mfav";
    if (isfavOpened) {
        servOp = "umfav";
    }
    var urlJson = getUrlRestService(g_resourceService, servOp, null, false);
    if (urlJson != null) {

        var req = new Object()
        req.sbean = getSessionBean();
        req.idresource = idresOpened;
        $.ajax({ url: urlJson, type: "POST", data: JSON.stringify(req), success: function markFav(resp) {
            resp = JSON.parse(resp)
            if (resp.hasOwnProperty('ErrorCode')) {
                alertNative(eval('g_err_' + resp.ErrorCode), null, tit_err_mark_fav, "Ok")
            } else {
                if (isfavOpened) {
                    //se borra	
                    $("#imgFav").attr("src", "../myimg/fav_dis.png")
                    $("#btnFav").text("Marcar como favorito");
                    $("#favResList li").each(function (idx, li) {
                        if ($(li).attr("id") == 'lifav_' + idresOpened) {
                            $(li).remove();
                        }
                    });
                    removeFromFavs(idresOpened);
                } else {
                    addToFavs(idresOpened);
                    //copiarlo en el listado de favoritos
                    $("#imgFav").attr("src", "../myimg/fav.png")
                    $("#btnFav").text("Quitar favorito");
                    //$('#li_'+idresOpened).clone().appendTo('#favResList');
                    liCopied = $('#li_' + idresOpened).clone();
                    idlif = liCopied.attr("id");
                    liCopied.attr("id", "lifav_" + idlif.substring(idlif.lastIndexOf('_') + 1));
                    if ($('#favResList').html().indexOf("Sin favoritos") != -1) {
                        $('#favResList').html(liCopied);
                    } else {
                        $('#favResList').append(liCopied);
                    }
                    
                }
                $('#favResList').listview("refresh");
                //cerramos el popup
                $("#optsPopUp").popup("close");
            }
        }, dataType: "json",
            contentType: "application/json"
        });
    }

});

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar listado de aplicaciones";
var tit_loading_mapp = "Cargando datos de la aplicación...";
var tit_error_load_mapp = "Error al cargar la aplicación seleccionada";


function loadActiveMapps(){
	$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_mAppService, "amapps", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idapp = g_idApp;
		req.lang = g_locale;
		req.platform = getDevicePlatform();		
		
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadActiveMappsResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}
}


function loadActiveMappsResp(resp){	
	$.mobile.loading('hide');	
	resp = JSON.parse(resp)
	if (resp == null){
		$('#mAppList').html("<li class='ui-disabled'><h1>No hay registros</h1></li>");
   	 	$('#mAppList').listview("refresh");
	}else{
		if (resp.hasOwnProperty('ErrorCode')){		
			alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load, "Ok")
		}else{
			loadedApps = true;
			appsList = resp;				
			var lis = "";
			for(i=0;i<appsList.length;i++){
				var mapp = appsList[i];
			
				lis += "<li data-iconshadow='false' data-icon='event' data-theme='b'><a data-transition='slide' onclick='mApp2load = "+ mapp.iditem +"' href='#mAppPage' >" +
	    		"<h1>" + mapp.title + "</h1></a></li>";			
			    		    
			}
					
			$('#mAppList').html(lis);
	   	 	$('#mAppList').listview("refresh");
		}
	}
	
}

var mApp2load;
function loadMapp(id){	
	//cargamos los datos de la aplicacion
	$.mobile.loading( 'show', {text: tit_loading_mapp,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_mAppService, "mapdata", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idmobileapp = id;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadmAppDataResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}	
}


function loadmAppDataResp(resp){	
	resp = JSON.parse(resp)
	$.mobile.loading('hide');
	if (resp.hasOwnProperty('ErrorCode')){
		
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_mapp, "Ok")
	}else{
		$('#titmApp').html(resp.title);
		$('#descMapp').html(resp.description);
		if(getDevicePlatform() == 'iOS'){
			$("#linkApp").attr("href", resp.urlappstore);
		}else{
			$("#linkApp").attr("href", resp.urlgoogleplay);
		}
	}
}



var listEntries = function(json) {
  if (!json.responseData.feed.entries){	  
	  return false;
	  }
  $('#widgetTitle').text(json.responseData.feed.title);
  var articleLength =json.responseData.feed.entries.length;  
  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
  var lis = ""
  for (var i = 1; i <= articleLength ; i++) {	
	  var entry = json.responseData.feed.entries[i-1];	  
	    lis += "<li id='list" + i + "'><a data-transition='slide' href='#article" + i + "' id='link" + i + "'>" +
	    		"<h1>"+ entry.title +"</h1><p>"+entry.author+"</p><p >"+new Date(entry.publishedDate).format("dd/mm/yyyy")+"</p></a></li>"
	    $('#articleHeader' + i).text(entry.title);
	    $('#articleHead' + i).text(entry.title);
	    $('#openButton' + i).attr('href', entry.link);
	    $('#articleContent' + i).append(entry.content);
  }
  $('#' + idArticleList ).html(lis)
  $('#' + idArticleList ).listview("refresh");
  
//  $('#article1 .prevButton').remove();
//  $('#article' + articleLength + ' .nextButton').remove();
  if (articleLength < maxLength) {
    for (i = articleLength + 1; i <= maxLength; i++) {
      $('#list' + i).remove();
      $('#article' + i).remove();
    }
  }
};

function openLink(url, title) {
    if (hasIconnection("Rss")) {
        //$('#articleFrame').attr('src', url);
        $('#contentPAge').html('<div style="overflow:auto;-webkit-overflow-scrolling:touch" width="100%" height="100%"><iframe onload="frameloaded()" id="articleFrame" src="' + url + '" width="100%" height="100%" frameborder="0" seamless></iframe></div>');
        $('#titnew').text(title)
    }
}


function openLinkNoEmbedded(url, title) {
    if (hasIconnection("Rss")) {
        window.open(url, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    }
}


var listEntriesInside = function (json) {
    if (!json.responseData.feed.entries) {
        return false;
    }

    var articleLength = json.responseData.feed.entries.length;
    var lis = "";
    for (var i = 1; i <= articleLength; i++) {
        var entry = json.responseData.feed.entries[i - 1];
        if (showEmbedded) {
            lis += "<li data-icon='event' data-theme='b'  id='list" + i + "'><a onclick='openLink(\"" + entry.link + "\", \"" + entry.title + "\")' data-transition='slide' href='#articlePage' id='link" + i + "'>" +
		    		"<div class='title-news'>" + entry.title + "</div><p  class='author-news'>" + entry.author + "</p><p class='date-news'>" + new Date(entry.publishedDate).format("dd/mm/yyyy") + "</p></a></li>"
        } else {
            lis += "<li data-icon='event' data-theme='b' id='list" + i + "'><a onclick='openLinkNoEmbedded(\"" + entry.link + "\", \"" + entry.title + "\")' href='#' id='link" + i + "'>" +
		    		"<div class='title-news'>" + entry.title + "</div><p class='author-news'>" + entry.author + "</p><p class='date-news'>" + new Date(entry.publishedDate).format("dd/mm/yyyy") + "</p></a></li>"
        }
        

    }
    $('#' + idArticleList).html(lis)
    $('#' + idArticleList).listview("refresh");

};

var idArticleList = '';
var showEmbedded = true;
var getOnlineFeed = function (url, idArtList, insideApp, numNews, showembed) {
    idArticleList = idArtList;
    showEmbedded = showembed;
    var callback = "listEntries";
    var maxLengthStr = "&num=" + numNews;
    if (insideApp) {
        callback = "listEntriesInside";
    } else {
        maxLengthStr = "&num=" + maxLength;
    }
    var script = document.createElement('script');
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=' + callback + '&hl=es&output=json-in-script&q='
                      + encodeURIComponent(url)
                      + '&v=1.0' + maxLengthStr + '&scoring=h');
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
};
var getOfflineFeed = function(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
};

var div_info_pending_mail = "Se envió un email a tu dirección para confirmarla. Hasta entonces no se puede activar tu cuenta.";
var div_info_pending_activate = "Cuenta pendiente de activación. Hasta entonces sólo puedes modificar la información de perfiles.";
var div_info_desactivated = "Cuenta desactivada.";


var tit_loading = "Cargando datos...";
var tit_error_load = "Error cargando los datos";

var tit_update_client_ok = "Datos modificados";
var msg_update_client_ok = "Los datos han sido guardados correctamente";
var err_update = "No se ha podido guardar los datos";

var tit_saving = "Guardando...";
var tit_error_save = "Error al guardar";
var tit_create_client_ok = "Cuenta creada";
var msg_create_client_ok = "Se ha enviado un email a tu dirección de correo electrónico. Comprueba que no haya ido directamente a la carpeta de 'Spam'";

var tit_sending = "Enviando...";
var err_recpwd_1 = "No hay ningún usuario registrado con esa dirección de email";
var err_recpwd_2 = "El usuario con esa dirección de email está desactivado";
var err_recpwd_3 = "No se ha podido enviar el email para regenerar contraseña";
var tit_error_sending = "Error";
var msg_recov_email_sent = "Se ha enviado un email a tu dirección de correo electrónico. Comprueba que no haya ido directamente a la carpeta de 'Spam'";
var tit_recovery_pwd_ok = "Envío correcto";

var msg_chgpwd_ok = "Contraseña modificada correctamente";
var msg_chgpwd_error = "No se ha podido modificar. Compruebe que su contraseña actual es correcta.";
var tit_chgpwd = "Cambio de contraseña";
	
var err_crea_clie_1 = "Cuenta no creada. Nombre de usuario ya registrado en el sistema.";
var err_crea_clie_2 = "Cuenta no creada. Email ya registrado en el sistema.";
var err_crea_clie_3 = "Cuenta no creada. No se ha podido enviar email de confirmacióna tu cuenta de correo electrónico.";
var err_crea_clie_4 = "Cuenta no creada. No se ha podido registrar el usuario en la base de datos a3.";

var err_99 = "Error en servidor.";
var err_88 = "Sesión de usuario incorrecta.";

var tit_loging = "Accediendo..."

var tit_error_login = "Error en el login"
var err_login_clie_1 = "Usuario o contraseña incorrectos";
var err_login_clie_2 = "Usuario dado de baja";
var err_login_clie_3 = "Tienes pendiente confirmar la dirección de email para que se te pueda activar";
var err_login_clie_4 = "La cuenta está pendiente de activar por los administadores del sistema. Hasta entonces, algunos servicios permanecerán deshabilitados.";

var tit_reg_data = "Información de registro";

var validatorRegForm;

function showDivInfo(message){
	$('#liMessage').show();
	$('#divMessage').html(message);
}
function hideDivInfo(){
	$('#liMessage').hide();
}

$("#btnLogin").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    $( "#loginForm" ).submit();	        
    return false;
    });


    $("#loginForm").validate({
        errorPlacement: function (error, element) {
            if ($(error).text() != '') {
                error.insertAfter(element.parent());
                element.css("box-shadow", "0 0 12px red");
            }
        },
        success: function (label) {
            element = '#' + label.attr('for');
            $(element).css("box-shadow", "");
        },
        messages: {
            l_username: "Obligatorio",
            l_pwd: "Obligatorio"
        },
        submitHandler: function (form) {
 if (validatorRegForm != null) {
                validatorRegForm.resetForm(); //remove error class on name elements and clear history
                validatorRegForm.reset(); //remove all error and success data                
                $("label.error").remove();
                $("input.error").removeClass('error');
                $("#lipwd").hide();
            }
            //para que en iphone no se baje el header al esconderse el teclado
            if (getDevicePlatform() == 'iOS') {
                $.mobile.silentScroll($('div[data-role="header"]').offset().top);
            }
            console.log("login desde form");
            $.mobile.loading('show', { text: tit_loging, textVisible: true, theme: 'b' });
            var urlJson = getUrlRestService(g_configService, "login", null, false);
            if (urlJson != null) {
                var req = new Object()
                req.pkey = g_publicKey;
                req.idapp = g_idApp;
                req.username = $("#l_username").val();
                req.pwd = $("#l_pwd").val();
                $.ajax({ url: urlJson, type: "POST",
                    data: JSON.stringify(req),
                    success: respLogin,
                    dataType: "json",
                    contentType: "application/json"
                });
            } else {
                $.mobile.loading('hide');
            }

        }
    });

var regA3User = false;
function respLogin(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp);
	if (resp.hasOwnProperty('ErrorCode')){
		if(resp.ErrorCode == '99' || resp.ErrorCode == '88'){
			alertNative(eval('err_'+resp.ErrorCode), null, tit_error_login, "Ok");
		}else{
			alertNative(eval('err_login_clie_'+resp.ErrorCode), null, tit_error_login, "Ok");
		}
    }else if (resp.hasOwnProperty('pwdciph')) {
        //son las credenciales de a3, redirigimos al formulario de registro, pues es la primera vez                
        $("#name").val(resp.name);
        $("#email").val(resp.email);
        $("#username").val(resp.username);
        $("#pwd").val($("#l_pwd").val());
        regA3User = true;
        $.mobile.changePage("#regPage", { transition: "slide", changeHash: false });
        
    }else{
		var ldata = new LoginData(resp.Idclient, $("#l_username").val(), $("#l_pwd").val());
		window.localStorage.setItem("loginData", JSON.stringify(ldata));
		saveSessionBean(resp);
		//registramos el dispositivo
		var urlJson = getUrlRestService(g_configService, "regdevice", null, false);
		if(urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			req.deviceSO = getDevicePlatform();
	    	req.deviceSOversion = getDevicePlatformVersion();
			$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), dataType: "json",
		              contentType: "application/json"
		            } );	
		}
		//cargamos el menu
		getDynamicMenu(true);		
		//llamamos a los servicios de a3 para registrar el acceso
		regAccesA3();
		//redirigimos a los datos del usuario
		//changeHash false para que no pueda volver a la pantalla de login
		$.mobile.changePage( "#regPage", { transition: "slide", changeHash : false} );
	}
}

$("#opReg").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    if (hasIconnection(tit_reg_data)){
    	if (!isRegistered()){
 		   $.mobile.changePage( "#loginPage", { transition: "slide"} );
 	   }else{
 		   $.mobile.changePage( "#regPage", { transition: "slide"} );
 	   }
    }	   
});



$("#btnLinka3").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $("#linka3form").submit();
    return false;
});

$("#linka3form").validate({
    errorPlacement: function (error, element) {
        element.css("box-shadow", "0 0 12px red");
    },
    submitHandler: function (form) {
        var req = new Object()
        req.sbean = getSessionBean();
        req.idapp = g_idApp;
        req.usernamea3 = $("#usernamea3").val();
        req.pwda3 = $("#pwda3").val();

        var urlJson = getUrlRestService(g_configService, "linka3user", null, false);
        if (urlJson != null) {
            $.mobile.loading('show', { text: tit_saving, textVisible: true, theme: 'b' });
            $.ajax({ url: urlJson, type: "POST",
                data: JSON.stringify(req),
                success: savedLink,
                dataType: "json",
                contentType: "application/json"
            });
        }

    }
});

function savedLink(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp);
	if (!resp){	    
		alertNative("Se ha producido un error al vincular el usuario. Compruebe las caredenciales introducidas.", null, "Error", "Ok");
    } else {
        alertNative("Usuario a3 vinculado correctamente.", null, "Vinculación correcta", "Ok");
        var sbean = getSessionBean();
        sbean.A3userlinked = true;
        saveSessionBean(sbean);
        $('#liLinkA3user').hide();
    }
}


$("#btnSave").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	$( "#regForm" ).submit();	        
	return false;
	});

	var validatorRegForm = $("#regForm").validate({
	    errorPlacement: function (error, element) {
	        if ($(error).text() != '') {
	            error.insertAfter(element.parent());	            	            
	        }
	    },
	    success: function (label) {
	        element = '#' + label.attr('for');	        
	    },
	    messages: {
	        name: "Obligatorio",
	        surname: "Obligatorio",
	        username: "Obligatorio",
	        pwd: "Obligatorio",
	        chkAcceptEula: "Obligatorio",
	        email: {
	            required: "Obligatorio",
	            email: "No valido"
	        }
	    },
	    submitHandler: function (form) {
	        var cliBean = new clientBean(g_publicKey, $("#name").val())
	        cliBean.Email = $("#email").val();
	        cliBean.Password = $("#pwd").val();
	        cliBean.Username = $("#username").val();
	        cliBean.Surname = $("#surname").val();
	        var req = new Object()
	        req.cliBean = cliBean;
	        req.deviceSO = getDevicePlatform();
	        req.deviceSOversion = getDevicePlatformVersion();
	        var selProfiles = new Array();
	        $('input[type=checkbox]').each(function () {
	            if (this.checked) {
	                if ($(this).val() != 'on') {
	                    selProfiles.push($(this).val())
	                }
	            }
	        });
	        if (selProfiles.length == 0 && sbean == null) {
	            alertNative("Debes seleccionar como mínimo un perfil", null, "Seleccione perfil", "Ok");
	        } else {
	            req.appProfiles = selProfiles;
	            req.idapp = g_idApp;
	            req.resenEmail = false;
	            if (sbean != null) {
	                cliBean.Idclient = sbean.Idclient;
	                cliBean.PublicKey = sbean.ClientKey;
	                if (sbean.ClientState == CLIENT_STATE_EMAIL_PENDING) {
	                    req.resenEmail = true;
	                }
	            }
	            var urlJson = getUrlRestService(g_configService, "sclient", null, false);
	            if (urlJson != null) {
	                $.mobile.loading('show', { text: tit_saving, textVisible: true, theme: 'b' });
	                $.ajax({ url: urlJson, type: "POST",
	                    data: JSON.stringify(req),
	                    success: savedClie,
	                    dataType: "json",
	                    contentType: "application/json"
	                });
	            }
	        }
	    }
	});
			
function savedClie(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp);
	if (resp.hasOwnProperty('ErrorCode')) {
	    console.log("error crear cliente: " + resp.ErrorCode)
		if(resp.ErrorCode == '99' || resp.ErrorCode == '88'){
			alertNative(eval('err_'+resp.ErrorCode), null, tit_error_save, "Ok");
		}else{
			alertNative(eval('err_crea_clie_'+resp.ErrorCode), null, tit_error_save, "Ok");
		}
		
	}else{		
		if(sbean != null){
			//mod de datos
			if (resp == 0){
				//volvemos cargar los datos que habia
				loadClientData()
				alertNative(err_update, null, tit_error_save, "Ok");
				//recargamos el menu dinamico, pues puede que haya cambiado algun perfil
				getDynamicMenu(true);
			}else if(sbean.ClientState == CLIENT_STATE_EMAIL_PENDING || resp == 2){
				alertNative(msg_create_client_ok, null, tit_update_client_ok, "Ok")
				if(sbean.ClientState != CLIENT_STATE_EMAIL_PENDING){
					loadRegPage();
				}
			}else{
				alertNative(msg_update_client_ok, null, tit_update_client_ok, "Ok")
				//recargamos el menu dinamico, pues puede que haya cambiado algun perfil
				getDynamicMenu(true);
			}			
		}else{
			//nuevo user
			alertNative(msg_create_client_ok, null, tit_create_client_ok, "Ok")
			//almacenar en datos del telefono el id
			var ldata = new LoginData(resp, $("#username").val(), $("#pwd").val());
			window.localStorage.setItem("loginData", JSON.stringify(ldata));
			//recargar pagina de registro
            //comentado porque no va bien en iphone
			//$.mobile.changePage( "#regPage", { transition: "fade", changeHash : false, allowSamePageTransition:true} );
			location.href = "config.html#regPage";
			//loadRegPage();	
		}		
	}
	
}

function loadClientData(){
	var urlJson = getUrlRestService(g_configService, "clientdata", null, false);
	if(urlJson != null){
		$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
		var req = new Object()
		req.sbean = getSessionBean();
		$.ajax({url:urlJson, type: "POST", 
	              data: JSON.stringify(req), 
	              success: loadCliDataResp,
	              dataType: "json",
	              contentType: "application/json"
	            } );
	}	
}

function loadCliDataResp(resp){
	//console.log("loadCliDataResp");
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('err_'+resp.ErrorCode), null, tit_error_load, "Ok")
	}else{		
		//mostramos los datos
		$("#name").val(resp.Name);
    	$("#email").val(resp.Email);
    	$("#username").val(resp.Username);
    	$("#surname").val(resp.Surname);
        sbean = getSessionBean();
        if (resp.LinkedA3 || sbean.ClientState != CLIENT_STATE_ACTIVE) {
    	    $('#liLinkA3user').hide();
    	} else {        
    	    $('#liLinkA3user').show();
        }
    	
	}
}

function loadClientProfiles(){
	var urlJson = getUrlRestService(g_configService, "clientprofiles", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadClientProfilesResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}	
}

function loadClientProfilesResp(resp){	
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('err_'+resp.ErrorCode), null, tit_error_load, "Ok")
	}else{		
		//cargamos los perfiles		
		for(i=0;i<resp.length;i++){			
			$('#profile_' + resp[i]).attr( "checked", true).checkboxradio( "refresh" );
		}
	}
}

//function loadAppProfiles(){
//	var urlJson = getUrlRestService(g_configService, "aprofiles", [g_idApp, g_locale], true);
//	if (urlJson != null){
//		$.mobile.loading( 'show', {text: 'Cargando...',textVisible: true,theme: 'b'});
//		$.ajax({url:urlJson, success: readAppProfiles} );	
//	}	
//}

function readAppProfiles(profilesStr){
	$.mobile.loading( 'hide' );
	var profList = JSON.parse(profilesStr);		
		var checkHtml = '';
		var idcheckname = '';
		for(i=0;i<profList.length;i++){
			idcheckname = 'profile_'+profList[i].idprofile
			checkHtml += '<input value="' + profList[i].idprofile + '" type="checkbox"  data-theme="b" name="' + idcheckname + '" id="' + idcheckname + '"/>' +
            '<label class="font-normal" for="' + idcheckname + '">' + profList[i].nombre + '</label>'
		}
		$('#fsProfiles').html(checkHtml); 	    		
		$("#fsProfiles").trigger("create");
		
		if(isRegistered()){
			loadClientProfiles();
		}
}

$("#btnInitRecoveryPwd").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    $( "#recPwdForm" ).submit();	        
    return false;
    });

$("#recPwdForm").validate({
    errorPlacement: function (error, element) {
        if ($(error).text() != '') {
            error.insertAfter(element.parent());
            element.css("box-shadow", "0 0 12px red");

        }
    },
    success: function (label) {
        element = '#' + label.attr('for');
        $(element).css("box-shadow", "");
    },
    messages: {
        l_email: {
            required: "Obligatorio",
            email: "No valido"
        }
    },
    
    submitHandler: function( form ) {
    	$.mobile.loading( 'show', {text: tit_sending,textVisible: true,theme: 'b'});
    	
    	var urlJson = getUrlRestService(g_configService, "irpwd", null, true);
		if(urlJson != null){
			var req = new Object()
			req.idapp = g_idApp;
			req.email = $("#l_email").val();
			$.ajax({url:urlJson, 
	              success: respInitRecov, type: "POST", data: JSON.stringify(req), dataType: "json",
		              contentType: "application/json"
		            } );	
		}else{
			$.mobile.loading('hide');
		}
    }
});



function respInitRecov(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){
		if(resp.ErrorCode == '99' || resp.ErrorCode == '88'){
			alertNative(eval('err_'+resp.ErrorCode), null, tit_error_sending, "Ok");
		}else{
			alertNative(eval('err_recpwd_'+resp.ErrorCode), null, tit_error_sending, "Ok");
		}		
	}else{
		alertNative(msg_create_client_ok, null, tit_recovery_pwd_ok, "Ok")
		//redirigimos al login
		$.mobile.changePage( "#loginPage", { transition: "slide", reverse: true} );
	}
}


$("#btnChangePwd").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    $( "#changePwdForm" ).submit();	        
    return false;
    });

$("#changePwdForm").validate({    
    errorPlacement: function (error, element) {
        if ($(error).text() != '') {
            error.insertAfter(element.parent());
            element.css("box-shadow", "0 0 12px red");
            
        }
    },
    success: function (label) {
        element = '#' + label.attr('for');
        $(element).css("box-shadow", "");
    },
    messages: {
        ch_pwd: "Obligatorio",
        ch_npwd: "Obligatorio",        
        ch_npwd2: {
            required: "Obligatorio",
            equalTo: "No coincide"
        }
    },	
    submitHandler: function( form ) {
    	$.mobile.loading( 'show', {text: tit_sending,textVisible: true,theme: 'b'});
    	
    	var urlJson = getUrlRestService(g_configService, "chpwd", null, false);
		if(urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			req.oldpwd = $("#ch_pwd").val();
			req.newpwd = $("#ch_npwd").val();
			$.ajax({url:urlJson, 
	              success: respChangePwd, type: "POST", data: JSON.stringify(req), dataType: "json",
		              contentType: "application/json"
		            } );	
		}else{
			$.mobile.loading('hide');
		}
    }
});



function respChangePwd(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('err_'+resp.ErrorCode), null, tit_chgpwd, "Ok");				
	}else{
		if (resp){
			alertNative(msg_chgpwd_ok, null, tit_chgpwd, "Ok");
			//modificamos el logindata
			var ldata = window.localStorage.getItem("loginData");
			ldata = JSON.parse(ldata);
			ldata.Pwd = $("#ch_npwd").val();
			window.localStorage.setItem("loginData", JSON.stringify(ldata));
			//redirigimos a la pagina de datos
			$.mobile.changePage( "#regPage", { transition: "slide", reverse: true} );	
		}else{
			alertNative(msg_chgpwd_error, null, tit_chgpwd, "Ok");
		}
		
	}
}

$("#chkAcceptEula").click(function(e){
	e.preventDefault();
    e.stopImmediatePropagation();	
	if(!$("#chkAcceptEulaReg").is(":checked")){
		$.mobile.changePage( "#eulaRegPage", { transition: "slide"} );
		$('#chkAcceptEula').attr( "checked", false).checkboxradio( "refresh" );
	}
    return false;
});

function getcontactInfo(){
	console.log("entramos en getcontactInfo");
	var contactInfo = null;
	var lastVersion = window.localStorage.getItem("cDataVersion");
	if (lastVersion == null || lastVersion == undefined){
		lastVersion = 0;
    }
    var resp;
    console.log("entramos en getcontactInfo, lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
	$.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
	    xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
	}, async: true, type: "GET", data: "F=WS03&V=" + lastVersion,
	    complete: function (e, xhr, settings) {
	        if (e.status === 200) {
	            resp = JSON.parse(e.responseText);
	            if (resp.Error.cod != 0) {
	                alertNative("Error accediendo a info de contacto (WS03), code: " + resp.Error.cod, null, "Error", "Ok")
	            } else {
	                if (resp.Contenido == null) {
	                    console.log("getcontactInfo - con la ultima version");
	                    //ya dispone de la última version, no se pinta
	                    contactInfo = window.localStorage.getItem("cData");
	                    if (contactInfo != null) {
	                        contactInfo = JSON.parse(contactInfo);
	                    }
	                } else {
	                    //hay version nueva, se pinta
	                    contactInfo = resp.Contenido;
	                    console.log("getcontactInfo - nueva version: " + contactInfo.version);
	                    //guardamos el contenido y la version
	                    window.localStorage.setItem("cData", JSON.stringify(contactInfo));
	                    window.localStorage.setItem("cDataVersion", contactInfo.version);
	                }
	            }

	        } else {
	            //falla la conexion, mostramos el ultimo guardado
	            contactInfo = window.localStorage.getItem("cData");
	            if (contactInfo != null) {
	                contactInfo = JSON.parse(contactInfo);
	            }
	            if (deviceReady && hasIconnection()) {
	                alertNative("Error accediendo a info de contacto (WS03), statusCode: " + e.status, null, "Error", "Ok")
	            }

	            if (e.status === 403) {
	                //TOK incorrecto
	                console.log("WS03:TOK incorrecto");
	            } else {
	                console.log("WS03:Error en getcontactInfo, statusCode: " + e.status);
	            }
	        }
	        if (contactInfo != null && contactInfo.tels != undefined) {
	            var liData = "";
	            for (i = 0; i < contactInfo.tels.telItem.length; i++) {
	                //Si contiene @ formato mailto
	                if (contactInfo.tels.telItem[i].num.indexOf("@")!= -1) {
	                    liData += "<li data-role='list-divider'>" + contactInfo.tels.telItem[i].name + "</li><li data-theme='b'><a style='padding-left:15px' href='mailto:" + contactInfo.tels.telItem[i].num + "'>" + contactInfo.tels.telItem[i].num + "</a></li>";
	                } else {
	                    liData += "<li data-role='list-divider'>" + contactInfo.tels.telItem[i].name + "</li><li data-theme='b'><a style='padding-left:15px' href='tel:" + contactInfo.tels.telItem[i].num + "'>" + contactInfo.tels.telItem[i].num + "</a></li>";
	                }
	                
	            }
	            for (j = 0; j < contactInfo.tels.officeItem.length; j++) {
	                liData += "<li data-role='list-divider'>" + contactInfo.tels.officeItem[j].name + "</li>" +
	        				"<li data-icon='address' data-theme='b'><a style='padding-left:15px' onclick=\"openMap('" + contactInfo.tels.officeItem[j].gmapsdir + "')\" href='#' data-theme='b'>" +
	        		"<p >" + contactInfo.tels.officeItem[j].dir + "</p></a></li>";
	            }
	            $('#listCinfo').html(liData)
	            $('#listCinfo').listview("refresh");

	            $.mobile.loading('hide');
	        }
	    }
	});		
}


var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar el calendario";


var currentMonth = 0;
var currentYear = 0;

function nextMonth() {
    if (currentMonth == 12) {
        currentMonth = 1;
        currentYear++;
    } else {
        currentMonth++;
    }    
    getEvents();
}

function prevMonth() {
    if (currentMonth == 1) {
        currentMonth = 12;
        currentYear--;
    } else {
        currentMonth--;
    }
    getEvents();
}

function getEvents() {
    if (currentMonth == 0) {
        currentMonth = new Date().getMonth() + 1;
    }
    if (currentYear == 0) {
        currentYear = new Date().getFullYear();
    }

    $('#titMonth').html(dateFormat.i18n.monthNames[(currentMonth - 1) + 12] + " " + currentYear);
    if (currentMonth == 1) {
        $("#prevMonthBtn .ui-btn-text").text(dateFormat.i18n.monthNames[23]);
    } else {
        $("#prevMonthBtn .ui-btn-text").text(dateFormat.i18n.monthNames[(currentMonth - 2) + 12]);
    }
    
    if (currentMonth == 12) {
        $("#nextMonthBtn .ui-btn-text").text(dateFormat.i18n.monthNames[12]);
    } else {
        $("#nextMonthBtn .ui-btn-text").text(dateFormat.i18n.monthNames[(currentMonth) + 12]);
    }
    
    
    
    var sbean = getSessionBean();
    var idmobile = "";
    if (sbean != null) {
        idmobile = sbean.IdMobileA3;
    }
    var eventsData = null;
    var monthKey = currentMonth + ":" + currentYear
    var lastVersion = window.localStorage.getItem("eventsDataVersion_" + monthKey);
    if (lastVersion == null) {
        lastVersion = 0;
    }
    var resp; console.log("entramos en getEvents, " + currentMonth + ", " + currentYear + ", lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: true, type: "GET", data: "F=WS12&V=" + lastVersion + "&I=" + idmobile + "&M=" + currentMonth + "&A=" + currentYear,
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error accediendo a listado de eventos (WS12), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    if (resp.Contenido == null) {
                        console.log("getEvents - con la ultima version");
                        //ya dispone de la ?ltima version, no se pinta
                        eventsData = window.localStorage.getItem("eventsData_" + monthKey);
                        if (eventsData != null) {
                            eventsData = JSON.parse(eventsData);
                        }
                    } else {
                        //hay version nueva, se pinta
                        eventsData = resp.Contenido;
                        console.log("getEvents - nueva version: " + eventsData.version);
                        //guardamos el contenido y la version
                        window.localStorage.setItem("eventsData_" + monthKey, JSON.stringify(eventsData));
                        window.localStorage.setItem("eventsDataVersion_" + monthKey, eventsData.version);
                    }
                }

            } else {
                //falla la conexion, mostramos el ultimo guardado
                eventsData = window.localStorage.getItem("eventsData_" + monthKey);
                if (eventsData != null) {
                    eventsData = JSON.parse(eventsData);
                }
                if (hasIconnection()) {
                    alertNative("Error accediendo a listado de eventos (WS12), statusCode: " + e.status, null, "Error", "Ok")
                }
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS12:TOK incorrecto");
                } else {
                    console.log("WS12:Error en getEvents, statusCode: " + e.status);
                }
            }
            var liOblig = "<li class='ui-disabled'><h1>No hay obligaciones</h1></li>";
            var liCursos = "<li class='ui-disabled'><h1>No hay cursos</h1></li>";
            var liEventos = "<li class='ui-disabled'><h1>No hay eventos</h1></li>";
            var href;
            var onclick;
            if (eventsData != null) {
                loadedEvents = true;
                if (eventsData.Obligaciones.length > 0) {
                    liOblig = "";
                    for (i = 0; i < eventsData.Obligaciones.length; i++) {
                        oblig = eventsData.Obligaciones[i];
                        href = '#descPage';
                        liOblig += "<li data-theme='c'><a data-transition='slide' onclick='loadDescPage(" + i + ",\"" + oblig.Fec + "\",\"" + oblig.Mod + "\", null, \"obligaciones\", \"" + monthKey + "\")' href='" + href + "' >" +
		    		"<div class='title-news'>" + oblig.Mod + "</div>" +
		    				"<p class='date-news'>" + oblig.Fec + "</p></a></li>";
                    }
                }
                var imgSrc;
                if (eventsData.Cursos.length > 0) {
                    liCursos = "";
                    for (i = 0; i < eventsData.Cursos.length; i++) {
                        curso = eventsData.Cursos[i];
                        href = '#descPage';

                        imgSrc = "../myimg/icons/a3ASESOR_48.png";
                        if (curso.Icono == "A3CON") {
                            imgSrc = "../myimg/icons/a3asesor-con_48.png";
                        } else if (curso.Icono == "A3DOC") {
                            imgSrc = "../myimg/icons/a3asesor-doc_48.png";
                        } else if (curso.Icono == "A3ECO") {
                            imgSrc = "../myimg/icons/a3asesor-eco_48.png";
                        } else if (curso.Icono == "A3GES") {
                            imgSrc = "../myimg/icons/a3asesor-ges_48.png";
                        } else if (curso.Icono == "A3LOPD") {
                            imgSrc = "../myimg/icons/a3asesor-lopd_48.png";
                        } else if (curso.Icono == "A3NOMV5") {
                            imgSrc = "../myimg/icons/a3asesor-nom_48.png";
                        } else if (curso.Icono == "A3REN") {
                            imgSrc = "../myimg/icons/a3asesor-ren_48.png";
                        } else if (curso.Icono == "A3SCAN") {
                            imgSrc = "../myimg/icons/a3asesor-scan_48.png";
                        } else if (curso.Icono == "A3SOC") {
                            imgSrc = "../myimg/icons/a3asesor-soc_48.png";
                        }

                        liCursos += "<li data-theme='c'><a data-transition='slide' onclick='loadDescPage("+i+",\"" + curso.Fec + "\",\"" + curso.Acc + "\", \"" + curso.Tem + "\", \"cursos\", \"" + monthKey + "\")' href='" + href + "' >" +
		    		"<img class='ui-li-thumb' src='" + imgSrc + "'/><div class='title-news'>" + curso.Acc + "</div>" +
		    				"<p class='date-news'>" + curso.Fec + "</p></a></li>";
                    }
                }
                if (eventsData.Eventos.length > 0) {
                    liEventos = "";
                    for (i = 0; i < eventsData.Eventos.length; i++) {
                        evento = eventsData.Eventos[i];
                        href = '#';
                        if (evento.Breve == '') {
                            onclick = 'openEvent(\"' + evento.Url + '\")';
                        } else {
                            href = '#descPage';
                            onclick = 'loadDescPage('+i+',\"' + evento.Fec + '\",\"' + evento.Tit + '\", \"' + evento.Url + '\", \"eventos\", \"' + monthKey + '\")';
                        }
                        liEventos += "<li data-theme='c'><a data-transition='slide' onclick='" + onclick + "' href='" + href + "' >" +
		    		"<div class='title-news'>" + evento.Tit + "</div>" +
		    				"<p class='date-news'>" + evento.Fec + "</p></a></li>";
                    }
                }

            }

            $('#obligList').html(liOblig);
            $('#obligList').listview("refresh");
            $('#cursosList').html(liCursos)
            $('#cursosList').listview("refresh");
            $('#eventsList').html(liEventos)
            $('#eventsList').listview("refresh");

            $.mobile.loading('hide');
        }
    });
}
var TYPE_OBLIG = "obligaciones";
var TYPE_CURSOS = "cursos";
var TYPE_EVTS = "eventos";
function getObjectFromLstore(idx, type, monthKey) {
    var eventsData = window.localStorage.getItem("eventsData_" + monthKey);
    if (eventsData != null) {
        eventsData = JSON.parse(eventsData);
        if (type == TYPE_OBLIG) {
            return eventsData.Obligaciones[idx];
        } else if (type == TYPE_CURSOS) {
            return eventsData.Cursos[idx];
        } else if (type == TYPE_EVTS) {
            return eventsData.Eventos[idx];
        }
        
    }
    return null;
}

var urlEv;
function loadDescPage(idx, fec, mod, moreInfUrl, type, monthKey) {
    $('#initdate').html(fec);
    var obj = getObjectFromLstore(idx, type, monthKey)
    var desc;
    if (type == TYPE_OBLIG) {
        $('#titDetails').html("Obligaciones");
        if (obj != null) {
            desc = obj.Des;
        }
    } else if (type == TYPE_CURSOS) {
        $('#titDetails').html("Cursos");
        if (obj != null) {
            desc = obj.Sum;
        }
    } else if (type == TYPE_EVTS) {
        $('#titDetails').html("Eventos");
        if (obj != null) {
            desc = obj.Breve;
        }
    }
        $('#title').html(mod);
        $('#contentText').html(desc);
        
        if (moreInfUrl != null) {
            urlEv = moreInfUrl;
            $('#divMoreInfo').show();
        } else {
            $('#divMoreInfo').hide();
        }
    }

function openEvent(urlEvent) {
    if (hasIconnection("P?ina de evento")) {
        window.open(urlEvent, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    }
}

$("#moreInfoBtn").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    openEvent(urlEv);

});

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar los cursos";


var tit_err_mark_fav = "Error al marcar favorito";
var tit_error_loadfav = "Error al cargar los favoritos";
	
var favList;
function getMyFavourites(filter){	
	//TODO ws de a3
	loadActiveCursos(filter);
}

function isInFavs(idcurso){
	if (favList != undefined){
		for(j=0;j<favList.length;j++){
			if(idcurso == favList[j]){
				return true;
			}
		}	
	}	
	return false;
}

function addToFavs(idresource){	
	favList[favList.length] = idresource;
}

function removeFromFavs(idresource){
	newFavList = new Array();
	idx = 0;
	for(j=0;j<favList.length;j++){
		if(idresource != favList[j]){
			newFavList[idx] = favList[j]
			idx++;
		}
	}
	favList = newFavList;
}

function loadActiveCursos(filter){
	console.log("entramos en loadActiveCursos, filtro: " + filter);
	var sbean = getSessionBean();
	var idmobile = "";
	if (sbean != null){
	    idmobile = sbean.IdMobileA3;
	}
	var cursosData = null;
	var lastVersion = window.localStorage.getItem("cursosDataVersion");
	if (lastVersion == null){
		lastVersion = 0;
    }
    var resp;
    console.log("entramos en loadActiveCursos, lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: true, type: "GET", data: "F=WS04&V=" + lastVersion + "&I=" + idmobile,
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error accediendo a listado de todos los cursos (WS04), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    if (resp.Contenido == null) {
                        console.log("loadActiveCursos - con la ultima version");
                        //ya dispone de la última version, no se pinta
                        cursosData = window.localStorage.getItem("cursosData");
                        if (cursosData != null) {
                            cursosData = JSON.parse(cursosData);
                        }
                    } else {
                        //hay version nueva, se pinta
                        cursosData = resp.Contenido;
                        console.log("loadActiveCursos - nueva version: " + cursosData.version);
                        //guardamos el contenido y la version
                        window.localStorage.setItem("cursosData", JSON.stringify(cursosData));
                        window.localStorage.setItem("cursosDataVersion", cursosData.version);
                    }
                }

            } else {
                //falla la conexion, mostramos el ultimo guardado
                cursosData = window.localStorage.getItem("cursosData");
                if (cursosData != null) {
                    cursosData = JSON.parse(cursosData);
                }
                if (hasIconnection()) {
                    alertNative("Error accediendo a listado de todos los cursos (WS04), statusCode: " + e.status, null, "Error", "Ok")
                }
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS04:TOK incorrecto");
                } else {
                    console.log("WS04:Error en loadActiveCursos, statusCode: " + e.status);
                }
            }
            var liData = "<li class='ui-disabled'><h1>No hay registros</h1></li>";
            var lisFavs = "<li class='ui-disabled'><h1>Sin favoritos</h1></li>";
            var addCourse = false;
            var imgSrc;
            if (cursosData != null && cursosData.curso.length > 0) {
                loadedCursos = true;
                liData = "";
                for (i = 0; i < cursosData.curso.length; i++) {
                    curso = cursosData.curso[i];
                    href = '#cursoPage';
                    addCourse = false;

                    if (filter instanceof Array) {
                        for (j = 0; j < filter.length; j++) {
                            if (curso.Perfiles.indexOf(filter[j]) != -1) {
                                addCourse = true;
                            }
                            continue;
                        }
                    } else {
                        if (filter == "" || curso.Perfiles.indexOf(filter) != -1) {
                            addCourse = true;
                        }
                    }



                    if (addCourse) {
                        //	                    if (isInFavs(curso.Id)) {
                        //	                        lisFavs += "<li data-role='list-divider'  data-theme='c' id='lifav_" + curso.Id + "'><a data-transition='slide' onclick='loadCurso(" + curso.Id + ")' href='" + href + "' >" +
                        //			    		"<h1>" + curso.Accion + "</h1>" +
                        //			    				"<p>Duración " + curso.Horas + "</p><p >" + new Date(curso.Fecha).format("dd/mm/yyyy") + "</p></a>" +
                        //			    						"<a href='#' onclick='openOpts(\"" + curso.Accion + "\"," + curso.Id + ",\"" + curso.Temario + "\")'></a></li>";
                        //                        }

                        imgSrc = "../myimg/icons/a3ASESOR_48.png";
                        if (curso.Icono == "A3CON") {
                            imgSrc = "../myimg/icons/a3asesor-con_48.png";
                        } else if (curso.Icono == "A3DOC") {
                            imgSrc = "../myimg/icons/a3asesor-doc_48.png";
                        } else if (curso.Icono == "A3ECO") {
                            imgSrc = "../myimg/icons/a3asesor-eco_48.png";
                        } else if (curso.Icono == "A3GES") {
                            imgSrc = "../myimg/icons/a3asesor-ges_48.png";
                        } else if (curso.Icono == "A3LOPD") {
                            imgSrc = "../myimg/icons/a3asesor-lopd_48.png";
                        } else if (curso.Icono == "A3NOMV5") {
                            imgSrc = "../myimg/icons/a3asesor-nom_48.png";
                        } else if (curso.Icono == "A3REN") {
                            imgSrc = "../myimg/icons/a3asesor-ren_48.png";
                        } else if (curso.Icono == "A3SCAN") {
                            imgSrc = "../myimg/icons/a3asesor-scan_48.png";
                        } else if (curso.Icono == "A3SOC") {
                            imgSrc = "../myimg/icons/a3asesor-soc_48.png";
                        }
                        
                        liData += "<li  data-theme='c' id='lifav_" + curso.Id + "'><a data-transition='slide' onclick='loadCurso(" + curso.Id + ")' href='" + href + "' >" +
		    		"<img src='" + imgSrc + "'/><div class='title-news'>" + curso.Accion + "</div>" +
		    				"<p class='author-news'>" + curso.Icono + "</><p class='author-news'>Duración " + curso.Horas + "</p><p class='date-news' >" + new Date(curso.Fecha).format("dd/mm/yyyy") + "</p></a>" +
                        //"<a href='#' data-icon='man' data-theme='b' onclick='openOpts(\"" + curso.Accion + "\"," + curso.Id + ",\"" + curso.Temario + "\")'></a>
                                    "</li>";
                    }
                }

            }
            $('#curList').html(liData)
            $('#curList').listview("refresh");


            //            $('#favCurList').html(lisFavs)
            //            $('#favCurList').listview("refresh");

            $.mobile.loading('hide');
        }
    });
}

function getCursoFromLstore(idcurso){
	var cursosData = window.localStorage.getItem("cursosData");
	if(cursosData != null){
		cursosData = JSON.parse(cursosData);
		for(i=0;i<cursosData.curso.length;i++){
			if(cursosData.curso[i].Id == idcurso){
				return cursosData.curso[i];
			}
		}
	}
	return null;
}

var titleSel = '';
var temarioSel = '';
var idresOpened = '';
var isfavOpened;

function loadCurso(idcurso){
	var curso = getCursoFromLstore(idcurso);	
	if (curso != null){
		$('#initdate').html("Inicio " + new Date(curso.Fecha).format("dd/mm/yyyy"));
		$('#title').html(curso.Accion);
		$('#duration').html("Duración " + curso.Horas);
		$('#place').html(curso.Lugar);
		$('#contentText').html(curso.Sumario);
		temarioSel = curso.Temario;
		idresOpened = idcurso;
	}	
}



function openOpts(title, idcurso, temario){
	isfavOpened = isInFavs(idcurso);
	idresOpened = idcurso;

	titleSel = title;
	temarioSel = temario;
	if (getDevicePlatform() != 'iOS') {
	    $("#divShare").show();
	} else {
	    $("#divShare").hide();
    }
	
	if(isfavOpened){			
		$("#imgFav").attr("src", "../myimg/fav.png")
		$("#btnFav").text("Quitar favorito");
	}else{
		$("#imgFav").attr("src","../myimg/fav_dis.png")
		$("#btnFav").text("Marcar como favorito");
	}
	
	$( "#optsPopUp" ).popup( "open", {transition: 'pop', positionTo: 'window'} );
}

$("#temBtn").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (hasIconnection("Temario del curso")) {
        window.open(temarioSel, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    }    
});

$("#btnIns").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    idMobile = "";
    if (getSessionBean() != null) {
        idMobile = getSessionBean().IdMobileA3;
    }
    if (hasIconnection("Inscripción a curso")) {
        window.open("http://appa3asesor.a3software.com/inscripcion.aspx?I=" + idMobile + "&id=" + idresOpened, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    }
});


$("#insBtn").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    idMobile = "";
    if (getSessionBean() != null) {
        idMobile = getSessionBean().IdMobileA3;
    }
    if (hasIconnection("Inscripción a curso")) {
        window.open("http://appa3asesor.a3software.com/inscripcion.aspx?I=" + idMobile + "&id=" + idresOpened, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    }
});

$("#btnShare").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    share(titleSel, temarioSel);
 
    });

$("#btnFav").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    servOp = "mfav";
    if(isfavOpened){
    	servOp = "umfav";	
    }
    //TODO ws service a3

});

function loadClientProfilesa3() {
    var urlJson = getUrlRestService(g_configService, "clientprofilesa3", null, false);
    var rtn = "";
    if (urlJson != null) {
        var req = new Object()
        req.sbean = getSessionBean();
        $.ajax({ url: urlJson, async: false, type: "POST", data: JSON.stringify(req), success: function loadClientProfilesA3Resp(resp) {        
            resp = JSON.parse(resp)
            if (resp.hasOwnProperty('ErrorCode')) {
                alertNative(eval('err_' + resp.ErrorCode), null, "Error cargando perfiles", "Ok")
            } else {
                //separados los codigos a3 de  perfiles por ;	                
                rtn = resp;
            }
        }, dataType: "json",
            contentType: "application/json"
        });
    }
    return rtn;
}



var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar listado de encuestas";
var tit_loading_poll = "Cargando encuesta...";
var tit_loading_question = "Cargando pregunta...";
var tit_error_load_poll = "Error al cargar la encuesta seleccionada";
var tit_error_load_question = "Error al cargar la pregunta";
var tit_error_load_cpolls = "Error al cargar las encuestas del cliente"
var donemsg = "Realizada ";
var times_msg = " veces";
var tit_loading_presults = "Cargando resultados...";
var tit_error_load_results = "Error al cargar los resultados de la encuesta";
var tit_loading_pqresults = "Cargando respuestas de otros usuarios...";
var tit_error_load_pqresults = "Error al cargar los resultados de la pregunta";

var tit_answering_q = "Respondiendo...";
var tit_err_answering_q = "Error al responder";

var mypollList;
function getClientPolls(){	
	$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_pollService, "gcpolls", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: function getMyPollsResp(resp){
			resp = JSON.parse(resp)
			if (resp.hasOwnProperty('ErrorCode')){		
				alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_cpolls, "Ok");				
			}else{
				mypollList = resp;				
			}
			loadActivePolls();
		}, dataType: "json", contentType: "application/json"} );	
	}else{
		$.mobile.loading('hide');
	}	
}

function loadActivePolls(){
	var urlJson = getUrlRestService(g_pollService, "apolls", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idapp = g_idApp;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadPollsListResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}	
}

function isInClientPolls(idpoll){	
	for(j=0;j<mypollList.length;j++){
		if(idpoll == mypollList[j].idpoll){
			return mypollList[j];
		}
	}
	return null;
}

var pollList = null;
function loadPollsListResp(resp){	
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp == null){
	    $('#pollList').html("<li data-role='list-divider' data-theme='c'  class='ui-disabled'><h1>No hay registros</h1></li>");
   	 	$('#pollList').listview("refresh");
   	 	$('#cPollList').html("<li data-role='list-divider' data-theme='c'  class='ui-disabled'><h1>No hay registros</h1></li>");
	 	$('#cPollList').listview("refresh");
	}else{
		if (resp.hasOwnProperty('ErrorCode')){		
			alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load, "Ok")
		}else{
			loadedPolls = true;
			pollList = resp;
			//cargamos las encuestas		
			var lis = "";
			var cpLis = "";
			var stit;
			var cpoll;
			var showOnline = '';
			var countReali = 0;
			var countDisp = 0;
			var pNtimes = '';
			var showNvotes;
			for(i=0;i<pollList.length;i++){
				var poll = pollList[i];
				stit = poll.subtitle
				if(stit == null){
					stit = "";
				}
				if(poll.enableitem1){
					showOnline = '';
				}else{
					showOnline = "class='ui-disabled'";
				}
				cpoll = isInClientPolls(poll.iditem);
				
				if(poll.count == -1){
					//no se muestra el numero de realizadas
					pNtimes = "";
					showNvotes = false;
				}else{
					pNtimes = "<p>"+ donemsg + poll.count + times_msg + " - " +stit+"</p>";
					showNvotes = true;
				}
				
				
				if(cpoll != null && cpoll.finished){
				    cpLis += "<li data-theme='c'><a data-transition='slide' onclick='loadPoll(" + poll.iditem + ", true, 0, " + showNvotes + ")' href='#pollPage' >" +
		    		"<div class='margin-b-0 title-news'>" + poll.title + "</div>" + pNtimes + "</a>" +
	    						"<a " + showOnline + " href='#pollResultsPage'  data-icon='stats' data-theme='b' onclick=\"setVarsPollResults(" + poll.iditem + ", " + showNvotes + ", '" + poll.title + "')\"></a></li>";
					countReali++;
				}else if(cpoll != null){
	                lis += "<li data-theme='c'><a data-transition='slide' onclick='loadPoll(" + poll.iditem + ", false, " + cpoll.idlastquestion + ", " + showNvotes + ")' href='#pollPage' >" +
		    		"<div class='title-news margin-b-0'>" + poll.title + "</div>" + pNtimes + "</a>" +
	    						"<a " + showOnline + " href='#pollResultsPage' data-icon='stats' data-theme='b' onclick=\"setVarsPollResults(" + poll.iditem + ", " + showNvotes + ", '" + poll.title + "')\"></a></li>";
					countDisp++;
				}else{
	                lis += "<li data-theme='c'><a data-transition='slide' onclick='loadPoll(" + poll.iditem + ", false, 0, " + showNvotes + ")' href='#pollPage' >" +
		    		"<div class='title-news margin-b-0'>" + poll.title + "</div>" + pNtimes + "</a>" +
	    						"<a "+ showOnline +" href='#pollResultsPage' data-icon='stats' data-theme='b' onclick=\"setVarsPollResults("+ poll.iditem +", "+ showNvotes +", '"+ poll.title +"')\"></a></li>";
					countDisp++;
				}		
							
			    		    
		  }
			$('#countRealiz').html(countReali);
			$('#pollList').html(lis);
	   	 	$('#pollList').listview("refresh");
			
	   	 	
	   	 	if(cpLis == ""){
	   	 		cpLis = "<li class='ui-disabled'><h1>No hay registros</h1></li>";
	   	 	}
	   	 	$('#countDisp').html(countDisp);
			$('#cPollList').html(cpLis);
	   	 	$('#cPollList').listview("refresh");
		}
	}
}

var idPoll2viewRes;
var titlePoll2viewRes;
var showNvotes;
function setVarsPollResults(id, showNumbervotes, title){
	idPoll2viewRes = id;
	titlePoll2viewRes = title;
	showNvotes = showNumbervotes;
}

function loadPollResults(id, showNumbervotes, title){	
	showNvotes = showNumbervotes;
	//cargamos los datos de la encuesta
	$('#titPoll_res').html(title);
	$.mobile.loading( 'show', {text: tit_loading_presults,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_pollService, "gpresults", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idpoll = id;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadPollResultsResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}	
}

var colors = new Array();
colors[0] = "#f23927";
colors[1] = "#f28127";
colors[2] = "#5c523b";
colors[3] = "#e9e320";
colors[4] = "#b1e920";
colors[5] = "#c6eccc";
colors[6] = "#46eedf";
colors[7] = "#2d6778";
colors[8] = "#bbc9da";
colors[9] = "#7873bf";
colors[10] = "#9973bf";
colors[11] = "#ba1389";
colors[12] = "#ba1347";

var dogChartOpts = {animation:false,percentageInnerCutout : 40};
function loadPollResultsResp(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_results, "Ok")
	}else{
		var html = '';
		var question;
		var qoptions;
		for(i=0;i<resp.length;i++){
			question = resp[i];			
			html += "<div style='clear:both'><b>" + question.title + "</b></div>";
			html += "<canvas style='float:left' id='chart_"+ i +"' width='150' height='150'></canvas>";
			qoptions = resp[i].optionslist;		
			html += "<div style='width: 60%;margin-left:30px;margin-bottom:30px;float:left;margin-top:10px;'>";
			for(j=0;j<qoptions.length;j++){				
				html += "<div style='clear:both;'><div style='width: 12%;float:left'>";
				if (showNvotes){
					html += "<b>" + qoptions[j].nresp + "</b>";	
				}				
				html += "</div><div style='width:3%;background-color:" + colors[j] + ";float:left'>&nbsp;</div><div style='width:75%;float:left'>&nbsp;" + qoptions[j].name +"</div><div align='right' style='width: 10%;float:left'>" + qoptions[j].percentage + "%</div></div>"
			}
			html += "</div>";
		}
		$('#qResultsList').html(html);		
		var dataopt;
		for(i=0;i<resp.length;i++){
			//Get context with jQuery - using jQuery's .get() method.
			var ctx = $("#chart_" + i).get(0).getContext("2d");
			qoptions = resp[i].optionslist;
			dataopt = new Array();			
			for(j=0;j<qoptions.length;j++){
				optData = new Object();
				optData.value = qoptions[j].nresp;
				optData.color = colors[j];
				dataopt[j] = optData
			}
			//This will get the first returned node in the jQuery collection.
			var myNewChart = new Chart(ctx).Doughnut(dataopt, dogChartOpts);
		}
	}
}


var hasFinished = false;
var idLastQAnswered = 0;
function loadPoll(id, finished, lastIdQuestAnsw, showNumbervotes){
	showNvotes = showNumbervotes;
	hasFinished = finished;
	idLastQAnswered = lastIdQuestAnsw;
	//cargamos los datos de la encuesta
	$.mobile.loading( 'show', {text: tit_loading_poll,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_pollService, "pdata", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idpoll = id;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: loadPollDataResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}	
}

var selPollData;
function loadPollDataResp(resp){
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_poll, "Ok")
	}else{
		selPollData = resp;
		$('#titPoll').html(selPollData.title);
		//iniciamos la encuesta para obtener la primera pregunta,o en la que se haya quedado
		getQuestion(idLastQAnswered, 0);
	}
}

//0:no, 1:avanzar; 2:retroceder
var doTrans = 0;
function getQuestion(idquestion, doTransition){
	doTrans = doTransition;
	var urlJson = getUrlRestService(g_pollService, "gquest", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idpoll = selPollData.iditem;
		req.idquestion = idquestion;
		req.lang = g_locale;
    	$.mobile.loading( 'show', {text: tit_loading_question,textVisible: true,theme: 'b'});
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: getQuestionResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}		
}

var currentQuestion;
var prevQuestion;
var nextQuestion;
function getQuestionResp(resp){	
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_question, "Ok")
	}else{
		if(doTrans == 1){
			$.mobile.changePage( "#pollPage", {transition: "slide",reverse: false,allowSamePageTransition:true});
		}else if(doTrans == 2){
			$.mobile.changePage( "#pollPage", {transition: "slide",reverse: true,allowSamePageTransition:true});
		}
		currentQuestion = resp;
		loadQuestionForm(currentQuestion)
	}
}

function loadQuestionForm(QuestionPollBean){
	if (QuestionPollBean.urlimage != ""){
		$('#q_img').show();		
		$('#q_img').attr('src',QuestionPollBean.urlimage);
	}else{
		$('#q_img').hide();
		$('#q_img').attr('src','#');
	}
	
	$('#nquestion').html(QuestionPollBean.qorder + "/" + selPollData.nquestions);

	
	$('#qText').html(QuestionPollBean.title);
	var opts = "";
	var idradioname = '';
	
	for(i=0;i<QuestionPollBean.optionslist.length;i++){
		var opt = QuestionPollBean.optionslist[i];
		var checked = "";
		if(QuestionPollBean.idoptionsel == opt.idoption){
			checked = "checked='checked'";
			
			if(selPollData.showonline){
				loadQuestionResults(QuestionPollBean.idquestion)	
			}			
		}
		idradioname = 'option_'+opt.idoption
		opts += '<input data-theme="b" type="checkbox" name="radioopt" id="' + idradioname + '" onchange="onchangeOption(this.value)" value="' + opt.idoption + '" ' + checked + '/>' +
        '<label class="font-normal" for="' + idradioname + '">' + opt.name + '</label>';    
	}
	$('#optionsList').html(opts)
	
	if(hasFinished){
		$('#optionsList :input').attr('disabled', true);
	}else{
		$('#optionsList :input').removeAttr('disabled');
	}
	
	$("#fsOptions").trigger("create");
	if(QuestionPollBean.qorder == 1){			
		$('#prevQbtn').button("disable")
	}else{
		$('#prevQbtn').button("enable")
	}
	
	if(QuestionPollBean.idoptionsel == 0){
		$('#nextQbtn').button("disable")
	}else{
		$('#nextQbtn').button("enable")
	}
	
	
	if(QuestionPollBean.qorder == selPollData.nquestions){
		if(selPollData.showonline){
			$('#nextQbtn').attr("value","Resultados");
			$( "#nextQbtn" ).button( "refresh" );	
		}else{
			$('#nextQbtn').attr("value","Final");
			$( "#nextQbtn" ).button( "refresh" );	
		}		
	}else{
		$('#nextQbtn').attr("value","Siguiente");
		$( "#nextQbtn" ).button( "refresh" );
	}
}

function onchangeOption(val) {    
    var idseloption = 0;
    $('input[type=checkbox]').each(function () {
        //        if (this.checked) {			                
        //        	idseloption = $(this).val()
        //        }
        if (val == $(this).val()) {
            idseloption = $(this).val();
            this.checked = true;
        } else {
            $(this).prop('checked', false).checkboxradio('refresh');
        }
    });
	if (idseloption != 0){
		currentQuestion.idoptionsel = idseloption;
		//respondemos
		$.mobile.loading( 'show', {text: tit_answering_q,textVisible: true,theme: 'b'});
		var urlJson = getUrlRestService(g_pollService, "aquest", null, false);
		if(urlJson != null){
			var req = new Object()
			req.sbean = getSessionBean();
			req.idpoll = selPollData.iditem;
			req.idquestion = currentQuestion.idquestion;
			req.idoptionsel = idseloption;
			req.idnextQuest = currentQuestion.idquestnext;
			req.lang = g_locale
			$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: answerQuestResp, dataType: "json",
		              contentType: "application/json"
		            } );	
		}else{
			$.mobile.loading('hide');
		}	
	}
}


function answerQuestResp(resp){	
	$.mobile.loading('hide');
	if(resp == "null"){
		//mostramos los resultados
		if (selPollData.showonline){
			loadQuestionResults(currentQuestion.idquestion);
		}
		hasFinished = true;
		$('#nextQbtn').button("enable");
	}else{
		resp = JSON.parse(resp)
		if (resp.hasOwnProperty('ErrorCode')){		
			currentQuestion.idoptionsel = 0;
			alertNative(eval('g_err_'+resp.ErrorCode), null, tit_err_answering_q, "Ok")
		}else{
			//en resp tenemos los datos de la prox encuesta, si no ha acabado
			nextQuestion = resp;
			//mostramos los resultados
			if (selPollData.showonline){
				loadQuestionResults(currentQuestion.idquestion);
			}
			//habilitamos el boton de siguiente
			$('#nextQbtn').button("enable");
		}	
	}	
}

function loadQuestionResults(idquestion){
	$.mobile.loading( 'show', {text: tit_loading_pqresults,textVisible: true,theme: 'b'});
	var urlJson = getUrlRestService(g_pollService, "gpqresult", null, false);
	if(urlJson != null){
		var req = new Object()
		req.sbean = getSessionBean();
		req.idpoll = selPollData.iditem;
		req.idquestion = idquestion;
		req.lang = g_locale
		$.ajax({url:urlJson, type: "POST", data: JSON.stringify(req), success: questionResultResp, dataType: "json",
	              contentType: "application/json"
	            } );	
	}else{
		$.mobile.loading('hide');
	}
}

function questionResultResp(resp){	
	$.mobile.loading('hide');
	resp = JSON.parse(resp)
	if (resp.hasOwnProperty('ErrorCode')){		
		alertNative(eval('g_err_'+resp.ErrorCode), null, tit_error_load_pqresults, "Ok")
	}else{
		$('#questResults').show();
		$('#chartQuestDiv').html("<canvas id='chart_quest' width='200' height='200'></canvas>");
		
		var ctx = $("#chart_quest").get(0).getContext("2d");
		qoptions = resp.optionslist;
		dataopt = new Array();	
		html = '';
		for(j=0;j<qoptions.length;j++){
			optData = new Object();
			optData.value = qoptions[j].nresp;
			optData.color = colors[j];
			dataopt[j] = optData
			html += "<div style='clear:both;'><div style='width: 10%;float:left'>";
			if (showNvotes){
				html += "<b>" + qoptions[j].nresp + "</b>";	
			}
			
			html += "</div><div style='width:3%;background-color:" + colors[j] + ";float:left'>&nbsp;</div><div style='width: 72%;float:left'>&nbsp;" + qoptions[j].name +"</div><div style='width: 15%;float:left'>" + qoptions[j].percentage + "%</div></div>"			
		}		
		//This will get the first returned node in the jQuery collection.
		var myNewChart = new Chart(ctx).Doughnut(dataopt, {animation:false});
		$('#divQresOpts').html(html);
	}
}

$("#prevQbtn").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    $('#questResults').hide();
    nextQuestion = currentQuestion;
    if(prevQuestion != undefined && prevQuestion.idquestion == currentQuestion.idquestprev){
    	$.mobile.changePage( "#pollPage", {
      	  transition: "slide",
      	  reverse: true,
      	  allowSamePageTransition:true
      	});
    	currentQuestion = prevQuestion;
    	loadQuestionForm(prevQuestion);
    }else{
    	getQuestion(currentQuestion.idquestprev, 2);
    }
    return false;
});

$("#chart_quest").click(function(e){
//    e.preventDefault();
//    e.stopImmediatePropagation();  
//    alert('aa');
//    return false;
});

$("#nextQbtn").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();   
    $('#questResults').hide();
    if(hasFinished && selPollData.nquestions == currentQuestion.qorder){
    	if(selPollData.showonline){
    		setVarsPollResults(selPollData.iditem, selPollData.showpercentage, selPollData.title);    		
    		$.mobile.changePage( "#pollResultsPage", {
      	  	  transition: "slide"});
    	}else{    		
    		$.mobile.changePage( "#pollListPage", {
      	  	  transition: "slide", reverse:true});
    	}
    	
    }else{
    	prevQuestion = currentQuestion;    
        if(nextQuestion != undefined && nextQuestion.idquestion == currentQuestion.idquestnext){
        	$.mobile.changePage( "#pollPage", {
        	  	  transition: "slide",
        	  	  reverse: false,
        	  	  allowSamePageTransition:true
        	  	});
        	currentQuestion = nextQuestion;
        	loadQuestionForm(nextQuestion);    	 
        }else{    	
        	getQuestion(currentQuestion.idquestnext, 1);
        }
    }
    return false;
});

var tit_loading = "Cargando listado...";
var tit_error_load = "Error al cargar los BOEs";

	

function loadLastBoes(){
    console.log("entramos en loadLastBoes");
	var sbean = getSessionBean();
	var idmobile = "";
	if (sbean != null){
	    idmobile = sbean.IdMobileA3;
	}
	var boesData = null;
	var lastVersion = window.localStorage.getItem("boesDataVersion");
	if (lastVersion == null){
		lastVersion = 0;
    }
    var resp;
    console.log("entramos en loadLastBoes, lastversion: " + lastVersion);
    $.mobile.loading('show', { text: tit_loading, textVisible: true, theme: 'b' });
    $.ajax({ url: g_urlWsa3, beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "TOK:" + g_token_wsa3);
    }, async: true, type: "GET", data: "F=WS08&V=" + lastVersion + "&I=" + idmobile,
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                resp = JSON.parse(e.responseText);
                if (resp.Error.cod != 0) {
                    alertNative("Error accediendo a listado de BOEs (WS08), code: " + resp.Error.cod, null, "Error", "Ok")
                } else {
                    if (resp.Contenido == null) {
                        console.log("loadLastBoes - con la ultima version");
                        //ya dispone de la última version, no se pinta
                        boesData = window.localStorage.getItem("boesData");
                        if (boesData != null) {
                            boesData = JSON.parse(boesData);
                        }
                    } else {
                        //hay version nueva, se pinta
                        boesData = resp.Contenido;
                        console.log("loadLastBoes - nueva version: " + boesData.version);
                        //guardamos el contenido y la version
                        window.localStorage.setItem("boesData", JSON.stringify(boesData));
                        window.localStorage.setItem("boesDataVersion", boesData.version);
                    }
                }

            } else {
                //falla la conexion, mostramos el ultimo guardado
                boesData = window.localStorage.getItem("boesData");
                if (boesData != null) {
                    boesData = JSON.parse(boesData);
                }
                if (hasIconnection()) {
                    alertNative("Error accediendo a listado de BOEs (WS08), statusCode: " + e.status, null, "Error", "Ok")
                }
                if (e.status === 403) {
                    //TOK incorrecto
                    console.log("WS08:TOK incorrecto");
                } else {
                    console.log("WS08:Error en loadLastBoes, statusCode: " + e.status);
                }
            }
            var liData = "<li class='ui-disabled'><h1>No hay registros</h1></li>";
            var img;
            if (boesData != null && boesData.boe.length > 0) {
                loadedBoes = true;
                liData = "";
                for (i = 0; i < boesData.boe.length; i++) {
                    boe = boesData.boe[i];
                    //href = 'externalPage.html?type=pdf&htmlBack=boesList.html&url2load=' + boe.Url + '&titmenu=' + boe.Titulo;
                    href = '#';

                    img = "";
                    if (boe.Categoria == 'LABORAL' && boe.Tipo == 'BOE') {
                        img = "<img src='../myimg/icons/a3boe-laboral_48.png'/>";
                    } else if (boe.Categoria == 'FISCAL' && boe.Tipo == 'BOE') {
                        img = "<img src='../myimg/icons/a3boe-fiscal_48.png'/>";
                    } else if (boe.Categoria == 'LABORAL' && boe.Tipo == 'BOLETIN') {
                        img = "<img src='../myimg/icons/sistema-red.png'/>";
                    }

                    liData += "<li data-role='list-divider' data-theme='c' class='ui-li-divider-2'><a data-transition='slide' onclick='openBoe(\"" + boe.Url + "\")' href='" + href + "' > <div style='float:left;margin-right:10px;'>" +
		    		 img + "</div><div class='title-news'>" + boe.Titulo + "</div>" +
                            "<p class='author-news'>" + boe.Tipo + " - " + boe.Categoria + "</p>" +
		    				"<p class='date-news'>" + new Date(boe.Fecha).format("dd/mm/yyyy") + "</p></a></li>";
                }

            }
            $('#boesList').html(liData)
            $('#boesList').listview("refresh");

            $.mobile.loading('hide');
        }
    });
}

function openBoe(urlBoe) {
    if (hasIconnection("Descarga de BOE")) {
        if (getDevicePlatform() == 'Android') {
            //cargamos el visor de google, pues no se abre directamente
            window.open('http://docs.google.com/viewer?url=' + urlBoe + '&embedded=true', '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
        } else {
            window.open(urlBoe, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
        }
        
    }    
}













    var tit_loading_new = "Cargando noticia...";
    
    var loadedNews = false;
    function online(){
    	g_hasIconnection = true;
    	var tit_loading = "Cargando noticias...";
    	$.mobile.loading( 'show', {text: tit_loading,textVisible: true,theme: 'b'});
    	
    	//obtenemos la url de noticias
    	var urlJson = getUrlRestService(g_configService, "rssnews", [g_idApp], false);
		if(urlJson != null){			
     		$.getJSON(urlJson, rssNewsResp);					
		}else{
			$.mobile.loading('hide');
		}
    	
    	
    }
    
    var urlRssNews;
    function rssNewsResp(urlRss){				
		if (urlRss != ''){
			urlRssNews = urlRss;
			//obtenemos el num máx
			var urlJson = getUrlRestService(g_configService, "nmaxrssnews", [g_idApp], false);
			if(urlJson != null){			
	     		$.getJSON(urlJson, rssNumNewsResp);					
			}
		}else{
			var noConection = "Sin noticias activas";
	    	if(!loadedNews){
	    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
	        	$('#articleList').html(li)
	        	 $('#articleList').listview("refresh");	
	    	}  
		}		
	}
    
    var maxNews = 20;
    function rssNumNewsResp(numax){				
		if (numax != 0){
			maxNews = numax;	
		}
		getOnlineFeed(urlRssNews, 'articleList', true, maxNews);
    	$.mobile.loading('hide');
    	loadedNews = true;
	}
    
    function offline(){
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    	if(!loadedNews){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#articleList').html(li)
        	 $('#articleList').listview("refresh");	
    	}
  }



    $(document).ready(function(){    	
    	document.addEventListener("deviceready", onDeviceReady, false);
    	document.addEventListener("offline", offline, false);
    	document.addEventListener("online", online, false);
    	
    	$('#hnews').text($.i18n._('news'));
    	 	
    	//$('div#dynamic').text($.i18n._('Dynamic Content', [$(document).width(), $(document).height()]));
    	//$('div#orderedDynamic').text($.i18n._('Ordered Dynamic Content', [$(document).width(), $(document).height()]));
    	
    	translateMenu();
    	
    	if (isFromDesktop()){
    		//console.log("ejecuntado desde ordenador")
    		online();
    	}
    	
    });
    
    function onDeviceReady() {
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
        // en ios no se ejecutara porque no hay boton atras
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    
    function onBackKeyDown() {
    	if($.mobile.activePage.attr('id') == 'articlePage'){
    		$.mobile.changePage( "#newsPage", { transition: "slide", reverse: true} );
    	}else{
    		history.back();	
    	}    	
    }
    
	


	$('#newsPage').live('pagebeforeshow',function(event){
		$('#newsPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
				
			
	

		printPanelMenu('opNew', isRegisteredAndActive(), "newsPage");

		

			
			$('#articlePage').live('pageshow',function(event){
				//$.mobile.loading( 'show', {text: tit_loading_new,textVisible: true,theme: 'b'});
			});
			
			$('#articlePage').live('pagehide',function(event){
				//$.mobile.loading('hide');
				$('#articleFrame').attr('src', 'blank.html');
			});			
			function frameloaded() {
				//$.mobile.loading('hide');
				if (isFromDesktop()){					
					var f = document.getElementById("articleFrame");
				     var y = f.contentWindow;
				     
				     f.height = y.document.body.offsetHeight;	
				}
			  }
	

	
// 	var maxLength = 40;
// 	for(i=1; i<=maxLength; i++){
// 		  document.write(
// 		    '<div data-role="page" id="article' + i + '">' +
// 		    '  <div data-role="header" data-theme="b" data-position="inline">' +
// 		    '    <a href="#newsPage" data-role="button" data-icon="back" data-transition="slide" data-direction="reverse">'+ $.i18n._('home') +'</a>' +
// 		    '    <h1 id="articleHeader' + i + '">&nbsp;</h1>' +
// 		    '    <a href="#" id="openButton' + i + '" data-role="button" data-icon="plus"' +
// 		    '      class="ui-btn-right" rel="external">'+ $.i18n._('open') +'</a>' +
// 		    '  </div>' +
// 		    '  <div data-role="content">' +
// 		    '    <h3 id="articleHead' + i + '"></h3>' +
// 		    '    <div id="articleContent' + i + '" class="articleContent"></div>' +
// 		    '    <!--div data-role="controlgroup" data-type="horizontal">' +
// 		    '      <a href="#article' + String(i-1) + '" data-role="button" data-icon="arrow-l"' +
// 		    '        data-inline="true" class="prevButton">Anterior</a>' +
// 		    '      <a href="#article' + String(i+1) + '" data-role="button" data-icon="arrow-r"' +
// 		    '        data-inline="true" class="nextButton" data-iconpos="right">Siguiente</a>' +
// 		    '    </div-->' +
// 		    '  </div>' +
// 		    '</div>'
// 		  );
// 		}
	
	
	












    var loadedAvisos = false;
    function online(){
        g_hasIconnection = true;
        loadLastNotices();
    }
    function offline(){
        g_hasIconnection = false;
        loadLastNotices();
    	var noConection = "Sin conexión a internet...";
    	if(!loadedAvisos){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#avisosList').html(li)
        	 $('#avisosList').listview("refresh");	
    	}
  }

  function onloadPage() {  
      document.addEventListener("deviceready", onDeviceReady, false);      

      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
      }
    }
	



	    $('#avisosListPage').live('pageshow', function (event, ui) {
	        if ($(ui.prevPage).attr("id") == 'iframePage') {
	            idCurrentOp = 'opLastNotices';
	            idPage2fade = 'avisosListPage';
	        }
	    });		

	    $('#avisosListPage').live('pagebeforeshow', function (event) {	        
	        $('#avisosListPage').fadeIn('slow', function () {
	            // Animation complete.			            
	        });
	    });			
	
	$('#avisosListPage').live('pagehide',function(event){
		//se pone el hide porque daba problemas al cambiar de pagina		
		$('#avisosListPage').hide();
	});
			
	

		    printPanelMenu('opLastNotices', isRegisteredAndActive(), "avisosListPage");
		












    var loadedApps = false;
    function online(){
    	g_hasIconnection = true;
    	loadActiveMapps();    	
    }
    function offline(){    
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    	if(!loadedApps){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#mAppList').html(li)
        	 $('#mAppList').listview("refresh");	
    	}
  }

  function onloadPage() {
      document.addEventListener("deviceready", onDeviceReady, false);
      //comentado porque ejecuta dos veces el online
      //    	document.addEventListener("offline", offline, false);
      //    	document.addEventListener("online", online, false);
      translateMenu();
      if (isFromDesktop()) {
          $("#linkAppImg").attr("src", "../myimg/google_play.jpg");
          //console.log("ejecuntado desde ordenador");
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}
    	
    	if(getDevicePlatform() == 'iOS'){
    		$("#linkAppImg").attr("src", "../myimg/app_store.png");
    	}else{
    		$("#linkAppImg").attr("src", "../myimg/google_play.jpg");	
    	}
    	       
    }
    
	


	$('#mAppListPage').live('pagebeforeshow',function(event){
		$('#mAppListPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
			$('#mAppListPage').live('pageshow',function(event){
								
			});			
			
	

		printPanelMenu('opApps', isRegisteredAndActive(), "mAppListPage");
		

			
			$('#mAppPage').bind('pageshow', function(e) {
				loadMapp(mApp2load);
			});
	
			$('#mAppPage').live('pagehide',function(event){
				//vaciamos los valores
				$('#titmApp').html("");
				$('#descMapp').html("");
				$("#linkApp").attr("href", "");
			});
			
			
	













    
    function online(){    	
    	g_hasIconnection = true;
    }
    function offline(){    	
    	var noConection = "Sin conexión a internet...";
    	g_hasIconnection = false;
 }
 function onloadPage() {
     document.addEventListener("deviceready", onDeviceReady, false);
     document.addEventListener("offline", offline, false);
     document.addEventListener("online", online, false);

     translateMenu();

     //     	if (isFromDesktop()){
     //     		$("#linkAppImg").attr("src", "../myimg/google_play.jpg");
     //     		//console.log("ejecuntado desde ordenador");
     //     		online();
     //     	}
 }

//    $(document).ready(function(){
//    	document.addEventListener("deviceready", onDeviceReady, false);
//    	document.addEventListener("offline", offline, false);
//    	document.addEventListener("online", online, false);
//    	
//    	translateMenu();
//    	
////     	if (isFromDesktop()){
////     		$("#linkAppImg").attr("src", "../myimg/google_play.jpg");
////     		//console.log("ejecuntado desde ordenador");
////     		online();
////     	}
//    	
//    });
    
    function onDeviceReady() {
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}    	       
    }
    
	


	$('#calendarListPage').live('pagebeforeshow',function(event){
		$('#calendarListPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
			$('#calendarListPage').live('pageshow',function(event){
								
			});			
			
	

		printPanelMenu('opCal', null, "calendarListPage");
		










    

        
    function online(){
    	g_hasIconnection = true;
    }
    function offline(){
    	g_hasIconnection = false;    	
    }

    function onloadPage() {
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("offline", offline, false);
        document.addEventListener("online", online, false);
    }

//    $(document).ready(function(){
//    	document.addEventListener("deviceready", onDeviceReady, false);
//    	document.addEventListener("offline", offline, false);
//    	document.addEventListener("online", online, false);
//    });
    
    function onDeviceReady() {
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}    	       
    }
	


			
			$('#eulaPage').live('pageshow',function(event){
				var urlJson = getUrlRestService(g_configService, "eula", [g_idApp, g_locale], true);
				if(urlJson != null){
					$.mobile.loading( 'show', {text: 'Cargando...',textVisible: true,theme: 'b'});
	         		$.getJSON(urlJson, readEula);					
				}
			});
			
			function readEula(eulaStr){				
	    		$.mobile.loading( 'hide' );
	    		$('#eulaText').html(eulaStr);
	    	}
			
			$("#btnAccept").click(function(e){
		        e.preventDefault();
		        $( "#regForm" ).submit();	        
		        return false;
		        });
	

			
			$("#btnAccept").click(function(e){
				if(!$("#chkAcceptEula").is(":checked")){
					alertNative("Debe leer por completo y aceptar el acuerdo de licencia", null, "Aceptación EULA", "Ok")
					$('#chkAcceptEula').focus();
				}else{
	 		        e.preventDefault();
	 		        //var lastEulaVer = getURLParameter('lastEulaVer')
	 		        //window.localStorage.setItem("lEulaVers", lastEulaVer);
	 		        //guardamos en servidor que ha aceptado el eula
	 		       var urlJson = getUrlRestService(g_configService, "accLastEula", null, false);
	 		    	if (urlJson != null){
	 		    		var req = new Object()
	 	      			req.sbean = getSessionBean();
	 	      			req.idapp = g_idApp;
	 		    		$.ajax({url:urlJson, type: "POST", 
	 		    	              data: JSON.stringify(req),
	 		    	              dataType: "json",
	 		    	              contentType: "application/json"
	 		    	            } );
	 		    	}
	 		    		 		    	
	 		        location.href = 'rssList.html'
				}
		        });
	












    var loadedPolls = false;
    function online(){    	
    	g_hasIconnection = true;
    	getClientPolls();    	
    }
    function offline(){    	
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    	if(!loadedPolls){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#pollList').html(li)
        	 $('#pollList').listview("refresh");	
    	}
  }

  function onloadPage() {
      document.addEventListener("deviceready", onDeviceReady, false);
      //comentado porque ejecuta dos veces el online
      //    	document.addEventListener("offline", offline, false);
      //    	document.addEventListener("online", online, false);

      translateMenu();

      if (isFromDesktop()) {
          console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);

    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
    }
    
	



	$('#pollListPage').live('pagebeforeshow',function(event){
		$('#pollListPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
	
			$('#pollListPage').live('pageshow',function(event){
				if(hasFinished){
					getClientPolls();
				}
				
			});
			
			
			$('#pollListPage').live('pagehide',function(event){
				//se pone el hide porque daba problemas al cambiar de pagina
				$('#pollListPage').hide();
			});
			
	

		printPanelMenu('opPolls', isRegisteredAndActive(), "pollListPage");
		

			
	$('#pollPage').bind('pageshow', function(e) {
	      $(this).addClass('ui-page-active');
	});
	
			$('#pollPage').live('pagehide',function(event){
				//vaciamos los valores
				
			});
			
			
	

			
	$('#pollResultsPage').bind('pageshow', function(e) {
			loadPollResults(idPoll2viewRes, showNvotes, titlePoll2viewRes);
	});
	
			$('#pollResultsPage').live('pagehide',function(event){
				//vaciamos los valores
				
			});
			
			
	













    var loadedBoes = false;
    function online(){
        g_hasIconnection = true;
        loadLastBoes();
    }
    function offline(){
        g_hasIconnection = false;
        //se consultan igual, porque se cachean
        loadLastBoes();
    	var noConection = "Sin conexión a internet...";
    	if(!loadedBoes){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#boesList').html(li)
        	 $('#boesList').listview("refresh");	
    	}
  }

  function onloadPage() {
      document.addEventListener("deviceready", onDeviceReady, false);      

      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);      
    if (checkNetworkConnection()){
        online();	
    }else{
        offline();
    }
  }
	



	    $('#boesListPage').live('pageshow', function (event, ui) {	        
	        if ($(ui.prevPage).attr("id") == 'iframePage') {
	            idCurrentOp = 'opBOEs';
	            idPage2fade = 'boesListPage';
	        }
	    });		

	    $('#boesListPage').live('pagebeforeshow', function (event) {	        
	        $('#boesListPage').fadeIn('slow', function () {
	            // Animation complete.			            
	        });
	    });			
	
	$('#boesListPage').live('pagehide',function(event){
		//se pone el hide porque daba problemas al cambiar de pagina		
		$('#boesListPage').hide();
	});
			
	
        
		    printPanelMenu('opBOEs', isRegisteredAndActive(), "boesListPage");
		
















    
    function online(){
        g_hasIconnection = true;           	
    }
    function offline(){    	
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    }

    function onloadPage() {
        console.log("onloadPage");
        document.addEventListener("deviceready", onDeviceReady, false);

        translateMenu();

        if (isFromDesktop()) {
            //console.log("ejecuntado desde ordenador")
            online();
        }
    }

    function onDeviceReady() {
        console.log("onDeviceReady");
        document.addEventListener("offline", offline, false);
        document.addEventListener("online", online, false);

        //comentado, pues ya se ejecutará con los evntos de arriba
//    	if (checkNetworkConnection()){
//    		online();	
//    	}else{
//    		offline();
//        }   

        // en ios no se ejecutara porque no hay boton atras
        //document.addEventListener("backbutton", onBackKeyDown, false);
    }
    

	



	    $('#iframePage').live('pagebeforeshow', function (event) {
	        if (getURLParameter('htmlBack') != "null") {
	            $('#btnBack').show();
	            $('#btnMenu').hide();
	        } else {
	            $('#btnMenu').show();
	            $('#btnBack').hide();
            }
	        $('#iframePage').fadeIn('slow', function () {
	            // Animation complete.			
	        });
	    }); 

	var tit_loading_content = "Cargando contenido...";
	$('#iframePage').live('pageshow', function (event) {
	    var url2load = getURLParameter('url2load');
	    var titmenu = getURLParameter('titmenu');
	    $('#titIframe').html(titmenu);
	    if (getURLParameter('type') == 'pdf') {
	        url2load = 'http://docs.google.com/viewer?url=' + url2load + '&embedded=true';
	    } else {
	        $.mobile.loading('show', { text: tit_loading_content, textVisible: true, theme: 'b' });
	    }
	    if (hasIconnection("Carga de contenido")) {
	        //$('#contentPAge').remove();
	        
	        if (getDevicePlatform() == 'Android') {
	            $('#contentPAge').html('<iframe onload="frameloaded()" id="contentFrame" src="' + url2load + '" width="100%" height="100%" frameborder="0" seamless></iframe>');
	        } else {
	            $('#contentPAge').html('<div style="overflow:auto;-webkit-overflow-scrolling:touch" width="100%" height="100%"><iframe onload="frameloaded()" id="contentFrame" src="' + url2load + '" width="100%" height="100%" frameborder="0" seamless></iframe></div>');
	        }

	        //            '<script type="text/javascript">'+
	        //	      		    'if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {'+
	        //	      		        '$("iframe").wrap(function () {'+
	        //	      		            'var $this = $(this);'+
	        //	      		            'return $("<div />").css({'+
	        //	      		                'width: $this.attr("width"),'+
	        //	      		                'height: $this.attr("height"),'+
	        //	      		                'overflow: "auto",'+
	        //	      		                '"-webkit-overflow-scrolling": "touch"'+
	        //	      		            '});'+
	        //	      		        '});'+
	        //	      		    '}<\/script>');

	        //$('#contentFrame').attr('src', url2load);
	    } else {
	        $.mobile.loading('hide');
	    }
	});

	$('#iframePage').live('pagehide', function (event) {
	    $.mobile.loading('hide');
	    $('#titIframe').html("");
	    //$('#contentFrame').attr('src', 'blank.html');
	    $('#contentPAge').html("");
	});

                function frameloaded() {
                      
				$.mobile.loading('hide');
				if (isFromDesktop() || (!isFromDesktop() && getDevicePlatform() == 'Android')) {					
					var f = document.getElementById("contentFrame");
				     var y = f.contentWindow;
				     
				    f.height = y.document.body.offsetHeight;	
				    f.height = $(window).height() - 50;
				}
			  }
	

	      		    printPanelMenu(getURLParameter('id'), isRegisteredAndActive(), "iframePage");

	      		    $("#btnBack").click(function (e) {
	      		        e.preventDefault();
	      		        e.stopImmediatePropagation();
	      		        $.mobile.changePage(getURLParameter('htmlBack'), { transition: "slide", reverse: true });
	      		        return false;
	      		    });

//	      		    if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {
//	      		        $('iframe').wrap(function () {
//	      		            var $this = $(this);
//	      		            return $('<div />').css({
//	      		                width: $this.attr('width'),
//	      		                height: $this.attr('height'),
//	      		                overflow: 'auto',
//	      		                '-webkit-overflow-scrolling': 'touch'
//	      		            });
//	      		        });
//	      		    }

			














    var loadedCursos = false;
    function online(){
        g_hasIconnection = true;
        getMyFavourites(filter);
    }
    function offline(){
        g_hasIconnection = false;
        getMyFavourites(filter);
    	var noConection = "Sin conexión a internet...";
    	if(!loadedCursos){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
    		$('#curList').html(li)
    		$('#curList').listview("refresh");	
    	}
  }

  function onloadPage() {      
      document.addEventListener("deviceready", onDeviceReady, false);
      //comentado porque ejecuta dos veces el online
      //    	document.addEventListener("offline", offline, false);
      //    	document.addEventListener("online", online, false);

      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
      
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
        }
        
    }



	    var filter = "";
	    $('#curListPage').live('pageshow', function (event) {	        
	        if (getURLParameter('id') == "opCurMyprof") {
	            //filtrar solo por los del perfile del usuario	            
	            filter = loadClientProfilesa3();
	        } else if (getURLParameter('id').indexOf("opCur_") != -1) {
	            //obtener solo los de un perfil determinado
	            filter = getURLParameter('prof');
	        }
	    });		

	    $('#curListPage').live('pagebeforeshow', function (event) {
	        if (getURLParameter('name') != "null") {
	            $('#titCursos').html("Cursos: " + getURLParameter('name'));
	        } else {
	            $('#titCursos').html("Cursos");
            }	        
	        $('#curListPage').fadeIn('slow', function () {
	            // Animation complete.			            
	        });
	    });			
	
	$('#curListPage').live('pagehide',function(event){
		//se pone el hide porque daba problemas al cambiar de pagina		
		$('#curListPage').hide();
	});
			
	

		    printPanelMenu(getURLParameter('id'), isRegisteredAndActive(), "curListPage");
		

	
	$('#cursoPage').live('pageshow',function(event){
				
	});
			
			$('#cursoPage').live('pagehide',function(event){
				//vaciamos los valores				
				$('#initdate').html("");
				$('#title').html("");
				$('#duration').html("");
				$('#place').html("");
				$('#contentText').html("");
			});
			
			
	














    var loadedRss = false;
    function online(){    	
    	g_hasIconnection = true;
    	loadActiveRss();    	
    }
    function offline(){    	
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    	if(!loadedRss){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#rssList').html(li)
        	 $('#rssList').listview("refresh");	
    	}
  }
  function onloadPage() {
      document.addEventListener("deviceready", onDeviceReady, false);
      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
      justOpened = window.sessionStorage.getItem("justOpened");
      if (justOpened != null && justOpened == "true") {
          window.sessionStorage.setItem("justOpened", false);
          $("#nav-panel").panel("open");
      }
      
  }

//    $(document).ready(function () {
//        document.addEventListener("deviceready", onDeviceReady, false);
//        //comentado porque ejecuta dos veces el online
////    	document.addEventListener("offline", offline, false);
////    	document.addEventListener("online", online, false);
//    	
//    	translateMenu();
//    	
//    	if (isFromDesktop()){
//    		//console.log("ejecuntado desde ordenador")
//    		online();
//    	}
//    	
//    });

  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
        // en ios no se ejecutara porque no hay boton atras
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    
    function onBackKeyDown() {
    	if($.mobile.activePage.attr('id') == 'articlePage'){
    		$.mobile.changePage( "#rssPage", { transition: "slide", reverse: true} );
    	}else{
    		history.back();	
    	}    	
    }
	



//comentado xq salían refescos extraños al cambiar de pagin
//	$('#rssListPage').live('pagebeforeshow',function(event){
//		$('#rssListPage').fadeIn('slow', function() {
//		    // Animation complete.			
//		  });
//});

			
	

		    printPanelMenu('opNew', isRegisteredAndActive(), "rssListPage");
		    
		


	   

			$('#rssPage').live('pageshow',function(event){

			});

			
			
			
	

			
			$('#articlePage').live('pageshow',function(event){
				$.mobile.loading( 'show', {text: tit_loading_new,textVisible: true,theme: 'b'});
			});
			
			$('#articlePage').live('pagehide',function(event){
				$.mobile.loading('hide');
			    //$('#articleFrame').attr('src', 'blank.html');
			    $('#contentPAge').html("");
			});			
			function frameloaded() {
				$.mobile.loading('hide');
				if (isFromDesktop()){					
					var f = document.getElementById("articleFrame");
				     var y = f.contentWindow;
				     
				     f.height = y.document.body.offsetHeight;	
				}
			  }
	












    var deviceReady = false;
    function online(){
    	g_hasIconnection = true;
    }
    function offline(){
    	g_hasIconnection = false;
 }

 function onloadPage() {
     document.addEventListener("deviceready", onDeviceReady, false);     

     translateMenu();
 }
    
//    $(document).ready(function(){
//    	document.addEventListener("deviceready", onDeviceReady, false);
//    	document.addEventListener("offline", offline, false);
//    	document.addEventListener("online", online, false);
//    	
//    	translateMenu();
//    	
//    });

 function onDeviceReady() {
     deviceReady = true;
     document.addEventListener("offline", offline, false);
     document.addEventListener("online", online, false);
     document.addEventListener("resume", onResume, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}    	       
    }

    function onResume() {
        // Handle the resume event
        sbean = getSessionBean();
        if (sbean != null && sbean.ClientState == CLIENT_STATE_EMAIL_PENDING) {
            if ($.mobile.activePage.attr('id') == 'regPage') {
                loadRegPage();
            }
        }
    }



	$('#eulaPage').live('pagebeforeshow',function(event){		
		if($('#eulaPage').find('#nav-panel').length == 0){
			console.log("pinta menu eula");
			printPanelMenu('opEula', null, "eulaPage");
			$('#eulaPage').trigger("create");	
		}
		
		$('#eulaPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
			$('#eulaPage').live('pageshow',function(event){				
				if (hasIconnection()){
					var urlJson = getUrlRestService(g_configService, "eula", [g_idApp, g_locale], true);
	        		if(urlJson != null){
	        			$.mobile.loading( 'show', {text: 'Cargando...',textVisible: true,theme: 'b'});
		         		$.getJSON(urlJson, readEulaResp);	
	        		}	        			
				}else{
					$('#eulaText').html(msg_no_connection);
				}
				
			});
			
			function readEulaResp(eulaStr){
	    		$.mobile.loading( 'hide' );	    		
	    		$('#eulaText').html(eulaStr);
	    	}
	

	$('#contactPage').live('pagebeforeshow',function(event){
		getcontactInfo();
		if($('#contactPage').find('#nav-panel').length == 0){			
			printPanelMenu('opContact', null, "contactPage");
			$('#contactPage').trigger("create");	
		}		
		$('#contactPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
	
	function closeLoadingMsg(){
		$.mobile.loading('hide');
	}
	function openMap(address){
	    if (hasIconnection("Ver mapa")) {
	        var urlAdd = encodeURIComponent(address)
	        if (getDevicePlatform() == 'iOS') {
	            window.open('maps:q=' + urlAdd, '_system');	            
	        } else {
	            window.open("http://maps.google.com/maps?q=" + urlAdd, '_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
            }	        
//			$.mobile.loading( 'show', {text: "Cargando mapa...",textVisible: true,theme: 'b'});
//			document.getElementById('mapFrame').contentWindow.initialize(address);
		}
}


	
//	function scale( width, height, padding, border ) {
//	    var scrWidth = $( window ).width() - 30,
//	        scrHeight = $( window ).height() - 30,
//	        ifrPadding = 2 * padding,
//	        ifrBorder = 2 * border,
//	        ifrWidth = width + ifrPadding + ifrBorder,
//	        ifrHeight = height + ifrPadding + ifrBorder,
//	        h, w;
//	 
//	    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
//	        w = ifrWidth;
//	        h = ifrHeight;
//	    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
//	        w = scrWidth;
//	        h = ( scrWidth / ifrWidth ) * ifrHeight;
//	    } else {
//	        h = scrHeight;
//	        w = ( scrHeight / ifrHeight ) * ifrWidth;
//	    }
//	 
//	    return {
//	        'width': w - ( ifrPadding + ifrBorder ),
//	        'height': h - ( ifrPadding + ifrBorder )
//	    };
//	};
//	$( document ).on( "pageinit", function() {
//	    $( "#popupMap iframe" )
//	        .attr( "width", 0 )
//	        .attr( "height", 0 );
//	 
//	    $( "#popupMap iframe" ).contents().find( "#map_canvas" )
//	        .css( { "width" : 0, "height" : 0 } );
//	 
//	    $( "#popupMap" ).on({
//	        popupbeforeposition: function() {
//	            var size = scale( 480, 320, 0, 1 ),
//	                w = size.width,
//	                h = size.height;
//	 
//	            $( "#popupMap iframe" )
//	                .attr( "width", w )
//	                .attr( "height", h );
//	 
//	            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
//	                .css( { "width": w, "height" : h } );
//	        },
//	        popupafterclose: function () {
//            
//	            $( "#popupMap iframe" )
//	                .attr( "width", 0 )
//	                .attr( "height", 0 );
//	 
//	            $( "#popupMap iframe" ).contents().find( "#map_canvas" )
//	                .css( { "width": 0, "height" : 0 } );
//	        }
//	    });
//	});
	


	    $('#regPage').live('pagebeforeshow', function (event) {
	        $('#btnRegPage').remove()
	        if (getSessionBean() == null) {
	            //$('#headerRegPage').prepend('<a id="btnRegPage" href="#loginPage" data-role="button" data-icon="back" data-transition="slide" data-direction="reverse">Volver</a>');
	        } else {
	            $('#volverRegistro').hide();
	            //$('#headerRegPage').prepend('<a id="btnRegPage" href="#nav-panel" data-icon="bars" data-iconpos="notext"></a>');
	        }

	        if ($('#regPage').find('#nav-panel').length == 0) {
	            printPanelMenu('opReg', null, "regPage");
	        }
	        $('#regPage').trigger("pagecreate");
	        $('#regPage').fadeIn('slow', function () {
	            // Animation complete.			
	        });
	    });
			function showFields(showPwd){
				$('#liName').show();
				$('#liSurname').show();
				$('#liUsename').show();
				if(showPwd){
					$('#lipwd').show();	
				}				
				$('#liProfiles').show();
				hideDivInfo();
				$("#btnSave .ui-btn-text").text('Guardar');
				$("#btnSave").removeClass('ui-disabled');
				$("#liProfiles").removeClass('ui-disabled');
				$("#fsProfiles").removeClass('ui-disabled');
			}
			function hideFields(){
				$('#liName').hide();
				$('#liSurname').hide();
				$('#liUsename').hide();
				$('#lipwd').hide();
				$('#liProfiles').hide();
			}
	
			$('#regPage').live('pageshow',function(event, ui){
				if($(ui.prevPage).attr("id") != "eulaRegPage"){
					loadRegPage();	
				}				
				
			});
			
			$('#regPage').live('pagehide',function(event){
				//se pone el hide porque daba problemas al cambiar de pagina
				$('#regPage').hide();
			});
			
			var sbean = null;
			function loadRegPage(){
				//comprobamos el modo en que hay que abrir el formulario
			    if (!isRegistered()) {
			        $("#titRegPage").html("Registro");
					//modo para nuevo user, cargamos los perfiles disponibles
					showFields(true);
					readAppProfiles(window.sessionStorage.getItem("appProfiles"));
					$('#regForm input').removeClass('ui-disabled');
					if (regA3User) {
                        $('#username').addClass('ui-disabled');
                        $('#pwd').addClass('ui-disabled');
                    }
					$('#liChangePwdBtn').hide();
					$('#liEulaReg').show();
	            } else {    
	                $("#titRegPage").html("Mis datos");
	                $('#liEulaReg').hide();
	                //volvemos a hacer login por se ha activado al usuario sin cerrar la app
	                doSilenceseLogin(null, false, false);
					sbean = getSessionBean();
					if (sbean.ClientState == CLIENT_STATE_ACTIVE){
						showFields();
						readAppProfiles(window.sessionStorage.getItem("appProfiles"));						
						loadClientData();
						//loadClientProfiles();
						$('#regForm input').removeClass('ui-disabled');
						$('#username').addClass('ui-disabled');
						$('#liChangePwdBtn').show();
					}else if(sbean.ClientState == CLIENT_STATE_ACTIVE_PENDING){
		                readAppProfiles(window.sessionStorage.getItem("appProfiles"));
						showFields();
						loadClientData();
						$('#regForm input').addClass('ui-disabled');
						//loadClientProfiles();
						showDivInfo(div_info_pending_activate);
						$('#liChangePwdBtn').show();
					}else if(sbean.ClientState == CLIENT_STATE_EMAIL_PENDING){
						//console.log("emailpending");
						hideFields();
						loadClientData();
						showDivInfo(div_info_pending_mail);
						$("#btnSave .ui-btn-text").text('Reenviar');
						$('#liChangePwdBtn').hide();
					}else if(sbean.ClientState == CLIENT_STATE_DESACTIVATED){						
						showFields();
						readAppProfiles(window.sessionStorage.getItem("appProfiles"));
						loadClientData();
						//loadClientProfiles();
						$('#regForm input').addClass('ui-disabled');
						$("#fsProfiles").addClass('ui-disabled');
						showDivInfo(div_info_desactivated);
						$("#btnSave").addClass('ui-disabled');
						$('#liChangePwdBtn').hide();
					}
				}
			}
			
			
			
	

			
			$('#eulaRegPage').live('pageshow',function(event){
				if (hasIconnection()){
					var urlJson = getUrlRestService(g_configService, "eula", [g_idApp, g_locale], true);
	        		if(urlJson != null){
	        			$.mobile.loading( 'show', {text: 'Cargando...',textVisible: true,theme: 'b'});
		         		$.getJSON(urlJson, readEula);	
	        		}	        			
				}else{
		            $('#eulaRegText').html(msg_no_connection);
				}
				
			});
			
			function readEula(eulaStr){				
	    		$.mobile.loading( 'hide' );
	    		$('#eulaRegText').html(eulaStr);
	    	}
	

			
			$("#btnAccept").click(function(e){
				if(!$("#chkAcceptEulaReg").is(":checked")){
					alertNative("Debe leer por completo y aceptar el acuerdo de licencia", null, "Aceptación EULA", "Ok")
					 $('#chkAcceptEulaReg').focus();
				}else{
	 		        e.preventDefault();
	 		     //marcamos el chek del form de registro como leido
		 		       $('#chkAcceptEula').attr( "checked", true).checkboxradio( "refresh" );
	 		       $.mobile.changePage( "#regPage", { transition: "slide", reverse: true, changeHash : false} );	 		       
				}
		    });
	

			$('#loginPage').live('pagebeforeshow',function(event){				
				//si ya esta logueado se redirige a la info de registro
				if(getSessionBean() != null){
					location.href = "config.html?op=opReg1#regPage";
				}
				if($('#loginPage').find('#nav-panel').length == 0){
					printPanelMenu('opReg', null, "loginPage");
					$('#loginPage').trigger("create");
				}
				$('#loginPage').fadeIn('slow', function() {
				    // Animation complete.			
				  });	
				
				
			});
			$('#loginPage').live('pageshow', function (event) {
			    regA3User = false;
			});
			$('#loginPage').live('pagehide',function(event){
				//se pone el hide porque daba problemas al cambiar de pagina
				
				$('#loginPage').hide();
			});
			
	

			
			$('#recoveryPwdPage').live('pageshow',function(event){
				
			});
			
			
	

			
			$('#changePwdPage').live('pageshow',function(event){
				$("#ch_pwd").val("");
				$("#ch_npwd").val("");
				$("#ch_npwd2").val("");
			});
			
			
	













    
    function online(){    	
    	g_hasIconnection = true;
    	    	
    }
    function offline(){    	
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    }

    function onloadPage() {
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("offline", offline, false);
        document.addEventListener("online", online, false);

        translateMenu();

        if (isFromDesktop()) {
            //console.log("ejecuntado desde ordenador")
            online();
        }
        justOpened = window.sessionStorage.getItem("justOpened");
        if (justOpened != null && justOpened == "true") {
            window.sessionStorage.setItem("justOpened", false);
            $("#nav-panel").panel("open");
        }
    }
    
    function onDeviceReady() {
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
        // en ios no se ejecutara porque no hay boton atras
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    
    function onBackKeyDown() {
    	if($.mobile.activePage.attr('id') == 'iframePage'){
    		//$.mobile.changePage( "#resListPage", { transition: "slide", reverse: true} );
    	}else{
    		history.back();	
    	}    	
    }
	



	    $('#noRegPage').live('pagebeforeshow', function (event) {
	        if (getURLParameter('t') == 'linka3') {
	            $('#pNoreg').hide();
	            $('#pNoLink').show();
	            $('#btnRegistro').html("Ir a registro");
	        } else {
	            $('#pNoLink').hide();
	            $('#pNoreg').show();
	            if (isRegistered()) {
	                $('#pNoreg').html("Haz login y accede todos los contenidos");
	                $('#btnRegistro').html("LOGIN");
	            } else {
	                $('#pNoreg').html("Registrate y accede todos los contenidos");
	                $('#btnRegistro').html("REGISTRARME");
	            }

	        }
	        $('#noRegPage').fadeIn('slow', function () {
	            // Animation complete.			
	        });
	    });	

	    $('#noRegPage').live('pageshow', function (event) {
		
	    });

	        $('#noRegPage').live('pagehide', function (event) {				
				
			});			
			
	

	      	    printPanelMenu(getURLParameter('id'), isRegisteredAndActive(), "noRegPage");

	      	    $("#btnRegistro").click(function (e) {	      	        
	      	        if (hasIconnection(tit_reg_data)) {
	      	            if (getSessionBean() == null) {
	      	                openPage(e, "config.html?op=opReg2#loginPage", "opReg");
	      	            } else {
	      	                openPage(e, "config.html?op=opReg1#regPage", "opReg");
	      	            }
	      	            changePageMenu();
	      	        }	 
	      	    });

			














    var loadedRes = false;
    function online(){    	
    	g_hasIconnection = true;
    	//getMyFavourites();
    	loadActiveResources();
    }
    function offline(){    	
    	g_hasIconnection = false;
    	var noConection = "Sin conexión a internet...";
    	if(!loadedRes){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#resList').html(li)
        	 $('#resList').listview("refresh");	
    	}
  }
  function onloadPage() {
      console.log("ready de resourcesList.html");
      document.addEventListener("deviceready", onDeviceReady, false);
      //comentado porque ejecuta dos veces el online
      //    	document.addEventListener("offline", offline, false);
      //    	document.addEventListener("online", online, false);

      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
  }
//    $(document).ready(function () {
//        console.log("ready de resourcesList.html");
//    	document.addEventListener("deviceready", onDeviceReady, false);
//    	//comentado porque ejecuta dos veces el online
//    	//    	document.addEventListener("offline", offline, false);
//    	//    	document.addEventListener("online", online, false);
//    	
//    	translateMenu();
//    	
//    	if (isFromDesktop()){
//    		//console.log("ejecuntado desde ordenador")
//    		online();
//    	}
//    	
//    	    	
//    });

  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
        // en ios no se ejecutara porque no hay boton atras
        document.addEventListener("backbutton", onBackKeyDown, false);
    }
    
    function onBackKeyDown() {
    	if($.mobile.activePage.attr('id') == 'iframePage'){
    		$.mobile.changePage( "#resListPage", { transition: "slide", reverse: true} );
    	}else{
    		history.back();	
    	}    	
    }
	



	$('#resListPage').live('pagebeforeshow',function(event){
		$('#resListPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});			
	
	$('#resListPage').live('pagehide',function(event){
		//se pone el hide porque daba problemas al cambiar de pagina
		
		$('#resListPage').hide();
	});
			
	

		printPanelMenu('opResources', isRegisteredAndActive(), "resListPage");
		

	
	$('#contPage').live('pageshow',function(event){
		if (!resourceLoaded){
			$.mobile.loading( 'show', {text: tit_loading_content,textVisible: true,theme: 'b'});
		}		
	});
			
			$('#contPage').live('pagehide',function(event){
				//vaciamos los valores
				$('#titRes').html("");
				$('#regdate').html("");
				$('#title').html("");
				$('#stitle').html("");
				$('#contentText').html("");
			});
			
			
	

			
	$('#iframePage').live('pageshow',function(event){
		if (!resourceLoaded){
			$.mobile.loading( 'show', {text: tit_loading_content,textVisible: true,theme: 'b'});
		}		
	});
			function showIframeLoading(){
				$.mobile.loading( 'show', {text: tit_loading_content,textVisible: true,theme: 'b'});
			}
			
			$('#iframePage').live('pagehide',function(event){				
				$.mobile.loading('hide');
				$('#btnSaveDoc').hide();
				$('#btnMoreInfo').hide();
				$('#titIframe').html("");
				$('#contentFrame').attr('src', 'blank.html');
			});			
			function frameloaded() {
				$.mobile.loading('hide');
				//if (isFromDesktop() || getDevicePlatform() == 'iOS') {
					var f = document.getElementById("contentFrame");
				     var y = f.contentWindow;
				     
				    f.height = y.document.body.offsetHeight;	
				    f.height = $(window).height() - 50;
				//}
			  }
	

	      	    
//	      	    if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {
//	      	        $('iframe').wrap(function () {
//	      	            var $this = $(this);
//	      	            return $('<div />').css({
//	      	                width: $this.attr('width'),
//	      	                height: $this.attr('height'),
//	      	                overflow: 'auto',
//	      	                '-webkit-overflow-scrolling': 'touch'
//	      	            });
//	      	        });
//	      	    }

			


	    $('#imagePage').live('pageshow', function (event) {
	        //$('#imgContent').append('<a id="m_imgrc" href=""><img  id="m_img" src="" width="95%" height="auto" alt=""></img></a>');
		if (!resourceLoaded){
			$.mobile.loading( 'show', {text: tit_loading_content,textVisible: true,theme: 'b'});
		}		
	});

	function showImgLoading(){
		$.mobile.loading( 'show', {text: tit_loading_content,textVisible: true,theme: 'b'});
	}
	
			$('#imagePage').live('pagehide',function(event){
				//$.mobile.loading('hide');
				//vaciamos los valores
				$('#m_titRes').html("");
				$('#m_regdate').html("");
				$('#m_title').html("");
				$('#m_stitle').html("");
				$('#m_description').html("");
				$('#m_img').attr('src', '');
				$('#m_img').hide();
				$('#m_imgrc').attr('href', '#');
				//$('#imgContent').html("");
			});
			
	

		    var myPhotoSwipe;
		    $('#m_img').load(function () {                
		        // Handler for .load() called.
		        $.mobile.loading('hide');
		        var showToolbar = true;
		        if (getDevicePlatform() == 'Android') {
		            showToolbar = false;
                }
		        myPhotoSwipe = $("#imgContent a").photoSwipe({ captionAndToolbarHide: !showToolbar, allowUserZoom: true, preventSlideshow: true, jQueryMobile: true, enableDrag: false, enableMouseWheel: false, enableKeyboard: false });
		    });
		













        var loadedEvents = false;
        
    function online(){    	
    	g_hasIconnection = true;
    	getEvents();
    }
    function offline(){
        g_hasIconnection = false;
        getEvents();
    	var noConection = "Sin conexión a internet...";
    	if(!loadedEvents){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#obligList').html(li)
        	$('#obligList').listview("refresh");
        	$('#cursosList').html(li)
        	$('#cursosList').listview("refresh");
        	$('#eventsList').html(li)
        	$('#eventsList').listview("refresh");
    	}
  }

  function onloadPage() {
      document.addEventListener("deviceready", onDeviceReady, false);

      translateMenu();

      if (isFromDesktop()) {
          console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);

    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
    	}   
    }
    
	



	$('#eventsListPage').live('pagebeforeshow',function(event){
		$('#eventsListPage').fadeIn('slow', function() {
		    // Animation complete.			
		  });
	});
	
			$('#eventsListPage').live('pageshow',function(event){
								
			});
			
			
			$('#eventsListPage').live('pagehide',function(event){
				//se pone el hide porque daba problemas al cambiar de pagina
				$('#eventsListPage').hide();
			});
			
	

		    printPanelMenu('opCal', isRegisteredAndActive(), "eventsListPage");
		


	    $('#descPage').live('pageshow', function (event) {

	    });

	    $('#descPage').live('pagehide', function (event) {
	        //vaciamos los valores				
	        $('#initdate').html("");
	        $('#title').html("");
	        $('#contentText').html("");
	        $('#titDetails').html("");
	        $('#divMoreInfo').hide();
	    });
			
			
	













    var loadedNvers = false;
    function online(){
        g_hasIconnection = true;
        loadLastNvers();
    }
    function offline(){
        g_hasIconnection = false;
        loadLastNvers();
    	var noConection = "Sin conexión a internet...";
    	if(!loadedNvers){
    		var li = "<li class='ui-disabled'><h1>"+ noConection +"</h1></li>";
        	$('#nversList').html(li)
        	 $('#nversList').listview("refresh");	
    	}
  }

  function onloadPage() {  
      document.addEventListener("deviceready", onDeviceReady, false);      

      translateMenu();

      if (isFromDesktop()) {
          //console.log("ejecuntado desde ordenador")
          online();
      }
  }


  function onDeviceReady() {
      document.addEventListener("offline", offline, false);
      document.addEventListener("online", online, false);
    	if (checkNetworkConnection()){
    		online();	
    	}else{
    		offline();
      }
    }
	



	    $('#nversListPage').live('pageshow', function (event, ui) {
	        if ($(ui.prevPage).attr("id") == 'iframePage') {
	            idCurrentOp = 'opNewVersions';
	            idPage2fade = 'nversListPage';
	        }
	    });		

	    $('#nversListPage').live('pagebeforeshow', function (event) {	        
	        $('#nversListPage').fadeIn('slow', function () {
	            // Animation complete.			            
	        });
	    });			
	
	$('#nversListPage').live('pagehide',function(event){
		//se pone el hide porque daba problemas al cambiar de pagina		
		$('#nversListPage').hide();
	});
			
	

		    printPanelMenu('opNewVersions', isRegisteredAndActive(), "nversListPage");
		


   
        function initialize(address) {
        	
        	var geoCoder = new google.maps.Geocoder(address)
            // a new object for the request I called "request" , you can put there other parameters to specify a better search (check google api doc for details) ,
            // on this example im going to add just the address
        	var request = {address:address};
        	 geoCoder.geocode(request, function(result, status){
                 // as a result i get two parameters , result and status.
                 // results is an  array tha contenis objects with the results founds for the search made it.
                 // to simplify the example i take only the first result "result[0]" but you can use more that one if you want
    
                 // So , using the first result I need to create a  latlng object to be pass later to the map
                 var latlng = new google.maps.LatLng(result[0].geometry.location.lat() + 0.000, result[0].geometry.location.lng() -0.000);
                 var latlngMark = new google.maps.LatLng(result[0].geometry.location.lat(), result[0].geometry.location.lng());
    
         // some initial values to the map
         var myOptions = {
           zoom: 15,
           center: latlng,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         };
    
              // the map is created with all the information
                var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
              
                google.maps.event.addListenerOnce(map, 'idle', function() {
                	window.parent.closeLoadingMsg();
                  });
    
              // an extra step is need it to add the mark pointing to the place selected.
             var marker = new google.maps.Marker({position:latlngMark,map:map,title:''});
    
              
     })
        	
        	
            /**var myLatlng = new google.maps.LatLng( 51.520838, -0.140261 );
            var myOptions = {
                zoom: 15,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
            **/
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
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Campo obligatorio.",
		remote: "Por favor, rellena este campo.",
		email: "Dirección de correo no válida",
		url: "Por favor, escribe una URL válida.",
		date: "Por favor, escribe una fecha válida.",
		dateISO: "Por favor, escribe una fecha (ISO) válida.",
		number: "Por favor, escribe un número entero válido.",
		digits: "Por favor, escribe sólo dígitos.",
		creditcard: "Por favor, escribe un número de tarjeta válido.",
		equalTo: "Por favor, escribe el mismo valor de nuevo.",
		accept: "Por favor, escribe un valor con una extensión aceptada.",
		maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
		minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
		rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
		range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
		max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
		min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
	});
}(jQuery));

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
    initialize: function () {
        console.log("init a3asesor mobile");
        window.sessionStorage.setItem("justOpened", true);
        if (fromDesktop) {
            //obtenemos datos que se mantendrán en toda la sesion
            loadAppProfiles();
            if (getSessionBean() != null) {
                location.href = 'app/views/rssList.html';
            } else {
                location.href = 'app/views/noregPage.html?id=opNew';
            }

            //location.href = 'app/views/eula.html';
        } else {
            this.bindEvents();
        }

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        //document.addEventListener("offline", checkNetworkConnection, false);
        //document.addEventListener("online", checkNetworkConnection, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {    
        //navigator.splashscreen.show();
        //checkNetworkConnection();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');


        listeningElement.setAttribute('style', 'display:none;');


        //sleep(3000)
        receivedElement.setAttribute('style', 'display:block;');

        runApp();
    }
};

function runApp(){
	var appActive = true;

    var parentElement = document.getElementById('deviceready');
    var inactiveElement = parentElement.querySelector('.inactive');
    var receivedElement = parentElement.querySelector('.received');

    
    
    if (checkNetworkConnection()){
    	//comprobamos que la app esté activa
    	$.ajax({
			  url: getUrlRestService(g_configService, "active", [g_idApp], false), async: false, dataType: 'json',
			  success: function (response) {
				  if(response == "False"){
					  appActive = false;	  
				  }
			  }
			});
        if (appActive) {
            //obtenemos datos que se mantendrán en toda la sesion
            loadAppProfiles();

    		//haceoms login silencioso
    		doSilenceseLogin(null, false, true);
      		//solo mostramos el eula si el usuario está registrado y ha cambiado el eula
      		if(isRegistered()){
      			//comprobamos si tiene que aceptar un nuevo eula
      			var req = new Object()
      			req.sbean = getSessionBean();
      			req.idapp = g_idApp;
      			var urlJson = getUrlRestService(g_configService, "newEula", null, false);
      			if (urlJson != null){
      				$.ajax({
          			  url: urlJson, type: "POST", async: false, dataType: 'json',
          			  contentType: "application/json", data: JSON.stringify(req),
          			  success: function (response) {
          			    // do stuff with response.
          			      //navigator.splashscreen.hide();
          				  if (response == "true"){
          					  location.href = 'app/views/eula.html';
          			      } else {          			        
          			        if (getSessionBean() != null) {
          			            location.href = 'app/views/rssList.html';
          			        } else {
          			            location.href = 'app/views/noregPage.html?id=opNew';
          			        }
          					
          				  }        				  
          				  
          			  }
          			});
      			}

                } else {
                //navigator.splashscreen.hide();
                 if (getSessionBean() != null) {
                     location.href = 'app/views/rssList.html';
                 } else {
                     location.href = 'app/views/noregPage.html?id=opNew';
                 }
      		}
      		
    		      	
    	}else{

    		receivedElement.setAttribute('style', 'display:none;');
    		alertNative("La aplicación se encuentra en mantenimiento, intente acceder más tarde.", null, "App en mantenimiento", "Ok")
    		inactiveElement.setAttribute('style', 'display:block;');
    		document.addEventListener("resume", runApp, false);
    	}
    	
    }
//    else if(lastEulaAccepted == null){
//    	//no tiene internet y nunca ha aceptado el eula
//    	//no dejamos iniciar la app
//    	alertNative("Se requiere conexión a internet para ejecutar la aplicación por primera vez.", null, "Sin conexión", "Ok")
//    	document.addEventListener("online", runApp, false);
//    }
    else{
    	//no internet
        //TODO decidir a que op de menu ir, pues si no hay internet no acceder a los rss
        //navigator.splashscreen.hide();
        if (getSessionBean() != null) {
            location.href = 'app/views/rssList.html';
        } else {
            location.href = 'app/views/noregPage.html?id=opNew';
        }
    }
}

function alertNative(msg, callbackFunc, title, btnName){
	if(navigator.notification != undefined){
		navigator.notification.alert(msg, callbackFunc, title, btnName);	
	}else{
		alert(msg);
	}		
}



function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}


/**
 * 
 * Phonegap share plugin for Android
 * Kevin Schaul 2011
 *
 */

var Share = function() {};
            
Share.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Share', '', [content]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.share) {
    window.plugins.share = new Share();
}
