
var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var locationWatch = false;

var toggleLocation = function() {
    var suc = function(p) {
        jQuery("#loctext").empty();
                
        var text = "<div class=\"locdata\">Latitude: " + p.coords.latitude
                + "<br/>" + "Longitude: " + p.coords.longitude + "<br/>"
                + "Accuracy: " + p.coords.accuracy + "m<br/>" + "</div>";
        jQuery("#locdata").append(text);

        var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center="
                + p.coords.latitude
                + ","
                + p.coords.longitude
                + "&zoom=13&size=280x175&markers=color:blue|"
                + p.coords.latitude + ',' + p.coords.longitude;

        jQuery("#map").remove();
        jQuery("#loccontainer").append(
                jQuery(document.createElement("img")).attr("src", image_url)
                        .attr('id', 'map'));
    };
    var fail = function(error) {
        jQuery("#loctext").empty();
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User did not share geolocation data.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Could not detect current position.");
            break;

        case error.TIMEOUT:
            alert("Retrieving position timed out.");
            break;

        default:
            alert("Unknown error.");
            break;
        }
    };

    if (locationWatch) {
        locationWatch = false;
        jQuery("#loctext").empty();
        jQuery("#locdata").empty();
        jQuery("#map").remove();
    } else {
        if (navigator.geolocation) {
            jQuery("#loctext").append("Getting geolocation . . .");
            navigator.geolocation.getCurrentPosition(suc, fail);
        } else {
            jQuery("#loctext").empty();
            jQuery("#loctext").append("Unable to get location.");
            alert("Device or browser can not get location.");
        }
        locationWatch = true;
    }
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

function toggleAccel() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
}

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    //console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.bottom = "160px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 30
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

// This is just to do this.
function readFile() {
    navigator.file.read('/sdcard/phonegap.txt', fail, fail);
}

function writeFile() {
    navigator.file.write('foo.txt', "This is a test of writing to a file",
            fail, fail);
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name &&
               contacts[2].name.formatted ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}










var db = null;
var lockWaitScreen = 0;
var DB_VERSION = '1';

function incrementLockWaitScreen() {
	lockWaitScreen++;
	if (lockWaitScreen == 1) {
		showLoading();
	}
	return lockWaitScreen;
}

function decrementLockWaitScreen() {
	lockWaitScreen--;
	if (lockWaitScreen == 0) {
		// inserisci logica funzionale qui
		initImpostazioni();
		
		hideLoading();
	}
	return lockWaitScreen;
}

/**
 * Gestore generico degli errori
 * 
 * @param t
 * @param e
 * @returns {Boolean}
 */
function errorHandler(t, e) {
	alert('Si è verificato l\'errore ' + e.message + ' (codice ' + e.code + ')\nVai in \'Impostazioni\'->\'Ripristina database\' per risolvere il problema!');
	return true;
}

/**
 * Gestore generico degli errori
 * 
 * @param t
 * @param e
 * @returns {Boolean}
 */
function errorHandlerInsert(t, e) {
	decrementLockWaitScreen();
	return errorHandler(t, e);
}

/**
 * Crea una connessione al db
 */
function getDbConnection() {
	if (db == null) {
		var shortName = 'MetanoUtils';
		var version = '1.0';
		var displayName = 'MetanoUtils';
		var maxSize = 500*1024;
		db = openDatabase(shortName, version, displayName, maxSize);
	}
	return db;
}

/**
 * Verifica che la versione del DB presente sia la più aggiornata
 * @returns {Boolean}
 */
function isDbVersioneValidaEInit() {
	var db = getDbConnection();

	db.transaction(
			function (t) {
				t.executeSql(
						'CREATE TABLE IF NOT EXISTS sistema (key TEXT NOT NULL PRIMARY KEY, value TEXT);'
				);
			}
	);
	db.transaction(
			function (t) {
				t.executeSql(
						'SELECT * FROM sistema WHERE key = \'versione\';',
						[],
						function (t, res) {
							if (res != null && res.rows != null && res.rows.length > 0) {
								var row = res.rows.item(0);
								if (row.value != null && row.value < DB_VERSION) {
									ripristinaDbImpl();
								} else {
									// verifico che non ci siano stati problemi nelle precedenti inizializzazioni
									initImpostazioni();
								}
							} else {
								// Prima inizializzazione
								dbInit();
							}
						},
						errorHandler
				);
			}
	);
}

/**
 * Inizializza il DB: interfaccia esterna
 */
