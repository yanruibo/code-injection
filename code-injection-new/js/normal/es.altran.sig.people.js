


 





			$(document).ready(function() {
				traducir("usuario|clave|idioma|login");
				$("#ididioma").val(localStorage.getItem('ididioma'));
			});
			if (localStorage.getItem('usuario') != '' && localStorage.getItem('clave') != '' ) {
				//$("#formularioLogin").hide();
				//$("#login").hide();
				$("#clk").val(localStorage.getItem('usuario'));
				$("#ps").val(localStorage.getItem('clave'));
				$("#ididioma").val(localStorage.getItem('ididioma'));
				login();
			}			
		




function login() {

			// Cargando
			$("#formularioLogin").hide();
			$("#login").hide();

			
			localStorage.setItem('usuario',$("#clk").val());
			localStorage.setItem('clave',$("#ps").val());
			
			localStorage.setItem('ididioma',$("#ididioma").val());	


			var idioma = localStorage["ididioma"];
			var usuario = localStorage["usuario"];
			var clave = localStorage["clave"];
			
			url = 'https://sig.altran.es/aesp/altranApi/AltranAuth.asp?usuario='+usuario+'&password='+clave+"&criterios=MYID";
			callback ='doLogin';
			jsonp(url,callback);
}

function doLogin(data){
			var usuario = localStorage["usuario"];
			var clave = localStorage["clave"];
			var idioma = localStorage["ididioma"];

	if(data.error == "2" || data.error == "1" || data.error == "3"){
			if(usuario != "" || clave != "" ){
			$("#alerta").html('<h4><font color="red">Usuario / Password incorrectos</font></h4>'); 
			}
			localStorage.setItem('usuario','');
			localStorage.setItem('clave','');
			$("#formularioLogin").show();
			$("#login").show();
		}else{
		document.location.href="AltranPeople/altranPeople.html";
	}	
}

function doLogoff(){
			url = 'https://sig.altran.es/aesp/altranApi/AltranAuth.asp?logoff';
			callback ='logoff';
			jsonp(url,callback);
		localStorage.setItem('usuario','');
		localStorage.setItem('clave','');		
		document.location.href="../index.html";
}


function jsonp(url,callback)
{
	ultimaUrl = url;
    // creamos un elemento <script>
    scriptElement = document.createElement("SCRIPT");
    // del tipo javascript
    scriptElement.type = "text/javascript";
    // le agregamos la url que ya creamos en el atributo src
    // y le agregamos la funcion de callback que ya definimos
    scriptElement.src = url + "&jsoncallback="+callback;
    // abrimos la cabecera de la pagina para agregar nuestro script ahi
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    // y listo , eso genera que el mismo script haga la llamada a flickr y
    //conteste con la funcion que le pasamos de callback y el json con la info
    // de las fotos como parametro
}



//Funcion para traducir textos

var TextosGlobal;

function traducir(textos){
		 var ididioma = localStorage["ididioma"];
		// NO FUNCIONA (se usa para asignar por defecto el idioma)
		// var opcion;
		// if (ididioma == 1) {
			// opcion = '<option selected id="espanol" value="1" >Español</option>';
			// opcion += '<option id="ingles" value="2" >English</option>';
			// $("#ididioma").html(opcion)
		// }
		// if (ididioma == 2) {
			// opcion = '<option selected id="ingles" value="2" >English</option>';
			// opcion += '<option id="espanol" value="1" >Español</option>';
			// $("#ididioma").html(opcion)
		// }
		if (ididioma == undefined) ididioma = 1;
		if (ididioma != 1){
			var url; 
			var texto = textos; 
			TextosGlobal = textos.split("|");
			url = 'https://sig.altran.es/aesp/altranAPI/AltranTranslate.asp?ididioma='+ididioma+"&textos="+texto;
			callback ='resultadoTraducir';
			jsonp(url,callback);
		}
	}
	
function resultadoTraducir(data){
		 $.each(data.items, function(key,name) {	
			for(var i=0;i<TextosGlobal.length;i++){
				var id = TextosGlobal[i].toLowerCase();
				id = replaceAll(id," ","");
				//cuenta = contar(id,name)
				var texto = name[id];
				console.log(id + ' ' + name[id]);
				TraducirElemento(id,name[id]);
			}
		 });
	}
	
function TraducirElemento(idelemento,texto){

		if (texto != "" && texto != undefined){
			$("#"+idelemento+'-tr').html(texto);
			$("."+idelemento+'-tr').html(texto);
		}else{
			//$("#"+idelemento+'-tr').html("Traducir");
		}

}
	
	
function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}



	function atras(){
		 history.go(-1);

	};

	




//Variables Glovales
var idcursoglobal=-1;
var ultimaUrl="";

var VolverTipo = 0;
var VolverPagina = 0;

var modoPersona = 0;

//FUNCIONES CURSOS 2
var idpersona;
function Ocultar(id){
	$("#"+id).hide();
}

function Mostrar(id){
	$("#"+id).show();
}

function buscador(){
	Ocultar("listadoPersonas");
	Ocultar("listadoPersona");
	Mostrar("buscador");
	PAGINABUSCAR = 0;		
} 





var PAGINABUSCAR = 0;

function buscar(resetPagina,PaginaAux){
	if (resetPagina){
		PAGINABUSCAR = 0;
	}
	if(PaginaAux >= 0){
		 PAGINABUSCAR = PaginaAux;
	 }
	AgendaON = false;
	$("#personas").html(''); 
	//$("#cargando").remove(); 
	//$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url;
	var criterios="";
	criterios = $("input#criterios").val();
	var callback;
	//Recoger datos del campo criterios
	
	
    url = 'https://sig.altran.es/aesp/json/apipersonas.asp?usuario='+usuario+'&password='+clave+"&criterios="+criterios+"&pagina="+PAGINABUSCAR;
	callback ='resultadoBusqueda';
	$.mobile.loading('show');
    jsonp(url,callback);
}

var AgendaON = false;

function agenda(resetPagina,PaginaAux){
	AgendaON=true;
	
	var d = new Date();
	var ts = d.getTime();	
	
	if (resetPagina){
		PAGINABUSCAR = 0;
	}
	if(PaginaAux >= 0){
		 PAGINABUSCAR = PaginaAux;
	 }	
	Ocultar("listadoPersonas");
	Ocultar("listadoPersona");
	Ocultar("buscador");
	// $("#personas").attr({ 
         // data-filter: "true"

       // });
	//$("#cargando").remove(); 
	//$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url;
	var callback;
	//Recoger datos del campo criterios
    url = 'https://sig.altran.es/aesp/json/apipersonas.asp?usuario='+usuario+'&password='+clave+"&favoritos=1&pagina="+PAGINABUSCAR;
	url += '&ts=' + ts;
	callback ='resultadoBusqueda';
	$.mobile.loading('show');
    jsonp(url,callback);
}

	
	

	
function consultarPersona(idpersona,modoPersona){
	this.modoPersona=modoPersona
	$("#persona").html(''); 
	Ocultar("listadoPersonas");
	Ocultar("buscador");
	Mostrar("listadoPersona");
	//$("#cargando").remove(); 
	//$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url;
	var callback;
		if(modoPersona == 0)url = 'https://sig.altran.es/aesp/json/apipersonas.asp?usuario='+usuario+'&password='+clave+"&idpersonaver="+idpersona;
		if(modoPersona == 1)url = 'https://sig.altran.es/aesp/json/apipersonas.asp?usuario='+usuario+'&password='+clave+"&favoritoset="+idpersona;
		if(modoPersona == 2)url = 'https://sig.altran.es/aesp/json/apipersonas.asp?usuario='+usuario+'&password='+clave+"&criterios=MYID";
		
	var d = new Date();
	var ts = d.getTime();
	url += '&ts=' + ts;
		
	callback ='detallePersona';	 
	$.mobile.loading('show');	
    jsonp(url,callback);
}


