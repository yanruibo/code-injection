






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
        





function restart () {
    var restart = document.createElement("a");
    restart.className = "restart";
    restart.innerHTML = "&nbsp;";
    desarrollo.appendChild(restart);
    restart.onclick = function(){
        desarrollo.innerHTML = " ";
        hipertiroidismo();
    }
}

function hipertiroidismo(){
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";
    var desarrollo = document.getElementById("desarrollo");
    desarrollo.style.display = "block";

    var barra = document.createElement("div");
    barra.className = "barra";
    

    var title = document.createElement("h1");
    title.innerHTML = "Hipertiroidismo";
    title.className = "letters bar";
    barra.appendChild(title);

    desarrollo.appendChild(barra);

    var espac1 = document.createElement("br");
    desarrollo.appendChild(espac1);
    var espac2 = document.createElement("br");
    desarrollo.appendChild(espac2);

    var a = document.createElement("p");
    a.innerHTML = "Dosaje de TSH y T4L";
    desarrollo.appendChild(a);
    var esp = document.createElement("br");
    desarrollo.appendChild(esp);

    var cBajoAlto = document.createElement("div");
    var count1 = 0;
    cBajoAlto.onclick = function(){
        if(count1 === 1){
            return false;
        }else{
        restart();
        cBajoAlto.className = "selectedLinkContainer";
        cAltoAlto.className = "unSelectedLinkContainer";
        cBajoNormal.className = "unSelectedLinkContainer";
        var es1 = document.createElement("br");
        desarrollo.appendChild(es1);

        var count2 = 0;
        var cBocioOftalmo = document.createElement("div");
        cBocioOftalmo.onclick = function(){
            if(count2 === 1){
                return false;
            }else{
            cBocioOftalmo.className = "triple amontonados selectedLinkContainer";
            cNoBocio.className = "triple amontonados unSelectedLinkContainer";
            cUniMulti.className = "triple amontonados uniMulti unSelectedLinkContainer";
            graves();
            count2 = 1;
            }
        }
        cBocioOftalmo.className = "triple amontonados";
        var bocio = document.createElement("a");
        bocio.className = "center";
        bocio.innerHTML = "Bocio";
        var oftalmo = document.createElement("a");
        oftalmo.className = "center";
        var es2 = document.createElement("br");
        oftalmo.innerHTML = "Oftalmopat&iacute;a";
        cBocioOftalmo.appendChild(bocio);
        cBocioOftalmo.appendChild(es2);
        cBocioOftalmo.appendChild(oftalmo);
        desarrollo.appendChild(cBocioOftalmo);


        var cNoBocio = document.createElement("div");
        cNoBocio.className = "triple amontonados";
        cNoBocio.onclick = function(){
            if(count2 === 1){
                return false;
            }else{
            cBocioOftalmo.className = "triple amontonados unSelectedLinkContainer";
            cNoBocio.className = "triple amontonados selectedLinkContainer";
            cUniMulti.className = "triple amontonados uniMulti unSelectedLinkContainer";
            gamagrafia();
            count2 = 1;
            }
        }
        var noBocio = document.createElement("a");
        noBocio.className = "center";
        noBocio.innerHTML = "Bocio (-) o peque&ntilde;o";
        var noOftalmo = document.createElement("a");
        noOftalmo.className = "center";
        noOftalmo.innerHTML = "Oftalmopat&iacute;a (-)";
        var es3 = document.createElement("br");

        cNoBocio.appendChild(noBocio);
        cNoBocio.appendChild(es3);
        cNoBocio.appendChild(noOftalmo);
        desarrollo.appendChild(cNoBocio);


        var cUniMulti = document.createElement("div");
        cUniMulti.className = "triple amontonados uniMulti";
        cUniMulti.onclick = function(){
            if(count2 === 1){
                return false;
            }else{
            cBocioOftalmo.className = "triple amontonados unSelectedLinkContainer";
            cNoBocio.className = "triple amontonados unSelectedLinkContainer";
            cUniMulti.className = "triple amontonados uniMulti selectedLinkContainer";
            adenoma();
            count2 = 1;
            }
        }
        var uni = document.createElement("a");
        uni.innerHTML = "Bocio uninodular";
        var multiNod = document.createElement("a");
        multiNod.innerHTML = "o Multinodular";
        var oftalmoNo2 = document.createElement("a");
        oftalmoNo2.innerHTML = "Oftalmopat&iacute;a (-)";

        var es4 = document.createElement("br");
        var es5 = document.createElement("br");

        cUniMulti.appendChild(uni);
        cUniMulti.appendChild(es4);
        cUniMulti.appendChild(multiNod);
        cUniMulti.appendChild(es5);
        cUniMulti.appendChild(oftalmoNo2);
        desarrollo.appendChild(cUniMulti);
        count1 = 1;
        }
    }
    var bajoAlto = document.createElement("a");
    bajoAlto.innerHTML = "TSH &darr; / T4L &uarr;";
    cBajoAlto.appendChild(bajoAlto);
    desarrollo.appendChild(cBajoAlto);


    var cAltoAlto = document.createElement("div");
    var altoAlto = document.createElement("a");
    altoAlto.innerHTML = "TSH &uarr; / T4L &darr;";
    cAltoAlto.onclick = function(){
        if(count1 === 1){
            return false;
        } else {
        restart();
        cBajoAlto.className = "unSelectedLinkContainer";
        cAltoAlto.className = "selectedLinkContainer";
        cBajoNormal.className = "unSelectedLinkContainer";

        var esp1 = document.createElement("br");
        desarrollo.appendChild(esp1);
        sospechar();
        var cTshoma = document.createElement("div");
        cTshoma.className = "result doble";
        var tshoma = document.createElement("a");
        tshoma.className = "resultLetter";
        tshoma.innerHTML = "TSHoma";
        
        var esp2 = document.createElement("br");
        
        var rht = document.createElement("a");
        rht.className = "resultLetter";
        rht.innerHTML = "RHT";
        cTshoma.appendChild(tshoma);
        cTshoma.appendChild(esp2);
        cTshoma.appendChild(rht);
        desarrollo.appendChild(cTshoma);
        count1 = 1;
        }
    }
    cAltoAlto.appendChild(altoAlto);
    desarrollo.appendChild(cAltoAlto);


    var cBajoNormal = document.createElement("div");
    cBajoNormal.onclick = function(){
        if(count1 === 1){
            return false;
        }else{
        restart();
        cBajoAlto.className = "unSelectedLinkContainer";
        cAltoAlto.className = "unSelectedLinkContainer";
        cBajoNormal.className = "selectedLinkContainer";

        var es6 = document.createElement("br");
        desarrollo.appendChild(es6);
        var t3 = document.createElement("p");
        t3.innerHTML = "Dosaje T3";
        desarrollo.appendChild(t3);

        var es7 = document.createElement("br");
        desarrollo.appendChild(es7);

        var count4 = 0;

        var cElevada = document.createElement("div");
        cElevada.onclick = function(){
            if(count4 === 1){
                return false;
            }else{
                cElevada.className = "selectedLinkContainer";
                cBaja.className = "unSelectedLinkContainer";
                cNormal.className = "unSelectedLinkContainer";
                count4 = 1;
                t3Elevada();
            }
        }
        var elevada = document.createElement("a");
        elevada.innerHTML = "Elevada";
        cElevada.appendChild(elevada);
        desarrollo.appendChild(cElevada);

        var cBaja = document.createElement("div");
        cBaja.onclick = function(){
            if(count4 === 1){
                return false;
            }else{
                cElevada.className = "unSelectedLinkContainer";
                cBaja.className = "selectedLinkContainer";
                cNormal.className = "unSelectedLinkContainer";
                count4 = 1;
                t3Baja();
            }
        }
        var baja = document.createElement("a");
        baja.innerHTML = "Baja";
        cBaja.appendChild(baja);
        desarrollo.appendChild(cBaja);

        var cNormal = document.createElement("div");
        cNormal.onclick = function(){
            if(count4 === 1){
                return false;
            }else{
                cElevada.className = "unSelectedLinkContainer";
                cBaja.className = "unSelectedLinkContainer";
                cNormal.className = "selectedLinkContainer";
                count4 = 1;
                t3Normal();
            }
        }
        var normal = document.createElement("a");
        normal.innerHTML = "Normal";
        cNormal.appendChild(normal);
        desarrollo.appendChild(cNormal);
        count1 = 1;
        }
    }
    var bajoNormal = document.createElement("a");
    bajoNormal.innerHTML = "TSH &darr; / T4L N";
    cBajoNormal.appendChild(bajoNormal);
    desarrollo.appendChild(cBajoNormal);
}

