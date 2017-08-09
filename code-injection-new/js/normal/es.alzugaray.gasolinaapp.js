







latloc="";lngloc="";preferencias =new Array();gasolineras=new Array();km=5;num=10;ord='precio';gas='G95';gasnom='Gasolina 95';vervar=1;vermedia=1;ctrlgasmap=0;ctrlnav=-1;arrayNav=new Array();uuid=0;visitas=0;
kmB=5;numB=10;ordB='precio';gasB='G95';gasnomB='Gasolina 95';vervarB=0;vermediaB=1;preferenciasb =new Array();
arrayKM=new Array (1,2,5,10,15,20,25,50,75,100);arrayNum=new Array (1,2,5,10,15,20,25,50,75,100);
arrayTipos=new Array ("G95","G98","GOA","NGO","BIOD");arrayTiposNom=new Array ("Gasolina 95","Gasolina 98","Diesel","Nuevo Diesel","Biodiesel");
cachectrl=getTimeGT(11);
document.addEventListener("mobileinit", mobileInit, false);
function mobileInit() {
$.support.cors=true;
$.mobile.allowCrossDomainPages = true;
$.mobile.buttonMarkup.hoverDelay=0;  

}
$(document).ready(function() {
document.addEventListener("deviceready", onDeviceReady, false);
});
function onDeviceReady() {
 document.addEventListener("menubutton", onMenuKeyDown, false);
 document.addEventListener("backbutton", onBackKeyDown, false);
    $("[data-role=footer]").fixedtoolbar({ fullscreen: true });
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    $("[data-role=header]").fixedtoolbar({ fullscreen: true });
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });    
	
	if (localStorage.getItem("preferencias")!=null) {
		leerStoragePreferencias ("preferencias",function(){irHome();});
	}else{
		
	var laspreferencias = new Object();

	    if (uuid==0){uuid = Number(new Date());}
	    
	    obtenerGeoPos ("",function() {	

	laspreferencias.uuid=uuid;
	laspreferencias.km=km;
	laspreferencias.num=num;
	laspreferencias.ord=ord;
	laspreferencias.gas=gas;
	laspreferencias.gasnom=gasnom;
	laspreferencias.vervar=vervar;
	laspreferencias.vermedia=vermedia;
	laspreferencias.latloc=latloc;
	laspreferencias.lngloc=lngloc;
	laspreferencias.cachectrl=cachectrl;
	laspreferencias.visitas=visitas;
	preferencias.push(laspreferencias);
	preferenciasb=preferencias;
	guardarStorage ("preferencias", JSON.stringify(preferencias),function(){
				//console.log ('f_opciones');
		opciones();
		
		
		});
		});  	
		}
	}

function onMenuKeyDown() {
    opciones();
}
function onBackKeyDown() {
 	arrayNav.pop();
	ctrlnav=ctrlnav-1;
	strEvalNav=arrayNav[ctrlnav];
	ctrlnav=ctrlnav-1;
	arrayNav.pop();
	if (ctrlnav>-1){
	eval(strEvalNav);
	}else{
	 ctrlnav=-1;
	 arrayNav=new Array();
	}
}

function cerrarMarket (){
	$("#market").remove();
}

function visitarMarket (idmarket){
	if (idmarket==1){
		
		var capaMarket="<div id='market'><a href='javascript:cerrarMarket()'>Gracias por valorar<br>nuestra aplicación<br><br>Pulsa aquí para<br>CONTINUAR <br>usando GasolinaApp</a><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><iframe id='imarket' src='market://details?id=es.alzugaray.gasolinaapp' width='320' height='480'></iframe></div>";
		
		//console.log (capaMarket);
		
		$(capaMarket).prependTo("body");
		
	}
}

