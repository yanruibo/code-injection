






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        













        	var trackID = "track01" ;
			var itemID = "item01" ;
            var itemTitle = "" ;
			var bVideo = false ;        // Se c'č un video devo permettere la rotazione
            var pathToRoot ;
            var vp;
			var imgOld = "" ;
            var objOld ;
			var imgArray = new Array();
			var divArray = new Array();
            var langId = loadLanguage();
			var audioArray = new Array();
			var raccontoTemaArray = new Array();
			var titoloID = 0 ;
            var testoScroll = null ;
			var progettoScroll = null ;
            
             // Variabili Video 
            var videoServerDir = "http://www.rmdtmsoft.it/h3g/iphone/video/iphone/" ;            
            var videoLocalDir = "sdcard/android/data/it.h3g.storeconcepts/" ;            
            var videoFile = new Array();
            videoFile [0] = "go2mkt_video_1.mp4" ;  
            videoFile [1] = "go2mkt_video_2.mp4" ;
            videoFile [2] = "go2mkt_video_3.mp4" ;
            videoFile [3] = "go2mkt_video_4.mp4" ;
            videoFile [4] = "go2mkt_video_5.mp4" ;
            videoFile [5] = "go2mkt_video_6.mp4" ;
            videoFile [6] = "go2mkt_video_7.mp4" ;
            videoFile [7] = "go2mkt_video_8.mp4" ;
            
            /*
			 PhoneGap Inizio
			 */
            function onBodyLoad()
            {
				document.addEventListener("deviceready", onDeviceReady, false);
				
                //Settaggio lingua di tutto il body
                
                $("body").attr("class", langId);
				
				
            }
            
            function onDeviceReady()
            {
				console.log ( "index.html::onDeviceReady" ) ;
                vp = window.plugins.videoPlayer;
				
            }
            
            // Callback per il VideoPlugin, quando finisce ritorna qui
            var videoplayerCallBack = function(param) { // callback function should be: pluginname + CallBack
                if (param == 'finish') {
                    //$('#status').html("finish playing");
                    //navigator.notification.alert("finish");
                }
            };
            
            
            /*
			 PhoneGap Fine
			 */
            
            document.ontouchmove = function(e){ 
             	e.preventDefault();
             }
			
            /*
			 JQTouch Start
			 */
            
            var jQT = new $.jQTouch({
				icon: 'jqtouch.png',
				addGlossToIcon: false,
				startupScreen: './img/iphone/testata.png',
				statusBar: 'black',
				preloadImages: [
					'./scroll_themes/apple/img/backButton.png',
					'./scroll_themes/apple/img/backButtonActive.png',
					'./scroll_themes/apple/img/loading.gif'
				],
				slideSelector: '.slide'
			});
			function controlloRotazioneDisplay()
			{
				if ( Math.abs ( window.orientation ) == 90 || Math.abs ( window.orientation ) == 270) {
					$("#jqt").hide();
					$("#rotazionedisplay").show();
				}else{
					$("#rotazionedisplay").hide();
					$("#jqt").show();
					
				}
				
			}

     
            $(document).ready(function(e)
			{
				$("#downloadProgress").css ( "width" , screen.width  );
				$("#downloadProgress").css ( "height" , screen.height - 5 );
				$("#downloadProgress").css ( "background-size" , ( screen.width /  window.devicePixelRatio ) + "px " + ( screen.height  /  window.devicePixelRatio ) - 5  + "px" );
				
			
				// Caricamento XML Dati
				var gXml;
                              
				readXml("./xml/data.xml");
							
				// Caricamento dinamico file JS per jQT
				$.ajax({
					url: "./js/iphone.js",
					dataType: "script",
					async: false,           // <-- this is the key
					success: function () {
					   // Code here
					},
				error: function () {
					throw new Error("Impossibile caricare " + "./js/iphone.js" );
					}
				});
							  
				valorizzaTraduzioni();
				
					  
				$("#txt_proj").html(getPrologoProgetto() + "<br/><br/><br/>");		  
				// sessionStorage.setItem("itemID", itemID );
							  
			}) ;
			
			

			// Preload Items
			/*
			for ( idx = 1 ; idx <= 8 ; idx++)
			{
				$('<img/>')[0].src = "./img/iphone/btn_" + idx + "_bn.png" ;
			}
			$('<img/>')[0].src = "./img/iphone/indietro_bn.png" ; 
			*/
            //app.initialize();
			
			console.log ("index.html::Fine inizializzazione")
			
        



	
		$(document).ready(function() {            
			
			// Risoluzioni:
			// Standard 3.7"- 4.3"  	-> 480*800 
		  	var deviceResolution =  screen.width + "x" + ( screen.height ); 
			var density = window.devicePixelRatio ;
				
			console.log ( "Risoluzione Schermo Device (meno barra di stato): " + deviceResolution + " Densita : " + density ) ;
			
		});	
	
	


	
	// Cambio immagine anteprima video
	$("#iconVideo").css("background-image"," url(./img/iphone/item_videop_"+ itemID.substr(-1)+".png)") ;
 		
	// Carico Prologo  
	var strPrologo = getPrologoTema( itemID  ) ;
	$("#prologotemaText").html ( strPrologo ) ;
    
	// Bind Tap per immagini BN e Preload	   	 
	bindClickableStart ( "_tema" ) ;	
	bindClickableEnd ( "_tema" ) ;	
	preloadClickable ( "_tema" ) ;
	
	$('<img/>')[0].src = "./img/iphone/item_videop_"+ itemID.substr(-1)+".png" ;
	$('<img/>')[0].src = "./img/iphone/item_videop_"+ itemID.substr(-1)+"_bn.png" ;
	     
	   
	$('#iconVideo').bind('touchend' , function(){
		console.log ( 'lancio video: ' + 'go2mkt_video_'+itemID.substr(-1)+'.mp4' ) ; 
		
		playVideo () ;
						 
		return false;
	}) ;
		



	console.log ( "item_testo.html::START " + itemID ) ;
    document.getElementById( "testoTemaImmagine").src = "./img/iphone/btn_"+itemID.substr(-1)+".png" ;
	
	raccontoTemaArray = getRaccontoTema( itemID  ) ;
	
	console.log ( "item_testo.html::Numero Titoli: " + raccontoTemaArray.length ) ;
	
	strTitoliRacconto = "" ;
	for ( idx = 0; idx < raccontoTemaArray.length ; idx++ )
	{
		console.log ( "item_testo.html:: Titolo" + idx + " " + raccontoTemaArray [idx]['titolo'] );
		//strTitoliRacconto += '<a id="titolo_' + idx +'" class="slide selectable" onclick="titoloID = ' + idx + '" href="#panelItemTextDetail" style=" display:block; -webkit-border-radius: 5px;height:20px" >' + raccontoTemaArray [idx]['titolo'] + "</a>" ;
		
		strTitolo = raccontoTemaArray [idx]['titolo'] ; 
		if ( strTitolo.length > 30 ) strTitolo = strTitolo.substr ( 0 , 30 ) + "..." ; 
		
		strTitolo = toTitleCase ( strTitolo ) ;
		
		strTitoliRacconto +='<li id="elementotitolo_' + idx + '" style=" display:block; -webkit-border-radius: 5px;border: 0px solid black;height:22px;" ><a id="titolo_' + idx + '" class="slide selectable fileAudio"  onclick="titoloID = ' + idx + '" href="#panelItemTextDetail" > ' + strTitolo + '</a></li>';          
		
		console.log ( strTitoliRacconto );
	}
	
	//var strRaccontoTesto  = getTestoRacconto(raccontoTemaArray);
				    
	$ ( '#raccontotema').html ( strTitoliRacconto ) ;
	console.log ( "item_testo.html::END " + itemID ) ;
	
	
	
	// Imposta la selezione sull'elemento della lista
    $('.selectable').bind('touchstart',function(){
	 
		console.log ( "touchstart mousedown:: ciclo deselezione INIZIO " + this.id ) ;
        // Toglie la selezione a tutti gli elementi della lista
		for ( idx = 1; idx < raccontoTemaArray.length ; idx++ ) 
	    {       
			$("#elementotitolo_"+idx).css("background-color","transparent");
		}
		console.log ( "touchstart mousedown:: ciclo deselezione FINE" ) ;
						  
		// Seleziona l'elemento cliccato
		console.log ( "touchstart mousedown:: selezione elemento INIZIO: " + this.id + " " + this ) ;
		idA = this.id + "" ; 
		
        $( "#elemento"+ idA ).css("background-color","#B1B2B4");
		
		console.log ( "touchstart mousedown:: selezione elemento FINE: " + this.id  ) ;
		
	})





	setTimeout(function () {
		testoScroll.refresh();
	}, 0);


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