function jsonp(url,callback)
{
	ultimaUrl = url;
    // creamos un elemento <script>
    scriptElement = document.createElement("SCRIPT");
    // del tipo javascript
    scriptElement.type = "text/javascript";
    // le agregamos la url que ya creamos en el atributo src
    // y le agregamos la funcion de callback que ya definimos
    scriptElement.src = url + "&jsoncallback="+callback;
    // abrimos la cabecera de la pagina para agregar nuestro script ahi
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    // y listo , eso genera que el mismo script haga la llamada a flickr y
    //conteste con la funcion que le pasamos de callback y el json con la info
    // de las fotos como parametro
}

function resultadoBusqueda(data) {
		Mostrar("listadoPersonas");
		Ocultar("listadoPersona");
		var result = "";
		var letraAnterior = "";
		var idcursoanterior = "";
		var contador = 0;
		var contadorIndividual = 0;
		var hashtable = {};
		var cadenafoto;
		var pLetra;
		var apellidos;
		$("#persona").html(""); 
		
		//$("#cargando").remove(); 
		if(data.error == "1" || data.items ==""){
			$("#personas").html('<h4>No se encontraron resultados con ese criterio</h4>'); 
		}else{
			var nElementos = data.items.length;
			var elementoActual = 0;
		}
			
		 $.each(data.items, function(key, persona) {	
		  		//Dar formato al json
				elementoActual++;
				
				apellidos = persona.apellidos;
				pLetra = apellidos.substr(0,1);
				contador++;
				 if (pLetra != letraAnterior && contador > 1) {
					result +="<li data-role=\"list-divider\" > "+pLetra+"<span id=\"contador"+pLetra+"\" class=\"ui-li-count\">_</span></li>";
					hashtable['contador'+idcursoanterior] = contadorIndividual;
					contadorIndividual = 0;
				}else if (contador == 1) {
					result +="<li data-role=\"list-divider\" > "+pLetra+ "<span id=\"contador"+pLetra+"\" class=\"ui-li-count\">_</span></li>";					
				}
				contadorIndividual++; 

				result += "<li><a href=\"#\"  onClick=\"javascript: consultarPersona("+persona.idpersona+",0)\">";
				cadenafoto =  persona.foto;
				if(cadenafoto == ""){
					cadenafoto = 'imagenes/foto.jpg';
				}else{
					cadenafoto =cadenafoto.replace('..','https://sig.altran.es/aesp');
				}
				result += "<img src=\""+cadenafoto+"\" />";
				result += "<h3>"+persona.apellidos+" , "+persona.nombre+"</h3>";
				result += "<p> "+persona.desccatprof+"</p>";
				result += "<p class=\"ui-li-aside\"></p></a></li>";
				
				if (persona.total > 0 || (PAGINABUSCAR > 0 && elementoActual == nElementos) ){	
					result += "<li class=\"ui-body ui-body-b\">";
					var JavascriptAdelante = "";
					var JavascriptAtras = "";
					var clase1 = "";
					var clase2 = "";
					if (AgendaON){
						JavascriptAdelante = "agenda(false,"+(PAGINABUSCAR+1)+")";
						JavascriptAtras = "agenda(false,"+(PAGINABUSCAR-1)+")";
					}else{
						JavascriptAdelante = "buscar(false,"+(PAGINABUSCAR+1)+")";
						JavascriptAtras = "buscar(false,"+(PAGINABUSCAR-1)+")";
					}
					
					//console.log("JavascriptAtras:" + JavascriptAtras);
					//console.log("JavascriptAdelante:" + JavascriptAdelante);
					
					if (PAGINABUSCAR > 0 && persona.total > 0){
						result += '<fieldset class="ui-grid-a">';
						clase1 = "ui-block-a";
						clase2 = "ui-block-b";
					}else{
						result += '<fieldset>';
						clase1 = "";
						clase2 = "";						
					}
					if (PAGINABUSCAR > 0){
						result += '<div class="'+clase1+'"><button class="paginado" data-icon="arrow-l" data-iconpos="left" onClick=\"javascript:'+JavascriptAtras+'\">Ant.</buton></div>';
					}
					if (persona.total > 0){
						result += '<div class="'+clase2+'"><button class="paginado" data-icon="arrow-r" data-iconpos="right" onClick=\"javascript:'+JavascriptAdelante+'\">Sig.</buton></div>';
					}
					result += '</fieldset>';

					result += "</li>";
					
					var totalPaginas;
					if (persona.totalpaginas == undefined){
							totalPaginas = (PAGINABUSCAR+1);
					}else{
							totalPaginas = persona.totalpaginas;
					}					
					result += "<li data-role=\"list-divider\" >&nbsp;<span class=\"ui-li-count\">Pagina: "+(PAGINABUSCAR+1)+"/"+totalPaginas+"</span></li>";
				}
				
				$("#personas").html(result); 
				
				idcursoanterior = pLetra;
				letraAnterior = pLetra;
		  });
		  
		   $("#contador"+idcursoanterior).html(contadorIndividual);
		  for (contador in hashtable){
			$("#"+contador).html(hashtable[contador]);
		  }	 	  
		  $.mobile.loading('hide');
		 
    	  $("#personas").listview('refresh');
		 $('.paginado').button();   
		  
	} 
	
	
	function detallePersona(data) {
		var cadenafoto;
		var fotoresponsable;
		var imagenfav;
		Ocultar("listadoPersonas");
		Mostrar("listadoPersona");

		 $.each(data.items, function(key, persona) {	
		  		//Dar formato al json
				result ="<li data-role=\"list-divider\" > "+persona.nombre+" "+persona.apellidos;
				//Favoritos
				if (modoPersona != 2){
					if (persona.favorito == 0) imagenfav = 'estrella-n';
					if (persona.favorito == 1) imagenfav = 'estrella';
				result += "<span class=\"ui-li-count\"><a href=\"#\" onClick=\"javascript: consultarPersona("+persona.idpersona+",1)\"><img src=\"imagenes/"+imagenfav+".png\" width=\"14\" height\"14\"></img></a></span></li>";
				}
				else{
					result += "</li>"
				}
				// Prepara la cadena de la Foto
				cadenafoto =  persona.foto;
				fotoresponsable =  persona.fotoresponsable;
				if(cadenafoto == ""){
					cadenafoto = 'imagenes/foto.jpg';
				}else{
					cadenafoto =cadenafoto.replace('..','https://sig.altran.es/aesp');
				}
				if(fotoresponsable == ""){
					fotoresponsable = 'imagenes/foto.jpg';
				}else{
					fotoresponsable =fotoresponsable.replace('..','https://sig.altran.es/aesp');
				}

				
				result += "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c\">"
					result += "<div class=\"ui-btn-inner ui-li\">"
						result += "<div class=\"ui-btn-text\">"
						result += "<li data-icon=\"false\"><a href=\"#\" class=\"ui-link-inherit\">"
							//result += "<li><a href=\"https://sig.altran.es/aesp/personal/vcard.asp?idpersona="+persona.idpersona+"\" class=\"ui-link-inherit\">"
								result += "<img src=\""+cadenafoto+"\" class=\"ui-li-thumb\"/>"
								result += "<h3 class=\"ui-li-heading\">"+persona.desccatprof+"</h3>"
								$.each(persona.funciones, function(key, funciones) {//Usar para futura Vcard
									if(funciones.departamento != "") result += "<p class=\"ui-li-desc\">"+funciones.departamento+"</p>";//	Usar para futura Vcard				
								});	//Usar para futura Vcard
							result += "</a></li>" 
						result += "</div>"
					result += "</div>"
				result += "</li>"
					
				if (persona.idresponsable > 0){
					result += "<li data-theme=\"b\"><span id='responsable-tr'>Responsable</span></li>";
					result += "<li data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\" data-theme=\"c\" class=\"ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c\">"
						result += "<div class=\"ui-btn-inner ui-li\">"
							result += "<div class=\"ui-btn-text\">"
								result += "<a href=\"#\" onClick=\"javascript:consultarPersona("+persona.idresponsable+",0);\"\" class=\"ui-link-inherit\">"
									result += "<img src=\""+fotoresponsable+"\" class=\"ui-li-thumb\"/>"
									result += "<h3 class=\"ui-li-heading\">"+persona.responsable+"</h3>"
									result += "<p class=\"ui-li-desc\">"+persona.categoriaresponsable+"</p>"
								result += "</a>"
							result += "</div>"
							result += "<span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"/>"
						result += "</div>"
					result += "</li>"
				}
				result += "<li data-theme=\"b\"><span id='correo-tr'>Correo</span></li>";
				result += "<li><a class=\"ui-link-inherit\" href=\"mailto:"+persona.e_mail+"\">"+persona.e_mail+"</a></li>";
				if (persona.telefono != ''){
					result += "<li data-theme=\"b\"><span id='telefono-tr'>Telefono</span></li>";
					result += "<li><a class=\"ui-link-inherit\" href=\"tel:"+persona.telefono+"\">"+persona.telefono+"</a></li>";
				}
				if (persona.movil != ''){
				result += "<li data-theme=\"b\"><span id='movil-tr'>Movil</span></li>";
				result += "<li><a class=\"ui-link-inherit\" href=\"tel:"+persona.movil+"\">"+persona.movil+"</a></li>";
				}
				if (modoPersona != 2){
				result += "<li data-theme=\"a\"><a class=\"ui-link-inherit\" href=\"#\" onclick='volverPeople();' data-icon=\"back\"><span id='volver-tr'>Volver</span></a></li>";
				}
				$("#persona").html(result); 
		  });
		  $.mobile.loading('hide');
    	  $("#persona").listview('refresh');
		  traducir("usuario|clave|Correo|Responsable|Mis Datos|Buscador|Desconectar|Buscar|Criterios|Telefono|Correo|Movil");
	}
	
	
	
	
	
	
	function recargaPeople(){
		$(document).ready(function() {
			Ocultar("listadoPersonas");
			Ocultar("listadoPersona");
			Ocultar("buscador");
			if (localStorage.getItem('usuario') == '' && localStorage.getItem('clave') == '' ) {
				document.location.href="../index.html";
			}
			
			buscador();
			traducir("usuario|clave|Correo|Responsable|Mis Datos|Buscador|Desconectar|Buscar|Criterios|Telefono|Correo|Movil");
			function refrescarPopup(){
			$("#pop").listview('refresh');
			}
		});
	}
	
	
	function volverPeople(){
	
		var criterios="";
		criterios = $("input#criterios").val();
	
		if (AgendaON){
			agenda(false,PAGINABUSCAR);
		}else{
			buscar(false,PAGINABUSCAR);
		}
	}
	
	
	
	
	
	
	



 





		$(document).ready(function() {
			Ocultar("listadoPersonas");
			Ocultar("listadoPersona");
			Ocultar("buscador");
			if (localStorage.getItem('usuario') == '' && localStorage.getItem('clave') == '' ) {
				document.location.href="../index.html";
			}
			
			buscador();
			traducir("usuario|clave|Correo|Responsable|Mis Datos|Buscador|Desconectar|Buscar|Criterios|Telefono|Correo|Movil");
		
			
			function refrescarPopup(){
			$("#pop").listview('refresh');
			}
		});
		

