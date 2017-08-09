

















function init() {

map = new OpenLayers.Map({div:"map"});
  var osm = new OpenLayers.Layer.OSM("OSM");



map.addLayers([osm]);

    var lonLat = new OpenLayers.LonLat(7.684937, 45.070611)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );


    var zoom=16;
 
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
 
    

    var marker = new OpenLayers.Marker(lonLat);




  
    markers.addMarker(marker);
     marker.events.register("mousedown", marker, function(evt) {
      alert("sasasa");
                    var popup = new OpenLayers.Popup.AnchoredBubble("zasasm",
                                       new OpenLayers.LonLat(7.684937, 45.070611),
                                       new OpenLayers.Size(200,200),
                                       "sasa",
                                       null,true,null);

                    map.addPopup(popup);
                    popup.show();

                    OpenLayers.Event.stop(evt)

                    } );

   
 //feature = new OpenLayers.Feature(osm,new OpenLayers.LonLat(7.684937, 45.070611));
 
 
                                             
     
        
        function mousedown(evt) {
                var popup = feature.createPopup(true);
                console.log(evt);
                popup.setContentHTML("<div style='background-color:red; width:150;height:100'><a href='http://www.somethingconstructive.net' target='_blank'>click me</a></div>");
                popup.setBackgroundColor("yellow");
                popup.setOpacity(0.7);
               markers.map.addPopup(popup);
               
           
            OpenLayers.Event.stop(evt);
        }        


                                                             
        
        
       
    


map.setCenter (lonLat, zoom);
}










(function () {
	fgLoader.loadApp('app.sacal');
	fgLoader.start();
})();


				
	



