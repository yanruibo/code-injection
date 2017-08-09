














        var idioma;
        idioma = getIdioma();
        var currentSection = 0;
        var supermercados = new Array();
        var currentSupermercado;
        var poblaciones = new Array();
        var servicios = new Array();
        var ubicacionActual = "";
        var destino;
        var _geolocalizacion = false;
        var height;
        var width;
        var esVertical;
        //Rutas:
        var directionsService = new google.maps.DirectionsService();
        var _latitud;
        var _longitud;

        var traducciones = getTraducciones()
        function init() {
            $('#label_informacion').html(traducciones.supermercados.informacion);
            //$('#label_informacion2').html(traducciones.supermercados.informacion2);
            $('#label_texto_codigo').html(traducciones.supermercados.textoCodigo);
            $('#label_texto_poblacion').html(traducciones.supermercados.textoPoblacion);
            $('#label_texto_ordenar').html(traducciones.supermercados.textoOrdenar);
            $('#label_texto_tiendasCerca').html(traducciones.supermercados.label_texto_tiendasCerca);
            $('#label_buscar > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#lblComoLlegar').html(traducciones.supermercados.comollegar);
            $('#label_buscar_cerca > span > span').filter(":first").html(traducciones.supermercados.buscarCerca);

            //            $('#label_tab_informacion > span > span').filter(":first").html(traducciones.supermercados.tabInformacion);
            $('#label_tab_mapa > span > span').filter(":first").html(traducciones.supermercados.tabMapa);
            $('#label_direccion').html(traducciones.supermercados.direccion);
            $('#label_poblacion').html(traducciones.supermercados.poblacion);
            $('#label_telefono').html(traducciones.supermercados.telefono);
            $('#label_horario').html(traducciones.supermercados.horario);
            $('#label_lunes').html(traducciones.supermercados.lunes);
            $('#label_martes').html(traducciones.supermercados.martes);
            $('#label_miercoles').html(traducciones.supermercados.miercoles);
            $('#label_jueves').html(traducciones.supermercados.jueves);
            $('#label_viernes').html(traducciones.supermercados.viernes);
            $('#label_sabado').html(traducciones.supermercados.sabado);
            $('#label_domingo').html(traducciones.supermercados.domingo);
            $('#label_servicio1').html(traducciones.supermercados.servicio1);
            $('#label_servicio2').html(traducciones.supermercados.servicio2);

            //Menus, siempre igual
            //$('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            loadPoblaciones();
            loadSupermercados();

            document.addEventListener("deviceready", detectPosition(), false);

            //            setHomeName("Menu", false);
        }

        function loadSupermercados(json) {
            if (!json) {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    supermercados = callWS("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
                } else {
                    supermercados = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
                    //supermercados = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
                }
            }
            else {
                supermercados = json;
                detectPosition();
            }
        }

        function loadPoblaciones() {
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                poblaciones = callWS("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
            } else {
                poblaciones = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
                //poblaciones = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
            }
        }

        function printPoblaciones(json) {
            poblaciones = json;
            $.each(poblaciones, function (key, value) {
                $('#poblacion').append($('<option>', { value: key }).text(value.POBLACION));
            });
        }

        function callWS(url, callback) {

            $.ajax({
                type: "POST",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error obteniendo las tiendas: " + msg.responseText);
                }
            });
        }

        function mostrarDetalleSupermercado(msg) {
            var data = eval("(" + msg + ")");
            $.each(data, function (key, val) {
                //alerta(key + " - " + val);
            });
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTab(id) {
            console.log('Hide ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function goBack() {
            console.log("goBack: " + currentSection);

            if (currentSection == 1) {
                if (_geolocalizacion == true) {
                    loadTab("listado");
                    hideTab("detalle");
                    hideTab("geolocalizacion");
                    hideTab("mapa2");
                } else {
                    showSearch();
                }
            }
            else if (currentSection == 0) {
                loadTab("alert")
                document.location.href = 'index.html';
                $('#back-btn').hide();
            }
            else if (currentSection == 2) {
                if (_geolocalizacion == false) {
                    hideTab("listado");
                    loadTab("geolocalizacion");
                    loadTab("mapa2");
                    hideTab("mapa");
                    hideTab("detalle");
                } else {
                    hideTab("listado");
                    hideTab("estadisticas");
                    $('#estadisticas').hide();
                    showMapGeolocalizacion();
                    currentSection = 6;
                }
            }
            else if (currentSection == 3) {
                loadTab("listado");
                hideTab("detalle");
                hideTab("mapa2");
                hideTab("mapa");
                hideTab("geolocalizacion");
                if (_geolocalizacion == false) {
                    console.log('currentSection == 3 y lo ponemos a currentSection = 0');
                    currentSection = 1;
                    //                    setBackName("<img src='img/icon-home.png' />", true);
                } else {
                    showSearch();
                }
            }
            else if (currentSection == 4) {
                $('#detalle').show();
                hideTab("listado");
                hideTab("geolocalizacion");
                hideTab("mapa2");
                hideTab("mapa");
                if (_geolocalizacion == false) {
                    console.log('currentSection == 4 y lo ponemos a currentSection = 3');
                    currentSection = 3;
                } else {
                    //                    currentSection = 0;
                }
            }
            else if (currentSection == 5) {
                loadTab("listado");
                hideTab("geolocalizacion");
                hideTab("mapa2");
                hideTab("detalle");
                currentSection = 2;
            }
            else if (currentSection == 6) {
                //                loadTab("alert")
                //                document.location.href = 'index.html';
                showSearch();
            }
            else if (currentSection == 7) {
                if (_geolocalizacion == true) {
                    hideTab("detalle");
                    $('#detalle').hide();
                    showMapGeolocalizacion();
                    currentSection = 6;
                    $('#back-btn').show();
                    setBackName(traducciones.supermercados.busqueda, false);
                } else {
                    hideTab("listado");
                    $('#listado').hide();
                    loadTab("geolocalizacion");
                    loadTab("mapa2");
                    $('#back-btn').hide();
                }
            }
            else if (currentSection == 8) {
                showMapGeolocalizacion();
            }
            else if (currentSection == 9) {
                showMapGeolocalizacion();
                $('#back-btn').show();
                setBackName(traducciones.supermercados.busqueda, false);
                $('#estadisticas').hide();
                hideTab("estadisticas");
                currentSection = 6;
            }
            else if (currentSection == 10) {
                showSearch();
            }
            else if (currentSection == 11) {
                $('#detalle').show();
                loadTab("detalle");
                hideTab("geolocalizacion");
                hideTab("mapa2");
                currentSection = 9;
            }
            else if (currentSection == 12) {
                $('#detalle').show();
                loadTab("detalle");
                hideTab("geolocalizacion");
                hideTab("mapa2");
                currentSection = 13;
            }
            else if (currentSection == 13) {
                $('#listado').show();
                loadTab("listado");
                $('#detalle').hide();
                hideTab("detalle");
                hideTab("geolocalizacion");
                hideTab("mapa2");
                currentSection = 2;
            }
            else if (currentSection == 14) {
                $('#estadisticas').hide();
                $('#estadisticas').hide();
                showMapGeolocalizacion();
                currentSection = 6;
                $('#back-btn').show();
                setBackName(traducciones.supermercados.busqueda, false);
            }
            else {
                loadTab("alert")
                document.location.href = 'index.html';
            }
            console.log('currentSection ' + currentSection);
        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);

            //hideTab("alert");
            //activado = false;
        }

        //        function setHomeName(name, icon) {
        //            if (!icon) {
        //                $('#home-btn').css('margin-top', 4);
        //            } else {
        //                $('#home-btn').css('margin-top', 1);
        //            }
        //            $('#home-btn > span > span').filter(":first").html(name);
        //        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function showSearch() {
            hideTab("geolocalizacion");
            hideTab("mapa2");

            var activado = false;
            hideTabs();

            loadTab("alert");
            activado = true;

            loadTab("busqueda");
            //            setBackName("<img src='img/icon-home.png' />", true);

            hideTab("alert");
            activado = false;

            currentSection = 0;

            $('#back-btn').hide();
            console.log("showSearch - currentSection " + currentSection);
        }

        function searchShop(geolocalizacion) {
            var activado = false;
            try {
                console.log('searchShop - ' + geolocalizacion);

                //No tiene geolocalización
                if (geolocalizacion == undefined || geolocalizacion == "0") {
                    console.log('searchShop - geolocalizacion' + undefined + ' o 0');
                    loadTab("alert");
                    activado = true;

                    var filteredSupermercados = new Array();
                    var cp = $("#postalCode").val();
                    var poblacion = "";

                    try {
                        poblacion = poblaciones[$("#poblacion").val()].POBLACION;
                    } catch (err) { }

                    $('#shopList').empty();

                    try {
                        calculateDistance();
                    } catch (err) {
                        //alert(err);
                    }

                    try {
                        supermercados.sort(sortDistances);
                    } catch (err) {
                        //alert(err);
                    }

                    if (supermercados != undefined) {
                        for (i = 0; i < supermercados.length; i++) {
                            var supermercado = supermercados[i];

                            if ((supermercado.IDCODIGOPOSTAL == cp || cp == "") && (supermercado.POBLACION == poblacion || poblacion == "")) {
                                if (mostrarPosicion) {
                                    $("#shopList").append('<li><a href="#" onclick="openDetail(' + supermercado.IDTIENDA + ');">' + supermercado.NOMBRE + '<br/><span class="ui-text-list-small">' + supermercado.CALLE + ', ' + supermercado.POBLACION + '<br/>' + supermercado.TELEFONO + '<br/>A ' + supermercado.distancia + supermercado.unidades + ' aprox.</span></a></li>');
                                } else {
                                    $("#shopList").append('<li><a href="#" onclick="openDetail(' + supermercado.IDTIENDA + ');">' + supermercado.NOMBRE + '<br/><span class="ui-text-list-small">' + supermercado.CALLE + ', ' + supermercado.POBLACION + '<br/>' + supermercado.TELEFONO + '</span></a></li>');
                                }
                            }
                        }
                    }

                    $('#shopList').listview("refresh");

                    hideTab("alert");
                    activado = false;

                    //searchShop
                    if (_geolocalizacion == true) {
                        currentSection = 10;
                    } else {
                        currentSection = 1;
                    }

                    $('#back-btn').show();
                    setBackName(traducciones.clientes.btnAtras, false);

                    hideTabs();
                    loadTab("listado");

                } else {
                    //Tiene geolocalización activo.
                    showMapGeolocalizacion();
                    currentSection = 6;
                }

                console.log("searchShop - currentSection " + currentSection);



            } catch (err) {
                if (activado) {
                    hideTab("alert");
                }
            }
        }

        //Inicio carga imagenes
        function loadServiciosSupermercado(shopId) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    servicios = callWSImagenes("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
                } else {
                    servicios = callWSImagenes("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
                    //servicios = callWSImagenes("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
                }
            } catch (err) {
                hideTab("alert");
            }
        }
        //Obtenemos los nombres e imágenes de las secciones de las tiendas.
        function showServicios(json) {
            try {
                var imag = "";
                var texto = "";
                servicios = json;

                $("#serviciosSupermercados").html("");
                if (servicios != undefined) {
                    //$("#serviciosSupermercados").append("<table>");
                    for (i = 0; i < servicios.length; i++) {
                        var servicio = servicios[i];
                        imag = displayImage(servicio.IMAGENSTRING);
                        texto = servicio.DESCRIPCION.toLowerCase();
                        switch (texto) {
                            case "carne":
                                texto = traducciones.supermercados.carne;
                                break;
                            case "xarcu":
                                texto = traducciones.supermercados.xarcu;
                                break;
                            case "pan":
                                texto = traducciones.supermercados.pan;
                                break;
                            case "fruta":
                                texto = traducciones.supermercados.fruta;
                                break;
                            case "cafeteria":
                                texto = traducciones.supermercados.cafeteria;
                                break;
                            case "pescado":
                                texto = traducciones.supermercados.pescado;
                                break;
                            case "parking":
                                texto = traducciones.supermercados.parking;
                                break;
                        }
                        if (imag != "") {
                            if (i == 0) {
                                $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                            } else {
                                if (i == servicios.length) {
                                    $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                    $("#serviciosSupermercados").append("</tr>");
                                } else {
                                    //&& y
                                    //|| or
                                    //Si se está visualizando con Pc o Mac mostramos todos los servicios en una misma fila.
                                    if (navigator.platform.toLowerCase() == "win32" || navigator.platform.toLowerCase() == "macintel") {
                                        if (i == servicios.length - 1) {
                                            $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                            $("#serviciosSupermercados").append("</tr>");
                                        } else {
                                            $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                        }
                                    } else {
                                        //Si es dispositivo móvil cada 4 picos montamos una fila nueva.
                                        if (i == 4 || i == 8) {
                                            $("#serviciosSupermercados").append("<tr>");
                                            $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                        }
                                        else if (i == servicios.length) {
                                            $("#serviciosSupermercados").append("<tr>");
                                            $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                        } else {
                                            if (i == servicios.length) {
                                                $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                                $("#serviciosSupermercados").append("</tr>");
                                            } else {
                                                $("#serviciosSupermercados").append("<td align='center'>" + imag + "<br>" + texto + "</td>");
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            alert("Sin imagen");
                        }
                    }
                    //$("#serviciosSupermercados").append("</table>");
                }
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function displayImage(base64Data) {
            var imag = "<img src='" + "data:image/jpg;base64," + base64Data + "'/>";
            return imag;
        };

        function callWSImagenes(url, idTienda, callback) {
            $.ajax({
                type: "POST",
                url: url,
                data: "{'idTienda': '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);

                }
            });
        }
        //Fin carga imagenes

        function getSupermercadoWithId(shopId) {
            for (i = 0; i < supermercados.length; i++) {
                supermercado = supermercados[i];
                if (supermercado.IDTIENDA == shopId) {
                    return supermercado;
                }
            }
        }

        function openDetail(shopId, current) {
            try {
                hideTabs();

                loadTab("alert");

                showDetail();
                loadServiciosSupermercado(shopId);

                var supermercado = getSupermercadoWithId(shopId);
                currentSupermercado = supermercado;

                console.log("Detail: " + supermercado.CALLE);
                loadTab("detalle");

                $('#back-btn').show();

                $('#direccionSupermercado').text(supermercado.CALLE);
                $('#poblacionSupermercado').text(supermercado.POBLACION);
                $('#codigoPostalSupermercado').text(supermercado.IDCODIGOPOSTAL + " - ");
                $('#horarioSupermercado').text();
                $('#serviciosSupermercados').text();
                $('#telefonoSupermercado').html("<a href='tel:" + supermercado.TELEFONO + "'>" + supermercado.TELEFONO + "</a>");
                $('#horarioLunes').html(supermercado.HORARIOL1 + '<br />' + supermercado.HORARIOL2);
                $('#horarioMartes').html(supermercado.HORARIOM1 + '<br />' + supermercado.HORARIOM2);
                $('#horarioMiercoles').html(supermercado.HORARIOX1 + '<br />' + supermercado.HORARIOX2);
                $('#horarioJueves').html(supermercado.HORARIOJ1 + '<br />' + supermercado.HORARIOJ2);
                $('#horarioViernes').html(supermercado.HORARIOV1 + '<br />' + supermercado.HORARIOV2);
                $('#horarioSabado').html(supermercado.HORARIOS1 + '<br />' + supermercado.HORARIOS2);
                $('#horarioDomingo').html(supermercado.HORARIOD1 + '<br />' + supermercado.HORARIOD2);
                //Si no tiene geolocalización y ha dado acceso a la búsqueda de tu posición.activo no mostramos el link de "como llegar..."
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $('#lblComoLlegar').html("<a href='#' onclick='calcularRuta(" + supermercado.LATITUD + "," + supermercado.LONGITUD + "," + "1,1" + ")'>" + traducciones.supermercados.comollegar + "</a>");
                    }, function (error) {
                        //Aquí salta si le no ha aceptado que se controle tu ubicación.
                        $('#lblComoLlegar').html("<a href='#' onclick='showMap();'>" + traducciones.supermercados.tabMapa + "</a>");
                    });
                } else {
                    $('#lblComoLlegar').html("<a href='#' onclick='showMap();'>" + traducciones.supermercados.tabMapa + "</a>");
                }

                //OpenDetail
                if (_geolocalizacion == true) {
                    if (currentSection == 6) {
                        currentSection = 7;
                    } else {
                        currentSection = 5;
                    }

                } else {
                    currentSection = 3;
                }
                setBackName(traducciones.clientes.btnAtras, false);
                console.log("OpenDetail - currentSection " + currentSection);

            } catch (err) {
                hideTab("alert");
            }
        }

        function showMap() {
            $('#detalle').hide();
            loadTab("mapa");
            // Tamańo del Mapa
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            y = y - 150;
            y = y + 'px';

            $('#map_canvas').gmap('destroy');

            $('#map_canvas').height(y);
            //            $('#mapa').show();

            posicion = currentSupermercado.LATITUD + "," + currentSupermercado.LONGITUD;

            $('#map_canvas').gmap({ 'zoom': 15, 'center': posicion }).bind('init', function (evt, map) {
                $('#map_canvas').gmap('addMarker', { 'position': posicion, 'bounds': false });
            });

            console.log(y)

            //showMap
            if (_geolocalizacion == false) {
                currentSection = 4;
            }

            console.log("showMap - currentSection: " + currentSection);
        }

        function calcularRuta(latitud, longitud, modo, current) {
            //1: Conduciendo.
            //0: Caminando.
            loadTab("alert");
            hideTab("detalle");
            hideTab("busqueda");
            loadTab("geolocalizacion");
            loadTab("mapa2");

            if (modo == "1") {
                modo = google.maps.TravelMode.DRIVING
            } else {
                modo = google.maps.TravelMode.WALKING
            }
            var opciones = {
                suppressMarkers: false, //Para suprimir los iconos de "A" y "B".
                draggable: false //Para que puedas arrastrar y modificar la búsqueda.
            }

            //Activo el label para mostrar los km y tiempo.
            $("#estadisticas").show();

            directionsDisplay = new google.maps.DirectionsRenderer(opciones);

            var mapOptions = {
                //                zoom: 12, //No muestro zoom porque lo coge automaticamente.
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: ubicacionActual
            }
            var request = {
                origin: ubicacionActual,
                destination: latitud + "," + longitud,
                travelMode: modo
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $("#estadisticas").html("");
                    $("#estadisticas").append(traducciones.comun.distancia + ": " + redondeo2decimales(response.routes[0].legs[0].distance.value / 1000) + " km / " + traducciones.comun.tiempo + ": " + segundos_a_horas(response.routes[0].legs[0].duration.value));
                    directionsDisplay.setDirections(response);
                }
            });
            mapCalcularRuta = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);
            directionsDisplay.setMap(mapCalcularRuta);

            setBackName(traducciones.clientes.btnAtras, false);

            inicializarBotonEstadisticas(mapCalcularRuta, latitud, longitud);

            hideTab("alert");

            //calcularRuta
            if (currentSection == 5) {
                currentSection = 12;
            }
            if (currentSection == 7) {
                currentSection = 11;
            }
            if (currentSection == 6) {
                currentSection = 14;
                $("#back-btn").show();
            }

            console.log("current calcularRuta: " + currentSection);
        }

        function inicializarBotonEstadisticas(mapa, latitud, longitud) {
            var mapDiv = document.getElementById('map_canvas2');

            var homeControlDiv = document.createElement('div');
            var homeControl = new crearControlEstadisticas(homeControlDiv, mapa, latitud, longitud);

            homeControlDiv.index = 1;
            mapa.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(homeControlDiv);
        }

        function crearControlEstadisticas(controlDiv, mapa, latitud, longitud) {
            controlDiv.style.padding = '5px';

            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = 'White';
            controlUI.style.borderStyle = 'solid';
            controlUI.style.paddingTop = '5px';
            controlUI.style.paddingBottom = '5px';
            controlUI.style.paddingRight = '5px';
            controlUI.style.paddingLeft = '5px';
            controlUI.style.borderWidth = '1px';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = traducciones.supermercados.coche;
            controlDiv.appendChild(controlUI);

            var controlUI2 = document.createElement('div');
            controlUI2.style.backgroundColor = 'White';
            controlUI2.style.borderStyle = 'solid';
            controlUI2.style.paddingTop = '5px';
            controlUI2.style.paddingBottom = '5px';
            controlUI2.style.paddingRight = '5px';
            controlUI2.style.paddingLeft = '5px';
            controlUI2.style.borderWidth = '1px';
            controlUI2.style.cursor = 'pointer';
            controlUI2.style.textAlign = 'center';
            controlUI2.title = traducciones.supermercados.caminando;
            controlDiv.appendChild(controlUI2);

            var controlText = document.createElement('div');
            controlText.style.fontFamily = 'Arial,sans-serif';
            controlText.style.fontSize = '12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = traducciones.supermercados.coche;
            controlUI.appendChild(controlText);

            var controlText2 = document.createElement('div');
            controlText2.style.fontFamily = 'Arial,sans-serif';
            controlText2.style.fontSize = '12px';
            controlText2.style.paddingLeft = '4px';
            controlText2.style.paddingRight = '4px';
            controlText2.innerHTML = traducciones.supermercados.caminando;
            controlUI2.appendChild(controlText2);

            google.maps.event.addDomListener(controlUI, 'click', function () {
                $('#estadisticas').show();
                calcularRuta(latitud, longitud, "1")
            });

            google.maps.event.addDomListener(controlUI2, 'click', function () {
                $('#estadisticas').show();
                calcularRuta(latitud, longitud, "0")
            });
        }

        function showLocation(position) {
            _latitud = position.coords.latitude;
            _longitud = position.coords.longitude;
        }

        function getLocation(latitud, longitud) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showLocation);
            }
        }

        function pintarTiendas(ubicacion) {
            var hayTiendasCercanas = new Boolean();

            calculateDistanceSupers(0);

            var myOptions = {
                zoom: 12,
                center: ubicacion,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var mapa = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);

            try {
                calculateDistance();
            } catch (err) {
            }
            try {
                supermercados.sort(sortDistances);
            } catch (err) {
            }

            $('#shopList').empty();

            for (var i = 0; i < supermercados.length; i++) {
                var supermercado = supermercados[i];
                distancia = calculateDistanceSupers(supermercado);
                distancia = redondeo2decimales(distancia / 1000);

                if (distancia < 5) {
                    hayTiendasCercanas = true;
                    marcarPosicionTienda(mapa, supermercado.LATITUD, supermercado.LONGITUD, supermercado.CALLE, "<p style='font-size: 12px; font-family: Tahoma; color: black;'><a href='#' onclick='openDetail(" + supermercado.IDTIENDA + ", 1)'>" + supermercado.CALLE + '</a><br>' + "<a href='tel:" + supermercado.TELEFONO + "'>" + supermercado.TELEFONO + '</a><br>' + supermercado.POBLACION + ", " + supermercado.IDCODIGOPOSTAL + "<br><a href='#' onclick='calcularRuta(" + supermercado.LATITUD + "," + supermercado.LONGITUD + "," + "1" + ")'>" + traducciones.supermercados.comollegar + "</a></p>", i);
                    $("#shopList").append('<li><a href="#" onclick="openDetail(' + supermercado.IDTIENDA + ');">' + supermercado.NOMBRE + '<br/><span class="ui-text-list-small">' + supermercado.CALLE + ', ' + supermercado.POBLACION + '<br/>' + supermercado.TELEFONO + '<br/>A ' + distancia + supermercado.unidades + ' aprox.</span></a></li>');
                    if (i == 4) {
                        i = supermercados.length;
                    }
                }
            }
            $('#shopList').listview("refresh");

            if (hayTiendasCercanas == false) {
                //              alert("No hay supers a menos de 5km.");
                loadTab("busqueda");
                hideTab("detalle");
                hideTab("geolocalizacion");
                hideTab("mapa2");
            } else {
                //Posiciono donde está el móvil, pc, etc...
                marcarMiPosicion(mapa, ubicacion, '', '');
                initializeControlListado(mapa);
            }
        }

        function marcarPosicionTienda(mapa, lat, lng, tooltip, dialogo, i) {
            var marcaLatlng = new google.maps.LatLng(lat, lng);
            var myMarker = new google.maps.Marker({
                position: marcaLatlng,
                map: mapa,
                //                animation: google.maps.Animation.DROP,
                icon: 'img/iconoTienda.png',
                //                zIndex: i,
                //                title: tooltip + " - " + i
                title: tooltip
            });

            var myInfowindow = new google.maps.InfoWindow({ content: dialogo });

            google.maps.event.addListener(mapa, 'click', function () {
                myInfowindow.close();
            });

            google.maps.event.addListener(myMarker, 'click', function () {
                if (myInfowindow.getMap()) {
                    myInfowindow.close();
                }
                else {
                    myInfowindow.setContent(dialogo);
                    myInfowindow.open(mapa, myMarker);
                }
            });
        }

        function marcarMiPosicion(mapa, ubicacion, title, content) {
            var marcaLatlng = new google.maps.LatLng(_latitud, _longitud);
            var myMarker = new google.maps.Marker({
                position: marcaLatlng,
                map: mapa,
                title: title
            });

            var myInfowindow = new google.maps.InfoWindow({
                content: content
            });
        }

        function showMapGeolocalizacion() {
            loadTab("alert");
            hideTab("detalle");
            hideTab("busqueda");
            loadTab("geolocalizacion");
            loadTab("mapa2");
            // Medidas del Mapa
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            y = y - 80;
            y = y + 'px';

            $('#map_canvas2').height(y);
            //            $('#mapa2').show();


            $('#back-btn').show();
            setBackName(traducciones.supermercados.busqueda, false);

            hideTab("alert");
            pintarTiendas(ubicacionActual);
        }

        function initializeControlListado(map) {
            var mapDiv = document.getElementById('map_canvas2');
            var mapOptions = {
                zoom: 12,
                center: ubicacionActual,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            //map = new google.maps.Map(mapDiv, mapOptions);

            var homeControlDiv = document.createElement('div');
            var homeControl = new ControlListado(homeControlDiv, map);

            homeControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(homeControlDiv);
        }

        function ControlListado(controlDiv, map) {
            controlDiv.style.padding = '5px';

            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = 'White';
            controlUI.style.borderStyle = 'solid';
            controlUI.style.paddingTop = '5px';
            controlUI.style.paddingBottom = '5px';
            controlUI.style.paddingRight = '5px';
            controlUI.style.paddingLeft = '5px';
            controlUI.style.borderWidth = '1px';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = traducciones.supermercados.listadotiendas;
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('div');
            controlText.style.fontFamily = 'Arial,sans-serif';
            controlText.style.fontSize = '12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = '<strong>' + traducciones.supermercados.listado + '</strong>';
            controlUI.appendChild(controlText);

            google.maps.event.addDomListener(controlUI, 'click', function () {
                $('#back-btn').show();
                setBackName(traducciones.clientes.btnAtras, false);
                hideTab("mapa2");
                loadTab("listado");
                console.log("ControlListado currentSection = 2");
                currentSection = 2;
            });
        }

        function showDetail() {
            $('#sorliul li a').removeClass("ui-btn-active");
            $('#detalle').show();
            $('#sorliul li:first a').addClass("ui-btn-active");
            hideTab("mapa");
            hideTab("mapa2");
        }

        function detectPosition() {
            try {
                if (navigator.geolocation) {
                    //Si tiene habilitada la geolocalización.
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $('#back-btn').hide();
                        _geolocalizacion = true;
                        checkPositionGeolocalizacion(position);
                        searchShop(1);
                    }, function (error) {
                        //Si tiene geolocalización, pero deniega el acceso.
                        _geolocalizacion = false;
                        showSearch();
                    });
                } else {
                    //Si no tiene geolocalización, salta por éste sitio.
                    _geolocalizacion = false;
                    showSearch();
                }
            } catch (error) {
                _geolocalizacion = false;
                showSearch();
            }
        }

        var position = new Object();
        position.latitud = 0.0;
        position.longitud = 0.0;

        var mostrarPosicion = false;

        function checkPosition(p) {
            position.latitud = p.coords.latitude;
            position.longitud = p.coords.longitude;
            mostrarPosicion = true;
            showSearch();
        }

        function checkPositionGeolocalizacion(p) {
            position.latitud = p.coords.latitude;
            position.longitud = p.coords.longitude;
            mostrarPosicion = true;
        }

        function calculateDistance() {
            var i = 0;
            if (position.latitud != 0 || position.longitud != 0) {
                var supermercado;
                var distancia;
                for (i = 0; i < supermercados.length; i++) {
                    supermercado = supermercados[i];
                    distancia = calculateDistanceSupers(supermercado);
                    distancia = distancia / 1000;
                    supermercados[i].unidades = "Km";
                    supermercados[i].distancia = Math.round(distancia * 100) / 100;
                }
            }
        }

        function sortDistances(super1, super2) {
            return super1.distancia - super2.distancia;
        }

        function sortNames(super1, super2) {
            return super1.NOMBRE.localeCompare(super2.NOMBRE);
        }

        function calculateDistanceSupers(supermercado) {
            var distancia = -1;

            try {
                var glatlng1 = new google.maps.LatLng(position.latitud, position.longitud);
                var glatlng2 = new google.maps.LatLng(supermercado.LATITUD, supermercado.LONGITUD);
                distancia = google.maps.geometry.spherical.computeDistanceBetween(glatlng1, glatlng2);
                ubicacionActual = glatlng1
                _latitud = position.latitud
                _longitud = position.longitud
            }
            catch (error) {

            }
            return distancia;
        }

        function redondeo2decimales(numero) {
            var original = parseFloat(numero);
            var resultado = Math.round(original * 100) / 100;
            return resultado;
        }

        function segundos_a_horas(tiempo) {
            var horas = Math.floor(tiempo / 3600);
            var minutos = Math.floor((tiempo % 3600) / 60);
            tiempo = tiempo % 60;
            if (tiempo < 10) sec = "0" + tiempo;
            if (minutos < 10) minutos = "0" + minutos;
            return horas + "h:" + minutos + "m";
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var currentSection = 0;
        var oficinas = new Array();
        var currentOficina;

        $('#shopList').listview("refresh");

        var traducciones = getTraducciones()
        function init() {

            $('#lblTextoPrincipal').html(traducciones.contacto.lblTextoPrincipal);
            $('#label_buscar > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#label_buscar_cerca > span > span').filter(":first").html(traducciones.supermercados.buscarCerca);

            $('#label_tab_informacion > span > span').filter(":first").html(traducciones.supermercados.tabInformacion);
            $('#label_tab_mapa > span > span').filter(":first").html(traducciones.supermercados.tabMapa);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            $('#back-btn').hide();
//            setHomeName("Menu", false);
            loadOficinas();

            //setTimeout(function () { searchShop() }, 100);
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }
        
//        function setHomeName(name, icon) {
//            if (!icon) {
//                $('#home-btn').css('margin-top', 4);
//            } else {
//                $('#home-btn').css('margin-top', 1);
//            }
//            $('#home-btn > span > span').filter(":first").html(name);
//        }

        function loadOficinas(json) {
            try {
                if (!json) {
                    loadTab("alert");
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        oficinas = callWS("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerOficinas_APP", idiomaBisman(idioma), loadOficinas);
                    } else {
                        oficinas = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerOficinas_APP", idiomaBisman(idioma), loadOficinas);
                    }
                }
                else {
                    oficinas = json;
                    hideTab("alert");
                }
                searchShop();
            } catch (err) {
                hideTab("alert");
            }
        }

        function callWS(url, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //                data: "{}",
                data: "{'idioma': '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error obteniendo las tiendas: "+msg);
                }
            });
        }

        function mostrarDetalleOficina(msg) {
            var data = eval("(" + msg + ")");
            $.each(data, function (key, val) {
                //alerta(key + " - " + val);
            });
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTab(id) {
            console.log('Hide ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function goBack() {
            $('#back-btn').hide();
            console.log("back: " + currentSection);

            if (currentSection == 1) { showSearch(); }
            else if (currentSection == 2) { searchShop(); }
            else { loadTab("alert"); document.location.href = 'index.html'; }
        }

        function setBackName(name, icon) {
//            if (!icon) {
//                $('#back-btn').css('margin-top', 4);
//            } else {
//                $('#back-btn').css('margin-top', 1);
//            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function showSearch() {
            hideTabs();

            console.log("Search");
            loadTab("busqueda");
//            setBackName("<img src='img/icon-home.png' />", true);
//            $('#back-btn').show();

            currentSection = 0;
        }

        function searchShop() {
            console.log("Search");

            $('#shopList').empty();

            for (i = 0; i < oficinas.length; i++) {
                var oficina = oficinas[i];

                if (oficina.IDTIENDA > 0) {
                    if (oficina.IDTIENDA == 100) {
                        if (oficina.POBLACION == "") {
                            $("#shopList").append('<li><a href="#" onclick="">' + oficina.NOMBRE + '<br/><span class="ui-text-list-small">' + oficina.TELEFONO + '<br/>' + oficina.CP + ' ' + oficina.PROVINCIA + '</span></a></li>');
                        } else {
                            $("#shopList").append('<li><a href="#" onclick="">' + oficina.NOMBRE + '<br/><span class="ui-text-list-small">' + oficina.TELEFONO + '<br/>' + oficina.CP + ' ' + oficina.PROVINCIA + ' (' + oficina.POBLACION + ')' + '</span></a></li>');
                        }
                    } else {
                        if (oficina.POBLACION == "") {
                            $("#shopList").append('<li><a href="#" onclick="openDetail(' + oficina.IDTIENDA + ');">' + oficina.NOMBRE + '<br/><span class="ui-text-list-small">' + oficina.DIRECCION2 + '<br/>' + oficina.CP + ' ' + oficina.PROVINCIA + '</span></a></li>');
                        } else {
                            $("#shopList").append('<li><a href="#" onclick="openDetail(' + oficina.IDTIENDA + ');">' + oficina.NOMBRE + '<br/><span class="ui-text-list-small">' + oficina.DIRECCION2 + '<br/>' + oficina.CP + ' ' + oficina.PROVINCIA + ' (' + oficina.POBLACION + ')' + '</span></a></li>');
                        }
                    }
                   
                }
            }
            $('#shopList').listview("refresh");

            hideTabs();
            loadTab("listado");

//            $('#back-btn').show();
//            setBackName("<img src='img/icon-home.png' />", true);
            //setBackName(traducciones.supermercados.busqueda, false);

            currentSection = 0;
        }

        function getOficinaWithId(shopId) {
            for (i = 0; i < oficinas.length; i++) {
                oficina = oficinas[i];
                if (oficina.IDTIENDA == shopId) {
                    return oficina;
                }
            }
        }

        function openDetail(shopId) {
            hideTabs();

            showDetail();

            var oficina = getOficinaWithId(shopId);
            currentOficina = oficina;

            if (shopId != "100") {
                $('#mapa').show();
                $('#map_canvas').show();
                showMap(shopId);
            } else {
                $('#map_canvas').hide();
                $('#mapa').hide();
            }

            console.log("Detail: " + oficina.IDTIENDA);
            loadTab("detalle");

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            $('#direccionOficina').text(oficina.DIRECCION1);
            $('#direccionOficina2').text(oficina.DIRECCION2);
            $('#codigoPostalOficina').text(oficina.CP + ' - ');
            $('#provinciaOficina').text(oficina.PROVINCIA);
            if (oficina.FAX != "") {
                $('#telefonoFaxOficina').html("<a href='tel:" + oficina.TELEFONO + "'>" + oficina.TELEFONO + "</a> / Fax: " + oficina.FAX);
            } else {
                $('#telefonoFaxOficina').html("<a href='tel:" + oficina.TELEFONO + "'>" + oficina.TELEFONO + "</a>");
            }
            $('#email').html("<a href='mailto:" + oficina.email + "'>" + oficina.EMAIL);
            currentSection = 2;
        }

        function showMap(shopId) {
            // Viewport sizes
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            y = y - 175;
            y = y + 'px';

            currentOficina == shopId;

            $('#map_canvas').gmap('destroy');

            $('#map_canvas').height(y);
            $('#mapa').show();

            posicion = currentOficina.LATITUD + "," + currentOficina.LONGITUD;

            $('#map_canvas').gmap({ 'zoom': 15, 'center': posicion }).bind('init', function (evt, map) {
                $('#map_canvas').gmap('addMarker', { 'position': posicion, 'bounds': false });
            });
            console.log(y);
        }

        function showDetail() {
            $('#sorliul li a').removeClass("ui-btn-active");
            $('#detalle').show();
            $('#sorliul li:first a').addClass("ui-btn-active");
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var menusArray = new Array();

        var traducciones = getTraducciones()
        function init() {

            hideTab("alert");

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            $('#back-btn').hide();
//            setHomeName("Menu", false);
            Inicio();
        }

//        function setHomeName(name, icon) {
//            if (!icon) {
//                $('#home-btn').css('margin-top', 4);
//            } else {
//                $('#home-btn').css('margin-top', 1);
//            }
//            $('#home-btn > span > span').filter(":first").html(name);
//        }

        function ocultarTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).hide();
        }

        function Inicio() {
            hideTabs();

            console.log("Search");
            loadTab("menus");
            //            loadMenus();
            showMenus();
            ocultarTab("alerta");
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'index.html';
        }

        function hideTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        //        function loadMenus() {
        //            menusArray = callWSMenus("http://www.sorlidiscau.mobi/redessocialesws.asmx/ObtenerRedesSociales_APP", idiomaBisman(idioma), showMenus);
        //        }

        function callWSMenus(url, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //                data: "{}",
                data: "{'idioma': '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error obteniendo las tiendas: " + msg.responseText);
                }
            });
        }

        function showMenus(json) {
            //            menusArray = json;

            //            var imag = "";
            //            $('#shopMenus').empty();

            //            for (i = 0; i < menusArray.length; i++) {
            //                var menus = menusArray[i];
            //                imag = displayImage(menus.IMAGEN);
            //                $("#opciones").append('<tr onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(' + menus.IDOPCION + ');">' + imag + '</a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(' + menus.IDOPCION + ');"><b>' + menus.TITULO + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(' + menus.IDOPCION + ');">' + menus.DESCRIPCION + '</a></span></td></tr>');
            //            }
            $("#opciones").append('<tr onclick="openDetail(1);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(1);"><img class="imagen-menuIndex" src="img/facebook.png" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(1);"><b>' + traducciones.redes.facebook + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(1);">' + traducciones.redes.facebookdescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(2);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(2);"><img class="imagen-menuIndex" src="img/twitter.png" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(2);"><b>' + traducciones.redes.twitter + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(2);">' + traducciones.redes.twitterdescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(3);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(3);"><img class="imagen-menuIndex" src="img/youtube.png" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(3);"><b>' + traducciones.redes.youtube + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(3);">' + traducciones.redes.youtubedescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(4);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(4);"><img class="imagen-menuIndex" src="img/blog.png" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(4);"><b>' + traducciones.redes.blog + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(4);">' + traducciones.redes.blogdescripcion + '</a></span></td></tr>');
            //            $('#shopMenus').listview("refresh");
        }

        function displayImage(base64Data) {
            var imag = "<img class='imagen-menuIndex' src='" + "data:image/png;base64, " + base64Data + "'  />";
            return imag;
        };

        function openDetail(idOpcion) {
            if (idOpcion == "1") {
                window.open('https://www.facebook.com/sorlidiscau', target = "_blank");
            } else if (idOpcion == "2") {
                window.open('https://twitter.com/#!/Sorli_Discau', target = "_blank");
            } else if (idOpcion == "3") {
                window.open('http://www.youtube.com/channel/UCFSSgZmN3Hy_9kO0o9mnYvw', target = "_blank");
            } else if (idOpcion == "4") {
                window.open('http://blog.sorlidiscau.es/~sorli/', target = "_blank");
            }
        }


    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    






        function pp() {
            $('#kk').loading();
        }
//        $(function () {
//            $("#kk").loading(5);
//            $("#draggable").draggable({ revert: true });
//            $("#draggable2").draggable({ revert: true, helper: "clone" });
//        });
    









        document.addEventListener("deviceready", notificaciones, false);

        function notificaciones() {
            try {
                pushNotification = window.plugins.pushNotification;
            } catch (e) {
                alert("**** Notificaciones Error pushNotification: " + e);
            }
            try {
                if (device.platform == 'android' || device.platform == 'Android') {
                    pushNotification.register(successHandler, errorHandler, { "senderID": "160232282146", "ecb": "onNotificationGCM" });
                } else {
                    pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
                }
            } catch (e) {
                alert(e);
            }
        }

        function successHandler(result) {
            //		    idCliente = obtenerVariable("idCliente");
            //          alert("textoSucess: " + result);
            //          $("#textoSucess").html(result);
            //		    if (idCliente == 0 || idCliente == null | idCliente == 'undefined') {
            //		        idCliente = 0;
            //		    }
            //          loadRegistroMovil(0, result, idCliente);
            //document.location.href = "home.html";
        }

        function errorHandler(error) {
            $("#textoSucess").html(error);
        }

        function tokenHandler(result) {
            $("#textoToken").html(result);
        }

    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var aliasCliente;
        var currentSection = 0;
        var comprasArray = new Array();
        var lineasCompras = ""
        var idAccionidTicket;

        var traducciones = getTraducciones()
        function init() {
            $('#label_buscar > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#label_cuatrimestre').html(traducciones.clientes.cuatrimestre);
            $('#lblCuatrimestre').html(traducciones.clientes.cuatrimestre);
            $('#lblAnyo').html(traducciones.clientes.anyo);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            var fecha = new Date();
            console.log("Anyo: " + fecha.getFullYear());

            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));
            idCliente = obtenerVariable("idCliente");

            console.log("numeroSuperMaduixa: " + numeroSuperMaduixa + " aliasCliente: " + aliasCliente + " idCliente: " + idCliente);
            hideTab("alert");
            //            loadObtenerCompras();

            idCliente = obtenerVariable("idCliente");

            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                document.location.href = "espai_client.html";
            } else {
                try {
                    idAccionidTicket = getQuerystring("idAccionidTicket");

                    if (idAccionidTicket == 0 || idAccionidTicket == null || idAccionidTicket == 'undefined') {
                        loadTab("datos");
                    } else {

                        hideTab("datos");
                        idTienda = idAccionidTicket.substring(0, 3);
                        numeroCaja = idAccionidTicket.substring(3, 7);
                        anyo = "20" + idAccionidTicket.substring(7, 9);
                        mes = idAccionidTicket.substring(9, 11);
                        dia = idAccionidTicket.substring(11, 13);
                        ticket = idAccionidTicket.substring(13, 17);
                        openDetail(idCliente, idTienda, "0", anyo + mes + dia, 0, numeroCaja, ticket);
                    }
                } catch (err) {
                    //alert(err);
                }
            }
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function goBack() {
            console.log("back: " + currentSection);

            if (currentSection == 2) {
                hideTab("listacompras");
                loadTab("compras");
                currentSection = 1;
                $("#lblLineasCompra").html("");
            }
            else if (currentSection == 1) {
                hideTab("listacompras");
                hideTab("compras");
                loadTab("datos");
                currentSection = 0;
            }
            else if (currentSection == 0) {
                document.location.href = 'espai_client.html';
            }
            else {
                document.location.href = 'espai_client.html';
            }
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).hide();
        }

        function loadObtenerCompras() {
            try {
                if (cmbCuatrimestre.value > 0 && cmbAnyo.value > 0) {
                    loadTab("alert");
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        if (cmbCuatrimestre.value == 1) {
                            comprasArray = callWSObtenerCompras("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0101", cmbAnyo.value + "0430", showObtenerCompras);
                        } else if (cmbCuatrimestre.value == 2) {
                            comprasArray = callWSObtenerCompras("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0501", cmbAnyo.value + "0831", showObtenerCompras);
                        } else {
                            comprasArray = callWSObtenerCompras("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0901", cmbAnyo.value + "1231", showObtenerCompras);
                        }
                    } else {
                        if (cmbCuatrimestre.value == 1) {
                            comprasArray = callWSObtenerCompras("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0101", cmbAnyo.value + "0430", showObtenerCompras);
                        } else if (cmbCuatrimestre.value == 2) {
                            comprasArray = callWSObtenerCompras("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0501", cmbAnyo.value + "0831", showObtenerCompras);
                        } else {
                            comprasArray = callWSObtenerCompras("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerPreticketsCliente_APP", idCliente, cmbAnyo.value + "0901", cmbAnyo.value + "1231", showObtenerCompras);
                        }
                    }
                } else {
                    alerta(traducciones.clientes.faltaCuatrimestreAnyo);
                }

            } catch (err) {
                hideTab("alert");
            }
        }

        function callWSObtenerCompras(url, idCliente, fechaDesde, fechaHasta, callback) {
            console.warn("url: " + url + " idCliente: " + idCliente + " fechaDesde: " + fechaDesde + " fechaHasta: " + fechaHasta);
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idCliente: '" + idCliente + "'," + "fechaDesde: '" + fechaDesde + "'," + "fechaHasta: '" + fechaHasta + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.warn("ERROR: " + msg.responseText);
                    console.warn("textStatus : " + textStatus);
                    console.warn("errorThrown : " + errorThrown);
                }
            });
        }

        function showObtenerCompras(json) {
            console.warn("showObtenerCompras");
            comprasArray = json;

            $('#shopCompras').empty();

            hideTab("alert");

            if (comprasArray.length > 0) {
                var totalCompras = 0;
                var totalDescuentoCompras = 0;
                hideTabs();
                hideTab("datos");
                loadTab("compras");
                var fecha;
                for (i = 0; i < comprasArray.length; i++) {
                    var compras = comprasArray[i];
                    totalCompras = totalCompras + compras.TOTAL;
                    totalDescuentoCompras = totalDescuentoCompras + compras.IMPORTEDCTODIFERIDO;
                    fecha = new String(compras.FECHA);
                    try {
                        if (compras.IMPORTEDCTODIFERIDO == 0) {
                            $("#shopCompras").append('<li><a href="#" onclick="openDetail(' + idCliente + "," + compras.IDTIENDA + "," + "'" + compras.PERIODOVENTA + "'" + "," + compras.FECHA + "," + compras.IDPRETICKET + "," + compras.NUMEROCAJA + "," + compras.IDTICKET + ');"><span class="ui-text-list-pequenyo" style="color:#DB166D;">' + compras.NOMBRETIENDA + '</span><br/><span class="ui-text-list-small">' + traducciones.clientes.fecha + " " + Right(fecha, 2) + "/" + Mid(fecha, 5, 2) + "/" + Left(fecha, 4) + " " + traducciones.clientes.hora + " " + compras.HORA.substring(0, 2) + ":" + compras.HORA.substring(2, 4) + '</span><br/><span class="ui-text-list-small"> Total: ' + compras.TOTAL.toFixed(2) + "" + '</span></a></li>');
                        } else {
                            $("#shopCompras").append('<li><a href="#" onclick="openDetail(' + idCliente + "," + compras.IDTIENDA + "," + "'" + compras.PERIODOVENTA + "'" + "," + compras.FECHA + "," + compras.IDPRETICKET + "," + compras.NUMEROCAJA + "," + compras.IDTICKET + ');"><span class="ui-text-list-pequenyo" style="color:#DB166D;">' + compras.NOMBRETIENDA + '</span><br/><span class="ui-text-list-small">' + traducciones.clientes.fecha + " " + Right(fecha, 2) + "/" + Mid(fecha, 5, 2) + "/" + Left(fecha, 4) + " " + traducciones.clientes.hora + " " + compras.HORA.substring(0, 2) + ":" + compras.HORA.substring(2, 4) + '</span><br/><span class="ui-text-list-small"> Total: ' + compras.TOTAL.toFixed(2) + "" + " Dto: " + compras.IMPORTEDCTODIFERIDO + "" + '</span></a></li>');
                        }
                    } catch (err) {
                        alert(err);
                    }
                }
                $("#lblImporteCuatrimestre").html(totalCompras.toFixed(2) + "");
                if (totalDescuentoCompras > 0) {
                    $("#lblImporteDescuento").html(totalDescuentoCompras.toFixed(2) + "");
                } else {
                    $("#lblImporteDescuento").html("0");
                }
            } else {
                alerta(traducciones.clientes.sincompras);
            }

            $('#shopCompras').listview("refresh");
            $('#back-btn').show();

            currentSection = 1;
        }

        //        function openDetail(idCliente, idTienda, fecha, numeroCaja, idTicket) {
        function openDetail(idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket) {
            hideTab("compras");
            loadTab("lineascompras");

            $('#lblLineasCompra').html("");

            //            alert("openDetail: " + "idCliente: " + idCliente + " idTienda: " + idTienda + " fecha: " + fecha + " numeroCaja: " + numeroCaja + " idTicket: " + idTicket);
            //alert("openDetail: " + "idCliente: " + idCliente + " idTienda: " + idTienda + " periodoventa: " + periodoventa + " fecha: " + fecha + " idPreTicket: " + idPreTicket + " numeroCaja: " + numeroCaja + " idTicket: " + idTicket);

            loadObtenerLineasCompra(idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket);

            $('#back-btn').show();
        }

        function loadObtenerLineasCompra(idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket) {
            //        function loadObtenerLineasCompra(idCliente, idTienda, fecha, numeroCaja, idTicket) {
            loadTab("alert");
            try {
                //alert("idCliente: " + idCliente + " idTienda: " + idTienda + " periodoventa: " + periodoventa + " fecha: " + fecha + " idPreTicket: " + idPreTicket + " numerocaja: " + numeroCaja + " idTicket: " + idTicket);
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    lineasCompras = callWSObtenerLineasCompras("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerLineasTicketHTML_APP", idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket, showObtenerLineasCompras);
                } else {
                    lineasCompras = callWSObtenerLineasCompras("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerLineasTicketHTML_APP", idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket, showObtenerLineasCompras);
                }
            } catch (err) {
                alert("loadObtenerLineasCompra: " + err);
                hideTab("alert");
            }
        }

        function callWSObtenerLineasCompras(url, idCliente, idTienda, periodoventa, fecha, idPreTicket, numeroCaja, idTicket, callback) {
            //        function callWSObtenerLineasCompras(url, idCliente, idTienda, fecha, numeroCaja, idTicket, callback) {
            //            alert("url: " + url + " idCliente: " + idCliente + " idTienda: " + idTienda + " periodoventa: " + periodoventa + " fecha: " + fecha + " idPreTicket: " + idPreTicket + " numerocaja: " + numeroCaja + " idTicket: " + idTicket);
            //alert("url: " + url + " idCliente: " + idCliente + " idTienda: " + idTienda + " fecha: " + fecha + " numerocaja: " + numeroCaja + " idTicket: " + idTicket);
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idCliente: '" + idCliente + "'," + "idTienda: '" + idTienda + "'," + "periodoventa: '" + periodoventa + "'," + "fecha: '" + fecha + "'," + "idPreTicket: '" + idPreTicket + "'," + "numeroCaja: '" + numeroCaja + "'," + "idTicket: '" + idTicket + "'}",
                //                data: "{idCliente: '" + idCliente + "'," + "idTienda: '" + idTienda + "'," + "fecha: '" + fecha + "'," + "numeroCaja: '" + numeroCaja + "'," + "idTicket: '" + idTicket + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    alert("Error callWSObtenerLineasCompras: " + msg);
                }
            });
        }

        function showObtenerLineasCompras(json) {
            console.log("showObtenerLineasCompras");
            lineasCompras = json;
            hideTab("datos");
            loadTab("lineascompras");

            try {
                $("#lblLineasCompra").append(lineasCompras);
            } catch (err) {
                alert("Error showObtenerLineasCompras: " + err);
            }
            hideTab("alert");

            if (idAccionidTicket == 0 || idAccionidTicket == null || idAccionidTicket == 'undefined') {
                currentSection = 2;
            } else {
                currentSection = 0;
            }
        }

        function padding_right(s, c, n) {
            if (!s || !c || s.length >= n) {
                return s;
            }

            var max = (n - s.length) / c.length;
            for (var i = 0; i < max; i++) {
                s += "&nbsp;";
            }

            return s;
        }
        function Right(str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else {
                var iLen = String(str).length;
                return String(str).substring(iLen, iLen - n);
            }
        }

        function Mid(s, n, c) {
            var numargs = Mid.arguments.length;

            if (numargs < 3)
                c = s.length - n + 1;
            if (c < 1)
                c = s.length - n + 1;
            if (n + c > s.length)
                c = s.length - n + 1;
            if (n > s.length)
                return "";
            return s.substring(n - 1, n + c - 1);
        }

        function Left(str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else
                return String(str).substring(0, n);
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    

                            var fecha = new Date();
                            var mes = fecha.getMonth() + 1;
                            $("#cmbCuatrimestre").html("");
                            if (mes >= 1 && mes <= 4) {
                                $('#cmbCuatrimestre').append("<option id='' value='1'>" + traducciones.clientes.cuatrimestre1 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='2'>" + traducciones.clientes.cuatrimestre2 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='3'>" + traducciones.clientes.cuatrimestre3 + "</option>");
                            } else if (mes >= 5 && mes <= 8) {
                                $('#cmbCuatrimestre').append("<option id='' value='2'>" + traducciones.clientes.cuatrimestre2 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='3'>" + traducciones.clientes.cuatrimestre3 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='1'>" + traducciones.clientes.cuatrimestre1 + "</option>");
                            } else if (mes >= 9 && mes <= 12) {
                                $('#cmbCuatrimestre').append("<option id='' value='3'>" + traducciones.clientes.cuatrimestre3 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='1'>" + traducciones.clientes.cuatrimestre1 + "</option>");
                                $('#cmbCuatrimestre').append("<option id='' value='2'>" + traducciones.clientes.cuatrimestre2 + "</option>");
                            }
                        

                            var fecha = new Date();
                            var anyo = fecha.getFullYear();
                            var anyoAnterior = fecha.getFullYear() - 1;
                            $("#cmbAnyo").html("");
                            $("#cmbAnyo").append("<option id='' value=" + anyo + ">" + anyo + "</option>");
                            $("#cmbAnyo").append("<option id='' value=" + anyoAnterior + ">" + anyoAnterior + "</option>");
                        

                                    $('#lblTituloImporteCuatrimestre').html(traducciones.clientes.importeAcumulado);
                                

                                    $('#lblTituloImporteDescuento').html(traducciones.clientes.descuentoAcumulado);
                                











        var idioma;
        idioma = getIdioma();

        var traducciones = getTraducciones()
        function init() {

            $('#lblTextoPrincipal').html(traducciones.empresa.lblTextoPrincipal);
            $('#lblTextoPrincipal2').html(traducciones.empresa.lblTextoPrincipal2);
            $('#lblTextoPrincipal3').html(traducciones.empresa.lblTextoPrincipal3);
            $('#lblTextoPrincipal4').html(traducciones.empresa.lblTextoPrincipal4);
            $('#lblTextoPrincipal5').html(traducciones.empresa.lblTextoPrincipal5);
            $('#lblTextoPrincipal6').html(traducciones.empresa.lblTextoPrincipal6);
            $('#lblTextoPrincipal7').html(traducciones.empresa.lblTextoPrincipal7);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            //            setHomeName("Menu", false);
            Inicio();
        }

        //        function setHomeName(name, icon) {
        //            if (!icon) {
        //                $('#home-btn').css('margin-top', 4);
        //            } else {
        //                $('#home-btn').css('margin-top', 1);
        //            }
        //            $('#home-btn > span > span').filter(":first").html(name);
        //        }

        function ocultarTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).hide();
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function goBack() {
            loadTab("alert");
            //            setBackName("<img src='img/icon-home.png' />", true);
            document.location.href = 'index.html';
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function Inicio() {
            $('#back-btn').hide();
            hideTabs();

            console.log("Search");
            loadTab("historia");
            ocultarTab("alert");
        }
    

                            document.write("<br/>");
                            document.write(traducciones.menu.cargando);
                        







 


        var idioma;
        idioma = getIdioma();
        var currentSection = 0;
        var supermercados = new Array();
        var currentSupermercado;
        var poblaciones = new Array();
        var servicios = new Array();
        var ubicacionActual = "";

        var traducciones = getTraducciones()
        function init() {

            //hideTab("alert");

            $('#label_informacion').html(traducciones.supermercados.informacion);
            //$('#label_informacion2').html(traducciones.supermercados.informacion2);
            $('#label_texto_codigo').html(traducciones.supermercados.textoCodigo);
            $('#label_texto_poblacion').html(traducciones.supermercados.textoPoblacion);
            $('#label_texto_ordenar').html(traducciones.supermercados.textoOrdenar);
            $('#label_texto_tiendasCerca').html(traducciones.supermercados.label_texto_tiendasCerca);
            $('#label_buscar > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#label_buscar_cerca > span > span').filter(":first").html(traducciones.supermercados.buscarCerca);

            $('#label_tab_informacion > span > span').filter(":first").html(traducciones.supermercados.tabInformacion);
            $('#label_tab_mapa > span > span').filter(":first").html(traducciones.supermercados.tabMapa);
            $('#label_direccion').html(traducciones.supermercados.direccion);
            $('#label_poblacion').html(traducciones.supermercados.poblacion);
            $('#label_telefono').html(traducciones.supermercados.telefono);
            $('#label_horario').html(traducciones.supermercados.horario);
            $('#label_lunes').html(traducciones.supermercados.lunes);
            $('#label_martes').html(traducciones.supermercados.martes);
            $('#label_miercoles').html(traducciones.supermercados.miercoles);
            $('#label_jueves').html(traducciones.supermercados.jueves);
            $('#label_viernes').html(traducciones.supermercados.viernes);
            $('#label_sabado').html(traducciones.supermercados.sabado);
            $('#label_domingo').html(traducciones.supermercados.domingo);
            $('#label_servicio1').html(traducciones.supermercados.servicio1);
            $('#label_servicio2').html(traducciones.supermercados.servicio2);

            //Menus, siempre igual
            //$('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            loadPoblaciones();
            loadSupermercados();
            detectPosition();

            //showSearch();

        }

        function loadSupermercados(json) {
            if (!json) {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    supermercados = callWS("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
                } else {
                    supermercados = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
                }
                //supermercados = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerTiendas_APP", loadSupermercados);
            }
            else {
                supermercados = json;
            }
        }

        function loadPoblaciones() {
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                poblaciones = callWS("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
            } else {
                poblaciones = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
            }
            //poblaciones = callWS("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPoblacionesTiendasActivas_APP", printPoblaciones);
        }

        function printPoblaciones(json) {
            poblaciones = json;
            $.each(poblaciones, function (key, value) {
                $('#poblacion').append($('<option>', { value: key }).text(value.POBLACION));
            });
        }

        function callWS(url, callback) {

            $.ajax({
                type: "POST",
                url: url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error obteniendo las tiendas: " + msg.responseText);
                }
            });
        }

        function mostrarDetalleSupermercado(msg) {
            var data = eval("(" + msg + ")");
            $.each(data, function (key, val) {
                //alerta(key + " - " + val);
            });
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTab(id) {
            console.log('Hide ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function goBack() {
            console.log("back: " + currentSection);

            if (currentSection == 1) { showSearch(); }
            else if (currentSection == 2) { searchShop(); }
            else { loadTab("alert"); document.location.href = 'index.html'; }
        }

        function setBackName(name, icon) {
            if (!icon) {
                $('#back-btn').css('margin-top', 4);
            } else {
                $('#back-btn').css('margin-top', 1);
            }
            $('#back-btn > span > span').filter(":first").html(name);

            //hideTab("alert");
            //activado = false;
        }

        function showSearch() {
            var activado = false;
            hideTabs();

            loadTab("alert");
            activado = true;

            console.log("Search");
            loadTab("busqueda");
            setBackName("<img src='img/icon-home.png' />", true);
            $('#back-btn').show();

            hideTab("alert");
            activado = false;

            currentSection = 0;
        }

        function searchShop() {
            var activado = false;

            try {
                console.log("Search");

                loadTab("alert");
                activado = true;

                var filteredSupermercados = new Array();
                var cp = $("#postalCode").val();
                var poblacion = "";
                try {
                    poblacion = poblaciones[$("#poblacion").val()].POBLACION;
                } catch (err) { }
                //var order = $("#order").is(":checked");

                $('#shopList').empty();

                try {
                    calculateDistance();
                } catch (err) {
                    //alerta(err);
                }

                try {

                    //                if (order) {
                    supermercados.sort(sortDistances);
                    //                } else {
                    //                    supermercados.sort(sortNames);
                    //                }
                } catch (err) {
                    //alerta(err);
                }

                if (supermercados != undefined) {
                    for (i = 0; i < supermercados.length; i++) {
                        var supermercado = supermercados[i];

                        if ((supermercado.IDCODIGOPOSTAL == cp || cp == "") && (supermercado.POBLACION == poblacion || poblacion == "")) {
                            if (mostrarPosicion) {
                                $("#shopList").append('<li><a href="#" onclick="openDetail(' + supermercado.IDTIENDA + ');">' + supermercado.NOMBRE + '<br/><span class="ui-text-list-small">' + supermercado.CALLE + ', ' + supermercado.POBLACION + '<br/>' + supermercado.TELEFONO + '<br/>A ' + supermercado.distancia + supermercado.unidades + ' aprox.</span></a></li>');
                            } else {
                                $("#shopList").append('<li><a href="#" onclick="openDetail(' + supermercado.IDTIENDA + ');">' + supermercado.NOMBRE + '<br/><span class="ui-text-list-small">' + supermercado.CALLE + ', ' + supermercado.POBLACION + '<br/>' + supermercado.TELEFONO + '</span></a></li>');
                            }
                        }
                    }
                }

                $('#shopList').listview("refresh");

                hideTab("alert");
                activado = false;

                hideTabs();
                loadTab("listado");

                $('#back-btn').show();
                setBackName(traducciones.supermercados.busqueda, false);

                currentSection = 1;

            } catch (err) {
                if (activado) {
                    hideTab("alert");
                }
            }
        }

        //Inicio carga imagenes
        function loadServiciosSupermercado(shopId) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    servicios = callWSImagenes("http://bismanwsdes.sorlidiscau.es/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
                } else {
                    servicios = callWSImagenes("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
                }
                //servicios = callWSImagenes("http://www.sorlidiscau.mobi/tiendasws.asmx/ObtenerPictogramasTienda_APP", shopId, showServicios);
            } catch (err) {
                hideTab("alert");
            }
        }
        //Callback de la petición. Montamos los tags de imagenes y los ponemos en el DIV correspondiente.
        function showServicios(json) {
            try {
                var imag = "";
                servicios = json;

                if (servicios != undefined) {
                    for (i = 0; i < servicios.length; i++) {
                        var servicio = servicios[i];
                        imag = imag + displayImage(servicio.IMAGENSTRING);
                    }
                }

                $("#servicioSupermercado").html(imag);

                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }

        }

        function displayImage(base64Data) {
            var imag = "<img src='" + "data:image/jpg;base64," + base64Data + "'/>";
            return imag;
        };

        function callWSImagenes(url, idTienda, callback) {
            $.ajax({
                type: "POST",
                url: url,
                data: "{'idTienda': '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);

                }
            });
        }
        //Fin carga imagenes

        function getSupermercadoWithId(shopId) {
            for (i = 0; i < supermercados.length; i++) {
                supermercado = supermercados[i];
                if (supermercado.IDTIENDA == shopId) {
                    return supermercado;
                }
            }
        }

        function openDetail(shopId) {
            try {
                hideTabs();

                loadTab("alert");

                showDetail();
                loadServiciosSupermercado(shopId);

                var supermercado = getSupermercadoWithId(shopId);
                currentSupermercado = supermercado;

                console.log("Detail: " + supermercado.CALLE);
                loadTab("detalle");

                $('#back-btn').show();
                setBackName(traducciones.supermercados.listado, false);

                $('#direccionSupermercado').text(supermercado.CALLE);
                $('#poblacionSupermercado').text(supermercado.POBLACION);
                $('#codigoPostalSupermercado').text(supermercado.IDCODIGOPOSTAL + " - ");
                $('#horarioSupermercado').text();
                $('#servicioSupermercado').text();
                $('#telefonoSupermercado').html("<a href='tel:" + supermercado.TELEFONO + "'>" + supermercado.TELEFONO);
                $('#horarioLunes').html(supermercado.HORARIOL1 + '<br />' + supermercado.HORARIOL2);
                $('#horarioMartes').html(supermercado.HORARIOM1 + '<br />' + supermercado.HORARIOM2);
                $('#horarioMiercoles').html(supermercado.HORARIOX1 + '<br />' + supermercado.HORARIOX2);
                $('#horarioJueves').html(supermercado.HORARIOJ1 + '<br />' + supermercado.HORARIOJ2);
                $('#horarioViernes').html(supermercado.HORARIOV1 + '<br />' + supermercado.HORARIOV2);
                $('#horarioSabado').html(supermercado.HORARIOS1 + '<br />' + supermercado.HORARIOS2);
                $('#horarioDomingo').html(supermercado.HORARIOD1 + '<br />' + supermercado.HORARIOD2);

                currentSection = 2;
            } catch (err) {
                hideTab("alert");
            }
        }

        function showMap() {
            $('#detalle').hide();
            // Viewport sizes
            var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
            y = y - 175;
            y = y + 'px';

            $('#map_canvas').gmap('destroy');

            $('#map_canvas').height(y);
            $('#mapa').show();

            posicion = currentSupermercado.LATITUD + "," + currentSupermercado.LONGITUD;

            //            $('#map_canvas').gmap({ 'center': ubicacionActual, 'bounds': true }).bind('init', function (evt, map) {
            //                //                $('#map_canvas').gmap('addMarker', { 'bounds': true, 'position': ubicacionActual }).click(function () {
            //                //                    $('#map_canvas').gmap('openInfoWindow', { 'content': '' }, this);
            //                //                });
            //                $('#map_canvas').gmap('addMarker', { 'position': ubicacionActual, 'bounds': true });
            //            });
            //            $('#map_canvas').gmap({ 'bounds': true }).bind('init', function (evt, map) {
            //                $('#map_canvas').gmap('addMarker', { 'bounds': true, 'position': posicion, icon: 'img/sd.png' }).click(function () {
            //                    $('#map_canvas').gmap('openInfoWindow', { 'content': "" + currentSupermercado.CALLE + '<br />' + currentSupermercado.POBLACION + "" }, this);
            //                });
            //            });

            $('#map_canvas').gmap({ 'zoom': 15, 'center': posicion }).bind('init', function (evt, map) {
                $('#map_canvas').gmap('addMarker', { 'position': posicion, 'bounds': false });
            });

            console.log(y)
        }

        function showDetail() {
            $('#sorliul li a').removeClass("ui-btn-active");
            $('#detalle').show();
            $('#sorliul li:first a').addClass("ui-btn-active");
            $('#mapa').hide();
        }

        function detectPosition() {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        checkPosition(position);
                    }, function (error) {
                        showSearch();
                    });
                } else {
                    showSearch();
                }
            } catch (error) {
                showSearch();
            }
        }

        var position = new Object();
        position.latitud = 0.0;
        position.longitud = 0.0;

        var mostrarPosicion = false;

        function checkPosition(p) {
            position.latitud = p.coords.latitude;
            position.longitud = p.coords.longitude;
            mostrarPosicion = true;
            showSearch();
        }

        function calculateDistance() {
            var i = 0;
            if (position.latitud != 0 || position.longitud != 0) {
                var supermercado;
                var distancia;
                for (i = 0; i < supermercados.length; i++) {
                    supermercado = supermercados[i];
                    distancia = calculateDistanceSupers(supermercado);
                    //                    if (distancia >= 1000) {
                    distancia = distancia / 1000;
                    supermercados[i].unidades = "Km";
                    //                    } else {
                    //                        supermercados[i].unidades = "m";
                    //                    }
                    supermercados[i].distancia = Math.round(distancia * 100) / 100;
                }
            }
        }

        function sortDistances(super1, super2) {
            return super1.distancia - super2.distancia;
        }

        function sortNames(super1, super2) {
            return super1.NOMBRE.localeCompare(super2.NOMBRE);
        }

        function calculateDistanceSupers(supermercado) {
            var distancia = -1;

            try {
                var glatlng1 = new google.maps.LatLng(position.latitud, position.longitud);
                var glatlng2 = new google.maps.LatLng(supermercado.LATITUD, supermercado.LONGITUD);
                distancia = google.maps.geometry.spherical.computeDistanceBetween(glatlng1, glatlng2);
                ubicacionActual = glatlng1
            }
            catch (error) {

            }
            return distancia;
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var idTienda;
        var aliasCliente;
        var NombreTienda;
        var ObtenerTiendasArray = new Array;
        var ObtenerTiendaClienteArray = new Array;

        var traducciones = getTraducciones()
        function init() {

            idCliente = obtenerVariable("idCliente");
            idTienda = obtenerVariable("idTienda");
            aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));

            $('#lblIdioma').html(traducciones.comun.idioma);
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
        }

        function GrabarIdioma(valor) {
            console.log("GrabarIdioma" + hora());
            grabarVariable("idioma", valor);
            idioma = valor;
            //            document.location.reload(true);
            document.location.href = "home.html";
        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'home.html';
        }

        function home() {
            console.log("home-btn" + hora());
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id + hora());
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.warn('mostrarTab ' + id + hora());
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs' + hora());
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id + hora());
            $('#tab-' + id).hide();
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    

                $("#rbnEs").checkboxradio({
                    create: function (event, ui) {
                        $("#rbnEs").bind("change", function (event, ui) {
                            GrabarIdioma($(this).checkboxradio().val());
                        });
                    }
                });
                $("#rbnCat").checkboxradio({
                    create: function (event, ui) {
                        $("#rbnCat").bind("change", function (event, ui) {
                            GrabarIdioma($(this).checkboxradio().val());
                        });
                    }
                });
                
            











        var idioma;
        var registroApp;
        var esNativa = new Boolean();
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var aliasClienteArray = new Array();
        var aliasCliente;
        var idListaCompra;

        var traducciones = getTraducciones()
        function init() {

            document.addEventListener("deviceready", onDeviceReady, false);

            esNativa = (document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1);

            if (localStorageOCookie() == 2) {
                alert(traducciones.clientes.sinCookieYNavegacionPrivada);
                document.location.href = "home.html";
            } else {
                $("#content").show();

                numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
                aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));
                idCliente = obtenerVariable("idCliente");

                if (numeroSuperMaduixa == null || numeroSuperMaduixa == 'undefined' || numeroSuperMaduixa == 0) {
                    numeroSuperMaduixa = "";
                }

                $('#btnAceptarMaduixa > span > span').filter(":first").html(traducciones.clientes.ok);
                $('#btnCodigoBarras > span > span').filter(":first").html(traducciones.clientes.escaner);
                $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);

                //Menus, siempre igual
                $('#cargando').html(traducciones.menu.cargando);

                //            txtNumeroSuperMaduixa.value = numeroSuperMaduixa;

                console.log("numeroSuperMaduixa: " + numeroSuperMaduixa + " aliasCliente: " + aliasCliente);

                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    loadTab("conexion");
                    $("#btnAceptarMaduixa").show();
                    $("#btnDesconexion").hide();
                    if (esNativa == false) {
                        $("#btnCodigoBarras").hide();
                    } else {
                        $("#btnCodigoBarras").show();
                    }
                    $("#txtNumeroSuperMaduixa").html("");
                    $("#txtNumeroSuperMaduixa").show();
                    //                    $("#lblAliasCliente").hide();
                    hideTab("aliasCliente");
                    $("#btnMenu").hide();
                } else {
                    $("#btnMenu").show();
                    $("#btnAceptarMaduixa").hide();
                    $("#btnDesconexion").show();
                    $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);
                    $('#btnCodigoBarras').hide();
                    $("#txtNumeroSuperMaduixa").hide();
                    //                    $("#lblAliasCliente").show();
                    loadTab("aliasCliente");
                    $("#lblAliasCliente").html(aliasCliente);
                }

                hideTab("alert");
                ocultarTab("alert");
                //                $("#back-btn").hide();

                showMenus();

            }
        }

        function desconexion() {
            try {
                console.log("Desconexion");

                grabarVariable("idCliente", 0);
                grabarVariable("aliasCliente", 0);
                grabarVariable("numeroSuperMaduixa", 0);

                idCliente = 0;
                aliasCliente = 0;
                numeroSuperMaduixa = 0;

                loadTab("conexion");
                hideTab("aliasCliente");
                $("#btnAceptarMaduixa").show();
                $("#txtNumeroSuperMaduixa").html("");
                $("#txtNumeroSuperMaduixa").show();
                $('#btnCodigoBarras').show();
                $("#lblAliasCliente").hide();
                $("#lblAliasCliente").html("");
                $("#btnDesconexion").hide();
                console.log("Desconexion idCliente: " + idCliente + " aliasCliente: " + aliasCliente + " numeroSupermaduixa: " + numeroSuperMaduixa);
            } catch (e) {
                console.log(e);
            }
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function scan() {
            try {
                window.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled == false) {
                        txtNumeroSuperMaduixa.value = result.text;
                        loadComprobarCliente(result.text);
                    } else {
                        console.log("ha cancelado el escaneo");
                    }
                    console.log("Resultado: " + result.text + "\n Formato: " + result.format + "\n Cancel: " + result.cancelled);
                }, function (error) {
                    alerta(traducciones.clientes.descargaAplicacionNativa);
                    console.error("Fallo Scanner: " + error);
                }
                                                   );
            } catch (err) {
                console.error(err);
                ocultarTab("alert");
            }

        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.log('mostrarTab ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function existeCliente() {
            if (txtNumeroSuperMaduixa.value == "") {
                alerta(traducciones.clientes.msgClienteEnBlanco);
            } else {
                if (isNaN(txtNumeroSuperMaduixa.value) == false) {
                    if (txtNumeroSuperMaduixa.value.length == 13) { //Es una SuperMaduixa
                        loadComprobarCliente(txtNumeroSuperMaduixa.value);
                    } else if (txtNumeroSuperMaduixa.value.length == 9) { //Es un teléfono
                        lanzarDialog();
                    } else {
                        alerta(traducciones.clientes.numeroTarjetaInvalido);
                    }
                } else {
                    alerta(traducciones.clientes.numeroTarjetaInvalido);
                }
            }
        }

        function loadObtenerClientesTelefono(numeroTelefono, nif) {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerClientesTelefono = callObtenerClientesTelefonoWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerClientesTelefono_APP", numeroTelefono, nif);
                } else {
                    ObtenerClientesTelefono = callObtenerClientesTelefonoWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerClientesTelefono_APP", numeroTelefono, nif);
                }
            } catch (err) {
                console.error("loadObtenerClientesTelefono: " + err);
                ocultarTab("alert");
            }
        }

        function callObtenerClientesTelefonoWS(url, numeroTelefono, nif) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{numeroTelefono: '" + numeroTelefono + "'," + "nif: '" + nif + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;

                    if (json > 0) {
                        loadComprobarCliente(json);
                    } else if (idCliente == -1) {
                        jAlert(traducciones.clientes.codigoClienteInexistente, "Sorli Discau");
                    } else if (idCliente == -2) {
                        jAlert(traducciones.clientes.NIFIncorrecto + " callObtenerClientesTelefonoWS", "Sorli Discau");
                    } else {
                        jAlert(traducciones.clientes.codigoClienteInexistente, "Sorli Discau");
                    }
                    ocultarTab("alert");
                },
                error: function (msg, textStatus, errorThrown) {
                    console.error(msg);
                    ocultarTab("alert");
                }
            });
        }

        function loadComprobarCliente(idCliente) {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    idCliente = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/comprobarCliente_APP", idCliente, printComprobarCliente);
                } else {
                    idCliente = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/comprobarCliente_APP", idCliente, printComprobarCliente);
                }
            } catch (err) {
                console.error("loadComprobarCliente: " + err);
                ocultarTab("alert");
            }
        }

        function callWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    console.error("callWS: " + msg);
                    ocultarTab("alert");
                }
            });
        }

        //Aquí se guardarán en las variables (ya sea LocalStorage o cookie), el número de tarjeta.
        function printComprobarCliente(json) {
            try {
                idCliente = json;
                if (idCliente > -1) {
                    grabarVariable("numeroSuperMaduixa", txtNumeroSuperMaduixa.value);
                    grabarVariable("idCliente", idCliente);
                    $("#btnMenu").show();

                    loadObtenerListasCompra();

                    if (txtNumeroSuperMaduixa.value.length == 13) {
                        loadPintarAliasCliente(txtNumeroSuperMaduixa.value);
                    } else {
                        loadPintarAliasCliente(idCliente);
                    }

                    hideTab("conexion");
                    loadTab("aliasCliente");
                    $("#btnAceptarMaduixa").hide();
                    $("#btnDesconexion").show();
                    $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);
                    $('#btnCodigoBarras').hide();
                    $("#txtNumeroSuperMaduixa").hide();
                    $("#lblAliasCliente").html(aliasCliente);
                    $("#lblAliasCliente").show();
                    if (esNativa == true) {
                        notificaciones();
                    }
                }
                else {
                    alerta(traducciones.clientes.codigoClienteInexistente);
                }
                ocultarTab("alert");
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function loadPintarAliasCliente(idCliente) {
            try {
                mostrarTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    aliasClienteArray = callWSPintarAliasCliente("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerAliasCliente_APP", idCliente, showPintarAliasCliente);
                } else {
                    aliasClienteArray = callWSPintarAliasCliente("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerAliasCliente_APP", idCliente, showPintarAliasCliente);
                }
            } catch (err) {
                //console.warn(err);
            }
        }

        function callWSPintarAliasCliente(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.error("ERROR: " + msg.responseText);
                    console.error("textStatus : " + textStatus);
                    console.error("errorThrown : " + errorThrown);
                }
            });
        }

        function showPintarAliasCliente(json) {
            aliasClienteArray = json;

            if (aliasClienteArray.length > 0) {
                aliasCliente = aliasClienteArray[0].ALIAS;
                if (aliasCliente == 0 || aliasCliente == null || aliasCliente == 'undefined' || aliasCliente == "") {
                    aliasCliente = traducciones.clientes.sinDatos;
                }
                $("#lblAliasCliente").html(aliasCliente);
                console.log("showPintarAliasCliente - aliasCliente: " + aliasCliente);
                grabarVariable("aliasCliente", aliasCliente);

                return aliasCliente;
            } else {
                return "";
            }
            hideTab("alert");
        }

        function hideTab(id) {
            console.log('hideTab ' + id);
            $('#tab-' + id).hide();
        }

        function showMenus() {
            $("#opciones").html("");
            $("#tab-menus").show();
            $("#opciones").append('<tr onclick="openDetailMenu(1);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/clients.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.valesSupermaduixa + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.valesSupermaduixadescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(2);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/ListaCompra.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.listaCompra + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.listaCompradescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(5);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/misofertas.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.misofertas + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.misofertasdescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(3);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/MisCompras.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.tusCompras + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.tusComprasdescripcion + '</span></td></tr>');
            //          $("#opciones").append('<tr onclick="openDetailMenu(4);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/ofertas.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.ofertas + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.ofertasdescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(6);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/tarjetaregalo.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.tarjetaregalo + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.tarjetaregalodescripcion + '</span></td></tr>');

            hideTab("alert");

            currentSection = 0;
        }

        function mostrarCarga() {
            loadTab("alert");
        }

        function openDetailMenu(idOpcion) {
            console.log("openDetailMenu: " + idCliente + " aliasCliente: " + aliasCliente);
            if (idOpcion == "1") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'maduixa.html';
                }
            } else if (idOpcion == "2") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    idListaCompra = obtenerVariable("idListaCompra");
                    console.log("idListaCompra: " + idListaCompra);
                    if (idListaCompra == null || idListaCompra == "undefined" || idListaCompra == "" || idListaCompra == "0" || idListaCompra == 0) {
                        document.location.href = 'listacompra.html';
                    } else {
                        document.location.href = 'listacompradetalle.html';
                    }
                }
            } else if (idOpcion == "3") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'miscompras.html';
                }
            } else if (idOpcion == "4") {
                mostrarCarga();
                document.location.href = 'ofertas.html';
            } else if (idOpcion == "5") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'misofertas.html';
                }
            } else if (idOpcion == "6") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'tarjetaregalo.html';
                }
            }
            hideTab("alert");
        }

        function notificaciones() {
            try {
                pushNotification = window.plugins.pushNotification;
            } catch (e) {
                console.log("pushNotification: " + e);
            }
            try {
                if (device.platform == 'android' || device.platform == 'Android') {
                    pushNotification.register(successHandler, errorHandler, { "senderID": "160232282146", "ecb": "onNotificationGCM" });
                } else {
                    pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
                }
            } catch (e) {
                console.log("device.platform: " + e);
            }
        }

        function successHandler(result) {
            console.log("successHandler: " + result);
        }

        function errorHandler(error) {
            console.log(error);
        }

        function tokenHandler(result) {
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            console.log("tokenHandler: " + result);
            idCliente = obtenerVariable("idCliente");
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                idCliente = 0;
            }
            loadRegistroMovilApple(1, result, idCliente);
            if (pagina != "espai_client.html") {
                document.location.href = "home.html";
            }
        }

        //Para grabar la parte de iOS, la parte de Android lo hace el script que esta en PushNotification.js
        function loadRegistroMovilApple(sistemaOperativo, idDispositivoMovil, idCliente) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    registroApp = callWSRegistroMovilApple("http://bismanwsdes.sorlidiscau.es/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                } else {
                    registroApp = callWSRegistroMovilApple("http://www.sorlidiscau.mobi/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                }
            } catch (err) {
                console.log("loadRegistroMovil: " + err);
            }
        }

        function callWSRegistroMovilApple(url, sistemaOperativo, idDispositivoMovil, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{sistemaOperativo: '" + sistemaOperativo + "'," + "idDispositivoMovil: '" + idDispositivoMovil + "'," + "idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("callWSRegistroMovil ERROR: " + msg.responseText);
                    console.log("callWSRegistroMovil textStatus: " + textStatus);
                    console.log("callWSRegistroMovil errorThrown: " + errorThrown);
                }
            });
        }

        function showRegistroMovilApple(json) {
            registroApp = json;
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            if (registroApp == "1") {
                console.log("showRegistroMovilApple OK");
            } else {
                console.log("showRegistroMovilApple FALLO");
            }
            if (pagina != "espai_client.html") {
                document.location.href = "home.html";
            }
        }

        function lanzarDialog() {
            try {
                $('<div>').simpledialog2({
                    mode: 'button',
                    headerClose: false,
                    buttonPrompt: 'NIF',
                    buttonInput: true,
                    headerText: '',
                    headerClose: true,
                    fullScreen: true,
                    fullScreenForce: true,
                    forceInput: true,
                    buttons: {
                        'OK': {
                            theme: 'a',
                            click: function () {
                                if ($.mobile.sdLastInput == "" || $.mobile.sdLastInput == "undefined" || $.mobile.sdLastInput == null) {
                                    window.close();
                                } else {
                                    loadObtenerClientesTelefono(txtNumeroSuperMaduixa.value, $.mobile.sdLastInput);
                                }
                            }
                        },
                        'Cancel': {
                            icon: "delete",
                            theme: 'b',
                            click: function () {
                                window.close();
                            }
                        }
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }

        function pause() {
            //            sonido(1);
            console.log("Se cerró la aplicación");
        }

        function onResume() {
            //            vibrar(1);
            console.log("Se vuelve a lanzar la aplicación");
        }

        function onOffline() {
            console.log("No tienes acceso a internet");
        }

        function onOnline() {
            console.log("Vuelves a tener acceso a internet");
        }

        function onDeviceReady() {
            window.addEventListener("batterystatus", onBatteryStatus, false);
            document.addEventListener("pause", pause, false);
            document.addEventListener("resume", onResume, false);
            document.addEventListener("offline", onOffline, false);
            document.addEventListener("online", onOnline, false);
        }

        function onBatteryStatus(info) {
            console.log("Nivel Batería: " + info.level);
        }


        function loadObtenerListasCompra() {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerListasCompraArray = callObtenerListasCompraWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerListasCompra_APP", idCliente, printObtenerListasCompra);
                } else {
                    ObtenerListasCompraArray = callObtenerListasCompraWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerListasCompra_APP", idCliente, printObtenerListasCompra);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadObtenerListasCompra: " + err);
            }
        }

        function callObtenerListasCompraWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //                    var json = result.d;
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printObtenerListasCompra(json) {
            console.log("printObtenerListasCompra");
            ObtenerListasCompraArray = json;

            try {
                if (ObtenerListasCompraArray.length > 0) {
                    grabarVariable("idListaCompra", ObtenerListasCompraArray[0].IDLISTACOMPRA);
                    //document.location.href = "listacompradetalle.html?idListaCompra=" + ObtenerListasCompraArray[0].IDLISTACOMPRA;
                    //Se quita lo de pasar variable y se hace con localStorage ya que hay una versión de Android que no funciona con variables.
                    //document.location.href = "listacompradetalle.html";
                } else {
                    grabarVariable("idListaCompra", 0);
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'home.html';
        }

        function activarPanel() {
            $("#panel").panel("open");
        }

        function configuracion() {
            console.log("Configuración" + hora());
            document.location.href = 'configuracion.html';
        }

        function enter(e) {
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla == 13)
                existeCliente();
        } 

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var saldoTarjetaRegaloArray = new Array();

        var traducciones = getTraducciones()
        function init() {
//            if (typeof (localStorage) == 'undefined') {
//                if (navigator.cookieEnabled == true) {
//                    try {
//                        numeroSuperMaduixa = getCookie("numeroSuperMaduixa");
//                        aliasCliente = getCookie("aliasCliente");
//                        idCliente = getCookie("idCliente");
//                    } catch (e) {
//                    }
//                }
//            } else {
//                try {
//                    numeroSuperMaduixa = localStorage.getItem("numeroSuperMaduixa");
//                    aliasCliente = localStorage.getItem("aliasCliente");
//                    idCliente = localStorage.getItem("idCliente");
//                } catch (e) {
//                }
            //            }

            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = obtenerVariable("aliasCliente");
            idCliente = obtenerVariable("idCliente");

            $('#btnConsultaSaldo > span > span').filter(":first").html(traducciones.clientes.btnConsultar);
            $('#lblTarjetaRegalo').html(traducciones.clientes.lblTarjetaRegalo);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
            $("#back-btn").show();
        }

//        function scan() {
//            try {
//                if (window.plugins.barcodeScanner != undefined) {
//                    window.plugins.barcodeScanner.scan(function (result) {
//                        //Para que entre directamente cuando lee el código de la tarjeta regalo, sin tener que darle al OK.
//                        loadObtenerSaldoTarjetaRegalo(result.text);
//                    }, function (error) {
//                        alerta("Fallo scanner: " + error);
//                    });
//                } else {
//                    alerta(traducciones.clientes.descargaAplicacionNativa);
//                }
//            } catch (err) {
//                //                alert(err);
//            }

//        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'espai_client.html';
        }

        function home() {
            console.warn("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.warn('Hide tabs');
            $('.tab').hide();
        }

        function hideTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function loadObtenerSaldoTarjetaRegalo() {
            try {
                //isNaN (Comprueba si es número o no)
                if (isNaN(txtTarjetaRegalo.value) == false) {
                    if (txtTarjetaRegalo.value != "") {
                        if (txtTarjetaRegalo.value.length >= 13) {
                            console.warn("txtTarjetaRegalo: " + txtTarjetaRegalo.value + " nş caracteres: " + txtTarjetaRegalo.value.length);
                            loadTab("alert");
                            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                                saldoTarjetaRegaloArray = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerSaldoTarjetaRegalo_APP", txtTarjetaRegalo.value, printObtenerSaldoTarjetaRegalo);
                            } else {
                                saldoTarjetaRegaloArray = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerSaldoTarjetaRegalo_APP", txtTarjetaRegalo.value, printObtenerSaldoTarjetaRegalo);
                            }
                        } else {
                            alerta(traducciones.clientes.numeroTarjetaInvalido);
                        }
                    } else {
                        alerta(traducciones.clientes.numeroTarjetaObligatorio);
                    }
                } else {
                    alerta(traducciones.clientes.numeroTarjetaInvalido);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWS(url, numeroTarjeta, callback) {
            console.warn("callWS");
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{'numeroTarjeta': '" + numeroTarjeta + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error: "+msg);
                }
            });
        }

        function printObtenerSaldoTarjetaRegalo(json) {
            console.warn("printObtenerSaldoTarjetaRegalo");
            saldoTarjetaRegaloArray = json;

            try {
                if (saldoTarjetaRegaloArray[0].RESULTADO == 0) {
                    $("#divImgTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").show();
                    if (saldoTarjetaRegaloArray[0].CREDITO == 0) {
                        if (idiomaBisman(idioma) == 0) {
                            $("#divImgTarjetaRegalo").html("<img alt='' src='img/tarjetaRegaloSinSaldoCas.png' />");
                        } else {
                            $("#divImgTarjetaRegalo").html("<img alt='' src='img/tarjetaRegaloSinSaldo.png' />");
                        }
                        $("#divlblSaldoTarjetaRegalo").html(traducciones.clientes.saldoActual + saldoTarjetaRegaloArray[0].CREDITO + "");
                    } else {
                        $("#divImgTarjetaRegalo").html("<img alt='' src='img/tarjetaRegalo.png' />");
                        $("#divlblSaldoTarjetaRegalo").html(traducciones.clientes.saldoActual + saldoTarjetaRegaloArray[0].CREDITO + "");
                    }
                } else if (saldoTarjetaRegaloArray[0].RESULTADO == 101) {
                    $("#divImgTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").html(traducciones.clientes.tarjetaCaducada);
                    if (idiomaBisman(idioma) == 0) {
                        $("#divImgTarjetaRegalo").html("<img alt='' src='img/tarjetaRegaloCaducadaCas.png' />");
                    } else {
                        $("#divImgTarjetaRegalo").html("<img alt='' src='img/tarjetaRegaloCaducada.png' />");
                    }
                } else if (saldoTarjetaRegaloArray[0].RESULTADO == 180) {
                    $("#divImgTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").html(traducciones.clientes.tarjetaNoTarjetaRegalo);
                    $("#divImgTarjetaRegalo").html("<img alt='' src='img/TarjetaRegaloInexistente.png' />");
                } else if (saldoTarjetaRegaloArray[0].RESULTADO == 780) {
                    $("#divImgTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").html(traducciones.clientes.tarjetaInexistente);
                    $("#divImgTarjetaRegalo").html("<img alt='' src='img/TarjetaRegaloInexistente.png' />");
                } else if (saldoTarjetaRegaloArray[0].RESULTADO == 799) {
                    $("#divImgTarjetaRegalo").hide();
                    $("#divlblSaldoTarjetaRegalo").show();
                    $("#divlblSaldoTarjetaRegalo").html(traducciones.comun.Error);
                }
            } catch (err) {
                //alert(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var currentSection = 0;
        var recetas = new Array();
        var ingredientes = new Array();
        var familiasRecetas = new Array();
        var imagenesReceta = new Array();
        var currentRecetas;
        var currentIngredientes;
        var height;
        var width;
        var esVertical;

        var traducciones = getTraducciones()
        function init() {

            //hideTab("alert");

            $('#lblTextoPrincipal').html(traducciones.recetas.lblTextoPrincipal);
            $('#lblPalabraClave').html(traducciones.recetas.lblPalabraClave);
            $('#lblSeleccionePlato').html(traducciones.recetas.lblSeleccionePlato);
            $('#lblDificultad').html(traducciones.recetas.lblDificultad);
            $('#label_buscar > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#label_buscar_cerca > span > span').filter(":first").html(traducciones.supermercados.buscarCerca);
            $('#label_tab_informacion > span > span').filter(":first").html(traducciones.recetas.tabInformacion);
            $('#label_tab_mapa > span > span').filter(":first").html(traducciones.recetas.tabMapa);

            //Menus, siempre igual
            //$('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            loadfamiliasRecetas();
            loadRecetas();
            printDificultad();
            showSearch();
            //            setHomeName("Menu", false);
        }

        //        function setHomeName(name, icon) {
        //            if (!icon) {
        //                $('#home-btn').css('margin-top', 4);
        //            } else {
        //                $('#home-btn').css('margin-top', 1);
        //            }
        //            $('#home-btn > span > span').filter(":first").html(name);
        //        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function loadRecetas(json) {
            try {
                if (!json) {
                    loadTab("alert");
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        recetas = callWSloadRecetas("http://bismanwsdes.sorlidiscau.es/recetasws.asmx/ObtenerDatosTextoReceta_APP", idiomaBisman(idioma), loadRecetas);
                    } else {
                        recetas = callWSloadRecetas("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerDatosTextoReceta_APP", idiomaBisman(idioma), loadRecetas);
                    }
                    //recetas = callWSloadRecetas("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerDatosTextoReceta_APP", idiomaBisman(idioma), loadRecetas);
                }
                else {
                    hideTab("alert");
                    recetas = json;
                }
            } catch (err) {
                hideTab("alert");
            }
        }

        function callWSloadRecetas(url, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idioma': '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //                    alerta("Error obteniendo las recetas");
                }
            });
        }

        function loadIngredientesReceta(idRecetaWeb) {
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                ingredientes = callWSloadIngredientesReceta("http://bismanwsdes.sorlidiscau.es/recetasws.asmx/ObtenerDatosReceta_APP", idRecetaWeb, idiomaBisman(idioma), showIngredientes);
            } else {
                ingredientes = callWSloadIngredientesReceta("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerDatosReceta_APP", idRecetaWeb, idiomaBisman(idioma), showIngredientes);
            }
            //ingredientes = callWSloadIngredientesReceta("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerDatosReceta_APP", idRecetaWeb, idiomaBisman(idioma), showIngredientes);
        }

        function callWSloadIngredientesReceta(url, idRecetaWeb, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                data: "{idRecetaWeb: '" + idRecetaWeb + "'," + "idioma: '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    //                    alerta("ERROR: " + msg.responseText);
                    //                    alerta("textStatus : " + textStatus);
                    //                    alerta("errorThrown : " + errorThrown);
                }
            });
        }

        function showIngredientes(json) {
            var minutosPreparacion = "";
            var dificultad = "";
            ingredientes = json;

            if (ingredientes.length == 1) {
                minutosPreparacion = (ingredientes[0].MINUTOSPREPARACION);
                dificultad = (ingredientes[0].DIFICULTAD);
            }

            if (minutosPreparacion > 0) {
                $("#lblTiempoPreparacion").text(traducciones.recetas.tiempoPreparacion + " " + minutosPreparacion + " " + traducciones.recetas.minutos);
            }
            switch (dificultad) {
                case 2:
                    $("#lblTextoDificultad").text(traducciones.recetas.amantesCocina);
                    break;
                case 5:
                    $("#lblTextoDificultad").text(traducciones.recetas.maestrosCocina);
                    break;
                case 8:
                    $("#lblTextoDificultad").text(traducciones.recetas.tiempoPreparacion);
                    break;
            }
        }

        function loadfamiliasRecetas() {
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                familiasRecetas = callWSloadfamiliasRecetas("http://bismanwsdes.sorlidiscau.es/recetasws.asmx/ObtenerFamiliasRecetasWeb_APP", idiomaBisman(idioma), printfamiliasRecetas);
            } else {
                familiasRecetas = callWSloadfamiliasRecetas("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerFamiliasRecetasWeb_APP", idiomaBisman(idioma), printfamiliasRecetas);
            }
            //familiasRecetas = callWSloadfamiliasRecetas("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerFamiliasRecetasWeb_APP", idiomaBisman(idioma), printfamiliasRecetas);
        }

        function printfamiliasRecetas(json) {
            familiasRecetas = json;
            $.each(familiasRecetas, function (key, value) {
                $('#cmbFamilia').append($('<option>', { value: key }).text(value.NOMBRE));
                $('#cmbFamilia').append($('<option>', { value: key }).index(value.IDFAMILIARECETAWEB));
            });
        }

        function callWSloadfamiliasRecetas(url, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idioma': '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //                    alerta("Error obteniendo los tipos de platos callWS2");
                }
            });
        }

        function loadTab(id) {
            console.log('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTab(id) {
            console.log('Hide ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function goBack() {
            console.log("back: " + currentSection);

            if (currentSection == 1) { showSearch(); }
            else if (currentSection == 2) { searchShop(); }
            else { document.location.href = 'index.html'; }
        }

        function showSearch() {
            hideTabs();

            console.log("Search");
            loadTab("busqueda");
            //            setBackName("<img src='img/icon-home.png' />", true);
            $('#back-btn').hide();

            currentSection = 0;
        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function searchShop() {
            console.log("Search");

            var activado = false;
            var encontrada;
            var nombrereceta;
            var filteredRecetas = new Array();
            var palabraClave = "";
            var idFamiliaRecetaWeb = "";
            var idDificultad = "";

            try {
                idFamiliaRecetaWeb = familiasRecetas[$("#cmbFamilia").val()].IDFAMILIARECETAWEB;
            } catch (err) {
                idFamiliaRecetaWeb = ""
            }

            try {
                palabraClave = $("#txtPalabraClave").val();
            } catch (err) {
                palabraClave = "";
            }

            try {
                idDificultad = cmbDificultad.value;
            } catch (err) {
                idDificultad = "";
            }

            if (palabraClave != "" || idFamiliaRecetaWeb != "" || idDificultad != "") {
                try {
                    loadTab("alert");
                    activado = true;

                    $('#shopList').empty();

                    var idRecetaCurso = -1

                    if (recetas != undefined) {
                        for (i = 0; i < recetas.length; i++) {
                            var receta = recetas[i];
                            nombrereceta = receta.NOMBRE.toUpperCase();
                            encontrada = nombrereceta.indexOf(palabraClave.toUpperCase());

                            if ((encontrada >= 0 || palabraClave == "") && (receta.IDFAMILIARECETAWEB == idFamiliaRecetaWeb || idFamiliaRecetaWeb == "") && (receta.DIFICULTAD == idDificultad || idDificultad == "")) {
                                if (idRecetaCurso != receta.IDRECETAWEB) {
                                    $("#shopList").append('<li><a href="#" onclick="openDetail(' + receta.IDRECETAWEB + ');">' + receta.NOMBRE + '</a></li>');
                                }
                                idRecetaCurso = receta.IDRECETAWEB
                            }
                        }
                    }

                    $('#shopList').listview("refresh");

                    hideTab("alert");
                    activado = false;
                    hideTabs();
                    loadTab("listado");

                    $('#back-btn').show();
                    setBackName(traducciones.clientes.btnAtras, false);

                    currentSection = 1;
                } catch (err) {
                    if (activado) {
                        hideTab("alert");
                    }
                }

            }
            else {
                //console.log("Ambos campos son nulos")
                //alerta("Ambos campos son nulos");
            }
        }

        //Inicio carga imagenes
        function loadImagenesRecetas(idRecetaWeb) {
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                imagenesReceta = callWSImagenes("http://bismanwsdes.sorlidiscau.es/recetasws.asmx/ObtenerImagenesRecetas_APP", idRecetaWeb, showServicios);
            } else {
                imagenesReceta = callWSImagenes("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerImagenesRecetas_APP", idRecetaWeb, showServicios);
            }
            //imagenesReceta = callWSImagenes("http://www.sorlidiscau.mobi/recetasws.asmx/ObtenerImagenesRecetas_APP", idRecetaWeb, showServicios);
        }

        //Callback de la petición. Montamos los tags de imagenes y los ponemos en el DIV correspondiente.
        function showServicios(json) {
            try {
                var imag = "";
                imagenesReceta = json;

                if (imagenesReceta.length == 1) {
                    imag = displayImage(imagenesReceta[0].IMAGENSTRING);
                }
                $("#divImagenReceta").html(imag);
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function displayImage(base64Data) {
            var imag = "<img src='" + "data:image/jpg;base64," + base64Data + "' width='275px' height='114px'/>";
            return imag;
        };

        function callWSImagenes(url, idRecetaWeb, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idRecetaWeb': '" + idRecetaWeb + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);

                }
            });
        }
        //Fin carga imagenes

        function getRecetaWithId(idRecetaWeb) {
            for (i = 0; i < recetas.length; i++) {
                receta2 = recetas[i];
                if (receta2.IDRECETAWEB == idRecetaWeb) {
                    return receta2;
                }
            }
        }

        function openDetail(idRecetaWeb) {
            hideTabs();

            loadTab("alert");

            showDetail();
            loadImagenesRecetas(idRecetaWeb);
            loadIngredientesReceta(idRecetaWeb);

            var receta = getRecetaWithId(idRecetaWeb);
            currentRecetas = receta;

            loadTab("detalle");

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            $('#lblNombreReceta').text(receta.NOMBRE);
            $('#divImagenReceta').text();

            currentSection = 2;
        }

        function showDetail() {
            $('#sorliul li a').removeClass("ui-btn-active");
            $('#detalle').show();
            $('#sorliul li:first a').addClass("ui-btn-active");
            $('#divIngredientes').hide();
        }

        function showManosObra() {
            $('#detalle').hide();
            $('#divIngredientes').show();
            var textoIngredientes = "";
            var textoPreparacion = "";

            if (ingredientes.length == 1) {
                textoIngredientes = (ingredientes[0].INGREDIENTES);
                textoPreparacion = (ingredientes[0].PREPARACION);
                do {
                    textoIngredientes = textoIngredientes.replace(String.fromCharCode(13), '<br />');
                } while (textoIngredientes.indexOf(String.fromCharCode(13)) >= 0);
                personas = (ingredientes[0].PERSONAS);
            }
            $("#lblTextoPreparacion").text(traducciones.recetas.preparacion + " ");
            if (personas > 0) {
                $("#lblTextoIngredientes").html(traducciones.recetas.ingredientes + " " + personas + " " + traducciones.recetas.personas);
            }
            else {
                $("#lblTextoIngredientes").text(traducciones.recetas.ingredientes + " ");
            }
            $("#lblPreparacion").text(textoPreparacion);
            $("#lblIngredientes").html(textoIngredientes);
            $("#lblIngredientes2").html(textoIngredientes);
        }

        function printDificultad(json) {
            $('#cmbDificultad').append($('<option>', { value: 2 }).text(traducciones.recetas.principiantes));
            $('#cmbDificultad').append($('<option>', { value: 5 }).text(traducciones.recetas.amantesCocina));
            $('#cmbDificultad').append($('<option>', { value: 8 }).text(traducciones.recetas.maestrosCocina));
        }

        // Para saber la orientación del móvil/tableta
        $(window).resize(function () {
            height = $(window).height();
            width = $(window).width();

            if (width > height) {
                // Landscape
                esVertical = true;
            } else {
                // Portrait
                esVertical = false;
            }
        });
    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        var idCliente;
        var esNativa = new Boolean();
        idioma = getIdioma();

        document.addEventListener("deviceready", onDeviceReady, false);

        function GrabarIdioma(valor) {
            grabarVariable("idioma", valor);
            idioma = valor;
            document.location.reload(true);
        }

        var traducciones = getTraducciones()
        function init() {
            hideTab("alert");

            $('#header').show();
            $('#content').show();

            //Menus, siempre igual
            //$('#cargando').html(traducciones.menu.cargando);
            $('#lblConocenos').html(traducciones.menu.quienes);
            $('#lblContacto').html(traducciones.menu.contacto);
            $('#lblCliente').html(traducciones.menu.supermaduixa + ":");
            $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);

            idCliente = obtenerVariable("idCliente");
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                $("#lblCliente").hide();
                $("#btnDesconexion").hide();
            } else {
                $("#lblCliente").show();
                $("#btnDesconexion").show();
            }

            showSearch();
            //esNativa = (document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1);
        }

        function home() {
            console.log("Configuración" + hora());
            document.location.href = 'idioma.html';
        }

        function showSearch() {
            hideTabs();

            console.log("showSearch");
            loadTab("menus");
            //loadMenus();
            showMenus();
        }

        function loadTab(id) {
            console.log('loadTab ' + id);
            $('#tab-' + id).fadeIn();
        }

        function hideTab(id) {
            console.log('hideTab ' + id);
            $('#tab-' + id).hide();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function showMenus() {
            loadTab("alert");
            $("#opciones").append("<tr style='height:10px;'></tr>");
            $("#opciones").append('<tr onclick="openDetail(1);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(1);"><img class="imagen-menuIndex" src="img/super.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(1);"><b>' + traducciones.inicio.supermercados + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(1);">' + traducciones.inicio.supermercadosdescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(2);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(2);"><img class="imagen-menuIndex" src="img/clients.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(2);"><b>' + traducciones.inicio.supermaduixa + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(2);">' + traducciones.inicio.supermaduixadescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(3);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(3);"><img class="imagen-menuIndex" src="img/recetas.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(3);"><b>' + traducciones.inicio.recetas + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(3);">' + traducciones.inicio.recetasdescripcion + '</a></span></td></tr>');
            //$("#opciones").append('<tr onclick="openDetail(4);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(4);"><img class="imagen-menuIndex" src="img/historia.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(4);"><b>' + traducciones.inicio.conocenos + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(4);">' + traducciones.inicio.conocenosdescripcion + '</a></span></td></tr>');
            //$("#opciones").append('<tr onclick="openDetail(8);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(5);"><img class="imagen-menuIndex" src="img/xx.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(8);"><b>Notificaciones</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(8);">Notificaciones</a></span></td></tr>');
            //$("#opciones").append('<tr onclick="openDetail(7);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(7);"><img class="imagen-menuIndex" src="img/SuperMarques.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(7);"><b>' + traducciones.inicio.supermarques + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(7);">' + traducciones.inicio.supermarquesdescripcion + '</a></span></td></tr>');
            $("#opciones").append('<tr onclick="openDetail(6);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" onclick="openDetail(6);"><img class="imagen-menuIndex" src="img/redes.gif" /></a></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(6);"><b>' + traducciones.inicio.redes + '</b></a><br/><span class="ui-text-list-small"><a href="#" rel="external" style="text-decoration: none; color: #333333;" onclick="openDetail(6);">' + traducciones.inicio.redesdescripcion + '</a></span></td></tr>');

            hideTab("alert");
            //$('#shopMenus').listview("refresh");
        }

        function displayImage(base64Data) {
            var imag = "<img class='imagen-menuIndex' src='" + "data:image/png;base64, " + base64Data + "'  />";
            return imag;
        }

        function openDetail(idOpcion) {
            if (idOpcion == "1") {
                mostrarCarga();
                document.location.href = 'supers.html';
            } else if (idOpcion == "2") {
                mostrarCarga();
                document.location.href = 'espai_client.html';
            } else if (idOpcion == "3") {
                mostrarCarga();
                document.location.href = 'recetas.html';
            } else if (idOpcion == "4") {
                mostrarCarga();
                document.location.href = 'empresa.html';
            } else if (idOpcion == "5") {
                mostrarCarga();
                document.location.href = 'contacto.html';
            } else if (idOpcion == "6") {
                mostrarCarga();
                document.location.href = 'redes.html';
            } else if (idOpcion == "7") {
                mostrarCarga();
                document.location.href = 'supermarques.html';
            } else if (idOpcion == "8") {
                mostrarCarga();
                document.location.href = 'notificaciones.html';
            }
        }

        function borrarCookie() {
            localStorage.removeItem("tieneAPP");
            setCookie("tieneAPP", 0, -1);
            localStorage.removeItem("aliasCliente");
            setCookie("aliasCliente", 0, -1);
            localStorage.removeItem("numeroSuperMaduixa");
            setCookie("numeroSuperMaduixa", 0, -1);
        }

        function mostrarCarga() {
            //hideTabs();
            $('#redes').hide();
            loadTab("alert");
        }

        function desconexion() {
            try {
                console.warn("Inicio Desconexion");

                grabarVariable("idCliente", 0);
                grabarVariable("aliasCliente", 0);
                grabarVariable("numeroSuperMaduixa", 0);

                idCliente = 0;
                aliasCliente = 0;
                numeroSuperMaduixa = 0;

                console.warn("Fin Desconexion");
            } catch (e) {
                console.log(e);
            }
            document.location.reload(true);
        }

        function onDeviceReady() {
            document.addEventListener("backbutton", onBackKeyDown, false);
        }

        //Cuando esté en la home, si le da al botón "atrás" del móvil se cerrará la aplicación.
        function onBackKeyDown() {
            //alert("back");
            //return false;
            navigator.app.exitApp();
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    

            $("#rbnEs").checkboxradio({
                create: function (event, ui) {
                    $("#rbnEs").bind("change", function (event, ui) {
                        GrabarIdioma($(this).checkboxradio().val());
                    });
                }
            });
            $("#rbnCat").checkboxradio({
                create: function (event, ui) {
                    $("#rbnCat").bind("change", function (event, ui) {
                        GrabarIdioma($(this).checkboxradio().val());
                    });
                }
            });
        











        var esNativa = new Boolean();
        var idioma;
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var codigoBarras;

        var traducciones = getTraducciones()
        function init() {

            if (esNativa == false) {
                $("#btnCodigoBarras").hide();
            } else {
                $("#btnCodigoBarras").show();
            }

            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = obtenerVariable("aliasCliente");
            idCliente = obtenerVariable("idCliente");

            $('#btnRegistrar > span > span').filter(":first").html(traducciones.SuperMarques.btnRegistrar);
            $('#lblTicketSupermarques').html(traducciones.SuperMarques.ticketSupermarques);
            $('#lblExplicacionSuperMarques').html(traducciones.SuperMarques.lblExplicacionSuperMarques);
            $('#btnCodigoBarras > span > span').filter(":first").html(traducciones.clientes.escaner);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
            $("#back-btn").hide();
        }

        function scan() {
            try {
                if (window.plugins.barcodeScanner != undefined) {
                    window.plugins.barcodeScanner.scan(function (result) {
                        //Para que entre directamente cuando lee el código el ticket, sin tener que darle al registrar.
                        loadRegistrarTicket(result.text);
                    }, function (error) {
                        alerta("Fallo scanner: " + error);
                    });
                } else {
                    alerta(traducciones.clientes.descargaAplicacionNativa);
                }
            } catch (err) {
                alert(err);
            }

        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'espai_client.html';
        }

        function home() {
            console.warn("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.warn('Hide tabs');
            $('.tab').hide();
        }

        function hideTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function comprobarTicketCompra() {
            if (txtTicketCompra.value == "") {
                alerta(traducciones.SuperMarques.codigoResultadoMenos1);
            } else {
                console.log("comprobarTicketCompra");
                loadRegistrarTicket(txtTicketCompra.value);
            }
        }

        function loadRegistrarTicket(codigoBarras) {
            try {
                //isNaN (Comprueba si es número o no)
                if (isNaN(txtTicketCompra.value) == false) {
                    if (txtTicketCompra.value != "") {
                        if (txtTicketCompra.value.length >= 17) {
                            console.warn("txtTicketCompra: " + txtTicketCompra.value + " nş caracteres: " + txtTicketCompra.value.length);
                            loadTab("alert");
                            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                                codigoBarras = callWS("http://bismanwsdes.sorlidiscau.es/bismanws.asmx/SuperMarcas", codigoBarras, printRegistrarTicket);
                            } else {
                                codigoBarras = callWS("http://www.sorlidiscau.mobi/bismanws.asmx/SuperMarcas", codigoBarras, printRegistrarTicket);
                            }

                        } else {
                            alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                        }
                    } else {
                        alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                    }
                } else {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWS(url, codigoBarras, callback) {
            console.warn("callWS");
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                data: "{'codigoBarras': '" + codigoBarras + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = (result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error: " + msg);
                }
            });
        }

        function printRegistrarTicket(json) {
            try {
                codigoBarras = json;

                if (codigoBarras == 0) {
                    alerta(traducciones.SuperMarques.codigoResultadoOK);
                } else if (codigoBarras == -1) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                } else if (codigoBarras == -2) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                } else if (codigoBarras == -3) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos3);
                } else if (codigoBarras == -4) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                } else if (codigoBarras == -5) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                } else if (codigoBarras == -6) {
                    alerta("Tiquet ja enregistrat.");
                } else if (codigoBarras == -7) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                } else if (codigoBarras == -8) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                } else if (codigoBarras == -9) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos1);
                } else if (codigoBarras == -10) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos10);
                } else if (codigoBarras == -11) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos11);
                } else if (codigoBarras == -12) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos11);
                } else if (codigoBarras == -13) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos13);
                } else if (codigoBarras == -14) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                } else if (codigoBarras == -15) {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                } else {
                    alerta(traducciones.SuperMarques.codigoResultadoMenos4 + " (" + codigoBarras + ")");
                }
                ocultarTab("alert");
            } catch (err) {
                ocultarTab("alert");
            }
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var idTienda = 0;
        var idListaCompra;
        var idArticulo;
        var idSeccion;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var currentArticulo;
        var ObtenerArticulosListaCompraArray = new Array;
        var AnyadirArticulosComprados = new Boolean;
        var AnyadirCompraAutomatica = new Boolean;
        var FinalizarCompra = new Boolean;
        var BorrarListaCompra = new Boolean;
        var ObtenerDetalleArticuloArray = new Array;
        var imagenArticuloArray = new Array();
        var BuscarArticuloArray = new Array;
        var BorrarArticuloListaCompra = new Boolean;
        var MarcarArticulo = new Boolean;
        var ActualizarCantidad = new Boolean;
        var AnyadirArticulos = new Boolean;
        var EsModoCompra = new Boolean;
        var articuloLocal = {};
        var resultadoListaCompra;

        var traducciones = getTraducciones();
        function init() {
            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = obtenerVariable("aliasCliente");
            idCliente = obtenerVariable("idCliente");
            idTienda = obtenerVariable("idTienda");
            //            idListaCompra = getQuerystring("idListaCompra");
            idListaCompra = obtenerVariable("idListaCompra");

            EsModoCompra = false;

            console.log("Tienda de compra: " + idTienda);
            console.log("Lista de la Compra: " + idListaCompra);

            $('#btnAnyadirArticulosComprados > span > span').filter(":first").html(traducciones.clientes.anyadirArticulosComprados);
            $('#btnAnyadirCompraAutomatica > span > span').filter(":first").html(traducciones.clientes.anyadirCompraAutomatica);
            $('#btnActualizarCantidad > span > span').filter(":first").html(traducciones.clientes.btnGrabar);
            $('#btnBuscarArticulo > span > span').filter(":first").html(traducciones.clientes.buscarAnyadir);
            $('#btnAnyadirArticulo > span > span').filter(":first").html(traducciones.clientes.anyadir);
            $('#btnModoCompra > span > span').filter(":first").html(traducciones.clientes.btnComprar);
            $('#btnBorrar > span > span').filter(":first").html(traducciones.clientes.btnBorrar);
            $('#btnAnyadir > span > span').filter(":first").html(traducciones.clientes.btnAnyadir);
            $('#btnFinalizarCompra > span > span').filter(":first").html(traducciones.clientes.btnFinalizarCompra);
            $('#btnEnviarCompra > span > span').filter(":first").html(traducciones.clientes.btnEnviarCompra);
            $('#btnVolver > span > span').filter(":first").html(traducciones.comun.volver);


            $('#lblTituloCantidad').html(traducciones.clientes.cantidad);
            $('#lblDescripcion').html(traducciones.clientes.lblDescripcion);
            $('#lblEan').html(traducciones.clientes.ean);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
            $("#back-btn").show();

            if (esAplicacionNativa() == false) {
                $("#btnCodigoBarras").hide();
            } else {
                $("#btnCodigoBarras").show();
            }

            if (idTienda == null || idTienda == "undefined" || idTienda == "" || idTienda == "0" || idTienda == 0) {
                console.log("no tiene tienda grabada, cogemos la tienda que tiene en la ficha del cliente");
                //Nunca ha entrado en la configuración y no tiene tienda grabada en el dispositivo, cogemos la tienda que tiene 
                //en la ficha del cliente.
                loadObtenerTiendaCliente(idCliente);
            } else {
                console.log("Ya tiene idTienda asignada, no hace falta coger la tienda de la ficha del cliente");
                loadObtenerArticulosListaCompra(idListaCompra, 0, false);
            }

        }

        function scan() {
            try {
                window.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled == false) {
                        txtDescripcionEan.value = result.text;
                        loadBuscarArticulos(0, result.text, idTienda);
                    } else {
                        console.log("ha cancelado el escaneo");
                    }
                    console.log("Resultado: " + result.text + "\n Formato: " + result.format + "\n Cancel: " + result.cancelled);
                }, function (error) {
                    alerta(traducciones.clientes.descargaAplicacionNativa);
                    console.error("Fallo Scanner: " + error);
                }
                                                   );
            } catch (err) {
                console.error(err);
                ocultarTab("alert");
            }

        }

        function goBack() {
            mostrarTab("alert");
            console.log("currentSection: " + currentSection + hora());
            $("#imagenArticulo").html("");
            if (currentSection == 4) {
                hideTab("detalleArticulo");
                loadTab("datos");
                $("#tabla-anyadirArticulos").show();
                currentSection = 2;
            } else if (currentSection == 2) {
                mostrarTab("alert");
                document.location.href = 'espai_client.html';
            } else if (currentSection == 5) {
                hideTab("detalleArticulo");
                hideTab("detalleBuscar");
                loadTab("buscar");
                $("#tabla-anyadirArticulos").show();
                currentSection = 2;
            } else if (currentSection == 3) {
                hideTabs();
                loadTab("datos");
                $("#tabla-anyadirArticulos").show();
                currentSection = 2;
            } else if (currentSection == 99) {
                hideTabs();
                loadTab("datos");
                currentSection = 2;
                $("#tabla-anyadirArticulos").show();
            } else if (currentSection == 31) {
                hideTab("detalleBuscar");
                loadTab("datos");
                $("#tabla-anyadirArticulos").show();
                currentSection = 3;
            } else if (currentSection == 32) {
                hideTab("detalleArticulo");
                loadTab("detalleBuscar");
                currentSection = 31;
            } else {
                mostrarTab("alert");
                document.location.href = 'espai_client.html';
            }
            hideTab("alert");

        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function activarPanel() {
            if (currentSection == 99) {
                $("#panel2").panel("open");
            } else if (currentSection == 3) {
                $("#panel3").panel("open");
            } else {
                $("#panel").panel("open");
            }
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id + hora());
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.log('mostrarTab ' + id + hora());
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs' + hora());
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function mostrarDatos() {
            hideTab("detalleArticulo");
            loadTab("datos");
        }

        function buscarArticulo() {
            hideTab("detalleArticulo");
            hideTab("ModoCompra");
            hideTab("datos");
            loadTab("buscar");
            hideTab("alert");
            currentSection = 3;
        }

        function modoCompra() {
            hideTabs();
            loadTab("ModoCompra");
            $("#tabla-anyadirArticulos").hide();
            EsModoCompra = true;
            loadObtenerArticulosListaCompra(idListaCompra, 0, true);
        }


        function showConfirmWeb(esCompraAutomatica) {
            if (esCompraAutomatica) {
                texto = traducciones.clientes.quieresAnyadirCompraAutomatica;
            } else {
                texto = traducciones.clientes.quieresAnyadirArticulosComprados;
            }
            //            var resultado = confirm(texto);
            //            if (resultado == true) {
            //                if (esCompraAutomatica) {
            //                    console.log("Añadiendo artículos de la compra automática a la lista de la compra " + hora());
            //                    loadAnyadirCompraAutomatica();
            //                } else {
            //                    loadAnyadirArticulosComprados();
            //                    console.log("Añadiendo artículos comprados a la lista de la compra " + hora());
            //                }
            //            } else {
            //                if (esCompraAutomatica) {
            //                    console.log("Ha cancelado la compra automática de la lista de la compra");
            //                } else {
            //                    console.log("Ha cancelado artículos comprados a la lista de la compra");
            //                }
            //            }

            jConfirm(texto, "Sorli Discau", function (resultado) {
                if (resultado == true) {
                    if (esCompraAutomatica) {
                        console.log("Añadiendo artículos de la compra automática a la lista de la compra " + hora());
                        loadAnyadirCompraAutomatica();
                    } else {
                        loadAnyadirArticulosComprados();
                        console.log("Añadiendo artículos comprados a la lista de la compra " + hora());
                    }
                }
                else {
                    if (esCompraAutomatica) {
                        console.log("Ha cancelado la compra automática de la lista de la compra");
                    } else {
                        console.log("Ha cancelado artículos comprados a la lista de la compra");
                    }
                }
            });

        }

        function showBorrarListaCompra() {

            jConfirm(traducciones.clientes.quieresBorrarTodosArticulosListaCompra, "Sorli Discau", function (resultado) {
                if (resultado == true) {
                    loadBorrarArticulosListaCompra();
                }
                else {
                    console.log("Ha cancelado el borrado de todos los artículos de la lista");
                }
            });
        }

        function showBorrarArticulo(idListaCompra, idArticulo) {
            // ***** Se comenta, porque dice Juanjo que no pregunte al borrar los artículos.

            //            jConfirm(traducciones.clientes.quieresBorrarArticuloListaCompra, "Sorli Discau", function (resultado) {
            //                if (resultado == true) {
            //                    console.log("Borra el artículo " + idArticulo + hora());
            //                    loadBorrarArticuloListaCompra(idListaCompra, idArticulo);
            //                }
            //                else {
            //                    console.log("Ha cancelado el borrado del artículo " + idArticulo + hora());
            //                }
            //            });
            //            loadTab("alert");
            loadBorrarArticuloListaCompra(idListaCompra, idArticulo);
        }

        function showMarcarArticulo(idListaCompra, idArticulo) {
            //            loadTab("alert");
            loadMarcarArticulo(idListaCompra, idArticulo, true);
        }

        function loadEnviarListaCompra() {
            try {
                loadTab("alert");
                console.log("Inicio enviar por email la lista de la compra " + idListaCompra + " al cliente: " + idCliente + " de la tienda: " + idTienda);
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    resultadoListaCompra = callWSEnviarListaCompra("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/EnviarListaCompra_APP", idListaCompra, idTienda, idCliente);
                } else {
                    resultadoListaCompra = callWSEnviarListaCompra("http://www.sorlidiscau.mobi/supermaduixaws.asmx/EnviarListaCompra_APP", idListaCompra, idTienda, idCliente);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWSEnviarListaCompra(url, idListaCompra, idTienda, idCliente) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idTienda: '" + idTienda + "'," + "idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == true) {
                        jAlert(traducciones.clientes.listaEnviadaCorrectamente, "Sorli Discau");
                    } else {
                        jAlert(traducciones.clientes.errorEnviarLista, "Sorli Discau");
                    }
                    console.log("Final enviar por email la lista de la compra");
                    hideTab("alert");
                },
                error: function (err) {
                    console.error("callWSEnviarListaCompra" + err + hora());
                    hideTab("alert");
                }
            });
        }

        function loadObtenerTiendaCliente() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerTiendaClienteArray = callObtenerTiendaClienteWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerTiendaCliente_APP", idCliente, printObtenerTiendaCliente);
                } else {
                    ObtenerTiendaClienteArray = callObtenerTiendaClienteWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerTiendaCliente_APP", idCliente, printObtenerTiendaCliente);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callObtenerTiendaClienteWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //                    var json = (result.d);
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    console.error("callObtenerTiendaClienteWS" + msg + hora());
                    hideTab("alert");
                }
            });
        }

        function printObtenerTiendaCliente(json) {
            ObtenerTiendaClienteArray = json;
            console.log("Inicio Obtener Tienda cliente" + hora());

            try {
                if (ObtenerTiendaClienteArray.length > 0) {
                    grabarVariable("idTienda", ObtenerTiendaClienteArray[0].IDTIENDA);
                    idTienda = obtenerVariable("idTienda");
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                    console.log("Final Obtener tienda cliente t-" + idTienda + " " + hora());
                } else {
                    console.error("Error al Obtener la tienda del cliente");
                    hideTab("alert");
                }
            } catch (err) {
                console.error(err);
                hideTab("alert");
            }
            hideTab("alert");
        }

        function loadMarcarArticulo(idListaCompra, idArticulo, marcaComprado) {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    MarcarArticulo = callMarcarArticuloWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/MarcarComoComprado_APP", idListaCompra, idArticulo, marcaComprado, printMarcarArticulo);
                } else {
                    MarcarArticulo = callMarcarArticuloWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/MarcarComoComprado_APP", idListaCompra, idArticulo, marcaComprado, printMarcarArticulo);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadMarcarArticulo: " + err + hora());
            }
        }

        function callMarcarArticuloWS(url, idListaCompra, idArticulo, marcaComprado, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "marcaComprado: '" + marcaComprado + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function loadBorrarArticuloListaCompra(idListaCompra, idArticulo) {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    BorrarArticuloListaCompra = callBorrarArticuloListaCompraWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/BorrarArticuloListaComprado_APP", idListaCompra, idArticulo, printBorrarArticuloListaCompra);
                } else {
                    BorrarArticuloListaCompra = callBorrarArticuloListaCompraWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/BorrarArticuloListaComprado_APP", idListaCompra, idArticulo, printBorrarArticuloListaCompra);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadBorrarArticuloListaCompra: " + err + hora());
            }
        }

        function callBorrarArticuloListaCompraWS(url, idListaCompra, idArticulo, callback) {
            console.log("idListaCompra: " + idListaCompra + " idArticulo: " + idArticulo);
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    //                    alert(json);
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printBorrarArticuloListaCompra(json) {
            BorrarArticuloListaCompra = json;
            console.log("Inicio borrado artículo de la lista de la compra" + hora());

            try {
                if (BorrarArticuloListaCompra == true) {
                    EsModoCompra = false;
                    console.log("Final borrado artículos de la lista de la compra" + hora());
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                } else {
                    console.error("Error al borrar el artículo de la lista");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

        }

        function printMarcarArticulo(json) {
            MarcarArticulo = json;
            console.log("Inicio Marcar artículo como comprado de la lista de la compra" + hora());

            EsModoCompra = true;

            try {
                if (MarcarArticulo == true) {
                    console.log("Final marcado del artículo de la lista de la compra" + hora());
                    //                    loadObtenerArticulosListaCompra(idListaCompra, 0, true);
                } else {
                    console.error("Error al marcar el artículo de la lista");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

        }

        function loadAnyadirArticulo(idListaCompra, idArticulo, cantidad) {
            if (idArticulo < 0 || idArticulo == "" || idArticulo == "undefined") {
                var cantidad = document.getElementById("txtCantidad").innerHTML;
                var idArticulo = document.getElementById("lblArticulo").innerHTML;
            }

            console.log(" loadAnyadirArticulo - idArticulo: " + idArticulo + " idTienda: " + idTienda + " cantidad: " + cantidad);

            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    AnyadirArticulos = callWSAnyadirArticulo("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/AnyadirArticulo_APP", idListaCompra, idArticulo, idTienda, cantidad, printAnyadirArticulo);
                } else {
                    AnyadirArticulos = callWSAnyadirArticulo("http://www.sorlidiscau.mobi/supermaduixaws.asmx/AnyadirArticulo_APP", idListaCompra, idArticulo, idTienda, cantidad, printAnyadirArticulo);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadAnyadirArticulo: " + err);
            }
        }

        function callWSAnyadirArticulo(url, idListaCompra, idArticulo, idTienda, cantidad, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                //                data: "{idListaCompra: '" + idListaCompra + "'}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "idTienda: '" + idTienda + "'," + "cantidad: '" + cantidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printAnyadirArticulo(json) {
            AnyadirArticulos = json;
            console.log("Inicio añadir artículo a la lista de la compra" + hora());

            try {
                if (AnyadirArticulos == true) {
                    console.log("Final añadir artículo en la lista de la compra" + hora());
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                    $("#imagenArticulo").html("");
                    mostrarDatos();
                } else {
                    console.warn("Error al añadir el artículo en la lista de la compra" + hora());
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        function loadActualizarCantidad(cantidad) {
            if (cantidad == "undefined" || cantidad == null || cantidad == "") {
                console.log("loadActualizarCantidad: la cantidad es nula, 0, undefined o en blanco");
                cantidad = document.getElementById("txtCantidad").innerHTML;
            }
            console.log("loadActualizarCantidad Cantidad: " + cantidad + " del articulo: " + idArticulo);
            if (cantidad == 0) {
                console.log("Borramos el artículo " + idArticulo + " de la lista, porque tiene cantidad 0");
                loadBorrarArticuloListaCompra(idListaCompra, idArticulo);
            } else {
                try {
                    //                loadTab("alert");
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        ActualizarCantidad = callActualizarCantidadWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ActualizarCantidadListaCompra_APP", idListaCompra, idArticulo, cantidad, printActualizarCantidad);
                    } else {
                        ActualizarCantidad = callActualizarCantidadWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ActualizarCantidadListaCompra_APP", idListaCompra, idArticulo, cantidad, printActualizarCantidad);
                    }
                } catch (err) {
                    hideTab("alert");
                    console.error("Error loadActualizarCantidad: " + err);
                }
            }

        }

        function callActualizarCantidadWS(url, idListaCompra, idArticulo, cantidad, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                //                data: "{idListaCompra: '" + idListaCompra + "'}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "cantidad: '" + cantidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printActualizarCantidad(json) {
            ActualizarCantidad = json;
            console.log("Inicio actualizar cantidad al artículo de la lista de la compra" + hora());

            try {
                if (ActualizarCantidad == true) {
                    console.log("Final actualizar cantidad artículos de la lista de la compra" + hora());
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                    $("#imagenArticulo").html("");
                    mostrarDatos();
                } else {
                    console.error("Error al actualizar la cantidad" + hora());
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        //Borra todos los artículos de una lista de la compra.
        function loadBorrarArticulosListaCompra() {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    BorrarListaCompra = callFinalizarCompraWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/BorrarArticulosListaCompra_APP", idListaCompra, printBorrarArticulosListaCompra);
                } else {
                    BorrarListaCompra = callFinalizarCompraWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/BorrarArticulosListaCompra_APP", idListaCompra, printBorrarArticulosListaCompra);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadBorrarArticulosListaCompra: " + err);
            }
        }

        function printBorrarArticulosListaCompra(json) {
            BorrarListaCompra = json;

            console.log("Inicio: Borrar todos los artículos de la lista de la compra" + hora());

            try {
                if (BorrarListaCompra == true) {
                    console.log("Final: Borrar todos los artículos de la lista de la compra" + hora());
                    hideTab("ModoCompra");
                    $("#tabla-anyadirArticulos").hide();
                    loadTab("datos");
                    $("#tabla-anyadirArticulos").show();
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                } else {
                    console.error("Error: al borrar los artículos de la lista de la compra");
                    hideTab("alert");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

        }

        function loadFinalizarCompra() {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    FinalizarCompra = callFinalizarCompraWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/FinalizarCompra_APP", idListaCompra, printFinalizarCompra);
                } else {
                    FinalizarCompra = callFinalizarCompraWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/FinalizarCompra_APP", idListaCompra, printFinalizarCompra);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadFinalizarCompra: " + err);
            }
        }

        function callFinalizarCompraWS(url, idListaCompra, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idListaCompra: '" + idListaCompra + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = (result.d);
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function loadAnyadirCompraAutomatica() {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    AnyadirCompraAutomatica = callAnyadirArticulosCompradosWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/AnyadirCompraAutomatica_APP", idListaCompra, idTienda, printAnyadirCompraAutomatica);
                } else {
                    AnyadirCompraAutomatica = callAnyadirArticulosCompradosWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/AnyadirCompraAutomatica_APP", idListaCompra, idTienda, printAnyadirCompraAutomatica);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadAnyadirCompraAutomatica: " + err);
            }
        }

        function loadAnyadirArticulosComprados() {
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    AnyadirArticulosComprados = callAnyadirArticulosCompradosWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/AnyadirArticulosComprados_APP", idListaCompra, idTienda, printAnyadirArticulosComprados);
                } else {
                    AnyadirArticulosComprados = callAnyadirArticulosCompradosWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/AnyadirArticulosComprados_APP", idListaCompra, idTienda, printAnyadirArticulosComprados);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadAnyadirArticulosComprados: " + err);
            }
        }

        function callAnyadirArticulosCompradosWS(url, idListaCompra, idTienda, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idTienda: '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = (result.d);
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printAnyadirArticulosComprados(json) {
            AnyadirArticulosComprados = json;

            console.log("Inicio Anyadiendo artículos a la lista de la compra" + hora());

            try {
                if (AnyadirArticulosComprados == true) {
                    console.log("Final Anyadiendo artículos a la lista de la compra" + hora());
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                } else {
                    hideTab("alert");
                    console.error("Error al Anyadiendo artículos a la lista de la compra");
                }

            } catch (err) {
                console.warn(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        function printAnyadirCompraAutomatica(json) {
            AnyadirCompraAutomatica = json;

            console.log("Inicio Anyadiendo artículos calculados automáticamente a la lista de la compra" + hora());

            try {
                if (AnyadirCompraAutomatica == true) {
                    console.log("Final Anyadiendo artículos calculados automáticamente a la lista de la compra" + hora());
                    loadObtenerArticulosListaCompra(idListaCompra, 0, false);
                } else {
                    hideTab("alert");
                    console.error("Error al Anyadiendo artículos automáticamente a la lista de la compra");
                }

            } catch (err) {
                console.warn(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        function printFinalizarCompra(json) {
            FinalizarCompra = json;

            console.log("Inicio Finalizar compra de la lista de la compra" + hora());

            try {
                if (FinalizarCompra == true) {
                    console.log("Final Finalizar lista de la compra" + hora());
                    //                    EsModoCompra = true;
                    //                    loadObtenerArticulosListaCompra(idListaCompra, 0, true);
                    hideTab("ModoCompra");
                    loadTab("datos");
                    $("#tabla-anyadirArticulos").show();
                } else {
                    console.error("Error al finalizar la compra de la lista de la compra");
                    hideTab("alert");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        function loadBuscarArticulos(articulo, descripcion, idtienda) {
            txtDescripcionEan.value = "";
            console.log("idArticulo: " + articulo + " descripcion: " + descripcion + " idTienda: " + idTienda);
            if (descripcion == "") {
                jAlert(traducciones.clientes.rellenaralguncampo, "Sorli Discau");
            } else {
                try {
                    //                loadTab("alert");
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        BuscarArticuloArray = callBuscarArticuloWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerArticulos_APP", articulo, descripcion, idTienda, printBuscarArticulos);
                    } else {
                        BuscarArticuloArray = callBuscarArticuloWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerArticulos_APP", articulo, descripcion, idTienda, printBuscarArticulos);
                    }
                } catch (err) {
                    hideTab("alert");
                    console.error("Error loadBuscarArticulos: " + err);
                }
            }
        }

        function callBuscarArticuloWS(url, articulo, descripcion, idTienda, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idArticulo: '" + articulo + "'," + "descripcion: '" + descripcion + "'," + "idTienda: '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //var json = result.d;
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });

        }

        function printBuscarArticulos(json) {
            console.log("Obteniendo artículos de la búsqueda" + hora());
            BuscarArticuloArray = json;

            hideTabs();

            $("#tablaBusquedaArticulos").html("");
            $('#shopBusqueda').empty();
            //            loadTab("alert");
            try {
                if (BuscarArticuloArray.length > 0) {

                    if (BuscarArticuloArray.length == 1) {
                        loadAnyadirArticulo(idListaCompra, BuscarArticuloArray[0].IDARTICULO, 1);
                        //                        openDetail(BuscarArticuloArray[0].IDARTICULO);
                    } else {
                        loadTab("detalleBuscar");
                        hideTab("buscar");
                        for (i = 0; i < BuscarArticuloArray.length; i++) {
                            var BuscarArticulo = BuscarArticuloArray[i];
                            $("#shopBusqueda").append('<li><a href="#" onclick="openDetail(' + BuscarArticulo.IDARTICULO + ');">' + BuscarArticulo.DESCRIPCION + '<br/><span class="ui-text-list-small">Marca: ' + BuscarArticulo.DESCMARCA + '</a></li>');
                        }
                        $('#shopBusqueda').listview("refresh");
                    }

                } else {
                    jAlert(traducciones.clientes.sinResultados, "Sorli Discau");
                }
            } catch (err) {
                console.error("err printObtenerArticulosListaCompra: " + err + hora());
                hideTab("alert");
            }

            console.log("Final Obteniendo artículos de la búsqueda" + hora());

            hideTab("alert");

            currentSection = 31;
        }

        function openDetail(idArticulo) {
            hideTabs();

            var articulo = getArticuloWithId(idArticulo);
            currentArticulo = articulo;

            loadTab("detalleArticulo");

            if (idioma == "ca") {
                $("#lblDescripcionArticulo").text(articulo.DESCRIPCION2);
            } else {
                $("#lblDescripcionArticulo").text(articulo.DESCRIPCION);
            }

            if (articulo.DESCMARCA == "" || articulo.DESCMARCA == null || articulo.DESCMARCA == "undefined") {
                $("#lblMarca").hide();
                $("#lblTituloMarca").hide();
            } else {
                $("#lblMarca").show();
                $("#lblTituloMarca").show();
            }
            $("#lblArticulo").text(articulo.IDARTICULO);
            $("#lblUnidadVenta").text(articulo.UNIDADVENTA);
            idSeccion = articulo.IDSECCION;
            unidadventa = articulo.UNIDADVENTA;
            $("#lblMarca").text(articulo.DESCMARCA);
            $("#txtCantidad").html("1");
            loadObtenerImagen(articulo.IDARTICULO);

            hideTab("btnActualizarCantidad");
            loadTab("btnAnyadirArticulo");

            currentSection = 32;
        }

        function getArticuloWithId(idArticulo) {
            for (i = 0; i < BuscarArticuloArray.length; i++) {
                idArticulo2 = BuscarArticuloArray[i];
                if (idArticulo2.IDARTICULO == idArticulo) {
                    return idArticulo2;
                }
            }
        }

        function loadObtenerArticulosListaCompra(idListaCompra, idArticulo, soloNoComprados) {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    console.log("esModoCompora:" + EsModoCompra);
                    if (EsModoCompra == true) {
                        ObtenerArticulosListaCompraArray = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulo, soloNoComprados, printObtenerArticulosListaCompraModoCompra);
                    } else {
                        ObtenerArticulosListaCompraArray = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulo, soloNoComprados, printObtenerArticulosListaCompra);
                    }
                } else {
                    if (EsModoCompra) {
                        ObtenerArticulosListaCompraArray = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulo, soloNoComprados, printObtenerArticulosListaCompraModoCompra);
                    } else {
                        ObtenerArticulosListaCompraArray = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulo, soloNoComprados, printObtenerArticulosListaCompra);
                    }
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadObtenerArticulosListaCompra: " + err);
            }
        }

        function callWS(url, idListaCompra, idArticulo, soloNoComprados, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "soloNoComprados: '" + soloNoComprados + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //var json = result.d;
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printObtenerArticulosListaCompra(json) {
            hideTabs();
            loadTab("datos");
            var imagen;
            var formato;

            console.log("Obteniendo artículos lista de la compra" + hora());
            ObtenerArticulosListaCompraArray = json;

            $("#tablaListaCompra").html("");
            //            loadTab("alert");
            try {
                if (ObtenerArticulosListaCompraArray.length > 0) {
                    for (i = 0; i < ObtenerArticulosListaCompraArray.length; i++) {
                        var ObtenerArticulosListaCompra = ObtenerArticulosListaCompraArray[i];
                        //***************************
                        //Aquí nos tendríamos que recorrer y llamar a un load nuevo para que nos de la imagen y grabar un localstorage en el móvil con el idArticulo y la imagen del producto.
                        //***************************
                        // *** falta saber como guardar el idarticulo con la imagen en un datatable en el móvil y luego mostrar la imagen del movil.
                        if (ObtenerArticulosListaCompra.CANTIDAD != 0) { //Solo mostramos los que tienen cantidad superior a 0
                            imagen = ObtenerArticulosListaCompra.IMAGEN;
                            formato = ObtenerArticulosListaCompra.UNIDADVENTA;
                            if (formato == 0) {
                                formato = "/Kg";
                            } else {
                                formato = "";
                            }
                            if (imagen == null || imagen == "" || imagen == "undefined") {
                                imagen = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFOUNGMUQ3MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFOUNGMUQ2MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUyBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDowYTQ2NDNjMS0yN2RhLTExZTAtYjg0YS1hZTA0MTdlNGViMDIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYTQ2NDNjMC0yN2RhLTExZTAtYjg0YS1h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";
                            }
                            if (idioma == "ca") {
                                $("#tablaListaCompra").append('<tr><td onclick="showBorrarArticulo(' + ObtenerArticulosListaCompra.IDLISTACOMPRA + "," + ObtenerArticulosListaCompra.IDARTICULO + ');" rowspan="3" style="width: 10px; border-bottom-width: thin; padding-right: 25px; background-position: left; vertical-align: middle; background-image: url(img/botonBorrar.png); background-repeat: no-repeat; border-bottom-style: solid;"></td><td colspan="2" style="font-size:13px;"><b>' + ObtenerArticulosListaCompra.DESCRIPCION2 + '</b></td></tr><tr><td onclick="ObtenerDetalleArticulo(' + ObtenerArticulosListaCompra.IDARTICULO + "," + false + ')"  style="max-height: 100px; height:100px; border-bottom: solid; border-bottom-width: thin; cursor: pointer; vertical-align: middle; text-align: center;" rowspan="2"><img alt="" src="data:image/jpg;base64,' + imagen + '" /></td><td style="vertical-align: bottom; height:50px; text-align: right; padding-right: 80px;"><span id="lblPVP" class="sorlibold18Magenta">' + redondear(ObtenerArticulosListaCompra.PVP1) + ' €' + formato + '</span></td></tr><tr><td style="border-bottom: solid; border-bottom-width: thin; vertical-align: middle; text-align:right;"><a href="#" data-role="button" data-inline="true" data-icon="minus" onclick="cambiarCantidad(' + i + "," + redondear(ObtenerArticulosListaCompra.CANTIDAD) + "," + 0 + "," + ObtenerArticulosListaCompra.UNIDADVENTA + "," + ObtenerArticulosListaCompra.IDARTICULO + ')"><img src="img/botonMenos.png" alt="" style="background-position: center; "></a>&nbsp;<span class="ui-text-description" id="lblCantidad' + i + '" style="font-size: 15px; font-weight: bold; background-position: center; vertical-align: text-top;">' + redondear(ObtenerArticulosListaCompra.CANTIDAD) + '</span>&nbsp;<a href="#" onclick="cambiarCantidad(' + i + "," + redondear(ObtenerArticulosListaCompra.CANTIDAD) + "," + 1 + "," + ObtenerArticulosListaCompra.UNIDADVENTA + "," + ObtenerArticulosListaCompra.IDARTICULO + ')"><img alt="" src="img/botonMas.png" alt="" style="background-position: center; "></a></td></tr>');
                            } else {
                                $("#tablaListaCompra").append('<tr><td onclick="showBorrarArticulo(' + ObtenerArticulosListaCompra.IDLISTACOMPRA + "," + ObtenerArticulosListaCompra.IDARTICULO + ');"rowspan="3" style="width: 10px; border-bottom-width: thin; padding-right: 25px; background-position: left; vertical-align: middle; background-image: url(img/botonBorrar.png); background-repeat: no-repeat; border-bottom-style: solid;"></td><td colspan="2" style="font-size:13px;"><b>' + ObtenerArticulosListaCompra.DESCRIPCION + '</b></td></tr><tr><td onclick="ObtenerDetalleArticulo(' + ObtenerArticulosListaCompra.IDARTICULO + "," + false + ')"  style="max-height: 100px; height:100px; border-bottom: solid; border-bottom-width: thin; cursor: pointer; vertical-align: middle; text-align: center;" rowspan="2"><img alt="" src="data:image/jpg;base64,' + imagen + '" /></td><td style="vertical-align: bottom; height:50px; text-align: right; padding-right: 80px;"><span id="lblPVP" class="sorlibold18Magenta">' + redondear(ObtenerArticulosListaCompra.PVP1) + ' €' + formato + '</span></td></tr><tr><td style="border-bottom: solid; border-bottom-width: thin; vertical-align: middle; text-align:right;"><a href="#" data-role="button" data-inline="true" data-icon="minus" onclick="cambiarCantidad(' + i + "," + redondear(ObtenerArticulosListaCompra.CANTIDAD) + "," + 0 + "," + ObtenerArticulosListaCompra.UNIDADVENTA + "," + ObtenerArticulosListaCompra.IDARTICULO + ')"><img src="img/botonMenos.png" alt="" style="background-position: center; "></a>&nbsp;<span class="ui-text-description" id="lblCantidad' + i + '" style="font-size: 15px; font-weight: bold; background-position: center; vertical-align: text-top;">' + redondear(ObtenerArticulosListaCompra.CANTIDAD) + '</span>&nbsp;<a href="#" onclick="cambiarCantidad(' + i + "," + redondear(ObtenerArticulosListaCompra.CANTIDAD) + "," + 1 + "," + ObtenerArticulosListaCompra.UNIDADVENTA + "," + ObtenerArticulosListaCompra.IDARTICULO + ')"><img alt="" src="img/botonMas.png" alt="" style="background-position: center; "></a></td></tr>');
                            }

                        }
                    }
                } else {
                    alerta(traducciones.clientes.listaVacia);
                }
            } catch (err) {
                console.error("printObtenerArticulosListaCompra: " + err + hora());
                hideTab("alert");
            }

            console.log("Final Obteniendo artículos lista de la compra" + hora());

            hideTab("alert");

            currentSection = 2;
        }

        function borrarFila(idListaCompra, idArticulo, id) {
            showMarcarArticulo(idListaCompra, idArticulo);
            $("#fila" + id).remove();
        }

        function printObtenerArticulosListaCompraModoCompra(json) {
            console.log("Obteniendo artículos lista de la compra (modo compra)" + hora());
            ObtenerArticulosListaCompraArray = json;
            var imagen;
            var totalCompra = 0;
            var totalLinea = 0;
            var formato;

            hideTabs();
            loadTab("ModoCompra");

            $("#tablaListaCompraModoCompra").html("");
            $("#tablaListaCompraModoCompraTotal").html("");
            //            loadTab("alert");
            try {
                if (ObtenerArticulosListaCompraArray.length > 0) {
                    for (i = 0; i < ObtenerArticulosListaCompraArray.length; i++) {
                        var ObtenerArticulosListaCompra = ObtenerArticulosListaCompraArray[i];
                        if (ObtenerArticulosListaCompra.CANTIDAD != 0) { //Solo mostramos los que tienen cantidad superior a 0
                            imagen = ObtenerArticulosListaCompra.IMAGEN;
                            formato = ObtenerArticulosListaCompra.UNIDADVENTA;
                            if (formato == 0) {
                                formato = "/Kg";
                            } else {
                                formato = "";
                            }
                            if (imagen == null || imagen == "" || imagen == "undefined") {
                                imagen = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFOUNGMUQ3MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFOUNGMUQ2MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUyBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDowYTQ2NDNjMS0yN2RhLTExZTAtYjg0YS1hZTA0MTdlNGViMDIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYTQ2NDNjMC0yN2RhLTExZTAtYjg0YS1h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";
                            }
                            totalLinea = ObtenerArticulosListaCompra.PVP * ObtenerArticulosListaCompra.CANTIDAD;
                            if (idioma == "ca") {
                                $("#tablaListaCompraModoCompra").append('<tr id="fila' + i + '"><td data-theme="c" onclick="borrarFila(' + ObtenerArticulosListaCompra.IDLISTACOMPRA + "," + ObtenerArticulosListaCompra.IDARTICULO + "," + i + ');" style="width: 10%; height: 100px; background-position: left ; background-image: url(img/botonMarcar.png); background-repeat: no-repeat; cursor: pointer; border-bottom:solid; border-bottom-width:thin;"></td><td style="border-bottom:solid; border-bottom-width:thin;text-align:center;"><img src="data:image/jpg;base64,' + imagen + '" /></td><td style="cursor:pointer; font-size:12px; border-bottom:solid; border-bottom-width:thin; "><b>' + ObtenerArticulosListaCompra.DESCRIPCION2 + '</b><br><span id="lblPVP" class="sorlibold18Magenta">' + redondear(ObtenerArticulosListaCompra.PVP * ObtenerArticulosListaCompra.CANTIDAD) + '€</span></td><td style="border-bottom:solid; border-bottom-width:thin; ">&nbsp;&nbsp;<span class="ui-text-description" id="lblCantidad' + i + '" style="font-weight: bold; font-size: 16px;">' + redondear(ObtenerArticulosListaCompra.CANTIDAD) + '</span></td></tr>');
                            } else {
                                $("#tablaListaCompraModoCompra").append('<tr id="fila' + i + '"><td data-theme="c" onclick="borrarFila(' + ObtenerArticulosListaCompra.IDLISTACOMPRA + "," + ObtenerArticulosListaCompra.IDARTICULO + "," + i + ');" style="width: 10%; height: 100px; background-position: left ; background-image: url(img/botonMarcar.png); background-repeat: no-repeat; cursor: pointer; border-bottom:solid; border-bottom-width:thin;"></td><td style="border-bottom:solid; border-bottom-width:thin;text-align:center;"><img src="data:image/jpg;base64,' + imagen + '" /></td><td style="cursor:pointer; font-size:12px; border-bottom:solid; border-bottom-width:thin; "><b>' + ObtenerArticulosListaCompra.DESCRIPCION + '</b><br><span id="lblPVP" class="sorlibold18Magenta">' + redondear(ObtenerArticulosListaCompra.PVP * ObtenerArticulosListaCompra.CANTIDAD) + '€</span></td><td style="border-bottom:solid; border-bottom-width:thin; ">&nbsp;&nbsp;<span class="ui-text-description" id="lblCantidad' + i + '" style="font-weight: bold; font-size: 16px;">' + redondear(ObtenerArticulosListaCompra.CANTIDAD) + '</span></td></tr>');
                            }
                            totalCompra = redondear(totalCompra + totalLinea);
                        }
                    }
                    $("#tablaListaCompraModoCompraTotal").append('<tr><td style=" height: 50px; border-bottom:solid; border-bottom-width:thin;"><b>TOTAL:</b></td><td style="border-bottom:solid; border-bottom-width:thin;"></td><td style="cursor:pointer; font-size:13px; border-bottom:solid; border-bottom-width:thin; "></td><td style="border-bottom:solid; border-bottom-width:thin; text-align: right;"><b>' + totalCompra + '€</b></td><td align="right" style="border-bottom:solid; border-bottom-width:thin; "><span class="ui-text-description" style="font-weight: bold; font-size: 16px;"></span></td></tr>');
                } else {
                    console.log("No tiene nada la lista o no existe");
                }
            } catch (err) {
                console.error("printObtenerArticulosListaCompraModoCompra: " + err + hora());
                hideTab("alert");
            }

            console.log("Final Obteniendo artículos lista de la compra (modo compra)" + hora());

            hideTab("alert");

            EsModoCompra = false;

            currentSection = 99;
        }

        function cambiarCantidad(id, cantidad, signo, formato, articulo) {
            idArticulo = articulo;
            var n = document.getElementById("lblCantidad" + id).innerHTML;

            console.log("id: " + id + " cantidad: " + cantidad + " signo: " + signo + " formato: " + formato + " articulo: " + articulo);

            if (signo == 0) {
                if (formato == 0) {
                    $("#lblCantidad" + id).html(redondear(parseFloat(n) - 0.050));
                } else {
                    $("#lblCantidad" + id).html(parseInt(n) - 1);
                }
            } else {
                if (formato == 0) {
                    $("#lblCantidad" + id).html(redondear(parseFloat(n) + 0.050));
                } else {
                    $("#lblCantidad" + id).html(parseInt(n) + 1);
                }
            }
            if (document.getElementById("lblCantidad" + id).innerHTML < 0) {
                console.log("Cantidad 0 o inferior a 0");
                $("#lblCantidad" + id).html("0");
                loadActualizarCantidad(0);
            } else {
                console.log("Actualizamos el articulo: " + idArticulo + " con cantidad: " + document.getElementById("lblCantidad" + id).innerHTML);
                loadActualizarCantidad(document.getElementById("lblCantidad" + id).innerHTML);
            }
        }

        function cambiarCantidadSinId(cantidad, signo, formato, articulo) {
            idArticulo = articulo;
            var n = document.getElementById("txtCantidad").innerHTML;

            console.log("cantidad: " + n + " signo: " + signo + " formato: " + formato + " articulo: " + articulo);

            if (signo == 0) {
                if (formato == 0) {
                    $("#txtCantidad").html(redondear(parseFloat(n) - 0.050));
                } else {
                    $("#txtCantidad").html(parseInt(n) - 1);
                }
            } else {
                if (formato == 0) {
                    $("#txtCantidad").html(redondear(parseFloat(n) + 0.050));
                } else {
                    $("#txtCantidad").html(parseInt(n) + 1);
                }
            }
            if (document.getElementById("txtCantidad").innerHTML < 0) {
                $("#txtCantidad").html("0");
                console.log("Cantidad inferior a 0, le ponemos un 0");
            }
            //Si se llamase a la función de actualizar, no podríamos sumar o restar a la medida que quisiéramos porque volvería al listado.
            //loadActualizarCantidad(document.getElementById("txtCantidad").innerHTMLM);
        }

        function ObtenerDetalleArticulo(idArticulotmp, soloNoComprados) {
            idArticulo = idArticulotmp;
            try {
                //                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerDetalleArticuloArray = callObtenerDetalleArticuloWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulotmp, soloNoComprados, printObtenerDetalleArticulo);
                } else {
                    ObtenerDetalleArticuloArray = callObtenerDetalleArticuloWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerArticulosListaCompra_APP", idListaCompra, idArticulotmp, soloNoComprados, printObtenerDetalleArticulo);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error ObtenerDetalleArticulo: " + err + hora());
            }
        }

        function callObtenerDetalleArticuloWS(url, idListaCompra, idArticulo, soloNoComprados, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "soloNoComprados: '" + soloNoComprados + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //var json = result.d;
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printObtenerDetalleArticulo(json) {
            console.log("Inicio obteniendo detalle del artículo" + hora());
            ObtenerDetalleArticuloArray = json;

            hideTab("datos");
            loadTab("detalleArticulo");

            try {
                if (ObtenerDetalleArticuloArray.length > 0) {
                    for (i = 0; i < ObtenerDetalleArticuloArray.length; i++) {
                        var ObtenerDetalleArticulo = ObtenerDetalleArticuloArray[i];
                        if (idioma == "ca") {
                            $("#lblDescripcionArticulo").text(ObtenerDetalleArticulo.DESCRIPCION2);
                        } else {
                            $("#lblDescripcionArticulo").text(ObtenerDetalleArticulo.DESCRIPCION2);
                        }

                        if (ObtenerDetalleArticulo.MARCA == "" || ObtenerDetalleArticulo.MARCA == null || ObtenerDetalleArticulo.MARCA == "undefined") {
                            $("#lblMarca").hide();
                            $("#lblTituloMarca").hide();
                        } else {
                            $("#lblMarca").show();
                            $("#lblTituloMarca").show();
                        }
                        $("#lblidArticulo").text(ObtenerDetalleArticulo.IDARTICULO);
                        $("#lblUnidadVenta").text(ObtenerDetalleArticulo.UNIDADVENTA);
                        unidadventa = ObtenerDetalleArticulo.UNIDADVENTA;
                        $("#lblMarca").text(ObtenerDetalleArticulo.MARCA);
                        //                        txtCantidad.value = ObtenerDetalleArticulo.CANTIDAD
                        $("#txtCantidad").html(redondear(ObtenerDetalleArticulo.CANTIDAD));

                        //$("#imagenArticulo").html('<left>' + displayImage(obtenerVariable(ObtenerDetalleArticulo.IDARTICULO)) + '</left>');
                        loadObtenerImagen(ObtenerDetalleArticulo.IDARTICULO);

                        hideTab("btnAnyadirArticulo");
                        loadTab("btnActualizarCantidad");
                    }
                } else {
                    console.log("No tiene nada la lista o no existe" + hora());
                }
            } catch (err) {
                console.error("err printObtenerDetalleArticulo: " + err + hora());
                hideTab("alert");
            }

            console.log("Final Obteniendo detalle artículo" + hora());

            hideTab("alert");

            currentSection = 4;
        }

        function displayImage(base64Data) {
            return "<img src='" + "data:image/jpg;base64," + base64Data + "' style='max-height: 200px; max-width: 200px;' border='0' />";
        };

        function loadObtenerImagen(idArticulo) {
            loadTab("alert");
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    imagenArticuloArray = callObtenerImagenWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerImagenArticulo_APP", idArticulo, printObtenerImagen);
                } else {
                    imagenArticuloArray = callObtenerImagenWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerImagenArticulo_APP", idArticulo, printObtenerImagen);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadObtenerImagen: " + err + hora());
            }
        }

        function callObtenerImagenWS(url, idArticulo, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idArticulo': '" + idArticulo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        //Montamos los tags de imagenes y los ponemos en el DIV correspondiente.
        function printObtenerImagen(json) {
            console.log("Inicio obteniendo imagen del artículo grande" + hora());

            try {
                imagenArticuloArray = json;
                if (imagenArticuloArray[0].IMAGENSTRING != "") {
                    $("#imagenArticulo").html('<left>' + displayImage(imagenArticuloArray[0].IMAGENSTRING) + '</left>');
                } else {
                    $("#imagenArticulo").html('<left>' + displayImage("iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxRjAzRTU0MjEwRTExRTNBNTZFRURDNTE3ODQ4RDNCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxRjAzRTUzMjEwRTExRTNBNTZFRURDNTE3ODQ4RDNCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUyBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDowYTQ2NDNjMS0yN2RhLTExZTAtYjg0YS1hZTA0MTdlNGViMDIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYTQ2NDNjMC0yN2RhLTExZTAtYjg0YS1hZTA0MTdlNGViMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ftyqMAABAeklEQVR42uydCbDV1Z3nr0o0uERBUUAUF0RcccWNCKIoRpTEtEp30qa1247p9CTVXelM21PVk0x1ZqY6U220NNoxhRlHE22XxAQjigFRFMRoxCgqAoKaEBEjbhAXkjmff7/PrR8n9/Eect9yH+dU3Xr33f1/zu/725et/vCHP9TKKqusxmurApCyyioAKausApCyyioAKausApCyyioAKausApCyyioAKausApCyyioAKaussgpAyiqrAKSssgpAyiqrAKSssgpAyiqrAKSssgpAyiqrAKSssgpAyiqrAKTsQlllFYCUVVYvBshLL75YdrttvfX227uuXLly5DvvvLPre++91z+dwTZvv/32Lq+//vqw9P/2/fr1e/f999/fjtdus8026/l/2223XffRj370re222+7tj3zkI+/uuOOOr33sYx9btcceezy/ff/+b5Vd/c+11957N/Xz+pUt7bq1dt26nZ5//vmTli5dOmb16tXD165du0si/G1///vf99tqq60mffDBB9XrEsEDhFr8H8aVXlf/W+doW21V/8vr020OANt+++3XDBo0aMXgwYMXDxw48OX9999/3sABA1aWUygSpNes19esGbJo0aIJy5cvPzrdRkPEifAnQPxbb711bf369RJ1LUmCivjz/fcx3pM/Hp+vuFu/ftWNlYBXfT7P8V3p76wEtLUDEkj23Xffxw866KBZQ4cMWVwkSAFIt631v//9No899ti5zzzzzLjXXnttGGoRkgFgyOnh/hAuf3ksqUqVhFi3bl39NZwB99sIuy4x4ufkQMk/nxvv5/O58fi7775ba1PT+H8mqtqwYcOe2meffRYef9xxNxeAFIB0yVq+YsXoe+655+9Rl5LNMBXuHRfEyQ3CVBJIxBK/UgVCj0QfQdMIGBFQgqoNAPVbVM8AI4ABLICS/3feeedbk8o3bNSoUQ8dc8wxdxwwYsS8ApACkM1aryYb4qGHHvpssimObzOkJ0S7AEIVHBKm9xstn4sSwtcqSf7osIL9EYEYJVAudVTrAJG2Tfr9dfCm52Ym43/tiBEj5h999NF3tLoaVgDSzWvBo4+e9/Of/3wKKlTixOMgKrhxBAAEiS2gncEtEnOUCnJ3Xqs0aSRJcpsk2iDxc3mvN79bdSsRfvWa3/3ud9Vj/Ga/VyNftY9rSsCZm4z8ZQceeOCc8ePGTSsAKQBpd931059+5dVXX90n3YYnFWqyEiJy6qjK5FxeIo3cPn9/tE38fD8zB1hui3Skivm7VMG4z/cFm6T6jKjyeT8B5k6k5Pjx46e1mq1SANLFa9bs2ZckVeoz/fv3f+udd96ZzP5sv/32FZdFNVFd4S9SQ0kSgSLhRYDE56JLNxJ8BFyUDvFxH4vvj2fo87wf24jX8b/SQ5VLQ56/LK7Na3nrrbdqu+yyS23t2rWz0nvWJ9XrztMnTry6AGQLBsjM++774oIFC86FIBJxTZSAJM4oAXI1KBKzXqWoEkWgKDW47bTTThjMlSoE2HD97rjjjrUddtih/t28HhUJAxs1COLm8d/85jcbfI9Sxs/mvioW7xXYuoV9b/SaeQ3+bt3I6f0zCU4ee+yxPxx38snTCkC2IIA88+yz4372s59d+vrrrw/BxlAnf+ONNypChWCSJKkpSSAYCDZKhkiUEUAQJJ8FoQ4YMKA2dOjQ2vDhw2u77757bY899qgAwY0FAfMZ2jKNDPgIBsDy9ttv11avXl175ZVXaqtWraqtXLmyur9mzZrqe3keKRK/JwYd+R6e53N5vYBEkvD5Sk2+j8fSdc9JNsrS45Ladfhhh80sAOnDAFmdjO5Zs2ZdSlAvEcIkiN4AHYBIKtYGhrDEI4FB9BI1SwkgB05qSQWI/fffvzZo0KC6jh9dtLk90QhwjTxT+Wvjb+Q3QfSPP/54bcmSJbUXXngBVakidK7R345UQYJpxGuHROnCX5gErwFsxnASM5mXruvRM888898G7bbbigKQPgSQ9z/4YNtEPFPmzJlzcfp3EsQEcUHc3IfgICAIKkoFiVGpwPPuHUS055571g466KDaoYceWgEDDgxoJLrctsij6FG1idJjY1Ikfz6+xs/jmpAyzz//fO2ZZ56pLVu2rPbaa69VDEDJoRqnpOB/GQT2CK8DTICK6x44cGD1mUkS3pyud+aJJ55440f69XuvAKTFAfLiSy8deu+9934pqSOXQLwQgjo5B899iT9y8aj2RFtk1KhRtaSX10aOHFkZtQJBVSmqNLmXKqaSbOwMGsVJcrsjuoKjh02bJNonEDb2S2IQFWiQlthBvB4AxMCj3q8opeL1ASYky2677XYD0mT43nsvLABpUYA8OHfuhffff//F6XDHQRCCAGnBHqCGaC9wX6KCEFBbeAwC2XfffStATJo0qR6lzgk4xjTakwIRMI0kwaau9r7PldtILGwWVLFHHnmkuo/U0HbR48VCurbZIPU94y/Sif1pk5Yzx40bN+2E44+/uQCkhQCy7ne/22n69On/9amnnpqQgHECh4shi7dIySERcOgapXBP/vr/fvvtV0uqRO2www6rOC7EEVNJ8n38MATfEZG39/pGalZ7gUefB/QQPQs16he/+EUt2WS1F9M5sTcGEqNrWSkEIFRJVTF5bQLWvKRmzjn77LP/Z0+l4BeAbMJ6bvHisXOT5EiAuARi0DvjQcMxo/6tWiQRQQB4nSZMmFA74ogjKqLg9RtTjzZXEnTXiipY9Fw99thjtYcffri2YsWKijnouQNEvJ7/2RfUsY997GP1vWNvkLJ87oABA2467bTTrh55wAHzCkB6KUDmPPDAxU8++eSkpHOfh32gGiUIkCRvvvlm9TgcUOPUtPG900ZPnDixdswxx1Sv570arqoWOSg2VQL05IL4VQ+j2meuFt6vO++8s7Z48eIKCAAJMMT902bxuv28Ng/ZrUiTiQkoBSC9DCB3/vjH/23RokXj0t2JEj6HC5eDyDFMIYJdd921Hm3m4F9//fXa4MGDa2eccUZt7Nix9Wi4qkhOSO2pL60iSaLDIXrPjP1w3UkC15KKWtklqJbsFXsng+EvN16PBOI1ervS/TuHDh36zAXnn39ZAUgvAcjNt9zyv5YtWzYmHdoE7QsT9zS24YgQAgeM9DBG8PGPf7x21llnVYcspzQeEKPMSpD2QJAH+Xo7OOJvZY+4XqSBdgoG/F133VV74okn6kzDPVD9wm7htewlz7GvAIXCrWS/LZh6wQWXFYD0MEC+/4MffHPp0qXHEhFXhYgJeUaNOUw5IlFnpMYFF1xQGeC8xoPmb17U1CoA6GhFW8qAZ3Q6RDtM1ennP/957b777qv96le/qoChJ9BCLfaUPWN/tUfawDgLSfLnf/7nX95m663XF4B0M0DefuedXW644YarqPtOuu9YOJcBMFMtJGjuk0aCROG5cePGVS5bwCLRxHT0qHZsqjep1RdEjlHOQsKyZwQZf/azn9Xuv//+eo0JqpXuX/ZUJsNfjXpes9dee12bGNFXu9LDVQCSrVdWrdr/hz/84T8n++FCYxa6IPPUiUjMHNx5551XO+644/4oeJcTfKO8qFYHQ0cu4vh/Hrfh+fnz59fuuOOOSgJr1+EMsZTYjGHtk7akR4KKN02dOvUfBuyyy8pWAMg2X/va17rlQN5MXLvZiyq/e++997/85je/udSobzxUCYADQic2z+qQQw6p/dVf/VXtgAMOqKeOx2hzJIhIRHlGbyuvGIVvlBfWKEvY/7lPag35ZsRNkCowHAOLusyROuaGhZjL4ek9Aw4YOfKhxMjWNfu60AQKQNL67euvD5k9e/alyXD8KlxKUa7ObKo3hnjiWtVh8dzkyZOrG9m0MWs26t55R5GcqPrS6uh68sKtCCiYDnYbRjopLL/97W8r+8NYkyn3go18Lu4nFfdIQHLY4Yff02ybpNkAaUkV64P167f53ve+dw0BQLiZASvVKyPiAADxj/HIYZ5zzjm1E044of6aXErEXKv2QFLWhp4wbbXErGo//vGP62dgcRn7bj0LjEu3OY+Rw3Xp5z//ud6sYm3digfzgx/84N9Wrlx5CUQMV4JjybW0QyxC4mCoxfjkJz9ZO+WUU+ruWVNJIjB8vICj9kc2SKMeXjIT/hI3+uxnP1tXqUxN4Vx0G7P3esY4H5wq066//prefP0tB5Af/+Qn/7hkyZJj9cHrdzclQqDIpQDQn/7pn1beKt28RovzOnENeuMnZW0cODASPIKmmuDZwlBnX5UYlvryfKycbItNjUv248hbb7vtXwpAmrDoMDJv3rypu++++wmKcblTbDpgQiLFShdeeGGVR5WnmCvuPezY0CBm6G7pKzaNyI15bhZdffOb36y9/PLLFWCsRrRMgMVZ4TaGSXHf4GxSgelEOfruGTP+rgBkM9ayF1446r777rs0qUuj8URZ3adKhDEugXMQeKhw41LAZIODmDYSqwFjlNw07iIh/rDR59wjzuLaa6+takvYU2w+QGOuFvZfBJS9uQwutlUrTqY7JeXPvW0fWqJ5NYHA6dOn/2M6gAmoUnAps3Pj5tsTCjH/xS9+sTLeq4tMnCwWQPlYfuix+UIByB82ChLbp37ve9+rPfroo1UVJblsMCilupkI2nsyKu1E9hlmho2YGNyUZOi/nc5u5ZDBg3tN87qWoIQf/ehH/5w2/TzUKlyKbCibHlOsza+iHHTq1KkVFzNRMW+n04hLxvqJMjNl4+5fnmPfAcdTTz1VxUSMprM8J9sbmfVrfU1MtXe/cQ+vXLnyMw8++OCFRcXahDX7/vsvWbx48Ulssj51DsMOhxyG2aM8f+6559ZGjx5dly5yL/+2l5KedyTZUiWEj6tC5R0gK4me1KbrrruuqkbkMWwJHSLWsXPffDZSeQQGbt/YvV4pYoOI5557bixnXgDSibXixRdH06sqbfYY9V0CQW6oeVbm/Zx22mmVQZ63+txY79ot3fhu73HbAFkDwt7pIQQcSA7KBXSlo/pyLpwR0oD3AQIYFnU1n/rUp+oMK1ZtavfxWFvJ77j58+eft2Tp0jEFIB0scqxoyePBsKERFC7EOH54UtX1tccmamV1LElyiaITBKnMgvjZd7xVGOQyKhaE7RnxepthEHsaP358pf7CvCgnIC0FNdjCNBY2IwC0tVB6fCLNNd57//1tC0DaWbj9EhfaybR1O47ImYzYsqk0Ufj0pz/9R6pT7p7MW4SWtfFlK1LV1yuuuKLKvTIBkcc5A+5r/9k6acqUKVXsyb1H7eIxvIqkpCiVdNVbYsANCfTGG2985oEHHri4AKQd1eqxxx6bkg5iIpwJ8e0wGDbWgB9AgTtRy2H6SG5jNMpMLSrWH6tU+V7lLUgvv/zyqqeWNex6qUzp4THaCUHcSHIkRt5+FUmD6137xM/AK8n7eVxpxeNJjZv4m1de2b8AJFv33HPPl4iyEtsAAHAfuY39ZZUGbDguxmhQNmqw5v3iwq116Kmz64l237e//e2q6RwLZhWb5lmrz7lgZAOMM888sx6jchSEdSUkiZLZAAD4bBib56l67BklSXPu3Xff/ZUCkLB+8cQTk1evXr0PEsMeVWwem6/49hBJPKRxW3vVfrmkiE2kC0D+sMFUqnxClak606ZNqzqdYJDzP+cis7IzDI8jDc4+++wKHOZiKX3i4nVHHnlk7eSTT66nBpmOYjY2i7/YJkwDnjd//tQCkLZFKkn6M0HDzxwrbI04EIY+VSeddNIGHdVVwTYW7+iIe25JqtXGnsMz9Z3vfKcyyLEt2HOJXgeJnJ/H8FRxk+DjPnseMZ3n1FNPrQ0bNmwDqW+3RiPuFGPRW2DhwoVnMg9yiwcIrXqSWB1max0r1WLPWJPdTj/9dEo4N/DRt1cl19H/Xa2y9LSHqtGKTeHcD++j2gKORYsWVftrIwfVJMATh/Cg5hLr4PNiQ7k4dEhguADdJz7xiQ0aRKhyKUFQrwFcookLZ86c+cUtGiDvvvde/wULFnwqbdC4vOdUbKbM4Rx++OFVoY4HHVPXozTpTj2+vfu9wQBvz0NlsFWg6Ai5/vrra4lrV65cH1fd5T7GtBkKeKaQBrZW8rM7WqhonCEqsm1f4/6Z8evYiSeffPLM3737bv8tFiCzZ8++JHGKydFQs9DJwTHc0EvhVnpOPAz7xuacanM5bXsrzvmLXDLme/VWSeJ9p94aDef+v/7rvxLNrqoweZ7zgEC5z4JRWV6ABAAcXjfP5ZOz2lsmKlLdyRnzXgvfBK51Paha6TdPuvfee7+8RQKE/rnPPPPMBDYo5k3BwfBgIY4Rv2wYvnW6HprsJpHG1OpNJfYPE133u9TDTWNpb0Jtb/JSuWdyaX4/4Ljyyitrv/71ryviZd8FDYyK95ADZ84V4JBR+Tq7wnRGgusQYJgQhj2uXplg9EjyP65j7pNy1N1SpFcAhP65iStNUUUyYq4tYhSdFHaqAnUJqn6Zxh7rOrp6Ka38fkESJ9z2tHoV4z75b3JOu0T5rW99q+rHqzHOfgKg2MuYGhu4PVxftYpljpwOlM640gUTqhZZEDA9pJT9kq3L4fMASFuXmskMPdqiAIJ3ggQ1XYUaj2wUuilSBO7CptNE2uE2sR2NBGr3jO4gUCWF6lwEd28y2NsbwCMzQTpgkKNWaYg7bYtrNEkUhmScQ4NcRha/x9SUjpZReqsNydXSCRDjMDyP0wC7h9/6bDfXjPR4PcjDDz/8mXQIU2OH8egO1ICDw2CcqxrksQ4T7CJ3+jCqiJ9HPUlnVCyJ7uqrr+5VBrqtjNqL/Zixe8stt1QtRVFvtUkqp0lbvIO9BjAQL6oQ3sPY+LpR9L2z+y5j4y/TuZi98stf/rJunzjUyOtpS23ZDm9ndw0T7XEJQiWZQSE4hRWCqgjmYGF7cHgW2zTys3t/U8ARA2Z5BL6jW2xIF5Mi4wTZnrqZ46RXL/askkNfc801VbGTmbv8dVAQkgCJwWPcaOgNOGwIFxmB3xETEDsr2WLrJeavOJTI36lNw3dgA6U1iRSULULFejapVkTN1eMjccoBeW7IkCGVOzCK51x6fNgYh4fQXt5WezdLdp3KpO/eziqdAdjm3Bpdf3weji+ziaofAEAiUCbraANb8wgq00lsiEG7JAAiw/JsIki0aTZFiuho8XNoRMc8FtU/Xfj5eSeaGbZ02bIxfR4gCxYsOC9t+AQDgtoPcmAe55DgLG6O7sZmGNm5ehCr3CSu9m6OUsA+cmQbQNkULtoMIzz/P5dketo0trnOG264obZ06dK6twrJraRA19cryHuIc2B3+Hn5/MU8vy3uYWcYkyqW1wIj1ND3eTvNuLf0X05q4Vl9HiAvvfTSoeqicnG5sCnVI0aMqIbYxHY+zdDz/QwPQWMzHsrGbrqd+e2ohxDapqp4zQZKTqzmU7G0JcitYtwa97kOHkeCRNerMwoxnM3KtXDKvYldYsyRa28cXXv7H1u9eh2cNa7f2NZJz6C1JnzfsmXLjmJicZ810uc/8sjUdDhrLbqJdQUmrnEfwzx2IrHna2e9Je2tSMRRNRCwV111VaeJ0yo6f19uk3QVMEy9URWJ32vAVRcsN66JyVFcn2oUr6fZgiChoInsaDyG2BxKDoOA+Zg6mVZ7e9uRk0NPmGoqEgwpQpdGHmurDanuG7hsi49Mfv755084+KCD5vRJCUICWvozWYKU00UDkMMlHUFRHutAmqFiRSNdQvB3dMYOMGimn95gZRy401W36JQwGh4n80apCGFTCUgcQzAZ/+A+v1+mBDioAgQc7oXeJl6LpHS/lELt7WdnpUgeHxkzZswGcS7HKihJDHAy777PSpA1a9bs7sVrlFsYJZfaZ599KqMtcrHYKXxz4xg2feCgMFgZEEPdAxVvnTH2I0E6zFIi6Wo1K+rwEqixBfV69hbpQCzpb/7mb6r9jBI67qN7gURnhvoXvvCFenQ82mgG91hkOOCeRS1CFZZpmHDYWXAIaKUKKhYd+EmWtN5ExqmDhN+RpOFRfdIGWfjkk5M8KAfdRANdsUsNc67Xd9YI7GhZ2873/fSnP63iGDRgttFZZ8HhxNdoRzUDwJ1ZEo1SS3CYfYvqx/QsRj0QY5DQY5xINUtwMPfjtttu26CXlW5XrlPVl8VesWfsHXuoTdOZxnuRmUS7yd/F3BbrgFRhnT0SHCnroaU+BxCioSSfSWCKbwdtcihwPQ43j3fkBTgfdskdCUxhtFpfbceNznBAbQB/k6pVd3ixlIB2FEFaSDi4btlP9pBUdLi83B99PsYWbMHKZz344IPVZFvnpHsufIcuba/TQJ57xh6ylzGBtLOexEb1Okgk7SRVO/6P2dvpdROSlDm1zwFk2bJlR0uEeYKbohZ1gCq26P9uNuHxPRAFCXrRUO9sRmrkgvH/9trptKdi5K2J8tr5RrM5IEznK6ISSuzsJWoVRE5pKz3ClJgawdottmtlX++++25Knev9c3XnAop8oKmEGh0c7CF7uSlxkKgV5K5iwI39ac27A0VjGS+/88UXXzy0TwHkV7/+9UEx8zVyJAmNTTn44IM3cBs2W683PR7DNcZENiVNpbNqWByvEDmnXDzWssggolcq7wrJfcABl6VRgl1fUHkADrbBX/zFX1QeQN5rM+n4u7h+3NM8BzhQkbhPmrvfz2v4zBgYBBx2TYzR+biXGvebu3c0HzeTIno2o/Tiflc2duh2gDz99NMT0uZOVHznYNHopT1MTEOI4rgZyYhsLt8P943GrhWLzTKk8zqM2OVRwzeXQDFSn6fxxwS/V199tV7U5OPc/vqv/7p24IEH1lv2eD3GbZzPASEzkPOBBx6o7wluXgO12ohIEaWHTTNstiCI4142a/+4BoGt6hpjJ21q5aSkZk3oMwBJInG0xOCBuQESEK5GuGDktp0NQG1qgE3vWFThmsUBo0SQiL2eOLAnjw3EaHXMo4qz2WOKvZ0mAcull15aSRYJXFvLLGljGdwHGMQbkAimtjvG2b3m9Y6vY5+QXHrt4p6Zpt4sBsZnIc2gAxMnoyrmNfD7li9f3mXerG538yYus5cHHD0k0Y8O54hcNxJcM9PJ5Yh58mOz0uVzfTyqWI2kgsTF4cdYisCKtd4CHAkBMCDsSy65pPJWSeh6f+JeojJhh/zoRz+qN3eT4+e/Q9tFoxtj/etf/3oluWIAUiCpdjXDkSIYoAXmsstMovqpuzlJvWF9QoIweDNdVP88BTvmX/EchVHRII91H03lDm0eqDh00gDl5q44OTfmMMVOIKoMZimbgh69dhrMEoxSBA5Odqslqn/5l39Z6ey6bO2YruroNfIY45tRrWIEW/dwft/YiioNDgBsF/coBk2jR69ZzAVbVCmoJIwMld+faGp7aKvlJcgLL7wwJl34uKi3xgo8g1u0g5FLRBWkmYVQUXWLNgEH3YwRbI08XPl1yK1VNbU3UFdQL3Td8jweJ4hTYGmD4OnD5qANUozvGEuSwO2CT9xixowZ1f9txFXnylF6bEz6uT9xaGruUGkGM+Nz6VzjINbcWSNzYW7MihUrjh44YMD0lgbIqlWr9lO1sjGySXDRQHbWRz6JNnePbi6HkvgkHl2azVDhYuVjTMSUeLQFzAImY+Coo46qVArS+1UBVZN0pRLxp7M6EX9cvH/yJ39SqVXYIXiYJFi5f0zlQWowR9BqzSgh8sGmUeXK25CaVsPNyLp9zJoFDhfXbg/mmE4TByaxErMY3vISJBnoR0TxGetAJCSGsUTDvaN4QjP0XPXnZo5eixHnWFgVpaItjLAFiPsI/phu7pQsHsN5AXgA0j/90z9V0sP3EHGOVYTxGgHDww8/XEkPXLEYvqRzOMcj96KpesW95rMhUt6LoR6vUzuumZ0rY8Uh1aRIUM9Hmyz2Btb509IASQcyUE4q98y7gHBwfaE9qK1xjARb+MPj2g9f/vKXK3srgoLnbaK2ZMmS6n3o/BAygABspHYACDJzV65ciWSu0nLMa4sOBwiL9BHUKlQ09pfvx/ClxQ/f42BNfp9SPXcg8Dt4L40d+O1dXVoc1dBBgwY1DJxGF3m6zt1bHiCJY+5k2nSMFse/SJC+sLSv5KoQOHECnRAY1dGVTQoIyZKoT88++2z1GMCIA2ywS/hM0kcgfNQlJsuSHoKUoJkCBG7CIERPSS3g4Lt13/J7+CwDe3yPxGf/XT4nTgLm+wCiamh3DjrFDokxkKgmy2RbHiBrEzjS4WwTjUHdrJHroUL0hREFBh/tEgj3hmBRjyhEaquvroABh+fGeAFAY3AOmwPiQKVBYkDkf/u3f1vZHBAor0VtAlikeUC4NFawXc59991XPc934ArWwFZ943VG2mNtvROisryneiyku5bSC5qI7uOYVh/Km9fTXw1FpSXdvKtXrx6eNnts7ESYt6HhMCScvrAkRmsvcMPS4BkpyfXjhfrhD39Y3eDO2gXO7UO1QO+Hw/M/nVZM/+c1AIVcK7ql813YGRjxcHsMcm5p3+vuXjsVWm+uhNBpEjOCVddkVADDjGtblHb1kjbMFsjrcQRQW9nE2K4w1LtNgiQOOswAmB6TOPDGGnR78Lb68rq4HggW4kcFQr3iOSQKs/6WL19eMQUAYjTcVkdKWW6XXXZZJU1iJR7P28yCEQU8B+hQu+666666/WKWtG5dAaCa5H0THj2XSIBy6s4mcjbTDrHDijU30Yvlb+L5dO3kZD3VkhIEHbER+iMYuMjurOfuymXWq1FtxsTB6fX4MEIZG8DcKNQlXocEiY3TAA/2CpIjjgqIwUM8YbQCxeULYDDcY3Z0rLHRPomqVd4hP0+RiTGO7hxCJJPh+/Tm5XGlmOj6ehcEC7sNIOv+0wapAyRv+sxf9du+Mr/DhgNwZVp1KjVRfbA3ovpl0weWRjMMg5R16jliQwWJVBBA8Mcff3zV/QVuSz05BKXb11QSA7HusQFFOXNb0K1hftymlNI2GyBxQlXev8zYDHuRAL9jywKEgZx5maUHrM/bTegLK6aPkBnATaMc7xMLoxsDlMds7wmTIKMWrxfgQDoYh2CP9EQZvVZCMOhGicB3EVk3VmAwL2/45ucYUIyToeJrmp2jtqkAMc0+b80kiAVN+v3btTJAdpQDtLcJsWahL0gPg23UbEuMuF2VFkgI7AVcrvao4n2oVR3Vc8jV4f733ntv7Sc/+Ult1qxZ9f2k2EibQ4BpjLeKjRe1C/PLIt3krVXJ82tlFWuX9sor/RszT1t9ydkFiBJg3rx59cQ/gnRICouM4OSAhpT1juo5WLx/7ty5VcETUufJJ5+sfz/1NLGEOM+YbhVXubTBvsTiskYggsZaFiCgu5EBHtUubZDu1nW7YgEAJAJeKecs4s3CMIezQ9wY5rwOFYvF/5///OfraScd1XMQ+yAIaCUgM8xty2PGre5zWwO10v7G+JgNNnKpEdW/lpYg6eL6GXSKnCCmm2xKZ75W4H4Qst4XDhcXbGzTY9tPCBnmgFqlK9faDdNUTA60swclsqhWgCvOkcdd7PsBZ3St96YBP5tif2iz5nZQ7oFL9/u1LEDyi28k6vPa61ZeZgejQgkY1CCkhxVycH2uGRCZsh69TBur57DBAlLHXCrUEL7DPeS1Mb8rElMrqKiNVCqZTaSjkLf1QcsCJE6DaiRG1bFb5QA7s4xc24w5ltKi8kDMJCB+7nOfq9Sq2FXFuIXvMyUfewO1ys/QxtAgR5rkXWDiHreKkR5pQA9be787xNXWtzJAPmjUDTxuQh4b6QtuXlQoiZt0df63bQ7eKsBBdF1Xa2wS3aieA09VzIeKLl8jyu4jKprPGfTriXjGh2Wo0c7IJ1nF+yFe07oASRxuXaMZfnEgjoZoKxxgPrgzcmY5GkRNVNs0GgChOxe16qKLLqqNGjVqg3HMZuPmTRkwyImfGH239U30ULGXSCSllIM445yQVpPOSlP7IDcamKpnLzGeNS0LkMTZ1giASEhRDdAAbYVD1JMUy3ZjCkic5IThzMIeIVERCQI46D7C6wGAUW32QI+No7ABx8yZM6vAIp/hiGRAphsYIJDcaLInuV7W3Zhikuvsvd1It4FFtMEEeayClKHChFsWILvsssvKRpIhGo4x3aK3LzNfYzZs3oUEqQHB09yN1wAE3Ltf+cpXqtwslsa1y6FB1sc/8sgjlbcKkFl+GonCabAQC6n0OjqoKRFsElycfNVKK6bYNBoaFJwSr7UsQBK3WxVTBaIXS1GJft4qKlZsHJDnKyk5bCJNcJADpmUOblykiJWGsY9t7CTCfTxV9K2iHsQgqsYqQEJKAA4rBWn47G+y33BsqK0t0krLPdWeik3yYssm/k/StXUBknTrt2Lxf26QOT+vu+acN8OIjA2sY78uRybzHIRNnhTlrRzswoULK6kgZ7eFj7XdDhECHKhWgMO+V7ETTPR08V3MGkfFYpG+QjJkbA6upGsVBhTjIJE2dGBE2yvQ2NstC5B0iL+NF57XFGt0Okqgty/1e1UAXbISojev5+STT67uAxiMbbqSRFewnB775Pbbb69Nnz692g/752qQq9rxfdgb/I9hTgM4OSmeLoBmbYdE1J21HM0CCNfDtZtxHGkj9lFum124qmUBsttuuy1PFzgjr0NXJdFTETtm9HYJYgKdXD0f8NJme1XDa5j1d9ZZZ1WEDYenHBbJEjNseR/ETazDOvQ4USqOLABoVAuSuUvulsmMjCCgeCq28In73So2SGSe0ATMhWuMDfns+9X2ullJgi5vXSN9551XNfJSxKbRXDypE62gAsT5HKg45j3Zuh+7gODfn/3Zn1V/IdhTTjmlKrnlWulYQkScenIJFmP8+9//fvV+HkMKcBOE2mpwVPaJclvAZ0SeGvYbb7yxvn+xVWm09Vplf1Vhred32FJ07QbV872dk53bdG9ld150usC1pj3kbjw7AkI4pGo3AlNXuRKjmqfYjvUWGoPaGYp6iBe9H05uFxBzrqjzmDx5ctU6U8OS1yBJAABSglHMBhLxdGF3GB2PLUHdHxMVUcOQRgCO72bhAQRcfLc1I3k0OnLnZnmXdHfnmkEzlr2bsadgQtppfh/fzRm01Yqs7RJ3fncChFiIB6qxpUdIjwuBtTwHZ2PDZ7pCtMdBmI3iHMYW0P0dQaCnBWLfY489qjJZ4hyOLTYrF5BQ+cehPv7445VXi3l8eLaQSE8//TTjsTfoMG82K00fSJ2HgaC6tamuFQEhjfjrnPO+ko3AvlK37wAda/T1zJmkme6va3mADB48+HmnIckV42w//pqN2shgaw8wzdR3o2tRLiXBxaE23If7kyxolxDrOWwkLcdXEvk9/H/00UdvMOKaz0Hi0LYHaQDw9NzYNI7PNpZhvQn2BrlZ7JuN6ZrZAb+jfesqxhVbs8JUYxay16+U5fG0Py+1PED23XffBTZFi+kC+vZ5HADZQTxP3Wg2ODZ2wKpVeVpDnlLiEE/iEnB5s3KVGkgVy2mRCnHcAynrSEw8XKhizn/nfUifHLzx9/I+RhjQXRFAqZvHabDdDZCmEmabBCehE3srtqeNsyBlYCNHjnyo5QEyfPjwheliZqaLm6gaoxvP4Z0sDp2ocJbK3NRUidz+6CjOEZskRPXQ/Cl+v6OWY9dBK+FYppCwSB0BIKhaqEb0n0V9onuJzauVEtppMI8nnniiUsNgNHy3/Xv5DUiRZjXf7qwbtqtAI1Oi1Wl7ozDcm7QHsxJA5rY8QHbaccfXNHDzITLql/zFeAUgUXLkBftdwb3y7FGJLSdUgAxhovYg/rE5kBzYE3FeucscK7NwiXGgFnn9SEwkDW1HNcL5bJu3ocrBRZEwEqYToeyCaFAytuzpCRWrWaqWNgdVkvH8PQdd3m1SZf0OXZCo2O0AYe2+++5LE1FNdBMVl0Z8+fvcc8/VdVCDQHlXvWaCIf9MHzNN3RiNuj2/DWLHg4KR/NnPfrY+00RuF2cums3LZ82ZM6fe1M28KysGrTkHLFYT5h0oXWbpxvSL7u5b1ZUqlga4OWWqqUr1KMETg1raZe7m7gbI0KFDn4kp71F6KCFQFWLuTd6/t5kqRKO0l87EOTSeL7zwwqpvlYen98kDjDPFCQIS63COh2klAst9EDBKrkaAbvT7eyKlvSvVOSSnJckxgzd6GvmbmNNTfQYgiZjmoIJL6OYVReMVKUIqRqOS3Dz/ZnN8+NG2Ma9JFYnNx/ilyAk1SpHP78TDRJrHBRdcULlozadSUqgnS+x4o5AcFDzZUT1GgfNWmo3S5vMZHrlXx2uSkLpLekT7IHr5NgVcMZMgtqMlb83me3kTO5lmen7W4YcfPqPPAGT43nsvJB4iAdgQWTcpBMiNbFRVm0bcY7MvPLODTDGXGK0AhKAjx+d1PI5aZVM34xtxGpPgAGSAwwYLuHP7QteWfK6kDoPOzpnPU410fsQzoBE3zCXuqW5x3wct7ZHU9j4DEFbS21fY0sbZfG6uSX5E1DFeY/FQe2PZNscQjFwLVSoO+EG8Y/i2tbWsgGuxE2qVpbCqNnqvJBLAtGDBgspjhdpoHKMvAERilcFFVbAzGdlRgitt42fAWPBg5SPhIqB4fZLkK7vyOnsEIAceeOBcubR9emNzA9ObcffGlI9cpDeDC5qWDhABRN6sGSI3oIn65Bzy2Bc3GseCA0DhqcKViz2FK1bvWF9o0C0DUE3kur3GzlxfdHgohWIqD65su9zHhFZjZpYRH3zwwbP6HECOOOKI6WlDZqjaGBGNEoWLp24iT9FullEYbQpBqR0UORm/AxABBMBBENC8LLJM866FloYiNR544IG65BA8/s29cq12U4I4A4X9yKsdOxvryDvbcPPsYx8xAWQQN33vnUcdddSdfQ4g22y99fohQ4YsbiReY8QULgIRxnZBzXItmk9FxD4G8My1snYD7s//X/rSl6ogoOCwe2H83U7pZSAOksOaDafdOnagL9z0IClhYS4kbnZ2NFssWY6A4XM5c/LRPI+Q0r6Bk4Yy7m26oNVPjwOElQzcu+3jhL7JXzc6enHoPRvjC7FEdXPdk3zWOeecUw+2OXjT9jkY1ZSy0mWdIGDsDhKlhiDiM8jSxVsVA1kShMNr+oKKpWQ3tR+XNwOCIjF3pGLFgF+UTEzKUhWNGRdxoA/MZvTo0TO6+jp7DCDojgkMM1FJDJjxV6PXDUGK4D2K3o1m2R8cAk2iKVeF0/P9uHQ1pAEOahV1FzFBMHI9XivAKIKiWtAhNfG7tFFUE2IxVCve7KSC3UZiJlN2UT831c0eDXCZCOk08ZxjTpygSY9NP+SQQ+7tajrt11MA+Ui/fu8lleWxJUuWTIyt/eOQeow0xhXTtZwBMRqF2g+d8bG3lw4R71NXwbw/3LFU+8ERAQwTm8iRksspQfxMfp+N2pAaRMhRzQYPHlxJlY39plbvP8xZkGKDw4LMZOJB2mCROXSWWUn8jIeg8CtOt4qDgHSYDBs27NmPbrfduq6+zq2666BeasupievFl1469IYbbrgqiedxqh/WdNtOEy4F8X71q19tt7fshx3w4uy+KB24XXXVVVWKA2qDnB/C53viOGc8b2effXY1PSp+PwBD9ejLyz1TPYrqUme7p0Qpolr9rW99q3Lxm2qCVHf/Qw+AmRdccME/7rfvvo/nn7lXYmh9QsVi7b3XXk+RR4Ouz8UrIWKLUv6ndptEPlWTRs0H2gNHbJSdMwMAmHf9SICtsmuddsVvs10oBw84+E0A65Of/GSVqh71Zw3zVlehOrrp4bOdkO7ZztogdQIMtgXqNMFB9970HcChxgBTGzhw4MpG4OhTNkgw1jG05sIt8AqZ9eq4YdPJcZtqrMtJOgJHR14UGwFg4wAOJAdOAb7PwB+HZYzGVBIOE3Cg9vn+3P+fA7Ov3QzqxuuNFaKdMfLjvBI+j1y1+N4Y97AYDOZzwAEHzO0u+uxxgBw3ZsytREPj9FZde0bXuY/Yxbvhpm2KKtAoRcX4htm0V199dWV/oBoBHH+DvXRjfcinPvWpym5R1wZE/v7Ycb2v36LrPW8K2Bkvojf2jOYVSA+zpAWRXk2/M53ZdWPHjv2/WwxAWFQaIhWoHoPYjBvIsXX54SFSDevM5ndkwJsw+N3vfrdKjszTJfhOjG28VAY0zzvvvGqKbD7hSE7Y12YtbozxxC4r0TPXXuZ1o26aSnM8gDEQqLdQEMoUk0q+eNuPfOS9LQogH//4x29Ixu9NEr5SwoIh7rNh6P8Mq2yvAVqsJY/SKL9F7nX55ZdXWaN2AlGn5i+cTJcvQD3jjDNq48ePr0d7IzFED1dfGWPdWS9h3vO3M+lAvh5woRnQmMGZig4RMhNaBpWY551p/7/bndfZKwBCP6PBgwcv1rcei2EgUoNKcHM4/YuZRyw3wjuqaNO+ue666yqxTtETIOS7BZ+qncVc9LMiEKbBmLe7ib+jL3QU6axxHb2K7n/MZetIgqC+knWgW5/91+4IJbXVew488MA5O+6ww5otDiCsyZMn/++0MbNQseT+sczSCDZxkdmzZ9fHGzcCRLRTGh0kQPv3f//3KiAlF+NmwzaTJj2o888/v/aJT3yieq+FU5EL5lxxS1kbmxbm83kHdl+jBL7zzjurnmCqbOyvTb+Ne7Tles1MEvzKbr/G3rLZBA6PPPLI6UlizIqqiiqO9dc8jhShLNds0LymIxp3TmyyQpD3IzlwGztsBqkAMB1PoLrFa2nFQ5zDkcxbEgA2Z7FfsU1o3mya+wSAMc7xXhJfyrMUlOLpXOaQlNjVeVe9GiCsMydNupwu8DGjVpsgGm3EJWh8gE2iCNZ+gMhj0Ep91iE13/zmN6u4CtKCx1jYF4KH11sABThQrfw9xk0KSDrvPYyZvdF2hHEx2kH3rcyHM4FZsdeeJTRx+sSJV/eIlOxtG5u49bVpI2cpnq3xVke13T8uWVp1CiLVMIjdQzHoqOF3xRVXVPYL960OjLXhTozlPdgbNHGL1Y5Zs+SyOjDijajHdknuHXYHBVFmQBOQ9eyMi7TNQHk8ncPlPaZG9raNHX344TPoceTmyrFjF3Q3nK6CeECULHKh6B5UTcNbRYTczefzjFl4iOjCqFf0vT399NPrxTyCgt8UW++U1fGyPECbkbOgypLcNQqsYE52SYzTej23Qw45ZNYhXVwU1VIAYY0dO/aGtFnTTX83lZyNVgVyth+cCJVJMAkgxTkH8O1vf7s+jyPGWVS94FQGDmkujeSIhTnRAN3URLwtdekciW2Q2FMkPx0hDQQDkjgJOOZlpf9nnXPOOd/o0evojZs7eI89lh522GEz02bN9LFoIPsXgqZi77bbbqvchXEeHwcAqKZNm1ZJGgxy/rcJhMmRptgDRBIPAUccOWzNdeyW3lfmuHf1smO/jhIKoTgrkjnNvXMGvEwvDOScfuyxx97R3W7dlgAIa9IZZ1yZbIKXVLFs76lBbgoIuTn0qSXVPHZfhxt95zvfqaQLtkWsdzcgqYeMxzDGufH5giJ6ZKJuXVbnPVlKXfYfdZiO9jbR869BVvedv0nVfWPiaadd3dPX0KtZ4UknnXRT2tzp1n8Qv2BTzZoFJGwwnAgpgW7LwuC79tpra4sWLaqrW7wGVyIg0TtiCsunP/3pKkrexrn+qJgnRsy3NOnRKG0nJibG3KsY4NU7qKuXJFDUYUuQVbGUHkqZNrtlZmJWV/aG6+/Xmw8H4ywZziPnzZu3U9rkcdoXsYO5cRBsjf/4j/+oDoMxZKROEyEHVLwG4xuJ49w/gMWynsOOIxEgZTXOlI4u3DxuYewijo8gsEspclR/dfXqndSbmP7OIOYxYv/9F/QKW6q3H9CpEyZce8ABB8yDoG35KSfnMaSCKfF0POQgkCTGOczINUPUDF7jHIBDL5Yz8PpCzXhXS5LYMC6Or84zC2gACEC0Edl7JEe0T+xkw+tp5nHaqade22ucDa1wOCeffPL1Q4cOnWZtOptsLy023pp2Kg+xRwAHG++EWVUqPCZ6SjDGSR8xwq7K1V3jA1pRkuTEHzucxO6IShb6mjEzkfQgVCtUXx0pOkZCtBxmd8ekSZP+rVd541rhcIYMHrwY128i4Dk2DNBl63hgAGO6vKIbAOl/h/h5HpAQBMSdK+czPd2Gb2XVNuqUsC4md+X6WvYc5wgqLwwMqQ1zs28xfy2n5rzaMrbnnX766VcO2m23FQUgH2IdfNBBc4iyJ04zVy+WI9DYaNuGxpFnSg9AYVd2gIHk8IBjvpBqQjO7N/ZVkLhMBYp2CGC45ZZbqjkv9lrWVnR0nc4WGBIDcNASDho1ak5vu/Z+rXRQJxx//M3J6N71wQcfHIvItkMhm8+h2FABIDjkJh4e0XEAEpPiYtp6bB1aQNE4TT1WE8Y+VXr6cOPeeuutVcxDiWHfMGegGC1vU2tnjRo1au6EU065rjfuQ8v5LMePH3/doYce+g0lg02l7WmF5wqxzuMARgOd1jS4cvOu7rGhW+7CLADZUKWymzsr7qGgoV0o4DAj2tHVSHckDfZfbBbOX4zyT5977n/vrfuwzde+9rVu+aI3k4HWlB+89dbr99l338eXLFkyNB3EaFvDsPEmvaF22SFcCYGHi+eZ/2emaOzLmw/r2ZyM3d5QNNXeoJ3O/q7Y7TD2qJKpGIzVc0VTDbJz2fP4XdbmKM05A7viJ2Z2w8UXX/z5rbfaqmlekWa3W+rRvlibs959773+11xzzY3pQM7NU+LN0vWQAQIiH65GB8ApU6bUbY1YSx25Zd45pS9LikagiVWasfeV4NF7hbS4/fbbaw899FC9tCC+J/Za1lPI+SQmdtNFF130hf4f/ehbzbyeZvfFalmAsNauW7fT9ddf/53EnabGLofRIIy9tnTj0meXKkGaUevmlRN2pmtjb5ESzVKjNnYdsRrTRtXsMwv37c0331wZ4zAkbI24j6i4doiBOVliMGjQoJumTp36DwO7YLZHAUi2Vr/22rCbbrrpikTk5xoA1GB0OpHGIQfGAaMG0IkcSYJtEtuJRtWirwNkY2qV0jVKDaUs6hHVgKhUuM5lKLwPENgGyfcgwQEP53HIIYdcPnHixKu7aipUAUg76ta0adOuS4S/azqMSahTHIpjkZ2SCoDIJMUOwVZR5Ro3blyVftJoRPWWZpjnSZoGBN0b0tWp5aeWHE+ijRYEkyk90V1uLGrUqFHfOPXUU68e2IVToQpANrL+3403XvHSSy8dmsAwQWDEQitAggSJnhgOke7kuIAPPvjgpo1X6M02Rt6JJVezotNCG43/qeOn+yFJoLFMIILIVB1HZbd5CWeNGDFiwZlnnvl/PrbTTq915fUWgHSwbrv99q+nA5yQONlYVaw4ZtpouQNtbHyGy/jQQw+tnXjiibS2rB94Ix19Y6OY/b83SKD4u3JANAJJ3r7H5ymNpWkfDRaMflug5ntM19FDyN5yP0nquYzcu+D88y/rjmsuAOnE+undd//do48+eu7AgQPHIu5ZiH6bNOhuJKIrUCySwoAHIKTAtzdVtxFx5d6fng42NjrX2NRO54XSQYYQfzf2BeoUo+So5UcNheh5PLbnsU+YlZoY8W0R8rljxoy5g2Yc3XXdBSCdXA89/PBnZs+efUk6vHEAAKDYlDp6ZWwaoPvRsl5mX2CbYMTHJsv5LPC81Waj+83wJrUnEdp7XR75btSbqr3P43FmpdBxklJlhxtF+8xArKXP7qPZumnf6WN19VFHHnlnd557AcgmrBeWLz/qrrvu+ocEjqn8D8dDlcKI50BjPpBSJXZBwYZhQAyNqo844ogNBlRG0DQiTr0/jQizq2yL3CPVCHj+bq7NpE9jGqhPlAogMUjZsWs9+2SBUxymGd3pcepv+qxbp0yZ8j8Yb9HdZ14Asonrd+++2//222//xssvv3xQ0p0nmR4vMCSa2JpGFcTewBDTsGHDKolyzDHH1Oz+mE9o7YiL94Sa1RlJAsNAlZo/f37lpVK6KjUAjsHT2CsZlcvn2lLW5yb1dP655577z9ttu+26njjvApDNULkSZ/xcIvqJ1kHrcVGftgWQKSim0tsAgtcwkg1vF/XrZqrG+YntgaG959uzZzY2Om5jz/u4RnMjldBFwwsKmjC+CfrFkWfsCbEL3ufwIPuHmWfF/86ZT3s3Z/z48dM+PnbsDT15zgUgm7GWr1gxesaMGX+f1IdhiRgmxA6M5mypNuT5RJHInJM4atSo2rHHHlsbOXJkxU0jEPKho/m44w9jq2zq8tp0XfObSejEyCZ3CoAQF1JyxuCg5ccsvVVRteJzyXlLnzc3qa2rzj///MuGDhmyuKfPuACkCWvGPfd86Ze//OXERBCT4/wJCEldO2/SoEGvimEvX1UNJrziJgY0ROkbuYI76/7dVAM/f63xHYEBKDC2qdXHZUuQNAbyYhf7vL1R7qlSvUL9ShJmzgknnHBzbyqRLQBp0notSZFZs2ZdumjRonHp8MfqpoxFV9ooznAPPZvqxBQbnTmJFfWE0dHDhw+vxkzDaeXgcmvux4TIGHfZ2Cz1KNk0xGMGgLlodHkBDEzmAiB5nYufY2M+1E5r+G0kHYdyVvZcm8qZVKw7EhNYdsYZZ1yx68CBL/emcy0AafJ6etGiCffff/8lb7755q6JUCaqkhgljoNy7HwCYAw2mi2cAyC6kOG2pGXsueeeVZyFmhVGRUuc+VyNPNWlvfkn2AioS6+88kp1Y3wy7VMxuvXCRU9TtIMEqIVl/E5SxZ3ZwfVja/A4rzHoOmzYsCuJip94wgk39cbzLADpokVw8YknnkDlWp8IeiIGaFRDNOTtzBiNbe9r4MbB9wYNYy2Fuj6cGrczn23RF49Z36K+bz0FRKuKg1EdJ2blQ3wkelPQY4qNYLQvmF69N9pqdvhN9iHzMxOYZjCeYsKECdf2xBiCApBesu6fM+fiOXPmXLTDDjusScQ32a7udgJs0703yHI1jUVp4PAXn88j1Y4Wc25JHB0n2DSM80Bk9GLl/8ebqf55V0iliRnMprBH750SI0nKGem2hmbip5xyynXMcOnt51cA0k1r5n33ffHpp5+esGrVqn2S6nGUwIjenej5siGatoFxA9vgKDkiAccOjtH+iGpU9KjF17ZXM+5rzArwtX6nYFR66Jjwsbbvn5kAvvboo4/+8biTT57WSudWANLN6xdJ7XrggQcuSnr97gkkY+NkV4BiFDnvYh5rKxoF7LQDNIKjjdDILRzjGDoQ4ijmRhImNmTTflKK6K3zM9v6hc1NNsZT++yzz+O9tYlCAUgvXb/69a8Pevjhhz+zfPny0QkM2yWimph3+IjdyZUQOdFHg9/n87QVI/vt1ZTHuYv5zHJfi72i/WE9RiwMsygqfc4s1Mn99tvv0SOOOGJ6T6SHFID0AYDE9dzixWNJhEx6+s6J807REM8JOhrzuSdKSROfjyn5+ZzwWB8e399eSrvSQ6NeKdUG4pm8Zq8EBgzvnhxQUwDSBwHiev+DD7ZduHDh5Oeee27sq6++Ojxx7Z3SwxMjN89VLB9rZH9Eu0NvWe4xazR6+o8ONfv8ttyqCgTDhw9fePDBB8/p7izbApAtECCN1DAM+xdffHH06tWr92l7eGLO3U3naG/OuupQjHs0MsajhInqXZt9MwfVaeedd1659957L2QgUVfVgReAFIB8qPX2O+/ssnTp0uOXLVs2ZtWqVfujkiV1Z5u055N5PgYW88m+LCPZuQ1jvKXNgzaLz9x2223XDRo0aDlg2D0BYcSIEfO379//rS1tzwtAWnyt//3vt6F96sqVK0cmNWrHpPpsn279E3h24fH0WP90Jv14jKBlAsN7CTDvbrfddm/jegUICVDv8nfAgAEv77nnns/ssP32a8rOtjhAyiqrFVcBSFllFYCUVVYBSFllFYCUVVYBSFllFYCUVVYBSFllFYCUVVYBSFllFYCUVVZZBSBllVUAUlZZBSBllVUAUlZZBSBllVUAUlZZBSBllVUAUlZZBSBllVUAUgBSVlkFIGWVVQBSVlkFIGWV1W3r/wswAJtLHZAsSMr+AAAAAElFTkSuQmCC") + '</left>');
                }
                console.log("Final obteniendo imagen del artículo" + hora());
            } catch (err) {
                //alert("Error al obtener la imagen del artículo: " + imagenArticuloArray[0].IDARTICULO + " borramos el localstorage");
                //localStorage.removeItem(imagenArticuloArray[0].IDARTICULO);
                console.error("printObtenerImagen: idArticulo " + imagenArticuloArray[0].IDARTICULO + " " + err);
                hideTab("alert");
            }
            console.log("Final obteniendo imagen del artículo grande" + hora());
            hideTab("alert");
        }

        function enter(e) {
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla == 13)
                loadBuscarArticulos(0, txtDescripcionEan.value, idTienda);
        } 

    

                            if (idioma == "ca") {
                                document.write('<input type="text" data-theme="b" data-inline="true" id="txtDescripcionEan" onkeypress="enter(event)" placeholder="Article/Codi Barres" value="" />');
                            } else {
                                document.write('<input type="text" data-theme="b" data-inline="true" id="txtDescripcionEan" onkeypress="enter(event)" placeholder="Artículo/Codigo Barras" value="" />');
                            }
                        

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    

                            var cantidad = document.getElementById("txtCantidad").innerHTML;
                            var articulo = document.getElementById("lblArticulo").innerHTML;
                            $("#btnMenos").html('<a href="#" data-role="button" data-inline="true" data-icon="minus" data-iconpos="notext" data-mini="false" onclick="cambiarCantidadSinId(redondear(cantidad),0,unidadventa,idArticulo);"></a>')
                            $("#btnMas").html('<a href="#" data-role="button" data-inline="true" data-icon="plus" data-iconpos="notext" data-mini="false" onclick="cambiarCantidadSinId(redondear(cantidad),1,unidadventa,idArticulo);"></a>')
                        
                    traducciones.clientes.btnComprar
                    traducciones.clientes.btnAnyadirArticulosComprados
                    traducciones.clientes.btnAnyadirCompraAutomatica
                    traducciones.clientes.btnBorrar
                    traducciones.clientes.btnFinalizarCompra

                idTienda = obtenerVariable("idTienda");
                if (idTienda == 222 || idTienda == 160) {
                    document.write('<a href="#" data-rel="close" data-role="button" onclick="loadEnviarListaCompra()" data-icon="email" data-mini="true" id="btnEnviarCompra" data-theme="a">' + traducciones.clientes.btnEnviarCompra + '</a>');
                }
            











        var registroApp;
        var esNativa = new Boolean();
        var tieneAPP = new Boolean();
        idioma = getIdioma();
        var traducciones = getTraducciones()
        var urlDestino;



        function init() {
            esNativa = (document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1);
            console.log("esNativa: " + esNativa);

            if (esNativa == false) {
                console.log("esNativa: " + esNativa);

                $("#texto").show();

                tieneAPP = obtenerVariable("tieneAPP");

                var sistema = navigator.userAgent.toLowerCase();
                var esAndroid = sistema.indexOf("android") > -1;
                var esIphone = sistema.indexOf("iphone") > -1;
                var esIpad = sistema.indexOf("ipad") > -1;
                if (esAndroid) {
                    urlDestino = "https://play.google.com/store/apps/details?id=es.sorlidiscau.app&feature=search_result#?t=W251bGwsMSwyLDEsImVzLnNvcmxpZGlzY2F1LmFwcCJd";
                } else if (esIphone) {
                    urlDestino = "https://itunes.apple.com/app/sorli-discau/id583008097?mt=8";
                } else if (esIpad) {
                    urlDestino = "https://itunes.apple.com/app/sorli-discau/id583008097?mt=8";
                } else {
                    //Por si queremos mostrar algo cuando es Windows.
                    urlDestino = "";
                    //textoDescarga = traducciones.inicio.textoHomeiPhone
                }
                console.log("urlDestino: " + urlDestino);
                console.log("textoDescarga: " + textoDescarga);
                //Si la variable es nula o 0, mostramos el Div con los dos botones.

                if (tieneAPP == null || tieneAPP == false || tieneAPP == "undefined") {
                    //Si es en castellano 'es'
                    $("#dialog-confirm").parent().children().children('.ui-dialog-titlebar-close').hide();
                    $("#dialog-confirm").dialog({
                        resizable: false,
                        closeOnEscape: false,
                        height: 130,
                        width: (screen.width - 50),
                        autoOpen: true,
                        modal: true,
                        show: 'size',
                        hide: 'blind',
                        //dialogClass: 'ui-dialog-class',
                        bgiframe: true,
                        title: "Sorli Discau",
                        modal: true,
                        position: 'center',
                        buttons: { "Descargatela": { text: traducciones.inicio.descargaAplicacion,
                            click: function () {
                                document.location.href = urlDestino;
                            }
                        },
                            "YaLaTengo": { text: traducciones.inicio.yalatengo,
                                click: function () {
                                    document.location.href = "home.html";
                                    //                                    localStorage.setItem("tieneAPP", 1);
                                    //                                    setCookie("tieneAPP", 1, 365);
                                    grabarVariable("tieneAPP", true);
                                }
                            }
                        }
                    });
                } else {
                    //Si la variable es 1 es que ha indicado anteriormente que la aplicación la tiene, con lo que redirigimos a la home.
                    $("#texto").hide();
                    console.log("EsWebAPP o ya la ha descargado");
                    document.location.href = "home.html";
                }
            } else {
                document.addEventListener("deviceready", registro, false);
                document.write("<br>");
                document.write("<br>");
                document.write("<br>");
                document.write("<br>");
                document.write("<br>");
                document.write("<br>");
                document.write("<div>");
                document.write("<img alt='Logo Sorli' id='imgFondo' src='img/Logo.png' style='width: 100%; text-align: center;' />")
                document.write("<div id='divTextoCargando' style='text-align: center; font-size: large; font-weight: bold;'>");
                document.write("<br/>");
                document.write(traducciones.menu.cargando);
                document.write("</div>");
            }
        }

        function registro() {
            try {
                pushNotification = window.plugins.pushNotification;
            } catch (e) {
                console.log("pushNotification: " + e);
            }
            try {
                if (device.platform == 'android' || device.platform == 'Android') {
                    grabarVariable("sistemaOperativo", "android");
                    pushNotification.register(successHandler, errorHandler, { "senderID": "160232282146", "ecb": "onNotificationGCM" });
                } else {
                    grabarVariable("sistemaOperativo", "iphone");
                    pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
                }
            } catch (e) {
                console.log("device.platform: " + e);
            }
        }

        function successHandler(result) {
            console.log("successHandler Index: " + result);
        }

        function errorHandler(error) {
            console.log("errorHandler: " + error);
        }

        function tokenHandler(result) {
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            console.log("tokenHandler: " + result);
            idCliente = obtenerVariable("idCliente");
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                idCliente = 0;
            }
            estaRegistrada = obtenerVariable("estaRegistrada");
            if (estaRegistrada == false || estaRegistrada == null || estaRegistrada == "undefined") {
                console.log("No est· registrada la aplicaciÛn, la grabamos en nuestra bbdd");
                loadRegistroMovilApple(1, result, idCliente);
            } else {
                console.log("Esta ya registrada, no grabamos nada en nuestra bbdd");
                document.location.href = "home.html";
            }
        }

        //Para grabar la parte de iOS, la parte de Android lo hace el escript que esta en PushNotification.js
        function loadRegistroMovilApple(sistemaOperativo, idDispositivoMovil, idCliente) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    registroApp = callWSRegistroMovilApple("http://bismanwsdes.sorlidiscau.es/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                } else {
                    registroApp = callWSRegistroMovilApple("http://www.sorlidiscau.mobi/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                }
            } catch (err) {
                console.log("loadRegistroMovil: " + err);
            }
        }

        function callWSRegistroMovilApple(url, sistemaOperativo, idDispositivoMovil, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{sistemaOperativo: '" + sistemaOperativo + "'," + "idDispositivoMovil: '" + idDispositivoMovil + "'," + "idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("callWSRegistroMovil ERROR: " + msg.responseText);
                    console.log("callWSRegistroMovil textStatus: " + textStatus);
                    console.log("callWSRegistroMovil errorThrown: " + errorThrown);
                }
            });
        }

        function showRegistroMovilApple(json) {
            registroApp = json;
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            if (registroApp == "1") {
                estaRegistrada = true;
                grabarVariable("estaRegistrada", true);
                console.log("showRegistroMovil OK");
            } else {
                estaRegistrada = false;
                grabarVariable("estaRegistrada", false);
                console.log("showRegistroMovil FALLO");
            }
            document.location.href = "home.html";
        }

    

                esNativa = (document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1);
                if (esNativa == false) {
                    var textoDescarga;
                    var sistema = navigator.userAgent.toLowerCase();
                    var esAndroid = sistema.indexOf("android") > -1;
                    var esIphone = sistema.indexOf("iphone") > -1;
                    var esIpad = sistema.indexOf("ipad") > -1;
                    if (esAndroid) {
                        textoDescarga = traducciones.inicio.textoHomeAndroid;
                    } else if (esIphone) {
                        textoDescarga = traducciones.inicio.textoHomeiPhone;
                    } else {
                        document.location.href = "home.html";
                    }
                    $("#texto").html(textoDescarga);
                }
            











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var NuevaListaCompra;
        var ObtenerListasCompraArray = new Array;

        var traducciones = getTraducciones();

        function init() {
            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = obtenerVariable("aliasCliente");
            idCliente = obtenerVariable("idCliente");

            $('#btnGrabar > span > span').filter(":first").html(traducciones.clientes.btnGrabar);
            $('#lblDescripcionListaCompra').html(traducciones.clientes.lblDescripcionListaCompra);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
            $("#back-btn").show();
            $('#txtDescripcionListaCompra').focus();

            loadObtenerListasCompra();
        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'espai_client.html';
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.log('mostrarTab ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id);
            $('#tab-' + id).hide();
        }

        function loadObtenerListasCompra() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerListasCompraArray = callObtenerListasCompraWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerListasCompra_APP", idCliente, printObtenerListasCompra);
                } else {
                    ObtenerListasCompraArray = callObtenerListasCompraWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerListasCompra_APP", idCliente, printObtenerListasCompra);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadObtenerListasCompra: " + err);
            }
        }

        function callObtenerListasCompraWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //                    var json = result.d;
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printObtenerListasCompra(json) {
            //Se cambia, ya que solo trabajaremos con una lista, cuando el cliente no tiene lista, crearemos una automaticamente con el nombre de Lista + el idCliente.
            console.log("printObtenerListasCompra");
            ObtenerListasCompraArray = json;

            try {
                if (ObtenerListasCompraArray.length > 0) {
                    grabarVariable("idListaCompra", ObtenerListasCompraArray[0].IDLISTACOMPRA);
                    //document.location.href = "listacompradetalle.html?idListaCompra=" + ObtenerListasCompraArray[0].IDLISTACOMPRA;
                    //Se quita lo de pasar variable y se hace con localStorage ya que hay una versión de Android que no funciona con variables.
                    document.location.href = "listacompradetalle.html";
                } else {
                    loadNuevaListaCompra(idCliente, "Lista " + idCliente);
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

        function loadNuevaListaCompra(idCliente, descripcion) {
            try {
                if (descripcion != "") {
                    if (descripcion.length < 33) {
                        console.log("txtDescripcionListaCompra: " + txtDescripcionListaCompra.value + " nº caracteres: " + txtDescripcionListaCompra.value.length);
                        loadTab("alert");
                        if (document.domain == "bismanwsdes.sorlidiscau.es") {
                            NuevaListaCompra = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/NuevaListaCompra_APP", idCliente, descripcion, printloadNuevaListaCompra);
                        } else {
                            NuevaListaCompra = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/NuevaListaCompra_APP", idCliente, descripcion, printloadNuevaListaCompra);
                        }
                    } else {
                        alerta("Descripción demasiado larga");
                    }
                } else {
                    alerta("Debes escribir un nombre para la lista de la compra");
                }

            } catch (err) {
                hideTab("alert");
            }
        }

        function callWS(url, idCliente, descripcion, callback) {
            console.log("idCliente: " + idCliente + " descripcion: " + descripcion);
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idCliente: '" + idCliente + "'," + "descripcion: '" + descripcion + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printloadNuevaListaCompra(json) {
            console.log("printloadNuevaListaCompra");
            NuevaListaCompra = json;

            try {
                if (NuevaListaCompra > 0) {
                    grabarVariable("idListaCompra", NuevaListaCompra);
                    //                    alert("Lista Grabada correctamente");
                    $("#txtDescripcionListaCompra").html("");
                    //                    document.location.href = "listacompradetalle.html?idListaCompra=" + NuevaListaCompra;
                    document.location.href = "listacompradetalle.html";
                } else {
                    alert("Error al grabar la lista de la compra");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

            currentSection = 2;
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var idTienda = 0;
        var idListaCompra;
        var numeroSuperMaduixa;
        var imagenArticuloArray = new Array();

        var traducciones = getTraducciones();
        function init() {
            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = obtenerVariable("aliasCliente");
            idCliente = obtenerVariable("idCliente");
            idTienda = obtenerVariable("idTienda");
            //            idListaCompra = getQuerystring("idListaCompra");
            idListaCompra = obtenerVariable("idListaCompra");

            console.log("Tienda de compra: " + idTienda);
            console.log("Lista de la Compra: " + idListaCompra);

            $('#btnAnyadirArticulosComprados > span > span').filter(":first").html(traducciones.clientes.anyadirArticulosComprados);
            $('#btnAnyadirCompraAutomatica > span > span').filter(":first").html(traducciones.clientes.anyadirCompraAutomatica);
            $('#btnActualizarCantidad > span > span').filter(":first").html(traducciones.clientes.btnGrabar);
            $('#btnBuscarArticulo > span > span').filter(":first").html(traducciones.supermercados.buscar);
            $('#btnAnyadirArticulo > span > span').filter(":first").html(traducciones.clientes.anyadir);
            $('#btnModoCompra > span > span').filter(":first").html(traducciones.clientes.btnComprar);
            $('#btnBorrar > span > span').filter(":first").html(traducciones.clientes.btnBorrar);
            $('#btnAnyadir > span > span').filter(":first").html(traducciones.clientes.btnAnyadir);

            $('#lblTituloCantidad').html(traducciones.clientes.cantidad);
            $('#lblDescripcion').html(traducciones.clientes.lblDescripcion);
            $('#lblEan').html(traducciones.clientes.ean);

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
            $("#back-btn").show();

            //            if (idTienda == null || idTienda == "undefined" || idTienda == "" || idTienda == "0" || idTienda == 0) {
            //                console.log("no tiene tienda grabada, cogemos la tienda que tiene en la ficha del cliente");
            //                //Nunca ha entrado en la configuración y no tiene tienda grabada en el dispositivo, cogemos la tienda que tiene 
            //                //en la ficha del cliente.
            //                loadObtenerTiendaCliente(idCliente);
            //            } else {
            //                console.log("Ya tiene idTienda asignada, no hace falta coger la tienda de la ficha del cliente");
            //                loadObtenerArticulosListaCompra(idListaCompra, 0, false);
            //            }

            loadObtenerMisOfertas();
        }

        function goBack() {
            document.location.href = 'espai_client.html';
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id + hora());
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.log('mostrarTab ' + id + hora());
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs' + hora());
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function getArticuloWithId(idArticulo) {
            for (i = 0; i < BuscarArticuloArray.length; i++) {
                idArticulo2 = BuscarArticuloArray[i];
                if (idArticulo2.IDARTICULO == idArticulo) {
                    return idArticulo2;
                }
            }
        }

        function displayImage(base64Data, i) {
            //alert(document.getElementById("imagen0").height);
            //alert(base64Data);
            return "<img src='" + "data:image/jpg;base64," + base64Data + "' id='imagen" + i + "' style='max-height: 45px; width: auto;' border='0' />";
        };

        function loadObtenerMisOfertas() {
            try {
                loadTab("alert");
                console.log("Inicio pintando la tabla de mis ofertas" + hora());
                var fecha = new Date();
                var curr_date = fecha.getDate();
                var curr_month = ('0' + (fecha.getMonth() + 1)).slice(-2)
                var curr_year = fecha.getFullYear();
                fecha = curr_year + "" + curr_month + "" + curr_date
                console.log("fecha: " + fecha);
                console.log("idCliente " + idCliente);
                console.log("idTienda " + idTienda);

                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    MisOfertasArray = callWSObtenerMisOfertas("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerArticulosOfertaCliente_APP", idCliente, idTienda, printObtenerMisOfertas);
                } else {
                    MisOfertasArray = callWSObtenerMisOfertas("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerArticulosOfertaCliente_APP", idCliente, idTienda, printObtenerMisOfertas);
                }
            } catch (err) {
                hideTab("alert");
                console.error("Error loadObtenerMisOfertas: " + err + hora());
            }
        }

        function callWSObtenerMisOfertas(url, idCliente, idTienda, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{idCliente: '" + idCliente + "'," + "idTienda: '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printObtenerMisOfertas(json) {
            
            try {
                var imagen = "";
                MisOfertasArray = json;
                $("#tablaArticulos").html("");

                if (MisOfertasArray.length > 0) {
                    for (i = 0; i < MisOfertasArray.length; i++) {
                        var MisOfertas = MisOfertasArray[i];
                        imagen = MisOfertas.IMAGEN;
                        if (imagen == null || imagen == "" || imagen == "undefined") {
                            imagen = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFOUNGMUQ3MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFOUNGMUQ2MjEwRTExRTM5ODE1RjBCQTY1RTYwMzhCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUyBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDowYTQ2NDNjMS0yN2RhLTExZTAtYjg0YS1hZTA0MTdlNGViMDIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYTQ2NDNjMC0yN2RhLTExZTAtYjg0YS1h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";
                        }
                        if (idioma == "ca") {
                            $("#tablaArticulos").append('<tr><td rowspan="2" onclick="showAnyadirArticulo(' + MisOfertas.IDARTICULO + ');" style="width: 30px; height:100px; border-bottom-width: thin; background-position: left; vertical-align: top; background-image: url(img/botonMas.png); background-repeat: no-repeat; border-bottom-style: solid;"></td><td colspan="2" style="font-size:13px;"><b>' + MisOfertas.DESCRIPCION2 + '</b></td></tr><tr><td style="border-bottom: solid; border-bottom-width: thin; text-align: center;"><img alt="" src="data:image/jpg;base64,' + imagen + '" /></td><td style="border-bottom: solid; border-bottom-width: thin;"><b><span id="lblPVP1" class="sorlibold18Magenta" style="background-position: center; font-size:15px;">' + redondear(MisOfertas.PVPOFERTA) + ' €</span></b></td></tr>');
                        } else {
                            $("#tablaArticulos").append('<tr><td rowspan="2" onclick="showAnyadirArticulo(' + MisOfertas.IDARTICULO + ');" style="width: 30px; height:100px; border-bottom-width: thin; background-position: left; vertical-align: top; background-image: url(img/botonMas.png); background-repeat: no-repeat; border-bottom-style: solid;"></td><td colspan="2" style="font-size:13px;"><b>' + MisOfertas.DESCRIPCION + '</b></td></tr><tr><td style="border-bottom: solid; border-bottom-width: thin; text-align: center;"><img alt="" src="data:image/jpg;base64,' + imagen + '" /></td><td style="border-bottom: solid; border-bottom-width: thin;"><b><span id="lblPVP1" class="sorlibold18Magenta" style="background-position: center;font-size:15px;">' + redondear(MisOfertas.PVPOFERTA) + ' €</span></b></td></tr>');
                        }
                    }
                }
                console.log("Final pintar tabla de mis ofertas" + hora());
            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");
        }

        function showAnyadirArticulo(idArticulo) {
            jConfirm(traducciones.clientes.quieresAnyadirArticuloAListaCompra, "Sorli Discau", function (resultado) {
                if (resultado == true) {
                    if (idListaCompra > 0) {
                        console.log("idListaCompra: " + idListaCompra + " idArticulo: " + idArticulo);
                        loadAnyadirArticulo(idListaCompra, idArticulo, 1);
                    } else {
                        console.log("No tienes lista de la compra creada");
                    }
                } else {
                    console.log("Ha cancelado añadir el artículo (" + idArticulo + ") de oferta a la lista de la compra");
                }
            });
        }

        function loadAnyadirArticulo(idListaCompra, idArticulo, cantidad) {
            //            var cantidad = document.getElementById("txtCantidad").innerHTML;
            //            var idArticulo = document.getElementById("lblArticulo").innerHTML;
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    AnyadirArticulos = callActualizarCantidadWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/AnyadirArticulo_APP", idListaCompra, idArticulo, idTienda, 1, printAnyadirArticulo);
                } else {
                    AnyadirArticulos = callActualizarCantidadWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/AnyadirArticulo_APP", idListaCompra, idArticulo, idTienda, 1, printAnyadirArticulo);
                }
            } catch (err) {
                console.error("Error loadAnyadirArticulo: " + err);
                hideTab("alert");
            }
        }

        function callActualizarCantidadWS(url, idListaCompra, idArticulo, idTienda, cantidad, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                //                data: "{idListaCompra: '" + idListaCompra + "'}",
                data: "{idListaCompra: '" + idListaCompra + "'," + "idArticulo: '" + idArticulo + "'," + "idTienda: '" + idTienda + "'," + "cantidad: '" + cantidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    //var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    hideTab("alert");
                    console.error("Error: " + msg);
                }
            });
        }

        function printAnyadirArticulo(json) {
            AnyadirArticulos = json;
            console.log("Inicio añadir artículo a la lista de la compra" + hora());

            try {
                if (AnyadirArticulos == true) {
                    console.log("Final añadir artículo en la lista de la compra" + hora());
                    jAlert(traducciones.clientes.articuloAnyadidoCorrectamente, "Sorli Discau");
                } else {
                    jAlert(traducciones.clientes.errorAnyadirArticulo, "Sorli Discau");
                }

            } catch (err) {
                console.error(err);
                hideTab("alert");
            }

            hideTab("alert");

        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var idTienda;
        var aliasCliente;
        var NombreTienda;
        var ObtenerTiendasArray = new Array;
        var ObtenerTiendaClienteArray = new Array;

        var traducciones = getTraducciones()
        function init() {

            idCliente = obtenerVariable("idCliente");
            idTienda = obtenerVariable("idTienda");
            aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));

            $('#btnGrabar > span > span').filter(":first").html(traducciones.clientes.btnGrabar);
            $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);
            $('#lblTituloTienda').html(traducciones.clientes.tiendaDeCompra + ":");

            console.log("Tienda de compra: " + idTienda);

            if (idCliente == "undefined" || idCliente == "" || idCliente == null || idCliente == 0 || idCliente == "0") {
                hideTab("datosCliente");
            } else {
                $('#lblCliente').html(aliasCliente);
                loadTab("datosCliente");
                if (idTienda == null || idTienda == "undefined" || idTienda == "" || idTienda == "0" || idTienda == 0) {
                    //Nunca ha entrado en la configuración y no tiene tienda grabada en el dispositivo, cogemos la tienda que tiene 
                    //en la ficha del cliente.
                    loadObtenerTiendaCliente(idCliente);
                } else {
                    //Pinta el nombre de la tienda para saber cuál es la tienda de compra
                    loadNombreTienda();
                }
                //Obtiene las tiendas donde alguna vez ha comprado
                loadObtenerTiendas();
            }

            $('#cargando').html(traducciones.menu.cargando);

            ocultarTab("alert");
        }

        function GrabarConfiguracion() {
            console.log("GrabarConfiguración" + hora());
            try {
                grabarVariable("idTienda", ObtenerTiendasArray[$("#cmbTienda").val()].IDTIENDA);
                //document.location.reload(true);
                document.location.href = "espai_client.html";
            } catch (e) {
                hideTab("alert");
            }
            
        }

        function goBack() {
            loadTab("alert");
            document.location.href = 'espai_client.html';
        }

        function home() {
            console.log("home-btn" + hora());
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.log('loadTab ' + id + hora());
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.warn('mostrarTab ' + id + hora());
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs' + hora());
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id + hora());
            $('#tab-' + id).hide();
        }

        function desconexion() {
            try {
                console.log("Inicio Desconexion" + hora());

                grabarVariable("idCliente", 0);
                grabarVariable("aliasCliente", 0);

                idCliente = 0;
                aliasCliente = 0;

                console.log("Fin Desconexion" + hora());

            } catch (e) {
                console.error(e);
            }
            //            document.location.reload(true);
            window.location.href = "home.html";
        }

        function loadNombreTienda() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    NombreTienda = callNombreTiendaWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerNombreTienda_APP", idTienda);
                } else {
                    NombreTienda = callNombreTiendaWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerNombreTienda_APP", idTienda);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callNombreTiendaWS(url, idTienda) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idTienda': '" + idTienda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    return result;
                    //                    $("#lblTienda").html("( " + result.d + " )");

                    //                    $('#cmbTienda> option[value="214"]').attr('selected', 'selected');
                    //                    alert(result.d);
                    //                    try {
                    //                        $('#cmbTienda option:selected').text("'" + result.d + "'");
                    //                        $("#cmbTienda").selectmenu('refresh', true);
                    //                    } catch (error) {
                    //                        alert(error);
                    //                    }
                },
                error: function (msg) {
                    console.error("callNombreTiendaWS" + msg + hora());
                    hideTab("alert");
                }
            });
        }

        function loadObtenerTiendaCliente() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerTiendaClienteArray = callObtenerTiendaClienteWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerTiendaCliente_APP", idCliente, printObtenerTiendaCliente);
                } else {
                    ObtenerTiendaClienteArray = callObtenerTiendaClienteWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerTiendaCliente_APP", idCliente, printObtenerTiendaCliente);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callObtenerTiendaClienteWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //                    var json = (result.d);
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    console.error("callObtenerTiendaClienteWS" + msg + hora());
                    hideTab("alert");
                }
            });
        }

        function printObtenerTiendaCliente(json) {
            ObtenerTiendaClienteArray = json;
            console.log("Inicio Obtener Tienda cliente" + hora());

            try {
                if (ObtenerTiendaClienteArray.length > 0) {

                    $('#lblTienda').html(ObtenerTiendaClienteArray[0].NOMBRE);
                    $('#cmbTienda').append(ObtenerTiendaClienteArray[0].NOMBRE);
                    idTienda = grabarVariable("idTienda", ObtenerTiendaClienteArray[0].IDTIENDA);

                    console.log("Final Obtener tienda cliente" + hora());
                } else {
                    console.error("Error al Obtener la tienda del cliente");
                    hideTab("alert");
                }
            } catch (err) {
                console.error(err);
                hideTab("alert");
            }
            hideTab("alert");
        }

        function loadObtenerTiendas() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    ObtenerTiendasArray = callObtenerTiendasWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerTiendasCliente_APP", idCliente, printObtenerTiendas);
                } else {
                    ObtenerTiendasArray = callObtenerTiendasWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerTiendasCliente_APP", idCliente, printObtenerTiendas);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callObtenerTiendasWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    console.error("callObtenerTiendasWS" + msg + hora());
                    hideTab("alert");
                }
            });
        }

        function printObtenerTiendas(json) {
            ObtenerTiendasArray = json;
            console.log("Inicio Obtener Tiendas cliente" + hora());

            try {
                if (ObtenerTiendasArray.length > 0) {
                    $.each(ObtenerTiendasArray, function (key, value, index) {
                        $('#cmbTienda').append($('<option>', { value: key }).text(value.NOMBRE));
                        $('#cmbTienda').append($('<option>', { value: key }).index(value.IDTIENDA));
                    });
                    console.log("Final Obtener tiendas cliente" + hora());
                } else {
                    console.error("Error al Obtener las tiendas del cliente");
                    hideTab("alert");
                }
                //                $("#cmbTienda").append("<option id='' value=" + idTienda + ">" + "CENTRAL" + "</option>");
            } catch (err) {
                console.error(err);
                hideTab("alert");
            }
            var comboTienda = document.getElementById("cmbTienda");
            $.each(ObtenerTiendasArray, function (key, value, index) {
                if (value.IDTIENDA == idTienda) {
                    comboTienda.selectedIndex = key + 1;
                }
            });
            $("#cmbTienda").selectmenu('refresh', true);
            hideTab("alert");
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    










        var idioma;
        var registroApp;
        var esNativa = new Boolean();
        idioma = getIdioma();
        var idCliente;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var aliasClienteArray = new Array();
        var aliasCliente;

        var traducciones = getTraducciones()
        function init() {

            esNativa = (document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1);

            if (localStorageOCookie() == 2) {
                alert(traducciones.clientes.sinCookieYNavegacionPrivada);
                document.location.href = "home.html";
            } else {
                $("#content").show();

                numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
                aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));
                idCliente = obtenerVariable("idCliente");

                if (numeroSuperMaduixa == null || numeroSuperMaduixa == 'undefined' || numeroSuperMaduixa == 0) {
                    numeroSuperMaduixa = "";
                }

                $('#btnAceptarMaduixa > span > span').filter(":first").html(traducciones.clientes.ok);
                $('#btnCodigoBarras > span > span').filter(":first").html(traducciones.clientes.escaner);
                $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);

                //Menus, siempre igual
                $('#cargando').html(traducciones.menu.cargando);

                //            txtNumeroSuperMaduixa.value = numeroSuperMaduixa;

                console.warn("numeroSuperMaduixa: " + numeroSuperMaduixa + " aliasCliente: " + aliasCliente);

                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    $("#btnAceptarMaduixa").show();
                    $("#btnDesconexion").hide();
                    if (esNativa == false) {
                        $("#btnCodigoBarras").hide();
                    } else {
                        $("#btnCodigoBarras").show();
                    }
                    $("#txtNumeroSuperMaduixa").html("");
                    $("#txtNumeroSuperMaduixa").show();
                    $("#lblAliasCliente").hide();
                } else {
                    $("#btnAceptarMaduixa").hide();
                    $("#btnDesconexion").show();
                    $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);
                    $('#btnCodigoBarras').hide();
                    $("#txtNumeroSuperMaduixa").hide();
                    $("#lblAliasCliente").show();
                    $("#lblAliasCliente").html(aliasCliente);
                }

                showMenus();

                ocultarTab("alert");
                $("#back-btn").hide();

            }
        }

        function desconexion() {
            try {
                console.warn("Desconexion");

                grabarVariable("idCliente", 0);
                grabarVariable("aliasCliente", 0);
                grabarVariable("numeroSuperMaduixa", 0);

                idCliente = 0;
                aliasCliente = 0;
                numeroSuperMaduixa = 0;

                $("#btnAceptarMaduixa").show();
                $("#txtNumeroSuperMaduixa").html("");
                $("#txtNumeroSuperMaduixa").show();
                $('#btnCodigoBarras').show();
                $("#lblAliasCliente").hide();
                $("#lblAliasCliente").html("");
                $("#btnDesconexion").hide();
                console.warn("Desconexion idCliente: " + idCliente + " aliasCliente: " + aliasCliente + " numeroSupermaduixa: " + numeroSuperMaduixa);
            } catch (e) {
                console.log(e);
            }
        }

        function home() {
            console.warn("home-btn");
            document.location.href = 'home.html';
        }

        function scan() {
            try {
                if (window.plugins.barcodeScanner != undefined) {
                    window.plugins.barcodeScanner.scan(function (result) {
                        //txtNumeroSuperMaduixa.value = result.text;
                        //Para que entre directamente cuando lee el código de cliente, sin tener que darle al OK.
                        txtNumeroSuperMaduixa.value = result.text;
                        loadComprobarCliente(result.text);
                    }, function (error) {
                        alerta("Fallo scanner: " + error);
                    });
                } else {
                    alerta(traducciones.clientes.descargaAplicacionNativa);
                }
            } catch (err) {
                ocultarTab("alert");
            }

        }

        function setBackName(name, icon) {
            //            if (!icon) {
            //                $('#back-btn').css('margin-top', 4);
            //            } else {
            //                $('#back-btn').css('margin-top', 1);
            //            }
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function loadTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.warn('Hide tabs');
            $('.tab').hide();
        }

        function existeCliente() {
            if (txtNumeroSuperMaduixa.value == "") {
                alerta(traducciones.clientes.msgClienteEnBlanco);
            } else {
                loadComprobarCliente(txtNumeroSuperMaduixa.value);
            }
        }

        function loadComprobarCliente(idCliente) {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    idCliente = callWS("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/comprobarCliente_APP", idCliente, printComprobarCliente);
                } else {
                    idCliente = callWS("http://www.sorlidiscau.mobi/supermaduixaws.asmx/comprobarCliente_APP", idCliente, printComprobarCliente);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWS(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    ocultarTab("alert");
                }
            });
        }

        //Aquí se guardarán en las variables (ya sea LocalStorage o cookie), el número de tarjeta.
        function printComprobarCliente(json) {
            try {
                idCliente = json;
                if (idCliente > -1) {
                    grabarVariable("numeroSuperMaduixa", txtNumeroSuperMaduixa.value);
                    grabarVariable("idCliente", idCliente);

                    loadPintarAliasCliente(txtNumeroSuperMaduixa.value);
                    $("#btnAceptarMaduixa").hide();
                    $("#btnDesconexion").show();
                    $('#btnDesconexion > span > span').filter(":first").html(traducciones.clientes.btnDesconexion);
                    $('#btnCodigoBarras').hide();
                    $("#txtNumeroSuperMaduixa").hide();
                    $("#lblAliasCliente").html(aliasCliente);
                    $("#lblAliasCliente").show();
                    if (esNativa == true) {
                        notificaciones();
                    }
                }
                else {
                    alerta(traducciones.clientes.codigoClienteInexistente);
                }
                ocultarTab("alert");
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function loadPintarAliasCliente(idCliente) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    aliasClienteArray = callWSPintarAliasCliente("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerAliasCliente_APP", idCliente, showPintarAliasCliente);
                } else {
                    aliasClienteArray = callWSPintarAliasCliente("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerAliasCliente_APP", idCliente, showPintarAliasCliente);
                }
            } catch (err) {
                //console.warn(err);
            }
        }

        function callWSPintarAliasCliente(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{'idCliente': '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.warn("ERROR: " + msg.responseText);
                    console.warn("textStatus : " + textStatus);
                    console.warn("errorThrown : " + errorThrown);
                }
            });
        }

        function showPintarAliasCliente(json) {
            console.warn("showPintarAliasCliente");
            aliasClienteArray = json;

            if (aliasClienteArray.length > 0) {
                aliasCliente = aliasClienteArray[0].ALIAS;
                if (aliasCliente == 0 || aliasCliente == null || aliasCliente == 'undefined' || aliasCliente == "") {
                    aliasCliente = traducciones.clientes.sinDatos;
                }
                $("#lblAliasCliente").html(aliasCliente);
                console.warn("showPintarAliasCliente - aliasCliente: " + aliasCliente);
                grabarVariable("aliasCliente", aliasCliente);

                return aliasCliente;
            } else {
                return "";
            }
        }

        function hideTab(id) {
            console.warn('Show ' + id);
            $('#tab-' + id).hide();
        }

        function showMenus() {
            $("#opciones").html("");
            $("#tab-menus").show();
            $("#opciones").append('<tr onclick="openDetailMenu(1);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/clients.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.valesSupermaduixa + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.valesSupermaduixadescripcion + '</span></td></tr>');
            //          $("#opciones").append('<tr onclick="openDetailMenu(2);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/ListaCompra.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.listaCompra + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.listaCompradescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(3);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/MisCompras.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.tusCompras + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.tusComprasdescripcion + '</span></td></tr>');
            //          $("#opciones").append('<tr onclick="openDetailMenu(4);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/ofertas.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.ofertas + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.ofertasdescripcion + '</span></td></tr>');
            //          $("#opciones").append('<tr onclick="openDetailMenu(5);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/misofertas.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.ofertas + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.ofertasdescripcion + '</span></td></tr>');
            $("#opciones").append('<tr onclick="openDetailMenu(6);" onmouseover="mouseover(this);" onmouseout="mouseout(this);"><td style="width:70px; height:10px; margin-top:0px; border-bottom:solid; border-bottom-width:thin"><img class="imagen-menuIndex" src="img/tarjetaregalo.gif" /></td><td align="left" height="65px" style="border-bottom:solid; border-bottom-width:thin"><b>' + traducciones.clientes.tarjetaregalo + '</b><br/><span class="ui-text-list-small">' + traducciones.clientes.tarjetaregalodescripcion + '</span></td></tr>');

            hideTab("alert");

            currentSection = 0;
        }

        function mostrarCarga() {
            loadTab("alert");
        }

        function openDetailMenu(idOpcion) {
            console.warn("openDetailMenu: " + idCliente + " aliasCliente: " + aliasCliente);
            if (idOpcion == "1") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'maduixa.html';
                }
            } else if (idOpcion == "2") {
                mostrarCarga();
                document.location.href = 'listacompra.html';
            } else if (idOpcion == "3") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'miscompras.html';
                }
            } else if (idOpcion == "4") {
                mostrarCarga();
                document.location.href = 'ofertas.html';
            } else if (idOpcion == "5") {
                mostrarCarga();
                document.location.href = 'misofertas.html';
            } else if (idOpcion == "6") {
                mostrarCarga();
                if (aliasCliente == 0 || idCliente == 0 || idCliente == null) {
                    alerta(traducciones.clientes.conectarse);
                } else {
                    document.location.href = 'tarjetaregalo.html';
                }
            }
            hideTab("alert");
        }

        function notificaciones() {
            try {
                pushNotification = window.plugins.pushNotification;
            } catch (e) {
                console.log("pushNotification: " + e);
            }
            try {
                if (device.platform == 'android' || device.platform == 'Android') {
                    pushNotification.register(successHandler, errorHandler, { "senderID": "160232282146", "ecb": "onNotificationGCM" });
                } else {
                    pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });
                }
            } catch (e) {
                console.log("device.platform: " + e);
            }
        }

        function successHandler(result) {
            console.log("successHandler: " + result);
        }

        function errorHandler(error) {
            console.log(error);
        }

        function tokenHandler(result) {
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            console.log("tokenHandler: " + result);
            idCliente = obtenerVariable("idCliente");
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                idCliente = 0;
            }
            loadRegistroMovilApple(1, result, idCliente);
            if (pagina != "espai_client.html") {
                document.location.href = "home.html";
            }
        }

        //Para grabar la parte de iOS, la parte de Android lo hace el escript que esta en PushNotification.js
        function loadRegistroMovilApple(sistemaOperativo, idDispositivoMovil, idCliente) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    registroApp = callWSRegistroMovilApple("http://bismanwsdes.sorlidiscau.es/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                } else {
                    registroApp = callWSRegistroMovilApple("http://www.sorlidiscau.mobi/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovilApple);
                }
            } catch (err) {
                console.log("loadRegistroMovil: " + err);
            }
        }

        function callWSRegistroMovilApple(url, sistemaOperativo, idDispositivoMovil, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{sistemaOperativo: '" + sistemaOperativo + "'," + "idDispositivoMovil: '" + idDispositivoMovil + "'," + "idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("callWSRegistroMovil ERROR: " + msg.responseText);
                    console.log("callWSRegistroMovil textStatus: " + textStatus);
                    console.log("callWSRegistroMovil errorThrown: " + errorThrown);
                }
            });
        }

        function showRegistroMovilApple(json) {
            registroApp = json;
            var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
            if (registroApp == "1") {
                estaRegistrada = true;
                grabarVariable("estaRegistrada", true);
                console.log("showRegistroMovilApple OK");
            } else {
                estaRegistrada = false;
                grabarVariable("estaRegistrada", false);
                console.log("showRegistroMovilApple FALLO");
            }
            if (pagina != "espai_client.html") {
                document.location.href = "home.html";
            }
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    











        var idioma;
        idioma = getIdioma();
        var idCliente;
        var idAccion;
        var numeroSuperMaduixa;
        var currentSection = 0;
        var currentAliasCliente;
        var aceptarLectura;
        var aceptarLecturaInformativa;
        var segmentacionesNoRedimidasArray = new Array();
        var segmentacionesNoRedimidasInformativasArray = new Array();
        var lineasMensajeArray = new Array();
        var aliasClienteArray = new Array();
        var lecturasMensajesArray = new Array();
        var redencionesMensajesArray = new Array();
        var imagenesAccionArray = new Array();
        var numeroValesPendientes = 0;
        var numeroValesLeidos = 0;
        var numeroValesRedimidos = 0;
        var numeroValesPendientesInformativos = 0;
        var aliasCliente;
        var imagenAccion;
        var idAccionidTicket;

        var traducciones = getTraducciones()
        function init() {
            $('#lblTextoPrincipal').html(traducciones.clientes.lblTextoPrincipal);
            $('#lblLecturaCodigoBarrasSuperMaduixa').html(traducciones.clientes.lblLecturaCodigoBarrasSuperMaduixa);
            $('#lblTextoPrincipal').html(traducciones.clientes.lblTextoPrincipal);
            $('#btnAceptarMaduixa > span > span').filter(":first").html(traducciones.clientes.ok);
            $('#btnCodigoBarras > span > span').filter(":first").html(traducciones.clientes.escaner);
            $('#btnAceptarMaduixaScaner > span > span').filter(":first").html(traducciones.clientes.btnAceptarMaduixaScaner);
            $('#btnAceptarLectura > span > span').filter(":first").html(traducciones.clientes.btnAceptarLectura);
            $('#btnAceptarLecturaInformativa > span > span').filter(":first").html(traducciones.clientes.btnAceptarLecturaInformativa);

            numeroValesPendientes = 0;
            numeroValesLeidos = 0;
            numeroValesRedimidos = 0;
            numeroValesPendientesInformativos = 0;

            //Menus, siempre igual
            $('#cargando').html(traducciones.menu.cargando);
            $('#label_menu_supers').html(traducciones.menu.supermercados);
            $('#label_menu_maduixa').html(traducciones.menu.supermaduixa);
            $('#label_menu_recetas').html(traducciones.menu.recetas);
            $('#label_menu_quienes').html(traducciones.menu.quienes);
            $('#label_menu_contacto').html(traducciones.menu.contacto);

            numeroSuperMaduixa = obtenerVariable("numeroSuperMaduixa");
            aliasCliente = decodeURIComponent(obtenerVariable("aliasCliente"));
            console.log("aliasCliente maduixa.html: " + aliasCliente);
            if (aliasCliente == "Sin datos" || aliasCliente == "Sende dades") {
                aliasCliente = "";
            }
            console.log("aliasCliente2 maduixa.html: " + aliasCliente);

            idCliente = obtenerVariable("idCliente");

            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                document.location.href = "espai_client.html";
            } else {
                try {
                    idAccionidTicket = getQuerystring("idAccionidTicket");

                    if (idAccionidTicket == 0 || idAccionidTicket == null || idAccionidTicket == 'undefined') {
                        mostrarOpciones();
                        document.addEventListener("deviceready", loadNumeroValesPendientes(idCliente), false);
                    } else {
                        loadTab("alert");
                        openDetail(idAccionidTicket);
                    }
                } catch (err) {
                    ocultarTab("alert");
                    //alert(err);
                }

            }

            //            setHomeName("&nbsp;", false);

            ocultarTab("alert");
            //            setBackName(traducciones.clientes.btnAtras, false);
        }

        function home() {
            console.log("home-btn");
            document.location.href = 'home.html';
        }

        function setBackName(name, icon) {
            $('#back-btn > span > span').filter(":first").html(name);
        }

        function goBack() {
            console.log("back: " + currentSection);

            $('#divImagenAccion').html("");
            $('#divImagenAccionInformativa').html("");
            $('#divImagenLecturaMensaje').html("");
            $('#divImagenRedencionesMensaje').html("");

            if (currentSection == 1) { mostrarOpciones(); }
            else if (currentSection == 2) { mostrarOpciones(); }
            else if (currentSection == 3) { loadObtenerSegmentacionesNoLeidas(); }
            else if (currentSection == 4) { mostrarOpciones(); }
            else if (currentSection == 5) { loadObtenerSegmentacionesNoLeidasInformativas(); }
            else if (currentSection == 6) { mostrarOpciones(); }
            else if (currentSection == 7) { loadObtenerLecturasMensajes(); }
            else if (currentSection == 8) { mostrarOpciones(); }
            else if (currentSection == 9) { loadObtenerRedencionesMensajes(); }
            else if (currentSection == 0) { document.location.href = 'espai_client.html'; }
            else { loadTab("alert"); document.location.href = 'index.html'; }
        }

        function loadTab(id) {
            console.log('loadTab ' + id);
            $('#tab-' + id).fadeIn();
        }

        function ocultarTab(id) {
            console.log('ocultarTab ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarTab(id) {
            console.log('mostrarTab ' + id);
            $('#tab-' + id).show();
        }

        function hideTabs() {
            console.log('Hide tabs');
            $('.tab').hide();
        }

        function hideTab(id) {
            console.log('hideTab ' + id);
            $('#tab-' + id).hide();
        }

        function mostrarOpciones() {
            hideTabs();
            mostrarTab("opciones");
            if (numeroValesLeidos == "undefined" || numeroValesLeidos == null || numeroValesLeidos == "") {
                numeroValesLeidos = 0;
            }
            if (numeroValesPendientes == "undefined" || numeroValesPendientes == null || numeroValesPendientes == "") {
                numeroValesPendientes = 0;
            }
            if (numeroValesPendientesInformativos == "undefined" || numeroValesPendientesInformativos == null || numeroValesPendientesInformativos == "") {
                numeroValesPendientesInformativos = 0;
            }
            if (numeroValesRedimidos == "undefined" || numeroValesRedimidos == null || numeroValesRedimidos == "") {
                numeroValesRedimidos = 0;
            }
            $('#shopListOpciones').empty();
            $("#shopListOpciones").append('<li><a href="#" onclick="javascript:loadObtenerSegmentacionesNoLeidas()");"><span class="ui-text-list-grande">' + traducciones.clientes.valesPendientes + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesPendientesExplicacion + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesPendientesExplicacion2 + '</span><span class="ui-li-count">' + numeroValesPendientes + '</span></a></li>')
            $("#shopListOpciones").append('<li><a href="#" onclick="javascript:loadObtenerLecturasMensajes()");"><span class="ui-text-list-grande">' + traducciones.clientes.valesLeidos + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesLeidosExplicacion + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesLeidosExplicacion2 + '</span><span class="ui-li-count">' + numeroValesLeidos + '</span></a></li>')
            $("#shopListOpciones").append('<li><a href="#" onclick="javascript:loadObtenerRedencionesMensajes()");"><span class="ui-text-list-grande">' + traducciones.clientes.valesUtilizados + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesUtilizadosExplicacion + '</span><span class="ui-li-count">' + numeroValesRedimidos + '</span></a></li>')
            $("#shopListOpciones").append('<li><a href="#" onclick="javascript:loadObtenerSegmentacionesNoLeidasInformativas()");"><span class="ui-text-list-grande">' + traducciones.clientes.valesInformativos + '</span><br><span class="ui-text-list-small">' + traducciones.clientes.valesInformativosExplicacion + '</span><span class="ui-li-count">' + numeroValesPendientesInformativos + '</span></a></li>')
            $('#shopListOpciones').listview("refresh");
            setBackName(traducciones.clientes.btnAtras, false);

            currentSection = 0;
        }

        function loadObtenerSegmentacionesNoLeidas() {
            ocultarTab("opciones");
            // el 1 indica que es un mensaje tipo "Normal", cuando es "Informativo" es 3
            loadTab("alert");
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    segmentacionesNoRedimidasArray = callWSSegmentacionesNoRedimidas("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 1, showSegmentacionesNoRedimidas);
                } else {
                    segmentacionesNoRedimidasArray = callWSSegmentacionesNoRedimidas("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 1, showSegmentacionesNoRedimidas);
                }
                //segmentacionesNoRedimidasArray = callWSSegmentacionesNoRedimidas("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 1, showSegmentacionesNoRedimidas);
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function loadObtenerSegmentacionesNoLeidasInformativas() {
            ocultarTab("opciones");
            // el 3 indica que es un mensaje tipo "Informativo", cuando es "Normal" es 1
            loadTab("alert");
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    segmentacionesNoRedimidasInformativasArray = callWSSegmentacionesNoRedimidas("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 3, showSegmentacionesNoRedimidasInformativas);
                } else {
                    segmentacionesNoRedimidasInformativasArray = callWSSegmentacionesNoRedimidas("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 3, showSegmentacionesNoRedimidasInformativas);
                }
                //segmentacionesNoRedimidasInformativasArray = callWSSegmentacionesNoRedimidas("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerSegmentacionesNoLeidas_APP", idCliente, 3, showSegmentacionesNoRedimidasInformativas);
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWSSegmentacionesNoRedimidas(url, idCliente, tipoMensaje, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idCliente: '" + idCliente + "'," + "tipoMensaje: '" + tipoMensaje + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);
                }
            });
        }

        function showSegmentacionesNoRedimidas(json) {
            console.log("Search");
            segmentacionesNoRedimidasArray = json;

            hideTabs();
            mostrarTab("listadoSegmentacionesNoLeidas");
            $('#shopListSegmentacionesNoLeidas').empty();

            ocultarTab("alert");

            if (segmentacionesNoRedimidasArray.length > 0) {
                for (i = 0; i < segmentacionesNoRedimidasArray.length; i++) {
                    var segmentacionesNoRedimida = segmentacionesNoRedimidasArray[i];
                    $("#shopListSegmentacionesNoLeidas").append('<li><a href="#" onclick="openDetail(' + segmentacionesNoRedimida.IDACCION + ');">' + segmentacionesNoRedimida.DESCACCION.substring(0, 1).toUpperCase() + segmentacionesNoRedimida.DESCACCION.substring(1, segmentacionesNoRedimida.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small">' + traducciones.clientes.descuentoHasta + segmentacionesNoRedimida.FECHA2 + '</span></a></li>');
                }
            } else {
                mostrarOpciones();
                alerta(traducciones.clientes.noHayMensajes);
                //                $("#tab-listadoSegmentacionesNoLeidas").html(traducciones.clientes.noHayMensajes)
            }

            $('#shopListSegmentacionesNoLeidas').listview("refresh");
            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            currentSection = 2;
        }

        function showSegmentacionesNoRedimidasInformativas(json) {
            console.log("Search");
            segmentacionesNoRedimidasInformativasArray = json;

            hideTabs();
            mostrarTab("listadoSegmentacionesNoLeidasInformativas");
            $('#shopListSegmentacionesNoLeidasInformativas').empty();

            ocultarTab("alert");

            if (segmentacionesNoRedimidasInformativasArray.length > 0) {
                for (i = 0; i < segmentacionesNoRedimidasInformativasArray.length; i++) {
                    var segmentacionesNoRedimidasInformativas = segmentacionesNoRedimidasInformativasArray[i];
                    $("#shopListSegmentacionesNoLeidasInformativas").append('<li><a href="#" onclick="openDetailSegmentacionesNoRedimidasInformativas(' + segmentacionesNoRedimidasInformativas.IDACCION + ');">' + segmentacionesNoRedimidasInformativas.DESCACCION.substring(0, 1).toUpperCase() + segmentacionesNoRedimidasInformativas.DESCACCION.substring(1, segmentacionesNoRedimidasInformativas.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small"></span></a></li>');
                }
            } else {
                mostrarOpciones();
                alerta(traducciones.clientes.noHayMensajesInformativos);
                //                $("#tab-listadoSegmentacionesNoLeidasInformativas").html(traducciones.clientes.noHayMensajes)
            }

            $('#shopListSegmentacionesNoLeidasInformativas').listview("refresh");
            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            currentSection = 4;
        }

        function loadObtenerLecturasMensajes() {
            ocultarTab("opciones");
            loadTab("alert");
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    lecturasMensajesArray = callWSLecturasMensajes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerLecturasMensajes_APP", idCliente, showLecturasMensajes);
                } else {
                    lecturasMensajesArray = callWSLecturasMensajes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLecturasMensajes_APP", idCliente, showLecturasMensajes);
                }
                //lecturasMensajesArray = callWSLecturasMensajes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLecturasMensajes_APP", idCliente, showLecturasMensajes);
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWSLecturasMensajes(url, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);
                }
            });
        }

        function showLecturasMensajes(json) {
            console.log("Search");
            lecturasMensajesArray = json;

            hideTabs();
            mostrarTab("listadoLecturas");
            $('#shopListLecturas').empty();

            ocultarTab("alert");

            if (lecturasMensajesArray.length > 0) {
                for (i = 0; i < lecturasMensajesArray.length; i++) {
                    var LecturasMensajes = lecturasMensajesArray[i];
                    $("#shopListLecturas").append('<li><a href="#" onclick="openDetailLecturaMensajes(' + LecturasMensajes.IDACCION + ');">' + LecturasMensajes.DESCACCION.substring(0, 1).toUpperCase() + LecturasMensajes.DESCACCION.substring(1, LecturasMensajes.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small">' + traducciones.clientes.fechafin + LecturasMensajes.FECHA2 + '</span></a></li>');
                }
            } else {
                mostrarOpciones();
                alerta(traducciones.clientes.noHayMensajes);
                //                $("#tab-listadoLecturas").html(traducciones.clientes.noHayMensajes)
            }

            $('#shopListLecturas').listview("refresh");
            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            currentSection = 6;
        }

        function loadObtenerRedencionesMensajes() {
            ocultarTab("opciones");
            loadTab("alert");
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    redencionesMensajesArray = callWSLecturasMensajes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerRedencionMensajes_APP", idCliente, showRedencionesMensajes);
                } else {
                    redencionesMensajesArray = callWSLecturasMensajes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerRedencionMensajes_APP", idCliente, showRedencionesMensajes);
                }
                //redencionesMensajesArray = callWSLecturasMensajes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerRedencionMensajes_APP", idCliente, showRedencionesMensajes);
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function showRedencionesMensajes(json) {
            console.log("Search");
            redencionesMensajesArray = json;

            hideTabs();
            mostrarTab("listadoRedenciones");
            $('#shopListRedenciones').empty();

            ocultarTab("alert");

            if (redencionesMensajesArray.length > 0) {
                for (i = 0; i < redencionesMensajesArray.length; i++) {
                    var redencionesMensajes = redencionesMensajesArray[i];
                    // Se quita, hablado con Juanjo. 17/10/2012.
                    //                    if (idiomaBisman(idioma) == 1) {
                    //                        $("#shopListRedenciones").append('<li><a href="#" onclick="openDetailRedencionesMensajes(' + redencionesMensajes.IDACCION + ');">' + redencionesMensajes.DESCACCION.substring(0, 1).toUpperCase() + redencionesMensajes.DESCACCION.substring(1, redencionesMensajes.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small">Descompte : ' + redencionesMensajes.IMPORTE + ' </span></a></li>');
                    //                    } else {
                    //                        $("#shopListRedenciones").append('<li><a href="#" onclick="openDetailRedencionesMensajes(' + redencionesMensajes.IDACCION + ');">' + redencionesMensajes.DESCACCION.substring(0, 1).toUpperCase() + redencionesMensajes.DESCACCION.substring(1, redencionesMensajes.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small">Descuento : ' + redencionesMensajes.IMPORTE + ' </span></a></li>');
                    //                    }
                    $("#shopListRedenciones").append('<li><a href="#">' + redencionesMensajes.DESCACCION.substring(0, 1).toUpperCase() + redencionesMensajes.DESCACCION.substring(1, redencionesMensajes.DESCACCION.lenght).toLowerCase() + '<br/><span class="ui-text-list-small">' + traducciones.clientes.descuento + redondear(redencionesMensajes.IMPORTE) + ' </span></a></li>');
                    //                    }
                }
            } else {
                mostrarOpciones();
                alerta(traducciones.clientes.noHayMensajes);
                //                $("#tab-listadoRedenciones").html(traducciones.clientes.noHayMensajes)
            }

            $('#shopListRedenciones').listview("refresh");
            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

            currentSection = 8;
        }

        //0: Pendientes de Leer SegmentacionesNoRedimidas
        //1: Leidos
        //2: Redencion
        //3: Informativas
        function loadObtenerLineasMensaje(idAccion, lecturaORedencionOInformativas) {
            loadTab("alert");
            try {
                if (lecturaORedencionOInformativas == "0") {
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        lineasMensajeArray = callWSLineasMensaje("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidas);
                    } else {
                        lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidas);
                    }
                    //lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidas);
                } else if (lecturaORedencionOInformativas == "1") {
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        lineasMensajeArray = callWSLineasMensaje("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeLecturas);
                    } else {
                        lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeLecturas);
                    }
                    //lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeLecturas);
                } else if (lecturaORedencionOInformativas == "2") {
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        lineasMensajeArray = callWSLineasMensaje("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeRedenciones);
                    } else {
                        lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeRedenciones);
                    }
                    //lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeRedenciones);
                } else if (lecturaORedencionOInformativas == "3") {
                    if (document.domain == "bismanwsdes.sorlidiscau.es") {
                        lineasMensajeArray = callWSLineasMensaje("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidasInformativas);
                    } else {
                        lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidasInformativas);
                    }
                    //lineasMensajeArray = callWSLineasMensaje("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerLineasMensajes_APP", idAccion, idiomaBisman(idioma), showLineasMensajeSegmentacionesNoRedimidasInformativas);
                }
            } catch (err) {
                ocultarTab("alert");
            }
            $('#lblLineasMensajeSegmentacionesNoRedimidas').empty();
            $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').empty();
            $('#lblLineasMensajeLecturas').empty();
            $('#lblLineasMensajeRedencionesMensajes').empty();
        }

        function callWSLineasMensaje(url, idAccion, idioma, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idAccion: '" + idAccion + "'," + "idioma: '" + idioma + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);
                }
            });
        }

        function showLineasMensajeSegmentacionesNoRedimidas(json) {
            console.log("Search");
            lineasMensajeArray = json;

            $('#shopListSegmentacionesNoLeidas').listview("refresh");

            $('#lblLineasMensajeSegmentacionesNoRedimidas').empty();

            for (i = 0; i < lineasMensajeArray.length; i++) {
                if (lineasMensajeArray[i].TIPOLETRA == "1" && lineasMensajeArray[i].JUSTIFICADO == "2") {
                    $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<center><span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span></center>");
                    //                    $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<br />");
                } else if (lineasMensajeArray[i].TIPOLETRA == "1") {
                    $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span>");
                    $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<br />");
                } else {
                    if (lineasMensajeArray[i].TEXTO.indexOf("<alias>") > -1) {
                        //                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<br />");
                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<br />");
                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append("Hola " + aliasCliente + ",");
                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append('<br />');
                    } else {
                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append(lineasMensajeArray[i].TEXTO);
                        //$('#lblLineasMensajeSegmentacionesNoRedimidas').append("&nbsp;");
                        $('#lblLineasMensajeSegmentacionesNoRedimidas').append("<br />");
                    }
                }
            }
            $('#shopListSegmentacionesNoLeidas').listview("refresh");
            loadImagenesAccion(lineasMensajeArray[0].IDACCION, 0);

            currentSection = 3;

            ocultarTab("alert");
        }

        function showLineasMensajeSegmentacionesNoRedimidasInformativas(json) {
            console.log("Search");
            lineasMensajeArray = json;

            $('#shopListSegmentacionesNoLeidasInformativas').listview("refresh");

            $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').empty();

            for (i = 0; i < lineasMensajeArray.length; i++) {
                if (lineasMensajeArray[i].TIPOLETRA == "1" && lineasMensajeArray[i].JUSTIFICADO == "2") {
                    $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<center><span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span></center>");
                    //                    $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                } else if (lineasMensajeArray[i].TIPOLETRA == "1") {
                    $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span>");
                    $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                } else {
                    if (lineasMensajeArray[i].TEXTO.indexOf("<alias>") > -1) {
                        //                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("Hola " + aliasCliente + ",");
                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                    } else {
                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append(lineasMensajeArray[i].TEXTO);
                        //$('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("&nbsp;");
                        $('#lblLineasMensajeSegmentacionesNoRedimidasInformativas').append("<br />");
                    }
                }
                //$('#DivlblLineasMensajeSegmentacionesNoRedimidasInformativas').html("<br/><a href='#' data-role='button' data-icon='check' onclick='loadAceptarLecturaRedenInformativa(" + lineasMensajeArray[i].IDACCION + "," + idCliente + ")'>Aceptar1</a>")
                //$('#DivlblLineasMensajeSegmentacionesNoRedimidasInformativas').html("<br/><a href='#' data-role='button' data-icon='check' class='sorlibold16Azul' onclick='loadAceptarLecturaRedenInformativa(" + lineasMensajeArray[i].IDACCION + "," + idCliente + ")'>" + traducciones.clientes.btnAceptarLecturaInformativa + "</a>")
            }
            $('#shopListSegmentacionesNoLeidasInformativas').listview("refresh");
            loadImagenesAccion(lineasMensajeArray[0].IDACCION, 1);

            currentSection = 5;

            ocultarTab("alert");
        }

        function showLineasMensajeLecturas(json) {
            console.log("showLineasMensajeLecturas");
            lineasMensajeArray = json;

            $('#shopListLecturas').listview("refresh");
            $('#lblLineasMensajeLecturas').empty();

            for (i = 0; i < lineasMensajeArray.length; i++) {
                if (lineasMensajeArray[i].TIPOLETRA == "1" && lineasMensajeArray[i].JUSTIFICADO == "2") {
                    $('#lblLineasMensajeLecturas').append("<center><span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span></center>");
                    //                    $('#lblLineasMensajeLecturas').append("<br />");
                } else if (lineasMensajeArray[i].TIPOLETRA == "1") {
                    $('#lblLineasMensajeLecturas').append("<span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span>");
                    $('#lblLineasMensajeLecturas').append("<br />");
                } else {
                    if (lineasMensajeArray[i].TEXTO.indexOf("<alias>") > -1) {
                        //                        $('#lblLineasMensajeLecturas').append("<br />");
                        $('#lblLineasMensajeLecturas').append("<br />");
                        $('#lblLineasMensajeLecturas').append("Hola " + aliasCliente + ",");
                        $('#lblLineasMensajeLecturas').append("<br />");
                    } else {
                        texto = lineasMensajeArray[i].TEXTO;
                        $('#lblLineasMensajeLecturas').append(texto);
                        $('#lblLineasMensajeLecturas').append("<br />");
                    }
                }
            }
            $('#shopListLecturas').listview("refresh");
            loadImagenesAccion(lineasMensajeArray[0].IDACCION, 2);

            currentSection = 7;

            ocultarTab("alert");
        }

        function showLineasMensajeRedenciones(json) {
            console.log("Search");
            lineasMensajeArray = json;

            $('#shopListRedenciones').listview("refresh");
            $('#lblLineasMensajeRedencionesMensajes').empty();

            for (i = 0; i < lineasMensajeArray.length; i++) {
                if (lineasMensajeArray[i].TIPOLETRA == "1" && lineasMensajeArray[i].JUSTIFICADO == "2") {
                    $('#lblLineasMensajeRedencionesMensajes').append("<center><span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span></center>");
                    //                    $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                } else if (lineasMensajeArray[i].TIPOLETRA == "1") {
                    $('#lblLineasMensajeRedencionesMensajes').append("<span class='sorlibold14Azul'>" + lineasMensajeArray[i].TEXTO + "</span>");
                    $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                } else {
                    if (lineasMensajeArray[i].TEXTO.indexOf("<alias>") > -1) {
                        //                        $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                        $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                        $('#lblLineasMensajeRedencionesMensajes').append("Hola " + aliasCliente + ",");
                        $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                    } else {
                        $('#lblLineasMensajeRedencionesMensajes').append(lineasMensajeArray[i].TEXTO);
                        $('#lblLineasMensajeRedencionesMensajes').append("<br />");
                        //$('#lblLineasMensajeRedencionesMensajes').append("&nbsp;");
                    }
                }
            }
            $('#shopListRedenciones').listview("refresh");
            loadImagenesAccion(lineasMensajeArray[0].IDACCION, 3);

            currentSection = 9;

            ocultarTab("alert");
        }

        function loadAceptarLecturaRedenInformativa() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    aceptarLecturaInformativa = callWSAceptarLectura("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/leerMensaje_APP", idAccion, idCliente, showAceptarLecturaRedenInformativa);
                } else {
                    aceptarLecturaInformativa = callWSAceptarLectura("http://www.sorlidiscau.mobi/supermaduixaws.asmx/leerMensaje_APP", idAccion, idCliente, showAceptarLecturaRedenInformativa);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function loadAceptarLectura() {
            try {
                loadTab("alert");
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    aceptarLectura = callWSAceptarLectura("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/leerMensaje_APP", idAccion, idCliente, showAceptarLectura);
                } else {
                    aceptarLectura = callWSAceptarLectura("http://www.sorlidiscau.mobi/supermaduixaws.asmx/leerMensaje_APP", idAccion, idCliente, showAceptarLectura);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWSAceptarLectura(url, idAccion, idCliente, callback) {
            $.ajax({
                type: "POST",
                url: url,
                headers: { "cache-control": "no-cache" },
                //data: "{}",
                data: "{idAccion: '" + idAccion + "'," + "idCliente: '" + idCliente + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.log("ERROR: " + msg.responseText);
                    console.log("textStatus : " + textStatus);
                    console.log("errorThrown : " + errorThrown);
                }
            });
        }

        function showAceptarLectura(json) {
            aceptarLectura = json;
            if (aceptarLectura == true) {
                hideTabs();
                alerta(traducciones.clientes.descuentoValidado);
                ocultarTab("login");
                loadObtenerSegmentacionesNoLeidas();
                document.addEventListener("deviceready", loadNumeroValesPendientes(idCliente), false);
                //                loadNumeroValesPendientes(idCliente);
            }
            else {
                alerta(traducciones.clientes.errorAceptarValizacion);
            }
        }

        function showAceptarLecturaRedenInformativa(json) {
            aceptarLecturaInformativa = json;
            if (aceptarLecturaInformativa == true) {
                hideTabs();
                //                alerta(traducciones.clientes.descuentoAceptado);
                ocultarTab("login");
                loadObtenerSegmentacionesNoLeidasInformativas();
                document.addEventListener("deviceready", loadNumeroValesPendientes(idCliente), false);
                //                loadNumeroValesPendientes(idCliente);
            }
            else {
                alerta(traducciones.clientes.errorAceptarDescuento);
            }
        }

        function openDetail(idAccion2) {
            hideTabs();
            mostrarTab("detalleSegmentacionesNoRedimidas");

            idAccion = idAccion2;
            loadObtenerLineasMensaje(idAccion, "0");

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

        }

        function openDetailLecturaMensajes(idAccion) {
            hideTabs();
            mostrarTab("detalleLineasMensajeLecturas");

            loadObtenerLineasMensaje(idAccion, "1");
            //            console.log("openDetailLecturaMensajes: " + idAccion);

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);

        }

        function openDetailRedencionesMensajes(idAccion) {
            hideTabs();
            mostrarTab("detalleRedencionesMensajes");

            loadObtenerLineasMensaje(idAccion, "2");

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);
        }

        function openDetailSegmentacionesNoRedimidasInformativas(idAccion2) {
            hideTabs();
            mostrarTab("detalleSegmentacionesNoRedimidasInformativas");

            idAccion = idAccion2;
            loadObtenerLineasMensaje(idAccion, "3");

            $('#back-btn').show();
            setBackName(traducciones.clientes.btnAtras, false);
        }

        function loadNumeroValesPendientes(idCliente) {
            try {
                if (document.domain == "bismanwsdes.sorlidiscau.es") {
                    numeroValesPendientes = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerNumeroSegmentacionesNoLeidas_APP", idCliente, 1, showNumeroValesPendientes);
                    numeroValesLeidos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerNumeroLecturasMensajes_APP", idCliente, 1, showNumeroValesLeidos);
                    numeroValesRedimidos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerNumeroRedencionMensajes_APP", idCliente, 1, showNumeroValesRedimidos);
                    numeroValesPendientesInformativos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/obtenerNumeroSegmentacionesNoLeidas_APP", idCliente, 3, showNumeroValesPendientesInformativos);
                } else {
                    numeroValesPendientes = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerNumeroSegmentacionesNoLeidas_APP", idCliente, 1, showNumeroValesPendientes);
                    numeroValesLeidos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerNumeroLecturasMensajes_APP", idCliente, 1, showNumeroValesLeidos);
                    numeroValesRedimidos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerNumeroRedencionMensajes_APP", idCliente, 1, showNumeroValesRedimidos);
                    numeroValesPendientesInformativos = callWSNumeroValesPendientesLeidosRedimidosInformativos("http://www.sorlidiscau.mobi/supermaduixaws.asmx/obtenerNumeroSegmentacionesNoLeidas_APP", idCliente, 3, showNumeroValesPendientesInformativos);
                }
            } catch (err) {
                ocultarTab("alert");
            }
        }

        function callWSNumeroValesPendientesLeidosRedimidosInformativos(url, idCliente, tipoMensaje, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                headers: { "cache-control": "no-cache" },
                data: "{idCliente: '" + idCliente + "'," + "tipoMensaje: '" + tipoMensaje + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = result.d;
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg) {
                    //alerta("Error: " + msg);
                }
            });
        }

        function showNumeroValesPendientes(json) {
            console.log("showNumeroValesPendientes");
            numeroValesPendientes = json;
            console.log("numeroValesPendientes: " + numeroValesPendientes);
            mostrarOpciones();
        }

        function showNumeroValesLeidos(json) {
            console.log("showNumeroValesLeidos");
            numeroValesLeidos = json;
            console.log("numeroValesLeidos: " + numeroValesLeidos);
            mostrarOpciones();
        }

        function showNumeroValesRedimidos(json) {
            console.log("showNumeroValesRedimidos");
            numeroValesRedimidos = json;
            console.log("numeroValesRedimidos: " + numeroValesRedimidos);
            mostrarOpciones();
        }

        function showNumeroValesPendientesInformativos(json) {
            console.log("showNumeroValesPendientes");
            numeroValesPendientesInformativos = json;
            console.log("numeroValesPendientesInformativos: " + numeroValesPendientesInformativos);
            mostrarOpciones();
        }

        //Inicio carga imagen Accion
        function loadImagenesAccion(idAccion, tipoAccion) {
            //            console.log("loadImagenesAccion: " + idAccion + " tipoAccion: " + tipoAccion);
            if (document.domain == "bismanwsdes.sorlidiscau.es") {
                if (tipoAccion == 0) {
                    imagenesAccionArray = callWSImagenes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenSegmentacionesNoRedimidas);
                } else if (tipoAccion == 1) {
                    imagenesAccionArray = callWSImagenes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenSegmentacionesNoRedimidasInformativas);
                } else if (tipoAccion == 2) {
                    imagenesAccionArray = callWSImagenes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenLineasMensajeLectura);
                } else if (tipoAccion == 3) {
                    imagenesAccionArray = callWSImagenes("http://bismanwsdes.sorlidiscau.es/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenLineasRedenciones);
                }
            } else {
                if (tipoAccion == 0) {
                    imagenesAccionArray = callWSImagenes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenSegmentacionesNoRedimidas);
                } else if (tipoAccion == 1) {
                    imagenesAccionArray = callWSImagenes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenSegmentacionesNoRedimidasInformativas);
                } else if (tipoAccion == 2) {
                    imagenesAccionArray = callWSImagenes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenLineasMensajeLectura);
                } else if (tipoAccion == 3) {
                    imagenesAccionArray = callWSImagenes("http://www.sorlidiscau.mobi/supermaduixaws.asmx/ObtenerImagenAccion_APP", idAccion, showImagenLineasRedenciones);
                }
            }
        }

        //Montamos los tags de imagenes y los ponemos en el DIV correspondiente.
        function showImagenSegmentacionesNoRedimidas(json) {
            try {
                imagenesAccionArray = json;
                console.log("showImagenSegmentacionesNoRedimidas: " + imagenesAccionArray.length);

                if (imagenesAccionArray.length == 1) {
                    imagenAccion = displayImage(imagenesAccionArray[0].IMAGENSTRING);
                    $("#divImagenAccion").show();
                    $("#divImagenAccion").html('<center>' + imagenAccion + '</center>');
                } else {
                    ("#divImagenAccion").hide();
                }
                //                console.log(imagenAccion);
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function showImagenSegmentacionesNoRedimidasInformativas(json) {
            try {
                imagenesAccionArray = json;
                console.log("showImagenSegmentacionesNoRedimidasInformativas: " + imagenesAccionArray.length);

                if (imagenesAccionArray.length == 1) {
                    imagenAccion = displayImage(imagenesAccionArray[0].IMAGENSTRING);
                    $("#divImagenAccionInformativa").show();
                    $("#divImagenAccionInformativa").html('<center>' + imagenAccion + '</center>');
                } else {
                    $("#divImagenAccionInformativa").hide();
                }
                //                console.log(imagenAccion);
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function showImagenLineasMensajeLectura(json) {
            try {
                imagenesAccionArray = json;
                console.log("showImagenLineasMensajeLectura: " + imagenesAccionArray.length);

                if (imagenesAccionArray.length == 1) {
                    imagenAccion = displayImage(imagenesAccionArray[0].IMAGENSTRING);
                    $("#divImagenLecturaMensaje").show();
                    $("#divImagenLecturaMensaje").html('<center>' + imagenAccion + '</center>');
                } else {
                    $("#divImagenLecturaMensaje").hide();
                }
                console.log("showImagenLineasMensajeLectura: " + imagenAccion);
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function showImagenLineasRedenciones(json) {
            try {
                imagenesAccionArray = json;
                console.log("showImagenLineasRedenciones: " + imagenesAccionArray.length);

                if (imagenesAccionArray.length == 1) {
                    imagenAccion = displayImage(imagenesAccionArray[0].IMAGENSTRING);
                    $("#divImagenRedencionesMensaje").show();
                    $("#divImagenRedencionesMensaje").html('<center>' + imagenAccion + '</center>');
                } else {
                    $("#divImagenRedencionesMensaje").hide();
                }
                //                console.log(imagenAccion);
                hideTab("alert");
            } catch (err) {
                hideTab("alert");
            }
        }

        function displayImage(base64Data) {
            imagenAccion = "<div id='ampliar'><img src='" + "data:image/jpg;base64," + base64Data + "' border='0' /></div>";
            return imagenAccion;
        };

        function callWSImagenes(url, idAccion, callback) {
            $.ajax({
                type: "POST",
                url: url,
                //data: "{}",
                data: "{'idAccion': '" + idAccion + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var json = jQuery.parseJSON(result.d);
                    if (callback);
                    {
                        callback(json);
                    }
                    return json;
                },
                error: function (msg, textStatus, errorThrown) {
                    console.error("ERROR: " + msg.responseText);
                    console.error("textStatus : " + textStatus);
                    console.error("errorThrown : " + errorThrown);
                }
            });
        }

    

                        document.write("<br/>");
                        document.write(traducciones.menu.cargando);
                    



(function (cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    function PushNotification() { }

    // Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
    PushNotification.prototype.register = function (successCallback, errorCallback, options) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
    };

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function (successCallback, errorCallback) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };


    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function (successCallback, badge) {
        cordovaRef.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{ badge: badge}]);
    };

    cordova.addConstructor(function () {
        if (!window.plugins)
            window.plugins = {};
        window.plugins.pushNotification = new PushNotification();
    });

})(window.cordova || window.Cordova || window.PhoneGap);

var pushNotification = null;
var registroApp;
var idDispositivoMovil = "";
var sistemaOperativo = 0;
var idCliente = 0;

//Cuando se registra o llega una notificati? de Android
function onNotificationGCM(e) {
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                idCliente = obtenerVariable("idCliente");
                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    idCliente = 0;
                }
                estaRegistrada = obtenerVariable("estaRegistrada");
                if (pagina == "espai_client.html") {
                    estaRegistrada = false;
                }
                if (estaRegistrada == false || estaRegistrada == null || estaRegistrada == "undefined") {
                    console.log("No est?registrada la aplicaci?, la grabamos en nuestra bbdd");
                    loadRegistroMovil(0, e.regid, idCliente);
                } else {
                    console.log("Esta ya registrada, no grabamos nada en nuestra bbdd");
                    document.location.href = "home.html";
                }
            }
            break;

        case 'message':
            if (e.foreground) {
                var my_media = new Media("/android_asset/www/" + e.soundname);
                my_media.play();
            }

            idCliente = obtenerVariable("idCliente");
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                if (pagina != "espai_client.html") {
                    document.location.href = "espai_client.html";
                }
            } else {
                if (pagina != "maduixa.html") {
                    document.location.href = "maduixa.html";
                }
            }
            alert(e.payload.msg);
            break;

        case 'error':
            console.log('GCM error = ' + e.msg);
            break;

        default:
            console.log('An unknown GCM event has occurred');
            break;
    }
}

