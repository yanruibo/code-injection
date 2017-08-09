







var __optionsFilename = "480_opzioni.html";
var __indexFilename = "480_index.html";
var __fieldFilename = "480_campo.html";
var __errorFilename = "480_errore.html";
var pagina = "480_index";











function onDeviceReady() {
	var wdt = $(window).width();
	if (wdt >= 768) {
		location.href = "768_errore.html";
	}else if(wdt <= 400){
		location.href = "400_errore.html";
	} else {
		location.href = "640_errore.html";
	}
}
function onLoadFn() {
	document.addEventListener("deviceready", onDeviceReady, false);
}





	var __optionsFilename = "640_opzioni.html";
	var __indexFilename = "640_index.html";
	var __fieldFilename = "640_campo.html";
	var __errorFilename = "640_errore.html";
	var pagina = "640_campo";









	var __optionsFilename = "640_opzioni.html";
	var __indexFilename = "640_index.html";
	var __fieldFilename = "640_campo.html";
	var __errorFilename = "640_errore.html";
	var pagina = "640_opzioni";









	var __optionsFilename = "480_opzioni.html";
	var __indexFilename = "480_index.html";
	var __fieldFilename = "480_campo.html";
	var __errorFilename = "480_errore.html";
	var pagina = "480_campo";







	var __optionsFilename = "768_opzioni.html";
	var __indexFilename = "768_index.html";
	var __fieldFilename = "768_campo.html";
	var __errorFilename = "768_errore.html";
	var pagina = "768_campo";











	var __optionsFilename = "400_opzioni.html";
	var __indexFilename = "400_index.html";
	var __fieldFilename = "400_campo.html";
	var __errorFilename = "400_errore.html";
	var pagina = "400_index";









	var __optionsFilename = "400_opzioni.html";
	var __indexFilename = "400_index.html";
	var __fieldFilename = "400_campo.html";
	var __errorFilename = "400_errore.html";
	var pagina = "400_opzioni";







var __optionsFilename = "768_opzioni.html";
var __indexFilename = "768_index.html";
var __fieldFilename = "768_campo.html";
var __errorFilename = "768_errore.html";
var pagina = "768_index";















	var __optionsFilename = "400_opzioni.html";
	var __indexFilename = "400_index.html";
	var __fieldFilename = "400_campo.html";
	var __errorFilename = "400_errore.html";
	var pagina = "400_campo";





var __optionsFilename = "640_opzioni.html";
var __indexFilename = "640_index.html";
var __fieldFilename = "640_campo.html";
var __errorFilename = "640_errore.html";
var pagina = "640_index";













	var __optionsFilename = "480_opzioni.html";
	var __indexFilename = "480_index.html";
	var __fieldFilename = "480_campo.html";
	var __errorFilename = "480_errore.html";
	var pagina = "480_opzioni";











	var __optionsFilename = "768_opzioni.html";
	var __indexFilename = "768_index.html";
	var __fieldFilename = "768_campo.html";
	var __errorFilename = "768_errore.html";
	var pagina = "768_opzioni";






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


var versiontype = "free";
var varRandom = 0;
var release = "1.2";
var phoneName = "";
var platform = "";
var uuid = "";
var versionos = "";
var urlstat = "";
var nome = "";
var attivaOverlayer = false;