define([
        "trim.it/fg/router",
        "modelsLoader",
      	"viewsLoader",
      	"trim.it/fg/utils/localstorage",
      	"js!jsAppLib/Regola.Mapping.js!order",
      	"js!jsAppLib/RegolaCanvas.js!order",
      	"js!jsAppLib/jsrender-1.0pre.min.js!order"
        ],
        function (router, models, views, ls, nouse1, nouse2, nouse3, nouse4) {
        	var extraRoutes = [
								{
									"#cerca" : {
										handler: function (type, match, ui, p, evt) {
											models.poi.trigger("getCatFromLS","categorieSelezionate");
											models.poi.trigger("loadCategories");
										},
										events: "bs"
									}
								},
								{
									"#vicino" : {
										handler: function () {
											models.poi.trigger("getCatFromLS", "categorieSelezionate");
											models.poi.trigger("getPrefFromLS", "poiPreferiti");
											models.poi.trigger("loadPoi");
										},
										events: "bs"
									}
								},
								{
									"#vicino" : {
										handler: function () {
											views.vicino.trigger("clearData");
										},
										events: "bh"
									}
								},
								{
									"#dettaglioPoi" : {
										handler: function (type, match, ui, p, evt) {
											if ( ui.nextPage.attr("id") != "mappa" && ui.nextPage.attr("id") != "prodotti") {
												views.dettaglioPoi.trigger("clearData");
											}
										},
										events: "bh"
									}
								},
								{
									"#dettaglioItinerario" : {
										handler: function (type, match, ui, p, evt) {
											if ( ui.nextPage.attr("id") != "mappa" && ui.nextPage.attr("id") != "dettaglioPoi") {
												views.dettaglioItinerario.trigger("clearData");
											}
										},
										events: "bh"
									}
								},
								{
									"#itinerari" : {
										handler: function (type, match, ui, p, evt) {
											models.itinerari.trigger("loadItinerari");
											
										},
										events: "bs"
									}
								},
								{
									"#imprese" : {
										handler: function (type, match, ui, p, evt) {
											models.imprese.trigger("loadImprese");
										},
										events: "bs"
									}
								},
								{
									"#preferiti" : {
										handler: function (type, match, ui, p, evt) {
											if ( ui.prevPage.attr("id") != "condividi") {
												models.poi.trigger("getPrefFromLS", "poiPreferiti");
												views.preferiti.trigger("visualizzaPreferiti");
											}
										},
										events: "bs"
									}
								},
								{
									"#preferiti" : {
										handler: function (type, match, ui, p, evt) {
											if ( ui.prevPage.attr("id") != "condividi") {
												views.preferiti.trigger("clearData");
											}
										},
										events: "bh"
									}
								},
								{
									"#news" : {
										handler: function () {
											models.poi.trigger("getListChannel");
										},
										events: "bs"
									}
								},
								{
									"#inizio" : {
										handler: function () {
											views.inizio.trigger("showInizio");
										},
										events: "bs"
									}
								}
        	                   ];
		
			router.addExtraRoutes(extraRoutes);

			models.poi.on("listaCanali", function (listC) {
				models.news.trigger("load", listC);
			});			

			models.poi.on("loadCategoriesCompleted", function (listCat) {
				views.cerca.trigger("populateCategories", listCat);
			});

			models.poi.on("loadChannelPreferiti", function (channelPreferiti) {
				models.news.trigger("load", channelPreferiti);
			}); 
			
			models.poi.on("loadPoiCompleted", function (listPoi) {
				var activePage = $.mobile.activePage.attr('id');
				views[activePage].trigger("populatePoiList", listPoi);
				if(!_.isUndefined(models[activePage]))
					models[activePage].trigger("loadedPoi", listPoi);
				//views[activePage].trigger("populateListPreferiti", listPoi);
			});

			models.poi.on("updatePoiCompleted", function (listPoi) {
				views.vicino.trigger("updatePoiList", listPoi);
			});
			
			models.itinerari.on("loadItinerariCompleted", function (listItinerari) {
				views.itinerari.trigger("populateItinerari", listItinerari);
			});
			
			models.imprese.on("loadImpreseCompleted", function (listImprese) {
				views.imprese.trigger("populateImprese", listImprese);
			});
			
			views.vicino.on("getPoiList", function (start) {
				models.poi.trigger("updatePoi",start);
			});

			views.imprese.on("getEccellenzaList", function (start) {
				models.imprese.trigger("updateEccellenza",start);
			});

			models.imprese.on("updateEccCompleted", function (listEcc) {
				views.imprese.trigger("updateEccList", listEcc);
			});

			views.condividi.on("showPoisOnMap", function (listPois) {
				views.mappa.trigger("showMappa", listPois);
			});

			views.vicino.on("showPoisOnMap", function (listPois) {
				views.mappa.trigger("showListPoisMappa", listPois);
			});

			views.dettaglioItinerario.on("showPoisOnMap", function (listPois) {
				views.mappa.trigger("showMappa", listPois);
			});

			views.vicino.on("goToPoiMap", function (lat, lon) {
				views.mappa.trigger("showPoiMappa",lat, lon);
			});

			views.dettaglioItinerario.on("goToPoiMap", function (lat, lon) {
				views.mappa.trigger("showPoiMappa",lat, lon);
			});

			views.dettaglioPoi.on("goToPoiMap", function (lat, lon) {
				views.mappa.trigger("showPoiMappa",lat, lon);
			});
			
			views.preferiti.on("loadPoiPreferiti", function (preferiti) {
				models.preferiti.trigger("loadPoiPreferiti",preferiti);
			});

			models.preferiti.on("loadPoiPreferitiCompleted", function (listaPoiPreferiti) {
				views.preferiti.trigger("populateListPreferiti", listaPoiPreferiti);
			});

			views.preferiti.on("datiDaCondividere", function (dati, listPoi) {
				views.condividi.trigger("populateCondividi", dati, listPoi);
			});

			views.preferiti.on("goToPoiMap", function (lat, lon) {
				views.mappa.trigger("showPoiMappa",lat, lon);
			});

			views.vicino.on("goToPoiDetail", function (idPoi, backView) {
				$.mobile.changePage("#dettaglioPoi");
				models.poi.trigger("loadDettaglioPoi", idPoi, backView);
			});
			
			views.imprese.on("goToPoiDetail", function (idPoi, backView) {
				$.mobile.changePage("#dettaglioPoi");
				models.poi.trigger("loadDettaglioPoi", idPoi, backView);
			});
			
			views.preferiti.on("goToPoiDetail", function (idPoi, backView) {
				$.mobile.changePage("#dettaglioPoi");
				models.poi.trigger("loadDettaglioPoi", idPoi, backView);
			});
			
			views.dettaglioItinerario.on("goToPoiDetail", function (idPoi, backView) {
				$.mobile.changePage("#dettaglioPoi");
				models.poi.trigger("loadDettaglioPoi", idPoi, backView);
			});

			models.poi.on("loadDettaglioPoiCompleted", function (dettaglio, backView) {
				views.dettaglioPoi.trigger("populateDettaglioPoi", dettaglio, backView);
			});
			
			views.itinerari.on("goToItinerarioDetail", function (idItinerario) {
				$.mobile.changePage("#dettaglioItinerario");
				models.itinerari.trigger("loadDetailItinerario", idItinerario);
			});
			
			models.itinerari.on("loadDetailItinerarioCompleted", function (dettaglio, poiList) {
				views.dettaglioItinerario.trigger("populateDetailItinerario", dettaglio, poiList);
			});
			
			views.vicino.on("savePreferitiToLS", function (id) {
				models.poi.trigger("savePrefToLS",id);
			});

			views.dettaglioPoi.on("savePreferitiToLS", function (id) {
				models.poi.trigger("savePrefToLS",id);
			});

			views.dettaglioItinerario.on("savePreferitiToLS", function (id) {
				models.poi.trigger("savePrefToLS",id);
			});

			views.preferiti.on("savePreferitiToLS", function (id) {
				models.poi.trigger("savePrefToLS",id);
			});

			views.preferiti.on("saveChannelsToLS", function (data) {
				models.preferiti.trigger("saveChannelsPref",data);
			});
			
			// views.dettaglioPoi.on("loadProdotti", function (id, backView) {
			// 	models.poi.trigger("loadListaProdottiPoi",id, backView);
			// });
			
			views.dettaglioPoi.on("loadProdotti", function (listaProdotti, backView) {
				$.mobile.changePage("#prodotti");
				views.prodotti.trigger("populateProdotti", listaProdotti, backView);
			});
			
			

			views.cerca.on("saveCatToLocalStorage", function (cat) {
				models.poi.trigger("saveCatToLS",cat);
			});
			
			views.vicino.on("getCatFromLocalStorage",function(cat){
				models.poi.trigger("getCatFromLS");
			});
			
			models.poi.on("prefFromLS", function (pref) {
				views.vicino.trigger("preferitiFromLS",pref);
				views.dettaglioPoi.trigger("preferitiFromLS",pref);
				views.preferiti.trigger("preferitiFromLS",pref);
				views.dettaglioItinerario.trigger("preferitiFromLS",pref);
			});

			models.poi.on("catFromLS", function (cat) {
				views.vicino.trigger("catFromLS",cat);
				views.cerca.trigger("catFromLS",cat);
			});
			
			models.configuration.on("postSuccess", function (data, listChannels) {
				var activePage = $.mobile.activePage.attr('id');
				views[activePage].trigger("success", data);
				models.poi.trigger("updateChannels", listChannels); 
			});
			
			views.vicino.on("postChannel", function (data) {
				models.configuration.trigger("doPostChannel",data);
			});
			
			views.dettaglioPoi.on("postChannel", function (data) {
				models.configuration.trigger("doPostChannel",data);
			});

			views.preferiti.on("postChannel", function (data) {
				models.configuration.trigger("doPostChannel",data);
			});

			views.dettaglioItinerario.on("postChannel", function (data) {
				models.configuration.trigger("doPostChannel",data);
			});

			models.poi.on("loadChannelPoi", function (listPoi) {
				models.configuration.trigger("load","loadChannelPoiCompleted");
			});

			models.configuration.on("loadChannelPoiCompleted", function (canali) {
				models.poi.trigger("loadChannelPoiCompleted", canali);
			});

			models.poi.on("updateChannelPoi", function (listPoi) {
				models.configuration.trigger("load","updateChannelPoiCompleted");
			});

			models.configuration.on("updateChannelPoiCompleted", function (canali) {
				models.poi.trigger("updateChannelPoiCompleted", canali);
			});
			
			return router;
		});


        define([
        "trim.it/fg/utils/logger",
        "jquery",
        "trim.it/fg/views",
        "views/vicino",
        "views/itinerari",
        "views/imprese",
        "views/preferiti",
        "views/dettaglioPoi",
        "views/dettaglioItinerario",
        "views/cerca",
        "views/condividi",
        "views/inizio",
        "views/mappa",
        "views/prodotti",
        "trim.it/fg/views/newsScroller"
        ],
        function (logger, $, baseView, vicino, itinerari, imprese, preferiti, dettaglioPoi, dettaglioItinerario, cerca, condividi, inizio, mappa, prodotti, NewsScroller) {
			return baseView.registerViews({
				"vicino" : vicino,
				"itinerari" : itinerari,
				"imprese" : imprese,
				"preferiti" : preferiti,
				"dettaglioPoi" : dettaglioPoi,
                                "prodotti" : prodotti,
				"dettaglioItinerario" : dettaglioItinerario,
				"cerca" : cerca,
				"condividi" : condividi,
				"inizio" : inizio,
				"mappa" : mappa,
				"newsScroller": new NewsScroller({
					el : "wrapper_news"
				})
			},{
                                "vicino" : "vicino",
                                "itinerari" : "itinerari",
                                "imprese" : "imprese",
                                "preferiti" : "preferiti",
                                "dettaglioPoi" : "dettaglioPoi",
                                "prodotti" : "prodotti",
                                "dettaglioItinerario" : "dettaglioItinerario",
                                "cerca" : "cerca",
                                "condividi" : "condividi",
                                "inizio" : "inizio",
                                "mappa" : "mappa",      
                        });
	});

define([
        "trim.it/fg/configuration",
         "views/templates"
        ],
        
        function(configuration, tmpl) {
			var config = configuration.registerJson();
			_.each(config.buttonbar.pages, function (l) {
				l.label = tmpl.localize(l.label);
			});	
			return config;
		});


define([
        "trim.it/fg/models",
        "models/poi",
        "models/itinerari",
        "models/imprese",
        "models/preferiti"
        ],
        function (models, poi, itinerari, imprese, preferiti) {
	
			var myModels = {
					"poi": poi,
					"itinerari": itinerari,
					"imprese": imprese,
					"preferiti": preferiti
			}
			
			return _.extend(myModels,models);
});


define(["text!json/messages_en.json",
        "text!json/messages_it.json"], function (en, it) {
	return {
		"en": JSON.parse(en),
		"it": JSON.parse(it)
	};
});

