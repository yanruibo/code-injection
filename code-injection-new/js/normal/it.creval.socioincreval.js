







	
	var tipologie = [];
	var myScroll,
	pullDownEl, 
	pullDownOffset,
	generatedCount = 0;
	
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	
	function onDeviceReady()
	{	
		navigator.splashscreen.hide();
		ShowGlobalLoader();
	    document.addEventListener("resume", onResume, false);
	    window.addEventListener("orientationchange", orientationChange, true);
		LoadPage(false);
	}
	
	function orientationChange(e) {
		setTimeout(function(){myScroll.refresh()},1500)
	}
		
	function onResume() {
    	refreshHomepage();
    }
		
	function refreshHomepage()
	{	
		ShowGlobalLoader();
		tipologie = [];
		LoadPage(true);
	}
		
	function LoadPage(isRefresh)
	{
		$('.Connection').css('display','block');
		$('.NoConnection').css('display','none');
		$('.ContenitoreTipologie #ulTipologie').html('');
	
		if(!isRefresh)
		{
			CheckDateStorage();
		}
	
		var myDate = new Date();
		//recupero data
		var displayDate = (myDate.getDate()) + '/' +(myDate.getMonth()+1) + '/'  + myDate.getFullYear();
		
	
		var datetimeTipologieStored = window.localStorage.getItem("dateSaved");
	
		//se la data da storage č null -- prima volta che lancio
		if (datetimeTipologieStored == null)
		{
			//imposto la data nello storage
			window.localStorage.setItem("dateSaved", displayDate);
			datetimeTipologieStored = displayDate;
		}
		
		//recupero tipologie dallo storage
		var tipologieLS = null;
		if(!isRefresh)
		{
			tipologieLS = window.localStorage.getItem("tipologie");
		}
		
		var firstTime = true;
		
		if(tipologieLS == null)
		{
			GetArrayCategorie();
			window.localStorage.setItem("tipologie", tipologie);
		}
		else
		{
			if(datetimeTipologieStored == displayDate)
			{
				firstTime = false;
				tipologie = tipologieLS;
			}
			else
			{
				//aggiorno le tipologie
				GetArrayCategorie();
				window.localStorage.setItem("tipologie", tipologie);
				window.localStorage.setItem("dateSaved", displayDate);
			}
		}
		
	    if(tipologie.length == 0){
		    setNoConnectionMsg();
	    }
	    else
	    {
			
			if(firstTime)
			{
				tipologie.unshift("Tutte le tipologie#ico_tutte.png");
			}
			else
			{
				tipologie = "Tutte le tipologie#ico_tutte.png,"+tipologie;
			}
			
			DrawHomepage(firstTime);
		}
	}
	
	function pullDownAction () {
		setTimeout(function () 
		{	tipologie = [];
			LoadPage(true);},500);
	}
	
	
	function CheckDateStorage()
	{
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //do that January is NOT represented by 0! 
	    var yyyy = today.getFullYear();
	
	    if (dd < 10) {
	        dd = '0' + dd;
	    }
	    if (mm < 10) {
	        mm = '0' + mm;
	    }
	    
		//recupero data da storage
		var accessDate = window.localStorage.getItem("accessDate");
	    
		if (accessDate == null)
		{
		 	var today = mm + '/' + dd + '/' + yyyy;
			window.localStorage.setItem("accessDate", today);
		}
		else
		{
		
			var today = new Date();
			var difference = today - new Date(accessDate);
	        days = Math.round(difference / (1000 * 60 * 60 * 24) - 1);
			if(days > 7)
			{
				window.localStorage.clear();
			}
		}
	}
	
	function loaded() 
	{
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		
		myScroll = new iScroll('wrapper', {
			useTransition: true,
			topOffset: pullDownOffset,
			
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Tira per aggiornare...';
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Rilascia per aggiornare...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Tira per aggiornare...';
					this.minScrollY = -pullDownOffset;
				} 
				$('#scroller a').each(function(){
					$(this).addClass('dragging');
				});
			},
			onScrollEnd: function () {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Caricamento...';				
					pullDownAction();
				}
				$('#scroller a').each(function(){
					$(this).removeClass('dragging');
				});
			},
			
			
		});
			
		setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 400);
	}
	
	

var urllist = "http://www.socioincreval.it/ScontiDedicati/_vti_bin/lists.asmx";
var urlimage;
	     
function GetLoghiByIdPagina(id)
{
	urlimage = window.localStorage.getItem("paginaLOGO_" + id);
	
	if (urlimage == null)
	{
		GetLoghiFromSP(id);
	}
	
	return urlimage;
}

var idPaginaGlobale;

function GetLoghiFromSP(idPagina)
{
	idPaginaGlobale = idPagina;

	var soapEnvPagine =
	"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
	    <soapenv:Body> \
	        <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
	            <query><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + idPagina + "</Value></Eq></Where></Query></query> \
	            <listName>Pagine</listName> \
	            <rowLimit>10000</rowLimit> \
	        </GetListItems> \
	    </soapenv:Body> \
	</soapenv:Envelope>"; 
	
   	$.ajax({
        url: urllist,
        type: "POST",
        dataType: "xml",
        timeout: 5000,
        data: soapEnvPagine,
        complete: processResultPagine,
        error: processError,
        async: false,
        contentType: "text/xml; charset=\"utf-8\""                                    
    });
}

function processError(err)
{
	urlimage = "../res/images/noLogo.png";
}

function processResultPagine(xData, status)
{ 
    var testo = xData.responseText;
    
    var index = testo.indexOf('LogoConvenzione:SW|');
    var isExist = false;
    if(index != -1)
    {
        index = index + 19;
        urlimage = testo.substring(index);
        var index2 = urlimage.indexOf('&#');
        
        if(index2 > 1)
        {
            index2 = urlimage.indexOf(',');
            urlimage = urlimage.substring(0,index2).replace('socioincrevalsp.prod.bkd','www.socioincreval.it');
        	isExist = true;
        }
        else
        {
            urlimage = "../res/images/noLogo.png";
    	}
	}
    else
    {
         urlimage = "../res/images/noLogo.png";
    }
    
    if(isExist)
    {
    	window.localStorage.setItem("paginaLOGO_" + idPaginaGlobale, urlimage);
   	}
};


