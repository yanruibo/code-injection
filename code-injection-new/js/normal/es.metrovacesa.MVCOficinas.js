













	  	$(function(){
			var combo1 = '<option value="Tiempo">Duración</option><option value="1 Día">1 Día</option>', combo2 = '<option value="1 Hora">1 Hora</option>';
			for (var i=2; i<91;i++) { 
				combo1 += '<option value="'+i+' Días">'+i+' Días</option>';
			}
			for (var i=2; i<25;i++) {
				combo2 += '<option value="'+i+' Horas">'+i+' Horas</option>';
			}
			$("#dias").html(combo1);
			$("#horas").html(combo2);
			 var fecha = new Date();
		  $('#inicio').mobiscroll().date({
			   startYear: fecha.getFullYear(),
			   endYear: fecha.getFullYear() + 2,
			  invalid: { daysOfWeek: [0], daysOfMonth: ['1/1', '12/24', '12/25'] },
			  theme: 'ios',
			  lang: 'es',
			  display: 'modal',
			  animate: 'pop',
			  mode: 'scroller',
			  dateOrder: 'Ddd Myy',
			  dateFormat: 'dd/mm/yy',
			  width:70
		  });
		  $('#hora').mobiscroll().time({
			  theme: 'ios',
			  lang: 'es',
			  display: 'modal',
			  animate: 'pop',
			  mode: 'scroller',
			  width:90
		  });
		  $('#duracion').mobiscroll().select({
        theme: 'ios',
        group: true,
        display: 'modal',
		animate: 'pop',
        mode: 'scroller',
        inputClass: 'i-txt',
        label: 'Duración',
        groupLabel: 'Período',
		width:90
    });   
	  });





	var directionsDisplay2;
var directionsService2 = new google.maps.DirectionsService();
var mapita;
var centro1, centro2, icono;
switch(window.parent.idParque) {
	case 1:
	centro1 = 40.49861261022738;
	centro2 = -3.6692984283110945;
	break;
	
	case 3:
	centro1 = 40.477049;
	centro2= -3.635561;
	break;
	
	case 4:
	centro1 =40.522869;
	centro2=-3.891306;
	break;
	
	case 5:
	centro1 =40.451957;
	centro2=-3.691201;
	break;
	
	case 6:
	centro1 =40.511504;
	centro2=-3.679292;
	break;
	
	case 7:
	centro1 =40.46328;
	centro2=-3.621688;
	break;
	
	case 8:
	centro1 =40.499937;
	centro2=-3.660484;
	break;
	
	case 9:
	centro1 =40.4511;
	centro2=-3.693271;
	break;
}
switch(window.parent.category) {
	case 1:
	icono = 'ico_restaurantes.png';
	break;
	case 2:
	icono = 'ico_deportes.png';
	break;
	case 3:
	icono = 'ico_compras.png';
	break;
	case 4:
	icono = 'ico_cajeros.png';
	break;
	case 5:
	icono = 'ico_escuelas.png';
	break;
	case 6:
	icono = 'ico_biblio.png';
	break;
	case 7:
	icono = 'ico_farmacias.png';
	break;
	case 8:
	icono = 'ico_gasolineras.png';
	break;
	case 9:
	icono = 'ico_hospitales.png';
	break;
	case 10:
	icono = 'ico_hoteles.png';
	break;
	case 11:
	icono = 'ico_itv.png';
	break;
	case 12:
	icono = 'ico_copas.png';
	break;
	case 13:
	icono = 'ico_parafarm.png';
	break;
	case 14:
	icono = 'ico_taller.png';
	break;
}
var c1 = window.parent.coord1,
	c2 = window.parent.coord2;
function initialization() {
  directionsDisplay2 = new google.maps.DirectionsRenderer();
  var centro = new google.maps.LatLng(centro1,centro2);
  var mapOptions = {
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: centro,
  }
  mapita = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  calcRoute();
}

function calcRoute() {
  var start = new google.maps.LatLng(centro1,centro2);
  var end = new google.maps.LatLng(c1,c2);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.WALKING,
	unitSystem: google.maps.DirectionsUnitSystem.METRIC
  };
  directionsService2.route(request, function(resultado, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		var metroLogo = new google.maps.MarkerImage('images/metro.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(32, 32),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0,32));
	  //null, null, null, new google.maps.Size(32,32));
	  var markDefault = new google.maps.MarkerImage('images/'+icono,
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(29, 43),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0,21));
	  //null, null, null, new google.maps.Size(16,26));*/
		 var directions = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                var myOptions = {
                    navigationControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
				var metro = new google.maps.Marker({
            position: start,
            map: mapita,
            draggable: true,
            icon:metroLogo

        });
				var salida = new google.maps.Marker({
            position: end,
            map: mapita,
            draggable: true,
            icon:markDefault

        });
				directions.setMap(mapita);
      			directions.setDirections(resultado);				
    }
  });
}
    

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var centro1, centro2;
switch(window.parent.idParque) {
	case 1:
	centro1 = 40.49861261022738;
	centro2 = -3.6692984283110945;
	break;
	
	case 3:
	centro1 = 40.477049;
	centro2= -3.635561;
	break;
	
	case 4:
	centro1 =40.522869;
	centro2=-3.891306;
	break;
	
	case 5:
	centro1 =40.451957;
	centro2=-3.691201;
	break;
	
	case 6:
	centro1 =40.511504;
	centro2=-3.679292;
	break;
	
	case 7:
	centro1 =40.46328;
	centro2=-3.621688;
	break;
	
	case 8:
	centro1 =40.499937;
	centro2=-3.660484;
	break;
	
	case 9:
	centro1 =40.4511;
	centro2=-3.693271;
	break;
}
var c1 = window.parent.coord1,
	c2 = window.parent.coord2;
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var centro = new google.maps.LatLng(centro1,centro2);
  var mapOptions = {
    zoom:9,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: centro,
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  
  calcRoute();
}

function calcRoute() {
  var start = new google.maps.LatLng(centro1,centro2);
  var end = new google.maps.LatLng(c1,c2);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING,
	unitSystem: google.maps.DirectionsUnitSystem.METRIC
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		var metroLogo = new google.maps.MarkerImage('images/metro.svg',
      // This marker is 20 pixels wide by 32 pixels tall.
      //new google.maps.Size(32, 32),
      // The origin for this image is 0,0.
      //new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      //new google.maps.Point(0,32));
	  null, null, null, new google.maps.Size(32,32));
	  var markDefault = new google.maps.MarkerImage('images/marker.svg',
      // This marker is 20 pixels wide by 32 pixels tall.
      //new google.maps.Size(32, 32),
      // The origin for this image is 0,0.
      //new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      //new google.maps.Point(0,32));
	  null, null, null, new google.maps.Size(16,26));
		 var directions = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                var myOptions = {
                    navigationControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
				var metro = new google.maps.Marker({
            position: start,
            map: map,
            draggable: true,
            icon:metroLogo

        });
				var salida = new google.maps.Marker({
            position: end,
            map: map,
            draggable: true,
            icon:markDefault

        });
				directions.setMap(map);
      			directions.setDirections(result);
    }
  });
}

$(document).on("pageinit", function(e){

	$("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").addClass('slidemenu_btn');
	var sm = $($("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").data('slidemenu'));
	sm.addClass('slidemenu');

	$(document).on("swipeleft swiperight",".ui-page-active", function(e){
		console.log('b');
		e.stopImmediatePropagation();
		e.preventDefault();
		slidemenu(sm, sm.data('slideopen'));
	});

	$(document).on("click", ".ui-page-active :jqmData(slidemenu)", function(e) {
		slidemenu(sm, sm.data('slideopen'));
		e.stopImmediatePropagation();
		e.preventDefault();
		sm.height($(".ui-page-active").height());
		$(".ui-btn-right").hide();
		/*$(".ui-content").bind("touchmove", function(event){
     event.preventDefault();    
});*/
		sm.css('overflow-x','hidden !important');
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		slidemenu(sm, true);
	});

	$(window).on('resize', function(e){
		if (sm.data('slideopen')) {
			console.log('sd');
			sm.css('top','0 px');
			sm.css('width', '240px');
			sm.height($(".ui-content").height);
			$(":jqmData(role='page')").css('right', '-240px');
		}
	});
	
	$(window).scroll(function() {
		if (sm.data('slideopen')) {
			sm.css('top','0 px');
		}
	});

});

function slidemenu(sm, only_close) {
	sm.height(viewport().height);
	if (!sm.data('slideopen') && !only_close) {
		sm.show().animate({width: '240px', avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(".ui-page-active").css('left', '240px');
		sm.data('slideopen', true);
		if ($(".ui-page-active :jqmData(role='header')").data('position') == 'fixed') {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '250px');
		} else {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '10px');
		}
	} else {
		sm.animate({width: '0px', avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide(); $(".ui-btn-right").show();});
		$(".ui-page-active").css('left', '0px');
		sm.data('slideopen', false);
		$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '0px');
		 
		
	}
	return false;
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
}