define(["views/templates"], function (tmpl) {	
	
	var showErrorAlert = _.debounce(function() {
		alert(tmpl.localize("msgNoPosition"));
	}, 1000*60*15, true);
	
	function requestLocation() {
		var deferred = $.Deferred();
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		
		function onSuccess(position) {
			deferred.resolve(position.coords);
		}
		
		function onError(error) {
			deferred.reject();
			showErrorAlert();
		}
		return deferred.promise();
	}

	return {
			getCoords : function(){
				var deferred = $.Deferred();
				$.when(requestLocation()).then(
						function (coordinates) {
							deferred.resolve(coordinates);
						},
						function () {
							deferred.resolve({
								latitude : 38.909869,
								longitude : 16.242078
							});
						}
				);
				return deferred.promise();
			}
	};
});

define([
	"text!json/sacalservice.json"
	], function (config) {	
	return JSON.parse(config);
});

define([ 
        "trim.it/fg/utils/logger",
        "libs/backbone.events",
        "trim.it/fg/models/remoteCall",
        "utils/sacalservice",
        "trim.it/fg/plugins/deviceTokenFromUA",
      	"trim.it/fg/utils/localstorage",
      	"trim.it/fg/utils/utils"
        ],
        
        function (logger, Events, remoteCall, sacalservice, deviceTokenFromUA, ls, utils ) {
			var imprese = _.extend({}, Events),
				userLang = utils.getCurrentLanguage();
			
			imprese.on("loadImprese", function() {
				var oldTimestamp = ls.getFromLocalStorage("timestampImprese");
				
				if ( !_.isObject(oldTimestamp) && (Date.now() - oldTimestamp) <= 1000*60*60*24) {
					imprese.trigger("loadImpreseCompleted", ls.getFromLocalStorage("listImprese"));
				} else {
					var dt = deviceTokenFromUA.getDeviceToken();
					remoteCall.ajaxCall(imprese, {
					   	dataType: 'json',
					   	url: sacalservice.url + "poi/?eccellenza=true&dt="+dt+"&lang="+userLang.substring(0,2),
		                success: function (data) {
	            			ls.setIntoLocalStorage("timestampImprese", Date.now());
	            			ls.setIntoLocalStorage("listImprese", data);
							imprese.trigger("loadImpreseCompleted", data);
						}
					 });
				}	
			});

			imprese.on("updateEccellenza", function(start) {
				var dt = deviceTokenFromUA.getDeviceToken();
				remoteCall.ajaxCall(imprese, {
                    dataType: 'json',
			 	  	url: sacalservice.url + "poi/?eccellenza=true&dt="+dt+"&lang="+userLang.substring(0,2)+"&start="+start,
              	  	success: function (data) {
						var updateList = ls.getFromLocalStorage("listImprese");
						ls.setIntoLocalStorage("timestampImprese", Date.now());
            			ls.setIntoLocalStorage("listImprese", _.union(updateList, data));
						imprese.trigger("updateEccCompleted", data);
					}
                });
				
			});

			
		return imprese;
});

define([ 
        "trim.it/fg/utils/logger",
        "trim.it/fg/plugins/deviceTokenFromUA",
        "trim.it/fg/utils/localstorage",
        "libs/backbone.events",
        "trim.it/fg/models/remoteCall",
         "trim.it/fg/utils/fgservice",
        "utils/sacalservice",
        "utils/geoLocation",
        "trim.it/fg/utils/utils"
         ],
         
		function (logger, deviceTokenFromUA, ls, Events, remoteCall, fgservice, sacalservice, geoLocation, utils) {
			var poi = _.extend({}, Events),
			listPoi,
			updateListPoi,
			channels,
			userLang = utils.getCurrentLanguage();

			poi.on("updateChannels", function (channel) {
				channels = channel;
			});

			poi.on("getListChannel", function () {
				var channelPreferiti = ls.getFromLocalStorage("channelPreferiti");
				poi.trigger("loadChannelPreferiti",channelPreferiti);
				//poi.trigger("loadPoi");
			});

			poi.on("loadPoi", function() {
				var dt = deviceTokenFromUA.getDeviceToken(),
					categorie = ls.getFromLocalStorage("categorieSelezionate");
				
				geoLocation.getCoords().always(function(coords) {
					remoteCall.ajaxCall(poi, {
	                    dataType: 'json',
				 	  	url: sacalservice.url + "poi?lang="+userLang.substring(0,2)+"&dt="+dt+"&start=0&lat="+coords.latitude+"&lon="+coords.longitude+"&sottocategorie="+_.toArray(categorie).join(","),
	              	  	success: function (data) {
							listPoi = data;
							poi.trigger("loadPoiCompleted", listPoi);
						}
	                });
				});
			});
			
			poi.on("loadChannelPoiCompleted", function (canali) {
				channels = canali;
				_.each(listPoi, function (p) {
					p["infoCanale"] = _.find(canali, function(c){if(p.id === c.id){return c}});
				});
				poi.trigger("loadPoiCompleted", listPoi);	
			});

			poi.on("updatePoi", function(start) {
				var dt = deviceTokenFromUA.getDeviceToken(),
					categorie = ls.getFromLocalStorage("categorieSelezionate");
				
				geoLocation.getCoords().always(function(coords) {
					remoteCall.ajaxCall(poi, {
	                    dataType: 'json',
				 	  	url: sacalservice.url + "poi?lang="+userLang.substring(0,2)+"&dt="+dt+"&start="+start+"&lat="+coords.latitude+"&lon="+coords.longitude+"&sottocategorie="+_.toArray(categorie).join(","),
	              	  	success: function (data) {
							updateListPoi = data;
							poi.trigger("updatePoiCompleted", data);
						}
	                });
				 });
				
			});

			poi.on("updateChannelPoiCompleted", function (canali) {
				channels = canali;
				_.each(updateListPoi, function (p) {
					p["infoCanale"] = _.find(canali, function(c){if(p.id === c.id){return c}});
				});
				poi.trigger("updatePoiCompleted", updateListPoi);	
			});
		
			poi.on("loadCategories", function() {
				var oldTimestamp = ls.getFromLocalStorage("timestampCategorie");
				
				if ( !_.isObject(oldTimestamp) && (Date.now() - oldTimestamp) <= 1000*60*60*24) {
					poi.trigger("loadCategoriesCompleted", ls.getFromLocalStorage("listCategorie"));
				} else {
					remoteCall.ajaxCall(poi, {
	                    dataType: 'json',
				 	  	url: sacalservice.url + "category?lang="+userLang.substring(0,2),
	              	  	success: function (data) {
	              	  		ls.setIntoLocalStorage("timestampCategorie", Date.now());
	              	  		ls.setIntoLocalStorage("listCategorie", data);
							poi.trigger("loadCategoriesCompleted", data);
						}
	                });
				}
			});

			poi.on("savePrefToLS", function (p) {
				ls.setIntoLocalStorage("poiPreferiti",p);
			});

			poi.on("getPrefFromLS", function (p) {
				var preferiti = ls.getFromLocalStorage(p);
				poi.trigger("prefFromLS",preferiti);
			});
			
			poi.on("saveCatToLS", function (cat) {
				ls.setIntoLocalStorage("categorieSelezionate",cat);
			});
			
			poi.on("getCatFromLS", function (cat) {
				var categorie = ls.getFromLocalStorage(cat);
				poi.trigger("catFromLS",categorie);
			});
			
			poi.on("loadDettaglioPoi", function(idPoi, backView) {
				var dt = deviceTokenFromUA.getDeviceToken();
				geoLocation.getCoords().always(function(coords) {
					remoteCall.ajaxCall(poi, {
					   	dataType: 'json',
					   	url: sacalservice.url + "poi/"+idPoi+"?lang="+userLang.substring(0,2)+"&dt="+dt+"&lat="+coords.latitude+"&lon="+coords.longitude,
	                    success: function (data) {
							poi.trigger("loadDettaglioPoiCompleted", data, backView);
						}
					});
				});

			});
			
			return poi;
		});