(function(){if("ontouchstart"in window){var b,c,d,e,f,g,a={};b=function(a,b){return Math.abs(a[0]-b[0])>5||Math.abs(a[1]-b[1])>5},c=function(a){this.startXY=[a.touches[0].clientX,a.touches[0].clientY],this.threshold=!1},d=function(a){return this.threshold?!1:(this.threshold=b(this.startXY,[a.touches[0].clientX,a.touches[0].clientY]),void 0)},e=function(a){if(!this.threshold&&!b(this.startXY,[a.changedTouches[0].clientX,a.changedTouches[0].clientY])){var c=a.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),d.simulated=!0,a.target.dispatchEvent(d)}},f=function(b){var c=Date.now(),d=c-a.time,e=b.clientX,f=b.clientY,h=[Math.abs(a.x-e),Math.abs(a.y-f)],i=g(b.target,"A")||b.target,j=i.nodeName,k="A"===j,l=window.navigator.standalone&&k&&b.target.getAttribute("href");return a.time=c,a.x=e,a.y=f,(!b.simulated&&(500>d||1500>d&&50>h[0]&&50>h[1])||l)&&(b.preventDefault(),b.stopPropagation(),!l)?!1:(l&&(window.location=i.getAttribute("href")),i&&i.classList&&(i.classList.add("energize-focus"),window.setTimeout(function(){i.classList.remove("energize-focus")},150)),void 0)},g=function(a,b){for(var c=a;c!==document.body;){if(!c||c.nodeName===b)return c;c=c.parentNode}return null},document.addEventListener("touchstart",c,!1),document.addEventListener("touchmove",d,!1),document.addEventListener("touchend",e,!1),document.addEventListener("click",f,!0)}})();

$.support.cors = true;
var urllist = "http://www.socioincreval.it/ScontiDedicati/_vti_bin/lists.asmx";
var urlrootlist = "http://www.socioincreval.it/_vti_bin/lists.asmx";

var geocoder;
var puntiId=[];
var puntiIdUnivoci=[];
var posizioniIdUnivoche=[];
var puntiNome=[];
var puntiLat=[];
var puntiLng=[];
var puntiInd=[];
var puntiTipologia=[];
var puntiUrlImage=[];

var contatorePunti = 0;
var contatoreIdUnivoci = 0;

var soapCartinaConvenzioni =
"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
	<soapenv:Body> \
		 <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
				<listName>Cartina Convenzioni</listName> \
				<rowLimit>10000</rowLimit> \
		</GetListItems> \
	</soapenv:Body> \
</soapenv:Envelope>";

var soapAreeTematiche =
"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
	<soapenv:Body> \
		 <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
				<listName>Aree Tematiche</listName> \
				<query><Query><OrderBy><FieldRef Name='Title' /></OrderBy></Query></query> \
			 		<viewFields> \
                            <ViewFields> \
					                <FieldRef Name='Title' /> \
					                <FieldRef Name='ID' /> \
					                <FieldRef Name='IconaTipologiaApp' /> \
                           </ViewFields> \
                        </viewFields> \
            	<QueryOptions> \
					<IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns> \
				</QueryOptions> \
		</GetListItems> \
	</soapenv:Body> \
</soapenv:Envelope>";

function DisegnaPuntiMappa() 
{
	//azzero gli array
	puntiId=[];
	puntiIdUnivoci=[];
	posizioniIdUnivoche=[];
	puntiNome=[];
	puntiLat=[];
	puntiLng=[];
	puntiInd=[];
	puntiTipologia=[];
	puntiUrlImage=[];

	contatorePunti = 0;
	contatoreIdUnivoci = 0;

	//ripristino l'html originale
	$('.NumeroRisultati').css('display','block');
	$('.RisultatiRicerca').css('display','block');
	$('.MessaggioErrore').css('display','none');
	$('.MessaggioErrore').html('');
	$('.NumeroRisultati').html('');
	$('.RisultatiRicerca #thelist').html('');
	
	$.ajax({
		url: urllist,
		type: "POST",
		dataType: "xml",
		timeout: 5000,
		data: soapCartinaConvenzioni,
		complete: processPuntiConvenzioni,
		error: errorLoadingData,
		async: true,
		contentType: "text/xml; charset=\"utf-8\""			
	});
}

function processPuntiConvenzioni(xData, status) 
{   
	$(xData.responseText).find("z\\:row").each(function () 
	{
		var idPagina = $(this).attr("ows_NomeConvenzione").split(';#')[0];
		puntiId[contatorePunti]=idPagina;
	
		var nomePagina = $(this).attr("ows_NomeConvenzione").split(';#')[1];
		puntiNome[contatorePunti]= $.trim(nomePagina);
	
		var latitude = $(this).attr("ows_Title");
		puntiLat[contatorePunti]= $.trim(latitude);
	
		var longitude = $(this).attr("ows_Longitudine");
		puntiLng[contatorePunti]= $.trim(longitude);
	
		var indirizzoConvenzione = $(this).attr("ows_Indirizzo");
		puntiInd[contatorePunti]=$.trim(indirizzoConvenzione);
		
		var IdTipologia =  $(this).attr("ows_AreaTematica").split(';#')[0];
		var DescrTipologia = $(this).attr("ows_AreaTematica").split(';#')[1];
	
		var AbstractConvenzione =  $(this).attr("ows_Abstract");
		window.localStorage.setItem(contatorePunti, AbstractConvenzione);
		
		puntiTipologia[contatorePunti]= DescrTipologia;

		contatorePunti++;
	});

	if($('.SearchResults').length)
	{
		PageSearchResult();
	}
}


function PageSearchConvention()
{
	var tipologia =  getUrlVars()["tipologia"];
	tipologia = ChangeCharacter(tipologia);
	$('.PageTitle').html(tipologia);
}

function getUrlVars() {
    var vars = {};
	var value;
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	if (value == undefined){
		value = "no";
	}
    return vars;
}

function HandleFreeSearch(e){
	 if (e.keyCode == 13) {
		 FreeSearch();
	 }
}

function FreeSearch(){
	var testocercato = $('.FreeSearch').val();
	if (testocercato == ''){
		testocercato = 'here';
	}
	var raggio = 5;
	window.location.href = "pages/searchResults.html?position="+testocercato+"&range="+raggio+"&tipologia=all";
}

function HandleSearchConvenzione(e)
{
	 if (e.keyCode == 13) {
		 SearchConvenzione();
	 }
}

function SearchConvenzione(){
	$('.contentSlider input').slider();
	var testocercato = $('.Search').val();
	if((testocercato == "Posizione attuale") || (testocercato == "")){
		testocercato = "here";
	}
	var tipologia = $('.PageTitle').html();
	if(tipologia == 'Tutte le tipologie'){
		tipologia = 'all';
	}
	var raggio = $('#sliderRaggio').val();
	window.location.href = "searchResults.html?position="+testocercato+"&range="+raggio+"&tipologia="+tipologia;
}