function parseXml(xml) {

	// refreshBanner(); // funzione definita in banner.js
	
	// CONTROLLO BANNER PER LA FREE
	if (versiontype == "free") {		
		document.getElementById("main-calendario").style.height = '1056px';
	} else if (versiontype == "pro") {
		document.getElementById("patchPro").style.display = 'block';
	}

	$("#ico2").click(function() {
		$('#main-calendario').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__optionsFilename, '_self')
		});
	});

	$("#nome_header").click(function() {
		$('#main-calendario').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__indexFilename, '_self')
		});
	});

	giornata = $(xml).find("giornata").text();

	$("#giornata").append(giornata + "a giornata");

	arrPartita1 = $(xml).find("partita1").text().split("-");
	arrPartita2 = $(xml).find("partita2").text().split("-");
	arrPartita3 = $(xml).find("partita3").text().split("-");
	arrPartita4 = $(xml).find("partita4").text().split("-");
	arrPartita5 = $(xml).find("partita5").text().split("-");
	arrPartita6 = $(xml).find("partita6").text().split("-");
	arrPartita7 = $(xml).find("partita7").text().split("-");
	arrPartita8 = $(xml).find("partita8").text().split("-");
	arrPartita9 = $(xml).find("partita9").text().split("-");
	arrPartita10 = $(xml).find("partita10").text().split("-");

	elementi = new Array();
	elencopartite = new Array();
	for (e = 0; e < 10; e++) {
		elementi[e] = new Array($(xml).find("partita" + (e + 1)).attr("data"),
				eval("arrPartita" + (e + 1))[0].toLowerCase(),
				eval("arrPartita" + (e + 1))[1].toLowerCase(), $(xml).find(
						"partita" + (e + 1)).attr("gol"), $(xml).find(
						"partita" + (e + 1)).attr("stato"));
		if (e == 9) {
			// elementi = elementi.sort();
			for (a = 0; a < 10; a++) {
				elencopartite[a] = elementi[a][1];
			}
		}

	}

	$("#p1t1").text(elementi[0][1]);
	$("#p1t2").text(elementi[0][2]);
	$("#partita1-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open( __fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[0][1]
									+ "&idpartita=0" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita1-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[0][2]
									+ "&idpartita=0" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p1t1icon").append(
			"<img src=\"img/icoteam/" + elementi[0][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p1t2icon").append(
			"<img src=\"img/icoteam/" + elementi[0][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[0][4] == "FullTime") {
		$("#partita1").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[0][3] + "</div>");
	} else if (elementi[0][4] == "Postponed") {
		$("#partita1")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita1").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita1").append(
			"<div class=\"data-calendario\" >" + elementi[0][0] + "</div>");

	$("#p2t1").text(elementi[1][1]);
	$("#p2t2").text(elementi[1][2]);
	$("#partita2-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[1][1]
									+ "&idpartita=1" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita2-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[1][2]
									+ "&idpartita=1" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p2t1icon").append(
			"<img src=\"img/icoteam/" + elementi[1][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p2t2icon").append(
			"<img src=\"img/icoteam/" + elementi[1][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[1][4] == "FullTime") {
		$("#partita2").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[1][3] + "</div>");
	} else if (elementi[1][4] == "Postponed") {
		$("#partita2")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita2").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita2").append(
			"<div class=\"data-calendario\" >" + elementi[1][0] + "</div>");

	$("#p3t1").text(elementi[2][1]);
	$("#p3t2").text(elementi[2][2]);
	$("#partita3-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[2][1]
									+ "&idpartita=2" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita3-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[2][2]
									+ "&idpartita=2" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p3t1icon").append(
			"<img src=\"img/icoteam/" + elementi[2][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p3t2icon").append(
			"<img src=\"img/icoteam/" + elementi[2][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[2][4] == "FullTime") {
		$("#partita3").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[2][3] + "</div>");
	} else if (elementi[2][4] == "Postponed") {
		$("#partita3")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita3").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita3").append(
			"<div class=\"data-calendario\" >" + elementi[2][0] + "</div>");

	$("#p4t1").text(elementi[3][1]);
	$("#p4t2").text(elementi[3][2]);
	$("#partita4-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[3][1]
									+ "&idpartita=3" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita4-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[3][2]
									+ "&idpartita=3" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p4t1icon").append(
			"<img src=\"img/icoteam/" + elementi[3][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p4t2icon").append(
			"<img src=\"img/icoteam/" + elementi[3][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[3][4] == "FullTime") {
		$("#partita4").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[3][3] + "</div>");
	} else if (elementi[3][4] == "Postponed") {
		$("#partita4")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita4").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita4").append(
			"<div class=\"data-calendario\" >" + elementi[3][0] + "</div>");

	$("#p5t1").text(elementi[4][1]);
	$("#p5t2").text(elementi[4][2]);
	$("#partita5-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[4][1]
									+ "&idpartita=4" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita5-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[4][2]
									+ "&idpartita=4" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p5t1icon").append(
			"<img src=\"img/icoteam/" + elementi[4][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p5t2icon").append(
			"<img src=\"img/icoteam/" + elementi[4][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[4][4] == "FullTime") {
		$("#partita5").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[4][3] + "</div>");
	} else if (elementi[4][4] == "Postponed") {
		$("#partita5")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita5").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita5").append(
			"<div class=\"data-calendario\" >" + elementi[4][0] + "</div>");

	$("#p6t1").text(elementi[5][1]);
	$("#p6t2").text(elementi[5][2]);
	$("#partita6-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[5][1]
									+ "&idpartita=5" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita6-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[5][2]
									+ "&idpartita=5" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p6t1icon").append(
			"<img src=\"img/icoteam/" + elementi[5][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p6t2icon").append(
			"<img src=\"img/icoteam/" + elementi[5][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[5][4] == "FullTime") {
		$("#partita6").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[5][3] + "</div>");
	} else if (elementi[5][4] == "Postponed") {
		$("#partita6")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita6").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita6").append(
			"<div class=\"data-calendario\" >" + elementi[5][0] + "</div>");

	$("#p7t1").text(elementi[6][1]);
	$("#p7t2").text(elementi[6][2]);
	$("#partita7-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[6][1]
									+ "&idpartita=6" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita7-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[6][2]
									+ "&idpartita=6" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p7t1icon").append(
			"<img src=\"img/icoteam/" + elementi[6][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p7t2icon").append(
			"<img src=\"img/icoteam/" + elementi[6][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[6][4] == "FullTime") {
		$("#partita7").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[6][3] + "</div>");
	} else if (elementi[6][4] == "Postponed") {
		$("#partita7")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita7").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita7").append(
			"<div class=\"data-calendario\" >" + elementi[6][0] + "</div>");

	$("#p8t1").text(elementi[7][1]);
	$("#p8t2").text(elementi[7][2]);
	$("#partita8-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[7][1]
									+ "&idpartita=7" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita8-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[7][2]
									+ "&idpartita=7" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p8t1icon").append(
			"<img src=\"img/icoteam/" + elementi[7][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p8t2icon").append(
			"<img src=\"img/icoteam/" + elementi[7][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[7][4] == "FullTime") {
		$("#partita8").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[7][3] + "</div>");
	} else if (elementi[7][4] == "Postponed") {
		$("#partita8")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita8").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita8").append(
			"<div class=\"data-calendario\" >" + elementi[7][0] + "</div>");

	$("#p9t1").text(elementi[8][1]);
	$("#p9t2").text(elementi[8][2]);
	$("#partita9-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[8][1]
									+ "&idpartita=8" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita9-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[8][2]
									+ "&idpartita=8" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p9t1icon").append(
			"<img src=\"img/icoteam/" + elementi[8][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p9t2icon").append(
			"<img src=\"img/icoteam/" + elementi[8][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[8][4] == "FullTime") {
		$("#partita9").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[8][3] + "</div>");
	} else if (elementi[8][4] == "Postponed") {
		$("#partita9")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita9").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita9").append(
			"<div class=\"data-calendario\" >" + elementi[8][0] + "</div>");

	$("#p10t1").text(elementi[9][1]);
	$("#p10t2").text(elementi[9][2]);
	$("#partita10-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[9][1]
									+ "&idpartita=9" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita10-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[9][2]
									+ "&idpartita=9" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p10t1icon").append(
			"<img src=\"img/icoteam/" + elementi[9][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p10t2icon").append(
			"<img src=\"img/icoteam/" + elementi[9][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[9][4] == "FullTime") {
		$("#partita10").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[9][3] + "</div>");
	} else if (elementi[9][4] == "Postponed") {
		$("#partita10")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita10")
				.append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita10").append(
			"<div class=\"data-calendario\" >" + elementi[9][0] + "</div>");

	fadein();
}
/*
 * function funcBanner(xml) { var randombanner = ""; banner =
 * $(xml).find('banner'); randombanner = Math.floor((Math.random() *
 * banner.length));
 * 
 * bannerx = $(xml).find('banner:eq(' + randombanner + ')'); id =
 * bannerx.find('id').text(); link = bannerx.find('link').text(); nome =
 * bannerx.find('nome').text(); img = bannerx.find('img').text();
 * 
 * if (versiontype == "free") {
 * 
 * $.ajax({ type : "GET", url : urlstat + "&banner=" + nome, dataType : "xml"
 * }); } else { $.ajax({ type : "GET", url : urlstat, dataType : "xml" }); } }
 * function bannerDelay(xml) { setTimeout(function() { funcBanner(xml); },
 * 3000); }
 */
function clickbanner() {
	$.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/analyticsclickbanner.php?uuid="
						+ uuid + "&banner=" + nome + "&callback=?",
				dataType : "xml"
			});
}
function chiudiOverlayer() {
	$("#overlayer").css("display", "none");
}
function funcOverlayer(xml) {
	file = $(xml).find("file").text();
	if (file == "" || file == "undefined") {
		$("#overlayer").css("display", "none");
	} else {

		$("#loading").css("display", "none");

		if (attivaOverlayer == true) {
		}
	}
}
function initializePage() {
	varRandom = Math.random();
	attivaOverlayer = true;
}
function onDeviceReady() {
	var networkState = navigator.connection.type;
	phoneName = device.name;
	platform = device.platform;
	uuid = device.uuid;
	versionos = device.version;	
	
	urlstat = "http://www.indeed.it/formazioni/xml/analytics.php?phoneName="
		+ phoneName
		+ "&platform="
		+ platform
		+ "&uuid="
		+ uuid
		+ "&versionos="
		+ versionos
		+ "&pagina="
		+ pagina
		+ "&versiontype="
		+ versiontype
		+ "&release="
		+ release
		+ "&callback=?";
	
	$.ajax({
		type : "GET",
		url : urlstat,
		dataType : "xml"
	});	
	
	if(versionos.indexOf("4.")===0){
		// disabilita le opzioni
		$("#ico2").hide();
	}
}
function onLoadFn() {
	document.addEventListener("deviceready", onDeviceReady, false);
	initializePage();
}
function fadein() {
	$('#main-calendario').animate({
		opacity : 1,
	}, 500, function() {
		// Animation complete.
	});
}
$(document).ready(
		function() {
			
			showStandardBanner(); // funzione definita in banner.js			
			
			$.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
						+ varRandom,
				dataType : "xml",
				success : parseXml
			});

			$.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/overlayer.xml?var="
						+ varRandom,
				dataType : "xml",
				success : funcOverlayer
			});
		});

var versiontype = "free";
var varRandom = 0;
var release = "1.2";
var phoneName = "";
var platform = "";
var uuid = "";
var versionos = "";
var urlstat = "";
var nome = "";
var attivaOverlayer = false;

function parseXml(xml) {

	// refreshBanner(); // funzione definita in banner.js

	// CONTROLLO BANNER PER LA FREE
	if (versiontype == "free") {
		document.getElementById("main-calendario").style.height = '1056px';
	} else if (versiontype == "pro") {
		document.getElementById("patchPro").style.display = 'block';
	}

	$("#ico2").click(function() {
		$('#main-calendario').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__optionsFilename, '_self')
		});
	});

	$("#nome_header").click(function() {
		$('#main-calendario').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__indexFilename, '_self')
		});
	});

	giornata = $(xml).find("giornata").text();

	$("#giornata").append(giornata + "a giornata");

	arrPartita1 = $(xml).find("partita1").text().split("-");
	arrPartita2 = $(xml).find("partita2").text().split("-");
	arrPartita3 = $(xml).find("partita3").text().split("-");
	arrPartita4 = $(xml).find("partita4").text().split("-");
	arrPartita5 = $(xml).find("partita5").text().split("-");
	arrPartita6 = $(xml).find("partita6").text().split("-");
	arrPartita7 = $(xml).find("partita7").text().split("-");
	arrPartita8 = $(xml).find("partita8").text().split("-");
	arrPartita9 = $(xml).find("partita9").text().split("-");
	arrPartita10 = $(xml).find("partita10").text().split("-");

	elementi = new Array();
	elencopartite = new Array();
	for (e = 0; e < 10; e++) {
		elementi[e] = new Array($(xml).find("partita" + (e + 1)).attr("data"),
				eval("arrPartita" + (e + 1))[0].toLowerCase(),
				eval("arrPartita" + (e + 1))[1].toLowerCase(), $(xml).find(
						"partita" + (e + 1)).attr("gol"), $(xml).find(
						"partita" + (e + 1)).attr("stato"));
		if (e == 9) {
			// elementi = elementi.sort();
			for (a = 0; a < 10; a++) {
				elencopartite[a] = elementi[a][1];
			}
		}

	}

	$("#p1t1").text(elementi[0][1]);
	$("#p1t2").text(elementi[0][2]);
	$("#partita1-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[0][1]
									+ "&idpartita=0" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita1-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[0][2]
									+ "&idpartita=0" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p1t1icon").append(
			"<img src=\"img/icoteam/" + elementi[0][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p1t2icon").append(
			"<img src=\"img/icoteam/" + elementi[0][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[0][4] == "FullTime") {
		$("#partita1").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[0][3] + "</div>");
	} else if (elementi[0][4] == "Postponed") {
		$("#partita1")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita1").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita1").append(
			"<div class=\"data-calendario\" >" + elementi[0][0] + "</div>");

	$("#p2t1").text(elementi[1][1]);
	$("#p2t2").text(elementi[1][2]);
	$("#partita2-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[1][1]
									+ "&idpartita=1" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita2-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[1][2]
									+ "&idpartita=1" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p2t1icon").append(
			"<img src=\"img/icoteam/" + elementi[1][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p2t2icon").append(
			"<img src=\"img/icoteam/" + elementi[1][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[1][4] == "FullTime") {
		$("#partita2").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[1][3] + "</div>");
	} else if (elementi[1][4] == "Postponed") {
		$("#partita2")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita2").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita2").append(
			"<div class=\"data-calendario\" >" + elementi[1][0] + "</div>");

	$("#p3t1").text(elementi[2][1]);
	$("#p3t2").text(elementi[2][2]);
	$("#partita3-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[2][1]
									+ "&idpartita=2" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita3-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[2][2]
									+ "&idpartita=2" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p3t1icon").append(
			"<img src=\"img/icoteam/" + elementi[2][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p3t2icon").append(
			"<img src=\"img/icoteam/" + elementi[2][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[2][4] == "FullTime") {
		$("#partita3").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[2][3] + "</div>");
	} else if (elementi[2][4] == "Postponed") {
		$("#partita3")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita3").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita3").append(
			"<div class=\"data-calendario\" >" + elementi[2][0] + "</div>");

	$("#p4t1").text(elementi[3][1]);
	$("#p4t2").text(elementi[3][2]);
	$("#partita4-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[3][1]
									+ "&idpartita=3" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita4-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[3][2]
									+ "&idpartita=3" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p4t1icon").append(
			"<img src=\"img/icoteam/" + elementi[3][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p4t2icon").append(
			"<img src=\"img/icoteam/" + elementi[3][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[3][4] == "FullTime") {
		$("#partita4").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[3][3] + "</div>");
	} else if (elementi[3][4] == "Postponed") {
		$("#partita4")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita4").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita4").append(
			"<div class=\"data-calendario\" >" + elementi[3][0] + "</div>");

	$("#p5t1").text(elementi[4][1]);
	$("#p5t2").text(elementi[4][2]);
	$("#partita5-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[4][1]
									+ "&idpartita=4" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita5-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[4][2]
									+ "&idpartita=4" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p5t1icon").append(
			"<img src=\"img/icoteam/" + elementi[4][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p5t2icon").append(
			"<img src=\"img/icoteam/" + elementi[4][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[4][4] == "FullTime") {
		$("#partita5").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[4][3] + "</div>");
	} else if (elementi[4][4] == "Postponed") {
		$("#partita5")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita5").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita5").append(
			"<div class=\"data-calendario\" >" + elementi[4][0] + "</div>");

	$("#p6t1").text(elementi[5][1]);
	$("#p6t2").text(elementi[5][2]);
	$("#partita6-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[5][1]
									+ "&idpartita=5" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita6-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[5][2]
									+ "&idpartita=5" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p6t1icon").append(
			"<img src=\"img/icoteam/" + elementi[5][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p6t2icon").append(
			"<img src=\"img/icoteam/" + elementi[5][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[5][4] == "FullTime") {
		$("#partita6").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[5][3] + "</div>");
	} else if (elementi[5][4] == "Postponed") {
		$("#partita6")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita6").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita6").append(
			"<div class=\"data-calendario\" >" + elementi[5][0] + "</div>");

	$("#p7t1").text(elementi[6][1]);
	$("#p7t2").text(elementi[6][2]);
	$("#partita7-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[6][1]
									+ "&idpartita=6" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita7-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[6][2]
									+ "&idpartita=6" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p7t1icon").append(
			"<img src=\"img/icoteam/" + elementi[6][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p7t2icon").append(
			"<img src=\"img/icoteam/" + elementi[6][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[6][4] == "FullTime") {
		$("#partita7").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[6][3] + "</div>");
	} else if (elementi[6][4] == "Postponed") {
		$("#partita7")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita7").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita7").append(
			"<div class=\"data-calendario\" >" + elementi[6][0] + "</div>");

	$("#p8t1").text(elementi[7][1]);
	$("#p8t2").text(elementi[7][2]);
	$("#partita8-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[7][1]
									+ "&idpartita=7" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita8-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[7][2]
									+ "&idpartita=7" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p8t1icon").append(
			"<img src=\"img/icoteam/" + elementi[7][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p8t2icon").append(
			"<img src=\"img/icoteam/" + elementi[7][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[7][4] == "FullTime") {
		$("#partita8").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[7][3] + "</div>");
	} else if (elementi[7][4] == "Postponed") {
		$("#partita8")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita8").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita8").append(
			"<div class=\"data-calendario\" >" + elementi[7][0] + "</div>");

	$("#p9t1").text(elementi[8][1]);
	$("#p9t2").text(elementi[8][2]);
	$("#partita9-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[8][1]
									+ "&idpartita=8" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita9-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[8][2]
									+ "&idpartita=8" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p9t1icon").append(
			"<img src=\"img/icoteam/" + elementi[8][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p9t2icon").append(
			"<img src=\"img/icoteam/" + elementi[8][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[8][4] == "FullTime") {
		$("#partita9").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[8][3] + "</div>");
	} else if (elementi[8][4] == "Postponed") {
		$("#partita9")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita9").append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita9").append(
			"<div class=\"data-calendario\" >" + elementi[8][0] + "</div>");

	$("#p10t1").text(elementi[9][1]);
	$("#p10t2").text(elementi[9][2]);
	$("#partita10-casa").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[9][1]
									+ "&idpartita=9" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#partita10-fuori").click(
			function() {
				$('#main-calendario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open(__fieldFilename + "?giornata="
									+ giornata + "&team=" + elementi[9][2]
									+ "&idpartita=9" + "&elencopartite="
									+ elencopartite, '_self')
						});
			});
	$("#p10t1icon").append(
			"<img src=\"img/icoteam/" + elementi[9][1]
					+ ".png\" class=\"imgteam1\">");
	$("#p10t2icon").append(
			"<img src=\"img/icoteam/" + elementi[9][2]
					+ ".png\" class=\"imgteam2\">");
	if (elementi[9][4] == "FullTime") {
		$("#partita10").append(
				"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;\">"
						+ elementi[9][3] + "</div>");
	} else if (elementi[9][4] == "Postponed") {
		$("#partita10")
				.append(
						"<div id=\"versus1\" class=\"versus versus-index\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
	} else {
		$("#partita10")
				.append("<div id=\"versus1\" class=\"versus versus-index\" >vs</div>");
	}
	$("#partita10").append(
			"<div class=\"data-calendario\" >" + elementi[9][0] + "</div>");

	fadein();
}
function funcBanner(xml) {
	var randombanner = "";
	banner = $(xml).find('banner');
	randombanner = Math.floor((Math.random() * banner.length));

	bannerx = $(xml).find('banner:eq(' + randombanner + ')');
	id = bannerx.find('id').text();
	link = bannerx.find('link').text();
	nome = bannerx.find('nome').text();
	img = bannerx.find('img').text();

	if (versiontype == "free") {
		$.ajax({
			type : "GET",
			url : urlstat + "&banner=" + nome,
			dataType : "xml"
		});
	} else {
		$.ajax({
			type : "GET",
			url : urlstat,
			dataType : "xml"
		});
	}
}
function bannerDelay(xml) {
	setTimeout(function() {
		funcBanner(xml);
	}, 3000);
}
function clickbanner() {
	$
			.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/analyticsclickbanner.php?uuid="
						+ uuid + "&banner=" + nome + "&callback=?",
				dataType : "xml"
			});
}
function chiudiOverlayer() {
	$("#overlayer").css("display", "none");
}
function funcOverlayer(xml) {
	file = $(xml).find("file").text();
	if (file == "" || file == "undefined") {
		$("#overlayer").css("display", "none");
	} else {

		$("#loading").css("display", "none");

		if (attivaOverlayer == true) {
		}
	}
}
function initializePage() {
	varRandom = Math.random();
	attivaOverlayer = true;
}
function onDeviceReady() {
	var networkState = navigator.connection.type;
	phoneName = device.name;
	platform = device.platform;
	uuid = device.uuid;
	versionos = device.version;

	urlstat = "http://www.indeed.it/formazioni/xml/analytics.php?phoneName="
			+ phoneName
			+ "&platform="
			+ platform
			+ "&uuid="
			+ uuid
			+ "&versionos="
			+ versionos
			+ "&pagina="
			+ pagina
			+ "&versiontype="
			+ versiontype
			+ "&release="
			+ release
			+ "&callback=?";
	
	$.ajax({
		type : "GET",
		url : urlstat,
		dataType : "xml"
	});		
	
	if(versionos.indexOf("4.")===0){
		// disabilita le opzioni
		$("#ico2").hide();
	}
}
function onLoadFn() {
	document.addEventListener("deviceready", onDeviceReady, false);
	initializePage();
}
function fadein() {
	$('#main-calendario').animate({
		opacity : 1,
	}, 500, function() {
		// Animation complete.
	});
}
$(document).ready(
		function() {

			showStandardBanner(); // funzione definita in banner.js
			
			$.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
						+ varRandom,
				dataType : "xml",
				success : parseXml
			});

			$.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/overlayer.xml?var="
						+ varRandom,
				dataType : "xml",
				success : funcOverlayer
			});
		});

