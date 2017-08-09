















/** Settings page */
( function( $, xp, undefined ) {
  var _returnPage;
  
  $( xp ).bind( "init", initialize );
  
  function initialize() {
    var index = "home";
    
    registerEventListeners();
    xp.teamName = window.localStorage.getItem( "teamName" ) || "Team name";
  }
  
  function registerEventListeners() {
    $( xp ).bind( "showsettings", handleShowSettings );
    
    $( ".back" ).bind( "tap", goBack );
    
    $( ".forward" ).bind( "tap", goForward );
    
    $( ".switch-off" ).bind( "tap", toggleSound );
    
    $( ".sort > div" ).bind( "tap", toggleSort );
    
    $( "#settings .save" ).bind( "tap", saveChanges );
    
  }
  
  function toggleSort( evt ) {
    var $elem = $( evt.currentTarget );
    $elem.addClass( "selected" )
         .siblings( ".selected" )
         .removeClass( "selected" );
  }
  
  function goBack( evt ) {
    if( _returnPage === "home" ) {
      $( ".back" ).removeClass( "show" );
      $( ".settings-button" ).removeClass( "hide" );
      xp.fx.slideRight( document.getElementById( _returnPage ), document.getElementById( "settings") );
      _returnPage = undefined;
    }
  }
  
  function goForward( evt ) {
    $( ".back" ).addClass( "show" );
    if( _returnPage === "maps" ) {
      $( ".forward" ).removeClass( "show" );
      xp.fx.slideLeft( document.getElementById( "main" ), document.getElementById( "map") );
      _returnPage = undefined;
    } else if( _returnPage === "hunts" ){
      $( ".forward" ).removeClass( "show" );
      $( ".settings-button" ).removeClass( "hide" ); 
      xp.fx.slideLeft( document.getElementById( "settings" ), document.getElementById( "hunts") );
      _returnPage = undefined;
    }
  }
  
  function toggleSound( evt ) {
    $( ".switch-off" ).toggleClass( "show" );
    $( ".switch-handle" ).toggleClass( "off" );
  }
  
  function handleShowSettings( evt, data ) {
    var $soundToggle;
    $( ".settings-button" ).addClass( "hide" );
    if( ( window.localStorage.getItem( "sound" ) === "false" ) ) {
      $( ".switch-off" ).removeClass( "show" );
      $( ".switch-handle" ).removeClass( "off" );
    } else {
      $( ".switch-off" ).addClass( "show" );
      $( ".switch-handle" ).addClass( "off" );
    }
    
    $( "#team" ).val( xp.teamName );
    
    _returnPage = data.from;
    
    if( _returnPage === "home" ) {
      xp.fx.slideLeft( document.getElementById( _returnPage ), document.getElementById( "settings") );
      $( ".back" ).addClass( "show" );
    } else {
      $( ".back" ).removeClass( "show" );
    }
  }
  
  function saveChanges() {
    var sound = $( ".switch-handle" ).hasClass( "off" ),
        teamName = document.getElementById( "team" ).value;

    if( teamName.toLowerCase() !== "team name" ) {
      window.localStorage.setItem( "teamName", teamName );
      xp.teamName = teamName;
    }
    $( xp ).trigger( "sort", $( ".sort .selected" ).data( "type" ) )
           .trigger( "sound", sound );
    setTimeout( function() {
      if( _returnPage === "home" ) {
        goBack();
      } else {
        goForward();
      }
    }, 200 )
  }

})( jQuery, xplorio );

/** Settings page */
( function( $, xp, undefined ) {
  var _returnPage
    , _scroller;
  
  $( xp ).bind( "init", initialize );
  
  function initialize() {
    registerEventListeners();
    _scroller = new iScroll( document.getElementById( "how") );
  }
  
  function registerEventListeners() {
    $( xp ).bind( "showhow", handleShowHow );
    
    $( ".back" ).bind( "tap", goBack );
  }
  
  function goBack( evt ) {
    if( _returnPage === "home" ) {
      $( ".back" ).removeClass( "show" );
      xp.fx.slideRight( document.getElementById( _returnPage ), document.getElementById( "how" ) );
      _returnPage = undefined;
    }
  }
  
  function handleShowHow( evt, data ) {
    _returnPage = data.from;
    xp.fx.slideLeft( document.getElementById( _returnPage ), document.getElementById( "how") );
    $( ".back" ).addClass( "show" );
  }

})( jQuery, xplorio );

( function( $, undefined ) {
  var MOVE_THRESHOLD = 20
    , supportsTouch = "ontouchend" in document
    , events = {};
  
  if( supportsTouch ) {
    events.start = "touchstart";
    events.move = "touchmove";
    events.end = "touchend";
    events.cancel = "touchcancel";
  } else {
    events.start = "mousedown";
    events.move = "mousemove";
    events.end = "mouseup";
    events.cancel = "touchcancel";
  }  

  $.event.special.tap = {
    setup: function( data ) {
      var $this = $( this );
      
      $this.bind( events.start, function( event ) {
        var moved = false,
          touching = true,
          origTarget = event.target,
          origEvent = event.originalEvent,
          origPos = event.type == "touchstart" ? [origEvent.touches[0].pageX, origEvent.touches[0].pageY] : [ event.pageX, event.pageY ],
          originalType,
          tapHoldTimer;
                    
        //We want to protect against them tapping and holding.  So we start a timer to see if they haven't moved or released.
        tapHoldTimer = setTimeout( function() {
          $this.unbind( events.end ).unbind( events.move );
        }, 750);
          
        //Register the move event listener so we know if this is not actually a tap but a swipe or scroll
        $this.bind( events.move, function( event ) {
          var newPageXY = event.type == "touchmove" ? event.originalEvent.touches[0] : event;
          if ( ( Math.abs( origPos[0] - newPageXY.pageX ) > MOVE_THRESHOLD ) || ( Math.abs( origPos[1] - newPageXY.pageY ) > MOVE_THRESHOLD ) ) {
            moved = true;
          }
        });
        
        //Register the end event so we can check to see if we should fire a tap event and cleanup.
        $this.one( events.end, function( event ) {
          $this.unbind( events.move );
          clearTimeout( tapHoldTimer );
          touching = false;
          
          /* ONLY trigger a 'tap' event if the start target is
           * the same as the stop target.
           */
          if ( !moved && ( origTarget === event.target ) ) {
              originalType = event.type;
              event.type = "tap";
              event.pageX = origPos[0];
              event.pageY = origPos[1];
              $.event.handle.call( $this[0], event );
              event.type = originalType;
          }
        });
      });
    }
  };
  
 $.event.special.swipe = {
    setup: function( data ) {
      var $this = $( this );
      
      $this.bind( events.start, function( event ) {
        var moved = false,
          touching = true,
          origTarget = event.target,
          origEvent = event.originalEvent,
          origPos = event.type == "touchstart" ? [origEvent.touches[0].pageX, origEvent.touches[0].pageY] : [ event.pageX, event.pageY ],
          originalType,
          tapHoldTimer,
          $elem = $( event.target );
          
        //We want to protect against them tapping and holding.  So we start a timer to see if they haven't moved or released.
        tapHoldTimer = setTimeout( function() {
          $this.unbind( events.end ).unbind( events.move );
        }, 750);
          
        //Register the move event listener so we know if this is not actually a tap but a swipe or scroll
        $this.bind( events.move, function( event ) {
          var newPageXY = event.type == "touchmove" ? event.originalEvent.touches[0] : event;
          if ( (Math.abs(origPos[0] - newPageXY.pageX) > MOVE_THRESHOLD) && (  Math.abs(origPos[1] - newPageXY.pageY) < MOVE_THRESHOLD ) ) {
             $this.unbind( events.end );
             $this.unbind( events.move );
             clearTimeout( tapHoldTimer );
             $elem.trigger( 'swipe', ( origPos[0] > newPageXY.pageX ) ? 'swipeLeft' : 'swipeRight' );
          }
        });
        
        //Register the end event so we can check to see if we should fire a tap event and cleanup.
        $this.one( events.end, function( event ) {
          $this.unbind( events.move );
          clearTimeout( tapHoldTimer );
          touching = false;
        });
        
      });
    }
  };

})( jQuery );