function PageSearchResult(){


	var tipologia =  getUrlVars()["tipologia"];
	if(tipologia != undefined){
		tipologia = ChangeCharacter(tipologia);
	}
	
	var posizione =  getUrlVars()["position"];
	if(posizione != undefined){
		posizione = ChangeCharacter(posizione);
	}
	
	var range =  getUrlVars()["range"];
	if(range != undefined){
		range = ChangeCharacter(range);
	}

	try
	{
		geocoder = new google.maps.Geocoder();
		var mylat;
		var mylng;	
		var lati;
		var longi;
		if (navigator.geolocation) 
		{
			var location_timeout = setTimeout("errorLoadingData()", 10000);
		
			navigator.geolocation.getCurrentPosition(function(pos) 
			{
				clearTimeout(location_timeout);
			
				var mylat = pos.coords.latitude;
				var lati = mylat;
				var mylng = pos.coords.longitude;
				var longi = mylng;
			
				if (posizione == 'here'){
					ShowElement(lati, longi, range, mylat, mylng);
				}
				else{
					var valoreCercato = posizione;
					if ((valoreCercato.length == 5) && (Number(valoreCercato) != NaN))
					{
						valoreCercato = posizione+", Italia";
					}
					geocoder.geocode( { 'address': valoreCercato}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var lati = results[0].geometry.location.lat();
							var longi = results[0].geometry.location.lng();
							var currentLng;
							ShowElement(lati, longi, range, mylat, mylng);
						}
						else{
							myScroll.refresh();
							HideGlobalLoader();
							noResult();
						}
					});
				}
			},
			 	function(error) {
				clearTimeout(location_timeout);
				errorLoadingData();	
			});
		} 
		else 
		{
			errorLoadingData();	// Fallback for no geolocation
		}
	}
	catch (err)
	{
			errorLoadingData();	// Fallback for no geolocation
	}
}

function geolocFail1(){
	$('.MessaggioErrore').css('display','block');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').html('Tentativo di geolocalizzazione fallito');
}

function geolocFail2(){
	$('.MessaggioErrore').css('display','block');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').html('La tua ricerca di <span>'+posizione+'</span> non ha prodotto risultati');
}

function getDistance(lat1, lat2, lon1, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;
  return dist;
}

var arrayNomiPresenti=[];

function ShowElement(lat, lon, raggio, mylat, mylng)
{
	var lat1 = lat;
	var lng1 = lon;
	var mylati = mylat;
	var mylngi = mylng;
	var raggio1 = raggio;	
	var tipologiaCercata =  ChangeCharacter(getUrlVars()["tipologia"]); 
	var numeroElementi=0;
	var rag = Number(raggio1);
	var posizioneCercata =  getUrlVars()["position"]; 
	var nomePrecedente;
	var arrayConvenzioni=[];
	var arrayMulti=[];
	arrayNomiPresenti=[];
	
	for (var n=0;n<puntiLat.length;n++)
	{
		if(puntiTipologia[n] == tipologiaCercata || tipologiaCercata == 'all')
		{ 
			var lat2 = puntiLat[n];
			var lng2 = puntiLng[n];
			var km = getDistance(lat1, lat2, lng1, lng2);
			if (km <= rag){
				km  = Math.round(km*100)/100;	
					
				if(puntiTipologia[n] == "La Fondazione GCV")
				{
					urlimage = "../res/images/LogoFondazione.png";
				}
				else
				{
					urlimage = GetLoghiByIdPagina(puntiId[n]);				
				}
				
				var indirizzoPunto = puntiInd[n].replace("'","%27");
                
                var url = "pointDetail.html?myla="+ mylati +"&mylo="+ mylngi + "&logoimg=" + urlimage + "&la=" + lat2 + "&lo=" + lng2 + "&title=" + puntiNome[n] + "&ind=" + indirizzoPunto +"&idP=" +puntiId[n]+"&tipologia="+puntiTipologia[n];
				
				arrayMulti.push([km,n,puntiNome[n],url,urlimage,puntiInd[n]]);
			
				numeroElementi++;
			       			
			}
		}
	}
	
	arrayMulti.sort(function (c,d){
		if(c[0] > d[0]) return 1;
		if(c[0] < d[0]) return -1;
		return 0;
	});
	
	for(var j=0; j < arrayMulti.length;j++)
	{
		
		var exist = controlloArray(arrayMulti[j][2]);
		
		if (exist == false){
			
			arrayNomiPresenti.push([arrayMulti[j][2]]);
			
			var nomeConvenzioneDisegnata = arrayMulti[j][2];
			var abstractConvenzione = window.localStorage.getItem(arrayMulti[j][1]);
           	if (abstractConvenzione == null || abstractConvenzione == "undefined")
			{
                $('.RisultatiRicerca #thelist').append("<li><div class='Convenzione'><div class='NomeConvenzione'>"+ arrayMulti[j][2] + "</div><div class='IntestazioneConvenzione'><div class='SoloLogo'><img src='" + arrayMulti[j][4] + "' alt='" + arrayMulti[j][2] + "'/></div></div></div></li>");
            }
            else{
                $('.RisultatiRicerca #thelist').append("<li><div class='Convenzione'><div class='NomeConvenzione'>"+ arrayMulti[j][2] + "</div><div class='IntestazioneConvenzione'><div class='Logo'><img src='" + arrayMulti[j][4] + "' alt='" + arrayMulti[j][2] + "'/></div><div class='Abstract'>"+abstractConvenzione+"</div></div></div></li>");
            }
			
			for(w=0; w < arrayMulti.length;w++){
				if(arrayMulti[w][2] == nomeConvenzioneDisegnata){
					arrayConvenzioni.push([arrayMulti[w][0],arrayMulti[w][3],arrayMulti[w][5]]);
				}
			}
			
			arrayConvenzioni.sort(function (a,b){
                if(a[0] > b[0]) return 1;
					if(a[0] < b[0]) return -1;
					return 0;
				});
				
			for(var i=0;i<arrayConvenzioni.length;i++){
                    $('.RisultatiRicerca #thelist').append("<div class='DettaglioConvenzione'><a rel='external' data-role='button' href='"+arrayConvenzioni[i][1]+"'><div class='Indirizzo'>"+arrayConvenzioni[i][2]+"</div><div class='Distanza'>Si trova a <span>"+arrayConvenzioni[i][0]+"</span> chilometri</div></a></div>");
                }
			
			var arrayConvenzioni=[];
		}
	}
	
	if (numeroElementi == 0){
		noResult();
	}
	else
	{
		if(numeroElementi == 1){
			$('.NumeroRisultati').html('Un risultato trovato');
		}
		else{
			$('.NumeroRisultati').html(numeroElementi +' risultati trovati');
		}
	}
	
	myScroll.refresh();
	HideGlobalLoader();
}