//FUNCIONES CURSOS 2

function Ocultar(id){
	$("#"+id).hide();
}

function Mostrar(id){
	$("#"+id).show();
}
	//CONSULTAMOS LOS PROYECTOS
function consultarProyectos(){
	Ocultar("listadoProyectos");
	Ocultar("listadoProyevto");
	$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url = 'https://sig.altran.es/aesp/json/apiProyectos.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave;
	var callback;
	callback ='consulta';
    //ejecutamos la llamada jsonp
    jsonp(url,callback);
} 


//CONSULTAMOS UN PROYECTO PASANDO IN ID	
function consultarProyecto(idproyecto){
	Ocultar("listadoProyectos");
	Ocultar("listadoProyecto");
	$("#cargando").remove(); 
	$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];	
	var callback;
	
	idproyectoglobal = idproyecto;
	var url = 'https://sig.altran.es/aesp/json/apiProyectos.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&idproyecto='+idproyecto;

	callback ='detalle';
    jsonp(url,callback);
}  

function jsonp(url,callback)
{
	ultimaUrl = url;
    // creamos un elemento <script>
    scriptElement = document.createElement("SCRIPT");
    // del tipo javascript
    scriptElement.type = "text/javascript";
    // le agregamos la url que ya creamos en el atributo src
    // y le agregamos la funcion de callback que ya definimos
    scriptElement.src = url + "&jsoncallback="+callback;
    // abrimos la cabecera de la pagina para agregar nuestro script ahi
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    // y listo , eso genera que el mismo script haga la llamada a flickr y
    //conteste con la funcion que le pasamos de callback y el json con la info
    // de las fotos como parametro
}
	
	
	function consulta(data) {
	  Mostrar("listadoProyectos");
	  Ocultar("listadoProyecto");
		var result = "";
		
		
		//$("#cursos").html("<h3>Actualmente no tienes formación prevista.</h3>"); 		
		$("#cargando").remove(); 
		
		 $.each(data.items, function(key, proyecto) {	
		  		//Dar formato al json
				
				result +="<li data-role=\"list-divider\" > "+proyecto.proyectotipo  + ": </li>";
				result += "<li><a href=\"#\"  onClick=\"javascript: consultarProyecto("+proyecto.idproyecto+")\">";
				result += "<h3>"+proyecto.proyectonombre+"</h3>";
				result += "<p><strong>Fecha Inicio:</strong> "+proyecto.proyectoinicio+" </p>";
				result += "<p><strong>Fecha Fin:</strong> "+proyecto.proyectofin+" </p>";
				result += "<p class=\"ui-li-aside\"><strong>Empresa: </strong>"+proyecto.empresanombre+"</p></a></li>";
				
				$("#proyectos").html(result); 
		  });
		  	  
		  
    	  $("#proyectos").listview('refresh');
	} 
	
	
	
		function detalle(data) {
		Ocultar("listadoProyectos");
		Mostrar("listadoProyecto");
		
		//$("#page").append("-->" + ultimaUrl + "<br>");
		
		 $.each(data.items, function(key, proyecto) {	
		  		//Dar formato al json
				result ="<li data-role=\"list-divider\" > "+proyecto.proyectonombre+"<span class=\"ui-li-count\">Empresa "+proyecto.empresanombre+"</span></li>";
				result += "<li><p><strong>"+proyecto.proyectotipo+"</strong></p>";
				result += "<p><strong>Fecha Inicio:</strong> "+proyecto.proyectoinicio+" <strong>Fecha fin:</strong> "+proyecto.proyectofin+"</p>";
				result += "<p class=\"ui-li-aside\"><strong>Codproyecto: </strong>"+proyecto.codproyecto+"</p></li>";
				result += "<li data-theme=\"b\">Descripcion:</li>";
				result += "<li><p>"+proyecto.proyectodescripcion+"</p></li>";
				result += "<li data-theme=\"b\">Resumen:</li>";
				result += "<li><p>"+proyecto.proyectoresumen+"</p></li>";
				$("#cargando").remove(); 
				$("#proyecto").html(result); 
		  });
    	  $("#proyecto").listview('refresh');
	}


















 
 
 
 

			Ocultar("solicitardiv");
			Ocultar("listadoProyectos");
			Ocultar("listadoProyecto");
			if (localStorage.getItem('usuario') == '' && localStorage.getItem('clave') == '' ) {
				document.location.href="index.html";
			}
			$(document).ready(function() {
				consultarProyectos();
			});
		

