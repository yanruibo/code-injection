






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


// jqm.page.params.js - version 0.1
// Copyright (c) 2011, Kin Blas
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function( $, window, undefined ) {

// Given a query string, convert all the name/value pairs
// into a property/value object. If a name appears more than
// once in a query string, the value is automatically turned
// into an array.
function queryStringToObject( qstr )
{
	var result = {},
		nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
		i, pair, n, v;

	for ( i = 0; i < nvPairs.length; i++ ) {
		var pstr = nvPairs[ i ];
		if ( pstr ) {
			pair = pstr.split( /=/ );
			n = pair[ 0 ];
			v = pair[ 1 ];
			if ( result[ n ] === undefined ) {
				result[ n ] = v;
			} else {
				if ( typeof result[ n ] !== "object" ) {
					result[ n ] = [ result[ n ] ];
				}
				result[ n ].push( v );
			}
		}
	}

	return result;
}

// The idea here is to listen for any pagebeforechange notifications from
// jQuery Mobile, and then muck with the toPage and options so that query
// params can be passed to embedded/internal pages. So for example, if a
// changePage() request for a URL like:
//
//    http://mycompany.com/myapp/#page-1?foo=1&bar=2
//
// is made, the page that will actually get shown is:
//
//    http://mycompany.com/myapp/#page-1
//
// The browser's location will still be updated to show the original URL.
// The query params for the embedded page are also added as a property/value
// object on the options object. You can access it from your page notifications
// via data.options.pageData.
$( document ).bind( "pagebeforechange", function( e, data ) {

	// We only want to handle the case where we are being asked
	// to go to a page by URL, and only if that URL is referring
	// to an internal page by id.

	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage );
		if ( $.mobile.path.isEmbeddedPage( u ) ) {

			// The request is for an internal page, if the hash
			// contains query (search) params, strip them off the
			// toPage URL and then set options.dataUrl appropriately
			// so the location.hash shows the originally requested URL
			// that hash the query params in the hash.

			var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
			if ( u2.search ) {
				if ( !data.options.dataUrl ) {
					data.options.dataUrl = data.toPage;
				}
				data.options.pageData = queryStringToObject( u2.search );
				data.toPage = u.hrefNoHash + "#" + u2.pathname;
			}
		}
	}
});

})( jQuery, window );

﻿/* variabili globali */
var mLat = ''; //latitudine
var mLong = ''; //longitudine
var geosupport = false; //Geolocation supported

