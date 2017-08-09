













document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() 
{
	if(sessvars.compra == null) {
		navigator.splashscreen.show();
		getLocGPS();
	}
	$('#divRegistro').hide();
	$('#divPerfil').hide();
	$('#divLogin').hide();
	$('#divRegistroEN').hide();
	$('#divPerfilEN').hide();
	$('#divLoginEN').hide();
	if(sessvars.compra == null) {
		if(sessvars.lang == null) {
			navigator.globalization.getLocaleName(
				  function (locale) {sessvars.lang = locale.value.substr(0, 2);},
				  function () {alert(sessvars.lang =  'es');}
				);
			if(sessvars.lang != null) {
				if(sessvars.lang.length > 0) {
					if(sessvars.lang != 'es' && sessvars.lang != 'en') {
						sessvars.lang = 'en';
					}
				} else {
					sessvars.lang = 'es';
				}
			} else {
				sessvars.lang = 'es';
			}
			console.log('Idioma ' + sessvars.lang);
			//sessvars.lang = 'en';
			jQuery.i18n.properties({
			    name:'Messages', //Nombre del fichero
			    path:'bundle/', //Carpeta donde la incluimos
			    mode:'both',  
			    language:sessvars.lang,  //Lenguaje, hablaremos del el abajo
			    callback: function() {
			        console.log(msg_hello);
			    }
			});
			mostrarPopupTutorial();
			initPageVarsOnShow('Index');
		}
	}
	checkConnection();
	setFontSize();
	if(sessvars.compra == null) {
		sessvars.paginaActual = 'eventos';
		
	    // Register the event listener
	    //document.addEventListener("backbutton", onBackKeyDown, false);
	    console.log('onDeviceReady ' + sessvars.lang);
	    getLocation();
    } else {
    	jQuery.i18n.properties({
		    name:'Messages', //Nombre del fichero
		    path:'bundle/', //Carpeta donde la incluimos
		    mode:'both',  
		    language:sessvars.lang,  //Lenguaje, hablaremos del el abajo
		    callback: function() {
		        console.log(msg_hello);
		    }
		});
    	initPageVarsOnShow('Index');
    	generarVistaAnterior();
    	sessvars.compra = null;
    }
    
}

print_country("paisPerfilen");
print_country("paisPerfil");

// energize.js: speed up click events on mobile devices (https://github.com/davidcalhoun/energize.js)
(function() {
  // don't add to non-touch devices or desktop Chrome (which now has touch events)
  if(!('ontouchstart' in window && !(/chrome/i).test(navigator.userAgent))) return;

  var lastClick = {};
  
  var isThresholdReached = function(startXY, xy) {
    return Math.abs(startXY[0] - xy[0]) > 5 || Math.abs(startXY[1] - xy[1]) > 5;
  };

  var touchstart = function(e) {
    // setup the initial values
    // TODO: touch and hold
    this.startXY = [e.touches[0].clientX, e.touches[0].clientY];
    this.threshold = false;
  };
  var touchmove = function(e) {
    // check if the user is scrolling past the threshold
    if(this.threshold) return false;  // noop if the threshold has already been reached
    this.threshold = isThresholdReached(this.startXY, [e.touches[0].clientX, e.touches[0].clientY]);
  };
  var touchend = function(e) {
    // don't fire a click if the user scrolled past the threshold
    if(this.threshold || isThresholdReached(this.startXY, [e.changedTouches[0].clientX, e.changedTouches[0].clientY])) {
      return;
    }
    
    // create and fire a click event on the target element
    // https://developer.mozilla.org/en/DOM/event.initMouseEvent
    var touch = e.changedTouches[0],
        evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.simulated = true;   // distinguish this from a nonsimulated click
    e.target.dispatchEvent(evt);
  };
  var click = function(e) {
    /*
        Prevent ghost clicks by only allowing clicks we created
        in the click event we fired (look for e.simulated)
    */
    var time = Date.now(),
        timeDiff = time - lastClick.time,
        x = e.clientX,
        y = e.clientY,
        xyDiff = [Math.abs(lastClick.x - x), Math.abs(lastClick.y - y)],
        target = closest(e.target, 'A') || e.target,
        nodeName = target.nodeName,
        isLink = nodeName === 'A',
        standAlone = window.navigator.standalone && isLink && e.target.getAttribute("href");
    
    lastClick.time = time;
    lastClick.x = x;
    lastClick.y = y;

    //if((!e.simulated) || standAlone) {  // Android doesn't pick up all clicks with this
    /*
       Unfortunately Android sometimes fires click events without touch events (seen on Kindle Fire),
       so we have to add more logic to determine the time of the last click.  Not perfect...
    */
    if((!e.simulated && (timeDiff < 500 || (timeDiff < 1500 && xyDiff[0] < 50 && xyDiff[1] < 50))) || standAlone) {
      //window.$c && $c.log("energize.js: click suppressed; e.simulated: " + e.simulated + "; standAlone:" + standAlone + " timeDiff: " + timeDiff + "; xyDiff: [" + xyDiff[0] + ", " + xyDiff[1] + "]; screenXY: [" + e.screenX + ", " + e.screenY + "]");
      e.preventDefault();
      e.stopPropagation();
      if(!standAlone) return false;
    }

    //window.$c && $c.log && window.$c && $c.log("energize.js: unsupressed click event on " + target + " with class " + target.className + " timeDiff: " + timeDiff + "; xyDiff: [" + xyDiff[0] + ", " + xyDiff[1] + "]; screenXY: [" + e.screenX + ", " + e.screenY + "]");
    
    /* 
       Special logic for standalone web apps
       See http://stackoverflow.com/questions/2898740/iphone-safari-web-app-opens-links-in-new-window
    */
    if(standAlone) {
      window.location = target.getAttribute("href");
    }

    // add an energize-focus class to the targeted link (mimics :focus behavior)
    if(!target || !target.classList) return;
    target.classList.add("energize-focus");
    window.setTimeout(function(){
      target.classList.remove("energize-focus");
    }, 150);
  };

  var closest = function(node, nodeName){
    var curNode = node,
        tagName = nodeName.toUpperCase();

    while(curNode !== document.body) {  // go up the dom until we find the tag we're after
      if(!curNode || curNode.nodeName === tagName) { return curNode; } // found
      curNode = curNode.parentNode;     // not found, so keep going up
    }
    
    return null;  // not found
  };

  /*
      All the events we care about bubble up to document,
      so we can handle them there instead of 
  */
  document.addEventListener('touchstart', touchstart, false);
  document.addEventListener('touchmove', touchmove, false);
  document.addEventListener('touchend', touchend, false);
  document.addEventListener('click', click, true);
  
})();



// clear to first boot state
function clearFirstBoot() {
	//window.localStorage.clear();
	navigator.app.exitApp();
}

// toggle panel menu (open/close)
function togglePanel(panel) {
	console.log('togglePanel ' + panel);
	if(sessvars.organizacionSelect == 1) {
		if(sessvars.paginaActual == 'eventos')
    		eventos();
    	else if(sessvars.paginaActual == 'discotecas')
    		discotecas();
    	else if(sessvars.paginaActual == 'promotoras')
    		promotoras();
    	else if(sessvars.paginaActual == 'festivales')
    		festivales();
    	else  if(sessvars.paginaActual == 'clubs')
    		clubs();
    	print_country("country");
	} else {
		$(panel).panel("toggle");
	}
}

// default left panelmenu (define menu for all pages)
function panelMenu(divId) {
	var panel = '#panelMenu' + divId + 'UL';
	$(panel).children().remove('li');
	//$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">World in the night</p></li>');
	$(panel).append('<li id="loginLi" data-icon="false"><a class="panelText" id="loginBtn" href="JavaScript:showLoginPopup();" data-rel="popup"><button class="apuntateBtn" type="button">Login</button></a>' +
			'</li>');
	$(panel).append('<li id="perfilLi" data-icon="false">' +
			'<a id=""  class="panelText" href="JavaScript:showPerfilPopup();" data-rel="popup"><button class="apuntateBtn" type="button">'+jQuery.i18n.prop('msg_profile')+'</button></a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="JavaScript:eventos();"><img src="./images/icons/ic_action_home.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_events')+'</a></li>');
	//$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">Other pages</p></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="JavaScript:discotecas();"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_discos')+'</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="JavaScript:promotoras();"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_promoters')+'</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="JavaScript:festivales();"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_festivals')+'</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="JavaScript:clubs();"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_clubs')+'</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="mailto:info@worldinthenight.com"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">'+jQuery.i18n.prop('msg_contact')+'</a></li>');
	$(panel).append('<li data-role="list-divider" id="localizacionLi"><p class="panelTextDivider">' + jQuery.i18n.prop('msg_location') + '</p></li>');
	$(panel).append('<li data-icon="false"><select onchange="print_state(\'state\',this.selectedIndex);" id="country" name ="country" style="width:100%"><option>'+jQuery.i18n.prop('msg_select_country')+'</option></select></li>');
	//$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">Idioma</p></li>');
	$(panel).append('<li data-icon="false"><select onchange="cambiar_localizacion_evento();" name ="state" id ="state" style="width:100%"><option>'+jQuery.i18n.prop('msg_select_state')+'</option></select></li>');
//	$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">'+msg_language+'</p>' +
//			'</li>');
	$(panel).append('<li data-role="list-divider"><div><img src="images/es2.png" width="30px" height="30px" alt="Spanish" style="float:left;margin-right:10%;" onclick="cambiarES();"/>'
	+ '<img src="images/en.png" width="30px" height="30px" alt="English" style="float:left;margin-right:10%;" onclick="cambiarEN();"/><a href="JavaScript:showTutorial();">Tutorial</a></div>' +
	'</li>');
	$(panel).append('<li id="logoutLi" data-icon="false" style="clear:left;">' +
	'<a id=""  class="panelText" href="JavaScript:logout();" data-rel="popup"><button class="apuntateBtn" type="button">Logout</button></a></li>');
	/*$(panel).append('<li data-icon="false">' +
	'<div><img src="images/es2.png" width="30px" height="30px" alt="Spanish" style="float:left;margin-right:10%;" onclick="cambiarES();"/>'
	+ '<img src="images/en.png" width="30px" height="30px" alt="English" style="float:left;" onclick="cambiarEN();"/></div></li>');*/
	if(window.devicePixelRatio <= 0.75) {
		$('#localizacionLi').hide();
	}
	$(panel).listview('refresh');
}

// default right panelmenu (define menu for all pages)
function panelMenuRight(divId) {
	var panel = '#panelMenuRight' + divId + 'UL';
	$(panel).children().remove('li');
	$(panel).append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
	$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">More items</p></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="#indexPage"><img src="./images/icons/ic_action_home.png" class="ui-li-icon largerIcon">Index page</a></li>');
	$(panel).append('<li data-role="list-divider"><p class="panelTextDivider">Other pages</p></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="#secondPage"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Second page</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" href="#thirdPage"><img src="./images/icons/ic_action_info.png" class="ui-li-icon largerIcon">Third page</a></li>');
	$(panel).listview('refresh');
}

// panel open and closed handling
function panelHandling() {
	$("#panelMenu" + window.localStorage.getItem("divIdGlobal")).panel({
		open: function (e, ui) {
			if (e) { e.preventDefault();}
			window.localStorage.setItem("panelLeft", 'open');
		}
	});
	$("#panelMenu" + window.localStorage.getItem("divIdGlobal")).panel({
		close: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelLeft", 'closed');
		}
	});
	$("#panelMenuRight" + window.localStorage.getItem("divIdGlobal")).panel({
		open: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelRight", 'open');
		}
	});
	$("#panelMenuRight" + window.localStorage.getItem("divIdGlobal")).panel({
		close: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelRight", 'closed');
		}
	});
}

// press effect in header bar
function pressEffectHeader(share, light) {
	if (light === false) {
		// header title press effect (left panel)
		$(document).on('vmousedown', "#headerTitle" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			if(sessvars.organizacionSelect == 1) {
				$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow_selected_light.png");
			} else {
				$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_selected.png");
			}
		});
		$(document).on('vmouseup', "#headerTitle" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			if(sessvars.organizacionSelect == 1) {
				$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow_light.png");
			} else {
				$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu.png");
			}
		});
	} else {
		// header title press effect (left panel)
		$(document).on('vmousedown', "#headerTitle" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow_selected_light.png");
		});
		$(document).on('vmouseup', "#headerTitle" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow_light.png");
		});
	}
	// overflow title press effect (right panel)
		$(document).on('vmousedown', "#headerOverflow" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerOverflow" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_overflow_selected_header.png");
		});
		$(document).on('vmouseup', "#headerOverflow" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerOverflow" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_overflow_header.png");
		});
	// share press effect
	if (share === true) {
		$(document).on('vmousedown', "#headerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_selected_header.png");
		});
		$(document).on('vmouseup', "#headerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_header.png");
		});
	}
}

// press effect in footer bar
function pressEffectFooter(button1, button2) {
	// button1 press effect
	if (button1 === true) {
		$(document).on('vmousedown', "#footerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#footerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_selected_header.png");
		});
		$(document).on('vmouseup', "#footerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#footerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_header.png");
		});
	}
	// button2 press effect
	if (button2 === true) {
		$(document).on('vmousedown', "#footerToast" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#footerToast" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_selected_header.png");
		});
		$(document).on('vmouseup', "#footerToast" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#footerToast" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_header.png");
		});
	}
}

// initialize page variables and elements on create
function initPageVarsOnCreate(id) {
	console.log('initPageVarsOnCreate ' + id);
}

// initialize page variables on beforeshow
function initPageVarsOnShow(id) {
	console.log('initPageVarsOnShow ' + id);
	// every page...
	window.localStorage.setItem("panelLeft", 'closed');
	window.localStorage.setItem("divIdGlobal", id);
	window.localStorage.setItem("shareTagSubject", 'World in the night');
	window.localStorage.setItem("shareTagText", 'Compra entradas y apuntate en lista. Descargatela en ...');
	panelMenu(id);
	panelMenuRight(id);
	panelHandling();
	// every page but...
	if (id !== "Second" && id !== "ListaCompra") {
		pressEffectHeader(true, false);
	}
	// specific page...
	if (id === "Index") {
		// do nothing
	} else if (id === "Second") {
		// do nothing
		pressEffectHeader(true, true);
	} else if (id === "ListaCompra") {
		pressEffectHeader(true, true);
	} else if (id === "Contacto") {
		pressEffectHeader(true, true);
	}
}

// jqm based popup
$(document).on('popupafteropen', '#popupIndexPage', function (e) {
	if (e) { e.preventDefault(); }
	toast('Popup opened.', 'short');
});
$(document).on('popupafterclose', '#popupIndexPage', function (e) {
	if (e) { e.preventDefault(); }
	toast('Popup closed.', 'short');
});

// below is to tie page events to pages so that the 2 functions above (initPageVarsOn...) will execute

// #indexPage
//$(document).on('pagebeforeshow', '#indexPage', function (e) {
//	if (e) { e.preventDefault(); }
//	initPageVarsOnShow('Index');
//});
$(document).on('pagecreate', '#indexPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('Index');
});

// #secondPage
$(document).on('pagebeforeshow', '#secondPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnShow('Second');
});
$(document).on('pagecreate', '#secondPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('Second');
});

// #thirdPage
$(document).on('pagebeforeshow', '#listaCompraPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnShow('ListaCompra');
});
$(document).on('pagecreate', '#listaCompraPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('ListaCompra');
});

//#thirdPage
$(document).on('pagebeforeshow', '#contactoPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnShow('Contacto');
});
$(document).on('pagecreate', '#contactoPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('Contacto');
});

function showLoading(texto) {
	$.mobile.loading( 'show', {
    	text: texto,
    	textVisible: true,
    	theme: 'a',
    	html: ""
    });
}

function initVistaIndex() {
	sessvars.organizacionSelect = 0;
	$('#divRegistro').hide();
	$('#divPerfil').hide();
	$('#divLogin').hide();
	$('#divRegistroEN').hide();
	$('#divPerfilEN').hide();
	$('#divLoginEN').hide();
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");
}

