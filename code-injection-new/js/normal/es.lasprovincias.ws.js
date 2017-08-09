
document
		.addEventListener(
				'deviceready',
				function() {

					window.XtifySDK
							.start(
									notificationCallBack,
									function(error) {
										document.body.innerHTML += '<h2> Error occurred while starting Xtify SDK. </h2><br />';
									});
					window.XtifySDK.setNotifIcon("ic_launcher", function(error) {
						console.log("Error: " + error);

					});
				}, false);

function notificationCallBack(data) {
//	document.body.innerHTML += '<h2> Notification Received. Title: '
//			+ data["com.xtify.sdk.NOTIFICATION_TITLE"] + ' <br /> '
//			+ ' Content: ' + data["com.xtify.sdk.NOTIFICATION_CONTENT"];
	//alert( data["com.xtify.sdk.NOTIFICATION_TITLE"] + '\n' +
	//	   data["com.xtify.sdk.NOTIFICATION_CONTENT"]);	
	console.log(data);
	video.viewMessage( data["com.xtify.sdk.NOTIFICATION_TITLE"] , data["com.xtify.sdk.NOTIFICATION_CONTENT"] );
}

function getXid() {
	window.XtifySDK.getXid(function(xid) {
		document.body.innerHTML += '<h2> XID is: ' + xid + ' </h2><br />';
	}, function(error) {
		document.body.innerHTML += "<h2> Error: " + error + ' </h2><br />';
	});
}

//function setNotifIcon() {
//	window.XtifySDK.setNotifIcon("ic_notif_xtify", function(error) {
//		console.log("Error: " + error);
//	});
//}

function isRegistered() {
	window.XtifySDK
			.isRegistered(
					function() {
						document.body.innerHTML += '<h2> Device is registered </h2><br />';
					},
					function(errorId) {
						if (errorId == "inProgress") {
							document.body.innerHTML += "<h2> Registration in progress. </h2><br />";
						} else {
							document.body.innerHTML += "<h2> Error: " + errorId
									+ ' </h2><br />';
						}
					});
}



		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
		if(isAndroid) {
		    src="./cordova-2.1.0.js";
		}
		else {
		    src="./cordova.ios.js";
		}
		
		var jscordova;
		jscordova = document.createElement( "script" );
		jscordova.type = "text/javascript";
		jscordova.src = src;
		document.getElementsByTagName("head")[0].appendChild( jscordova );
		
	





      var video = new videosView({"id":1});
    


		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
		if(isAndroid) {
		    src="./cordova-2.1.0.js";
		}
		else {
		    src="./cordova.ios.js";
		}
		
		var jscordova;
		jscordova = document.createElement( "script" );
		jscordova.type = "text/javascript";
		jscordova.src = src;
		document.getElementsByTagName("head")[0].appendChild( jscordova );
	






      var video = new videosView({"id":0});
    


