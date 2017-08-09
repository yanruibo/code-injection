









(function(window, undefined) {
     "use strict";
     if (window.siena) { return ; }

     var _siena, server, api_vsn, api_call, ping,
         displayMessage,
         addOptions,
         loadItem, renderItem, loadItems, renderItems,
         itemsForMap, renderToMap,
         loadUffici, loadDirezioni,
         loadAree,
         addItemToContacts, searchRubrica, renderRubrica,
         takePicture, getGPSPosition, sendFormData;
     _siena = {};

     server = "http://api.comune.siena.it"; // DEBUG: "http://api:8083";
     api_vsn = "1";

     api_call = function(url, callback) {
         var api_url, xhr;
         xhr = new XMLHttpRequest();
         api_url = [server, api_vsn, url].join('/');

         xhr.onerror = function() {
             // Error.
             callback.error();
         };

         xhr.onreadystatechange = function(){ // callback for standard browsers
             if (xhr.readyState === 4){
                 if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
                     callback.success(xhr.responseText, xhr.getAllResponseHeaders());
                 }
             }
         };

         xhr.open("GET", api_url, true);
         //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
         xhr.send(null);
     };


     displayMessage = function(txt) {
	 $("#dialogTXT").html(txt);
	 $.mobile.changePage('#dialog', {transition: 'pop'});
     };

     takePicture = function() {
         if (!navigator.camera) {
             displayMessage("Impossibile scattare una foto dal dispositivo");
             $('#photo-switch').val("off").slider('refresh').slider('disable');
             $('#photo').val("");
             return;
         }

         function onSuccess(imageData) {
	     var preview = document.getElementById('previewPhoto');
	     preview.style.display = 'block';
	     preview.src = "data:image/jpeg;base64," + imageData;

             $('#photo').val(imageData);
             $('#photo-switch').val("on").slider('refresh');
	     $('#dettaglio').focus();
             return ;
         }

         function onFail(message) {
             $('#photo').val("");
             $('#photo-switch').val("off").slider('refresh');
	     $('#dettaglio').focus();
             return ;
         }

         navigator.camera.getPicture(onSuccess,
                                     onFail,
                                     { quality: 50,
                                       destinationType: Camera.DestinationType.DATA_URL
                                     });

     };


     getGPSPosition = function() {
         if (!navigator.geolocation) {
             displayMessage("Impossibile accedere al GPS");
             $('#gps-position').val("");
             $('#gps-switch').val('off').slider('refresh').slider('disable');
	     $('#dettaglio').focus();
             return;
         }

         function onSuccess(position) {
	     var pos = {'lat': position.coords.latitude,
			'long': position.coords.longitude
		       };
             $('#gps-position').val(JSON.stringify(pos));
             $('#gps-switch').val('on').slider('refresh');
	     $('#dettaglio').focus();
             return;
         }

         function onFail(error) {
             displayMessage("Impossibile leggere la posizione");
             $('#gps-position').val("");
             $('#gps-switch').val('off').slider('refresh');
	     $('#dettaglio').focus();
             return;
         }

         navigator.geolocation.getCurrentPosition(onSuccess, onFail);

     };

     addOptions = function(data, selector, firstItem) {
         var html = "<option value=\"\">"+firstItem+"</option>";
         for (var i = 0, len = data.length; i < len; i++) {
             var value = data[i];
             html += "<option value=\""+value+"\">"+value+"</option>";
         }
         $(selector).html(html);
     };

     loadItem = function(_id, cb) {
         return api_call("item/"+encodeURIComponent(_id), cb);
     };

     renderItem = function(data, domSelector) {
         var $el = $(domSelector);
         $el.empty();
         $el.append("<h4>"+data.title+"</h4>");
         if (data.description) {
             $el.append(data.description);
         }
         if (data.image && typeof(data.image) === "string") {
             $el.append("<img src=\""+data.image+"\" />");
         }
         $el.append("<a href=\""+data._id+"\" target=\"_blank\" class=\"more\">Leggi &raquo;</a>");
     };

     loadItems = function(category, cb) {
         var url = {'news': "news",
                    'events': "events"};
         return api_call(url[category], cb);
     };

     renderItems = function(items, area, domSelector) {
         if (! items) { return ; }
         var $el, i, len, curr;
         $el = $(domSelector);
         for(i = 0, len = items.length; i < len; i++) {
             curr = items[i];
             $el.append("<li><a href=\"#item-"+area+"\" data-id=\""+curr['_id']+"\"><p>"+curr.title+"</p></a></li>");
         }
         $(domSelector+" li a").bind("vclick", function() {
                                          var _id = encodeURIComponent($(this).data('id'));
                                          var cb = {
                                              error: function() {
                                                  if ( typeof(console) !=='undefined' && console.log ) {
                                                      console.log("errore nella chiamata alle api");
                                                  }
                                              },
                                              success: function(data, resHeaders) {
                                                  if (typeof(data) === "string") {
                                                      data = JSON.parse(data);
                                                  }
                                                  renderItem(data, "#"+area+"_content");
                                              }
                                          };
                                          loadItem(_id, cb);
                                      });
     };

     // mappa
     itemsForMap = function(category, cb) {
         return api_call("mapitems?cat="+encodeURIComponent(category), cb);
     };

     renderToMap = function (item) {
         var html = "<strong>"+item.title+"</strong><br />";
         html += item.subcat+" ";
         if (item.numero_stelle) {
             html += item.numero_stelle + " stelle";
         } else if (item.numero_spighe) {
             html += item.numero_spighe + " spighe";
         }
         html += "<br /><br />"+item.address+", "+item.civico+"<br />";
         if (item.tel) {
             html += "<br /><a href=\"tel:"+item.tel+"\">"+item.tel+"</a>";
         }
         if (item.www) {
             html += "<br /><a href=\""+item.www+"\">"+item.www+"</a>";
         }

         $('#map_canvas')
             .gmap('addMarker',
                   {'position': new google.maps.LatLng(item['lat'], item['long']),
                    'bounds': true
	           })
             .click(function() {
                        $('#map_canvas').gmap('openInfoWindow', { 'content': html }, this);
                    });
     };

     // rubrica
     addItemToContacts = function(item) {
         var contact = navigator.contacts.create();
         contact.displayName = item.nome + " " + item.cognome;

         var name = new ContactName();
         name.givenName = item.nome;
         name.familyName = item.cognome;
         contact.name = name;

         if (item['tel']) {
             var phoneNumbers = [];
             phoneNumbers[0] = new ContactField('work', item['tel'], true);
             contact.phoneNumbers = phoneNumbers;
         }

         if (item['email']) {
             var emails = [];
             emails[0] = new ContactField('work', item['email'], true);
             contact.emails = emails;
         }

         // save
         var onSuccess = function(contact) {
             displayMessage("Contatto salvato");
         };

         // onSaveError: Failed to get the contacts
         var onSaveError = function(contactError) {
             displayMessage("Errore: " + contactError.code);
         };

         contact.save(onSaveSuccess,onSaveError);

     };

     searchRubrica = function(cb) {
         var qs = "?";
         if ($('#direzione').val()) {
             qs += "direzione=";
             qs += encodeURIComponent($('#direzione').val());
         }
         if ($('#ufficio').val()) {
             qs += "&ufficio=";
             qs += encodeURIComponent($('#ufficio').val());
         }
         if ($('#cognome').val()) {
             qs += "&cognome=";
             qs += encodeURIComponent($('#cognome').val().toUpperCase());
         }
         if ($('#nome').val()) {
             qs += "&nome=";
             qs += encodeURIComponent($('#nome').val().toUpperCase());
         }

         return api_call("rubrica/items"+qs, cb);
     };

     renderRubrica = function(items) {
         if (typeof(items) === "string") {
             items = JSON.parse(items);
         }

         if (! items) { return ; }

         var $el, i, len, curr, html, $html;

         $el = $("#ul-rubrica");
         $el.empty();
         $el.append("<li data-role=\"list-divider\">Risultato ricerca <span class=\"ui-li-count\">"+items.length+"</span></li>");
         for(i = 0, len = items.length; i < len; i++) {
             curr = items[i];
             html = "<li>";
             html += "<h3>"+curr.nome + " " + curr.cognome+"</h3>";
             if (curr['direzione']) {
                 html += "<p>"+curr['direzione']+"</p>";
             }
             if (curr['ufficio']) {
                 html += "<p>"+curr['ufficio']+"</p>";
             }
             html += "<p>";
             if (curr['tel']) {
                 html += "Tel. <a href=\"tel: "+curr['tel']+"\">"+curr['tel']+"</a>";
             }
             if (curr['fax']) {
                 html += "<br />Fax. "+curr['fax'];
             }
             if (curr['email']) {
                 html += "<br />Email: <a href=\"mailto: "+curr['email']+"\">"+curr['email']+"</a>";
             }
             html += "</p>";

	     /* XXX this is not working at the moment
             if (navigator.contacts) {
                 html += "<p class=\"ui-li-aside\">";
                 html += "<a href=\"#\">+</a>";
                 html += "</p>";
             }
	      */
             html += "</li>";

             $html = $(html);
	     /* XXX this is not working at the moment
             if (navigator.contacts) {
                 $html.find("a").click(function() { addItemToContacts(curr); });
             }
	      */
             $el.append($html);
         }

         $el.listview();
     };


     loadDirezioni = function(cb) {
         return api_call("rubrica/direzioni", cb);
     };

     loadUffici = function(cb) {
         return api_call("rubrica/uffici", cb);
     };

     loadAree = function(cb) {
         return api_call("sienaopen/aree", cb);
     };


     sendFormData = function(e) {
	 var data = {
	     subject: $('#area').val(),
	     email: $('#email').val(),
	     msg: $('#dettaglio').val(),
	     photo: $('#photo').val()
	 };
	 if($('#gps-position').val()) {
	     data['pos'] = $('#gps-position').val();
	 }
	 // validate data
	 var errMsg = [];
	 if (data.subject === "") {
	     errMsg.push("Inserisci l'oggetto della segnalazione");
	 }

	 if (data.email === "") {
	     errMsg.push("Inserisci un indirizzo email");
	 }

	 if (errMsg.length > 0) {
             displayMessage(errMsg.join("<br /><br />"));
	     return false;
	 }

	 // send form
	 $.ajax({url: [server, api_vsn, "sienaopen"].join('/'),
		 type: "POST",
		 data: data,
		 success: function(data, status, xhr) {
		     if (data !== "ok") {
			 $("#dialogTXT").html(data);
			 $.mobile.changePage('#dialog', {transition: 'pop'});
			 return ;
		     }
		     $.mobile.changePage('#sienaOK');
		 },
		 error: function(xhr, status, err) {
		     $("#dialogTXT").html("Errore di comunicazione con il server");
		     $.mobile.changePage('#dialog', {transition: 'pop'});
		     return ;
		 }
		});
	 return false;
     };

     _siena.online      = false;

     _siena.addOptions  = addOptions;

     _siena.loadItems   = loadItems;
     _siena.renderItems = renderItems;

     // turismo
     _siena.itemsForMap = itemsForMap;
     _siena.renderToMap = renderToMap;

     // rubrica
     _siena.searchRubrica = searchRubrica;
     _siena.renderRubrica = renderRubrica;
     _siena.direzioni   = loadDirezioni;
     _siena.uffici      = loadUffici;

     // messages
     _siena.message = displayMessage;

     // siena open
     _siena.aree         = loadAree;
     _siena.sendFormData = sendFormData;

     // device
     _siena.takePicture = takePicture;
     _siena.gpsPosition = getGPSPosition;

     // cordova callbacks
     document.addEventListener("deviceready",
                               function() { // attach other events
                                   document.addEventListener("online", function() { _siena.online = true; }, false);
                                   document.addEventListener("offline", function() { _siena.online = false; }, false);
                               },
                               false);

     window.siena = _siena;

     return ;
}(window));


