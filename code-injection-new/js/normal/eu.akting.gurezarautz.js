



































var minHeight = window.innerHeight;
var currentPos;

if (navigator.userAgent.indexOf("Android") != -1){
  $(document).bind("mobileinit", function()
  {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.allowCrossDomainPages = true;
    $.mobile.page.prototype.options.addBackBtn = false;
    $.mobile.useFastClick  = false;
  });
}



//altuera aldatu
function resize_content(aldatu){
  var h = $('div[data-role="header"]').outerHeight(true);
  var f = $('div[data-role="footer"]').outerHeight(true);
  var c = $('.ui-page-active').find('[data-role="content"]').height();//$('div[role="main"]').height();
  var w = $(window).height();
 // alert(w-h-f);
 // alert(c);
  if((w-h-f) >= c){
    $('.ui-footer').attr('style', 'bottom:0px');
  }
  else{
    $('.ui-footer').attr('style', 'bottom:auto');
  }
}


//$(document).ready(function() {
//var lang = window.localStorage.getItem("lang");
//var RSS = "http://www.gurezarautz.net/botika/rss/gz."+lang+".rss.php";
var entries = [];

//Listen for main page
$("#agendaPage").live("pageinit", function() {
	//$(document).delegate("#agendaPage", "pagebeforeshow", function() {
	//	$(window).unbind();
	$.ajax({
		url: "http://www.gurezarautz.net/botika/rss/gz."+lang+".rss.php",
		dataType: 'xml',
		callbackParameter: 'callback',
		success: function(data, status) {
			//alert('Ondo');
			//$.get(RSS, {}, function(res, code) {
				var xml = $(data);
				var items = xml.find("item");
				entries = [];
				$.each(items, function(i, v) {
					entry = {
						title:$(v).find("title").text(),
						link:$(v).find("link").text(),
						description:$.trim($(v).find("description").text())
					};
					entries.push(entry);
				});

				//now draw the list
				var s = '';
				$.each(entries, function(i, v) {
					var contentHTML = "";
					var n;
					var title = '<span class="agendaTitle blueTurq">'+v.title+'</span>';
					var dia;
					//var ordua;
					$(v.description).each(function(i){
						//alert(i);
						//alert($(this).text());
						if(i==2){
							dia = '<span class="blueTurq">'+/*n[0]*/$(this).text()+"</span><br/>";
						}
						else if(i%2==0){
							contentHTML += '<br/>'+$(this).text();//+'<br/>';
						}
					});
					//contentHTML += '<span class="lTime">'+_('lTime')+':</span>'+ordua;
					s += '<li>'+dia+title+contentHTML+'</li>';
				});
				//$("#linksList").append(s);
				$("#linksList").append(s);
				$("#linksList").listview("refresh");

				//altuera aldatu
				resize_content("#linksList");
			//});
		},
		error: function(){
			//alert('Error');
			//$('#your-tweets').append('<li>There was an error loading the feed');
		}

	});


});


window.PROJECTNAME = 'Gure Zarautz';
var lang;
var forecast = false;
var forecastToday = new Array();
var forecastTomorrow = new Array();
var forecastNext = new Array();
var agenda = false;
var agendaToday = "";
var wavesToday = [];
var wavesTitle;

$(document).bind('pageshow', "#language", function() {
//$('#language').live("pageshow",function(){
	$('.langA').click(function(){
		lang = window.localStorage.setItem("lang", $(this).attr('lang'));
		changeLanguage();
	});

	resize_content("#linksList");
});


//$(document).bind('pageinit', "#mainPageHoy", function() {
$("#mainPageHoy").live("pagebeforeshow", function(){
	//set string with current language
	$('.day').html(_("lToday"));
	$('.lPleamar').html(_("lPleamar"));
    $('.lBajamar').html(_("lBajamar"));
    $('.lOlas').html(_("lOlas"));
    $('.lTablaIkusi').html(_("lTablaIkusi"));
    $('.lSurfPlaya').html(_("lSurfPlaya"));
    $('.lExperiencias').html(_("lExperiencias"));
    //$('.lGuiaUtil').html(_("lGuiaUtil"));
    $('.lDormir').html(_("lDormir"));
    $('.lComer').html(_("lComer"));
    //$('.lMarcha').html(_("lMarcha"));

	if(!forecast){
		//Read forecast
		readForecast();
		forecast = true;
	}

	if(!agenda){
		//Read agenda firts event
		//var lang = window.localStorage.getItem("lang");
		var RSS = "http://www.gurezarautz.net/botika/rss/gz."+lang+".rss.php";
		readAgenda(RSS);
		agenda = true;
	}

	resize_content("#linksList");
});

//listen for detail links
$(".weatherLink").live("click", function() {
	var forecastArray = new Array();
	var nextDay = $(this).attr("day");
	var i;
	if(nextDay == 'today'){
		$('.day').html(_("lToday"));
		forecastArray = forecastToday;
		$(".leftBlock a").attr('style', 'display:none');
		$(".rightBlock a").attr('style', 'display:inline');
		$(".rightBlock a").attr('day', 'tomorrow');
	}
	else if(nextDay == 'tomorrow'){
		$('.day').html(_("lTomorrow"));
		forecastArray = forecastTomorrow;
		$(".leftBlock a").attr('style', 'display:inline');
		$(".leftBlock a").attr('day', 'today');
		$(".rightBlock a").attr('style', 'display:inline');
		$(".rightBlock a").attr('day', 'next');
	}
	else if(nextDay == 'next'){
		$('.day').html(_("lNext"));
		forecastArray = forecastNext;
		$(".leftBlock a").attr('style', 'display:inline');
		$(".leftBlock a").attr('day', 'tomorrow');
		$(".rightBlock a").attr('style', 'display:none');
	}
	//Mareas
	$('#hoyAlta1').html(forecastArray['alta1']);
	$('#hoyAlta2').html(forecastArray['alta2']);
	$('#hoyBaja1').html(forecastArray['baja1']);
	$('#hoyBaja2').html(forecastArray['baja2']);

	//Olas
	$("#olasToday").html(forecastArray['olas']);

	//Temperatura, foto
	$('#minHoy').html(forecastArray['min']);
	$('#maxHoy').html(forecastArray['max']);
	$('#symbolHoy').attr('src', forecastArray['icon']);
});
/*
$("#mainPageTomorrow").live("pagebeforeshow", function(){
		$(".agenda").append(agendaToday);
		$(".agenda").listview("refresh");

})*/

function readForecast(){
	var today;
	var tomorrow;
	var next;

	//Pleamar / Bajamar
	$.ajax({
		url: "http://gurezarautz.net/gzapp/sea_forecast.php?lang="+lang,
		dataType: 'xml',
		callbackParameter: 'callback',
		success: function(data, status) {
			var xml = $(data);
			var items = xml.find("day");
			var lastDay = items[items.length - 1];
			var forecast = $(lastDay).find("forecast");
			//GAUR
			today = forecast[0];

			$('#hoyAlta1').html(get_hora_GMT($(today).find('firstHighTideTime').text()));
			$('#hoyAlta2').html(get_hora_GMT($(today).find('secondHighTideTime').text()));
			$('#hoyBaja1').html(get_hora_GMT($(today).find('firstLowTideTime').text()));
			$('#hoyBaja2').html(get_hora_GMT($(today).find('secondLowTideTime').text()));

			forecastToday['alta1'] = get_hora_GMT($(today).find('firstHighTideTime').text());
			forecastToday['alta2'] = get_hora_GMT($(today).find('secondHighTideTime').text());
			forecastToday['baja1'] = get_hora_GMT($(today).find('firstLowTideTime').text());
			forecastToday['baja2'] = get_hora_GMT($(today).find('secondLowTideTime').text());
			//BIHAR
			tomorrow = forecast[1];

			forecastTomorrow['alta1'] = get_hora_GMT($(tomorrow).find('firstHighTideTime').text());
			forecastTomorrow['alta2'] = get_hora_GMT($(tomorrow).find('secondHighTideTime').text());
			forecastTomorrow['baja1'] = get_hora_GMT($(tomorrow).find('firstLowTideTime').text());
			forecastTomorrow['baja2'] = get_hora_GMT($(tomorrow).find('secondLowTideTime').text());
			//ETZI
			next = forecast[2];

			forecastNext['alta1'] = get_hora_GMT($(next).find('firstHighTideTime').text());
			forecastNext['alta2'] = get_hora_GMT($(next).find('secondHighTideTime').text());
			forecastNext['baja1'] = get_hora_GMT($(next).find('firstLowTideTime').text());
			forecastNext['baja2'] = get_hora_GMT($(next).find('secondLowTideTime').text());

		},
		error: function(){
			$('#your-tweets').append('<li>There was an error loading the feed');
		}
	});
	//Olas
	$.ajax({
		url: "http://www.windguru.cz/int/get_datafile.php?username=zarauz&model=nww3",
		dataType: 'html',
		callbackParameter: 'callback',
		success: function(data, status) {
			var waves = data.split(',');
			wavesTitle = waves[1];
			var i;
			//GAUR
			var wavesTodayOrder = [];
			i = 0;
			while(i<8){
				wavesToday[i] = waves[i+3];
				wavesTodayOrder[i] = wavesToday[i];
				i++;
			}
			wavesTodayOrder.sort();
			$("#olasToday").html(wavesTodayOrder[0]+"-"+wavesTodayOrder[7]);
			forecastToday['olas'] = wavesTodayOrder[0]+"-"+wavesTodayOrder[7];
			//BIHAR
			var wavesTomorrowOrder = [];
			i = 0;
			while(i<8){
				wavesTomorrowOrder[i] = waves[i+11];
				i++;
			}
			wavesTomorrowOrder.sort();

			forecastTomorrow['olas'] = wavesTomorrowOrder[0]+"-"+wavesTomorrowOrder[7];
			//ETZI
			var wavesNextOrder = [];
			i = 0;
			while(i<8){
				wavesNextOrder[i] = waves[i+19];
				i++;
			}
			wavesNextOrder.sort();
			forecastNext['olas'] = wavesNextOrder[0]+"-"+wavesNextOrder[7];
		},
		error: function(){
		//	alert('error');
		}
	});

	//Temperatura, foto
	$.ajax({
		url: "http://opendata.euskadi.net/contenidos/prevision_tiempo/met_forecast/opendata/met_forecast.xml",
		dataType: 'xml',
		callbackParameter: 'callback',
		success: function(data, status) {
			var xml = $(data);
			var items = xml.find("forecast");
			//GAUR
			today = items[0];
			//$("#dateHoy").html($(today).attr('forecastDate'));
			var cities = $(today).find('cityForecastData');
			$.each(cities, function(i,item){
				//Donostia
				if($(item).attr('cityCode')== "20069"){
					var max = $(item).find("tempMax").text();
					var min = $(item).find("tempMin").text();
					$('#minHoy').html(min);
					$('#maxHoy').html(max);
					var img = $(item).find("symbolImage").text();
					$('#symbolHoy').attr('src', "http://opendata.euskadi.net"+img);

					forecastToday['min'] = min;
					forecastToday['max'] = max;
					forecastToday['icon'] = "http://opendata.euskadi.net"+img;
				}
			});
			//BIHAR
			tomorrow = items[1];
			//$("#dateTomorrow").html($(tomorrow).attr('forecastDate'));
			cities = $(tomorrow).find('cityForecastData');
			$.each(cities, function(i,item){// alert('mañana');
				//Donostia
				if($(item).attr('cityCode')== "20069"){//alert($(item).find("tempMax").text());
					max = $(item).find("tempMax").text();
					min = $(item).find("tempMin").text();
					img = $(item).find("symbolImage").text();
					forecastTomorrow['min'] = min;
					forecastTomorrow['max'] = max;
					forecastTomorrow['icon'] = "http://opendata.euskadi.net"+img;

				}
			});
			//ETZI
			next = items[2];
			//$("#dateNext").html($(next).attr('forecastDate'));
			cities = $(next).find('cityForecastData');
			$.each(cities, function(i,item){// alert('mañana');
				//Donostia
				if($(item).attr('cityCode')== "20069"){//alert($(item).find("tempMax").text());
					max = $(item).find("tempMax").text();
					min = $(item).find("tempMin").text();
					img = $(item).find("symbolImage").text();
					forecastNext['min'] = min;
					forecastNext['max'] = max;
					forecastNext['icon'] = "http://opendata.euskadi.net"+img;

				}
			});
		},
		error: function(){
			$('#your-tweets').append('<li>There was an error loading the feed');
		}
	});
}

