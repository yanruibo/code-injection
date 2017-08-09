




			
				/* Init PhoneGap */
				
				$(document).bind("mobileinit", function(){
  					
  					/* PhoneGap Configuration */
  					
  					$.extend(  $.mobile , {
    						
    						ajaxEnabled: "true",
    						loadingMessage: "Cargando: Por favor, espere un momento...",
    						pageLoadErrorMessage: "Error: Por favor, intente de nuevo..."
    						
  					});
  					  					  					
  					
				});
				
				/* Listener OnDeviceReady PhoneGap */
						
				document.addEventListener("deviceready", onDeviceReady, false);
			
				function onDeviceReady() {
			
					mainPageLoad();

    			};
    				
											
				$('#main_page').live("pageinit",function(event){
																		
																															
						/* Featured List Item Event */	
						
						$('#featured_list').delegate('a', 'vclick', function(){
																					
							current_camping = $(this).attr("id");
						
							list_type = FEATURED;
						
							$.mobile.changePage($("#details_page"));
							
							
						});
						
						/* Result List Item Event */	
						
						$('#result_listview').delegate('a', 'vclick', function(){
							
							current_camping = $(this).attr("id");
																		
							list_type = -FEATURED;
						
							$.mobile.changePage($("#details_page"));
							
						
						});
						
						/* Search Button Event */
						
						$('#search_button').delegate('a', 'vclick', function(){
						
							$("#result_listview").empty();
							
							search_type = 0; // By Name and State
							
							camping_name = $("#name").val();
							camping_state = $("#state").val();
						
							$.mobile.changePage($("#result_page")); 

						
						});
					
						/* Nearest Campings Button Event */
						
						$('#main_header').delegate('a', 'vclick', function(){
							
							$("#result_listview").empty();
							
							search_type = 1; // By Location
						
							$.mobile.changePage($("#result_page")); 
						
						});
						
						$('#reserve_confirm_button').delegate('a','vclick',function(){

							var camp;

							if(list_type == FEATURED){
								
								camp = featuredCampings[current_camping];

							} else {
									
								camp = campings[current_camping];				
								
							}
							
							var aux = $("#camping_type").val();
							
							if(aux == "Noche en Parcela" || aux == "Noche en Bungalow") {
												 																				
								sendBookingMailForNights($("#customer_name").val(),$("#dni").val(),$("#phone").val(),$("#email").val(), $("#date").val(),$("#leaving_date").val(), $("#camping_type").val(),camp);
							
							} else if (aux == "Mes Parcela") {
							
								sendBookingMailForMonths($("#customer_name").val(),$("#dni").val(),$("#phone").val(),$("#email").val(),$("#camping_type").val(),camp);
							
							} else {
							
								$("#linkEmailNotSentDialog").click();
							
							}
													  														

						});
						
						$('#camping_type').live("change",function(event,ui){
						
							var valor = $('#camping_type').val();
														
							if (valor == "Noche en Parcela") {
							
								initDates(valor,"");	
																						
								$("#months").hide();
								
								$("#arriving_date_container").show();
								
								$("#leaving_date_container").show();
								
							
							} else if(valor == "Noche en Bungalow"){
							
								initDates(valor,"");	
										
								$("#months").hide();
								
								$("#arriving_date_container").show();
								
								$("#leaving_date_container").show();
								
																				
							
							} else if(valor == "Mes Parcela") {
							
							
								$("#months").show();
								
								$("#arriving_date_container").hide();
								
								$("#leaving_date_container").hide();
							
							} else {
							
								$("#months").hide();
								
								$("#arriving_date_container").hide();
								
								$("#leaving_date_container").hide();
							
							}
							
						
						});
						
						$('#date').live("change",function(event,ui){
																																			
								initDates($('#camping_type').val(),$('#date').val());
						
						});

				});
										
										
					/* Result Page Init */
					
					$('#result_page').live("pagebeforeshow",function(event){
																		
												
						// SEARCH BY OPTIONS
						if(search_type == 0) {
																
							searchCampings();
						
						}
						// SEARCH BY USER LOCATION
						 else {
															
							km_range = KM_RANGE;
							
							if(navigator.geolocation){
							
								getLocation();
														
							} else {
							
								$("#linkDesGeolocationErrorDialog").click();
							
							}

						}
						
					});
					
									
					/* Details Page Init */
					
					$('#details_page').live("pagebeforeshow",function(event){
					
																						
						if(list_type == FEATURED){
					
							setCampingInformation(featuredCampings[current_camping]);
					
						
						} else {
						
							setCampingInformation(campings[current_camping]);
						
						}
																				
					});

					/* Map Page Init */
						
					$('#map_page').live('pagebeforeshow',function(event, ui){
										        
	       	 				$.getScript('http://maps.google.com/maps/api/js?sensor=false&callback=loadmap');     
	       	        	 				       	 				   
	    			});
	    			
	    				
	    			/* Booking Page Init */
	    				
					$('#booking_page').live('pagebeforeshow',function(event, ui){
															
						/*					
						  var todaysDate = new Date(); 
													  
						  var defaultPickerValue = [todaysDate.getFullYear(),todaysDate.getMonth(), todaysDate.getDate()];
						    
						  var lengthOfDay = 24 * 60 * 60 * 1000; 
	
						  var diff = parseInt((((todaysDate.getTime() - todaysDate.getTime()) / lengthOfDay))*-1,10); 
		
						  $('#date').data('datebox').options.defaultPickerValue = defaultPickerValue;
						  $('#leaving_date').data('datebox').options.defaultPickerValue = defaultPickerValue;
						    
						  
						  $('#date').data('datebox').options.minDays = diff; 
						  $('#leaving_date').data('datebox').options.minDays = diff; 
						  
	       	        	*/    
	       	        	  	 				   
	    			});
	    			
	    			
	    			
			