function irHome() {
activarBotones ("lista");  
limpiarDOM();
km=preferencias[0].km,num=preferencias[0].num,gasnom=preferencias[0].gasnom,gas=preferencias[0].gas,ord=preferencias[0].ord;vervar=preferencias[0].vervar;vermedia=preferencias[0].vermedia;uuid=preferencias[0].uuid;latloc=preferencias[0].latloc;lngloc=preferencias[0].lngloc;cachectrl=preferencias[0].cachectrl;visitas=preferencias[0].visitas;

fechacachectrl=getTimeGT(11);

$("#hheader").html ("<span>GasolinaApp </span> "+gasnom);
var timestamp = Number(new Date());

//console.log ("cachectrl:"+cachectrl);
//console.log ("fechacachectrl:"+fechacachectrl);
if (cachectrl==fechacachectrl){
	var urlGasolinaBase="http://www.alzugaray.es/gas/json/gas.php?id=g&lat="+latloc+"&lng="+lngloc+"&km="+km+"&ord="+ord+"&num="+num+"&gas="+gas+"&ti="+timestamp+'&uuid=' + uuid+'&vis=' + visitas ;					
	cargarGasolineras(urlGasolinaBase);
}else{
	preferencias[0].cachectrl=fechacachectrl;
	cachectrl=fechacachectrl;
	
obtenerGeoPos ("",function() {
	preferencias[0].latloc=latloc;
	preferencias[0].lngloc=lngloc;	
var urlGasolinaBase="http://www.alzugaray.es/gas/json/gas.php?id=g&lat="+latloc+"&lng="+lngloc+"&km="+km+"&ord="+ord+"&num="+num+"&gas="+gas+"&ti="+timestamp+'&uuid=' + uuid+'&vis=' + visitas ;				
	cargarGasolineras(urlGasolinaBase);
});  	
}
}
function cargarGasolineras(urlGasolinaBase) {
//limpiarDOM();
//console.log (urlGasolinaBase);
    if (gasolineras.length>0){
         irTipo(gasolineras);
        }else{
                    $.getJSON(urlGasolinaBase, function(gasolinerass) {
                    gasolineras=gasolinerass;
                    //console.log ('NO existe');
                    irTipo(gasolineras);
                    }).error(function() {
			
			navigator.notification.alert('No hay ninguna gasolinera disponible en la zona con esta configuración. Puedes cambiar tus preferencias de búsqueda pulsando el botón Cambiar Opciones.',opciones,'No hay gasolineras','Cambiar Opciones');
			
			
    });
}
}
function irTipo(gasolineras) {
    			arrayNav.push ("irTipo(gasolineras)");
			ctrlnav++;
activarBotones ("lista");    
limpiarDOM();


if ($('#precios').length){
$('#precios').show();
$("#cargando").hide();
//console.log ('mostrando');
}else{

	//console.log ('creando');
	$("<div>").attr("id","precios").prependTo($("#contenido"));
	
	
	
	$("<form id='formTipo'>").appendTo($("#precios"));





$("<fieldset data-role='controlgroup'  data-type='horizontal' id='ord'>")
	.controlgroup()
	.appendTo($("#formTipo"));
	/*
	$("<legend>").html ("Ordenar gasolineras por")
			.appendTo($("#formTipo fieldset#ord"));
	*/
			arrayord=new Array ("precio","proximidad");
			for (var ii=0; ii<arrayord.length; ii++) {
				i=arrayord[ii];
				strChecked="nochecked";
					if (i==ord){strChecked="checked";}	
				$("<input type='radio'>")				
							.attr("name", "radio-choice-4")
							.attr("id", "radio-choice-"+i)
							.attr("value", "choice-"+i)
							.attr("id", "radio-choice-"+i)
							.attr("data-id", i)
							.attr(strChecked, strChecked)
							.appendTo($("#formTipo fieldset#ord"))
							.click(function(e) {
							tiposelect=$(e.target).attr("data-id");
							crearLista(tiposelect);
							});
				$("<label>").html (i)
						.attr("for", "radio-choice-"+i)
						 .appendTo($("#formTipo fieldset#ord"));
				}
		$("input[type='radio']").checkboxradio();
		$("input[type='radio']").checkboxradio("refresh");
		$("#formTipo fieldset#ord").controlgroup();		
	
crearLista(ord);

				
		
}

}
function verGasolinera(gasolineras,i){
        		arrayNav.push ("verGasolinera(gasolineras,"+i+")");
			ctrlnav++;
activarBotones ("");   
limpiarDOM();

$("#precios").hide();
			
    $("#hheader").html ("<span>GasolinaApp </span> "+preferencias[0].gasnom);

    
    $("<div id='detalle'>").prependTo ($("#contenido"));
    
var vervartxt="";
if (preferencias[0].vervar==1){
var vervartxt="<img src='images/"+gasolineras[i].v+".png' width=25 height=20><em> antes "+gasolineras[i].a+" &euro;/lt.</em>";
}    
       
var vermediahtml="";
if (preferencias[0].vermedia==1){
var vermediahtml="<h4 class='d_"+gasolineras[i].mi+"'><em>Dif. precio medio</em><em class='dif'>"+gasolineras[i].dm+" &euro;/lt.</em></h4>";
}

var masinfo = "<h4 class='e'><em></em><span>"+gasolineras[i].e+" <em>&euro;/lt.</em></span>"+vervartxt+"</h4>"+vermediahtml+"<!--<h4 class='d'><em>Distancia &asymp;</em> "+gasolineras[i].d+" km.</h4>--><h4 class='f'><em>Actualizado:</em> "+gasolineras[i].fecha+"</h4>";

				var nombre = $("<h2>").html("<img src='images/"+gasolineras[i].i+".png' width=32 height=32>"+gasolineras[i].n);
				var direccion = $("<h4>").html(gasolineras[i].dir+" "+gasolineras[i].loc);
				var horario="";
				if (gasolineras[i].h!='' && gasolineras[i].h!=undefined){
				var horario = $("<h4>").html("Horario: "+gasolineras[i].h);
				}
				
				$("<p id='datos'>").append(nombre)
						 .append(direccion)
						 .append(horario)
						  .append(masinfo)
						 .appendTo($("#detalle"));
			var titulomapa=$("<h4>")
					.attr("id", "sacarmapa")
					.attr("class", "s")			
					.html("<span>&rarr;</span> MAPA")
					.toggle(function() {
							    $("#mapadetalle").show();
							        google.maps.event.trigger(mimapadetalle, "resize");
								mimapadetalle.setCenter(bounds.getCenter());   
								mimapadetalle.fitBounds(bounds);							    
							    $("#sacarmapa span").html ("&darr;");
							   }, function() {
							     $("#mapadetalle").hide();
							      $("#sacarmapa span").html ("&rarr;");
							   });
			var elmapa=$("<div id='mapadetalle' class='p'>");
			$("#mapadetalle").empty();		
			$("#mapadetalle").hide();
			var titulollegar=$("<h4>")
					.attr("id", "comollegar")
					.attr("class", "c")			
					.html("<span>&rarr;</span> &iquest;C&Oacute;MO LLEGAR?")
					.toggle(function() {
							    $("#directionsList").show();
							    $("#comollegar span").html ("&darr;");
							   }, function() {
							     $("#directionsList").hide();
							      $("#comollegar span").html ("&rarr;");
							   });
			
			var directionList=$("<div id='directionsList' style='display:none;'>");

			$("<div id='mapaPanel'>").append (titulomapa)
							.append (elmapa)
							.appendTo($("#detalle"));	
			
			
			$("<div id='directionsPanel'>").append (titulollegar)
							.append (directionList)
							.appendTo($("#detalle"));

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

                        var latlngmapv = new google.maps.LatLng(latloc, lngloc);
		var opciones = {
          mapTypeId: google.maps.MapTypeId.ROADMAP};
        var mimapadetalle='';
	var bounds ='';
	var bounds = new google.maps.LatLngBounds();
        var mimapadetalle = new google.maps.Map(document.getElementById("mapadetalle"), opciones);
  directionsDisplay.setMap(mimapadetalle);
  directionsDisplay.setPanel(document.getElementById("directionsList"));	
var imagec = 'images/car.png';
var titlee="TU LOCALIZACI&Oacute;N";
			var marcadorUsuario = new google.maps.Marker({
				position: latlngmapv,
				map: mimapadetalle,
				title:titlee,
				icon:imagec
  			});
  			
			
marcadorUsuario.setMap(mimapadetalle);	  			
bounds.extend(latlngmapv);
mimapadetalle.fitBounds(bounds);		
var image = 'images/'+gasolineras[i].i+'.png';
var title=gasolineras[i].n;
var gaspos=new google.maps.LatLng(gasolineras[i].lat,gasolineras[i].lng);
var marcadorGas ='';
				var marcadorGas = new google.maps.Marker({
				position: gaspos,
				map: mimapadetalle,
				title:title,
				icon: image
  			});
  			
marcadorGas.setMap(mimapadetalle);		
			
bounds.extend(gaspos);
mimapadetalle.fitBounds(bounds);			
			
	//marcadorGas.setMap(mimapadetalle);
mimapadetalle.setCenter(bounds.getCenter());
  var request = {
    origin:latlngmapv,
    destination:gaspos,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
  
    }
  });
  $("#mapadetalle").hide();
     $("#cargando").hide();
}
function opciones() {
        arrayNav.push ("opciones()");
	ctrlnav++;
limpiarDOM();

activarBotones ("opciones");

km=preferencias[0].km,num=preferencias[0].num,gasnom=preferencias[0].gasnom,gas=preferencias[0].gas,ord=preferencias[0].ord;vervar=preferencias[0].vervar;vermedia=preferencias[0].vermedia;uuid=preferencias[0].uuid;
kmB=preferencias[0].km,numB=preferencias[0].num,gasnomB=preferencias[0].gasnom,gasB=preferencias[0].gas,ordB=preferencias[0].ord;vervarB=preferencias[0].vervar;vermediaB=preferencias[0].vermedia;
	$("#hheader").html ("<span>GasolinaApp </span> "+"Opciones");
	

	$("<form id='formOpciones'>").appendTo($("#contenido"));
	
		
	$("<label>").html ("Tipo de combustible")
						.attr("for", "select-choice-1")
						.appendTo($("#formOpciones"));
	$("<select>").attr("name", "select-choice-1").attr("id", "select-choice-1").addClass ("select")
	.change(function() {
	   ii=$('select#select-choice-1').val();
	   
	   gasB=arrayTipos[ii];
	  gasnomB=arrayTiposNom[ii];
	   
	    })
						.appendTo($("#formOpciones"));
			for (var i=0; i<arrayTipos.length; i++) {
					strChecked="noselected";
					if (arrayTipos[i]==gas){strChecked="selected";}
				$("<option>")	.html(arrayTiposNom[i])		
						.attr("value", i)
							.attr(strChecked, strChecked)
			
						.appendTo($("#formOpciones select#select-choice-1"));
			}

	
	$('select#select-choice-1').selectmenu();		
	$('select#select-choice-1').selectmenu('refresh', true);
		
	$("<label>").html ("<br>Distancia m&aacute;xima (en kil&oacute;metros)")
						.attr("for", "select-choice-2")
						.appendTo($("#formOpciones"));
	$("<select>").attr("name", "select-choice-2").attr("id", "select-choice-2").addClass ("select")
	.change(function() {
	   ii=$('select#select-choice-2').val();
	   
	   kmB=arrayKM[ii];

	   
	    })
						.appendTo($("#formOpciones"));
			for (var i=0; i<arrayKM.length; i++) {
					strChecked="noselected";
					if (arrayKM[i]==km){strChecked="selected";}
				$("<option>")	.html(arrayKM[i])		
						.attr("value", i)
							.attr(strChecked, strChecked)
			
						.appendTo($("#formOpciones select#select-choice-2"));
			}
$('select#select-choice-2').selectmenu();		
$('select#select-choice-2').selectmenu('refresh', true);		


	$("<label>").html ("<br>N&ordm; gasolineras a mostrar")
						.attr("for", "select-choice-3")
						.appendTo($("#formOpciones"));
	$("<select>").attr("name", "select-choice-3").attr("id", "select-choice-3").addClass ("select")
	.change(function() {
	   ii=$('select#select-choice-3').val();
	   
	   numB=arrayNum[ii];

	   
	    })
						.appendTo($("#formOpciones"));
			for (var i=0; i<arrayNum.length; i++) {
					strChecked="noselected";
					if (arrayNum[i]==num){strChecked="selected";}
				$("<option>")	.html(arrayNum[i])		
						.attr("value", i)
							.attr(strChecked, strChecked)
			
						.appendTo($("#formOpciones select#select-choice-3"));
			}
$('select#select-choice-3').selectmenu();		
$('select#select-choice-3').selectmenu('refresh', true);			
		
$("<br>").appendTo($("#formOpciones"));	
							    
							$("<input type='checkbox'>")			
							.attr("name", "checkbox-1")
							.attr("id", "checkbox-1")
							.addClass ("custom")
						
							.click(function(e) {
							  if($("#checkbox-1").is(":checked")) {
								vermediaB=1;
							  }else{
								vermediaB=0;
							  }							  
							}).appendTo($("#formOpciones"));
							
							if (vermedia==1){
							$("#checkbox-1").attr('checked', true);  
							    vermediaB=1;
							    }else{
							$("#checkbox-1").attr('checked', false); 								
							    vermediaB=0;
							    }
								
						
				$("<label id='check1'>").html ("Ver diferencia con  precio medio en la provincia")
						.attr("for", "checkbox-1")
						 .appendTo($("#formOpciones"));
		$("#checkbox-1").checkboxradio();
		$("#checkbox-1").checkboxradio("refresh");
		
$("<br>").appendTo($("#formOpciones"));		

							$("<input type='checkbox'>")			
							.attr("name", "checkbox-0")
							.attr("id", "checkbox-0")
							.addClass ("custom")
			
							.click(function(e) {
							  if($("#checkbox-0").is(":checked")) {
								vervarB=1;
							  }else{
								vervarB=0;
							  }
							}).appendTo($("#formOpciones"));
							if (vervar==1){
							$("#checkbox-0").attr('checked', true);  
							    vervarB=1;
							    }else{
							$("#checkbox-0").attr('checked', false); 								
							    vervarB=0;
							    }
				$("<label id='check0'>").html ("Ver variaci&oacute;n con precio anterior en la gasolinera")
						.attr("for", "checkbox-0")
						 .appendTo($("#formOpciones"));
		$("#checkbox-0").checkboxradio();
		$("#checkbox-0").checkboxradio("refresh");

$("#cargando").hide();

		$("<p>").attr("id", "parrafo").prependTo($("#formOpciones"));
		
		$("<a href='javascript:guardar();' data-icon='check' data-theme='b' id='guardarform'>").html("Guardar").prependTo($("#parrafo"));
	
		$('#guardarform').button();
		$('#guardarform').button('refresh');
		
		
		
}
function guardar (){
$("#hheader").html ("<span>GasolinaApp </span> "+gasnomB);
limpiarDOM ();


preferenciasCambiadas=0;

if (kmB!=preferencias[0].km || gasB!=preferencias[0].gas || numB!=preferencias[0].num){
preferenciasCambiadas=1;	
}

preferencias[0].km=kmB;
preferencias[0].num=numB;
preferencias[0].gasnom=gasnomB;
preferencias[0].gas=gasB;
preferencias[0].ord=ordB;
preferencias[0].vervar=vervarB;
preferencias[0].vermedia=vermediaB;
preferencias[0].latloc=latloc;
preferencias[0].lngloc=lngloc;


	guardarStorage ("preferencias", JSON.stringify(preferencias),function(){
	
		$("#precios").remove();
			if (preferenciasCambiadas==1){
			$("#mapa").remove();
			gasolineras=new Array();
			}
		//console.log ('f_guardar');
		irHome();
		});


	

}
function ayuda (){
    	arrayNav.push ("ayuda()");
	ctrlnav++;   
limpiarDOM();
activarBotones ("ayuda");

	$("#hheader").html ("<span>GasolinaApp </span> "+"Ayuda");
	
	
if ($('#help').length){
$('#help').show();	
$("#cargando").hide();

//console.log ('mostrando');
}else{	
	
	
 	$("<div  id='help'>")
	.appendTo ("#contenido");
	$("<div data-role='collapsible-set' id='helpconf'>")
	.html("<h3>Opciones de configuraci&oacute;n</h3><div data-role='collapsible'><h3>Tipo de combustible</h3><p>Elige el tipo de combustible sobre el que deseas informaci&oacute;n.</p></div><div data-role='collapsible'><h3>Distancia m&aacute;xima</h3><p>Radio (en kil&oacute;metros) respecto a tu ubicaci&oacute;n para mostrar gasolineras ordenadas por precio.</p><p>En el caso de los datos ordenados por proximidad este par&aacute;metro no es tenido en cuenta.</p></div><div data-role='collapsible'><h3>N&ordm; de gasolineras </h3><p>N&uacute;mero m&aacute;ximo de gasolineras a mostrar en los resultados.</p><p>Al aumentar el n&uacute;mero de resultados es posible que los resultados tarden m&aacute;s en mostrarse</p></div><div data-role='collapsible'><h3>Diferencia  precio medio</h3><p>Muestra la diferencia respecto al precio medio del combustible en la provincia.</p></div><div data-role='collapsible'><h3>Variaci&oacute;n  precio anterior </h3><p>Muestra la variaci&oacute;n respecto al precio anterior en cada gasolinera y el valor del mismo.</p></div><div data-role='collapsible'><h3>Guardar la configuraci&oacute;n</h3><p>Para guardar la configuraci&oacute;n es necesario pulsar en el bot&oacute;n GUARDAR.</p></div></div>")
	.appendTo ("#help");
	$('#helpconf').collapsibleset();
	$('#helpconf').collapsibleset('refresh');

	$("<div data-role='collapsible-set' id='helplista'>")
	.html("<h3>Lista de precios</h3><div data-role='collapsible'><h3>Ordenar gasolineras</h3><p>Por precio: Las gasolineras aparecen ordenar de menor a mayor precio.</p><p>Por proximidad: Las gasolineras aparecen ordenadas de mayor a menor proximidad respecto a tu ubicaci&oacute;n.</p></div><div data-role='collapsible'><h3>+Info gasolinera</h3><p>Para ver m&aacute;s informaci&oacute;n es necesario hacer click sobre el nombre de las gasolineras.</p></div><div data-role='collapsible'><h3>Refrescar datos</h3><p>Si deseas actualizar tu posici&oacute;n y/o los datos de la aplicaci&oacute;n puedes pulsar el icono que aparece en la esquina superior izquierda.</p></div></div>")
	.appendTo ("#help");
	$('#helplista').collapsibleset();
	$('#helplista').collapsibleset('refresh');        
        
	$("<div data-role='collapsible-set' id='helpmapa'>")
	.html("<h3>Mapa de gasolineras</h3><div data-role='collapsible'><h3>+Info  gasolinera</h3><p>Para obtener informaci&oacute;n de las gasolineras es necesario hacer click sobre los iconos de las mismas.</p></div><div data-role='collapsible'><h3>Refrescar datos</h3><p>Si deseas actualizar tu posici&oacute;n y/o los datos de la aplicaci&oacute;n puedes pulsar el icono que aparece en la esquina superior izquierda.</p></div></div>")
	.appendTo ("#help");
	$('#helpmapa').collapsibleset();
	$('#helpmapa').collapsibleset('refresh');

	$("<div data-role='collapsible-set' id='helpdetalle'>")
	.html("<h3>Detalle de gasolinera</h3><div data-role='collapsible'><h3>&iquest;C&oacute;mo llegar?</h3><p>Pulsando sobre &iquest;C&Oacute;MO LLEGAR? muestra la ruta a seguir para acceder a la gasolinera.</p></div><div data-role='collapsible'><h3>Mapa</h3><p>Pulsando sobre MAPA muestra el mapa con la situaci&oacute;n de la gasolinera y el usuario y la ruta a seguir para acceder a ella.</p></div></div>")
	.appendTo ("#help");
	$('#helpdetalle').collapsibleset();
	$('#helpdetalle').collapsibleset('refresh');

	$("<div data-role='collapsible-set' id='helpshare'>")
	.html("<h3>Compartir</h3><div data-role='collapsible'><h3>Compartir la aplicaci&oacute;n</h3><p>Para compartir la aplicaci&oacute;n pulsa el bot&oacute;n y elige la plataforma en la que desees.</p></div><div data-role='collapsible'><h3>Plataformas disponibles</h3><p>Puedes compartir la aplicaci&oacute;n en m&uacute;ltiples plataformas como Facebook, Twitter, WhatsApp, Friend Stream, correo electr&oacute;nico, bluetooth, sms...</p></div></div>")
	.appendTo ("#help");
	$('#helpshare').collapsibleset();
	$('#helpshare').collapsibleset('refresh');	

	$("<div data-role='collapsible-set' id='helpmas'>")
	.html("<h3>M&aacute;s informaci&oacute;n</h3><div data-role='collapsible'><h3>Datos de la aplicaci&oacute;n</h3><p>Todos los datos mostrados en esta aplicaci&oacute;n son de car&aacute;cter meramente informativo y su actualizaci&oacute;n es diaria.</p><p>El creador de la aplicaci&oacute;n no se hace responsable de los posibles errores que pueda haber en los mismos.</p><p>Fuente de los datos: Ministerio de Industria, Energ&iacute;a y Turismo.</p></div></div><div data-role='collapsible'><h3>Publicidad</h3><p>Esta aplicaci&oacute;n es gratuita y financia su desarrollo y mantenimiento &uacute;nicamente por publicidad. Si deseas anunciarte en ella puedes ponerte en contacto con nosotros a trav&eacute;s del correo electr&oacute;nico <a href='mailto:gasolinaApp@alzugaray.es'>gasolinaApp@alzugaray.es</a></p></div></div>")
	.appendTo ("#help");
	$('#helpmas').collapsibleset();
	$('#helpmas').collapsibleset('refresh');
	$("#cargando").hide();
	}
	
        
}
function vermapa(){
    	arrayNav.push ("vermapa()");
	ctrlnav++;    
 activarBotones ("mapa");   
limpiarDOM();
$("#precios").hide();

    

	$("#hheader").html ("<span>GasolinaApp </span> "+preferencias[0].gasnom);


if ($('#mapa').length){
	//console.log ('mostrando');
$('#mapa').show();
$("#cargando").hide();
/*
mimapa.setCenter(bounds.getCenter());   
mimapa.fitBounds(bounds);
*/


}else{
	//console.log ('creando');

	var timestamp = Number(new Date());	
		try {
  			totalgas=gasolineras.length;
			totalgas=totalgas-2;


			
			
			$("<div id='mapa'>").appendTo($("#contenido"));
			$("#mapa").removeClass('p').addClass('g');
			$("#mapa").empty();
			$("#mapa").hide();
        var latlngusu = new google.maps.LatLng(latloc, lngloc);
		var opciones = {
          mapTypeId: google.maps.MapTypeId.ROADMAP};
        var mimapa='';
	var bounds = new google.maps.LatLngBounds();
        var mimapa = new google.maps.Map(document.getElementById("mapa"), 
			opciones);
bounds.extend(latlngusu);
//mimapa.fitBounds(bounds);
var imagec = 'images/car.png';
var titlee="TU LOCALIZACI&Oacute;N";
		try {
  			totalgas=gasolineras.length;
			totalgas=totalgas-2;
			}catch(mierror){
  			totalgas=0;
			}
			if (totalgas>0){
			for (var i=0; i<totalgas; i++) {
var image = 'images/'+gasolineras[i].i+'.png';				
var title=gasolineras[i].n;
var posgas=new google.maps.LatLng(gasolineras[i].lat,gasolineras[i].lng);
bounds.extend(posgas);
//mimapa.fitBounds(bounds);
var marcadorGas = new google.maps.Marker({
				position: posgas,
				map: mimapa,
                title:title,
				icon: image
  			});
marcadorGas.setMap(mimapa);
var msg='<div class="infomap">'+title+'<br>'+gasolineras[i].dir+'<br>'+(gasolineras[i].e).replace('.',',')+' <em>&euro;</em>'+'</div>';
anadirLink( marcadorGas, gasolineras, i );
}}
			var marcadorUsuario = new google.maps.Marker({
				position: latlngusu,
				map: mimapa,
				title:titlee,
				icon:imagec
  			});
    $("#mapa").show();			
     $("#cargando").hide();
//mimapa.setCenter(bounds.getCenter());     

    google.maps.event.trigger(mimapa, "resize");
   //  mimapa.setCenter(latlngusu);
mimapa.setCenter(bounds.getCenter());   
mimapa.fitBounds(bounds);
/*
    var marcadorGas ='';
    var mimapa='';
    var marcadorUsuario ='';
    var latlng ='';
*/
    
    			}catch(mierror){
						navigator.notification.alert('No hay ninguna gasolinera disponible en la zona con esta configuración. Puedes cambiar tus preferencias de búsqueda pulsando el botón Cambiar Opciones.',opciones,'No hay gasolineras','Cambiar Opciones');

			}
    
    
}   
}
function anadirLink( marker, gasolineras, i ) {
            google.maps.event.addListener(marker, 'click', function(){
               verGasolinera(gasolineras,i);
            });  
 } 
 