$('#info').live("pageshow", function() {
                    $('#map_canvas').gmap('refresh');
                });
$('#info').live('pagebeforecreate',
                function() {
                    var mapOptions = {
                        zoom: 14,
                        center: new google.maps.LatLng(43.318473, 11.331657),
                        panControl: false,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: true,
                        streetViewControl: false
                    };

                    $('#map_canvas').gmap(mapOptions);

                    $('#map-cat').change(function() {
                                             if ($('#map-cat').val() !== "") {
                                                 // clear the map
                                                 $('#map_canvas').gmap('clear', 'markers');
                                                 // add items to the map
                                                 var cb = {
                                                     error: function() {
                                                         if ( typeof(console) !=='undefined' && console.log ) {
                                                             console.log("errore nella chiamata alle api");
                                                         }
                                                     },
                                                     success: function(data, resHeaders) {
                                                         if (typeof(data) === "string") {
                                                             data = JSON.parse(data);
                                                         }
							 // remove old markers
							 $('#map_canvas').gmap('clear', 'markers');
							 $('#map_canvas').gmap('clear', 'overlay');
							 var cluster = $('#map_canvas').gmap('get', 'MarkerClusterer');
							 if (cluster) {
							     cluster.clearMarkers();
							 }

                                                         for (var i = 0, len = data.length; i < len; i++) {
                                                             window.siena.renderToMap(data[i]);
                                                         }
							 $('#map_canvas')
							     .gmap('set',
								   'MarkerClusterer',
								   new MarkerClusterer($('#map_canvas').gmap('get', 'map'),
										       $('#map_canvas').gmap('get', 'markers')
										       )
								   );
                                                     }
                                                 };
                                                 window.siena.itemsForMap($('#map-cat').val(), cb);
                                             } // end if
                                         }); // end change event

                }); //end pageinit #info