//FUNCIONES CURSOS 2

function Ocultar(id){
	$("#"+id).hide();
}

function Mostrar(id){
	$("#"+id).show();
}
	//CONSULTAMOS LOS CURSOS EN FUNCION DE SU MODO O ESTADO
function consultarCursos(modo,estado){
	Ocultar("listadoCursos");
	Ocultar("listadoCurso");
	Ocultar("solicitardiv");
	$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url;
	var orden = 1;
	var callback;
	if (modo=='0'){
		if (estado== '1'){
		url = 'https://sig.altran.es/aesp/json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=0&modoorden="+orden+"&estadocurso=1";
		callback ='realizados';
		}
		else if(estado=='HOY'){
		url = 'https://sig.altran.es/aesp/json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=0&modoorden="+orden+"&fechaInicio=HOY";
		callback ='proceso';
		}
	} else if(modo=='1') {
	url='https://sig.altran.es/aesp/json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=1&modoorden="+orden;
	callback ='proximos';
	}
	
    //ejecutamos la llamada jsonp
    jsonp(url,callback);
} 

	//CONSULTAMOS UN CURSO PASANDO IN ID
	
var idcursoglobal=-1;
var ultimaUrl="";
	
function consultarCurso(idcurso,modo){
	Ocultar("listadoCursos");
	Ocultar("listadoCurso");
	Ocultar("solicitardiv");
	$("#cargando").remove(); 
	$('#page').append('<div align=" center" id="cargando" ><img align="middle" src="imagenes/loading.gif"/></div>');
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];	
	var url;
	var orden = 1;
	var callback;
	
	idcursoglobal = idcurso;
	
	if (modo== '0'){
		url='https://sig.altran.es/aesp/json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&modo=0&idcurso='+idcurso;
	} else if(modo=='1'){
		url='https://sig.altran.es/aesp/json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&modo=1&idcurso='+idcurso;
	}

	callback ='detalle';
    jsonp(url,callback);
}  

function jsonp(url,callback)
{
	ultimaUrl = url;
    // creamos un elemento <script>
    scriptElement = document.createElement("SCRIPT");
    // del tipo javascript
    scriptElement.type = "text/javascript";
    // le agregamos la url que ya creamos en el atributo src
    // y le agregamos la funcion de callback que ya definimos
    scriptElement.src = url + "&jsoncallback="+callback;
    // abrimos la cabecera de la pagina para agregar nuestro script ahi
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    // y listo , eso genera que el mismo script haga la llamada a flickr y
    //conteste con la funcion que le pasamos de callback y el json con la info
    // de las fotos como parametro
}
	
	
	function proceso(data) {
	  Mostrar("listadoCursos");
	  Ocultar("listadoCurso");
	  Ocultar("solicitardiv");
		var result = "";
		var cursoAnterior = "";
		var idcursoanterior = "";
		var contador = 0;
		var contadorIndividual = 0;
		var hashtable = {};
		
		
		$("#cursos").html("<h3>Actualmente no tienes formación prevista.</h3>"); 		
		$("#cargando").remove(); 
		
		 $.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				contador++;
				if (curso.tipo != cursoAnterior && contador > 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + ": <span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";
					hashtable['contador'+idcursoanterior] = contadorIndividual;
					contadorIndividual = 0;
				}else if (contador == 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + ":<span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";					
				}
				contadorIndividual++;

				result += "<li><a href=\"#\"  onClick=\"javascript: consultarCurso("+curso.idcurso+",0)\">";
				result += "<h3>"+curso.curso+"</h3>";
				result += "<p><strong>Fecha Inicio: "+curso.inicio+" </strong></p>";
				result += "<p><strong>Fecha Fin: "+curso.fin+" </strong></p>";
				result += "<p class=\"ui-li-aside\"><strong>Estado: </strong>"+curso.estado+"</p></a></li>";
				
				$("#cursos").html(result); 
				
				idcursoanterior = curso.idtipo;
				cursoAnterior = curso.tipo;
		  });
		  
		  $("#contador"+idcursoanterior).html(contadorIndividual);
		  for (contador in hashtable){
			$("#"+contador).html(hashtable[contador]);
		  }		  
		  
    	  $("#cursos").listview('refresh');
	} 
	
	
	function realizados(data) {
	  Mostrar("listadoCursos");
	  Ocultar("listadoCurso");
	  Ocultar("solicitardiv");
		var result = "";
		var cursoAnterior = "";
		var idcursoanterior = "";
		var contador = 0;
		var contadorIndividual = 0;
		var hashtable = {};
		
		
		$("#cursos").html("<h3>Actualmente no tienes formación realizada.</h3>"); 
		$("#cargando").remove(); 
		 $.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				contador++;
				if (curso.tipo != cursoAnterior && contador > 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + "<span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";
					hashtable['contador'+idcursoanterior] = contadorIndividual;
					contadorIndividual = 0;
				}else if (contador == 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + ":<span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";					
				}
				contadorIndividual++;

				result += "<li><a href=\"#\"  onClick=\"javascript: consultarCurso("+curso.idcurso+",0)\">";
				result += "<h3>"+curso.curso+"</h3>";
				result += "<p><strong>Fecha Inicio: "+curso.inicio+" </strong></p>";
				result += "<p><strong>Fecha Fin: "+curso.fin+" </strong></p>";
				result += "<p class=\"ui-li-aside\"><strong>Estado: </strong>"+curso.estado+"</p></a></li>";
				
				$("#cursos").html(result); 
				
				idcursoanterior = curso.idtipo;
				cursoAnterior = curso.tipo;
		  });
		  
		  $("#contador"+idcursoanterior).html(contadorIndividual);
		  for (contador in hashtable){
			$("#"+contador).html(hashtable[contador]);
		  }		  
		  
    	  $("#cursos").listview('refresh');
	} 
	
	
	function proximos(data) {
		Mostrar("listadoCursos");
		Ocultar("listadoCurso");
		Ocultar("solicitardiv");
		var result = "";
		var cursoAnterior = "";
		var idcursoanterior = "";
		var contador = 0;
		var contadorIndividual = 0;
		
		var hashtable = {};
	
		$("#cursos").html("<h3>No hay cursos pendientes.</h3>"); 
		
		 $.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				contador++;
				if (curso.tipo != cursoAnterior && contador > 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + "<span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";
					hashtable['contador'+idcursoanterior] = contadorIndividual;
					contadorIndividual = 0;
				}else if (contador == 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + ": <span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";					
				}
				contadorIndividual++;
				result += "<li><a href=\"#\"  onClick=\"javascript: consultarCurso("+curso.idcurso+",0)\">";
				result += "<h3>"+curso.curso+"</h3>";
				result += "<p><strong>Fecha Inicio:</strong> "+curso.inicio+"</p>";
				result += "<p><strong>Fecha Fin:</strong> "+curso.fin+" </p>";
				result += "<p class=\"ui-li-aside\"><strong>Plazas: </strong>"+curso.plazas+"</p></a></li>";
				$("#cargando").remove(); 
				$("#cursos").html(result); 

				idcursoanterior = curso.idtipo;
				cursoAnterior = curso.tipo;
		  });
		  $("#contador"+idcursoanterior).html(contadorIndividual);
		  for (contador in hashtable){
			$("#"+contador).html(hashtable[contador]);
		  }
		  
    	  $("#cursos").listview('refresh');
	} 
	
		function detalle(data) {
		var modo;
		if (data.items==''){
			modo = 1;			
			consultarCurso(idcursoglobal,modo);
		}
		Ocultar("listadoCursos");
		Mostrar("listadoCurso");
		
		//$("#page").append("-->" + ultimaUrl + "<br>");
		
		 $.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				result ="<li data-role=\"list-divider\" > "+curso.curso+"<span class=\"ui-li-count\">"+curso.nombresede+" - "+curso.aula+"</span></li>";
				result += "<li><p><strong>"+curso.tipo+"</strong></p>";
				result += "<p><strong> Inicio Inscripcion:</strong> "+curso.inicioinscripcion+"<strong> Fin Inscripcion:</strong> "+curso.fininscripcion+" </p>";
				result += "<p><strong>Fecha Inicio:</strong> "+curso.inicio+" <strong>Fecha fin:</strong> "+curso.fin+"</p>";
				result += "<p><strong>Horario: </strong>"+curso.horario+"<strong> Horas: </strong> "+curso.horas+"</p>";
				result += "<p class=\"ui-li-aside\"><strong>Plazas: </strong>"+curso.plazas+"</p></li>";
				result += "<li data-theme=\"b\">Audiencia:</li>";
				result += "<li><p>"+curso.audiencia+"</p></li>";
				result += "<li data-theme=\"b\">Objetivo:</li>";
				result += "<li><p>"+curso.objetivo+"</p></li>";
				result += "<li data-theme=\"b\">Descripcion:</li>";
				result += "<li><p>"+curso.descripcion+"</p></li>";
				if (curso.temario != ""){
					result += "<li data-theme=\"b\">Temario:</li>";
					result += "<li><div>"+curso.temario+"</div></li>";
				}
				if(curso.idestado==-1){
					Mostrar("solicitardiv");
				}else{
					Ocultar("solicitardiv");
					result += "<li data-theme=\"a\"><span class=\"ui-li-count\">"+curso.estado+"</span></li>";
				}
				$("#cargando").remove(); 
				$("#curso").html(result); 
		  });
    	  $("#curso").listview('refresh');
	}
	
	function solicitarCurso(){
		alert("Por hacer, Solicitar Curso:" + idcursoglobal);
	}
	
	




























		$('body').delegate('.nav-search', 'pageshow', function( e ) {
			$('.ui-input-text').attr("autofocus", true)
		});			
	












































































































































































































































































































































	$(document).bind("mobileinit", function(){
	  $.mobile.loadingMessage = false;
	});
	










	$(document).bind("mobileinit", function() {
		if (!!window.navigator.standalone) {
			$.mobile.page.prototype.options.addBackBtn = true;
		}
	});
	





	$(document).bind("mobileinit", function(){
		$.mobile.loadingMessageTextVisible = true;
	});
	


		$(document).on("click", ".show-page-loading-msg", function() {
			var $this = $( this ),
				theme = $this.jqmData("theme") || $.mobile.loadingMessageTheme,
				msgText = $this.jqmData("msgtext") || $.mobile.loadingMessage,
				textonly = !!$this.jqmData("textonly");
			$.mobile.showPageLoadingMsg(theme, msgText, textonly);
		})
		.on("click", ".hide-page-loading-msg", function() {
			$.mobile.hidePageLoadingMsg();
		});
	




	$(document).bind("mobileinit", function(){
	  $.mobile.pageLoadErrorMessage = 'Yikes, we broke the internet!';
	});
	





		$(document).bind("mobileinit", function(){
			$.mobile.defaultPageTransition = 'flow';
		});
	









	$(document).bind("mobileinit", function(){
	  $.mobile.touchOverflowEnabled = true;
	});
	





		$(document).bind("mobileinit", function(){
			$.mobile.defaultDialogTransition = 'flip';
		});
	





	$(document).bind("mobileinit", function(){
	  $.mobile.minScrollBack = 999;
	});
	





	$(document).bind("mobileinit", function(){
	  $.mobile.pushStateEnabled = false;
	});
	











































































































































































































































































