var __bannerReadyCB = null;
var __adMobBannerEnabled = false; // abilita il banner di AdMob e disabilita
// quello html (e viceversa)

function initializeBanner(callback) {
	if (IsAdMobEnabled()) {
		__bannerReadyCB = callback;
		window.plugins.AdMob.createBannerView({
			'publisherId' : 'a150d0423a28dad',
			'adSize' : AdMob.AD_SIZE.BANNER,
			'positionAtTop' : false,
			'isTesting' : false
		}, SuccessBannerView, Fail);
	}
}

function showStandardBanner() {
	if (!IsAdMobEnabled()) {
		$('#bannerADV').hide().delay(3000).fadeIn(1000);
	} else {
		$('#bannerADV').hide();
	}
}

function IsAdMobEnabled() {
	return __adMobBannerEnabled;
}

function SuccessBannerView() {
	try {
		window.plugins.AdMob.requestAd({
			'isTesting' : false
		}, SuccessBannerRequest, Fail);
	} catch (ex) {
	}
}

function SuccessBannerRequest() {
	if (__bannerReadyCB != null) {
		__bannerReadyCB();
	}
}

function Fail() {
	if (__bannerReadyCB != null) {
		__bannerReadyCB();
	}
}

var versiontype = "free";
var release = "1.2";
var phoneName = "";
var platform = "";
var uuid = "";
var versionos = "";
var urlstat = "";
var nome = "";
var qs = "";
var varRandom = "";

var qs = location.search;
if (qs) {
	var giornata, team, idpartita, elencopartite;

	giornata = qs.split("?");
	giornata = giornata[1].split("&");
	giornata = giornata[0].substring(9);

	team = qs.split("&");
	team = team[1].substring(5);

	idpartita = qs.split("&");
	idpartita = idpartita[2].substring(10);

	elencopartite = qs.split("&");
	elencopartite = elencopartite[3].substring(14);

	giornata == "" ? giornata = "Non definito" : giornata = giornata;
	team == "" ? team = "Non definito" : team = team;
	idpartita == "" ? idpartita = "Non definito" : idpartita = idpartita;
	elencopartite == "" ? elencopartite = "Non definito"
			: elencopartite = elencopartite;

	idpartita = parseInt(idpartita);
	elenco = elencopartite.split(",");

	if (idpartita == 0) {
		// prima partita
		teamidprev = 9;
		teamprev = elenco[teamidprev];
		teamidnext = idpartita + 1;
		teamnext = elenco[teamidnext];

	} else if (idpartita == 9) {
		// ultima partita
		teamidprev = idpartita - 1;
		teamprev = elenco[teamidprev];
		teamidnext = 0;
		teamnext = elenco[teamidnext];
	} else {
		// tutte le altre
		teamidprev = idpartita - 1;
		teamprev = elenco[teamidprev];
		teamidnext = idpartita + 1;
		teamnext = elenco[teamidnext];
	}

} else {
	document.write("Nessuna querystring definita");
}

varRandom = Math.random();

$(document)
		.ready(
				function() {					

					showStandardBanner(); // funzione definita in banner.js
					
					$.ajax({
						type : "GET",
						url : "http://www.indeed.it/formazioni/xml/" + giornata
								+ "/" + team + ".xml?var=" + varRandom,
						dataType : "xml",
						success : parseXml
					});
					$
							.ajax({
								type : "GET",
								url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
										+ varRandom,
								dataType : "xml",
								success : funcGiornata
							});

				});

function onDeviceReady() {	
	phoneName = device.name;
	platform = device.platform;
	uuid = device.uuid;
	versionos = device.version;	
	
	urlstat = "http://www.indeed.it/formazioni/xml/analytics.php?phoneName="
		+ phoneName
		+ "&platform="
		+ platform
		+ "&uuid="
		+ uuid
		+ "&versionos="
		+ versionos
		+ "&pagina="
		+ pagina
		+ "&versiontype="
		+ versiontype
		+ "&release="
		+ release
		+ "&callback=?";
	
	$.ajax({
		type : "GET",
		url : urlstat,
		dataType : "xml"
	});	
}

function onLoadFn() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function funcBanner(xml) {
	var randombanner = "";
	banner = $(xml).find('banner');
	randombanner = Math.floor((Math.random() * banner.length));
	// randombanner = parseInt(randombanner);

	bannerx = $(xml).find('banner:eq(' + randombanner + ')');
	id = bannerx.find('id').text();
	link = bannerx.find('link').text();
	nome = bannerx.find('nome').text();
	img = bannerx.find('img').text();

	if (banner.length > 0 && versiontype == "free") {
		// $("#bannerADV").append('<a href="'+link+'" target="_blank"
		// onclick="clickbanner()"><img src="'+img+'" name="'+nome+'"
		// border="0"></a>');
		// $("#bannerADV").show();
	} else {

	}
	if (versiontype == "free") {
		$.ajax({
			type : "GET",
			url : urlstat + "&banner=" + nome,
			dataType : "xml"
		});
	} else {
		$.ajax({
			type : "GET",
			url : urlstat,
			dataType : "xml"
		});
	}

}
function clickbanner() {
	$
			.ajax({
				type : "GET",
				url : "http://www.indeed.it/formazioni/xml/analyticsclickbanner.php?uuid="
						+ uuid + "&banner=" + nome,
				dataType : "xml"
			});
}