$('#news').live('pagebeforecreate', function() {
                    var cb = {
                        error: function() {
                            if ( typeof(console) !=='undefined' && console.log ) {
                                console.log("errore nella chiamata alle api");
                            }
                        },
                        success: function(data, resHeaders) {
                            if (typeof(data) === "string") {
                                data = JSON.parse(data);
                            }
                            window.siena.renderItems(data, "news", "#ul-news");
                            // apply the listview
                            $('#ul-news').listview();
                        }
                    };
                    window.siena.loadItems('news', cb);
                }); //end pageinit #news

$('#news').live('pagebeforeshow', function() { // check for new events and display them
                    return;
                });


$('#eventi').live('pagebeforecreate', function() {
                    var cb = {
                        error: function() {
                            if ( typeof(console) !=='undefined' && console.log ) {
                                console.log("errore nella chiamata alle api");
                            }
                        },
                        success: function(data, resHeaders) {
                            if (typeof(data) === "string") {
                                data = JSON.parse(data);
                            }
                            window.siena.renderItems(data, "events", "#ul-events");
                            // apply the listview
                            $('#ul-events').listview();
                        }
                    };
                    window.siena.loadItems('events', cb);
                }); //end pageinit #news

$('#eventi').live('pageshow', function() { // check for new events and display them
                      return;
                });

