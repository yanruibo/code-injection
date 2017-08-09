







				var FrasesIDs= new Array();
				var FraseIDActual=0;
				var IDCategoria;
				var InfoFraseActual=new Array();
				var estaReproduciendo=0;
			    var click_sonido=null;
			    var my_media = null;
			    var mediaTimer=null;
			    
			     $(document).ready(function() {
			     	document.addEventListener("deviceready", onDeviceReady, false);
			     });
		      	
		      	
			    //exito o fracaso de reproducir audio
				function onSuccess() {
			       // alert("playAudio():Audio Success");
			    }
				function onError(error) {
			     //   alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			    }
			    
			   
			 	
				function onDeviceReady() {
					
					initDatabase(); 
			 	   	IDCategoria = sessionStorage["IDCategoria"];
		        	console.log("IDCATEGORIA"+ IDCategoria);
		        	cargarFrases(); 
		        	click_sonido = new Media("/android_asset/www/audios/efectos/click.mp3", onSuccess, onError); 
			   }
				 
				 $(".PaginaAltavoz").live('pageshow', function(s) {
				 
				 	//funciones para controlar la pantalla que no se mueva y darle 
			        $(".PaginaAltavoz").die('pageshow');
			       // $(window).bind("orientationchange resize pageshow", fixgeometry);
			        $(this).preventUglyScroll();
			        //establezco las acciones de los botones
					$('#SiguienteFrase').bind("click",function()
					{
						if(estaReproduciendo==0)
			            {
			                if((FraseIDActual +2) ==FrasesIDs.length  )
			                {
								click_sonido.play();                    
								//desactivo la imagen para adelante
								$('#SiguienteFrase img').attr("src","img/playDISABLED.png");
								FraseIDActual++;
								cargarFraseActual();
							
			                }
			                if(( FraseIDActual +2)<FrasesIDs.length) 
			                {
			                	click_sonido.play();
			                    $('#AnteriorFrase img').attr("src","img/rev.png");
			                    $('#SiguienteFrase img').attr("src","img/play.png");
			                    FraseIDActual++;
			                   	cargarFraseActual();
			                   
							
			                }
			            }
						
					});
					
					$('#AnteriorFrase').bind("click",function()
					{
			           
			            if(estaReproduciendo==0)
			            {
			                    if( FraseIDActual -1<0)
			                    {
			                        //desactivo la imagen de para atras
			                        $('#AnteriorFrase img').attr("src","img/revDISABLED.png");
			                       
			                    }
			                    else 
			                    {   
			                        $('#SiguienteFrase img').attr("src","img/play.png");
			                        $('#AnteriorFrase img').attr("src","img/rev.png");
			                        FraseIDActual--;
			                         click_sonido.play();
							
			                }
			                 
			                cargarFraseActual();
			              
			            }
					});
					$("#imagenAltavoz").bind("click",function()
						{
							//alert("click alatavoz/esta reproduciendo=" + estaReproduciendo);
							if(estaReproduciendo==0)
							{
								estaReproduciendo=1;
								my_media.play();
								$("#imagenAltavoz").attr('src','./img/altavozActivo.png');
								
								DEMODB.transaction(  
									function (transaction) {  
										//alert("updating..."+FrasesIDs[FraseIDActual].id);
										var sqlupdate= "UPDATE Frases SET NumRep = (NumRep +1) WHERE NumRep<10 AND id= "+ FrasesIDs[FraseIDActual].id;
										transaction.executeSql(sqlupdate); 
										var sql="SELECT * FROM Frases WHERE id="+FrasesIDs[FraseIDActual].id;
										transaction.executeSql(sql, [], function (tx, results) {
										//	alert("actualizarInformacionFinish1");
											$("#repetitions").text(results.rows.item(0).NumRep + "/10"  );
								
						   				});
										transaction.executeSql(sqlupdate); 
										//ahora espero a que acabe para lanzar el metodo que cambie la imagen del altavoz
										//alert("inicializando timer pre");
										if (mediaTimer == null) {
											//alert("inicializando timer");
											mediaTimer = setInterval(function() {
												 my_media.getCurrentPosition(
													function(position) {
														 if (position < 0 ) {
															//alert(position);
															$("#imagenAltavoz").attr('src','./img/altavoz.png');
															estaReproduciendo=0;
															clearInterval(mediaTimer);
															
															mediaTimer=null;
														  
														}
														else
														{
															//alert("position" + position);
														}
													},
												// error callback
												function(e) {
													console.log("Error getting pos=" + e);
													setAudioPosition("Error: " + e);
												}
												);
											}, 300);
										}
									//	alert("updateok");
									}
								);
						
							
								
				               
				             
				            }
							else
							{
								//alert("esta reproduciendo");
								//en este momento esta reproduciendo asi que no lo puedo parar ni hacer nada
							}
					
					
					} );
					
				});
					
					
				
				
				function cargarFrases()
				{
			    	console.log("Cargando frases");
					var sql="SELECT * FROM Frases INNER JOIN CategoriasFrases ON Frases.IDCategoria=CategoriasFrases.IDCategoria WHERE Frases.IDCategoria="+IDCategoria;
			        
					var resultado = new Array();
			       // alert(DEMODB);
					DEMODB.transaction(function (tx) {
			           
						tx.executeSql(sql, [], function (tx, results) {
						   var len = results.rows.length, i;
			             	console.log("longuitud" + len);
						   for (i = 0; i < len; i++){
								FrasesIDs[i]= results.rows.item(i);
						       //  alert(results.rows.item(i).id +results.rows.item(i).TextoSPA );
						   }
			                
						  cargarFraseActual();
						   
						}, null);
					});
				
					
				}
				
				function cargarFraseActual()
				{
				//	alert("cargando frase actual");
					//relleno los campos de la vista
					
					 if(FrasesIDs[FraseIDActual].TextoENG.length<30)
			        {   
			            //le resto 20px al height de frase ingles y se lo pongo de margen por arriba
			            $(".FraseIngles").height($(".FraseIngles").height -20);
			            $(".FraseIngles").css("margin-top","20px");
			            $(".FraseIngles h2").css("font-size" ,"20px !important");
			            $(".FraseSpanish h3").css("font-size" ,"16px !important");
			           // $(".FraseIngles h2").css("font-size" ,"26px !important");
			            //$(".FraseSpanish h3").css("font-size" ,"24px !important");
			        }
			        else if(FrasesIDs[FraseIDActual].TextoENG.length> 30 && FrasesIDs[FraseIDActual].TextoENG.length < 45)
			        {   
			            $(".FraseIngles").css("margin-top","0px");
			            $(".FraseIngles").css("margin-top","0px");
			            $(".FraseIngles h2").css("font-size" ,"20px !important");
			            $(".FraseSpanish h3").css("font-size" ,"16px !important");
			           //$(".FraseIngles h2").css("font-size" ,"24px !important");
			            //$(".FraseSpanish h3").css("font-size" ,"22px !important");
			        }
			        else
			        {
			             $(".FraseIngles").css("margin-top","0px");
			             $(".FraseIngles h2").css("font-size" ,"20px !important");
			             $(".FraseSpanish h3").css("font-size" ,"16px !important");
			        }
			        fixgeometry();
			        
			        $(".FraseIngles h2").html(FrasesIDs[FraseIDActual].TextoENG  );
					$(".FraseSpanish h3").html(FrasesIDs[FraseIDActual].TextoSPA );
					if(my_media!=null)
					{
					my_media.release();
					}
					my_media = new Media(FrasesIDs[FraseIDActual].UrlAudio, onSuccess, onError);
			    	//alert("url frase:" + FrasesIDs[FraseIDActual].UrlAudio);
			        $(".contenidoAltavoz").fadeIn("slow");
			        $("#reproductor").delay(500).slideDown("slow");
			        $(".FraseIngles h2").delay(500).fadeIn('slow'); 
					$(".FraseSpanish h3").delay(500).fadeIn('slow');
			        $("#ReproducirDiv").delay(750).slideDown("slow");
			        
			        $("#repetitions").text(FrasesIDs[FraseIDActual].NumRep + "/10"  );
					$("#CounterPhrases div").text((FraseIDActual+1) +"/"+FrasesIDs.length ) ;
			        $(".headerTextTop").html(FrasesIDs[FraseIDActual].DescENG ) ;
			        $(".headerTextFooter").html(FrasesIDs[FraseIDActual].DescESP ) ;
			         
				}
				
				
		







            
             $(".Contact").live('pageshow', function(s) {
	         		   $(".Contact").die('pageshow');
	         		   $(window).bind("orientationchange resize pageshow", fixgeometry);
	         });
	         
	         
	         
	   	    





  	
  	
		var FrasesIDs= new Array();
		var FraseIDActual=0;
		var IDCategoria;
		var InfoFraseActual=new Array();
	    var my_media = null;
	    var mediaTimer=null;
	    var estaReproduciendo=0;
	    var click_sonido=null;


    //funciones del audio exito o fracaso
	function onSuccess() {
		console.log("playAudio():Audio Success");
	}
	function onError(error) {
		alert('code: '    + error.code    + '\n' + 
		'message: ' + error.message + '\n');
	}
	

	
	function onDeviceReady() {
		initDatabase(); 
		cargarFrases(); 
		click_sonido = new Media("/android_asset/www/audios/efectos/click.mp3", onSuccess, onError); 
   }

  	$("div[data-role*='page']").live('pageshow', function(s) {
		//funciones para controlar la pantalla que no se mueva y darle tamaÅ„o
		$("div[data-role*='page']").die('pageshow');
		document.addEventListener("deviceready", onDeviceReady, true);
	//	$(window).bind("orientationchange resize pageshow", fixgeometry);
		$(this).preventUglyScroll();
		//establezco las acciones de botones
		$('#SiguienteFrase').bind("click",function()
		{
			if(estaReproduciendo==0)
			{
				click_sonido.play();
				var randomnumber=Math.floor(Math.random()* FrasesIDs.length )                  
				FraseIDActual=randomnumber;
				cargarFrases();
			}
		});
		$('#AnteriorFrase').bind("click",function()
		{
            if(estaReproduciendo==0)
            { 
				click_sonido.play();
                var randomnumber=Math.floor(Math.random()* FrasesIDs.length )                  
                FraseIDActual=randomnumber;
				cargarFrases();
			}
			
		});

		
		$("#imagenAltavoz").bind("click",function()
        {
			if(estaReproduciendo==0)
			{
				estaReproduciendo=1;
				my_media.play();
				$("#imagenAltavoz").attr('src','./img/altavozActivo.png');
				DEMODB.transaction(  
					function (transaction) {  
						var sql= "UPDATE Frases SET NumRep = (NumRep +1) WHERE NumRep<10 AND id= "+FrasesIDs[FraseIDActual].id;
						transaction.executeSql(sql); 
						//alert("inicializando timer pre");
						
						var sql="SELECT * FROM Frases WHERE id="+FrasesIDs[FraseIDActual].id;
						transaction.executeSql(sql, [], function (tx, results) {
							  $("#repetitions").text(results.rows.item(0).NumRep + "/10"  );
								
							});
						
						
						if (mediaTimer == null) {
							//alert("inicializando timer");
							
							mediaTimer = setInterval(function() {
								my_media.getCurrentPosition(
									function(position) {
										if (position < 0 ) 
										{
											//alert(position);
											$("#imagenAltavoz").attr('src','./img/altavoz.png');
											estaReproduciendo=0;
											clearInterval(mediaTimer);
											
											mediaTimer=null;
										}
										else
										{
											//alert("position" + position);
										}
									},
									// error callback
									function(e) {
										console.log("Error getting pos=" + e);
									}
								);
							}, 300);
						}
					}
				);
				
			}
			else
			{
				//en este momento esta reproduciendo asi que no lo puedo parar ni hacer nada
			}
		});
	});
	
	function cargarFrases()
	{
		var sql="SELECT * FROM Frases INNER JOIN CategoriasFrases ON Frases.IDCategoria=CategoriasFrases.IDCategoria";
		var resultado = new Array();
		DEMODB.transaction(function (tx) {
			tx.executeSql(sql, [], function (tx, results) {
			   var len = results.rows.length, i;
			   for (i = 0; i < len; i++){
					FrasesIDs[i]= results.rows.item(i);
					//alert(results.rows.item(i).id +results.rows.item(i).TextoSPA );
			   }
			   cargarFraseActual();
			   
			}, null);
		});
	}
	
	function cargarFraseActual()
	{
		if(FrasesIDs[FraseIDActual].TextoENG.length<30)
        {   
			//le resto 20px al height de frase ingles y se lo pongo de margen por arriba
			$(".FraseIngles").height($(".FraseIngles").height -20);
			$(".FraseIngles").css("margin-top","20px");
		}
        else if(FrasesIDs[FraseIDActual].TextoENG.length> 30 && FrasesIDs[FraseIDActual].TextoENG.length < 45)
        {   
			$(".FraseIngles").css("margin-top","0px");
			$(".FraseIngles").css("margin-top","0px");
		}
		else
        {
			$(".FraseIngles").css("margin-top","0px");
		}
		$(".FraseIngles h2").css("font-size" ,"20px !important");
        $(".FraseSpanish h3").css("font-size" ,"16px !important");
        fixgeometry();
        $(".FraseIngles h2").html(FrasesIDs[FraseIDActual].TextoENG  );
		$(".FraseSpanish h3").html(FrasesIDs[FraseIDActual].TextoSPA );
		if(my_media!=null)
		{
			my_media.release();
		}
		my_media = new Media(FrasesIDs[FraseIDActual].UrlAudio, onSuccess, onError);
		//animaciones
		$(".contenidoAltavoz").fadeIn("slow");
        $("#reproductor").delay(500).slideDown("slow");
        $(".FraseIngles h2").delay(500).fadeIn('slow'); 
		$(".FraseSpanish h3").delay(500).fadeIn('slow');
        $("#ReproducirDiv").delay(750).slideDown("slow");
		//actualziacion datos pantalla
		$("#repetitions").text(FrasesIDs[FraseIDActual].NumRep + "/10"  );
		$("#CounterPhrases div").text((FraseIDActual+1) +"/"+FrasesIDs.length ) ;
        $(".headerTextTop").html(FrasesIDs[FraseIDActual].DescENG ) ;
        $(".headerTextFooter").html(FrasesIDs[FraseIDActual].DescESP ) ;
      	
        
	}

	
	
	
	
	


  
  	




	
	
	 $(document).bind("mobileinit", function()
		{
		  	
		   $.extend(  $.mobile , {
			    defaultPageTransition: 'none',
			    defaultDialogTransition:'none' 
 			});
		   
		});
	




	 
		function empezar()
	    {
	    	document.addEventListener("deviceready", onDeviceReady, false);
	    }
	      function onDeviceReady() {
	      	initDatabase();
	      	$(window).unbind("orientationchange resize pageshow", fixgeometry);
	     } 
	      
		
	 







	         $(".Introduccion").live('pageshow', function(s) {
	         		 $(".Introduccion").die('pageshow');
	         		 $(window).bind("orientationchange resize pageshow", fixgeometry);
	          });
	    











        
	         $(".temas").live('pageshow', function(s) {
	         		 $(".temas").die('pageshow');
	         		  $(window).unbind("orientationchange resize pageshow", fixgeometry);
	         });
         
         
         
   	    



       var fixgeometry = function() {
                /* Some orientation changes leave the scroll position at something
                 * that isn't 0,0. This is annoying for user experience. */
                scroll(0, 0);
                
                /* Calculate the geometry that our content area should take */
                var header = $("[data-role=header]");
                var footer = $("[data-role=footer]");
                var content = $("[data-role=content]");
                var viewport_height = $(window).height();
                
                var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
                
                /* Trim margin/border/padding height */
                content_height -= (content.outerHeight() - content.height());
                content.height(content_height);
                var position = content.position();
              
            }; /* fixgeometry */




(function($){
 $.fn.preventUglyScroll = function(){
 
 var node = this[0];
 
 node.ontouchstart = function(event) {
 touchStart = event;
 frameStart = $(node).offset().top;
 }
 
 node.ontouchmove = function(event){
 
 // block all two finger gestures
 if(event.touches.length > 1) {
 event.preventDefault();
 return false;
 }
 
 event.preventDefault();
 
 var yDiff     = event.pageY - touchStart.pageY;
 var newTop  = yDiff + frameStart;
 var hMin     = 460 - $(node).height();
 if(newTop <= 0 && newTop > hMin) {
 $(node).css('margin-top', newTop);
 }
 }
 }
 })(jQuery);


	var FrasesIDs= new Array();
	var FraseIDActual=0;
	var IDCategoria;
	var InfoFraseActual=new Array();
    var my_media = null;
    var mediaTimer=null;
    var estaReproduciendo=0;
    var click_sonido=null;


    //funciones del audio exito o fracaso
	function onSuccess() {
		console.log("playAudio():Audio Success");
	}
	function onError(error) {
		alert('code: '    + error.code    + '\n' + 
		'message: ' + error.message + '\n');
	}
	
	$(document).ready(function() {
		document.addEventListener("deviceready", onDeviceReady, true);
 	});
	
	function onDeviceReady() {
		initDatabase(); 
		cargarFrases(); 
		click_sonido = new Media("/android_asset/www/audios/efectos/click.mp3", onSuccess, onError); 
   }

  	$("div[data-role*='page']").live('pageshow', function(s) {
		//funciones para controlar la pantalla que no se mueva y darle tamaño
		$("div[data-role*='page']").die('pageshow');
		$(window).bind("orientationchange resize pageshow", fixgeometry);
		$(this).preventUglyScroll();
		//establezco las acciones de botones
		$('#SiguienteFrase').bind("click",function()
		{
			if(estaReproduciendo==0)
			{
				click_sonido.play();
				var randomnumber=Math.floor(Math.random()* FrasesIDs.length )                  
				FraseIDActual=randomnumber;
				cargarFrases();
			}
		});
		$('#AnteriorFrase').bind("click",function()
		{
            if(estaReproduciendo==0)
            { 
				click_sonido.play();
                var randomnumber=Math.floor(Math.random()* FrasesIDs.length )                  
                FraseIDActual=randomnumber;
				cargarFrases();
			}
			
		});

		
		$("#imagenAltavoz").bind("click",function()
        {
			if(estaReproduciendo==0)
			{
				estaReproduciendo=1;
				my_media.play();
				$("#imagenAltavoz").attr('src','./img/altavozActivo.png');
				DEMODB.transaction(  
					function (transaction) {  
						var sql= "UPDATE Frases SET NumRep = (NumRep +1) WHERE NumRep<10 AND id= "+FrasesIDs[FraseIDActual].id;
						transaction.executeSql(sql); 
						//alert("inicializando timer pre");
						if (mediaTimer == null) {
							//alert("inicializando timer");
							mediaTimer = setInterval(function() {
								my_media.getCurrentPosition(
									function(position) {
										if (position < 0 ) 
										{
											//alert(position);
											$("#imagenAltavoz").attr('src','./img/altavoz.png');
											estaReproduciendo=0;
											clearInterval(mediaTimer);
											mediaTimer=null;
											actualizarInformacion();
										}
										else
										{
											//alert("position" + position);
										}
									},
									// error callback
									function(e) {
										console.log("Error getting pos=" + e);
									}
								);
							}, 300);
						}
					}
				);
				
			}
			else
			{
				//en este momento esta reproduciendo asi que no lo puedo parar ni hacer nada
			}
		});
	});
	
	function cargarFrases()
	{
		var sql="SELECT * FROM Frases INNER JOIN CategoriasFrases ON Frases.IDCategoria=CategoriasFrases.IDCategoria";
		var resultado = new Array();
		DEMODB.transaction(function (tx) {
			tx.executeSql(sql, [], function (tx, results) {
			   var len = results.rows.length, i;
			   for (i = 0; i < len; i++){
					FrasesIDs[i]= results.rows.item(i);
					//alert(results.rows.item(i).id +results.rows.item(i).TextoSPA );
			   }
			   cargarFraseActual();
			   
			}, null);
		});
	}
	
	function cargarFraseActual()
	{
		if(FrasesIDs[FraseIDActual].TextoENG.length<30)
        {   
			//le resto 20px al height de frase ingles y se lo pongo de margen por arriba
			$(".FraseIngles").height($(".FraseIngles").height -20);
			$(".FraseIngles").css("margin-top","20px");
		}
        else if(FrasesIDs[FraseIDActual].TextoENG.length> 30 && FrasesIDs[FraseIDActual].TextoENG.length < 45)
        {   
			$(".FraseIngles").css("margin-top","0px");
			$(".FraseIngles").css("margin-top","0px");
		}
		else
        {
			$(".FraseIngles").css("margin-top","0px");
		}
		$(".FraseIngles h2").css("font-size" ,"20px !important");
        $(".FraseSpanish h3").css("font-size" ,"16px !important");
        fixgeometry();
        $(".FraseIngles h2").html(FrasesIDs[FraseIDActual].TextoENG  );
		$(".FraseSpanish h3").html(FrasesIDs[FraseIDActual].TextoSPA );
		if(my_media!=null)
		{
			my_media.release();
		}
		my_media = new Media(FrasesIDs[FraseIDActual].UrlAudio, onSuccess, onError);
		//animaciones
		$(".contenidoAltavoz").fadeIn("slow");
        $("#reproductor").delay(500).slideDown("slow");
        $(".FraseIngles h2").delay(500).fadeIn('slow'); 
		$(".FraseSpanish h3").delay(500).fadeIn('slow');
        $("#ReproducirDiv").delay(750).slideDown("slow");
		//actualziacion datos pantalla
		$("#repetitions").text(FrasesIDs[FraseIDActual].NumRep + "/10"  );
		$("#CounterPhrases div").text((FraseIDActual+1) +"/"+FrasesIDs.length ) ;
        $(".headerTextTop").html(FrasesIDs[FraseIDActual].DescENG ) ;
        $(".headerTextFooter").html(FrasesIDs[FraseIDActual].DescESP ) ;
      
        
	}
	function actualizarInformacion()
	{
		var sql="SELECT * FROM Frases WHERE id="+FrasesIDs[FraseIDActual].id;
	
		DEMODB.transaction(function (tx) {
			tx.executeSql(sql, [], function (tx, results) {
				if(results.rows.item(0).NumRep==10)
				{
					$("#repetitions").text(results.rows.item(0).NumRep + "/10"  );
				}
				else
				{
					$("#repetitions").text(results.rows.item(0).NumRep + "/10"  );
				}
			});
		}, null);
	}
	
	
	
	
	


  

ï»¿; (function($) {	/**	* Resizes an inner element's font so that the inner element completely fills the outer element.	* @author Russ Painter WebDesign@GeekyMonkey.com	* @version 0.1	* @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')	* @return All outer elements processed	* @example <div class='mybigdiv filltext'><span>My Text To Resize</span></div>	*/	$.fn.textfill = function(options) {		var defaults = {			maxFontPixels: 40,			innerTag: 'span'		};		var Opts = jQuery.extend(defaults, options);		return this.each(function() {			var fontSize = Opts.maxFontPixels;			var ourText = $(Opts.innerTag + ':visible:first', this);			var maxHeight = $(this).height();			var maxWidth = $(this).width();			var textHeight;			var textWidth;			do {				ourText.css('font-size', fontSize);				textHeight = ourText.height();				textWidth = ourText.width();				fontSize = fontSize - 1;			} while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);		});	};})(jQuery);

