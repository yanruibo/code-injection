
dictInObj = {
	

	/*----INDEX PAGE------------------*/
	'index_title': 'Casos de éxito',

	/*--------------------------------*/

	/*----SETTINGS PAGE------------------*/
	'constES_ES':'Español',
	'constEN_GB':'English',
	'prefs_Idioma':'Idioma:',
	'prefs_dispId':'Id de dispositivo:',
	/*--------------------------------*/

};

dictInObj = {
	/*----INDEX PAGE------------------*/
	'index_Title' : 'Case Studies By Solution',
	/*--------------------------------*/
	/*----SETTINGS PAGE------------------*/
	'constES_ES':'Español',
	'constEN_GB':'English',
	'prefs_Idioma':'Language:',
	'prefs_dispId':'Dispositive Id:',
	/*--------------------------------*/
	
}; 

//Arranque de sistemas, configuraciones, etc etc etc




var GestorIdiomas;
var GestorPrefs;

var CatalogManager;

var History;

var ActualPage;
//La página actual

var ConstPages = {
	'Element_Menu' : 'divMenu',

};

/*
 This is the frist method raised
 * */
function init() {

	CatalogManager = new _catalogManager();
	CatalogManager.init();

	GestorPrefs = new _GestorPrefs();
	Utils = new _Utils();
	GestorIdiomas = new _GestorIdiomas();

	if(!$.objectHasContent(GestorPrefs.getPref('LANGUAGE_ID'))) {
		GestorPrefs.setPref('LANGUAGE_ID', 'en_GB');
	}

	History = new _History();

	GestorIdiomas.init(initCallBack);

}

//Encargado de comprobar que los sistemas estan cargados y por tanto cambiar de pagina a index
//Es invocado al acabar de cargar todos los subsistemas
var core_arrancado = false;
function initCallBack() {
	if(!core_arrancado) {
		if(GestorIdiomas != null) {
			core_arrancado = true;

			browseFromClick('../comun/pages/index/index.html', 'none');
		}
	}
}

//Controlador hacia atras para emplear en los botones y en los eventos
function backAction(e) {

	if(e != null)
		e.preventDefault();

	if(History.size() == 0) {
		navigator.app.exitApp();
	} else {//Hay historia (Vaciar siempre la pila antes de cambiar)
		if(History.topPage() == '#index') {
			//Como es index, vacio la pila
			History.clear();
			browse($.mobile.path.get() + "../index/index.html", "none");

		} else if(History.topPage() == '#typeList') {
			History.pop();
			browse($.mobile.path.get() + "../typeList/typeList.html", "none");

		} else if(History.topPage() == '#settings') {
			History.pop();
			browse($.mobile.path.get() + "../settings/settings.html", "none");

		}
	}
}

/**Hace de controlador para cuando en los Android se vuelve atrás con el botón*/
function createBackController() {
	document.addEventListener("backbutton", function(e) {
		backAction(e);
	}, false);

}

//Se llama desde todas las pantallas para ejecutar las traducciones, la codBar, publicidad...
function initPage(page, callback) {

	var pageId = page.id;
	var dirName = "./" + pageId;
	var cssPath = dirName + ".css";
	var jsPath = dirName + ".js";

	if(!$.objectHasContent($("script[src='" + jsPath + "']").attr('src'))) {//We only insert it once

		$('head').append('<link rel="stylesheet" href="' + cssPath + '" />');

		var head = document.getElementsByTagName("head")[0];
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = jsPath;
		script.charset = "utf-8";
		script.onload = function() {
			pageInitialized(page, callback);
		};
		script.onerror = function(e) {
			console.log("Fallo en nuestro apaño de getScript");
			pageInitialized(page);
		};

		head.appendChild(script);
	}else{pageInitialized(page, callback);}

}

function pageInitialized(page, callback) {

	GestorIdiomas.refresca(page);
	ActualPage = page.id;
	$(page).trigger('create');
	if(callback != null)
		callback();
}