//
//  pixFileDownload.js
//  FileDownLoadApp
//
//  Created by Aaron saunders on 9/8/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

function PixFileDownload() {
}

PixFileDownload.prototype.downloadFile = function(url,destFileName) {
    PhoneGap.exec("PixFileDownload.downloadFile", url,destFileName);
};

PhoneGap.addConstructor(function() {
    window.fileDownloadMgr = new PixFileDownload();
});

function  pixFileDownloadComplete( filePath ) {
    
	alert( "Success \r" + filePath );
    document.location = filePath ;
}

function  pixFileDownloadCompleteWithError( message ) {
    alert( "Error \r" + message );
}


/*
 *  Download del file utilizzando Plugin per PhoneGap
 * 
 */

function onFileSystemSuccess(fileSystem) 
{        
	console.log(fileSystem.name);  	
}   

function onFileSystemNoSuccess(evt) 
{        
	console.log(evt.target.error.code);
	alert ( "Impossibile accedere al FileSystem" ) ;
}


/*
 *  Sposta il video scaricato da TEMP (se finito) e lo visualizza
 * 
 */
function downloadVideo ( url , downLoadPath , videoFileLocale )
{		
	// Collegamento al FileSystem
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemNoSuccess);
	
	// Verifico l'esistenza del File video (onSuccess , onFail )
	window.resolveLocalFileSystemURI( 'file:///' + downLoadPath + videoFileLocale , function() 
	{
		// Se esiste faccio Play del video
		window.plugins.videoPlayer.play('file:///' + downLoadPath + videoFileLocale );	
	
	} , function() 
	{ 
		// Progress Status
		$("#jqt").hide();
				
		$("#downloadProgress").show();
		$("#downloadProgress").html ( "Inizializzazione download file..." ) ;
		
		//return ;
		
		// Altrimenti lo scarico (Download del Video)
		window.plugins.downloader.downloadFile( url , { dirName: downLoadPath + "temp" , overwrite: true}, function(res) 
	    {
	        
			// Patch per bug progresso se va in negativo
			if ( res.progress < 0 ) res.progress = 99 ;
			$("#downloadProgress").html ( "Download file: " + res.progress + "% (" + Math.floor( res.total / 1000000  )  + "Mb) " ) ;
											
			// Download completato
			if ( res.status == 1 )						
			{					
				$("#downloadProgress").html ( "Download Completato" ) ;
								
				// Copia/Spostamento del file e play
				moveVideo ( downLoadPath , videoFileLocale ) ;						
				
				$('#progress').remove();
			}
			
	    }, function(error) 
	    {
	        alert(error);
	    });	
		
	} ); 	
	
}


