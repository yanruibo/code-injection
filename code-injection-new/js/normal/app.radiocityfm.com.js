




function loadURL(url){
	navigator.app.loadUrl(url, { openExternal:true });			
	return false;
}
function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(email)) {
		return false;
	} else {
		return true;
	}
}
function exitAppPopup() {
	navigator.notification.confirm(
		  '¿Salir de Radio City FM?'
		, function(button) {
			  if (button == 2) {
				  navigator.app.exitApp();
			  }
		  }
		, 'Salir'
		, 'No,Si'
	);  
	return false;
}
function playPause() {	
	var song = document.getElementsByTagName('audio')[0];
	if (song.paused)
	{
		song.play();		
	}
	else
	{
		song.pause();		
	}
}	
$(document).ready(function(){	
	$('#activar_play').click(function() { 
		playPause();
		$("#activar_play").hide();
		$("#activar_pausa").show();
	});
	
	$('#activar_pausa').click(function() { 
		playPause();
		$("#activar_pausa").hide();
		$("#activar_play").show();
	});	

	$('#linkenvivo').click(function() {		
		$('#lifacebook').hide('fade',200);
		$('#litwitter').hide('fade',200);
		$('#limensaje').hide('fade',200);
		$('#lienvivo').toggle('fade',700);
	});
	
	$('#linkfacebook').click(function() {
		$('#lienvivo').hide('fade',200);
		$('#litwitter').hide('fade',200);
		$('#limensaje').hide('fade',200);	
		$('#lifacebook').toggle('fade',700);
	});
	
	$('#linktwitter').click(function() {
		$('#lienvivo').hide('fade',200);
		$('#lifacebook').hide('fade',200);
		$('#limensaje').hide('fade',200);
		$('#litwitter').toggle('fade',700);
	});
	
	$('#linkmensaje').click(function() {		
		$('#lienvivo').hide('fade',200);
		$('#lifacebook').hide('fade',200);
		$('#litwitter').hide('fade',200);
		$('#limensaje').toggle('fade',700);
	});	
	
	//Cargamos el reproductor
	$.ajax({
		async: true,
		url: "http://webservices.radiocityfm.com/index.php?op=reproductor&callback=?",
		dataType : 'json',
		success:function(data) {
			$('#reproductor').html(data.respData);
	  	},
	  	error:function(a,b,c) {			
		  	$('#reproductor').html('Se ha producido un error al obtener la información actualizada. Intentelo nuevamente en unos instantes.');			
	  	},
	});
	
	//Cargamos el programa en vivo
	$.ajax({
		async: true,
		beforeSend: function() { $('#cargandoenvivo').show(); }, 
     	complete: function() { $('#cargandoenvivo').hide(); $('#envivo').show(); },
		url: "http://webservices.radiocityfm.com/index.php?op=programacion&callback=?",
		dataType : 'json',
		success:function(data) {
			$('#programa').html(data.respData.nombre);
			if (data.respData.foto != '' && data.respData.foto != null)
				$('#imagen').html('<img src="http://radiocityfm.com/imagenes/100x90/programacion/'+data.respData.foto+'" />');
			$('#conduce').html(data.respData.conduce);
			$('#horario').html(' de '+data.respData.desde+' a '+data.respData.hasta);
	  	},
	  	error:function(a,b,c) {					  	
			$('#envivo').html('Se ha producido un error al obtener la información actualizada. Intentelo nuevamente en unos instantes.');
			$('#envivo').show();
	  	},
	});
	//Cargamos feed de Facebook
	$.ajax({
		async: true,
		beforeSend: function() { $('#cargandofacebook').show(); }, 
     	complete: function() { $('#cargandofacebook').hide(); $('#facebookfeed').show(); },
		url: "http://webservices.radiocityfm.com/face.php?callback=?",
		dataType : 'json',
		success:function(data) {
			var contenido = '<div class="titulo">Lo que pasa en Facebook...</div>';
		  	$.each(data.datos,function(index,value) {
				var urlface = "''"+value.link+"'";	
				if (value.link != '' && value.link != null)
				{
					contenido += '<div class="item" onclick="loadURL('+urlface+');"><div class="mensaje">';					
					if (value.imagen != '' && value.imagen != null)
						contenido += '<div class="imagen"><img src="'+value.imagen+'" width="130px" /></div>';
					contenido += value.mensaje+'</div></div>';
				}
		  	});	
			var facebook = "'http://www.facebook.com/radiocityfmjujuy'";
			contenido += '<div class="ver_mas_fb" onclick="loadURL('+facebook+');">Ver más</div>';
			$('#facebookfeed').html(contenido);	  
	  	},
	  	error:function(a,b,c) {		  	
			$('#facebookfeed').html('Se ha producido un error al obtener la información actualizada. Intentelo nuevamente en unos instantes.');
			$('#facebookfeed').show();
	  	},
	});
	
	//Cargamos feed de Twitter
	$.ajax({
		async: true,
		beforeSend: function() { $('#cargandotwitter').show(); }, 
     	complete: function() { $('#cargandotwitter').hide(); $('#twitterfeed').show(); },
		url: "http://webservices.radiocityfm.com/tuit.php?callback=?",
		dataType : 'json',
		success:function(data) {
			var contenido = '<div class="titulo">Lo que pasa en twitter...</div>';
		  	$.each(data,function(index,value) {
				var urltuit = "'https://twitter.com/radiocityjujuy/status/"+value.id+"'";		
				contenido += '<div class="item" onclick="loadURL('+urltuit+');"><div class="mensaje">'+value.text+'</div></div>';
		  	});	
			var twitter = "'https://twitter.com/radiocityjujuy'";
			contenido += '<div class="ver_mas_tw" onclick="loadURL('+twitter+');">Ver más</div>';
			$('#twitterfeed').html(contenido);	  
	  	},
	  	error:function(a,b,c) {			
		  	$('#twitterfeed').html('Se ha producido un error al obtener la información actualizada. Intentelo nuevamente en unos instantes.');
			$('#twitterfeed').show();
	  	},
	});
	
	//Enviamos mensaje
	$("#boton_enviar").click(function() {		
		if ($("#nombre").val().length < 1) {
			$("#label_nombre").css("color","#C00");
			$("#label_nombre").html('Escribe un nombre.');
			return false;			
		}
		if ($("#email").val().length < 1) {
			$("#label_email").css("color","#C00");
			$("#label_email").html('Escribe un email.');
			return false;
		}
		else {
			if (IsEmail($("#email").val()) == false) 
			{
				$("#label_email").css("color","#C00");
				$("#label_email").html('Escribe un email válido.');
				return false;				
			}
		}
		if ($("#texto").val().length < 1) {
			$("#label_texto").css("color","#C00");
			$("#label_texto").html('Escribe un mensaje.');
			return false;			
		}
				
		var url = "http://webservices.radiocityfm.com/enviar-pedido.php";
		$.ajax({
		   type: "POST",
		   url: url,
		   data: $("#pedido").serialize(), // serializes the form's elements.
		   success: function(data)
		   {
				if (data == "true") 
				{
					//$('#limensaje').hide().delay(800).show();
					$('#mensaje').hide(400).delay(5000).show(0);
					$("#mensaje-enviado").css("color","#399");
					$("#mensaje-enviado").html('Tu mensaje ha sido enviado.');		
					$('#pedido').trigger("reset");				
				}
				else
				{					
					$("#mensaje-enviado").css("color","#C00");
					$("#mensaje-enviado").html('Ocurrió un problema al enviar tu mensaje,<br /> intenta nuevamente en instantes.');						
				}
		   }
		});
	});	
});





