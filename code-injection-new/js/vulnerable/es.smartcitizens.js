


















			var pictureSource;
    		var destinationType;
    		var alto_movil,ancho_movil;
    		var refreshIntervalId;
			document.addEventListener("deviceready",onDeviceReady,false);
    		function onDeviceReady() 
    		{
        		pictureSource=navigator.camera.PictureSourceType;
        		destinationType=navigator.camera.DestinationType;
    		}
			$('#pagina_logo').live('pagecreate', function() 
			{
				alto_movil = parseInt($(document).height())-20;
				ancho_movil = parseInt($(document).width())-15;
				var ancho_previo = ancho_movil/2;
				var alto_previo = alto_movil/2;
				var alto_logo = parseInt($("#logotipo_img").css("height"))+5;
				$("#div_image").css("width",ancho_previo+"px");
				$("#div_image").css("height",alto_previo+"px");
				$("#div_image").css("top","34%");
				$("#smallImage").css("width",ancho_previo+"px");
				$("#smallImage").css("height",alto_previo+"px");
				$("#div_btn_camara").css("width",ancho_previo+"px");
				var alto_div_btn_camara = parseInt($("#div_image").css("top"));
				var alto_dimension = alto_movil - alto_div_btn_camara;
				var height_btn = alto_movil - alto_movil;
				$("#div_btn_camara").css("top",(alto_dimension-5)+"px");
				$("#div_btn_camara").css("height",(height_btn+50)+"px");
				$("#div_google_maps").css("width",ancho_previo+"px");
				$("#div_google_maps").css("height",(alto_previo+height_btn+50)+"px");
				$("#div_google_maps").css("top","34%");
				$("#div_google_maps").css("left",(ancho_previo+10)+"px");
				
				$("#div_botones").css("width",ancho_previo+"px");
				$("#div_botones").css("height",(alto_previo+5)+"px");
				$("#div_botones").css("left",(ancho_previo+10)+"px");
				$("#div_botones").css("top",(alto_previo)+"px");
		
				toggleWatchPosition();
				$.ajax(
				{
					data:{app:'smartcitizen'},
					url:"http://kimagure44.16mb.com/ajax_consulta_pago_app.php",
					type:"get",
					dataType:"json",
					success: function(data)
					{
						if (data[0]=="1")
						{
							$("#descripcion").focus(function(){$("#descripcion").val("");});
							$("#btn_enviar").click(function()
							{
								var imagen = $("#ruta").val();
   								var latitud = $("#text_latitud").val();
   								var longitud = $("#text_longitud").val();
   								if (imagen.length>0 && latitud.length>0 && longitud.length>0)
   								{
   									$("#div_image").css("border","0px");
   									$("#info_gps").css("border","0px");
									$("#pagina_logo").css("display","none");
									$("body").append("<div id='table_msn' style='position:absolute;left:"+ancho_previo+"px;top:"+alto_previo+"px;margin-left:-135px'>Creando la incidencia, espere por favor.</div>")
									refreshIntervalId = setInterval("verocultar('table_msn');",1000);
									var imageURI = $("#ruta").val();
	           						var options = new FileUploadOptions();
            						options.fileKey="file";
            						options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            						options.mimeType="image/jpeg";
									options.chunkedMode = false;
            						var params = new Object();
	            					params.value1 = "test";
            						params.value2 = "param";
        	    					options.params = params;
    	        					var ft = new FileTransfer();
		            				ft.upload(imageURI, encodeURI("http://www.gabinetega.es/upload_images.php"), win, fail, options, function(r)
	            					{
	        							document.getElementById('camera').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";  
        								$.mobile.hidePageLoadingMsg();
        							});
        						}
        						else
        						{
        							if (imagen.length==0)
        							{
        								$("#div_image").css("border","2px solid #ff0000");
        							}
        							else
        							{
        								$("#div_image").css("border","0px");
        							}
        							if (latitud.length==0 || longitud.length==0)
        							{
        								$("#info_gps").css("border","2px solid #ff0000");
        							}
        							else
        							{
        								$("#info_gps").css("border","0px");
        							}

        						}
							});
							$("#smallImage").click(function()
							{
								navigator.camera.getPicture(onPhotoURISuccess, onFail, 
      							{ 
	      							quality : 30, 
  									destinationType : Camera.DestinationType.FILE_URI, 
  									sourceType : Camera.PictureSourceType.CAMERA, 
  									allowEdit : true,
  									encodingType: Camera.EncodingType.JPEG
	  							});
							});
							$.ajax(
							{
								url:"http://www.gabinetega.es/ajax_combo_categorias.php",
								type:"get",
								dataType:"json",
								success:function(data)
								{
									$.each(data,function(i,v)
									{
										if (i==1)
											$("#categoria").append("<option value='"+v['id']+"' selected='selected'>"+v['valor']+"</option>")
										else
											$("#categoria").append("<option value='"+v['id']+"'>"+v['valor']+"</option>")
									});
								}
							});
						}
						if (data[0]=="0")
						{
							$("#pagina_logo").css("display","none");
							alert(data[1]);
						}
					}	
				});
        	});
			function verocultar(id)
			{
				var el = document.getElementById(id); 
				el.style.display = (el.style.display == 'none') ? 'block' : 'none';
			}
	    	function win(r) 
	        {
	        	var categoria = $("#categoria").val();
	        	var observaciones = $("#descripcion").val();
	        	var latitud = $("#text_latitud").val();
   				var longitud = $("#text_longitud").val();
	        	$.ajax(
				{
					data:{categoria:categoria,observaciones:observaciones,latitud:latitud,longitud:longitud},
					url:"http://www.gabinetega.es/ajax_insertar_incidencia.php",
					type:"post",
					dataType:"html",
					success:function(data)
					{
						if (data=="ok")
						{
							var alto = parseInt($(document).height())-20;
							var ancho = parseInt($(document).width())-15;
							var ancho_previo = ancho/2;
							var alto_previo = alto/2;
	        				clearInterval(refreshIntervalId);
	        				$("#table_msn").html("");
	        				$("body").append("<div id='table_msn' style='position:absolute;left:"+ancho_previo+"px;top:"+alto_previo+"px;margin-left:-170px'>Incidencia creada correctamente, muchas gracias.</div>")
        					$("#table_msn").delay(1500).fadeOut(300,function()
        					{
	        					$("#table_msn").remove();
        						$("#pagina_logo").delay(1500).css("display","block");
        						$(location).attr("href","incidencias.html");	
        					});	
						}
						else
						{
							var alto = parseInt($(document).height())-20;
							var ancho = parseInt($(document).width())-15;
							var ancho_previo = ancho/2;
							var alto_previo = alto/2;
	        				clearInterval(refreshIntervalId);
	        				$("#table_msn").html("");
	        				$("body").append("<div id='table_msn' style='position:absolute;left:"+ancho_previo+"px;top:"+alto_previo+"px;margin-left:-210px;color:#ff0000'>Error al crear la incidencia.</div>")
        					$("#table_msn").delay(1500).fadeOut(300,function()
        					{
	        					$("#table_msn").remove();
        						$("#pagina_logo").delay(1500).css("display","block");
        						$(location).attr("href","incidencias.html");	
        					});	
						}
					}
				});
        	}
        	function fail(error) 
        	{
	            alert("ERROR: Codigo = " + error.code);
        	}
    		function onPhotoURISuccess(imageURI) 
    		{
      			var smallImage = document.getElementById('smallImage');
      			smallImage.style.display = 'block';
      			smallImage.src = imageURI;
      			$("#ruta").val(imageURI);
    		}
	    	function onFail(message) 
	    	{
      			alert('Motivo de fallo: ' + message);
    		}
    	