function dbInit() {
	var db = getDbConnection();
	// Creo tabelle
	// Sistema
	db.transaction(function(t) {t.executeSql('CREATE TABLE IF NOT EXISTS sistema (key TEXT NOT NULL PRIMARY KEY, value TEXT);');});
	// Impostazioni
	db.transaction(function(t) {t.executeSql('CREATE TABLE IF NOT EXISTS impostazioni (key TEXT NOT NULL PRIMARY KEY, value TEXT);');});
	
	// Inserisco i dati
	
	// V. 1
	inserisciImpostazione('consumo_kml', '14');
	inserisciImpostazione('metano_prezzo', '0.950');
	inserisciImpostazione('benzina_prezzo', '1.800');
	inserisciImpostazione('bombola_installata_litri', '100');
	inserisciImpostazione('benzina_serbatoio_litri', '50');

	inserisciSistema('numeroImpostazioni', '5');
	inserisciSistema('versione', DB_VERSION);
}

/**
 * Procedura di ripristino completo del db
 */
function ripristinaDb() {
	var scelta = confirm('Procedendo verranno ripristinati i dati iniziali.\nVuoi continuare?');
	
	if (scelta == true) {
		ripristinaDbImpl();
	}
	
	return scelta;
}

/**
 * Procedura di ripristino completo del db
 */
function ripristinaDbImpl() {
	var db = getDbConnection();

	// DROP tabelle
	// Sistema
	db.transaction(function(t) {t.executeSql('DROP TABLE IF EXISTS sistema;');});
	// Impostazioni
	db.transaction(function(t) {t.executeSql('DROP TABLE IF EXISTS impostazioni;');});
	
	// Init
	dbInit();
}

/**
 * Inserisce nella tabella di sistema
 * 
 * @param key
 * @param value
 */
function inserisciSistema(key, value) {
	var db = getDbConnection();
	incrementLockWaitScreen();
	db.transaction(
			function (t) {
				t.executeSql(
						'INSERT INTO sistema (key, value) VALUES (?,?);',
						[key, value],
						function () {decrementLockWaitScreen();},
						errorHandlerInsert
				);
			}
	);
}

/**
 * Update della tabella di sistema
 * 
 * @param key
 * @param value
 */
function updateSistema(key, value) {
	var db = getDbConnection();
	incrementLockWaitScreen();
	db.transaction(
			function (t) {
				t.executeSql(
						'UPDATE sistema SET value = ? WHERE key = ?;',
						[value, key],
						function () {decrementLockWaitScreen();},
						errorHandlerInsert
				);
			}
	);
}

/**
 * Inserisce un'impostazione nel db
 * 
 * @param key
 * @param value
 */
function inserisciImpostazione(key, value) {
	var db = getDbConnection();
	incrementLockWaitScreen();
	db.transaction(
			function (t) {
				t.executeSql(
						'INSERT INTO impostazioni (key, value) VALUES (?,?);',
						[key, value],
						function () {decrementLockWaitScreen();},
						errorHandlerInsert
				);
			}
	);
}

/**
 * Update di un'impostazione nel db
 * @param key
 * @param value
 */
function updateImpostazione(key, value) {
	var db = getDbConnection();
//	incrementLockWaitScreen();
	db.transaction(
			function (t) {
				t.executeSql(
						'UPDATE impostazioni SET value = ? WHERE key = ?;',
						[value, key],
						function () {/*decrementLockWaitScreen();*/},
						errorHandlerInsert
				);
			}
	);
}

/**
 * Verifica che le impostazioni di base siano state settate
 * Se non lo è, allora richiede il ripristino, altrimenti, ok
 */
