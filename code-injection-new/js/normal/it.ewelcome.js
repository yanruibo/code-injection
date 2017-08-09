





		var db = window.openDatabase("Database", "1.0", "eWelcome", 200000);
		
		var codice = "";
		var codiceConfig = "";
		var xmlConfigAnagrafica = "";
		var xmlConfigProfili = "";
		var xmlConfigQuestionario = "";
		var parametriOffline = "";
		
		var msgNotValid = ' non valido, i caratteri ", <, >, non sono cosentiti.';
		
		var fieldsRequired;
		var scanner = false;
		var languageSelect = 'it';
		
	
		
	










function addContact(){
	var contact = navigator.contacts.create();
	
	console.log("displayname :  "+document.getElementsByName("Ragione Sociale")[0].value);
	console.log("telefono :  "+document.getElementsByName("Telefono")[0].value);
	console.log("fax :  "+document.getElementsByName("Fax")[0].value);
	console.log("email :  "+document.getElementsByName("Email")[0].value);
    contact.displayName = document.getElementsByName("Ragione Sociale")[0].value;
    contact.nickName = document.getElementsByName("Ragione Sociale")[0].value;
    
    var name_o = new ContactName();
    name_o.givenName= '';
    name_o.familyName= '';
    contact.name=name_o;
    
    var phoneNumbers = [];
    var i = 0;
    if(document.getElementsByName("Telefono")[0].value != ""){
    	phoneNumbers[i] = new ContactField('work', document.getElementsByName("Telefono")[0].value, false); // preferred number true
    	i++;
    }
    if(document.getElementsByName("Fax")[0].value != ""){
    	phoneNumbers[i] = new ContactField('work', document.getElementsByName("Fax")[0].value, false);
    	i++
    }
    if(i>0)
    	contact.phoneNumbers = phoneNumbers;
    var emails = [];
    if(document.getElementsByName("Email")[0].value){
    	emails[0] = new ContactField('work', document.getElementsByName("Email")[0].value, false); 
        contact.emails = emails;
    }
    contact.save(onSaveContactSuccess,onSaveContactError);
}

function onSaveContactSuccess(contact) {
	if(languageSelect && languageSelect == 'it') {
		navigator.notification.alert("Salvato in contatti", false, 'Successo', 'Ok');
	}
	else{
		navigator.notification.alert("Saved in contacts", false, 'Success', 'Ok');
	}
}
function onSaveContactError(contactError) {
	console.log("Add contact error:  "+contactError.code);
	if(languageSelect && languageSelect == 'it'){ 
		navigator.notification.alert("Inviato alla rubrica", false, 'Errore', 'Ok');
	}
	else{
		navigator.notification.alert("Send to contacts", false, 'Error', 'Ok');
	}
}

document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

$('div:jqmData(role="page")[id="home"]').live('pagebeforeshow',function(event,ui){
	$('#waitingHome').hide(500);
	scanner = false;
	if(languageSelect && languageSelect == 'en') 
		$('html').localize();
});

 
$('div:jqmData(role="page")[id="anagrafica"]').live('pagebeforeshow',function(event,ui){
	$('#waitingAna').show(500);
	censimento();
	if(languageSelect && languageSelect == 'en') 
		$('html').localize();
});

$('div:jqmData(role="page")[id="pageStatistiche"]').live('pagebeforeshow',function(event,ui){
	$('#waitingStat').show(500);
	getStatistiche();
	if(languageSelect && languageSelect == 'en') 
		$('html').localize();
});

function backHome() {
	$('#waitingHome').hide(500);
	scanner = false;
	location.href = "index.html";
}




function onBackKeyDown() {
	if($.mobile.activePage.is('#home')){
		if(languageSelect && languageSelect == 'it') {
			if (confirm("Chiudere l'applicazione?")){
				navigator.app.exitApp()	;
			}
		}else{
			if (confirm("Close application?")){
				navigator.app.exitApp()	;
			}
		}
	}else{
		backHome();
	}
	
	
}

function openTabAnagrafica(){
	document.getElementById("tabAnagrafica").style.display = "block";
	document.getElementById("tabProfili").style.display = "none";
	document.getElementById("tabQuestionario").style.display = "none";
}

function openTabProfili(){
	document.getElementById("tabAnagrafica").style.display = "none";
	document.getElementById("tabProfili").style.display = "block";
	document.getElementById("tabQuestionario").style.display = "none";
}

function openTabQuestionario(){
	document.getElementById("tabAnagrafica").style.display = "none";
	document.getElementById("tabProfili").style.display = "none";
	document.getElementById("tabQuestionario").style.display = "block";
}

function openStatistiche() {
	location.href = "statistiche.html";
}

function onOnline() {
	$('#waitingHome').show(500);
	setCodiceConfig();
	document.getElementById("ledHome").src = "images/ledOn.png";
	var ledAnagrafica = document.getElementById("ledAna");
	if(ledAnagrafica)
		ledAnagrafica.src = "images/ledOn.png";
	var ledstatistiche = document.getElementById("ledStat");
	if(ledstatistiche)
		ledstatistiche.src = "images/ledOn.png";
	
	// se gi‡ registrato
	if(codiceConfig != "") {
		// salvataggio sul web service delle scanzioni offline
		sendParametriOffline();
		
		
	}
	
	// enabled button
	document.getElementById("buttonStatistiche").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow";
	document.getElementById("buttonRegistrazione").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow";
	
	
	
	$('#waitingHome').hide(500);
}

function onOnlineSkipCallWs() {
	document.getElementById("ledHome").src = "images/ledOn.png";
	var ledAnagrafica = document.getElementById("ledAna");
	if(ledAnagrafica)
		ledAnagrafica.src = "images/ledOn.png";
	var ledstatistiche = document.getElementById("ledStat");
	if(ledstatistiche)
		ledstatistiche.src = "images/ledOn.png";
	
	// enabled button
	document.getElementById("buttonStatistiche").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow";
	document.getElementById("buttonRegistrazione").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow";
	
	
}

function onOffline() {
	document.getElementById("ledHome").src = "images/ledOff.png";
	var ledAnagrafica = document.getElementById("ledAna");
	if(ledAnagrafica)
		ledAnagrafica.src = "images/ledOff.png";
	var ledstatistiche = document.getElementById("ledStat");
	if(ledstatistiche)
		ledstatistiche.src = "images/ledOff.png";
	
	// disabled button
	document.getElementById("buttonStatistiche").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow ui-disabled";
	//document.getElementById("buttonRegistrazione").className = "ui-btn ui-btn-up-a ui-btn-corner-all ui-shadow ui-disabled";
	
}

