

    $(document).ready(function () {
        CargaFichaEmpresa();
    });

	




//    $(document).ready(function () {
//        GetObjGlobales().cargaIdioma();
//    });

    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Ajustes', '', 0);
        GetObjGlobales().cargaIdioma();

        //mensaje que mostrar√° cuando quiera actualizar
        //$('#dialog-confirm').html('<p>' + GetObjGlobales().DameTraduccion(17) + GetObjGlobales().tamFicherosDescargar + ' Mb.</p>');

        if (GetObjGlobales().EsSpanish()) {
            $('#btnActualizar').attr('value', 'Actualizar');
            $('#dialog-confirm').attr('title', 'Actualizacion');
            $('#dialog-confirm').html('<p>' + _interr + 'Esta seguro que quiere actualizar? A continuaci' + _o + 'n se van a descargar ' + GetObjGlobales().tamFicherosDescargar + ' Mb.</p>');
            GetObjGlobales().titulaCabecera('Ajustes');
        } else {
            $('#btnActualizar').attr('value', 'Update');
            $('#dialog-confirm').attr('title', 'Update');
            $('#dialog-confirm').html('<p>Are you sure you want to update? You are about to download ' + GetObjGlobales().tamFicherosDescargar + ' Mb. </p>');
            GetObjGlobales().titulaCabecera('Settings');
        }

        $('#btnActualizar').click(function () {
            setTimeout('llamaActualizar();', 200);
        });

        //esta variable s√≥lo se setea si Offline = S
        if (GetObjGlobales().ActualizacionPendiente) {
            $('#contenedorActualizaciones').show();
        } else {
            $('#contenedorActualizaciones').hide();
        }

        $('#ddIdioma').val(GetObjGlobales().idioma);
        $('#ddIdioma').change(function () {
            GetObjGlobales().cambiaIdioma($('#ddIdioma').val());
            if (GetObjGlobales().EsSpanish()) {
                GetObjGlobales().titulaCabecera('Ajustes');
                $('#btnActualizar').attr('value', 'Actualizar');
                $('#dialog-confirm').html('<p>' + _interr + 'Desea continuar con la actualizaci'+_o+'?. Se van a descargar ' + GetObjGlobales().tamFicherosDescargar + ' Mb.</p>');
            }
            else {
                GetObjGlobales().titulaCabecera('Options');
                $('#btnActualizar').attr('value', 'Update');
                $('#dialog-confirm').html('<p>Do you want to continue with the update? ' + GetObjGlobales().tamFicherosDescargar + ' Mb will be downloaded. </p>');
            }
        }
        );
        //cargaGalerias('galeriasCompleto.xml');
        setTimeout("elScroll('wrapperMas');myScroll.refresh();", 600);
    });

//    function iniciarActualizacion() {
//        $('#CapaProgressBar').show();
//        $('#progressBar').inicializarProgressBar();
//    }

    function llamaActualizar() {
        if (GetObjGlobales().modoConexion.toUpperCase() == 'WIFI') {
            iniciarActualizacion();
        }
        else { //es 3G u otras
            if (GetObjGlobales().EsSpanish()) {
     			$('#dialog-confirm').html('<p>' + _msgInfo + 'Existe una nueva actualizaci'+_o+'n del Cat√°logo. El tama' + _ene +
                'o aproximado de descarga es de ' + GetObjGlobales().tamFicherosDescargar + ' Mb. ≈ºDesea actualizar la aplicaci'+_o+'n?.</p>'); 
     			MsgSiNo('Actualizaci' + _o + 'n disponible', iniciarActualizacion, null);
            } else {
        $('#dialog-confirm').html('<p>' + _msgInfo + 'There is a new update to the Catalogue. The approximate size of the download is ' + GetObjGlobales().tamFicherosDescargar + '  Mb. Do you want to update the application?</p>'); 
             	 MsgSiNo('Availabe update', iniciarActualizacion, null);
            }
        }
    }
    




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Horarios Restaurantes', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Horarios restaurantes y cafeter√≠as'); } else { GetObjGlobales().titulaCabecera('Horarios restaurantes y cafeter√≠as'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'restaurantes.html', 'restaurantes_en.html', $('#conteen'));
        setTimeout("elScroll('wrapperRestaurantes');", 300);
        });

    



    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Acerca de', '', 0);
        GetObjGlobales().cargaIdioma();
        GetObjGlobales().cargaMenusPrincipales();
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('M‡∏£‡∏Ås'); } else { GetObjGlobales().titulaCabecera('More'); }
/*        if (actualizacionesPendientes > 0) {
            $('.actualizacion').show();
        } else {
            $('.actualizacion').hide();
        }        //cargaGalerias('galeriasCompleto.xml');*/
        setTimeout("elScroll('wrapperMas');myScroll.refresh();", 300);

        //cambiar el icono de actualizar
        if (GetObjGlobales().ActualizacionPendiente)
            $("#menuajustes").css('background-image', 'url(img/Notif2.png)');
    });



    var map;
    var geocoder;
    var mapaMadrid;
    var markerInicial;
    var miMarker;
    var directionsService = null;
    var directionDisplay;

    function alertDismissedSinRed() { navegacion.pop(); var cadena = navegacion.pop(); if (cadena.indexOf('?') > 0) { cadena += '&go=back' } else { cadena += '?go=back' } navega(cadena); return true; };

    function detectBrowser() {
        var useragent = navigator.userAgent;
        var mapdiv = document.getElementById("map_canvas");
        $('#map_canvas').height($('#wrapperGoogleMap').height());
    }
    function inicializar() {  
    	directionsService = new google.maps.DirectionsService()
        directionsDisplay = new google.maps.DirectionsRenderer();
        detectBrowser();
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(40.46447, -3.61637);
        latlonginicial = latlng;

        var myOptions = {
            zoom: 18,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        
    }
    
    function localizarme(modo) {
        // Try W3C Geolocation (Preferred)     
        if (navigator.geolocation) {      
            browserSupportFlag = true;           
            navigator.geolocation.getCurrentPosition(function (position) {          
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);               
                miMarker = initialLocation;                
                calcularRuta(modo);                
            }, function () {
                handleNoGeolocation(browserSupportFlag);
            });
            // Try Google Gears Geolocation
        } else if (google.gears) {
            browserSupportFlag = true;
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(function (position) {
                initialLocation = new google.maps.LatLng(position.latitude, position.longitude);
                miMarker = initialLocation;
                calcularRuta(modo)
            }, function () {
                handleNoGeoLocation(browserSupportFlag);
            });
            // Browser doesn't support Geolocation
        } else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }
    }
    function calcularRuta(modo) {   
        var varTravelMode;
        var request = {
            origin: miMarker,
            destination: latlonginicial,
            travelMode: (modo == 'coche') ? google.maps.DirectionsTravelMode.DRIVING : google.maps.DirectionsTravelMode.WALKING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });        
    }
    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('Ocurri\u00f3 un problema conectando con el servidor. Pruebe de nuevo en unos minutos.', alertDismissedSinRed, 'Feria de Madrid', 'Aceptar'); } else { navigator.notification.alert('There was a problem connecting with the server. Try again in a few minutes.', alertDismissedSinRed, 'Feria de Madrid', 'Ok'); }
            initialLocation = latlonginicial;
        } else {
            if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('Ocurri\u00f3 un problema conectando con el servidor. Pruebe de nuevo en unos minutos.', alertDismissedSinRed, 'Feria de Madrid', 'Aceptar'); } else { navigator.notification.alert('There was a problem connecting with the server. Try again in a few minutes.', alertDismissedSinRed, 'Feria de Madrid', 'Ok'); }
            initialLocation = latlonginicial;
        }
        miMarker = initialLocation;
    }

    function cargarGoogleMaps() { 
        inicializar();
        localizarme('coche');
        $('#capaCargador').fadeOut();
    }
    
    $(document).ready(function () {
        if (online()) {
         	cargarScript('http://maps.google.com/maps/api/js?sensor=false&language=es&callback=cargarGoogleMaps'); 
        } else {
            if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('Necesita conexi\u00f3n a Internet para esta caracter\u00edstica.', alertDismissedSinRed, 'Feria de Madrid', 'Aceptar'); }
            else {
                navigator.notification.alert('You need internet connection to use this feature.', alertDismissedSinRed, 'Feria de Madrid', 'Ok');
            }
        }

        // setTimeout("elScroll('wrapperGoogleMap');", 200);
    });




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Informacion', '', 0);
        GetObjGlobales().cargaIdioma();
        GetObjGlobales().cargaMenusPrincipales();
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Informacion'); } else { GetObjGlobales().titulaCabecera('Information'); }
        setTimeout("elScroll('wrapperInformacion');", 300);

    });



    $(document).ready(function () {
        CargaFichaEmpresaR();
    });





    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Social', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Social'); } else { GetObjGlobales().titulaCabecera('Social'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'social.html', 'social_en.html', $('#conteen'));
        setTimeout("elScroll('wrapperSocial');", 300);
    });





    function OcultaLocalizadorStand() {
        $("#stand-in-map").hide();
    }  
     
//    $(window).resize(function () {
//        if ((myscrollpabellon != null) && (gstand != '')) {
//            PintarLocalizadorStand(gstand)
//        }
//    });

//    $("#mappab").resize(function () {
//        if ((myscrollpabellon != null) && (gstand != '')) {
//            PintarLocalizadorStand(gstand)
//        }
//    });

    $("#mappab").click(function (e) {
        //alert("Punto (X,Y) " + e.pageX + ', ' + e.pageY);
        GetPlano(e.pageX, e.pageY)
    });

    $(document).ready(function () {
        contador = 1;
        GetObjGlobales().cargaIdioma();
        PoneTituloPabellon();
        $('.scrollToSelected1').bind('click', function () {
            setTimeout(function () { ZoomerPabellon() }, 3);
            setTimeout(function () { PintarLocalizadorStand(gstand) }, 100);
        });
        $('.scrollToSelected2').bind('click', function () {
            setTimeout(function () { NoZoomerPabellon() }, 3);
            setTimeout(function () { PintarLocalizadorStand(gstand) }, 100);
        });
        zom = 1;
        var prefijo = getParameterByName('p');
        gstand = getParameterByName('s');
        if (gstand != "" && gstand != null && gstand != "undefined") {
            addeventoanalitics(GetObjGlobales().feria, 'Mapa Pabellon', prefijo + " Stand: " + gstand, 0);
        }
        else {
            addeventoanalitics(GetObjGlobales().feria, 'Mapa Pabellon', prefijo, 0);
        }
        if (prefijo != "" && prefijo != null && prefijo != "undefined") {


            InicializaCoordenadasDGNPabellon(prefijo);


            $('#MapaStands').attr("src", GetObjGlobales().getRutaFichero("I", prefijo + '.PNG'));

            //alert($('#MapaStands').attr("src"));

            //            $('[cel="celda"]').each(function () {
            //                var celda = $(this);
            //                var lsrc = rutarecurso + 'Feria=' + feria + '&Tipo=I&Fichero=' + prefijo + celda.attr("name");
            //                celda.attr("src", lsrc);
            //                celda.attr("onload", "imagencargada()");
            //            });
        }


    });




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Ayuda', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Ayuda'); } else { GetObjGlobales().titulaCabecera('Help'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'ayuda.html', 'ayuda_en.html', $('#conteen'));
        setTimeout("elScroll('wrapperMasAyuda');", 300);
    });





    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Favoritos', '', 0);
        GetObjGlobales().cargaIdioma();
        GetObjGlobales().cargaMenusPrincipales();
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Favoritos'); } else { GetObjGlobales().titulaCabecera('Favorites'); }
        var cadena = '';
        if (window.openDatabase) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT id,id_objeto,tipo_objeto, favorito, titulo, fecha FROM favoritos where favorito=1 and tipo_objeto=2 and feria=? ORDER BY fecha desc', [GetObjGlobales().feria], function (tx, results) {
                    if (results.rows && results.rows.length) {
                        //alert(results.rows.item(0).texto);
                        for (i = 0; i < results.rows.length; i++) {
                            cadena += '<li href="ajax_ficha.html?i=' + results.rows.item(i).id_objeto + '" rel="enlace">' + cortaPalabras(results.rows.item(i).titulo, 25) + '</li>';
                        }
                        $(".listaFlechas").html(cadena);
                        $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
                    } else {
                        if (GetObjGlobales().EsSpanish()) { $(".noFav").html('<p>Podr&aacute; agregar empresas a sus favoritos activando el icono de la estrella que aparece en las fichas. Para eliminarlos simplemente vuelva a pulsar sobre la estrella.</p>'); } else { $(".noFav").html('<p>You will be able to add companies to your favourites by activating the star icon that appears in the files. To delete them just click on the star again.</p>'); }
                    }
                }, function (tx) {
                });
            });
        }
        setTimeout("elScroll('wrapperFavoritos');myScroll.refresh();", 300);

    });




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Legal', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('CrƒÇ≈†ditos y Legal'); } else { GetObjGlobales().titulaCabecera('About'); }

        cargaFicheroHTML(GetObjGlobales().feria, 'mascreditos.html', 'mascreditos_en.html', $('#conteen'));
        setTimeout("elScroll('wrapperMasCreditos');", 300); 
        $('img').load(function () { myScroll.refresh(); })
    });





	//$(document).bind('pageinit', function() {
    $(document).ready(function () {
        $('#logotipo').append('<img src="' + GetObjGlobales().getRutaFichero("R", "cabecera_feria.jpg") + '" alt="Logotipo" onload="LoadCabeceraFeria()" border="0" class="log"/>');
 		//$('#logotipo').append('<img src="file:///android_asset/www/datos/ferias/RS13/recurso/cabecera_feria1.jpg" alt="Logotipo" onload="LoadCabeceraFeria()" border="0" class="log"/>');       
        GetObjGlobales().cargaIdioma();
        GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaNormal, "", "");
        elScroll('wrapperFeria');
        //cambiar el icono de actualizar
        mostrarActualizacionPendiente();
    });




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Informaci√≥n de feria', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Info IFEMA'); } else { GetObjGlobales().titulaCabecera('Info IFEMA'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'infoifema.html', 'infoifema_en.html', $('#conteen'));
        setTimeout("elScroll('wrapperInfovisita');", 300);
    });





    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Como llegar', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Como llegar'); } else { GetObjGlobales().titulaCabecera('How to get there'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'comollegar.html', 'comollegar_en.html', $('#contencomollegar'));
        setTimeout("elScroll('wrapperComollegar');", 300);

        
    });



//    $(window).resize(function () {
//        if ((myScrollRecinto != null) && (STAND_Recinto != '')) {
//            zomRecinto = myScrollRecinto.scale;
//            setTimeout(PintarLocalizadorPlano(STAND_Recinto),5);
//        }
//    });

    function OcultaLocalizadorRecinto() {
        $("#stand-in-map-recinto").hide();
    }

    $(document).ready(function () {
        GetObjGlobales().cargaIdioma();
        zomRecinto = 1;
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Mapas'); } else { GetObjGlobales().titulaCabecera('Maps'); }

        var STAND = getParameterByName('S');

        $("#map").click(function (e) {
            GetPlanoRecinto(e.pageX, e.pageY)
        });

        $('.scrollToSelected1-recinto').bind('click', function () {
            setTimeout(function () { ZoomerRecinto() }, 3);
        });
        $('.scrollToSelected2-recinto').bind('click', function () {
            setTimeout(function () { NoZoomerRecinto() }, 3);
        });
//        if (GetObjGlobales().EsRecintoPersonalizado())
//            $('#MapaPabellones').attr("src", GetObjGlobales().rutarecurso + 'Feria=' + GetObjGlobales().feria + '&Tipo=R&Fichero=' + NombreImagen);
//        else
//            $('#MapaPabellones').attr("src", GetObjGlobales().rutarecurso + 'Feria=' + GetObjGlobales().feria + '&Tipo=I&Fichero=' + NombreImagen);

        if (GetObjGlobales().EsRecintoPersonalizado())
            $('#MapaPabellones').attr("src", GetObjGlobales().getRutaFichero("R", NombreImagen));
        else
            $('#MapaPabellones').attr("src", GetObjGlobales().getRutaFichero("I", NombreImagen));

        if (STAND != null && STAND != "undefined" && STAND != "") {
            STAND_Recinto = STAND;
            addeventoanalitics(GetObjGlobales().feria, 'Mapa General', "Stand: "+STAND, 0);
        }
        else {
            STAND_Recinto = '';
            addeventoanalitics(GetObjGlobales().feria, 'Mapa General', 'Sin Stand', 0);
        }
    });





















    inicializaestadisticas();
    function onDeviceReady() {
    	GetObjGlobales().inicializaglobales_offline();//ddc a veces salta ante el deviceready que el load.me ha pasado en el emulador
    	if (GetObjGlobales().offline == "S") {
       		 // Se registra el evento de phongegap de bot√É¬≥n back        		 
       	     document.addEventListener("backbutton", onBackKeyDown, false);      		 
       		 // Comienza el flujo de la aplicaci√É¬≥n
       		 inicializarPlugins();     		 
   	    	 obtenerModoConexion(); 	    	 
             window.rutaActual([], setRutaActualOk, setRutaActualError);            
       }    
    }
    
    function onBackKeyDown() {
    	if (window.location.toString().indexOf('#ajax_feria.html') != -1) {	
    		// Si se pulsa el bot√É¬≥n atr√É¬°s cuando estamos en el men√É¬∫ principal, salimos de la aplicaci√É¬≥n
    		if (GetObjGlobales().EsSpanish()) {
    			$('#dialog-confirm').html('<p>' + _msgInfo + _interr + 'Desea salir de la aplicaci' + _o + 'n?</p>'); 
    			MsgSiNo('Salir', cerrarApp, null);
             } else {
                $('#dialog-confirm').html('<p>' + _msgInfo + 'Do you want to quit the application?</p>'); 
            	MsgSiNo('Exit', cerrarApp, null);
             }
    	} else {
    		navigator.app.backHistory();
    	}
    }

    // Se registra el evento de phongegap de dispositivo preparado
    if (document.addEventListener) {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    $(window).load(function () {
        if (!EsCompatibleNavegador()) {
            $('#splash').css('background-image', 'url(img/navegadorold.jpg)');
            $('#splash').show();
        }
        else {
            //addeventoanalitics('Navegacion', 'Pagina Principal', '', 0);
  	    	
            GetObjGlobales().inicializaglobales_offline();
        	if (GetObjGlobales().offline != "S"){
        		GetObjGlobales().incializaglobales();
                mostrarSplash();        		
		 		cargaInicial();
	        }else
	        {
                mostrarSplash();	        	
	        }
            $('#btnActualizarProgress').click(function () {
                GetObjGlobales().ActualizacionPendiente = false;
                mostrarActualizacionPendiente();
                $('#CapaProgressBar').hide();
                //CargasGenerales();
                window.location = '#ajax_feria.html';
                window.location.reload();
            });          
        }
    });

    
    function cargaInicial() {
         CargasGenerales();
	     $('#capaCargador').height($(window).height());
	     $('#capaCargador').show();
	     $('#header').hide();
	     $('.btnHeader').hide();
	     $('.btnHeader').click(function () {
	         navegacion.pop();
	         var cadena = navegacion.pop();
	         if (cadena.indexOf('?') > 0) {
	        	 cadena += '&go=back'
	         }
	         else {
	             cadena += '?go=back'
	         }
	         navega(cadena);
	     });

	     $('#imgcasa').click(function () {
	         location.hash = '#ajax_feria.html';
	     });

	     window.onhashchange = locationHashChanged;

	     if (location.hash == '') {
	         location.hash = '#ajax_feria.html';
	     }
	     else {
	         locationHashChanged();
	     };

	     setTimeout(function () { $('#splash').fadeOut(300); $('#contenedor_paginas').show(); }, 1000);
	     //para progress bar
	     $('#logotipox').html('<img src="' + GetObjGlobales().getRutaFichero("R", "cabecera_feria.jpg") + '" alt="Logotipo" border="0" class="log"/>');
    }
    
    function mostrarSplash() {
        $('#splash').css('background-image', 'url(' + GetObjGlobales().getRutaFichero("R", "splash2.jpg") + ')');
//         CargasGenerales();         
    }
    
    



    GetObjGlobales().titulaCabecera(GetObjGlobales().DameTraduccion(11)); //texto expositores
    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'Expositores', '', 0);
        var btnbuscar = $('#txtBuscar');
        GetObjListaEmpresas().btnBuscar = btnbuscar;
        var borrartxt = $('.borrarTxt');
        GetObjListaEmpresas().borrartxt = borrartxt;
        var listaempresas = document.getElementById('ListaEmpresas');
        borrartxt.hide();
        GetObjGlobales().cargaIdioma();
        CrearScrollEmpresas();
        $('.scrollToSelected1').bind('click', function () {
            GetObjListaEmpresas().ListaPintada = "";
            GetObjListaEmpresas().ultimaletra = "";
            listaempresas.innerHTML = "";
            GetObjListaEmpresas().ListarEmpresas(listaempresas);
        });
        $('.scrollToSelected').bind('click', function () {
            borrartxt.show();
            var view = $(this).attr('id');
            if (view != 'imgBuscar') {
                var list = view.split('-');
                var elem = $("#" + list[1]);
                GetObjListaEmpresas().NumPagina = 1;
                GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaEmpiezaPor, "", list[1]);
                listaempresas.innerHTML = "";
                BuscarSiguientesConFadeOut();
                GetObjListaEmpresas().CambiaIdiomaBuscar();
            }
        });
        $('.cerrar').click(function () {
            borrartxt.hide();
            GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaNormal, "", "");
            BuscarSiguientesConFadeOut();
            GetObjListaEmpresas().CambiaIdiomaBuscar();
        })

        btnbuscar.click(function () {
            if (btnbuscar.val() == 'Buscar' || btnbuscar.val() == 'Search') {
                btnbuscar.val('');
            }
        });

        borrartxt.click(function () {
            GetObjListaEmpresas().CambiaIdiomaBuscar();
            borrartxt.hide();
            listaempresas.innerHTML = "";
            GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaNormal, "", "");
            BuscarSiguientesConFadeOut();
        });

        btnbuscar.keyup(function (e) {
            borrartxt.show();
            if (e.keyCode == 13) {
                GetObjListaEmpresas().NumPagina = 1
                listaempresas.innerHTML = "";
                $('#btnSubmit').focus();
                if (btnbuscar.val() == '') {
                    borrartxt.hide();
                    GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaNormal, "", "");
                    $('#capaCargador').fadeIn(300,
                        function () {
                            BuscarSiguientesConFadeOut();
                        }
                        );
                    GetObjListaEmpresas().CambiaIdiomaBuscar();
                }
                else {
                    var ltxtbuscar = btnbuscar.val();
                    GetObjListaEmpresas().InicializaBusqueda("", _tBusquedaContiene, "", ltxtbuscar);
                    $('#capaCargador').fadeIn(300,
                        function () {
                            BuscarSiguientesConFadeOut();
                        }
                        );
                }
            }
        });
        GetObjListaEmpresas().ListarEmpresas(listaempresas);
        GetObjGlobales().InicializarHeader();
        $('#capaCargador').fadeOut();
    });







    $(document).ready(function () {
        InicializarActividadesDeLaAgenda();
    });

    




    $(document).ready(function () {
        addeventoanalitics(GetObjGlobales().feria, 'IFEMA plus', '', 0);
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('IFEMA Plus'); } else { GetObjGlobales().titulaCabecera('IFEMA Plus'); }
        cargaFicheroHTML(GetObjGlobales().feria, 'ifemaplus.html', 'ifemaplus_en.html', $('#conteen'));
        $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
        setTimeout("elScroll('wrapperIfemaplus');", 300);
    });