//var SERVER_URL = "http://192.168.1.2:3000";
var SERVER_URL = "http://xplor.io"
//var SERVER_URL = "http://10.0.1.2:3000";

var xplorio = {};

//Shared functions and entry point
( function( $, xp, undefined ) {
  var $document = $( document );
  var $window = $( window );
  
  //Public variables
  xp.currentStep = 0;
  
  $document.ready( function() {
    document.addEventListener("deviceready", onDeviceReady, false); 
    initialize();
    registerEventListeners();
  });

  $document.bind( "pause", function() {
    xp.song && xp.song.pause();
  });

  $document.bind( "resume", function() {
    xp.song && xp.song.play();
  });
  
  //PUBLIC FUNCTIONS
  xp.saveHunt = function( data ) {
    var index = indexOfHuntInStore( data.hunt_id );
    if( index !== null ) {
      xp.huntStore[index].name = data.hunt_name;
    } else {
      xp.huntStore.push( { "name": data.hunt_name, "status": "started", "id": data.hunt_id } );
    }
    window.localStorage.setItem( "hunts", JSON.stringify( xp.huntStore ) );
    window.localStorage.setItem( data.hunt_id, JSON.stringify( data ) )
  }
  
  xp.getHuntByID = function( id ) {
    return JSON.parse( window.localStorage.getItem( id ) );
  }
  
  xp.deleteHuntById = function( id ) {
    var index = indexOfHuntInStore( id );
    window.localStorage.removeItem( id );
    if( index !== null ) {
      xp.huntStore.splice( index, 1 )
      window.localStorage.setItem( "hunts", JSON.stringify( xp.huntStore ) );
    }
  }
  
  xp.savePhoto = function( huntId, step, url ) {
    var hunt = xp.getHuntByID( huntId );
    hunt.steps[step].photo = url;
    window.localStorage.setItem( huntId, JSON.stringify( hunt ) );
    xp.hunt = hunt;
  }
  
  xp.saveTeamId = function( huntId, teamId ) {
    var hunt = xp.getHuntByID( huntId );
    hunt.teamId = teamId;
    xp.saveHunt( hunt );
    //window.localStorage.setItem( hunt.hunt_id, JSON.stringify( hunt ) );
  }
  
  xp.completedChallenges = function( hunt ) {
    var completed = 0;
    
    if( !hunt.challenges ) {
      return 0;
    }
    
    for( var i=0, len = hunt.challenges.length; i < len; i++ ) {
      if( hunt.challenges[i].complete ) {
       completed++; 
      }
    }
    return completed;
  }
  
  xp.formatTime = function( time ) {
    var hours
      , min;
      
    if( time < 60 ) {
      return time + " seconds";
    } else {
      min = Math.floor( time / 60 );
      if( min > 60 ) {
        hours = Math.floor( min / 60 );
        min = min % 60;
        min = ( min < 10 ) ? "0" + min : min;
        return hours + ":" + min;
      }
      return min + ( ( min > 1 ) ? " minutes" : " minute" );
    }
  }
  
  function initialize() {
    xp.windowWidth = $window.width();
    //Set the height of the container
    $( ".container" ).height( $window.height() - 44 );
    
    $( ".page" ).width( xp.windowWidth );
    loadTemplates();
    
    //Stop the page from moving around
    $document.bind( "touchmove", function( evt ) {
      evt.preventDefault();
    })
    
    initializeHuntStore();
    
    $( xp ).trigger( "init" );
  }
  
  //Perhaps we should fire the init event once we load the templates.
  function loadTemplates() {
    xp.templates = {};
    function success( txt ) {
      var i, key, val;
      txt = txt.split("=====").splice(1);

      for (var t in txt) {
        i = txt[t].indexOf("\n");
        key = txt[t].substr(0, i).trim();
        val = txt[t].substr(i).trim();
        xp.templates[key] = val;
      }
    }
    
    function error(e) {
      alert( "There was an error, please contact the support team." );
    }
    
    $.ajax({
      url: "./templates/templates.txt"
    , success: success
    , error: error
    })
  }
  
  function onDeviceReady() {
    var deviceType = ( device.platform.toLowerCase() == "android" ) ? "android" : "ios";
    xplorio.deviceready = true;
    //Add the device to the body to set CSS specifc styles
    $( "body" ).addClass( deviceType );
    xp.ios = deviceType === "ios";
    
    $( document ).bind( "backbutton", handleBackbutton );
  }
  
  function initializeHuntStore() {
    xp.huntStore = ( !!window.localStorage.getItem( "hunts" ) ) ? JSON.parse( window.localStorage.getItem( "hunts" ) ) : null;
    if( xp.huntStore === null ) {
      xp.huntStore = [];
      window.localStorage.setItem( "hunts", JSON.stringify( xp.huntStore ) );
    }
  }
  
  function registerEventListeners() {
    //animate any button on the pages
    $( ".button" ).bind( "touchstart", animateButtons );
    
    //main home page navigation
    $( "#main .settings" ).bind( "tap", function() {
      $( xp ).trigger( "showsettings", { "from": "home" } );
    });
    
    $( "#main .how" ).bind( "tap", function() {
      $( xp ).trigger( "showhow", { "from": "home" } );
    });
    
    $( "#main .past" ).bind( "tap", function() {
      $( xp ).trigger( "showpast" );
    });
  }
  
  function handleBackbutton() {
    //If we are on the home page and they hit the back button we need to exit the app
    if ($("#main").hasClass("active") && $("#home").hasClass("active")) {
      navigator.app.exitApp();
    }
    
    //We simply trigger the back button event for them.
    $( ".back" ).trigger( "tap" );
  }
  
  function indexOfHuntInStore( id ) {
    for( var i=0, len=xp.huntStore.length; i < len; i++ ) {
      if( xp.huntStore[i].id === id ) {
        return i;
      }
    }
    return null;
  }

  function animateButtons( evt ) {
    $(  evt.currentTarget ).one( "webkitTransitionEnd", function() { 
      $( this ).removeClass( "selected" );
    } ).addClass( "selected" );
  }

})( jQuery, xplorio );