/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(api).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});







			$('#pagina_logo').live('pagecreate', function() 
			{
				$.ajax(
				{
					data:{app:'smartcitizen'},
					url:"http://kimagure44.16mb.com/ajax_consulta_pago_app.php",
					type:"get",
					dataType:"json",
					success: function(data)
					{
						if (data[0]=="1")
						{
							$("#pagina_logo").delay(4000).fadeOut(300,function()
							{
								$(location).attr("href","login.html");
							});
						}
						if (data[0]=="0")
						{
							$("#pagina_logo").css("display","none");
							alert(data[1]);
						}
					}	
				});
        	});
		






			var storage = window.localStorage;
			$('#pagina_login').live('pagecreate', function() 
			{
				var local_user = window.localStorage.getItem("usuario");
				var local_pass = window.localStorage.getItem("password");
				if (local_user!=null){$("#usuario").val(local_user);}
				if (local_pass!=null){$("#password").val(local_pass);}
				$.ajax(
				{
					data:{app:'smartcitizen'},
					url:"http://kimagure44.16mb.com/ajax_consulta_pago_app.php",
					type:"get",
					dataType:"json",
					success: function(data)
					{
						if (data[0]=="1")
						{
							$("#btn_login").click(function()
							{
								var usuario = $("#usuario").val();
								var password = $("#password").val();
								if (usuario.length>0 && password.length>0)
								{
									$("#usuario").css("backgroundColor","#91bdff");
									$("#password").css("backgroundColor","#91bdff");
									$.ajax(
									{
										data:{usuario:usuario,password:password},
										url:"http://www.gabinetega.es/ajax_login.php",
										type:"post",
										dataType:"html",
										success:function(data)
										{
											if (data==1)
											{
												$("#pagina_login").fadeOut(300,function()
												{
													$(location).attr("href","incidencias.html");	
												});
											}
											else
											{
												alert("Usuario y/o contraseńa incorrectos");
											}
										}
									});
								}
								else
								{
									if (usuario.length==0){$("#usuario").css("backgroundColor","#2378f7");}
									else{$("#usuario").css("backgroundColor","#91bdff");}
									if (password.length==0){$("#password").css("backgroundColor","#2378f7");}
									else{$("#password").css("backgroundColor","#91bdff");}
								}
							});
							$("#recordar_datos").click(function()
							{
								var estado = $(this).is(":checked");
								if (estado==true)
								{
									var usuario = $("#usuario").val();
									var password = $("#password").val();
									window.localStorage.setItem("usuario",usuario);
									window.localStorage.setItem("password",password);
									var local_user = window.localStorage.getItem("usuario");
									var local_pass = window.localStorage.getItem("password");
								}
								else
								{
									window.localStorage.clear();									
								}
							});
						}
						if (data[0]=="0")
						{
							$("#pagina_login").css("display","none");
							alert(data[1]);
						}
					}	
				});

				$("#usuario").focus(function(){$("#usuario").val("");});
				$("#password").focus(function(){$("#password").val("");});
        	});
		








			var map;
			var marker;
			var infowindow;
			var watchID;
			$(document).ready(function()
			{
			    alert("s");
				$("#usuario").val("");
				$("#password").val("");
				$("#btn_envio").click(function()
				{
					var usuario = $("#usuario").val();
					var pass = $("#password").val();
					if (usuario.length>0 && pass.length>0)
					{
						var sha1 = hex_sha1(pass);
						$.ajax(
						{
							data:{usuario:usuario,pass:sha1},
							url:"http://kimagure44.16mb.com/ajax_comprobar_login_tlf.php",
							type:"post",
							dataType:"html",
							success:function(data)
							{
                            	if (data=="ok")
                            	{
	                            	alert("Acceso valido");
	                            	$(location).attr("href","#pagina2");
                            	}
                            	else
                            	{
                            		alert("Datos incorrectos");
                            	}
							}
						});
					}
					else
					{
						alert("Todos los campos son obligatorios");
					}
				});
				$("#btn_gps").click(function()
				{
					$(window).unbind();
    				$(window).bind('pageshow resize orientationchange', function(e){max_height();});
    				max_height();
    				google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
				});
				
				$("#btn_camara").click(function()
				{
					navigator.camera.getPicture(uploadPhoto,function(message) 
					{ 
						alert('get picture failed'); 
					},
                    { 
                    	quality: 50, 
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY 
                    });
				});
				document.addEventListener("deviceready", onDeviceReady, false);
			});
    		function max_height()
    		{
    			var h = $('div[data-role="header"]').outerHeight(true);
			    var f = $('div[data-role="footer"]').outerHeight(true);
    			var w = $(window).height();
    			var c = $('div[data-role="content"]');
			    var c_h = c.height();
    			var c_oh = c.outerHeight(true);
    			var c_new = w - h - f - c_oh + c_h;
    			var total = h + f + c_oh;
    			if(c_h<c.get(0).scrollHeight)
    			{
        			c.height(c.get(0).scrollHeight);
    			}
    			else
    			{
        			c.height(c_new);
    			}
			}
			function map()
			{
    			var latlng = new google.maps.LatLng(55.17, 23.76);
    			var myOptions = 
    			{
      				zoom: 6,
      				center: latlng,
      				streetViewControl: true,
      				mapTypeId: google.maps.MapTypeId.ROADMAP,
      				zoomControl: true
    			};
    			map = new google.maps.Map(document.getElementById("map"), myOptions);
  			  	google.maps.event.addListenerOnce(map, 'tilesloaded', function()
  			  	{
        			//get geoposition once
        			//navigator.geolocation.getCurrentPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });
        			//watch for geoposition change
				    //watchID = navigator.geolocation.watchPosition(geo_success, geo_error, { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true });   
    			}); 
			}
			function geo_error(error)
			{
			    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
			}
			function geo_success(position) 
			{
			    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
			    map.setZoom(15);
			    var info = ('Latitude: '         + position.coords.latitude          + '<br>' +
			                'Longitude: '         + position.coords.longitude         + '<br>' +
			                'Altitude: '          + position.coords.altitude          + '<br>' +
			                'Accuracy: '          + position.coords.accuracy          + '<br>' +
			                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
			                'Heading: '           + position.coords.heading           + '<br>' +
			                'Speed: '             + position.coords.speed             + '<br>' +
			                'Timestamp: '         + new Date(position.timestamp));
			    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			    if(!marker)
			    {
			        marker = new google.maps.Marker(
			        {
			            position: point,
			            map: map
			        });
			    }
			    else
			    {
			        marker.setPosition(point);
			    }
			    if(!infowindow)
			    {
			        infowindow = new google.maps.InfoWindow(
			        {
			            content: info
			        });
			    }
			    else
			    {
			        infowindow.setContent(info);
			    }
			    google.maps.event.addListener(marker, 'click', function() 
			    {
			        infowindow.open(map,marker);
			    }); 
			}
    		function onDeviceReady() 
    		{
        		startWatch();
    		}
    		function startWatch() 
    		{
        		var options = { frequency: 100 };
        		watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    		}
    		function stopWatch() 
    		{
        		if (watchID) 
        		{
            		navigator.accelerometer.clearWatch(watchID);
            		watchID = null;
        		}
    		}
		    function onSuccess(acceleration) 
		    {
        		$("#accelerometer").html("Aceleracion X: "+acceleration.x+"<br>"+"Aceleracion Y: "+acceleration.y+"<br>"+"Aceleracion Z: "+acceleration.z+"<br>"+"Timestamp: "+acceleration.timestamp+"<br>");
    		}
		    function onError() 
		    {
        		alert('onError!');
    		}
    		function uploadPhoto(imageURI) 
    		{
            	var options = new FileUploadOptions();
            	options.fileKey="file";
            	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            	options.mimeType="image/jpeg";
				options.chunkedMode = false;
            	var params = new Object();
            	params.value1 = "test";
            	params.value2 = "param";

            	options.params = params;

            	var ft = new FileTransfer();
            	ft.upload(imageURI, encodeURI("http://kimagure44.16mb.com/upload_images.php"), win, fail, options);
	    	}
	        function win(r) 
	        {
            	console.log("Code = " + r.responseCode);
            	console.log("Response = " + r.response);
            	console.log("Sent = " + r.bytesSent);
        	}
        	function fail(error) 
        	{
	            alert("An error has occurred: Code = " + error.code);
            	console.log("upload error source " + error.source);
            	console.log("upload error target " + error.target);
        	}
		

var watchID = null;
function clearWatch() 
{
    if (watchID !== null) 
    {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}
var wsuccess = function(pos) 
{
    $("#info_gps").html("");
    var latitud = pos.coords.latitude;
    var longitud = pos.coords.longitude; 
    $("#info_gps").html("Posicion ("+latitud+","+longitud+")");
    $("#text_latitud").val(latitud);
    $("#text_longitud").val(longitud);
};
var wfail = function(error) 
{
    //var error = error.code;
    /*if (error==2)
    {
        $("#info_gps").html("GPS no activado");    
    }
    else
    {*/
        $("#info_gps").html("Buscando satelites y calculando posicion actual");
  //}
};
var toggleWatchPosition = function() 
{
    if (watchID) 
    {
        clearWatch();
    } 
    else 
    {
        $("#info_gps").html("Buscando satelites y calculando posicion actual");
        var options = { frequency: 1000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
    }
};

