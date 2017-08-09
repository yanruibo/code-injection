













  function initialize() {
	  http:
    var latlng = new google.maps.LatLng(39.575403,2.624166); 
    var myOptions = {
      zoom: 17,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
  }







































!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");


















//esta funcion esconde el menu
var html;
var ventanaanchura=window.innerWidth;
var menuEstaAbajo = new Boolean(false);
var anterior=null;
var home=0;

var cal;
var photo= new Boolean(false);
  


$(document).on('mobileinit', function(){
	
});

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded, false);

document.addEventListener("deviceready", onDeviceReady, false);





//aqui detectar si hay conexión a internet...
function onDeviceReady(){
	$(document).on('backbutton', function(e) {
	//ocultarMenu();
	e.preventDefault(); // the default action of the event e should not be triggered. 
	if(photo==false){
    history.back(1); // load the previous window.location
	$(".volverButton").css("display","none");
	}
	
	}); 
	 
	 checkConnection();
	 menuEstaAbajo=false;
}


  function checkConnection() {
	  	
        var networkState = navigator.connection.type;
		if(networkState==Connection.NONE){
			//si no hay conexion da mensaje
			showAlert();
		}
        
		/*var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';*/

       
    }


$(document).on('ready',function(){
	 menuEstaAbajo=false;
	
	}
	
);

 // alert dialog dismissed
    function alertDismissed() {
        // do something
    }


 function showAlert() {
	
        navigator.notification.alert(
            'No dispones de conexión a internet!',  // message
             alertDismissed,         // callback
            'Muchas de las funcionalidades de la aplicación dejarán de estar disponibles',            // title
            'ok'                  // buttonName
        );
    }
var urlcontador=0;
function showUrl(url) {
// get url off of data attribute from item that was clicked
 if(urlcontador==0){
     var ref = window.open(encodeURI(url),'_blank', 'location=yes');
	 urlcontador=1;
	 ref.addEventListener('exit', function(event) { 
	 alert("holaaa");
	 urlcontador=0; 
	 });
	

 }
};



function loaded(){
	setHeight();
	myScroll = new iScroll('wrapper',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: false,
	bounce:false });
	home=1;
}

function setHeight() {
	var headerH = $('.header').height();
	wrapperH = window.innerHeight -headerH;
	$("#wrapper").css('height',wrapperH);
	$('#wrapper #scroller').css('height',wrapperH);
	$('#wrapper #scroller').css('width',wrapperH*6.6);
	cambio=false;
}


	
var myScroll;
var myScrollCalendario;
var myScrollNoticias;
var myScrollYouTube;
var myScrollGaleria;
var myScrollGaleriaP;
var myScrollComida;
var myScrollEnlaces;
var myScrollFelicitacion;
var myScrollNoticiasContenido;
var myScrollFormularioBaja;
var myScrollFormularioAusencia;
var myScrollFormularioCertificado;
var myScrollFormularioComedor;
var myScrollFormularioDomicilio;
var myScrollFormularioLocalizacion;