/*Only set the required height to run with overflow scroll*/
function createScroll(contentId, elemetToRemove) {

	var content = $('#' + contentId);
	var mobileHeight = $(window).height();
	var contentSize = mobileHeight;
	var margin = 35;

	setContentControlHeight($('#' + ActualPage), $(window).height() - margin);
	console.log(ActualPage+': '+($(window).height() - margin));

	if($.objectHasContent(elemetToRemove)) {
		contentSize = contentSize - elemetToRemove.height();
	}
	setContentControlHeight(content, contentSize - margin);
	
	console.log(contentId+': '+(contentSize - margin));
}

function setContentControlHeight(content, contentSize) {

	content.height(contentSize);
	content.css('max-height', contentSize);
	content.css('height', contentSize);
	content.css('min-height', contentSize);
	$($.mobile.activePage).trigger('create');

}

/**
 * Gestor de Preferencias
 */
function _GestorPrefs() {
	var me = this;

	me.setPref = function(key,value){
		return window.localStorage.setItem(key, value);
	}
	
	me.getPref = function(key){
		return window.localStorage.getItem(key);
	}
	
	me.borraPref = function(key){
		return window.localStorage.removeItem(key);
	}
	
	me.clear = function(){
		return window.localStorage.clear();
	}
	
	me.setSesionPref = function(key,value){
		return window.sessionStorage.setItem(key, value);
	}
	
	me.getSesionPref = function(key){
		return window.sessionStorage.getItem(key);
	}
	
	me.borraSessionPref = function(key){
		return window.sessionStorage.removeItem(key);
	}
	
	me.clearSession = function(){
		return window.sessionStorage.clear();
	}
}


var ConstF = {
	
	'base_WS' : 'http://10.223.1.139:7003/esb/services/aspa', //WIFI
	'timeoutRequest' : 1*20*1000, //Timeout para hacer las peticiones al WS
	'POST' : 'POST',
	'GET' : 'GET',
	'JsonContent' : 'application/json; charset=utf-8',
	'JsonTipoDatos' : 'json',
	'mobileAndroid':'0',
	'mobileIphone':'1'
};



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
	
		var lang = GestorPrefs.getPref('LANGUAGE_ID');
		if (!lang || lang=='undefined'){//Por defecto Castellano
			lang="en_GB";
		}	
		
		me.setLang(lang,callBack);
	}


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
	}
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
	}
	/**
	 * Fija el lenguaje a emplear (Si existe otro, automaticamente se actualizara la pagina)
	 * @param {Object} id El mensaje a fijar
	 * @param {Object} callback callback para cargar dinamicamente el diccionario
	 * devuelve true si lleva a cabo, false si falla o no existe el lenguaje
	 */
	me.setLang = function(id,callback) {
        //console.log('Fijar nuevo idioma'+id);
        GestorPrefs.setPref('LANGUAGE_ID',id);
		if(lang_disponibles.indexOf(id) != -1) {
			obtenerDicc(id,callback);
			lang_actual = id;
			//TODO:Refrescar traduccion al vuelo
			return true;
		} else {
			return false;
		}
	}

	me.getLang = function() {
		return lang_actual;
	}
	
	me.getAvailableLangs = function(){
		return lang_disponibles;
	}
	
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
            ruta = "../comun/lang/"+id+"/js/resources.js";
        } else {
            ruta = "../lang/"+id+"/js/resources.js";
        }
        //console.log('ruta diccionario:'+ruta);
        
        //TODO:GetScript esta dando problemas en Android 4.0 de momento lo cambiamos por nuestra solucion adhoc
		/**$.getScript(ruta, function(data, textStatus, jqxhr) {
			console.log('Carga diccionario:'+JSON.stringify(dictInObj));
			jsIn.addDict(dictInObj);
            if(callback!=null){
                callback();
            } 
		}).fail(function(jqxhr, settings, exception) {
  				console.log(JSON.stringify(jqxhr));
  				console.log(settings);
  				console.log(exception);
			});**/
		
		var head = document.getElementsByTagName("head")[0];
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = ruta;
		script.charset ="utf-8";
		script.onload = function() { 
			//Todo ok cargamos el diccionario
			//console.log('Carga diccionario:'+JSON.stringify(dictInObj));
			jsIn.addDict(dictInObj);
            if(callback!=null){
                callback();
            } 
		 };
		script.onerror = function(e) { console.log("Fallo en nuestro apaño de getScript") };
		head.appendChild(script);
	}
	
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
	}
	
	me.getLiteral = function(idLiteral){
		return __(idLiteral);
	}
	
	me.translateFlip = function (flipId, label0Text, label1Text){
		var mySlider     = $('#' + flipId);
		var activeLabel1  = $(mySlider).parent().find('span.ui-slider-label:first');
	    var activeLabel0  = $(mySlider).parent().find('span.ui-slider-label:last');
		    
		activeLabel0.text(label0Text);
		activeLabel1.text(label1Text);
	}
}

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
function browseFromClick(relativeUrl, transition,params,isMenu){

	if(true==isMenu){
		History.clear();
		History.push('#index');
	} else {
		//Guardamos primero en la historia la pag actual
		var id = '#'+$.mobile.activePage.attr('id');
		if(id!='#init'){
			//console.log('HISTORIA: '+id);
			History.push(id,params);
		}
	}
	
	browse(relativeUrl,transition);
}