// Variables

var campings;

var featuredCampings;

var current_camping;

var camping_name;

var camping_state;

var list_type;

var current_latitude;

var current_longitude;

var km_range;

var search_type;



// Constants

const SERVER = "http://www.campingbonus.com";

const SMALL_IMAGES_DIRECTORY = "http://www.campingbonus.com/components/com_mtree/img/listings/s/"; 

const MEDIUM_IMAGES_DIRECTORY = "http://www.campingbonus.com/components/com_mtree/img/listings/m/";

const MAX_ELEMENTS_FEATURED = 5;

const FEATURED = 1;

const KM_RANGE = 200;

var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];


 function getSmallImageDirectory(image) {
 
 	
		if(image) {
								
			return directory = SMALL_IMAGES_DIRECTORY + image;
								
		} else {
								
			return directory = "images/default_image.png";
			
		}
 
 }
 
 function getMediumImageDirectory(image) {
 
 	
		if(image) {
								
			return directory = MEDIUM_IMAGES_DIRECTORY + image;
								
		} else {
								
			return directory = "images/default_medium_image.jpg";
			
		}
 
 }


function mainPageLoad() {

	
		$.post("http://www.campingbonus.com/campingbonus/search.php", 
			   { 
			   
			   		featured: "1"
			   		
			   },
			   function(data) {
						   		   			   
			   		featuredCampings = jQuery.parseJSON(data);
			   		  					   		
			   		if(featuredCampings) {
			   		
			   			var featured_string_list = "";
			   			
			   			var cont = 0;
			   			
			   			$.each(featuredCampings,function(index,camping){
	
								var directory = getSmallImageDirectory(camping.images[0]);
	
								++cont;
													
								var element = "<li " + " data-theme='c' " + "id='" + index + "'>" 
											   + "<a href='#'>"
											   + "<img src='" + directory + "' alt='" + camping.name + "'" + "/>" 
											   + "<h3>" + camping.name + "</h3>"
											   + "<p>" + camping.city + ", " + camping.state + "</p>"  
											   + "</a>" + "</li>";
											    		   			
			   					featured_string_list += element; 
			   			
			   			
			   			
			   			});
			   			
			   			if(cont == 0) {
				   			
				   				featured_string_list += "<li data-theme='c'><img src='images/info.png' alt='Informacion'/><h3></h3><p><b>No hay Campings Destacados...</b></p></li>";
				   			
				   		}
			 
			   			$(featured_string_list).appendTo('#featured_list'); 
			   			
			   			$('#featured_list').listview('refresh');
			   				   		
			   		}
			   				   
			   }
	
		).error(function(){
		
			$("#linkErrorDialog").click();
		
		
		});

}