var idParque,nameParque,publi_ids=[],publi_urls=[];var idNews,indexNoticia;var idServ,indexServ,indexPlace;var coord1,coord2,category,ejecutar,centro1,centro2,category,icono;var directionsDisplay;var map;var parques=["Vía Norte","Alfonso XI","Alvento","Alvia","Cadagua","Las Tablas","Puerta de las Naciones","Sanchinarro","Sollube"];var pictureSource;var destinationType;var photo;var anuncioData;var subido;function getMap(b,a){coord1=b;coord2=a;ejecutar=0;$.mobile.changePage("#goomap",{transition:"slide"},100)}function GoogleMap(){switch(idParque){case 1:centro1=40.49861261022738;centro2=-3.6692984283110945;break;case 3:centro1=40.477049;centro2=-3.635561;break;case 4:centro1=40.522869;centro2=-3.891306;break;case 5:centro1=40.451957;centro2=-3.691201;break;case 6:centro1=40.511504;centro2=-3.679292;break;case 7:centro1=40.46328;centro2=-3.621688;break;case 8:centro1=40.499937;centro2=-3.660484;break;case 9:centro1=40.4511;centro2=-3.693271;break}directionsDisplay=new google.maps.DirectionsRenderer();var e=new google.maps.LatLng(centro1,centro2);var b={zoom:9,mapTypeId:google.maps.MapTypeId.ROADMAP,center:e,};map=new google.maps.Map(document.getElementById("map_canvas"),b);var d=new google.maps.DirectionsService();var f=new google.maps.LatLng(centro1,centro2);var a=new google.maps.LatLng(coord1,coord2);var c={origin:f,destination:a,travelMode:google.maps.TravelMode.DRIVING,unitSystem:google.maps.DirectionsUnitSystem.METRIC};d.route(c,function(g,i){if(i==google.maps.DirectionsStatus.OK){var l=new google.maps.MarkerImage("images/metro.png",new google.maps.Size(32,32),new google.maps.Point(0,0),new google.maps.Point(0,32));var m=new google.maps.MarkerImage("images/marker.png",new google.maps.Size(17,26),new google.maps.Point(0,0),new google.maps.Point(17,26));var n=new google.maps.DirectionsRenderer({suppressMarkers:true});var h={navigationControl:true,mapTypeControl:false,scaleControl:false,mapTypeId:google.maps.MapTypeId.ROADMAP};var k=new google.maps.Marker({position:f,map:map,draggable:true,icon:l});var j=new google.maps.Marker({position:a,map:map,draggable:true,icon:m});n.setMap(map);n.setDirections(g)}})}function calcRoute(){}function placeMap(c,b,a){coord1=c;coord2=b;category=a;ejecutar=1;$.mobile.changePage("#goomap",{transition:"slide"},100)}function GooglePlace(){switch(idParque){case 1:centro1=40.49861261022738;centro2=-3.6692984283110945;break;case 3:centro1=40.477049;centro2=-3.635561;break;case 4:centro1=40.522869;centro2=-3.891306;break;case 5:centro1=40.451957;centro2=-3.691201;break;case 6:centro1=40.511504;centro2=-3.679292;break;case 7:centro1=40.46328;centro2=-3.621688;break;case 8:centro1=40.499937;centro2=-3.660484;break;case 9:centro1=40.4511;centro2=-3.693271;break}var c=new google.maps.DirectionsRenderer();var b=new google.maps.LatLng(centro1,centro2);var a={zoom:10,mapTypeId:google.maps.MapTypeId.ROADMAP,center:b,};mapita=new google.maps.Map(document.getElementById("map_canvas"),a);calcRoute2()}function calcRoute2(){switch(category){case 1:icono="ico_restaurantes.png";break;case 2:icono="ico_deportes.png";break;case 3:icono="ico_compras.png";break;case 4:icono="ico_cajeros.png";break;case 5:icono="ico_escuelas.png";break;case 6:icono="ico_biblio.png";break;case 7:icono="ico_farmacias.png";break;case 8:icono="ico_gasolineras.png";break;case 9:icono="ico_hospitales.png";break;case 10:icono="ico_hoteles.png";break;case 11:icono="ico_itv.png";break;case 12:icono="ico_copas.png";break;case 13:icono="ico_parafarm.png";break;case 14:icono="ico_taller.png";break}var c=new google.maps.DirectionsService();var d=new google.maps.LatLng(centro1,centro2);var a=new google.maps.LatLng(coord1,coord2);var b={origin:d,destination:a,travelMode:google.maps.TravelMode.WALKING,unitSystem:google.maps.DirectionsUnitSystem.METRIC};c.route(b,function(k,f){if(f==google.maps.DirectionsStatus.OK){var i=new google.maps.MarkerImage("images/metro.png",new google.maps.Size(32,32),new google.maps.Point(0,0),new google.maps.Point(0,32));var j=new google.maps.MarkerImage("images/"+icono,new google.maps.Size(29,43),new google.maps.Point(0,0),new google.maps.Point(0,21));var l=new google.maps.DirectionsRenderer({suppressMarkers:true});var e={navigationControl:true,mapTypeControl:false,scaleControl:false,mapTypeId:google.maps.MapTypeId.ROADMAP};var h=new google.maps.Marker({position:d,map:mapita,draggable:true,icon:i});var g=new google.maps.Marker({position:a,map:mapita,draggable:true,icon:j});l.setMap(mapita);l.setDirections(k)}})}function goParque(c){function a(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){window.localStorage.setItem("planos",this.responseText)}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var b=new XMLHttpRequest();b.onreadystatechange=a;b.open("GET","http://www.parquevianorte.es/WS/WSGetDescargasTransportes.aspx?nIdParque="+c+"&nIdIdioma=1");idParque=c;$.mobile.changePage("#home_menu",{transition:"fade"},100)}function goNews(b,a){idNews=b;indexNoticia=a;$.mobile.changePage("#noticia",{transition:"slide"},100)}function goService(b,a){idServ=b;indexServ=a;$.mobile.changePage("#service",{transition:"slide"},100)}function goAnuncio(a){indexAnun=a;$.mobile.changePage("#anuncio",{transition:"slide"},100)}function goPlace(a){indexPlace=a;$.mobile.changePage("#aPlace",{transition:"slide"},100)}function openTransport(tipo){var planos=window.localStorage.getItem("planos"),descargasTransportes=eval("("+planos+")"),descargas=descargasTransportes.DescargasTransportes,html="";for(var i=0;i<descargas.length;i++){if(descargas[i].nIdTipoTransporte==tipo){html+='<li><a href="javascript:getTransport('+descargas[i].nIdDescarga+')" data-rel="popup">'+descargas[i].cNombreDescarga+"</a></li>"}}$("#popupTransport ul").html(html);$("#popupTransport ul").listview("refresh");$("#popupTransport").popup("open",{transition:"flip"})}function getTransport(id){function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")"),descargas=json.UrlDescarga;url=descargas.cUrl;$(".goTransport").attr("href","http://www.parquevianorte.es"+url);$("#popupTransport").popup("close",{transition:"flip"});$("#popupTransport").on({popupafterclose:function(){setTimeout(function(){$("#popupConfirm").popup("open",{transition:"flip"})},100)}})}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetUrlDescarga.aspx?nIdDescarga="+id)}function closeConfirm(){$("#popupConfirm").popup("close",{transition:"flip"})}function openDownloads(id){function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")"),descargas=json.DescargasServicios,url=descargas[0].cUrl;$("a.goOferta").attr("href","http://www.parquevianorte.es"+url);$("#popupDownloads").popup("open",{transition:"flip"})}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetDescargasOfertas.aspx?nIdParque="+idParque+"&nIdOferta="+id)}function closeOferta(){$("#popupDownloads").popup("close",{transition:"flip"})}function openDirectorio(c,a,b){$("#popupDirectorio p").html(c);$(".directorio_llamada").attr("href","tel:0034"+a);$(".directorio_email").attr("href","mailto:"+b);$("#popupDirectorio").popup("open",{transition:"flip"})}function composeNews(idNoticia,titular,index){function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var thumbs=json.UrlImagenNoticia;var image=thumbs.cUrl;if(image!=""){html='<div class="news_preview"><div class="actualidad_thumb"><img src="http://www.parquevianorte.es/'+String(image)+'" width="100" />'}else{html='<div class="news_preview"><div class="actualidad_thumb">'}html+='</div><div class="prev_titulo"><h2>'+titular+'</h2></div><div class="boton_ver"><a href="javascript:goNews('+idNoticia+","+index+')" data-transition="slide">Ver noticia</a></div></div>';$("#listado_actualidad").append(html)}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetUrlImagenNoticia.aspx?nIdNoticia="+idNoticia+"&nIdIdioma=1&Thumbnail=si")}function composeService(idServicio,nombreServicio,index){function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var thumbs=json.UrlLogoServicio;var image=thumbs.cUrl;if(image!=""){html='<li><a href="javascript:goService('+idServicio+","+index+')" data-transition="slide"><img src="http://www.parquevianorte.com'+String(image)+'">'+nombreServicio+"</a></li>"}else{html='<li><a href="javascript:goService('+idServicio+","+index+')" data-transition="slide">'+nombreServicio+"</a></li>"}$("#listado_servicios").append(html);$("#listado_servicios").listview("refresh");window.localStorage.setItem(nombreServicio,image)}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/wsgetUrlLogoServicio.aspx?nIdServicioInquilino="+idServicio)}function hacerReserva(){var e=$("#reserva").val(),g=$("#inicio").val(),a=$("#hora").val(),d=$("#duracion").val(),c,f;switch(idParque){case 1:c="egomez@metrovacesa.es";f="Vía Norte";break;case 3:c="lguerrero@metrovacesa.es";f="Alvento";break;case 4:c="mretamosa@metrovacesa.es";f="Alvia";break;case 5:c="aferreira@metrovacesa.es";f="Cadagua";break;case 6:c="mretamosa@metrovacesa.es";f="Las Tablas";break;case 7:c="lguerrero@metrovacesa.es";f="Puerta de las Naciones";break;case 8:c="egomez@metrovacesa.es";f="Sanchinarro";break;case 9:c="aferreira@metrovacesa.es";f="Sollube";break}if(g=="Fecha"||a=="Hora"||d=="Duración"){navigator.notification.alert("Debe rellenar todos los campos",false,"MVC Oficinas","Aceptar")}else{if(e==1){e="Aparcamiento"}else{e=="Salas"}var b="Fecha: "+g+"\nHora: "+a+"\nDuración: "+d;window.open("mailto:"+c+"?subject=Reserva%20de%20"+e+"%20en%20"+f+"&body="+encodeURIComponent(b))}}function checkNetwork(){if(!window.navigator.onLine){$.mobile.changePage("offline.html",{transition:"flip"},100)}else{return true}}$(document).bind("mobileinit",function(){$.mobile.loadingMessage="Cargando";$.mobile.pageLoaderrorMessage="Error Cargando Página";$.mobile.allowCrossDomainPages=true;$.support.cors=true;jQuery.fx.inteveral=10;$("div:jqmData(role='page')").live("pageshow",function(){if($.mobile.activePage.attr("id")!="offline"){checkNetwork()}});$("div:jqmData(role='page')").live("pagebeforeshow",function(){$(".parque").html(parques[idParque-1])});$("#home_menu").live("pagebeforeshow",function(){$(".nombreParque small").html(parques[idParque-1])});$("#disponibilidad").live("pagebeforeshow",function(){});$("#goomap").live("pagebeforeshow",function(){$("#cargando_route").css("display","inline")});$("#goomap").live("pageshow",function(){$("#map_canvas").html("");$("#map_canvas").height(screen.height*0.8);$("#cargando_route").css("display","inline");if(ejecutar==0){GoogleMap()}else{if(ejecutar==1){GooglePlace()}}setTimeout(function(){$("#cargando_route").css("display","none")},5000)});$("#publi").live("pagebeforeshow",function(){$("#galeria3 ul").html("");$("#position3").html("");publi_ids=[];publi_urls=[];$("#ver_web a").attr("href","#")});$("#publi").live("pageshow",function(){function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")"),anuncios=json.datos,listado_publi="",posiciones="";if(anuncios.length==0){listado_publi='<li style="display:block"><div><img src="images/no_publi.jpg" width="320" height="480" /></div></li>';posiciones='<em class="on">•</em>';$("#ver_web a").attr("href","http://mtec-conectados.com/anuncios/app_anuncioslist.php")}else{if(anuncios.length==1){listado_publi='<li style="display:block"><div><img src="http://mtec-conectados.com/anuncios/anuncios/'+anuncios[0].img_anuncio+'" width="'+ancho+'" /></div></li>';posiciones='<em class="on">•</em>';if(anuncios[0].url!=""){$("#ver_web a").attr("href",anuncios[0].url)}}else{$("#ver_web a").attr("src",anuncios[0].url);for(var i=0;i<anuncios.length;i++){listado_publi+='<li style="display:block"><div><img src="http://mtec-conectados.com/anuncios/anuncios/'+anuncios[i].img_anuncio+'" width="'+ancho+'" /></div></li>';publi_ids.push(anuncios[i].IdAnuncio);publi_urls.push(anuncios[i].url);if(i==0){posiciones+='<em class="on">•</em>'}else{posiciones+="<em>•</em>"}}}}$("#ver_web a").button();$("#galeria3 ul").html(listado_publi);$("#position3").html(posiciones);var slider=new Swipe(document.getElementById("galeria3"),{startSlide:0,speed:400,auto:9000,callback:function(e,pos){var i=bullets.length;while(i--){bullets[i].className=" "}bullets[pos].className="on"}}),bullets=document.getElementById("position3").getElementsByTagName("em");$("#ver_web a").button();$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest(),dpi=window.devicePixelRatio,height=screen.height,width=screen.width,resol,ancho;if(dpi==1&&320<=width<=480&&426<=height<=469){resol="LDPI";ancho=320}else{if(dpi==1&&320<=width<=480&&470<=height<=639){resol="MDPI";ancho=320}else{if(dpi>1&&320<=width<=480&&470<=height<=639){resol="RETINA";ancho=320}else{if(dpi>1&&480<=width<=719&&640<=height<=959){resol="HDPI";ancho=240}else{resol="IPHONE5";ancho=320}}}}ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://mtec-conectados.com/anuncios/peticion.php?metodo=GetAnuncios&nIdCentro=12&resol="+resol)});$("#disponibilidad").live("pageshow",function(){});$("#transportes").live("pagebeforeshow",function(){$("#popupTransport ul").html("");$(".lanzaderas").html("");$(".metro").html("");$(".cercanias").html("");$(".autobuses").html("");$(".ligero").html("")});$("#transportes").live("pageshow",function(){$(".profile_info small").html(parques[idParque-1]);$.mobile.showPageLoadingMsg();function ajaxLanzadera(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")"),data=json.DataLanzadera,lanzaderaOptions="";for(var i=0;i<data.length;i++){lanzaderaOptions+='<li><a href="javascript:openTransport(1)" data-rel="popup"><img src="css/images/bus-36.png" class="ui-li-icon" /><h3>'+data[i].cOrigen+"</h3><p>"+data[i].cInfoAdicional+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>'}$(".lanzaderas").html(lanzaderaOptions);$(".lanzaderas").listview("refresh")}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var lanzadera=new XMLHttpRequest();lanzadera.onreadystatechange=ajaxLanzadera;lanzadera.open("GET","http://www.parquevianorte.es/WS/WSGetDataLanzadera.aspx?nIdParque="+idParque+"&nIdIdioma=1");function ajaxTransportes(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")"),data=json.DataTransportes,metro="",autobuses="",cercanias="",ligero="";for(var i=0;i<data.length;i++){switch(data[i].nIdTipoTransporte){case 2:metro+='<li><a href="javascript:openTransport(2)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+"</h3><p>"+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';break;case 3:autobuses+='<li><a href="javascript:openTransport(3)" data-rel="popup"><img src="css/images/bus-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+"</h3><p>"+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';break;case 4:cercanias+='<li><a href="javascript:openTransport(4)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+"</h3><p>"+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';break;case 5:ligero+='<li><a href="javascript:openTransport(5)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+"</h3><p>"+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';break}}$(".metro").html(metro);$(".metro").listview("refresh");$(".autobuses").html(autobuses);$(".autobuses").listview("refresh");$(".cercanias").html(cercanias);$(".cercanias").listview("refresh");$(".ligero").html(ligero);$(".ligero").listview("refresh");$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var transportes=new XMLHttpRequest();transportes.onreadystatechange=ajaxTransportes;transportes.open("GET","http://www.parquevianorte.es/WS/WSGetDataTransportes.aspx?nIdParque="+idParque)});$("#actualidad").live("pagebeforeshow",function(){$("#listado_actualidad").html("")});$("#actualidad").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");window.localStorage.setItem("news",this.responseText);var noticias=json.Noticias;if(noticias.length==0){var park=parques[idParque-1];noContent("NOTICIAS DE ACTUALIDAD",park)}else{for(var i=0;i<noticias.length;i++){composeNews(noticias[i].nIdNoticia,noticias[i].cTitulo,i)}}$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetNoticias.aspx?nIdIdioma=1&nIdParque="+idParque)});$("#noticia").live("pagebeforeshow",function(){$("#noticia_content").html("")});$("#noticia").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var thumbs=json.UrlImagenNoticia;var image=thumbs.cUrl;var datos=window.localStorage.getItem("news");var allnews=eval("("+datos+")");var simplenews=allnews.Noticias;if(!image){html='<div class="noticia_imagen"></div><div class="noticia_titulo"><h2>'+simplenews[indexNoticia].cTitulo+'</h2></div><div class="noticia_entradilla"><p>'+simplenews[indexNoticia].cEntradilla+'</p></div><div class="noticia_cuerpo"><p>'+simplenews[indexNoticia].cCuerpo+"</p></div>"}else{html='<div class="noticia_imagen"><img src="http://www.parquevianorte.es'+String(image)+'" width="150" /></div><div class="noticia_titulo"><h2>'+simplenews[indexNoticia].cTitulo+'</h2></div><div class="noticia_entradilla"><p>'+simplenews[indexNoticia].cEntradilla+'</p></div><div class="noticia_cuerpo"><p>'+simplenews[indexNoticia].cCuerpo+"</p></div>"}$("#noticia_content").html(html);$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetUrlImagenNoticia.aspx?nIdNoticia="+idNews+"&nIdIdioma=1&Thumbnail=no")});$("#servicios").live("pagebeforeshow",function(){$("#listado_servicios").html("")});$("#servicios").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");window.localStorage.setItem("services",this.responseText);var servicios=json.Servicios;if(servicios.length==0){var park=parques[idParque-1];noContent("LISTADO DE SERVICIOS",park)}else{for(var i=0;i<servicios.length;i++){composeService(servicios[i].nIdServicioInquilino,servicios[i].cNombre,i)}}$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/wsgetServicios.aspx?nIdParque="+idParque+"&nIdIdioma=1")});$("#service").live("pagebeforeshow",function(){$(".service_logo").html("");$("#galeria_list").html("");$("#position").html("");$(".service_name").html("");$(".service_desc").html("");$(".service_link").html("");$(".service_phones").html("")});$("#service").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var galeria=json.GaleriaServicios;var html="";var dots="";for(var i=0;i<galeria.length;i++){if(galeria.length<=1){html+='<li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li><li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li>';dots+='<em class="on">•</em><em>•</em>'}else{html+='<li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li>';if(i==0){dots+='<em class="on">•</em>'}else{dots+="<em>•</em>"}}}$("#galeria_list").html(html);$("#position").html(dots);$.mobile.hidePageLoadingMsg();var slider=new Swipe(document.getElementById("galeria"),{startSlide:0,speed:400,auto:5000,callback:function(e,pos){var i=bullets.length;while(i--){bullets[i].className=" "}bullets[pos].className="on"}}),bullets=document.getElementById("position").getElementsByTagName("em")}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/wsgetGaleriaServicios.aspx?nIdParque="+idParque+"&nIdIdioma=1&nIdServicioInquilino="+idServ);var info=window.localStorage.getItem("services");var infoData=eval("("+info+")");var data=infoData.Servicios;$(".service_logo").html('<img src="http://www.parquevianorte.com'+window.localStorage.getItem(data[indexServ].cNombre)+'" width="51">');$(".service_name").html(data[indexServ].cNombre);var texto=data[indexServ].cDescripcion,newtext=texto.replace(/\\r/gi,"<br>");$(".service_desc").html(newtext);$(".service_link").html('<a href="'+data[indexServ].cUrlWeb+'" target="_blank" rel="external">'+data[indexServ].cUrlWeb+"</a>");var telefono_texto=data[indexServ].cTelefono,phones=telefono_texto.split("/"),phone_btn="",service_email=data[indexServ].cEmail,email='<a href="mailto:'+service_email+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>';for(var i=0;i<phones.length;i++){phones[i]=phones[i].replace(/ /g,"");phone_btn+='<a href="tel:0034'+phones[i]+'" data-role="button" data-icon="phone" data-theme="a" class="phone_btn"> Llamar: '+phones[i]+"</a>"}$(".service_phones").html(phone_btn);$(".service_mail").html(email);$(".phone_btn").button();$(".service_mail a").button()});$("#tablon").live("pagebeforeshow",function(){$("#listado_tablon").html("")});$("#tablon").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);window.localStorage.setItem("tablon",this.responseText);var json=eval("("+this.responseText+")"),tablones=json.DataTablon,html="";if(tablones.length==0){var park=parques[idParque-1];noContent("ANUNCIOS",park)}else{for(var i=0;i<tablones.length;i++){html+='<li><a href="javascript:goAnuncio('+i+')" data-transition="slide"><h2>'+tablones[i].cTitulo+"</h2><p>"+tablones[i].cDescripcion+'</p><span class="ui-li-count">'+tablones[i].cTipoAnuncio+"</span></a></li>"}$("#listado_tablon").html(html);$("#listado_tablon").listview("refresh")}$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetTablon.aspx?nIdParque=1&nIdIdioma=1")});$("#anuncio").live("pagebeforeshow",function(){$("#galeria2 ul").html("");$("#position2").html("");$(".anuncio_titulo h4").html("");$(".anuncio_texto p").html("");$("#anunciante").html("");$("#empresa").html("");$("#anuncio_link").html("");if($(".precio").length){$(".precio").remove()}$("#anuncio_comunicacion").html("")});$("#anuncio").live("pageshow",function(){var tablon=window.localStorage.getItem("tablon"),json=eval("("+tablon+")"),anuncios=json.DataTablon;listado_galeria="",posiciones="";if((anuncios[indexAnun].cUrlImg2=="")&&(anuncios[indexAnun].cUrlImg3=="")){listado_galeria='<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li>';posiciones='<em class="on">•</em><em>•</em>'}else{if(anuncios[indexAnun].cUrlImg3==""){listado_galeria='<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg2+'" width="150" /></div></li>';posiciones='<em class="on">•</em><em>•</em>'}else{if(anuncios[indexAnun].cUrlImg2==""){listado_galeria='<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg3+'" width="150" /></div></li>';posiciones='<em class="on">•</em><em>•</em>'}else{listado_galeria='<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg2+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg3+'" width="150" /></div></li>';posiciones='<em class="on">•</em><em>•</em><em>•</em>'}}}$("#galeria2 ul").html(listado_galeria);$("#position2").html(posiciones);$(".anuncio_titulo h4").html(anuncios[indexAnun].cTitulo);$(".anuncio_texto p").html(anuncios[indexAnun].cDescripcion);$("#anunciante").html(anuncios[indexAnun].cNombreAnunciante);$("#empresa").html(anuncios[indexAnun].cEmpresa);$("#anuncio_link").html('<a href="'+anuncios[indexAnun].cLink+'" rel="external" target="_blank">'+anuncios[indexAnun].cLink+"</a>");if(anuncios[indexAnun].mPrecio&&anuncios[indexAnun].mPrecio!=""){$(".anunciante table").append('<tr class="precio"><td class="table_label">Precio:</td><td class="table_data" id="anuncio_precio">'+anuncios[indexAnun].mPrecio+" &euro;</td></tr>")}$("#anuncio_comunicacion").html('<a href="tel:0034'+anuncios[indexAnun].cTelefonoAnunciante+'" data-role="button" data-icon="phone" data-theme="a"> Llamar: '+anuncios[indexAnun].cTelefonoAnunciante+'</a><a href="mailto:'+anuncios[indexAnun].cEmailAnunciante+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>');$("#anuncio_comunicacion a").button();var slider=new Swipe(document.getElementById("galeria2"),{startSlide:0,speed:2000,auto:5000,callback:function(e,pos){var i=bullets.length;while(i--){bullets[i].className=" "}bullets[pos].className="on"}}),bullets=document.getElementById("position2").getElementsByTagName("em")});$("#ofertas").live("pagebeforeshow",function(){$("#listado_ofertas").html("")});$("#ofertas").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var ofertas=json.Ofertas,html="",inicio,fin;if(ofertas.length==0){var park=parques[idParque-1];noContent("OFERTAS",park)}else{for(var i=0;i<ofertas.length;i++){inicio=parseInt(ofertas[i].dFechaInicio.substring(6,19));fin=parseInt(ofertas[i].dFechaFin.substring(6,19));if(ofertas[i].cUrl!=""){html+='<div class="news_preview"><div class="actualidad_thumb"><img src="http://www.parquevianorte.es/'+ofertas[i].cUrl+'" width="91" /></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+"</p></div></div>"}else{html+='<div class="news_preview"><div class="actualidad_thumb"></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+"</p></div></div>"}}$("#listado_ofertas").html(html)}$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetOfertas.aspx?nIdParque="+idParque)});$("#directorio").live("pagebeforeshow",function(){$("#listado_directorio ul").html("")});$("#directorio").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");var contactos=json.Contactos,html="";if(contactos.length==0){var park=parques[idParque-1];noContent("INFORMACIÓN EN EL DIRECTORIO",park)}else{for(var i=0;i<contactos.length;i++){var phone=contactos[i].cTelefono,telefono=phone.replace(/ /g,"");html+='<li><a href="#">'+contactos[i].cEmpresa+'</a><a href="javascript:openDirectorio(&quot;'+contactos[i].cEmpresa+"&quot;,"+telefono+",&quot;"+contactos[i].cEmail+'&quot;)"></a></li>'}$("#listado_directorio ul").html(html);$("#listado_directorio ul").listview("refresh")}$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.es/WS/WSGetContactos.aspx?nIdParque="+idParque)});$("#places").live("pagebeforeshow",function(){$("#listado_places ul").html("")});$("#places").live("pageshow",function(){$.mobile.showPageLoadingMsg();function ajaxHandler(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");window.localStorage.setItem("places",this.responseText);var places=json.DataPlaces,html="",icon;for(var i=0;i<places.length;i++){switch(places[i].nIdCategoria){case 1:icon="ico_restaurantes_big.png";break;case 2:icon="ico_deportes_big.png";break;case 3:icon="ico_compras_big.png";break;case 4:icon="ico_cajeros_big.png";break;case 5:icon="ico_escuelas_big.png";break;case 6:icon="ico_biblio_big.png";break;case 7:icon="ico_farmacias_big.png";break;case 8:icon="ico_gasolineras_big.png";break;case 9:icon="ico_hospitales_big.png";break;case 10:icon="ico_hoteles_big.png";break;case 11:icon="ico_itv_big.png";break;case 12:icon="ico_copas_big.png";break;case 13:icon="ico_parafarm_big.png";break;case 14:icon="ico_taller_big.png";break}html+='<li><a href="javascript:goPlace('+i+')" data-transition="slide"><img src="images/'+icon+'" width="30" height="46" /><h2>'+places[i].cPlace+"</h2></a></li>"}$("#listado_places ul").html(html);$("#listado_places ul").listview("refresh");$.mobile.hidePageLoadingMsg()}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("GET","http://www.parquevianorte.com/ws/wsgetplaces.aspx?nidparque="+idParque)});$("#aPlace").live("pagebeforeshow",function(){$(".number em").html("");$(".place_titulo h4").html("");$(".place_texto p").html("");$("#categoria").html("");$("#place_direccion").html("");$("#place_link").html("");$("#place_comunicacion").html("")});$("#aPlace").live("pageshow",function(){var json=window.localStorage.getItem("places"),data=eval("("+json+")"),aPlace=data.DataPlaces;$(".number em").html(aPlace[indexPlace].numComentarios);$(".place_titulo h4").html(aPlace[indexPlace].cPlace);$(".place_texto p").html(aPlace[indexPlace].cDescripcion);$("#categoria").html(aPlace[indexPlace].cCategoria);$("#place_direccion").html(aPlace[indexPlace].cDireccion);$("#place_link").html('<a href="'+aPlace[indexPlace].cLink+'" data-rel="external" target="_blank">'+aPlace[indexPlace].cLink+"</a>");if(aPlace[indexPlace].cCoordenadasGPS!=""){$("#place_comunicacion").append('<a href="javascript:placeMap('+aPlace[indexPlace].cCoordenadasGPS+","+aPlace[indexPlace].nIdCategoria+')" data-rel="popup" data-role="button" data-theme="a">Ver mapa</a>')}if(aPlace[indexPlace].cEmail!=""){$("#place_comunicacion").append('<a href="mailto:'+aPlace[indexPlace].cEmail+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>')}if(aPlace[indexPlace].cTelefono!=""){$("#place_comunicacion").append('<a href="tel:0034'+aPlace[indexPlace].cTelefono+'" data-role="button" data-icon="phone" data-theme="a"> Llamar: '+aPlace[indexPlace].cTelefono+"</a>")}$("#place_comunicacion a").button()});$("#reservas").live("pagebeforeshow",function(){$("#reserva").html('<option value="1" selected>Aparcamiento</option>');$("#inicio").val("Fecha de Entrada");$("#hora").val("Hora");$("#duracion").val("Duración");$("#telefonoReservas").html("")});$("#reservas").live("pageshow",function(){var contacto,telefono;switch(idParque){case 1:contacto="Emilio Gómez";telefono="914184149";break;case 3:contacto="Luis Guerrero";telefono="917213522";break;case 4:contacto="Miguel Ángel Retamosa";telefono="914183096";break;case 5:contacto="Ángel Ferreira";telefono="914183074";break;case 6:contacto="Miguel Ángel Retamosa";telefono="914183096";break;case 7:contacto="Luis Guerrero";telefono="917213522";break;case 8:contacto="Emilio Gómez";telefono="914184149";break;case 9:contacto="Ángel Ferreira";telefono="914183074";break}$("#telefonoReservas").html(' <a href="tel:0034'+telefono+'" data-role="button" id="reservasLlamar" data-icon="phone" data-theme="a">'+contacto+"</a>");$("#reservasLlamar").button();if(idParque==1||idParque==9){$("#reserva").html('<option value="1">Aparcamiento</option><option value="2">Salas</option>')}else{$("#reserva").html('<option value="1">Aparcamiento</option>')}$("#reserva").selectmenu()});$("#subirTablon").live("pagebeforeshow",function(){$("#miNombre").attr("value","");$("#miEmail").attr("value","");$("#miTelefono").attr("value","");$("#miEmpresa").attr("value","");$("#miCategoria").attr("value","3");$("#miTipo").attr("value","1");$("#miTitulo").attr("value","");$("#miDescripcion").attr("value","");$("#miPrecio").attr("value","");$("#miLink").attr("value","")});$("#subirTablon").live("pageshow",function(){$("#form_first").validate({rules:{nombre:{required:true,minlength:6},email:{required:true,email:true},titulo:{required:true},descripcion:{required:true},agree:"required"},messages:{nombre:{required:"Introduce tu Nombre",minlength:"Tu nombre debe tener al menos 6 caracteres"},titulo:"Introduce un t&iacute;tulo",descripcion:"Describe el anuncio",email:"Introduce un email v&aacute;lido",agree:"Debes aceptar nuestros t&eacute;rminos y condiciones"},submitHandler:function(form){var datosPersonales=[$("#miNombre").attr("value"),$("#miEmail").attr("value"),$("#miTelefono").attr("value"),$("#miEmpresa").attr("value")],datosAnuncio=[$("#miCategoria").attr("value"),$("#miTipo").attr("value"),$("#miTitulo").attr("value"),$("#miDescripcion").attr("value"),$("#miPrecio").attr("value"),$("#miLink").attr("value")];sendTablon(datosPersonales,datosAnuncio)}})})});function onLoad(){document.addEventListener("deviceready",onDeviceReady,false);window.localStorage.setItem("Image1","");window.localStorage.setItem("Image2","");window.localStorage.setItem("Image3","")}function onDeviceReady(){pictureSource=navigator.camera.PictureSourceType;destinationType=navigator.camera.DestinationType}function doNothing(){return true}function goMenuPpal(){window.localStorage.setItem("Image1","");window.localStorage.setItem("Image2","");window.localStorage.setItem("Image3","");$.mobile.changePage("#home_menu",{transition:"flip"},100)}function noContent(b,a){navigator.notification.alert("En estos momentos, no hay "+b+" en "+a,doNothing,"MVC Oficinas","Aceptar")}function reintentar(){if(!window.navigator.onLine){navigator.notification.alert("No hay conexión.",doNothing,"MVC Oficinas","Aceptar")}else{$.mobile.changePage("index.html",{transition:"flip"},100)}}function onPhotoDataSuccess(a){var b=window.localStorage.getItem("image");switch(b){case"1":console.log(a);$("#imagen1").attr("src",a);window.localStorage.setItem("Image1",a);break;case"2":$("#imagen2").attr("src",a);window.localStorage.setItem("Image2",a);break;case"3":$("#imagen3").attr("src",a);window.localStorage.setItem("Image3",a);break}}function uploadPhoto(c,b){var a=new FileUploadOptions();a.fileKey="cUrlImg";a.fileName=b+"-"+c.substr(c.lastIndexOf("/")+1);a.mimeType="image/jpeg";a.chunkedMode=false;var d=new FileTransfer();d.upload(c,"http://mtec-conectados.com/anuncio/archivo.php",win,fail,a)}function win(a){console.log("Code = "+a.responseCode);console.log("Response = "+a.response);console.log("Sent = "+a.bytesSent)}function fail(a){alert("An error has occurred: Code = "+a.code)}function okComposer(a){console.log(a)}function onFail(a){console.log("Failed because: "+a)}function seleccionarImagen(a){window.localStorage.setItem("image",a);navigator.camera.getPicture(onPhotoDataSuccess,onFail,{quality:40,destinationType:destinationType.FILE_URI,sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,encodingType:Camera.EncodingType.JPEG,targetWidth:300,targetHeight:300})}function sendTablon(personal,anuncio){var completeMail=personal[1],codename=completeMail.replace(/\W+/g,"-");console.log(codename);var foto1="",foto2="",foto3="",cUrlImg1="",cUrlImg2="",cUrlImg3="";if(window.localStorage.getItem("Image1")!=""){foto1=window.localStorage.getItem("Image1");cUrlImg1=codename+"-"+foto1.substr(foto1.lastIndexOf("/")+1)}if(window.localStorage.getItem("Image2")!=""){foto2=window.localStorage.getItem("Image2");cUrlImg2=codename+"-"+foto2.substr(foto2.lastIndexOf("/")+1)}if(window.localStorage.getItem("Image3")!=""){foto3=window.localStorage.getItem("Image3");cUrlImg3=codename+"-"+foto3.substr(foto3.lastIndexOf("/")+1)}anuncioData='{"Empresa":"'+personal[3]+'","IdCategoria":"'+anuncio[0]+'","IdtipoAnuncio":"'+anuncio[1]+'","cUrlImg1":"'+cUrlImg1+'","cUrlImg2":"'+cUrlImg2+'","cUrlImg3":"'+cUrlImg3+'","Precio":"'+anuncio[4]+'","Link":"'+anuncio[5]+'","NombreAnunciante":"'+personal[0]+'","TelefonoAnunciante":"'+personal[2]+'","EmailAnunciante":"'+personal[1]+'","Titulo":"'+anuncio[2]+'","Descripcion":"'+anuncio[3]+'"}';function ajaxHandler(){switch(this.readyState){case this.OPENED:this.setRequestHeader("Content-type","application/x-www-form-urlencoded");this.setRequestHeader("Pragma","no-cache");this.setRequestHeader("Cache-Control","no-cache");this.send(anuncioData);break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText);var json=eval("("+this.responseText+")");subido=json.received;console.log(subido);if(subido=="ok"){navigator.notification.alert("El anuncio se ha enviado y está pendiente de aprobación. Muchas gracias.",goMenuPpal,"MVC Oficinas","Aceptar")}else{navigator.notification.alert("Ha habido un problema. Inténtelo más tarde.",doNothing,"MVC Oficinas","Aceptar")}}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var ajax=new XMLHttpRequest();ajax.onreadystatechange=ajaxHandler;ajax.open("POST","http://www.mtec-conectados.com/anuncio/alta.php",true);for(var i=1;i<4;i++){if(window.localStorage.getItem("Image"+i)!=""){var shot=window.localStorage.getItem("Image"+i);uploadPhoto(shot,codename)}}};

