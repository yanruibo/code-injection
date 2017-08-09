








 
               var isOffline=false;
               var position_latitude =44.3593954 ;
               var position_longitude =8.4753302 ;
            document.addEventListener("deviceready", onDeviceReady, false);
               
               function onDeviceReady() {
            	   
                   //controllo GPS
                  // var options = { enableHighAccuracy: true };
                 //  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
                   
                  // controllo connessione
                   
                   var networkState = navigator.network.connection.type;
                   
                   var states = {};
                   states[Connection.UNKNOWN]  = 'Unknown connection';
                   states[Connection.ETHERNET] = 'Ethernet connection';
                   states[Connection.WIFI]     = 'WiFi connection';
                   states[Connection.CELL_2G]  = 'Cell 2G connection';
                   states[Connection.CELL_3G]  = 'Cell 3G connection';
                   states[Connection.CELL_4G]  = 'Cell 4G connection';
                   states[Connection.NONE]     = 'None';
                   
                   //alert('Connection type: ' + states[networkState]);

                   if (states[networkState]=='Unknown connection' || states[networkState]=='None'){isOffline=true;}
                   ///fine controllo connessione
                   //alert(isOffline);
                   canvasapplicazione();
                   navigator.splashscreen.hide();
               }


			
            var dallamappa=false;
            var marker=[];
             var markerposizione=[];
              var poly=[];
            var urlpuntiglobale;//da controlare se serve ancora
