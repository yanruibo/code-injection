









document.addEventListener("deviceready", onDeviceReady, false);

        
function onDeviceReady() 
{



var lang = "en";


if (lang == 'es')
{

$("#trad_elije_tu_foto").html("3.- Elije tu foto:");
$("#trad_selecciona_efecto").html("2.- Selecciona un efecto:");
$("#trad_selecciona_categoria").html("1.- Selecciona una categoria:");
$("#trad_tarjetas_de_amor").html("Tarjetas de amor");
$("#trad_especiales").html("Especiales");
$("#trad_infantil").html("Marcos infantiles");
$("#trad_marcos_fotos").html("Marcos para fotos");
$("#trad_postales").html("Postales de cumpleaños");
$("#trad_modificar_fotos").html("Filtros para fotos");
$("#trad_collages").html("Collages");
$("#trad_varios").html("Varios");
$("#trad_imagenes_perfil").html("Imagenes de perfil");
$("#trad_grabar_imagen").html("Grabar Imagen");
$("#trad_grabar_imagen2").html("Grabar Imagen");
$("#trad_probar_otro_efecto").html("Probar otro efecto");
$("#trad_enviar_por_email").html("Enviar por email");
$("#trad_si_te_ha_gustado").html("Si te ha gustado, votanos en la Play Store! ;)");
$("#trad_subir_otra_foto").html("Subir otra foto");
$("#trad_solo_tarda_segundos").html("Solo tarda unos segundos");
var trad_conectado_a_internet = "Para utilizar fotoefectos, debes estar conectado a internet";
var trad_no_hemos_podido = 'No hemos podido grabar la imagen :(';
var trad_no_podido_descargar = 'No hemos podido descargar la imagen. Prueba a buscar la imagen en tu libreria(icono carpeta)';
var trad_google_analytics_id = "UA-134202-91";
var trad_foto_guardada = "Foto guardada! en";
    ga_storage._setAccount('UA-134202-91'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/index.html');



}
else
{
$("#trad_elije_tu_foto").html("3.- Choose your photo:");
$("#trad_selecciona_efecto").html("2.- Select an effect: ");
$("#trad_selecciona_categoria").html("1.- Select a category:");
$("#trad_tarjetas_de_amor").html("love cards");
$("#trad_especiales").html("Special");
$("#trad_infantil").html("Childrens hoto frames");
$("#trad_marcos_fotos").html("Photo Frames");
$("#trad_postales").html("birthday cards");
$("#trad_modificar_fotos").html("Photo Filters");
$("#trad_collages").html("Collage");
$("#trad_varios").html("Miscellaneous");
$("#trad_imagenes_perfil").html("profile pictures");
$("#trad_grabar_imagen").html("Save Image");
$("#trad_grabar_imagen2").html("Save Image");
$("#trad_probar_otro_efecto").html("Try another effect");
$("#trad_enviar_por_email").html("Email");
$("#trad_si_te_ha_gustado").html("If you like, Vote for us in the Play Store!;)");
$("#trad_subir_otra_foto").html("Upload another photo");
$("#trad_solo_tarda_segundos").html("only takes a few seconds");
var trad_conectado_a_internet  = "To use upload process, you must be connected to the internet";
var trad_no_hemos_podido = 'We could not record the picture: (';
var trad_no_podido_descargar = 'We could download the image. Try searching the image in your library (folder icon) ';
var trad_google_analytics_id = "UA-134202-92";

var trad_foto_guardada = "Image saved in";


    ga_storage._setAccount('UA-134202-92'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/index.html');

}




if(navigator.onLine)
{
}
else
{
alert(trad_conectado_a_internet);
otra_foto();
}

}
    
    
    
function getImage() {

if(navigator.onLine)
{

            navigator.camera.getPicture(uploadPhoto, function(message) {
					alert(trad_no_hemos_podido);
				},{
					quality: 65,
					targetWidth: 800,
  					targetHeight: 800,
		            destinationType: navigator.camera.DestinationType.FILE_URI,
		            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
				}
            );
}
else
{
alert(trad_conectado_a_internet);
otra_foto();
}



        }
        
        
function getImage2() 
{

if(navigator.onLine)
{
document.getElementById('loading').style.display = 'inline';
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
					alert(trad_no_podido_descargar);
				},{
					quality: 65,
					targetWidth: 800,
  					targetHeight: 800,
		            destinationType: navigator.camera.DestinationType.FILE_URI,
		            sourceType: navigator.camera.PictureSourceType.CAMERA
				}
            );


document.getElementById('loading').style.display = 'none';
}
else
{
alert(trad_conectado_a_internet);
otra_foto();
}

}