// JavaScript Document
var idParque,
	nameParque,
	publi_ids = [],
	publi_urls = [];
var idNews,
	indexNoticia;
var idServ,
	indexServ,
	indexPlace;
var coord1,
	coord2,
	category,
	ejecutar,
	centro1,
	centro2,
	category,
	icono;
var directionsDisplay;
var map;
var parques = ["Vía Norte", "Alfonso XI", "Alvento", "Alvia", "Cadagua", "Las Tablas", "Puerta de las Naciones", "Sanchinarro", "Sollube"];

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var photo;
var anuncioData;
var subido;
function getMap(c1,c2) {
	coord1 = c1;
	coord2 = c2;
	ejecutar = 0;
	$.mobile.changePage("#goomap",{transition:"slide"},100);
}
function GoogleMap() {
	switch(idParque) {
	case 1:
	centro1 = 40.49861261022738;
	centro2 = -3.6692984283110945;
	break;
	
	case 3:
	centro1 = 40.477049;
	centro2= -3.635561;
	break;
	
	case 4:
	centro1 =40.522869;
	centro2=-3.891306;
	break;
	
	case 5:
	centro1 =40.451957;
	centro2=-3.691201;
	break;
	
	case 6:
	centro1 =40.511504;
	centro2=-3.679292;
	break;
	
	case 7:
	centro1 =40.46328;
	centro2=-3.621688;
	break;
	
	case 8:
	centro1 =40.499937;
	centro2=-3.660484;
	break;
	
	case 9:
	centro1 =40.4511;
	centro2=-3.693271;
	break;
}
  directionsDisplay = new google.maps.DirectionsRenderer();
  var centro = new google.maps.LatLng(centro1,centro2);
  var mapOptions = {
    zoom:9,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: centro,
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  
  var directionsService = new google.maps.DirectionsService();
  var start = new google.maps.LatLng(centro1,centro2);
  var end = new google.maps.LatLng(coord1,coord2);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING,
	unitSystem: google.maps.DirectionsUnitSystem.METRIC
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		var metroLogo = new google.maps.MarkerImage('images/metro.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(32, 32),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0,32));
	  //null, null, null, new google.maps.Size(32,32));
	  var markDefault = new google.maps.MarkerImage('images/marker.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(17, 26),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(17,26));
	  //null, null, null, new google.maps.Size(16,26));
		 var directions = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                var myOptions = {
                    navigationControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
				var metro = new google.maps.Marker({
            position: start,
            map: map,
            draggable: true,
            icon:metroLogo

        });
				var salida = new google.maps.Marker({
            position: end,
            map: map,
            draggable: true,
            icon:markDefault

        });
				directions.setMap(map);
      			directions.setDirections(result);
    }
  });
}
function calcRoute() {

}
function placeMap(c1,c2,cat) {
	coord1 = c1;
	coord2 = c2;
	category = cat;
	ejecutar = 1;
	$.mobile.changePage("#goomap",{transition:"slide"},100);
}

function GooglePlace() {
	switch(idParque) {
	case 1:
	centro1 = 40.49861261022738;
	centro2 = -3.6692984283110945;
	break;
	
	case 3:
	centro1 = 40.477049;
	centro2= -3.635561;
	break;
	
	case 4:
	centro1 =40.522869;
	centro2=-3.891306;
	break;
	
	case 5:
	centro1 =40.451957;
	centro2=-3.691201;
	break;
	
	case 6:
	centro1 =40.511504;
	centro2=-3.679292;
	break;
	
	case 7:
	centro1 =40.46328;
	centro2=-3.621688;
	break;
	
	case 8:
	centro1 =40.499937;
	centro2=-3.660484;
	break;
	
	case 9:
	centro1 =40.4511;
	centro2=-3.693271;
	break;
}
  var directionsDisplay2 = new google.maps.DirectionsRenderer();
  var centro = new google.maps.LatLng(centro1,centro2);
  var mapOptions = {
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: centro,
  }
  mapita = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  calcRoute2();
}

function calcRoute2() {
	switch(category) {
	case 1:
	icono = 'ico_restaurantes.png';
	break;
	case 2:
	icono = 'ico_deportes.png';
	break;
	case 3:
	icono = 'ico_compras.png';
	break;
	case 4:
	icono = 'ico_cajeros.png';
	break;
	case 5:
	icono = 'ico_escuelas.png';
	break;
	case 6:
	icono = 'ico_biblio.png';
	break;
	case 7:
	icono = 'ico_farmacias.png';
	break;
	case 8:
	icono = 'ico_gasolineras.png';
	break;
	case 9:
	icono = 'ico_hospitales.png';
	break;
	case 10:
	icono = 'ico_hoteles.png';
	break;
	case 11:
	icono = 'ico_itv.png';
	break;
	case 12:
	icono = 'ico_copas.png';
	break;
	case 13:
	icono = 'ico_parafarm.png';
	break;
	case 14:
	icono = 'ico_taller.png';
	break;
}
var directionsService2 = new google.maps.DirectionsService();
  var start = new google.maps.LatLng(centro1,centro2);
  var end = new google.maps.LatLng(coord1,coord2);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.WALKING,
	unitSystem: google.maps.DirectionsUnitSystem.METRIC
  };
  directionsService2.route(request, function(resultado, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		var metroLogo = new google.maps.MarkerImage('images/metro.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(32, 32),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0,32));
	  //null, null, null, new google.maps.Size(32,32));
	  var markDefault = new google.maps.MarkerImage('images/'+icono,
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(29, 43),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0,21));
	  //null, null, null, new google.maps.Size(16,26));*/
		 var directions = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                var myOptions = {
                    navigationControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
				var metro = new google.maps.Marker({
            position: start,
            map: mapita,
            draggable: true,
            icon:metroLogo

        });
				var salida = new google.maps.Marker({
            position: end,
            map: mapita,
            draggable: true,
            icon:markDefault

        });
				directions.setMap(mapita);
      			directions.setDirections(resultado);				
    }
  });
}


function goParque(id) {
	function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										window.localStorage.setItem("planos",this.responseText);																						
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET","http://www.parquevianorte.es/WS/WSGetDescargasTransportes.aspx?nIdParque="+id+"&nIdIdioma=1");
	idParque = id;
	$.mobile.changePage("#home_menu", {transition:"fade"}, 100);
}

function goNews(id,index) {
	idNews = id;
	indexNoticia = index;
	$.mobile.changePage("#noticia", {transition:"slide"}, 100);
}

function goService(id,index) {
	idServ = id;
	indexServ = index;
	$.mobile.changePage("#service", {transition:"slide"}, 100);
}
function goAnuncio(index) {
	indexAnun = index;
	$.mobile.changePage("#anuncio", {transition:"slide"}, 100);
}
function goPlace(index) {
	indexPlace = index;
	$.mobile.changePage("#aPlace", {transition:"slide"}, 100);
}

function openTransport(tipo) {
	var planos = window.localStorage.getItem("planos"),
		descargasTransportes = eval('('+planos+')'),
		descargas = descargasTransportes.DescargasTransportes,
		html = '';
		for (var i=0;i<descargas.length;i++) {									
			if(descargas[i].nIdTipoTransporte == tipo) {
			html += '<li><a href="javascript:getTransport('+descargas[i].nIdDescarga+')" data-rel="popup">'+descargas[i].cNombreDescarga+'</a></li>';
		}
		}
		$("#popupTransport ul").html(html);
		$("#popupTransport ul").listview('refresh');
		$("#popupTransport").popup('open', {transition:"flip"});
}
function getTransport (id) {
	function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) {
										console.log(this.responseText); 
											var json = eval('('+this.responseText+')'),
											descargas = json.UrlDescarga;
											url = descargas.cUrl;
											$(".goTransport").attr('href','http://www.parquevianorte.es'+url);
											$("#popupTransport").popup('close', {transition:"flip"});
											$( '#popupTransport' ).on({
        										popupafterclose: function() {
            										setTimeout( function(){ $( '#popupConfirm' ).popup( 'open', {transition:'flip'} ) }, 100 );
        										}
    										});
																																
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET","http://www.parquevianorte.es/WS/WSGetUrlDescarga.aspx?nIdDescarga="+id);
}
function closeConfirm() {
	$( '#popupConfirm' ).popup( 'close', {transition:'flip'} );
}
function openDownloads(id) {
	function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										console.log(this.responseText);
										var json = eval('('+this.responseText+')'),
											descargas = json.DescargasServicios,
											url = descargas[0].cUrl;
											$("a.goOferta").attr("href", "http://www.parquevianorte.es"+url);
										 $( "#popupDownloads" ).popup( "open", {transition:"flip"} )											
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetDescargasOfertas.aspx?nIdParque="+idParque+"&nIdOferta="+id);
}
function closeOferta () {
	 $( "#popupDownloads" ).popup( "close", {transition:"flip"} )
}
function openDirectorio(nombre,telefono,email) {
	$("#popupDirectorio p").html(nombre);
	$(".directorio_llamada").attr("href","tel:0034"+telefono);
	$(".directorio_email").attr("href","mailto:"+email);
	$( "#popupDirectorio" ).popup( "open", {transition:"flip"} );
}

function composeNews(idNoticia,titular,index) {
	function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										var thumbs = json.UrlImagenNoticia;
										var image =thumbs.cUrl;
										if (image != "") { html = '<div class="news_preview"><div class="actualidad_thumb"><img src="http://www.parquevianorte.es/'+String(image)+'" width="100" />';} else {html = '<div class="news_preview"><div class="actualidad_thumb">';}
										html+='</div><div class="prev_titulo"><h2>'+titular+'</h2></div><div class="boton_ver"><a href="javascript:goNews('+idNoticia+','+index+')" data-transition="slide">Ver noticia</a></div></div>';
										$("#listado_actualidad").append(html);													
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetUrlImagenNoticia.aspx?nIdNoticia="+idNoticia+"&nIdIdioma=1&Thumbnail=si");
}// End composeNews

function composeService(idServicio,nombreServicio,index) {
	function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;                                   
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										var thumbs = json.UrlLogoServicio;
										var image =thumbs.cUrl;
										if (image != "") { html = '<li><a href="javascript:goService('+idServicio+','+index+')" data-transition="slide"><img src="http://www.parquevianorte.com'+String(image)+'">'+nombreServicio+'</a></li>';} else {html = '<li><a href="javascript:goService('+idServicio+','+index+')" data-transition="slide">'+nombreServicio+'</a></li>';}
										$("#listado_servicios").append(html);
										$("#listado_servicios").listview('refresh');
										window.localStorage.setItem(nombreServicio,image);													
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/wsgetUrlLogoServicio.aspx?nIdServicioInquilino="+idServicio);
}//End composeService

function hacerReserva () {
	var tipo = $("#reserva").val(),
		inicio = $("#inicio").val(),
		hora = $("#hora").val(),
		duracion = $("#duracion").val(),
		mail,parque;
		
	switch(idParque) {
		case 1:
		mail = 'egomez@metrovacesa.es';
		parque = 'Vía Norte';
		break;
		case 3:
		mail = 'lguerrero@metrovacesa.es';//Alvento
		parque = 'Alvento';
		break;
		case 4:
		mail = 'mretamosa@metrovacesa.es';//Alvia
		parque = 'Alvia';
		break;
		case 5:
		mail = 'aferreira@metrovacesa.es';//Cadagua
		parque = 'Cadagua';
		break;
		case 6:
		mail = 'mretamosa@metrovacesa.es';//Las Tablas
		parque = 'Las Tablas';
		break;
		case 7:
		mail = 'lguerrero@metrovacesa.es';//Puerta de las Naciones
		parque = 'Puerta de las Naciones';
		break;
		case 8:
		mail = 'egomez@metrovacesa.es';//Sanchinarro
		parque = 'Sanchinarro';
		break;
		case 9:
		mail = 'aferreira@metrovacesa.es';//Sollube
		parque = 'Sollube';
		break;
	}
		
		if(inicio=='Fecha'||hora=='Hora'||duracion=='Duración') {
			navigator.notification.alert("Debe rellenar todos los campos", false, "MVC Oficinas", "Aceptar") ;
		} else {
			if(tipo == 1) {tipo = "Aparcamiento";} else { tipo == "Salas"};
			var cuerpo = 'Fecha: '+inicio+'\nHora: '+hora+'\nDuración: '+duracion;
			window.open('mailto:'+mail+'?subject=Reserva%20de%20'+tipo+'%20en%20'+parque+'&body='+encodeURIComponent(cuerpo));
		}
}