define([ 
        "trim.it/fg/utils/logger",
         "libs/backbone.events",
         "trim.it/fg/models/remoteCall",
         "utils/sacalservice",
         "trim.it/fg/plugins/deviceTokenFromUA",
         "utils/geoLocation",
         "trim.it/fg/utils/localstorage",
         "trim.it/fg/utils/utils"
         ],
        
        function (logger, Events, remoteCall, sacalservice, deviceTokenFromUA, geoLocation, ls, utils ) {
		var itinerari = _.extend({}, Events),
			userLang = utils.getCurrentLanguage();

		itinerari.on("loadItinerari", function () {
			var oldTimestamp = ls.getFromLocalStorage("timestampItinerari");
			
			if ( !_.isObject(oldTimestamp) && (Date.now() - oldTimestamp) <= 1000*60*60*24) {
				itinerari.trigger("loadItinerariCompleted", ls.getFromLocalStorage("listItinerari"));
			} else {
				remoteCall.ajaxCall(itinerari, {
				   	dataType: 'json',
				   	url: sacalservice.url + "itinerari?lang="+userLang.substring(0,2),
	                success: function (data) {
	        			ls.setIntoLocalStorage("timestampItinerari", Date.now());
	        			ls.setIntoLocalStorage("listItinerari", data);
						itinerari.trigger("loadItinerariCompleted", data);
					}
				});
			}
		});
		
		itinerari.on("loadDetailItinerario", function(obj_it) {
			var dt = deviceTokenFromUA.getDeviceToken();
			geoLocation.getCoords().always(function(coords) {
				remoteCall.ajaxCall(itinerari, {
				   	dataType: 'json',
				   	url: sacalservice.url + "itinerari/"+obj_it.id+"?lat="+coords.latitude+"&lon="+coords.longitude+"&lang="+userLang.substring(0,2)+"&dt="+dt,
	                success: function (data) {
						itinerari.trigger("loadDetailItinerarioCompleted", obj_it, data);
					}
				});
			});
		});
		
		return itinerari;
});

define([ 
        "trim.it/fg/utils/logger",
         "libs/backbone.events",
         "trim.it/fg/models/remoteCall",
         "utils/sacalservice",
         "trim.it/fg/plugins/deviceTokenFromUA",
         "utils/geoLocation",
         "trim.it/fg/utils/localstorage",
         "trim.it/fg/utils/utils"
         ],
        
        function (logger, Events, remoteCall, sacalservice, deviceTokenFromUA, geoLocation, ls, utils) {
		var preferiti = _.extend({}, Events),
		userLang = utils.getCurrentLanguage();
		
		preferiti.on("saveChannelsPref", function (data) {
			var tmpPref = ls.getFromLocalStorage("channelPreferiti");
			var prova = _.find(tmpPref, function (c){
				if (c.id == _.keys(data) ) {
					return c.id;
				}
			});
			if ( !_.isUndefined(prova) ){
				prova.checked = _.isUndefined(_.values(data)[0].following) ? true : _.values(data)[0].following;
			} else {
				var tmp = {};
				tmp["id"] = _.keys(data)[0];
				tmp["checked"] = _.isUndefined(_.values(data)[0].following) ? true : _.values(data)[0].following;
				tmpPref.push(tmp);
			}
			ls.setIntoLocalStorage("channelPreferiti",tmpPref);
			
		});

		preferiti.on("loadPoiPreferiti", function (listPreferiti) {
			var dt = deviceTokenFromUA.getDeviceToken(),
				channelPreferiti = [];
			
			geoLocation.getCoords().always(function(coords) {
				remoteCall.ajaxCall(preferiti, {
				   	dataType: 'json',
				   	url: sacalservice.url + "poi/?getPoi="+_.toArray(listPreferiti).join(",")+"&lang="+userLang.substring(0,2)+"&dt="+dt+"&start=0&lat="+coords.latitude+"&lon="+coords.longitude,
	                success: function (data) {
						preferiti.trigger("loadPoiPreferitiCompleted", data);
						_.each(data, function(poi){
							if (!_.isEqual(poi.twitter,"") && poi.infoCanale.following == true) {
								var tmp = {};
								tmp["id"] = poi.twitter;
					    		tmp["checked"] = true;
								channelPreferiti.push(tmp);
							}
						});
						ls.setIntoLocalStorage("channelPreferiti",channelPreferiti);
					}
				});
			});

		});
		
		return preferiti;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage",
        "trim.it/fg/utils/localstorage"
        ],
        
        function(logger, $, Events, tmpl, BasePage, ls) {
		var imprese = new BasePage({
			el: "wrapper_imprese",
			page: "imprese",
			title: tmpl.localize("imprese d'eccellenza")
		});
		
		imprese.on("clearData", function () {
			imprese.find(".page").empty();
		});

		imprese.on("updateEccList", function (listEcc) {
			var page = imprese.cntx.find(".page");
			page.find(".eccellenza").append(tmpl.get("listImprese", {dati : listEcc})).listview("refresh");
			_.each(listEcc, function(value, key, list) {

				page.find(".ui-link-inherit").on("tap", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
	   				var id = $(this).attr("data-idPoi");
	   				imprese.trigger("goToPoiDetail", id, "#imprese");
	   			});
	   			
			});

			imprese.showPage();
		});

		imprese.on("populateImprese", function (listImprese) {
			var page = imprese.cntx.find(".page"),
				startPoi = 10,
				caricaImprese = "<div class=\"loadEcc altriPoi\">"+tmpl.localize("carica altre imprese")+"</div>";
			
			page.html("<ul data-role='listview' class='eccellenza'></ul>");
			page.find(".eccellenza").html(tmpl.get("listImprese", {dati : listImprese})).listview();
			page.append(caricaImprese);

			page.find(".loadEcc").on("tap", function (e) {
				e.preventDefault();
				e.stopImmediatePropagation();
   				imprese.trigger("getEccellenzaList",startPoi);
   				startPoi+=10;
			});

			page.find(".ui-link-inherit").on("tap", function (e){
				e.preventDefault();
				e.stopImmediatePropagation();
   				var id = $(this).attr("data-idPoi");
   				imprese.trigger("goToPoiDetail", id, "#imprese");
   			});
   			imprese.header = {
				right: {
					"link": "#mappa",
					"style": "map"
				}
			};
   			imprese.showPage();
		});
		
		return imprese;
});

