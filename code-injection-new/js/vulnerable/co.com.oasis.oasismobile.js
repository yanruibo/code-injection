

			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		





































        	$('#login').hide();
            app.initialize();
        

/*
 * zoom-producto.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script para la vista dinámica de selección de productos
 * 
 */

var paginaActualProducto = 1;
var campoIDProductoActual;
var campoNombreProductoActual;
var campoPrecioProductoActual;
var paginaProductoDesdeActual;
var nombreBusquedaProducto = '';

var zoomProductos = function(campoIDProducto, campoNombreProducto, campoPrecioProducto, paginaDesde) {
	$("#zoom-producto-search").val('');
	campoIDProductoActual = campoIDProducto;
	campoNombreProductoActual = campoNombreProducto;
	campoPrecioProductoActual = campoPrecioProducto;
	paginaProductoDesdeActual = paginaDesde;
	listarProductos(paginaActualProducto, '', true);
}

$("#zoom-producto-search").keyup(function(e) {
	bloquearEvento(e);
	nombreBusquedaProducto = $(this).val();
	paginaActualProducto = 1;
	listarProductos(paginaActualProducto, nombreBusquedaProducto, false);
});

$("#zoom-producto-prev").click(function(e) {
	bloquearEvento(e);
	paginaActualProducto--;
	listarProductos(paginaActualProducto, nombreBusquedaProducto, false);
});

$("#zoom-producto-next").click(function(e) {
	bloquearEvento(e);
	paginaActualProducto++;
	listarProductos(paginaActualProducto, nombreBusquedaProducto, false);
});

var listarProductos = function(noPagina, nombre, mostrarVista) {
	if (noPagina == 1) 
		$("#zoom-producto-prev").css('visibility', 'hidden');
	else 
		$("#zoom-producto-prev").css('visibility', 'visible');
		
	oasisConsultaProductos(0, noPagina, nombre, function(resultados) {
		if (resultados.length > 0) {
			$('#producto-nombre').empty();
			$('#zoom-producto-list li').remove();
			$.each(resultados, function(index, resultado) {
				$('#zoom-producto-list').append("<li>"+
											   	"<label>"+
												"<input type='radio' name='input-producto' precio='"+resultado['precio']+"' text='"+resultado['nombre']+"' id='"+resultado['codigo']+"' class='custom' data-mini='true' />"+
											    "COD: <span style='font-weight:normal;'>"+resultado['codigo']+"</span><br />"+
											    "<span style='font-weight:normal;'>"+resultado['nombre']+"</span><br />"+
											    "PRECIO: <span style='font-weight:normal;'>"+resultado['precio']+"</span>"+
											    "</label>"+
										    	"</li>");
			});
			actualizarOpcionesProductos(mostrarVista);
		} 
	});
}

var actualizarOpcionesProductos = function(mostrarVista) {
	// Hacemos que la selección esté orientada a la página de donde llamamos al zoom
	$('#zoom-producto-list li label input:radio').change(function() {
		if ($(this).is(':checked')) {
    		$.mobile.showPageLoadingMsg();
        	$(campoIDProductoActual).val($(this).attr('id'));
        	$(campoNombreProductoActual).html('<br />'+$(this).attr('text'));
        	$(campoPrecioProductoActual).val($(this).attr('precio'));
        	setTimeout(function() {
				pagina(paginaProductoDesdeActual, "slide", true);
				$.mobile.hidePageLoadingMsg();
			}, 500);
    	}
	});
	$('#zoom-producto-list li').trigger('create');
	if (mostrarVista) 
		pagina("#zoom-producto", "slide", false);
	else 
		$.mobile.silentScroll(0);
	$('#zoom-producto-list').listview('refresh');
}

/*
 * ffcv.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la consulta FFVC
 * 
 */

var ffcvAno;
var ffcvMes;
var ffcvCacheDetalle = false;

var consultaFFCV = function(ano, mes, tipo) {
	if (tipo && tipo == 'D') {
		$('#ffcv_detalle_list li').remove();
		oasisConsultaFFCV(ano, mes, tipo, function(resultados) {
			if (resultados.length == 0) 
				$('#ffcv_detalle_list').append('<li>NO HAY RESULTADOS PARA MOSTRAR</li>');
			else {
				$.each(resultados, function(index, resultado) {
					$('#ffcv_detalle_list').append('<li>' +
                                          		   'DOCUMENTO: <span style="float: right; font-weight: normal;">' + resultado["documento"] + '</span><br />' +
                                          		   'NUMERO: <span style="float: right; font-weight: normal;">' + resultado["numero"] + '</span><br />' +
                                          		   'UBICACION: <span style="float: right; font-weight: normal;">' + resultado["ubicacion"] + '</span><br />' +
                                          		   'FECHA: <span style="float: right; font-weight: normal;">' + resultado["fecha"].substring(0, 10) + '</span><br />' +
                                          		   'TOTAL: <span style="float: right; font-weight: normal;">' + formato(resultado["total"]) + '</span><br />' +
                                          		   '</li>');
				});
			}
			$('#ffcv_detalle_list').listview('refresh');
			ffcvCacheDetalle = true;
		});
	} 
	else {
		// Buscamos los totales generales y pasamos a la página de resultado
		oasisConsultaFFCV(ano, mes, tipo, function(resultados) {
    		// En el listener pintamos o hacemos lo que debamos con el resultado
        	$('#ffcv_control_monedas').empty();
        	$('#ffcv_resultado_list li').remove();
        	if (resultados.length == 0) {
            	$('#ffcv_control_monedas').append('<h4>NO HAY RESULTADOS PARA MOSTRAR EN ESTE PERIODO</h4>');
            	$('#ffcv_detalle').css('visibility', 'hidden');
            	$('#ffcv_control_monedas').trigger('create');
            	pagina("#ffcv-resultado", "slide", false);
        	}
        	else {
        		$('#ffcv_detalle').css('visibility', 'visible');
            	var monedas = new Array();
            	$.each(resultados, function(index, resultado) {
                	monedaActual = parseInt(resultado["moneda"]);
                	if (jQuery.inArray(monedaActual, monedas) < 0) {
                    	if (monedaActual == 0)
                        	$('#ffcv_control_monedas').append('<a href="#" data-role="button">COP</a>');
                    	else if (monedaActual == 1)
                        	$('#ffcv_control_monedas').append('<a href="#" data-role="button">USD</a>');
                    	else if (monedaActual == 2)
                        	$('#ffcv_control_monedas').append('<a href="#" data-role="button">EUR</a>');
                    	monedas[monedas.length] = monedaActual;
                	}
            	});
            	$('#ffcv_control_monedas').append('<br /><br />');           
            	$("#ffcv_control_monedas a").click(function() {
                	refrescarResultadosFFCV(resultados, $(this).index());
            	});
            	$('#ffcv_control_monedas').trigger('create');
            	pagina("#ffcv-resultado", "slide", false);     
            	refrescarResultadosFFCV(resultados, monedas[0]);
        	}
    	});
	}
}

var refrescarResultadosFFCV = function(listaResultados, monedaAMostrar) {
	$('#ffcv_resultado_list li').remove();
    $.each(listaResultados, function(index, resultado) {
        monedaActual = parseInt(resultado["moneda"]);
        if (monedaActual == monedaAMostrar) {
           $('#ffcv_resultado_list').append('<li>' +
                                          'BRUTO: <span style="float: right; font-weight: normal;">' + formato(resultado["bruto"]) + '</span><br />' +
                                          'IVA: <span style="float: right; font-weight: normal;">' + formato(resultado["iva"]) + '</span><br />' +
                                          'DESCUENTO: <span style="float: right; font-weight: normal;">' + formato(resultado["descuento"]) + '</span><br />' +
                                          'CANTIDAD: <span style="float: right; font-weight: normal;">' + formato(resultado["cantidad"]) + '</span><br />' +
                                          'SUBTOTAL: <span style="float: right; font-weight: normal;">' + formato(resultado["subtotal"]) + '</span><br />' +
                                          '</li>' +
                                          '<li>TOTAL: <span style="float: right; font-weight: normal;">' + formato(resultado["total"]) + '</span><br />' +
                                          '</li>');
        }
    });
    $('#ffcv_resultado_list').listview('refresh');
}

$("#ffcv_btn_mes_actual").click(function(e) {
	bloquearEvento(e);
	ffcvAno = new Date().getFullYear();
    ffcvMes = new Date().getMonth() + 1;
    consultaFFCV(ffcvAno.toString(), ffcvMes.toString(), '');
});

$("#ffcv_btn_buscar").click(function(e) {
	bloquearEvento(e);
    ffcvAno = $("#ffcv_ano").val();
    ffcvMes = $("#ffcv_periodo").val();
	if (ffcvAno && ffcvAno != '' && ffcvMes && ffcvMes != '') 
		consultaFFCV(ffcvAno.toString(), ffcvMes.toString(), '');
	else 
		dialogo("FFCV", "Digite los datos para la consulta", "Aceptar", function () {});
});

$("#ffcv_btn_back").click(function(e) {
	bloquearEvento(e);
	ffcvCacheDetalle = false;
	$("#ffcv_detalle").trigger('collapse');
	pagina("#ffcv", "slide", true);
});

$('#ffcv_detalle').bind('expand', function(event, ui) {
    if (!ffcvCacheDetalle) 
    	consultaFFCV(ffcvAno.toString(), ffcvMes.toString(), 'D');
});

/*
 * issa.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la consulta ISSA
 * 
 */

var issaCodigo;
var issaCacheDetalle = false;
 
var consultaISSA = function(codigo, tipo) {
	if (tipo && tipo == 'D') {
		$('#issa_detalle').show();
		$('#issa_detalle_list li').remove();
		oasisConsultaISSA(codigo, tipo, function(resultados) {
			if (resultados.length == 0) 
				$('#issa_detalle_list').append('<li>NO HAY RESULTADOS PARA MOSTRAR</li>');
			else {
				$.each(resultados, function(index, resultado) {
					$('#issa_detalle_list').append('<li>' +
                                          		   'BODEGA: <span style="float: right; font-weight: normal;">' + resultado["bodega_id"] + '</span><br />' +
                                          		   'SALDO: <span style="float: right; font-weight: normal;">' + formato(resultado["saldo"]) + '</span><br />' +
                                          		   '</li>');
				});
			}
			$('#issa_detalle_list').listview('refresh');
			issaCacheDetalle = true;
		});
	} 
	else {
		oasisConsultaISSA(codigo, tipo, function(resultados) {
        	$('#issa_resultado_list li').remove();
        	if (resultados.length == 0) 
        		$('#issa_resultado_list').append('<li>NO HAY RESULTADOS QUE MOSTRAR PARA ESTE PRODUCTO</li>');
        	else {
    			$.each(resultados, function(index, resultado) {
    				$('#issa_resultado_list').append('<li>SALDO TOTAL: <span style="float: right;">' + formato(resultado["saldo"]) + '</span></li>');
    			});
        	}
        	pagina("#issa-resultado", "slide", false);
        	$('#issa_resultado_list').listview('refresh');
    	});	
	}
}

$("#issa-btn-buscar-producto").click(function(e) {
	bloquearEvento(e);
	zoomProductos('#issa_codigo', '#issa-producto-nombre', '', '#issa');
});