var videosView = ( function( $, undefined) {
  var 
      _token='sxLPlh-Y2ehHwQvaUMX6GDBycVPElvpBg-LbW-z-VlsFnu4dOYWDGg..',
      _settings,
      _defaults = { "element": "body" },
      data={},
//      _brightcovePlayerCompatible,      
      navigationBar,
      _embedCode,
      DEFAULT_PLAYER_URL = ( "%PLAYER_URL%".indexOf( "%" ) > -1 ) ? "http://link.brightcove.com/services/player/bcpid308992236001?bckey=AQ~~,AAAAFDJ-UQk~,KupD199djw-xYR35536jwpBkXnPJoc_9" : "%PLAYER_URL%",
      MESSAGE_TO_SHOW_USER_FOR_PLAYER_INPUT_FIELD = ( "%PLAYER_URL_SETTING_MESSAGE%".indexOf( "%" ) > -1 ) ? "Paste your Brightcove player URL here." : "%PLAYER_URL_SETTING_MESSAGE%",
      BRIGHTCOVE_EXPERIENCE_URL = ( "%BRIGHTCOVE_EXPERIENCE_URL%".indexOf( "%" ) > -1 ) ? "http://admin.brightcove.com/js/BrightcoveExperiences.js": "%BRIGHTCOVE_EXPERIENCE_URL%";
      
  /**
   * @private
   */
  function videosView( options ) { 

    _settings = $.extend( {}, _defaults, options );

    this.element = $( _settings.element );
    
    this.viewID=options.id;
    lp.viewID=this.viewID;
    
    var router=new $.mobile.Router([                                    
                                    { "#video_detalle[?]idplaylist=(.*)&idvideo=(.*)": { handler: this.buildVideoDetail , events: "bs" }  },  
                                    { "#videos[?]idplaylist=(.*)?": { handler: this.buildListOfVideos , events: "bs" }  },
                                    ],this, { ajaxApp: true});

    // Descomentar para pruebas en web 
    lp.core.iniciar();
    
	$( lp ).bind( "init", $.proxy( function( e, data ) {  
		//Una vez cargado el manifiesto, iniciamos la aplicacion
		this.initialize();
		 
	}, this) ); 
	
	$( lp ).bind( "Error", $.proxy( function( e, data ) {  
		//Error: mostramos error
		this.renderErrorMessage("Sin conexion al servidor. Prueba en unos momentos. Gracias");		 
	}, this) ); 	
	
	$( lp ).bind( "Carga", $.proxy( function( e, data ) {  
        //cargamos manifiesto
		lp.core.iniciar();
	}, this) ); 	
	
  }


  /**
   * The <code>initialize</code> function is called if the <code>lp.core</code> has already been initialized or after the <code>init</code> function fires.
   */
  videosView.prototype.initialize = function() {
	  if (lp.context.initialized) {
                  
		//Builds the page as soon as this view is instantiated.
		this.render( lp.core.cache( lp.viewID + "_videos_data" ) );
		
		//Retrieve the data from the server.
		lp.core.getData( "playlists", $.proxy( function( data ) {
		    this.render( data.items );
		   
		      }, this )
		  , $.proxy( function( data ) {
		    this.handleNoData( data );
		  }, this ) 
		);    
	  }
	  else{
		  console.log("else",lp.currentGlobalConfigs);
		  //lp.core.iniciar();
	      setTimeout( function() {
	    	  this.initialize();
	        }, 500 );
		  
	  }
	  this.loadNavBar();
	  this.buildListOfPlaylists();
	
  };
  
  videosView.prototype.loadNavBar = function() {
	  this.navigationBar=Mark.up( lp.templates["navigationBar"],lp.currentGlobalConfigs);
  }
  
  /**
   * Responsible for building out the HTML for the first page the user is shown. If there is only one playlist assigned to this
   * view, then the view will not build the playlist view but rather go directly to the list of videos. 
   */
  videosView.prototype.render = function( data ) {
    //If the data is not new we should just return
    if( data !== undefined && lp.utils.isEqual( data, this.data ) ) {
      //No need to the draw the UI if we have no new data.
      return;
    }    
    if( !data ) {
     return;
    }

    lp.core.cache( lp.viewID + "_videos_data", data );
    this.data = data;	    
  };
  
  
  /**
   * Called if there is an error getting data. If we are in the Studio then we show the spinner.
   */
  videosView.prototype.handleNoData = function( error ) {
    this.renderErrorMessage( error.error );
  };
  
  /**
   * Called if there is no playlists or videos are returned from the databinding.
   */
  videosView.prototype.handleNoVideos = function( error ) {
    this.renderErrorMessage( "No videos are currently available, add some playlists." );
  };

  /**
   * Render out a specific error message to the user.  For now, this is meant for informational
   * purposes in the Studio and not in a running app.  This is a useful place to add additional
   * logic/feedback to a user of the app if content is not available.
   */
  videosView.prototype.renderErrorMessage = function( errorMsg ) {
	  console.log("renderError",errorMsg);
	  $page=$($('body').children( ":jqmData(role=page)" )[3]);
	  $header = $page.children( ":jqmData(role=header)" );
	  $header.find("h1").html("Ooopsss!");
	  $content = $page.children( ":jqmData(role=content)" );
	  $content.html(errorMsg);
	  $footer = $page.children( ":jqmData(role=footer)" );
	  $footer.find(':jqmData(role=navbar)').html(this.navigationBar);
	  $page.page();
	  $.mobile.changePage($page);
  };

  videosView.prototype.viewMessage = function( Tlt,Msg ) {
	  console.log("viewMessage",Msg);
	  $page=$($('body').children( ":jqmData(role=page)" )[3]);
	  $header = $page.children( ":jqmData(role=header)" );
	  $header.find("h1").html(Tlt);
	  $content = $page.children( ":jqmData(role=content)" );
	  $content.html(Msg);
	  $footer = $page.children( ":jqmData(role=footer)" );
	  $footer.find(':jqmData(role=navbar)').html(this.navigationBar);
	  $page.page();
	  $.mobile.changePage($page);
  };  

  /**
   * Builds the HTML for the list of Playlists page and injects it into the DOM.  See <code>listOfPlaylistHTML</code> for the
   * actual HTML snippet that gets created.
   */
  videosView.prototype.buildListOfPlaylists = function() {
	if (this.data == undefined) {
	      setTimeout( function() {
	    	  video.buildListOfPlaylists();
	        }, 500 );
	      return;
	} 

	
	$page=$($('body').children( ":jqmData(role=page)" )[0]);
	
	$header = $page.children( ":jqmData(role=header)" );
	$header.find('h1').html("Wines & Spirits");
	
	$content = $page.children( ":jqmData(role=content)" );

	var mydata=this.data[0].videos[0];
	mydata.idplaylist=0;	
	
	//mydata.FLVURL=$.trim(mydata.FLVURL.replace(/^.*videos/,"http://comeresa.brightcove.com.edgesuite.net/rtmp_uds/"));
	mydata.ancho=Math.round($page.width()-20);

    if (isAndroid){
        this.loadPluginVideoAndroid();
        var videoPortada=Mark.up( lp.templates["video-portada-tmpl_android"],  mydata );		    
    }
    else {                  
        var videoPortada=Mark.up( lp.templates["video-portada-tmpl_ios"],  mydata );		
    }	
		              
	var playlists=Mark.up( lp.templates["playlists-tmpl"],{items:this.data} );
	$content.html(videoPortada + playlists);
	
	$footer = $page.children( ":jqmData(role=footer)" );
	$footer.find(':jqmData(role=navbar)').html(this.navigationBar);
	
	$page.page();
	// Enhance the listview we just injected.
	$content.find( ":jqmData(role=listview)" ).listview();
	
  };

  /**
   * Builds, injects, and transitions to the list of videos page.  Depending on whether or not this is the first page of this view, it will either add a new
   * header and transition to the new page once it has been added to the view, or simply build the HTML and inject into the element.
   * @param playlist The data for the playlist that is to be rendered on this page.
   * @param firstPage A boolean indicating if this is the first page in the view.  True if there is only playlist data bound to this view.
   */
  videosView.prototype.buildListOfVideos = function(tipo, match,ui,pa,e) {
	    idplaylist=match[1];
		if ( this.data == undefined || this.data.length === 0 ) {
		  this.handleNoVideos();
		  return;
		}	    
		$page=$($('body').children( ":jqmData(role=page)" )[1]);
			  
		$header = $page.children( ":jqmData(role=header)" );
		$header.find("h1").html(this.data[idplaylist].name);
		
		$content = $page.children( ":jqmData(role=content)" );
		var mydata=this.data[idplaylist];
		mydata.idplaylist=idplaylist;		
		var texto=Mark.up( lp.templates["list-of-videos-tmpl"],  mydata );
		$content.html(texto);
		
		//$footer = $page.children( ":jqmData(role=footer)" );
		//$footer.find(':jqmData(role=navbar)').html(this.navigationBar);	
		$page.page();
		// Enhance the listview we just injected.
		$content.find( ":jqmData(role=listview)" ).listview();		
		$.mobile.fixedToolbars.show();
  };
  
  /**
   * Builds the video detail page and transitions to it.
   * @param video The video object used to build the HTML for the detail page.  This object expects the following values:
   <pre>
   { 
    "id": "unique_id",
    "FLVURL": "url to the video file.  (can be a m3u8 index file)",
    "name": "The name of the video",
    "thumbnailURL": "The url to the thumbnail",
    "shortDescription": "The short description",
    "videoStillURL": "The url to the video still"
   }
   </pre>

 
   */

  videosView.prototype.buildVideoDetail = function( tipo, match,ui,pa,e ) {

	idplaylist=match[1];
	idvideo=match[2];
	
	var mydata=this.data[idplaylist].videos[idvideo];
	mydata.idplaylist=idplaylist;
	
    $page=$($('body').children( ":jqmData(role=page)" )[2]);
	
    $header = $page.children( ":jqmData(role=header)" );
	$header.find("h1").html(this.data[idplaylist].name);
	
	$content = $page.children( ":jqmData(role=content)" );

	//mydata.FLVURL=$.trim(mydata.FLVURL.replace(/^.*videos/,"http://comeresa.brightcove.com.edgesuite.net/rtmp_uds/"));
	var ancho=$page.width();
	var alto=Math.round(ancho*9/16);
	mydata.ancho=ancho-20;
	mydata.alto=alto;
	
    if (isAndroid){
        this.loadPluginVideoAndroid();
        var texto=Mark.up( lp.templates["video-details-tmpl_android"],  mydata );		    
    }
    else {                  
        var texto=Mark.up( lp.templates["video-details-tmpl_ios"],  mydata );		
    }   


	$content.html(texto);
	$.mobile.fixedToolbars.show();	
	//$footer = $page.children( ":jqmData(role=footer)" );
	//$footer.find(':jqmData(role=navbar)').html(this.navigationBar);		
	
  };
  
                  
    videosView.prototype.loadPluginVideoAndroid = function() {
        var jsvideo;
        if( $( "[src='./js/video.js']" ).length === 0 ) {
            jsvideo = document.createElement( "script" );
            jsvideo.type = "text/javascript";
            jsvideo.src = "./js/video.js";
            document.getElementsByTagName("head")[0].appendChild( jsvideo );
        }
    };

    
return videosView;
  
})( lp.lib.jQuery );