// Some sample categorized data. This data is in-memory
// for demonstration purposes, but could be loaded dynamically
// via ajax.
var categoryData = {
	animals: {
		name: "Animals",
		description: "All your favorites from aardvarks to zebras.",
		items: [
			{
				name: "Pets"
			},
			{
				name: "Farm Animals"
			},
			{
				name: "Wild Animals"
			}
		]
	},
	colors: {
		name: "Colors",
		description: "Fresh colors from the magic rainbow.",
		items: [
			{
				name: "Blue"
			},
			{
				name: "Green"
			},
			{
				name: "Orange"
			},
			{
				name: "Purple"
			},
			{
				name: "Red"
			},
			{
				name: "Yellow"
			},
			{
				name: "Violet"
			}
		]
	},
	vehicles: {
		name: "Vehicles",
		description: "Everything from cars to planes.",
		items: [
			{
				name: "Cars"
			},
			{
				name: "Planes"
			},
			{
				name: "Construction"
			}
		]
	}
};

// Load the data for a specific category, based on
// the URL passed in. Generate markup for the items in the
// category, inject it into an embedded page, and then make
// that page the current active page.
function showCategory( urlObj, options )
{
	var categoryName = urlObj.hash.replace( /.*category=/, "" ),

		// Get the object that represents the category we
		// are interested in. Note, that at this point we could
		// instead fire off an ajax request to fetch the data, but
		// for the purposes of this sample, it's already in memory.
		category = categoryData[ categoryName ],

		// The pages we use to display our content are already in
		// the DOM. The id of the page we are going to write our
		// content into is specified in the hash before the '?'.
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	if ( category ) {
		// Get the page we are going to dump our content into.
		var $page = $( pageSelector ),

			// Get the header for the page.
			$header = $page.children( ":jqmData(role=header)" ),

			// Get the content area element for the page.
			$content = $page.children( ":jqmData(role=content)" ),

			// The markup we are going to inject into the content
			// area of the page.
			markup = "<p>" + category.description + "</p><ul data-role='listview' data-inset='true'>",

			// The array of items for this category.
			cItems = category.items,

			// The number of items in the category.
			numItems = cItems.length;

		// Generate a list item for each item in the category
		// and add it to our markup.
		for ( var i = 0; i < numItems; i++ ) {
			markup += "<li>" + cItems[i].name + "</li>";
		}
		markup += "</ul>";

		// Find the h1 element in our header and inject the name of
		// the category into it.
		$header.find( "h1" ).html( category.name );

		// Inject the category items markup into the content element.
		$content.html( markup );

		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced before we
		// attempt to enhance the listview markup we just injected.
		// Subsequent calls to page() are ignored since a page/widget
		// can only be enhanced once.
		$page.page();

		// Enhance the listview we just injected.
		$content.find( ":jqmData(role=listview)" ).listview();

		// We don't want the data-url of the page we just modified
		// to be the url that shows up in the browser's location field,
		// so set the dataUrl option to the URL for the category
		// we just loaded.
		options.dataUrl = urlObj.href;

		// Now call changePage() and tell it to switch to
		// the page we just modified.
		$.mobile.changePage( $page, options );
	}
}


// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if ( typeof data.toPage === "string" ) {
		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#category-item/;
		if ( u.hash.search(re) !== -1 ) {
			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showCategory( u, data.options );

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});