function controlloArray(nome)
{
	var risultato = false;
	
	for(var k=0; k<arrayNomiPresenti.length; k++)
	{
		if(nome == arrayNomiPresenti[k])
		{
			risultato = true;
		}
	}
	
	return risultato;
}

function noResult(){
	$('.NumeroRisultati').css('display','none');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').css('display','block');
	$('.MessaggioErrore').html('Nessun risultato trovato');
}

function PageConventionDetail(){
	var punto =  getUrlVars()["punto"];
	if(punto != undefined){
		var titolo = puntiNome[punto];
		$('.PageTitle').html("Dettaglio "+titolo);
	}
}


function GetArrayCategorie()
{
	$.ajax({
		url: urlrootlist,
		type: "POST",
		dataType: "xml",
		timeout: 5000,
		data: soapAreeTematiche,
		complete: processResultCategorie,
		error: errorLoadingData,
		async: false,
		contentType: "text/xml; charset=\"utf-8\""			
	});
}
   
function processResultCategorie(xData, status) { 
	
	$(xData.responseText).find("z\\:row").each(function () {
		 var title = $(this).attr("ows_Title");
		 var idTipologia = $(this).attr("ows_ID");
		 var icoTipologia = $(this).attr("ows_IconaTipologiaApp");
		 tipologie.push(title+"#"+icoTipologia);
		 window.localStorage.setItem(title, idTipologia);
	 });
	
}

function errorLoadingData(err)
{
	setNoConnectionMsg();
}

function DrawHomepage(isFirstTime)
{
	if(!isFirstTime)
	{
		tipologie = tipologie.split(",");
	}
	
	for (var i = 0; i<tipologie.length; i++)
	{
		nomeTipologia = tipologie[i].split("#")[0];
		iconaTipologia = tipologie[i].split("#")[1];
		$('.ContenitoreTipologie #ulTipologie').append('<li><div class="ContenitoreElemento"><article class="Elemento"><a class="ui-btn-up-c ui-shadow ui-btn-corner-all" href="pages/searchConvenzione.html?tipologia='+nomeTipologia+'" rel="external" data-role="button" data-transition="slide"><div class="iconaTipologia"><img src="res/images/icoTipologie/'+iconaTipologia+'" alt="'+nomeTipologia+'" /></div><div class="nomeTipologia">'+nomeTipologia+'</div><div class="frecciaTipologia"></div></a></article></div></li>');	
	}
	
	try
	{myScroll.refresh();}
	catch(err){}
	
	HideGlobalLoader();
}



function ShowGlobalLoader()
{	
	$.mobile.loading("show", {
			text: "Caricamento in corso...",
			textVisible: "true",
			theme: "b",
			textonly: "false",
			html: ""
	});
}


function HideGlobalLoader()
{
	$.mobile.loading("hide");
}


function setNoConnectionMsg()
{
	var noconnectionmsg = '<li><div class="fault_loading">Nessuna connessione</div></li>';
	document.getElementById('NoConnection').innerHTML = noconnectionmsg;
	$('.Connection').css('display','none');
	$('.NoConnection').css('display','block');
	
	try
	{
		myScroll.refresh();
	}
	catch(err) {}
	
	HideGlobalLoader();
}

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 
	
function loadjsfile(filename){
	  var script = document.createElement('script');
	  script.setAttribute("type","text/javascript");
	  script.setAttribute("src", filename);
  	  setTimeout(function() 
  	  {
		  	if(!window.google || !window.google.maps) 
	  		{
				errorLoadingData();		  
			}
		}, 5000);
		
	  document.body.appendChild(script);
}			

function ChangeCharacter(text)
{
	text = text.replace(/\%20/g,' ');
	text = text.replace(/\%22/g,'"');
	text = text.replace(/\%26/g,'&');
	text = text.replace(/\%27/g,'\'');
	text = text.replace(/\%2D/g,'-');
	text = text.replace(/\%C3%A0/g,'&agrave;');
	text = text.replace(/\%C3%A1/g,'&aacute;');
	text = text.replace(/\%C3%80/g,'&Agrave;');
	text = text.replace(/\%C3%81/g,'&Aacute;');
	text = text.replace(/\%C3%A8/g,'&egrave;');
	text = text.replace(/\%C3%A9/g,'&eacute;');
	text = text.replace(/\%C3%88/g,'&Egrave;');
	text = text.replace(/\%C3%89/g,'&Eacute;'); 
	text = text.replace(/\%C3%AC/g,'&igrave;');
	text = text.replace(/\%C3%AD/g,'&iacute;');
	text = text.replace(/\%C3%8C/g,'&Igrave;');
	text = text.replace(/\%C3%8D/g,'&Iacute;');
	text = text.replace(/\%C3%B2/g,'&ograve;');
	text = text.replace(/\%C3%B3/g,'&oacute;');
	text = text.replace(/\%C3%92/g,'&Ograve;');
	text = text.replace(/\%C3%93/g,'&Oacute;');
	text = text.replace(/\%C3%B9/g,'&ugrave;');
	text = text.replace(/\%C3%BA/g,'&uacute;');
	text = text.replace(/\%C3%9B/g,'&Ugrave;');
	text = text.replace(/\%C3%9C/g,'&Uacute;');
	return text;
}

$.support.cors = true;
var urllist = "http://www.socioincreval.it/ScontiDedicati/_vti_bin/lists.asmx";
var urlrootlist = "http://www.socioincreval.it/_vti_bin/lists.asmx";

var geocoder;
var puntiId=[];
var puntiIdUnivoci=[];
var posizioniIdUnivoche=[];
var puntiNome=[];
var puntiLat=[];
var puntiLng=[];
var puntiInd=[];
var puntiTipologia=[];
var puntiUrlImage=[];
var onlineConv=[];
var contatorePunti = 0;
var contatoreIdUnivoci = 0;

var soapCartinaConvenzioni =
"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
	<soapenv:Body> \
		 <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
				<listName>Cartina Convenzioni</listName> \
				<rowLimit>10000</rowLimit> \
		</GetListItems> \
	</soapenv:Body> \
</soapenv:Envelope>";