$("#issa_btn_consultar").click(function(e) {
	bloquearEvento(e);
	issaCodigo = $("#issa_codigo").val();
	$('#issa-resultado-producto-nombre').html('');
	if (issaCodigo && issaCodigo != '') {
		// Siempre buscamos de nuevo al producto para validar que el código en el input
		// coincida con el nombre, aún si fue cambiado manualmente
		oasisConsultaProductos(issaCodigo, '', '', function(resultados) {
			if (resultados.length > 0 && resultados[0]['nombre'] && resultados[0]['nombre'] != '') {
				$('#issa-resultado-producto-nombre').html(resultados[0]['nombre']);
				consultaISSA(issaCodigo, '');
			}
			else
				dialogo("ISSA", "No se encuentra el ID de producto digitado", "Aceptar", function () {});
		});
	} 
	else 
		dialogo("ISSA", "Digite el dato para la consulta", "Aceptar", function () {});
});

$("#issa_btn_scanner").click(function(e) {
	bloquearEvento(e);
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	if (iOS) {
		window.plugins.barcodeScanner.scan(
    		function(result) {
        		if (result.cancelled) {
        			// Si tenemos items escaneados vamos a la pantalla de resultados, 
        			// de otro modo volvemos a la pantalla de ISSA
        			if (result.text && result.text != '') {
        				var itemsEscaneados = result.text.split(',');
        				var itemsContados = conteo(itemsEscaneados);
        				$('#issa_detalle').hide();
        				$('#issa_resultado_list li').remove();
        				for (var i = 0; i < itemsContados[0].length; i++) {
        					$('#issa_resultado_list').append('<li>PROD: '+ itemsContados[0][i] +'<span style="float: right;">' + itemsContados[1][i] + '</span></li>');
        				}
        				pagina("#issa-resultado", "none", false);
        				$('#issa_resultado_list').listview('refresh');
        			}
        		}
    		},
    		function(error) {
    			dialogo("ISSA", "El proceso de escaneo ha fallado. Estado: " + error, "Aceptar", function () {});
    		}
		);
	} 
	else {
		dialogo("ISSA", "Por el momento esta funcion solo esta disponible para iPhone y iPad", "Aceptar", function () {});
	}
});

$("#issa_btn_back").click(function(e) {
	bloquearEvento(e);
	issaCacheDetalle = false;
	$("#issa_detalle").trigger('collapse');
	pagina("#issa", "slide", true);
});

$('#issa_detalle').on('expand', function(event, ui) {
    if (!issaCacheDetalle) 
    	consultaISSA(issaCodigo, 'D');
});

var menuStatus;
var offset = $(window).width() - ($(window).width() * 0.2) + "px";
var delay = 300;
var $menu = '';

var toggleMenu = function() {
	if ($menu.length == 0) 
		$menu = $("body #menu");
    if (menuStatus != true) {
        $menu.css("display", "block");
        $menu.scrollTop(0);
        $.mobile.activePage.animate({
        	marginLeft: offset,
        }, delay, function () {
            menuStatus = true;
        });
        return false;
    } else {
        $.mobile.activePage.animate({
            marginLeft: "0px",
        }, delay, function () {
            menuStatus = false;
            $menu.css("display", "none");
        });
        return false;
    }
}

var openMenu = function() {
	if ($menu.length == 0) 
		$menu = $("body #menu");
    if (!menuStatus) {
        $menu.css("display", "block");
        $menu.scrollTop(0);
        $.mobile.activePage.animate({
            marginLeft: offset,
        }, delay, function () {
            menuStatus = true;
        });
    }
}

var closeMenu = function() {
	if ($menu.length == 0) 
		$menu = $("body #menu");
    if (menuStatus) {   
        $.mobile.activePage.animate({
            marginLeft: "0px",
        }, delay, function () {
            menuStatus = false;
            $menu.css("display", "none");
        });
    }
}

$(function () {
    $('body #menu, div[data-role="page"]').live("swipeleft swiperight", function (e) {
    	bloquearEvento(e);
    	if ($.mobile.activePage.attr("id") != 'login') {
    		if (e.type == "swipeleft") 
    			closeMenu();
    		else if (e.type == "swiperight") 
    			openMenu();
    	}
    });
 
    $('body div[data-role="page"]').bind('pagebeforeshow', function (event, ui) {
    	bloquearEvento(event);
    	if ($menu.length == 0) 
    		$menu = $("body #menu");
        menuStatus = false;
        $(this).css("margin-left", "0");
        $menu.css("display", "none");
    });
});

/*
 * ifis.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la operación de scanner IFIS
 * 
 */

var itemsInventario = new Array();

var agregarItemInventario = function(barcode, cuenta) {
	itemsInventario[itemsInventario.length] = {
		itemBarcode : barcode,
		itemCantidad : cuenta, 
		itemCodigo : '',
		itemNombre : ''
	};
	var existe = false;
	$("input[name=ifis-barcode]").each(function(i, element) {
		if (element.val().indexOf(''+barcode) >= 0) {
			var obj = $("input[name=ifis-cantidad]:eq("+i+")");
			obj.val(obj.val() + cuenta);
			existe = true;
			return false;
		}
	});
	if (!existe) {
		var markup = '<li>';
		markup += '<a href="#" onclick="void(0)">';
		markup += '<div class="ui-grid-a">';
		markup += '<div class="ui-block-a">';
		markup += '<span>BARCODE</span>';
		markup += '</div>';
		markup += '<div class="ui-block-b">';
		markup += '<input type="tel" name="ifis-barcode" data-mini="true" value="'+barcode+'" />';
		markup += '</div>';
		markup += '</div>';
		markup += '<div class="ui-grid-a">';
		markup += '<div class="ui-block-a">';
		markup += '<span>CANTIDAD</span>';
		markup += '</div>';
		markup += '<div class="ui-block-b">';
		markup += '<input type="tel" name="ifis-cantidad" data-mini="true" value="'+cuenta+'" />';
		markup += '</div>';
		markup += '</div><br />';
		markup += '<p class="ifis_prod_nombre"></p>';
		markup += '</a>';
		markup += '<a href="#" onclick="eliminarItemInventario(this)" data-iconpos="notext"></a>';
		markup += '</li>';
		$('#ifis_resultado_list').append(markup);
	}
}

var eliminarItemInventario = function(elemento) {
	var i = $(elemento).parent().index();
	itemsInventario.splice(i,1);
	$('#ifis_resultado_list li:eq('+i+')').remove();
	if (itemsInventario.length == 0) 
		$('#ifis_resultado_list').append('<li class="vacio">NO HAY ELEMENTOS DE INVENTARIO PARA ENVIAR</li>');
	$('#ifis_resultado_list').listview('refresh');
}

var actualizarItemsInventario = function() {
	var items = new Array();
	for (var i = 0; i < itemsInventario.length; i++) {
		if ($("input[name=ifis-barcode]:eq("+i+")").val() != '') {
			itemsInventario[i].itemBarcode = $("input[name=ifis-barcode]:eq("+i+")").val();
			items[items.length] = itemsInventario[i].itemBarcode;	
		} 
	}
	oasisConsultaProductosEAN(oasisGenerarXmlEAN(items), function(resultados) {
		$.each(resultados, function(index, resultado) {
			itemsInventario[index].itemCodigo = resultado["codigo"];
			itemsInventario[index].itemNombre = resultado["nombre"];
			$('p.ifis_prod_nombre:eq('+index+')').html(resultado["codigo"]+'- '+resultado["nombre"]);
		});
	});
}
 
$("#ifis_btn_agregar").click(function(e) {
	bloquearEvento(e);
	if ($('#ifis_resultado_list li:eq(0)').hasClass('vacio')) 
		$('#ifis_resultado_list li').remove();
	agregarItemInventario('', '');
	$('#ifis_resultado_list li').trigger('create');
	$('#ifis_resultado_list').listview('refresh');
});

$("#ifis_btn_scanner").click(function(e) {
	bloquearEvento(e);
	var android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	if (iOS || android) {
		window.plugins.barcodeScanner.scan(
    		function(result) {
        		if (result.cancelled) {
        			if (result.text && result.text != '') {
        				var itemsEscaneados = result.text.split(',');
        				var itemsContados = conteo(itemsEscaneados);
        				if ($('#ifis_resultado_list li:eq(0)').hasClass('vacio')) 
        					$('#ifis_resultado_list li').remove();
        				for (var i = 0; i < itemsContados[0].length; i++) {
        					agregarItemInventario(itemsContados[0][i], itemsContados[1][i]);
        				}
        				$('#ifis_resultado_list li').trigger('create');
        				$('#ifis_resultado_list').listview('refresh');
        				actualizarItemsInventario();
        			}
        		}
    		},
    		function(error) {
    			dialogo("IFIS", "El proceso de escaneo ha fallado. Estado: " + error, "Aceptar", function () {});
    		}
		);
	} 
	else {
		dialogo("IFIS", "Por el momento esta funcion solo esta disponible para iOS y Android", "Aceptar", function () {});
	}
});

$("input[name=ifis-barcode]").on('blur', function(e) {
	bloquearEvento(e);
	
	// Al editar un barcode, actualizamos la información en nuestro arreglo de items
    actualizarItemsInventario();
});

$("input[name=ifis-cantidad]").on('blur', function(e) {
	bloquearEvento(e);
	// Al editar una cantidad, actualizamos las cantidades en nuestro arreglo de items
    for (var i = 0; i < itemsInventario.length; i++) {
		itemsInventario[i].itemCantidad = $("input[name=ifis-cantidad]:eq("+i+")").val();
	}
});

$("#ifis_btn_enviar").click(function(e) {
	bloquearEvento(e);
	if (itemsInventario.length > 0) {
		var errorValidacion = false;
		for (var i = 0; i < itemsInventario.length; i++) {
			if (itemsInventario[i].itemBarcode == '' || itemsInventario[i].itemBarcode <= 0 || 
				itemsInventario[i].itemCantidad == '' || itemsInventario[i].itemCantidad <= 0 || 
				itemsInventario[i].itemCodigo == '' || itemsInventario[i].itemCodigo <= 0) {
				errorValidacion = true;
				break;
			}	
		}
		if (errorValidacion) 
			dialogo("IFIS", "Hay campos del inventario en blanco, o con valores nulos. Favor verificar", "Aceptar", function() {});
		else 
			dialogo("IFIS", "Listos para enviar "+itemsInventario.length+" items del inventario", "Aceptar", function() {});	
	} 
	else {
		dialogo("IFIS", "Debe agregar por lo menos un producto al inventario", "Aceptar", function() {});
	}
});

/*
 * pedidos.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la sección de pedidos
 * 
 */
 
var clienteID = '';
var programa = 'vped';
var productos = new Array();
 
var agregar = function() {
	var nombreProducto = $('#producto-nombre').html().replace('<br />','').replace('<br>','');
	if (nombreProducto && nombreProducto != '') {
		var productoMap = new Object();
		productoMap["producto"] = $('#producto-id').val();
		productoMap["nombre"] = nombreProducto;
		productoMap["cantidad"] = $('#cantidad').val();
		productoMap["precio"] = $('#precio').val();
    	productos[productos.length] = productoMap;
    	if (productos.length > 0) {
    		$('#badge_pedido').html(productos.length);
    		$('#badge_pedido').css('display', 'block');
    	}
    	$('#producto-nombre').empty();
		$('#producto-id').val('');
		$('#cantidad').val('');
		$('#precio').val('');
	} 
	else {
		var valorProducto = $('#producto-id').val();
		var valorCantidad = $('#cantidad').val();
		var valorPrecio = $('#precio').val();
		oasisConsultaProductos(valorProducto, '', '', function(resultados) {
			if (resultados.length > 0 && resultados[0]['nombre'] && resultados[0]['nombre'] != '') {
				var productoMap = new Object();
				productoMap["producto"] = valorProducto;
				productoMap["nombre"] = resultados[0]['nombre'];
				productoMap["cantidad"] = valorCantidad;
				productoMap["precio"] = valorPrecio;
    			productos[productos.length] = productoMap;
    			if (productos.length > 0) {
    				$('#badge_pedido').html(productos.length);
    				$('#badge_pedido').css('display', 'block');
    			} 
    			$('#producto-nombre').empty();
				$('#producto-id').val('');
				$('#cantidad').val('');
				$('#precio').val('');
			}
			else
				dialogo("PRODUCTO", "No se encuentra el ID de producto digitado", "Aceptar", function () {});
		});
	}
} 