function readAgenda(RSS){
	var entries = [];

	$.get(RSS, {}, function(res, code) {
		var xml = $(res);
		var items = xml.find("item");
		var i = 0;
		var v = items[i];
		entry = {
			title:$(v).find("title").text(),
			link:$(v).find("link").text(),
			description:$.trim($(v).find("description").text())
		};
		entries.push(entry);

		var v = entries[i];
		//Set the title
		var dia;
		var hora;
		$(v.description).each(function(i){
			if(i==2){
				dia = $(this).text();
				var diaArray = dia.split(",");
				dia = diaArray[diaArray.length - 1];
			}
			else if(i==4){
				hora = $(this).text();
				var horaArray = hora.split(" ");
				hora = horaArray[horaArray.length - 1];
			}

		});
		var contentHTML = "";
		contentHTML += '<li><a href="agenda.html" class="contentLink">';
		contentHTML += dia+', '+hora+' ';
		contentHTML += '<span class="lightBlue">"'+v.title+'"</span>';
		contentHTML += '</a></li>';
		$(".agenda").append(contentHTML);
		$(".agenda").listview("refresh");
		agendaToday = contentHTML;
	});
}
function get_hora_GMT(date){

	// GMT contiene nuestra desviación horaria:
	var d = new Date();
	var GMT = parseInt(d.getTimezoneOffset()) * -1;
//	alert(GMT);

	// Creamos un objeto date con la fecha en GMT sumándole la diferéncia horaria, aunque pueda resultar una hora incorrecta:
	var dateArray = date.split(" ");
	var dateDay = dateArray[0].split('/');
	var dateHour = dateArray[1].slice(1,9).split(':');
	var Year = dateDay[2];
	var Mes = dateDay[1];
	var Day = dateDay[0];
	var Hora = dateHour[0];
	var Minutos = dateHour[1];
	var Segundos = dateHour[2];
	//alert(Year+', '+Mes+', '+Day+', '+Hora+', '+Minutos+', '+Segundos);
	var d=new Date(Year, Mes, Day, Hora, parseInt(Minutos) + GMT, Segundos);
	// Como el objeto Date se recalcula, le pedimos las componentes una a una. Aquí puedes cambiarlo a tu gusto, para obtener la fecha en el formato que desees:
	var newHour = d.getHours().toString();
	if(newHour.length == 1) newHour = '0'+newHour;
	var newMinute = d.getMinutes().toString();
	if(newMinute.length == 1) newMinute = '0'+newMinute;
	//var datetime = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	return newHour+':'+newMinute;
}

// Wait for PhoneGap to load
function phoneInit(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

// PhoneGap is ready
function onDeviceReady() {
	//window.localStorage.removeItem("lang");
	checkConnection();

	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
//	google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
}

function checkConnection() {
	var networkState = navigator.network.connection.type;
	/*var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';*/

	if(networkState == Connection.NONE){
		showAlert(_('noInternet', lang), exit, 'Internet', _('exit', lang));
	}
}

function onOffline() {
	alert('offline');
	checkConnection();
}

// Handle the online event
function onOnline() {
//	alert('online');
	//Hasierako orrian badago
   	if($.mobile.activePage.attr('id') == 'blank'){
		if(window.localStorage.getItem("lang") == null){
			location.href= "#language";
		}
		else{
			lang = window.localStorage.getItem("lang");
			location.href= "#mainPageHoy";
		}
	}
}

// Show a custom alert
function showAlert(message, callback, title, buttonName) {
	navigator.notification.alert(
		message, // message
		callback, //callback
		title, // title
		buttonName // buttonName
	);
}
//alert call back
function exit(){
	navigator.app.exitApp();
}


// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onSuccess(position) {
     /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');*/
	currentPos = position;
};

// onError Callback receives a PositionError object
//
function onError(error) {
   /* alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');*/

	currentPos = null;
	showAlert(_('noGPS'), undefined, _('kokapena'), _('ados'));
}

function calcularDistancia(lat1, lon1, lat2, lon2){
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = (lat2-0).toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return Math.ceil(d);
}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}


//Var for shop's long and lat

