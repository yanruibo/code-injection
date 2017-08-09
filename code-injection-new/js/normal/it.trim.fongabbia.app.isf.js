

















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










	(function() {
		fgLoader.loadApp("app.isf");
		fgLoader.start();
	})();


define([
        "trim.it/fg/utils/logger",
        "jquery",
        "trim.it/fg/views",
        "trim.it/fg/views/scrollableContainer",
        "trim.it/fg/views/newsScroller",
        "views/progettiScroller"
        ],
        function(logger, $, baseView, ScrollableContainer, NewsScroller, ProgettiScroller) {
			return baseView.registerViews({
				"scrollableContainerChiSiamo": new ScrollableContainer({
					el : "wrapper_chisiamo"
				}),
				"progetti": new ProgettiScroller({
					el : "wrapper_progetti"
				}),
				"chisiamo": new ScrollableContainer({
					el : "wrapper_chisiamo"
				})
			},{
				"scrollableContainerChiSiamo" : "scrollableContainerChiSiamo",
				"progetti" : "progetti",
				"chisiamo" : "chisiamo"
			});
});


define([
        "trim.it/fg/configuration"
        ],
        
        function(configuration, sedi, banners) {
			return configuration.registerJson();
		});

	define([
        "trim.it/fg/router",
        "trim.it/fg/models",
        "viewsLoader"
        ],
        function (router, models, views) {
	
		//loading extra routes
		var extraRoutes = [
							{
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
								"#opzioni": {
									handler: function () {
										models.configuration.trigger("saveDataToLS", "filters", "");//Serve per i filtri
										models.configuration.trigger("loadFilters");
									},
									events: "bh"
								}
							 }
		                 ];
		                 
		router.addExtraRoutes(extraRoutes);

		//loading extra init events
		
		router.routesConf.on("extraInitEvents", function () {
			
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
        "trim.it/fg/models"
        ],
        function (models) {
			return models;
});


define([
        "jquery",
        "trim.it/fg/views/scrollableContainer"
        ], function($, ScrollableContainer) {
	
	
	var ProgettiScroller = function (options) {
 		return ScrollableContainer.apply(this, arguments);
 	};
 	
 	_.extend(ProgettiScroller.prototype, ScrollableContainer.prototype, {
 		initialize: function() {
 			ScrollableContainer.prototype.initialize.call(this);
 			var that = this,
 			pageCtx = $("#wrapper_progetti");
 			
 			$("h3", "#wrapper_progetti").on("click", function(e){
 				var el = $(this);
 				$("div.contentAccordion", pageCtx).hide();
 				el.next().show();
 				that.trigger("show");
 			});
// 			$("h3", "#wrapper_progetti").on("click", function(e){
// 				var el = $(this);
// 				el.addClass("current").siblings().removeClass("current");
// 				$("h3", "#wrapper_progetti").not(".current").next("div.contentAccordion").hide()
// 				if (el.next().is(":visible")) {
// 					el.next().hide();
// 				}else{
// 					el.next().show();
// 				}
// 				that.trigger("show");
// 			});
 			if ($("div.contentAccordion:visible", "#wrapper_progetti").size() == 0){
 				$("div.contentAccordion:first", "#wrapper_progetti").show();
 			}
 		}
 	});

 	return ProgettiScroller;
	
});