function eventos() {
	initVistaIndex();
    showLoading(jQuery.i18n.prop('msg_loading_events'));
	sessvars.paginaActual = 'eventos';
	console.log('eventos');
	//obtenerPatrocinados();
    obtenerListaEventosProvincia();
    window.scrollTo(0, 0);
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function discotecas() {
	initVistaIndex();
	sessvars.tipo = "discoteca";
    showLoading(jQuery.i18n.prop('msg_loading_discos'));
	sessvars.paginaActual = 'discotecas';
	console.log('discotecas');
	//obtenerPatrocinados();
    obtenerListaDiscotecasProv();
    window.scrollTo(0, 0);
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
    //$.mobile.hidePageLoadingMsg();
}

function promotoras() {
	initVistaIndex();
	sessvars.tipo = "promotora";
    window.scrollTo(0, 0);
	showLoading(jQuery.i18n.prop('msg_loading_promoters'));
	sessvars.paginaActual = 'promotoras';
	console.log('promotoras');
	//obtenerPatrocinados();
	obtenerListaDiscotecasProv();
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function festivales() {
	initVistaIndex();
	sessvars.tipo = "festival";
	showLoading(jQuery.i18n.prop('msg_loading_festivals'));
	sessvars.paginaActual = 'festivales';
	console.log('festivales');
	//obtenerPatrocinados();
	obtenerListaDiscotecasProv();
    window.scrollTo(0, 0);
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function clubs() {
	initVistaIndex();
	sessvars.tipo = "club";
	showLoading(jQuery.i18n.prop('msg_loading_clubs'));
	sessvars.paginaActual = 'clubs';
	console.log('clubs');
	//obtenerPatrocinados();
	obtenerListaDiscotecasProv();
    window.scrollTo(0, 0);
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function discoteca() {
	showLoading(jQuery.i18n.prop('msg_loading_org'));
	$('#divRegistro').hide();
	$('#divPerfil').hide();
	$('#divLogin').hide();
	$('#divRegistroEN').hide();
	$('#divPerfilEN').hide();
	$('#divLoginEN').hide();
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");
    $('#headerTitleIndex').attr('src', 'images/icons/ic_launcher_full_arrow_light.png');
    sessvars.organizacionSelect = 1;
    if(sessvars.lang == 'es') {
    	$( "#popupMenuEventoLista" ).popup({
	 	   closed: function(event, ui) {
	 		   console.log('Cerrar');
	 		   obtenerInfoDiscoteca();
	 		   setTimeout(function () { window.scrollTo(0, 0);}, 200);
	 	   }
	 	});
	    $('#popupMenuEventoLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$( "#popupMenuEventoListaEN" ).popup({
	 	   closed: function(event, ui) {
	 		   console.log('Cerrar');
	 		   obtenerInfoDiscoteca();
	 		   setTimeout(function () { window.scrollTo(0, 0);}, 200);
	 	   }
	 	});
	    $('#popupMenuEventoListaEN').popup("close");
    }
    
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function discotecaDetalle() {
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");
    $('#headerTitleIndex').attr('src', 'images/icons/ic_launcher_full_arrow_light.png');
    sessvars.organizacionSelect = 1;
    showLoading(jQuery.i18n.prop('msg_loading_org'));
    if(sessvars.lang == 'es') {
    	$( "#popupMenuDiscotecaLista" ).popup({
	 	   closed: function(event, ui) {
	 		   console.log('Cerrar');
	 		   obtenerInfoDiscoteca();
	 		   setTimeout(function () { window.scrollTo(0, 0);}, 200);
	 	   }
	 	});
	    $('#popupMenuDiscotecaLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$( "#popupMenuDiscotecaListaEN" ).popup({
	 	   closed: function(event, ui) {
	 		   console.log('Cerrar');
	 		   obtenerInfoDiscoteca();
	 		   setTimeout(function () { window.scrollTo(0, 0);}, 200);
	 	   }
	 	});
	    $('#popupMenuDiscotecaListaEN').popup("close");
    }
    if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
}

function setCompra() {    
	if(sessvars.idUsuario != null) {
	    $('#nombre').val(sessvars.nombreEvento+'@'+sessvars.nombreOrganizacion+' - '+sessvars.fechaEvento);
	    $('#desc').val(sessvars.descuentoEvento);
	    $('#precio').val(sessvars.precioEvento);
	    $('#currency').val(sessvars.currencyEvento);
	    if(sessvars.idUsuario == null || sessvars.idUsuario.lenght == 0)
	    	$('#idusu').val(1);
	    else
	    	$('#idusu').val(sessvars.idUsuario);
	    $('#idevento').val(sessvars.idEvento);
	    $('#idioma').val(sessvars.lang);
	    console.log('SetIdiomaCompra ' + sessvars.lang);
	    $('#tituloPopupCompra').html(sessvars.nombreEvento+'@'+sessvars.nombreOrganizacion+' - '+sessvars.fechaEvento);
	    $('#descPopupCompra').html(sessvars.descCompra);
	    $('#precioPopupCompra').html(jQuery.i18n.prop('msg_price') + ' ' + sessvars.precioEvento + sessvars.currencyEvento);
	    $('#btnCompraPopup').html(jQuery.i18n.prop('msg_buy_ticket'));
	    if(sessvars.lang == 'es') {
	    	$( "#popupMenuEventoLista" ).popup({
	    	   closed: function(event, ui) {
	    		   console.log('Cerrar');
	    		   setTimeout(function () { 
	    			   $('#popupCompra').popup("open");
	    		   }, 200);
	    	   }
	    	});
	    } else if(sessvars.lang == 'en') {
	    	$( "#popupMenuEventoListaEN" ).popup({
	    	   closed: function(event, ui) {
	    		   console.log('Cerrar');
	    		   setTimeout(function () { $('#popupCompra').popup("open");}, 200);
	    	   }
	    	});
	    }
	    
	} else {
		alert(jQuery.i18n.prop('msg_log_to_comprar'));
		
	}
	
	if(sessvars.lang == 'es') {
		$('#popupMenuEventoLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupMenuEventoListaEN').popup("close");
    }
	
    
    
}

function compra() {
	if(sessvars.lang == 'es') {
		$('#popupCompra').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupCompraEN').popup("close");
    }
	
	sessvars.compra=1;
	//navigator.notification.activityStart("World In The Night", "Conectando con Paypal...");
	toast(jQuery.i18n.prop('msg_connecting_paypal'), "long");
	setInterval(function(){toast(jQuery.i18n.prop('msg_connecting_paypal'), "short")},1000);
}

function lista() {
	if(sessvars.idUsuario != null) {
		$('#listaTitulo').html(jQuery.i18n.prop('msg_lista_de') + ' ' + sessvars.nombreEvento);
		$('#listaTituloEN').html(jQuery.i18n.prop('msg_lista_de') + ' ' + sessvars.nombreEvento);
		var options = "";
		for ( var int = 1; int <= sessvars.maxAcomp; int++) {
			options += '<option value="' + int + '">+' + int + '</option>';
		}
		$('#selectLista').html(options);
		
		if(sessvars.lang == 'es') {
			$( "#popupMenuEventoLista" ).popup({
		 	   closed: function(event, ui) {
		 		   console.log('Cerrar');
		 		   setTimeout(function () { $('#popupBasic').popup("open");}, 200);
		 		   $('#selectLista').selectmenu('refresh', true);
		 	   }
		 	});
	    } else if(sessvars.lang == 'en') {
	    	$( "#popupMenuEventoListaEN" ).popup({
	 	 	   closed: function(event, ui) {
	 	 		   console.log('Cerrar');
	 	 		   setTimeout(function () { $('#popupBasicEN').popup("open");}, 200);
	 	 		   $('#selectLista').selectmenu('refresh', true);
	 	 	   }
	 	 	});
	    }
		
	} else {
		alert(jQuery.i18n.prop('msg_log_to_apuntar'));
		
	}
	if(sessvars.lang == 'es') {
		$('#popupMenuEventoLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupMenuEventoListaEN').popup("close");
    }
	
}

function compartirEvento() {
    var compra = '';
    if(sessvars.hayCompra == 1){
	    if(sessvars.descCompra != null)
	    	compra += sessvars.descCompra;
	    if(sessvars.precioEvento != null)
	    	compra += ' ' + sessvars.precioEvento;
	    if(sessvars.currencyEvento != null)
	    	compra += sessvars.currencyEvento;
	    if(compra.length > 0)
	    	compra = jQuery.i18n.prop('msg_buy_ticket_in') + '\n' + compra;
    }
    
    var lista = '';
    if(sessvars.hayLista == 1) {
    	if(sessvars.hora1 != null)
			lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora1;
    	if(sessvars.precio1 != null)
			lista += ' ' + sessvars.precio1 + sessvars.currencyEvento + '\n';
    	if(sessvars.hora2 != null)
    		lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora2;
		if(sessvars.precio2 != null)
			lista += ' ' + sessvars.precio2 + sessvars.currencyEvento + '\n';
		if(sessvars.hora3 != null)
			lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora3;
		if(sessvars.precio3 != null)
			lista += ' ' + sessvars.precio3 + sessvars.currencyEvento + '\n';
		
	    if(lista.length > 0)
	    	lista = jQuery.i18n.prop('msg_share_apuntate') + '\n' + lista;
    }
    var appDown = jQuery.i18n.prop('msg_share_download');
    share('World In The Night\n' + sessvars.nombreEvento + '@' + sessvars.nombreOrganizacion, compra + '\n' + lista + '\n' + appDown);
    if(sessvars.lang == 'es') {
		$('#popupMenuEventoLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupMenuEventoListaEN').popup("close");
    }
}

function compartirOrg() {
    var compra = '';
    if(sessvars.hayCompra == 1){
	    if(sessvars.descCompra != null)
	    	compra += sessvars.descCompra;
	    if(sessvars.precioEvento != null)
	    	compra += ' ' + sessvars.precioEvento;
	    if(sessvars.currencyEvento != null)
	    	compra += sessvars.currencyEvento;
	    if(compra.length > 0)
	    	compra = jQuery.i18n.prop('msg_buy_ticket_in') + '\n' + compra;
    }
    
    var lista = '';
    if(sessvars.hayLista == 1) {
    	if(sessvars.hora1 != null)
			lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora1;
    	if(sessvars.precio1 != null)
			lista += ' ' + sessvars.precio1 + sessvars.currencyEvento + '\n';
    	if(sessvars.hora2 != null)
    		lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora2;
		if(sessvars.precio2 != null)
			lista += ' ' + sessvars.precio2 + sessvars.currencyEvento + '\n';
		if(sessvars.hora3 != null)
			lista += jQuery.i18n.prop('msg_until_upper') + ' ' + sessvars.hora3;
		if(sessvars.precio3 != null)
			lista += ' ' + sessvars.precio3 + sessvars.currencyEvento + '\n';
		
	    if(lista.length > 0)
	    	lista = jQuery.i18n.prop('msg_share_apuntate') + '\n' + lista;
    }
    var appDown = jQuery.i18n.prop('msg_share_download');
    share('World In The Night\n' + sessvars.nombreOrganizacion, jQuery.i18n.prop('msg_share_compra_apunta') + ' ' + sessvars.nombreOrganizacion + jQuery.i18n.prop('msg_from') + ' http://www.worldinthenight.com'+ '\n' + appDown);
    
	if(sessvars.lang == 'es') {
		$('#popupMenuOrganizacion').popup("close");
		$('#popupMenuDiscotecaLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupMenuOrganizacionEN').popup("close");
    	$('#popupMenuDiscotecaListaEN').popup("close");
    }
}

function showPopUpMenuEventoLista(nomEv, idEv, nomOrg, idOrg, fechaEv, dto, precio, currency,
		descCompra, hayLista, hayCompra, maxAcomp, precio1, precio2, precio3, hora1, hora2, hora3) {
	console.log(hayCompra + ' ' + hayLista + ' ' + hora1);
	sessvars.nombreEvento = nomEv;
    sessvars.idEvento = idEv;
    sessvars.fechaEvento = fechaEv;
	if(hayCompra == "1") {
		sessvars.hayCompra = 1;
		sessvars.descCompra = descCompra;
	    sessvars.descuentoEvento = dto;
	    sessvars.precioEvento = precio;
	    sessvars.currencyEvento = currency;
	    $('#popupEventoListaCompra').show();
	    $('#popupEventoListaCompraEN').show();
	} else {
		sessvars.hayCompra = 0;
		sessvars.descCompra = null;
	    sessvars.descuentoEvento = null;
	    sessvars.precioEvento = null;
	    sessvars.currencyEvento = null;
		$('#popupEventoListaCompra').hide();
		$('#popupEventoListaCompraEN').hide();
	}
	
	if(hayLista == "1" && hora1 != null && hora1 != 'null' && hora1.length > 0) {
		sessvars.hayLista = 1;
		sessvars.maxAcomp = maxAcomp;
		if(precio1 != null && precio1 != 'null' && precio1.length > 0)
			sessvars.precio1 = precio1;
		if(precio2 != null && precio2 != 'null' && precio2.length > 0)
			sessvars.precio2 = precio2;
		if(precio3 != null && precio3 != 'null' && precio3.length > 0)
			sessvars.precio3 = precio3;
		if(hora1 != null && hora1 != 'null' && hora1.length > 0)
			sessvars.hora1 = hora1;
		if(hora2 != null && hora2 != 'null' && hora2.length > 0)
			sessvars.hora2 = hora2;
		if(hora3 != null && hora3 != 'null' && hora3.length > 0)
			sessvars.hora3 = hora3;
		$('#popupEventoListaLista').show();
		$('#popupEventoListaListaEN').show();
	} else {
		sessvars.hayLista = 0;
		sessvars.maxAcomp = null;
		sessvars.precio1 = null;
		sessvars.precio2 = null;
		sessvars.precio3 = null;
		sessvars.hora1 = null;
		sessvars.hora2 = null;
		sessvars.hora3 = null;
		$('#popupEventoListaLista').hide();
		$('#popupEventoListaListaEN').hide();
	}
    
    sessvars.nombreOrganizacion = nomOrg;
    sessvars.idOrganizacion = idOrg;
    
    
	console.log('showPopUpMenuEventoLista');
	if(sessvars.lang == 'es') {
		$('#tituloPopupEventoLista').html(nomEv + '@' + nomOrg);
		$('#popupMenuEventoLista').popup("open");
    } else if(sessvars.lang == 'en') {
    	$('#tituloPopupEventoListaEN').html(nomEv + '@' + nomOrg);
    	$('#popupMenuEventoListaEN').popup("open");
    }
}

function showPopUpMenuOrgLista(idOrg, nomOrg, direccion, latitud, longitud){
	sessvars.nombreOrganizacion = nomOrg;
    sessvars.idOrganizacion = idOrg;
    if(direccion != null && direccion != 'null' && direccion.length > 0) {
    	sessvars.direccOrganizacion = direccion;
    }
    if(latitud != null && latitud != 'null'  && latitud.length > 0) {
    	sessvars.latitudOrganizacion = latitud;
    }
    if(longitud != null && longitud != 'null'  && longitud.length > 0) {
    	sessvars.longitudOrganizacion = longitud;
    }
    
    if(sessvars.direccOrganizacion == null && ( sessvars.latitudOrganizacion == null || sessvars.longitudOrganizacion == null)) {
    	$('#popupDiscotecaListaMaps').hide();
    	$('#popupDiscotecaListaMapsEN').hide();
    } else {
    	$('#popupDiscotecaListaMaps').show();
    	$('#popupDiscotecaListaMapsEN').show();
    }
	console.log('showPopUpMenuEventoLista2');
	if(sessvars.lang == 'es') {
		$('#tituloPopupDiscotecaLista').html(nomOrg);
		$('#popupMenuDiscotecaLista').popup("open");
    } else if(sessvars.lang == 'en') {
    	$('#tituloPopupDiscotecaListaEN').html(nomOrg);
    	$('#popupMenuDiscotecaListaEN').popup("open");
    }
	
}

function showPopUpMenuOrg(idOrg, nomOrg, direccion, latitud, longitud){
	sessvars.nombreOrganizacion = nomOrg;
    sessvars.idOrganizacion = idOrg;
    if(direccion != null && direccion != 'null' && direccion.length > 0) {
    	sessvars.direccOrganizacion = direccion;
    }
    if(latitud != null && latitud != 'null'  && latitud.length > 0) {
    	sessvars.latitudOrganizacion = latitud;
    }
    if(longitud != null && longitud != 'null'  && longitud.length > 0) {
    	sessvars.longitudOrganizacion = longitud;
    }
    
    if(sessvars.direccOrganizacion == null && ( sessvars.latitudOrganizacion == null || sessvars.longitudOrganizacion == null)) {
    	$('#popupOrganizacionMaps').hide();
    	$('#popupOrganizacionMapsEN').hide();
    } else {
    	$('#popupOrganizacionMaps').show();
    	$('#popupOrganizacionMapsEN').show();
    }
   
    if(sessvars.lang == 'es') {
    	$('#tituloPopupOrganizacion').html(nomOrg);
    	$('#popupMenuOrganizacion').popup("open");
    } else if(sessvars.lang == 'en') {
    	$('#tituloPopupOrganizacionEN').html(nomOrg);
    	$('#popupMenuOrganizacionEN').popup("open");
    }
}

function maps() {
	//location.href="geo:" + sessvars.lat + "," sessvars.lon;
	if(sessvars.lang == 'es') {
		$('#popupMenuOrganizacion').popup("close");
		$('#popupMenuDiscotecaLista').popup("close");
    } else if(sessvars.lang == 'en') {
    	$('#popupMenuOrganizacionEN').popup("close");
    	$('#popupMenuDiscotecaListaEN').popup("close");
    }
	
	var label = "World In The Night. " + sessvars.nombreOrganizacion;
	if(sessvars.latitudOrganizacion != null && sessvars.longitudOrganizacion != null) {
		location.href="geo:" + sessvars.latitudOrganizacion + "," + sessvars.longitudOrganizacion +
		"?q=" + encodeURIComponent(sessvars.latitudOrganizacion + "," + sessvars.longitudOrganizacion + 
				"(" + label + ")");
	} else if(sessvars.direccOrganizacion != null) {
		location.href="geo:0,0?q=" + encodeURIComponent(sessvars.nombreOrganizacion + "," + sessvars.direccOrganizacion + 
				"(" + label + ")");
	} else {
		toast(sessvars.nombreOrganizacion + ' ' + jQuery.i18n.prop('msg_no_coords_direcc'), 'short');
	}
}

function showFoto(src) {
	showLoading(jQuery.i18n.prop('msg_opening_photo'));
	$('#popfoto').attr('src',src);
	$( "#popupFoto" ).bind({
	   popupafteropen: function(event, ui) { 
		   setTimeout(function () { $.mobile.hidePageLoadingMsg();}, 1000);
	   }
	});
	$('#popupFoto').popup("open");
}

function showLoginPopup() {
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");
    if(sessvars.lang == 'es') {
    	$('#divLogin').show();
    } else if(sessvars.lang == 'en') {
    	$('#divLoginEN').show();
    }
	
	if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
	
}

function showPerfilPopup() {
	console.log('showPerfilPopup');
	
    if(sessvars.lang == 'es') {
    	$('#divLogin').hide();
    	print_country("paisPerfil");
    	document.getElementById('paisPerfil').value = sessvars.pais;
    	$('#paisPerfil').selectmenu('refresh', true);
        var indexSelectedIdUsu=document.getElementById("paisPerfil").selectedIndex;
        print_state('provPerfil',indexSelectedIdUsu);
        document.getElementById('provPerfil').value = sessvars.estado;
        $('#provPerfil').selectmenu('refresh', true);
    } else if(sessvars.lang == 'en') {
    	$('#divLoginEN').hide();
    	print_country("paisPerfilen");
    	document.getElementById('paisPerfilen').value = sessvars.pais;
    	$('#paisPerfilen').selectmenu('refresh', true);
        var indexSelectedIdUsu=document.getElementById("paisPerfilen").selectedIndex;
        print_state('provPerfilen',indexSelectedIdUsu);
        document.getElementById('provPerfilen').value = sessvars.estado;
        $('#provPerfilen').selectmenu('refresh', true);
    }
    
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");

	if(window.localStorage.getItem("panelLeft") == "open")
    	togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
	if(sessvars.lang == 'es') {
		$('#divPerfil').show();
    } else if(sessvars.lang == 'en') {
    	$('#divPerfilEN').show();
    }
	
	console.log('acaba showPerfilPopup');
}

function showRegistroPopup() {
	if(sessvars.lang == 'es') {
    	$('#divLogin').hide();
    	print_country("pais");
    	document.getElementById('pais').value = sessvars.pais;
    	$('#pais').selectmenu('refresh', true);
        var indexSelectedIdUsu=document.getElementById("country").selectedIndex;
        print_state('prov',indexSelectedIdUsu);
        document.getElementById('prov').value = sessvars.estado;
        $('#prov').selectmenu('refresh', true);
    } else if(sessvars.lang == 'en') {
    	$('#divLoginEN').hide();
    	print_country("paisen");
    	document.getElementById('paisen').value = sessvars.pais;
    	$('#paisen').selectmenu('refresh', true);
        var indexSelectedIdUsu=document.getElementById("country").selectedIndex;
        print_state('proven',indexSelectedIdUsu);
        document.getElementById('proven').value = sessvars.estado;
        $('#proven').selectmenu('refresh', true);
    }
    
	$('div.descripcion').html("");
    $('div.galeria').html("");
    $('div.table-border').html("");
	if(window.localStorage.getItem("panelLeft") == "open")
		  togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
	if(sessvars.lang == 'es') {
		$('#divRegistro').show();
    } else if(sessvars.lang == 'en') {
    	$('#divRegistroEN').show();
    }
}

function closePopupLogin() {
	generarVistaAnterior();
    comprobarUserLogueado();
}

function closePopupPerfil() {
	if(sessvars.lang == 'es')
		$('#popupPerfil').popup("close");
	else if(sessvars.lang == 'en')
		$('#popupPerfilEN').popup("close");
}

function closePopupRegistro() {
	generarVistaAnterior();
}

function cambiarES() {
	if(sessvars.lang != 'es') {
		showLoading(jQuery.i18n.prop('msg_cambiar_idiom'));
		sessvars.lang = 'es';
		cambiarIdioma();
	}
}

function cambiarEN() {
	if(sessvars.lang != 'en') {
		showLoading(jQuery.i18n.prop('msg_cambiar_idiom'));
		sessvars.lang = 'en';
		cambiarIdioma();
	}
}

function cambiarIdioma() {
	jQuery.i18n.properties({
	    name:'Messages', //Nombre del fichero
	    path:'bundle/', //Carpeta donde la incluimos
	    mode:'both',  
	    language:sessvars.lang,  //Lenguaje, hablaremos del el abajo
	    callback: function() {
	    	initVistaIndex();
	    	generarVistaAnterior();
	    	comprobarUserLogueado();
	    	panelMenu('Index');
	    }
	});
}

function generarVistaAnterior() {
	if(sessvars.paginaActual == 'eventos')
		eventos();
	else if(sessvars.paginaActual == 'discotecas')
		discotecas();
	else if(sessvars.paginaActual == 'promotoras')
		promotoras();
	else if(sessvars.paginaActual == 'festivales')
		festivales();
	else  if(sessvars.paginaActual == 'clubs')
		clubs();
	print_country("country");
}

function getLocationGPS() {
	if(sessvars.latUsu == null || sessvars.lonUsu == null) {
		navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation, {
	        enableHighAccuracy: true,
	        timeout: 10000,
	        maximumAge: 0

	    });
	} else{
		showLoading(jQuery.i18n.prop('msg_loading_events'));
	    getProvinciaPais(sessvars.latUsu,sessvars.lonUsu);
	}
}

function getLocGPS() {
	navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorLoc, {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0

    });
}

function onSuccessLocation(position) {
	sessvars.latUsu = position.coords.latitude;
	  sessvars.lonUsu = position.coords.longitude;
	    showLoading(jQuery.i18n.prop('msg_loading_events'));
	    getProvinciaPais(sessvars.latUsu,sessvars.lonUsu);
	  console.log("onSuccessLocation Latitude: " + position.coords.latitude + 
			  "<br>Longitude: " + position.coords.longitude);
}

// onError Callback receives a PositionError object
//
function onErrorLocation(error) {
	cargarPais();
    showLoading(jQuery.i18n.prop('msg_loading_events'));
    console.log('sucode: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function onSuccessLoc(position) {
	if(sessvars.latUsu == null || sessvars.lonUsu == null) {
		sessvars.latUsu = position.coords.latitude;
		sessvars.lonUsu = position.coords.longitude;
	}
}

// onError Callback receives a PositionError object
//
function onErrorLoc(error) {
    console.log('sucode: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function showTutorial() {
	console.log('showTutorial');
	if(window.localStorage.getItem("panelLeft") == "open")
		  togglePanel("#panelMenu" + window.localStorage.getItem("divIdGlobal"));
	window.localStorage.setItem("tutorial", 'show');
	mostrarPopupTutorial();
}

function mostrarPopupTutorial() {
	if(sessvars.lang == 'es'){
		if(window.localStorage.getItem("tutorial") == null) {
			$('.page1').show();
			$('.page2').hide();
			$('.page3').hide();
			$('.page4').hide();
			$('#popupTutorial').popup("open");
		} else if(window.localStorage.getItem("tutorial") == 'show'){
			$('.page1').show();
			$('.page2').hide();
			$('.page3').hide();
			$('.page4').hide();
			$('#popupTutorial').popup("open");
		}

	} else{
		if(window.localStorage.getItem("tutorial") == null) {
			$('.page1EN').show();
			$('.page2EN').hide();
			$('.page3EN').hide();
			$('.page4EN').hide();
			$('#popupTutorialEN').popup("open");
		} else if(window.localStorage.getItem("tutorial") == 'show'){
			$('.page1EN').show();
			$('.page2EN').hide();
			$('.page3EN').hide();
			$('.page4EN').hide();
			$('#popupTutorialEN').popup("open");
		}
	}
}

function cerrarPopupTutorial() {
	if(sessvars.lang == 'es'){
		$('#popupTutorial').popup("close");
		if(document.getElementById("nomostrarInput").checked) {
			window.localStorage.setItem("tutorial", 'hide');
		} else {
			window.localStorage.setItem("tutorial", 'show');
		}
	} else{
		$('#popupTutorialEN').popup("close");
		if(document.getElementById("nomostrarInputEN").checked) {
			window.localStorage.setItem("tutorial", 'hide');
		} else {
			window.localStorage.setItem("tutorial", 'show');
		}
	}
	
}

//cargarRegionesEsp.js
function cargarPais()
{
	console.log('pais');
    //document.body.style.cursor = 'wait';
	jQuery.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/informaciones/paises.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            success:function(data)
            {
            	paisess = new Array();
            	provinciass = new Array();
            	provincia = new Array();
            	sessvars.paises = new Array();
				sessvars.provincias = new Array();
            	for(var i = 0; i < data.length; i++ )
                {
                	provincia=[];
                	provincia.length = 0;
                	//paisess[i] = data[i].pais;
                	paisess[i] = data[i].country;

                	for(var j = 0; j < data[i].provincia.length; j++ )
                    {
                    	provincia[j]= data[i].provincia[j];
                    }

                    
                    provinciass[i] = provincia;
                }

                sessvars.paises = paisess;
                sessvars.provincias = provinciass;

                //document.body.style.cursor = 'auto';
                //obtenerPatrocinados();
                obtenerListaEventosProvincia();
                
            },error: function (request, status, error) {
              alert("getProvinciaPais Data not found " + request.responseText);
              checkConnection();
              cargarPais();
              //obtenerPatrocinados();
              obtenerListaEventosProvincia();
              
            }

    });
}

function selectDesplegable() {
	document.getElementById('country').value = sessvars.pais;

    var indexSelectedIdUsu=document.getElementById("country").selectedIndex;

    print_state('state',indexSelectedIdUsu);

    document.getElementById('state').value = sessvars.estado;
    console.log('navigator.splashscreen.hide');
    $.mobile.hidePageLoadingMsg();
    navigator.splashscreen.hide();
    document.getElementById('country').value = sessvars.pais;
}

//CompraLista.js

function apuntarseEnLista()

{

	var idEvento = sessvars.idEvento;

    var elementoId1= "nomApuntado";

    var elementoId2= "selectLista";



    var nombreApunt= document.getElementById(elementoId1).value;

    var select=document.getElementById(elementoId2);
    console.log('select numApunt ' + select);
    var numApunt = select.options[select.selectedIndex].value;
    console.log('numApunt ' + numApunt);



    

    if ((nombreApunt==''|| numApunt=='')||(nombreApunt==null || numApunt == null))

    {

        alert(jQuery.i18n.prop('msg_debes_intro'));//eso es la ñ

    }

    else

    {

        if((sessvars.idUsuario == null)||(sessvars.idUsuario == ""))

        {



            alert(jQuery.i18n.prop('msg_log_to_apuntar'));

        }

        else

        {

        

            var apuntado = {

                nombre_ap : nombreApunt,

                acompanantes : numApunt,

                idUsu: sessvars.idUsuario,

                idEv: idEvento

                };



                jQuery.ajax({

                    url:"http://www.worldinthenight.com/serviciosPHPMovil/listas/apuntaLista.php",//ya lo cambiaremos

                    type:'POST',

                    dataType: 'text',

                    data: apuntado,

                    success:function(data)

                    {



                        if(data == "ok")

                        {



                            alert(jQuery.i18n.prop('msg_recuerda_apuntado') + ' '+nombreApunt+" +"+numApunt+" " +jQuery.i18n.prop('msg_recuerda_apuntado_cont'));

                        }

                        else

                        {

                            alert(data);

                        }

                    }

                });

        }

    }

}//fin function login

//eventos.js
/* 
 * archivo Js para el manejo de datos de la pagina Eventos.html y evento.html, o pantalla donde se haga el login
 */
function llamarEvento() {
	location.href="evento.html";
}


function obtenerListaEventosProvincia()
{
		console.log('obtenerListaEventosProvincia');
        //var indexSelectedIdUsu=document.getElementById("combo").selectedIndex;
        //var valSelectedIdUsu=document.getElementById("combo").options;
        //var combo= valSelectedIdUsu[indexSelectedIdUsu].text;
        if(sessvars.pais == null) {
        	sessvars.pais = 'Spain';
        	sessvars.estado = "Val&egrave;ncia";
        }
        console.log('obtenerListaEventosProvincia ' + sessvars.pais + ' ' + sessvars.estado);
        var localiza = {
            pais : sessvars.pais,
            provincia : sessvars.estado
            };// esto era para ver que si enviaba este Json al PHP lo le√≠a ah√≠, CORRECTO
        
	jQuery.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/eventos/obtenerListaEventosProvincia.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: localiza,
            success:function(data)
            {
            	console.log('obtenerListaEventosProvincia success!');
                var HTML="";
                var creaTable = "";
                var rellenaTable = "";
                var eventosTable="";
                var apuntaLista="";

                var eventos = data;

                if(eventos!=null)
                {
                    //creo la tabla en la que mostrare resultados, ya lo acoplaremos al theme
                    creaTable = '<table class="dates" cellpadding="0" cellspacing="0" border="0">\n';
                    
                    //recorremos el arras y tomamos los datos y construimos la tabla 
                    for(var i = 0; i < eventos.length; i++ )
                    {

//                        apuntaLista+='<div id="apuntaListaModal'+i+'" class="modalDialog">\n\
//                                        <div>\n\
//                                            <a href="#close" title="Close" class="close">X</a>\n\
//                                            <p class="required_notification">* Indica que son campos obligatorios</p>\n\
//                                            <h2>Lista de invitados de '+eventos[i].nombre+'</h2>\n\
//                                            <p>Apuntate en la lista</p>\n\
//                                            <div id="divFormLogin">\n\
//                                                <form action="#" onsubmit="apuntarseEnLista(\''+eventos[i].idEventoo+'\');" id="formLogin" class="formContacto">\n\
//                                                    <fieldset>\n\
//                                                        <label>Nombre:<br><input id="nomApuntado" type="text" required/></label>\n\
//                                                        <label>Acompa√±antes:<br><input id="numApuntados" type="text" required/></label>\n\
//                                                        <div><button class="compraBtn" type="submit">Apuntate</button></div>\n\
//                                                    </fieldset>\n\
//                                                </form>\n\
//                                            </div>\n\
//                                        </div>\n\
//                                    </div>';
                    	apuntaLista = '';


                        var impar = (i+1)%2;
                        //miramos si es fila par o impar
                        var typeRow = "";
                        if(impar != 0)
                        {
                        	typeRow = "even";
                        }
                        if(eventos[i].entradasRestantes<=0) {
                        	eventos[i].hayEntradas = "0";
                        }
                        if(eventos[i].numPersLista<=0) {
                        	eventos[i].hayLista = "0";
                        }
                        if(eventos[i].hora1== null) {
                        	eventos[i].hayLista = "0";
                        } else if(eventos[i].hora1.length == 0){
                        	eventos[i].hayLista = "0";
                        }
                        rellenaTable += '<tr class="'+ typeRow + '" onclick="showPopUpMenuEventoLista(\''+eventos[i].nombre+'\',\''+eventos[i].idEventoo
											+'\',\''+eventos[i].nombreOrganizacion+'\',\''+eventos[i].idOrganizacionn
											+'\',\'' + eventos[i].fechaini + '\',\'' + eventos[i].dto + '\',\'' 
											+ eventos[i].precioCon + '\',\'' + 'EUR' + '\',\'' + eventos[i].descripCompra + '\',\'' + eventos[i].hayLista 
											+ '\',\'' + eventos[i].hayEntradas + '\',\'' + eventos[i].maxAcomp + '\',\'' + eventos[i].precio1 + '\',\'' 
											+ eventos[i].precio2 + '\',\'' + eventos[i].precio3 + '\',\'' + eventos[i].hora1 +  '\',\'' + eventos[i].hora2 +  '\',\'' + eventos[i].hora3 + '\');">\n\
					            <td class="col1">\n\
					                <a href="#" class="name">'+eventos[i].nombre+'</a><br>\n\
					                <a href="#" class="name">(@'+eventos[i].nombreOrganizacion+')</a><br>'+eventos[i].fechaini+'<br>\n\
					                <img class="flyer" onclick="showFoto(\'http://'+eventos[i].imagenEvent+'\');" src="http://'+eventos[i].imagenEvent+'"/>\n\
					            </td>';

                        		//if(eventos[i].hayEntradas == "1" || eventos[i].hayLista == "1") {
                        			rellenaTable += '<td>';
                        		//}
                        		if(eventos[i].hayEntradas == "1") {
                        			rellenaTable += '<div class="cabeceracompra">\n\
					                    <div class="preciocompra">\n\
					                		<p>' + jQuery.i18n.prop('msg_before') + ' '+eventos[i].precioSin+eventos[i].moneda+', ' + jQuery.i18n.prop('msg_now') + ' '+eventos[i].precioCon+eventos[i].moneda+'</p>\n\
					                    </div>\n\
					                </div>\n\
					                <div class="cabeceraprecio">\n\
					                    <div class="tddiscount">\n\
					                        <div>\n\
					                            <p>'+eventos[i].descripCompra+'</p>\n\
					                        </div>\n\
					                    </div>\n\
					                    <div class="tddiscount">\n\
					                        <div id="discount1" class="discount">\n\
					                            <p>'+eventos[i].descuento+'%</p>\n\
					                        </div>\n\
					                    </div>\n\
					                </div>';
                        		}
                        		if(eventos[i].hayLista =="1") {
					                rellenaTable += '<div class="cabeceracompra">\n\
					                <div class="preciocompra">\n\
					            		<p>' + jQuery.i18n.prop('msg_list') + '</p>\n\
					                </div>\n\
					                <ul>';
					                	if(eventos[i].hora1!= null && eventos[i].hora1.length > 0)
										{
					                		rellenaTable += '<li>' +
					                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora1 + ' ';
					                            if(eventos[i].precio1 == 0)
					                            {
					                                rellenaTable += jQuery.i18n.prop('msg_free');
					                            }
					                            else
					                            {
					                                rellenaTable += eventos[i].precio1+' '+eventos[i].moneda;
					                            }
					                        rellenaTable += '</li>';
										}
												if(eventos[i].hora2!= null && eventos[i].hora2.length > 0)
												{
												    rellenaTable += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora2 + ' ';
												                            if(eventos[i].precio2 == 0)
												                            {
												                                rellenaTable += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                                rellenaTable += eventos[i].precio2+' '+eventos[i].moneda;
												                            }
												            rellenaTable += '</li>';
												}
												if(eventos[i].hora3!= null && eventos[i].hora3.length > 0)
												{
												    rellenaTable += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora3 + ' ';
												                            if(eventos[i].precio3 == 0)
												                            {
												                                rellenaTable += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                                rellenaTable += eventos[i].precio3+' '+eventos[i].moneda;
												                            }
												            rellenaTable += '</li>';
												}
												    rellenaTable += '</ul>\n\
												                </div>';
                        		}
					            rellenaTable += '</td>\n\
					        </tr>\n\
					    </tr>';
                    }
                }
                else
                {

                    creaTable = '<table class="dates" cellpadding="0" cellspacing="0" border="0">\n\
                    <tr class="thead">\n\
                    <td class="col1">' + jQuery.i18n.prop('msg_no_eventos') + '</td>\n\
                                </tr>';
                }
		
		//mostramos la tabla
		        HTML = apuntaLista + creaTable + rellenaTable + "</table>";
                $('div.table-border').html(HTML);
                setFontSize();
                comprobarUserLogueado();

            },//fin succes
            error: function (request, status, error) {
                console.log('obtenerListaEventosProvincia ' + request.responseText);
                comprobarUserLogueado();
            }
        });//fin Ajax
}//fin function login