$(document).bind("mobileinit", function () {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushState = false;
});
$(document).on('pageinit', '#tonissi', function () {
    loadSettings();
});
$(document).on('pageinit', '#settings', function () {
    $("input[type='radio']").bind("change", function (event, ui) {
        //se seleziono miglia marine disabilito road e abilito aria
        if ($("input:radio[name=lu]:checked").val() == 'n') {
            $('#radio4').attr('checked', true).checkboxradio("refresh");
            $('#radio5').attr('checked', false).checkboxradio("refresh");
            $("input[type='radio'][value=r]").checkboxradio('disable');
            $("input[type='radio'][value=a]").checkboxradio('disable');
        }
        else {
            $("input[type=radio][value=r]").checkboxradio('enable');
            $("input[type='radio'][value=a]").checkboxradio('enable');
        }
        event.preventDefault();
    });
    if ($("input:radio[name=lu]:checked").val() == 'n') {
        $("input[type='radio'][value=r]").checkboxradio('disable');
        $("input[type='radio'][value=a]").checkboxradio('disable');
        $('#radio4').attr('checked', true).checkboxradio("refresh");
        $('#radio5').attr('checked', false).checkboxradio("refresh");
    }
});
$(document).bind("pagebeforechange", function (event, data) {
    $.mobile.pageData = (data && data.options && data.options.pageData)
                           ? data.options.pageData
                           : null;
});
$('#dettaglioservices').live("pagehide", function () {
    $('#map_canvas').gmap('destroy');
});
$('#dettaglioservices').live("pageshow", function () {
    if ($.mobile.pageData && $.mobile.pageData.idazienda) {
        if (window.navigator.onLine) {
            var map = $('#map_canvas');
            var latLng
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        geosupport = true;
                        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        var image = new google.maps.MarkerImage(
                                'img/bluedot.png',
                                null, // size
                                null, // origin
                                new google.maps.Point(8, 8), // anchor (move to center of marker)
                                new google.maps.Size(17, 17) // scaled size (required for Retina display icon)
                        );
                        map.gmap({
                            'center': latLng, 'zoom': 15, 'disableDefaultUI': true, 'streetViewControl': false, 'callback': function () {
                                var self = this;
                                //aggiuno la mia posizione
                                self.addMarker({ 'position': latLng, 'icon': image, 'flat': true, 'optimized': false, 'visible': true, 'title': 'I might be here', 'bounds': true });
                                mLat = latLng.lat() + '';
                                mLong = latLng.lng() + '';
                                mLat = mLat.replace(/\./g, ',');
                                mLong = mLong.replace(/\./g, ',');
                                var qs = '';
                                qs = '&la=' + mLat + '&lo=' + mLong + '&lu=' + localStorage.getItem("lenghtunit") + '&dt=' + localStorage.getItem("distancetype");
                                $.getJSON('http://tonissidb.spazioweb.net/?action=dettaglioservizio&idazienda=' + $.mobile.pageData.idazienda + qs, function (data) {
                                    $.each(data, function (index, value) {
                                        self.addMarker({ 'position': new google.maps.LatLng(value.TblAzienda_Lat, value.TblAzienda_Long), 'visible': true, 'bounds': true }); //.click(function () {//
                                        var lineCoordinates = [new google.maps.LatLng(latLng.lat(), latLng.lng()), new google.maps.LatLng(value.TblAzienda_Lat, value.TblAzienda_Long)];
                                        var lineSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };
                                        $('#map_canvas').gmap('addShape', 'Polyline', { 'path': lineCoordinates, 'icons': [{ icon: lineSymbol, offset: '100%' }], 'strokeColor': "#0000FF", 'strokeWeight': 3, 'fillColor': "#0000FF", 'strokeOpacity': 0.5, 'fillOpacity': 0.35 });
                                        var lenghtunit = '';
                                        switch (localStorage.getItem("lenghtunit")) {
                                            case 'k':
                                                lenghtunit = "km";
                                                break;
                                            case 'm':
                                                lenghtunit = "mi";
                                                break;
                                            case 'n':
                                                lenghtunit = "nm";
                                                break;
                                            default:
                                                lenghtunit = "nm";
                                        }
                                        $('#dettdist').show();
                                        $('#dettdist').html('Distance: ' + parseInt(value.dist) + ' ' + lenghtunit + ' ' + parseInt(value.dir) + '°');
                                    });
                                });
                            }
                        });
                        map.gmap('refresh');
                    },
                        function errorCallback(error) {
                            //do error handling 
                            geosupport = false;
                            $('#dettdist').hide();
                            $('#dettdist').html('');
                        },
                        {
                            enableHighAccuracy: true,
                            maximumAge: 60000,
                            timeout: 3000
                        }
                    );
            } else {
                // If location is not supported on this platform, disable it
                geosupport = false;
            }
        }
    }

});
$('#fullmappa').live("pageshow", function () {
    if (window.navigator.onLine) {
        var map = $('#map_canvas_full');
        var latLng
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    geosupport = true;
                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var image = new google.maps.MarkerImage(
    						'img/bluedot.png',
    						null, // size
    						null, // origin
    						new google.maps.Point(8, 8), // anchor (move to center of marker)
    						new google.maps.Size(17, 17) // scaled size (required for Retina display icon)
    				);
                    map.gmap({
                        'center': latLng, 'zoom': 15, 'disableDefaultUI': true, 'streetViewControl': true, 'callback': function () {
                            var self = this;
                            //aggiuno la mia posizione
                            self.addMarker({ 'position': latLng, 'icon': image, 'flat': true, 'optimized': false, 'visible': true, 'title': 'I might be here', 'bounds': true })
                            //metto tutti gli altri
                            $.getJSON('http://tonissidb.spazioweb.net/?action=listaservizi', function (data) {
                                //iterate through the data (we could also get rid of the jQuery here by using `for (key in data) { 
                                $.each(data, function (index, value) {
                                    self.addMarker({ 'position': new google.maps.LatLng(value.TblAzienda_Lat, value.TblAzienda_Long), 'visible': true, 'bounds': true }).click(function () {
                                        var cc = value.TblAzienda_Nome + '<br/><a href="#dettaglioservices?idazienda=' + value.TblAzienda_ID + '">Go to Service</a>';
                                        self.openInfoWindow({ 'content': cc }, this);
                                    });
                                });
                            });
                        }
                    });
                    map.gmap('refresh');
                },
                    function errorCallback(error) {
                        //do error handling 
                        geosupport = false;
                    },
                    {
                        enableHighAccuracy: true,
                        maximumAge: 60000,
                        timeout: 3000
                    }
                );
        } else {
            // If location is not supported on this platform, disable it
            geosupport = false;
        }
    }
});
// Listen for any attempts to call changePage().
$(document).bind("pagebeforechange", function (e, data) {
    // We only want to handle changePage() calls where the caller is	
    // asking us to load a page by URL.	
    if (typeof data.toPage === "string") {
        // We only want to handle a subset of URLs.		
        var u = $.mobile.path.parseUrl(data.toPage);
        var servizi = /^#servizi/;
        var dettservizi = /^#dettaglioservices/;
        var settingsurl = /^#settings/;
        var fullmappasurl = /^#fullmappa/;

        if (u.hash.search(servizi) !== -1) {
            // Display a list of Service Station.
            showServices(u, data.options);
            e.preventDefault();
        }
        else if (u.hash.search(dettservizi) !== -1) {
            // Display DettServizi Page
            showDettaglio(u, data.options);
            e.preventDefault();
        }
        else if (u.hash.search(settingsurl) !== -1) {
            //  Display Setting Page	
            showSetting(u, data.options);
            e.preventDefault();
        }
        else if (u.hash.search(fullmappasurl) !== -1) {
            // Display QR code for the selected URL.		
            showFullMap(u, data.options);
            e.preventDefault();
        }
    }
});
function showServices(urlObj, options) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
			function (position) {
			    geosupport = true;
			    mLat = position.coords.latitude + '';
			    mLong = position.coords.longitude + '';
			    mLat = mLat.replace(/\./g, ',');
			    mLong = mLong.replace(/\./g, ',');
			    showServiceStation(urlObj, options, geosupport);
			},
				function errorCallback(error) {
				    //do error handling 
				    geosupport = false;
				    showServiceStation(urlObj, options, geosupport);
				},
				{
				    enableHighAccuracy: true,
				    maximumAge: 60000,
				    timeout: 3000
				}
			);
    } else {
        // If location is not supported on this platform, disable it
        geosupport = false;
        showServiceStation(urlObj, options, geosupport);
    }
};
function showFullMap(urlObj, options) {
    pageSelector = urlObj.hash.replace(/\?.*$/, "");
    var $page = $(pageSelector);
    options.dataUrl = urlObj.href;
    $.mobile.changePage($page, options);
}
function showSetting(urlObj, options) {
    pageSelector = urlObj.hash.replace(/\?.*$/, "");
    $page = $(pageSelector);
    $("#btnsavesetting").live('click', function () {
        saveSettings();
    });
    $page.page();
    options.dataUrl = urlObj.href;
    $.mobile.changePage($page, options);
}
function saveSettings() {
    localStorage.setItem('lenghtunit', $("input:radio[name=lu]:checked").val());
    if ((typeof ($("input:radio[name=dt]:checked").val()) == 'undefined')) {
        //se il checkbox è disabilitato lo metto ad a
        localStorage.setItem('distancetype', 'a');
    } else {
        localStorage.setItem('distancetype', $("input:radio[name=dt]:checked").val());
    }

    history.back();
}
function loadSettings() {
    if (typeof (localStorage) == 'undefined') {
    } else {
        //Se non è settata metto i valori di default
        if (localStorage.getItem("lenghtunit") == null) {
            localStorage.setItem('lenghtunit', 'n');
            //salvo nel database locale l'associazione chiave<=>valore
        }
        if (localStorage.getItem("distancetype") == null) {
            localStorage.setItem('distancetype', 'a');
            //salvo nel database locale l'associazione chiave<=>valore
        }
    }
    $('input[name=lu]').each(function () {
        //...check each button...
        if ($(this).val() === localStorage.getItem("lenghtunit")) {
            //...and if the value of "content" (referenced above) matches...
            $(this).attr('checked', 'checked');
            //...check this radio button.
        }
    });
    $('input[name=dt]').each(function () {
        //...check each button...
        if ($(this).val() === localStorage.getItem("distancetype")) {
            //...and if the value of "content" (referenced above) matches...
            $(this).attr('checked', 'checked');
            //...check this radio button.
        }
    });
    $("input[type='checkbox']").prop("checked", true).checkboxradio("refresh");

}
//var aziendaID
function showDettaglio(urlObj, options) {
    var aziendaID = $.mobile.pageData.idazienda;// urlObj.hash.replace(/.*idazienda=/, ""),
    pageSelector = urlObj.hash.replace(/\?.*$/, "");
    $page = $(pageSelector),
	$content = $page.children(":jqmData(role=content)"),
    // Get the header for the page.
	$header = $page.children(":jqmData(role=header)");
    $.getJSON('http://tonissidb.spazioweb.net/?action=dettaglioservizio&idazienda=' + aziendaID, function (data) {
        //declare a variable with which to build our output (it's best to buffer output and only do one append at the end since DOM manipulation is CPU expensive) 
        var output = '';
        //iterate through the data (we could also get rid of the jQuery here by using `for (key in data) { 
        $.each(data, function (index, value) {
            $header.find("h1").html(value.TblAzienda_Nome);
            $('#hnomeservices').html(value.TblAzienda_Nome);
            $('#nomeservices').html(value.TblAzienda_Nome);
            $('#indirizzo').html(value.TblAzienda_Indirizzo);
            $('#indirizzo1').html(value.TblAzienda_Cap + ' ' + value.TblAzienda_Citta + ', ' + value.TblAzienda_Stato);
            $('#gmap').html('<a href="http://maps.google.it/maps?q=' + value.TblAzienda_Nome + ' ' + value.TblAzienda_Indirizzo + ',+' + value.TblAzienda_Cap + '+' + value.TblAzienda_Citta + '+' + value.TblAzienda_Stato + '&ll=' + value.TblAzienda_Lat + ',' + value.TblAzienda_Long + '" >View in Google Maps</a>');
            if (value.TblAzienda_Tel != null) {
                $('#tel').show();
                $('#tel').html('t. <a href="tel:' + value.TblAzienda_Tel.replace(/\s/g, "") + '" >' + value.TblAzienda_Tel + '</a>');
            } else {
                $('#tel').hide();
                $('#tel').html('');
            }
            if (value.TblAzienda_Fax != null) {
                $('#fax').show();
                $('#fax').html('fax ' + value.TblAzienda_Fax);
            } else {
                $('#fax').hide();
                $('#fax').html('');
            }

            //mi occupo delle mail
            if (value.TblAzienda_Email != null) {
                $('#email').show();
                var temp = new Array();
                temp = value.TblAzienda_Email.split(",");
                var e = '';
                for (a in temp) {
                    e += '<a href="mailto:' + temp[a].replace(/\s/g, "") + '" >' + temp[a].replace(/\s/g, "") + '</a>' + ' ';
                }
                $('#email').html(e);
            } else {
                $('#email').hide();
                $('#email').html('');
            }
            if (value.TblAzienda_Sito != null) {
                $('#sito').show();
                $('#sito').html('<a href="http://' + value.TblAzienda_Sito.replace(/\s/g, "") + '" >' + value.TblAzienda_Sito.replace(/\s/g, "") + '</a>');
            } else {
                $('#sito').hide();
                $('#sito').html('');
            }


            if (value.TblAzienda_Cell1 != null) {
                $('#cell1').show();
                if (value.TblAzienda_Celld1 != null) {
                    $('#cell1').html(value.TblAzienda_Celld1 + ' cell. ' + '<a href="tel:' + value.TblAzienda_Cell1.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell1 + '</a>');
                }
                else {
                    $('#cell1').html('<a href="tel:' + value.TblAzienda_Cell1.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell1 + '</a>');
                }
            }
            else {
                $('#cell1').hide();
                $('#cell1').html('');
            }

            if (value.TblAzienda_Cell2 != null) {
                $('#cell2').show();
                if (value.TblAzienda_Celld2 != null) {
                    $('#cell2').html(value.TblAzienda_Celld2 + ' cell. ' + '<a href="tel:' + value.TblAzienda_Cell2.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell2 + '</a>');
                }
                else {
                    $('#cell2').html('<a href="tel:' + value.TblAzienda_Cell2.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell2 + '</a>');
                }
            }
            else {
                $('#cell2').hide();
                $('#cell2').html('');
            }
            if (value.TblAzienda_Cell3 != null) {
                $('#cell3').show();
                if (value.TblAzienda_Celld3 != null) {
                    $('#cell3').html(value.TblAzienda_Celld3 + ' cell. ' + '<a href="tel:' + value.TblAzienda_Cell3.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell3 + '</a>');
                }
                else {
                    $('#cell3').html('<a href="tel:' + value.TblAzienda_Cell2.replace(/\s/g, "") + '" >' + value.TblAzienda_Cell2 + '</a>');
                }
            }
            else {
                $('#cell3').hide();
                $('#cell3').html('');
            }
        });
    });
    $page.page();
    options.dataUrl = urlObj.href;
    $.mobile.changePage($page, options);
};
function showServiceStation(urlObj, options, geosupport) {
    pageSelector = urlObj.hash.replace(/\?.*$/, "");
    var $page = $(pageSelector);
    $('#listaservicestation').empty();
    //se è supportata la geolocalizzazione la metto
    var qs = '';
    if (geosupport) {
        qs = '&la=' + mLat + '&lo=' + mLong + '&lu=' + localStorage.getItem("lenghtunit") + '&dt=' + localStorage.getItem("distancetype");
    };
    $.getJSON('http://tonissidb.spazioweb.net/?action=listaservizi' + qs, function (data) {
        //declare a variable with which to build our output (it's best to buffer output and only do one append at the end since DOM manipulation is CPU expensive) 
        var output = '';
        //iterate through the data (we could also get rid of the jQuery here by using `for (key in data) { 
        $.each(data, function (index, value) {
            var lenghtunit = '';
            switch (localStorage.getItem("lenghtunit")) {
                case 'k':
                    lenghtunit = "km";
                    break;
                case 'm':
                    lenghtunit = "mi";
                    break;
                case 'n':
                    lenghtunit = "nm";
                    break;
                default:
                    lenghtunit = "nm";
            }
            var mKm = '';
            if (geosupport) {
                mKm += '<span class="ui-li-count" >' + parseInt(value.dist) + ' ' + lenghtunit + ' ' + parseInt(value.dir) + '°</span>';
            }
            output += '<li><a href="#dettaglioservices?idazienda=' + value.TblAzienda_ID + '" data-transition="slidedown"><h3>' + value.TblAzienda_Nome + '</h3><p>' + value.TblAzienda_Indirizzo + ' ' + value.TblAzienda_Cap + ' ' + value.TblAzienda_Citta + '</p>' + mKm + '</a></li>';
        });

        //now append the buffered output to the listview and either refresh the listview or create it (meaning have jQuery Mobile style the list) 
        $('#listaservicestation').append(output).listview('refresh'); //or if the listview has yet to be initialized, use `.trigger('create');` instead of `.listview('refresh');` 
    });
    options.dataUrl = urlObj.href;
    $.mobile.changePage($page, options);
}