var zonasSurf = [
	//Azalpena
	{eu:"<p><b>Zarauzko hondartza</b><br/><br/><b>Olatu mota:</b> Piko anitzekoa; mendebaldetik (portua) ekialdera (kanala) sortzen dira.<br/><b>Haizea:</b> Hego-fluxua, urtean 340 egunetan<br/><b>Surflarien maila:</b> itsasbehera eta tartekoa hasiberrientzat dira egokiak, eta itsasgora trebatuentzat.<br/><b>Bainu-esparruak:</b> udako denboraldian (ekainaren 15etik irailaren 15era) bainularientzako esparruak errespetatu behar dira, eta sorosleek jartzen dituzten banderak ere bai.<ul><li>Berdea: bainua librea</li><li>Horia: bainatzea posible da, baina arretaz ibilita</li><li>Gorria: debekatuta bainatzea</li><li>Gorria eta urdina: ur-kirolak</li></ul></p>",
	es:"<p><b>La playa de Zarautz</b><br/><br/><b>Tipo de ola:</b> picos multiples, se forman de oeste (puerto) a oriente (canal).<br/><b>Viento:</b> Sur- Flujo, 340 días al año<br/><b>Nivel surfista:</b> la marea baja es idónea para principiantes y la alta para expertos.<br/><b>Zonas de baño:</b> durante la temporada de baño (del 15 de junio al 15 de septiembre) hay que respetar las zonas habilitadas para bañistas, y también las banderas que ponen los socorristas.<ul><li>Verde: baño libre</li><li>Amarilla: se permite el baño, pero con precaución</li><li>Roja: prohibido el baño</li><li>Roja y azul: deportes acuáticos</li></ul></p>",
	en:"<p><b>The beach of Zarautz</b><br/><br/><b>Wave type:</b> wafe of many peaks; waves are created form west (Portua) to east (Kanala).<br/><b>Wind:</b> south flow, 340 days in a year <br/><b>Surfers' level:</b> low and medium tides are suitable for beginners, high tide for experienced surfers.<br/><b>Swimming areas:</b> during the summer season (15th June - 15th September) the different swimming areas and flags must be respected.<ul><li>Green flag: free swimming</li><li>Yellow flag: swimming is permitted, but always with caution </li><li>Red flag: swimming is forbidden</li><li>Red and blue flags: area for water sports</li></ul></p>",
	fr:"<p><b>La plage de Zarauz</b><br/><br/><b>Type de vague:</b> de plusieurs pointes, les vagues se forment d'ouest (port) à est (canal).<br/><b>Le vent:</b> sud flux, 340 jours a l´année.<br/><b>Niveau des surfeurs:</b> la  marée basse et  la marée montante ou descendante sont idéales pour les débutants, et la marée haute pour les surfeurs experimentés <br/><b>Espaces de baignade:</b> en haute saison (du 15 juin au 15 septembre), il faut respecter les espaces de baignade et les drapeaux mis par les sauveteurs.<ul><li>Vert: baignade libre</li><li>Jaune: se baigner avec précaution</li><li>Rouge: baignade interdite</li><li>Rouge et bleu: sports aquatiques</li></ul></p>"
	},
	//Jardunbide egokiak
	{eu:"<p><b>Segurtasuna</b><br/>• Errespeta ezazu zure aurreko surflaria, bai igerian, bai olatua hartzean, nahasmenik ez sortzeko. Horrela, istripuak ekidingo dituzu.<br/>• Kontrolpean eduki zure taula uneoro, ingurukoek eta zure ekipoak minik har ez dezaten.<br/>• Sorosleak errespeta itzazu, hondartzako ardura eta agintea dute.<br/>• Debekatuta dago windsurfa eta kitesurfa egitea<br/><br/><b>Jardunbide egokiak</b><br/>• Itsasoa ondare unibertsala da. Ez da inorena, baina denek zaindu behar dugu.<br/>• Surfean aritu zaitez zure jarrerari eta mailari dagokion olatu-pikoan.<br/>• Zure ardura da gainontzeko surflariak ez oztopatzea olatu-pikora igerian zoazenean.<br/>• Lagundu beti arazoak dituen bainularia. Inor ez dago erreskaterako zurea baino egoera hobean.<b/>• Goza ezazu inguruneaz. Zaindu eta garbi manten ezazu. Saiatu ez kutsatzen: zaborrak ez botatzen, tonu egokian hitz eginda kutsadura akustikoa ekiditen, etab.</p>",
	es:"<p><b>Seguridad</b><br/>•	No te adelantes a otros surfistas, ni al nadar hacia el pico, ni al coger la ola, para no crear confusión. Así, evitarás accidentes.<br/>•	Mantén el control de tu tabla en todo momento. Esto evitará daños a los demás y a tu equipo.<br/>•	Respeta a los socorristas, que son la autoridad de la playa.<br/>•	Está prohibido hacer windsurf y kitesurf.<br/><br/><b>Buenas prácticas</b><br/>•	El mar es un patrimonio universal. No es de nadie, pero debemos cuidarlo entre todos.<br/>•	Surféa con el pico que esté en sintonía con tu actitud y nivel de surf.<br/>•	Zure ardura da gainontzeko surflariak ez oztopatzea olatu-pikora igerian zoazenean.<br/>•	Ayuda siempre a un bañista con problemas. Nadie está en mejor disposición para hacer un rescate que tú.<br/>•	Disfruta del entorno. Cuídalo y mantenlo límpio. Intenta no contaminar: sin echar residuos, hablando en un volumen apropoado para evitar la contaminació acústica, etc.</p>",
	en:"<p><b>Security</b><br/>•	To avoid confusions and accidents, do not overtake other surfers, not while swimming towards the peak and not even while taking the wave.  <br/>•	Keep your board’s control at every moment to avoid hurting other people and damage your equipment<br/>•	Respect lifeguards´ instructions, as they’re the authority on the beach<br/>•	Windsurfing and kitesurfing are forbidden<br/><br/><b>Good behavior</b><br/>•	The sea is an universal heritage. It doesn’t belong to anyone, but we all should take care of it.<br/>•	Choose waves according to your surf hability and level.<br/>•	It is your responsability not to be in the way of other surfers while swimming towards the wave peak<br/>•	Try to help swimmers in trouble. No one is in a better disposition than you.<br/>•	Enjoy the environment. Take care of it and keep it clean. Try not to pollute: don’t throw residues, don’t speak too loud to avoid acoustic pollution, and so on.</p>",
	fr:"<p><b>Sécurité</b><br/>•	Pour éviter toute confusion, ne dépasse pas les autres surfeurs, ni en nageant vers le pic, ni en prenant la vague. Cela permet d’éviter des accidents.<br/>•	Garde le contrôle de ta planche de surf à tout moment. Çela évitera d’endommager les autres et ton matériel.<br/>•	Respecte les sauveteurs, ce sont eux qui ont l’autorité à la plage.<br/>•	Il est interdit de faire du windsurf et du kitesurf.<br/><br/><b>Bonnes pratiques</b><br/>•	La mer fait partie du patrimoine universel. Elle n ‘ appartient a personne mais nous devons en prendre soin.<br/>•	Fais du surf sur la vague qui correspond à ton niveau de surf.<br/>•	Tu ne dois pas gêner les autres surfeurs quand tu es en train de nager vers le pic de la vague.<br/>•	Aide toujours les baigneurs en difficultés. Tu es le meilleur placé pour le secourir.<br/>•	Profite de l‘environnement. Fais en sorte qu’il reste propre. Essaies de ne pas polluer: de ne pas jeter de déchets, de ne pas parler trop fort, pour éviter la contamination acoustique.</p>"
	},
	//Galerna
	{eu:"<p>Adi tenperatura aldaketa azkarrei. Uraren eta atmosferaren artean 10-15ºC-ko aldea badago, galerna sor litezke. Galernak Kantauri itsosoko haize-bolada bortitzak dira. Ez da erraza izaten aurreikustea, eta oso denbora gutxian sortzen dira.</p>",
	es:"<p>Atención a los cambios bruscos de temperatura. Si la hay una diferencia de temperatura de 10-15ºC entre el agua y la atmósfera, se pueden crear galernas. Las galernas son fuertes golpers de viento del Cantábrico. No suele ser muy fácil prevenirlas, y se crean en muy poco tiempo.</p>",
	en:"<p>Beware of sudden temperature changes. If the difference between the water and atmosphere temperature is 10 – 15ºC galernas (strong northwest winds) could appear. This kind of winds are not easy to predict and they usually appear without warning</p>",
	fr:"<p>Attention aux changements brusques de température. S ‘il y a une différence de température de 10 à 15 degrés entre l’eau et l’ atmosphère, des vents de galerne peuvent se produire. Des galernes sont des vents violents du golfe de Biscaye. Ils sont difficiles à prévoir et se  produisent de façon soudaine.</p>"
	},
];
var shops = [
	{title:"Zarauzko Surf Eskola",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> bai<br/><b>Denda:</b> ez",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> sí<br/><b>Tienda:</b> no",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> yes<br/><b>Shop:</b> no",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> oui<br/><b>Boutique:</b> non"
	}],
	tel:"943019507",
	telCall:"943019507",
	web:"http://www.surfeskola.com",
	lat:43.285872,
	lon:-2.172306
	},
	{title:"La Escuela del Surf",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> bai<br/><b>Denda:</b> bai",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> sí<br/><b>Tienda:</b> sí",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> yes<br/><b>Shop:</b> yes",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> oui<br/><b>Boutique:</b> oui"
	}],
	tel:"679493478",
	telCall:"679493478",
	web:"http://www.laescueladelsurf.com",
	lat:null,
	lon:null
	},
	{title:"Pukas Surf Eskola",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> bai<br/><b>Denda:</b> bai",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> sí<br/><b>Tienda:</b> sí",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> yes<br/><b>Shop:</b> yes",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> oui<br/><b>Boutique:</b> oui"
	}],
	tel:"943835821 (Calle Nafarroa) 943890636 (Calle Lizardi)",
	telCall:"943835821",
	web:"http://www.pukassurfeskola.com",
	lat:43.287547,
	lon:-2.167019
	},
	{title:"Moor Surf Denda",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> ez<br/><b>Materiala alokairuan:</b> ez<br/><b>Denda:</b> bai",
	es:"<b>Cursos:</b> no<br/><b>Material en alquiler:</b> no<br/><b>Tienda:</b> sí",
	en:"<b>Courses:</b> no<br/><b>Equipment renting:</b> no<br/><b>Shop:</b> yes",
	fr:"<b>Courses:</b> non<br/><b>Matériel location:</b> non<br/><b>Boutique:</b> oui"
	}],
	tel:"650068364",
	telCall:"650068364",
	web:"http://www.moorsurf.com",
	lat:43.286944,
	lon:-2.174553
	},
	{title:"Zarauzko Surf Elkartea",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> ez<br/><b>Denda:</b> ez",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> no<br/><b>Tienda:</b> no",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> no<br/><b>Shop:</b> no",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> non<br/><b>Boutique:</b> non"
	}],
	tel:"943 890 225 – 607 424 556",
	telCall:"943 890 225",
	web:"http://www.zarauzkosurfelkartea.com",
	lat:43.288157,
	lon:-2.162771
	},
	{title:"Moor surf eskola",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> bai<br/><b>Denda:</b> ez",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> sí<br/><b>Tienda:</b> no",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> yes<br/><b>Shop:</b> no",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> oui<br/><b>Boutique:</b> non"
	}],
	tel:"943 02 08 94 / 679 319 006 / 635 732 013",
	telCall:"943 02 08 94",
	web:"http://www.moorsurfeskola.com",
	lat:43.286944,
	lon:-2.174553
	},
	{title:"Good people surf",
	ezaugarriak: [
	{eu:"<b>Ikastaroak:</b> bai<br/><b>Materiala alokairuan:</b> bai<br/><b>Denda:</b> bai",
	es:"<b>Cursos:</b> sí<br/><b>Material en alquiler:</b> sí<br/><b>Tienda:</b> sí",
	en:"<b>Courses:</b> yes<br/><b>Equipment renting:</b> yes<br/><b>Shop:</b> yes",
	fr:"<b>Courses:</b> oui<br/><b>Matériel location:</b> oui<br/><b>Boutique:</b> oui"
	}],
	tel:"943 536 627",
	telCall:"943 536 627",
	web:"http://www.goodpeoplesurf.com",
	lat:43.284672,
	lon:-2.159574
	}
];
var services = [
	{
		title: [{
			eu:"SOROSPEN ZERBITZUA",
			es:"SERVICIO DE SOCORRISMO",
			en:"SAVING SERVICE",
			fr:"SERVICE DE SECOURISTE"
		}],
		hour:[{
			eu:"10:45 - 19:45",
			es:"10:45 - 19:45",
			en:"10:45 - 19:45",
			fr:"10:45 - 19:45"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 15a",
			es:"1 de junio – 15 de septiembre",
			en:"june 1st –  september 15th",
			fr:"1 juin – 15 septembre"
		}],
		extra:null,
		tel:"625457869",
		telCall:"625457869",
		lat:null,
		lon:null
	},
	{
		title: [{
			eu:"ELBARRITUENTZAKO BAINU-ZERBITZUAK",
			es:"SERVICIO DE BAÑO PARA MINUSVÁLIDOS",
			en:"BATH FOR SERVICE FOR DISABLED PERSONS",
			fr:"SERVICE DE BAIN POUR HANDICAPÉS"
		}],
		hour:[{
			eu:"<br/>- Goizez: 10.45 - 13:00<br/>- Arratsaldez: 16:00 - 19:45",
			es:"<br/>- Mañana: 10.45 - 13:00<br/>- Tarde: 16:00 - 19:45",
			en:"<br/>- Morning: 10.45 - 13:00<br/>- Afternoon: 16:00 - 19:45",
			fr:"<br/>- Matin: 10.45 - 13:00<br/>- Aprés-midi: 16:00 - 19:45"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 15a",
			es:"1 de junio – 15 de septiembre ",
			en:"june 1st –  september 15th",
			fr:"1 juin – 15 septembre "
		}],
		extra:[{
			eu:"<b>Baldintza:</b> Bandera berdea",
			es:"<b>Requisito:</b> Bandera verde",
			en:"<b>Requirement:</b> Green flag",
			fr:"<b>Exigence:</b> Bandera verde"
		}],
		tel:"625457869",
		telCall:"625457869",
		lat:null,
		lon:null
	},
	{
		title: [{
			eu:"TOLDO ETA AULKIEN ZERBITZUA",
			es:"SERVICIO DE TOLDOS Y SILLAS",
			en:"SERVICE AWNINGS AND CHAIRS",
			fr:"SERVICE DE STORES ET CHAISES"
		}],
		hour:[{
			eu:"10:00 – 19:30",
			es:"10:00 – 19:30",
			en:"10:00 – 19:30",
			fr:"10:00 – 19:30"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 15a",
			es:"1 de junio – 15 de septiembre ",
			en:"june 1st –  september 15th",
			fr:"1 juin – 15 septembre "
		}],
		extra:[{
			eu:"<b>Prezioa:</b><br/>- Denboraldia: 343 €<br/>- Hilabetea: 171,5 €<br/>- Eguna: 17 €",
			es:"<b>Precio:</b><br/>- Temporada: 343 €<br/>- Mes: 171,5 €<br/>- Día: 17 €",
			en:"<b>Prices:</b><br/>- Season: 343 €<br/>- Mounth: 171,5 €<br/>- Day: 17 €",
			fr:"<b>Prix:</b><br/>- Saison: 343 €<br/>- Mensuel: 171,5 €<br/>- Jour: 17 €"
		}],
		tel:"699705326 - 699775242",
		telCall:"699705326",
		lat:43.287258,
		lon:-2.175224
	},
	{
		title: [{
			eu:"DUTXA ETA KOMUNETAKO ZERBITZUAK: MUNOA",
			es:"SERVICIOS DE DUCHAS Y ASEOS: MUNOA",
			en:"SERVICES OF SHOWERS AND TOILETS: MUNOA",
			fr:"SERVICE DE DOUCHES ET TOILETTES: MUNOA"
		}],
		hour:[{
			eu:"10:00 – 20:00",
			es:"10:00 – 20:00",
			en:"10:00 – 20:00",
			fr:"10:00 – 20:00"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 30a",
			es:"1 de junio – 30 de septiembre ",
			en:"june 1st –  september 30th",
			fr:"1 juin – 30 septembre "
		}],
		extra:[{
			eu:"<b>Prezioak:</b><br/>- 0,50 € komuna – 1,50 € dutxa",
			es:"<b>Precios:</b><br/>- 0,50 € servicio – 1,50 € ducha",
			en:"<b>Prices:</b><br/>- 0,50 € WC – 1,50 € shower",
			fr:"<b>Prix:</b><br/>- 0,50 € toilette – 1,50 € douche"
		}],
		tel:null,
		telCall:null,
		lat:43.287234,
		lon:-2.176161
	},
	{
		title: [{
			eu:"DUTXA ETA KOMUNETAKO ZERBITZUAK: MUSKARIA",
			es:"SERVICIOS DE DUCHAS Y ASEOS: MUSKARIA",
			en:"SERVICES OF SHOWERS AND TOILETS: MUSKARIA",
			fr:"SERVICE DE DOUCHES ET TOILETTES: MUSKARIA"
		}],
		hour:[{
			eu:"10:00 – 20:00",
			es:"10:00 – 20:00",
			en:"10:00 – 20:00",
			fr:"10:00 – 20:00"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 30a",
			es:"1 de junio – 30 de septiembre ",
			en:"june 1st –  september 30th",
			fr:"1 juin – 30 septembre "
		}],
		extra:[{
			eu:"<b>Prezioak:</b><br/>- 0,50 € komuna – 1,50 € dutxa",
			es:"<b>Precios:</b><br/>- 0,50 € servicio – 1,50 € ducha",
			en:"<b>Prices:</b><br/>- 0,50 € WC – 1,50 € shower",
			fr:"<b>Prix:</b><br/>- 0,50 € toilette – 1,50 € douche"
		}],
		tel:null,
		telCall:null,
		lat:43.287262,
		lon:-2.172539
	},
	{
		title: [{
			eu:"DUTXA ETA KOMUNETAKO ZERBITZUAK: TORREMAR",
			es:"SERVICIOS DE DUCHAS Y ASEOS: TORREMAR",
			en:"SERVICES OF SHOWERS AND TOILETS: TORREMAR",
			fr:"SERVICE DE DOUCHES ET TOILETTES: TORREMAR"
		}],
		hour:[{
			eu:"10:00 – 20:00",
			es:"10:00 – 20:00",
			en:"10:00 – 20:00",
			fr:"10:00 – 20:00"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 30a",
			es:"1 de junio – 30 de septiembre ",
			en:"june 1st –  september 30th",
			fr:"1 juin – 30 septembre "
		}],
		extra:[{
			eu:"<b>Prezioak:</b><br/>- 0,50 € komuna – 1,50 € dutxa",
			es:"<b>Precios:</b><br/>- 0,50 € servicio – 1,50 € ducha",
			en:"<b>Prices:</b><br/>- 0,50 € WC – 1,50 € shower",
			fr:"<b>Prix:</b><br/>- 0,50 € toilette – 1,50 € douche"
		}],
		tel:null,
		telCall:null,
		lat:null,
		lon:null
	},
	{
		title: [{
			eu:"DUTXA ETA KOMUNETAKO ZERBITZUAK: GURUTZE GORRIA",
			es:"SERVICIOS DE DUCHAS Y ASEOS: GURUTZE GORRIA",
			en:"SERVICES OF SHOWERS AND TOILETS: GURUTZE GORRIA",
			fr:"SERVICE DE DOUCHES ET TOILETTES: GURUTZE GORRIA"
		}],
		hour:[{
			eu:"10:45 – 19:45 (pertsona elbarrituak bakarrik)",
			es:"10:45 – 19:45 (sólo minusválidos)",
			en:"10:45 – 19:45 (only disabled persons)",
			fr:"10:45 – 19:45 (uniquement handicapés)"
		}],
		schedule:[{
			eu:"Ekainaren 1a - Irailaren 15a",
			es:"1 de junio – 15 de septiembre ",
			en:"june 1st –  september 15th",
			fr:"1 juin – 15 septembre "
		}],
		extra:[{
			eu:"<b>Prezioak:</b><br/>- 0,50 € komuna – 1,50 € dutxa",
			es:"<b>Precios:</b><br/>- 0,50 € servicio – 1,50 € ducha",
			en:"<b>Prices:</b><br/>- 0,50 € WC – 1,50 € shower",
			fr:"<b>Prix:</b><br/>- 0,50 € toilette – 1,50 € douche"
		}],
		tel:null,
		telCall:null,
		lat:43.287459,
		lon:-2.168959
	},
	{
		title: [{
			eu:"DUTXA ETA KOMUNETAKO ZERBITZUAK: ARGUIÑANO",
			es:"SERVICIOS DE DUCHAS Y ASEOS: ARGUIÑANO",
			en:"SERVICES OF SHOWERS AND TOILETS: ARGUIÑANO",
			fr:"SERVICE DE DOUCHES ET TOILETTES: ARGUIÑANO"
		}],
		hour:[{
			eu:"10:00 – 20:00",
			es:"10:00 – 20:00",
			en:"10:00 – 20:00",
			fr:"10:00 – 20:00"
		}],
		schedule:[{
			eu:"Ekainaren 4a - Irailaren 30a",
			es:"4 de junio – 30 de septiembre ",
			en:"june 4th –  september 30th",
			fr:"4 juin – 30 septembre "
		}],
		extra:[{
			eu:"<b>Prezioak:</b><br/>- 0,50 € komuna – 1,50 € dutxa",
			es:"<b>Precios:</b><br/>- 0,50 € servicio – 1,50 € ducha",
			en:"<b>Prices:</b><br/>- 0,50 € WC – 1,50 € shower",
			fr:"<b>Prix:</b><br/>- 0,50 € toilette – 1,50 € douche"
		}],
		tel:null,
		telCall:null,
		lat:null,
		lon:null
	}
];
var entriesShop = [];
var selectedShopEntry = "";
var entriesServices = [];
var selectedServicesEntry = "";
var isShop = true;
//var currentPos;



//Listen for main page
$("#mareasPage").live("pageinit", function() {
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));
	$('.lTablaIkusi').html(_("lTablaIkusi"));
	$('#leyenda').html(_("leyenda"));
	//Tabla
	//zenb, title, datetime, value1, value2, ...,value60
	$.ajax({
		url: "http://www.windguru.cz/int/get_datafile.php?username=zarauz&model=gfs",
		dataType: 'html',
		callbackParameter: 'callback',
		success: function(data, status) {
			var gfs = data.split(',');
			var i = 0;
			var time;
			var firstTime = parseInt(gfs[i+2].substring(12,14)) + 2;

			if(firstTime == 2){
				i++;
				firstTime = parseInt(firstTime) + (i*3);
			}
			else if(firstTime > 20){
				i = i + 2;
				firstTime = parseInt(firstTime) + (i*3);
				if(firstTime > 24) firstTime = firstTime -24;
			}
			var timeHtml = '<th/>';
			var tempHtml = '<td class="alignR">'+_('lTemp')+' (ºC)</td>';//gfs[i+1]+'</td>';
			var winddirHtml = '<td class="alignR">'+_('lDir')+' (*)</td>';//gfs[i+127]+'</td>';
			var windspdHtml = '<td class="alignR">'+_('lSpeed')+' ('+_('nudos')+')</td>';//gfs[i+190]+'</td>';
			var gustHtml = '<td class="alignR">'+_('lGust')+' ('+_('nudos')+')</td>';//gfs[i+253]+'</td>';
			var olasHtml = '<td class="alignR">'+_('lOlas')+' (m)</td>';//wavesTitle+'</td>';//
			var j = 0;
			while(j<6){
				//time
				time = parseInt(firstTime) + (j*3);
				if(time > 20){
					i = i + 2;
					time = parseInt(firstTime) + (j*3);
					if(time > 24) time = time -24;
				}
				timeHtml += '<th>'+time+'h</th>';
				//temp
				tempHtml += '<td>'+gfs[i+3]+'</td>';
				//winddir
				winddirHtml += '<td>'+gfs[i+129]+'</td>';
				//windspd
				windspdHtml += '<td>'+gfs[i+192]+'</td>';
				//gust
				gustHtml += '<td>'+gfs[i+255]+'</td>';
				//olas
				olasHtml += '<td>'+wavesToday[i]+'</td>';
				i++;
				j++;
			}
			$('#timeTable').html(timeHtml);
			$('#tempTable').html(tempHtml);
			$('#winddirTable').html(winddirHtml);
			$('#windspdTable').html(windspdHtml);
			$('#gustTable').html(gustHtml);
			$('#olasTable').html(olasHtml);
		},
		error: function(){
		//	alert('error');
		}
	});
});