/** Inicio html **/



function onload(){	
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
    $.mobile.touchOverflowEnabled = true;
}

function onOnline(){
	
//    window.plugins.XtifySDK.start(
//    	       notificationCallBack, function (error) {
//    	           //document.body.innerHTML += '<h2> Error occurred while starting Xtify SDK. </h2><br />';
//    	           alert('<h2> Error occurred while starting Xtify SDK. </h2><br />');
//    	       });	
//    window.XtifySDK.setNotifIcon("ic_launcher", function(error) {
//		console.log("Error: " + error);
//	});
	$( lp ).trigger( "Carga" );
}

//function notificationCallBack(data) {
//    document.body.innerHTML += '<h2> Notification Received. Title: ' + data["com.xtify.sdk.NOTIFICATION_TITLE"] + ' <br /> ' + ' Content: ' + data["com.xtify.sdk.NOTIFICATION_CONTENT"];
//	alert('<h2> Notification Received. Title: ' + data["com.xtify.sdk.NOTIFICATION_TITLE"] + ' <br /> ' + ' Content: ' + data["com.xtify.sdk.NOTIFICATION_CONTENT"]);
//	navigator.notification.alert("Notification Received. Title: " + data["com.xtify.sdk.NOTIFICATION_TITLE"]  + " Content: " + data["com.xtify.sdk.NOTIFICATION_CONTENT"]) ;  
//}
//
//function setNotifIcon() {
//	window.XtifySDK.setNotifIcon("ic_notif_xtify", function(error) {
//		console.log("Error: " + error);
//
//	});
//}
function onOffline(){	
	alert("Failed Connection");
	$( lp ).trigger( "Error" );
}