/* Navigation */

$(document).ready(function(){

  $(window).resize(function()
  {
    if($(window).width() >= 765){
      $(".sidebar #nav").slideDown(350);
    }
    else{
      $(".sidebar #nav").slideUp(350); 
    }
  });


  $("#nav > li > a").on('click',function(e){
      if($(this).parent().hasClass("has_sub")) {
        e.preventDefault();
      }   

      if(!$(this).hasClass("subdrop")) {
        // hide any open menus and remove all other classes
        $("#nav li ul").slideUp(350);
        $("#nav li a").removeClass("subdrop");
        
        // open our new menu and add the open class
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      }
      
      else if($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      } 
      
  });
});

$(document).ready(function(){
  $(".sidebar-dropdown a").on('click',function(e){
      e.preventDefault();

      if(!$(this).hasClass("open")) {
        // hide any open menus and remove all other classes
        $(".sidebar #nav").slideUp(350);
        $(".sidebar-dropdown a").removeClass("open");
        
        // open our new menu and add the open class
        $(".sidebar #nav").slideDown(350);
        $(this).addClass("open");
      }
      
      else if($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(".sidebar #nav").slideUp(350);
      }
  });

});
  

/* Slide box widget */


$('.slide-box-button').click(function() {
    var $slidebtn=$(this);
    var $slidebox=$(this).parent().parent();
    if($slidebox.css('right')=="-252px"){
      $slidebox.animate({
        right:0
      },500);
      $slidebtn.children("i").removeClass().addClass("icon-chevron-right");
    }
    else{
      $slidebox.animate({
        right:-252
      },500);
      $slidebtn.children("i").removeClass().addClass("icon-chevron-left");
    }
}); 

/* Tab */

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})


/* Scroll to Top */

$(document).ready(function(){
  $(".totop").hide();

  $(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop()>600)
      {
        $('.totop').slideDown();
      } 
      else
      {
        $('.totop').slideUp();
      }
    });

    $('.totop a').click(function (e) {
      e.preventDefault();
      $('body,html').animate({scrollTop: 0}, 500);
    });

  });
});

/* Main page isotope */

function isotope() {
  var container = $('#portfolio-one');
  var item = $('#portfolio-one .element');
  var columns;
  var width;
  columns = Math.ceil(container.width()/300);  // Number of columns 
  width = Math.floor(container.width()/columns); // Width for each item
  item.each(function(){
    $(this).css('width',width+'px'); // Setting width
  }); 
  container.imagesLoaded( function(){
    container.isotope({    // Isotope
      resizable: false,
      masonry: {
        columnWidth: width
      }
    }); 
  });
}

$(document).ready(function(){ 
  isotope(); // Initilize isotope 
  $(window).smartresize(function(){
    isotope(); // Call isotope when resize
  });   
});

