







	// document.addEventListener("deviceready", onDeviceReady, false);
	
    //     document.addEventListener("deviceready", onDeviceReady, false);
    // }

    // function onDeviceReady() {
    //	alert("HOLA");
       // Now safe to use the PhoneGap API
    //}

	
	$(function () {
	   jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	      'dateFormat': 'dd/MM/YYYY',
	      'headerFormat': 'dd/MM/YYYY',
	      'setDateButtonLabel': 'Aceptar',
	      'fieldsOrder': ["d","m", "y"],
	      'noButtonFocusMode': 'true',      
	      'mode':'calbox',
	      'calStartDay': 7,
	      'useLang': 'en'
	   }); 
	});

	jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	    'en': {
	        setDateButtonLabel: "Set Date",
	        setTimeButtonLabel: "Set Time",
	        setDurationButtonLabel: "Set Duration",
	        calTodayButtonLabel: "Jump to Today",
	        titleDateDialogLabel: "Set Date",
	        titleTimeDialogLabel: "Set Time",
	        daysOfWeek: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	        daysOfWeekShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
	        monthsOfYear: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	        monthsOfYearShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
	        durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
	        durationDays: ['Day', 'Days'],
	        tooltip: "Open Date Picker",
	        nextMonth: "Siguiente mes",
	        prevMonth: "Anterior mes",
	        timeFormat: 12,

	        headerFormat: '%A, %B %-d, %Y',
	        dateFieldOrder: ['d', 'm', 'y'],
	        timeFieldOrder: ['h', 'i', 'a'],
	        slideFieldOrder: ['d', 'm', 'y'],
	        dateFormat: '%d/%m/%Y',
	        useArabicIndic: false,
	        isRTL: false,
	        calStartDay: 0,
	        clearButton: 'clear'
	    }
	});
	
	// function onDeviceReady(){
	$(document).ready(function() {
		// document.addEventListener("deviceready", Inicializacion, false);

	// }
	// $(document).bind("pageinit", function() {
	// function Incializacion(){
		Inicio();
		setTimeout('PintaPrincipal();', 200); 
		
		$('#edificios').live('pagebeforeshow', function(event) {
			RellenaEdificios();
		});
		$('#edificios').live('pagehide', function(event) {
			FinEdificios();
		});

		$('#proveedores').live('pagebeforeshow', function(event) {
			RellenaProveedores();
		});
		$('#proveedores').live('pagehide', function(event) {
			FinProveedores();
		});

		$('#contratos').live('pagebeforeshow', function(event) {
			RellenaContratos();
		});
		$('#contratos').live('pagehide', function(event) {
			FinContratos();
		});

		$('#polizas').live('pagebeforeshow', function(event) {
			RellenaPolizas();
		});
		$('#polizas').live('pagehide', function(event) {
			FinPolizas();
		});

		$('#incidencias').live('pagebeforeshow', function(event) {
			RellenaIncidencias();
		});
		$('#incidencias').live('pagehide', function(event) {
			FinIncidencias();
		});

		$('#listin').live('pagebeforeshow', function(event) {
			RellenaListin();
		});
		$('#listin').live('pagehide', function(event) {
			FinListin();
		});
		$('#tareas').live('pagebeforeshow', function(event) {
			RellenaAgenda();
		});
		$('#agenda').live('pagehide', function(event) {
			FinAgenda();
		});		
		
		$("#incidencias_tipo").bind("change", function(event, ui) {
			CambiaIncidenciaTip(event);
		});
		$("#incidencias_tiempo").bind("change", function(event, ui) {
			CambiaIncidenciaTie(event);
		});
		$("#incidencias_estado").bind("change", function(event, ui) {
			CambiaIncidenciaEst(event);
		});
		

		$("#ea_siniestro").bind("change", function(event, ui) {
				CambiaSiniestro(event);
		});
		
		$("#ea_tiempo").bind("change", function(event, ui) {
			CambiaAgendaTiempo(event);
		});
		$("#ea_fecha").bind("change", function(event, ui) {
			CambiaAgendaFecha(event);
		});		

	});



// var direccion="http://localhost/gesfincas/ServidorDespacho.asmx/";
var direccion="http://gesinedi.abcdario.com/ServidorDespacho.asmx/";
// var direccion="http://serviciomoviles.abcdario.com/ServidorDespacho.asmx/";
var version="1.2.4";
var db;

//Almacena datos
var comunidad;
var provee;
var polizas;
var inciden;
var gestiones;
var tipo_per;
var tipo_lla;
var listin_telefonos;
var agenda;
var pisos;


var sincroR=false;
var sincroE=false;

var estado_inc_fil=false;
var estado_inc_edi=false;
var estado_opciones=false;
var estado_original=false;

var hay_comunicacion;
var hay_cambio_gestion;
var hay_cambio_inciden;
var hay_cambio_servidor=0;


var resto_dibujo;
var tmp;


var IndiceEdicion;
var IndiceEdicionGesinedi;
var IndiceEdicionGes;

var estado_incidencias='incidencias_inc';


var num_edificio=-1;
var nom_edificio="Todos los edificios";
var edita_contrato;
var hoy;

var fil_inc_tip;
var fil_inc_per;
var fil_inc_est;
var timerID;
var equipo;
var alto;



function Inicio(){
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    alto=$(window).height();
    if (agentID==null)
        equipo="otros";
    else {
        if(agentID.indexOf("iphone")>=0) equipo="iphone";
        if(agentID.indexOf("ipod")>=0) equipo = "ipod";
        if(agentID.indexOf("ipad")>=0) equipo ="ipad";
        if(agentID.indexOf("android")>=0) equipo="android";
        }

   abreBasedatos();
   creaTablas();
   
   $('#sel_edificio').text(nom_edificio);
   // $('#fil_inc_tip')[0].text($('#incidencias_tipo[value='+fil_inc_tip+']').text());
   
   $('#fil_inc_tip').text($('#incidencias_tipo')[0].children[$('#incidencias_tipo')[0].selectedIndex].text);   
   $('#fil_inc_per').text($('#incidencias_tiempo')[0].children[$('#incidencias_tiempo')[0].selectedIndex].text);   
   $('#fil_inc_est').text($('#incidencias_estado')[0].children[$('#incidencias_estado')[0].selectedIndex].text);   
   fil_inc_tip=$('#incidencias_tipo')[0].children[$('#incidencias_tipo')[0].selectedIndex].value;
   fil_inc_per=$('#incidencias_tiempo')[0].children[$('#incidencias_tiempo')[0].selectedIndex].value;
   fil_inc_est=$('#incidencias_estado')[0].children[$('#incidencias_estado')[0].selectedIndex].value;

   if (localStorage.getItem("Dispositivo")==null) {
	   localStorage.setItem("Dispositivo", Math.random().toString().substring(3));
	   localStorage.setItem("MasOpciones", "true");
	   localStorage.setItem("Aviso", "true");
	   localStorage.setItem("EdiGestor", "false");
	   localStorage.setItem("RegistroAuto", "true");
	   localStorage.setItem("Espera", 20);
	   }

    if (localStorage.getItem("Licencia")!=null) $('#n_licencia').attr('value',localStorage.getItem("Licencia"));
    if (localStorage.getItem("Usuario")!=null) $('#n_usuario').attr('value',localStorage.getItem("Usuario"));
    if (localStorage.getItem("Contrasena")!=null) $('#n_contrasena').attr('value',localStorage.getItem("Contrasena"));
	if (localStorage.getItem("Espera")!=null) $('#n_espera').attr('value',localStorage.getItem("Espera"));
	if (localStorage.getItem("Chequeo")!=null) $('#n_chequeo').attr('value',localStorage.getItem("Chequeo"));
	
	$('#registro_aut').attr("checked", (localStorage.getItem("RegistroAuto")=="true"?'checked':undefined));
	$('#recibe_aut').attr("checked",(localStorage.getItem("RecibeAuto")=="true"?'checked':undefined));
	$('#envio_aut').attr("checked",(localStorage.getItem("EnvioAuto")=="true"?'checked':undefined));
	$('#masopciones').attr("checked",(localStorage.getItem("MasOpciones")=="true"?'checked':undefined));
	$('#aviso').attr("checked",(localStorage.getItem("Aviso")=="true"?'checked':undefined));
	$('#edi_gestor').attr("checked",(localStorage.getItem("EdiGestor")=="true"?'checked':undefined));	
	
	estado_opciones=(localStorage.getItem("MasOpciones")=="true"?true:false);
	
	EstableceActualizacion();
	
    recupera_datos();

    if (comunidad==null)
    	RecibirDatos('GesinediLectura2',(localStorage.getItem("EdiGestor")=="true"?-2:-1),true);
    else
        fTimer();
	$('#version').text("Versi\u00F3n "+version);
    PintaPrincipal();  	
    // TablasAuxiliares();
}



function EstableceActualizacion(){
	if (timerID!=undefined) clearTimeout("fTimer();");
	if (localStorage.getItem("RegistroAuto")=="true" || localStorage.getItem("RecibeAuto")=="true" || localStorage.getItem("EnvioAuto")=="true"){
		if (localStorage.getItem("Chequeo")!=null)
			timerID = setTimeout("fTimer();", 60000*localStorage.getItem("Chequeo"));
		}
	else
		Semaforos();
}

function fTimer(){
	if (localStorage.getItem("EnvioAuto")=="true" || localStorage.getItem("RecibeAuto")=="true"){
		RecibirDatos('GesinediLectura2',(localStorage.getItem("EdiGestor")=="true"?2:1),false);
		if (localStorage.getItem("EnvioAuto")=="true"){
			if (hay_cambio_gestion || hay_cambio_inciden)
				EnviaCambios(false);
			}
		} else {
		if (localStorage.getItem("RegistroAuto")=="true"){
			RecibirDatos('GesinediRegistro',0,false);
			}		
	}

	

	EstableceActualizacion();
}

function PintaPrincipal(){
	resto_dibujo=alto-$('#parte_1').innerHeight()-2*$('#parte_2').innerHeight()-$('#parte_3').innerHeight()-8;
	$('#gesinedi_fondo').attr('height',resto_dibujo);
	$('#parte_3').load();
		
    if (equipo!='android' && equipo!="") {
        $('#opcion_salir').css('display','none');
        $('#num_opciones').removeClass('ui-grid-c').addClass('ui-grid-b').trigger('create');
        }
    else {
        $('#opcion_salir').css('display','inline');
        $('#num_opciones').removeClass('ui-grid-b').addClass('ui-grid-c').trigger('create');        
         }
    if (equipo=='ipad' || equipo=='iphone')
        $('#telefono').hide();
}

function Semaforos(){
	if  (hay_cambio_gestion || hay_cambio_inciden) 
		$("#ico_env").attr("src","./mapa/Rojo.png");
	else
		// $("#ico_env").attr("src","./mapa/Animada.gif");	
		$("#ico_env").attr("src","./mapa/Verde.png");	

	switch(hay_cambio_servidor){
		case 0:
			  $("#ico_rec").attr("src","./mapa/Verde.png");	
			break;
		case 1:
			  $("#ico_rec").attr("src","./mapa/Naranja.png");	
			break;
		case 2:
			  $("#ico_rec").attr("src","./mapa/Rojo.png");	
			break;		
		}
	if  (hay_comunicacion) {
		PintaSincro();
		}
	else 
		$("#ico_reg").attr("src","./mapa/Rojo.png");
		
}

function PintaSincro(){
	if (sincroE || sincroR)
		$("#ico_reg").attr("src","./mapa/Animada.gif");	
	else
		$("#ico_reg").attr("src","./mapa/Verde.png");
	
}


function EnviaConfiguracion(){
	MuestraOpciones(false);
	localStorage.setItem("Licencia", $('#n_licencia').attr('value'));
	localStorage.setItem("Usuario", $('#n_usuario').attr('value'));
	localStorage.setItem("Contrasena", $('#n_contrasena').attr('value'));
	localStorage.setItem("Espera", $('#n_espera').attr('value'));
	RecibirDatos('GesinediRegistro',0,true);	
	PaginaPrincipal();
}

function EnviaParametro(){
	MuestraOpciones(false);
	localStorage.setItem("RegistroAuto", ($('#registro_aut:checked').val()=="on"?true:false));
	localStorage.setItem("RecibeAuto", ($('#recibe_aut:checked').val()=="on"?true:false));
	localStorage.setItem("EnvioAuto", ($('#envio_aut:checked').val()=="on"?true:false));
	localStorage.setItem("Chequeo", $('#n_chequeo').attr('value'));
	localStorage.setItem("MasOpciones", ($('#masopciones:checked').val()=="on"?true:false));
	localStorage.setItem("Aviso", ($('#aviso:checked').val()=="on"?true:false));
	localStorage.setItem("EdiGestor", ($('#edi_gestor:checked').val()=="on"?true:false));
	EstableceActualizacion();
	PaginaPrincipal();
}