Ôªøfunction CargaFichaEmpresaR() {
    GetObjGlobales().cargaIdioma();
    GetObjGlobales().InicializarHeader();
    var objfichaR = new ObjFichaEmpresaR();
    objfichaR.id = getParameterByName('i');
    objfichaR.feria = GetObjGlobales().feria;
    objfichaR.rutaficha = GetObjGlobales().rutaficha;
    objfichaR.rutarecurso = GetObjGlobales().rutarecurso;
    objfichaR.CargarFichaEmpresaR();
    setTimeout("elScroll('wrapperGaleria');", 1000);
}


function ObjFichaEmpresaR() { };
ObjFichaEmpresaR.prototype = {
    id: 0,
    feria: '',
    rutaficha: '',
    rutarecurso: '',
    CargarFichaEmpresaR: function () {
        $('#btnCierraAmpliar').click(function () {
            $('#contenedorAmpliar').hide();
            $('#contenedor_paginas').addClass('contenedorDown');
            $('#contenedor_paginas').removeClass('contenedorUp');
        });
        this.CargaSeccionesR();
    },
    CargaSeccionesR: function () {
        var localobj = this;
        if (GetObjGlobales().EsOffline()) {
            localobj.CargaDetallesR(GetObjFichaEmpresas().GetFichaEmpresaById(this.id));
        } else {
            $.ajax({
                type: "GET",
                url: this.rutaficha + 'Feria=' + this.feria + '&Codigo=' + this.id,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (response) {
                    var Empresa = eval(response.d);
                    localobj.CargaDetallesR(Empresa);
                },
                error: errorAjax
            });                                              //ajax       
        }
    },
    CargaDetallesR: function (pEmpresa) {
        this.CargarCabeceraR(pEmpresa);
        this.CargarPaisesRepresentadosR(pEmpresa);
        this.CargaEmpresasRepresentadasR(pEmpresa);
        $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
        //myScroll.refresh();
    },
    CargarCabeceraR: function (pEmpresa) {
        GetObjGlobales().titulaCabecera(pEmpresa.no);
        $('#nombrer').text(pEmpresa.no);
        addeventoanalitics(GetObjGlobales().feria, 'Ficha empresa R', pEmpresa.no, 0);
        //Ver como hacer el tema de los idiomas
        var tipoexp = pEmpresa.te;
        $('#tipoexpr').text(GetObjGlobales().DameTraduccion(GetObjGlobales().DameIdTipoExp(tipoexp)));
    },
    CargarPaisesRepresentadosR: function (pEmpresa) {
        var tienePaisRep = false;
        if (pEmpresa.lprs != null) {
            tienePaisRep = true;
            var divsect = $('#PaisesRepresentadosr');
            for (var i = 0; i < pEmpresa.lprs.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    divsect.append('<span class="titDatos">' + pEmpresa.lprs[i].v + '</span>');
                else
                    divsect.append('<span class="titDatos">' + pEmpresa.lprs[i].vi + '</span>');
            };
        }
        if (tienePaisRep) { $('#contenedorPaisesRepresentadosr').show(); }
    },
    CargaEmpresasRepresentadasR: function (pEmpresa) {
        var tieneRepres = false;
        if (pEmpresa.ltrs != null) {
            var divrepres = $('#representadasr');
            tieneRepres = true;
            for (i = 0; i < pEmpresa.ltrs.length; i++) {
                divrepres.append('<li class="concepto" rel="enlace" href="ajax_ficha.html?i=' +
				    pEmpresa.ltrs[i].id + '">' + cortaPalabrasListaEmpresas(pEmpresa.ltrs[i].v, 0) + '</li>');
            }
        }
        if (tieneRepres) { $('#contendorEmpresasRepresentadasr').show(); }
    }
}

//DDC no veo muy claro esto hay que revisarlo
function errorAjax(result) {
    alert('ERROR ' + result.status + ' ' + result.statusText);
}



// ****************************************** PARTE OFFLINE ******************************************* 
// ****************************************************************************************************



function inicializarPlugins() {
	window.rutaActual = function (parametros, setRutaActualOk, setRutaActualError) {   
        cordova.exec(setRutaActualOk, setRutaActualError, "RutaPlugin", "execute", parametros);
	};  
	window.comprobarActualizacion = function (parametros, setActualizacionPendienteOk, setActualizacionPendienteError) {
        cordova.exec(setActualizacionPendienteOk, setActualizacionPendienteError, "ComprobarActualizacionPlugin", "execute", parametros);
    };      	    
    window.obtenerTotalFicherosDescargar = function (parametros, setTotalFicherosDescargarOk, setTotalFicherosDescargarError) {
        cordova.exec(setTotalFicherosDescargarOk, setTotalFicherosDescargarError, "TotalFicherosDescargarPlugin", "execute", parametros);
    };   
    window.actualizar = function (parametros, setFicherosDescargadosOk, setFicherosDescargadosError) {
        cordova.exec(setFicherosDescargadosOk, setFicherosDescargadosError, "ActualizarPlugin", "execute", parametros);
    };   
    
}


function setRutaActualOk(rutaApp) {
	GetObjGlobales().rutaroot = rutaApp;
    GetObjGlobales().incializaglobales();   	
    //mostrarSplash();    	    	          
    
	// Se comprueba si el usuario tiene conexiÛn a internet
	if (GetObjGlobales().modoConexion != 'Conexion desconocida' && GetObjGlobales().modoConexion != 'Sin conexion') {
			// Se muestra el splash y contin˙a la ejecuciÛn
	 		cargaInicial();
			// Una vez obtenida la ruta y comprobado que el usuario tiene conexiÛn a internet, se comprueba si hay actualizaciones pendientes
			//window.plugins.interfazCatalogoNativa.comprobarActualizacion([], setActualizacionPendienteOk, setActualizacionPendienteError);
	 		window.comprobarActualizacion([], setActualizacionPendienteOk, setActualizacionPendienteError);	 		
    }
	else {
		// Se muestra al usuario que no tiene conexiÛn a internet	
		mostrarMsgSinInternet();
		
		// Se muestra el splash y contin˙a la ejecuciÛn
 		cargaInicial();
	}
}

function setRutaActualError(error)
{
	// Se mostra al usuario el error al obtener la ruta del contexto de la aplicaciÛn. Se debe cerrar la aplicaciÛn
	//alert(GetObjGlobales().DameTraduccion(16));
	/*if (error == "Error de lectura en la SD")
	{
		// La SD no est· montada o sÛlo tiene permisos de lectura.
		mostrarErrorSD();
	} else {
		mostrarError();
	}
	 
	// Se cierra la aplicaciÛn
	cerrarApp();*/
}

function setActualizacionPendienteOk(actualizacionPendiente)
{
	if (actualizacionPendiente == "true")
	{	
		/* Se hacen las acciones correspondientes para modificar el menu Acerca de (Ajustes) 
  	       para indicar que hay actualizaciones pendientes. */
	       GetObjGlobales().ActualizacionPendiente = true;
		   //window.plugins.interfazCatalogoNativa.obtenerTotalFicherosDescargar([], setTotalFicherosDescargarOk, setTotalFicherosDescargarError);
	       window.obtenerTotalFicherosDescargar([], setTotalFicherosDescargarOk, setTotalFicherosDescargarError);	       
	}
}

function setActualizacionPendienteError(error)
{
	/* Se hacen las acciones correspondientes para mostrar el error al comprobar si hay actualizaciones pendientes */
	//alert(GetObjGlobales().DameTraduccion(16));
	mostrarMsgSinInternet();
	 
	/* En este caso se continua la ejecuciÛn ya que, que no tenga internet no impide que se pueda continuar 
	   la ejecuciÛn, y no se cierra la aplicaciÛn como en los dem·s casos de error. */
}

function setTotalFicherosDescargarOk(datosFichDescargar) {
	// Se establecen el n˙mero de ficheros a descargar, y el tamaÒo de los mismos
	GetObjGlobales().numFicherosActualizar = parseInt(datosFichDescargar[0]);
	GetObjGlobales().tamFicherosDescargar = parseInt(datosFichDescargar[1]);
	
	// Mostramos el mensaje de que existe una actualizaciÛn pendiente de X es tamaÒo si la conexiÛn es WIFI
	mostrarActualizacionPendiente();
	
	// Se pinta el icono de actualizaciones pendientes en el men˙ Ajustes
	pintarActualizacionPendiente();
}

function setTotalFicherosDescargarError(error){

	//alert(GetObjGlobales().DameTraduccion(16));
	mostrarError();
	 
	// Se cierra la aplicaciÛn
	cerrarApp();
}

function setFicherosDescargadosOk(datosActualizacion)
{
	/* Se recibe un array de 3 posiciones:
	   PosiciÛn 0 -> N˙mero de ficheros descargados hasta el momento
	   PosiciÛn 1 -> N˙mero total de ficheros a descargar
	   PosiciÛn 2 -> TamaÒo en Mb de ficheros descargados hasta el momento
	   PosiciÛn 3 -> N˙mero de ficheros procesados del assets a la sd hasta el momento
	   PosiciÛn 4 -> N˙mero total de ficheros a procesar del assets a la sd hasta el momento
	   PosiciÛn 5 -> Ruta de la aplicaciÛn actualizada a la sd (una vez finaliza la copia de assets a sd)
	   PosiciÛn 6 -> Flag que determina si estoy copiando la instalacion inicial (0) o estoy actualizando ficheros (1)
	   Se hacen las acciones correspondientes para mostrar el mensaje al usuario cuando la 
	   operaciÛn haya finalizado correctamente. */
		if (datosActualizacion[6] == "0") {
			// Si estoy en proceso de copia de assets a sd, actualizo la barra de progreso de la ruta
			GetObjGlobales().numFicherosProcesadosAssets = datosActualizacion[3];
			GetObjGlobales().numFicherosTotalAssets = datosActualizacion[4];
			actualizarProgressBarRuta();
		}
		else {
			// Si estoy en proceso de actualizaciÛn de ficheros.
			cambiarLiteralesProgressBar();
			
			// Actualizo a la nueva ruta
			GetObjGlobales().rutaroot = datosActualizacion[5];
			
			// Preparo la barra de progreso de actualizaciÛn de ficheros
			GetObjGlobales().numFicherosDescargados = parseInt(datosActualizacion[0]);
			GetObjGlobales().numFicherosActualizar = parseInt(datosActualizacion[1]);
			GetObjGlobales().tamFicherosDescargar = parseInt(datosActualizacion[2]);
			actualizarProgressBar();
		}
	  
} 

function setFicherosDescargadosError(error)
{
	$('#CapaProgressBar').hide();
	/* Se hacen las acciones correspondientes para mostrar el error al realizar la actualizaciÛn */
	//alert(GetObjGlobales().DameTraduccion(16));
	if (error == "Error de lectura en la SD")
	{
		// La SD no est· montada o sÛlo tiene permisos de lectura.
		mostrarErrorSD();
	} else {
		mostrarError();
	}
	
	// Se cierra la aplicaciÛn
	//cerrarApp();
}
    
function obtenerModoConexion() {

    //DDC var networkState = navigator.network.connection.type;
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Conexion desconocida';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'Wifi';
    states[Connection.CELL_2G] = '2G';
    states[Connection.CELL_3G] = '3Gn';
    states[Connection.CELL_4G] = '4G';
    states[Connection.NONE] = 'Sin conexion';
 
    GetObjGlobales().modoConexion = states[networkState];
}

function mostrarMsgSinInternet() {

    if (GetObjGlobales().EsSpanish()) {
		$('#dialog-confirm').html('<p>' + _msgInfo + 'El dispositivo no tiene conexi' + _o + 'n a internet, por tanto, no se ha podido comprobar si hay actualizaciones pendientes.</p>'); 
		    MsgSi('Sin conexi' + _o + 'n a internet', null);
    } else {

        $('#dialog-confirm').html('<p>' + _msgInfo + 'The device is not connected to the Internet. It has not been possible to check whether there are any updates pending.</p>'); 
		    MsgSi('Without internet connection', null);
	} 
}

function mostrarError() {
    if (GetObjGlobales().EsSpanish()) {
//		$('#dialog-confirm').html('<p>' + _msgError + 'Se ha producido un error inesperado. La aplicaci'+_o+'n se cerrar' + _a + '.</p>'); 
		$('#dialog-confirm').html('<p>' + _msgError + 'Se ha producido un error inesperado. Revise la conexiÛn a internet.</p>');    	
		//MsgSi('Error',cerrarApp);
		MsgSi('Error');		
	} else {
    $('#dialog-confirm').html('<p>' + _msgError + 'There was an unexpected error. Check your internet connection.</p>'); 
	//	MsgSi('Error',cerrarApp);
		MsgSi('Error');
	} 
}

function mostrarErrorSD() {
	
	if (GetObjGlobales().EsSpanish()) {
    
		$('#dialog-confirm').html('<p>' + _msgError + 'Error de escritura en la tarjeta SD. Revise que la SD est'+_a+' insertada y tiene permisos de escritura. La aplicaci'+_o+'n se cerrar'+_a+'.</p>'); 
		MsgSi('Error',cerrarApp);
	} else {
        $('#dialog-confirm').html('<p>' + _msgError + 'SD card writing error. Check the SD card is inserted correctly and has write permission. The application will now close.</p>'); 
		MsgSi('Error',cerrarApp);
	} 
}



jQuery.fn.inicializarProgressBar = function () {
    var vPb = this;
            
    // calling original progressbar
    $(vPb).children('.pbar').progressbar();

    // display current positions and progress
    $(vPb).children('.percent').html('<b> 0% </b>');
    $(vPb).children('.elapsed').html('<b> 0/0 </b>');
    $(vPb).children('.pbar').children('.ui-progressbar-value').css('width', '0%');
}

function actualizarProgressBar() {
    var Porc = (GetObjGlobales().numFicherosDescargados * 100) / GetObjGlobales().numFicherosActualizar;
    var vPb = ("#progressBar");

    $(vPb).children('.percent').html('<b> ' + Porc.toFixed(1) + '% </b>');
    $(vPb).children('.elapsed').html('<b> ' + GetObjGlobales().numFicherosDescargados + '/' + GetObjGlobales().numFicherosActualizar + '</b>');
    $(vPb).children('.pbar').children('.ui-progressbar-value').css('width', Porc + '%');

    // cuando terminemos
    if (Porc >= 100) {
        $(vPb).children('.percent').html('<b>100%</b>');
        //$(vPb).children('.elapsed').html('Finished');
        
        //si actualizamos desde ajustes
        if ($('#contenedorActualizaciones').length) {
            $('#contenedorActualizaciones').hide();
        }  
        
        $("#actualizacionProgressOk").show();
        $("#PnActualizarProgress").show(); 
    }
}

function actualizarProgressBarRuta() {
	var Porc;
	if (GetObjGlobales().numFicherosTotalAssets == 0)
	{
		Porc = 100;
	} else {
		Porc = (GetObjGlobales().numFicherosProcesadosAssets * 100) / GetObjGlobales().numFicherosTotalAssets;
	}
	
    var vPb = ("#progressBar");

    $(vPb).children('.percent').html('<b> ' + Porc.toFixed(1) + '% </b>');
    $(vPb).children('.elapsed').html('<b> ' + GetObjGlobales().numFicherosProcesadosAssets + '/' + GetObjGlobales().numFicherosTotalAssets + '</b>');
    $(vPb).children('.pbar').children('.ui-progressbar-value').css('width', Porc + '%');

    // cuando terminemos
    if (Porc >= 100) {
    	cambiarLiteralesProgressBar();
        $(vPb).children('.percent').html('<b>100%</b>');
        //$(vPb).children('.elapsed').html('Finished');
        
        //si actualizamos desde ajustes
        if ($('#contenedorActualizaciones').length) {
            $('#contenedorActualizaciones').hide();
        }
    }
}

function iniciarObtencionRuta() {
    
    if (GetObjGlobales().EsSpanish()) {
        $('#btnActualizarProgress').attr('value', 'Aceptar');
        $('#ActualizarTxt').html('<b>Preparando los datos de instalaciÛn. Este proceso se realizar· una ˙nica vez...</b>');
        $('#actualizacionProgressOk').html('Carga de datos realizada correctamente');
    } else {
        $('#btnActualizarProgress').attr('value', 'Ok');
        $('#ActualizarTxt').html('<b>Preparing installation information. This process will be done once only...</b>');
        $('#actualizacionProgressOk').html('Successfully data load');
    }

    iniciarProgressBar();
}

function cambiarLiteralesProgressBar() {
	 if (GetObjGlobales().EsSpanish()) {
	        $('#btnActualizarProgress').attr('value', 'Aceptar');
	        $('#ActualizarTxt').html('<b>Actualizando ...</b>');
	        $('#actualizacionProgressOk').html('Se han actualizado los datos correctamente.');
	    } else {
	        $('#ActualizarTxt').html('<b>Updating ...</b>');
	        $('#btnActualizarProgress').attr('value', 'Ok');
	        $('#actualizacionProgressOk').html('The data has been updated successfully.');
	    }
}

//si presiona en ACEPTAR cuando se le pregunta por actualizar
function iniciarActualizacion() {
    
    if (GetObjGlobales().EsSpanish()) {
        $('#btnActualizarProgress').attr('value', 'Aceptar');
        $('#ActualizarTxt').html('<b>Actualizando ...</b>');
        $('#actualizacionProgressOk').html('Se han actualizado los datos correctamente');
    } else {
        $('#ActualizarTxt').html('<b>Updating ...</b>');
        $('#btnActualizarProgress').attr('value', 'Ok');
        $('#actualizacionProgressOk').html('The data has been updated successfully');
    }

    iniciarObtencionRuta();
    iniciarProgressBar();
    //window.plugins.interfazCatalogoNativa.actualizar([], setFicherosDescargadosOk, setFicherosDescargadosError);
    window.actualizar([], setFicherosDescargadosOk, setFicherosDescargadosError);    
}

function iniciarProgressBar() {
	  $("#actualizacionProgressOk").hide();
      $("#PnActualizarProgress").hide(); 
	  $('#CapaProgressBar').show();
	  $('#progressBar').inicializarProgressBar();
}

function pintarActualizacionPendiente() {
	$("#menumas").css('background-image', 'url(img/Notif2.png)');
}

function ocultarActualizacionPendiente() {
	$("#menumas").css('background-image', 'url(img/flecha_celeste.png)');
}



function mostrarActualizacionPendiente() {
	 if (GetObjGlobales().ActualizacionPendiente) {
        //Pintar la notificaciÛn
        pintarActualizacionPendiente();

        //si el modo de conexiÛn es WIFI y existen actualizaciones pendientes, 
        //preguntamos al usuario si quiere actualizar
        if (GetObjGlobales().modoConexion.toUpperCase() == 'WIFI' && GetObjGlobales().mostrarMsgActualizacion) {     
            GetObjGlobales().mostrarMsgActualizacion = false;
            if (GetObjGlobales().EsSpanish()) {
           
    			$('#dialog-confirm').html('<p>' + _msgInfo +
               'Existe una nueva actualizaci'+_o+'n del Cat'+_a+'logo. El tama'+_ene+'o aproximado de descarga es de '+GetObjGlobales().tamFicherosDescargar +'Mb. '+_interr+'Desea actualizar la aplicaci'+_o+'n?</p>'); 
    			MsgSiNo('Actualizaci' + _o + 'n disponible', iniciarActualizacion, null);
             } else {
               $('#dialog-confirm').html('<p>' + _msgInfo + 'There is a new update to the Catalogue. The approximate size of the download is ' + GetObjGlobales().tamFicherosDescargar + ' Mb. Do you want to update the application?</p>'); 
            	 MsgSiNo('Availabe update', iniciarActualizacion, null);
             }
        }
    }
    else {
    	//Ocultar la notificaciÛn
        ocultarActualizacionPendiente();
    }	
}


Ôªø
var _gaq;

function inicializaestadisticas() {
    _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-39829262-2']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        ga.src = 'js/ga.js';
        //alert(ga.src);
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}

function addeventoanalitics(category, action, label, valor) {
   _gaq.push(['_trackEvent', category, action,  label, valor]);
}



Ôªø//******** VARIABLES PARA PABELLONES ***************************//
var myScrollRecinto;
var zomRecinto = 1;
var arrayPabellones = new Array();
var puntos = Array();
var NombreImagen = '';
var xmindgn = 0, ymindgn = 0, anchodgn = 0, altodgn = 0, anchopix = 0, altopix = 0, Yoffset = 0;
var STAND_Recinto = '';

