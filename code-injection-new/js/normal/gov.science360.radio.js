






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
        





  $( document ).on( "mobileinit", function() {
    $.mobile.hoverDelay = 0;
  });



  function onLoad(){
    console.log('onLoad');
    document.addEventListener("deviceready", onDeviceReady, false);

    $(".copy-from div[data-role='header']" ).clone().prependTo(".copy-to");

    //testFeaturedResults();
  }

  function onDeviceReady(){
    console.log( 'onDeviceReady' );

    var $container = $( ":mobile-pagecontainer" );
    $container.on( "pagecontainershow", onPageChange );
    radioMain();
    adjustBanner();
  }


  var reachableReload = 5000;
  var reachableHost = "science360.gov";   // Host used for reachability tests
  var streamInfoUrl="http://science360.gov/feeds/radio/streaminfo.xml";

  var playingNowReload=20000;
  var playingNowUrl="http://science360.gov/feeds/radio/playingnow.xml";
  var playingNowTimer;

  var featuredUrl = "http://science360.org/radio/api/featured";
  //var featuredUrl = "http://test.science360.org/radio/api/featured";

  var searchUrl = "http://science360.org/radio/api/search";
  //var searchUrl = "http://test.science360.org/radio/api/search";

  var networkType;
  var networkTypeStr;
  var audioUrl;
  var playingUrl;  // The URL of a file to play, or undefined if the stream
  var playingContainer;  // The DOM container where we triggered playing
  var myaudio;

  // Populated in radioMain()
  var networkTypeStrMap = {};

  var audioUrlDefault = {
    "cell":            'http://radiostream.science360.org:4200/live',
    "WiFi connection": 'http://radiostream.science360.org:4200/live'
    //cell: 'http://science360.gov:8000/radio32',
    //wifi: 'http://science360.gov:8000/radio'
  };
  console.log( 'audioUrlDefault='+audioUrlDefault );
  
  var isRadioReady   = false;
  var isNetworkReady = false;
  var isAudioCreated = false;
  var isAudioReady   = false;

  var linkToAudio = false;  // Set to true if the play button should link to the url
  var useMedia    = false;
  var useAudio    = false;
  var isPlaying = false;
  var isPlayingShow = false; // Is this playing a show (as opposed to the Radio Stream)
  
  var positionTimer;
  var positionInterval = 1000;
  var positionMaxNoUpdate = 3000;
  var positionLastUpdate;
  var positionLast;

  var linkS2N = 'http://s2nmedia.com/science360-radio-iphone-app/';
  
  function radioMain(){
    console.log( "onDeviceReady" );
    isRadioReady = true;

    // The Connection object should be ready to use now
    networkTypeStrMap[Connection.UNKNOWN]  = 'Unknown connection';
    networkTypeStrMap[Connection.ETHERNET] = 'Ethernet connection';
    networkTypeStrMap[Connection.WIFI]     = 'WiFi connection';
    networkTypeStrMap[Connection.CELL_2G]  = 'Cell 2G connection';
    networkTypeStrMap[Connection.CELL_3G]  = 'Cell 3G connection';
    networkTypeStrMap[Connection.CELL_4G]  = 'Cell 4G connection';
    networkTypeStrMap[Connection.NONE]     = 'No network connection';

    console.log( 'device.platform='+device.platform+' device.version='+device.version );
    if( device.platform == 'iPhone' && device.version <= '3.2' ){
      // Older iPhone platforms do not support the Audio object, 
      // nor appear to support reachability monitoring.
      console.log( 'old iPhone support' );
      linkToAudio = true;
      reachableFunction = loadReachableFake;
      // Don't get the network info yet - wait till we get "Now playing" info

    } else if( device.platform === 'iPhone' || device.platform === 'iOS' ){
      // Try using media on newer iPhone devices
      //useMedia = true;

      // Media still fails when accessing a stream
      useAudio = true;

      $('body').addClass('pad-top');

    } else if( device.platform == 'Android'){
      useMedia = true;

      // Setup the menu key and menu
      $(document).bind( 'menuKeyDown', function(){$('#menu').toggle();} );
      $('#menu-quit').click( function(){device.exitApp();} );

      linkS2N = 'http://s2nmedia.com/science360-radio-android-app/';
      
    } else {
      // Everyone else needs real reachability monitoring
      console.log( 'modern support' );
      useAudio = true;
    }

    $( '#s2nlink' ).on( 'touchstart', function(){
      loadExternalUrl(linkS2N);
    });
    $('#s360link').on( 'touchstart', function(){
      loadExternalUrl("http://science360.gov/radio/");
    });

    if( useMedia || useAudio ){
      reachableFunction = loadReachable;
      reachableFunction();
      
      // And real controls
      $( '#audioPlay' ).on( 'touchend', function() {
        console.log( "audioPlay touched" );
        playingUrl = undefined;
        playingContainer = $('#radio');
        restartAudio(playingUrl);
        preventDoubleTap( 'lastControlTouch', playStream );
      } );
      $( '#audioPause' ).on( 'touchend', function() {
        console.log( "audioPause touched" );
        playingContainer = $('#radio');
        preventDoubleTap( 'lastControlTouch', pauseStream );
      } );
    }
    
    // Set up all the control button actions and transitions.
    /* // obsolete?
    $( '#audioPlay' ).on( 'touchstart', function() {
      setButtonDown( '#audioPlay', true );
    } );
    $( '#audioPause' ).on( 'touchstart', function() {
      setButtonDown( '#audioPause', true );
    } );
    $( '#audioPlay' ).on( 'touchend', function() {
      setButtonDown( '#audioPlay', false );
    } );
    $( '#audioPause' ).on( 'touchend', function() {
      setButtonDown( '#audioPause', false );
    } );
    $( '#audioState' ).on( 'touchstart', function() {
      setButtonDown( '#audioState', true );
    } );
    $( '#audioState' ).on( 'touchend', function() {
      setButtonDown( '#audioState', false );
      preventDoubleTap( 'lastInfoTouch', function(){$( ":mobile-pagecontainer" ).pagecontainer( "change", '#info', {transition:'flip'} )} );
    } );
    $( '#infoBack' ).on( 'touchstart', function() {
      setButtonDown( '#infoBack', true );
    } );
    $( '#infoBack' ).on( 'touchend', function() {
      setButtonDown( '#infoBack', false );
      preventDoubleTap( 'lastInfoBackTouch', function(){$( ":mobile-pagecontainer" ).pagecontainer( "change", '#radio', {transition:'flip'} )} );
    } );
    */

    //setInterval( reachableFunction, reachableReload );  // Do not recheck to avoid stuttering

    // Everyone gets playingNow information
    console.log( 'schedule playingNow' );
    loadPlayingNow();
    playingNowTimer = setInterval(loadPlayingNow, playingNowReload);

    // Register play/stop audio for featured/search resulst
    $( 'body' ).on( 'tap', '.play-audio', function(e){
      preventDoubleTap( 'playAudio', function(){
        console.log('play-audio tap');
        console.log('type:           '+e.type);
        console.log('target:         '+e.target);
        console.log('current target: '+e.currentTarget);
        console.log('related target: '+e.relatedTarget);
        console.log('timestamp:      '+e.timeStamp);
        setCurrentHeaderActive(false);
        var $this = $( e.currentTarget);
        var dataUri = $this.attr('data-uri');
        //console.log( '$this='+JSON.stringify($this) );
        console.log( 'dataUri='+dataUri+' playingUrl='+playingUrl );
        if( dataUri === playingUrl ){
          if( isPlaying ){
            pauseStream();
          } else {
            playStream();
            isPlayingShow = true;
          }

        } else {
          if( isPlaying ){
            stopStream();
          }

          playingUrl = dataUri;
          playingContainer = $this;

          console.log('tap: '+playingUrl);
          //$( ":mobile-pagecontainer" ).pagecontainer( "change", "#radio", {} );
          restartAudio( playingUrl );
          playStream();
          isPlayingShow = true;
        }
      })
    });

    // Handle search
    $('form').on('submit', function(e){
      var $this = $(this);
      var $input = $this.find('input');
      var val = $input.val();
      console.log( 'submit '+val );
      $input.blur();
      doSearch( val );
      e.preventDefault();
    });

    // Load the featured stories
    $.ajax({
      url: featuredUrl
    }).done( function( data, textStatus, xhr ){
      console.log( 'featured query done' );
      showFeaturedResults( data.results );
    });

    $('.ui-btn' ).on('touchstart', function(e){
      var $this = $(this);
      console.log('touchstart '+this);
      $this.addClass('clicked');
    });
    $('.ui-btn' ).on('touchend', function(e){
      var $this = $(this);
      console.log('touchend '+this);
      $this.removeClass('clicked');
    });

  }

  function adjustBanner(){
    var $device = $(window);
    var $header = $('.banner');
    var ratio  = window.devicePixelRatio;  // Ratio against a 1x (320px) screen
    var ratio2 = ratio / 2.0;              // Ratio against a 2x (640px) screen
    var deviceHeight = $device.height();
    var deviceWidth = $device.width();

    console.log( 'deviceHeight='+deviceHeight+' deviceWidth='+deviceWidth );
    console.log( 'pixelRatio='+ratio );

    // How much of the oval should be visible below the menu bar
    var headerHeight = deviceHeight * 0.2;

    // Create an oval with the right amount of curve. It needs to be wider
    // than the device to get the right angle.
    $header.width(deviceWidth * 1.25);
    $header.height($header.width() * 0.75);

    // Adjust the height of the outer wrapper to allow for enough content space
    // but not too large
    $('.banner-wrapper-outer' ).each(function(){
      var $wrapper = $(this);
      var $content = $wrapper.find('.banner-content');

      var $imgs = $content.find('img');
      $imgs.each(function(){
        var $img = $(this);
        var imgWidth  = this.naturalWidth;
        var imgHeight = this.naturalHeight;
        $img.attr('width', imgWidth / ratio);  // Needs to be "ratio" or iOS8 and "ratio2" for android?
        $img.attr('height', imgHeight / ratio)
      })

      var contentHeight = $content.innerHeight();
      var wrapperPadding = 0;
      if( contentHeight > headerHeight ){
        wrapperPadding = contentHeight - headerHeight;
      }
      $wrapper.css('padding-top', ''+wrapperPadding+'px');
      $wrapper.css('height', ''+headerHeight+'px');
    });

    // Move most of the oval up off the top of the device.
    $header.css('top', '-' + ($header.height() - headerHeight) + 'px');

  }

  var fakeResults = [
    {
      uri:          'http://media.science360.gov/audio/s360/news_service/2014_06_16_nakedscientists_yeastchromosome.mp3',
      thumbnailUrl: 'http://media.science360.gov/files/radio-show/4d372dfe-6a77-4274-9333-5a9c045a2616-largeImage.jpg',
      title:        'The Naked Scientists',
      desc:         'NSF-funded Jef Boeke discusses a synthetic, fully functional copy of a yeast chromosome',
      source:       'Provided by The Naked Scientists',
      duration:     298
    },
    {
      uri:          'http://media.science360.gov/audio/s360/news_service/2014_06_13_pulseplanet_rolfpeterson.mp3',
      thumbnailUrl: 'http://media.science360.gov/files/radio-show/174939ba-3662-457f-b244-29e9c92039ef-largeImage.jpg',
      title:        'Pulse of the Planet',
      desc:         'NSF-funded Rolf Peterson comments on a predator-prey relationship involving wolves',
      source:       'Provided by Pulse of the Planet',
      duration:     120
    },
    {
      uri:          'http://media.science360.gov/audio/s360/news_service/2014_06_12_academicminute_jupiterredspot.mp3',
      thumbnailUrl: 'http://media.science360.gov/files/radio-show/5b32a0c2-6a21-4978-9506-5e7c4adbe142-largeImage.jpg',
      title:        'The Academic Minute',
      desc:         'NSF-funded Philip Marcus explains the persistence of Jupiter’s great red spot',
      source:       'Provided by WAMC Northeast Public Radio',
      duration:     10
    },
    {
      uri:          'http://media.science360.gov/audio/s360/news_service/2014_06_11_nsf_cribnotes.mp3',
      thumbnailUrl: 'http://media.science360.gov/files/radio-show/0a99f668-03e8-4b0f-ae9e-9c685054cfa2-largeImage.jpg',
      title:        'The Discovery Files',
      desc:         'Study finds infants are exposed to high levels of chemical emissions from crib mattresses',
      source:       'Provided by the National Science Foundation',
      duration:     3670
    },
    {
      uri:          'http://media.science360.gov/audio/s360/news_service/2014_06_10_quirksquarks_lemurs.mp3',
      thumbnailUrl: 'http://media.science360.gov/files/radio-show/e29c4734-7498-4e7f-9793-77b07fce1a89-largeImage.jpg',
      title:        'Quirks & Quarks',
      desc:         'NSF-funded Christine Drea discusses the scenting behavior of lemurs',
      source:       'Provided by CBC Radio',
      duration:     7900
    }
  ];

  function testFeaturedResults(){
    showFeaturedResults(fakeResults);
  }

  function onPageChange( event, ui ){
    var pageId = $(":mobile-pagecontainer" ).pagecontainer('getActivePage' ).attr('id');
    console.log( 'active page: '+ pageId );
    var $page = $('#'+pageId);

    if( ui.prevPage ){
      var $oldPage = ui.prevPage;
      console.log( 'previous page id: '+ui.prevPage.attr('id') );

      var $oldInput = $oldPage.find('input');
      var $input = $page.find('input');
      $input.val( $oldInput.val() );
    }

    if( pageId === 'featured' ){
      //hideSearchBox( $page );
      //adjustShowEntries();
    }
  }

  function hideSearchBox( $pageContainer ){
    var $ul = $pageContainer.find('ul[data-role="listview"]');
    var scroll = $ul.offset().top;
    console.log( 'scrollTo '+scroll );
    console.log( typeof scroll )
    $.mobile.silentScroll( scroll );
  }

  function loadExternalUrl( url ){
    console.log( 'loadExternalUrl '+url );
    if( device.platform === 'Android' ){
      navigator.app.loadUrl( url, {openExternal:true} );
    } else {
      window.open( url, '_system' );
    }
  }

  function setButtonDown( id, active ) {
    var replaceSuffix = ( active ) ? '-up' : '-down';
    var withSuffix = ( active ) ? '-down' : '-up';
    $( id ).attr( 'src', $( id ).attr( 'src' ).replace( replaceSuffix, withSuffix ) );
  }
  
  function setVisibleControlButton( cl ) {

    // Set all the buttons to "play"
    $('.pause').hide();
    $('.play').show();

    // If we are setting one button to "pause" figure out the right one and
    // change just that one.
    if( cl === 'pause' ){
      playingContainer.find('.pause').show();
      playingContainer.find('.play').hide();
    }

    /*
    var hiddenId = ( id === '#audioPlay' ) ? '#audioPause' : '#audioPlay';
    setButtonDown( hiddenId, false );
    $( hiddenId ).hide();
    $( id ).show();
    */
  }

  function setVisibleControlPlay(){
    setVisibleControlButton('play');
  }

  function setVisibleControlPause(){
    setVisibleControlButton('pause');
  }
  
  function preventDoubleTap( lastTouchVar, tapFunction, length ) {
    var now = new Date().getTime();
    var lastTouch = $( this ).data( lastTouchVar ) || now + 1;
    var delta = now - lastTouch; // First time through, this will be negative.
    // Only call the tapFunction if this is the first time or the previous
    // tap was more than a certain time ago.
    var preventTime = ( length ) ? length : 500;
    if ( delta > preventTime || delta < 0 ) {      
      try {
        tapFunction();
      } catch (e) { 
        console.log(e);
        console.log( e.stack );
      }
      $( this ).data( lastTouchVar, now );
    }
  }

  function showLoading( doShow, msg ){
    console.log( 'showLoading '+doShow );
    if( doShow ){
      $.mobile.loading( 'show', {
        theme: 'b',
        text: msg ? msg : 'loading',
        textVisible: true,
        textOnly: false,
        html: ''
      });
    } else {
      $.mobile.loading( 'hide' );
    }
    console.log( 'done showLoading' );
  }
  
  function createAudio( url ){
    if( useAudio ){
      try {
        myaudio = new Audio();
        myaudio.id = 'playerMyAdio';
        myaudio.addEventListener('playing',streamStarted,false);
        myaudio.addEventListener('error',streamError,false);
        myaudio.addEventListener('ended',streamError,false);
        myaudio.addEventListener('pause',streamPaused,false);

        /***
        myaudio.addEventListener('abort',streamAbort,false);
        myaudio.addEventListener('emptied',streamError,false);
        myaudio.addEventListener('stalled',streamError,false);
        myaudio.addEventListener('suspend',streamError,false);
        myaudio.addEventListener('waiting',streamError,false);
        myaudio.addEventListener('emptied',streamError,false);
         ***/

      } catch (e) {
        var info = {
          isError: true,
          unavailableMsg: "No audio support found!"
        };
        display( info );
      } 
    }
    
    isAudioCreated = true;
  }
  
  function setCurrentHeaderActive( active ) {
    var headerText = ( active ) ? 'Now Playing:' : 'Scheduled:';
    var header = $( '.currentHeader' ).text( headerText );
    if( active ){
      header.addClass( 'headerActive' );
      $('.display-show' ).show();
      $('.display-stream' ).hide();

    } else {
      header.removeClass( 'headerActive' );
      $('.display-show' ).hide();
      $('.display-stream' ).show();
    }
  }
  
  function restartAudio( url ){
    console.log( 'restartAudio url='+url+' typeof url='+(typeof url)+' audioUrl='+audioUrl );
    console.log( 'foo' );

    audioUrl = url;
    console.log( 'audioUrlDefault='+JSON.stringify(audioUrlDefault)+' networkTypeStr='+networkTypeStr );

    if( typeof audioUrl === 'undefined' || audioUrl.length == 0 ){
      console.log('bar');
      audioUrl = audioUrlDefault[networkTypeStr];
    }
    console.log( 'restartAudio networkTypeStr='+networkTypeStr+' audioUrl='+audioUrl );

    if( typeof audioUrl === 'undefined' || audioUrl.length == 0 ){
      console.log('baz');
      audioUrl = audioUrlDefault['cell'];
    }
    console.log( 'restartAudio cell audioUrl='+audioUrl );
    
    audioUrl = audioUrl.replace( /.m3u$/i, '' );

    if( linkToAudio ){
      $('#audioPlay').parent('a').attr( 'href', audioUrl );
    }

    isAudioReady = true;

    console.log( 'restartAudio isPlaying='+isPlaying );
    if( isPlaying ){
      // We were already playing, so we need to restart playing
      playStream();
    }
  }
  
  function playStream() {
    if( !isPlaying ){
      isPageLoading = true;
    }
    
    // Turn on the "loading" message
    showLoading( true );

    // Initialize audio object and urls
    if( !isAudioCreated ){
      createAudio( audioUrl );
    }
    if( !isAudioReady ){
      restartAudio( audioUrl );
    }
    
    // Show the latest program information
    loadPlayingNow();
    if( !playingNowTimer ){
      playingNowTimer = setInterval( loadPlayingNow, playingNowReload );
    }
    
    // Start playing the stream
    try{
      // always reset the audio src
      if( useAudio ){
        console.log( 'set src to '+audioUrl );
        myaudio.src = audioUrl;
      } else if( useMedia ){
        console.log( 'create Media audioUrl='+audioUrl+'=' );
        if( myaudio ){
          console.log( 'myaudio release' );
          myaudio.release();
        }
        myaudio = new Media( audioUrl, mediaSuccess, mediaError, mediaStatus, mediaPosition );
      }
      
      console.log( 'myaudio play' );
      myaudio.play();
      console.log( 'myaudio play called')
    } catch(e){console.log(e);}

    // Even if audio isn't going, we want to know we should be
    isPlaying = true;  

    // Make sure the pause button is the one showing
    //setVisibleControlButton( '#audioPause');
    setVisibleControlPause();
  }
  
  function pauseStream() {
    console.log( 'pauseStream' );
    showLoading( false );  // turn off loading message in case it is on
    isPageLoading = false;
    isPlaying = false;
    isPlayingShow = false;
    if( useAudio ){
      myaudio.pause();
    }
    stopStream();
    // Change the header
    setCurrentHeaderActive( false );
    if( !isNetworkReady ) {
      var info = {
        isError: true,
        unavailableMsg: 'Stream error, try again later.'
      };
      display( info );
    }
  }
  
  function stopStream(){
    console.log( 'stopStream' );
    // There is no stop() function on Audio, so we have to
    // stop playing and clear the source
    showLoading( false );
    // Make sure the play button is the one showing
    //setVisibleControlButton( '#audioPlay');
    setVisibleControlPlay();

    isPageLoading = false;
    isPlaying = false;
    isPlayingShow = false;
    if( useAudio ){
      myaudio.src = undefined;
      myaudio.pause();
    } else if( useMedia ){
      clearPositionTimer();
      myaudio.stop();
    }
  }
  
  function streamPaused() {
    if (isPlaying) {
      console.log(' ****** lost connection to stream host');
      var info = {
        isError: true,
        unavailableMsg: 'Live stream unavailable, trying to reconnect...'
      };
      display( info );
      // Set network as unreachable and start checking for when it comes back      
      setNetworkType( Connection.NONE );
      if( playingNowTimer ){
        // Clear the playingNow timer
        clearInterval( playingNowTimer );
        playingNowTimer = undefined;
      }
      checkReconnectAfterPauseEvent();
      
    }
  }
  
  function checkReconnectAfterPauseEvent(){
    console.log( 'checkReconnectAfterPauseEvent isNetworkReady='+isNetworkReady+' isPlaying='+isPlaying );
    if( isPlaying && !isNetworkReady ){
      try{reachableFunction();} catch(e){console.log(e);}
      try{setTimeout( checkReconnectAfterPauseEvent, reachableReload );}catch(e){console.log(e);}
    }
  }
    

  function streamStarted() {
    console.log('streamStarted');
    showLoading( false );  // Turn off the "loading" message
    isPageLoading = false;

    // Change the header on the radio page
    if( !playingUrl ){
      setCurrentHeaderActive( true );
    }

    // Make sure the pause button is the one showing
    setVisibleControlPause();
  }  

  function streamError(e) {
    console.log('reason: '+ e.type +  '\nnetwork: ' + myaudio.networkState + '\nready: ' + myaudio.readyState + '\nerror: '+ myaudio.error);
    showLoading( false );  // Make sure "loading" message is off
    // FIXME - under some circumstances, should call processAudioErr()
    // Change the header
    // Alert on stream error but ignore the error generated by a pause/stop
    if (e.type == "error" && isPlaying) {
      var info = {
          isError: true,
          unavailableMsg: 'Cannot play stream, please try again.'
      };
      display( info );
    }

    // Radio page header should show scheduled
    setCurrentHeaderActive( false );

    // Make sure the play button is the one showing
    setVisibleControlPlay();
  }  
  
  function mediaSuccess(){
    console.log( 'media success' );
  }
  
  function mediaError( e ){
    // Most errors from PhoneGap are really state errors,
    // and don't impact the stream playability.
    console.log( 'media error e='+JSON.stringify(e) );
  }
  
  function mediaStatus( s ){
    try{
    console.log( '*** media status: '+Media.MEDIA_MSG[s] );
    switch(s){
    case Media.MEDIA_NONE:
      break;
    case Media.MEDIA_STARTING:
      // We should already have done anything when we pressed the button
      break;
    case Media.MEDIA_RUNNING:
      startPositionTimer();
      streamStarted();
      break;
    case Media.MEDIA_PAUSED:
      clearPositionTimer();
      break;
    case Media.MEDIA_STOPPED:
      // This may be due to the stream being lost, or because of pressing
      // the stop button. Or because the featured audio we were playing is over.
      clearPositionTimer();
      if( isPlayingShow ){
        setVisibleControlPlay();
      } else {
        streamPaused();
      }
      break;
    default:
      console.log('unknown media status');
    }
    console.log( 'done-media status' );
    }catch(e){console.log(e);}
  }
  
  function mediaPosition( p ){
    console.log( 'mediaPosition p='+p+' last='+positionLast );
    var now = (new Date()).getTime();
    if( p > positionLast || positionLast == undefined ){
      // We have updated since the last check, things are good
      console.log( 'mediaPosition updated' );
      positionLast = p;
      positionLastUpdate = now;
      
    } else if( now-positionLastUpdate >= positionMaxNoUpdate ){
      // We have not updated in over maxNoUpate miliseconds.
      // Say we've timed out and stop trying.
      console.log( 'mediaPosition timeout now='+now+' last='+positionLastUpdate );
      clearPositionTimer();
      //streamPaused();
      myaudio.stop();
      
    } else {
      // We have not updated, but we're not past the max time yet.
      console.log( 'mediaPosition no-update now='+now+' last='+positionLastUpdate );
    }
  }
  
  function clearPositionTimer(){
    if( positionTimer ){
      clearInterval( positionTimer );
      positionTimer = undefined;
    }
    setCurrentHeaderActive(false);
  }
  
  function startPositionTimer(){
    if( !positionTimer ){
      positionLast = undefined;
      positionLastUpdate = undefined;
      positionTimer = setInterval( function(){myaudio.getCurrentPosition(mediaPosition,mediaError)}, positionInterval );
    }
    if( playingUrl ){
      setCurrentHeaderActive(false);
    } else {
      setCurrentHeaderActive(true);
    }
  }
  
  //-----------------------------------------------------------------
  
  function setNetworkType( t ){
    console.log( 'setNetworkType='+t );
    networkType = t;
    networkTypeStr = networkTypeStrMap[networkType];
    isNetworkReady = networkType != Connection.NONE;
  }

  function loadReachable(){
    console.log( 'loadReachable' );
    processReachable( navigator.network.connection.type );
  }
  
  function loadReachableFake(){
    console.log( 'loadReachableFake' );
    processReachable(Connection.UNKNOWN);
  }
  
  function processReachable( reachability ){
    console.log( 'processReachable' );
    setNetworkType( reachability );

    if( isNetworkReady ){
      // Try to update stream information
      loadStreamInfo()
    } else {
      // Make sure audio isn't ready either
      isAudioReady = false;
    }
  }

  function loadStreamInfo() {
    console.log( 'loadStreamInfo' );
    $.ajax({
      url: streamInfoUrl,
      dataType: "xml",
      success: processStreamInfo,
      error: processStreamInfoErr
    });
  }
  
  function processStreamInfoErr(){
    // We have (or had) a network, but no file with a stream url
    // Set the audio to be ready to use default urls
    console.log( 'processStreamInfoErr' );
    if( !isAudioReady ){
      restartAudio();
    }
  }
  
  function processStreamInfo( xml ){
    // If we get here, then the network should be working
    console.log( 'processStreamInfo' );
    var xmlq = $(xml);
    
    // Attempt to get a url from the XML, but there
    // may not be any, in which case we'll end up
    // with the default or the URL assigned some
    // other way.
    var url = undefined;
    try{
      url = xmlq.find('streamUrl').find(networkTypeStr).text();
    } catch(e) {
      // The node may not exist, and this is acceptable
    }
    
    console.log( 'processStreamInfo url='+url+' isAudioCreated='+isAudioCreated+' isAudioReady='+isAudioReady );
    
    if( !isAudioReady ){
      // We had an audio failure that we've recovered from, we hope
      restartAudio( url );
      
    } else if( url != undefined && url.length > 0 && audioUrl != url ){
      // We have a URL change to something specific
      // (ie - we're not just relying on the default)
      restartAudio( url );
    }
  }

  function showAudioState() {
   if (isAudioCreated) {
      alert('\nbuffered: '+ myaudio.buffered.length +
                  '\ncurrentSrc: '+ myaudio.currentSrc +
                  '\nduration: '+ myaudio.duration +
                  '\nended: '+ myaudio.ended +
                  '\nerror: '+ myaudio.error +
                  '\nnetworkState: '+ myaudio.networkState +
                  '\npaused: '+ myaudio.paused +
                  '\nplayed: '+ myaudio.played.length +
                  '\nreadyState: '+ myaudio.readyState +
                  '\nseekable: '+ myaudio.seekable.length +
                  '\nseeking: '+ myaudio.seeking +
                  '\nstartTime: '+ myaudio.startTime );
    }
  }

  //-----------------------------------------------------------------
  
  function loadPlayingNow() {
    console.log( 'loadPlayingNow' );
    var timestamp = new Date().getTime();
    $.ajax({
      url: playingNowUrl + '?t=' + timestamp,
      dataType: "xml",
      success: processPlayingNow,
      error: processPlayingNowErr
    });
  }
  
  function processPlayingNowErr( jqXHR, textStatus, errorThrown ){
    console.log( "processPlayingNowErr status=[" + textStatus + "] errorThrown=[" + errorThrown + "]" );
    var info = {
        isError: true,
        unavailableMsg: "Radio stream data error, please try again."
    };
    display( info );
  }
  
  function processPlayingNow( xml ){
    console.log( 'processPlayingNow: ');
    var xmlq = $(xml);
    var info = {
      isError: false,
      current: {
        program: radioInfoText( xmlq, 'current', 'program' ),
        episode: radioInfoText( xmlq, 'current', 'episode' ),
        runTime: radioInfoText( xmlq, 'current', 'length' )
      },
      next: {
        program: radioInfoText( xmlq, 'next', 'program' ),
        episode: radioInfoText( xmlq, 'next', 'episode' )
      },
      prev: {
        program: radioInfoText( xmlq, 'previous', 'program' ),
        episode: radioInfoText( xmlq, 'previous', 'episode' )
      }
    };
    display( info );
    
    console.log( 'processRadioStreamInfo isNetworkReady='+isNetworkReady );
    if( !isNetworkReady ){
      reachableFunction();
    }
  }
  
  function radioInfoText( xmlq, section, child ){
    ret = '';
    try{
      ret = xmlq.find( section ).children( child ).text();
    } catch( e ){
      console.log( e );
    }
    return ret;
  }
  
  function display( info ){
    //FIXME - set a default for info.unavailableMsg
    if( info.isError ){
      $('.currentTitle').addClass( 'streamInfoError' );
    } else {
      $('.currentTitle').removeClass( 'streamInfoError' );
    }
    displayText( '.currentTitle', buildTitleText( info.current, '<br />', info.unavailableMsg ) );
    var runTime = '';
    try {
      runTime = info.current.runTime;
    } catch( e ) { }
    displayRunTime( runTime );
    displayText( '.nextTitle', buildTitleText( info.next, '<br />' ) );
    displayText( '.prevTitle', buildTitleText( info.prev, '<br />' ) );
  }

  function buildText( text, label, unavailableMsg ) {
    if ( text && label ) {
      return label + text;
    } else if ( text ) {
      return text;
    }
    return ( unavailableMsg ) ? unavailableMsg : "";
  }

  function buildTitleText( info, separator, unavailableMsg ) { 
    if ( info ) {
      var program = info.program;
      var episode = info.episode;
      if ( program && episode ) {
        return program + separator + episode;
      } else if ( program ) {
        return program;
      } else if ( episode ) {
        return episode;
      }
    }
    return ( unavailableMsg ) ? unavailableMsg : "";
  }

  function displayText( child, text ) {
    var c = $( child );
    if ( text ) {
      c.html( text );
    } else {
      c.html( "&nbsp;" );
    }
  }

  function displayRunTime( runTime, selector ){
    if( !selector ){
      selector = '#player .runTime';
    }
    if( typeof runTime === 'number' ){
      runTime = formatRunTime( runTime );
    }
    var text = buildText( runTime, 'Run time: ' );
    console.log( 'displayRunTime '+text );
    displayText( selector, text );
  }

  function formatRunTime( runTimeSeconds ){
    var ret = '';

    var hour = Math.floor( runTimeSeconds / (60*60) );
    if( hour > 0 ){
      ret+=hour+':';
    }

    var runTimeSeconds = runTimeSeconds % (60*60);
    var min = Math.floor( runTimeSeconds / 60 );
    if( min > 0 || ret.length > 0 ){
      if( min <= 9 && ret.length > 0 ){
        min = '0'+min;
      }
      ret+=min+':';
    }

    var sec = runTimeSeconds % 60;
    if( sec <= 9 && ret.length > 0 ){
      sec = '0'+sec;
    }
    ret+=sec;

    return ret;
  }

  function showFeaturedResults( results ){
    // Clear the current list
    var $list = $('#featured [data-role="listview"]');
    $list.html('');
    addShowEntries( $list, results );
    //hideSearchBox( $('#featured') );
  }

  function doSearch( query ){
    console.log( 'doSearch' );
    $('.searchMsg' ).text('Searching for "'+query+'"');

    // Actually switch to the search screen
    console.log( 'doSearch switch' );
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#search", {} );

    showLoading( true, 'Searching' );

    /*
    // FIXME - actually do a search
    console.log( 'doSearch setTimeout' );
    setTimeout( function(){
      console.log( 'doSearch timeout callback' );
      showSearchResults( query, fakeResults );
    }, 5000 );
    */

    $.ajax({
      url: searchUrl,
      data: {
        q: query
      }
    }).done( function( data, textStatus, xhr ){
      console.log( 'doSearch query done' );
      showSearchResults( query, data.results );
    });
  }

  function showSearchResults( query, results ){
    // Set the message
    $('.searchMsg' ).text('Results for "'+query+'"');

    // Clear the current list
    var $list = $('#search [data-role="listview"]');
    $list.html('');

    // Add the results
    addShowEntries( $list, results );

    // Remove the loading message
    showLoading( false );
  }

  function addEntry( $parent ){
    $parent.append('<li data-icon="false" class="resultEntry"></li>');
    var $li = $parent.find('li').last();
    $li.append("<a href='#' class='play-audio'></a>")
    var $a = $li.find('a');
    return $a;
  }

  function addLiveEntry( $parent ){
    var $entry = addEntry( $parent );
    $entry.append('<h1 class="currentHeader">Scheduled:</h1>');
    $entry.append('<h2 class="currentTitle">&nbsp;</h2>');
    $entry.append('<p class="ui-li-aside runTime">&nbsp;</p>')
  }

  function addShowEntry( $parent, uri, thumbnailUrl, title, desc, source, duration ){
    var $entry = addEntry( $parent );
    console.log( 'data-uri='+uri );
    $entry.attr('data-uri', uri);

    $entry.append('<div class="thumbnail-panel"></div>');
    var $tp = $entry.find('.thumbnail-panel');
    $tp.append('<img src="'+thumbnailUrl+'" class="thumbnail">');
    $tp.append('<div class="control-panel"></div>');

    $entry.append('<p class="title">'+title+'</p>');
    $entry.append('<p class="desc">'+desc+'</p>');
    $entry.append('<p class="source">'+source+'</p>');

    var $cp = $entry.find('.control-panel');
    $cp.append('<img src="img/play-orange.png"  class="control play"  width="30" height="30">');
    $cp.append('<img src="img/pause-orange.png" class="control pause" width="30" height="30">');
    if( duration ){
      if( typeof duration === 'number' ){
        duration = formatRunTime( duration );
      }
      $cp.append('<p class="runTime">'+duration+'</p>');
    }

    // Handle various image sizes
    $tp.find('.thumbnail').load(function(e){
      console.log( 'thumbnail loaded' )
      var panelHeight = $tp.height();

      var $img = $(this);
      var imgHeight = $img.height();

      console.log( 'imgHeight='+imgHeight+' panelHeight='+panelHeight );
      var padding = (panelHeight - imgHeight) / 2;
      $img.css( 'padding-top', ''+padding+'px' );
      $parent.enhanceWithin();
      $('.ui-listview').listview('refresh');
      console.log( 'thumbnail loaded done' );
    });
  }

  function addShowEntries( $parent, results ){
    console.log( 'addShowEntries' );
    results.forEach(function(result){
      addShowEntry( $parent, result.audioUrl, result.thumbnailUrl, result.title, result.desc, result.source, result.duration );
    });
    //console.log('before enhanceWithin x:'+$parent[0].outerHTML);
    $parent.enhanceWithin();
    $('.ui-listview').listview('refresh');
    //console.log('after enhanceWithin');
    console.log( 'done addShowEntries' );
  }

  function adjustShowEntries(){
    console.log( 'adjustShowEntries' );
    var $page = $('#featured');

    $page.find('.thumbnail-panel').each(function(){
      var $tp = $(this);
      var panelHeight = $tp.height();
      $tp.find('.thumbnail' ).each(function(){
        var $img = $(this);
        var imgHeight = $img.height();
        console.log( 'adjust imgHeight='+imgHeight+' panelHeight='+panelHeight );
        var padding = (panelHeight - imgHeight) / 2;
        $img.css( 'padding-top', ''+padding+'px' );
      });
    });

    var $listview = $page.find('[data-role="listview"]');
    console.log( 'listview:'+$listview );
    $listview.enhanceWithin();
    $('.ui-listview').listview('refresh');
    console.log( 'adjustShowEntries done' );
  }

/* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
        

/* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var app = {
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
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
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