function checkNetwork () {
	if(!window.navigator.onLine) {
		$.mobile.changePage("offline.html", {transition:"flip"}, 100);
		} else {
			return true;
		}
}

$(document).bind('mobileinit', function () {
	
	$.mobile.loadingMessage = "Cargando";
	$.mobile.pageLoaderrorMessage = "Error Cargando Página";
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
	jQuery.fx.inteveral = 10;
	
	
	
	$("div:jqmData(role='page')").live('pageshow', function () {
		if($.mobile.activePage.attr("id") != "offline") {
		checkNetwork();
		}
	});
	
	
	$("div:jqmData(role='page')").live('pagebeforeshow', function () {
		$(".parque").html(parques[idParque-1]);
	});
	
	$("#home_menu").live('pagebeforeshow', function (){
		$(".nombreParque small").html(parques[idParque-1]);
	});
	
	$("#disponibilidad").live('pagebeforeshow', function (){
		/*var imageUrl ='<img src="http://www.parquevianorte.es/imagen.aspx?idx=4&nId=52&hash=f14d02a025489e99b0e6791019d19da6"/>';
		$(".imagen").html(imageUrl);
		$(".imagen img").load(function() {
		var ancho = $(".imagen img").width();
		var alto = $(".imagen img").height();
		$(".imagen img").attr("width",ancho/2);
		});*/
	});
	
	$("#goomap").live('pagebeforeshow', function () {
		$("#cargando_route").css('display','inline');
	});
	
	$("#goomap").live('pageshow', function () {
		$("#map_canvas").html("");
		$("#map_canvas").height(screen.height*0.8)
		$("#cargando_route").css('display','inline');
		if(ejecutar == 0) {
		GoogleMap();}
		else if(ejecutar ==1) {
			GooglePlace();
		}
		setTimeout(function () {$("#cargando_route").css('display','none');},5000);
	});
	
	$("#publi").live('pagebeforeshow', function (){
		$("#galeria3 ul").html('');
		$("#position3").html('');
		publi_ids = [];
		publi_urls = [];
		$("#ver_web a").attr("href","#");
		//$("#publi img").attr("src","http://www.tresaguas.com/ladorian/oficinas_publi/publi.jpg");
		
	});
	$("#publi").live('pageshow', function (){
		//$("#publi img").attr("src","http://www.tresaguas.com/ladorian/oficinas_publi/publi.jpg");
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										console.log(this.responseText);
										var json = eval('('+this.responseText+')'),
										anuncios = json.datos,
										listado_publi='',
										posiciones='';
										if(anuncios.length == 0) {
											listado_publi = '<li style="display:block"><div><img src="images/no_publi.jpg" width="320" height="480" /></div></li>';
											posiciones = '<em class="on">•</em>';
											$("#ver_web a").attr("href","http://mtec-conectados.com/anuncios/app_anuncioslist.php");
										} 
										else if(anuncios.length == 1) {
											listado_publi = '<li style="display:block"><div><img src="http://mtec-conectados.com/anuncios/anuncios/'+anuncios[0].img_anuncio+'" width="'+ancho+'" /></div></li>';
											posiciones = '<em class="on">•</em>';
											if(anuncios[0].url != "") {
												$("#ver_web a").attr("href",anuncios[0].url);
											}
										} else {
											$("#ver_web a").attr("src",anuncios[0].url);
											for (var i=0;i<anuncios.length;i++) {
											  listado_publi += '<li style="display:block"><div><img src="http://mtec-conectados.com/anuncios/anuncios/'+anuncios[i].img_anuncio+'" width="'+ancho+'" /></div></li>';
											  publi_ids.push(anuncios[i].IdAnuncio);
											  publi_urls.push(anuncios[i].url);
											  if(i==0) {
												  posiciones += '<em class="on">•</em>';
											  } else {
												  posiciones += '<em>•</em>';
											  }
											}
										}
										$("#ver_web a").button();
										$("#galeria3 ul").html(listado_publi);
										$("#position3").html(posiciones);
										var slider = new Swipe(document.getElementById('galeria3'), { 
													startSlide: 0,
													speed: 400,
													auto: 9000,
													callback: function(e, pos) { 
														var i = bullets.length;
															while (i--) { bullets[i].className = ' ';} 
															bullets[pos].className = 'on';}    
															}),
										bullets = document.getElementById('position3').getElementsByTagName('em');
										$("#ver_web a").button();
										$.mobile.hidePageLoadingMsg();												
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest(),
					dpi = window.devicePixelRatio, 
					height = screen.height,
					width = screen.width,
					resol,
					ancho;
				if( dpi == 1 && 320 <= width <= 480 && 426 <= height <= 469 ) {
					resol = "LDPI"; ancho = 320}
				else if (dpi == 1 && 320 <= width <= 480 && 470 <= height <= 639 ) {
					resol = "MDPI"; ancho = 320 }
				else if (dpi > 1 && 320 <= width <= 480 && 470 <= height <= 639 ) {
					resol = "RETINA"; ancho = 320 }
				else if (dpi > 1 && 480 <= width <= 719 && 640 <= height <= 959 ) {
					resol = "HDPI"; ancho = 240 }
				else { resol = "IPHONE5"; ancho = 320 }
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://mtec-conectados.com/anuncios/peticion.php?metodo=GetAnuncios&nIdCentro=12&resol="+resol);						
	});// end #publi
	
	$("#disponibilidad").live('pageshow', function (){		
	});// Fin disponibilidad
	
	$("#transportes").live('pagebeforeshow', function (){
		$("#popupTransport ul").html('');
		$(".lanzaderas").html('');
		$(".metro").html('');
		$(".cercanias").html('');
		$(".autobuses").html('');
		$(".ligero").html('');
	});
	
	$("#transportes").live('pageshow', function (){
		$(".profile_info small").html(parques[idParque-1]);
		$.mobile.showPageLoadingMsg();
		function ajaxLanzadera() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										var json = eval('('+this.responseText+')'),
											data = json.DataLanzadera,
											lanzaderaOptions = '';
										for (var i=0;i<data.length;i++) {									
											lanzaderaOptions += '<li><a href="javascript:openTransport(1)" data-rel="popup"><img src="css/images/bus-36.png" class="ui-li-icon" /><h3>'+data[i].cOrigen+'</h3><p>'+data[i].cInfoAdicional+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';
										}
										$(".lanzaderas").html(lanzaderaOptions);
										$(".lanzaderas").listview('refresh');								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var lanzadera = new XMLHttpRequest();
				lanzadera.onreadystatechange=ajaxLanzadera;
				lanzadera.open("GET", "http://www.parquevianorte.es/WS/WSGetDataLanzadera.aspx?nIdParque="+idParque+"&nIdIdioma=1");
				
				function ajaxTransportes() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										var json = eval('('+this.responseText+')'),
											data = json.DataTransportes,
											metro = '', autobuses ='', cercanias = '', ligero ='';
										for (var i=0;i<data.length;i++) {									
											switch(data[i].nIdTipoTransporte) {
												case 2:
												metro += '<li><a href="javascript:openTransport(2)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+'</h3><p>'+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';
												break;
												
												case 3:
												autobuses += '<li><a href="javascript:openTransport(3)" data-rel="popup"><img src="css/images/bus-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+'</h3><p>'+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';
												break;
												
												case 4:
												cercanias += '<li><a href="javascript:openTransport(4)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+'</h3><p>'+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';
												break;
												
												case 5:
												ligero += '<li><a href="javascript:openTransport(5)" data-rel="popup"><img src="css/images/metro-36.png" class="ui-li-icon" /><h3>'+data[i].cNombreLinea+'</h3><p>'+data[i].cNombreEstacion+'</p></a><a href="javascript:getMap('+data[i].cCoordenadasGPS+')" data-rel="popup">Map</a></li>';
												break;
												
											}
										}
										$(".metro").html(metro);
										$(".metro").listview('refresh');
										$(".autobuses").html(autobuses);
										$(".autobuses").listview('refresh');
										$(".cercanias").html(cercanias);
										$(".cercanias").listview('refresh');
										$(".ligero").html(ligero);
										$(".ligero").listview('refresh');
										$.mobile.hidePageLoadingMsg();								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var transportes = new XMLHttpRequest();
				transportes.onreadystatechange=ajaxTransportes;
				transportes.open("GET", "http://www.parquevianorte.es/WS/WSGetDataTransportes.aspx?nIdParque="+idParque);				
	});//Fin #transportes
	
	$('#actualidad').live('pagebeforeshow', function () {
		$("#listado_actualidad").html("");
	});
	$("#actualidad").live('pageshow', function (){
		$.mobile.showPageLoadingMsg();
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										window.localStorage.setItem("news",this.responseText);
								var noticias = json.Noticias;
								if(noticias.length == 0) {
												var park = parques[idParque-1];
												noContent('NOTICIAS DE ACTUALIDAD',park);
											} else {
								for (var i=0;i<noticias.length;i++) {									
									composeNews(noticias[i].nIdNoticia, noticias[i].cTitulo,i);
								}
											}
								$.mobile.hidePageLoadingMsg();								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetNoticias.aspx?nIdIdioma=1&nIdParque="+idParque);
				
	});// Fin actualidad
	
	$("#noticia").live('pagebeforeshow', function (){
		$("#noticia_content").html("");
	});
	$("#noticia").live('pageshow', function (){
		$.mobile.showPageLoadingMsg();
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { 
										console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										var thumbs = json.UrlImagenNoticia;
										var image =thumbs.cUrl;
										var datos = window.localStorage.getItem("news");
										var allnews = eval('('+datos+')');
										var simplenews =allnews.Noticias;
										if(!image) {
											html = '<div class="noticia_imagen"></div><div class="noticia_titulo"><h2>'+simplenews[indexNoticia].cTitulo+'</h2></div><div class="noticia_entradilla"><p>'+simplenews[indexNoticia].cEntradilla+'</p></div><div class="noticia_cuerpo"><p>'+simplenews[indexNoticia].cCuerpo+'</p></div>';
										} else {
										html = '<div class="noticia_imagen"><img src="http://www.parquevianorte.es'+String(image)+'" width="150" /></div><div class="noticia_titulo"><h2>'+simplenews[indexNoticia].cTitulo+'</h2></div><div class="noticia_entradilla"><p>'+simplenews[indexNoticia].cEntradilla+'</p></div><div class="noticia_cuerpo"><p>'+simplenews[indexNoticia].cCuerpo+'</p></div>';
										}
										$("#noticia_content").html(html);
										$.mobile.hidePageLoadingMsg();												
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetUrlImagenNoticia.aspx?nIdNoticia="+idNews+"&nIdIdioma=1&Thumbnail=no");
		
	});// End noticia
	$("#servicios").live('pagebeforeshow', function (){
		$("#listado_servicios").html('');
	});
	$("#servicios").live('pageshow', function (){
		$.mobile.showPageLoadingMsg();
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										window.localStorage.setItem("services",this.responseText);
								var servicios = json.Servicios;
								if(servicios.length == 0) {
												var park = parques[idParque-1];
												noContent('LISTADO DE SERVICIOS',park);
											} else {
								for (var i=0;i<servicios.length;i++) {									
									composeService(servicios[i].nIdServicioInquilino,servicios[i].cNombre,i);
								}
											}
								$.mobile.hidePageLoadingMsg();								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/wsgetServicios.aspx?nIdParque="+idParque+"&nIdIdioma=1");
	});// End servicios
	$("#service").live('pagebeforeshow', function () {
		$(".service_logo").html('');
				$("#galeria_list").html('');
				$("#position").html('');
				$(".service_name").html('');
				$(".service_desc").html('');
				$(".service_link").html('');
				$(".service_phones").html('');
	});
	$("#service").live('pageshow', function (){
		$.mobile.showPageLoadingMsg();
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										var json = eval('('+this.responseText+')');
										var galeria = json.GaleriaServicios; 
										var html = '';
										var dots = '';
								for (var i=0;i<galeria.length;i++) {
									if (galeria.length <= 1) {
											html += '<li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li><li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li>';
											dots+='<em class="on">•</em><em>•</em>';
									} else {
									html += '<li style="display:block"><div><img src="http://www.parquevianorte.com'+galeria[i].cUrl+'" width="185" /></div></li>';
									if (i == 0)  { dots+='<em class="on">•</em>';}
									else {
									dots += '<em>•</em>';
									}
									}
								}
								$("#galeria_list").html(html);
								$("#position").html(dots);
								$.mobile.hidePageLoadingMsg();
								var slider = new Swipe(document.getElementById('galeria'), { 
									startSlide: 0,
									speed: 400,
									auto: 5000,
									callback: function(e, pos) { 
										var i = bullets.length;
											while (i--) { bullets[i].className = ' ';} 
											bullets[pos].className = 'on';}    
											}),
								bullets = document.getElementById('position').getElementsByTagName('em');								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/wsgetGaleriaServicios.aspx?nIdParque="+idParque+"&nIdIdioma=1&nIdServicioInquilino="+idServ);
				var info = window.localStorage.getItem("services");
				var infoData = eval('('+info+')');
				var data = infoData.Servicios;
				$(".service_logo").html('<img src="http://www.parquevianorte.com'+window.localStorage.getItem(data[indexServ].cNombre)+'" width="51">');
				$(".service_name").html(data[indexServ].cNombre);
				var texto = data[indexServ].cDescripcion,
					newtext=texto.replace(/\\r/gi,"<br>");
				$(".service_desc").html(newtext);
				$(".service_link").html('<a href="'+data[indexServ].cUrlWeb+'" target="_blank" rel="external">'+data[indexServ].cUrlWeb+'</a>');
				var telefono_texto = data[indexServ].cTelefono,
					phones = telefono_texto.split("/"),
					phone_btn = "",
					service_email = data[indexServ].cEmail,
					email = '<a href="mailto:'+service_email+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>';
				for( var i=0; i<phones.length;i++) {
					phones[i] = phones[i].replace(/ /g,"");
					phone_btn += '<a href="tel:0034'+phones[i]+'" data-role="button" data-icon="phone" data-theme="a" class="phone_btn"> Llamar: '+phones[i]+'</a>';
					}
					$(".service_phones").html(phone_btn);
					$(".service_mail").html(email);
					$(".phone_btn").button();
					$(".service_mail a").button();	
	});//Fin service
	
	$("#tablon").live('pagebeforeshow', function (){
		$("#listado_tablon").html('');
	});
	$("#tablon").live('pageshow', function (){
		$.mobile.showPageLoadingMsg();
		function ajaxHandler() {
					switch (this.readyState) {
                                    case this.OPENED:
                                    this.send();
                                    break;
                                    
                                    case this.DONE:
                                    if (this.status != 200) {
                                    console.log("An error occurred.");
                                    } else {
										
                                    if (this.responseText) { console.log(this.responseText);
										window.localStorage.setItem("tablon",this.responseText);
										var json = eval('('+this.responseText+')'),
											tablones = json.DataTablon,
											html = '';
											if(tablones.length == 0) {
												var park = parques[idParque-1];
												noContent('ANUNCIOS',park);
											} else {
								for (var i=0;i<tablones.length;i++) {									
									html += '<li><a href="javascript:goAnuncio('+i+')" data-transition="slide"><h2>'+tablones[i].cTitulo+'</h2><p>'+tablones[i].cDescripcion+'</p><span class="ui-li-count">'+tablones[i].cTipoAnuncio+'</span></a></li>';
								}
								$("#listado_tablon").html(html);
								$("#listado_tablon").listview('refresh');
											}
								$.mobile.hidePageLoadingMsg();								
                                    } else if (this.responseXML) {
                            console.log("XML received");
                            } else {
                            console.log("No data received");
                            }
                            
                            }
							break;
					}
				} /* END ajaxHandler */
        		var ajax = new XMLHttpRequest();
				ajax.onreadystatechange=ajaxHandler;
				ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetTablon.aspx?nIdParque=1&nIdIdioma=1");
	});//Fin tablon
	
	$("#anuncio").live('pagebeforeshow', function (){
		$("#galeria2 ul").html('');
		$("#position2").html('');
		$(".anuncio_titulo h4").html('');
		$(".anuncio_texto p").html('');
		$("#anunciante").html('');
		$("#empresa").html('');
		$("#anuncio_link").html('');
		if ($(".precio").length){
			$(".precio").remove();
		}
		$("#anuncio_comunicacion").html('');
	});
	$("#anuncio").live('pageshow', function (){
		var tablon = window.localStorage.getItem("tablon"),
			json = eval('('+tablon+')'),
			anuncios = json.DataTablon
			listado_galeria='',
			posiciones='';
			if((anuncios[indexAnun].cUrlImg2 == "")&&(anuncios[indexAnun].cUrlImg3 =="")) {
				listado_galeria = '<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li>';
				posiciones = '<em class="on">•</em><em>•</em>';
			} else if (anuncios[indexAnun].cUrlImg3 =="") {
				listado_galeria = '<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg2+'" width="150" /></div></li>';
				posiciones = '<em class="on">•</em><em>•</em>';
			} else if (anuncios[indexAnun].cUrlImg2 =="") {
				listado_galeria = '<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg3+'" width="150" /></div></li>';
				posiciones = '<em class="on">•</em><em>•</em>';
			} else {
				listado_galeria = '<li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg1+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg2+'" width="150" /></div></li><li style="display:block"><div><img src="'+anuncios[indexAnun].cUrlImg3+'" width="150" /></div></li>';
				posiciones = '<em class="on">•</em><em>•</em><em>•</em>';
			}
			$("#galeria2 ul").html(listado_galeria);
			$("#position2").html(posiciones);
			$(".anuncio_titulo h4").html(anuncios[indexAnun].cTitulo);
			$(".anuncio_texto p").html(anuncios[indexAnun].cDescripcion);
			$("#anunciante").html(anuncios[indexAnun].cNombreAnunciante);
			$("#empresa").html(anuncios[indexAnun].cEmpresa);
			$("#anuncio_link").html('<a href="'+anuncios[indexAnun].cLink+'" rel="external" target="_blank">'+anuncios[indexAnun].cLink+'</a>');
			if(anuncios[indexAnun].mPrecio&&anuncios[indexAnun].mPrecio != '') {
				$(".anunciante table").append('<tr class="precio"><td class="table_label">Precio:</td><td class="table_data" id="anuncio_precio">'+anuncios[indexAnun].mPrecio+' &euro;</td></tr>');
			}
			$("#anuncio_comunicacion").html('<a href="tel:0034'+anuncios[indexAnun].cTelefonoAnunciante+'" data-role="button" data-icon="phone" data-theme="a"> Llamar: '+anuncios[indexAnun].cTelefonoAnunciante+'</a><a href="mailto:'+anuncios[indexAnun].cEmailAnunciante+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>');
			$("#anuncio_comunicacion a").button();
		var slider = new Swipe(document.getElementById('galeria2'), { 
			startSlide: 0,
    		speed: 2000,
    		auto: 5000,
			callback: function(e, pos) { 
				var i = bullets.length;
					while (i--) { bullets[i].className = ' ';} 
					bullets[pos].className = 'on';}    
					}),
		bullets = document.getElementById('position2').getElementsByTagName('em');	
	});//Fin anuncio
	
	$('#ofertas').live('pagebeforeshow', function () {
			$("#listado_ofertas").html("");
		});
		$("#ofertas").live('pageshow', function (){
			$.mobile.showPageLoadingMsg();
			function ajaxHandler() {
						switch (this.readyState) {
										case this.OPENED:
										this.send();
										break;
										
										case this.DONE:
										if (this.status != 200) {
										console.log("An error occurred.");
										} else {
											
										if (this.responseText) { console.log(this.responseText);
											var json = eval('('+this.responseText+')');
									var ofertas = json.Ofertas,
									html = '',
									inicio, fin;
									if(ofertas.length == 0) {
										var park = parques[idParque-1];
										noContent('OFERTAS',park);
									} else {
									for (var i=0;i<ofertas.length;i++) {
										inicio = parseInt(ofertas[i].dFechaInicio.substring(6,19));
										fin = parseInt(ofertas[i].dFechaFin.substring(6,19));								
										/*if (ofertas[i].cUrl != "") { html += '<div class="news_preview"><div class="actualidad_thumb"><img src="http://www.parquevianorte.es/'+ofertas[i].cUrl+'" width="91" /></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+'</p></div><div class="boton_ver"><a href="javascript:openDownloads('+ofertas[i].nIdOferta+')" >Consultar oferta</a></div></div>';} else {html += '<div class="news_preview"><div class="actualidad_thumb"></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+'</p></div><div class="boton_ver"><a href="javascript:openDownloads('+ofertas[i].nIdOferta+')">Consultar oferta</a></div></div>';}*/
										if (ofertas[i].cUrl != "") { html += '<div class="news_preview"><div class="actualidad_thumb"><img src="http://www.parquevianorte.es/'+ofertas[i].cUrl+'" width="91" /></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+'</p></div></div>';} else {html += '<div class="news_preview"><div class="actualidad_thumb"></div><div class="prev_titulo"><h2>'+ofertas[i].cTitulo+'</h2></div><div class="prev_desc"><p>'+ofertas[i].cDescripcion+'</p></div></div>';}
									}
									$("#listado_ofertas").html(html);
									}
									$.mobile.hidePageLoadingMsg();
										} else if (this.responseXML) {
								console.log("XML received");
								} else {
								console.log("No data received");
								}
								
								}
								break;
						}
					} /* END ajaxHandler */
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange=ajaxHandler;
					ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetOfertas.aspx?nIdParque="+idParque);
					
		});// Fin ofertas
		
		$("#directorio").live('pagebeforeshow', function (){
			$("#listado_directorio ul").html("");
		});
		$("#directorio").live('pageshow', function (){
			$.mobile.showPageLoadingMsg();
			function ajaxHandler() {
						switch (this.readyState) {
										case this.OPENED:
										this.send();
										break;
										
										case this.DONE:
										if (this.status != 200) {
										console.log("An error occurred.");
										} else {
											
										if (this.responseText) { console.log(this.responseText);
											var json = eval('('+this.responseText+')');
									var contactos = json.Contactos,
									html = '';
									if(contactos.length == 0) {
												var park = parques[idParque-1];
												noContent('INFORMACIÓN EN EL DIRECTORIO',park);
											} else {
									for (var i=0;i<contactos.length;i++) {
										var phone = contactos[i].cTelefono,
										telefono = phone.replace(/ /g,"");
										html += '<li><a href="#">'+contactos[i].cEmpresa+'</a><a href="javascript:openDirectorio(&quot;'+contactos[i].cEmpresa+'&quot;,'+telefono+',&quot;'+contactos[i].cEmail+'&quot;)"></a></li>';
									}
									$("#listado_directorio ul").html(html);
									$("#listado_directorio ul").listview('refresh');
											}
									$.mobile.hidePageLoadingMsg();
										} else if (this.responseXML) {
								console.log("XML received");
								} else {
								console.log("No data received");
								}
								
								}
								break;
						}
					} /* END ajaxHandler */
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange=ajaxHandler;
					ajax.open("GET", "http://www.parquevianorte.es/WS/WSGetContactos.aspx?nIdParque="+idParque);
					
		});// Fin directorio
		
		$("#places").live('pagebeforeshow', function (){
			$("#listado_places ul").html('');
		});
		$("#places").live('pageshow', function (){
			$.mobile.showPageLoadingMsg();
			function ajaxHandler() {
						switch (this.readyState) {
										case this.OPENED:
										this.send();
										break;
										
										case this.DONE:
										if (this.status != 200) {
										console.log("An error occurred.");
										} else {
											
										if (this.responseText) { console.log(this.responseText);
											var json = eval('('+this.responseText+')');
											window.localStorage.setItem("places",this.responseText);
											var places = json.DataPlaces,
											html = '',
											icon;
											for (var i=0;i<places.length;i++) {
												switch(places[i].nIdCategoria) {
													case 1:
													icon = 'ico_restaurantes_big.png';
													break;
													case 2:
													icon = 'ico_deportes_big.png';
													break;
													case 3:
													icon = 'ico_compras_big.png';
													break;
													case 4:
													icon = 'ico_cajeros_big.png';
													break;
													case 5:
													icon = 'ico_escuelas_big.png';
													break;
													case 6:
													icon = 'ico_biblio_big.png';
													break;
													case 7:
													icon = 'ico_farmacias_big.png';
													break;
													case 8:
													icon = 'ico_gasolineras_big.png';
													break;
													case 9:
													icon = 'ico_hospitales_big.png';
													break;
													case 10:
													icon = 'ico_hoteles_big.png';
													break;
													case 11:
													icon = 'ico_itv_big.png';
													break;
													case 12:
													icon = 'ico_copas_big.png';
													break;
													case 13:
													icon = 'ico_parafarm_big.png';
													break;
													case 14:
													icon = 'ico_taller_big.png';
													break;
												}
												html += '<li><a href="javascript:goPlace('+i+')" data-transition="slide"><img src="images/'+icon+'" width="30" height="46" /><h2>'+places[i].cPlace+'</h2></a></li>';
											}
											$("#listado_places ul").html(html);
											$("#listado_places ul").listview('refresh');
											$.mobile.hidePageLoadingMsg();
										} else if (this.responseXML) {
								console.log("XML received");
								} else {
								console.log("No data received");
								}
								
								}
								break;
						}
					} /* END ajaxHandler */
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange=ajaxHandler;
					ajax.open("GET", "http://www.parquevianorte.com/ws/wsgetplaces.aspx?nidparque="+idParque);					
		});// Fin places

$("#aPlace").live('pagebeforeshow', function (){
	$(".number em").html('');
				$(".place_titulo h4").html('');
				$(".place_texto p").html('');
				$("#categoria").html('');
				$("#place_direccion").html('');
				$("#place_link").html('');
				$("#place_comunicacion").html('');		
});
$("#aPlace").live('pageshow', function (){
			var json = window.localStorage.getItem("places"),
				data = eval('('+json+')'),
				aPlace = data.DataPlaces;
				$(".number em").html(aPlace[indexPlace].numComentarios);
				$(".place_titulo h4").html(aPlace[indexPlace].cPlace);
				$(".place_texto p").html(aPlace[indexPlace].cDescripcion);
				$("#categoria").html(aPlace[indexPlace].cCategoria);
				$("#place_direccion").html(aPlace[indexPlace].cDireccion);
				$("#place_link").html('<a href="'+aPlace[indexPlace].cLink+'" data-rel="external" target="_blank">'+aPlace[indexPlace].cLink+'</a>');
				if(aPlace[indexPlace].cCoordenadasGPS != ""){
					$("#place_comunicacion").append('<a href="javascript:placeMap('+aPlace[indexPlace].cCoordenadasGPS+','+aPlace[indexPlace].nIdCategoria+')" data-rel="popup" data-role="button" data-theme="a">Ver mapa</a>');
				}
				if(aPlace[indexPlace].cEmail != "") {
					$("#place_comunicacion").append('<a href="mailto:'+aPlace[indexPlace].cEmail+'" target="_blank" rel="external" data-role="button" data-icon="email" data-theme="a">Enviar E-Mail</a>');
				}
				if(aPlace[indexPlace].cTelefono != "") {
					$("#place_comunicacion").append('<a href="tel:0034'+aPlace[indexPlace].cTelefono+'" data-role="button" data-icon="phone" data-theme="a"> Llamar: '+aPlace[indexPlace].cTelefono+'</a>');
				}
				$("#place_comunicacion a").button();
		});// Fin aPlace	
		
		$("#reservas").live('pagebeforeshow', function (){
			$("#reserva").html('<option value="1" selected>Aparcamiento</option>');
			$("#inicio").val('Fecha de Entrada');
			$("#hora").val('Hora');
			$("#duracion").val('Duración');
			$("#telefonoReservas").html('');
		});
		$("#reservas").live('pageshow', function (){
			var contacto, telefono;
			switch(idParque) {
				case 1:
				contacto = 'Emilio Gómez';
				telefono = '914184149';
				break;
				case 3:
				contacto = 'Luis Guerrero';//Alvento
				telefono = '917213522';
				break;
				case 4:
				contacto = 'Miguel Ángel Retamosa';//Alvia
				telefono = '914183096';
				break;
				case 5:
				contacto = 'Ángel Ferreira';//Cadagua
				telefono = '914183074';
				break;
				case 6:
				contacto = 'Miguel Ángel Retamosa';//Las Tablas
				telefono = '914183096';
				break;
				case 7:
				contacto = 'Luis Guerrero';//Puerta de las Naciones
				telefono = '917213522';
				break;
				case 8:
				contacto = 'Emilio Gómez';
				telefono = '914184149';
				break;
				case 9:
				contacto = 'Ángel Ferreira';
				telefono = '914183074';
				break;
			}
			$("#telefonoReservas").html(' <a href="tel:0034'+telefono+'" data-role="button" id="reservasLlamar" data-icon="phone" data-theme="a">'+contacto+'</a>');
			$("#reservasLlamar").button();
			if(idParque==1||idParque==9) {
				$("#reserva").html('<option value="1">Aparcamiento</option><option value="2">Salas</option>');
			} else {
				$("#reserva").html('<option value="1">Aparcamiento</option>');
			}
			$("#reserva").selectmenu();
		});//Fin resrvas
		
		$("#subirTablon").live("pagebeforeshow", function() {
			$("#miNombre").attr("value","");
			$("#miEmail").attr("value","");
			$("#miTelefono").attr("value","");
			$("#miEmpresa").attr("value","");
			$("#miCategoria").attr("value","3");
			$("#miTipo").attr("value","1");
			$("#miTitulo").attr("value","");
			$("#miDescripcion").attr("value","");
			$("#miPrecio").attr("value","");
			$("#miLink").attr("value","");
		});
		$("#subirTablon").live("pageshow", function() {
		$( "#form_first" ).validate({
			rules: { nombre: {required: true,minlength: 6},email: {	required: true,	email: true	},titulo : {required:true}, descripcion: {required:true}, agree: "required"	},
			messages: {nombre: {required: "Introduce tu Nombre",	minlength: "Tu nombre debe tener al menos 6 caracteres"	},titulo: "Introduce un t&iacute;tulo", descripcion: "Describe el anuncio", email: "Introduce un email v&aacute;lido",agree: "Debes aceptar nuestros t&eacute;rminos y condiciones"},			
    		submitHandler: function( form ) {
				var datosPersonales = [$("#miNombre").attr("value"),$("#miEmail").attr("value"),$("#miTelefono").attr("value"),$("#miEmpresa").attr("value")],
					datosAnuncio = [$("#miCategoria").attr("value"),$("#miTipo").attr("value"),$("#miTitulo").attr("value"),$("#miDescripcion").attr("value"),$("#miPrecio").attr("value"),$("#miLink").attr("value")];
					sendTablon(datosPersonales,datosAnuncio);
			}
			});
		});// Fin subirTablon
	
});// Fin del evento mobileinit


// PHONEGAP

function onLoad () {
	document.addEventListener('deviceready', onDeviceReady, false);
	window.localStorage.setItem("Image1","");
	window.localStorage.setItem("Image2","");
	window.localStorage.setItem("Image3","");
}

function onDeviceReady () {
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	
	
}

function doNothing () { return true;}

function goMenuPpal () {
	window.localStorage.setItem("Image1","");
	window.localStorage.setItem("Image2","");
	window.localStorage.setItem("Image3","");
	$.mobile.changePage("#home_menu", {transition:"flip"}, 100);
}


function noContent (section, parque) {
	navigator.notification.alert(
		'En estos momentos, no hay '+section+' en '+parque,  // message
		doNothing,              // callback to invoke with index of button pressed
		'MVC Oficinas',            // title
		'Aceptar'          // buttonLabels
	);
}

function reintentar() {
	if(!window.navigator.onLine) {
		navigator.notification.alert(
            'No hay conexión.',  // message
        	doNothing,           // callback to invoke with index of button pressed
        	'MVC Oficinas',      // title
        	'Aceptar'          // buttonLabels
        );
	} else { $.mobile.changePage("index.html", {transition:"flip"}, 100);}
 }

function onPhotoDataSuccess(imageURI) {
	var image = window.localStorage.getItem("image");
	switch(image) {
		case "1":
		console.log(imageURI);
		$("#imagen1").attr("src",imageURI);
		window.localStorage.setItem("Image1",imageURI);
		break;
		
		case "2":
		$("#imagen2").attr("src",imageURI);
		window.localStorage.setItem("Image2",imageURI);
		break;
		
		case "3":
		$("#imagen3").attr("src",imageURI);
		window.localStorage.setItem("Image3",imageURI);
		break;
	}
	
}

function uploadPhoto(imageURI,forename) {
            var options = new FileUploadOptions();
            options.fileKey="cUrlImg";
            options.fileName=forename+"-"+imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            /*var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;*/
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://mtec-conectados.com/anuncio/archivo.php", win, fail, options);
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            
        }
 
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }

function okComposer(result) {
	console.log(result);
}

function onFail(message) {
    console.log('Failed because: ' + message);
}

function seleccionarImagen(img) {
		window.localStorage.setItem("image", img);
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 40,
        destinationType: destinationType.FILE_URI, sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM, encodingType: Camera.EncodingType.JPEG,
  targetWidth: 300,
  targetHeight: 300 });
	}
	