var lingua="Italiano";
            var coordinate=[];
            var coordinata=[];
            
            
            
           
            function canvasapplicazione() {
          
                
			
			dhx.ready(function(){
			
				/** 1. Initialization**/
                      
                      if (isOffline==true){dhx.alert({ message: "Nessuna connesione disponibile, alcune funzionalità non sono disponibili offline"});
                      configmappa=config;
                      }
                      
				dhx.ui.fullScreen();
				dhx.ui(configmappa); //congif object defined in the config.js
                      
				
		//abilta poverlay loading per le singole viste
				dhx.extend($$('mappa'), dhx.ui.overlay);
                dhx.extend($$('vista_listaPOI'), dhx.ui.overlay);      
                dhx.extend($$('vista_dettaglioPOI'), dhx.ui.overlay); 
                dhx.extend($$('vista_tracciati'), dhx.ui.overlay);       
                      
				
				
                      /*activates default tab (without animation)*/
                      $$("app").show();
                      
                      
  // INIZIO CONTROLLO EVENTI                    
                      
                      /*back to the previous view*/
                      $$("back_button").attachEvent("onTouchEnd",function(button,id){ //t's a function which allows us to change tabs over
                                                    
                                                    $$("posizione_button").hide();                           
    //controllo attivazione e visualizzazione bottoni in alto                                                    
                                                   
                        $$("multiview_2").back();
                    if  ($$("mappa").isVisible()) { dallamappa=true; }
                                                    
                    if  ($$("vista_menuprincipale").isVisible()) { $$("back_button").hide(); }
                    else    { $$("back_button").show(); }  
                                                    
                    if  ($$("vista_menuprincipale").isVisible()) { $$("mappa_button").hide();$$("home_button").hide(); $$("credits_button").show();$$("lingua_button").show();} 
                    if  ($$("vista_listaPOI").isVisible() && dallamappa) { $$("mappa_button").show(); } 
                    if  ($$("vista_dettaglioPOI").isVisible() && dallamappa==true) { $$("mappa_button").show(); }
                   if  ($$("vista_dettaglioPOI").isVisible() && dallamappa==false) { $$("mappa_button").hide();}
                    if  ($$("vista_tipiitinerari").isVisible()) { $$("mappa_button").hide(); } 
                    if  ($$("vista_listaitinerari").isVisible()) { $$("mappa_button").hide(); }
                    if  ($$("vista_menuitinerario").isVisible()) { $$("mappa_button").hide(); }
                    if  ($$("vista_listamenuitinerario").isVisible()) { $$("mappa_button").hide(); }
                    if  ($$("mappa").isVisible()) { dallamappa=true; }
                                                    else {  dallamappa=false; }
                                                    
                  
                                                   return true
                                                   })
                      
                      /*controllo bottone lingua*/
                      $$("lingua_button").attachEvent("onTouchEnd",function(button,id){ //t's a function which allows us to change tabs over  
                          /*     $$("vista_menuitinerario").clearAll();                   
                                  if (lingua=="Italiano")                    
                                                  
                                                      
                                               { lingua="Français";$$("vista_menuprincipale").define("url","FR/data/menuprincipale.json"); }       
                          else {  lingua="Italiano";$$("vista_menuprincipale").define("url","IT/data/menuprincipale.json"); }  
                                       
                                                      
                                                    
                                                    $$("vista_menuprincipale").show();*/
                                                      
                                        $$("vista_lingue").show();   
                                                      $$("back_button").show(); 
                                                      $$("home_button").show();
                                                      $$("lingua_button").hide(); 
                                                      $$("credits_button").hide();
                                                    return true
                                                    })
                      /*controllo  lingua*/
                      $$("vista_lingue").attachEvent("onitemclick",function(button,id){ //t's a function which allows us to change tabs over  
                                                     
                                                     
                         //alert(this.item(button).titolo);                 
                                                          $$("vista_menuitinerario").clearAll();                   
                                            if (this.item(button).titolo=="Français")                    
                                                       
                                                       
                         { lingua="Français";$$("vista_menuprincipale").define("url","FR/data/menuprincipale.json"); }       
                            else {  lingua="Italiano";$$("vista_menuprincipale").define("url","IT/data/menuprincipale.json"); }  
                                                       
                                                     $$("back_button").hide(); 
                                                     $$("home_button").hide();
                                                     $$("credits_button").show();	
                                                     $$("lingua_button").show();
                                                       
                                                       $$("vista_menuprincipale").show();
                                                      
                                                  
                                                      return true
                                                      })
                      
                      /*controllo credits*/
                      $$("credits_button").attachEvent("onTouchEnd",function(button,id){ //t's a function which allows us to change tabs over  
                                                       $$("back_button").show(); 
                                                       $$("home_button").show();
                                                       $$("credits_button").hide();
                                                       $$("lingua_button").hide();               
                                                       if (lingua== "Italiano")               
                                                       {    $$("vista_descrizione").define("url","IT/data/descrizioni/credits.json");}   
                                                                                    else {    $$("vista_descrizione").define("url","FR/data/descrizioni/credits.json");} 
                                                       
                                                       $$("vista_descrizione").show();                  
                                                    return true
                                                    })  
                      
                      /*controllo back to home*/
                      $$("home_button").attachEvent("onTouchEnd",function(button,id){ //t's a function which allows us to change tabs over  
                                                    $$("mappa_button").hide();
                                                    $$("home_button").hide();
                                                    $$("lingua_button").show();
                                                    $$("credits_button").show()
                                                    $$("back_button").hide(); 
                                                    $$("posizione_button").hide();
                                                    
                      $$("vista_menuprincipale").show();
                                                    return true
                                                    })
                      
     /*controllo menu principale*/
                      $$("vista_menuprincipale").attachEvent("onitemclick",function(button,id){ 
                                                             coordinate=[];
                                                             coordinata=[];
                                                             
                          
                         if ((this.item(button).vista)=='vista_listaPOI') 
                                                             {                    
                                       showListaPoi(this.item(button));  
                                                             
                                                               }  
                                                             
                                       if ((this.item(button).vista)=='vista_descrizione') 
                                                             {
                                                             showDescrizionePoi(this.item(button)); 
                                                $$("back_button").show(); 
                                                $$("home_button").show();
                                                $$("lingua_button").hide();  
                                                $$("credits_button").hide();
                                                             } 
                                          else {
                                                             
                                           $$(this.item(button).vista).clearAll();                   
                                         $$(this.item(button).vista).define("url",this.item(button).dati);                  
                                                             
                                                             
                                                $$(this.item(button).vista).show();  
                                                $$("back_button").show(); 
                                                $$("home_button").show();
                                                $$("lingua_button").hide();
                                                $$("credits_button").hide();
                                               }              
                                                       
                           
                                    
                                                  return true
                                                  })
                      
    /*controllo tipiitinerario*/
                      $$("vista_tipiitinerari").attachEvent("onitemclick",function(button,id){ 
                                                            coordinate=[];
                                                            coordinata=[];
                           
                           showListaItinerari(this.item(button).dati);             
                           
                                                     
                                                       return true
                                                       })
    /*controllo listaitinerari*/
                      $$("vista_listaitinerari").attachEvent("onitemclick",function(button,id){ 
                                                             coordinate=[];
                                                             coordinata=[];
                           
                            
                              showMenuItinerario(this.item(button).dati);  
                                                             
                                                            
                                                            return true
                                          })  
                      
    /*controllo menu singolo itinerario*/
                      $$("vista_menuitinerario").attachEvent("onitemclick",function(button,id){ 
                                                             coordinate=[];
                                                             coordinata=[];        
                                
                      showElementoItinerario(this.item(button));    
                                  
                                                             
                                              return true
                                            })
                      
 /*controllo altr lista nel menu itinerario*/
                      $$("vista_listamenuitinerario").attachEvent("onitemclick",function(button,id){ 
                                                                  coordinate=[];
                                                                  coordinata=[];                      
                                                                  
                                                                  
                                                                  
                                                                    
                    showListaPoi(this.item(button));    
                      
                                                        
                                                             return true
                                                             })
  /*controllo lista di punti di interesse per richiamare la singola scheda*/
                      $$("vista_listaPOI").attachEvent("onitemclick",function(button,id){ 
                                                      // $$("vista_dettaglioPOI").show();  
             $$("mappa_button").hide();                                                        
          showDescrizionePoi(this.item(button));
                                                       
                                                                  
                                                                  return true
                                                                  })
    /*controllo lista tracciati e richiama la pagina del singolo tracciato*/
                      $$("vista_tracciati").attachEvent("onitemclick",function(button,id){ 
                                                        $$('vista_tracciati').showOverlay();
                                                        showTracciato(this.item(button));
                                                         
                                                        
                                                        return true
                                                        })        
                      
  //CONTROLLO BOTTONE IN BASSO (MAPPA)
                      
                      
/*controllo bottone mappa*/
                      $$("mappa_button").attachEvent("onitemclick",function(button,id){ 
                                                     
                         
                                                    
                         $$("mappa_button").hide();                           
                        showPoiSuMappa(id);  
                        
               
                                                       return true
                                                       })
                      
                      
                     
				
			});
                
} // fine canvasapplicazione
            
            //attivare solo per prova con browser
    //canvasapplicazione();
			
		