//Cuando llega una notificaci? de iOS
function onNotificationAPN(event) {
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    if (event.alert) {
        navigator.notification.alert(event.alert);
        idCliente = obtenerVariable("idCliente");
        if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
            if (pagina != "espai_client.html") {
                document.location.href = "espai_client.html";
            }
        } else {
            if (pagina != "maduixa.html") {
                document.location.href = "maduixa.html";
            }
        }
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
    }
}

function loadRegistroMovil(sistemaOperativo, idDispositivoMovil, idCliente) {
    try {
        if (device.platform == 'android' || device.platform == 'Android') {
            sistemaOperativo = 0;
        } else {
            sistemaOperativo = 1;
        }
    } catch (err) {
        console.error("device.platform: " + err);
    }
    try {
        if (document.domain == "bismanwsdes.sorlidiscau.es") {
            registroApp = callWSRegistroMovil("http://bismanwsdes.sorlidiscau.es/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovil);
        } else {
            registroApp = callWSRegistroMovil("http://www.sorlidiscau.mobi/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovil);
        }
    } catch (err) {
        console.error("loadRegistroMovil: " + err);
    }
}

function callWSRegistroMovil(url, sistemaOperativo, idDispositivoMovil, idCliente, callback) {
    $.ajax({
        type: "POST",
        url: url,
        headers: { "cache-control": "no-cache" },
        //data: "{}",
        data: "{sistemaOperativo: '" + sistemaOperativo + "'," + "idDispositivoMovil: '" + idDispositivoMovil + "'," + "idCliente: '" + idCliente + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result.d);
            if (callback);
            {
                callback(json);
            }
            return json;
        },
        error: function (msg, textStatus, errorThrown) {
            console.log("callWSRegistroMovil ERROR: " + msg.responseText);
            console.log("callWSRegistroMovil textStatus: " + textStatus);
            console.log("callWSRegistroMovil errorThrown: " + errorThrown);
        }
    });
}