function moveVideo ( downLoadPath , videoFileLocale )
{
	// Se esiste il temp lo sposto
	window.resolveLocalFileSystemURI( 'file:///' + downLoadPath + "temp/" + videoFileLocale, function(fileEntry) 
	{ 
		
		// Puntatore al file da Copiare fileEntry		
		window.resolveLocalFileSystemURI( 'file:///' + downLoadPath , function(dirEntry) 
		{
			// Puntatore alla Dir in cui Copiare dirEntry
			fileEntry.moveTo ( dirEntry , videoFileLocale,  function() 
			{ 				
				// Ripristino dell'HTML per il video
				//document.getElementById( 'video').innerHTML = '<a class="slide" href="#" onclick=" downloadVideo ( videoServerDir + videoFile [ itemID.substr(-1) - 1 ] , videoLocalDir ) ; return false;" ><img src="./img/androids/video_th.png" style="width:190px; height:136px" /></a>' ;
				
				// Play del video
				window.plugins.videoPlayer.play('file:///' + downLoadPath + videoFileLocale );
							
			} , function() 
			{ 
				alert ( "Errore durante la copia del video dalla cartella temp" ) ; 
			}  ) ;
					
		} , function() 
		{ 
			alert ( "Errore non esiste la cartella temp" ) ; 
		} );
				
	} , function() 
	{ 
		alert ( "Errore non esiste il file nella cartella temp" ) ; 
	} ); 
	
	$("#downloadProgress").hide();
	$("#jqt").show();	

}