function initImpostazioni() {
	var db = getDbConnection();
	db.transaction(
			function (t) {
				t.executeSql(
						'SELECT count(*) as num FROM impostazioni;',
						[],
						function (t, res) {
							var impostazioniPresenti = 0;
							if (res != null && res.rows != null && res.rows.length > 0) {
								var row = res.rows.item(0);
								if (row != null) {
									if (row.num != null) {
										impostazioniPresenti = row.num;
									}
								}
							}
							t.executeSql(
									'SELECT value FROM sistema WHERE key = \'numeroImpostazioni\';',
									[],
									function (t, res) {
										if (res != null && res.rows != null && res.rows.length > 0) {
											var row = res.rows.item(0);
											if (row != null && row.value != null) {
												if (impostazioniPresenti == row.value) {
													// inizializzo i campi

													t.executeSql(
															'SELECT * FROM impostazioni;',
															[],
															function (t, res) {
																if (res != null && res.rows != null && res.rows.length > 0) {
																	for (var i=0; i<res.rows.length; i++) {
																		var row = res.rows.item(i);
																		if (row != null && row.value != null) {
																			// inizializzo i campi
																			if (row.key == 'consumo_kml') {
																				var ref = $('#impostazioniKml');
																				if (ref != null) {
																					ref.val(row.value);
																				}
//																				ref = $('#litriBombolaKml');
//																				if (ref != null) {
//																					ref.val(row.value);
//																				}
																			} else if (row.key == 'metano_prezzo') {
																				var ref = $('#impostazioniMetanoPrezzo');
																				if (ref != null) {
																					ref.val(row.value);
																				}
																			} else if (row.key == 'benzina_prezzo') {
																				var ref = $('#impostazioniBenzinaPrezzo');
																				if (ref != null) {
																					ref.val(row.value);
																				}
																			} else if (row.key == 'bombola_installata_litri') {
																				var ref = $('#impostazioniBombolaInstallataLitri');
																				if (ref != null) {
																					ref.val(row.value);
																				}
																			} else if (row.key == 'benzina_serbatoio_litri') {
																				var ref = $('#impostazioniBenzinaSerbatoioLitri');
																				if (ref != null) {
																					ref.val(row.value);
																				}
																			}
																		}
																	}
																}
															},
															errorHandler
													);
												} else {
													alert('Attenzione: la precedente inizializzazione non è andata a buon fine.\nE\' necessario ripristinare il database.');
													var scelta = ripristinaDb();
													if (scelta) {
														initImpostazioni();
													}
												}
											}
										}
									},
									errorHandler
							);
						},
						errorHandler
				);
			}
	);
}

/**
 * Inizializza i km/l nell'input element
 */
function initPaginaLitriBombola() {
	var db = getDbConnection();
	db.transaction(
			function (t) {
				t.executeSql(
						'SELECT * FROM impostazioni WHERE key = \'consumo_kml\';',
						[],
						function (t, res) {
							if (res != null && res.rows != null && res.rows.length > 0) {
								var row = res.rows.item(0);
								if (row != null) {
									var ref = $('#litriBombolaKml');
									if (ref != null) {
										ref.val(row.value);
									}
								}
							}
							// calcola
							calcolaLitriBombola();
						},
						errorHandler
				);
			}
	);
}

/**
 * 
 */
function calcolaLitriBombola() {
	var db = getDbConnection();
	db.transaction(
			function (t) {
				t.executeSql(
						'SELECT * FROM impostazioni WHERE key in ( \'metano_prezzo\', \'benzina_prezzo\' );',
						[],
						function (t, res) {
							var metanoPrezzo = 0;
							var benzinaPrezzo = 0;
							if (res != null && res.rows != null && res.rows.length > 0) {
								for (var i=0; i<res.rows.length; i++) {
									var row = res.rows.item(i);
									if (row.key == 'metano_prezzo') {
										metanoPrezzo = parseFloat(row.value);
									} else if (row.key == 'benzina_prezzo') {
										benzinaPrezzo = parseFloat(row.value);
									}
								}
							}
							// calcola
							var refLitriBombola = $('#litriBombolaLitri');
							if (refLitriBombola != null) {
								var refKml = $('#litriBombolaKml');
								if (refKml != null) {
									var percorrenza = 0;
									var metanoKg = 0;
									var metanoEuro = 0;
									var benzinaLitri = 0;
									var benzinaEuro = 0;
									
									metanoKg = parseFloat(refLitriBombola.val()) * 0.136;
									benzinaLitri = parseFloat(refLitriBombola.val()) * 0.21216;
									percorrenza = benzinaLitri * parseFloat(refKml.val());
									metanoEuro = metanoKg * metanoPrezzo;
									benzinaEuro = benzinaLitri * benzinaPrezzo;

									var ref = $('#litriBombolaStatistichePercorrenza');
									if (ref != null) {
										ref.text(parseInt(formattaFloatOutput(percorrenza)));
									}
									ref = $('#litriBombolaStatisticheMetanoKg');
									if (ref != null) {
										ref.text(formattaFloatOutput(metanoKg));
									}
									ref = $('#litriBombolaStatisticheMetanoEuro');
									if (ref != null) {
										ref.text(formattaFloatOutput(metanoEuro));
									}
									ref = $('#litriBombolaStatisticheBenzinaLitri');
									if (ref != null) {
										ref.text(formattaFloatOutput(benzinaLitri));
									}
									ref = $('#litriBombolaStatisticheBenzinaEuro');
									if (ref != null) {
										ref.text(formattaFloatOutput(benzinaEuro));
									}
								}
							}
						},
						errorHandler
				);
			}
	);
}