function funcGiornata(xml) {

	// CONTROLLO BANNER PER LA FREE
	if (versiontype == "free") {

		// document.getElementById("bannerADV").style.display = 'block';
		document.getElementById("main").style.height = '1100px';
	} else if (versiontype == "pro") {
		document.getElementById("patchPro").style.display = 'block';
	}

	window.xmlGiornata = xml;
	for (i = 1; i < 11; i++) {
		if (window.squadraA.toUpperCase() == $(xml).find("partita" + i).text()
				.split("-", 1)) {

			risultato = $(xml).find("partita" + i).attr("gol");
			stato = $(xml).find("partita" + i).attr("stato");

			if (stato == "FullTime") {
				$("#match").append(
						"<div id=\"versus1\" class=\"versus\" style=\"color:#b94543;\">"
								+ risultato + "</div>");
			} else if (stato == "Postponed") {
				$("#match")
						.append(
								"<div id=\"versus1\" class=\"versus\" style=\"color:#b94543;text-transform: lowercase;\">rinv</div>");
			} else {
				$("#match").append(
						"<div id=\"versus1\" class=\"versus\" >vs</div>");
			}

		}
	}
}

function parseXml(xml) {

	// controllo il MODULO e carico CSS
	modulo = $(xml).find("modulo").text();
	moduliDisp = new Array("3-4-1-2", "3-4-2-1", "3-4-3", "3-5-1-1", "3-5-2",
			"4-2-3-1", "4-2-4", "4-3-1-2", "4-3-2-1", "4-3-3", "4-4-1-1",
			"4-4-2", "5-3-2", "5-4-1", "4-5-1");
	// se il MODULO della squadra non è tra quelli fatti carica un classico
	// 4-4-2
	$("#cssmoduli").attr({
		href : "moduli/4-4-2.css"
	});
	for (i = 0; i < moduliDisp.length; i++) {
		if (modulo == moduliDisp[i]) {
			$("#cssmoduli").attr({
				href : "moduli/" + modulo + ".css"
			});
		}
	}

	squadra = $(xml).find("squadra").text().toLowerCase();
	arrSquadre = $(xml).find("partita").text().split("-");
	squadraA = arrSquadre[0].toLowerCase();
	squadraB = arrSquadre[1].toLowerCase();
	var squadraA = squadraA.replace(' ', '');
	var squadraB = squadraB.replace(' ', '');
	window.squadraA = squadraA;

	if (squadra == squadraA) {
		avversario = squadraB;
	} else if (squadra == squadraB) {
		avversario = squadraA;
	}

	$("#ico1").click(function() {
		$('#main').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__indexFilename, '_self')
		});
	});

	$("#ico2").click(function() {
		$('#main').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__optionsFilename, '_self')
		});
	});

	$("#nome_header").click(function() {
		$('#main').animate({
			opacity : 0,
		}, 500, function() {
			window.open(__indexFilename, '_self')
		});
	});

	$("#giornata").append($(xml).find("giornata").text() + "a giornata");

	// $("#teamcasa>a").attr("href","?team="+ squadraA +
	// "&idpartita="+idpartita+"&elencopartite="+elencopartite+"");
	// $("#icoteam1>a").attr("href","?team="+ squadraA +
	// "&idpartita="+idpartita+"&elencopartite="+elencopartite+"");
	$("#nometeam1, .icoteam1").click(
			function() {
				$('.player,#panchina,#pos_ico_avversario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open("?giornata=" + giornata + "&team="
									+ squadraA + "&idpartita=" + idpartita
									+ "&elencopartite=" + elencopartite + "",
									'_self')
						});
			});
	$("#nometeam1").text(squadraA);
	$(".ico_campo").attr("src", "img/ico_campo.png");
	$(".imgteam1").attr("src", "img/icoteam/" + squadraA + ".png");

	// $("#teamfuori>a").attr("href","?team="+ squadraB +
	// "&idpartita="+idpartita+"&elencopartite="+elencopartite+"");
	// $("#icoteam2>a").attr("href","?team="+ squadraB +
	// "&idpartita="+idpartita+"&elencopartite="+elencopartite+"");
	$("#nometeam2, .icoteam2").click(
			function() {
				$('.player,#panchina,#pos_ico_avversario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open("?giornata=" + giornata + "&team="
									+ squadraB + "&idpartita=" + idpartita
									+ "&elencopartite=" + elencopartite + "",
									'_self')
						});
			});
	$("#nometeam2").text(squadraB);
	$(".ico_campo").attr("src", "img/ico_campo.png");
	$(".imgteam2").attr("src", "img/icoteam/" + squadraB + ".png");

	// $("#link_avversario").attr("href","?team="+ avversario +
	// "&idpartita="+idpartita+"&elencopartite="+elencopartite+"");
	$("#link_avversario").click(
			function() {
				$('.player,#panchina,#pos_ico_avversario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open("?giornata=" + giornata + "&team="
									+ avversario + "&idpartita=" + idpartita
									+ "&elencopartite=" + elencopartite + "",
									'_self')
						});
			});
	$("#pos_ico_avversario").attr("src", "img/icoteam/" + avversario + ".png");

	ora = $(xml).find("ora").text().toLowerCase();
	$("#data").append($(xml).find("data").text() + " " + ora);

	var nomePlayer1 = $(xml).find("calciatore:eq(0)").text();
	var numeroPlayer1 = $(xml).find("calciatore:eq(0)").attr("number");
	var nomePlayer2 = $(xml).find("calciatore:eq(1)").text();
	var numeroPlayer2 = $(xml).find("calciatore:eq(1)").attr("number");
	var nomePlayer3 = $(xml).find("calciatore:eq(2)").text();
	var numeroPlayer3 = $(xml).find("calciatore:eq(2)").attr("number");
	var nomePlayer4 = $(xml).find("calciatore:eq(3)").text();
	var numeroPlayer4 = $(xml).find("calciatore:eq(3)").attr("number");
	var nomePlayer5 = $(xml).find("calciatore:eq(4)").text();
	var numeroPlayer5 = $(xml).find("calciatore:eq(4)").attr("number");
	var nomePlayer6 = $(xml).find("calciatore:eq(5)").text();
	var numeroPlayer6 = $(xml).find("calciatore:eq(5)").attr("number");
	var nomePlayer7 = $(xml).find("calciatore:eq(6)").text();
	var numeroPlayer7 = $(xml).find("calciatore:eq(6)").attr("number");
	var nomePlayer8 = $(xml).find("calciatore:eq(7)").text();
	var numeroPlayer8 = $(xml).find("calciatore:eq(7)").attr("number");
	var nomePlayer9 = $(xml).find("calciatore:eq(8)").text();
	var numeroPlayer9 = $(xml).find("calciatore:eq(8)").attr("number");
	var nomePlayer10 = $(xml).find("calciatore:eq(9)").text();
	var numeroPlayer10 = $(xml).find("calciatore:eq(9)").attr("number");
	var nomePlayer11 = $(xml).find("calciatore:eq(10)").text();
	var numeroPlayer11 = $(xml).find("calciatore:eq(10)").attr("number");

	var nomePlayer12 = $(xml).find("calciatore:eq(11)").text();
	var numeroPlayer12 = $(xml).find("calciatore:eq(11)").attr("number");
	var nomePlayer13 = $(xml).find("calciatore:eq(12)").text();
	var numeroPlayer13 = $(xml).find("calciatore:eq(12)").attr("number");
	var nomePlayer14 = $(xml).find("calciatore:eq(13)").text();
	var numeroPlayer14 = $(xml).find("calciatore:eq(13)").attr("number");
	var nomePlayer15 = $(xml).find("calciatore:eq(14)").text();
	var numeroPlayer15 = $(xml).find("calciatore:eq(14)").attr("number");
	var nomePlayer16 = $(xml).find("calciatore:eq(15)").text();
	var numeroPlayer16 = $(xml).find("calciatore:eq(15)").attr("number");
	var nomePlayer17 = $(xml).find("calciatore:eq(16)").text();
	var numeroPlayer17 = $(xml).find("calciatore:eq(16)").attr("number");
	var nomePlayer18 = $(xml).find("calciatore:eq(17)").text();
	var numeroPlayer18 = $(xml).find("calciatore:eq(17)").attr("number");
	var nomePlayer19 = $(xml).find("calciatore:eq(18)").text();
	var numeroPlayer19 = $(xml).find("calciatore:eq(18)").attr("number");
	var nomePlayer20 = $(xml).find("calciatore:eq(19)").text();
	var numeroPlayer20 = $(xml).find("calciatore:eq(19)").attr("number");
	var nomePlayer21 = $(xml).find("calciatore:eq(20)").text();
	var numeroPlayer21 = $(xml).find("calciatore:eq(20)").attr("number");
	var nomePlayer22 = $(xml).find("calciatore:eq(21)").text();
	var numeroPlayer22 = $(xml).find("calciatore:eq(21)").attr("number");
	var nomePlayer23 = $(xml).find("calciatore:eq(22)").text();
	var numeroPlayer23 = $(xml).find("calciatore:eq(22)").attr("number");

	moduloSeparato = modulo.split("-");
	// moduloSeparato[0];

	// mescolo la posizione dei giocatori
	if (moduloSeparato[0] == "3") {
		var nomePlayer2 = $(xml).find("calciatore:eq(3)").text();
		var numeroPlayer2 = $(xml).find("calciatore:eq(3)").attr("number");
		var nomePlayer4 = $(xml).find("calciatore:eq(1)").text();
		var numeroPlayer4 = $(xml).find("calciatore:eq(1)").attr("number");
	}
	if (moduloSeparato[0] == "4") {
		var nomePlayer3 = $(xml).find("calciatore:eq(3)").text();
		var numeroPlayer3 = $(xml).find("calciatore:eq(3)").attr("number");
		var nomePlayer4 = $(xml).find("calciatore:eq(2)").text();
		var numeroPlayer4 = $(xml).find("calciatore:eq(2)").attr("number");
		if (modulo == "4-3-3" || modulo == "4-3-1-2" || modulo == "4-3-2-1") {
			var nomePlayer6 = $(xml).find("calciatore:eq(7)").text();
			var numeroPlayer6 = $(xml).find("calciatore:eq(7)").attr("number");
			var nomePlayer8 = $(xml).find("calciatore:eq(5)").text();
			var numeroPlayer8 = $(xml).find("calciatore:eq(5)").attr("number");
		}
	}
	if (moduloSeparato[0] == "5") {
		var nomePlayer3 = $(xml).find("calciatore:eq(4)").text();
		var numeroPlayer3 = $(xml).find("calciatore:eq(4)").attr("number");
		var nomePlayer5 = $(xml).find("calciatore:eq(2)").text();
		var numeroPlayer5 = $(xml).find("calciatore:eq(2)").attr("number");
	}

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player1\" >");
	$("#player1").append(
			"<img src=\"img/icoteam/portiere.png\" id=\"size_player1\">");
	$("#player1").append(
			"<p id=\"pos_nome_player1\"><span>" + nomePlayer1 + "</span></p>");
	$("#player1").append(
			"<div id=\"number_player1\" class=\"numeri\">" + numeroPlayer1
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player2\" >");
	$("#player2")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player2\">");
	$("#player2").append(
			"<p id=\"pos_nome_player2\"><span>" + nomePlayer2 + "</span></p>");
	$("#player2").append(
			"<div id=\"number_player2\" class=\"numeri\">" + numeroPlayer2
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player3\" >");
	$("#player3")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player3\">");
	$("#player3").append(
			"<p id=\"pos_nome_player3\"><span>" + nomePlayer3 + "</span></p>");
	$("#player3").append(
			"<div id=\"number_player3\" class=\"numeri\">" + numeroPlayer3
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player4\" >");
	$("#player4")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player4\">");
	$("#player4").append(
			"<p id=\"pos_nome_player4\"><span>" + nomePlayer4 + "</span></p>");
	$("#player4").append(
			"<div id=\"number_player4\" class=\"numeri\">" + numeroPlayer4
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player5\" >");
	$("#player5")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player5\">");
	$("#player5").append(
			"<p id=\"pos_nome_player5\"><span>" + nomePlayer5 + "</span></p>");
	$("#player5").append(
			"<div id=\"number_player5\" class=\"numeri\">" + numeroPlayer5
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player6\" >");
	$("#player6")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player6\">");
	$("#player6").append(
			"<p id=\"pos_nome_player6\"><span>" + nomePlayer6 + "</span></p>");
	$("#player6").append(
			"<div id=\"number_player6\" class=\"numeri\">" + numeroPlayer6
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player7\" >");
	$("#player7")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player7\">");
	$("#player7").append(
			"<p id=\"pos_nome_player7\"><span>" + nomePlayer7 + "</span></p>");
	$("#player7").append(
			"<div id=\"number_player7\" class=\"numeri\">" + numeroPlayer7
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player8\" >");
	$("#player8")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player8\">");
	$("#player8").append(
			"<p id=\"pos_nome_player8\"><span>" + nomePlayer8 + "</span></p>");
	$("#player8").append(
			"<div id=\"number_player8\" class=\"numeri\">" + numeroPlayer8
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player9\" >");
	$("#player9")
			.append(
					"<img src=\"img/icoteam/" + squadra
							+ ".png\" id=\"size_player9\">");
	$("#player9").append(
			"<p id=\"pos_nome_player9\"><span>" + nomePlayer9 + "</span></p>");
	$("#player9").append(
			"<div id=\"number_player9\" class=\"numeri\">" + numeroPlayer9
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player10\" >");
	$("#player10").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" id=\"size_player10\">");
	$("#player10")
			.append(
					"<p id=\"pos_nome_player10\"><span>" + nomePlayer10
							+ "</span></p>");
	$("#player10").append(
			"<div id=\"number_player10\" class=\"numeri\">" + numeroPlayer10
					+ "</div>");

	$("#campo")
			.append(
					"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player11\" >");
	$("#player11").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" id=\"size_player11\">");
	$("#player11")
			.append(
					"<p id=\"pos_nome_player11\"><span>" + nomePlayer11
							+ "</span></p>");
	$("#player11").append(
			"<div id=\"number_player11\" class=\"numeri\">" + numeroPlayer11
					+ "</div>");

	/* panchina chiusa */
	$("#panchina").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" class=\"ico_panchina4\" >");
	$("#panchina").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" class=\"ico_panchina3\" >");
	$("#panchina").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" class=\"ico_panchina2\" >");
	$("#panchina").append(
			"<img src=\"img/icoteam/" + squadra
					+ ".png\" class=\"ico_panchina1\" >");
	$("#panchina").append(
			"<img src=\"img/panchina_pls.png\" id=\"pos_etichetta_panchina\">");

	/* panchina aperta */
	if (numeroPlayer13 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina2\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer13
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer13 + "</div></div>");
	}

	if (numeroPlayer14 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina4\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer14
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer14 + "</div></div>");
	}

	if (numeroPlayer16 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina6\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer16
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer16 + "</div></div>");
	}

	if (numeroPlayer19 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina8\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer19
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer19 + "</div></div>");
	}

	if (numeroPlayer21 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina10\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer21
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer21 + "</div></div>");
	}

	if (numeroPlayer23 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina12\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer23
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer23 + "</div></div>");
	}

	if (numeroPlayer12 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina1\"><img src=\"img/icoteam/portiere.png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer12
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer12 + "</div></div>");
	}

	if (numeroPlayer15 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina3\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer15
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer15 + "</div></div>");
	}

	if (numeroPlayer17 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina5\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer17
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer17 + "</div></div>");
	}

	if (numeroPlayer18 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina7\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer18
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer18 + "</div></div>");
	}

	if (numeroPlayer20 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina9\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer20
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer20 + "</div></div>");
	}

	if (numeroPlayer22 != undefined) {
		$("#giocatori-panchina")
				.append(
						"<a href=\"javascript:apriBannerPRO();\"><div class=\"player\" id=\"player-panchina11\"><img src=\"img/icoteam/"
								+ squadra
								+ ".png\" id=\"size_player-panchina\"><p id=\"pos_nome_player-panchina\"><span>"
								+ nomePlayer22
								+ "</span></p><div id=\"number_player-panchina\" class=\"numeri\">"
								+ numeroPlayer22 + "</div></div>");
	}

	$("#panchina-aperta").append(
			"<div id=\"allenatore\">Allenatore: <b>"
					+ $(xml).find("allenatore").text() + "</b></div>");
	$("#panchina-aperta")
			.append(
					"<div id=\"banner-sotto-panchina\"><a href=\"market://details?id=it.indeed.formazioniPro\" target=\"_blank\"><img src=\"img/banner-sotto-panchina.png\" /></a></div>");

	$("#prev").append("<img src=\"img/ico_prev.png\">");
	$("#prev").click(
			function() {
				$('.player,#panchina,#pos_ico_avversario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open("?giornata=" + giornata + "&team="
									+ teamprev + "&idpartita=" + teamidprev
									+ "&elencopartite=" + elencopartite,
									'_self')
						});
			});

	$("#next").append("<img src=\"img/ico_next.png\">");
	$("#next").click(
			function() {
				$('.player,#panchina,#pos_ico_avversario').animate(
						{
							opacity : 0,
						},
						500,
						function() {
							window.open("?giornata=" + giornata + "&team="
									+ teamnext + "&idpartita=" + teamidnext
									+ "&elencopartite=" + elencopartite,
									'_self')
						});
			});
	funcGiornata(window.xmlGiornata);
	fadein();

}