function limpiarDOM (){
$("#cargando").show();	
$("#formOpciones").remove();
$("#detalle").remove();
$("#margen").remove();
$("#help").hide();
$("#mapa").hide();
$("#precios").hide();
}
function activarBotones (nomBoton){
    
    switch (nomBoton){
	case "lista":
	    $("#bt_lista img").attr("src","css/themes/default/images/lista1.png");	    
	    $("#bt_lista a").removeClass('off').addClass('on');
	    $("#bt_mapa a").removeClass('on').addClass('off');	    
	   $("#bt_opciones a").removeClass('on').addClass('off');
	   $("#bt_ayuda a").removeClass('on').addClass('off');
	    $("#bt_ayuda img").attr("src","css/themes/default/images/help0.png");	   
	    $("#bt_opciones img").attr("src","css/themes/default/images/opciones0.png");
	    $("#bt_mapa img").attr("src","css/themes/default/images/mapa0.png");
	    
	break;
	case "opciones":
	    $("#bt_lista a").removeClass('on').addClass('off');
	    $("#bt_mapa a").removeClass('on').addClass('off');
	    $("#bt_opciones a").removeClass('off').addClass('on');
	    	   $("#bt_ayuda a").removeClass('on').addClass('off');
	    $("#bt_ayuda img").attr("src","css/themes/default/images/help0.png");	
	   $("#bt_opciones img").attr("src","css/themes/default/images/opciones1.png");
	    $("#bt_mapa img").attr("src","css/themes/default/images/mapa0.png");
	    $("#bt_lista img").attr("src","css/themes/default/images/lista0.png");	    
	break;
    
	case "mapa":
	    $("#bt_mapa img").attr("src","css/themes/default/images/mapa1.png");
	    $("#bt_mapa a").removeClass('off').addClass('on');    
	    $("#bt_lista a").removeClass('on').addClass('off');
	    $("#bt_opciones a").removeClass('on').addClass('off');
	    	   $("#bt_ayuda a").removeClass('on').addClass('off');
	    $("#bt_ayuda img").attr("src","css/themes/default/images/help0.png");	
	    $("#bt_opciones img").attr("src","css/themes/default/images/opciones0.png");
	    $("#bt_lista img").attr("src","css/themes/default/images/lista0.png");	    
	break;

	case "ayuda":
	    $("#bt_ayuda img").attr("src","css/themes/default/images/help1.png");
	    $("#bt_mapa a").removeClass('off').addClass('on');    
	    $("#bt_lista a").removeClass('on').addClass('off');
	    $("#bt_opciones a").removeClass('on').addClass('off');
	    	   $("#bt_ayuda a").removeClass('on').addClass('off');
	    $("#bt_mapa img").attr("src","css/themes/default/images/mapa0.png");	
	    $("#bt_opciones img").attr("src","css/themes/default/images/opciones0.png");
	    $("#bt_lista img").attr("src","css/themes/default/images/lista0.png");	    
	break;

	default:
	    $("#bt_lista a").removeClass('on').addClass('off');
	    $("#bt_mapa a").removeClass('on').addClass('off');
	    $("#bt_opciones a").removeClass('on').addClass('off');
	        	   $("#bt_ayuda a").removeClass('on').addClass('off');
	    $("#bt_ayuda img").attr("src","css/themes/default/images/help0.png");
	    $("#bt_opciones img").attr("src","css/themes/default/images/opciones0.png");
	    $("#bt_mapa img").attr("src","css/themes/default/images/mapa0.png");
	    $("#bt_lista img").attr("src","css/themes/default/images/lista0.png");	    
    }
}