//******** VARIABLES PARA PABELLONES ***************************//

//******** VARIABLES PARA STANDS ***************************//
var pabellones = new Array();
var stands = new Array();
var xmindgn_stand;
var ymindgn_stand;
var anchodgn_stand;
var altodgn_stand;
var gstand;
var contador;
var zom = 1;
var vPabellonActual = '';

//******** VARIABLES PARA STANDS ***************************//

var myscrollpabellon = null;
// **************** FUNCIONES PABELLONES ************************//
function NoZoomerRecinto() {
    if (zomRecinto > 1) {
        zomRecinto -= 0.5;
        myScrollRecinto.zoom(0, 0, zomRecinto, 0);
        PintarLocalizadorPlano(STAND_Recinto);
    }
}

function ZoomerRecinto() {
    zomRecinto += 0.5;
    myScrollRecinto.zoom(0, 0, zomRecinto, 0);
    PintarLocalizadorPlano(STAND_Recinto);
}


function BuscarCentroides(Stand) {

    for (i = 0; i < stands.length; i++) {
        if (stands[i].numstand == Stand)
            return stands[i];
    }
}

function punto() { };
punto.prototype = { p1x: 0, p2x: 0, p3x: 0, p4x: 0, p1y: 0, p2y: 0, p3y: 0, p4y: 0, mslink: '', marcado: false, prefimg: '',
    inicializa: function (a, b, c, d, e, f, g, h, i, j) {
        this.p1x = a; this.p2x = b; this.p3x = c; this.p4x = d;
        this.p1y = e; this.p2y = f; this.p3y = g; this.p4y = h;
        this.mslink = i; this.prefimg = j;
    },
    pinta: function () { }
}

function CargarRecinto() {
    var cadena = '';
    var mslink = '', prefimg = '';
    var x1, x2, x3, x4, y1, y2, y3, y4;
    $.ajax({
        type: "GET",
        url: GetObjGlobales().getRutaFichero("X", "imgrecinto.xml"), //GetObjGlobales().rutarecurso + 'Feria=' + GetObjGlobales().feria + '&Tipo=X&Fichero=imgrecinto.xml',
        dataType: "xml",
        success: function (xml) {
            var contador = 0, j = 1;

            //obtener parametros de imagen
            $(xml).find('IMG').each(function () {
                NombreImagen = $(this).attr('NOMBRE');
                xmindgn = parseFloat($(this).attr('xmindgn'));
                ymindgn = parseFloat($(this).attr('ymindgn'));
                anchodgn = parseFloat($(this).attr('anchodgn'));
                altodgn = parseFloat($(this).attr('altodgn'));
                anchopix = parseFloat($(this).attr('anchopix'));
                altopix = parseFloat($(this).attr('altopix'));
            });
            
            $(xml).find('IMG').each(function () {
                $(this).find('PAB').each(function () {
                    j = 1;
                    puntos[contador] = new punto();

                    //get parameters 
                    mslink = $(this).attr('mslink');
                    prefimg = $(this).attr('prefimg');

                    //recorremos los 4 puntos del pabell√≥n
                    $(this).find('V').each(function () {
                        if (j == 1) {
                            x1 = $(this).attr('x');
                            y1 = $(this).attr('y');
                        }
                        else {
                            if (j == 2) {
                                x2 = $(this).attr('x');
                                y2 = $(this).attr('y');
                            }
                            else {
                                if (j == 3) {
                                    x3 = $(this).attr('x');
                                    y3 = $(this).attr('y');
                                }
                                else {
                                    if (j == 4) {
                                        x4 = $(this).attr('x');
                                        y4 = $(this).attr('y');
                                    }
                                }
                            }
                        }
                        j++;
                    });

                    //ya tenemos todo lo necesario para inicializar el punto.
                    eval(puntos[contador].inicializa(parseFloat(x1), parseFloat(x2), parseFloat(x3), parseFloat(x4),
                                                             parseFloat(y1), parseFloat(y2), parseFloat(y3), parseFloat(y4),
                                                             mslink, prefimg));

                    contador++;
                });
            });
        }
    })
};

function LoadMapa() {
    ScrollRecinto('wrapperMapa');
    myScrollRecinto.refresh();
    setTimeout(function () {
        PintarLocalizadorPlano(STAND_Recinto);
        //alert('Load XXX *** STAND: ' + STAND_PlanoPabellon + ' ancho: ' + anchopix + ' alto: ' + altopix + ' Yoffset: ' + Yoffset);
    }, 100);
}

function isPointInPoly(poly, pt) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}

function PintarLocalizadorPlano(STAND) {
    if (STAND != null && STAND != "undefined" && STAND != "" && ($('#MapaPabellones').length) ) {
        //hago esta chapu, ya que si no el double tap en iOS no funciona adecuadamente ... no me preguntes porque.
        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Mapas'); } else { GetObjGlobales().titulaCabecera('Maps'); }

        var anchopix = ($("#MapaPabellones").width() * zomRecinto);
        var altopix = $("#MapaPabellones").height() * zomRecinto;
        var Yoffset = $("#MapaPabellones").offset().top;
        var Centroide = BuscarCentroides(STAND);
        if (Centroide != 'undefined' && Centroide != null) {
            var FC = 2.8;
            var Px = ((Centroide.cx - xmindgn) / anchodgn) * anchopix;
            var Py = (((Centroide.cy + FC) - ymindgn) / altodgn) * altopix;
            Py = altopix - Py + Yoffset;
            Px = Px + myScrollRecinto.x;
            $("#stand-in-map-recinto").css({ "top": +Py - 32, "left": +Px - 9 }); //36 x32
            $("#stand-in-map-recinto").show();
        }
    }

}

function PabellonActual(XDGN, YDGN) {
    var puntoTest = { x: XDGN, y: YDGN };
    var iPabellon = '';
    for (i = 0; i < puntos.length; i++) {
        var arrayPuntos = [{ x: puntos[i].p1x, y: puntos[i].p1y }, { x: puntos[i].p2x, y: puntos[i].p2y },
                           { x: puntos[i].p3x, y: puntos[i].p3y }, { x: puntos[i].p4x, y: puntos[i].p4y}];
        if (isPointInPoly(arrayPuntos, puntoTest)) {
            iPabellon = puntos[i].prefimg;  
        }
        arrayPuntos = null;
    }
    return iPabellon;
}

function GetPlanoRecinto(X, Y) {
    var XDGN = 0;
    var YDGN = 0;
    
    var anchopix = $("#MapaPabellones").width() * zomRecinto;
    var altopix = $("#MapaPabellones").height() * zomRecinto;
    var Yoffset = $("#MapaPabellones").offset().top;

    Y = altopix - Y + Yoffset;
    X = X - myScrollRecinto.x;
    XDGN = ((X / anchopix) * anchodgn) + xmindgn;
    YDGN = ((Y / altopix) * altodgn) + ymindgn;

    var PabellonPulsado = PabellonActual(XDGN, YDGN);
    if (PabellonPulsado != null && PabellonPulsado != "undefined" && PabellonPulsado != "" && PabellonPulsado.length > 0) {
        if (STAND_Recinto != null && STAND_Recinto != "undefined" && STAND_Recinto != "" && STAND_Recinto.length > 0) {
            window.location = '#ajax_pabellon.html?p=' + PabellonPulsado + '&s=' + STAND_Recinto;
        }
        else {
            window.location = '#ajax_pabellon.html?p=' + PabellonPulsado;
        }
    }


};
// **************** FUNCIONES PABELLONES ************************//


function stand() { };
stand.prototype = {
    mslink: '540548',
    numstand: '3E23',
    codempr: '750894_1',
    cx: 0,
    cy: 0,
    pabellon: '',
    puntos: [],
    inicializa: function (mslink, numstand, codempr, cx, cy, pab) {
        this.mslink = mslink;
        this.numstand = numstand;
        this.codempr = codempr;
        this.cx = cx;
        this.cy = cy;
        this.pabellon = pab;
        this.puntos = new Array();
    },
    addpunto: function (x1, y1) {
        this.puntos.push({ x: x1, y: y1 });
    }
};

function pabellon() { };
    pabellon.prototype = { xmindgn: 0, ymindgn: 0, anchodgn: 0, altodgn: 0, prefimg: '',
    inicializa: function (a, b, c, d, e) {
        this.xmindgn = a; this.ymindgn = b; this.anchodgn = c; this.altodgn = d; this.prefimg = e;
    },
    pinta: function () { }
}

function BuscarPabellon(Pabellon) {
    for (i = 0; i < pabellones.length; i++) {
        if (pabellones[i].prefimg == Pabellon)
            return { xmin: pabellones[i].xmindgn, ymin: pabellones[i].ymindgn, 
                     ancho: pabellones[i].anchodgn, alto: pabellones[i].altodgn}
    }
}

function InicializaCoordenadasDGNPabellon(Pabellon)
{
    var Coor = BuscarPabellon(Pabellon);
    vPabellonActual = Pabellon;
    if (Coor != 'undefined' && Coor != "undefined" && Coor != null) {
        xmindgn_stand = Coor.xmin;
        ymindgn_stand = Coor.ymin;
        anchodgn_stand = Coor.ancho;
        altodgn_stand = Coor.alto;
    }
}

function CargarPabellon() {
    $.ajax({
        type: "GET",
        url: GetObjGlobales().getRutaFichero("X", "imgstands.xml"), //GetObjGlobales().rutarecurso + 'Feria=' + GetObjGlobales().feria + '&Tipo=X&Fichero=imgstands.xml',
        dataType: "xml",
        success: function (xml) {
            var stand1;
            var pabellon1;
            $(xml).find('PAB').each(function () {
                pabellon1 = new pabellon();
                pabellon1.inicializa(parseFloat($(this).attr('xmindgn')),
                                        parseFloat($(this).attr('ymindgn')),
                                        parseFloat($(this).attr('anchodgn')),
                                        parseFloat($(this).attr('altodgn')),
                                        $(this).attr('prefimg'));
                pabellones.push(pabellon1);

                //                xmindgn_stand = parseFloat($(this).attr('xmindgn'));
                //                ymindgn_stand = parseFloat($(this).attr('ymindgn'));
                //                anchodgn_stand = parseFloat($(this).attr('anchodgn'));
                //                altodgn_stand = parseFloat($(this).attr('altodgn'));

                //<PAB pab="PAB1" xmindgn="-158,115047453031" ymindgn="-13,742960248518" anchodgn="3,9661698552713" altodgn="3,9661698552713" anchopix="500" altopix="500">
                $(this).find('ST').each(function () {
                    //mslink="540548" numstand="3E23" codempr="750894_1" cx="-9,75" cy="-5,225"
                    stand1 = new stand();
                    stand1.inicializa($(this).attr('mslink'),
                                            $(this).attr('numstand'),
                                            $(this).attr('codempr'),
                                            parseFloat($(this).attr('cx')),
                                            parseFloat($(this).attr('cy')),pabellon1.prefimg);
                    stands.push(stand1);
                    $(this).find('V').each(function () {
                        //<V x="-15,9" y="-5,9"/>
                        stand1.addpunto(parseFloat($(this).attr('x')), parseFloat($(this).attr('y')));
                    })
                })
            })
        }
    })
};


//// **************** FUNCIONES STANDS ************************//
function GetPlano(X, Y) {
    var XDGN = 0;
    var YDGN = 0;
    //alert(myScroll.x);
    var anchopix = ($("#mappab").width() * zom);
    var altopix = $("#mappab").height() * zom;
    var Yoffset = $("#mappab").offset().top;

    Y = altopix - Y + Yoffset;   //+ 50; //Le damos la vuelta a la Y para adaptarnos a los ejes de coordenadas que maneja los dgn
    X = X - myscrollpabellon.x;
    XDGN = ((X / anchopix) * (anchodgn_stand)) + xmindgn_stand;
    YDGN = ((Y / altopix) * (altodgn_stand)) + ymindgn_stand;
    
    var puntoTest = { x: XDGN, y: YDGN };

    var encuentra = false;
    for (i = 0; i < stands.length; i++) {
        // solo revisamos stands del pabellon actual
        if (stands[i].pabellon == vPabellonActual)
        {
            var elem = stands[i].codempr.split('_');
            var codemprsec = elem[1];
            if (codemprsec == '1') {
                if (isPointInPoly(stands[i].puntos, puntoTest)) {
                    encuentra = true;
                    break;
                };
            }
        }
    };
    if (encuentra) {
        window.location = '#ajax_ficha.html?i=' + stands[i].codempr;
    }
};

function PintarLocalizadorStand(pstand) {
    if (gstand != null && gstand != "undefined" && gstand != "" && ($('#mappab').length)) {
    	PoneTituloPabellon();
//        if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Pabell√≥n'); } else { GetObjGlobales().titulaCabecera('Pavilion'); }
        var anchopix = ($("#mappab").width() * zom);
        var altopix = $("#mappab").height() * zom;
        var Yoffset = $("#mappab").offset().top;
        var Xoffset = $("#mappab").offset().right;
        var Centroide = BuscarCentroides(pstand);
        if (Centroide != 'undefined' && Centroide != null) {
            if (Centroide.pabellon == vPabellonActual) {   
                var Px = ((Centroide.cx - xmindgn_stand) / anchodgn_stand) * anchopix;
                var Py = (((Centroide.cy) - ymindgn_stand) / altodgn_stand) * altopix;
                Py = altopix - Py + Yoffset;
                Px = Px + myscrollpabellon.x;
                $("#stand-in-map").css({ "top": +Py - 32, "left": +Px - 9 }); //36 x32
                $("#stand-in-map").show();
            }
        }
    }
}

function NoZoomerPabellon() {
    if (zom > 1) {
        zom -= 1;
        myscrollpabellon.zoom(0, 0, zom, 0);
    }
}

function ZoomerPabellon() {
    zom += 1;
    myscrollpabellon.zoom(0, 0, zom, 0);
}

function imagencargada() {
    contador = contador + 1;
    if (contador >= 25) {
        if (myscrollpabellon == null) {
            elScrollPabellon('wrapperPabellon');
        }
        myscrollpabellon.refresh();
        PintarLocalizadorStand(gstand);
    }
}

function LoadStands() {
    //alert('pabellon cargado');
    elScrollPabellon('wrapperPabellon');
    myscrollpabellon.refresh();
    setTimeout(function () {
        PintarLocalizadorStand(gstand);
    }, 100);

}
//// **************** FUNCIONES STANDS ************************//

//************** CREAR SCROLLS **********************************///
function elScrollPabellon(quien) {

    if ($('#' + quien).length > 0) {
        myscrollpabellon = new iScroll(quien, {
            useTransform: true,
            zoom: true,
            zoomMin: 1,
            zoomMax: 6,
            bounce: false,
            momentum: false,
            vScrollbar: true,
            onScrollMove: function () {
                PintarLocalizadorStand(gstand);
            },
            onZoomEnd: function () {
                zom = this.scale;
                PintarLocalizadorStand(gstand);
            },
            onScrollEnd: function () {
                //   PintarLocalizadorStand(gstand);
            },
            onZoomStart: function () {
                OcultaLocalizadorStand();
            }
        });
        $('#capaCargador').fadeOut();
    }
};

function ScrollRecinto(quien) {
    if ($('#' + quien).length > 0) {
        myScrollRecinto = new iScroll(quien,
        {
            useTransform: true,
            zoom: true,
            zoomMin: 1,
            zoomMax: 6,
            bounce: false,
            momentum: false,
            vScroll: true,
            onScrollMove: function () {
                PintarLocalizadorPlano(STAND_Recinto);
            },
            onZoomEnd: function () {
                zomRecinto = this.scale;
                PintarLocalizadorPlano(STAND_Recinto);
            },
            onTouchEnd: function () {
                //alert('touch end');
            },
            onZoomStart: function () {
                OcultaLocalizadorRecinto();
            }
        });
        $('#capaCargador').fadeOut();
    }
};

function PoneTituloPabellon(){
    if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Pabell√≥n'); } else { GetObjGlobales().titulaCabecera('Pavilion'); }	
}

Ôªøfunction InicializarActividadesDeLaAgenda() {
    addeventoanalitics(GetObjGlobales().feria, 'Agenda', '', 0);
    if (GetObjGlobales().EsSpanish()) { GetObjGlobales().titulaCabecera('Agenda'); } else { GetObjGlobales().titulaCabecera('Schedule'); }
    cargaFicheroHTMLConAccion(GetObjGlobales().feria, 'actividad.html', 'actividad_en.html', $('#conteen'), InicializaAgenda);
}

 function InicializaAgenda()
    {
        $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
        setTimeout("elScroll('wrapperActividades');", 0);
        $('.AgendaCategoria').die();
        $('.AgendaCategoria').live(GetTipoEventoParaClick(), ActivaDesactiva);
    }

    function ActivaDesactiva(e) {
        ActivaDesactivaListaActividadByElement($(this).next('ul').get(0));
    }

    function ActivaDesactivaListaActividadById(nombre) {
        if (document.getElementById(nombre).style.display == "none")
            document.getElementById(nombre).style.display = 'block';
        else
            document.getElementById(nombre).style.display = 'none';
        myScroll.refresh();
    }
    function ActivaDesactivaListaActividadByElement(elemento) {
        // alert(nombre);
        if (elemento.style.display == "none")
            elemento.style.display = 'block';
        else
            elemento.style.display = 'none';
        myScroll.refresh();
    }




Ôªøvar OFichaEmpresas; //¬°¬°¬°NO USAR ESTA VARIABLE DIRECTAMENTE. UTILIZAR EL M√âTODO GetObjFichaEmpresas()!!!

function anyadereventoanalitics(){
    addeventoanalitics(GetObjGlobales().feria, 'WEB EMPRESA', GetObjFichaEmpresas().Empresa.no, 0);
}

function GetObjFichaEmpresas() {
    if (OFichaEmpresas == undefined) {
        OFichaEmpresas = new ObjFichaEmpresa();
    }
    return OFichaEmpresas;
}

function InicializaFichaEmpresas() {
    var objFichaEmpresa = GetObjFichaEmpresas();
    objFichaEmpresa.ObtenerFichaEmpresaCompleta();
}

function CargaFichaEmpresa() {
    GetObjGlobales().cargaIdioma();
    GetObjGlobales().InicializarHeader();
    var objficha = GetObjFichaEmpresas();  //new ObjFichaEmpresa();
    objficha.id = getParameterByName('i');
    objficha.feria = GetObjGlobales().feria;
    objficha.objlistaempr = GetObjListaEmpresas();
    objficha.rutaficha = GetObjGlobales().rutaficha;
    objficha.rutarecurso = GetObjGlobales().rutarecurso;
    objficha.CargarFichaEmpresa();
    setTimeout("elScroll('wrapperGaleria');", 200);
}