//Beach options page (static)
$("#playaPage").live("pageinit", function() {
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));
	$('.lServicesBeach').html(_('lServicesBeach'));
});


//listen for map links
$(".contentLinkService").live("click", function() {
	selectedServiceEntry = $(this).data("entryid");
	isShop = false;
});
//listen for map links
$(".contentLinkShop").live("click", function() {
	selectedShopEntry = $(this).data("entryid");
	isShop = true;
});


//Content for Beach Services (static)
$("#servicesPage").live("pageshow", function(prepage) {
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	//var lang = window.localStorage.getItem("lang");
    var contentHTML = "";
   	var i = 0;
   	for(i=0;i<services.length;i++){
   		contentHTML += "<li><p>";
   			contentHTML += "<b class='blueTurq'>"+services[i]['title'][0][lang]+"</b><br/>";
   			if(services[i].tel != null){
   				contentHTML += "<b>Tel:</b> <a href='tel:"+ services[i].telCall+"'>"+ services[i].tel+"</a><br/>";
   			}
   			contentHTML += "<b>"+_('lHour')+":</b>"+ services[i]['hour'][0][lang]+"<br/>";
   			contentHTML += "<b>"+_('lSchedule')+":</b>"+ services[i]['schedule'][0][lang]+"<br/>";
   			if(services[i].extra != null){
   				contentHTML += services[i]['extra'][0][lang]+"<br/>";
   			}
   			if(services[i].lat != null){
				contentHTML += "<div class='mapaLink'><a href='surfplayaCursosMap.html' class='contentLinkService' data-entryid='"+i+"'>";
				contentHTML += _('lMapanKokatu');
				contentHTML += "</a></div>";
			}
		contentHTML += '</p></li>';
	}

 	$("#servicesList").append(contentHTML);
    $("#servicesList").listview("refresh");
	resize_content("#servicesList");
});

//Content for Comportamiento (static)
$("#comoPage").live("pageshow", function(prepage) {
	//var lang = window.localStorage.getItem("lang");
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	var contentHTML = "";

	contentHTML += '<img src="" alt="ImageComo"/>';
	contentHTML += "<p>Texto de como comportarse en la playa</p>";

    $("#comoText",this).html(contentHTML);
});

//Listen for main page
$("#shopsPage").live("pageinit", function() {
//$("#shopsPage").live("pageshow", function(prepage){
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));

	//var lang = window.localStorage.getItem("lang");
	var contentHTML = "";
	var i = 0;
    /* INFORMAZIO ESTATIKOA */
    for(i=0; i<shops.length; i++){
		contentHTML += "<li><p>";
			contentHTML += "<b class='blueTurq'>"+shops[i].title+"</b><br/>";
			contentHTML += "<b>Tel:</b> <a href='tel:"+shops[i].telCall+"'>"+shops[i].tel+"</a><br/>";
			contentHTML += shops[i].ezaugarriak[0][lang];
			contentHTML += "<br/><b>Web:</b> <a rel='external' href='"+shops[i].web+"'>"+shops[i].web+"</a><br/>";
			if(shops[i].lat != null){
				contentHTML += "<div class='mapaLink'><a href='surfplayaCursosMap.html' class='contentLinkShop' data-entryid='"+i+"'>";
				contentHTML += _('lMapanKokatu');
				contentHTML += "</a></div>";
			}
		contentHTML += '</p></li>';
	}

	$("#shopsList").append(contentHTML);
    $("#shopsList").listview("refresh");

	resize_content("#shopsList");
});

/**** PUT COURSES IN THE MAP ****/
$("#PageMapaCursos").live("pageshow", function(prepage) {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());

	$(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": mapsurf, other_params: "sensor=true&language=en"});

	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	if(isShop){
		$('#ServiceCursoTitle').html(shops[selectedShopEntry].title);
		$('.backMapSurf').attr('href', 'surfplayaCursos.html');
	}else{
		$('#ServiceCursoTitle').html(services[selectedServiceEntry]['title'][0][lang]);
		$('.backMapSurf').attr('href', 'surfplayaServicios.html');
	}
});

////////////////////////////SURF /////////////////////////////////////
var currentSurfButton = 0;
$(".surfLink").live("click", function() {
	var i = $(this).attr("data-surfId");
	$("#zonesText").html(zonasSurf[i][lang]);
	$("#"+currentSurfButton+"Surf").attr('class', 'lightGreyButton surfButton');
	$("#"+i+"Surf").attr('class', 'darkGreyButton surfButton');
	currentSurfButton = i;
  //altuera aldatu
	//resize_content("#entrySurfText");

});
//Content for Surf Zones (static)
$("#zonesPage").live("pageshow", function(prepage) {
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));

	//Botoiak
	$('.lAzalpen').html(_('lAzalpen'));
	$('.lJardun').html(_('lJardun'));
	$('.lGalerna').html(_('lGalerna'));

	$("#zonesText").html(zonasSurf[0][lang]);
  	//altuera aldatu
	resize_content("#entrySurfText");
});

//Content for Surf Zones (static)
$("#zonesPagePhoto").live("pageshow", function(prepage) {
	$('.lSurfPlaya').html(_('lSurfPlaya').toUpperCase());
	$('.lMarea').find('[class="ui-btn-text"]').html(_("lMarea"));
	$('.lCursos').find('[class="ui-btn-text"]').html(_("lCursos"));
	$('.lPlaya').find('[class="ui-btn-text"]').html(_("lPlaya"));
});