function apriPanchina() {
	if (document.getElementById) {
		document.getElementById("panchina-aperta").style.display = 'block';
		$("#panchina-aperta").animate({
			"zoom" : "1",
			"filter" : "alpha(opacity=100)",
			"opacity" : "1"
		}, 200, // velocit� animazione
		"linear", // andamento lineare
		function() {
			document.getElementById("panchina").style.display = 'none';
		});

		// se è 768 sposto temporaneamente next/prev
		if (pagina == "768_campo") {
			document.getElementById("next").style.top = '-374px';
			document.getElementById("prev").style.top = '-313px';

			document.getElementById("bannerPROimg").style.top = '-366px';
			document.getElementById("bannerPROchiudi").style.top = '-381px';
		}
	}
}
function chiudiPanchina() {
	document.getElementById("panchina").style.display = 'block';
	$("#panchina-aperta").animate({
		"zoom" : "1",
		"filter" : "alpha(opacity=0)",
		"opacity" : "0"
	}, 200, // velocit� animazione
	"linear", // andamento lineare
	function() {
		document.getElementById("panchina-aperta").style.display = 'none';
		// se è 768 riposiziono next/prev
		if (pagina == "768_campo") {
			document.getElementById("next").style.top = '103px';
			document.getElementById("prev").style.top = '164px';

			document.getElementById("bannerPROimg").style.top = '111px';
			document.getElementById("bannerPROchiudi").style.top = '96px';
		}
	});
}

$(function fadein() {
	$('#match,.player,#panchina,#pos_ico_avversario,.ico_campo').animate({
		opacity : 1,
	}, 500, function() {
		// Animation complete.
	});

});

function calciatore(numero, nome) {
	currentNumero = numero;
	currentNome = nome;
	if (versiontype == "free") {
		apriBannerPRO();
	} else if (versiontype == "pro") {
		$.ajax({
			type : "GET",
			url : "http://www.indeed.it/formazioni/xml/data.php?squadra="
					+ squadra + "&numero=" + currentNumero,
			dataType : "xml",
			success : apriCalciatore
		});

	}
}

