

        function include(script_filename) {
            document.write('<' + 'script');
            document.write(' language="javascript"');
            document.write(' type="text/javascript"');
            document.write(' src="' + script_filename + '">');
            document.write('</' + 'script' + '>');
        }
    

	 if (window.screen.width>320) {  
			document.write("<link href='css/bresciatourism_ipad_DE.css' rel='stylesheet' type='text/css' />")
		} else {  
			document.write("<link href='css/bresciatourism_DE.css' rel='stylesheet' type='text/css' />")
		}
	






	 if (window.screen.width>320) {  
	 	include('app/app_ipad.js');
		} else {
	 	include('app/app.js');
		}
	





























        function include(script_filename) {
            document.write('<' + 'script');
            document.write(' language="javascript"');
            document.write(' type="text/javascript"');
            document.write(' src="' + script_filename + '">');
            document.write('</' + 'script' + '>');
        }
    

	 if (window.screen.width>320) {  
			document.write("<link href='css/bresciatourism_ipad_EN.css' rel='stylesheet' type='text/css' />")
		} else {  
			document.write("<link href='css/bresciatourism_EN.css' rel='stylesheet' type='text/css' />")
		}
	






	 if (window.screen.width>320) {  
	 	include('app/app_ipad.js');
		} else {
	 	include('app/app.js');
		}
	





























        function include(script_filename) {
            document.write('<' + 'script');
            document.write(' language="javascript"');
            document.write(' type="text/javascript"');
            document.write(' src="' + script_filename + '">');
            document.write('</' + 'script' + '>');
        }
    

	 if (window.screen.width>320) {  
			document.write("<link href='css/bresciatourism_ipad_IT.css' rel='stylesheet' type='text/css' />")
		} else {  
			document.write("<link href='css/bresciatourism_IT.css' rel='stylesheet' type='text/css' />")
		}
	






	 if (window.screen.width>320) {  
	 	include('app/app_ipad.js');
		} else {
	 	include('app/app.js');
		}
	





























// *******************************************************************************************************************
// VARIABILI GLOBALI
// *******************************************************************************************************************

var activeItem;
var selectedStruttura;
var selectedRistorante;
var selectedTerritorio;
var selectedTipoPOI;
var selectedPOI;
var selectedEvento;
var selectedUNESCO;

var idArea;
var idComune;
var idCategoria;
var nomeCategoria;
var idTipologia;
var nomeTipologia;
var titoloTerritorio;
var idAlbum;

var lastIndex;

var mapMarker;
var geo;

var nCaratteri=25;


// *******************************************************************************************************************
// FUNZIONI GLOBALI
// *******************************************************************************************************************

function removeHTMLTags(testo) {
    if (testo) {
        var strInputCode = testo;
        strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
        var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        return (strTagStrippedText);
    }
}


// *******************************************************************************************************************
// GESTORE ROUTES
// *******************************************************************************************************************

Ext.Router.draw(function (map) {
    //These are default fallback routes and can be removed if not needed
    map.connect(':controller/:action');
    map.connect(':controller/:action/:id');
});


// *******************************************************************************************************************
// VERIFICA RISOLUZIONE
// *******************************************************************************************************************

//alert(window.devicePixelRatio);
//alert(window.screen.width);



// *******************************************************************************************************************
//verifica se il browser è webKit
// *******************************************************************************************************************

var toString = Object.prototype.toString,
		ua = navigator.userAgent.toLowerCase(),
		check = function (r) {
		    return r.test(ua);
		},
		DOC = document,
		docMode = DOC.documentMode,
		isStrict = DOC.compatMode == "CSS1Compat",
		isOpera = check(/opera/),
		isChrome = check(/\bchrome\b/),
		isWebKit = check(/webkit/),
		isSafari = !isChrome && check(/safari/),
		isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/),
		isSafari4 = isSafari && check(/version\/4/),
		isIE = !isOpera && check(/msie/),
		isIE7 = isIE && (check(/msie 7/) || docMode == 7),
		isIE8 = isIE && (check(/msie 8/) && docMode != 7),
		isIE6 = isIE && !isIE7 && !isIE8,
		isBlackberry = check(/blackberry/),
		isGecko = !isWebKit && check(/gecko/),
		isGecko2 = isGecko && check(/rv:1\.8/),
		isGecko3 = isGecko && check(/rv:1\.9/),
		isBorderBox = isIE && !isStrict,
		isWindows = check(/windows|win32/),
		isMac = check(/macintosh|mac os x/),
		isAir = check(/adobeair/),
		isLinux = check(/linux/),
		isSecure = /^https/i.test(window.location.protocol);




// *******************************************************************************************************************
// LANCIA APPLICAZIONE 
// *******************************************************************************************************************

Ext.regApplication({
    name: "BT",
    defaultUrl: 'Bresciatourism/index',
    launch: function () {

    
    this.viewport = new (Ext.extend(Ext.Panel, {
    
    id: 'viewport',
    fullscreen: true,
    monitorOrientation: false,
    layout: 'card',
    listeners: {
        orientationchange: function () {
            window.scrollTo(0, 0);
            this.doLayout();
        }
    },
    dockedItems: [{
        cls: "header",
        xtype: 'toolbar',
        dock: 'top',
        html: 
        '<p align="center">' +
        '<map name="FPMap1">' +
        '<area href="index.htm" shape="rect" coords="20, 41, 46, 64">' +
        '<area href="index_EN.html" shape="rect" coords="47, 41, 76, 63">' +
        '<area href="index_DE.html" shape="rect" coords="81, 41, 106, 62">' +
        '</map>' +
        '<img border="0" src="bandiere.png" align="right" usemap="#FPMap1">' +
        '<a href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'index\'});"><img border="0" src="logo.png" align="left" ></a></p>'
        //style="padding-left:124px"
    },
	{
	    xtype: 'toolbar',
	    dock: 'top',
	    align: 'center',
	    cls: 'menu',
	    layout: {
	        pack: 'justify'
	    },
	    items: [
		{
		    itemId: 'btnRistoranti',
		    xtype: "button",
		    text: "ristoranti",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'cercaRistoranti',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton1 x-button-pressed';
		    },
		    cls: "menuButton1"
		},
		{
		    itemId: 'btnAccommodation',
		    xtype: "button",
		    text: "accommodation",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'cercaStrutture',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton2 x-button-pressed';
		    },
		    cls: "menuButton2"
		},
		{
		    itemId: 'btnTerritorio',
		    xtype: "button",
		    text: "territorio",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'territorio',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton3 x-button-pressed';
		    },
		    cls: "menuButton3"
		},
		{
		    itemId: 'btnEventi',
		    xtype: "button",
		    text: "eventi",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'eventi',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton4 x-button-pressed';
		    },
		    cls: "menuButton4"
		}]
	},
	{
	    cls: "indirizzo",
	    xtype: 'toolbar',
	    dock: 'bottom',
	    align: 'center',
	    title: 'copyright &copy; 2011 Bresciatourism scarl | p.iva 02403340983'
	},
	{
	    cls: "links",
	    xtype: 'toolbar',
	    dock: 'bottom',
	    align: 'center',
	    layout: {
	        pack: 'justify'
	    },
	    items: [
		{
		    itemId: 'btnInfopoint',
		    xtype: "button",
		    text: "infopoint",
		    linkId: 'infopoint',
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'infopoint',
		            slide: 'left'
		        });
		    },
		    cls: "menuBottom1"
		},
		{
		    xtype: "button",
		    text: "youtube",
		    linkId: 'youtube',
		    cls: "menuBottom2",
		    url: 'http://www.youtube.com/user/Bresciatourism',
		    plugins: [new simfla.ux.plugins.linkButton()]

		},
		{
		    xtype: "button",
		    text: "facebook",
		    linkId: 'facebook',
		    cls: "menuBottom3",
		    url: 'http://www.facebook.com/bresciatourism',
		    plugins: [new simfla.ux.plugins.linkButton()]

		},
        {
            itemId: 'btnUnesco',
            xtype: "button",
            text: "unesco",
            linkId: 'unesco',
            cls: "menuBottom4",
            handler: function () {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'UNESCO',
                    slide: 'left'
                });
            }
        },
        {
            itemId: 'btnGallery',
            xtype: "button",
            text: "gallery",
            linkId: 'gallery',
            cls: "menuBottom5",
            handler: function () {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'album',
                    slide: 'left'
                });
            }
        }
		]
	}]
        }))();

       
        geo = new Ext.util.GeoLocation({
            autoUpdate: false,
            listeners: {
                locationupdate: function (geo) {
                    currentPosition=geo;
                    //alert('New latitude: ' + geo.latitude);
                }
            }
        });
                
       
    }
});


// *******************************************************************************************************************
// SETUP APP
// *******************************************************************************************************************

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    fullscreen: true
});





// *******************************************************************************************************************
// controller
// *******************************************************************************************************************

function resetNavigatore() {
    //resetta tasti menu
    BT.viewport.query('#btnRistoranti')[0].el.dom.attributes[1].value = 'x-button menuButton1 x-button-normal';
    BT.viewport.query('#btnAccommodation')[0].el.dom.attributes[1].value = 'x-button menuButton2 x-button-normal';
    BT.viewport.query('#btnTerritorio')[0].el.dom.attributes[1].value = 'x-button menuButton3 x-button-normal';
    BT.viewport.query('#btnEventi')[0].el.dom.attributes[1].value = 'x-button menuButton4 x-button-normal';
};