/*! jquery-ui-map rc1 | Johan S�ll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.w(".")[0],a=a.w(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){K.I&&2.16(a,b)};d[c][a].J=d.n({1A:c,1z:a},b);d.S[a]=3(b){j g="1y"===1D b,f=H.J.12.15(K,1),i=2;l(g&&"1C"===b.1B(0,1))9 i;2.13(3(){j h=d.Z(2,a);h||(h=d.Z(2,a,k d[c][a](b,2)));l(g&&(h=h[b].10(h,f),"4"===b||o!=h))i=h});9 i}};d.a("1x.1t",{r:{1s:"1r",1w:5},1v:3(a,b){l(b)2.r[a]=b,2.4("8").B(a,b);P 9 2.r[a]},16:3(a,b){2.C=b;a=a||{};m.n(2.r,a,{1e:2.D(a.1e)});2.1c();2.1j&&2.1j()},1c:3(){j a=2;2.q={8:k 6.7.1u(a.C,a.r),L:[],t:[],u:[]};6.7.s.1N(a.q.8,"1M",3(){d(a.C).19("1L",a.q.8)});a.F(a.r.1Q,a.q.8)},1d:3(a){j b=2.4("1i",k 6.7.1P);b.n(2.D(a));2.4("8").1O(b)},1K:3(a){j b=2.4("8").1G();9 b?b.1F(a.18()):!1},1E:3(a,b){2.4("8").1J[b].O(2.z(a))},1I:3(a,b){a.8=2.4("8");a.Y=2.D(a.Y);j c=k(a.1H||6.7.1k)(a),e=2.4("L");c.V?e[c.V]=c:e.O(c);c.1i&&2.1d(c.18());2.F(b,a.8,c);9 d(c)},y:3(a){2.G(2.4(a));2.B(a,[])},G:3(a){A(j b R a)a.U(b)&&(a[b]p 6.7.T?(6.7.s.X(a[b]),a[b].x&&a[b].x(o)):a[b]p H&&2.G(a[b]),a[b]=o)},1p:3(a,b,c){a=2.4(a);b.v=d.1l(b.v)?b.v:[b.v];A(j e R a)l(a.U(e)){j g=!1,f;A(f R b.v)l(-1<d.1n(b.v[f],a[e][b.1q]))g=!0;P l(b.11&&"1m"===b.11){g=!1;1o}c(a[e],g)}},4:3(a,b){j c=2.q;l(!c[a]){l(-1<a.2i(">")){A(j e=a.14(/ /g,"").w(">"),d=0;d<e.I;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.I?[]:b;P 9 o;c=c[e[d]]}9 c}b&&!c[a]&&2.B(a,b)}9 c[a]},2h:3(a,b,c){j d=2.4("Q",a.2j||k 6.7.2l);d.M(a);d.2k(2.4("8"),2.z(b));2.F(c,d)},2d:3(){o!=2.4("Q")&&2.4("Q").2c()},B:3(a,b){2.q[a]=b},2e:3(){j a=2.4("8"),b=a.2g();d(a).17("2f");a.2m(b)},2r:3(){2.y("L");2.y("u");2.y("t");2.G(2.q);m.2s(2.C,2.2t)},F:3(a){a&&d.2o(a)&&a.10(2,H.J.12.15(K,1))},D:3(a){l(!a)9 k 6.7.N(0,0);l(a p 6.7.N)9 a;a=a.14(/ /g,"").w(",");9 k 6.7.N(a[0],a[1])},z:3(a){9!a?o:a p m?a[0]:a p 2n?a:d("#"+a)[0]},2q:3(a,b){j c=k 6.7[a](m.n({8:2.4("8")},b));2.4("t > "+a,[]).O(c);9 d(c)},2p:3(a,b){(!b?2.4("t > E",k 6.7.E):2.4("t > E",k 6.7.E(b,a))).M(m.n({8:2.4("8")},a))},2b:3(a,b,c){2.4("t > "+a,k 6.7.1X(b,m.n({8:2.4("8")},c)))},1W:3(a,b,c){j d=2,g=2.4("u > 1f",k 6.7.1f),f=2.4("u > 1g",k 6.7.1g);b&&f.M(b);g.1Y(a,3(a,b){"20"===b?(f.1Z(a),f.x(d.4("8"))):f.x(o);c(a,b)})},1S:3(a,b){2.4("8").1R(2.4("u > 1a",k 6.7.1a(2.z(a),b)))},1T:3(a,b){2.4("u > 1b",k 6.7.1b).1V(a,b)}});m.S.n({17:3(a){6.7.s.19(2[0],a);9 2},W:3(a,b,c){6.7&&2[0]p 6.7.T?6.7.s.1U(2[0],a,b):c?2.1h(a,b,c):2.1h(a,b);9 2},27:3(a){6.7&&2[0]p 6.7.T?a?6.7.s.26(2[0],a):6.7.s.X(2[0]):2.28(a);9 2}});m.13("2a 29 22 21 23 25 24".w(" "),3(a,b){m.S[b]=3(a,d){9 2.W(b,a,d)}})})(m);',62,154,'||this|function|get||google|maps|map|return||||||||||var|new|if|jQuery|extend|null|instanceof|instance|options|event|overlays|services|value|split|setMap|clear|_unwrap|for|set|el|_latLng|FusionTablesLayer|_call|_c|Array|length|prototype|arguments|markers|setOptions|LatLng|push|else|iw|in|fn|MVCObject|hasOwnProperty|id|addEventListener|clearInstanceListeners|position|data|apply|operator|slice|each|replace|call|_setup|triggerEvent|getPosition|trigger|StreetViewPanorama|Geocoder|_create|addBounds|center|DirectionsService|DirectionsRenderer|bind|bounds|_init|Marker|isArray|AND|inArray|break|find|property|roadmap|mapTypeId|gmap|Map|option|zoom|ui|string|pluginName|namespace|substring|_|typeof|addControl|contains|getBounds|marker|addMarker|controls|inViewport|init|bounds_changed|addListenerOnce|fitBounds|LatLngBounds|callback|setStreetView|displayStreetView|search|addListener|geocode|displayDirections|KmlLayer|route|setDirections|OK|mouseover|dblclick|mouseout|dragend|drag|clearListeners|removeEventListener|unbind|rightclick|click|loadKML|close|closeInfoWindow|refresh|resize|getCenter|openInfoWindow|indexOf|infoWindow|open|InfoWindow|setCenter|Object|isFunction|loadFusion|addShape|destroy|removeData|name'.split('|'),0,{}))

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


/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(2(c){c.s(c.p.o.n,{r:2(b,a,c){q e=0,f=0.1("5 > 9",4 3.6.9),d=0.1("5 > 7",4 3.6.7);a&&d.l(a);f.j(b,2(a,b){"m"===b?(d.k(a),d.h(e.1("8"))):d.h(z);c(a,b)})},u:2(b,a){0.1("8").y(0.1("5 > g",4 3.6.g(0.v(b),a)))},x:2(b,a){0.1("5 > i",4 3.6.i).w(b,a)}})})(t);',36,36,'this|get|function|google|new|services|maps|DirectionsRenderer|map|DirectionsService|||||||StreetViewPanorama|setMap|Geocoder|route|setDirections|setOptions|OK|prototype|gmap|ui|var|displayDirections|extend|jQuery|displayStreetView|_unwrap|geocode|search|setStreetView|null'.split('|'),0,{}))