function searchCampings() {

	$.post("http://www.campingbonus.com/campingbonus/search.php", 
		   { 
		   
		   		name: camping_name,
		   		state: camping_state,	
		   		featured: "0"
		   		
		   },
		   function(data) {
		   		   				   		   			   
		   		campings = jQuery.parseJSON(data);
		   		
		   		if(campings) {
		   		
		   			$('#result_listview').children().remove('li');
		   		
		   			var campings_string_list = "";
		   			
		   			/* Adding Heading */
		   					   		
		   			campings_string_list += "<li data-role='list-divider'>Resultados de Busqueda</li>";		   		
		   					   					   			
		   			/* Adding Campings */
		   			
		   			var cont = 0;
		   			
		   			$.each(campings,function(index,camping){
		   			
		   				
						var directory = getSmallImageDirectory(camping.images[0]);
		   			
		   				++cont;
					
						var element = "<li " + " data-theme='c' >" 
										   + "<a href='#' id='" + index + "'>"
										   + "<img src='" + directory + "' alt='" + camping.name + "'" + "/>" 
										   + "<h3>" + camping.name + "</h3>"
										   + "<p>" + camping.city + ", " + camping.state + "</p>"  
										   + "</a>" + "</li>";	   			
		   				
		   				campings_string_list += element; 

		   			
		   			});
		   			
		   			if(cont == 0) {
				   			
				   		campings_string_list += "<li data-theme='c'><img src='images/info.png' alt='Informacion'/><h3></h3><p><b>No hay Campings Resultantes...</b></p></li>";
				   			
				   	}
		 
		   			$(campings_string_list).appendTo('#result_listview'); 
		   			
		   			$('#result_listview').listview('refresh');
		   				   		
		   		}
		   				   
		   }

	).error(function(){
	
		$("#linkErrorDialog").click();
	
	
	});

}


function searchCampingsByCurrentLocation() {

	$.post("http://www.campingbonus.com/campingbonus/search.php", 
		   { 
		   
		   		latitude: current_latitude,
		   		longitude: current_longitude,
		   		kilometer: km_range,
		   		featured: "0"
		   		
		   },
		   function(data) {
		   		   			   
		   		campings = jQuery.parseJSON(data);

		   		if(campings) {
		   		
		   			var campings_string_list = "";
		   			
		   			/* Adding Heading */
		   					   		
		   			campings_string_list += "<li data-role='list-divider'>Resultados de Busqueda</li>";		   		
		   					   					   			
		   			/* Adding Campings */
		   			
		   			var cont = 0;
		   			
		   			$.each(campings,function(index,camping){
					
						var directory = getSmallImageDirectory(camping.images[0]);
					
						++cont;
					
						var element = "<li " + " data-theme='c'>" 
										   + "<a href='#' id='" + index + "'>"
										   + "<img src='" + directory + "' alt='" + camping.name + "'" + "/>" 
										   + "<h3>" + camping.name + "</h3>"
										   + "<p>" + camping.city + ", " + camping.state + "</p>"  
										   + "</a>" + "</li>";		   			
		   				
		   				campings_string_list += element; 

		   			
		   			});
		   			
		   			if(cont == 0) {
				   			
				   		campings_string_list += "<li data-theme='c'><img src='images/info.png' alt='Informacion'/><h3></h3><p><b>No hay Campings Resultantes...</b></p></li>";
				   			
				   	}
		 
		   			$(campings_string_list).appendTo('#result_listview'); 
		   			
		   			$('#result_listview').listview('refresh');
		   		   				   		
		   		}
		   				   
		   }

	).error(function(){
	
		$("#linkErrorDialog").click();
	
	
	});

}