var reestablecerPedido = function () {
	clienteID = '';
	$('#cliente-id').val('');
	$('#cliente-nombre').empty();
	$('#badge_pedido').html('');
    $('#badge_pedido').css('display', 'none');
	productos = new Array();
	pagina('#vped', "slide", true);
}

$("#btn-buscar-cliente").click(function(e) {
	bloquearEvento(e);
	zoomTerceros('#cliente-id', '#cliente-nombre', '#vped');
});

$("#btn_continuar").click(function(e) {
	bloquearEvento(e);
	clienteID = $('#cliente-id').val();
	if (clienteID && clienteID != '') {
		// Siempre buscamos de nuevo al cliente para validar que el código en el input
		// coincida con el nombre, aún si fue cambiado manualmente
		oasisConsultaTerceros(clienteID, '', '', function(resultados) {
			if (resultados.length > 0 && resultados[0]['nombre'] && resultados[0]['nombre'] != '') {
				$('#cliente-id-text').html(resultados[0]['nombre']);
				pagina('#vped-producto', "slide", false);
			}
			else
				dialogo("VPED", "No se encuentra el ID de cliente digitado", "Aceptar", function () {});
		});
	} 
	else 
		dialogo("VPED", "Digite un ID de cliente", "Aceptar", function () {});
});

$("#btn_pedidos_back").click(function(e) {
	bloquearEvento(e);
	if (productos.length > 0) {
		confirma("PEDIDOS", "Desea cancelar el pedido actual?", "Si,No", function (buttonIndex) {
			if (buttonIndex == 1) 
				reestablecerPedido();
		});
	} 
	else 
		pagina('#vped', "slide", true);
});

$("#btn-buscar-producto").click(function(e) {
	bloquearEvento(e);
	zoomProductos('#producto-id', '#producto-nombre', '#precio', '#vped-producto');
});

$("#btn_agregar").click(function(e) {
	bloquearEvento(e);
	if ($("#producto-id").val() && $("#producto-id").val() != '' && $("#cantidad").val() && $("#cantidad").val() != '' && $("#precio").val() && $("#precio").val() != '') 
		agregar();
	else 
		dialogo("PRODUCTO", "Todos los campos son requeridos", "Aceptar", function () {});
});

$("#btn_listo").click(function(e) {
	bloquearEvento(e);
	if (productos.length > 0) {
		// Si hay un producto digitado que no ha sido agregado, y se da click al botón 'listo',
		// agregamos rápidamente ese producto al pedido
		if ($("#producto-id").val() && $("#producto-id").val() != '' && $("#cantidad").val() && $("#cantidad").val() != '' && $("#precio").val() && $("#precio").val() != '') 
			agregar();
		
		pagina('#vped-resumen', "slide", false);
		$('#pedidoList').empty();
    	$.each(productos, function(index, producto) {
    		$('#pedidoList').append('<li>' +
                                	'PRODUCTO: <span style="font-weight:normal;">' + producto["nombre"] + '</span><br />' +
                                	'CANTIDAD: <span style="font-weight:normal;">' + producto["cantidad"] + '</span><br />' +
                                	'PRECIO: <span style="font-weight:normal;">' + producto["precio"] + '</span><br />' +
                                	'</li>');
            if (index == 0) {
            	$('#pedidoList').append('<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FOasisSoftware&amp;send=false&amp;layout=button_count&amp;width=300&amp;show_faces=false&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:21px;" allowTransparency="true"></iframe>');
            }
    	});
    	$('#pedidoList').listview('refresh');
	} 
	else {
		dialogo("PRODUCTO", "Debe agregar al menos un producto", "Aceptar", function() {});
	}
});

$("#btn_pedido").click(function(e) {
	bloquearEvento(e);
	oasisCreaDocumento(programa, oasisGenerarXmlPedido(clienteID, productos), function(resultados) {
		if (resultados && !isNaN(parseInt(resultados))) {
			$("#pedido-no").html(resultados);
			pagina('#vped-confirmacion', "slide", false);
		} 
		else if (isNaN(parseInt(resultados))) {
			dialogo("ERROR", "Su pedido no pudo ser procesado exitosamente. Estado: " + resultados, "Aceptar", function() {});
		}
		else {
			dialogo("ERROR", "Su pedido no pudo ser procesado exitosamente. Verifique el estado del servicio", "Aceptar", function() {});
		}	
	});
});

$("#vped_btn_ver_preliminar").click(function(e) {
	bloquearEvento(e);
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	if (iOS) {
		var root = this;
		cb = window.plugins.childBrowser;
		if(cb != null) {
			cb.onLocationChange = function(loc){ root.locChanged(loc); };
			cb.onClose = function(){root.onCloseBrowser(); };
			cb.onOpenExternal = function(){root.onOpenExternal(); };
			cb.showWebPage("http://oasisportal.oasis.com.co/oasisportal2/ayuda/prrr.pdf");
		}
	} 
	else {
		window.open("http://oasisportal.oasis.com.co/oasisportal2/ayuda/prrr.pdf", '_blank');
	}
});

$("#btn_otro_pedido").click(function(e) {
	bloquearEvento(e);
	reestablecerPedido();
});

function onCloseBrowser() {
	console.log("onCloseBrowser!");
}

function locChanged(loc) {
	console.log("locChanged!");
}

function onOpenExternal() {
	console.log("onOpenExternal!");
}

/*
 * zoom-tercero.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script para la vista dinámica de selección de terceros
 * 
 */

var paginaActualTercero = 1;
var campoIDTerceroActual;
var campoNombreTerceroActual;
var paginaTerceroDesdeActual;
var nombreBusquedaTercero = '';

var zoomTerceros = function(campoIDTercero, campoNombreTercero, paginaDesde) {
	$("#zoom-tercero-search").val('');
	campoIDTerceroActual = campoIDTercero;
	campoNombreTerceroActual = campoNombreTercero;
	paginaTerceroDesdeActual = paginaDesde;
	listarTerceros(paginaActualTercero, '', true);
}

$("#zoom-tercero-search").keyup(function(e) {
	bloquearEvento(e);
	nombreBusquedaTercero = $(this).val();
	paginaActualTercero = 1;
	listarTerceros(paginaActualTercero, nombreBusquedaTercero, false);
});

$("#zoom-tercero-prev").click(function(e) {
	bloquearEvento(e);
	paginaActualTercero--;
	listarTerceros(paginaActualTercero, nombreBusquedaTercero, false);
});

$("#zoom-tercero-next").click(function(e) {
	bloquearEvento(e);
	paginaActualTercero++;
	listarTerceros(paginaActualTercero, nombreBusquedaTercero, false);
});

var listarTerceros = function(noPagina, nombre, mostrarVista) {
	if (noPagina == 1) 
		$("#zoom-tercero-prev").css('visibility', 'hidden');
	else 
		$("#zoom-tercero-prev").css('visibility', 'visible');
		
	oasisConsultaTerceros(0, noPagina, nombre, function(resultados) {
		if (resultados.length > 0) {
			$(campoNombreTerceroActual).empty();
			$('#zoom-tercero-list li').remove();
			$.each(resultados, function(index, resultado) {
				$('#zoom-tercero-list').append("<li>"+
											   "<label>"+
											   "<input type='radio' name='input-tercero' text='"+resultado['nombre']+"' id='"+resultado['codigo']+"' class='custom' data-mini='true' />"+
											   "COD: <span style='font-weight:normal;'>"+resultado['codigo']+"</span><br />"+
											   "<span style='font-weight:normal;'>"+resultado['nombre']+"</span>"+
											   "</label>"+
											   "</li>");
			});
			actualizarOpcionesTerceros(mostrarVista);
		} 
	});
}

var actualizarOpcionesTerceros = function(mostrarVista) {
	// Hacemos que la selección esté orientada a la página de donde llamamos al zoom
	$('#zoom-tercero-list li label input:radio').change(function() {
    	if ($(this).is(':checked')) {
    		$.mobile.showPageLoadingMsg();
        	$(campoIDTerceroActual).val($(this).attr('id'));
        	$(campoNombreTerceroActual).html('<br />'+$(this).attr('text'));
        	setTimeout(function() {
				pagina(paginaTerceroDesdeActual, "slide", true);
				$.mobile.hidePageLoadingMsg();
			}, 500);
    	}
	});
	$('#zoom-tercero-list li').trigger('create');
	if (mostrarVista) 
		pagina("#zoom-tercero", "slide", false);
	else 
		$.mobile.silentScroll(0);
	$('#zoom-tercero-list').listview('refresh');
}

/*
 * copr.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la sección COPR
 * 
 */
 
$('#copr').bind('pagebeforeshow', function(event, ui) {
	bloquearEvento(event);
	oasisConsultaCOPR(0, '', function(resultados) {
 		$('#copr_list li').remove();
    	if (resultados.length == 0) 
    		$('#copr_list').append('<li>NO HAY CLIENTES CON BLOQUEOS PARA MOSTRAR</li>');
    	else {
    		$.each(resultados, function(index, resultado) {
    			var markup = '<li>';
    			markup += '<a href="#" onclick="verDetalleCOPR('+resultado['codigo']+')" style="font-size:13px;">';
    			markup += 'COD: <span style="font-weight:normal;">'+resultado['codigo']+'</span><br />';
    			markup += '<span style="font-weight:normal;">'+resultado['nombre']+'</span>';
    			markup += '</a>';
    			markup += '</li>';
    			$('#copr_list').append(markup);
    		});
    	}
    	$('#copr_list').listview('refresh');
 	});
});
 