function generateXml(data,vCode,anagrafica,profili,questionario) {
	var xml = "<Rilevazione><Data>"+data+"</Data><q>"+codiceConfig+"</q><vCode>"+vCode+"</vCode>";
	xml = xml + "<Anagrafica>";
	if(anagrafica != null) {
		var params = anagrafica.split('&');
		for(var i=0; i<params.length;i++) {
			var tag = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(tag != 'null' && tag != 'q')
				xml = xml + '<Dato id="'+tag+'">'+value+'</Dato>';
		}
	}
	xml = xml + "</Anagrafica>";
	
	xml = xml + "<Profili>";
	if(profili != null) {
		params = profili.split('&');
		for(var i=0; i<params.length;i++) {
			var tag = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(tag != 'null' && tag != 'q')
				xml = xml + '<Dato id="'+tag+'">'+value+'</Dato>';
		}
	}
	xml = xml + "</Profili>";
	
	xml = xml + "<Questionario>";
	if(questionario != null) {
		params = questionario.split('&');
		for(var i=0; i<params.length;i++) {
			var tag = params[i].split('=')[0];
			var value = params[i].split('=')[1];
			if(tag != 'null' && tag != 'q') {
				xml = xml + "<D>";
				xml = xml + "<T>"+tag+"</T>";
				xml = xml + "<R>"+value+"</R>";
				xml = xml + "</D>";
			}
		}
	}
	xml = xml + "</Questionario>";
	xml = xml + "</Rilevazione>";
	return xml;
}


function validate(value) {
	if(value.indexOf('<') != -1){
		return false
	}
	if(value.indexOf('>') != -1){
		return false
	}
	if(value.indexOf('"') != -1){
		return false
	}
	return true;
}

//Torta 1
function plotData() {
 	var myColor = ["#fbb400","#f50032"];
	var nRegGlo = parseInt(document.getElementById('nRegGlo').firstChild.data);
	var nRegOdi = parseInt(document.getElementById('nRegOdi').firstChild.data);
	var myData = [nRegGlo,nRegOdi];
	var canvas;
	var ctx;
	var lastend = 0;
	var myTotal = nRegGlo;
	
	canvas = document.getElementById("canvas1");
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < myData.length; i++) {
		ctx.fillStyle = myColor[i];
		ctx.beginPath();
		ctx.moveTo(100,75);
		ctx.arc(100,75,75,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
		ctx.lineTo(100,75);
		ctx.fill();
		lastend += Math.PI*2*(myData[i]/myTotal);
	}
}	

// Torta 2
function plotData2() {
	var myColor = ["#283c83","#00b739"];
	var nRegMat = parseInt(document.getElementById('nRegMat').firstChild.data);
	var nRegSer = parseInt(document.getElementById('nRegSer').firstChild.data);
	var myData = [nRegMat,nRegSer];
	var canvas;
	var ctx;
	var lastend = 0;
	var myTotal = parseInt(document.getElementById('nRegOdi').firstChild.data);

	canvas = document.getElementById("canvas2");
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < myData.length; i++) {
		ctx.fillStyle = myColor[i];
		ctx.beginPath();
		ctx.moveTo(100,75);
		ctx.arc(100,75,75,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
		ctx.lineTo(100,75);
		ctx.fill();
		lastend += Math.PI*2*(myData[i]/myTotal);
	}
}

function openDemo() {
	location.href = "#";
}

function callAjax(url,params, success, error){
    console.log("chiamo " + url + '?' + params);
    $.ajax({
        async: false,
        type: "GET",
        url: url + '?' + params,
        dataType: "xml",
        success: success,
        error: error
    });
}

function callAjaxPost(url, params, success, error){
    console.log("chiamo " + url + '?' + params);
    $.ajax({
        async: false,
        type: "POST",
        url: url,
        data: params,
        success: success,
        error: error
    });
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
    db.transaction(createDB, errorDB, setCodiceConfig);
	
	document.getElementById("buttonManuale").href = webServicesUrl+'/pdf/Manuale eContact_'+languageSelect+'.pdf';
	document.getElementById("buttonGuida").href = webServicesUrl+'/pdf/SMART GUIDE eContact_'+languageSelect+'.pdf';
}

function createDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS configurazione');
    tx.executeSql('CREATE TABLE IF NOT EXISTS configurazione (codice unique, xmlAnagrafica, xmlProfili, xmlQuestionario)');
    // tabella parametri per webServices offline
    tx.executeSql('CREATE TABLE IF NOT EXISTS parametriOffline (data, codice, parametriAnagrafica, parametriProfili, parametriQuestionario)');
}

function setCodiceConfig() {
	db.transaction(checkRegistrato, errorDB);
}

function errorDB(err) {
    console.log("Error processing SQL: "+ err.code + "message " + err.message);
}

/**
 *  controllo se gi‡ registrato
 */
function checkRegistrato(tx) {
    tx.executeSql('SELECT * FROM configurazione', [], registrato, errorDB);
}
function registrato(tx, results) {
	document.getElementById("registrazione").style.display = 'block'; 
	document.getElementById("test").style.display = 'block';
	
	document.getElementById("censimento").style.display = 'none';
	document.getElementById("statistiche").style.display = 'none';
	document.getElementById("reset").style.display = 'none'; 
	codiceConfig = results.rows.item(0).codice;
	if(codiceConfig != "") {
		// registrato
		document.getElementById("registrazione").style.display = 'none'; 
    	document.getElementById("test").style.display = 'none';
    	
    	document.getElementById("reset").style.display = 'block';  	
    	document.getElementById("censimento").style.display = 'block';
    	document.getElementById("statistiche").style.display = 'block';
	}
}

/**
 *  salva configurazione
 */
function saveConfigurazione() {
	db.transaction(insertConfigurazione, errorDB);
}
function insertConfigurazione(tx) {
	var sql = "INSERT INTO configurazione (codice, xmlAnagrafica, xmlProfili, xmlQuestionario) VALUES ('"+codiceConfig+"', '"+xmlConfigAnagrafica+"', '"+xmlConfigProfili+"', '"+xmlConfigQuestionario+"')";
	tx.executeSql(sql);
	
	document.getElementById("registrazione").style.display = 'none'; 
	document.getElementById("test").style.display = 'none'; 
	
	document.getElementById("censimento").style.display = 'block';
	document.getElementById("statistiche").style.display = 'block';
	
	 document.getElementById("reset").style.display = 'block';

}

/**
 *  Get Configurazione
 */
function openAnagrafica() {
	db.transaction(findConfigurazione, errorDB);
}
function findConfigurazione(tx){
	tx.executeSql('SELECT * FROM configurazione', [], getConfigurazione, errorDB);
}
function getConfigurazione(tx, results) {
	codiceConfig = results.rows.item(0).codice;
	xmlConfigAnagrafica =  results.rows.item(0).xmlAnagrafica;
	xmlConfigProfili =  results.rows.item(0).xmlProfili;
	xmlConfigQuestionario = results.rows.item(0).xmlQuestionario;
	
	getXmlValue();
}

/**
 *  update xml dell'anagrafica
 */
/*
function updateXmlAnagrafica(newXml) {
	xmlConfigAnagrafica = newXml;
	db.transaction(updateXmlAnagraficaExecute, errorDB);
}
function updateXmlAnagraficaExecute(tx) {
	var sql = "UPDATE configurazione SET xmlAnagrafica = '"+xmlConfigAnagrafica+"' WHERE codice = '" + codiceConfig + "'";
	tx.executeSql(sql);
}*/

/**
 *  update xml del questionario
 */