function graves(){
    var esp3 = document.createElement("br");
    desarrollo.appendChild(esp3);
    sospechar();
    var cResGraves = document.createElement("div");
    cResGraves.className = "result";
    var resGraves = document.createElement("a");
    resGraves.className = "resultLetter";
    resGraves.innerHTML = "Graves";

    cResGraves.appendChild(resGraves);
    desarrollo.appendChild(cResGraves);
}

function gamagrafia(){
    var count3 = 0;
    var esp4 = document.createElement("br");
    desarrollo.appendChild(esp4);

    var gama = document.createElement("p");
    gama.innerHTML = "Gammagraf&iacute;a";
    desarrollo.appendChild(gama);
    var esp5 = document.createElement("br");
    desarrollo.appendChild(esp5);

    var cHiper = document.createElement("div");
    cHiper.onclick = function(){
        if(count3 === 1){
            return false;
        }else{
            cHiper.className = "selectedLinkContainer";
            cHipo.className = "unSelectedLinkContainer";
            var es1 = document.createElement("br");
            desarrollo.appendChild(es1);
            sospechar();
            var cResHiper = document.createElement("div");
            cResHiper.className = "cuadruple result";
            var resHiper1 = document.createElement("a");
            resHiper1.className = "resultLetter";
            resHiper1.innerHTML = "Graves";
            var esp6 = document.createElement("br");
            var resHiper2 = document.createElement("a");
            resHiper2.className = "resultLetter";
            resHiper2.innerHTML = "Exceso de producci&oacute;n";
            var esp7 = document.createElement("br");
            var resHiper3 = document.createElement("a");
            resHiper3.className = "resultLetter";
            resHiper3.innerHTML = "de hCG";

            cResHiper.appendChild(resHiper1);
            cResHiper.appendChild(esp6);
            cResHiper.appendChild(resHiper2);
            cResHiper.appendChild(esp7);
            cResHiper.appendChild(resHiper3);
            desarrollo.appendChild(cResHiper);
            count3 = 1;
        }
    }
    var hiper = document.createElement("a");
    hiper.innerHTML = "Hipercaptaci&oacute;n difusa";
    cHiper.appendChild(hiper);
    desarrollo.appendChild(cHiper);

    var cHipo = document.createElement("div");
    cHipo.onclick = function(){
        if(count3 === 1){
            return false;
        }else{
            cHiper.className = "unSelectedLinkContainer";
            cHipo.className = "selectedLinkContainer";
            var es2 = document.createElement("br");
            desarrollo.appendChild(es2);
            sospechar();
            var cResHipo = document.createElement("div");
            cResHipo.className = "cuadruple hipo result";
            var tiroiditis = document.createElement("a");
            tiroiditis.className = "resultLetter small";
            tiroiditis.innerHTML = "Tiroiditis";

            var t4Exog = document.createElement("a");
            t4Exog.className = "resultLetter small";
            t4Exog.innerHTML = "T4 ex&oacute;geno";

            var jobBasedow = document.createElement("a");
            jobBasedow.className = "resultLetter small";
            jobBasedow.innerHTML = "Job-Basedow";

            var struma = document.createElement("a");
            struma.className = "resultLetter small";
            struma.innerHTML = "Struma ovarii";

            cResHipo.appendChild(tiroiditis);
            var es3 = document.createElement("br");
            cResHipo.appendChild(es3);
            cResHipo.appendChild(t4Exog);
            var es4 = document.createElement("br");
            cResHipo.appendChild(es4);
            cResHipo.appendChild(jobBasedow);
            var es5 = document.createElement("br");
            cResHipo.appendChild(es5);
            cResHipo.appendChild(struma);
            desarrollo.appendChild(cResHipo);
            count3 = 1;
        }
    }
    var hipo = document.createElement("a");
    hipo.innerHTML = "Hipocaptaci&oacute;n";
    cHipo.appendChild(hipo);
    desarrollo.appendChild(cHipo);
}