function loadedFormularioBaja(){
	myScrollFormularioBaja = new iScroll('wrapper_formularioBaja',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioBaja(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioBaja').css('height',altura);
	loadedFormularioBaja();
	setTimeout(function(){myScrollFormularioBaja.refresh();},1000);
}

function loadedFormularioAusencia(){
	myScrollFormularioAusencia = new iScroll('wrapper_formularioAusencia',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioAusencia(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioAusencia').css('height',altura);
	loadedFormularioAusencia();
	setTimeout(function(){myScrollFormularioAusencia.refresh();},1000);
}

function loadedFormularioCertificado(){
	myScrollFormularioCertificado = new iScroll('wrapper_formularioCertificado',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioCertificado(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioCertificado').css('height',altura);
	loadedFormularioCertificado();
	setTimeout(function(){myScrollFormularioCertificado.refresh();},1000);
}

function loadedFormularioComedor(){
	myScrollFormularioComedor = new iScroll('wrapper_formularioComedor',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioComedor(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioComedor').css('height',altura);
	loadedFormularioComedor();
	setTimeout(function(){myScrollFormularioComedor.refresh();},1000);
}

function loadedFormularioDomicilio(){
	myScrollFormularioDomicilio = new iScroll('wrapper_formularioDomicilio',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioDomicilio(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioDomicilio').css('height',altura);
	loadedFormularioDomicilio();
	setTimeout(function(){myScrollFormularioDomicilio.refresh();},1000);
}

function loadedFormularioFelicitacion(){
	myScrollFormularioFelicitacion = new iScroll('wrapper_formularioFelicitacion',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function setWrapperFormularioFelicitacion(){
	var altura=window.innerHeight - 105;
	$('#wrapper_formularioFelicitacion').css('height',altura);
	loadedFormularioFelicitacion();
	setTimeout(function(){myScrollFormularioFelicitacion.refresh();},1000);
}

function loadedCalendario(){
	wrapperH = window.innerHeight -300;
	$("#wrapper_calendario").css('height',wrapperH);
	myScrollCalendario = new iScroll('wrapper_calendario',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedNoticias(){
	var wrapperH=$(".contenidoLista").css('height');
	var margin=$(".imagenCabecera").css('height');
	$("#wrapper_noticias").css('height',wrapperH);
	margin=parseInt(margin,10)+5;
	$("#wrapper_noticias").css('margin-top',margin);
	myScrollNoticias = new iScroll('wrapper_noticias',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedYoutube(){
	var wrapperH=$(".contenidoLista").css('height');
	var margin=$(".imagenCabecera").css('height');
	$("#wrapper_youtube").css('height',wrapperH);
	margin=parseInt(margin,10)+5;
	$("#wrapper_youtube").css('margin-top',margin);
	myScrollYouTube = new iScroll('wrapper_youtube',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedGaleria(){
	var wrapperH=$(".contenidoLista").css('height');
	var margin=$(".imagenCabecera").css('height');
	$("#wrapper_galeria").css('height',wrapperH);
	margin=parseInt(margin,10)+5;
	$("#wrapper_galeria").css('margin-top',margin);
	myScrollGaleria = new iScroll('wrapper_galeria',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedGaleriaP(){
	var altura=window.innerHeight - 105;
	$('#wrapper_galeriaP').css('height',altura);
	myScrollGaleriaP = new iScroll('wrapper_galeriaP',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}



function loadedComidaTodo(){
	myScrollComida = new iScroll('wrapper_comidaTodo',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedEnlaces(){
	myScrollEnlaces = new iScroll('wrapper_enlaces',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedFelicitacion(){
	myScrollFelicitacion = new iScroll('wrapper_felicitacion',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function loadedNoticiasContenido(){
	myScrollNoticiasContenido = new iScroll('wrapper_contenidoNoticias',{
	zoom:false,
	momentum: true,
	hScrollbar: false,
	vScrollbar: true,
	bounce:false });
}

function cambiarHTML(html){
	ocultarMenu();
	$.mobile.changePage(html,{transition:"slideup"});
	$(".volverButton").css("display","none");
}

function setHeightContenido(idcontent){
	var altura=window.innerHeight - 95;
	$(idcontent).css('height',altura);
	$(idcontent).css('width',window.innerWidth-30);
}


function setWidthImagen(idimagen){
	var anchura=window.innerWidth;
	var altura=anchura * 0.47;
	var alturalista=window.innerHeight - 70 - altura;
	$(idimagen).attr("width",anchura);
	$(idimagen).attr("height",altura);
	$(".imagenCabecera").css('height',altura);
	$(".contenidoLista").css('height',alturalista);
}

function setWidthImagenContacto(idimagen){
	var anchura=window.innerWidth;
	var altura=anchura * 0.47;
	var alturalista=window.innerHeight - 70 - altura;
	$(idimagen).attr("width",anchura);
	$(idimagen).attr("height",altura);
	$(".imagenCabecera").css('height',altura);
	$(".contenidoLista").css('height',alturalista);
	$(".contenidoLista").css('margin-top',altura+5);
}

function setWidthImagenComedor(idimagen){
	loadedComidaTodo();
	var anchura=window.innerWidth;
	var altura=anchura * 0.31;
	$(idimagen).attr("width",anchura);
	$(idimagen).attr("height",altura);
	$(".imagenCabecera").css('height',altura);
	$("#wrapper_comidaTodo").css('margin-top',altura-10);
	var alturac=window.innerHeight- altura -65;
	$("#wrapper_comidaTodo").css('height',alturac);
	$('#wrapper_comidaTodo').css('width',anchura);
	
	setTimeout(function(){myScrollComida.refresh();},1000);
}

function setWrapperContenidoNoticias(){
	var altura=window.innerHeight - 105;
	$('#wrapper_contenidoNoticias').css('height',altura);
	loadedNoticiasContenido();
	setTimeout(function(){myScrollNoticiasContenido.refresh();},1000);
}



function setWrapperEnlaces(){
	var altura=window.innerHeight-105;
	$('#wrapper_enlaces').css('height',altura);
	$('#wrapper_enlaces #scroller').css('height',600);
	loadedEnlaces();
	setTimeout(function(){myScrollEnlaces.refresh();},1000);
}
function setWrapperFelicitacion(){
	var altura=window.innerHeight-105;
	$('#wrapper_felicitacion').css('height',altura);
	$('#wrapper_felicitacion #scroller').css('height',5500);
	loadedFelicitacion();
	setTimeout(function(){myScrollFelicitacion.refresh();},1000);
}

function setWidthClass(idclass){
	var anchura=window.innerWidth;
	$(idclass).css('width',anchura);
}
	
function setWidthMes(id){
	$(id).css('width',window.innerWidth);
};

function setWidthEventos(idcontent){
	var altura=window.innerHeight- 229 - 70;
	$(idcontent).css('height',altura);
}


function ocultarMenuAnimacion(){
	var $move = $('#move');
	$move.addClass('margin-out');
	menuEstaAbajo=false;
}
	
function cargarMenu(){
	$("#contenidoFijo").prepend('<div class="menuDesplegable" id="move" >'+
           '<div  id="cabeceraArriba" class="barra degradadoAzul">'+'</div>'+
		   '<div  id="contenedorMove">'+
           	'<ul  class="listaMenu" id="menuLista">'+
				'<li  class="lineaMenu ui-body-a" id="buttonHome">'+
                    '<div class="thumb" id="thumb0">'+
                        '<img alt="" src="css/images/menu/inicio.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">Inicio</div>'+
                    '</div>'+
                   	'</li>'+
					'<li  class="lineaMenu ui-body-a" id="buttonNoticias">'+
                    '<div class="thumb" id="thumb1">'+
                        '<img alt="" src="css/images/menu/noticias.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">Noticias</div>'+
                    '</div>'+
                   	'</li>'+
                    '<li class="lineaMenu ui-body-a" id="buttonCalendario">'+
                   	'<div class="thumb" id="thumb2">'+
                        '<img id="icoCalendario" alt="" src="css/images/menu/calendario.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">Calendario</div>'+
                    '</div>'+
                    '</li>'+
                    '<li class="lineaMenu ui-body-a" id="buttonGaleria">'+
                    '<div class="thumb" id="thumb3">'+
                        '<img alt="" src="css/images/menu/galeria.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">Galería</div>'+
                    '</div>'+
                    '</li>'+
                    '<li  class="lineaMenu ui-body-a" id="buttonYoutube">'+
                    '<div class="thumb" id="thumb4">'+
                        '<img alt="" src="css/images/menu/youtube.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">YouTube</div>'+
                    '</div>'+
                    '</li>'+
                    '<li  class="lineaMenu ui-body-a" id="buttonComida">'+
                    '<div class="thumb" id="thumb5">'+
                        '<img alt="" src="css/images/menu/menu.png" style="width: 47px" />'+
                        '<div class="textoIcono">Menú</div>'+
                    '</div>'+
                    '</li>'+
                    '<li  class="lineaMenu ui-body-a" id="buttonContacto">'+
                    '<div class="thumb" id="thumb6">'+
                        '<img alt="" src="css/images/menu/contacto.png" style="width: 40px; height: 40px" />'+
                        '<div class="textoIcono">Contacto</div>'+
                    '</div>'+
                    '</li>'+
                    '<li class="lineaMenu ui-body-a" id="buttonConecta">'+
                    	  '<div class="thumb" id="thumb6">'+
                        '<img alt="" src="css/images/menu/conecta.png" style="width:51px;" />'+
                        '<div class="textoIcono">Conecta</div>'+
                    '</div>'+
                    '</li>'+
                    
                '</ul>'+
				'</div>'+
                '<div class="barraAbsolute" id="barraMenu">'+
					'<div  id="cabecera" class="header degradadoAzul">'+
					
					'</div>'+
					'<div  id="logo" class="header-logo"></div>'+
               	'</div>'+
            '</div>'+
			'<div  class="volverButton" >'+
					'<span>Volver</span>'+
			'</div>'
		);
}




 
var apretado=false;

//el page before create lo llamamos antes que todos los plugins de javascript..
$(document).on('pagebeforecreate','#pageHome',function(){
	cargarMenu();
});
//------------------ listener de Menu -------------------------


$(document).on('pageinit','#pageHome',function(){
	
	
	/*$(document).on('vmouseup','#logo',function(event) {
		
			if (menuEstaAbajo==true){
			if(apretado==false){
			ocultarMenu();
			}else{
				apretado=false;
			}
			}else{
				
				mostrarMenu();
				
			}
		
	});*/
var topY = -283;
var bottomY = 0; 
var agarrado = false;
var volver=0;
$(document).on('vmousedown','#barraMenu',function(event){
	if(volver==0){
		$(document).on('click',".volverButton",function(){
		ocultarMenu();
		cambiarHTML(html);
		//$(".volverButton").data("href","");
	});
	
	volver=1;
	}


	lastY = event.pageY;
	$move = $("#move");
	agarrado = true
	event.preventDefault();
	$(document).on('vmousemove','#barraMenu', function(eventMove){
		if (parseInt($move.css('margin-top'), 10) <= bottomY && parseInt($move.css('margin-top'), 10) > topY-1){
			var signodesplazamiento = eventMove.pageY - lastY;
			if (signodesplazamiento > 0) {
				menuEstaAbajo = false;
				apretado=false;
				
			}else
				menuEstaAbajo = true;
				
			newMargin = parseInt($move.css('margin-top'), 10) + (eventMove.pageY - lastY);
			lastY = eventMove.pageY;
			$move.css('margin-top', newMargin); // Aquí haz el evento mientras va bajando
					apretado=true;	
		}

	});
});



$(document).on('vmouseup','#barraMenu', function(event){
	
	$(document).off("vmousemove",'#barraMenu'); 
	agarrado = false;
	var $move = $("#move");
		if (menuEstaAbajo==false) {
			if (parseInt($move.css('margin-top'))>= (topY+15)){
				$move.css('margin-top',bottomY);
				menuEstaAbajo = true;
				}else{
				$move.css('margin-top',topY); // Aquí haz el evento de que vuelva para arriba	
			}
		} else {
			if (parseInt($move.css('margin-top'))>= (bottomY-15)) {
				$move.css('margin-top',bottomY);
			} else {
				$move.css('margin-top', topY);
				menuEstaAbajo = false;
			}
		}
		
});
$(document).on('mouseleave','#barraMenu', function(event){
if (agarrado){ 
$("#barraMenu").trigger('vmouseup')}
apretado=false;
});
});



//  -------------------------------- Eventos -----------------------------
// Eventos del menú
$(document).on('click', '#buttonHome', function(){
	cambiarHTML('index.html');
}); 
$(document).on('click', '#buttonNoticias', function(){
	
	cambiarHTML('noticias.html');
});

$(document).on('click', '#buttonAlertas', function(){
	cambiarHTML('enlaces.html');
});

$(document).on('click', '#buttonCalendario', function(){
	cambiarHTML('calendario.html');
});

$(document).on('click','#buttonYoutube', function(){
	cambiarHTML('youtube.html');
});
$(document).on('click','#buttonComida', function(){
	cambiarHTML('comida.html');
});
$(document).on('click','#buttonContacto',function(){
	cambiarHTML('contacto.html');
});
$(document).on('click','#buttonGaleria', function(){
	cambiarHTML('galeria.html');
});

$(document).on('click','#buttonConecta', function(){
	cambiarHTML('enlaces.html');
});

$(document).on('click','#buttonComidaTodo', function(){
	cambiarHTML('comidaTodo.html');
	
});


$(document).on('click','#move', function(e) {
	e.stopPropagation();
});

function ocultarMenu(){
		var top = -283;
		$('#move').css('margin-top',top);
		menuEstaAbajo=false;
		
}

function mostrarMenu(){
	    ocultarItemsFoto();
		var bottom= 0;
		$('#move').css('margin-top',0);
		
		menuEstaAbajo=true;
}



last_click_time = new Date().getTime();
$(document).on('click',function(e){
    click_time = e['timeStamp'];
    if (click_time && (click_time - last_click_time) < 1000) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
    }else{
		if (menuEstaAbajo==true){
		ocultarMenu();
		return false;
		}
	}
    last_click_time = click_time;
});


//load wrapper de la HOME


$(document).on('pageinit','#pageYoutube',function(e){ 
	setWidthImagen('#imagenYoutube');
	loadedYoutube();
	$('#youTube').youTubeChannel({user:'ColegioSanCayetano'});
});


$(document).on('pageinit','#pageNoticias',function(){
	setWidthImagen('#imagenNoticias');
	loadedNoticias();
	google.load("feeds", "1",{callback:function(){initialize(10)}});
	
});
//esta fuera de notcias para no cargar dos veces..el onclik
$(document).on('click','#masnoticias', function(){
					$(".10mas").css('display', 'none');
					primeranoticia += 10;
					google.load("feeds", "1",{callback:function(){initialize(10)}});
	
});

$(document).on('pageinit','#pageContacto',function(){
	setWidthImagenContacto('#imagenContacto'); 
	
});


var cargargalerias = true;
var listasgalerias;
$(document).on('pageinit','#pageGaleria',function(){
setWidthImagen('#imagenGaleria');
loadedGaleria();
if (cargargalerias){
				
				$('.contenidoLista').prepend('<div class="loading"></div>');
				$.ajax({
			
				url: 'http://www.colegiosancayetano.com/index.php/noticias-y-actividades-2/523-visita-fotografica',
				}).done(function(html){
					    $('.loading').css('display','none');
						listasgalerias = html;
						enlacesgalerias();
						cargargalerias = false;
				});
				} else {
							enlacesgalerias(listasgalerias);
				}
				
				});
				
function enlacesgalerias(){
				var enlaces_patt = new RegExp(/<a[^>]*>*class\s*=\s*"toclink"[^>]*>(.*?)<\/a>/gi);
				var todas_patt = new RegExp(/limitstart/gi);
				var cuantos = 0;
				
				for ( i = enlaces_patt.exec(listasgalerias); i != null; i = enlaces_patt.exec(listasgalerias)){
				var enlace=i[0];
				cuantos+=1;
				var nombre=$(enlace).text();
				var valor = new RegExp('\"','g');
				nombre = nombre.replace(valor, ' '); 
				
				if (!todas_patt.test($(enlace).attr('href'))) {
				$('#Gallery').append('<li><a class="contentLink cargargaleriaFija" data-url="'+$(enlace).attr('href')+'" data-nombregaleria='+nombre+' ><h1 class="mt25">'+nombre+'</h1><img class="thumbail" src="icon.png" height="90"></img></a></li>'); 
				}
				}
				$("#pageGaleria #Gallery").listview('refresh');
				cuantos=cuantos-1;
				
				$('#wrapper_galeria #scroller').css('height',cuantos*87);
				setTimeout(function(){
							myScrollGaleria.refresh();
				},2000);
}

$(document).on('pagebeforecreate','#pageComidaCompleto',function(){
	cargarMenuEntero("#pageComidaCompleto");});

$(document).on('pageinit','#pageComidaCompleto',function(){
	setWidthImagenComedor('#imagenComidaCompleto'); 
	
});


$(document).on('collapse', '#pageComidaCompleto .ui-collapsible', function() {
	setTimeout(function(){myScrollComida.refresh();},50);

});

$(document).on('expand', '#pageComidaCompleto .ui-collapsible', function() {
	
	myScrollComida.scrollTo($(this).position().top, 0, 0);
	
});


$(document).on('pageinit','#pageEnlaces',function(){
	setWrapperEnlaces();	
});

$(document).on('pageinit','#pageFelicitacion',function(){
	//setWrapperFelicitacion();
	});

//funciones Noticias..
$(document).on('pagebeforeshow','#pageNoticiasContenido',function(prepage){
	$("h1").text("");
	$("#entryText").html("");
});


	


$(document).on('pageshow','#pageNoticiasContenido',function(){
	setWrapperContenidoNoticias();	
	var contenido=entries[selectedEntry].content;
	imagesNoticiasWidth();
	
	
	$(this).on('click','.contenido_noticia span a',function(event){
		
		url=$(this).attr('href');
		event.preventDefault();
		
		showUrl(url);
		//$(this).off( event );
	});
	
	
	$(this).on('click','.contenido_noticia p a',function(event){
		
		url=$(this).attr('href');
		event.preventDefault();
		
		showUrl(url);
		//$(this).off( event );
	});
	
		var galleryregex = new RegExp('{gallery}(.*?){/gallery}','gi');
		var pos = 0;
		for ( i = galleryregex.exec(contenido); i != null; i = galleryregex.exec(contenido)){
		pos++;
		contenido = contenido.replace(i[0],'<div><div class="button cargargaleria" data-ordengaleria="'+pos+'" data-nombregaleria="'+i[1]+'">Cargar galería</div></div>');
		}

$("#entryText").html(contenido);
});

$(document).on('pageshow','#pageBaja',function(){

	setWrapperFormularioBaja();	
});
$(document).on('pageshow','#pageAusencia',function(){
	setWrapperFormularioAusencia();	
});
$(document).on('pageshow','#pageCertificado',function(){
	setWrapperFormularioCertificado();	
});
$(document).on('pageshow','#pageComedor',function(){
	setWrapperFormularioComedor();	
});
$(document).on('pageshow','#pageDomicilio',function(){
	setWrapperFormularioDomicilio();	
});
$(document).on('pageshow','#pageFelicitacion',function(){
	setWrapperFormularioFelicitacion();	
});



$(document).one('pageshow','#pageHome',function(){
	//le ponemos un tiempo
	setTimeout(function(){
	ocultarMenuAnimacion();},1000);
	if(home==1){
	myScroll.refresh();
	}
});
	

$(document).on('click','#menuFoto',function(){
	mostrarItemsFoto();
});



//cambia la imagen 180
$(document).on('click','.itemInstalacion',function(){
	seleccionarItem($(this).attr('id'));
});

$(document).on('click','.contentLink', function(){
	selectedEntry = $(this).data("entryid");
});

$(document).on("mozAnimationEnd webkitAnimationEnd msAnimationEnd oAnimationEnd  animationend",'#move',function(){
			if($("#move").hasClass('margin-out')){
				$("#move").removeClass('margin-out');
				$("#move").addClass('margin-out-final');
				menuEstaAbajo=false;
			}
});

var src="";
$(document).on('click','.videoLink',function(){
	var videoid= $(this).data("idvideo");
	src="https://www.youtube.com/embed/"+videoid+"?autoplay=1&cc_load_policy=1";
	
	
});


$(document).on('pageshow','#pageYoutubePlayer',function(){
	$("#frameVideo").attr("src",src);
});



$(document).on('pageinit','#pageContactoLocalizacion',function(){
	inicializarMapa();
});


// Eventos
$(document).on('click','#infantilC',function(){
	seleccionarMenu('infantilC');
});
$(document).on('click','#mayoresC',function(){
	seleccionarMenu('mayoresC');
});


//menu
$(document).on('click','#flechaizquierda',function(){
	
	 menuizquierda();
});
$(document).on('click','#flechaderecha',function(){
	 menuderecha();
});

//calendario

//calendario

$(document).on('click','.cal-evento', function(){
			var numEventosCal = 0;
			if(anterior){
			anterior.removeClass('cal-click');
			}
			$(this).addClass('cal-click');
			$('.cal-evento').each(function(index, value){$('.evento'+$(value).attr('id')).css('display','none');});
			$('.evento'+$(this).attr('id')).css('display','inherit'); // Muestra los eventos de este día
			console.log($('.evento'+$(this).attr('id')))
			var num=$(this).attr('id');
			num = num.substring(1,num.length);
			var height=cuantos[num];
			height=height*82;
			
			$('#wrapper_calendario #scroller').css('height',height);
			
			setTimeout(function () {
				myScrollCalendario.refresh();
			},20);
			
			anterior=$(this);
});



$(document).on('pagebeforeshow','#pageCalendario',function(event){
	//para meter la propiedad window inner height..
	var keyframes2 = '@-webkit-keyframes mymarginright-calendario { from {margin-left:-'+window.innerWidth+'px;} to {margin-left:0px;} }'
	var keyframes = '@-webkit-keyframes mymarginleft-calendario { from {margin-left:0px;} to {margin-left:-'+window.innerWidth+'px;} }'
	if (document.styleSheets[2].cssRules) {
		index = document.styleSheets[2].cssRules.length;
		document.styleSheets[2].insertRule(keyframes, index);
		document.styleSheets[2].insertRule(keyframes2, index);
	}
	google.load("feeds", "1",{callback:function(){cargarJFeeds()}});
	loadedCalendario();
	setWidthMes("#calendario");
});

var eventos = [];

$(document).on('click', '#eventoContenido', function(){
	
	selectedEvent = $(this).data("eventid");
	//cambiarHTML('eventosContenido.html');
});

// Eventos de eventosContenido.html

$(document).on('pageinit','#pageEventosContenido', function() {
	$('.tituloEvento').text(eventos[selectedEvent].titulo);
	$('#fechaEvento').text(eventos[selectedEvent].fecha);
	$('#descripcionEvento').text(eventos[selectedEvent].descripcion);
});


$(document).on('pagebeforeshow','#pageComida',function(event,data){
cargarDiaMenu();
});

$(document).on('pageinit', '#pageComida', function(){
var keyframes = '@-webkit-keyframes mymarginleft-comida { from {margin-left:0px;} to {margin-left:-'+window.innerWidth+'px;} }'
var keyframes2 = '@-webkit-keyframes mymarginright-comida { from {margin-left:-'+window.innerWidth+'px;} to {margin-left:0px;} }'
if (document.styleSheets[2].cssRules) {
index = document.styleSheets[2].cssRules.length;
document.styleSheets[2].insertRule(keyframes, index);
document.styleSheets[2].insertRule(keyframes2, index);

}
//setHeightContenido('.contenido_wrapper');	
});

$(document).on('click','#infantilC',function(){
seleccionarMenu('infantilC');
});
$(document).on('click','#mayoresC',function(){
seleccionarMenu('mayoresC');
});


function borrarActivoTipo(){
	$("#comidaPeques").removeClass('ui-btn-active');
	$("#comidaMayores").removeClass('ui-btn-active');
}

$(document).on('click', '#comidaPeques', function(){
GLOBALCATEGORIA = 'pequesC';
borrarActivoTipo();
$("#comidaPeques").addClass('ui-btn-active');
refreshDia();
});
$(document).on('click', '#comidaMayores', function(){
GLOBALCATEGORIA = 'mayoresC';
borrarActivoTipo();
$("#comidaMayores").addClass('ui-btn-active');
refreshDia();
});

function borrarActivoDia(){
	$("#comidaAyer").removeClass('ui-btn-active');
	$("#comidaHoy").removeClass('ui-btn-active');
	$("#comidaManana").removeClass('ui-btn-active');
}
$(document).on('click', '#comidaAyer', function(){
borrarActivoDia()
$("#comidaAyer").addClass('ui-btn-active');
fecha = diamenos(new Date());
refreshDia();
});
$(document).on('click', '#comidaHoy', function(){
borrarActivoDia()
$("#comidaHoy").addClass('ui-btn-active');
fecha = new Date();
refreshDia();
});
$(document).on('click', '#comidaManana', function(){
borrarActivoDia()
$("#comidaManana").addClass('ui-btn-active');
fecha = diamas(new Date());
refreshDia();
});


$(document).on('click', '#comidaAnt', function() {
if (!menumoviendose) {
menumoviendose = true;
cargarDiaMenuAnt();
}
});
$(document).on('click', '#comidaSig', function() {
if (!menumoviendose) {
menumoviendose = true;
cargarDiaMenuSig();
}
});
$(document).on('swipeleft', '#wrapper_comida', function() {

if (!menumoviendose) {
menumoviendose = true;
cargarDiaMenuSig();
}
});


$(document).on('swiperight', '#wrapper_comida', function() {
if (!menumoviendose) {
		menumoviendose = true;
		cargarDiaMenuAnt();
	}
});

$(document).on('pageinit',"[data-role='page']",function(){
	
	if($(this).data("href")){
		html=$(this).data("href");
		$(".volverButton").css("display","block");
		}
});

function resetFormulario(id){
	var validator = $(id).validate();
	validator.resetForm();
}

function comprobarCertificado(){
var  submitClicked = true;
	  $('#chronoform_Certificados').validate({
           rules: {
           'nombre': 'required',
           'curso': 'required',
           'email': { required: true, email: true },
           'fecha': 'required',
		   'relacion': 'required',
           'nombresolicitante': 'required',
		   'dni': 'required',
		 	},
       messages: {
		   'nombre': 'Debe ingresar el nombre',
		   'nombresolicitante': 'Debe ingresar el nombre del solicitante',
           'dni':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'curso': 'Debe seleccionar un curso',
		   
       },
    
        showErrors: function(form){
		    this.defaultShowErrors();
			  if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      				
				   }
				   submitClicked = false;
			   }
		   setTimeout(function(){myScrollFormularioCertificado.refresh();},1000);
	   },
       //errorContainer: $('#errores'),
       submitHandler: function(form){
          	$('input[type=submit]').button('disable');
	$('input[type=reset]').button('disable');
		   $.post("http://www.colegiosancayetano.com/index.php/secretaria/oficina-virtual/certificados?chronoform=Certificados&event=submit", $("#chronoform_Certificados").serialize(),function(respuesta){
			    var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
				 }else{
					  alert('Su solicitud ha sido enviada correctamente!');
				 }
				 $('input[type=submit]').button('enable');
			$('input[type=submit]').button('refresh');
			  $('input[type=reset]').button('enable');
			$('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			$('input[type=submit]').button('refresh');
			  $('input[type=reset]').button('enable');
			$('input[type=reset]').button('refresh');
		  
		   });
       }
    });
}

function comprobarFelicitacion(){

	var  submitClicked = true;
		
	  $('#chronoform_SugerenciasReclamacionesFelicitaciones').validate({
           rules: {
           'tipo': 'required',
           'documento': 'required',
           'numero': 'required',
           'email': { required: true, email: true },
           'nombre': 'required',
           'curso': 'required',
		   'telefono': 'required',
		   'texto': 'required',
		 	},
       messages: {
		   'tipo': 'Debe indicar que tipo de solicitud desea realizar',
           'nombre': 'Debe ingresar el nombre',
           'documento': 'Debe ingresar el tipo de documento',
           'numero':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'telefono': 'Debe ingresar un número de telefono',
           'curso': 'Debe seleccionar un curso',
		   'texto': 'Debe escribir el motivo de su comunicación'
       },
      
       showErrors: function(form){
		    this.defaultShowErrors();
			alert("adios"+submitClicked);
			  if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      			
				   }
				    submitClicked = false;
			  }
			   
		   setTimeout(function(){myScrollFormularioFelicitacion.refresh();},1000);
		   
	   },
       //errorContainer: $('#errores'),
       submitHandler: function(form){
		   $('input[type=submit]').button('disable');
		   $('input[type=reset]').button('disable');
        	$.post("http://www.colegiosancayetano.com/index.php/secretaria/reclamaciones-sugerencias-y-felicitaciones?chronoform=SugerenciasReclamacionesFelicitaciones&event=submit", $("#chronoform_SugerenciasReclamacionesFelicitaciones").serialize(),function(respuesta){
			    var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
				 }else{
					  alert('Su comunicación ha sido enviada correctamente!');
				 }
				  $('input[type=submit]').button('enable');
			$('input[type=submit]').button('refresh');
			  $('input[type=reset]').button('enable');
			$('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			$('input[type=submit]').button('refresh');
			  $('input[type=reset]').button('enable');
			$('input[type=reset]').button('refresh');
		   });
       }
    });
}

function comprobarBaja(){
var  submitClicked = true;
$('#chronoform_BajasExtraescolares').validate({
           rules: {
           'nombre': 'required',
           'curso': 'required',
           'operacion': 'required',
           'email': { required: true, email: true },
           'actividad': 'required',
        	'nombresolicitante': 'required',
		   'dni': 'required',
		 	},
       messages: {
		   'operacion': 'Debe indicar que tipo de operacion desea gestionar',
           'nombre': 'Debe ingresar el nombre',
		   'nombresolicitante': 'Debe ingresar el nombre del solicitante',
           'dni':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'actividad': 'Debe especificar la actividad',
           'curso': 'Debe seleccionar un curso',
		   
       },
	   showErrors: function(form){
		   this.defaultShowErrors();
			  if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      				
				   }
				   submitClicked = false;
			   }
		    setTimeout(function(){myScrollFormularioBaja.refresh();},1000);
		},
       submitHandler: function(form){
		   $('input[type=submit]').button('disable');
		   $('input[type=reset]').button('disable');
         $.post("http://www.colegiosancayetano.com/index.php/secretaria/oficina-virtual/bajas-actividades-extraescolares?chronoform=BajasExtraescolares&event=submit",$("#chronoform_BajasExtraescolares").serialize(),function(respuesta){
			 console.log(respuesta);
			 var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
				 }else{
					  alert('Su solicitud ha sido enviada correctamente!');
				 }
				  $('input[type=submit]').button('enable');
				  $('input[type=submit]').button('refresh');
			      $('input[type=reset]').button('enable');
			      $('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			    $('input[type=submit]').button('refresh');
			    $('input[type=reset]').button('enable');
			    $('input[type=reset]').button('refresh');
		   });
		//function
       }
	 //validate
    });
//function
}

function comprobarComedor(){
	var  submitClicked = true;
	  $('#chronoform_AltasBajasComedor').validate({
           rules: {
           'nombre': 'required',
           'curso': 'required',
           'operacion': 'required',
           'email': { required: true, email: true },
           'fecha': 'required',
		   'relacion': 'required',
           'nombresolicitante': 'required',
		   'dni': 'required',
		 	},
       messages: {
		   'operacion': 'Debe indicar que tipo de operacion desea gestionar',
           'nombre': 'Debe ingresar el nombre',
		   'nombresolicitante': 'Debe ingresar el nombre del solicitante',
           'dni':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'operacion': 'Debe especificar la opreación que desea realizar',
           'curso': 'Debe seleccionar un curso',
		   
       },
     
        showErrors: function(form){
		  this.defaultShowErrors();
			  if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      				
				   }
				   submitClicked = false;
			   }
		   setTimeout(function(){myScrollFormularioComedor.refresh();},1000);
	   },
       //errorContainer: $('#errores'),
       submitHandler: function(form){
           $('input[type=submit]').button('disable');
		   $('input[type=reset]').button('disable');
		   $.post("http://www.colegiosancayetano.com/index.php/secretaria/oficina-virtual/altas-bajas-del-comedor?chronoform=AltasBajasComedor&event=submit", $("#chronoform_AltasBajasComedor").serialize(),function(respuesta){
			 var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
							 }else{
					  alert('Su solicitud ha sido enviada correctamente!');
				 }
				  $('input[type=submit]').button('enable');
				  $('input[type=submit]').button('refresh');
			      $('input[type=reset]').button('enable');
			      $('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			    $('input[type=submit]').button('refresh');
			    $('input[type=reset]').button('enable');
			    $('input[type=reset]').button('refresh');
		   });
		//function
       }
	 //validate
    });
//function
}

function comprobarAusencia(){
	var  submitClicked = true;
	  $('#chronoform_Ausencias').validate({
           rules: {
           'nombre': 'required',
           'curso': 'required',
           'email': { required: true, email: true },
           'nombresolicitante': 'required',
		   'dni': 'required',
		 	},
       messages: {
		   'nombre': 'Debe ingresar el nombre',
		   'nombresolicitante': 'Debe ingresar el nombre del solicitante',
           'dni':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'curso': 'Debe seleccionar un curso',
		   
       },
       debug: true,
         showErrors: function(form){
			  this.defaultShowErrors();
			  if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      				
				   }
				   submitClicked = false;
			   }
		   setTimeout(function(){myScrollFormularioAusencia.refresh();},1000);
		  
	   },
       //errorContainer: $('#errores'),
       submitHandler: function(form){
          $('input[type=submit]').button('disable');
		  $('input[type=reset]').button('disable');
		   $.post("http://www.colegiosancayetano.com/index.php?option=com_chronoforms&chronoform=Ausencias&event=submit", $("#chronoform_Ausencias").serialize(),function(respuesta){
			    var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
							 }else{
					  alert('Su comunicación ha sido enviada correctamente!');
				 }
				  $('input[type=submit]').button('enable');
				  $('input[type=submit]').button('refresh');
			      $('input[type=reset]').button('enable');
			      $('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			    $('input[type=submit]').button('refresh');
			    $('input[type=reset]').button('enable');
			    $('input[type=reset]').button('refresh');
		   });
       }
    });
}

function comprobarDomicilio(){
	var  submitClicked = true;
	  $('#chronoform_CambiosdeDomicilioyTelefono').validate({
           rules: {
           'nombre': 'required',
           'codigopostal': 'required',
		   'fecha': 'required',
           'email': { required: true, email: true },
           'nombresolicitante': 'required',
		   'dni': 'required',
		 	},
       messages: {
		   'codigopostal': 'Debe introducir el código postal',
           'nombre': 'Debe ingresar el nombre',
		   'nombresolicitante': 'Debe ingresar el nombre del solicitante',
           'dni':  'Debe ingresar el número de documento de identidad',
           'email': { required: 'Debe ingresar un correo electrónico', email: 'Debe ingresar el correo electrónico con el formato correcto. Por ejemplo: u@localhost.com' },
           'fecha': 'Debe especificar la fecha del cambio',
          
		   
       },
      
    	   showErrors: function(form){
			   this.defaultShowErrors();
			   if (submitClicked==true){
				   if(this.numberOfInvalids()>0){
					alert("compruebe los campos obligatorios");
      				}
				   submitClicked = false;
			   }
			
		   setTimeout(function(){myScrollFormularioDomicilio.refresh();},1000);
		   
	   },
       //errorContainer: $('#errores'),
       submitHandler: function(form){
           $('input[type=submit]').button('disable');
		   $('input[type=reset]').button('disable');
		   $.post("http://www.colegiosancayetano.com/index.php/secretaria/oficina-virtual/cambios-de-domicilio-y-telefono?chronoform=CambiosdeDomicilioyTelefono&event=submit", $("#chronoform_CambiosdeDomicilioyTelefono").serialize(),function(respuesta){
			  var errorcaptcha = /¡El código de verificación es erróneo!/
				 if (errorcaptcha.test(respuesta)){
					 errorcaptcha.lastIndex = 0;
					alert('¡El código de verificación es erróneo!');
					console.log(errorcaptcha.exec(respuesta));
					$('#captcha img').attr('src','http://www.colegiosancayetano.com/components/com_chronoforms/chrono_verification.php?imtype=1?timestamp='+ new Date().getTime());
				 			 }else{
					  alert('Su solicitud ha sido enviada correctamente!');
				 }
				  $('input[type=submit]').button('enable');
				  $('input[type=submit]').button('refresh');
			      $('input[type=reset]').button('enable');
			      $('input[type=reset]').button('refresh');
		   }).fail(function(){
			   alert("fallo de conexión");
			    $('input[type=submit]').button('enable');
			    $('input[type=submit]').button('refresh');
			    $('input[type=reset]').button('enable');
			    $('input[type=reset]').button('refresh');
		   });
       }
    });
}



// Noticias
var active = true;
$(document).on('click', '.cargargaleria', function(event) {
	
	if(active==false){
      
	}else{
	active = false;
	var $this = $(this);
	var contenido = entries[selectedEntry].content;
	var nombregaleria = $(this).data('nombregaleria');
	var specificgallery = new RegExp('{gallery}'+nombregaleria+'{/gallery}', 'i');	
	if (specificgallery.test(contenido)){
		$this.prepend('<div><img src="css/images/generales/loading.gif"></img></div>');
		specificgallery.lastIndex = 0;	
			var actualH= $('#wrapper_contenidoNoticias #scroller').css('height');
				actualH=parseInt(actualH,10);
		
		var cuantos=0;
		var galeria = '<ul class="gallery">';
			$.ajax({
				//url: 'w/index.htm',
								url: entries[selectedEntry].link + '?start=' + $(this).data('ordengaleria'),
								}).done(
								
								function(html){
									active = true;
								var imagenes = html;
								var imagenes_patt= new RegExp("/images/"+ nombregaleria +"/.*?\.(jpg|jpeg)", "gi");
								console.log(nombregaleria);
								for ( i = imagenes_patt.exec(imagenes); i != null; i = imagenes_patt.exec(imagenes)){
								console.log(nombregaleria);
								cuantos+=1;
								galeria += '<li><a href="http://www.colegiosancayetano.com' + i[0] + '" rel="external"><img src="http://www.colegiosancayetano.com'+i[0]+'"  ></a></li>';
								
								}
				galeria += '</ul>';
				imagenes_patt.lastIndex = 0;
				$this.parent().append(galeria);
				$this.remove();
				var myPhotoSwipe = $(".gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false, allowUserZoom:true });
				
					myPhotoSwipe.addEventHandler(window.Code.PhotoSwipe.EventTypes.onShow, function(e){
					 photo=true;
					 $(".volverButton").css("display","none");
				});
				
				myPhotoSwipe.addEventHandler(window.Code.PhotoSwipe.EventTypes.onHide, function(e){
					 photo=false;
					 $(".volverButton").css("display","block");
				});
			
				cuantos=Math.ceil(cuantos/3);
					var altura=$('.gallery li').css('height');
				
				altura=parseInt(altura,10);
				
				altura+=8;
				var margin=$('.gallery li').css('margin');
				margin=parseInt(margin,10);
				margin=cuantos*margin;
			
				cuantos=cuantos*altura + actualH+margin;
				
				$('#wrapper_contenidoNoticias #scroller').css('height',cuantos);
			setTimeout(function(){
				myScrollNoticiasContenido.refresh();
				
			},20);

			});
			
	}
	
	}
});
var nombregaleria;
var web;
$(document).on('click', '.cargargaleriaFija', function() {
	nombregaleria = $(this).data('nombregaleria');
	web= "http://www.colegiosancayetano.com"+$(this).data('url');
	cambiarHTML('galleryPlantilla.html');
});


$(document).on('pageinit','#pagePlantillaG',function(){
	var imagenes_patt = new RegExp(/<a[^>]*>*class\s*=\s*"sig-link"[^>]*>/gi);
	var cuantos=0;
	var galeria = '<ul class="gallery">';
	$('#cargarGaleriaFija').prepend('<div class="loading"></div>');
			$.ajax({
								url: web,
								}).done(function(html){
								 $('.loading').css('display','none');
								var imagenes = html;
						for ( i = imagenes_patt.exec(imagenes); i != null; i = imagenes_patt.exec(imagenes)){
								cuantos+=1;
								var imagen=$(i[0]).attr('href');
								galeria += '<li><a href="http://www.colegiosancayetano.com' + imagen + '" rel="external"><img src="http://www.colegiosancayetano.com'+imagen+'"  ></a></li>';
								
								}
				galeria += '</ul>';
				imagenes_patt.lastIndex = 0;
				
				$('#cargarGaleriaFija').append(galeria);
				
				var myPhotoSwipe = $(".gallery a").photoSwipe({enableMouseWheel: false , enableKeyboard: false });
				
				myPhotoSwipe.addEventHandler(window.Code.PhotoSwipe.EventTypes.onShow, function(e){
					 photo=true;
					 $(".volverButton").css("display","none");
				});
				
				myPhotoSwipe.addEventHandler(window.Code.PhotoSwipe.EventTypes.onHide, function(e){
					 photo=false;
					 $(".volverButton").css("display","block");
				});
				
				cuantos=Math.ceil(cuantos/3);
				
				var altura=$('.gallery li').css('height');
				altura=parseInt(altura,10);
				altura+=8;
				altura=cuantos*altura;
				var margin=$('.gallery li').css('margin');
				margin=parseInt(margin,10);
				margin=cuantos*margin;
				
				cuantos=altura+margin+100;
				
					loadedGaleriaP();
				$('#wrapper_galeriaP #scroller').css('height',cuantos);
					setTimeout(function(){
						myScrollGaleriaP.refresh();
						
					},20);
			
			});
			
});


 
$(document).one('swipe', '#wrapper', function() {
	$('.mano').fadeOut("slow");
});

$(document).on('click', '.gotourl', function() {
  // get url off of data attribute from item that was clicked
    var url = $(this).data("url"); 
	//alert(url);
 	var ref = window.open(url, '_blank', 'location=yes');
	ref.addEventListener('loadstart', function() { alert(event.url); });

}); 



var myScroll;
var myScroll2;
var myScroll3;

function setHeight() {
	var headerH = document.getElementById('header').offsetHeight;
	var footerH = document.getElementById('footer').offsetHeight;
	var wrapperH = window.innerHeight - headerH - footerH-50;
	document.getElementById('wrapper').style.height = wrapperH + 'px';
	document.getElementById('scroller').style.height = wrapperH + 'px';
}

function setHeightNoticias(){
	var headerH = document.getElementById('header').offsetHeight;
	var wrapperH = (window.inner-height - headerH)*0.7;
	document.getElementById('wrapper_noticias').style_height = wrapperH + 'px';
	document.getElementById('scroller').style_height = wrapperH + 'px';
}

function loaded() {
	setHeight();
	myScroll = new iScroll('wrapper',{zoom:true});
	myScroll2 = new iScroll('wrapper_2');
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

	
var TITLE = "Noticias Sancayetano";
//RSS url
var RSS = "http://movil.webandbreakfastideas.com/caya.xml";
//Stores entries
var entries = [];
var selectedEntry = "";

$(".contentLink").live("click", function() {
	
	selectedEntry = $(this).data("entryid");
});

	
function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
    });
    $("#linksList").html(s);
    $("#linksList").listview("refresh");
	alert("hola");
	myScroll3=new iScroll('wrapper_noticias');
	setHeightNoticias();
	
}

//Listen for Google's library to load
function initialize() {
	console.log('ready to use google');
	var feed = new google.feeds.Feed(RSS);
	feed.setNumEntries(10);
	$.mobile.showPageLoadingMsg();
	feed.load(function(result) {
		$.mobile.hidePageLoadingMsg();
		console.dir(result);
		if(!result.error) {
			entries = result.feed.entries;
			localStorage["entries"] = JSON.stringify(entries);
			renderEntries(entries);
		} else {
			console.log("Error - "+result.error.message);
			if(localStorage["entries"]) {
				$("#status").html("Using cached version...");
				entries = JSON.parse(localStorage["entries"]);
				renderEntries(entries);
			} else {
				$("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			}
		}
	});
}

	
$("#noticiasPage").live("pageinit", function() {
	$("h1", this).text(TITLE);
	google.load("feeds", "1",{callback:initialize});
});
	
$("#noticiasPage").live("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
		$("h1", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
});

$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
	var contentHTML = "";
	
	contentHTML += entries[selectedEntry].content;
	
	contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Read Entry on Site</a>';
	
	var patt_table = new RegExp(/<table[^>]*>/gi);
	var patt_tr = new RegExp(/<tr[^>]*>/gi);
	var patt_td = new RegExp(/<td[^>]*>/gi);
	var patt_ctable = new RegExp(/<\/table>/gi);
	var patt_ctd = new RegExp(/<\/td>/gi);
	var patt_ctr = new RegExp(/<\/tr>/gi);

	contentHTML=contentHTML.replace(patt_table,"<div class=\"tabla_noticia\">").replace(patt_td,"<div>").replace(patt_tr,"<div>").replace(patt_ctable,"</div>").replace(patt_ctd,"</div>").replace(patt_ctr,"</div>");

	$("#entryText",this).html(contentHTML);
	imagesNoticiasWidth();
	
	//en el content tengo que buscar la imagen..sacarlas, hacerlas de tamaño normal y centrarla..
});

function imagesNoticiasWidth(){
	$('.tabla_noticia img').css("width", window.innerWidth*0.8);
}

function mostrar(){
	// Muestra/esconde el Menú de navegación
  if ($('#dropdown').is(":hidden")) {
	
  $('#dropdown').slideDown('fast', function() {
	  $('.menuArrow').css("background-position","-178px");
    // Animation complete.
  });
  
  }else{
	  
	  $('#dropdown').slideUp('fast', function() {
    // Animation complete.
	 $('.menuArrow').css("background-position","-214px");
  });
	  
  }
}

var seleccionado="presentacion";

function mostrarItems(){

if ($(".menuFotos").is(":hidden")) {
   $(".menuFotos").css("display","block");
   $(".menuFotos").animate({"bottom": "+=30px"}, "slow");
}else{
	
	$(".menuFotos").animate({"bottom": "-=30px"}, "slow",function(){
		$(".menuFotos").css("display","none");
	});
}
};


/*--------------- PLAYER DE YOUTUBE -----------------------*/

	
	function createCarousel(jqe, videos, options) {
      //car es la listview...
	   var car=$("#videoList");
	   var limite=0;
	     //para cada video creamos un thumbail...
        $.each(videos, function(i,video) {
            options.thumbnail(car, video, options);
			limite+=1;
        });
		car.listview('refresh');
		
		var height=limite+1;
			height=height*83;
			$('#wrapper_youtube #scroller').css('height',height);
			setTimeout(function(){
				myScrollYouTube.refresh();
			},20);
	}
    
    function createThumbnail(jqe, video, options) {
        var imgurl = video.thumbnails[0].url;
        var img = $('img[src="' + imgurl + '"]');
		//que no ejecute lo demás eficiencia...
        if (img.length !== 0) return;
		var s = '<li>'+
				'<a href="youtubePlayer.html"  class="videoLink" data-idvideo="'+video.id+'" >'+
				'<h1 class="tituloVideo petit mt20">'+ video.title+'</h1>'+  //aqui le ponemos el titulo
				'<img class="thumbail" src='+imgurl+' height="95"></img>'+
				'</a>'+
			  '</li>';
		 jqe.append(s);
	}
    var defoptions = {
        autoplay: false,
        user: null,
        carousel: createCarousel,
       	thumbnail: createThumbnail,
    };
    $.fn.extend({
        youTubeChannel: function(options) {
            var md = $(this);
            md.addClass('youtube');
            md.addClass('youtube-channel');
            var allopts = $.extend(true, {}, defoptions, options);
            allopts.maindiv = md;
            $.getJSON('http://gdata.youtube.com/feeds/users/' + allopts.user + '/uploads?alt=json-in-script&format=5&callback=?', null, function(data) {
                var feed = data.feed;
                var videos = [];
                $.each(feed.entry, function(i, entry) {
                    var video = {
                        title: entry.title.$t,
                        id: entry.id.$t.match('[^/]*$'),
						thumbnails: entry.media$group.media$thumbnail
                    };
                    videos.push(video);
                });
                allopts.allvideos = videos;
                allopts.carousel(md, videos, allopts);
              
            });
        }
    });
	






//-- funciones de menu -- 
var menumoviendose = false;
var GLOBALCATEGORIA="mayoresC";
var fecha = new Date();
//---- Menú preescolar y escoleta ----
 var plunes1 = new Array("Arroz a la cubana", "Salchichas de pollo con verduritas y guisantes", "Fruta de temporada");
var pmartes1 = new Array("Macarrones bolognesa", "Merluza rebozada con ensalada mixta", "Yogurt");
var pmiercoles1 = new Array("Sopa de pasta", "Croquetas caseras de jamón con ensalada", "Fruta de temporada");
var pjueves1 = new Array("Puré de verduras frescas", "Hamburguesa casera con patatas fritas", "Helado");
var pviernes1 = new Array("Lentejas con verduritas", "Palitos de pollo rebozados con patatas fritas", "Fruta de temporada");

 
var plunes2 = new Array("Tortelinis con tomate", "Merluza a la romana con patatas fritas", "Yogurt");
var pmartes2 = new Array("Sopa de cocido", "Albóndigas caseras con tomate y verduritas y puré de patata", "Fruta de temporada");
var pmiercoles2 = new Array("Espaguetis con tomate y atún", "Merluza al horno con ensalada mixta", "Fruta de temporada");
new Array("Crema de verduras naturales", "Tortilla española, ensalada mixta y jamón york", "Natillas o flan casero");
var pjueves2 = new Array("Potaje de garbanzos", "Escalope de lomo empanado con patatas y verduritas", "Melocotón en almíbar");
var pviernes2 = new Array("Crema de verduras naturales", "Tortilla española, ensalada mixta y jamón york", "Natillas o flan casero");
 
var plunes3 = new Array("Sopa de pasta", "Croquetas caseras de jamón y pollo con patatas fritas", "Yogurt");
var pmartes3 = new Array("Lentejas estofadas con patata y zanahoria", "Merluza a la romana, ensalada mixta", "Fruta de temporada");
var pmiercoles3 = new Array("Crema de verduras naturales", "Pizza casera de jamón y champiñones y ensalada", "Fruta de temporada");
var pjueves3 = new Array("Canelones caseros", "Pechuga de pollo empanada con menestra de verduras", "Natillas de vainilla");
var pviernes3 = new Array("Macarrones bolognesa", "Hamburguesa casera con ensalada", "Fruta de temporada");
 
var plunes4 = new Array("Arroz de pescado", "Pechuga de pollo con ensalada", "Yogurt");
var pmartes4 = new Array("Sopa de cocido", "Tortilla de coliflor y calabacín", "Ensalada variada con jamón york", "Fruta de temporada");
var pmiercoles4 = new Array("Paella de carne y verduras", "Croquetas caseras de pescado con tomate aliñado", "Natillas");
var pjueves4 = new Array("Crema de verduras naturales", "Lenguado a la romana con patatas fritas", "Fruta de temporada");
var pviernes4 = new Array("Macarrones con tomate y atún", "Muslitos de pollo asados con patatas fritas", "Bizcocho casero de chocolate");

var sabado=new Array("El fin de semana no hay menú escolar.");
var domingo=new Array("El fin de semana no hay menú escolar.");
 
var psemana1 = new Array(domingo,plunes1, pmartes1, pmiercoles1, pjueves1, pviernes1,sabado);
var psemana2 = new Array(domingo,plunes2, pmartes2, pmiercoles2, pjueves2, pviernes2,sabado);
var psemana3 = new Array(domingo,plunes3, pmartes3, pmiercoles3, pjueves3, pviernes3,sabado);
var psemana4 = new Array(domingo,plunes4, pmartes4, pmiercoles4, pjueves4, pviernes4,sabado);
 
var pmenu = new Array(psemana1, psemana2, psemana3, psemana4);
 
// ---- Menú mayores ----
var mlunes1 = new Array("Arroz a la cubana", "Croquetas caseras de jamón o calamares, verduras salteadas, ensalada mixta", "Postre variado");
var mmartes1 = new Array("Macarrones con queso y tomate", "Bistec de ternera a la plancha con champiñones, ensalada mixta", "Postre variado");
var mmiercoles1 =  new Array("Ensalada de pasta", "Filete de merluza, patatas fritas y cocidas salteadas,ensalada mixta","Postre variado");
var mjueves1 = new Array("Paella valenciana", "Lomo adobado, ensalada mixta, verduras salteadas", "Postre variado");
var mviernes1 = new Array("Lentejas con verduras", "Pollo asado, tumbet, ensalada mixta, verduras hervidas", "Postre variado");
 
var mlunes2 = new Array("Tortelinis con tomate", "Palitos caseros de pollo con ensalada y verduras salteadas", "Postre variado");
var mmartes2 = new Array("Sopa de cocido y judías blancas", "Albóndigas de ternera con guarnición, ensalada mixta, verduras salteadas", "Postre variado");
var mmiercoles2 =  new Array("Espaguetis carbonara y boloñesa", "Merluza al horno ó boquerones a la andaluza, verduras salteadas, ensalada mixta", "Postre variado");
var mjueves2 = new Array("Sopa Arroz o Sopas mallorquinas", "Lomo empanado, patatas fritas, verduras salteadas", "Postre variado");
var mviernes2 = new Array("Garbanzos aliñados y crema de verduras", "Tortilla española con jamón y queso, ensalada variada", "Postre variado");
 
var mlunes3 = new Array("Sopa de pasta", "Pizza de jamón y champiñones, croquetas caseras de pescado, ensalada mixta", "Postre variado");
var mmartes3 = new Array("Lentejas estofadas", "Pollo asado, verduras salteadas, ensalada mixta", "Postre variado");
var mmiercoles3 = new Array("Crema de verduras frescas", "Bistec de ternera a la plancha con patatas fritas", "Postre variado");
var mjueves3 =  new Array("Arroz a la cubana", "Merluza empanada y salmón a la plancha, ensalada mixta, verduras salteadas", "Postre variado");
var mviernes3 = new Array("Canelones gratinados y sopa de cocido", "Hamburguesa casera con cebolla, ensalada mixta", "Postre variado");
 
var mlunes4 = new Array("Arroz de pescado", "Pechuga de pollo a la parrilla, ensalada mixta", "Postre variado");
var mmartes4 = new Array("Crema de calabaza y calabacín", "Tortilla española Jamón y queso, ensalada mixta, verduras salteadas", "Postre variado");
var mmiercoles4 = new Array("Paella ciega", "Hamburguesa de ternera, Cebolla y patatas fritas, verduras salteadas, ensalada mixta", "Postre variado");
var mjueves4 = new Array("Espaguetis carbonara ó Raviolis con carne", "Lenguado rebozado, maiz y guisantes, ensalada mixta", "Postre variado");
var mviernes4 =new Array("Canelones y sopa de pasta", "Salchichas de ave y patatas fritas, ensalada mixta", "Postre variado");

var sabado=new Array("El fin de semana no hay menú escolar.");
var domingo=new Array("El fin de semana no hay menú escolar.");
 
var msemana1 = new Array(domingo,mlunes1, mmartes1, mmiercoles1, mjueves1, mviernes1,sabado);
var msemana2 = new Array(domingo,mlunes2, mmartes2, mmiercoles2, mjueves2, mviernes2,sabado);
var msemana3 = new Array(domingo,mlunes3, mmartes3, mmiercoles3, mjueves3, mviernes3,sabado);
var msemana4 = new Array(domingo,mlunes4, mmartes4, mmiercoles4, mjueves4, mviernes4,sabado);
 
var mmenu = new Array(msemana1, msemana2, msemana3, msemana4);

function diamas(afecha){
	afecha.setDate(afecha.getDate()+1);
	
	return afecha;
}

function diamenos(afecha){
	afecha.setDate(afecha.getDate()-1)
	return afecha;
}

function osPS(fecha){
	// Offset Primera Semana. Calcula en qué día del mes empieza la primera semana.
	var afecha = new Date(fecha);
	afecha.setDate(1);
	
			return 8-afecha.getDay()-7;
	
}

function cargarDiaMenu(id){
 // Devuelve el panel de comida de un día. No funciona si el día es en fin de semana (getDay() == 0 o 6)
	var diaSemana = fecha.getDay(); // Le quito 1 porque para .getDay() 0 == domingo 1 == lunes ...

	/*if(diaSemana== -1){
		diaSemana=0;
	}
	
	if(diaSemana== 5){
		diaSemana=0;
	}*/
	
	var diaMes = fecha.getDate();

	var isemana = 0;
	if (!id)
		id = 'diaMenu';
	if (GLOBALCATEGORIA == 'pequesC'){
		menu = pmenu;
	} else {
			menu = mmenu;
	}
	var nombreDia = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sábado'];
	var primerdia = new Date('2013',8,2);
	
	isemana = Math.floor((fecha.getTime() - primerdia.getTime())/86400000/7%4);
	var primerplato = menu[isemana][diaSemana][0];
	var segundoplato = menu[isemana][diaSemana][1];
	var postre = menu[isemana][diaSemana][2];
	
	if(diaSemana==0 || diaSemana==6){
		var item='<div class="menuItem " id="'+id+'">'+
				'<div class="menuItemContent menuItemWeekend">'+
				'<div class="cabeceraFecha">'+
                        '<div  class="textoIcoDia icoCocinero"><span class="diaMenu">'+nombreDia[diaSemana]+'</span></div>'+
                    '</div>'+
				'<div class="platos">'+
				'<div class="platoTitulo">'+
					
					
				'</div>'+
				'<div class="menuWeekend">'+
				'<div class="platoSpanWeekend textoIcoComida">El fin de semana</div>'+
				'<div class="textoIcoComida">no hay menú escolar.</div>'+
				'</div>'+
				
				
				
				'</div>'+
			'</div>';
	}else{

	var item='<div class="menuItem" id="'+id+'">'+
				'<div class="menuItemContent">'+
				'<div class="cabeceraFecha">'+
                        '<div  class="textoIcoDia icoCocinero"><span class="diaMenu">'+nombreDia[diaSemana]+'</span></div>'+
                    '</div>'+
				'<div class="platos">'+
				'<div class="platoTitulo">'+
					'<div id="platoDiv" class="icon_primerplato"></div>'+
					'<div class="platoSpan textoIcoComida">Primer Plato</div>'+
				'</div>'+
				'<div class="plato primerplato">'+primerplato+'</div>'+
				'<div class="platoTitulo">'+
					'<div id="platoDiv" class="icon_segundoplato"></div><div class="platoSpan textoIcoComida">Segundo Plato</div>'+
				'</div>'+
				'<div class="plato segundoplato">'+segundoplato+'</div>'+
				'<div  class="platoTitulo">'+
				'<div id="platoDiv" class="icon_postre"></div><div class="platoSpan textoIcoComida">Postre</div>'+
				'</div>'+
				'<div class="plato postre">'+postre+'</div>'+
				'</div>'+
			'</div>';
	}
	if (id == 'diaMenuSig' || id == 'diaMenu') {
		$("#wrapper_comida").append(item);
	} else {
		$("#wrapper_comida").prepend(item);
		$('#diaMenuAnt').css('margin-left', -window.innerWidth);
		
	}
	$('#'+id).addClass("contenidoComida");
	setWidthClass('.contenidoComida'); 

}

function cargarDiaMenuSig(){
	
		diamas(fecha);
	
	cargarDiaMenu('diaMenuSig');
	$('#diaMenu').addClass('margin-left-comida');
}
function cargarDiaMenuAnt(){
	
		diamenos(fecha);
	
	cargarDiaMenu('diaMenuAnt');
	$('#diaMenuAnt').addClass('margin-right-comida');
}

function refreshDia(){
	$("#wrapper_comida").empty();
	cargarDiaMenu();
}

function cargarMenuEntero(id){
if(GLOBALCATEGORIA=="mayoresC"){
	var todo='<div  data-role="collapsible-set" data-inset="false">'
	for(i=0;i<4;i++){
		var semanaHeader;
		if(i==0){semanaHeader="Primera Semana"};
		if(i==1){semanaHeader="Segunda Semana"};
		if(i==2){semanaHeader="Tercera Semana"};
		if(i==3){semanaHeader="Cuarta Semana"};
		todo+='<div id="my-collapsible'+i+'" data-role="collapsible" class="liCollapse">'+
        '<h3>'+semanaHeader+'</h3>';
	    todo+='<div class="contenidoCollapse" id="#semana_'+i+'">';
		for(j=1;j<6;j++){
		var diasemana="";
		if(j==1){diasemana="Lunes";}
		if(j==2){diasemana="Martes";}
		if(j==3){diasemana="Miércoles";}
		if(j==4){diasemana="Jueves";}
		if(j==5){diasemana="Viernes";}
		
		var primerplato=mmenu[i][j][0];
		var segundoplato=mmenu[i][j][1];
		var postre=mmenu[i][j][2];
		todo+='<div class="menuItemContent" id="diaMenu_'+(i+1)+'_'+(j+1)+'">'+
				 '<div class="cabeceraFecha">'+
                        '<div  class="textoIcoDia icoCocinero"><span class="diaMenu">'+diasemana+'</span></div>'+
                    '</div>'+
					'<div class="platos">'+
                    '<div class="platoTitulo">'+
                        '<div id="platoDiv" class="icon_primerplato"></div>'+
						'<div class="platoSpan textoIcoComida">Primer Plato</div>'+
                    '</div>'+
                    '<div class="plato primerplato">'+primerplato+'</div>'+
                    '<div class="platoTitulo">'+
                        '<div id="platoDiv" class="icon_segundoplato"></div><div class="platoSpan textoIcoComida">Segundo Plato</div>'+
                    '</div>'+
                    '<div class="plato segundoplato">'+segundoplato+'</div>'+
                    '<div  class="platoTitulo">'+
                    '<div id="platoDiv" class="icon_postre"></div><div class="platoSpan textoIcoComida">Postre</div>'+
                    '</div>'+
                    '<div class="plato postre">'+postre+'</div>'+
					'</div>'+
            	'</div>';
		}
		todo+='</div>'
		todo+='</div>'
	}
	
	    todo+='</div>'
		
		$("#todoComida").append(todo);
	
}else{


	var todo='<div data-role="collapsible-set" data-inset="false">'
	for(i=0;i<4;i++){
		var semanaHeader;
		if(i==0){semanaHeader="Primera Semana"};
		if(i==1){semanaHeader="Segunda Semana"};
		if(i==2){semanaHeader="Tercera Semana"};
		if(i==3){semanaHeader="Cuarta Semana"};
		todo+='<div data-role="collapsible" class="liCollapse">'+
        '<h3>'+semanaHeader+'</h3>';
	    todo+='<div class="contenidoCollapse" id="#semana_'+i+'">';
		for(j=1;j<6;j++){
		var diasemana="";
		if(j==1){diasemana="Lunes";}
		if(j==2){diasemana="Martes";}
		if(j==3){diasemana="Miércoles";}
		if(j==4){diasemana="Jueves";}
		if(j==5){diasemana="Viernes";}
		
		var primerplato=pmenu[i][j][0];
		var segundoplato=pmenu[i][j][1];
		var postre=pmenu[i][j][2];
		todo+='<div class="menuItemContent" id="diaMenu_'+(i+1)+'_'+(j+1)+'">'+
				 '<div class="cabeceraFecha">'+
                        '<div  class="textoIcoDia icoCocinero"><span class="diaMenu">'+diasemana+'</span></div>'+
                    '</div>'+
					'<div class="platos">'+
                    '<div class="platoTitulo">'+
                        '<div id="platoDiv" class="icon_primerplato"></div>'+
						'<div class="platoSpan textoIcoComida">Primer Plato</div>'+
                    '</div>'+
                    '<div class="plato primerplato">'+primerplato+'</div>'+
                    '<div class="platoTitulo">'+
                        '<div id="platoDiv" class="icon_segundoplato"></div><div class="platoSpan textoIcoComida">Segundo Plato</div>'+
                    '</div>'+
                    '<div class="plato segundoplato">'+segundoplato+'</div>'+
                    '<div  class="platoTitulo">'+
                    '<div id="platoDiv" class="icon_postre"></div><div class="platoSpan textoIcoComida">Postre</div>'+
                    '</div>'+
                    '<div class="plato postre">'+postre+'</div>'+
					'</div>'+
            	'</div>';
		}
		todo+='</div>'
		todo+='</div>'
	}
	
	    todo+='</div>'
		
		$("#todoComida").append(todo);
}
}

// Eventos
/*$(document).on('click','#todoComida',function(){
	window.location=$(this).attr('id');
	alert("gola");
});*/

$(document).on("mozAnimationEnd webkitAnimationEnd msAnimationEnd oAnimationEnd animationend mozAnimationEnd",'#diaMenu',function(){
			if($("#diaMenu").hasClass('margin-left-comida')){
				$("#diaMenu").remove();
				$("#diaMenuSig").attr('id', 'diaMenu');
				menumoviendose = false;
			}
});

$(document).on("mozAnimationEnd webkitAnimationEnd msAnimationEnd oAnimationEnd animationend mozAnimationEnd",'#diaMenuAnt',function(){
			if ($("#diaMenuAnt").hasClass('margin-right-comida')){
				$("#diaMenuAnt").css('margin-left', 0);
				$("#wrapper_comida").css('margin-left', 0);
				$('#diaMenuAnt').removeClass('margin-right-comida');
				$("#diaMenu").remove();
				$("#diaMenuAnt").attr('id', 'diaMenu');
				menumoviendose = false;
			}
});



// Funciones de NOTICIAS
//----------- RSSSSS ----------
var TITLE = "Noticias Sancayetano";
var RSS = "http://www.colegiosancayetano.com/index.php/quienes-somos/noticias-y-actividades?format=feed&type=rss&start=";
var entries = [];
var entries_local = [];
var selectedEntry = "";
var primeranoticia = 0;
var height = 0;
//aqui el link que hemos clickado
function renderEntries(start,limite) {
	var patt_img=new RegExp(/"http:\/\/www.colegiosancayetano.com\/images\/.*?\.jpg"/);
    var s;
	s='';
	var rutaimagen;
	for (var i = start, limit = limite; i < limit; i++){
		entries[i]=entries_local[i];
		
		modificarHTML(i);
		if (patt_img.test(entries_local[i].content)){
			rutaimagen=patt_img.exec(entries_local[i].content);
		} else {
			rutaimagen = 'icon.png';
		}
		var fecha=entries_local[i].publishedDate.split(" ");
		fecha=fecha[1]+" "+fecha[2]+" "+fecha[3];
		fecha=fecha.replace(",","");
		var autor=entries_local[i].author.split("(");
		autor=autor[1].replace(")",".");
		s = '<li>'+
				'<a href="noticiasContenido.html" data-transition="slideup" class="contentLink" data-entryid="'+i+'">'+
				'<h3 class="tituloNoticia">'+ entries_local[i].title+'</h3>'+  //aqui le ponemos el titulo
				'<img class="thumbail" src='+rutaimagen+' height="95"></img>'+
				'<div class="fechaNoticia"> Fecha:'+fecha+', </div>'+
				
				'</a>'+
			  '</li>';
		 $("#pageNoticias #linksList").append(s);
	}
  	$("#pageNoticias #linksList").listview('refresh');
			//movidas scroller dinámico...
			height += limite;
			$('#wrapper_noticias #scroller').css('height',height*87 + 46);
			setTimeout(function(){
				myScrollNoticias.refresh();
				$("#masnoticias").css('display', 'block');
			},100);
			
			
			
	}

function renderFallo(msg){
	var cadena="<div>"+msg+"</div>";
	$("#pageNoticias #linksList").html(s);
}

//Listen for Google's library to load
function initialize(cuantos) {
	$('#listaAltura').prepend('<div class="loading"></div>');
	var feed = new google.feeds.Feed(RSS + primeranoticia);
	//primero mostramos las noticias mas recientes..
	feed.setNumEntries(cuantos);
	feed.load(function(result) {
		if(!result.error) {
			
			entries_local = result.feed.entries;
			//localStorage["entries"] = JSON.stringify(entries_local);
			renderEntries(0,entries_local.length);
			 $('.loading').css('display','none');
		}else{
			
				//aqui poner un popup
				alert("No se pudieron cargar las noticias.");
			
		}
	});
	
}


function modificarHTML(indice){
	var contentHTML = "";
	contentHTML += entries[indice].content;
	var linkNoticia="";
	linkNoticia+= entries[indice].link;
	
	
	var patt_table = new RegExp(/<table[^>]*>/gi);
	var patt_tr = new RegExp(/<tr[^>]*>/gi);
	var patt_td = new RegExp(/<td[^>]*>/gi);
	var patt_ctable = new RegExp(/<\/table>/gi);
	var patt_ctd = new RegExp(/<\/td>/gi);
	var patt_ctr = new RegExp(/<\/tr>/gi);
	var patt_enlace = new RegExp(/<a[^>]*>/gi);
	
		
	

	/*contentHTML=contentHTML.replace(patt_table,"<div class=\"tabla_noticia\">").replace(patt_td,"<div>").replace(patt_tr,"<div>").replace(patt_ctable,"</div>").replace(patt_ctd,"</div>").replace(patt_ctr,"</div>");*/
	
	
	
	contentHTML += "<div class=\"enlaceNoticia buttonEnlace\"><div onclick=\"showUrl(\'"+linkNoticia+"\');return false;\">Enlace noticia web<div></div>";
	
	
	
	contentHTML="<div class=\"contenido_noticia\">"+contentHTML+"</div>";
	


	
	imagesNoticiasWidth();
	//en el content tengo que buscar la imagen..sacarlas, hacerlas de tamaño normal y centrarla..
	entries[indice].content="";
	entries[indice].content=contentHTML;
	//por lo tanto entries ya tendrá el contenido modificado con el tamaño de imagen que corresponde
	
       
	   
}


$(document).on('pageshow','#pageGaleriaEnlace',function(){
	$("#frameNoticia").attr("src",srcenlace);
});
//funciones de pagina contenido Noticias...
function imagesNoticiasWidth(){
	$(".contenido_noticia img:first").css("width",window.innerWidth*0.8);
}




//id global imagen presentacion cargada actualmente
var GLOBALID="presentacion";
//var cambio=new Boolean(false);
//variable que indica si entramos por primera vez..
//funciones COMUNES
//funciones que se ejecutan antes de cargar la aplicación
//funciones de wrapper e imágenes
var wrapperH; 
//FUNCIONES de HOME...
//funciones de presentacion
function mostrarItemsFoto(){
	//$("#wrapper").css('height',wrapperH);
	//$("#wrapper").css('width',wrapperH*6.6);
	if($("#instalacion").is(":hidden")){
		$("#instalacion").css("display","block");
	}else{
		$("#instalacion").css("display","none");
	}
}

function ocultarItemsFoto(){
	$("#instalacion").css("display","none");
}
function seleccionarItem(id){
	seleccionadoPanoramica="#panoramica_"+id;
	seleccionado="#"+id;
	if(GLOBALID != id){
		//cambiamos la clase para que brille
		$("#"+GLOBALID+"_span").removeClass("textoIcoSeleccionado");
		$("#"+GLOBALID+"_span").addClass("textoIco");
		$(seleccionado+"_span").removeClass("textoIco");
		$(seleccionado+"_span").addClass("textoIcoSeleccionado");
		//cambiamos el icono
		$("#"+GLOBALID+"_imagen").attr("src","css/images/submenu/icono_"+GLOBALID+"_azul.png");
		$(seleccionado+"_imagen").attr("src","css/images/submenu/icono_"+id+"_blanco.png");
		//seleccionado va para bajo id va para arriba y cambiamos la foto
		 $("#wrapper #scroller").css('background-image','url(css/images/panoramicas/panoramica_'+id+'.jpg)');
		 
		}
		GLOBALID=id;
		setTimeout(function () { $("#instalacion").css("display","none"); }, 1000);

		
}










 
 
 








//-- funciones de LOCALIZACION ---


function inicializarMapa(){
	var markerlatlng = new google.maps.LatLng(39.575403,2.623769); 
	var latlng = new google.maps.LatLng(39.578934, 2.630024);
    var mapOptions = {
      zoom: 14,
      center: markerlatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

	var markerimage = new google.maps.MarkerImage(
		'css/images/markerimage.png',
		new google.maps.Size(20, 32),
     	new google.maps.Point(0,0),
      	new google.maps.Point(0, 32));
		
	var markershadow = new google.maps.MarkerImage(
		'css/images/markershadow.png',
		new google.maps.Size(37, 32),
		new google.maps.Point(0,0),
		new google.maps.Point(0, 32)
		);
		
	var marker = new google.maps.Marker({
		position: markerlatlng, 
		map: map, 
		icon: markerimage,
		shadow: markershadow,
		draggable: true,
		title:"San Cayetano"
  });
  $.mobile.loading('hide');
  }

 






var cuantos=new Array(31);
var calendariomoviendose = false;
var selectedEvent;


function calendarioMes(fecha, id) {
	var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var mesdias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var content;	
	$("#tituloMes").html(mes[fecha.getMonth()]);
	$("#tituloAño").html(fecha.getFullYear());
	// Creación de los días
	var dia=1;
	for (i=0;i<6;i++){
		content+='<tr>';
		for (j=0;j<7;j++){
			var semana=fecha.getDay();
			
			if(semana==0){
				semana=7;
				
			}
			if (i==0 & semana-1 > j){
				content+='<td></td>';
			}else {
				
				if(dia<=mesdias[fecha.getMonth()]){
				
					content+='<td id="d'+dia+'"><div class="div-evento">'+dia+'</div></td>';
					dia++;
				}else {
					content+='<td class="padding"></td>';
				}
			}
		}
		content+='</tr>';
		if (dia>mesdias[fecha.getMonth()]) break;
	}
	// Footer de la tabla
	$(id+" tbody").html(content);
	$.mobile.loading('hide');
}

//Stores entries

var hoy = new Date();
var anyo = hoy.getUTCFullYear();
var mes = hoy.getMonth();



function cargarJFeeds(){
	//var rsscalendar = "http://localhost/joomla/index.php?option=com_jevents&task=modlatest.rss&format=feed&type=rss&Itemid=1&modid=91";
	var rsscalendar = "http://colegiosancayetano.com/index.php?option=com_jevents&task=modlatest.rss&format=feed&type=rss&modid=139";
	var feed = new google.feeds.Feed(rsscalendar);
	feed.setNumEntries(100);
 if(eventos.length==0){
	
	feed.load(function(result) {
    	if (!result.error) {
      		eventos = result.feed.entries;
			
			//cargamos aqui el primer mes..
			mesconeventos(new Date(anyo,mes,1));
    	} else
			console.log(result.error);
	}); 
 }else{
	 mesconeventos(new Date(anyo,mes,1));
 }
}

function mesconeventos(fecha, id){
	// Carga el calendario y lo rellena de eventos
	if (!id)
		id = '#calendario';
	setWidthMes(id);
	calendarioMes(fecha, id);
	ponJeventos(fecha, id);
	
	
	if (hoy.getMonth() == fecha.getMonth()){ // Añadimos clase al día actual
		$('#d'+hoy.getDate()).addClass('cal-hoy');
		//enseñar lista eventos 
			
			$('.eventod'+hoy.getDate()).css('display','inherit'); // Muestra los eventos de este día
			
			var num=hoy.getDate();
			
			var height=cuantos[num];
			
			height=height*82;
			
			$('#wrapper_calendario #scroller').css('height',height);
			
			setTimeout(function () {
				myScrollCalendario.refresh();
			},20);
	}		
}


function ponJeventos(fecha, id) {
	cuantos=new Array(31);
				for(j=0;j<32;j++){
					cuantos[j]=0;
				}
	var dia;
	var titulo;
	
	if (!id) {
		id = '#calendario';
	}
	$("#listaEventos").empty();
	for (var i = 0; i < eventos.length; i++) {
		var evento = eventos[i];
		var tokenizetitle = evento.title.split(":");
		if (isFinite(tokenizetitle[1])) {
			dia = tokenizetitle[0] + ":" + tokenizetitle[1];
			titulo = tokenizetitle.slice(2);
		} else {
			dia = tokenizetitle[0];
			titulo = tokenizetitle.slice(1);
		}
		//meses = [' "Ene" ', ' "Feb" ', ' "Mar" ', ' "Abr" ', ' "May" ', ' "Jun" ', ' "Jul" ', ' "Ago" ', ' "Sep" ', ' "Nov" ', ' "Dic" '];
		//months = [' "Jan" ', ' "Feb" ', ' "Mar" ', ' "Apr" ', ' "May" ', ' "Jun" ', ' "Jul" ', ' "Aug" ', ' "Sep" ', ' "Nov" ', ' "Dec" '];
		
		eventos[i].titulo = titulo;
		
		eventos[i].fecha= dia;
		
			
		dia.toString();
		dia=dia.replace("Abr","Apr");
		dia=dia.replace("Ene","Jan");
		dia=dia.replace("Ago","Aug");
		dia=dia.replace("Dic","Dec");
		
		
		dia = new Date(dia);
		eventos[i].dia = dia;
		var descripcion = evento.contentSnippet || evento.content || '';
		eventos[i].descripcion = descripcion;
	
		
		if (dia.getMonth() == fecha.getMonth() && dia.getYear() == fecha.getYear()){
			// Estilo de celda con evento
			$(id + ' #d'+dia.getDate()).addClass('cal-evento');
			$("#listaEventos").append('<li class="eventod'+dia.getDate()+'" style="display:none">'+
			'<a href="eventosContenido.html" data-transition="slideup" class="contentLink" id="eventoContenido" data-eventid="'+i+'" >'+
			'<h3 class="tituloNoticia">'+titulo+'</h3>'+
			'<img class="thumbail" src="icon.png" height="95"></img>');
			cuantos[dia.getDate()]=cuantos[dia.getDate()]+1;								
			
		}
	}
 

 $("#listaEventos").listview('refresh');
 
	 
}

    


function messig(){
	if (!calendariomoviendose){
		calendariomoviendose = true;
		$('#meses').append($('<div id="messiguiente" class="calendario">\
		<table cellspacing="0"><thead><tr>\
		</tr><tr><th>lun</th><th>mar</th><th>mie</th><th>jue</th><th>vie</th><th>sab</th><th>dom</th></tr></thead>\
						<tbody>\
						</tbody>\
						</table>'
		));
		var fecha=new Date(anyo, mes+=1, 1);
		mesconeventos(fecha, '#messiguiente');
		$("#calendario").addClass('margin-left-calendario');
		if (hoy.getMonth() == fecha.getMonth()){
			$('#messiguiente #d'+hoy.getDate()).addClass('cal-hoy');
		}
	}
}
function mesant(){
	if (!calendariomoviendose){
		calendariomoviendose = true;
		$('#meses').prepend($('<div id="mesanterior" class="calendario">\
		<table cellspacing="0"><thead><tr>\
		</tr><tr><th>lun</th><th>mar</th><th>mie</th><th>jue</th><th>vie</th><th>sab</th><th>dom</th></tr></thead>\
						<tbody>\
						</tbody>\
						</table>'
		));
		$('#mesanterior').css('margin-left', '-'+window.innerWidth);
		var fecha=new Date(anyo, mes-=1, 1);
		mesconeventos(fecha, '#mesanterior');
		$("#mesanterior").addClass('margin-right-calendario');
		if (hoy.getMonth() == fecha.getMonth()){
		$('#mesanterior #d'+hoy.getDate()).addClass('cal-hoy');
		}
	}
};

$(document).on('click', '#mesant', mesant);
$(document).on('click', '#messig', messig);
$(document).on('swiperight', '#calendario',mesant);
$(document).on("swipeleft", '#calendario',messig);


$(document).on("mozAnimationEnd webkitAnimationEnd msAnimationEnd oAnimationEnd animationend mozAnimationEnd",'#calendario',function(){
			if($("#calendario").hasClass('margin-left-calendario')){
				$("#calendario").remove();
				$("#messiguiente").attr('id', 'calendario');
				calendariomoviendose = false;
			}
});

$(document).on("mozAnimationEnd webkitAnimationEnd msAnimationEnd oAnimationEnd animationend mozAnimationEnd",'#mesanterior',function(){
			if ($("#mesanterior").hasClass('margin-right-calendario')){
				$("#mesanterior").css('margin-left', 0);
				$("#meses").css('margin-left', 0);
				$('#mesanterior').removeClass('margin-right-calendario');
				$("#calendario").remove();
				$("#mesanterior").attr('id', 'calendario');
				calendariomoviendose = false;
			}
	
});