// GEOLOCALIZZAZIONE GPS


function onSuccess(position) {
    
    position_latitude =position.coords.latitude ;
    position_longitude =position.coords.longitude ;
    
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('Errore GPS\ncode: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}








//FUNZIONI GESTIONE MAPPA


function storeCoordinate(lat, lon, array,titolo,descrizione) {
    array.push({x: lat, y: lon, titolofumetto: titolo, urldati: descrizione});
}


function clearOverlays() {
  
    for (var i = 0; i < marker.length; i++ ) {
           
        marker[i].setMap(null);
    }
    
    for (var i = 0; i < poly.length; i++ ) {
       
        poly[i].setMap(null);
    }
    
    
    for (var i = 0; i < markerposizione.length; i++ ) {
        
        markerposizione[i].setMap(null);
    }
    
    
    
}


function aggiungifumetto(marker, number,titolo,dati,lat,lon) {
    
    
    
    var contentString ="<a href='#' onclick='javascript:showPoidaMappa(&quot "+dati+"&quot,&quot "+titolo+"&quot,&quot "+lat+"&quot,&quot "+lon+"&quot);'> "+titolo+"</a>";
    
   
    
    google.maps.event.addListener(marker, 'click', function() {
                                 
    
    var infowindow = new google.maps.InfoWindow({
                                           content: contentString
                                                                              });                             
                                  
   infowindow.open($$("mappa").map,marker);
                                  }); 
 
}


/* Show 'Selected Book' view*/
function showHome(nome){
	
    
    //alert(nome);
    
 
    
     $$("vista_menuprincipale").show();
	
	return true;
}


/* visualizza lista itinerari*/
function showListaItinerari(dati){
    
    var url_lista= dati;

    $$("vista_listaitinerari").clearAll();
    
    $$("vista_listaitinerari").define("url",url_lista);
    
  
    
    $$("vista_listaitinerari").show();
    
    return true;
}


/* Show Menu Itinerario*/
function showMenuItinerario(dati){
    
    var url_lista= dati;
    //alert(url_lista);   
    //    $$("mymap").map.setCenter({x:48.724,y: 8.215});
 $$("vista_menuitinerario").clearAll();
    

    $$("vista_menuitinerario").define("url",url_lista);
    
     
    //$$("tab_comuni").refresh();
    // showToolbarBatch("back");
 

    
     $$("vista_menuitinerario").show();
  
    return true;
}








/* Show Tracciato' view*/
function showTracciato(bottone){
   // $$('vista_tracciati').showOverlay();
    $$("posizione_button").show();
    
     var centromappa;

    
    // per googlemap
   clearOverlays();
    
    dhx.ajax(bottone.dati,  {
             error:function(text, xml, XmlHttpRequest){
             alert("error");
             },
             success:function(text, xml, XmlHttpRequest){
             
            
             var points = [];
            // var bounds = new google.maps.LatLngBounds ();
             $(xml).find("trkpt").each(function() {
                                       
                                       var lat = $(this).attr("lat");
                                       var lon = $(this).attr("lon");
                                       var p = new google.maps.LatLng(lat, lon);
                                       
                                       points.push(p);
                                     //  bounds.extend(p);
                                       
                                       });
           
             
            //  $$("mappa").map.setCenter(p); 
             
             centromappa=points[0];
     //
             
          poly[0] = new google.maps.Polyline({
                                                 // use your own style here
                                                 path: points,
                                                 strokeColor: "#FF00AA",
                                                 strokeOpacity: .7,
                                                 strokeWeight: 4,
                                                 map: $$("mappa").map
                                                 });
             
             
             
             
        
             $$("mappa").map.setCenter(centromappa); 
             }
             });
    
    
 
    
    ///GPS
    
  

        
        
        function onSuccessGPS(position) {
            
            position_latitude =position.coords.latitude ;
            position_longitude =position.coords.longitude ;
            //alert(position_latitude);
            
            var posizione = new google.maps.LatLng(position_latitude, position_longitude);
            
            $$("mappa").map.setCenter(posizione); 
            var image= "images/posizione.png";
            
            for (var i = 0; i < markerposizione.length; i++ ) {
                
                markerposizione[i].setMap(null);
            }
            
            
            
            //  markerposizione[0].setMap(null);
            
            markerposizione[0] = new google.maps.Marker({
                                                        map: $$("mappa").map,
                                                        position: posizione,
                                                        icon: image
                                                        });
            // setTimeout(autoUpdate, 60000);
            
        }
   
    
                        
                           
    
    // fine per googlemap
    
    // $$("mappa").show({type:"flip", subtype:"horizontal"});
     $$("mappa").show();
    $$('vista_tracciati').hideOverlay();
    
    $$("posizione_button").attachEvent("onitemclick",function(button,id){ 
                                   
                                       for (var i = 0; i < markerposizione.length; i++ ) {
                                       
                                       markerposizione[i].setMap(null);
                                       }               
                                   
                                  // autoUpdate();
                                       var options = { enableHighAccuracy: true };
                                navigator.geolocation.getCurrentPosition(onSuccessGPS, onError, options);
                                   
                                   
                                   return true
                                   })
    
  
    
    return true;
}


/* crea il link da inserire nel fumetto per richiamare la funzione che apre la scheda*/
function showPoidaMappa(dati,titolo,lat,lon){
    dallamappa=false;
    coordinata=[];
   
    storeCoordinate(lat, lon, coordinata, titolo,dati);
    $$("vista_dettaglioPOI").define("url",dati);
       
    $$("vista_dettaglioPOI").show();
    $$("mappa_button").show();
    
    return true;
}



/* Show descrizione poi e setta coordinate mappa view*/
function showDescrizionePoi(bottone){
  
    coordinata=[];
    if (bottone.lat>0){ $$("mappa_button").show();
    storeCoordinate(bottone.lat, bottone.lon, coordinata, bottone.titolo, bottone.dati);}
    $$(bottone.vista).define("url",bottone.dati);
    
        
    $$(bottone.vista).show();
    
    return true;
}



/* Show Lista poi e setta coordinate mappa view*/
function showListaPoi(bottone){
    
    coordinate=[];
    
    
    $$(bottone.vista).clearAll();
    
    $$(bottone.vista).define("url",bottone.dati);
    
    //$$(bottone.vista).load(bottone.dati);
    
  
    
    $$(bottone.vista).refresh();
    
    $$(bottone.vista).show();
 
    
    return true;
}


/* dato un array di punti crea la mappa */
function creamappa(punti){

    
    var centromappa;
    var centro = new google.maps.LatLng(44.7594821, 8.2753803);
    
    var points = [];
    var arraypunti=punti;
    

    for (var i = 0; i < arraypunti.length; i++)  {
        
        
        var lat = arraypunti[i].x;
        var lon =  arraypunti[i].y;
        var titolo = arraypunti[i].titolofumetto;
        var urldescrizione = arraypunti[i].urldati;
        var image= "images/purple-pushpin.png";
        var ombra= "images/pushpin_shadow.png";
        var p = new google.maps.LatLng(lat, lon);
        
        marker[i] = new google.maps.Marker({
                                           map: $$("mappa").map,
                                           position: p,
                                           shadow:ombra,
                                           icon: image
                                           });
  
        points.push(p);
                            
        aggiungifumetto(marker[i], i,titolo,urldescrizione,lat,lon);
        
             
        centromappa=points[0];       
        
        
    }
    
    
    
    $$("mappa").map.setCenter(centromappa);   
    
     return true;
    }

/* chiama la funzione per la creazione della mappa */
function showPoiSuMappa(bottone){

    
    clearOverlays();
    if  ($$("vista_listaPOI").isVisible()) { var arraypunti=coordinate; } else {  var arraypunti=coordinata;}
    
    // chiamata ajax di un file vuoto perchè altrimenti la mappa non rimane centrata (mistero irrisolto
    dhx.ajax("gpx/vuoto.gpx",  {
             error:function(text, xml, XmlHttpRequest){
             alert("error");
             },
             success:function(text, xml, XmlHttpRequest){
             
                  
             creamappa(arraypunti);
             }
             });
                     

    dallamappa=true;
   $$("mappa").show({type:"flip", subtype:"horizontal"});
     
  
    
    return true;
}



/* mostra il giusto tipo di viosta per l'èelemento selzionato nel menu itinerario*/
function showElementoItinerario(bottone){
  
     if (bottone.vista=='vista_facebook' ) 
     {
         //alert ('facebook');
      window.open(bottone.dati);
         //$$("vista_youtube").show(); 
         
     } 
    else if (bottone.vista=='vista_descrizione' ) 
    {
           
    } 
    else {
        $$(bottone.vista).clearAll(); 
    }  
    
    if (bottone.vista=='vista_listaPOI' ) 
    {
        $$("mappa_button").show(); 
        coordinate=[];
    } 
    
   $$(bottone.vista).define("url",bottone.dati);
    
    
    $$(bottone.vista).show();
    
    
    
    return true;
}







/*main layout configuration*/
var config = { id: 'app', view: 'layout', 
rows: [
       { view: 'layout', type: 'wide',
       rows: [
              { view: 'toolbar', type: 'MainBar',
              elements: [{ view: 'button', label: 'Back', popup: '',hidden:true, click: '', css: '', id: 'back_button',type:'prev'},{ view: 'button', label: 'Home', popup: '', hidden:true,click: '', css: '', id: 'home_button'}], id: 'toolbar_2'
              },
              { view: 'multiview', type: 'wide',
              cells: [
                     
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_menuprincipale', type:"listaminiature",datatype: 'json', url: 'IT/data/menuprincipale.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_lingue', type:"listaminiature",datatype: 'json', url: 'listalingue.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_tipiitinerari',type:"listaminiature", datatype: 'json', url: 'IT/data/tipiitinerari.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_listaitinerari',type:"listaminiature", datatype: 'json', url: 'IT/data/listaitinerari.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_menuitinerario',type:"listasemplice", datatype: 'json', url: 'IT/data/menuitinerario.json'
                      },
                      { view: 'template',
                      type: { }, scroll: true, id: 'vista_descrizione',waitMessage:true,template:"<div class='contenuto'><h1>#titolo#</h1> #descrizione#</div>", datatype: 'json', url: 'IT/data/descrizione.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_listamenuitinerario',type:"listasemplice", datatype: 'json', url: 'IT/data/dafare.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_listaPOI',type:"listaminiature", datatype: 'json', url: 'IT/data/dafare.json'
                      },
                      { view: 'template',
                      type: { }, scroll: true, id: 'vista_dettaglioPOI',waitMessage:true,template:function(obj){
                      
                      storeCoordinate(obj.lat, obj.lon, coordinata, obj.titolo, obj.dati);
                      return "<div class='contenuto'><h1>"+obj.titolo+"</h1>"+obj.descrizione+"</div>";
                      }, datatype: 'json', url: 'IT/data/descrizione.json'
                      },
                      { view: 'pagelist',
                      type: {css:"info",fullScreen:true,template:"<img src='#value#'>"} , id: 'vista_galleria',waitMessage:true, panel:true, datatype: 'json', url: 'IT/data/immagini.json'
                      },
                     { view: 'list',
                      type: { }, scroll: true, id: 'vista_tracciati',type:"listaminiature", datatype: 'json', url: 'IT/data/tracciati/listatracciati.json'
                      },                      {
                      view:"list",
                      id:"mappa",
                      zoom:10,
                      center:{
                      x:44.127705702614286,
                      y: 8.205757141113281}
                            
                      }
                     
                      ], id: 'multiview_2'
              },
              { view: 'toolbar', type: 'SubBar',
              elements: [{ view: 'button', label: 'Mappa', popup: '', click: '', css: '', hidden:true, id: 'mappa_button'},{ view: 'button', label: 'Posizione', popup: '', click: '', css: '', hidden:true, id: 'posizione_button'},{ view: 'button', label: 'IT/FR', popup: '', click: '', css: '', hidden:false, id: 'lingua_button'},{ view: 'button', label: 'Credits', popup: '', click: '', css: '', hidden:false, id: 'credits_button'}], id: 'toolbar_3'
              }
              ], id: 'layout_2'
       }
       ]
}


/**Store Tab**/

/*Featured products*/
dhx.Type(dhx.ui.pagelist, {
	name:"Featured",
	height:257,
	width:157,
	margin:0,
	padding:0,
	template:function(obj){
		return "<div class='tmp_products'><img class='tmp_products_img' src='"+window.getImage(obj)+"'><div class='tmp_products_title'><div class='price'>$ "+obj.price+"</div></div></div>";
	}
});


/*template lista con miniature */
dhx.Type(dhx.ui.list,{
         name:"listaminiature",
         template:function(obj){
         
         if (obj.lat>0) { storeCoordinate(obj.lat, obj.lon, coordinate, obj.titolo, obj.dati); }
         
         if (coordinate.length>0){ $$("mappa_button").show();}
        
         return "<div class='listaminiature'><div class='lista_img_cont'><img class='tmp_miniature_img' src='"+obj.miniatura+"'></div><div class='lista_info_tmp'><div class='titolo_lista'>"+obj.titolo+"</div></div></div>";
         },
         height: 110,
         css:"listamin"
         
         });

/*template lista semplice */
dhx.Type(dhx.ui.list,{
         name:"listasemplice",
         template:function(obj){
         return "<div class='listaminiature'><div class='listasemplice_info_tmp'><div class='titolo_lista'>"+obj.titolo+"</div></div></div>";
         },
         height: 35,
         css:"listamin"
         
         });

function booksTemplate(obj,arrow){
	var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
	html += '<div class="book_info">';
	html += '<div class="book_title">"'+obj.title+'"</div>';
	html += '<div class="book_author">by '+obj.author+'</div>';
	html += '<div class="book_price">Price: ';
	if(obj.oldprice)
			html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
	html += '<div class="book_price_in">$ '+obj.price+'</div>';
	html += '</div>';
	html += '</div>';
	if(arrow)
		html += '<div class="item_arrow"></div>';
	return html;

}
/*Hot deals*/
var booksType = {
	name:"Books",
	height:140,
	//width:"auto",
	margin:0,
	padding:0,
	css:"books",
	template:function(obj){
		var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
		html += '<div class="book_info">';
		html += '<div class="book_title">"'+obj.title+'"</div>';
		html += '<div class="book_author">by '+obj.author+'</div>';
		html += '<div class="book_price">Price: ';
		if(obj.oldprice)
				html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
		html += '<div class="book_price_in">$ '+obj.price+'</div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="item_arrow"></div>';
		return html;
	}
};

dhx.Type(dhx.ui.pagelist,booksType);
dhx.Type(dhx.ui.list,booksType );
/*Cart*/
dhx.protoUI({
	name:"activeList"
}, dhx.ui.list, dhx.ActiveContent);

dhx.Type(dhx.ui.list, {
	name:"Cart",
	padding:3,
	height:140,
	margin:0,
	css:"cart",
	width:"auto",
	template:function(obj,common){
		var html = '<div class="book_img_cont""><img class="book_img" src="'+window.getImage(obj)+'"/></div>';
		html += '<div class="book_info">';
		html += '<div class="book_title">"'+obj.title+'"</div>';
		html += '<div class="book_author">by '+obj.author+'</div>';
		html += '<div class="book_price">';
		if(obj.oldprice)
				html += '<div class="book_old_price_in">$ '+obj.oldprice+'</div>';
		html += '<div class="book_price_in">$ '+obj.price+'</div>';
		html += common.count(obj,common);
		html += '</div>';
		html += '</div>';
		return html;
	}
});

dhx.Type(dhx.ui.list, {
	name:"Genres",
	template:"#genre#",
	css:"genre",
	height:32
});

dhx.Type(dhx.ui.list, {
	name:"GenresBooks",
	template:"#title# #author#",
	css:"genre_book"
});


/*main layout configuration*/
var configmappa = { id: 'app', view: 'layout', 
rows: [
       { view: 'layout', type: 'wide',
       rows: [
              { view: 'toolbar', type: 'MainBar',
              elements: [{ view: 'button', label: 'Back', popup: '',hidden:true, click: '', css: '', id: 'back_button',type:'prev'},{ view: 'button', label: 'Home', popup: '', hidden:true,click: '', css: '', id: 'home_button'}], id: 'toolbar_2'
              },
              { view: 'multiview', type: 'wide',
              cells: [
                     
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_menuprincipale', type:"listaminiature",datatype: 'json', url: 'IT/data/menuprincipale.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_lingue', type:"listaminiature",datatype: 'json', url: 'listalingue.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_tipiitinerari',type:"listaminiature", datatype: 'json', url: 'IT/data/tipiitinerari.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_listaitinerari',type:"listaminiature", datatype: 'json', url: 'IT/data/listaitinerari.json'
                      },
                      { view: 'list',
                      type: { }, scroll: true, id: 'vista_menuitinerario',type:"listasemplice", datatype: 'json', url: 'IT/data/menuitinerario.json'
                      },
                      { view: 'template',
                      type: { }, scroll: true, id: 'vista_descrizione',waitMessage:true,template:"<div class='contenuto'><h1>#titolo#</h1> #descrizione#</div>", datatype: 'json', url: 'IT/data/descrizione.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_listamenuitinerario',type:"listasemplice", datatype: 'json', url: 'IT/data/dafare.json'
                      },
                      { view: 'list',
                      type: {}, scroll: true, id: 'vista_listaPOI',type:"listaminiature", datatype: 'json', url: 'IT/data/dafare.json'
                      },
                      { view: 'template',
                      type: { }, scroll: true, id: 'vista_dettaglioPOI',waitMessage:true,template:function(obj){
                      
                      storeCoordinate(obj.lat, obj.lon, coordinata, obj.titolo, obj.dati);
                      return "<div class='contenuto'><h1>"+obj.titolo+"</h1>"+obj.descrizione+"</div>";
                      }, datatype: 'json', url: 'IT/data/descrizione.json'
                      },
                      { view: 'pagelist',
                      type: {css:"info",fullScreen:true,template:"<img src='#value#'>"} , id: 'vista_galleria',waitMessage:true, panel:true, datatype: 'json', url: 'IT/data/immagini.json'
                      },
                     { view: 'list',
                      type: { }, scroll: true, id: 'vista_tracciati',type:"listaminiature", datatype: 'json', url: 'IT/data/tracciati/listatracciati.json'
                      },  
                      {
                      view:"googlemap",
                      id:"mappa",
                      zoom:10,
                      center:{
                      x:44.127705702614286,
                      y: 8.205757141113281}
                            
                      }
                     
                      ], id: 'multiview_2'
              },
              { view: 'toolbar', type: 'SubBar',
              elements: [{ view: 'button', label: 'Mappa', popup: '', click: '', css: '', hidden:true, id: 'mappa_button'},{ view: 'button', label: 'Posizione', popup: '', click: '', css: '', hidden:true, id: 'posizione_button'},{ view: 'button', label: 'IT/FR', popup: '', click: '', css: '', hidden:false, id: 'lingua_button'},{ view: 'button', label: 'Credits', popup: '', click: '', css: '', hidden:false, id: 'credits_button'}], id: 'toolbar_3'
              }
              ], id: 'layout_2'
       }
       ]
}