/*function llamarAevento(evento, idEvento)
{
    sessvars.nombreEvento = evento;
    sessvars.idEvento = idEvento;
    
    location.href="evento.html";


}*/

function cambiar_localizacion_evento()
{
	console.log('cambiar_localizacion_evento');
    var indexSelectedIdUsu=document.getElementById("country").selectedIndex;
    var valSelectedIdUsu=document.getElementById("country").options;
    var combo= valSelectedIdUsu[indexSelectedIdUsu].text;

    sessvars.pais = combo;

    var indexSelectedIdUsu1=document.getElementById("state").selectedIndex;
    var valSelectedIdUsu1=document.getElementById("state").options;
    var combo1= valSelectedIdUsu1[indexSelectedIdUsu1].text;
    
    sessvars.estado = combo1;

    if(sessvars.paginaActual == 'eventos')
		eventos();
	else if(sessvars.paginaActual == 'discotecas')
		discotecas();
	else if(sessvars.paginaActual == 'promotoras')
		promotoras();
	else if(sessvars.paginaActual == 'festivales')
		festivales();
	else  if(sessvars.paginaActual == 'clubs')
		clubs();
	print_country("country");
}

//index.js
$(document).ready(function() 
{
	var newYear = new Date(); 
	newYear = new Date("05/25/2013");

});

