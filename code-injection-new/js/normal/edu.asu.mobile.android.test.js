






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
        







		function exitGA() {
				gaPlugin.exit(function(result) {console.log(result)}, function(error) {console.log(error)});
			}
		

            var image = "";
            switch (Math.floor(Math.random()*12)) {
            case 1:
                image = "a_mountain.jpg";
                break;
            case 2:
                image = "a_mountain2.jpg";
                break;
            case 4:
                image = "asu_building.jpg";
                break;
            case 5:
                image = "asu_poly.jpg";
                break;
            case 6:
                image = "downtown.jpg";
                break;
            case 7:
                image = "gammage.jpg";
                break;
            case 8:
                image = "hayden.jpg";
                break;
            case 9:
                image = "hayden2.jpg";
                break;
            case 10:
                image = "hayden3.jpg";
                break;
            case 11:
            default:
                image = "skysong.jpg";
                break;
            }
            
            document.addEventListener("deviceready", onDeviceReady, false); 
            
            var gaPlugin;

            function onDeviceReady() {
                gaPlugin = window.plugins.gaPlugin;
                gaPlugin.init(function(result){console.log(result);}, function(error) {console.log(error)}, "UA-20247130-8", 10);
                gaPlugin.trackPage(function(result){console.log(result);}, function(error) {console.log(error);}, "index");
            
            
            $(document).ready(function() {
               $("#carousel").append("<img id='header_image' src='img/headers/" + image + "'>");
            
           
             


            //NOTE: to switch to dev/qa/prod, replace the first part of the second parameter given to replace with the appropriate url:
            //DEV: https://webapp4-dev.asu.edu/mobile/
            //QA: https://webapp4-qa.asu.edu/mobile/
            //PROD: https://webapp4.asu.edu/mobile/
            //NOTE: The url for myASU is hardcoded in the menu. If you need to switch it to dev or prod, change the href in the menu entry
            var CAMPAIGNNUMBER = '1.1';
            var CORDOVA = 'cordova2.3.0';
            

            $('a').each(function(){
                this.href = this.href.replace(/https:\/\/basepath\//, 'https://webapp4.asu.edu/mobile/');
            });
            
            
            var $items = $("#menu a #menuitem");
            
			function myASUHandler (ev, context) {
				 var moved = false;
	      		$(this).on('touchmove', function(event) {
	      			moved = true;
        			$items.css('background-color', 'white');
	        	});
		      	
          		 $(context).on('touchend', function(event) {
          			if(!moved) {
          			  event.preventDefault();
          			  event.stopImmediatePropagation();
          			  event.stopPropagation();
          			  var url;
          			  if ($(this).parents().hasClass('myasu')) {
			      		  url = 'https://webapp4.asu.edu/myasu/m' + "&utm_campaign=" + CAMPAIGNNUMBER + "&utm_source=" + CORDOVA;
          			  }
          			  else
          				  url = $(this).parent().attr('href');
         			  
		      		  gaPlugin.trackPage(function(result){console.log(result);}, function(error) {console.log(error);}, url);
		      		  navigator.app.loadUrl(url, {openExternal:true});
		      		  $("#menu a #menuitem").css('background', 'white');
		      		  return false;
          			  
          			}
          		   });
                };
		
        
        	// Bind the tapHandler callback function to the touchstart event on the div
         	$items.each( function(item , value) {
         		$(value).on( 'touchstart', tapHandler );
         	});
        	
         	
         	function tapHandler(ev) {
 				$("#menu a #menuitem").css('background', 'white');
 				$(this).css('background','#D6D6D6');
 				var moved = false;
 	        	
 	        	if ($(this).parents().hasClass('external')) {
 	        		ev.preventDefault();
 	        		ev.stopImmediatePropagation();
 	        		ev.stopPropagation();
 	        		myASUHandler(ev, this);
 	        	}
 	        	
 	        	else {
 	        		$(this).on('touchmove', function(event) {
	        			$items.css('background-color', 'white');
	        			moved = true;
 	        		});
 	        		
 		        	$(this).on('touchend', function(event) {
 			 				$("#menuitem").css('background-color', 'white');
		  			        if(!moved) {
		  			        	gaPlugin.trackPage(function(result){console.log(result);}, function(error) {console.log(error);}, $(this).parent().attr('href'));
		  			        }
 		        
 		        	});
 	        		
 	        		
         	   }
        	  };
        
            
    });
            }

        

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
        window.location.href = 'https://webapp4.asu.edu/mobile?utm_source=andoid&utm_medium=app&utm_campaign=1.0.6'
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