Ext.regController("Bresciatourism", {

    // index controller  *******************************************************************************************************************
    index: function () {
        resetNavigatore();

        if (!this.homePanel || this.homePanel.isDestroyed) {
            this.homePanel = this.render({
                xtype: 'bt-homepage',
                listeners: {
                    eventi: {
                        select: function (eventi, record) {
                            selectedEvento = record;
                            this.dettaglioEvento('bt-dettaglioeventohome', 'left');
                        },
                        scope: this
                    },
                    activate: function (homePanel) {
                        homePanel.eventi.getSelectionModel().deselectAll();
                    },
                    deactivate: function (homePanel) {
                        homePanel.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.homePanel, {
            type: 'slide',
            direction: 'right'
        });
        
        geo.updateLocation();
    },

    //cercaRistoranti *******************************************************************************************************************
    cercaRistoranti: function (options) {
        resetNavigatore();

        if (!this.ricercaRistorante || this.ricercaRistorante.isDestroyed) {
            this.ricercaRistorante = this.render({
                xtype: 'bt-ricercaristorante',
                listeners: {
                    deactivate: function (ricercaRistorante) {
                        ricercaRistorante.destroy();
                    }
                }
            });

        }

        this.ricercaRistorante.storeAree.on('load', function () {
            var areeSelectField = this.ricercaRistorante.items.get(1);
            var firstArea = this.ricercaRistorante.storeAree.getAt(0);
            if (firstArea) {
                areeSelectField.setValue(firstArea.data.ID);
            } else {
                areeSelectField.setValue('');
            }
        }, this);

        this.ricercaRistorante.storeComuni.on('load', function () {
            var comuneSelectField = this.ricercaRistorante.items.get(2);
            var firstComune = this.ricercaRistorante.storeComuni.getAt(0);
            if (firstComune) {
                comuneSelectField.setValue(firstComune.data.ID);
            } else {
                comuneSelectField.setValue('');
            }
            this.ricercaRistorante.storeCategorieRistorante.proxy.url = baseUrl + 'categorieRistorante.ashx?area=' + this.ricercaRistorante.storeComuni.filters.items[0].value + '&comune=' + firstComune.data.ID;
            this.ricercaRistorante.storeCategorieRistorante.load();
        }, this);

        this.ricercaRistorante.storeCategorieRistorante.on('load', function () {
            var categoriaSelectField = this.ricercaRistorante.items.get(3);
            var firstCategoria = this.ricercaRistorante.storeCategorieRistorante.getAt(0);
            if (firstCategoria) {
                categoriaSelectField.setValue(firstCategoria.data.ID);
            } else {
                categoriaSelectField.setValue('');
            }
        }, this);

        this.ricercaRistorante.query('#Ricerca')[0].on('tap', function () {
            if (this.ricercaRistorante.storeCategorieRistorante.getAt(0)) {
                idArea = this.ricercaRistorante.items.get(1).value,
                    idComune = this.ricercaRistorante.items.get(2).value,
                    idCategoria = this.ricercaRistorante.items.get(3).value,
                    nomeCategoria = this.ricercaRistorante.items.get(3).fieldEl.dom.value,
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoRistoranti',
                        slide: 'left'
                    });
            };
        }, this);

        this.ricercaRistorante.storeAree.load();

        this.ricercaRistorante.onAreaChange(this.ricercaRistorante.items.get(1), 1);

        BT.viewport.setActiveItem(this.ricercaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoRistorantiAroundMe: function (options) {
        if (!this.ristorantiAroundMe || this.ristorantiAroundMe.isDestroyed) {
            this.ristorantiAroundMe = this.render({
                xtype: 'bt-mapparistorantiaroundme',
                listeners: {
                    deactivate: function (ristorantiAroundMe) {
                        ristorantiAroundMe.destroy();
                    }
                }
            });
        }

        refreshMapRisto = function (ristorantiAroundMe) {
            Ext.util.JSONP.request({
                url: baseUrl + 'ristoranti.ashx',
                params: { lat: currentPosition.latitude, lon: currentPosition.longitude },
                callbackKey: 'callback',
                callback: function (result) {
                    var stAround = result.results;
                    // Add points to the map
                    if (currentPosition.latitude != '') {
                        var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
                        var marker = new google.maps.Marker({
                            map: ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].map,
                            position: latLng,
                            icon: 'posizione2.png'
                        });
                    }
                    for (var i = 0, ln = stAround.length; i < ln; i++) {
                        var st = stAround[i];
                        addMarkerRisto(ristorantiAroundMe, st);
                    }
                }
            });
        };

        addMarkerRisto = function (ristorantiAroundMe, st) {
            var latLng = new google.maps.LatLng(st.Lat, st.Lon);
            var marker = new google.maps.Marker({
                map: ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].map,
                position: latLng,
                title: st.ID + ''
            })
            google.maps.event.addListener(marker, "mousedown", function () {
                var obj = ristorantiAroundMe.storeRistoranti.getById(parseInt(marker.title));
                selectedRistorante = obj;
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'dettaglioRistorante',
                    slide: 'left',
                    tipo: 'mappa'
                });
            });
        };

        this.ristorantiAroundMe.storeRistoranti.load();

        geo.updateLocation();
        refreshMapRisto(this.ristorantiAroundMe);


        this.ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].update(currentPosition);
        this.ristorantiAroundMe.query('#mappaRistorantiToolbar')[0].setTitle(Testi[11]);

        BT.viewport.setActiveItem(this.ristorantiAroundMe, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoRistoranti: function (options) {
        if (!this.Ristoranti || this.Ristoranti.isDestroyed) {
            this.Ristoranti = this.render({
                xtype: 'bt-ristoranti',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedRistorante = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioRistorante',
                                slide: 'left',
                                tipo: 'elenco'
                            });
                        },
                        scope: this
                    },
                    deactivate: function (Ristoranti) {
                        Ristoranti.destroy();
                    }
                }
            });
        }

        this.Ristoranti.storeRistoranti.clearFilter();
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Comune', value: idComune, exactMatch: true });
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Categoria', value: idCategoria, exactMatch: true });
        this.Ristoranti.storeRistoranti.load();

        this.Ristoranti.query('#ristorantiToolbar')[0].setTitle(Ext.util.Format.ellipsis(nomeCategoria, nCaratteri));

        BT.viewport.setActiveItem(this.Ristoranti, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioRistorante: function (options) {
        if (!this.schedaRistorante || this.schedaRistorante.isDestroyed) {
            this.schedaRistorante = this.render({
                xtype: 'bt-dettaglioristorante',
                listeners: {
                    deactivate: function (schedaRistorante) {
                        schedaRistorante.destroy();
                    }
                }
            });
        }

        this.schedaRistorante.update(selectedRistorante.data);
        this.schedaRistorante.query('#ristoranteToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedRistorante.data.Nome, nCaratteri));

        this.schedaRistorante.query('#backButton')[0].on('tap', function () {
            if (options.tipo == 'elenco') {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoRistoranti',
                    slide: 'right'
                });
            } else {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoRistorantiAroundMe',
                    slide: 'right'
                });
            }
        });


        BT.viewport.setActiveItem(this.schedaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaRistorante: function (options) {
        geo.updateLocation();

        if (!this.schedaMappaRistorante || this.schedaMappaRistorante.isDestroyed) {
            this.schedaMappaRistorante = this.render({
                xtype: 'bt-mapparistorante',
                listeners: {
                    deactivate: function (schedaMappaRistorante) {
                        schedaMappaRistorante.destroy();
                    }
                }
            });
        }


        var latLng;

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            marker = new google.maps.Marker({
                map: this.schedaMappaRistorante.query('#mappaRistorante')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker Ristorante
        if (selectedRistorante) {
            latLng = new google.maps.LatLng(selectedRistorante.data.Lat, selectedRistorante.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaRistorante.query('#mappaRistorante')[0].map,
                title: selectedRistorante.data.Nome,
                position: latLng
            });
            this.schedaMappaRistorante.query('#mappaRistorante')[0].map.setCenter(latLng)
        }

        this.schedaMappaRistorante.query('#mappaRistoranteToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedRistorante.data.Nome), nCaratteri));

        BT.viewport.setActiveItem(this.schedaMappaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },



    //cercaStrutture *******************************************************************************************************************
    cercaStrutture: function (options) {
        resetNavigatore();

        if (!this.ricercaStrutture || this.ricercaStrutture.isDestroyed) {
            this.ricercaStrutture = this.render({
                xtype: 'bt-ricercastruttura',
                listeners: {
                    deactivate: function (ricercaStrutture) {
                        ricercaStrutture.destroy();
                    }
                }
            });
        }

        this.ricercaStrutture.storeAree.on('load', function () {
            var areeSelectField = this.ricercaStrutture.items.get(1);
            var firstArea = this.ricercaStrutture.storeAree.getAt(0);
            if (firstArea) {
                areeSelectField.setValue(firstArea.data.ID);
            } else {
                areeSelectField.setValue('');
            }
        }, this);

        this.ricercaStrutture.storeComuni.on('load', function () {
            var comuneSelectField = this.ricercaStrutture.items.get(2);
            var firstComune = this.ricercaStrutture.storeComuni.getAt(0);
            if (firstComune) {
                comuneSelectField.setValue(firstComune.data.ID);
            } else {
                comuneSelectField.setValue('');
            }
            this.ricercaStrutture.storeTipologieStruttura.proxy.url = baseUrl + 'tipologieStruttura.ashx?area=' + this.ricercaStrutture.storeComuni.filters.items[0].value + '&comune=' + firstComune.data.ID;
            this.ricercaStrutture.storeTipologieStruttura.load();
        }, this);

        this.ricercaStrutture.storeTipologieStruttura.on('load', function () {
            var tipologiaSelectField = this.ricercaStrutture.items.get(3);
            var firstTipologia = this.ricercaStrutture.storeTipologieStruttura.getAt(0);
            if (firstTipologia) {
                tipologiaSelectField.setValue(firstTipologia.data.ID);
            } else {
                tipologiaSelectField.setValue('');
            }
        }, this);

        this.ricercaStrutture.query('#Ricerca')[0].on('tap', function () {
            if (this.ricercaStrutture.storeTipologieStruttura.getAt(0)) {
                idArea = this.ricercaStrutture.items.get(1).value,
                    idComune = this.ricercaStrutture.items.get(2).value,
                    idTipologia = this.ricercaStrutture.items.get(3).value,
                    nomeTipologia = this.ricercaStrutture.items.get(3).fieldEl.dom.value,
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoStrutture',
                        slide: 'left'
                    });
            };
        }, this);

        this.ricercaStrutture.storeAree.load();

        this.ricercaStrutture.onAreaChange(this.ricercaStrutture.items.get(1), 1);

        BT.viewport.setActiveItem(this.ricercaStrutture, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoStruttureAroundMe: function (options) {
        if (!this.struttureAroundMe || this.struttureAroundMe.isDestroyed) {
            this.struttureAroundMe = this.render({
                xtype: 'bt-mappastrutturearoundme',
                listeners: {
                    deactivate: function (struttureAroundMe) {
                        struttureAroundMe.destroy();
                    }
                }
            });
        }

        refreshMapStrutture = function (struttureAroundMe) {
            Ext.util.JSONP.request({
                url: baseUrl + 'strutture.ashx',
                params: { lingua: Lingua, lat: currentPosition.latitude, lon: currentPosition.longitude },
                callbackKey: 'callback',
                callback: function (result) {
                    var stAround = result.results;
                    // Add points to the map
                    if (currentPosition.latitude != '') {
                        var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
                        var marker = new google.maps.Marker({
                            map: struttureAroundMe.query('#mappaStruttureAroundMe')[0].map,
                            position: latLng,
                            icon: 'posizione2.png'
                        });
                    }
                    for (var i = 0, ln = stAround.length; i < ln; i++) {
                        var st = stAround[i];
                        addMarkerStruttura(struttureAroundMe, st);
                    }
                }
            });
        };

        addMarkerStruttura = function (struttureAroundMe, st) {
            var latLng = new google.maps.LatLng(st.Lat, st.Lon);
            var marker = new google.maps.Marker({
                map: struttureAroundMe.query('#mappaStruttureAroundMe')[0].map,
                position: latLng,
                title: st.ID + ''
            })
            google.maps.event.addListener(marker, "mousedown", function () {
                var obj = struttureAroundMe.storeStrutture.getById(parseInt(marker.title));
                selectedStruttura = obj;
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'dettaglioStruttura',
                    slide: 'left',
                    tipo: 'mappa'
                });
            });
        };

        this.struttureAroundMe.storeStrutture.load();


        geo.updateLocation();
        refreshMapStrutture(this.struttureAroundMe);


        this.struttureAroundMe.query('#mappaStruttureAroundMe')[0].update(currentPosition);
        this.struttureAroundMe.query('#mappaStruttureToolbar')[0].setTitle(Testi[11]);

        BT.viewport.setActiveItem(this.struttureAroundMe, {
            type: 'slide',
            direction: options.slide
        });

    },

    elencoStrutture: function (options) {
        if (!this.Strutture || this.Strutture.isDestroyed) {
            this.Strutture = this.render({
                xtype: 'bt-strutture',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedStruttura = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioStruttura',
                                slide: 'left',
                                tipo: 'elenco'
                            });
                        },
                        scope: this
                    },
                    deactivate: function (Strutture) {
                        Strutture.destroy();
                    }
                }
            });
        }

        this.Strutture.storeStrutture.clearFilter();
        this.Strutture.storeStrutture.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.Strutture.storeStrutture.filter({ property: 'id_Comune', value: idComune, exactMatch: true });
        this.Strutture.storeStrutture.filter({ property: 'id_Tipologia', value: idTipologia, exactMatch: true });
        this.Strutture.storeStrutture.load();

        this.Strutture.query('#struttureToolbar')[0].setTitle(Ext.util.Format.ellipsis(nomeTipologia, nCaratteri));

        BT.viewport.setActiveItem(this.Strutture, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioStruttura: function (options) {
        if (!this.schedaStruttura || this.schedaStruttura.isDestroyed) {
            this.schedaStruttura = this.render({
                xtype: 'bt-dettagliostruttura',
                listeners: {
                    deactivate: function (schedaStruttura) {
                        schedaStruttura.destroy();
                    }
                }
            });
        }

        this.schedaStruttura.update(selectedStruttura.data);
        this.schedaStruttura.query('#strutturaToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedStruttura.data.Nome, nCaratteri));

        this.schedaStruttura.query('#backButton')[0].on('tap', function () {
            if (options.tipo == 'elenco') {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoStrutture',
                    slide: 'right'
                });
            } else {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoStruttureAroundMe',
                    slide: 'right'
                });
            }
        });

        BT.viewport.setActiveItem(this.schedaStruttura, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaStruttura: function (options) {
        geo.updateLocation();
        if (!this.schedaMappaStruttura || this.schedaMappaStruttura.isDestroyed) {
            this.schedaMappaStruttura = this.render({
                xtype: 'bt-mappastruttura',
                listeners: {
                    deactivate: function (schedaMappaStruttura) {
                        schedaMappaStruttura.destroy();
                    }
                }
            });
        }

        var latLng;

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            marker = new google.maps.Marker({
                map: this.schedaMappaStruttura.query('#mappaStruttura')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker Ristorante
        if (selectedStruttura) {
            latLng = new google.maps.LatLng(selectedStruttura.data.Lat, selectedStruttura.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaStruttura.query('#mappaStruttura')[0].map,
                title: selectedStruttura.data.Nome,
                position: latLng
            });
            this.schedaMappaStruttura.query('#mappaStruttura')[0].map.setCenter(latLng)
        }

        this.schedaMappaStruttura.query('#mappaStrutturaToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedStruttura.data.Nome), nCaratteri));

        BT.viewport.setActiveItem(this.schedaMappaStruttura, {
            type: 'slide',
            direction: options.slide
        });
    },


    //territorio *******************************************************************************************************************
    territorio: function (options) {
        resetNavigatore();

        if (!this.schedaTerritorio || this.schedaTerritorio.isDestroyed) {
            this.schedaTerritorio = this.render({
                xtype: 'bt-territorio',
                listeners: {
                    deactivate: function (schedaTerritorio) {
                        schedaTerritorio.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.schedaTerritorio, {
            type: 'slide',
            direction: options.slide
        });
    },

    tipologiePOI: function (options) {
        idArea = options.idArea;
        titoloTerritorio = options.titolo;

        if (!this.tipoPOI || this.tipoPOI.isDestroyed) {
            this.tipoPOI = this.render({
                xtype: 'bt-tipoPOI',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedTipoPOI = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'elencoPOI',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (tipoPOI) {
                        tipoPOI.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (tipoPOI) {
                        tipoPOI.destroy();
                    }
                }
            });
        }

        this.tipoPOI.query('#tipoPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(titoloTerritorio), nCaratteri));

        BT.viewport.setActiveItem(this.tipoPOI, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoPOI: function (options) {
        if (!this.schedaElencoPOI || this.schedaElencoPOI.isDestroyed) {
            this.schedaElencoPOI = this.render({
                xtype: 'bt-elencoPOI',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedPOI = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioPOI',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (schedaElencoPOI) {
                        schedaElencoPOI.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (schedaElencoPOI) {
                        schedaElencoPOI.destroy();
                    }
                }
            });
        }

        this.schedaElencoPOI.query('#elencoPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedTipoPOI.data.Categoria), nCaratteri));

        this.schedaElencoPOI.storePOI.clearFilter();
        this.schedaElencoPOI.storePOI.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.schedaElencoPOI.storePOI.filter({ property: 'id_Categoria', value: selectedTipoPOI.data.ID, exactMatch: true });
        this.schedaElencoPOI.storePOI.load();

        BT.viewport.setActiveItem(this.schedaElencoPOI, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioPOI: function (options) {
        if (!this.schedaDettaglioPOI || this.schedaDettaglioPOI.isDestroyed) {
            this.schedaDettaglioPOI = this.render({
                xtype: 'bt-dettaglioPOI',
                listeners: {
                    deactivate: function (schedaDettaglioPOI) {
                        schedaDettaglioPOI.destroy();
                    }
                }
            });
        }

        this.schedaDettaglioPOI.update(selectedPOI.data);
        this.schedaDettaglioPOI.query('#dettaglioPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedPOI.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaDettaglioPOI, {
            type: 'slide',
            direction: options.slide
        });
    },


    //eventi *******************************************************************************************************************
    eventi: function (options) {
        resetNavigatore();

        if (!this.Eventi || this.Eventi.isDestroyed) {
            this.Eventi = this.render({
                xtype: 'bt-eventi',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedEvento = record;
                            this.dettaglioEvento('bt-dettaglioevento', 'left');
                        },
                        scope: this
                    },
                    activate: function (Eventi) {
                        Eventi.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (Eventi) {
                        Eventi.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.Eventi, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioEvento: function (view, slide) {
        if (!this.schedaEvento || this.schedaEvento.isDestroyed) {
            this.schedaEvento = this.render({
                xtype: view,
                listeners: {
                    deactivate: function (schedaEvento) {
                        schedaEvento.destroy();
                    }
                }
            });
        }

        this.schedaEvento.update(selectedEvento.data);
        this.schedaEvento.query('#eventoToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedEvento.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaEvento, {
            type: 'slide',
            direction: slide
        });
    },


    //infopoint *******************************************************************************************************************
    infopoint: function (options) {
        resetNavigatore();
        if (!this.schedaInfopoint || this.schedaInfopoint.isDestroyed) {
            this.schedaInfopoint = this.render({
                xtype: 'bt-infopoint',
                listeners: {
                    deactivate: function (schedaInfopoint) {
                        schedaInfopoint.destroy();
                    },
                    scope: this
                }
            });
        }

        BT.viewport.setActiveItem(this.schedaInfopoint, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaInfopoint: function (options) {
        geo.updateLocation();
        if (!this.schedaMappaInfopoint || this.schedaMappaInfopoint.isDestroyed) {
            this.schedaMappaInfopoint = this.render({
                xtype: 'bt-mappainfopoint',
                listeners: {
                    deactivate: function (schedaMappaInfopoint) {
                        schedaMappaInfopoint.destroy();
                    }
                }
            });
        }

        var marker = new google.maps.Marker({
            map: this.schedaMappaInfopoint.query('#mappaInfopoint')[0].map,
            position: posizione_infopoint
        });

        BT.viewport.setActiveItem(this.schedaMappaInfopoint, {
            type: 'slide',
            direction: options.slide
        });
    },

    //UNESCO *******************************************************************************************************************
    UNESCO: function (options) {
        resetNavigatore();

        if (!this.schedaUNESCO || this.schedaUNESCO.isDestroyed) {
            this.schedaUNESCO = this.render({
                xtype: 'bt-unesco',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedUNESCO = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioUNESCO',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (schedaUNESCO) {
                        schedaUNESCO.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (schedaUNESCO) {
                        schedaUNESCO.destroy();
                    }
                }
            });
        }

        BT.viewport.setActiveItem(this.schedaUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioUNESCO: function (options) {

        if (!this.schedaDettaglioUNESCO || this.schedaDettaglioUNESCO.isDestroyed) {
            this.schedaDettaglioUNESCO = this.render({
                xtype: 'bt-dettagliounesco',
                listeners: {
                    deactivate: function (schedaDettaglioUNESCO) {
                        schedaDettaglioUNESCO.destroy();
                    }
                }
            });
        }

        this.schedaDettaglioUNESCO.update(selectedUNESCO.data);
        this.schedaDettaglioUNESCO.query('#UNESCOToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedUNESCO.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaDettaglioUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaUNESCO: function (options) {
        geo.updateLocation();

        if (!this.schedaMappaUNESCO || this.schedaMappaUNESCO.isDestroyed) {
            this.schedaMappaUNESCO = this.render({
                xtype: 'bt-mappaunesco',
                listeners: {
                    deactivate: function (schedaMappaUNESCO) {
                        schedaMappaUNESCO.destroy();
                    }
                }
            });
        }

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            var marker = new google.maps.Marker({
                map: this.schedaMappaUNESCO.query('#mappaUNESCO')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker POI
        if (selectedUNESCO && selectedUNESCO.data.Lat && selectedUNESCO.data.Lon) {
            var latLng = new google.maps.LatLng(selectedUNESCO.data.Lat, selectedUNESCO.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaUNESCO.query('#mappaUNESCO')[0].map,
                position: latLng
            });
            this.schedaMappaUNESCO.update(latLng);
        }

        BT.viewport.setActiveItem(this.schedaMappaUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    //GALLERY *******************************************************************************************************************
    album: function (options) {
        resetNavigatore();

        if (!this.elencoAlbum || this.elencoAlbum.isDestroyed) {
            this.elencoAlbum = this.render({
                xtype: 'bt-album',
                listeners: {
                    list: {
                        select: function (list, record) {
                            idAlbum = record.data.ID;
                            this.showGallery(list, record, 'left');
                        },
                        scope: this
                    },
                    activate: function (elencoAlbum) {
                        elencoAlbum.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (elencoAlbum) {
                        //elencoAlbum.destroy();
                    }
                }
            });
        }

        BT.viewport.setActiveItem(this.elencoAlbum, {
            type: 'slide',
            direction: options.slide
        });
    },

    showGallery: function (list, record, slide) {

        if (!this.elencoGallery || this.elencoGallery.isDestroyed) {
            this.elencoGallery = this.render({
                xtype: 'bt-gallery',
                listeners: {
                    deactivate: function (elencoGallery) {
                        elencoGallery.destroy();
                    },
                    dataView: {
                        itemtap: function (list, index) {
                            var imgdata = this.elencoGallery.dataView.store.data.items;
                            this.showCarousel(list, index, imgdata, record);
                        },
                        scope: this
                    }
                }
            });
        }

        this.elencoGallery.query('#galleryToolbar')[0].setTitle(Ext.util.Format.ellipsis(record.data.Nome, nCaratteri));

        BT.viewport.setActiveItem(this.elencoGallery, {
            type: 'slide',
            direction: slide
        });
    },

    showCarousel: function (list, index, imgdata, album) {
        if (!this.albumCarousel || this.albumCarousel.isDestroyed) {
            this.albumCarousel = this.render({
                xtype: 'bt-dettagliogallery',
                listeners: {
                    deactivate: function (albumCarousel) {
                        albumCarousel.destroy();
                    }
                }
            });

            for (i = 0; i < imgdata.length; i++) {
            	this.albumCarousel.carousel.add({
            		html: '<div class="img_gallery" style="background: url(' + baseUrl + 'assets/Gallery/' + imgdata[i].data.Immagine_iPhone + ') top center no-repeat;"></div>'
				});
            }

            this.albumCarousel.query('#backButton')[0].on({
                tap: function () {
                    this.showGallery(list, album, 'right');
                },
                scope: this
            })

            this.albumCarousel.query('#carouselToolbar')[0].setTitle(Ext.util.Format.ellipsis(album.data.Nome, nCaratteri));

            BT.viewport.setActiveItem(this.albumCarousel, 'slide');
            this.albumCarousel.carousel.setActiveItem(index);
        }
    }

});




// VARIABILI GLOBALI

//var baseUrl='http://www.temporaneo.net/bresciatourism/';
var baseUrl='http://m.bresciatourism.it/';
var oggi=new Date();
var meseCorrente=oggi.getMonth()+1;

var posizione_iniziale = new google.maps.LatLng(45.539838,10.222956);	//brescia
var posizione_infopoint = new google.maps.LatLng(45.540059,10.219214);

var Brescia={
    latitude:'45.539838',
    longitude:'10.222956'
};

var currentPosition={
    latitude:'45.539838',
    longitude:'10.222956'
};




// *******************************************************************************************************************
// VARIABILI GLOBALI
// *******************************************************************************************************************

var activeItem;
var selectedStruttura;
var selectedRistorante;
var selectedTerritorio;
var selectedTipoPOI;
var selectedPOI;
var selectedEvento;
var selectedUNESCO;

var idArea;
var idComune;
var idCategoria;
var nomeCategoria;
var idTipologia;
var nomeTipologia;
var titoloTerritorio;
var idAlbum;

var lastIndex;

var mapMarker;
var geo;

var nCaratteri = 18;



// *******************************************************************************************************************
// FUNZIONI GLOBALI
// *******************************************************************************************************************

function removeHTMLTags(testo) {
    if (testo) {
        var strInputCode = testo;
        strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
            return (p1 == "lt") ? "<" : ">";
        });
        var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
        return (strTagStrippedText);
    }
}


// *******************************************************************************************************************
// GESTORE ROUTES
// *******************************************************************************************************************
Ext.Router.draw(function (map) {
    //These are default fallback routes and can be removed if not needed
    map.connect(':controller/:action');
    map.connect(':controller/:action/:id');
});

// *******************************************************************************************************************
// VERIFICA RISOLUZIONE
// *******************************************************************************************************************

//alert(window.devicePixelRatio);
//alert(window.screen.width);

if (window.devicePixelRatio == 1.5) {  
	//alert("This is a high-density screen");
} 
else if (window.devicePixelRatio == 0.75) {  
	//alert("This is a low-density screen");
}


// *******************************************************************************************************************
//verifica se il browser è webKit
// *******************************************************************************************************************

var toString = Object.prototype.toString,
		ua = navigator.userAgent.toLowerCase(),
		check = function (r) {
		    return r.test(ua);
		},
		DOC = document,
		docMode = DOC.documentMode,
		isStrict = DOC.compatMode == "CSS1Compat",
		isOpera = check(/opera/),
		isChrome = check(/\bchrome\b/),
		isWebKit = check(/webkit/),
		isSafari = !isChrome && check(/safari/),
		isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/),
		isSafari4 = isSafari && check(/version\/4/),
		isIE = !isOpera && check(/msie/),
		isIE7 = isIE && (check(/msie 7/) || docMode == 7),
		isIE8 = isIE && (check(/msie 8/) && docMode != 7),
		isIE6 = isIE && !isIE7 && !isIE8,
		isBlackberry = check(/blackberry/),
		isGecko = !isWebKit && check(/gecko/),
		isGecko2 = isGecko && check(/rv:1\.8/),
		isGecko3 = isGecko && check(/rv:1\.9/),
		isBorderBox = isIE && !isStrict,
		isWindows = check(/windows|win32/),
		isMac = check(/macintosh|mac os x/),
		isAir = check(/adobeair/),
		isLinux = check(/linux/),
		isSecure = /^https/i.test(window.location.protocol);






// *******************************************************************************************************************
// LANCIA APPLICAZIONE 
// *******************************************************************************************************************

Ext.regApplication({
    name: "BT",
    defaultUrl: 'Bresciatourism/index',
   
   
    launch: function () {

        this.viewport = new (Ext.extend(Ext.Panel, {

            id: 'viewport',
            fullscreen: true,
            monitorOrientation: false,
            layout: 'card',
            listeners: {
                orientationchange: function () {
                    window.scrollTo(0, 0);
                    this.doLayout();
                }
            },
            dockedItems: [{
                cls: "logo",
                xtype: 'toolbar',
                dock: 'top',
                html: '<map name="FPMap1">' +
                    '<area href="index.htm" shape="rect" coords="214, 41, 245, 64">' +
                    '<area href="index_EN.html" shape="rect" coords="246, 42, 275, 64">' +
                    '<area href="index_DE.html" shape="rect" coords="277, 43, 303, 64">' +
                    '<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'index\'});" shape="rect" coords="0, 3, 191, 80">' +
                    '</map><img border="0" src="header.png" width="320" height="81" usemap="#FPMap1">'
                        },
	            {
	    xtype: 'toolbar',
	    dock: 'top',
	    align: 'center',
	    cls: 'menu',
	    layout: {
	        pack: 'center'
	    },
	    items: [
		{
		    itemId: 'btnRistoranti',
		    xtype: "button",
		    text: "ristoranti",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'cercaRistoranti',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton1 x-button-pressed';
		    },
		    cls: "menuButton1"
		},
		{
		    itemId: 'btnAccommodation',
		    xtype: "button",
		    text: "accommodation",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'cercaStrutture',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton2 x-button-pressed';
		    },
		    cls: "menuButton2"
		},
		{
		    itemId: 'btnTerritorio',
		    xtype: "button",
		    text: "territorio",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'territorio',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton3 x-button-pressed';
		    },
		    cls: "menuButton3"
		},
		{
		    itemId: 'btnEventi',
		    xtype: "button",
		    text: "eventi",
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'eventi',
		            slide: 'left'
		        });
		        this.el.dom.attributes[1].value = 'x-button menuButton4 x-button-pressed';
		    },
		    cls: "menuButton4"
		}]
	},
	{
	    cls: "indirizzo",
	    xtype: 'toolbar',
	    dock: 'bottom',
	    align: 'center',
	    title: 'copyright &copy; 2011 Bresciatourism scarl | p.iva 02403340983'
	},
	{
	    cls: "links",
	    xtype: 'toolbar',
	    dock: 'bottom',
	    align: 'center',
	    layout: {
	        pack: 'justify'
	    },
	    items: [
		{
		    itemId: 'btnInfopoint',
		    xtype: "button",
		    text: "infopoint",
		    linkId: 'infopoint',
		    handler: function () {
		        Ext.dispatch({
		            controller: 'Bresciatourism',
		            action: 'infopoint',
		            slide: 'left'
		        });
		    },
		    cls: "menuBottom1"
		},
		{
		    xtype: "button",
		    text: "youtube",
		    linkId: 'youtube',
		    cls: "menuBottom2",
		    url: 'http://www.youtube.com/user/Bresciatourism',
		    plugins: [new simfla.ux.plugins.linkButton()]

		},
		{
		    xtype: "button",
		    text: "facebook",
		    linkId: 'facebook',
		    cls: "menuBottom3",
		    url: 'http://www.facebook.com/bresciatourism',
		    plugins: [new simfla.ux.plugins.linkButton()]

		},
        {
            itemId: 'btnUnesco',
            xtype: "button",
            text: "unesco",
            linkId: 'unesco',
            cls: "menuBottom4",
            handler: function () {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'UNESCO',
                    slide: 'left'
                });
            }
        },
        {
            itemId: 'btnGallery',
            xtype: "button",
            text: "gallery",
            linkId: 'gallery',
            cls: "menuBottom5",
            handler: function () {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'album',
                    slide: 'left'
                });
            }
        }
		]
	}]
        }))();
        


        geo = new Ext.util.GeoLocation({
            autoUpdate: false,
            listeners: {
                locationupdate: function (geo) {
                    currentPosition = geo;
                    //alert('New latitude: ' + geo.latitude);
                }
            }
        });
        
    }

});


// *******************************************************************************************************************
// SETUP APP
// *******************************************************************************************************************

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    fullscreen: true
});





// *******************************************************************************************************************
// *******************************************************************************************************************
// controller
// *******************************************************************************************************************
// *******************************************************************************************************************

function resetNavigatore() {
        //resetta tasti menu
        BT.viewport.query('#btnRistoranti')[0].el.dom.attributes[1].value = 'x-button menuButton1 x-button-normal';
        BT.viewport.query('#btnAccommodation')[0].el.dom.attributes[1].value = 'x-button menuButton2 x-button-normal';
        BT.viewport.query('#btnTerritorio')[0].el.dom.attributes[1].value = 'x-button menuButton3 x-button-normal';
        BT.viewport.query('#btnEventi')[0].el.dom.attributes[1].value = 'x-button menuButton4 x-button-normal';
};


Ext.regController("Bresciatourism", {

    // index controller  *******************************************************************************************************************
    index: function () {
        resetNavigatore();

        if (!this.homePanel || this.homePanel.isDestroyed) {
            this.homePanel = this.render({
                xtype: 'bt-homepage',
                listeners: {
                    eventi: {
                        select: function (eventi, record) {
                            selectedEvento = record;
                            this.dettaglioEvento('bt-dettaglioeventohome', 'left');
                        },
                        scope: this
                    },
                    activate: function (homePanel) {
                        homePanel.eventi.getSelectionModel().deselectAll();
                    },
                    deactivate: function (homePanel) {
                        homePanel.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.homePanel, {
            type: 'slide',
            direction: 'right'
        });

        geo.updateLocation();
    },

    //cercaRistoranti *******************************************************************************************************************
    cercaRistoranti: function (options) {
        resetNavigatore();

        if (!this.ricercaRistorante || this.ricercaRistorante.isDestroyed) {
            this.ricercaRistorante = this.render({
                xtype: 'bt-ricercaristorante',
                listeners: {
                    deactivate: function (ricercaRistorante) {
                        ricercaRistorante.destroy();
                    }
                }
            });

        }

        this.ricercaRistorante.storeAree.on('load', function () {
            var areeSelectField = this.ricercaRistorante.items.get(1);
            var firstArea = this.ricercaRistorante.storeAree.getAt(0);
            if (firstArea) {
                areeSelectField.setValue(firstArea.data.ID);
            } else {
                areeSelectField.setValue('');
            }
        }, this);

        this.ricercaRistorante.storeComuni.on('load', function () {
            var comuneSelectField = this.ricercaRistorante.items.get(2);
            var firstComune = this.ricercaRistorante.storeComuni.getAt(0);
            if (firstComune) {
                comuneSelectField.setValue(firstComune.data.ID);
            } else {
                comuneSelectField.setValue('');
            }
            this.ricercaRistorante.storeCategorieRistorante.proxy.url = baseUrl + 'categorieRistorante.ashx?area=' + this.ricercaRistorante.storeComuni.filters.items[0].value + '&comune=' + firstComune.data.ID;
            this.ricercaRistorante.storeCategorieRistorante.load();
        }, this);

        this.ricercaRistorante.storeCategorieRistorante.on('load', function () {
            var categoriaSelectField = this.ricercaRistorante.items.get(3);
            var firstCategoria = this.ricercaRistorante.storeCategorieRistorante.getAt(0);
            if (firstCategoria) {
                categoriaSelectField.setValue(firstCategoria.data.ID);
            } else {
                categoriaSelectField.setValue('');
            }
        }, this);

        this.ricercaRistorante.query('#Ricerca')[0].on('tap', function () {
            if (this.ricercaRistorante.storeCategorieRistorante.getAt(0)) {
                idArea = this.ricercaRistorante.items.get(1).value,
                    idComune = this.ricercaRistorante.items.get(2).value,
                    idCategoria = this.ricercaRistorante.items.get(3).value,
                    nomeCategoria = this.ricercaRistorante.items.get(3).fieldEl.dom.value,
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoRistoranti',
                        slide: 'left'
                    });
            };
        }, this);

        this.ricercaRistorante.storeAree.load();

        this.ricercaRistorante.onAreaChange(this.ricercaRistorante.items.get(1), 1);

        BT.viewport.setActiveItem(this.ricercaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoRistorantiAroundMe: function (options) {
        if (!this.ristorantiAroundMe || this.ristorantiAroundMe.isDestroyed) {
            this.ristorantiAroundMe = this.render({
                xtype: 'bt-mapparistorantiaroundme',
                listeners: {
                    deactivate: function (ristorantiAroundMe) {
                        ristorantiAroundMe.destroy();
                    }
                }
            });
        }

        refreshMapRisto = function (ristorantiAroundMe) {
            Ext.util.JSONP.request({
                url: baseUrl + 'ristoranti.ashx',
                params: { lat: currentPosition.latitude, lon: currentPosition.longitude },
                callbackKey: 'callback',
                callback: function (result) {
                    var stAround = result.results;
                    // Add points to the map
                    if (currentPosition.latitude != '') {
                        var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
                        var marker = new google.maps.Marker({
                            map: ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].map,
                            position: latLng,
                            icon: 'posizione2.png'
                        });
                    }
                    for (var i = 0, ln = stAround.length; i < ln; i++) {
                        var st = stAround[i];
                        addMarkerRisto(ristorantiAroundMe, st);
                    }
                }
            });
        };

        addMarkerRisto = function (ristorantiAroundMe, st) {
            var latLng = new google.maps.LatLng(st.Lat, st.Lon);
            var marker = new google.maps.Marker({
                map: ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].map,
                position: latLng,
                title: st.ID + ''
            })
            google.maps.event.addListener(marker, "mousedown", function () {
                var obj = ristorantiAroundMe.storeRistoranti.getById(parseInt(marker.title));
                selectedRistorante = obj;
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'dettaglioRistorante',
                    slide: 'left',
                    tipo: 'mappa'
                });
            });
        };

        this.ristorantiAroundMe.storeRistoranti.load();

        geo.updateLocation();
        refreshMapRisto(this.ristorantiAroundMe);


        this.ristorantiAroundMe.query('#mappaRistorantiAroundMe')[0].update(currentPosition);
        this.ristorantiAroundMe.query('#mappaRistorantiToolbar')[0].setTitle(Testi[11]);

        BT.viewport.setActiveItem(this.ristorantiAroundMe, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoRistoranti: function (options) {
        if (!this.Ristoranti || this.Ristoranti.isDestroyed) {
            this.Ristoranti = this.render({
                xtype: 'bt-ristoranti',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedRistorante = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioRistorante',
                                slide: 'left',
                                tipo: 'elenco'
                            });
                        },
                        scope: this
                    },
                    deactivate: function (Ristoranti) {
                        Ristoranti.destroy();
                    }
                }
            });
        }

        this.Ristoranti.storeRistoranti.clearFilter();
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Comune', value: idComune, exactMatch: true });
        this.Ristoranti.storeRistoranti.filter({ property: 'id_Categoria', value: idCategoria, exactMatch: true });
        this.Ristoranti.storeRistoranti.load();

        this.Ristoranti.query('#ristorantiToolbar')[0].setTitle(Ext.util.Format.ellipsis(nomeCategoria, nCaratteri));

        BT.viewport.setActiveItem(this.Ristoranti, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioRistorante: function (options) {
        if (!this.schedaRistorante || this.schedaRistorante.isDestroyed) {
            this.schedaRistorante = this.render({
                xtype: 'bt-dettaglioristorante',
                listeners: {
                    deactivate: function (schedaRistorante) {
                        schedaRistorante.destroy();
                    }
                }
            });
        }

        this.schedaRistorante.update(selectedRistorante.data);
        this.schedaRistorante.query('#ristoranteToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedRistorante.data.Nome, nCaratteri));

        this.schedaRistorante.query('#backButton')[0].on('tap', function () {
            if (options.tipo == 'elenco') {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoRistoranti',
                    slide: 'right'
                });
            } else {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoRistorantiAroundMe',
                    slide: 'right'
                });
            }
        });


        BT.viewport.setActiveItem(this.schedaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaRistorante: function (options) {
        geo.updateLocation();

        if (!this.schedaMappaRistorante || this.schedaMappaRistorante.isDestroyed) {
            this.schedaMappaRistorante = this.render({
                xtype: 'bt-mapparistorante',
                listeners: {
                    deactivate: function (schedaMappaRistorante) {
                        schedaMappaRistorante.destroy();
                    }
                }
            });
        }


        var latLng;

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            marker = new google.maps.Marker({
                map: this.schedaMappaRistorante.query('#mappaRistorante')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker Ristorante
        if (selectedRistorante) {
            latLng = new google.maps.LatLng(selectedRistorante.data.Lat, selectedRistorante.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaRistorante.query('#mappaRistorante')[0].map,
                title: selectedRistorante.data.Nome,
                position: latLng
            });
            this.schedaMappaRistorante.query('#mappaRistorante')[0].map.setCenter(latLng)
        }

        this.schedaMappaRistorante.query('#mappaRistoranteToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedRistorante.data.Nome), nCaratteri));

        BT.viewport.setActiveItem(this.schedaMappaRistorante, {
            type: 'slide',
            direction: options.slide
        });
    },



    //cercaStrutture *******************************************************************************************************************
    cercaStrutture: function (options) {
        resetNavigatore();

        if (!this.ricercaStrutture || this.ricercaStrutture.isDestroyed) {
            this.ricercaStrutture = this.render({
                xtype: 'bt-ricercastruttura',
                listeners: {
                    deactivate: function (ricercaStrutture) {
                        ricercaStrutture.destroy();
                    }
                }
            });
        }

        this.ricercaStrutture.storeAree.on('load', function () {
            var areeSelectField = this.ricercaStrutture.items.get(1);
            var firstArea = this.ricercaStrutture.storeAree.getAt(0);
            if (firstArea) {
                areeSelectField.setValue(firstArea.data.ID);
            } else {
                areeSelectField.setValue('');
            }
        }, this);

        this.ricercaStrutture.storeComuni.on('load', function () {
            var comuneSelectField = this.ricercaStrutture.items.get(2);
            var firstComune = this.ricercaStrutture.storeComuni.getAt(0);
            if (firstComune) {
                comuneSelectField.setValue(firstComune.data.ID);
            } else {
                comuneSelectField.setValue('');
            }
            this.ricercaStrutture.storeTipologieStruttura.proxy.url = baseUrl + 'tipologieStruttura.ashx?area=' + this.ricercaStrutture.storeComuni.filters.items[0].value + '&comune=' + firstComune.data.ID;
            this.ricercaStrutture.storeTipologieStruttura.load();
        }, this);

        this.ricercaStrutture.storeTipologieStruttura.on('load', function () {
            var tipologiaSelectField = this.ricercaStrutture.items.get(3);
            var firstTipologia = this.ricercaStrutture.storeTipologieStruttura.getAt(0);
            if (firstTipologia) {
                tipologiaSelectField.setValue(firstTipologia.data.ID);
            } else {
                tipologiaSelectField.setValue('');
            }
        }, this);

        this.ricercaStrutture.query('#Ricerca')[0].on('tap', function () {
            if (this.ricercaStrutture.storeTipologieStruttura.getAt(0)) {
                idArea = this.ricercaStrutture.items.get(1).value,
                    idComune = this.ricercaStrutture.items.get(2).value,
                    idTipologia = this.ricercaStrutture.items.get(3).value,
                    nomeTipologia = this.ricercaStrutture.items.get(3).fieldEl.dom.value,
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoStrutture',
                        slide: 'left'
                    });
            };
        }, this);

        this.ricercaStrutture.storeAree.load();

        this.ricercaStrutture.onAreaChange(this.ricercaStrutture.items.get(1), 1);

        BT.viewport.setActiveItem(this.ricercaStrutture, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoStruttureAroundMe: function (options) {
        if (!this.struttureAroundMe || this.struttureAroundMe.isDestroyed) {
            this.struttureAroundMe = this.render({
                xtype: 'bt-mappastrutturearoundme',
                listeners: {
                    deactivate: function (struttureAroundMe) {
                        struttureAroundMe.destroy();
                    }
                }
            });
        }

        refreshMapStrutture = function (struttureAroundMe) {
            Ext.util.JSONP.request({
                url: baseUrl + 'strutture.ashx',
                params: { lingua: Lingua, lat: currentPosition.latitude, lon: currentPosition.longitude },
                callbackKey: 'callback',
                callback: function (result) {
                    var stAround = result.results;
                    // Add points to the map
                    if (currentPosition.latitude != '') {
                        var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
                        var marker = new google.maps.Marker({
                            map: struttureAroundMe.query('#mappaStruttureAroundMe')[0].map,
                            position: latLng,
                            icon: 'posizione2.png'
                        });
                    }
                    for (var i = 0, ln = stAround.length; i < ln; i++) {
                        var st = stAround[i];
                        addMarkerStruttura(struttureAroundMe, st);
                    }
                }
            });
        };

        addMarkerStruttura = function (struttureAroundMe, st) {
            var latLng = new google.maps.LatLng(st.Lat, st.Lon);
            var marker = new google.maps.Marker({
                map: struttureAroundMe.query('#mappaStruttureAroundMe')[0].map,
                position: latLng,
                title: st.ID + ''
            })
            google.maps.event.addListener(marker, "mousedown", function () {
                var obj = struttureAroundMe.storeStrutture.getById(parseInt(marker.title));
                selectedStruttura = obj;
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'dettaglioStruttura',
                    slide: 'left',
                    tipo: 'mappa'
                });
            });
        };

        this.struttureAroundMe.storeStrutture.load();


        geo.updateLocation();
        refreshMapStrutture(this.struttureAroundMe);


        this.struttureAroundMe.query('#mappaStruttureAroundMe')[0].update(currentPosition);
        this.struttureAroundMe.query('#mappaStruttureToolbar')[0].setTitle(Testi[11]);

        BT.viewport.setActiveItem(this.struttureAroundMe, {
            type: 'slide',
            direction: options.slide
        });

    },

    elencoStrutture: function (options) {
        if (!this.Strutture || this.Strutture.isDestroyed) {
            this.Strutture = this.render({
                xtype: 'bt-strutture',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedStruttura = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioStruttura',
                                slide: 'left',
                                tipo: 'elenco'
                            });
                        },
                        scope: this
                    },
                    deactivate: function (Strutture) {
                        Strutture.destroy();
                    }
                }
            });
        }

        this.Strutture.storeStrutture.clearFilter();
        this.Strutture.storeStrutture.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.Strutture.storeStrutture.filter({ property: 'id_Comune', value: idComune, exactMatch: true });
        this.Strutture.storeStrutture.filter({ property: 'id_Tipologia', value: idTipologia, exactMatch: true });
        this.Strutture.storeStrutture.load();

        this.Strutture.query('#struttureToolbar')[0].setTitle(Ext.util.Format.ellipsis(nomeTipologia, nCaratteri));

        BT.viewport.setActiveItem(this.Strutture, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioStruttura: function (options) {
        if (!this.schedaStruttura || this.schedaStruttura.isDestroyed) {
            this.schedaStruttura = this.render({
                xtype: 'bt-dettagliostruttura',
                listeners: {
                    deactivate: function (schedaStruttura) {
                        schedaStruttura.destroy();
                    }
                }
            });
        }

        this.schedaStruttura.update(selectedStruttura.data);
        this.schedaStruttura.query('#strutturaToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedStruttura.data.Nome, nCaratteri));

        this.schedaStruttura.query('#backButton')[0].on('tap', function () {
            if (options.tipo == 'elenco') {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoStrutture',
                    slide: 'right'
                });
            } else {
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'elencoStruttureAroundMe',
                    slide: 'right'
                });
            }
        });

        BT.viewport.setActiveItem(this.schedaStruttura, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaStruttura: function (options) {
        geo.updateLocation();
        if (!this.schedaMappaStruttura || this.schedaMappaStruttura.isDestroyed) {
            this.schedaMappaStruttura = this.render({
                xtype: 'bt-mappastruttura',
                listeners: {
                    deactivate: function (schedaMappaStruttura) {
                        schedaMappaStruttura.destroy();
                    }
                }
            });
        }

        var latLng;

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            marker = new google.maps.Marker({
                map: this.schedaMappaStruttura.query('#mappaStruttura')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker Ristorante
        if (selectedStruttura) {
            latLng = new google.maps.LatLng(selectedStruttura.data.Lat, selectedStruttura.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaStruttura.query('#mappaStruttura')[0].map,
                title: selectedStruttura.data.Nome,
                position: latLng
            });
            this.schedaMappaStruttura.query('#mappaStruttura')[0].map.setCenter(latLng)
        }

        this.schedaMappaStruttura.query('#mappaStrutturaToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedStruttura.data.Nome), nCaratteri));

        BT.viewport.setActiveItem(this.schedaMappaStruttura, {
            type: 'slide',
            direction: options.slide
        });
    },


    //territorio *******************************************************************************************************************
    territorio: function (options) {
        resetNavigatore();

        if (!this.schedaTerritorio || this.schedaTerritorio.isDestroyed) {
            this.schedaTerritorio = this.render({
                xtype: 'bt-territorio',
                listeners: {
                    deactivate: function (schedaTerritorio) {
                        schedaTerritorio.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.schedaTerritorio, {
            type: 'slide',
            direction: options.slide
        });
    },

    tipologiePOI: function (options) {
        idArea = options.idArea;
        titoloTerritorio = options.titolo;

        if (!this.tipoPOI || this.tipoPOI.isDestroyed) {
            this.tipoPOI = this.render({
                xtype: 'bt-tipoPOI',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedTipoPOI = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'elencoPOI',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (tipoPOI) {
                        tipoPOI.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (tipoPOI) {
                        tipoPOI.destroy();
                    }
                }
            });
        }

        this.tipoPOI.query('#tipoPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(titoloTerritorio), nCaratteri));

        BT.viewport.setActiveItem(this.tipoPOI, {
            type: 'slide',
            direction: options.slide
        });
    },

    elencoPOI: function (options) {
        if (!this.schedaElencoPOI || this.schedaElencoPOI.isDestroyed) {
            this.schedaElencoPOI = this.render({
                xtype: 'bt-elencoPOI',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedPOI = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioPOI',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (schedaElencoPOI) {
                        schedaElencoPOI.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (schedaElencoPOI) {
                        schedaElencoPOI.destroy();
                    }
                }
            });
        }

        this.schedaElencoPOI.query('#elencoPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(Ext.util.Format.htmlEncode(selectedTipoPOI.data.Categoria), nCaratteri));

        this.schedaElencoPOI.storePOI.clearFilter();
        this.schedaElencoPOI.storePOI.filter({ property: 'id_Area', value: idArea, exactMatch: true });
        this.schedaElencoPOI.storePOI.filter({ property: 'id_Categoria', value: selectedTipoPOI.data.ID, exactMatch: true });
        this.schedaElencoPOI.storePOI.load();

        BT.viewport.setActiveItem(this.schedaElencoPOI, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioPOI: function (options) {
        if (!this.schedaDettaglioPOI || this.schedaDettaglioPOI.isDestroyed) {
            this.schedaDettaglioPOI = this.render({
                xtype: 'bt-dettaglioPOI',
                listeners: {
                    deactivate: function (schedaDettaglioPOI) {
                        schedaDettaglioPOI.destroy();
                    }
                }
            });
        }

        this.schedaDettaglioPOI.update(selectedPOI.data);
        this.schedaDettaglioPOI.query('#dettaglioPOIToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedPOI.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaDettaglioPOI, {
            type: 'slide',
            direction: options.slide
        });
    },


    //eventi *******************************************************************************************************************
    eventi: function (options) {
        resetNavigatore();

        if (!this.Eventi || this.Eventi.isDestroyed) {
            this.Eventi = this.render({
                xtype: 'bt-eventi',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedEvento = record;
                            this.dettaglioEvento('bt-dettaglioevento', 'left');
                        },
                        scope: this
                    },
                    activate: function (Eventi) {
                        Eventi.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (Eventi) {
                        Eventi.destroy();
                    }
                }
            });

        }

        BT.viewport.setActiveItem(this.Eventi, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioEvento: function (view, slide) {
        if (!this.schedaEvento || this.schedaEvento.isDestroyed) {
            this.schedaEvento = this.render({
                xtype: view,
                listeners: {
                    deactivate: function (schedaEvento) {
                        schedaEvento.destroy();
                    }
                }
            });
        }

        this.schedaEvento.update(selectedEvento.data);
        this.schedaEvento.query('#eventoToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedEvento.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaEvento, {
            type: 'slide',
            direction: slide
        });
    },


    //infopoint *******************************************************************************************************************
    infopoint: function (options) {
        resetNavigatore();
        if (!this.schedaInfopoint || this.schedaInfopoint.isDestroyed) {
            this.schedaInfopoint = this.render({
                xtype: 'bt-infopoint',
                listeners: {
                    deactivate: function (schedaInfopoint) {
                        schedaInfopoint.destroy();
                    },
                    scope: this
                }
            });
        }

        BT.viewport.setActiveItem(this.schedaInfopoint, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaInfopoint: function (options) {
        geo.updateLocation();
        if (!this.schedaMappaInfopoint || this.schedaMappaInfopoint.isDestroyed) {
            this.schedaMappaInfopoint = this.render({
                xtype: 'bt-mappainfopoint',
                listeners: {
                    deactivate: function (schedaMappaInfopoint) {
                        schedaMappaInfopoint.destroy();
                    }
                }
            });
        }

        var marker = new google.maps.Marker({
            map: this.schedaMappaInfopoint.query('#mappaInfopoint')[0].map,
            position: posizione_infopoint
        });

        BT.viewport.setActiveItem(this.schedaMappaInfopoint, {
            type: 'slide',
            direction: options.slide
        });
    },

    //UNESCO *******************************************************************************************************************
    UNESCO: function (options) {
        resetNavigatore();

        if (!this.schedaUNESCO || this.schedaUNESCO.isDestroyed) {
            this.schedaUNESCO = this.render({
                xtype: 'bt-unesco',
                listeners: {
                    list: {
                        select: function (list, record) {
                            selectedUNESCO = record;
                            Ext.dispatch({
                                controller: 'Bresciatourism',
                                action: 'dettaglioUNESCO',
                                slide: 'left'
                            });
                        },
                        scope: this
                    },
                    activate: function (schedaUNESCO) {
                        schedaUNESCO.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (schedaUNESCO) {
                        schedaUNESCO.destroy();
                    }
                }
            });
        }

        BT.viewport.setActiveItem(this.schedaUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    dettaglioUNESCO: function (options) {

        if (!this.schedaDettaglioUNESCO || this.schedaDettaglioUNESCO.isDestroyed) {
            this.schedaDettaglioUNESCO = this.render({
                xtype: 'bt-dettagliounesco',
                listeners: {
                    deactivate: function (schedaDettaglioUNESCO) {
                        schedaDettaglioUNESCO.destroy();
                    }
                }
            });
        }

        this.schedaDettaglioUNESCO.update(selectedUNESCO.data);
        this.schedaDettaglioUNESCO.query('#UNESCOToolbar')[0].setTitle(Ext.util.Format.ellipsis(selectedUNESCO.data.Titolo, nCaratteri));

        BT.viewport.setActiveItem(this.schedaDettaglioUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    mappaUNESCO: function (options) {
        geo.updateLocation();

        if (!this.schedaMappaUNESCO || this.schedaMappaUNESCO.isDestroyed) {
            this.schedaMappaUNESCO = this.render({
                xtype: 'bt-mappaunesco',
                listeners: {
                    deactivate: function (schedaMappaUNESCO) {
                        schedaMappaUNESCO.destroy();
                    }
                }
            });
        }

        //aggiunge marker posizione attuale
        if (currentPosition.latitude != '') {
            var latLng = new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude);
            var marker = new google.maps.Marker({
                map: this.schedaMappaUNESCO.query('#mappaUNESCO')[0].map,
                position: latLng,
                icon: 'posizione2.png'
            });
        };

        //aggiunge marker POI
        if (selectedUNESCO && selectedUNESCO.data.Lat && selectedUNESCO.data.Lon) {
            var latLng = new google.maps.LatLng(selectedUNESCO.data.Lat, selectedUNESCO.data.Lon);
            mapMarker = new google.maps.Marker({
                map: this.schedaMappaUNESCO.query('#mappaUNESCO')[0].map,
                position: latLng
            });
            this.schedaMappaUNESCO.update(latLng);
        }

        BT.viewport.setActiveItem(this.schedaMappaUNESCO, {
            type: 'slide',
            direction: options.slide
        });
    },

    //GALLERY *******************************************************************************************************************
    album: function (options) {
        resetNavigatore();

        if (!this.elencoAlbum || this.elencoAlbum.isDestroyed) {
            this.elencoAlbum = this.render({
                xtype: 'bt-album',
                listeners: {
                    list: {
                        select: function (list, record) {
                            idAlbum = record.data.ID;
                            this.showGallery(list, record, 'left');
                        },
                        scope: this
                    },
                    activate: function (elencoAlbum) {
                        elencoAlbum.list.getSelectionModel().deselectAll();
                    },
                    deactivate: function (elencoAlbum) {
                        //elencoAlbum.destroy();
                    }
                }
            });
        }

        BT.viewport.setActiveItem(this.elencoAlbum, {
            type: 'slide',
            direction: options.slide
        });
    },

    showGallery: function (list, record, slide) {

        if (!this.elencoGallery || this.elencoGallery.isDestroyed) {
            this.elencoGallery = this.render({
                xtype: 'bt-gallery',
                listeners: {
                    deactivate: function (elencoGallery) {
                        elencoGallery.destroy();
                    },
                    dataView: {
                        itemtap: function (list, index) {
                            var imgdata = this.elencoGallery.dataView.store.data.items;
                            this.showCarousel(list, index, imgdata, record);
                        },
                        scope: this
                    }
                }
            });
        }

        this.elencoGallery.query('#galleryToolbar')[0].setTitle(Ext.util.Format.ellipsis(record.data.Nome, nCaratteri));

        BT.viewport.setActiveItem(this.elencoGallery, {
            type: 'slide',
            direction: slide
        });
    },

    showCarousel: function (list, index, imgdata, album) {
        if (!this.albumCarousel || this.albumCarousel.isDestroyed) {
            this.albumCarousel = this.render({
                xtype: 'bt-dettagliogallery',
                listeners: {
                    deactivate: function (albumCarousel) {
                        albumCarousel.destroy();
                    }
                }
            });

            for (i = 0; i < imgdata.length; i++) {
                if (Ext.is.Phone) {
                    this.albumCarousel.carousel.add({
                        html: '<div class="img_gallery" style="background: url(' + baseUrl + 'assets/Gallery/' + imgdata[i].data.Immagine_iPhone + ') top center no-repeat;"></div>'
                    });
                } else {
                    this.albumCarousel.carousel.add({
                        html: '<div class="img_gallery" style="background: url(' + baseUrl + 'assets/Gallery/' + imgdata[i].data.Immagine_iPad + ') top center no-repeat;"></div>'
                    });
                };
            }

            this.albumCarousel.query('#backButton')[0].on({
                tap: function () {
                    this.showGallery(list, album, 'right');
                },
                scope: this
            })

            this.albumCarousel.query('#carouselToolbar')[0].setTitle(Ext.util.Format.ellipsis(album.data.Nome, nCaratteri));

            BT.viewport.setActiveItem(this.albumCarousel, 'slide');
            this.albumCarousel.carousel.setActiveItem(index);
        }
    }

});





// *********************************************************************************
// MODELS -------------------------------------------------------------------
// *********************************************************************************

Ext.regModel('categoriaRistorante', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'Categoria', type: 'string'}
	]
});	
				
Ext.regModel('ristorante', {
    idProperty: 'ID',
	fields: [
	{name: 'ID', type: 'int'},
	{name: 'id_Area', type: 'int'},
    {name: 'id_Comune', type: 'int'},
    {name: 'id_Categoria', type: 'int'},
	'Categoria','Area','Comune','Nome','Indirizzo','Cap','Telefono','Immagine','Lat','Lon'
    ]
});
				
				
Ext.regModel('tipologiaStruttura', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'Tipologia', type: 'string'}
	]
});	
				
Ext.regModel('struttura', {
	idProperty: 'ID',
	fields: [
	{name: 'ID', type: 'int'},
	{name: 'id_Area', type: 'int'},
    {name: 'id_Comune', type: 'int'},
    {name: 'id_Tipologia', type: 'int'},
	'Nome', 'Comune', 'Titolo', 'Descrizione', 'Immagine', 'Stelle', 'Lat', 'Lon', 'Indirizzo', 'Cap', 'Telefono','Email','Url'
    ]
});
				
				
Ext.regModel('evento', {
	fields: ['ID', 'ID_Mese', 'Mese','Area','Comune','Data','Titolo', 'Testo', 'Immagine', 'FotoTestata', 'VisibileFino'
    ]
});	
				
				
Ext.regModel('area', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'Area', type: 'string'}
	]
});	
				
Ext.regModel('comune', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'id_Area', type: 'int'},
		{name: 'Comune', type: 'string'}
	]
});		
				