function validatePass(p1, p2) {
	if (p1.value != p2.value || p1.value == '' || p2.value == '') {
		p2.setCustomValidity('Contraseña incorrecta');
	} else {
		p2.setCustomValidity('');
		document.getElementById('hintp2').style.display = 'none';
	}
};

//localizacion.js
function getLocation()
{
	sessvars.pais='Spain';
	sessvars.estado='Val&egrave;ncia';
  if (navigator.geolocation)
  {
	  console.log("Geolocation");
    //getProvinciaPais(51.536086,-0.121064);
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  }
  else {
    console.log("Geolocation is not supported by this browser.");
    getLocationGPS();
  }
  console.log("Getlocation");
}

function showPosition(position)
{
	console.log("showPosition");
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  if(sessvars.latUsu == null || sessvars.lonUsu == null) {
	  sessvars.latUsu = position.coords.latitude;
	  sessvars.lonUsu = position.coords.longitude;
  }
  
  showLoading(jQuery.i18n.prop('msg_loading_events'));
  getProvinciaPais(sessvars.latUsu,sessvars.lonUsu);
}

function showError(error)
{
	console.log("showError");
  switch(error.code) 
  {
    case error.PERMISSION_DENIED:
       console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
       console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
       console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
       console.log("An unknown error occurred.");
      break;
  }
  getLocationGPS();
}

function getProvinciaPais(lat, lon) {
  console.log("getProvinciaPais " + lat + " " + lon);
  if(lat == null || lon == null) {
	  getLocationGPS();
  } else {
	  var coords = {
	            lat : lat,
	            lon : lon
	            };// esto era para ver que si enviaba este Json al PHP lo le√≠a ah√≠, CORRECTO
	        
	  jQuery.ajax({
	            url:"http://www.worldinthenight.com/serviciosPHPMovil/informaciones/localizacion.php",//ya lo cambiaremos
	            type:'POST',
	            headers: { "Accept-Encoding" : "gzip" },
	            dataType: 'json',
	            data: coords,
	            success:function(data)
	            {
	              console.log(data);
	              if(data.estatus == "OK") {
	                obtenerPaisProvincia(data.geoname);
	              } else {
	                console.log(data.msg);
	                cargarPais();
	              }
	            }//fin succes
	            ,error: function (request, status, error) {
	            	console.log("getProvinciaPais Data not found " + request.responseText);
	            	alert(jQuery.i18n.prop('msg_no_localizado'));
	                cargarPais();
	            }
	      });//fin Ajax
  	}
}

function obtenerPaisProvincia(pais) {
  console.log("obtenerPaisProvincia " + pais);
  var datos = {
            pais : pais
            };
  jQuery.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/informaciones/obtenerPais.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: datos,
            success:function(data)
            {
              if(data.status == "OK") {
                sessvars.pais=data.country;
                sessvars.estado=data.estado;

              } else {
                console.log("obtenerPaisProvincia: Error: " + data.msg);
              }
              console.log(data.country + ' ' + data.estado);
              
              cargarPais();
            }//fin succes
            ,error: function(result) {
              console.log("obtenerPaisProvincia Data not found " + result.ErrorMessage);
              alert(jQuery.i18n.prop('msg_no_localizado'));
              cargarPais();
            }
      });//fin Ajax
}
//organizaciones.js
/* 
 * archivo Js para el manejo de datos correspondientes a las organizaciones.
 */


//function llamarDiscoteca() {
//	location.href= "discoteca.html";
//}
/**
* FUNCION OBTENERLISTADISCOTECASPROV
* funcion para cargar la lista de discotecas de una provincia seleccionada o geolocalizada
**/
function obtenerListaDiscotecasProv()
{
	console.log('obtenerListaDiscotecasProv');
    var country = sessvars.pais;//variable de sesion de pais de usuario
    var prov = sessvars.estado;//variable de sesion de provincia de usuario
    var type = sessvars.tipo;//variable de sesion de provincia de usuario
    var ubica = {
        pais : country,
        provincia : prov,
        tipo : type
        };
        
    jQuery.ajax({
        url:"http://www.worldinthenight.com/serviciosPHPMovil/organizaciones/obtenerListaDiscotecasProvincia.php",//ya lo cambiaremos
        type:'POST',
        headers: { "Accept-Encoding" : "gzip" },
        dataType: 'json',
        data: ubica,
        success:function(data)
        {
        	
	            var HTML="";
	            var creaTable = "";
	            var rellenaTable = "";
	            var eventosTable="";
	            var apuntaLista ="";
	            
            if(data != null) {
	            //creo la tabla en la que mostrare resultados, ya lo acoplaremos al theme
	            creaTable = '<table class="dates" cellpadding="0" cellspacing="0" border="0">';
	            
	            //parseamos el Json recibido a un array (YA NO HACE FALTA, PUES YA SE RECIBE COMO JSON
	            //var usuarios = JSON.parse(data); 
	
	            // simplemente asignamos el JSON recibido a la variable usuarios para acceder a sus datos como se accede a un JSON
	            var organizaciones = data;
	            //recorremos el arras y tomamos los datos y construimos la tabla 
	            for(var i = 0; i < organizaciones.length; i++ )
	            {
	                var impar = (i+1)%2;
	                //miramos si es fila par o impar
	                if(impar != 0)
	                {
	                    eventosTable='<table class="patro" cellpadding="0" cellspacing="0" border="0">\n\
				                    	<tr class="even">\n\
					                    <td onclick="showPopUpMenuOrgLista(\'' + organizaciones[i].idOrganizacionn + '\',\'' 
					                    + organizaciones[i].nombre + '\',\'' + organizaciones[i].direccion + '\',\'' 
					                    + organizaciones[i].latitud + '\',\'' + organizaciones[i].longitud + '\');">\n\
						                    <a href="#" class="name">'+organizaciones[i].nombre+'</a><br>\n\
						                    <a href="#" onclick="" class="name"><img class="flyermin" src="http://' + organizaciones[i].imgPpal + '"/></a>\n\
						                 </td>';
	                } else {
	                	eventosTable='<table class="patro" cellpadding="0" cellspacing="0" border="0">\n\
                            <tr>\n\
	                		<td>\n\
			                    <a href="#" class="name">'+organizaciones[i].nombre+'</a><br>\n\
			                    <a href="#" onclick="" class="name"><img class="flyermin" src="http://' + organizaciones[i].imgPpal + '"/></a>\n\
			                 </td>';
	                }
	                              
                    if(organizaciones[i].eventos!= null)
                    {         
                    	eventosTable += '<td colspan="2">\n\
	                        <h2>Proximos Eventos</h2>\n\
		                 </td>\n\
	                    </tr>';
                        for(var j = 0; j < organizaciones[i].eventos.length; j++ )
                        {
                        	var typeRow = "";
                        	if(impar != 0)
        	                {
                            	typeRow = "even";
                            	//eventosTable += '<tr class="' + typeRow +'">';
                            }
                        	if(organizaciones[i].eventos[j].entradasRestantes<=0) {
                        		organizaciones[i].eventos[j].hayEntradas = "0";
                            }
                            if(organizaciones[i].eventos[j].numPersLista<=0) {
                            	organizaciones[i].eventos[j].hayLista = "0";
                            }
                            if(organizaciones[i].eventos[j].hora1== null) {
                            	organizaciones[i].eventos[j].hayLista = "0";
                            } else if(organizaciones[i].eventos[j].hora1.length == 0){
                            	organizaciones[i].eventos[j].hayLista = "0";
                            }
                            eventosTable += '<tr class="'+ typeRow + '" onclick="showPopUpMenuEventoLista(\''+organizaciones[i].eventos[j].nomEv+'\',\''+organizaciones[i].eventos[j].idEv
							+'\',\''+organizaciones[i].nombre+'\',\''+organizaciones[i].idOrganizacionn
							+'\',\'' + organizaciones[i].eventos[j].fechaev + '\',\'' + organizaciones[i].eventos[j].dto + '\',\'' 
							+ organizaciones[i].eventos[j].precioCon + '\',\'' + 'EUR' + '\',\'' + organizaciones[i].eventos[j].descripCompra + '\',\'' + organizaciones[i].eventos[j].hayLista 
							+ '\',\'' + organizaciones[i].eventos[j].hayEntradas + '\',\'' + organizaciones[i].eventos[j].maxAcomp +'\');">';
                            eventosTable+='<td>\n\
				                                <a href="#" class="namemin">'+organizaciones[i].eventos[j].nomEv+'</a><br>'+organizaciones[i].eventos[j].fechaev+'<br>\n\
				                                <img class="flyermin" src="http://'+organizaciones[i].eventos[j].imgEv+'"/>\n\
				                            </td>';
				            if(organizaciones[i].eventos[j].hayEntradas == 1)
				            {
				            	if(organizaciones[i].eventos[j].hayLista == 1)
				            		eventosTable += '<td style="width:50%">';
				            	else
				            		eventosTable += '<td colspan="2">';
				            	eventosTable += '<div class="preciocompra">\n\
				            		<p>' + jQuery.i18n.prop('msg_before') + ' '+organizaciones[i].eventos[j].precioSin+organizaciones[i].eventos[j].moneda +
				            		', ' + jQuery.i18n.prop('msg_now') + ' '+organizaciones[i].eventos[j].precioCon+organizaciones[i].eventos[j].moneda+'</p>\n\
				                		</div>';
				            	eventosTable += '<div class="cabeceraprecio">\n\
				            		<div class="tddiscount">\n\
				                        <div>\n\
				                            <p>'+organizaciones[i].eventos[j].descCompra+'</p>\n\
				                        </div>\n\
				                    </div>\n\
				                    <div class="tddiscount">\n\
				                        <div id="discount1" class="discount">\n\
				                            <p>'+organizaciones[i].eventos[j].dto+'%</p>\n\
				                        </div>\n\
				                    </div>\n\
				                </div></td>';
				            }
				            if(organizaciones[i].eventos[j].hayLista == 1)
				            {
				            	if(organizaciones[i].eventos[j].hayEntradas == 1)
				            		eventosTable += '<td style="width:50%">';
				            	else
				            		eventosTable += '<td colspan="2">';
				            	eventosTable += '<div class="cabeceracompra">\n\
					                <div class="preciocompra">\n\
					            		<p>' + jQuery.i18n.prop('msg_list') + '</p>\n\
					                </div>\n\
					                <ul>';
				            		if(organizaciones[i].eventos[j].hora1!= null && organizaciones[i].eventos[j].hora1.length > 0) {
				            			eventosTable += '<li>' +
				                			jQuery.i18n.prop('msg_until') + ' '+ organizaciones[i].eventos[j].hora1 + ' ';
					                            if(organizaciones[i].eventos[j].precio1 == 0)
					                            {
					                            	eventosTable += jQuery.i18n.prop('msg_free');
					                            }
					                            else
					                            {
					                            	eventosTable += organizaciones[i].eventos[j].precio1+' '+organizaciones[i].eventos[j].moneda;
					                            }
					                            eventosTable += '</li>';
				            		}
												if(organizaciones[i].eventos[j].hora2!= null)
												{
													eventosTable += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ organizaciones[i].eventos[j].hora2 + ' ';
												                            if(organizaciones[i].eventos[j].precio2 == 0)
												                            {
												                            	eventosTable += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                            	eventosTable += organizaciones[i].eventos[j].precio2+' '+organizaciones[i].eventos[j].moneda;
												                            }
												                            eventosTable += '</li>';
												}
												if(organizaciones[i].eventos[j].hora3!= null)
												{
													eventosTable += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ organizaciones[i].eventos[j].hora3 + ' ';
												                            if(organizaciones[i].eventos[j].precio3 == 0)
												                            {
												                            	eventosTable += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                            	eventosTable += organizaciones[i].eventos[j].precio3+' '+organizaciones[i].eventos[j].moneda;
												                            }
												                            eventosTable += '</li>';
												}
												eventosTable += '</ul>\n\
												                </div></td>';
				            }
				            if((organizaciones[i].eventos[j].hayLista == 1)&&(organizaciones[i].eventos[j].hayEntradas == 1))
				            {
				                eventosTable +='</td>';
				            }
				            else
				            {
				                eventosTable +='</div>\n\
				                            </td>';
				            }
				            if((j==1)||(j==organizaciones[i].eventos.length-1))
				            {
				                eventosTable+='</tr>';
				            }                
                        }
                    }
                    //cerramos las tablas de eventos
                    eventosTable+='</table>\n\
                                            </div>\n\
                                        </td>';
                    if(impar != 0) {
                    	rellenaTable += '<tr class="even">\n\
                            <td class="col2disconew" colspan="2">\n\
                                <div class="listaeventosmin">';
                    } else {
                    	rellenaTable += '<tr>\n\
                            <td class="col2disconew" colspan="2">\n\
                                <div class="listaeventosmin">';
                    }
                    
                                                rellenaTable += eventosTable;
                            rellenaTable +='</div>\n\
                                        </td>\n\
                        			</tr>';
	            }
	
	                
        	} else {
            	creaTable = '<table class="dates" cellpadding="0" cellspacing="0" border="0">\n\
                    <tr class="thead">\n\
                    <td class="col1">' + jQuery.i18n.prop('msg_no_orgs') + '</td>\n\
                                </tr>';
            }
            
            //mostramos la tabla
            HTML = apuntaLista+ creaTable + rellenaTable + "</table>";
//            console.log(HTML);
            $('div.table-border').html(HTML);
            setFontSize();
            document.getElementById('country').value = sessvars.pais;

            var indexSelectedIdUsu=document.getElementById("country").selectedIndex;

            print_state('state',indexSelectedIdUsu);

            document.getElementById('state').value = sessvars.estado;
            $.mobile.hidePageLoadingMsg();

        },//fin succes
        error: function (request, status, error) {
            console.log('obtenerListaDiscotecasProv ' + request.responseText);
            $.mobile.hidePageLoadingMsg();
        }
    });//fin Ajax
}//fin function login