function showRegistroMovil(json) {
    registroApp = json;
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    if (registroApp == "1") {
        estaRegistrada = true;
        grabarVariable("estaRegistrada", true);
        console.log("showRegistroMovil OK");
    } else {
        estaRegistrada = false;
        grabarVariable("estaRegistrada", false);
        console.log("showRegistroMovil FALLO");
    }
    if (pagina != "espai_client.html") {
        document.location.href = "home.html";
    }
}

function obtenerVariable(nombre) {
    var resultado = "";

    if (localStorageOCookie() == 0) {
        //Si tiene localStorage
        resultado = localStorage.getItem(nombre);
    } else if (localStorageOCookie() == 1) {
        //Si tiene Cookies
        resultado = getCookie(nombre);
    }

    return resultado;
}

function grabarVariable(nombre, valor) {
    if (localStorageOCookie() == 0) {
        //Si tiene localStorage
        localStorage.setItem(nombre, valor);
    } else if (localStorageOCookie() == 1) {
        //Si tiene Cookies
        setCookie(nombre, valor, 365);
    }
}

function successHandler(result) {
    console.log("successHandler PushNotification: " + result);
}






(function (cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

    function PushNotification() { }

    // Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
    PushNotification.prototype.register = function (successCallback, errorCallback, options) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
    };

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function (successCallback, errorCallback) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };


    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function (successCallback, badge) {
        cordovaRef.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{ badge: badge}]);
    };

    cordova.addConstructor(function () {
        if (!window.plugins)
            window.plugins = {};
        window.plugins.pushNotification = new PushNotification();
    });

})(window.cordova || window.Cordova || window.PhoneGap);