// JavaScript Document



function readXml(url)
{
	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		async: false,
		success: function(xml) {
			gXml=xml;
		}
   })
}
function getRootNode(name) {	
	return $(gXml).find(name);
}

function getNode(node,name) {	
	return node.find(name);
}
function getAttr(node,name) {	
	return node.attr(name);
}
function getValue(node) {	
	return node.eq(0).text();
}

function getTitoloProgetto() {
	var ritorno = null;
	var root = getRootNode('progetto');

	titolo = getNode(root,'titolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getPrologoProgetto() {
	var ritorno = null;
	var root = getRootNode('progetto');

	titolo = getNode(root,'prologo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}


function getTema(id) {
	var ritorno = null;
	var root = getRootNode('temi_lista');
	root.each(function(){
		getNode(root,'tema').each(function(){
		   var id_tema = getAttr($(this),"id");
		   if (id_tema==id) {
			   ritorno = $(this);			   
		   }
	   })
	});
	return ritorno;
}
function getNumeroTema(id) {

	tema = getTema(id);

	var ritorno = '';
	titolo = getNode(tema,'numero');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}

function getTitoloTema(id) {

	tema = getTema(id);

	var ritorno = '';
	titolo = getNode(tema,'titolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}

function getSottoTitoloTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'sottotitolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getAbstractTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'abstract');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getPrologoTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'prologo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;

}
function getRacconti() {
	ritorno = new Array();
	lista = getRootNode('temi_lista');	
	tema = getNode(lista,'tema');
	tema.each(function(){
	
		racconti = getNode($(this),'racconto');
		racconti.each(function(){
			getNode(racconti,'oggetto').each(function(){
				var titoloNode = getNode($(this),'titolo');
				var title = getValue(titoloNode);
				var cordinataxNode = getNode($(this),'coord_x');
				var cordinata_x = getValue(cordinataxNode);
				var cordinatayNode = getNode($(this),'coord_y');
				var cordinata_y = getValue(cordinatayNode);
				var testoNode = getNode($(this),'testo');
				var testo_racconto = getValue(testoNode);
				
				ritorno.push({titolo:title,coord_x:cordinata_x,coord_y:cordinata_y,testo:testo_racconto});
				
		   })
		});
	
	
	})

	return ritorno;
}

function getRaccontoTema(id) {
	ritorno = new Array();
	tema = getTema(id);	
	racconto = getNode(tema,'racconto');
	racconto.each(function(){
		getNode(racconto,'oggetto').each(function(){
			var titoloNode = getNode($(this),'titolo');
			var title = getValue(titoloNode);
			var cordinataxNode = getNode($(this),'coord_x');
			var cordinata_x = getValue(cordinataxNode);
			var cordinatayNode = getNode($(this),'coord_y');
			var cordinata_y = getValue(cordinatayNode);
			var testoNode = getNode($(this),'testo');
			var testo_racconto = getValue(testoNode);
			
			ritorno.push({titolo:title,coord_x:cordinata_x,coord_y:cordinata_y,testo:testo_racconto});
			
	   })
	});

	return ritorno;
}
function getTestoRacconto(raccontoArray) {

	//Ritorna tutto il testo del racconto formattato con bold sui titoli
	testoRacconto = ""
	
	for (i=0;i<raccontoArray.length;i++){
		var titolo=raccontoArray[i].titolo;
		testo=raccontoArray[i].testo;
		
		if ( titolo != "" ) 
		{
			testoRacconto +="<b>"+titolo+"</b><br/>"+testo+"<br/><br/>";
		}
		else
		{
			testoRacconto +=testo+"<br/><br/>";
		}
	}
	return testoRacconto;
}
function getTestoTradotto(id) {

	var ritorno = null;
	var root = getRootNode('traduzioni');
	root.each(function(){
		getNode(root,'testo').each(function(){
		   var id_testo = getAttr($(this),"id");
		   if (id_testo==id) {
			   ritorno = getValue($(this));			   
		   }
	   })
	});
	return ritorno;

}
function getNumFoto(id) {

	var ritorno = null;	
	var root = getRootNode('gallery');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'numfoto');
			   var numFoto = getValue(node);
			    if (numFoto!='') {
				   ritorno = numFoto;
			    }							   
		   }
	   })
	});
	return ritorno;

}
function getLabelFoto(id) {

	var ritorno = null;	
	var root = getRootNode('gallery');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'label');
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}
function getNumAudio(id) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'numaudio');
			   var numAudio = getValue(node);
			    if (numAudio!='') {
				   ritorno = numAudio;
			    }							   
		   }
	   })
	});
	return ritorno;

}