function PaginaPrincipal(){
$.mobile.changePage('#principal',{transition:"none"});
MuestraOpciones(false);
}

function FiltroIncidencias(valor){
	if (valor && !estado_inc_fil){
		estado_inc_fil=true;
		$('#incidencias_fil').show();	
		}
	
	if (!valor && estado_inc_fil){
		estado_inc_fil=false;
		$('#incidencias_fil').hide();	
		}
}

function CambiaFiltroIncidencias(){
	FiltroIncidencias(!estado_inc_fil);
	$('#p_incidencias').load();		
	}


function CambiaFiltroEdificios(){
	if (estado_inc_edi){
		estado_inc_edi=false;
		$('#incidencias_edi').hide();

		}	
	else
		{
		estado_inc_edi=true;
		$('#incidencias_edi').show();
		}
	$('#p_incidencias').load();	
	}


function CambiaEstadoIncidencias(selector,numero){
	//if (selector!=estado_incidencias){	
		$('#'+estado_incidencias).hide();	
		switch(estado_incidencias) {
			case 'incidencias_inc':
			break;
		    case 'incidencias_edi':
				incidencias_edi.fin();			
			break;
			case 'incidencias_pro':
				incidencias_pro.fin();
			break;
			case 'incidencias_pol':
				incidencias_pol.fin();
			break;		
            case 'incidencias_vec':
                incidencias_vec.fin();
            break;      
			
			case 'incidencias_ges':
				$('#opciones_gestiones').hide();				
				incidencias_ges.fin();
			break;
			case 'incidencias_edita_inc':
				$('#opciones_edita_inc').hide();	
				break;
			case 'incidencias_edita_ges':
				$('#opciones_edita_ges').hide();	
				break;
			case 'incidencias_asigna':
				$('#opciones_asigna').hide();	
				break;
				
			}
	
		estado_incidencias=selector;
		switch(estado_incidencias) {
		case 'incidencias_inc':
		case 'principal':
				$('#incidencias_tit').text('Incidencias');
				$('#opciones_incidencias').show();
				if (estado_opciones) $('#mas_opciones_inc').show();
				if (estado_inc_fil) $('#incidencias_fil').show();			
				// if (numero>=0) incidencias.actualiza(numero, TextoInciencia(numero));
				BuscaIncidencia(ActualizaIncidencia);
				// RellenaIncidenciasSub();
				break;
			case 'incidencias_edi':
				$('#incidencias_tit').text('Incidencias:Edificios');
				$('#opciones_incidencias').hide();
				if (estado_opciones) $('#mas_opciones_inc').hide();			
				RellenaIncidenciasEdi(numero);
				break;
			case 'incidencias_pro':
				$('#incidencias_tit').text('Incidencias:Proveedores');
				$('#opciones_incidencias').hide();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				RellenaIncidenciasPro((numero?$('#ea_edificio').attr('value'):0));
				break;
			case 'incidencias_pol':
				$('#incidencias_tit').text('Incidencias:P&oacute;lizas');
				$('#opciones_incidencias').hide();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				RellenaIncidenciasPol($('#ea_edificio').attr('value'));
				break;
            case 'incidencias_vec':
                $('#incidencias_tit').text('Incidencias:Propietarios');
                $('#opciones_incidencias').hide();
                if (estado_opciones) $('#mas_opciones_inc').hide();
                RellenaIncidenciasVec($('#ei_edificio').attr('value'));        
                break;		
                
			case 'incidencias_ges':
				$('#incidencias_tit').text('Incidencias:Gestiones');
				$('#opciones_incidencias').hide();
				$('#opciones_gestiones').show();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				if (estado_inc_fil) $('#incidencias_fil').hide();	
				RellenaIncidenciasGes(incidencias.id());
				break;
			case 'incidencias_edita_inc':
				$('#incidencias_tit').text('Incidencias:Edita incidencia');
				$('#opciones_incidencias').hide();
				$('#opciones_edita_inc').show();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				if (estado_inc_fil) $('#incidencias_fil').hide();
				if (numero>0)
					BuscaIncidencia(EditaUnaIncidencia);					
				else
					EditaUnaIncidencia(null,numero);		
				break;
				
			case 'incidencias_edita_ges':
				$('#incidencias_tit').text('Incidencias:Edita gestión');
				$('#opciones_incidencias').hide();
				$('#opciones_edita_ges').show();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				if (estado_inc_fil) $('#incidencias_fil').hide();
				if (numero>0)
					BuscaGestion(EditaUnaGestion);					
				else
					EditaUnaGestion(null, numero);		
				// EditaUnaGestion(numero);				
				break;
				
			case 'incidencias_asigna':
				$('#incidencias_tit').text('Incidencias:Asigna incidencia');
				$('#opciones_incidencias').hide();
				$('#opciones_asigna').show();
				if (estado_opciones) $('#mas_opciones_inc').hide();
				if (estado_inc_fil) $('#incidencias_fil').hide();
				if (numero>0)
					BuscaIncidencia(EditaUnaAsignacion);					
				else
					EditaUnaAsignacion();	
				// EditaUnaAsignacion(numero);				
				break;				
				
			}
		
			
			if (estado_incidencias=="principal"){
				$('#incidencias_inc').show();
				PaginaPrincipal();
				}
			else {
				$('#'+estado_incidencias).show();
				$('#p_incidencias').load();			
				}
				
			
	//}
}


function CambiaOpcionesIncidencias(){
	if (estado_opciones){
		estado_opciones=false;
		$('#mas_opciones_inc').hide();
		}	
	else
		{
		estado_opciones=true;
		$('#mas_opciones_inc').show();
		}

	$('#p_incidencias').load();	
	}


function CambiaFiltroInf(){
	if (estado_filtro){
		estado_filtro=false;
		$('#aviso_filtro_inf').hide();
		$('#avisos_mensaje_inf').show();

		}	
	else
		{
		estado_filtro=true;
		$('#aviso_filtro_inf').show();
		$('#avisos_mensaje_inf').hide();

		}

	$('#p_avisos').load();	
	}

function CambiaOpcionesInf(){
	if (estado_opciones){
		estado_opciones=false;
		$('#mas_opciones_inf').hide();
		}	
	else
		{
		estado_opciones=true;
		$('#mas_opciones_inf').show();
		}

	$('#p_informes').load();	
	}


function CambiaFiltroFac(){
	if (estado_filtro){
		estado_filtro=false;
		$('#aviso_filtro_fac').hide();
		$('#avisos_mensaje_fac').show();

		}	
	else
		{
		estado_filtro=true;
		$('#aviso_filtro_fac').show();
		$('#avisos_mensaje_fac').hide();
		}

	$('#p_facturas').load();	
	}

function MuestraOpciones(muestra){
	if (muestra){
		$('#lasopciones').show();
		$('#opciones').hide();	
	} else {
		Fin();
		$('#opciones').show();
		$('#lasopciones').hide();
		}
}

// COMUNICACIONES
function Sincroniza(){
RecibirDatos('GesinediLectura2',(localStorage.getItem("EdiGestor")=="true"?2:1),true);
EnviaCambios(true);
MuestraOpciones(false);
}

function SincronizaTodo(){
	RecibirDatos('GesinediLectura2',(localStorage.getItem("EdiGestor")=="true"?-2:-1),true);
	}

function EnviaCambios(Mensaje){
	var tmp="";
	db.transaction(function(tx) {
    	tx.executeSql("SELECT * FROM inciden WHERE cambio<>0", [], function(tx, rs) {
    		if (rs.rows.length>0){
    			tmp='{';
    			tmp=tmp+Empaqueta('inciden',rs.rows);
    			}
    	  	tx.executeSql("SELECT * FROM gestiones WHERE cambio<>0", [], function(tx, rs) {
        		if (rs.rows.length>0){
        			if (tmp=="")
        				tmp="{";
        			else
        				tmp=tmp+",";
        			tmp=tmp+Empaqueta('gestiones',rs.rows);
        			}
        		if (tmp!="") {
        			tmp=tmp+"}";
        			EnviarDatos(tmp);
        			}
                }, Mal);
    		
        }, Mal);
 		    	
    }, Mal); 

} 

function Empaqueta(tabla, rows){
	var tmp='';
	tmp+='"'+tabla+'":[';
	for (var j=0; j<rows.length; j++) {
		if (j>0) tmp+=',';
		tmp+=JSON.stringify(rows.item(j));
		}
	tmp+=']';	
	return tmp;
}


function RecibirDatos(Opcion, Tablas, Mensaje) {
	try {
		if (!sincroR && $('#n_licencia').attr("value")!="" && $('#n_usuario').attr("value")!="" ){
			sincroR=true;
			PintaSincro();
			MuestraOpciones(false);
			if (Mensaje) Empieza("Leyendo datos remotos...");
		    $.ajax({
		          async: (Opcion=="GesinediRegistro"?false:true),
		          type: "POST",
		          url: direccion+Opcion,    
		          timeout: 1000*$("#n_espera").attr("value"), 
		          data: '{"Licencia":"'+$('#n_licencia').attr("value")+'","Usuario":"'+$('#n_usuario').attr("value")+'","Contrasena":"'+$('#n_contrasena').attr("value")+'","Dispositivo":"'+localStorage.getItem("Dispositivo")+'"'+(Opcion=="GesinediLectura2"?',"Tablas":'+Tablas+',"Version":1':'')+'}',
		          
		          contentType: "application/json; charset=utf-8", 
		          dataType: "json", 
		          success: function(msg) {		        	    
		                RecibirOK(msg.d, Opcion, Tablas, Mensaje);
		                sincroR=false;
		                Semaforos();
		              }, 
		          complete: function (){
		              sincroR=false;
		              Semaforos();
		        	  if (Mensaje) Fin();		        	  		       	      
		          },
		          error: function(result, val) {
		        	  hay_comunicacion=false;
		        	  hay_cambio_servidor=2;
		        	  sincroR=false;
		        	  Semaforos();
		     	      if (Mensaje) {
		     	    	  Fin(); 
		        	      ErrorComunicaciones(result.statusText);
		     	      	  }
		          	 } 
		         });
			}
		}
    catch (error){
    	sincroR=false;
  	  	hay_comunicacion=false;
  	  	hay_cambio_servidor=2;
  	  	Semaforos();
    	}   
   }

function EnviarDatos(Datos, Mensaje) {
	try {
		if (!sincroE && $('#n_licencia').attr("value")!="" && $('#n_usuario').attr("value")!="" ){
			sincroE=true;
			PintaSincro();
		    $.ajax({
		          async: true,
		          type: "POST", 
		          url: direccion+"GesinediEscritura2",
		          timeout: 1000*$("#espera").attr("value"), 
  	              data: "{'Licencia':'"+$('#n_licencia').attr('value')+"','Usuario':'"+$('#n_usuario').attr('value')+"','Contrasena':'"+$('#n_contrasena').attr('value')+"', 'Dispositivo':'" +localStorage.getItem('Dispositivo')+"', 'Datos':'"+Datos+"', 'Version':'1'}",
		          contentType: "application/json; charset=utf-8", 
		          dataType: "json", 
		          success: function(msg) {
		              sincroE=false;
		        	  RecibirOK(msg.d, "GesinediEscritura",0, Mensaje);		        	 
		              }, 
		          complete: function (){
		                    sincroE=false;
		     	    		Semaforos();		     	    		
		              },              
		          error: function(result, val) {
		  				hay_comunicacion=false;
		  				hay_cambio_servidor=2;
			        	sincroE=false;
			        	Semaforos();
			        	} 
		         });
			}
		}
	catch (error){
		hay_comunicacion=false;
		hay_cambio_servidor=2;
  	  	sincroE=false;
 	  	Semaforos();
		}
   } 



function RecibirOK(result, Opcion, Tablas, Mensaje) 
{
switch(Opcion) {
	case "GesinediRegistro":
		if (result<0)
			{
			hay_comunicacion=false;
			hay_cambio_servidor=2;
			if (Mensaje)
				SimpleMensaje("Su equipo m&oacute;vil no se ha podido identificar ante el servidor de forma correcta, revise sus datos de usuario.", 6000);
			}
		else
			{
			if (result<0){
				hay_comunicacion=false;
				hay_cambio_servidor=2;
			
			} else {
				hay_comunicacion=true;
				if (result>0){				
					hay_cambio_servidor=2;					
					} else {
						hay_cambio_servidor=0;		
					}
				}
		    }

	break;
	
	case "GesinediLectura2":
		hay_comunicacion=true;
		if (result!="" && result!="{}"){
			// hay_comunicacion=true;
			desserializa(result, (Tablas<0?true:false));
			hay_cambio_servidor=1;
			if (Mensaje) Fin();
			if ($('#aviso:checked').val()=="on")
				beep();
			}
		else {
			if (hay_comunicacion) hay_cambio_servidor=0;
			if (Mensaje) Fin();
			}
		
		break;
	case "GesinediEscritura":
		if (result!="ERROR")
			confirmacion(result);
			//desserializa(result, false);
		
		hay_cambio_inciden=false;
		hay_cambio_gestion=false;
			
		if (Mensaje) Fin();
		break;
	}
}