var verDetalleCOPR = function(codigo) {
	oasisConsultaCOPR(codigo, 'D', function(resultados) {
 		$('#copr_detalle_list li').remove();
 		$('.copr_btn_liberar').css('display', 'none');
 		$('.copr_btn_devolver').css('display', 'none');
 		$('.copr_btn_rechazar').css('display', 'none');
    	if (resultados.length == 0) {
    		$('#copr_detalle_list').append('<li>NO HAY DETALLES PARA MOSTRAR</li>');
    		$('.corp_button').css('display', 'none');
    	}
    	else {
    		$.each(resultados, function(index, resultado) {
    			var markup = '<label>';
				markup += '<input type="checkbox" name="copr-check" doc-id="'+ resultado["numero"] +'" class="custom" data-mini="true" />';
    			markup += 'NUMERO: <span style="float: right; font-weight: normal;">' + resultado["numero"] + '</span><br />';
                markup += 'UBICACION: <span style="float: right; font-weight: normal;">' + resultado["ubicacion"] + '</span><br />';
                markup += 'FECHA: <span style="float: right; font-weight: normal;">' + resultado["fecha"].substring(0, 10) + '</span><br />';
            	markup += 'TERCERO: <span style="float: right; font-weight: normal;">' + resultado["tercero"] + '</span><br />';
                markup += 'OBSERVACION: <span style="float: right; font-weight: normal;">' + resultado["observacion"] + '</span><br />';
    			markup += 'CONCEPTO: <span style="float: right; font-weight: normal;">' + resultado["concepto"] + '</span><br />';
                markup += 'SALDO: <span style="float: right; font-weight: normal;">' + formato(resultado["saldo"]) + '</span><br />';
                markup += 'CUPO: <span style="float: right; font-weight: normal;">' + formato(resultado["cupo"]) + '</span><br />';
            	markup += 'PENDIENTE: <span style="float: right; font-weight: normal;">' + formato(resultado["ped_pend"]) + '</span><br />';
                markup += 'MORA: <span style="float: right; font-weight: normal;">' + formato(resultado["mora"]) + '</span><br />';
                markup += 'VENDEDOR: <span style="float: right; font-weight: normal;">' + resultado["vendedor"] + '</span><br />';
                markup += 'NOMBRE UBICACION: <span style="float: right; font-weight: normal;">' + resultado["ubicacion_nombre"] + '</span><br />';
                markup += 'NOMBRE TERCERO: <span style="float: right; font-weight: normal;">' + resultado["tercero_nombre"] + '</span><br />';
            	markup += 'NOMBRE TERCERO 2: <span style="float: right; font-weight: normal;">' + resultado["tercero_nombre1"] + '</span><br />';
                markup += 'OBSERVACION 2: <span style="float: right; font-weight: normal;">' + resultado["observacion2"] + '</span><br />';
    			markup += 'DOCUMENTO: <span style="float: right; font-weight: normal;">' + resultado["documento"] + '</span>';
    			markup += '</label>';
    			$('#copr_detalle_list').append(markup);
    		});
    	}
    	$('.copr_btn_liberar').css('display', 'block');
 		$('.copr_btn_devolver').css('display', 'block');
 		$('.copr_btn_rechazar').css('display', 'block');
    	pagina("#copr-detalle", "slide", false);  
    	$('#copr_detalle_list').listview('refresh');
 	});
}

$(".copr_btn_liberar").click(function(e) {
	bloquearEvento(e);
	dialogo("COPR", "Listos para enviar 'L'", "Aceptar", function() {});
});

$(".copr_btn_devolver").click(function(e) {
	bloquearEvento(e);
	dialogo("COPR", "Listos para enviar 'D'", "Aceptar", function() {});
});

$(".copr_btn_rechazar").click(function(e) {
	bloquearEvento(e);
	dialogo("COPR", "Listos para enviar 'R'", "Aceptar", function() {});
});

/*
 * qrse.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de gráficos QRSE
 */
 
var pieChart;
 
$('#qrse').bind('pagebeforeshow', function(event, ui) {
	bloquearEvento(event);
	
	oasisConsultaQRSE(function(resultados) {
		if (resultados.length == 0) 
			$('#pieChart').html('<p>NO HAY RESULTADOS PARA MOSTRAR</p>');
		else {
			var vals = [];
			$.each(resultados, function(index, resultado) {
				vals.push([resultado['actividad'], resultado['cantidad']]);
			});
			pieChart = $.jqplot('pieChart', [vals], {
				grid: {
					drawBorder: false,
					shadow: false
				},
				seriesDefaults:{
					renderer:$.jqplot.PieRenderer,
					rendererOptions: {
          				showDataLabels: true
        			},
					trendline:{ show: true }
				},
				legend:{ show: true, location: 's' }
			});
		}
	});
});

$('#qvem-resultado').bind('pagebeforehide', function(event, ui) {
	bloquearEvento(event);
	pieChart.destroy();
});


/*
 * index.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de inicio de la aplicación que realiza lo siguiente:
 * - Define el comportamiento por defecto del zoom
 * - Define un listener para limpiar las páginas que no deben almacenarse en caché via Ajax
 * - Define el comportamiento por defecto de los posibles botones de los aparatos
 * - Inicializa la aplicación y escucha al evento 'deviceready'
 * - Carga las credenciales de usuario guardadas, si existen
 * - Renderiza la pantalla inicial
 * 
 */

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        reasignarBotones();
        inicio();
    }
};

var inicio = function() {
	// Buscamos un usuario existente en el localStorage. Si hay uno, verificamos de nuevo la sesión
	// y mostramos directo el home, de ser exitosa. De otro modo mostramos el login
	if (window.localStorage.getItem("usuario") != null) 
		login($('#empresa').val(), window.localStorage.getItem("ambiente"), window.localStorage.getItem("usuario"), window.localStorage.getItem("clave"), false);
	else {
		// Para el login, cargamos los ambientes disponibles a través de web service público
		consultarAmbientes('oasis');
	}
	$('#login').show();
}

var consultarAmbientes = function (valorPorDefecto) {
	oasisConsultaAmbientes(function(resultados) {
		$('#ambiente').empty();
		if (resultados.length == 0) 
			dialogo("Error de Red", "No se pudo establecer contacto con el servidor. Por favor revise su conexion a Internet", "Aceptar", function () {});
		else {
			$.each(resultados, function(index, resultado) {
				var option = '<option value="'+resultado['ambiente']+'"';
				if (resultado['ambiente'] == valorPorDefecto) {
					$('#ambiente').val(valorPorDefecto);
					option += ' selected="selected">';
				}
				else
					option += '>';
				option += resultado['ambiente']+'</option>';
				$('#ambiente').append(option);
			});
			$('#ambiente').selectmenu("refresh", true);
		}
	});
}

var reasignarBotones = function () {
	// Reescribimos el comportamiento por defecto de los botones de cualquier aparato
    document.addEventListener("backbutton", function () { 
    	confirma("Salir de Oasis", "Seguro que desea salir?", "Si,No", function (buttonIndex) {
    		if (buttonIndex == 1) 
    			device.exitApp();
		}); 
    }, false);
    document.addEventListener("menubutton", function () {}, false);
    document.addEventListener("searchbutton", function () {}, false);
    document.addEventListener("startcallbutton", function () {}, false);
    document.addEventListener("endcallbutton", function () {}, false);
}

// Definimos el comportamiento del zoom por defecto
$(document).bind( "mobileinit", function(event) {
	bloquearEvento(event);
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.extend($.mobile.zoom, {locked:true, enabled:false});
	$.mobile.transitionFallbacks.slideout = 'none';
    $.mobile.defaultPageTransition = 'none';            
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.touchOverflowEnabled = true;
    $.mobile.buttonMarkup.hoverDelay = 0;
});

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){7 c=a.r(".")[0],a=a.r(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){E.L&&2.11(a,b)};d[c][a].F=d.z({1g:c,1l:a},b);d.I[a]=3(b){7 e="1k"===1o b,g=G.F.16.17(E,1),i=2;k(e&&"1n"===b.1m(0,1))4 i;2.13(3(){7 h=d.12(2,a);h||(h=d.12(2,a,n d[c][a](b,2)));e&&(i=h[b].19(h,g))});4 i}};d.a("1i.1d",{p:{1e:"1z",1C:5},1s:3(a,b){4 b?(2.p[a]=b,2.6("j").B(a,b),2):2.p[a]},11:3(a,b){2.u=b;a=a||{};l.z(2.p,a,{10:2.v(a.10)});2.18();2.1a&&2.1a()},18:3(){7 a=2;2.m={j:n 8.9.1u(a.u,a.p),C:[],M:[],W:[]};8.9.y.1t(a.m.j,"1w",3(){d(a.u).14("1v",a.m.j)});a.x(a.p.1q,a.m.j)},S:3(a){7 b=2.6("O",n 8.9.1p);b.z(2.v(a));2.6("j").1r(b);4 2},1B:3(a){7 b=2.6("j").1E();4 b?b.1D(a.U()):!1},1y:3(a,b){2.6("j").1x[b].P(2.D(a));4 2},1A:3(a,b){a.j=2.6("j");a.T=2.v(a.T);7 c=n(a.1h||8.9.1f)(a),f=2.6("C");c.X?f[c.X]=c:f.P(c);c.O&&2.S(c.U());2.x(b,a.j,c);4 d(c)},w:3(a){2.t(2.6(a));2.B(a,[]);4 2},t:3(a){A(7 b K a)a.R(b)&&(a[b]o 8.9.15?(8.9.y.1j(a[b]),a[b].N&&a[b].N(s)):a[b]o G&&2.t(a[b]),a[b]=s)},22:3(a,b,c){a=2.6(a);b.q=d.21(b.q)?b.q:[b.q];A(7 f K a)k(a.R(f)){7 e=!1,g;A(g K b.q)k(-1<d.20(b.q[g],a[f][b.1Y]))e=!0;Q k(b.V&&"1X"===b.V){e=!1;1W}c(a[f],e)}4 2},6:3(a,b){7 c=2.m;k(!c[a]){k(-1<a.1Z(">")){A(7 d=a.1c(/ /g,"").r(">"),e=0;e<d.L;e++){k(!c[d[e]])k(b)c[d[e]]=e+1<d.L?[]:b;Q 4 s;c=c[d[e]]}4 c}b&&!c[a]&&2.B(a,b)}4 c[a]},27:3(a,b,c){7 d=2.6("J",a.28||n 8.9.29);d.26(a);d.23(2.6("j"),2.D(b));2.x(c,d);4 2},24:3(){s!=2.6("J")&&2.6("J").25();4 2},B:3(a,b){2.m[a]=b;4 2},1V:3(){7 a=2.6("j"),b=a.1K();d(a).1b("1J");a.1M(b);4 2},1L:3(){2.w("C").w("W").w("M").t(2.m);l.1G(2.u,2.1F)},x:3(a){a&&d.1I(a)&&a.19(2,G.F.16.17(E,1))},v:3(a){k(!a)4 n 8.9.H(0,0);k(a o 8.9.H)4 a;a=a.1c(/ /g,"").r(",");4 n 8.9.H(a[0],a[1])},D:3(a){4!a?s:a o l?a[0]:a o 1H?a:d("#"+a)[0]}});l.I.z({1b:3(a){8.9.y.14(2[0],a);4 2},Y:3(a,b,c){8.9&&2[0]o 8.9.15?8.9.y.1S(2[0],a,b):c?2.Z(a,b,c):2.Z(a,b);4 2}});l.13("1R 1U 1T 1O 1N 1Q 1P".r(" "),3(a,b){l.I[b]=3(a,d){4 2.Y(b,a,d)}})})(l);',62,134,'||this|function|return||get|var|google|maps||||||||||map|if|jQuery|instance|new|instanceof|options|value|split|null|_c|el|_latLng|clear|_call|event|extend|for|set|markers|_unwrap|arguments|prototype|Array|LatLng|fn|iw|in|length|overlays|setMap|bounds|push|else|hasOwnProperty|addBounds|position|getPosition|operator|services|id|addEventListener|bind|center|_setup|data|each|trigger|MVCObject|slice|call|_create|apply|_init|triggerEvent|replace|gmap|mapTypeId|Marker|namespace|marker|ui|clearInstanceListeners|string|pluginName|substring|_|typeof|LatLngBounds|callback|fitBounds|option|addListenerOnce|Map|init|bounds_changed|controls|addControl|roadmap|addMarker|inViewport|zoom|contains|getBounds|name|removeData|Object|isFunction|resize|getCenter|destroy|setCenter|mouseout|mouseover|dragend|drag|click|addListener|dblclick|rightclick|refresh|break|AND|property|indexOf|inArray|isArray|find|open|closeInfoWindow|close|setOptions|openInfoWindow|infoWindow|InfoWindow'.split('|'),0,{}))