function getLabelAudio(id , idFile ) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'label'+idFile);
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}

function getFileAudio(id , idFile ) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'file'+idFile);
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}





function VideoPlayer() {
}
;

VideoPlayer.prototype.show = function(message,mode) {
    PhoneGap.exec('VideoPlayerCommand.show', message,mode);
};

PhoneGap.addConstructor(function() {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.videoPlayer = new VideoPlayer();
    return window.plugins.videoPlayer;
});




/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


// Pannelli jQT
// Caricamento Dettaglio Tema (Item) 
$('#panelItemDetail').bind('pageAnimationStart',function(event, info)
{
    if (info.direction == 'in' )
    {	
		//$('#itemDetailContent').html( "" ) ;
        itemID = $(this).data('referrer').attr('id') ;                            
        
		// Cambio immmagine top 
		document.getElementById( "titoloTemaImmagine").src = "./img/iphone/btn_" + itemID.substr(-1) + "t.png" ;
						
		// Preload img pannello
		$('<img/>')[0].src = "./img/item_videop_" + itemID.substr(-1) + ".png" ;
		$('<img/>')[0].src = "./img/testo.png" ;
		$('<img/>')[0].src = "./img/iphone/indietro_bn.png" ; 
		
		//document.getElementById ( 'titoloPanelItemDetail' ).innerHTML = itemID ;                       
        $('#itemDetailContent').load('./inc/iphone/item.html' );                                      
    }
                           
    if (info.direction == 'out' )
    {
		// Ricarica in preLoad gli item
        preloadClickable ( "" ) ;
    }
                
})

// Pannello Indice Video
$('#panelTabbar1').bind('pageAnimationStart',function(event, info)
{                        
    if (info.direction == 'in' )
    {
		preloadClickable ( "" ) ;
 	}
                        
    if (info.direction == 'out' )
    {
		preloadClickable ( "" ) ;
    }
})


// Pannello Indice Testi 
$('#panelTabbar3').bind('pageAnimationStart',function(event, info)
{
    if (info.direction == 'in' )
    {
		preloadClickable ( "" ) ;
    }
                        
    if (info.direction == 'out' )
    {
        preloadClickable ( "" ) ;
    }
                        
})