function updateXmlQuestionario(newXml) {
	xmlConfigQuestionario = newXml;
	db.transaction(updateXmlQuestionarioExecute, errorDB);
}
function updateXmlQuestionarioExecute(tx) {
	var sql = "UPDATE configurazione SET xmlQuestionario = '"+xmlConfigQuestionario+"' WHERE codice = '" + codiceConfig + "'";
	tx.executeSql(sql);
}

/**
 * salva parametri offline
 */
function saveCodiceOffline() {
	db.transaction(insertCodiceOffline, errorDB);
}
function insertCodiceOffline(tx) {
	var sql = "INSERT INTO parametriOffline (data, codice) VALUES ('"+dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss')+"','"+codice+"')";
	tx.executeSql(sql);
	console.log("insertCodiceOffline " + sql);
}

function saveParametriAnagraficaOffline() {
	db.transaction(updateParametriAnagraficaOffline, errorDB);
}
function updateParametriAnagraficaOffline(tx) {
	var sql = "INSERT OR IGNORE INTO parametriOffline (data, codice) VALUES ('"+dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss')+"','"+codice+"');";
	tx.executeSql(sql);
	sql = "UPDATE parametriOffline SET parametriAnagrafica = '"+parametriOffline+"' WHERE codice = '" + codice + "'";
	console.log("updateParametriAnagraficaOffline " + sql);
	tx.executeSql(sql);
}

function saveParametriProfiliOffline() {
	db.transaction(updateParametriProfiliOffline, errorDB);
}
function updateParametriProfiliOffline(tx) {
	var sql = "INSERT OR IGNORE INTO parametriOffline (data, codice) VALUES ('"+dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss')+"','"+codice+"');";
	tx.executeSql(sql);
	sql = "UPDATE parametriOffline SET parametriProfili = '"+parametriOffline+"' WHERE codice = '" + codice + "'";
	tx.executeSql(sql);
	console.log("updateParametriProfiliOffline " + sql);
}

function saveParametriQuestionarioOffline() {
	db.transaction(updateParametriQuestionarioOffline, errorDB);
}
function updateParametriQuestionarioOffline(tx) {
	var sql = "INSERT OR IGNORE INTO parametriOffline (data, codice) VALUES ('"+dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss')+"','"+codice+"');";
	tx.executeSql(sql);
	sql = "UPDATE parametriOffline SET parametriQuestionario = '"+parametriOffline+"' WHERE codice = '" + codice + "'";
	tx.executeSql(sql);
	console.log("saveParametriQuestionarioOffline " + sql);
}

/**
 * get parametri offline
 */
function sendParametriOffline() {
	db.transaction(findParametriOffline, errorDB);
}
function findParametriOffline(tx){
	tx.executeSql('SELECT * FROM parametriOffline', [], callWebService, errorDB);
}
function callWebService(tx, results) {
	console.log("callWebService");
	var xml = "";
    for (var i = 0; i < results.rows.length; i++){
    	var data = results.rows.item(i).data;
    	var vCode = results.rows.item(i).codice;
    	var anagrafica = results.rows.item(i).parametriAnagrafica;
    	var profili = results.rows.item(i).parametriProfili;
    	var questionario = results.rows.item(i).parametriQuestionario;
    	xml = generateXml(data,vCode,anagrafica,profili,questionario);
    	console.log("callWebService " + xml);
        sendXmlToWebService(xml);
    }
}


/**
 * process the confirmation dialog result
 */
function onConfirmResetStore(buttonIndex) {
	console.log(buttonIndex);
	if(buttonIndex == 1) {
		dropTableParametriOffline();
		dropTableConfigurazione();
		setTimeout("window.location.reload()", 1000);
	}
}

/**
 * Show a custom confirmation dialog
 */ 
function resetStore() {
    navigator.notification.confirm(
        "Vuoi resettare l'applicazione?",  // message
        onConfirmResetStore,              // callback to invoke with index of button pressed
        'Avviso',            // title
        'Reset,Annulla'          // buttonLabels
    );
}


/**
 * svuota tabella parametri offline
 */
function dropTableParametriOffline() {
	 db.transaction(dropTableParametriOfflineExecute, errorDB);
}

function dropTableParametriOfflineExecute(tx) {
   tx.executeSql('DROP TABLE IF EXISTS parametriOffline');
   tx.executeSql('CREATE TABLE IF NOT EXISTS parametriOffline (data, codice, parametriAnagrafica, parametriProfili, parametriQuestionario)');
   
}

/**
 * svuota tabella configurazione
 */
function dropTableConfigurazione() {
	 db.transaction(dropTableConfigurazioneExecute, errorDB);
}
function dropTableConfigurazioneExecute(tx) {
    tx.executeSql('DROP TABLE IF EXISTS configurazione');
    tx.executeSql('CREATE TABLE IF NOT EXISTS configurazione (codice unique, xmlAnagrafica, xmlProfili, xmlQuestionario)');
    
}

//var webServicesUrl = 'http://econtact.crismaitalia.it';
var webServicesUrl = 'http://econtact.fieramilano.it';

function getNodeValue(parent, tagName) {
    var node = parent.getElementsByTagName(tagName)[0];
    return (node && node.firstChild) ? node.firstChild.nodeValue : false;
}

/**
 *  get configurazione
 */

function loadXMLDoc(url, params) {
    callAjax(url, params, writeXmlConfig, errorConnectionAlert);
}

function writeXmlConfig(data) {
    try {
        var response = data.documentElement;
        var content = response.getElementsByTagName('content')[0];
        var errore = content.getElementsByTagName('Errore')[0];
        if (errore) {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it')
                navigator.notification.alert(getNodeValue(errore, 'Messaggio'), false, 'Errore', 'Ok');
            else
                navigator.notification.alert(getNodeValue(errore, 'Messaggio'), false, 'Error', 'Ok');
        } else {
            var anagrafica = content.getElementsByTagName('Anagrafica')[0];
            xmlConfigProfili = "";
            var profili = content.getElementsByTagName('Profili')[0];
            xmlConfigQuestionario = "";
            var questionario = content.getElementsByTagName('Questionario')[0];
            if (window.ActiveXObject) {
                xmlConfigAnagrafica = anagrafica.xml;
                if (profili) {
                    xmlConfigProfili = profili.xml;
                }
                if (questionario) {
                    xmlConfigQuestionario = questionario.xml;
                }
            } else {
                xmlConfigAnagrafica = (new XMLSerializer()).serializeToString(anagrafica);
                if (profili) {
                    xmlConfigProfili = (new XMLSerializer()).serializeToString(profili);
                }
                if (questionario) {
                    xmlConfigQuestionario = (new XMLSerializer()).serializeToString(questionario);
                }
            }
            saveConfigurazione();
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it')
                navigator.notification.alert("Dispositivo registrato", false, 'Codice valido', 'Ok');
            else
                navigator.notification.alert("Registered device", false, 'Valid code', 'Ok');
        }

    } catch (e) {
        console.log("*****writeXmlConfig*****" + e.message);
        //navigator.notification.vibrate(2000);

        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Errore, riprovare piu' tardi", false, 'Errore', 'Ok');
        else
            navigator.notification.alert("Error, try again later", false, 'Error', 'Ok');
        backHome();
    }
}