/*
 * tmov.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la sección de recaudos
 * 
 */

var tmovPrograma = 'tmov';
var tmovClienteID = '';
var tmovRecaudo = '';
var tmovDocumento = '';
var tmovNumero = 0;
var tmovUbicacion = 0;

$("#tmov-btn-buscar-cliente").click(function(e) {
	bloquearEvento(e);
	zoomTerceros('#tmov-cliente-id', '#tmov-cliente-nombre', '#tmov');
});

$("#tmov_btn_siguiente").click(function(e) {
	bloquearEvento(e);
	tmovClienteID = $('#tmov-cliente-id').val();
	tmovRecaudo = $('#tmov-recaudo').val();
	if (tmovClienteID && tmovClienteID != '' && tmovRecaudo && tmovRecaudo != '') {
		// Siempre buscamos de nuevo al cliente para validar que el código en el input
		// coincida con el nombre, aún si fue cambiado manualmente
		
		oasisConsultaTerceros(tmovClienteID, '', '', function(resultados) {
			if (resultados.length > 0 && resultados[0]['nombre'] && resultados[0]['nombre'] != '') {
				// Buscamos el detalle CSSA para el cliente, que corresponde a los documentos en donde
				// se le debe aplicar el abono
				
				$('#tmov_detalle_list').empty();
				$('#tmov-confirmacion-cliente-nombre').html(resultados[0]['nombre']);
				oasisConsultaCSSA(tmovClienteID, 'D', function(resultados) {
					if (resultados.length == 0) {
						// Si no hay documentos CSSA en deuda, aplicamos el abono sin detalle 
						// para que sea procesado como saldo a favor
						tmovDocumento = '';
						tmovNumero = 0;
						tmovUbicacion = 0;
						aplicarAbono();
					}
					else {
						// Hacemos que los resultados sean una lista de elementos de selección única, 
						//a fin de aplicar el abono sobre uno de ellos
						$('#tmov_detalle_list').append('<br />');
						$.each(resultados, function(index, resultado) {
							$('#tmov_detalle_list').append('<label>'+
														   '<input type="radio" name="tmov-radio" id="'+ resultado["numero"] +'" class="custom" data-mini="true" documento="'+ resultado["documento"] +'" ubicacion="'+ resultado["ubicacion"] +'" />'+
                                          		   		   'DOCUMENTO: <span style="float: right; font-weight: normal;">' + resultado["documento"] + '</span><br />' +
                                          		   		   'NUMERO: <span style="float: right; font-weight: normal;">' + resultado["numero"] + '</span><br />' +
                                          		           'UBICACION: <span style="float: right; font-weight: normal;">' + resultado["ubicacion"] + '</span><br />' +
                                          		           'SALDO: <span style="float: right; font-weight: normal;">' + formato(resultado["saldo"]) + '</span><br />' +
                                          		           'FECHA: <span style="float: right; font-weight: normal;">' + resultado["fecha"].substring(0, 10) + '</span><br />' +
                                          		           '</label>');
						});
						$('#tmov_detalle_list').trigger('create');
						pagina("#tmov-detalle", "slide", false);
					}
				});	
			}
			else
				dialogo("TMOV", "No se encuentra el ID de cliente digitado", "Aceptar", function () {});
		});
	} 
	else 
		dialogo("TMOV", "Digite todos los datos para efectuar el recaudo", "Aceptar", function () {});
});

$("#tmov_btn_ver_preliminar").click(function(e) {
	bloquearEvento(e);
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	if (iOS) {
		var root = this;
		cb = window.plugins.childBrowser;
		if(cb != null) {
			cb.onLocationChange = function(loc){ root.locChanged(loc); };
			cb.onClose = function(){root.onCloseBrowser(); };
			cb.onOpenExternal = function(){root.onOpenExternal(); };
			cb.showWebPage("http://oasisportal.oasis.com.co/oasisportal2/ayuda/prrr.pdf");
		}
	} 
	else {
		window.open("http://oasisportal.oasis.com.co/oasisportal2/ayuda/prrr.pdf", '_blank');
	}
});

$("#tmov-btn_regresar").click(function(e) {
	bloquearEvento(e);
	reestablecerTMOV();
});

$(".tmov_btn_aplicar").click(function(e) {
	bloquearEvento(e);
	var seleccionado = $("input[name=tmov-radio]:checked");
	tmovDocumento = seleccionado.attr('documento');
	tmovNumero = seleccionado.attr('id');
    tmovUbicacion = seleccionado.attr('ubicacion');
	if (tmovNumero && tmovNumero != 0)
		aplicarAbono();
	else 
		dialogo("TMOV", "Seleccione un documento para aplicar el recaudo", "Aceptar", function () {});
});

var aplicarAbono = function () {
	oasisCreaDocumento(tmovPrograma, oasisGenerarXmlRecaudo(tmovClienteID, tmovRecaudo, tmovDocumento, tmovNumero, tmovUbicacion), function(resultados) {
		$("#tmov-recaudo-no").html('');
		if (resultados && !isNaN(parseInt(resultados))) {
			$("#tmov-recaudo-no").html(resultados);
			pagina('#tmov-confirmacion', "slide", false);
		} 
		else if (isNaN(parseInt(resultados))) {
			dialogo("ERROR", "Su recaudo no pudo ser procesado exitosamente. Estado: " + resultados, "Aceptar", function() {});
		}
		else {
			dialogo("ERROR", "Su recaudo no pudo ser procesado exitosamente. Verifique el estado del servicio", "Aceptar", function() {});
		}	
	});
} 

var reestablecerTMOV = function () {
	tmovClienteID = '';
	$('#tmov-cliente-id').val('');
	$('#tmov-recaudo').val('');
	$('#tmov-cliente-nombre').html('');
	$('#tmov-confirmacion-cliente-nombre').html('');
	$("#tmov-recaudo-no").html('');
	pagina('#tmov', "slide", true);
}

/*
 * cssa.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la consulta CSSA
 * 
 */

var cssaCodigo;
var cssaCacheDetalle = false;
 
var consultaCSSA = function(codigo, tipo) {
	if (tipo && tipo == 'D') {
		$('#cssa_detalle_list li').remove();
		oasisConsultaCSSA(codigo, tipo, function(resultados) {
			if (resultados.length == 0) 
				$('#cssa_detalle_list').append('<li>NO HAY RESULTADOS PARA MOSTRAR</li>');
			else {
				$.each(resultados, function(index, resultado) {
					$('#cssa_detalle_list').append('<li>' +
                                          		   'DOCUMENTO: <span style="float: right; font-weight: normal;">' + resultado["documento"] + '</span><br />' +
                                          		   'NUMERO: <span style="float: right; font-weight: normal;">' + resultado["numero"] + '</span><br />' +
                                          		   'UBICACION: <span style="float: right; font-weight: normal;">' + resultado["ubicacion"] + '</span><br />' +
                                          		   'SALDO: <span style="float: right; font-weight: normal;">' + formato(resultado["saldo"]) + '</span><br />' +
                                          		   'FECHA: <span style="float: right; font-weight: normal;">' + resultado["fecha"].substring(0, 10) + '</span><br />' +
                                          		   '</li>');
				});
			}
			$('#cssa_detalle_list').listview('refresh');
			cssaCacheDetalle = true;
		});
	} 
	else {
		oasisConsultaCSSA(codigo, tipo, function(resultados) {
        	$('#cssa_control_monedas').empty();
        	$('#cssa_resultado_list li').remove();
        	if (resultados.length == 0) {
            	$('#cssa_control_monedas').append('<h4>NO HAY RESULTADOS QUE MOSTRAR PARA ESTE C&Oacute;DIGO DE TERCERO</h4>');
            	$('#cssa_control_monedas').trigger('create');
            	pagina("#cssa-resultado", "slide", false);
        	}
        	else {
            	var monedas = new Array();
            	$.each(resultados, function(index, resultado) {
                	monedaActual = parseInt(resultado["moneda"]);
                	if (jQuery.inArray(monedaActual, monedas) < 0) {
                    	if (monedaActual == 0)
                        	$('#cssa_control_monedas').append('<a href="#" data-role="button">COP</a>');
                    	else if (monedaActual == 1)
                        	$('#cssa_control_monedas').append('<a href="#" data-role="button">USD</a>');
                    	else if (monedaActual == 2)
                        	$('#cssa_control_monedas').append('<a href="#" data-role="button">EUR</a>');
                    	monedas[monedas.length] = monedaActual;
                	}
            	});
            	$('#cssa_control_monedas').append('<br /><br />');           
            	$("#cssa_control_monedas a").click(function() {
                	refrescarResultadosCSSA(resultados, $(this).index());
            	});
            	$('#cssa_control_monedas').trigger('create');
            	pagina("#cssa-resultado", "slide", false);     
            	refrescarResultadosCSSA(resultados, monedas[0]);
        	}
    	});	
	}
}

var refrescarResultadosCSSA = function(listaResultados, monedaAMostrar) {
	$('#cssa_resultado_list li').remove();
    $.each(listaResultados, function(index, resultado) {
        monedaActual = parseInt(resultado["moneda"]);
        if (monedaActual == monedaAMostrar) {
           $('#cssa_resultado_list').append('<li>VALOR: <span style="float: right;">' + formato(resultado["valor"]) + '</span><br />');
           if (resultado["operacion"]) 
               $('#cssa_resultado_list').append('OPERACI&Oacute;N: <span style="float: right;">' + formato(resultado["operacion"]) + '</span><br />');
           $('#cssa_resultado_list').append('</li>');
        }
    });
    $('#cssa_resultado_list').listview('refresh');
}

$("#cssa-btn-buscar-cliente").click(function(e) {
	bloquearEvento(e);
	zoomTerceros('#cssa_codigo', '#cssa-cliente-nombre', '#cssa');
});

$("#cssa_btn_buscar").click(function(e) {
	bloquearEvento(e);
	cssaCodigo = $("#cssa_codigo").val();
	$('#cssa-resultado-cliente-nombre').html('');
	if (cssaCodigo && cssaCodigo != '') {
		// Siempre buscamos de nuevo al tercero para validar que el código en el input
		// coincida con el nombre, aún si fue cambiado manualmente
		oasisConsultaTerceros(cssaCodigo, '', '', function(resultados) {
			if (resultados.length > 0 && resultados[0]['nombre'] && resultados[0]['nombre'] != '') {
				$('#cssa-resultado-cliente-nombre').html(resultados[0]['nombre']);
				consultaCSSA(cssaCodigo, '');
			}
			else
				dialogo("CSSA", "No se encuentra el ID de tercero digitado", "Aceptar", function () {});
		});
	} 
	else 
		dialogo("CSSA", "Digite el dato para la consulta", "Aceptar", function () {});
});

$("#cssa_btn_back").click(function(e) {
	bloquearEvento(e);
	cssaCacheDetalle = false;
	$("#cssa_detalle").trigger('collapse');
	pagina("#cssa", "slide", true);
});

$('#cssa_detalle').bind('expand', function(event, ui) {
    if (!cssaCacheDetalle) 
    	consultaCSSA(cssaCodigo, 'D');
});

/*
 * qvem.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de gráficos QVEM
 */
 
var qvemAno;
var qvemMes;
var plotGeneral;
var plotDetalle;
var valoresPlotGeneral = [];
var valoresPlotDetalle = [];
var paginaCargada = false;

