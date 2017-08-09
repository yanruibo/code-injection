





		
		var misDatos = {
				nombres : "",
				apellido : "",
				email : "",
				tipoDocumento : "",
				numeroDocumento : "",
				genero : ""
		}
		 
		$(document).on("pageinit", function() {
			
			$.mobile.showPageLoadingMsg("a", "Cargando...", true);
			
			document.addEventListener("deviceready", onDeviceReady, false);
			
			function onDeviceReady(){

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSInit, fail);
			}
			 
			$.support.cors = true; 
			$.mobile.allowCrossDomainPages = true;
			
			function gotFSInit(fileSystem){
				fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", null, gotFileEntryRead, fail);
			}
			
			function gotFileEntryRead(fileEntry) {
				fileEntry.file(leerArchivo, fail);
		    }
			
			function leerArchivo(file){
				var reader = new FileReader();
		        reader.onloadend = function(evt) {
		            console.log("Read as text");
		            console.log(evt.target.result);
		            
		            var datos = jQuery.parseJSON(evt.target.result);
		            
		            misDatos = datos;
		            
		            $('#datosNombres').val(datos.nombres);
	    			$('#datosApellido').val(datos.apellido);
	    			$('#datosTipoDocumento').val(datos.tipoDocumento);
	    			$('#datosEmail').val(datos.email);
	    			$('#datosNumeroDocumento').val(datos.numeroDocumento);
	    			$('#datosSexo').val(datos.genero);
	    			
	    			$('#datosTipoDocumento').selectmenu("refresh");
	    			$('#datosSexo').selectmenu("refresh");
	    			
	    			$.mobile.loading('hide');
		            
		        };
		        reader.readAsText(file);
			}

		    function gotFS(fileSystem) {
		    	console.log("obtengo file system");
                console.log("VAAAAA"+fileSystem.root.name);
		        fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", {create: true, exclusive: false}, gotFileEntry, fail);
		    }
	
		    function gotFileEntry(fileEntry) {
		        fileEntry.createWriter(gotFileWriter, fail);
		    }
		    
		    function eliminarArchivo(){
		    	console.log("Elimino archivo anterior");
		    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSEliminar, fail);
		    }
		    
		    function gotFSEliminar(fileSystem){
		    	fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", {create: true, exclusive: false}, eliminarArchivoSuccess, fail);
		    }
		    
		    function eliminarArchivoSuccess(fileEntry){
		    	console.log("Realizo la eliminiación efectiva");
		    	fileEntry.remove(function(){
		    		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		    	},fail);
		    }
	
		    function gotFileWriter(writer) {
		    	console.log("Escribo datos nuevos");
		    	var datosUsuario = {
		    			nombres : $('#datosNombres').val(),
		    			apellido : $('#datosApellido').val(),
		    			email : $('#datosEmail').val(),
		    			tipoDocumento : $('#datosTipoDocumento').val(),
		    			numeroDocumento : $('#datosNumeroDocumento').val(),
		    			genero : $('#datosSexo').val()
		    	}
		    	
		        writer.write(JSON.stringify(datosUsuario));
		    	
		    	writer.onwriteend = function(evt) {
		    		navigator.notification.alert("para finalizar seguí las instrucciones enviadas a tu e-mail", alertDismissedFinal, "Datos actualizados", "Aceptar");
		    	}
		    	$.mobile.loading('hide');
		    }
		    
			function alertDismissedFinal() { 
			    window.location = "index.html";
			}
			
			function alertDismissed(){
				
			}
	
		    function fail(evt) {
		        console.log(evt.target.error.code);
                       //console.log(error.errorMsg):
		        //navigator.notification.alert("Para poder cargar tus reclamos deberás ingresar tus datos", alertDismissed, "ATENCIÓN", "Aceptar");
		    }
		    
		    function validateNumero(value){
				return isNan(value);
			}
			
			function esVacio(value){
				if(value == undefined || value == null || value == ""){
					return true;
				}
				else{
					return false;
				}
			}
			
			function validateEmail(email) { 
			    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(email);
			}

			function validateName(name) {
			    var re = /^([a-z ñáéíóú]{1,60})$/i;
			    return re.test(name);
			}
			
			function validarDatos(){
				
				var datosOk = true;
				var errorMsg = "";
				
				var nombres = $('#datosNombres').val();
		    	var apellido = $('#datosApellido').val();
		    	var email = $('#datosEmail').val();
		    	var tipoDocumento = $('#datosTipoDocumento').val();
		    	var numeroDocumento = $('#datosNumeroDocumento').val();
		    	var genero = $('#datosSexo').val();
		    	
		    	$('#datosNombres').removeClass("error-mis-datos");
		    	$('#datosApellido').removeClass("error-mis-datos");
		    	$('#datosEmail').removeClass("error-mis-datos");
		    	$('#datosTipoDocumento').removeClass("error-mis-datos");
		    	$('#datosNumeroDocumento').removeClass("error-mis-datos");
		    	$('#datosSexo').removeClass("error-mis-datos");
				
				if((validateName(nombres) != true) || esVacio(nombres)){
					$('#datosNombres').addClass("error-mis-datos");
					errorMsg += "Nombre \n";
					var datosOk = false;
				}
				if((validateName(apellido) != true) || esVacio(apellido)){
					$('#datosApellido').addClass("error-mis-datos");
					errorMsg += "Apellidos \n";
					var datosOk = false;
				}
				if((validateEmail(email) != true ) || esVacio(apellido)){
					$('#datosEmail').addClass("error-mis-datos");
					errorMsg += "Email \n";
					var datosOk = false;
				}
				if(esVacio(numeroDocumento)){
					$('#datosNumeroDocumento').addClass("error-mis-datos");
					errorMsg += "Número de documento \n";
					var datosOk = false;
				}
				if(esVacio(tipoDocumento) || tipoDocumento == "SELECCIONÁ"){
					errorMsg += "Tipo de documento \n";
					var datosOk = false;
				}
				if(esVacio(genero) || genero == "SELECCIONÁ"){
					errorMsg += "Género \n";
					var datosOk = false;
				}
				
				if(datosOk === false){
					navigator.notification.alert("Para poder cargar tus reclamos deberás ingresar tus datos: \n" + errorMsg, alertDismissed, "ATENCIÓN", "Aceptar");
					$.mobile.loading('hide');
				}
				
				return datosOk;
			}

		    
		    $('#butDatosGuardar').on("click", function(event){
		    	event.preventDefault();
				if(!event.isPropagationStopped()){
					event.stopPropagation();
					
			    	$.mobile.showPageLoadingMsg("a", "Cargando...", true);
			    	
			    	var nombres = $('#datosNombres').val();
			    	var apellido = $('#datosApellido').val();
			    	var email = $('#datosEmail').val();
			    	var tipoDocumento = $('#datosTipoDocumento').val();
			    	var numeroDocumento = $('#datosNumeroDocumento').val();
			    	var genero = $('#datosSexo').val();
			    	
			    	console.log(validarDatos());
			    	
			    	if(validarDatos() === true){
			    		
				    	if(nombres != misDatos.nombres || 
				    			apellido != misDatos.apellido ||
				    			email != misDatos.email ||
				    			tipoDocumento != misDatos.tipoDocumento ||
				    			numeroDocumento != misDatos.numeroDocumento ||
				    			genero != misDatos.genero){
						    	var soapMessage =
									'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
										<soap:Body> \
											<ns1:validarEmail xmlns:ns1="http://ciudadano.service.buenosaires.gob.ar/"> \
				  							  <ciudadano> \
												    <nombres>' + nombres + '</nombres> \
												    <apellidos>' + apellido +'</apellidos> \
												    <tipoDocumento>' + tipoDocumento + '</tipoDocumento> \
												    <numeroDocumento>' + numeroDocumento + '</numeroDocumento> \
												    <email>' + email + '</email> \
												    <genero>' + genero + '</genero> \
											  </ciudadano> \
											</ns1:validarEmail> \
										</soap:Body> \
									</soap:Envelope>';
				
								console.log("SOAP: " + soapMessage);
								console.log("REALIZO UN ENVÍO DE DATOS");
								$.ajax({
									url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=validarEmail",
									type: "POST",
									dataType: "xml",
									data: soapMessage,
									complete: validarEmailResponse,
									error : errorEnviarDatos,
									contentType: "text/xml; charset=\"utf-8\""
								});
				    			
				    	}else{
				    		window.location="index.html";
				    	}
			    	}
		    		else{
		    			$.mobile.loading('hide');	
		    		}
				}
	    	});
		    
		    function errorEnviarDatos(xmlHttpRequest, status){
		    	console.log(xmlHttpRequest.responseXML);
		    	console.log(xmlHttpRequest.responseText);
		    	navigator.notification.alert("Se produjo un error al enviar tus datos, intentá nuevamente en unos minutos", alertDismissed, "ATENCIÓN", "Aceptar");
		    	$.mobile.loading('hide');
		    }
		    
		    function validarEmailResponse(xmlHttpRequest, status){
		    	console.log(xmlHttpRequest.responseXML);
		    	console.log(xmlHttpRequest.responseText);
		    	
		    	$(xmlHttpRequest.responseXML)
			    .find('validarEmail')
			    .each(function(index, element){
			    	if($(element).text() == "true"){
			    		window.localStorage.setItem("tieneEmailValidado", "false");
			    		eliminarArchivo();
			    	}
			    });
		    	
		    }
		    
		 });
	    











		$(document).on("pageinit", function() {

			$.support.cors = true; 
			$.mobile.allowCrossDomainPages = true;
			
			$("#butReclamo").click(function(event){
				event.preventDefault();
				$.mobile.showPageLoadingMsg("a", "Cargando...", true);
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSInit, falloObtenerFileSystem);
			});
			
			$("#butHistorial").click(function(event){
				window.location="historia.html";
			});
			
			
			function gotFSInit(fileSystem){
				fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", null, gotFileEntryRead, falloLeerArchivo);
			}
			 
			function onDeviceReady() {
				$.mobile.loading('hide');	
		    }
			
			function gotFileEntryRead(fileEntry) {
				fileEntry.file(leerArchivo, falloLeerArchivo);
		    }
			 
			function leerArchivo(file){
				var reader = new FileReader();
		        reader.onloadend = function(evt) {
		            console.log("Read as text");
		            console.log(evt.target.result);
		            
		            var datos = jQuery.parseJSON(evt.target.result);
		            window.location = "denuncia.html";
	    			//validarEmail(datos);
		            
		        };
		        reader.readAsText(file);
			}
			
			function falloLeerArchivo(){
				navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos", alertDismissed, "Información", "Aceptar");
			}
			
			function falloObtenerFileSystem(){
				navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos", alertDismissed, "Información", "Aceptar");
			}
			
			function alertDismissed(){
				window.location = "datos.html";
				$.mobile.loading('hide');
			}
			
			function validarEmail(datos){
				var soapMessage =
					'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
						<soap:Body> \
							<ns1:tieneEmailValidado xmlns:ns1="http://ciudadano.service.buenosaires.gob.ar/"> \
  							  <ciudadano> \
								    <nombres>' + datos.nombres + '</nombres> \
								    <apellidos>' + datos.apellido +'</apellidos> \
								    <tipoDocumento>' + datos.tipoDocumento + '</tipoDocumento> \
								    <numeroDocumento>' + datos.numeroDocumento + '</numeroDocumento> \
								    <email>' + datos.email + '</email> \
								    <genero>' + datos.genero + '</genero> \
							  </ciudadano> \
							</ns1:tieneEmailValidado> \
						</soap:Body> \
					</soap:Envelope>';

				$.ajax({
					url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=tieneEmailValidado",
					type: "POST",
					dataType: "xml",
					data: soapMessage,
					complete: validarEmailResponse,
					error : errorValidarEmail,
					contentType: "text/xml; charset=\"utf-8\""
				});
				
				return false;
			}
			
			function errorValidarEmail(response, status, error){
				navigator.notification.alert("Se ha producido un error inesperado, por favor, intentá nuevamente en unos minutos", alertDismissed, "Error", "Aceptar");
				console.log(response.responseText);
				console.log(status); 
				console.log(error);
				$.mobile.loading('hide');
			}
			
			function validarEmailResponse(xmlHttpRequest, status){
		 		$(xmlHttpRequest.responseXML)
			    .find('tieneEmailValidado')
			    .each(function(index, element){
			    	if($(element).text() == "true"){
			    		window.location = "denuncia.html";
			    	}
			    	else{
			    		navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos siguiendo las instrucciones enviadas a tu casilla de e-mail", null, "Información", "Aceptar");
			    	}
			    });
		 		$.mobile.loading('hide');
			}
			
	    	document.addEventListener("deviceready",onDeviceReady,false);
	    	
	    });
		







		
		
		
		$(document).on("pageshow", function() {
			$.mobile.showPageLoadingMsg("a", "Cargando...", true);
		});
			
			 $(document).on("pageinit", function() {

					$.support.cors = true; 
					$.mobile.allowCrossDomainPages = true;
					
					$("#butDenunciar").click(function(event){
						event.preventDefault();
						$.mobile.loadingMessageTextVisible = true;
						$.mobile.showPageLoadingMsg("a", "Cargando...",true);
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSInit, falloObtenerFileSystem);
					});
					
					function gotFSInit(fileSystem){
						fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", null, gotFileEntryRead, falloLeerArchivo);
					}
					 
					function onDeviceReady() {
						$.mobile.loading('hide');	
				    }
					
					function gotFileEntryRead(fileEntry) {
						fileEntry.file(leerArchivo, falloLeerArchivo);
				    }
					 
					function leerArchivo(file){
						var reader = new FileReader();
				        reader.onloadend = function(evt) {
				            console.log(evt.target.result);
				            
				            var datos = jQuery.parseJSON(evt.target.result);
				            window.location = "denuncia.html";
				            /* if(window.localStorage.getItem("tieneEmailValidado") == "true"){
				            	window.location = "denuncia.html";
				            }
				            else{
				    			validarEmail(datos);
				            } */
				            
				        };
				        reader.readAsText(file);
					}
					
					function falloLeerArchivo(){
						console.log("falló en obtener archivo");
						navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos", alertDismissed, "Información", "Aceptar");
						window.location = "datos.html";
					}

					function falloObtenerFileSystem(){
						console.log("falló en obtener file system");
						navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos", alertDismissed, "Información", "Aceptar");
						window.location = "datos.html";
					}
					
					function alertDismissed(){
						$.mobile.loading('hide');
					}
					
					function validarEmail(datos){
						var soapMessage =
							'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
								<soap:Body> \
									<ns1:tieneEmailValidado xmlns:ns1="http://ciudadano.service.buenosaires.gob.ar/"> \
		  							  <ciudadano> \
										    <nombres>' + datos.nombres + '</nombres> \
										    <apellidos>' + datos.apellido +'</apellidos> \
										    <tipoDocumento>' + datos.tipoDocumento + '</tipoDocumento> \
										    <numeroDocumento>' + datos.numeroDocumento + '</numeroDocumento> \
										    <email>' + datos.email + '</email> \
										    <genero>' + datos.genero + '</genero> \
									  </ciudadano> \
									</ns1:tieneEmailValidado> \
								</soap:Body> \
							</soap:Envelope>';
						
						$.ajax({
							url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=tieneEmailValidado",
							type: "POST",
							dataType: "xml",
							data: soapMessage,
							complete: validarEmailResponse,
							error : errorValidarEmail,
							contentType: "text/xml; charset=\"utf-8\""
						});
						
						return false;
					}
					
					function errorValidarEmail(response, status, error){
						navigator.notification.alert("Se ha producido un error inesperado, por favor, intentá nuevamente en unos minutos", alertDismissed, "Error", "Aceptar");
						$.mobile.loading('hide');
					}
					
					function validarEmailResponse(xmlHttpRequest, status){
				 		$(xmlHttpRequest.responseXML)
					    .find('tieneEmailValidado')
					    .each(function(index, element){
					    	if($(element).text() == "true"){
					    		window.localStorage.setItem("tieneEmailValidado", "true");
					    		window.location = "denuncia.html";
					    	}
					    	else{
					    		navigator.notification.alert("Recordá que para poder enviar reclamos tenés que confirmar tus datos", alertDismissed, "Información", "Aceptar");
					    		window.location = "datos.html";
					    	}
					    });
				 		$.mobile.loading('hide');
					}
					
			    	document.addEventListener("deviceready",onDeviceReady,false);
			    	
			    });
		






		
		 $(document).on("pageinit", function() {

				$.support.cors = true; 
				$.mobile.allowCrossDomainPages = true;
				
				function gotFSInit(fileSystem){
					fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", null, gotFileEntryRead, falloLeerArchivo);
				}
				
				function onDeviceReady() {
					$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSInit, falloObtenerFileSystem);
			    }
				
				function gotFileEntryRead(fileEntry) {
					fileEntry.file(leerArchivo, falloLeerArchivo);
			    }
				
				function leerArchivo(file){
					var reader = new FileReader();
			        reader.onloadend = function(evt) {
			            console.log("Read as text");
			            console.log(evt.target.result);
			            
			            var datos = jQuery.parseJSON(evt.target.result);
		    			obtenerReclamos(datos);
			            
			        };
			        reader.readAsText(file);
				}
				
				function falloLeerArchivo(){
					$('#headHistorial').text('Para poder consultar tus reclamos debés cargar tus datos');
					$('#parDescripcion').hide();
					$.mobile.loading('hide');
				}
				
				function falloObtenerFileSystem(){
					$('#headHistorial').text('Para poder consultar tus reclamos debés cargar tus datos');
					$('#parDescripcion').hide();
					$.mobile.loading('hide');
				}
				
				function alertDismissed(){
					
				}
				
				function obtenerReclamos(datos){
					var soapMessage =
						'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ciud="http://ciudadano.service.buenosaires.gob.ar/"> \
						   <soapenv:Header/> \
						   <soapenv:Body> \
						      <ciud:obtenerEstadoContactosIniciadosPorCiudadano> \
						         <numeroDocumentoCiudadano>' + datos.numeroDocumento + '</numeroDocumentoCiudadano> \
						         <tipoDeContacto>RECLAMO</tipoDeContacto> \
						      </ciud:obtenerEstadoContactosIniciadosPorCiudadano> \
						   </soapenv:Body> \
						</soapenv:Envelope>';

					$.ajax({
						url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=obtenerEstadoContactosIniciadosPorCiudadano",
						type: "POST",
						dataType: "xml",
						data: soapMessage,
						complete: obtenerReclamosResponse,
						error : errorObtenerReclamos,
						contentType: "text/xml; charset=\"utf-8\""
					});
					
					return false;
				}
				
				function errorObtenerReclamos(response, status, error){
					$('#headHistorial').text('Se ha producido un error inesperado, por favor, intente nuevamente en unos minutos');
					console.log(response.responseText);
					console.log(status);
					console.log(error);
					$.mobile.loading('hide');
				}
				
				function obtenerReclamosResponse(xmlHttpRequest, status){
					$('#lstReclamos').html("");
					$('#lstReclamos').append('<li data-role="list-divider" role="heading">Tus reclamos</li>');
					$('#lstReclamos').listview('refresh');
			 		$(xmlHttpRequest.responseXML)
				    .find('obtenerEstadoContactosIniciadosPorCiudadano')
				    .each(function(index, element){
				    	$('#lstReclamos').append('<li>Ticket #' + $(this).find('identificador').text() + ': <span class="estado_reclamo_ok">' + $(this).find('estado').text() + '</span></li>');
				    	$('#lstReclamos').listview('refresh')
				    });
			 		$.mobile.loading('hide');
				}
				
		    	document.addEventListener("deviceready",onDeviceReady,false);
		    	
		    });
	









		
		var contacto = {
				imagen : "",
				ciudadano : "",
				calle : "",
				altura : "",
				prestacion : "",
				token : "",
				observacion : "",
				rubroTexto : "",
				prestacionTexto : "",
				areaTexto : ""
		}

		$(document).on("pageshow", function(event, ui) {
			if(ui.prevPage[0] != undefined && ui.prevPage[0].attributes.id.value == "pagDatos"){
				contacto.observacion = $("#repDescripcion").val();
				$('#txtConfirmacionDireccion').text(contacto.calle + " " + contacto.altura);
				$('#txtConfirmacionCategoria').text(contacto.rubroTexto);
				$('#txtConfirmacionReclamo').text(contacto.prestacionTexto);
				$('#txtConfirmacionArea').text(contacto.areaTexto);
				if(contacto.observacion.length > 0){
					$('#txtConfirmacionDescripcion').text(contacto.observacion);
				}
				else{
					$('#txtConfirmacionDescripcion').text(" - ");
				}
				
				if(contacto.imagen.length > 0){
					var imagenMini = document.getElementById('imgConfirmacionFoto');
					var txtConfirmacionFoto = document.getElementById('txtConfirmacionFoto');
	
					imagenMini.style.display = 'block';
					txtConfirmacionFoto.style.display = 'block';
	
					imagenMini.src = "data:image/jpeg;base64," + contacto.imagen;
					
				}
			}
			if(ui.prevPage[0] != undefined && ui.prevPage[0].attributes.id.value == "pagLocalizacion"){
				if(prestaciones.getIsEmpty()){
					$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
				}
			}

		});
		
		var prestaciones = {
			
			idAreas : 0,
			areas : new Array(),
			isEmpty : true,
		
			getIsEmpty : function(){
				if(this.isEmpty == true){
					return true;
				}
				return false;
			},
		
			agregarArea : function (nombreArea){
				console.log("AGREGO AREA: " + nombreArea);
				console.log("cantidad antes de agregar: " + this.areas.length);
				this.isEmpty = false;
				this.areas[this.idAreas] = {
						id : this.idAreas,
						nombre : nombreArea,
						rubros : new Array(),
						idRubros : 0,
						agregarRubro : function(nombreRubro){
							this.rubros[this.idRubros] = {
									id : this.idRubros,
									nombre : nombreRubro,
									reclamos : new Array(),
									idReclamos : 0,
									agregarReclamo : function(nombreReclamo, codigoReclamo){
										this.reclamos[this.idReclamos] = {
												idReclamo : this.idReclamos,
												nombre : nombreReclamo,
												codigo : codigoReclamo												
										}
										this.idReclamos++;
									}
							}
							this.idRubros++;
						},
						getRubroId : function(rubro){
							for(var j = 0; j < this.rubros.length; j++){
								if(rubro == this.rubros[j].nombre){
									return this.rubros[j].id;
								}
							}
							return false;
						}
				}
				this.idAreas++;
				console.log("cantidad DESPUES de agregar: " + this.areas.length);
			},
			
			getAreaId : function(area){
				console.log("busco area: " + area);

				for(var i = 0; i < this.areas.length; i++){
					if(area == this.areas[i].nombre){
						console.log("DEVUELVO ID DE AREA: " + this.areas[i].id);
						return this.areas[i].id;
					}
				}
				console.log("AREA NO ENCONTRADA: " + area);
				return false;
			}
			
		}
			 
		
	    $(document).on("pageinit", function() {
	    	
			$.support.cors = true; 
			$.mobile.allowCrossDomainPages = true;
			
			var n = usig.NormalizadorDirecciones.init(
					{ lazyDataLoad: false, 
						aceptarCallesSinAlturas: false, 
						callesEnMinusculas: true });

			$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
			/* FOTOS */

			var pictureSource;
	        var destinationType;
	        
	        function onDeviceReady(){
	        	pictureSource = navigator.camera.PictureSourceType;
	        	destinationType = navigator.camera.DestinationType;
	        	obtenerAreasTematicas();
	        }
	    						
		    var onPhotoDataSuccess = function(imageData){
		    	
		    	var smallImage = document.getElementById('photo');

		        smallImage.style.display = 'block';

		        smallImage.src = "data:image/jpeg;base64," + imageData;
		        
		        contacto.imagen = imageData;
		        
		        var anchoTotal = $("body").width();
			  	$("#photo").width(anchoTotal - 45);
		    }
			
		    var onPhotoDataSuccessGallery = function(imageURI){
		    	
		    	var smallImage = document.getElementById('photo');

		    	smallImage.style.display = 'block'; 
 
		        smallImage.src = imageURI;
		        
		        var anchoTotal = $("body").width();
			  	$("#photo").width(anchoTotal - 45);
		    	
		    }
			
			var onImageCaptureError = function(message){
				//navigator.notification.alert("Debe adjuntar una foto al reclamo", alertDismissed, "Recuerde", "Aceptar");
		    }
		    
		    $('#tomarFoto').unbind('click').on("click", function(){
		    	navigator.camera.getPicture(
			    			onPhotoDataSuccess, 
			    			onImageCaptureError, 
			    			{ 
			    				quality: 70,
			    				destinationType: destinationType.DATA_URL,
			    				encodingType: Camera.EncodingType.JPEG,
			    				targetWidth: 200,
			    				targetHeight: 200,
			    				correctOrientation : true 
	    					}
		    			);
		    });
		    
		    $('#tomarFotoGaleria').unbind('click').on("click", function(){
		    	navigator.camera.getPicture(
		    			onPhotoDataSuccess, 
		    			onImageCaptureError, 
		    			{ 
		    				quality: 70,
		            		destinationType: destinationType.DATA_URL,
		            		sourceType: pictureSource.SAVEDPHOTOALBUM,
		            		encodingType: Camera.EncodingType.JPEG,
		            		targetWidth: 200,
		    				targetHeight: 200,
		            		correctOrientation : true 
	            		});
		    });
	    
			/* FIN FOTOS */
			/* LOCALIZACION */
			
			/*
				{parcela: String, puerta: String, puerta_x: Float, puerta_y:Float, calle_alturas: String, esquina: String, metros_a_esquina: String, altura_par: String, altura_impar: String}					
			*/
			
			var direccion, optsMapaSMP, optsMapaDir = null;
			
			var ac = new usig.AutoCompleter('dir', {
	       		rootUrl: '../',
	       		skin: 'usig4',
	       		onReady: function() {
	       			$('#dir').val('').focus();
	       		},
	       		afterSelection: function(option) {
	       			direccion = option;
	       		},
	       		afterGeoCoding: function(pt) {
	    			if (pt instanceof usig.Punto) {
	    				if (direccion instanceof usig.Direccion) {
	    					direccion.setCoordenadas(pt);
	    				}				
	    			}
	    			if (direccion instanceof usig.ParcelaCatastral) {
	           			cargarMapaEstatico(direccion);
	           		}else if(direccion instanceof usig.Direccion){
	               		if (direccion.getTipo() == usig.Direccion.CALLE_Y_CALLE){
	               			cargarMapaEstatico(direccion);
	                   	}else{
	                   		geoCoder.getSMP(direccion.getCalle().codigo, direccion.getAltura(), cargarMapaEstatico, onError);
	                    }
	           		}else if(direccion instanceof usig.inventario.Objeto){
	           			var coord = direccion.ubicacion.getCentroide();
	               		geoCoder.reverseGeoCoding(coord.lon, coord.lat, cargarMapaEstatico, onError);
	           		}
	       		} 
	       	});
			 
			ac.addSuggester('Catastro', { inputPause: 200, minTextLength: 1, showError: false });
			geoCoder = new usig.GeoCoder();

			function onError(){
			};

			function cargarMapaEstatico(data) {
				
				var anchoTotal = $("body").width();
				
				var radio = $('#radio').val();
				
				contacto.calle = direccion.getCalle().nombre; 
				contacto.altura = direccion.getAltura(); 
				
				if (data.smp) {
					var pt = data.centroide?data.centroide:data.punto;
					optsMapaDir = {
						punto: new usig.Punto(pt.x, pt.y),
						marcarPunto: true,
						desc: data.smp,
						width: anchoTotal - 30,
						height: 200,
						radio: radio 
					};
				}else if (direccion instanceof usig.Direccion) {
               		
					optsMapaDir = {
						dir: direccion.toString(),
						marcarPunto: true,
						desc: direccion.toString(),
						width: anchoTotal - 30,
						height: 200,
						radio: radio 
					};
				}else if (direccion instanceof usig.inventario.Objeto) {
					optsMapaDir = {
							punto: direccion.ubicacion.getCentroide(),
							marcarPunto: true,
							desc: direccion.toString(),
							width: anchoTotal - 30,
							height: 200,
							radio: radio  
						};
				}
				
				
				$('#mapa').css('width', anchoTotal - 30).css('height', 200);
				
				$('#mapa').html(new usig.MapaEstatico(optsMapaDir));

			};
				
			$('#mainForm').bind("submit", function () {
				return false;
			});
			
			function geoCodeSuccess(res){
				
				var anchoTotal = $("body").width();
				$('#mapa').css('width', anchoTotal - 30).css('height', 200);
				
				$('#dir').val(res.puerta);
				
				try {
				    var direccionesNormalizadas = n.normalizar(res.puerta, 10);
				    var objDireccion = direccionesNormalizadas[0];
				    contacto.calle = objDireccion.getCalle().nombre;
				    contacto.altura = objDireccion.getAltura();
					
				} catch (error) {
				    
				}
				
				var img = usig.MapaEstatico(
						{ 
							desc: "Lugar del incidente",
							x: res.puerta_x, 
							y: res.puerta_y, 
							marcarPunto: true, 
							width: anchoTotal - 30,
							height: 200
						}
				);
				
				$('#mapa').html(img);
				
				$("#popupBuscandoLocalizacion").popup("close");
				
			}
			
			function geoCodeError(){
				//alert("Fallo");
			}
			
			function onLocalizationSuccess(position){
				
				var latitud = position.coords.latitude;
				var longitud = position.coords.longitude;

				var geoCoder = new usig.GeoCoder();
				
				geoCoder.reverseGeoCoding(longitud, latitud, geoCodeSuccess, geoCodeError);
			}
			
			function alertDismissed() { 
			     
			}
			  
			function onLocalizationError(error){
				$("#popupBuscandoLocalizacion").popup("close");
				navigator.notification.alert(
						"Debés ingresar una dirección", 
						alertDismissed, 
						"¡ATENCIÓN!", 
						"Aceptar");
			} 
			
			$('#butObtenerUbicacion').unbind('click').click(function(event){
				if(!event.isPropagationStopped()){
					$("#popupBuscandoLocalizacion").popup("open");
					navigator.geolocation.getCurrentPosition(
						onLocalizationSuccess, 
						onLocalizationError,
						{ 	
							maximumAge: 1 * 60 * 1000, 
							timeout: 30 * 1000,  
							enableHighAccuracy: true 
						}
					);
					event.stopPropagation();
				}
			});
			
			/* FIN LOCALIZACION */
			/*DATOS*/
			

			function obtenerAreasTematicas(){
				console.log("Inicio la llamada a las áreas");
				if(prestaciones.getIsEmpty() === true){
					console.log("############ Realizo una llamada efectiva #############");
					$('#repAreaId').html("<option>SELECCIONÁ UNA ÁREA</option>");
					$('#repRubroId').html("<option>SELECCIONÁ UNA CATEGORÍA</option>");
					$('#repPrestacionId').html("<option>SELECCIONÁ UN RECLAMO</option>");
					
					var soapMessage =
						'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
						<soap:Body> \
						<ns1:buscarPrestacionesActivasPorTipoPrestacion xmlns:ns1="http://ciudadano.service.buenosaires.gob.ar/"> \
						<!-- optional --> \
						<tipoPrestacion>RECLAMO</tipoPrestacion>\
						</ns1:buscarPrestacionesActivasPorTipoPrestacion>\
						</soap:Body> \
						</soap:Envelope>';
					
					$.ajax({
						url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=buscarPrestacionesActivasPorTipoPrestacion",
						type: "POST",
						dataType: "xml", 
						data: soapMessage,
						complete: obtenerAreasTematicasResponse,
						contentType: "text/xml; charset=\"utf-8\""
					});
					 
					return false;
				}
				
			}
			 
			function obtenerAreasTematicasResponse(xmlHttpRequest, status){
				
				$('#repRubroId').html("<option>SELECCIONÁ UNA CATEGORÍA</option>");
				
				$(xmlHttpRequest.responseXML)
				    .find('buscarPrestacionesActivasPorTipoPrestacion')
				    .each(function(index, element){

				    	var area = $(this).find('nombreAreaTematica').text();
				    	var rubro = $(this).find('rubro').text();
				    	var concepto = $(this).find('concepto').text();
				    	var codigo = $(this).find('codigo').text();
				    	
				    	var areaId = prestaciones.getAreaId(area);
				    	
				    	console.log("RECIBI: " + areaId);
				    	
				    	if(areaId === false){
				    		prestaciones.agregarArea(area);
				    		areaId = prestaciones.getAreaId(area);
				    	}
				    	console.log(areaId);
				    	
				    	var rubroId = prestaciones.areas[areaId].getRubroId(rubro);
				    	
				    	if(rubroId === false){
				    		prestaciones.areas[areaId].agregarRubro(rubro);
				    		rubroId = prestaciones.areas[areaId].getRubroId(rubro);				    		
				    	}
				    	
				    	prestaciones.areas[areaId].rubros[rubroId].agregarReclamo(concepto, codigo);
				    	
				    });
				
				$('#repAreaId').html("<option>ÁREA TEMÁTICA</option>");
				console.log(prestaciones.areas.length);
				for(var i = 0; i < prestaciones.areas.length; i++){
					$('#repAreaId').append("<option value='" + i +"'>" + prestaciones.areas[i].nombre + "</option>");
				}

				$.mobile.loading('hide');
			}
			
			$('#repAreaId').unbind('change').change(function(event){
 				if(!event.isPropagationStopped()){
 					$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
	 				$('#repRubroId').html("<option>SELECCIONÁ UN RUBRO</option>");
	 				$('#repPrestacionId').html("<option>SELECCIONÁ UN RECLAMO</option>");
	 				contacto.prestacion = 0;
	 				var areaId = $("#repAreaId").val();
	 				console.log("AREA SELECCIONADA: " + areaId);
	 				for(var i = 0; i < prestaciones.areas[areaId].rubros.length; i++){
	 					$('#repRubroId').append("<option value='" + prestaciones.areas[areaId].rubros[i].id + "'>" + prestaciones.areas[areaId].rubros[i].nombre + "</option>");
	 				}
	 				resizeSelect();
 					event.stopPropagation();
 					$.mobile.loading('hide');
 				}
 				
			});
			
 			$('#repRubroId').unbind('change').change(function(event){
 				if(!event.isPropagationStopped()){
 					$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
 					contacto.prestacion = 0;
	 				$('#repPrestacionId').html("<option>SELECCIONÁ UN RECLAMO</option>");
	 				var rubroId = $("#repRubroId").val();
	 				var areaId = $("#repAreaId").val();
	 				console.log("RUBRO SELECCIONADO: " + rubroId);
	 				for(var i = 0; i < prestaciones.areas[areaId].rubros[rubroId].reclamos.length; i++){
	 					$('#repPrestacionId').append("<option value='" + prestaciones.areas[areaId].rubros[rubroId].reclamos[i].codigo + "'>" + prestaciones.areas[areaId].rubros[rubroId].reclamos[i].nombre + "</option>");
	 				}
	 				resizeSelect();
 					event.stopPropagation();
 					$.mobile.loading('hide');
 				}
 				
			});
 			
 			$('#repPrestacionId').unbind('change').change(function(event){ 
 				if(!event.isPropagationStopped()){
					contacto.prestacion = ($('#repPrestacionId').val());
					contacto.rubroTexto = $('#repRubroId :selected').text();
					contacto.areaTexto = $('#repAreaId :selected').text();
					contacto.prestacionTexto = $('#repPrestacionId :selected').text();
					resizeSelect();
 					event.stopPropagation(); 
 				}
			});
 			
 			function resizeSelect(){
 				$(':selected').each(function(index, element){
 					if($(element).text().length > 28){
 						var texto = $(element).text(); 
 						$(element).text(texto.substring(0, 25) + "...");
 					}
 					$('#repRubroId').selectmenu('refresh');
	 				$('#repPrestacionId').selectmenu('refresh');
	 				$('#repAreaId').selectmenu('refresh');
 				});
 				
 			}
			
			/*FIN DATOS*/
			
			/* ENVIAR RECLAMO */
			
			function validarDatos(){
				console.log(contacto.calle);
				console.log(contacto.altura);
				console.log(contacto.prestacion);
				if(contacto.calle == "" || contacto.altura == "" || contacto.prestacion == ""){
					return false;
				}
				else{
					return true;
				}
			}
			
			$('#butEnviarReclamo').unbind('click').click(function(event){
				if(!event.isPropagationStopped()){
					event.stopPropagation();
					if(validarDatos() == true){
						$.mobile.showPageLoadingMsg("a", "Cargando...", true);				
						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSInit, falloObtenerFileSystem);
					}
					else{
						navigator.notification.alert("Alguno de los datos seleccionados es incorrecto, chequeá la ubicación y el reclamo seleccionado", alertDismissed, "Error", "Aceptar");
						$.mobile.loading('hide');
					}
				}
			});
			
			$(function() {
			    document.addEventListener("deviceready", onDeviceReady, true);
			});
			//document.addEventListener("deviceready",onDeviceReady,false);
			
			function gotFSInit(fileSystem){
				fileSystem.root.getFile("./Android/data/ar.gob.buenosaires.reclamos/ba147.json", null, gotFileEntryRead, falloLeerArchivo);
			}
			
			function gotFileEntryRead(fileEntry) {
				fileEntry.file(leerArchivo, falloLeerArchivo);
		    }
			
			function leerArchivo(file){
				var reader = new FileReader();
		        reader.onloadend = function(evt) {
		            console.log("Read as text");
		            console.log(evt.target.result);
		            
		            var datos = jQuery.parseJSON(evt.target.result);
	    			generarToken(datos);
		            
		        }; 
		        reader.readAsText(file);
			}
			
			function falloLeerArchivo(){
				navigator.notification.alert("Para poder enviar reclamos tenés que ingresar tus datos", alertDismissed, "Información", "Aceptar");
				$.mobile.loading('hide');
				window.location="datos.html";
			}
			
			function generarToken(datos){
				contacto.ciudadano = datos;
				var soapMessage =
					'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
						<soap:Body> \
							<ns1:obtenerToken xmlns:ns1="http://ciudadano.service.buenosaires.gob.ar/"> \
  							  <ciudadano> \
								    <nombres>' + datos.nombres + '</nombres> \
								    <apellidos>' + datos.apellido +'</apellidos> \
								    <tipoDocumento>' + datos.tipoDocumento + '</tipoDocumento> \
								    <numeroDocumento>' + datos.numeroDocumento + '</numeroDocumento> \
								    <email>' + datos.email + '</email> \
								    <genero>' + datos.genero + '</genero> \
							  </ciudadano> \
							</ns1:obtenerToken> \
						</soap:Body> \
					</soap:Envelope>';

				$.ajax({
					url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=obtenerToken",
					type: "POST",
					dataType: "xml",
					data: soapMessage,
					complete: generarTokenResponse,
					error : errorGenerarToken,
					contentType: "text/xml; charset=\"utf-8\""
				});
				
				return false;
			}
			
			function errorGenerarToken(response, status, error){
				navigator.notification.alert("Se ha producido un error inesperado, por favor, intentá nuevamente en unos minutos", alertDismissed, "Error", "Aceptar");
				$.mobile.loading('hide');
			}
			
			function generarTokenResponse(xmlHttpRequest, status){
		 		$(xmlHttpRequest.responseXML)
			    .find('obtenerToken')
			    .each(function(index, element){
			    	contacto.token = $(element).text();
			    	var soapMessage =
						'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ciud="http://ciudadano.ws.service.buenosaires.gob.ar/"> \
							<soapenv:Header/> \
							<soapenv:Body> \
							<ciud:crearYGuardarReclamo> \
					         <token>' + contacto.token + '</token> \
					         <peticionReclamo> \
					         	<observacion>' + contacto.observacion + '</observacion> \
					                <ciudadano> \
					                        <nombres>' + contacto.ciudadano.nombres +'</nombres> \
								            <apellidos>' + contacto.ciudadano.apellido +'</apellidos> \
								            <tipoDocumento>' + contacto.ciudadano.tipoDocumento +'</tipoDocumento> \
								            <numeroDocumento>' + contacto.ciudadano.numeroDocumento + '</numeroDocumento> \
								            <email>' + contacto.ciudadano.email +'</email> \
								            <genero>' + contacto.ciudadano.genero + '</genero> \
					                </ciudadano> \
					                <ciudadanoAnonimo>false</ciudadanoAnonimo> \
					                <prestacion> \
					                        <codigo>' + contacto.prestacion + '</codigo> \
					                </prestacion> \
					                <direccion> \
					                        <localidad>ciudadBuenosAires</localidad> \
					                        <calle>' + contacto.calle + '</calle> \
					                        <altura>' + contacto.altura + '</altura> \
					                </direccion> \
					                <medioDeContacto> \
					                        <correoElectronico>true</correoElectronico> \
					                        <telefonoParticular>false</telefonoParticular> \
					                        <telefonoCelular>false</telefonoCelular> \
					                </medioDeContacto> \
					                <imageBase64>' + contacto.imagen + '</imageBase64> \
					         </peticionReclamo> \
					      </ciud:crearYGuardarReclamo> \
					      </soapenv:Body> \
						</soapenv:Envelope>';
					console.log("########## Llamo a guardar reclamo #########");
					console.log(soapMessage);
					$.ajax({
						url: "http://suaci-gcba.buenosaires.gov.ar/suaci/services/operadorCiudadano?op=crearYGuardarReclamo",
						type: "POST",
						dataType: "xml",
						data: soapMessage,
						complete: generarContactoResponse,
						error : errorGenerarContacto,
						contentType: "text/xml; charset=\"utf-8\""
					});
					
					return false;

			    });

			} 
			
			function errorGenerarContacto(response){
				console.log(response.responseText);
				$.mobile.loading('hide');
			}
			
			function generarContactoResponse(xmlHttpRequest, status){
				var identificador = $(xmlHttpRequest.responseXML).find('identificador');
				if( !identificador.length){
					navigator.notification.alert(
							"Se ha producido un error al enviar el reclamo, por favor, intentá nuevamente en unos minutos", 
							alertDismissed, 
							"Error al enviar reclamo", 
							"Aceptar");
					$.mobile.loading('hide');
				}else{
					contacto = {
							imagen : "",
							ciudadano : "",
							calle : "",
							altura : "",
							prestacion : "",
							token : "",
							observacion : ""
					} 
				    window.location = "reclamo_ok.html";
				}
			}
			
			function falloObtenerFileSystem(){
				navigator.notification.alert("Para poder enviar reclamos tenés que ingresar tus datos", alertDismissed, "Información", "Aceptar");
				$.mobile.loading('hide');
				window.location="datos.html";
			}
			
			$('#butSiguienteDatos').unbind('click').click(function(event){
				event.preventDefault();
				if(!event.isPropagationStopped()){
					event.stopPropagation();
					if(contacto.calle == "" || contacto.altura == ""){
						navigator.notification.alert(
								"Debés ingresar una dirección", 
								alertDismissed, 
								"Ingresá una dirección", 
								"Aceptar");					
					}else{
						document.location.href="#pagDatos";
					}
				}
			});
			
			$('#butPrevisualizar').unbind('click').click(function(event){
				event.preventDefault();
				if(!event.isPropagationStopped()){
					event.stopPropagation();
					if(validarDatos()){
						document.location.href="#pagConfirmacion";
					}else{
						navigator.notification.alert("Alguno de los datos seleccionados es incorrecto, chequeá la ubicación y el reclamo seleccionado", alertDismissed, "Error", "Aceptar");					
					}
				}
			}); 
			
			
	    });

	    