var soapAreeTematiche =
"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
	<soapenv:Body> \
		 <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
				<listName>Aree Tematiche</listName> \
				<query><Query><OrderBy><FieldRef Name='Title' /></OrderBy></Query></query> \
			 		<viewFields> \
                            <ViewFields> \
					                <FieldRef Name='Title' /> \
					                <FieldRef Name='ID' /> \
					                <FieldRef Name='IconaTipologiaApp' /> \
                           </ViewFields> \
                        </viewFields> \
            	<QueryOptions> \
					<IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns> \
				</QueryOptions> \
		</GetListItems> \
	</soapenv:Body> \
</soapenv:Envelope>";

function DisegnaPuntiMappa() 
{
	//azzero gli array
	puntiId=[];
	puntiIdUnivoci=[];
	posizioniIdUnivoche=[];
	puntiNome=[];
	puntiLat=[];
	puntiLng=[];
	puntiInd=[];
	puntiTipologia=[];
	puntiUrlImage=[];
	onlineConv=[];
	contatorePunti = 0;
	contatoreIdUnivoci = 0;

	//ripristino l'html originale
	$('.NumeroRisultati').css('display','block');
	$('.RisultatiRicerca').css('display','block');
	$('.MessaggioErrore').css('display','none');
	$('.MessaggioErrore').html('');
	$('.NumeroRisultati').html('');
	$('.RisultatiRicerca #thelist').html('');
	
	$.ajax({
		url: urllist,
		type: "POST",
		dataType: "xml",
		timeout: 5000,
		data: soapCartinaConvenzioni,
		complete: processPuntiConvenzioni,
		error: errorLoadingData,
		async: true,
		contentType: "text/xml; charset=\"utf-8\""			
	});
}

function processPuntiConvenzioni(xData, status) 
{   
	$(xData.responseText).find("z\\:row").each(function () 
	{
		var idPagina = $(this).attr("ows_NomeConvenzione").split(';#')[0];
		puntiId[contatorePunti]=idPagina;
	
		var nomePagina = $(this).attr("ows_NomeConvenzione").split(';#')[1];
		puntiNome[contatorePunti]= $.trim(nomePagina);
	
		var latitude = $(this).attr("ows_Title");
		puntiLat[contatorePunti]= $.trim(latitude);
	
		var longitude = $(this).attr("ows_Longitudine");
		puntiLng[contatorePunti]= $.trim(longitude);
	
		var indirizzoConvenzione = $(this).attr("ows_Indirizzo");
		puntiInd[contatorePunti]=$.trim(indirizzoConvenzione);
		
		var IdTipologia =  $(this).attr("ows_AreaTematica").split(';#')[0];
		var DescrTipologia = $(this).attr("ows_AreaTematica").split(';#')[1];
	
		var AbstractConvenzione =  $(this).attr("ows_Abstract");
		window.localStorage.setItem(contatorePunti, AbstractConvenzione);
		
		var OnlineConvenzione = $(this).attr("ows_Online");
		onlineConv[contatorePunti]=OnlineConvenzione;
		
		puntiTipologia[contatorePunti]= DescrTipologia;

		contatorePunti++;
	});

	if($('.SearchResults').length)
	{
		PageSearchResult();
	}
}


function PageSearchConvention()
{
	var tipologia =  getUrlVars()["tipologia"];
	tipologia = ChangeCharacter(tipologia);
	$('.PageTitle').html(tipologia);
}

function getUrlVars() {
    var vars = {};
	var value;
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
	if (value == undefined){
		value = "no";
	}
    return vars;
}

function HandleFreeSearch(e){
	 if (e.keyCode == 13) {
		 FreeSearch();
	 }
}

function FreeSearch(){
	var testocercato = $('.FreeSearch').val();
	if (testocercato == ''){
		testocercato = 'here';
	}
	var raggio = 5;
	window.location.href = "pages/searchResults.html?position="+testocercato+"&range="+raggio+"&tipologia=all";
}

function HandleSearchConvenzione(e)
{
	 if (e.keyCode == 13) {
		 SearchConvenzione();
	 }
}

function SearchConvenzione(){
	$('.contentSlider input').slider();
	var testocercato = $('.Search').val();
	if((testocercato == "Posizione attuale") || (testocercato == "")){
		testocercato = "here";
	}
	var tipologia = $('.PageTitle').html();
	if(tipologia == 'Tutte le tipologie'){
		tipologia = 'all';
	}
	var raggio = $('#sliderRaggio').val();
	window.location.href = "searchResults.html?position="+testocercato+"&range="+raggio+"&tipologia="+tipologia;
}

function PageSearchResult(){


	var tipologia =  getUrlVars()["tipologia"];
	if(tipologia != undefined){
		tipologia = ChangeCharacter(tipologia);
	}
	
	var posizione =  getUrlVars()["position"];
	if(posizione != undefined){
		posizione = ChangeCharacter(posizione);
	}
	
	var range =  getUrlVars()["range"];
	if(range != undefined){
		range = ChangeCharacter(range);
	}

	try
	{
		geocoder = new google.maps.Geocoder();
		var mylat;
		var mylng;	
		var lati;
		var longi;
		if (navigator.geolocation) 
		{
			var location_timeout = setTimeout("errorLoadingData()", 10000);
		
			navigator.geolocation.getCurrentPosition(function(pos) 
			{
				clearTimeout(location_timeout);
			
				var mylat = pos.coords.latitude;
				var lati = mylat;
				var mylng = pos.coords.longitude;
				var longi = mylng;
			
				if (posizione == 'here'){
					ShowElement(lati, longi, range, mylat, mylng);
				}
				else{
					var valoreCercato = posizione;
					if ((valoreCercato.length == 5) && (Number(valoreCercato) != NaN))
					{
						valoreCercato = posizione+", Italia";
					}
					geocoder.geocode( { 'address': valoreCercato}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var lati = results[0].geometry.location.lat();
							var longi = results[0].geometry.location.lng();
							var currentLng;
							ShowElement(lati, longi, range, mylat, mylng);
						}
						else{
							myScroll.refresh();
							HideGlobalLoader();
							noResult();
						}
					});
				}
			},
			 	function(error) {
				clearTimeout(location_timeout);
				errorLoadingData();	
			});
		} 
		else 
		{
			errorLoadingData();	// Fallback for no geolocation
		}
	}
	catch (err)
	{
			errorLoadingData();	// Fallback for no geolocation
	}
}

function geolocFail1(){
	$('.MessaggioErrore').css('display','block');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').html('Tentativo di geolocalizzazione fallito');
}

function geolocFail2(){
	$('.MessaggioErrore').css('display','block');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').html('La tua ricerca di <span>'+posizione+'</span> non ha prodotto risultati');
}