var DEMODB;
var shortName;
var debug=false;

function initDatabase() {  
        try {  
            	
            	//alert("iniciando---");
                if (!window.openDatabase)
                {  
                    alert('Databases are not supported in this browser.');  
                } 
                else 
                { 
                    
                    var shortName = 'DB' ;  
                    var version = '1.0';  
                    var displayName = 'DEMO1 Database';  
                    var maxSize = 100000; //  bytes  
                	if(debug){  alert("iniciando1");}
                    DEMODB = window.openDatabase(shortName, version, displayName, maxSize);
                 if(debug){ alert("iniciando2");}
                    comprobarBD();
                }
                    
                     
                
            
                
                    			
            }
            catch(e) {  
      
                if (e == 2)
                {  
                  if(debug){alert("Invalid database version.");  }
                } else
                {  
                 if(debug){ alert(e+"catch");  }
                }  
                return ;  
            }  
    
    }
	

	function comprobarBD()
    {
        try
        {   if(debug){alert("Comprobando");}
            DEMODB.transaction( 
                function (transaction) {  
                    transaction.executeSql('SELECT * FROM Frases', [], querySuccess, errorCB);
                }
            );
        }
        catch(e)
        {
           if(debug){ alert("excepcion recreando");}
            createTables();
            
        }
    
    }

    function querySuccess(transaction, results) {
        if(debug){ alert("exito");}
        if( results.rows.length==0)
        {
          if(debug){alert("exito==0");}
            createTables();
        }
        else
        {
            if(localStorage["bdcreada"]!=DEMODB.version)
            { 
            if(debug){  alert("exito>0 recreando");}

                createTables();
            }
        }
    }
        
    function errorCB(err) {
        //si ha habido error creo las tablas
       if(debug){ alert("fail"+ err);}
        createTables();
    }

	//Creamos las tablas
	function createTables(){  
        DEMODB.transaction(  
            function (transaction) {  
               
				 transaction.executeSql('DROP TABLE IF EXISTS Frases');
                transaction.executeSql('DROP TABLE IF EXISTS CategoriasFrases');
                transaction.executeSql('CREATE TABLE IF NOT EXISTS Frases(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,IDCategoria INTEGER NOT NULL, TextoSPA TEXT NOT NULL, TextoENG TEXT NOT NULL,NumRep int NOT NULL,UrlAudio TEXT NOT NULL);');
                
                transaction.executeSql('CREATE TABLE IF NOT EXISTS CategoriasFrases(IDCategoria INTEGER NOT NULL,DescESP TEXT NOT NULL,DescENG TEXT NOT NULL);');  
				
			}  
        );
        
      
        prePopulate();	
        
        
       
			
    }
	
	
	function prePopulate(){  
		DEMODB.transaction(  
        function (transaction) {  
			
			/*Campos tabla Frases
			id
			IDCategoria
			TextoSPA
			TextoENG
			NumRep
			UrlAudio
			*/
			/*Insertamos la categorias */
             
            transaction.executeSql("INSERT  INTO CategoriasFrases VALUES ( ?, ?, ?)", [ 1, 'Introducci&oacute;n', 'Introduction']); 
         
            transaction.executeSql("INSERT  INTO CategoriasFrases  VALUES ( ?, ?, ?)", [21, 'Problemas', 'Problem technique']);
             
            transaction.executeSql("INSERT  INTO CategoriasFrases VALUES ( ?, ?, ?)", [ 22, 'Hechos asombrosos', 'Amazing fact technique']);

            transaction.executeSql("INSERT  INTO CategoriasFrases VALUES ( ?, ?, ?)", [ 23, 'An&eacute;cdotas & Narraci&oacute;n', 'Story/Anecdote technique']);

            transaction.executeSql("INSERT  INTO CategoriasFrases VALUES ( ?, ?, ?)", [ 3, 'Estructuraci&oacute;n', 'Structuring']);  
          
            transaction.executeSql("INSERT  INTO CategoriasFrases  VALUES ( ?, ?, ?)", [ 4, 'Observaciones', 'Commenting on Visuals']);  
            
            transaction.executeSql("INSERT  INTO CategoriasFrases  VALUES ( ?, ?, ?)", [ 5, 'Resumir y terminar','Summarising and Concluding' ]); 
           
                           
                           
                           
                           
			//Categoria introductions 1
			 var data = ['1','1','Buenos d&iacute;as, se&ntilde;oras y se&ntilde;ores...','Good morning, ladies and gentlemen.','0','/android_asset/www/audios/introductions/introductions_1.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
		    data = ['2','1','Me gustar&iacute;a dar la bienvenida esta ma&ntilde;ana/tarde','I &acute;d like to welcome you all this morning/evening.','0','/android_asset/www/audios/introductions/introductions_2.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['3','1','Como representante de..., les doy la bienvenida...',' On behalf of ..., may I welcome you to...','0','/android_asset/www/audios/introductions/introductions_3.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['4','1','Gracias a todos por venir','Thank you all for coming','0','/android_asset/www/audios/introductions/introductions_4.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['5','1','Estoy encantado/a de estar aqu&iacute; con ustedes hoy','I&acute;m delighted to be here today.','0','/android_asset/www/audios/introductions/introductions_5.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['6','1','Pem&iacute;tanme que me presente. Me llamo...','Let me introduce myself. I&acute;m ...','0','/android_asset/www/audios/introductions/introductions_6.mp3'];  
			transaction.executeSql("INSERT   INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['7','1','Me llamo','My name&acute;s ...','0','/android_asset/www/audios/introductions/introductions_7.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['8','1','Soy jefe, ayudante, auxiliar, etc.','I&acute;m responsible for ...','0','/android_asset/www/audios/introductions/introductions_8.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['9','1','Soy responsable de...','I&acute;m in charge of...','0','/android_asset/www/audios/introductions/introductions_9.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['10','1','Esta ma&ntilde;ana/tarde me gustar&iacute;a hablarles de ...','This morning/evening I would like to talk to you about...','0','/android_asset/www/audios/introductions/introductions_10.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			
			
			
			/*Categoria Efective Openings*/ 
			//Problem technique 21
			data = ['11','21','Supongamos que... &iquest;C&oacute;mo afrontar&iacute;an este...?','Suppose... How would you ...?','0','/android_asset/www/audios/efective_openings/effective_openings_1.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['12','21','&iquest;Se han preguntado alguna vez por qu&eacute;...?','Have you ever wondered why it is that ...? You have?','0','/android_asset/www/audios/efective_openings/effective_openings_2.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['13','21','Bueno, si pudiera mostrarles... &iquest;estar&iacute;an interesados en...?','Well, if I could show you ... would you be interested?','0','/android_asset/www/audios/efective_openings/effective_openings_3.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['14','21','Bueno, imag&iacute;nense...&iquest;Creen que ser&iacute;a posible...?','Well, imagine ... Do you think that&acute;s possible?','0','/android_asset/www/audios/efective_openings/effective_openings_4.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			//amazing fast technique 22
			data = ['15','22','&iquest;Sab&iacute;an que...?','Did you know that ...?','0','/android_asset/www/audios/efective_openings/effective_openings_5.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['16','22','De acuerdo con los &uacute;ltimos estudios...','According to the latest study, ...','0',' ¡/android_asset/www/audios/efective_openings/effective_openings_6.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['17','22','Las estad&iacute;sticas muestran que...','Statistics show that ...','0','/android_asset/www/audios/efective_openings/effective_openings_7.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);  
			data = ['18','22','Le&iacute; el otro d&iacute;a que...','I read somewhere the other day that...','0','/android_asset/www/audios/efective_openings/effective_openings_8.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			
			//Story/ Anecdote technique 23
			data = ['19','23','Saben...,','You know, ...','0','/android_asset/www/audios/efective_openings/effective_openings_9.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['20','23','Cuando pienso en...','When I think about ...','0','/android_asset/www/audios/efective_openings/effective_openings_10.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['21','23','Han estado en una situaci&oacute;n en la que...',' Have you been in situation where...','0','/android_asset/www/audios/efective_openings/effective_openings_11.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['22','23','Recuerdo cuando','I remember when','0','/android_asset/www/audios/efective_openings/effective_openings_12.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['23','23','Result&oacute; ser...','It turned out...','0','/android_asset/www/audios/efective_openings/effective_openings_13.mp3'];  
			
			
			
			
			/*Strcuturing 3*/
			data = ['24','3','Me gustar&iacute;a empezar por...','I would like to begin by...','0','/android_asset/www/audios/structuring/structuring_1.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['25','3','Comencemos la presentaci&oacute;n','Let&acute;s start with my presentation...','0','/android_asset/www/audios/structuring/structuring_2.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['26','3','He dividido la presentaci&oacute;n en tres partes principales: primero....; segundo.... Y por &uacute;ltimo',' I have divided my talk into three main parts: firstly,... secondly,... and, finally...','0','/android_asset/www/audios/structuring/structuring_3.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['27','3','Empezar&eacute; por decirles que,...luego echaremos un vistazo a....y les explicar&eacute; c&oacute;mo... Finalmente, les proporcionar&eacute; y mostrar&eacute; unas ...',' I&acute;ll start by telling you ..., then we&acute;ll look at ... and I&acute;ll explain how ... Finally, I&acute;ll give and show you ....','0','/android_asset/www/audios/structuring/structuring_4.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['28','3','Lo primero de todo...','So, first of all...','0','/android_asset/www/audios/structuring/structuring_5.mp3']; 
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);
			data = ['29','3','Sigamos adelante con...','Moving on now to ...','0','/android_asset/www/audios/structuring/structuring_6.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['30','3','Pasemos a...','Let&acute;s now turn to ...','0','/android_asset/www/audios/structuring/structuring_7.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['31','3','Ahora vemos que...','Now, turning to...','0','/android_asset/www/audios/structuring/structuring_8.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['32','3','Ahora, y qu&eacute; tal si ...?','Now, what about...?','0','/android_asset/www/audios/structuring/structuring_9.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['33','3','Traslad&eacute;mosnos a...',' Let\'s move on to ...','0','/android_asset/www/audios/structuring/structuring_10.mp3']; 
			
			
			
			/*Commenting on visuals  4*/ 
			data = ['24','4','Me gustar&iacute;a que nos centr&aacute;ramos en','I&acute;d like us to focus our attention on ...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_1.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['25','4','Lo que cabe destacar aqu&iacute; es...',' What is interesting/important here is ...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_2.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['26','4','Estoy seguro de que las implicaciones en este sentido han quedado claras','I&acute;m sure the implications are clear to all of us...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_3.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['27','4','Las cifras en la tabla muestran','The figures in this table show ...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_4.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['28','4','Es importante darnos cuenta de que...','It is important to notice that...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_5.mp3']; 
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);
			data = ['29','4','Esta tabla compara los...','This chart compares....','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_6.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['30','4','Si se fijan en la parte superior derecha','If you look at the top right&#45;hand corner...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_7.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['31','4','La l&iacute;nea punteada representa...','The blue dotted line represents...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_8.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['32','4','La mitad superior muestra...','The top half shows...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_9.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['33','4','Ahora les mostrar&eacute; la siguiente tabla sobre...','Now, I&acute;ll show you a chart where ...','0','/android_asset/www/audios/commenting_on_visuals/commenting_on_visuals_10.mp3']; 
			
			
			/*Summarising and concluding 5 */
			data = ['35','5','Llegados a este punto me gustar&iacute;a volver a repasar los puntos principales','At this stage, I&acute;d like to run through my main points again.','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_1.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 	
			data = ['36','5','To summarize the main points of my talk, ...','Resumiendo los puntos principales de mi presentaci&oacute;n...','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_2.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['37','5','Resumiendo por lo tanto...','To sum up then,...','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_3.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['38','5','Me gustar&iacute;a finalizar diciendo/mostrando/haciendo...',' I&acute;d like to thank you all for your attention.','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_4.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
			data = ['39','5','Y esto &uacute;ltimo me trae al final de mi presentaci&oacute;n',' That brings me to the end of my presentation','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_5.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 
            data = ['40','5','Me gustar&iacute;a agradecerles a todos su atenci&oacute;n',' I &acute;d like to thank you all for your attention. ','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_6.mp3'];  
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]); 

            data = ['41','5','Gracias a todos por su atenci&oacute;n/tiempo.','Thank you all for listening/for your time.','0','/android_asset/www/audios/summarising_concluding/summarising_concluding_7.mp3']; 
			transaction.executeSql("INSERT  INTO Frases( IDCategoria, TextoSPA, TextoENG, NumRep,UrlAudio) VALUES ( ?, ?, ?, ?,?)", [ data[1], data[2], data[3], data[4],data[5]]);
          
           
			//localStorage["datosInsertados"]=DEMODB.version;
            localStorage.setItem('bdcreada', DEMODB.version);
            
           if(debug){ alert("creado");}
		}  
		
    );
	
}







	var FrasesIDs= new Array();
	var FraseIDActual=0;
	var IDCategoria;
	var InfoFraseActual=new Array();
	var estaReproduciendo=0;
    var click_sonido=null;
    var my_media = null;
    var mediaTimer=null;
 
   
	
	document.addEventListener("deviceready", onDeviceReady, true);
	
   //exito o fracaso de reproducir audio
	function onSuccess() {
     //   alert("playAudio():Audio Success");
    }
	function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
    /*
		function () {
			alert("lanzadoespera");
			document.addEventListener("deviceready", onDeviceReady, true);
	 	});
 	*/
	function onDeviceReady() {
	 
	 	   
	 	    alert("init");
	 	   	initDatabase(); 
	 	   	IDCategoria = sessionStorage["IDCategoria"];
        	console.log("IDCATEGORIA"+ IDCategoria);
        
        	cargarFrases(); 
        	click_sonido = new Media("/android_asset/www/audios/efectos/click.mp3", onSuccess, onError); 
   }
	 
	 $("div[data-role*='page']").live('pageshow', function(s) {
		//funciones para controlar la pantalla que no se mueva y darle 
        $("div[data-role*='page']").die('pageshow');
      
      //$(window).bind("orientationchange resize pageshow", fixgeometry);
        $(this).preventUglyScroll();
		
		//establezco las acciones de los botones
		$('#SiguienteFrase').bind("click",function()
		{
			if(estaReproduciendo==0)
            {
                if((FraseIDActual +2) ==FrasesIDs.length  )
                {
					click_sonido.play();                    
					//desactivo la imagen para adelante
					$('#SiguienteFrase img').attr("src","img/playDISABLED.png");
					FraseIDActual++;
					cargarFraseActual();
				
                }
                if(( FraseIDActual +2)<FrasesIDs.length) 
                {
                	click_sonido.play();
                    $('#AnteriorFrase img').attr("src","img/rev.png");
                    $('#SiguienteFrase img').attr("src","img/play.png");
                    FraseIDActual++;
                   	cargarFraseActual();
                  
				
                }
            }
			
		});
		
		$('#AnteriorFrase').bind("click",function()
		{
           
            if(estaReproduciendo==0)
            {
                    if( FraseIDActual -1<0)
                    {
                        //desactivo la imagen de para atras
                        $('#AnteriorFrase img').attr("src","img/revDISABLED.png");
                       
                    }
                    else 
                    {   
                        $('#SiguienteFrase img').attr("src","img/play.png");
                        $('#AnteriorFrase img').attr("src","img/rev.png");
                        FraseIDActual--;
                        click_sonido.play();
				
                }
                 
                cargarFraseActual();
               
            }
		});
		$("#imagenAltavoz").bind("click",function()
			{
				//alert("click alatavoz/esta reproduciendo=" + estaReproduciendo);
				if(estaReproduciendo==0)
				{
					estaReproduciendo=1;
					my_media.play();
					$("#imagenAltavoz").attr('src','./img/altavozActivo.png');
					DEMODB.transaction(  
						function (transaction) {  
							var sqlupdate= "UPDATE Frases SET NumRep = (NumRep +1) WHERE NumRep<10 AND id= "+ FrasesIDs[FraseIDActual].id;
						//	alert ( "UDPATE"+sqlupdate);
							transaction.executeSql(sqlupdate); 
							
							actualizarInformacion();
							
							//ahora espero a que acabe para lanzar el metodo que cambie la imagen del altavoz
						
							//alert("inicializando timer pre");
							if (mediaTimer == null) {
								//alert("inicializando timer");
								mediaTimer = setInterval(function() {
									    my_media.getCurrentPosition(
										function(position) {
											 if (position < 0 ) {
												//alert(position);
												$("#imagenAltavoz").attr('src','./img/altavoz.png');
												estaReproduciendo=0;
												
												clearInterval(mediaTimer);
												mediaTimer=null;
												
											   
											}
											else
											{
												//alert("position" + position);
											}
										},
									// error callback
									function(e) {
										console.log("Error getting pos=" + e);
										setAudioPosition("Error: " + e);
									}
									);
								}, 300);
							}
						//	alert("updateok");
						}
					);
			
				
					
	               
	             
	            }
				else
				{
					//alert("esta reproduciendo");
					//en este momento esta reproduciendo asi que no lo puedo parar ni hacer nada
				}
		
		
		} );
		
	});
		
		
	
	
	function cargarFrases()
	{
    	console.log("Cargando frases");
		var sql="SELECT * FROM Frases INNER JOIN CategoriasFrases ON Frases.IDCategoria=CategoriasFrases.IDCategoria WHERE Frases.IDCategoria="+IDCategoria;
        
		var resultado = new Array();
       // alert(DEMODB);
		DEMODB.transaction(function (tx) {
           
			tx.executeSql(sql, [], function (tx, results) {
			   var len = results.rows.length, i;
             	console.log("longuitud" + len);
			   for (i = 0; i < len; i++){
					FrasesIDs[i]= results.rows.item(i);
				//alert(results.rows.item(i).id +results.rows.item(i).TextoSPA );
			   }
                
			  cargarFraseActual();
			   
			}, null);
		});
	
		
	}
	
	function cargarFraseActual()
	{
	//	alert("cargando frase actual");
		//relleno los campos de la vista
		
		 if(FrasesIDs[FraseIDActual].TextoENG.length<30)
        {   
            //le resto 20px al height de frase ingles y se lo pongo de margen por arriba
            $(".FraseIngles").height($(".FraseIngles").height -20);
            $(".FraseIngles").css("margin-top","20px");
            $(".FraseIngles h2").css("font-size" ,"20px !important");
            $(".FraseSpanish h3").css("font-size" ,"16px !important");
           // $(".FraseIngles h2").css("font-size" ,"26px !important");
            //$(".FraseSpanish h3").css("font-size" ,"24px !important");
        }
        else if(FrasesIDs[FraseIDActual].TextoENG.length> 30 && FrasesIDs[FraseIDActual].TextoENG.length < 45)
        {   
            $(".FraseIngles").css("margin-top","0px");
            $(".FraseIngles").css("margin-top","0px");
            $(".FraseIngles h2").css("font-size" ,"20px !important");
            $(".FraseSpanish h3").css("font-size" ,"16px !important");
           //$(".FraseIngles h2").css("font-size" ,"24px !important");
            //$(".FraseSpanish h3").css("font-size" ,"22px !important");
        }
        else
        {
             $(".FraseIngles").css("margin-top","0px");
             $(".FraseIngles h2").css("font-size" ,"20px !important");
             $(".FraseSpanish h3").css("font-size" ,"16px !important");
        }
        fixgeometry();
        
        $(".FraseIngles h2").html(FrasesIDs[FraseIDActual].TextoENG  );
		$(".FraseSpanish h3").html(FrasesIDs[FraseIDActual].TextoSPA );
		if(my_media!=null)
		{my_media.release();
		}
		my_media = new Media(FrasesIDs[FraseIDActual].UrlAudio, onSuccess, onError);
    	//alert("url frase:" + FrasesIDs[FraseIDActual].UrlAudio);
        $(".contenidoAltavoz").fadeIn("slow");
        $("#reproductor").delay(500).slideDown("slow");
        $(".FraseIngles h2").delay(500).fadeIn('slow'); 
		$(".FraseSpanish h3").delay(500).fadeIn('slow');
        $("#ReproducirDiv").delay(750).slideDown("slow");
        
        $("#repetitions").text(FrasesIDs[FraseIDActual].NumRep + "/10"  );
		$("#CounterPhrases div").text((FraseIDActual+1) +"/"+FrasesIDs.length ) ;
        $(".headerTextTop").html(FrasesIDs[FraseIDActual].DescENG ) ;
        $(".headerTextFooter").html(FrasesIDs[FraseIDActual].DescESP ) ;
      	actualizarInformacion();
        
	}
	
	function actualizarInformacion()
	{
		var sql="SELECT * FROM Frases WHERE id="+FrasesIDs[FraseIDActual].id;
		DEMODB.transaction(function (tx) {
			tx.executeSql(sql, [], function (tx, results) {
					//alert("actualizarInformacionFinish1");
					$("#repetitions").text(results.rows.item(0).NumRep + "/10"  );
					
			   });
			
			   
			}, null);
		
		
	}
	
