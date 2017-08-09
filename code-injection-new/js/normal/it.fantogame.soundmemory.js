






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
        


var audio = document.createElement('audio');


function play_sound(a)    
{
 if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg"))

{

	

	audio.src = "http://www.fantogame.it/mp3/sound_memory/"+ a + ".mp3";

	audio.play();

}

else if (audio != null && audio.canPlayType && audio.canPlayType("audio/ogg"))

{

	

	audio.src = "http://www.fantogame.it/mp3/sound_memory/"+ a + ".ogg";

	audio.play();

  }
}


function getElById (the_id) {
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

function setText(form,input,value)
  {
  value = "\"" + value + "\""; 
  //alert ("window.document." + form + "." + input + ".value =  " + value + ";");
  		
   if (navigator.appName == "Microsoft Internet Explorer")
      {
      eval ("window.document." + form + "." + input + ".value =  " + value + ";");
   		}
   else
   		{
   	  eval ("window.document." + form + "." + input + ".value =  " + value + ";"); 
  		} 
}
function getXMLValue(xml,value)
{
//alert (xml +".getElementsByTagName(\"" + value + "\")[0].text;");
  		
if (navigator.appName == "Microsoft Internet Explorer")
       {
  		  return eval(xml +".getElementsByTagName(\"" + value  + "\")[0].text;");
  		 }
   else
   {
   	  return eval(xml +".getElementsByTagName(\"" + value + "\")[0].textContent;");
   }
}
function newAjax() {
    var xmlHttp;
    try
    {
        // Firefox, Opera e Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (exc)
    {
        // Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (exc)
        {
            try
            {
                xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (exc)
            {
                alert("Il tuo browser non supporta AJAX!");
                return false;
            }
        }
    }
    return xmlHttp;
}
function ajax_request(url,data,method,cb)
{
url1 = url;
ajax = newAjax();

 if (method == "GET")
 {
 		url1 += "?" + data;
 		ajax.open("GET", url1, true);
		ajax.send(null);
 }
 else if (method == "POST")
 {
 		ajax.open("POST", url1, true);
		ajax.send(data);
 }

 //window.document.T.value= url1;
 ajax.onreadystatechange = cb;
return ajax;
}



function cdfl()
{


   if (ajax1.readyState == 4) {



    if (ajax1.status == 200)
    {

        xmlRoot = ajax1.responseXML.documentElement;
 dd = new Array();
   for (i = 0;i != 16;++i)
           {          
            eval("window.document.nn"+(i)).src = "http://www.fantogame.it/images/mp3/speaker_on.jpg";
            dd[i] = getXMLValue("xmlRoot","CO"+(i));
            x[i] = 0;
           }
    }
}


}


var ajax1;
function change()
{
if (getElById("b").checked != true)
{
   ajax1 = ajax_request("http://www.fantogame.it/ajax/sound_memory.php","?easy=0","GET",cdfl);
}
else
{
   ajax1 = ajax_request("http://www.fantogame.it/ajax/sound_memory.php","","GET",cdfl);
   
}
}

var ajax1;
var dd;
var c = 0;
var d = -1;
var e = -1;
var x = new Array();

var de = new Array();
function check(i)
{
if (x[i] != 0)
return;
if (i == d)
return;

++c;
if (c == 1)
{
d = i;
eval("window.document.nn"+(d)).src = "http://www.fantogame.it/images/mp3/speaker_click.jpg";
}
if (c == 2)
{
eval("window.document.nn"+(d)).src = "http://www.fantogame.it/images/mp3/speaker_on.jpg";
if (d == e)
{
--c;
return;
}
e = i;

if (dd[d] == dd[e])
{
c = 0;
x[d] = 1;
x[e] = 1;
eval("window.document.nn"+(d)).src = "http://www.fantogame.it/images/mp3/speaker_off.jpg";
eval("window.document.nn"+(e)).src = "http://www.fantogame.it/images/mp3/speaker_off.jpg";1  
d = -1;
e = -1;
}
}
if (c == 3)
{
c = 1;
d = i;
eval("window.document.nn"+(d)).src = "http://www.fantogame.it/images/mp3/speaker_click.jpg";
e = -1;
}
play_sound(dd[i]);
}
function clk(i)
{
    //window.document.form1.t3.value = Math.round(window.document.form1.t1.value * 100 / window.document.form1.t2.value * 100) / 100;
    val = ajax_request("t2.php","cmd=1&partn="+partn+"&cn=" + i + "&","POST",clkr);    //setText("form1","t5",val);
}
i = 8;
var ajax1;
function getElById (the_id) {
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



function reset()
{
	change();
}

function clkr(b,ajax)
{
   xmlRoot = ajax.responseXML.documentElement;
   setText("form1","t3",getXMLValue("xmlRoot","R1"));
   setText("form1","t4",getXMLValue("xmlRoot","R2"));
}


change();




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