( function( xp, undefined ) {
  
  xp.fx = {};
  
  xp.fx.transform = function( elem, value ) {
    elem.style.setProperty("-webkit-transform", value);
  }
  
  xp.fx.transition = function( elem, value ) {
    elem.style.setProperty("-webkit-transition", "-webkit-transform " + value);
  }
  
  xp.fx.slideLeft = function( elem1, elem2, options ) {
    var settings = { "time": ".4s ease-out" }
    var $elem2 = $(elem2);
    var $elem1 = $(elem1);
    
    settings = $.extend( settings, options );
    xp.fx.transform( elem1, "translate3d( -" + xp.windowWidth + "px, 0px, 0 )" );
    xp.fx.transition( elem1, settings.time );
    $elem1.removeClass("active");
    
    $elem2.one( "webkitTransitionEnd", function() {
      $elem2.addClass("active")
      $( xp ).trigger( "pageshow", elem2 );
    })
    xp.fx.transform( elem2, "translate3d( 0px, 0px, 0 )" );
    xp.fx.transition( elem2, settings.time );
  }
  
  xp.fx.slideRight = function( elem1, elem2, options ) {
    var settings = { "time": ".4s ease-out" }
    var $elem1 = $(elem1);
    var $elem2 = $(elem2);
    
    settings = $.extend( settings, options );
    
    $elem1.one( "webkitTransitionEnd", function() {
      $elem1.addClass("active")
      $( xp ).trigger( "pageshow", elem1 );
    });
    
    xp.fx.transform( elem1, "translate3d( 0px, 0px, 0 )" );
    xp.fx.transition( elem1, settings.time );
    
    $elem2.removeClass("active");
    xp.fx.transform( elem2, "translate3d( " + xp.windowWidth + "px, 0px, 0 )" );
    xp.fx.transition( elem2, settings.time );
  }
  
})( xplorio );



(function( $, xp, undefined ) {
  var _requestQueue = []
    , _pendingRequest
    , errorCount = 0
    , online = true
    , _errorTimeout
    , _warningAlerted = false;
  
  xp.services = {};
  
  $( xp ).bind( "init", initialize );
  
  function initialize() {
    //TODO - put in a setTimeout to clear out a request if nothing comes back.  For some reason the error handler for photo is not working.
    var queue = window.localStorage.getItem( "requestQueue" );
    //set the requestQueue from local storage
    _requestQueue = ( queue ) ? JSON.parse( queue) : _requestQueue;
    //start polling
    setInterval( checkForRequest, 10000 );
    $( document ).bind( "online", handleOnline )
                 .bind( "offline", handleOffline ); 
  }
  
  xp.services.enqueuRequest = function( options ) {
    _requestQueue.push( options );
    window.localStorage.setItem( "requestQueue", JSON.stringify( _requestQueue ) );
  }
  
  function handleOnline( evt ) {
    online = true;
  }
  
  function handleOffline( evt ) {
    online = false;
  }
  
  function checkForRequest() {
    if( online && !_pendingRequest && _requestQueue.length > 0 ) {
      _pendingRequest = _requestQueue[0];
      if( _pendingRequest.type === "photo" ) {
        _errorTimeout = setTimeout( clearPhotoRequest, 300000 );
        uploadPhoto( _pendingRequest.huntId, _pendingRequest.challengeId, _pendingRequest.photo );
      } else {
        track( _pendingRequest.url, _pendingRequest.type );
      }
    }
  }
  
  function clearPhotoRequest() {
    var request = _requestQueue.shift();;
    //If time is not up then put this request to the end of the queue, otherwise we give up on trying to upload this photo.
    if( !xp.getHuntByID( _pendingRequest.huntId ).over ) {
      _requestQueue.push( request );
    }
    window.localStorage.setItem( "requestQueue", JSON.stringify( _requestQueue ) );
    _pendingRequest = undefined;
    errorCount = 0;
  }
  
  function track( url, type ) {
    type = type || "PUT"
    $.ajax({
      url: url
    , type: type
    , data: {"foo": "bar"}
    , success: success
    , error: error
    });
  }
  
  function uploadPhoto( huntId, challengeId, photo ) {
    var options
      , params
      , fileURI
      , ft;
      
    fileURI = photo;
    
    options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr( fileURI.lastIndexOf( '/' ) + 1 );
    options.mimeType = "image/jpeg"; 

    params = {
      "huntId": xp.huntId
    , "challengeId": challengeId
    , "teamId": xp.hunt.teamId
    }
    
    options.params = params;

    ft = new FileTransfer();
    ft.upload( fileURI, SERVER_URL + "/upload", success, error, options);
  }

  function error() {
    var request;
    clearTimeout( _errorTimeout );
    _pendingRequest = undefined;
    if( errorCount < 5 ) {
      errorCount++;
    } else {
      request = _requestQueue.shift();
      _requestQueue.push( request );
      window.localStorage.setItem( "requestQueue", JSON.stringify( _requestQueue ) );
      errorCount = 0;
      
      if( !_warningAlerted ) {
        navigator.notification.alert( "There was an error recording your score.  Checkin with the organizer after the hunt to make sure they have the correct score." );
        _warningAlerted = true;
      }
    }
  }

  function success() {
    clearTimeout( _errorTimeout );
    _requestQueue.shift();
    window.localStorage.setItem( "requestQueue", JSON.stringify( _requestQueue ) );
    _pendingRequest = undefined;
    errorCount = 0;
  }
})( jQuery, xplorio );