function adenoma(){
    var es6 = document.createElement("br");
    desarrollo.appendChild(es6);
    sospechar();
    var cAdenoma = document.createElement("div");
    cAdenoma.className = "result";
    var adenoma = document.createElement("a");
    adenoma.className = "resultLetter";
    adenoma.innerHTML = "Adenoma o BMN t&oacute;xico";

    cAdenoma.appendChild(adenoma);
    desarrollo.appendChild(cAdenoma);
}


function t3Elevada(){
    var es8 = document.createElement("br");
    desarrollo.appendChild(es8);
    var descartar = document.createElement("p");
    descartar.innerHTML = "Diagn&oacute;stico diferencial:";
    desarrollo.appendChild(descartar);
    var es9 = document.createElement("br");
    desarrollo.appendChild(es9);

    var cResT3elevada = document.createElement("div");
    cResT3elevada.className = "cuadruple result";

    var t3Tirotox = document.createElement("a");
    t3Tirotox.className = "resultLetter";
    t3Tirotox.innerHTML = "T3-Tirotoxicosis";
    var e1 = document.createElement("br");
    var enfGraves = document.createElement("a");
    enfGraves.className = "resultLetter";
    enfGraves.innerHTML = "Enfermedad de Graves";
    var e2 = document.createElement("br");
    var bmnAnc = document.createElement("a");
    bmnAnc.className = "resultLetter";
    bmnAnc.innerHTML = "BMN (ancianos)";

    cResT3elevada.appendChild(t3Tirotox);
    cResT3elevada.appendChild(e1);
    cResT3elevada.appendChild(enfGraves);
    cResT3elevada.appendChild(e2);
    cResT3elevada.appendChild(bmnAnc);
    desarrollo.appendChild(cResT3elevada);
}