var selectedExperience = 0;
var experiencias = [
	{title:[{
		eu:"SANTA KLARA, ARITZBATALDE eta AZKEN PORTUko jaiak",
		es:"Fiestas de SANTA KLARA, ARITZBATALDE y AZKEN PORTU",
		en:"SANTA KLARA, ARITZBATALDE and AZKEN PORTU festivals",
		fr:"Fêtes du SANTA KLARA, ARITZBATALDE et AZKEN PORTU"
	}],
	subtitle:[{
		eu:"Abuztua 08-12",
		es:"Agosto 08-12",
		en:"August 08-12",
		fr:"Août 08-12"
	}],
	description:[{
		eu:"Euskal herri-kirolak, txirrindulari-lasterketa, haurren krosa, bertso-jaialdia eta musika-kontzertuak dira Santa Klara auzoko jaietara etortzeko pizgarriak. Gainera, auzotarrek ere parte hartzen dute herri-kiroletan.",
		es:"El deporte rural vasco, con la participación activa en las pruebas de los vecinos del barrio, la carrera ciclista, el cross infantil, el festival de bertsolaris y los conciertos musicales son los alicientes para acudir a las fiestas de Santa Clara.",
		en:"Basque rural sports, with the active participation of the local townsfolk, a cycling race, children’s cross country run, bertsolari festival and music concerts all feature on the programme for the Santa Clara festivals.",
		fr:"Le sport rural basque, avec la participation active des habitants du quartier aux différentes épreuves, la course cycliste, le cross des enfants, le festival des bertsularis et les concerts de musique sont autant d’attraits pour assister aux fêtes de Santa Clara."
	}],
	extra:[{
		eu:'<strong>Informazioa gehiago:</strong> <a href="http://www.azkenportu.net" rel="external">www.azkenportu.net</a>',
		es:'<strong>Más información:</strong> <a href="http://www.azkenportu.net" rel="external">www.azkenportu.net</a>',
		en:'<strong>More information:</strong> <a href="http://www.azkenportu.net" rel="external">www.azkenportu.net</a>',
		fr:'<strong>En savoir plus:</strong> <a href="http://www.azkenportu.net" rel="external">www.azkenportu.net</a>'
	}],
	photos:['1002675_m.jpg', '1028223_m.jpg', '1028227_m.jpg', '1028229_m.jpg']
	},
	{title:[{
		eu:"ESTROPADAK",
		es:"REGATAS",
		en:"BOAT RACE",
		fr:"RÉGATES"
	}],
	subtitle:[{
		eu:"Abuztuaren 18 eta 19an",
		es:"18 y 19 de agosto",
		en:"18 and 19 August",
		fr:"18 et 19 Août"
	}],
	description:[{
		eu:"TKE Ligarako baliozkoa da Zarauzko Ikurrina, eta arraunlariek bi jardunalditan jokatzen dute estropada: larunbatean eta igandean. Arraunak tradizio handia du Bizkaiko Golkoan eta, horri esker, kolore askotako uholdeak hartzen ditu herriko kaleak; zaleen koloreak erakusten ditu herriak.",
		es:"La bandera de Zarautz se celebra en dos jornadas, sábado y domingo, y es puntuable para la Liga ACT. El Cantábrico es un mar en el que este deporte tiene gran tradición, por ello, las calles de la localidad se convierten en una marea multicolor donde se reflejan los colores de cada afición.",
		en:"The Zarauzko Ikurriña (or Zarautz Flag) boat race is held over two days, Saturday and Sunday, and forms part of the ACT League championship. Open-water boat racing is a sport with a long history in the Bay of Biscay and during the event the streets of Zarautz are filled with the colours displayed by the fans of the different competing teams.",
		fr:"La Bandera de Zarautz se déroule sur deux journées, samedi et dimanche, et compte pour la Ligue ACT. La Mer Cantabrique est une mer où ce sport a une grande tradition, c’est pourquoi les rues de la localité deviennent une marée multicolore où se reflètent les couleurs de chaque équipe."
	}],
	extra:[{
		eu:"Abuztuaren 18 eta 19an, Zarauzko emakumezkoen IV. Zarauzko Ikurrina eta gizonezkoen Zarauzko XXXV. Ikurrina jokatuko dira. Iraileko lehen bi asteburuetan jokatzen diren Kontxako estropaden aurretik urteko hitzordurik garrantzitsuena dira. Bi saiotan jokatzen dira.<br/><br/><strong>Informazio gehiago:</strong><br/><a href='http://ligasanmiguel.com/femenina/index.php?id=eu' rel='external'>http://ligasanmiguel.com/femenina/index.php?id=eu</a><br/><a href='http://ligasanmiguel.com/index.php?id=eu#&panel1-1' rel='external'>http://ligasanmiguel.com/index.php?id=eu#&panel1-1</a>",
		es:"El 18 y 19 de Agosto se disputará la Ikurriña de Zarautz, la IV. edición para la categoría femenima y la XXXV. para la categoría masculina. Es la antesala de la regata de la Concha y es una de las citas más importantes de la liga.<br/><br/><strong>Más información::</strong><br/><a href='http://ligasanmiguel.com/femenina/index.php?id=es' rel='external'>http://ligasanmiguel.com/femenina/index.php?id=eu</a><br/><a href='http://ligasanmiguel.com/index.php?id=eu#&panel1-1' rel='external'>http://ligasanmiguel.com/index.php?id=es#&panel1-1</a>",
		en:null,
		fr:null
	}],
	photos:['1004047_o.jpg', '1004054_o.jpg', '1028332_o.jpg', '1028340_o.jpg', '1028345_o.jpg']
	},
	{title:[{
		eu:"EUSKAL JAIA",
		es:"FIESTA VASCA",
		en:"BASQUE FESTIVAL",
		fr:"FÊTE BASQUE"
	}],
	subtitle:[{
		eu:"Irailaren 9an, ekintzak aste osoan (02-09)",
		es:"El 9 de septiembre, actividades durante toda la semana (02-09)",
		en:"On September 9, activities throughout the week (02-09)",
		fr:"Le 9 Septembre, les activités tout au long de la semaine (02-09)"
	}],
	description:[{
		eu:"Irailaren hasieran hasten da Euskal Astea, eta irailaren 9an (Euskal Jaietan) dago gorenean. Egunotan, baserritar-jantzia janzten dute herritarrek, euskal tradizio herrikoiak berreskuratu nahian.",
		es:"La Semana Vasca comienza a principios de septiembre, siendo la Fiesta Vasca del día 9 su punto álgido. Durante esos días los ciudadanos se visten con el traje regional en un afán por recuperar las tradiciones populares vascas.",
		en:"Basque Week begins at the beginning of September, and culminates with the Basque Festival on the 9th. During this period, local inhabitants wear their traditional costumes and engage in a range of activities designed to celebrate traditional Basque customs.",
		fr:"La Semaine Basque commence début septembre et la Fête Basque du 9 marque son point culminant. Pendant ces journées, les citoyens enfilent le costume régional dans un souci de récupérer les traditions populaires basques."
	}],
	extra:[{
		eu:null,
		es:null,
		en:null,
		fr:null
	}],
	photos:['1003172_m.jpg', '1003173_m.jpg', '1003174_m.jpg', '1003178_m.jpg', '1003184_m.jpg']
	},
	{title:[{
		eu:"SURFING ZARAUTZ",
		es:"SURFING ZARAUTZ",
		en:"SURFING ZARAUTZ",
		fr:"SURFING ZARAUTZ"
	}],
	subtitle:[{
		eu:"Ikastaroak asteburuetan",
		es:"Cursos los fines de semana",
		en:"Lessons on the weekends",
		fr:null
	}],
	description:[{
		eu:"Zarautzen surfa guztiz errotuta dagoen kirola da. Estilo eta maila guztietan egiten da. Horregatik aurten prestatu dugu kirolaz eta abenturaz betetako asteburu izugarri bat, zure familiarekin gozatu eta Zarauzko herriaz maitemin zaitezen. Ikastaroaren helburua familan ondo pasatzea da eta, inolako arriskurik gabe, surfean ikastea.",
		es:"Zarautz es la localidad donde este deporte cuenta con más arraigo de la costa gipuzkoana. Se practica en todos los estilos y niveles. Por eso te hemos preparado un fin de semana trepidante para toda la familia cargado de deporte y aventura para que te enamores de Zarautz. El objetivo del curso es que te lo pases bien en familia, aprendiendo a surfear, y sin ningún riesgo.",
		en:"The beach of Zarautz is one of the most emblematic beaches of the basque coast, and the longest, with its nearly 3 km lenght. Maybe that’s why Zarautz is the birthplace of basque surfing, and the town in which this sport is most strongly rooted of the whole gipuzkoan coast. Some internationally known surfers were born here, highest level championships are held and the best infrastructures are provided.",
		fr:"Zarautz a  une des plagues les plus importantes de la côte basque et la plus longue , avec presque 3 km de longueur. C’est peut être pour cela qu’elle est le berceau du surf basque  et l ‘endroit où ce sport compte avec une forte presence sur la côte  de Gipuzkoa. Des surfeurs de taille internationale sont nés ici, on y dispute des championnats internationaux et elle compte de très bonnes infraestructures."
	}],
	extra:[{
		eu:"<strong>Informazio orokorra:</strong><br/>•	Egunak: asteburuetan, Aste Santuan eta zubietan. Urte guztian uztaila eta abuztua izan ezik.<br/>•	Familiak: gutxienez 3 eta gehienez 5 pertsona (gutxienez heldu 1 eta gehienez 2)<br/>•	Prezioa: 150€ (BEZ-a barne) 3 pertsoneko familiako. Hortik gorako pertsona bakoitzeko 50€.<br/>•	Prezioan hauek sartzen dira: ohola, arropa, asegurua, irakaslea eta instalazioak.",
		es:"<strong>Información general:</strong><br/>•	Fechas disponibles: fines de semana, Semana Santa y puentes. Todo el año excepto julio y agosto.<br/>•	Familias: mínimo 3 y máximo 5 personas (mínimo 1 y máximo 2 adultos)<br/>•	Precio: 150€ (IVA incluido) por familia de 3 personas. 50€ de suplemento por persona adicional<br/>•	Incluye: tabla, traje, seguro, monitor e instalaciones.",
		en:"<strong>General information:</strong><br/>•	Available dates: weekends, Easter and long weekends, all year around except July and August.<br/>•	Family groups: minimum 3 and maximum 5 people (minimum 1 and maximum 2 adults)<br/>•	Price: 150€ (VAT included) per family of 3 members. 50 € supplements per additional person.<br/>•	The offer includes: surfboard, suit, insurance, instructor and facilities.",
		fr:"<strong>Principaux renseignements:</strong><br/>•	Dates disponibles: week-ends, Pâques et ponts. Durant toute l'année, sauf en juillet et août.<br/>•	Familles: minimum 3 et maximum 5 personnes (minimum 1 et maximum 2 adultes)<br/>•	Tarif: 150€ (TVA comprise) par famille de 3 personnes. 50€ de supplément par personne additionnelle.<br/>•	Le tarif comprend: la planche de surf, la combinaison, l'assurance, le moniteur et accès aux installations.<br/>"
	}],
	photos:['3728305847_7b925423ed_b.jpg', '3729069822_0aa0891f7a_b.jpg', '3729070978_0945604881_b.jpg', '3729104538_d2e7034cb7_b.jpg']
	},
	{title:[{
		eu:"GALTXAGORRIEN BILA",
		es:"EN BUSCA DE LOS GALTXAGORRIS",
		en:"LOOKING FOR THE \"GALTXAGORRIS\"",
		fr:"À LA RECHERCHE DES \"GALTXAGORRIS\""
	}],
	subtitle:[{
		eu:"Haurrentzat jokoa asteartero udaran zehar",
		es:"Actividad para niñ@s cada martes en verano",
		en:"Activity for kids, every Tuesday, in the summer",
		fr:null
	}],
	description:[{
		eu:"Galtxagorriak, Zarauzko kaleetan zehar ezkutatzen diren iratxo txiki-txikiak dira. Orratzontzi batean kabitzen dira eta euren galtza gorriengatik bereizten dira. Beren  indar eta abantaila azkarrari esker, lana gogor egin dezakete eta gau bakar batean behar nekezena bukatu.",
		es:"Los Galtxagorris, unos diminutos duendes que se esconden en las calles de Zarautz. Caben en un alfiletero y se distinguen por sus pantalones rojos. Gracias a su fuerza sobrehumana y su gran velocidad, pueden trabajar todo el tiempo y completar las tareas más difíciles en una sola noche.",
		en:"\"The Galtxagorris\" are some tiny mitological elves who are hidden in Zarautz. These characters are distinguished by their red pants. Because of their strength and their speed, they can work hard and complete the hardest task in just one night.",
		fr:"Les Galtxagorris sont des petits lutins qui se cachent dans les rues de Zarautz.  On peut les retrouver dans une toute petite boîte, et on peut facilement les reconnaître grâce  à leurs pantalons rouges. Grace à leur force surhumaine, ils peuvent travailler sans cesse, et effectuer des tâches difficiles en une seule nuit ."
	}],
	extra:[{
		eu:"<strong>Informazio orokorra:</strong><br/>-	<strong>Fetxa libreak:</strong><br/>&nbsp;&nbsp;&nbsp;•	Uztaila, asteartetan 17:30etan<br/>&nbsp;&nbsp;&nbsp;•	Abuztua, asteartetan 11:00etan<br/>-	<strong>Iraupena:</strong> 2 ordu<br/>-	<strong>Hizkuntza:</strong>	Euskera eta Gaztelera<br/>-	<strong>Abiapuntua:</strong> Zarauzko Turismo Bulegoa. Nafarroa kalea, 3 20800 Zarautz<br/>-	<strong>Prezioa:</strong> 6€ pertsonako – 5 urteetik bera dohain (umeak pertsona heldu batekin joan beharko dute)<br/>-	<strong>Informazio gehiago:</strong><br/>&nbsp;&nbsp;&nbsp;•	Tel.: <a href='tel:943 830990'>943 830990</a><br/>&nbsp;&nbsp;&nbsp;•	<a href='mailto:turismoa@zarautz.org'>turismoa@zarautz.org</a><br/>-	<strong>Erreserbak:</strong> <a href='http://www.reservasguipuzcoa.com' rel='external'>www.reservasguipuzcoa.com</a>",
		es:"<strong>Información general:</strong><br/>-	<strong>Fechas disponibles:</strong><br/>&nbsp;&nbsp;&nbsp;•	En Julio los martes a las 17:30h (excepto el 31 de julio, festivo. Esa semana la visita se realizará el lunes día 30)<br/>&nbsp;&nbsp;&nbsp;•	En Agosto los martes a las 11:00h<br/>-	<strong>Duración:</strong> 2 horas<br/>-	<strong>Idioma:</strong> Euskara y Castellano<br/>-	<strong>Punto de partida:</strong> Oficina de Turismo de Zarautz. Nafarroa kalea 3, 20800 Zarautz<br/>-	<strong>Precio:</strong> 6€ por persona – menores de 5 años gratis (los niños deberán de ir acompañados por algún adulto)<br/>-	<strong>Para más información:</strong><br/>&nbsp;&nbsp;&nbsp;•	Tel.: <a href='tel:943 830990'>943 830990</a><br/>&nbsp;&nbsp;&nbsp;•	<a href='mailto:turismoa@zarautz.org'>turismoa@zarautz.org</a><br/>-	<strong>Reservas:</strong> <a href='http://www.reservasguipuzcoa.com' rel='external'>www.reservasguipuzcoa.com</a>",
		en:"<strong>General information:</strong><br/>-	<strong>Available dates:</strong><br/>&nbsp;&nbsp;&nbsp;•	July, every Tuesday at at 17:30h (except July 31st. This week the visit will be on monday July 30th<br/>&nbsp;&nbsp;&nbsp;•	August, every Tuesday at 11:00h<br/>-	<strong>Duration:</strong> 2 hours<br/>-	<strong>Language:</strong> Basque and Spanish<br/>-	<strong>Starting point:</strong> Tourist Office of Zarautz. Nafarroa kalea, 3 20800 Zarautz<br/>-	<strong>Price:</strong> 6€ per person – children under 5 free (Kids must go with an adult)<br/>-	<strong>For further information:</strong><br/>&nbsp;&nbsp;&nbsp;•	Tel.: <a href='tel:943 830990'>943 830990</a><br/>&nbsp;&nbsp;&nbsp;•	<a href='mailto:turismoa@zarautz.org'>turismoa@zarautz.org</a><br/>-	<strong>Reservation:</strong> <a href='http://www.reservasguipuzcoa.com' rel='external'>www.reservasguipuzcoa.com</a>",
		fr:"Informations principales:</strong><br/>-	<strong>Dates disponibles:</strong><br/>&nbsp;&nbsp;&nbsp;•	En Juillet, les mardis à 17h30 (sauf  31 Juillet. Cette semaine, la tournée aura lieu le lundi, 30)<br/>&nbsp;&nbsp;&nbsp;•	En Août,  les mardis à 11h00<br/>-	<strong>Durée: 2 heures<br/>-	<strong>Langue: basque et espagnol<br/>-	<strong>Point de départ: Office de Tourisme de Zarautz. Nafarroa kalea 3, 20800 Zarautz.<br/>-	<strong>Prix: 6 euros par personne- moins de 5 ans gratuit- les enfants doivent être accompagnés par un adulte.<br/>-	<strong>Plus des renseignements:</strong><br/>&nbsp;&nbsp;&nbsp;•	Tel.: <a href='tel:943 830990'>943 830990</a><br/>&nbsp;&nbsp;&nbsp;•	<a href='mailto:turismoa@zarautz.org'>turismoa@zarautz.org</a><br/>-	<strong>Réservations:  <a href='http://www.reservasguipuzcoa.com' rel='external'>www.reservasguipuzcoa.com</a>"
	}],
	photos:['1004742_m.jpg']
	},
	{title:[{
		eu:"TXAKOLINAREN IBILBIDEA",
		es:"TXAKOLI DE GETARIA",
		en:"\"TXAKOLI DE GETARIA\"",
		fr:"\"TXAKOLI DE GETARIA\""
	}],
	subtitle:[{
		eu:"Bisita gidatuak ostiral eta larunbatetan",
		es:"Visitas guiadas los viernes y sábados",
		en:null,
		fr:null
	}],
	description:[{
		eu:"Txakolina ardo zuri fresko eta arina da, apar apur bat duena eta pixka bat garratza. Bere jatorria duela mende askotakoa da, eta Zarauzko txakolina, Getariako Txakolina Jatorri Izendapenean sartuta, kalitate goreneko txakolintzat jotzen da.",
		es:"El Txakoli es un vino blanco fresco y ligero, suavemente espumoso y con una leve acidez, cuyo origen data de siglos atrás. El txakoli de Zarautz, incluido dentro de la Denominación de Origen de Txakoli de Getaria, está considerado como uno de los txakolis de mayor calidad.",
		en:"Txakoli is a fresh, lightweight white wine, sparkling and slightly tart, dating back centuries. Txakoli from Zarautz, part of the “Denominación de Origen Txakoli de Getaria” area, is considered one of the best quality in zone. ",
		fr:"Le Txakoli est un vin blanc, frais et léger, légèrement mousseux et acide, dont l’origine remonte à plusieurs siècles en arrière. Le txakoli de Zarautz, qui fait partie de l’Appellation d’Origine Txakoli de Getaria, est considéré comme l’un des txakolis de plus grande qualité."
	}],
	extra:[{
		eu:"<strong>Erreserba ezazu zure bisita gidatua:</strong><br/><br/><strong>Talaiberri txakolindegia</strong><br/>634 Errepide Nazionala<br/>Talaimendi auzoa<br/>Tel.: <a href='tel:943 132750'>943 132750</a><br/><a href='mailto:info@talaiberri.com'>info@talaiberri.com</a> / <a href='http://www.talaiberri.com' rel='external'>www.talaiberri.com</a><br/>Bisitak: ostiral eta larunbatetan 11:00etan (gainontzeko egunetan, 15 pertsonako taldeak kontsulta egin)<br/>Aldez aurretik ordua eskatu<br/>Hizkuntzak: Euskara, gaztelera, frantsesa eta ingelesa<br/><br/><strong>Rezabal txakolindegia</strong><br/>Asti auzoa<br/>Tel.: <a href='tel:943 580899'>943 580899</a><br/><a href='mailto:info@txakolirezabal.com'>info@txakolirezabal.com</a> / <a href='http://www.txakolirezabal.com' rel='external'>www.txakolirezabal.com</a><br/>Bisitak: larunbatetan 12:00etan (gainontzeko egunetan kontsulta egin)<br/>Gutxieneko taldea: 10 pertsona<br/>Aldez aurretik ordua eskatu<br/>Hizkuntzak: Euskara, gaztelera eta frantsesa",
		es:"<strong>Reserve su visita guiada:</strong><br/><br/><strong>Talaiberri txakolindegia</strong><br/>Crta Nacional 634<br/>Barrio Talaimendi<br/>Tel.: <a href='tel:943 132750'>943 132750</a><br/><a href='mailto:info@talaiberri.com'>info@talaiberri.com</a> / <a href='http://www.talaiberri.com' rel='external'>www.talaiberri.com</a><br/>Visitas: viernes y sábados a las 11:00h (resto de fechas grupos superiores a 15 personas consultar)<br/>(Siempre solicitar cita previa)<br/>Idiomas: Euskara, castellano, inglés y francés<br/><br/><strong>Rezabal txakolindegia</strong><br/>Bº Asti <br/>Tel.: <a href='tel:943 580899'>943 580899</a><br/><a href='mailto:info@txakolirezabal.com'>info@txakolirezabal.com</a> / <a href='http://www.txakolirezabal.com' rel='external'>www.txakolirezabal.com</a><br/>Visitas: sábados a las 12:00h (resto de fechas a consultar)<br/>Mínimo de 10 personas para visitas<br/>(Siempre solicitar cita previa)<br/>Idiomas: Euskara, castellano y francés",
		en:"<strong>Book your guided visit:</strong><br/><br/><strong>Talaiberri txakolindegia</strong><br/>634 National Road<br/>Talaimendi Quarter<br/>Tel.: <a href='tel:943 132750'>943 132750</a><br/><a href='mailto:info@talaiberri.com'>info@talaiberri.com</a> / <a href='http://www.talaiberri.com' rel='external'>www.talaiberri.com</a><br/>Visits: Fridays  and Saturdays at 11:00 (rest of the days, for groups over 15 people, please consult)<br/>Previous arrangement  necessary<br/>Languages: Euskara, Spanish, English and French<br/><br/><strong>Rezabal txakolindegia</strong><br/>Asti Quarter<br/>Tel.: <a href='tel:943 580899'>943 580899</a><br/><a href='mailto:info@txakolirezabal.com'>info@txakolirezabal.com</a> / <a href='http://www.txakolirezabal.com' rel='external'>www.txakolirezabal.com</a><br/>Visits: Saturdays at 12:00 (rest of the days please consult)<br/>Visits with  price arrangement minimum 10 people<br/>Previous arrangement necessary<br/>Languages: Euskara, Spanish and French",
		fr:"<strong>Réservez votre visite guidée:</strong><br/><br/><strong>Talaiberri txakolindegia</strong><br/>Route Nationale 634 <br/>Quartier Talaimendi <br/>Tel.: <a href='tel:943 132750'>943 132750</a><br/><a href='mailto:info@talaiberri.com'>info@talaiberri.com</a> / <a href='http://www.talaiberri.com' rel='external'>www.talaiberri.com</a><br/>Visites: vendredi et samedi  à  11h00 (pour les groupes de plus de 15 personnes, les autres jours à consulter)<br/>Visites sus rendez-vous<br/>Langues: Euskara, espagnole, anglaise et française<br/><br/><strong>Rezabal txakolindegia</strong><br/>Asti auzoa<br/>Tel.: <a href='tel:943 580899'>943 580899</a><br/><a href='mailto:info@txakolirezabal.com'>info@txakolirezabal.com</a> / <a href='http://www.txakolirezabal.com' rel='external'>www.txakolirezabal.com</a><br/>Visites: samedis à 12h00 (consulter autres dates )<br/>Pour les visites minimun de 10 personnes<br/>Visites sur rendez-vous<br/>Langues: Euskara, espagnole eta française"
	}],
	photos:['DSC_7027.jpg', 'DSC_7037.jpg', 'DSC_7040.jpg', 'DSC_7122.jpg']
	},
	{title:[{
		eu:"Malla harria",
		es:"Malla harria",
		en:"Malla harria",
		fr:"Malla harria"
	}],
	subtitle:[{
		eu:null,
		es:null,
		en:null,
		fr:null
	}],
	description:[{
		eu:"Hondartzaren ekialdean dago Mollarri uhartea, Talaimendi mendiaren azpian. Handik, herri osoaren ikuspegia dugu, baita Mollarri uhartearena ere; urpekaritzan aritzeko paradisua da Mollarri. Bada haitzulo ikaragarri bat, Katedrala. Uhartetxoetatik hurbil dago karga-habe zaharra. Kableetan oinarritutako aireko sistema baten bidez, meategi hurbiletako mea eramaten zuten hara.",
		es:"La isla de Mollarri está situada al este de la playa, bajo en monte Talaimendi. Desde ahí podremos divisar todo el paisaje de la población y la isla de Mollarri, paraíso para el submarinismo. Hay una cueva impresionante conocida como “La catedral”. Cerca de los islotes encontramos el antiguo cargadero al que se traía el mineral desde la minas cercanas mediante un sistema de cableado aéreo. ",
		en:"Mollarri island is situated at the east side of the beach, under Talaimendi mountain. We can see form there the whole town of Zarautz and Mollarri island, paradise for diving. There we can find an stunning cave known as “The cathedral”. Near two small islands we can find an ancient loading platform to which mineral was taken from some close mines using an air cable system.",
		fr:"L'ile de Mollarri est située à l‘est de la plage en dessous de  la montagne Talaimendi. D ‘ici, nous avons une vue panoramique de tout le paysage et l’ île de Mollarri, paradis pour la pratique de la plongée. Il y a une grotte connue comme  “ La cathédrale“. Prés   des rochers, se trouve l’ ancien lieu de chargement où l’on ammenait le mineret depuis les mines voisines en utilisant un système câbles aériens."
	}],
	extra:[{
		eu:null,
		es:null,
		en:null,
		fr:null
	}],
	photos:['mallarria01.jpg', 'mallarria02.jpg', 'mallarria03.jpg', 'mallarria04.jpg']
	},
	{title:[{
		eu:"Itsaso eta mendi arteko paseoak",
		es:"Paseos entre el mar y la montaña",
		en:"Sea and mountain trails",
		fr:"Promenade sur la mer et les montagnes"
	}],
	subtitle:[{
		eu:null,
		es:null,
		en:null,
		fr:null
	}],
	description:[{
		eu:"Itsaso ondotik abiatuta, zenbait ibilbide egin daitezke Zarautzen, natuarekin harreman zuzenean. Ezagunena eta ohikoena Zarauztik Getariarako joan-etorria da, eta Bizkaiko Golkoko brisa gozatzeko aukera ematen digu, itsaslabarren ertzean, pasealeku lau ezin ederrago batean. Zarauztar askok egunero egiten dute bide hori. Iñurritzako biotopoa eta Pagoetako basoa ere bisita daitzezke.",
		es:"Partiendo de la costa, en Zarautz hay varias rutas en contacto directo con la naturaleza. El más conocido y habitual es la ida y venida de Zarautz a Getaria, ya que nos brinda la ocasión de gozar con la brisa del Golfo de Bizkaia, en el filo del acantilado, en un hermosísimo paseo. Muchos zarauztarras lo hacen a diario. También se pueden visitar el biotopo de Iñurritza y el bosque de Pagoeta.",
		en:"Leaving from the shore, there are in Zarautz several routes in direct contact with nature. The best known and most usual is going and returning to Getaria, because we get the opportunity to enjoy the breeze of Bizkaia’s gulf, et the edge of the cliff, during a beautiful walk. Many people from Zarautz do it daily. You can also visit  the biotope of Iñurritza and the wood of Pagoeta. ",
		fr:"En partant de la côte, à  Zarautz il y a quelque itinéraires qui permettent d’être en contact avec la nature. Le plus connu et habituel est la promenade de Zarautz à Getaria, cette balade nous donne la possibilité de profiter de la brise marine du Golfe de Biscaye en longeant la falaise. De nombreux habitants de Zarautz le font tous les jours. On peut visiter aussi le biotope de  Iñurritza et la forêt  de Pagoeta."
	}],
	extra:[{
		eu:null,
		es:null,
		en:null,
		fr:null
	}],
	photos:['3697409173_8bc31b2220_b.jpg', '3698211748_a7a59764f4_b.jpg', '3698217940_594e71a047_b.jpg', 'eus_imagenes593a.jpg']
	}
];
//listen for detail links
$(".experienceLink").live("click", function() {
	selectedExperience = $(this).attr('data-experienceid');
	$('.expeImg').attr('src', 'img/esperientziak/'+experiencias[selectedExperience].photos[0]);
	var prev = selectedExperience - 1;
	if(prev == -1) prev = experiencias.length - 1;
	$('#prevLink').attr('data-experienceid', prev);
	var next = selectedExperience;
	next++;
	if(next == experiencias.length) next = 0;
	$('#nextLink').attr('data-experienceid', next);
	$('.expeTitle').html(experiencias[selectedExperience]['title'][0][lang]);
	$("#expeText").html("<p>"+experiencias[selectedExperience]['description'][0][lang]+"</p>");
    if(experiencias[selectedExperience]['subtitle'][0][lang] !== null){
    	$(".expeSubTitle").html("<p>"+experiencias[selectedExperience]['subtitle'][0][lang]+"</p>");
    }
    else{
    	$(".expeSubTitle").html("");
    }
    if(experiencias[selectedExperience]['extra'][0][lang] !== null){
    	$("#expeExtra").html("<p>"+experiencias[selectedExperience]['extra'][0][lang]+"</p>");
    }
    else{
    	$("#expeExtra").html("");
    }
});