define([
        "trim.it/fg/views/templates",
        "text!templateApp/pages/emptyPage.html",
        "text!templateApp/listCategories.html",
        "text!templateApp/listItinerari.html",
        "text!templateApp/listImprese.html",
        "text!templateApp/listPoi.html",
        "text!templateApp/listPreferiti.html",
        "text!templateApp/listProdotti.html",
        "text!templateApp/dettaglioPoi.html",
        "text!templateApp/dettaglioItinerario.html",
        "text!templateApp/bottoniNotifiche.html",
        "text!templateApp/header.html",
        "text!templateApp/dialogCondividi.html",
        "text!templateApp/news.html",
        "text!templateApp/inizio.html",
        "text!templateApp/mappa.html",
        "utils/localization",
        "trim.it/fg/utils/utils"
       ],
       
       function (tmpl, emptyPage, listCategories, listItinerari, listImprese, listPoi, listPreferiti, listProdotti, dettaglioPoi, dettaglioItinerario, bottoniNotifiche, header, dialogCondividi, news, inizio, mappa, localization, utils) {
			var extraTemplates = {
					emptyPage : emptyPage,
					listCategories : listCategories,
					listItinerari : listItinerari,
					listPoi : listPoi,
					listPreferiti : listPreferiti,
					listImprese: listImprese,
					listProdotti : listProdotti,
					dettaglioPoi : dettaglioPoi,
					dettaglioItinerario : dettaglioItinerario,
					bottoniNotifiche : bottoniNotifiche,
					header : header,
					dialogCondividi : dialogCondividi,
					news : news,
					inizio : inizio,
					mappa : mappa,
					localize : localize
				},
				language = utils.getCurrentLanguage();
				
				function localize(str) {
					return localization[language][str];
				}
				
				tmpl.get = _.wrap(tmpl.get, function(f, templateName, params) {
						params["l"] = localize;
						return f(templateName, params);
				});
			
			return _.extend(tmpl, extraTemplates);
		});


define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/notificationBarContainer",
        "utils/sacalservice"
        ],
        
        function(logger, $, Events, tmpl, NotificationBarContainer, sacalservice) {
        		var vicino = new NotificationBarContainer({
        				el: "wrapper_vicino",
        				page: "vicino",
        				title: tmpl.localize("vicino a me"),
        				right: {
        						"link": "",
        						"style": "map"
        					}
        			}),
        			filtroCategorie,
        			tmpListPoi;
        		
        		vicino.on("catFromLS",function(cat){
        			filtroCategorie = cat;
        		});

            vicino.on("clearData", function () {
            	vicino.cntx.find(".page").empty();
            });

        		vicino.on("updatePoiList", function (listPoi) {
        			var page = vicino.cntx.find(".page");
        			
        			page.find("#poiList ul").append(tmpl.get("listPoi", {dati : listPoi, backendUrl : sacalservice.backendUrl})).listview();

        			_.each(listPoi, function(value, key, list) {
           			 	vicino.trigger("renderButtonBox", value, $("#"+key ,page));
           			});
           			
           			//FIXME fa il bind 2 volte sui poi già esistenti nella lista
        			page.find(".boxThumb").click(function () {
           				vicino.trigger("goToPoiDetail", $(this).attr("data-idPoi"), "#vicino");
           			});

           			page.find(".boxNome").click(function () {
           				var el = $(this);
           				
           				vicino.trigger("goToPoiMap", el.attr("data-lat"), el.attr("data-lon"));
           			});
        			vicino.showPage();
        			_.union(tmpListPoi,listPoi);
        		});
        		
        		vicino.on("populatePoiList", function (listPoi) {
        			var page = vicino.cntx.find(".page"),
        				startPoi = 10,
        				caricaPoi = "<div class=\"loadPoi altriPoi\">"+tmpl.localize("carica poi")+"</div>";
        			
        			page.html("<div id='poiList'><ul data-role='listview'></ul></div>");
        			page.find("#poiList ul").html(tmpl.get("listPoi", {dati : listPoi, backendUrl : sacalservice.backendUrl})).listview();

					page.append(caricaPoi);

        			page.find(".loadPoi").click(function () {
           				vicino.trigger("getPoiList",startPoi);
           				startPoi+=10;
           			});
           			
        			page.find(".boxThumb").click(function () {
           				var id = $(this).attr("data-idPoi");
           				vicino.trigger("goToPoiDetail", id, "#vicino");
           			});

        			page.find(".boxNome").click(function () {
           				var lat = $(this).attr("data-lat");
           				var lon = $(this).attr("data-lon");
           				vicino.trigger("goToPoiMap",lat,lon);
           			});

        			$(".map").click( function () {
        	   			vicino.trigger("showPoisOnMap", listPoi);
           			});

           			_.each(listPoi, function(value, key, list) {
           			 	vicino.trigger("renderButtonBox", value, $("#"+key ,page));
           			});
          
           			vicino.showPage();
        		});


		
		return vicino;
});

	define([ "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/basePage",
        "views/templates"
        ], function(logger, $, Events, BasePage, tmpl) {

	var NotificationBarContainer = function (options) {
		return BasePage.apply(this, arguments);
	};
	
	_.extend(NotificationBarContainer.prototype, BasePage.prototype, {
		
		initialize: function() {
			var that = this,
				listaPreferiti = {};
			
			BasePage.prototype.initialize.call(this);

			that.on("preferitiFromLS", function (preferiti) {
				listaPreferiti = preferiti;
			});

			that.on("renderButtonBox", function(id, page){
				if ( listaPreferiti[id.items_id] ){
					id["preferiti"] = true;
				} else {
					id["preferiti"] = false;
				}
	   			$(".boxBottoni", page).html(tmpl.get("bottoniNotifiche", {id: id})).trigger("create");

	   			$("input.preferiti", page).change(function () {
					var el = $(this),
					id = el.attr("data-idPoi"),
					twitter = el.attr("data-twitter"),
					isTwitter = el.attr("data-isTwitter");
					
					el.attr("data-status","transition");
					if (_.isEqual(isTwitter,"true")) {
						var data = {};
						if ( el.is(":checked") ) {
							listaPreferiti[id] = id;
							el.attr("data-status","check");	
							el.parentsUntil("div.boxBottoni").find("input.tweet").checkboxradio("enable");
							that.trigger("savePreferitiToLS",listaPreferiti);
						} else {
							data[twitter] = {following : false, notifications : false};
							that.trigger("postChannel",data);
							createButtonEventsHandlers(el);	
						}
					} else {
						if ( el.is(":checked") ) {
							listaPreferiti[id] = id;
							el.attr("data-status","check");	
							that.trigger("savePreferitiToLS",listaPreferiti);
						} else {
							delete listaPreferiti[id];
							that.trigger("savePreferitiToLS",listaPreferiti);
						}
					}
				});

	   			$("input.tweet", page).change(function () {
					var el = $(this),
					id = el.attr("data-idPoi");
					nomeTwitter = el.attr("data-twitter"),
					data = {};
					
					el.parent().parent().next().show();
					el.attr("data-status","transition");	
					if (el.is(":checked")) {
						data[nomeTwitter] = {following : true};
						that.trigger("postChannel",data);	
						createButtonEventsHandlers(el);
					} else {
						data[nomeTwitter] = {following : false, notifications : false};
						that.trigger("postChannel",data);
						createButtonEventsHandlers(el);
					}
				});

	   			$("input.notifiche", page).change(function () {
					var el = $(this),
					id = el.attr("data-idPoi"),
					nomeTwitter = el.attr("data-twitter"),
					data = {};
					
					el.parent().parent().next().show();
					el.attr("data-status","transition");	
					if (el.is(":checked")){
						data[nomeTwitter] = {notifications : true};
						that.trigger("postChannel",data);
						createButtonEventsHandlers(el);
					} else {
						data[nomeTwitter] = {notifications : false};
						that.trigger("postChannel",data);
						createButtonEventsHandlers(el);	
					}
	   			});
			});
			function createButtonEventsHandlers(el) {
				that.on("success", function (data) {
					el.parent().parent().next().hide();
					if ( el.attr("data-status") === "transition" ){
						that.trigger("saveChannelsToLS", data);
						el.attr("data-status","check");	
						if (el.hasClass("tweet")) {

							if (el.is(":checked")){
								el.parentsUntil("div.boxBottoni").find("input.notifiche").checkboxradio("enable");
							} else {	
								el.parentsUntil("div.boxBottoni").find("input.notifiche").checkboxradio("disable");
								el.parentsUntil("div.boxBottoni").find("input.notifiche").attr("checked",false).checkboxradio("refresh");
							}
						}
						if (el.hasClass("preferiti")) {
							delete listaPreferiti[el.attr("data-idpoi")];
							that.trigger("savePreferitiToLS",listaPreferiti);
							el.parentsUntil("div.boxBottoni").find("input.tweet").checkboxradio("disable");
							el.parentsUntil("div.boxBottoni").find("input.tweet").attr("checked",false).checkboxradio("refresh");
							el.parentsUntil("div.boxBottoni").find("input.notifiche").checkboxradio("disable");
							el.parentsUntil("div.boxBottoni").find("input.notifiche").attr("checked",false).checkboxradio("refresh");
						}
					}
				});

				that.on("error", function (data) {
					el.parent().parent().next().hide();
					if ( el.attr("data-status") === "transition" ){
						el.attr("data-status", "transitionError");
						if (el.is(":checked")) {
							el.attr("checked",false).checkboxradio("refresh");
						} else {
							el.attr("checked",true).checkboxradio("refresh");
						}
					}
				});
			} 
		}
	});

	return NotificationBarContainer;
});