function obtenerInfoDiscoteca()
{

    var discoteca = {
            nombre : sessvars.nombreOrganizacion,
            idOrg : sessvars.idOrganizacion
            };// esto era para ver que si enviaba este Json al PHP lo le√≠a ah√≠, CORRECTO
      
    jQuery.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/informaciones/organizacion/obtenerInfoOrganizacion.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: discoteca,
            success:function(data)
            {
                var HTML="";
                var descripcionn = "";
                var fotos = "";
                var fotosCarrousel = "";
                var rellenaFotos = "";
                var rellenaTable = "";
                var eventosTable="";
                var direccion = "";
                var ciudad = "";
                var provincia = "";
                var pais = "";
                var email = "";
                var description = "";
                var telefono = "";
                var website= "";

                //parseamos el Json recibido a un array (YA NO HACE FALTA, PUES YA SE RECIBE COMO JSON
                //var organizacion = JSON.parse(data); 

                // simplemente asignamos el JSON recibido a la variable usuarios para acceder a sus datos como se accede a un JSON
                var organizacion = data;
                if(organizacion != null) {
	                if(organizacion[0].direccion == null)
	                {
	                   direccion = jQuery.i18n.prop('msg_not_available'); 
	                }
	                else
	                {
	                    direccion= organizacion[0].direccion;
	                }
	                if(organizacion[0].ciudad == null)
	                {
	                   ciudad = jQuery.i18n.prop('msg_not_available');
	                }
	                else
	                {
	                    ciudad= organizacion[0].ciudad;
	                }
	                if(organizacion[0].provincia == null)
	                {
	                   provincia = jQuery.i18n.prop('msg_not_available'); 
	                }
	                else
	                {
	                    provincia= organizacion[0].provincia;
	                }
	                if(organizacion[0].pais == null)
	                {
	                   pais = jQuery.i18n.prop('msg_not_available'); 
	                }
	                else
	                {
	                    pais= organizacion[0].pais;
	                }
	                if(organizacion[0].email == null)
	                {
	                   email = jQuery.i18n.prop('msg_not_available'); 
	                }
	                else
	                {
	                    email= organizacion[0].email;
	                }
	                if(organizacion[0].descripcion == null)
	                {
	                   description = jQuery.i18n.prop('msg_not_available'); 
	                }
	                else
	                {
	                    description= organizacion[0].descripcion;
	                }
	                if(organizacion[0].telefono == null)
	                {
	                   telefono = jQuery.i18n.prop('msg_not_available');
	                }
	                else
	                {
	                    telefono= organizacion[0].telefono;
	                }
	                if(organizacion[0].website == null)
	                {
	                   website = jQuery.i18n.prop('msg_not_available');
	                }
	                else
	                {
	                    website= organizacion[0].website;
	                }
	
	                var globo = organizacion[0].nombre + ", " + direccion + ", " + ciudad;
	                
	                descripcionn='<h2 style="font-family:lobster;">'+organizacion[0].nombre+'</h2>\n\
	                                <div class="textodesc"><p>\n\
	                                    '+description+'</p>\n\
	                                </div>\n\
	                                <div class="datos">\n\
	                                    <p>\n\
	                                    <h3>Web: </h3><br><a href="JavaScript:loadURL(\''+website+'\')">'+website+'</a>\n\
	                                    <br><h3>Email: </h3>'+email+'\n\
	                                    <br><h3>' + jQuery.i18n.prop('msg_tlf') + '</h3>'+telefono+'\n\
	                                    <br><h3>' + jQuery.i18n.prop('msg_direcc') + '</h3>'+direccion+'\n\
	                                    <br><h3>' + jQuery.i18n.prop('msg_ciudad') + '</h3>'+ciudad+'\n\
	                                    <br><h3>' + jQuery.i18n.prop('msg_prov') + '</h3>'+provincia+'\n\
	                                    <br><h3>' + jQuery.i18n.prop('msg_pais') + '</h3>'+pais+'\n\
	                                    </p>\n\
	                                </div>';
//	                fotos='<div id="slider" class="flexslider">\n\
//	                            <ul class="slides">';
	                //recorremos el arras y tomamos los datos y construimos la tabla 
	                if(organizacion[0].imagenes!=null)
	                {
	                    for(var i = 0; i < organizacion[0].imagenes.length; i++ )
	                    {
	                        
//	                        rellenaFotos += '<li>\n\
//	                                            <img src="http://'+organizacion[0].imagenes[i].imagen+'" />\n\
//	                                        </li>'; 
	                    	if(i%2 == 0 && i > 0) {
	                    		fotos += '<br><br><br>';
	                    	}
	                    	fotos += '<a href="JavaScript:showFoto(\'http://' + organizacion[0].imagenes[i].imagen 
	                    	+ '\');" data-rel="popup"  style="float:left;width:50%;margin:auto; text-align: center"><img src="http://'+organizacion[0].imagenes[i].imagen
	                    	+'" style="max-height:100px;"/></a>';
	                    	
	                    }   
//	
//	                     fotos+= rellenaFotos;
//	                     fotos+= '</ul>\n\
//	                            </div>';
//	                    if(organizacion[0].imagenes.length > 1)
//	                    {
//	                        fotosCarrousel='<div id="carousel" class="flexslider">\n\
//	                                            <ul class="slides">';
//	                                                fotosCarrousel+=rellenaFotos;
//	                           fotosCarrousel+='</ul>\n\
//	                                        </div>';
//	                        fotos+= fotosCarrousel;
//	                    }
	
	
	                }
	
	                $('div.descripcion').html(descripcionn);
	                $('div.descripcion').click(function() {
	                	showPopUpMenuOrg(organizacion[0].idOrganizacionn, organizacion[0].nombre
	                			, organizacion[0].direccion, organizacion[0].latitud, organizacion[0].longitud);
	                });
	                $('div.galeria').html(fotos);
	                if((organizacion[0].longitud != null) || (organizacion[0].latitud != null)) 
	                {
//	                    var mapas = '<div id="mapa-llegar" style="width: 400px; height: 300px;"></div>';          
//	                    $('div.mapa-tesoro').html(mapas);
//	                    var mapa = "mapa-llegar";
//	                    //loadMapaBar(organizacion[0].latitud, organizacion[0].longitud,mapa);
//	                    initialize(organizacion[0].latitud, organizacion[0].longitud,mapa, globo);
	                }
                } else {
                	//TODO
                }
            }//fin succes
        });//fin Ajax

        var localiza = {
            idOrg : sessvars.idOrganizacion
            };// esto era para ver que si enviaba este Json al PHP lo le√≠a ah√≠, CORRECTO

        //para cargar la lista de eventos
        $.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/eventos/obtenerListaEventosDiscoteca.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: localiza,
            success:function(data)
            {
                var HTML2="";
                var creaTable2 = "";
                var rellenaTable2 = "";
                var eventosTable2="";
                var apuntaLista="";

                //creo la tabla en la que mostrare resultados, ya lo acoplaremos al theme

                var eventos = data;
                //recorremos el arras y tomamos los datos y construimos la tabla 
                creaTable2 = '<table class="dates" cellpadding="0" cellspacing="0" border="0"><h2 style="font-family:lobster;">Eventos</h2>\n';
                
                if(eventos != null) {
	                //recorremos el arras y tomamos los datos y construimos la tabla 
	                for(var i = 0; i < eventos.length; i++ )
	                {
	
	                	apuntaLista = '';
	
	
	                    var impar = (i+1)%2;
	                    //miramos si es fila par o impar
	                    var typeRow = "";
	                    if(impar != 0)
	                    {
	                    	typeRow = "even";
	                    }
	                    if(eventos[i].entradasRestantes<=0) {
                        	eventos[i].hayEntradas = "0";
                        }
                        if(eventos[i].numPersLista<=0) {
                        	eventos[i].hayLista = "0";
                        }
                        if(eventos[i].hora1== null) {
                        	eventos[i].hayLista = "0";
                        } else if(eventos[i].hora1.length == 0){
                        	eventos[i].hayLista = "0";
                        }
	                    rellenaTable2 += '<tr class="'+ typeRow + '" onclick="showPopUpMenuEventoLista(\''+eventos[i].nombre+'\',\''+eventos[i].idEventoo
											+'\',\''+eventos[i].nombreOrganizacion+'\',\''+eventos[i].idOrganizacionn
											+'\',\'' + eventos[i].fechaini + '\',\'' + eventos[i].dto + '\',\'' 
											+ eventos[i].precioCon + '\',\'' + 'EUR' + '\',\'' + eventos[i].descripCompra + '\',\'' + eventos[i].hayLista 
											+ '\',\'' + eventos[i].hayEntradas + '\',\'' + eventos[i].maxAcomp + '\',\'' + eventos[i].precio1 + '\',\'' 
											+ eventos[i].precio2 + '\',\'' + eventos[i].precio3 + '\',\'' + eventos[i].hora1 +  '\',\'' + eventos[i].hora2 +  '\',\'' + eventos[i].hora3 + '\');">\n\
					            <td class="col1">\n\
					                <a href="#" class="name">'+eventos[i].nombre+'</a></br>\n\
					                <a href="#" class="name">(@'+eventos[i].nombreOrganizacion+')</a><br>'+eventos[i].fechaini+'<br>\n\
					                <img class="flyer" onclick="showFoto(\'http://'+eventos[i].imagenEvent+'\');" src="http://'+eventos[i].imagenEvent+'"/>\n\
					            </td>';
	
//	                    		if(eventos[i].hayEntradas == "1" || eventos[i].hayLista == "1") {
	                    			rellenaTable2 += '<td>';
//	                    		}
	                    		if(eventos[i].hayEntradas == "1") {
	                    			rellenaTable2 += '<div class="cabeceracompra">\n\
					                    <div class="preciocompra">\n\
					                		<p>' + jQuery.i18n.prop('msg_before') + ' '+eventos[i].precioSin+eventos[i].moneda+', ' + jQuery.i18n.prop('msg_now') + ' '+eventos[i].precioCon+eventos[i].moneda+'</p>\n\
					                    </div>\n\
					                </div>\n\
					                <div class="cabeceraprecio">\n\
					                    <div class="tddiscount">\n\
					                        <div>\n\
					                            <p>'+eventos[i].descripCompra+'</p>\n\
					                        </div>\n\
					                    </div>\n\
					                    <div class="tddiscount">\n\
					                        <div id="discount1" class="discount">\n\
					                            <p>'+eventos[i].descuento+'%</p>\n\
					                        </div>\n\
					                    </div>\n\
					                </div>';
	                    		}
	                    		if(eventos[i].hayLista =="1") {
					                rellenaTable2 += '<div class="cabeceracompra">\n\
					                <div class="preciocompra">\n\
					            		<p>' + jQuery.i18n.prop('msg_list') + '</p>\n\
					                </div>\n\
					                <ul>';
					                	if(eventos[i].hora1!= null && eventos[i].hora1.length > 0)
										{
					                		rellenaTable2 += '<li>' +
					                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora1 + ' ';
					                            if(eventos[i].precio1 == 0)
					                            {
					                                rellenaTable2 += jQuery.i18n.prop('msg_free');
					                            }
					                            else
					                            {
					                                rellenaTable2 += eventos[i].precio1+' '+eventos[i].moneda;
					                            }
					                        rellenaTable2 += '</li>';
										}
												if(eventos[i].hora2!= null)
												{
												    rellenaTable2 += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora2 + ' ';
												                            if(eventos[i].precio2 == 0)
												                            {
												                                rellenaTable2 += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                                rellenaTable2 += eventos[i].precio2+' '+eventos[i].moneda;
												                            }
												            rellenaTable2 += '</li>';
												}
												if(eventos[i].hora3!= null)
												{
												    rellenaTable2 += '<li>' +
							                			jQuery.i18n.prop('msg_until') + ' '+ eventos[i].hora3 + ' ';
												                            if(eventos[i].precio3 == 0)
												                            {
												                                rellenaTable2 += jQuery.i18n.prop('msg_free');
												                            }
												                            else
												                            {
												                                rellenaTable2 += eventos[i].precio3+' '+eventos[i].moneda;
												                            }
												            rellenaTable2 += '</li>';
												}
												    rellenaTable2 += '</ul>\n\
												                </div>';
	                    		}
					            rellenaTable2 += '</td>\n\
					        </tr>\n\
					    </tr>';
	                }
	            }
	            else
	            {
	
	                creaTable2 = '<table class="dates" cellpadding="0" cellspacing="0" border="0">\n\
	                <tr class="thead">\n\
	                <td class="col1">' + jQuery.i18n.prop('msg_no_eventos_org') + '</td>\n\
	                            </tr>';
	            }

        
        //mostramos la tabla
                HTML2 = apuntaLista + creaTable2 + rellenaTable2 + "</table>";
                $('div.table-border').html(HTML2);
                setFontSize();
                $.mobile.hidePageLoadingMsg();
            },//fin succes
            error: function (request, status, error) {
                console.log('obtenerInfoDiscoteca ' + request.responseText);
                $.mobile.hidePageLoadingMsg();
            }
        });//fin Ajax


}//fin function login


//paises.js
function print_country(country_id){
	console.log('print_country');
	if(sessvars.paises != null) {
		// given the id of the <select> tag as function argument, it inserts <option> tags
		var option_str = document.getElementById(country_id);
	
		option_str.length=0;
		option_str.options[0] = new Option(jQuery.i18n.prop('msg_select_country'),'');
		option_str.selectedIndex = 0;
		
		for (var i=0; i<sessvars.paises.length; i++) {
			option_str.options[option_str.length] = new Option(sessvars.paises[i],sessvars.paises[i]);
		}
		selectDesplegable();
	}
}

function print_state(state_id, state_index){
	if(sessvars.provincias != null) {
		var option_str = document.getElementById(state_id);
		option_str.length=0;
		option_str.options[0] = new Option(jQuery.i18n.prop('msg_select_state'),'');
		option_str.selectedIndex = 0;
		console.log('Provincias length ' + sessvars.provincias.length + " state index " + state_index);
		var state_arr = 0;
		if(state_index > 0)
			state_arr = sessvars.provincias[state_index-1];
		for (var i=0; i<state_arr.length; i++) {
			option_str.options[option_str.length] = new Option(state_arr[i],state_arr[i]);
		}
	}
}

//usuarios.js
/* 
 * archivo Js para el manejo de datos de la pagina index, o pantalla donde se haga el login
 */
/**
 * ATENCION!!! no te dejes llevar por el nombre, es reutilizacion de codigo
 */


function LoginDeTodaLaVida()
{
	var usu;
	var clave;
	if(sessvars.lang == 'es') {
		console.log('LoginDeTodaLaVida es');
		usu= document.getElementById("usuario").value;
	    clave = document.getElementById("clave").value;
	} else if(sessvars.lang == 'en'){
		console.log('LoginDeTodaLaVida en');
		usu= document.getElementById("usuarioen").value;
	    clave = document.getElementById("claveen").value;
	}
    

    if ((usu==''|| clave=='')||(usu==null || clave == null))
    {
        alert(jQuery.i18n.prop('msg_no_pas'));//eso es la –
    }
    else
    {
    	showLoading(jQuery.i18n.prop('msg_login'));
        passMd5 = hex_md5(clave);

        var log = {
            usuario : usu,
            pass : passMd5
            };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO



    jQuery.ajax({
            url:"https://www.worldinthenight.com/serviciosPHPMovil/logAndReg/login.php",//ya lo cambiaremos
            type:'POST',
            dataType: 'json',
            data: log,
            success:function(data)
            {
                var apodo = "";
                var usuPais = "";
                var usuProv = "";
                var usuEmail = "";

                var idUsuario = "";

                // simplemente asignamos el JSON recibido a la variable usuarios para acceder a sus datos como se accede a un JSON
                var usuarios = data;
                //recorremos el arras y tomamos los datos y construimos la tabla 

                if(usuarios[0].idUsu != "no existe el usuario, o la combinacion clave-usuario no es correcta")
                {
                    if((usuarios[0].idUsu != "error en la consulta"))
                    {
                        for(var i = 0; i < usuarios.length; i++ )
                        {
                            var usuRecogido=usuarios[i].pais;
                            if(sessvars.idioma == "esp")
                            {
                                for(var m=0; m<sessvars.countries.length; m++)
                                {
                                    if(sessvars.countries[m]==usuRecogido)
                                    {
                                        usuRecogido=sessvars.paises[m];
                                        m=sessvars.countries.length;
                                    }

                                }
                            }
          
                            idUsuario = usuarios[i].idUsu;
                            sessvars.idUsuario = idUsuario;
                            sessvars.usuMail = usuarios[i].email;
                            usuEmail = sessvars.usuMail;
                            sessvars.usuPais = usuRecogido;
                            sessvars.usuProv = usuarios[i].provincia;
                            sessvars.apodo = usuarios[i].apodo;
                            sessvars.nombreUsReg = usuarios[i].nombre;
                            sessvars.apellidosUsReg = usuarios[i].apellidos;
                            sessvars.usuCiudadReg = usuarios[i].ciudad;
                            sessvars.notificacion = usuarios[i].notificacion;
                            sessvars.boletin = usuarios[i].boletin;
                        }
                        comprobarUserLogueado();
                        closePopupLogin();
                        alert(jQuery.i18n.prop('msg_welcome') + ' ' + sessvars.apodo);
                    }
                    else
                    {
                    	comprobarUserLogueado();
                        closePopupLogin();
                        alert(jQuery.i18n.prop('msg_no_connection') + ' ' +usuarios[0].idUsu);

                    }
                }
                else
                {
                	comprobarUserLogueado();
                    closePopupLogin();
                    
                    alert(jQuery.i18n.prop('msg_no_connection') + ' ' +usuarios[0].idUsu);
                }

                
        
                $.mobile.hidePageLoadingMsg();
//                window.location.href = '#close';
            },//fin succes
            error: function (request, status, error) {
                console.log('logindetodalavida ' + request.responseText);
                comprobarUserLogueado();
                $.mobile.hidePageLoadingMsg();
            }
        });//fin Ajax
    }
}//fin function login