//Cuando se invoca con isMenu, deja la historia lista para que al volver atras vuelva a index
function browse(relativeUrl, transition){
	var id = relativeUrl.replace(".html","");
	
	
	if(ActualPage != id){//Solamente se navega si se cambia de página
		$.mobile.showPageLoadingMsg(); 
		
		$.mobile.changePage(relativeUrl, {transition: transition});
	}
}


function browseTypesInGroup() {

	browseFromClick('../typeList/typeList.html', 'none');
}

function browseSettings() {

	browseFromClick('../settings/settings.html', 'none');
}

function browseMain() {

	browseFromClick('../index/index.html', 'none');
}

function openPdfFile(pdfName){
	window.plugins.fileOpener.open(pdfName + '.pdf');	
};

jQuery.asyncTimerExecution  = function (method,interval, flag)
{
	method();
	setTimeout(
		function(){
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
	
	return sortOnKeys(result);
}

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
}

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
				if(_val==null){_val='null'};
				if(_elem==null){_elem='null'};
				if(_elem != _val){
					ret=null;
				}
		}
		
		if(ret!=null && ret!= 'undefined') result.push(this);
	
	});	

	return result;
}

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
			if(_val==null){_val='null'};
			
				if(this[JSONParameters[i].NAME].toString() == _val){
					ret=this;
					break;
			}
		}
		
		if(ret!=null && ret!= 'undefined') result.push(this);
	});	

	return result;
}

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
}

/*
 * Hace las comprobaciones de null, '' y undefined en el objeto para saber si tiene valor
 */
jQuery.objectHasContent = function (obj){
	return (obj!=null && obj!='' && obj!= 'undefined' && obj!='null');
}

jQuery.notNullString = function (str){
	if ($.objectHasContent(str))
		return str;
	else
		return '';
}




function writeFile(_data, _fileName, _folder, _callback) {
	console.log(_data);
	// se localiza la carpeta root
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(_fileSys) {

		//console.log("fileSys:" + _fileSys.name)
		// se obtiene la carpeta local, si no existe la crea
		_fileSys.root.getDirectory(_folder, {
			create : true,
			exclusive : false
		}, function(_directory) {

			//console.log("directory:" + _directory.name);
			//console.log("nombre: " + _fileName);

			// se crea y se obtiene el archivo
			_directory.getFile(_fileName, {
				create : true,
				exclusive : false
			}, function(_file) {

				//console.log("fichero creado:" + _file.fullPath);

				// se crea el writer
				_file.createWriter(function(_writer) {

					//console.log("writer creado");

					// se declara la función callback
					_writer.onwriteend = function(evt) {
						console.log("escritura correcta");
						_callback(_file);
					};

					_writer.onerror = function(_err) {
						resOnError("Error en la escritura del fichero (escribeFile)", _err);
					}
					// escribo el contenido
					_writer.write(_data);
				}, function(_err) {
					resOnError("Error al crear el writer (escribeFile)", _err);
				});
			}, function(_err) {
				resOnError("Error al obtener el fichero (escribeFile)", _err);
			});
		}, function(_err) {
			resOnError("Error al obtener el directorio (escribeFile)", _err);
		});
	}, function(_err) {
		resOnError("Error al obtener el filesys (escribeFile)", _err);
	});
}

