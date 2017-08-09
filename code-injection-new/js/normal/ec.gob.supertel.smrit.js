

		window.location = "Supertel.html";
            app.initialize();
			
        







          var myMessage = "No ha seleccionado ningún servicio todavía.";
          var servicios;
          var token = new Array('Seleccione un Servicio');
          var teltype;
          var globalprov; //1
		  var globalcanton; //2
		  var firstid = true;
		  var lotte = '';
		  
		  //ciudades
		  var cca = new Array(26);
		   cca[1] = ['4','ALFREDO BAQUERIZO MORENO (JUJAN)','16','BALAO','18','BALZAR','43','COLIMES','45','CORONEL MARCELINO MARIDUEÑA','50','DAULE','52','DURAN','56','EL EMPALME','61','EL TRIUNFO','68','GENERAL ANTONIO ELIZALDE (BUCAY)','79','GUAYAQUIL','85','ISIDRO AYORA (SOLEDAD)','102','LOMAS DE SARGENTILLO','111','MILAGRO','122','NARANJAL','123','NARANJITO','124','NOBOL','133','PALESTINA','144','PEDRO CARBO','152','PLAYAS','174','SAM BORONDÓN','177','SAN JACINTO DE YAGUACHI','191','SANTA LUCIA','202','SIMON BOLIVAR','215','URBINA','250','SALITRE'];
                        cca[2] = ['21','BOLIVAR','64','ESPEJO','112','MIRA','117','MONTUFAR','183','SAN PEDRO DE HUACA','214','TULCAN'];
                        cca[3] = ['25','CALVAS','29','CATAMAYO','31','CELICA','34','CHAGUARPAMBA','65','ESPINDOLA','71','GONZANAMÁ','101','LOJA','105','MACARÁ','126','OLMEDO','136','PALTAS','150','PINDAL','161','PUYANGO','165','QUILANGA','197','SARAGURO','204','SOZORANGA','223','ZAPOTILLO'];
                        cca[4] = ['5','AMBATO','19','BAÑOS DE AGUA SANTA','33','CEVALLOS','114','MOCHA','141','PATATE','162','QUERO','184','SAN PEDRO DE PELILEO','194','SANTIAGO DE PILLARO','212','TISALEO'];
                        cca[5] = ['1','24 DE MAYO','22','BOLIVAR (CALCETA)','40','CHONE','54','EL CARMEN','66','FLAVIO ALFARO','86','JAMA','87','JARAMIJÓ','88','JIPIJAPA','89','JUNÍN','103','LOPEZ','107','MANTA','116','MONTECRISTI','125','OLMEDO','130','PAJÁN','143','PEDERNALES','148','PICHINCHA','154','PORTOVIEJO','157','PUERTO LÓPEZ','170','ROCAFUERTE','185','SAN VICENTE','186','SANTA ANA','205','SUCRE (BAHIA DE CARAQUEZ)','213','TOSAGUA'];
                        cca[6] = ['84','ISABELA','175','SAN CRISTOBAL','188','SANTA CRUZ'];
                        cca[7] = ['9','ARENILLAS','11','ATAHUALPA','17','BALSAS','36','CHILLA','57','EL GUABO','81','HUAQUILLAS','97','LAS LAJAS','106','MACHALA','108','MARCABELI','139','PASAJE','151','PIÑAS','153','PORTOVELO','192','SANTA ROSA','224','ZARUMA'];
                        cca[8] = ['6','ANTONIO ANTE','12','ATUNTAQUI','46','COTACACHI','82','IBARRA','83','IMANTAG','128','OTAVALO','149','PIMAMPIRO','182','SAN MIGUEL DE URCUQUI'];
                        cca[9] = ['41','CHORDELEG','47','CUENCA','58','EL PAN','69','GIRÓN','73','GUACHAPALA','74','GUALACEO','120','NABÓN','127','OÑA','138','PAQUISHA','142','PAUTE','155','PUCARÁ','176','SAN FERNANDO','190','SANTA ISABEL','198','SEVILLA DE ORO','201','SIGSIG','249','CAMILO PONCE ENRÍQUEZ'];
                        cca[10] = ['3','ALAUSI','35','CHAMBO','42','CHUNCHI','44','COLTA','48','CUMANDA','76','GUAMOTE','77','GUANO','134','PALLATANGA','147','PENIPE','169','RIOBAMBA'];
                        cca[11] = ['14','BABA','15','BABAHOYO','23','BUENA FE (SAN JACINTO DE NUENA FE)','113','MOCACHE','115','MONTALVO','132','PALENQUE','156','PUEBLOVIEJO','163','QUEVEDO','216','URDANETA (CATARAMA)','217','VALENCIA','218','VENTANAS','219','VINCES'];
                        cca[12] = ['30','CAYAMBE','109','MEJIA','145','PEDRO MONCAYO','146','PEDRO VICENTE MALDONADO','158','PUERTO QUITO','167','QUITO','171','RUMIÑAHUI','181','SAN MIGUEL DE LOS BANCOS'];
                        cca[13] = ['13','AZOGUES','20','BIBLIAN','26','CAÑAR','51','DELEG','60','EL TAMBO','95','LA TRONCAL','208','SUSCAL'];
                        cca[14] = ['24','CALUMA','37','CHILLANES','38','CHIMBO','53','ECHEANDIA','78','GUARANDA','98','LAS NAVES','180','SAN MIGUEL'];
                        cca[15] = ['93','LA LIBERTAD','173','SALINAS','189','SANTA ELENA'];
                        cca[16] = ['94','LA MANA','99','LATACUNGA','137','PANGUA','159','PUJILI','172','SALCEDO','196','SAQUISILI','200','SIGCHOS'];
                        cca[17] = ['32','CENTINELA DEL CONDOR (ZUMBI)','39','CHINCHIPE (ZUMBA)','59','EL PANGUI','121','NANGARITZA(GUAYZIMI)','131','PALANDA','220','YACUAMBI (28 DE MAYO)','221','YANZATZA','222','ZAMORA'];
                        cca[18] = ['7','ARAJUNO','110','MERA','140','PASTAZA (PUYO)','187','SANTA CLARA'];
                        cca[19] = ['8','ARCHIDONA','27','CARLOS JULIO AROSEMENA TOLA','55','EL CHACO','164','QUIJOS','211','TENA'];
                        cca[20] = ['72','GRAL LEONIDAS PLAZA (LIMON INDANZA)','75','GUALAQUIZA','80','HUAMBOYA','100','LOGROÑO','118','MORONA','129','PABLO SEXTO','135','PALORA','178','SAN JUAN BOSCO','193','SANTIAGO','206','SUCUA','209','TAISHA'];
                        cca[21] = ['28','CASCALES (ELDORADO DE CASCALES)','49','CUYABENO','70','GONZALO PIZARRO','90','LA BONITA','96','LAGO AGRIO','160','PUTUMAYO (PUERTO EL CARMEN DE PUTUMAYO)','199','SHUSHUFINDI','207','SUCUMBIOS','210','TARAPOA'];
                        cca[22] = ['2','AGUARICO (NUEVO ROCAFUERTE)','67','FRANCISCO DE ORELLANA','92','LA JOYA DE LOS SACHAS','104','LORETO'];
                        cca[23] = ['10','ATACAMES','62','ELOY ALFARO','63','ESMERALDAS','91','LA CONCORDIA','119','MUISNE','166','QUININDE','168','RIO VERDE','179','SAN LORENZO'];
                        cca[24] = ['195','SANTO DOMINGO DE LOS COLORADOS'];	
		  

          function go1() {
              
              servicios = 'internet';
              document.getElementById('bann').value = "Internet";

              myMessage = "Llene el siguiente formulario si tiene problemas relacionados con su Servicio de Internet.";

              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Servicio%20de%20Internet", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = "";
                  document.getElementById('TextOP').disabled = false;
              });
          }

          function go2() {
              servicios = 'mobiladv';
              document.getElementById('bann').value = "Servicio Móvil Avanzado (Celular)";
              
              myMessage = "Llene el siguiente formulario si tiene problemas con el Servicio Móvil Avanzado (Celular), ya sea por problemas de cobertura, servicios de datos, facturación u otros.";

              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Servicio%20M%C3%B3vil%20Avanzado", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = "";
                  document.getElementById('TextOP').disabled = false;
              });
          }
          function go3() {
              servicios = 'telffija';
              document.getElementById('bann').value = "Telefonía Fija";   
              
              myMessage = "Llene el siguiente formulario si tiene problemas con el servicio de Telefonía Fija.";
              
        
              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Telefon%C3%ADa%20Fija", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = "";
                  document.getElementById('TextOP').disabled = false;
              });
          }
          function go4() {
              servicios = 'tvpagada';
              document.getElementById('bann').value = "Televisión Pagada";
              
              myMessage = "Llene el siguiente formulario si tiene problemas con su servicio de Televisión Pagada.";
                
              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Televisi%C3%B3n%20Pagada", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = "";
                  document.getElementById('TextOP').disabled = false;
              });
          }
          function go5() {
              servicios = 'rni';
              document.getElementById('bann').value = "Radiaciones No Ionizantes";  
              
              myMessage = "Llene el siguiente formulario si tienen problemas con sistemas que emiten señales de radioeléctricas que pueden afectar su salud.";
              
              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Radiaciones%20No%20Ionizantes", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = token[0];
                  document.getElementById('TextOP').disabled = true;
              });
          }
          function go6() {
              servicios = 'informacion';
              document.getElementById('bann').value = "Información";  
              
              myMessage = "Llene el siguiente formulario si desea solicitar información sobre algún determinado Servicio de Telecomunicaciones o acerca de SM-RIT.";
              
              $.getJSON("http://m.supertel.gob.ec/servicios/swservice.aspx?servicio=Informaci%C3%B3n", function (json) {
                  indata = json.servicio1;
                  token = (indata).split("|");
                  obj2 = new actb(document.getElementById('TextOP'), token);
                  obj2.actb_fSize = '20px'
                  obj2.actb_mouse = true;
                  document.getElementById('TextOP').value = token[0];
                  document.getElementById('TextOP').disabled = true;
              });
          }
          function showInfo() {
              alert(myMessage);
          }
          function checksending() {
              if ("" == document.getElementById('TextOP').value  ) {
                  alert("El campo Operadora esta vacío");
                  return false;
                  } else {
                  var tocheck = document.getElementById('TextOP').value;
                   for (var i = 0; i < token.length; i++) {

                       if (token[i] == tocheck) {
                           if ("" == document.getElementById('smensaje').value) {
                               alert("El campo Mensaje esta vacío");
                               return false;
                           } else {
                               movesend();
                               return true;
                           }
                        }
                   }
                   alert('Debe seleccionar una Operadora de la lista desplegable');
                   return false;
                }
          }

          function move() {

              var re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]))+.+([a-zA-Z0-9]{2,4})+$/;
              var myselect ;
              try {
              myselect = $('input:radio[name=rbutton]:checked').val();
              teltype = myselect;
              } 
              catch (ers) {
                  teltype = 0;
              }

              var myprovince = $("select#selectmenu1");
              globalprov = myprovince[0].value;
			  var mycanton = $("select#selectmenu2");
              globalcanton = mycanton[0].value;
			  
			  if ("" == document.getElementById('ceddula').value) {
					alert("El campo Cédula está vacío");
                    return false;
              } else if ("" == document.getElementById('Text1').value) {
                  alert("El campo Nombre está vacío");
                  return false;
              } else if ("" == document.getElementById('Text2').value) {
                  alert("El campo Apellido está vacío");
                  return false;
              } else if ("" == document.getElementById('fijjo').value && "" == document.getElementById('movvil').value) {
                  alert("Agregue por lo menos una referencia telefónica");
                  return false;
              } else if ("0" == globalprov) {
                  alert("Seleccione su Provincia");
                  return false;
              } else if ("" == document.getElementById('Text6').value) {
                  alert("El campo Email está vacío");
                  return false;
              } else if (!re.test(document.getElementById('Text6').value)) {
                  alert("Dirección de email inválida");
                  return false;
              } else {
                  
                   setTimeout(function () {
				  
                      google.maps.event.trigger(map, 'resize');
                      map.setCenter(new google.maps.LatLng(SRlatitud,SRlongitud));
                  }, 1500);
                  return true;
              }
          }

          function tryout() {
              if (confirm("Esta seguro de salir")) {

                  try {
                      navigator.app.exitApp()
                  }
                  catch (err) {
                      try {
                          close();
                      } catch (err) { alert("2"); }
                  }
              }
              
          }



        var map;
        var markersArray = [];
        var image = 'src/alert.png';
        var SRlatitud = '-0.1960006';
        var SRlongitud = '-78.4933772';
        var pos;
        function initialize() {
            var myOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

            // HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                     pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
                    SRlatitud = position.coords.latitude;
                    SRlongitud = position.coords.longitude;

                    var infowindow = new google.maps.InfoWindow({
                        map: map,
                        position: pos,
                        content: 'Es esta tu Ubicación?'
                    });

                    google.maps.event.addListener(map, 'click', function (event) {
                        crear();
                        addMarker(event.latLng);
                        SRlatitud = event.latLng.lat();
                        SRlongitud = event.latLng.lng();
                    });
                    map.setCenter(pos);
                    
                },
                function () {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {



                google.maps.event.addListener(map, 'click', function (event) {

                    crear();
                    addMarker(event.latLng);
                    /*map.setCenter(event.latLng);*/
                    SRlatitud = event.latLng.lat();
                    SRlongitud = event.latLng.lng();

                });




                var content = 'Error: No pudo ser geolocalizado correctamente, active la geolocalización en su dispositivo o browser.';
                SRlatitud = '-0.1960006';
                SRlongitud = '-78.4933772';
            } else {
                var content = 'Error: Active la Geolocalización en su Celular.';
            }

            var options = {
                map: map,
                position: new google.maps.LatLng(-0.1960006, -78.4933772),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }

        function addMarker(location) {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: image
            });
            markersArray.push(marker);
        }


        function crear() {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setMap(null);
                }
                markersArray.length = 0;
            }
        };

		
		
		
		
		function recid() {
			if (firstid){	
		     var ucheck = document.getElementById('ceddula').value;
			 var uindata;
			 var utoken;
			 $.getJSON("http://m.supertel.gob.ec/cirapps/rit/user.aspx?udata=" + ucheck, function (json) {
                uindata = json.udats;
                
                if (uindata == "" || ucheck == "") {
                        
                }else {
                    utoken = (uindata).split("|");
                    
                    if (firstid){	
						firstid = false ; 
				      var answer = confirm ("La Cédula de Identidad "+ document.getElementById('ceddula').value +" pertenece a "+utoken[1]+" " + utoken[2] +"?");
				      if (answer){
				        document.getElementById('Text1').value = utoken[1];
				        document.getElementById('Text2').value = utoken[2];
				        document.getElementById('fijjo').value = utoken[4];
				        document.getElementById('movvil').value = utoken[3];
				        document.getElementById('Text6').value = utoken[9];
				        document.getElementById('dirreccion').value = utoken[5];
				        lotte = utoken[6].toString();
						

                        var el = $('select#selectmenu1');
                        el.val(utoken[8]).attr('selected', true).siblings('option').removeAttr('selected');
                        el.selectmenu("refresh", true);


				
                        
                        output = [];
						var tc1 = cca[utoken[8]];
                        for(var i = 0, len = tc1.length; i < len; i++){
                            output.push('<option value="' + tc1[i]+'">' + tc1[i+1] + '</option>');
	                        i++;
                        }
						$('select#selectmenu2').append(output.join('')).selectmenu('refresh');
						elw = $('select#selectmenu2');
						elw.val(utoken[7]).attr('selected', true).siblings('option').removeAttr('selected');
						elw.selectmenu("refresh", true);
				 
				}
				else{
				}
			}
			firstid = false ;                  
            }
            });
			
			
			}
			
		};
		
		
		
		
		
		$(document).ready(function(){
		$("select#selectmenu1").change(function() {
	
	
		if (1==1){
			$('select#selectmenu2')
			.empty()
			.append('<option selected="selected" value="0">Seleccione</option>');
				var tprovince = $("select#selectmenu1");
				var tprov = tprovince[0].value;
				if (tprov == 0) {
					alert("Seleccione una Provincia");
				}
				else {
						var output = [];
						var tc = cca[tprov];
						
						for(var i = 0, len = tc.length; i < len; i++){
							output.push('<option value="' + tc[i]+'">' + tc[i+1] + '</option>');
							i++;
						}
						$('select#selectmenu2').append(output.join('')).selectmenu('refresh');
						var el = $('select#selectmenu2');
						el.val('0').attr('selected', true).siblings('option').removeAttr('selected');
						el.selectmenu("refresh", true);
				}   
		} 

		});

	});
		

		
		
        function movesend() {
          var nombres = document.getElementById('Text1').value;
            var apellidos = document.getElementById('Text2').value;
            var telefono = document.getElementById('fijjo').value;
            var provincias = globalprov;
            var emails = document.getElementById('Text6').value;
            var operadoras = document.getElementById('TextOP').value;
            var mensajes = document.getElementById('smensaje').value;
            
            var ceddula = document.getElementById('ceddula').value;
            var movvil = document.getElementById('movvil').value;
            var fijjo = document.getElementById('fijjo').value;
            var dirreccion = document.getElementById('dirreccion').value;
			
			  var catt = $("select#catt1");
              var catts = catt[0].value;
			
            cannton = globalcanton;
            provvincia = globalprov;
            
            
            var goes = "http://m.supertel.gob.ec/cirapps/smrit/Guardar.aspx?field1=" + servicios + "&nombres=" + nombres + "&apellidos=" + apellidos + "&telefono=" + telefono + "&provincia=" + provincias + "&email=" + emails + "&operadora=" + operadoras + "&mensaje=" + mensajes + "&latitud=" + SRlatitud + "&longitud=" + SRlongitud + "&teltype=" + teltype+ "&ceddula="+ceddula+"&movvil="+movvil+"&fijjo="+fijjo+"&dirreccion="+dirreccion+"&lotte="+lotte+"&cannton="+cannton+"&provvincia="+provvincia+"&catts="+catts ;
            //window.location = "/mobile/mobile.html#page5"
            $.post(goes, function (data) {
                var incomingdata = (data).split("|");
                document.getElementById('Lte1').value = incomingdata[0];
                document.getElementById('Lte2').value = incomingdata[1];
                document.getElementById('Lte3').value = incomingdata[2];
				alert('Gracias, su reclamo se ha enviado corectamente.');
                if (incomingdata[0] == "") {
                    alert("Revise su Conexión a Internet.");
                    return false;
                } else {
                    return true;
                }

            });
        };

        google.maps.event.addDomListener(window, 'load', initialize);

    