var pushNotification = null;
var registroApp;
var idDispositivoMovil = "";
var sistemaOperativo = 0;
var idCliente = 0;

//Cuando se registra o llega una notificati? de Android
function onNotificationGCM(e) {
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    var textoPaginaDestino;
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                idCliente = obtenerVariable("idCliente");
                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    idCliente = 0;
                }
                estaRegistrada = obtenerVariable("estaRegistrada");
                if (pagina == "espai_client.html") {
                    estaRegistrada = false;
                }
                if (estaRegistrada == false || estaRegistrada == null || estaRegistrada == "undefined") {
                    console.log("No est?registrada la aplicaci?, la grabamos en nuestra bbdd");
                    loadRegistroMovil(0, e.regid, idCliente);
                } else {
                    console.log("Esta ya registrada, no grabamos nada en nuestra bbdd");
                    document.location.href = "home.html";
                }
            }
            break;

        case 'message':
            if (e.foreground) {
                var my_media = new Media("/android_asset/www/" + e.soundname);
                my_media.play();
            }
            textoPaginaDestino = e.msg;
            idCliente = obtenerVariable("idCliente");

            //Se comenta el alert, para que no muestre el mensaje en pantalla.
            //alert(e.payload.msg);

            var n = textoPaginaDestino.indexOf("(");
            var n2 = textoPaginaDestino.indexOf(")");

            var index = textoPaginaDestino.substr(n + 1, 1);
            var idAccionidTicket = textoPaginaDestino.substr(n + 2, (n2 - n - 2));

            if (index == 'A' || index == 'a') {  //Es una Accion
                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    document.location.href = "espai_client.html";
                } else {
                    document.location.href = "maduixa.html?idAccionidTicket=" + idAccionidTicket;
                }
            } else if (index == 'T' || index == 't') {  //Es un Ticket
                if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                    document.location.href = "espai_client.html";
                } else {
                    document.location.href = "miscompras.html?idAccionidTicket=" + idAccionidTicket;
                }
            }

            break;

        case 'error':
            console.log('GCM error = ' + e.msg);
            break;

        default:
            console.log('An unknown GCM event has occurred');
            break;
    }
}