Ext.regModel('tipoPOI', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'Categoria', type: 'string'}
    ]
});	

Ext.regModel('POI', {
	idProperty: 'ID',
	fields: [
		{name: 'ID', type: 'int'},
		{name: 'id_Area', type: 'int'},
        {name: 'id_Categoria', type: 'int'},
		'Titolo','Testo','Immagine','FotoTestata'
	]
});						
	
Ext.regModel('UNESCO', {
	fields: ['ID', 'Titolo', 'Testo','Miniatura', 'Immagine', 'Lat', 'Lon']
});	


Ext.regModel("Album", {
    fields: [
        {name: 'ID', type: 'int'},
        {name: "Nome", type: "string"}
    ]
});

Ext.regModel("Gallery", {
    fields: [
        {name: 'ID', type: 'int'},
        {name: "Immagine_iPhone", type: "string"},
        {name: "Immagine_iPad", type: "string"}
    ]
});

BT.views.Eventi = Ext.extend(Ext.Panel, {
    id: 'riepilogoEventi ',
	cls: 'scheda_base',
	disableSelection: true,
	grouped: true,
    layout: 'fit',

    initComponent: function () {

        this.list = new Ext.List({
            cls: 'scheda_base',
            scroll: 'vertical',
            itemTpl: new Ext.Template(
                '<tpl for=".">' +
                '<div class="evento"><img src="' + baseUrl + 'assets/eventi/{Immagine}" class="img_evento">' +
                '</img><span class="titolo">{Data} - {Titolo}</span><br><span class="testo">{[fm.ellipsis(removeHTMLTags(values.Testo),80,true)]}</span></div>' +
                '</tpl>'
            ),
            store: new Ext.data.JsonStore({
                model: 'evento',
                sorters: 'ID_Mese',
                getGroupString: function (record) {
                    return record.get('Mese');
                },
                autoLoad: true,
                fields: [
		            'ID',
		            'ID_Mese',
		            'Mese',
		            'Area',
		            'Comune',
		            'Data',
		            'Titolo',
		            'Testo',
		            'Immagine',
		            'FotoTestata',
                    'VisibileFino'
                ],
                proxy: {
                    type: 'scripttag',
                    url: baseUrl + 'eventi.ashx?lingua=' + Lingua,
                    method: 'GET',
                    reader: {
                        type: 'json',
                        root: 'results',
                        idProperty: 'ID'
                    }
                }
            })
        });

        this.items = [this.list];
        

        BT.views.Eventi.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-eventi', BT.views.Eventi);


BT.views.dettaglioGallery = Ext.extend(Ext.Panel, {
    id: 'dettaglioGallery',
    title: "dettaglioGallery",
    layout: 'fit',
    cls: 'scheda_base',

    initComponent: function () {

        this.carousel = new Ext.Carousel({
            indicator: false,
            centered: true,
        });

        this.items = [this.carousel];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'carouselToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back'
            }]
        })];


        BT.views.dettaglioGallery.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettagliogallery', BT.views.dettaglioGallery);


BT.views.Homepage = Ext.extend(Ext.Panel, {
    id: 'homepage',
    scroll: "vertical",
    cls: 'scheda_base',

    initComponent: function () {

        this.carousel = new Ext.Carousel({
            height: 214,
            centered: true,
            padding: 'auto',
            items: [
                    { html: "<div style='text-align:center'><img src='1.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='2.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='3.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='4.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='5.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='6.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='7.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='8.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='9.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='10.jpg'></div>" },
                    { html: "<div style='text-align:center'><img src='11.jpg'></div>" }
                ]
        });

        this.eventi = new Ext.List({
            cls: 'scheda_base',
            scroll: false,
            itemTpl: new Ext.Template(
                '<tpl for=".">' +
                '<div class="evento"><img src="' + baseUrl + 'assets/eventi/{Immagine}" class="img_evento">' +
                '</img><span class="titolo">{Data} - {Titolo}</span><br><span class="testo">{[fm.ellipsis(removeHTMLTags(values.Testo),80,true)]}</span></div>' +
                '</tpl>'
            ),
            store: new Ext.data.JsonStore({
                model: 'evento',
                sorters: 'ID_Mese',
                getGroupString: function (record) {
                    return record.get('Mese');
                },
                autoLoad: true,
                fields: [
		            'ID',
		            'ID_Mese',
		            'Mese',
		            'Area',
		            'Comune',
		            'Data',
		            'Titolo',
		            'Testo',
		            'Immagine',
		            'FotoTestata',
                    'VisibileFino'
                ],
                proxy: {
                    type: 'scripttag',
                    url: baseUrl + 'eventi.ashx?lingua=' + Lingua,
                    method: 'GET',
                    reader: {
                        type: 'json',
                        root: 'results',
                        idProperty: 'ID'
                    }
                },
                listeners: {
                    'load': function () {
                        var meseFilter = new Ext.util.Filter({
                            filterFn: function (item) {
                                var data = new Date(parseInt(item.data.VisibileFino.substr(6)));
                                return (item.data.ID_Mese >= meseCorrente && data >= oggi);
                            }
                        });
                        this.filter(meseFilter);
                    }
                }
            })
        });

        this.items = [this.carousel, this.eventi];
        

        BT.views.Homepage.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-homepage', BT.views.Homepage);


BT.views.tipoPOI = Ext.extend(Ext.Panel, {
    id: 'listaTipoPOI',
    title: "listaTipoPOI",
    grouped: false,
    indexBar: false,
    emptyText: Testi[22],
    layout: 'fit',

    initComponent: function () {

        this.storeTipoPOI = new Ext.data.JsonStore({
            storeId: 'storeTipoPOI',
            model: 'tipoPOI',
            autoLoad: true,
            fields: [
                    'ID',
                    'Categoria'
                ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'tipoPOI.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.list = new Ext.List({
            cls: 'scheda_base',
            scroll: "vertical",
            itemTpl: new Ext.Template(
                '<tpl for="."><div class="album">{Categoria}</div></tpl>'
            ),
            store: this.storeTipoPOI
        });

        this.items = [this.list];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'tipoPOIToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'territorio',
                        slide: 'right'
                    });
                }
            }]
        })];


        BT.views.tipoPOI.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-tipoPOI', BT.views.tipoPOI);


