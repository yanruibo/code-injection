
























﻿Project.DocumentReady(function () {

    BaseDeDatos.PrepareBD();

    if (Server.GetLicencia() == "") {
        window.location.href = "licencia.html";
    }
    else {
        //Obtenemos el handicap de cache        
        $("#tu_handicap strong").html(Server.GetHandicapCache());
        //Si tenemos el número de licencia y estamos online, refrescamos el handicap
        if (Project.IsOnLine() && (Server.GetLicencia() != "")) {
            var datos = {};
            datos.licencia = Server.GetLicencia();
            Server.Post(
                    'handicap.aspx',
                    datos,
                    function (data, status) {
                        if ((data.length == 1) && (data[0].cod_resultado == "OK")) {
                            window.localStorage.setItem("handicap", data[0].handicap);
                            $("#tu_handicap strong").html(data[0].handicap);
                        }
                    },
                    function (a, b, c) {
                    });
        }
    }
});
                            



﻿Project.DocumentReady(function () {
    //Mostramos el preloader:$.mobile.showPageLoadingMsg();
    //Debe ocultarse:
    //  - Cuando carga de base de datos local - La carga del servidor se realiza en background sin que se entere el usuario
    //  - Cuando en bbdd local no tenemos nada, mostramos preloader mientras cargamos del servidor las noticias
    //Cargamos lo que tengamos en bbdd local
    var fnCallBack = function (list) {
        for (var i in list) {
            $("#lista_noticias").prepend("<li><a><h3 class='ui-li-noticia'>" + list[i].titulo + "<span rel='" + list[i].id + "'>" + Project.ConvertirAFecha(list[i].fecha) + "</span></h3></a></li>");
        }
        $("#lista_noticias").listview('refresh');
        $("#lista_noticias li").unbind().bind('click', function () {
            //TODO:Ir a la página detalle y mostrar noticia
            openNoticia($(this).find('span').attr('rel'));
        });
        BaseDeDatos.EjecutarInstruccion('DELETE FROM noticias WHERE id NOT IN (SELECT id FROM noticias ORDER BY fecha DESC LIMIT 100 )');
    }

    function openNoticia(permalink) {
        $.mobile.showPageLoadingMsg();
        BaseDeDatos.ObtenerDataTable(
            "SELECT id,fecha,titulo,titular,texto,imagen FROM noticias WHERE id = '" + permalink + "'; ",
            function (tx, results) {
                if (results.rows.length > 0) {
                    if ($(window).width() >= 400)
                        $("#noticia").removeClass("size-low").addClass("size-high");
                    else
                        $("#noticia").removeClass("size-high").addClass("size-low");

                    var articulo = results.rows.item(0);
                    $("#noticia_fecha").empty();
                    $("#noticia_fecha").append(Project.ConvertirAFecha(articulo.fecha));
                    $("#noticia_titulo").empty();
                    $("#noticia_titulo").append(articulo.titulo);
                    //Si no hay conexión no mostramos la imagen
                    if (Project.IsOnLine() && (articulo.imagen!="")) {
                        $("#noticia_foto").attr("src", Project.BASEURLIMAGES + articulo.imagen);
                        $("#foto").show();                        
                    } else {
                        $("#foto").hide();
                        /*$("#noticia_foto").hide();
                        $("#noticia .top").css('margin-bottom', '0px');
                        $("#noticia .bottom").css('margin-top', '0px');*/
                    }
                    $("#noticia_titular").empty();
                    $("#noticia_titular").append(articulo.titular);
                    $("#noticia_contenido").empty();
                    $("#noticia_contenido").append(articulo.texto);

                } else {
                    //NO SE PUDO LEER LA NOTICIA VOLVEMOS A LA LISTA DE NOTICIAS???
                    Project.Alert('No se ha podido mostrar la noticia.', 'Noticia no encontrada.');
                }
                $.mobile.changePage("#noticia");
            });

        $.mobile.hidePageLoadingMsg();

    }

    BaseDeDatos.ObtenerDataTable(
    	"SELECT id,fecha,titulo,titular,texto,imagen FROM noticias ORDER BY fecha DESC; ",
		function (tx, results) {
		    var len = results.rows.length;
		    var last = '';
		    if (len > 0) {
		        last = results.rows.item(0).fecha;
		    }

		    if (len == 0 & Project.IsOnLine()) {
		        $.mobile.showPageLoadingMsg();
		    }

		    $("#lista_noticias").empty();

		    for (var i = 0; i < results.rows.length; i++) {
		        $("#lista_noticias").append("<li><a><h3 class='ui-li-noticia'>" + results.rows.item(i).titulo + "<span rel='" + results.rows.item(i).id + "'>" + Project.ConvertirAFecha(results.rows.item(i).fecha) + "</span></h3></a></li>");
		    }


		    $("#lista_noticias").listview('refresh');
		    $("#lista_noticias li").unbind().bind('click', function () {
		        //TODO:Ir a la página detalle y mostrar noticia
		        openNoticia($(this).find('span').attr('rel'));
		    });
		    //Una vez cargados los datos de local, comenzamos la carga desde el servidor
		    //Si tiene conexión realizamos una llamada pasándole la fecha de la última entrada que tenemos (variable "last")    
		    if (Project.IsOnLine()) {

		        Server.Post(
		            'noticias.aspx?op=list',
		            { last: last },
		            function (data, status) {
		                if (data.length > 0) {
		                    var nList = new Array();
		                    var list = new Array();
		                    for (var i in data) {
		                        var prms = [data[i].permalink, data[i].fecha, data[i].titulo, data[i].titular, data[i].texto, data[i].imagen];
		                        BaseDeDatos.EjecutarInstruccion('INSERT INTO noticias (id, fecha, titulo, titular, texto, imagen) VALUES (?,?,?,?,?,?);', prms);
		                        nList.push(new Articulo(data[i].permalink, data[i].fecha, data[i].titulo, data[i].titular, data[i].texto, data[i].imagen));
		                    }
		                    nList.reverse();
		                    list = list.concat(nList);

		                    fnCallBack(list);
		                }
		                $.mobile.hidePageLoadingMsg();
		            },
		            function (a, b, c) {
		                //fnCallBack(list);
		                $.mobile.hidePageLoadingMsg();
		            });
		        //Si tenemos entradas que cargar, las cargamos al principio. El orden de las entradas debe ser "fecha DESC"
		        //Si tenemos mas de 100 entradas borramos las viejas...
		    }
		},
        function () {
        }
	);

    $.mobile.hidePageLoadingMsg();
});
                            