function sendTablon (personal,anuncio) {
	 //window.plugins.emailComposer.showEmailComposer("Look at this photo","Mira <b>esto<b/>: <img src='data:image/jpeg;base64,"+photo+"' />","gran-bazu@mundo-r.com","","",true);
	var completeMail = personal[1],
	 	 codename = completeMail.replace(/\W+/g,'-');
		 console.log(codename);
		 var foto1 = "", foto2="", foto3 ="", cUrlImg1 = "", cUrlImg2 = "",cUrlImg3 = "";
	if(window.localStorage.getItem("Image1") !='') {
		foto1 = window.localStorage.getItem("Image1");
		cUrlImg1= codename+"-"+foto1.substr(foto1.lastIndexOf('/')+1)}
	if( window.localStorage.getItem("Image2") !='') {
		foto2 = window.localStorage.getItem("Image2");
		cUrlImg2= codename+"-"+foto2.substr(foto2.lastIndexOf('/')+1)}
	if( window.localStorage.getItem("Image3") !='') {
		foto3 = window.localStorage.getItem("Image3");
		cUrlImg3= codename+"-"+foto3.substr(foto3.lastIndexOf('/')+1);}
		 anuncioData = '{"Empresa":"'+personal[3]+'","IdCategoria":"'+anuncio[0]+'","IdtipoAnuncio":"'+anuncio[1]+'","cUrlImg1":"'+cUrlImg1+'","cUrlImg2":"'+cUrlImg2+'","cUrlImg3":"'+cUrlImg3+'","Precio":"'+anuncio[4]+'","Link":"'+anuncio[5]+'","NombreAnunciante":"'+personal[0]+'","TelefonoAnunciante":"'+personal[2]+'","EmailAnunciante":"'+personal[1]+'","Titulo":"'+anuncio[2]+'","Descripcion":"'+anuncio[3]+'"}';
		 function ajaxHandler() {
						switch (this.readyState) {
										case this.OPENED:
										this.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										this.setRequestHeader("Pragma", "no-cache");
										this.setRequestHeader("Cache-Control", "no-cache");
										this.send(anuncioData);
										break;
										
										case this.DONE:
										if (this.status != 200) {
										console.log("An error occurred.");
										} else {
											
										if (this.responseText) { console.log(this.responseText);
											var json = eval('('+this.responseText+')');
										 subido = json.received;
										 console.log(subido);
										 if(subido == "ok") {
			  navigator.notification.alert(
            'El anuncio se ha enviado y está pendiente de aprobación. Muchas gracias.',  // message
        	goMenuPpal,           // callback to invoke with index of button pressed
        	'MVC Oficinas',      // title
        	'Aceptar'          // buttonLabels
        );
		  }	else {
			   navigator.notification.alert(
            'Ha habido un problema. Inténtelo más tarde.',  // message
        	doNothing,           // callback to invoke with index of button pressed
        	'MVC Oficinas',      // title
        	'Aceptar'          // buttonLabels
        );
		  }
										} else if (this.responseXML) {
								console.log("XML received");
								} else {
								console.log("No data received");
								}
								
								}
								break;
						}
					} 
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange=ajaxHandler;
					ajax.open("POST", "http://www.mtec-conectados.com/anuncio/alta.php",true);
	for (var i=1;i<4;i++)  {
			  //var i =1;
			if( window.localStorage.getItem("Image"+i) !='' ) {
			  var shot = window.localStorage.getItem("Image"+i);
			  uploadPhoto(shot,codename);
			  
			}
		  }
		  
}


$(document).on("pageinit", function(e){

	$("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").addClass('slidemenu_btn');
	var sm = $($("#"+ $(e.target).attr('id') +" :jqmData(slidemenu)").data('slidemenu'));
	sm.addClass('slidemenu');
	

	/*$(document).on("swiperight",".ui-page-active", function(e){
		console.log('b');
		e.stopImmediatePropagation();
		e.preventDefault();
		slidemenu(sm, sm.data('slideopen'));
		sm.height($(".ui-page-active").height());
	});*/

	$(document).on("click", ".ui-page-active :jqmData(slidemenu)", function(e) {
		slidemenu(sm, sm.data('slideopen'));
		e.stopImmediatePropagation();
		e.preventDefault();
		$(".ui-btn-right").hide();
		sm.height($(".ui-page-active").height());
		
	});
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		slidemenu(sm, true);
	});

	$(window).on('resize', function(e){
		if (sm.data('slideopen')) {
			sm.css('top','0 px');
			sm.css('width', '240px');
			sm.height($(".ui-page-active").height());
			$(":jqmData(role='page')").css('right', '-240px');
		}
	});

	$(window).scroll(function() {
		if (sm.data('slideopen')) {
			sm.css('top', '0 px');
			$("body.ui-mobile-viewport").on("touchmove", function handleMove(evt) {
				if(sm.data('slideopen')){
  evt.preventDefault();}
});
		}
	});

});