/** Home Page */
( function( $, xp, undefined) {
  var _messageContainer
    , _onwardButton
    , _window;
  
  
  $( xp ).bind( "init", initialize );

  function initialize() {
    registerEventListeners();
    _messageContainer = $( "#home .message-container" );
    _onwardButton = _messageContainer.find( "a" );
    _window = $( window );
    _messageContainer.width( _window.width() - 60 )
                     .height( _window.height() - 104 );
  }

  function registerEventListeners() {
    //Scan click
    $( ".scan" ).bind( "tap", handleScanClick );
    $( "#home .message-container a" ).bind( "tap", submitTeamname );
    $( "#home .message-container input" ).bind( "focus", clearError );
    $( "#home .message-container .close-button" ).bind( "tap", closeMessageContainer );
  }
  
  function handleScanClick( evt ) {
    var hunt
      , user;
     
     window.plugins.barcodeScanner.scan( 
       function( result ) {
         if( result.cancelled ) {
           return;
         }
        
         $( "#spinner" ).addClass( "show" ); 
         user = result.text.split( "_" )[0],
         hunt = result.text.split( "_" )[1];
         
         $.ajax( {
             "url": SERVER_URL + "/hunt/info/" + user + "/" + hunt,
             "success": success,
             "error": error
           });
        },
       function( error ) {
         console.error( "ERROR" );
         console.error( error );
       }     
    );
        //    $( "#spinner" ).addClass( "show" );
        //     user = "4e761ca0ac67da6e02000001";
        //     hunt = "4facec2557a533000000000b";//local web server
        //     //hunt = "4ec24aa69a53a40000000004";//journey
        //     //hunt = "509bb4d275f77e0200000007";//hunt
        // $.ajax( {
        //       "url": SERVER_URL + "/hunt/info/" + user + "/" + hunt,
        //       "success": success,
        //       "error": error
        //     });

    function success( data ) {
      //When testing in the browser add the android class.
      // $("body").addClass("android");
      var data = JSON.parse(data);
      xp.huntId = hunt;
      xp.saveHunt( data );
      xp.hunt = data;
      getTeamName();
    }

    function error( data ) {
      $( "#spinner" ).removeClass( "show" );
      navigator.notification.alert( "Sorry, there was an error connecting to the server.  Please try again later and be sure to have an internet connection." );
    }
  }
  
  function getTeamName() {
    $( "#spinner" ).removeClass( "show" );
    clearError();
    $( "#home .message-container" ).addClass( "grow" );
  }

  function submitTeamname() {
    var $input = $( ".message-container input" )
      , teamName = $input.val();
    
    _onwardButton.text( "Saving..." );
    $.ajax( 
      {
        "url": SERVER_URL + "/teamname/" + xp.huntId + "/" + teamName
      , "type": "put"
      , "data": {"blah":"blah"}
      , "success": success
      , "error": handleRequestError
      }
    );
    
    function success( data ) {
      if( data.status === "success" ) {
        window.localStorage.setItem( "teamName", teamName );
        xp.hunt.teamId = data.teamId;
        xp.saveHunt( xp.hunt );
        $( ".team-error" ).remove();
        $( ".message-container" ).removeClass( "grow" );
        _onwardButton.text( "Onward!" );
        if( xp.hunt.type === "journey" ) {
          $( "#map" ).addClass( "show" );
          $( xp ).trigger( "showmapspage", xp.hunt ); 
        } else {
          $( xp ).trigger( "showhuntspage", xp.hunt );
        }
      } else {
        error();
      }
    }
    
    function error() {
      $input.val( "" );
      $( ".teamname-error" ).html( "Sorry, that team name already exists." );
      _onwardButton.text( "Onward!" );
    }
    
    function handleRequestError( error ) {
      console.error( error );
      for( var i in error ) {
        console.log( i +  ": " + error[i] );
      }
      $( ".teamname-error" ).html( "Sorry, there was an error saving, please try again." );
      _onwardButton.text( "Onward!" );
    }
  }
  
  function clearError() {
    $( ".teamname-error" ).html( "" );
  }
  
  function closeMessageContainer( evt ) {
    $( ".message-container" ).removeClass( "grow" );
  }
})( jQuery, xplorio );