function confirmacion(result){
	var flag=false;
	var data = $.parseJSON(result);

	$.each(data, function(key, val) {
		switch(key){
			case "inciden":			
				for (var i=0;i<val.length;i++) {
					for (var j=0;j<inciden.length;j++) {
						if (inciden[j].codigo==val[i].indice) {
							switch(val[i].operacion){
								case 1:
									inciden[j].cambio=0;
									if (inciden[j].codigo!=val[i].puntero){
										flag=true;
										inciden[j].codigo=val[i].puntero;
										for (var k=0;k<gestiones.length;k++){
											if (gestiones[k].num_incidencia==val[i].indice)
												gestiones[k].num_incidencia=val[i].puntero;
											}
										}
								break;
								case 2:
									inciden[j].cambio=0;
								break;
								case 4:
									try {
										inciden.splice(j,1);
										} catch (e) {}
								break;
								}
							break;
							}
						}
					}
				localStorage.setItem("inciden",JSON.stringify(inciden));
				if (flag) localStorage.setItem("gestiones",JSON.stringify(gestiones));
				break;
				
			case "gestiones":
				for (var i=0;i<val.length;i++){
					for (var j=0;j<gestiones.length;j++){
						if (gestiones[j].id==val[i].indice){
							switch(val[i].operacion){
								case 1:
									gestiones[j].cambio=0;
								break;
								case 2:
									gestiones[j].cambio=0;
								break;
								case 4:
									try {
										gestiones.splice(j,1);
										} catch (e) {}
								break;
								}
							break;
							}
						}
					}
				localStorage.setItem("gestiones",JSON.stringify(gestiones));
				break;
			}
			
		});
}


function desserializa(result, borra){
var cambios=null;
tmp="inicio";
// try {	
	var data = $.parseJSON(result);
	if (borra){
		hay_cambio_inciden=false;
		hay_cambio_gestion=false;
		}
	
	$.each(data, function(key, val) {
		tmp=key;
		if (key=="completo"){
			cambios=val;
		}else {
			// if (borra || key=="tipo_per" || key=="tipo_lla" || key=="comunidad_proveedor"){
				switch(key){
					case "comunidad":
						if (borra || cambios[0].cambios==2){
							comunidad=val;
							localStorage.setItem("comunidad",JSON.stringify(comunidad));
						} else {
							ProcesaModificacion(key,val);								
							}
					break;
					case "proveedores":
						if (borra || cambios[1].cambios==2){
							provee=val;
							localStorage.setItem("proveedores",JSON.stringify(provee));
						} else {
							ProcesaModificacion(key,val);
							}							
					break;		
					case "inciden":
						inciden=val;
						if (borra || cambios[2].cambios==2){
							insertaIncidencias();
						} else {
							actualizaIncidencias(false);
							}
						break;						
					case "gestiones":
						gestiones=val;
						if (borra || cambios[3].cambios==2){
							insertaGestiones();
						} else {
							actualizaGestiones(false);
							}						
						break;
					case "polizas":
						if (borra || cambios[4].cambios==2){
							polizas=val;
							localStorage.setItem("polizas",JSON.stringify(polizas));
						} else {
							ProcesaModificacion(key,val);
							}							
						break;
					case "tipo_per":
						tipo_per=val;
						localStorage.setItem("tipo_per",JSON.stringify(tipo_per));
						break;
					case "tipo_lla":
						tipo_lla=val;
						localStorage.setItem("tipo_lla",JSON.stringify(tipo_lla));
						break;			
					case "comunidad_proveedor":
						comunidad_proveedor=val;
						localStorage.setItem("comunidad_proveedor",JSON.stringify(comunidad_proveedor));
					break;
					case "listin_telefonos":
						if (borra || cambios[7].cambios==2){
							listin_telefonos=val;
							localStorage.setItem("listin_telefonos",JSON.stringify(listin_telefonos));
						} else {
							ProcesaModificacion(key,val);
							}							
					break;
					case "agenda":
						if (borra || cambios[8].cambios==2){
							agenda=val;
							localStorage.setItem("agenda",JSON.stringify(agenda));
						} else {
							ProcesaModificacion(key,val);
							}							
					break;
					case "pisos":
						pisos=val;
						if (borra || cambios[9].cambios==2){
							insertaDatos();
						} else {
							actualizaDatos();
							}
					break;
					
					}			
				// } else {
			// ProcesaModificacion(key,val);
			// }
		
		}
	
    });
   
//	}
// catch (error){
//	SimpleMensaje("ERROR en "+tmp+": Demasiados datos para este dispositivo. No se han podido almacenar la totalidad de la información.", 9000);
// 	}
}



function ProcesaModificacion(key, val){
	var vale=[false];
	var tmp;
	if (key=='proveedores')
		tmp=provee;
	else
		tmp = eval(key);
	
	for (var i=0;i<val.length;i++){
		try {
			var flag=false;
			for (var j=0; j<tmp.length;j++){
				if (ComparaCodigos(key, val[i],tmp[j],vale)){
					flag=true;
					break;
					}
				}
			if (val[i].cambio&4){
				if (flag) tmp.splice(j,1);
				} else {				
			if (ComparaNulo(key, val[i]) && (val[i].cambio&1 || val[i].cambio&2)){
				val[i].cambio=0;
				if (flag) {
					tmp[j]=val[i];
					} else {
						if (key=='inciden')
							tmp.unshift(val[i]);
						else {
							tmp.push(val[i]);
							if (key=='gestiones')
								if (val[i].cod_gestion==1){
									for (var j=0; j<inciden.length;j++){
										if (val[i].num_incidencia==inciden[j].codigo){
											inciden[j].ultima_gestion=val[i].fecha;
											break;
											}
										}								
									}
							}
					}
				}
			}
		} catch(e){}
	}
	localStorage.setItem(key,JSON.stringify(tmp));		
}


function ComparaCodigos(tabla, val, tmp){
	var ret=false;
	
	switch(tabla){
		case "comunidad":
			//ret=(val.UID==tmp.UID?true:false);
			ret=(val.indice==tmp.UID?true:false);
		break;
		case "inciden":
		case "polizas":
		case "proveedores":
			ret=(val.indice==tmp.codigo?true:false);
		break;
		case "agenda":
		case "gestiones":
		case "pisos":
			ret=(val.indice==tmp.id?true:false);
		break;
		}
	return ret;
}

function ComparaNulo(tabla, val){
	var vale=false;
	
	switch(tabla){
		case "comunidad":
			vale=(val.UID==null?false:true);
		break;
		case "inciden":
		case "polizas":
		case "proveedores":			
			vale=(val.codigo==null?false:true);
		break;
		case "gestiones":
		case "agenda":
		case "pisos":
			vale=(val.id==null?false:true);
		break;
		}
	return vale;
}

function recupera_datos(){

	if (localStorage.getItem("comunidad")!=null) comunidad = $.parseJSON(localStorage.getItem("comunidad")); 	
	if (localStorage.getItem("proveedores")!=null) provee = $.parseJSON(localStorage.getItem("proveedores")); 	
	if (localStorage.getItem("inciden")!=null){ 
		inciden = $.parseJSON(localStorage.getItem("inciden"));
		for (var i=0;i<inciden.length;i++)
			if (inciden[i].cambio>0){
				hay_cambio_inciden=true;
				break;
				}		
		}
	if (localStorage.getItem("gestiones")!=null){ 
		gestiones = $.parseJSON(localStorage.getItem("gestiones"));
		for (var i=0;i<gestiones.length;i++)
			if (gestiones[i].cambio>0){
				hay_cambio_gestion=true;
				break;
				}
		}
	if (localStorage.getItem("polizas")!=null) polizas = $.parseJSON(localStorage.getItem("polizas")); 	
	if (localStorage.getItem("tipo_per")!=null) tipo_per = $.parseJSON(localStorage.getItem("tipo_per")); 	
	if (localStorage.getItem("tipo_lla")!=null) tipo_lla = $.parseJSON(localStorage.getItem("tipo_lla")); 	
	if (localStorage.getItem("comunidad_proveedor")!=null) comunidad_proveedor = $.parseJSON(localStorage.getItem("comunidad_proveedor")); 	
	if (localStorage.getItem("listin_telefonos")!=null) listin_telefonos = $.parseJSON(localStorage.getItem("listin_telefonos")); 	
	if (localStorage.getItem("agenda")!=null) agenda = $.parseJSON(localStorage.getItem("agenda"));
	if (localStorage.getItem("pisos")!=null) pisos = $.parseJSON(localStorage.getItem("pisos")); 	

}




//RELLENA EDIFICIOS
var edificios ;

function RellenaEdificios(){
    // $('[data-role=header],[data-role=footer]').fixedtoolbar({ tapToggle:false });
	edificios=new lista("#listaedificios", "#p_edificios", 0);
	// edificios.formato=Array('<h3>@</h3>', '<p><strong>@</strong></p>', '<p>@</p>', '<p class="ui-li-aside"><strong>@</strong></p>');
	edificios.tipo=Array(1,1,1,1);	//0=nada   1=texto    2=fecha   3=boolean
	// mm=document.createElement("SQLResultSet");
	// tr=document.createElement("tr");

	edificios.texto(0, true, '<small style="position:absolute; left:2px"></small><small style="position:absolute; left:10%">Todos los edificios</small><small style="position:absolute; left:70%;"></small>');
	if (comunidad!=null){
		for (var i=0;i<comunidad.length;i++) {
			edificios.texto(comunidad[i].numcomu, false, '<small style="position:absolute; left:2px">'+comunidad[i].numcomu+'</small><small style="position:absolute;left:10%;display:block;width:60%;overflow:hidden;">'+comunidad[i].nomcomu+'</small><small style="position:absolute; left:75%;">'+comunidad[i].poblacomu+'</small>');
			}
		}

	edificios.repinta();
	}
function FinEdificios(){
	edificios.fin();
	edificios="";
}

function UnEdificio(){
	if (edificios.id()>0){
		for (var i=0;i<comunidad.length;i++) {
			if (comunidad[i].numcomu==edificios.id()){
				$("#com_num").html('<strong>'+comunidad[i].numcomu+'</strong>');
				$("#com_nom").html('<strong>'+comunidad[i].nomcomu+'</strong>');
				$("#com_nif").html('<strong>'+VN(comunidad[i].nif)+'</strong>');
				$("#com_dir").html('<strong>'+comunidad[i].dircomu+'</strong>');
				$("#com_pos").html('<strong>'+VN(comunidad[i].cod_postal)+'</strong>');
				$("#com_pob").html('<strong>'+VN(comunidad[i].poblacomu)+'</strong>');
				$("#com_pro").html('<strong>'+VN(comunidad[i].provincia)+'</strong>');

				// $("#com_res_a").text(VN("PEPE"));
				$("#com_rea_nom").html('<strong>'+VN(comunidad[i].respons1)+'</strong>');
				$("#com_rea_cor").html('<strong>'+VN(comunidad[i].correo1)+'</strong>');
				$("#com_rea_tel").html('<strong>'+VN(comunidad[i].telefono1)+'</strong>');

				$("#com_reb_nom").html('<strong>'+VN(comunidad[i].respons2)+'</strong>');
				$("#com_reb_cor").html('<strong>'+VN(comunidad[i].correo2)+'</strong>');
				$("#com_reb_tel").html('<strong>'+VN(comunidad[i].telefono2)+'</strong>');
				for (var j=0;j<tipo_per.length;j++) {
					if (comunidad[i].tipo_per1==tipo_per[j].codigo){
						$("#com_res_a").html('<strong>Responsable A: '+VN(tipo_per[j].descripcion)+'</strong>');
						break;
						}
					}
				for (var j=0;j<tipo_per.length;j++) {
					if (comunidad[i].tipo_per2==tipo_per[j].codigo){
						$("#com_res_b").html('<strong>Responsable B: '+VN(tipo_per[j].descripcion)+'</strong>');
						break;
						}
					}
				
				
				break;
				}
			}		
		$.mobile.changePage('#unedificio',{transition:"none"});
		}
    

}

function UnProveedor(){
	InformacionProveedor(proveedores.id());
}

function UnProveedorCon(){
	InformacionProveedor(contratos.id());
	
}function UnProveedorPol(){
	InformacionProveedor(poliz.id());
}