/** VARIABLES Y FUNCIONES COMUNES AL PROYECTO **/

var Articulo = function (id, fecha, titulo, titular, texto, imagen) {
    this.id = id,
    this.fecha = fecha;
    this.titulo = titulo;
    this.titular = titular;
    this.texto = texto;
    this.imagen = imagen;
}

var Torneo = function (id, fecha_ini, fecha_fin, fecha_insc_ini, fecha_insc_fin, nombre, descripcion, club, importe, modalidad) {
    this.id = id;
    this.fecha_ini = fecha_ini;
    this.fecha_fin = fecha_fin;
    this.fecha_insc_ini = fecha_insc_ini;
    this.fecha_insc_fin = fecha_insc_fin;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.club = club;
    this.importe = importe;
    this.modalidad = modalidad;
}

var Project = {

    DOMAIN: "http://golf.nectodigital.es/",    
    BASEURLIMAGES: "http://www.fggolf.com/upload/noticias/dest/",
    BASEURLTORNEO: "http://www.fggolf.com/torneos/{permalink}.aspx",

    AJAXTIMEOUT: 30000,

    LoadUrl: function (url) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
            navigator.app.loadUrl(url);
        else
            window.location.href = url;
    },
    Alert: function (msg, title) {
        if (typeof navigator.notification != "undefined"
				&& typeof navigator.notification.alert != "undefined")
            navigator.notification.alert(msg, null, (title ? title : null));
        else
            alert((title ? title + " -> " : "") + msg);
    },
    Confirm: function (fnCallBack, msg, title) {
        if (typeof navigator.notification != "undefined"
				&& typeof navigator.notification.confirm != "undefined")
            navigator.notification.confirm(msg, function (btn) {
                fnCallBack(btn === 1);
            }, (title ? title : null));
        else
            fnCallBack(confirm((title ? title + " -> " : "") + msg));
    },
    IsOnLine: function () {
        var isOnLine = false;
        if (typeof navigator != "undefined"
				&& typeof navigator.network != "undefined"
				&& typeof navigator.network.connection != "undefined"
				&& typeof navigator.network.connection.type != "undefined"
				&& typeof Connection != "undefined") {
            isOnLine = (navigator.network.connection.type != Connection.NONE);
        } else {
            isOnLine = navigator.onLine;
            //isOnLine = false; 
        }

        return isOnLine;
    },
    DocumentReady: function (fnCallBack) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
            document.addEventListener("deviceready", fnCallBack, false);
        else
            $(document).ready(fnCallBack);
    },
    ConvertirAFecha: function (numero) {
        var str = numero.toString();
        return str.substring(6, 8) + "/" + str.substring(4, 6) + "/"
				+ str.substring(0, 4);
    },
    AddZerosBefore: function (numero, nChars) {
        var str = numero.toString();
        var len = (nChars - str.length);
        for (var i = 0; i < len; i++) {
            str = "0" + str;
        }
        return str;
    },
    FechaBorrado: function () {
        var diasAtras = 120; // 4 meses atras
        var d = new Date();
        d.setDate((d.getDate() - diasAtras));

        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        return year + "" + Project.AddZerosBefore(month, 2) + ""
				+ Project.AddZerosBefore(day, 2);
    },
    UrlDecode: function (str) {
        return decodeURIComponent((str + '').replace(/\+/g, '%20'));
    },
    ParametersGetToJSON: function (data) {
        data = data.replace(/&/gi, '",');
        data = data.replace(/=/gi, ':"');
        data = 'var JSON = {' + data + '"} ; ';
        eval(data);
        var data = eval('JSON');
        for (var key in data) {
            data[key] = Project.UrlDecode(data[key]);
        }

        return data;
    },
    ParseInt: function (valor) {
        var res = parseInt(valor, 10);
        if ((typeof res !== "undefined") && (typeof res == "number")
				&& (!isNaN(res)))
            return res;
        else
            return 0;
    },
    ParseFloat: function (valor) {
        if (typeof valor !== "undefined") {
            var res = parseFloat(valor.toString().replace(",", "."));
            if ((typeof res !== "undefined") && (typeof res == "number")
					&& (!isNaN(res)))
                return res;
            else
                return 0;
        } else
            return 0;
    },
    // Retorna: 1 = NIF ok, 2 = CIF ok, 3 = NIE ok, -1 = NIF error, -2 = CIF
    // error, -3 = NIE error, 0 = ??? error
    ValidaNifCifNie: function (a) {
        var temp = a.toUpperCase();
        var cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE";

        if (temp !== '') {
            // si no tiene un formato valido devuelve error
            if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/
					.test(temp))
					&& !/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
                return 0;
            }

            // comprobacion de NIFs estandar
            if (/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
                posicion = a.substring(8, 0) % 23;
                letra = cadenadni.charAt(posicion);
                var letradni = temp.charAt(8);
                if (letra == letradni) {
                    return 1;
                } else {
                    return -1;
                }
            }

            // algoritmo para comprobacion de codigos tipo CIF
            suma = parseInt(a[2], 10) + parseInt(a[4], 10) + parseInt(a[6], 10);
            for (i = 1; i < 8; i += 2) {
                temp1 = 2 * parseInt(a[i], 10);
                temp1 += '';
                temp1 = temp1.substring(0, 1);
                temp2 = 2 * parseInt(a[i], 10);
                temp2 += '';
                temp2 = temp2.substring(1, 2);
                if (temp2 == '') {
                    temp2 = '0';
                }

                suma += (parseInt(temp1, 10) + parseInt(temp2, 10));
            }
            suma += '';
            n = 10 - parseInt(suma.substring(suma.length - 1, suma.length), 10);

            // comprobacion de NIFs especiales (se calculan como CIFs)
            if (/^[KLM]{1}/.test(temp)) {
                if (a[8] == String.fromCharCode(64 + n)) {
                    return 1;
                } else {
                    return -1;
                }
            }

            // comprobacion de CIFs
            if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp)) {
                temp = n + '';
                if (($.browser.msie && $.browser.version < 8)
						|| a[8] == String.fromCharCode(64 + n)
						|| a[8] == parseInt(temp.substring(temp.length - 1,
								temp.length), 10)) {
                    return 2;
                } else {
                    return -2;
                }
            }

            // comprobacion de NIEs
            // T
            if (/^[T]{1}/.test(temp)) {
                if (a[8] == /^[T]{1}[A-Z0-9]{8}$/.test(temp)) {
                    return 3;
                } else {
                    return -3;
                }
            }

            // XYZ
            if (/^[XYZ]{1}/.test(temp)) {
                pos = str_replace(['X', 'Y', 'Z'], ['0', '1', '2'], temp)
						.substring(0, 8) % 23;
                if (a[8] == cadenadni.substring(pos, pos + 1)) {
                    return 3;
                } else {
                    return -3;
                }
            }
        }

        return 0;
    }

};
 

