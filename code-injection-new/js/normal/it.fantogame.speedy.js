






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
        


 function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
var punti = 0;
function check(a)
{
    if ((endsWith(eval("window.document.nn" + (a)).src, "piastrelle/accesa.png")))
    {
        punti += 1;
        eval("window.document.nn" + (a)).src = "piastrelle/spenta.png";
        getElById("punti").innerHTML = punti;
        genera();
    }
    if ((endsWith(eval("window.document.nn" + (a)).src, "piastrelle/x2.png")))
    {
        punti += 2;
        eval("window.document.nn" + (a)).src = "piastrelle/spenta.png"

    }

    
}
var down, cmin2, csec2
function Down() {
    
        res_en = false;
        punti_parziali = 0;
        genera(false);
        cmin2 = 1 * 2;
        csec2 = 0 + 0;
        clearInterval(down);
        DownRepeat();
    }

    var tax2= 0;
    var xx2 = -1;
    var xa = -1;
 function Display(min, sec) {
                 var disp;
                 if (min <= 9) disp = " 0";
                 else disp = " ";
                 disp += min + ":";
                 if (sec <= 9) disp += "0" + sec;
                 else disp += sec;
                 return (disp);
             }
    function DownRepeat() {
            csec2--;
            if (csec2 == -1) { csec2 = 59; cmin2--; }
            getElById("time").innerHTML = Display(cmin2, csec2);
        if ((cmin2 == 0) && (csec2 == 0)) {
            time_up();
        }
        else down = setTimeout("DownRepeat()", 1000);
        /*
        n1 = random();
        n2 = random();
        if (tax2 > 0)
            --tax2;
        else
         //   eval("window.document.nn" + (n2)).src = "piastrelle/spenta.png";
        if (n2 >= 90)
        {
            tax2 = 10;
            xx2 = n1;
  //          eval("window.document.nn" + (n1)).src = "piastrelle/x2.png";

        }
        */
   } 
    function getElById(the_id) {
        if (typeof the_id != 'string') {
            return the_id;
        }

        if (typeof document.getElementById != 'undefined') {
            return document.getElementById(the_id);
        } else if (typeof document.all != 'undefined') {
            return document.all[the_id];
        } else if (typeof document.layers != 'undefined') {
            return document.layers[the_id];
        } else {
            return null;
        }
    }
    function genera()
    {
        n1 = random();
        if (n1 == xa)
            genera();
        eval("window.document.nn" + (n1)).src = "piastrelle/accesa.png";
        xa = n1;
    }
        
    function random()
   {
        a = Math.floor(Math.random() * 36);
        return a;
    }
    function time_up()
    {
        eval("window.document.nn" + (n1)).src = "piastrelle/spenta.png";

        eval("window.document.nn" + (n1)).src = "piastrelle/spenta.png";

    }
Down();
     
        

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