function LoginRedSocial()
{   
    var log = {
        idrs : sessvars.idRedSocial,
        nomrs : sessvars.redsocial
        };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO

    jQuery.ajax({
        url:"https://www.worldinthenight.com/serviciosPHPMovil/logAndReg/loginRs.php",//Cambiar a login por Red Social
        type:'POST',
        dataType: 'json',
        data: log,
        success:function(data)
        {
            var apodo = "";
            var usuPais = "";
            var usuProv = "";
            var usuEmail = "";

            var idUsuario = "";

            // simplemente asignamos el JSON recibido a la variable usuarios para acceder a sus datos como se accede a un JSON
            var usuarios = data;
            //recorremos el arras y tomamos los datos y construimos la tabla 
            if(usuarios != null) { //Ya está registrado 
                for(var i = 0; i < usuarios.length; i++ )
                {
    
                    var usuRecogido=usuarios[i].pais;
                    if(sessvars.idioma == "esp")
                    {
                        for(var m=0; m<sessvars.countries.length; m++)
                        {
                            if(sessvars.countries[m]==usuRecogido)
                            {
                                usuRecogido=sessvars.paises[m];
                                m=sessvars.countries.length;
                            }

                        }
                    }
                    idUsuario = usuarios[i].idUsu;
                    sessvars.idUsuario = idUsuario;
                    sessvars.usuMail = usuarios[i].email;
                    usuEmail = sessvars.usuMail;
                    sessvars.usuPais = usuRecogido;
                    sessvars.usuProv = usuarios[i].provincia;
                    sessvars.apodo = usuarios[i].apodo;
                    sessvars.nombreUsReg = usuarios[i].nombre;
                    sessvars.apellidosUsReg = usuarios[i].apellidos;
                    sessvars.usuCiudadReg = usuarios[i].ciudad;
                    sessvars.notificacion = usuarios[i].notificacion;
                    sessvars.boletin = usuarios[i].boletin;
                }

                //alert("Bienvenido "+ sessvars.apodo);
                comprobarUserLogueado();
            } 
            else 
            { //aún no está registrado
                lanzarFormRegistroRS();
            }
    
    //mostramos la tabla

        }//fin succes
    });//fin Ajax
}//fin function login




function registroNormal()
{
	if(sessvars.lang == 'es') {
		var usu= document.getElementById("usuarioReg").value;
	    var pass=document.getElementById("p1").value;
	    var passConfirm=document.getElementById("p2").value;
	    var email=document.getElementById("emailReg").value;
	    var nombre= document.getElementById("nombreReg").value;
	    var apellido=document.getElementById("apellidosReg").value;
	    var ciudad=document.getElementById("ciudadReg").value;
	    var boletinC = document.getElementById("boletinReg");
	    var aceptocond = document.getElementById("aceptoCond");
	    var indexSelectedIdUsu=document.getElementById("pais").selectedIndex;
	    var valSelectedIdUsu=document.getElementById("pais").options;
	    var indexSelectedIdUsu1=document.getElementById("prov").selectedIndex;
	    var valSelectedIdUsu1=document.getElementById("prov").options;
	} else {
		var usu= document.getElementById("usuarioRegen").value;
	    var pass=document.getElementById("p1en").value;
	    var passConfirm=document.getElementById("p2en").value;
	    var email=document.getElementById("emailRegen").value;
	    var nombre= document.getElementById("nombreRegen").value;
	    var apellido=document.getElementById("apellidosRegen").value;
	    var ciudad=document.getElementById("ciudadRegen").value;
	    var boletinC = document.getElementById("boletinRegen");
	    var aceptocond = document.getElementById("aceptoConden");
	    var indexSelectedIdUsu=document.getElementById("paisen").selectedIndex;
	    var valSelectedIdUsu=document.getElementById("paisen").options;
	    var indexSelectedIdUsu1=document.getElementById("proven").selectedIndex;
	    var valSelectedIdUsu1=document.getElementById("proven").options;
	}
    
    var idRs = "000000"
    var proveedor = "WITN";
    var aceptado=0;
    
    if(boletinC.checked)
    {
        boletin = "1";
    }
    else
    {
        boletin = "0";
    }
//    if(document.getElementById("notificacionReg").checked)
//    {
//        notificacion = "1";
//    }
//    else
//    {
//        notificacion = "0";
//    }

    if(aceptocond.checked)
    {
        aceptado = 1;
    }
    else
    {
        alert(jQuery.i18n.prop('msg_conditions'));
    }
    
    if(usu.length == 0 && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_put_user'));
    }
    if(pass.length == 0 && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_put_pass'));
    }
    if(passConfirm.length == 0 && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_put_pass_confirm'));
    }
    if((pass != passConfirm) && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_pass_pass_confirm'));
    }
    if(nombre.length == 0 && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_put_name'));
    }
    if(apellido.length == 0 && aceptado == 1) {
    	aceptado = 0;
    	alert(jQuery.i18n.prop('msg_put_lastname'));
    }

    


    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (pais/country)
    
    if(indexSelectedIdUsu == 0 && aceptado == 1) {
    	aceptado = "0";
    	alert(jQuery.i18n.prop('msg_select_country'));
    }
    //tomamos todas las opciones del desplegable
    
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var pais= valSelectedIdUsu[indexSelectedIdUsu].text;

    //almacenamos el pais seleccionado en sesion
    if(sessvars.idioma == "esp")
    {
        pais = sessvars.countries[indexSelectedIdUsu-1];
    }
    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (provincia/state)
    if(indexSelectedIdUsu1 == 0 && aceptado == 1) {
    	aceptado = "0";
    	alert(jQuery.i18n.prop('msg_select_state'));
    }
    //tomamos todas las opciones del desplegable
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var provincia= valSelectedIdUsu1[indexSelectedIdUsu1].text;


    passMd5 = hex_md5(pass);

    if(aceptado ==1)
    {
    	showLoading(jQuery.i18n.prop('msg_registering'));
        var reg = {
                usuario : usu,
                pass : passMd5,
                mail: email,
                nombre: nombre,
                apellidos: apellido,
                pais: pais,
                provincia: provincia,
                ciudad: ciudad,
                boletin: boletin,
                notificacion: "0",
                idRsoc: idRs,
                prov: proveedor
                };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO

        jQuery.ajax({
                url:"https://www.worldinthenight.com/serviciosPHPMovil/logAndReg/registro.php",//ya lo cambiaremos
                type:'POST',
                headers: { "Accept-Encoding" : "gzip" },
                dataType: 'json',
                data: reg,
                success:function(data)
                {

                    var apodo = "";
                    var usuPais = "";
                    var usuProv = "";
                    var usuEmail = "";

                    var usuarios = data;

                    if(usuarios[0].idUsu=="usuario ya registrado")
                    {
                    	comprobarUserLogueado();
                        closePopupRegistro();
                        alert(jQuery.i18n.prop('msg_user_exists'));
                    }
                    else
                    {
                    	if(usuarios[0].idUsu=="nombre ya registrado")
                        {
                            alert(jQuery.i18n.prop('msg_username_exists'));
                        }
                        else
                        {
	                        if(usuarios[0].idUsu=="ha habido un error con el registro")
	                        {
	                        	comprobarUserLogueado();
	                            closePopupRegistro();
	                            alert(jQuery.i18n.prop('msg_err_registro'));
	                        }
	                        else
	                        {
	
	                            for(var i = 0; i < usuarios.length; i++ )
	                            {
	
	                                var usuRecogido=usuarios[i].pais;
	                                if(sessvars.idioma == "esp")
	                                {
	                                    for(var m=0; m<sessvars.countries.length; m++)
	                                    {
	                                        if(sessvars.countries[m]==usuRecogido)
	                                        {
	                                            usuRecogido=sessvars.paises[m];
	                                            m=sessvars.countries.length;
	                                        }
	
	                                    }
	                                }
	
	                                idUsuario = usuarios[i].idUsu;
	                                sessvars.idUsuario = idUsuario; //id de usuario, sera util para cosas como apuntarse en lista o comprar
	                                sessvars.usuMail = usuarios[i].email; //e-mail del usuario, importante por si hay que mandarle un correo
	                                usuEmail = sessvars.usuMail;
	                                sessvars.usuPais = usuRecogido;
	                                sessvars.usuProv = usuarios[i].provincia;
	                                sessvars.apodo = usuarios[i].apodo;
	                                sessvars.nombreUsReg = usuarios[i].nombre;
	                                sessvars.apellidosUsReg = usuarios[i].apellidos;
	                                sessvars.usuCiudadReg = usuarios[i].ciudad;
	                                sessvars.notificacion = usuarios[i].notificacion;
	                                sessvars.boletin = usuarios[i].boletin;
	                            }
	                            
	                            comprobarUserLogueado();
	                            closePopupRegistro();
	                            alert(jQuery.i18n.prop('msg_registered') + ' '+ sessvars.apodo +jQuery.i18n.prop('msg_registered_cont'));
	                            
	                        }
                        }

                    }
                    $.mobile.hidePageLoadingMsg();
            
            },//fin succes
            error: function (request, status, error) {
                console.log('error: ' + request.responseText);
                comprobarUserLogueado();
                closePopupRegistro();
                $.mobile.hidePageLoadingMsg();
            }
        });//fin Ajax
    }
}



function registroRs()
{

    var usu= document.getElementById("usuarioRegRs").value;
    var email=document.getElementById("emailRegRs").value;
    var nombre= document.getElementById("nombreRegRs").value;
    var apellido=document.getElementById("apellidosRegRs").value;
    var ciudad=document.getElementById("ciudadRegRs").value;
    var idRs = sessvars.idRedSocial;
    var proveedor = sessvars.redsocial; 
    var pass = "";
    var aceptado = "0";

    if(document.getElementById("boletinRegRs").checked)
    {
        boletin = "1";
    }
    else
    {
        boletin = "0";
    }
    if(document.getElementById("notificacionRegRs").checked)
    {
        notificacion = "1";
    }
    else
    {
        notificacion = "0";
    }
    if(document.getElementById("aceptoCondRs").checked)
    {
        aceptado = "1";
    }
    else
    {
        alert(jQuery.i18n.prop('msg_conditions'));
    }

    

    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (pais/country)
    var indexSelectedIdUsu=document.getElementById("paisRs").selectedIndex;
    //tomamos todas las opciones del desplegable
    var valSelectedIdUsu=document.getElementById("paisRs").options;
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var pais= valSelectedIdUsu[indexSelectedIdUsu].text;

    //almacenamos el pais seleccionado en sesion
    if(sessvars.idioma == "esp")
    {
        pais = sessvars.countries[indexSelectedIdUsu-1];
    }

    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (provincia/state)
    var indexSelectedIdUsu1=document.getElementById("provRs").selectedIndex;
    //tomamos todas las opciones del desplegable
    var valSelectedIdUsu1=document.getElementById("provRs").options;
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var provincia= valSelectedIdUsu1[indexSelectedIdUsu1].text;


    
    if(aceptado ==1)
    {
        var reg = {
                usuario : usu,
                pass : pass,
                mail: email,
                nombre: nombre,
                apellidos: apellido,
                pais: pais,
                provincia: provincia,
                ciudad: ciudad,
                boletin: boletin,
                notificacion: notificacion,
                idRsoc: idRs,
                prov: proveedor
                };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO

        jQuery.ajax({
            url:"https://www.worldinthenight.com/serviciosPHPMovil/logAndReg/registroRs.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: reg,
            success:function(data)
            {

                var apodo = "";
                var usuPais = "";
                var usuProv = "";
                var usuEmail = "";

                var usuarios = data;

                if(usuarios[0].idUsu=="usuario ya registrado")
                {
                    alert(jQuery.i18n.prop('msg_user_exists'))
                }
                else
                {
                    if(usuarios[0].idUsu=="ha habido un error con el registro")
                    {
                        alert(jQuery.i18n.prop('msg_err_registro'))
                    }
                    else
                    {

                        for(var i = 0; i < usuarios.length; i++ )
                        {

                            var usuRecogido=usuarios[i].pais;
                            if(sessvars.idioma == "esp")
                            {
                                for(var m=0; m<sessvars.countries.length; m++)
                                {
                                    if(sessvars.countries[m]==usuRecogido)
                                    {
                                        usuRecogido=sessvars.paises[m];
                                        m=sessvars.countries.length;
                                    }

                                }
                            }

                            idUsuario = usuarios[i].idUsu;
                            sessvars.idUsuario = idUsuario; //id de usuario, sera util para cosas como apuntarse en lista o comprar
                            sessvars.usuMail = usuarios[i].email; //e-mail del usuario, importante por si hay que mandarle un correo
                            usuEmail = sessvars.usuMail;
                            sessvars.usuPais = usuRecogido;
                            sessvars.usuProv = usuarios[i].provincia;
                            sessvars.apodo = usuarios[i].apodo;
                            sessvars.nombreUsReg = usuarios[i].nombre;
                            sessvars.apellidosUsReg = usuarios[i].apellidos;
                            sessvars.usuCiudadReg = usuarios[i].ciudad;
                            sessvars.notificacion = usuarios[i].notificacion;
                            sessvars.boletin = usuarios[i].boletin;
                        }

                        alert(jQuery.i18n.prop('msg_registered_red_social') + ' '+ sessvars.apodo +jQuery.i18n.prop('msg_registered_cont'));
                        comprobarUserLogueado();
                        closePopupRegistro();
                    }

                }
                
            },//fin succes
            error: function (request, status, error) {
                console.log('error: ' + request.responseText);
            }
        });//fin Ajax
    }

}


function comprobarUserLogueado() 
{
    if(sessvars.idUsuario != null) 
    {
        
        console.log('Usuario registrado ' + sessvars.idUsuario + ' ' + sessvars.usuMail);
//        print_country('paisPerfil');
//        document.getElementById('paisPerfil').value = sessvars.usuPais;
//
//        var indexSelectedIdUsu=document.getElementById("paisPerfil").selectedIndex;
//        
//        print_state('provPerfil',indexSelectedIdUsu);
//        //cargarPais();
//        document.getElementById('provPerfil').value = sessvars.usuProv;

//        $('#loginBtn').css("display", "none");
//        $('#perfilBtn').css("display", "block");
        $('#loginLi').hide();
        $('#perfilLi').show();
        $('#logoutLi').show();
        if(sessvars.lang == 'es') {
        	$('#usuarioRegPerfil').val(sessvars.apodo);
            $('#nombreRegPerfil').val(sessvars.nombreUsReg);
            $('#apellidoRegPerfil').val(sessvars.apellidosUsReg);
            $('#emailRegPerfil').val(sessvars.usuMail);
            $('#ciudadRegPerfil').val(sessvars.usuCiudadReg);
            if(sessvars.notificacion =="1")
            {
                //$('#notificacionRegPerfil').attr("checked","checked");
                document.getElementById("notificacionRegPerfil").checked = true;
            }
            if(sessvars.boletin =="1")
            {          
                //$('#boletinRegPerfil').attr("checked","checked");
                document.getElementById("boletinRegPerfil").checked = true;
            }
        } else {
        	$('#usuarioRegPerfilen').val(sessvars.apodo);
            $('#nombreRegPerfilen').val(sessvars.nombreUsReg);
            $('#apellidoRegPerfilen').val(sessvars.apellidosUsReg);
            $('#emailRegPerfilen').val(sessvars.usuMail);
            $('#ciudadRegPerfilen').val(sessvars.usuCiudadReg);
            if(sessvars.notificacion =="1")
            {
                //$('#notificacionRegPerfil').attr("checked","checked");
                document.getElementById("notificacionRegPerfilen").checked = true;
            }
            if(sessvars.boletin =="1")
            {          
                //$('#boletinRegPerfil').attr("checked","checked");
                document.getElementById("boletinRegPerfilen").checked = true;
            }
        }
        

    } 
    else 
    {
        if(sessvars.idRedSocial != null) 
        {
            LoginRedSocial();
            print_country('paisPerfil');
            document.getElementById('paisPerfil').value = sessvars.usuPais;

            var indexSelectedIdUsu=document.getElementById("paisPerfil").selectedIndex;
            
            print_state('provPerfil',indexSelectedIdUsu);
                //cargarPais();
            document.getElementById('provPerfil').value = sessvars.usuProv;

//            $('#loginBtn').css("display", "none");
//            $('#perfilBtn').css("display", "block");
            $('#loginLi').hide();
            $('#perfilLi').show();
            $('#logoutLi').show();
            $('#usuarioRegPerfil').val(sessvars.apodo);
            $('#nombreRegPerfil').val(sessvars.nombreUsReg);
            $('#apellidoRegPerfil').val(sessvars.apellidosUsReg);
            $('#emailRegPerfil').val(sessvars.usuMail);
            $('#ciudadRegPerfil').val(sessvars.usuCiudadReg);
            if(sessvars.notificacion =="1")
            {
                //$('#notificacionRegPerfil').attr("checked","checked");
                document.getElementById("notificacionRegPerfil").checked = true;
            }
            if(sessvars.boletin =="1")
            {           
                //$('#boletinRegPerfil').attr("checked","checked");
                document.getElementById("boletinRegPerfil").checked = true;
            }
        } 
        else 
        {
//            $('#loginBtn').css("display", "block");
//            $('#perfilBtn').css("display", "none");
            $('#perfilLi').hide();
            $('#logoutLi').hide();
            $('#loginLi').show();

            console.log('No usuario registrado');   
        }
    }
    print_country('country');
    $.mobile.hidePageLoadingMsg();
}