function actualizar (){
limpiarDOM ();
var timestamp = Number(new Date());

obtenerGeoPos ("",function() {
	preferencias[0].latloc=latloc;
	preferencias[0].lngloc=lngloc;
	
	var urlGasolinaBase="http://www.alzugaray.es/gas/json/gas.php?id=g&lat="+latloc+"&lng="+lngloc+"&km="+km+"&ord="+ord+"&num="+num+"&gas="+gas+"&ti="+timestamp+'&uuid=' + uuid +'&vis=' + visitas ;

	     $.getJSON(urlGasolinaBase, function(gasolinerass) {
                    gasolineras=gasolinerass;
                    // //console.log ('NO existe');
		    
		$("#precios").remove();
		$("#mapa").remove();
		    
		    strEvalNav=arrayNav[ctrlnav];
		    
		    eval (strEvalNav);
                    
                    }).error(function() {
					navigator.notification.alert('No hay ninguna gasolinera disponible en la zona con esta configuración. Puedes cambiar tus preferencias de búsqueda pulsando el botón Cambiar Opciones.',opciones,'No hay gasolineras','Cambiar Opciones');
		});
	});     

}

function compartir (){
    
     strEvalNav=arrayNav[ctrlnav];

        window.plugins.share.show({
	subject: '¡Ahorra con GasolinaApp eligiendo la gasolinera cercana con los mejores precios!',
	text: 'http://www.alzugaray.es/gasolinaApp'},
	function() {
	    eval (strEvalNav);
	    }, // Success function
	function() {
					navigator.notification.alert('En estos momentos la opción compartir no está disponible. Perdona las molestias.','','Error al compartir','Cerrar');
	} // Failure function
);
}