//Listen for main page
$("#experienciasPage").live("pageinit", function() {
	$('.lExperiencias').html(_('lExperiencias').toUpperCase());
   // $('.lInfo').html(_('lInfo'));
 	$('.lListado').html(_('lListado'));
	//selectedExperience = 0;
	$('.expeImg').attr('src', 'img/esperientziak/'+experiencias[selectedExperience].photos[0]);
	var prev = selectedExperience - 1;
	if(prev == -1) prev = experiencias.length - 1;
	$('#prevLink').attr('data-experienceid', prev);
	var next = selectedExperience;
	next++;
	if(next == experiencias.length) next = 0;
	//ale
	$('#nextLink').attr('data-experienceid', next);
	$('.expeTitle').html(experiencias[selectedExperience]['title'][0][lang]);
    $("#expeText").html("<p>"+experiencias[selectedExperience]['description'][0][lang]+"</p>");
    if(experiencias[selectedExperience]['subtitle'][0][lang] !== null){
    	$(".expeSubTitle").html("<p>"+experiencias[selectedExperience]['subtitle'][0][lang]+"</p>");
    }
    else{
    	$(".expeSubTitle").html("");
    }
    if(experiencias[selectedExperience]['extra'][0][lang] !== null){
    	$("#expeExtra").html("<p>"+experiencias[selectedExperience]['extra'][0][lang]+"</p>");
    }
    else{
    	$("#expeExtra").html("");
    }
    resize_content('#expe');
});

$("#PagePhotoExpe").live("pageshow", function(prepage) {
	$('#photosView').show();
	$('#photo').hide();
	$('.lExperiencias').html(_('lExperiencias').toUpperCase());
	var item = experiencias[selectedExperience];
    $('.expeTitle').html(item['title'][0][lang]);
    var contentHTML = "";
    var i;
    for (i = 0; i < item.photos.length; i += 1) {
   		if(i!=0 && i%2==0){
    		contentHTML += "<br/>";
    	}
    	contentHTML += "<a href=\"#\" data-photoindex=\""+i+"\" class=\"expePhoto\">";
    	contentHTML += "<img src='img/esperientziak/"+item.photos[i]+"' width='45%'/></a>";
    }
    $("#photosView").html(contentHTML);
    resize_content('#expe');
});
$(".expePhoto").live("click", function() {
	var photoIndex = $(this).data('photoindex');
	var item = experiencias[selectedExperience];
	$('#photosView').hide();
	$('#photo').show();
	$("#backPhoto").attr('href', '#');
	$('#viewPhotoImg').attr('src', 'img/esperientziak/'+item.photos[photoIndex]);
});
$("#backPhoto").live("click", function(){
	if($('#photosView').is(':hidden')){
		$('#photo').hide();
		$('#photosView').show();
		$("#backPhoto").attr('href', 'experiencias.html');
	}
});

//Listen for main page
$("#expePageList").live("pageinit", function() {

	$('.lExperiencias').html(_('lExperiencias').toUpperCase());
	var contentHTML = "";
	var i;
	for(i=0; i<experiencias.length; i++){
		contentHTML += '<li><a href="experiencias.html" class="experienceLink" data-experienceid="'+i+'">';
		contentHTML += '<img src="img/esperientziak/'+experiencias[i].photos[0]+'" />';
		contentHTML += '<span class="boldInList blueTurq">'+experiencias[i]['title'][0][lang]+'</span>';
		contentHTML += '</a></li>';
	}
	$("#linksListExpe").append(contentHTML);
    $("#linksListExpe").listview("refresh");
	//altuera aldatu
	resize_content("#linksListExpe");
});




var map;
var marker;
var infowindow;
var watchID;

var markerComer;
var markerHotel;
var markerCourse;

function max_height(){
    var h = $('div[data-role="header"]').outerHeight(true);
    //var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('.contentMapa');//$('div[data-role="content"]');
    c.height(w-h);
   /* var c_h = c.height();
    //alert(c_h);
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;

    alert(c.height);
    if(c_h<c.get(0).scrollHeight){
        c.height(c.get(0).scrollHeight);
    }else{
        c.height(c_new);
    }
    alert(c.height);*/
}