function createFolder(_folder, _callback) {

	var _folders = _folder.split("/");
	var _raiz = _folders[0];
	console.log("folders:" + _folders);
	console.log("raíz: " + _raiz);

	_folders.splice(0, 1);
	console.log("folders en la llamada: " + _folders);

	function creaFolderBase(_fileSys, _raiz, _folders, _callback) {

		console.log("fileSys:" + _fileSys.name)
		// se obtiene la carpeta local, si no existe la crea

		_fileSys.root.getDirectory(_raiz, {
			create : true,
			exclusive : false
		}, function(_directory) {

			_raiz = _raiz + "/" + _folders[0];
			_folders.splice(0, 1);

			console.log("folders (bucle):" + _folders);
			console.log("raíz (bucle): " + _raiz);
			if(_folders.length > 0) {

				creaFolderBase(_fileSys, _raiz, _folders, _callback);
			} else {

				console.log("creando el último raíz: " + _raiz);
				_fileSys.root.getDirectory(_raiz, {
					create : true,
					exclusive : false
				}, function(_directory) {
					_callback(_directory);
				}, function(_err) {
					resOnError("Error al crear el directorio (creaFolderBase)", _err);
				});
			}
		}, function(_err) {
			resOnError("Error al obtener el directorio (creaFolderBase)", _err);
		});
	}


	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(_fileSys) {
		creaFolderBase(_fileSys, _raiz, _folders, _callback);
	}, function(_err) {
		resOnError("Error al obtener el filesys (creaFolderBase)", _err);
	});
}

function deleteFolder(_folder, _callback) {

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(_fileSys) {

		console.log("fileSys:" + _fileSys.name)

		// se obtiene la carpeta
		_fileSys.root.getDirectory(_folder, {
			create : true,
			exclusive : false
		}, function(_directory) {

			console.log("Se borra la carpeta: " + _directory.name);
			_directory.removeRecursively(_callback, resOnError);
		}, function(_err) {
			resOnError("Error al obtener el directorio (borraFolder)", _err);
		})
	}, function(_err) {
		resOnError("Error al obtener el filesys (borraFolder)", _err);
	});
}

function moveFile(_rutaFrom, _folder, _fileName, _callback) {

	// console.log("entry: " + _entry);
	// console.log("folder: " + _folder);
	// console.log("fotoName: " + _fotoName);
	
	readFile(_rutaFrom + _fileName,function(_entry){
		
			// crea la carpeta si no existe
		creaFolder(_folder, function(_directory) {
	
			console.log("copiando...");
			console.log("directory path:" + _directory.fullPath);
			console.log("nombre: " + _fileName);
			console.log("entry:" + _entry.fullPath);
	
			//se copia a la carpeta local obtenida
			_entry.copyTo(_directory, _fileName, _callback, function(_err) {
				resOnError("Error al copiar el archivo (mueveFile)", _err);
			});
	
		});
	});


}

function readFile(_ruta,okCB) {

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(_fileSys) {
alert(_ruta);
		_fileSys.getFile(_ruta, {
			create : false
		}, function(_entry) {
			okCB(_entry);	
		}, function(_err) {
			resOnError("Error al obtener el fichero (readFile)", _err);
		});
	}, function(_err) {
		resOnError("Error al obtener el filesys (readFile)", _err);
	})
}

function deleteFile(_ruta) {

	console.log("eliminando...");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(_fileSys) {

		_fileSys.root.getFile(_ruta, {
			create : false
		}, function(_entry) {

			console.log("fichero a eliminar localizado: " + _entry.fullPath);
			_entry.remove(function() {

				console.log("Fichero " + _entry.fullPath + " eliminado correctamente");
			}, function(_err) {
				resOnError("Error al eliminar el fichero (eliminaFile)", _err);
			});
		}, function(_err) {
			resOnError("Error al obtener el fichero (eliminaFile)", _err);
		});
	}, function(_err) {
		resOnError("Error al obtener el filesys (eliminaFile)", _err);
	})
}

