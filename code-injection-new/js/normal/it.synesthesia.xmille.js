












$('#paginaRisultati').live('pageinit', function(event) {
	
	if(!checkConnection()) {
		alert("Connessione a internet assente. L'applicazione richiede una connessione attiva per la ricerca cercare.");
		$.mobile.changePage('index.html');
	}
	
	
	$.mobile.showPageLoadingMsg("b", "Caricamento", false);
	caricaAnagrafica();
});

$("#formCerca").live('submit', function(){
	data = $('form').serialize();
});


function caricaAnagrafica() {
	$.getJSON(serviceURL + '?' + data, function(data) {
		$('#anagraficaList li').remove();
		aitems = data.items;
		
		if(aitems.length == 0) {
			alert('Nessun dato trovato. Prova a cambiare i parametri di ricerca');
			$.mobile.changePage('index.html');
		} else {
			
			for(i=0; i<aitems.length; i++) {
				var aitem = aitems[i];
				
				$('#anagraficaList').append('<li><a href="javascript:openDettaglio(' + aitem.id + ');">' +
						'<img class="listTipoImg" src="pics/' + aitem.tipo + '.png"/>' +
						'<h4>' + aitem.denominazione + '</h4>' +
						'<p>' + aitem.citta + ' (' + aitem.provincia + ')' + '</p>') +
						'</a></li>';
			}

			
			/*
			$.each(aitems, function(index, aitem) {
				$('#anagraficaList').append('<li><a href="dettaglio.html?id=' + aitem.id + '">' +
						'<img class="listTipoImg" src="pics/' + aitem.tipo + '.png"/>' +
						'<h4>' + aitem.denominazione + '</h4>' +
						'<p>' + aitem.citta + ' (' + aitem.provincia + ')' + '</p>');
			});
			*/
			
			$('#anagraficaList').listview('refresh');
			
		}
			$.mobile.hidePageLoadingMsg();

		
	});
}


$('#paginaPreferiti').live('pageinit', function(event) {
	
	caricaPreferiti();
});

function caricaPreferiti() {
	
	var preferiti = getStorage();
	aitems = [];
	
	
	$.each(preferiti, function(index, aitemSer) {
		
		var aitem = JSON.parse(aitemSer);
		aitems.push(aitem); 
		
		$('#preferitiList').append('<li><a href="javascript:openDettaglio(' + aitem.id + ');">' +
				'<img class="listTipoImg" src="pics/' + aitem.tipo + '.png"/>' +
				'<h4>' + aitem.denominazione + '</h4>' +
				'<p>' + aitem.citta + '(' + aitem.provincia + ')' + '</p>') +
				'</a></li>';
		
	});

	if(aitems.length == 0) {
		alert('Nessun preferito salvato. Puoi aggiungere preferiti cliccando su "+preferiti" nella scheda di dettaglio');
		$.mobile.changePage('index.html');
		return;
	}
	
	$('#preferitiList').listview('refresh');

}


var idDettaglio;
var jsonDettaglio;

//var addPrefHtmlButt = '<a href="#" id="addPreferiti" onclick="addPreferiti();" data-icon="minus" data-transition="fade">Preferiti</a>';
//var delPrefHtmlButt = '<a href="#" id="delPreferiti" onclick="delPreferiti();" data-icon="minus" data-transition="fade">Preferiti</a>';

$('#paginaDettaglio').live('pageshow', function(event) {
	idDettaglio = window.localStorage.getItem("dettaglioId");
	//idDettaglio = getUrlVars()['id'];
	caricaDettaglio();
	

});

function caricaDettaglio() {
	
	for(i=0; i<aitems.length; i++) {
		if(aitems[i].id == idDettaglio) {
			jsonDettaglio = aitems[i];
			break;
		}		
	}
	
	$('#dettaglioDenominazione').html(jsonDettaglio.denominazione);
	$('#dettaglioTipo').html(tipi[jsonDettaglio.tipo]);
	$('#dettaglioIndirizzo').html(jsonDettaglio.indirizzo);
	$('#dettaglioCitta').html(jsonDettaglio.cap + ' ' +jsonDettaglio.citta + (jsonDettaglio.citta != jsonDettaglio.provincia?' (' + jsonDettaglio.provincia + ')':'') );
	$('#dettaglioCf').val(addCommas(jsonDettaglio.cf, ' '));

	$("#dettaglioTipoImg").attr("src",'pics/' + jsonDettaglio.tipo + '.png');
	
	updatePreferiti();
}



function updatePreferiti() {
	
	if(hasInStorage(idDettaglio)) {
		$('#togglePreferiti').buttonMarkup({ icon: "minus" });
	} else {
		$('#togglePreferiti').buttonMarkup({ icon: "favorite" });
	}

}

function togglePreferiti() {
	
	if(hasInStorage(idDettaglio)) {
		removeFromStorage(idDettaglio);
		//alert("Elemento rimosso dai preferiti");
	} else {
		var serJson = JSON.stringify(jsonDettaglio, null, 2);
		addToStorage(idDettaglio, serJson);	
		//alert("Elemento aggiunto preferiti");
	}
	
	var stor = getStorage();
	//alert(JSON.stringify(stor, null, 2));
	
	updatePreferiti();
	
}


//var serviceURL = "http://localhost.dev/syx_api/xmille/get.php?d=una&c=&p=1&a=.json";
//var serviceURL = "http://localhost.dev/syx_api/xmille/get.php";
var serviceURL = "http://api.syx.it/xmille/get.php";
var data;
var aitems;
var tipi = {
		'A' : "ONLUS / Volontariato" ,
        'B' : "Ricerca Scientifica / Università" ,
        'C' : "Ricerca Sanitaria" ,
        'E' : "Associazioni Sportive Dilettantistiche" };

$.mobile.page.prototype.options.domCache = false;

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function addCommas(nStr, el)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + el + '$2');
	}
	return x1 + x2;
}

function checkConnection() {
    if(navigator.network.connection.type == Connection.NONE)
    	return false;
    	
    return true;
}


//Adding to storage
function addToStorage(id, label) {
	if(!hasInStorage(id)) {
		var data = getStorage();
		data[id] = label;
		saveStorage(data);
	}
}

//loading from storage
function getStorage() {
	var current = localStorage["favorites"];
	var data = {};
	if( typeof current != "undefined")
		data = window.JSON.parse(current);
	return data;
}

//Checking storage
function hasInStorage(id) {
	return ( id in  getStorage());
}

//Adding to storage
function removeFromStorage(id) {
	if(hasInStorage(id)) {
		var data = getStorage();
		delete data[id];
		console.log('removed ' + id);
		saveStorage(data);
	}
}

//save storage
function saveStorage(data) {
	console.log("To store...");
	console.dir(data);
	localStorage["favorites"] = window.JSON.stringify(data);
}

function openDettaglio(id) {
	$.mobile.changePage( "dettaglio.html", { transition: "slideup"} );
	window.localStorage.setItem("dettaglioId", id);
}