jQuery.extendIf=function(d,e){if(d&&e){for(var b in e){if(typeof d[b]=="undefined"){d[b]=e[b]}}}return d};if(typeof(Ext)=="undefined"){jQuery.extend(Function.prototype,{createCallback:function(){var b=arguments;var c=this;return function(){return c.apply(window,b)}},createDelegate:function(d,c,b){var e=this;return function(){var g=c||arguments;if(b===true){g=Array.prototype.slice.call(arguments,0);g=g.concat(c)}else{if(typeof b=="number"){g=Array.prototype.slice.call(arguments,0);var f=[b,0].concat(c);Array.prototype.splice.apply(g,f)}}return e.apply(d||window,g)}},defer:function(d,f,c,b){var e=this.createDelegate(f,c,b);if(d){return setTimeout(e,d)}e();return 0},createSequence:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){var e=d.apply(this||window,arguments);c.apply(b||this||window,arguments);return e}},createInterceptor:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){c.target=this;c.method=d;if(c.apply(b||this||window,arguments)===false){return}return d.apply(this||window,arguments)}}});jQuery.extendIf(String,{escape:function(b){return b.replace(/('|\\)/g,"\\$1")},leftPad:function(e,c,d){var b=new String(e);if(!d){d=" "}while(b.length<c){b=d+b}return b.toString()},format:function(c){var b=Array.prototype.slice.call(arguments,1);return c.replace(/\{(\d+)\}/g,function(d,e){return b[e]})}})}String.prototype.isInteger=function(){return !isNaN(parseInt(this))};String.prototype.isFloat=function(){return !isNaN(parseFloat(this))};String.prototype.toggle=function(c,b){return this==c?b:c};String.prototype.trim=function(){var b=/^\s+|\s+$/g;return function(){return this.replace(b,"")}}();String.prototype.translate=function(e,d){if(!(e.length&&d.length)||e.length!=d.length){return this}var c=this;for(var b=0;b<e.length;b++){if(typeof(e)=="string"){c=c.replace(new RegExp(e.charAt(b),"g"),d.charAt(b))}else{c=c.replace(new RegExp(e[b],"g"),d[b])}}return c};String.prototype.isDigit=function(){return/^\d+$/.test(this)};String.prototype.removeWords=function(f){var e=this.split(" ");var d=new Array();for(var c=0;c<e.length;c++){d.push(e[c]);for(var b=0;b<f.length;b++){if(d[c]==f[b]){d.pop();break}}}return d.join(" ")};jQuery.extendIf(Number.prototype,{constrain:function(c,b){return Math.min(Math.max(this,c),b)},isInteger:function(){return !isNaN(parseInt(this))},isFloat:function(){return !isNaN(parseFloat(this))}});jQuery.extendIf(Array.prototype,{indexOf:function(d){for(var c=0,b=this.length;c<b;c++){if(this[c]==d){return c}}return -1},removeObject:function(c){var b=this.indexOf(c);if(b!=-1){this.splice(b,1)}return this},binarySearch:function binarySearch(g,c){var b=0,f=this.length-1,d,e;while(b<=f){d=parseInt((b+f)/2,10);e=c(this[d],g);if(e<0){b=d+1;continue}if(e>0){f=d-1;continue}return d}return -1},inject:function(d,c){for(var b=0;b<this.length;b++){d=c(d,this[b],b)}return d},map:function(e,d){var b=new Array(this.length);for(var c=0,f=this.length;c<f;c++){if(c in this){b[c]=e.call(d,this[c],c,this)}}return b},intersect:function(){if(!arguments.length){return[]}var e=this;var d=a2=null;var h=0;while(h<arguments.length){d=[];a2=arguments[h];var c=e.length;var b=a2.length;for(var g=0;g<c;g++){for(var f=0;f<b;f++){if(e[g]===a2[f]){d.push(e[g])}}}e=d;h++}return d.unique()},unique:function(){var c=[];var b=this.length;for(var e=0;e<b;e++){for(var d=e+1;d<b;d++){if(this[e]===this[d]){d=++e}}c.push(this[e])}return c}});Date.prototype.getElapsed=function(b){return Math.abs((b||new Date()).getTime()-this.getTime())};if(typeof(usig)=="undefined"){usig={}}usig.debug=function(b){if(window.console&&window.console.log){window.console.log(b)}};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Calle)=="undefined"){usig.Calle=function(b,c,e,d){this.codigo=b;this.nombre=c;this.alturaValida=function(g){if(e instanceof Array){if(e.length==0){throw (new usig.ErrorCalleSinAlturas(this.nombre));return false}var f=false;for(a in e){f=f||((parseInt(e[a][0])<=parseInt(g))&&(parseInt(e[a][1])>=parseInt(g)))}return f}};this.getTramos=function(){return e};this.toString=function(){return this.nombre};this.seCruzaCon=function(f){if(d){return d.indexOf(f.codigo)>=0}};this.toJson=function(){return{codigo:this.codigo,nombre:this.nombre}};this.isEqual=function(f){return this.codigo==f.codigo}};usig.Calle.fromObj=function(b){return new usig.Calle(b.codigo,b.nombre)}}if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Direccion)=="undefined"){usig.Direccion=(function(b){return function(c,g){var f=null;var k=null;var j=0;var e=null;var h="";var d=null;if(c instanceof usig.Calle){f=c}else{return null}if(g instanceof usig.Calle){k=g;e=usig.Direccion.CALLE_Y_CALLE}else{if(!isNaN(parseInt(g))){e=usig.Direccion.CALLE_ALTURA;j=parseInt(g)}else{return null}}this.getCalle=function(){return f};this.getCalleCruce=function(){if(e==usig.Direccion.CALLE_Y_CALLE){return k}else{return null}};this.getAltura=function(){return j};this.getTipo=function(){return e};this.toString=function(){if(e==usig.Direccion.CALLE_ALTURA){return f.toString()+" "+(j>0?j:"S/N")}else{var l=k.toString();var m=l.match(/^(I|Hi|HI).*/)?" e ":" y ";return f.toString()+m+l}};this.setCoordenadas=function(l){d=usig.Punto.fromPunto(l)};this.setSmp=function(l){h=l};this.getCoordenadas=function(){return d};this.getSmp=function(){return h};this.clone=function(){var l=new usig.Direccion(f,g);return b.extend(true,l,this)};this.toJson=function(){return{tipo:e,calle:f.toJson(),altura:j,calle_cruce:k?k.toJson():null,smp:h,coordenadas:d}};this.isEqual=function(l){var m=(l instanceof usig.Direccion&&(e==l.getTipo())&&((e==usig.Direccion.CALLE_ALTURA&&f.isEqual(l.getCalle())&&j==l.getAltura())||(e==usig.Direccion.CALLE_Y_CALLE&&((f.isEqual(l.getCalle())&&k.isEqual(l.getCalleCruce()))||(f.isEqual(l.getCalleCruce())&&k.isEqual(l.getCalle()))))));return m}}})(jQuery);usig.Direccion.CALLE_ALTURA=0;usig.Direccion.CALLE_Y_CALLE=1;usig.Direccion.fromObj=function(d){var b=null;if(d.tipo!=undefined){b=new usig.Direccion(usig.Calle.fromObj(d.calle),(d.tipo==usig.Direccion.CALLE_ALTURA)?d.altura:usig.Calle.fromObj(d.calle_cruce))}else{var c=new usig.Calle(d.cod_calle,d.calle);if(d.cod_calle2!=null){b=new usig.Direccion(c,new usig.Calle(d.cod_calle2,d.calle2))}else{b=new usig.Direccion(c,d.altura)}}if(d.smp!=undefined&&d.smp!=null){b.setSmp(d.smp)}if(d.coordenadas!=undefined&&d.coordenadas!=null){if(typeof(d.coordenadas)=="string"){b.setCoordenadas(usig.Punto.fromWkt(d.coordenadas))}else{b.setCoordenadas(usig.Punto.fromObj(d.coordenadas))}}return b}}if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.data)=="undefined"){usig.data={}}if(typeof(usig.defaults)=="undefined"){usig.defaults={}}usig.defaults.Callejero={server:"http://servicios.usig.buenosaires.gov.ar/callejero",lazyDataLoad:false,loadFullDatabase:true,callesEnMinusculas:false,encoding:"utf-8",expirationTime:10080};usig.Callejero=(function(h){var b={},p=this,e=false,m={ready:[]},n=false;function f(u,x){var t=true;for(var s=0;s<u.length;s++){var v=u[s];v.lastIndex=0;if(!v.test(x[2])){t=false;break}}return t}function q(s){n=false;if(s.length!=usig.data.Callejero.length){alert("Se produjo un error al cargar la información de cruces de calles.");return}for(var r=0;r<usig.data.Callejero.length;r++){usig.data.Callejero[r].push(s[r])}}function o(r){usig.data.Callejero=r;n=false;d("ready")}function j(){n=true;h.ajax({type:"GET",url:b.server,data:{full:1,cruces:1,encoding:b.encoding},dataType:"jsonp",success:q,error:function(){alert("Se produjo un error al intentar cargar la información de calles.")}})}function c(r){n=true;h.ajax({type:"GET",url:b.server,data:b.loadFullDatabase?{full:1,encoding:b.encoding,minusculas:b.callesEnMinusculas?1:0}:{encoding:b.encoding,minusculas:b.callesEnMinusculas?1:0},dataType:"jsonp",success:r,error:function(){alert("Se produjo un error al intentar cargar la información de calles.")}})}function g(){if(!n){if(!l()){c(o)}else{var s;try{if(localStorage.callejero){s=JSON.parse(localStorage.callejero)}if(s&&(new Date().getTime()<s.expiration)){o(JSON.parse(s.calles))}else{c(function(v){var t=b.expirationTime*60*1000;var u={calles:JSON.stringify(v),expiration:new Date().getTime()+t};localStorage.callejero=JSON.stringify(u);o(v)})}}catch(r){c(o)}}}}function l(){try{return"localStorage" in window&&window.localStorage!==null}catch(r){return false}}function d(s){for(var r=0;r<m[s].length;r++){m[s][r]()}}function k(t,s){var u=false;for(var r=0;r<m[t].length;r++){u=u||(m[t][r]==s)}if(!u){m[t].push(s)}}return{init:function(r){b=h.extend({},usig.defaults.Callejero,r);if(typeof(b.onReady)=="function"){k("ready",b.onReady)}e=true;if(!usig.data.Callejero&&!b.lazyDataLoad){g.defer(100)}else{if(usig.data.Callejero){d("ready")}}return this},buscarPorCodigo:function(u){var r=[];if(/^[0-9]+$/.test(u)){var t=usig.data.Callejero.binarySearch(u,function(w,v){return w[0]-v});if(t>-1){var s=usig.data.Callejero[t];r.push(new usig.Calle(s[0],s[1],s[3],s[4]));i=t+1;while(i<usig.data.Callejero.length&&usig.data.Callejero[i][0]==u){s=usig.data.Callejero[i];r.push(new usig.Calle(s[0],s[1],s[3],s[4]));i++}i=t-1;while(i>=0&&usig.data.Callejero[i][0]==u){s=usig.data.Callejero[i];r.unshift(new usig.Calle(s[0],s[1],s[3],s[4]));i--}}}return r},matcheaCalle:function(w,r){var u=[];var t=[];var s=w.replace(/"/g,"").translate("áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toUpperCase().trim();var v=s.split(" ");wordsRE=v.map(function(z){return new RegExp("^"+z+"| "+z,"gi")});var y=RegExp("SNO|SIN NOMBRE OFICIAL");if(this.listo()){for(var x=0;x<usig.data.Callejero.length;x++){if(f(wordsRE,usig.data.Callejero[x])){if(!y.test(usig.data.Callejero[x][1])){u.push(new usig.Calle(usig.data.Callejero[x][0],usig.data.Callejero[x][1],usig.data.Callejero[x][3],usig.data.Callejero[x][4]))}else{t.push(new usig.Calle(usig.data.Callejero[x][0],usig.data.Callejero[x][1],usig.data.Callejero[x][3],usig.data.Callejero[x][4]))}if(!isNaN(parseInt(r))&&u.length>=parseInt(r)){break}}}u=u.concat(t);if(!isNaN(parseInt(r))&&u.length>=parseInt(r)){u=u.splice(0,r)}if(usig.data.Callejero[0].length<5&&!n){j()}}else{g();throw (new usig.ErrorEnCargaDelCallejero())}return u},tieneTramosComoAv:function(s){var r=usig.data.Callejero.binarySearch(s.codigo,function(u,t){return u[0]-t});return s.codigo!=0&&(usig.data.Callejero[r-1][0]==s.codigo||usig.data.Callejero[r+1][0]==s.codigo)},getNombreCalle:function(t,u){var r=this.buscarPorCodigo(t);for(var s=0;s<r.length;s++){if(r[s].alturaValida(u)){return r[s].nombre}}return""},listo:function(){return usig.data.Callejero&&usig.data.Callejero instanceof Array},inicializado:function(){return e}}})(jQuery);if(typeof(usig)=="undefined"){usig={}}usig.StringDireccion=(function(b){return function(e,d){this.tipo=usig.StringDireccion.INVALIDO;this.strCalles="";this.strAltura="";this.strInput=e.replace(/"/g,"").replace(/[\.,\(\)']/g," ").toUpperCase().trim();var j=/[sS][/\\][nN]/;function f(l,k){return l.isDigit()||(k&&j.test(l))}this.setearCalleAltura=function(){c=this.strInput.split(" ");this.maxWordLen=c.inject(0,function(n,l,m){return Math.max(l.trim().length,n)});var k=c.length;if(k>1&&f(c[k-1],d)){this.tipo=usig.StringDireccion.CALLE_ALTURA;this.strCalles=c.inject("",function(n,l,m){return m<(k-1)?(n!=""?n+" "+l:l):n});this.strAltura=c[k-1]}else{this.tipo=usig.StringDireccion.CALLE;this.strCalles=this.strInput}};if(this.strInput.length>0){var c=this.strInput.split(" Y ");if(c.length>=2){var h=g(this.strInput);c=h.split(" Y ");if(c.length>=2){this.tipo=usig.StringDireccion.CALLE_Y_CALLE;this.strCalles=[c[0].replace(" & "," Y "),c[1].replace(" & "," Y ")]}}c=this.strInput.split(" E ");if(c.length>=2){if(parseInt(c[c.length-1])!=c[c.length-1]){this.tipo=usig.StringDireccion.CALLE_Y_CALLE;this.strCalles=c}}if(this.tipo==usig.StringDireccion.INVALIDO){this.setearCalleAltura()}}else{this.tipo=usig.StringDireccion.INVALIDO}function g(k){return k.translate(["GELLY Y OBES","MENENDEZ Y PELAYO","OLAGUER Y FELIU","ORTEGA Y GASSET","PAULA Y RODRIGUEZ","PAZ Y FIGUEROA","PI Y MARGALL","RAMON Y CAJAL","TORRES Y TENORIO","TREINTA Y TRES"],["GELLY & OBES","MENENDEZ & PELAYO","OLAGUER & FELIU","ORTEGA & GASSET","PAULA & RODRIGUEZ","PAZ & FIGUEROA","PI & MARGALL","RAMON & CAJAL","TORRES & TENORIO","TREINTA & TRES"])}this.quitarAvsCalle=function(){var k=["AV","AVDA","AVENIDA"];if(this.tipo==usig.StringDireccion.CALLE_ALTURA){this.strCalles=this.strCalles.removeWords(k)}else{if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[0]=this.strCalles[0].removeWords(k)}}};this.quitarAvsCalleCruce=function(){var k=["AV","AVDA","AVENIDA"];if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[1]=this.strCalles[1].removeWords(k)}};this.quitarPasajes=function(){var k=["PJE","PSJE","PASAJE"];if(this.tipo==usig.StringDireccion.CALLE_ALTURA){this.strCalles=this.strCalles.removeWords(k)}else{if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[0]=this.strCalles[0].removeWords(k);this.strCalles[1]=this.strCalles[1].removeWords(k)}}};this.esAlturaSN=function(k){return j.test(k)}}})(jQuery);usig.StringDireccion.CALLE=0;usig.StringDireccion.CALLE_ALTURA=1;usig.StringDireccion.CALLE_Y_CALLE=2;usig.StringDireccion.INVALIDO=-1;if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleInexistente=function(b){this.toString=function(){return"Calle inexistente: "+b};this.getNombreCalle=function(){return b};this.getErrorMessage=function(){return usig.ErrorCalleInexistente.defaults.texts.message}};usig.ErrorCalleInexistente.defaults={texts:{message:"No pudo hallarse ninguna calle existente que coincidiera con su b&uacute;squeda. Por favor, revise el nombre ingresado y vuelva a intentarlo."}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleInexistenteAEsaAltura=(function(b){return function(d,c,e){this.getCalle=function(){return d};this.getMatchings=function(){return c};this.getAltura=function(){return e};this.toString=function(){return"La calle "+d+" no existe a la altura "+e};this.getErrorMessage=function(){var f=usig.ErrorCalleInexistenteAEsaAltura.defaults.texts.message+"<ul>";b.each(c,function(h,j){var g=j.getTramos();b.each(g,function(k,l){f+="<li>"+j.nombre+" "+l[0]+"-"+l[1]+"</li>"})});f+="</ul>";return f}}})(jQuery);usig.ErrorCalleInexistenteAEsaAltura.defaults={texts:{message:"La altura indicada no es v&aacute;lida para la calle ingresada. A continuaci&oacute;n se muestran algunas opciones v&aacute;lidas halladas:"}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCruceInexistente=(function(b){return function(d,f,c,e){this.getCalle1=function(){return d};this.getCalle2=function(){return c};this.getMatchingsCalle1=function(){return f};this.getMatchingsCalle2=function(){return e};this.toString=function(){return"Cruce inexistente: "+d+" y "+c};this.getErrorMessage=function(){var g=usig.ErrorCruceInexistente.defaults.texts.message;g+="<br/>"+usig.ErrorCruceInexistente.defaults.texts.detalleCalle1+"<ul>";b.each(f,function(h,j){g+="<li>"+j.nombre+"</li>"});g+="</ul>";g+=usig.ErrorCruceInexistente.defaults.texts.detalleCalle2+"<ul>";b.each(e,function(h,j){g+="<li>"+j.nombre+"</li>"});g+="</ul>";return g}}})(jQuery);usig.ErrorCruceInexistente.defaults={texts:{message:"El cruce de calles indicado no existe. A continuaci&oacute;n se muestran algunas calles que coinciden con su b&uacute;squeda.",detalleCalle1:"Algunas calles halladas que coinciden con la 1ra calle ingresada son:",detalleCalle2:"Algunas calles halladas que coinciden con la 2da calle ingresada son:"}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleSinAlturas=function(b){this.toString=function(){return usig.ErrorCalleSinAlturas.defaults.texts.message.replace("{calle}",b)};this.getNombreCalle=function(){return b};this.getErrorMessage=function(){return usig.ErrorCalleSinAlturas.defaults.texts.message.replace("{calle}",b)}};usig.ErrorCalleSinAlturas.defaults={texts:{message:"La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones v&aacute;lidas sobre esta calle o escriba S/N en lugar de la altura."}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorEnCargaDelCallejero=function(){this.toString=function(){return"Callejero no disponible."};this.getErrorMessage=function(){return"El callejero no se encuentra cargado aún o se produjo un error al intentar cargarlo"}};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.defaults)=="undefined"){usig.defaults={}}usig.defaults.NormalizadorDirecciones={lazyDataLoad:false,loadFullDatabase:true,aceptarCallesSinAlturas:false,callesEnMinusculas:false,maxPalabras:7};usig.NormalizadorDirecciones=(function(f){var h={},e=false,l={ready:[]},u=null;re={cruceCalles:/\s+y\s+/gi,calleAltura:[],calle:[]};function j(z,A,y){var c=u.matcheaCalle(z.strCalles);try{var x=s(z,c,A)}catch(w){throw (w)}if(x.length==0&&c.length>0){z.quitarAvsCalle();c=u.matcheaCalle(z.strCalles);try{x=s(z,c,A)}catch(w){throw (w)}x=n(x);if(x.length==0){throw (new usig.ErrorCalleInexistenteAEsaAltura(z.strCalles,c,z.strAltura))}}else{if(x.length==0&&c.length==0){z.quitarPasajes();c=u.matcheaCalle(z.strCalles);try{x=s(z,c,A)}catch(w){throw (w)}}}if(y&&x.length>1){f.each(x,function(C,B){if(m(z.strCalles,B.getCalle().nombre)){x=[B]}})}return x}function m(x,w){function c(y){y=y.replace(/"/g,"").translate("áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toUpperCase().trim();y=y.split(" ");return y}x=c(x);w=c(w);if(x.length==w.length){intersect=x.intersect(w);if(x.length==intersect.length){return true}}return false}function s(A,w,B){var c=new Array();var z=0;if(w.length!=0){for(var y=0;y<w.length;y++){try{if(w[y].alturaValida(A.strAltura)){c.push(new usig.Direccion(w[y],A.strAltura))}}catch(x){if(x instanceof usig.ErrorCalleSinAlturas&&h.aceptarCallesSinAlturas&&A.esAlturaSN(A.strAltura)){c.push(new usig.Direccion(w[y],0))}z++}if(!isNaN(parseInt(B))&&c.length>=parseInt(B)){break}}if(w.length==z&&c.length==0){throw (new usig.ErrorCalleSinAlturas(w[0].toString()))}}return c}function n(y,z){var x=z?z:"getCalle";var w=new Array();for(var c=0;c<y.length;c++){if(u.tieneTramosComoAv(y[c][x]())){w.push(y[c])}}return w}function t(J,I){var L=u.matcheaCalle(J.strCalles[0]);var K=u.matcheaCalle(J.strCalles[1]);var F=new Array();function G(N,M){return Math.min(N.codigo,M.codigo)+Math.max(N.codigo,M.codigo)}var c=new Array();for(var C=0;C<L.length;C++){for(var z=0;z<K.length;z++){if(L[C].codigo!=K[z].codigo&&F.indexOf(G(L[C],K[z]))<0&&L[C].seCruzaCon(K[z])&&K[z].seCruzaCon(L[C])){c.push(new usig.Direccion(L[C],K[z]));F.push(G(L[C],K[z]));if(!isNaN(parseInt(I))&&c.length>=parseInt(I)){break}}}if(!isNaN(parseInt(I))&&c.length>=parseInt(I)){break}}if(c.length==0&&L.length>0&&K.length>0){var E=J.strCalles[0].split(" ");var B=J.strCalles[1].split(" ");if(E.indexOf("AV")>=0||E.indexOf("AVDA")>=0||E.indexOf("AVENIDA")>=0){var D=f.extend(true,{},J);D.quitarAvsCalle();try{var y=t(D,I)}catch(H){throw (new usig.ErrorCruceInexistente(J.strCalles[0],L,J.strCalles[1],K))}n(y);if(y instanceof Array){return y}}if(B.indexOf("AV")>=0||B.indexOf("AVDA")>=0||B.indexOf("AVENIDA")>=0){var A=f.extend(true,{},J);A.quitarAvsCalleCruce();try{var x=t(A,I)}catch(H){throw (new usig.ErrorCruceInexistente(J.strCalles[0],L,J.strCalles[1],K))}n(x,"getCalleCruce");if(x instanceof Array){return x}}}if(c.length<I){var w=u.matcheaCalle(J.strInput);var C=0;while(c.length<I&&C<w.length){c.push(w[C]);C++}}if(c.length==0&&L.length>0&&K.length>0){throw (new usig.ErrorCruceInexistente(J.strCalles[0],L,J.strCalles[1],K))}return c}function p(w){for(var c=0;c<l[w].length;c++){l[w][c]()}}function o(x,w){var y=false;for(var c=0;c<l[x].length;c++){y=y||(l[x][c]==w)}if(!y){l[x].push(w)}}function v(y,z,w){if(typeof(w)=="undefined"){w=true}if(typeof(jQuery)=="undefined"){throw ("Error: Este componente requiere jQuery y no se encontro.");return[]}var x=new usig.StringDireccion(y,h.aceptarCallesSinAlturas);var c=[];switch(x.tipo){case usig.StringDireccion.CALLE:c=u.matcheaCalle(x.strCalles,z);break;case usig.StringDireccion.CALLE_ALTURA:c=j(x,z,w);break;case usig.StringDireccion.CALLE_Y_CALLE:c=t(x,z);if(c.length==0){x.setearCalleAltura();c=j(x,z,w)}break;case usig.StringDireccion.INVALIDO:c=[];break}if(c instanceof Array){if(c.length>0){return c}else{throw (new usig.ErrorCalleInexistente(y))}}else{return c}}function d(w,x,z){textoCalle=w.substring(0,x).reverse();textoCruce=w.substr(x+z);conector=w.substr(x,z);var B=cruce="";var c=rCruce=[];try{try{for(var y=1;y<h.maxPalabras;++y){cruce=textoCruce.match(re.calle[y])[0];if(textoCruce.search(re.calle[y])!=0){throw"Direccion no valida"}rCruce=v(cruce,2,false)}}catch(A){cruce=textoCruce.match(re.calle[y-1])[0]}try{for(var y=1;y<h.maxPalabras;++y){B=textoCalle.match(re.calle[y])[0].reverse();if(textoCalle.search(re.calle[y])!=0){throw"Direccion no valida"}c=v(B,2,false)}}catch(A){B=textoCalle.match(re.calle[y-1])[0].reverse()}resultados=v(B+conector+cruce,2,false);if(resultados.length==1&&r(resultados[0],B+conector+cruce)){return{match:resultados[0],pos:w.search(B),len:B.length+conector.length+cruce.length}}else{return false}}catch(C){return false}return false}function q(c){textoDireccion=c.reverse();var x="";var A=[];try{try{for(var w=1;w<h.maxPalabras;++w){x=textoDireccion.match(re.calleAltura[w])[0].reverse();if(textoDireccion.search(re.calleAltura[w])!=0){throw"Direccion no valida"}A=v(x,2,false)}}catch(y){x=textoDireccion.match(re.calleAltura[w-1])[0].reverse();A=v(x,2,false)}if(r(A[0],x)){return{match:A[0],pos:c.search(x),len:x.length}}}catch(z){return false}return false}function b(c,w){var x=[];var y=/((\s+y\s+)|(\s+\d+))/gi;while(matcheo=y.exec(c)){if(matcheo[0].match(re.cruceCalles)){res=d(c,matcheo.index,matcheo[0].length)}else{res=q(c.substring(0,matcheo.index+matcheo[0].length))}if(res){if(x.length>0){if(res.pos==x[x.length-1].pos&&res.match.toString()==x[x.length-1].match.toString()){if(res.len>x[x.length-1].len){x.pop();x.push(res)}}else{x.push(res)}}else{x.push(res)}}if(!(!w||x.length<w)){return x}}return x.length>0?x:false}function k(y){var x=["Á","É","Í","Ó","Ú","Ü"];var w=["A","E","I","O","U","U"];for(var c=0;c<x.length;++c){y=y.replace(x[c],w[c])}return y}function r(y,w){var c=k(w.toUpperCase()).split(" ");var x=y.toString().toUpperCase().replace(/[,.]/g,"").split(" ");for(var A=0;A<c.length-1;A++){for(var z=0;z<x.length-1;z++){if(c[A]==x[z]&&c[A].length>3){return true}}}return false}function g(w,c){return w.pos-c.pos}return{normalizar:v,buscarDireccion:function(c){var w=b(c,1);return w?w[0]:false},buscarDirecciones:function(c,w){var x=b(c,w);return x?x:false},listo:function(){return u?u.listo():false},setOptions:function(c){h=f.extend({},h,c);if(typeof(h.onReady)=="function"){o("ready",h.onReady)}},init:function(c){h=f.extend({},usig.defaults.NormalizadorDirecciones,c);if(typeof(h.onReady)=="function"){o("ready",h.onReady)}u=usig.Callejero.init({lazyDataLoad:h.lazyDataLoad,loadFullDatabase:h.loadFullDatabase,callesEnMinusculas:h.callesEnMinusculas,onReady:p.createDelegate(this,["ready"])});for(var w=1;w<=h.maxPalabras;w++){re.calleAltura[w]=new RegExp("(\\d+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+w+"})","gi");re.calle[w]=new RegExp("(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+(w-1)+"}","gi")}String.prototype.reverse=function(){return this.split("").reverse().join("")};e=true;return this},c:u,inicializado:function(){return e}}})(jQuery);

jQuery.extendIf=function(b,d){if(b&&d){for(var a in d){if(typeof b[a]=="undefined"){b[a]=d[a]}}}return b};if(typeof(Ext)=="undefined"){jQuery.extend(Function.prototype,{createCallback:function(){var a=arguments;var b=this;return function(){return b.apply(window,a)}},createDelegate:function(c,b,a){var d=this;return function(){var f=b||arguments;if(a===true){f=Array.prototype.slice.call(arguments,0);f=f.concat(b)}else{if(typeof a=="number"){f=Array.prototype.slice.call(arguments,0);var e=[a,0].concat(b);Array.prototype.splice.apply(f,e)}}return d.apply(c||window,f)}},defer:function(c,e,b,a){var d=this.createDelegate(e,b,a);if(c){return setTimeout(d,c)}d();return 0},createSequence:function(b,a){if(typeof b!="function"){return this}var c=this;return function(){var d=c.apply(this||window,arguments);b.apply(a||this||window,arguments);return d}},createInterceptor:function(b,a){if(typeof b!="function"){return this}var c=this;return function(){b.target=this;b.method=c;if(b.apply(a||this||window,arguments)===false){return}return c.apply(this||window,arguments)}}});jQuery.extendIf(String,{escape:function(a){return a.replace(/('|\\)/g,"\\$1")},leftPad:function(d,b,c){var a=new String(d);if(!c){c=" "}while(a.length<b){a=c+a}return a.toString()},format:function(b){var a=Array.prototype.slice.call(arguments,1);return b.replace(/\{(\d+)\}/g,function(c,d){return a[d]})}})}String.prototype.isInteger=function(){return !isNaN(parseInt(this))};String.prototype.isFloat=function(){return !isNaN(parseFloat(this))};String.prototype.toggle=function(b,a){return this==b?a:b};String.prototype.trim=function(){var a=/^\s+|\s+$/g;return function(){return this.replace(a,"")}}();String.prototype.translate=function(d,c){if(!(d.length&&c.length)||d.length!=c.length){return this}var b=this;for(var a=0;a<d.length;a++){if(typeof(d)=="string"){b=b.replace(new RegExp(d.charAt(a),"g"),c.charAt(a))}else{b=b.replace(new RegExp(d[a],"g"),c[a])}}return b};String.prototype.isDigit=function(){return/^\d+$/.test(this)};String.prototype.removeWords=function(e){var d=this.split(" ");var c=new Array();for(var b=0;b<d.length;b++){c.push(d[b]);for(var a=0;a<e.length;a++){if(c[b]==e[a]){c.pop();break}}}return c.join(" ")};jQuery.extendIf(Number.prototype,{constrain:function(b,a){return Math.min(Math.max(this,b),a)},isInteger:function(){return !isNaN(parseInt(this))},isFloat:function(){return !isNaN(parseFloat(this))}});jQuery.extendIf(Array.prototype,{indexOf:function(c){for(var b=0,a=this.length;b<a;b++){if(this[b]==c){return b}}return -1},removeObject:function(b){var a=this.indexOf(b);if(a!=-1){this.splice(a,1)}return this},binarySearch:function binarySearch(f,b){var a=0,e=this.length-1,c,d;while(a<=e){c=parseInt((a+e)/2,10);d=b(this[c],f);if(d<0){a=c+1;continue}if(d>0){e=c-1;continue}return c}return -1},inject:function(c,b){for(var a=0;a<this.length;a++){c=b(c,this[a],a)}return c},map:function(d,c){var a=new Array(this.length);for(var b=0,e=this.length;b<e;b++){if(b in this){a[b]=d.call(c,this[b],b,this)}}return a},intersect:function(){if(!arguments.length){return[]}var e=this;var d=a2=null;var h=0;while(h<arguments.length){d=[];a2=arguments[h];var c=e.length;var b=a2.length;for(var g=0;g<c;g++){for(var f=0;f<b;f++){if(e[g]===a2[f]){d.push(e[g])}}}e=d;h++}return d.unique()},unique:function(){var c=[];var b=this.length;for(var e=0;e<b;e++){for(var d=e+1;d<b;d++){if(this[e]===this[d]){d=++e}}c.push(this[e])}return c}});Date.prototype.getElapsed=function(a){return Math.abs((a||new Date()).getTime()-this.getTime())};if(typeof(usig)=="undefined"){usig={}}usig.debug=function(a){if(window.console&&window.console.log){window.console.log(a)}};if(typeof(usig)=="undefined"){usig={}}jQuery.extendIf(usig,{loadingJs:[],loadingJsListeners:{},__callLoadJsListeners:function(b){for(var c=0,a=usig.loadingJsListeners[b].length;c<a;c++){usig.loadingJsListeners[b][c]()}},loadJs:function(b,e){if(usig.loadingJs.indexOf(b)<0){usig.loadingJs.push(b);usig.loadingJsListeners[b]=(typeof(e)=="function")?[e]:[];var a=document.createElement("script"),c=document.getElementsByTagName("head")[0],d=false;a.onload=a.onreadystatechange=function(){if((a.readyState&&a.readyState!=="complete"&&a.readyState!=="loaded")||d){return false}a.onload=a.onreadystatechange=null;d=true;usig.__callLoadJsListeners(b)};a.src=b;c.insertBefore(a,c.firstChild)}else{usig.loadingJsListeners[b].push(e)}},loadCss:function(a){var b=document.createElement("link");b.setAttribute("rel","stylesheet");b.setAttribute("type","text/css");b.setAttribute("href",a);if(typeof b!="undefined"){document.getElementsByTagName("head")[0].appendChild(b)}},removeJs:function(a){var c=document.getElementsByTagName("script");for(var b=c.length;b>=0;b--){if(c[b]&&c[b].getAttribute("src")!=null&&c[b].getAttribute("src").indexOf(a)!=-1){c[b].parentNode.removeChild(c[b])}}},removeCss:function(a){var c=document.getElementsByTagName("link");for(var b=c.length;b>=0;b--){if(c[b]&&c[b].getAttribute("href")!=null&&c[b].getAttribute("href").indexOf(a)!=-1){c[b].parentNode.removeChild(c[b])}}},Animator:function(c,d,e,f){var b=0;function a(){if(c.length>b){d(c[b]);b++;setTimeout(a,e)}else{if(typeof(f)=="function"){f()}}}this.stop=function(){b=c.length+1};a()},parseUri:function(e){var a=["source","protocol","authority","domain","port","path","directoryPath","fileName","query","anchor"],b=new RegExp("^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?").exec(e),d={};for(var c=0;c<10;c++){d[a[c]]=(b[c]?b[c]:"")}if(d.directoryPath.length>0){d.directoryPath=d.directoryPath.replace(/\/?$/,"/")}return d},registeredSuggesters:{},registerSuggester:function(a,b){usig.registeredSuggesters[a]=b},createSuggester:function(b,a){if(typeof(usig.registeredSuggesters[b])!="function"){throw"Suggester "+b+" is not registered.";return null}return new usig.registeredSuggesters[b](a)}});jQuery.expr[":"].Contains=function(c,d,b){return jQuery(c).text().toUpperCase().indexOf(b[3].toUpperCase())>=0};if(typeof(usig)=="undefined"){usig={}}usig.MapaInteractivo=(function(a){return function(s,f){var t=a.extend({},usig.MapaInteractivo.defaults,f),G=a("#"+s),F=parseInt(G.css("width")),y=parseInt(G.css("height")),m={},d={},q={},B=null,h=false,C=false,w=this,r=null,A=[],k=[],b=a('<div class="indicator" style="-moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px;"></div>'),H=navBar=panZoomBar=scalebar=overviewMap=statusBar=myMarkers=selectControl=highlightControl=null;function E(){b.remove();t.OpenLayersOptions.maxExtent=new OpenLayers.Bounds(t.bounds[0],t.bounds[1],t.bounds[2],t.bounds[3]);t.OpenLayersOptions.initBounds=new OpenLayers.Bounds(t.initBounds[0],t.initBounds[1],t.initBounds[2],t.initBounds[3]);H=new OpenLayers.Map(s,t.OpenLayersOptions);a("div.olMapViewport",G).append(b);this.api=H;this.api.zoomToMaxExtent=function(J){this.zoomToExtent(t.OpenLayersOptions.initBounds)};if(t.initLocation){this.loadMap(t.initLocation.mapConfig)}else{this.setBaseLayer(t.baseLayer)}H.zoomToExtent(t.OpenLayersOptions.initBounds);if(t.initLocation){H.moveTo(new OpenLayers.LonLat(t.initLocation.lon,t.initLocation.lat),t.initLocation.zl)}else{H.zoomToExtent(t.OpenLayersOptions.initBounds)}scalebar=new OpenLayers.Control.ScaleBar({minWidth:141,maxWidth:142});H.addControl(scalebar);if(t.includePanZoomBar){panZoomBar=new OpenLayers.Control.PanZoomBar({panner:true,zoomWorldIcon:true,textAcercar:t.texts.panZoomBar.textAcercar,textAlejar:t.texts.panZoomBar.textAlejar,verMapaCompleto:t.texts.panZoomBar.verMapaCompleto});H.addControl(panZoomBar);overviewMap=new OpenLayers.Control.OverviewMap({layers:[new OpenLayers.Layer.WMS("Referencia",o("referencia"),{layers:t.overviewOptions.layer})],size:new OpenLayers.Size(t.overviewOptions.size[0],t.overviewOptions.size[1]),minRatio:12,maxRatio:24,mapOptions:{projection:t.OpenLayersOptions.projection,units:t.OpenLayersOptions.units,maxExtent:t.OpenLayersOptions.maxExtent,resolutions:t.overviewOptions.resolutions}});H.addControl(overviewMap)}if(t.includeToolbar){navBar=new OpenLayers.Control.NavToolbar(a.extend({},t.texts.navBar,{mapList:t.mapList,activeMap:t.baseLayer,mapSelectorText:t.texts.mapSelectorDefault,mapSelectorTrigger:(function(K,J){if(typeof(t.onMapSelect)=="function"){t.onMapSelect(K,J)}else{this.loadMap(J)}}).createDelegate(this),markersToggleHandler:(function(){if(myMarkers){this.toggleLayer(myMarkers)}}).createDelegate(this),clickHandler:t.onMapClick,handleRightClicks:true,rightClickHandler:t.onMapClick}));H.addControl(navBar);this.toolbar=navBar}else{H.addControl(new OpenLayers.Control.Navigation())}statusBar=new OpenLayers.Control.StatusBar();H.addControl(statusBar);myMarkers=new OpenLayers.Layer.Vector("MyMarkers",{styleMap:new OpenLayers.StyleMap({"default":{externalGraphic:t.rootUrl+"images/marker-2.2.png",graphicWidth:32,graphicHeight:42,graphicXOffset:-16,graphicYOffset:-36,graphicZIndex:t.MARKER_Z_INDEX,cursor:"pointer"},select:{graphicWidth:38,graphicHeight:50,graphicXOffset:-19,graphicYOffset:-43}}),rendererOptions:{yOrdering:true}});H.addLayer(myMarkers);highlightControl=new OpenLayers.Control.SelectFeature([myMarkers],{hover:true,highlightOnly:true});selectControl=new OpenLayers.Control.SelectFeature([myMarkers],{clickout:true,toggle:false,multiple:false,hover:false,toggleKey:"ctrlKey",multipleKey:"shiftKey"});myMarkers.events.on({featureselected:function(M){var L=M.feature;var K=m[M.feature.attributes.fid];var J=null;if(K.place.options.popup){J=new OpenLayers.Popup.FramedCloud(M.feature.id,new OpenLayers.LonLat(M.feature.geometry.x,M.feature.geometry.y),null,K.popupContent,null,true,function(){selectControl.unselect(L)});M.feature.popup=J;J.hide();H.addPopup(J,true)}if(typeof(K.onClick)=="function"){K.onClick(M,K.place,J,selectControl)}else{if(J){J.show()}}if(!J){selectControl.unselect(L)}},featureunselected:function(J){if(J.feature.popup){H.removePopup(J.feature.popup);J.feature.popup.destroy();J.feature.popup=null}}});H.addControl(highlightControl);H.addControl(selectControl);highlightControl.activate();selectControl.activate();if(typeof(t.onReady)=="function"){t.onReady(this)}if(t.initLocation){navBar.setSelectorText(t.initLocation.mapConfig.display)}if(t.trackVisits){var I=function(J){try{var L=Piwik.getTracker(t.piwikBaseUrl+"piwik.php",J);L.trackPageView();L.enableLinkTracking()}catch(K){}};if(typeof(Piwik)=="undefined"){usig.loadJs(t.piwikBaseUrl+"piwik.js",I.createDelegate(this,[t.piwikSiteId]))}else{I(t.piwikSiteId)}}b.hide()}function n(){var I=usig.MapaInteractivo.defaults.OpenLayersJS.replace("OpenLayers.js","");a.each(t.preloadImages,function(K,J){A.push(a('<img src="'+I+J+'"/>'))})}function o(I){var J=new Array();a.each(t.servers,function(K,L){J.push(L+I)});return J}this.setOptions=function(I){t=a.extend({},t,I)};this.updateSize=function(){(function(){H.updateSize();b.css("left",(parseInt(G.css("width"))/2-26)+"px");b.css("top",(parseInt(G.css("height"))/2-26)+"px")}).defer(200,this)};this.getMarkers=function(){return m};this.unselectFeature=function(I){selectControl.unselect(I)};this.setBaseLayer=function(J){var I=H.baseLayer;if(I==undefined){var L=o(J);H.addLayer(new OpenLayers.Layer.WMS(J,L,{layers:J,format:"image/png"},{transitionEffect:"resize",buffer:0}))}else{if(I.name!=J){var L=o(J);try{H.removeLayer(I)}catch(K){}H.addLayer(new OpenLayers.Layer.WMS(J,L,{layers:J,format:"image/png"},{transitionEffect:"resize",buffer:0}))}}};function u(J){var I={style:null,lonlat:null};if(J instanceof OpenLayers.Marker){I={style:{externalGraphic:J.icon.url,backgroundGraphic:t.rootUrl+"images/blank.gif",graphicWidth:J.icon.size.w,graphicHeight:J.icon.size.h,graphicXOffset:J.icon.offset.x,graphicYOffset:J.icon.offset.y},lonlat:J.lonlat.clone()};J.destroy();return I}if(J.options&&J.options.iconUrl){I={style:{externalGraphic:J.options.iconUrl,backgroundGraphic:t.rootUrl+"images/blank.gif",graphicWidth:J.options.iconWidth,graphicHeight:J.options.iconHeight,graphicXOffset:J.options.offsetX,graphicYOffset:J.options.offsetY}}}if(J.x!=undefined&&J.y!=undefined){I.lonlat=new OpenLayers.LonLat(J.x,J.y)}if(usig.Direccion&&J instanceof usig.Direccion){I.lonlat=new OpenLayers.LonLat(J.getCoordenadas().x,J.getCoordenadas().y)}if(usig.inventario&&usig.inventario.Objeto&&J instanceof usig.inventario.Objeto){I.lonlat=new OpenLayers.LonLat(J.ubicacion.getCentroide().x,J.ubicacion.getCentroide().y)}return I}function c(){if(usig.NormalizadorDirecciones){h=false;if(usig.NormalizadorDirecciones.listo()){e()}else{usig.NormalizadorDirecciones.init({onReady:c.createDelegate(this),loadFullDatabase:true})}}else{if(!h){h=true;usig.loadJs(t.NormalizadorDireccionesJS,c.createDelegate(this))}}}function e(){var I=0;if(usig.NormalizadorDirecciones&&usig.NormalizadorDirecciones.listo()){a.each(d,function(N,M){try{var L=M.place;var J=usig.NormalizadorDirecciones.normalizar(L,10);if(J.length>0){M.place=J[0];q[N]={place:M.place,goTo:M.goTo,onClick:M.onClick,options:M.options};I++}}catch(K){}delete d[N]});if(I>0){j()}}else{c()}}function j(){if(B){a.each(q,function(K,J){var I=J.place;B.geoCodificarDireccion(I,function(L){J.place.setCoordenadas(L);D(J.place,K,J.goTo,J.onClick,J.options)});delete q[K]})}else{p()}}function p(){if(usig.GeoCoder){C=false;B=new usig.GeoCoder();j()}else{if(!C){C=true;usig.loadJs(t.GeoCoderJS,p.createDelegate(this))}}}function v(I,J){if(J){if(H.getZoom()==t.goToZoomLevel){H.panTo(new OpenLayers.LonLat(I.lon,I.lat))}else{H.moveTo(new OpenLayers.LonLat(I.lon,I.lat),t.goToZoomLevel)}}else{H.panTo(new OpenLayers.LonLat(I.lon,I.lat))}}function D(J,P,M,O,K){var N={instantPopup:false,popup:true};statusBar.activate(t.texts.processing,true);J.options=a.extend({},N,K);if(typeof(O)=="object"){J.options=a.extend({},N,O)}var I=u(J);var L=J;if(O&&typeof(O)!="function"&&typeof(O)!="object"){L=O}I.place=J;I.feature=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(I.lonlat.lon,I.lonlat.lat),{fid:P});I.feature.style=I.style;I.popupContent=L;I.onClick=typeof(O)=="function"?O:null;m[""+P]=I;myMarkers.addFeatures(I.feature);if(M){v(I.lonlat,true)}if(J.options&&J.options.instantPopup){selectControl.select(I.feature)}statusBar.deactivate();return P}function z(L){var I=L.getPlan();var J=usig.GMLPlan.create("trip_plan_"+L.getId(),{template:L.getTemplate(),baseUrl:t.rootUrl,tipoRecorrido:L.getTipo()});for(i=0;i<I.length;i++){var K=I[i];if(K.type!=undefined){if(K.type=="StartWalking"||K.type=="FinishWalking"){if(i==0){J.addMarker(K.gml.replace("walk","beginwalk"))}else{J.addMarker(K.gml)}}else{if(K.type=="Board"){if(i==0){J.addMarker(K.gml.replace(/(bus|subway|train)/g,"begin$1"))}else{if(K.service_type=="1"){switch(K.service){case"Línea A":K.gml=K.gml.replace("subway","subwayA");break;case"Línea B":K.gml=K.gml.replace("subway","subwayB");break;case"Línea C":K.gml=K.gml.replace("subway","subwayC");break;case"Línea D":K.gml=K.gml.replace("subway","subwayD");break;case"Línea E":K.gml=K.gml.replace("subway","subwayE");break;case"Línea H":K.gml=K.gml.replace("subway","subwayH");break}}J.addMarker(K.gml)}}else{if(K.type=="Bus"||K.type=="SubWay"||K.type=="Street"){J.addEdges([K.gml])}else{if(K.type=="SubWayConnection"){switch(K.service_to){case"Línea A":K.gml[1]=K.gml[1].replace("connection","subwayA");break;case"Línea B":K.gml[1]=K.gml[1].replace("connection","subwayB");break;case"Línea C":K.gml[1]=K.gml[1].replace("connection","subwayC");break;case"Línea D":K.gml[1]=K.gml[1].replace("connection","subwayD");break;case"Línea E":K.gml[1]=K.gml[1].replace("connection","subwayE");break;case"Línea H":K.gml[1]=K.gml[1].replace("connection","subwayH");break}J.addMarker(K.gml[1]);J.addEdges(K.gml)}else{if(K.type=="StartDriving"||K.type=="FinishDriving"){J.addMarker(K.gml)}else{if(K.type=="StartBiking"||K.type=="FinishBiking"){if(i==0){J.addMarker(K.gml.replace("bike","beginbike"))}else{J.addMarker(K.gml)}}}}}}}}}L.gmlLayer=J;return J}function g(K){var J=H.getLayersByName(K.gmlLayer.name);if(J.length>0){for(l=0;l<J.length;l++){J[l].setVisibility(true)}}else{var I=K.gmlLayer;H.addLayer(I)}H.zoomToExtent(K.gmlLayer.getDataExtent())}this.addMarker=function(I,L,M,J){var K=Math.floor(Math.random()*100001);var N=new Date()*1+K;if(typeof(I)=="string"){d[N]={place:I,goTo:L,onClick:M,options:J};e();return N}return D(I,N,L,M,J)};this.removeMarker=function(I){marker=m[""+I];if(marker){myMarkers.removeFeatures(marker.feature)}marker=undefined;m[I]=undefined};this.toggleMarker=function(K,J){var I=m[""+K];if(J){myMarkers.getFeatureById(I.feature.id).style=I.style}else{myMarkers.getFeatureById(I.feature.id).style=a.extend({},I.style,{display:"none"})}myMarkers.redraw()};this.goTo=function(I,J){v(I,J)};this.showStatus=function(J,I){statusBar.activate(J,I)};this.hideStatus=function(){statusBar.deactivate()};this.showIndicator=function(){b.show()};this.hideIndicator=function(){b.hide()};this.raiseMarkers=function(I){if(myMarkers){H.raiseLayer(myMarkers,I)}};this.getMarkersIndex=function(){return H.getLayerIndex(myMarkers)};this.getMarkersZIndex=function(){return myMarkers.getZIndex()};this.mostrarRecorrido=function(I){if(!I.gmlLayer){I.getPlan(function(){z(I);g(I)})}else{g(I)}};this.ocultarRecorrido=function(I){if(I.gmlLayer){I.gmlLayer.setVisibility(false)}};this.borrarRecorrido=function(I){if(I.gmlLayer){H.removeLayer(I.gmlLayer)}};function x(I){I.defaultStyle=a.extend({},I.defaultStyle,I.symbolizer);if(!I.selectStyle){I.selectStyle=a.extend({},I.defaultStyle);I.selectStyle.externalGraphic=undefined;I.selectStyle.backgroundGraphic=undefined;I.selectStyle.fillColor=undefined;I.selectStyle.strokeColor=undefined}var K=new OpenLayers.StyleMap({"default":I.defaultStyle,select:I.selectStyle});var J=new Array();a.each(I.escalas,function(M,L){if(I.symbolizer.graphicWidth&&I.symbolizer.graphicHeight){L.symbolizer.graphicWidth=parseInt(Math.round(I.symbolizer.graphicWidth*L.symbolizer.size));L.symbolizer.graphicHeight=parseInt(Math.round(I.symbolizer.graphicHeight*L.symbolizer.size));if(I.symbolizer.backgroundWidth&&I.symbolizer.backgroundHeight){L.symbolizer.backgroundWidth=parseInt(Math.round(I.symbolizer.backgroundWidth*L.symbolizer.size));L.symbolizer.backgroundHeight=parseInt(Math.round(I.symbolizer.backgroundHeight*L.symbolizer.size))}}else{L.symbolizer.pointRadius=Math.max(parseInt(Math.round(I.selectStyle.pointRadius*L.symbolizer.size)),I.minPointRadius)}if(I.symbolizer.graphicXOffset&&I.symbolizer.graphicYOffset){L.symbolizer.graphicXOffset=parseInt(Math.round(I.symbolizer.graphicXOffset*L.symbolizer.size));L.symbolizer.graphicYOffset=parseInt(Math.round(I.symbolizer.graphicYOffset*L.symbolizer.size))}if(I.symbolizer.backgroundXOffset&&I.symbolizer.backgroundYOffset){L.symbolizer.backgroundXOffset=parseInt(Math.round(I.symbolizer.backgroundXOffset*L.symbolizer.size));L.symbolizer.backgroundYOffset=parseInt(Math.round(I.symbolizer.backgroundYOffset*L.symbolizer.size))}a.each(I.clases,function(N,P){if(!(P.filter instanceof OpenLayers.Filter)){P.filter=new OpenLayers.Filter.Comparison(P.filter)}var O=a.extend({},P.symbolizer,L.symbolizer);if(!P.symbolizer){O.fillColor=I.colors[N]}J.push(new OpenLayers.Rule(a.extend({},P,L,{symbolizer:O})))});J.push(new OpenLayers.Rule(a.extend({},L,{elseFilter:true})))});K.styles["default"].addRules(J);return K}this.addVectorLayer=function(J,I){var L=a.extend(true,{},usig.MapaInteractivo.defaults.vectorLayer,I);if(L.onClick&&!L.symbolizer.cursor){L.symbolizer.cursor="pointer"}var K=new OpenLayers.Layer.Vector(J,{styleMap:x(L),visibility:L.visible,rendererOptions:{yOrdering:true}});H.addLayer(K);this.raiseMarkers(H.layers.length);if(L.url&&L.url!=""){this.showIndicator();a.ajax({url:L.url,dataType:"jsonp",success:(function(O){var N=new OpenLayers.Format.GML();K.addFeatures(N.read(O));this.hideIndicator()}).createDelegate(this),error:function(N){}})}if(L.onClick){if(L.highlightable){var M=highlightControl.layers;M.push(K);highlightControl.setLayer(M)}var M=selectControl.layers;M.push(K);selectControl.setLayer(M);K.events.on({featureselected:function(P){var O=P.feature;P.layerName=J;if(L.popup){var N=new OpenLayers.Popup.FramedCloud(P.feature.id,new OpenLayers.LonLat(P.feature.geometry.x,P.feature.geometry.y),null,'<div id="contenido_'+P.feature.id+'"></div>',null,true,function(Q){selectControl.unselect(O);Q.cancelBubble=true;return false});P.feature.popup=N;N.hide();H.addPopup(N,true)}if(typeof(L.onClick)=="function"){L.onClick(P,N)}else{if(N){N.show()}}if(!N){selectControl.unselect(O)}},featureunselected:function(N){if(N.feature.popup){H.removePopup(N.feature.popup);N.feature.popup.destroy();N.feature.popup=null}}})}return K};this.addLayerToSelectControl=function(I){var J=selectControl.layers;if(J.indexOf(I)<0){J.push(I);selectControl.setLayer(J)}};this.removeLayer=function(I){try{H.removeLayer(I);var K=highlightControl.layers;K.removeObject(I);highlightControl.setLayer(K);K=selectControl.layers;K.removeObject(I);selectControl.setLayer(K);I.destroy()}catch(J){return J}return true};this.toggleLayer=function(I){I.setVisibility(!I.visibility)};this.loadMap=function(J){this.removeVectorLayers();if(J.baseLayer){this.setBaseLayer(J.baseLayer)}if(J.layers){var I=this;a.each(J.layers,function(L,K){if(K.options.popup==undefined){K.options.popup=J.popup}if(K.options.onClick==undefined){K.options.onClick=J.onClick}k.push(I.addVectorLayer(K.name,K.options))})}if(navBar){navBar.selectMap(J.name)}};this.removeVectorLayers=function(){for(var J=0,I=k.length;J<I;J++){this.removeLayer(k[J])}k=[]};if(typeof(OpenLayers)=="undefined"){r=a('<img src="'+t.rootUrl+'images/animated_indicator_medium.gif" alt="'+t.texts.loading+'"/>');r.css("padding","10px");b.css("background-color","#fff").css("width","52px").css("height","52px").css("border","1px solid #ddd").css("position","relative").css("zIndex","1000").css("opacity","0.85").css("left",(F/2-26)+"px").css("top",(y/2-26)+"px").append(r);G.css("background-color","#eee").append(b);usig.loadCss(t.OpenLayersCSS);usig.loadJs(t.OpenLayersJS,E.createDelegate(this));(function(){if(typeof(OpenLayers)=="undefined"){n()}}).defer(500,this)}else{E.defer(200,this)}}})(jQuery);usig.MapaInteractivo.defaults={debug:false,trackVisits:true,includePanZoomBar:true,includeToolbar:true,bounds:[54340,54090,172855,140146],initBounds:[93500,96750,112000,106750],OpenLayersOptions:{controls:[],resolutions:[90,50,30,15,7.5,4,2,1,0.5,0.2],projection:"EPSG:221951",units:"m"},baseLayer:"mapabsas_default",rootUrl:"http://servicios.usig.buenosaires.gov.ar/usig-js/dev/",OpenLayersCSS:"http://servicios.usig.buenosaires.gov.ar/OpenLayers/2.12.0-2/theme/mapabsas2/style.css",OpenLayersJS:"http://servicios.usig.buenosaires.gov.ar/OpenLayers/2.12.0-2/OpenLayers.js",NormalizadorDireccionesJS:"http://servicios.usig.buenosaires.gob.ar/nd-js/1.3/normalizadorDirecciones.min.js",GeoCoderJS:"http://servicios.usig.buenosaires.gob.ar/usig-js/2.3/usig.GeoCoder.min.js",piwikBaseUrl:"http://usig.buenosaires.gov.ar/piwik/",piwikSiteId:3,preloadImages:["img/panZoomBar/arriba.png","img/panZoomBar/izquierda.png","img/panZoomBar/abajo.png","img/panZoomBar/derecha.png","img/panZoomBar/centro.png","img/panZoomBar/bt_zoomin.gif","img/panZoomBar/bt_zoomout.gif","img/panZoomBar/bt_zoomworld.gif","img/panZoomBar/marcador_azul.gif","img/panZoomBar/zoomBar.png","img/markers_off.png"],overviewOptions:{layer:"referencia",resolutions:[130,70,30,15,7.5,4],size:[195,130]},mapList:[{name:"mapabsas_imagen_satelital_2009",display:"Vista Satelital 2009",baseLayer:"mapabsas_imagen_satelital_2009",desc:"Mapa que incluye imagen satelital QuickBird, año de toma 2009. El mapa presenta la imagen satelital de alta resolución de la Ciudad de Buenos Aires con calles y alturas."},{name:"mapabsas_imagen_satelital_2004",display:"Vista Satelital 2004",baseLayer:"mapabsas_imagen_satelital_2004",desc:"Mapa que incluye imagen satelital QuickBird, año de toma 2004. El mapa presenta la imagen satelital de alta resolución de la Ciudad de Buenos Aires con calles y alturas."},{name:"mapabsas_fotografias_aereas_1978",display:"Vista Aérea 1978",baseLayer:"mapabsas_fotografias_aereas_1978",desc:"Mapa que incluye una imagen de la ciudad restituida a partir de fotografías aéreas tomadas en el año 1978. El mapa presenta también la información de calles y alturas actuales como referencia."},{name:"mapabsas_fotografias_aereas_1965",display:"Vista Aérea 1965",baseLayer:"mapabsas_fotografias_aereas_1965",desc:"Mapa que incluye una imagen de la ciudad restituida a partir de fotografías aéreas tomadas en el año 1965. El mapa presenta también la información de calles y alturas actuales como referencia."},{name:"mapabsas_fotografias_aereas_1940",display:"Vista Aérea 1940",baseLayer:"mapabsas_fotografias_aereas_1940",desc:"Mapa que incluye una imagen de la ciudad restituida a partir de fotografías aéreas tomadas en el año 1940. El mapa presenta también la información de calles y alturas actuales como referencia."},{name:"separator",display:"Mapas temáticos:"},{name:"none",display:"Información General",baseLayer:"mapabsas_default",desc:"Mapa que incluye información de calles con altura y sentido, veredas, manzanas, parcelas, espacios verdes, trenes, subterráneos y salidas de la Ciudad de Buenos Aires."},{name:"mapabsas_red_de_ciclovias",display:"Red de Ciclovías",baseLayer:"mapabsas_red_de_ciclovias_basico",layers:[{name:"comercios_con_beneficios",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=comercios_con_beneficios",symbolizer:{externalGraphic:"images/markers/comercios_con_beneficios.png",pointRadius:18},escalas:[{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],minPointRadius:9}},{name:"bicicleterias",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=bicicleterias",symbolizer:{externalGraphic:"images/markers/bicicleterias.png",pointRadius:18},escalas:[{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],minPointRadius:9}},{name:"bicicleteros",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=bicicleteros",symbolizer:{externalGraphic:"images/markers/bicicleteros.png",pointRadius:18},escalas:[{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],minPointRadius:9}},{name:"estacionamientos_de_bicicletas",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=estacionamiento_de_bicicletas",symbolizer:{externalGraphic:"images/markers/estacionamiento_de_bicicletas.png",pointRadius:18},escalas:[{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],minPointRadius:9}},{name:"estaciones_de_bicicletas",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=estaciones_de_bicicletas",symbolizer:{externalGraphic:"images/markers/estaciones_de_bicicletas.png",pointRadius:18},escalas:[{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],minPointRadius:9}}]},{name:"mapabsas_cortes_de_transito",display:"Cortes de Tránsito",baseLayer:"mapabsas_informacion_basica",layers:[{name:"cortes_de_transito_0",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Corte por Obra",symbolizer:{externalGraphic:"images/markers/obras.png",backgroundGraphic:"images/markers/fondos/cua_azul.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_1",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Manifestación",symbolizer:{externalGraphic:"images/markers/manifestacion.png",backgroundGraphic:"images/markers/fondos/cua_naranja.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_2",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Evento Cultural",symbolizer:{externalGraphic:"images/markers/evento_cultural.png",backgroundGraphic:"images/markers/fondos/cua_verde.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_3",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Cordón policial",symbolizer:{externalGraphic:"images/markers/cordon_policial.png",backgroundGraphic:"images/markers/fondos/cir_azul.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_4",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Filmación",symbolizer:{externalGraphic:"images/markers/filmacion.png",backgroundGraphic:"images/markers/fondos/cua_violeta.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_5",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Choque",symbolizer:{externalGraphic:"images/markers/choque.png",backgroundGraphic:"images/markers/fondos/cir_rojo.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_6",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Semáforo Roto",symbolizer:{externalGraphic:"images/markers/semaforo_roto.png",backgroundGraphic:"images/markers/fondos/cir_naranja.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_7",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Evento Deportivo",symbolizer:{externalGraphic:"images/markers/evento_deportivo.png",backgroundGraphic:"images/markers/fondos/cir_verde.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_8",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Incendio",symbolizer:{externalGraphic:"images/markers/incendio.png",backgroundGraphic:"images/markers/fondos/cua_rojo.png",pointRadius:18},minPointRadius:9}},{name:"cortes_de_transito_9",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=cortes_de_transito&tipo=Corte",symbolizer:{externalGraphic:"images/markers/otros_cortes.png",backgroundGraphic:"images/markers/fondos/cir_violeta.png",pointRadius:18},minPointRadius:9}}]},{name:"mapabsas_salud",display:"Salud",baseLayer:"mapabsas_regiones_sanitarias",layers:[{name:"centros_de_salud_y_accion_comunitaria",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_de_salud_y_accion_comunitaria",symbolizer:{externalGraphic:"images/markers/centros_de_salud_y_accion_comunitaria.png",backgroundGraphic:"images/markers/fondos/cua_azul.png",pointRadius:18},minPointRadius:9}},{name:"centros_medicos_barriales",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_medicos_barriales",symbolizer:{externalGraphic:"images/markers/centros_medicos_barriales.png",backgroundGraphic:"images/markers/fondos/cir_amarillo.png",pointRadius:18},minPointRadius:9}},{name:"hospitales_de_ninos",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_de_ninos",symbolizer:{externalGraphic:"images/markers/hospitales_de_ninos.png",backgroundGraphic:"images/markers/fondos/cua_naranja.png",pointRadius:18},minPointRadius:9}},{name:"hospitales_especializados",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_especializados",symbolizer:{externalGraphic:"images/markers/hospitales_especializados.png",backgroundGraphic:"images/markers/fondos/cua_violeta.png",pointRadius:18},minPointRadius:9}},{name:"hospitales_generales_de_agudos",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_generales_de_agudos",symbolizer:{externalGraphic:"images/markers/hospitales_generales_de_agudos.png",backgroundGraphic:"images/markers/fondos/cua_rojo.png",pointRadius:18},minPointRadius:9}},{name:"centros_de_salud_no_dependientes_del_gcba",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_de_salud_no_dependientes_del_gcba",symbolizer:{externalGraphic:"images/markers/centros_de_salud_no_dependientes_del_gcba.png",backgroundGraphic:"images/markers/fondos/cua_verde.png",pointRadius:18},minPointRadius:9}}]},{name:"mapabsas_educacion_publica",display:"Educación",baseLayer:"mapabsas_educacion_publica",desc:"Mapa que contiene Establecimientos Educativos Públicos y Distritos Escolares."},{name:"mapabsas_librerias_y_disquerias",display:"Librerías y disquerías",baseLayer:"mapabsas_informacion_basica",layers:[{name:"librerias",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=dependencias_culturales&actividades=22",symbolizer:{externalGraphic:"images/markers/biblioteca.png",backgroundGraphic:"images/markers/fondos/cua_azul.png",pointRadius:18},minPointRadius:9}},{name:"disquerias",options:{url:"http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=dependencias_culturales&actividades=26",symbolizer:{externalGraphic:"images/markers/disqueria.png",backgroundGraphic:"images/markers/fondos/cua_rojo.png",pointRadius:18},minPointRadius:9}}]}],texts:{processing:"Procesando...",loading:"Cargando...",tituloMailing:"Enviar vista actual por e-mail",mapSelectorDefault:"Vista del Plano",panZoomBar:{textAcercar:"Acercar",textAlejar:"Alejar",verMapaCompleto:"Ver el mapa completo"},overviewMap:{textMapaReferencia:"Mapa de referencia interactivo",textCerrar:"Cerrar"},navBar:{navigationText:"Mover",zoomBoxText:"Acercar",measureToolTexts:{buttonLabel:"Medir",measure:"Medida",measureDistance:"Medir Distancia",measureArea:"Medir Área"}}},vectorLayer:{highlightable:true,popup:false,visible:true,escalas:[{minScaleDenominator:80000,symbolizer:{size:0.4}},{minScaleDenominator:20000,maxScaleDenominator:80000,symbolizer:{size:0.5}},{maxScaleDenominator:20000,symbolizer:{size:0.7}}],clases:[],minPointRadius:3,symbolizer:{fillColor:"#0000ee",strokeColor:"#666666",strokeWidth:1,pointRadius:7,cursor:"pointer"},colors:["#8F58C7","#E34900","#C3E401","#F9B528","#D71440","#007baf","#495a78","#b56c7d","#669966","#ff3300"]},goToZoomLevel:7,SHADOW_Z_INDEX:10,MARKER_Z_INDEX:11,servers:["http://tiles1.mapa.buenosaires.gob.ar/tilecache/","http://tiles2.mapa.buenosaires.gob.ar/tilecache/","http://tiles3.mapa.buenosaires.gob.ar/tilecache/","http://tiles4.mapa.buenosaires.gob.ar/tilecache/","http://tiles5.mapa.buenosaires.gob.ar/tilecache/","http://tiles6.mapa.buenosaires.gob.ar/tilecache/","http://tiles7.mapa.buenosaires.gob.ar/tilecache/"]};if(typeof(usig)=="undefined"){usig={}}usig.GMLPlan=(function(b){var a;return{create:function(d,c){if(!OpenLayers){throw ("ERROR: OpenLayers is not loaded.");return null}if(!a){a=OpenLayers.Class(OpenLayers.Layer.Vector,{format:null,formatOptions:null,loaded:false,edges:null,markers:null,styleMap:null,rendererOptions:{zIndexing:true},initialize:function(g,f){var e=[];this.styleMap=this.getStyle(f.template,f.baseUrl,f.tipoRecorrido);e.push(g,{styleMap:this.styleMap});OpenLayers.Layer.Vector.prototype.initialize.apply(this,e);this.edges=new Array();this.markers=new Array()},loadFeatures:function(){var e={};OpenLayers.Util.extend(e,this.formatOptions);if(this.map&&!this.projection.equals(this.map.getProjectionObject())){e.externalProjection=this.projection;e.internalProjection=this.map.getProjectionObject()}var f=this.format?new this.format(e):new OpenLayers.Format.GML(e);gml='<?xml version="1.0" encoding="utf-8"?><wfs:FeatureCollection xmlns:ms="http://mapserver.gis.umn.edu/mapserver" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml">';gml+=this.edges.join();gml+=this.markers.join();gml+="</wfs:FeatureCollection>";this.loaded=true;this.addFeatures(f.read(gml));this.events.triggerEvent("loadend")},addMarker:function(e){this.markers.push("<gml:featureMember>"+e+"</gml:featureMember>")},addEdges:function(e){ls=this.edges;b.each(e,function(g,f){ls.push("<gml:featureMember>"+f+"</gml:featureMember>")})},setVisibility:function(e,f){OpenLayers.Layer.Vector.prototype.setVisibility.apply(this,arguments);if(this.visibility&&!this.loaded){this.events.triggerEvent("loadstart");this.loadFeatures()}},moveTo:function(g,e,f){OpenLayers.Layer.Vector.prototype.moveTo.apply(this,arguments);if(this.visibility&&!this.loaded){this.events.triggerEvent("loadstart");this.loadFeatures()}},getFeatureByAttrId:function(h){var g=null;for(var f=0,e=this.features.length;f<e;++f){if(this.features[f].attributes.fid==h){g=this.features[f];break}}return g},highlightFeature:function(e){this.drawFeature(e,this.styleMap.styles.select)},setStyle:function(e){this.styleMap=e},getStyle:function(f,g,e){defaultOpacity=0.8;zIndexLine=8;zIndexPoint=9;zIndexMarker=14;lineOptions={strokeWidth:5,strokeOpacity:defaultOpacity,graphicZIndex:zIndexLine};lineOptionsWalk={strokeWidth:4,strokeDashstyle:"dashdot",strokeOpacity:defaultOpacity,graphicZIndex:zIndexLine};color=f.color;styleMap=new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults({fillColor:color,fillOpacity:1,strokeColor:color,strokeWidth:3,strokeOpacity:1},OpenLayers.Feature.Vector.style["default"]));if(e=="transporte_publico"){var h={beginwalk:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/caminando.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},walk:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/recorrido_pie20x20.png",graphicZIndex:zIndexPoint},Line:lineOptionsWalk},beginbus:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/colectivo.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},bus:{Point:{pointRadius:12,externalGraphic:g+"images/recorrido_colectivo20x20.png",graphicWidth:20,graphicHeight:20,graphicZIndex:zIndexPoint},Line:lineOptions},subway:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/recorrido_subte20x20.png",graphicZIndex:zIndexPoint},Line:lineOptions},beginsubway:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/subte.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},subwayA:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-a.png",graphicZIndex:zIndexPoint},Line:lineOptions},subwayB:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-b.png",graphicZIndex:zIndexPoint},Line:lineOptions},subwayC:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-c.png",graphicZIndex:zIndexPoint},Line:lineOptions},subwayD:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-d.png",graphicZIndex:zIndexPoint},Line:lineOptions},subwayE:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-e.png",graphicZIndex:zIndexPoint},Line:lineOptions},subwayH:{Point:{pointRadius:12,graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/lineasubte-h.png",graphicZIndex:zIndexPoint},Line:lineOptions},connection:{Point:{pointRadius:6,graphicZIndex:zIndexPoint},Line:{strokeWidth:8,strokeOpacity:defaultOpacity,graphicZIndex:zIndexLine}},train:{Point:{pointRadius:12,externalGraphic:g+"images/recorrido_tren20x20.png",graphicWidth:20,graphicHeight:20,graphicZIndex:zIndexPoint},Line:lineOptions},begintrain:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/tren.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},marker:{Point:{pointRadius:12,externalGraphic:g+"images/llegada2.png",backgroundGraphic:g+"images/fondo_hasta.png",graphicXOffset:-10,graphicYOffset:-30,backgroundXOffset:-10,backgroundYOffset:-30,graphicWidth:24,graphicHeight:37,graphicZIndex:zIndexMarker},Line:lineOptions}}}else{if(e=="walk"){var h={beginwalk:{Point:{graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/caminando.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},walk:{Point:{graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/caminando.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},marker:{Point:{pointRadius:12,externalGraphic:g+"images/llegada2.png",backgroundGraphic:g+"images/fondo_hasta.png",graphicXOffset:-10,graphicYOffset:-30,backgroundXOffset:-10,backgroundYOffset:-30,graphicWidth:24,graphicHeight:37,graphicZIndex:zIndexMarker},Line:lineOptions}}}else{if(e=="car"){var h={car:{Point:{graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/auto.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptions},marker:{Point:{pointRadius:12,externalGraphic:g+"images/llegada2.png",backgroundGraphic:g+"images/fondo_hasta.png",graphicXOffset:-10,graphicYOffset:-30,backgroundXOffset:-10,backgroundYOffset:-30,graphicWidth:24,graphicHeight:37,graphicZIndex:zIndexMarker},Line:lineOptions}}}else{if(e=="bike"){walkColor=color;bikeColor=color;pointRadius=4;lineOptionsBike={strokeWidth:3,strokeColor:bikeColor,strokeOpacity:defaultOpacity,graphicZIndex:zIndexLine};lineOptionsWalk={strokeWidth:4,strokeColor:walkColor,strokeDashstyle:"dashdot",strokeOpacity:defaultOpacity,graphicZIndex:zIndexLine};var h={walk:{Point:{graphicWidth:20,graphicHeight:20,externalGraphic:g+"images/recorrido_pie20x20.png",graphicZIndex:zIndexPoint},Line:lineOptionsWalk},bike:{Point:{externalGraphic:g+"images/recorrido_bici20x20.png",graphicWidth:20,graphicHeight:20,graphicZIndex:zIndexPoint},Line:lineOptionsBike},"Carril preferencial":{Point:{pointRadius:pointRadius,fillColor:bikeColor,strokeColor:bikeColor,graphicWidth:35,graphicHeight:35,graphicZIndex:zIndexPoint},Line:lineOptionsBike},"Ciclovía":{Point:{pointRadius:pointRadius,fillColor:bikeColor,strokeColor:bikeColor,graphicWidth:35,graphicHeight:35,graphicZIndex:zIndexPoint},Line:lineOptionsBike},beginwalk:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/caminando.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsWalk},beginbike:{Point:{pointRadius:12,graphicWidth:24,graphicHeight:37,externalGraphic:g+"images/bici.png",graphicXOffset:-10,graphicYOffset:-30,backgroundGraphic:g+"images/fondo_desde.png",backgroundXOffset:-10,backgroundYOffset:-30,graphicZIndex:zIndexMarker},Line:lineOptionsBike},end:{Point:{pointRadius:12,externalGraphic:g+"images/llegada2.png",backgroundGraphic:g+"images/fondo_hasta.png",graphicXOffset:-10,graphicYOffset:-30,backgroundXOffset:-10,backgroundYOffset:-30,graphicWidth:24,graphicHeight:37,graphicZIndex:zIndexMarker},Line:lineOptions}}}}}}styleMap.addUniqueValueRules("default","type",h);return styleMap},CLASS_NAME:"usig.GMLPlan"})}return new a(d,c)}}})(jQuery);

(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;jQuery.Class=function(){};jQuery.Class.create=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&c.prototype.init){return c.prototype.init.apply(this,arguments)}}c.prototype=e;c.prototype.constructor=c;c.extend=arguments.callee;return c}})();