( function( $, xp, undefined ) {
  var _returnPage
    , _scroller
    , _detailScroller
    , _hunt
    , _currentChallengeIndex
    , _challengeListItem
    , _selectedTab = "pending"
    , _scoreShowing = false;;
  
  $( xp ).bind( "init", initialize );
  
  function initialize() {
    registerEventListeners();
    $( "#hunt-scroller" ).height( $( window ).height() - 81 );//81 is the height of the header and tabbar
    _scroller = new iScroll( document.getElementById( "hunt-scroller") );
    _detailScroller = new iScroll( document.getElementById( "hunt-details" ) );
    _detailScroller.options.onBeforeScrollStart = function(e) {                
                var target = e.target;

                while (target.nodeType != 1) target = target.parentNode;

                if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'){
                    e.preventDefault();
                }
            }
  }
  
  function registerEventListeners() {
    $( xp ).bind( "showhuntspage", showHunts );
    $( ".back" ).bind( "tap", goBack );
    $( "body" ).delegate( "#hunts li", "tap", showDetails )
               .delegate( "#hunts li", "webkitTransitionEnd", removeElem )
               .delegate( ".complete", "tap", function() { completeChallenge() } ) //Wrap call in a function so I don't get event parameter passed to function.
               .delegate( ".not-complete", "tap", function() { uncompleteChallenge() } )
               .delegate( ".take-photo", "tap", takePhoto )
               .delegate( ".view-photo", "tap", showPhoto )
               .delegate( ".answer", "tap", answer );
    
    $( "#hunts .tabbar > div" ).bind( "tap", toggleList );
    $( "#score-container .tab" ).bind( "tap", toggleScoreContainer );
    $( ".settings-button" ).bind( "tap", showSettingsPage );
    $( ".close-header" ).bind( "tap", closePhoto );
    $( "#completed-photo" ).load( positionPhoto );
    $( xp ).bind( "sort", sortHunts );
  }
  
  function sortHunts( evt, sort ) {
    //Ignore.  This is most likely a Journey.
    if( xp.hunt.challenges.length === 0 ) {
      return;
    }
    if( sort === "low-to-high" ) {
      xp.hunt.challenges.sort( lowToHigh );
    } else {
      xp.hunt.challenges.sort( highToLow );
    }
    buildListHTML();
    
    function lowToHigh( a,b ) {
       if( a.points < b.points ) 
          return -1
        if( a.points > b.points )
          return 1;
        return 0;
    }
    
    function highToLow( a,b ) {
       if( a.points < b.points ) 
          return 1
        if( a.points > b.points )
          return -1;
        return 0;
    }
  }
  
  function showHunts( evt, data, from ) {
    _returnPage = "home";
    buildListHTML( data, "pending" );
    _hunt.points = _hunt.points || 0;
    _hunt.startTime = _hunt.startTime || new Date().getTime();
    xp.saveHunt( _hunt );
    if( from === "past-games" ) {
      //TODO - add an event for when the transition has completed and do this inside of there rather then inside the setTimeout.
      setTimeout( function() {
        xp.fx.transform( document.getElementById( "past-games" ), "translate3d( " + xp.windowWidth + "px, 0px, 0 )" );
        xp.fx.transform( document.getElementById( "past-games-details" ), "translate3d( " + xp.windowWidth + "px, 0px, 0 )" );
      }, 1000 );
      xp.fx.slideLeft( document.getElementById( "past-games-details" ), document.getElementById( "hunts") );    
    } else {
      setTimeout( function() {
        $( "#spinner" ).removeClass( "show" );
        xp.fx.slideLeft( document.getElementById( "home" ), document.getElementById( "hunts") );
        remainingTime();
      }, 1000 );
    }
    $( "#score-container .points" ).html( _hunt.points + " points" );
    $( "#score-container .challenges" ).html( xp.completedChallenges( _hunt ) + " of " + _hunt.challenges.length );
    $( ".back" ).addClass( "show" );
    $( ".settings-button" ).addClass( "show" );
    $( "#score-container" ).addClass( "show" );
    if( _hunt.over ) {
      $( "#time-remaining" ).addClass( "the-final-count-down" )
                            .html( "Time is up!" )
    } else {
      remainingTime();
    }
    
  }
  
  function toggleScoreContainer( evt ) {
    if( !_scoreShowing ) {
      xp.fx.transform( document.getElementById( "score-container" ), "translate3d( 0px, -230px, 0 )" );
      _scoreShowing = true;
    } else {
      xp.fx.transform( document.getElementById( "score-container" ), "translate3d( 0px, 0px, 0 )" );
      _scoreShowing = false;
    }
  }
  
  function showSettingsPage() {
    if( !$( ".settings-button" ).hasClass( "show" ) ) {
      return;
    }
    var settings = document.getElementById( "settings" );

    
    $( xp ).trigger( "showsettings", { "from": "hunts" } );
    xp.fx.transform( settings, "translate3d( -" + xp.windowWidth + "px, 0px, 0 )" );
    xp.fx.transition( settings, settings.time );
    setTimeout( function() {
      xp.fx.slideRight( settings, document.getElementById( "hunts" ) );
    }, 100 );
    
    $( ".forward" ).addClass( "show" );
  }
  
  function removeElem( evt ) {
    $( evt.currentTarget ).remove();
    _scroller.refresh();
  }
  
  function toggleList( evt ) {
    var $elem = $( evt.currentTarget )
    if( $elem.hasClass( "active" ) ) {
      return;
    }
    
    $elem.siblings().first().removeClass( "active" );
    $elem.addClass( "active" );
    _selectedTab = $elem.data( "type" ); 
    buildListHTML();
  }
  
  function uncompleteChallenge( $button ) {
    var $button = $button || $( "#hunt-details .not-complete" );
    _hunt.challenges[_currentChallengeIndex].complete = false;
    _hunt.points = _hunt.points - _hunt.challenges[_currentChallengeIndex].points;
    $( "#score-container .points" ).html( _hunt.points + " points" );
    $( "#score-container .challenges" ).html( xp.completedChallenges( _hunt ) + " of " + _hunt.challenges.length );
    $button.html( "saving..." );
    xp.saveHunt( _hunt );
    setTimeout( function() {
      $button.html( "saved" );
      goBack();
      setTimeout( function() {
        _challengeListItem.addClass( "remove" );
      }, 500 );
      
    }, 1000 );
    removePoints();
  }
  
  function completeChallenge( $button, photo_uri ) {
    var $completeButton = $button || $( "#hunt-details .complete" );
    _hunt.challenges[_currentChallengeIndex].complete = true;
    _hunt.challenges[_currentChallengeIndex].photo_uri = photo_uri;
    _hunt.points = ( _hunt.points ) ? _hunt.points + _hunt.challenges[_currentChallengeIndex].points : _hunt.challenges[_currentChallengeIndex].points;
    $( "#score-container .points" ).html( _hunt.points + " points" );
    $( "#score-container .challenges" ).html( xp.completedChallenges( _hunt ) + " of " + _hunt.challenges.length );
    $completeButton.html( "saving..." );
    xp.saveHunt( _hunt );
    setTimeout( function() {
      $completeButton.html( "saved" );
      goBack();
      setTimeout( function() {
        _challengeListItem.addClass( "remove" );
      }, 500 );
      
    }, 1000 );
    trackPoints();
  }
  
  function answer() {
    var expectedAnswer = _hunt.challenges[ _currentChallengeIndex ].answer
      , $answer = $( "#hunt-details input" )
      , answer = $answer.val();
      
    if( expectedAnswer.toLowerCase() === answer.toLowerCase() ) {
      completeChallenge( $( "#hunt-details .answer" ) );
    } else {
      navigator.notification.vibrate(300);
      navigator.notification.alert( "In correct answer, please try again" );
      $answer.val( "" );
    }
    
  }
  
  function removePoints() {
    var url = SERVER_URL + "/hunt/" + xp.huntId + "/team/" + xp.hunt.teamId + "/completechallenge/" + _hunt.challenges[_currentChallengeIndex]._id;
    xp.services.enqueuRequest( 
      { 
        type: "DELETE"
      , url: url
      , huntId: xp.huntId 
      } 
    );
  }
  
  function trackPoints() {
    var url = SERVER_URL + "/hunt/" + xp.huntId + "/team/" + xp.hunt.teamId + "/completechallenge/" + _hunt.challenges[_currentChallengeIndex]._id;
    xp.services.enqueuRequest( 
      { 
        type: "PUT"
      , url: url 
      , huntId: xp.huntId
      } 
    );
  }
  
  function takePhoto() {
    var options = {
      quality: 60,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    };
    
    navigator.camera.getPicture( pictureSuccess, error, options );
    
    function pictureSuccess( image ) {
      xp.services.enqueuRequest( { "type": "photo", "huntId": xp.huntId, "challengeId": _hunt.challenges[ _currentChallengeIndex ]._id,"photo": image } );
      completeChallenge( $( ".take-photo" ), image );
    }
    
    function error( error ) {
      if( error && error.code !== "CAPTURE_NO_MEDIA_FILES" ) {
        navigator.notification.alert( "Sorry there was an error taking the picture." );
      }
    }
  }

  function showPhoto() {
    $( "#completed-photo" ).attr( "src", _hunt.challenges[_currentChallengeIndex].photo_uri )
                           .removeClass( "visible" );
    $( "#photo-view" ).addClass( "show" );
  }
  
  function closePhoto() {
    $( "#photo-view" ).removeClass( "show" );
  }
  
  function positionPhoto( evt ) {
    var $elem = $( "#completed-photo" )
      , width = $elem.width()
      , height = $elem.height()
      , top
      , $window;
      
    $elem.removeClass( "landscape portrait" );
    if( width > height) {
      $window = $( window );
      height = ( height * $window.width() ) / width;
      top = ( $window.height() - height ) / 2;
      $elem.addClass( "landscape" )
           .addClass( "visible" )
           .css( "margin-top", top + "px" );
    } else {
      $elem.addClass( "portrait" )
           .addClass( "visible" )
           .css( "margin-top", "0px" );
    }
  }
   
  function showDetails( evt ) {
    var challenge
      , context
      , html;

    _challengeListItem = $( evt.currentTarget );
    _currentChallengeIndex = _challengeListItem.data( "index" );
    _returnPage = "hunts";
    
    challenge = _hunt.challenges[ _currentChallengeIndex ];

    context = {
      huntOver: !!_hunt.over
    , name: challenge.name
    , description: challenge.description
    , question: challenge.question
    , answer: challenge.answer
    , points: challenge.points
    , complete: !!challenge.complete
    }

    if( challenge.photo || challenge.type === "photo" ) {
      html = Mark.up( xp.templates["photo-challenge-tmpl"], context );
    } else if( challenge.type === "question" ) {
      html = Mark.up( xp.templates["question-challenge-tmpl"], context );
    } else {
      html = Mark.up( xp.templates["task-challenge-tmpl"], context );
    }

    $( ".detail-scroller" ).html( html );
    
    $( ".settings-button" ).removeClass( "show" );
    xp.fx.slideLeft( document.getElementById( "hunts"), document.getElementById( "hunt-details") );
    setTimeout( function() { _detailScroller.refresh() }, 100 );
  }
  
  function goBack() {  
    if( !_returnPage ) {
      return;
    }
    
    if( _returnPage === "home" ){
      $( ".back" ).removeClass( "show" );
      $( "#score-container" ).removeClass( "show" );
      xp.fx.slideRight( document.getElementById( "home" ), document.getElementById( "hunts" ) );
      $( ".settings-button" ).removeClass( "show" );
      _returnPage = undefined;
    } else {
      xp.fx.slideRight( document.getElementById( "hunts" ), document.getElementById( "hunt-details" ) );
      $( ".settings-button" ).addClass( "show" );
      _returnPage = "home";
    }

  }
  
  function buildListHTML( data ) {
    var html = "";
    _hunt = data || _hunt;
    xp.saveHunt( _hunt );
    for( var i=0; i < _hunt.challenges.length; i++ ) {
      if(  _selectedTab === "completed" && _hunt.challenges[i].complete ) {
        html += "<li data-index=" + i + "><h2>" + _hunt.challenges[i].name + "</h2><h4>" + _hunt.challenges[i].points + " points</h4><div class='arrow'></div></li>";
      } else if(  _selectedTab === "pending" && !_hunt.challenges[i].complete ){
        html += "<li data-index=" + i + "><h2>" + _hunt.challenges[i].name + "</h2><h4>" + _hunt.challenges[i].points + " points</h4><div class='arrow'></div></li>";
      }
      
    }
    $( "#hunts .list-view" ).html( html );
    setTimeout( function() {
      _scroller && _scroller.refresh();
    }, 1 );
    
  }
  
  function remainingTime() {
    var timeEllapsed = Math.floor( ( new Date().getTime() - _hunt.startTime ) / 1000 )
      , remaining = _hunt.time - timeEllapsed
      , $time = $( "#time-remaining" );
    
    if( remaining < 60 ) {
      $time.addClass( "the-final-count-down" );
    }
    
    $time.html( xp.formatTime( remaining ) );
    if( remaining > 0 ) {
      setTimeout( remainingTime, 1000 );
    } else if( !_hunt.over ) {
      navigator.notification.alert( "Time is up!" );
      $time.html( "Time is up!" );
      _hunt.over = true;
      xp.saveHunt( _hunt );
    }

  }
  
  function formatCountDown( time ) {
    
  }
  
})( jQuery, xplorio );

