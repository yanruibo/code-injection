







$(document).ready(function () {
        
        $("#vmap").click();
});









$(document).ready(function () {
        cargarmap();
        $("#vmap").click();
});


 var ip="https://www.bithumano.com/apps/dakar/index.php";
 var LocsB =[];
var map = new Maplace({
map_div: '#gmap-mixed'
});
var map1 = new Maplace({
map_div: '#gmap-mixed1'
})


function cargarmap(){
	  $.ajax({
 dataType: "jsonp",
 url: ip+"?val=",
 //data:{tag:tag},
 type: "GET",
 crossDomain: true,
 jsonpCallback:'jpCallback',
  beforeSend: function () {
         $('#gmap-mixed').html('<img id="load" src="img/ajax.gif"  style="width:100%" />');           
        },
 complete: function(xhr, textStatus) {
 		$('#load').remove();         
  },
 success: function(jsondata) { 

                $.each(jsondata,function(i,item){                                      
               
          dato=[{
        lat: item.latitud,
        lon: item.longitud,
        title: "Estacion de servicio: " + item.estacion_servicio,
        html: [
            '<strong>Dir: </strong><span>'+ item.direccion + '</span><br>',
            '<strong>Contacto: :</strong><span>'+ item.contacto_principal + '</span><br>',
            '<strong>Tel: :</strong><span>'+ item.tel_cp + '</span><br>',
            '<strong>GNV: </strong><span>'+item.gnv+'</span><br>',
            '<strong>Gasolina: </strong><span>'+item.gasolina+'</span><br>',
            '<strong>Diese: </strong><span>'+item.diesel+'</span><br>',

        ].join(''),
        zoom: 15,
        animation: google.maps.Animation.DROP,
        icon: 'https://www.bithumano.com/apps/dakar/ico1.png'
        
    }];
        
     LocsB = LocsB.concat(dato);                                               
                      });
                        dat=[{
                    lat: -13.912755290299431,
                    lon: -66.26950624999995, 
                    title: "Punto de busqueda" ,                    
                    animation: google.maps.Animation.DROP,
                    icon: 'https://www.bithumano.com/apps/dakar/ico.png'
                   }];
    LocsB = LocsB.concat(dat);    
 map.Load({locations: LocsB,
       start: LocsB.length,    
	controls_on_map: false});

 	

 } 
 ,
 error: function (jqXHR, textStatus, errorThrown) {
   alert('error');
 }
});
}