function ObjFichaEmpresa() { };
ObjFichaEmpresa.prototype = {
    id: 0,
    feria: '',
    objlistaempresas: '',
    rutaficha: '',
    rutarecurso: '',
    fichaEmpresas: '',
    favorito: false,
    Empresa: '',
    setFichaEmpresas: function (data) {
        fichaEmpresas = data;
    },
    GetFichaEmpresaById: function (id) {
        var fichaActual;
        for (var i = 0; i < fichaEmpresas.length; i++) {
            if (fichaEmpresas[i].id == id) {
                fichaActual = fichaEmpresas[i];
                break;
            }
        }
        return fichaActual;
    },
    ObtenerFichaEmpresaCompleta: function () {
        var localobj = this;
        $.ajax({
            type: "GET",
            url: GetObjGlobales().getRutaFichero("X", "expositores_fichas.json"),
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (response) {
                var data = eval(response.d);
                localobj.setFichaEmpresas(data);
            },
            error: errorAjax
        });
    },
    CargarFichaEmpresa: function () {
        $('#btnCierraAmpliar').click(function () {
            $('#contenedorAmpliar').hide();
            $('#contenedor_paginas').addClass('contenedorDown');
            $('#contenedor_paginas').removeClass('contenedorUp');
        });

        //Aqu√≠ habr√° que controlar si trabamos offline u online
        //De momento supongo que estamos siempre online
        this.CargarSeccionesFicha();
        this.CargarFavorito();
    },
    CargarFavorito: function () {
        iniciarDB();
        var localid = this.id;
        var localferia = this.feria;
        var localfavorito = this.favorito;
        if (window.openDatabase) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT id,id_objeto,tipo_objeto, favorito, fecha FROM favoritos WHERE id_objeto=? AND tipo_objeto=? and favorito=1 and feria=? ',
                            [localid, 2, localferia], function (tx, results) {
                                if (results.rows.length > 0) {
                                    $(".fav img").attr('src', 'img/fav_on.png');
                                    localfavorito = true;
                                } else {
                                    $(".fav img").attr('src', 'img/fav_off.png');
                                    localfavorito = false
                                }
                            }, function (tx) { /*ERROR*/ });
            });
        }
        $("#botFav").click(function () {
            if (localfavorito) {
                nFavorito(localid, 2, 0, $('#nombre').text());
                $("#botFav img").attr('src', 'img/fav_off.png');
                localfavorito = false;
            }
            else {
                nFavorito(localid, 2, 1, $('#nombre').text());
                $("#botFav img").attr('src', 'img/fav_on.png');
                localfavorito = true;
            }
        });
    },
    CargarDetallesFicha: function (pEmpresa) {
        this.Empresa = pEmpresa;
        if (pEmpresa != null && pEmpresa != "undefined") {
            $("#contenedorContactos").show();
            $("#destacar").show();
            this.CargarCabecera(pEmpresa);
            this.CargarDatosContacto(pEmpresa);
            this.CargarSectores(pEmpresa);
            this.CargarGenericos(pEmpresa);
            this.CargarCoexpos(pEmpresa);
            this.CargarActividad(pEmpresa);
            this.CargarProducto(pEmpresa);
            this.CargarPaisesRepresentados(pEmpresa);
            this.CargarAdicionales(pEmpresa);
            this.CargaMarcas(pEmpresa);
            this.CargaProductosDestacados(pEmpresa);
            this.CargaEmpresasRepresentadas(pEmpresa);
        }
        else {
            $("#contenedorContactos").hide();
            $("#destacar").hide();
            GetObjGlobales().titulaCabecera(GetObjGlobales().DameTraduccion(15));
            $("#tipoexp").append(GetObjGlobales().DameTraduccion(15));
        }
        $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
        //myScroll.refresh();
    },
    CargarSeccionesFicha: function () {
        this.objlistaempr.EmpresaSeleccionada = '#Empresa_' + this.id;
        var localobj = this;

        if (GetObjGlobales().EsOffline()) {
            localobj.CargarDetallesFicha(this.GetFichaEmpresaById(this.id));
        } else {
            $.ajax({
                type: "GET",
                url: this.rutaficha + 'Feria=' + this.feria + '&Codigo=' + this.id,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (response) {
                    var Empresa = eval(response.d);
                    localobj.CargarDetallesFicha(Empresa);
                },
                error: errorAjax
            });
        }
    },
    CargarCabecera: function (pEmpresa) {
        GetObjGlobales().titulaCabecera(pEmpresa.no);
        $('#nombre').text(pEmpresa.no);
        addeventoanalitics(GetObjGlobales().feria, 'Ficha empresa', pEmpresa.no, 0);
        var pabellon = pEmpresa.pb.trim();
        var stand = pEmpresa.st.trim();
        var tipoexp = pEmpresa.te;

        var tieneLogo = false;
        if (pEmpresa.log != null) {
            tieneLogo = true;
            var url = pEmpresa.log.url;
            $('#contenedorLogo').append(
							    '<span>' +
							    '<img src="" alt="atras" border="0" onload="ajustaimagen()" />' +
							    '</span>');
            //$('#contenedorLogo span img').attr("src", this.rutarecurso + 'Feria=' + this.feria +
            //'&Tipo=I&Fichero=' + url);
            $('#contenedorLogo span img').attr("src", GetObjGlobales().getRutaFichero("I", url));
        }
        if (tieneLogo) $('#contenedorLogo').show();

        $('#tipoexp').text(GetObjGlobales().DameTraduccion(GetObjGlobales().DameIdTipoExp(tipoexp)));

        var tPabellon = pabellon.split(';');
        var tstand = stand.split(';');
        for (i = 0; i < tstand.length; i++) {
            if (GetObjGlobales().EsSpanish()) {
                $('#stand').append('<div class="donde" href="ajax_plano.html?S=' + tstand[i].trim() + '" rel="enlace"><span>Pabell√≥n ' + tPabellon[i] + ', ' + tstand[i] + '</span></div>');
            }
            else {
                $('#stand').append('<div class="donde" href="ajax_plano.html?S=' + tstand[i].trim() + '" rel="enlace"><span>Hall ' + tPabellon[i] + ', ' + tstand[i] + '</span></div>');
            }
        }
    },
    CargarDatosContacto: function (pEmpresa) {
        ///CONTACTO/////
        var cpypoblacion;
        if (pEmpresa.cp == null)
            cpypoblacion = pEmpresa.po
        else
            cpypoblacion = pEmpresa.cp + ' - ' + pEmpresa.po;
        var provpais;
        var pais;
        if (GetObjGlobales().EsSpanish())
            pais = pEmpresa.pa;
        else
            pais = pEmpresa.pai;
        provpais = pEmpresa.pr + '(' + pais + ')';

        var telfax;
        var tel = pEmpresa.tl;
        var fax = pEmpresa.fa;
        telfax = '<span>';
        if (tel != '') { telfax = telfax + '<a rel="boton"  href="tel:' + tel + '"> Tl: ' + tel + '</a>' };
        if (fax != '') { telfax = telfax + '<a rel="boton"  href="fax:' + fax + '"> Fax: ' + fax + '</a>' };
        telfax = telfax + '</span>';

        var web;
        if (pEmpresa.we != null) {
            if (pEmpresa.we.indexOf("http") == -1)
                web = "http://" + pEmpresa.we;
            else
                web = pEmpresa.we;
        }
        else
            web = "";

        $('#contactos').append(
				    '<div class="datos">' +
        //				    '   <span class="titDatos">' +'---'+ pEmpresa.pe + '</span>' +
				    '</div> ' +
				    '<div class ="datos">' +
				    '   <span class="titDatos">' + pEmpresa.di + '</span>' +
				    '   <span class="stitDatos">' + cpypoblacion + '</span>' +
				    '   <span class="titDatos">' + provpais + '</span>' +
				    telfax +
				    '   <span><a href="mailto:' + pEmpresa.em + '">' + pEmpresa.em + '</a></span>' +
                    '   <span><a href=' + web + ' target="_blank" onclick="anyadereventoanalitics();">'
                    + web + '</a></span>' +
				    '</div>');
    },
    CargaEmpresasRepresentadas: function (pEmpresa) {
        var tieneRepres = false;
        if (pEmpresa.ltrs != null) {
            var divrepres = $('#representadas');
            tieneRepres = true;
            for (i = 0; i < pEmpresa.ltrs.length; i++) {
                divrepres.append('<li class="concepto" rel="enlace" href="ajax_fichaR.html?i=' +
				    pEmpresa.ltrs[i].id + '">' + cortaPalabrasListaEmpresas(pEmpresa.ltrs[i].v, 0) + '</li>');
            }
        }
        if (tieneRepres) { $('#contendorEmpresasRepresentadas').show(); }
    },
    CargarSectores: function (pEmpresa) {
        var tieneSectores = false;
        if (pEmpresa.lse != null) {
            tieneSectores = true;
            var divsect = $('#sectores');
            for (var i = 0; i < pEmpresa.lse.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    divsect.append('<span class="titDatos">' + pEmpresa.lse[i].v + '</span>');
                else
                    divsect.append('<span class="titDatos">' + pEmpresa.lse[i].vi + '</span>');
            };
        }
        if (tieneSectores) { $('#contenedorSectores').show(); }
    },
    CargarGenericos: function (pEmpresa) {
        var tieneGenericos = false;
        var contenedorGenericos = $('#contenedorGenericos');
        if (pEmpresa.ltge != null) {
            tieneGenericos = true;
            for (var i = 0; i < pEmpresa.ltge.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    contenedorGenericos.append(
											    '<div class="separador">' +
											    '<span>' + pEmpresa.ltge[i].v + '</span></div>' +
											    '<div class="datos" id="genericos' + i + '" </div>');
                else
                    contenedorGenericos.append(
											    '<div class="separador">' +
											    '<span>' + pEmpresa.ltge[i].vi + '</span></div>' +
											    '<div class="datos" id="genericos' + i + '" </div>');
                if (pEmpresa.ltge[i].lge != null) {

                    var divgen = $('#genericos' + i);
                    for (var x = 0; x < pEmpresa.ltge[i].lge.length; x++) {
                        if (GetObjGlobales().EsSpanish())
                            divgen.append('<span class="titDatos">' +
										    pEmpresa.ltge[i].lge[x].v + '</span>');
                        else
                            divgen.append('<span class="titDatos">' +
										    pEmpresa.ltge[i].lge[x].vi + '</span>');
                    }
                }
            }
        }
        if (tieneGenericos) { contenedorGenericos.show(); }
    },
    CargarCoexpos: function (pEmpresa) {
        var tieneCoexpos = false;
        if (pEmpresa.lco != null) {
            var divcoex = $('#coexpos');
            tieneCoexpos = true;
            for (i = 0; i < pEmpresa.lco.length; i++) {
                if (GetObjGlobales().EsSpanish()) {
                    divcoex.append('<li class="concepto" rel="enlace" href="ajax_ficha.html?i=' +
					    pEmpresa.lco[i].id + '">' + cortaPalabrasListaEmpresas(pEmpresa.lco[i].v, 0) + '</li>');
                }
                else {
                    divcoex.append('<li class="concepto" rel="enlace" href="ajax_ficha.html?i=' +
					    pEmpresa.lco[i].id + '">' + cortaPalabrasListaEmpresas(pEmpresa.lco[i].vi, 0) + '</li>');
                }
            }
        }
        if (tieneCoexpos) { $('#contenedorCoexpos').show(); }
    },
    CargarActividad: function (pEmpresa) {
        var tieneActividad = false;
        if (pEmpresa.lac != null) {
            tieneActividad = true;
            var divsect = $('#actividades');
            for (var i = 0; i < pEmpresa.lac.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    divsect.append('<span class="titDatos">' + pEmpresa.lac[i].v + '</span>');
                else
                    divsect.append('<span class="titDatos">' + pEmpresa.lac[i].vi + '</span>');
            };
        }
        if (tieneActividad) { $('#contenedorActividad').show(); }
    },
    CargarProducto: function (pEmpresa) {
        var tieneProducto = false;
        if (pEmpresa.lpr != null) {
            tieneProducto = true;
            var divsect = $('#productos');
            for (var i = 0; i < pEmpresa.lpr.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    divsect.append('<span class="titDatos">' + pEmpresa.lpr[i].v + '</span>');
                else
                    divsect.append('<span class="titDatos">' + pEmpresa.lpr[i].vi + '</span>');
            };
        }
        if (tieneProducto) { $('#contenedorProductos').show(); }
    },
    CargarPaisesRepresentados: function (pEmpresa) {
        var tienePaisRep = false;
        if (pEmpresa.lprs != null) {
            tienePaisRep = true;
            var divsect = $('#PaisesRepresentados');
            for (var i = 0; i < pEmpresa.lprs.length; i++) {
                if (GetObjGlobales().EsSpanish())
                    divsect.append('<span class="titDatos">' + pEmpresa.lprs[i].v + '</span>');
                else
                    divsect.append('<span class="titDatos">' + pEmpresa.lprs[i].vi + '</span>');
            };
        }
        if (tienePaisRep) { $('#contenedorPaisesRepresentados').show(); }
    },
    CargarAdicionales: function (pEmpresa) {
        var tieneAdicionales = false;
        if (pEmpresa.lcc != null) {
            tieneAdicionales = true;
            var divsect = $('#adicionales');
            for (var i = 0; i < pEmpresa.lcc.length; i++) {
                if (GetObjGlobales().EsSpanish()) {
                    divsect.append('<span class="titDatos">' + pEmpresa.lcc[i].no + '</span>');
                }
                else {
                    divsect.append('<span class="titDatos">' + pEmpresa.lcc[i].noi + '</span>');
                }
                divsect.append('<span class="titDatos">' + pEmpresa.lcc[i].v + '</span>');
            };
        }
        if (tieneAdicionales) { $('#contenedorAdicionales').show(); }
    },
    CargaMarcas: function (pEmpresa) {
        var tieneMarcas = false;
        var contenedorMarcas = $('#contenedorMarcas');
        if (pEmpresa.ltma != null) {
            var objmarcas = $('#marcas');
            tieneMarcas = true;
            for (var i = 0; i < pEmpresa.ltma.length; i++) {
                objmarcas.append('<span class="titDatos">' + cortaPalabrasListaEmpresas(pEmpresa.ltma[i].v, 0) + '</span>');
                if (pEmpresa.ltma[i].lpa != null) {

                    for (var x = 0; x < pEmpresa.ltma[i].lpa.length; x++) {
                        if (GetObjGlobales().EsSpanish())
                            objmarcas.append('<span class="titDatos1">' +
                                            pEmpresa.ltma[i].lpa[x].v + '</span>');
                        else
                            objmarcas.append('<span class="titDatos1">' +
                                            pEmpresa.ltma[i].lpa[x].vi + '</span>');
                    }
                }
            }
        }
        if (tieneMarcas) { contenedorMarcas.show(); }
    },
    CargaProductosDestacados: function (pEmpresa) {
        var tieneProdDestacados = false;
        if (pEmpresa.lpd != null) {
            tieneProdDestacados = true;
            var divsect = $('#contenedorProductosDestacados');
            var Pdes, Ddes, dImagen, DivContenedor, DivContenedorJ;
            for (var i = 0; i < pEmpresa.lpd.length; i++) {
                DivContenedor = 'DivContenedorPD' + i;
                divsect.append('<div id=' + DivContenedor + ' class="datos" ></div>');
                DivContenedorJ = $('#' + DivContenedor);
                if (GetObjGlobales().EsSpanish())
                    DivContenedorJ.append('<span class="titDatos">' + pEmpresa.lpd[i].dc + '</span>');
                else
                    DivContenedorJ.append('<span class="titDatos">' + pEmpresa.lpd[i].dci + '</span>');

                Ddes = 'DDes' + i;
                DivContenedorJ.append('<div id=' + Ddes + ' class="contCarrusel" class="datos" ></div>');
                dImagen = $('#' + Ddes);
                var url = pEmpresa.lpd[i].url;
                if (url != null) {
                    Pdes = 'ProdDes' + i;
                    dImagen.append(
							    '<span class="ImgProductos">' +
							    '<img id=' + Pdes + ' src="" alt="atras" border="0" onload="ajustaimagenProductos()" />' +
							    '</span>');
                    $('#' + Pdes).attr("src", this.rutarecurso + 'Feria=' + this.feria +
						      '&Tipo=I&Fichero=' + url);

                }
                DivContenedorJ.append(dImagen);
            }
        }
        if (tieneProdDestacados) { $('#contenedorProductosDestacados').show(); }
    }
}


function ajustaimagen() {
    $('#contenedorLogo span img').each(function () {
        var cual = $(this);
        var ancho = cual.width();
        var alto = cual.height();
        fotilla(ancho, alto, cual, "100", "100");
        if (myScroll != "undefined" && myScroll != null) {
            myScroll.refresh();
        }
    });

}

//Marco: no redimenciona la imagen correctamente
function ajustaimagenProductos() {
    $('span.ImgProductos img').each(function () {
        var cual = $(this);
        var ancho = cual.width();
        var alto = cual.height();
        fotilla(ancho, alto, cual, "200", "200");
        if (myScroll != "undefined" && myScroll != null) {
            myScroll.refresh(); //al final de la carga ya se hace un refresh
        }
    });
}




//DDC no veo muy claro esto hay que revisarlo
function errorAjax(result) {
    alert('ERROR ' + result.status + ' ' + result.statusText);
}


Ôªø
var _tBusquedaNormal = 1; //constante
var _tBusquedaContiene = 2; //constante
var _tBusquedaEmpiezaPor = 3;  //constante
var OListaEmpresas; //¬°¬°¬°NO USAR ESTA VARIABLE DIRECTAMENTE. UTILIZAR EL M√âTODO GetObjListaEmpresas()!!!

function GetObjListaEmpresas() {
    if (OListaEmpresas == undefined) {
        OListaEmpresas = new ObjListaEmpresas();
    }
    return OListaEmpresas;
}

function InicializaListaEmpresas(pferia) {
    var objlista = GetObjListaEmpresas();
    objlista.feria = pferia;
    objlista.ObtenerListaCompleta();
}

function ObjListaEmpresas() {};
ObjListaEmpresas.prototype = {
    ListaCompleta: '',
    Lista_OK: false,
    NumPagina: 0,
    NEmpresas: 20,
    ListaInicial: '',
    ultimaletra: '',
    TipoBusqueda: 1, //1 - Normal, 2 - Filtro, 3 - Letra
    ListaPintada: '',
    tipolistado: '',
    txtBuscar: '',
    btnBuscar: '',
    borrartxt: '',
    feria: '',
    myScrollListaEmpr: '',
    EmpresaSeleccionada: '',
    DameTipoBusqueda: function () {
        switch (this.TipoBusqueda) {
            case _tBusquedaNormal:
                return "TODO"
                break;
            case _tBusquedaContiene:
                return "CONTIENE"
                break;
            case _tBusquedaEmpiezaPor:
                return "EMPIEZAPOR";
                break;
        }
    },
    ObtenerNombreCookie: function (pferia) {
        var cadena = "";
        if (pferia != null)
            cadena = "CodFeria=" + pferia;
        return cadena;
    },
    InicializaBusqueda: function (plistapintada, ptipobusqueda, pultimaletra, ptxtbuscar) {
        this.ListaPintada = plistapintada;
        this.TipoBusqueda = ptipobusqueda;
        this.ultimaletra = pultimaletra;
        this.txtBuscar = ptxtbuscar;
    },
    storeCurrentEmpresas: function () {
        var cookieListaEmpresas = this.ObtenerNombreCookie(this.feria) + "Empresas";
        $.DSt.set(cookieListaEmpresas, this.ListaCompleta);
    },
    SetListaCompleta: function (plista) {
        this.ListaCompleta = plista;
        this.Lista_OK = true;
    },
    ObtenerListaCompleta: function () {
        this.ListaCompleta = "";

        if (GetObjGlobales().EsOffline()) {
            if (this.tipolistado == "N") {
                var urlLlamar = GetObjGlobales().getRutaFichero("X", "expositores.json");
            }
            else {
                var urlLlamar = GetObjGlobales().getRutaFichero("X", "expositores_logo.json");
            }
        }
        else {

            if (this.tipolistado == "N") {
                //   listado simple
                var urlLlamar = GetObjGlobales().rutaroot + "wsListaExpositores.svc/ObtenerExpositores?Feria=" + this.feria +
                                            "&tipoBusqueda=TODO" +
                                            "&numEmpresas=9999999" +
                                            "&numpagina=1&cadena=";
            }
            else {
                //   LISTADO CON IMAGENES
                var urlLlamar = GetObjGlobales().rutaroot + "wsListaExpositores.svc/ObtenerExpositoresImagenes?Feria=" + this.feria +
                                                "&tipoBusqueda=TODO" +
                                                "&numEmpresas=9999999" +
                                                "&numpagina=1&cadena=''";
            }
        }

        $.ajax({
            type: "GET",
            url: urlLlamar,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (response) {
                var data = eval(response.d);
                GetObjListaEmpresas().ListaCompleta = data;
                //this.storeCurrentEmpresas(pferia);No consigo que me funcione la llamada a storeCurrentEmpresas
                var cookieListaEmpresas = GetObjListaEmpresas().ObtenerNombreCookie(this.feria) + "Empresas";
                $.DSt.set(cookieListaEmpresas, GetObjListaEmpresas().ListaCompleta);
                GetObjListaEmpresas().Lista_OK = true;
            },
            error: errorAjax
        });
    },
    BusquedaServidor: function () {
        var strtipobusqueda = this.DameTipoBusqueda();

        if (this.tipolistado == "N") {
            //   LISTADO SIMPLE
            var urlLlamar = GetObjGlobales().rutaroot + "wsListaExpositores.svc/ObtenerExpositores?Feria=" + this.feria +
                                "&tipoBusqueda=" + strtipobusqueda +
                                "&numEmpresas=" + this.NEmpresas + "&numpagina=" + this.NumPagina + "&cadena=" + this.txtBuscar;
        }
        else {
            //   LISTADO CON IMAGENES
            var urlLlamar = GetObjGlobales().rutaroot + "wsListaExpositores.svc/ObtenerExpositoresImagenes?Feria=" + this.feria +
                                "&tipoBusqueda=" + strtipobusqueda +
                                "&numEmpresas=" + this.NEmpresas + "&numpagina=" + this.NumPagina + "&cadena=" + this.txtBuscar;
        }

        $.ajax({
            type: "GET",
            url: urlLlamar,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (response) {
                var data = eval(response.d);
                GetObjListaEmpresas().NumPagina++;
                if (GetObjListaEmpresas().tipolistado == "N")
                    GetObjListaEmpresas().PintarEmpresas(data);
                else {
                    GetObjListaEmpresas().PintarEmpresasLogo(data);
                }
            },
            error: errorAjax
        });
    },
    CargaInicial: function () {
        this.NumPagina = 1;
        this.InicializaBusqueda("", _tBusquedaNormal, "", "");

        if (GetObjGlobales().EsOffline()) {
            BuscarSiguientesConFadeOut();
        } else {
            this.BusquedaServidor();
        }
    },
    CargarMasEmpresas: function () {
        this.NumPagina++;
        this.ListaPintada = "";
        switch (this.TipoBusqueda) {
            case _tBusquedaContiene:
                if (this.txtBuscar.length >= 1) {
                    this.BuscarSiguientes();
                }
                break;
            default:
                this.BuscarSiguientes();
        }
    },
    CambiaIdiomaBuscar: function () {
        if (GetObjGlobales().EsSpanish()) {
            this.btnBuscar.val('Buscar');
        }
        else {
            this.btnBuscar.val('Search');
        }
    },
    //en ListaCompleta tenemos todo
    BusquedaLocal: function () {
        var data;
        var desde = this.NEmpresas * (this.NumPagina - 1);
        var hasta = this.NEmpresas * this.NumPagina;
        if (this.TipoBusqueda == _tBusquedaNormal) {//"TODO"
            data = GetObjListaEmpresas().ListaCompleta.slice(desde, hasta);
            //data = this.ListaCompleta.slice(desde, hasta);
        }
        else {
            data = [];
            if (this.TipoBusqueda == _tBusquedaEmpiezaPor) { //"EMPIEZAPOR"
                var i;
                var cont = 0;
                var j = 0;
                for (i = 0; i < this.ListaCompleta.length; i++) {
                    var cade = this.ListaCompleta[i].no.substring(0, this.txtBuscar.length);
                    var cade = normalize(cade);
                    if (this.txtBuscar != '0') {
                        if (cade.toUpperCase() == this.txtBuscar.toUpperCase()) {
                            if ((cont >= desde) && (cont < hasta)) {
                                data[j] = this.ListaCompleta[i];
                                j++;
                            }
                            cont++;
                        }
                    }
                    else {
                        var cade = cade.toUpperCase();
                        if (!EsLetraAlfabeto(cade)) {
                            if ((cont >= desde) && (cont < hasta)) {
                                data[j] = this.ListaCompleta[i];
                                j++;
                            }
                            cont++;
                        }
                    }
                }
            }
            else { //contiene cadena
                var i;
                var cont = 0;
                var j = 0;
                for (i = 0; i < this.ListaCompleta.length; i++) {
                    var cade = this.ListaCompleta[i].no.toUpperCase();
                    if (cade.indexOf(this.txtBuscar.toUpperCase()) != -1) {
                        if ((cont >= desde) && (cont < hasta)) {
                            data[j] = this.ListaCompleta[i];
                            j++;
                        }
                        cont++;
                    }
                }
            }
        }
        return data;
    },
    BuscarSiguientes: function () {
        //ya tenemos la lista completa en local?
        if (this.Lista_OK) {
            //busqueda en local y pintarlos
            var data = this.BusquedaLocal();
            if (this.tipolistado == "N")
                this.PintarEmpresas(data); 
            else {
                this.PintarEmpresasLogo(data); 
            }
        }
        else {
            //b√∫squeda en server y pintarlos
            this.BusquedaServidor();
        }
    },
    ListarEmpresas: function (pListaEmpresas) {
        var localobj = this;
        if (this.txtBuscar != "") { this.borrartxt.show(); }
        this.ListaInicial = pListaEmpresas;
        if (this.ListaPintada == "") {
            // obtenemos datos guardados anteriormente si los encontramos. en caso contrario llamamos al servicio para obtener las empresas
            var cookieListaEmpresas = this.ObtenerNombreCookie(this.feria) + "Empresas";
            var storedEmpresasTxt = $.DSt.get(cookieListaEmpresas);
            //if this.lista_ok = true
            if (storedEmpresasTxt != null) {
                //los recupero de la cache
                this.SetListaCompleta(storedEmpresasTxt);
                this.NumPagina = 1;
                this.txtBuscar = "";
                BuscarSiguientesConFadeOut();
            }
            else {
                this.CargaInicial();
            }
            this.CambiaIdiomaBuscar();
        }
        else {
            this.ListaInicial.innerHTML = this.ListaPintada;
            if (this.TipoBusqueda == _tBusquedaContiene) {
                this.btnBuscar.val(this.txtBuscar)
            }
            else {
                this.CambiaIdiomaBuscar();
            }

            if (this.EmpresaSeleccionada != '') {
                setTimeout(function () {
                    localobj.myScrollListaEmpr.refresh();
                    localobj.myScrollListaEmpr.scrollToElement(localobj.EmpresaSeleccionada, "0s");
                }, 350);
            }
        }
        this.btnBuscar.focus();
    },
    PintarEmpresasLogo: function (data) {
        var primeraletra;
        var letra = '';
        var i, li, no, id, st, url, txtUbicacion;
        letra = this.ultimaletra;

        if (GetObjGlobales().EsSpanish())
            txtUbicacion = 'Ubicaci√≥n: ';
        else
            txtUbicacion = 'Location: ';

        for (i = 0; i < data.length; i++) {
            no = data[i].no;
            id = data[i].id;
            te = data[i].te;
            st = data[i].st;
            url = data[i].url;
            no = cortaPalabrasListaEmpresas(no, 0);
            primeraletra = normalize(no.substr(0, 1));
            if (primeraletra.toUpperCase() != letra.toUpperCase()) {
                if ((!isNaN(primeraletra)) || (!EsLetraAlfabeto(primeraletra))) {//si es n√∫mero
                    if (letra != '#') {
                        letra = '#';
                        li = document.createElement('li');
                        li.innerText = letra;
                        li.setAttribute('class', 'letraLista');
                        li.setAttribute('id', letra);
                        this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);
                    }
                } else {
                    letra = primeraletra;
                    li = document.createElement('li');
                    li.innerText = letra;
                    li.setAttribute('class', 'letraLista');
                    li.setAttribute('id', letra);
                    this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);
                }
            }
            li = document.createElement('li'); //DDC falta meterlo en propiedad
            var MyA;
            var nLi = "ListaEmpresa" + id;
            var nTa = "Empresa_" + id; //maem
            li.id = nLi;
            li.setAttribute('rel', 'enlace');
            li.setAttribute('class', 'row');
            //si es representada -->> va a su propia ficha
            if (te == 'R') {
                li.setAttribute('href', 'ajax_fichaR.html?i=' + id);
                MyA = ' "ajax_fichaR.html?i=' + id + '" ';
            }
            else {
                li.setAttribute('href', 'ajax_ficha.html?i=' + id);
                MyA = ' "ajax_ficha.html?i=' + id + '" ';
            }

            if (GetObjGlobales().EsOffline()) {
                var MyIm = GetObjGlobales().getRutaFichero("I", url);
            } else {
                var MyIm = GetObjGlobales().rutarecurso + 'Feria=' + this.feria + '&Tipo=I&Fichero=' + url;
            }

            //con load - tabindex='+id+'
            var TFicha = '<div id=' + nTa + '><table><tbody><tr><td><a>' +
                         '<div class="ImgLogo"><img src="" border="0"></div></a></td> ' +
        	             '<td class="espIzquierda"><a>' +
                         '<p class="title">' + no + '</p><p class="note">' + txtUbicacion + st + '</p></a></td></tr></tbody></table></div>';

            this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);
            $('#' + nLi).html(TFicha);
            //con load
            $('#' + nLi).find('img').attr("src", MyIm).load(function () {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                }
            });
        }

        this.ListaPintada = this.ListaInicial.innerHTML;

        this.ultimaletra = letra;
        $('[rel="enlace"]').click(function () {
            navega($(this).attr('href'));
        });

        setTimeout(function () { GetObjListaEmpresas().myScrollListaEmpr.refresh() }, 300);
    },
    PintarEmpresas: function (data) {
        var primeraletra;
        var letra = '';
        var i, li, no, id, te;
        letra = this.ultimaletra;
        for (i = 0; i < data.length; i++) {
            no = data[i].no;
            id = data[i].id;
            te = data[i].te; //tipo de empresa
            no = cortaPalabrasListaEmpresas(no, 0);
            primeraletra = normalize(no.substr(0, 1));
            if (primeraletra.toUpperCase() != letra.toUpperCase()) {
                if ((!isNaN(primeraletra)) || (!EsLetraAlfabeto(primeraletra))) {//si es n√∫mero
                    if (letra != '#') {
                        letra = '#';
                        li = document.createElement('li');
                        li.innerText = letra;
                        li.setAttribute('class', 'letraLista');
                        li.setAttribute('id', letra);
                        this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);
                    }
                } else {
                    letra = primeraletra;
                    li = document.createElement('li');
                    li.innerText = letra;
                    li.setAttribute('class', 'letraLista');
                    li.setAttribute('id', letra);
                    this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);
                }
            }
            li = document.createElement('li');
            //Meter m√©todo para cortar a 50 caracteres el nombre
            var nTa = "Empresa_" + id;
            var nLi = "ListaEmpresa" + id;
            //li.innerText = no;
            li.id = nLi;
            li.setAttribute('rel', 'enlace');

            //si es representada -->> va a su propia ficha
            if (te == 'R')
                li.setAttribute('href', 'ajax_fichaR.html?i=' + id);
            else
                li.setAttribute('href', 'ajax_ficha.html?i=' + id);

            this.ListaInicial.appendChild(li, this.ListaInicial.childNodes[0]);

            var TFicha = '<div id=' + nTa + '> <p>' + no + '</p> </div>';
            $('#' + nLi).html(TFicha);
        }
        this.ListaPintada = this.ListaInicial.innerHTML;
        this.ultimaletra = letra;
        $('[rel="enlace"]').click(function () {
            navega($(this).attr('href'));
        });

        setTimeout(function () { GetObjListaEmpresas().myScrollListaEmpr.refresh() }, 300);
    }
}