// Load the JSON data for a specific category, based on
// the URL passed in. Generate markup for the items in the
// category, inject it into an embedded page, and then make
// that page the current active page.
function showCategory( url, options )
{
	$.getJSON( url, function( category ) {
		if ( category ) {
			// Get the page we are going to dump our content into.
			var $page = $( "#category-items" ),
	
				// Get the header for the page.
				$header = $page.children( ":jqmData(role=header)" ),
	
				// Get the content area element for the page.
				$content = $page.children( ":jqmData(role=content)" ),
	
				// The markup we are going to inject into the content
				// area of the page.
				markup = "<p>" + category.description + "</p><ul data-role='listview' data-inset='true'>",
	
				// The array of items for this category.
				cItems = category.items,
	
				// The number of items in the category.
				numItems = cItems.length;
	
			// Generate a list item for each item in the category
			// and add it to our markup.
			for ( var i = 0; i < numItems; i++ ) {
				markup += "<li>" + cItems[i].name + "</li>";
			}
			markup += "</ul>";
	
			// Find the h1 element in our header and inject the name of
			// the category into it.
			$header.find( "h1" ).html( category.name );
	
			// Inject the category items markup into the content element.
			$content.html( markup );
	
			// Pages are lazily enhanced. We call page() on the page
			// element to make sure it is always enhanced before we
			// attempt to enhance the listview markup we just injected.
			// Subsequent calls to page() are ignored since a page/widget
			// can only be enhanced once.
			$page.page();
	
			// Enhance the listview we just injected.
			$content.find( ":jqmData(role=listview)" ).listview();
	
			// We don't want the data-url of the page we just modified
			// to be the url that shows up in the browser's location field,
			// so set the dataUrl option to the URL for the category
			// we just loaded.
			options.dataUrl = url;
	
			// Now call changePage() and tell it to switch to
			// the page we just modified.
			$.mobile.changePage( $page, options );
		}
	});
}

 
// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if ( typeof data.toPage === "string" ) {
		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl( data.toPage );
		if ( u.pathname.search("category.php") !== -1 ) {
			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showCategory( u.href, data.options );

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});






























































 





		$(document).ready(function() {
			Ocultar("cancelardiv");
			Ocultar("solicitardiv");
			Ocultar("listadoCursos");
			Ocultar("listadoCurso");
			Ocultar("buscadorCursos");
			
			if (localStorage.getItem('usuario') == '' && localStorage.getItem('clave') == '' ) {
				document.location.href="../index.html";
			}
			
			consultarCursos("true","1","0");
			traducir("Correo|Responsable|Mi Formacion|Mi Proxima Formacion|Desconectar|Buscar|Proximos Cursos|Audiencia|Objetivo|Descripcion|Temario|Solicitar|Cancelar|Menu|Inicio Inscripcion|Fin Inscripcion|Fecha Inicio|Fecha Fin|Horario|Horas|Plazas");

			function refrescarPopup(){
			$("#pop").listview('refresh');
			}
		});
		

//FUNCIONES CURSOS 2

//Variables Glovales
var presencial;
var idcurso; // ID del curso 
var idpersona; // ID de la Persona
var PAGINABUSCAR = 0; // Pagina que queremos mostar del paginado
var modo; var estado;// Modo de busqueda y estado  0,1 = Mi formacion        0,Hoy = Mi proxima Formacion        1,0 = Proximos Cursos    2,0 = Buscador Cursos

var SERVIDORSIG = 'https://sig.altran.es/aesp/';


function Ocultar(id){
	$("#"+id).hide();
}

function Mostrar(id){
	$("#"+id).show();
}

//Funciones para descargar Documentacion

function loadURL(url){
	//alert("LLega")
    //navigator.app.loadUrl(url, { openExternal:true });
	//window.plugins.childBrowser.showWebPage(url, { showLocationBar: false });
	window.plugins.childBrowser.openExternal(url);
	//return false;
} 



	//CONSULTAMOS LOS CURSOS EN FUNCION DE SU MODO O ESTADO
function consultarCursos(resetPagina,modo,estado,PaginaAux){
	
	Ocultar("buscador");
	Ocultar("listadoCursos");
	Ocultar("listadoCurso");
	Ocultar("solicitardiv");
	Ocultar("cancelardiv");	
	Ocultar("solicitardivDistancia");
	Ocultar("buscadorCursos");
	this.modo=modo;
	this.estado=estado;

	
	if(resetPagina){
		PAGINABUSCAR = 0;
	}
	if(PaginaAux >= 0){
		 PAGINABUSCAR = PaginaAux;
	 }
	$('#cargando').show();
	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];
	var url;
	var orden = 1;
	var callback;
	if (modo=='0'){
		if (estado== '1'){
		url = SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=0&modoorden="+orden+"&estadocurso=1,2,4,11&pagina="+PAGINABUSCAR;
		}
		else if(estado=='HOY'){
		url = SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=0&modoorden="+orden+"&fechaInicio=HOY&pagina="+PAGINABUSCAR;
		}
	} else if(modo=='1') {
		url=SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=1&modoorden="+orden+"&pagina="+PAGINABUSCAR;
	} else if(modo=='2') {
		url=SERVIDORSIG+'json/apiFormacion.asp?criteriobusqueda='+criteriobusqueda+'&method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+"&modo=2&modoorden="+orden+"&pagina="+PAGINABUSCAR;
	}

	
	var d = new Date();
	var ts = d.getTime();
	url += "&ts=" + ts;
	
	callback ='resultado';
    //ejecutamos la llamada jsonp
	$.mobile.loading('show');
    jsonp(url,callback);
} 

var criteriobusqueda = ''

function buscadorCursos(){
	Mostrar("buscadorCursos");
	//$("#criteriobusqueda").val(criteriobusqueda);
	Ocultar("listadoCursos");
	Ocultar("listadoCurso");	
	Ocultar("solicitardiv");
	Ocultar("solicitardivDistancia");	
}

function buscarCurso(){
	criteriobusqueda = $("#criteriobusqueda").val();
	consultarCursos(true,2,0);
}

	//CONSULTAMOS UN CURSO PASANDO IN ID
	
var idcursoglobal=-1;
var ultimaUrl="";
	
function consultarCurso(idcurso,modo){
	Ocultar("listadoCursos");
	Ocultar("listadoCurso");	
	Ocultar("solicitardiv");
	Ocultar("cancelardiv");
	Ocultar("solicitardivDistancia");
	Ocultar("buscadorCursos");

	var usuario = localStorage["usuario"];
	var clave = localStorage["clave"];	
	var url;
	var orden = 1;
	var callback;
	
	idcursoglobal = idcurso;
	
	if (modo== '0'){
		url=SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&modo=0&idcurso='+idcurso;
	} else if(modo=='1'){
		url=SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&modo=1&idcurso='+idcurso;
	} else if(modo=='2'){
		url=SERVIDORSIG+'json/apiFormacion.asp?method=SigEspecial&format=json&usuario='+usuario+'&password='+clave+'&modo=2&idcurso='+idcurso;
	}

	var d = new Date();
	var ts = d.getTime();
	url += "&ts=" + ts;	
	
	callback ='detalleCurso';
	$.mobile.loading('show'); // Mostrar Simbolo de carga
    jsonp(url,callback);
}  