function slidemenu(sm, only_close) {
	sm.height(viewport().height);
	if (!sm.data('slideopen') && !only_close) {
		sm.show().animate({width: '240px', avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(".ui-page-active").css('left', '240px');
		sm.data('slideopen', true);
		if ($(".ui-page-active :jqmData(role='header')").data('position') == 'fixed') {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '250px');
		} else {
			$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '10px');
		}
	} else {
		sm.animate({width: '0px', avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide(); $(".ui-btn-right").show();});
		$(".ui-page-active").css('left', '0px');
		sm.data('slideopen', false);
		$(".ui-page-active :jqmData(slidemenu)").css('margin-left', '0px');
	}
	return false;
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
}

$(document).bind('mobileinit', function () {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
});

(function(a){a.widget("mobile.jqmMobiscroll",a.mobile.widget,{options:{theme:"jqm",preset:"date",animate:"pop"},_create:function(){var v=this.element,n=a.extend(this.options,v.jqmData("options"));v.mobiscroll(n)}});a(document).bind("pagebeforecreate",function(v){a('input[type="date"]:jqmData(role="mobiscroll")',v.target).prop("type","text")});a(document).bind("pagecreate create",function(v){a(document).trigger("mobiscrollbeforecreate");a(':jqmData(role="mobiscroll")',v.target).each(function(){"undefined"===
typeof a(this).data("mobiscroll")&&a(this).jqmMobiscroll()})})})(jQuery);(function(a){function v(m,e){function h(h){return a.isArray(j.readonly)?(h=a(".dwwl",w).index(h),j.readonly[h]):j.readonly}function u(a){var h="",m;for(m in U[a])h+='<li class="dw-v" data-val="'+m+'" style="height:'+J+"px;line-height:"+J+'px;"><div class="dw-i">'+U[a][m]+"</div></li>";return h}function i(){var a=document.body,h=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,h.clientHeight,h.scrollHeight,h.offsetHeight)}function r(h){d=a("li.dw-v",h).eq(0).index();g=a("li.dw-v",
h).eq(-1).index();s=a("ul",w).index(h);k=J;o=l}function n(a){var h=j.headerText;return h?"function"==typeof h?h.call(N,a):h.replace(/\{value\}/i,a):""}function y(){l.temp=Q&&(null!==l.val&&l.val!=A.val()||!A.val().length)||null===l.values?j.parseValue(A.val()||"",l):l.values.slice(0);l.setValue(!0)}function v(h,m,c,j){M("validate",[w,m]);a(".dww ul",w).each(function(c){var d=a(this),b=a('li[data-val="'+l.temp[c]+'"]',d),u=b.index(),g=c==m||void 0===m;if(!b.hasClass("dw-v")){for(var e=b,f=0,i=0;e.prev().length&&
!e.hasClass("dw-v");)e=e.prev(),f++;for(;b.next().length&&!b.hasClass("dw-v");)b=b.next(),i++;(i<f&&i&&2!==j||!f||!e.hasClass("dw-v")||1==j)&&b.hasClass("dw-v")?u+=i:(b=e,u-=f)}if(!b.hasClass("dw-sel")||g)l.temp[c]=b.attr("data-val"),a(".dw-sel",d).removeClass("dw-sel"),b.addClass("dw-sel"),l.scroll(d,c,u,h)});l.change(c)}function K(){function h(){a(".dwc",w).each(function(){e=a(this).outerWidth(!0);m+=e;b=e>b?e:b});e=m>c?b:m;e=a(".dwwr",w).width(e+1).outerWidth();x=g.outerHeight()}if("inline"!=j.display){var m=
0,b=0,c=a(window).width(),d=window.innerHeight,u=a(window).scrollTop(),g=a(".dw",w),e,f,l,x,k,P={},t,B=void 0===j.anchor?A:j.anchor,d=d||a(window).height();if("modal"==j.display)h(),l=(c-e)/2,f=u+(d-x)/2;else if("bubble"==j.display){h();var p=B.offset(),r=a(".dw-arr",w),o=a(".dw-arrw-i",w),G=g.outerWidth();k=B.outerWidth();l=p.left-(g.outerWidth(!0)-k)/2;l=l>c-G?c-(G+20):l;l=0<=l?l:20;f=p.top-(g.outerHeight()+3);f<u||p.top>u+d?(g.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),f=p.top+B.outerHeight()+
3,t=f+g.outerHeight(!0)>u+d||p.top>u+d):g.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");f=f>=u?f:u;u=p.left+k/2-(l+(G-o.outerWidth())/2);u>o.outerWidth()&&(u=o.outerWidth());r.css({left:u})}else P.width="100%","top"==j.display?f=u:"bottom"==j.display&&(f=u+d-g.outerHeight(),f=0<=f?f:0);P.top=f;P.left=l;g.css(P);a(".dwo, .dw-persp",w).height(0).height(i());t&&a(window).scrollTop(f+g.outerHeight(!0)-d)}}function M(h,m){var b;m.push(l);a.each([V,e],function(a,u){u[h]&&(b=u[h].apply(N,m))});
return b}function aa(a){var h=+a.data("pos")+1;c(a,h>g?d:h,1)}function ba(a){var h=+a.data("pos")-1;c(a,h<d?g:h,2)}var l=this,W=a.mobiscroll,N=m,A=a(N),X,Y,j=E({},L),V={},Z,J,G,w,U=[],R={},Q=A.is("input"),S=!1;l.enable=function(){j.disabled=!1;Q&&A.prop("disabled",!1)};l.disable=function(){j.disabled=!0;Q&&A.prop("disabled",!0)};l.scroll=function(a,h,m,b,u,c){function d(){clearInterval(R[h]);R[h]=void 0;a.data("pos",m).closest(".dwwl").removeClass("dwa")}var g=(Z-m)*J,f,c=c||C;a.attr("style",(b?$+
"-transition:all "+b.toFixed(1)+"s ease-out;":"")+(T?$+"-transform:translate3d(0,"+g+"px,0);":"top:"+g+"px;"));R[h]&&d();b&&void 0!==u?(f=0,a.closest(".dwwl").addClass("dwa"),R[h]=setInterval(function(){f+=0.1;a.data("pos",Math.round((m-u)*Math.sin(f/b*(Math.PI/2))+u));f>=b&&(d(),c())},100),M("onAnimStart",[h,b])):(a.data("pos",m),c())};l.setValue=function(a,h,m,b){b||(l.values=l.temp.slice(0));S&&a&&v(m);h&&(G=j.formatResult(l.temp),l.val=G,Q&&A.val(G).trigger("change"))};l.validate=function(a,h){v(0.2,
a,!0,h)};l.change=function(h){G=j.formatResult(l.temp);"inline"==j.display?l.setValue(!1,h):a(".dwv",w).html(n(G));h&&M("onChange",[G])};l.hide=function(h){if(!1===M("onClose",[G]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");A.blur();w&&("inline"!=j.display&&j.animate&&!h?(a(".dw",w).addClass("dw-"+j.animate+" dw-out"),setTimeout(function(){w.remove();w=null},350)):(w.remove(),w=null),S=!1,a(window).unbind(".dw"))};l.changeWheel=function(h,m){if(w){var b=0,c,d,f=h.length;for(c in j.wheels)for(d in j.wheels[c]){if(-1<
a.inArray(b,h)&&(U[b]=j.wheels[c][d],a("ul",w).eq(b).html(u(b)),f--,!f)){K();v(m);return}b++}}};l.show=function(m){if(j.disabled||S)return!1;"top"==j.display&&(j.animate="slidedown");"bottom"==j.display&&(j.animate="slideup");y();M("onBeforeShow",[w]);var d=0,g,e="",i="",k="";j.animate&&!m&&(i='<div class="dw-persp">',k="</div>",e="dw-"+j.animate+" dw-in");e='<div class="'+j.theme+" dw-"+j.display+'">'+("inline"==j.display?'<div class="dw dwbg dwi"><div class="dwwr">':i+'<div class="dwo"></div><div class="dw dwbg '+
e+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(j.headerText?'<div class="dwv"></div>':""));for(m=0;m<j.wheels.length;m++){e+='<div class="dwc'+("scroller"!=j.mode?" dwpm":" dwsc")+(j.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(g in j.wheels[m])U[d]=j.wheels[m][g],e+='<td><div class="dwwl dwrc dwwl'+d+'">'+("scroller"!=j.mode?'<div class="dwwb dwwbp" style="height:'+J+"px;line-height:"+
J+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+J+"px;line-height:"+J+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+g+'</div><div class="dww dwrc" style="height:'+j.rows*J+"px;min-width:"+j.width+'px;"><ul>',e+=u(d),e+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',d++;e+="</tr></table></div></div>"}e+=("inline"!=j.display?'<div class="dwbc'+(j.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+j.setText+"</span></span>"+
(j.button3?'<span class="dwbw dwb-n"><span class="dwb">'+j.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+j.cancelText+"</span></span></div>"+k:'<div class="dwcc"></div>')+"</div></div></div>";w=a(e);v();"inline"!=j.display?w.appendTo("body"):A.is("div")?A.html(w):w.insertAfter(A);S=!0;"inline"!=j.display&&(a(".dwb-s span",w).click(function(){if(l.hide()!==false){l.setValue(false,true);M("onSelect",[l.val])}return false}),a(".dwb-c span",w).click(function(){l.hide()!==
false&&M("onCancel",[l.val]);return false}),j.button3&&a(".dwb-n span",w).click(j.button3),j.scrollLock&&w.bind("touchmove",function(a){a.preventDefault()}),a("input,select").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",!0),K(),a(window).bind("resize.dw",K));w.delegate(".dwwl","DOMMouseScroll mousewheel",function(m){if(!h(this)){m.preventDefault();var m=m.originalEvent,m=m.wheelDelta?m.wheelDelta/120:m.detail?-m.detail/3:0,b=a("ul",this),d=
+b.data("pos"),d=Math.round(d-m);r(b);c(b,d,m<0?1:2)}}).delegate(".dwb, .dwwb",O,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",O,function(m){var d=a(this).closest(".dwwl");if(!h(d)&&!d.hasClass("dwa")){m.preventDefault();m.stopPropagation();var c=d.find("ul"),e=a(this).hasClass("dwwbp")?aa:ba;b=true;r(c);clearInterval(f);f=setInterval(function(){e(c)},j.delay);e(c)}}).delegate(".dwwl",O,function(m){m.preventDefault();if(!t&&!h(this)&&!b&&j.mode!="clickpick"){t=true;p=a("ul",this);p.closest(".dwwl").addClass("dwa");
x=+p.data("pos");r(p);D=R[s]!==void 0;z=F(m);B=new Date;q=z;l.scroll(p,s,x)}});M("onShow",[w,G]);X.init(w,l)};l.init=function(a){X=E({defaults:{},init:C},W.themes[a.theme||j.theme]);Y=W.i18n[a.lang||j.lang];E(e,a);E(j,X.defaults,Y,e);l.settings=j;A.unbind(".dw");if(a=W.presets[j.preset])V=a.call(N,l),E(j,V,e),E(I,V.methods);Z=Math.floor(j.rows/2);J=j.height;void 0!==A.data("dwro")&&(N.readOnly=H(A.data("dwro")));S&&l.hide();"inline"==j.display?l.show():(y(),Q&&j.showOnFocus&&(A.data("dwro",N.readOnly),
N.readOnly=!0,A.bind("focus.dw",function(){l.show()})))};l.values=null;l.val=null;l.temp=null;l.init(e)}function n(a){for(var b in a)if(void 0!==K[a[b]])return!0;return!1}function F(a){var b=a.originalEvent,h=a.changedTouches;return h||b&&b.changedTouches?b?b.changedTouches[0].pageY:h[0].pageY:a.pageY}function H(a){return!0===a||"true"==a}function r(a,b,h){a=a>h?h:a;return a<b?b:a}function c(b,c,h,e,f){var c=r(c,d,g),i=a("li",b).eq(c),k=s,e=e?c==f?0.1:Math.abs(0.1*(c-f)):0;o.scroll(b,k,c,e,f,function(){o.temp[k]=
i.attr("data-val");o.validate(k,h)})}function i(a,b,h){return I[b]?I[b].apply(a,Array.prototype.slice.call(h,1)):"object"===typeof b?I.init.call(a,b):a}var e={},f,C=function(){},k,d,g,o,y=(new Date).getTime(),t,b,p,s,z,q,B,x,D,K=document.createElement("modernizr").style,T=n(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),$=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(n([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),E=a.extend,
O="touchstart mousedown",L={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(a){return a.join(" ")},parseValue:function(a,b){var h=b.settings.wheels,c=a.split(" "),d=[],e=0,f,g,i;for(f=0;f<h.length;f++)for(g in h[f]){if(void 0!==h[f][g][c[e]])d.push(c[e]);else for(i in h[f][g]){d.push(i);break}e++}return d}},
I={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(y+=1,this.id="scoller"+y);e[this.id]=new v(this,a)})},enable:function(){return this.each(function(){var a=e[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=e[this.id];a&&a.disable()})},isDisabled:function(){var a=e[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var h=e[this.id];if(h){var c={};"object"===typeof a?c=a:c[a]=b;h.init(c)}})},setValue:function(a,
b,h,c){return this.each(function(){var d=e[this.id];d&&(d.temp=a,d.setValue(!0,b,h,c))})},getInst:function(){return e[this[0].id]},getValue:function(){var a=e[this[0].id];if(a)return a.values},show:function(){var a=e[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=e[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var b=e[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete e[this.id],a(this).is("input")&&(this.readOnly=H(a(this).data("dwro"))))})}};
a(document).bind("touchmove mousemove",function(a){t&&(a.preventDefault(),q=F(a),o.scroll(p,s,r(x+(z-q)/k,d-1,g+1)),D=!0)});a(document).bind("touchend mouseup",function(e){if(t){e.preventDefault();var i=new Date-B,e=r(x+(z-q)/k,d-1,g+1),h;h=p.offset().top;300>i?(i=(q-z)/i,i=i*i/0.0012,0>q-z&&(i=-i)):i=q-z;if(!i&&!D){h=Math.floor((q-h)/k);var u=a("li",p).eq(h);u.addClass("dw-hl");setTimeout(function(){u.removeClass("dw-hl")},200)}else h=Math.round(x-i/k);c(p,h,0,!0,Math.round(e));t=!1;p=null}b&&(clearInterval(f),
b=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){E(this,a.mobiscroll.shorts);return i(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(a){E(L,a)},presetShort:function(a){this.shorts[a]=function(b){return i(this,E(b,{preset:a}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){a.mobiscroll.i18n.es=a.extend(a.mobiscroll.i18n.es,{setText:"Aceptar",cancelText:"Cancelar"})})(jQuery);(function(a){var v=a.mobiscroll,n=new Date,F={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:n.getFullYear()-100,endYear:n.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},H=function(r){function c(a,b,c){return void 0!==t[b]?+a[t[b]]:void 0!==c?c:T[p[b]]?T[p[b]]():p[b](T)}function i(a,b){return Math.floor(a/b)*b}function e(a){var b=c(a,"h",0);return new Date(c(a,"y"),c(a,"m"),c(a,"d",1),c(a,"ap")?b+12:b,c(a,"i",0),c(a,"s",0))}var f=a(this),n={},k;if(f.is("input")){switch(f.attr("type")){case "date":k=
"yy-mm-dd";break;case "datetime":k="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":k="yy-mm-ddTHH:ii:ss";break;case "month":k="yy-mm";n.dateOrder="mmyy";break;case "time":k="HH:ii:ss"}var d=f.attr("min"),f=f.attr("max");d&&(n.minDate=v.parseDate(k,d));f&&(n.maxDate=v.parseDate(k,f))}var g=a.extend({},F,n,r.settings),o=0,n=[],y=[],t={},b,p={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=D&&12<=a?a-12:a;return i(a,H)},i:function(a){return i(a.getMinutes(),E)},s:function(a){return i(a.getSeconds(),
O)},ap:function(a){return x&&11<a.getHours()?1:0}},s=g.preset,z=g.dateOrder,q=g.timeWheels,B=z.match(/D/),x=q.match(/a/i),D=q.match(/h/),K="datetime"==s?g.dateFormat+g.separator+g.timeFormat:"time"==s?g.timeFormat:g.dateFormat,T=new Date,H=g.stepHour,E=g.stepMinute,O=g.stepSecond,L=g.minDate||new Date(g.startYear,0,1),I=g.maxDate||new Date(g.endYear,11,31,23,59,59);k=k||K;if(s.match(/date/i)){a.each(["y","m","d"],function(a,c){b=z.search(RegExp(c,"i"));-1<b&&y.push({o:b,v:c})});y.sort(function(a,
b){return a.o>b.o?1:-1});a.each(y,function(a,b){t[b.v]=a});d={};for(f=0;3>f;f++)if(f==t.y){o++;d[g.yearText]={};var m=L.getFullYear(),P=I.getFullYear();for(b=m;b<=P;b++)d[g.yearText][b]=z.match(/yy/i)?b:(b+"").substr(2,2)}else if(f==t.m){o++;d[g.monthText]={};for(b=0;12>b;b++)m=z.replace(/[dy]/gi,"").replace(/mm/,9>b?"0"+(b+1):b+1).replace(/m/,b),d[g.monthText][b]=m.match(/MM/)?m.replace(/MM/,'<span class="dw-mon">'+g.monthNames[b]+"</span>"):m.replace(/M/,'<span class="dw-mon">'+g.monthNamesShort[b]+
"</span>")}else if(f==t.d){o++;d[g.dayText]={};for(b=1;32>b;b++)d[g.dayText][b]=z.match(/dd/i)&&10>b?"0"+b:b}n.push(d)}if(s.match(/time/i)){y=[];a.each(["h","i","s"],function(a,b){a=q.search(RegExp(b,"i"));-1<a&&y.push({o:a,v:b})});y.sort(function(a,b){return a.o>b.o?1:-1});a.each(y,function(a,b){t[b.v]=o+a});d={};for(f=o;f<o+3;f++)if(f==t.h){o++;d[g.hourText]={};for(b=0;b<(D?12:24);b+=H)d[g.hourText][b]=D&&0==b?12:q.match(/hh/i)&&10>b?"0"+b:b}else if(f==t.i){o++;d[g.minuteText]={};for(b=0;60>b;b+=
E)d[g.minuteText][b]=q.match(/ii/)&&10>b?"0"+b:b}else if(f==t.s){o++;d[g.secText]={};for(b=0;60>b;b+=O)d[g.secText][b]=q.match(/ss/)&&10>b?"0"+b:b}x&&(t.ap=o++,f=q.match(/A/),d[g.ampmText]={"0":f?"AM":"am",1:f?"PM":"pm"});n.push(d)}r.setDate=function(a,b,c,d){for(var e in t)this.temp[t[e]]=a[p[e]]?a[p[e]]():p[e](a);this.setValue(!0,b,c,d)};r.getDate=function(a){return e(a)};return{button3Text:g.showNow?g.nowText:void 0,button3:g.showNow?function(){r.setDate(new Date,!1,0.3,!0)}:void 0,wheels:n,headerText:function(){return v.formatDate(K,
e(r.temp),g)},formatResult:function(a){return v.formatDate(k,e(a),g)},parseValue:function(a){var b=new Date,c,d=[];try{b=v.parseDate(k,a,g)}catch(e){}for(c in t)d[t[c]]=b[p[c]]?b[p[c]]():p[c](b);return d},validate:function(b){var d=r.temp,e={y:L.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},f={y:I.getFullYear(),m:11,d:31,h:i(D?11:23,H),i:i(59,E),s:i(59,O),ap:1},k=!0,m=!0;a.each("y,m,d,ap,h,i,s".split(","),function(i,x){if(t[x]!==void 0){var o=e[x],r=f[x],n=31,l=c(d,x),q=a("ul",b).eq(t[x]),s,D;if(x=="d"){s=
c(d,"y");D=c(d,"m");r=n=32-(new Date(s,D,32)).getDate();B&&a("li",q).each(function(){var b=a(this),c=b.data("val"),d=(new Date(s,D,c)).getDay(),c=z.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+g.dayNames[d]+"</span>"):c.replace(/D/,'<span class="dw-day">'+g.dayNamesShort[d]+"</span>"))})}k&&L&&(o=L[p[x]]?L[p[x]]():p[x](L));m&&I&&(r=I[p[x]]?I[p[x]]():p[x](I));if(x!="y"){var y=a('li[data-val="'+o+'"]',q).index(),
v=a('li[data-val="'+r+'"]',q).index();a("li",q).removeClass("dw-v").slice(y,v+1).addClass("dw-v");x=="d"&&a("li",q).removeClass("dw-h").slice(n).addClass("dw-h")}l<o&&(l=o);l>r&&(l=r);k&&(k=l==o);m&&(m=l==r);if(g.invalid&&x=="d"){var j=[];g.invalid.dates&&a.each(g.invalid.dates,function(a,b){b.getFullYear()==s&&b.getMonth()==D&&j.push(b.getDate()-1)});if(g.invalid.daysOfWeek){var K=(new Date(s,D,1)).getDay(),C;a.each(g.invalid.daysOfWeek,function(a,b){for(C=b-K;C<n;C=C+7)C>=0&&j.push(C)})}g.invalid.daysOfMonth&&
a.each(g.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==D&&j.push(b[1]-1):j.push(b[0]-1)});a.each(j,function(b,c){a("li",q).eq(c).removeClass("dw-v")})}d[t[x]]=l}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getDate(b?c.temp:c.values)},setDate:function(b,c,d,e){void 0==c&&(c=!1);return this.each(function(){var f=a(this).mobiscroll("getInst");f&&f.setDate(b,c,d,e)})}}}};a.each(["date","time","datetime"],function(a,c){v.presets[c]=H;v.presetShort(c)});
v.formatDate=function(r,c,i){if(!c)return null;var i=a.extend({},F,i),e=function(a){for(var c=0;k+1<r.length&&r.charAt(k+1)==a;)c++,k++;return c},f=function(a,c,b){c=""+c;if(e(a))for(;c.length<b;)c="0"+c;return c},n=function(a,c,b,d){return e(a)?d[c]:b[c]},k,d="",g=!1;for(k=0;k<r.length;k++)if(g)"'"==r.charAt(k)&&!e("'")?g=!1:d+=r.charAt(k);else switch(r.charAt(k)){case "d":d+=f("d",c.getDate(),2);break;case "D":d+=n("D",c.getDay(),i.dayNamesShort,i.dayNames);break;case "o":d+=f("o",(c.getTime()-
(new Date(c.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":d+=f("m",c.getMonth()+1,2);break;case "M":d+=n("M",c.getMonth(),i.monthNamesShort,i.monthNames);break;case "y":d+=e("y")?c.getFullYear():(10>c.getYear()%100?"0":"")+c.getYear()%100;break;case "h":var o=c.getHours(),d=d+f("h",12<o?o-12:0==o?12:o,2);break;case "H":d+=f("H",c.getHours(),2);break;case "i":d+=f("i",c.getMinutes(),2);break;case "s":d+=f("s",c.getSeconds(),2);break;case "a":d+=11<c.getHours()?"pm":"am";break;case "A":d+=
11<c.getHours()?"PM":"AM";break;case "'":e("'")?d+="'":g=!0;break;default:d+=r.charAt(k)}return d};v.parseDate=function(n,c,i){var e=new Date;if(!n||!c)return e;var c="object"==typeof c?c.toString():c+"",f=a.extend({},F,i),v=f.shortYearCutoff,i=e.getFullYear(),k=e.getMonth()+1,d=e.getDate(),g=-1,o=e.getHours(),e=e.getMinutes(),y=0,t=-1,b=!1,p=function(a){(a=B+1<n.length&&n.charAt(B+1)==a)&&B++;return a},s=function(a){p(a);a=c.substr(q).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:
2)+"}"));if(!a)return 0;q+=a[0].length;return parseInt(a[0],10)},z=function(a,b,d){a=p(a)?d:b;for(b=0;b<a.length;b++)if(c.substr(q,a[b].length).toLowerCase()==a[b].toLowerCase())return q+=a[b].length,b+1;return 0},q=0,B;for(B=0;B<n.length;B++)if(b)"'"==n.charAt(B)&&!p("'")?b=!1:q++;else switch(n.charAt(B)){case "d":d=s("d");break;case "D":z("D",f.dayNamesShort,f.dayNames);break;case "o":g=s("o");break;case "m":k=s("m");break;case "M":k=z("M",f.monthNamesShort,f.monthNames);break;case "y":i=s("y");
break;case "H":o=s("H");break;case "h":o=s("h");break;case "i":e=s("i");break;case "s":y=s("s");break;case "a":t=z("a",["am","pm"],["am","pm"])-1;break;case "A":t=z("A",["am","pm"],["am","pm"])-1;break;case "'":p("'")?q++:b=!0;break;default:q++}100>i&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=("string"!=typeof v?v:(new Date).getFullYear()%100+parseInt(v,10))?0:-100));if(-1<g){k=1;d=g;do{f=32-(new Date(i,k-1,32)).getDate();if(d<=f)break;k++;d-=f}while(1)}o=new Date(i,k-1,d,-1==
t?o:t&&12>o?o+12:!t&&12==o?0:o,e,y);if(o.getFullYear()!=i||o.getMonth()+1!=k||o.getDate()!=d)throw"Invalid date";return o}})(jQuery);(function(a){a.mobiscroll.i18n.es=a.extend(a.mobiscroll.i18n.es,{dateFormat:"dd/mm/yy",dateOrder:"ddmmyy",dayNames:"Domingo,Lunes,Martes,Mi&#xE9;rcoles,Jueves,Viernes,S&#xE1;bado".split(","),dayNamesShort:"Do,Lu,Ma,Mi,Ju,Vi,S&#xE1;".split(","),dayText:"D&#237;a",hourText:"Horas",minuteText:"Minutos",monthNames:"Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre".split(","),monthNamesShort:"Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic".split(","),monthText:"Mes",
secText:"Segundos",timeFormat:"HH:ii",timeWheels:"HHii",yearText:"A&ntilde;o",nowText:"Ahora"})})(jQuery);(function(a){a.mobiscroll.themes.ios={defaults:{dateOrder:"MMdyy",rows:5,height:30,width:55,headerText:!1,showLabel:!1}}})(jQuery);(function(a){var v={inputClass:"",invalid:[],rtl:!1,group:!1,groupLabel:"Groups"};a.mobiscroll.presetShort("select");a.mobiscroll.presets.select=function(n){function F(a){return a?a.replace(/_/,""):""}function H(){var b,d=0,e={},g=[{}];c.group?(c.rtl&&(d=1),a("optgroup",i).each(function(b){e["_"+b]=a(this).attr("label")}),g[d]={},g[d][c.groupLabel]=e,b=f,d+=c.rtl?-1:1):b=i;g[d]={};g[d][y]={};a("option",b).each(function(){var b=a(this).attr("value");g[d][y]["_"+b]=a(this).text();a(this).prop("disabled")&&
t.push(b)});return g}var r=n.settings,c=a.extend({},v,r),i=a(this),e=i.val(),f=i.find('option[value="'+i.val()+'"]').parent(),C=f.index()+"",k=C,d,g=this.id+"_dummy";a('label[for="'+this.id+'"]').attr("for",g);var o=a('label[for="'+g+'"]'),y=void 0!==c.label?c.label:o.length?o.text():i.attr("name"),t=[],b={},p,s,z=r.readonly;c.group&&!a("optgroup",i).length&&(c.group=!1);c.invalid.length||(c.invalid=t);c.group?c.rtl?(p=1,s=0):(p=0,s=1):(p=-1,s=0);a("#"+g).remove();a("option",i).each(function(){b[a(this).attr("value")]=
a(this).text()});var q=a('<input type="text" id="'+g+'" value="'+b[i.val()]+'" class="'+c.inputClass+'" readonly />').insertBefore(i);c.showOnFocus&&q.focus(function(){n.show()});i.bind("change",function(){!d&&e!=i.val()&&n.setSelectVal([i.val()],true);d=false}).hide().closest(".ui-field-contain").trigger("create");n.setSelectVal=function(a,d,g){e=a[0];if(c.group){f=i.find('option[value="'+e+'"]').parent();k=f.index();n.temp=c.rtl?["_"+e,"_"+f.index()]:["_"+f.index(),"_"+e];if(k!==C){r.wheels=H();
n.changeWheel([s]);C=k+""}}else n.temp=["_"+e];n.setValue(true,d,g);if(d){q.val(b[e]);a=e!==i.val();i.val(e);a&&i.trigger("change")}};n.getSelectVal=function(a){return F((a?n.temp:n.values)[s])};return{width:50,wheels:void 0,headerText:!1,anchor:q,formatResult:function(a){return b[F(a[s])]},parseValue:function(){e=i.val();f=i.find('option[value="'+e+'"]').parent();k=f.index();return c.group&&c.rtl?["_"+e,"_"+k]:c.group?["_"+k,"_"+e]:["_"+e]},validate:function(b,d){if(d===p){k=F(n.temp[p]);if(k!==
C){f=i.find("optgroup").eq(k);k=f.index();e=(e=f.find("option").eq(0).val())||i.val();r.wheels=H();if(c.group){n.temp=c.rtl?["_"+e,"_"+k]:["_"+k,"_"+e];n.changeWheel([s]);C=k+""}}r.readonly=z}else e=F(n.temp[s]);var g=a("ul",b).eq(s);a.each(c.invalid,function(b,c){a('li[data-val="_'+c+'"]',g).removeClass("dw-v")})},onAnimStart:function(a){if(a===p)r.readonly=[c.rtl,!c.rtl]},onBeforeShow:function(){r.wheels=H();if(c.group)n.temp=c.rtl?["_"+e,"_"+f.index()]:["_"+f.index(),"_"+e]},onSelect:function(a){q.val(a);
d=true;i.val(F(n.values[s])).trigger("change");if(c.group)n.values=null},onCancel:function(){if(c.group)n.values=null},onChange:function(a){if(c.display=="inline"){q.val(a);d=true;i.val(F(n.temp[s])).trigger("change")}},onClose:function(){q.blur()},methods:{setValue:function(b,c,d){return this.each(function(){var e=a(this).mobiscroll("getInst");if(e)if(e.setSelectVal)e.setSelectVal(b,c,d);else{e.temp=b;e.setValue(true,c,d)}})},getValue:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getSelectVal?
c.getSelectVal(b):c.values}}}}})(jQuery);


/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(d,B,C){function G(a,b,h,c){if("d"!=h){var f=H.exec(b),e="auto"===a.css(h)?0:a.css(h),e="string"==typeof e?x(e):e;"string"==typeof b&&x(b);var c=!0===c?0:e,d=a.is(":hidden"),i=a.translation();"left"==h&&(c=parseInt(e,10)+i.x);"right"==h&&(c=parseInt(e,10)+i.x);"top"==h&&(c=parseInt(e,10)+i.y);"bottom"==h&&(c=parseInt(e,10)+i.y);!f&&"show"==b?(c=1,d&&a.css({display:"block",opacity:0})):!f&&"hide"==b&&(c=0);return f?(a=parseFloat(f[2]),f[1]&&(a=("-="===f[1]?-1:1)*a+parseInt(c,10)),a):c}}function I(a,
b,h,c,f,e,g,i){var j=a.data(q),j=j&&!u(j)?j:d.extend(!0,{},J),n=f;if(-1<d.inArray(b,y)){var o=j.meta,m=x(a.css(b))||0,l=b+"_o",n=f-m;o[b]=n;o[l]="auto"==a.css(b)?0+n:m+n||0;j.meta=o;g&&0===n&&(n=0-o[l],o[b]=n,o[l]=0)}return a.data(q,K(a,j,b,h,c,n,e,g,i))}function K(a,b,d,c,f,e,g,i,j){var n=!1,g=!0===g&&!0===i,b=b||{};b.original||(b.original={},n=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var i=b.meta,o=b.original,m=b.properties,q=b.secondary,p=l.length-1;0<=p;p--){var k=l[p]+
"transition-property",r=l[p]+"transition-duration",s=l[p]+"transition-timing-function",d=g?l[p]+"transform":d;n&&(o[k]=a.css(k)||"",o[r]=a.css(r)||"",o[s]=a.css(s)||"");q[d]=g?(!0===j||!0===z&&!1!==j)&&D?"translate3d("+i.left+"px, "+i.top+"px, 0)":"translate("+i.left+"px,"+i.top+"px)":e;m[k]=(m[k]?m[k]+",":"")+d;m[r]=(m[r]?m[r]+",":"")+c+"ms";m[s]=(m[s]?m[s]+",":"")+f}return b}function L(a){for(var b in a)if(("width"==b||"height"==b)&&("show"==a[b]||"hide"==a[b]||"toggle"==a[b]))return!0;return!1}
function u(a){for(var b in a)return!1;return!0}function x(a){v=a.match(/\D+$/);return parseFloat(a.replace(/px/i,""))}function M(a,b,h){var c=-1<d.inArray(a,N);if(("width"==a||"height"==a)&&b===parseFloat(h.css(a)))c=!1;return c}var N="top,right,bottom,left,opacity,height,width".split(","),y=["top","right","bottom","left"],l=["","-webkit-","-moz-","-o-"],O=["avoidTransforms","useTranslate3d","leaveTransforms"],H=/^([+-]=)?([\d+-.]+)(.*)$/,P=/([A-Z])/g,J={secondary:{},meta:{top:0,right:0,bottom:0,
left:0}},v="px",q="jQe",E=null,A=!1,t=(document.body||document.documentElement).style,w=void 0!==t.WebkitTransition?"webkitTransitionEnd":void 0!==t.OTransition?"oTransitionEnd":"transitionend",F=void 0!==t.WebkitTransition||void 0!==t.MozTransition||void 0!==t.OTransition||void 0!==t.transition,D="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,z=D;d.expr&&d.expr.filters&&(E=d.expr.filters.animated,d.expr.filters.animated=function(a){return d(a).data("events")&&d(a).data("events")[w]?!0:E.call(this,
a)});d.extend({toggle3DByDefault:function(){return z=!z},toggleDisabledByDefault:function(){return A=!A}});d.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var d=l.length-1;d>=0;d--){var c=a.getPropertyValue(l[d]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};d.fn.animate=function(a,b,h,c){var a=a||{},f=!(typeof a.bottom!=="undefined"||
typeof a.right!=="undefined"),e=d.speed(b,h,c),g=this,i=0,j=function(){i--;i===0&&typeof e.complete==="function"&&e.complete.apply(g[0],arguments)};return(typeof a.avoidCSSTransitions!=="undefined"?a.avoidCSSTransitions:A)===true||!F||u(a)||L(a)||e.duration<=0||d.fn.animate.defaults.avoidTransforms===true&&a.avoidTransforms!==false?B.apply(this,arguments):this[e.queue===true?"queue":"each"](function(){var b=d(this),c=d.extend({},e),g=function(){var c=b.data(q)||{original:{}},d={};if(a.leaveTransforms!==
true){for(var e=l.length-1;e>=0;e--)d[l[e]+"transform"]="";if(f&&typeof c.meta!=="undefined")for(var e=0,g;g=y[e];++e)d[g]=c.meta[g+"_o"]+v}b.unbind(w).css(c.original).css(d).data(q,null);a.opacity==="hide"&&b.css({display:"none",opacity:""});j.call(b)},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",
easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},p={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",k;for(k in a)if(d.inArray(k,O)===-1){var r=d.inArray(k,y)>-1,s=G(b,a[k],k,r&&a.avoidTransforms!==true);a.avoidTransforms!==true&&M(k,s,b)?I(b,k,c.duration,h,r&&a.avoidTransforms===true?s+v:s,r&&a.avoidTransforms!==true,f,a.useTranslate3d===true):p[k]=a[k]}b.unbind(w);if((k=b.data(q))&&!u(k)&&!u(k.secondary)){i++;b.css(k.properties);var t=k.secondary;setTimeout(function(){b.bind(w,
g).css(t)})}else c.queue=false;if(!u(p)){i++;B.apply(b,[p,{duration:c.duration,easing:d.easing[c.easing]?c.easing:d.easing.swing?"swing":"linear",complete:j,queue:c.queue}])}return true})};d.fn.animate.defaults={};d.fn.stop=function(a,b,h){if(!F)return C.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=d(this),f=c.data(q);if(f&&!u(f)){var e,g={};if(b){g=f.secondary;if(!h&&typeof f.meta.left_o!==void 0||typeof f.meta.top_o!==void 0){g.left=typeof f.meta.left_o!==void 0?f.meta.left_o:
"auto";g.top=typeof f.meta.top_o!==void 0?f.meta.top_o:"auto";for(e=l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}else if(!u(f.secondary)){var i=window.getComputedStyle(c[0],null);if(i)for(var j in f.secondary)if(f.secondary.hasOwnProperty(j)){j=j.replace(P,"-$1").toLowerCase();g[j]=i.getPropertyValue(j);if(!h&&/matrix/i.test(g[j])){e=g[j].replace(/^matrix\(/i,"").split(/, |\)$/g);g.left=parseFloat(e[4])+parseFloat(c.css("left"))+v||"auto";g.top=parseFloat(e[5])+parseFloat(c.css("top"))+v||"auto";for(e=
l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}}c.unbind(w).css(f.original).css(g).data(q,null)}else C.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

var page_id;window.Swipe=function(b,a){if(!b){return null}var c=this;this.options=a||{};this.index=this.options.startSlide||0;this.speed=this.options.speed||300;this.callback=this.options.callback||function(){};this.delay=this.options.auto||0;this.container=b;this.element=this.container.children[0];this.container.style.overflow="hidden";this.element.style.listStyle="none";this.element.style.margin=0;this.setup();this.begin();if(this.element.addEventListener){this.element.addEventListener("touchstart",this,false);this.element.addEventListener("touchmove",this,false);this.element.addEventListener("touchend",this,false);this.element.addEventListener("touchcancel",this,false);this.element.addEventListener("webkitTransitionEnd",this,false);this.element.addEventListener("msTransitionEnd",this,false);this.element.addEventListener("oTransitionEnd",this,false);this.element.addEventListener("transitionend",this,false);window.addEventListener("resize",this,false)}};Swipe.prototype={setup:function(){page_id=$(".ui-page-active").attr("id");this.slides=this.element.children;this.length=this.slides.length;if(this.length<2){return null}this.width=Math.ceil(("getBoundingClientRect" in this.container)?this.container.getBoundingClientRect().width:this.container.offsetWidth);if(this.width===0&&typeof window.getComputedStyle==="function"){this.width=window.getComputedStyle(this.container,null).width.replace("px","")}if(!this.width){return null}var b=this.container.style.visibility;this.container.style.visibility="hidden";this.element.style.width=Math.ceil(this.slides.length*this.width)+"px";var a=this.slides.length;while(a--){var c=this.slides[a];c.style.width=this.width+"px";c.style.display="table-cell";c.style.verticalAlign="top"}this.slide(this.index,0);this.container.style.visibility=b},slide:function(a,c){var b=this.element.style;if(c==undefined){c=this.speed}b.webkitTransitionDuration=b.MozTransitionDuration=b.msTransitionDuration=b.OTransitionDuration=b.transitionDuration=c+"ms";b.MozTransform=b.webkitTransform="translate3d("+-(a*this.width)+"px,0,0)";b.msTransform=b.OTransform="translateX("+-(a*this.width)+"px)";this.index=a},getPos:function(){return this.index},prev:function(a){this.delay=a||0;clearTimeout(this.interval);if(this.index){this.slide(this.index-1,this.speed)}else{this.slide(this.length-1,this.speed)}},next:function(a){this.delay=a||0;clearTimeout(this.interval);if(this.index<this.length-1){this.slide(this.index+1,this.speed)}else{this.slide(0,this.speed)}},begin:function(){var a=this;this.interval=(this.delay)?setTimeout(function(){a.next(a.delay)},this.delay):0},stop:function(){this.delay=0;clearTimeout(this.interval)},resume:function(){this.delay=this.options.auto||0;this.begin()},handleEvent:function(a){switch(a.type){case"touchstart":this.onTouchStart(a);break;case"touchmove":this.onTouchMove(a);break;case"touchcancel":case"touchend":this.onTouchEnd(a);break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"transitionend":this.transitionEnd(a);break;case"resize":this.setup();break}},transitionEnd:function(d){if(this.delay){this.begin()}this.callback(d,this.index,this.slides[this.index]);if(page_id=="publi"&&publi_ids.length!=0){function a(){switch(this.readyState){case this.OPENED:this.send();break;case this.DONE:if(this.status!=200){console.log("An error occurred.")}else{if(this.responseText){console.log(this.responseText)}else{if(this.responseXML){console.log("XML received")}else{console.log("No data received")}}}break}}var b=new XMLHttpRequest(),c=publi_ids[this.index];$("#ver_web a").attr("href",publi_urls[this.index]);$("#ver_web a").button();b.onreadystatechange=a;b.open("GET","http://mtec-conectados.com/anuncios/peticion.php?metodo=GetContador&IdAnuncio="+c)}},onTouchStart:function(a){this.start={pageX:a.touches[0].pageX,pageY:a.touches[0].pageY,time:Number(new Date())};this.isScrolling=undefined;this.deltaX=0;this.element.style.MozTransitionDuration=this.element.style.webkitTransitionDuration=0;a.stopPropagation()},onTouchMove:function(a){if(a.touches.length>1||a.scale&&a.scale!==1){return}this.deltaX=a.touches[0].pageX-this.start.pageX;if(typeof this.isScrolling=="undefined"){this.isScrolling=!!(this.isScrolling||Math.abs(this.deltaX)<Math.abs(a.touches[0].pageY-this.start.pageY))}if(!this.isScrolling){a.preventDefault();clearTimeout(this.interval);this.deltaX=this.deltaX/((!this.index&&this.deltaX>0||this.index==this.length-1&&this.deltaX<0)?(Math.abs(this.deltaX)/this.width+1):1);this.element.style.MozTransform=this.element.style.webkitTransform="translate3d("+(this.deltaX-this.index*this.width)+"px,0,0)";a.stopPropagation()}},onTouchEnd:function(c){var b=Number(new Date())-this.start.time<250&&Math.abs(this.deltaX)>20||Math.abs(this.deltaX)>this.width/2,a=!this.index&&this.deltaX>0||this.index==this.length-1&&this.deltaX<0;if(!this.isScrolling){this.slide(this.index+(b&&!a?(this.deltaX<0?1:-1):0),this.speed)}c.stopPropagation()}};








$().ready(function() {
	$("#commentForm").validate({debug:true});
	$("#example > ul").tabs();
});



















$().ready(function() {
	$("#commentForm").validate();
});





$().ready(function() {
	var handler = {
		focusin: function() {
			$(this).addClass("focus");
		},
		focusout: function() {
			$(this).removeClass("focus");
		}
	}
	$("#commentForm").delegate("focusin focusout", ":text, textarea", function(event) {
		/*
		this.addClass("focus").one("blur", function() {
			$(this).removeClass("focus");
		});
		*/
		handler[event.type].call(this, arguments);
	});
	$("#remove").click(function() {
		$("#commentForm").unbind("focusin");
	})
});


parent.onFirebugReady(document);



  google.load("jquery", "1");



$.fn.options = function(selector) {
	return this.each(function() {
		function container(select) {
			if (select.next().is(".option-container")) {
				return $(select).next();
			}
			return $('<select class="option-container" />').append(select.children()).insertAfter(select).hide();
		}
		var container = container($(this));
		$(this).empty().append(container.children(selector).clone());
	});
}

$(document).ready(function(){

	$("#State").hide()

	$("#Country").change(function() {
		var selected = this.options[this.selectedIndex].value;
		if (selected == "US") {
			$("#State").show().options(".state");
		} else if (selected == "CA") {
			$("#State").show().options(".province");
		} else {
			$("#State").hide();
		}
	}).change();


});




_uacct = "UA-1499652-1";
urchinTracker();






// only for demo purposes
$.validator.setDefaults({
	submitHandler: function() {
		alert("submitted!");
	}
});
	
$.metadata.setType("attr", "validate");

$(document).ready(function() {
	$("#form1").validate();
	$("#selecttest").validate();
});




_uacct = "UA-2623402-1";
urchinTracker();





// only for demo purposes
$.validator.setDefaults({
	submitHandler: function() {
		alert("submitted!");
	}
});
$.validator.messages.max = jQuery.format("Your totals musn't exceed {0}!");

$.validator.addMethod("quantity", function(value, element) {
	return !this.optional(element) && !this.optional($(element).parent().prev().children("select")[0]);
}, "Please select both the item and its amount.");

$().ready(function() {
	$("#orderform").validate({
		errorPlacement: function(error, element) {
			error.appendTo( element.parent().next() );
		},
		highlight: function(element, errorClass) {
			$(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
		}
	});
	
	var template = jQuery.format($("#template").val());
	function addRow() {
		$(template(i++)).appendTo("#orderitems tbody");
	}
	
	var i = 1;
	// start with one row
	addRow();
	// add more rows on click
	$("#add").click(addRow);
	
	// check keyup on quantity inputs to update totals field
	$("#orderform").delegate("keyup", "input.quantity", function(event) {
		var totals = 0;
		$("#orderitems input.quantity").each(function() {
			totals += +this.value;
		});
		$("#totals").attr("value", totals).valid();
	});
	
});




_uacct = "UA-2623402-1";
urchinTracker();





$.validator.setDefaults({
	submitHandler: function() { alert("submitted!"); }
});

$().ready(function() {
	// validate the comment form when it is submitted
	$("#commentForm").validate();

	// validate signup form on keyup and submit
	$("#signupForm").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			topic: {
				required: "#newsletter:checked",
				minlength: 2
			},
			agree: "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		}
	});

	// propose username by combining first- and lastname
	$("#username").focus(function() {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if(firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});

	//code to hide topic selection, disable for demo
	var newsletter = $("#newsletter");
	// newsletter topics are optional, hide at first
	var inital = newsletter.is(":checked");
	var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
	var topicInputs = topics.find("input").attr("disabled", !inital);
	// show when newsletter is checked
	newsletter.click(function() {
		topics[this.checked ? "removeClass" : "addClass"]("gray");
		topicInputs.attr("disabled", !this.checked);
	});
});




_uacct = "UA-2623402-1";
urchinTracker();






// only for demo purposes
$.validator.setDefaults({
	submitHandler: function() {
		alert("submitted! (skipping validation for cancel button)");
	}
});

$().ready(function() {
	$("#form1").validate({
		errorLabelContainer: $("#form1 div.error")
	});
	
	var container = $('div.container');
	// validate the form when it is submitted
	var validator = $("#form2").validate({
		errorContainer: container,
		errorLabelContainer: $("ol", container),
		wrapper: 'li',
		meta: "validate"
	});
	
	$(".cancel").click(function() {
		validator.resetForm();
	});
});




_uacct = "UA-2623402-1";
urchinTracker();






$(document).ready(function() {
	$("#commentForm").validate({meta: "validate"});
	$("#commentForm2").validate();
	$("#commentForm3").validate({
		messages: {
			email: {
				required: 'Enter this!'
			}
		}		
	});

});


_uacct = "UA-2623402-1";urchinTracker();




	// extend the current rules with new groovy ones
	
	// this one requires the text "buga", we define a default message, too
	$.validator.addMethod("buga", function(value) {
		return value == "buga";
	}, 'Please enter "buga"!');
	
	// this one requires the value to be the same as the first parameter
	$.validator.methods.equal = function(value, element, param) {
		return value == param;
	};
	
	$().ready(function() {
		var validator = $("#texttests").bind("invalid-form.validate", function() {
			$("#summary").html("Your form contains " + validator.numberOfInvalids() + " errors, see details below.");
		}).validate({
			debug: true,
			errorElement: "em",
			errorContainer: $("#warning, #summary"),
			errorPlacement: function(error, element) {
				error.appendTo( element.parent("td").next("td") );
			},
			success: function(label) {
				label.text("ok!").addClass("success");
			},
			rules: {
				number: {
					required:true,
					minlength:3,
					maxlength:15,
					number:true	
				},
				secret: "buga",
				math: {
					equal: 11	
				}
			}
		});
		
	});




_uacct = "UA-2623402-1";
urchinTracker();






	jQuery(function() {
		// show a simple loading indicator
		var loader = jQuery('<div id="loader"><img src="images/loading.gif" alt="loading..." /></div>')
			.css({position: "relative", top: "1em", left: "25em"})
			.appendTo("body")
			.hide();
		jQuery().ajaxStart(function() {
			loader.show();
		}).ajaxStop(function() {
			loader.hide();
		}).ajaxError(function(a, b, e) {
			throw e;
		});
		
		var v = jQuery("#form").validate({
			submitHandler: function(form) {
				jQuery(form).ajaxSubmit({
					target: "#result"
				});
			}
		});
		
		jQuery("#reset").click(function() {
			v.resetForm();
		});
	});




_uacct = "UA-2623402-1";
urchinTracker();









$.validator.setDefaults({
	submitHandler: function() { alert("submitted!"); },
	highlight: function(input) {
		$(input).addClass("ui-state-highlight");
	},
	unhighlight: function(input) {
		$(input).removeClass("ui-state-highlight");
	}
});

$().ready(function() {
	$.fn.themeswitcher && $('<div/>').css({
		position: "absolute",
		right: 10,
		top: 10
	}).appendTo(document.body).themeswitcher();
	
	// validate the comment form when it is submitted
	$("#commentForm").validate();
	
	// validate signup form on keyup and submit
	$("#signupForm").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			topic: {
				required: "#newsletter:checked",
				minlength: 2
			},
			agree: "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		}
	});
	
	// propose username by combining first- and lastname
	$("#username").focus(function() {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if(firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});
	
	//code to hide topic selection, disable for demo
	var newsletter = $("#newsletter");
	// newsletter topics are optional, hide at first
	var inital = newsletter.is(":checked");
	var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
	var topicInputs = topics.find("input").attr("disabled", !inital);
	// show when newsletter is checked
	newsletter.click(function() {
		topics[this.checked ? "removeClass" : "addClass"]("gray");
		topicInputs.attr("disabled", !this.checked);
	});
	
	$("#signupForm input:not(:submit)").addClass("ui-widget-content");
	
	$(":submit").button();
});




_uacct = "UA-2623402-1";
urchinTracker();





$(document).ready(function() {
	$("#commentForm").validate();
});





$(document).ready(function() {
	// validate signup form on keyup and submit
	var validator = $("#signupform").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2,
				remote: "users.php"
			},
			password: {
				required: true,
				minlength: 5
			},
			password_confirm: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true,
				remote: "emails.php"
			},
			dateformat: "required",
			terms: "required"
		},
		messages: {
			firstname: "Enter your firstname",
			lastname: "Enter your lastname",
			username: {
				required: "Enter a username",
				minlength: jQuery.format("Enter at least {0} characters"),
				remote: jQuery.format("{0} is already in use")
			},
			password: {
				required: "Provide a password",
				rangelength: jQuery.format("Enter at least {0} characters")
			},
			password_confirm: {
				required: "Repeat your password",
				minlength: jQuery.format("Enter at least {0} characters"),
				equalTo: "Enter the same password as above"
			},
			email: {
				required: "Please enter a valid email address",
				minlength: "Please enter a valid email address",
				remote: jQuery.format("{0} is already in use")
			},
			dateformat: "Choose your preferred dateformat",
			terms: " "
		},
		// the errorPlacement has to take the table layout into account
		errorPlacement: function(error, element) {
			if ( element.is(":radio") )
				error.appendTo( element.parent().next().next() );
			else if ( element.is(":checkbox") )
				error.appendTo ( element.next() );
			else
				error.appendTo( element.parent().next() );
		},
		// specifying a submitHandler prevents the default submit, good for the demo
		submitHandler: function() {
			alert("submitted!");
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		}
	});
	
	// propose username by combining first- and lastname
	$("#username").focus(function() {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if(firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});

});