function lanzarFormRegistroRS() 
{

    /*if(sessvars.idioma == "esp")
    {
        document.getElementById('country').value = sessvars.pais;
    }
    else
    {
        document.getElementById('country').value = sessvars.country;
    }

    document.getElementById('paisRs').value = sessvars.pais;

    var indexSelectedIdUsu=document.getElementById("pais").selectedIndex;

    print_state('provRs',indexSelectedIdUsu);
*/

    $('#usuarioRegRs').val(sessvars.nick);
    $('#nombreRegRs').val(sessvars.nom);
    $('#apellidosRegRs').val(sessvars.apellidos);
    $('#emailRegRs').val(sessvars.mailRS);
    //$('#p1').val("worldinthenightredsocialpasswordparaqueelcamponosearequired");
    //$('#p2').val("worldinthenightredsocialpasswordparaqueelcamponosearequired");
    //$('#p1').css("display", "none");
    //quitar required p1 y p2
    //$('#p2').css("display", "none");
    showRegistroPopup();

}


function comprobarLogueadoRS() 
{
    if(sessvars.idRedSocial != null && sessvars.idUsuario == null) 
    { //Si logueado en fb pero no registrado en sistema
        lanzarFormRegistroRS();
    } 
    else 
    {
    	showLoginPopup();
    }
}






function updateRegistroNormal()
{

	showLoading(jQuery.i18n.prop('msg_updating'));
	if(sessvars.lang == 'es') {
		var usu= document.getElementById("usuarioRegPerfil").value;
	    var email=document.getElementById("emailRegPerfil").value;
	    var nombre= document.getElementById("nombreRegPerfil").value;
	    var apellido=document.getElementById("apellidoRegPerfil").value;
	    var ciudad=document.getElementById("ciudadRegPerfil").value;
	    var boletinC = document.getElementById("boletinRegPerfil");
	    var notificacionC = document.getElementById("notificacionRegPerfil");
	    var indexSelectedIdUsu=document.getElementById("paisPerfil").selectedIndex;
	    //tomamos todas las opciones del desplegable
	    var valSelectedIdUsu=document.getElementById("paisPerfil").options;
	    var indexSelectedIdUsu1=document.getElementById("provPerfil").selectedIndex;
	    //tomamos todas las opciones del desplegable
	    var valSelectedIdUsu1=document.getElementById("provPerfil").options;
	} else{
		var usu= document.getElementById("usuarioRegPerfilen").value;
	    var email=document.getElementById("emailRegPerfilen").value;
	    var nombre= document.getElementById("nombreRegPerfilen").value;
	    var apellido=document.getElementById("apellidoRegPerfilen").value;
	    var ciudad=document.getElementById("ciudadRegPerfilen").value;
	    var boletinC = document.getElementById("boletinRegPerfilen");
	    var notificacionC = document.getElementById("notificacionRegPerfilen");
	    var indexSelectedIdUsu=document.getElementById("paisPerfilen").selectedIndex;
	    //tomamos todas las opciones del desplegable
	    var valSelectedIdUsu=document.getElementById("paisPerfilen").options;
	    var indexSelectedIdUsu1=document.getElementById("provPerfilen").selectedIndex;
	    //tomamos todas las opciones del desplegable
	    var valSelectedIdUsu1=document.getElementById("provPerfilen").options;
	}
    

    if(boletinC.checked)
    {
        boletin = "1";
    }
    else
    {
        boletin = "0";
    }
    if(notificacionC.checked)
    {
        notificacion = "1";
    }
    else
    {
        notificacion = "0";
    }



    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (pais/country)
    
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var pais= valSelectedIdUsu[indexSelectedIdUsu].text;

    //almacenamos el pais seleccionado en sesion
    if(sessvars.idioma == "esp")
    {
        pais = sessvars.countries[indexSelectedIdUsu-1];
    }
   

    //tomamos el index del desplegable, es decir el indice del valor seleccionado en el desplegable (provincia/state)
    
    // con las opciones y el indice obtenemos el valor de la seleccion realizada
    var provincia= valSelectedIdUsu1[indexSelectedIdUsu1].text;


    var reg = {
            idUsuario: sessvars.idUsuario,
            usuario : usu,
            mail: email,
            nombre: nombre,
            apellidos: apellido,
            pais: pais,
            provincia: provincia,
            ciudad: ciudad,
            boletin: boletin,
            notificacion: notificacion
            };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO

    jQuery.ajax({
            url:"https://www.worldinthenight.com/serviciosPHPMovil/logAndReg/updateRegistro.php",//ya lo cambiaremos
            type:'POST',
            headers: { "Accept-Encoding" : "gzip" },
            dataType: 'json',
            data: reg,
            success:function(data)
            {

                var apodo = "";
                var usuPais = "";
                var usuProv = "";
                var usuEmail = "";

                if(data[0].idUsu=="no existe el usuario, no se puede registrar")
                {
                	closePopupPerfil();
                    alert(jQuery.i18n.prop('msg_register_no_update'));
                }
                else
                {
                    if(data[0].idUsu=="error actualizando")
                    {
                    	closePopupPerfil();
                        alert(jQuery.i18n.prop('msg_err_updating'));
                    }
                    else
                    {

                        var usuarios = data;
                        for(var i = 0; i < usuarios.length; i++ )
                        {
                            idUsuario = usuarios[i].idUsu;
                            sessvars.idUsuario = idUsuario; //id de usuario, sera util para cosas como apuntarse en lista o comprar
                            sessvars.usuMail = usuarios[i].email; //e-mail del usuario, importante por si hay que mandarle un correo
                            usuEmail = sessvars.usuMail;
                            sessvars.usuPais = usuarios[i].pais;
                            sessvars.usuProv = usuarios[i].provincia;
                            sessvars.apodo = usuarios[i].apodo;
                            sessvars.nombreUsReg = usuarios[i].nombre;
                            sessvars.apellidosUsReg = usuarios[i].apellidos;
                            sessvars.notificacion = usuarios[i].notificacion;
                            sessvars.boletin = usuarios[i].boletin;
                        }
                        closePopupPerfil();
                        alert(jQuery.i18n.prop('msg_updated'));

                    }

                }
                
                $.mobile.hidePageLoadingMsg();
//              window.location.href = '#close';
          },//fin succes
          error: function (request, status, error) {
              console.log('logindetodalavida ' + request.responseText);
              closePopupPerfil();
              $.mobile.hidePageLoadingMsg();
          }
        });//fin Ajax

}






function logout() 
{
    alert(jQuery.i18n.prop('msg_logout') + ' '+sessvars.apodo +jQuery.i18n.prop('msg_logout_cont'));
    console.log('LogOut');
    if(sessvars.idRedSocial != null && sessvars.redsocial == "facebook") { //Si está logueado con FB
        
        if (!response.authResponse) {
            console.log(response.authResponse);
        }
        else
        {
            FB.logout(response.authResponse);
                // user is now logged out
                console.log(response.authResponse);
                sessvars.idRedSocial = null;
                sessvars.redsocial = null;
                sessvars.nick = null;
                sessvars.nom = null;
                sessvars.apellidos = null;
                sessvars.mailRS = null;
        }

    }
    
    //Poner todos los datos de usuario a null
    sessvars.idUsuario = null;
    sessvars.usuMail = null;
    sessvars.usuPais = null;
    sessvars.usuProv = null;
    sessvars.apodo = null;
    sessvars.nombreUsReg = null;
    sessvars.apellidosUsReg = null;
    sessvars.usuCiudadReg = null;
    sessvars.notificacion = null;
    sessvars.boletin = null;

    
    comprobarUserLogueado();

    //closePopupPerfil();
}

//function enviarMsjContacto()
//{
//    var nom= document.getElementById("nomMail").value;
//    var de=document.getElementById("deMail").value;
//    var mensaje= document.getElementById("cuerpoMail").value;
//
//    var email = {
//            subject: nom,
//            from : de,
//            cuerpo : mensaje
//            };// esto era para ver que si enviaba este Json al PHP lo leía ahí, CORRECTO
//
//
//
//    jQuery.ajax({
//            url:"http://www.worldinthenight.com/serviciosPHP/email/contactomail.php",//ya lo cambiaremos
//            type:'POST',
//            dataType: 'text',
//            data: email,
//            success:function(data)
//            {
//                if(data=="enviado")
//                {
//                    alert("correo enviado");
//                    $('#contactoModal').css('z-index', -99999);
//                    window.location.href = "#close";
//                }
//                else
//                {
//                    alert("el correo no se ha podido enviar, intentalo de nuevo");
//
//                }
//            }//fin succes
//        });//fin Ajax
//
//
//
//}

function recuperarContrasena()
{
    var nom = document.getElementById("usuario").value;
    var email = {
    correo: nom
    };

    jQuery.ajax({
            url:"http://www.worldinthenight.com/serviciosPHPMovil/logAndReg/recuperarContrasena.php",//ya lo cambiaremos
            type:'POST',
            dataType: 'text',
            data: email,
            success:function(data)
            {
                if(data=="enviado")
                {
                    alert(jQuery.i18n.prop('msg_new_pass'));
                    location.href="index.html";
                }
                if(data=="error en la consulta")
                {
                    alert(jQuery.i18n.prop('msg_no_send_new_pass'));
                }
                else
                {
                    alert(jQuery.i18n.prop('msg_email_no_match'));

                }
                
            }//fin succes
        });

}

//utilidades.js

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[navigator.connection.UNKNOWN]  = 'Unknown connection';
    states[navigator.connection.ETHERNET] = 'Ethernet connection';
    states[navigator.connection.WIFI]     = 'WiFi connection';
    states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
    states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
    states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
    states[navigator.connection.NONE]     = 'No network connection';
    console.log('checkConnection ' + networkState);
	if ((states[networkState]) == states[navigator.connection.NONE]) {
		alert(jQuery.i18n.prop('msg_util_no_conex'));
		navigator.app.exitApp();
	} else if(networkState == 'none') {
		alert(jQuery.i18n.prop('msg_util_no_conex'));
		navigator.app.exitApp();
	}
}

function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
}

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

(function(k){function n(c,a){k.ajax({url:c,async:!1,cache:a.cache,contentType:"text/plain;charset="+a.encoding,dataType:"text",success:function(b){r(b,a.mode)}})}function r(c,a){for(var b="",e=c.split(/\n/),d=/(\{\d+\})/g,q=/\{(\d+)\}/g,m=/(\\u.{4})/ig,f=0;f<e.length;f++)if(e[f]=e[f].replace(/^\s\s*/,"").replace(/\s\s*$/,""),e[f].length>0&&e[f].match("^#")!="#"){var g=e[f].split("=");if(g.length>0){for(var o=unescape(g[0]).replace(/^\s\s*/,"").replace(/\s\s*$/,""),h=g.length==1?"":g[1];h.match(/\\$/)==
"\\";)h=h.substring(0,h.length-1),h+=e[++f].replace(/\s\s*$/,"");for(var l=2;l<g.length;l++)h+="="+g[l];h=h.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if(a=="map"||a=="both"){if(g=h.match(m))for(l=0;l<g.length;l++)h=h.replace(g[l],s(g[l]));k.i18n.map[o]=h}if(a=="vars"||a=="both")if(h=h.replace(/"/g,'\\"'),t(o),d.test(h)){for(var g=h.split(d),l=!0,j="",n=[],p=0;p<g.length;p++)if(d.test(g[p])&&(n.length==0||n.indexOf(g[p])==-1))l||(j+=","),j+=g[p].replace(q,"v$1"),n.push(g[p]),l=!1;b+=o+"=function("+
j+"){";o='"'+h.replace(q,'"+v$1+"')+'"';b+="return "+o+";};"}else b+=o+'="'+h+'";'}}eval(b)}function t(c){if(/\./.test(c))for(var a="",c=c.split(/\./),b=0;b<c.length;b++)b>0&&(a+="."),a+=c[b],eval("typeof "+a+' == "undefined"')&&eval(a+"={};")}function s(c){var a=[],c=parseInt(c.substr(2),16);c>=0&&c<Math.pow(2,16)&&a.push(c);for(var c="",b=0;b<a.length;++b)c+=String.fromCharCode(a[b]);return c}k.i18n={};k.i18n.map={};k.i18n.properties=function(c){c=k.extend({name:"Messages",language:"",path:"",mode:"vars",
cache:!1,encoding:"UTF-8",callback:null},c);if(c.language===null||c.language=="")c.language=k.i18n.browserLang();if(c.language===null)c.language="";var a=c.name&&c.name.constructor==Array?c.name:[c.name];for(i=0;i<a.length;i++)n(c.path+a[i]+".properties",c),c.language.length>=2&&n(c.path+a[i]+"_"+c.language.substring(0,2)+".properties",c),c.language.length>=5&&n(c.path+a[i]+"_"+c.language.substring(0,5)+".properties",c);c.callback&&c.callback()};k.i18n.prop=function(c){var a=k.i18n.map[c];if(a==null)return"["+
c+"]";var b;if(typeof a=="string"){for(b=0;(b=a.indexOf("\\",b))!=-1;)a=a[b+1]=="t"?a.substring(0,b)+"\t"+a.substring(b++ +2):a[b+1]=="r"?a.substring(0,b)+"\r"+a.substring(b++ +2):a[b+1]=="n"?a.substring(0,b)+"\n"+a.substring(b++ +2):a[b+1]=="f"?a.substring(0,b)+"\u000c"+a.substring(b++ +2):a[b+1]=="\\"?a.substring(0,b)+"\\"+a.substring(b++ +2):a.substring(0,b)+a.substring(b+1);var e=[],d,j;for(b=0;b<a.length;)if(a[b]=="'")if(b==a.length-1)a=a.substring(0,b);else if(a[b+1]=="'")a=a.substring(0,b)+
a.substring(++b);else{for(d=b+2;(d=a.indexOf("'",d))!=-1;)if(d==a.length-1||a[d+1]!="'"){a=a.substring(0,b)+a.substring(b+1,d)+a.substring(d+1);b=d-1;break}else a=a.substring(0,d)+a.substring(++d);d==-1&&(a=a.substring(0,b)+a.substring(b+1))}else if(a[b]=="{")if(d=a.indexOf("}",b+1),d==-1)b++;else if(j=parseInt(a.substring(b+1,d)),!isNaN(j)&&j>=0){var m=a.substring(0,b);m!=""&&e.push(m);e.push(j);b=0;a=a.substring(d+1)}else b=d+1;else b++;a!=""&&e.push(a);a=e;k.i18n.map[c]=e}if(a.length==0)return"";
if(a.lengh==1&&typeof a[0]=="string")return a[0];m="";for(b=0;b<a.length;b++)m+=typeof a[b]=="string"?a[b]:a[b]+1<arguments.length?arguments[a[b]+1]:"{"+a[b]+"}";return m};k.i18n.browserLang=function(){var c=navigator.language||navigator.userLanguage,c=c.toLowerCase();c.length>3&&(c=c.substring(0,3)+c.substring(3).toUpperCase());return c};var j;if(!j)j=function(c,a,b){if(Object.prototype.toString.call(a)!=="[object RegExp]")return typeof j._nativeSplit=="undefined"?c.split(a,b):j._nativeSplit.call(c,
a,b);var e=[],d=0,k=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.sticky?"y":""),a=RegExp(a.source,k+"g"),m,f,g;c+="";j._compliantExecNpcg||(m=RegExp("^"+a.source+"$(?!\\s)",k));if(b===void 0||+b<0)b=Infinity;else if(b=Math.floor(+b),!b)return[];for(;f=a.exec(c);){k=f.index+f[0].length;if(k>d&&(e.push(c.slice(d,f.index)),!j._compliantExecNpcg&&f.length>1&&f[0].replace(m,function(){for(var a=1;a<arguments.length-2;a++)arguments[a]===void 0&&(f[a]=void 0)}),f.length>1&&f.index<c.length&&Array.prototype.push.apply(e,
f.slice(1)),g=f[0].length,d=k,e.length>=b))break;a.lastIndex===f.index&&a.lastIndex++}d===c.length?(g||!a.test(""))&&e.push(""):e.push(c.slice(d));return e.length>b?e.slice(0,b):e},j._compliantExecNpcg=/()??/.exec("")[1]===void 0,j._nativeSplit=String.prototype.split;String.prototype.split=function(c,a){return j(this,c,a)}})(jQuery);

Cufon.replace('nav a', { fontFamily: 'Josefin Sans' ,textShadow:'1px 1px #fff', hover:{}});
Cufon.replace('h1 a', { fontFamily: 'Lobster' , color:'-linear-gradient(#414141,#2d2d2d)',textShadow:'-1px -1px #000'});
Cufon.replace('h2', { fontFamily: 'Lobster' });

Cufon.replace('.header-more', { fontFamily: 'Lobster',textShadow:'1px 1px #000' ,hover:{color:'#74be00'} });
Cufon.replace('.jp-audio .jp-title', { fontFamily: 'Josefin Sans' });
Cufon.replace('.jp-audio h2', { fontFamily: 'Lobster', textShadow:'2px 2px rgba(0,0,0,.1)' });