function jsonp(url,callback)//Funcion para consultar JsonP
{
	ultimaUrl = url;	
    // creamos un elemento <script>
    scriptElement = document.createElement("SCRIPT");
    // del tipo javascript
    scriptElement.type = "text/javascript";
    // le agregamos la url que ya creamos en el atributo src
    // y le agregamos la funcion de callback que ya definimos
    scriptElement.src = url + "&jsoncallback="+callback;
    // abrimos la cabecera de la pagina para agregar nuestro script ahi
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
    // y listo , eso genera que el mismo script haga la llamada a flickr y
    //conteste con la funcion que le pasamos de callback y el json con la info
    // de las fotos como parametro
	//console.log(url);
}
	
	
	// Resultado de la llamada Jsonp
	function resultado(data) {
		Ocultar("cancelardiv");
		Ocultar("listadoCurso");
		Ocultar("solicitardiv");
		Ocultar("solicitardivDistancia");
		Mostrar("listadoCursos");
		
		// if(modo=='2'){
			// $('#cursos').attr("data-filter", "false");
		//	alert("aqui1")
		// }else{
			// $('#cursos').attr("data-filter", "true");
		//	alert("aqui2")
		// }
		
		var result = "";
		var cursoAnterior = "";
		var idcursoanterior = "";
		var contador = 0;
		var contadorIndividual = 0;	
		
		var hashtable = {};
		
		if (modo=='0'){
			if (estado== '1'){
				$("#cursos").html("<h3><span id='actualmentenotienesformacionrealizada-tr'>Actualmente no tienes formación realizada</span>.</h3>"); 
			}
			else if(estado=='HOY'){
			$("#cursos").html("<h3><span id='actualmentenotienesformacionprevista-tr'>Actualmente no tienes formación prevista</span>.</h3>"); 
			}
		} else if(modo=='1') {
			$("#cursos").html("<h3><span id='nohaycursospendienrtes-tr'>No hay cursos pendientes</span>.</h3>"); 
		} else if(modo=='2') {
			$("#cursos").html("<h3><span id='nohaycursospendienrtes-tr'>No hay resultados.</span>.</h3>"); 
		}
		
		var nElementos = data.items.length;
		var elementoActual = 0;
		
		if(data.error == "2"){
			alert("Usuario / Password incorrectos");
			localStorage.setItem('usuario','');
			localStorage.setItem('clave','');
			document.location.href="../index.html";
		}
		
			$.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				contador++;
				elementoActual++;
				if (curso.tipo != cursoAnterior && contador > 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + "<span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";
					hashtable['contador'+idcursoanterior] = contadorIndividual;
					contadorIndividual = 0;
				}else if (contador == 1) {
					result +="<li data-role=\"list-divider\" > "+curso.tipo  + ": <span id=\"contador"+curso.idtipo+"\" class=\"ui-li-count\">_</span></li>";					
				}
				contadorIndividual++;
				var inicioinscripcion = curso.inicioinscripcion;
				var fininscripcion = curso.fininscripcion;
				var corteInicio = inicioinscripcion.substring(0,5);
				var corteFin = fininscripcion.substring(0,5);
				

				if(modo=='2'){
					result += "<li><a href=\"#\"  onClick=\"javascript: consultarCurso("+curso.idcurso+",2)\">";
				}else{
					result += "<li><a href=\"#\"  onClick=\"javascript: consultarCurso("+curso.idcurso+",0)\">";
				}
				result += "<h3>"+curso.curso+"</h3>";

				//Inscripcion o fechas de curso segun si es para ver proximos o ya mi formacion
				if (modo=='0'){
					if (estado== '1'){
						result += "<p><strong><span class='formacionde-tr'>De</span>: </strong>"+curso.inicio+" a "+curso.fin;
					}
					else if(estado=='HOY'){
						result += "<p><strong><span class='formacionde-tr'>De</span>: </strong>"+curso.inicio+" a "+curso.fin;
					}
				} else if(modo=='1') {
					result += "<p><strong><span class='inscripcionde-tr'>Inscripción de</span>: </strong>"+corteInicio+" a "+corteFin;
				} else if(modo=='2') {
					result += "<p><strong><span class='formacionde-tr'>De</span>: </strong>"+curso.inicio+" a "+curso.fin;
				}

				if (curso.idestado==2){
					result+="<font color='red'> Solicitado</font>"
				}else if(curso.idestado==11){
					result+="<font color='red'> Solicitado</font>"
				}else if(curso.idestado==4){
					result+="<font color='red'> Aprobado</font>"
				}

				result+="</p>";
				//Nombre de la sede
				result += "<p><strong><span class='sede-tr'>Sede</span>: </strong>"+curso.nombresede+"</p></a></li>";
				//Paginado si procediara
				if (curso.total > 0 || (PAGINABUSCAR > 0 && elementoActual == nElementos) ){	
					result += "<li class=\"ui-body ui-body-b\">";
					var JavascriptAdelante = "";
					var JavascriptAtras = "";
					var clase1 = "";
					var clase2 = "";
					
					if (modo=='0'){
						if (estado== '1'){
							JavascriptAdelante = "consultarCursos(false,0,1,"+(PAGINABUSCAR+1)+")";
							JavascriptAtras = "consultarCursos(false,0,1,"+(PAGINABUSCAR-1)+")";
						}
						else if(estado=='HOY'){
						JavascriptAdelante = "consultarCursos(false,0,'HOY',"+(PAGINABUSCAR+1)+")";
						JavascriptAtras = "consultarCursos(false,0,'HOY',"+(PAGINABUSCAR-1)+")";
						}
					} else if(modo=='1') {
						JavascriptAdelante = "consultarCursos(false,1,0,"+(PAGINABUSCAR+1)+")";
						JavascriptAtras = "consultarCursos(false,1,0,"+(PAGINABUSCAR-1)+")";					
					} else if(modo=='2') {
						JavascriptAdelante = "consultarCursos(false,2,0,"+(PAGINABUSCAR+1)+")";
						JavascriptAtras = "consultarCursos(false,2,0,"+(PAGINABUSCAR-1)+")";
					}
					
					//console.log("JavascriptAtras:" + JavascriptAtras);
					//console.log("JavascriptAdelante:" + JavascriptAdelante);
					
					if (PAGINABUSCAR > 0 && curso.total > 0){
						result += '<fieldset class="ui-grid-a">';
						clase1 = "ui-block-a";
						clase2 = "ui-block-b";
					}else{
						result += '<fieldset>';
						clase1 = "";
						clase2 = "";						
					}
					if (PAGINABUSCAR > 0){
						result += '<div class="'+clase1+'"><button class="paginado" data-icon="arrow-l" data-iconpos="left" onClick=\"javascript:'+JavascriptAtras+'\">Ant.</buton></div>';
					}
					if (curso.total > 0){
						result += '<div class="'+clase2+'"><button class="paginado" data-icon="arrow-r" data-iconpos="right" onClick=\"javascript:'+JavascriptAdelante+'\">Sig.</buton></div>';
					}
					result += '</fieldset>';

					result += "</li>";
					
					var totalPaginas;
					if (curso.totalpaginas == undefined){
							totalPaginas = (PAGINABUSCAR+1);
					}else{
							totalPaginas = curso.totalpaginas;
					}					
					result += "<li data-role=\"list-divider\" >&nbsp;<span class=\"ui-li-count\">Pagina: "+(PAGINABUSCAR+1)+"/"+totalPaginas+"</span></li>";
				}
				//Fin Paginado
				
				$("#cursos").html(result); 

				idcursoanterior = curso.idtipo;
				cursoAnterior = curso.tipo;
			});
		  $("#contador"+idcursoanterior).html(contadorIndividual);
		  for (contador in hashtable){
			$("#"+contador).html(hashtable[contador]);
		  }
		  
    	 //Traducir en caso de que sea necesario
		  traducir("Correo|Responsable|Mi Formacion|Mi Proxima Formacion|Desconectar|Buscar|Proximos Cursos|Audiencia|Objetivo|Descripcion|Temario|Solicitar|Cancelar|Menu|Inicio Inscripcion|Fin Inscripcion|Fecha Inicio|Fecha Fin|Horario|Horas|Sede|Actualmente no tienes formación realizada|Actualmente no tienes formación prevista|No hay cursos pendientes");
		  //Refrescar lista
		  $.mobile.loading('hide');
    	  $("#cursos").listview('refresh');
		  $('.paginado').button();   
	} 
	
		function detalleCurso(data) {
		
		var teleasistencia;
		if (data.items==''){
			modo = 1;			
			consultarCurso(idcursoglobal,modo);
		}
		//Ocultar("buscador");
		Ocultar("listadoCursos");
		Mostrar("listadoCurso");
		//$("#page").append("-->" + ultimaUrl + "<br>");
		
		 $.each(data.items, function(key, curso) {	
		  		//Dar formato al json
				result ="<li data-role=\"list-divider\" > "+curso.curso+"</li>";
				result += "<li><p><strong>"+curso.tipo+"</strong></p>";
				result += "<p><strong><span class='lugar-tr'>Lugar</strong>: </span>"+curso.nombresede+" - "+curso.aula+"</p>";
					if (curso.solopresencial == "Verdadero") teleasistencia = "No";
					else teleasistencia = "Si";
				result += "<p><strong><span id='teleasistencia-tr'>Teleasistencia</span>:</strong> "+teleasistencia+"</p>";
				result += "<p><strong><span id='inicioinscripcion-tr'>Inicio Inscripcion</span>:</strong> "+curso.inicioinscripcion+" <strong><span id='fininscripcion-tr'>Fin Inscripcion</span>:</strong> "+curso.fininscripcion+" </p>";
				result += "<p><strong><span id='fechainicio-tr'>Fecha Inicio</span>:</strong> "+curso.inicio+" <strong><span id='fechafin-tr'>Fecha Fin</span>:</strong> "+curso.fin+"</p>";
				result += "<p><strong><span id='horario-tr'>Horario</span>: </strong>"+curso.horario+" <strong><span id='horas-tr'>Horas</span>: </strong> "+curso.horas+"</p>";
				result += "<p class=\"ui-li-aside\"></li>"; //<strong><span id='plazas-tr'>Plazas</span>: </strong>"+curso.plazas+"</p>
				result += "<li data-theme=\"b\"><span id='audiencia-tr'>Audiencia</span>:</li>";
				result += "<li><p>"+curso.audiencia+"</p></li>";
				result += "<li data-theme=\"b\"><span id='objetivo-tr'>Objetivo</span>:</li>";
				result += "<li><p>"+curso.objetivo+"</p></li>";
				result += "<li data-theme=\"b\"><span id='descripcion-tr'>Descripcion</span>:</li>";
				result += "<li><p>"+curso.descripcion+"</p></li>";
				if (curso.temario != ""){
					result += "<li data-theme=\"b\"><span id='temario-tr'>Temario</span>:</li>";
					result += "<li><div>"+curso.temario+"</div></li>";
				}				
				if (curso.documentacion != ""){
					result += "<li data-theme=\"b\"><span id='temario-tr'>Documentación</span>:</li>";
					result += "<li><div><a class=\"ui-link-inherit\" href='#' data-role='button' onClick=\"loadURL('"+SERVIDORSIG+'repositorio/nivel0/nivel1/'+curso.documentacion+"')\" >Ver Documentación </a></div></li>";
					//result += "<li><div><a class=\"ui-link-inherit\" href='#' data-role='button' onClick=\"loadURL('http://www.google.com')\" >Ver google </a></div></li>";
					//result += "<li><div><a href='#' data-role='button' onClick=\"descargarArchivo('"+SERVIDORSIG+'repositorio/nivel0/nivel1/'+curso.documentacion+"')\" >Descargar Documentación 1</a></div></li>";
					//result += "<li><div><a href=\""+SERVIDORSIG+'repositorio/nivel0/nivel1/'+curso.documentacion+"\" data-role='button' target=\"_blank\">Ver Documentación 2</a></div></li>";
				}
				result += "<li data-theme=\"a\"><a class=\"ui-link-inherit\" href=\"#\" onclick='volverCursos();' data-icon=\"back\"><span id='volver-tr'>Volver</span></a></li>";
				if(modo==2){
					}else{
					if(curso.idestado==-1){
						Mostrar("solicitardiv");
						idcurso = curso.idcurso;
						idpersona= curso.idpersona;
						if (curso.solopresencial == "Falso"){
						presencial = "Falso";
							Mostrar("solicitardivDistancia");
						} 
					}else{
						idcurso = curso.idcurso;
						idpersona= curso.idpersona;
						
						Ocultar("solicitardiv");

						if (curso.idestado == 2 || curso.idestado== 11){
							Mostrar("cancelardiv");
						}
						result += "<li data-theme=\"a\"><span id='spancursoestado' class=\"ui-li-count\">"+curso.estado+"</span></li>";
					}
				}	
				$("#curso").html(result); 
		  });
		  //Traducir en caso de que sea necesario
		  traducir("Correo|Responsable|Mi Formacion|Mi Proxima Formacion|Desconectar|Buscar|Proximos Cursos|Audiencia|Objetivo|Descripcion|Temario|Solicitar|Cancelar|Menu|Inicio Inscripcion|Fin Inscripcion|Fecha Inicio|Fecha Fin|Horario|Horas|Lugar|Formacion de|Inscripcion de|Sede|Teleasistencia|Solicitar a distancia");
		  //Refrescar lista
		  //$('#cargando').hide();
		  $.mobile.loading('hide');
    	  $("#curso").listview('refresh');
	}
	
	function solicitarCurso(idcurso,idpersona,modoSolicitar){

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = dd+'/'+mm+'/'+yyyy;
	
		if (modoSolicitar == 1){
			url="https://sig.altran.es/aesp/Formacion/FormacionCursoInscritoBD.asp?IdCurso="+idcurso+"&IdPersona="+idpersona+"&Fecha="+today+"&Prioridad=3&Origen=CURSO&EnviarMails=on&IdEstado=2&Modo=2";
		}else{
			url="https://sig.altran.es/aesp/Formacion/FormacionCursoInscritoBD.asp?IdCurso="+idcurso+"&IdPersona="+idpersona+"&Fecha="+today+"&Prioridad=3&Origen=CURSO&EnviarMails=on&IdEstado=11&Modo=2";
		}	
		
		var callback = 'solicitar';
		$.mobile.loading('show');
		$.getJSON(url);
		//jsonp(url,callback);
		
		var result = "<li data-theme=\"a\"><span id='spancursoestado' class=\"ui-li-count\">Solicitado</span></li>";
		 $.mobile.loading('hide');

	
		if ($("#spancursoestado").size() == 0){
			//alert("No existe span");
			$("#curso").html($("#curso").html()+result); 			
			$("#curso").listview('refresh');
		}else{
			$("#spancursoestado").html("Solicitado"); 
		}
		Ocultar("solicitardiv");
		Ocultar("solicitardivDistancia");
		Mostrar("cancelardiv");
	}


	function cancelarCurso(idcurso,idpersona){

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = dd+'/'+mm+'/'+yyyy;
	
		url="https://sig.altran.es/aesp/Formacion/FormacionCursoInscritoBD.asp?IdCurso="+idcurso+"&IdPersona="+idpersona+"&Fecha="+today+"&Prioridad=3&Origen=CURSO&EnviarMails=on&Modo=3"
		
		
		var callback = 'cancelar';
		$.mobile.loading('show');
		//jsonp(url,callback);
		$.getJSON(url);
		$.mobile.loading('hide');
		Ocultar("cancelardiv");
		$("#spancursoestado").html("Cancelada inscripción");
		Mostrar("solicitardiv");
		if (presencial == "Falso"){
			Mostrar("solicitardivDistancia");
		} 
		
		
	}	
	
	function recargaCursos(){
		$(document).ready(function() {
			
			Ocultar("cancelardiv");
			Ocultar("solicitardiv");
			Ocultar("listadoCursos");
			Ocultar("listadoCurso");
			Ocultar("solicitardivDistancia");
			Ocultar("buscadorCursos");
			if (localStorage.getItem('usuario') == '' && localStorage.getItem('clave') == '' ) {
				document.location.href="index.html";
			}
			
				consultarCursos("true","1","0");
				traducir("Correo|Responsable|Mi Formacion|Mi Proxima Formacion|Desconectar|Buscar|Proximos Cursos|Audiencia|Objetivo|Descripcion|Temario|Solicitar|Cancelar|Menu|Inicio Inscripcion|Fin Inscripcion|Fecha Inicio|Fecha Fin|Horario|Horas|Volver");
			
			function refrescarPopup(){
			$("#pop").listview('refresh');
			}
		});
	}
	
	function volverCursos(){
		//Evaluacion estado anterior
		if (modo=='0'){
			if (estado== '1'){
					consultarCursos("false","0","1",PAGINABUSCAR);
				}
			else if(estado=='HOY'){
			consultarCursos("false","0","HOY",PAGINABUSCAR);
			}
		} else if(modo=='1') {
			consultarCursos("false","1","0",PAGINABUSCAR);
		} else if(modo=='2') {
			buscarCurso();
		}
	}
	

	



















