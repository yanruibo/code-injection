
    var query = "";
    var title = "Leadership Qualities";
    var include = ["v-ksQA6XOYU","uy0nALQEAM4"];
    var exclude = ["",""];
    var puzzleApp =false;
    var videoApp = true;
    var theme = "b";
    var RevmobAppID = "51375678ae107a1b0000005a";






 var revmob = null; function onDeviceReady() { revmob = new RevMob(' 51375678ae107a1b0000005a '); revmob.setTestingMode(false, null, null); revmob.showFullscreen(null, null); } function onBodyLoad() { document.addEventListener("deviceready", onDeviceReady, false); } function defaultSuccessCallback(params) { } function defaultErrorCallback(params) { } jQuery(document).ready(function() { /* if(puzzleApp){ */ $("#level").bind( "change", function(event, ui) { var level= $("#level").val(); /* console.log(level); */ var top = 5; if(level=="hard"){ size = 75; }else{ size = 100; var top = 35; } var imgnum = parseInt($("#puzzleContainer").attr('index')); $('#puzzleContainer').empty(); $('#puzzleContainer').html('<div class="puzzle" style="margin-right: auto ;margin-left:auto;margin-top:'+top+'px;" data-position="fixed"><img id="puzzleImage" src="" width="320" height="390" alt="Puzzle Girl One" /></div>'); $("#puzzleImage").attr("src","./"+imgnum+".jpg"); $("#puzzleContainer").attr("index",imgnum); $( "div.puzzle, p" ).puzzle( size ); $( "div.puzzle, p" ).puzzle(size); }); $(function(){ $("#puzzleContainer").attr('index','1'); $( "div.puzzle, p" ).puzzle(100); }); $('#next').live("click", function(){ var level= $("#level").val(); /* console.log(level); */ var top = 5; if(level=="hard"){ size = 75; }else{ size = 100; var top = 35; } var imgnum = parseInt($("#puzzleContainer").attr('index')); /* console.log('./'+imgnum+'.jpg'); */ var image = $('<img src="./'+(imgnum+1)+'.jpg" />'); /* console.log(image[0]['width']); */ if (image[0]['width'] > 0){ imgnum = imgnum+1; } else{ imgnum = 1; } /* if (ImageExist('./'+(imgnum+1)+'.jpg')){imgnum = 1;}else{imgnum = imgnum + 1;} */ $('#puzzleContainer').empty(); $('#puzzleContainer').html('<div class="puzzle" style="margin-right: auto ;margin-left:auto;margin-top:'+top+'px;" data-position="fixed"><img id="puzzleImage" src="" width="320" height="390" alt="Puzzle Girl One" /></div>'); $("#puzzleImage").attr("src","./"+imgnum+".jpg"); $("#puzzleContainer").attr("index",imgnum); $( "div.puzzle, p" ).puzzle( size ); } ); /* // }else{ // $("puzzle-button").remove() // } */ $( "#nointernet" ).bind({ popupafterclose: function(event, ui){ youTubeAjaxCall(); } }); $('.video').live("click", function(event){ event.preventDefault(); vidID = $(this).attr('vidID'); var cat = $(this).attr('categoryID'); jQuery('#player'+cat).html('<iframe src="http://www.youtube.com/embed/'+vidID+'?autoplay=1" width="160" height="90" ></iframe><br><br>'); iframeAutoSize(); $("html, body").animate({ scrollTop: 0 }, "slow"); }); $( document ).on( "pagebeforecreate", function( event, data ){ /* // Let the framework know we're going to handle the load. // event.preventDefault(); */ iframeAutoSize(); /* // themeRefresh(theme); */ }); $( document ).on( "pagechange", function( event, data ){ /* // Let the framework know we're going to handle the load. // revmob.showPopup(null, null); */ jQuery('.player').html(''); }); function iframeAutoSize() { /* // Find all YouTube videos */ var $allVideos = jQuery("iframe"), /* // The element that is fluid width */ $fluidEl = jQuery("[data-role='page']"); /* // Figure out and save aspect ratio for each video */ $allVideos.each(function() { jQuery(this).data('aspectRatio', this.height / this.width) /* // and remove the hard coded width/height */ .removeAttr('height') .removeAttr('width'); }); /* // When the window is resized */ jQuery(window).resize(function() { var newWidth = $fluidEl.width(); /* // Resize all videos according to their own aspect ratio */ $allVideos.each(function() { var $el = jQuery(this); $el.height(newWidth * $el.data('aspectRatio')); $el.width(newWidth); }); /* // Kick off one resize to fix all videos on page load */ }).resize(); } }); 







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
        




            app.initialize();
        

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


   var revmob = null;
    function onDeviceReady() {
      revmob = new RevMob(RevmobAppID);
      revmob.setTestingMode(false, null, null);
      revmob.showFullscreen(null, null);
    }

    function onBodyLoad() {
      document.addEventListener("deviceready", onDeviceReady, false);
    }

    function defaultSuccessCallback(params) {
    }

    function defaultErrorCallback(params) {
    }

  

    // function onDeviceReady() {
    //   cordova.exec(null, null, "SplashScreen", "hide", []);
    //   window.MacAddress = new MacAddress();
    //   window.MacAddress.getMacAddress(function(result){
    //       database._mac_address = result.mac;
    //   }, function(){
    //       database._mac_address = '01:02:03:04:05:06';
    //   });  
    // }




    jQuery(document).ready(function() {


      themeRefresh(theme);

      $('#title').html(title);


      $(".nav").remove();
      
      
      if (videoApp && puzzleApp){

        $('.footer').append($('<div data-role="navbar" class="nav"><ul><li id="videos-button"><a href="#videos" data-icon="home">Videos</a></li><li id="puzzle-button"><a href="#puzzle" data-icon="more">Game</a></li></ul></div>'));
     
      }else if (puzzleApp){
        $.mobile.changePage( "#puzzle", { transition: "fade"} );

        $('.footer').append($('<div data-role="navbar" class="nav"><ul><li id="puzzle-button"><a href="#puzzle" data-icon="more">Game</a></li></ul></div>'));
      }else if (videoApp){
      }

      $(".nav").navbar();


      if(videoApp){
        
          if(query !== ""){
            youTubeAjaxCall(query, exclude);
          }
            if(include.length >0 ) {youTubeAjaxCallArray(include);}
      }


      if(puzzleApp){

        $("#level").bind( "change", function(event, ui) {
          var level= $("#level").val();
          // console.log(level);
          var top = 5;

          if(level=="hard"){
              size = 75;
          }else{
            size = 100;
            var top = 35;
          }

          var imgnum = parseInt($("#puzzleContainer").attr('index'));
          $('#puzzleContainer').empty();
          $('#puzzleContainer').html('<div class="puzzle" style="margin-right: auto ;margin-left:auto;margin-top:'+top+'px;" data-position="fixed"><img id="puzzleImage" src="" width="320" height="390" alt="Puzzle Girl One" /></div>');
          $("#puzzleImage").attr("src","./"+imgnum+".jpg");
          $("#puzzleContainer").attr("index",imgnum);
          $( "div.puzzle, p" ).puzzle( size );
          $( "div.puzzle, p" ).puzzle(size);
        });

        $(function(){
          $("#puzzleContainer").attr('index','1');
          $( "div.puzzle, p" ).puzzle(100);
        });

        $('#next').live("click", function(){

          var level= $("#level").val();
          // console.log(level);
          var top = 5;

          if(level=="hard"){
            size = 75;
          }else{
            size = 100;
            var top = 35;
          }

          var imgnum = parseInt($("#puzzleContainer").attr('index'));
          // console.log('./'+imgnum+'.jpg');
          var image = $('<img src="./'+(imgnum+1)+'.jpg" />');
          // console.log(image[0]['width']);
          if (image[0]['width'] > 0){
            imgnum = imgnum+1;
          } else{
            imgnum = 1;
          }

          // if (ImageExist('./'+(imgnum+1)+'.jpg')){imgnum = 1;}else{imgnum = imgnum + 1;}
          $('#puzzleContainer').empty();
          $('#puzzleContainer').html('<div class="puzzle" style="margin-right: auto ;margin-left:auto;margin-top:'+top+'px;" data-position="fixed"><img id="puzzleImage" src="" width="320" height="390" alt="Puzzle Girl One" /></div>');
          $("#puzzleImage").attr("src","./"+imgnum+".jpg");
          $("#puzzleContainer").attr("index",imgnum);
          $( "div.puzzle, p" ).puzzle( size );
          }
        );

      }else{
        $("puzzle-button").remove()
      }
  
      $( "#nointernet" ).bind({
        popupafterclose:
        function(event, ui){
          youTubeAjaxCall();
        }

      });
          

        function  youTubeAjaxCallArray(videos){
        
          var funcs = [];
          for (var i = 0; i < videos.length ; i++) {
              funcs[i] = createfunc(videos[i]);
          }

          for (var j = 0; j < videos.length; j++) {
              funcs[j]();                        // and now let's run each one to see
          }
        }


        function createfunc(video) {
          // var id = video;
            return function() { 
               $.get('http://gdata.youtube.com/feeds/api/videos/'+video+'?alt=json',
                  function(response) {
                     jQuery('#listview').append('<li><a id="video" href="#" vidID="'+video+'"><img src="http://i.ytimg.com/vi/'+video+'/default.jpg" alt="" style="margin-top:10px;"><h2>'+response.entry.title.$t+'</h2><p>'+response.entry.content.$t+'</p></a></li>');
                     $('#listview').listview('refresh');
                  }).error(function(){ 
                    $( "#nointernet" ).popup( "open",{ transition: "flip"} ); 
                  });
            };
        }



        function  youTubeAjaxCall(queryString, exclude){
            var query=escape(queryString);
            $.get('https://gdata.youtube.com/feeds/api/videos?q='+query+'&max-results=20&orderby=relevance&v=2&alt=jsonc&safeSearch=strict&restriction=DE',
            function(response) {
                      if(response.data && response.data.items) {
                          var items = response.data.items;
                          if(items.length>0) {
                            for (var i = 0; i < items.length ; i++) {
                              var item = items[i];
                              if(jQuery.inArray(item.id, exclude)== -1){
                                ///if (item.status.value != 'restricted'){
                                  jQuery('#listview').append('<li><a id="video" href="#" vidID="'+item.id+'"><img src="http://i.ytimg.com/vi/'+item.id+'/default.jpg" alt="" style="margin-top:10px;"><h2>'+item.title+'</h2><p>'+item.description+'</p></a></li>');
                                 $('#listview').listview('refresh');
                                //}
                              }
                            };
                          }
                      }
            })
            .error(function(){ 
              $( "#nointernet" ).popup( "open",{ transition: "flip"} ); 
            });

            return;
        }



          function themeRefresh(theme){

              //the only difference between this block of code and the same code above is that it doesn't target list-dividers by calling: `.not('.ui-li-divider')`
              $.mobile.activePage.find('.ui-btn').not('.ui-li-divider')
                                 .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                                 .addClass('ui-btn-up-' + theme)
                                 .attr('data-theme', theme);

              //target the list divider elements, then iterate through them to check if they have a theme set, if a theme is set then do nothing, otherwise change its theme to `b` (this is the jQuery Mobile default for list-dividers)
              $.mobile.activePage.find('.ui-li-divider').each(function (index, obj) {
                  if ($(this).parent().attr('data-divider-theme') == 'undefined') {
                      $(this).removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                             .addClass('ui-bar-b')
                             .attr('data-theme', 'b');
                  }
              })


               //reset all the buttons widgets
              $.mobile.activePage.find('.ui-btn')
                                 .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
                                 .addClass('ui-btn-up-' + theme)
                                 .attr('data-theme', theme);

              //reset the header/footer widgets
              $.mobile.activePage.find('.ui-header, .ui-footer')
                                 .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
                                 .addClass('ui-bar-' + theme)
                                 .attr('data-theme', theme);

              //reset the page widget
              $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
                                 .addClass('ui-body-' + theme)
                                 .attr('data-theme', theme);
              /*The rest of this code example is the same as the above example*/
          }








        $('#video').live("click", function(event){

          event.preventDefault();
          vidID = $(this).attr('vidID');

          jQuery('#player').html('<iframe src="http://www.youtube.com/embed/'+vidID+'?autoplay=1" width="160" height="90" ></iframe><br><br>');
          iframeAutoSize();
           $("html, body").animate({ scrollTop: 0 }, "slow");
        });


        function parseRSS(url) {
          $.ajax({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
            dataType: 'json',
            success: function(data) {
             var items = data.responseData.feed.entries;
              if(items.length>0) {
                for (var i = 0; i < items.length ; i++) {
                  var item = items[i];
                  ///if (item.status.value != 'restricted'){
                    jQuery('#rsslistview').append('<li><a  id="rss" rssID="'+i+'" href="#" ><h2>'+item.title+'</h2><p>'+item.contentSnippet+'</p></a></li>');
                  //}
                  }
                }
                   $('#rsslistview').listview('refresh');
              }
          });
        }

   
        $('#rss').live("click", function(event){

          event.preventDefault();
          rssID = $(this).attr('rssID');

          jQuery('#article').html('<iframe src="http://www.youtube.com/embed/'+vidID+'?autoplay=1" width="160" height="90" ></iframe><br><br>');
          iframeAutoSize();
           $("html, body").animate({ scrollTop: 0 }, "slow");
        });




      $( document ).on( "pagebeforecreate", function( event, data ){
        // Let the framework know we're going to handle the load.
        event.preventDefault();
        iframeAutoSize();
        // themeRefresh(theme);
      });


      $( document ).on( "pagechange", function( event, data ){
        // Let the framework know we're going to handle the load.
        revmob.showPopup(null, null);
      });



      function iframeAutoSize() {
       // Find all YouTube videos
       var $allVideos = jQuery("iframe"),
           // The element that is fluid width
       $fluidEl = jQuery("[data-role='content']");
       // Figure out and save aspect ratio for each video
       $allVideos.each(function() {
        jQuery(this)
           .data('aspectRatio', this.height / this.width)
           // and remove the hard coded width/height
           .removeAttr('height')
           .removeAttr('width');
        });
        // When the window is resized
        jQuery(window).resize(function() {
          var newWidth = $fluidEl.width();
          // Resize all videos according to their own aspect ratio
          $allVideos.each(function() {
            var $el = jQuery(this);
            $el.height(newWidth * $el.data('aspectRatio'));
            $el.width(newWidth);
          });
          // Kick off one resize to fix all videos on page load
        }).resize();
      }

    });