function cargarcombustibles(){
    $("#placa option:selected").each(function() {
    var placa = $(this).val();
    $.ajax({
    dataType: "jsonp",
    url: ip+"?val=ruta&tipo="+placa,
    //data:{val:'ruta',tipo:placa},
    type: "GET",
    crossDomain: true,
    jsonpCallback:'jpCallback',
    success: function(jsondata) { 
                       $("#preciocom").val('');
                       $("#combustible").empty();
                        $("#combustible").append("<option value=''>seleccione</option>"); 
                      $.each(jsondata,function(i,item){
                        $("#combustible").append("<option value=" + item.precio + ">" + item.nombre +" "+ item.formato+ "</option>");
                       });

       },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error');
    }
    });                   
    });
}               

     
function pr(){
    $("#combustible option:selected").each(function() {
          $("#preciocom").val($(this).val()); 
          var n = $("#combustible option:selected").html().split(" ");                   
          $('#formato').html("Km x 1"+n[n.length-1]);

      }); 
}

  var geocoder = new google.maps.Geocoder();  
  /// para searchbox-----
       $(function() {
        
         
         $("#searchbox").autocomplete({
          
           source: function(request, response) {

          if (geocoder === null){
           geocoder = new google.maps.Geocoder();
          } 
             geocoder.geocode( {'address': request.term }, function(results, status) {
               if (status === google.maps.GeocoderStatus.OK) {

                  var searchLoc = results[0].geometry.location;
                  var lat = results[0].geometry.location.lat();
                  var lng = results[0].geometry.location.lng();
                  var latlng = new google.maps.LatLng(lat, lng);
                  var bounds = results[0].geometry.bounds;

                  geocoder.geocode({'latLng': latlng}, function(results1, status1) {
                      if (status1 === google.maps.GeocoderStatus.OK) {
                        if (results1[1]) {
                         response($.map(results1, function(loc) {
                        return {
                            label  : loc.formatted_address,
                            value  : loc.formatted_address,
                            bounds   : loc.geometry.bounds,
                            latitude: loc.geometry.location.lat(),
                            longitude: loc.geometry.location.lng()
                          };
                        }));
                        }
                      }
                    });
            }
              });
           },
           select: function(event,ui){
                var la = ui.item.latitude;
                var lg = ui.item.longitude;
                var pos = ui.item.position;
                var lct = ui.item.locType;
                var bounds = ui.item.bounds;
                if (bounds){
                    
                     
                        LocsB[LocsB.length]={
                    lat: la,
                    lon: lg, 
                    title: "Punto de busqueda" ,                    
                    zoom: 15,
                    animation: google.maps.Animation.DROP,
                    icon: 'https://www.bithumano.com/apps/dakar/ico.png'
                };        
                 
                      map.Load({locations: LocsB,
                      start: LocsB.length,                      
                      controls_on_map: false
                      
            });
       
                      
                 }
           }
         });
     });   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 var LocsX =[];
     $(function() {
       
         
         $("#inicio").autocomplete({
          
           source: function(request, response) {

          if (geocoder === null){
           geocoder = new google.maps.Geocoder();
          } 
             geocoder.geocode( {'address': request.term }, function(results, status) {
               if (status === google.maps.GeocoderStatus.OK) {

                  var searchLoc = results[0].geometry.location;
                  var lat = results[0].geometry.location.lat();
                  var lng = results[0].geometry.location.lng();
                  var latlng = new google.maps.LatLng(lat, lng);
                  var bounds = results[0].geometry.bounds;

                  geocoder.geocode({'latLng': latlng}, function(results1, status1) {
                      if (status1 === google.maps.GeocoderStatus.OK) {
                        if (results1[1]) {
                         response($.map(results1, function(loc) {
                        return {
                            label  : loc.formatted_address,
                            value  : loc.formatted_address,
                            bounds   : loc.geometry.bounds,
                            latitude: loc.geometry.location.lat(),
                            longitude: loc.geometry.location.lng()
                          };
                        }));
                        }
                      }
                    });
            }
              });
           },
           select: function(event,ui){
                var la = ui.item.latitude;
                var lg = ui.item.longitude;
                var title = ui.item.value; 
                var pos = ui.item.position;
                var lct = ui.item.locType;
                var bounds = ui.item.bounds;
                if (bounds){
                   
                   if(LocsX[0]){
                      // alert('existo');
                        LocsX[0]={
                    lat: la,
                    lon: lg,  
                    title: title,
                    zoom: 15,
                    animation: google.maps.Animation.DROP

                };        
                   }else{
                   
                     dat=[{
                    lat: la,
                    lon: lg,  
                    title: "Inicio: "+title,
                    zoom: 15,
                    animation: google.maps.Animation.DROP
                }];
        
                LocsX = LocsX.concat(dat);
                }
                 if(LocsX.length===1){
                    LocsX[1]={
                    lat: la,
                    lon: lg,  
                    title: "Fin: "+title,
                    zoom: 15,
                    animation: google.maps.Animation.DROP
                }; 
                    }
                        map1.Load({
                             locations: LocsX,                               
                          generate_controls: false,
                          show_markers: false,
                          type: 'directions',
                          draggable: true,
                          directions_panel: '#route',                                 
                          afterRoute: function(distance) {                                    
                              var km = distance/1000;
                                  $('#km').val(km);
                          } 
                            /*locations: LocsX,
                            start: 0,                      
                            controls_on_map: false*/

                        });  
                 }
           }
         });
         $("#fin").autocomplete({

     source: function(request, response) {

    if (geocoder === null){
     geocoder = new google.maps.Geocoder();
    } 
       geocoder.geocode( {'address': request.term }, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {

            var searchLoc = results[0].geometry.location;
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var latlng = new google.maps.LatLng(lat, lng);
            var bounds = results[0].geometry.bounds;

            geocoder.geocode({'latLng': latlng}, function(results1, status1) {
                if (status1 === google.maps.GeocoderStatus.OK) {
                  if (results1[1]) {
                   response($.map(results1, function(loc) {
                  return {
                      label  : loc.formatted_address,
                      value  : loc.formatted_address,
                      bounds   : loc.geometry.bounds,
                      latitude: loc.geometry.location.lat(),
                      longitude: loc.geometry.location.lng()
                    };
                  }));
                  }
                }
              });
      }
        });
     },
     select: function(event,ui){
          var la = ui.item.latitude;
          var lg = ui.item.longitude;
          var title = ui.item.value; 
          var pos = ui.item.position;
          var lct = ui.item.locType;
          var bounds = ui.item.bounds;
          if (bounds){  
             if(LocsX[1]){
                // alert('existo');
                  LocsX[1]={
              lat: la,
              lon: lg,  
              title: "Fin: "+title,
              zoom: 15,
              animation: google.maps.Animation.DROP
          };        
             }else{

               dat=[{
              lat: la,
              lon: lg,  
              title: "Fin: "+title,
              zoom: 15,
              animation: google.maps.Animation.DROP
          }];

          LocsX = LocsX.concat(dat);
          }

                  map1.Load({
                     locations: LocsX,                               
                          generate_controls: false,
                          show_markers: false,
                          type: 'directions',
                          draggable: true,
                          directions_panel: '#route',                                 
                          afterRoute: function(distance) {                                    
                              var km = distance/1000;
                                  $('#km').val(km);
                          } 
                  });
           }
     }
   });
     });   
 $(document).ready(function(){

            $("#km").attr('disabled',true);
            $("#preciocom").attr('disabled',true);
            $("#total").attr('disabled',true);
        });
        function validarSiNumero(object)
        {
        var numero = object.value;
        if (!/^([0-9])*$/.test(numero))
        object.value = numero.substring(0,numero.length-1);
        }
        
	function convertir() {
                //validar campos vacios         
    if($("#inicio").val().length < 1 || $("#fin").val().length < 1 ){  
        alert("Los campos con (*) son obligatorios");  
        return false;  
    }  else{   
	if(LocsX[0]){
            
        }
		$totalruta = parseInt($('#km').val());
                $precio = parseFloat($('#preciocom').val());
                $rendimiento = parseFloat($('#precio').val());
              	$total=(($totalruta/$rendimiento)*$precio);             
				$total = Math.round($total * 100) / 100;
             	$('#total').val($total);
          }
      }
  

