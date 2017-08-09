





           
            $(document).bind('mobileinit',function(){
                $.mobile.selectmenu.prototype.options.nativeMenu = true;
                $.mobile.defaultPageTransition = 'none';
                $.mobile.useFastClick  = false;

                // Parche bloqueo ui en cargar
                (function () {
                      var originalLoadingMethod = $.mobile.loading;
                      $.mobile.loading = function () {
                         if ( arguments[0] == 'hide' ) {
                            $("body").unblock();
                         }else{
                            $("body").block({ "message": null });
                         }
                         originalLoadingMethod.apply(this, arguments);
                      };
                })();
                // Parche bloqueo ui en cargar
            });
            app.initialize();
        





var app = {
    baseurl:'http://www.bachesantafe.com.ar',
    geotype : 'dir',  // dir o gps
    ready : false,
    position : false,
    random : '',
    boundsSouthwestLatitud : -31.674,
    boundsSouthwestLongitud : -60.66,
    boundsNortheastLatitud : -31.55,
    boundsNortheastLongitud : -60.76,
    maximoErrorGPS: 50,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        this.ready = true;
        //document.addEventListener("backbutton", app.backKeyDown, true);
    },
    exitApp : function() {
        navigator.app.exitApp();
    },
    backKeyDown : function() {
        return false;
    },
    getPhoto : function(sourcet) {
        navigator.camera.getPicture( this.onCamSuccess, this.onCamFail,  
                            {quality:50, 
                             destinationType:Camera.DestinationType.FILE_URI,
                             sourceType: sourcet
                             } );
        return false;
    },
    onCamFail : function (msg) {
        alert('Error al obtener la imagen');
    },
    onCamSuccess : function( imgdata ) {
        var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imgdata.substr(imgdata.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

        var params = new Object();

            params.random = app.genRandom();
            $('#random').val( params.random );
           
            options.params = params;

        var ft = new FileTransfer();
            ft.upload( imgdata, app.baseurl + "/dyn/doUpload.php", 
                                app.onUploadSuccess, app.onUploadFail, options);
            $.mobile.loading( 'show', {
                text: 'Subiendo Imagen',
                textVisible: true,
            });
            
        
        
    },
    onUploadSuccess : function ( resp ) {
        $.mobile.loading( 'hide' );
        
        $("#imgPreview").attr("src", app.baseurl + '/uploadedImages/' + app.random + '.jpg' );
        $("#imgPreview").show();
    },
    onUploadFail :function ( error ) {          
          $.mobile.loading( 'hide' );
          alert( "Error al subir la imagen a bache santa fe." );
    },
    setDirPos : function() {
        if ( this.geotype == 'dir' ) return;
        this.geotype = 'dir';
        $('#btnDir,#btnGps').toggleClass('ui-btn-active');
        $('#datadir').show();
        $('#datagps').hide();
    },
    setGpsPos : function() {
        if ( this.geotype != 'gps' ){ 
            $('#btnDir,#btnGps').toggleClass('ui-btn-active');
            $('#datadir').hide();
            $('#calle,#altura').val('');
        }
        this.geotype = 'gps';
        
        $.mobile.loading( 'show', {
            text: 'Obteniendo Información del GPS',
            textVisible: true,
        });
        navigator.geolocation.getCurrentPosition(
                        this.onGpsPosSuccess,
                        this.onGpsPosFail,
                        {maximumAge:600000, timeout:5000, enableHighAccuracy: true}
                        );
        
    },
    onGpsPosSuccess : function( position ) {
        $.mobile.loading( 'hide' );
        if (  position.coords.accuracy  > app.maximoErrorGPS ){
            alert( 'Señal del satelite no es lo suficientemente buena' );
            app.setDirPos();
            return;
        }
        if ( (position.coords.latitude < app.boundsNortheastLatitud 
                && position.coords.latitude > app.boundsSouthwestLatitud )
              &&
               (position.coords.longitude < app.boundsSouthwestLongitud 
                && position.coords.longitude > app.boundsNortheastLongitud)
                ) {
            width = screen.width - 20;
            height = Math.floor(screen.height / 3);
            document.getElementById('map').src = 
            "http://maps.googleapis.com/maps/api/staticmap?center="+ position.coords.latitude +","+ position.coords.longitude +"&zoom=17&size="+width+"x"+height+"&maptype=hybrid&markers=color:red%7Ccolor:red%7Clabel:B%7C"+ position.coords.latitude +","+ position.coords.longitude +"&sensor=false";
            //"http://staticmap.openstreetmap.de/staticmap.php?center="+ position.coords.latitude +","+ position.coords.longitude +"&zoom=16&size="+width+"x"+height+"&markers="+ position.coords.latitude +","+ position.coords.longitude +",red-pushpin";
            app.position = position;
            $('#lat').val(position.coords.latitude);
            $('#lng').val(position.coords.longitude);
            $('#dir_cod').val('');
            $('#datagps').show();
        }else{
            alert( 'Tu ubicación actual es no válida' );
            app.setDirPos();
            return;
        }
    },
    
    onGpsPosFail : function (error) {
        $.mobile.loading( 'hide' );
        alert('Error al obtener Información del GPS' );
    },
    
    genRandom : function () {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 10;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        this.random = randomstring;
        return ( this.random );
    },
    validateBache : function(){
        if ( app.geotype == 'dir' ){
            if(! $('#calle').val() ) {
                alert("Debe completar una Dirección"); return false;
            }
            if(!validNumero($('#altura').val())) {
                alert("Debe completar la Altura con valores numéricos"); return false;
            }
        }
        if(! $('#tipo').val() ) {
            alert("Debe seleccionar el tamaño"); return false;
        }
        if(! $('#nombre').val() ) {
            alert("Debe escribir su nombre"); return false;
        }
        return true;
    },
    
    formSubmit : function (){
        if ( !this.validateBache() ) {
            return false;
        }
        if ( app.geotype == 'dir' ){
            $.mobile.loading( 'show', {
                text: 'Realizando búsqueda.',
                textVisible: true,
            });
            
            address = $('#calle').val() + " " + $('#altura').val() + ",Santa Fe, Santa Fe, Argentina";
            var url = "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false";
            $.getJSON( url, function(data) {
                    $.mobile.loading( 'hide' );
                    if ( data.status == "OK"){
                        result = data.results[0];
                        if (result.geometry.location_type == "APPROXIMATE" || result.geometry.location_type == "GEOMETRIC_CENTER" ){
                            alert("La dirección solicitada no es válida");
                            return false;
                        }else {
                            if ((result.geometry.location.lat < app.boundsNortheastLatitud && result.geometry.location.lat > app.boundsSouthwestLatitud) &&
                                (result.geometry.location.lng < app.boundsSouthwestLongitud && result.geometry.location.lng > app.boundsNortheastLongitud)) {
                                $('#lat').val(result.geometry.location.lat);
                                $('#lng').val(result.geometry.location.lng);
                                $('#dir_cod').val(result.formatted_address);
                               
                               app.enviarForm();
                            } else { 
                                alert('La dirección solicitada no es válida.');
                                return false;
                            }
                        }
                    }else{
                         alert('Error del servidor de Localización' );
                         return false;
                    }
                    
            });
        }else{
            app.enviarForm();
        }
       return false;
    },
    enviarForm :function (){
            $.mobile.loading( 'show', {
                text: 'Enviando Datos.',
                textVisible: true,
        });
        $.ajax({
            url: app.baseurl + "/dyn/aCelu.php",
            data: readParameters(),
            dataType:'json',
            cache: false,
            type: 'POST',
            timeout: 35000,
            error: function(request, textStatus, errorThrown)
            {
                    $.mobile.loading( 'hide' );

                    alert( "Error al enviar los datos" );
            },
            success: function(request, textStatus, errorThrown)
            {
                    $.mobile.loading( 'hide' );
                    alert( "Gracias por enviar los datos" );
                    $('#calle,#altura,#comentario,#lat,#lng,#dir_cod,#random').val('');
                    $("#imgPreview").hide();
                    app.setDirPos();
                    
            }
    });
    }
};


function validNumero(txt)
 {
    var expr = /^\d+$/;
    return txt.match(expr);
 }
 
 
function readParameters( ) {
   var obj = {};
   $(':input').each(function() {
       if ((this.type == 'checkbox' || this.type == 'radio')) {
           if (this.checked) {
               obj[this.id] = this.value
           }
       }
       else {
           obj[this.id] = this.value;
       }
    });
    return obj;
};