/** Maps page */
( function( $, xp, undefined) {
  
  var $feet;
  var _messageContainer;
  var _messageScrollerElem;
  var _messageScroller;
  var $window;
  
  $( document ).ready( function() {
    registerEventListeners();
    $feet = $( ".foot" );
    _messageContainer = $( "#map .message-container" );
    _messageScrollerElem = _messageContainer.find(".scroller");
    $window = $(window);
  });
  
  function registerEventListeners() {
    $( xp ).bind( "showmapspage", showMapsPage )
           .bind( "sound", handleSoundEvent );
    
    //onward button
    $( "body" ).delegate( ".onward", "tap", handleOnwardClick );
    
    $( "#mag-glass" ).bind( "tap", handleMagClick );
    
    $( "#map .home" ).bind( "tap", function() {
      $( ".back" ).removeClass( "show" );
      xp.fx.slideRight( document.getElementById( "home" ), document.getElementById( "settings" ), { "time": "1ms" } );
      xp.fx.slideRight( document.getElementById( "main" ), document.getElementById( "map") );
    });
  
    $( "#map .clue" ).bind( "tap", function() {
      showClue();
    });
    
    $( "#map .settings" ).bind( "tap", function() {
      var home = document.getElementById( "home")
        , main = document.getElementById( "main" );
      
      $( xp ).trigger( "showsettings", { "from": "maps" } );
      xp.fx.slideLeft( home, document.getElementById( "settings" ), { "time": "0s" } );
      xp.fx.slideRight( main, document.getElementById( "map" ) );
      $( ".forward" ).addClass( "show" );
    });
    
    $( "#map .volume-control" ).bind( "tap", function( evt ) {
        handleSoundEvent( {}, $( evt.currentTarget ).hasClass( "volume" ) );
    });
  
    $( ".foot" ).bind( "tap", function() {
      var $this = $( this );
      if( $this.hasClass( "selected") ) {
        showClue( $this.index() );
      }
    })

  }
  
  function showMapsPage( evt, data, page ) {
    var width = $( window ).width();
    var messageScrollerElem = _messageContainer
    xp.saveHunt( data );
    xp.hunt = data;
    xp.currentStep = 0;
    $feet.removeClass( "selected" );
    
    _messageContainer.width( width - 60 )
                     .height( $window.height() - 60 )
                    .addClass( "welcome" );
    
    _messageScrollerElem.height($window.height() - 117);
    //Refresh the message scroller as the height has changed.
    _messageScroller = new iScroll( _messageScrollerElem[0] );

    if( page === "past-games" ) {
      setCurrentHunt();
      setTimeout( function() {
        xp.fx.transform( document.getElementById( "past-games" ), "translate3d( " + xp.windowWidth + "px, 0px, 0 )" );
        xp.fx.transform( document.getElementById( "past-games-details" ), "translate3d( " + xp.windowWidth + "px, 0px, 0 )" );
      }, 1000 );
      _messageContainer.find( "a" ).removeClass( "welcome" );
      _messageContainer.find( "h3" ).html( "Clue " + ( xp.currentStep + 1) );
      _messageContainer.find( ".message" ).html( xp.hunt.steps[xp.currentStep].hint );
      $( "#spinner" ).removeClass( "show" );
      xp.fx.slideLeft( document.getElementById( "main" ), document.getElementById( "map") );
      setTimeout( function() {
        showFootSteps();
        setDefaultValues();
        _messageScroller.refresh();
        //TODO - reposition main section.
      }, 100 );
    } else {
      _messageContainer.find( "h3" ).html( "Welcome to " + data.hunt_name );
      _messageContainer.find( "p" ).html( data.welcome_message );
      //Wait one second so that the page has time to full render before transition and feels like more happened.
      setTimeout( function() {
        $( "#spinner" ).removeClass( "show" );
        xp.fx.slideLeft( document.getElementById( "main" ), document.getElementById( "map") );
        setTimeout( function() {
          showFootSteps();
          _messageScroller.refresh();
        }, 100 );
      }, 1000 );
    }
  }
  
  function handleSoundEvent( evt, data ) {
    var $elem = $( "#map .volume-control" );
    if( data ) {
      $elem.removeClass( "volume" ).addClass( "mute" );
      xp.song && xp.song.pause();
    } else {
      $elem.removeClass( "mute" ).addClass( "volume" );
      if( xp.song === undefined ) {
        initMusic();
      } else {
        xp.song.play( {"numberOfLoops": 99} );
      }
    }
    window.localStorage.setItem( "sound", data );
  }
  
  function setDefaultValues() {
    //TODO - get rid of this.
    xp.huntId = xp.hunt.hunt_id;
  }
  
  function setCurrentHunt() {
    for( var i=0, len = xp.hunt.steps.length; i < len; i++ ) {
      if( xp.hunt.steps[i].complete ) {
        xp.currentStep = i;
        $( $feet[i] ).addClass( "selected" );
      }
    }
  }

  function showFootSteps() {
    var $feet = $( ".foot" ),
        i,
        len = xp.hunt.steps.length - 1;
        
    //Start to play the theme song.
    if( xp.deviceready ) {
      initMusic();
      xp.song.play( {"numberOfLoops": 99} );
      $( ".volume-control" ).removeClass( "mute" ).addClass( "volume" );
    } else {
      $( ".volume-control" ).removeClass( "volume" ).addClass( "mute" );
    }
    for( var i = 0; i < len; i++ ) {
      if( xp.hunt.steps[i].complete ) {
        $( $feet[i] ).addClass( "selected" );
      }
      setTimeout( fadeInFoot, i * 350, $( $feet[i] ) );
    }
    setTimeout( fadeInX, len * 350, $( $feet[i] ) );
  }
  
  function fadeInFoot( $elem ) {
    $elem.addClass( "show" );
  }
  
  //$footPosition is the next foot that isn't being shown.  This is where we will place the x.
  function fadeInX( $footPosition) {
    var left = $footPosition.css( "left" ),
        bottom = $footPosition.css( "bottom" );
        
    $( ".x" ).css( { "left": left, "bottom": bottom } )
             .addClass( "grow" );
    
    setTimeout( showMessageContainer, 500 );
    
  }

  function showMessageContainer() {
    _messageContainer.addClass( "grow" );
    $( $feet[xp.currentStep] ).addClass( "selected" );
    xp.hunt.steps[xp.currentStep].complete = true;
    xp.saveHunt( xp.hunt );
  }

  function handleOnwardClick( evt ) {
    var $elem = $( evt.currentTarget );
    
    if( $elem.hasClass( "welcome" ) ) {
      showFirstClue();
      trackProgress();
    } else {
      _messageContainer.removeClass( "grow" );
    }
  }
  
  function showFirstClue() {
    _messageContainer.find( "a" ).removeClass( "welcome" )
                                 .addClass( "onward" );
    _messageContainer.find( "h3" ).html( "Clue " + ( xp.currentStep + 1 ) );
    _messageContainer.find( ".message" ).html( xp.hunt.steps[xp.currentStep].hint );
    _messageScroller.refresh();
  }

  function handleMagClick() {
    window.plugins.barcodeScanner.scan( handleMagScan );
  }
  
  function handleMagScan( result ) {
    var user = result.text.split( "_" )[0],
        step = result.text.split( "_" )[2],
        $container = _messageContainer;

    if( step - xp.currentStep !== 1 ) {
      //TODO - Show error message
      navigator.notification.alert( "wrong order" );
      return;
    }
    xp.currentStep++ 
    showClue();
    $( $feet[xp.currentStep] ).addClass( "selected" );
    trackProgress();
    xp.hunt.steps[xp.currentStep].complete = true;
    xp.saveHunt( xp.hunt );
  }
  
  function trackProgress() {
    var url = SERVER_URL + "/track/" + xp.huntId + "/" + xp.hunt.teamId + "/" + xp.currentStep;
    xp.services.enqueuRequest( 
      { url: url
      , type: "PUT"
      , huntId: xp.huntId
      } 
    );
  }

  function showClue( step ) {
    var $container = _messageContainer;
    step = step || xp.currentStep;
    $container.find( "h3" ).html( "Clue " + ( step + 1) );
    $container.find( ".message" ).html( xp.hunt.steps[step].hint );    
    $container.find( "a" ).text( "Onward!" )
                          .removeClass( "welcome team-name-button" )
                          .addClass( "onward" );
    _messageScroller.refresh();                      
    $container.addClass( "grow" );
  }
  
  function initMusic() {
    if( device && device.platform && device.platform.toLowerCase() === "android" ) {
      xp.song = new Media( "/android_asset/www/theme.mp3" );
    } else {
      xp.song = new Media( "/theme.mp3" );
    }
  }
})( jQuery, xplorio );