define([ "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "trim.it/fg/views/scrollableContainer",
        "views/templates"
        ], function(logger, $, Events, ScrollableContainer, tmpl) {

	var BasePage = function (options) {
		return ScrollableContainer.apply(this, arguments);
	};
	
	_.extend(BasePage.prototype, ScrollableContainer.prototype, {
		
		initialize: function() {
			var that = this;
			ScrollableContainer.prototype.initialize.call(this);
			
			that.on("preInit", function () {
				$("body").prepend(_.template(tmpl.emptyPage, {page: that.page}));
				that.cntx = $("#"+that.page);
				$("#"+that.page).append(_.template(tmpl.get("header", {header: that})));
			});
			
			that.on("loadHeader", function(){
				$("#"+that.page).find(".headerPage").html(tmpl.get("header", {header: this.header}));
			});
		},

		showPage: function() {
			ScrollableContainer.prototype.trigger.call(this, "show");
		},

		loadHeader: function() {
			ScrollableContainer.prototype.trigger.call(this, "loadHeader");
		}

	});
	
	return BasePage;
});


define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "utils/sacalservice"
        ],
        
        function (logger, $, Events, tmpl, sacalservice) {
		var condividi = _.extend({}, Events),
        	listPois;
        	

		condividi.on("populateCondividi", function (dati, listPoi) {
			var cond = "",
            cnt = 1,
            body  =  $("body");
			
            listPois = listPoi;
            _.each(listPoi, function(poi, key, list) {
                cond = cond + cnt +". " + poi.titolo +" "+ poi.indirizzo +" "+ poi.cap+" "+poi.citta + "\n";
                cnt+=1;
            });
            if (body.find("#condividi").size() > 0) { 
                body.find("#condividi").remove(); 
            }

        	body.append(tmpl.get("dialogCondividi",{dati : encodeURIComponent(cond)})).find(".maps").off().on("tap", function () {
                condividi.trigger("showPoisOnMap", listPois);
            });

            $.mobile.changePage("#condividi",{role : "dialog"});
		});
		
               
		return condividi;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage"
        ],
        
        function(logger, $, Events, tmpl, BasePage) {
		
		var prodotti = new BasePage({
			el: "wrapper_prodotti",
			page: "prodotti",
			title : ""
		});
		
		prodotti.on("populateProdotti", function (listProdotti,backView) {
			prodotti.cntx.find(".page").html(tmpl.get("listProdotti", {dati : listProdotti}));

			prodotti.header = {
					title : tmpl.localize("prodotti"),
					left: {
						"link": backView,
						"style": "back"
					}
			};
			
			prodotti.showPage();
   			prodotti.loadHeader();
		});
		
		return prodotti;
});