function RevMob(appId) {
	this.appId = appId;
	this.TEST_DISABLED = 0;
	this.TEST_WITH_ADS = 1;
	this.TEST_WITHOUT_ADS = 2;

	cordova.exec(function(successParams){}, function(errorParams){}, "RevMobPlugin", "startSession", [appId]);

	this.showFullscreen = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showFullscreen", []);
	}

	this.openAdLink = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "openAdLink", []);
	}

	this.showPopup = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showPopup", []);
	}

	this.setTestingMode = function(testingMode) {
		cordova.exec(null, null, "RevMobPlugin", "setTestingMode", [testingMode]);
	}

	this.printEnvironmentInformation = function() {
		cordova.exec(null, null, "RevMobPlugin", "printEnvironmentInformation", []);
	}

	this.setTimeoutInSeconds = function(seconds) {
		cordova.exec(null, null, "RevMobPlugin", "setTimeoutInSeconds", [seconds]);
	}
}


// Here, we are going to define the jQuery puzzle
// plugin that will create the interface for each
// DIV that contains an image.
jQuery.fn.puzzle = function( intUserSize ){
 
	// Make sure that each of the parent elements
	// has a nested IMG tag. We don't want elements
	// that lack the image. Once we get those, then
	// loop over them to initialize functionality.
	return this.filter( ":has( img )" ).each(
 
		function( intI ){
 
			// This is the functionality that will initialize
			// the container and img for puzzle. This will only
			// be called ONCE the image has been loaded, and once
			// per each instance of the target puzzle.
			function InitPuzzle(){
				var jPiece = null;
				var intRowIndex, intColIndex, intI = 0;
 
				// Get the number of columns and rows.
				intColumns = Math.floor( jImg.width() / intSize );
				intRows = Math.floor( jImg.height() / intSize );
 
				// Get the puzzle width and height based on
				// the number of pieces (this may require some
				// cropping of the image).
				intPuzzleWidth = (intColumns * intSize);
				intPuzzleHeight = (intRows * intSize);
 
				// Empty the container element. We don't actually
				// want the image inside of it (or any of the
				// other elements that might be there).
				jContainer.empty();
 
				// Set the container CSS and dimensions.
				jContainer
					.css(
						{
							border: "1px solid black",
							overflow: "hidden",
							display: "block"
						}
						)
					.width( intPuzzleWidth )
					.height( intPuzzleHeight )
				;
 
				// Check to see how the container is positioned.
				// If is relative or absolute, we can keep it,
				// but if it is not those, then we need to set
				// is to relative explicitly.
				if (
					(jContainer.css( "position" ) != "relative") &&
					(jContainer.css( "position" ) != "absolute")
					){
 
					// The container element is not explicitly
					// positioned, so position it to be relative.
					jContainer.css( "position", "relative" );
 
				}
 
 
				// Loop over the columns and row to create each
				// of the pieces. At this point, we are not going to worry
				// about the dimensions of the board - that will happen next.
				for (var intRowIndex = 0 ; intRowIndex < intRows ; intRowIndex++){
 
					// For this row, add a new array.
					arr2DBoard[ intRowIndex ] = [];
 
					for (var intColIndex = 0 ; intColIndex < intColumns ; intColIndex++){
 
						// Create a new Div tag. We are using a DIV tag as
						// opposed to an anchor tag to get around the IE
						// bug that has flickering background images on links
						// when the browser is not caching images.
						jPiece = $( "<div><br /></div>" );
 
						// Set the css properties. Since all of the
						// pieces have the same background image, they
						// all have to have different offset positions.
						jPiece
							.css(
								{
									display: "block",
									float: "left",
									cursor: "pointer",
									backgroundImage: "url( '" + jImg.attr( "src" ) + "' )",
									backgroundRepeat: "no-repeat",
									backgroundPosition: (
										(intColIndex * -intSize) + "px " +
										(intRowIndex * -intSize) + "px"
										),
									position: "absolute",
									top: ((intSize * intRowIndex) + "px"),
									left: ((intSize * intColIndex) + "px")
								}
								)
							.width( intSize )
							.height( intSize )
						;
 
						// Set the HREF so that the click even registers.
						// Then, set up the click handler.
						jPiece
							.attr( "href", "javascript:void( 0 );" )
							.click( PieceClickHandler )
						;
 
						// Add the piece to the 2-D representation of the board.
						arr2DBoard[ intRowIndex ][ intColIndex ] = jPiece;
 
						// Add to DOM.
						jContainer.append( jPiece );
 
					}
				}
 
 
				// Make the last one opaque and give it a special "rel"
				// value so that we can easily loacate this one later on.
				arr2DBoard[ intRows - 1 ][ intColumns - 1 ]
					.css( "opacity", 0 )
					.attr( "rel", "empty" )
				;
 
 
				// In order to shuffle the board, we are going to simulate
				// a certain number of clicks. This is to ensure that any
				// state the board gets into, it is certain that the board
				// can get back into a "winning" state.
				for (intI = 0 ; intI < 100 ; intI++){
 
					// Select the piece that we want to "click".
					// We will do this by randomly selecting a row
					// and a column to click.
					jPiece = arr2DBoard[
						(Math.floor( Math.random() * intRows * intRows ) % intRows)
						][
						(Math.floor( Math.random() * intColumns * intColumns ) % intColumns)
						];
 
					// Simulate the click.
					jPiece.click();
				}
 
 
				// Now that we have initialized, turn on the animation.
				blnShowAnimation = true;
 
				// Return out.
				return( true );
			}
 
 
			// This sets up the click handler for the pieces.
			function PieceClickHandler( objEvent ){
				// Get the jQuery objects for the piece clicked as
				// well as the empty square within the board.
				var jPiece = $( this );
				var jEmpty = jContainer.find( "div[ rel = 'empty' ]" );
 
				// Get the CSS position for the current piece.
				var objPiecePos = {
					top: parseInt( jPiece.css( "top" ) ),
					left: parseInt( jPiece.css( "left" ) )
					};
 
				// Get the CSS position for the empty piece
				var objEmptyPos = {
					top: parseInt( jEmpty.css( "top" ) ),
					left: parseInt( jEmpty.css( "left" ) )
					};
 
				var intRowIndex, intColIndex = 0;
 
 
				// Check to see if we are in the middle of an animation.
				// If we are, then just return out since we don't want
				// to update values yet.
				if (blnInAnimation){
					return( false );
				}
 
 
				// Blur the current piece to get rid of the dotted box.
				jPiece.blur();
 
				// Base on the CSS of the current piece and the size of
				// each of the pieces, we can calculate the row and column
				// of the given piece.
				objPiecePos.row = (objPiecePos.top / intSize);
				objPiecePos.col = (objPiecePos.left / intSize);
 
				// Base on the CSS of the empty piece and the size of
				// each of the pieces, we can calculate the row and column
				// of the given piece.
				objEmptyPos.row = (objEmptyPos.top / intSize);
				objEmptyPos.col = (objEmptyPos.left / intSize);
 
 
				// Now that we have the row and column of the target piece
				// as well as the empty piece, we can check to see if anything
				// needs to be moved. Remember, we ONLY need to move pieces
				// if the target piece and the empty piece share a row
				// or a column.
 
				// Check to see if they share the same row.
				if (objPiecePos.row == objEmptyPos.row){
 
					// Check to see which direction we are moving in.
					if (objPiecePos.col > objEmptyPos.col){
 
						// Move left.
						for (intColIndex = objEmptyPos.col ; intColIndex < objPiecePos.col ; intColIndex++){
							arr2DBoard[ objPiecePos.row ][ intColIndex ] = arr2DBoard[ objPiecePos.row ][ intColIndex + 1 ];
						}
 
						// Put empty in place.
						arr2DBoard[ objPiecePos.row ][ intColIndex ] = jEmpty;
 
					} else {
 
						// Move right.
						for (intColIndex = objEmptyPos.col ; intColIndex > objPiecePos.col ; intColIndex--){
							arr2DBoard[ objPiecePos.row ][ intColIndex ] = arr2DBoard[ objPiecePos.row ][ intColIndex - 1 ];
						}
 
						// Put empty in place.
						arr2DBoard[ objPiecePos.row ][ intColIndex ] = jEmpty;
 
					}
 
 
					// Update the CSS of the entire row (to make it easy).
					for (intColIndex = 0 ; intColIndex < intColumns ; intColIndex++){
 
						if (blnShowAnimation){
 
							// Flag that an animation is about to being.
							blnInAnimation = true;
 
							// Animate the CSS move.
							arr2DBoard[ objPiecePos.row ][ intColIndex ].animate(
								{
									left: ((intSize * intColIndex) + "px")
								},
								200,
								function(){
									blnInAnimation = false;
								}
								);
 
						} else {
 
							// Update the CSS for the given piece.
							arr2DBoard[ objPiecePos.row ][ intColIndex ].css(
								"left",
								((intSize * intColIndex) + "px")
								);
 
						}
 
					}
 
 
				// Check to see if we should move vertically.
				} else if (objPiecePos.col == objEmptyPos.col){
 
					// Check to see which direction we are moving in.
					if (objPiecePos.row > objEmptyPos.row){
 
						// Move up.
						for (intRowIndex = objEmptyPos.row ; intRowIndex < objPiecePos.row ; intRowIndex++){
							arr2DBoard[ intRowIndex ][ objPiecePos.col ] = arr2DBoard[ intRowIndex + 1 ][ objPiecePos.col ];
						}
 
						// Put empty in place.
						arr2DBoard[ intRowIndex ][ objPiecePos.col ] = jEmpty;
 
					} else {
 
						// Move down.
						for (intRowIndex = objEmptyPos.row ; intRowIndex > objPiecePos.row ; intRowIndex--){
							arr2DBoard[ intRowIndex ][ objPiecePos.col ] = arr2DBoard[ intRowIndex - 1 ][ objPiecePos.col ];
						}
 
						// Put empty in place.
						arr2DBoard[ intRowIndex ][ objPiecePos.col ] = jEmpty;
 
					}
 
 
					// Update the CSS of the entire column (to make it easy).
					for (intRowIndex = 0 ; intRowIndex < intRows ; intRowIndex++){
 
						if (blnShowAnimation){
 
							// Flag that an animation is about to being.
							blnInAnimation = true;
 
							// Animate the CSS move.
							arr2DBoard[ intRowIndex ][ objPiecePos.col ].animate(
								{
									top: ((intSize * intRowIndex) + "px")
								},
								200,
								function(){
									blnInAnimation = false;
								}
								);
 
						} else {
 
							// Update the CSS for the given piece.
							arr2DBoard[ intRowIndex ][ objPiecePos.col ].css(
								"top",
								((intSize * intRowIndex) + "px")
								);
 
						}
 
					}
 
 
				}
 
 
				// Return false so nothing happens.
				return( false );
			}
 
 
 
			// ASSERT: At this point, we have defined all the class
			// methods for this plugin instance. Now, we can act on
			// the instance properties and call methods.
 
 
			// Get a jQUery reference to the container.
			var jContainer = $( this );
 
			// Get a jQuery reference to the first image
			// - this is the one that we will use to make
			// the image puzzle.
			var jImg = jContainer.find( "img:first" );
 
			// This is the array that will hold the 2-dimentional
			// representation of the board.
			var arr2DBoard = [];
 
			// The height and width of the puzzle.
			var intPuzzleWidth = 0;
			var intPuzzleHeight = 0;
 
			// The width / height of each piece. This can be overriden
			// by the user when the initialize the puzzle plug-in.
			var intSize = intUserSize || 100;
 
			// The number of columns that are in the board.
			var intColumns = 0;
 
			// The number of rows that in the board.
			var intRows = 0;
 
			// Flag for wether or not to show animation.
			var blnShowAnimation = false;
 
			// Flag for wether or not an animation is in the midst. We
			// are going to need this to prevent further clicking during
			// and anmiation sequence.
			var blnInAnimation = false;
 
 
			// Check check to make sure that the size value is valid.
			// Since this can be overridden by the user, we want to
			// make sure that it is not crazy.
			intSize = Math.floor( intSize );
 
			if ((intSize < 40) || (intSize > 200)){
				intSize = 100;
			}
 
			// Check to see if the image has complietely
			// loaded (for some reason, this does NOT
			// work with the attr() function). If the
			// image is complete, call Init right away.
			// If it has not loaded, then set an onload
			// handler for initialization.
			if ( jImg[ 0 ].complete ){
 
				// The image has loaded so call Init.
				InitPuzzle();
 
			} else {
 
				// The image has not loaded so set an
				// onload event handler to call Init.
				jImg.load(
					function(){
						InitPuzzle();
					}
					);
 
			}
		}
 
		);
}