$('#qvem-resultado').bind('pageshow', function(event, ui) {
	bloquearEvento(event);
	plotGeneral = $.jqplot('plotChartGeneral', [valoresPlotGeneral], {
      axesDefaults: {
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      },
      axes: {
        xaxis: {
          label: "Presupuesto",
          pad: 0
        },
        yaxis: {
          label: "Ventas"
        }
      }
    });
	$('#plotChartDetalle').css('display', 'none');
	paginaCargada = true;
});

$('#qvem-resultado').bind('pagebeforehide', function(event, ui) {
	bloquearEvento(event);
	invalidarPlot(plotGeneral);
	invalidarPlot(plotDetalle);
	paginaCargada = false;
});

var invalidarPlot = function(plot) {
	if (plot !== undefined) {
		plot.destroy();
		plot = undefined;
	}
} 

var consultaQVEM = function(ano, mes, detalle) {
	oasisConsultaQVEM(ano, mes, detalle, function(resultados) {
        if (resultados.length == 0) {
            $('#plotChartGeneral').html('<p>NO HAY RESULTADOS PARA MOSTRAR</p>');
            $('#plotChartDetalle').css('display', 'none');
            pagina("#qvem-resultado", "slide", false);
        }
        else {
        	if (detalle && detalle == 'D') {
        		invalidarPlot(plotGeneral);
        		valoresPlotDetalle = [];
				$.each(resultados, function(index, resultado) {
					valoresPlotDetalle.push([resultado['periodo'], resultado['ventas']]);
				});
				$('#plotChartGeneral').css('display', 'none');
				$('#plotChartDetalle').css('display', 'block');
				plotDetalle = $.jqplot('plotChartDetalle',[valoresPlotDetalle], {
      					axesDefaults: {
        					labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      					},
      					axes: {
        					xaxis: {
          						label: "Periodo",
          						pad: 0
        					},
        					yaxis: {
          						label: "Ventas"
        					}
     	 				}
    				});
        	} 
        	else {
        		invalidarPlot(plotDetalle);
        		valoresPlotGeneral = [[resultados[0]['presupuesto'], resultados[0]['ventas']]];
        		if (paginaCargada) {
        			$('#plotChartDetalle').css('display', 'none');
					$('#plotChartGeneral').css('display', 'block');
					plotGeneral = $.jqplot('plotChartGeneral', [valoresPlotGeneral], {
      					axesDefaults: {
        					labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      					},
      					axes: {
        					xaxis: {
          						label: "Presupuesto",
          						pad: 0
        					},
        					yaxis: {
          						label: "Ventas"
        					}
     	 				}
    				});
        		} 
        		else 
        			pagina("#qvem-resultado", "slide", false);
        	}
        }
    });
}

$("#qvem_btn_consultar").click(function(e) {
	bloquearEvento(e);
    qvemAno = $("#qvem_ano").val();
    qvemMes = $("#qvem_periodo").val();
	if (qvemAno && qvemAno != '' && qvemMes && qvemMes != '') 
		consultaQVEM(qvemAno.toString(), qvemMes.toString(), '');
	else 
		dialogo("QVEM", "Digite los datos para la consulta", "Aceptar", function () {});
});

$('#plot_general').click(function(e) {
	bloquearEvento(e);
	consultaQVEM(qvemAno.toString(), qvemMes.toString(), '');
});

$('#plot_detalle').click(function(e) {
	bloquearEvento(e);
	consultaQVEM(qvemAno.toString(), qvemMes.toString(), 'D');
});

/*
 * utils.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de funciones de uso utilitario para resumir el llamado 
 * a algunos componentes de PhoneGap, y jQuery Mobile
 * 
 */

// Detiene la propagación de los eventos javascript alrededor del DOM, garantizando que
// sólo se ejecute una vez al momento de ser escuchado. Es indispensable invocarlo al momento
// de escuchar cualquier evento, para garantizar rendimiento y evitar bugs en distintos
// navegadores y aparatos
//
var bloquearEvento = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
}

// Mostrar una advertencia o mensaje de error. Recibe título y texto del mensaje,
// el texto del botón de aceptación, y un callback para el botón
var dialogo = function(title, text, button, callback) {
	navigator.notification.alert(text, callback, title, button);
}

// Mostrar una alerta de confirmación. Recibe título y texto del mensaje, 
// los textos de los botones separados por coma, y un callback con el índice 
// del botón pulsado como parámetro
var confirma = function(title, text, buttons, callback) {
	navigator.notification.confirm(text, callback, title, buttons);
}

// Formatea los números a dos decimales y separa los miles
var formato = function(valor) {
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
	sValue = parseInt(valor).toFixed(2) + '';
	while(sRegExp.test(sValue)) {
		sValue = sValue.replace(sRegExp, '$1'+','+'$2');
	}
	return sValue;
}

// Formatea una URL con espacios o caracteres especiales, a la codificación correcta
var formatoURL = function(valor) {
	return valor.replace(/ /g, '%20');
}

// Cuenta los elementos repetidos de un arreglo y devuelve 2 arreglos, 
// uno con cada elemento individual y otro con el conteo de ocurrencias
var conteo = function(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}

// Permite colocar un valor máximo de caracteres a un textarea
$('textarea[maxlength]').live('keyup', function() {
	var limit = parseInt($(this).attr('maxlength'));   
    var text = $(this).val();  
    var chars = text.length;
    if (chars > limit) {
    	var new_text = text.substr(0, limit);  
        $(this).val(new_text);  
    }  
});

// Permite cambiar rápidamente de página. Recibe el id o link a la página, 
// el efecto jQM a aplicar, si dicho efecto se aplica normal o en reversa, 
// y un callback opcional para llamar después de cargada la página
var pagina = function(id, effect, direction) {
	$(document.getElementById(id)).remove();
	if (effect == 'none') {
		$.mobile.changePage(id, {
			transition: effect
    	});
	} 
	else {
		$.mobile.changePage(id, {
			transition: effect, 
			reverse: direction
    	});
	}
}

/*
 * scal.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de Ruta de Visitas en mapa
 */

var cacheMapa = false;
var puntosVisita = new Array();
 
$('#scal').bind('pagebeforeshow', function(event, ui) {
	bloquearEvento(event);
	navigator.geolocation.getCurrentPosition(obtuvoLocalizacion, errorLocalizacion);
	if (!cacheMapa) {
		$.mobile.showPageLoadingMsg();
		
		oasisConsultaSCAL(function(resultados) {
			if (resultados.length == 0) 
				dialogo("SCAL", "No se encontraron direcciones para mostrar", "Aceptar", function() {});
			else {
				puntosVisita = resultados;
				$('#scal-map').gmap().bind('init', function() {
					$.each(resultados, function(index, resultado) {
						if (resultado["tercero"] != 0) {
							new google.maps.Geocoder().geocode({'address': resultado["direccion"]+' '+resultado["ciudad"]}, function(results, status) {
      							if (status == google.maps.GeocoderStatus.OK) {
      								$('#scal-map').gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true}).click(function() {
										var markup = '<div class="map-font">';
										markup += '<strong>';
										markup += resultado["nombre"];
										markup += '</strong><br />';
										markup += 'NO: '+resultado["numero"] + '<br />';
										markup += 'COD: '+resultado["tercero"] + '<br />';
										markup += resultado["direccion"]+' '+resultado["ciudad"] + '<br />';
										markup += resultado["hora"];
										markup += '<a href="#" class="map-disclosure" onclick="verDetalleVisita('+index+')">Ver Detalle Visita</a>';
										markup += '</div>';
										$('#scal-map').gmap('openInfoWindow', {
											'content': markup
										}, this);
									});
      							} 
      							else {
        							console.log("No se pudo georreferenciar la direccion. Estado: " + status);
      							}
    						});	
						}
					});
					cacheMapa = true;
					$.mobile.hidePageLoadingMsg();
				});		                                                                      	
			}
		});
	}
	else 
		refrescarDirecciones();
});

var verDetalleVisita = function(i) {
	$('#scal-nombre').html(puntosVisita[i]["nombre"]);
	$('#scal-no').html('NO: '+puntosVisita[i]["numero"]);
	$('#scal-cod').html('COD: '+puntosVisita[i]["tercero"]);
	$('#scal-direccion').html(puntosVisita[i]["direccion"]+' '+puntosVisita[i]["ciudad"]);
	$('#scal-fecha').html(puntosVisita[i]["hora"]);
	pagina('#scal-detalle', "slide", false);
}

var refrescarDirecciones = function() {
	oasisConsultaSCAL(function(resultados) {
		if (resultados.length == 0) 
			dialogo("SCAL", "No se encontraron direcciones para mostrar", "Aceptar", function() {});
		else {
			puntosVisita = resultados;
			$.each(resultados, function(index, resultado) {
				if (resultado["tercero"] != 0) {
					new google.maps.Geocoder().geocode({'address': resultado["direccion"]+' '+resultado["ciudad"]}, function(results, status) {
      					if (status == google.maps.GeocoderStatus.OK) {
      						$('#scal-map').gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true}).click(function() {
								var markup = '<div class="map-font">';
								markup += '<strong>';
								markup += resultado["nombre"];
								markup += '</strong><br />';
								markup += 'NO: '+resultado["numero"] + '<br />';
								markup += 'COD: '+resultado["tercero"] + '<br />';
								markup += resultado["direccion"]+' '+resultado["ciudad"] + '<br />';
								markup += resultado["hora"];
								markup += '<a href="#" class="map-disclosure" onclick="verDetalleVisita('+index+')">Ver Detalle Visita</a>';
								markup += '</div>';
								$('#scal-map').gmap('openInfoWindow', {
									'content': markup
								}, this);
							});
      					} 
      					else {
        					console.log("No se pudo georreferenciar la direccion. Estado: " + status);
      					}
    				});	
				}
			});		                                                                      	
		}
	});
}

$("#scal_btn_guardar").click(function(e) {
	bloquearEvento(e);
	dialogo("SCAL", "Listos para enviar los datos", "Aceptar", function() {});
});

var obtuvoLocalizacion = function(position) {
	var miPosicion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	$('#scal-map').gmap('addMarker', {'position': miPosicion, 'bounds': true});
	$('#scal-map').gmap('addShape', 'Circle', { 
		'strokeWeight': 0, 
		'fillColor': "#008595", 
		'fillOpacity': 0.25, 
		'center': miPosicion, 
		'radius': 20000, 
		'clickable': false 
	});
};

function errorLocalizacion(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

/*
 * service.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de funciones que consumen el web service .asmx
 * Todos los métodos devuelven las estructuras de datos formateadas, 
 * o ejecutan al 'callback' requerido de quien los invoca
 * 
 */
 
var oasis_default_ws_url = "http://oasisportal.oasis.com.co/oasisportal2/wservices/wsOasis.asmx";

var obtenerUrlServicio = function() {
	if (window.localStorage.getItem("url-ws") != null) 
		return window.localStorage.getItem("url-ws");
	else 
		return oasis_default_ws_url;
}

var oasisConsultaAmbientes = function(callback) {
	$.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/Ambientes",
           dataType: "xml",
           data: "",
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		callback(parseOasisService("Ambientes", $(xml).find('string').text()));
           }
        }
    );
}

var oasisVerificaConexion = function(empresaID, ambiente, usuario, clave, callback) {
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/VerificaConexion",
           dataType: "xml",
           data: "pempresa="+empresaID+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		loginExitoso = ($(xml).find('string').text()=='S')? true : false;
           		window.localStorage.clear();
           		if (loginExitoso) {
           			// Guardamos los datos en el localStorage
                	window.localStorage.setItem("empresaID", empresaID);
                	window.localStorage.setItem("ambiente", ambiente);
                	window.localStorage.setItem("usuario", usuario);
                	window.localStorage.setItem("clave", clave);
           		} 
                callback(loginExitoso);
           }
        }
    );
}