function getTimeGT(gtLength){
today=new Date();

var GTa=today.getFullYear();
var GTmm=today.getMonth() +1;
var GTd=today.getDate();
var GTh=today.getHours();
var GTm=today.getMinutes();
//var GTs=today.getSeconds();

GTm=checkLengthGT(GTm);
GTh=checkLengthGT(GTh);
GTd=checkLengthGT(GTd);
GTmm=checkLengthGT(GTmm);

strGetTimeGT=GTa+''+GTmm+''+GTd+''+GTh+''+GTm;

return strGetTimeGT.substring(0,gtLength);

}

function checkLengthGT(GTi){
	if (GTi<10) {GTi="0" + GTi;}return GTi;
	}

function obtenerGeoPos (param,callback){

	//console.log ('geoposicionando');
	navigator.geolocation.getCurrentPosition(function(posicion) {
	latloc=posicion.coords.latitude;
	lngloc=posicion.coords.longitude;
	gasolineras=new Array();
	//console.log ('fin geoposicionando');	
	callback(); 
	}, function() {
					navigator.notification.alert('No te hemos podido ubicar. Para utilizar esta aplicación es necesario tener activada la geolocalización en el móvil.',opciones,'Problema de geolocalización','Cerrar');

	});
}

function guardarStorage (nomItem,contItem,callback){
	//console.log ('guardando item...');
localStorage.setItem(nomItem,contItem);
callback();
}