function checkCodiceLettore() {
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        backHome();
    } else {
        paramsConf = 'q=' + codiceConfig + '&lang=' + languageSelect;
        loadXMLDoc(webServicesUrl + '/WebServices/wsRegisterMobile.php', paramsConf);
    }
}

/**
 *  get valori visitarore
 */
function getXMLDoc(url, params) {
    callAjax(url, params, getXmlValueResponse, function() {
        onOffline();
        parametriOffline = paramsGetValue;
        saveCodiceOffline();
        configurazioneOffline();
    });
}

function getXmlValueResponse(data) {
    try {
        var response = data.documentElement;
        var content = response.getElementsByTagName('content')[0];
        var idRilevazione = document.createElement("input");
        idRilevazione.type = "hidden";
        idRilevazione.name = "idRilevazione";
        idRilevazione.value = getNodeValue(content, 'idRilevazione');
        document.getElementById("fieldsAnagrafica").appendChild(idRilevazione);
        document.getElementById("fieldsProfili").appendChild(idRilevazione);
        document.getElementById("fieldsQuestionario").appendChild(idRilevazione);

        var errore = content.getElementsByTagName('Errore')[0];
        if (errore) {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it')
                navigator.notification.alert("Anagrafica non trovata", false, 'Errore', 'Ok');
            else
                navigator.notification.alert("Registry not found", false, 'Error', 'Ok');
            backHome();
        } else {
            // generazione pagina
            var anagrafica = content.getElementsByTagName('Anagrafica')[0]; // xml con valori
            var questionario = content.getElementsByTagName('Questionario')[0]; // xml con valori
            var profili = content.getElementsByTagName('Profili')[0]; // xml con valori

            var valoriAnagrafica;
            var valoriProfili;
            var valoriQuestionario;

            if (window.ActiveXObject) {
                valoriAnagrafica = anagrafica.xml;
                if (profili) {
                    valoriProfili = profili.xml;
                }
                if (questionario) {
                    valoriQuestionario = questionario.xml;
                }
            } else {
                valoriAnagrafica = (new XMLSerializer()).serializeToString(anagrafica);
                if (profili) {
                    valoriProfili = (new XMLSerializer()).serializeToString(profili);
                }
                if (questionario) {
                    valoriQuestionario = (new XMLSerializer()).serializeToString(questionario);
                }
            }

            //ANAGRAFICA todo: gestire i valori che vengono da Web. Altrimenti rimarrebbero salvati i valori di default.
            /*if(xmlConfigAnagrafica != valoriAnagrafica){
             updateXmlAnagrafica(valoriAnagrafica); // sovrascrivere sul db
             }*/

            var xmlDoc;
            var xmlValueDoc;
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlConfigAnagrafica, "text/xml");

                xmlValueDoc = parser.parseFromString(valoriAnagrafica, "text/xml");
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlConfigAnagrafica);

                xmlValueDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlValueDoc.async = false;
                xmlValueDoc.loadXML(valoriAnagrafica);
            }
            var x = xmlDoc.getElementsByTagName("Dato").length;
            
            
            for (var i = 0; i < x; i++) {
                var id = xmlDoc.getElementsByTagName("Dato")[i].attributes.getNamedItem("id").nodeValue;
                id = id.replace("+apos;", "&apos;");
                var value = xmlDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
                if (value == "True") {
                    var txt = document.createElement("input");
                    txt.type = "text";
                    txt.name = id;
                    txt.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
                    if (xmlValueDoc.getElementsByTagName("Dato")[i].childNodes[0] != null) {
                        txt.value = xmlValueDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
                    }
                    var lbl = document.createElement("label");
                    lbl.innerHTML = id;
                    document.getElementById("fieldsAnagrafica").appendChild(lbl);
                    if(id=='Telefono'){
                    	var linkAddContatto = document.createElement("a");
                    	linkAddContatto.innerHTML = '<a href="#" data-role="button" data-icon="check" data-iconpos="top" onclick="addContact();" style="padding-right:10px;"><img alt="Salva in contatti" src="images/addContact.png" /></a>';
                		document.getElementById("fieldsAnagrafica").appendChild(linkAddContatto);
                    }
                    
                    
                    
                    document.getElementById("fieldsAnagrafica").appendChild(txt);
                    document.getElementById("fieldsAnagrafica").appendChild(txt);
                    
                    
                }
            }
            var linkShowTicketImage = document.createElement("a");
            linkShowTicketImage.innerHTML = '<p><a target="_blank" href="'+webServicesUrl+'/registrazioni/visualizzaScansione.php?q='+codiceConfig+'&vCode='+codice+'" data-role="button" data-icon="check" data-iconpos="top"  style="padding-right:10px;">Visualizza biglietto da visita</a></p>';
    		document.getElementById("fieldsAnagrafica").appendChild(linkShowTicketImage);   		
    		
            $('#navAnagrafica > a').trigger('click');

            //PROFILI
            if (xmlConfigProfili == null || xmlConfigProfili == "" || valoriProfili == null || valoriProfili == "") {
                document.getElementById("navProfili").style.display = "none";
            } else {
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlConfigProfili, "text/xml");

                    xmlValueDoc = parser.parseFromString(valoriProfili, "text/xml");
                } else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlConfigProfili);

                    xmlValueDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlValueDoc.async = false;
                    xmlValueDoc.loadXML(valoriProfili);
                }
                var x = xmlDoc.getElementsByTagName("Dato").length;
                if (x == 0) {
                    document.getElementById("navProfili").style.display = "none";
                }
                for (var i = 0; i < x; i++) {
                    var id = xmlDoc.getElementsByTagName("Dato")[i].attributes.getNamedItem("id").nodeValue;
                    id = id.replace("+apos;", "&apos;");
                    var value = xmlDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
                    if (value == "True") {
                        var txt = document.createElement("input");
                        txt.type = "text";
                        txt.name = id;
                        txt.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
                        if (xmlValueDoc.getElementsByTagName("Dato")[i].childNodes[0] != null) {
                            txt.value = xmlValueDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
                        }
                        var lbl = document.createElement("label");
                        lbl.innerHTML = id;
                        document.getElementById("fieldsProfili").appendChild(lbl);
                        document.getElementById("fieldsProfili").appendChild(txt);
                    }
                }
            }

          //QUESTIONARIO
			if(valoriQuestionario == null || valoriQuestionario == "" || valoriQuestionario == null || valoriQuestionario == "") {
				document.getElementById("navQuestionario").style.display = "none";
			} else {
				if(xmlConfigQuestionario != valoriQuestionario){
					updateXmlQuestionario(valoriQuestionario); // sovrascrivere sul db
				}
				if (window.DOMParser) {
					parser = new DOMParser();
					xmlValueDoc=parser.parseFromString(valoriQuestionario,"text/xml");
				} else {
					xmlValueDoc=new ActiveXObject("Microsoft.XMLDOM");
					xmlValueDoc.async=false;
					xmlValueDoc.loadXML(valoriQuestionario);
				}
				var x=xmlValueDoc.getElementsByTagName("Domanda").length;
				if(x == 0) {
					document.getElementById("navQuestionario").style.display = "none";
				}
				fieldsRequired = new Array();
				for (var i = 0; i<x; i++) {
					var domanda = xmlValueDoc.getElementsByTagName("Domanda")[i];
					var testo = getNodeValue(domanda, 'Testo'); // <Testo>Sei ice</Testo>
					testo = testo.replace("+apos;","&apos;");
					var visible = getNodeValue(domanda, 'Visible'); // <Visible>True</Visible>
					if(visible.toUpperCase() == "TRUE") {
						var required = getNodeValue(domanda, 'Obbligatoria'); // <Obbligatoria>True</Obbligatoria>
						var br = document.createElement("br");
						switch(getNodeValue(domanda, 'Tipo')) { // <Tipo>Check</Tipo>
							case 'Testo': 
										var lbl = document.createElement("label");
										if(required.toUpperCase() == "TRUE"){
											fieldsRequired.push(testo);
											lbl.innerHTML = "*" + testo;
										} else {
											lbl.innerHTML = testo;
										}
										
										var text = document.createElement("input");
										text.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
										text.type = "text"; 
										text.name = testo;
										
										document.getElementById("fieldsQuestionario").appendChild(lbl);
										document.getElementById("fieldsQuestionario").appendChild(text);
										break;
							case 'Check':
										var lbl = document.createElement("label");
										if(required.toUpperCase() == "TRUE"){
											fieldsRequired.push(testo);
											lbl.innerHTML = "*" + testo;
										} else {
											lbl.innerHTML = testo;
										}
										
										var divRadio = document.createElement("div");
										divRadio.className = "inputRadio";
										
										var si = document.createElement("input");
										si.type = "checkbox"; 
										si.id="radio-si-" + i;
										si.name = testo;
                                        si.value = "True";
                                        si.className = "checkRadio";
                                        // si.checked = "checked";
										var lblforsi = document.createElement("label");
										lblforsi.htmlFor = "radio-si-" + i;
										lblforsi.innerHTML = "&ensp;Si";
										lblforsi.className = "labelRadio";
                                        
										var no = document.createElement("input");
										no.type = "checkbox"; 
										no.id="radio-no-" + i;
										no.name = testo;
                                        no.value = "False";
                                        no.className = "checkRadio";
										var lblforno = document.createElement("label");
										lblforno.htmlFor = "radio-no-" + i;
										lblforno.innerHTML = "&ensp;No";
										lblforno.className = "labelRadio";
                                                                            
										document.getElementById("fieldsQuestionario").appendChild(lbl);
										divRadio.appendChild(si);
										divRadio.appendChild(lblforsi);
										divRadio.appendChild(no);
										divRadio.appendChild(lblforno);
										document.getElementById("fieldsQuestionario").appendChild(divRadio);
                                        document.getElementById("fieldsQuestionario").appendChild(br);
    
                                        $("input:checkbox").click(function(){
                                            var group = "input:checkbox[name='"+$(this).attr("name")+"']";
                                            $(group).attr("checked",false);
                                            $(this).attr("checked",true);
                                        });
										break;
							case 'Multi': 
										var lbl = document.createElement("label");
										if(required.toUpperCase() == "TRUE"){
											fieldsRequired.push(testo);
											lbl.innerHTML = "*" + testo;
										} else {
											lbl.innerHTML = testo;
										}
										
										var textarea = document.createElement("textarea");
										textarea.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset"; 
										textarea.name = testo;
										
										document.getElementById("fieldsQuestionario").appendChild(lbl);
										document.getElementById("fieldsQuestionario").appendChild(textarea);
										break;
						}
					}
				}
			}
		}

        var msg = content.getElementsByTagName('Alert');

        if (msg != null && msg.length > 0) {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it') {
                navigator.notification.alert(getNodeValue(msg[0], 'Messaggio'), false, 'Messaggio', 'Ok');
            }
            else {
                navigator.notification.alert(getNodeValue(msg[0], 'Messaggio'), false, 'Message', 'Ok');
            }
        }
        $('#waitingAna').hide(500);
    } catch (e) {
        console.log("*****getXmlValueResponse*****" + e.message);
        //navigator.notification.vibrate(2000);
        /*if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Errore, riprovare piu' tardi", false, 'Error', 'Ok');
        else
            navigator.notification.alert("Error, try again later", false, 'Error', 'Ok');
            */
        onOffline();
        parametriOffline = paramsGetValue;
        saveCodiceOffline();
        configurazioneOffline();
        backHome();
    }
}