var oasisConsultaSMEN = function(callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaSMEN",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		callback(parseOasisService("ConsultaSMEN", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaFFCV = function(ano, periodo, tipo, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaFFCV",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&panno="+ano+"&pperiodo="+periodo+"&ptipo="+tipo,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		if (tipo == 'D') 
           			callback(parseOasisService("ConsultaFFCVDetalle", $(xml).find('string').text()));
           		else 
           			callback(parseOasisService("ConsultaFFCV", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaCSSA = function(tercero, tipo, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaCSSA",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&ptercero="+tercero+"&ptipo="+tipo,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		if (tipo == 'D') 
           			callback(parseOasisService("ConsultaCSSADetalle", $(xml).find('string').text()));
           		else 
           			callback(parseOasisService("ConsultaCSSA", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaISSA = function(producto, tipo, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaISSA",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&pproducto="+producto+"&ptipo="+tipo,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		if (tipo == 'D') 
           			callback(parseOasisService("ConsultaISSADetalle", $(xml).find('string').text()));
           		else 
           			callback(parseOasisService("ConsultaISSA", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaSCAL = function(callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaSCAL",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		callback(parseOasisService("ConsultaSCAL", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaCOPR = function(tercero, tipo, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaCOPR",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&ptercero="+tercero+"&ptipo="+tipo,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		if (tipo == 'D') 
           			callback(parseOasisService("ConsultaCOPRDetalle", $(xml).find('string').text()));
           		else 
           			callback(parseOasisService("ConsultaCOPR", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaQRSE = function(callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaQRSE",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		callback(parseOasisService("ConsultaQRSE", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaQVEM = function(ano, periodo, tipo, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaQVEM",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&panno="+ano+"&pperiodo="+periodo+"&ptipo="+tipo,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
           		if (tipo == 'D') 
           			callback(parseOasisService("ConsultaQVEMDetalle", $(xml).find('string').text()));
           		else 
           			callback(parseOasisService("ConsultaQVEM", $(xml).find('string').text()));
           }
        }
    );
}

var oasisCreaDocumento = function(programa, docXml, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/CreaDocumento",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&pprograma="+programa+"&pxml="+docXml,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest, textStatus, errorThrown);
           },
           success: function(xml) {
           		// El resultado es un string puro que devolveremos inmediatamente
           		callback($(xml).find('string').text());
           }
        }
    );
}

var oasisConsultaTerceros = function(tercero, pagina, nombre, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaTerceros",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&ptercero="+tercero+"&ppagina="+pagina+"&pnombre="+nombre,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
                callback(parseOasisService("ConsultaTerceros", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaProductos = function(producto, pagina, nombre, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaProductos",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&pproducto="+producto+"&ptercero=&pfecha=&ppagina="+pagina+"&pnombre="+nombre,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
                callback(parseOasisService("ConsultaProductos", $(xml).find('string').text()));
           }
        }
    );
}

var oasisConsultaProductosEAN = function(docXml, callback) {
	var empresa = window.localStorage.getItem("empresaID");
    var ambiente = window.localStorage.getItem("ambiente");
    var usuario = window.localStorage.getItem("usuario");
    var clave = window.localStorage.getItem("clave");
    $.ajax({
    	   beforeSend: function() { $.mobile.showPageLoadingMsg(); },
           complete: function() { $.mobile.hidePageLoadingMsg(); },
           type: "POST",
           url: obtenerUrlServicio() + "/ConsultaProductosEAN",
           dataType: "xml",
           data: "pempresa="+empresa+"&pambiente="+ambiente+"&pusuario="+usuario+"&pclave="+clave+"&pxml="+docXml,
           processData: false,
           error: function(XMLHttpRequest, textStatus, errorThrown) {
                handleError(XMLHttpRequest,textStatus, errorThrown);
           },
           success: function(xml) {
                callback(parseOasisService("ConsultaProductosEAN", $(xml).find('string').text()));
           }
        }
    );
}

var oasisGenerarXmlPedido = function(cliente, productos) {
	var retorno = '';
	if (productos.length > 0) {
		var xml = '<?xml version=\"1.0\" encoding=\"utf-16\"?><OasisMovimiento xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><documento>';
		xml += "<documento>PD</documento>";
		xml += "<consecutivo>" + Math.floor(Math.random() * 1000000000) + "</consecutivo>";
		xml += "<ubicacion>1</ubicacion>";
		xml += "<fecha>" + new Date().format("dd/mm/yyyy") + "</fecha>";
		xml += "<concepto>PD</concepto>";
		xml += "<motivo>0</motivo>";
		xml += "<tercero>" + cliente + "</tercero>";
		xml += "<direccion>0</direccion>";
		xml += "<total>0</total>";
		xml += "<descuento>0</descuento>";
		xml += "<empleado>0</empleado>";
		xml += "<beneficiario>0</beneficiario>";
		xml += "<solicitante>" + cliente + "</solicitante>";
		xml += "<moneda>0</moneda>";
		xml += "<tasa_cambio>0</tasa_cambio>";
		xml += "<negocio>0</negocio>";
		xml += "<proyecto>0</proyecto>";
		xml += "<documento1>0</documento1>";
		xml += "<documento2>0</documento2>";
		xml += "<factura_proveedor></factura_proveedor>";
		xml += "<fecha_factura></fecha_factura>";
		xml += "<fecha_vencimiento></fecha_vencimiento>";
		xml += "<ubicacion_referencia>0</ubicacion_referencia>";
		xml += "<observacion></observacion>";
		xml += "<observacion2></observacion2>";
		xml += "<observacion3></observacion3>";
		xml += "<doc_documento></doc_documento>";
		xml += "<doc_numero>0</doc_numero>";
		xml += "<doc_ubicacion>0</doc_ubicacion>";
		xml += "<orden_compra>" + cliente + "</orden_compra>";
		xml += "<prioridad>3</prioridad>";
		xml += "<equipo></equipo>";
		xml += "<kilometraje>0</kilometraje>";
		xml += "<falla>0</falla>";
		xml += "<causa>0</causa>";
		xml += "<accion>0</accion>";
		xml += "<proceso>S</proceso>";
		$.each(productos, function(index, prod) {
        	var detalle = "<detalle>";
        	detalle += "<producto>" + prod["producto"] + "</producto>";
        	detalle += "<cantidad>" + prod["cantidad"] + "</cantidad>";
        	detalle += "<precio>" + prod["precio"] + "</precio>";
        	detalle += "<vdescuento>0</vdescuento>";
        	detalle += "<pdescuento>0</pdescuento>";
        	detalle += "<falladet>0</falladet>";
        	detalle += "<causadet>0</causadet>";
        	detalle += "<acciondet>0</acciondet>";
        	detalle += "<observaciondet></observaciondet>";
        	detalle += "</detalle>"
        	xml += detalle;
    	});
    	xml += "</documento></OasisMovimiento>";
    	retorno += xml;
	}
	return retorno;
}

var oasisGenerarXmlRecaudo = function(cliente, recaudo, documento, numero, ubicacion) {
	var retorno = '';
	if (recaudo && recaudo != '') {
		var xml = '<?xml version=\"1.0\" encoding=\"utf-16\"?><OasisMovimiento xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><documento>';
		xml += "<documento>RC</documento>";
		xml += "<consecutivo>" + Math.floor(Math.random() * 1000) + "</consecutivo>";
		xml += "<ubicacion>1</ubicacion>";
		xml += "<fecha>" + new Date().format("dd/mm/yyyy") + "</fecha>";
		xml += "<concepto>PC</concepto>";
		xml += "<motivo>0</motivo>";
		xml += "<tercero>" + cliente + "</tercero>";
		xml += "<direccion>0</direccion>";
		xml += "<total>" + recaudo + "</total>";
		xml += "<descuento>0</descuento>";
		xml += "<empleado>0</empleado>";
		xml += "<beneficiario>0</beneficiario>";
		xml += "<solicitante>0</solicitante>";
		xml += "<moneda>0</moneda>";
		xml += "<tasa_cambio>0</tasa_cambio>";
		xml += "<negocio>0</negocio>";
		xml += "<proyecto>0</proyecto>";
		xml += "<documento1>0</documento1>";
		xml += "<documento2>0</documento2>";
		xml += "<factura_proveedor></factura_proveedor>";
		xml += "<fecha_factura></fecha_factura>";
		xml += "<fecha_vencimiento></fecha_vencimiento>";
		xml += "<ubicacion_referencia>0</ubicacion_referencia>";
		xml += "<observacion></observacion>";
		xml += "<observacion2></observacion2>";
		xml += "<observacion3></observacion3>";
		xml += "<doc_documento>" + documento + "</doc_documento>";
		xml += "<doc_numero>" + numero + "</doc_numero>";
		xml += "<doc_ubicacion>" + ubicacion + "</doc_ubicacion>";
		xml += "<orden_compra></orden_compra>";
		xml += "<prioridad></prioridad>";
		xml += "<equipo></equipo>";
		xml += "<kilometraje>0</kilometraje>";
		xml += "<falla>0</falla>";
		xml += "<causa>0</causa>";
		xml += "<accion>0</accion>";
		xml += "<proceso>A</proceso>";
    	xml += "</documento></OasisMovimiento>";
    	retorno += xml;
	}
	return retorno;
}

var oasisGenerarXmlEAN = function(codigos) {
	var retorno = '';
	if (codigos.length > 0) {
		var xml = '<?xml version=\"1.0\" encoding=\"utf-16\"?>';
		xml += '<prod>';
		for (var i = 0; i < codigos.length; i++) {
			xml += '<d>' + codigos[i] + '</d>';
		}
		xml += '</prod>';
    	retorno += xml;
	}
	return retorno;
}

var handleError = function(xmlObj, textStatus, errorThrown) {
	if (errorThrown && errorThrown != '') 
		dialogo("Error de servicio web", "Su solicitud no pudo ser completada\nEstado: "+errorThrown, "Aceptar", function() {} );
	else 
		dialogo("Error de servicio web", "Su solicitud no pudo ser completada\nEstado: Sin conexion a la red", "Aceptar", function() {} );
}

var parseOasisService = function(service, xmlToParse) {
    var consultas = new Array();
    var resultMap;
    $xmlObject = $(xmlToParse);
    
    if (service == "ConsultaSMEN") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["id_categoria"] = $("linea2", this).text();
            resultMap["nombre_categoria"] = $("tres", this).text();
            resultMap["id_item"] = $("linea3", this).text();
            resultMap["nombre_item"] = $("proc_nombre", this).text();
            resultMap["codigo_item"] = $("proc_codigo", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaFFCV") {
        $xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["bruto"] = $("bruto", this).text();
            resultMap["iva"] = $("iva", this).text();
            resultMap["total"] = $("total", this).text();
            resultMap["descuento"] = $("descuento", this).text();
            resultMap["subtotal"] = $("subtotal", this).text();
            resultMap["cantidad"] = $("cantidad", this).text();
            resultMap["moneda"] = $("moneda", this).text();
            consultas[consultas.length] = resultMap;
        });
    } 
    else if (service == "ConsultaFFCVDetalle") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["documento"] = $("facc_documento", this).text();
            resultMap["numero"] = $("facn_numero", this).text();
            resultMap["ubicacion"] = $("facn_ubicacion", this).text();
            resultMap["fecha"] = $("facf_fecha", this).text();
            resultMap["total"] = $("total", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaCSSA") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["moneda"] = $("tmen_moneda", this).text();
            resultMap["valor"] = $("Column1", this).text();
            resultMap["operacion"] = $("operacion", this).text();
            consultas[consultas.length] = resultMap;
        });
    } 
    else if (service == "ConsultaCSSADetalle") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["documento"] = $("cuoc_documento", this).text();
            resultMap["numero"] = $("cuon_numero", this).text();
            resultMap["ubicacion"] = $("cuon_ubicacion", this).text();
            resultMap["saldo"] = $("cuov_saldo", this).text();
            resultMap["fecha"] = $("cuof_fecha", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaISSA") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["saldo"] = $("Column1", this).text();
            consultas[consultas.length] = resultMap;
        });
    } 
    else if (service == "ConsultaISSADetalle") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["bodega_id"] = $("invn_ubicacion", this).text();
            resultMap["saldo"] = $("Column1", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaSCAL") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["hora"] = $("calh_hora_inicial", this).text();
            resultMap["tercero"] = $("calv_tercero", this).text();
            resultMap["nombre"] = $("terc_nombre", this).text();
            resultMap["numero"] = $("caln_direccion", this).text();
            resultMap["direccion"] = $("dirc_direccion", this).text();
            resultMap["ciudad"] = $("ubgc_nombre", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaCOPR") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["codigo"] = parseInt($("pedv_tercero", this).text());
            resultMap["nombre"] = $("terc_nombre", this).text();
            consultas[consultas.length] = resultMap;
        });
    } 
    else if (service == "ConsultaCOPRDetalle") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["numero"] = parseInt($("pedn_numero", this).text());
            resultMap["ubicacion"] = parseInt($("pedn_ubicacion", this).text());
            resultMap["fecha"] = $("pedf_fecha", this).text();
            resultMap["tercero"] = parseInt($("pedv_tercero", this).text());
            resultMap["observacion"] = $("pedc_observacion", this).text();
            resultMap["concepto"] = $("conc_nombre", this).text();
            resultMap["saldo"] = $("terv_saldo", this).text();
            resultMap["cupo"] = $("terv_cupo", this).text();
            resultMap["ped_pend"] = $("terv_ped_pend", this).text();
            resultMap["mora"] = $("terv_mora", this).text();
            resultMap["vendedor"] = parseInt($("pedv_vendedor", this).text());
            resultMap["ubicacion_nombre"] = $("ubic_nombre", this).text();
            resultMap["tercero_nombre"] = $("terc_nombre", this).text();
            resultMap["tercero_nombre1"] = $("terc_nombre1", this).text();
            resultMap["observacion2"] = $("pedt_observacion", this).text();
            resultMap["documento"] = $("pedc_documento", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaQRSE") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["actividad"] = $("Actividad", this).text();
            resultMap["cantidad"] = parseInt($("cantidad", this).text());
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaQVEM") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["presupuesto"] = parseInt($("Presupuesto", this).text());
            resultMap["ventas"] = parseInt($("Ventas", this).text());
            consultas[consultas.length] = resultMap;
        });
    } 
    else if (service == "ConsultaQVEMDetalle") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["periodo"] = parseInt($("pern_numero", this).text());
            resultMap["presupuesto"] = parseInt($("Presupuesto", this).text());
            resultMap["ventas"] = parseInt($("Ventas", this).text());
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaTerceros") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["codigo"] = parseInt($("terv_codigo", this).text());
            resultMap["nombre"] = $("terc_nombre", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaProductos") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["codigo"] = parseInt($("prov_codigo", this).text());
            resultMap["nombre"] = $("proc_nombre", this).text();
            resultMap["precio"] = $("Column1", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "ConsultaProductosEAN") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["codigo"] = parseInt($("prov_codigo", this).text());
            resultMap["nombre"] = $("proc_nombre", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    else if (service == "Ambientes") {
    	$xmlObject.find("consulta").each(function() {
            resultMap = new Object();
            resultMap["ambiente"] = $("Amb", this).text();
            consultas[consultas.length] = resultMap;
        });
    }
    return consultas;
}


/*
 * badj.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de procedimientos de la sección de preliminares
 * 
 */
 
var fileEntries = new Array();

$('#badj').bind('pagebeforeshow', function(event, ui) {
	bloquearEvento(event);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
});

onFileSystemSuccess = function (fileSystem) {
	var directoryReader = fileSystem.root.createReader();
    directoryReader.readEntries(onDirectoryReadSuccess, onDirectoryReadFail);
}

onFileSystemFail = function (evt) {
    console.log(evt.target.error.code);
}

onDirectoryReadSuccess = function (entries) {
	fileEntries = entries;
	var preliminares = new Array();
	for (var i = 0; i < entries.length; i++) {
		if (entries[i].name.toLowerCase().indexOf("pdf") >= 0) {
			preliminares[preliminares.length] = {
				nombre : entries[i].name,
				ruta : entries[i].fullPath
			};
		}
    }
    $('#badj_list li').remove();
    if (preliminares.length == 0) 
    	$('#badj_list').append('<li>NO EXISTEN DOCUMENTOS GUARDADOS</li>');
    else {
    	for (var i = 0; i < preliminares.length; i++) {
    		var markup = '<li>';
    		markup += '<a href="#" onclick="verPreliminar(\''+formatoURL(preliminares[i].ruta)+'\')">';
    		markup += '<img class="ui-li-icon" src="img/pdf-icon.gif" border="0" />';
    		markup += preliminares[i].nombre;
    		markup += '</a>';
    		markup += '<a href="#" onclick="borrarPreliminar('+i+')" data-iconpos="notext"></a>';
    		markup += '</li>';
    		$('#badj_list').append(markup);
    	}
    	$('#badj_list li').trigger('create');
    }
    $('#badj_list').listview('refresh');
}

onDirectoryReadFail = function (error) {
	alert("Failed to list directory contents: " + error.code);
}

onFileRemovalSuccess = function (entry) {
	// Refrescamos la lista de archivos una vez hemos borrado
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
}

onFileRemovalFail = function (error) {
    alert('Error removing file: ' + error.code);
}

var verPreliminar = function (ruta) {
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
	if (iOS) {
		var root = this;
		cb = window.plugins.childBrowser;
		if(cb != null) {
			cb.onLocationChange = function(loc){ root.locChanged(loc); };
			cb.onClose = function(){root.onCloseBrowser(); };
			cb.onOpenExternal = function(){root.onOpenExternal(); };
			cb.showWebPage(ruta);
		}
	} 
	else {
		window.open(ruta, '_blank');
	}
}

var borrarPreliminar = function (i) {
	confirma("BADJ", "Desea borrar este documento?", "Si,No", function (buttonIndex) {
		if (buttonIndex == 1) 
			fileEntries[i].remove(onFileRemovalSuccess, onFileRemovalFail);
	});
}

/*
 * login.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de login que recoge los datos del usuario y los valida
 * en el servidor de Oasis. Si la sesión es correcta, se guardan
 * internamente las credenciales y se muestra el home. De otro modo
 * se muestra un mensaje de error.
 * 
 */

var login = function(empresa, ambiente, usuario, clave, loginConEfecto) {
	// Proceso de logueo. Si es exitoso, se manda a mostrar el home
	oasisVerificaConexion(empresa, ambiente, usuario, clave, function(loginExitoso) {
		if (loginExitoso) { 
			$('#username').html("Usuario: " + window.localStorage.getItem("usuario"));
			crearMenu(loginConEfecto);
        }
        else {
        	// Enviamos diálogo de error
            dialogo("Error", "Usuario y/o clave no existen", "Aceptar", function() {});
        }
    });
}

var crearMenu = function(loginConEfecto) {
	// Cargamos el menú de WebService según el usuario y el ambiente logueados
	oasisConsultaSMEN(function(resultados) {
		var categoriaActual = '';
		$('#menu_list li, #menu_list h3').remove();
		$.each(resultados, function(index, resultado) {
			if (categoriaActual != resultado['nombre_categoria']) {
				$('#menu_list').append('<h3 class="dinamico">'+ resultado['nombre_categoria'] +'</h3>');
				categoriaActual = resultado['nombre_categoria'];
			}
			$('#menu_list').append('<li class="dinamico">' +
                                   '<a href="#'+ resultado['codigo_item'].substring(1) +'" data-transition="slide">' +
                        		   resultado['nombre_item'] +
                                   '</a>' +
                                   '</li>');
		});
		$('#menu_list').append('<h3>General</h3>');
		$('#menu_list').append('<li><a href="#ajustes" data-transition="slide">Configuraci&oacute;n</a></li>');
		$('#menu_list').append('<li><a href="#" id="btn_logout" onclick="logout();">Cerrar Sesi&oacute;n</a></li>');
		$('#menu_list').trigger('create');
			
		// Activamos el scrolling para versiones inferiores de Android
		var androidVersion = parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8));
		if (androidVersion > 0 && androidVersion < 3.2) {
			var menuScroll = new iScroll('menu', {bounce:false, momentum:false});
		}
		if (loginConEfecto) 
            pagina("#home", "flip", false);
        else 
            pagina("#home", "none", false);
	});
}