/** implementa jQuery.validator  **/
if(typeof jQuery.validator != "undefined"){
	
	$.extend($.validator, {
		messages: {
			required: "Debes rellenar este campo.",
			remote: "Por favor, corrije este campo.",
			email: "Por favor, introduce una dirección válida de correo electrónico.",
			url: "Por favor, introduce una URL válida.",
			date: "Por favor, introduce una fecha válida.",
			dateISO: "Por favor, introduce una fecha válida (ISO).",
			number: "Por favor, introduce un número válido.",
			digits: "Por favor, introduce sólo dígitos.",
			creditcard: "Por favor, introduce un número de tarjeta de crédito válida.",
			equalTo: "Por favor, introduce el mismo valor que una vez más.",
			accept: "Por favor, introduce un valor con una extensión válida.",
			maxlength: $.validator.format("Por favor, introduce no más de {0} caracteres."),
			minlength: $.validator.format("Por favor, introduce al menos {0} caracteres."),
			rangelength: $.validator.format("Por favor, introduce un valor entre {0} y {1} caracteres."),
			range: $.validator.format("Por favor, introduce un valor entre {0} y {1}."),
			max: $.validator.format("Por favor, introduce un valor menor o igual a {0}."),
			min: $.validator.format("Por favor, introduce un valor mayor o igual a {0}.")
		}
	});

	jQuery.validator.addMethod("validaNifCifNie", function(value, element){
		if( Project.ValidaNifCifNie(value) > 0 )
			return true;
		else 
			return this.optional(element);
	}, "Debes introducir un cif, nif o nie válido y sin guiones.");
     	 
	jQuery.validator.addMethod("validaFecha", function(value, element){ 
		return this.optional(element) || /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/.test(value);
	}, "Por favor, introduce una fecha válida.");
     
	jQuery.validator.addMethod("noLoggedUser", function (value, element) {
	    if (window.localStorage.getItem("usuario")) {
	        if (window.localStorage.getItem("usuario") != $.trim(value).toLowerCase())
	            return true;
	        else
	            return this.optional(element);
	    }
	}, "No puedes modificar tus própios permisos.");
}