function mapDormir(){
    var item = entries[selectedEntry];
    var latlng = undefined;
    if(currentPos != null){
        var currentLat = currentPos.coords.latitude;
        var currentLon = currentPos.coords.longitude;

        latlng = new google.maps.LatLng(currentLat, currentLon);
    }

    //Hotel point
    var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    var myOptions = {
      zoom: 13,
      center: point,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("mapDormir"), myOptions);

    if(currentPos != null){
        if(!marker){
            //create marker
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        }else{
            //move marker to new position
            marker.setPosition(latlng);
        }
    }


    //Hotel point
    if(item['dist'] != 0)  var info = (item['izena']+" (a "+item['dist']+" km)");
    else  var info = ("<div class='info'>"+item['izena']+"</div>");
   // var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    if(!markerHotel){
        //create marker
        markerHotel = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        markerHotel.setPosition(point);
    }
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(markerHotel, 'click', function() {
      infowindow.open(map,markerHotel);
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}


function mapComer(){
    if(category == 'carta') var item = comerCarta[selectedCarta];
    else  var item = comer[selectedComer];
    var latlng = undefined;
    if(currentPos != null){
        var currentLat = currentPos.coords.latitude;
        var currentLon = currentPos.coords.longitude;

        latlng = new google.maps.LatLng(currentLat, currentLon);
    }
     //Comer point
    var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    var myOptions = {
      zoom: 13,
      center: point,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("mapComer"), myOptions);
    if(currentPos != null){
        if(!marker){
            //create marker
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        }else{
            //move marker to new position
            marker.setPosition(latlng);
        }
    }


    //Comer point
    var info = item['izena'];
    //var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    if(!markerComer){
        //create marker
        markerComer = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        markerComer.setPosition(point);
    }
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(markerComer, 'click', function() {
      infowindow.open(map,markerComer);
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}

function mapsurf(){
    if(isShop){
        var item = shops[selectedShopEntry];
        var title = item.title;
    }else{
        var item = services[selectedServiceEntry];
        var title = item['title'][0][lang];
    }

    var latlng = undefined;
    if(currentPos != null){
        var currentLat = currentPos.coords.latitude;
        var currentLon = currentPos.coords.longitude;

        latlng = new google.maps.LatLng(currentLat, currentLon);
    }
    //Shop/Course point
    var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    var myOptions = {
        zoom: 13,
        center: point,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("mapCursos"), myOptions);
    if(currentPos != null){
        if(!marker){
            //create marker
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        }else{
            //move marker to new position
            marker.setPosition(latlng);
        }
    }

    //Shop/Course point
    var point = new google.maps.LatLng(item['lat'], item['lon']);//currentPos.coords.latitude, currentPos.coords.longitude);
    if(!markerCourse){
        //create marker
        markerCourse = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        markerCourse.setPosition(point);
    }
    var info = title;
    if(!infowindow){
        infowindow = new google.maps.InfoWindow({
            content: info
        });
    }else{
        infowindow.setContent(info);
    }
    google.maps.event.addListener(markerCourse, 'click', function() {
      infowindow.open(map,markerCourse);
    });

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        //get geoposition once
        //navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        //watch for geoposition change
        watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
    });
}


function geo_error(error){
    //comment
//    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function geo_success(position) {
 /*
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(10);

    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if(!marker){
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    }else{
        //move marker to new position
        marker.setPosition(point);
    }*/
}

function MercatorToLatLon(mercX, mercY) {
    var rMajor = 6378137; //Equatorial Radius, WGS84
    var shift  = Math.PI * rMajor;
    var lon    = mercX / shift * 180.0;
    var lat    = mercY / shift * 180.0;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0);
    return { 'lon': lon, 'lat': lat };
}

var comer = [];
var comerCarta = [];
var selectedComer = "";
var selectedCarta = "";
var category;

//listen for detail links
$(".contentLink").live("click", function() {
	category = $(this).data("category");
	if(category == 'carta'){
		selectedCarta = $(this).data("entryid");
	}
	else{
		selectedComer = $(this).data("entryid");
	}
});

//Listen for main page
$("#comerPageList").live("pageinit", function() {

	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	$('.lPintxos').find('[class="ui-btn-text"]').html(_("lPintxos"));
	$('.lCarta').find('[class="ui-btn-text"]').html(_("lCarta"));
	$('.lComer').html(_("lComer").toUpperCase());

	//var lang = window.localStorage.getItem("lang");
	$.ajax({
		url: "http://gurezarautz.net/gzapp/comer_precio.php?cat=nocart&lang="+lang,
		dataType: 'json',
		callbackParameter: 'callback',
		success: function(data, status) {
			var contentHTML = "";
			var j;
			var dist;
			var currentLat = 0;
			var currentLon = 0;
			if(currentPos != null){
				currentLat = currentPos.coords.latitude;
				currentLon = currentPos.coords.longitude;
			}
			var terraza;
			$.each(data, function(i,item){
				if(currentPos != null){
					dist = calcularDistancia(currentLat, currentLon, item['lat'], item['lon']);
				}
				else{
					dist = 0;
				}
				item['dist'] = dist;
				comer[i] = item;
				contentHTML += '<li><a href="comerDetalle.html" class="contentLink" data-entryid="'+i+'" data-category="nocarta">';
				contentHTML += '<img src="'+item['img']+'" />';
				contentHTML += '<span class="boldInList blueTurq">';
				if(dist != 0) contentHTML += item['izena']+" ("+dist+" km)";
				else contentHTML += item['izena'];
				contentHTML += "</span><br/>";

				//contentHTML += item['actividad']+"<br/>";
				contentHTML += "<span class='boldInList'>Tel:</span> "+item['tel']+"<br/>";
				if(item['terraza'] == 1) terraza = _('Si');
				else terraza = _('No');
				contentHTML += "<span class='boldInList'>"+_('lTerraza')+": </span>"+terraza;
				contentHTML += '</a></li>';
			});
			$("#linksListComer").append(contentHTML);
            $("#linksListComer").listview("refresh");
			//altuera aldatu
			resize_content("#linksListComer");
		},
		error: function(){
		//	alert('error');
		}
	});
});


//Listen for main page
$("#cartaPageList").live("pageinit", function() {

	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	$('.lPintxos').find('[class="ui-btn-text"]').html(_("lPintxos"));
	$('.lCarta').find('[class="ui-btn-text"]').html(_("lCarta"));
	$('.lComer').html(_("lComer").toUpperCase());

	//var lang = window.localStorage.getItem("lang");
	$.ajax({
		url: "http://gurezarautz.net/gzapp/comer_precio.php?cat=carta&lang="+lang,
		dataType: 'json',
		callbackParameter: 'callback',
		success: function(data, status) {
			var contentHTML = "";
			var j;
			var dist;
			var currentLat = 0;
			var currentLon = 0;
			if(currentPos != null){
				currentLat = currentPos.coords.latitude;
				currentLon = currentPos.coords.longitude;
			}
			var terraza;
			$.each(data, function(i,item){
				if(currentPos != null){
					dist = calcularDistancia(currentLat, currentLon, item['lat'], item['lon']);
				}
				else{
					dist = 0;
				}
				item['dist'] = dist;
				comerCarta[i] = item;
				contentHTML += '<li><a href="comerDetalle.html" class="contentLink" data-entryid="'+i+'" data-category="carta">';
				contentHTML += '<img src="'+item['img']+'" />';
				contentHTML += '<span class="boldInList blueTurq">';
				if(dist != 0) contentHTML += item['izena']+" ("+dist+" km)";
				else contentHTML += item['izena'];
				contentHTML += "</span><br/>";

				//contentHTML += item['actividad']+"<br/>";
				contentHTML += "<span class='boldInList'>Tel:</span> "+item['tel']+"<br/>";
				if(item['terraza'] == 1) terraza = _('Si');
				else terraza = _('No');
				contentHTML += "<span class='boldInList'>"+_('lTerraza')+": </span>"+terraza+"<br/>";
				if(item['carta'] != 0.00) contentHTML += "<span class='boldInList'>"+_('lMenuCarta')+": </span>"+item['carta']+" €";
				contentHTML += '</a></li>';

			});
			$("#linksListCarta").append(contentHTML);
            $("#linksListCarta").listview("refresh");
			//altuera aldatu
			resize_content("#linksListCarta");
		},
		error: function(){
		//	alert('error');
		}
	});
});

$("#PageDetalleComer").live("pageshow", function(prepage) {
    $('.lComer').html(_("lComer").toUpperCase());
    $('.lConsulta').html(_('lConsulta'));
    if(category == 'carta') var item = comerCarta[selectedCarta];
	else  var item = comer[selectedComer];

	var title = item['izena'];
	if(item['dist']!=0) title += ' ('+item['dist']+' km)';
	$('.Ctitle').html(title);
	$('#Cimg').attr('src', item['img']);
	if($('#Cimg').height() > 35){
		$('.top').height($('#Cimg').height());
	}
	$('#Ctel').attr('href', "tel:"+item['tel']);
	$('.tNum').html(item['tel']);
	$('.lMapa').html(_('lMapa'));

	$("#helb").html("<span class='lHelb bold'>"+_('lHelb')+": </span><br/>"+item['direccion']);

	var contentHTML = "";
	contentHTML += "<p><span class='turquesa bold'>"+_('lOptions')+"</span><br/>";
	if(item['terraza'] == 1) var terraza = _('Si');
	else var terraza = _('No');
	contentHTML += "&nbsp;&nbsp;"+_('lTerraza')+": "+terraza+"</p>";

	if(item['menu_dia'] != 0.00 || item['menu_finde'] != 0.00 || item['carta'] != 0.00){
		contentHTML += "<p><span class='turquesa bold'>"+_('lPrice')+"</span><br/>";
		if(item['menu_dia'] != 0.00) contentHTML += "&nbsp;&nbsp;"+_('lMenuDia')+": "+item['menu_dia']+" €<br/>";
		if(item['menu_finde'] != 0.00) contentHTML += "&nbsp;&nbsp;"+_('lMenuFin')+": "+item['menu_finde']+" €<br/>";
		if(item['carta'] != 0.00) contentHTML += "&nbsp;&nbsp;"+_('lMenuCarta')+": "+item['carta']+" €";
		contentHTML += '</p>';
	}

	if(item['cierre_sem'] != "" || item['cierre_vac'] != ""){
		contentHTML += "<p><span class='turquesa bold'>"+_('lAtsedenak')+"</span><br/>";
		if(item['cierre_sem'] != "") contentHTML += "&nbsp;&nbsp;"+_('lAtsedena')+": "+item['cierre_sem']+"<br/>";
		if(item['cierre_vac'] != "") contentHTML += "&nbsp;&nbsp;"+_('lOporrak')+": "+item['cierre_vac'];
		contentHTML += '</p>';
	}

    $("#cartaInfo").html(contentHTML);
  	//altuera aldatu
	resize_content("#entryTextComer");
});


$("#PageMapaComer").live("pageshow", function(prepage) {

	$(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": mapComer, other_params: "sensor=true&language=en"});


	$('.lComer').html(_("lComer").toUpperCase());
    if(category == 'carta') var item = comerCarta[selectedCarta];
	else  var item = comer[selectedComer];

	var title = item['izena'];
	if(item['dist']!=0) title += ' ('+item['dist']+' km)';
	$('#ServiceCTitle').html(title);
});



var entries = [];
var selectedEntry = "";


//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});

//Listen for main page
$("#dormirPageList").live("pageinit", function() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

	$('.lDormir').html(_("lDormir").toUpperCase());
	//var lang = window.localStorage.getItem("lang");
	$.ajax({
		url: "http://gurezarautz.net/gzapp/alojamientos_precio.php?lang="+lang,
		dataType: 'json',
		callbackParameter: 'callback',
		success: function(data, status) {
			var contentHTML = "";
			var j;
			var dist;
			var currentLat = 0;
			var currentLon = 0;
			if(currentPos != null){
				currentLat = currentPos.coords.latitude;
				currentLon = currentPos.coords.longitude;
			}
			$.each(data, function(i,item){
				if(currentPos != null){
					dist = calcularDistancia(currentLat, currentLon, item['lat'], item['lon']);
				}
				else{
					dist = 0;
				}
				item['dist'] = dist;
				entries[i] = item;
				contentHTML += '<li><a href="dormirDetalle.html" class="contentLink" data-entryid="'+i+'">';
				contentHTML += '<img src="'+item['img']+'" />';
				contentHTML += '<span class="boldInList blueTurq">'+item['izena']+'</span>';
				if(dist != 0) contentHTML += " ("+dist+" km)";
				contentHTML += '<br/>';
				contentHTML += item['actividad']/*.substr(0, (item['actividad'].length-1))*/;
				j = 0;
				while(j < item['categoria']){
					if(j==0) contentHTML += ' (';
					contentHTML += "*";
					j++;
					if(j==item['categoria']) contentHTML += ')';
				}
				contentHTML += '<br/>';
				contentHTML += "<span class='lPrice'>"+_('lPrice')+":</span> "+item['min']+" - "+item['max']+" €";
				contentHTML += '</a></li>';
			});
			$("#linksListDormir").append(contentHTML);
            $("#linksListDormir").listview("refresh");

			//altuera aldatu
			resize_content("#linksListDormir");
		},
		error: function(){
		//	alert('error');
		}
	});
});