$("#btn_login").click(function(e) {
	bloquearEvento(e);
	if ($('#usuario').val() && $('#usuario').val() != '' && $('#clave').val() && $('#clave').val() != '') 
		login($('#empresa').val(), $('#ambiente').val(), $('#usuario').val(), $('#clave').val(), true);
	else 
		dialogo("Login", "Digite usuario y clave", "Aceptar", function() {});
});

$(".btn_menu").click(function(e) {
	bloquearEvento(e);
	toggleMenu();
});

$(".btn_home").click(function(e) {
	bloquearEvento(e);
	pagina("#home", "slide", true);
});

/*
 * ajustes.js
 *
 * Creado por: David Sánchez G.
 * Oasis - World Class Software
 *
 * Script de sección de ajustes, que define el procedimiento de 
 * cambio de url de servicio y cierre de sesión
 * 
 */

// Mostramos el nombre, el ambiente logueados actualmente, y la url actual de servicio
$('#ajustes').bind('pagebeforeshow', function(event, ui) {
	bloquearEvento(event);
	$('#ajustes-usuario').html(window.localStorage.getItem("usuario"));
	$('#ajustes-ambiente').html(window.localStorage.getItem("ambiente"));
	if (window.localStorage.getItem("url-ws") != null) 
		$('#ajustes-url-ws').val(window.localStorage.getItem("url-ws"));
	else 
		$('#ajustes-url-ws').val(oasis_default_ws_url);
});

$("#btn_url_restore").click(function(e) {
	bloquearEvento(e);
	$('#ajustes-url-ws').val(oasis_default_ws_url);
	saveUrl(oasis_default_ws_url);
});

$("#ajustes-url-ws").on("change" , function(e) {
	bloquearEvento(e);
	saveUrl($("#ajustes-url-ws").val());
});

$('#ajustes-url-ws').on('blur', function(e) {
	bloquearEvento(e);
    saveUrl($("#ajustes-url-ws").val());
});

var logout = function() {
	$('#usuario').val(window.localStorage.getItem("usuario"));
	$('#clave').val(window.localStorage.getItem("clave"));
	consultarAmbientes(window.localStorage.getItem("ambiente"));
	window.localStorage.clear();
	$('#menu_list li.dinamico, #menu_list h3.dinamico').remove();
	pagina("#login", "flip", true);
}

var saveUrl = function(url) {
	window.localStorage.setItem("url-ws", url);
}