document
		.addEventListener(
				'deviceready',
				function() {

					window.XtifySDK
							.start(
									notificationCallBack,
									function(error) {
										document.body.innerHTML += '<h2> Error occurred while starting Xtify SDK. </h2><br />';
									});
				}, false);

function notificationCallBack(data) {
	document.body.innerHTML += '<h2> Notification Received. Title: '
			+ data["com.xtify.sdk.NOTIFICATION_TITLE"] + ' <br /> '
			+ ' Content: ' + data["com.xtify.sdk.NOTIFICATION_CONTENT"];
}

function getXid() {
	window.XtifySDK.getXid(function(xid) {
		document.body.innerHTML += '<h2> XID is: ' + xid + ' </h2><br />';
	}, function(error) {
		document.body.innerHTML += "<h2> Error: " + error + ' </h2><br />';
	});
}

function setNotifIcon() {
	window.XtifySDK.setNotifIcon("ic_notif_xtify", function(error) {
		console.log("Error: " + error);

	});
}

function isRegistered() {
	window.XtifySDK
			.isRegistered(
					function() {
						document.body.innerHTML += '<h2> Device is registered </h2><br />';
					},
					function(errorId) {
						if (errorId == "inProgress") {
							document.body.innerHTML += "<h2> Registration in progress. </h2><br />";
						} else {
							document.body.innerHTML += "<h2> Error: " + errorId
									+ ' </h2><br />';
						}
					});
}