_uacct = "UA-2623402-1";
urchinTracker();


$(document).ready(function() {
	$("<a href='#'>Show script used on this page</a><br/>").appendTo("body").click(function() {
		script.toggle();
		return false;
	});
	$("<a href='#'>Show serverside script</a>").appendTo("body").click(function() {
			serverscript.toggle();
			return false;
		});
	var script = $("<code class='mix'>").html( $("#demo").html() ).wrap("<pre></pre>").parent().hide().appendTo("body");
	var serverscript;
	$.get("users.phps", function(response) {
		serverscript = $("<pre>").hide().html( response ).appendTo("body");
	})
	
});






		
	$(function() {
		// highlight 
		var elements = $("input[type!='submit'], textarea, select");
		elements.focus(function(){
			$(this).parents('li').addClass('highlight');
		});
		elements.blur(function(){
			$(this).parents('li').removeClass('highlight');
		});
		
		$("#forgotpassword").click(function() {
			$("#password").removeClass("required");
			$("#login").submit();
			$("#password").addClass("required");
			return false;
		});
		
		$("#login").validate()
	});
	





	tinyMCE.init({
		mode : "textareas",
		theme : "simple",
		// update validation status on change
		onchange_callback: function(editor) {
			tinyMCE.triggerSave();
			$("#" + editor.id).valid();
		}
	});
	$(function() {
		var validator = $("#myform").submit(function() {
			// update underlying textarea before submit validation
			tinyMCE.triggerSave();
		}).validate({
			rules: {
				title: "required",
				content: "required"
			},
			errorPlacement: function(label, element) {
				// position error label after generated textarea
				if (element.is("textarea")) {
					label.insertAfter(element.next());
				} else {
					label.insertAfter(element)
				}
			}
		});
		validator.focusInvalid = function() {
			// put focus on tinymce on submit validation
			if( this.settings.focusInvalid ) {
				try {
					var toFocus = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []);
					if (toFocus.is("textarea")) {
						tinyMCE.get(toFocus.attr("id")).focus();
					} else {
						toFocus.filter(":visible").focus();
					}
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		}
	})








$(document).ready(function(){

	$("#recordClientPhone").mask("(999) 999-9999");
	$("#recordClientPhoneAlt").mask("(999) 999-9999");
	$("#recordClientZip").mask("99999");
	$("#recordPropertyZip").mask("99999");	
	$("#recordPurchaseZip").mask("99999");	

	// add * to required field labels
	$('label.required').append('&nbsp;<strong>*</strong>&nbsp;');

	// accordion functions
	var accordion = $("#stepForm").accordion(); 
	var current = 0;
	
	$.validator.addMethod("pageRequired", function(value, element) {
		var $element = $(element)
		function match(index) {
			return current == index && $(element).parents("#sf" + (index + 1)).length;
		}
		if (match(0) || match(1) || match(2)) {
			return !this.optional(element);
		}
		return "dependency-mismatch";
	}, $.validator.messages.required)
	
	var v = $("#cmaForm").validate({
		errorClass: "warning",
		onkeyup: false,
		onblur: false,
		submitHandler: function() {
			alert("Submitted, thanks!");
		}
	});
	
	// back buttons do not need to run validation
	$("#sf2 .prevbutton").click(function(){
		accordion.accordion("activate", 0);
		current = 0;
	}); 
	$("#sf3 .prevbutton").click(function(){
		accordion.accordion("activate", 1);
		current = 1;
	}); 
	// these buttons all run the validation, overridden by specific targets above
	$(".open2").click(function() {
	  if (v.form()) {
	    accordion.accordion("activate", 2);
	    current = 2;
	  }
	});
	$(".open1").click(function() {
	  if (v.form()) {
	    accordion.accordion("activate", 1);
	    current = 1;
	  }
	});
	$(".open0").click(function() {
	  if (v.form()) {
	    accordion.accordion("activate", 0);
	    current = 0;
	  }
	});
 
});






$(document).ready(function() {
	var tabs = $("#tabs").tabs();
	var validator = $("#signupform").validate({
		groups: {
			birthdate: "birthdateDay birthdateMonth birthdateYear"
		},
		errorPlacement: function(label, element) {
			if (/^birthdate/.test(element[0].name)) {
				label.insertAfter("#birthdateYear");
			} else {
				label.insertAfter(element);
			}
		}
	});
	
	// validate the other two selects when one changes to update the whole group
	var birthdaySelects = $("#birthdateGroup select").click(function() {
		birthdaySelects.not(this).valid();
	})
	
	// overwrite focusInvalid to activate tab with invalid elements
	validator.focusInvalid = function() {
		if( this.settings.focusInvalid ) {
			try {
				var focused = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible");
				tabs.tabs("select", tabs.find(">div").index(focused.parent().parent()));
				focused.focus();
			} catch(e) {
				// ignore IE throwing errors when focusing hidden elements
			}
		}
	};
});




_uacct = "UA-2623402-1";
urchinTracker();












_uacct = "UA-2623402-1";
urchinTracker();









_uacct = "UA-2623402-1";
urchinTracker();