function get_jsonp_tipos(ti) {
   var LocsF =[];
   switch (ti){
        case 'gnv':
            if($('#gnv').val()==='NO'){
                $('#gnv').val('SI');
            }else{
                 $('#gnv').val('NO');
            }
            break;
        case 'gasolina':
           if($('#gasolina').val()==='NO'){
                $('#gasolina').val('SI');
            }else{
                 $('#gasolina').val('NO');
            }
            break;
        case 'diesel':
             if($('#diesel').val()==='NO'){
                $('#diesel').val('SI');
            }else{
                 $('#diesel').val('NO');
            }
            break;
    }
var val = $('#gnv').val();
val += " "+$('#gasolina').val();
val += " "+$('#diesel').val();

var url = ""; 
if(val == "NO NO NO"){
url = ip+"?val=";
}else{
url = ip+"?val=tipos&tipo="+val;
}
$.ajax({
 dataType: "jsonp",
 url: url,
 //data:{tag:tag},
 type: "GET",
 crossDomain: true,
 jsonpCallback:'jpCallback',
  beforeSend: function () {
         $('#cargando').html('<img src="img/loading.gif"  style="width:100%" />');
           $('#check').css({visibility: 'hidden'
        });;
        },
 complete: function(xhr, textStatus) {
 		$('#cargando').html('');
        $('#check').css({visibility: 'visible'
        });;        
  },
 success: function(jsondata) { 
        if(jsondata===null){
        	alert('No hay estaciones con esa especificacion intente otra');

        }   else{
        	 $.each(jsondata,function(i,item){                                      
            //alert(item); 
        dato=[{
        lat: item.latitud,
        lon: item.longitud,
        title: "Estacion de servicio: " + item.estacion_servicio,
          html: [
            '<strong>Dir: </strong><span>'+ item.direccion + '</span><br>',
            '<strong>Contacto: :</strong><span>'+ item.contacto_principal + '</span><br>',
            '<strong>Tel: :</strong><span>'+ item.tel_cp + '</span><br>',
            '<strong>GNV: </strong><span>'+item.gnv+'</span><br>',
            '<strong>Gasolina: </strong><span>'+item.gasolina+'</span><br>',
            '<strong>Diese: </strong><span>'+item.diesel+'</span><br>',

        ].join(''),
        zoom: 15,
        animation: google.maps.Animation.DROP,
        icon: 'https://www.bithumano.com/apps/dakar/ico1.png'
    }];
        
     LocsF = LocsF.concat(dato);
             });
     map.Load({locations: LocsF,
     controls_on_map: false});
        }
      
 } 
 ,
 error: function (jqXHR, textStatus, errorThrown) {
   alert('error');
 }
});   
}
  

	  		
            