$("#PageDetalleAloj").live("pageshow", function(prepage) {
	//$(window).unbind();
    $('.lDormir').html(_("lDormir").toUpperCase());
    $('.lConsulta').html(_('lConsulta'));
    var contentHTML = "";
    var item = entries[selectedEntry];

	var Htitle = item['izena']+' ';
	Htitle += item['actividad'];//.substr(0, (item['actividad'].length-1))+' ';
	j = 0;
	while(j < item['categoria']){
		Htitle += "*";
		j++;
	}
	if(item['dist'] != 0) Htitle += " ("+item['dist']+" km)";
	$('#Htitle').html(Htitle);
	$('#Himg').attr('src', item['img']);
	if($('#Himg').height() > 35){
		$('.top').height($('#Himg').height());
	}
	$('#Htel').attr('href', "tel:"+item['tel']);
	$('.tNum').html(item['tel']);
	$('.lMapa').html(_('lMapa'));

	contentHTML += "<p><span class='turquesa bold'>"+_('lTA')+"</span><br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHI')+": "+item['precio_ITA']+" €<br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHD')+": "+item['precio_DTA']+" €<br/>";
	if(item['precio_ATA'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lApartamento')+": "+item['precio_ATA']+" €<br/>";
	if(item['precio_desayuno_1'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lDesayuno')+": "+item['precio_desayuno_1']+" €<br/>";
	contentHTML += '</p>';

	contentHTML += "<p><span class='turquesa bold'>"+_('lTM')+"</span><br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHI')+": "+item['precio_ITM']+" €<br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHD')+": "+item['precio_DTM']+" €<br/>";
	if(item['precio_ATM'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lApartamento')+": "+item['precio_ATM']+" €<br/>";
	if(item['precio_desayuno_1'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lDesayuno')+": "+item['precio_desayuno_1']+" €<br/>";
	contentHTML += '</p>';

	contentHTML += "<p><span class='turquesa bold'>"+_('lTB')+"</span><br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHI')+": "+item['precio_ITB']+" €<br/>";
	contentHTML += "&nbsp;&nbsp;"+_('lHD')+": "+item['precio_DTB']+" €<br/>";
	if(item['precio_ATB'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lApartamento')+": "+item['precio_ATB']+" €<br/>";
	if(item['precio_desayuno_1'] != 0)	contentHTML += "&nbsp;&nbsp;"+_('lDesayuno')+": "+item['precio_desayuno_1']+" €<br/>";
	contentHTML += '</p>';

  	$("#temporadas",this).html(contentHTML);
  //altuera aldatu
	resize_content("#entryText");
});



$("#PageMapaAloj").live("pageshow", function(prepage) {
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e){
        max_height();
    });
    max_height();

    google.load("maps", "3.8", {"callback": mapDormir, other_params: "sensor=true&language=en"});

   	$('#backButton').attr('href', 'dormirDetalle.html');
	$('.lDormir').html(_("lDormir").toUpperCase());
	var item = entries[selectedEntry];
	var Htitle = item['izena']+' ';
	Htitle += item['actividad']/*.substr(0, (item['actividad'].length-1))*/+' ';
	j = 0;
	while(j < item['categoria']){
		Htitle += "*";
		j++;
	}
	if(item['dist']!=0) Htitle += ' ('+item['dist']+' km)';
	$('#ServiceTitle').html(Htitle);
});

//EUSKARA
var i18neu = {
	"noInternet": "Internet konexioa behar da aplikazioa erabiltzeo",
    "exit": "Irten",
    "noGPS":"Zure kokapena ikusi ahal izateko, aktibatu geolokalizazioa zure mugikorrean.",
    "ados":"Ados",
    "kokapena":"Kokapena",
    //Portada
    "lToday": "GAUR",
    "lTomorrow": "BIHAR",
    "lNext": "ETZI",
    "lPleamar":"Itsasgora",
    "lBajamar":"Itsasbehera",
    "lOlas":"Olatuak",
    "lTablaIkusi":"ikus taula",
    "lSurfPlaya":"Surfa eta Hondartza",
    "lExperiencias":"Esperientziak",
    "lGuiaUtil":"Gida erabilgarria",
    "lDormir":"Non lo egin",
    "lComer":"Non jan",
    "lMarcha":"Parrandan",
    //Agenda
    "lTime":"Ordua",
    //Dormir
    "lPrice":"Prezioa",
    "lMapa":"Mapa",
    "lTA":"Goi-denboraldia",
    "lTM":"Erdi-denboraldia",
    "lTB":"Behe-denboraldia",
    "lHI":"Banakako logela",
    "lHD":"Logela bikoitza",
    "lApartamento":"Apartamendua",
    "lDesayuno":"Gosaria",
    "lConsulta":"Prezioak orientazio gisa emanak dira. Kontsultatu prezioak establezimendu bakoitzarekin.",
    //Comer
    "lPintxos":"Pintxoak",
    "lCarta":"Jatetxeak",
    "lTerraza":"Terraza",
    "lHelb":"Helbidea",
    "lAtsedenak":"Atseden egunak",
    "lAtsedena":"Atseden eguna",
    "lOporrak":"Oporrak",
    "lMenuDia":"Lanegunetako menua",
    "lMenuFin":"Asteburutako menua",
    "lMenuCarta":"Karta",
    "lOptions":"Ezaugarriak",
    "Si":"Bai",
    "No":"Ez",
    //Experiencias
    "lInfo":"informazio gehiago",
    "lPhoto":"Argazkiak",
    "lListado":"Esperientzien zerrenda",
    //surf playa
    "lMarea":"Mareak",
    "lZonaSurf":"Surf-guneak",
    "lPlaya":"Hondartza",
    "lTemp":"Tenperatura",
    "lSpeed":"Haizearen abiadura",
    "lDir":"Haizearen norabidea",
    "lGust":"Haize-boladak",
    "lCursos":"Ikastaroak",
    "lAzalpen":"Azalpena",
    "lJardun":"Jardunbide egokiak",
    "lGalerna":"Galerna",
    "lMapanKokatu":"Mapan kokatu",
    "lHour":"Ordutegia",
    "lSchedule":"Egutegia",
    "lServicesBeach":"HONDARTZA, zerbitzuak",
    "leyenda":"* 0: H, 90: M,  180: I, 270: E",
    "nudos":"korapiloak"
};

//GAZTELERA
var i18nes = {
	"noInternet": "Para usar la aplicación es necesario tener acceso a Internet",
    "exit": "Salir",
    "noGPS":"Si quieres ver tu ubicación en el mapa, activa el GPS de tu móvil.",
    "ados":"Aceptar",
    "kokapena":"Ubicación",
    //Portada
    "lToday": "HOY",
    "lTomorrow": "MAÑANA",
    "lNext": "PASADO",
    "lPleamar":"Pleamar",
    "lBajamar":"Bajamar",
    "lOlas":"Olas",
    "lTablaIkusi":"ver tabla",
    "lSurfPlaya":"Surf & Playa",
    "lExperiencias":"Experiencias",
    "lGuiaUtil":"Guía útil",
    "lDormir":"Dormir",
    "lComer":"Comer",
    "lMarcha":"De marcha",
    //Agenda
    "lTime":"Hora",
    //Dormir
    "lPrice":"Precio",
    "lMapa":"Mapa",
    "lTA":"Temporada alta",
    "lTM":"Temporada media",
    "lTB":"Temporada baja",
    "lHI":"Habitación individual",
    "lHD":"Habitación doble",
    "lApartamento":"Apartamento",
    "lDesayuno":"Desayuno",
    "lConsulta":"Los precios tienen carácter orientativo.  Consultar precios con cada establecimiento.",
    //Comer
    "lPintxos":"Pintxos",
    "lCarta":"A la carta",
    "lTerraza":"Terraza",
    "lHelb":"Dirección",
    "lAtsedenak":"Cierres",
    "lAtsedena":"Cierre semanal",
    "lOporrak":"Cierre vacacional",
    "lMenuDia":"Menú del día",
    "lMenuFin":"Menú fin de semana",
    "lMenuCarta":"Carta",
    "lOptions":"Características",
    "Si":"Si",
    "No":"No",
    //Experiencias
    "lInfo":"más información",
    "lPhoto":"Fotos",
    "lListado":"Listado de experiencias",
    //surf playa
    "lMarea":"Mareas",
    "lZonaSurf":"Zonas Surf",
    "lPlaya":"Playa",
    "lTemp":"Temperatura",
    "lSpeed":"Velocidad viento",
    "lDir":"Dirección viento",
    "lGust":"Rachas viento",
    "lCursos":"Cursos",
    "lAzalpen":"Descripción",
    "lJardun":"Buenas prácticas",
    "lGalerna":"Galerna",
    "lMapanKokatu":"Ver en mapa",
    "lHour":"Horario",
    "lSchedule":"Calendario",
    "lServicesBeach":"PLAYA, servicios",
    "leyenda":"* 0: S, 90: O,  180: N, 270: E",
    "nudos":"nudos"
};

//INGELESA
var i18nen = {
	"noInternet": "Internet konexioa behar da aplikazioa erabiltzeo",
    "exit": "Exit",
    "noGPS":"Turn on the GPS of your cell phone, to view your position on the map.",
    "ados":"Acep",
    "kokapena":"Location",
    //Portada
    "lToday": "TODAY",
    "lTomorrow": "TOMORROW",
    "lNext": "NEXT",
    "lPleamar":"Tide high",
    "lBajamar":"Tide low",
    "lOlas":"Waves",
    "lTablaIkusi":"view table",
    "lSurfPlaya":"Beach & Surf",
    "lExperiencias":"Experiences",
    "lGuiaUtil":"City guide",
    "lDormir":"Lodging",
    "lComer":"Eating out",
    "lMarcha":"Going out",
    //Agenda
    "lTime":"Time",
    //Dormir
    "lPrice":"Price",
    "lMapa":"Map",
    "lTA":"High season",
    "lTM":"Mid season",
    "lTB":"Low season",
    "lHI":"Single room",
    "lHD":"Double room",
    "lApartamento":"Apartment",
    "lDesayuno":"Breakfast",
    "lConsulta":"The prices are just indicative. Contact the establishment to check the prices.",
    //Comer
    "lPintxos":"Tapas",
    "lCarta":"Restaurants",
    "lTerraza":"Terrace",
    "lHelb":"Address",
    "lAtsedenak":"Closed on",
    "lAtsedena":"Closed on",
    "lOporrak":"Holydays",
    "lMenuDia":"Working days menu",
    "lMenuFin":"Weekend menu",
    "lMenuCarta":"Carte",
    "lOptions":"Characteristics",
    "Si":"Yes",
    "No":"No",
    //Experiencias
    "lInfo":"more information",
    "lPhoto":"Photos",
    "lListado":"List of experiences",
    //surf playa
    "lMarea":"Tides",
    "lZonaSurf":"Surfing sites",
    "lPlaya":"Beach",
    "lTemp":"Temperature",
    "lSpeed":"Wind speed",
    "lDir":"Wind direction",
    "lGust":"Wind gusts",
    "lCursos":"Surfing lessons",
    "lAzalpen":"Description",
    "lJardun":"Good",
    "lGalerna":"Gale",
    "lMapanKokatu":"View on map",
    "lHour":"Hour",
    "lSchedule":"Schedule",
    "lServicesBeach":"BEACH, services",
    "leyenda":"* 0: S, 90: W,  180: N, 270: E",
    "nudos":"knots"
};

//FRANTSESA
var i18nfr = {
	"noInternet": "Internet konexioa behar da aplikazioa erabiltzeo",
    "exit": "Sortie",
    "noGPS":"Allumez le GPS de votre téléphone cellulaire, pour afficher votre position sur la carte",
    "ados":"Accepter",
    "kokapena":"Emplacement",
    //Portada
    "lToday": "AUJOURD'HUI",
    "lTomorrow": "DEMAIN",
    "lNext": "SUIVANT",
    "lPleamar":"Marée haute",
    "lBajamar":"Marée basse",
    "lOlas":"Vagues",
    "lTablaIkusi":"voir cadre",
    "lSurfPlaya":"Surf et Plage",
    "lExperiencias":"Expériences",
    "lGuiaUtil":"Guide utile",
    "lDormir":"Dormir",
    "lComer":"Oû manger",
    "lMarcha":"Sortir",
    //Agenda
    "lTime":"Temps",
    //Dormir
    "lPrice":"Prix",
    "lMapa":"Carte",
    "lTA":"Haute saison",
    "lTM":"Moyenne Saison",
    "lTB":"Basse saison",
    "lHI":"Chambre individuelle",
    "lHD":"Chambre double",
    "lApartamento":"Studio",
    "lDesayuno":"Petit déjeuner",
    "lConsulta":"Les prix ne sont donc qu’indicatifs. Consultez les prix avec chaque établissement.",
    //Comer
    "lPintxos":"Vins",
    "lCarta":"À la carte",
    "lTerraza":"Terrasse",
    "lHelb":"Addresse",
    "lAtsedenak":"Jour de fermeture",
    "lAtsedena":"Jour de fermeture",
    "lOporrak":"Vacances",
    "lMenuDia":"Menu de la semaine",
    "lMenuFin":"Menu week-end",
    "lMenuCarta":"À la carte",
    "lOptions":"Caractéristiques",
    "Si":"Oui",
    "No":"Non",
    //Experiencias
    "lInfo":"plus d’information",
    "lPhoto":"Les photos",
    "lListado":"Liste des expériences",
    //surf playa
    "lMarea":"Marées",
    "lZonaSurf":"Espace surf",
    "lPlaya":"Plage",
    "lTemp":"Température",
    "lSpeed":"Vitess du vent",
    "lDir":"Direction du vent",
    "lGust":"Rafales",
    "lCursos":"Stages de surf",
    "lAzalpen":"Description",
    "lJardun":"Bonnes pratiques",
    "lGalerna":"Coup de vent",
    "lMapanKokatu":"Voir a la carte",
    "lHour":"Heures",
    "lSchedule":"Calendrier",
    "lServicesBeach":"PLAGE, services",
    "leyenda":"* 0: S, 90: O,  180: N, 270: E",
    "nudos":"noeuds"
};

function _(s){
	if(window.localStorage.getItem("lang") == null){
		lang = 'eu';
	}
	else{	   
		lang = window.localStorage.getItem("lang");
	}   
	if(lang == 'eu'){
		if (typeof(i18neu)!='undefined' && i18neu[s]) {
	        return i18neu[s];
	  	}
	}
	else if(lang == 'es'){
		if (typeof(i18nes)!='undefined' && i18nes[s]) {
	        return i18nes[s];
	  	}
	}
	else if(lang == 'en'){
		if (typeof(i18nen)!='undefined' && i18nen[s]) {
	        return i18nen[s];
	  	}
	}
	else if(lang == 'fr'){
		if (typeof(i18nfr)!='undefined' && i18nfr[s]) {
	        return i18nfr[s];
	  	}
	}
	return s;
}

function changeLanguage(){
//	$(".lToday").html(_('lToday'));
}