function setCampingInformation(camping) {

	/* Camping Information */
	
	$("#camping_name").html(camping.name);
	
	$("#camping_description").html(camping.description);
	
	if(camping.address != "" && camping.address != "null"){
	
		var location =  camping.city  + ", " +  camping.state;
	
		var address = "<span>Direcci&oacute;n: </span><p style='display: inline-block; font-weight: normal'>" + camping.address  + " - " + location + "</p>";

		$("#camping_address").html(address);
	
	}
	
	
	if(camping.telephone != "" && camping.telephone != "null"){
	
		var phone = "<span>Tel&eacute;fono: </span><p style='display: inline-block; font-weight: normal'>" + camping.telephone  + "</p>";
	
		$("#camping_phone").html(phone);
	
	}
	
	
	if(camping.website != "" && camping.website != "null"){
	
		var website = "<span>Website: </span><p style='display: inline-block; font-weight: normal'>" + camping.website + "</p>";
	
		$("#camping_website").html(website);
	
	}
	
	if(camping.email != "" && camping.email != "null"){
	
		var email = "<span>Email: </span><p style='display: inline-block; font-weight: normal'>" + camping.email  + "</p>";
	
		$("#camping_email").html(email);
	
	}

	
	/* Camping Image */
		
	var image = "";
	
	var directory = getMediumImageDirectory(camping.images[0]);
	
	image += "<img class='camping_image'" + "src= '" + directory + "' alt='" + camping.name + "' style='width:100%;'"  + "/>"
		
	$("#camping_image").html(image);

}



function getLocation() {

    var suc = function(p) {
		
		current_latitude = p.coords.latitude;
							
		current_longitude = p.coords.longitude; 
									
		searchCampingsByCurrentLocation();

    };

    var locFail = function(error) {

		$("#linkGeolocationErrorDialog").click();

    };

	navigator.geolocation.getCurrentPosition(suc, locFail, { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });

};

function loadmap() {

	var lat = 0;
	var long = 0;

	if(list_type == FEATURED){
	
		lat  = featuredCampings[current_camping].latitude;
		long = featuredCampings[current_camping].longitude;
    
    } else {
    
    	lat  = campings[current_camping].latitude;
		long = campings[current_camping].longitude;
    
    }
    
    
    var latlng = new google.maps.LatLng(lat, long);
    
    var myOptions = {
    
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      
    };
    
    var marker = new google.maps.Marker({
      position: latlng
     
  	});
      
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
  	marker.setMap(map);  
    
 };
 
 function getDifferenceDays(date1, date2) {
 
 	var fecha1 = new Date();
 	
 	var aux = date1.split("-",3);
 	
 	fecha1.setFullYear(aux[2],aux[1],aux[0]);
 	 	
 	var fecha2 = new Date();
 	
 	aux = date2.split("-",3);
 	
 	fecha2.setFullYear(aux[2],aux[1],aux[0]);
  
 	var ONE_DAY = 1000 * 60 * 60 * 24;
      											
	var difference = fecha1.getTime() - fecha2.getTime();			
							
	return Math.round(difference/ONE_DAY);	
 
 };
 
 
 function checkedNumberMonths() {
 
 	var n = $("input:checked").length;
 	
 	return n;

 };
 
 
 function checkedMonths(n) {
 
 	 var months = "";
 	 var j = 1;
 	
 	 $('input:checkbox:checked').each(function() {
 	 
 	 	months += $(this).val();
 	 
 	 	if(j < n) {
 		
 			months += ", ";
 			++j;
 		 		
 		}
         
     });
 	
 	return months;

 };
 
 function initDates(value,date_value) {
 
 	var lengthOfDay = 24 * 60 * 60 * 1000; 
 	
 	var presentDate = new Date(); 
 	
 	var presentDefaultPickerValue = "";
 	
 	var difference = (value == "Noche en Bungalow") ? 2 : 1;
 
 	if(date_value == "") {
	  			
		// Present Date	
				
		 presentDefaultPickerValue = [presentDate.getFullYear(),presentDate.getMonth(), presentDate.getDate()];
			
		 
	} else {
		
		var date_array = date_value.split("-",3);
	
		// Present Date	
				
		presentDefaultPickerValue = [date_array[2],date_array[1], date_array[0]];
		
		presentDate.setFullYear(date_array[2],date_array[1], date_array[0]);
	
	}
				
		// Future Date
			
		var futureDate = new Date();
	 	
	 	futureDate.setDate(presentDate.getDate() + difference);
	
		var futureDefaultPickerValue = [futureDate.getFullYear(),futureDate.getMonth(), futureDate.getDate()];
		
		// Min Days
		
		var diff_arriving = parseInt((((presentDate.getTime() - presentDate.getTime()) / lengthOfDay))*-1,10);
		 
		var diff_leaving =  parseInt((((futureDate.getTime() - presentDate.getTime()) / lengthOfDay))*-1,10); 
			
		// Assigning Dates
			
		$('#date').data('datebox').options.defaultPickerValue = presentDefaultPickerValue;
		
		$('#leaving_date').data('datebox').options.defaultPickerValue = futureDefaultPickerValue;
						    
							  
		$('#date').data('datebox').options.minDays = diff_arriving; 
		
		$('#date').datebox('refresh');
			
		$('#leaving_date').data('datebox').options.minDays = diff_leaving;
		
		$('#leaving_date').datebox('refresh');
	 
 };
 
 
