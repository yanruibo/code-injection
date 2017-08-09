






   if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        	document.addEventListener("deviceready", onDeviceReady, false);

    } else {
    	$(document).ready(function() {
        	onDeviceReady();
        });
    }
 
function onDeviceReady() {initsearchmapgadget("http://ppdl.pockeit.com","/app_ppdl.php/","1", "zone-coprs");}



	var markerOne;
	function initsearchmapgadget(host,param, gadgetid ,zone){
		showoptions();
		 $.mobile.buttonMarkup.hoverDelay=true;
		var map=initialize();//Gmap init
		
		$('#aroundme').click(function() {
			$.mobile.loading( 'show' );
			var onGpsSuccess = function(position) {
				$.mobile.loading( 'hide' );
				loadoeuvres(host,param, gadgetid ,zone,0, position.coords.latitude,position.coords.longitude,map);
				
			};
			function onGpsError(error) {
				$.mobile.loading( 'hide' );
			    alert('Impossible de vous localiser. Essayez d\'activer la localisation dans la configuration de votre mobile');
			}	
			navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsError);

		});
		$('#aroundville').click(function() {
			var coord = $('#select-ville option:selected').attr('value');
			coord=coord.replace(",",".");
			coord=coord.replace(",",".");
			var coordSplit = coord.split('|');
			loadoeuvres(host,param, gadgetid ,zone,0, coordSplit[1],coordSplit[0],map);
		});
		
		$('#next').click(function() {
			getpage(host,param, gadgetid ,zone,1);
		});
		$('#prev').hide();
		
	};
	
	function loadoeuvres(host,param, gadgetid,zone,page, lat, lng,map){
		$.mobile.loading( 'show' );
		$('#oeuvrelist').html('');
		pageInt = parseInt(page);
		start =(pageInt*10);
		stop=((pageInt*10)+10);
		$.get(host+param+'service/gadget/searchmapgadget/'+gadgetid+'/'+lat+'/'+lng+'/'+start+'/'+stop+'/json', function(data) {
			articles = $.parseJSON(data);
			
			var data = articles.data;
			for (var i = 0; i < data.length; i++) {
				loadarticle(host,param,zone, data[i],i,map);
			}
			showoeuvres();
		});
		$('#next').unbind();
		$('#prev').unbind();
		
		$('#next').click(function() {
			loadoeuvres(host,param, gadgetid ,zone, pageInt+1, lat,lng);
		});
		
		if(pageInt == 0){
			$('#prev').hide();
			
		}else{
			$('#prev').show();
			$('#prev').click(function() {
				loadoeuvres(host,param, gadgetid ,zone, pageInt-1, lat,lng);
			});
		}
	}
	function fullscreenArticle(host, param, oeuvreid,map){
		$.mobile.loading( 'show' );
		$.get(host+param+'service/gadget/searchmapgadget/view/'+oeuvreid+'/json', function(data) {
			oeuvre = $.parseJSON(data);
			$('#nom').html(oeuvre[0].nom);
			$('#commune').html(oeuvre[0].commune=='null'?'N/A':oeuvre[0].commune);
			$('#coord').html(' (latitude : '+oeuvre[0].lat+' longitude : '+oeuvre[0].lng+')');
			$('#datation').html(oeuvre[0].datation=='null'?'N/A':oeuvre[0].datation);
			$('#description').html(oeuvre[0].description=='null'?'N/A':oeuvre[0].description);
			$('#historique').html(oeuvre[0].historique=='null'?'N/A':oeuvre[0].historique);
			$('#matgros').html(oeuvre[0].matgros=='null'?'N/A':oeuvre[0].matgros);
			$('#matcouv').html(oeuvre[0].matcouv=='null'?'N/A':oeuvre[0].matcouv);
			$('#chercheur').html(oeuvre[0].chercheur=='null'?'N/A':oeuvre[0].chercheur);
			$('#copyright').html(oeuvre[0].copyright=='null'?'N/A':oeuvre[0].copyright);
			

			showfull();
			
			if(map!=null && oeuvre[0].lat!=null && oeuvre[0].lng!=null){
				$('#map_canvas').show();
				map.setZoom(8);
				google.maps.event.trigger($("#map_canvas")[0], 'resize');
				var latitudeAndLongitude = new google.maps.LatLng(oeuvre[0].lat,oeuvre[0].lng);
				map.setCenter(latitudeAndLongitude);
				//map.panTo(latitudeAndLongitude);
				
				if(markerOne!=null){
					markerOne.setMap(null);
				}
				markerOne = new google.maps.Marker({
			        position: latitudeAndLongitude,
			        map: map
			    });
			}else{
				$('#map_canvas').hide();
			}

			
		});
	}
	function loadarticle(host,param, zone, data,i,map){
		    
		   var listEl ='';
		   listEl+='<li id="oeuvre'+data.id+'" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="d">';
		   listEl+='<div class="ui-btn-inner ui-li">';
		   listEl+='	<div class="ui-btn-text">';
		   listEl+='		<a class="ui-link-inherit" href="index.html">';
		   listEl+='			<p class="ui-li-aside ui-li-desc" style="width:20%">';
		   listEl+='				<strong>'+data.distance+'</strong>Km';
		   listEl+='           </p>';
		   listEl+='			<h3 class="ui-li-heading">'+data.title+'</h3>';
		   listEl+='			<p class="ui-li-desc">';
		   if(data.desc!='null...'){
			   listEl+=				data.desc;
		   }
		   listEl+='			</p>';
		   listEl+='			<p class="ui-li-desc"><strong>';
		   listEl+=				data.commune;
		   listEl+='			</strong></p>';
		   listEl+='		</a>';
		   listEl+='	</div>';
		   listEl+='	<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"> </span>';
		   listEl+='</div>';
		   listEl+='</li>';
		   $('#oeuvrelist').append(listEl);
		   $('#oeuvre'+data.id).click(function() {
			   	fullscreenArticle(host, param, data.id,map);
			});
		
	}
	
	function showoptions(){
		$('#oeuvres').hide();
		$('#options').show();
		$('#fullscreen').hide();
		$.mobile.loading( 'hide' );
		$('#backhead').hide();
		window.scrollTo(0,0);
		document.removeEventListener("backbutton", showoptions, false);
	}
	function showoeuvres(){
		$('#oeuvres').show();
		$('#options').hide();
		$('#fullscreen').hide();

		$('#backhead').show();
		$('#backhead').unbind();
		$('#backhead').click(function() {
			showoptions();
		});
		
		document.removeEventListener("backbutton", showoeuvres, false);
		document.addEventListener("backbutton", showoptions, false);

		
		$.mobile.loading( 'hide' );
		window.scrollTo(0,0);
	}
	function showfull(){
		$('#oeuvres').hide();
		$('#options').hide();
		$('#fullscreen').show();

		$('#backhead').show();
		$('#backhead').unbind();
		$('#backhead').click(function() {
			showoeuvres();
		});
		document.removeEventListener("backbutton", showoptions, false);
		document.addEventListener("backbutton", showoeuvres, false);
		
		$.mobile.loading( 'hide' );
		window.scrollTo(0,0);
	}

	
	function initialize() {
	        var mapOptions = {
	          center: new google.maps.LatLng(47.21677,-1.553307),
	          zoom: 8,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	        var map = new google.maps.Map(document.getElementById("map_canvas"),
	            mapOptions);
	        return map;

       // var latitudeAndLongitudeOne = new google.maps.LatLng(47.21677,-1.553307);
        
        //var markerOne = new google.maps.Marker({
        //	position: latitudeAndLongitudeOne,
        //	map: map
        //});
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