function getDistance(lat1, lat2, lon1, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;
  return dist;
}

var arrayNomiPresenti=[];

function ShowElement(lat, lon, raggio, mylat, mylng)
{
	var lat1 = lat;
	var lng1 = lon;
	var mylati = mylat;
	var mylngi = mylng;
	var raggio1 = raggio;	
	var tipologiaCercata =  ChangeCharacter(getUrlVars()["tipologia"]); 
	var numeroElementi=0;
	var rag = Number(raggio1);
	var posizioneCercata =  getUrlVars()["position"]; 
	var nomePrecedente;
	var arrayConvenzioni=[];
	var arrayMulti=[];
	arrayNomiPresenti=[];
	
	for (var n=0;n<puntiLat.length;n++)
	{
		if(puntiTipologia[n] == tipologiaCercata || tipologiaCercata == 'all')
		{ 
			var lat2;
			var lng2;
			var km;
			var isOnline="f";
		
		
			if(onlineConv[n] == 1)
			{
				//convenzione online
				km = rag;
				isOnline="t";
			}
			else
			{
				//convenzione classica
				lat2 = puntiLat[n];
				lng2 = puntiLng[n];
				km = getDistance(lat1, lat2, lng1, lng2);
			
			}
			
			if (km <= rag){
				km  = Math.round(km*100)/100;	
					
				if(puntiTipologia[n] == "La Fondazione GCV")
				{
					urlimage = "../res/images/LogoFondazione.png";
				}
				else
				{
					urlimage = GetLoghiByIdPagina(puntiId[n]);				
				}
				
				var indirizzoPunto = puntiInd[n].replace("'","%27");
                
                var url = "pointDetail.html?myla="+ mylati +"&mylo="+ mylngi + "&logoimg=" + urlimage + "&la=" + lat2 + "&lo=" + lng2 + "&title=" + puntiNome[n] + "&ind=" + indirizzoPunto +"&idP=" +puntiId[n]+"&tipologia="+puntiTipologia[n]+"&online="+isOnline ;
				
				arrayMulti.push([km,n,puntiNome[n],url,urlimage,puntiInd[n],isOnline]);
			
				numeroElementi++;
			       			
			}
		}
	}
	
	arrayMulti.sort(function (c,d){
		if(c[0] > d[0]) return 1;
		if(c[0] < d[0]) return -1;
		return 0;
	});
	
	for(var j=0; j < arrayMulti.length;j++)
	{
		
		var exist = controlloArray(arrayMulti[j][2]);
		var isOnlineConv = arrayMulti[j][6];
		
		if (exist == false){
			
			arrayNomiPresenti.push([arrayMulti[j][2]]);
			
			var nomeConvenzioneDisegnata = arrayMulti[j][2];
			var abstractConvenzione = window.localStorage.getItem(arrayMulti[j][1]);
           	if (abstractConvenzione == null || abstractConvenzione == "undefined")
			{
                $('.RisultatiRicerca #thelist').append("<li><div class='Convenzione'><div class='NomeConvenzione'>"+ arrayMulti[j][2] + "</div><div class='IntestazioneConvenzione'><div class='SoloLogo'><img src='" + arrayMulti[j][4] + "' alt='" + arrayMulti[j][2] + "'/></div></div></div></li>");
            }
            else{
                $('.RisultatiRicerca #thelist').append("<li><div class='Convenzione'><div class='NomeConvenzione'>"+ arrayMulti[j][2] + "</div><div class='IntestazioneConvenzione'><div class='Logo'><img src='" + arrayMulti[j][4] + "' alt='" + arrayMulti[j][2] + "'/></div><div class='Abstract'>"+abstractConvenzione+"</div></div></div></li>");
            }
			
			for(w=0; w < arrayMulti.length;w++){
				if(arrayMulti[w][2] == nomeConvenzioneDisegnata){
					arrayConvenzioni.push([arrayMulti[w][0],arrayMulti[w][3],arrayMulti[w][5]]);
				}
			}
			
			arrayConvenzioni.sort(function (a,b){
                if(a[0] > b[0]) return 1;
					if(a[0] < b[0]) return -1;
					return 0;
				});
				
			for(var i=0;i<arrayConvenzioni.length;i++)
			{
				
				if(isOnlineConv=="f")
				{
                	$('.RisultatiRicerca #thelist').append("<div class='DettaglioConvenzione'><a rel='external' data-role='button' href='"+arrayConvenzioni[i][1]+"'><div class='Indirizzo'>"+arrayConvenzioni[i][2]+"</div><div class='Distanza'>Si trova a <span>"+arrayConvenzioni[i][0]+"</span> chilometri</div></a></div>");
                }
                else
                {
                	$('.RisultatiRicerca #thelist').append("<div class='DettaglioConvenzione'><a rel='external' data-role='button' href='"+arrayConvenzioni[i][1]+"'><div class='Indirizzo Online'>"+arrayConvenzioni[i][2]+"</div></a></div>");
                }
            }
			
			var arrayConvenzioni=[];
		}
	}
	
	if (numeroElementi == 0){
		noResult();
	}
	else
	{
		if(numeroElementi == 1){
			$('.NumeroRisultati').html('Un risultato trovato');
		}
		else{
			$('.NumeroRisultati').html(numeroElementi +' risultati trovati');
		}
	}
	
	myScroll.refresh();
	HideGlobalLoader();
}


function controlloArray(nome)
{
	var risultato = false;
	
	for(var k=0; k<arrayNomiPresenti.length; k++)
	{
		if(nome == arrayNomiPresenti[k])
		{
			risultato = true;
		}
	}
	
	return risultato;
}

function noResult(){
	$('.NumeroRisultati').css('display','none');
	$('.RisultatiRicerca').css('display','none');
	$('.MessaggioErrore').css('display','block');
	$('.MessaggioErrore').html('Nessun risultato trovato');
}

function PageConventionDetail(){
	var punto =  getUrlVars()["punto"];
	if(punto != undefined){
		var titolo = puntiNome[punto];
		$('.PageTitle').html("Dettaglio "+titolo);
	}
}


function GetArrayCategorie()
{
	$.ajax({
		url: urlrootlist,
		type: "POST",
		dataType: "xml",
		timeout: 5000,
		data: soapAreeTematiche,
		complete: processResultCategorie,
		error: errorLoadingData,
		async: false,
		contentType: "text/xml; charset=\"utf-8\""			
	});
}
   