function resOnError(_mensaje, _error) {

	console.log("Error en el proceso de ficheros: " + _mensaje + ", código: " + _error.code);
}



/**Utilidades varias*/
function _Utils() {
    
    var me = this;
    
    /* Devuelve el id del dispositivo.
     * Dependiente de 'device' */
    me.getUniqueId = function() {
        return device.uuid;
    }
    
    
    /* Devuelve el nombre del dispositivo.
     * Dependiente de 'device' */
    me.getName = function() {
        return device.name;
    }
    
    /* Devuelve la versión de Cordova.
     * Dependiente de 'device' */
    me.getCordova = function() {
        return device.cordova;
    }
    
    /* Devuelve la plataforma.
     * Dependiente de 'device' */
    me.getPlatform = function() {
        return device.platform;
    }
    
    /* Devuelve la versión.
     * Dependiente de 'device' */
    me.getVersion = function() {
        return device.version;
    }
    
    /* Devuelve si es Android. */
    me.isAndroid = function() {
        return navigator.userAgent.toLowerCase().indexOf('android') >= 0;
    }
    
    /* Devuelve si es Android Mobile. */
    me.isAndroidMobile = function() {
    	var lowerUserAgent =  navigator.userAgent.toLowerCase();
        return lowerUserAgent.indexOf('android') >= 0 && lowerUserAgent.indexOf('mobile') >= 0;
    }
    
     /* Devuelve si es Android Tablet. */
    me.isAndroidTablet = function() {
    	var lowerUserAgent =  navigator.userAgent.toLowerCase();
        return lowerUserAgent.indexOf('android') >= 0 && !lowerUserAgent.indexOf('mobile') >= 0;
    }
    
    /* Devuelve si es Iphone. */
    me.isIphone = function() {
        return navigator.userAgent.toLowerCase().indexOf('iphone') >= 0;
    }
    
    /* Devuelve si es Ipod. */
    me.isIpod = function() {
        return navigator.userAgent.toLowerCase().indexOf('ipod') >= 0;
    }
    
    /* Devuelve si es Ipad. */
    me.isIpad = function() {
        return navigator.userAgent.toLowerCase().indexOf('ipad') >= 0;
    }
    
    /* Devuelve si es Ipad. */
    me.isWindowsPhone = function() {
        return navigator.userAgent.toLowerCase().indexOf('windows phone') >= 0;
    }
    
    /* Devuelve true o false si la posicion es landscape o portrait en funcion del alto y el ancho de la ventana */
    me.isLandscape= function() {
        var anchoVentana = window.innerWidth;
        var altoVentana = window.innerHeight;
        
        return parseInt(anchoVentana) > parseInt(altoVentana);
    }
}

function _catalogManager() {
	var me = this;

	var _filteredCases = [];
	var _selectedGroupKey = "";
	var _solutionGroups= [];
	
	var _allCases = [];

	me.init = function() {
	
        _solutionGroups = C_GROUPS;
		_allCases=C_ALL_CASES;
	}

	me.GROUPS = function() {
		return _solutionGroups
	};
	me.FILTERED_CASES = function() {
		return _filteredCases
	};
	me.setSelectedGroupKey = function(idGroup) {
		_selectedGroupKey = idGroup
	};
	me.getSelectedGroup = function() {
		return $.getSingleObjectByPKFromJSONArray(_solutionGroups,"key",_selectedGroupKey);
	};

	me.setCasesByGroup = function() {
		_params = [{
			'NAME' : 'groupKey',
			'VALUE' : _selectedGroupKey
                   }];
		_filteredCases = $.getFilteredArrayFromJSONArray(C_GROUPS_CASES, _params);
	}

	me.getCaseByKey = function(key) {
		var _case = $.getSingleObjectByPKFromJSONArray(_allCases,'key',key);
		return _case;

	}
	

}