function InformacionProveedor(elproveedor){
		for (var i=0;i<provee.length;i++) {
			if (provee[i].codigo==elproveedor){
				$("#pro_num").html('<strong>'+provee[i].codigo+'</strong>');
				$("#pro_nom").html('<strong>'+provee[i].razon+'</strong>');
				$("#pro_nif").html('<strong>'+(provee[i].lnif==""?provee[i].nnif+provee[i].cnif:provee[i].lnif+provee[i].nnif)+'</strong>');
				$("#pro_dir").html('<strong>'+VN(provee[i].direccion)+'</strong>');
				$("#pro_pos").html('<strong>'+VN(provee[i].cod_postal)+'</strong>');
				$("#pro_pob").html('<strong>'+VN(provee[i].poblacion)+'</strong>');
				$("#pro_pro").html('<strong>'+VN(provee[i].provincia)+'</strong>');
				$("#pro_obs").html('<strong>'+VN(provee[i].observacio)+'</strong>');
				
				$("#pro_te1").html('<strong>'+VN(provee[i].tfno)+'</strong>');
				$("#pro_te2").html('<strong>'+VN(provee[i].tfno2)+'</strong>');
				$("#pro_fax").html('<strong>'+VN(provee[i].fax)+'</strong>');

				break;
				}
			}		
		$.mobile.changePage('#unproveedor',{transition:"none"});
}


function UnContrato(){
	ContratoPoliza(contratos.id(), true);
	
}function UnaPoliza(){
	ContratoPoliza(poliz.id(), false);
}

function ContratoPoliza(elcontrato, contrato){
	edita_contrato=contrato;
	$("#pro_num").text((contrato?"Datos del contrato":"Datos de la poliza"));
	
	for (var i=0;i<polizas.length;i++) {
		if (polizas[i].codigo==elcontrato && polizas[i].contrato==contrato){
			$("#pol_num").html('<strong>'+polizas[i].codigo+'</strong>');
			$("#pol_fec").html('<strong>'+ConvierteEnFecha(polizas[i].fecha)+'</strong>');
			for (var j=0;j<comunidad.length;j++) {
				if (comunidad[j].numcomu==polizas[i].edificio){
					$("#pol_edi").html('<strong>'+VN(comunidad[j].nomcomu)+'</strong>');
					break;
					}
				}

			$("#pol_ref").html('<strong>'+VN(polizas[i].referencia)+'</strong>');
			$("#pol_des").html('<strong>'+VN(polizas[i].descripcion)+'</strong>');
			$("#pol_ven").html('<strong>'+ConvierteEnFecha(VN(polizas[i].fvenci))+'</strong>');
			$("#pol_rev").html('<strong>'+VN(polizas[i].rev_cada)+" "+VN(polizas[i].rev_perido)+'</strong>');
			$("#pol_obs").html('<strong>'+VN(polizas[i].observa)+'</strong>');		
			$("#pol_cob").html('<strong>'+VN(polizas[i].cobertura)+'</strong>');
			$("#pol_sin").html('<strong>'+VN(polizas[i].caso_sini)+'</strong>');

			for (var j=0;j<provee.length;j++) {
				if (provee[j].codigo==polizas[i].proveedor){
					$("#pol_pro_con").html('<strong>'+VN(provee[j].razon)+'</strong>');
					$("#pol_pro_te1").html('<strong>'+VN(provee[j].tfno)+'</strong>');
					$("#pol_pro_te2").html('<strong>'+VN(provee[j].tfno2)+'</strong>');
					$("#pol_pro_fax").html('<strong>'+VN(provee[j].fax)+'</strong>');
					$("#pol_pro_ema").html('<strong>'+VN(provee[j].correo)+'</strong>');
					$("#pol_pro_web").html('<strong>'+VN(provee[j].web)+'</strong>');
					break;
					}
				}
			break;
			}
		}		
	$.mobile.changePage('#uncontratopoliza',{transition:"none"});
}

function VolverContratoPoliza(){
	if (edita_contrato)
		$.mobile.changePage('#contratos',{transition:"none"});
	else
		$.mobile.changePage('#polizas',{transition:"none"});	

}


function SeleccionaEdificio(){
	num_edificio=edificios.id();
	if (num_edificio==0)
		num_edificio=-1;
	SeleccionaEdificioSub();
	PaginaPrincipal();
}

function PrincipalIncidencias(){
CambiaEstadoIncidencias('incidencias_inc',-1);
PaginaPrincipal();
}

function SeleccionaEdificioSub(){
	if (num_edificio>0) {
		for (var i=0;i<comunidad.length;i++) {
			if (comunidad[i].numcomu==num_edificio){
				nom_edificio=comunidad[i].nomcomu;
				}
			} 
	} else {
		nom_edificio="Todos los edificios";
	}
    $('#sel_edificio').text(nom_edificio);
}


//RELLENA PROVEEDORES
var proveedores;

function RellenaProveedores(){
    // $('[data-role=header],[data-role=footer]').fixedtoolbar({ tapToggle:false });

	$('#fil_pro_edificio').text(nom_edificio);
	var primer=true; 
	proveedores = new lista("#listaproveedores", "#p_proveedores", 0);
	if (provee!=null){
		for (var i=0;i<provee.length;i++) {
			if (num_edificio==-1)
				si=true;
			else
				si=ProveedorEdificio(num_edificio, provee[i].codigo);
			if (si) {
				proveedores.texto(provee[i].codigo, (primer), '<small style="position:absolute; left:2px;display:block;width:74%;overflow:hidden;">'+provee[i].razon+'</small><small style="position:absolute;left:75%">'+provee[i].tfno+'</small>');
				primer=false;
				}
			}
			
		}

	proveedores.repinta();
	}

function FinProveedores(){
	proveedores.fin();
	proveedores="";
}

function ProveedorEdificio(edificio, proveedor){
	for (var i=0;i<comunidad_proveedor.length;i++) {
		if (edificio==comunidad_proveedor[i].edificio && comunidad_proveedor[i].proveedor==proveedor){
			return (true);
			break;
			}		
	}
return false;
}




//RELLENA CONTRATOS
var contratos;
function RellenaContratos(){
	var privez=true;
	$('#fil_con_edificio').text(nom_edificio);
	contratos = new lista("#listacontratos", "#p_contratos", 0);
	for (var i=0;i<polizas.length;i++) {
		if (polizas[i].contrato==true && (num_edificio==-1 || num_edificio==polizas[i].edificio)) {
			contratos.texto(polizas[i].codigo, privez, '<small style="position:absolute; left:2px">'+polizas[i].referencia+'</small><small style="position:absolute; left:25%">'+polizas[i].edificio+'</small><small style="position:absolute; left:32%">'+polizas[i].descripcion+'</small>');
			privez=false;
			}
		} 

	contratos.repinta();
	}
function FinContratos(){
	contratos.fin();
	contratos="";
}


//RELLENA POLIZAS
var poliz;
function RellenaPolizas(){
	var privez=true;
	$('#fil_pol_edificio').text(nom_edificio);
	poliz = new lista("#listapolizas", "#p_polizas", 0);

	for (var i=0;i<polizas.length;i++) {
		if (polizas[i].contrato==false && (num_edificio==-1 || num_edificio==polizas[i].edificio)){
			poliz.texto(polizas[i].codigo, privez, '<small style="position:absolute; left:2px">'+polizas[i].referencia+'</small><small style="position:absolute; left:25%">'+polizas[i].edificio+'</small><small style="position:absolute; left:32%">'+polizas[i].descripcion+'</small>');
			privez=false;
			}
		}

	poliz.repinta();
	}

function FinPolizas(){
	poliz.fin();
	poliz="";
}


//RELLENA LISTIN
var listin;

function RellenaListin(){
	//$('#fil_pro_listin').text(nom_edificio);	
	$('#fil_pro_listin').text((num_edificio>0?nom_edificio:"Listín personal"));
	   	
	listin = new lista("#listalistin", "#p_listin", 0);
	if (num_edificio<=0) {
		if (listin_telefonos!=null){
			for (var i=0;i<listin_telefonos.length;i++) {
				listin.texto(i+1, (i==0?true:false), '<small style="position:absolute; left:2px;display:block;width:74%;overflow:hidden;">'+listin_telefonos[i].razon+'</small><small style="position:absolute; left:75%">'+listin_telefonos[i].tfno+'</small>');
				}
			}
	} else  {
		RellenaListinSub(listin,num_edificio);
		
	}
	listin.repinta();
	}

function FinListin(){
	listin.fin();
	listin="";
}

function UnListin(){
	InformacionListin(listin.id());
}

function InformacionListin(elproveedor){
	var i;
	if (num_edificio<=0) {
		i = elproveedor-1;
		$("#lis_nom").html('<strong>'+provee[i].razon+'</strong>');
		$("#lis_dir").html('<strong>'+VN(provee[i].direccion)+'</strong>');
		$("#lis_pos").html('<strong>'+VN(provee[i].cod_postal)+'</strong>');
		$("#lis_pob").html('<strong>'+VN(provee[i].poblacion)+'</strong>');
		$("#lis_pro").html('<strong>'+VN(provee[i].provincia)+'</strong>');
		$("#lis_te1").html('<strong>'+VN(provee[i].tfno)+'</strong>');
		$("#lis_te2").html('<strong>'+VN(provee[i].tfno2)+'</strong>');
		$("#lis_fax").html('<strong>'+VN(provee[i].fax)+'</strong>');
		$("#lis_ema").html('<strong>'+VN(provee[i].email)+'</strong>');
	} else  {
		BuscaUnListin(listin,elproveedor);
		
	}
	$.mobile.changePage('#unlistin',{transition:"none"});
}



//RELLENA AGENDA
var agen;

function RellenaAgenda(){	
	hoy = new Date();
	$('#ea_fecha').attr('value', FormatoFecha(hoy));
	RellenaAgendaFecha(hoy);
	}

function CambiaAgendaTiempo(event){
	RellenaAgendaFecha(CampoFecha($('#ea_fecha').attr('value')));
}

function CambiaAgendaFecha(event){
	RellenaAgendaFecha(CampoFecha($('#ea_fecha').attr('value')));
}

function RellenaAgendaFecha(fecha){
	var fecha1=new Date();
	var fecha2=new Date();
	
	fecha1.setDate(fecha.getDate());
	fecha2.setDate(fecha.getDate());
	
	switch($('#ea_tiempo')[0].selectedIndex){
		case 0:
			break;
		case 1:
			var dia=fecha1.getUTCDay()-1;
			fecha1.setDate(fecha1.getDate()-dia);		
			fecha2.setDate(fecha1.getDate()+6);				
			break;
		
		case 2:
			fecha1=new Date(fecha.getYear()+1900, fecha.getMonth()-1, 1);
			fecha2=new Date(fecha.getYear()+1900, fecha.getMonth(), 1);
			fecha2.setDate(fecha2.getDate()-1);
			break;
		case 3:
			fecha1=new Date(fecha.getYear()+1900, fecha.getMonth()-2, 1);
			fecha2=new Date(fecha.getYear()+1900, fecha.getMonth()+1, 1);
			fecha2.setDate(fecha2.getDate()-1);			
		break;
		}
	$('#ea_desde').text(FormatoFecha(fecha1));
	$('#ea_hasta').text(FormatoFecha(fecha2));
	RellenaAgendaSub(fecha1,fecha2);
	}


function RellenaAgendaSub(fecha1,fecha2){	
	var primer=true; 
	
	agen = new lista("#listaagenda", "#p_agenda", 0);
	if (agenda!=null){
		for (var i=0;i<agenda.length;i++) {
			if (FiltroAgenda(ValorFecha(agenda[i].fecha),fecha1,fecha2)) {
				agen.texto(i+1, primer, '<small style="position:absolute; left:2px">'+ConvierteEnFecha(agenda[i].fecha)+'</small><small style="position:absolute; left:15%">'+agenda[i].hora+'</small><small style="position:absolute; left:25%">'+agenda[i].texto+'</small>');
				primer=false;
				}
			}
		}
	agen.repinta();
	}


function FinAgenda(){
	agen.fin();
	agen="";
}

function FiltroAgenda(fecha,fecha1,fecha2){
	if (fecha.getTime()>=fecha1.getTime() && fecha.getTime()<=fecha2.getTime())
		return true;
}





// RELLENA INCIDENCIAS
var incidencias;
// var incidencias_com;

var incidencias_edi;
var incidencias_ges;
var incidencias_pro;
var incidencias_pol;
var incidencias_vec;

function RellenaIncidencias(){
	if (!estado_original){
		estado_inc_fil=false;
		estado_inc_edi=false;
		estado_opciones=(localStorage.getItem("MasOpciones")=="true"?true:false);
		$('#incidencias_fil').hide();
		$('#incidencias_edi').hide();
		if (estado_opciones)
			$('#mas_opciones_inc').show();
		else
			$('#mas_opciones_inc').hide();
		}
	if (hay_cambio_servidor==1){
		hay_cambio_servidor=0;
		Semaforos();
		}
	
	$('#fil_inc_edificio').text(nom_edificio);
	incidencias = new lista("#listaincidencias", "#p_incidencias", 0);
	hoy = new Date();
	RellenaIncidenciasSub();
	}