function processResultCategorie(xData, status) { 
	
	$(xData.responseText).find("z\\:row").each(function () {
		 var title = $(this).attr("ows_Title");
		 var idTipologia = $(this).attr("ows_ID");
		 var icoTipologia = $(this).attr("ows_IconaTipologiaApp");
		 tipologie.push(title+"#"+icoTipologia);
		 window.localStorage.setItem(title, idTipologia);
	 });
	
}

function errorLoadingData(err)
{
	setNoConnectionMsg();
}

function DrawHomepage(isFirstTime)
{
	if(!isFirstTime)
	{
		tipologie = tipologie.split(",");
	}
	
	for (var i = 0; i<tipologie.length; i++)
	{
		nomeTipologia = tipologie[i].split("#")[0];
		iconaTipologia = tipologie[i].split("#")[1];
		$('.ContenitoreTipologie #ulTipologie').append('<li><div class="ContenitoreElemento"><article class="Elemento"><a class="ui-btn-up-c ui-shadow ui-btn-corner-all" href="pages/searchConvenzione.html?tipologia='+nomeTipologia+'" rel="external" data-role="button" data-transition="slide"><div class="iconaTipologia"><img src="res/images/icoTipologie/'+iconaTipologia+'" alt="'+nomeTipologia+'" /></div><div class="nomeTipologia">'+nomeTipologia+'</div><div class="frecciaTipologia"></div></a></article></div></li>');	
	}
	
	try
	{myScroll.refresh();}
	catch(err){}
	
	HideGlobalLoader();
}



function ShowGlobalLoader()
{	
	$.mobile.loading("show", {
			text: "Caricamento in corso...",
			textVisible: "true",
			theme: "b",
			textonly: "false",
			html: ""
	});
}


function HideGlobalLoader()
{
	$.mobile.loading("hide");
}


function setNoConnectionMsg()
{
	var noconnectionmsg = '<li><div class="fault_loading">Nessuna connessione</div></li>';
	document.getElementById('NoConnection').innerHTML = noconnectionmsg;
	$('.Connection').css('display','none');
	$('.NoConnection').css('display','block');
	
	try
	{
		myScroll.refresh();
	}
	catch(err) {}
	
	HideGlobalLoader();
}

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
} 
	
function loadjsfile(filename){
	  var script = document.createElement('script');
	  script.setAttribute("type","text/javascript");
	  script.setAttribute("src", filename);
  	  setTimeout(function() 
  	  {
		  	if(!window.google || !window.google.maps) 
	  		{
				errorLoadingData();		  
			}
		}, 5000);
		
	  document.body.appendChild(script);
}			