/* SERVER */
var Server = {};
Server.Post = function(pagina,datos,fnSuccess,fnError) {	
	     			
	if(Project.IsOnLine())
	{		
		var sURL = Project.DOMAIN+pagina;						
		$.ajax({
              	url: sURL,
              	type: 'POST',
              	dataType: 'jsonp',
              	data:datos,
              	callbackParameter: 'callback',
              	timeout: Project.AJAXTIMEOUT,
              	success: fnSuccess,
                error: fnError
		});
	}
	else
		fnError(null,'error','Internet connection not available');	
};

Server.GetLicencia = function () {
    if (window.localStorage && window.localStorage.getItem("licencia"))
        return window.localStorage.getItem("licencia");
    else
        return "";
}

Server.GetHandicapCache = function () {
    if (window.localStorage && window.localStorage.getItem("handicap"))
        return window.localStorage.getItem("handicap");
    else
        return "";
}

/** BASE DE DATOS**/
var BaseDeDatos = {};

BaseDeDatos.GetDatabase = function() {  
	return window.openDatabase("Fggolf","1.0","FgGolf App", 200000);
};

BaseDeDatos.PrepareBD = function () {
    //Comprobamos que la BBDD está creada
    var db = this.GetDatabase();
    db.transaction(
    	function (tx) {
    	    //tx.executeSql('DROP TABLE IF EXISTS torneos;');
    	    //tx.executeSql('DROP TABLE IF EXISTS noticias;');

    	    //--- TORNEOS
            tx.executeSql('CREATE TABLE IF NOT EXISTS torneos(id,fecha_ini,fecha_fin,fecha_insc_ini,fecha_insc_fin,nombre,descripcion,club,importe,modalidad);');    	    
    	    //--- NOTICIAS ---    	    
    	    tx.executeSql('CREATE TABLE IF NOT EXISTS noticias (id,fecha,titulo,titular,texto,imagen);');
    	},
    	function (tx, err) {
    	    Project.Alert('No se ha logrado conectar con la base de datos:' + err);
    	},
		function () {
		}
	);
};
 