function uploadPhoto(imageURI) {
 
 
 //alert("uploadPhoto");
        
        		document.getElementById('loading').style.display = 'inline';
        
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

		document.getElementById('selecciona').style.display = 'none';


            var ft = new FileTransfer();
            ft.upload(imageURI, "http://www.fotoefectos.com/phonegap/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            //alert(r.response);
            
            			var random;
						random = Math.floor((Math.random()*100)+1);
						


	
			  

          
            
            
            document.getElementById("captura").src = r.response+'?rand='+random;
            document.getElementById("imagen_sin_tratar").value = r.response;
            document.getElementById("selecciona").style.display = "none";
            document.getElementById("efectos").style.display = "inline";
            
       carga_html();     
       			document.getElementById('loading').style.display = 'none';		     

        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }
        
        
function saveto_folder()
        {
        
        
        var file;
        file = document.getElementById("final").src;
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        window.resolveLocalFileSystemURI(file, onResolveSuccess, fail);
        
        }
        
        
  function onFileSystemSuccess(fileSystem) {
        alert('ok: '+fileSystem.name);
    }

    function fail(evt) {
        alert('error'+evt.target.error.code);
    }
        
        
        

function devuelve_ajax(valor,girar)
{


if (!document.getElementById('imagen_sin_tratar').value)
{

//alert("devuelve_ajax 1");
probar_otro();

document.getElementById('valor').value = valor;
document.getElementById('girar').value = girar;
}
else
{
//alert("devuelve_ajax 2");
document.getElementById('loading').style.display = 'inline';			
var imagen_sin_tratar = document.getElementById('imagen_sin_tratar').value;
document.getElementById("efectos").style.display = "none";    


if (valor == "repetir")
{

valor = document.getElementById('ultimo_efecto').value;

}
else
{
document.getElementById('ultimo_efecto').value = valor;
}





			
				var ajax = new XMLHttpRequest();
				ajax.open("GET","http://www.fotoefectos.com/phonegap/upload.php?imagen_sin_tratar="+imagen_sin_tratar+"&efecto="+valor+"&girar="+girar,true);
				ajax.send();
				
				ajax.onreadystatechange=function()
				{
					if(ajax.readyState==4 && (ajax.status==200||ajax.status==0))
					{

var random;
random = Math.floor((Math.random()*100)+1);
document.getElementById("final_value").value = ajax.responseText;
document.getElementById("final").src = ajax.responseText+'?rand='+random;
document.getElementById("finalgrande").src = ajax.responseText+'?rand='+random;
document.getElementById("finaldiv").style.display = "inline";
document.getElementById('loading').style.display = 'none';  


					}

				}


}//fin else de que no hay imagen

			} //fin devuelve_ajax




function carga_html(categoria)
{

function hideElements(className,quehacer)
{
    var elements = document.getElementsByClassName(className);
    for(var i = 0, length = elements.length; i < length; i++) 
    {
          elements[i].style.display = quehacer;
    }
}


//si esta lleno efectos_rellenar no hacerlo de nuevo
if(navigator.onLine && document.getElementById("se_ha_rellenado_div_efectos").value == 0 && categoria)
{

document.getElementById("categoria_seleccionada").value =categoria;

document.getElementById('loading').style.display = 'inline';			
				var ajax = new XMLHttpRequest();
				ajax.open("GET","http://www.fotoefectos.com/phonegap/upload.php?devuelve_html=1&categoria=categoria",true);
				ajax.send();
				
				ajax.onreadystatechange=function()
				{
					if(ajax.readyState==4 && (ajax.status==200||ajax.status==0))
					{
				document.getElementById("efectos_rellenar").innerHTML = ajax.responseText;
			//	alert(ajax.responseText);
				document.getElementById("se_ha_rellenado_div_efectos").value =1;
				
				hideElements('modificar-fotos','none');
hideElements('especiales','none');
hideElements('infantil','none');
hideElements('postales','none');
hideElements('modificar-fotos','none');
hideElements('amor','none');
hideElements('varios','none');
hideElements('marcos-fotos','none');
hideElements('collages','none');
hideElements('imagenes-perfil','none');
hideElements(categoria,'inline');
hideElements('conteo','inline');
document.getElementById("titulo_selecciona").style.display = "inline";
$("html, body").animate({ scrollTop: 0 }, "slow");			
				
					}
				}	


document.getElementById('loading').style.display = 'none';


}
else
{


if (categoria == 'recargar')
{
var categoria = document.getElementById('categoria_seleccionada').value;




document.getElementById("efectos").style.display = "inline";
document.getElementById("efectos_rellenar").style.display = "inline";
document.getElementById("finaldiv").style.display = "none";
document.getElementById("ultimo_efecto").value = "";

}
else
{

//alert("carga_html no recargargamos");
hacemos_efecto();
}

hideElements('modificar-fotos','none');
hideElements('especiales','none');
hideElements('infantil','none');
hideElements('postales','none');
hideElements('modificar-fotos','none');
hideElements('amor','none');
hideElements('varios','none');
hideElements('marcos-fotos','none');
hideElements('collages','none');
hideElements('imagenes-perfil','none');
hideElements(categoria,'inline');
hideElements('conteo','inline');
document.getElementById("titulo_selecciona").style.display = "inline";
$("html, body").animate({ scrollTop: 0 }, "slow");





if(!navigator.onLine)
{
alert(trad_conectado_a_internet);
otra_foto()
}



}





}



function hacemos_efecto()
{

//alert("hacemos_efecto");

var valor = document.getElementById('valor').value;
var girar = document.getElementById('girar').value;

devuelve_ajax(valor,girar);

}



function probar_otro()
{

//alert("probar_otro");

document.getElementById("efectos").style.display = "none";
document.getElementById("finaldiv").style.display = "none";
document.getElementById("selecciona").style.display = "inline";



}



//graba la foto en la tarjeta SD
function grabar_foto() {

document.getElementById('loading').style.display = 'inline';

var remoteFile = document.getElementById("final_value").value;
var nameImagen = Math.floor((Math.random()*100000)+10000);



var NameImagen2  ='/data/data/fotoefectos.com/'+nameImagen+'.jpeg';
var NameImagen2 = '/data/data/fotoefectos.com/'+nameImagen+'.jpeg';
var NameImagen2  ='/mnt/sdcard/Pictures/fotoefectos.com/'+nameImagen+'.jpeg';

window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 

function onRequestFileSystemSuccess(fileSystem) { 
var entry=fileSystem.root;
        
entry.getDirectory("/mnt/sdcard/Pictures/fotoefectos.com", {create: true, exclusive: false}, onGetDirectorySuccess, 

onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
      console.log("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
     console.log("Error creating directory "+error.code); 
} 
        
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                var localPath = fileEntry.fullPath;
                if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
                }
                var ft = new FileTransfer();
                ft.download(remoteFile, NameImagen2, function(entry) {
var gallery = cordova.require("cordova/plugin/gallery");
gallery.add(NameImagen2, 
    function(result) {
        console.log("photo added");
        alert('Image saved! /sdcard/Pictures/fotoefectos.com/'+nameImagen+'.jpeg');
         document.getElementById('loading').style.display = 'none';
    }, function(error) {
        console.log("photo not added");
        alert('error');
         document.getElementById('loading').style.display = 'none';
        
    });

         
                 
                    }, fail);
            }, fail);
        }, fail);
    }
    
    function fail(error) {
        console.log(error.code);
         alert("error");
 		document.getElementById('loading').style.display = 'none';
 
    }

function otra_foto()
{
	document.getElementById("selecciona").style.display = "inline";
	document.getElementById("efectos").style.display = "none";
	document.getElementById("finaldiv").style.display = "none";
	document.getElementById("titulo_selecciona").style.display = "none";
	$("html, body").animate({ scrollTop: 0 }, "slow");
}


 