sessvars=function(){var x={};x.$={prefs:{memLimit:2000,autoFlush:true,crossDomain:false,includeProtos:false,includeFunctions:false},parent:x,clearMem:function(){for(var i in this.parent){if(i!="$"){this.parent[i]=undefined}}this.flush()},usedMem:function(){x={};return Math.round(this.flush(x)/1024)},usedMemPercent:function(){return Math.round(this.usedMem()/this.prefs.memLimit)},flush:function(x){var y,o={},j=this.$$;x=x||top;for(var i in this.parent){o[i]=this.parent[i]}o.$=this.prefs;j.includeProtos=this.prefs.includeProtos;j.includeFunctions=this.prefs.includeFunctions;y=this.$$.make(o);if(x!=top){return y.length}if(y.length/1024>this.prefs.memLimit){return false}x.name=y;return true},getDomain:function(){var l=location.href;l=l.split("///").join("//");l=l.substring(l.indexOf("://")+3).split("/")[0];while(l.split(".").length>2){l=l.substring(l.indexOf(".")+1)}return l},debug:function(t){var t=t||this,a=arguments.callee;if(!document.body){setTimeout(function(){a(t)},200);return}t.flush();var d=document.getElementById("sessvarsDebugDiv");if(!d){d=document.createElement("div");document.body.insertBefore(d,document.body.firstChild)}d.id="sessvarsDebugDiv";d.innerHTML='<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px"><b style="font-family:Trebuchet MS;font-size:20px">sessvars.js - debug info:</b><br/><br/>Memory usage: '+t.usedMem()+" Kb ("+t.usedMemPercent()+'%)&nbsp;&nbsp;&nbsp;<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>'+top.name.split("\n").join("<br/>")+"</div>";d.getElementsByTagName("span")[0].onclick=function(){t.clearMem();location.reload()}},init:function(){var o={},t=this;try{o=this.$$.toObject(top.name)}catch(e){o={}}this.prefs=o.$||t.prefs;if(this.prefs.crossDomain||this.prefs.currentDomain==this.getDomain()){for(var i in o){this.parent[i]=o[i]}}else{this.prefs.currentDomain=this.getDomain()}this.parent.$=t;t.flush();var f=function(){if(t.prefs.autoFlush){t.flush()}};if(window.addEventListener){addEventListener("unload",f,false)}else{if(window.attachEvent){window.attachEvent("onunload",f)}else{this.prefs.autoFlush=false}}}};x.$.$$={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:true,restoreCirculars:true,make:function(arg,restore){this.restore=restore;this.mem=[];this.pathMem=[];return this.toJsonStringArray(arg).join("")},toObject:function(x){if(!this.cleaner){try{this.cleaner=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}catch(a){this.cleaner=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}}if(!this.cleaner.test(x)){return{}}eval("this.myObj="+x);if(!this.restoreCirculars||!alert){return this.myObj}if(this.includeFunctions){var x=this.myObj;for(var i in x){if(typeof x[i]=="string"&&!x[i].indexOf("JSONincludedFunc:")){x[i]=x[i].substring(17);eval("x[i]="+x[i])}}}this.restoreCode=[];this.make(this.myObj,true);var r=this.restoreCode.join(";")+";";eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');eval(r);return this.myObj},toJsonStringArray:function(arg,out){if(!out){this.path=[]}out=out||[];var u;switch(typeof arg){case"object":this.lastObj=arg;if(this.detectCirculars){var m=this.mem;var n=this.pathMem;for(var i=0;i<m.length;i++){if(arg===m[i]){out.push('"JSONcircRef:'+n[i]+'"');return out}}m.push(arg);n.push(this.path.join("."))}if(arg){if(arg.constructor==Array){out.push("[");for(var i=0;i<arg.length;++i){this.path.push(i);if(i>0){out.push(",\n")}this.toJsonStringArray(arg[i],out);this.path.pop()}out.push("]");return out}else{if(typeof arg.toString!="undefined"){out.push("{");var first=true;for(var i in arg){if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){continue}this.path.push(i);var curr=out.length;if(!first){out.push(this.compactOutput?",":",\n")}this.toJsonStringArray(i,out);out.push(":");this.toJsonStringArray(arg[i],out);if(out[out.length-1]==u){out.splice(curr,out.length-curr)}else{first=false}this.path.pop()}out.push("}");return out}}return out}out.push("null");return out;case"unknown":case"undefined":case"function":if(!this.includeFunctions){out.push(u);return out}arg="JSONincludedFunc:"+arg;out.push('"');var a=["\n","\\n","\r","\\r",'"','\\"'];arg+="";for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])}out.push(arg);out.push('"');return out;case"string":if(this.restore&&arg.indexOf("JSONcircRef:")==0){this.restoreCode.push("this.myObj."+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."))}out.push('"');var a=["\n","\\n","\r","\\r",'"','\\"'];arg+="";for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])}out.push(arg);out.push('"');return out;default:out.push(String(arg));return out}}};x.$.init();return x}();

//initialize settings  
window.fbAsyncInit = function() {  
    FB.init({  
        appId: 583461808339975, //appId of your Facebook app  
        status: true,   
        cookie: true,  
        xfbml: true,  
        oauth: true  
    });  
};  
(function(){var e=document.createElement('script');e.async=true;e.src=document.location.protocol+'//connect.facebook.net/en_US/all.js';document.getElementById('fb-root');}());  
function doFBLogin() {  
    FB.login(function(response) {  
        if (response.authResponse) {  
            var token = response.authResponse.accessToken;  
            //define the login function on your client through FB  
			alert('lo que sea');
			FB.api('/me', function(response) {
			  alert('Your name is ' + response.name);
			});
        } else {  
            //processing an error  
			alert('sdjkfdsjlfjhgf');
        }  
    }, {scope:'email,status_update,publish_stream'});  
//scope ñ the set of fields we received from the server when login  
};



// settings on mobile init
$(document).on('mobileinit', function (e) {
	if (e) { e.preventDefault(); }
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0; // (default: 300ms)
	$.mobile.defaultPageTransition = 'none'; // (default: pop)
	$.mobile.defaultDialogTransition = 'none'; // (default: pop)
	$.event.special.swipe.scrollSupressionThreshold = 40;  // (default: 10px) ñ More than this horizontal displacement, and we will suppress scrolling.
	$.event.special.swipe.durationThreshold = 1000; // (default: 1000ms) ñ More time than this, and it isn't a swipe.
	$.event.special.swipe.horizontalDistanceThreshold = 30; // (default: 30px) ñ Swipe horizontal displacement must 
	$.event.special.swipe.verticalDistanceThreshold = 40; // (default: 75px) ñ Swipe vertical displacement must be less than this.
});

// device ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	console.log('onDeviceReady');
	// execute when app resumes from pause
	//document.addEventListener("resume", onResume, false);
	// execute when app goes to pause (home button or opening other app)
	//document.addEventListener("pause", onPause, false);
	// override default backbutton behavior with own
	document.addEventListener("backbutton", pressBackButton, false);
	
//	document.addEventListener( 'touchmove', function(e){ onStartM(e); }, false );
//    function onStartM ( touchEvent ) {
//    	console.log('touchmove');
//    	touchEvent.preventDefault();
//    }
//    document.addEventListener( 'touchstart', function(e){ onStartS(e); }, false );
//    function onStartS ( touchEvent ) {
//    	console.log('touchstart');
//    	touchEvent.preventDefault();
//    }
//    document.addEventListener( 'touchend', function(e){ onStartE(e); }, false );
//    function onStartE ( touchEvent ) {
//    	console.log('touchend');
//    	touchEvent.preventDefault();
//    }
	// demonstrate panel menu on first boot
	if (window.localStorage.getItem('firstBoot') === null) {
		$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_selected.png");
		setTimeout(function () {
			togglePanel('#panelMenuIndex');
		}, 500);
		setTimeout(function () {
			$("#headerTitle" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu.png");
			togglePanel('#panelMenuIndex');
		}, 1500);
		window.localStorage.setItem('firstBoot', 'done');
	}
}

// override default back button handling
function pressBackButton() {
	console.log('pressBackButton ' + sessvars.bloquearBack);
//	if(sessvars.bloquearBack == 0) {
		// if panel is not open, then go on
		if (window.localStorage.getItem('panelLeft') === 'closed') {
			if ($.mobile.activePage.is('#indexPage')) {
				navigator.app.exitApp();
			} else {
				window.history.back();
			}
		// else close panels first, and stop further action
		} else {
			if (window.localStorage.getItem('panelLeft') === 'open') {
				var divLeftId = '#panelMenu' + window.localStorage.getItem("divIdGlobal");
				$(divLeftId).panel("close");
			} else if (window.localStorage.getItem('panelRight') === 'open') {
				var divRightId = '#panelMenuRight' + window.localStorage.getItem("divIdGlobal");
				$(divRightId).panel("close");
			}
		}
//	}
}

// pause app
function onPause() {
	toast('App paused', 'short');
}

// resume app
function onResume() {
	toast('App resumed', 'short');
}

/* PhoneGap plugin functions */

// Toasts
function toast(text, duration) {
	var toasts = cordova.require("cordova/plugin/toasts");
	if (duration === "short") {
		toasts.showShort(text,
			function () {
				//console.log("PhoneGap Plugin: Toast short: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast short: callback error");
			}
			);
	} else if (duration === "long") {
		toasts.showLong(text,
			function () {
				//console.log("PhoneGap Plugin: Toast long: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast long: callback error");
			}
			);
	} else {
		toasts.cancel(
			function () {
				//console.log("PhoneGap Plugin: Toast cancel: callback success");
			},
			function () {
				console.log("PhoneGap Plugin: Toast cancel: callback error");
			}
		);
	}
}

// Share
function share(subject, text) {
	var shares = cordova.require("cordova/plugin/share");
	shares.show({subject: subject, text: text},
		function () {
			//console.log("PhoneGap Plugin: Share: callback success");
		},
		function () {
			console.log("PhoneGap Plugin: Share: callback error");
		}
		);
}

function setFontSize() {
	console.log('devicePixelRatio= ' + window.devicePixelRatio);
	if(window.devicePixelRatio < 0.75) {
		$('#localizacionLi').hide();
		$("body").attr('style', 'font-size: 0.20em !important;');   
		$("table.dates").attr('style', 'font-size: 0.40em !important;');
		$("table.patro").attr('style', 'font-size: 0.40em !important;');
		$("table.patro td .namemin").attr('style', 'font-size: 0.40em !important;');
		$("a.panelText").attr('style', 'font-size: 0.20em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 0.20em !important;');
		$("table.dates td .name").attr('style', 'font-size: 0.40em !important;');
		$(".datos").attr('style', 'font-size: 0.40em !important;');
		$("img.headerIconTitle").attr('style', 'width:240px !important;');
	}
	else if(window.devicePixelRatio <= 0.75) {
		$('#localizacionLi').hide();
		$("body").attr('style', 'font-size: 0.30em !important;');   
		$("table.dates").attr('style', 'font-size: 0.50em !important;');
		$("table.patro").attr('style', 'font-size: 0.50em !important;');
		$("table.patro td .namemin").attr('style', 'font-size: 0.50em !important;');
		$("a.panelText").attr('style', 'font-size: 0.30em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 0.30em !important;');
		$("table.dates td .name").attr('style', 'font-size: 0.50em !important;');
		$(".datos").attr('style', 'font-size: 0.50em !important;');
		$("img.headerIconTitle").attr('style', 'width:240px !important;');
	}
	else if(window.devicePixelRatio <= 1) {
		$("body").attr('style', 'font-size: 0.75em !important;');
		$("table.dates").attr('style', 'font-size: 0.75em !important;');
		$("table.patro").attr('style', 'font-size: 0.70em !important;');
		$("table.patro td .namemin").attr('style', 'font-size: 0.75em !important;');
		$("a.panelText").attr('style', 'font-size: 0.75em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 0.75em !important;');
		$("table.dates td .name").attr('style', 'font-size: 0.85em !important;');
		$(".datos").attr('style', 'font-size: 0.80em !important;');
	}
	else if(window.devicePixelRatio <= 1.5) {
		$("body").attr('style', 'font-size: 1.25em !important;');
		$("table.dates").attr('style', 'font-size: 1.25em !important;');
		$("a.panelText").attr('style', 'font-size: 1.25em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 1.25em !important;');
		$(".datos").attr('style', 'font-size: 1.15em !important;');
	}
	else if(window.devicePixelRatio <= 2) {
		$("body").attr('style', 'font-size: 1.50em !important;');
		$("table.dates").attr('style', 'font-size: 1.50em !important;');
		$("a.panelText").attr('style', 'font-size: 1.50em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 1.50em !important;');
		$(".datos").attr('style', 'font-size: 1.40em !important;');
	} else if(window.devicePixelRatio > 2) {
		$("body").attr('style', 'font-size: 1.75em !important;');
		$("table.dates").attr('style', 'font-size: 1.75em !important;');
		$("a.panelText").attr('style', 'font-size: 1.75em !important;');
		$("p.panelTextDivider").attr('style', 'font-size: 1.75em !important;');
		$(".datos").attr('style', 'font-size: 1.65em !important;');
	}
};
/* END PhoneGap plugins */

//energize.js: speed up click events on mobile devices (https://github.com/davidcalhoun/energize.js)
(function() {
  // don't add to non-touch devices or desktop Chrome (which now has touch events)
  if(!('ontouchstart' in window && !(/chrome/i).test(navigator.userAgent))) return;

  var lastClick = {};
  
  var isThresholdReached = function(startXY, xy) {
    return Math.abs(startXY[0] - xy[0]) > 5 || Math.abs(startXY[1] - xy[1]) > 5;
  };

  var touchstart = function(e) {
    // setup the initial values
    // TODO: touch and hold
    this.startXY = [e.touches[0].clientX, e.touches[0].clientY];
    this.threshold = false;
  };
  var touchmove = function(e) {
    // check if the user is scrolling past the threshold
    if(this.threshold) return false;  // noop if the threshold has already been reached
    this.threshold = isThresholdReached(this.startXY, [e.touches[0].clientX, e.touches[0].clientY]);
  };
  var touchend = function(e) {
    // don't fire a click if the user scrolled past the threshold
    if(this.threshold || isThresholdReached(this.startXY, [e.changedTouches[0].clientX, e.changedTouches[0].clientY])) {
      return;
    }
    
    // create and fire a click event on the target element
    // https://developer.mozilla.org/en/DOM/event.initMouseEvent
    var touch = e.changedTouches[0],
        evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.simulated = true;   // distinguish this from a nonsimulated click
    e.target.dispatchEvent(evt);
  };
  var click = function(e) {
    /*
        Prevent ghost clicks by only allowing clicks we created
        in the click event we fired (look for e.simulated)
    */
    var time = Date.now(),
        timeDiff = time - lastClick.time,
        x = e.clientX,
        y = e.clientY,
        xyDiff = [Math.abs(lastClick.x - x), Math.abs(lastClick.y - y)],
        target = closest(e.target, 'A') || e.target,
        nodeName = target.nodeName,
        isLink = nodeName === 'A',
        standAlone = window.navigator.standalone && isLink && e.target.getAttribute("href");
    
    lastClick.time = time;
    lastClick.x = x;
    lastClick.y = y;

    //if((!e.simulated) || standAlone) {  // Android doesn't pick up all clicks with this
    /*
       Unfortunately Android sometimes fires click events without touch events (seen on Kindle Fire),
       so we have to add more logic to determine the time of the last click.  Not perfect...
    */
    if((!e.simulated && (timeDiff < 500 || (timeDiff < 1500 && xyDiff[0] < 50 && xyDiff[1] < 50))) || standAlone) {
      //window.$c && $c.log("energize.js: click suppressed; e.simulated: " + e.simulated + "; standAlone:" + standAlone + " timeDiff: " + timeDiff + "; xyDiff: [" + xyDiff[0] + ", " + xyDiff[1] + "]; screenXY: [" + e.screenX + ", " + e.screenY + "]");
      e.preventDefault();
      e.stopPropagation();
      if(!standAlone) return false;
    }

    //window.$c && $c.log && window.$c && $c.log("energize.js: unsupressed click event on " + target + " with class " + target.className + " timeDiff: " + timeDiff + "; xyDiff: [" + xyDiff[0] + ", " + xyDiff[1] + "]; screenXY: [" + e.screenX + ", " + e.screenY + "]");
    
    /* 
       Special logic for standalone web apps
       See http://stackoverflow.com/questions/2898740/iphone-safari-web-app-opens-links-in-new-window
    */
    if(standAlone) {
      window.location = target.getAttribute("href");
    }

    // add an energize-focus class to the targeted link (mimics :focus behavior)
    if(!target || !target.classList) return;
    target.classList.add("energize-focus");
    window.setTimeout(function(){
      target.classList.remove("energize-focus");
    }, 150);
  };

  var closest = function(node, nodeName){
    var curNode = node,
        tagName = nodeName.toUpperCase();

    while(curNode !== document.body) {  // go up the dom until we find the tag we're after
      if(!curNode || curNode.nodeName === tagName) { return curNode; } // found
      curNode = curNode.parentNode;     // not found, so keep going up
    }
    
    return null;  // not found
  };

  /*
      All the events we care about bubble up to document,
      so we can handle them there instead of 
  */
  document.addEventListener('touchstart', touchstart, false);
  document.addEventListener('touchmove', touchmove, false);
  document.addEventListener('touchend', touchend, false);
  document.addEventListener('click', click, true);
  
})();