function RellenaIncidenciasEdi(edita){
	FiltroIncidencias (false);
	incidencias_edi = new lista("#listaincidencias_edi", "#p_incidencias", 2, 'min-height:15px; padding-top:.4em;');
	incidencias_edi.accion((edita?PulsaSobreEdi2:PulsaSobreEdi1));
	incidencias_edi.texto(-1, true, '<p class="ui-li-aside"><small class="ui-li-aside" style="position:absolute; left:2px"></small><small style="position:absolute; left:10%">Todas las comunidades</small><small style="position:absolute; left:70%;"></small></p>');
	if (comunidad!=null){
		for (var i=0;i<comunidad.length;i++) {
			incidencias_edi.texto(comunidad[i].numcomu, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">'+comunidad[i].numcomu+'</small><small style="position:absolute; left:10%">'+comunidad[i].nomcomu+'</small><small style="position:absolute; left:70%;">'+comunidad[i].poblacomu+'</small></p>');
			} 
		}
	incidencias_edi.repinta();
}



function RellenaIncidenciasPro(edificio){
	var si;
	incidencias_pro = new lista("#listaincidencias_pro", "#p_incidencias",  2, 'min-height:15px; padding-top:.4em;');
	incidencias_pro.accion(PulsaSobrePro);
	if (provee!=null){
		
		incidencias_pro.texto(-1, true, '<p class="ui-li-aside"><small style="position:absolute; left:2px">No selecciona proveedor</small></p>');
		incidencias_pro.texto(0, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">Proveedor sin definir</small></p>');
		for (var i=0;i<provee.length;i++) {
			if (edificio>0)
				si=ProveedorEdificio(edificio, provee[i].codigo);
			else
				si=true;
			
			if (si)
				incidencias_pro.texto(provee[i].codigo, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">'+provee[i].razon+'</small><small style="position:absolute; left:75%">'+provee[i].tfno+'</small></p>');
			}
		}
	incidencias_pro.repinta();
}

function RellenaIncidenciasPol(edificio){
	incidencias_pol = new lista("#listaincidencias_pol", "#p_incidencias",  2, 'min-height:15px; padding-top:.4em;');
	incidencias_pol.accion(PulsaSobrePol);
	if (polizas!=null){
		incidencias_pol.texto(-1, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px"></small><small style="position:absolute; left:25%">No selecciona póliza</small></p>');
		
		for (var i=0;i<polizas.length;i++) {
			if (edificio==polizas[i].edificio)
				incidencias_pol.texto(provee[i].codigo, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">'+polizas[i].referencia+'</small><small style="position:absolute; left:25%">'+polizas[i].descripcion+'</small></p>');
			}
		}
	incidencias_pol.repinta();
}


function RellenaIncidenciasVec(edificio){
    FiltroIncidencias (false);
    incidencias_vec = new lista("#listaincidencias_vec", "#p_incidencias",  2, 'min-height:15px; padding-top:.4em;');
    incidencias_vec.accion(PulsaSobreVec);
    incidencias_vec.texto(0, false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">Salir sin cambiar</small></p>');
    if (edificio!=""){
        db.transaction(function(tx) {
            tx.executeSql("SELECT id, piso, nom, t1 FROM pisos WHERE comu="+edificio+" ORDER BY piso", [], function(tx, rs) {
                // alert('HOLA');
                for (var i=0; i<rs.rows.length; i++) {
                    var row = rs.rows.item(i);
                    incidencias_vec.texto(row['id'], false, '<p class="ui-li-aside"><small style="position:absolute; left:2px">'+row['piso']+' ('+row['nom'].substring(0,20)+')'+'</small><small style="position:absolute; left:75%">'+row['t1']+'</small></p>');
                    }   
                incidencias_vec.repinta();
                }, Mal);
            }, Mal);
        } else 
            incidencias_vec.repinta();
}

function RellenaIncidenciasGes(id){
	var flag=true;
	var ultima=null;
	IndiceEdicion=id;	
	incidencias_ges = new lista("#listaincidencias_ges", "#p_incidencias",  0);
    db.transaction(function(tx) {
    	tx.executeSql("SELECT texto1, id_gesinedi FROM inciden WHERE codigo="+id, [], function(tx, rs) {
       		if (rs.rows.length>0) {
    			var row = rs.rows.item(0);
    			incidencias_ges.cabecera(-1, "INCIDENCIA: "+(row['texto1']==undefined?"":row['texto1']));
    			IndiceEdicionGesinedi=row['id_gesinedi'];
    		    db.transaction(function(sx) {
    		    	sx.executeSql("SELECT * FROM gestiones WHERE cod_incidencia="+row['id_gesinedi']+" AND not (cambio & 4)  ORDER BY cod_gestion", [], function(sx, rs) {
    		       		for (var i=0; i<rs.rows.length; i++) {
    		    			var row2 = rs.rows.item(i);
    		    			incidencias_ges.texto(row2['id'], flag, TextoGestion(row2));
    		    			fag=false;
    		                }   
    		       		incidencias_ges.repinta();
    		        }, Mal);
    		    }, Mal);   
    			
    		    }           
        }, Mal);
    }, Mal);
}



function TextoGestion(gestiones){
return 	'<small style="position:absolute; left:2px">'+gestiones['cod_gestion']+'</small><small style="position:absolute; left:10%">'+FormatoFecha(new Date(gestiones['fecha']))+'</small><small style="position:absolute; left:30%;">'+gestiones['detalle']+'</small>';

}

function PulsaSobreEdi1(sel){
	num_edificio=sel.attr("id");
	SeleccionaEdificioSub();
	CambiaEstadoIncidencias('incidencias_inc',-1);
	$('#fil_inc_edificio').text(nom_edificio);
	RellenaIncidenciasSub();
}

function PulsaSobreEdi2(sel){
	var edificio=sel.attr("id");
	$('#ei_edificio').attr('value', edificio);
	for (var j=0;j<comunidad.length;j++){
		if (comunidad[j].numcomu==edificio){
			$('#ei_edi_nombre').attr('value', comunidad[j].nomcomu);
			break;
			}
		}
	CambiaEstadoIncidencias('incidencias_edita_inc', -2);
}

function PulsaSobrePol(sel){
	num_poliza=sel.attr("id");
	// SeleccionaEdificioSub();
	CambiaEstadoIncidencias('incidencias_asigna');
	if (num_poliza>0){
		for (var i=0;i<polizas.length;i++) {
			if (num_poliza==polizas[i].codigo){
				$('#ea_pol_siniestro').attr("value", polizas[i].descripcion);
				AsignacionPintaPro(polizas[i].proveedor);
				break;
				}
			}
		}
	RellenaIncidenciasSub();
}


function PulsaSobreVec(sel){    
    // num_vecino=sel.attr("id");
    // SeleccionaEdificioSub();
    
    CambiaEstadoIncidencias('incidencias_edita_inc', -2);
    RellenaIncidenciasSub();

    BuscaVecSub(sel.attr("id"));
}

function BuscaVecSub(id){
    db.transaction(function(tx) {
        tx.executeSql("SELECT id, piso, nom, t1, t2, t3, email FROM pisos WHERE id="+id, [], function(tx, rs) {
            if (rs.rows.length>0){
                var row = rs.rows.item(0);
                
                $("#ei_com_nombre").attr('value',row['nom']);
                $("#ei_com_piso").attr('value',row['piso']);
                $("#ei_com_telefono").attr('value',row['t1']);                        
                }
            }, Mal);
        }, Mal);
}



function CambiaSiniestro(event){
	if ($('#ea_siniestro:checked').val()=="on") {
		AsignacionPintaPro(0);
		}
	else {
		$('#ea_pol_siniestro').attr("value", "");
	}
		
}


function RellenaIncidenciasSub(){
	var flag=true;

	incidencias.borra();
    db.transaction(function(tx) {
    	tx.executeSql("SELECT * FROM inciden "+SelecIncidencia()+" ORDER BY fecha DESC", [], function(tx, rs) {
       		for (var i=0; i<rs.rows.length; i++) {
    			var row = rs.rows.item(i);
                incidencias.texto(row['codigo'], flag, TextoInciencia(row));
    			fag=false;
                }   
             incidencias.repinta();
        }, Mal1);
    }, Mal1);
		
}

function TextoInciencia(row){
	if (row['concluida']=="true" || row['concluida']==1)
		return ((row['ultima_gestion']!=""?'<img style="position:absolute; left:2px; top:9px; -webkit-border-bottom-left-radius: 0em; border-bottom-left-radius: 0em;" src="./mapa/telefono.png"/>':'')+'<small style="color:blue; position:absolute; left:12px; width:22%; text-align:right;">'+FormatoFecha(new Date(row['fecha']))+'</small><small style="color:blue; position:absolute; left:26%; width:7%; text-align:right;">'+row['numcomu']+'</small><small style="color:blue; position:absolute; left:34%;">'+(row['texto1']==undefined?"":row['texto1'])+'</small>');
	 else {	
		if (row['asignada']=="true" || row['asignada']==1)		 
			return ((row['ultima_gestion']!=""?'<img style="position:absolute; left:2px; top:9px; -webkit-border-bottom-left-radius: 0em; border-bottom-left-radius: 0em;" src="./mapa/telefono.png"/>':'')+'<small style="color:green; position:absolute; left:12px; width:22%; text-align:right;">'+FormatoFecha(new Date(row['fecha']))+'</small><small style="color:green; position:absolute; left:26%; width:7%; text-align:right;">'+row['numcomu']+'</small><small style="color:green; position:absolute; left:34%;">'+(row['texto1']==undefined?"":row['texto1'])+'</small>');
		else		
			return ((row['ultima_gestion']!=""?'<img style="position:absolute; left:2px; top:9px; -webkit-border-bottom-left-radius: 0em; border-bottom-left-radius: 0em;" src="./mapa/telefono.png"/>':'')+'<small style="color:red; position:absolute; left:12px; width:22%; text-align:right;">'+FormatoFecha(new Date(row['fecha']))+'</small><small style="color:red; position:absolute; left:26%; width:7%; text-align:right;">'+row['numcomu']+'</small><small style="color:red; position:absolute; left:34%;">'+(row['texto1']==undefined?"":row['texto1'])+'</small>');
			
	 }
	
}

function PulsaSobrePro(sel){
	var num_proveedor=sel.attr("id");
	if (num_proveedor>=0){
		$('#ea_proveedor').attr("value", num_proveedor);
		AsignacionPintaPro(num_proveedor);
		}
	CambiaEstadoIncidencias('incidencias_asigna');
	
}



function SelecIncidencia() {
	var ret="WHERE not (cambio & 4)";
	var fec;
    
	if (num_edificio>0) ret=ret+" AND numcomu="+num_edificio;
		
	if (fil_inc_est!="Todas" && ret!="") ret=ret+" AND ";
	if (fil_inc_est=="Pendiente") ret=ret+" concluida=0";
	if (fil_inc_est=="Concluida") ret=ret+" concluida<>0";
	if (fil_inc_est=="Sin asignar") ret=ret+" asignada=0";
	if (fil_inc_est=="Asignada") ret=ret+" asignada<>0";
		

	if (fil_inc_per!="Todas") {
		if (ret!="") ret=ret+" AND ";
		switch (fil_inc_per){
			case "Semana":
				 fec=RestaDiasFecha(hoy,7);
				 break;
			case "Mes":
				 fec=RestaDiasFecha(hoy,30);
				  break;
			case "Trimestre":
				 fec=RestaDiasFecha(hoy,91);
				  break;
			case "Semestre":
				 fec=RestaDiasFecha(hoy,182);			
				 break;
			case "Ano":
				 fec=RestaDiasFecha(hoy,365);
				 break;
			}
		ret=ret+"fecha>='"+fec.getISO()+"'";
		// ret=ret+"fecha>='10-10-2012'";
		}
	
	if (fil_inc_tip!="Todas" && ret!="") ret=ret+" AND ";
	if (fil_inc_tip=="Incidencias") ret=ret+" tiporeg='I'";
	if (fil_inc_tip=="Siniestros") ret=ret+" tiporeg='S'";
	if (fil_inc_tip=="Llamadas") ret=ret+" tiporeg='L'";
	if (fil_inc_tip=="Pedidos") ret=ret+" tiporeg='P'";
	//if (ret!="") ret=" WHERE "+ret;
	return ret;
}


function FinIncidencias(){
    $('#listaincidencias').empty();
    if (incidencias!=undefined) {
		incidencias.fin();
		if (hay_cambio_inciden || hay_cambio_gestion) {
			$("#ico_env").attr("src","./mapa/Rojo.png");	
			}
		}
	}


function CambiaIncidenciaTip(event){
	$('#fil_inc_tip').text($('#incidencias_tipo')[0].children[$('#incidencias_tipo')[0].selectedIndex].text);
	fil_inc_tip=$('#incidencias_tipo')[0].children[$('#incidencias_tipo')[0].selectedIndex].value;

	RellenaIncidenciasSub();
}

function CambiaIncidenciaTie(event){
	$('#fil_inc_per').text($('#incidencias_tiempo')[0].children[$('#incidencias_tiempo')[0].selectedIndex].text);   
	fil_inc_per=$('#incidencias_tiempo')[0].children[$('#incidencias_tiempo')[0].selectedIndex].value;
	RellenaIncidenciasSub();
}

function CambiaIncidenciaEst(event){
	$('#fil_inc_est').text($('#incidencias_estado')[0].children[$('#incidencias_estado')[0].selectedIndex].text);   
	fil_inc_est=$('#incidencias_estado')[0].children[$('#incidencias_estado')[0].selectedIndex].value;
	RellenaIncidenciasSub();
}


function BuscaIncidencia(Ejecuta){
	var num=0;
	num=incidencias.id();
    db.transaction(function(tx) {
        var sel = "SELECT * FROM inciden WHERE codigo="+num;
    	tx.executeSql(sel, [], function(tx, rs) {
    		if (rs.rows.length>0){
    			var row = rs.rows.item(0);
                Ejecuta(row);
                } 			
            }, Mal0);
    }, Mal0);	
}


function RellenaUnaIncidencia(inciden){
	$("#inc_est").html('<strong>'+(inciden['asignada']=="true" || inciden['asignada']==1?"ASIGNADA":"PENDIENTE DE ASIGNAR")+'</strong>');
	$("#inc_fec").html('<strong>'+FormatoFecha(new Date(inciden['fecha']))+'</strong>');
	$("#inc_hor").html('<strong>'+inciden['hora']+'</strong>');
	// $("#inc_rec").html('<strong>'+inciden[i].dircomu+'</strong>');		
	for (var j=0;j<comunidad.length;j++){
		if (comunidad[j].numcomu==inciden['numcomu']){
			$("#inc_edi").html('<strong>'+comunidad[j].nomcomu+'</strong>');
			break;
			}
		}
	$("#inc_com").html('<strong>'+inciden['comunicante']+'</strong>');
	$("#inc_nom").html('<strong>'+inciden['contacto']+'</strong>');
	$("#inc_tel").html('<strong>'+inciden['comunicante_telefono']+'</strong>');
	
	//$("#inc_cod").html('<strong>'+inciden[i].comunicante+'</strong>');
	$("#inc_tex1").html('<strong>'+inciden['texto1']+'</strong>');
	$("#inc_tex2").html('<strong>'+inciden['texto2']+'</strong>');

	$.mobile.changePage('#unaincidencia',{transition:"none"});
	}

function ActualizaIncidencia(row){
incidencias.actualiza(row['codigo'], TextoInciencia(row));
}


function EditaUnaIncidencia(inciden, numero){
	if (inciden!=null){
			IndiceEdicion=inciden['codigo'];
		
			$('#ei_edificio').attr('value', inciden['numcomu']);
			$('#ei_edi_nombre').attr('value', "Desconocida");
			for (var j=0;j<comunidad.length;j++){
				if (comunidad[j].numcomu==inciden['numcomu']){
					$('#ei_edi_nombre').attr('value', comunidad[j].nomcomu);
					break;
					}
				}
			
		    // $("#ei_comunicante").attr("value",(inciden[i].tipo_comunicante==undefined?"0":inciden[i].tipo_comunicante));
		    // $('#ei_comunicante').selectmenu('refresh');
		    
			$('#ei_com_nombre').attr('value', trim(inciden['comunicante']));
			$('#ei_com_calle').attr('value', trim(inciden['calle_piso']));
			$('#ei_com_piso').attr('value', trim(inciden['piso']));
			$('#ei_com_telefono').attr('value', trim(inciden['comunicante_telefono']));
			
			// $('#ei_inc_clave').attr('value', inciden[i].codaver);
			$('#ei_inc_fecha').attr('value', FormatoFecha(new Date(inciden['fecha'])));

			$('#ei_inc_descripcion').attr('value', trim(inciden['texto1']));
			$('#ei_inc_detalle').attr('value', trim(inciden['texto2']));
			$('#esta_asignada').text(inciden['asignada']=="true" || inciden['asignada']==1?'ASIGNADA':'NO ASIGNADA');
			$('#esta_concluida').text(inciden['concluida']=="true" || inciden['concluida']==1?'CONCLUIDA':'NO CONCLUIDA');
			$('#ei_inc_prioridad').attr('value', inciden['prioridad']);
			//$('#ei_inc_prioridad').selectedIndex=inciden['prioridad'];
		    $('#ei_inc_prioridad').selectmenu("refresh");
	} else {
		IndiceEdicion=-1;
		
		if (numero==-1) $('#ei_edificio').attr('value', '');
		if (num_edificio>0){
           if (numero==-1) $('#ei_edificio').attr('value', num_edificio);
        		
            for (var j=0;j<comunidad.length;j++){
                if (comunidad[j].numcomu==num_edificio){
                    $('#ei_edi_nombre').attr('value', comunidad[j].nomcomu);
                    break;
                    }
                }	    
		} 
		$('#ei_com_nombre').attr('value', '');
		$('#ei_com_calle').attr('value', '');
		$('#ei_com_piso').attr('value', '');
		$('#ei_com_telefono').attr('value', '');
		
		// $('#ei_inc_clave').attr('value', '');
		$('#ei_inc_fecha').attr('value', FormatoFecha(hoy));
		$('#ei_inc_descripcion').attr('value', '');
		$('#ei_inc_detalle').attr('value', '');
		$('#esta_asignada').text('NO ASIGNADA');
		$('#esta_concluida').text('NO CONCLUIDA');												
		}
}


function BuscaGestion(Ejecuta){
    db.transaction(function(tx) {
    	tx.executeSql("SELECT * FROM gestiones WHERE id="+incidencias_ges.id(), [], function(tx, rs) {
    		if (rs.rows.length>0){
    			var row = rs.rows.item(0);
                Ejecuta(row);
                }
    		else
                Ejecuta();   			
            }, Mal);
    }, Mal);	
}

function EditaUnaGestion(gestiones, numero){
	if (gestiones!=null){ 
		IndiceEdicionGes=gestiones['id'];
		$('#eg_fecha').attr('value', FormatoFechaCadena(gestiones['fecha']));
		$('#eg_limite').attr('value', FormatoFechaCadena(gestiones['limite']));
	
		$('#eg_contacto').attr('value', trim(gestiones['contacto']));
		$('#eg_telefono').attr('value', trim(gestiones['tfno_contacto']));
	
		$('#eg_detalle').attr('value', trim(gestiones['detalle']));
		$('#eg_observaciones').attr('value', trim(gestiones['observaciones']));	
	} else {
		IndiceEdicionGes=-1;
		if (numero==-1) {
			$('#eg_fecha').attr('value', "");
			$('#eg_limite').attr('value', "");
			}

		$('#eg_contacto').attr('value', '');
		$('#eg_telefono').attr('value', '');

		$('#eg_detalle').attr('value', '');
		$('#eg_observaciones').attr('value', '');										
		}

}



function EditaUnaAsignacion(inciden){
		if (inciden!=null){
			IndiceEdicion=inciden['codigo'];
			$('#ea_edificio').attr('value', inciden['numcomu']);
			for (var j=0;j<comunidad.length;j++){
				if (comunidad[j].numcomu==inciden['numcomu']){
					$('#ea_edi_nombre').attr('value', comunidad[j].nomcomu);
					break;
					}
				}
			AsignacionPintaPro((inciden['asignada']=="true" || inciden['asignada']==1?inciden['proveedor']:0));
		}
	}
	
function AsignacionPintaPro(numero){
	if (numero==0){
		$('#ea_proveedor').attr('value', '');
		$('#ea_pro_nombre').attr('value', '');
		$('#ea_pro_contacto').attr('value', '');
		$('#ea_pro_tel1').attr('value', '');
		$('#ea_pro_tel2').attr('value', '');
		$('#ea_pro_fax').attr('value', '');
		$('#ea_pro_cor').attr('value', '');

	} else 	
	for (var j=0;j<provee.length;j++){
		if (provee[j].codigo==numero){
			$('#ea_proveedor').attr('value', provee[j].codigo);
			$('#ea_pro_nombre').attr('value', provee[j].razon);
			$('#ea_pro_contacto').attr('value', provee[j].contacto);
			$('#ea_pro_tel1').attr('value', provee[j].tfno);
			$('#ea_pro_tel2').attr('value', provee[j].tfno2);
			$('#ea_pro_fax').attr('value', provee[j].fax);
			$('#ea_pro_cor').attr('value', provee[j].correo);

			break;
			}
		}
	}
	

function GuardaAsignacion(){
	hay_cambio_inciden=true;
	var proveedor=$('#ea_proveedor').attr('value');
	
	db.transaction(function(tx) {
    	tx.executeSql("UPDATE inciden SET cambio=cambio|2, asignada=not asignada, proveedor=? WHERE codigo=?", [proveedor,IndiceEdicion], function(tx, rs) {
    	// incidencias.actualiza(IndiceEdicion, TextoInciencia(IndiceEdicion));   		
        CambiaEstadoIncidencias('incidencias_inc',-1);  
        }, Mal);
 		    	
    }, Mal); 
	
	//inciden[IndiceEdicion].cambio|=2;
	
	if ($('#ea_sms:checked').val()=="on"){
		mensaje_numero($('#ea_pro_tel1').attr('value'),"En la comunidad "+ $('#ea_edi_nombre').attr('value')+" se ha producido la incidencia "+ $('#ea_inc_descripcion').attr('value'));
		}
	
	
}

function ConcluirIncidencia(inciden){
	hay_cambio_inciden=true;
			
		db.transaction(function(tx) {
	    	tx.executeSql("UPDATE inciden SET cambio=cambio|2, concluida=not concluida WHERE codigo=?", [inciden], function(tx, rs) {
	    	// incidencias.actualiza(IndiceEdicion, TextoInciencia(IndiceEdicion));   		
	        CambiaEstadoIncidencias('incidencias_inc',-1);  
	        }, Mal);
	 		    	
	    }, Mal); 		
	}


function GuardarIncidencia(){
	if ($('#ei_edificio').attr('value')<=0){
		alert("No se puede crear una incidencia sin definir el edificio");
	} else {
		hay_cambio_inciden=true;
	
		var numcomu=$('#ei_edificio').attr('value');
		var numprop=0;
		var tipo_comunicante=0;
		var cargo="";
		var contacto="";
		var telefono1="";
		var telefono2="";
		var fax="";
		var email="";
		var id_gesinedi=0;
		var leida=0;
		
		var comunicante=$('#ei_com_nombre').attr('value');	
		var piso=$('#ei_com_piso').attr('value');
		var calle_piso=$('#ei_com_calle').attr('value');
		var fecha=ConvierteDeFecha($('#ei_inc_fecha').attr('value'));
		var comunicante_telefono=$('#ei_com_telefono').attr('value');
		var texto1=$('#ei_inc_descripcion').attr('value');
		var texto2=$('#ei_inc_detalle').attr('value');
		var prioridad=$('#ei_inc_prioridad').attr('value');
	
		var fecha_asig="";
		var fecha_conclu="";		
		
		if (IndiceEdicion<0) {
			var cambio=1;	
			var codigo;
			var tiporeg='I';
			var asignada=false;
			var concluida=false;
			var baja=false;
			// var prioridad=1;
			var recibida=false;
			var fectmp = new Date();
			var hora=fectmp.getHours()+":"+fectmp.getMinutes();
		
		    db.transaction(function(sx) {
		        sx.executeSql("SELECT MAX(codigo) as maximo FROM inciden", [], function(sx, rs) {
		        if (rs.rows.length>0){
		            var row = rs.rows.item(0);
		            var codigo=row['maximo']+1;
		            
		         	db.transaction(function(tx) {
		   	   			tx.executeSql("INSERT INTO inciden(ultima_gestion,codigo,fecha,hora,numcomu,numprop,tipo_comunicante,comunicante,cargo,contacto,telefono1,telefono2,fax,email,texto1,texto2,prioridad,recibida,asignada,concluida,id_gesinedi,leida,fecha_asig,fecha_conclu,tiporeg,cambio,piso,calle_piso,comunicante_telefono,baja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ["",codigo,EnFecha(fecha),hora,numcomu,numprop,tipo_comunicante,comunicante,cargo,contacto,telefono1,telefono2,fax,email,texto1,texto2,prioridad,recibida,asignada,concluida,id_gesinedi,leida,fecha_asig,EnFecha(fecha_conclu),tiporeg,cambio,piso,calle_piso,comunicante_telefono,baja], Bien, Mal);
    					    		    	
		    		    // }, Mal);
			    		incidencias.fin();
			    		incidencias = new lista("#listaincidencias", "#p_incidencias", 0);	
			    		RellenaIncidenciasSub();
			    		CambiaEstadoIncidencias('incidencias_inc',-1);		    		    	
			       }, Mal);
		            
		          	}
		        }, Mal);                
		   
		    }, Mal);	
		} else {
			db.transaction(function(tx) {
  		    	tx.executeSql("UPDATE inciden SET cambio=cambio|2,numcomu=?,comunicante=?,piso=?,calle_piso=?,fecha=?,comunicante_telefono=?,texto1=?,texto2=?,prioridad=? WHERE codigo=?", [numcomu,comunicante,piso,calle_piso,EnFecha(fecha),comunicante_telefono,texto1,texto2,prioridad,IndiceEdicion], function(tx, rs) {			    	  		      		    	
   		        }, Mal);
  		    	// incidencias.actualiza(IndiceEdicion, TextoInciencia(IndiceEdicion));
   		    	CambiaEstadoIncidencias('incidencias_inc',-1);  		    	
   		    }, Mal);  
		
			}
		}
}

function BorraIncidencia(numero){
	if (numero>=0){
			if (confirm("¿Seguro que quiere borrar esta incidencia?")){
				hay_cambio_inciden=true;
				db.transaction(function(tx) {
			    	tx.executeSql("UPDATE inciden SET cambio=cambio|4 WHERE codigo=?", [numero], function(tx, rs) {
			    		RellenaIncidenciasSub();		    	
			        }, Mal);
				 }, Mal);				
				
			}
	}

}


function MaxCodGestion(){
	var ret=1;
	for (var i=0; i<gestiones.length;i++) {
		if (gestiones[i].id>ret)
			ret=gestiones[i].id;
	}
	return ret+1;
}


function GuardarGestion(){
	hay_cambio_gestion=true;
	

	var fecha=FormatoIso($('#eg_fecha').attr('value'));
    var limite=FormatoIso($('#eg_limite').attr('value'));
    var contacto=$('#eg_contacto').attr('value');
    var tfno_contacto=$('#eg_telefono').attr('value');
    var detalle=$('#eg_detalle').attr('value');
    var observaciones=$('#eg_observaciones').attr('value');      
	if (IndiceEdicionGes<0) {	
	    db.transaction(function(rx) {
	        rx.executeSql("SELECT MAX(id) as id  FROM gestiones", [], function(rx, rs) {
	        if (rs.rows.length>0){
	            var row = rs.rows.item(0);
	            var id=row['id']+1;
	        	}
	            
	        db.transaction(function(sx) {
	        	sx.executeSql("SELECT MAX(cod_gestion) as maximo  FROM gestiones WHERE num_incidencia="+IndiceEdicion, [], function(sx, rs) {
	        		if (rs.rows.length>0){
	        			var row = rs.rows.item(0);
	        			var cod_gestion=(row['maximo']==null?1:row['maximo']+1);
	        			var num_incidencia=IndiceEdicion;
	          
	        			var acabada="";
	        			var gesdesp="";
	        			var cod_incidencia=IndiceEdicionGesinedi;
	        			var cambio=1;
	            
	        			db.transaction(function(tx) {
	        				tx.executeSql("INSERT INTO gestiones(id,cod_incidencia,cod_gestion,fecha,limite,contacto,tfno_contacto,detalle,observaciones,acabada,gesdesp,num_incidencia,cambio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id,cod_incidencia,cod_gestion,fecha,limite,contacto,tfno_contacto,detalle,observaciones,acabada,gesdesp,num_incidencia,cambio], Bien, Mal);
					    		    	
	    		    // }, Mal);
		    		// incidencias.fin();
		    		// incidencias = new lista("#listaincidencias", "#p_incidencias", 0);	
	        				// RellenaIncidenciasGes(IndiceEdicion);
	        				CambiaEstadoIncidencias('incidencias_ges',-1);		    		    	
	        				}, Mal);
	        			
	        				db.transaction(function(tx) {
	        					tx.executeSql("UPDATE inciden SET cambio=cambio|2,ultima_gestion=? WHERE codigo=?", [fecha,IndiceEdicion], function(tx, rs) {			    	  		      		    	
	        					}, Mal);
	        				}, Mal);  	
       			
	        			}
	        		}, Mal);                
	          	}, Mal);	
	        }, Mal);                
	 	   
	    }, Mal);	
	    
	} else {
		
		db.transaction(function(tx) {
		    	tx.executeSql("UPDATE gestiones SET cambio=cambio|2,fecha=?,limite=?,contacto=?,tfno_contacto=?,detalle=?,observaciones=? WHERE id=?", [fecha,limite,contacto,tfno_contacto,detalle,observaciones,IndiceEdicionGes], function(tx, rs) {			    	  		      		    	
		       }, Mal);
		     	CambiaEstadoIncidencias('incidencias_ges',-1);  		    	
		  }, Mal);  
	
		
		}
		
	}


	


function BorraGestion(numero){
	if (numero>=0){
			if (confirm("¿Seguro que quiere borrar esta gestión?")){
				db.transaction(function(tx) {
			    	tx.executeSql("UPDATE gestiones SET cambio=cambio|4 WHERE id=?", [numero], function(tx, rs) {
			    		RellenaIncidenciasGes(IndiceEdicion);		    	
			        }, Mal);
				 }, Mal);
				hay_cambio_gestion=true;
				}
			}
}


// CLASES DE LISTAS
// multiple=0 simple
// multiple=1 multiple
// multiple=2 ninguno (trackbak)
function lista(el_selector, el_pie, es_multiple, el_estilo){
    $('[data-role=footer]').fixedtoolbar({ tapToggle:false });
	var seleccionado='';
	var primero='-1';
	var ultimo='';
	var espri=true;
	
	var selector;
	var multiple;
	var estilo;
	
	var funcion=undefined;


	selector=el_selector;
	multiple=es_multiple;
	if (el_estilo==undefined)
		estilo="min-height:20px;";
	else
		estilo=el_estilo;
	
	pie=el_pie;
	
	this.formato;
	this.tipo;
	
	this.marca = function(){
		$(selector).attr("value", true);
		};
		
	this.fin = function(){
		// MAC
		$(selector).off("click", "li", Pulsado);
		// ANDROID
		// $(selector+' li').die("click");
	};
	
	this.cabecera= function(id, texto){
		primero=id;
		$(selector).append('<li data-role="list-divider" style="'+estilo+'" id="'+id+'">'+texto+'</li>');  
		};
		
	this.elimina=function(id){
		$(selector+' li[id='+id+']').remove(); 
		};		
		
	this.actualiza= function(id, texto){
		$(selector+' li[id='+id+']').html(texto); 
		};		

	this.texto= function(id, marcado, texto){	
		if (primero=='-1') primero=id;
		ultimo=id;
		
		switch(multiple){
			case 1:
				if (marcado)
					$(selector).append('<li class="ui-btn-up-e style="'+estilo+'" id="'+id+'" value="1">'+texto+'</li>'); 
				else
					$(selector).append('<li class="ui-btn-up-c" style="'+estilo+'" id="'+id+'" value="0">'+texto+'</li>');
			break;
			case 0:
				if (marcado && espri)
					{
					espri=false;
					seleccionado=id;
					$(selector).append('<li class="ui-btn-up-e" style="'+estilo+'" id="'+id+'">'+texto+'</li>'); 
					}
				else
					$(selector).append('<li class="ui-btn-up-c" style="'+estilo+'" id="'+id+'">'+texto+'</li>');
			break;
			case 2:
				$(selector).append('<li class="ui-btn-up-c" style="'+estilo+'" id="'+id+'">'+texto+'</li>');
				
			}
		
		};
		
	this.repinta=function (){
      $(selector).listview('refresh');
      if (multiple==0 || multiple==1){
    	  $(selector+' li[id="'+primero+'"]').addClass('ui-corner-top').trigger('create');
    	  $(selector+' li[id="'+ultimo+'"]').addClass('ui-corner-bottom').trigger('create');
      	  }
 	};
 	
 	this.id=function(){
 		return seleccionado;
 	};
 	
 	this.count=function(){
 		return $(selector+' li').length;
 	};
 	
 	
 	this.borra=function(){
 		$(selector).empty();
 		seleccionado='';
 		primero='-1';
 		ultimo='';
 		espri=true;
		
 	};
 	
 	
 	this.accion=function(la_funcion){
 		funcion=la_funcion;
 		};
 	// MAC
 	$(selector).on("click", "li", Pulsado);
 	// ANDROID
	// $(selector+' li').live("click", Pulsado);


 	
	$(selector).empty();
	
	function Pulsado(event){
		//alert("HOLA");
		 // event.preventDefault();
		//if (this.id>0){
			switch(multiple){
				case 0:
					_desselect(seleccionado);
					seleccionado=this.id;
					_select(seleccionado);
				break;
				case 1:
					if ($(selector+' li[id="'+this.id+'"]').attr('value')=="1") {
						$(selector+' li[id="'+this.id+'"]').attr('value', "0");
						_desselect(this.id);
					} else {
						$(selector+' li[id="'+this.id+'"]').attr('value', "1");
						_select(this.id);
						}
				break;
				}
			//}
		if (funcion!=undefined)
			funcion($(selector+' li[id="'+this.id+'"]'));
		};
	
	function _select(id){
	    $(selector+' li[id="'+id+'"]').removeClass('ui-btn-up-c').addClass('ui-btn-up-e').trigger('create');
		};
	function _desselect(id){
	    $(selector+' li[id="'+id+'"]').removeClass('ui-btn-up-e').addClass('ui-btn-up-c').trigger('create');
		};
}



// FUNCIONES DE PRESENTACION
function Empieza(message) {
    $(
    		
    		"<div id='tmp' class='ui-loader ui-overlay-shadow ui-body-b ui-corner-all'>" + message + "</div>")
        .css({
            display: "block",
            opacity: 0.96,
            top: window.pageYOffset+250,
        }).appendTo("body");
}

function Fin(){
	$("#tmp").remove(); 
}



function ErrorComunicaciones(error){
	 SimpleMensaje('No se puede conectar con el servidor de IESA para enviar o recibir datos, revise la configuraci&oacute;n para el env&iacute;o de datos. ERROR: "'+error+'"', 9000);

}

function SimpleMensaje(message, tiempo) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-b ui-corner-all'>" + message + "</div>")
        .css({
            display: "block",
            opacity: 0.96,
            top: window.pageYOffset+230,
        })
        .appendTo("body").delay(tiempo)
        .fadeOut(400, function(){
            $(this).remove();
        });
}


function trim(myString)
{
	if (myString==null)
		return "";
	else
		return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
}


function EnFecha(texto){
	if (texto==null)
		return ('');
	else {
		tmp=texto.replace('/Date(','');
		tmp=tmp.replace(')/','');
		fecha=new Date();
		fecha.setTime(tmp);
		return fecha.getISO();

		}
}

function ConvierteEnFecha(texto){
	if (texto==null)
		return ('');
	else {
		tmp=texto.replace('/Date(','');
		tmp=tmp.replace(')/','');
		fecha=new Date();
		fecha.setTime(tmp);
		return FormatoFecha(fecha);
		}
}

function FormatoFecha(fecha){
	return fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+(fecha.getYear()+1900);

}


function FormatoFechaCadena(fecha){
	if (fecha=="")
		return "";
	else {
		fecha= new Date(fecha);
		return fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+(fecha.getYear()+1900);
		}
}

function FormatoIso(texto){
    var tmp;
    tmp=texto.split("/");
	fecha=new Date(tmp[2], tmp[1]-1, tmp[0]);
	return fecha.getISO();
}

function ConvierteDeFecha(texto){
    var tmp;
    tmp=texto.split("/");
	fecha=new Date(tmp[2], tmp[1]-1, tmp[0]);
	return '/Date('+fecha.getTime()+')/';
}

function SumaFecha(fecha,dias){
	var tmp=fecha.getTime()+24*3600000*dias;
	fec=new Date();
	fec.setTime(tmp);
	return fec;
}

function RestaDiasFecha(fecha,dias){
	var tmp=fecha.getTime()-24*3600000*dias;
	fec=new Date();
	fec.setTime(tmp);
	return fec;
}

function ValorFecha(texto){
	tmp=texto.replace('/Date(','');
	tmp=tmp.replace(')/','');
	fecha=new Date();
	fecha.setTime(tmp);
	return fecha;
}

function CampoFecha(texto){
    var tmp;
    tmp=texto.split("/");
    fecha=new Date(tmp[2], tmp[1], tmp[0]);
    return fecha;
}

function VN(valor){
	return (valor==null?'':valor);
}

function llamar_numero(Tfno){
try {  	
	var numero=filtra_numero(Tfno);
	 
	if (numero=='')
    	SimpleMensaje("Tel&eacute;fono desconocido", 2000);
    else
        Telefono(numero);
	} catch(e) {
				
	}
}


function mensaje_numero(Tfno,mensaje){
	var numero=filtra_numero(Tfno);
	 
	if (numero=='')
		SimpleMensaje("Tel&eacute;fono desconocido", 2000);
	else
		window.location.href="sms:"+numero+"?body="+mensaje;
	
}


function llamar(tabla, orden, numero){
	switch (tabla) {
		case "proveedor":
            if (provee!=null && numero>0){
        		for (var i=0;i<provee.length;i++) {
        			if (provee[i].codigo==numero){
        			    llamar_numero(provee[i].tfno);        			
        				break;
        				}
        			}		
                }
			break;
			
		case "listin":
		    if (num_edificio<=0) {
		        if (listin_telefonos!=null && numero>0){
                    llamar_numero(listin_telefonos[numero-1].tfno);
		            }
		        } else  {
		        BuscaUnTelefono(orden,numero);	       		        
		    }
		    break;
		    
		}
	var numero=filtra_numero(Tfno);
	

	 if (numero=='')
    	SimpleMensaje("Tel&eacute;fono de propietario desconocido", 2000);
    else
    	Telefono(numero);
}


function filtra_numero(Tfno){
	var numero="";
	 for (var i=0;i<Tfno.length;i++){
		 if (Tfno.charAt(i)>='0' && Tfno.charAt(i)<='9'){
			 numero=numero+Tfno.charAt(i); 
		 }
	 }	
	 return (numero);
}

var beep = function() {
    if (equipo!="otros") navigator.notification.beep(2);
};


function Telefono(numero){
    if (equipo=="ipad" || equipo=="iphone")
        PhoneDialer(numero);
    else
        window.location.href="tel:"+numero;
}

function PhoneDialer(phnum) {
    cordova.exec("PhoneDialer.dialPhone", {"number" : phnum });
};

// BASE DE DATOS
function abreBasedatos() {
    try {  
        if (!window.openDatabase) {  
            alert('El navegador no soporta bases de datos.');  
        } else {  
            var shortName = 'gesinedi2';  
            var version = '1.0';  
            var displayName = 'Base de datos Gesinedi';  
            var maxSize = 5*1024*1024; //  bytes  
            db = openDatabase(shortName, version, displayName, maxSize);
            
            db.transaction(function(sx) {
		       // sx.executeSql("DROP TABLE inciden");
		       }, Mal);
		      
            }
            
        
    } catch(e) {  
  
        if (e == 2) {  
            // Version number mismatch.  
            alert("Versi&oacute;n inv&aacute;lida de la base de datos.");  
        } else {  
            alert("Error desconocido "+e+".");  
        }  
        return;  
    }  
}


function creaTablas(){
db.transaction(function(tx) {
	// tx.executeSql("CREATE TABLE IF NOT EXISTS pisos(id decimal(18,2), comu decimal(18,0), piso varchar(45), nom varchar(45), t1 varchar(15), t2 varchar(15), t3 varchar(15), email varchar(30));", [], insertaDatos, Mal);
	tx.executeSql("CREATE TABLE IF NOT EXISTS pisos(id decimal(18,2), comu decimal(18,0), piso varcha(45), nom varchar(45), t1 varchar(15), t2 varchar(15), t3 varchar(15), email varchar(30));", [], Bien, Mal);
	tx.executeSql("CREATE TABLE IF NOT EXISTS inciden(ultima_gestion datetime, codigo decimal(18,0), fecha datetime, hora varchar(8), numcomu decimal(18,0), numprop decimal(18,0), tipo_comunicante decimal(18,0), comunicante varchar(40), cargo varchar(25), contacto varchar(40), telefono1 varchar(10), telefono2 varchar(10), fax varchar(10), email varchar(80), texto1 varchar(80), texto2 varchar(250), prioridad decimal(18,0), recibida bit, asignada bit, concluida bit, id_gesinedi decimal(18,0), leida bit, fecha_asig datetime, fecha_conclu datetime, tiporeg varchar(1), cambio decimal(18,0), piso varchar(15), calle_piso varchar(40), comunicante_telefono varchar(30), baja bit, proveedor decimal(18,2));", [], Bien, Mal);
	tx.executeSql("CREATE TABLE IF NOT EXISTS gestiones(id decimal(18,0), cod_incidencia decimal(18,0), cod_gestion decimal(18,0), fecha datetime, limite datetime, contacto varchar(40), tfno_contacto  varchar(15), detalle varchar(250), observaciones varchar(250),acabada bit,gesdesp bit,num_incidencia decimal(18,0),cambio decimal(18,0));", [], Bien, Mal);
	
	tx.executeSql("CREATE INDEX IF NOT EXISTS pisos_comu ON pisos(comu);");
	tx.executeSql("CREATE INDEX IF NOT EXISTS pisos_id ON pisos(id);");	
	tx.executeSql("CREATE INDEX IF NOT EXISTS inciden_codigo ON inciden(codigo);");
	tx.executeSql("CREATE INDEX IF NOT EXISTS inciden_id_gesinedi ON inciden(id_gesinedi);");
	tx.executeSql("CREATE INDEX IF NOT EXISTS inciden_fecha ON inciden(fecha);");
	tx.executeSql("CREATE INDEX IF NOT EXISTS gestiones_id ON gestiones(id);");
	tx.executeSql("CREATE INDEX IF NOT EXISTS gestiones_cod_incidencia ON gestiones(cod_incidencia);");
	}, Mal);
}


function insertaDatos(){
   	db.transaction(function(tx) {
   		tx.executeSql("DELETE FROM pisos");   		
   		for (var i=0;i<pisos.length;i++) {
   			tx.executeSql("INSERT INTO pisos(id, comu, piso, nom, t1, t2, t3, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [pisos[i].id, pisos[i].comu, pisos[i].piso, pisos[i].nom, pisos[i].t1, pisos[i].t2, pisos[i].t3, pisos[i].email]);
   			}
   		pisos="";
   		}, Mal1);  		
}


function actualizaDatos(){
   	db.transaction(function(tx) {
   		for (var i=0;i<pisos.length;i++) {
		   	tx.executeSql("DELETE FROM pisos WHERE id="+pisos[i].id);   		
   		   	if (pisos[i].cambio&1 || pisos[i].cambio&2){
   		   		tx.executeSql("INSERT INTO pisos(id, comu, piso, nom, t1, t2, t3, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [pisos[i].id, pisos[i].comu, pisos[i].piso, pisos[i].nom, pisos[i].t1, pisos[i].t2, pisos[i].t3, pisos[i].email]);
   		   		}
   			}
   		pisos="";
   		}, Mal2);  		  							
}

function insertaIncidencias(){
   	db.transaction(function(tx) {
   		tx.executeSql("DELETE FROM inciden");
   		actualizaIncidencias(true);
   		}, Mala);  		
}

function actualizaIncidencias(inserta){
   	db.transaction(function(tx) {
   		for (var i=0;i<inciden.length;i++) {
		   	if (!inserta) tx.executeSql("DELETE FROM inciden WHERE codigo="+inciden[i].codigo);   		
   		   	if (inserta || inciden[i].cambio&1 || inciden[i].cambio&2){
   	   			tx.executeSql("INSERT INTO inciden(ultima_gestion,codigo,fecha,hora,numcomu,numprop,tipo_comunicante,comunicante,cargo,contacto,telefono1,telefono2,fax,email,texto1,texto2,prioridad,recibida,asignada,concluida,id_gesinedi,leida,fecha_asig,fecha_conclu,tiporeg,cambio,piso,calle_piso,comunicante_telefono,baja,proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [EnFecha(inciden[i].ultima_gestion),inciden[i].codigo,EnFecha(inciden[i].fecha),inciden[i].hora,inciden[i].numcomu,inciden[i].numprop,inciden[i].tipo_comunicante,inciden[i].comunicante,inciden[i].cargo,inciden[i].contacto,inciden[i].telefono1,inciden[i].telefono2,inciden[i].fax,inciden[i].email,inciden[i].texto1,inciden[i].texto2,inciden[i].prioridad,inciden[i].recibida,inciden[i].asignada,inciden[i].concluida,inciden[i].id_gesinedi,inciden[i].leida,inciden[i].fecha_asig,EnFecha(inciden[i].fecha_conclu),inciden[i].tiporeg,0,inciden[i].piso,inciden[i].calle_piso,inciden[i].comunicante_telefono,inciden[i].baja,inciden[i].proveedor], Bien, Mal);
   		   		}
   			}
   		inciden="";
   		}, Mal4);  		  							
}

function insertaGestiones(){
   	db.transaction(function(tx) {
   		tx.executeSql("DELETE FROM gestiones");
   		actualizaGestiones(true);
   		}, Mal5);  		
}

function actualizaGestiones(inserta){
   	db.transaction(function(tx) {
   		for (var i=0;i<gestiones.length;i++) {
   			if (!inserta) tx.executeSql("DELETE FROM gestiones WHERE id="+gestiones[i].id);   		
   		   	if (inserta || gestiones[i].cambio&1 || gestiones[i].cambio&2){
   		   		tx.executeSql("INSERT INTO gestiones(id,cod_incidencia,cod_gestion,fecha,limite,contacto,tfno_contacto,detalle,observaciones,acabada,gesdesp,num_incidencia,cambio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [gestiones[i].id,gestiones[i].cod_incidencia,gestiones[i].cod_gestion,EnFecha(gestiones[i].fecha),EnFecha(gestiones[i].limite),gestiones[i].contacto,gestiones[i].tfno_contacto,gestiones[i].detalle,gestiones[i].observaciones,gestiones[i].acabada,gestiones[i].gesdesp,gestiones[i].num_incidencia,gestiones[i].cambio]);
   		   		// tx.executeSql("INSERT INTO gestiones(id,cod_incidencia,cod_gestion,fecha) VALUES (?, ?, ?, ?)", [gestiones[i].id,gestiones[i].cod_incidencia,gestiones[i].cod_gestion,ConvierteEnFecha(gestiones[i].fecha)]);
   		   		}
   			}
   		gestiones="";
   		}, Mal6);  		  							
}


function Bien(e){
    // alert("!Correcto!");
}

function Mal(e, error){
    alert("ERROR de base de datos:"+e.message);
}
function Mal1(e, error){
    alert("ERROR 1 de base de datos:"+e.message);
}

function Mal2(e, error){
    alert("ERROR 3 de base de datos:"+e.message);
}

function Mal3(e, error){
    alert("ERROR 3 de base de datos:"+e.message);
}

function Mal4(e, error){
    alert("ERROR 4 de base de datos:"+e.message);
}

function Mal5(e, error){
    alert("ERROR 5 de base de datos:"+e.message);
}

function Mal6(e, error){
    alert("ERROR 6 de base de datos:"+e.message);
}
function Mal0(e, error){
    alert("ERROR 0 de base de datos:"+e.message);
}

function Mala(e, error){
    alert("ERROR InsertaIncidencias:"+e.message);
}
function RellenaListinSub(listin,num_edificio){
	db.transaction(function(tx) {
        tx.executeSql("SELECT id, piso, nom, t1 FROM pisos WHERE comu="+num_edificio+" ORDER BY piso", [], function(tx, rs) {
        	// alert('HOLA');
	        for (var i=0; i<rs.rows.length; i++) {
	            var row = rs.rows.item(i);
				listin.texto(row['id'], (i==0?true:false), '<small style="position:absolute; left:2px">'+row['piso']+' ('+row['nom'].substring(0,20)+')'+'</small><small style="position:absolute; left:75%">'+row['t1']+'</small>');
	            }   
	        listin.repinta();
			}, Mal);
		});
}
	
function BuscaUnListin(listin,id){
	db.transaction(function(tx) {
        tx.executeSql("SELECT id, piso, nom, t1, t2, t3, email FROM pisos WHERE id="+id, [], function(tx, rs) {
        	if (rs.rows.length>0){
        		var row = rs.rows.item(0);
        		for (var i=0;i<comunidad.length;i++) {
        			if (comunidad[i].numcomu==num_edificio){
        				$("#lis_dir").html('<strong>'+comunidad[i].dircomu+' '+row['piso']+'</strong>');         				
        				$("#com_pos").html('<strong>'+VN(comunidad[i].cod_postal)+'</strong>');
        				$("#com_pob").html('<strong>'+VN(comunidad[i].poblacomu)+'</strong>');
        				$("#com_pro").html('<strong>'+VN(comunidad[i].provincia)+'</strong>');      				        				
        				break;
        				}
        			}   
        		
        		$("#lis_nom").html('<strong>'+row['nom']+'</strong>');
        		$("#lis_te1").html('<strong>'+row['t1']+'</strong>');
        		$("#lis_te2").html('<strong>'+row['t2']+'</strong>');
        		$("#lis_fax").html('<strong>'+row['t3']+'</strong>');
        		$("#lis_ema").html('<strong>'+row['email']+'</strong>');        		     	
        		}
			}, Mal);
		}, Mal);
}


function BuscaUnTelefono(orden,numero){
    db.transaction(function(tx) {
        tx.executeSql("SELECT id, t1, t2, t3 FROM pisos WHERE id="+numero, [], function(tx, rs) {
            if (rs.rows.length>0){
                var row = rs.rows.item(0);
                switch(orden){                   
                    case 1:
                        llamar_numero(row['t1']);
                    break;
                    case 2:
                        llamar_numero(row['t2']);
                    break;
                    case 3:
                        llamar_numero(row['t3']);
                    break;
                    }
                }
            }, Mal);
        }, Mal);
}