function ChangeCharacter(text)
{
	text = text.replace(/\%20/g,' ');
	text = text.replace(/\%22/g,'"');
	text = text.replace(/\%26/g,'&');
	text = text.replace(/\%27/g,'\'');
	text = text.replace(/\%2D/g,'-');
	text = text.replace(/\%C3%A0/g,'&agrave;');
	text = text.replace(/\%C3%A1/g,'&aacute;');
	text = text.replace(/\%C3%80/g,'&Agrave;');
	text = text.replace(/\%C3%81/g,'&Aacute;');
	text = text.replace(/\%C3%A8/g,'&egrave;');
	text = text.replace(/\%C3%A9/g,'&eacute;');
	text = text.replace(/\%C3%88/g,'&Egrave;');
	text = text.replace(/\%C3%89/g,'&Eacute;'); 
	text = text.replace(/\%C3%AC/g,'&igrave;');
	text = text.replace(/\%C3%AD/g,'&iacute;');
	text = text.replace(/\%C3%8C/g,'&Igrave;');
	text = text.replace(/\%C3%8D/g,'&Iacute;');
	text = text.replace(/\%C3%B2/g,'&ograve;');
	text = text.replace(/\%C3%B3/g,'&oacute;');
	text = text.replace(/\%C3%92/g,'&Ograve;');
	text = text.replace(/\%C3%93/g,'&Oacute;');
	text = text.replace(/\%C3%B9/g,'&ugrave;');
	text = text.replace(/\%C3%BA/g,'&uacute;');
	text = text.replace(/\%C3%9B/g,'&Ugrave;');
	text = text.replace(/\%C3%9C/g,'&Uacute;');
	return text;
}









	  	var myScroll,
		pullDownEl, 
		pullDownOffset,
		generatedCount = 0;
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
		function onDeviceReady(){
		    ShowGlobalLoader();
		    document.addEventListener("resume", onResume, false);
			window.addEventListener("orientationchange", orientationChange, true);
			loadjsfile("http://maps.google.com/maps/api/js?sensor=true&language=it&callback=DisegnaPuntiMappa");
		}

 		function onResume() {
    	}

			
		function orientationChange(e) {
			setTimeout(function(){myScroll.refresh()},1500)
		}

		function pullDownAction () {
			$('.Connection').css('display','block');
			$('.NoConnection').css('display','none');
			DisegnaPuntiMappa();
		}
	
		function loaded() 
		{
			pullDownEl = document.getElementById('pullDown');
			pullDownOffset = pullDownEl.offsetHeight;
			myScroll = new iScroll('wrapper', {
				useTransition: true,
				topOffset: pullDownOffset,
				onRefresh: function () {
					if (pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Tira per aggiornare...';
					}
				},
				onScrollMove: function () {
					if (this.y > 5 && !pullDownEl.className.match('flip')) {
						pullDownEl.className = 'flip';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Rilascia per aggiornare...';
						this.minScrollY = 0;
					} else if (this.y < 5 && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Tira per aggiornare...';
						this.minScrollY = -pullDownOffset;
					} 
					$('#scroller a').each(function(){
						$(this).addClass('dragging');
					});
				},
				onScrollEnd: function () {
					if (pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Caricamento...';				
						pullDownAction();
					}
					$('#scroller a').each(function(){
						$(this).removeClass('dragging');
					});
				},
				
				
			});
			setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 400);
		}
		
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	







	
	function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
  		changeOrientation();
    }
    
    function changeOrientation() 
    {
    	switch (window.orientation) 
    	{
	        case 0:
	            $('.ContentTextPage').addClass('Portrait');
	            $('.ContentTextPage').removeClass('Landscape_orie');
	            break;
	        case 180:
	            $('.ContentTextPage').addClass('Portrait');
	            $('.ContentTextPage').removeClass('Landscape_orie');
	            break;
	        case -90:
	            $('.ContentTextPage').addClass('Landscape_orie');
	            $('.ContentTextPage').removeClass('Portrait');
	            break;
	        case 90:
	            $('.ContentTextPage').addClass('Landscape_orie');
	            $('.ContentTextPage').removeClass('Portrait');
	            break;
      	}
	}
	
	
	window.onorientationchange = function () {
  		setTimeout(changeOrientation, 1000);
	}

    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReady() {
        document.addEventListener("resume", onResume, false);
    }

    // Handle the resume event
    //
    function onResume() {
    	
    }
	








	  	document.addEventListener("deviceready", onDeviceReady, false);
		
		function onDeviceReady(){
		    document.addEventListener("resume", onResume, false);
			PagePointDetail();
		
			changeOrientation();
		}
		
		 function onResume() {
    		PagePointDetail();
   		}
		
		    
	    function changeOrientation() 
	    {
	    	switch (window.orientation) 
	    	{
		        case 0:
		            $('.PointDetail').addClass('Portrait');
		            $('.PointDetail').removeClass('Landscape_orie');
		            break;
		        case 180:
		            $('.PointDetail').addClass('Portrait');
		            $('.PointDetail').removeClass('Landscape_orie');
		            break;
		        case -90:
		            $('.PointDetail').addClass('Landscape_orie');
		            $('.PointDetail').removeClass('Portrait');
		            break;
		        case 90:
		            $('.PointDetail').addClass('Landscape_orie');
		            $('.PointDetail').removeClass('Portrait');
		            break;
	      	}
		}
		
		
		window.onorientationchange = function () {
	  		setTimeout(changeOrientation, 1000);
		}
			
		
		
		function PagePointDetail()
		{
			var titoloOld = getUrlVars()["title"];
			var titolo = getUrlVars()["title"];
			var indirizzo = getUrlVars()["ind"];
			var logourl = getUrlVars()["logoimg"];
			var mylat = getUrlVars()["myla"];
			var mylong = getUrlVars()["mylo"];
			var lat = getUrlVars()["la"];
			var lng = getUrlVars()["lo"];
			var idPagina = getUrlVars()["idP"];
			var tipologia = getUrlVars()["tipologia"];
			var isOnline = getUrlVars()["online"];
	
			if(titolo != undefined){
				
				titolo = ChangeCharacter(titolo);
				indirizzo = ChangeCharacter(indirizzo);
				tipologia = ChangeCharacter(tipologia);
				$('.PointDetail .Connection .TitoloConvenzione').html(titolo);
				
				$('.PointDetail .Connection .LogoConvenzione').html('<img src="'+ logourl +'" alt="'+ titolo +'" />');
				$('.PointDetail .Connection .Indirizzo').html(indirizzo);
				
				var urlPagina;
				
				if(tipologia == "La Fondazione GCV")
				{
					urlPagina = "http://www.socioincreval.it/appmobile/Pagine/dettagliofondazione.aspx";
				}
				else
				{
					urlPagina = "http://www.socioincreval.it/appmobile/Pagine/dettaglioconvenzione.aspx?idPagina=" + idPagina +"&titolo="+titoloOld;
				}
				
				$('.PointDetail .Connection #linkDettaglio a').attr('href',"javascript:OpenURL('"+urlPagina+"')");
			
				if(isOnline == "f")
				{
					var urlMapSinglePoint = "pointMap.html?title=" + titolo + "&lat=" + lat + "&long=" + lng;
					$('.PointDetail .Connection #mappaPunto a').attr('href',urlMapSinglePoint);					
				
					//apre direttamente GMAPS o simili	
					$('.PointDetail .Connection #portamili a').click(function() {
		    			var DEST_ADD = lat +','+lng;
						var START_ADD = mylat +','+mylong;
						var url = "http://maps.google.com/maps?saddr="+ START_ADD+ "&daddr=" +DEST_ADD+"&view=map";
						loadURL(url);
	    			});
    			
    				$('.PointDetail .Connection #mappaPunto').css('display','block');
    				$('.PointDetail .Connection #portamili').css('display','block');
    			
    			}
			}
			else{
				$('.MessaggioErrore').css('display','block');
				$('.MessaggioErrore').html('Nessun punto selezionato');
				$('#linkDettaglio').css('display','none');
				$('#mappaPunto').css('display','none');
				//$('#visualizzapercorso').css('display','none');
				$('#portamili').css('display','none');
			}
		}
		
		function OpenURL(url)
		{
			ShowGlobalLoader(); 
			var ref = window.open(url, '_self', 'location=yes');
         	ref.addEventListener('loadstart', function() { 	ShowGlobalLoader(); });
        	ref.addEventListener('loadstop', function() { 	HideGlobalLoader(); });
        }
	








	  	document.addEventListener("deviceready", onDeviceReady, false);
		var altezzaFinestra;
		function onDeviceReady()
		{
		 	if($('.PointMap').length){
				PagePointMap();
			}
			window.onorientationchange=Rotation;
		}  
			
		function PagePointMap()
		{
			var titolo =  getUrlVars()["title"];
			titolo = ChangeCharacter(titolo);
			var latConvenzione =  getUrlVars()["lat"];
			var lngConvenzione =  getUrlVars()["long"];
			$('.PageTitle').html(titolo);
		
			geocoder = new google.maps.Geocoder();
			altezzaFinestra = window.innerHeight - 115;
			var center = new google.maps.LatLng(latConvenzione, lngConvenzione);
			var zoom = 16;
			var StartOptions = {
				zoom: zoom,
				center: center,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR}
			}
			$('.PointMap .Connection #map').css('height',altezzaFinestra);
			mymap = new google.maps.Map(document.getElementById("map"), StartOptions);
			var marker = new google.maps.Marker({
				position: center,
				map: mymap,
				title: titolo,
			});
			
		}
		function Rotation(){
			altezzaFinestra = window.innerWidth - 115;
			$('.PointMap .Connection #map').css('height',altezzaFinestra);
		}
	







		document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady(){
				PageSearchConvention();
				changeOrientation();
			}
		
		function changeOrientation() 
	    {
	    	switch (window.orientation) 
	    	{
		        case 0:
		            $('.SearchConvenzione').addClass('Portrait');
		            $('.SearchConvenzione').removeClass('Landscape_orie');
		            break;
		        case 180:
		            $('.SearchConvenzione').addClass('Portrait');
		            $('.SearchConvenzione').removeClass('Landscape_orie');
		            break;
		        case -90:
		            $('.SearchConvenzione').addClass('Landscape_orie');
		            $('.SearchConvenzione').removeClass('Portrait');
		            break;
		        case 90:
		            $('.SearchConvenzione').addClass('Landscape_orie');
		            $('.SearchConvenzione').removeClass('Portrait');
		            break;
	      	}
		}
		
		
		window.onorientationchange = function () {
	  		setTimeout(changeOrientation, 1000);
		}
			
			
			
	