BT.views.Gallery = Ext.extend(Ext.Panel, {
    id: 'Gallery',
    scroll: "vertical",
    title: "Gallery",
    cls: 'scheda_base',
    grouped: false,
    indexBar: false,
    emptyText: Testi[22],
    layout: 'fit',

    initComponent: function () {

        this.storeGallery = new Ext.data.JsonStore({
            storeId: 'storeGallery',
            model: 'Gallery',
            autoLoad: true,
            fields: [
                'ID',
                'Immagine_iPhone',
                'Immagine_iPad'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'gallery.ashx?idAlbum=' + idAlbum,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });


        //'<div style="padding:10px 5px 5px 5px;">',
        //'<div class="node_gallery" style="background:url(' + baseUrl + 'assets/Gallery/tn_' + '{Immagine_iPhone});">',
        //'</div>',
        //'</div>'       
        this.xtpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="node_gallery"><img src="' + baseUrl + 'assets/Gallery/tn_{Immagine_iPhone}" class="img_evento" width="95" height="95"></img></div>',
            '</tpl>'
        );

        this.dataView = new Ext.DataView({
            store: this.storeGallery,
            tpl: this.xtpl,
            itemSelector: 'div.node_gallery'
        });

        this.items = [this.dataView];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'galleryToolbar',
            dock: 'top',
            title: 'Gallery',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'album',
                        slide: 'right'
                    });
                }
            }]
        })];

        BT.views.Gallery.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-gallery', BT.views.Gallery);