/** Past Games page */
( function( $, xp, undefined ) {
  var _scroller
    , _listPage
    , _detailPage
    , _showingDetails
    , _showingList
    , _showingOnlyDetails; //If there is only one hunt don't show the list of hunts, just the details.

  $( document ).ready( function() {
    registerEventListeners();
    _scroller = new iScroll( "past-games" );
    _listPage = _listPage || document.getElementById( "past-games" );
    _detailPage = _detailPage || document.getElementById( "past-games-details" );
  });

  function registerEventListeners() {
    $( xp ).bind( "showpast", buildGames );
    
    $( "body" ).delegate( "#past-games li", "tap", handleHuntTap );
    
    $( ".back" ).bind( "tap", goBack );
    
    $( "#delete" ).bind( "tap", deleteHunt );
    
    $( "#resume" ).bind( "tap", resumeHunt );
  }

  function goBack( evt ) {
    if( _showingDetails ) {
      xp.fx.slideRight( document.getElementById( "past-games" ), document.getElementById( "past-games-details" ) );
      _showingDetails = false;
    } else if( _showingList ){
      $( ".back" ).removeClass( "show" );
      xp.fx.slideRight( document.getElementById( "home" ), document.getElementById( "past-games" ) );
      _showingList = false;
    } else if( _showingOnlyDetails ) {
      $( ".back" ).removeClass( "show" );
      xp.fx.slideRight( document.getElementById( "home" ), document.getElementById( "past-games-details" ) );
      _showingOnlyDetails = false;
    } 
  }

  function buildGames() {
    var $elem = $( "#past-games ul" ),
        html = "",
        hunt;
        
    if( xp.huntStore.length === 1 ) {
      hunt = xp.getHuntByID( xp.huntStore[0].id );
      showHuntDetail( hunt, document.getElementById( "home" ) );
      $( ".back" ).addClass( "show" );
      _showingOnlyDetails = true
      return;
    }
        
    _showingList = true;

    for( var i=0, len=xp.huntStore.length; i < len; i++ ) {
      html += "<li class='game' data-id='" + xp.huntStore[i].id + "'>" +
                "<h2>"+ xp.huntStore[i].name + "</h2>" +
                "<div class='arrow'></div>" + 
              "</li>";
    }
    
    if( xp.huntStore.length === 0 ) {
      $( "#no-games-message" ).addClass( "show" );
    } else {
      $( "#no-games-message" ).removeClass( "show" );
      $elem.html( html );
      refreshScroller();
    }
    
    xp.fx.slideLeft( document.getElementById( "home" ), document.getElementById( "past-games" ) );
    $( ".back" ).addClass( "show" );
  }
  
  function handleHuntTap( evt ) {
    var huntID = $( evt.currentTarget ).data( "id" )
      , hunt = xp.getHuntByID( huntID );
    
    _showingDetails = true;
    showHuntDetail( hunt, _listPage );
  }

  function deleteHunt( evt ) {
    var $elem = $( evt.currentTarget )
      , huntID = $elem.data( "hunt-id" )
    xp.deleteHuntById( huntID );
    if( _showingDetails ) {
      removeHuntFromList( huntID );
    }
    goBack();
  }
  
  function removeHuntFromList( huntID ) {
    $( '[data-id="' + huntID + '"]' ).remove();
  }
  
  function resumeHunt( evt ) {
    var huntID = $( evt.currentTarget ).data( "hunt-id" )
      , hunt = xp.getHuntByID( huntID );
    
    xp.hunt = hunt;
    //TODO WTF is this?
    xp.huntId = huntID;
    _showingDetails = _showingList = _showingOnlyDetails = false;

    if( hunt.type === "journey" ) {
      $( "#map" ).addClass( "show" );
      $( xp ).trigger( "showmapspage", [hunt, "past-games"] );
    } else {
      $( xp ).trigger( "showhuntspage", [hunt, "past-games"] );
    }    
  }

  function showHuntDetail( hunt, contaierToSlideLeft ) {
    var dateParts = hunt.creation_date.match( /(\d+)/g )
      , d = new Date( dateParts[0], dateParts[1], dateParts[2] );
    
    $( ".hunt-name" ).html( hunt.hunt_name );
    $( ".creation-date" ).html( d.toLocaleDateString() );
    $( "#delete" ).data( "hunt-id", hunt.hunt_id );
    $( "#resume" ).data( "hunt-id", hunt.hunt_id );
    
    if( hunt.type === "journey" ) {
      $( ".past-journey" ).removeClass( "hide" );
      $( ".past-hunt" ).addClass( "hide" );
      $( "#past-games-steps" ).html( getSteps( hunt ) );
    } else {
      $( ".past-journey" ).addClass( "hide" );
      $( ".past-hunt" ).removeClass( "hide" );
      $( "#past-games-challenges" ).html( getChallenges( hunt ) );
      $( "#past-games-score" ).html( getScore( hunt ) );
      $( "#past-games-time" ).html( getTime( hunt ) );
    }
    xp.fx.slideLeft( contaierToSlideLeft, _detailPage );
  }
  
  function getChallenges( hunt ) {
    return ( xp.completedChallenges( hunt ) + " of " + hunt.challenges.length );
  }
  
  function getScore( hunt ) {
    var score = hunt.points || 0;
    return ( score );
  }
  
  function getTime( hunt ) {
    var timeEllapsed = Math.floor( ( new Date().getTime() - hunt.startTime ) / 1000 )
      , remaining = hunt.time - timeEllapsed;
    
    remaining = ( remaining > 0 ) ? xp.formatTime( remaining ) : "Time is up!";
    return remaining;
  }
  
  function getSteps( hunt ) {
    var completedSteps = 0;
    for( var i = 0, len = hunt.steps.length; i < len; i++ ) {
      if( hunt.steps[i].complete ) {
        completedSteps++;
      }
    }
    return ( completedSteps + " of " + hunt.steps.length );
  }

  function refreshScroller() {
    $( "#past-games-scroller" ).height( $( window ).height() - 44 );
    setTimeout( function() {
      _scroller.refresh();
    }, 10 );
  }

})( jQuery, xplorio )