//******************************************* INICIO funciones iSroll *****************************

function CrearScrollEmpresas() {
    var pullDownOffset, pullUpEl, pullUpOffset;//no entiendo porque funcioan esto DDC

    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    GetObjListaEmpresas().myScrollListaEmpr = new iScroll('wrapper', {
        useTransition: true,
        hScrollbar: false,
        vScrollbar: true,
        momentum: true,
        useTransform: false,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = GetObjGlobales().DameTraduccion(13); // 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = GetObjGlobales().DameTraduccion(14); //release to refresh
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = GetObjGlobales().DameTraduccion(13); //'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = GetObjGlobales().DameTraduccion(12); // {'Loading...';
                GetObjListaEmpresas().CargarMasEmpresas(); // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


//******************************************* FIN funciones iSroll *****************************




/*function ajustaimagenLogo() {
    $('div.ImgLogo img').each(function () {
        var cual = $(this);
        var ancho = cual.width();
        var alto = cual.height();
        fotilla(ancho, alto, cual, "48", "48");
        ObjListaEmpresas.myScrollListaEmpr.refresh(); //al final de la carga ya se hace un refresh
    });
}*/

function errorAjax(result) {
    //alert('ERROR ' + result.status + ' ' + result.statusText);
    //showPrincipal();
}

function BuscarSiguientesConFadeOut() {
    GetObjListaEmpresas().BuscarSiguientes();
    $('#capaCargador').fadeOut();
}





Ôªøvar idBBDD = 0;
function iniciarDB() {
    try {
        if (window.openDatabase) {
            db = openDatabase("Localdb", "1.0", "BBDD", 200000);
            if (db) {
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS favoritos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, id_objeto TEXT, tipo_objeto int, titulo TEXT, favorito int, fecha DATE, feria TEXT)", [], function (tx, result) {
                    });
                });
            } else {
            }
        } else {
            
        }
    } catch (e) {
    }
};

function primero() {
idBBDD = 0;
    db.transaction(function (tx) {
        tx.executeSql('SELECT id,id_objeto,tipo_objeto, favorito, titulo, fecha FROM favoritos WHERE favorito=1 and feria=? ORDER BY fecha desc', [GetObjGlobales().feria], function (tx, results) {
            if (results.rows && results.rows.length) {
                for (i = 0; i < results.rows.length; i++) {
                    idBBDD++
                }

            } else {
            }
        }, function (tx) {
        });
    });
}

function nFavorito(id_objeto, tipo_objeto, favorito, titulo) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM favoritos WHERE id_objeto=? and tipo_objeto=? and feria=? ', [id_objeto, parseInt(tipo_objeto), GetObjGlobales().feria], function (tx) {
            var fecha_string = new Date();
            var utc = Date.UTC(fecha_string.getFullYear(), fecha_string.getMonth(), fecha_string.getDate(), fecha_string.getHours() - 2, fecha_string.getMinutes(), 0, 0);
            db.transaction(function (tx) {
                var i;
                tx.executeSql('INSERT INTO favoritos (id_objeto,tipo_objeto,titulo,favorito,fecha,feria) values (?, ?, ?, ?, ?,?)', [id_objeto, parseInt(tipo_objeto), titulo, favorito, utc, GetObjGlobales().feria]);
                primero();
            });
        });
    });

}

$(document).ready(function () {
    iniciarDB();
    $("#btAnadir").click(function () {
        nFavorito($("#tbId").val(), $("#tbTipo").val());
    });
});

var _a = '\u00e1';
var _e ='\u00e9';
var _i = '\u00ed';
var _o ='\u00f3';
var _u ='\u00fa';
var _n = '\u00f1';
var _interr = '\u00bf'; 
var _ene = '\u00f1';
var _msgInfo = '<span class="ui-icon ui-icon-lightbulb" style="float: left; margin: 0 7px 20px 0;"></span>';
var _msgError = '<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>';

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]); vars[hash[0]] = hash[1];
    }
    return vars;
}

function getUrlVar(name) {
    return getUrlVars()[name];
}

function EsLetraAlfabeto(letra) {
    letra = letra.toUpperCase();
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', '—', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'].indexOf(normalize(letra)) >= 0)
        return true;
    else
        return false;
}


var normalize = (function () {
    var from = "√¿¡ƒ¬»…À ÃÕœŒ“”÷‘Ÿ⁄‹€„‡·‰‚ËÈÎÍÏÌÔÓÚÛˆÙ˘˙¸˚—Ò«Á",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuu—Òcc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

function getQueryVariable(variable) {
	  var query = window.location.search.substring(1); 
	  var vars = query.split("&"); 
	  for (var i=0;i<vars.length;i++) { 
		  var pair = vars[i].split("=");
		  if (pair[0] == variable) {
		      if (pair[1] == "undefined") {
		          return "";
		      }
		      else {
		          return pair[1];
		      }
		  }
        }
        return "";
}


function getParameterByName(name) { 
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); 
var regexS = "[\\?&]" + name + "=([^&#]*)"; 
var regex = new RegExp(regexS); 
var results = regex.exec(window.location.href); 
if (results == null) { return ""; } else { 
	return decodeURIComponent(results[1].replace(/\+/g, " ")); } }

function sacaParametro(name, ruta) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(ruta); if (results == null) { return ""; } else { return decodeURIComponent(results[1].replace(/\+/g, " ")); } }

function cortaPalabras(palabra, merme) {
    var ancho = $(window).width() - merme;
    var len = Math.round((ancho / 11));
    palabra = String(palabra);
    var lTxt = palabra.length;
    if (palabra != "undefined") {
        palabra = palabra.substr(0, len - 3);
        if (lTxt > (len - 3)) palabra += "...";
        return palabra;
    } else {
    return "";
    }
}

function cortaPalabrasListaEmpresas(palabra, merme) {
    var ancho = $(window).width() - merme;
    var len = Math.round((ancho / 9));
    var lTxt = palabra.length;
    palabra = palabra.substr(0, len - 3);
    if (lTxt > (len - 3)) palabra += "...";
    return palabra;
}