/**
 * 
 */
function salvaImpostazioniKml() {
	var ref = $('#impostazioniKml');
	if (ref != null) {
		var input = validaInput(ref.val());
		ref.val(input);
		updateImpostazione('consumo_kml', input);
	}
}

/**
 * 
 */
function salvaImpostazioniMetanoPrezzo() {
	var ref = $('#impostazioniMetanoPrezzo');
	if (ref != null) {
		var input = validaInput(ref.val());
		ref.val(input);
		updateImpostazione('metano_prezzo', input);
	}
}

/**
 * 
 */
function salvaImpostazioniBenzinaPrezzo() {
	var ref = $('#impostazioniBenzinaPrezzo');
	if (ref != null) {
		var input = validaInput(ref.val());
		ref.val(input);
		updateImpostazione('benzina_prezzo', input);
	}
}

/**
 * 
 */
function salvaImpostazioniBombolaInstallataLitri() {
	var ref = $('#impostazioniBombolaInstallataLitri');
	if (ref != null) {
		var input = validaInput(ref.val());
		ref.val(input);
		updateImpostazione('bombola_installata_litri', input);
	}
}

/**
 * 
 */
function salvaImpostazioniBenzinaSerbatoioLitri() {
	var ref = $('#impostazioniBenzinaSerbatoioLitri');
	if (ref != null) {
		var input = validaInput(ref.val());
		ref.val(input);
		updateImpostazione('benzina_serbatoio_litri', input);
	}
}

/**
 * Elimina caratteri speciali dalla stringa di ricerca per evitare l'SQL Injection
 * @param str
 * @returns {String}
 */
function avoidSqlInjection(str) {
	var strPulita = str;
	var strPulitaPrima = '';
	if (strPulita != null) {
		do {
			strPulitaPrima = strPulita;
			strPulita = strPulita.replace(new RegExp('[^a-zA-Z0-9 ]'),'');
		} while (strPulitaPrima != strPulita)
	}
	return strPulita;
}




function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);

    /*
    $("#accelmenu").live('expand', function() {
        toggleAccel();
    }).live('collapse', function() {
        toggleAccel();
    });

    $("#locationmenu").live('expand', function() {
        toggleLocation();
    }).live('collapse', function() {
        toggleLocation();
    });
    */
    
    // init del db
    isDbVersioneValidaEInit();
//    if (! isDbVersioneValida()) {
//    	dbInit();
//    }
}

function showLoading() {
	$("#loading").show();
}

function hideLoading() {
	$("#loading").hide();
}

/**
 * @param f
 * @returns {String}
 */
function formattaFloatOutput(f) {
	var res = '0';
	f = '' + f;
	if (f != null && f != '' && f != 'NaN') {
		var pos = f.indexOf('.', 0);
		if (pos != -1) {
			res = f.substring(0, pos) + f.substring(pos, pos + 2 + 1); // 2 decimali + il '.'
		} else {
			res = f;
		}
	}
	return res;
}

/**
 * @param input
 * @returns {String}
 */
function validaInput(input) {
	var ret = '0';
	if (input != null) {
		input = input.replace(",", ".");
	}
	ret = '' + parseFloat(input);
	if (ret == null || ret == '' || ret == 'NaN') {
		ret = '0';
	}
	return ret;
}

/**
 * @param input
 * @returns {String}
 */
function validaInputNoDefault(input) {
	var ret = '0';
	if (input != null) {
		input = input.replace(",", ".");
	}
	ret = '' + parseFloat(input);
	if (ret == null || ret == '' || ret == 'NaN') {
		ret = '';
	}
	return ret;
}

/**
 * Calcola da litri a kg
 */
function calcolaLitriKgLitri() {
	var refLitri = $('#litriKgLitri');
	if (refLitri != null) {
		// non cancello il . finale se inserito
		var tmp = ''+refLitri.val();
		tmp = tmp.replace(".", "");
		// il no default previene l'inserimento di uno zero alla cancellazione del testo
		var input = validaInputNoDefault(refLitri.val());
		if (tmp != input.replace(".", "")) {
			refLitri.val(input);
		}
		var res = '' + (parseFloat(refLitri.val()) / 1.56);
		var refKg = $('#litriKgKg');
		if (refKg != null) {
			refKg.val(formattaFloatOutput(res));
		}
		var refKml = $('#impostazioniKml');
		var refPercorrenza = $('#litriKgPercorrenza');
		if (refKml != null && refPercorrenza != null) {
			var percorrenza = (parseFloat(refKg.val()) * 1.56) * parseFloat(refKml.val());
			percorrenza = ''+percorrenza;
			refPercorrenza.text(parseInt(formattaFloatOutput(percorrenza)));
		}
	}
}