/*
 FICHERO DE JAVASCRIPT DE PÁGINA. CONTIENE EL CÓDIGO Y EVENTOS DE LA MISMA
 * */
function loadSettings() {

	var _htmlData = "";

	_htmlData += '<option value="es_ES" ';
	if(GestorIdiomas.getLang() =='es_ES') _htmlData += 'selected ';
	_htmlData += '>'+GestorIdiomas.getLiteral('constES_ES')+'</option>';
	_htmlData += '<option value="en_GB" ';
	if(GestorIdiomas.getLang() =='en_GB') _htmlData += 'selected ';
	_htmlData += '>'+GestorIdiomas.getLiteral('constEN_GB')+'</option>';

	$('#cmbIdioma').html(_htmlData).trigger('create');

	$('#dispGUID').html(Utils.getUniqueId());
}

function SetLanguage() {
	var lang = $('#cmbIdioma').val();

	if(GestorIdiomas.getLang() != lang) {
		GestorIdiomas.setLang(lang, initCallBack);
	}
}


				$('#settings').on('pageshow', function(event) {
					initPage(this, contentPageLoaded);

				});

				/*
				 En este mĂŠtodo es donde se debe hacer todo lo que se quiera una vez la pĂĄgina se ha inicializado.
				 * */
				function contentPageLoaded() {
					loadSettings();
				}

			

/*
 FICHERO DE JAVASCRIPT DE PÁGINA. CONTIENE EL CÓDIGO Y EVENTOS DE LA MISMA
 * */
var _selectedKey='';
				

function setScrollOnElements(){
	clearSelected();
	if (ActualPage == 'typeList'){
		setTimeout(function () {
			setScrollList();
			setScrollDetail();
		}, 300);
	}
	
}

function setScrollList(){
	createScroll('panelMainList',$('#panelMainHead'));
	setSelected();
	};
function setScrollDetail(){
	
	var _section = $('#contentTitleSection');
	
	
	if(_section.css('display')== "none") _section = null;//If not visible don't use it
	
	createScroll('contentMainSection',_section);
	};
	

			
function loadCases(divId){
		$('#index_Title').html(CatalogManager.getSelectedGroup().subtitle);
		$('#index_Title').addClass('highlight');
		
		$('#index_TitleInside').html(CatalogManager.getSelectedGroup().subtitle);
		$('#index_TitleInside').addClass('highlight');
				
				
		var _style="<style>.highlight{color:"+CatalogManager.getSelectedGroup().bgColor+"}</style>";
	
		var _cases = CatalogManager.FILTERED_CASES();
		var _hmtlData= '<div>' +  _style + '<ul data-role="listview"  data-inset="true" data-theme="btnList" data-icon="false" class="mainButtonList" id="caseList">';
	
	
		for(var i = 0; i < _cases.length; i++) {
			var _case = _cases[i];
					
			_hmtlData+='<li id="C_'+_case.studyCase.key +'"><a href="javascript:setCaseDetail(\''+_case.studyCase.key +'\');"> <img src="' + locationContent+ 'images/clients/'+_case.studyCase.ico +'" class="icono-btnList"/>';
			_hmtlData+='<div class="label-botones-title">' + _case.studyCase.title + '</div>';
			_hmtlData+='<div class="label-botones-subtitle">' + _case.studyCase.subtitle + '</div>';
			_hmtlData+='<div class="label-botones-detail">' + _case.studyCase.description + '</div>';
			_hmtlData+='</a></li>';
		
		}
	
		_hmtlData+='</ul></div>';
		
		
		$('#' + divId).html(_hmtlData).trigger('create');

		selectFirstCaseWhenLandscape();
		setScrollList();
	
};

function selectFirstCaseWhenLandscape(){
		if(Utils.isLandscape()){//landscape
			setCaseDetail(CatalogManager.FILTERED_CASES()[0].studyCase.key);
		}
}