//Cuando llega una notificaci? de iOS
function onNotificationAPN(event) {
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    if (event.alert) {
        //Se comenta el alert, para que no muestre el mensaje en pantalla.
        //navigator.notification.alert(event.alert);

        textoPaginaDestino = event.alert;
        idCliente = obtenerVariable("idCliente");


        var n = textoPaginaDestino.indexOf("(");
        var n2 = textoPaginaDestino.indexOf(")");

        var index = textoPaginaDestino.substr(n + 1, 1);
        var idAccionidTicket = textoPaginaDestino.substr(n + 2, (n2 - n - 2));

        if (index == 'A' || index == 'a') {  //Es una Accion
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                document.location.href = "espai_client.html";
            } else {
                document.location.href = "maduixa.html?idAccionidTicket=" + idAccionidTicket;
            }
        } else if (index == 'T' || index == 't') {  //Es un Ticket
            if (idCliente == 0 || idCliente == null || idCliente == 'undefined') {
                document.location.href = "espai_client.html";
            } else {
                document.location.href = "miscompras.html?idAccionidTicket=" + idAccionidTicket;
            }
        }
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
    }

}

function loadRegistroMovil(sistemaOperativo, idDispositivoMovil, idCliente) {
    try {
        if (device.platform == 'android' || device.platform == 'Android') {
            sistemaOperativo = 0;
        } else {
            sistemaOperativo = 1;
        }
    } catch (err) {
        console.error("device.platform: " + err);
    }
    try {
        if (document.domain == "bismanwsdes.sorlidiscau.es") {
            registroApp = callWSRegistroMovil("http://bismanwsdes.sorlidiscau.es/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovil);
        } else {
            registroApp = callWSRegistroMovil("http://www.sorlidiscau.mobi/BismanWS.asmx/Registrar_APP", sistemaOperativo, idDispositivoMovil, idCliente, showRegistroMovil);
        }
    } catch (err) {
        console.error("loadRegistroMovil: " + err);
    }
}

function callWSRegistroMovil(url, sistemaOperativo, idDispositivoMovil, idCliente, callback) {
    $.ajax({
        type: "POST",
        url: url,
        headers: { "cache-control": "no-cache" },
        //data: "{}",
        data: "{sistemaOperativo: '" + sistemaOperativo + "'," + "idDispositivoMovil: '" + idDispositivoMovil + "'," + "idCliente: '" + idCliente + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result.d);
            if (callback);
            {
                callback(json);
            }
            return json;
        },
        error: function (msg, textStatus, errorThrown) {
            console.log("callWSRegistroMovil ERROR: " + msg.responseText);
            console.log("callWSRegistroMovil textStatus: " + textStatus);
            console.log("callWSRegistroMovil errorThrown: " + errorThrown);
        }
    });
}

function showRegistroMovil(json) {
    registroApp = json;
    var pagina = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1, window.location.pathname.length);
    if (registroApp == "1") {
        estaRegistrada = true;
        grabarVariable("estaRegistrada", true);
        console.log("showRegistroMovil OK");
    } else {
        estaRegistrada = false;
        grabarVariable("estaRegistrada", false);
        console.log("showRegistroMovil FALLO");
    }
    if (pagina != "espai_client.html") {
        document.location.href = "home.html";
    }
}

function obtenerVariable(nombre) {
    var resultado = "";

    if (localStorageOCookie() == 0) {
        //Si tiene localStorage
        resultado = localStorage.getItem(nombre);
    } else if (localStorageOCookie() == 1) {
        //Si tiene Cookies
        resultado = getCookie(nombre);
    }

    return resultado;
}

function grabarVariable(nombre, valor) {
    if (localStorageOCookie() == 0) {
        //Si tiene localStorage
        localStorage.setItem(nombre, valor);
    } else if (localStorageOCookie() == 1) {
        //Si tiene Cookies
        setCookie(nombre, valor, 365);
    }
}

function successHandler(result) {
    console.log("successHandler PushNotification: " + result);
}