BT.views.ricercaRistorante = Ext.extend(Ext.form.FormPanel, {

    initComponent: function () {

        this.storeAree = new Ext.data.JsonStore({
            storeId: 'storeAree',
            itemId: 'storeAree',
            model: 'area',
            autoLoad: false,
            fields: [
                'ID',
                'Area'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'aree.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.storeComuni = new Ext.data.JsonStore({
            storeId: 'storeComuni',
            itemId: 'storeComuni',
            model: 'comune',
            autoLoad: false,
            fields: [
                'ID',
                'id_Area',
                'Comune'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'comuni.ashx',
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });


        this.storeCategorieRistorante = new Ext.data.JsonStore({
            storeId: 'storeCategorieRistorante',
            itemId: 'storeCategorieRistorante',
            model: 'categoriaRistorante',
            autoLoad: false,
            fields: [
                'ID',
                'Categoria'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'categorieRistorante.ashx',
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });



        Ext.apply(this, {
            centered: true,
            modal: true,
            scroll: "vertical",
            hideOnMaskTap: false,
            baseCls: 'scheda_base',
            padding: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            items: [
            {
                xtype: 'button',
                name: 'vicinoame',
                itemId: 'AroundMe',
                text: '',
                cls: 'btn_vicinoame',
                pressedCls: 'btn_vicinoame_on',
                width: 320,
                align: 'center',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoRistorantiAroundMe',
                        slide: 'left'
                    });
                }
            },
            {
                xtype: 'selectfield',
                name: 'Area',
                itemId: 'Area',
                label: Testi[7],
                displayField: 'Area',
                valueField: 'ID',
                width: 320,
                store: this.storeAree
            },
            {
                xtype: 'selectfield',
                name: 'Comune',
                itemId: 'Comune',
                label: Testi[8],
                displayField: 'Comune',
                valueField: 'ID',
                width: 320,
                store: this.storeComuni
            },
            {
                xtype: 'selectfield',
                name: 'Categoria',
                itemId: 'Categoria',
                label: Testi[10],
                displayField: 'Categoria',
                valueField: 'ID',
                id: 'selectCategoria',
                width: 320,
                store: this.storeCategorieRistorante
            },
            {
                xtype: 'button',
                name: 'Ricerca',
                itemId: 'Ricerca',
                text: '',
                width: 175,
                cls: 'btn_ricerca',
                pressedCls: 'btn_ricerca_on'
            }
            ]
        });

        BT.views.ricercaRistorante.superclass.initComponent.call(this, arguments);

        this.items.get(1).on({
            change: this.onAreaChange,
            scope: this
        });

        this.items.get(2).on({
            change: this.onComuneChange,
            scope: this
        });

    },

    onAreaChange: function (selectField, value) {
        this.storeComuni.clearFilter();
        this.storeComuni.filter('id_Area', value);
        this.storeComuni.load();
    },

    onComuneChange: function (selectField, value) {
        this.storeCategorieRistorante.proxy.url = baseUrl + 'categorieRistorante.ashx?area=' + this.items.get(1).value + '&comune=' + this.items.get(2).value;
        this.storeCategorieRistorante.load();
    }


});