jQuery.extendIf=function(b,d){if(b&&d){for(var a in d){if(typeof b[a]=="undefined"){b[a]=d[a]}}}return b};if(typeof(Ext)=="undefined"){jQuery.extend(Function.prototype,{createCallback:function(){var a=arguments;var b=this;return function(){return b.apply(window,a)}},createDelegate:function(c,b,a){var d=this;return function(){var f=b||arguments;if(a===true){f=Array.prototype.slice.call(arguments,0);f=f.concat(b)}else{if(typeof a=="number"){f=Array.prototype.slice.call(arguments,0);var e=[a,0].concat(b);Array.prototype.splice.apply(f,e)}}return d.apply(c||window,f)}},defer:function(c,e,b,a){var d=this.createDelegate(e,b,a);if(c){return setTimeout(d,c)}d();return 0},createSequence:function(b,a){if(typeof b!="function"){return this}var c=this;return function(){var d=c.apply(this||window,arguments);b.apply(a||this||window,arguments);return d}},createInterceptor:function(b,a){if(typeof b!="function"){return this}var c=this;return function(){b.target=this;b.method=c;if(b.apply(a||this||window,arguments)===false){return}return c.apply(this||window,arguments)}}});jQuery.extendIf(String,{escape:function(a){return a.replace(/('|\\)/g,"\\$1")},leftPad:function(d,b,c){var a=new String(d);if(!c){c=" "}while(a.length<b){a=c+a}return a.toString()},format:function(b){var a=Array.prototype.slice.call(arguments,1);return b.replace(/\{(\d+)\}/g,function(c,d){return a[d]})}})}String.prototype.isInteger=function(){return !isNaN(parseInt(this))};String.prototype.isFloat=function(){return !isNaN(parseFloat(this))};String.prototype.toggle=function(b,a){return this==b?a:b};String.prototype.trim=function(){var a=/^\s+|\s+$/g;return function(){return this.replace(a,"")}}();String.prototype.translate=function(d,c){if(!(d.length&&c.length)||d.length!=c.length){return this}var b=this;for(var a=0;a<d.length;a++){if(typeof(d)=="string"){b=b.replace(new RegExp(d.charAt(a),"g"),c.charAt(a))}else{b=b.replace(new RegExp(d[a],"g"),c[a])}}return b};String.prototype.isDigit=function(){return/^\d+$/.test(this)};String.prototype.removeWords=function(e){var d=this.split(" ");var c=new Array();for(var b=0;b<d.length;b++){c.push(d[b]);for(var a=0;a<e.length;a++){if(c[b]==e[a]){c.pop();break}}}return c.join(" ")};jQuery.extendIf(Number.prototype,{constrain:function(b,a){return Math.min(Math.max(this,b),a)},isInteger:function(){return !isNaN(parseInt(this))},isFloat:function(){return !isNaN(parseFloat(this))}});jQuery.extendIf(Array.prototype,{indexOf:function(c){for(var b=0,a=this.length;b<a;b++){if(this[b]==c){return b}}return -1},removeObject:function(b){var a=this.indexOf(b);if(a!=-1){this.splice(a,1)}return this},binarySearch:function binarySearch(f,b){var a=0,e=this.length-1,c,d;while(a<=e){c=parseInt((a+e)/2,10);d=b(this[c],f);if(d<0){a=c+1;continue}if(d>0){e=c-1;continue}return c}return -1},inject:function(c,b){for(var a=0;a<this.length;a++){c=b(c,this[a],a)}return c},map:function(d,c){var a=new Array(this.length);for(var b=0,e=this.length;b<e;b++){if(b in this){a[b]=d.call(c,this[b],b,this)}}return a},intersect:function(){if(!arguments.length){return[]}var e=this;var d=a2=null;var h=0;while(h<arguments.length){d=[];a2=arguments[h];var c=e.length;var b=a2.length;for(var g=0;g<c;g++){for(var f=0;f<b;f++){if(e[g]===a2[f]){d.push(e[g])}}}e=d;h++}return d.unique()},unique:function(){var c=[];var b=this.length;for(var e=0;e<b;e++){for(var d=e+1;d<b;d++){if(this[e]===this[d]){d=++e}}c.push(this[e])}return c}});Date.prototype.getElapsed=function(a){return Math.abs((a||new Date()).getTime()-this.getTime())};if(typeof(usig)=="undefined"){usig={}}usig.debug=function(a){if(window.console&&window.console.log){window.console.log(a)}};

var base_url = "http://uberreport.uberallcorp.com:8080/webservices.php/";
var app_dir = "/ba147/";

if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Direccion)=="undefined"){usig.Direccion=(function(a){return function(b,f){var e=null;var i=null;var h=0;var d=null;var g="";var c=null;if(b instanceof usig.Calle){e=b}else{return null}if(f instanceof usig.Calle){i=f;d=usig.Direccion.CALLE_Y_CALLE}else{if(!isNaN(parseInt(f))){d=usig.Direccion.CALLE_ALTURA;h=parseInt(f)}else{return null}}this.getCalle=function(){return e};this.getCalleCruce=function(){if(d==usig.Direccion.CALLE_Y_CALLE){return i}else{return null}};this.getAltura=function(){return h};this.getTipo=function(){return d};this.toString=function(){if(d==usig.Direccion.CALLE_ALTURA){return e.toString()+" "+(h>0?h:"S/N")}else{var j=i.toString();var k=j.match(/^(I|Hi|HI).*/)?" e ":" y ";return e.toString()+k+j}};this.setCoordenadas=function(j){c=usig.Punto.fromPunto(j)};this.setSmp=function(j){g=j};this.getCoordenadas=function(){return c};this.getSmp=function(){return g};this.clone=function(){var j=new usig.Direccion(e,f);return a.extend(true,j,this)};this.toJson=function(){return{tipo:d,calle:e.toJson(),altura:h,calle_cruce:i?i.toJson():null,smp:g,coordenadas:c}};this.isEqual=function(j){var k=(j instanceof usig.Direccion&&(d==j.getTipo())&&((d==usig.Direccion.CALLE_ALTURA&&e.isEqual(j.getCalle())&&h==j.getAltura())||(d==usig.Direccion.CALLE_Y_CALLE&&((e.isEqual(j.getCalle())&&i.isEqual(j.getCalleCruce()))||(e.isEqual(j.getCalleCruce())&&i.isEqual(j.getCalle()))))));return k}}})(jQuery);usig.Direccion.CALLE_ALTURA=0;usig.Direccion.CALLE_Y_CALLE=1;usig.Direccion.fromObj=function(c){var a=null;if(c.tipo!=undefined){a=new usig.Direccion(usig.Calle.fromObj(c.calle),(c.tipo==usig.Direccion.CALLE_ALTURA)?c.altura:usig.Calle.fromObj(c.calle_cruce))}else{var b=new usig.Calle(c.cod_calle,c.calle);if(c.cod_calle2!=null){a=new usig.Direccion(b,new usig.Calle(c.cod_calle2,c.calle2))}else{a=new usig.Direccion(b,c.altura)}}if(c.smp!=undefined&&c.smp!=null){a.setSmp(c.smp)}if(c.coordenadas!=undefined&&c.coordenadas!=null){if(typeof(c.coordenadas)=="string"){a.setCoordenadas(usig.Punto.fromWkt(c.coordenadas))}else{a.setCoordenadas(usig.Punto.fromObj(c.coordenadas))}}return a}};

if(typeof(usig)=="undefined"){usig={}}usig.Punto=function(b,a){this.x=this.lon=b;this.y=this.lat=a;this.getX=function(){return this.x};this.getY=function(){return this.y};this.toJson=function(){return'{ "x":'+this.x+', "y": '+this.y+" }"};this.toString=function(){return"("+this.x+", "+this.y+")"}};usig.Punto.fromWkt=function(b){var c=/^POINT *\(([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)\)$/;var a=null;if(resMatch=b.match(c)){a=new usig.Punto(resMatch[1],resMatch[2])}return a};usig.Punto.fromPunto=function(a){return new usig.Punto(a.getX(),a.getY())};usig.Punto.fromObj=function(a){return new usig.Punto(a.x,a.y)};

jQuery.extendIf=function(d,e){if(d&&e){for(var b in e){if(typeof d[b]=="undefined"){d[b]=e[b]}}}return d};if(typeof(Ext)=="undefined"){jQuery.extend(Function.prototype,{createCallback:function(){var b=arguments;var c=this;return function(){return c.apply(window,b)}},createDelegate:function(d,c,b){var e=this;return function(){var g=c||arguments;if(b===true){g=Array.prototype.slice.call(arguments,0);g=g.concat(c)}else{if(typeof b=="number"){g=Array.prototype.slice.call(arguments,0);var f=[b,0].concat(c);Array.prototype.splice.apply(g,f)}}return e.apply(d||window,g)}},defer:function(d,f,c,b){var e=this.createDelegate(f,c,b);if(d){return setTimeout(e,d)}e();return 0},createSequence:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){var e=d.apply(this||window,arguments);c.apply(b||this||window,arguments);return e}},createInterceptor:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){c.target=this;c.method=d;if(c.apply(b||this||window,arguments)===false){return}return d.apply(this||window,arguments)}}});jQuery.extendIf(String,{escape:function(b){return b.replace(/('|\\)/g,"\\$1")},leftPad:function(e,c,d){var b=new String(e);if(!d){d=" "}while(b.length<c){b=d+b}return b.toString()},format:function(c){var b=Array.prototype.slice.call(arguments,1);return c.replace(/\{(\d+)\}/g,function(d,e){return b[e]})}})}String.prototype.isInteger=function(){return !isNaN(parseInt(this))};String.prototype.isFloat=function(){return !isNaN(parseFloat(this))};String.prototype.toggle=function(c,b){return this==c?b:c};String.prototype.trim=function(){var b=/^\s+|\s+$/g;return function(){return this.replace(b,"")}}();String.prototype.translate=function(e,d){if(!(e.length&&d.length)||e.length!=d.length){return this}var c=this;for(var b=0;b<e.length;b++){if(typeof(e)=="string"){c=c.replace(new RegExp(e.charAt(b),"g"),d.charAt(b))}else{c=c.replace(new RegExp(e[b],"g"),d[b])}}return c};String.prototype.isDigit=function(){return/^\d+$/.test(this)};String.prototype.removeWords=function(f){var e=this.split(" ");var d=new Array();for(var c=0;c<e.length;c++){d.push(e[c]);for(var b=0;b<f.length;b++){if(d[c]==f[b]){d.pop();break}}}return d.join(" ")};jQuery.extendIf(Number.prototype,{constrain:function(c,b){return Math.min(Math.max(this,c),b)},isInteger:function(){return !isNaN(parseInt(this))},isFloat:function(){return !isNaN(parseFloat(this))}});jQuery.extendIf(Array.prototype,{indexOf:function(d){for(var c=0,b=this.length;c<b;c++){if(this[c]==d){return c}}return -1},removeObject:function(c){var b=this.indexOf(c);if(b!=-1){this.splice(b,1)}return this},binarySearch:function binarySearch(g,c){var b=0,f=this.length-1,d,e;while(b<=f){d=parseInt((b+f)/2,10);e=c(this[d],g);if(e<0){b=d+1;continue}if(e>0){f=d-1;continue}return d}return -1},inject:function(d,c){for(var b=0;b<this.length;b++){d=c(d,this[b],b)}return d},map:function(e,d){var b=new Array(this.length);for(var c=0,f=this.length;c<f;c++){if(c in this){b[c]=e.call(d,this[c],c,this)}}return b},intersect:function(){if(!arguments.length){return[]}var e=this;var d=a2=null;var h=0;while(h<arguments.length){d=[];a2=arguments[h];var c=e.length;var b=a2.length;for(var g=0;g<c;g++){for(var f=0;f<b;f++){if(e[g]===a2[f]){d.push(e[g])}}}e=d;h++}return d.unique()},unique:function(){var c=[];var b=this.length;for(var e=0;e<b;e++){for(var d=e+1;d<b;d++){if(this[e]===this[d]){d=++e}}c.push(this[e])}return c}});Date.prototype.getElapsed=function(b){return Math.abs((b||new Date()).getTime()-this.getTime())};if(typeof(usig)=="undefined"){usig={}}usig.debug=function(b){if(window.console&&window.console.log){window.console.log(b)}};if(typeof(usig)=="undefined"){usig={}}jQuery.extendIf(usig,{loadingJs:[],loadingJsListeners:{},__callLoadJsListeners:function(c){for(var d=0,b=usig.loadingJsListeners[c].length;d<b;d++){usig.loadingJsListeners[c][d]()}},loadJs:function(c,f){if(usig.loadingJs.indexOf(c)<0){usig.loadingJs.push(c);usig.loadingJsListeners[c]=(typeof(f)=="function")?[f]:[];var b=document.createElement("script"),d=document.getElementsByTagName("head")[0],e=false;b.onload=b.onreadystatechange=function(){if((b.readyState&&b.readyState!=="complete"&&b.readyState!=="loaded")||e){return false}b.onload=b.onreadystatechange=null;e=true;usig.__callLoadJsListeners(c)};b.src=c;d.insertBefore(b,d.firstChild)}else{usig.loadingJsListeners[c].push(f)}},loadCss:function(b){var c=document.createElement("link");c.setAttribute("rel","stylesheet");c.setAttribute("type","text/css");c.setAttribute("href",b);if(typeof c!="undefined"){document.getElementsByTagName("head")[0].appendChild(c)}},removeJs:function(b){var d=document.getElementsByTagName("script");for(var c=d.length;c>=0;c--){if(d[c]&&d[c].getAttribute("src")!=null&&d[c].getAttribute("src").indexOf(b)!=-1){d[c].parentNode.removeChild(d[c])}}},removeCss:function(b){var d=document.getElementsByTagName("link");for(var c=d.length;c>=0;c--){if(d[c]&&d[c].getAttribute("href")!=null&&d[c].getAttribute("href").indexOf(b)!=-1){d[c].parentNode.removeChild(d[c])}}},Animator:function(d,e,f,g){var c=0;function b(){if(d.length>c){e(d[c]);c++;setTimeout(b,f)}else{if(typeof(g)=="function"){g()}}}this.stop=function(){c=d.length+1};b()},parseUri:function(f){var b=["source","protocol","authority","domain","port","path","directoryPath","fileName","query","anchor"],c=new RegExp("^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?").exec(f),e={};for(var d=0;d<10;d++){e[b[d]]=(c[d]?c[d]:"")}if(e.directoryPath.length>0){e.directoryPath=e.directoryPath.replace(/\/?$/,"/")}return e},registeredSuggesters:{},registerSuggester:function(b,c){usig.registeredSuggesters[b]=c},createSuggester:function(c,b){if(typeof(usig.registeredSuggesters[c])!="function"){throw"Suggester "+c+" is not registered.";return null}return new usig.registeredSuggesters[c](b)}});jQuery.expr[":"].Contains=function(c,d,b){return jQuery(c).text().toUpperCase().indexOf(b[3].toUpperCase())>=0};(function(e){var c=function(o){return o!==undefined&&o!==null},n=function(q,o,p){c(q)&&q.apply(o,p)},f=function(o){setTimeout(o,0)},g="",b="&",l="?",m="success",h="error",j=e("head"),i={},d={callback:"C",url:location.href},k=function(t){t=e.extend({},d,t);var s=t.beforeSend,B=0;t.abort=function(){B=1};if(c(s)&&(s(t,t)===false||B)){return t}var r=t.success,p=t.complete,w=t.error,D=t.dataFilter,H=t.callbackParameter,x=t.callback,E=t.cache,o=t.pageCache,u=t.url,J=t.data,y=t.timeout,A,I,G,F;u=c(u)?u:g;J=c(J)?((typeof J)=="string"?J:e.param(J)):g;c(H)&&(J+=(J==g?g:b)+escape(H)+"=?");!E&&!o&&(J+=(J==g?g:b)+"_"+(new Date()).getTime()+"=");A=u.split(l);if(J!=g){I=J.split(l);F=A.length-1;F&&(A[F]+=b+I.shift());A=A.concat(I)}G=A.length-2;G&&(A[G]+=x+A.pop());var q=A.join(l),C=function(K){c(D)&&(K=D.apply(t,[K]));n(r,t,[K,m]);n(p,t,[t,m])},z=function(K){n(w,t,[t,K]);n(p,t,[t,K])},v=i[q];if(o&&c(v)){f(function(){c(v.s)?C(v.s):z(h)});return t}f(function(){if(B){return}var K=e("<iframe />").appendTo(j),M=K[0],O=M.contentWindow||M.contentDocument,Q=O.document,L,R,S=function(T,U){L();z(c(U)?U:h)},N=function(U){O[U]=undefined;try{delete O[U]}catch(T){}},P=x=="E"?"X":"E";if(!c(Q)){Q=O;O=Q.getParentNode()}Q.open();O[x]=function(T){B=1;o&&(i[q]={s:T});f(function(){L();C(T)})};O[P]=function(T){(!T||T=="complete")&&!B++&&f(S)};t.abort=L=function(){clearTimeout(R);Q.open();N(P);N(x);Q.write(g);Q.close();K.remove()};Q.write(['<html><head><script src="',q,'" onload="',P,'()" onreadystatechange="',P,'(this.readyState)"><\/script></head><body onload="',P,'()"></body></html>'].join(g));Q.close();y>0&&(R=setTimeout(function(){!B&&S(g,"timeout")},y))});return t};k.setup=function(o){e.extend(d,o)};e.jsonp=k})(jQuery);(function(){var b=false,c=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;jQuery.Class=function(){};jQuery.Class.create=function(h){var g=this.prototype;b=true;var f=new this();b=false;for(var e in h){f[e]=typeof h[e]=="function"&&typeof g[e]=="function"&&c.test(h[e])?(function(i,j){return function(){var l=this._super;this._super=g[i];var k=j.apply(this,arguments);this._super=l;return k}})(e,h[e]):h[e]}function d(){if(!b&&d.prototype.init){return d.prototype.init.apply(this,arguments)}}d.prototype=f;d.prototype.constructor=d;d.extend=arguments.callee;return d}})();if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());if(typeof(usig)=="undefined"){usig={}}usig.InputController=(function(b){return function(e,d){var h=document.getElementById(e);var c="";var g=b.extend({},usig.InputController.defaults,d);var i=function(k){var j=k.keyCode;if(window.event&&window.event.keyCode>0){j=window.event.keyCode}if(k.type!="blur"&&k.type!="focus"&&typeof(g.onKeyUp)=="function"){g.onKeyUp(j,h.value)}if(k.type!="blur"&&k.type!="focus"&&h.value!=c&&typeof(g.onChange)=="function"){c=h.value;g.onChange(h.value)}if(k.type=="blur"&&typeof(g.onBlur)=="function"){g.onBlur()}if(k.type=="focus"&&typeof(g.onFocus)=="function"){g.onFocus()}};var f=i.createDelegate(this);this.unbind=function(){b(h).unbind(g.events,f)};this.bind=function(){b(h).bind(g.events,f);c=b(h).val()};this.setOptions=function(j){g=b.extend({},g,j)};this.setValue=function(j){h.value=j;c=j};this.setFocus=function(){b(h).focus()};if(!h){throw"InvalidField";return}else{this.bind()}}})(jQuery);usig.InputController.defaults={events:document.all?"blur keydown keyup input focus":"blur keydown input focus"};if(typeof(usig)=="undefined"){usig={}}usig.AutoCompleter=(function(b){return function(k,e,c){var d=document.getElementById(k),s=c,q=[],g={},t=b.extend({},usig.AutoCompleter.defaults,e),v=null,p=true,l=[],n={},r=0,j=false;d.setAttribute("autocomplete","off");this.unbind=function(){v.unbind();f();s.hide()};this.bind=function(){v.bind()};this.destroy=function(){this.unbind();s.remove();delete v;while(q.length>0){q.pop()}for(var F=0;F<l.length;F++){delete l[F]}};this.setViewControl=function(i){s=i;s.onSelection(D.createDelegate(this))};this.setOptions=function(i){t=b.extend({},t,i);s.setOptions(i)};this.addSuggester=function(I,G){var F=typeof(I)=="string"?I:I.name;if(typeof(g[F])=="undefined"){var i=I;if(typeof(I)=="string"){try{i=usig.createSuggester(F,{onReady:t.onReady,debug:t.debug,maxRetries:t.maxRetries,afterServerRequest:w.createDelegate(this,[F],1),afterServerResponse:A.createDelegate(this,[F],1),afterAbort:B.createDelegate(this,[F],1)})}catch(J){return false}}else{i.setOptions({debug:t.debug,maxRetries:t.maxRetries,afterServerRequest:w.createDelegate(this,[F],1),afterServerResponse:A.createDelegate(this,[F],1),afterAbort:B.createDelegate(this,[F],1)})}g[F]=i;n[F]=0;var H={inputPause:t.inputPause,maxSuggestions:t.maxSuggestions,serverTimeout:t.serverTimeout,minTextLength:t.minTextLength,maxRetries:t.maxRetries,showError:t.showError};H=b.extend(H,G);q.push({suggester:i,options:H,inputTimer:null})}else{}};this.removeSuggester=function(F){if(typeof(g[F])!="undefined"){g[F]=undefined;for(var G=0;G<q.length;G++){if(q[G].suggester.name==F){q.removeObject(q[G]);break}}}else{}};this.setSuggesterOptions=function(G,F){if(typeof(g[G])!="undefined"){for(var H=0;H<q.length;H++){if(q[H].suggester.name==G){q[H].options=b.extend(q[H].options,F);break}}}else{}};this.getSuggesters=function(){var G={};for(var F=0;F<q.length;F++){G[q[F].suggester.name]=b.extend({},q[F].options)}return G};this.changeSkin=function(i){s.changeSkin(i)};this.getOptions=function(){return t};this.selectOption=function(i){return s.selectOption(i)};this.hide=function(){s.hide()};this.ready=function(F){var i=false;if(F){i=g[F].ready()}else{for(z=0;z<q.length;z++){i=i||q[z].suggester.ready()}}return i};function E(I,H){var G=I.suggester;var F=I.options;i=function i(K,J){if(d.value==J){if(K.getErrorMessage!=undefined){try{if(!j&&F.showError){s.showMessage(K.getErrorMessage())}}catch(L){if(!j&&F.showError){s.showMessage(t.texts.nothingFound)}}}else{if(K.length==0){if(!j&&F.showError){s.showMessage(t.texts.nothingFound)}}else{K=K.map(function(M){M.suggesterName=G.name;return M});s.show(K,j);j=true;if(!p){s.hide()}}}if(typeof(t.afterSuggest)=="function"){t.afterSuggest()}}else{}};G.getSuggestions(H,i.createDelegate(this,[H],1),F.maxSuggestions)}function f(){for(var F=0;F<q.length;F++){if(q[F].inputTimer){clearTimeout(q[F].inputTimer)}q[F].suggester.abort()}if(typeof(t.afterAbort)=="function"){t.afterAbort()}}function D(i){f();var F=i.toString();v.setValue(F);if(typeof(t.afterSelection)=="function"){t.afterSelection(i)}if(typeof(t.afterGeoCoding)=="function"){if(typeof(t.beforeGeoCoding)=="function"){t.beforeGeoCoding()}g[i.suggesterName].getGeoCoding(i,h)}v.setFocus()}function C(i,G,F){if(i.descripcion!=undefined&&i.descripcion!=""){return'<li class="acv_op"><a href="#" class="acv_op" name="'+G+'"><span class="tl"/><span class="tr"/><span>'+F(i.toString())+'</span><span class="clase">('+i.descripcion+")</span></a></li>"}else{return'<li class="acv_op"><a href="#" class="acv_op" name="'+G+'"><span class="tl"/><span class="tr"/><span>'+F(i.toString())+"</span></a></li>"}}function x(H){try{f();s.update(H);if(typeof(t.onInputChange)=="function"){t.onInputChange(H)}}catch(F){throw (F)}j=false;for(var G=0;G<q.length;G++){if(H.length>=q[G].options.minTextLength){q[G].inputTimer=E.defer(q[G].options.inputPause,this,[q[G],H])}}}function m(i){s.keyUp(i)}function u(){p=false;if(t.hideOnBlur){s.hide.defer(300)}}function o(){p=true}function B(i){if(n[i]>0){n[i]--;r--}}function w(i){n[i]++;r++;if(typeof(t.afterServerRequest)=="function"){t.afterServerRequest()}}function A(i){if(n[i]>0){n[i]--;r--}if(typeof(t.afterServerResponse)=="function"&&r==0){t.afterServerResponse()}}function h(i){if(i instanceof usig.Suggester.GeoCodingTypeError){v.setValue(d.value+" ")}t.afterGeoCoding(i)}try{v=new usig.InputController(k,{onKeyUp:m.createDelegate(this),onChange:x.createDelegate(this),onBlur:u.createDelegate(this),onFocus:o.createDelegate(this),debug:t.debug})}catch(y){throw (y)}for(var z=0;z<t.suggesters.length;z++){this.addSuggester(t.suggesters[z].suggester,t.suggesters[z].options)}if(!s){s=new usig.AutoCompleterDialog(k,{maxOptions:t.maxOptions,rootUrl:t.rootUrl,debug:t.debug,skin:t.skin,autoSelect:t.autoSelect,autoHideTimeout:t.autoHideTimeout,optionsFormatter:C,onEnterWithoutSelection:t.onEnterWithoutSelection,idDiv:t.idOptionsDiv});l.push(s)}s.onSelection(D.createDelegate(this))}})(jQuery);usig.AutoCompleter.defaults={inputPause:200,maxSuggestions:10,serverTimeout:30000,minTextLength:3,maxRetries:1,showError:true,maxOptions:10,offsetY:-5,zIndex:10000,autoHideTimeout:10000,hideOnBlur:true,autoSelect:true,rootUrl:"http://servicios.usig.buenosaires.gov.ar/usig-js/dev/",skin:"usig4",idOptionsDiv:undefined,suggesters:[{suggester:"Direcciones",options:{inputPause:10,minTextLength:3}},{suggester:"Lugares",options:{inputPause:500,minTextLength:3,showError:false}}],debug:false,texts:{nothingFound:"No se hallaron resultados coincidentes con su b&uacute;squeda."}};if(typeof(usig)=="undefined"){usig={}}usig.AutoCompleterDialog=(function(b){return function(i,e){var c=document.getElementById(i),j=c.value,p=b.extend({},usig.AutoCompleterDialog.defaults,e),r=p.idDiv||"usig_acv_"+i,o=null,h=-1,d=false,m=0,w=null,g={},x={arrUp:38,arrDn:40,enter:13,esc:27};function l(){clearTimeout(o)}function q(){l();if(p.autoHideTimeout>0){o=s.defer(p.autoHideTimeout,this)}}function s(){w.fadeOut("slow")}function t(y){l();if(w){b("#"+r+" div.content").html(y);w.show();h=-1}else{w=b('<div id="'+r+'" class="usig_acv">						<div class="header">							<div class="corner"/>							<div class="bar"/>						</div>						<div class="content">'+y+'</div>						<div class="footer">							<div class="corner"/>							<div class="bar"/>						</div>					</div>');var z=b(c).offset();w.css({position:"absolute",left:z.left+"px",top:(z.top+c.offsetHeight+parseInt(p.offsetY))+"px",width:c.offsetWidth,zIndex:p.zIndex});b("body").append(w);w.mouseover(l.createDelegate(this));w.mouseout(q.createDelegate(this));h=-1;w.show()}o=s.defer(p.autoHideTimeout,this)}function k(){if(w){h=-1;b("ul.options li.highlight",w).removeClass("highlight")}}function f(y){if(w){h=y;b("ul.options li.highlight",w).removeClass("highlight");if(typeof(y)=="string"){b('ul.options li:has(a[name="'+y+'"])',w).addClass("highlight");h=parseInt(y.replace(r,""))}else{b("ul.options li:has(a)",w).slice(y,y+1).addClass("highlight")}}}function n(y){var F=new y.constructor(y);F.marked=Array();var E=j.split(" ");for(var B=0;B<E.length;B++){var D=F.toLowerCase().indexOf(E[B].toLowerCase());if(D<0){var D=F.toLowerCase().indexOf(E[B].translate("áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toLowerCase())}if(D>=0){for(var C=0;C<E[B].length;C++){F.marked[D+C]=true}}}var A="";var z=false;for(var B=0;B<F.length;B++){if(F.marked[B]&&!z){A=A+"<em>"+F.substring(B,B+1);z=true}else{if((F.marked[B]&&z)||(!F.marked[B]&&!z)){A=A+F.substring(B,B+1)}else{A=A+"</em>"+F.substring(B,B+1);z=false}}}if(z){A=A+"</em>"}return A}function v(y){if(typeof(p.onSelection)=="function"){l();s();p.onSelection(y)}}function u(){l();h=-1;m=0;g={}}this.setOptions=function(y){p=b.extend({},p,y)};this.update=function(y){if(y==""&&w){w.hide()}j=y;u()};this.getOptions=function(){return p};this.show=function(z,y){var B="";var C=isNaN(parseInt(y))?0:parseInt(y);if(y!=undefined){if(C>0){b("ul.options li",w).slice(C).remove();m=b("ul.options li a",w).length}}else{m=0;g={}}var A=n;b.each(z,function(D,E){if(m>=p.maxOptions){return false}if(typeof(E)=="string"){B+='<li class="acv_op message">'+E+"</li>"}else{if(typeof(p.optionsFormatter)=="function"){B+=p.optionsFormatter(E,r+m,A);g[r+m]=E;m++}else{if(typeof(E.toString)=="function"){B+='<li class="acv_op"><a href="#" class="acv_op" name="'+r+m+'"><span class="tl"/><span class="tr"/><span>'+A(E.toString())+"</span></a></li>";g[r+m]=E;m++}}}});if((y===true||!isNaN(parseInt(y)))&&w&&b("ul.options li a",w).length>0){if(m>1&&d){d=false;k()}b("ul.options",w).append(B)}else{if(p.idDiv){w.html('<div class="content"><ul class="options">'+B+"</ul></div>");w.show()}else{t('<ul class="options">'+B+"</ul>")}}b("ul.options li.acv_op",w).mouseover((function(E,D){if(E.target.name){D(E.target.name)}else{D(b(E.target).parents("a").attr("name"))}}).createDelegate(this,[f],1));b("ul.options li.acv_op",w).click((function(E){E.preventDefault();var F=E.target?E.target:E.srcElement;var D=b(F).parents("a.acv_op").attr("name")||b("a.acv_op",b(F)).attr("name");v(g[D])}).createDelegate(this));if(p.autoSelect&&m==1){h=0;d=true;f(h)}};this.showMessage=function(y){if(p.idDiv){w.html('<div class="content"><div class="message">'+y+"</div></div>");w.show()}else{t('<div class="message">'+y+"</div>")}};this.keyUp=function(y){if(h==undefined){h=-1}if((y==x.arrDn||y==x.arrUp)&&m>0){if(w.css("display")!="block"){w.show()}else{q();h=y==x.arrDn?(h+1).constrain(0,m-1):(h-1).constrain(0,m-1);f(h)}}if(x.enter==y){if(w.css("display")!="block"){if(typeof(p.onEnterWithoutSelection)=="function"){p.onEnterWithoutSelection(j)}w.show()}else{if(h>=0||m==1){if(h>=0){v(g[r+h])}else{v(g[r+"0"])}}else{if(m>0&&typeof(p.onEnterWithoutSelection)=="function"){p.onEnterWithoutSelection(j)}}}}if(x.esc==y){l();s()}};this.remove=function(){l();if(w){w.remove()}};this.onSelection=function(y){if(typeof(y)=="function"){p.onSelection=y}};this.selectOption=function(y){if(m>y){if(w.css("display")!="block"){w.show()}f(y);v(g[r+h]);return true}return false};this.changeSkin=function(y){usig.removeCss(p.rootUrl+"css/usig.AutoCompleterDialog."+p.skin+".css");p.skin=y;usig.loadCss(p.rootUrl+"css/usig.AutoCompleterDialog."+p.skin+".css")};this.hide=function(){l();if(w){w.hide()}};if(p.skin!="custom"){usig.loadCss(p.rootUrl+"css/usig.AutoCompleterDialog."+p.skin+".css")}if(p.idDiv){w=b("#"+p.idDiv);w.addClass("usig_acv")}}})(jQuery);usig.AutoCompleterDialog.defaults={maxOptions:10,debug:false,offsetY:-5,zIndex:10000,autoHideTimeout:5000,autoSelect:true,rootUrl:"http://servicios.usig.buenosaires.gov.ar/usig-js/2.3/",skin:"usig4"};if(typeof(usig)=="undefined"){usig={}}usig.Suggester=(function(b){return jQuery.Class.create({init:function(d,c){this.name=d;this.cleanList=[];this.opts=b.extend({},usig.Suggester.defaults,c)},getSuggestions:function(c,e,d){throw new usig.Suggester.MethodNotImplemented()},getGeoCoding:function(c,d){throw new usig.Suggester.MethodNotImplemented()},abort:function(){},setOptions:function(c){this.opts=b.extend({},this.opts,c)},getOptions:function(){return this.opts},ready:function(){throw new usig.Suggester.MethodNotImplemented()},destroy:function(){for(var c=0;c<this.cleanList.length;c++){delete this.cleanList[c]}}})})(jQuery);usig.Suggester.defaults={debug:false,serverTimeout:15000,maxRetries:5,maxSuggestions:10};usig.Suggester.MethodNotImplemented=function(){this.msg="Suggester: Method Not Implemented.";this.toString=function(){return this.msg}};usig.Suggester.GeoCodingTypeError=function(){this.msg="Suggester: Wrong object type for geocoding.";this.toString=function(){return this.msg}};if(typeof(usig)=="undefined"){usig={}}usig.AjaxComponent=(function(b){return jQuery.Class.create({init:function(f,c,e){this.name=f;var d=window.location.host==usig.parseUri(c).authority?"json":"jsonp";this.defaultParams={type:"GET",url:c,dataType:d};jQuery.jsonp.setup({callbackParameter:"callback",pageCache:true,dataFilter:function(g){return JSON.parse(JSON.stringify(g))}});this.opts=b.extend({},usig.AjaxComponent.defaults,e)},mkRequest:function(h,l,j,e){var d=null,i=0;function c(n,o){clearTimeout(d);if(typeof(this.opts.afterServerResponse)=="function"){this.opts.afterServerResponse()}o(n)}function g(n,o){if(i>=this.opts.maxRetries){clearTimeout(d);o(n)}else{}}function k(n,p){if(n!=null&&n.readyState!=0&&n.readyState!=4){n.abort();if(typeof(this.opts.afterAbort)=="function"){this.opts.afterAbort()}if(this.opts.maxRetries>i){i++;var o=(p.dataType=="jsonp")?b.jsonp(p):b.ajax(p);if(typeof(this.opts.afterRetry)=="function"){this.opts.afterRetry()}d=setTimeout(k.createDelegate(this,[o,m]),this.opts.serverTimeout)}else{if(typeof(p.error)=="function"){p.error("Se produjo un error al intentar acceder al servidor: "+p.url)}}}}if(typeof(l)!="function"){return}if(typeof(j)!="undefined"&&typeof(j)!="function"){return}var m=b.extend(true,{},this.defaultParams,{success:c.createDelegate(this,[l],1),error:g.createDelegate(this,[j],1),data:h});if(e){m.url=e}var f=(m.dataType=="jsonp")?b.jsonp(m):b.ajax(m);if(typeof(this.opts.afterServerRequest)=="function"){this.opts.afterServerRequest()}if(this.opts.serverTimeout>0){d=setTimeout(k.createDelegate(this,[f,m]),this.opts.serverTimeout)}return f},setOptions:function(c){this.opts=b.extend({},this.opts,c)},getOptions:function(){return this.opts}})})(jQuery);usig.AjaxComponent.defaults={debug:false,serverTimeout:30000,maxRetries:1};if(typeof(usig)=="undefined"){usig={}}usig.Punto=function(c,b){this.x=this.lon=c;this.y=this.lat=b;this.getX=function(){return this.x};this.getY=function(){return this.y};this.toJson=function(){return'{ "x":'+this.x+', "y": '+this.y+" }"};this.toString=function(){return"("+this.x+", "+this.y+")"}};usig.Punto.fromWkt=function(c){var d=/^POINT *\(([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)\)$/;var b=null;if(resMatch=c.match(d)){b=new usig.Punto(resMatch[1],resMatch[2])}return b};usig.Punto.fromPunto=function(b){return new usig.Punto(b.getX(),b.getY())};usig.Punto.fromObj=function(b){return new usig.Punto(b.x,b.y)};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Calle)=="undefined"){usig.Calle=function(b,c,e,d){this.codigo=b;this.nombre=c;this.alturaValida=function(g){if(e instanceof Array){if(e.length==0){throw (new usig.ErrorCalleSinAlturas(this.nombre));return false}var f=false;for(a in e){f=f||((parseInt(e[a][0])<=parseInt(g))&&(parseInt(e[a][1])>=parseInt(g)))}return f}};this.getTramos=function(){return e};this.toString=function(){return this.nombre};this.seCruzaCon=function(f){if(d){return d.indexOf(f.codigo)>=0}};this.toJson=function(){return{codigo:this.codigo,nombre:this.nombre}};this.isEqual=function(f){return this.codigo==f.codigo}};usig.Calle.fromObj=function(b){return new usig.Calle(b.codigo,b.nombre)}}if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Direccion)=="undefined"){usig.Direccion=(function(b){return function(c,g){var f=null;var j=null;var i=0;var e=null;var h="";var d=null;if(c instanceof usig.Calle){f=c}else{return null}if(g instanceof usig.Calle){j=g;e=usig.Direccion.CALLE_Y_CALLE}else{if(!isNaN(parseInt(g))){e=usig.Direccion.CALLE_ALTURA;i=parseInt(g)}else{return null}}this.getCalle=function(){return f};this.getCalleCruce=function(){if(e==usig.Direccion.CALLE_Y_CALLE){return j}else{return null}};this.getAltura=function(){return i};this.getTipo=function(){return e};this.toString=function(){if(e==usig.Direccion.CALLE_ALTURA){return f.toString()+" "+(i>0?i:"S/N")}else{var k=j.toString();var l=k.match(/^(I|Hi|HI).*/)?" e ":" y ";return f.toString()+l+k}};this.setCoordenadas=function(k){d=usig.Punto.fromPunto(k)};this.setSmp=function(k){h=k};this.getCoordenadas=function(){return d};this.getSmp=function(){return h};this.clone=function(){var k=new usig.Direccion(f,g);return b.extend(true,k,this)};this.toJson=function(){return{tipo:e,calle:f.toJson(),altura:i,calle_cruce:j?j.toJson():null,smp:h,coordenadas:d}};this.isEqual=function(k){var l=(k instanceof usig.Direccion&&(e==k.getTipo())&&((e==usig.Direccion.CALLE_ALTURA&&f.isEqual(k.getCalle())&&i==k.getAltura())||(e==usig.Direccion.CALLE_Y_CALLE&&((f.isEqual(k.getCalle())&&j.isEqual(k.getCalleCruce()))||(f.isEqual(k.getCalleCruce())&&j.isEqual(k.getCalle()))))));return l}}})(jQuery);usig.Direccion.CALLE_ALTURA=0;usig.Direccion.CALLE_Y_CALLE=1;usig.Direccion.fromObj=function(d){var b=null;if(d.tipo!=undefined){b=new usig.Direccion(usig.Calle.fromObj(d.calle),(d.tipo==usig.Direccion.CALLE_ALTURA)?d.altura:usig.Calle.fromObj(d.calle_cruce))}else{var c=new usig.Calle(d.cod_calle,d.calle);if(d.cod_calle2!=null){b=new usig.Direccion(c,new usig.Calle(d.cod_calle2,d.calle2))}else{b=new usig.Direccion(c,d.altura)}}if(d.smp!=undefined&&d.smp!=null){b.setSmp(d.smp)}if(d.coordenadas!=undefined&&d.coordenadas!=null){if(typeof(d.coordenadas)=="string"){b.setCoordenadas(usig.Punto.fromWkt(d.coordenadas))}else{b.setCoordenadas(usig.Punto.fromObj(d.coordenadas))}}return b}}if(typeof(usig)=="undefined"){usig={}}usig.GeoCoder=(function(b){return usig.AjaxComponent.extend({metodos:["interpolacion","puertas","centroide"],init:function(c){var d=b.extend({},usig.GeoCoder.defaults,c);this._super("GeoCoder",usig.GeoCoder.defaults.server,d)},validarMetodo:function(c){if(c!=undefined){if(this.metodos.indexOf(c)>=0){return c}}else{if(this.opts.metodo!=undefined){return this.opts.metodo}}return undefined},onSuccess:function(c,d){if(typeof(c)!="string"){d(new usig.Punto(c.x,c.y))}else{d(c)}},geoCodificarDireccion:function(d,f,c,e){if(!(d instanceof usig.Direccion)){throw ("dir debe ser una instancia de usig.Direccion");return}if(d.getTipo()==usig.Direccion.CALLE_ALTURA){this.geoCodificarCodigoDeCalleAltura(d.getCalle().codigo,d.getAltura(),f,c,e)}else{this.geoCodificar2CodigosDeCalle(d.getCalle().codigo,d.getCalleCruce().codigo,f,c)}},geoCodificarCalleAltura:function(f,h,g,c,d){if(!h.isInteger()){throw ("altura tiene que ser un entero");return}var e={cod_calle:f,altura:h};d=this.validarMetodo(d);if(d!=undefined){e.metodo=d}this.mkRequest(e,this.onSuccess.createDelegate(this,[g],1),c,this.opts.server+"geocoding/")},geoCodificarCodigoDeCalleAltura:function(e,h,g,c,d){if(!e.isInteger()){throw ("codCalle tiene que ser un entero");return}if(!h.isInteger()){throw ("altura tiene que ser un entero");return}var f={cod_calle:e,altura:h};d=this.validarMetodo(d);if(d!=undefined){f.metodo=d}this.mkRequest(f,this.onSuccess.createDelegate(this,[g],1),c,this.opts.server+"geocoding/")},geoCodificarCalleYCalle:function(d,c,g,e){var f={cod_calle1:d,cod_calle2:c};this.mkRequest(f,this.onSuccess.createDelegate(this,[g],1),e,this.opts.server+"geocoding/")},geoCodificar2CodigosDeCalle:function(g,e,f,c){if(!g.isInteger()){throw ("codCalle1 tiene que ser un entero");return}if(!e.isInteger()){throw ("codCalle2 tiene que ser un entero");return}var d={cod_calle1:g,cod_calle2:e};this.mkRequest(d,this.onSuccess.createDelegate(this,[f],1),c,this.opts.server+"geocoding/")},reverseGeoCoding:function(c,g,f,d){var e={x:c,y:g};this.mkRequest(e,f,d,this.opts.server+"reversegeocoding/")},getSMP:function(g,f,e,c){var d={cod_calle:g,altura:f};this.mkRequest(d,e,c,this.opts.server+"smp/")}})})(jQuery);usig.GeoCoder.defaults={debug:false,server:"http://ws.usig.buenosaires.gob.ar/geocoder/2.2/",metodo:undefined};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.inventario)=="undefined"){usig.inventario={}}usig.inventario.Objeto=(function(b){return function(c,d){this.id=0;this.nombre=usig.inventario.Objeto.defaults.texts.noName;this.ubicacion=null;this.clase=d;this.direccionAsociada=null;this.fechaAlta=null;this.fechaUltimaModificacion=null;this.datos={};this.rawData={};this.descripcion=null;if(d!=undefined){this.descripcion=d.getNombre()}this.fill=function(f){if(f.id){this.id=f.id}if(f.nombre){this.nombre=f.nombre}if(f.ubicacion){this.ubicacion=new usig.inventario.Ubicacion(f.ubicacion);this.rawData.ubicacion=f.ubicacion}if(f.fechaAlta){this.fechaAlta=new Date(f.fechaAlta);this.rawData.fechaAlta=f.fechaAlta}if(f.fechaUltimaModificacion){this.fechaUltimaModificacion=new Date(f.fechaUltimaModificacion);this.rawData.fechaUltimaModificacion=f.fechaUltimaModificacion}if(f.direccionAsociada){try{this.direccionAsociada=usig.Direccion.fromObj(f.direccionAsociada);this.rawData.direccionAsociada=f.direccionAsociada}catch(g){}}else{if(f.direccionNormalizada&&usig.NormalizadorDirecciones){try{this.direccionAsociada=usig.NormalizadorDirecciones.normalizar(f.direccionNormalizada,1)[0];this.direccionAsociada.setCoordenadas(this.ubicacion.getCentroide());this.rawData.direccionAsociada=this.direccionAsociada.toJson()}catch(g){}}}if(f.contenido){var h=this.datos;b.each(f.contenido,function(j,e){h[e.nombreId]={alias:e.nombre,valor:e.valor,pos:e.posicion}})}};this.toString=function(){return this.nombre};this.getRawData=function(){return this.rawData};this.clone=function(){var e=new usig.inventario.Objeto(c,d);return b.extend(true,e,this)};this.toJson=function(){var e=this.getRawData();if(this.clase&&this.clase.toJson){e.clase=this.clase.toJson()}if(this.direccionAsociada&&this.direccionAsociada.toJson){e.direccionAsociada=this.direccionAsociada.toJson()}return e};this.isEqual=function(e){return e instanceof usig.inventario.Objeto&&e.id==this.id};this.fill(c);this.rawData=b.extend(this.rawData,c)}})(jQuery);usig.inventario.Objeto.fromObj=function(b){return new usig.inventario.Objeto(b,usig.inventario.Clase.fromObj(b.clase))};usig.inventario.Objeto.defaults={texts:{noName:"Sin Nombre"}};if(typeof(usig)=="undefined"){usig={}}usig.SuggesterDirecciones=(function(b){return usig.Suggester.extend({init:function(c){this._super("Direcciones",c);if(!this.opts.normalizadorDirecciones){this.opts.normalizadorDirecciones=usig.NormalizadorDirecciones.init({aceptarCallesSinAlturas:this.opts.acceptSN,onReady:this.opts.onReady});this.cleanList.push(this.opts.normalizadorDirecciones)}if(!this.opts.geoCoder){this.opts.geoCoder=new usig.GeoCoder(this.opts);this.cleanList.push(this.opts.geoCoder)}},getSuggestions:function(e,g,f){var c=f!=undefined?f:this.opts.maxSuggestions;try{g(this.opts.normalizadorDirecciones.normalizar(e,c))}catch(d){g(d)}},getGeoCoding:function(c,d){if(!(c instanceof usig.Direccion)){d(new usig.Suggester.GeoCodingTypeError())}else{this.opts.geoCoder.geoCodificarDireccion(c,d)}},ready:function(){return this.opts.normalizadorDirecciones.listo()},setOptions:function(c){opts=b.extend({},this.opts,c);this._super(opts);this.opts.geoCoder.setOptions(opts)}})})(jQuery);usig.SuggesterDirecciones.defaults={debug:false,serverTimeout:5000,maxRetries:5,maxSuggestions:10,acceptSN:true};usig.registerSuggester("Direcciones",usig.SuggesterDirecciones);jQuery.extendIf=function(d,e){if(d&&e){for(var b in e){if(typeof d[b]=="undefined"){d[b]=e[b]}}}return d};if(typeof(Ext)=="undefined"){jQuery.extend(Function.prototype,{createCallback:function(){var b=arguments;var c=this;return function(){return c.apply(window,b)}},createDelegate:function(d,c,b){var e=this;return function(){var g=c||arguments;if(b===true){g=Array.prototype.slice.call(arguments,0);g=g.concat(c)}else{if(typeof b=="number"){g=Array.prototype.slice.call(arguments,0);var f=[b,0].concat(c);Array.prototype.splice.apply(g,f)}}return e.apply(d||window,g)}},defer:function(d,f,c,b){var e=this.createDelegate(f,c,b);if(d){return setTimeout(e,d)}e();return 0},createSequence:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){var e=d.apply(this||window,arguments);c.apply(b||this||window,arguments);return e}},createInterceptor:function(c,b){if(typeof c!="function"){return this}var d=this;return function(){c.target=this;c.method=d;if(c.apply(b||this||window,arguments)===false){return}return d.apply(this||window,arguments)}}});jQuery.extendIf(String,{escape:function(b){return b.replace(/('|\\)/g,"\\$1")},leftPad:function(e,c,d){var b=new String(e);if(!d){d=" "}while(b.length<c){b=d+b}return b.toString()},format:function(c){var b=Array.prototype.slice.call(arguments,1);return c.replace(/\{(\d+)\}/g,function(d,e){return b[e]})}})}String.prototype.isInteger=function(){return !isNaN(parseInt(this))};String.prototype.isFloat=function(){return !isNaN(parseFloat(this))};String.prototype.toggle=function(c,b){return this==c?b:c};String.prototype.trim=function(){var b=/^\s+|\s+$/g;return function(){return this.replace(b,"")}}();String.prototype.translate=function(e,d){if(!(e.length&&d.length)||e.length!=d.length){return this}var c=this;for(var b=0;b<e.length;b++){if(typeof(e)=="string"){c=c.replace(new RegExp(e.charAt(b),"g"),d.charAt(b))}else{c=c.replace(new RegExp(e[b],"g"),d[b])}}return c};String.prototype.isDigit=function(){return/^\d+$/.test(this)};String.prototype.removeWords=function(f){var e=this.split(" ");var d=new Array();for(var c=0;c<e.length;c++){d.push(e[c]);for(var b=0;b<f.length;b++){if(d[c]==f[b]){d.pop();break}}}return d.join(" ")};jQuery.extendIf(Number.prototype,{constrain:function(c,b){return Math.min(Math.max(this,c),b)},isInteger:function(){return !isNaN(parseInt(this))},isFloat:function(){return !isNaN(parseFloat(this))}});jQuery.extendIf(Array.prototype,{indexOf:function(d){for(var c=0,b=this.length;c<b;c++){if(this[c]==d){return c}}return -1},removeObject:function(c){var b=this.indexOf(c);if(b!=-1){this.splice(b,1)}return this},binarySearch:function binarySearch(g,c){var b=0,f=this.length-1,d,e;while(b<=f){d=parseInt((b+f)/2,10);e=c(this[d],g);if(e<0){b=d+1;continue}if(e>0){f=d-1;continue}return d}return -1},inject:function(d,c){for(var b=0;b<this.length;b++){d=c(d,this[b],b)}return d},map:function(e,d){var b=new Array(this.length);for(var c=0,f=this.length;c<f;c++){if(c in this){b[c]=e.call(d,this[c],c,this)}}return b},intersect:function(){if(!arguments.length){return[]}var e=this;var d=a2=null;var h=0;while(h<arguments.length){d=[];a2=arguments[h];var c=e.length;var b=a2.length;for(var g=0;g<c;g++){for(var f=0;f<b;f++){if(e[g]===a2[f]){d.push(e[g])}}}e=d;h++}return d.unique()},unique:function(){var c=[];var b=this.length;for(var e=0;e<b;e++){for(var d=e+1;d<b;d++){if(this[e]===this[d]){d=++e}}c.push(this[e])}return c}});Date.prototype.getElapsed=function(b){return Math.abs((b||new Date()).getTime()-this.getTime())};if(typeof(usig)=="undefined"){usig={}}usig.debug=function(b){if(window.console&&window.console.log){window.console.log(b)}};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Calle)=="undefined"){usig.Calle=function(b,c,e,d){this.codigo=b;this.nombre=c;this.alturaValida=function(g){if(e instanceof Array){if(e.length==0){throw (new usig.ErrorCalleSinAlturas(this.nombre));return false}var f=false;for(a in e){f=f||((parseInt(e[a][0])<=parseInt(g))&&(parseInt(e[a][1])>=parseInt(g)))}return f}};this.getTramos=function(){return e};this.toString=function(){return this.nombre};this.seCruzaCon=function(f){if(d){return d.indexOf(f.codigo)>=0}};this.toJson=function(){return{codigo:this.codigo,nombre:this.nombre}};this.isEqual=function(f){return this.codigo==f.codigo}};usig.Calle.fromObj=function(b){return new usig.Calle(b.codigo,b.nombre)}}if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.Direccion)=="undefined"){usig.Direccion=(function(b){return function(c,g){var f=null;var k=null;var j=0;var e=null;var h="";var d=null;if(c instanceof usig.Calle){f=c}else{return null}if(g instanceof usig.Calle){k=g;e=usig.Direccion.CALLE_Y_CALLE}else{if(!isNaN(parseInt(g))){e=usig.Direccion.CALLE_ALTURA;j=parseInt(g)}else{return null}}this.getCalle=function(){return f};this.getCalleCruce=function(){if(e==usig.Direccion.CALLE_Y_CALLE){return k}else{return null}};this.getAltura=function(){return j};this.getTipo=function(){return e};this.toString=function(){if(e==usig.Direccion.CALLE_ALTURA){return f.toString()+" "+(j>0?j:"S/N")}else{var l=k.toString();var m=l.match(/^(I|Hi|HI).*/)?" e ":" y ";return f.toString()+m+l}};this.setCoordenadas=function(l){d=usig.Punto.fromPunto(l)};this.setSmp=function(l){h=l};this.getCoordenadas=function(){return d};this.getSmp=function(){return h};this.clone=function(){var l=new usig.Direccion(f,g);return b.extend(true,l,this)};this.toJson=function(){return{tipo:e,calle:f.toJson(),altura:j,calle_cruce:k?k.toJson():null,smp:h,coordenadas:d}};this.isEqual=function(l){var m=(l instanceof usig.Direccion&&(e==l.getTipo())&&((e==usig.Direccion.CALLE_ALTURA&&f.isEqual(l.getCalle())&&j==l.getAltura())||(e==usig.Direccion.CALLE_Y_CALLE&&((f.isEqual(l.getCalle())&&k.isEqual(l.getCalleCruce()))||(f.isEqual(l.getCalleCruce())&&k.isEqual(l.getCalle()))))));return m}}})(jQuery);usig.Direccion.CALLE_ALTURA=0;usig.Direccion.CALLE_Y_CALLE=1;usig.Direccion.fromObj=function(d){var b=null;if(d.tipo!=undefined){b=new usig.Direccion(usig.Calle.fromObj(d.calle),(d.tipo==usig.Direccion.CALLE_ALTURA)?d.altura:usig.Calle.fromObj(d.calle_cruce))}else{var c=new usig.Calle(d.cod_calle,d.calle);if(d.cod_calle2!=null){b=new usig.Direccion(c,new usig.Calle(d.cod_calle2,d.calle2))}else{b=new usig.Direccion(c,d.altura)}}if(d.smp!=undefined&&d.smp!=null){b.setSmp(d.smp)}if(d.coordenadas!=undefined&&d.coordenadas!=null){if(typeof(d.coordenadas)=="string"){b.setCoordenadas(usig.Punto.fromWkt(d.coordenadas))}else{b.setCoordenadas(usig.Punto.fromObj(d.coordenadas))}}return b}}if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.data)=="undefined"){usig.data={}}if(typeof(usig.defaults)=="undefined"){usig.defaults={}}usig.defaults.Callejero={server:"http://servicios.usig.buenosaires.gov.ar/callejero",lazyDataLoad:false,loadFullDatabase:true,encoding:"utf-8",expirationTime:10080};usig.Callejero=(function(h){var b={},p=this,e=false,m={ready:[]},n=false;function f(u,x){var t=true;for(var s=0;s<u.length;s++){var v=u[s];v.lastIndex=0;if(!v.test(x[2])){t=false;break}}return t}function q(s){n=false;if(s.length!=usig.data.Callejero.length){alert("Se produjo un error al cargar la información de cruces de calles.");return}for(var r=0;r<usig.data.Callejero.length;r++){usig.data.Callejero[r].push(s[r])}}function o(r){usig.data.Callejero=r;n=false;d("ready")}function j(){n=true;h.ajax({type:"GET",url:b.server,data:{full:1,cruces:1,encoding:b.encoding},dataType:"jsonp",success:q,error:function(){alert("Se produjo un error al intentar cargar la información de calles.")}})}function c(r){n=true;h.ajax({type:"GET",url:b.server,data:b.loadFullDatabase?{full:1,encoding:b.encoding}:{encoding:b.encoding},dataType:"jsonp",success:r,error:function(){alert("Se produjo un error al intentar cargar la información de calles.")}})}function g(){if(!n){if(!l()){c(o)}else{var s;try{if(localStorage.callejero){s=JSON.parse(localStorage.callejero)}if(s&&(new Date().getTime()<s.expiration)){o(JSON.parse(s.calles))}else{c(function(v){var t=b.expirationTime*60*1000;var u={calles:JSON.stringify(v),expiration:new Date().getTime()+t};localStorage.callejero=JSON.stringify(u);o(v)})}}catch(r){c(o)}}}}function l(){try{return"localStorage" in window&&window.localStorage!==null}catch(r){return false}}function d(s){for(var r=0;r<m[s].length;r++){m[s][r]()}}function k(t,s){var u=false;for(var r=0;r<m[t].length;r++){u=u||(m[t][r]==s)}if(!u){m[t].push(s)}}return{init:function(r){b=h.extend({},usig.defaults.Callejero,r);if(typeof(b.onReady)=="function"){k("ready",b.onReady)}e=true;if(!usig.data.Callejero&&!b.lazyDataLoad){g.defer(100)}else{if(usig.data.Callejero){d("ready")}}return this},buscarPorCodigo:function(u){var r=[];if(/^[0-9]+$/.test(u)){var t=usig.data.Callejero.binarySearch(u,function(w,v){return w[0]-v});if(t>-1){var s=usig.data.Callejero[t];r.push(new usig.Calle(s[0],s[1],s[3],s[4]));i=t+1;while(i<usig.data.Callejero.length&&usig.data.Callejero[i][0]==u){s=usig.data.Callejero[i];r.push(new usig.Calle(s[0],s[1],s[3],s[4]));i++}i=t-1;while(i>=0&&usig.data.Callejero[i][0]==u){s=usig.data.Callejero[i];r.unshift(new usig.Calle(s[0],s[1],s[3],s[4]));i--}}}return r},matcheaCalle:function(w,r){var u=[];var t=[];var s=w.replace(/"/g,"").translate("áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toUpperCase().trim();var v=s.split(" ");wordsRE=v.map(function(z){return new RegExp("^"+z+"| "+z,"gi")});var y=RegExp("SNO|SIN NOMBRE OFICIAL");if(this.listo()){for(var x=0;x<usig.data.Callejero.length;x++){if(f(wordsRE,usig.data.Callejero[x])){if(!y.test(usig.data.Callejero[x][1])){u.push(new usig.Calle(usig.data.Callejero[x][0],usig.data.Callejero[x][1],usig.data.Callejero[x][3],usig.data.Callejero[x][4]))}else{t.push(new usig.Calle(usig.data.Callejero[x][0],usig.data.Callejero[x][1],usig.data.Callejero[x][3],usig.data.Callejero[x][4]))}if(!isNaN(parseInt(r))&&u.length>=parseInt(r)){break}}}u=u.concat(t);if(!isNaN(parseInt(r))&&u.length>=parseInt(r)){u=u.splice(0,r)}if(usig.data.Callejero[0].length<5&&!n){j()}}else{g();throw (new usig.ErrorEnCargaDelCallejero())}return u},tieneTramosComoAv:function(s){var r=usig.data.Callejero.binarySearch(s.codigo,function(u,t){return u[0]-t});return s.codigo!=0&&(usig.data.Callejero[r-1][0]==s.codigo||usig.data.Callejero[r+1][0]==s.codigo)},getNombreCalle:function(t,u){var r=this.buscarPorCodigo(t);for(var s=0;s<r.length;s++){if(r[s].alturaValida(u)){return r[s].nombre}}return""},listo:function(){return usig.data.Callejero&&usig.data.Callejero instanceof Array},inicializado:function(){return e}}})(jQuery);if(typeof(usig)=="undefined"){usig={}}usig.StringDireccion=(function(b){return function(e,d){this.tipo=usig.StringDireccion.INVALIDO;this.strCalles="";this.strAltura="";this.strInput=e.replace(/"/g,"").replace(/[\.,\(\)']/g," ").toUpperCase().trim();var j=/[sS][/\\][nN]/;function f(l,k){return l.isDigit()||(k&&j.test(l))}this.setearCalleAltura=function(){c=this.strInput.split(" ");this.maxWordLen=c.inject(0,function(n,l,m){return Math.max(l.trim().length,n)});var k=c.length;if(k>1&&f(c[k-1],d)){this.tipo=usig.StringDireccion.CALLE_ALTURA;this.strCalles=c.inject("",function(n,l,m){return m<(k-1)?(n!=""?n+" "+l:l):n});this.strAltura=c[k-1]}else{this.tipo=usig.StringDireccion.CALLE;this.strCalles=this.strInput}};if(this.strInput.length>0){var c=this.strInput.split(" Y ");if(c.length>=2){var h=g(this.strInput);c=h.split(" Y ");if(c.length>=2){this.tipo=usig.StringDireccion.CALLE_Y_CALLE;this.strCalles=[c[0].replace(" & "," Y "),c[1].replace(" & "," Y ")]}}c=this.strInput.split(" E ");if(c.length>=2){if(parseInt(c[c.length-1])!=c[c.length-1]){this.tipo=usig.StringDireccion.CALLE_Y_CALLE;this.strCalles=c}}if(this.tipo==usig.StringDireccion.INVALIDO){this.setearCalleAltura()}}else{this.tipo=usig.StringDireccion.INVALIDO}function g(k){return k.translate(["GELLY Y OBES","MENENDEZ Y PELAYO","OLAGUER Y FELIU","ORTEGA Y GASSET","PAULA Y RODRIGUEZ","PAZ Y FIGUEROA","PI Y MARGALL","RAMON Y CAJAL","TORRES Y TENORIO","TREINTA Y TRES"],["GELLY & OBES","MENENDEZ & PELAYO","OLAGUER & FELIU","ORTEGA & GASSET","PAULA & RODRIGUEZ","PAZ & FIGUEROA","PI & MARGALL","RAMON & CAJAL","TORRES & TENORIO","TREINTA & TRES"])}this.quitarAvsCalle=function(){var k=["AV","AVDA","AVENIDA"];if(this.tipo==usig.StringDireccion.CALLE_ALTURA){this.strCalles=this.strCalles.removeWords(k)}else{if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[0]=this.strCalles[0].removeWords(k)}}};this.quitarAvsCalleCruce=function(){var k=["AV","AVDA","AVENIDA"];if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[1]=this.strCalles[1].removeWords(k)}};this.quitarPasajes=function(){var k=["PJE","PSJE","PASAJE"];if(this.tipo==usig.StringDireccion.CALLE_ALTURA){this.strCalles=this.strCalles.removeWords(k)}else{if(this.tipo==usig.StringDireccion.CALLE_Y_CALLE){this.strCalles[0]=this.strCalles[0].removeWords(k);this.strCalles[1]=this.strCalles[1].removeWords(k)}}};this.esAlturaSN=function(k){return j.test(k)}}})(jQuery);usig.StringDireccion.CALLE=0;usig.StringDireccion.CALLE_ALTURA=1;usig.StringDireccion.CALLE_Y_CALLE=2;usig.StringDireccion.INVALIDO=-1;if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleInexistente=function(b){this.toString=function(){return"Calle inexistente: "+b};this.getNombreCalle=function(){return b};this.getErrorMessage=function(){return usig.ErrorCalleInexistente.defaults.texts.message}};usig.ErrorCalleInexistente.defaults={texts:{message:"No pudo hallarse ninguna calle existente que coincidiera con su b&uacute;squeda. Por favor, revise el nombre ingresado y vuelva a intentarlo."}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleInexistenteAEsaAltura=(function(b){return function(d,c,e){this.getCalle=function(){return d};this.getMatchings=function(){return c};this.getAltura=function(){return e};this.toString=function(){return"La calle "+d+" no existe a la altura "+e};this.getErrorMessage=function(){var f=usig.ErrorCalleInexistenteAEsaAltura.defaults.texts.message+"<ul>";b.each(c,function(h,j){var g=j.getTramos();b.each(g,function(k,l){f+="<li>"+j.nombre+" "+l[0]+"-"+l[1]+"</li>"})});f+="</ul>";return f}}})(jQuery);usig.ErrorCalleInexistenteAEsaAltura.defaults={texts:{message:"La altura indicada no es v&aacute;lida para la calle ingresada. A continuaci&oacute;n se muestran algunas opciones v&aacute;lidas halladas:"}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCruceInexistente=(function(b){return function(d,f,c,e){this.getCalle1=function(){return d};this.getCalle2=function(){return c};this.getMatchingsCalle1=function(){return f};this.getMatchingsCalle2=function(){return e};this.toString=function(){return"Cruce inexistente: "+d+" y "+c};this.getErrorMessage=function(){var g=usig.ErrorCruceInexistente.defaults.texts.message;g+="<br/>"+usig.ErrorCruceInexistente.defaults.texts.detalleCalle1+"<ul>";b.each(f,function(h,j){g+="<li>"+j.nombre+"</li>"});g+="</ul>";g+=usig.ErrorCruceInexistente.defaults.texts.detalleCalle2+"<ul>";b.each(e,function(h,j){g+="<li>"+j.nombre+"</li>"});g+="</ul>";return g}}})(jQuery);usig.ErrorCruceInexistente.defaults={texts:{message:"El cruce de calles indicado no existe. A continuaci&oacute;n se muestran algunas calles que coinciden con su b&uacute;squeda.",detalleCalle1:"Algunas calles halladas que coinciden con la 1ra calle ingresada son:",detalleCalle2:"Algunas calles halladas que coinciden con la 2da calle ingresada son:"}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorCalleSinAlturas=function(b){this.toString=function(){return usig.ErrorCalleSinAlturas.defaults.texts.message.replace("{calle}",b)};this.getNombreCalle=function(){return b};this.getErrorMessage=function(){return usig.ErrorCalleSinAlturas.defaults.texts.message.replace("{calle}",b)}};usig.ErrorCalleSinAlturas.defaults={texts:{message:"La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones v&aacute;lidas sobre esta calle o escriba S/N en lugar de la altura."}};if(typeof(usig)=="undefined"){usig={}}usig.ErrorEnCargaDelCallejero=function(){this.toString=function(){return"Callejero no disponible."};this.getErrorMessage=function(){return"El callejero no se encuentra cargado aún o se produjo un error al intentar cargarlo"}};if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.defaults)=="undefined"){usig.defaults={}}usig.defaults.NormalizadorDirecciones={lazyDataLoad:false,loadFullDatabase:true,aceptarCallesSinAlturas:false};usig.NormalizadorDirecciones=(function(h){var b={},g=false,m={ready:[]},l=null;function n(s,t,r){var c=l.matcheaCalle(s.strCalles);try{var q=j(s,c,t)}catch(p){throw (p)}if(q.length==0&&c.length>0){s.quitarAvsCalle();c=l.matcheaCalle(s.strCalles);try{q=j(s,c,t)}catch(p){throw (p)}q=d(q);if(q.length==0){throw (new usig.ErrorCalleInexistenteAEsaAltura(s.strCalles,c,s.strAltura))}}else{if(q.length==0&&c.length==0){s.quitarPasajes();c=l.matcheaCalle(s.strCalles);try{q=j(s,c,t)}catch(p){throw (p)}}}if(r&&q.length>1){h.each(q,function(v,u){if(e(s.strCalles,u.getCalle().nombre)){q=[u]}})}return q}function e(q,p){function c(r){r=r.replace(/"/g,"").translate("áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toUpperCase().trim();r=r.split(" ");return r}q=c(q);p=c(p);if(q.length==p.length){intersect=q.intersect(p);if(q.length==intersect.length){return true}}return false}function j(t,p,u){var c=new Array();var s=0;if(p.length!=0){for(var r=0;r<p.length;r++){try{if(p[r].alturaValida(t.strAltura)){c.push(new usig.Direccion(p[r],t.strAltura))}}catch(q){if(q instanceof usig.ErrorCalleSinAlturas&&b.aceptarCallesSinAlturas&&t.esAlturaSN(t.strAltura)){c.push(new usig.Direccion(p[r],0))}s++}if(!isNaN(parseInt(u))&&c.length>=parseInt(u)){break}}if(p.length==s&&c.length==0){throw (new usig.ErrorCalleSinAlturas(p[0].toString()))}}return c}function d(r,s){var q=s?s:"getCalle";var p=new Array();for(var c=0;c<r.length;c++){if(l.tieneTramosComoAv(r[c][q]())){p.push(r[c])}}return p}function o(C,B){var E=l.matcheaCalle(C.strCalles[0]);var D=l.matcheaCalle(C.strCalles[1]);var y=new Array();function z(G,F){return Math.min(G.codigo,F.codigo)+Math.max(G.codigo,F.codigo)}var c=new Array();for(var v=0;v<E.length;v++){for(var s=0;s<D.length;s++){if(E[v].codigo!=D[s].codigo&&y.indexOf(z(E[v],D[s]))<0&&E[v].seCruzaCon(D[s])&&D[s].seCruzaCon(E[v])){c.push(new usig.Direccion(E[v],D[s]));y.push(z(E[v],D[s]));if(!isNaN(parseInt(B))&&c.length>=parseInt(B)){break}}}if(!isNaN(parseInt(B))&&c.length>=parseInt(B)){break}}if(c.length==0&&E.length>0&&D.length>0){var x=C.strCalles[0].split(" ");var u=C.strCalles[1].split(" ");if(x.indexOf("AV")>=0||x.indexOf("AVDA")>=0||x.indexOf("AVENIDA")>=0){var w=h.extend(true,{},C);w.quitarAvsCalle();try{var r=o(w,B)}catch(A){throw (new usig.ErrorCruceInexistente(C.strCalles[0],E,C.strCalles[1],D))}d(r);if(r instanceof Array){return r}}if(u.indexOf("AV")>=0||u.indexOf("AVDA")>=0||u.indexOf("AVENIDA")>=0){var t=h.extend(true,{},C);t.quitarAvsCalleCruce();try{var q=o(t,B)}catch(A){throw (new usig.ErrorCruceInexistente(C.strCalles[0],E,C.strCalles[1],D))}d(q,"getCalleCruce");if(q instanceof Array){return q}}}if(c.length<B){var p=l.matcheaCalle(C.strInput);var v=0;while(c.length<B&&v<p.length){c.push(p[v]);v++}}if(c.length==0&&E.length>0&&D.length>0){throw (new usig.ErrorCruceInexistente(C.strCalles[0],E,C.strCalles[1],D))}return c}function f(p){for(var c=0;c<m[p].length;c++){m[p][c]()}}function k(q,p){var r=false;for(var c=0;c<m[q].length;c++){r=r||(m[q][c]==p)}if(!r){m[q].push(p)}}return{normalizar:function(r,s,p){if(typeof(p)=="undefined"){p=true}if(typeof(jQuery)=="undefined"){throw ("Error: Este componente requiere jQuery y no se encontro.");return[]}var q=new usig.StringDireccion(r,b.aceptarCallesSinAlturas);var c=[];switch(q.tipo){case usig.StringDireccion.CALLE:c=l.matcheaCalle(q.strCalles,s);break;case usig.StringDireccion.CALLE_ALTURA:c=n(q,s,p);break;case usig.StringDireccion.CALLE_Y_CALLE:c=o(q,s);if(c.length==0){q.setearCalleAltura();c=n(q,s,p)}break;case usig.StringDireccion.INVALIDO:c=[];break}if(c instanceof Array){if(c.length>0){return c}else{throw (new usig.ErrorCalleInexistente(r))}}else{return c}},listo:function(){return l?l.listo():false},setOptions:function(c){b=h.extend({},b,c);if(typeof(b.onReady)=="function"){k("ready",b.onReady)}},init:function(c){b=h.extend({},usig.defaults.NormalizadorDirecciones,c);if(typeof(b.onReady)=="function"){k("ready",b.onReady)}l=usig.Callejero.init({lazyDataLoad:b.lazyDataLoad,loadFullDatabase:b.loadFullDatabase,onReady:f.createDelegate(this,["ready"])});g=true;return this},inicializado:function(){return g}}})(jQuery);

if(typeof(usig)=="undefined"){usig={}}if(typeof(usig.debug)=="undefined"){usig.debug=function(a){if(window.console&&window.console.log){window.console.log(a)}}}usig.MapaEstatico=function(d){var c="http://servicios.usig.buenosaires.gov.ar/LocDir/mapa.phtml",e=new Array(),a=/[0-9][0-9]-[0-9]{3,3}[A-Z]?-[A-Z0-9]{3,4}/;if(typeof(d.x)!="undefined"&&typeof(d.y)!="undefined"&&!isNaN(parseFloat(d.x))&&!isNaN(parseFloat(d.y))){e.push("x="+d.x,"y="+d.y)}else{if(typeof(d.punto)!="undefined"&&d.punto instanceof usig.Punto){e.push("x="+d.punto.getX(),"y="+d.punto.getY())}else{if(typeof(d.dir)!="undefined"){e.push("dir="+d.dir)}else{if(d.debug){usig.debug("Parametros incorrectos.")}return}}}if(typeof(d.width)!="undefined"&&!isNaN(parseInt(d.width))){e.push("w="+parseInt(d.width))}if(typeof(d.height)!="undefined"&&!isNaN(parseInt(d.height))){e.push("h="+parseInt(d.height))}if(typeof(d.radio)!="undefined"&&!isNaN(parseInt(d.radio))){e.push("r="+parseInt(d.radio))}if(typeof(d.marcarPunto)!="undefined"&&d.marcarPunto){e.push("punto="+(d.marcarPunto?1:0))}if(typeof(d.desc)!="undefined"){e.push("desc="+d.desc)}if(typeof(d.smp)!="undefined"){if(a.test(d.smp)){e.push("smp="+d.smp)}else{if(d.debug){usig.debug("SMP inválido: "+d.smp)}}}if(typeof(usig.DataManager)!="undefined"){if(!usig.DataManager.isRegistered("MapaEstatico")){usig.DataManager.registerClass("MapaEstatico",{getter:function(g,i,h){var f=document.createElement("img");f.src=c+"?"+h.join("&");usig.DataManager.storeData(g,i,f);return f}})}return usig.DataManager.getData("MapaEstatico",e.join("&"),e)}else{var b=document.createElement("img");b.src=c+"?"+e.join("&");if(d.debug){usig.debug("Loading: "+b.src)}return b}};

if(typeof(usig)=="undefined"){usig={}}usig.AjaxComponent=(function(a){return jQuery.Class.create({init:function(e,b,d){this.name=e;var c=window.location.host==usig.parseUri(b).authority?"json":"jsonp";this.defaultParams={type:"GET",url:b,dataType:c};jQuery.jsonp.setup({callbackParameter:"callback",pageCache:true,dataFilter:function(f){return JSON.parse(JSON.stringify(f))}});this.opts=a.extend({},usig.AjaxComponent.defaults,d);if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") dataType: "+c)}},mkRequest:function(g,l,j,d){var c=null,h=0;function b(n,o){clearTimeout(c);if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Ajax Request Success")}if(typeof(this.opts.afterServerResponse)=="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") calling afterServerResponse")}this.opts.afterServerResponse()}o(n)}function f(n,o){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Ajax Request Error")}if(h>=this.opts.maxRetries){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Ajax Request Max Errors Reached")}clearTimeout(c);o(n)}else{if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Ajax Request Error. Retrying... ("+h+")")}}}function k(n,p){if(n!=null&&n.readyState!=0&&n.readyState!=4){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Aborting request...")}n.abort();if(typeof(this.opts.afterAbort)=="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") calling afterAbort")}this.opts.afterAbort()}if(this.opts.maxRetries>h){h++;var o=(p.dataType=="jsonp")?a.jsonp(p):a.ajax(p);if(typeof(this.opts.afterRetry)=="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") calling afterRetry")}this.opts.afterRetry()}if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") Retrying request... ("+h+")")}c=setTimeout(k.createDelegate(this,[o,m]),this.opts.serverTimeout)}else{if(this.opts.debug){usig.debug("ERROR: Se alcanzo el maximo numero de reintentos al servidor sin exito.")}if(typeof(p.error)=="function"){p.error("Se produjo un error al intentar acceder al servidor: "+p.url)}}}}if(typeof(l)!="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") success tiene que ser una función que acepte como parámetro el dato solicitado porque puede no estar inmediatamente disponible.")}return}if(typeof(j)!="undefined"&&typeof(j)!="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") error tiene que ser una función.")}return}var m=a.extend(true,{},this.defaultParams,{success:b.createDelegate(this,[l],1),error:f.createDelegate(this,[j],1),data:g});if(d){m.url=d}var e=(m.dataType=="jsonp")?a.jsonp(m):a.ajax(m);if(this.opts.debug){usig.debug(m.dataType+" request...")}if(typeof(this.opts.afterServerRequest)=="function"){if(this.opts.debug){usig.debug("usig.AjaxComponent("+this.name+") calling afterServerRequest")}this.opts.afterServerRequest()}if(this.opts.serverTimeout>0){c=setTimeout(k.createDelegate(this,[e,m]),this.opts.serverTimeout)}return e},setOptions:function(b){this.opts=a.extend({},this.opts,b)},getOptions:function(){return this.opts}})})(jQuery);usig.AjaxComponent.defaults={debug:false,serverTimeout:30000,maxRetries:1};if(typeof(usig)=="undefined"){usig={}}usig.Punto=function(b,a){this.x=this.lon=b;this.y=this.lat=a;this.getX=function(){return this.x};this.getY=function(){return this.y};this.toJson=function(){return'{ "x":'+this.x+', "y": '+this.y+" }"};this.toString=function(){return"("+this.x+", "+this.y+")"}};usig.Punto.fromWkt=function(b){var c=/^POINT *\(([0-9]+\.[0-9]+) ([0-9]+\.[0-9]+)\)$/;var a=null;if(resMatch=b.match(c)){a=new usig.Punto(resMatch[1],resMatch[2])}return a};usig.Punto.fromPunto=function(a){return new usig.Punto(a.getX(),a.getY())};usig.Punto.fromObj=function(a){return new usig.Punto(a.x,a.y)};if(typeof(usig)=="undefined"){usig={}}usig.SeccionCatastral=function(a){this.codigoSeccion=a;this.descripcion="Código Sección";this.toString=function(){return this.codigoSeccion}};if(typeof(usig)=="undefined"){usig={}}usig.ManzanaCatastral=function(a){this.codigoManzana=a;this.descripcion="Código Sección-Manzana";this.toString=function(){return this.codigoManzana}};if(typeof(usig)=="undefined"){usig={}}usig.ParcelaCatastral=function(a){this.smp=a.smp;this.pm=a.pm;this.punto=usig.Punto.fromWkt(a.centroide);if(this.pm!=""){this.descripcion="Código Partida-Matriz"}else{this.descripcion="Código Sección-Manzana-Parcela"}this.getPunto=function(){return this.punto};this.toString=function(){if(this.pm!=""){return this.pm}else{return this.smp}}};if(typeof(usig)=="undefined"){usig={}}usig.IndiceCatastral=(function(a){return usig.AjaxComponent.extend({init:function(b){var c=a.extend({},usig.IndiceCatastral.defaults,b);this._super("IndiceCatastral",usig.IndiceCatastral.defaults.server,c);this.showDebug("Creando instancia de usig.IndiceCatastral")},buscar:function(k,l,g,d){var b=/^([0-9]{2})-([0-9]{3}[A-Z]?)-([A-Z0-9]{0,4})$/;var h=/^([0-9]{2})-([0-9]{0,3}|[0-9]{3}[A-Z])$/;var m=/^([0-9]{1,6})$/;var c=/^([0-9]{1,2})$/;var j=/^([1-9][0-9]{0,5})$/;var k=k.toUpperCase();var d=d!=undefined?d:this.opts.maxSuggestions;this.showDebug("-=-=-= Busqueda: "+k+" =-=-=-");function f(o,p,n){var q=[];var n=Math.min(o.datos.length,n);for(i=0;i<n;i++){if(o.tipo=="P"){q.push(new usig.ParcelaCatastral(o.datos[i]))}else{if(o.tipo=="M"){q.push(new usig.ManzanaCatastral(o.seccion+"-"+o.datos[i]))}else{if(o.tipo=="S"){q.push(new usig.SeccionCatastral(o.datos[i]))}}}}this.showDebug(q);if(typeof(p)=="function"){p(q)}}if((resMatch=k.match(b))&&this.opts.buscarSMP){this.lastRequest=this.mkRequest(null,f.createDelegate(this,[l,d],1),g,this.opts.server+"smp/"+resMatch[1]+"/"+resMatch[2]+"/"+resMatch[3])}else{if((resMatch=k.match(h))&&this.opts.buscarSMP){this.lastRequest=this.mkRequest(null,f.createDelegate(this,[l,d],1),g,this.opts.server+"smp/"+resMatch[1]+"/"+resMatch[2])}else{if(resMatch=k.match(m)){var e=false;if((k.match(j))&&this.opts.buscarPM){this.lastRequest=this.mkRequest(null,f.createDelegate(this,[l,d],1),g,this.opts.server+"pm/"+resMatch[1]);e=true}if((k.match(c))&&this.opts.buscarSMP){this.lastRequest=this.mkRequest(null,f.createDelegate(this,[l,d],1),g,this.opts.server+"smp/"+resMatch[1]);e=true}if(!e){throw (new usig.IndiceCatastral.WrongParameters)}}else{if(k==""&&this.opts.buscarSMP){this.lastRequest=this.mkRequest(null,f.createDelegate(this,[l,d],1),g,this.opts.server+"smp/")}else{throw (new usig.IndiceCatastral.WrongParameters())}}}}return},abort:function(){if(this.lastRequest){this.lastRequest.abort();this.lastRequest=null;if(typeof(this.opts.afterAbort)=="function"){this.opts.afterAbort()}}},showDebug:function(b){if(this.opts.debug){usig.debug(b)}}})})(jQuery);usig.IndiceCatastral.WrongParameters=function(){this.msg="Los parametros ingresados son incorrectos.";this.getErrorMessage=function(){return this.msg}};usig.IndiceCatastral.defaults={debug:false,server:"http://inventario.usig.buenosaires.gob.ar/indice_catastral/",maxSuggestions:10,buscarSMP:true,buscarPM:true};if(typeof(usig)=="undefined"){usig={}}usig.SuggesterCatastro=(function(a){return usig.Suggester.extend({init:function(b){var c=a.extend({},usig.SuggesterCatastro.defaults,b);this._super("Catastro",c);if(!this.opts.indiceCatastral){this.opts.indiceCatastral=new usig.IndiceCatastral(c);this.cleanList.push(this.opts.indiceCatastral)}if(c.onReady&&typeof(c.onReady)=="function"){c.onReady()}},getSuggestions:function(d,f,e){var b=e!=undefined?e:this.opts.maxSuggestions;try{this.opts.indiceCatastral.buscar(d,f,function(){},b)}catch(c){f(c)}},getGeoCoding:function(b,c){if(!(b instanceof usig.ParcelaCatastral)){c(new usig.Suggester.GeoCodingTypeError())}else{c(b.getPunto())}},abort:function(){this.opts.indiceCatastral.abort()},ready:function(){return true},setOptions:function(b){this._super(b);this.opts.indiceCatastral.setOptions(b)}})})(jQuery);usig.SuggesterCatastro.defaults={debug:false,serverTimeout:5000,maxRetries:5,maxSuggestions:10};usig.registerSuggester("Catastro",usig.SuggesterCatastro);