define([
        "trim.it/fg/utils/utils",
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/notificationBarContainer",
        "utils/sacalservice"
        ],
        
        function(utils, logger, $, Events, tmpl, NotificationBarContainer, sacalservice) {
			var dettaglioItinerario = new NotificationBarContainer({
					el: "wrapper_dettaglioItinerario",
					page: "dettaglioItinerario",
					title: tmpl.localize("dettaglio itinerario"),
					left: {
						"link": "#itinerari",
						"style": "back"
					},
					right: {
						"link": "",
						"style": "map"
					}
				}),
				photoSwipeInstance = undefined;
			
			function disegnaMappaItinerario (listaPoi) {
				var proj = "EPSG:4326",
                	poitemplateid = "poiTemplate",
                	points = [],
                	url = 'https://geos.regola.it/Mapping/networkservice.svc/rest/ComputeRoute',
                	style = { strokeColor: '#FF00FF', strokeOpacity: 0.5, strokeWidth: 5 };
	            
	            Map = Regola.Mapping.MapWidget({
	                divID: "mappaDettaglioItinerario",
	                tilesUrl: "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
	                tileLayerName: "tiles"
	            });
	            //Modificata libreria Regola.Mapping
	            //$.ajaxSetup({ headers: { siteKey: 'V7K18/y20VKOYbvyCC65eA=='} });

               	Map.enablePathDrawing();
               	Map.removePanZoomBar();
	            Map.zoomToLevel(9);
				_.each(listaPoi, function (value, key){
	            	if (value.latitudine) {
	            		points.push({ Y: value.latitudine, X: value.longitudine });
	            		Map.centerAt(value.latitudine, value.longitudine );
	            	}
	            });
 
                Map.drawRoutedPath(url, points, proj, poitemplateid, style);
			};

			dettaglioItinerario.on("clearData", function () {
				dettaglioItinerario.cntx.find(".page").empty();
			});

			dettaglioItinerario.on("populateDetailItinerario", function (dettaglio, poiList) {
				var page = dettaglioItinerario.cntx.find(".page");
				
				page.html(tmpl.get("dettaglioItinerario", {dettaglio : dettaglio, poiList : poiList, backendUrl : sacalservice.backendUrl}));
				page.find("#poiList ul").listview();

	   			disegnaMappaItinerario(poiList);

	   			$(".map").click( function () {
	   				dettaglioItinerario.trigger("showPoisOnMap", poiList);
   				});
	            
	   			page.find(".boxThumb").click( function () {
	   				var id = $(this).attr("data-idPoi");
	   				dettaglioItinerario.trigger("goToPoiDetail", id, "#dettaglioItinerario");
	   			});

	   			page.find(".boxNome").click( function () {
					var lat = $(this).attr("data-lat");
					var lon = $(this).attr("data-lon");
					dettaglioItinerario.trigger("goToPoiMap",lat,lon);
   				});

	   			_.each(poiList, function(value, key, list) {
	   			 	dettaglioItinerario.trigger("renderButtonBox", value, $("#"+key ,page));
	   			});

	   			dettaglioItinerario.showPage();
			});
			
		return dettaglioItinerario;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage",
        "trim.it/fg/utils/localstorage"
        ],
        
        function(logger, $, Events, tmpl, BasePage, ls) {
		var itinerari = new BasePage({
			el: "wrapper_itinerari",
			page: "itinerari",
			title: tmpl.localize("itinerari")
		});

		itinerari.on("clearData", function () {
			itinerari.cntx.find(".page").empty();
		});
		
		itinerari.on("populateItinerari", function (listItinerari) {
			var page = itinerari.cntx.find(".page");
			
			page.html(tmpl.get("listItinerari",{dati : listItinerari})).trigger("create");
			page.find(".ui-link-inherit").click(function () {
   				var id = $(this).attr("data-idItinerario"),
   					obj_it;
   				
   				_.each(listItinerari, function(v,k){
					if(v.sottoitinerari){
					 	_.find(v.sottoitinerari, function(v,k){
					        if(k === id){
					        	obj_it = v;
					        };
					      });
					}
				}); 
				
				obj_it["id"] = id;
   				itinerari.trigger("goToItinerarioDetail", obj_it);
   			});
			
			itinerari.showPage();
		});
		
		return itinerari;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage",
        "trim.it/fg/utils/localstorage"
        ],
        
        function (logger, $, Events, tmpl, BasePage, ls) {
			var cerca = new BasePage({
				el: "wrapper_cerca",
				page: "cerca",
				title: tmpl.localize("seleziona tutti"),
				left: {
					"link": "",
					"style": "check_bt"
					},
				right: {
					"link": "",
					"style": "uncheck_bt"
				}
			}),
			catSelected = {};
			
			function flatCategories(list){
				var tmp = _(list).chain().map(function accum(c, k) { 
					if(c.sottocategorie) { 
						return _(c.sottocategorie).chain().map(function (c, k) { 
							return accum(c, k); }).flatten().value(); 
					} else {c["id"] = k; return c;} }).flatten().value();
				var tmp2 = _(list).chain().map(function (c, k){c["id"] = k+"Cat"; return c;}).flatten().value();
				return _.union(tmp,tmp2);
				
			};

			cerca.on("clearData", function () {
				cerca.cntx.find(".page").empty();
			});
			
			cerca.on("catFromLS",function (cat) {
				catSelected = cat;
			});
			
			cerca.on("populateCategories", function (listCat) {
				var page = cerca.cntx.find(".page"),
					flatListCat = flatCategories(listCat),
					caricaPoi = "<div class=\"loadPoi altriPoi\">"+tmpl.localize("seleziona categorie")+"</div>";
				
				_.find(flatListCat, function(obj) {
					_.find(catSelected, function(cat) {
						if (cat === obj.id) {
							obj["checked"] = true;
						}
					});
				});
				page.html(tmpl.get("listCategories", {dati : listCat})).trigger("create");
				page.prepend(caricaPoi);
				cerca.showPage();
			});

			$(".check_bt").live("click", function () {
				var page = cerca.cntx.find(".page"),
					checkboxs = page.find(":checkbox");
				
				cerca.cntx.find(".htitle").text(tmpl.localize("deseleziona tutti"));
				
				checkboxs.each( function () {
						var el = $(this),
							name = el.attr("id");
						
						el.attr("checked", true);
						el.checkboxradio("refresh");
						catSelected[name] = name;
					});
				cerca.trigger("saveCatToLocalStorage", catSelected);
			});

			$(".uncheck_bt").live("click", function () {
				var page = cerca.cntx.find(".page"),
					checkboxs = page.find(":checkbox");
				
				cerca.cntx.find(".htitle").text(tmpl.localize("seleziona tutti"));
				checkboxs.each( function () {
						var el = $(this),
						name = el.attr("id");
						
						el.attr("checked", false);
						el.checkboxradio("refresh");
						delete catSelected[name];
					});
				cerca.trigger("saveCatToLocalStorage", catSelected);
			});
			
			$(".cat").live("change", function () {
				var el = $(this),
				id = el.find("input[type='checkbox']").attr("id");
				
				if ($("input[type='checkbox']",this).is(":checked")) {
					catSelected[id] = id;
					el.next(".listSubCat").find("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
					el.next(".listSubCat").find("input[type='checkbox']").attr("id", function(index,attr){
						catSelected[attr] = attr;
					})
				} else {
					delete catSelected[id];
					el.next(".listSubCat").find("input[type='checkbox']").attr("checked",false).checkboxradio("refresh");
					el.next(".listSubCat").find("input[type='checkbox']").attr("id", function(index,attr){
						delete catSelected[attr];
					})
				}
				cerca.trigger("saveCatToLocalStorage", catSelected);
			});
			
			$(".subCat").live("change", function () {
				var el = $(this),
					id = el.attr("id"),
					idParent = el.parent().parent().prev().find("input[type='checkbox']").attr("id");
				
				if (el.parent().parent().prev().find("input[type='checkbox']").is(":checked")){
					el.parent().parent().prev().find("input[type='checkbox']").attr("checked",false).checkboxradio("refresh");
					delete catSelected[idParent];
				}
				if (el.is(":checked")) {
					if (!el.parent().parent().find("input[type=checkbox]:not(:checked)").length){
						el.parent().parent().prev().find("input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
						catSelected[idParent] = idParent;
					}
					catSelected[id] = id;
				} else {
					delete catSelected[id];
				}
				cerca.trigger("saveCatToLocalStorage", catSelected);
			});
		
		return cerca;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage"
        ],
        
        function (logger, $, Events, tmpl, BasePage) {
			var mappa = _.extend({}, Events),
				mapDiv = $("#mappa").find("#map");
			
			mappa.on("showMappa", function (listPois) {
				var proj = "EPSG:4326",
                	poitemplateid = "poiTemplate",
                	points = [],
                	url = 'https://geos.regola.it/Mapping/networkservice.svc/rest/ComputeRoute',
                	style = { strokeColor: '#FF00FF', strokeOpacity: 0.5, strokeWidth: 5 };
                
				mapDiv.empty();
				$.mobile.changePage("#mappa");
	            Map = Regola.Mapping.MapWidget({
	                divID: "map",
	                tilesUrl: "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
	                tileLayerName: "tiles"
	            });
               	Map.enablePathDrawing();
	            Map.zoomToLevel(9);
				_.each(listPois, function (value, key){
	            	if (value.latitudine) {
	            		points.push({ Y: value.latitudine, X: value.longitudine });
	            		Map.centerAt(value.latitudine, value.longitudine );
	            	}
	            });
 
                Map.drawRoutedPath(url, points, proj, poitemplateid, style);
			});
			
			mappa.on("showListPoisMappa", function (listPois) {
				mapDiv.empty();
				$.mobile.changePage("#mappa");

				Map = Regola.Mapping.MapWidget({
	                divID: "map",
	                tilesUrl: "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png"
	            });
	            Map.zoomToLevel(9);
	            
	            
	            Map.addVectorLayer({
	                layerName: "poiLayer"
	            });

	            _.each(listPois, function (value, key) {
	                Map.addPOIToLayer({
	                    layerName: "poiLayer",
	                    id: "poi",
	                    lat: value.latitudine,
	                    lon: value.longitudine,
	                    templateID:"poiTemplate"
	                });
	                Map.centerAt(value.latitudine, value.longitudine);
            	});

			});

			mappa.on("showPoiMappa", function (lat, lon) {
				mapDiv.empty();
				$.mobile.changePage("#mappa");

				Map = Regola.Mapping.MapWidget({
	                divID: "map",
	                tilesUrl: "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png"
	            });

	            Map.zoomToLevel(12);
	            
	            Map.centerAt(lat, lon);

	            Map.addVectorLayer({
	                layerName: "poiLayer"
	            });

                Map.addPOIToLayer({
                    layerName:"poiLayer",
                    id:"poi",
                    lat:lat,
                    lon: lon,
                    templateID:"poiTemplate"
                });

			});

		return mappa;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/notificationBarContainer",
        "utils/sacalservice"
        ],
        
        function(logger, $, Events, tmpl, NotificationBarContainer, sacalservice) {
		var dettaglioPoi = new NotificationBarContainer({
				el: "wrapper_dettaglioPoi",
				page: "dettaglioPoi",
				title : ""
			}),
			photoSwipeInstance = undefined;
		
		dettaglioPoi.on("clearData", function () {
			dettaglioPoi.cntx.find(".page").empty();
		});

		dettaglioPoi.on("populateDettaglioPoi", function (dettaglio, backView) {
			var dettaglio = dettaglio[0],
				page = dettaglioPoi.cntx.find(".page");
			
   			page.html(tmpl.get("dettaglioPoi", {dettaglio : dettaglio,backendUrl : sacalservice.backendUrl})).trigger("create");
   			
   			$(".prodotti").click( function() {
   				dettaglioPoi.trigger("loadProdotti",dettaglio.prodotti,"#dettaglioPoi");
   			});
		
   			dettaglioPoi.trigger("renderButtonBox", dettaglio, page);
   			dettaglioPoi.header = {
					title: tmpl.localize("a")+" "+Math.floor(dettaglio.distanza)+" Km",
					left: {
						"link": backView,
						"style": "back"
					},
					right: {
						"link": "",
						"style": "map"
					}
			};

   			dettaglioPoi.showPage();
   			dettaglioPoi.loadHeader();
   			
    		if (typeof photoSwipeInstance !== undefined) {
				photoSwipeInstance = undefined;
			}
			photoSwipeInstance =  $(".gallery a", page).photoSwipe({});
						
			$(".map").click( function () {
	   			dettaglioPoi.trigger("goToPoiMap", dettaglio.latitudine, dettaglio.longitudine);
   			});
		});
		
		
		return dettaglioPoi;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/basePage"
        ],
        
        function(logger, $, Events, tmpl, BasePage) {
			var inizio = new BasePage({
				el: "wrapper_inizo",
				page: "inizio",
				title : tmpl.localize("benvenuto")
			});
			
			inizio.on("showInizio", function () {
				inizio.cntx.find(".page").html(tmpl.get("inizio", {})).trigger("create");
				inizio.showPage();
			});
			
		
		return inizio;
});

define([
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "views/templates",
        "views/notificationBarContainer",
        "utils/sacalservice",
        ],
        
        function(logger, $, Events, tmpl, NotificationBarContainer, sacalservice) {
			var preferiti = new NotificationBarContainer({
				el: "wrapper_preferiti",
				page: "preferiti",
				title: tmpl.localize("preferiti"),
						right: {
							"link": "",
							"style": "go_bt"
						}
			}),
			listaPreferiti, listOrder,
			listaCondivisione = {};
			
			function datiCondivisione (lista) {
				var cnt = 1;
				listaCondivisione = {};
				_.each(lista, function (poi) {
					listaCondivisione[poi.items_id] = cnt +". " + poi.titolo +" "+ poi.indirizzo +" "+ poi.cap+" "+poi.citta;
					cnt++;
				});
			};
			
			preferiti.on("preferitiFromLS", function (listaPreferiti) {
				listaPreferiti = listaPreferiti;
				listOrder = _.toArray(listaPreferiti);
			});

			preferiti.on("visualizzaPreferiti", function () {
				preferiti.trigger("loadPoiPreferiti",listOrder);
			});

			preferiti.on("clearData", function () {
				preferiti.cntx.find(".page").empty();
			});

			preferiti.on("populateListPreferiti", function (listPreferiti) {
				var i = 0,
					listPoiFilter = _.filter(listPreferiti, function (obj){
					return _.find(listOrder, function (value,key){
						if (value === obj.items_id){
							obj["order"] = key;
							return obj;
						}
					}); 
				}),
				page = preferiti.cntx.find(".page"),
				listPoiFilter = _.sortBy(listPoiFilter, function (o){return o.order;});
				
				datiCondivisione(listPoiFilter);

				page.html("<div id='poiList'><ul data-role='listview'></ul></div>");
				page.find("#poiList ul").html(tmpl.get("listPreferiti", {dati : listPoiFilter, backendUrl : sacalservice.backendUrl}));
				page.find("#poiList ul").listview();
				
				
				page.find(".up").on("tap", function (e){
					e.preventDefault();
					e.stopImmediatePropagation();
					var index = $(this).parentsUntil("ul").index(),
					indexTo = index - 1;
					
					if (index === listOrder.length-1){
						$("#poiList li:eq("+index+")", page).find(".down").show();
						$("#poiList li:eq("+indexTo+")", page).find(".down").hide();
					}
					if (index === 1){
						$("#poiList li:eq(0)", page).find(".up").show();
						$("#poiList li:eq(1)", page).find(".up").hide();
					}
					$("#poiList li:eq("+indexTo+")", page).insertAfter($("#poiList li:eq("+index+")", page));
					var id = $(this).attr("id");
					var tmp = listOrder[indexTo];
					listOrder[indexTo] = id;
					listOrder[index] = tmp;
					var obj = {}; 
					_.map(listOrder, function (el) { obj[el] = el; }); 
					preferiti.trigger("savePreferitiToLS",obj);
				});
				
				page.find(".down").on("tap", function (e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					var index = $(this).parentsUntil("ul").index();
					var indexTo = index +1;
					if (index === 0){
						$("#poiList li:eq(0)", page).find(".up").show();
						$("#poiList li:eq(1)", page).find(".up").hide();
					}
					if (index === listOrder.length-2){
						$("#poiList li:eq("+(listOrder.length-1)+")", page).find(".down").show();
						$("#poiList li:eq("+(listOrder.length-2)+")", page).find(".down").hide();
					}
					$("#poiList li:eq("+index+")", page).insertAfter($("#poiList li:eq("+indexTo+")", page));
					
					var id = $(this).attr("id");
					var tmp = listOrder[index];
					listOrder[index] = listOrder[index+1];
					listOrder[indexTo] = tmp;
					var obj = {}; 
					_.map(listOrder, function (el) { obj[el] = el; }); 
					preferiti.trigger("savePreferitiToLS",obj);
				});

				page.find(".boxThumb").on("tap", function () {
	   				var id = $(this).attr("data-idPoi");
	   				preferiti.trigger("goToPoiDetail", id,"#preferiti");
	   			});
	   			page.find(".boxNome").on("tap", function () {
	   				var el = $(this);
	   				preferiti.trigger("goToPoiMap", lat = el.attr("data-lat"), el.attr("data-lon"));
	   			});

	   			_.each(listPoiFilter, function(value, key, list){
	   				preferiti.trigger("renderButtonBox", value, $("#"+key ,page));
	   			});
	   			
	   			$(".go_bt").off().on("tap", function () {
	  				preferiti.trigger("datiDaCondividere",listaCondivisione, _.sortBy(listPoiFilter, function (o){return _.indexOf(listOrder, o.items_id);}) );
				});
	   			
	   			preferiti.showPage();
			});
	   			


		return preferiti;
});