function GetTipoEventoParaClick() {
    return (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? 'touchstart' : 'click';
}


function fotilla(ancho, alto, cual, maxAncho, maxAlto) {


    if ((ancho <= 0) && (alto <= 0)) {
        // cual.attr('width', maxAncho);
        // cual.attr('height', maxAlto);

    }
    else {
        if ((ancho > maxAncho) || (alto > maxAlto)) {
            //Se calculan las coordenadas en caso de que ajustaramos el ancho de la  imagen al ancho disponible
            coorA1 = maxAncho
            coorH1 = Math.floor((maxAncho * alto) / ancho)


            //Se calculan las coordenadas en caso de que ajustaramos el alto de la imagen al alto disponible
            coorA2 = Math.floor((maxAlto * ancho) / alto)
            coorH2 = maxAlto

            //En caso de que se ajusten mejor las coordenadas del primer caso las cogemos
            //si no, se cogen las sel segundo caso

            if ((coorA1 <= maxAncho) && (coorH1 <= maxAlto)) {
                cual.attr('width', coorA1);
                cual.attr('height', coorH1);
            }
            else {
                if ((coorA2 <= maxAncho) && (coorH2 <= maxAlto)) {
                    cual.attr('width', coorA2);
                    cual.attr('height', coorH2);
                }

            }
        }
        else {
            cual.attr('width', ancho);
            cual.attr('height', alto);
        }
        //si ambas imagenes cupieran en el espacio disponible, se coge la del primer caso
    }
}

function online() { return navigator.onLine ? true : false; }


function cerrarApp() {
	navigator.app.exitApp();
}


function cargarScript(urlJs) {
	  var script = document.createElement('script');
	  script.setAttribute('type', 'text/javascript');
	  script.setAttribute('src', urlJs);
	  document.getElementsByTagName('head')[0].appendChild(script);
}



(function(){var g=void 0,h=!0,Ge=null,l=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,da=isNaN,m=Math,ea=decodeURIComponent;function He(a,b){return a.onload=b}function Ie(a,b){return a.onerror=b}function ha(a,b){return a.name=b}
var n="push",ia="test",ja="slice",p="replace",ka="load",la="floor",ma="charAt",na="value",q="indexOf",oa="match",pa="port",qa="createElement",ra="path",r="name",kf="getTime",u="host",v="toString",w="length",x="prototype",sa="clientWidth",y="split",ta="stopPropagation",ua="scope",z="location",va="search",Je="random",A="protocol",wa="clientHeight",xa="href",B="substring",ya="apply",za="navigator",C="join",D="toLowerCase",E;function Aa(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Ba(a){return"function"==typeof a}function Ca(a){return a!=g&&-1<(a.constructor+"")[q]("String")}function F(a,b){return g==a||"-"==a&&!b||""==a}function Da(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[q](a[ma](0));)a=a[B](1);for(;a&&-1<" \n\r\t"[q](a[ma](a[w]-1));)a=a[B](0,a[w]-1);return a}function Ea(){return m.round(2147483647*m[Je]())}function Fa(){}
function G(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);H(68);return escape(a)}function I(a){a=a[y]("+")[C](" ");if(ea instanceof Function)try{return ea(a)}catch(b){H(17)}else H(68);return unescape(a)}var Ga=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ha=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function Ia(a,b){if(a){var c=J[qa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=J.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function K(a){return a&&0<a[w]?a[0]:""}function L(a){var b=a?a[w]:0;return 0<b?a[b-1]:""}var Ja=function(){this.prefix="ga.";this.R={}};Ja[x].set=function(a,b){this.R[this.prefix+a]=b};Ja[x].get=function(a){return this.R[this.prefix+a]};Ja[x].contains=function(a){return this.get(a)!==g};function Ne(){return"https:"==J[z][A]}function Ka(a){0==a[q]("www.")&&(a=a[B](4));return a[D]()}
function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[q]("://");0<=c&&(d.protocol=a[B](0,c),a=a[B](c+3));c=a[va]("/|\\?|#");if(0<=c)d.host=a[B](0,c)[D](),a=a[B](c);else return d.host=a[D](),d;c=a[q]("#");0<=c&&(d.anchor=a[B](c+1),a=a[B](0,c));c=a[q]("?");0<=c&&(Na(d.d,a[B](c+1)),a=a[B](0,c));d.anchor&&b&&Na(d.d,d.anchor);a&&"/"==a[ma](0)&&(a=a[B](1));d.path=a;return d}
function Oa(a,b){function c(a){var b=(a.hostname||"")[y](":")[0][D](),c=(a[A]||"")[D](),c=1*a[pa]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";0==a[q]("/")||(a="/"+a);return[b,""+c,a]}var d=b||J[qa]("a");d.href=J[z][xa];var e=(d[A]||"")[D](),f=c(d),Be=d[va]||"",k=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[q]("//")?a=e+a:0==a[q]("/")?a=k+a:!a||0==a[q]("?")?a=k+f[2]+(a||Be):0>a[y]("/")[0][q](":")&&(a=k+f[2][B](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[A]||"")[D](),host:e[0],
port:e[1],path:e[2],Oa:d[va]||"",url:a||""}}function Na(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[n](c)}for(var d=Da(b)[y]("&"),e=0;e<d[w];e++)if(d[e]){var f=d[e][q]("=");0>f?c(d[e],"1"):c(d[e][B](0,f),d[e][B](f+1))}}function Pa(a,b){if(F(a)||"["==a[ma](0)&&"]"==a[ma](a[w]-1))return"-";var c=J.domain;return a[q](c+(b&&"/"!=b?b:""))==(0==a[q]("http://")?7:0==a[q]("https://")?8:0)?"0":a};var Qa=0;function Ra(a,b,c){!(1<=Qa)&&!(1<=100*m[Je]())&&(a=["utmt=error","utmerr="+a,"utmwv=5.4.1","utmn="+Ea(),"utmsp=1"],b&&a[n]("api="+b),c&&a[n]("msg="+G(c[B](0,100))),M.w&&a[n]("aip=1"),Sa(a[C]("&")),Qa++)};var Ta=0,Ua={};function N(a){return Va("x"+Ta++,a)}function Va(a,b){Ua[a]=!!b;return a}
var Wa=N(),Xa=Va("anonymizeIp"),Ya=N(),$a=N(),ab=N(),bb=N(),O=N(),P=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(),Eb=N(),Fb=N(h),Gb=Va("currencyCode"),Hb=Va("page"),Ib=Va("title"),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Qb=N(),Rb=N(),Q=N(h),Sb=N(h),Tb=N(h),Ub=N(h),Vb=N(h),Wb=N(h),Zb=N(h),$b=N(h),ac=N(h),bc=N(h),cc=N(h),R=N(h),dc=N(h),ec=N(h),fc=
N(h),gc=N(h),hc=N(h),ic=N(h),jc=N(h),S=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=N(h),pc=N(h),qc=N(h),rc=Va("campaignParams"),sc=N(),tc=Va("hitCallback"),uc=N();N();var vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N(),Ec=N(),Fc=N(),Gc=N(),Hc=N(),Ic=N();N();var Mc=N(),Nc=N(),Oc=N(),Oe=Va("uaName"),Pe=Va("uaDomain"),Qe=Va("uaPath");var Re=function(){function a(a,c,d){T($[x],a,c,d)}a("_createTracker",$[x].r,55);a("_getTracker",$[x].oa,0);a("_getTrackerByName",$[x].u,51);a("_getTrackers",$[x].pa,130);a("_anonymizeIp",$[x].aa,16);a("_forceSSL",$[x].la,125);a("_getPlugin",Pc,120)},Se=function(){function a(a,c,d){T(U[x],a,c,d)}Qc("_getName",$a,58);Qc("_getAccount",Wa,64);Qc("_visitCode",Q,54);Qc("_getClientInfo",ib,53,1);Qc("_getDetectTitle",lb,56,1);Qc("_getDetectFlash",jb,65,1);Qc("_getLocalGifPath",wb,57);Qc("_getServiceMode",
xb,59);V("_setClientInfo",ib,66,2);V("_setAccount",Wa,3);V("_setNamespace",Ya,48);V("_setAllowLinker",fb,11,2);V("_setDetectFlash",jb,61,2);V("_setDetectTitle",lb,62,2);V("_setLocalGifPath",wb,46,0);V("_setLocalServerMode",xb,92,g,0);V("_setRemoteServerMode",xb,63,g,1);V("_setLocalRemoteServerMode",xb,47,g,2);V("_setSampleRate",vb,45,1);V("_setCampaignTrack",kb,36,2);V("_setAllowAnchor",gb,7,2);V("_setCampNameKey",ob,41);V("_setCampContentKey",tb,38);V("_setCampIdKey",nb,39);V("_setCampMediumKey",
rb,40);V("_setCampNOKey",ub,42);V("_setCampSourceKey",qb,43);V("_setCampTermKey",sb,44);V("_setCampCIdKey",pb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",yb,0,1);V("_setVisitorCookieTimeout",cb,28,1);V("_setSessionCookieTimeout",db,26,1);V("_setCampaignCookieTimeout",eb,29,1);V("_setReferrerOverride",Jb,49);V("_setSiteSpeedSampleRate",Dc,132);a("_trackPageview",U[x].Fa,1);a("_trackEvent",U[x].F,4);a("_trackPageLoadTime",U[x].Ea,100);a("_trackSocial",U[x].Ga,104);a("_trackTrans",U[x].Ia,
18);a("_sendXEvent",U[x].t,78);a("_createEventTracker",U[x].ia,74);a("_getVersion",U[x].qa,60);a("_setDomainName",U[x].B,6);a("_setAllowHash",U[x].va,8);a("_getLinkerUrl",U[x].na,52);a("_link",U[x].link,101);a("_linkByPost",U[x].ua,102);a("_setTrans",U[x].za,20);a("_addTrans",U[x].$,21);a("_addItem",U[x].Y,19);a("_clearTrans",U[x].ea,105);a("_setTransactionDelim",U[x].Aa,82);a("_setCustomVar",U[x].wa,10);a("_deleteCustomVar",U[x].ka,35);a("_getVisitorCustomVar",U[x].ra,50);a("_setXKey",U[x].Ca,83);
a("_setXValue",U[x].Da,84);a("_getXKey",U[x].sa,76);a("_getXValue",U[x].ta,77);a("_clearXKey",U[x].fa,72);a("_clearXValue",U[x].ga,73);a("_createXObj",U[x].ja,75);a("_addIgnoredOrganic",U[x].W,15);a("_clearIgnoredOrganic",U[x].ba,97);a("_addIgnoredRef",U[x].X,31);a("_clearIgnoredRef",U[x].ca,32);a("_addOrganic",U[x].Z,14);a("_clearOrganic",U[x].da,70);a("_cookiePathCopy",U[x].ha,30);a("_get",U[x].ma,106);a("_set",U[x].xa,107);a("_addEventListener",U[x].addEventListener,108);a("_removeEventListener",
U[x].removeEventListener,109);a("_addDevId",U[x].V);a("_getPlugin",Pc,122);a("_setPageGroup",U[x].ya,126);a("_trackTiming",U[x].Ha,124);a("_initData",U[x].v,2);a("_setVar",U[x].Ba,22);V("_setSessionTimeout",db,27,3);V("_setCookieTimeout",eb,25,3);V("_setCookiePersistence",cb,24,1);a("_setAutoTrackOutbound",Fa,79);a("_setTrackOutboundSubdomains",Fa,81);a("_setHrefExamineLimit",Fa,80)};function Pc(a){var b=this.plugins_;if(b)return b.get(a)}
var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&H(d),c[ya](this,arguments)}catch(a){throw Ra("exc",b,a&&a[r]),a;}}},Qc=function(a,b,c,d){U[x][a]=function(){try{return H(c),Aa(this.a.get(b),d)}catch(e){throw Ra("exc",a,e&&e[r]),e;}}},V=function(a,b,c,d,e){U[x][a]=function(f){try{H(c),e==g?this.a.set(b,Aa(f,d)):this.a.set(b,e)}catch(Be){throw Ra("exc",a,Be&&Be[r]),Be;}}},Te=function(a,b){return{type:b,target:a,stopPropagation:function(){throw"aborted";}}};var Rc=RegExp(/(^|\.)doubleclick\.net$/i),Sc=function(a,b){return Rc[ia](J[z].hostname)?h:"/"!==b?l:(0==a[q]("www.google.")||0==a[q](".google.")||0==a[q]("google."))&&!(-1<a[q]("google.org"))?h:l},Tc=function(a){var b=a.get(bb),c=a.c(P,"/");Sc(b,c)&&a[ta]()};var Zc=function(){var a={},b={},c=new Uc;this.g=function(a,b){c.add(a,b)};var d=new Uc;this.e=function(a,b){d.add(a,b)};var e=l,f=l,Be=h;this.T=function(){e=h};this.j=function(a){this[ka]();this.set(sc,a,h);a=new Vc(this);e=l;d.execute(this);e=h;b={};this.n();a.Ja()};this.load=function(){e&&(e=l,this.Ka(),Wc(this),f||(f=h,c.execute(this),Xc(this),Wc(this)),e=h)};this.n=function(){if(e)if(f)e=l,Xc(this),e=h;else this[ka]()};this.get=function(c){Ua[c]&&this[ka]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ka]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.Za=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.Ka=function(){if(Be){var b=this.c(bb,""),c=this.c(P,"/");Sc(b,c)||(a[O]=a[hb]&&""!=b?Yc(b):1,Be=l)}}};Zc[x].stopPropagation=function(){throw"aborted";};
var Vc=function(a){var b=this;this.q=0;var c=a.get(tc);this.Ua=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ja=function(){!b.q&&c&&ca(c,10)};a.set(uc,b,h)};function $c(a,b){b=b||[];for(var c=0;c<b[w];c++){var d=b[c];if(""+a==d||0==d[q](a+"."))return d}return"-"}
var bd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(6!==b[w]||ad(b[0],c))return l;c=1*b[1];var d=1*b[2],e=1*b[3],f=1*b[4];b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return l;a.set(Q,c);a.set(Vb,d);a.set(Wb,e);a.set(Zb,f);a.set($b,b);return h},cd=function(a){var b=a.get(Q),c=a.get(Vb),d=a.get(Wb),e=a.get(Zb),f=a.b($b,1);return[a.b(O,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][C](".")},dd=function(a){return[a.b(O,1),a.b(cc,0),a.b(R,1),a.b(dc,0)][C](".")},ed=function(a,b,c){c=c?"":a.c(O,"1");var d=b[y](".");
if(4!==d[w]||ad(d[0],c))d=Ge;a.set(cc,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(dc,d?1*d[3]:a.get(ab));return d!=Ge||!ad(b,c)},fd=function(a,b){var c=G(a.c(Tb,"")),d=[],e=a.get(Fb);if(!b&&e){for(var f=0;f<e[w];f++){var Be=e[f];Be&&1==Be[ua]&&d[n](f+"="+G(Be[r])+"="+G(Be[na])+"=1")}0<d[w]&&(c+="|"+d[C]("^"))}return c?a.b(O,1)+"."+c:Ge},gd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(2>b[w]||ad(b[0],c))return l;b=b[ja](1)[C](".")[y]("|");0<b[w]&&a.set(Tb,I(b[0]));if(1>=b[w])return h;b=b[1][y](-1==
b[1][q](",")?"^":",");for(c=0;c<b[w];c++){var d=b[c][y]("=");if(4==d[w]){var e={};ha(e,I(d[1]));e.value=I(d[2]);e.scope=1;a.get(Fb)[d[0]]=e}}return h},hd=function(a,b){var c=Ue(a,b);return c?[a.b(O,1),a.b(ec,0),a.b(fc,1),a.b(gc,1),c][C]("."):""},Ue=function(a){function b(b,e){if(!F(a.get(b))){var f=a.c(b,""),f=f[y](" ")[C]("%20"),f=f[y]("+")[C]("%20");c[n](e+"="+f)}}var c=[];b(ic,"utmcid");b(nc,"utmcsr");b(S,"utmgclid");b(kc,"utmgclsrc");b(lc,"utmdclid");b(mc,"utmdsid");b(jc,"utmccn");b(oc,"utmcmd");
b(pc,"utmctr");b(qc,"utmcct");return c[C]("|")},id=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(5>b[w]||ad(b[0],c))return a.set(ec,g),a.set(fc,g),a.set(gc,g),a.set(ic,g),a.set(jc,g),a.set(nc,g),a.set(oc,g),a.set(pc,g),a.set(qc,g),a.set(S,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),l;a.set(ec,1*b[1]);a.set(fc,1*b[2]);a.set(gc,1*b[3]);Ve(a,b[ja](4)[C]("."));return h},Ve=function(a,b){function c(a){return(a=b[oa](a+"=(.*?)(?:\\|utm|$)"))&&2==a[w]?a[1]:g}function d(b,c){c?(c=e?I(c):c[y]("%20")[C](" "),
a.set(b,c)):a.set(b,g)}-1==b[q]("=")&&(b=I(b));var e="2"==c("utmcvr");d(ic,c("utmcid"));d(jc,c("utmccn"));d(nc,c("utmcsr"));d(oc,c("utmcmd"));d(pc,c("utmctr"));d(qc,c("utmcct"));d(S,c("utmgclid"));d(kc,c("utmgclsrc"));d(lc,c("utmdclid"));d(mc,c("utmdsid"))},ad=function(a,b){return b?a!=b:!/^\d+$/[ia](a)};var Uc=function(){this.filters=[]};Uc[x].add=function(a,b){this.filters[n]({name:a,s:b})};Uc[x].execute=function(a){try{for(var b=0;b<this.filters[w];b++)this.filters[b].s.call(W,a)}catch(c){}};function jd(a){100!=a.get(vb)&&a.get(Q)%1E4>=100*a.get(vb)&&a[ta]()}function kd(a){ld(a.get(Wa))&&a[ta]()}function md(a){"_file:"==J[z][A]&&a[ta]()}function nd(a){a.get(Ib)||a.set(Ib,J.title,h);a.get(Hb)||a.set(Hb,J[z].pathname+J[z][va],h)};var od=new function(){var a=[];this.set=function(b){a[b]=h};this.Xa=function(){for(var b=[],c=0;c<a[w];c++)a[c]&&(b[m[la](c/6)]=b[m[la](c/6)]^1<<c%6);for(c=0;c<b[w];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[ma](b[c]||0);return b[C]("")+"~"}};function H(a){od.set(a)};var W=window,J=document,ld=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},We=function(a,b){ca(a,b)},pd=function(a){var b=[],c=J.cookie[y](";");a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[w];d++){var e=c[d][oa](a);e&&b[n](e[1])}return b},X=function(a,b,c,d,e,f){e=ld(e)?l:Sc(d,c)?l:h;if(e){if(b&&0<=W[za].userAgent[q]("Firefox")){b=b[p](/\n|\r/g," ");e=0;for(var Be=b[w];e<Be;++e){var k=b.charCodeAt(e)&255;if(10==k||13==k)b=b[B](0,e)+"?"+b[B](e+1)}}b&&
2E3<b[w]&&(b=b[B](0,2E3),H(69));a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date)[kf]()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");J.cookie=a}};var qd,rd,sd=function(){if(!qd){var a={},b=W[za],c=W.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[D]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";try{var d;var e=J.documentElement,f=J.body,Be=f&&f[sa]&&f[wa],b=[];e&&(e[sa]&&e[wa])&&("CSS1Compat"===J.compatMode||!Be)?b=[e[sa],e[wa]]:Be&&(b=[f[sa],f[wa]]);d=0>=b[0]||0>=b[1]?"":b[C]("x");a.Wa=d}catch(k){H(135)}qd=a}},td=function(){sd();
for(var a=qd,b=W[za],a=b.appName+b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[w],c=W.history[w];0<c;)a+=c--^b++;return Yc(a)},ud=function(a){sd();var b=qd;a.set(Lb,b.Q);a.set(Mb,b.P);a.set(Pb,b.language);a.set(Qb,b.characterSet);a.set(Nb,b.javaEnabled);a.set(Rb,b.Wa);if(a.get(ib)&&a.get(jb)){if(!(b=rd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[za])?b.plugins:g)&&0<b[w])for(c=0;c<b[w]&&!e;c++)d=b[c],-1<d[r][q]("Shockwave Flash")&&
(e=d.description[y]("Shockwave Flash ")[1]);else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(Be){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(k){}e&&(e=e[y](" ")[1][y](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}rd=b;a.set(Ob,rd)}else a.set(Ob,"-")};var vd=function(a){if(Ba(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[B](0,d),this.h=b[B](d+1)):-1!=c&&-1==d?(this.l=b[B](0,c),this.h=b[B](c+1)):c>d?(this.i=b[B](0,d),this.l=b[B](d+1,c),this.h=b[B](c+1)):(this.i=b[B](0,d),this.h=b[B](d+1));this.k=a[ja](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[x],"push",Y[x][n],5);T(Y[x],"_getPlugin",Pc,121);T(Y[x],
"_createAsyncTracker",Y[x].Sa,33);T(Y[x],"_getAsyncTracker",Y[x].Ta,34);this.I=new Ja;this.p=[]};E=Y[x];E.Na=function(a,b,c){var d=this.I.get(a);if(!Ba(d))return l;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};E.push=function(a){var b=Z.Va[ya](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[w]&&!Z.O(b[0])&&!(b.shift(),0<Z.p[w]););Z.p=Z.p.concat(b);return 0};E.Va=function(a){for(var b=[],c=0;c<arguments[w];c++)try{var d=new vd(arguments[c]);d.J?this.O(d):b[n](d)}catch(e){}return b};
E.O=function(a){try{if(a.s)a.s[ya](W);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Ma){if(!this.Na(a.k[0],b,a.k[2])){if(!a.Pa){var c=Oa(""+a.k[1]);var d=c[A],e=J[z][A];var f;if(f="https:"==d||d==e?h:"http:"!=d?l:"http:"==e){var Be;a:{var k=Oa(J[z][xa]);if(!(c.Oa||0<=c.url[q]("?")||0<=c[ra][q]("://")||c[u]==k[u]&&c[pa]==k[pa]))for(var s="http:"==c[A]?80:443,t=M.S,b=0;b<t[w];b++)if(c[u]==t[b][0]&&(c[pa]||s)==(t[b][1]||s)&&0==c[ra][q](t[b][2])){Be=h;break a}Be=
l}f=Be&&!ld()}f&&(a.Pa=Ia(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][ya](b,a.k)}}catch(Za){}};E.Sa=function(a,b){return M.r(a,b||"")};E.Ta=function(a){return M.u(a)};var yd=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<Be[w];d++)if(g!=f[a][Be[d]]){c=l;break}c&&(f[a]=g)}}function d(a){var b="",c=l,d,e;for(d=0;d<Be[w];d++)if(e=a[Be[d]],g!=e){c&&(b+=Be[d]);for(var c=[],f=g,ga=g,ga=0;ga<e[w];ga++)if(g!=e[ga]){f="";ga!=mb&&g==e[ga-1]&&(f+=ga[v]()+Za);for(var Cd=e[ga],Jc="",Yb=g,Kc=g,Lc=g,Yb=0;Yb<
Cd[w];Yb++)Kc=Cd[ma](Yb),Lc=Ma[Kc],Jc+=g!=Lc?Lc:Kc;f+=Jc;c[n](f)}b+=k+c[C](t)+s;c=l}else c=h;return b}var e=this,f=[],Be=["k","v"],k="(",s=")",t="*",Za="!",Ma={"'":"'0"};Ma[s]="'1";Ma[t]="'2";Ma[Za]="'3";var mb=1;e.Ra=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[w];b++)g!=f[b]&&(a+=b[v]()+d(f[b]));return a};e.Qa=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[w];c++)g!=f[c]&&!a.Ra(c)&&(b+=c[v]()+d(f[c]));return b};e.f=function(b,c,d){if(!wd(d))return l;a(b,"k",c,d);return h};
e.o=function(b,c,d){if(!xd(d))return l;a(b,"v",c,d[v]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.N,88);T(e,"_clearKey",e.L,85);T(e,"_clearValue",e.M,86)};function wd(a){return"string"==typeof a}function xd(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||m.round(a)!=a||da(a)||a==ba?l:h};var zd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},Ad=function(){var a=zd(h).hid;a==Ge&&(a=Ea(),zd(h).hid=a);return a},Dd=function(a){a.set(Kb,Ad());var b=zd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&("0"==c&&H(112),a.set(Zb,c),a.get(Sb)&&a.set(Wb,c));b=b.vid;a.get(Sb)&&b&&(b=b[y]("."),1*b[1]||H(112),a.set(Q,1*b[0]),a.set(Vb,1*b[1]))}};var Ed,Fd=function(a,b,c,d){var e=a.c(bb,""),f=a.c(P,"/");d=d!=g?d:a.b(cb,0);a=a.c(Wa,"");X(b,c,f,e,a,d)},Xc=function(a){var b=a.c(bb,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",cd(a),c,b,d,a.get(cb));X("__utmb",dd(a),c,b,d,a.get(db));X("__utmc",""+a.b(O,1),c,b,d);var e=hd(a,h);e?X("__utmz",e,c,b,d,a.get(eb)):X("__utmz","",c,b,"",-1);(e=fd(a,l))?X("__utmv",e,c,b,d,a.get(cb)):X("__utmv","",c,b,"",-1)},Wc=function(a){var b=a.b(O,1);if(!bd(a,$c(b,pd("__utma"))))return a.set(Ub,h),l;var c=!ed(a,
$c(b,pd("__utmb")));a.set(bc,c);id(a,$c(b,pd("__utmz")));gd(a,$c(b,pd("__utmv")));Ed=!c;return h},Gd=function(a){!Ed&&!(0<pd("__utmb")[w])&&(X("__utmd","1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),1E4),0==pd("__utmd")[w]&&a[ta]())};var Jd=function(a){a.get(Q)==g?Hd(a):a.get(Ub)&&!a.get(Mc)?Hd(a):a.get(bc)&&Id(a)},Kd=function(a){a.get(hc)&&!a.get(ac)&&(Id(a),a.set(fc,a.get($b)))},Hd=function(a){var b=a.get(ab);a.set(Sb,h);a.set(Q,Ea()^td(a)&2147483647);a.set(Tb,"");a.set(Vb,b);a.set(Wb,b);a.set(Zb,b);a.set($b,1);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,b);a.set(Fb,[]);a.set(Ub,l);a.set(bc,l)},Id=function(a){a.set(Wb,a.get(Zb));a.set(Zb,a.get(ab));a.Za($b);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,a.get(ab));a.set(bc,l)};var Ld="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q 360.cn:q".split(" "),
Sd=function(a){if(a.get(kb)&&!a.get(Mc)){for(var b=!F(a.get(ic))||!F(a.get(nc))||!F(a.get(S))||!F(a.get(lc)),c={},d=0;d<Md[w];d++){var e=Md[d];c[e]=a.get(e)}(d=a.get(rc))?(H(149),e=new Ja,Na(e,d),d=e):d=La(J[z][xa],a.get(gb)).d;if(!("1"==L(d.get(a.get(ub)))&&b)&&(d=Xe(a,d)||Qd(a),!d&&(!b&&a.get(ac))&&(Pd(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h),d&&(a.set(hc,Rd(a,c)),b="(direct)"==a.get(nc)&&"(direct)"==a.get(jc)&&"(none)"==a.get(oc),a.get(hc)||a.get(ac)&&!b)))a.set(ec,a.get(ab)),a.set(fc,
a.get($b)),a.Za(gc)}},Xe=function(a,b){function c(c,d){d=d||"-";var e=L(b.get(a.get(c)));return e&&"-"!=e?I(e):d}var d=L(b.get(a.get(nb)))||"-",e=L(b.get(a.get(qb)))||"-",f=L(b.get(a.get(pb)))||"-",Be=L(b.get("gclsrc"))||"-",k=L(b.get("dclid"))||"-",s=c(ob,"(not set)"),t=c(rb,"(not set)"),Za=c(sb),Ma=c(tb);if(F(d)&&F(f)&&F(k)&&F(e))return l;var mb=!F(f)&&!F(Be),mb=F(e)&&(!F(k)||mb),Xb=F(Za);if(mb||Xb){var Bd=Nd(a),Bd=La(Bd,h);if((Bd=Od(a,Bd))&&!F(Bd[1]&&!Bd[2]))mb&&(e=Bd[0]),Xb&&(Za=Bd[1])}Pd(a,d,
e,f,Be,k,s,t,Za,Ma);return h},Qd=function(a){var b=Nd(a),c=La(b,h);if(!(b!=g&&b!=Ge&&""!=b&&"0"!=b&&"-"!=b&&0<=b[q]("://"))||c&&-1<c[u][q]("google")&&c.d.contains("q")&&"cse"==c[ra])return l;if((b=Od(a,c))&&!b[2])return Pd(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(ac))return l;a:{for(var b=a.get(Bb),d=Ka(c[u]),e=0;e<b[w];++e)if(-1<d[q](b[e])){a=l;break a}Pd(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[ra]);a=h}return a},Od=function(a,b){for(var c=a.get(zb),d=0;d<c[w];++d){var e=c[d][y](":");
if(-1<b[u][q](e[0][D]())){var f=b.d.get(e[1]);if(f&&(f=K(f),!f&&-1<b[u][q]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[q](e[3]))){a:{for(var c=f,d=a.get(Ab),c=I(c)[D](),Be=0;Be<d[w];++Be)if(c==d[Be]){c=h;break a}c=l}return[e[2]||e[0],f,c]}}}return Ge},Pd=function(a,b,c,d,e,f,Be,k,s,t){a.set(ic,b);a.set(nc,c);a.set(S,d);a.set(kc,e);a.set(lc,f);a.set(jc,Be);a.set(oc,k);a.set(pc,s);a.set(qc,t)},Md=[jc,ic,S,lc,nc,oc,pc,qc],Rd=function(a,b){function c(a){a=(""+a)[y]("+")[C]("%20");return a=a[y](" ")[C]("%20")}
function d(c){var d=""+(a.get(c)||"");c=""+(b[c]||"");return 0<d[w]&&d==c}if(d(S)||d(lc))return H(131),l;for(var e=0;e<Md[w];e++){var f=Md[e],Be=b[f]||"-",f=a.get(f)||"-";if(c(Be)!=c(f))return h}return l},Td=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Nd=function(a){a=Pa(a.get(Jb),a.get(P));try{if(Td[ia](a))return H(136),a+"?q="}catch(b){H(145)}return a};var Ud,Vd,Wd=function(a){Ud=a.c(S,"");Vd=a.c(kc,"")},Xd=function(a){var b=a.c(S,""),c=a.c(kc,"");b!=Ud&&(-1<c[q]("ds")?a.set(mc,g):!F(Ud)&&-1<Vd[q]("ds")&&a.set(mc,Ud))};var Zd=function(a){Yd(a,J[z][xa])?(a.set(Mc,h),H(12)):a.set(Mc,l)},Yd=function(a,b){if(!a.get(fb))return l;var c=La(b,a.get(gb)),d=K(c.d.get("__utma")),e=K(c.d.get("__utmb")),f=K(c.d.get("__utmc")),Be=K(c.d.get("__utmx")),k=K(c.d.get("__utmz")),s=K(c.d.get("__utmv")),c=K(c.d.get("__utmk"));if(Yc(""+d+e+f+Be+k+s)!=c){d=I(d);e=I(e);f=I(f);Be=I(Be);f=$d(d+e+f+Be,k,s,c);if(!f)return l;k=f[0];s=f[1]}if(!bd(a,d,h))return l;ed(a,e,h);id(a,k,h);gd(a,s,h);ae(a,Be,h);return h},ce=function(a,b,c){var d;d=cd(a)||
"-";var e=dd(a)||"-",f=""+a.b(O,1)||"-",Be=be(a)||"-",k=hd(a,l)||"-";a=fd(a,l)||"-";var s=Yc(""+d+e+f+Be+k+a),t=[];t[n]("__utma="+d);t[n]("__utmb="+e);t[n]("__utmc="+f);t[n]("__utmx="+Be);t[n]("__utmz="+k);t[n]("__utmv="+a);t[n]("__utmk="+s);d=t[C]("&");if(!d)return b;e=b[q]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[q]("?");0<e&&(c=b[B](e),b=b[B](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},$d=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Yc(a+b+c))return H(127),[b,c];var Be=b[p](/ /g,
"%20"),k=c[p](/ /g,"%20");if(d==Yc(a+Be+k))return H(128),[Be,k];Be=Be[p](/\+/g,"%20");k=k[p](/\+/g,"%20");if(d==Yc(a+Be+k))return H(129),[Be,k];try{var s=b[oa]("utmctr=(.*?)(?:\\|utm|$)");if(s&&2==s[w]&&(Be=b[p](s[1],G(I(s[1]))),d==Yc(a+Be+c)))return H(139),[Be,c]}catch(t){}b=I(b)}c=I(c)}};var de="|",fe=function(a,b,c,d,e,f,Be,k,s){var t=ee(a,b);t||(t={},a.get(Cb)[n](t));t.id_=b;t.affiliation_=c;t.total_=d;t.tax_=e;t.shipping_=f;t.city_=Be;t.state_=k;t.country_=s;t.items_=t.items_||[];return t},ge=function(a,b,c,d,e,f,Be){a=ee(a,b)||fe(a,b,"",0,0,0,"","","");var k;a:{if(a&&a.items_){k=a.items_;for(var s=0;s<k[w];s++)if(k[s].sku_==c){k=k[s];break a}}k=Ge}s=k||{};s.transId_=b;s.sku_=c;s.name_=d;s.category_=e;s.price_=f;s.quantity_=Be;k||a.items_[n](s);return s},ee=function(a,b){for(var c=
a.get(Cb),d=0;d<c[w];d++)if(c[d].id_==b)return c[d];return Ge};var he,ie=function(a){if(!he){var b;b=J[z].hash;var c=W[r],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[oa](d)||c&&c[oa](d))?b[1]:K(pd("GASO")))&&b[oa](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))Fd(a,"GASO",""+b,0),M._gasoDomain=a.get(bb),M._gasoCPath=a.get(P),a=c[1],Ia("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Ea(),"_gasojs");he=h}};var ae=function(a,b,c){c&&(b=I(b));c=a.b(O,1);b=b[y](".");!(2>b[w])&&/^\d+$/[ia](b[0])&&(b[0]=""+c,Fd(a,"__utmx",b[C]("."),g))},be=function(a,b){var c=$c(a.get(O),pd("__utmx"));"-"==c&&(c="");return b?G(c):c},Ye=function(a){try{var b=La(J[z][xa],l),c=ea(L(b.d.get("utm_referrer")))||"";c&&a.set(Jb,c);var d=W.gaData&&W.gaData.expId;d||(d=ea(K(b.d.get("utm_expid")))||"");d&&a.set(Oc,""+d)}catch(e){H(146)}};var ke=function(a,b){var c=m.min(a.b(Dc,0),100);if(a.b(Q,0)%100>=c)return l;c=Ze()||$e();if(c==g)return l;var d=c[0];if(d==g||d==ba||da(d))return l;0<d?af(c)?b(je(c)):b(je(c[ja](0,1))):Ga(W,"load",function(){ke(a,b)},l);return h},me=function(a,b,c,d){var e=new yd;e.f(14,90,b[B](0,500));e.f(14,91,a[B](0,150));e.f(14,92,""+le(c));d!=g&&e.f(14,93,d[B](0,500));e.o(14,90,c);return e},af=function(a){for(var b=1;b<a[w];b++)if(da(a[b])||a[b]==ba||0>a[b])return l;return h},le=function(a){return da(a)||0>a?
0:5E3>a?10*m[la](a/10):5E4>a?100*m[la](a/100):41E5>a?1E3*m[la](a/1E3):41E5},je=function(a){for(var b=new yd,c=0;c<a[w];c++)b.f(14,c+1,""+le(a[c])),b.o(14,c+1,a[c]);return b},Ze=function(){var a=W.performance||W.webkitPerformance;if(a=a&&a.timing){var b=a.navigationStart;if(0==b)H(133);else return[a.loadEventStart-b,a.domainLookupEnd-a.domainLookupStart,a.connectEnd-a.connectStart,a.responseStart-a.requestStart,a.responseEnd-a.responseStart,a.fetchStart-b,a.domInteractive-b,a.domContentLoadedEventStart-
b]}},$e=function(){if(W.top==W){var a=W.external,b=a&&a.onloadT;a&&!a.isValidLoadTime&&(b=g);2147483648<b&&(b=g);0<b&&a.setPageReadyTime();return b==g?g:[b]}};var cf=function(a){if(a.get(Sb))try{var b;a:{var c=pd(a.get(Oe)||"_ga");if(c&&!(1>c[w])){for(var d=[],e=0;e<c[w];e++){var f;var Be=c[e][y]("."),k=Be.shift();if(("GA1"==k||"1"==k)&&1<Be[w]){var s=Be.shift()[y]("-");1==s[w]&&(s[1]="1");s[0]*=1;s[1]*=1;f={Ya:s,$a:Be[C](".")}}else f=g;f&&d[n](f)}if(1==d[w]){b=d[0].$a;break a}if(0!=d[w]){var t=a.get(Pe)||a.get(bb),d=bf(d,(0==t[q](".")?t.substr(1):t)[y](".")[w],0);if(1==d[w]){b=d[0].$a;break a}var Za=a.get(Qe)||a.get(P);(c=Za)?(1<c[w]&&"/"==c[ma](c[w]-
1)&&(c=c.substr(0,c[w]-1)),0!=c[q]("/")&&(c="/"+c),Za=c):Za="/";d=bf(d,"/"==Za?1:Za[y]("/")[w],1);b=d[0].$a;break a}}b=g}if(b){var Ma=(""+b)[y](".");2==Ma[w]&&/[0-9.]/[ia](Ma)&&(H(114),a.set(Q,Ma[0]),a.set(Vb,Ma[1]),a.set(Sb,l))}}catch(mb){H(115)}},bf=function(a,b,c){for(var d=[],e=[],f=128,Be=0;Be<a[w];Be++){var k=a[Be];if(k.Ya[c]==b)d[n](k);else if(k.Ya[c]==f)e[n](k);else k.Ya[c]<f&&(e=[k],f=k.Ya[c])}return 0<d[w]?d:e};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Nc)[a])&&b[w])for(var c=Te(e,a),d=0;d<b[w];d++)b[d].call(e,c)}}var e=this;this.a=new Zc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set($a,a||"");this.set(Ya,c||"");this.set(ab,m.round((new Date)[kf]()/1E3));this.set(P,"/");this.set(cb,63072E6);this.set(eb,15768E6);this.set(db,18E5);this.set(fb,l);this.set(yb,50);this.set(gb,l);this.set(hb,h);this.set(ib,
h);this.set(jb,h);this.set(kb,h);this.set(lb,h);this.set(ob,"utm_campaign");this.set(nb,"utm_id");this.set(pb,"gclid");this.set(qb,"utm_source");this.set(rb,"utm_medium");this.set(sb,"utm_term");this.set(tb,"utm_content");this.set(ub,"utm_nooverride");this.set(vb,100);this.set(Dc,1);this.set(Ec,l);this.set(wb,"/__utm.gif");this.set(xb,1);this.set(Cb,[]);this.set(Fb,[]);this.set(zb,Ld[ja](0));this.set(Ab,[]);this.set(Bb,[]);this.B("auto");this.set(Jb,J.referrer);Ye(this.a);this.set(Nc,{hit:[],load:[]});
this.a.g("0",Zd);this.a.g("1",Wd);this.a.g("2",Jd);this.a.g("3",cf);this.a.g("4",Sd);this.a.g("5",Xd);this.a.g("6",Kd);this.a.g("7",d("load"));this.a.g("8",ie);this.a.e("A",kd);this.a.e("B",md);this.a.e("C",Jd);this.a.e("D",jd);this.a.e("E",Tc);this.a.e("F",ne);this.a.e("G",Gd);this.a.e("H",nd);this.a.e("I",ud);this.a.e("J",Dd);this.a.e("K",d("hit"));this.a.e("L",oe);this.a.e("M",pe);0===this.get(ab)&&H(111);this.a.T();this.H=g};E=U[x];
E.m=function(){var a=this.get(Db);a||(a=new yd,this.set(Db,a));return a};E.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};E.K=function(a){if(this.get(Ec))return l;var b=this,c=ke(this.a,function(c){b.set(Hb,a,h);b.t(c)});this.set(Ec,c);return c};E.Fa=function(a){a&&Ca(a)?(H(13),this.set(Hb,a,h)):"object"===typeof a&&a!==Ge&&this.La(a);this.H=a=this.get(Hb);this.a.j("page");this.K(a);42==m[la](1E4*m[Je]())&&df()};
E.F=function(a,b,c,d,e){if(""==a||(!wd(a)||""==b||!wd(b))||c!=g&&!wd(c)||d!=g&&!xd(d))return l;this.set(wc,a,h);this.set(xc,b,h);this.set(yc,c,h);this.set(zc,d,h);this.set(vc,!!e,h);this.a.j("event");return h};E.Ha=function(a,b,c,d,e){var f=this.a.b(Dc,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return l;c=1*(""+c);if(""==a||(!wd(a)||""==b||!wd(b)||!xd(c)||da(c)||0>c||0>f||100<f)||d!=g&&(""==d||!wd(d)))return l;this.t(me(a,b,c,d));return h};
E.Ga=function(a,b,c,d){if(!a||!b)return l;this.set(Ac,a,h);this.set(Bc,b,h);this.set(Cc,c||J[z][xa],h);d&&this.set(Hb,d,h);this.a.j("social");return h};E.Ea=function(){this.set(Dc,10);this.K(this.H)};E.Ia=function(){this.a.j("trans")};E.t=function(a){this.set(Eb,a,h);this.a.j("event")};E.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){H(91);b.F(a,c,d,e)}}};E.ma=function(a){return this.get(a)};
E.xa=function(a,b){if(a)if(Ca(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};E.addEventListener=function(a,b){var c=this.get(Nc)[a];c&&c[n](b)};E.removeEventListener=function(a,b){for(var c=this.get(Nc)[a],d=0;c&&d<c[w];d++)if(c[d]==b){c.splice(d,1);break}};E.qa=function(){return"5.4.1"};E.B=function(a){this.get(hb);a="auto"==a?Ka(J.domain):!a||"-"==a||"none"==a?"":a[D]();this.set(bb,a)};E.va=function(a){this.set(hb,!!a)};
E.na=function(a,b){return ce(this.a,a,b)};E.link=function(a,b){if(this.a.get(fb)&&a){var c=ce(this.a,a,b);J[z].href=c}};E.ua=function(a,b){this.a.get(fb)&&(a&&a.action)&&(a.action=ce(this.a,a.action,b))};
E.za=function(){this.v();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:Ge;if(b&&b[na]){a.set(Cb,[]);for(var b=b[na][y]("UTM:"),c=0;c<b[w];c++){b[c]=Da(b[c]);for(var d=b[c][y](de),e=0;e<d[w];e++)d[e]=Da(d[e]);"T"==d[0]?fe(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&ge(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};E.$=function(a,b,c,d,e,f,Be,k){return fe(this.a,a,b,c,d,e,f,Be,k)};E.Y=function(a,b,c,d,e,f){return ge(this.a,a,b,c,d,e,f)};
E.Aa=function(a){de=a||"|"};E.ea=function(){this.set(Cb,[])};E.wa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(yb))a=l;else if(!b||!c||128<b[w]+c[w])a=l;else{1!=d&&2!=d&&(d=3);var f={};ha(f,b);f.value=c;f.scope=d;e.get(Fb)[a]=f;a=h}a&&this.a.n();return a};E.ka=function(a){this.a.get(Fb)[a]=g;this.a.n()};E.ra=function(a){return(a=this.a.get(Fb)[a])&&1==a[ua]?a[na]:g};E.Ca=function(a,b,c){this.m().f(a,b,c)};E.Da=function(a,b,c){this.m().o(a,b,c)};E.sa=function(a,b){return this.m().getKey(a,b)};
E.ta=function(a,b){return this.m().N(a,b)};E.fa=function(a){this.m().L(a)};E.ga=function(a){this.m().M(a)};E.ja=function(){return new yd};E.W=function(a){a&&this.get(Ab)[n](a[D]())};E.ba=function(){this.set(Ab,[])};E.X=function(a){a&&this.get(Bb)[n](a[D]())};E.ca=function(){this.set(Bb,[])};E.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[D]()][C](":");if(d||e)a=[a,d,e][C](":");d=this.get(zb);d.splice(c?0:d[w],0,a)}};E.da=function(){this.set(zb,[])};
E.ha=function(a){this.a[ka]();var b=this.get(P),c=be(this.a);this.set(P,a);this.a.n();ae(this.a,c);this.set(P,b)};E.ya=function(a,b){if(0<a&&5>=a&&Ca(b)&&""!=b){var c=this.get(Fc)||[];c[a]=b;this.set(Fc,c)}};E.V=function(a){a=""+a;if(a[oa](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Ic)||[];b[n](a);this.set(Ic,b)}};E.v=function(){this.a[ka]()};E.Ba=function(a){a&&""!=a&&(this.set(Tb,a),this.a.j("var"))};var ef=l;
function df(){function a(a,d){var e="p="+a+"&id="+b,s=new Image(1,1);s.src=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/u/"+c[d]+".gif?"+e;He(s,function(){He(s,Ge);Ie(s,Ge)});Ie(s,function(){He(s,Ge);Ie(s,Ge)})}if(!ef){ef=h;var b=[Ea(),Ea(),Ea()][C]("."),c=["a","b","c"],d=[[0,1],[1,0],[0,2],[2,0]],e=m[la](m[Je]()*d[w]);a(e,d[e][0]);a(e,d[e][1])}};var ne=function(a){"trans"!==a.get(sc)&&500<=a.b(cc,0)&&a[ta]();if("event"===a.get(sc)){var b=(new Date)[kf](),c=a.b(dc,0),d=a.b(Zb,0),c=m[la](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(dc,b),a.set(R,m.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[ta]()}},pe=function(a){"event"===a.get(sc)&&a.set(R,m.max(0,a.b(R,10)-1))};var qe=function(){var a=[];this.add=function(b,c,d){d&&(c=G(""+c));a[n](b+"="+c)};this.toString=function(){return a[C]("&")}},re=function(a,b){(b||2!=a.get(xb))&&a.Za(cc)},se=function(a,b){b.add("utmwv","5.4.1");b.add("utms",a.get(cc));b.add("utmn",Ea());var c=J[z].hostname;F(c)||b.add("utmhn",c,h);c=a.get(vb);100!=c&&b.add("utmsp",c,h)},te=function(a,b){b.add("utmht",(new Date)[kf]());b.add("utmac",Da(a.get(Wa)));a.get(Oc)&&b.add("utmxkey",a.get(Oc),h);a.get(vc)&&b.add("utmni",1);var c=a.get(Ic);
c&&0<c[w]&&b.add("utmdid",c[C]("."));ff(a,b);a.get(Xa)!==l&&(a.get(Xa)||M.w)&&b.add("aip",1);b.add("utmu",od.Xa())},ue=function(a,b){for(var c=a.get(Fc)||[],d=[],e=1;e<c[w];e++)c[e]&&d[n](e+":"+G(c[e][p](/%/g,"%25")[p](/:/g,"%3A")[p](/,/g,"%2C")));d[w]&&b.add("utmpg",d[C](","))},ff=function(a,b){function c(a,b){b&&d[n](a+"="+b+";")}var d=[];c("__utma",cd(a));c("__utmz",hd(a,l));c("__utmv",fd(a,h));c("__utmx",be(a));b.add("utmcc",d[C]("+"),h)},ve=function(a,b){a.get(ib)&&(b.add("utmcs",a.get(Qb),h),
b.add("utmsr",a.get(Lb)),a.get(Rb)&&b.add("utmvp",a.get(Rb)),b.add("utmsc",a.get(Mb)),b.add("utmul",a.get(Pb)),b.add("utmje",a.get(Nb)),b.add("utmfl",a.get(Ob),h))},we=function(a,b){a.get(lb)&&a.get(Ib)&&b.add("utmdt",a.get(Ib),h);b.add("utmhid",a.get(Kb));b.add("utmr",Pa(a.get(Jb),a.get(P)),h);b.add("utmp",G(a.get(Hb),h),h)},xe=function(a,b){for(var c=a.get(Db),d=a.get(Eb),e=a.get(Fb)||[],f=0;f<e[w];f++){var Be=e[f];Be&&(c||(c=new yd),c.f(8,f,Be[r]),c.f(9,f,Be[na]),3!=Be[ua]&&c.f(11,f,""+Be[ua]))}!F(a.get(wc))&&
!F(a.get(xc),h)&&(c||(c=new yd),c.f(5,1,a.get(wc)),c.f(5,2,a.get(xc)),e=a.get(yc),e!=g&&c.f(5,3,e),e=a.get(zc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Qa(d),h):d&&b.add("utme",d.A(),h)},ye=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&
d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[v]()},ze=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[v]()},Ae=function(a,b){var c=a.get(sc);if("page"==c)c=new qe,re(a,b),se(a,c),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),
c=[c[v]()];else if("event"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","event"),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[v]()];else if("var"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","var"),!b&&te(a,c),c=[c[v]()];else if("trans"==c)for(var c=[],d=a.get(Cb),e=0;e<d[w];++e){c[n](ye(a,d[e],b));for(var f=d[e].items_,Be=0;Be<f[w];++Be)c[n](ze(a,f[Be],b))}else"social"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Ac),h),c.add("utmsa",a.get(Bc),h),c.add("utmsid",a.get(Cc),
h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[v]()]):"feedback"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","feedback"),c.add("utmfbid",a.get(Gc),h),c.add("utmfbpr",a.get(Hc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[v]()]):c=[];return c},oe=function(a){var b,c=a.get(xb),d=a.get(uc),e=d&&d.Ua,f=0;if(0==c||2==c){var Be=a.get(wb)+"?";b=Ae(a,h);for(var k=0,s=b[w];k<s;k++)Sa(b[k],e,Be,h),f++}if(1==c||2==c){b=Ae(a);k=0;for(s=b[w];k<s;k++)try{Sa(b[k],e),f++}catch(t){t&&Ra(t[r],g,t.message)}}d&&
(d.q=f)};var Ce=function(a){ha(this,"len");this.message=a+"-8192"},De=function(a){ha(this,"ff2post");this.message=a+"-2036"},Sa=function(a,b,c,d){b=b||Fa;if(d||2036>=a[w])gf(a,b,c);else if(8192>=a[w]){if(0<=W[za].userAgent[q]("Firefox")&&![].reduce)throw new De(a[w]);hf(a,b)||Ee(a,b)}else throw new Ce(a[w]);},gf=function(a,b,c){c=c||(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/__utm.gif?";var d=new Image(1,1);d.src=c+a;He(d,function(){He(d,Ge);Ie(d,Ge);b()});Ie(d,function(){He(d,
Ge);Ie(d,Ge);b()})},hf=function(a,b){var c,d=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/p/__utm.gif",e=W.XDomainRequest;if(e)c=new e,c.open("POST",d);else if(e=W.XMLHttpRequest)e=new e,"withCredentials"in e&&(c=e,c.open("POST",d,h),c.setRequestHeader("Content-Type","text/plain"));if(c)return c.onreadystatechange=function(){4==c.readyState&&(b(),c=Ge)},c.send(a),h},Ee=function(a,b){if(J.body){a=aa(a);try{var c=J[qa]('<iframe name="'+a+'"></iframe>')}catch(d){c=
J[qa]("iframe"),ha(c,a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var e=J[z],e=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/u/post_iframe.html#"+aa(e[A]+"//"+e[u]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Ga(W,"beforeunload",f);var Be=l,k=0,s=function(){if(!Be){try{if(9<k||c.contentWindow[z][u]==J[z][u]){Be=h;f();Ha(W,"beforeunload",f);b();return}}catch(a){}k++;ca(s,200)}};Ga(c,"load",s);
J.body.appendChild(c);c.src=e}else We(function(){Ee(a,b)},100)};var $=function(){this.G=this.w=l;this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;Re();Se()};E=$[x];E.oa=function(a,b){return this.r(a,g,b)};E.r=function(a,b,c){b&&H(23);c&&H(67);b==g&&(b="~"+M.U++);a=new U(b,a,c);M.C[b]=a;M.D[n](a);return a};E.u=function(a){a=a||"";return M.C[a]||M.r(g,a)};E.pa=function(){return M.D[ja](0)};E.aa=function(){this.w=h};E.la=function(){this.G=h};var Fe=function(a){if("prerender"==J.webkitVisibilityState)return l;a();return h};var M=new $;var jf=W._gat;jf&&Ba(jf._getTracker)?M=jf:W._gat=M;var Z=new Y;(function(a){if(!Fe(a)){H(123);var b=l,c=function(){!b&&Fe(a)&&(b=h,Ha(J,"webkitvisibilitychange",c))};Ga(J,"webkitvisibilitychange",c)}})(function(){var a=W._gaq,b=l;if(a&&Ba(a[n])&&(b="[object Array]"==Object[x][v].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[n][ya](Z,a)});function Yc(a){var b=1,c=0,d;if(a){b=0;for(d=a[w]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b};})();


var myScroll;

//var myScrollPlano, myScrollAmplia= new Array();//, arrayEmpresas
//var actualizacionesPendientes = 0;
var oglobales; //NO USAR DESDE FUERA DE ESTA JS. En su lugar utilizar GetObjGlobales()

function GetObjGlobales() {
    if (oglobales == undefined) {
        oglobales = new ObjGlobales();
    }
    return oglobales;
}

function ObjGlobales() { };
ObjGlobales.prototype = {
    //rutaroot: 'Ferias/MT13/',//offline
    rutaroot: '', //online
    rutaficha: '',
    rutarecurso: '',
    idioma: 'es',
    feria: '',

    //* variables version nativa *//
    offline: '',
    modoConexion: '',
    so: '', //sistema operativo
    ActualizacionPendiente: false,
    numFicherosActualizar: 0,
    numFicherosDescargados: 0,
    tamFicherosDescargar: 0,
    numFicherosTotalAssets: 0,
    numFicherosProcesadosAssets: 0,
    mostrarMsgActualizacion: true,
    //* fin variables version nativa *//

    arrayParametros: [],
    arrayTraducciones: [],
    InicializarHeader: function () {
        $('#header').show();
        var btnheader = $('.btnHeader');
        btnheader.show();
    },
    EsRecintoPersonalizado: function () {
        if (this.arrayParametros['recintopers'] == 'S')
            return true;
        else
            return false;
    },
    EsSpanish: function () {
        if (this.idioma == 'es')
            return true;
        else
            return false;
    },
    EsOffline: function () {
        if (this.offline == 'S')
            return true
        else
            return false;
    },
    //********************************************** variables version nativa *******************************//
    getRutaFichero: function (tipo, nombreFichero) {
        var ruta = "";
        if (this.EsOffline()) {
            if (tipo == "R")
                ruta = this.rutaroot + "/recurso/" + nombreFichero;
            if (tipo == "I")
                ruta = this.rutaroot + "/img/" + nombreFichero;
            if (tipo == "X")
                ruta = this.rutaroot + "/xml/" + nombreFichero;
        }
        else {
            ruta = this.rutarecurso + 'Feria=' + this.feria + '&Tipo=' + tipo + '&Fichero=' + nombreFichero;
        }
        return ruta;
    },
    //********************************************* fin variables version nativa *****************************//

    inicializaglobales_offline: function () {
        this.offline = getQueryVariable('offline').toUpperCase();

        //this.offline = getParameterByName('offline').toUpperCase();
        //this.so = getParameterByName('so').toUpperCase();
        this.so = getQueryVariable('so').toUpperCase();
        this.feria = getQueryVariable('feria').toUpperCase();
        //esto se vuelve a asignar en el pluggin de setrutaactual pero
        //para poder sacar el splash antes hacemos este apaÒo
        if (this.so == 'ANDROID')
    		this.rutaroot = 'file:///android_asset/www/datos/ferias/'+this.feria;
    },
    incializaglobales: function () {

        this.rutaficha = this.rutaroot + 'wsListaExpositores.svc/GetFichaEmpresa?';
        this.rutarecurso = this.rutaroot + 'getrecurso.ashx?';
        //this.feria = getParameterByName('feria').toUpperCase();
        this.feria = getQueryVariable('feria').toUpperCase();
        this.offline = getQueryVariable('offline').toUpperCase();
        this.so = getQueryVariable('so').toUpperCase();
        //this.offline = getParameterByName('offline').toUpperCase();
        //this.so = getParameterByName('so').toUpperCase();
        if (this.so == "") { this.so = "WEB" }
        addeventoanalitics(this.feria, "Tipo Acceso", this.so, 0);
        this.arrayParametros = new Array();
        this.arrayTraducciones = new Array();
        this.InicializarIdioma();
        this.creaArrayTraducciones();
        this.CargarConfiguracion();
    },
    CargarConfiguracion: function () {
        var cadena = '';
        $.ajax({
            type: "GET",
            url: this.getRutaFichero("R", "configuracion.xml"), //this.rutarecurso + 'Feria=' + this.feria + '&Tipo=R&Fichero=configuracion.xml',
            dataType: "xml",
            success: function (xml) {
                $(xml).find('p').each(function () {
                    GetObjGlobales().arrayParametros[$(this).attr('id')] = $(this).attr('v');
                });
                GetObjListaEmpresas().tipolistado = GetObjGlobales().arrayParametros['Lista_Logo'];
            }
        })
    },
    cargaMenusPrincipales: function () {
        $('[men="menu"]').each(function () {
            var menu = $(this);
            if (GetObjGlobales().arrayParametros[menu.attr('id')] == 'S')
                menu.show();
        })
    },
    DameTraduccion: function (valor) {
        if (this.EsSpanish()) {
            return this.arrayTraducciones[valor - 1][1];
        } else {
            return this.arrayTraducciones[valor - 1][2];
        }
        return valor;
    },
    creaArrayTraducciones: function () {
        var arraytra = this.arrayTraducciones; //desde dentro del success no puedo acceder a un objeto del prototype
        $.ajax({
            type: "GET",
            url: this.getRutaFichero("R", "traducciones_fijas.xml"),
            dataType: "xml",
            success: function (xml) {
                $(xml).find('secciones').each(function () {
                    $(xml).find('sec').each(function () {
                        var traduccion = new Array();
                        traduccion = [$(this).attr('id'), $(this).attr('val'), $(this).attr('vali')];
                        arraytra.push(traduccion);
                    })
                })
            }
        });
    },
    cargaIdioma: function () {
        $('[rel="idioma"]').hide();
        $('[idioma="' + this.idioma + '"]').show();
    },
    cambiaIdioma: function (pidioma) {
        this.idioma = pidioma;
        localStorage.setItem('idioma', this.idioma);
        if (this.EsSpanish()) { $('.btnHeader').html('<span>Atr&aacute;s</span>'); }
        else { $('.btnHeader').html('<span>Back</span>'); }
        $('[rel="idioma"]').hide();
        $('[idioma="' + this.idioma + '"]').fadeIn();
    },
    InicializarIdioma: function () {
        var lang;
        if (navigator
                && navigator.userAgent
                && (lang = navigator.userAgent
                        .match(/android.*\W(\w\w)-(\w\w)\W/i))) {
            lang = lang[1];
        }

        if (!lang && navigator) {
            if (navigator.language) {
                lang = navigator.language;
            } else if (navigator.browserLanguage) {
                lang = navigator.browserLanguage;
            } else if (navigator.systemLanguage) {
                lang = navigator.systemLanguage;
            } else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
            }
            lang = lang.substr(0, 2);
        }

        if (lang == "es") {
            this.cambiaIdioma("es")
        }
        else {
            this.cambiaIdioma("en")
        }
        this.cargaIdioma();
    },
    DameIdTipoExp: function (tipoexp) {
        switch (tipoexp) {
            case 'E':
                return '8';
            case 'C':
                return '9';
            case 'R':
                return '10';
            default:
                return '';
        }
    },
    titulaCabecera: function (pnombre) {
        $('.titHeader').html('<h1>' + cortaPalabras(pnombre, 140) + '</h1>');
    }

}






/*
function abc(el) { this.element = el; this.element.addEventListener('touchstart', this, false); }
abc.prototype = {
handleEvent: function (e) {
switch (e.type) {
case 'touchstart': this.onTouchStart(e); break;
case 'touchmove': this.onTouchMove(e); break;
case 'touchend': this.onTouchEnd(e); break;
}
},
onTouchStart: function (e) {
e.preventDefault();
this.element.className = 'hover';
var theTarget = e.target;
if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;
theTarget = theTarget.getAttribute("letra");
if (document.getElementById(theTarget)) {
myScroll.scrollTo(0, document.getElementById(theTarget).offsetTop * -1, 0);
}
this.element.addEventListener('touchmove', this, false);
this.element.addEventListener('touchend', this, false);
return false;
},
onTouchEnd: function (e) {
e.preventDefault();
this.element.className = '';
this.element.removeEventListener('touchmove', this, false);
this.element.removeEventListener('touchend', this, false);
return false;
},
onTouchMove: function (e) {
e.preventDefault();
var theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;
theTarget = theTarget.getAttribute("letra");
if (document.getElementById(theTarget)) {
theTarget = document.getElementById(theTarget).offsetTop * -1;
if (theTarget < myScroll.maxScroll)
theTarget = myScroll.maxScroll;
myScroll.scrollTo(0, theTarget, 0);
}
return false;
}
}*/
hoverClassRegEx = new RegExp('(^|\\s)iScrollHover(\\s|$)'),
	removeClass = function () {
	    if (this.hoverTarget) {
	        clearTimeout(this.hoverTimeout);
	        this.hoverTarget.className = this.hoverTarget.className.replace(hoverClassRegEx, '');
	        this.target = null;
	    }
	};
function elScroll(quien) {

    if ($('#' + quien).length > 0) {
        myScroll = new iScroll(quien, {
            useTransform: false,
            onBeforeScrollStart: function (e) {
                var target = e.target;
                clearTimeout(this.hoverTimeout);
                if ((e.target.getAttribute("rel") != "enlace") &&

            (e.target.parentElement.getAttribute("rel") != "enlace") &&
            (e.target.getAttribute("rel") != "enlaceB") &&
            (e.target.parentElement.getAttribute("rel") != "enlaceB") &&
            (e.target.getAttribute("rel") != "boton") &&
            (e.target.parentElement.getAttribute("rel") != "boton"))
                { return false; /*e.preventDefault(); return false;*/ }
                if (target.tagName == 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                    return false;
                }

                if (target.getAttribute("rel") != "enlace" &&
                target.parentNode.getAttribute("rel") == "enlace") { target = target.parentNode; }
                if (target.getAttribute("rel") != "enlaceB" && target.parentNode.getAttribute("rel") == "enlaceB") { target = target.parentNode; }
                if (target.getAttribute("rel") != "boton" && target.parentNode.getAttribute("rel") == "boton") { target = target.parentNode; }
                this.hoverTimeout = setTimeout(function () { if (!hoverClassRegEx.test(target.className)) target.className = target.className ? target.className + ' iScrollHover' : 'iScrollHover'; }, 20);
                this.hoverTarget = target; e.preventDefault();
            },
            onScrollMove: removeClass,
            onBeforeScrollEnd: removeClass,
            onScrollEnd: removeClass
        });
        $('#capaCargador').fadeOut();


    }


};

function elScrollSinHover(quien) { myScroll = new iScroll(quien, { useTransform: false }); $('#capaCargador').fadeOut(); };



var primera = true; var paginaCargada = false; var transicion; var nombreCapa; var nombreCapaAnterior; var urlG;
var navegacion = Array();


var rutaAnterior = 'ajax_feria.html'; var rutaAnterior2 = '';
function carga(url) {
    $('#capaCargador').fadeIn(300,
        function () {
            setTimeout(function () { carga2(url); }, 100);
        });
}
function carga2(url) {

    urlG = url;
    nombreCapa = url.replace('.html', '').replace('ajax_', '');
    if (nombreCapa.indexOf('?') > 0) {
        nombreCapa = nombreCapa.substring(0, nombreCapa.indexOf('?'));
        nombreCapa += '_' + getParameterByName('i');

    }
    nombreCapaAnterior = rutaAnterior.replace('.html', '').replace('ajax_', '');
    if (nombreCapaAnterior.indexOf('?') > 0) {
        var par = sacaParametro('i', nombreCapaAnterior)
        nombreCapaAnterior = nombreCapaAnterior.substring(0, nombreCapaAnterior.indexOf('?'));
        nombreCapaAnterior += '_' + par;
    }
    navegacion.push(url);
    //    if (myScrollPlano) { myScrollPlano.destroy(); myScrollPlano = null; }
    if (myScroll) { myScroll.destroy(); myScroll = null; }
    //    if (myScrollAmplia) { myScrollAmplia.destroy(); myScrollAmplia = null; }

    $.ajax({
        url: url, success: function (data) {
            if (primera) {
                $('<div id="contenido_' + nombreCapa + '"   class="absoluta"></div>').appendTo('#contenedor_paginas');
                rutaAnterior = url; $("#contenido_" + nombreCapa).html(data);
                $("#contenido_" + nombreCapa).fadeIn();
                $('[rel="enlace"]').click(function () { navega($(this).attr('href')); }); primera = false; return false;
            }
            else {
                $('<div id="contenido_' + nombreCapa + '" style="display:none;"  class="absoluta"></div>').appendTo('#contenedor_paginas');
            }

            if (getParameterByName('go') == 'back') {
                transicion = 'atras';
                $("#contenido_" + nombreCapa).html(data);
            } else {
                $("#contenido_" + nombreCapa).html(data);
                transicion = 'alante';
            }
            cargadoB();
        }

    });
    return false;
}
function cargadoB() {

    switch (transicion) {
        case 'alante':
            if (location.hash == '' || location.hash.indexOf('#ajax_feria.html') >= 0) {
                $('#header').addClass('saleAtras'); $('#header').hide(); $('#header').removeClass('entra');
            } else {
                $('#header').removeClass('saleAtras'); $('#header').addClass('entra'); $('#header').show();
            }

            $("#contenido_" + nombreCapa).show();
            $("#contenido_" + nombreCapa).addClass('entra');
            $("#contenido_" + nombreCapaAnterior).addClass('sale');
            setTimeout("$('#contenido_' + nombreCapaAnterior).remove();", 100);
            $('.btnHeader').show();
            $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
            break;
        case 'atras':
            if (location.hash == '' || location.hash.indexOf('#ajax_feria.html') >= 0) {
                $('#header').addClass('saleAtras');
                $('#header').hide();
                $('#header').removeClass('entra');
            } else {
                $('#header').removeClass('saleAtras');
                $('#header').addClass('entra');
                $('#header').show();
            }
            $("#contenido_" + nombreCapa).show();
            $("#contenido_" + nombreCapa).addClass('entraAtras');
            $("#contenido_" + nombreCapaAnterior).addClass('saleAtras');
            setTimeout("$('#contenido_' + nombreCapaAnterior).remove();", 100);
            $('.btnHeader').show();
            $('[rel="enlace"]').click(function () { 
            	navega($(this).attr('href')); 
            });
            break;

    }
    rutaAnterior2 = rutaAnterior;
    rutaAnterior = urlG;

    GetObjGlobales().cargaIdioma();
}

$.extend($.expr[':'], {
    'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
                                                 .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

function navega(url) {
    if (url == '') {
        url = "ajax_feria.html";
    }
    if (url == rutaAnterior) {
        return false;
    }
    if (url.toLowerCase().search('http') >= 0) {
        if (GetObjGlobales().EsOffline() == true)
            navigator.app.loadUrl(url, { openExternal: true })
        else
            window.open(url);
        if (url.toLowerCase().search('appinstitucional.ifema.es') >= 0) {
            addeventoanalitics(GetObjGlobales().feria, 'IFEMA', '', 0);
        }       
    }
    else
    	window.location.hash = url;
    

}

function locationHashChanged() {
    if (location.hash == '' || location.hash.indexOf('#ajax_feria.html') >= 0) {
        carga('ajax_feria.html');
    }
    else {
        carga(hashea());
    }
}
function hashea() {
    var strHash = location.hash.substring(0, location.hash.length);
    if (strHash.indexOf("#") > -1) {
        strHash = strHash.substring(1, strHash.length);
    }
    return strHash;
}


//var miCalendario = { llamalo: function (types, success, fail) { return PhoneGap.exec(success, fail, "Calendario", "execute", types); } };
//var miPais = { llamalo: function (types, success, fail) { return PhoneGap.exec(success, fail, "Idioma", "execute", types); } };
//var updateArco = { llamalo: function (types, success, fail) { return PhoneGap.exec(success, fail, "UpdateArco", "execute", types); } };
//var TotalFiles2Download = { llamalo: function (types, success, fail) { return PhoneGap.exec(success, fail, "TotalFiles2Download", "execute", types); } };

/*function getPais() {
miPais.llamalo(["Quien soy?"], function (result) {
//alert(result); 
GetObjGlobales().idioma = result; localStorage.setItem('idioma', GetObjGlobales().idioma);
if (GetObjGlobales().EsSpanish()) { $('.btnHeader').html('<span>Atr&aacute;s</span>'); } else { $('.btnHeader').html('<span>Back</span>'); }
GetObjGlobales().cargaIdioma();
}, function (error) { if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('Ocurri\u00f3 un problema conectando con el servidor. Pruebe de nuevo en unos minutos. (ID)', alertDismissed, 'ARCOmadrid 2012', 'Aceptar'); } else { navigator.notification.alert('There was a problem connecting with the server. Try again in a few minutes.', alertDismissed, 'ARCOmadrid 2012', 'Ok'); } });
}*/
//function grabaFecha(fechaInicio, fechaFin, evento) { miCalendario.llamalo([fechaInicio, fechaFin, evento], function (result) { if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('La cita se agreg√É∆í√Ü‚Äô√É‚Äö√Ç¬≥ correctamente al calendario.', alertDismissed, 'ARCOmadrid 2012', 'Aceptar'); } else { navigator.notification.alert('The date was added correctly to the calendar.', alertDismissed, 'ARCOmadrid 2012', 'Ok'); } }, function (error) { if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('Ocurri√É∆í√Ü‚Äô√É‚Äö√Ç¬≥ un error agregando la cita al calendario.', alertDismissed, 'ARCOmadrid 2012', 'Aceptar'); } else { navigator.notification.alert('There was an error adding the date to the calendar.', alertDismissed, 'ARCOmadrid 2012', 'Ok'); } }); }
/*function compruebaDescarga() {
TotalFiles2Download.llamalo([], function (result) {
//alert(result);    
$('#capaCargador').fadeOut();
if (result > 0) {
actualizacionesPendientes = result;
$('.globo').fadeIn(); $('textoActualizacion').show(); 
$('#contenedorActualizaciones').show();
} else {
$('.globo').fadeOut(); $('textoActualizacion').hide();
$('#contenedorActualizaciones').hide(); 
}
}, function (error) { if (GetObjGlobales().EsSpanish()) { navigator.notification.alert('TF2. Ocurri\u00f3 un problema conectando con el servidor. Pruebe de nuevo en unos minutos.', alertDismissed, 'ARCOmadrid 2012', 'Aceptar'); } else { navigator.notification.alert('There was a problem connecting with the server. Try again in a few minutes.', alertDismissed, 'ARCOmadrid 2012', 'Ok'); } });
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
if (localStorage.getItem('idioma')) {
GetObjGlobales().idioma = localStorage.getItem('idioma');
}
else { getPais(); }
if (navigator.network.connection.type == Connection.WIFI || navigator.network.connection.type == Connection.CELL_3G || navigator.network.connection.type == Connection.CELL_4G) {
compruebaDescarga();
}

}*/




function errorAjax(result) {
    //alert('ERROR ' + result.status + ' ' + result.statusText);
}





function cargaFicheroHTML(pferia, fichero_es, fichero_en, contenedor) {
    var cadena = '';
    var fichero = '';
    if (GetObjGlobales().EsSpanish()) {
        fichero = fichero_es;
    }
    else {
        fichero = fichero_en;
    }
    $.ajax({
        type: "GET",
        url: GetObjGlobales().getRutaFichero("R", fichero), //GetObjGlobales().rutarecurso + 'Feria=' + pferia + '&Tipo=R&Fichero=' + fichero,
        dataType: "html",
        success: function (html) {
            contenedor.html(html);
            $('[rel="enlace"]').click(function () { navega($(this).attr('href')); });
            setTimeout("myScroll.refresh();", 300);
        }
    });
}

function cargaFicheroHTMLConAccion(pferia, fichero_es, fichero_en, contenedor, onTerminaBien) {
    var cadena = '';
    var fichero = '';
    if (GetObjGlobales().EsSpanish()) {
        fichero = fichero_es;
    }
    else {
        fichero = fichero_en;
    }
    $.ajax({
        type: "GET",
        url: GetObjGlobales().getRutaFichero("R", fichero), //GetObjGlobales().rutarecurso + 'Feria=' + pferia + '&Tipo=R&Fichero=' + fichero,
        dataType: "html",
        success: function (html) {
            contenedor.html(html);
            onTerminaBien();
        }
    });
}

function LoadCabeceraFeria() {
    if (myScroll != "undefined" && myScroll != null) {
        GetObjGlobales().cargaMenusPrincipales();
        myScroll.refresh();
    }
   
}

function CargasGenerales() { 
    CargarRecinto();   
    CargarPabellon();  
    setTimeout('InicializaListaEmpresas(GetObjGlobales().feria);', 2100);

    //cargamos las listas completas de empresa
    if (GetObjGlobales().EsOffline()) {
        setTimeout('InicializaFichaEmpresas();', 2100);
    }
}

function EsCompatibleNavegador() {   
    if (!window.addEventListener) {
        return false;
    }
    else {
        return true;
    }
}


function MsgSiNo(titulo, flujoOk, flujoCancel) {
    if (GetObjGlobales().EsSpanish()) {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: 190,
            modal: true,
            title: titulo,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    flujoOk();
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                    if (flujoCancel != null) {
                        flujoCancel();
                    }
                }
            }
        });
    }
    else {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: 190,
            modal: true,
            title: titulo,
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                    flujoOk();
                },
                "Cancel": function () {
                    $(this).dialog("close");
                    if (flujoCancel != null) {
                        flujoCancel();
                    }
                }
            }
        });
    }
}

function MsgSi(titulo, flujoOk) {
    if (GetObjGlobales().EsSpanish()) {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: 190,
            modal: true,
            title: titulo,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    if (flujoOk != null) {
                        flujoOk();
                    }
                }
            }
        });
    }
    else {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: 190,
            modal: true,
            title: titulo,
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                    if (flujoOK != null) {
                        flujoOk();
                    }
                }
            }
        });
    }
   
}
