function getXmlValue() {
    var networkState = navigator.network.connection.type;
    paramsGetValue = "q=" + codiceConfig + "&vCode=" + codice + '&lang=' + languageSelect;
    if (networkState == Connection.NONE) {
        onOffline();
        parametriOffline = paramsGetValue;
        saveCodiceOffline();
        configurazioneOffline();
    } else {
        // saveCodiceOffline(); // TODO commentata xch√® non serve.
        onOnlineSkipCallWs();
        console.log("*****paramsGetValue*****" + paramsGetValue);
        return getXMLDoc(webServicesUrl + '/WebServices/wsGetVisitorData.php', paramsGetValue);
    }
}

function configurazioneOffline() {
    var xmlDoc;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlConfigAnagrafica, "text/xml");
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlConfigAnagrafica);
    }
    var x = xmlDoc.getElementsByTagName("Dato").length;
    for (var i = 0; i < x; i++) {
        var id = xmlDoc.getElementsByTagName("Dato")[i].attributes.getNamedItem("id").nodeValue;
        id = id.replace("+apos;", "&apos;");
        var value = xmlDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
        if (value == "True") {
            var txt = document.createElement("input");
            txt.type = "text";
            txt.name = id;
            txt.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
            var lbl = document.createElement("label");
            lbl.innerHTML = id;
            document.getElementById("fieldsAnagrafica").appendChild(lbl);
            document.getElementById("fieldsAnagrafica").appendChild(txt);
        }
    }

    if (xmlConfigProfili == null || xmlConfigProfili == "") {
        document.getElementById("navProfili").style.display = "none";
    } else {
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlConfigProfili, "text/xml");
        } else {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlConfigProfili);
        }
        var x = xmlDoc.getElementsByTagName("Dato").length;
        if (x == 0) {
            document.getElementById("navProfili").style.display = "none";
        }
        for (var i = 0; i < x; i++) {
            var id = xmlDoc.getElementsByTagName("Dato")[i].attributes.getNamedItem("id").nodeValue;
            id = id.replace("+apos;", "&apos;");
            var value = xmlDoc.getElementsByTagName("Dato")[i].childNodes[0].nodeValue;
            if (value == "True") {
                var txt = document.createElement("input");
                txt.type = "text";
                txt.name = id;
                txt.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
                var lbl = document.createElement("label");
                lbl.innerHTML = id;
                document.getElementById("fieldsProfili").appendChild(lbl);
                document.getElementById("fieldsProfili").appendChild(txt);
            }
        }
    }

    if (xmlConfigQuestionario == null || xmlConfigQuestionario == "") {
        document.getElementById("navQuestionario").style.display = "none";
    } else {
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlConfigQuestionario, "text/xml");
        } else {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlConfigQuestionario);
        }
        var x = xmlDoc.getElementsByTagName("Domanda").length;
        if (x == 0) {
            document.getElementById("navQuestionario").style.display = "none";
        }
        fieldsRequired = new Array();
        for (var i = 0; i < x; i++) {
            var domanda = xmlDoc.getElementsByTagName("Domanda")[i];
            var testo = getNodeValue(domanda, 'Testo'); // <Testo>Sei ice</Testo>
            testo = testo.replace("+apos;", "&apos;");
            var visible = getNodeValue(domanda, 'Visible'); // <Visible>True</Visible>
            if (visible.toUpperCase() == "TRUE") {
                var required = getNodeValue(domanda, 'Obbligatoria'); // <Obbligatoria>True</Obbligatoria>
                switch (getNodeValue(domanda, 'Tipo')) { // <Tipo>Check</Tipo>
                    case 'Testo':
                        var lbl = document.createElement("label");
                        if (required.toUpperCase() == "TRUE") {
                            fieldsRequired.push(testo);
                            lbl.innerHTML = "*" + testo;
                        } else {
                            lbl.innerHTML = testo;
                        }

                        var text = document.createElement("input");
                        text.type = "text";
                        text.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
                        text.name = testo;

                        document.getElementById("fieldsQuestionario").appendChild(lbl);
                        document.getElementById("fieldsQuestionario").appendChild(text);
                        break;
                    case 'Check':
                        var lbl = document.createElement("label");
                        if (required.toUpperCase() == "TRUE") {
                            fieldsRequired.push(testo);
                            lbl.innerHTML = "*" + testo;
                        } else {
                            lbl.innerHTML = testo;
                        }
                        var divRadio = document.createElement("div");
                        divRadio.className = "inputRadio";
                        var si = document.createElement("input");
                        si.type = "radio";
                        si.id = "radio-si-" + i;
                        si.name = testo;
                        si.value = "True";
                        var lblforsi = document.createElement("label");
                        lblforsi.htmlFor = "radio-si-" + i;
                        lblforsi.innerHTML = "&ensp;Si";
                        lblforsi.className = "labelRadio";

                        var no = document.createElement("input");
                        no.type = "radio";
                        no.id = "radio-no-" + i;
                        no.name = testo;
                        no.value = "False";
                        var lblforno = document.createElement("label");
                        lblforno.htmlFor = "radio-no-" + i;
                        lblforno.innerHTML = "&ensp;No";
                        lblforno.className = "labelRadio";

                        document.getElementById("fieldsQuestionario").appendChild(lbl);
                        divRadio.appendChild(si);
                        divRadio.appendChild(lblforsi);
                        divRadio.appendChild(no);
                        divRadio.appendChild(lblforno);
                        document.getElementById("fieldsQuestionario").appendChild(divRadio);
                        document.getElementById("fieldsQuestionario").appendChild(document.createElement("br"));
                        break;
                    case 'Multi':
                        var lbl = document.createElement("label");
                        if (required.toUpperCase() == "TRUE") {
                            fieldsRequired.push(testo);
                            lbl.innerHTML = "*" + testo;
                        } else {
                            lbl.innerHTML = testo;
                        }

                        var textarea = document.createElement("textarea");
                        textarea.className = "ui-input-text ui-body-a ui-corner-all ui-shadow-inset";
                        textarea.name = testo;

                        document.getElementById("fieldsQuestionario").appendChild(lbl);
                        document.getElementById("fieldsQuestionario").appendChild(textarea);
                        break;
                }
            }
        }
        $('#waitingAna').hide(500);
    }
}