BaseDeDatos.EjecutarInstruccion = function (sql,params) {
	var db = this.GetDatabase();
	db.transaction(
		function(tx) {
			tx.executeSql(
				sql, 
				params, 
				null, 
				function(tx,err){ 
		    		Project.Alert('Error 0 al ejecutar instrucción en la base de datos: ' + err+' -- '+sql);
		    		console.log(err);
		    		console.log(sql);
    				return false;
				}
			);
		},
		function(tx,err) { 
    		Project.Alert('Error 1 al ejecutar instrucción en la base de datos:' + err);
    		console.log(err);
    		return false;
		}
	);
};

BaseDeDatos.ObtenerDataTable = function (sql,callback) {
	var db = this.GetDatabase();
	db.transaction(
		function(tx) {
			tx.executeSql(
				sql, 
				[], 
				callback, 
				function(tx,err){ 
		    		Project.Alert('Error al consultar la base de datos: ' + tx + ' -- Codigo: ' + err.code + ' -- Mensaje: ' + err.message);
				}
			);
		},
		function(tx,err) { 
    		Project.Alert('Error al consultar la base de datos: ' + tx.code + ' -- ' + tx.message + ' -- ' + err + ' -- ' + sql );
		}
	);
};


﻿Project.DocumentReady(function () {
    $("input[type='text']").focus(function () {
        if ($(this).val() == $(this).attr("rel"))
            $(this).val("");
    });
    $("input[type='text']").focusout(function () {
        if ($(this).val() == "")
            $(this).val($(this).attr("rel"));
    });
    //Aplicando el hide directamente a busqueda_licencia no vuelve a mostrarlo
    $("#busqueda_licencia > div").hide();

    //Inicializamos el campo nº licencia con el dato que tenemos almacenado en local
    if (Server.GetLicencia() != "")
        $("#num_licencia").val(Server.GetLicencia());

    $('div').live('pageshow', function (event, ui) {
        if ($.mobile.activePage.attr('id') == "busqueda_licencia") {
            //            $("#busqueda_licencia > div").hide();
            $.mobile.showPageLoadingMsg();
            //Comprobamos si tenemos conexión. Si no tenemos conexión, lanzamos un mensaje de que la necesitamos para este paso...
            if (Project.IsOnLine()) {
                var datos = {};
                var txtLicencia = $("#num_licencia");
                if ((txtLicencia.val() != txtLicencia.attr("rel")) && (txtLicencia.val() != "")) {//Si la petición es por nº de licencia llamamos directamente a handicap
                    datos.licencia = $("#num_licencia").val();
                    Server.Post(
                    'handicap.aspx',
                    datos,
                    function (data, status) {
                        $.mobile.hidePageLoadingMsg();
                        $("#busqueda_licencia > div").show();
                        if ((data.length == 1) && (data[0].cod_resultado == "OK")) {
                            window.localStorage.setItem("licencia", $("#num_licencia").val());
                            window.localStorage.setItem("handicap", data[0].handicap);
                            window.location.href = "index.html";
                        }
                        else
                            Project.Alert('No se ha podido completar la búsqueda solicitada. Código Index1001.', 'Búsqueda no completada.');
                    },
                    function (a, b, c) {
                        $.mobile.hidePageLoadingMsg();
                        $("#busqueda_licencia > div").show();
                        Project.Alert('No se ha podido completar la búsqueda solicitada. Código Index1002.', 'Búsqueda no completada.');
                    });
                }
                else {//Si la petición es por nombre y apellidos realizamos una búsqueda para saber su licencia
                    datos.nombre = $("#nombre").val() == $("#nombre").attr("rel") ? "" : $("#nombre").val();
                    datos.apellido1 = $("#apellido1").val() == $("#apellido1").attr("rel") ? "" : $("#apellido1").val();
                    datos.apellido2 = $("#apellido2").val() == $("#apellido2").attr("rel") ? "" : $("#apellido2").val();
                    //Comprobamos que al menos nombre y apellido1 tengan datos.
                    if ((datos.nombre != "") && (datos.nombre != $("#nombre").attr("rel")) && (datos.apellido1 != "") && (datos.apellido1 != $("#apellido1").attr("rel"))) {                        
                        Server.Post(
                            'licencia.aspx',
                            datos,
                            function (data, status) {
                                $.mobile.hidePageLoadingMsg();
                                $("#busqueda_licencia > div").show();                                
                                if ((data.length > 0) && (data[0].cod_resultado == "OK")) {
                                    $("#lista_usuarios").empty();
                                    for (var i in data) {
                                        $("#lista_usuarios").append("<li><a href='#'>" + data[i].nombre + " " + data[i].apellido1 + " " + data[i].apellido2 + " <span class='ui-li-count' rel='" + data[i].handicap + "' >" + data[i].licencia + "</span></a></li>");
                                    }
                                    $("#lista_usuarios").listview('refresh');
                                    $("#lista_usuarios li").unbind().bind('click', function () {
                                        window.localStorage.setItem("licencia", $(this).find('span').html());
                                        window.localStorage.setItem("handicap", $(this).find('span').attr('rel'));
                                        window.location.href = "index.html";
                                    });
                                }
                                else {
                                    $.mobile.hidePageLoadingMsg();
                                    $("#busqueda_licencia > div").show();
                                    Project.Alert('No se han encontrado resultados con la búsqueda realizada.', 'Búsqueda no completada.');
                                    window.location.href = "licencia.html";
                                }
                            },
                            function (a, b, c) {
                                $.mobile.hidePageLoadingMsg();
                                $("#busqueda_licencia > div").show();
                                Project.Alert('No se ha podido completar la búsqueda solicitada.  Código Index1004.', 'Búsqueda no completada.');
                            });
                    }
                    else {
                        $.mobile.hidePageLoadingMsg();
                        $("#busqueda_licencia > div").show();
                        Project.Alert('Es necesario indicar su número de licencia o su nombre y apellidos para realizar la búsqueda.  Código Index1005.', 'Búsqueda no completada.');
                        window.location.href = "licencia.html";
                    }
                }
            }
            else {
                $.mobile.hidePageLoadingMsg();
                $("#busqueda_licencia > div").show();
                Project.Alert('Es necesario estar conectado a internet para realizar la consulta de handicap. Código Index1003.', 'Búsqueda no completada.');
            }
        }
    });
});

