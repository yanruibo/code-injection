






﻿/* FUNCIONS GENERALS */



/*
 * Retorna la traducció d'un text segons quin sigui el lang
 * 
 * @param String Cadena de text a traduïr
 */
function __(msg){
	
	//Tenim dades
	if (typeof lang !== 'undefined' && typeof locales !== 'undefined'){
		
		//Tenim el text
		if (locales[msg]){
			
			//Tenim la traducció del text
			if (locales[msg] && locales[msg][lang]){
				return locales[msg][lang];
			}
			
		}
		
	}
	
	//Fallback retornar el text original
	return msg;
	
}


/*
 * Compara dues versions en forma de String ("1.10.1" > "1.9")
 * 
 * @param String Versió 1
 * @param String Versió 2
 * @return Integer Returns (-1 = v1 < v2), (1 = v1 > v2), (0 = v1 === v2)
 */
function versionCompare(v1, v2) {
	
	if (v1 === v2) {
		return 0;
	}
	
	var a = (v1 + '').split('.'),
		b = (v2 + '').split('.'),
		i = 0, 
		l = Math.max(a.length, b.length);
		
	for (; i < l; i++) {
		if ((a[i] && !b[i] && parseInt(a[i], 10) > 0) || (parseInt(a[i], 10) > parseInt(b[i], 10))) {
			return 1;
		} else if ((b[i] && !a[i] && parseInt(b[i], 10) > 0) || (parseInt(b[i], 10) > parseInt(a[i], 10))) {
			return -1;
		}
	}
	
	return 0;
	
}


/*
 * Comprova si estem connectats a internet
 */
function checkDeviceConnection(){
    
	if (navigator.connection){
        
		switch(navigator.connection.type){
			case Connection.UNKNOWN:
        	case Connection.ETHERNET:
        	case Connection.WIFI:
        	case Connection.CELL_2G:
        	case Connection.CELL_3G:
        	case Connection.CELL_4G:
			default:
				return true;
				break;
			case Connection.NONE:
				return false;
				break;
		}

	}
	
	return true;
	
}


/* 
 * Logueja a la consola del navegador si en té
 * 
 * @param Mixed Variable a loguejar
 * @param String Mètode de logueig (info, error, et..)
 * @param Boolean Afegir informació traça
 */
function consoleLog(msg, type, trace){
	
	if (DEBUG && console){
	
		if (typeof(msg)==='object'){
			
			console.dir(msg);
			
		} 
		else {
			
			var types = ['log', 'debug', 'info', 'warn', 'error'];
			
			if (!type || types.indexOf(type)===-1){
				type='log';
			}
			
			console[type](msg);
			
		}
		
		if (trace){
			console.trace();
		}
		
	}
	
}


/* 
 * Obtenir un JSON mitjançant ajax 
 * 
 * @param String url de l'arxiu ajax (obligatori)
 * @param String parametres Post per passar a la url (opcional)
 * @param Bool flag és asyncron
 * @param Function callback complete
 * @param Function callback error
 * 
 * @return Json Objecte JSON
 */