/**
 *  save visitatore
 */
function sendXMLDoc(url, params) {
    callAjaxPost(url, params, readXmlResponse, function () {
        onOffline();
        parametriOffline = paramsInsertAnagrafica;
        saveParametriAnagraficaOffline();
        //navigator.notification.vibrate(2000);
        console.log("Salvato con successo");
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Salvato con successo", false, 'Successo', 'Ok');
        else
            navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
    });
}

function readXmlResponse(data) {
    try {
        var response = data.documentElement;
        var content = response.getElementsByTagName('content')[0];
        var errore = content.getElementsByTagName('Errore')[0];
        if (errore) {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it')
                navigator.notification.alert("Salvataggio non riuscito", false, 'Errore', 'Ok');
            else
                navigator.notification.alert("Saving failed", false, 'Error', 'Ok');
        } else {
            //navigator.notification.vibrate(2000);
            console.log("Salvato con successo");
            if (languageSelect && languageSelect == 'it')
                navigator.notification.alert("Salvato con successo", false, 'Successo', 'Ok');
            else
                navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
        }
    } catch (e) {
        console.log("*****readXmlResponse*****" + e.message);
        //navigator.notification.vibrate(2000);
        /*if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Errore, riprovare piu' tardi", false, 'Error', 'Ok');
        else
            navigator.notification.alert("Error, try again later", false, 'Error', 'Ok');
            */
        // non ho risposta dal server quindi salvo il locale per mandare in un secondo momento.
        onOffline();
        parametriOffline = paramsInsertAnagrafica;
        saveParametriAnagraficaOffline();
        console.log("Salvato con successo");
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Salvato con successo", false, 'Successo', 'Ok');
        else
            navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
    }
}

function salvaAnagrafica() {
    var hidden = document.getElementsByName("idRilevazione")[0];
    var idRilevazione = "";
    if (hidden) {
        idRilevazione = hidden.value;
    }
    paramsInsertAnagrafica = "q=" + codiceConfig;
    var form = document.getElementById("fieldsAnagrafica");
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
        var value = elements[i].value;
        var name = elements[i].name
        if (validate(value)) {
            paramsInsertAnagrafica = paramsInsertAnagrafica + "&" + escape(name) + "=" + escape(value);
        } else {
            if (languageSelect && languageSelect == 'it')
                alert(name + ' non valido, i caratteri ", <, >, non sono cosentiti.');
            else
                alert(name + ' i do not see, the characters ", <,>, are not allowed.');
            return false;
        }
    }
    /*
    paramsInsertAnagrafica = paramsInsertAnagrafica + "&checkbox1=" + document.getElementsByName("checkbox-1")[0].checked;
    paramsInsertAnagrafica = paramsInsertAnagrafica + "&checkbox2=" + document.getElementsByName("checkbox-2")[0].checked;
    paramsInsertAnagrafica = paramsInsertAnagrafica + "&checkbox3=" + document.getElementsByName("checkbox-3")[0].checked;
 	*/
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        onOffline();
        parametriOffline = paramsInsertAnagrafica;
        saveParametriAnagraficaOffline();
        console.log("Salvato con successo");
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Salvato con successo", false, 'Successo', 'Ok');
        else
            navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
    } else {
        onOnlineSkipCallWs();
        paramsInsertAnagrafica = paramsInsertAnagrafica + "&idRilevazione=" + idRilevazione + '&lang=' + languageSelect;
        console.log("*****paramsInsertAnagrafica*****" + paramsInsertAnagrafica);
        return sendXMLDoc(webServicesUrl + '/WebServices/wsSaveRegistry.php', paramsInsertAnagrafica);
    }
}