function actb(obj,ca){
	/* ---- Public Variables ---- */
	this.actb_timeOut = -1; // Autocomplete Timeout in ms (-1: autocomplete never time out)
	this.actb_lim = 4;    // Number of elements autocomplete can show (-1: no limit)
	this.actb_firstText = false; // should the auto complete be limited to the beginning of keyword?
	this.actb_mouse = true; // Enable Mouse Support
	this.actb_delimiter = new Array(';',',');  // Delimiter for multiple autocomplete. Set it to empty array for single autocomplete
	this.actb_startcheck = 1; // Show widget only after this number of characters is typed in.
	/* ---- Public Variables ---- */

	/* --- Styles --- */
	this.actb_bgColor = '#888888';
	this.actb_textColor = '#FFFFFF';
	this.actb_hColor = '#000000';
	this.actb_fFamily = 'Verdana';
	this.actb_fSize = '11px';
	this.actb_hStyle = 'text-decoration:underline;font-weight="bold"';
	/* --- Styles --- */

	/* ---- Private Variables ---- */
	var actb_delimwords = new Array();
	var actb_cdelimword = 0;
	var actb_delimchar = new Array();
	var actb_display = false;
	var actb_pos = 0;
	var actb_total = 0;
	var actb_curr = null;
	var actb_rangeu = 0;
	var actb_ranged = 0;
	var actb_bool = new Array();
	var actb_pre = 0;
	var actb_toid;
	var actb_tomake = false;
	var actb_getpre = "";
	var actb_mouse_on_list = 1;
	var actb_kwcount = 0;
	var actb_caretmove = false;
	this.actb_keywords = new Array();
	/* ---- Private Variables---- */
	
	this.actb_keywords = ca;
	var actb_self = this;

	actb_curr = obj;
	
	addEvent(actb_curr,"focus",actb_setup);
	function actb_setup(){
		addEvent(document,"keydown",actb_checkkey);
		addEvent(actb_curr,"blur",actb_clear);
		addEvent(document,"keypress",actb_keypress);
	}

	function actb_clear(evt){
		if (!evt) evt = event;
		removeEvent(document,"keydown",actb_checkkey);
		removeEvent(actb_curr,"blur",actb_clear);
		removeEvent(document,"keypress",actb_keypress);
		actb_removedisp();
	}
	function actb_parse(n){
		if (actb_self.actb_delimiter.length > 0){
			var t = actb_delimwords[actb_cdelimword].trim().addslashes();
			var plen = actb_delimwords[actb_cdelimword].trim().length;
		}else{
			var t = actb_curr.value.addslashes();
			var plen = actb_curr.value.length;
		}
		var tobuild = '';
		var i;

		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}
		var p = n.search(re);
				
		for (i=0;i<p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "<font style='"+(actb_self.actb_hStyle)+"'>"
		for (i=p;i<plen+p;i++){
			tobuild += n.substr(i,1);
		}
		tobuild += "</font>";
			for (i=plen+p;i<n.length;i++){
			tobuild += n.substr(i,1);
		}
		return tobuild;
	}
	function actb_generate(){
		if (document.getElementById('tat_table')){ actb_display = false;document.body.removeChild(document.getElementById('tat_table')); } 
		if (actb_kwcount == 0){
			actb_display = false;
			return;
		}
		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		document.body.appendChild(a);
		var i;
		var first = true;
		var j = 1;
		if (actb_self.actb_mouse){
			a.onmouseout = actb_table_unfocus;
			a.onmouseover = actb_table_focus;
		}
		var counter = 0;
		for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				counter++;
				r = a.insertRow(-1);
				if (first && !actb_tomake){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else if(actb_pre == i){
					r.style.backgroundColor = actb_self.actb_hColor;
					first = false;
					actb_pos = counter;
				}else{
					r.style.backgroundColor = actb_self.actb_bgColor;
				}
				r.id = 'tat_tr'+(j);
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = actb_self.actb_fFamily;
				c.style.fontSize = actb_self.actb_fSize;
				c.innerHTML = actb_parse(actb_self.actb_keywords[i]);
				c.id = 'tat_td'+(j);
				c.setAttribute('pos',j);
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick=actb_mouseclick;
					c.onmouseover = actb_table_highlight;
				}
				j++;
			}
			if (j - 1 == actb_self.actb_lim && j < actb_total){
				r = a.insertRow(-1);
				r.style.backgroundColor = actb_self.actb_bgColor;
				c = r.insertCell(-1);
				c.style.color = actb_self.actb_textColor;
				c.style.fontFamily = 'arial narrow';
				c.style.fontSize = actb_self.actb_fSize;
				c.align='center';
				replaceHTML(c,'\\/');
				if (actb_self.actb_mouse){
					c.style.cursor = 'pointer';
					c.onclick = actb_mouse_down;
				}
				break;
			}
		}
		actb_rangeu = 1;
		actb_ranged = j-1;
		actb_display = true;
		if (actb_pos <= 0) actb_pos = 1;
	}
	function actb_remake(){
		document.body.removeChild(document.getElementById('tat_table'));
		a = document.createElement('table');
		a.cellSpacing='1px';
		a.cellPadding='2px';
		a.style.position='absolute';
		a.style.top = eval(curTop(actb_curr) + actb_curr.offsetHeight) + "px";
		a.style.left = curLeft(actb_curr) + "px";
		a.style.backgroundColor=actb_self.actb_bgColor;
		a.id = 'tat_table';
		if (actb_self.actb_mouse){
			a.onmouseout= actb_table_unfocus;
			a.onmouseover=actb_table_focus;
		}
		document.body.appendChild(a);
		var i;
		var first = true;
		var j = 1;
		if (actb_rangeu > 1){
			r = a.insertRow(-1);
			r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			c.style.color = actb_self.actb_textColor;
			c.style.fontFamily = 'arial narrow';
			c.style.fontSize = actb_self.actb_fSize;
			c.align='center';
			replaceHTML(c,'/\\');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_up;
			}
		}
		for (i=0;i<actb_self.actb_keywords.length;i++){
			if (actb_bool[i]){
				if (j >= actb_rangeu && j <= actb_ranged){
					r = a.insertRow(-1);
					r.style.backgroundColor = actb_self.actb_bgColor;
					r.id = 'tat_tr'+(j);
					c = r.insertCell(-1);
					c.style.color = actb_self.actb_textColor;
					c.style.fontFamily = actb_self.actb_fFamily;
					c.style.fontSize = actb_self.actb_fSize;
					c.innerHTML = actb_parse(actb_self.actb_keywords[i]);
					c.id = 'tat_td'+(j);
					c.setAttribute('pos',j);
					if (actb_self.actb_mouse){
						c.style.cursor = 'pointer';
						c.onclick=actb_mouseclick;
						c.onmouseover = actb_table_highlight;
					}
					j++;
				}else{
					j++;
				}
			}
			if (j > actb_ranged) break;
		}
		if (j-1 < actb_total){
			r = a.insertRow(-1);
			r.style.backgroundColor = actb_self.actb_bgColor;
			c = r.insertCell(-1);
			c.style.color = actb_self.actb_textColor;
			c.style.fontFamily = 'arial narrow';
			c.style.fontSize = actb_self.actb_fSize;
			c.align='center';
			replaceHTML(c,'\\/');
			if (actb_self.actb_mouse){
				c.style.cursor = 'pointer';
				c.onclick = actb_mouse_down;
			}
		}
	}
	function actb_goup(){
		if (!actb_display) return;
		if (actb_pos == 1) return;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos--;
		if (actb_pos < actb_rangeu) actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_godown(){
		if (!actb_display) return;
		if (actb_pos == actb_total) return;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos++;
		if (actb_pos > actb_ranged) actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_movedown(){
		actb_rangeu++;
		actb_ranged++;
		actb_remake();
	}
	function actb_moveup(){
		actb_rangeu--;
		actb_ranged--;
		actb_remake();
	}

	/* Mouse */
	function actb_mouse_down(){
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos++;
		actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouse_up(evt){
		if (!evt) evt = event;
		if (evt.stopPropagation){
			evt.stopPropagation();
		}else{
			evt.cancelBubble = true;
		}
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos--;
		actb_moveup();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		actb_curr.focus();
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list=0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_mouseclick(evt){
		if (!evt) evt = event;
		if (!actb_display) return;
		actb_mouse_on_list = 0;
		actb_pos = this.getAttribute('pos');
		actb_penter();
	}
	function actb_table_focus(){
		actb_mouse_on_list = 1;
	}
	function actb_table_unfocus(){
		actb_mouse_on_list = 0;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	function actb_table_highlight(){
		actb_mouse_on_list = 1;
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_bgColor;
		actb_pos = this.getAttribute('pos');
		while (actb_pos < actb_rangeu) actb_moveup();
		while (actb_pos > actb_ranged) actb_movedown();
		document.getElementById('tat_tr'+actb_pos).style.backgroundColor = actb_self.actb_hColor;
		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
	}
	/* ---- */

	function actb_insertword(a){
		if (actb_self.actb_delimiter.length > 0){
			str = '';
			l=0;
			for (i=0;i<actb_delimwords.length;i++){
				if (actb_cdelimword == i){
					prespace = postspace = '';
					gotbreak = false;
					for (j=0;j<actb_delimwords[i].length;++j){
						if (actb_delimwords[i].charAt(j) != ' '){
							gotbreak = true;
							break;
						}
						prespace += ' ';
					}
					for (j=actb_delimwords[i].length-1;j>=0;--j){
						if (actb_delimwords[i].charAt(j) != ' ') break;
						postspace += ' ';
					}
					str += prespace;
					str += a;
					l = str.length;
					if (gotbreak) str += postspace;
				}else{
					str += actb_delimwords[i];
				}
				if (i != actb_delimwords.length - 1){
					str += actb_delimchar[i];
				}
			}
			actb_curr.value = str;
			setCaret(actb_curr,l);
		}else{
			actb_curr.value = a;
		}
		actb_mouse_on_list = 0;
		actb_removedisp();
	}
	function actb_penter(){
		if (!actb_display) return;
		actb_display = false;
		var word = '';
		var c = 0;
		for (var i=0;i<=actb_self.actb_keywords.length;i++){
			if (actb_bool[i]) c++;
			if (c == actb_pos){
				word = actb_self.actb_keywords[i];
				break;
			}
		}
		actb_insertword(word);
		l = getCaretStart(actb_curr);
	}
	function actb_removedisp(){
		if (actb_mouse_on_list==0){
			actb_display = 0;
			if (document.getElementById('tat_table')){ document.body.removeChild(document.getElementById('tat_table')); }
			if (actb_toid) clearTimeout(actb_toid);
		}
	}
	function actb_keypress(e){
		if (actb_caretmove) stopEvent(e);
		return !actb_caretmove;
	}
	function actb_checkkey(evt){
		if (!evt) evt = event;
		a = evt.keyCode;
		caret_pos_start = getCaretStart(actb_curr);
		actb_caretmove = 0;
		switch (a){
			case 38:
				actb_goup();
				actb_caretmove = 1;
				return false;
				break;
			case 40:
				actb_godown();
				actb_caretmove = 1;
				return false;
				break;
			case 13: case 9:
				if (actb_display){
					actb_caretmove = 1;
					actb_penter();
					return false;
				}else{
					return true;
				}
				break;
			default:
				setTimeout(function(){actb_tocomplete(a)},50);
				break;
		}
	}

	function actb_tocomplete(kc){
		if (kc == 38 || kc == 40 || kc == 13) return;
		var i;
		if (actb_display){ 
			var word = 0;
			var c = 0;
			for (var i=0;i<=actb_self.actb_keywords.length;i++){
				if (actb_bool[i]) c++;
				if (c == actb_pos){
					word = i;
					break;
				}
			}
			actb_pre = word;
		}else{ actb_pre = -1};
		
		if (actb_curr.value == ''){
			actb_mouse_on_list = 0;
			actb_removedisp();
			return;
		}
		if (actb_self.actb_delimiter.length > 0){
			caret_pos_start = getCaretStart(actb_curr);
			caret_pos_end = getCaretEnd(actb_curr);
			
			delim_split = '';
			for (i=0;i<actb_self.actb_delimiter.length;i++){
				delim_split += actb_self.actb_delimiter[i];
			}
			delim_split = delim_split.addslashes();
			delim_split_rx = new RegExp("(["+delim_split+"])");
			c = 0;
			actb_delimwords = new Array();
			actb_delimwords[0] = '';
			for (i=0,j=actb_curr.value.length;i<actb_curr.value.length;i++,j--){
				if (actb_curr.value.substr(i,j).search(delim_split_rx) == 0){
					ma = actb_curr.value.substr(i,j).match(delim_split_rx);
					actb_delimchar[c] = ma[1];
					c++;
					actb_delimwords[c] = '';
				}else{
					actb_delimwords[c] += actb_curr.value.charAt(i);
				}
			}

			var l = 0;
			actb_cdelimword = -1;
			for (i=0;i<actb_delimwords.length;i++){
				if (caret_pos_end >= l && caret_pos_end <= l + actb_delimwords[i].length){
					actb_cdelimword = i;
				}
				l+=actb_delimwords[i].length + 1;
			}
			var ot = actb_delimwords[actb_cdelimword].trim(); 
			var t = actb_delimwords[actb_cdelimword].addslashes().trim();
		}else{
			var ot = actb_curr.value;
			var t = actb_curr.value.addslashes();
		}
		if (ot.length == 0){
			actb_mouse_on_list = 0;
			actb_removedisp();
		}
		if (ot.length < actb_self.actb_startcheck) return this;
		if (actb_self.actb_firstText){
			var re = new RegExp("^" + t, "i");
		}else{
			var re = new RegExp(t, "i");
		}

		actb_total = 0;
		actb_tomake = false;
		actb_kwcount = 0;
		for (i=0;i<actb_self.actb_keywords.length;i++){
			actb_bool[i] = false;
			if (re.test(actb_self.actb_keywords[i])){
				actb_total++;
				actb_bool[i] = true;
				actb_kwcount++;
				if (actb_pre == i) actb_tomake = true;
			}
		}

		if (actb_toid) clearTimeout(actb_toid);
		if (actb_self.actb_timeOut > 0) actb_toid = setTimeout(function(){actb_mouse_on_list = 0;actb_removedisp();},actb_self.actb_timeOut);
		actb_generate();
	}
	return this;
}

/* Event Functions */

// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
function addEvent(obj,event_name,func_name){
	if (obj.attachEvent){
		obj.attachEvent("on"+event_name, func_name);
	}else if(obj.addEventListener){
		obj.addEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = func_name;
	}
}

// Removes an event from the object
function removeEvent(obj,event_name,func_name){
	if (obj.detachEvent){
		obj.detachEvent("on"+event_name,func_name);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = null;
	}
}

// Stop an event from bubbling up the event DOM
function stopEvent(evt){
	evt || window.event;
	if (evt.stopPropagation){
		evt.stopPropagation();
		evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
	return false;
}

// Get the obj that starts the event
function getElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.currentTarget;
	}
}
// Get the obj that triggers off the event
function getTargetElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.target;
	}
}
// For IE only, stops the obj from being selected
function stopSelect(obj){
	if (typeof obj.onselectstart != 'undefined'){
		addEvent(obj,"selectstart",function(){ return false;});
	}
}

/*    Caret Functions     */

// Get the end position of the caret in the object. Note that the obj needs to be in focus first
function getCaretEnd(obj){
	if(typeof obj.selectionEnd != "undefined"){
		return obj.selectionEnd;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToEnd",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// Get the start position of the caret in the object
function getCaretStart(obj){
	if(typeof obj.selectionStart != "undefined"){
		return obj.selectionStart;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToStart",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// sets the caret position to l in the object
function setCaret(obj,l){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(l,l);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',l);
		m.collapse();
		m.select();
	}
}
// sets the caret selection from s to e in the object
function setSelection(obj,s,e){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(s,e);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',s);
		m.moveEnd('character',e);
		m.select();
	}
}

/*    Escape function   */
String.prototype.addslashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};
/* --- Escape --- */

/* Offset position from top of the screen */
function curTop(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return toreturn;
}
function curLeft(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return toreturn;
}
/* ------ End of Offset function ------- */

/* Types Function */

// is a given input a number?
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}

/* Object Functions */

function replaceHTML(obj,text){
	while(el = obj.childNodes[0]){
		obj.removeChild(el);
	};
	obj.appendChild(document.createTextNode(text));
}
