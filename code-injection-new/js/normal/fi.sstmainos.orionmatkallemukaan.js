










	$(document).ready(function(){
		
		for (x in categories) {
			$.ajax({
				url: categories[x].file,
				async: false,
				dataType: 'json',
				success: function(data, textStatus, jqXHR){
					//console.log(textStatus);
					//console.log(x);
					for (y in data) {
						categories[x].items.push(data[y]);	
					}
					//$.extend(categories[x],data);
					console.log(categories[x]);
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.log("error");
					//console.log(errorThrown);
				}
			});
		}
		
		console.log(choises);
		for ( x in choises ) {
			console.log(choises[x].type);
			for ( y in choises[x].targets ) {
				console.log("  "+choises[x].targets[y].target);
				for ( z in choises[x].targets[y].durations ) {
					console.log("    "+choises[x].targets[y].durations[z].duration);
				}
			}
		}
		
	});


var choises = [
	{
		"type"				:	"Kaupunkiloma",
		"targets"			:	[
									{
										"target"			:	"Kotimaa",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Pohjoismaat",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Eurooppa",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Muu",
										"durations"			:	[
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									}
								]
	},
	{
		"type"				:	"Rantaloma",
		"targets"			:	[
									{
										"target"			:	"Eurooppa",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Muu",
										"durations"			:	[
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									}
								]
	},
	{
		"type"				:	"Aktiiviloma",
		"targets"			:	[
									{
										"target"			:	"Kotimaa",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Pohjoismaat",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Eurooppa",
										"durations"			:	[
																	{
																		"duration"			:	"viikonloppu"
																	},
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									},
									{
										"target"			:	"Muu",
										"durations"			:	[
																	{
																		"duration"			:	"1 viikko"
																	},
																	{
																		"duration"			:	"2 viikkoa"
																	}
																]
									}
								]
	},
];

var categories = 
[
	{
		"name"				:	"Vaatteet",
		"file"				:	"assets/data/items_vaatteet_default.json",
		"items"				:	[
		
								]
	},
	{
		"name"				:	"Hygienia",
		"file"				:	"assets/data/items_hygienia_default.json",
		"items"				:	[
		
								]
	},
	{
		"name"				:	"Matkustusasiakirjat",
		"file"				:	"assets/data/items_matkustusasiakirjat_default.json",
		"items"				:	[
		
								]
	},
	{
		"name"				:	"Matka-apteekki",
		"file"				:	"assets/data/items_matka-apteekki_default.json",
		"items"				:	[
		
								]
	},
	{
		"name"				:	"Muuta",
		"file"				:	"assets/data/items_muuta_default.json",
		"items"				:	[
		
								]
	}
];

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 6"},
{"id":"4","name":"Sukat x 5"},
{"id":"5","name":"Pitkähihainen paita x 2"},
{"id":"6","name":"T-paita x 4"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Juhlakengät"},
{"id":"10","name":"Sandaalit"},
{"id":"11","name":"Takki"},
{"id":"12","name":"Housut x 2"},
{"id":"13","name":"Shortsit"},
{"id":"14","name":"Pyjama"},
{"id":"15","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 6"},
{"id":"4","name":"Sukat x 5"},
{"id":"5","name":"Pitkähihainen paita x 2"},
{"id":"6","name":"T-paita x 4"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Juhlakengät"},
{"id":"10","name":"Sandaalit"},
{"id":"11","name":"Takki"},
{"id":"12","name":"Housut x 2"},
{"id":"13","name":"Shortsit"},
{"id":"14","name":"Pyjama"},
{"id":"15","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 3"},
{"id":"4","name":"Sukat x 2"},
{"id":"5","name":"Pitkähihainen paita"},
{"id":"6","name":"T-paita x 2"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"8","name":"Matkalukemista"},
{"id":"9","name":"Sadetakki tai sateenvarjo"},
{"id":"10","name":"Aurinkolasit"},
{"id":"11","name":"Rantakassi ja -pyyhe"},
{"id":"12","name":"Rannekello"},
{"id":"13","name":"Nenäliinat"},
{"id":"14","name":"Korvatulpat"},
{"id":"15","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Kortisonivoide"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"},
{"id":"4","name":"Hyönteis- tai itikkakarkote"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturit"},
{"id":"7","name":"Matkalukemista"},
{"id":"8","name":"Sadetakki tai sateenvarjo"},
{"id":"9","name":"Aurinkolasit"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita"},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Takki"},
{"id":"10","name":"Housut"},
{"id":"11","name":"Pyjama"},
{"id":"12","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Laastareita"},
{"id":"2","name":"Reseptilääkkeet"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturi"},
{"id":"7","name":"Matkalukemista"},
{"id":"8","name":"Sadetakki tai sateenvarjo"},
{"id":"9","name":"Aurinkolasit"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Kortisonivoide"},
{"id":"3","name":"Kyypakkaus"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Hyönteis- tai itikkakarkote"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturit"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Matkalukemista"},
{"id":"9","name":"Sadetakki tai sateenvarjo"},
{"id":"10","name":"Aurinkolasit"},
{"id":"11","name":"Pyyhe"},
{"id":"12","name":"Rannekello"},
{"id":"13","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit "},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Kortisonivoide "},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"},
{"id":"4","name":"Hyönteis- tai itikkakarkote"}
]

[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera "},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturit"},
{"id":"5","name":"Matkalukemista"},
{"id":"6","name":"Sadetakki tai sateenvarjo"},
{"id":"7","name":"Aurinkolasit"},
{"id":"8","name":"Rannekello"},
{"id":"9","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita "},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Takki"},
{"id":"10","name":"Housut"},
{"id":"11","name":"Pyjama"},
{"id":"12","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Laastareita"},
{"id":"2","name":"Reseptilääkkeet"}
]

[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera "},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturi"},
{"id":"5","name":"Matkalukemista"},
{"id":"6","name":"Sadetakki tai sateenvarjo"},
{"id":"7","name":"Aurinkolasit"},
{"id":"8","name":"Rannekello"},
{"id":"9","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Kortisonivoide"},
{"id":"3","name":"Kyypakkaus"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Hyönteis- tai itikkakarkote"}
]

[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera"},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturit"},
{"id":"5","name":"Kevyt varalaukku"},
{"id":"6","name":"Matkalukemista"},
{"id":"7","name":"Sadetakki tai sateenvarjo"},
{"id":"8","name":"Aurinkolasit"},
{"id":"9","name":"Pyyhe"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita"},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Sandaalit"},
{"id":"9","name":"Takki"},
{"id":"10","name":"Housut"},
{"id":"11","name":"Shortsit"},
{"id":"12","name":"Pyjama"},
{"id":"13","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"8","name":"Matkalukemista"},
{"id":"9","name":"Sadetakki tai sateenvarjo"},
{"id":"10","name":"Aurinkolasit"},
{"id":"11","name":"Rannekello"},
{"id":"12","name":"Nenäliinat"},
{"id":"13","name":"Korvatulpat"},
{"id":"14","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkkikengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Juhlakengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Särkylääkkeet"},
{"id":"3","name":"Kortisonivoide"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Matkapahoinvointilääkkeet"},
{"id":"7","name":"Ripulilääke"},
{"id":"8","name":"Pienet sakset"},
{"id":"9","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]


[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Kortisonivoide"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"},
{"id":"4","name":"Hyönteis- tai itikkakarkote"},
{"id":"3","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturit"},
{"id":"7","name":"Matkalukemista"},
{"id":"8","name":"Sadetakki tai sateenvarjo"},
{"id":"9","name":"Aurinkolasit"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita"},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Takki"},
{"id":"10","name":"Housut"},
{"id":"11","name":"Pyjama"},
{"id":"12","name":"Vyö"}
]


[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Laastareita"},
{"id":"2","name":"Reseptilääkkeet"},
{"id":"3","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"}
]


[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturi"},
{"id":"7","name":"Matkalukemista"},
{"id":"8","name":"Sadetakki tai sateenvarjo"},
{"id":"9","name":"Aurinkolasit"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkki- tai vaelluskengät"},
{"id":"10","name":"Sandaalit"},
{"id":"11","name":"Takki"},
{"id":"12","name":"Farkut"},
{"id":"13","name":"Housut x 3"},
{"id":"14","name":"Shortsit"},
{"id":"15","name":"Pyjama"},
{"id":"16","name":"Vyö"}
]


[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Kortisonivoide"},
{"id":"3","name":"Kyypakkaus"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Hyönteis- tai itikkakarkote"},
{"id":"3","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kansainvälinen ajokortti"},
{"id":"4","name":"Kamera"},
{"id":"5","name":"Matkapuhelin"},
{"id":"6","name":"Laturit"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Matkalukemista"},
{"id":"9","name":"Sadetakki tai sateenvarjo"},
{"id":"10","name":"Aurinkolasit"},
{"id":"11","name":"Pyyhe"},
{"id":"12","name":"Rannekello"},
{"id":"13","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]

[
{"id":"0","name":"Aurinkovoiteet"},
{"id":"1","name":"Sebamed Sun aurinkotuotteet"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Deodorantti"},
{"id":"4","name":"Kosteusvoide kasvoille ja vartalolle"},
{"id":"5","name":"Aqualan perusvoiteet"},
{"id":"6","name":"Favora päivä- ja yövoide"},
{"id":"7","name":"Shampoo ja hoitoaine"},
{"id":"8","name":"Parranajovälineet"},
{"id":"9","name":"Favora hiustenhoitotuotteet"},
{"id":"10","name":"Pesuneste"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Hiusten muotoilutuotteet"},
{"id":"17","name":"Huulivoide"},
{"id":"18","name":"Meikit"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Kortisonivoide"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"},
{"id":"4","name":"Hyönteis- tai itikkakarkote"},
{"id":"5","name":"Jomo Ice kylmägeeli"}
]

[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera"},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturit"},
{"id":"5","name":"Matkalukemista"},
{"id":"6","name":"Sadetakki tai sateenvarjo"},
{"id":"7","name":"Aurinkolasit"},
{"id":"8","name":"Rannekello"},
{"id":"9","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]

[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita"},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Takki"},
{"id":"10","name":"Housut"},
{"id":"11","name":"Pyjama"},
{"id":"12","name":"Vyö"}
]

[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Meikit"},
{"id":"16","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Särkylääkkeet"},
{"id":"1","name":"Laastareita"},
{"id":"2","name":"Reseptilääkkeet"},
{"id":"3","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"}
]

[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera"},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturi"},
{"id":"5","name":"Matkalukemista"},
{"id":"6","name":"Sadetakki tai sateenvarjo"},
{"id":"7","name":"Aurinkolasit"},
{"id":"8","name":"Rannekello"},
{"id":"9","name":"Nenäliinat"}
]

[
{"id":"0","name":"Matkaliput"},
{"id":"1","name":"Matkavakuutus"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkki- tai vaelluskengät"},
{"id":"10","name":"Sandaalit"},
{"id":"11","name":"Takki"},
{"id":"12","name":"Farkut"},
{"id":"13","name":"Housut x 3"},
{"id":"14","name":"Shortsit"},
{"id":"15","name":"Pyjama"},
{"id":"16","name":"Vyö"}
]


[
{"id":"0","name":"Aurinkovoiteet"},
{"id":"1","name":"Sebamed Sun aurinkotuotteet"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Deodorantti"},
{"id":"4","name":"Kosteusvoide kasvoille ja vartalolle"},
{"id":"5","name":"Aqualan perusvoiteet"},
{"id":"6","name":"Favora päivä- ja yövoide"},
{"id":"7","name":"Shampoo ja hoitoaine"},
{"id":"8","name":"Parranajovälineet"},
{"id":"9","name":"Favora hiustenhoitotuotteet"},
{"id":"10","name":"Pesuneste"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Hiusten muotoilutuotteet"},
{"id":"17","name":"Huulivoide"},
{"id":"18","name":"Meikit"}
]


[
{"id":"0","name":"Neo-amisept käsidesit"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Kortisonivoide"},
{"id":"3","name":"Kyypakkaus"},
{"id":"4","name":"Laastareita"},
{"id":"5","name":"Reseptilääkkeet"},
{"id":"6","name":"Hyönteis- tai itikkakarkote"},
{"id":"7","name":"Jomo Ice kylmägeeli"}
]


[
{"id":"0","name":"Pankkikortti"},
{"id":"1","name":"Luottokortti"},
{"id":"2","name":"Kamera"},
{"id":"3","name":"Matkapuhelin"},
{"id":"4","name":"Laturit"},
{"id":"5","name":"Kevyt varalaukku"},
{"id":"6","name":"Matkalukemista"},
{"id":"7","name":"Sadetakki tai sateenvarjo"},
{"id":"8","name":"Aurinkolasit"},
{"id":"9","name":"Pyyhe"},
{"id":"10","name":"Rannekello"},
{"id":"11","name":"Nenäliinat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]


[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"},
{"id":"3","name":"Särkylääkkeet"},
{"id":"4","name":"Kortisonivoide"},
{"id":"5","name":"Laastareita"},
{"id":"6","name":"Reseptilääkkeet"},
{"id":"7","name":"Matkapahoinvointilääkkeet"},
{"id":"8","name":"Ripulilääke"},
{"id":"9","name":"Pienet sakset"},
{"id":"10","name":"Pinsetit"}
]

[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 3"},
{"id":"3","name":"Sukat x 2"},
{"id":"4","name":"Pitkähihainen paita"},
{"id":"5","name":"T-paita x 2"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]


[
{"id":"0","name":"Aurinkovoiteet"},
{"id":"1","name":"Sebamed Sun aurinkotuotteet"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Deodorantti"},
{"id":"4","name":"Kosteusvoide kasvoille ja vartalolle"},
{"id":"5","name":"Aqualan perusvoiteet"},
{"id":"6","name":"Favora päivä- ja yövoide"},
{"id":"7","name":"Shampoo ja hoitoaine"},
{"id":"8","name":"Parranajovälineet"},
{"id":"9","name":"Favora hiustenhoitotuotteet"},
{"id":"10","name":"Pesuneste"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Kondomit tai ehkäisypillerit"},
{"id":"13","name":"Hajuvesi"},
{"id":"14","name":"Kynsisakset ja kynsiviila"},
{"id":"15","name":"Hiusten muotoilutuotteet"},
{"id":"16","name":"Huulivoide"},
{"id":"17","name":"Meikit"}
]


[
{"id":"0","name":"Neo-amisept käsidesit"},
{"id":"1","name":"Särkylääkkeet"},
{"id":"2","name":"Laastareita"},
{"id":"3","name":"Reseptilääkkeet"},
{"id":"4","name":"Jomo Ice kylmägeeli"}
]


[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"8","name":"Matkalukemista"},
{"id":"9","name":"Sadetakki tai sateenvarjo"},
{"id":"10","name":"Aurinkolasit"},
{"id":"11","name":"Rannekello"},
{"id":"12","name":"Nenäliinat"},
{"id":"13","name":"Korvatulpat"},
{"id":"14","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkki- tai vaelluskengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]


[
{"id":"0","name":"Sebamed Sun aurinkotuotteet","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=9"},
{"id":"1","name":"Sebamed Pesuneste","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=40"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Favora Roll-on Antiperspirant","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Roll-on-Antiperspirant/"},
{"id":"4","name":"Aqualan perusvoiteet","url":"http://www.perusvoide.fi/tuotteet/"},
{"id":"5","name":"Favora päivävoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Day-Cream-SPF-15/"},
{"id":"6","name":"Favora yövoide","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Kosmetiikka/Favora/Favora-Nutri-Night-Cream-/"},
{"id":"7","name":"Sebamed Shampoo","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=45"},
{"id":"8","name":"Sebamed Hoitoaine","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=47"},
{"id":"9","name":"Parranajovälineet"},
{"id":"10","name":"Hiusten muotoilutuotteet"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Meikit"},
{"id":"17","name":"Sebamed Huulivoide","url":"http://www.itsehoitoapteekki.fi/sebamed#?id=35"}
]

[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"},
{"id":"3","name":"Särkylääkkeet"},
{"id":"4","name":"Kortisonivoide"},
{"id":"5","name":"Laastareita"},
{"id":"6","name":"Reseptilääkkeet"},
{"id":"7","name":"Matkapahoinvointilääkkeet"},
{"id":"8","name":"Ripulilääke"},
{"id":"9","name":"Pienet sakset"},
{"id":"10","name":"Pinsetit"}
]


[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Uima-asu"},
{"id":"3","name":"Alusvaatteet x 12"},
{"id":"4","name":"Sukat x 10"},
{"id":"5","name":"Pitkähihainen paita x 4"},
{"id":"6","name":"T-paita x 8"},
{"id":"7","name":"Villapusero tai neuletakki"},
{"id":"8","name":"Siistit kävelykengät"},
{"id":"9","name":"Lenkki- tai vaelluskengät"},
{"id":"10","name":"Juhlakengät"},
{"id":"11","name":"Sandaalit"},
{"id":"12","name":"Takki"},
{"id":"13","name":"Farkut"},
{"id":"14","name":"Housut x 3"},
{"id":"15","name":"Shortsit"},
{"id":"16","name":"Pyjama"},
{"id":"17","name":"Vyö"}
]

[
{"id":"0","name":"Aurinkovoiteet"},
{"id":"1","name":"Sebamed Sun aurinkotuotteet"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Deodorantti"},
{"id":"4","name":"Kosteusvoide kasvoille ja vartalolle"},
{"id":"5","name":"Aqualan perusvoiteet"},
{"id":"6","name":"Favora päivä- ja yövoide"},
{"id":"7","name":"Shampoo ja hoitoaine"},
{"id":"8","name":"Parranajovälineet"},
{"id":"9","name":"Favora hiustenhoitotuotteet"},
{"id":"10","name":"Pesuneste"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Hiusten muotoilutuotteet"},
{"id":"17","name":"Huulivoide"},
{"id":"18","name":"Meikit"}
]


[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"},
{"id":"3","name":"Särkylääkkeet"},
{"id":"4","name":"Kortisonivoide"},
{"id":"5","name":"Laastareita"},
{"id":"6","name":"Reseptilääkkeet"},
{"id":"7","name":"Matkapahoinvointilääkkeet"},
{"id":"8","name":"Ripulilääke"},
{"id":"9","name":"Pienet sakset"},
{"id":"10","name":"Pinsetit"}
]


[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]

[
{"id":"0","name":"Passi"},
{"id":"1","name":"Matkaliput"},
{"id":"2","name":"Matkavakuutus"},
{"id":"3","name":"Kopiot: passi ja matkaliput"}
]


[
{"id":"0","name":"Aurinkohattu/lippis"},
{"id":"1","name":"Hellevaatteet"},
{"id":"2","name":"Alusvaatteet x 6"},
{"id":"3","name":"Sukat x 5"},
{"id":"4","name":"Pitkähihainen paita x 2"},
{"id":"5","name":"T-paita x 4"},
{"id":"6","name":"Villapusero tai neuletakki"},
{"id":"7","name":"Siistit kävelykengät"},
{"id":"8","name":"Lenkki- tai vaelluskengät"},
{"id":"9","name":"Sandaalit"},
{"id":"10","name":"Takki"},
{"id":"11","name":"Housut x 2"},
{"id":"12","name":"Shortsit"},
{"id":"13","name":"Pyjama"},
{"id":"14","name":"Vyö"}
]


[
{"id":"0","name":"Aurinkovoiteet"},
{"id":"1","name":"Sebamed Sun aurinkotuotteet"},
{"id":"2","name":"Hammasharja ja -tahna"},
{"id":"3","name":"Deodorantti"},
{"id":"4","name":"Kosteusvoide kasvoille ja vartalolle"},
{"id":"5","name":"Aqualan perusvoiteet"},
{"id":"6","name":"Favora päivä- ja yövoide"},
{"id":"7","name":"Shampoo ja hoitoaine"},
{"id":"8","name":"Parranajovälineet"},
{"id":"9","name":"Favora hiustenhoitotuotteet"},
{"id":"10","name":"Pesuneste"},
{"id":"11","name":"Harja tai kampa"},
{"id":"12","name":"Vanupuikkoja"},
{"id":"13","name":"Kondomit tai ehkäisypillerit"},
{"id":"14","name":"Hajuvesi"},
{"id":"15","name":"Kynsisakset ja kynsiviila"},
{"id":"16","name":"Hiusten muotoilutuotteet"},
{"id":"17","name":"Huulivoide"},
{"id":"18","name":"Meikit"}
]


[
{"id":"0","name":"Biophilus-maitohappobakteerit","url":"http://www.itsehoitoapteekki.fi/biophilus"},
{"id":"1","name":"Neo-amisept käsidesit","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/muut-tuotteet/Neo-Amisept-liuos-ja-kertapyyhe/"},
{"id":"2","name":"Jomo Ice kylmägeeli","url":"http://www.itsehoitoapteekki.fi/Tuotteet1/Sarky-ja-kipu/Jomo-Ice-Super-MSM-kylmageeli/"},
{"id":"3","name":"Särkylääkkeet"},
{"id":"4","name":"Kortisonivoide"},
{"id":"5","name":"Laastareita"},
{"id":"6","name":"Reseptilääkkeet"},
{"id":"7","name":"Matkapahoinvointilääkkeet"},
{"id":"8","name":"Ripulilääke"},
{"id":"9","name":"Pienet sakset"},
{"id":"10","name":"Pinsetit"}
]


[
{"id":"0","name":"Valuutta"},
{"id":"1","name":"Pankkikortti"},
{"id":"2","name":"Luottokortti"},
{"id":"3","name":"Kamera"},
{"id":"4","name":"Matkapuhelin"},
{"id":"5","name":"Laturit"},
{"id":"6","name":"Kansainvälinen ajokortti"},
{"id":"7","name":"Kevyt varalaukku"},
{"id":"8","name":"Lista tärkeistä osoitteista ja puhelinnumeroista"},
{"id":"9","name":"Matkalukemista"},
{"id":"10","name":"Muistiinpanovälineet"},
{"id":"11","name":"Sadetakki tai sateenvarjo"},
{"id":"12","name":"Aurinkolasit"},
{"id":"13","name":"Rantakassi ja -pyyhe"},
{"id":"14","name":"Rannekello"},
{"id":"15","name":"Nenäliinat"},
{"id":"16","name":"Matkakokoinen ompelupakkaus"},
{"id":"17","name":"Korvatulpat"},
{"id":"18","name":"Opas- ja sanakirjat"}
]





//Browser debug
browserDebug = false;

// Variables
var selfAddedIdCount = 0;

//Cordova ready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$.support.cors = true;
	checkLocalStorage();
}

function checkLocalStorage() {
	if (window.localStorage.getItem("pituusID")) {
		changePage("assets/pages/items/index.html", items)
	}
}

function askToClearStorage(){
	navigator.notification.confirm(
		'Haluatko tyhjentää sovelluksen muistin?', 		//message
		clearLocalStorage, 								//callback
		'Tyhjennä muisti?', 							//title
		'Kyllä,En'										//button labels
	);
}

function clearLocalStorage(btnPressed){
	if (btnPressed==1) {
		window.localStorage.clear();
	}
}

function itemPageBackButtonPressed(){
	if (!browserDebug) {
		navigator.notification.confirm(
			"Haluatko tyhjentää sovelluksen muistin?", 		//message
			itemPageBackButtonPressedCB, 					//callback
			"Tyhjennä muisti?", 							//title
			"Kyllä,En"										//button labels
		);
	} else {
		if (confirm('Haluatko tyhjentää sovelluksen muistin?')) {
			itemPageBackButtonPressedCB(1);
		}
	}
}

function itemPageBackButtonPressedCB(btnPressed){
	if (btnPressed==1) {
		window.localStorage.clear();
		window.location = "index.html";
	}else if (btnPressed==2) {
		
	}
}

function askToDeleteItem( item ){
	if (!browserDebug) {
		navigator.notification.confirm(
			"Haluatko poistaa rivin?", 		//message
			itemDelete( item ), 			//callback
			"Poista rivi?", 				//title
			"Kyllä,Ei"						//button labels
		);
	} else {
		if (confirm('Haluatko poistaa rivin?')) {
			itemDelete( item );
		}
	}
}


jQuery(document).ready(function(){
	//Frontpage play button
	jQuery('#frontPagePlayButton').click(function(){
		//Load kohteentyyppi
		changePage('assets/pages/kohteentyyppi/index.html', kohteentyyppi);
	});
	//Exit on backbutton on frontscreen
	jQuery(document).bind("backbutton",function(){
		navigator.app.exitApp();
	});
	if (browserDebug) checkLocalStorage();

	
	selfAddedIdCount = getSelfAddedIdCount(); // get the next available id from localstorage (this number never get smaller)
});

function changePage(href, callback) {
	jQuery('#ajaxTarget').load(href, function(response, status, xhr) {
		if (xhr.status != 200) {
			alert('There was an error loading page:\n'+xhr.status+' '+xhr.statusText);
		} else {
			callback();
		}
	});
}

function kohteentyyppi() {
	var parentElm = jQuery("ul.select");
	var choiseElm;
	var choiseLinkElm;
	var c = choises;
	for ( x in c ) {
		choiseElm = jQuery(document.createElement("li"));
		choiseLinkElm = jQuery(document.createElement("a"));
		jQuery(choiseLinkElm).attr("href","assets/pages/kohde/index.html");
		jQuery(choiseLinkElm).attr("data-rel",c[x].type);
		jQuery(choiseLinkElm).attr("data-id",x);
		jQuery(choiseLinkElm).text(c[x].type);
		jQuery(choiseLinkElm).appendTo(choiseElm);
		jQuery(choiseElm).appendTo(parentElm);
	}
	
	jQuery('ul.select li a').click(function(e){
		e.preventDefault();
		href = $(this).attr('href');
		rel = escape($(this).attr('data-rel'));
		id = escape($(this).attr('data-id'));
		url = href+'#'+rel+'&'+id;
		
		//save selection to localstorage
		window.localStorage.setItem("kohteentyyppi",rel);
		window.localStorage.setItem("kohteentyyppiID",id);
		
		//change page
		changePage(url,kohde);
	});
	
	jQuery('#kohteentyyppiPlayButton').click(function(e){
		window.location = "index.html";
	});

	//Capture device backbutton
	bbKohteentyyppi();
}

function kohde() {
	var parentElm = jQuery("ul.select");
	var choiseElm;
	var choiseLinkElm;
	var kohteentyyppiID = window.localStorage.getItem("kohteentyyppiID");
	var c = choises[kohteentyyppiID].targets;
	for ( x in c ) {
		choiseElm = jQuery(document.createElement("li"));
		choiseLinkElm = jQuery(document.createElement("a"));
		jQuery(choiseLinkElm).attr("href","assets/pages/pituus/index.html");
		jQuery(choiseLinkElm).attr("data-rel",c[x].target);
		jQuery(choiseLinkElm).attr("data-id",x);
		jQuery(choiseLinkElm).text(c[x].target);
		jQuery(choiseLinkElm).appendTo(choiseElm);
		jQuery(choiseElm).appendTo(parentElm);
	}
	
	jQuery('ul.select li a').click(function(e){
		e.preventDefault();
		href = $(this).attr('href');
		rel = escape($(this).attr('data-rel'));
		id = escape($(this).attr('data-id'));
		url = href+'#'+rel+'&'+id;
		
		//save selection to localstorage
		window.localStorage.setItem("kohde",rel);
		window.localStorage.setItem("kohdeID",id);
		
		//change page
		changePage(url,pituus);
	});
	
	jQuery('#kohdePlayButton').click(function(e){
		changePage('assets/pages/kohteentyyppi/index.html', kohteentyyppi);
	});
	
	//Capture device backbutton
	bbKohde();
}

function pituus() {
	var parentElm = jQuery("ul.select");
	var choiseElm;
	var choiseLinkElm;
	var kohteentyyppiID = window.localStorage.getItem("kohteentyyppiID");
	var kohdeID = window.localStorage.getItem("kohdeID");
	var c = choises[kohteentyyppiID].targets[kohdeID].durations;
	for ( x in c ) {
		choiseElm = jQuery(document.createElement("li"));
		choiseLinkElm = jQuery(document.createElement("a"));
		jQuery(choiseLinkElm).attr("href","assets/pages/items/index.html");
		jQuery(choiseLinkElm).attr("data-rel",c[x].duration);
		jQuery(choiseLinkElm).attr("data-id",x);
		jQuery(choiseLinkElm).text(c[x].duration);
		jQuery(choiseLinkElm).appendTo(choiseElm);
		jQuery(choiseElm).appendTo(parentElm);
	}
	
	jQuery('ul.select li a').click(function(e){
		e.preventDefault();
		href = $(this).attr('href');
		rel = escape($(this).attr('data-rel'));
		id = escape($(this).attr('data-id'));
		url = href+'#'+rel+'&'+id;
		
		//save selection to localstorage
		window.localStorage.setItem("pituus",rel);
		window.localStorage.setItem("pituusID",id);
		
		//change page
		changePage(url,items);
	});
	
	jQuery('#pituusPlayButton').click(function(e){
		changePage("assets/pages/kohde/index.html",kohde);
	});
	
	//Capture device backbutton
	bbPituus();
}

function items(){
	kohteentyyppiID = window.localStorage.getItem("kohteentyyppiID");
	kohdeID = window.localStorage.getItem("kohdeID");
	pituusID = window.localStorage.getItem("pituusID");
	
	//Get categories
	var parentElm = jQuery(".itemtarget");
	var acc;
	var h3;
	var accContent;
	for (x in categories) {
		
		//items
		$.ajax({
			url: "assets/data/items/"+kohteentyyppiID+"/"+kohdeID+"/"+pituusID+"/"+x+".js",
			async: false,
			dataType: 'json',
			success: function(data, textStatus, jqXHR){
				for (y in data) {
					categories[x].items.push(data[y]);	
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				
			}
		});
		
		acc = jQuery(document.createElement("div"));
		h3 = jQuery(document.createElement("h3"));
		accContent = jQuery(document.createElement("div"));
		jQuery(acc).attr("class","accordion");
		jQuery(acc).attr("data-itemcat",x);
		jQuery(h3).text(categories[x].name);
		jQuery(accContent).attr("class","accContent");
		jQuery(h3).appendTo(acc);
		jQuery(accContent).appendTo(acc);
		jQuery(acc).appendTo(parentElm);
		
		ul = jQuery(document.createElement("ul"));
		jQuery(ul).attr("class","itemlist");
		for (i in categories[x].items){
			if(localStorage.getItem("item-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+categories[x].items[i].id+'-hidden') === null)
			{
				li = jQuery(document.createElement("li"));
				jQuery(li).attr("data-itemid","item-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+categories[x].items[i].id);
				jQuery(li).css({
					'overflow':'hidden'
				});
				jQuery(li).html('<input id="item-'+kohteentyyppiID+'-'+kohdeID+'-'+pituusID+'-'+x+'-'+categories[x].items[i].id+'" name="item-'+kohteentyyppiID+'-'+kohdeID+'-'+pituusID+'-'+x+'-'+categories[x].items[i].id+'" type="checkbox" /> <label for="item-'+kohteentyyppiID+'-'+kohdeID+'-'+pituusID+'-'+x+'-'+categories[x].items[i].id+'">'+categories[x].items[i].name+'</label>');
				jQuery(li).appendTo(ul);
				
				createButtonDelete(li); // delete item (-)
				
				//links for items
				if(categories[x].items[i].url != undefined){
					a = jQuery(document.createElement("a"));
					img = jQuery(document.createElement("img"));
					jQuery(img).attr("src","assets/commonGfx/info.png");
					jQuery(img).css("vertical-align","text-bottom");
					jQuery(a).attr("href",categories[x].items[i].url);
					jQuery(a).attr("target","_blank");
					jQuery(a).css({"display":"block","float":"right"});
					jQuery(a).append(img);
					jQuery(a).appendTo(li);
				}
				
				
			}
		}
		
		// add items from localStorage
		for (j in localStorage){
			if( j.indexOf("uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-") >= 0 && j.indexOf('value') >= 0 ){
				xaddItem2(ul,j); // xaddItems2 creates items with labels
			}
		}
		
		addAddItemButton(ul,x);
		jQuery(ul).appendTo(accContent);
	}
	
	accordion();
	
	jQuery('.itemlist li').each(function(){
		if (window.localStorage.getItem(jQuery(this).attr('data-itemid'))=="true") {
			jQuery(this).children('input').attr('checked','checked');
		}
	});
	
	jQuery('.itemlist li input[type="checkbox"]').change(function(e) {
		var packedStatus;
		var itemid = jQuery(this).parent().attr("data-itemid");
		if (jQuery(this).attr("checked")!=undefined){
			packedStatus = "true";
		} else {
			packedStatus = "false";
		}
		window.localStorage.setItem(itemid,packedStatus);
	});
	
	jQuery("#itemPageBackButton").click(function(e){
		itemPageBackButtonPressed();
	});
	
	updateRemoveItemBtn();
	updateLocalStorageSaveOnBlur();
}

// delete item / update the functionality
function updateRemoveItemBtn()
{
	jQuery('.btnDeleteItem').unbind('click');
	jQuery('.btnDeleteItem').click(function(e) {
		e.preventDefault();
		askToDeleteItem( jQuery(this) );		
	});
}

function itemDelete( item ){
	var itemToDelete = item.siblings('input').attr('id');
	item.parent().hide();
	
	// remove data from localstorage
	if (localStorage.getItem(itemToDelete) !== null) {localStorage.removeItem(itemToDelete);}
	if (localStorage.getItem(itemToDelete+'-value') !== null) {localStorage.removeItem(itemToDelete+'-value');}
	if( itemToDelete.indexOf("uitem-") < 0 ){
		localStorage.setItem(itemToDelete+'-hidden',true);
	}else{

	}
	//Capture device backbutton
	bbItems();
}

function addAddItemButton(parentElm,x) {
	aibLi = jQuery(document.createElement("li"));
	aib = jQuery(document.createElement("a"));
	img = jQuery(document.createElement('img'));
	img.attr("src","assets/commonGfx/plus.png");
	aib.append(img);
	jQuery(aib).attr("href","#");
	jQuery(aib).addClass('aib');
	jQuery(aib).attr('data-x',x);

	jQuery(aib).appendTo(aibLi);
	jQuery(aibLi).appendTo(parentElm);
	
	jQuery(aib).unbind("click");
	jQuery(aib).click(function(e){
		e.preventDefault();
		selfAddedIdCount++;
		setSelfAddedIdCount( selfAddedIdCount );
		xaddItem( jQuery(this).parent().parent() , jQuery(this).data('x') );
	});
	

}

// return uitem count from localStorage
// if null then set to 0 and return 0
function getSelfAddedIdCount()
{
	var x = window.localStorage.getItem('selfAddedIdCount');
	if( x !== null ){
		return x;	
	}else{
		setSelfAddedIdCount(0);
		return 0;
	}
}

// set new count for uitems (selfAddedItems)
function setSelfAddedIdCount(amount)
{
	if(amount != undefined){
		window.localStorage.setItem('selfAddedIdCount',amount);
	}else{
		return false;
	}
}

// function for self-added items
// creates (form) input items
function xaddItem(parentElm,x){
	addLiNextAvailID = getSelfAddedIdCount();
	
	addLi = jQuery(document.createElement("li"));
	addLiCheckbox = jQuery(document.createElement("input"));
	addLiText = jQuery(document.createElement("input"));
	jQuery(addLi).attr("data-itemid","uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+addLiNextAvailID);
	jQuery(addLiCheckbox).attr("type","checkbox");
	jQuery(addLiCheckbox).attr("id","uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+addLiNextAvailID);
	jQuery(addLiCheckbox).attr("data-itemid","uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+addLiNextAvailID);
	jQuery(addLiCheckbox).appendTo(addLi);
	jQuery(addLiText).attr("type","text");
	jQuery(addLiText).attr("id","uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+addLiNextAvailID+"-value");
	jQuery(addLiText).attr("data-itemid","uitem-"+kohteentyyppiID+"-"+kohdeID+"-"+pituusID+"-"+x+"-"+addLiNextAvailID+"-value");
	jQuery(addLiText).appendTo(addLi);
	createButtonDelete(addLi); // delete item (-)	
	parentElm.children().last().before(addLi);
	
	// add to localstorage
	jQuery('.itemlist li input[type="checkbox"]').change(function(e) {
		var packedStatus;
		var itemid = jQuery(this).parent().attr("data-itemid");
		if (jQuery(this).attr("checked")!=undefined){
			packedStatus = "true";
		} else {
			packedStatus = "false";
		}
		window.localStorage.setItem(itemid,packedStatus);
	});
	
	updateRemoveItemBtn();
	updateLocalStorageSaveOnBlur();
}

// function for self-added items FROM LOCALSTORAGE
// creates label-items
function xaddItem2(parentElm,idItem){
	var idItem = idItem.replace('-value','');
	
	li = jQuery(document.createElement("li"));
	jQuery(li).attr("data-itemid",idItem);
	jQuery(li).css({'overflow':'hidden'});
	if( window.localStorage.getItem(idItem) === true ){
		jQuery(li).html('<input id="'+idItem+'" name="'+idItem+'" type="checkbox" checkbox="checkbox" /> <label for="'+idItem+'">'+window.localStorage.getItem(idItem+'-value')+'</label>'); // checked
	}else{
		jQuery(li).html('<input id="'+idItem+'" name="'+idItem+'" type="checkbox" /> <label for="'+idItem+'">'+window.localStorage.getItem(idItem+'-value')+'</label>'); // unchecked
	}
	
	createButtonDelete(li); // delete item (-)
	jQuery(li).appendTo(parentElm); // append the whole thing to the parent element
	
	/* Refresh actions */
	jQuery('.itemlist li input[type="checkbox"]').change(function(e) {
		var packedStatus;
		var itemid = jQuery(this).parent().attr("data-itemid");
		if (jQuery(this).attr("checked")!=undefined){
			packedStatus = "true";
		} else {
			packedStatus = "false";
		}
		window.localStorage.setItem(itemid,packedStatus);
	});
	updateRemoveItemBtn();
	updateLocalStorageSaveOnBlur();
}



// save the text value of uitem itemId + '-value'
function updateLocalStorageSaveOnBlur()
{
	jQuery('input[type=text]').unbind('blur');
	jQuery('input[type=text]').blur(function(e) {
		var val = jQuery(this).val();
		var itemId = jQuery(this).data('itemid');
		window.localStorage.setItem(itemId, val);
	});
}

//create accordion
function accordion() {
	jQuery('.accordion h3').click(function(e){
		if(jQuery(this).siblings('.accContent').css('display')=='block'){
			jQuery(this).siblings('.accContent').hide();
		}else{
			jQuery('.accordion .accContent').hide();
			jQuery(this).siblings('.accContent').show();
		}
	});
}

// create deletebutton
function createButtonDelete(parentElm)
{
	a = jQuery(document.createElement("a"));
	img = jQuery(document.createElement("img"));
	jQuery(img).attr("src","assets/commonGfx/minus.png");
	jQuery(a).attr("href",'#delete');
	jQuery(a).addClass('btnDeleteItem');
	jQuery(a).append(img);
	jQuery(a).appendTo(parentElm);

}

//backbutton handlers
function removeBBHandlers() {
	jQuery(document).unbind("backbutton");
}

function bbKohteentyyppi() {
	removeBBHandlers();
	jQuery(document).bind("backbutton",function() {
		bbKohteentyyppiPressed();
	});
}

function bbKohde() {
	removeBBHandlers();
	jQuery(document).bind("backbutton",function() {
		bbKohdePressed();
	});
}

function bbPituus() {
	removeBBHandlers();
	jQuery(document).bind("backbutton",function() {
		bbPituusPressed();
	});
}

function bbItems() {
	removeBBHandlers();
	jQuery(document).bind("backbutton",function() {
		bbItemsPressed();
	});
}

function bbKohteentyyppiPressed() {
	removeBBHandlers();
	window.location = "index.html";
}

function bbKohdePressed() {
	removeBBHandlers();
	changePage('assets/pages/kohteentyyppi/index.html', kohteentyyppi);
}

function bbPituusPressed() {
	removeBBHandlers();
	changePage("assets/pages/kohde/index.html",kohde);
}

function bbItemsPressed() {
	removeBBHandlers();
	itemPageBackButtonPressed();
}