/**
 * Calcola da kg a litri
 */
function calcolaLitriKgKg() {
	var refKg = $('#litriKgKg');
	if (refKg != null) {
		var tmp = ''+refKg.val();
		tmp = tmp.replace(".", "");
		var input = validaInputNoDefault(refKg.val());
		if (tmp != input.replace(".", "")) {
			refKg.val(input);
		}
		var res = '' + (parseFloat(refKg.val()) * 1.56);
		var refLitri = $('#litriKgLitri');
		if (refLitri != null) {
			refLitri.val(formattaFloatOutput(res));
		}
		var refKml = $('#impostazioniKml');
		var refPercorrenza = $('#litriKgPercorrenza');
		if (refKml != null && refPercorrenza != null) {
			var percorrenza = parseFloat(refLitri.val()) * parseFloat(refKml.val());
			percorrenza = ''+percorrenza;
			refPercorrenza.text(parseInt(formattaFloatOutput(percorrenza)));
		}
	}
}

/**
 * 
 */
function calcolaKmTotali() {
	var returnBenzinaTotaleEuro = 0;
	var returnMetanoTotaleEuro = 0;
	var returnRisparmioTotaleEuro = 0;

	var returnBenzinaTotaleLitri = 0;
	var returnMetanoTotaleKg = 0;
	var returnBombolaIdealeLitri = 0;
	
	var returnBenzinaRifornimenti = 0;
	var returnMetanoRifornimenti = 0;
	
	var refKmTotali = $('#kmTotaliKm');
	if (refKmTotali != null) {
		var input = validaInputNoDefault(''+parseInt(refKmTotali.val()));
		if (refKmTotali.val() != input) {
			refKmTotali.val(input);
		}
		var inputKmTotali = '' + parseInt(refKmTotali.val());
		if (inputKmTotali != 'NaN') {
			var impostazioniKml = $('#impostazioniKml').val();
			var impostazioniMetanoEuro = $('#impostazioniMetanoPrezzo').val();
			var impostazioniBenzinaEuro = $('#impostazioniBenzinaPrezzo').val();
			var impostazioniBombolaLitri = $('#impostazioniBombolaInstallataLitri').val();
			var impostazioniSerbatoioLitri = $('#impostazioniBenzinaSerbatoioLitri').val();
			
			returnBenzinaTotaleLitri = parseFloat(inputKmTotali) / parseFloat(impostazioniKml);

			returnMetanoTotaleKg = returnBenzinaTotaleLitri / 1.56;
			returnBombolaIdealeLitri = parseFloat(inputKmTotali) / 0.21216 / parseFloat(impostazioniKml);
			
			returnBenzinaTotaleEuro = returnBenzinaTotaleLitri * parseFloat(impostazioniBenzinaEuro);			
			returnMetanoTotaleEuro = returnMetanoTotaleKg * parseFloat(impostazioniMetanoEuro);
			returnRisparmioTotaleEuro = returnBenzinaTotaleEuro - returnMetanoTotaleEuro;
			
			returnBenzinaRifornimenti = 1 + parseInt(returnBenzinaTotaleLitri / parseFloat(impostazioniSerbatoioLitri));
			returnMetanoRifornimenti = 1 + parseInt(returnMetanoTotaleKg / 0.8 / 0.17 / parseFloat(impostazioniBombolaLitri));
		}
	}

	$('#kmTotaliSpesaBenzina').text(formattaFloatOutput(returnBenzinaTotaleEuro));
	$('#kmTotaliSpesaMetano').text(formattaFloatOutput(returnMetanoTotaleEuro));
	$('#kmTotaliSpesaRisparmio').text(formattaFloatOutput(returnRisparmioTotaleEuro));
	
	$('#kmTotaliCarburanteBenzina').text(formattaFloatOutput(returnBenzinaTotaleLitri));
	$('#kmTotaliCarburanteMetano').text(formattaFloatOutput(returnMetanoTotaleKg));
	$('#kmTotaliCarburanteBombola').text(formattaFloatOutput(returnBombolaIdealeLitri));
	
	$('#kmTotaliRifornimentiBenzina').text(formattaFloatOutput(returnBenzinaRifornimenti));
	$('#kmTotaliRifornimentiMetano').text(formattaFloatOutput(returnMetanoRifornimenti));
}