function getJSON(url, data, async, onSuccess, onError){
	
	return $.ajax({
		url: url,
		type: "POST",
		async: async == true,
		data: data,
		dataType: "json",
		success: function(json){
			if (typeof(onSuccess) === 'function'){
				onSuccess(json);
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			if (typeof(onError) === 'function'){
				onError(textStatus, errorThrown);
			}
		}
	});
		
}



/**
 * Function : varDump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function varDump(arr, level) {
	var i, dumped_text = "";
	level = level || 0;
	
	//The padding given at the beginning of the line.
	var level_padding = '';
	for (i = 0; i < level; i++){
		level_padding += "    ";
	}
	
	if (typeof(arr) == 'object'){ //Array/Hashes/Objects 
		if (arr instanceof Array){
			dumped_text += "[" + arr.join(', ') + "]\n";
		} else {
			for (var key in arr){
				dumped_text += level_padding + key + ": ";
				var value = arr[key];
				if (typeof(value) === 'object') {
					if (value instanceof Array){
						dumped_text += "[" + value.join(', ') + "]\n";
					} else {
						dumped_text += "{\n";
						dumped_text += varDump(value, level + 1) + "\n";
						dumped_text += level_padding + "}\n";
					}
				} else {
					if(typeof(value) === 'string') {
						dumped_text += "\"" + value + "\"\n";
					} else {
						dumped_text += value + ",\n";
					}
				}
			}
		}
	} else { //Stings/Chars/Numbers etc.
		if(typeof(value) === 'string') {
			dumped_text += "\"" + value + "\"\n";
		} else {
			dumped_text += value + "\n";
		}
	}
	return dumped_text.replace(/\n+/g, "\n");
}


/* VARIABLES GLOBALS */

var 
	
	//Flag per saber si és aplicació o web
	IS_APP = /file/i.test(window.location.protocol) || /^file:/i.test(window.location.href),
	
	//Versió bootloader
	VERSION = '1.0.1',
	
	//Flag debug
	DEBUG = false,
	
	// Info de la APP
	APP = {
		VERSION: {
			MAJOR: '2',
		}
	},
	
	//Config del servidor
	SERVER = (function(){
		
		var SERVER = {};
		
		SERVER.DOMAIN = 'cafescornella.es',
		SERVER.SUBDOMAIN = 'www',
		SERVER.PATH = '/app',
		SERVER.HOSTNAME = SERVER.SUBDOMAIN + '.' + SERVER.DOMAIN,
		SERVER.HOST = 'http://' + SERVER.HOSTNAME,
		SERVER.BASE = SERVER.HOST + SERVER.PATH,
		SERVER.WS = SERVER.BASE + '/ws'
		
		return SERVER;
		
	})(),
	
	// Config del sistema de fitxers
	FS = (function(){
		
		var FS = {};
		
		// Bytes a demanar d'emmagatzematge offline persistent
		FS.REQUEST_QUOTA =  0;
		
		// Directori arrel del sistema de fitxers (a emplenar més endavant)
		FS.ROOT = {
			URL: '', 
			PATH: ''
		};
		
		// Directori arrel on desarem tots els fitxers de la App
		FS.APP = {};
		FS.APP.PATH = '/es.cafescornella.app2'; 
		
		FS.APP.SRC = {};
		FS.APP.SRC.NAME = 'www';
		FS.APP.SRC.PATH = FS.APP.PATH + '/' + FS.APP.SRC.NAME;
		
		FS.APP.SRC_BKP = {};
		FS.APP.SRC_BKP.NAME = 'www.BKP';
		FS.APP.SRC_BKP.PATH = FS.APP.PATH + '/' + FS.APP.SRC_BKP.NAME;
		
		FS.APP.INDEX = {};
		FS.APP.INDEX.NAME = 'index.html';
		FS.APP.INDEX.PATH = FS.APP.SRC.PATH + '/' + FS.APP.INDEX.NAME;
		
		return FS;
		
	})(),
	
	// Filesystem instance
	fs = null
			
;


/*
 * Si estem en mode web i el HOST no és el correcte, redirigir (sino els ajax son crossdomain i no funcionen)
 */
if (!IS_APP && window.location.hostname != SERVER.HOSTNAME){
	window.location.replace(SERVER.BASE);
}


/*
 * Event "ready" (phonegap diu onbodyload)
 */
function onBodyLoad(){	
		
	if (IS_APP){
		
		// Device ready
		document.addEventListener(
			"deviceready", 
			init,
			false
		);
	
	} else {
		
		init();
		
	}
				
}


/*
 * Inicialització
 */
function init(){
	
	//Si és app, no cal demanar quota emmagatzematge local
	if (IS_APP) {
		
		//Desar el "document_root" per a després utilitzar-lo per a carregar cordova.js
		localStorage.setItem('DOCUMENT_ROOT', window.location.href.replace('/index.html',''));

		// Mostrar splash screen per a mostrar el progrés (i el botó si cal)
		navigator.splashscreen.show();
		
		openFileSystem(onFileSystemInit);
		
	}
	//Si és web, cal demanar i que l'usuari l'accepti
	else {
		
		requestFileSystemQuota(
			//25MB, per dir algo, és només per proves
			25 * 1024 * 1024,
			function(grantedBytes){
				
				openFileSystem(onFileSystemInit);
				
			}
		);
		
	}
	
}


/*
 * Callback un cop el filesystem s'hagi "obert"
 * 
 * @param FileSystem Instància del FileSystem
 */
function onFileSystemInit(fileSystem){
	
	//Instància del FileSystem
	fs = fileSystem;
	
	//URL a l'arrel del FileSystem (treure barra final!)
	FS.ROOT.URL = fs.root.toURL().replace(/\/$/, "");
	
	//Path a l'arrel del FileSystem (treure barra final!)
	FS.ROOT.PATH = fs.root.fullPath.replace(/\/$/, "");
	
	//Sincronitzar SRC
	syncSources.init();
	
}


/*
 * Sincronitzar SRC.
 * Comprovar si hi ha noves versions, i si n'hi ha, descarregar-les.
 * Sino iniciar l'aplicació si ja tenim SRC.
 */
var syncSources = {
	
	currentSources: {
		exists: false,
		version: ''
	},
		
	/*
	* Inicialitzar sincronització de SRC
	*/
	init: function(){
		
		consoleLog('[SYNC] Init');
		
		syncSources.checkCurrent(function(){
			syncSources.checkUpdate();
		});
		
	},
	
	/*
	* Agafar info sobre la versió actual instalada (si n'hi ha).
	*/
	checkCurrent: function(onComplete){
		
		consoleLog('[SYNC] Check current version');
		
		fileExists(fs.root, FS.APP.INDEX.PATH, function(exists){
			
			syncSources.currentSources.version = localStorage.getItem('SOURCES_VERSION') || '';
			syncSources.currentSources.exists = exists && syncSources.currentSources.version;
			
			consoleLog('[SYNC] Check current version, Done (exists:'+syncSources.currentSources.exists+', version:'+syncSources.currentSources.version+')');
			
			if (typeof onComplete === 'function'){
				onComplete();
			}
			
		});
		
	},
	
	/*
	* Comprovar si existeix alguna versió més nova al servidor
	*/
	checkUpdate: function(){
		
		// Comprovar que tenim conexió per a fer comprovació d'actualització
		if (checkDeviceConnection()){
			
			consoleLog('[SYNC] Check Update: Got internet connection');
			
			//Enviar la versió actual
			var postData = {
				version: {
					major: APP.VERSION.MAJOR,
					full: syncSources.currentSources.version
				}
			};
			
			//Comprovar si hi ha actualització
			getJSON(SERVER.WS + '/loader', postData, true, 
				function(json){
					
					// No tinc cap versió instal·lada o versió servidor > versió nostra? Toca actualitzar
					if (!syncSources.currentSources.exists || versionCompare(syncSources.currentSources.version, json.version) === -1){
						
						consoleLog('[SYNC] Check Update: Update needed (current: "'+syncSources.currentSources.version+'", server: "'+json.version+'")');
						
						// Amagar splash screen per a mostrar el progrés (i el botó si cal)
						if (IS_APP){
							navigator.splashscreen.hide();
						}
						
						// Descarregar nous sources i engegar APP en finalitzar
						syncSources.download.init(json.sources);
						syncSources.download.start(function(){
							
							localStorage.setItem('SOURCES_VERSION', json.version);
							syncSources.currentSources.version = json.version;
							syncSources.currentSources.exists = true;
							
							launchApp();
							
						});
						
					}
					//Ja estem a la última versió, engegar
					else{
						
						consoleLog('[SYNC] Check Update: No update needed (current: "'+syncSources.currentSources.version+'", server: "'+json.version+'")');
						
						launchApp();
						
					}
					
				},
				function(textStatus, errorThrown){
					
					// Si no hi ha conexió però tenim alguna versió instalada, engegar-la
					if (syncSources.currentSources.exists){
						
						consoleLog('[SYNC] Check Update: Conection error, Got SRC, Launching App');
						
						launchApp();
						
					}
					// Si no hi ha conexió, i no tenim cap versió instal·lada, alertar
					else{
						
						consoleLog('[SYNC] Check Update: Conection error, No SRC, Alert user');
						
						// Mostrar diàleg usuari
						navigator.notification.confirm(
							__('You need internet connection in order to initialize the application.'), 
							function(btnId){
								
								// Sortir de la app si podem
								if (btnId == 1){
									
									consoleLog('[SYNC] Check Update: Conection error, No SRC, Alert user, Exit');
									
									if(navigator.app){
										navigator.app.exitApp();
									}
									
								}
								// Reintentar
								else {
									
									consoleLog('[SYNC] Check Update: Conection error, No SRC, Alert user, Retry');
									syncSources.checkUpdate();
									
								}
								
							},
							__('No connection'),
							[__('Exit'), __('Retry')]
						);
						
					}
					
				}
			);
			
		}
		// Si no hi ha conexió però tenim alguna versió instalada, engegar-la
		else if (syncSources.currentSources.exists){
			
			consoleLog('[SYNC] Check Update: No internet connection, Got SRC, Launching App');
			
			launchApp();
			
		}
		// Si no hi ha conexió, i no tenim cap versió instal·lada, alertar
		else {
			
			consoleLog('[SYNC] Check Update: No internet connection, No SRC, Alert user');
			
			// Mostrar diàleg usuari
			navigator.notification.confirm(
				__('You need internet connection in order to initialize the application.'), 
				function(btnId){
										
					// Sortir de la app si podem
					if (btnId == 1){
						
						consoleLog('[SYNC] Check Update: No internet connection, No SRC, Alert user, Exit');
						
						if(navigator.app){
							navigator.app.exitApp();
						}
						
					}
					// Reintentar
					else {
						
						consoleLog('[SYNC] Check Update: No internet connection, No SRC, Alert user, Retry');
						
						syncSources.checkUpdate();
						
					}
					
				},
				__('No connection'),
				[__('Exit'), __('Retry')]
			);
			
		}
		
	},
	
	download: {
	
		// Instància de FileTransfer/jqXHR
		fileTransfer: null,
		
		// Indica l'estat de la descàrrega
		state: '',
		
		//Cua de fitxers a descarregar
		fileQueue: [],
		
		//Quantitat de fitxers (progrés)
		fileQueueLength: 0,
		
		//Mida total dels fitxers (progrés)
		totalSize: 0,
		
		//Mida descarregada (progrés)
		downloadedSize: 0,
	
		/*
		* Inicialitza descàrrega de SRC
		* 
		* @param Function Callback un cop finalitzat
		*/
		init: function (sources){
			
			consoleLog('[DOWNLOAD] Init');
			
			// Inicialitzar variables
			syncSources.download.fileTransfer = null;
			syncSources.download.fileQueue = [];
			syncSources.download.fileQueueLength = 0;
			syncSources.download.totalSize = 0;
			syncSources.download.downloadedSize = 0;
			
			//Mostrar barra de progrés
			$('#bootloader .progress-bar div').css('width', '0%');
			$('#bootloader .progress-bar').show();
			
			//Mostrar botó cancelar (només si ja tenim algun SRC)
			if (syncSources.currentSources.exists){
				$('#bootloader .feedback').html('<button type="button" class="download-cancel">' + __('Cancel') + '</button>');
				$('#bootloader .download-cancel').on('click', function(event){
					syncSources.download.abort();
					$(this).prop('disabled', true);
				});
				$('#bootloader .feedback').show();
			}
			
			// Buclejar arxius per generar cua i alguns valors
			$.each(sources.files, function(idx, file){
				
				syncSources.download.fileQueue.push({
					source: SERVER.BASE + sources.path + file.path + '/' + file.name,
					target: FS.APP.SRC.PATH + file.path + '/' + file.name,
					name: file.name,
					size: file.size
				});
				
				syncSources.download.totalSize += file.size;
				
			});
			
			// Desar mida de la cua
			syncSources.download.fileQueueLength = syncSources.download.fileQueue.length;
			
			// Estat ready
			syncSources.download.state = 'ready';
						
		},
	
		/*
		* Copia la versió actual dels SRC a un directori backup i crea el directori dels SRC.
		* 
		* @param Function Callback success
		*/
		prepare: function (onSuccess){
			
			consoleLog('[DOWNLOAD] Prepare');
			
			// Obrir directori arrel de la APP
			openDir(fs.root, FS.APP.PATH, 'a', function(appDirEntry){
							
				// Esborrar backup vell si n'hi ha
				rmDir(fs.root, FS.APP.SRC_BKP.PATH, true, function(){
					
					// Obrir directori dels SRC
					openDir(fs.root, FS.APP.SRC.PATH, 'a', function(sourcesDirEntry){
						
						// Moure els SRC al directori Backup
						sourcesDirEntry.moveTo(appDirEntry, FS.APP.SRC_BKP.NAME, function(){
							
							// Crear directori dels SRC
							openDir(fs.root, FS.APP.SRC.PATH, 'a', function(){
								consoleLog('[DOWNLOAD] Prepare, Done');
								if (typeof onSuccess === 'function'){
									onSuccess();
								}
							});
							
						}, function(){
							//Mai hauria d'entrar aquí
						});
						
					});
					
				});
				
			});
			
		},
		
		/*
		* Recupera el backup desat i el coloca en lloc dels SRC
		* 
		* @param Function Callback success
		*/
		rollback: function (onSuccess){
			
			consoleLog('[DOWNLOAD] Rollback');
			
			// Obrir directori arrel de la APP
			openDir(fs.root, FS.APP.PATH, 'a', function(appDirEntry){
							
				// Esborrar directori dels fitxers baixats
				rmDir(fs.root, FS.APP.SRC.PATH, true, function(){
				
					// Obrir directory del backup
					openDir(fs.root, FS.APP.SRC_BKP.PATH, 'a', function(sourcesBackupDirEntry){
					
						// Moure SRC del Backup al sources
						sourcesBackupDirEntry.moveTo(appDirEntry, FS.APP.SRC.NAME, function(){
							consoleLog('[DOWNLOAD] Rollback, Done');
							if (typeof onSuccess === 'function'){
								onSuccess();
							}
						});
						
					});
					
				});
				
			});
			
		},
				
		/*
		* Descarrega fitxers
		* 
		* @param Function Callback un cop finalitzat
		*/
		start: function (onComplete){
			
			consoleLog('[DOWNLOAD] Start');
			
			// Preparar directoris
			syncSources.download.prepare(function(){
						
				// Estat
				syncSources.download.state = 'downloading';
				
				//Descarregar els documents un darrera l'altre
				syncSources.download.process(
					//Descarrega finalitzada OK
					function(){
						
						consoleLog('[DOWNLOAD] Completed');
						
						$('#bootloader .feedback').html('').hide();
						
						if (typeof onComplete === 'function'){
							onComplete();
						}
						
					}
				);
				
			});
		
		},
		
		/*
		* Processa la cua de fitxers a descarregar
		* 
		* @param Function Callback de progrés
		* @param Function Callback un cop finalitzat
		* @param Function Callback si hi ha hagut algun error
		*/
		process: function (onComplete){
			
			// Si encara queden docs, descarregar següent
			if (syncSources.download.fileQueue.length){
			
				var file = syncSources.download.fileQueue.shift();
				
				consoleLog('[DOWNLOAD] Process: File ('+file.name+')');
				
				// Descarregar fitxer i desar instància de baixada per a poder abortar-la
				syncSources.download.fileTransfer = downloadFile(
					file.source,
					file.target,
					function(event){
						
						if (event.lengthComputable) {
							syncSources.download.progress(syncSources.download.fileQueueLength, syncSources.download.fileQueueLength - syncSources.download.fileQueue.length, syncSources.download.totalSize, syncSources.download.downloadedSize, file.size, file.size);
						}
						
					},
					function(fileEntry) {
						
						consoleLog('[DOWNLOAD] Process: File ('+file.name+'), Done');
						
						// Ja no podem abortar, posar a null per evitar errors
						syncSources.download.fileTransfer = null;
						
						// Sumar a la mida ja descarregada la del fitxer actual
						syncSources.download.downloadedSize += file.size;
						
						// Cridar la funció progrés
						syncSources.download.progress(syncSources.download.fileQueueLength, syncSources.download.fileQueueLength - syncSources.download.fileQueue.length, syncSources.download.totalSize, syncSources.download.downloadedSize, file.size, file.size);
						
						// Descarregar següent
						if (syncSources.download.state == 'downloading'){
							syncSources.download.process(onComplete);
						}
						
					},
					function(err) {
						
						// Ja no podem abortar, posar a null per evitar errors
						syncSources.download.fileTransfer = null;
						
						// Si no hem abortat (abortar fa que cridi el callback error amb l'error FileTransferError.ABORT_ERR)
						if (syncSources.download.state != 'aborted'){
							
							consoleLog('[DOWNLOAD] Process: File ('+file.name+'), Error');
							
							// Mostrar dialeg amb error i opcions
							navigator.notification.confirm(
								__('There was an error while downloading application files.'), 
								function(btnId){
									
									// Rollback + exit
									if (btnId == 1){
										syncSources.download.rollback(function(){
											if(navigator.app){
												navigator.app.exitApp();
											}
										});
									}
									// Rollback + engegar app
									else if (syncSources.currentSources.exists && btnId == 2){
										syncSources.download.rollback(function(){
											launchApp();
										});
									}
									// Reintentar
									else {
										syncSources.download.process(onComplete);
									}
									
								},
								__('Download error'),
								(function(){
									
									var dlgBtns = [];
									
									dlgBtns.push(__('Exit'));
									
									if(syncSources.currentSources.exists){
										dlgBtns.push(__('Start App'));
									}
									
									dlgBtns.push(__('Retry'));
									
									return dlgBtns;
									
								})()
							);
							
						}
									
					}
				);
				
			}
			// Si no queden més docs, cridar onComplete();
			else {
				
				syncSources.download.state = 'completed';
				
				if (typeof onComplete === 'function'){
					// Una mica de retràs perquè es vegi el 100%
					setTimeout(onComplete, 500);
				}
				
			}
	
			
		},
		
		progress: function(totalFiles, downloadedFiles, totalSize, totalDownloadedSize, fileSize, fileDownloadedSize){
				
			//Calcular % total
			var totalPercentage = (100 * totalDownloadedSize / totalSize).toFixed(1);
			
			//Actualitzar barra progrés
			$('#bootloader .progress-bar div').css('width', totalPercentage + '%');
			
		},
		
		/*
		* Aborta la descàrrega
		*/
		abort: function (){
			
			// Només té sentit abortar mentre estem descarregant, ni abans ni després
			if (syncSources.download.state == 'downloading'){
				
				consoleLog('[DOWNLOAD] Aborted');
				
				// Estat
				syncSources.download.state = 'aborted';
					
				//Buidar cua fitxers
				syncSources.download.fileQueue = [];
				
				//Abortar descàrrega actual si n'hi ha
				if (syncSources.download.fileTransfer){
					syncSources.download.fileTransfer.abort();
					syncSources.download.fileTransfer = null;
				}
				
				//Tornar a copiar els SRC vells i engegar-los			
				syncSources.download.rollback(function(){
					launchApp();
				});
				
			}
			
		}
		
	}
		
};




/*
 * Engega l'aplicació amb els SRC descarregats
 */
function launchApp(){
	
	consoleLog('[BOOTLOADER] Launching app ('+(IS_APP ? 'IS_APP' : '')+')');
	
	if(IS_APP){
		
		// Mostrar splash pq sino surt la pantalla en blanc uns segons i no queda bé
		navigator.splashscreen.show();
		
		//Redirigir als SRC baixats
		window.location.replace(FS.ROOT.URL + FS.APP.INDEX.PATH);
		
	} else {
		
		//Obrir els SRC en finestra nova si és navegador
		var win = window.open(FS.ROOT.URL + FS.APP.INDEX.PATH, '_blank');
  		if (win){
			win.focus();
		}
		
	}
	
}
	







﻿

window.LocalFileSystem = window.LocalFileSystem || {PERSISTENT: window.PERSISTENT, TEMPORARY: window.TEMPORARY};
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;


/*
 * Retorna el nom de l'error a partir del codi d'error FileSystem
 * 
 * @param Integer Codi de l'error FileSystem
 */
function getFsErrorMsg(code){
	
	switch(code){
		case FileError.NOT_FOUND_ERR: 
			return "NOT_FOUND_ERR";
		case FileError.PATH_EXISTS_ERR:
			return "PATH_EXISTS_ERR";
		case FileError.ABORT_ERR:
			return "ABORT_ERR";
		case FileError.SECURITY_ERR:
			return "SECURITY_ERR";
		case FileError.NOT_READABLE_ERR:
			return "NOT_READABLE_ERR";
		case FileError.ENCODING_ERR:
			return "ENCODING_ERR";
		case FileError.NO_MODIFICATION_ALLOWED_ERR:
			return "NO_MODIFICATION_ALLOWED_ERR";
		case FileError.INVALID_STATE_ERR:
			return "INVALID_STATE_ERR";
		case FileError.SYNTAX_ERR:
			return "SYNTAX_ERR";
		case FileError.INVALID_MODIFICATION_ERR:
			return "INVALID_MODIFICATION_ERR";
		case FileError.QUOTA_EXCEEDED_ERR:
			return "QUOTA_EXCEEDED_ERR";
		case FileError.TYPE_MISMATCH_ERR:
			return "TYPE_MISMATCH_ERR";
		default:
			return "UNKNOWN_ERR";
	};
	
}


/*
 * Retorna el nom de l'error a partir del codi d'error FileTransfer
 * 
 * @param Integer Codi de l'error FileTransfer
 */
function getFtErrorMsg(code){
	
	switch(code){
		case FileTransferError.FILE_NOT_FOUND_ERR: 
			return "FILE_NOT_FOUND_ERR";
		case FileTransferError.INVALID_URL_ERR:
			return "INVALID_URL_ERR";
		case FileTransferError.CONNECTION_ERR:
			return "CONNECTION_ERR";
		case FileTransferError.ABORT_ERR:
			return "ABORT_ERR";
		default:
			return "UNKNOWN_ERR";
	};
	
}


	
/*
 * Logueja un error FileSystem
 * 
 * @param DOMError Error proporcionat
 */
function fsError(err){
	consoleLog('ERROR FS: '+getFsErrorMsg(err.code));
}


/*
 * Logueja un error d'una transferencia de fitxers (FileTransfer)
 * 
 * @param DOMError Error proporcionat
 */
function ftError(err){
	consoleLog('ERROR FT: '+getFtErrorMsg(err.code)+' HTTP_STATUS: '+err.http_status);
}



/*
 * Demana quota d'emmagatzematge offline persistent (popup a l'usuari). Només per al chrome, phonegap no.
 * 
 * @param Integer Tamany en bytes a demanar
 * @param Function Callback un cop complet
 */
function requestFileSystemQuota(quotaInBytes, onSuccess){
		
	if (navigator.webkitPersistentStorage) {
		
		navigator.webkitPersistentStorage.requestQuota(
			quotaInBytes, 
			onSuccess, 
			fsError
		);
	
	} else if (window.webkitStorageInfo) {
		
		window.webkitStorageInfo.requestQuota(
			window.LocalFileSystem.PERSISTENT,
			quotaInBytes, 
			onSuccess, 
			fsError
		);
		
	}
	
}


/*
 * Obre una instància al directori arrel d'emmagatzematge de fitxers
 * 
 * @param Function Callback un cop complet
 */
function openFileSystem(onSuccess){
	
	if (window.requestFileSystem){
		
		//Obrir directori arrel
		window.requestFileSystem(
			window.LocalFileSystem.PERSISTENT, 
			FS.REQUEST_QUOTA, 
			onSuccess, 
			fsError
		);
	
	}
	
}


/*
 * Crea object amb les flags d'obrir directori/fitxer segons el mode passat
 * 
 * @param String Mode (r, w, a)
 * @return Object Modes preparats per al filesystem
 */
function getOpenFlags(mode){
	
	var flags = {
		// Create:true => si no existeix, crear-lo
		create: false,
		// Exclusive:true => si create=true, donar error en cas que ja existeixi
		exclusive: false
	};
	
	switch(mode){
		//Read: Obrir directori existent
		case 'r':
		break;
		//Write: Crear directori sempre i quan no existeixi ja
		case 'w':
			flags.create = true;
			flags.exclusive = true;
		break;
		//Append: Obrir directori existent, i si no existeix, crear-lo
		case 'a':
		default:
			flags.create = true;
		break;
	}
	
	return flags;
	
}


/*
 * Obre un directori (path) recursivament i si no existeix el crea.
 * 
 * @param directoryEntry Instància del direcotri pare
 * @param String Path a obrir
 * @param Function Callback éxit. Rep un directoryEntry com a paràmetre
 * @param Function Callback error
 */
function openDir(parentDirEntry, dirPath, mode, onSuccess, onError){
	
	//Treure / al principi i al final i convertir el path en array ('/path/to/file/' = ['path','to','file'])
	var path = dirPath.replace(/(^\/|\/$)/g, '').split('/');	
	
	//Provar d'obrir-lo (existeix)
	parentDirEntry.getDirectory(
		path[0],
		getOpenFlags(mode),
		function(dirEntry){
			
			//És l'ultim nivell, per tant cridar callback
			if (path.length == 1){
				if (typeof onSuccess === 'function'){
					onSuccess.call(this, dirEntry);
				}
			}
			//Obrir el següent subdirectori recursivament
			else {
				
				path.shift();
				openDir(dirEntry, path.join('/'), mode, onSuccess, onError)
				
			}
			
		},
		function(err){
			
			if (typeof onError === 'function'){
				onError(err);
			}
			
			fsError(err);
			
		}
	);
	
}


/*
 * Obre un fitxer donat un path. Si no existeix el crea.
 * 
 * @param directoryEntry Instància del direcotri pare
 * @param String Path del fitxer a obrir
 * @param Function Callback éxit. Rep un fileEntry com a paràmetre
 * @param Function Callback error
 */
function openFile(parentDirEntry, filePath, mode, onSuccess, onError){
	
	//Treure / al principi i al final i convertir el path en array ('/path/to/file/filename.ext' = ['path','to','file','filename.ext'])
	var path = filePath.replace(/(^\/|\/$)/g, '').split('/'),
		filename = path.pop();
		
	//Obrir el directori
	openDir(
		parentDirEntry, 
		path.join('/'), 
		mode,
		function(dirEntry){
			
			//Provar d'obrir el fitxer (existeix)
			dirEntry.getFile(
				filename,
				getOpenFlags(mode),
				onSuccess,
				function(err){
					
					if (typeof onError === 'function'){
						onError(err);				
					}
					
					fsError(err);
					
				}
			);
			
		},
		onError
	);
	
}


/*
 * Esborra un directori (path) (opcionalment recursivament)
 * 
 * @param directoryEntry Instància del direcotri pare
 * @param String Path a esborrar
 * @param Function Callback éxit. Rep un directoryEntry com a paràmetre
 * @param Function Callback error
 */
function rmDir(parentDirEntry, dirPath, recursive, onSuccess, onError){
	
	//Provar d'obrir-lo (existeix)
	openDir(
		parentDirEntry, 
		dirPath, 
		'r',
		function(dirEntry){
			
			//Esborrar segons flag recursiu
			if (recursive) {
				
				dirEntry.removeRecursively(
					onSuccess,
					function(err){
						if(typeof onError === 'function') {
							onError();
						}
						fsError(err);
					}
				);
				
			} else {
				
				dirEntry.remove(
					onSuccess,
					function(err){
						if(typeof onError === 'function') {
							onError();
						}
						fsError(err);
					}
				);
				
			}
			
		},
		function(err){
			
			//Si el directori no existeix el considerarem esborrat, sino, error
			if (err.code === FileError.NOT_FOUND_ERR){
				
				onSuccess();
				
			} else {
				
				if (typeof onError === 'function'){
					onError(err);				
				}
				
				fsError(err);
				
			}
		}
	);
	
}


/*
 * Comprova si un directori/fitxer existeix
 * 
 * @param directoryEntry Instància del direcotri pare
 * @param String Path del fitxer a obrir
 * @param Function Callback un cop complet. Rep un fileEntry com a paràmetre
 */
function fileExists(parentDirEntry, filePath, onComplete){
	
	//Obrir com a fitxer
	openFile(
		parentDirEntry, 
		filePath, 
		'r',
		function(dirEntry){
			onComplete(true);
		},
		function(err){
			
			//Obrir com a directori
			openDir(
				parentDirEntry, 
				filePath, 
				'r',
				function(dirEntry){
					onComplete(true);
				},
				function(err){
					onComplete(false);
				}
			);
			
		}
	);
	
}


/*
 * Posar atribut metadata "com.apple.MobileBackup" a un directori o fitxer (Només per iOS)
 * 
 * @param directoryEntry Instància del directori o fitxer
 * @param Boolean Activar o desactivar l'atribut "backup a iCloud" al directori o fitxer
 * @param Function Callback un cop complet amb èxit
 * @param Function Callback un cop complet amb error.
 */
function setEntryBackupFlag(entry, backupFlag, onSuccess, onError){
	
	entry.setMetadata(
		onSuccess, 
		onError, 
		{
			//0=>backupEnabled, 1=>backupDisabled
			'com.apple.MobileBackup': backupFlag ? 0 : 1
		}
	);

}


/*
 * Descarrega un fitxer i el guarda en el sistema de fitxers del dispositiu
 * 
 * @param String Url del fitxer a descarregar
 * @param String Path local on desar el fitxer
 * @param Function Callback un cop complet satisfactoriament
 * @param Function Callback si hi ha algun error
 * @param Function Callback de progrés
 */
function downloadFile(source, target, onProgress, onSuccess, onError){
	
	if (typeof FileTransfer !== 'undefined') {
	
		var ft = new FileTransfer();
		
		if (typeof onProgress === 'function') {
			ft.onprogress = onProgress;
			/*function(event) { if (event.lengthComputable) {...} };*/
		}
		
		ft.download(
			source,
			FS.ROOT.PATH + target,
			onSuccess,
			function(err) {
				
				ftError(err);
				
				if (typeof onError === 'function') {
					onError(err);
				}
				
			}
		);
		
		return ft;
		
	} else {
		
		// Objecte XHR
		var xhr = new XMLHttpRequest();
				
		// Callback progrés 
		if (typeof onProgress === 'function') {
			xhr.upload.addEventListener('progress', function(event) {
				if (event.lengthComputable) {
					onProgress(event, this);
				}
			}, false);
		}
		
		// Callback error 
		xhr.addEventListener('error', function(event){
			if (typeof onError === 'function') {
				onError(this, event);
			}
		}, false);
		
		// Callback abortar 
		xhr.addEventListener('abort', function(event){
			if (typeof onError === 'function') {
				onError(this, event);
			}
		}, false);
		
		// Callback success 
		xhr.addEventListener('load', function(event){
			
			var blob = this.response;
			
			//Crear fitxer per a escriure-hi
			openFile(
				fs.root, 
				target, 
				'a',
				function(fileEntry) {
					
					// Crear "escriptor"
					fileEntry.createWriter(
						function(fileWriter) {
							
							fileWriter.onwrite = function() {
								if (typeof onSuccess === 'function' ) {
									onSuccess(fileEntry);
								}
							};
							
							fileWriter.onerror = function(error) {
								
								// Esborrar el fitxer creat
								fileEntry.remove($.noop, $.noop);
								
								if (typeof onError === 'function') {
									var err = error && error.currentTarget && error.currentTarget.error ? error.currentTarget.error : error;
									onError(err);
								}
								
							};
							
							//Desar el binari
							fileWriter.write(blob);
							
						}, 
						function(err) {
							
							fsError(err);
							
							if (typeof onError === 'function') {
								onError();
							}
																	
						}
					);
					
				}
			)
						
		}, false);		
		
		// Obrir conexió i enviar formData
		xhr.open('GET', source, true);
		
		// tipus de resposta esperada
		xhr.responseType = 'blob';
		
		// Headers
		xhr.setRequestHeader("Cache-Control", "no-cache");
		
		// Enviar petició
		xhr.send(null);
		
		return xhr;
		
	}
	
}