Ext.reg('bt-ricercaristorante', BT.views.ricercaRistorante);


BT.views.Strutture = Ext.extend(Ext.Panel, {
    id: 'Strutture ',
    cls: 'scheda_base',
    disableSelection: true,
    scroll: 'vertical',
    grouped: true,
    layout: 'fit',

    initComponent: function () {

        this.storeStrutture = new Ext.data.JsonStore({
            model: 'struttura',
            sorters: 'Nome',
            itemId: 'storeStrutture',
            storeId: 'storeStrutture',

            getGroupString: function (record) {
                return record.get('Nome')[0];
            },

            autoLoad: true,
            fields: [
                'ID',
                'id_Area',
                'id_Comune',
                'id_Tipologia',
                'Nome',
                'Comune',
                'Titolo',
                'Descrizione',
                'Immagine',
                'Stelle',
                'Lat',
                'Lon',
                'Indirizzo',
                'Cap',
                'Telefono',
                'Email',
                'Url'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'strutture.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.list = new Ext.List({
            scroll: 'vertical',
            //baseCls: 'scheda_base',
            title: "Accomodation",
            itemTpl: new Ext.Template(
            '<tpl for="."><div class="struttura"><img src="{Stelle:htmlEncode}ministar.png" align="right"><span class="titolo">{Nome}</span> - <span class="testo">{Comune}</span></div></tpl>'
            ),
            grouped: true,
            store: this.storeStrutture,
            emptyText: Testi[21]
        });

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'struttureToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'cercaStrutture',
                        slide:'right'
                    });
                }
            }]
        })];

        this.items = [this.list];


        BT.views.Strutture.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-strutture', BT.views.Strutture);