// Pannello Testi (Indice Progetto)              
$('#panelTabbar5').bind('pageAnimationStart',function(event, info)
{
    if (info.direction == 'in' )
    {		                
		
		
		progettoScroll = new iScroll('scrollPanelTabbar5', {
			snap: false,
			momentum: true,
			hScrollbar: false,
			vScrollbar:false,
			bounce:true,
			lockDirection:true
		});
	}
                        
    if (info.direction == 'out' )
    {
        preloadClickable ( "" ) ;
    }
                        
})

// Pannello lettura Testo (Dettaglio)
$('#panelItemTextDetail').bind('pageAnimationStart',function(event, info)
{                        
    if (info.direction == 'in' )
    {	
		idxID = $(this).data('referrer').attr('id') ;
							 
		// Se proviene da indice Testi l'ID non ce l'ha impostato
		if ( idxID.substr(0,5) == "testi" ) itemID = "item" + idxID.substr(-2) ;
							   
		// Cambio immmagine top
		document.getElementById( "testoDetailTemaImmagine").src = "./img/iphone/btn_"+itemID.substr(-1)+"t.png" ;
							   
        $('#panelItemTextDetailContent').load('./inc/iphone/item_testo_dettaglio.html' , function() 
        {
			
			raccontoTemaArray = getRaccontoTema( itemID  ) ;
											
			titoloID = 0;
			console.log ( "item_testo_dettaglio.html::START " + itemID + ":" + titoloID ) ;
											  
			console.log ( "item_testo_dettaglio.html::" + raccontoTemaArray [titoloID]['titolo'] +  " - " + raccontoTemaArray [titoloID]['testo']) ;
											  
			$ ( '#raccontotemaDettaglio').html ( raccontoTemaArray [titoloID]['testo'] + "<br/><br/><br/>") ;
			console.log ( "item_testo_dettaglio.html::END " + itemID + ":" + titoloID ) ;
											  
			// Creazione iScroll
			testoScroll = new iScroll('panelItemTextDetailScroll', {
				snap: false,
				momentum: true,
				hScrollbar: false,
				vScrollbar:false,
				bounce:true,
				lockDirection:true
			});
											  
			console.log ( "item_testo_dettaglio.html:: iScroll END" ) ;

        });
                         
    }
                         
    if (info.direction == 'out' )
    {
		testoScroll.destroy();
		testoScroll = null ;
		$('#panelItemTextDetailContent').html ( "" ) ;
		
    }
})

function playVideo ()
{
	console.log ( 'playvideo::file:///android_asset/www/video/iphone/go2mkt_video_'+itemID.substr(-1)+'.mp4' ) ; 
	
	if ( itemID == "item01" ) 
	{
		window.plugins.videoPlayer.play('file:///android_asset/www/video/iphone/go2mkt_video_1.mp4');
	}
	else
	{
		downloadVideo ( videoServerDir + videoFile [ itemID.substr(-1) - 1 ] , videoLocalDir , videoFile [ itemID.substr(-1) - 1 ] ) ;
	}	 
	
}

function valorizzaTraduzioni(){
    
	$(".translateable").each(function(){
        $(this).html(getTestoTradotto($(this).attr('id')))
    });

}





/************************************************

    Funzioni Comuni di pubblica utilit�
	
************************************************/

var r = Math.floor((Math.random()*10000)+1);

/*

	Collega tutte le immagini clickable alla gestione B/N sul touchstart

*/
function bindClickableStart ( astr_option )
{
	$('.clickable' + astr_option ).bind('touchstart mousedown',function(){
		imgOld= $(this).css("background-image");
		imgBN = imgOld.substr(4,imgOld.length-9)+"_bn.png" ;
		console.log ( "common.js::touchstart mousedown " + imgBN ) ;               
		$(this).css("background-image","url("+ imgBN +")");
		
		// MultiTouch	
		divArray.push(this); 
		imgArray.push(imgOld); 
		   
   	})
} 