function salvaProfili() {
    var hidden = document.getElementsByName("idRilevazione")[0];
    var idRilevazione = "";
    if (hidden) {
        idRilevazione = hidden.value;
    }
    paramsInsertProfili = "q=" + codiceConfig;
    var form = document.getElementById("fieldsProfili");
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
        var value = elements[i].value;
        var name = elements[i].name
        if (validate(value)) {
            paramsInsertProfili = paramsInsertProfili + "&" + escape(name.replace("&apos;", "'")) + "=" + escape(value);
        } else {
            if (languageSelect && languageSelect == 'it')
                alert(name + " invalid");
            else
                navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
            return false;
        }
    }

    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        onOffline();
        parametriOffline = paramsInsertProfili;
        saveParametriProfiliOffline();
        console.log("Salvato con successo");
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Salvato con successo", false, 'Successo', 'Ok');
        else
            navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
    } else {
        onOnlineSkipCallWs();
        paramsInsertProfili = paramsInsertProfili + "&idRilevazione=" + idRilevazione + '&lang=' + languageSelect;
        console.log("*****paramsInsertProfili*****" + paramsInsertProfili);
        return sendXMLDoc(webServicesUrl + '/WebServices/wsSaveRegistryProfile.php', paramsInsertProfili);
    }
}

function salvaQuestionario() {
    for (var i = 0; i < fieldsRequired.length; i++) {
        var e = document.getElementsByName(fieldsRequired[i]);
        if (e.length >= 2) { // √ã un radio
            if (!(e[0].checked && e[1].checked)) {
                e[0].focus();
                //navigator.notification.vibrate(2000);
                if (languageSelect && languageSelect == 'it')
                    navigator.notification.alert(e[0].name + " obbligatorio", false, 'Errore', 'Ok');
                else
                    navigator.notification.alert(e[0].name + " required", false, 'Error', 'Ok');
                return false;
            }
        } else {
            if (e[0].value == "") {
                e[0].focus();
                //navigator.notification.vibrate(2000);
                if (languageSelect && languageSelect == 'it')
                    navigator.notification.alert(e[0].name + " obligatiorio", false, 'Error', 'Ok');
                else
                    navigator.notification.alert(e[0].name + " required", false, 'Error', 'Ok');
                return false;
            }
        }
    }

    paramsInsertQuestionario = "q=" + codiceConfig + '&lang=' + languageSelect;
    var form = document.getElementById("fieldsQuestionario");
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
        var name = elements[i].name
        var value = "";
        var e = document.getElementsByName(name);
        if (e.length >= 2) { // È un radio
            if (e[0].checked) {
                value = e[0].value;
                paramsInsertQuestionario = paramsInsertQuestionario + "&" + escape(name) + "=" + escape(value);
            } else if (e[1].checked) {
                value = e[1].value;
                paramsInsertQuestionario = paramsInsertQuestionario + "&" + escape(name) + "=" + escape(value);
            } else {
                paramsInsertQuestionario = paramsInsertQuestionario + "&" + escape(name) + "=" + "";
            }
            i++;
        } else {
            value = elements[i].value;
            if (validate(value)) {
                paramsInsertQuestionario = paramsInsertQuestionario + "&" + escape(name) + "=" + escape(value);
            } else {
                //navigator.notification.vibrate(2000);
                if (languageSelect && languageSelect == 'it')
                    navigator.notification.alert(name + " non valido", false, 'Errore', 'Ok');
                else
                    navigator.notification.alert(name + " invalid", false, 'Error', 'Ok');
                return false;
            }
        }
    }

    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        onOffline();
        parametriOffline = paramsInsertQuestionario;
        saveParametriQuestionarioOffline();
        console.log("Salvato con successo");
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Salvato con successo", false, 'Success', 'Ok');
        else
            navigator.notification.alert("Successfully saved", false, 'Success', 'Ok');
    } else {
        onOnlineSkipCallWs();
        console.log("*****paramsInsertQuestionario*****" + paramsInsertQuestionario);
        return sendXMLDoc(webServicesUrl + '/WebServices/wsSaveQuestion.php', paramsInsertQuestionario);
    }
}

/**
 * save visitatori offline
 */
function sendXMLDocPost(url, params) {
    callAjaxPost(url, params, sendXMLDocPostSuccess, errorConnectionAlert);
}

function sendXMLDocPostSuccess(data) {
    try {
        var response = data.documentElement;
        var content = response.getElementsByTagName('content')[0];
        var msgErrore = "";
        var errore = content.getElementsByTagName('Errore')[0];
        // TODO messaggio in inglese con if(languageSelect && languageSelect == 'en')
        if (errore) {
            if (getNodeValue(errore[0], 'CodiceVisitatore') == false) {
                msgErrore = getNodeValue(errore, 'Messaggio');
            } else {
                msgErrore = getNodeValue(errore, 'CodiceVisitatore') + ": " + getNodeValue(errore, 'Messaggio');
            }
            //navigator.notification.vibrate(2000);
            navigator.notification.alert(msgErrore, false, 'Error', 'Ok');
        } else {
            var salvati = content.getElementsByTagName('Alert')[0];
            var vCodeSalvato = getNodeValue(salvati, 'CodiceVisitatore');
            // delete codice salvato
            db.transaction(function (tx) {
                tx.executeSql("DELETE FROM parametriOffline WHERE codice = '" + vCodeSalvato + "'");
                console.log("DELETE " + vCodeSalvato);
            }, errorDB);
        }
        $('#waitingHome').hide(500);
    } catch (e) {
        console.log("*****processReqPost*****" + e.message);
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Errore, riprovare piu' tardi", false, 'Error', 'Ok');
        else
            navigator.notification.alert("Error, try again later", false, 'Error', 'Ok');
        backHome();
    }
}

function sendXmlToWebService(xml) {
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        backHome();
    } else {
        paramsPost = 'xml=' + xml + '&lang=' + languageSelect;
        console.log("*****paramsPost*****" + paramsPost);
        return sendXMLDocPost(webServicesUrl + '/WebServices/wsSaveVisitorData.php', paramsPost);
    }
}

/**
 * statistiche
 */
function loadXMLStatDoc(url, params) {
    $('#waitingStat').show();
    callAjax(url, params, readXmlStat, errorConnectionAlert);
}

function readXmlStat(data) {
    try {
        var response = data.documentElement;
        var content = response.getElementsByTagName('content')[0];

        document.getElementById("nRegGlo").innerHTML = getNodeValue(content, 'totalDetections');
        document.getElementById("nRegOdi").innerHTML = getNodeValue(content, 'totalDetectionsOfDay');
        document.getElementById("nRegMat").innerHTML = getNodeValue(content, 'totalDetectionsOfMorning');
        document.getElementById("nRegSer").innerHTML = getNodeValue(content, 'totalDetectionsOfAfternoon');

        plotData();
        plotData2();
        
        $('#waitingStat').hide(500);
    } catch (e) {
        $('#waitingStat').hide(500);
        console.log("*****readXmlStat*****" + e.message);
        if (languageSelect && languageSelect == 'it')
            navigator.notification.alert("Errore, riprovare piu' tardi", false, 'Error', 'Ok');
        else
            navigator.notification.alert("Error, try again later", false, 'Error', 'Ok');
        backHome();
    }
}