﻿Project.DocumentReady(function () {

    var fnCallBack = function (list) {
        if (list.length == 0) { addNoItems(); }
        else {
            $("#lista_torneos").empty();
            for (var i in list) {
                $("#lista_torneos").prepend("<li><a><h3 class='ui-li-torneo'>" + list[i].nombre + "<span rel='" + list[i].id + "'>" + Project.ConvertirAFecha(list[i].fecha_ini) + "</span></h3><span class='ui-li-count'>ir a fggolf.com</span></a></li>");
            }
            $("#lista_torneos").listview('refresh');
            $("#lista_torneos li").unbind().bind('click', function () {
                openTorneo($(this).find('span').attr('rel'));
            });
        }
    }

    function openTorneo(permalink) {
        location.href = Project.BASEURLTORNEO.replace("{permalink}", permalink);
    }

    function addNoItems() {
        $("#lista_torneos").empty();
        $("#lista_torneos").append("<li><h3 class='ui-li-torneo'>No hay ningún torneo disponible de momento.</h3></li>");
        $("#lista_torneos").listview('refresh');
    }
    
    BaseDeDatos.ObtenerDataTable(
    	"SELECT id,fecha_ini,fecha_fin,fecha_insc_ini,fecha_insc_fin,nombre,descripcion,club,importe,modalidad FROM torneos ORDER BY fecha_ini ASC;",
		function (tx, results) {
		    
		    var len = results.rows.length;

		    if (len == 0 & Project.IsOnLine()) {
		        $.mobile.showPageLoadingMsg();
		    }

		    //Si no tengo resultados y no tengo conexión a Internet le pongo la etiqueta de no Items
		    if (len == 0 & !Project.IsOnLine) {
		        addNoItems();
		        $.mobile.hidePageLoadingMsg();
		    } else {
		        $("#lista_torneos").empty();

		        var numElements = results.rows.length;
		        var ano = 0;
		        for (var i = 0; i < results.rows.length; i++) {
		            if (i == 0) {		                
		                ano = parseInt(results.rows.item(i).fecha_ini.toString().substring(0, 4));
		            }
		            $("#lista_torneos").append("<li><a><h3 class='ui-li-torneo'>" + results.rows.item(i).nombre + "<span rel='" + results.rows.item(i).id + "'>" + Project.ConvertirAFecha(results.rows.item(i).fecha_ini) + "</span></h3><span class='ui-li-count'>ir a fggolf.com</span></a></li>");
		        }

		        $("#lista_torneos").listview('refresh');
		        $("#lista_torneos li").unbind().bind('click', function () {
		            openTorneo($(this).find('span').attr('rel'));
		        });

		        //Una vez cargados los datos de local, comenzamos la carga desde el servidor
		        //Si tiene conexión realizamos una llamada pasándole la fecha de la última entrada que tenemos (variable "last")    
		        if (Project.IsOnLine()) {

		            Server.Post(
		                'torneos.aspx?op=list',
		                { year: '' },
		                function (data, status) {
		                    var ano_server = 0;
		                    if (data.length > 0) {
		                        ano_server = parseInt(data[0].fecha_ini.toString().substring(0, 4));
		                    }
		                    

		                    if ((data.length != numElements) || (ano != ano_server)) {
		                        BaseDeDatos.EjecutarInstruccion('DELETE FROM torneos;');

		                        var nList = new Array();
		                        //var list = new Array();
		                        for (var i in data) {
		                            var prms = [data[i].permalink, data[i].fecha_ini, data[i].fecha_fin, data[i].fecha_inscripcion_ini, data[i].fecha_inscripcion_fin, data[i].nombre, data[i].descripcion, data[i].club, data[i].importe, data[i].modalidad];
		                            BaseDeDatos.EjecutarInstruccion('INSERT INTO torneos (id,fecha_ini,fecha_fin,fecha_insc_ini,fecha_insc_fin,nombre,descripcion,club,importe,modalidad) VALUES (?,?,?,?,?,?,?,?,?,?);', prms);
		                            nList.push(new Torneo(data[i].permalink, data[i].fecha_ini, data[i].fecha_fin, data[i].fecha_inscripcion_ini, data[i].fecha_inscripcion_fin, data[i].nombre, data[i].descripcion, data[i].club, data[i].importe, data[i].modalidad));
		                        }

		                        //		            nList.reverse();
		                        //		            list = list.concat(nList);

		                        fnCallBack(nList);
		                    }
		                    $.mobile.hidePageLoadingMsg();
		                },
		                function (a, b, c) {
		                    //fnCallBack(list);
		                    $.mobile.hidePageLoadingMsg();
		                });
		            //Si tenemos entradas que cargar, las cargamos al principio. El orden de las entradas debe ser "fecha DESC"
		            //Si tenemos mas de 100 entradas borramos las viejas...
		        }
		    }            
		},
        function (a, b, c) {
            Project.Alert('No se ha podido mostrar los torneos.', 'Torneos');
            $.mobile.hidePageLoadingMsg();
    });

    $.mobile.hidePageLoadingMsg();

});
