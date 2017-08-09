



		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url: getParameterByName('xmlid'),
                dataType: "xml",
                success: function(xml){
                    
				var title_xml = $(xml).find('title').text();
				$( "#notatit" ).append(title_xml);

				var source_xml = $(xml).find('source').text();
				$( "#notafuente" ).append("Fuente: " + source_xml);

				var description_xml = $(xml).find('description').text();
				$( "#notadescripcion" ).append(description_xml);

				var imagen_xml = $(xml).find('image').text();
				if(imagen_xml != "")	$( "#notaimagen" ).append('<img src="' + imagen_xml + '">');
				
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
		});
        




		$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
	    setTimeout(function(){
        $.mobile.loading('show');
    	},1);    
		});

		$(document).on('pageshow', '[data-role="page"]', function(){  
			setTimeout(function(){
				$.mobile.loading('hide');
			},300);      
		});
		



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

		Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
			c = isNaN(c = Math.abs(c)) ? 2 : c, 
			d = d == undefined ? "." : d, 
			t = t == undefined ? "," : t, 
			s = n < 0 ? "-" : "", 
			i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
			j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		 };		

		function calcula(){
			region = document.getElementById('region').value;
			cereal = document.getElementById('cultivo').value;
			document.getElementById("imgzona").src="imagenes/pas" + region + ".jpg";
			//alert(cereal);
			//alert(region);
			$( "#cerealzona").text(cereal + ": " +  window[region + "_value"]);

			for (var i=1; i<8; i++) {
				valor = window[cereal + "_" + region + "_attr_" + i];
				$( "#tz"+ i).text(Number(valor).formatMoney(0, '.', ','));
				$( "#tp"+ i).text(Number(window[cereal + "_16_attr_" + i]).formatMoney(0, '.', ','));
			}
			//alert(TRIGO_1_attr_1);
		}

		
				var table_headers = [];
		var currentColumnSelected = '';
		function cargarcomboperiodo()
		{
			var html = '';
			var columnTableId = '';
			for (var i = 0, len = table_headers.length; i < len; ++i) {
				columnTableId = 'c-' + (i+1);
				html += '<option value="' + columnTableId + '">' + table_headers[i] + '</option>';
			}                   
			currentColumnSelected = 'c-1';
			$('#periodo').append(html).selectmenu('refresh');
			
		}
		
		function cargarcolumna(){		 						
			var cellId = 0;
			var ctrlId = currentColumnSelected+"-"+cellId;
		 
			var hasCell = ($("#"+ctrlId).length > 0);
			 
			while (hasCell) {
				 $("#"+ctrlId).hide();	
				 cellId++;		
				 ctrlId = currentColumnSelected+"-"+cellId;				
				 hasCell = ($("#"+ctrlId).length > 0);
			}

			currentColumnSelected = ctrlId = $('#periodo option:selected').val();
						
			cellId = 0;
			ctrlId = currentColumnSelected+"-"+cellId;
			hasCell = ($("#"+ctrlId).length > 0);
			 
			while (hasCell) {
				 $("#"+ctrlId).show();	
				 cellId++;		
				 ctrlId = currentColumnSelected+"-"+cellId;				
				 hasCell = ($("#"+ctrlId).length > 0);
			}
		}
		
		
        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/pagrs-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					var title_xml = $(xml).find('title_en').text();
					$( "#tit_xml" ).append(title_xml);
                    
					$(xml).find('zona').each(function(){
						nzona = $(this).find('nombre').text();
						nzona_id = $(this).find('nombre').attr("id");
						window[nzona_id + "_value"] = $(this).find('nombre').text();
						if(nzona_id != 1 && nzona_id != 16) $("#region").append('<option value="' + nzona_id + '">' + nzona + '</option>');

                        var valor = {};
						$(this).find('cereal').each(function(){
							var cerealName = $(this).attr("name_en");
                            if(nzona == "NOA" && cerealName != "TRIGO")	$("#cultivo").append('<option value="' + cerealName + '">' + cerealName + '</option>');
                            for (var i=1; i<8; i++) {
								window[cerealName + "_" + nzona_id + "_attr_" + i] = $(this).find('atributo').eq(i).text();
							}
                        });
                    });
					calcula();
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
			function clearHtmlFormat(html) { return html.replace("<b>","").replace("</b>",""); }

            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/xmlpashistoricoingles.xml",
                dataType: "xml",
                success: function(xml){
                    
					var textoe = "";
					var isHeaders = true;
					var rowNumber = 0;
					var cellNumber = 0;
					var columnTableId = "";
					$(xml).find('item').each(function(){
						cellNumber = 0;						 
						textoe = textoe + '<tr><td><b>' + $(this).attr("iditem") + '</b></td>';
						$(this).find('title').each(function(){
							columnTableId = 'c-' + cellNumber + '-' + rowNumber ;
							if (isHeaders && cellNumber>0)
							{ table_headers.push(clearHtmlFormat($(this).text()));
				 
							 
							}
							 
							
							var cssStyle = ((cellNumber<2) ?  '' : 'style="display:none"' );
							var ctlId = (cellNumber>=1) ?  ' id="' + columnTableId + '" ' : '' ;
							
							textoe = textoe + '<td  '  + ctlId  +  cssStyle +' >'+$(this).text()+'</td>';
							cellNumber++;
                        });						
						rowNumber++;
						textoe = textoe + '</tr>';
						if (isHeaders) {
							cargarcomboperiodo();
							isHeaders = false;
						}
                    });
					$("#tablahistorico").append(textoe);
					$('#historico a')[1].remove();
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });

		});
        



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

		 
		Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
			c = isNaN(c = Math.abs(c)) ? 2 : c, 
			d = d == undefined ? "." : d, 
			t = t == undefined ? "," : t, 
			s = n < 0 ? "-" : "", 
			i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
			j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		 };		

		function calcula(){
			region = document.getElementById('region').value;
			cereal = document.getElementById('cultivo').value;
			document.getElementById("imgzona").src="imagenes/pas" + region + ".jpg";
			//alert(cereal);
			//alert(region);
			$( "#cerealzona").text(cereal + ": " +  window[region + "_value"]);

			for (var i=1; i<8; i++) {
				valor = window[cereal + "_" + region + "_attr_" + i];
				$( "#tz"+ i).text(Number(valor).formatMoney(0, '.', ','));
				$( "#tp"+ i).text(Number(window[cereal + "_16_attr_" + i]).formatMoney(0, '.', ','));
			}
			//alert(TRIGO_1_attr_1);
		}
		var table_headers = [];
		var currentColumnSelected = '';
		function cargarcomboperiodo()
		{
			var html = '';
			var columnTableId = '';
			for (var i = 0, len = table_headers.length; i < len; ++i) {
				columnTableId = 'c-' + (i+1);
				html += '<option value="' + columnTableId + '">' + table_headers[i] + '</option>';
			}                   
			currentColumnSelected = 'c-1';
			$('#periodo').append(html).selectmenu('refresh');
			
		}
		
		function cargarcolumna(){		 						
			var cellId = 0;
			var ctrlId = currentColumnSelected+"-"+cellId;
		 
			var hasCell = ($("#"+ctrlId).length > 0);
			 
			while (hasCell) {
				 $("#"+ctrlId).hide();	
				 cellId++;		
				 ctrlId = currentColumnSelected+"-"+cellId;				
				 hasCell = ($("#"+ctrlId).length > 0);
			}

			currentColumnSelected = ctrlId = $('#periodo option:selected').val();
						
			cellId = 0;
			ctrlId = currentColumnSelected+"-"+cellId;
			hasCell = ($("#"+ctrlId).length > 0);
			 
			while (hasCell) {
				 $("#"+ctrlId).show();	
				 cellId++;		
				 ctrlId = currentColumnSelected+"-"+cellId;				
				 hasCell = ($("#"+ctrlId).length > 0);
			}
		}
		
        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/pagrs-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					var title_xml = $(xml).find('title').text();
					$( "#tit_xml" ).append(title_xml);
                    
					$(xml).find('zona').each(function(){
						nzona = $(this).find('nombre').text();
						nzona_id = $(this).find('nombre').attr("id");
						window[nzona_id + "_value"] = $(this).find('nombre').text();
						if(nzona_id != 1 && nzona_id != 16) $("#region").append('<option value="' + nzona_id + '">' + nzona + '</option>');

                        var valor = {};
						$(this).find('cereal').each(function(){
							var cerealName = $(this).attr("name");
                            if(nzona == "NOA" && cerealName != "TRIGO")	$("#cultivo").append('<option value="' + cerealName + '">' + cerealName + '</option>');
                            for (var i=1; i<8; i++) {
								window[cerealName + "_" + nzona_id + "_attr_" + i] = $(this).find('atributo').eq(i).text();
							}
                        });
                    });
					calcula();
                },
                error: function() {
                //alert("An error occurred while processing XML file.");
                }
            });

			 
			function clearHtmlFormat(html) { return html.replace("<b>","").replace("</b>",""); }


            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/xmlpashistorico.xml",
                dataType: "xml",
                success: function(xml){
                    
					var textoe = "";
					var isHeaders = true;
					var rowNumber = 0;
					var cellNumber = 0;
					var columnTableId = "";
					$(xml).find('item').each(function(){
						cellNumber = 0;						 
						textoe = textoe + '<tr><td><b>' + $(this).attr("iditem") + '</b></td>';
						$(this).find('title').each(function(){
							columnTableId = 'c-' + cellNumber + '-' + rowNumber ;
							if (isHeaders && cellNumber>0)
							{ table_headers.push(clearHtmlFormat($(this).text()));
				 
							 
							}
							 
							
							var cssStyle = ((cellNumber<2) ?  '' : 'style="display:none"' );
							var ctlId = (cellNumber>=1) ?  ' id="' + columnTableId + '" ' : '' ;
							
							if (isHeaders && cellNumber==0) cssStyle = " data-priority='0' ";
							
							textoe = textoe + '<td  '  + ctlId  +  cssStyle +' >'+$(this).text()+'</td>';
							
							cellNumber++;
                        });						
						rowNumber++;
						textoe = textoe + '</tr>';
						if (isHeaders) {
							cargarcomboperiodo();
							isHeaders = false;
						}
                    });
					$("#tablahistorico").append(textoe);
					$('#historico a')[1].remove();
					 
                },
                error: function() {
                //alert("An error occurred while processing XML file.");
                }
            });

			 
		});
        



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    $(document).ready(function()
{
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function()
       {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
}); 

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/flash-cotizaciones.xml",
                dataType: "xml",
                success: function(xml){
                    
					var pubDate = "Datos al " + $(xml).find('pubDate').text();
					var escribe = '';
					$( "#pub_date" ).append(pubDate);
                    
					$(xml).find('cereal').each(function(){
						ncereal = $(this).find('nombre').text();
						
						$(this).find('cotizacion').each(function(){
							
								//$(this).find('nombre').attr("id")
									//alert($(this).find('titulo').attr("id"));
									$( "#" + $(this).find('titulo').attr("id") ).append($(this).find('titulo').text());
									$( "#" + $(this).find('valor').attr("id") ).append($(this).find('valor').text());
									$( "#" + $(this).find('relacion_anterior').attr("id") ).append('<img src="imagenes/'+$(this).find('relacion_anterior').text()+'.png" />');
									$( "#" + $(this).find('fecha').attr("id") ).append($(this).find('fecha').text());
								
	                    });
                    });
					//$("#escribediv" ).append(escribe);
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
		});
	
	



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    $(document).ready(function()
{
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function()
       {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
}); 

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/camara-arbitral-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					var pubDate = "Actualizado al " + $(xml).find('pubDate').text();
					var escribe = '';
					$( "#pub_date" ).append(pubDate);
                    
					escribe = '';
					$(xml).find('puerto').each(function(){
						npuerto = $(this).children('nombre').text();
						//npuerto = $(this).attr('nombre').text();
						//alert(npuerto);

						//escribe =  escribe + '<div data-role="collapsible" data-theme="a" data-content-theme="a">';
						//escribe =  escribe + '<h1>' + npuerto + '</h1>';
						escribe = '';
						$(this).find('cereal').each(function(){
							
							escribe = escribe + '<tr>';
							escribe = escribe + '<td>' + $(this).children('nombre').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos_anterior').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos_variacion').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares_anterior').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares_variacion').text() + '</td>';
							escribe = escribe + '</tr>';

								
	                    });

						$("[id='escribediv "+npuerto+"']").append(escribe);

                    });
                },
                error: function() {
					//alert("An error occurred while processing XML file.");
                }
            });
		});
	
	




        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/acerca-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					var title_xml = $(xml).find('acerca').text();
					$( "#tit_xml" ).append(title_xml);

                    
                },
                error: function() {
                //alert("An error occurred while processing XML file.");
                }
            });
		});
        



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    $(document).ready(function()
{
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function()
       {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
}); 

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/camara-arbitral-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					var pubDate = "Data updated at " + $(xml).find('pubDate').text();
					var escribe = '';
					$( "#pub_date" ).append(pubDate);
                    
					escribe = '';
					$(xml).find('puerto').each(function(){
						npuerto = $(this).children('nombre').text();
						//npuerto = $(this).attr('nombre').text();
						//alert(npuerto);

						//escribe =  escribe + '<div data-role="collapsible" data-theme="a" data-content-theme="a">';
						//escribe =  escribe + '<h1>' + npuerto + '</h1>';
						escribe = '';
						$(this).find('cereal').each(function(){
							
							escribe = escribe + '<tr>';
							escribe = escribe + '<td>' + $(this).children('nombre').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos_anterior').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_pesos_variacion').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares_anterior').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares').text() + '</td>';
							escribe = escribe + '<td>' + $(this).children('cotizacion_dolares_variacion').text() + '</td>';
							escribe = escribe + '</tr>';

								
	                    });

						$("[id='escribediv "+npuerto+"']").append(escribe);

                    });
                },
                error: function() {
                //alert("An error occurred while processing XML file.");
                }
            });
		});
	
	




        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url: "http://www.bolsadecereales.org/ultimas-novedades-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					$(xml).find('data').each(function(){
						linkk = $(this).find('link').text();
						titulo = '<li><a href="' + linkk +'">' + '<h2>' + $(this).find('title').text() + '</h2></a><a href="'+linkk+'">Ver nota</a></li>';
						$("#listcontent").append(titulo).listview('refresh');
                    });
                },
                error: function() {
               // alert("An error occurred while processing XML file.");
                }
            });
		});
        




		$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
	    setTimeout(function(){
        $.mobile.loading('show');
    	},1);    
		});

		$(document).on('pageshow', '[data-role="page"]', function(){  
			setTimeout(function(){
				$.mobile.loading('hide');
			},300);      
		});
		



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

    $(document).ready(function()
{
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function()
       {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
}); 

        $(document).ready(function(){
            $.ajax({
                type: "GET",
                //url: "BookList.xml",
                url: "http://www.bolsadecereales.org/flash-cotizaciones.xml",
                dataType: "xml",
                success: function(xml){
                    
					var pubDate = "Data updated at " + $(xml).find('pubDate').text();
					var escribe = '';
					$( "#pub_date" ).append(pubDate);
                    
					$(xml).find('cereal').each(function(){
						ncereal = $(this).find('nombre').text();
						
						$(this).find('cotizacion').each(function(){
							
								//$(this).find('nombre').attr("id")
									//alert($(this).find('titulo').attr("id"));
									$( "#" + $(this).find('titulo').attr("id") ).append($(this).find('titulo').text());
									$( "#" + $(this).find('valor').attr("id") ).append($(this).find('valor').text());
									$( "#" + $(this).find('relacion_anterior').attr("id") ).append('<img src="imagenes/'+$(this).find('relacion_anterior').text()+'.png" />');
									$( "#" + $(this).find('Date').attr("id") ).append($(this).find('Date').text());
								
	                    });
                    });
					//$("#escribediv" ).append(escribe);
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
		});
	
	




        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url: "http://www.bolsadecereales.org/ultimas-novedades-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					$(xml).find('data').each(function(){
						linkk = $(this).find('link').text();
						titulo = '<li><a href="' + linkk +'">' + '<h2>' + $(this).find('title').text() + '</h2></a><a href="'+linkk+'">Ver nota</a></li>';
						$("#listcontent").append(titulo).listview('refresh');
                    });
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
		});
        




        $(document).ready(function(){
            $.ajax({
                type: "GET",
                url: "http://www.bolsadecereales.org/novedades-xml.xml",
                dataType: "xml",
                success: function(xml){
                    
					$(xml).find('data').each(function(){
						imagen = $(this).find('image').text();
						if(imagen != "") imagen = '<img src="'  + $(this).find('image').text() + '">';
						linkk = "novedad.html?xmlid=" + $(this).find('link_xml').text();
						titulo = '<li><a href="' + linkk +'">' + imagen + '<h2>' + $(this).find('title').text() + '</h2><p>'+$(this).find('short_description').text()+'</p></a><a href="'+linkk+'">Ver nota</a></li>';
						$("#listcontent").append(titulo).listview('refresh');
                    });
                },
                error: function() {
                alert("An error occurred while processing XML file.");
                }
            });
		});
        