// sienaopen
$('#siena').live('pagebeforecreate', function() {
		     var cb, err;
                     err = function() {
                         if ( typeof(console) !=='undefined' && console.log ) {
                             console.log("errore nella chiamata alle api");
                         }
                         displayMessage("Connessione a Internet non disponibile");
                     };
                     cb = {
                         error: err,
                         success: function(data, resHeaders) {
                             if (typeof(data) === "string") {
                                 data = JSON.parse(data);
                             }
                             window.siena.addOptions(data, "#area", "Tipo di problema");
                         }
                     };
                     window.siena.aree(cb);

                     $('#photo-switch').change(function(e) {
                                                   if ($('#photo-switch').val() === 'on') {
                                                       window.siena.takePicture();
                                                   }
						   e.preventDefault();
                                               });
                     $('#gps-switch').change(function(e) {
                                                 if ($('#gps-switch').val() === 'on') {
                                                     window.siena.gpsPosition();
                                                 }
						 e.preventDefault();
                                             });
		     //send form
		     $('#sendData').bind('vclick',
					 function() {
					     window.siena.sendFormData();
					 });
                 });

// eventi rubrica
$('#uffici').live('pagebeforecreate', function() {
                      var cb, cb2, err;
                      err = function() {
                          if ( typeof(console) !=='undefined' && console.log ) {
                              console.log("errore nella chiamata alle api");
                          }
                          displayMessage("Connessione a Internet non disponibile");
                      };
                      cb = {
                          error: err,
                          success: function(data, resHeaders) {
                              if (typeof(data) === "string") {
                                  data = JSON.parse(data);
                              }
                              window.siena.addOptions(data, "#direzione", "Seleziona Direzione");
                          }
                      };
                      cb2 = {
                          error: err,
                          success: function(data, resHeaders) {
                              if (typeof(data) === "string") {
                                  data = JSON.parse(data);
                              }
                              window.siena.addOptions(data, "#ufficio", "Seleziona Ufficio");
                          }
                      };
                      window.siena.direzioni(cb);
                      window.siena.uffici(cb2);

                      // click su bottone cerca
                      cb = {
                          error: err,
                          success: window.siena.renderRubrica
                      };
                      $('#btnSearchRubrica').bind(
                          'vclick',
                          function() {
                              window.siena.searchRubrica(cb);
                          }
                      );
                  }); //end pageinit #uffici

$(document).bind("mobileinit",
		 function() {
             $.mobile.defaultPageTransition="none"; //default to minimum page trasition
		     // Make your jQuery Mobile framework configuration changes here!
		     $.mobile.allowCrossDomainPages = true;
		     //$.mobile.touchOverflowEnabled = true;
		     $.mobile.pushStateEnabled = false;
		 });