function apriCalciatore(xml) {

	// ripulisco i nodi prima di ricrearli
	$('#iconaCalciatore').remove();
	$('#dati').remove();
	$('#aggiornamento').remove();
	// ricreo la struttura portante
	$("#datiCalciatore").append(
			"<div id=\"iconaCalciatore\" class=\"player\"></div>");
	$("#datiCalciatore").append("<ul id=\"dati\"></ul>");
	$("#datiCalciatore").append("<div id=\"aggiornamento\" ></div>");

	squadra = $(xml).find("squadra").text();
	if ($(xml).find("nome").text() == "") {
		nome = currentNome;
	} else {
		nome = $(xml).find("nome").text();
	}
	numero = $(xml).find("numero").text();
	presenze = $(xml).find("presenze").text();
	gol = $(xml).find("gol").text();
	assist = $(xml).find("assist").text();
	ammonizioni = $(xml).find("ammonizioni").text();
	espulsioni = $(xml).find("espulsioni").text();
	voto = $(xml).find("voto").text();
	ruolo = $(xml).find("ruolo").text();
	aggData = $(xml).find("aggData").text();
	aggGio = $(xml).find("aggGio").text();

	document.getElementById("overlayerCalciatore").style.display = 'block';

	$("#iconaCalciatore").append(
			"<img src=\"img/icoteam/" + squadra + ".png\">");
	$("#iconaCalciatore")
			.append(
					"<p id=\"pos_nome_playerN\" style=\"width:15.5em; margin-left: -6em;\"><span style=\"font-size: 26px;\" >"
							+ nome + "</span></p>");
	$("#iconaCalciatore").append(
			"<div id=\"number_playerN\" class=\"numeri\">" + numero + "</div>");

	$("#dati").append("<li class=\"txtNum\">" + presenze + "</li>");
	$("#dati").append("<li class=\"txtDesc\">presenze</li>");
	$("#dati").append("<li class=\"txtNum\">" + Math.abs(gol) + "</li>");
	if (ruolo == "portiere") {
		$("#dati").append("<li class=\"txtDesc\">gol subiti</li>");
	} else {
		$("#dati").append("<li class=\"txtDesc\">gol</li>");
	}
	$("#dati").append("<li class=\"txtNum\">" + assist + "</li>");
	$("#dati").append("<li class=\"txtDesc\">assist</li>");
	$("#dati").append("<li class=\"txtNum\">" + ammonizioni + "</li>");
	$("#dati").append("<li class=\"txtDesc\">ammonizioni</li>");
	$("#dati").append("<li class=\"txtNum\">" + espulsioni + "</li>");
	$("#dati").append("<li class=\"txtDesc\">espulsioni</li>");
	$("#dati").append("<li class=\"txtNum\">" + voto + "</li>");
	$("#dati").append("<li class=\"txtDesc\">voto medio</li>");

	$("#aggiornamento").append("Dati aggiornati alla " + aggData);

	$("#overlayerCalciatore").animate({
		"zoom" : "1",
		"filter" : "alpha(opacity=100)",
		"opacity" : "1"
	}, 200, // velocità animazione
	"linear", // andamento lineare
	function() {

	});

}
function chiudiCalciatore() {

	// /-----
	$("#overlayerCalciatore")
			.animate(
					{
						"zoom" : "1",
						"filter" : "alpha(opacity=0)",
						"opacity" : "0"
					},
					200, // velocità animazione
					"linear", // andamento lineare
					function() {
						document.getElementById("overlayerCalciatore").style.display = 'none';

						// ripulisco i nodi prima di ricrearli
						$('#iconaCalciatore').remove();
						$('#dati').remove();
						$('#aggiornamento').remove();
						// ricreo la struttura portante
						$("#datiCalciatore")
								.append(
										"<div id=\"iconaCalciatore\" class=\"player\"></div>");
						$("#datiCalciatore").append("<ul id=\"dati\"></ul>");
						$("#datiCalciatore").append(
								"<div id=\"aggiornamento\" ></div>");
					});
	// /-----

}
function apriBannerPRO() {
	document.getElementById("bannerPRO").style.display = 'block';
	$("#bannerPRO").animate({
		"zoom" : "1",
		"filter" : "alpha(opacity=100)",
		"opacity" : "1"		
	}, 200, // velocità animazione
	"linear", // andamento lineare
	function() {

	});
}

function chiudiBannerPRO() {

	$("#bannerPRO").animate({
		"zoom" : "1",
		"filter" : "alpha(opacity=0)",
		"opacity" : "0"
	}, 200, // velocità animazione
	"linear", // andamento lineare
	function() {
		document.getElementById("bannerPRO").style.display = 'none';
	});
}

var versiontype = "free";
var varRandom = 0;

function checkConnection() {
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';

	if (states[networkState] == 'No network connection'
			|| states[networkState] == 'Unknown connection') {
		location.href = "ipad_errore.html";
	}
}
function parseXml(xml) {
	//alert("parseXml");
	giornata = $(xml).find("giornata").text();

	$("#giornata").append(giornata + "a giornata");

	arrPartita1 = $(xml).find("partita1").text().split("-");
	arrPartita2 = $(xml).find("partita2").text().split("-");
	arrPartita3 = $(xml).find("partita3").text().split("-");
	arrPartita4 = $(xml).find("partita4").text().split("-");
	arrPartita5 = $(xml).find("partita5").text().split("-");
	arrPartita6 = $(xml).find("partita6").text().split("-");
	arrPartita7 = $(xml).find("partita7").text().split("-");
	arrPartita8 = $(xml).find("partita8").text().split("-");
	arrPartita9 = $(xml).find("partita9").text().split("-");
	arrPartita10 = $(xml).find("partita10").text().split("-");

	elencopartite = new Array();
	elencopartite[0] = arrPartita1[0].toLowerCase();
	elencopartite[1] = arrPartita2[0].toLowerCase();
	elencopartite[2] = arrPartita3[0].toLowerCase();
	elencopartite[3] = arrPartita4[0].toLowerCase();
	elencopartite[4] = arrPartita5[0].toLowerCase();
	elencopartite[5] = arrPartita6[0].toLowerCase();
	elencopartite[6] = arrPartita7[0].toLowerCase();
	elencopartite[7] = arrPartita8[0].toLowerCase();
	elencopartite[8] = arrPartita9[0].toLowerCase();
	elencopartite[9] = arrPartita10[0].toLowerCase();

	if (arrPartita1[0].toLowerCase() == nomedelteam
			|| arrPartita1[1].toLowerCase() == nomedelteam) {
		idpartita = 0;
	}
	if (arrPartita2[0].toLowerCase() == nomedelteam
			|| arrPartita2[1].toLowerCase() == nomedelteam) {
		idpartita = 1;
	}
	if (arrPartita3[0].toLowerCase() == nomedelteam
			|| arrPartita3[1].toLowerCase() == nomedelteam) {
		idpartita = 2;
	}
	if (arrPartita4[0].toLowerCase() == nomedelteam
			|| arrPartita4[1].toLowerCase() == nomedelteam) {
		idpartita = 3;
	}
	if (arrPartita5[0].toLowerCase() == nomedelteam
			|| arrPartita5[1].toLowerCase() == nomedelteam) {
		idpartita = 4;
	}
	if (arrPartita6[0].toLowerCase() == nomedelteam
			|| arrPartita6[1].toLowerCase() == nomedelteam) {
		idpartita = 5;
	}
	if (arrPartita7[0].toLowerCase() == nomedelteam
			|| arrPartita7[1].toLowerCase() == nomedelteam) {
		idpartita = 6;
	}
	if (arrPartita8[0].toLowerCase() == nomedelteam
			|| arrPartita8[1].toLowerCase() == nomedelteam) {
		idpartita = 7;
	}
	if (arrPartita9[0].toLowerCase() == nomedelteam
			|| arrPartita9[1].toLowerCase() == nomedelteam) {
		idpartita = 8;
	}
	if (arrPartita10[0].toLowerCase() == nomedelteam
			|| arrPartita10[1].toLowerCase() == nomedelteam) {
		idpartita = 9;
	}
	initializeBanner(); //  funzione definita in banner.js
	window.open("iphone_campo.html?giornata=" + giornata + "&team="
			+ nomedelteam + "&idpartita=" + idpartita + "&elencopartite="
			+ elencopartite, '_self')

}
function onLoadComplete(){
	initializeBanner(); //  funzione definita in banner.js
	location.href = "ipad_index.html";
}
function querySuccess(tx, results) {
	if (results == null || results.rows == null || results.rows.length == 0) {
	
		$.ajax({
			type : "GET",
			url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
					+ varRandom,
			dataType : "xml",
			success : onLoadComplete
		});
		
		return false;
	} else {
		//alert("01");
		var nomedelteam = results.rows.item(0).data;
		//alert("02");
		var xdr = new XDomainRequest();
		xdr.open("get", "http://www.indeed.it/formazioni/xml/giornata.xml?var"
				+ varRandom);
		xdr.onload = function(xml) {
			//alert("xdr.onload");
			parseXml(xml);
		};
		xdr.send();
		return false;
	}

}
function errorCB(tx, err) {
	console.log("Error processing SQL: " + err.code);
}
function populateDB(tx) {

	tx.executeSql('DROP TABLE IF EXISTS squadra');
	tx.executeSql('CREATE TABLE IF NOT EXISTS squadra (id unique, data)');

	tx.executeSql('DROP TABLE IF EXISTS BNNR');
	tx.executeSql('CREATE TABLE IF NOT EXISTS BNNR (id unique, data)');
}
function queryDB(tx) {
	tx.executeSql('SELECT * FROM squadra', [], querySuccess, errorCB);
}
function successCB() {
	var db = window.openDatabase("Database", "1.0", "formazioni", 200000);
	db.transaction(queryDB, errorCB);
}
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "formazioni", 200000);
	db.transaction(populateDB, errorCB, successCB);
}
function onLoadFn() {
	varRandom = Math.random();
	document.addEventListener("deviceready", onDeviceReady, false);
}

var versiontype = "free";
var varRandom = 0;
var nomedelteam = "";