BT.views.dettaglioStruttura = Ext.extend(Ext.Panel, {
    id: 'dettaglioRistorante',
    title: "dettaglioRistorante",
    scroll: "vertical",
    cls: 'scheda_base',
    tpl: new Ext.Template(
    '<tpl for=".">' +
    '<div class="dettaglio_struttura">' +
    '<span class="titolo">{Nome:htmlEncode}</span> <span class="testo"> - {Comune:htmlEncode}</span><br />' +
    '<span class="sottotitolo">{Titolo}</span><br />' +
    '<span class="testo">{Descrizione}</span><br /><br />' +
    '<div style="width:320px;margin:auto">' +
    '<img src="' + baseUrl + 'assets/Strutture/{Immagine}" class="img_struttura">' +
    '<div style="float:right">' +
    '<div class="info_struttura" style="border-top:dotted 1px #006fbf;">' + Testi[0] + '<br /><a href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'mappaStruttura\', slide:\'left\'})"><img src="googlemap.png"></a></div>' +
    '<div class="info_struttura">' + Testi[2] + '<br /><img src="{Stelle:htmlEncode}star.png"></div>' +
    '<div class="info_struttura"> <a href="tel:{Telefono}"><img src="btn_chiama.png"></a></div>' +
    //'<div class="info_struttura"><img src="' + baseUrl + 'images/facebook.png"></div>' +
    '</div>' +
    '</div>' +
    '<div style="clear:both">' +
    '<div style="width:320px;margin:auto"><br />' +
    '<span class="testo">{Indirizzo}</span><br />' +
    '<span class="testo">{Cap} - {Comune}</span><br />' +
    '<span class="testo">' + Testi[1] + ': <a href="tel:{Telefono}">{Telefono}</a></span><br />' +
    '<span class="testo">E-mail: <a href="mailto:{Email}">{Email}</a></span><br />' +
    '<span class="testo">Url: <a target="_blank" href="http:\\{Url}">{Url}</a></span><br />' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'strutturaToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[4],
                ui: 'back'
            }]
        })];


        BT.views.dettaglioStruttura.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettagliostruttura', BT.views.dettaglioStruttura);


BT.views.mappaRistorante = Ext.extend(Ext.Panel, {
    id: 'mappaRistorante',
    title: "mappaRistorante",
    cls: 'scheda_base',
    layout: 'fit',    

    initComponent: function () {
        this.items = [new Ext.Map({
            itemId: 'mappaRistorante',
            fullscreen: true,
            mapOptions: {
                center: posizione_iniziale,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                activate: function () {
                    if (this.marker) {
                        this.update(this.marker.position);
                    }
                },
                resize: function () {
                    if (this.marker) {
                        this.update(this.marker.position);
                    }
                }
            }
        })];
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaRistoranteToolbar',
            dock: 'top',
            title: 'Ristorante',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'dettaglioRistorante',
                        slide: 'right',
                        tipo:'elenco'
                    });
                }
            }]
        })];

        BT.views.mappaRistorante.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mapparistorante', BT.views.mappaRistorante);


BT.views.elencoPOI = Ext.extend(Ext.Panel, {
    id: 'elencoPOI',
    title: "elencoPOI",
    emptyText: Testi[22],
    layout: 'fit',

    initComponent: function () {

        this.storePOI = new Ext.data.JsonStore({
            storeId: 'storePOI',
            itemId: 'storePOI',
            model: 'POI',
            autoLoad: false,
            fields: [
                'ID',
                'id_Area',
                'id_Categoria',
                'Titolo',
                'Testo',
                'Immagine',
                'FotoTestata'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'POI.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.list = new Ext.List({
            cls: 'scheda_base',
            scroll: "vertical",
            itemTpl: new Ext.Template(
                '<tpl for="."><div class="evento">' +
                '<img src="' + baseUrl + 'assets/POI/{Immagine}" class="img_evento"></img>' +
                '<span class="titolo">{Titolo}</span><br><span class="testo">{[fm.ellipsis(removeHTMLTags(values.Testo),80,true)]}</span>' +
                '</div></tpl>'
            ),
            store: this.storePOI
        });

        this.items = [this.list];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'elencoPOIToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'tipologiePOI',
                        slide: 'right',
                        idArea: idArea,
                        titolo: titoloTerritorio
                    });
                }
            }]
        })];


        BT.views.elencoPOI.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-elencoPOI', BT.views.elencoPOI);


BT.views.mappaRistorantiAroundMe = Ext.extend(Ext.Panel, {
    id: 'ristorantiAroundme',
    title: "ristorantiAroundme",
    cls: 'scheda_base',
    layout: "fit",

    initComponent: function () {

        this.storeRistoranti = new Ext.data.JsonStore({
            itemId: 'storeRistoranti',
            storeId: 'storeRistoranti',
            model: 'ristorante',
            sorters: 'Nome',
            autoLoad: false,

            fields: [
                'ID',
                'id_Area',
                'id_Comune',
                'id_Categoria',
                'Categoria',
                'Area',
                'Comune',
                'Nome',
                'Indirizzo',
                'Cap',
                'Telefono',
                'Immagine',
                'Lat',
                'Lon'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'ristoranti.ashx?lat=' + currentPosition.latitude + '&lon=' + currentPosition.longitude,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.items = [new Ext.Map({
            itemId: 'mappaRistorantiAroundMe',
            fullscreen: true,
            mapOptions: {
                center: posizione_iniziale,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            }
        })];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaRistorantiToolbar',
            dock: 'top',
            title: 'Ristorante',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'cercaRistoranti',
                        slide: 'right'
                    });
                }
            }]
        })];

        BT.views.mappaRistorantiAroundMe.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mapparistorantiaroundme', BT.views.mappaRistorantiAroundMe);


BT.views.dettaglioUNESCO = Ext.extend(Ext.Panel, {
    id: 'dettaglioUNESCO',
    title: "dettaglioUNESCO",
    cls: 'scheda_base',
    scroll: "vertical",
    tpl: new Ext.Template(
    '<tpl for=".">' +
    '<div class="dettaglio_struttura">' +
    '<img src="' + baseUrl + 'assets/UNESCO/{Immagine}" class="img_struttura">' +
    '<span class="titolo">{Titolo:htmlEncode}</span><br />' +
    '<span class="testo">{Testo}</span><br />' +
    '</div>' +
    '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'UNESCOToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items:
			[{
			    itemId: 'backButton',
			    text: Testi[5],
			    ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'UNESCO',
                        slide:'right'
                    });
                }
			},
            { xtype: 'spacer' },
            {
                itemId: 'mappaUNESCOButton',
                text: Testi[6],
                ui: 'default',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'mappaUNESCO',
                        slide:'left'
                    });
                }
            }]
        })];


        BT.views.dettaglioUNESCO.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettagliounesco', BT.views.dettaglioUNESCO);


BT.views.dettaglioRistorante = Ext.extend(Ext.Panel, {
    id: 'dettaglioRistorante',
    title: "dettaglio_ristorante",
    scroll: "vertical",
    cls: 'scheda_base',
    tpl: new Ext.Template(
        '<tpl for=".">' +
        '<div class="contenuto"><span class="titolo">{Nome}</span<br />' +
        '<div style="width:320px;margin:auto">' +
        '<img src="' + baseUrl + 'assets/Ristoranti/{Immagine}" class="img_struttura">' +
        '<div style="float:right">' +
        '<div class="info_struttura" style="border-top:dotted 1px #006fbf;">' + Testi[0] + '<br /><a href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'mappaRistorante\', slide:\'left\'})"><img src="googlemap.png"></a></div>' +
        '<div class="info_struttura"> <a href="tel:{Telefono}"><img src="btn_chiama.png"></a></div>' +
        '</div>' +
        '<div style="clear:both"><br />' +
        '<span class="testo">{Indirizzo}</span><br />' +
        '<span class="testo">{Cap} - {Comune}</span><br />' +
        '<span class="testo">' + Testi[1] + ': <a href="tel:{Telefono}">{Telefono}</a></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'ristoranteToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[4],
                ui: 'back'
            }]
        })];


        BT.views.dettaglioRistorante.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettaglioristorante', BT.views.dettaglioRistorante);


BT.views.Territorio = Ext.extend(Ext.Panel, {
    id: 'territorio',
    title: "territorio",
    scroll: "vertical",
    cls: 'scheda_base',

    initComponent: function () {
        this.items = [{
            html: '<div style="text-align:center"><map name="FPMap0">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'1\', titolo: \'Brescia\', slide:\'left\'})" shape="polygon" coords="112, 237, 116, 267, 122, 270, 125, 256, 153, 261, 165, 248, 156, 223, 146, 230, 142, 216">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'7\', titolo: \'Valle Camonica\', slide:\'left\'})" shape="polygon" coords="166, 5, 318, 30, 315, 57, 227, 65, 201, 81, 190, 107, 198, 125, 171, 137, 165, 133, 139, 148, 123, 140, 114, 121, 140, 96, 122, 54">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'3\', titolo: \'Lago di Garda\', slide:\'left\'})" shape="polygon" coords="316, 106, 255, 107, 209, 161, 213, 178, 195, 224, 163, 256, 200, 278, 225, 280, 251, 245, 291, 147, 314, 137">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'4\', titolo: \'Lago Idro\', slide:\'left\'})" shape="polygon" coords="315, 60, 316, 104, 254, 103, 208, 160, 208, 179, 193, 223, 168, 248, 159, 222, 169, 214, 156, 196, 147, 192, 173, 152, 173, 139, 198, 127, 199, 115, 206, 86, 227, 67, 285, 63">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'8\', titolo: \'Valle Trompia\', slide:\'left\'})" shape="polygon" coords="163, 139, 169, 141, 168, 154, 146, 192, 165, 215, 149, 224, 141, 210, 134, 219, 116, 202, 135, 156, 55, 108, 0, 109, 0, 67, 60, 67, 111, 120, 124, 141, 141, 151, 158, 141">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'5\', titolo: \'Lago Iseo\', slide:\'left\'})" shape="polygon" coords="0, 114, 57, 112, 132, 158, 115, 199, 93, 198, 83, 186, 90, 167, 48, 142, 0, 142">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'2\', titolo: \'Franciacorta\', slide:\'left\'})" shape="polygon" coords="110, 201, 131, 220, 105, 239, 75, 228, 66, 209, 54, 180, 0, 181, 0, 147, 48, 146, 86, 169, 81, 184, 99, 203">' +
			'<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'6\', titolo: \'Pianura\', slide:\'left\'})" shape="polygon" coords="66, 217, 84, 239, 109, 242, 114, 269, 123, 275, 130, 263, 153, 264, 159, 262, 183, 273, 188, 294, 176, 331, 0, 332, 0, 284, 66, 282, 63, 253, 53, 223">' +
            '<area href="javascript:Ext.dispatch({controller: \'Bresciatourism\',action: \'tipologiePOI\', idArea: \'1\', titolo: \'Brescia\', slide:\'left\'})" shape="polygon" coords="319, 281, 319, 326, 225, 318, 187, 280, 225, 282">' +
			'</map><img border="0" src="mappa.png" width="320" height="333" usemap="#FPMap0">'
        }];

        BT.views.Territorio.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-territorio', BT.views.Territorio);


BT.views.Ristoranti = Ext.extend(Ext.Panel, {
    id: 'Ristoranti ',
    cls: 'scheda_base',
    disableSelection: true,
    scroll: 'vertical',
    grouped: true,
    layout: 'fit',

    initComponent: function () {

        this.storeRistoranti = new Ext.data.JsonStore({
            itemId: 'storeRistoranti',
            storeId: 'storeRistoranti',
            model: 'ristorante',
            sorters: 'Nome',

            getGroupString: function (record) {
                return record.get('Nome')[0];
            },

            autoLoad: false,
            fields: [
                'ID',
                'id_Area',
                'id_Comune',
                'id_Categoria',
                'Categoria',
                'Area',
                'Comune',
                'Nome',
                'Indirizzo',
                'Cap',
                'Telefono',
                'Immagine',
                'Lat',
                'Lon'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'ristoranti.ashx',
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.list = new Ext.List({
            scroll: 'vertical',
            baseCls: 'scheda_base',
            itemTpl: new Ext.Template(
            '<tpl for="."><div class="struttura"><span class="titolo">{Nome}</span> - <span class="testo">{Comune}</span></div></tpl>'
            ),
            grouped: true,
            store: this.storeRistoranti,
            emptyText: Testi[20]
        });

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'ristorantiToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'cercaRistoranti',
                        slide:'right'
                    });
                }
            }]
        })];

        this.items = [this.list];


        BT.views.Ristoranti.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-ristoranti', BT.views.Ristoranti);


BT.views.dettaglioEventoHome = Ext.extend(Ext.Panel, {
    id: 'dettaglioEvento',
    title: "Evento",
    scroll: "vertical",
    cls: 'scheda_base',
    tpl: new Ext.Template(
    '<tpl for=".">' +
    '<img src="' + baseUrl + 'assets/eventi/{FotoTestata}" align="left" style="margin-right:10px"><div class="contenuto"><span class="titolo">{Data} - {Titolo}</span>{Testo}</div>' +
    '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'eventoToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[4],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'index',
                        slide:'right'
                    });
                }
            }]
        })];


        BT.views.dettaglioEventoHome.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettaglioeventohome', BT.views.dettaglioEventoHome);


BT.views.dettaglioEvento = Ext.extend(Ext.Panel, {
    id: 'dettaglioEvento',
    title: "Evento",
    scroll: "vertical",
    cls: 'scheda_base',
    tpl: new Ext.Template(
    '<tpl for=".">' +
    '<img src="' + baseUrl + 'assets/eventi/{FotoTestata}" align="left" style="margin-right:10px"><div class="contenuto"><span class="titolo">{Data} - {Titolo}</span>{Testo}</div>' +
    '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'eventoToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[4],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'eventi',
                        slide:'right'
                    });
                }
            }]
        })];


        BT.views.dettaglioEvento.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettaglioevento', BT.views.dettaglioEvento);


BT.views.dettaglioPOI = Ext.extend(Ext.Panel, {
    id: 'dettaglioPOI',
    title: "dettaglioPOI",
    scroll: "vertical",
    cls: 'scheda_base',
    tpl: new Ext.Template(
    '<tpl for=".">' +
    '<img src="' + baseUrl + 'assets/POI/{FotoTestata}" align="left" style="margin-right:10px"><div class="contenuto"><span class="titolo">{Titolo}</span>{Testo}</div>' +
    '</tpl>'
    ),

    initComponent: function () {
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'dettaglioPOIToolbar',
            dock: 'top',
            title: 'Toolbar',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[4],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoPOI',
                        slide:'right'
                    });
                }
            }]
        })];


        BT.views.dettaglioPOI.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-dettaglioPOI', BT.views.dettaglioPOI);