/*

	Collega tutte le immagini clickable alla gestione B/N sul touchend

*/
function bindClickableEnd ( astr_option )
{								
	// Ripristina l'immagine originale quando finisce il tap
	$('.clickable' +astr_option ).bind('touchend mouseup',function(){			
		
		for (i=0;i<divArray.length;i++) {
			        
			elem_img=imgArray.pop();                 
			elem_div =divArray.pop();  
			                
			console.log( "common.js::touchend mouseup " + $(elem_div).className);
			
			$(elem_div).css("background-image",elem_img);
					
			// Per le icone della Tabbar tolgo la selezione
			if ( $(elem_div).attr('id').indexOf("tabbarIcon") >= 0 )  
			{
				$(elem_div).css("background-color","");     
			}		
				   
		}
		
		
	})		

}

// PreLoad 
function preloadClickable ( astr_option )
{
	//preload delle immagini clickable BN        
	$('.clickable' + astr_option ).each(function(){
		strImg= $(this).css("background-image");
		imgBN = strImg.substr(4,strImg.length-9)+"_bn.png" ;
		console.log ( "common.js::preloadClickable" + imgBN ) ; 
		
		$('<img/>')[0].src = imgBN ;                       				
	});
	
	if ( astr_option == "" )
	{
		for ( idx = 1 ; idx <= 8 ; idx++)
		{
			$('<img/>')[0].src = "./img/iphone/btn_" + idx + "_bn.png" ;
		}
		$('<img/>')[0].src = "./img/iphone/indietro_bn.png" ; 
	}
}
    

/*

	Crea la versione bianco/nero di una immagine

*/
// Grayscale w canvas method
function grayscale(src)
{
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height; 
	ctx.drawImage(imgObj, 0, 0); 
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
}



/*
    Recupera eventuali parametri passati ad una pagina (come REQUEST/GET in PHP)
*/
function getURLParam(strParamName)
{
    var strReturn = "";
    var strHref = window.location.href;
    
    if ( strHref.indexOf("?") > -1 ){
        var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
        var aQueryString = strQueryString.split("&");
        
        for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
            if ( aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
                var aParam = aQueryString[iParam].split("=");               
                strReturn = aParam[1];                
                break;
            }
        }
    }
    return unescape(strReturn);
}    

/*
    Converte caratteri se funzionasse)
*/
function escapeHTMLEncode(str) { 
  var div = document.createElement('div'); 
  var text = document.createTextNode(str); 
  div.appendChild(text); 
  return div.innerHTML; 
 } 

/*
   Esegue un suono in base all'ID dell'elemento
*/
function playSound ( audioElement )
{
	document.getElementById ( audioElement ).play() ;
}

/*
	PhoneGap START	
*/
function checkConnection ()
{
    var networkState = navigator.network.connection.type ;
    
    if ( networkState == Connection.UNKNOWN || networkState == Connection.NONE ) 
    {
        messaggio = "Nessuna connessione disponibile, impossibile visualizzare i dati" ;
        navigator.notification.alert(messaggio, msgNone ,"Attenzione","OK");
        return "" ;
    }    
    else
    {
        var states = {} ;
        
        states[Connection.UNKNOWN]  = 'Connessione Sconosciuta' ;
        states[Connection.ETHERNET] = 'Rete Ethernet' ;
        states[Connection.WIFI]     = 'Rete WiFi' ;
        states[Connection.CELL_2G]  = 'Cellulare 2G' ;
        states[Connection.CELL_3G]  = 'Cellulare 3G' ;
        states[Connection.CELL_4G]  = 'Cellulare 4G' ;
        states[Connection.NONE]     = 'Nessuna connessione' ;
        
        //alert ( states[networkState] ) ; 
        
        return states[networkState] ;
    }    
                     
}

/*             
	Permette di bloccare (o meno) una rotazione del dispositivo (in questo caso Landscape)
*/
function shouldRotateToOrientation ( rotation )
{
	switch  (rotation)
	{   // Portrait
		case 0:
		case 180:
			return true;
		// Landscape
		case 90:
		case -90:                    
			if ( !bVideo ) return false;
	}    
}