function parseXml(xml) {
	//alert("parseXml");
	giornata = $(xml).find("giornata").text();

	$("#giornata").append(giornata + "a giornata");

	arrPartita1 = $(xml).find("partita1").text().split("-");
	arrPartita2 = $(xml).find("partita2").text().split("-");
	arrPartita3 = $(xml).find("partita3").text().split("-");
	arrPartita4 = $(xml).find("partita4").text().split("-");
	arrPartita5 = $(xml).find("partita5").text().split("-");
	arrPartita6 = $(xml).find("partita6").text().split("-");
	arrPartita7 = $(xml).find("partita7").text().split("-");
	arrPartita8 = $(xml).find("partita8").text().split("-");
	arrPartita9 = $(xml).find("partita9").text().split("-");
	arrPartita10 = $(xml).find("partita10").text().split("-");

	elencopartite = new Array();
	elencopartite[0] = arrPartita1[0].toLowerCase();
	elencopartite[1] = arrPartita2[0].toLowerCase();
	elencopartite[2] = arrPartita3[0].toLowerCase();
	elencopartite[3] = arrPartita4[0].toLowerCase();
	elencopartite[4] = arrPartita5[0].toLowerCase();
	elencopartite[5] = arrPartita6[0].toLowerCase();
	elencopartite[6] = arrPartita7[0].toLowerCase();
	elencopartite[7] = arrPartita8[0].toLowerCase();
	elencopartite[8] = arrPartita9[0].toLowerCase();
	elencopartite[9] = arrPartita10[0].toLowerCase();

	if (arrPartita1[0].toLowerCase() == nomedelteam
			|| arrPartita1[1].toLowerCase() == nomedelteam) {
		idpartita = 0;
	}
	if (arrPartita2[0].toLowerCase() == nomedelteam
			|| arrPartita2[1].toLowerCase() == nomedelteam) {
		idpartita = 1;
	}
	if (arrPartita3[0].toLowerCase() == nomedelteam
			|| arrPartita3[1].toLowerCase() == nomedelteam) {
		idpartita = 2;
	}
	if (arrPartita4[0].toLowerCase() == nomedelteam
			|| arrPartita4[1].toLowerCase() == nomedelteam) {
		idpartita = 3;
	}
	if (arrPartita5[0].toLowerCase() == nomedelteam
			|| arrPartita5[1].toLowerCase() == nomedelteam) {
		idpartita = 4;
	}
	if (arrPartita6[0].toLowerCase() == nomedelteam
			|| arrPartita6[1].toLowerCase() == nomedelteam) {
		idpartita = 5;
	}
	if (arrPartita7[0].toLowerCase() == nomedelteam
			|| arrPartita7[1].toLowerCase() == nomedelteam) {
		idpartita = 6;
	}
	if (arrPartita8[0].toLowerCase() == nomedelteam
			|| arrPartita8[1].toLowerCase() == nomedelteam) {
		idpartita = 7;
	}
	if (arrPartita9[0].toLowerCase() == nomedelteam
			|| arrPartita9[1].toLowerCase() == nomedelteam) {
		idpartita = 8;
	}
	if (arrPartita10[0].toLowerCase() == nomedelteam
			|| arrPartita10[1].toLowerCase() == nomedelteam) {
		idpartita = 9;
	}
	initializeBanner(); // funzione definita in banner.js
	var wdt = $(window).width();	
	var target = "";
	if (wdt >= 768) {
		target = "768_index.html";
	} else if(wdt <= 400){
		target = "400_index.html";
	} else if(wdt == 480){
		target = "480_index.html";
	} else {
		target = "640_index.html";
	}	
	$("#mainA").attr("href", target);	
	window.open(target + "?giornata=" + giornata + "&team="
			+ nomedelteam + "&idpartita=" + idpartita + "&elencopartite="
			+ elencopartite, '_self')

}
function onLoadComplete() {
	if (IsAdMobEnabled()) {
		initializeBanner(onBannerReady); // funzione definita in banner.js
	}else{
		onBannerReady(); // se adMob non � abilitato, chiama subito il callback
	}
}
function onBannerReady(){
	//alert("onBannerReady");
	var wdt = $(window).width();	
	var target = "";
	if (wdt >= 768) {
		target = "768_index.html";
	} else if(wdt <= 400){
		target = "400_index.html";
	} else if(wdt == 480){
		target = "480_index.html";
	} else {
		target = "640_index.html";
	}
	
	$("#mainA").attr("href", target);
	location.href = target;	
}
function querySuccess(tx, results) {

	if (results == null || results.rows == null || results.rows.length == 0) {		
		$.ajax({
			type : "GET",
			url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
					+ varRandom,
			dataType : "xml",
			success : onLoadComplete
		});

		return false;
	} else {
		nomedelteam = results.rows.item(0).data;
		
		$.ajax({
			type : "GET",
			url : "http://www.indeed.it/formazioni/xml/giornata.xml?var="
					+ varRandom,
			dataType : "xml",
			success : parseXml
		});		
		return false;
	}

}
function errorCB(tx, err) {
	console.log("Error processing SQL: " + err.code);
}
function populateDB(tx) {
	//alert("2");
	//tx.executeSql('DROP TABLE IF EXISTS squadra');
	tx.executeSql('CREATE TABLE IF NOT EXISTS squadra (id unique, data)');

	//tx.executeSql('DROP TABLE IF EXISTS BNNR');
	tx.executeSql('CREATE TABLE IF NOT EXISTS BNNR (id unique, data)');
}
function queryDB(tx) {
	//alert("4");
	tx.executeSql('SELECT * FROM squadra', [], querySuccess, errorCB);
}
function successCB() {	
	//alert("3");
	var db = window.openDatabase("Database", "1.0", "formazioni", 200000);
	db.transaction(queryDB, errorCB, dummySuccess);
}
function dummySuccess(){
	/*Do nothing*/
}
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "formazioni", 200000);
	//alert("1");
	db.transaction(populateDB, errorCB, successCB);
}
function onLoadFn() {
	//alert("0");
	varRandom = Math.random();
	document.addEventListener("deviceready", onDeviceReady, false);
}

