








	var currentImage=null;
	 function convertCanvasToImage(canvas) {
			
                var image = new Image();
                image.src = canvas.toDataURL("image/jpg");
                return image;
            }
            
      function convertImageToCanvas(image2) {
            var canvas = document.createElement("canvas");
                canvas.width = image2.width;
                canvas.height = image2.height;
				canvas.id="mycanvas1"; 
				
                canvas.getContext("2d").drawImage(image2, 0, 0);
                 
                return canvas;
            }       
            
     
     
     
     function saveBtnClick2(){
     	
     		
     		var image3 = new Image();
     	x="images/"+currentImage+".jpg";
     	image3.src=x;
     	
		 var canvas3 = document.getElementById('canvasA');
                canvas3.width = image3.width;
                canvas3.height = image3.height;
				
				
                canvas3.getContext("2d").drawImage(image3, 0, 0);
           
		
		
		
		
							
				$('.ps-toolbar').fadeOut('fast', function() {
   					window.savephotoplugin(canvas3,"image/jpg",device.version,function(val){ 
					  //returns you the saved path in val	
					  $(".ps-toolbar").fadeIn('fast');
					  $(".ps-caption").fadeIn('fast');
							alert("Photo Saved: " + val);	
						});
	  				});			
								
			
			
     }       
	
	
			
		(function(window, PhotoSwipe){
		
			document.addEventListener('DOMContentLoaded', function(){
			var
					sayHiEl,
					sayHiClickHandler = function(e){
						//alert('Hi!');
						
					}
				var
					options = {
					getToolbar: function(){
							return '<div class="ps-toolbar-close" style="padding-top: 12px;"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-previous" style="padding-top: 12px;"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-next" style="padding-top: 12px;"><div class="ps-toolbar-content"></div></div><div class="say-hi" style="padding-top: 12px;"><div class="ps-toolbar-content savedisk say-hi2"></div></div>';
							// NB. Calling PhotoSwipe.Toolbar.getToolbar() wil return the default toolbar HTML
						
						}
				
					},
					instance = PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), options );
			
					// onShow - store a reference to our "say hi" button
					instance.addEventHandler(PhotoSwipe.EventTypes.onShow, function(e){
						sayHiEl = window.document.querySelectorAll('.say-hi2')[0];
					});
					
					// onToolbarTap - listen out for when the toolbar is tapped
					instance.addEventHandler(PhotoSwipe.EventTypes.onToolbarTap, function(e){
						if (e.toolbarAction === PhotoSwipe.Toolbar.ToolbarAction.none){
							if (e.tapTarget === sayHiEl || Util.DOM.isChildOf(e.tapTarget, sayHiEl)){
								currentImage= currentImage.replace('Ultimate Boobs ','');
								//alert(currentImage);
								saveBtnClick2();
							}
						}
					});
					
					// onBeforeHide - clean up
					instance.addEventHandler(PhotoSwipe.EventTypes.onBeforeHide, function(e){
						sayHiEl = null;
					});
					
					// onDisplayImage
					instance.addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function(e){
					// w caption zdjec bedzie trzymate miedzy innymi id
						currentImage=instance.getCurrentImage().caption;
						
						
					});
			
			}, false);
			
			
		}(window, window.Code.PhotoSwipe));
		$(document).bind('mobileinit', function () {
	    $.mobile.allowCrossDomainPages = true;
	   $.mobile.zoom.enabled = false;
	   $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
	   $.mobile.defaultDialogTransition = 'none';
	    $.mobile.defaultPageTransition = 'none';
	$.mobile.page.prototype.options.domCache = false;
	});
	




		$(document).ready(function() {
			$('#container').easyTabs({defaultContent:1});
		});
	

/*load photos*/
// metoda random dla tablicy

// tworzenie tablicy ze 200 fotami

fotoarray = new Array;
var fotoarray = new Array();
for (var i=0;i<499;i++)
{ 
	fotoarray[i]=i+1;
}
var x = "";
for (var i=0;i<499;i++)
{ 
	x+=fotoarray[i]+",";
}


// obliczanie szerokosci i ustawianie  marginesu
function getWidith()
{
	x=$(document).width()-20;

	//$("#Gallery").css("margin-left",'10px');
	$("#Gallery").css("margin-right",'10px');
	
	// y -ilosc calych ktore moge wrzucic w jednej lini
	y= Math.floor(x/90);
	//z - reszta ktora zostanie podzielina przez 2 
	z= Math.floor((x-(y*90))/2);
	//$("#Gallery").css("padding-left",z+'px');
	$("#Gallery").css("margin-left",(z)+'px');
	$("#Gallery").css("width",(x-z)+'px');
}
function exitFromApp()
{
//	alert("d1");
	//device.exitApp();
 navigator.app.exitApp();
 // alert("d2");
}
// funkcja liczacza wielkosc okna i ile moze walnac fotek

$(document).ready(function(){
	//$(window).load(function(){
$(window).resize(function(){
	
	getWidith();
	});
var a='<ul id="Gallery" class="gallery">';
for (var i=0;i<499;i++)
{ 
a+='<li><a href="images/'+fotoarray[i]+'.jpg" rel="external"><img src="images/th/'+fotoarray[i]+'.jpg" alt="Ultimate Boobs '+fotoarray[i]+'" /></a></li>';
	
}
a+='</ul>';
$("#gall").append(a);

getWidith();
 
}); //end document.ready
