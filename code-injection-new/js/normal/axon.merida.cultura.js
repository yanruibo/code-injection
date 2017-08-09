



























window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')







$(document).ready(function() {


App.load("home");

});











			$(document).ready(function() {
			$(".fancybox").fancybox();
			   $("#miboton").trigger('click');
			});
		

 window.location = 'index.html'; 

var webService = "http://culturamerida.info/Controller.php?method=";
var eventos = null;

var festivales = null;
var noticias = null;
var galerias = null;
var fecha = null;
var calendardata = null;  
var eventID = null;
var telefono = null;
var eventCalendar = null;
var token = null;
var dbLocal = null;
var dbversion = null;
var _versionserver = null;
var _versionLocal = null;


var App = {
    geTime : function(){
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var seconds = date.getSeconds();
        
        return hour;
    },
    getDate : function(){
        var date = new Date();
        var dia = date.getDate();
        var mes = (date.getMonth()+1);
        var anio = date.getFullYear();
        
        return anio+'-'+mes+'-'+dia;
    },
  init : function(){
        if(App.checkConnection()){
            showspinner('Cargando ...','Por favor espere');
          $.ajax({
            url: webService+'init&hora='+App.geTime()+'&device=android',
            type: "GET",
            dataType: "json",
            timeout: 60000,
            success: function(response) {
            
                
                 hidespinner();

        
         
            },
            error : function(jqXHR,exception){

                readError(jqXHR, exception);
                
            }
        });
            
            App.populator('galeria',function(page){
                    page.addEventListener('appShow',function(){
                        App.setGalerias();
                    });
            });
            
            /*calendario de eventos*/
            App.populator('CalendarRender',function(page){
                page.addEventListener('appShow',function(){
                    App.getCalendar();
                },false); 
            });
            
            App.populator('home',function(page){
                    page.addEventListener('appShow',function(){
                        App.setIndex(); 
                      
                    },false);
            });
            
            App.populator('feztivales',function(page){
                    page.addEventListener('appShow',function(){
                        App.FestivalList();
                    });
            });
            
            App.populator('maps',function(page){
                    page.addEventListener('appShow',function(){
                        App.Mapa();
                    });
            });
        }else{
            navigator.notification.alert("Es necesario contar con conexion a internet para visualizar correctamente esta aplicacion.",function(){ hidespinner(); App.init(); },'Aviso!','Reintentar');
        }
  },
    checkConnection : function(){
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';
        if((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')){
            return false;
        }else{
            return true;
        }
    },

  setSlideshow : function(){
    
 
  },
    meridaFest : function(){
      //leer el archivo local
      //el merida fest y el olimpo son una vez al año lo cual requerira eventos para ambos festivales que se deben ver
      //reflejados cuando se entre a cada una de la seccion como el calendario de eventos y la posibilidad de filtro
      
      var activo = false;
      
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 7){
          activo = true;
        } //el id 7 es del merida fest en la base de datos, no debe ser borrado!
      }
      
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('meridaFest', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '1' || dbLocal.Estaticos[i].tipo == 1){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('meridaFest', {images: galerias });
        
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(7,null,null);
      }
      else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galeria',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    nocheBlanca : function(){
      //verificar si esta activo el evento
      var activo = false;
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 12 ){
          activo = true;
        } //el id 1 es del noche blanca en la base de datos, no debe ser borrado!
      }
      
      
      //si no esta activo muestra una galeria
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('nocheBlanca', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '3' || dbLocal.Estaticos[i].tipo == 3){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('nocheBlanca', {images: galerias });
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(12,null,null);
      }else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galerias',function(){ App.back()  },'Aviso','Aceptar');
      }
      
    },
    olimpo : function(){
      //verificar si esta activo el evento
      var activo = false;
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 6){
          activo = true;
        } //el id 6 es del olimpo en la base de datos, no debe ser borrado!
      }
      
      
      //si no esta activo muestra una galeria
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('olimpo', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '2' || dbLocal.Estaticos[i].tipo == 2){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('olimpo', {images: galerias });
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(6,null,null);
      }else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galerias',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    setConfRegistro : function(){
    //--Validar si el usuario existe

         if (App.checkConnection()) {
    var viewRegistro;   
    
      //ocultar campos
      $('.esconde').hide();
    $('.esconde2').hide();
    $('.mesconde').hide();
      //set placeholder to number text
      $("input[type='number']").each(function(i, el) {
          el.type = "text";
          el.onfocus = function(){this.type="number";};
          el.onblur = function(){this.type="text";};
      });
      
      //habilitar campos
      $('#origen').on('change',function(){
        var self = $(this).val();
        if(self == 'n'){ /*habiliar campos*/ $('.esconde').show(); $('.esconde2').hide();} //nacional
        if(self == 'e'){ /*no habiliar campos*/ $('.esconde').hide(); $('.esconde2').show();  $('.mesconde').hide();} //extranjero
      })
      
      //set country
      populateCountries("pais");
    selectStates("estados","municipios");
      
      $('#sendregister').unbind('click');
      
      $('#sendregister').on('click',function(){ 
      
      var email = $('#email').val();  
      var origen = $('#origen').val();      
      cadena = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if ( !cadena.test(email) )
        {
            navigator.notification.alert('Ingresa un correo valido',null,'Aviso!','Aceptar');     
        }
        else if(origen == 'n')
        {
          var munic = $('#municipios').val();
          var estate = $('#estados').val();
          var tel = $('#tel').val();
          if(estate == '' || estate == null || munic == '' || munic == null)
          {
            navigator.notification.alert('Selecciona un estado y un municipo',null,'Aviso!','Aceptar');
          }
          else if(tel.length < 7 )
          {
            navigator.notification.alert('Ingresa un numero valido',null,'Aviso!','Aceptar');
          }else{
            App.registerUsr();
          }
        }
        else if(origen == 'e')
        {
          country = $('#pais').val();
          if( country == '')
          {
            navigator.notification.alert('Selecciona un pais',null,'Aviso!','Aceptar');
          }else{
            App.registerUsr();
          }
        }
        else
        {       
          App.registerUsr();        
        }
         
        
      })

         }else{

                navigator.notification.alert('Se requiere conexion a internet para realizar el registro.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    registerUsr : function(){
    
    
    
      if(App.checkConnection()){
      var name = $('#nombre').val(),
      age = $('#edad').val(),
      country = $('#pais').val(),
      mail = $('#email').val(),     
      origin = $('#origen').val(),
    telef  = $('#tel').val(),
      sex = $('#sexo').val(),
      estado = $('#estados').val(),
      municipio = $('#municipios').val(),
    estado = $("#estados").val();
    
    
    
      
      if(origin != '' && origin != null  && name != '' && name != null && sex != null && sex != '' && age != null && age != ''  ){
          //enviar el registro del ciudadano local/nacional
    
        
          showspinner('Enviando / Sending ...','Por favor espere');
          $.ajax({
            url : webService+'registrarUsuarioApp',
            type : 'POST',
            data : {
              nombre : name,
              edad : age,
              pais : country,
              email : mail,
              origen : origin,
              sexo : sex,
              tel : telef,
            state : estado,
            muni_ci: municipio,
            token: device.uuid
            },
            timeout : 10000,
            success : function(response){
              navigator.notification.alert('Gracias por registrarse / Thanks!',function(){ App.back(); },'Aviso','Aceptar');
              hidespinner();
            },
            error : function(jqXHR,exception){
                     
                       readError(jqXHR, exception);
                      
                  }
          })
      
      
        }else{
          navigator.notification.alert('Por favor rellene todos los campos',null,'Aviso!','Aceptar');
        }

      }else{
        navigator.notification.alert('Se requiere conexion a internet',null,'Aviso!','Aceptar');
      }
      return false;
    },
    ShowToast : function(message,duration){
        if(message != '' && duration !=''){
            if(duration == 'long'){
                longToast(message);
            }else{
                shortToast(message);
            }
        }
    },
    viewVideos : function(){

         if(App.checkConnection()){
      var lst = '';

    if(dbLocal.Videos.length != 0)
    {   
        for(var n = 0; n < dbLocal.Videos.length; n++){
          lst += '<div onclick="window.open(\''+dbLocal.Videos[n].url+'\',\'_blank\', \'location=yes\')" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr> <td align="left"><img src="images/verVideo.png" /></td> <td>'+dbLocal.Videos[n].titulo+'</td></tr></table></div>';
        }
    }else{
     
        lst = '<p class="app-input">No se han publicado videos, pronto tendremos algo para ti.</p>';  
    }
        $('#videos').html(lst);

         }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las noticias.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    viewNoticias : function(){

        if(App.checkConnection()){
        var lst = '';
    
    if(dbLocal.Noticias.length != 0)
    {
        for(var n = 0; n < dbLocal.Noticias.length; n++){
            if(dbLocal.Noticias[n].url == '' || dbLocal.Noticias[n].url == null){
               // lst += '<li class="app-button" onclick="App.load(\'viewNoticia\'); App.viewNoticia('+dbLocal.Noticias[n].ID+')">'+dbLocal.Noticias[n].titulo+'</li>';
              lst += '<div  onclick="App.load(\'viewNoticia\'); App.viewNoticia('+dbLocal.Noticias[n].ID+')" style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/notas.png"/></td>  <td>'+dbLocal.Noticias[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            }else{
               //lst += '<li class="app-button" onclick="window.open(\''+dbLocal.Noticias[n].url+'\',\'_blank\', \'location=yes\')">'+dbLocal.Noticias[n].titulo+'</li>';
              lst += '<div onclick="window.open(\''+dbLocal.Noticias[n].url+'\',\'_blank\', \'location=yes\')" style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/notas.png"/></td>  <td>'+dbLocal.Noticias[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            }
        }
    }else{
      
       lst =  '<p class="app-input">No se han publicado noticias, pronto tendremos algo para ti.</p>';
     
    }
        $('#noticias').html(lst);


          }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las noticias.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    viewNoticia : function(id){
      $('#noticiatitle').html('');
        $('#descnoticia').html('');
        for(var i = 0; i < dbLocal.Noticias.length; i++){
            if(id == dbLocal.Noticias[i].ID){
                $('#noticiatitle').html(dbLocal.Noticias[i].titulo);
                $('#descnoticia').html(dbLocal.Noticias[i].desc);
            }
        }
    },
    viewCalendario : function(){
      //validar la conexiona internet
      if(App.checkConnection()){
      
      $('#renderCal').hide();
        $('#calendarWidget').show();
        $('#renderCal').html('');
       
        $('#calendarWidget').show();
         
         var cTime = new Date(), month = cTime.getMonth()+1, year = cTime.getFullYear();
         var evtList = $('#listaEvt');
         var theMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

         var theDays = ["D", "L", "M", "M", "J", "V", "S"];
        
         $('#calendar').calendar({
             months: theMonths,
             days: theDays,
             req_ajax: {
                 type: 'get',
                 url: webService+'getCalendario&hora='+App.geTime()
             }
         });
         
        }else{
            navigator.notification.alert('Se requiere conexion a internet para ver el calendario.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
  
    viewEventos : function(festival,peticion,limite){
      if(festival != 0 && festival != '' && peticion != null && peticion == 'peticion' && limite != 0 && limite != ''){
        //esto es para cargar mas resultados
        showspinner('Cargando ...','Espere Por favor');
        
        $.ajax({
          url : webService+'getOlimpo&peticion=peticion&limite='+limite,
          type : 'get',
          dataType : 'json',
          timeout : 10000,
          success : function(data){
            var content = $('#content'),
            eventos = '';
            
            for(var i = 0; i < data.length; i++){
              eventos += '<div style="min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;  "><p style="font-weight:bold;">'+data[i].titulo.substring(0,50)+' ... <img src="images/mano.png" /></p><p>Fecha : '+data[i].fecha+' Lugar : '+data[i].direccion.substring(0,15)+' ...</p></div>';
            }
            
            content.html(eventos);
            
            hidespinner();
          },
          error : function(){
            //programar funcion de error
          }
        })
       }else{
         if(festival != 0 && festival != ''){
       
           //buscar los eventos del festival en el json
           //alert(festival+' , '+dbLocal.Festivales[i].festival)
           
               var carreteIcons = "";
        var viewPortWidth = window.innerWidth;
            var viewPortHeight = window.innerHeight;
         var croquis = '';
          var icono  = '';
           var eventos = '',
          
          // var carrete = $('#carrete');

           content = $('#eventos'),
           header = $('#EventoHeader'),
           eventosFest = null;
           for(var i = 0; i < dbLocal.Festivales.length; i++){
            //eventos
            
             if(festival == dbLocal.Festivales[i].ID){
             
             if( App.checkConnection())
             {
               
               header.attr('src',dbLocal.Festivales[i].portada);


             }else{
               header.attr('src',"images/slidefijo.jpg");
             }
                            
             
            if(dbLocal.Festivales[i].croquis != null) 
            {

              croquis = dbLocal.Festivales[i].croquis;
                  $('#croquis').html('<img src="images/croquis.png" />');
                            $('#croquis').on('click',function(){
                                     App.load('viewCroquis');
                           
                                     $('#_croquismap').attr('src',croquis);
                                     $('#_croquismap').load(function(){
                                                           //showspinner('Cargando ...');
                                                           $('#_croquismap').smoothZoom({ width: viewPortWidth , height : viewPortHeight , zoom_MAX:300, pan_BUTTONS_SHOW : "NO", button_SIZE: 24, button_ALIGN : "top right", responsive : false});
                                                           //hidespinner();
                                                           });
                                     
                                     });        
              
                } 

               

                for (var j = 0;  j < dbLocal.Festivales[i].iconografia.length; j++ )  
                { 


                    icono += '<div id='+dbLocal.Festivales[i].iconografia[j].ID+' class="item filter" style="height:auto;" > <img src="images/iconografia/'+dbLocal.Festivales[i].iconografia[j].url+'" width="100%"; />  </div>';
             
                }

             
               for(var e = 0; e < dbLocal.Festivales[i].eventos.length; e++){
                 eventosFest = dbLocal.Festivales[i].eventos;     //                         


                    if( dbLocal.Festivales[i].eventos[e].iconoportada != "" )
                            {

                                eventos += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+dbLocal.Festivales[i].eventos[e].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" ><img src="'+dbLocal.Festivales[i].eventos[e].iconoportada+'" width="95" height="100" ></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].eventos[e].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+dbLocal.Festivales[i].eventos[e].direccion+'</td> </tr></table></div>';
                            
                            }else{

                                 
                                eventos += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+dbLocal.Festivales[i].eventos[e].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" > <img src="images/logo.jpg" width="95" height="100" > </td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].eventos[e].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+dbLocal.Festivales[i].eventos[e].direccion+'</td> </tr></table></div>';
                            }
                       } 

             }
           }



         
           
           $('#owl-demo').html(icono);
           content.html(eventos);

            var owl = $("#owl-demo");

      owl.owlCarousel({

      items : 5, //10 items above 1000px browser width
      itemsDesktop : [100,0], //5 items between 1000px and 901px   
      itemsDesktopSmall : [100,0], 
      itemsTablet: [100,0],
      itemsMobile : false 
      
      });


               
           $('#todos').css('background-color','#000000');
           var  filter = '';
           
           //filtro de eventos
           $('.filter').click(function(){
             var filterEvents = "";
             var id = $(this).attr('id'),
             filter =  id;


             $('.filter').css('background-color','#00a7d9');

             
             for(var i = 0; i < eventosFest.length; i++){

                   
 
                       if(filter == eventosFest[i].tipo){


                                    if(eventosFest[i].iconoportada != "") 
                                    {

                                      filterEvents += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+eventosFest[i].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+eventosFest[i].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr>  <td rowspan="3" ><img src="'+eventosFest[i].iconoportada+'" width="95" height="100" ></td>  <td > <strong>Fecha:</strong></td> <td>'+eventosFest[i].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+eventosFest[i].direccion+'</td> </tr></table></div>';
                                   
                                    }else
                                    {

                                      filterEvents += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+eventosFest[i].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+eventosFest[i].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" > <img src="images/logo.jpg" width="95" height="100" > </td>  <td > <strong>Fecha:</strong></td> <td>'+eventosFest[i].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+eventosFest[i].direccion+'</td> </tr></table></div>';

                                    }
                              }

             }





             if(filterEvents == null || filterEvents == ''){
              content.html('<p class="app-input">Sin resultados.</p>');          
             }else{content.html(filterEvents);}
             
             if(filter == 0){  content.html(eventos); }
           });
           
           
           
         }
       }
    },
    viewEvento : function(eventoId,festival){
      //se define festival por si le pican a algun evento de merida fest u olimpo
      if(eventoId != 0 && eventoId != '' && festival != 0 && festival != ''){
                        showspinner('Cargando..','Por favor espere');
                           /*cambiar el header segun el festival que sea
                            *  1 . olimpo
                            *  2. fest
                            *  3. otros
                            */
                           var header = $('#changeHeader'),
                           titulo = $('#titulo'),
                           content = $('#descripcion'),
                           mapa = $('#mapa');
                           var lugar = "";
                           var precio = "";
                           
                           switch(festival){
                            case 1 :
                              header.attr('src','images/header-olimpo.jpg');
                            break;
                            
                            case 2 :
                              header.attr('src','images/header-fest.jpg');
                            break;
                           }

                           
                           /*buscar el evento*/
                         for(var i = 0; i < dbLocal.Festivales.length; i++){
                           if(dbLocal.Festivales[i].ID == festival){
                              
                             for(var e = 0; e < dbLocal.Festivales[i].eventos.length; e++){
                               if(eventoId == dbLocal.Festivales[i].eventos[e].ID){                                          
                                          
                                           if(!App.checkConnection())
                                           {

                                                header.attr('src','images/slidefijo.jpg');
                                           }else{

                                                 header.attr('src',dbLocal.Festivales[i].eventos[e].evtportada);
                                           }
                                            if(dbLocal.Festivales[i].eventos[e].lugar == "")
                                            {

                                                lugar = 'No disponible';

                                            }else{  

                                                 lugar = dbLocal.Festivales[i].eventos[e].lugar;    
                                            }

                                              if(dbLocal.Festivales[i].eventos[e].precio == "")
                                            {

                                                precio = 'No disponible';

                                            }else{  

                                                 precio = dbLocal.Festivales[i].eventos[e].precio;    
                                            }

                                      titulo.html('<strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong>');
                                     content.html('<p><strong>Fecha : </strong> '+dbLocal.Festivales[i].eventos[e].fecha+'<br> <strong>Hora: </strong> '+dbLocal.Festivales[i].eventos[e].hora+'<br> <strong>Lugar: </strong> '+lugar+' <br> <strong>Direcci&oacute;n : </strong> '+dbLocal.Festivales[i].eventos[e].direccion+' <br> <strong>Precio: </strong> '+precio+' </p> <p><strong>Descripci&oacute;n:</strong> <br>'+dbLocal.Festivales[i].eventos[e].desc+'</p>');
                                     //mapa.html(dbLocal.Festivales[i].eventos[e].lat+' / '+dbLocal.Festivales[i].eventos[e].lng);
                               }
                            }          
                             }
                           }

            hidespinner();
      }else{
        

            navigator.notification.alert('Este evento no se puede visualizar.',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    CreardbLocal : function(data){
        var error = false;
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
            function(fileSystem){
                fileSystem.root.getFile('dbCultura.json',{ create : true , exclusive : false},
                    function(fileEntry){
                        fileEntry.createWriter(function(writer){
                            
                            writer.onwriteend= function(){
                                
                            };
                                               
                            writer.write(JSON.stringify(data))
                            error = false;
              
                        },onError);
                    },
               onError);
            },
        onError);
        
        var onError = function(err){
            console.log('Error => '+err.code)
            error = true;
        };
        
        return error;
    },

        CrearVersionLocal : function(data){
        var error = false;
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
            function(fileSystem){
                fileSystem.root.getFile('ifoversion.json',{ create : true , exclusive : false},
                    function(fileEntry){
                        fileEntry.createWriter(function(writer){
                            
                            writer.onwriteend= function(){
                                
                            };
                                               
                            writer.write(JSON.stringify(data))
                            error = false;
                            
                        },onError);
                    },
               onError);
            },
        onError);
        
        var onError = function(err){
            console.log('Error => '+err.code)
            error = true;
        };
        
        return error;
    },
    viewFestivales : function(){
      //listar los festivales (cada uno tiene 10 eventos)
    showspinner('Cargando..','Por favor espere');
       var content = $('#content'),
         festivales = '';
         
         for(var i = 0; i < dbLocal.Festivales.length; i++){
       
          //festivales += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;"> <div style="background-image:url(images/loadmarco.png); background-repeat:no-repeat;" height="40%"> <img src="'+dbLocal.Festivales[i].portada+'" class="left" width="40%"; style="padding-right:5px;"/></div>   <p style="font-weight:bold;">'+dbLocal.Festivales[i].titulo+'<img src="images/mano.png" /></p><p>Fecha : '+dbLocal.Festivales[i].fecha+'</p><div class="clear"></div></div>';
               if(App.checkConnection())
               {
                festivales   += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].titulo+'</strong></td> </tr> <tr class="clear"></tr><tr><td><img src="'+dbLocal.Festivales[i].portada+'" width="100" height="110" /></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].fecha+'</td> </tr></table></div>';
                }else{

                  festivales   += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].titulo+'</strong></td> </tr> <tr class="clear"></tr><tr><td><img src="images/slidefijo.jpg" width="100" height="110" /></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].fecha+'</td> </tr></table></div>';
                }
             }
         
         content.html(festivales);
     hidespinner();
    },
    viewConvocatorias : function(){



      if(App.checkConnection()){
        var content = $('#convocatorias'),
        convocatoria = '';

        
        
        for(var i = 0; i < dbLocal.Convocatorias.length; i++){                

                convocatoria += '<div onclick="App.viewGalconvoca('+dbLocal.Convocatorias[i].idgal+');"  style="width: 33.3%; height:33.3%; float:left; padding:5px;"><img src="'+dbLocal.Convocatorias[i].portada+'" width="100%"/> <i class="fa fa-plus"></i> '+dbLocal.Convocatorias[i].titulo.slice(0,16)+'...</div>';
        
            }
        
         content.html(convocatoria);
       }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las convocatorias.',function(){ App.back()  },'Aviso','Aceptar');
        }
     


    },

    viewGalconvoca: function(idgal){

        App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Convocatorias.length; a++){
        if(idgal == dbLocal.Convocatorias[a].idgal){
          for(var i = 0; i < dbLocal.Convocatorias[a].imagenes.length; i++){
            fotos.push(dbLocal.Convocatorias[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
        

    },
    viewEditorial : function(){
        if(App.checkConnection()){

      var tagEditorial = $('#editorial'),
            editorial = '';


            
            
            for(var i = 0; i < dbLocal.Editorial.length; i++){

               editorial += '<div onclick="App.viewEditorialg('+dbLocal.Editorial[i].idgal+');"  style="width: 33.3%; height:33.3%; float:left; padding:5px;"><img src="'+dbLocal.Editorial[i].portada+'" width="100%"/> <i class="fa fa-plus"></i> '+dbLocal.Editorial[i].titulo.slice(0,16)+'...</div>';
            
            }
            
            tagEditorial.html(editorial);

         }else{
            navigator.notification.alert('Se requiere conexion a internet para ver la galeria.',function(){ App.back()  },'Aviso','Aceptar');
        }

    },
    viewGalerias : function(){
      if(App.checkConnection()){
        var content = $('#galerias'),
        galerias = '';

        
        for(var i = 0; i < dbLocal.Galerias.length; i++){

          
                galerias += '<div onclick="App.viewGaleria('+dbLocal.Galerias[i].idgal+');"  style="width: 33.3%; height:33.3%; float:left; padding:5px;"> <div style="background-image:url(images/loadmarco.png); background-repeat:no-repeat;"> <img src="'+dbLocal.Galerias[i].portada+'" width="100%"/></div> <i class="fa fa-plus"></i> '+dbLocal.Galerias[i].titulo.slice(0,16)+'...</div>';
        
            }
        
        content.html(galerias);
       }else{
            navigator.notification.alert('Se requiere conexion a internet para ver la galeria.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },


     viewEditorialg : function(idgal){
      
      App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Editorial.length; a++){
        if(idgal == dbLocal.Editorial[a].idgal){
          for(var i = 0; i < dbLocal.Editorial[a].imagenes.length; i++){
            fotos.push(dbLocal.Editorial[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
    },

    viewGaleria : function(idgal){
      
      App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Galerias.length; a++){
        if(idgal == dbLocal.Galerias[a].idgal){
          for(var i = 0; i < dbLocal.Galerias[a].imagenes.length; i++){
            fotos.push(dbLocal.Galerias[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
    },
        leerdbLocal : function(){
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
                function(fileSystem){
                 fileSystem.root.getFile('dbCultura.json',{ create  :false },
                      function(fileEntry){
                
                      var reader = new FileReader();
                          reader.onloadend = function(evt){
                          dbLocal = JSON.parse(evt.target.result);
                          
                      };
                           fileEntry.file(function(file){
                                reader.readAsText(file)
                           })
                           
                        },onError);
            },onError);

        var onError = function(err){  navigator.notification.alert('El archivo del librero no se encuentra, conecte el dispositivo a internet para corregirlo.',function(){ hidespinner(); onDeviceReady(); },'Error!','Aceptar'); }
    }

};

function onDeviceReady() {
  

  onLoadSlider();
 

  if(App.checkConnection()){ //validar conexion a internet
    
     var lastupdate = "";
     var update = "";       

  showspinner('Espere', 'Buscando nuevos eventos...')

    $.ajax({
      url : webService+'getVersion',
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

            hidespinner();
            dataVersion = data;
            var verLocal = "";
            var verServer = "";    
            var dbversion = "";

            checkIfFileExists('ifoversion.json');

            if ( statusFile() ) 
            {
              //El archivo existe se procede a realizar la lectura

              window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
                function(fileSystem){
                 fileSystem.root.getFile('ifoversion.json',{ create  :false },
                      function(fileEntry){
                
                      var reader = new FileReader();
                          reader.onloadend = function(evt){
                          dbversion = JSON.parse(evt.target.result);

                            //---Leer la version de la bd
                              for( var id=0;  id< data.Versiones.length; id++) 
                                  {
                                          verServer = data.Versiones[id].actualversion;
                                          verLocal  = dbversion.Versiones[id].actualversion;
                                   }


                                   if ( verServer  > verLocal   ) 
                                   {
                                      hidespinner();
                                      App.ShowToast("Descargando nuevos eventos","short");                                     
                                      updateEventos(dataVersion);

                                   }else if( verServer == verLocal)
                                   {
                                        hidespinner();
                                        App.ShowToast("No se han encontrado nuevos eventos","short");
                                        App.leerdbLocal();
                                        loadAnimation();                   
                                        
                                    }else{

                                        hidespinner();
                                        updateEventos(dataVersion); 

                                    }
                            //--Fin de leido y condiciones


                      };
                           fileEntry.file(function(file){
                                reader.readAsText(file);
                                hidespinner();
                           })
                           
                        },onError);
            },onError);

        var onError = function(err){   

          hidespinner();
          App.leerdbLocal();
          loadAnimation(); 
          //updateEventos(dataVersion); 
        }

            }
            else{


                //--El archivo no existe se crea y se descarga la nueva version de la bd
                  hidespinner();
                  App.ShowToast("Actualizando informacion","short");
                  updateEventos(dataVersion);

            }  


        
      },
      error : function(jqXHR,exception){
            readError(jqXHR,exception);
            
        }
    })
  }else{
    //sin conexion
    hidespinner();
    App.ShowToast("Verifica tu conexion","short");
    App.leerdbLocal();
    loadAnimation();

  }
    
    document.addEventListener('backbutton', function(){ App.back(); }, false);
 


}


function onLoadSlider()
{

   
   if(App.checkConnection()){ //validar conexion a internet

    $.ajax({
      url : webService+'getSlider',
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

        var slide = "";


      if(data == null ){           
        slide = '<div class="item"> <img src="images/slidefijo.jpg" width="100%" /> </div>';}else{ 
        for(var i = 0; i < data.Sliders.length; i++)
                  {    
                 slide += '<div class="item"> <img src="'+data.Sliders[i].imagen+'" width="100%" /> </div>';
                  } 

                 }
      $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);
        

        
      },
      error : function(jqXHR,exception){
            
      slide = '<div> <img src="images/slidefijo.jpg" width="100%" /> </div>';
      $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);

            
        }
    })
  }else{

     slide = '<div> <img src="images/slidefijo.jpg" width="100%" /> </div>'; 
     $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);
    

  }

}




function updateEventos(dataVersion)
{

  if(App.checkConnection()){ //validar conexion a internet
  hidespinner();
  showspinner('Descargando', 'Sincronizando informacion...');

    $.ajax({
      url : webService+'init&hora='+App.geTime(),
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

            App.CreardbLocal(data);
            App.CrearVersionLocal(dataVersion);
            App.leerdbLocal();                                    
            hidespinner();
            loadAnimation();



        
      },
      error : function(jqXHR,exception){
            
            //readError(jqXHR,exception);
            hidespinner();
            App.leerdbLocal();
            App.ShowToast("Error de conexion, intentalo mas tarde","short");    
            loadAnimation();
            
        }
    })
  }else{
    //sin conexion
    hidespinner();
    App.leerdbLocal();
     App.ShowToast("Verifica tu conexion","short");    
    loadAnimation();

  }

}


function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}

function fileExists(fileEntry){
    
  flstatus  = true;
}

function fileDoesNotExist(){

  flstatus = false;
   
}
function getFSFail(evt) {
    
    flstatus = false;
}

function statusFile()
{

  return flstatus;
}

function loadAnimation()
{

    setTimeout(function(){
            $('.fest').transition({ x : '100%' },350,'ease');
        },500)
        setTimeout(function(){
            $('.registro').transition({ x : '100%' },300,'ease');
        },700)
        setTimeout(function(){
            $('.eventos').transition({ x : '100%' },300,'ease');
        },900)
        setTimeout(function(){
            $('.media').transition({ x : '100%' },300,'ease');
        },1100)
        setTimeout(function(){
            $('.social').transition({ x : '100%' },300,'ease');
        },1300);

}

function showspinner(dialog,titulo) {
    window.plugins.waitingDialog.show(dialog,titulo);
}

function hidespinner(){
    window.plugins.waitingDialog.hide();
}


function readError(jqXHR, exception )
{
         if (jqXHR.status === 0) {
                App.ShowToast("Sin conexion. Verifique su conexion a internet!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 
            
            } else if (jqXHR.status == 404) {
            
                App.ShowToast("Servicio no encontrado!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (jqXHR.status == 500) {

                App.ShowToast("Error interno del servidor","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (exception === 'parsererror') {

                App.ShowToast("La informacion no se puede leer.","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (exception === 'timeout') {
                App.ShowToast("Se a agotado el tiempo de espera","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 

            } else if (exception === 'abort') {
                
                App.ShowToast("Conexion abortada!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation();  
                
            } else {

                hidespinner();
                App.leerdbLocal();   
                loadAnimation();  
                navigator.notification.alert('Uncaught Error.\n' + jqXHR.responseText);
            }
 }

document.addEventListener('deviceready',onDeviceReady,false);

//onresume
document.addEventListener('resume',function(){
    
    onDeviceReady();
   
},false);



 /*!
 * Thumbnail helper for fancyBox
 * version: 1.0.1
 * @requires fancyBox v2.0 or later
 *
 * Usage: 
 *     $(".fancybox").fancybox({
 *         thumbs: {
 *             width	: 50,
 *             height	: 50
 *         }
 *     });
 * 
 * Options:
 *     width - thumbnail width
 *     height - thumbnail height
 *     source - function to obtain the URL of the thumbnail image
 * 
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.thumbs = {
		wrap: null,
		list: null,
		width: 0,

		//Default function to obtain the URL of the thumbnail image
		source: function (el) {
			var img = $(el).find('img');

			return img.length ? img.attr('src') : el.href;
		},

		init: function (opts) {
			var that = this,
				list,
				thumbWidth = opts.width || 50,
				thumbHeight = opts.height || 50,
				thumbSource = opts.source || this.source;

			//Build list structure
			list = '';

			for (var n = 0; n < F.group.length; n++) {
				list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:$.fancybox.jumpto(' + n + ');"></a></li>';
			}

			this.wrap = $('<div id="fancybox-thumbs"></div>').appendTo('body');
			this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);

			//Load each thumbnail
			$.each(F.group, function (i) {
				$("<img />").load(function () {
					var width = this.width,
						height = this.height,
						widthRatio, heightRatio, parent;

					if (!that.list || !width || !height) {
						return;
					}

					//Calculate thumbnail width/height and center it
					widthRatio = width / thumbWidth;
					heightRatio = height / thumbHeight;
					parent = that.list.children().eq(i).find('a');

					if (widthRatio >= 1 && heightRatio >= 1) {
						if (widthRatio > heightRatio) {
							width = Math.floor(width / heightRatio);
							height = thumbHeight;

						} else {
							width = thumbWidth;
							height = Math.floor(height / widthRatio);
						}
					}

					$(this).css({
						width: width,
						height: height,
						top: Math.floor(thumbHeight / 2 - height / 2),
						left: Math.floor(thumbWidth / 2 - width / 2)
					});

					parent.width(thumbWidth).height(thumbHeight);

					$(this).hide().appendTo(parent).fadeIn(300);

				}).attr('src', thumbSource(this));
			});

			//Set initial width
			this.width = this.list.children().eq(0).outerWidth();

			this.list.width(this.width * (F.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (F.current.index * this.width + this.width * 0.5)));
		},

		//Center list
		update: function (opts) {
			if (this.list) {
				this.list.stop(true).animate({
					'left': Math.floor($(window).width() * 0.5 - (F.current.index * this.width + this.width * 0.5))
				}, 150);
			}
		},

		beforeLoad: function (opts) {
			//Remove self if gallery do not have at least two items 
			if (F.group.length < 2) {
				F.coming.helpers.thumbs = false;

				return;
			}

			//Increase bottom margin to give space for thumbs
			F.coming.margin[2] = opts.height + 30;
		},

		afterShow: function (opts) {
			//Check if exists and create or update list
			if (this.list) {
				this.update(opts);

			} else {
				this.init(opts);
			}

			//Set active element
			this.list.children().removeClass('active').eq(F.current.index).addClass('active');
		},

		onUpdate: function () {
			this.update();
		},

		beforeClose: function () {
			if (this.wrap) {
				this.wrap.remove();
			}

			this.wrap = null;
			this.list = null;
			this.width = 0;
		}
	}

}(jQuery));

 /*!
 * Buttons helper for fancyBox
 * version: 1.0.1
 * @requires fancyBox v2.0 or later
 *
 * Usage: 
 *     $(".fancybox").fancybox({
 *         buttons: {}
 *     });
 * 
 * Options:
 *     tpl - HTML template
 * 
 */
(function ($) {
	//shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:$.fancybox.prev();">Previous</a></li><li><a class="btnPlay" title="Slideshow" href="javascript:$.fancybox.play();;">Play</a></li><li><a class="btnNext" title="Next" href="javascript:$.fancybox.next();">Next</a></li><li><a class="btnToggle" title="Toggle size" href="javascript:$.fancybox.toggle();">Toggle</a></li><li><a class="btnClose" title="Close" href="javascript:$.fancybox.close();">Close</a></li></ul></div>',
		list: null,
		buttons: {},

		update: function () {
			var toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (F.current.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!F.current.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeShow: function () {
			//Increase top margin to give space for buttons
			F.current.margin[0] += 30;
		},

		onPlayStart: function () {
			if (this.list) {
				this.buttons.play.text('Pause').addClass('btnPlayOn');
			}
		},

		onPlayEnd: function () {
			if (this.list) {
				this.buttons.play.text('Play').removeClass('btnPlayOn');
			}
		},

		afterShow: function (opts) {
			var buttons;
			
			if (!this.list) {
				this.list = $(opts.tpl || this.tpl).appendTo('body');

				this.buttons = {
					prev : this.list.find('.btnPrev'),
					next : this.list.find('.btnNext'),
					play : this.list.find('.btnPlay'),
					toggle : this.list.find('.btnToggle')
				}
			}
			
			buttons = this.buttons;

			//Prev
			if (F.current.index > 0 || F.current.loop) {
				buttons.prev.removeClass('btnDisabled');
			} else {
				buttons.prev.addClass('btnDisabled');
			}

			//Next / Play
			if (F.current.loop || F.current.index < F.group.length - 1) {
				buttons.next.removeClass('btnDisabled');
				buttons.play.removeClass('btnDisabled');

			} else {
				buttons.next.addClass('btnDisabled');
				buttons.play.addClass('btnDisabled');
			}

			this.update();
		},

		onUpdate: function () {
			this.update();
		},

		beforeClose: function () {
			if (this.list) {
				this.list.remove();
			}

			this.list = null;
			this.buttons = {};
		}
	};

}(jQuery));

App._core = function (window, document, Swapper, Dialog, App, utils, Pages) {
	var STACK_KEY                         = '__APP_JS_STACK__' + window.location.pathname,
		DEFAULT_TRANSITION_IOS            = 'slide-left',
		DEFAULT_TRANSITION_ANDROID        = 'implode-out',
		DEFAULT_TRANSITION_ANDROID_OLD    = 'fade-on',
		DEFAULT_TRANSITION_ANDROID_GHETTO = 'instant',
		REVERSE_TRANSITION                = {
			'instant'        : 'instant'        ,
			'fade'           : 'fade'           ,
			'fade-on'        : 'fade-off'       ,
			'fade-off'       : 'fade-on'        ,
			'scale-in'       : 'scale-out'      ,
			'scale-out'      : 'scale-in'       ,
			'rotate-left'    : 'rotate-right'   ,
			'rotate-right'   : 'rotate-left'    ,
			'cube-left'      : 'cube-right'     ,
			'cube-right'     : 'cube-left'      ,
			'swap-left'      : 'swap-right'     ,
			'swap-right'     : 'swap-left'      ,
			'explode-in'     : 'explode-out'    ,
			'explode-out'    : 'explode-in'     ,
			'implode-in'     : 'implode-out'    ,
			'implode-out'    : 'implode-in'     ,
			'slide-left'     : 'slide-right'    ,
			'slide-right'    : 'slide-left'     ,
			'slide-up'       : 'slide-down'     ,
			'slide-down'     : 'slide-up'       ,
			'slideon-left'   : 'slideoff-left'  ,
			'slideon-right'  : 'slideoff-right' ,
			'slideon-up'     : 'slideoff-up'    ,
			'slideon-down'   : 'slideoff-down'  ,
			'slideoff-left'  : 'slideon-left'   ,
			'slideoff-right' : 'slideon-right'  ,
			'slideoff-up'    : 'slideon-up'     ,
			'slideoff-down'  : 'slideon-down'   ,
			'glideon-right'  : 'glideoff-right' ,
			'glideoff-right' : 'slideon-right'  ,
			'glideon-left'   : 'glideoff-left'  ,
			'glideoff-left'  : 'slideon-left'   ,
			'glideon-down'  : 'glideoff-down'   ,
			'glideoff-down' : 'slideon-down'    ,
			'glideon-up'    : 'glideoff-up'     ,
			'glideoff-up'   : 'slideon-up'
		};

	var stack        = [],
		navQueue     = [],
		navLock      = false,
		defaultTransition, reverseTransition,
		current, currentNode;

	if (utils.os.ios) {
		setDefaultTransition(DEFAULT_TRANSITION_IOS);
	}
	else if (utils.os.android) {
		if (utils.os.version >= 4) {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID);
		}
		else if ((utils.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID_GHETTO);
		}
		else {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID_OLD);
		}
	}

	App.current = function () {
		return current;
	};

	App.load = function (pageName, args, options, callback) {
		if (typeof pageName !== 'string') {
			throw TypeError('page name must be a string, got ' + pageName);
		}

		switch (typeof args) {
			case 'function':
				callback = args;
				args     = {};
				options  = {};
				break;

			case 'undefined':
				args = {};
				break;

			case 'string':
				callback = options;
				options  = args;
				args     = {};
				break;

			case 'object':
				break;

			default:
				throw TypeError('page arguments must be an object if defined, got ' + args);
		}

		switch (typeof options) {
			case 'function':
				callback = options;
				options  = {};
				break;

			case 'undefined':
				options = {};
				break;

			case 'string':
				options = { transition : options };
				break;

			case 'object':
				break;

			default:
				throw TypeError('options must be an object if defined, got ' + options);
		}

		switch (typeof callback) {
			case 'undefined':
				callback = function () {};
				break;

			case 'function':
				break;

			default:
				throw TypeError('callback must be a function if defined, got ' + callback);
		}

		return loadPage(pageName, args, options, callback);
	};

	App.back = function (options, callback) {
		switch (typeof options) {
			case 'function':
				callback = options;
				options  = {};
				break;

			case 'undefined':
				options  = {};
				break;

			case 'string':
				options = { transition : options };
				break;

			case 'object':
				break;

			default:
				throw TypeError('options must be an object if defined, got ' + options);
		}

		switch (typeof callback) {
			case 'undefined':
				callback = function () {};
				break;

			case 'function':
				break;

			default:
				throw TypeError('callback must be a function if defined, got ' + callback);
		}

		return navigateBack(options, callback);
	};

	App.setDefaultTransition = function (transition) {
		if (typeof transition === 'object') {
			switch (utils.os.name) {
				case 'android':
					if ((utils.os.version < 4) && transition.androidFallback) {
						transition = transition.androidFallback;
					}
					else {
						transition = transition.android;
					}
					break;

				case 'ios':
					if ((utils.os.version < 5) && transition.iosFallback) {
						transition = transition.iosFallback;
					}
					else {
						transition = transition.ios;
					}
					break;

				default:
					transition = transition.fallback;
					break;
			}

			if ( !transition ) {
				return;
			}
		}

		if (typeof transition !== 'string') {
			throw TypeError('transition must be a string if defined, got ' + transition);
		}

		if ( !(transition in REVERSE_TRANSITION) ) {
			throw TypeError('invalid transition type, got ' + transition);
		}

		setDefaultTransition(transition);
	};

	App.getDefaultTransition = function () {
		return defaultTransition;
	};

	App.getReverseTransition = function () {
		return reverseTransition;
	};

	App.getStack = function () {
		return fetchStack();
	};

	App.getPage = function (index) {
		var stackSize = stack.length - 1;

		switch (typeof index) {
			case 'undefined':
				index = stackSize;
				break;
			case 'number':
				if (Math.abs(index) > stackSize) {
					throw TypeError('absolute index cannot be greater than stack size, got ' + index);
				}
				if (index < 0) {
					index = stackSize + index;
				}
				break;
			default:
				throw TypeError('page index must be a number if defined, got ' + index);
		}
		return fetchPage(index);
	};

	App.removeFromStack = function (startIndex, endIndex) {
		// minus 1 because last item on stack is current page (which is untouchable)
		var stackSize = stack.length - 1;

		switch (typeof startIndex) {
			case 'undefined':
				startIndex = 0;
				break;

			case 'number':
				if (Math.abs(startIndex) > stackSize) {
					throw TypeError('absolute start index cannot be greater than stack size, got ' + startIndex);
				}
				if (startIndex < 0) {
					startIndex = stackSize + startIndex;
				}
				break;

			default:
				throw TypeError('start index must be a number if defined, got ' + startIndex);
		}

		switch (typeof endIndex) {
			case 'undefined':
				endIndex = stackSize;
				break;

			case 'number':
				if (Math.abs(endIndex) > stackSize) {
					throw TypeError('absolute end index cannot be greater than stack size, got ' + endIndex);
				}
				if (endIndex < 0) {
					endIndex = stackSize + endIndex;
				}
				break;

			default:
				throw TypeError('end index must be a number if defined, got ' + endIndex);
		}

		if (startIndex > endIndex) {
			throw TypeError('start index cannot be greater than end index');
		}

		removeFromStack(startIndex, endIndex);
	};

	App.addToStack = function (index, newPages) {
		// minus 1 because last item on stack is current page (which is untouchable)
		var stackSize = stack.length - 1;

		switch (typeof index) {
			case 'undefined':
				index = 0;
				break;

			case 'number':
				if (Math.abs(index) > stackSize) {
					throw TypeError('absolute index cannot be greater than stack size, got ' + index);
				}
				if (index < 0) {
					index = stackSize + index;
				}
				break;

			default:
				throw TypeError('index must be a number if defined, got ' + index);
		}

		if ( !utils.isArray(newPages) ) {
			throw TypeError('added pages must be an array, got ' + newPages);
		}

		newPages = newPages.slice();

		newPages.forEach(function (page, i) {
			if (typeof page === 'string') {
				page = [page, {}];
			}
			else if ( utils.isArray(page) ) {
				page = page.slice();
			}
			else {
				throw TypeError('page description must be an array (page name, arguments), got ' + page);
			}

			if (typeof page[0] !== 'string') {
				throw TypeError('page name must be a string, got ' + page[0]);
			}

			switch (typeof page[1]) {
				case 'undefined':
					page[1] = {};
					break;

				case 'object':
					break;

				default:
					throw TypeError('page arguments must be an object if defined, got ' + page[1]);
			}

			switch (typeof page[2]) {
				case 'undefined':
					page[2] = {};
					break;

				case 'object':
					break;

				default:
					throw TypeError('page options must be an object if defined, got ' + page[2]);
			}

			newPages[i] = page;
		});

		addToStack(index, newPages);
	};

	App.saveStack = function () {
		saveStack();
	};

	App.destroyStack = function () {
		destroyStack();
	};

	App.dialog  = Dialog;
	App.restore = setupRestoreFunction();
	App._layout = setupListeners();

	return {};



	function setDefaultTransition (transition) {
		defaultTransition = transition;
		reverseTransition = REVERSE_TRANSITION[defaultTransition];
	}



	function navigate (handler) {
		if (navLock) {
			navQueue.push(handler);
			return false;
		}

		navLock = true;

		handler(function () {
			navLock = false;
			saveStack();
			processNavigationQueue();
		});

		return true;
	}



	function loadPage (pageName, args, options, callback) {
		navigate(function (unlock) {
			var oldNode     = currentNode,
				pageManager = {},
				page        = Pages.startGeneration(pageName, pageManager, args),
				restoreData = stack[stack.length-1],
				restoreNode = restoreData && restoreData[1];

			populatePageBackButton(page, oldNode || restoreNode);

			if ( !current ) {
				App.restore = null;
				document.body.appendChild(page);
				updatePageData();
				finish();
			}
			else {
				Pages.saveScrollPosition(currentNode);

				var newOptions = {};
				for (var key in options) {
					newOptions[key] = options[key];
				}
				performTransition(page, newOptions, finish);
				//TODO: what if instant swap?
				updatePageData();
			}

			function updatePageData () {
				current     = pageName;
				currentNode = page;
				stack.push([ pageName, page, options, args, pageManager ]);
				if (oldNode) {
					Pages.fire(oldNode, Pages.EVENTS.FORWARD);
				}
			}

			function finish () {
				Pages.saveScrollStyle(oldNode);
				Pages.finishGeneration(pageName, pageManager, page, args);

				unlock();
				callback();

				if (oldNode) {
					Pages.fire(oldNode, Pages.EVENTS.HIDE);
				}
				Pages.fire(page, Pages.EVENTS.SHOW);
			}
		});

		if ( !Pages.has(pageName) ) {
			return false;
		}
	}

	function navigateBack (options, callback) {
		if ( Dialog.status() ) {
			Dialog.close();
			return;
		}

		var stackLength = stack.length;

		var navigatedImmediately = navigate(function (unlock) {
			if (stack.length < 2) {
				unlock();
				return;
			}

			var oldPage    = stack.pop(),
				data       = stack[stack.length - 1],
				pageName   = data[0],
				page       = data[1],
				oldOptions = oldPage[2];

			Pages.fire(oldPage[1], Pages.EVENTS.BACK);

			Pages.fixContent(page);

			Pages.startDestruction(oldPage[0], oldPage[4], oldPage[1], oldPage[3]);

			Pages.restoreScrollPosition(page);

			var newOptions = {};
			for (var key in oldOptions) {
				if (key === 'transition') {
					newOptions[key] = REVERSE_TRANSITION[ oldOptions[key] ] || oldOptions[key];
				}
				else {
					newOptions[key] = oldOptions[key];
				}
			}
			for (var key in options) {
				newOptions[key] = options[key];
			}

			performTransition(page, newOptions, function () {
				Pages.restoreScrollStyle(page);

				Pages.fire(oldPage[1], Pages.EVENTS.HIDE);
				Pages.fire(page, Pages.EVENTS.SHOW);

				setTimeout(function () {
					Pages.finishDestruction(oldPage[0], oldPage[4], oldPage[1], oldPage[3]);

					unlock();
					callback();
				}, 0);
			}, true);

			current     = pageName;
			currentNode = page;
		});

		if (navigatedImmediately && (stackLength < 2)) {
			return false;
		}
	}



	function fetchStack () {
		return stack.slice().map(function (pageData) {
			var pageName = pageData[0],
				pageArgs = {};

			for (var key in pageData[3]) {
				pageArgs[key] = pageData[3][key];
			}

			return [ pageName, pageArgs ];
		});
	}

	function fetchPage (index) {
		var pageData = stack[index];

		if (pageData) {
			return pageData[1];
		}
	}

	// you must manually save the stack if you choose to use this method
	function removeFromStackNow (startIndex, endIndex) {
		var deadPages = stack.splice(startIndex, endIndex - startIndex);

		deadPages.forEach(function (pageData) {
			Pages.startDestruction(pageData[0], pageData[4], pageData[1], pageData[3]);
			Pages.finishDestruction(pageData[0], pageData[4], pageData[1], pageData[3]);
		});
	}

	function removeFromStack (startIndex, endIndex) {
		navigate(function (unlock) {
			removeFromStackNow(startIndex, endIndex);
			unlock();
		});
	}

	// you must manually save the stack if you choose to use this method
	function addToStackNow (index, newPages) {
		var pageDatas = [],
			lastPage;

		newPages.forEach(function (pageData) {
			var pageManager = {},
				page        = Pages.startGeneration(pageData[0], pageManager, pageData[1]);
			populatePageBackButton(page, lastPage);

			Pages.finishGeneration(pageData[0], pageManager, page, pageData[1]);

			Pages.saveScrollPosition(page);
			Pages.saveScrollStyle(page);

			pageDatas.push([pageData[0], page, pageData[2], pageData[1], pageManager]);

			lastPage = page;
		});

		pageDatas.unshift(0);
		pageDatas.unshift(index);
		Array.prototype.splice.apply(stack, pageDatas);
	}

	function addToStack (index, newPages) {
		navigate(function (unlock) {
			addToStackNow(index, newPages);
			unlock();
		});
	}

	function populatePageBackButton (page, oldPage) {
		if ( !oldPage ) {
			return;
		}
		var backButton = page.querySelector('.app-topbar .left.app-button'),
			oldTitle   = oldPage.querySelector('.app-topbar .app-title');
		if (!backButton || !oldTitle) {
			return;
		}
		var oldText = oldTitle.textContent,
			newText = backButton.textContent;
		if (!oldText || newText) {
			return;
		}
		if (oldText.length > 13) {
			oldText = oldText.substr(0, 12) + '..';
		}
		backButton.textContent = oldText;
	}



	function processNavigationQueue () {
		if ( navQueue.length ) {
			navigate( navQueue.shift() );
		}

	}



	// blocks UI interaction during some aysnchronous task
	// is not locked because multiple calls dont effect eachother
	function uiBlockedTask (task) {
		var taskComplete = false;

		var clickBlocker = document.createElement('div');
		clickBlocker.className = 'app-clickblocker';
		document.body.appendChild(clickBlocker);
		clickBlocker.addEventListener('touchstart', function (e) {
			e.preventDefault();
		}, false);

		task(function () {
			if (taskComplete) {
				return;
			}
			taskComplete = true;

			document.body.removeChild(clickBlocker);
		});
	}



	function shouldUseNativeIOSTransition (options) {
		if ( !utils.os.ios ) {
			return false;
		}

		if (options.transition === 'slide-left') {
			return true;
		}
		else if (options.transition === 'slide-right') {
			return true;
		}
		else {
			return false;
		}
	}

	function performTransition (page, options, callback, reverse) {
		if ( !options.transition ) {
			options.transition = (reverse ? reverseTransition : defaultTransition);
		}

		uiBlockedTask(function (unblockUI) {
			if ( shouldUseNativeIOSTransition(options) ) {
				performNativeIOSTransition(page, options, cleanup);
			}
			else if (options.transition === 'instant') {
				Swapper(currentNode, page, options, function () {
					setTimeout(cleanup, 0);
				});
			}
			else {
				Swapper(currentNode, page, options, cleanup);
			}

			function cleanup () {
				Pages.fixContent(currentNode);
				unblockUI();
				callback();
			}
		});
	}

	function performNativeIOSTransition (page, options, callback) {
		var oldPage        = currentNode,
			currentBar     = oldPage.querySelector('.app-topbar'),
			currentBack    = oldPage.querySelector('.app-topbar .left.app-button'),
			currentContent = oldPage.querySelector('.app-content'),
			newBar         = page.querySelector('.app-topbar'),
			newBack        = page.querySelector('.app-topbar .left.app-button'),
			newContent     = page.querySelector('.app-content'),
			currentTitle, newTitle;

		if (currentBar) {
			currentTitle = currentBar.querySelector('.app-title');
		}
		if (newBar) {
			newTitle = newBar.querySelector('.app-title');
		}

		if (!currentBar || !newBar || !currentContent || !newContent || !isVisible(currentBar) || !isVisible(newBar)) {
			// proper iOS transition not possible, fallback to normal
			Swapper(oldPage, page, options, callback);
			return;
		}

		var slideLeft   = (options.transition === 'slide-left'),
			transitions = [{
				opacityEnd : 0 ,
				elem       : currentBar
			}, {
				transitionStart : 'translate3d(0,0,0)' ,
				transitionEnd   : 'translate3d('+(slideLeft?-100:100)+'%,0,0)' ,
				elem            : currentContent
			}, {
				transitionStart : 'translate3d('+(slideLeft?100:-100)+'%,0,0)' ,
				transitionEnd   : 'translate3d(0,0,0)' ,
				elem            : newContent
			}];

		if (currentBack && currentBack.getAttribute('data-noslide')) {
			currentBack = undefined;
		}
		if (newBack && newBack.getAttribute('data-noslide')) {
			newBack = undefined;
		}

		if (currentTitle) {
			transitions.push({
				opacityStart    : 1 ,
				opacityEnd      : 0 ,
				transitionStart : 'translate3d(0,0,0)' ,
				transitionEnd   : 'translate3d('+getTitleTransform(newBack, slideLeft)+'px,0,0)' ,
				elem            : currentTitle
			});
		}
		if (newTitle) {
			transitions.push({
				opacityStart    : 0 ,
				opacityEnd      : 1 ,
				transitionStart : 'translate3d('+getTitleTransform(currentBack, !slideLeft)+'px,0,0)' ,
				transitionEnd   : 'translate3d(0,0,0)' ,
				elem            : newTitle
			});
		}

		if (utils.os.version >= 5) {
			if (currentBack) {
				transitions.push({
					transitionStart : 'translate3d(0,0,0)' ,
					transitionEnd   : 'translate3d('+getBackTransform(currentBack, newBack, !slideLeft)+'px,0,0)' ,
					elem            : currentBack
				});
			}
			if (newBack) {
				transitions.push({
					transitionStart : 'translate3d('+getBackTransform(newBack, currentBack, slideLeft)+'px,0,0)' ,
					transitionEnd   : 'translate3d(0,0,0)' ,
					elem            : newBack
				});
			}
		}

		var oldPosition = page.style.position;
		page.style.position = 'fixed';
		oldPage.parentNode.insertBefore(page, oldPage);
		oldPage.style.background = 'none';

		utils.animate(transitions, 300, 'ease-in-out', function () {
			oldPage.parentNode.removeChild(oldPage);
			page.style.position = oldPosition;

			callback();
		});
	}

	function getBackTransform (backButton, oldButton, toCenter) {
		var fullWidth = backButton.textContent.length * 10,
			oldWidth  = oldButton ? (oldButton.textContent.length*15) : 0;

		if ( !toCenter ) {
			return (oldWidth-window.innerWidth) / 2;
		}
		else {
			return (window.innerWidth-fullWidth) / 2;
		}
	}

	function getTitleTransform (backButton, toLeft) {
		var fullWidth = 0;
		if (backButton && (utils.os.version >= 5)) {
			fullWidth = backButton.textContent.length * 10;
		}

		if ( !toLeft ) {
			return (window.innerWidth / 2);
		}
		else {
			return (fullWidth-window.innerWidth) / 2;
		}
	}

	function isVisible (elem) {
		var styles = utils.getStyles(elem);
		return (styles.display !== 'none' && styles.opacity !== '0');
	}



	function setupListeners () {
		function fixContentHeight () {
			if (currentNode) {
				Pages.fixContent(currentNode);
			}
		}
		function fixSizing () {
			fixContentHeight();
			if (currentNode) {
				Pages.fire(currentNode, Pages.EVENTS.LAYOUT);
			}
		}
		function triggerSizeFix () {
			fixSizing();

			//TODO: can we remove this yet? it would increase performance
			// In an ideal world we wouldnt have to do this.
			// Android client lies about its dimensions after
			// events on occasion.
			setTimeout(fixContentHeight, 0);
			setTimeout(fixContentHeight, 10);
			setTimeout(fixContentHeight, 100);
		}

		window.addEventListener('orientationchange', triggerSizeFix);
		window.addEventListener('resize'           , triggerSizeFix);
		window.addEventListener('load'             , triggerSizeFix);
		setTimeout(triggerSizeFix, 0);

		window.addEventListener('online', function () {
			stack.forEach(function (pageInfo) {
				Pages.fire(pageInfo[1], Pages.EVENTS.ONLINE);
			});
		}, false);
		window.addEventListener('offline', function () {
			stack.forEach(function (pageInfo) {
				Pages.fire(pageInfo[1], Pages.EVENTS.OFFLINE);
			});
		}, false);

		return triggerSizeFix;
	}



	function saveStack () {
		try {
			var storedStack = stack.map(function (pageData) {
				return [ pageData[0], pageData[3], pageData[2] ];
			});

			localStorage[STACK_KEY] = JSON.stringify(storedStack);
		}
		catch (err) {}
	}

	function destroyStack () {
		delete localStorage[STACK_KEY];
	}

	function setupRestoreFunction () {
		var storedStack, lastPage;

		try {
			storedStack = JSON.parse( localStorage[STACK_KEY] );
			lastPage    = storedStack.pop();
		}
		catch (err) {
			return;
		}

		return function (callback) {
			switch (typeof callback) {
				case 'undefined':
					callback = function () {};
				case 'function':
					break;

				default:
					throw TypeError('restore callback must be a function if defined, got ' + callback);
			}

			if ( !Pages.has(lastPage[0]) ) {
				throw TypeError(lastPage[0] + ' is not a known page');
			}

			storedStack.forEach(function (pageData) {
				if ( !Pages.has(pageData[0]) ) {
					throw TypeError(pageData[0] + ' is not a known page');
				}
			});

			try {
				addToStackNow(0, storedStack);
			}
			catch (err) {
				removeFromStackNow(0, stack.length);
				throw Error('failed to restore stack');
			}

			saveStack();

			try {
				loadPage(lastPage[0], lastPage[1], lastPage[2], callback);
			}
			catch (err) {
				removeFromStackNow(0, stack.length);
				throw Error('failed to restore stack');
			}
		};
	}
}(window, document, Swapper, Dialog, App, App._utils, App._Pages);


var PhotoViewer = (function (Zepto, jQuery, App) {
	var loaderImg = [
		"data:image/gif;base64,",
		"R0lGODlhEAAQAPIAAAAAAP///zw8PLy8vP///5ycnHx8fGxsbCH+GkNyZWF0ZWQgd2l0aCBhamF4",
		"bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklr",
		"E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAA",
		"EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk",
		"KhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9",
		"HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum",
		"CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzII",
		"unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAF",
		"ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ",
		"ibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG",
		"xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce",
		"CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==",
	].join('');

	var defaultLoadingElm = (function () {
		var elm = document.createElement('div');
		var s = elm.style;
		s.width = '100%';
		s.height = '100%';
		s.background = 'url(' + loaderImg + ') no-repeat center center';
		return elm;
	}());

	var defaultOpts = {
		// Automatically update the page title as the user swipes through
		// photos?
		automaticTitles: true,
		// Hide the titlebar automatically, using whichever gestures are
		// recognized on the device's native photo viewer.
		autoHideTitle: true,
		// An element used as a placeholder while photos are loading.
		// A duplicate is made each time it is used.
		loadingElm: defaultLoadingElm,
		// Photo index to start at.
		startAt: 0,
	};

	return PhotoViewer;

	// PhotoViewer takes over the content pane of your app screen.
	// It wraps SlideViewer for the common case of simply displaying
	// a set of photos in the content of your app.
	function PhotoViewer(page, urls, opts) {
		var self = this;
		var slideviewer;
		var eventBus = new EventBus();
		var content = page.querySelector('.app-content');
		content.setAttribute("data-no-scroll", "true");
		content.style.overflow = 'visible';
		var topbar = page.querySelector('.app-topbar');
		var title = page.querySelector('.app-title');

		var topbarVisible = true;
		var wrapper = document.createElement('div');
		wrapper.style.width = '100%';
		wrapper.style.height = '100%';

		self.on = eventBus.on;
		self.off = eventBus.off;

		function validateArgs() {
			if (!page) throw TypeError("Page argument required!");
			if (!urls) throw TypeError("You gave me an empty list of urls, I can't do anything with that!");
			if (!Array.isArray(urls)) {
				throw TypeError("PhotoViewer setSource expects an array of photo URLs for a source, '" + newSource + "' given.");
			}
			opts = opts || {};
			for (var o in defaultOpts) {
				opts[o] = opts[o] === undefined ? defaultOpts[o] : opts[o];
			}
		}
		validateArgs();

		// Force 3d acceleration of the loading image to avoid flickers
		// on iOS.
		opts.loadingElm.style.webkitBackfaceVisibility = 'hidden';
		replaceChildren(content, opts.loadingElm);

		if (opts.autoHideTitle) {
			Clickable(wrapper);
			wrapper.addEventListener('click', toggleTitleBar, false);
		}

		updateTitle(opts.startAt, urls.length);

		page.addEventListener('appShow', appShow, false);
		page.addEventListener('appLayout', appLayout, false);
		page.addEventListener('appBack', appBack, false);
		var appShown = false;
		function appShow () {
			appShown = true;
		}
		afterDOMLoad(function () {
			if (appShown) {
				afterAppShow();
			} else {
				page.removeEventListener('appShow', appShow, false);
				page.addEventListener('appShow', afterAppShow, false);
			}
		});

		return;

		function appLayout() {
			if (!slideviewer) return;
			slideviewer.refreshSize();
			slideviewer.eachMaster(function (elm) {
				var wrap = elm.querySelector('div');
				var img = elm.querySelector('img');
				if (wrap && img) {
					centerImage(wrap, img);
				}
			});
		}

		function appBack() {
			page.removeEventListener('appShow', appShow, false);
			page.removeEventListener('appShow', afterAppShow, false);
			page.removeEventListener('appLayout', appLayout, false);
			page.removeEventListener('appBack', appBack, false);
			if (!slideviewer) return;

			if (App.platform === 'android') {
				// Android cannot have any 3d!
				slideviewer.disable3d();
				var elm = slideviewer.curMaster();
				var img = elm.querySelector('img');
				img.style.webkitBackfaceVisibility = '';

				// This clips the image under the titlebar, but is the only
				// way we can seem to avoid flicker when removing 3d from
				// the slideviewer.
				content.style.overflow = 'hidden';
			}
			slideviewer.eachMaster(function (elm, page) {
				if (page !== slideviewer.page()) {
					elm.style.visibility = 'hidden';
				}
			});
		}


		function toggleTitleBar() {
			if (topbarVisible) showTitleBar();
			else hideTitleBar();
		}

		function showTitleBar() {
			if (App.platform == 'ios') {
				topbar.style.opacity = '1';
				topbar.style.pointerEvents = '';
			} else {
				setTransform(topbar, '');
			}
			topbarVisible = false;
		}

		function hideTitleBar() {
			if (App.platform == 'ios') {
				topbar.style.opacity = '0';
				topbar.style.pointerEvents = 'none';
			} else {
				setTransform(topbar, 'translate3d(0, -100%, 0)');
			}
			topbarVisible = true;
		}

		function updateTitle(i, len) {
			if (opts.automaticTitles) {
				title.innerText = (i + 1) + " de " + len;
			}
		}

		function afterAppShow() {
			if (App.platform == 'ios') {
				setTransition(topbar, 'opacity 0.5s ease-in-out 200ms');
			} else {
				setTransition(topbar, 'transform 0.5s ease-in-out 200ms');
			}

			// We don't want to have the slideview in the page when we
			// are transitioning in, as having a 3d transform within a
			// 3d transform makes things really laggy. Hence, we wait
			// until after the app is shown to add the "real" slideview
			// to the page.
			replaceChildren(content, wrapper);

			slideviewer = new PhotoViewer._SlideViewer(wrapper, source, {
				allowScroll: false,
				length: urls.length,
				startAt: opts.startAt,
				bufferDist: 50,
			});
			slideviewer.on('flip', onFlip);
			onFlip(opts.startAt, slideviewer.curMaster());

			if (App.platform == 'ios') {
				slideviewer.on('move', hideTitleBar);
			}

			function source(i) {
				var wrap = document.createElement('div')
				var ws = wrap.style;
				ws.position = 'absolute';
				ws.top = '0px';
				ws.left = '0px';
				ws.width = '100%';
				ws.height = '100%';
				ws.overflow = 'hidden';
				// Android 4.2 occasionally leaves behind artifacts if
				// the wrapper has a transparent background.
				ws.background = 'black';

				var loading = opts.loadingElm.cloneNode(true /* deep copy */);
				wrap.appendChild(loading);

				var img = document.createElement('img');
				img.src = urls[i];

				// Hack to get rid of flickering on images (iPhone bug) by
				// forcing hardware acceleration. See
				// http://stackoverflow.com/questions/3461441/prevent-flicker-on-webkit-transition-of-webkit-transform
				img.style.webkitBackfaceVisibility = 'hidden';

				// For desktop browsers
				img.style.webkitUserSelect = 'none';
				img.style.webkitUserDrag = 'none';

				img.style.margin = '0 auto';
				img.style.display = 'none';

				img.onload = function () {
					centerImage(wrap, img);
					img.style.display = 'block';
					wrap.removeChild(loading);
				};
				wrap.appendChild(img);
				return wrap;
			}

			var zoomable;
			function onFlip(page, elm) {
				updateTitle(page, urls.length);

				if (PhotoViewer._Zoomable.deviceSupported) {
					var wrap = elm.querySelector('div');
					var img = elm.querySelector('img');

					if (zoomable) zoomable.reset().destroy();
					zoomable = new PhotoViewer._Zoomable(wrap, img, slideviewer);
				}

				eventBus.fire('flip', page);
			}
		}

		function centerImage(wrap, img) {
			// I shouldn't really have to do this, but offsetHeight and friends
			// seem to be failing sparadically. Oh well, we can do this manually!
			var h = img.naturalHeight;
			var w = img.naturalWidth;
			var r = h / w;
			var ch = opts.autoHideTitle ? window.innerHeight : content.offsetHeight;
			var cw = content.offsetWidth;

			if (h > ch) {
				h = ch;
				w = h / r;
			}

			if (w > cw) {
				w = cw;
				h = w * r;
			}

			var oh = opts.autoHideTitle ? topbar.offsetHeight : 0;
			var marginTop = round(Math.max((ch - h) / 2, 0));

			var is = img.style;
			is.marginTop = marginTop + 'px';
			is.width = w + 'px';
			is.height = h + 'px';

			var ws = wrap.style;
			ws.width = cw + 'px';
			ws.height = ch + 'px';
			ws.top = -oh + 'px';
		}
	}

	// http://github.com/crazy2be/EventBus.js
	function EventBus() {
		var self = this;
		var callbacks = {};
		self.callbacks = callbacks;

		// remove modifies the list which it is passed,
		// removing all occurances of val.
		function remove(list, val) {
			for (var i = 0; i < list.length; i++) {
				if (list[i] === val) {
					list.splice(i, 1);
				}
			}
		}

		// Register a callback for the specified event. If the
		// callback is already registered for the event, it is
		// not added again.
		self.on = function (ev, cb) {
			var list = callbacks[ev] || [];
			remove(list, cb);
			list.push(cb);
			callbacks[ev] = list;
			return self;
		}

		// Remove a callback for the specified event. If the callback
		// has not been registered, it does not do anything. If the
		// second argument is undefined, it removes all handlers for
		// the specified event.
		self.off = function (ev, cb) {
			if (cb === undefined) {
				delete callbacks[ev];
				return self;
			}
			var list = callbacks[ev];
			if (!list) return self;
			remove(list, cb);
			return self;
		}

		// Fire an event, passing each registered handler all of
		// the specified arguments. Within the handler, this is
		// set to null.
		self.fire = function (ev, arg1, arg2/*, ...*/) {
			var list = callbacks[ev];
			if (!list) return;
			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0; i < list.length; i++) {
				list[i].apply(null, args);
			}
			return self;
		}
	}

	function round(num, places) {
		if (places === undefined) places = 0;

		var factor = Math.pow(10, places);
		return Math.round(num * factor) / factor;
	}

	function afterDOMLoad(func) {
		if (window.cards && window.cards.ready) {
			cards.ready(func);
		} else {
			setTimeout(func, 10);
		}
	}

	function forEach(arr, func) {
		for (var i = 0; i < arr.length; i++) {
			func(arr[i], i);
		}
	}

	// Removes all children of node, then adds
	// newChild as a child.
	function replaceChildren(node, newChild) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
		node.appendChild(newChild);
	}

	function setTransition(elm, val) {
		elm.style.transition = val;
		elm.style.webkitTransition = '-webkit-' + val;
	}

	function setTransform(elm, val) {
		elm.style.transform = val;
		elm.style.webkitTransform = val;
	}
}(window.Zepto, window.jQuery, App));


App._metrics = function (window, App) {
	var analyticsEnabled = false;

	App.enableGoogleAnalytics = function () {
		enableGoogleAnalytics();
	};

	return {
		watchPage : watchPage
	};



	function enableGoogleAnalytics () {
		analyticsEnabled = true;
	}

	function addPageView (pageName, pageID) {
		if ( !analyticsEnabled ) {
			return;
		}

		var pathname = '/' + pageName;
		if (typeof pageID !== 'undefined') {
			pathname += '/' + pageID;
		}

		if (typeof window.ga === 'function') {
			window.ga('send', 'pageview', pathname);
			return;
		}

		if ( !window._gaq ) {
			window._gaq = [];
		}
		if (typeof window._gaq.push === 'function') {
			window._gaq.push([
				'_trackPageview' ,
				pathname
			]);
		}
	}

	function watchPage (page, pageName, pageArgs) {
		var data;

		if ((typeof pageArgs === 'object') && (typeof pageArgs.id !== 'undefined')) {
			data = pageArgs.id + '';
		}

		page.addEventListener('appShow', function () {
			addPageView(pageName, data);
		}, false);
	}
}(window, App);


PhotoViewer._SlideViewer = (function (Zepto, jQuery) {
	var defaultOpts = {
		// Should we allow scrolling in scrollable
		// regions inside or outside of the slideviewer?
		// If set to true, we will ignore all gestures
		// which start off moving more in the y
		// direction than in the x direction.
		allowScroll: true,
		// If your source function is bounded by some
		// known limit, you can set it here.
		length: 10,
		// If you want to start somewhere other than
		// on the first slide, setting this (rather
		// than calling .setPage()) will prevent your
		// source function being called more times
		// than necessary.
		startAt: 0,
		// How far from the point of initial contact does the user
		// have to move their fingers before we interpret their
		// action?
		bufferDist: 10,
		// What should we show to the user when the generator threw
		// an error or returned an invalid output? You can override
		// this when shipping your application, so that in the event
		// something does go wrong in your code, you can show a
		// friendlier error page.
		errorGenerator: defaultErrorGenerator,
	}

	// Wrapper is an element which will contain the slideviewer. It should
	// have an explict height (and width, if not display: block) set.
	// Source is a generator function. Given a page index, it should
	// return an element to use as the slide for that page index.
	function SlideViewer(wrapper, source, opts) {
		var self = this;
		var slider;
		var masters = [];
		var activeMaster = 0;
		var xPos = 0;
		var minX = 0;
		var snapThreshold = 0;
		var pageWidth = 0;
		var inputhandler = new InputHandler();

		function validateArgs() {
			if (!isElement(wrapper)) {
				throw TypeError("SlideViewer first argument should be a DOM node which wraps the slider. Got " + wrapper);
			}
			if (typeof source !== 'function') {
				throw TypeError("SlideViewer second argument should be a generator function!");
			}

			opts = opts || {};
			for (var opt in defaultOpts) {
				if (opts[opt] === undefined) {
					opts[opt] = defaultOpts[opt];
				}
			}
		}
		validateArgs();

		var len = opts.length;
		var page = opts.startAt;

		function init() {
			wrapper.style.postition = 'relative';
			wrapper.innerHTML = '';

			slider = document.createElement('div');
			var s = slider.style;
			s.position = 'relative';
			s.top = '0';
			s.height = '100%';
			s.width = '100%';
			s[prefixStyle('transitionTimingFunction')] = 'ease-out';
			wrapper.appendChild(slider);

			for (var i = -1; i < 2; i++) {
				var page = document.createElement('div');
				var s = page.style;
				s.position = 'absolute';
				s.top = '0';
				s.height = '100%';
				s.width = '100%';
				s.left = i * 100 + '%';

				slider.appendChild(page);
				masters.push({elm: page});
			}

			inputhandler.attach(wrapper, slider);
			inputhandler.on('start', onStart);
			inputhandler.on('resize', self.refreshSize);
			eventBus.on('destroy', function () {
				inputhandler.detach();
			});

			self.refreshSize();
			self.setPage(opts.startAt);
		}

		var eventBus = new EventBus();
		self.on = eventBus.on;
		self.off = eventBus.off;

		self.refreshSize = function () {
			pageWidth = wrapper.clientWidth;
			minX = (1 - len) * pageWidth;
			snapThreshold = Math.round(pageWidth * 0.15);
			setTransitionDuration(0);
			setPos(-page * pageWidth);
			return self;
		}

		self.setLen = function (n) {
			len = n;
			self.refreshSize();
			return self;
		}

		self.page = function () {
			return page;
		}

		var prevPage = -1;
		self.setPage = function (newPage) {
			if (typeof newPage !== 'number') {
				throw TypeError("SlideViewer.setPage() requires a number! ('" + newPage + "' given)");
			}
			function positionMasters(a, b, c) {
				var m = masters;
				var sa = m[a].elm.style;
				var sb = m[b].elm.style;
				var sc = m[c].elm.style;

				sa.left = (page - 1) * 100 + '%';
				if (page === 0) sa.visibility = 'hidden';
				else sa.visibility = 'visible';

				sb.left = page * 100 + '%';
				sb.visibility = 'visible';

				sc.left = (page + 1) * 100 + '%';
				if (page === len - 1) sc.visibility = 'hidden';
				else sc.visibility = 'visible';

				m[a].newPage = page - 1;
				m[b].newPage = page;
				m[c].newPage = page + 1;
			}
			page = clamp(newPage, 0, len - 1);
			setTransitionDuration(0);
			setPos(-page * pageWidth);

			activeMaster = mod(page + 1, 3);

			if (activeMaster === 0) {
				positionMasters(2, 0, 1);
			} else if (activeMaster == 1) {
				positionMasters(0, 1, 2);
			} else {
				positionMasters(1, 2, 0);
			}

			for (var i = 0; i < 3; i++) {
				var m = masters[i];
				if (m.newPage == m.page) continue;

				m.elm.innerHTML = '';
				if (m.newPage >= 0 && m.newPage < opts.length) {
					m.elm.appendChild(getElement(m.newPage));
				}

				m.page = m.newPage;
			}

			if (prevPage !== newPage) {
				eventBus.fire('flip', newPage, masters[activeMaster].elm);
				prevPage = newPage;
			}

			return self;
		}

		self.curMaster = function () {
			for (var i = 0; i < 3; i++) {
				if (masters[i].page == page) return masters[i].elm;
			}
			throw Error("No master is displaying our current page. This is a bug! Current page: " + i + ", masters: " + JSON.serialize(masters));
		}

		self.eachMaster = function (cb) {
			for (var i = 0; i < 3; i++) {
				cb(masters[i].elm, masters[i].page);
			}
		}

		self.invalidate = function () {
			for (var i = 0; i < 3; i++) masters[i].page = -1;
			self.setPage(page);
			return self;
		}

		self.destroy = function () {
			eventBus.fire('destroy');
			return self;
		}

		self.disable = function () {
			inputhandler.disableTouch();
		}

		self.enable = function () {
			inputhandler.enableTouch();
		}

		// Are we actually moving the slideviewer in response
		// to a user's touch currently? Useful for determining
		// what component should handle a touch interaction.
		self.moving = function () {
			return directionLocked;
		}

		// Although this typically makes things slower, it can
		// reduce the occurance of rare bugs, especially bugs
		// relating to the manipulation of the slideviewer
		// element (such as fading it in and out).
		var use3dAcceleration = true;
		self.disable3d = function () {
			use3dAcceleration = false;
			setPos(xPos);
		}

		// Note that 3d is enabled by default. This should only be used in
		// conjuction with the disable3d() method above.
		self.enable3d = function () {
			use3dAcceleration = true;
			setPos(xPos);
		}

		function setPos(x, cb) {
// 			console.log("setting position to ", x);
			var unchanged = x === xPos;
			var transform = prefixStyle('transform');
			xPos = x;
			// translateZ(0) does not affect our appearance, but hints to the
			// renderer that it should hardware accelerate us, and thus makes
			// things much faster and smoother (usually). For reference, see:
			//     http://www.html5rocks.com/en/tutorials/speed/html5/
			if (use3dAcceleration) {
				slider.style[transform] = 'translateX(' + x + 'px) translateZ(0)';
				slider.style.left = '';
			} else {
				slider.style[transform] = '';
				slider.style.left = x + 'px';
			}

			if (cb) {
				if (unchanged || !supportsTransitions) {
					// We don't get a transitionEnd event if
					// 1) The animated property is unchanged, or
					// 2) The browser doesn't support transitions (duh)
					cb();
				} else {
					inputhandler.on('transitionEnd', cb);
				}
			}
		}

		function setTransitionDuration(t, cb) {
			slider.style[prefixStyle('transitionDuration')] = t + 'ms';
		}

		var startedMoving = false;
		var directionLocked = false;
		function onStart(point) {
			inputhandler.off('start');
			inputhandler.on('end', onEndNoMove);

			var startX = point.pageX;
			var startY = point.pageY;
			var prevX = startX;
			var prevY = startY;
			startedMoving = false;
			directionLocked = false;

			setTransitionDuration(0);
			inputhandler.on('move', onMove);

			function onMove(e, point) {
				var dx = point.pageX - prevX;
				prevX = point.pageX;
				prevY = point.pageY;

				var absX = Math.abs(prevX - startX);
				var absY = Math.abs(prevY - startY);

				// We take a buffer to figure out if the swipe
				// was most likely intended for our consumption.
				// (and not just the start of a zoom operation
				// or other gesture).
				if (!startedMoving && absX < opts.bufferDist && absY < opts.bufferDist) {
					return;
				}
				startedMoving = true;

				// We are scrolling vertically, so skip SlideViewer and give the control back to the browser
				if (absY > absX && !directionLocked && opts.allowScroll) {
					inputhandler.off('move');
					inputhandler.off('end');
					inputhandler.on('start', onStart);
					return;
				}
				directionLocked = true;

				var newX = xPos + dx;
				if (newX > 0 || newX < minX) {
					newX = xPos + (dx / 2);
				}

				e.preventDefault();
				inputhandler.off('end').on('end', onEnd);
				setPos(newX);
				eventBus.fire('move', newX);
			}

			function onEnd(point) {
				inputhandler.off('move');
				inputhandler.off('end');

				prevX = point.pageX;
				var deltaX = prevX - startX;
				var dist = Math.abs(deltaX);
				var newX;

				if (xPos > 0 || xPos < minX) dist *= 0.15;

				if (dist < snapThreshold) {
					var time = Math.floor(300 * dist / snapThreshold);
					setTransitionDuration(time);

					newX = -page * pageWidth;
					setPos(newX, onTransitionEnd);
					return;
				}

				if (deltaX > 0) {
					page = Math.floor(-xPos / pageWidth);
				} else {
					page = Math.ceil(-xPos / pageWidth);
				}

				newX = -page * pageWidth;

				var time = Math.floor(200 * Math.abs(xPos - newX) / pageWidth);
				setTransitionDuration(time);

				setPos(newX, onTransitionEnd);
			}

			function onEndNoMove() {
				inputhandler.off('move');
				inputhandler.off('end');
				inputhandler.on('start', onStart);
			}

			function onTransitionEnd() {
				inputhandler.off('transitionEnd');
				self.setPage(page);
				inputhandler.on('start', onStart);
			}
		}

		function getElement(i) {
			var element;
			try {
				element = source(i);
			} catch (e) {
				var err = Error("Exception returned from source() function with input " + i + ". Message: " + e.message);
				err.original = e;
				return opts.errorGenerator(err);
			}

			// In case they return us a zepto or jQuery
			// object rather than a raw DOM node
			if (!isElement(element) && element.length) {
				element = element[0];
			}

			if (!isElement(element)) {
				var err = TypeError("Invalid type returned from source() function. Got type " + typeof element + " (with value " + element + "), expected HTMLElement. Input was " + i);
				return opts.errorGenerator(err);
			}

			return element;
		}

		init();
	};

	SlideViewer.needsPreventDefaultHack = (function () {
		var match = /\bAndroid (\d+(\.\d+)?)/.exec(navigator.userAgent);
		if (!match) return false;

		var version = parseFloat(match[1]);
		if (version >= 4.1) return false;

		return true;
	}());

	function defaultErrorGenerator(err) {
		if (window.console && console.error) {
			if (err.original) {
				console.error(err.original);
				console.log(err.original.stack);
			} else {
				console.error(err);
				console.log(err.stack);
			}
		}
		var elm = document.createElement('p');
		elm.innerHTML = "There was an error creating this page! Contact the developer for more information." +
			"<br><br>" + err.message + "<br><br>" +
			"If you are the developer, this means you made a mistake in your source() function. If you want to ensure users never see this page, you can override opts.errorGenerator to generate a more user-friendly error page.";
		return elm;
	}

	function InputHandler() {
		var self = this;
		var hasTouch = 'ontouchstart' in window;
		var transitionEndMapping = {
			''			: 'transitionend',
			'webkit'	: 'webkitTransitionEnd',
			'Moz'		: 'transitionend',
			'O'			: 'oTransitionEnd',
			'ms'		: 'MSTransitionEnd'
		};

		var transitionEndEvent = transitionEndMapping[vendor];
		var resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
		var startEvent  = hasTouch ? 'touchstart'  : 'mousedown';
		var moveEvent   = hasTouch ? 'touchmove'   : 'mousemove';
		var endEvent    = hasTouch ? 'touchend'    : 'mouseup';
		var cancelEvent = hasTouch ? 'touchcancel' : 'mouseout';

		var lastTouch;
		var touchDisabled = false;

		function findTouch(touches, touchID) {
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].identifier == touchID) return touches[i];
			}
			return null;
		}

		function handleEvent(e) {
			var t = e.type;
			if (t == resizeEvent) {
				eventBus.fire('resize', e);
				return;
			} else if (t == transitionEndEvent) {
				eventBus.fire('transitionEnd', e);
				return;
			}

			if ((t === startEvent || t === moveEvent) && SlideViewer.needsPreventDefaultHack) {
				// Kills native scrolling, but lets our slider work properly.
				// See http://code.google.com/p/android/issues/detail?id=19827
				// and http://code.google.com/p/android/issues/detail?id=5491
				e.preventDefault();
			}

			if (touchDisabled) {
				if (hasTouch && t == startEvent) {
					lastTouch = e.changedTouches[0];
				}
				return;
			}

			var touchID = lastTouch ? lastTouch.identifier : '';
			if (t == startEvent) {
				if (hasTouch) {
					if (lastTouch) return;
				   lastTouch = e.changedTouches[0];
				}
				eventBus.fire('start', hasTouch ? e.changedTouches[0] : e);
			} else if (t == moveEvent) {
				if (!hasTouch) {
					eventBus.fire('move', e, e);
					return
				}

				var touch = findTouch(e.touches, touchID);
				lastTouch = touch;
				eventBus.fire('move', e, touch);
			} else if (t == cancelEvent || t == endEvent) {
				if (!hasTouch) {
					eventBus.fire('end', e);
					return;
				}

				if (!lastTouch) return;

				var touch = findTouch(e.changedTouches, touchID);
				if (!touch) touch = findTouch(e.touches, touchID);

				eventBus.fire('end', touch);
				lastTouch = null;
			}
		}

		var eventBus = new EventBus();
		self.on = eventBus.on;
		self.off = eventBus.off;

		var wrapper;
		var slider;
		self.attach = function (newWrapper, newSlider) {
			if (wrapper || slider) self.detach();
			wrapper = newWrapper;
			slider = newSlider;

			window.addEventListener(resizeEvent, handleEvent, false);
			slider.addEventListener(transitionEndEvent, handleEvent, false);

			wrapper.addEventListener(startEvent , handleEvent, false);
			wrapper.addEventListener(moveEvent  , handleEvent, false);
			wrapper.addEventListener(endEvent   , handleEvent, false);
			wrapper.addEventListener(cancelEvent, handleEvent, false);

			return self;
		}

		self.detach = function () {
			window.removeEventListener(resizeEvent, handleEvent, false);
			slider.removeEventListener(transitionEndEvent, handleEvent, false);

			wrapper.removeEventListener(startEvent , handleEvent, false);
			wrapper.removeEventListener(moveEvent  , handleEvent, false);
			wrapper.removeEventListener(endEvent   , handleEvent, false);
			wrapper.removeEventListener(cancelEvent, handleEvent, false);

			return self;
		}

		// If a touch is currently happening, simulates touchcancel.
		// Prevents further touch events from being processed.
		self.disableTouch = function () {
			if (lastTouch) {
				eventBus.fire('end', lastTouch);
				lastTouch = null;
			}
			touchDisabled = true;
		}

		// Simulates a touchstart if a touch is currently in progress.
		// Otherwise, enables the processing of future touches.
		self.enableTouch = function () {
			if (lastTouch) {
				eventBus.fire('start', lastTouch);
			}
			touchDisabled = false;
		}
	}

	// http://github.com/crazy2be/EventBus.js
	function EventBus() {
		var self = this;
		var callbacks = {};
		self.callbacks = callbacks;

		// remove modifies the list which it is passed,
		// removing all occurances of val.
		function remove(list, val) {
			for (var i = 0; i < list.length; i++) {
				if (list[i] === val) {
					list.splice(i, 1);
				}
			}
		}

		// Register a callback for the specified event. If the
		// callback is already registered for the event, it is
		// not added again.
		self.on = function (ev, cb) {
			var list = callbacks[ev] || [];
			remove(list, cb);
			list.push(cb);
			callbacks[ev] = list;
			return self;
		}

		// Remove a callback for the specified event. If the callback
		// has not been registered, it does not do anything. If the
		// second argument is undefined, it removes all handlers for
		// the specified event.
		self.off = function (ev, cb) {
			if (cb === undefined) {
				delete callbacks[ev];
				return self;
			}
			var list = callbacks[ev];
			if (!list) return self;
			remove(list, cb);
			return self;
		}

		// Fire an event, passing each registered handler all of
		// the specified arguments. Within the handler, this is
		// set to null.
		self.fire = function (ev, arg1, arg2/*, ...*/) {
			var list = callbacks[ev];
			if (!list) return;
			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0; i < list.length; i++) {
				list[i].apply(null, args);
			}
			return self;
		}
	}

	var supportsTransitions = false;
	var vendor = (function () {
		var dummyStyle = document.createElement('div').style;
		var vendors = 'webkitT,MozT,msT,OT,t'.split(',');

		for (var i = 0; i < vendors.length; i++) {
			var transform  = vendors[i] + 'ransform';
			var transition = vendors[i] + 'ransition';
			if (transition in dummyStyle) {
				supportsTransitions = true;
			}
			if (transform in dummyStyle) {
				return vendors[i].substr(0, vendors[i].length - 1);
			}
		}

		return false;
	})();

	function prefixStyle(style) {
		if (vendor === '') return style;
		style = style.charAt(0).toUpperCase() + style.substr(1);
		return vendor + style;
	}

	// Mod in javascript is messed up for negative numbers.
	function mod(a, b) {
		return ((a % b) + b) % b;
	}

	function clamp(n, min, max) {
		return Math.max(min, Math.min(max, n));
	}

	function isElement(o) {
		if (typeof HTMLElement === "object") {
			return o instanceof HTMLElement
		} else {
			return o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
		}
	}

	return SlideViewer;
}(window.Zepto, window.jQuery));


App._Pages = function (window, document, Clickable, Scrollable, App, utils, metrics) {
	var PAGE_NAME  = 'data-page',
		PAGE_CLASS = 'app-page',
		APP_LOADED = 'app-loaded',
		EVENTS = {
			SHOW    : 'appShow'    ,
			HIDE    : 'appHide'    ,
			BACK    : 'appBack'    ,
			FORWARD : 'appForward' ,
			LAYOUT  : 'appLayout'  ,
			ONLINE  : 'appOnline'  ,
			OFFLINE : 'appOffline'
		};

	var preloaded       = false,
		hasCustomEvents = null,
		customEvents    = null,
		forceIScroll    = !!window['APP_FORCE_ISCROLL'],
		pages           = {},
		populators      = [],
		unpopulators    = [];


	App.add = function (pageName, page) {
		if (typeof pageName !== 'string') {
			page     = pageName;
			pageName = undefined;
		}

		if ( !utils.isNode(page) ) {
			throw TypeError('page template node must be a DOM node, got ' + page);
		}

		addPage(page, pageName);
	};

	App.populator = function (pageName, populator, unpopulator) {
		if (typeof pageName !== 'string') {
			throw TypeError('page name must be a string, got ' + pageName);
		}

		if (typeof populator !== 'function') {
			throw TypeError('page populator must be a function, got ' + populator);
		}

		switch (typeof unpopulator) {
			case 'undefined':
				unpopulator = function () {};
				break;

			case 'function':
				break;

			default:
				throw TypeError('page unpopulator must be a function, got ' + unpopulator);
		}

		if (populator) {
			addPopulator(pageName, populator);
		}
		if (unpopulator) {
			addUnpopulator(pageName, unpopulator);
		}
	};

	App.generate = function (pageName, args) {
		if (typeof pageName !== 'string') {
			throw TypeError('page name must be a string, got ' + pageName);
		}

		switch (typeof args) {
			case 'undefined':
				args = {};
				break;

			case 'object':
				break;

			default:
				throw TypeError('page arguments must be an object if defined, got ' + args);
		}

		return generatePage(pageName, args);
	};

	App.destroy = function (page) {
		if ( !utils.isNode(page) ) {
			throw TypeError('page node must be a DOM node, got ' + page);
		}

		return destroyPage(page);
	};


	return {
		EVENTS                : EVENTS                    ,
		fire                  : firePageEvent             ,
		has                   : hasPage                   ,
		startGeneration       : startPageGeneration       ,
		finishGeneration      : finishPageGeneration      ,
		startDestruction      : startPageDestruction      ,
		finishDestruction     : finishPageDestruction     ,
		fixContent            : fixContentHeight          ,
		saveScrollPosition    : savePageScrollPosition    ,
		saveScrollStyle       : savePageScrollStyle       ,
		restoreScrollPosition : restorePageScrollPosition ,
		restoreScrollStyle    : restorePageScrollStyle
	};



	/* Page elements */

	function preloadPages () {
		if (preloaded) {
			return;
		}
		preloaded = true;

		var pageNodes = document.getElementsByClassName(PAGE_CLASS);

		for (var i=pageNodes.length; i--;) {
			addPage( pageNodes[i] );
		}

		document.body.className += ' ' + APP_LOADED;
	}

	function addPage (page, pageName) {
		if ( !pageName ) {
			pageName = page.getAttribute(PAGE_NAME);
		}

		if ( !pageName ) {
			throw TypeError('page name was not specified');
		}

		page.setAttribute(PAGE_NAME, pageName);
		if (page.parentNode) {
			page.parentNode.removeChild(page);
		}
		pages[pageName] = page.cloneNode(true);
	}

	function hasPage (pageName) {
		preloadPages();
		return (pageName in pages);
	}

	function clonePage (pageName) {
		if ( !hasPage(pageName) ) {
			throw TypeError(pageName + ' is not a known page');
		}
		return pages[pageName].cloneNode(true);
	}



	/* Page populators */

	function addPopulator (pageName, populator) {
		if ( !populators[pageName] ) {
			populators[pageName] = [ populator ];
		}
		else {
			populators[pageName].push(populator);
		}
	}

	function addUnpopulator (pageName, unpopulator) {
		if ( !unpopulators[pageName] ) {
			unpopulators[pageName] = [ unpopulator ];
		}
		else {
			unpopulators[pageName].push(unpopulator);
		}
	}

	function populatePage (pageName, pageManager, page, args) {
		var pagePopulators = populators[pageName] || [];
		pagePopulators.forEach(function (populator) {
			populator.call(pageManager, page, args);
		});
	}

	function unpopulatePage (pageName, pageManager, page, args) {
		var pageUnpopulators = unpopulators[pageName] || [];
		pageUnpopulators.forEach(function (unpopulator) {
			unpopulator.call(pageManager, page, args);
		});
	}



	/* Page generation */

	function generatePage (pageName, args) {
		var pageManager = {},
			page        = startPageGeneration(pageName, pageManager, args);

		finishPageGeneration(pageName, pageManager, page, args);

		return page;
	}

	function destroyPage (page) {
		var pageName = page.getAttribute(PAGE_NAME);
		startPageDestruction(pageName, {}, page, {});
		finishPageDestruction(pageName, {}, page, {});
	}

	function startPageGeneration (pageName, pageManager, args) {
		var page = clonePage(pageName);

		insureCustomEventing(page);

		metrics.watchPage(page, pageName, args);

		fixContentHeight(page);

		utils.forEach(
			page.querySelectorAll('.app-button'),
			function (button) {
				Clickable(button);

				var target = button.getAttribute('data-target'),
					back   = button.getAttribute('data-back');

				if (back) {
					Clickable.sticky(button, function (callback) {
						//TODO: make this nicer
						return App.back({}, callback);
					});
				}
				else if (target) {
					Clickable.sticky(button, function (callback) {
						//TODO: make this nicer
						return App.load(target, {}, {}, callback);
					});
				}
			}
		);

		populatePage(pageName, pageManager, page, args);

		firePageEvent(page, EVENTS.LAYOUT);

		page.addEventListener('DOMNodeInsertedIntoDocument', function () {
			fixPageTitle(page);
			firePageEvent(page, EVENTS.LAYOUT);
		}, false);

		return page;
	}

	function finishPageGeneration (pageName, pageManager, page, args) {
		setupScrollers(page);
	}

	function startPageDestruction (pageName, pageManager, page, args) {
		if (!utils.os.ios || utils.os.version < 6) {
			disableScrolling(page);
		}
	}

	function finishPageDestruction (pageName, pageManager, page, args) {
		unpopulatePage(pageName, pageManager, page, args);
	}



	/* Page layout */

	function fixContentHeight (page) {
		var topbar  = page.querySelector('.app-topbar'),
			content = page.querySelector('.app-content');

		if ( !content ) {
			return;
		}

		var height = window.innerHeight;

		if ( !topbar ) {
			content.style.height = height + 'px';
			return;
		}

		var topbarStyles = document.defaultView.getComputedStyle(topbar, null),
			topbarHeight = utils.os.android ? 48 : 44;

		if (topbarStyles.height) {
			topbarHeight = parseInt(topbarStyles.height) || 0;
		}

		content.style.height = (height - topbarHeight) + 'px';
	}

	function fixPageTitle (page) {
		var topbar = page.querySelector('.app-topbar');

		if ( !topbar ) {
			return;
		}

		var title = topbar.querySelector('.app-title');

		if (!title || !title.getAttribute('data-autosize') ) {
			return;
		}

		var margin      = 0,
			leftButton  = topbar.querySelector('.left.app-button'),
			rightButton = topbar.querySelector('.right.app-button');

		if (leftButton) {
			var leftStyles = utils.getStyles(leftButton),
				leftPos    = utils.getTotalWidth(leftStyles) + parseInt(leftStyles.left || 0) + 4;
			margin = Math.max(margin, leftPos);
		}

		if (rightButton) {
			var rightStyles = utils.getStyles(rightButton),
				rightPos    = utils.getTotalWidth(rightStyles) + parseInt(rightStyles.right || 0) + 4;
			margin = Math.max(margin, rightPos);
		}

		title.style.width = (window.innerWidth-margin*2) + 'px';
	}



	/* Page scrolling */

	function setupScrollers (page) {
		utils.forEach(
			page.querySelectorAll('.app-content'),
			function (content) {
				if ( !content.getAttribute('data-no-scroll') ) {
					setupScroller(content);
				}
			}
		);

		utils.forEach(
			page.querySelectorAll('[data-scrollable]'),
			function (content) {
				setupScroller(content);
			}
		);
	}

	function setupScroller (content) {
		Scrollable(content, forceIScroll);
		content.className += ' app-scrollable';
		if (!forceIScroll && utils.os.ios && utils.os.version < 6) {
			content.className += ' app-scrollhack';
		}
	}

	function disableScrolling (page) {
		utils.forEach(
			page.querySelectorAll('*'),
			function (elem) {
				elem.style['-webkit-overflow-scrolling'] = '';
			}
		);
	}

	function getScrollableElems (page) {
		var elems = [];

		if (page) {
			utils.forEach(
				page.querySelectorAll('.app-scrollable'),
				function (elem) {
					if (elem._scrollable) {
						elems.push(elem);
					}
				}
			);
		}

		return elems;
	}

	function savePageScrollPosition (page) {
		utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollTop = elem._scrollTop();
				elem.setAttribute('data-last-scroll', scrollTop+'');
			}
		);
	}

	function savePageScrollStyle (page) {
		utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollStyle = elem.style['-webkit-overflow-scrolling'] || '';
				elem.style['-webkit-overflow-scrolling'] = '';
				elem.setAttribute('data-scroll-style', scrollStyle);
			}
		);
	}

	function restorePageScrollPosition (page, noTimeout) {
		utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollTop = parseInt( elem.getAttribute('data-last-scroll') );

				if (scrollTop) {
					if ( !noTimeout ) {
						setTimeout(function () {
							elem._scrollTop(scrollTop);
						}, 0);
					}
					else {
						elem._scrollTop(scrollTop);
					}
				}
			}
		);
	}

	function restorePageScrollStyle (page) {
		utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollStyle = elem.getAttribute('data-scroll-style') || '';

				if (scrollStyle) {
					elem.style['-webkit-overflow-scrolling'] = scrollStyle;
				}

			}
		);

		restorePageScrollPosition(page, true);
	}



	/* Page eventing */

	function supportsCustomEventing () {
		if (hasCustomEvents === null) {
			try {
				var elem = document.createElement('div'),
					evt  = document.createEvent('CustomEvent');
				evt.initEvent('fooBarFace', false, true);
				elem.dispatchEvent(evt);
				hasCustomEvents = true;
			}
			catch (err) {
				hasCustomEvents = false;
			}
		}

		return hasCustomEvents;
	}

	function getCustomEvents () {
		if ( !customEvents ) {
			customEvents = [];
			for (var eventKey in EVENTS) {
				customEvents.push( EVENTS[eventKey] );
			}
		}

		return customEvents;
	}

	function insureCustomEventing (page) {
		if (page._brokenEvents || supportsCustomEventing()) {
			return;
		}

		page._brokenEvents = true;
		page._addEventListener    = page.addEventListener;
		page._removeEventListener = page.removeEventListener;

		var listeners = {},
			names     = getCustomEvents();

		names.forEach(function (name) {
			listeners[name] = [];
		});

		page.addEventListener = function (name, listener) {
			if (names.indexOf(name) === -1) {
				page._addEventListener.apply(this, arguments);
				return;
			}

			var eventListeners = listeners[name];

			if (eventListeners.indexOf(listener) === -1) {
				eventListeners.push(listener);
			}
		};

		page.removeEventListener = function (name, listener) {
			if (names.indexOf(name) === -1) {
				page._removeEventListener.apply(this, arguments);
				return;
			}

			var eventListeners = listeners[name],
				index          = eventListeners.indexOf(listener);

			if (index !== -1) {
				eventListeners.splice(index, 1);
			}
		};

		page._trigger = function (name) {
			if (names.indexOf(name) === -1) {
				return;
			}

			listeners[name].forEach(function (listener) {
				setTimeout(function () {
					listener.call(page, {});
				}, 0);
			});
		};
	}

	function firePageEvent (page, eventName) {
		if (page._brokenEvents) {
			page._trigger(eventName);
			return;
		}

		var event = document.createEvent('CustomEvent');
		event.initEvent(eventName, false, true);
		page.dispatchEvent(event);
	}
}(window, document, Clickable, Scrollable, App, App._utils, App._metrics);


// Zoomable lets you make things zoom!
// Give it a viewport - used to listen for touch events,
// and an element to zoom, and it will do the rest.
//
// You can also give it a parent widget if you want to have them
// contend for touch events and not conflict (at least, not too
// badly). Photoviewer uses this to mediate touches
// between zoomable and slideviewer.
PhotoViewer._Zoomable = function Zoomable(viewport, element, parent) {
	if (viewport === undefined) {
		throw TypeError("Zoomable requires a viewport element as it's first argument!");
	}
	if (element === undefined) {
		throw TypeError("Zoomable requires a element to zoom as it's second argument!");
	}
	if (parent === undefined) {
		parent = {
			enable: function () {},
			disable: function () {},
			moving: function () {
				return false;
			},
		};
	}

	var self = this;
	var prevTouchEnd = 0;
	var x, y, scale;

	self.reset = function () {
		x = 0;
		y = 0;
		scale = 1;
		prevTouchEnd = 0;
		setTransform(0);
		return self;
	}

	self.destroy = function () {
		touchy.stop();
		return self;
	}

	var touchy = PhotoViewer._Touchy(viewport, {
		one: one,
		two: two,
	});

	self.reset();


	function one(hand, finger) {
		var prevX = finger.lastPoint.x;
		var prevY = finger.lastPoint.y;

		var maxX = findMaxX();
		if (Math.abs(x) >= maxX) {
			parent.enable();
		}
		boundXandY();

		finger.on('move', function (point) {
			prevTouchEnd = 0;
			if (scale <= 1) return;

			var dx = (point.x - prevX) / scale;
			var dy = (point.y - prevY) / scale;
			x += dx;
			y += dy;

			prevX = point.x;
			prevY = point.y;

			var maxX = findMaxX();
			if (Math.abs(x) <= maxX) {
				parent.disable();
			} else if (parent.moving()) {
				return;
			}

			setTransform(0);
		});

		finger.on('end', function (point) {
			if (parent.moving()) {
				boundXandY()
				setTransform(300);
				return;
			}

			var t = Date.now();
			var diff = t - prevTouchEnd;
			if (diff > 200) {
				prevTouchEnd = t;

				boundXandY();
				setTransform(500);
				return;
			}

			// Tap to zoom behaviour
			if (scale <= 1) {
				scale = 2;
				var ic = sc2ic(finger.lastPoint);
				x = ic.x;
				y = ic.y;
				boundXandY();
				setTransform(500);
			} else {
				scale = 1;
				x = 0;
				y = 0;
				setTransform(500);
			}
			prevTouchEnd = 0;
			return;
		});
	}

	function two(hand, finger1, finger2) {
		prevTouchEnd = 0;
		if (parent.moving()) return;
		parent.disable();

		var p1 = finger1.lastPoint;
		var p2 = finger2.lastPoint;

		var prevDist = dist(p1, p2);
		var startCenter = sc2ic(center(p1, p2));

		hand.on('move', function (points) {
			var p1 = finger1.lastPoint;
			var p2 = finger2.lastPoint;
			var newDist = dist(p1, p2);
			scale *= newDist / prevDist;
			prevDist = newDist;

			// We try and keep the same center, in
			// image coordinates, for the pinch
			// as the user had when they started.
			// This allows two finger panning, and a
			// pleasent "zooms to your fingers"
			// feeling.
			var newCenter = sc2ic(center(p1, p2));
			x += startCenter.x - newCenter.x;
			y += startCenter.y - newCenter.y;

			setTransform(0);
		});

		hand.on('end', function () {
			var minZoom = 1;
			var maxZoom = 4;
			if (scale <= 1) {
				parent.enable();
			}
			if (scale < minZoom) {
				scale = minZoom;
				x = 0;
				y = 0;
			}
			if (scale > maxZoom) {
				scale = maxZoom;
			}
			boundXandY();
			setTransform(300);
		});
	}

	function dist(p1, p2) {
		return Math.sqrt(
			Math.pow(p1.x - p2.x, 2) +
			Math.pow(p1.y - p2.y, 2)
		);
	}
	function center(p1, p2) {
		return {
			x: (p1.x + p2.x) / 2,
			y: (p1.y + p2.y) / 2,
		};
	}
	function setTransform(t) {
		var r = function (num, places) {
			var multiplier = Math.pow(10, places);
			return Math.round(num * multiplier) / multiplier;
		};
		var tx = r(x * scale, 2);
		var ty = r(y * scale, 2);
		var ts = r(scale, 2);

		var tr = 'translateX(' + tx + 'px) ' +
		'translateY(' + ty + 'px) ' +
		'scale(' + ts + ',' + ts + ')';
		var tp = t === 0 ? 'none' : 'all';
		var td = r(t, 0) + 'ms';

		var s = element.style;
		s.webkitTransitionProperty = tp;
		s.webkitTransitionDuration = td;
		s.webkitTransform = tr;
	}
	function viewHalfX() {
		return viewport.offsetWidth / 2;
	}
	function viewHalfY() {
		return viewport.offsetHeight / 2;
	}
	function findMaxX() {
		var maxX = element.offsetWidth / 2 - viewHalfX() / scale;
		if (maxX < 0) return 0;
		else return maxX;
	}
	function findMaxY() {
		var maxY = element.offsetHeight / 2 - viewHalfY() / scale;
		if (maxY < 0) return 0;
		else return maxY;
	}
	function boundXandY() {
		var maxX = findMaxX();
		if (Math.abs(x) > maxX) {
			x = x > 0 ? maxX : -maxX;
		}
		var maxY = findMaxY();
		if (Math.abs(y) > maxY) {
			y = y > 0 ? maxY : -maxY;
		}
	}
	// Converts an abitrary point in screen
	// coordinates to the corresponding point
	// in image coordinates, given the transforms
	// and scaling currently in place.
	//
	//    screen coordinates        image coordinates
	//      +--------(+viewW)            (+maxY)
	//      |                               |
	//      |                   (+maxX)-----+------(-maxX)
	//      |                               |
	//    (+viewH)                       (-maxY)
	//
	// Notice X and Y are flipped, and the origin
	// has moved from the top-left corner to the
	// center.
	function sc2ic(sc) {
		return {
			x: x + (viewHalfX() - sc.x) / scale,
			y: y + (viewHalfY() - sc.y) / scale,
		}
	}
};

PhotoViewer._Zoomable.deviceSupported = (function () {
	var match = /\bAndroid (\d+(\.\d+)?)/.exec(navigator.userAgent);
	if (!match) return true;

	var version = parseFloat(match[1]);
	if (version > 3.0) return true;

	return false;
}());


App._utils = function (window, document, App) {
	var query = function (queryString) {
		var re           = /([^&=]+)=([^&]+)/g,
			decodedSpace = /\+/g;

		var result = {},
			m, key, value;

		if (queryString) {
			queryString = queryString.replace(decodedSpace, '%20');

			while ((m = re.exec(queryString))) {
				key   = decodeURIComponent( m[1] );
				value = decodeURIComponent( m[2] );
				result[ key ] = value;
			}
		}

		return result;
	}( window.location.href.split('?')[1] );

	var os = function (userAgent) {
		var faked = false,
			name, version, match;

		if (query['_app_platform'] === 'android') {
			faked   = true;
			name    = 'android';
			version = '4.2';
		}
		else if (query['_app_platform'] === 'ios') {
			faked   = true;
			name    = 'ios';
			version = '6.0';
		}
		else if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(userAgent)) {
			name    = 'ios';
			version = match[1].replace('_', '.');
		}
		else if (match = /\bAndroid (\d+(\.\d+)?)/.exec(userAgent)) {
			name    = 'android';
			version = match[1];
		}

		var data = {
			faked         : faked   ,
			name          : name    ,
			versionString : version ,
			version       : version && parseFloat(version)
		};

		data[ name ] = true;

		if (data.ios) {
			document.body.className += ' app-ios';
		}
		else if (data.android) {
			document.body.className += ' app-android';
		}
		if (data.faked || (!data.ios && !data.android)) {
			document.body.className += ' app-no-scrollbar';
		}

		return data;
	}(navigator.userAgent);

	var forEach = function (forEach) {
		if (forEach) {
			return function (arr, callback, self) {
				return forEach.call(arr, callback, self);
			};
		}
		else {
			return function (arr, callback, self) {
				for (var i=0, len=arr.length; i<len; i++) {
					if (i in arr) {
						callback.call(self, arr[i], i, arr);
					}
				}
			};
		}
	}(Array.prototype.forEach);

	function isArray (arr) {
		if (Array.isArray) {
			return Array.isArray(arr);
		}
		else {
			return Object.prototype.toString.call(arr) !== '[object Array]';
		}
	}

	function isNode (elem) {
		if ( !elem ) {
			return false;
		}

		try {
			return (elem instanceof Node) || (elem instanceof HTMLElement);
		} catch (err) {}

		if (typeof elem !== 'object') {
			return false;
		}

		if (typeof elem.nodeType !== 'number') {
			return false;
		}

		if (typeof elem.nodeName !== 'string') {
			return false;
		}

		return true;
	}

	function setTransform (elem, transform) {
		elem.style['-webkit-transform'] = transform;
		elem.style[   '-moz-transform'] = transform;
		elem.style[    '-ms-transform'] = transform;
		elem.style[     '-o-transform'] = transform;
		elem.style[        'transform'] = transform;
	}

	function setTransition (elem, transition) {
		if (transition) {
			elem.style['-webkit-transition'] = '-webkit-'+transition;
			elem.style[   '-moz-transition'] =    '-moz-'+transition;
			elem.style[    '-ms-transition'] =     '-ms-'+transition;
			elem.style[     '-o-transition'] =      '-o-'+transition;
			elem.style[        'transition'] =            transition;
		}
		else {
			elem.style['-webkit-transition'] = '';
			elem.style[   '-moz-transition'] = '';
			elem.style[    '-ms-transition'] = '';
			elem.style[     '-o-transition'] = '';
			elem.style[        'transition'] = '';
		}
	}

	function getStyles (elem, notComputed) {
		var styles;

		if (notComputed) {
			styles = elem.style;
		}
		else {
			styles = document.defaultView.getComputedStyle(elem, null);
		}

		return {
			display          : styles.display          ,
			opacity          : styles.opacity          ,
			paddingRight     : styles.paddingRight     ,
			paddingLeft      : styles.paddingLeft      ,
			marginRight      : styles.marginRight      ,
			marginLeft       : styles.marginLeft       ,
			borderRightWidth : styles.borderRightWidth ,
			borderLeftWidth  : styles.borderLeftWidth  ,
			top              : styles.top              ,
			left             : styles.left             ,
			height           : styles.height           ,
			width            : styles.width            ,
			position         : styles.position
		};
	}

	function getTotalWidth (styles) {
		var width = 0;
		width += parseInt(styles.width            || 0);
		width += parseInt(styles.paddingLeft      || 0);
		width += parseInt(styles.paddingRight     || 0);
		width += parseInt(styles.borderLeftWidth  || 0);
		width += parseInt(styles.borderRightWidth || 0);
		width += parseInt(styles.marginLeft       || 0);
		width += parseInt(styles.marginRight      || 0);
		return width;
	}

	// this is tuned for use with the iOS transition
	// be careful if using this elsewhere
	function transitionElems (transitions, timeout, easing, callback) {
		if (typeof transitions.length !== 'number') {
			transitions = [ transitions ];
		}

		var opacities = transitions.map(function (transition) {
			return transition.elem.style.opacity;
		});

		setInitialStyles(function () {
			animateElems(function () {
				restoreStyles(function () {
					callback();
				});
			});
		});

		function setInitialStyles (callback) {
			transitions.forEach(function (transition) {
				if (typeof transition.transitionStart !== 'undefined') {
					setTransform(transition.elem, transition.transitionStart);
				}
				if (typeof transition.opacityStart !== 'undefined') {
					transition.elem.style.opacity = transition.opacityStart + '';
				}
			});

			setTimeout(function () {
				var transitionString = 'transform '+(timeout/1000)+'s ease-in-out, opacity '+(timeout/1000)+'s ease-in-out';
				transitions.forEach(function (transition) {
					setTransition(transition.elem, transitionString);
				});

				setTimeout(callback, 0);
			}, 0);
		}

		function animateElems (callback) {
			transitions.forEach(function (transition) {
				if (typeof transition.transitionEnd !== 'undefined') {
					setTransform(transition.elem, transition.transitionEnd);
				}
				if (typeof transition.opacityEnd !== 'undefined') {
					transition.elem.style.opacity = transition.opacityEnd + '';
				}
			});

			transitions.forEach(function (transition) {
				transition.elem.addEventListener('webkitTransitionEnd' , transitionFinished , false);
				transition.elem.addEventListener('transitionend'       , transitionFinished , false);
				transition.elem.addEventListener('oTransitionEnd'      , transitionFinished , false);
				transition.elem.addEventListener('otransitionend'      , transitionFinished , false);
				transition.elem.addEventListener('MSTransitionEnd'     , transitionFinished , false);
				transition.elem.addEventListener('transitionend'       , transitionFinished , false);
			});

			var done = false;

			function isTransitionElem (elem) {
				for (var i=0, l=transitions.length; i<l; i++) {
					if (elem === transitions[i].elem) {
						return true;
					}
				}
				return false;
			}

			function transitionFinished (e) {
				if (done || !isTransitionElem(e.target)) {
					return;
				}
				done = true;

				transitions.forEach(function (transition) {
					transition.elem.removeEventListener('webkitTransitionEnd' , transitionFinished);
					transition.elem.removeEventListener('transitionend'       , transitionFinished);
					transition.elem.removeEventListener('oTransitionEnd'      , transitionFinished);
					transition.elem.removeEventListener('otransitionend'      , transitionFinished);
					transition.elem.removeEventListener('MSTransitionEnd'     , transitionFinished);
					transition.elem.removeEventListener('transitionend'       , transitionFinished);
				});

				callback();
			}
		}

		function restoreStyles (callback) {
			transitions.forEach(function (transition) {
				setTransition(transition.elem, '');
			});

			setTimeout(function () {
				transitions.forEach(function (transition, i) {
					setTransform(transition.elem, '');
					transition.elem.style.opacity = opacities[i];
				});

				callback();
			}, 0);
		}
	}



	App.platform        = os.name;
	App.platformVersion = os.version;

	return {
		query         : query         ,
		os            : os            ,
		forEach       : forEach       ,
		isArray       : isArray       ,
		isNode        : isNode        ,
		setTransform  : setTransform  ,
		setTransition : setTransition ,
		animate       : transitionElems ,
		getStyles     : getStyles     ,
		getTotalWidth : getTotalWidth
	};
}(window, document, App);


var webService = "http://culturamerida.info/Ctrlculturacontrol.php?method=";
var eventos = null;

var festivales = null;
var noticias = null;
var galerias = null;
var fecha = null;
var calendardata = null;  
var eventID = null;
var telefono = null;
var eventCalendar = null;
var token = null;
var dbLocal = null;
var dbversion = null;
var _versionserver = null;
var _versionLocal = null;


var App = {
	
	getPopup : function(){
	
	  $.ajax({
      url : webService+'getEncuestas&token='+device.uuid,
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){
	  $(".fancybox").fancybox();
	  $("a#inline").fancybox({ 'hideOnContentClick': true }); 	
	
		if( data.encuestas.length > 0)
		{ 	 
			for( var l=0; l<data.encuestas.length; l++)
				{
					var navegar = '<div> <h4> <center> <strong> ¡Tenemos una encuesta para ti! </strong></center></h4>  <h5><center>'+data.encuestas[l].titulo+'</center></h5> <br> <table width = "100%"><tr><td> <div class="btnpop"   onclick="window.open(\''+data.encuestas[l].url+'\',\'_blank\', \'location=yes\')">Responder</div>  </td> <td> <div class="btnpop" onclick="App.nvaMostrar('+data.encuestas[l].ID+')">No mostrar</div> </td></tr></table></div>'  

				}
    		 $('#msgcontenido').html(navegar);
			 $("#inline").trigger('click');			
		}
      },
      error : function(jqXHR,exception){            
            App.ShowToast("Error de conexion, intentalo mas tarde","short");  
          
        }
    })
  
		
		
		
	},
	
	 nvaMostrar : function (e){		
	
	 $.ajax({
      url : webService+'saveEncuesta&token='+device.uuid+'&encuesta='+e,
      dataType : 'text',
      type : 'get',
      timeout : 10000,
      success : function(data){
		  
		  alert( data );
	  
      },
      error : function(jqXHR,exception){            
            App.ShowToast("Error de conexion, intentalo mas tarde","short");  
          
        }
    })
		 
	}
	,
	
    geTime : function(){
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var seconds = date.getSeconds();
        
        return hour;
    },
    getDate : function(){
        var date = new Date();
        var dia = date.getDate();
        var mes = (date.getMonth()+1);
        var anio = date.getFullYear();
        
        return anio+'-'+mes+'-'+dia;
    },
  init : function(){
        if(App.checkConnection()){
            showspinner('Cargando ...','Por favor espere');
          $.ajax({
            url: webService+'init&hora='+App.geTime()+'&device=android',
            type: "GET",
            dataType: "json",
            timeout: 60000,
            success: function(response) {
            
                
                 hidespinner();

        
         
            },
            error : function(jqXHR,exception){

                readError(jqXHR, exception);
                
            }
        });
            
            App.populator('galeria',function(page){
                    page.addEventListener('appShow',function(){
                        App.setGalerias();
                    });
            });
            
            /*calendario de eventos*/
            App.populator('CalendarRender',function(page){
                page.addEventListener('appShow',function(){
                    App.getCalendar();
                },false); 
            });
            
            App.populator('home',function(page){
                    page.addEventListener('appShow',function(){
						       
                    },false);
            });
            
            App.populator('feztivales',function(page){
                    page.addEventListener('appShow',function(){
                        App.FestivalList();
                    });
            });
            
            App.populator('maps',function(page){
                    page.addEventListener('appShow',function(){
                        App.Mapa();
                    });
            });
        }else{
            navigator.notification.alert("Es necesario contar con conexion a internet para visualizar correctamente esta aplicacion.",function(){ hidespinner(); App.init(); },'Aviso!','Reintentar');
        }
  },
    checkConnection : function(){
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';
        if((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')){
            return false;
        }else{
            return true;
        }
    },

  setSlideshow : function(){
    
 
  },
    meridaFest : function(){
      //leer el archivo local
      //el merida fest y el olimpo son una vez al año lo cual requerira eventos para ambos festivales que se deben ver
      //reflejados cuando se entre a cada una de la seccion como el calendario de eventos y la posibilidad de filtro
      
      var activo = false;
      
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 7){
          activo = true;
        } //el id 7 es del merida fest en la base de datos, no debe ser borrado!
      }
      
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('meridaFest', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '1' || dbLocal.Estaticos[i].tipo == 1){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('meridaFest', {images: galerias });
        
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(7,null,null);
      }
      else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galeria',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    nocheBlanca : function(){
      //verificar si esta activo el evento
      var activo = false;
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 12 ){
          activo = true;
        } //el id 1 es del noche blanca en la base de datos, no debe ser borrado!
      }
      
      
      //si no esta activo muestra una galeria
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('nocheBlanca', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '3' || dbLocal.Estaticos[i].tipo == 3){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('nocheBlanca', {images: galerias });
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(12,null,null);
      }else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galerias',function(){ App.back()  },'Aviso','Aceptar');
      }
      
    },
    olimpo : function(){
      //verificar si esta activo el evento
      var activo = false;
      for(var j = 0; j < dbLocal.Festivales.length; j++){
        if(dbLocal.Festivales[j].ID == 6){
          activo = true;
        } //el id 6 es del olimpo en la base de datos, no debe ser borrado!
      }
      
      
      //si no esta activo muestra una galeria
      if(App.checkConnection() && !activo){
        var galerias = [];
        //abrir la galeria
        
        App.populator('olimpo', function (page, data) {
            var p = new PhotoViewer(page, data.images, {
            startAt: 0
          });
        });
        

        for(var i = 0; i < dbLocal.Estaticos.length; i++){
          if(dbLocal.Estaticos[i].tipo == '2' || dbLocal.Estaticos[i].tipo == 2){
            for(var e = 0; e < dbLocal.Estaticos[i].galeria.length; e++){
              galerias.push(dbLocal.Estaticos[i].galeria[e].src);
            }
          } //es Merida Fest
        }
        
        
       App.load('olimpo', {images: galerias });
      }else if(activo){
        //ver los eventos asociados a ese festival
        App.load('viewEventos');
        App.viewEventos(6,null,null);
      }else{
        navigator.notification.alert('Se requiere conexion a internet para poder ver las galerias',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    setConfRegistro : function(){
    //--Validar si el usuario existe

         if (App.checkConnection()) {
    var viewRegistro;   
    
      //ocultar campos
      $('.esconde').hide();
    $('.esconde2').hide();
    $('.mesconde').hide();
      //set placeholder to number text
      $("input[type='number']").each(function(i, el) {
          el.type = "text";
          el.onfocus = function(){this.type="number";};
          el.onblur = function(){this.type="text";};
      });
      
      //habilitar campos
      $('#origen').on('change',function(){
        var self = $(this).val();
        if(self == 'n'){ /*habiliar campos*/ $('.esconde').show(); $('.esconde2').hide();} //nacional
        if(self == 'e'){ /*no habiliar campos*/ $('.esconde').hide(); $('.esconde2').show();  $('.mesconde').hide();} //extranjero
      })
      
      //set country
      populateCountries("pais");
    selectStates("estados","municipios");
      
      $('#sendregister').unbind('click');
      
      $('#sendregister').on('click',function(){ 
      
      var email = $('#email').val();  
      var origen = $('#origen').val();      
      cadena = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if ( !cadena.test(email) )
        {
            navigator.notification.alert('Ingresa un correo valido',null,'Aviso!','Aceptar');     
        }
        else if(origen == 'n')
        {
          var munic = $('#municipios').val();
          var estate = $('#estados').val();
          var tel = $('#tel').val();
          if(estate == '' || estate == null || munic == '' || munic == null)
          {
            navigator.notification.alert('Selecciona un estado y un municipo',null,'Aviso!','Aceptar');
          }
          else if(tel.length < 7 )
          {
            navigator.notification.alert('Ingresa un numero valido',null,'Aviso!','Aceptar');
          }else{
            App.registerUsr();
          }
        }
        else if(origen == 'e')
        {
          country = $('#pais').val();
          if( country == '')
          {
            navigator.notification.alert('Selecciona un pais',null,'Aviso!','Aceptar');
          }else{
            App.registerUsr();
          }
        }
        else
        {       
          App.registerUsr();        
        }
         
        
      })

         }else{

                navigator.notification.alert('Se requiere conexion a internet para realizar el registro.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    registerUsr : function(){
    
    
    
      if(App.checkConnection()){
      var name = $('#nombre').val(),
      age = $('#edad').val(),
      country = $('#pais').val(),
      mail = $('#email').val(),     
      origin = $('#origen').val(),
    telef  = $('#tel').val(),
      sex = $('#sexo').val(),
      estado = $('#estados').val(),
      municipio = $('#municipios').val(),
    estado = $("#estados").val();
    
    
    
      
      if(origin != '' && origin != null  && name != '' && name != null && sex != null && sex != '' && age != null && age != ''  ){
          //enviar el registro del ciudadano local/nacional
    
        
          showspinner('Enviando / Sending ...','Por favor espere');
          $.ajax({
            url : webService+'registrarUsuarioApp',
            type : 'POST',
            data : {
              nombre : name,
              edad : age,
              pais : country,
              email : mail,
              origen : origin,
              sexo : sex,
              tel : telef,
            state : estado,
            muni_ci: municipio,
            token: device.uuid
            },
            timeout : 10000,
            success : function(response){
              navigator.notification.alert('Gracias por registrarse / Thanks!',function(){ App.back(); },'Aviso','Aceptar');
              hidespinner();
            },
            error : function(jqXHR,exception){
                     
                       readError(jqXHR, exception);
                      
                  }
          })
      
      
        }else{
          navigator.notification.alert('Por favor rellene todos los campos',null,'Aviso!','Aceptar');
        }

      }else{
        navigator.notification.alert('Se requiere conexion a internet',null,'Aviso!','Aceptar');
      }
      return false;
    },
    ShowToast : function(message,duration){
        if(message != '' && duration !=''){
            if(duration == 'long'){
                longToast(message);
            }else{
                shortToast(message);
            }
        }
    },
    viewVideos : function(){

         if(App.checkConnection()){
      var lst = '';

    if(dbLocal.Videos.length != 0)
    {   
        for(var n = 0; n < dbLocal.Videos.length; n++){
          lst += '<div onclick="window.open(\''+dbLocal.Videos[n].url+'\',\'_blank\', \'location=yes\')" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr> <td align="left"><img src="images/verVideo.png" /></td> <td>'+dbLocal.Videos[n].titulo+'</td></tr></table></div>';
        }
    }else{
     
        lst = '<p class="app-input">No se han publicado videos, pronto tendremos algo para ti.</p>';  
    }
        $('#videos').html(lst);

         }else{
            navigator.notification.alert('Se requiere conexion a internet para ver los videos.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    viewNoticias : function(){

        if(App.checkConnection()){
        var lst = '';
    
    if(dbLocal.Noticias.length != 0)
    {
        for(var n = 0; n < dbLocal.Noticias.length; n++){
            if(dbLocal.Noticias[n].url == '' || dbLocal.Noticias[n].url == null){
               // lst += '<li class="app-button" onclick="App.load(\'viewNoticia\'); App.viewNoticia('+dbLocal.Noticias[n].ID+')">'+dbLocal.Noticias[n].titulo+'</li>';
              lst += '<div  onclick="App.load(\'viewNoticia\'); App.viewNoticia('+dbLocal.Noticias[n].ID+')" style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/notas.png"/></td>  <td>'+dbLocal.Noticias[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            }else{
               //lst += '<li class="app-button" onclick="window.open(\''+dbLocal.Noticias[n].url+'\',\'_blank\', \'location=yes\')">'+dbLocal.Noticias[n].titulo+'</li>';
              lst += '<div onclick="window.open(\''+dbLocal.Noticias[n].url+'\',\'_blank\', \'location=yes\')" style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/notas.png"/></td>  <td>'+dbLocal.Noticias[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            }
        }
    }else{
      
       lst =  '<p class="app-input">No se han publicado noticias, pronto tendremos algo para ti.</p>';
     
    }
        $('#noticias').html(lst);


          }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las noticias.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
    viewNoticia : function(id){
      $('#noticiatitle').html('');
        $('#descnoticia').html('');
        for(var i = 0; i < dbLocal.Noticias.length; i++){
            if(id == dbLocal.Noticias[i].ID){
                $('#noticiatitle').html(dbLocal.Noticias[i].titulo);
                $('#descnoticia').html(dbLocal.Noticias[i].desc);
            }
        }
    },
    viewCalendario : function(){
      //validar la conexiona internet
	  
//	   console.log("url of webservices: "+url);
	  
      if(App.checkConnection()){
      
      $('#renderCal').hide();
        $('#calendarWidget').show();
        $('#renderCal').html('');
       
        $('#calendarWidget').show();
         
         var cTime = new Date(), month = cTime.getMonth()+1, year = cTime.getFullYear();
         var evtList = $('#listaEvt');
         var theMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

         var theDays = ["D", "L", "M", "M", "J", "V", "S"];
		 
		 console.log("URLS SEGUNDO: "+webService+'getCalendario&hora='+App.geTime()+'&mes='+cTime.getMonth());
        
         $('#calendar').calendar({
             months: theMonths,
             days: theDays,
             req_ajax: {
                 type: 'get',
                 url: webService+'getCalendario&hora='+App.geTime+'&mes='+cTime.getMonth()
             }
         });
		
         
        }else{
            navigator.notification.alert('Se requiere conexion a internet para ver el calendario.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },
  
    viewEventos : function(festival,peticion,limite){
      if(festival != 0 && festival != '' && peticion != null && peticion == 'peticion' && limite != 0 && limite != ''){
        //esto es para cargar mas resultados
        showspinner('Cargando ...','Espere Por favor');
        
        $.ajax({
          url : webService+'getOlimpo&peticion=peticion&limite='+limite,
          type : 'get',
          dataType : 'json',
          timeout : 10000,
          success : function(data){
            var content = $('#content'),
            eventos = '';
            
            for(var i = 0; i < data.length; i++){
              eventos += '<div style="min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;  "><p style="font-weight:bold;">'+data[i].titulo.substring(0,50)+' ... <img src="images/mano.png" /></p><p>Fecha : '+data[i].fecha+' Lugar : '+data[i].direccion.substring(0,15)+' ...</p></div>';
            }
            
            content.html(eventos);
            
            hidespinner();
          },
          error : function(){
            //programar funcion de error
          }
        })
       }else{
         if(festival != 0 && festival != ''){
       
           //buscar los eventos del festival en el json
           //alert(festival+' , '+dbLocal.Festivales[i].festival)
           		var localDate = new Date();
               var carreteIcons = "";
        var viewPortWidth = window.innerWidth;
            var viewPortHeight = window.innerHeight;
         var croquis = '';
          var icono  = '';
           var eventos = '',
          
          // var carrete = $('#carrete');

           content = $('#eventos'),
           header = $('#EventoHeader'),
           eventosFest = null;
           for(var i = 0; i < dbLocal.Festivales.length; i++){
            //eventos
            
             if(festival == dbLocal.Festivales[i].ID){
             
             if( App.checkConnection())
             {
               
               header.attr('src',dbLocal.Festivales[i].portada);


             }else{
               header.attr('src',"images/slidefijo.jpg");
             }
                            
             
            if(dbLocal.Festivales[i].croquis != null) 
            {

              croquis = dbLocal.Festivales[i].croquis;
                  $('#croquis').html('<img src="images/croquis.png" />');
                            $('#croquis').on('click',function(){
                                     App.load('viewCroquis');
                           
                                     $('#_croquismap').attr('src',croquis);
                                     $('#_croquismap').load(function(){
                                                           //showspinner('Cargando ...');
                                                           $('#_croquismap').smoothZoom({ width: viewPortWidth , height : viewPortHeight , zoom_MAX:300, pan_BUTTONS_SHOW : "NO", button_SIZE: 24, button_ALIGN : "top right", responsive : false});
                                                           //hidespinner();
                                                           });
                                     
                                     });        
              
                } 

               
                icono = '<div class="item filter" id=0   > <img  src="images/iconografia/todos.jpg" /> </div>';

                for (var j = 0;  j < dbLocal.Festivales[i].iconografia.length; j++ )  
                { 


                    icono += '<div class="item filter" id='+dbLocal.Festivales[i].iconografia[j].ID+'  > <img  src="images/iconografia/'+dbLocal.Festivales[i].iconografia[j].url+'" /></div>';
             
                }

             
               for(var e = 0; e < dbLocal.Festivales[i].eventos.length; e++){
                 eventosFest = dbLocal.Festivales[i].eventos;   
				 
				         ///           
						 if(  dbLocal.Festivales[i].eventos[e].fechini >= localDate.getDate() )         
						{
						//Agregar condicion fecha
                    if( dbLocal.Festivales[i].eventos[e].iconoportada != "" )
                            {

                                eventos += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+dbLocal.Festivales[i].eventos[e].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" ><img src="'+dbLocal.Festivales[i].eventos[e].iconoportada+'" width="95" height="100" ></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].eventos[e].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+dbLocal.Festivales[i].eventos[e].lugar+'</td> </tr></table></div>';
                            
                            }else{

                                 
                                eventos += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+dbLocal.Festivales[i].eventos[e].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" > <img src="images/logo.jpg" width="95" height="100" > </td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].eventos[e].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+dbLocal.Festivales[i].eventos[e].lugar+'</td> </tr></table></div>';
                            }
                       } 
					////End
			   }
             }
           }



          
        
            $('#owl-demo').html(icono);
           content.html(eventos);

           var owl = $("#owl-demo");
           owl.owlCarousel({
                 itemsCustom:[
                     [0,6],
                     [450,4],
                     [600,7],
                     [700,9]
                        ]
             
            
          });



               
           $('#todos').css('background-color','#000000');
           var  filter = '';
           
           //filtro de eventos
           $('.filter').click(function(){
             var filterEvents = "";
             var id = $(this).attr('id'),
             filter =  id;


             $('.filter').css('background-color','#00a7d9');

             
             for(var i = 0; i < eventosFest.length; i++){

                   	if(  eventosFest[i].fechini >= localDate.getDate() )         
						{
 
                       if(filter == eventosFest[i].tipo){


                                    if(eventosFest[i].iconoportada != "") 
                                    {

                                      filterEvents += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+eventosFest[i].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+eventosFest[i].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr>  <td rowspan="3" ><img src="'+eventosFest[i].iconoportada+'" width="95" height="100" ></td>  <td > <strong>Fecha:</strong></td> <td>'+eventosFest[i].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+eventosFest[i].direccion+'</td> </tr></table></div>';
                                   
                                    }else
                                    {

                                      filterEvents += '<div onclick="App.load(\'viewEvento\'); App.viewEvento('+eventosFest[i].ID+','+festival+');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+eventosFest[i].titulo+'</strong></td> </tr> <tr class="clear"></tr>  <tr> <td rowspan="3" > <img src="images/logo.jpg" width="95" height="100" > </td>  <td > <strong>Fecha:</strong></td> <td>'+eventosFest[i].fecha+'</td> </tr><tr>   <td><strong>Lugar:</strong> </td>  <td>'+eventosFest[i].direccion+'</td> </tr></table></div>';

                                    }
                              }
						}
             }





             if(filterEvents == null || filterEvents == ''){
              content.html('<p class="app-input">No se ha publicado eventos de este tipo.</p>');          
             }else{content.html(filterEvents);}
             
             if(filter == 0){  content.html(eventos); }
           });
           
           
           
         }
       }
    },
    viewEvento : function(eventoId,festival){
      //se define festival por si le pican a algun evento de merida fest u olimpo
      if(eventoId != 0 && eventoId != '' && festival != 0 && festival != ''){
                        showspinner('Cargando..','Por favor espere');
                           /*cambiar el header segun el festival que sea
                            *  1 . olimpo
                            *  2. fest
                            *  3. otros
                            */
                           var header = $('#changeHeader'),
                           titulo = $('#titulo'),
                           content = $('#descripcion'),
                           mapa = $('#mapa');
                           var lugar = "";
                           var precio = "";
                           
                           switch(festival){
                            case 1 :
                              header.attr('src','images/header-olimpo.jpg');
                            break;
                            
                            case 2 :
                              header.attr('src','images/header-fest.jpg');
                            break;
                           }

                           
                           /*buscar el evento*/
                         for(var i = 0; i < dbLocal.Festivales.length; i++){
                           if(dbLocal.Festivales[i].ID == festival){
                              
                             for(var e = 0; e < dbLocal.Festivales[i].eventos.length; e++){
                               if(eventoId == dbLocal.Festivales[i].eventos[e].ID){                                          
                                          
                                           if(!App.checkConnection())
                                           {

                                                header.attr('src','images/slidefijo.jpg');
                                           }else{

                                                 header.attr('src',dbLocal.Festivales[i].eventos[e].evtportada);
                                           }
                                            if(dbLocal.Festivales[i].eventos[e].lugar == "")
                                            {

                                                lugar = 'No disponible';

                                            }else{  

                                                 lugar = dbLocal.Festivales[i].eventos[e].lugar;    
                                            }

                                              if(dbLocal.Festivales[i].eventos[e].precio == "")
                                            {

                                                precio = 'No disponible';

                                            }else{  

                                                 precio = dbLocal.Festivales[i].eventos[e].precio;    
                                            }

                                      titulo.html('<strong>'+dbLocal.Festivales[i].eventos[e].titulo+'</strong>');
                                     content.html('<p><strong>Fecha : </strong> '+dbLocal.Festivales[i].eventos[e].fecha+'<br> <strong>Hora: </strong> '+dbLocal.Festivales[i].eventos[e].hora+'<br> <strong>Lugar: </strong> '+lugar+' <br> <strong>Direcci&oacute;n : </strong> '+dbLocal.Festivales[i].eventos[e].direccion+' <br> <strong>Precio: </strong> '+precio+' </p> <p><strong>Descripci&oacute;n:</strong> <br>'+dbLocal.Festivales[i].eventos[e].desc+'</p>');
                                     //mapa.html(dbLocal.Festivales[i].eventos[e].lat+' / '+dbLocal.Festivales[i].eventos[e].lng);
                               }
                            }          
                             }
                           }

            hidespinner();
      }else{
        

            navigator.notification.alert('Este evento no se puede visualizar.',function(){ App.back()  },'Aviso','Aceptar');
      }
    },
    CreardbLocal : function(data){
        var error = false;
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
            function(fileSystem){
                fileSystem.root.getFile('dbCultura.json',{ create : true , exclusive : false},
                    function(fileEntry){
                        fileEntry.createWriter(function(writer){
                            
                            writer.onwriteend= function(){
                                
                            };
                                               
                            writer.write(JSON.stringify(data))
                            error = false;
              
                        },onError);
                    },
               onError);
            },
        onError);
        
        var onError = function(err){
            console.log('Error => '+err.code)
            error = true;
        };
        
        return error;
    },

        CrearVersionLocal : function(data){
        var error = false;
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
            function(fileSystem){
                fileSystem.root.getFile('ifoversion.json',{ create : true , exclusive : false},
                    function(fileEntry){
                        fileEntry.createWriter(function(writer){
                            
                            writer.onwriteend= function(){
                                
                            };
                                               
                            writer.write(JSON.stringify(data))
                            error = false;
                            
                        },onError);
                    },
               onError);
            },
        onError);
        
        var onError = function(err){
            console.log('Error => '+err.code)
            error = true;
        };
        
        return error;
    },
    viewFestivales : function(){
      //listar los festivales (cada uno tiene 10 eventos)
    showspinner('Cargando..','Por favor espere');
       var content = $('#content'),
         festivales = '';
         
         for(var i = 0; i < dbLocal.Festivales.length; i++){
       
          //festivales += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6;"> <div style="background-image:url(images/loadmarco.png); background-repeat:no-repeat;" height="40%"> <img src="'+dbLocal.Festivales[i].portada+'" class="left" width="40%"; style="padding-right:5px;"/></div>   <p style="font-weight:bold;">'+dbLocal.Festivales[i].titulo+'<img src="images/mano.png" /></p><p>Fecha : '+dbLocal.Festivales[i].fecha+'</p><div class="clear"></div></div>';
               if(App.checkConnection())
               {
                festivales   += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].titulo+'</strong></td> </tr> <tr class="clear"></tr><tr><td><img src="'+dbLocal.Festivales[i].thumb+'" width="100" height="110" /></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].fecha+'</td> </tr></table></div>';
                }else{

                  festivales   += '<div onclick="App.load(\'viewEventos\'); App.viewEventos('+dbLocal.Festivales[i].ID+',\'\',\'\');" style="padding:5px; min-height:83px !important; border-bottom:1px solid #515151; background-color:#f6f6f6; background-repeat:no-repeat;"><table width="100%"><tr> <td align="center" colspan="3"><strong>'+dbLocal.Festivales[i].titulo+'</strong></td> </tr> <tr class="clear"></tr><tr><td><img src="images/stthumb.jpg" width="100" height="110" /></td>  <td > <strong>Fecha:</strong></td> <td>'+dbLocal.Festivales[i].fecha+'</td> </tr></table></div>';
                }
             }
         
         content.html(festivales);
     hidespinner();
    },
    viewConvocatorias : function(){

 if(App.checkConnection()){
        
        var lst = '';
    
    if(dbLocal.Convocatorias.length != 0)
    {
            for(var n = 0; n < dbLocal.Convocatorias.length; n++)
            {       
           
             
              lst += '<div  onclick="App.viewGalconvoca('+dbLocal.Convocatorias[n].idgal+');"  style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/convocaid.png"/></td>  <td>'+dbLocal.Convocatorias[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            
             }
              
          
          }else{
      
           lst =  '<p class="app-input">No se han publicado editoriales, pronto tendremos algo para ti.</p>';
     
         }
        $('#convocatorias').html(lst);


        

        }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las convocatorias.',function(){ App.back()  },'Aviso','Aceptar');
        }

     


    },

    viewGalconvoca: function(idgal){

        App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Convocatorias.length; a++){
        if(idgal == dbLocal.Convocatorias[a].idgal){
          for(var i = 0; i < dbLocal.Convocatorias[a].imagenes.length; i++){
            fotos.push(dbLocal.Convocatorias[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
        

    },
    viewEditorial : function(){


         if(App.checkConnection()){
        var lst = '';
    
    if(dbLocal.Editorial.length != 0)
    {
            for(var n = 0; n < dbLocal.Editorial.length; n++)
            {       
           
             
              lst += '<div  onclick="App.viewEditorialg('+dbLocal.Editorial[n].idgal+');"  style="border-bottom:1px solid #515151; background-color:#f6f6f6;"><table style="width:100%"><tr><td align="left"><img src="images/fondoedit.png"/></td>  <td>'+dbLocal.Editorial[n].titulo+'</td>  <td align="right"><img src="images/mano.png" /></td> </tr></table></div>';
            
             }
              
          
          }else{
      
           lst =  '<p class="app-input">No se han publicado editoriales, pronto tendremos algo para ti.</p>';
     
         }
        $('#editorial').html(lst);


        

        }else{
            navigator.notification.alert('Se requiere conexion a internet para ver las noticias.',function(){ App.back()  },'Aviso','Aceptar');
        }



       

    },
    viewGalerias : function(){
      if(App.checkConnection()){
        var content = $('#galerias'),
        galerias = '';

        
        for(var i = 0; i < dbLocal.Galerias.length; i++){

          
                galerias += '<div onclick="App.viewGaleria('+dbLocal.Galerias[i].idgal+');"  style="width: 33.3%; height:33.3%; float:left; padding:5px;"> <div style="background-image:url(images/loadmarco.png); background-repeat:no-repeat;"> <img src="'+dbLocal.Galerias[i].portada+'" width="100%"/></div> <i class="fa fa-plus"></i> '+dbLocal.Galerias[i].titulo.slice(0,16)+'...</div>';
        
            }
        
        content.html(galerias);
       }else{
            navigator.notification.alert('Se requiere conexion a internet para ver la galeria.',function(){ App.back()  },'Aviso','Aceptar');
        }
    },


     viewEditorialg : function(idgal){
      
      App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Editorial.length; a++){
        if(idgal == dbLocal.Editorial[a].idgal){
          for(var i = 0; i < dbLocal.Editorial[a].imagenes.length; i++){
            fotos.push(dbLocal.Editorial[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
    },

    viewGaleria : function(idgal){
      
      App.populator('viewGaleria', function (page, data) {
          var p = new PhotoViewer(page, data.images, {
          startAt: 0
        });
      });
      
      var fotos = [];
      for(var a = 0; a < dbLocal.Galerias.length; a++){
        if(idgal == dbLocal.Galerias[a].idgal){
          for(var i = 0; i < dbLocal.Galerias[a].imagenes.length; i++){
            fotos.push(dbLocal.Galerias[a].imagenes[i]);
          }
        }
     }
      
     App.load('viewGaleria', {images: fotos });
    },
        leerdbLocal : function(){
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
                function(fileSystem){
                 fileSystem.root.getFile('dbCultura.json',{ create  :false },
                      function(fileEntry){
                
                      var reader = new FileReader();
                          reader.onloadend = function(evt){
                          dbLocal = JSON.parse(evt.target.result);
                          
                      };
                           fileEntry.file(function(file){
                                reader.readAsText(file)
                           })
                           
                        },onError);
            },onError);

        var onError = function(err){  navigator.notification.alert('El archivo del librero no se encuentra, conecte el dispositivo a internet para corregirlo.',function(){ hidespinner(); onDeviceReady(); },'Error!','Aceptar'); }
    }

};

function onDeviceReady() {
  

  onLoadSlider();


  if(App.checkConnection()){ //validar conexion a internet
 setTimeout(function getEncuesta(){  App.getPopup();}, 1500);	    
     var lastupdate = "";
     var update = "";       

  showspinner('Espere', 'Buscando nuevos eventos...')

    $.ajax({
      url : webService+'getVersion',
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

            hidespinner();
            dataVersion = data;
            var verLocal = "";
            var verServer = "";    
            var dbversion = "";

            checkIfFileExists('ifoversion.json');

            if ( statusFile() ) 
            {
              //El archivo existe se procede a realizar la lectura

              window.requestFileSystem(window.LocalFileSystem.PERSISTENT,0,
                function(fileSystem){
                 fileSystem.root.getFile('ifoversion.json',{ create  :false },
                      function(fileEntry){
                
                      var reader = new FileReader();
                          reader.onloadend = function(evt){
                          dbversion = JSON.parse(evt.target.result);

                            //---Leer la version de la bd
                              for( var id=0;  id< data.Versiones.length; id++) 
                                  {
                                          verServer = data.Versiones[id].actualversion;
                                          verLocal  = dbversion.Versiones[id].actualversion;
                                   }


                                   if ( verServer  > verLocal   ) 
                                   {
                                      hidespinner();
                                      App.ShowToast("Descargando nuevos eventos","short");                                     
                                      updateEventos(dataVersion);

                                   }else if( verServer == verLocal)
                                   {
                                        hidespinner();
                                        App.ShowToast("No se han encontrado nuevos eventos","short");
                                        App.leerdbLocal();
                                        loadAnimation();                   
                                        
                                    }else{

                                        hidespinner();
                                        updateEventos(dataVersion); 

                                    }
                            //--Fin de leido y condiciones


                      };
                           fileEntry.file(function(file){
                                reader.readAsText(file);
                                hidespinner();
                           })
                           
                        },onError);
            },onError);

        var onError = function(err){   

          hidespinner();
          App.leerdbLocal();
          loadAnimation(); 
          //updateEventos(dataVersion); 
        }

            }
            else{


                //--El archivo no existe se crea y se descarga la nueva version de la bd
                  hidespinner();
                  App.ShowToast("Actualizando informacion","short");
                  updateEventos(dataVersion);

            }  


        
      },
      error : function(jqXHR,exception){
            readError(jqXHR,exception);
            
        }
    })
  }else{
    //sin conexion
    hidespinner();
    App.ShowToast("Verifica tu conexion","short");
    App.leerdbLocal();
    loadAnimation();

  }
    
    document.addEventListener('backbutton', function(){ App.back(); }, false);
 


}


function onLoadSlider()
{

   
   if(App.checkConnection()){ //validar conexion a internet

    $.ajax({
      url : webService+'getSlider',
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

        var slide = "";


      if(data == null ){           
        slide = '<div class="item"> <img src="images/slidefijo.jpg" width="100%" /> </div>';}else{ 
        for(var i = 0; i < data.Sliders.length; i++)
                  {    
                 slide += '<div class="item"> <img src="'+data.Sliders[i].imagen+'" width="100%" /> </div>';
                  } 

                 }
      $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);
        

        
      },
      error : function(jqXHR,exception){
            
      slide = '<div> <img src="images/slidefijo.jpg" width="100%" /> </div>';
      $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);

            
        }
    })
  }else{

     slide = '<div> <img src="images/slidefijo.jpg" width="100%" /> </div>'; 
     $('#setWrap').html(slide);
      setTimeout(function(){     
      $('#ocultaslide').css('display','none');
      $('#mostrarslide').css('display','block');
      var elem = document.getElementById('slideshowPrincipal');
      window.mySwipe = Swipe(elem, {
      startSlide: 0,
      auto: 2850,
      stopPropagation: false,
      continuous: true,
      callback: function(index, elem) {},});  
      },3000);
    

  }

}




function updateEventos(dataVersion)
{

  if(App.checkConnection()){ //validar conexion a internet
  hidespinner();
  showspinner('Descargando', 'Sincronizando informacion...');

    $.ajax({
      url : webService+'init&hora='+App.geTime(),
      dataType : 'json',
      type : 'get',
      timeout : 10000,
      success : function(data){

            App.CreardbLocal(data);
            App.CrearVersionLocal(dataVersion);
            App.leerdbLocal();                                    
            hidespinner();
            loadAnimation();



        
      },
      error : function(jqXHR,exception){
            
            //readError(jqXHR,exception);
            hidespinner();
            App.leerdbLocal();
            App.ShowToast("Error de conexion, intentalo mas tarde","short");    
            loadAnimation();
            
        }
    })
  }else{
    //sin conexion
    hidespinner();
    App.leerdbLocal();
     App.ShowToast("Verifica tu conexion","short");    
    loadAnimation();

  }

}


function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}

function fileExists(fileEntry){
    
  flstatus  = true;
}

function fileDoesNotExist(){

  flstatus = false;
   
}
function getFSFail(evt) {
    
    flstatus = false;
}

function statusFile()
{

  return flstatus;
}

function loadAnimation()
{
}

function showspinner(dialog,titulo) {
    window.plugins.waitingDialog.show(dialog,titulo);
}

function hidespinner(){
    window.plugins.waitingDialog.hide();
}


function readError(jqXHR, exception )
{
         if (jqXHR.status === 0) {
                App.ShowToast("Sin conexion. Verifique su conexion a internet!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 
            
            } else if (jqXHR.status == 404) {
            
                App.ShowToast("Servicio no encontrado!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (jqXHR.status == 500) {

                App.ShowToast("Error interno del servidor","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (exception === 'parsererror') {

                App.ShowToast("La informacion no se puede leer.","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 


            } else if (exception === 'timeout') {
                App.ShowToast("Se a agotado el tiempo de espera","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation(); 

            } else if (exception === 'abort') {
                
                App.ShowToast("Conexion abortada!","short");
                hidespinner();
                App.leerdbLocal();   
                loadAnimation();  
                
            } else {

                hidespinner();
                App.leerdbLocal();   
                loadAnimation();  
                navigator.notification.alert('Uncaught Error.\n' + jqXHR.responseText);
            }
 }

document.addEventListener('deviceready',onDeviceReady,false);

//onresume
document.addEventListener('resume',function(){
    
    onDeviceReady();
   
},false);



window.shortToast = function(str, callback) {   
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "ToastPlugin", "shortToast", [ str ]);
};

window.longToast = function(str, callback) {
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "ToastPlugin", "longToast", [ str ]);
};

// Countries
var country_arr = new Array("Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");

// States
var s_a = new Array();
s_a[0] = "";
s_a[1] = "Badakhshan|Badghis|Baghlan|Balkh|Bamian|Farah|Faryab|Ghazni|Ghowr|Helmand|Herat|Jowzjan|Kabol|Kandahar|Kapisa|Konar|Kondoz|Laghman|Lowgar|Nangarhar|Nimruz|Oruzgan|Paktia|Paktika|Parvan|Samangan|Sar-e Pol|Takhar|Vardak|Zabol";
s_a[2] = "Berat|Bulqize|Delvine|Devoll (Bilisht)|Diber (Peshkopi)|Durres|Elbasan|Fier|Gjirokaster|Gramsh|Has (Krume)|Kavaje|Kolonje (Erseke)|Korce|Kruje|Kucove|Kukes|Kurbin|Lezhe|Librazhd|Lushnje|Malesi e Madhe (Koplik)|Mallakaster (Ballsh)|Mat (Burrel)|Mirdite (Rreshen)|Peqin|Permet|Pogradec|Puke|Sarande|Shkoder|Skrapar (Corovode)|Tepelene|Tirane (Tirana)|Tirane (Tirana)|Tropoje (Bajram Curri)|Vlore";
s_a[3] = "Adrar|Ain Defla|Ain Temouchent|Alger|Annaba|Batna|Bechar|Bejaia|Biskra|Blida|Bordj Bou Arreridj|Bouira|Boumerdes|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaia|Guelma|Illizi|Jijel|Khenchela|Laghouat|M'Sila|Mascara|Medea|Mila|Mostaganem|Naama|Oran|Ouargla|Oum el Bouaghi|Relizane|Saida|Setif|Sidi Bel Abbes|Skikda|Souk Ahras|Tamanghasset|Tebessa|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen";
s_a[4] = "Eastern|Manu'a|Rose Island|Swains Island|Western";
s_a[5] = "Andorra la Vella|Bengo|Benguela|Bie|Cabinda|Canillo|Cuando Cubango|Cuanza Norte|Cuanza Sul|Cunene|Encamp|Escaldes-Engordany|Huambo|Huila|La Massana|Luanda|Lunda Norte|Lunda Sul|Malanje|Moxico|Namibe|Ordino|Sant Julia de Loria|Uige|Zaire";
s_a[6] = "Anguilla";
s_a[7] = "Antartica";
s_a[8] = "Barbuda|Redonda|Saint George|Saint John|Saint Mary|Saint Paul|Saint Peter|Saint Philip";
s_a[9] = "Antartica e Islas del Atlantico Sur|Buenos Aires|Buenos Aires Capital Federal|Catamarca|Chaco|Chubut|Cordoba|Corrientes|Entre Rios|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquen|Rio Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucuman";
s_a[10] = "Aragatsotn|Ararat|Armavir|Geghark'unik'|Kotayk'|Lorri|Shirak|Syunik'|Tavush|Vayots' Dzor|Yerevan";
s_a[11] = "Aruba";
s_a[12] = "Ashmore and Cartier Island";
s_a[13] = "Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia";
s_a[14] = "Burgenland|Kaernten|Niederoesterreich|Oberoesterreich|Salzburg|Steiermark|Tirol|Vorarlberg|Wien";
s_a[15] = "Abseron Rayonu|Agcabadi Rayonu|Agdam Rayonu|Agdas Rayonu|Agstafa Rayonu|Agsu Rayonu|Ali Bayramli Sahari|Astara Rayonu|Baki Sahari|Balakan Rayonu|Barda Rayonu|Beylaqan Rayonu|Bilasuvar Rayonu|Cabrayil Rayonu|Calilabad Rayonu|Daskasan Rayonu|Davaci Rayonu|Fuzuli Rayonu|Gadabay Rayonu|Ganca Sahari|Goranboy Rayonu|Goycay Rayonu|Haciqabul Rayonu|Imisli Rayonu|Ismayilli Rayonu|Kalbacar Rayonu|Kurdamir Rayonu|Lacin Rayonu|Lankaran Rayonu|Lankaran Sahari|Lerik Rayonu|Masalli Rayonu|Mingacevir Sahari|Naftalan Sahari|Naxcivan Muxtar Respublikasi|Neftcala Rayonu|Oguz Rayonu|Qabala Rayonu|Qax Rayonu|Qazax Rayonu|Qobustan Rayonu|Quba Rayonu|Qubadli Rayonu|Qusar Rayonu|Saatli Rayonu|Sabirabad Rayonu|Saki Rayonu|Saki Sahari|Salyan Rayonu|Samaxi Rayonu|Samkir Rayonu|Samux Rayonu|Siyazan Rayonu|Sumqayit Sahari|Susa Rayonu|Susa Sahari|Tartar Rayonu|Tovuz Rayonu|Ucar Rayonu|Xacmaz Rayonu|Xankandi Sahari|Xanlar Rayonu|Xizi Rayonu|Xocali Rayonu|Xocavand Rayonu|Yardimli Rayonu|Yevlax Rayonu|Yevlax Sahari|Zangilan Rayonu|Zaqatala Rayonu|Zardab Rayonu";
s_a[16] = "Acklins and Crooked Islands|Bimini|Cat Island|Exuma|Freeport|Fresh Creek|Governor's Harbour|Green Turtle Cay|Harbour Island|High Rock|Inagua|Kemps Bay|Long Island|Marsh Harbour|Mayaguana|New Providence|Nicholls Town and Berry Islands|Ragged Island|Rock Sound|San Salvador and Rum Cay|Sandy Point";
s_a[17] = "Al Hadd|Al Manamah|Al Mintaqah al Gharbiyah|Al Mintaqah al Wusta|Al Mintaqah ash Shamaliyah|Al Muharraq|Ar Rifa' wa al Mintaqah al Janubiyah|Jidd Hafs|Juzur Hawar|Madinat 'Isa|Madinat Hamad|Sitrah";
s_a[18] = "Barguna|Barisal|Bhola|Jhalokati|Patuakhali|Pirojpur|Bandarban|Brahmanbaria|Chandpur|Chittagong|Comilla|Cox's Bazar|Feni|Khagrachari|Lakshmipur|Noakhali|Rangamati|Dhaka|Faridpur|Gazipur|Gopalganj|Jamalpur|Kishoreganj|Madaripur|Manikganj|Munshiganj|Mymensingh|Narayanganj|Narsingdi|Netrokona|Rajbari|Shariatpur|Sherpur|Tangail|Bagerhat|Chuadanga|Jessore|Jhenaidah|Khulna|Kushtia|Magura|Meherpur|Narail|Satkhira|Bogra|Dinajpur|Gaibandha|Jaipurhat|Kurigram|Lalmonirhat|Naogaon|Natore|Nawabganj|Nilphamari|Pabna|Panchagarh|Rajshahi|Rangpur|Sirajganj|Thakurgaon|Habiganj|Maulvi bazar|Sunamganj|Sylhet";
s_a[19] = "Bridgetown|Christ Church|Saint Andrew|Saint George|Saint James|Saint John|Saint Joseph|Saint Lucy|Saint Michael|Saint Peter|Saint Philip|Saint Thomas";
s_a[20] = "Brestskaya (Brest)|Homyel'skaya (Homyel')|Horad Minsk|Hrodzyenskaya (Hrodna)|Mahilyowskaya (Mahilyow)|Minskaya|Vitsyebskaya (Vitsyebsk)";
s_a[21] = "Antwerpen|Brabant Wallon|Brussels Capitol Region|Hainaut|Liege|Limburg|Luxembourg|Namur|Oost-Vlaanderen|Vlaams Brabant|West-Vlaanderen";
s_a[22] = "Belize|Cayo|Corozal|Orange Walk|Stann Creek|Toledo";
s_a[23] = "Alibori|Atakora|Atlantique|Borgou|Collines|Couffo|Donga|Littoral|Mono|Oueme|Plateau|Zou";
s_a[24] = "Devonshire|Hamilton|Hamilton|Paget|Pembroke|Saint George|Saint Georges|Sandys|Smiths|Southampton|Warwick";
s_a[25] = "Bumthang|Chhukha|Chirang|Daga|Geylegphug|Ha|Lhuntshi|Mongar|Paro|Pemagatsel|Punakha|Samchi|Samdrup Jongkhar|Shemgang|Tashigang|Thimphu|Tongsa|Wangdi Phodrang";
s_a[26] = "Beni|Chuquisaca|Cochabamba|La Paz|Oruro|Pando|Potosi|Santa Cruz|Tarija";
s_a[27] = "Federation of Bosnia and Herzegovina|Republika Srpska";
s_a[28] = "Central|Chobe|Francistown|Gaborone|Ghanzi|Kgalagadi|Kgatleng|Kweneng|Lobatse|Ngamiland|North-East|Selebi-Pikwe|South-East|Southern";
s_a[29] = "Acre|Alagoas|Amapa|Amazonas|Bahia|Ceara|Distrito Federal|Espirito Santo|Goias|Maranhao|Mato Grosso|Mato Grosso do Sul|Minas Gerais|Para|Paraiba|Parana|Pernambuco|Piaui|Rio de Janeiro|Rio Grande do Norte|Rio Grande do Sul|Rondonia|Roraima|Santa Catarina|Sao Paulo|Sergipe|Tocantins";
s_a[30] = "Anegada|Jost Van Dyke|Tortola|Virgin Gorda";
s_a[31] = "Belait|Brunei and Muara|Temburong|Tutong";
s_a[32] = "Blagoevgrad|Burgas|Dobrich|Gabrovo|Khaskovo|Kurdzhali|Kyustendil|Lovech|Montana|Pazardzhik|Pernik|Pleven|Plovdiv|Razgrad|Ruse|Shumen|Silistra|Sliven|Smolyan|Sofiya|Sofiya-Grad|Stara Zagora|Turgovishte|Varna|Veliko Turnovo|Vidin|Vratsa|Yambol";
s_a[33] = "Bale|Bam|Banwa|Bazega|Bougouriba|Boulgou|Boulkiemde|Comoe|Ganzourgou|Gnagna|Gourma|Houet|Ioba|Kadiogo|Kenedougou|Komandjari|Kompienga|Kossi|Koupelogo|Kouritenga|Kourweogo|Leraba|Loroum|Mouhoun|Nahouri|Namentenga|Naumbiel|Nayala|Oubritenga|Oudalan|Passore|Poni|Samentenga|Sanguie|Seno|Sissili|Soum|Sourou|Tapoa|Tuy|Yagha|Yatenga|Ziro|Zondomo|Zoundweogo";
s_a[34] = "Ayeyarwady|Bago|Chin State|Kachin State|Kayah State|Kayin State|Magway|Mandalay|Mon State|Rakhine State|Sagaing|Shan State|Tanintharyi|Yangon";
s_a[35] = "Bubanza|Bujumbura|Bururi|Cankuzo|Cibitoke|Gitega|Karuzi|Kayanza|Kirundo|Makamba|Muramvya|Muyinga|Mwaro|Ngozi|Rutana|Ruyigi";
s_a[36] = "Banteay Mean Cheay|Batdambang|Kampong Cham|Kampong Chhnang|Kampong Spoe|Kampong Thum|Kampot|Kandal|Kaoh Kong|Keb|Kracheh|Mondol Kiri|Otdar Mean Cheay|Pailin|Phnum Penh|Pouthisat|Preah Seihanu (Sihanoukville)|Preah Vihear|Prey Veng|Rotanah Kiri|Siem Reab|Stoeng Treng|Svay Rieng|Takev";
s_a[37] = "Adamaoua|Centre|Est|Extreme-Nord|Littoral|Nord|Nord-Ouest|Ouest|Sud|Sud-Ouest";
s_a[38] = "Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";
s_a[39] = "Boa Vista|Brava|Maio|Mosteiros|Paul|Porto Novo|Praia|Ribeira Grande|Sal|Santa Catarina|Santa Cruz|Sao Domingos|Sao Filipe|Sao Nicolau|Sao Vicente|Tarrafal";
s_a[40] = "Creek|Eastern|Midland|South Town|Spot Bay|Stake Bay|West End|Western";
s_a[41] = "Bamingui-Bangoran|Bangui|Basse-Kotto|Gribingui|Haut-Mbomou|Haute-Kotto|Haute-Sangha|Kemo-Gribingui|Lobaye|Mbomou|Nana-Mambere|Ombella-Mpoko|Ouaka|Ouham|Ouham-Pende|Sangha|Vakaga";
s_a[42] = "Batha|Biltine|Borkou-Ennedi-Tibesti|Chari-Baguirmi|Guera|Kanem|Lac|Logone Occidental|Logone Oriental|Mayo-Kebbi|Moyen-Chari|Ouaddai|Salamat|Tandjile";
s_a[43] = "Aisen del General Carlos Ibanez del Campo|Antofagasta|Araucania|Atacama|Bio-Bio|Coquimbo|Libertador General Bernardo O'Higgins|Los Lagos|Magallanes y de la Antartica Chilena|Maule|Region Metropolitana (Santiago)|Tarapaca|Valparaiso";
s_a[44] = "Anhui|Beijing|Chongqing|Fujian|Gansu|Guangdong|Guangxi|Guizhou|Hainan|Hebei|Heilongjiang|Henan|Hubei|Hunan|Jiangsu|Jiangxi|Jilin|Liaoning|Nei Mongol|Ningxia|Qinghai|Shaanxi|Shandong|Shanghai|Shanxi|Sichuan|Tianjin|Xinjiang|Xizang (Tibet)|Yunnan|Zhejiang";
s_a[45] = "Christmas Island";
s_a[46] = "Clipperton Island";
s_a[47] = "Direction Island|Home Island|Horsburgh Island|North Keeling Island|South Island|West Island";
s_a[48] = "Amazonas|Antioquia|Arauca|Atlantico|Bolivar|Boyaca|Caldas|Caqueta|Casanare|Cauca|Cesar|Choco|Cordoba|Cundinamarca|Distrito Capital de Santa Fe de Bogota|Guainia|Guaviare|Huila|La Guajira|Magdalena|Meta|Narino|Norte de Santander|Putumayo|Quindio|Risaralda|San Andres y Providencia|Santander|Sucre|Tolima|Valle del Cauca|Vaupes|Vichada";
// <!-- -->
s_a[49] = "Anjouan (Nzwani)|Domoni|Fomboni|Grande Comore (Njazidja)|Moheli (Mwali)|Moroni|Moutsamoudou";
s_a[50] = "Bandundu|Bas-Congo|Equateur|Kasai-Occidental|Kasai-Oriental|Katanga|Kinshasa|Maniema|Nord-Kivu|Orientale|Sud-Kivu";
s_a[51] = "Bouenza|Brazzaville|Cuvette|Kouilou|Lekoumou|Likouala|Niari|Plateaux|Pool|Sangha";
s_a[52] = "Aitutaki|Atiu|Avarua|Mangaia|Manihiki|Manuae|Mauke|Mitiaro|Nassau Island|Palmerston|Penrhyn|Pukapuka|Rakahanga|Rarotonga|Suwarrow|Takutea";
s_a[53] = "Alajuela|Cartago|Guanacaste|Heredia|Limon|Puntarenas|San Jose";
s_a[54] = "Abengourou|Abidjan|Aboisso|Adiake'|Adzope|Agboville|Agnibilekrou|Ale'pe'|Bangolo|Beoumi|Biankouma|Bocanda|Bondoukou|Bongouanou|Bouafle|Bouake|Bouna|Boundiali|Dabakala|Dabon|Daloa|Danane|Daoukro|Dimbokro|Divo|Duekoue|Ferkessedougou|Gagnoa|Grand Bassam|Grand-Lahou|Guiglo|Issia|Jacqueville|Katiola|Korhogo|Lakota|Man|Mankono|Mbahiakro|Odienne|Oume|Sakassou|San-Pedro|Sassandra|Seguela|Sinfra|Soubre|Tabou|Tanda|Tiassale|Tiebissou|Tingrela|Touba|Toulepleu|Toumodi|Vavoua|Yamoussoukro|Zuenoula";
s_a[55] = "Bjelovarsko-Bilogorska Zupanija|Brodsko-Posavska Zupanija|Dubrovacko-Neretvanska Zupanija|Istarska Zupanija|Karlovacka Zupanija|Koprivnicko-Krizevacka Zupanija|Krapinsko-Zagorska Zupanija|Licko-Senjska Zupanija|Medimurska Zupanija|Osjecko-Baranjska Zupanija|Pozesko-Slavonska Zupanija|Primorsko-Goranska Zupanija|Sibensko-Kninska Zupanija|Sisacko-Moslavacka Zupanija|Splitsko-Dalmatinska Zupanija|Varazdinska Zupanija|Viroviticko-Podravska Zupanija|Vukovarsko-Srijemska Zupanija|Zadarska Zupanija|Zagreb|Zagrebacka Zupanija";
s_a[56] = "Camaguey|Ciego de Avila|Cienfuegos|Ciudad de La Habana|Granma|Guantanamo|Holguin|Isla de la Juventud|La Habana|Las Tunas|Matanzas|Pinar del Rio|Sancti Spiritus|Santiago de Cuba|Villa Clara";
s_a[57] = "Famagusta|Kyrenia|Larnaca|Limassol|Nicosia|Paphos";
s_a[58] = "Brnensky|Budejovicky|Jihlavsky|Karlovarsky|Kralovehradecky|Liberecky|Olomoucky|Ostravsky|Pardubicky|Plzensky|Praha|Stredocesky|Ustecky|Zlinsky";
s_a[59] = "Arhus|Bornholm|Fredericksberg|Frederiksborg|Fyn|Kobenhavn|Kobenhavns|Nordjylland|Ribe|Ringkobing|Roskilde|Sonderjylland|Storstrom|Vejle|Vestsjalland|Viborg";
s_a[60] = "'Ali Sabih|Dikhil|Djibouti|Obock|Tadjoura";
s_a[61] = "Saint Andrew|Saint David|Saint George|Saint John|Saint Joseph|Saint Luke|Saint Mark|Saint Patrick|Saint Paul|Saint Peter";
s_a[62] = "Azua|Baoruco|Barahona|Dajabon|Distrito Nacional|Duarte|El Seibo|Elias Pina|Espaillat|Hato Mayor|Independencia|La Altagracia|La Romana|La Vega|Maria Trinidad Sanchez|Monsenor Nouel|Monte Cristi|Monte Plata|Pedernales|Peravia|Puerto Plata|Salcedo|Samana|San Cristobal|San Juan|San Pedro de Macoris|Sanchez Ramirez|Santiago|Santiago Rodriguez|Valverde";
// <!-- -->
s_a[63] = "Azuay|Bolivar|Canar|Carchi|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Galapagos|Guayas|Imbabura|Loja|Los Rios|Manabi|Morona-Santiago|Napo|Orellana|Pastaza|Pichincha|Sucumbios|Tungurahua|Zamora-Chinchipe";
s_a[64] = "Ad Daqahliyah|Al Bahr al Ahmar|Al Buhayrah|Al Fayyum|Al Gharbiyah|Al Iskandariyah|Al Isma'iliyah|Al Jizah|Al Minufiyah|Al Minya|Al Qahirah|Al Qalyubiyah|Al Wadi al Jadid|As Suways|Ash Sharqiyah|Aswan|Asyut|Bani Suwayf|Bur Sa'id|Dumyat|Janub Sina'|Kafr ash Shaykh|Matruh|Qina|Shamal Sina'|Suhaj";
s_a[65] = "Ahuachapan|Cabanas|Chalatenango|Cuscatlan|La Libertad|La Paz|La Union|Morazan|San Miguel|San Salvador|San Vicente|Santa Ana|Sonsonate|Usulutan";
s_a[66] = "Annobon|Bioko Norte|Bioko Sur|Centro Sur|Kie-Ntem|Litoral|Wele-Nzas";
s_a[67] = "Akale Guzay|Barka|Denkel|Hamasen|Sahil|Semhar|Senhit|Seraye";
s_a[68] = "Harjumaa (Tallinn)|Hiiumaa (Kardla)|Ida-Virumaa (Johvi)|Jarvamaa (Paide)|Jogevamaa (Jogeva)|Laane-Virumaa (Rakvere)|Laanemaa (Haapsalu)|Parnumaa (Parnu)|Polvamaa (Polva)|Raplamaa (Rapla)|Saaremaa (Kuessaare)|Tartumaa (Tartu)|Valgamaa (Valga)|Viljandimaa (Viljandi)|Vorumaa (Voru)"
s_a[69] = "Adis Abeba (Addis Ababa)|Afar|Amara|Dire Dawa|Gambela Hizboch|Hareri Hizb|Oromiya|Sumale|Tigray|YeDebub Biheroch Bihereseboch na Hizboch";
s_a[70] = "Europa Island";
s_a[71] = "Falkland Islands (Islas Malvinas)"
s_a[72] = "Bordoy|Eysturoy|Mykines|Sandoy|Skuvoy|Streymoy|Suduroy|Tvoroyri|Vagar";
s_a[73] = "Central|Eastern|Northern|Rotuma|Western";
s_a[74] = "Aland|Etela-Suomen Laani|Ita-Suomen Laani|Lansi-Suomen Laani|Lappi|Oulun Laani";
s_a[75] = "Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes";
s_a[76] = "French Guiana";
s_a[77] = "Archipel des Marquises|Archipel des Tuamotu|Archipel des Tubuai|Iles du Vent|Iles Sous-le-Vent";
s_a[78] = "Adelie Land|Ile Crozet|Iles Kerguelen|Iles Saint-Paul et Amsterdam";
s_a[79] = "Estuaire|Haut-Ogooue|Moyen-Ogooue|Ngounie|Nyanga|Ogooue-Ivindo|Ogooue-Lolo|Ogooue-Maritime|Woleu-Ntem";
s_a[80] = "Banjul|Central River|Lower River|North Bank|Upper River|Western";
s_a[81] = "Gaza Strip";
s_a[82] = "Abashis|Abkhazia or Ap'khazet'is Avtonomiuri Respublika (Sokhumi)|Adigenis|Ajaria or Acharis Avtonomiuri Respublika (Bat'umi)|Akhalgoris|Akhalk'alak'is|Akhalts'ikhis|Akhmetis|Ambrolauris|Aspindzis|Baghdat'is|Bolnisis|Borjomis|Ch'khorotsqus|Ch'okhatauris|Chiat'ura|Dedop'listsqaros|Dmanisis|Dushet'is|Gardabanis|Gori|Goris|Gurjaanis|Javis|K'arelis|K'ut'aisi|Kaspis|Kharagaulis|Khashuris|Khobis|Khonis|Lagodekhis|Lanch'khut'is|Lentekhis|Marneulis|Martvilis|Mestiis|Mts'khet'is|Ninotsmindis|Onis|Ozurget'is|P'ot'i|Qazbegis|Qvarlis|Rust'avi|Sach'kheris|Sagarejos|Samtrediis|Senakis|Sighnaghis|T'bilisi|T'elavis|T'erjolis|T'et'ritsqaros|T'ianet'is|Tqibuli|Ts'ageris|Tsalenjikhis|Tsalkis|Tsqaltubo|Vanis|Zestap'onis|Zugdidi|Zugdidis";
s_a[83] = "Baden-Wuerttemberg|Bayern|Berlin|Brandenburg|Bremen|Hamburg|Hessen|Mecklenburg-Vorpommern|Niedersachsen|Nordrhein-Westfalen|Rheinland-Pfalz|Saarland|Sachsen|Sachsen-Anhalt|Schleswig-Holstein|Thueringen";
s_a[84] = "Ashanti|Brong-Ahafo|Central|Eastern|Greater Accra|Northern|Upper East|Upper West|Volta|Western";
s_a[85] = "Gibraltar";
s_a[86] = "Ile du Lys|Ile Glorieuse";
s_a[87] = "Aitolia kai Akarnania|Akhaia|Argolis|Arkadhia|Arta|Attiki|Ayion Oros (Mt. Athos)|Dhodhekanisos|Drama|Evritania|Evros|Evvoia|Florina|Fokis|Fthiotis|Grevena|Ilia|Imathia|Ioannina|Irakleion|Kardhitsa|Kastoria|Kavala|Kefallinia|Kerkyra|Khalkidhiki|Khania|Khios|Kikladhes|Kilkis|Korinthia|Kozani|Lakonia|Larisa|Lasithi|Lesvos|Levkas|Magnisia|Messinia|Pella|Pieria|Preveza|Rethimni|Rodhopi|Samos|Serrai|Thesprotia|Thessaloniki|Trikala|Voiotia|Xanthi|Zakinthos";
s_a[88] = "Avannaa (Nordgronland)|Kitaa (Vestgronland)|Tunu (Ostgronland)"
s_a[89] = "Carriacou and Petit Martinique|Saint Andrew|Saint David|Saint George|Saint John|Saint Mark|Saint Patrick";
s_a[90] = "Basse-Terre|Grande-Terre|Iles de la Petite Terre|Iles des Saintes|Marie-Galante";
s_a[91] = "Guam";
s_a[92] = "Alta Verapaz|Baja Verapaz|Chimaltenango|Chiquimula|El Progreso|Escuintla|Guatemala|Huehuetenango|Izabal|Jalapa|Jutiapa|Peten|Quetzaltenango|Quiche|Retalhuleu|Sacatepequez|San Marcos|Santa Rosa|Solola|Suchitepequez|Totonicapan|Zacapa";
s_a[93] = "Castel|Forest|St. Andrew|St. Martin|St. Peter Port|St. Pierre du Bois|St. Sampson|St. Saviour|Torteval|Vale";
s_a[94] = "Beyla|Boffa|Boke|Conakry|Coyah|Dabola|Dalaba|Dinguiraye|Dubreka|Faranah|Forecariah|Fria|Gaoual|Gueckedou|Kankan|Kerouane|Kindia|Kissidougou|Koubia|Koundara|Kouroussa|Labe|Lelouma|Lola|Macenta|Mali|Mamou|Mandiana|Nzerekore|Pita|Siguiri|Telimele|Tougue|Yomou";
s_a[95] = "Bafata|Biombo|Bissau|Bolama-Bijagos|Cacheu|Gabu|Oio|Quinara|Tombali";
s_a[96] = "Barima-Waini|Cuyuni-Mazaruni|Demerara-Mahaica|East Berbice-Corentyne|Essequibo Islands-West Demerara|Mahaica-Berbice|Pomeroon-Supenaam|Potaro-Siparuni|Upper Demerara-Berbice|Upper Takutu-Upper Essequibo";
s_a[97] = "Artibonite|Centre|Grand'Anse|Nord|Nord-Est|Nord-Ouest|Ouest|Sud|Sud-Est";
s_a[98] = "Heard Island and McDonald Islands";
s_a[99] = "Holy See (Vatican City)"
s_a[100] = "Atlantida|Choluteca|Colon|Comayagua|Copan|Cortes|El Paraiso|Francisco Morazan|Gracias a Dios|Intibuca|Islas de la Bahia|La Paz|Lempira|Ocotepeque|Olancho|Santa Barbara|Valle|Yoro";
s_a[101] = "Hong Kong";
s_a[102] = "Howland Island";
s_a[103] = "Bacs-Kiskun|Baranya|Bekes|Bekescsaba|Borsod-Abauj-Zemplen|Budapest|Csongrad|Debrecen|Dunaujvaros|Eger|Fejer|Gyor|Gyor-Moson-Sopron|Hajdu-Bihar|Heves|Hodmezovasarhely|Jasz-Nagykun-Szolnok|Kaposvar|Kecskemet|Komarom-Esztergom|Miskolc|Nagykanizsa|Nograd|Nyiregyhaza|Pecs|Pest|Somogy|Sopron|Szabolcs-Szatmar-Bereg|Szeged|Szekesfehervar|Szolnok|Szombathely|Tatabanya|Tolna|Vas|Veszprem|Veszprem|Zala|Zalaegerszeg";
s_a[104] = "Akranes|Akureyri|Arnessysla|Austur-Bardhastrandarsysla|Austur-Hunavatnssysla|Austur-Skaftafellssysla|Borgarfjardharsysla|Dalasysla|Eyjafjardharsysla|Gullbringusysla|Hafnarfjordhur|Husavik|Isafjordhur|Keflavik|Kjosarsysla|Kopavogur|Myrasysla|Neskaupstadhur|Nordhur-Isafjardharsysla|Nordhur-Mulasys-la|Nordhur-Thingeyjarsysla|Olafsfjordhur|Rangarvallasysla|Reykjavik|Saudharkrokur|Seydhisfjordhur|Siglufjordhur|Skagafjardharsysla|Snaefellsnes-og Hnappadalssysla|Strandasysla|Sudhur-Mulasysla|Sudhur-Thingeyjarsysla|Vesttmannaeyjar|Vestur-Bardhastrandarsysla|Vestur-Hunavatnssysla|Vestur-Isafjardharsysla|Vestur-Skaftafellssysla";
s_a[105] = "Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Lakshadweep|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Orissa|Pondicherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttaranchal|West Bengal";
s_a[106] = "Aceh|Bali|Banten|Bengkulu|East Timor|Gorontalo|Irian Jaya|Jakarta Raya|Jambi|Jawa Barat|Jawa Tengah|Jawa Timur|Kalimantan Barat|Kalimantan Selatan|Kalimantan Tengah|Kalimantan Timur|Kepulauan Bangka Belitung|Lampung|Maluku|Maluku Utara|Nusa Tenggara Barat|Nusa Tenggara Timur|Riau|Sulawesi Selatan|Sulawesi Tengah|Sulawesi Tenggara|Sulawesi Utara|Sumatera Barat|Sumatera Selatan|Sumatera Utara|Yogyakarta";
s_a[107] = "Ardabil|Azarbayjan-e Gharbi|Azarbayjan-e Sharqi|Bushehr|Chahar Mahall va Bakhtiari|Esfahan|Fars|Gilan|Golestan|Hamadan|Hormozgan|Ilam|Kerman|Kermanshah|Khorasan|Khuzestan|Kohgiluyeh va Buyer Ahmad|Kordestan|Lorestan|Markazi|Mazandaran|Qazvin|Qom|Semnan|Sistan va Baluchestan|Tehran|Yazd|Zanjan";
s_a[108] = "Al Anbar|Al Basrah|Al Muthanna|Al Qadisiyah|An Najaf|Arbil|As Sulaymaniyah|At Ta'mim|Babil|Baghdad|Dahuk|Dhi Qar|Diyala|Karbala'|Maysan|Ninawa|Salah ad Din|Wasit";
s_a[109] = "Carlow|Cavan|Clare|Cork|Donegal|Dublin|Galway|Kerry|Kildare|Kilkenny|Laois|Leitrim|Limerick|Longford|Louth|Mayo|Meath|Monaghan|Offaly|Roscommon|Sligo|Tipperary|Waterford|Westmeath|Wexford|Wicklow";
s_a[110] = "Antrim|Ards|Armagh|Ballymena|Ballymoney|Banbridge|Belfast|Carrickfergus|Castlereagh|Coleraine|Cookstown|Craigavon|Derry|Down|Dungannon|Fermanagh|Larne|Limavady|Lisburn|Magherafelt|Moyle|Newry and Mourne|Newtownabbey|North Down|Omagh|Strabane";
s_a[111] = "Central|Haifa|Jerusalem|Northern|Southern|Tel Aviv";
s_a[112] = "Abruzzo|Basilicata|Calabria|Campania|Emilia-Romagna|Friuli-Venezia Giulia|Lazio|Liguria|Lombardia|Marche|Molise|Piemonte|Puglia|Sardegna|Sicilia|Toscana|Trentino-Alto Adige|Umbria|Valle d'Aosta|Veneto";
s_a[113] = "Clarendon|Hanover|Kingston|Manchester|Portland|Saint Andrew|Saint Ann|Saint Catherine|Saint Elizabeth|Saint James|Saint Mary|Saint Thomas|Trelawny|Westmoreland";
s_a[114] = "Jan Mayen";
s_a[115] = "Aichi|Akita|Aomori|Chiba|Ehime|Fukui|Fukuoka|Fukushima|Gifu|Gumma|Hiroshima|Hokkaido|Hyogo|Ibaraki|Ishikawa|Iwate|Kagawa|Kagoshima|Kanagawa|Kochi|Kumamoto|Kyoto|Mie|Miyagi|Miyazaki|Nagano|Nagasaki|Nara|Niigata|Oita|Okayama|Okinawa|Osaka|Saga|Saitama|Shiga|Shimane|Shizuoka|Tochigi|Tokushima|Tokyo|Tottori|Toyama|Wakayama|Yamagata|Yamaguchi|Yamanashi";
s_a[116] = "Jarvis Island";
s_a[117] = "Jersey";
s_a[118] = "Johnston Atoll";
s_a[119] = "'Amman|Ajlun|Al 'Aqabah|Al Balqa'|Al Karak|Al Mafraq|At Tafilah|Az Zarqa'|Irbid|Jarash|Ma'an|Madaba";
s_a[120] = "Juan de Nova Island";
s_a[121] = "Almaty|Aqmola|Aqtobe|Astana|Atyrau|Batys Qazaqstan|Bayqongyr|Mangghystau|Ongtustik Qazaqstan|Pavlodar|Qaraghandy|Qostanay|Qyzylorda|Shyghys Qazaqstan|Soltustik Qazaqstan|Zhambyl";
s_a[122] = "Central|Coast|Eastern|Nairobi Area|North Eastern|Nyanza|Rift Valley|Western";
s_a[123] = "Abaiang|Abemama|Aranuka|Arorae|Banaba|Banaba|Beru|Butaritari|Central Gilberts|Gilbert Islands|Kanton|Kiritimati|Kuria|Line Islands|Line Islands|Maiana|Makin|Marakei|Nikunau|Nonouti|Northern Gilberts|Onotoa|Phoenix Islands|Southern Gilberts|Tabiteuea|Tabuaeran|Tamana|Tarawa|Tarawa|Teraina";
s_a[124] = "Chagang-do (Chagang Province)|Hamgyong-bukto (North Hamgyong Province)|Hamgyong-namdo (South Hamgyong Province)|Hwanghae-bukto (North Hwanghae Province)|Hwanghae-namdo (South Hwanghae Province)|Kaesong-si (Kaesong City)|Kangwon-do (Kangwon Province)|Namp'o-si (Namp'o City)|P'yongan-bukto (North P'yongan Province)|P'yongan-namdo (South P'yongan Province)|P'yongyang-si (P'yongyang City)|Yanggang-do (Yanggang Province)"
s_a[125] = "Ch'ungch'ong-bukto|Ch'ungch'ong-namdo|Cheju-do|Cholla-bukto|Cholla-namdo|Inch'on-gwangyoksi|Kangwon-do|Kwangju-gwangyoksi|Kyonggi-do|Kyongsang-bukto|Kyongsang-namdo|Pusan-gwangyoksi|Soul-t'ukpyolsi|Taegu-gwangyoksi|Taejon-gwangyoksi|Ulsan-gwangyoksi";
s_a[126] = "Al 'Asimah|Al Ahmadi|Al Farwaniyah|Al Jahra'|Hawalli";
s_a[127] = "Batken Oblasty|Bishkek Shaary|Chuy Oblasty (Bishkek)|Jalal-Abad Oblasty|Naryn Oblasty|Osh Oblasty|Talas Oblasty|Ysyk-Kol Oblasty (Karakol)"
s_a[128] = "Attapu|Bokeo|Bolikhamxai|Champasak|Houaphan|Khammouan|Louangnamtha|Louangphabang|Oudomxai|Phongsali|Salavan|Savannakhet|Viangchan|Viangchan|Xaignabouli|Xaisomboun|Xekong|Xiangkhoang";
s_a[129] = "Aizkraukles Rajons|Aluksnes Rajons|Balvu Rajons|Bauskas Rajons|Cesu Rajons|Daugavpils|Daugavpils Rajons|Dobeles Rajons|Gulbenes Rajons|Jekabpils Rajons|Jelgava|Jelgavas Rajons|Jurmala|Kraslavas Rajons|Kuldigas Rajons|Leipaja|Liepajas Rajons|Limbazu Rajons|Ludzas Rajons|Madonas Rajons|Ogres Rajons|Preilu Rajons|Rezekne|Rezeknes Rajons|Riga|Rigas Rajons|Saldus Rajons|Talsu Rajons|Tukuma Rajons|Valkas Rajons|Valmieras Rajons|Ventspils|Ventspils Rajons";
s_a[130] = "Beyrouth|Ech Chimal|Ej Jnoub|El Bekaa|Jabal Loubnane";
s_a[131] = "Berea|Butha-Buthe|Leribe|Mafeteng|Maseru|Mohales Hoek|Mokhotlong|Qacha's Nek|Quthing|Thaba-Tseka";
s_a[132] = "Bomi|Bong|Grand Bassa|Grand Cape Mount|Grand Gedeh|Grand Kru|Lofa|Margibi|Maryland|Montserrado|Nimba|River Cess|Sinoe";
s_a[133] = "Ajdabiya|Al 'Aziziyah|Al Fatih|Al Jabal al Akhdar|Al Jufrah|Al Khums|Al Kufrah|An Nuqat al Khams|Ash Shati'|Awbari|Az Zawiyah|Banghazi|Darnah|Ghadamis|Gharyan|Misratah|Murzuq|Sabha|Sawfajjin|Surt|Tarabulus|Tarhunah|Tubruq|Yafran|Zlitan";
s_a[134] = "Balzers|Eschen|Gamprin|Mauren|Planken|Ruggell|Schaan|Schellenberg|Triesen|Triesenberg|Vaduz";
s_a[135] = "Akmenes Rajonas|Alytaus Rajonas|Alytus|Anyksciu Rajonas|Birstonas|Birzu Rajonas|Druskininkai|Ignalinos Rajonas|Jonavos Rajonas|Joniskio Rajonas|Jurbarko Rajonas|Kaisiadoriu Rajonas|Kaunas|Kauno Rajonas|Kedainiu Rajonas|Kelmes Rajonas|Klaipeda|Klaipedos Rajonas|Kretingos Rajonas|Kupiskio Rajonas|Lazdiju Rajonas|Marijampole|Marijampoles Rajonas|Mazeikiu Rajonas|Moletu Rajonas|Neringa Pakruojo Rajonas|Palanga|Panevezio Rajonas|Panevezys|Pasvalio Rajonas|Plunges Rajonas|Prienu Rajonas|Radviliskio Rajonas|Raseiniu Rajonas|Rokiskio Rajonas|Sakiu Rajonas|Salcininku Rajonas|Siauliai|Siauliu Rajonas|Silales Rajonas|Silutes Rajonas|Sirvintu Rajonas|Skuodo Rajonas|Svencioniu Rajonas|Taurages Rajonas|Telsiu Rajonas|Traku Rajonas|Ukmerges Rajonas|Utenos Rajonas|Varenos Rajonas|Vilkaviskio Rajonas|Vilniaus Rajonas|Vilnius|Zarasu Rajonas";
s_a[136] = "Diekirch|Grevenmacher|Luxembourg";
s_a[137] = "Macau";
s_a[138] = "Aracinovo|Bac|Belcista|Berovo|Bistrica|Bitola|Blatec|Bogdanci|Bogomila|Bogovinje|Bosilovo|Brvenica|Cair (Skopje)|Capari|Caska|Cegrane|Centar (Skopje)|Centar Zupa|Cesinovo|Cucer-Sandevo|Debar|Delcevo|Delogozdi|Demir Hisar|Demir Kapija|Dobrusevo|Dolna Banjica|Dolneni|Dorce Petrov (Skopje)|Drugovo|Dzepciste|Gazi Baba (Skopje)|Gevgelija|Gostivar|Gradsko|Ilinden|Izvor|Jegunovce|Kamenjane|Karbinci|Karpos (Skopje)|Kavadarci|Kicevo|Kisela Voda (Skopje)|Klecevce|Kocani|Konce|Kondovo|Konopiste|Kosel|Kratovo|Kriva Palanka|Krivogastani|Krusevo|Kuklis|Kukurecani|Kumanovo|Labunista|Lipkovo|Lozovo|Lukovo|Makedonska Kamenica|Makedonski Brod|Mavrovi Anovi|Meseista|Miravci|Mogila|Murtino|Negotino|Negotino-Poloska|Novaci|Novo Selo|Oblesevo|Ohrid|Orasac|Orizari|Oslomej|Pehcevo|Petrovec|Plasnia|Podares|Prilep|Probistip|Radovis|Rankovce|Resen|Rosoman|Rostusa|Samokov|Saraj|Sipkovica|Sopiste|Sopotnika|Srbinovo|Star Dojran|Staravina|Staro Nagoricane|Stip|Struga|Strumica|Studenicani|Suto Orizari (Skopje)|Sveti Nikole|Tearce|Tetovo|Topolcani|Valandovo|Vasilevo|Veles|Velesta|Vevcani|Vinica|Vitoliste|Vranestica|Vrapciste|Vratnica|Vrutok|Zajas|Zelenikovo|Zileno|Zitose|Zletovo|Zrnovci";
s_a[139] = "Antananarivo|Antsiranana|Fianarantsoa|Mahajanga|Toamasina|Toliara";
s_a[140] = "Balaka|Blantyre|Chikwawa|Chiradzulu|Chitipa|Dedza|Dowa|Karonga|Kasungu|Likoma|Lilongwe|Machinga (Kasupe)|Mangochi|Mchinji|Mulanje|Mwanza|Mzimba|Nkhata Bay|Nkhotakota|Nsanje|Ntcheu|Ntchisi|Phalombe|Rumphi|Salima|Thyolo|Zomba";
s_a[141] = "Johor|Kedah|Kelantan|Labuan|Melaka|Negeri Sembilan|Pahang|Perak|Perlis|Pulau Pinang|Sabah|Sarawak|Selangor|Terengganu|Wilayah Persekutuan";
s_a[142] = "Alifu|Baa|Dhaalu|Faafu|Gaafu Alifu|Gaafu Dhaalu|Gnaviyani|Haa Alifu|Haa Dhaalu|Kaafu|Laamu|Lhaviyani|Maale|Meemu|Noonu|Raa|Seenu|Shaviyani|Thaa|Vaavu";
s_a[143] = "Gao|Kayes|Kidal|Koulikoro|Mopti|Segou|Sikasso|Tombouctou";
s_a[144] = "Valletta";
s_a[145] = "Man, Isle of";
s_a[146] = "Ailinginae|Ailinglaplap|Ailuk|Arno|Aur|Bikar|Bikini|Bokak|Ebon|Enewetak|Erikub|Jabat|Jaluit|Jemo|Kili|Kwajalein|Lae|Lib|Likiep|Majuro|Maloelap|Mejit|Mili|Namorik|Namu|Rongelap|Rongrik|Toke|Ujae|Ujelang|Utirik|Wotho|Wotje";
s_a[147] = "Martinique";
s_a[148] = "Adrar|Assaba|Brakna|Dakhlet Nouadhibou|Gorgol|Guidimaka|Hodh Ech Chargui|Hodh El Gharbi|Inchiri|Nouakchott|Tagant|Tiris Zemmour|Trarza";
s_a[149] = "Agalega Islands|Black River|Cargados Carajos Shoals|Flacq|Grand Port|Moka|Pamplemousses|Plaines Wilhems|Port Louis|Riviere du Rempart|Rodrigues|Savanne";
s_a[150] = "Mayotte";
s_a[151] = "Yucatan|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Aguascalientes|Zacatecas";
s_a[152] = "Chuuk (Truk)|Kosrae|Pohnpei|Yap";
s_a[153] = "Midway Islands";
s_a[154] = "Balti|Cahul|Chisinau|Chisinau|Dubasari|Edinet|Gagauzia|Lapusna|Orhei|Soroca|Tighina|Ungheni";
s_a[155] = "Fontvieille|La Condamine|Monaco-Ville|Monte-Carlo";
s_a[156] = "Arhangay|Bayan-Olgiy|Bayanhongor|Bulgan|Darhan|Dornod|Dornogovi|Dundgovi|Dzavhan|Erdenet|Govi-Altay|Hentiy|Hovd|Hovsgol|Omnogovi|Ovorhangay|Selenge|Suhbaatar|Tov|Ulaanbaatar|Uvs";
s_a[157] = "Saint Anthony|Saint Georges|Saint Peter's";
s_a[158] = "Agadir|Al Hoceima|Azilal|Ben Slimane|Beni Mellal|Boulemane|Casablanca|Chaouen|El Jadida|El Kelaa des Srarhna|Er Rachidia|Essaouira|Fes|Figuig|Guelmim|Ifrane|Kenitra|Khemisset|Khenifra|Khouribga|Laayoune|Larache|Marrakech|Meknes|Nador|Ouarzazate|Oujda|Rabat-Sale|Safi|Settat|Sidi Kacem|Tan-Tan|Tanger|Taounate|Taroudannt|Tata|Taza|Tetouan|Tiznit";
s_a[159] = "Cabo Delgado|Gaza|Inhambane|Manica|Maputo|Nampula|Niassa|Sofala|Tete|Zambezia";
s_a[160] = "Caprivi|Erongo|Hardap|Karas|Khomas|Kunene|Ohangwena|Okavango|Omaheke|Omusati|Oshana|Oshikoto|Otjozondjupa";
s_a[161] = "Aiwo|Anabar|Anetan|Anibare|Baiti|Boe|Buada|Denigomodu|Ewa|Ijuw|Meneng|Nibok|Uaboe|Yaren";
s_a[162] = "Bagmati|Bheri|Dhawalagiri|Gandaki|Janakpur|Karnali|Kosi|Lumbini|Mahakali|Mechi|Narayani|Rapti|Sagarmatha|Seti";
s_a[163] = "Drenthe|Flevoland|Friesland|Gelderland|Groningen|Limburg|Noord-Brabant|Noord-Holland|Overijssel|Utrecht|Zeeland|Zuid-Holland";
s_a[164] = "Netherlands Antilles";
s_a[165] = "Iles Loyaute|Nord|Sud";
s_a[166] = "Akaroa|Amuri|Ashburton|Bay of Islands|Bruce|Buller|Chatham Islands|Cheviot|Clifton|Clutha|Cook|Dannevirke|Egmont|Eketahuna|Ellesmere|Eltham|Eyre|Featherston|Franklin|Golden Bay|Great Barrier Island|Grey|Hauraki Plains|Hawera|Hawke's Bay|Heathcote|Hikurangi|Hobson|Hokianga|Horowhenua|Hurunui|Hutt|Inangahua|Inglewood|Kaikoura|Kairanga|Kiwitea|Lake|Mackenzie|Malvern|Manaia|Manawatu|Mangonui|Maniototo|Marlborough|Masterton|Matamata|Mount Herbert|Ohinemuri|Opotiki|Oroua|Otamatea|Otorohanga|Oxford|Pahiatua|Paparua|Patea|Piako|Pohangina|Raglan|Rangiora|Rangitikei|Rodney|Rotorua|Runanga|Saint Kilda|Silverpeaks|Southland|Stewart Island|Stratford|Strathallan|Taranaki|Taumarunui|Taupo|Tauranga|Thames-Coromandel|Tuapeka|Vincent|Waiapu|Waiheke|Waihemo|Waikato|Waikohu|Waimairi|Waimarino|Waimate|Waimate West|Waimea|Waipa|Waipawa|Waipukurau|Wairarapa South|Wairewa|Wairoa|Waitaki|Waitomo|Waitotara|Wallace|Wanganui|Waverley|Westland|Whakatane|Whangarei|Whangaroa|Woodville";
s_a[167] = "Atlantico Norte|Atlantico Sur|Boaco|Carazo|Chinandega|Chontales|Esteli|Granada|Jinotega|Leon|Madriz|Managua|Masaya|Matagalpa|Nueva Segovia|Rio San Juan|Rivas";
s_a[168] = "Agadez|Diffa|Dosso|Maradi|Niamey|Tahoua|Tillaberi|Zinder";
s_a[169] = "Abia|Abuja Federal Capital Territory|Adamawa|Akwa Ibom|Anambra|Bauchi|Bayelsa|Benue|Borno|Cross River|Delta|Ebonyi|Edo|Ekiti|Enugu|Gombe|Imo|Jigawa|Kaduna|Kano|Katsina|Kebbi|Kogi|Kwara|Lagos|Nassarawa|Niger|Ogun|Ondo|Osun|Oyo|Plateau|Rivers|Sokoto|Taraba|Yobe|Zamfara";
s_a[170] = "Niue";
s_a[171] = "Norfolk Island";
s_a[172] = "Northern Islands|Rota|Saipan|Tinian";
s_a[173] = "Akershus|Aust-Agder|Buskerud|Finnmark|Hedmark|Hordaland|More og Romsdal|Nord-Trondelag|Nordland|Oppland|Oslo|Ostfold|Rogaland|Sogn og Fjordane|Sor-Trondelag|Telemark|Troms|Vest-Agder|Vestfold";
s_a[174] = "Ad Dakhiliyah|Al Batinah|Al Wusta|Ash Sharqiyah|Az Zahirah|Masqat|Musandam|Zufar";
s_a[175] = "Balochistan|Federally Administered Tribal Areas|Islamabad Capital Territory|North-West Frontier Province|Punjab|Sindh";
s_a[176] = "Aimeliik|Airai|Angaur|Hatobohei|Kayangel|Koror|Melekeok|Ngaraard|Ngarchelong|Ngardmau|Ngatpang|Ngchesar|Ngeremlengui|Ngiwal|Palau Island|Peleliu|Sonsoral|Tobi";
s_a[177] = "Bocas del Toro|Chiriqui|Cocle|Colon|Darien|Herrera|Los Santos|Panama|San Blas|Veraguas";
s_a[178] = "Bougainville|Central|Chimbu|East New Britain|East Sepik|Eastern Highlands|Enga|Gulf|Madang|Manus|Milne Bay|Morobe|National Capital|New Ireland|Northern|Sandaun|Southern Highlands|West New Britain|Western|Western Highlands";
s_a[179] = "Alto Paraguay|Alto Parana|Amambay|Asuncion (city)|Boqueron|Caaguazu|Caazapa|Canindeyu|Central|Concepcion|Cordillera|Guaira|Itapua|Misiones|Neembucu|Paraguari|Presidente Hayes|San Pedro";
s_a[180] = "Amazonas|Ancash|Apurimac|Arequipa|Ayacucho|Cajamarca|Callao|Cusco|Huancavelica|Huanuco|Ica|Junin|La Libertad|Lambayeque|Lima|Loreto|Madre de Dios|Moquegua|Pasco|Piura|Puno|San Martin|Tacna|Tumbes|Ucayali";
s_a[181] = "Abra|Agusan del Norte|Agusan del Sur|Aklan|Albay|Angeles|Antique|Aurora|Bacolod|Bago|Baguio|Bais|Basilan|Basilan City|Bataan|Batanes|Batangas|Batangas City|Benguet|Bohol|Bukidnon|Bulacan|Butuan|Cabanatuan|Cadiz|Cagayan|Cagayan de Oro|Calbayog|Caloocan|Camarines Norte|Camarines Sur|Camiguin|Canlaon|Capiz|Catanduanes|Cavite|Cavite City|Cebu|Cebu City|Cotabato|Dagupan|Danao|Dapitan|Davao City Davao|Davao del Sur|Davao Oriental|Dipolog|Dumaguete|Eastern Samar|General Santos|Gingoog|Ifugao|Iligan|Ilocos Norte|Ilocos Sur|Iloilo|Iloilo City|Iriga|Isabela|Kalinga-Apayao|La Carlota|La Union|Laguna|Lanao del Norte|Lanao del Sur|Laoag|Lapu-Lapu|Legaspi|Leyte|Lipa|Lucena|Maguindanao|Mandaue|Manila|Marawi|Marinduque|Masbate|Mindoro Occidental|Mindoro Oriental|Misamis Occidental|Misamis Oriental|Mountain|Naga|Negros Occidental|Negros Oriental|North Cotabato|Northern Samar|Nueva Ecija|Nueva Vizcaya|Olongapo|Ormoc|Oroquieta|Ozamis|Pagadian|Palawan|Palayan|Pampanga|Pangasinan|Pasay|Puerto Princesa|Quezon|Quezon City|Quirino|Rizal|Romblon|Roxas|Samar|San Carlos (in Negros Occidental)|San Carlos (in Pangasinan)|San Jose|San Pablo|Silay|Siquijor|Sorsogon|South Cotabato|Southern Leyte|Sultan Kudarat|Sulu|Surigao|Surigao del Norte|Surigao del Sur|Tacloban|Tagaytay|Tagbilaran|Tangub|Tarlac|Tawitawi|Toledo|Trece Martires|Zambales|Zamboanga|Zamboanga del Norte|Zamboanga del Sur";
s_a[182] = "Pitcaim Islands";
s_a[183] = "Dolnoslaskie|Kujawsko-Pomorskie|Lodzkie|Lubelskie|Lubuskie|Malopolskie|Mazowieckie|Opolskie|Podkarpackie|Podlaskie|Pomorskie|Slaskie|Swietokrzyskie|Warminsko-Mazurskie|Wielkopolskie|Zachodniopomorskie";
s_a[184] = "Acores (Azores)|Aveiro|Beja|Braga|Braganca|Castelo Branco|Coimbra|Evora|Faro|Guarda|Leiria|Lisboa|Madeira|Portalegre|Porto|Santarem|Setubal|Viana do Castelo|Vila Real|Viseu";
s_a[185] = "Adjuntas|Aguada|Aguadilla|Aguas Buenas|Aibonito|Anasco|Arecibo|Arroyo|Barceloneta|Barranquitas|Bayamon|Cabo Rojo|Caguas|Camuy|Canovanas|Carolina|Catano|Cayey|Ceiba|Ciales|Cidra|Coamo|Comerio|Corozal|Culebra|Dorado|Fajardo|Florida|Guanica|Guayama|Guayanilla|Guaynabo|Gurabo|Hatillo|Hormigueros|Humacao|Isabela|Jayuya|Juana Diaz|Juncos|Lajas|Lares|Las Marias|Las Piedras|Loiza|Luquillo|Manati|Maricao|Maunabo|Mayaguez|Moca|Morovis|Naguabo|Naranjito|Orocovis|Patillas|Penuelas|Ponce|Quebradillas|Rincon|Rio Grande|Sabana Grande|Salinas|San German|San Juan|San Lorenzo|San Sebastian|Santa Isabel|Toa Alta|Toa Baja|Trujillo Alto|Utuado|Vega Alta|Vega Baja|Vieques|Villalba|Yabucoa|Yauco";
s_a[186] = "Ad Dawhah|Al Ghuwayriyah|Al Jumayliyah|Al Khawr|Al Wakrah|Ar Rayyan|Jarayan al Batinah|Madinat ash Shamal|Umm Salal";
s_a[187] = "Reunion";
s_a[188] = "Alba|Arad|Arges|Bacau|Bihor|Bistrita-Nasaud|Botosani|Braila|Brasov|Bucuresti|Buzau|Calarasi|Caras-Severin|Cluj|Constanta|Covasna|Dimbovita|Dolj|Galati|Giurgiu|Gorj|Harghita|Hunedoara|Ialomita|Iasi|Maramures|Mehedinti|Mures|Neamt|Olt|Prahova|Salaj|Satu Mare|Sibiu|Suceava|Teleorman|Timis|Tulcea|Vaslui|Vilcea|Vrancea";
s_a[189] = "Adygeya (Maykop)|Aginskiy Buryatskiy (Aginskoye)|Altay (Gorno-Altaysk)|Altayskiy (Barnaul)|Amurskaya (Blagoveshchensk)|Arkhangel'skaya|Astrakhanskaya|Bashkortostan (Ufa)|Belgorodskaya|Bryanskaya|Buryatiya (Ulan-Ude)|Chechnya (Groznyy)|Chelyabinskaya|Chitinskaya|Chukotskiy (Anadyr')|Chuvashiya (Cheboksary)|Dagestan (Makhachkala)|Evenkiyskiy (Tura)|Ingushetiya (Nazran')|Irkutskaya|Ivanovskaya|Kabardino-Balkariya (Nal'chik)|Kaliningradskaya|Kalmykiya (Elista)|Kaluzhskaya|Kamchatskaya (Petropavlovsk-Kamchatskiy)|Karachayevo-Cherkesiya (Cherkessk)|Kareliya (Petrozavodsk)|Kemerovskaya|Khabarovskiy|Khakasiya (Abakan)|Khanty-Mansiyskiy (Khanty-Mansiysk)|Kirovskaya|Komi (Syktyvkar)|Komi-Permyatskiy (Kudymkar)|Koryakskiy (Palana)|Kostromskaya|Krasnodarskiy|Krasnoyarskiy|Kurganskaya|Kurskaya|Leningradskaya|Lipetskaya|Magadanskaya|Mariy-El (Yoshkar-Ola)|Mordoviya (Saransk)|Moskovskaya|Moskva (Moscow)|Murmanskaya|Nenetskiy (Nar'yan-Mar)|Nizhegorodskaya|Novgorodskaya|Novosibirskaya|Omskaya|Orenburgskaya|Orlovskaya (Orel)|Penzenskaya|Permskaya|Primorskiy (Vladivostok)|Pskovskaya|Rostovskaya|Ryazanskaya|Sakha (Yakutsk)|Sakhalinskaya (Yuzhno-Sakhalinsk)|Samarskaya|Sankt-Peterburg (Saint Petersburg)|Saratovskaya|Severnaya Osetiya-Alaniya [North Ossetia] (Vladikavkaz)|Smolenskaya|Stavropol'skiy|Sverdlovskaya (Yekaterinburg)|Tambovskaya|Tatarstan (Kazan')|Taymyrskiy (Dudinka)|Tomskaya|Tul'skaya|Tverskaya|Tyumenskaya|Tyva (Kyzyl)|Udmurtiya (Izhevsk)|Ul'yanovskaya|Ust'-Ordynskiy Buryatskiy (Ust'-Ordynskiy)|Vladimirskaya|Volgogradskaya|Vologodskaya|Voronezhskaya|Yamalo-Nenetskiy (Salekhard)|Yaroslavskaya|Yevreyskaya";
s_a[190] = "Butare|Byumba|Cyangugu|Gikongoro|Gisenyi|Gitarama|Kibungo|Kibuye|Kigali Rurale|Kigali-ville|Ruhengeri|Umutara";
s_a[191] = "Ascension|Saint Helena|Tristan da Cunha";
s_a[192] = "Christ Church Nichola Town|Saint Anne Sandy Point|Saint George Basseterre|Saint George Gingerland|Saint James Windward|Saint John Capisterre|Saint John Figtree|Saint Mary Cayon|Saint Paul Capisterre|Saint Paul Charlestown|Saint Peter Basseterre|Saint Thomas Lowland|Saint Thomas Middle Island|Trinity Palmetto Point";
s_a[193] = "Anse-la-Raye|Castries|Choiseul|Dauphin|Dennery|Gros Islet|Laborie|Micoud|Praslin|Soufriere|Vieux Fort";
s_a[194] = "Miquelon|Saint Pierre";
s_a[195] = "Charlotte|Grenadines|Saint Andrew|Saint David|Saint George|Saint Patrick";
s_a[196] = "A'ana|Aiga-i-le-Tai|Atua|Fa'asaleleaga|Gaga'emauga|Gagaifomauga|Palauli|Satupa'itea|Tuamasaga|Va'a-o-Fonoti|Vaisigano";
s_a[197] = "Acquaviva|Borgo Maggiore|Chiesanuova|Domagnano|Faetano|Fiorentino|Monte Giardino|San Marino|Serravalle";
s_a[198] = "Principe|Sao Tome";
s_a[199] = "'Asir|Al Bahah|Al Hudud ash Shamaliyah|Al Jawf|Al Madinah|Al Qasim|Ar Riyad|Ash Sharqiyah (Eastern Province)|Ha'il|Jizan|Makkah|Najran|Tabuk";
s_a[200] = "Aberdeen City|Aberdeenshire|Angus|Argyll and Bute|City of Edinburgh|Clackmannanshire|Dumfries and Galloway|Dundee City|East Ayrshire|East Dunbartonshire|East Lothian|East Renfrewshire|Eilean Siar (Western Isles)|Falkirk|Fife|Glasgow City|Highland|Inverclyde|Midlothian|Moray|North Ayrshire|North Lanarkshire|Orkney Islands|Perth and Kinross|Renfrewshire|Shetland Islands|South Ayrshire|South Lanarkshire|Stirling|The Scottish Borders|West Dunbartonshire|West Lothian";
s_a[201] = "Dakar|Diourbel|Fatick|Kaolack|Kolda|Louga|Saint-Louis|Tambacounda|Thies|Ziguinchor";
s_a[202] = "Anse aux Pins|Anse Boileau|Anse Etoile|Anse Louis|Anse Royale|Baie Lazare|Baie Sainte Anne|Beau Vallon|Bel Air|Bel Ombre|Cascade|Glacis|Grand' Anse (on Mahe)|Grand' Anse (on Praslin)|La Digue|La Riviere Anglaise|Mont Buxton|Mont Fleuri|Plaisance|Pointe La Rue|Port Glaud|Saint Louis|Takamaka";
s_a[203] = "Eastern|Northern|Southern|Western";
s_a[204] = "Singapore";
s_a[205] = "Banskobystricky|Bratislavsky|Kosicky|Nitriansky|Presovsky|Trenciansky|Trnavsky|Zilinsky";
s_a[206] = "Ajdovscina|Beltinci|Bled|Bohinj|Borovnica|Bovec|Brda|Brezice|Brezovica|Cankova-Tisina|Celje|Cerklje na Gorenjskem|Cerknica|Cerkno|Crensovci|Crna na Koroskem|Crnomelj|Destrnik-Trnovska Vas|Divaca|Dobrepolje|Dobrova-Horjul-Polhov Gradec|Dol pri Ljubljani|Domzale|Dornava|Dravograd|Duplek|Gorenja Vas-Poljane|Gorisnica|Gornja Radgona|Gornji Grad|Gornji Petrovci|Grosuplje|Hodos Salovci|Hrastnik|Hrpelje-Kozina|Idrija|Ig|Ilirska Bistrica|Ivancna Gorica|Izola|Jesenice|Jursinci|Kamnik|Kanal|Kidricevo|Kobarid|Kobilje|Kocevje|Komen|Koper|Kozje|Kranj|Kranjska Gora|Krsko|Kungota|Kuzma|Lasko|Lenart|Lendava|Litija|Ljubljana|Ljubno|Ljutomer|Logatec|Loska Dolina|Loski Potok|Luce|Lukovica|Majsperk|Maribor|Medvode|Menges|Metlika|Mezica|Miren-Kostanjevica|Mislinja|Moravce|Moravske Toplice|Mozirje|Murska Sobota|Muta|Naklo|Nazarje|Nova Gorica|Novo Mesto|Odranci|Ormoz|Osilnica|Pesnica|Piran|Pivka|Podcetrtek|Podvelka-Ribnica|Postojna|Preddvor|Ptuj|Puconci|Race-Fram|Radece|Radenci|Radlje ob Dravi|Radovljica|Ravne-Prevalje|Ribnica|Rogasevci|Rogaska Slatina|Rogatec|Ruse|Semic|Sencur|Sentilj|Sentjernej|Sentjur pri Celju|Sevnica|Sezana|Skocjan|Skofja Loka|Skofljica|Slovenj Gradec|Slovenska Bistrica|Slovenske Konjice|Smarje pri Jelsah|Smartno ob Paki|Sostanj|Starse|Store|Sveti Jurij|Tolmin|Trbovlje|Trebnje|Trzic|Turnisce|Velenje|Velike Lasce|Videm|Vipava|Vitanje|Vodice|Vojnik|Vrhnika|Vuzenica|Zagorje ob Savi|Zalec|Zavrc|Zelezniki|Ziri|Zrece";
s_a[207] = "Bellona|Central|Choiseul (Lauru)|Guadalcanal|Honiara|Isabel|Makira|Malaita|Rennell|Temotu|Western";
s_a[208] = "Awdal|Bakool|Banaadir|Bari|Bay|Galguduud|Gedo|Hiiraan|Jubbada Dhexe|Jubbada Hoose|Mudug|Nugaal|Sanaag|Shabeellaha Dhexe|Shabeellaha Hoose|Sool|Togdheer|Woqooyi Galbeed";
s_a[209] = "Eastern Cape|Free State|Gauteng|KwaZulu-Natal|Mpumalanga|North-West|Northern Cape|Northern Province|Western Cape";
s_a[210] = "Bird Island|Bristol Island|Clerke Rocks|Montagu Island|Saunders Island|South Georgia|Southern Thule|Traversay Islands";
s_a[211] = "Andalucia|Aragon|Asturias|Baleares (Balearic Islands)|Canarias (Canary Islands)|Cantabria|Castilla y Leon|Castilla-La Mancha|Cataluna|Ceuta|Communidad Valencian|Extremadura|Galicia|Islas Chafarinas|La Rioja|Madrid|Melilla|Murcia|Navarra|Pais Vasco (Basque Country)|Penon de Alhucemas|Penon de Velez de la Gomera";
s_a[212] = "Spratly Islands";
s_a[213] = "Central|Eastern|North Central|North Eastern|North Western|Northern|Sabaragamuwa|Southern|Uva|Western";
s_a[214] = "A'ali an Nil|Al Bahr al Ahmar|Al Buhayrat|Al Jazirah|Al Khartum|Al Qadarif|Al Wahdah|An Nil al Abyad|An Nil al Azraq|Ash Shamaliyah|Bahr al Jabal|Gharb al Istiwa'iyah|Gharb Bahr al Ghazal|Gharb Darfur|Gharb Kurdufan|Janub Darfur|Janub Kurdufan|Junqali|Kassala|Nahr an Nil|Shamal Bahr al Ghazal|Shamal Darfur|Shamal Kurdufan|Sharq al Istiwa'iyah|Sinnar|Warab";
s_a[215] = "Brokopondo|Commewijne|Coronie|Marowijne|Nickerie|Para|Paramaribo|Saramacca|Sipaliwini|Wanica";
s_a[216] = "Barentsoya|Bjornoya|Edgeoya|Hopen|Kvitoya|Nordaustandet|Prins Karls Forland|Spitsbergen";
s_a[217] = "Hhohho|Lubombo|Manzini|Shiselweni";
s_a[218] = "Blekinge|Dalarnas|Gavleborgs|Gotlands|Hallands|Jamtlands|Jonkopings|Kalmar|Kronobergs|Norrbottens|Orebro|Ostergotlands|Skane|Sodermanlands|Stockholms|Uppsala|Varmlands|Vasterbottens|Vasternorrlands|Vastmanlands|Vastra Gotalands";
s_a[219] = "Aargau|Ausser-Rhoden|Basel-Landschaft|Basel-Stadt|Bern|Fribourg|Geneve|Glarus|Graubunden|Inner-Rhoden|Jura|Luzern|Neuchatel|Nidwalden|Obwalden|Sankt Gallen|Schaffhausen|Schwyz|Solothurn|Thurgau|Ticino|Uri|Valais|Vaud|Zug|Zurich";
s_a[220] = "Al Hasakah|Al Ladhiqiyah|Al Qunaytirah|Ar Raqqah|As Suwayda'|Dar'a|Dayr az Zawr|Dimashq|Halab|Hamah|Hims|Idlib|Rif Dimashq|Tartus";
s_a[221] = "Chang-hua|Chi-lung|Chia-i|Chia-i|Chung-hsing-hsin-ts'un|Hsin-chu|Hsin-chu|Hua-lien|I-lan|Kao-hsiung|Kao-hsiung|Miao-li|Nan-t'ou|P'eng-hu|P'ing-tung|T'ai-chung|T'ai-chung|T'ai-nan|T'ai-nan|T'ai-pei|T'ai-pei|T'ai-tung|T'ao-yuan|Yun-lin";
s_a[222] = "Viloyati Khatlon|Viloyati Leninobod|Viloyati Mukhtori Kuhistoni Badakhshon";
s_a[223] = "Arusha|Dar es Salaam|Dodoma|Iringa|Kagera|Kigoma|Kilimanjaro|Lindi|Mara|Mbeya|Morogoro|Mtwara|Mwanza|Pemba North|Pemba South|Pwani|Rukwa|Ruvuma|Shinyanga|Singida|Tabora|Tanga|Zanzibar Central/South|Zanzibar North|Zanzibar Urban/West";
s_a[224] = "Amnat Charoen|Ang Thong|Buriram|Chachoengsao|Chai Nat|Chaiyaphum|Chanthaburi|Chiang Mai|Chiang Rai|Chon Buri|Chumphon|Kalasin|Kamphaeng Phet|Kanchanaburi|Khon Kaen|Krabi|Krung Thep Mahanakhon (Bangkok)|Lampang|Lamphun|Loei|Lop Buri|Mae Hong Son|Maha Sarakham|Mukdahan|Nakhon Nayok|Nakhon Pathom|Nakhon Phanom|Nakhon Ratchasima|Nakhon Sawan|Nakhon Si Thammarat|Nan|Narathiwat|Nong Bua Lamphu|Nong Khai|Nonthaburi|Pathum Thani|Pattani|Phangnga|Phatthalung|Phayao|Phetchabun|Phetchaburi|Phichit|Phitsanulok|Phra Nakhon Si Ayutthaya|Phrae|Phuket|Prachin Buri|Prachuap Khiri Khan|Ranong|Ratchaburi|Rayong|Roi Et|Sa Kaeo|Sakon Nakhon|Samut Prakan|Samut Sakhon|Samut Songkhram|Sara Buri|Satun|Sing Buri|Sisaket|Songkhla|Sukhothai|Suphan Buri|Surat Thani|Surin|Tak|Trang|Trat|Ubon Ratchathani|Udon Thani|Uthai Thani|Uttaradit|Yala|Yasothon";
s_a[225] = "Tobago";
s_a[226] = "De La Kara|Des Plateaux|Des Savanes|Du Centre|Maritime";
s_a[227] = "Atafu|Fakaofo|Nukunonu";
s_a[228] = "Ha'apai|Tongatapu|Vava'u";
s_a[229] = "Arima|Caroni|Mayaro|Nariva|Port-of-Spain|Saint Andrew|Saint David|Saint George|Saint Patrick|San Fernando|Victoria";
s_a[230] = "Ariana|Beja|Ben Arous|Bizerte|El Kef|Gabes|Gafsa|Jendouba|Kairouan|Kasserine|Kebili|Mahdia|Medenine|Monastir|Nabeul|Sfax|Sidi Bou Zid|Siliana|Sousse|Tataouine|Tozeur|Tunis|Zaghouan";
s_a[231] = "Adana|Adiyaman|Afyon|Agri|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydin|Balikesir|Bartin|Batman|Bayburt|Bilecik|Bingol|Bitlis|Bolu|Burdur|Bursa|Canakkale|Cankiri|Corum|Denizli|Diyarbakir|Duzce|Edirne|Elazig|Erzincan|Erzurum|Eskisehir|Gaziantep|Giresun|Gumushane|Hakkari|Hatay|Icel|Igdir|Isparta|Istanbul|Izmir|Kahramanmaras|Karabuk|Karaman|Kars|Kastamonu|Kayseri|Kilis|Kirikkale|Kirklareli|Kirsehir|Kocaeli|Konya|Kutahya|Malatya|Manisa|Mardin|Mugla|Mus|Nevsehir|Nigde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Sanliurfa|Siirt|Sinop|Sirnak|Sivas|Tekirdag|Tokat|Trabzon|Tunceli|Usak|Van|Yalova|Yozgat|Zonguldak";
s_a[232] = "Ahal Welayaty|Balkan Welayaty|Dashhowuz Welayaty|Lebap Welayaty|Mary Welayaty";
s_a[233] = "Tuvalu";
s_a[234] = "Adjumani|Apac|Arua|Bugiri|Bundibugyo|Bushenyi|Busia|Gulu|Hoima|Iganga|Jinja|Kabale|Kabarole|Kalangala|Kampala|Kamuli|Kapchorwa|Kasese|Katakwi|Kibale|Kiboga|Kisoro|Kitgum|Kotido|Kumi|Lira|Luwero|Masaka|Masindi|Mbale|Mbarara|Moroto|Moyo|Mpigi|Mubende|Mukono|Nakasongola|Nebbi|Ntungamo|Pallisa|Rakai|Rukungiri|Sembabule|Soroti|Tororo";
s_a[235] = "Avtonomna Respublika Krym (Simferopol')|Cherkas'ka (Cherkasy)|Chernihivs'ka (Chernihiv)|Chernivets'ka (Chernivtsi)|Dnipropetrovs'ka (Dnipropetrovs'k)|Donets'ka (Donets'k)|Ivano-Frankivs'ka (Ivano-Frankivs'k)|Kharkivs'ka (Kharkiv)|Khersons'ka (Kherson)|Khmel'nyts'ka (Khmel'nyts'kyy)|Kirovohrads'ka (Kirovohrad)|Kyyiv|Kyyivs'ka (Kiev)|L'vivs'ka (L'viv)|Luhans'ka (Luhans'k)|Mykolayivs'ka (Mykolayiv)|Odes'ka (Odesa)|Poltavs'ka (Poltava)|Rivnens'ka (Rivne)|Sevastopol'|Sums'ka (Sumy)|Ternopil's'ka (Ternopil')|Vinnyts'ka (Vinnytsya)|Volyns'ka (Luts'k)|Zakarpats'ka (Uzhhorod)|Zaporiz'ka (Zaporizhzhya)|Zhytomyrs'ka (Zhytomyr)"
s_a[236] = "'Ajman|Abu Zaby (Abu Dhabi)|Al Fujayrah|Ash Shariqah (Sharjah)|Dubayy (Dubai)|Ra's al Khaymah|Umm al Qaywayn";
s_a[237] = "Barking and Dagenham|Barnet|Barnsley|Bath and North East Somerset|Bedfordshire|Bexley|Birmingham|Blackburn with Darwen|Blackpool|Bolton|Bournemouth|Bracknell Forest|Bradford|Brent|Brighton and Hove|Bromley|Buckinghamshire|Bury|Calderdale|Cambridgeshire|Camden|Cheshire|City of Bristol|City of Kingston upon Hull|City of London|Cornwall|Coventry|Croydon|Cumbria|Darlington|Derby|Derbyshire|Devon|Doncaster|Dorset|Dudley|Durham|Ealing|East Riding of Yorkshire|East Sussex|Enfield|Essex|Gateshead|Gloucestershire|Greenwich|Hackney|Halton|Hammersmith and Fulham|Hampshire|Haringey|Harrow|Hartlepool|Havering|Herefordshire|Hertfordshire|Hillingdon|Hounslow|Isle of Wight|Islington|Kensington and Chelsea|Kent|Kingston upon Thames|Kirklees|Knowsley|Lambeth|Lancashire|Leeds|Leicester|Leicestershire|Lewisham|Lincolnshire|Liverpool|Luton|Manchester|Medway|Merton|Middlesbrough|Milton Keynes|Newcastle upon Tyne|Newham|Norfolk|North East Lincolnshire|North Lincolnshire|North Somerset|North Tyneside|North Yorkshire|Northamptonshire|Northumberland|Nottingham|Nottinghamshire|Oldham|Oxfordshire|Peterborough|Plymouth|Poole|Portsmouth|Reading|Redbridge|Redcar and Cleveland|Richmond upon Thames|Rochdale|Rotherham|Rutland|Salford|Sandwell|Sefton|Sheffield|Shropshire|Slough|Solihull|Somerset|South Gloucestershire|South Tyneside|Southampton|Southend-on-Sea|Southwark|St. Helens|Staffordshire|Stockport|Stockton-on-Tees|Stoke-on-Trent|Suffolk|Sunderland|Surrey|Sutton|Swindon|Tameside|Telford and Wrekin|Thurrock|Torbay|Tower Hamlets|Trafford|Wakefield|Walsall|Waltham Forest|Wandsworth|Warrington|Warwickshire|West Berkshire|West Sussex|Westminster|Wigan|Wiltshire|Windsor and Maidenhead|Wirral|Wokingham|Wolverhampton|Worcestershire|York";
s_a[238] = "Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandu|Rio Negro|Rivera|Rocha|Salto|San Jose|Soriano|Tacuarembo|Treinta y Tres";
s_a[239] = "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";
s_a[240] = "Andijon Wiloyati|Bukhoro Wiloyati|Farghona Wiloyati|Jizzakh Wiloyati|Khorazm Wiloyati (Urganch)|Namangan Wiloyati|Nawoiy Wiloyati|Qashqadaryo Wiloyati (Qarshi)|Qoraqalpoghiston (Nukus)|Samarqand Wiloyati|Sirdaryo Wiloyati (Guliston)|Surkhondaryo Wiloyati (Termiz)|Toshkent Shahri|Toshkent Wiloyati";
s_a[241] = "Malampa|Penama|Sanma|Shefa|Tafea|Torba";
s_a[242] = "Amazonas|Anzoategui|Apure|Aragua|Barinas|Bolivar|Carabobo|Cojedes|Delta Amacuro|Dependencias Federales|Distrito Federal|Falcon|Guarico|Lara|Merida|Miranda|Monagas|Nueva Esparta|Portuguesa|Sucre|Tachira|Trujillo|Vargas|Yaracuy|Zulia";
s_a[243] = "An Giang|Ba Ria-Vung Tau|Bac Giang|Bac Kan|Bac Lieu|Bac Ninh|Ben Tre|Binh Dinh|Binh Duong|Binh Phuoc|Binh Thuan|Ca Mau|Can Tho|Cao Bang|Da Nang|Dac Lak|Dong Nai|Dong Thap|Gia Lai|Ha Giang|Ha Nam|Ha Noi|Ha Tay|Ha Tinh|Hai Duong|Hai Phong|Ho Chi Minh|Hoa Binh|Hung Yen|Khanh Hoa|Kien Giang|Kon Tum|Lai Chau|Lam Dong|Lang Son|Lao Cai|Long An|Nam Dinh|Nghe An|Ninh Binh|Ninh Thuan|Phu Tho|Phu Yen|Quang Binh|Quang Nam|Quang Ngai|Quang Ninh|Quang Tri|Soc Trang|Son La|Tay Ninh|Thai Binh|Thai Nguyen|Thanh Hoa|Thua Thien-Hue|Tien Giang|Tra Vinh|Tuyen Quang|Vinh Long|Vinh Phuc|Yen Bai";
s_a[244] = "Saint Croix|Saint John|Saint Thomas";
s_a[245] = "Blaenau Gwent|Bridgend|Caerphilly|Cardiff|Carmarthenshire|Ceredigion|Conwy|Denbighshire|Flintshire|Gwynedd|Isle of Anglesey|Merthyr Tydfil|Monmouthshire|Neath Port Talbot|Newport|Pembrokeshire|Powys|Rhondda Cynon Taff|Swansea|The Vale of Glamorgan|Torfaen|Wrexham";
s_a[246] = "Alo|Sigave|Wallis";
s_a[247] = "West Bank";
s_a[248] = "Western Sahara";
s_a[249] = "'Adan|'Ataq|Abyan|Al Bayda'|Al Hudaydah|Al Jawf|Al Mahrah|Al Mahwit|Dhamar|Hadhramawt|Hajjah|Ibb|Lahij|Ma'rib|Sa'dah|San'a'|Ta'izz";
s_a[250] = "Kosovo|Montenegro|Serbia|Vojvodina";
s_a[251] = "Central|Copperbelt|Eastern|Luapula|Lusaka|North-Western|Northern|Southern|Western";
s_a[252] = "Bulawayo|Harare|ManicalandMashonaland Central|Mashonaland East|Mashonaland West|Masvingo|Matabeleland North|Matabeleland South|Midlands";

var muni_op = new Array();


muni_op[0] = "";
muni_op[1] = "Abala|Cantamayec|Ucu|Uman|Valladolid|Xocchel|Yaxcaba|Yaxkukul|Yobain|Celestun|Cenotillo|Conkal|Cuncunul|Cuzama|Chacsinkin|Chankom|Chapab|Chemax|Acanceh|Chicxulub|Chichimila|Chikindzonot|Chochola|Chumayel|Dzan|Dzemul|Dzidzantun|Dzilam de bravo|Dzilam gonzalez|Akil|Dzitas|Dzoncauich|Espita|Halacho|Hocaba|Hoctun|Homun|Huhi|Hunucma|Ixil|Baca|Izamal|Kanasin|Kantunil|Kaua|Kinchil|Kopoma|Mama|Mani|Maxcanu|Mayapan|Bokoba|Merida|Mococha|Motul|Muna|Muxupip|Opichen|Oxkutzcab|Panaba|Peto|Progreso|Buctzotz|Quintana roo|Rio lagartos|Sacalum|Samahil|Sanahcat|San felipe|Santa elena|Seye|Sinanche|Sotuta|Cacalchen|Sucila|Sudzal|Suma|Tahdziu|Tahmek|Teabo|Tecoh|Tekal de venegas|Tekanto|Tekax|Calotmul|Tekit|Tekom|Telchac pueblo|Telchac puerto|Temax|Temozon|Tepakan|Tetiz|Teya|Ticul|Cansahcab|Timucuy|Tinum|Tixcacalcupul|Tixkokob|Tixmeuac|Tixpeual|Tizimin|Tunkas|Tzucacab|Uayma";
muni_op[2] = "Mexicali|Tijuana|Ensenada|Tecate";
muni_op[3] = "La paz|Los Cabos";
muni_op[4] = "Calkini|Campeche|Carmen|Champoton|Escarcega|Hecelchakan|Hopelchen|Palizada|Tenabo|Candelaria|Calakmul";
muni_op[5] = "Tuxtla gutierrez|Tapachula|San cristobal de las casas|Reforma|Palenque|Pichucalco|Villaflores|Huixtla|Comitan de dominguez|Pueblo nuevo solistahuacan|Frontera hidalgo|Chiapa de corzo|Yajalon|Villa corzo|Villa comaltitlan|Tonala|Teopisca|Tecpatan|Soyalo|Suchiapa|Ocosingo|Venustiano carranza|Ocozocoautla de espinosa|Simojovel|San fernando|Pijijiapan|Oxchuc|Motozintla|Mapastepec|Las margaritas|La trinitaria|Arriaga|Berriozabal|Bochil|Cintalapa|Copainala|Escuintla|Frontera comalapa|Ixtapa|Jiquipilas|Altamirano|Jitotol|Acapetahua|Juarez|Larrainzar|Huehuetan|Mazatan|Chilon|Ciudad hidalgo|Suchiate|Siltepec|Cacahoatan|Angel albino corzo|La concordia|Ostuacan";
muni_op[6] = "Chihuahua|Juarez|Casas grandes|Cuauhtemoc|Delicias|Hidalgo del parral|Jimenez|Nuevo casas grandes|Meoqui";
muni_op[7] = "Torreon|Piedras negras|Frontera|Sabinas|Monclova|Saltillo|Ramos arizpe|Acuã'a|Allende|Arteaga|Candela|Castaños|Cuatrocienegas|Guerrero|Morelos|Muzquiz|Nava|San buenaventura|San juan de sabinas|San pedro|Villa union|Zaragoza";
muni_op[8] = "Tecoman|Colima|Manzanillo|Comala|Coquimatlan|Villa de alvarez";
muni_op[9] = "Alvaro obregon|Azcapotzalco|Benito juarez|Coyoacan|Cuauhtemoc|Cuajimalpa de morelos|Gustavo a madero|Iztacalco|Iztapalapa|Magdalena contreras|Miguel hidalgo|Milpa alta|Tlahuac|Tlalpan|Venustiano carranza|Zochimilco";
muni_op[10] = "Gomez palacio|Durango|Lerdo";
muni_op[11] = "Cuautitlan izcalli|Ecatepec de morelos|Huixquilucan|Naucalpan de juarez|Tlalnepantla|Tultitlan de mariano escobedo|Del. Xalostoc|Nezahualcoyotl|Atizapan de zaragoza|Tianguistenco|Toluca|Chicoloapan|Lerma|Chalco|Ixtapaluca|Coacalco|Cuautitlan|Atlacomulco|Metepec|Tepotzotlan|Teotihuacan|Chiautla|Tecamac|Zumpango de ocampo|Tezoyuca|Texcoco|Chimalhuacan|La paz|Coatepec harinas|Coyotepec|Zinacantepec|Acolman|Almoloya de juarez|Nicolas romero|San mateo atenco|Otumba|Amanalco|Jilotepec|Soyaniquilpan de juarez|Tonanitla|Atenco|Tultepec|Ocoyoacac|Temascalapa|Polotitlan|Valle de chalcos solidaridad|Chapultepec|Valle de bravo|Papalotla";
muni_op[12] = "Irapuato|Leon|Celaya|Salamanca|San jose iturbide|Apaseo el alto|Abasolo|Apaseo el grande|Comonfort|Cortazar|Cueramaro|Doctor mora|Guanajuato|Huanimaro|Jaral del progreso|Moroleon|Penjamo|Pueblo nuevo|Romita|Salvatierra|San francisco del rincon|San luis de la paz|San miguel de allende|Silao|Tarimoro|Uriangato|Valle de santiago|Villagran|Yuriria";
muni_op[13] = "Acapulco|Chilpancingo de los bravo|Pungarabato|Iguala|Tecpan de galeana|Taxco de alarcon|Zihuatanejo de azueta";
muni_op[14] = "Ciudad fray bernardino de sahagun|Tepeapulco|Pachuca|Huichapan|Tizayuca|Chapantongo|Tula de allende|Tulancingo|Huejutla de reyes|Tepeji del rio de ocampo|Mineral de la reforma|Santiago tulantepec de lugo guerrero";
muni_op[15] = "El salto|Guadalajara|Zapopan|Ocotlan|Puerto vallarta|Tlaquepaque|Tlajomulco de zuñiga|Zapotlanejo|Tepatitlan de morelos|Zapotlan el grande (ciudad guzman)|Casimiro castillo|Ameca|Arandas|Atoyac|Ayotlan|Cuautla|Chapala|Encarnacion de diaz|Gomez farias|Jalostotitlan|Jamay|Jesus maria|Juanacatlan|La barca|Lagos de moreno|Mascota|Mexticacan|Ojuelos de jalisco|Poncitlan|San juan de los lagos|San martin de bolaños|San miguel el alto|Sayula|Tamazula de gordiano|Tapalpa|Tenamaxtlan|Tonala|Tototlan|Tuxcacuespo|Tuxpan|Villa purificacion|Zapotiltic|Zapotlan del rey";
muni_op[16] = "Morelia|La piedad|Uruapan|Zamora de hidalgo|Lazaro cardenas|Alvaro obregon|Apatzingan|Briseñas|Buenavista|Contepec|Cotija|Cuitzeo|Cheran|Gabriel zamora|Irimbo|Jacona|Jiquilpan|Jose sixto verduzco|Lagunillas|Mugica|Pajacuaran|Paracuaro|Paracho|Patzcuaro|Purepero|Puruandiro|Quiroga|Sahuayo|Salvador escalante|Santa ana maya|Tacambaro|Tanhuato|Taretan|Tarimbaro|Tepalcatepec|Tingambato|Tinguindin|Tocumbo|Tzintzuntzan|Yurecuaro|Zacapu|Ziracuaretiro";
muni_op[17] = "Jiutepec|Cuernavaca|Huitzilac|Cuautla|Yautepec|Temixco|Emiliano zapata|Ayala|Atlatlahucan";
muni_op[18] = "Tepic|Bahia de banderas";
muni_op[19] = "Santa catarina|Monterrey|San pedro garza garcia|San nicolas de los garza|Sabinas hidalgo|Apodaca|Garcia|Guadalupe|General escobedo|Carmen|Allende|Cadereyta jimenez|Cienega de flores|Galeana|Agualeguas|Aramberri|Bustamante|Cerralvo|China|Doctor arroyo|Gral bravo|Gral treviã'o|Gral zaragoza|Gral zuazua|Hualahuises|Juarez|Lampazos de naranjo|Linares|Los herreras|Montemorelos|Santiago|Villaldama|Salinas victoria";
muni_op[20] = "San juan bautista tuxtepec|Salina cruz|Oaxaca de juarez|Juchitan de zaragoza|San pablo etla|San pedro tepanatepec|Santo domingo zanatepec|Matias romero|Santiago niltepec|Santo domingo tehuantepec|San andres paxtlan|Ixtepec|Loma bonita|Chahuites|San pedro pochutla|Putla villa de guerrero";
muni_op[21] = "Atlixco|Puebla|Tehuacan|San andres cholula|Cuautlancingo|Huejotzingo|Xicotepec|Nopalucan|Tecamachalco|San pedro cholula|Amozoc|Tepeaca|Acatzingo|San miguel xoxtla|Coronango|San gregorio atzompa|San martin texmelucan|Tezihuatlan";
muni_op[22] = "Queretaro|San juan del rio|Amealco de bonfil|Cadereyta de montes|Pedro escobedo|Tequisquiapan|El marques|Corregidora";
muni_op[23] = "Cozumel|Othon p. Blanco|Felipe carrillo puerto|Isla mujeres|Jose ma. Morelos|Solidaridad|Lazaro cardenas|Benito juarez|Bacalar|Tulum";
muni_op[24] = "San luis potosi|Ciudad valles|Soledad de graciano sanchez|Cardenas|Cedral|Cerritos|Ciudad del maiz|Ciudad fernandez|Charcas|Matehuala|Moctezuma|Rayon|Rio verde|San ciro de acosta|Santo domingo|Tamazunchale|Tampamolon corona|Venado|Villa de reyes|Villa hidalgo|Catorce";
muni_op[25] = "Culiacan|Ahome|Mazatlan|Guasave|Salvador alvarado";
muni_op[26] = "Hermosillo|Navojoa|Ciudad obregon|Nogales|Cajeme|Cananea|Empalme|Guaymas|Agua prieta";
muni_op[27] = "Centro|Tenosique|Comalcalco|Cunduacan|Huimanguillo|Nacajuca|Cardenas|Paraiso|Jalpa|Jalapa|Macuspana|Jonuta|Balancan|Teapa|Centla|Emiliano zapata|Tacotalpa";
muni_op[28] = "Nuevo laredo|Tampico|Reynosa|Matamoros|Ciudad madero|Ciudad victoria|Valle hermoso|Cd miguel aleman|Abasolo|Aldama|Altamira|Antiguo morelos|Burgos|Camargo|Cruillas|El mante|Gomez farias|Gonzalez|Guemez|Guerrero|Gustavo diaz ordaz|Hidalgo|Jaumave|Jimenez|Llera|Mier|Miquihuana|Nuevo morelos|Ocampo|Padilla|Rio bravo|San fernando|Soto la marina|Tula|Villagran|Xicotencatl";
muni_op[29] = "Tlaxcala|Huamantla|Santa isabel xiloxoxtla|San pablo del monte";
muni_op[30] = "Veracruz|Xalapa|Jaltipan|Acayucan|Boca del rio|Minatitlan|Coatzacoalcos|Amatlan de los reyes|Fortin|Coatepec|Cordoba|Martinez de la torre|Medellin|Agua dulce|Las choapas|Ixtaczoquitlan|San andres tuxtla|Cosoleacaque|Poza rica|Tuxpan de rodriguez cano|Orizaba|Soledad de doblado|Hueyapan|Nanchital de lazaro cardenas del rio|Cerro azul|Ozuluama|Panuco|Rio blanco|Tamapache|Tres valles|Yanga|Cotaxtla|Tierra blanca|Cosamaloapan|La antigua|Catemaco|Isla|Playa vicente|Camerino z. Mendoza|Atoyac|Emiliano zapata|Banderilla|Hueyapan de ocampo|Santiago tuxtla|Angel r cabada|Alvarado|Ursulo galvan|Cuitlahuac|Perote|Lerdo de tejada|Puente nacional|Juan rodriguez clara|Carlos a carrillo|Alto lucero|Actopan|Paso de ovejas|Vega de alatorre|Nautla|Gutierrez zamora|Tecolutla|Papantla|Cazones|Coatzintla|Tihuatlan|Huatusco|San rafael|Coscomatepec|Naranjos amatlan|Tacotalpan|Rafael delgado ";
muni_op[31] = "Aguascalientes|Calvillo|El llano|Jesus maria|Pabellon de arteaga|Rincon de romos|San francisco de los romo";
muni_op[32] = "Zacatecas|Fresnillo|Guadalupe|Jalpa|Jerez|Juan aldama|Juchipila|Loreto|Miguel auza|Momax|Nochistlan de mejia|Noria de angeles|Ojocaliente|Panuco|Pinos|Rio grande|Sain alto|Sombrerete|Tabasco|Teul de gonzalez ortega|Tlaltenango de sanchez roman|Valparaiso|Vetagrande|Villa garcia|Villanueva";

function OnShowMunicipios(idElement,idMunicipio)
{

	var municipios = document.getElementById(idMunicipio);
	$('.mesconde').show();
	municipios.length = 0;
	municipios.options[0] = new Option('Seleccionar municipio', '');
	municipios.selectedIndex = 0;

	 var munarg = muni_op[idElement].split("|");
	
	 for (var lo = 0; lo < munarg.length; lo++) {
        municipios.options[municipios.length] = new Option(munarg[lo], munarg[lo]);
    }
}

function populateStates(countryElementId, stateElementId) {

    var selectedCountryIndex = document.getElementById(countryElementId).selectedIndex;

    var stateElement = document.getElementById(stateElementId);

    stateElement.length = 0; // Fixed by Julian Woods
    stateElement.options[0] = new Option('Select State', '');
    stateElement.selectedIndex = 0;

    var state_arr = s_a[selectedCountryIndex].split("|");

    for (var i = 0; i < state_arr.length; i++) {
        stateElement.options[stateElement.length] = new Option(state_arr[i], state_arr[i]);
    }
}

function selectStates(idElement, idMunicipio)
{
	var statesElement = document.getElementById(idElement);
	statesElement.length = 0;
	statesElement.options[0] = new Option('Selecciona un estado', '');
	statesElement.selectedIndex = 0;
	
	 var state_arr = s_a[151].split("|");
	
	 for (var i = 0; i < state_arr.length; i++) {
        statesElement.options[statesElement.length] = new Option(state_arr[i], state_arr[i]);
    }
	
	 if(idMunicipio){
		 statesElement.onchange = function(){		
			
			 OnShowMunicipios(statesElement.selectedIndex,idMunicipio);
			 
			 
		 };
	 }
	
}





function populateCountries(countryElementId, stateElementId) {
    // given the id of the <select> tag as function argument, it inserts <option> tags
    var countryElement = document.getElementById(countryElementId);
    countryElement.length = 0;
    countryElement.options[0] = new Option('Select Country', '');
    countryElement.selectedIndex = 0;
    for (var i = 0; i < country_arr.length; i++) {
        countryElement.options[countryElement.length] = new Option(country_arr[i], country_arr[i]);
    }

    if (stateElementId) {
        countryElement.onchange = function () {
            populateStates(countryElementId, stateElementId);
        };
    }
}

"use strict";
function Calendar() {
}

Calendar.prototype.createCalendar = function (calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "createCalendar", [calendarName]);
};

Calendar.prototype.deleteCalendar = function (calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "deleteCalendar", [calendarName]);
};

Calendar.prototype.createEvent = function (title, location, notes, startDate, endDate, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "createEvent", [title, location, notes, startDate.getTime(), endDate.getTime()]);
};

Calendar.prototype.createEventInNamedCalendar = function (title, location, notes, startDate, endDate, calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "createEventInNamedCalendar", [title, location, notes, startDate.getTime(), endDate.getTime(), calendarName]);
};

Calendar.prototype.deleteEvent = function (title, location, notes, startDate, endDate, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "deleteEvent", [title, location, notes, startDate.getTime(), endDate.getTime()]);
};

Calendar.prototype.deleteEventFromNamedCalendar = function (title, location, notes, startDate, endDate, calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "deleteEventFromNamedCalendar", [title, location, notes, startDate.getTime(), endDate.getTime(), calendarName]);
};

Calendar.prototype.findEvent = function (title, location, notes, startDate, endDate, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "findEvent", [title, location, notes, startDate.getTime(), endDate.getTime()]);
};

Calendar.prototype.findAllEventsInNamedCalendar = function (calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "findAllEventsInNamedCalendar", [calendarName]);
};

Calendar.prototype.modifyEvent = function (title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "modifyEvent", [title, location, notes, startDate.getTime(), endDate.getTime(), newTitle, newLocation, newNotes, newStartDate.getTime(), newEndDate.getTime()]);
};

Calendar.prototype.modifyEventInNamedCalendar = function (title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate, calendarName, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "Calendar", "modifyEventInNamedCalendar", [title, location, notes, startDate.getTime(), endDate.getTime(), newTitle, newLocation, newNotes, newStartDate.getTime(), newEndDate.getTime(), calendarName]);
};

Calendar.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.calendar = new Calendar();
  return window.plugins.calendar;
};

cordova.addConstructor(Calendar.install);

// window.plugins.waitingDialog

function WaitingDialog() {
}

WaitingDialog.prototype.show = function(text,titulo) {
	cordova.exec(null, null, "WaitingDialog", "show", [text,titulo]);
}

WaitingDialog.prototype.hide = function() {
	cordova.exec(null, null, "WaitingDialog", "hide", []);
}

cordova.addConstructor(function()  {
	if(!window.plugins) {
	   window.plugins = {};
	}

   // shim to work in 1.5 and 1.6
   if (!window.Cordova) {
	   window.Cordova = cordova;
   };

   window.plugins.waitingDialog = new WaitingDialog();
});

// window.plugins.emailComposer

function EmailComposer() {
	this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType = {
Cancelled:0,
Saved:1,
Sent:2,
Failed:3,
NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
	var args = {};
	if(toRecipients)
		args.toRecipients = toRecipients;
	if(ccRecipients)
		args.ccRecipients = ccRecipients;
	if(bccRecipients)
		args.bccRecipients = bccRecipients;
	if(subject)
		args.subject = subject;
	if(body)
		args.body = body;
	if(bIsHTML)
		args.bIsHTML = bIsHTML;
	
	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

// this will be forever known as the orch-func -jm
EmailComposer.prototype.showEmailComposerWithCB = function(cbFunction,subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
	this.resultCallback = cbFunction;
	this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
}



cordova.addConstructor(function()  {
					   if(!window.plugins)
					   {
					   window.plugins = {};
					   }
					   
					   // shim to work in 1.5 and 1.6
					   if (!window.Cordova) {
					   window.Cordova = cordova;
					   };
					   
					   window.plugins.emailComposer = new EmailComposer();
					   });

"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

$(function(){
	function setContentSize() {
		$('.swiper-content').css({
			height: $(window).height()-$('.swiper-nav').height()
		})
	}
	setContentSize()
	$(window).resize(function(){
		setContentSize()
	})

	//Swiper Content
	var contentSwiper = $('.swiper-content').swiper({
		onSlideChangeStart: function(){
			updateNavPosition()
		}
	})
	//Nav
	var navSwiper = $('.swiper-nav').swiper({
		visibilityFullFit: true,
		slidesPerView:'auto',
		//Thumbnails Clicks
		onSlideClick: function(){
			contentSwiper.swipeTo( navSwiper.clickedSlideIndex )
		}
	})

	//Update Nav Position
	function updateNavPosition(){
		$('.swiper-nav .active-nav').removeClass('active-nav')
		var activeNav = $('.swiper-nav .swiper-slide').eq(contentSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>navSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(navSwiper.width/activeNav.width())-1
				navSwiper.swipeTo(activeNav.index()-thumbsPerNav)
			}
			else {
				navSwiper.swipeTo(activeNav.index())
			}	
		}
	}
})

