







(function () {
	fgLoader.loadApp('app.cna.al', 'cna');
	fgLoader.start();
})();


define([
        "trim.it/fg/router",
        "trim.it/fg/models",
        "viewsLoader"
        ],
        function(router, models, views) {
		//loading extra routes
		var extraRoutes = [
								{
								".*" : {
										handler: _.once( function () {
											console.log("App page creation.");
										}),
										events: "bc"
									}
								},{
									"#news": {
										handler: function (eventType, matchObj, ui, page, evt) {
											if (ui.prevPage.attr("id") != "cmsContent") {
												console.log("showing page #news");
												models.configuration.off("oneTime").on("oneTime", function () {
												 	views.newsScroller.trigger("loadChannels");
												});
												models.configuration.trigger("load","loadFilters oneTime");
											}
										},
										events: "bs"
										}
			                     },{
									"#sedi": {
										/*
										 * http://openlayers.org/dev/examples/mobile-jq.html#mappage
										 */
										handler: _.once( function () {
											models.sedi.trigger("loadFeatures");
										}),
										events: "s"
									}
								 },{
								"#opzioni": {
									handler: function (eventType, matchObj, ui, page, evt) {
										if (ui.nextPage.attr("id") != "dialogAuth") {
											console.log("clear channel from local storage");
											models.configuration.trigger("saveDataToLS", "filters", "");//Serve per i filtri
											models.configuration.trigger("loadFilters");
										}
									},
									events: "bh"
									}
		                     	}
							];
		router.addExtraRoutes(extraRoutes);						

		router.routesConf.on("extraInitEvents", function(){
				
			models.sedi.on("featuresLoaded", function(features) {
				console.log("intercepting featuresLoaded on sedi model");
				views.sedi.trigger("createMap", features);
			});

			models.configuration.on("postSuccess", function (data) {
				views.optionsScroller.trigger("success", data); 
			});

			$(document).bind("resume", function () {
				console.log("Resume App and update news.");
				push.resetBadge(function (){
					console.log("Reset badge.");
				});
				if (_.isEqual($.mobile.activePage.attr('id'),"news")) {
					models.configuration.trigger("load","loadFilters oneTime");
				}
			});

		});	
		
		return router;
});


define([
        "trim.it/fg/utils/logger",
        "jquery",
        "trim.it/fg/views",
        "trim.it/fg/views/scrollableContainer",
        "trim.it/fg/views/sedi",
        "cna/views/categories"
        ],
        function(logger, $, baseView, ScrollableContainer, sedi) {
			return baseView.registerViews({
				"sedi": sedi,
				"scrollableContainerUnioni": new ScrollableContainer({
					el : "wrapper_unioni"
				}),
				"scrollableContainerConvenzioni": new ScrollableContainer({
					el : "wrapper_convenzioni"
				})
			},{
				"sedi" : "sedi",
				"unioni" : "scrollableContainerUnioni",
				"convenzioni" : "scrollableContainerConvenzioni"
			});
});


define([
        "trim.it/fg/configuration",
        "text!json/sedi.json",
        ],
        
        function(configuration, sedi) {
			return configuration.registerJson({
				"sedi" : JSON.parse(sedi)
			});
		});