function getStatistiche() {
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE) {
        backHome();
    } else {
        onOnlineSkipCallWs();
        paramsStat = 'q=' + codiceConfig + '&lang=' + languageSelect;
        console.log("*****paramsStat*****" + paramsStat);
        return loadXMLStatDoc(webServicesUrl + '/WebServices/wsGetReaderStatistics.php', paramsStat);
    }
}

function errorConnectionAlert() {
    $('#waitingStat').hide(500);
    if (languageSelect && languageSelect == 'it')
        navigator.notification.alert("Errore nella connessione al server, riprovare piu' tardi", false, 'Error', 'Ok');
    else
        navigator.notification.alert("Error connecting to the server, try again later", false, 'Error', 'Ok');
}

var stringsEn = {
		'Demo' : 'Demo' ,
		'Test' : 'Test',
		'Registrazione' : 'Registration',
		'Statistiche' : 'Statistics',
		'Lettura' : 'Read',
		'Anagrafica' : 'Registry',
		'Profili' : 'Profiles',
		'Questionario' : 'Questionnaire',
		'Aggiorna' : 'Update',
		'Salva in contatti' : 'Save to Contacts',
		'Salva' : 'Save',
		'Statistiche Globali' : 'Global statistics',
		'Numero di registrazioni globali:' : 'Number of global records:',
		'Numero di registrazioni odierne:' : 'Number of records today:',
		'Registrazioni odierne' : 'recordings today',
		'Numero di registrazioni mattina:' : 'Number of recordings morning:',
		'Numero di registrazioni sera:' : 'Number of evening recordings:',
		'Il browser non supporta HTML5.' : 'Your browser does not support HTML5.',
		'Info commerciali Fiera SpA & Gruppo' : 'Commercial info Fiera SpA & Co',
		'Info commerciali da terzi' : 'Commercial information by third parties',
		'Analisi Profilazione' : 'Profiling analysis',
		'Salva Dati' : 'Save Data',
		'Manuale' : 'Manual',
		'Guida Veloce' : 'Smart Guide',
		'Visualizza biglietto da visita' : 'View ticket'
};
var stringsIt = {
		'Demo' : 'Demo' ,
		'Test' : 'Test',
		'Registration' : 'Registrazione',
		'Statistics' : 'Statistiche' ,
		'Read' : 'Lettura',
		'Registry' : 'Anagrafica',
		'Profiles' : 'Profili',
		'Questionnaire' : 'Questionario',
		'Update' : 'Aggiorna',
		'Save to Contacts' : 'Salva in contatti',
		'Save' : 'Salva',
		'Global statistics' : 'Statistiche Globali',
		'Number of global records:' : 'Numero di registrazioni globali:',
		'Number of records today:' : 'Numero di registrazioni odierne:',
		'recordings today' : 'Registrazioni odierne',
		'Number of recordings morning:' : 'Numero di registrazioni mattina:',
		'Number of evening recordings:' : 'Numero di registrazioni sera:',
		'Your browser does not support HTML5.' : 'Il browser non supporta HTML5.',
		'Commercial info Fiera SpA & Co' : 'Info commerciali Fiera SpA & Gruppo',
		'Commercial information by third parties' : 'Info commerciali da terzi',
		'Profiling analysis' : 'Analisi Profilazione',
		'Save Data' : 'Salva Dati',
		'Manual' : 'Manuale',
		'Smart Guide' : 'Guida Veloce',
		'View ticket' : 'Visualizza biglietto da visita' 
};

jQuery.fn.localize = function() {
	if(languageSelect == 'en') {
		if(!stringsEn) 
			return;
		this.find("*").contents().each(function() {
				if (typeof this.data == 'string') {
					var s = jQuery.trim(this.data);
					if (typeof s == 'string' && s.length > 0) {
						var s2 = stringsEn[s];
						if (typeof s2 == 'string') {
							this.data = s2;
						}
					}
				}
				return this;
		});
	} else {
		if(!stringsIt) 
			return;
		this.find("*").contents().each(function() {
				if (typeof this.data == 'string') {
					var s = jQuery.trim(this.data);
					if (typeof s == 'string' && s.length > 0) {
						var s2 = stringsIt[s];
						if (typeof s2 == 'string') {
							this.data = s2;
						}
					}
				}
				return this;
		});
	}
};

function changeLanguage(language) {
	languageSelect = language;
	document.getElementById("buttonManuale").href = webServicesUrl+'/pdf/Manuale eContact_'+languageSelect+'.pdf';
	document.getElementById("buttonGuida").href = webServicesUrl+'/pdf/SMART GUIDE eContact_'+languageSelect+'.pdf'
	$('html').localize();
}

function test() {
    scanner = true;
    window.plugins.barcodeScanner.scan(function (resultTest) {
        if (resultTest.text != "") {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it') {
                navigator.notification.alert("Codice a barre letto con successo\n", false, 'Risultato', 'Ok');

            }
            else { 
                navigator.notification.alert("We got a barcode\n", false, 'Result', 'Ok');
            }
        }
    }, function (errorTest) {
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
        { navigator.notification.alert("Scansione fallita: " + errorTest, false, 'Errore', 'Ok'); }
        else
        { navigator.notification.alert("Scanning failed: " + errorTest, false, 'Error', 'Ok'); }
    });
}

function registraDispositivo() {
	
    networkState = navigator.network.connection.type
    if (networkState == Connection.NONE) {
        if (languageSelect && languageSelect == 'it') {
            alert("Il server di registrazione non risulta raggiungibile.");
        } else {
            alert("The registration server cannot be contacted.");
        }
        backHome();
        return;
    } else {
        scanner = true;
        window.plugins.barcodeScanner.scan(function (resultRegistrazione) {
            codiceConfig = resultRegistrazione.text;
            if (codiceConfig.length != 20) {
                if (languageSelect && languageSelect == 'it')
                { navigator.notification.alert("Codice non valido, riprovare.", false, 'Errore', 'Ok'); }
                else
                { navigator.notification.alert("Invalid code, retry.", false, 'Error', 'Ok'); }
                backHome();
                return;
            }
            checkCodiceLettore();
        }, function (errorRegistrazione) {
            if (languageSelect && languageSelect == 'it') {
                navigator.notification.alert("Scansione fallita: " + errorRegistrazione, false, 'Error', 'Ok');
            }
            else {
                navigator.notification.alert("Scanning failed: " + errorRegistrazione, false, 'Error', 'Ok');
            }
        });

    }
    
}

function censimento() {
	
    scanner = true;
    window.plugins.barcodeScanner.scan(function (resultCensimento) {
        codice = resultCensimento.text;
        if (codice.length != 20) {
            //navigator.notification.vibrate(2000);
            if (languageSelect && languageSelect == 'it')
            { navigator.notification.alert("Codice non valido, riprovare.", false, 'Errore', 'Ok'); }
            else
            { navigator.notification.alert("Invalid code, retry.", false, 'Error', 'Ok'); }
            backHome();
            return;
        }
        openAnagrafica();
    }, function (errorCensimento) {
        //navigator.notification.vibrate(2000);
        if (languageSelect && languageSelect == 'it')
        { navigator.notification.alert("Scansione fallita: " + errorTest, false, 'Errore', 'Ok'); }
        else
        { navigator.notification.alert("Scanning failed: " + errorTest, false, 'Error', 'Ok'); }
    });
    

}