function leerStoragePreferencias (nomItem,callback){
	//console.log ('leyendo item...');	
		preferencias = JSON.parse(localStorage.getItem("preferencias"));
		preferenciasb=preferencias;
		
		
visitas=preferencias[0].visitas;
visitas=visitas+1;
preferencias[0].visitas=visitas;
preferenciasb[0].visitas=visitas;
localStorage.setItem("preferencias", JSON.stringify(preferencias));

//console.log (visitas);
if (visitas==5){
navigator.notification.confirm("Gracias por utilizar y confiar en GasolinaApp.\n\nSi nuestra aplicación te está resultando útil nos gustaría que dejaras tu opinión en la tienda de Google.\n\nPara ello, pulsa en Aceptar y escribe tu valoración haciendo click en el enlace TU OPINIÓN.\n\nPara volver a la aplicación pulsa el botón Retroceder en la parte inferior de tu teléfono móvil.", visitarMarket, 'Valora esta aplicación', 'Aceptar,Cancelar');
}		
		
		
		
		callback();
}

function crearLista (tipodeorden){


if ($("#lista"+tipodeorden).length){
$("#listaprecio").hide();
$("#listaproximidad").hide();
$("#lista"+tipodeorden).show();
$("#cargando").hide();
//console.log ('mostrando...'+tipodeorden);
}else{
limpiarDOM ();	
$("#listaprecio").hide();
$("#listaproximidad").hide();
	
	ord=tipodeorden;
	preferencias[0].ord=tipodeorden;
	ordB=tipodeorden;
	
	numGasLen=gasolineras.length;
	

	//console.log (tipodeorden);
	
	switch (tipodeorden){
		
	case "precio":
	datArrayIds=numGasLen-2;
	break;
	
	case "proximidad":
	datArrayIds=numGasLen-1;	
	break;

	}
	
	
	
$("#precios").append($("<ul data-role='listview' data-inset='true' id='lista"+tipodeorden+"'>"));

			$("#precios").hide();
			$("#lista"+tipodeorden).listview();	
	
	//console.log (datArrayIds);
	
	gasolinerasLista=gasolineras[datArrayIds];
	
	
	$.each(gasolinerasLista, function(numgas,i) {
	

	

var vervartxt="";
if (preferencias[0].vervar==1){
var vervartxt="<img src='images/"+gasolineras[i].v+".png' width=25 height=20><em>"+gasolineras[i].a+" &euro;/lt.</em>";
}

var vermediahtml="";
if (preferencias[0].vermedia==1){
var vermediahtml="<h4 class='d_"+gasolineras[i].mi+"'><em>Dif.precio medio</em><em class='dif'>"+gasolineras[i].dm+" &euro;/lt.</em></h4>";
}


var titulo = $("<a>")
.html("<h3><img src='images/"+gasolineras[i].i+".png' width=32 height=32>"+gasolineras[i].n+"</h3><h4 class='e'><span>"+gasolineras[i].e+" <em>&euro;/lt.</em></span>"+vervartxt+"</h4>"+vermediahtml+"<h4 class='d'><em>Distancia &asymp;</em> "+gasolineras[i].d+" km.</h4><h4 class='f'><em>Actualizado:</em> "+gasolineras[i].fecha+"</h4>")
									  .attr ("href","javascript:verGasolinera(gasolineras,"+i+")")
									  ;
				$("<li>")
			
				.append(titulo)
						 .appendTo($("#lista"+tipodeorden));
						 $("#lista"+tipodeorden).listview('refresh');

		

			

			});

			
			//$("<div id='margen'>").appendTo($("#precios"));
			$("#lista"+tipodeorden).show();					
			$("#precios").show();
			 $("#cargando").hide();
			 //console.log ('creando...'+tipodeorden);

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

cordova.addConstructor(function(){
    cordova.addPlugin('share', new Share());
});