function t3Baja(){
    var es8 = document.createElement("br");
    desarrollo.appendChild(es8);
    var descartar = document.createElement("p");
    descartar.innerHTML = "Diagn&oacute;stico diferencial:";
    desarrollo.appendChild(descartar);
    var es9 = document.createElement("br");
    desarrollo.appendChild(es9);

    var cRest3Baja = document.createElement("div");
    cRest3Baja.className = "cuadruple result";
    var sese = document.createElement("a");
    sese.className = "resultLetter";
    sese.innerHTML = "SESE";
    var e3 = document.createElement("br");

    var cortic = document.createElement("a");
    cortic.className = "resultLetter";
    cortic.innerHTML = "F&aacute;rmacos: Corticoides";
    var e4 = document.createElement("br");

    var dopa = document.createElement("a");
    dopa.className = "resultLetter";
    dopa.innerHTML = "y Dopamina";

    cRest3Baja.appendChild(sese);
    cRest3Baja.appendChild(e3);
    cRest3Baja.appendChild(cortic);
    cRest3Baja.appendChild(e4);
    cRest3Baja.appendChild(dopa);
    desarrollo.appendChild(cRest3Baja);
}

function t3Normal(){

    var es10 = document.createElement("br");
    desarrollo.appendChild(es10);
    var cSubClinico = document.createElement("div");
    cSubClinico.className = "triple result";

    var hiperT = document.createElement("a");
    hiperT.className = "resultLetter";
    hiperT.innerHTML = "Hipertiroidismo";
    var e5 = document.createElement("br");

    var subclinico = document.createElement("a");
    subclinico.className = "resultLetter";
    subclinico.innerHTML = "subcl&iacute;nico";

    sospechar();

    cSubClinico.appendChild(hiperT);
    cSubClinico.appendChild(e5);
    cSubClinico.appendChild(subclinico);
    desarrollo.appendChild(cSubClinico);
}

function sospechar(){
    var sosp = document.createElement("p");
    sosp.innerHTML = "Sospechar:";
    desarrollo.appendChild(sosp);
    var esp9 = document.createElement("br");
    desarrollo.appendChild(esp9);
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