define([
        "trim.it/fg/models"
        ],
        function (models) {
			return models;
});



















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



	define([
        "trim.it/fg/router",
        "trim.it/fg/models",
        "viewsLoader"
        ],
        function(router, models, views) {
	
		//loading extra routes
		var extraRoutes = [
							{
		                     	"#categorie" : {
		                     		handler: function () {
		                     			console.log("showing page #categories");
		                     			models.configuration.trigger("load","loadCategories");
		                     		},
		                     		events : "bs"
		                     	}
		                     },
		                     {
								"#sedi": {
									/*
									 * http://openlayers.org/dev/examples/mobile-jq.html#mappage
									 */
									handler: _.once(function () {
										models.sedi.trigger("loadFeatures");
									}),
									events: "s"
								}
							 }
		                 ];
		                 
		router.addExtraRoutes(extraRoutes);

		//loading extra init events
		
		router.routesConf.on("extraInitEvents", function(){
			
			models.configuration.on("loadCategories", function (data) {
				views.categories.trigger("populate", data);
			});
			
			models.configuration.on("postSuccess", function (data) {
				views.optionsScroller.trigger("success", data); 
			});
			
			views.categories.on("loadCat", function (catChecked) {
				if (!_.isEmpty(catChecked)){
					models.news.trigger("load", catChecked);
				} else {
					models.news.trigger("updateCanaliFromLS", catChecked);
					views.newsScroller.trigger("populate");
				}
			});
			
			models.sedi.on("featuresLoaded", function(features) {
				console.log("intercepting featuresLoaded on sedi model");
				views.sedi.trigger("createMap", features);
			});
			
			// views.banner.on("loadBanners", function () {
			// 	models.banner.trigger("loadBanners");
			// });

			// models.banner.on("loadCompleted", function (banners) {
			// 	views.banner.trigger("loadCompleted",banners);
			// });


		});
	
		return router;
});


define([ 
        "trim.it/fg/utils/logger",
        "libs/backbone.events",
        "configLoader" 
        ],

	function(logger, Events, config) {
		var banner = _.extend({}, Events),
		banners;

		banner.on("loadBanners", function(){
			banners = config.banners;
			banner.trigger("loadCompleted", banners);
		});
		
	return banner;
});


define([
        "trim.it/fg/utils/utils",
        "trim.it/fg/utils/logger",
        "jquery",
        "libs/backbone.events",
        "configLoader",
        "trim.it/fg/views/templates"
        ],
        
        function(utils, logger, $, Events, config, tmpl) {
	       	var banner = _.extend({}, Events),
	      	count = 0,
	      	imageUrl,linkHref;

	      	banner.on("loadCompleted", function (banners) {
				var tmpBanner = banners[count];
				var html = _.template(tmpl.banner ,{ tmpBanner : tmpBanner });
				$("div[data-role=page]").append(html);
		      	updateBanner();

				function updateBanner() {
					(count === banners.length-1) ? (count = 0) : (count+=1);
					imageUrl = banners[count].urlBanner;
					linkHref = banners[count].href;
					$('.footer').attr('href',linkHref);
					$('.footer').css('background-image', 'url(' + imageUrl + ')');
					_.delay(updateBanner,banners[count].temp);
				};
			});

	return banner;
});

define([
		"trim.it/fg/utils/logger",
		"jquery",
   		"libs/backbone.events",
        "trim.it/fg/views/scrollableContainer",
        "trim.it/fg/views/templates"
		],
		function (logger, $, Events, ScrollableContainer, tmpl) {

		var categories = new ScrollableContainer({
								el: "wrapper_categorie"
						}),
						page = $("#categorie");
		
		var catList;
		categories.on("populate", function (data) {
			catList = data;
			var ulContainer = $("#categories", page);
			var html = _.template(tmpl.tmplCategorie, {datiCategorie : data});
       		ulContainer.html(html);
       		ulContainer.find("a").buttonMarkup();
       		$(ulContainer).listview('refresh');
			
			$(".cat").click( function () {
				var catChecked = [];
				var currentIdCat = $(this).attr('data');
				
				_.each(catList, function (cat) {
					if(cat.id === currentIdCat) {
						var flatChannels = _(cat.subchannels).chain().map(function accum(c) { 
								if(c.subchannels) { 
										return _(c.subchannels).chain().map(function (c) { 
											return accum(c); }).flatten().value(); 
									} else return c; }).flatten().value();

						_.each(flatChannels, function(s) {
							if (s.following) {
								var tmp = {};
								tmp["id"] = s.id;
				    			tmp["checked"] = true;
				                catChecked.push(tmp);
				            }	
						}) 
					}
				});	
				$.mobile.changePage("#news",{role : "page"});
      		    categories.trigger("loadCat",catChecked);
			});
			categories.trigger("show");
			
		});

		return categories;
});