function msgNone() {
                
}
 

/*
	PhoneGap END	
*/
            

function loadLanguage(){
    return "it";
    //return "";
}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


function Downloader() {}

Downloader.prototype.downloadFile = function(fileUrl, params, win, fail) {
	
	//Make params hash optional.
	if (!fail) win = params;
	PhoneGap.exec(win, fail, "Downloader", "downloadFile", [fileUrl, params]);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin("downloader", new Downloader());
	PluginManager.addService("Downloader", "com.phonegap.plugins.downloader.Downloader");
});


// JavaScript Document



function readXml(url)
{
	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		async: false,
		success: function(xml) {
			gXml=xml;
		}
   })
}
function getRootNode(name) {	
	return $(gXml).find(name);
}

function getNode(node,name) {	
	return node.find(name);
}
function getAttr(node,name) {	
	return node.attr(name);
}
function getValue(node) {	
	return node.eq(0).text();
}

function getTitoloProgetto() {
	var ritorno = null;
	var root = getRootNode('progetto');

	titolo = getNode(root,'titolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getPrologoProgetto() {
	var ritorno = null;
	var root = getRootNode('progetto');

	titolo = getNode(root,'prologo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}

function getTema(id) {
	var ritorno = null;
	var root = getRootNode('temi_lista');
	root.each(function(){
		getNode(root,'tema').each(function(){
		   var id_tema = getAttr($(this),"id");
		   if (id_tema==id) {
			   ritorno = $(this);			   
		   }
	   })
	});
	return ritorno;
}
function getNumeroTema(id) {

	tema = getTema(id);

	var ritorno = '';
	titolo = getNode(tema,'numero');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}

function getTitoloTema(id) {

	tema = getTema(id);

	var ritorno = '';
	titolo = getNode(tema,'titolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}

function getSottoTitoloTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'sottotitolo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getAbstractTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'abstract');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getPrologoTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'prologo');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;

}
function getRaccontoTema(id) {
	tema = getTema(id);
	var ritorno = '';
	titolo = getNode(tema,'racconto');
    var title = getValue(titolo);
    if (title!='') {
	   ritorno = title;
    }
	return ritorno;
}
function getTestoTradotto(id) {
    
	var ritorno = null;
	var root = getRootNode('traduzioni');
	root.each(function(){
              getNode(root,'testo').each(function(){
                                         var id_testo = getAttr($(this),"id");
                                         if (id_testo==id) {
                                         ritorno = getValue($(this));			   
                                         }
                                         })
              });
	return ritorno;
    
}
function getNumFoto(id) {

	var ritorno = null;	
	var root = getRootNode('gallery');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'numfoto');
			   var numFoto = getValue(node);
			    if (numFoto!='') {
				   ritorno = numFoto;
			    }							   
		   }
	   })
	});
	return ritorno;

}
function getLabelFoto(id) {

	var ritorno = null;	
	var root = getRootNode('gallery');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'label');
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}

function getNumAudio(id) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'numaudio');
			   var numAudio = getValue(node);
			    if (numAudio!='') {
				   ritorno = numAudio;
			    }							   
		   }
	   })
	});
	return ritorno;

}

function getLabelAudio(id , idFile ) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'label'+idFile);
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}

function getFileAudio(id , idFile ) {

	var ritorno = null;	
	var root = getRootNode('audio');
	root.each(function(){	
		getNode(root,'item').each(function(){
		   var id_item = getAttr($(this),"id");		   
		   if (id_item==id) {
			   node = getNode($(this),'file'+idFile);
			   var label = getValue(node);
			    if (label!='') {
				   ritorno = label;
				   				  
			    }							   
		   }
	   })
	});
	return ritorno;

}






!function ($, iScroll) {
  $.ender({
    iScroll: function (options) {
      return new iScroll(this[0], options)
    }
  }, true)
}(ender, require('iscroll').iScroll)