function sendBookingMailForNights(clientName,clientDNI,clientPhone,clientEmail, arrivingDate,leavingDate, campingMode, camping) {
 
 	if(clientName != "" && clientDNI != "" && clientEmail != "" && arrivingDate != "" && leavingDate != "" && campingMode != "") {
 			
 			var days = getDifferenceDays(leavingDate,arrivingDate);
 	 	
 	 		if(days > 0) {
 	 	
		 		$.post("http://www.campingbonus.com/campingbonus/mail.php", 
				   { 
				   
				   		// Customer Information
				   		
					   		customer_name: clientName,
					   		customer_dni: clientDNI,
					   		customer_phone: clientPhone,
					   		customer_email: clientEmail,
					   		arriving_date: arrivingDate,
					   		leaving_date: leavingDate,
					   		difference_days: days,
					   		
				   		// Camping Information
					   		
					   		type:campingMode,
					   		name: camping.name,
					   		address: camping.address,
					   		phone: camping.telephone,
					   		email: camping.email,
					   		website: camping.website
					   		
				   },
				   function(data) {
				   
				   		$("#customer_name").val("");
				   		
				   		$("#dni").val("");
				   		
				   		$("#phone").val("");
				   		
				   		$("#email").val(""); 
				   		
				   		$("#date").val("");
				   		
				   		$("#leaving_date").val("");
				   		
				   		var myselect = $("select#camping_type");
				   		
						myselect[0].selectedIndex = 0;
						
						myselect.selectmenu("refresh"); 	
																				
						$("#arriving_date_container").hide();
								
						$("#leaving_date_container").hide();	
				   		   			   
				   		$("#linkEmailSentDialog").click();
				   				   
				   }
		
				).error(function(){
			
					$("#linkErrorDialog").click();
			
			
				});
				
 			} else {
 			
 				$("#linkEmailNotSentDialog").click();
 			
 			} 
 	
 	} else {
 	
 		$("#linkEmailNotSentDialog").click();
 	
 	}

 };
 
 
 
 function sendBookingMailForMonths(clientName,clientDNI,clientPhone,clientEmail, campingMode, camping) {
 
 	if(clientName != "" && clientDNI != "" && clientEmail != "" && campingMode != "") {
 			
 			var months = checkedNumberMonths();
 	 	
 	 		if(months > 0) {
 	 		
 	 			var month_strings = checkedMonths(months); 
 	 	 	
		 		$.post("http://www.campingbonus.com/campingbonus/mail.php", 
				   { 
				   
				   		// Customer Information
				   		
					   		customer_name: clientName,
					   		customer_dni: clientDNI,
					   		customer_phone: clientPhone,
					   		customer_email: clientEmail,
					   		months_number: months,
					   		months: month_strings, 
					   							   		
				   		// Camping Information
					   		
					   		type:campingMode,
					   		name: camping.name,
					   		address: camping.address,
					   		phone: camping.telephone,
					   		email: camping.email,
					   		website: camping.website
					   		
				   },
				   function(data) {
				   
				   		$("#customer_name").val("");
				   		
				   		$("#dni").val("");
				   		
				   		$("#phone").val("");
				   		
				   		$("#email").val(""); 
				   						   				   		
				   		var myselect = $("select#camping_type");
				   		
						myselect[0].selectedIndex = 0;
						
						myselect.selectmenu("refresh"); 
						
						$("input[type='checkbox']").attr("checked",false).checkboxradio("refresh");	
						
						$("#months").hide();
											   							   		   			   
				   		$("#linkEmailSentDialog").click();
				   				   
				   }
		
				).error(function(){
			
					$("#linkErrorDialog").click();
			
			
				});
				
 			} else {
 			
 				$("#linkEmailNotSentDialog").click();
 			
 			} 
 	
 	} else {
 	
 		$("#linkEmailNotSentDialog").click();
 	
 	}

 };
 
 
 