function setCaseDetail(idCase){
	var _case = CatalogManager.getCaseByKey(idCase);
	
	$('#panelMain').addClass('mainPanelClicked');
	$('#panelDetail').addClass('detailPanelClicked');
	
	$('#detailTitle').html(_case.title);
	//$('#detailSubTitle').html(_case.title);
	$('#detailContent').html(_case.content);
	
	
	var _htmlImg = '<img src="' + locationContent + 'images/clients/'+_case.backgroundImage +'" class="icon-detail"/>';
	$('#detailimg').html(_htmlImg);
	
	
	if(_case.pdfUrl !='#'){
		var _htmlPdf= '<div class="pdfLink highlight" onclick="openPdfFile(\'pdf/'+_case.pdfUrl+'\')" class="highlight">Download the full case study > </div> ';
		$('#pdfContent').html(_htmlPdf);
	}else{
		$('#pdfContent').html("");
	}

	setScrollOnElements();
	
	_selectedKey = _case.key;
	clearSelected();
	setSelected();
	

};

function backDetail(){
	$('#panelMain').removeClass('mainPanelClicked');
	$('#panelDetail').removeClass('detailPanelClicked');
	
	setScrollList();
	
};

function clearSelected(){
	$('#caseList li').css('background','');
	$('#caseList li div').css('color','');
};

function setSelected(){
	if(Utils.isLandscape()){//landscape
		if($('#panelMain').css('display')!='none'){//Only if it is showed
			$('#C_' + _selectedKey).css('background',CatalogManager.getSelectedGroup().bgColor);
			$('#C_' + _selectedKey + ' div').css('color','white');
		}
	}
}



				$('#typeList').on('pageshow', function(event) {

					initPage(this, contentPageLoaded);

				});

				/*
				 En este mĂŠtodo es donde se debe hacer todo lo que se quiera una vez la pĂĄgina se ha inicializado.
				 * */
				function contentPageLoaded() {
					
					window.removeEventListener("orientationchange", setScrollOnElements, false);
					window.addEventListener("orientationchange", setScrollOnElements, false);
					
					loadCases('panelMainList');
								
				}
			

/*
 FICHERO DE JAVASCRIPT DE PÁGINA. CONTIENE EL CÓDIGO Y EVENTOS DE LA MISMA
 * */
			
function loadGroups(divId){
	var _hmtlData = "";
	var _groups = CatalogManager.GROUPS();

	for(var i = 0; i < _groups.length; i++) {
		var _group = _groups[i];
		
		_hmtlData+='<div onclick="navigateDetail('+_group.key+');" class="mainButton" ';
	
		_hmtlData+='style="background: url(' + locationContent + 'images/groups/'+_group.backgroundImage+') 50% 50% no-repeat;" ';
		_hmtlData+='id="G_'+_group.key+'">'
		
		_hmtlData+='<span class="insideDiv" style="background-color:'+_group.bgColor+';" ><span class="insideLabel">' +  _group.title + '</span></span>'
		
		_hmtlData+='</div>';
	
		//_hmtlData+='<a href="javascript:browseTypesInGroup('+_group.key+');" id="G_'+_group.key+'" data-icon="custom"';
		//_hmtlData+='data-role="button" data-theme="mainButton">'+_group.title+'</a>';
	}





	$('#' + divId).html(_hmtlData).trigger('create');
	
}
			


function navigateDetail(idGroup){
	
	
	CatalogManager.setSelectedGroupKey(idGroup);
	CatalogManager.setCasesByGroup();
	browseTypesInGroup();
}



				$('#index').on('pageshow', function(event) {
					initPage(this, contentPageLoaded);

				});

				/*
				 En este mĂŠtodo es donde se debe hacer todo lo que se quiera una vez la pĂĄgina se ha inicializado.
				 * */
				function contentPageLoaded() {
					loadGroups('divGroups');

				}

			



















				var errorL;
			
				$('#init').on('pageshow', function(event) {
					//Vamos a index cuando ha arrancado cordova
					document.addEventListener("deviceready", function(){
						if (errorL != undefined && errorL == true)
							navigator.app.exitApp();
						init();
						createBackController();
						navigator.splashscreen.hide();
					}, false);
				});
			