BT.views.mappaStruttura = Ext.extend(Ext.Panel, {
    id: 'mappaRistorante',
    title: "mappaRistorante",
    cls: 'scheda_base',
    layout: 'fit',    

    initComponent: function () {
        this.items = [new Ext.Map({
            itemId: 'mappaStruttura',
            fullscreen: true,
            mapOptions: {
                center: posizione_iniziale,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                activate: function () {
                    if (this.marker) {
                        this.update(this.marker.position);
                    }
                },
                resize: function () {
                    if (this.marker) {
                        this.update(this.marker.position);
                    }
                }
            }
        })];
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaStrutturaToolbar',
            dock: 'top',
            title: 'Ristorante',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'dettaglioStruttura',
                        slide: 'right',
                        tipo:'elenco'
                    });
                }
            }]
        })];

        BT.views.mappaStruttura.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mappastruttura', BT.views.mappaStruttura);


BT.views.infopoint = Ext.extend(Ext.Panel, {
    id: 'infopoint',
	title: "infopoint",
	scroll: "vertical",
	cls:'scheda_base',
    layout: {
        type: 'vbox',
        pack: 'top',
        align: 'center'
    },

    initComponent: function () {
        this.items=[
        {
            html: '<div style=\'text-align:center\'><img border=\'0\' src=\'infopoint.png\' width=\'320\' height=\'170\'>' +
            '<p>INFOPOINT BRESCIATOURISM<br/>INFOPOINT "CITY CENTER"<br/>Via Trieste 1 (angolo Piazza Duomo), 25121 - Brescia</p>' +
            '<h1><a href=\'tel:+39 030 2400357\'>Tel. +39 030 2400357</a> - <a href=\'tel:+39 030 3774020\'>Fax. +39 030 3774020</a></h1>' +
            '<a href=\'mailto:infopoint@bresciatourism.it\'>infopoint@bresciatourism.it</a><hr/>' +
            '<p>INFOPOINT 2 "TRAIN STATION"<br/>Piazzale Stazione 25122 Brescia</p>' +
            '<h1><a href=\'tel:+39 030 8378559\'>Tel. +39 030 8378559</a></h1>' +
            '<a href=\'mailto:infopoint@bresciatourism.it\'>infopointstazione@bresciatourism.it</a><hr/>' +
            '</div>'
        },
        {
		    xtype: 'button',
            itemId:'btnMappaInfopoint',
		    align: 'center',
            text: Testi[3],
            margin: '10 0 10 0',
            width : 200,
            handler: function(){
                Ext.dispatch({
                    controller: 'Bresciatourism',
                    action: 'mappaInfopoint',
                    slide:'left'
                });
            },
        }];

        BT.views.infopoint.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-infopoint', BT.views.infopoint);


BT.views.ricercaStruttura = Ext.extend(Ext.form.FormPanel, {

    initComponent: function () {

        this.storeAree = new Ext.data.JsonStore({
            storeId: 'storeAree',
            itemId: 'storeAree',
            model: 'area',
            autoLoad: false,
            fields: [
                'ID',
                'Area'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'aree.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.storeComuni = new Ext.data.JsonStore({
            storeId: 'storeComuni',
            itemId: 'storeComuni',
            model: 'comune',
            autoLoad: false,
            fields: [
                'ID',
                'id_Area',
                'Comune'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'comuni.ashx',
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });


        this.storeTipologieStruttura = new Ext.data.JsonStore({
            storeId: 'storeTipologieStruttura',
            model: 'tipologiaStruttura',
            autoLoad: false,
            fields: [
                'ID',
                'Tipologia'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'tipologieStruttura.ashx',
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });



        Ext.apply(this, {
            centered: true,
            modal: true,
            scroll: "vertical",
            hideOnMaskTap: false,
            baseCls: 'scheda_base',
            padding: 5,
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            items: [
            {
                xtype: 'button',
                name: 'vicinoame',
                text: '',
                cls: 'btn_vicinoame',
                pressedCls: 'btn_vicinoame_on',
                width: 320,
                align: 'center',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'elencoStruttureAroundMe',
                        slide: 'left'
                    });
                }
            },
            {
                xtype: 'selectfield',
                name: 'Area',
                itemId: 'Area',
                label: Testi[7],
                displayField: 'Area',
                valueField: 'ID',
                width: 320,
                store: this.storeAree
            },
            {
                xtype: 'selectfield',
                name: 'Comune',
                itemId: 'Comune',
                label: Testi[8],
                displayField: 'Comune',
                valueField: 'ID',
                width: 320,
                store: this.storeComuni
            },
            {
                xtype: 'selectfield',
                name: 'Tipologia',
                itemId: 'Tipologia',
                label: Testi[9],
                store: this.storeTipologieStruttura,
                displayField: 'Tipologia',
                valueField: 'ID',
                id: 'selectTipologia',
                width: 320
            },
            {
                xtype: 'button',
                name: 'Ricerca',
                itemId: 'Ricerca',
                text: '',
                width: 175,
                cls: 'btn_ricerca',
                pressedCls: 'btn_ricerca_on'
            }
            ]
        });

        BT.views.ricercaStruttura.superclass.initComponent.call(this, arguments);

        this.items.get(1).on({
            change: this.onAreaChange,
            scope: this
        });

        this.items.get(2).on({
            change: this.onComuneChange,
            scope: this
        });

    },

    onAreaChange: function (selectField, value) {
        this.storeComuni.clearFilter();
        this.storeComuni.filter('id_Area', value);
        this.storeComuni.load();
    },

    onComuneChange: function (selectField, value) {
        this.storeTipologieStruttura.proxy.url = baseUrl + 'tipologieStruttura.ashx?area=' + this.items.get(1).value + '&comune=' + this.items.get(2).value;
        this.storeTipologieStruttura.load();
    }


});


Ext.reg('bt-ricercastruttura', BT.views.ricercaStruttura);


BT.views.UNESCO = Ext.extend(Ext.Panel, {
    id: 'pgUNESCO',
    title: "pgUNESCO",
    scroll: false,
    layout: "fit",

    initComponent: function () {

        this.storeUNESCO = new Ext.data.JsonStore({
            model: 'UNESCO',
            autoLoad: true,
            fields: [
                'ID',
                'Titolo',
                'Testo',
                'Miniatura',
                'Immagine',
                'Lat',
                'Lon'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'UNESCO.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.dockedItems = [new Ext.Toolbar({
            dock: 'top',
            title: 'UNESCO',
            cls: 'toolbar',
            ui: 'gray'
        })];

        this.list = new Ext.List({
            id: 'listaUNESCO ',
            cls: 'scheda_base',
            scroll: 'vertical',
            itemTpl: new Ext.Template(
                '<tpl for=".">' +
                '<div class="evento"><img src="' + baseUrl + 'assets/UNESCO/{Miniatura}" class="img_evento">' +
                '</img><span class="titolo">{Titolo}</span><br><span class="testo">{[fm.ellipsis(removeHTMLTags(values.Testo),80,true)]}</span></div>' +
                '</tpl>'
            ),
            store: this.storeUNESCO
        })

        this.items = [this.list];


        BT.views.UNESCO.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-unesco', BT.views.UNESCO);


BT.views.Album = Ext.extend(Ext.Panel, {
    id: 'Album',
    title: "Album",
    layout: 'fit',

    initComponent: function () {

        this.storeAlbum = new Ext.data.JsonStore({
            storeId: 'storeAlbum',
            model: 'Album',
            autoLoad: true,
            fields: [
                    'ID',
                    'Nome'
                ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'album.ashx?lingua=' + Lingua,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.list = new Ext.List({
            cls: 'scheda_base',
            scroll: "vertical",
            itemTpl: new Ext.Template(
                //'<tpl for="."><div class="struttura"><span class="titolo_album">{Nome}</span></div></tpl>'
                '<tpl for="."><div class="album">{Nome}</div></tpl>'
            ),
            store: this.storeAlbum
        });

        this.items = [this.list];

         this.dockedItems = [new Ext.Toolbar({
            dock: 'top',
            title: 'Gallery',
            cls: 'toolbar',
            ui: 'gray'
        })];

        BT.views.Album.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-album', BT.views.Album);


BT.views.mappaUNESCO = Ext.extend(Ext.Panel, {
    id: 'mappaUNESCO',
    title: "mappaUNESCO",
    cls: 'scheda_base',
    layout:"fit",

    initComponent: function () {
        this.items = [new Ext.Map({
            itemId: 'mappaUNESCO',
            fullscreen:true,
            mapOptions: {
                center: posizione_infopoint,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            }
        })];
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaUNESCOToolbar',
            dock: 'top',
            title: 'Infopoint',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'dettaglioUNESCO',
                        slide:'right'
                    });
                }
            }]
        })];

        BT.views.mappaUNESCO.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mappaunesco', BT.views.mappaUNESCO);


BT.views.mappaInfopoint = Ext.extend(Ext.Panel, {
    id: 'mappaInfopoint',
    title: 'mappaInfopoint',
    cls: 'scheda_base',
    layout: 'fit',

    initComponent: function () {
        this.items = [new Ext.Map({
            itemId: 'mappaInfopoint',
            fullscreen:true,
            mapOptions: {
                center: posizione_infopoint,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            }
        })];
        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaInfopointToolbar',
            dock: 'top',
            title: 'Infopoint',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function(){
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'infopoint',
                        slide:'right'
                    });
                }
            }]
        })];

        BT.views.mappaInfopoint.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mappainfopoint', BT.views.mappaInfopoint);


BT.views.mappaStruttureAroundMe = Ext.extend(Ext.Panel, {
    id: 'struttureAroundMe',
    title: "struttureAroundMe",
    cls: 'scheda_base',
    layout: "fit",

    initComponent: function () {

        this.storeStrutture = new Ext.data.JsonStore({
            model: 'struttura',
            sorters: 'Nome',
            itemId: 'storeStrutture',
            storeId: 'storeStrutture',
            autoLoad: false,

            fields: [
                'ID',
                'id_Area',
                'id_Comune',
                'id_Tipologia',
                'Nome',
                'Comune',
                'Titolo',
                'Descrizione',
                'Immagine',
                'Stelle',
                'Lat',
                'Lon',
                'Indirizzo',
                'Cap',
                'Telefono',
                'Email',
                'Url'
            ],
            proxy: {
                type: 'scripttag',
                url: baseUrl + 'strutture.ashx?lingua=' + Lingua + '&lat=' + currentPosition.latitude + '&lon=' + currentPosition.longitude,
                method: 'GET',
                reader: {
                    type: 'json',
                    root: 'results',
                    idProperty: 'ID'
                }
            }
        });

        this.items = [new Ext.Map({
            itemId: 'mappaStruttureAroundMe',
            fullscreen: true,
            mapOptions: {
                center: posizione_iniziale,
                zoom: 14,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            }
        })];

        this.dockedItems = [new Ext.Toolbar({
            itemId: 'mappaStruttureToolbar',
            dock: 'top',
            title: 'Strutture',
            cls: 'toolbar',
            ui: 'gray',
            items: [{
                itemId: 'backButton',
                text: Testi[5],
                ui: 'back',
                handler: function () {
                    Ext.dispatch({
                        controller: 'Bresciatourism',
                        action: 'cercaStrutture',
                        slide: 'right'
                    });
                }
            }]
        })];

        BT.views.mappaStruttureAroundMe.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('bt-mappastrutturearoundme', BT.views.mappaStruttureAroundMe);



// TESTI

var Testi=new Array();
Testi[0]="The Map";
Testi[1]="Phone";
Testi[2]="Stars";
Testi[3]="Show Map";
Testi[4]="List";
Testi[5]="Back";
Testi[6]="Map";
Testi[7]="Area";
Testi[8]="Municipality";
Testi[9]="Type";
Testi[10]="Category";
Testi[11]="Near Me";
Testi[12]="";
Testi[13]="";
Testi[14]="";
Testi[15]="";
Testi[16]="";
Testi[17]="";
Testi[18]="";
Testi[19]="";

Testi[20]="<br />&nbsp;&nbsp;No restaurants found using the specified parameters.";
Testi[21]="<br />&nbsp;&nbsp;No hotels found using the specified parameters.";
Testi[22]="<br />&nbsp;&nbsp;No POI found using the specified parameters";


var Lingua="EN";


// TESTI

var Testi=new Array();
Testi[0]="La Mappa";
Testi[1]="Telefono";
Testi[2]="Le Stelle";
Testi[3]="Visualizza Mappa";
Testi[4]="Elenco";
Testi[5]="Indietro";
Testi[6]="Mappa";
Testi[7]="Area";
Testi[8]="Comune";
Testi[9]="Tipologia";
Testi[10]="Categoria";
Testi[11]="Vicino a Me";
Testi[12]="";
Testi[13]="";
Testi[14]="";
Testi[15]="";
Testi[16]="";
Testi[17]="";
Testi[18]="";
Testi[19]="";

Testi[20]="<br />&nbsp;&nbsp;Nessun ristorante trovato usando i parametri specificati";
Testi[21]="<br />&nbsp;&nbsp;Nessuna struttura trovata usando i parametri specificati";
Testi[22]="<br />&nbsp;&nbsp;Nessun POI trovato usando i parametri specificati";


var Lingua="IT";

//Ext.override(Ext.picker,{
// 'doneButton':'Seleziona',
// 'cancelButton':'Annulla'
// 
//})


// TESTI

var Testi=new Array();
Testi[0]="Karte";
Testi[1]="Telefon";
Testi[2]="die Sterne";
Testi[3]="Karte anzeigen";
Testi[4]="Liste";
Testi[5]="Zur&uuml;ck";
Testi[6]="Karte";
Testi[7]="Gebiet";
Testi[8]="Gemeinde";
Testi[9]="Typologie";
Testi[10]="Kategorie";
Testi[11]="In Meiner N&auml;he";
Testi[12]="";
Testi[13]="";
Testi[14]="";
Testi[15]="";
Testi[16]="";
Testi[17]="";
Testi[18]="";
Testi[19]="";

Testi[20]="<br />&nbsp;&nbsp;Keine Restaurants gefunden mit den angegebenen parametern.";
Testi[21]="<br />&nbsp;&nbsp;Keine Hotels gefunden mit den angegebenen Parametern.";
Testi[22]="<br />&nbsp;&nbsp;Keine POI gefunden mit den angegebenen Parametern.";


var Lingua="DE";