(function(){jQTouchCore=function(j){function n(a){"string"===typeof a.selector&&"string"===typeof a.name&&l.push(a)}function v(a,b){k.unshift({page:a,animation:b,hash:"#"+a.attr("id"),id:a.attr("id")})}function C(a){var b=c(a.target);b.is(h.join(", "))||(b=c(a.target).closest(h.join(", ")));b&&b.attr("href")&&!b.isExternalLink()&&a.preventDefault();c.support.touch||c(a.target).trigger("tap",a)}function w(a,b,d,g){function s(){var h=D;c.support.animationEvents&&d&&e.useAnimations?(a.unbind("webkitAnimationEnd",
s),a.removeClass("current "+f+" out"),b.removeClass(f),i.removeClass("animating animating3d"),!0===e.trackScrollPositions&&(b.css("top",-b.data("lastScroll")),setTimeout(function(){b.css("top",0);window.scroll(0,b.data("lastScroll"));c(".scroll",b).each(function(){this.scrollTop=-c(this).data("lastScroll")})},0))):(a.removeClass(f+" out current"),h+=260);setTimeout(function(){b.removeClass("in")},h);m=b;g?k.shift():v(m,d);a.unselect();x(m.attr("id"));b.trigger("pageAnimationEnd",{direction:"in",animation:d});
a.trigger("pageAnimationEnd",{direction:"out",animation:d})}g=g?g:!1;if(void 0===b||0===b.length||b.hasClass("current"))return c.fn.unselect(),!1;c(":focus").trigger("blur");a.trigger("pageAnimationStart",{direction:"out",back:g});b.trigger("pageAnimationStart",{direction:"in",back:g});if(c.support.animationEvents&&d&&e.useAnimations){if(!c.support.transform3d&&d.is3d)d.name=e.defaultAnimation;var f=d.name,h=d.is3d?"animating3d":"";g&&(f=f.replace(/left|right|up|down|in|out/,E));a.bind("webkitAnimationEnd",
s);i.addClass("animating "+h);h=window.pageYOffset;!0===e.trackScrollPositions&&b.css("top",window.pageYOffset-(b.data("lastScroll")||0));b.addClass(f+" in current");a.addClass(f+" out");!0===e.trackScrollPositions&&(a.data("lastScroll",h),c(".scroll",a).each(function(){c(this).data("lastScroll",this.scrollTop)}))}else b.addClass("current in"),s();return!0}function E(a){return{up:"down",down:"up",left:"right",right:"left","in":"out",out:"in"}[a]||a}function q(){1===k.length&&window.history.go(-1);
var a=k[0];return w(a.page,k[1].page,a.animation,!0)?o:!1}function p(a,b){var d=k[0].page;if("string"===typeof b)for(var g=0,e=l.length;g<e;g++)if(l[g].name===b){b=l[g];break}if("string"===typeof a){g=c(a);if(1>g.length){t(a,{animation:b});return}a=g}return w(d,a,b)?o:!1}function F(){if(location.hash===k[0].hash)return!0;if(""===location.hash||k[1]&&location.hash===k[1].hash)return q(),!0;p(c(location.hash),e.defaultAnimation)}function y(a){for(var b,d=0,c=l.length;d<c;d++)if(a.is(l[d].selector)){b=
l[d];break}if(!b)b=e.defaultAnimation;return b}function z(a,b){var d=null,e=document.createElement("div");e.innerHTML=a;c(e).children().each(function(){var a=c(this);a.attr("id")||a.attr("id","page-"+ ++G);c("#"+a.attr("id")).remove();i.append(a);i.trigger("pageInserted",{page:a});if(a.hasClass("current")||!d)d=a});return null!==d?(p(d,b),d):!1}function H(){i.css("minHeight",1E3);scrollTo(0,0);i.css("minHeight",window.innerHeight);r=90==Math.abs(window.orientation)?"landscape":"portrait";i.removeClass("portrait landscape").addClass(r).trigger("turn",
{orientation:r})}function x(a){location.hash="#"+a.replace(/^#/,"")}function t(a,b){var d=c.extend({},{data:null,method:"GET",animation:null,callback:null,$referrer:null},b);"#"!=a?c.ajax({url:a,data:d.data,type:d.method,success:function(a){if(a=z(a,d.animation))"GET"==d.method&&!0===e.cacheGetRequests&&d.$referrer&&d.$referrer.attr("href","#"+a.attr("id")),d.callback&&d.callback(!0)},error:function(){d.$referrer&&d.$referrer.unselect();d.callback&&d.callback(!1)}}):d.$referrer&&d.$referrer.unselect()}
function A(a,b){c(":focus").trigger("blur");a.preventDefault();var d="string"===typeof a?c(a).eq(0):a.target?c(a.target):c(a);return d.length&&d.is(e.formSelector)&&d.attr("action")?(t(d.attr("action"),{data:d.serialize(),method:d.attr("method")||"POST",animation:y(d),callback:b}),!1):!0}function I(a){a=a.closest("form");return 0!==a.length?(a.trigger("submit"),!1):!0}function J(){var a,b,d,c;a=document.getElementsByTagName("head")[0];b=document.body;d=document.createElement("style");d.textContent=
"@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-webkit-transform-3d){#jqt-3dtest{height:3px}}";c=document.createElement("div");c.id="jqt-3dtest";a.appendChild(d);b.appendChild(c);a=3===c.offsetHeight;d.parentNode.removeChild(d);c.parentNode.removeChild(c);return a}function K(a){var b=c(a.target),a=h.join(", ");b.is(a)||(b=b.closest(a));b.length&&b.attr("href")&&b.addClass("active");b.on(c.support.touch?"touchmove":"mousemove",function(){b.removeClass("active")});b.on("touchend",function(){b.unbind("touchmove mousemove")})}
function L(a){var b=c(a.target);b.is(h.join(", "))||(b=b.closest(h.join(", ")));if(!b.length||!b.attr("href"))return!1;var a=b.attr("target"),d=b.prop("hash"),g=b.attr("href"),f=null;if(b.isExternalLink())return b.unselect(),!0;if(b.is(e.backSelector))q(d);else if(b.is(e.submitSelector))I(b);else{if("_webapp"===a)return window.location=g,!1;if("#"===g)return b.unselect(),!0;f=y(b);d&&"#"!==d?(b.addClass("active"),p(c(d).data("referrer",b),f,b.hasClass("reverse"))):(b.addClass("loading active"),t(b.attr("href"),
{animation:f,callback:function(){b.removeClass("loading");setTimeout(c.fn.unselect,250,b)},$referrer:b}));return!1}}var c=j.framework,i,M=c("head"),k=[],G=0,e={},m="",r="portrait",h=[],o={},D=100,B=jQTouchCore.prototype.extensions,l=[],f="",u={addGlossToIcon:!0,backSelector:".back, .cancel, .goback",cacheGetRequests:!0,debug:!0,defaultAnimation:"slideleft",fixedViewport:!0,formSelector:"form",fullScreen:!0,fullScreenClass:"fullscreen",icon:null,icon4:null,preloadImages:!1,startupScreen:null,statusBar:"default",
submitSelector:".submit",touchSelector:"a, .touch",trackScrollPositions:!0,useAnimations:!0,useFastTouch:!0,useTouchScroll:!0,animations:[{name:"cubeleft",selector:".cubeleft, .cube",is3d:!0},{name:"cuberight",selector:".cuberight",is3d:!0},{name:"dissolve",selector:".dissolve"},{name:"fade",selector:".fade"},{name:"flipleft",selector:".flipleft, .flip",is3d:!0},{name:"flipright",selector:".flipright",is3d:!0},{name:"pop",selector:".pop",is3d:!0},{name:"swapleft",selector:".swap",is3d:!0},{name:"slidedown",
selector:".slidedown"},{name:"slideright",selector:".slideright"},{name:"slideup",selector:".slideup"},{name:"slideleft",selector:".slideleft, .slide, #jqt > * > ul li a"}]};(function(a){e=c.extend({},u,a);if(e.preloadImages)for(a=e.preloadImages.length-1;0<=a;a--)(new Image).src=e.preloadImages[a];a=e.addGlossToIcon?"":"-precomposed";e.icon&&(f+='<link rel="apple-touch-icon'+a+'" href="'+e.icon+'" />');e.icon4&&(f+='<link rel="apple-touch-icon'+a+'" sizes="114x114" href="'+e.icon4+'" />');e.startupScreen&&
(f+='<link rel="apple-touch-startup-image" href="'+e.startupScreen+'" />');e.fixedViewport&&(f+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>');e.fullScreen&&(f+='<meta name="apple-mobile-web-app-capable" content="yes" />',e.statusBar&&(f+='<meta name="apple-mobile-web-app-status-bar-style" content="'+e.statusBar+'" />'));f&&M.prepend(f)})(j);c(document).ready(function(){if(!c.support)c.support={};c.support.animationEvents="undefined"!=
typeof window.WebKitAnimationEvent;c.support.touch="undefined"!=typeof window.TouchEvent&&-1<window.navigator.userAgent.indexOf("Mobile")&&e.useFastTouch;c.support.transform3d=J();c.support.ios5=/OS (5(_\d+)*) like Mac OS X/i.test(window.navigator.userAgent);c.fn.isExternalLink=function(){var a=c(this);return"_blank"==a.attr("target")||"external"==a.attr("rel")||a.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]')};
c.fn.makeActive=function(){return c(this).addClass("active")};c.fn.unselect=function(a){a?a.removeClass("active"):c(".active").removeClass("active")};for(var a=0,b=B.length;a<b;a++){var d=B[a];c.isFunction(d)&&c.extend(o,d(o))}a=0;for(b=u.animations.length;a<b;a++){d=u.animations[a];if(void 0!==e[d.name+"Selector"])d.selector=e[d.name+"Selector"];n(d)}h.push(e.touchSelector);h.push(e.backSelector);h.push(e.submitSelector);c(h.join(", ")).css("-webkit-touch-callout","none");i=c("#jqt");a=[];0===i.length&&
(i=c(document.body).attr("id","jqt"));c.support.transform3d&&a.push("supports3d");c.support.ios5&&e.useTouchScroll&&a.push("touchscroll");e.fullScreenClass&&!0===window.navigator.standalone&&a.push(e.fullScreenClass,e.statusBar);i.addClass(a.join(" ")).bind("click",C).bind("orientationchange",H).bind("submit",A).bind("tap",L).bind(c.support.touch?"touchstart":"mousedown",K).trigger("orientationchange");c(window).bind("hashchange",F);a=location.hash;m=0===c("#jqt > .current").length?c("#jqt > *:first-child").addClass("current"):
c("#jqt > .current");x(m.attr("id"));v(m);1===c(a).length&&p(a)});return o={addAnimation:n,animations:l,getOrientation:function(){return r},goBack:q,insertPages:z,goTo:p,history:k,settings:e,submitForm:A}};jQTouchCore.prototype.extensions=[];window.Zepto&&function(j){j.jQTouch=function(n){n.framework=j;return jQTouchCore(n)};j.fn.prop=j.fn.attr;j.jQTouch.addExtension=function(j){jQTouchCore.prototype.extensions.push(j)}}(Zepto)})();


var versiontype = "free";
var release = "1.2";
var phoneName = "";
var platform = "";
var uuid = "";
var versionos = "";
var urlstat = "";
var varRandom = 0;

function parseXml(xml) {

	// CAMBIO FOOTER A SECONDA DELLA VERSIONE
	if (versiontype == "free") {
		$("#footer").append("<a href=\"http://www.facebook.com/pages/Formazioni/253756471411780\" target=\"_blank\"><div class=\"titolo-opzioni\" style=\"top:14px;\">Per informazioni, suggerimenti, contatti</div><div class=\"titolo-opzioni\" style=\"top:14px;\">seguici su FACEBOOK</div></a>");
	} else if (versiontype == "pro") {
		$("#footer").append("<a href=\"http://www.facebook.com/pages/Formazioni/253756471411780\" target=\"_blank\"><div class=\"titolo-opzioni\" style=\"top:14px;\">Per informazioni, suggerimenti, contatti</div><div class=\"titolo-opzioni\" style=\"top:14px;\">seguici su FACEBOOK</div></a>");
		document.getElementById("patchPro").style.display = 'block';
	}

	$("#giornata").append($(xml).find("giornata").text() + "a giornata");

	$("#ico1").click(function() {
		$('#main-opzioni').animate({opacity : 0}, 500, function(){window.open(__errorFilename, '_self');});
	});

	$(".item-opzioni").click(
			function() {
				var valuesquadra = $(this).attr('val');
				function populateDB(tx) {
					tx.executeSql('DELETE FROM squadra');
					tx.executeSql('INSERT INTO squadra (data) VALUES ("' + valuesquadra + '")');
				}

				function errorCB(err) {}

				function successCB() {
					giornata = $(xml).find("giornata").text();
					arrPartita1 = $(xml).find("partita1").text().split("-");
					arrPartita2 = $(xml).find("partita2").text().split("-");
					arrPartita3 = $(xml).find("partita3").text().split("-");
					arrPartita4 = $(xml).find("partita4").text().split("-");
					arrPartita5 = $(xml).find("partita5").text().split("-");
					arrPartita6 = $(xml).find("partita6").text().split("-");
					arrPartita7 = $(xml).find("partita7").text().split("-");
					arrPartita8 = $(xml).find("partita8").text().split("-");
					arrPartita9 = $(xml).find("partita9").text().split("-");
					arrPartita10 = $(xml).find("partita10").text().split("-");

					elencopartite = new Array();
					elencopartite[0] = arrPartita1[0].toLowerCase();
					elencopartite[1] = arrPartita2[0].toLowerCase();
					elencopartite[2] = arrPartita3[0].toLowerCase();
					elencopartite[3] = arrPartita4[0].toLowerCase();
					elencopartite[4] = arrPartita5[0].toLowerCase();
					elencopartite[5] = arrPartita6[0].toLowerCase();
					elencopartite[6] = arrPartita7[0].toLowerCase();
					elencopartite[7] = arrPartita8[0].toLowerCase();
					elencopartite[8] = arrPartita9[0].toLowerCase();
					elencopartite[9] = arrPartita10[0].toLowerCase();
					var nomedelteam = valuesquadra;
					if (arrPartita1[0].toLowerCase() == nomedelteam || arrPartita1[1].toLowerCase() == nomedelteam) {
						idpartita = 0;
					}
					if (arrPartita2[0].toLowerCase() == nomedelteam || arrPartita2[1].toLowerCase() == nomedelteam) {
						idpartita = 1;
					}
					if (arrPartita3[0].toLowerCase() == nomedelteam || arrPartita3[1].toLowerCase() == nomedelteam) {
						idpartita = 2;
					}
					if (arrPartita4[0].toLowerCase() == nomedelteam || arrPartita4[1].toLowerCase() == nomedelteam) {
						idpartita = 3;
					}
					if (arrPartita5[0].toLowerCase() == nomedelteam || arrPartita5[1].toLowerCase() == nomedelteam) {
						idpartita = 4;
					}
					if (arrPartita6[0].toLowerCase() == nomedelteam || arrPartita6[1].toLowerCase() == nomedelteam) {
						idpartita = 5;
					}
					if (arrPartita7[0].toLowerCase() == nomedelteam || arrPartita7[1].toLowerCase() == nomedelteam) {
						idpartita = 6;
					}
					if (arrPartita8[0].toLowerCase() == nomedelteam || arrPartita8[1].toLowerCase() == nomedelteam) {
						idpartita = 7;
					}
					if (arrPartita9[0].toLowerCase() == nomedelteam || arrPartita9[1].toLowerCase() == nomedelteam) {
						idpartita = 8;
					}
					if (arrPartita10[0].toLowerCase() == nomedelteam || arrPartita10[1].toLowerCase() == nomedelteam) {
						idpartita = 9;
					}

					window.open(__fieldFilename + "?giornata=" + giornata + "&team=" + nomedelteam + "&idpartita=" + idpartita + "&elencopartite=" + elencopartite, '_self');
				}

				$(".item-opzioni").animate({backgroundPosition : "125px"}, 0, function() {});
				$(this).animate(
						{backgroundPosition : 0},
						0,
						function() {
							var db = window.openDatabase("Database", "1.0","formazioni", 200000);
							db.transaction(populateDB, errorCB, successCB);
						});

			});

}

function queryDBs(tx) {
	tx.executeSql('SELECT * FROM squadra', [], querySuccesss, errorCB);
}
function querySuccesss(tx, results) {
	if (results.rows.length == 0) {
		return false;
	} else {
		urlstat = "http://www.indeed.it/formazioni/xml/analytics.php?phoneName=" + phoneName + "&platform=" + platform + "&uuid=" + uuid + "&versionos=" + versionos + "&pagina=" + pagina + "&versiontype=" + versiontype + "&release=" + release + "&squadra=" + results.rows.item(0).data + "";
		$.ajax({
			type : "GET",
			url : urlstat,
			dataType : "xml"
		});
		return false;
	}
}
function querySuccess(tx, results) {
	if (results == null || results.rows == null || results.rows.length == 0) {
		return false;
	} else {
		$('li[val="' + results.rows.item(0).data + '"]').animate({backgroundPosition : 0},
						0,
						function() {
							$.ajax({
										type : "GET",
										url : "http://www.indeed.it/formazioni/xml/giornata.xml?var=" + varRandom,
										dataType : "xml",
										success : parseXml
									});

						});
		return false;
	}
}
function errorCB(tx, err) {
	alert("Error processing SQL: " + err);
}
function queryDB(tx) {
	tx.executeSql('SELECT * FROM squadra', [], querySuccess, errorCB);
}
function dummySuccess() {
	/* Do nothing */
}
function onDeviceReady() {
	var db = window.openDatabase("Database", "1.0", "formazioni", 200000);
	db.transaction(queryDB, errorCB, dummySuccess);
}

//function fadein() {
//	$('#main-opzioni').animate({opacity : 1}, 500, function() {});
//}

function onLoadFn() {
	varRandom = Math.random();
	document.addEventListener("deviceready", onDeviceReady, false);
	//fadein();
}
