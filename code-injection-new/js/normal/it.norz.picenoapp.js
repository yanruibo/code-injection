





			var trad = {
							"it": [
								"DETTAGLIO ATTRAZIONI",
								"CHIAMA",
								"SITO",
								"SCRIVI",
								"MAPPA",
								"Sito Web",
								"Dove",
								"Contatti",
								"Indietro"
							],
							"en": [
								"ATTRACTIONS DETAIL",
								"CALL",
								"SITE",
								"WRITE",
								"MAP",
								"Web Site",
								"Where",
								"Contacts",
								"Back"
							]
						}
		


			$(document).ready(function() {
				if(window.localStorage.getItem("detailID") !== null)
				{
					//window.loction='attrazioni.html';
				}

				var langP = window.localStorage.getItem("lang");

				$('#titolo').html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$('#dd').html( ((langP == 'it')?trad.it[6]:trad.en[6]) );
				$('#cc').html( ((langP == 'it')?trad.it[7]:trad.en[7]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[8]:trad.en[8]) );

				var idDett = window.localStorage.getItem("detailID");
				var query = "SELECT nome, descrizione, email, telefono, indirizzo, sito_web, citta, img, latitudine, longitudine  FROM luoghi_interesse WHERE id = "+idDett;

				console.log(query);

				db.transaction(function(ctx) {
					ctx.executeSql(query, [], function(tx,attraction) {
						var attraction = attraction.rows.item(0);

						//primo blocco
						$('#attrName').html(clearLangTag(attraction.nome,langP));
						$('#placeName').html(attraction.citta);

						//secondo blocco (foto)
						$('.dettaglio_img').attr('src',attraction.img+'&width='+$(window).width());

						//terzo blocco
							//contatti - dove
							var conttmp = '';
							var buttons = '';
							if (attraction.indirizzo != '') {conttmp = attraction.indirizzo;}
							if (attraction.citta != '') {conttmp += '<br>'+attraction.citta;}
							$('#dove').html(conttmp);
							//contatti - recapiti
							conttmp='';
							if (attraction.telefono != '')
							{
								conttmp += 'Tel: <span id="tel" style="font-size: 14px;">'+attraction.telefono+'</span> <br>';
								buttons += '<a href="tel:'+attraction.telefono.replace(/ /g,"")+'">'+((langP == 'it')?trad.it[1]:trad.en[1])+'</a>';
							}
							if (attraction.sito_web != '')
							{
								conttmp += ((langP == 'it')?trad.it[5]:trad.en[5])+': <span id="tel" style="font-size: 14px;">'+attraction.sito_web+'</span> <br>';
								var siteDest = "";
								if ( strpos(vantage.sito_web,'http') === false )
								{
									siteDest = "http://"+vantage.sito_web;
								}
								else
								{
									siteDest = vantage.sito_web;
								}

								buttons += '<a href="'+siteDest+'" id="openSite" rel="'+siteDest+'">'+((langP == 'it')?trad.it[2]:trad.en[2])+'</a>';
							}
							if (attraction.email != '')
							{
								conttmp += 'Email: <span id="tel" style="font-size: 14px;">'+attraction.email+'</span> <br>';
								buttons += '<a href="mailto:'+attraction.email+'" id="sendMail" rel="mailto:'+attraction.email+'">'+((langP == 'it')?trad.it[3]:trad.en[3])+'</a>';
							}
							if (attraction.latitudine != '' && attraction.longitudine != '')
							{
								var mapUrl = 'http://maps.google.it/maps?q='+attraction.latitudine.replace(/ /g,"")+','+attraction.longitudine.replace(/ /g,"");
								// buttons += '<a href="#" onclick="loadURL(\''+mapUrl+'\')">'+trad.it[4]+'</a>';
								buttons += '<a href="'+mapUrl+'" id="navigate" rel="'+mapUrl+'">'+((langP == 'it')?trad.it[4]:trad.en[4])+'</a>';
							}
							$('#contatti').append(conttmp);
							$('#bottoniera').append(buttons);
						
						console.log(clearLangTag(attraction.descrizione,langP));
						console.log(attraction);
						//quarto blocco
						$('#descrizione').html(clearLangTag(attraction.descrizione,langP));


					});
				});
			});

			// $(window).on('click','#openSite',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });

			// $(window).on('click','#sendMail',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });

			// $(window).on('click','#navigate',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });
		








			var trad = {
    						"it": [
								"UTENTE",
                                "Nome:",
                                "Cognome:",
                                "Sesso:",
                                "Data di nascita:",
                                "Email:",
                                "Tel:",
                                "Codice pass:",
								"Indietro"
							],
							"en": [
                                "USER",
                                "First name:",
                                "Last name:",
                                "Sex:",
                                "Date of birth:",
                                "Email",
                                "Tel:",
                                "Pass code:",
								"Back"
							]
						}
		

			$(document).ready(function() {

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$('.nome').html( ((langP == 'it')?trad.it[1]:trad.en[1]) );
				$('.cognome').html( ((langP == 'it')?trad.it[2]:trad.en[2]) );
				$('.sesso').html( ((langP == 'it')?trad.it[3]:trad.en[3]) );
				$('.ddn').html( ((langP == 'it')?trad.it[4]:trad.en[4]) );
				$('.email').html( ((langP == 'it')?trad.it[5]:trad.en[5]) );
				$('.tel').html( ((langP == 'it')?trad.it[6]:trad.en[6]) );
				$('.cod').html( ((langP == 'it')?trad.it[7]:trad.en[7]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[8]:trad.en[8]) );

				// MULTI LINGUA


				db.transaction(function(ctx) {
					ctx.executeSql("SELECT nome, cognome,codice_card, genere, cellulare, data_nascita, email, barcode FROM utente", [], function(tx,users) {
						var user = users.rows.item(0);
						$('#nome').html(user.nome);
						$('#cognome').html(user.cognome);
						$('#sesso').html(user.genere);

						var tmp=user.data_nascita.split("-");
						$('#ddn').html(tmp[2]+'/'+tmp[1]+'/'+tmp[0]);

						$('#email').html(user.email);
						$('#tel').html(user.cellulare);
						$('#cod').html(user.codice_card);

						// $('#codebar').attr('src',user.barcode);
					});
				});
			});
		





			var urlInfo="http://seapass.it/core/partner.php?callback=?";
//			var urlInfo="http://192.168.1.242/seapass/core/partner.php?callback=?";

			$(document).ready(function() {

				var connStat = checkConnection();

				if(!connStat)
				{
					window.location.href = "index.html";
				}

				$.ajax({
					url: urlInfo, 
					type: "GET",
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						var infoRow = 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';

						switch ( langP )
						{
							case 'it':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.</h5>';
							break;

							case 'en':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">A network error has occurred. Check your connection and retry</h5>';
							break;
						}
							
						infoRow += 	'</div>';
						$('#content').append(infoRow);

					},
					success: function(data)
					{
						console.log('RICHIESTA CON SUCCESSO');
						for (var i = 0; i < data.length; i++)
						{
							var infoRow = '<div class="part" style="display: block; float: left; min-height: 133px; width: 120px; height: auto; border: 2px solid #555555; margin: 10px;">';
								infoRow += '<a href="'+data[i].link+'">';
								// infoRow +='<div id="link" style="display: none;">'+data[i].link+'</div>'

								infoRow += '<img src="'+data[i].logo+'" style="width: 120px"></img>';
								infoRow += '<h5 style="font-size: 18px; margin: 10px 0 0; color: #1E2636; text-align: center; line-height: 16px;">'+data[i].nome+'</h5>';
								infoRow += '</a>';
							infoRow += '</div>';
							$('#content').append(infoRow);
						}
					}
				});

				// $(window).on('tap','.part',function(e) {
				// 	loadURL($(this).children('#link').html());
				// });
			});
		





			var trad = {
							"it": [
								"INFORMAZIONI UTILI",
								"Indietro"
							],
							"en": [
								"USEFUL INFO",
								"Back"
							]
						}
		

			var urlInfo="http://seapass.it/core/app/json_infoutili.php";
//			var urlInfo="http://192.168.1.242/seapass/core/app/json_infoutili.php";

			$(document).ready(function() {

				var connStat = checkConnection();

				if(!connStat)
				{
					window.location.href = "index.html";
				}

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );

				// MULTI LINGUA

				$.ajax({
					type: "GET",
					url: urlInfo+'?callback=?',
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						var infoRow = 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';

						switch ( langP )
						{
							case 'it':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.</h5>';
							break;

							case 'en':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">A network error has occurred. Check your connection and retry</h5>';
							break;
						}
						
						infoRow += 	'</div>';
						$('#content').append(infoRow);

					},
					success: function(data)
					{
						var infoRow = "";

						for (var i = 0; i < data.length; i++)
						{
							infoRow += '<div class="row">';
							infoRow +='<div id="link" style="display: none;">'+data[i].tell+'</div>'
							// infoRow += '<img src="'+data[i].icona+'" style="float: left; margin-top: 25px; margin-left: 1%; margin-right: 1%; width: 35px;">';
							infoRow += '<img src="'+data[i].icona+'" style="float: left; margin-top: 25px; margin-left: 1%; margin-right: 1%; width: 35px;">';
							infoRow += '<div>';
								infoRow += '<h5>'+data[i].title+'</h5>';
								infoRow += '<span>'+data[i].dati+'</span>';
							infoRow += '</div>';
							infoRow += '</div>';
						}

						$('#content').html(infoRow);
					}
				});

				$(window).on('tap','.row',function(e) {
					loadURL($(this).children('#link').html());
				});
			});
		





			var trad = {
							"it": [
								"DETTAGLIO VANTAGGI",
								"CHIAMA",
								"SITO",
								"SCRIVI",
								"MAPPA",
								"Sito Web",
								"Dove",
								"Contatti",
								"Indietro"
							],
							"en": [
								"ADVANTAGES DETAIL",
								"CALL",
								"SITE",
								"WRITE",
								"MAP",
								"Web Site",
								"Where",
								"Contacts",
								"Back"
							]
						}
		

		
			$(document).ready(function() {
				if(window.localStorage.getItem("detailID") !== null)
				{
					//window.loction='attrazioni.html';
				}

				var langP = window.localStorage.getItem("lang");

				$('#titolo').html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$('#dd').html( ((langP == 'it')?trad.it[6]:trad.en[6]) );
				$('#cc').html( ((langP == 'it')?trad.it[7]:trad.en[7]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[8]:trad.en[8]) );

				var idDett = window.localStorage.getItem("detailID");
				var query = "SELECT titolo, descrizione, ragione_sociale, email, telefono, fax, via, num, cap, prov, sito_web, citta, img, latitudine, longitudine FROM vantaggi WHERE id = "+idDett;

				console.log(query);

				db.transaction(function(ctx) {
					ctx.executeSql(query, [], function(tx,vantage) {
						var vantage = vantage.rows.item(0);

						//primo blocco
						$('#attrName').html(clearLangTag(vantage.titolo,langP));
						$('#placeName').html(vantage.ragione_sociale);

						//secondo blocco (foto)
						$('.dettaglio_img').attr('src',vantage.img+'&width='+$(window).width());

						//terzo blocco
							//contatti - dove
							var conttmp = '';
							var buttons ='';
							if (vantage.indirizzo != '') {conttmp = vantage.via;}
							if (vantage.num != '') {conttmp += ', '+vantage.num;}
							if (vantage.cap != '') {conttmp += '<br>'+vantage.cap;}
							if (vantage.citta != '') {conttmp += ' '+vantage.citta;}
							if (vantage.prov != '') {conttmp += ' ('+vantage.prov+')';}
							$('#dove').html(conttmp);
							//contatti - recapiti
							conttmp='';

							if (vantage.telefono != '') 
							{
								conttmp = 'Tel: <span id="tel" style="font-size: 14px;">'+vantage.telefono+'</span> <br>';
								buttons += '<a href="tel:'+vantage.telefono.replace(/ /g,"")+'">'+((langP == 'it')?trad.it[1]:trad.en[1])+'</a>';
							}
							if (vantage.fax != '') 
							{
								conttmp += 'Fax: <span id="tel" style="font-size: 14px;">'+vantage.fax+'</span><br>';
							}
							if (vantage.sito_web != '') {
								var siteDest = "";
								if ( strpos(vantage.sito_web,'http') === false )
								{
									siteDest = "http://"+vantage.sito_web;
								}
								else
								{
									siteDest = vantage.sito_web;
								}
								conttmp += ((langP == 'it')?trad.it[5]:trad.en[5])+': <span id="tel" style="font-size: 14px;">'+vantage.sito_web+'</span> <br>';
								buttons += '<a href="'+siteDest+'" id="openSite" rel="http://'+vantage.sito_web+'">'+((langP == 'it')?trad.it[2]:trad.en[2])+'</a>'
							}
							if (vantage.email != '')
							{
								conttmp += 'Email: <span id="tel" style="font-size: 14px;">'+vantage.email+'</span>  <br>';
								buttons += '<a href="mailto:'+vantage.email+'" id="sendMail" rel="mailto:'+vantage.email+'">'+((langP == 'it')?trad.it[3]:trad.en[3])+'</a>';
							}
							if (vantage.latitudine != '' && vantage.longitudine != '')
							{
								var mapUrl = 'http://maps.google.it/maps?q='+vantage.latitudine.replace(/ /g,"")+','+vantage.longitudine.replace(/ /g,"");
								buttons += '<a href="'+mapUrl+'" id="navigate" rel="'+mapUrl+'">'+((langP == 'it')?trad.it[4]:trad.en[4])+'</a>';
							}
							$('#contatti').append(conttmp);
							$('#bottoniera').append(buttons);

						//quarto blocco
						$('#descrizione').html(clearLangTag(vantage.descrizione,langP));
					});
				});
			});

			// $(window).on('click','#openSite',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });

			// $(window).on('click','#sendMail',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });

			// $(window).on('click','#navigate',function(e) {
			// 	loadURL($(this).attr("rel"));
			// });
		










			var trad = {
						"it": [
							"VANTAGGI",
							"Filtra",
							[
								"Tutte le categorie",
								"Arte &amp; Cultura",
								"   Musei",
								"Gastronomia &amp; Gusto",
								"   Enogastronomia",
								"Sport &amp; Benessere",
								"   Benessere",
								"   Sport",
								"Tempo libero &amp; Servizi",
								"   Abbigliamento e accessori",
								"   Attività",
								"   Auto",
								"   Cultura",
								"   Escursioni",
								"   Gioiellerie",
								"   Locali",
								"   Servizi",
								"   Tempo libero",
								"   Visite città",
								"   Wi-Fi free",
								"Tipicità &amp; Eccellenze",
								"   Eccellenze"
							],
							[
								"Tutte le città",
								"Acquasanta Terme",
								"Acquaviva Picena",
								"Appignano del Tronto",
								"Arquata del Tronto",
								"Ascoli Piceno",
								"Carassai",
								"Castel di Lama",
								"Castignano",
								"Castorano",
								"Colli del Tronto",
								"Comunanza",
								"Cossignano",
								"Cupra Marittima",
								"Folignano",
								"Force",
								"Grottammare",
								"Maltignano",
								"Massignano",
								"Monsampolo del Tronto",
								"Montalto Marche",
								"Montedinove",
								"Montefiore dell'Aso",
								"Montegallo",
								"Montemonaco",
								"Monteprandone",
								"Offida",
								"Palmiano",
								"Ripatransone",
								"Roccafluvione",
								"Rotella",
								"San Benedetto del Tronto",
								"Spinetoli",
								"Venarotta",
								"Accumoli"
							],
							[
								"Tutte le distanze",
								"500m dalla mia posizione",
								"1Km dalla mia posizione",
								"2Km dalla mia posizione",
								"5Km dalla mia posizione",
								"10Km dalla mia posizione",
								"50Km dalla mia posizione"
							],
							[
								"Categoria:",
								"Città:",
								"Distanza:"
							],
							"Indietro",
							"Guarda"
						],
						"en": [
							"ADVANTAGES",
							"Filter",
							[
								"All category",
								"Arts &amp; Culture",
								"   Museums",
								"Food &amp; Taste",
								"   Food and Wine",
								"Sport &amp; Wellness",
								"   Wellness",
								"   Sport",
								"Leisure &amp; Services",
								"   Clothing and Accessories",
								"   Activity",
								"   Cars",
								"   Culture",
								"   Excursions",
								"   Jewellers",
								"   Places",
								"   Services",
								"   Leisure",
								"   Guided city",
								"   Wi-Fi free",
								"Typicality &amp; Excellence",
								"   Excellence"
							],
							[
								"All city",
								"Acquasanta Terme",
								"Acquaviva Picena",
								"Appignano del Tronto",
								"Arquata del Tronto",
								"Ascoli Piceno",
								"Carassai",
								"Castel di Lama",
								"Castignano",
								"Castorano",
								"Colli del Tronto",
								"Comunanza",
								"Cossignano",
								"Cupra Marittima",
								"Folignano",
								"Force",
								"Grottammare",
								"Maltignano",
								"Massignano",
								"Monsampolo del Tronto",
								"Montalto Marche",
								"Montedinove",
								"Montefiore dell'Aso",
								"Montegallo",
								"Montemonaco",
								"Monteprandone",
								"Offida",
								"Palmiano",
								"Ripatransone",
								"Roccafluvione",
								"Rotella",
								"San Benedetto del Tronto",
								"Spinetoli",
								"Venarotta",
								"Accumoli"
							],
							[
								"All distance",
								"500m from here",
								"1Km from here",
								"2Km from here",
								"5Km from here",
								"10Km from here",
								"50Km from here"
							],
							[
								"Category:",
								"City:",
								"Distance:"
							],
							"Back",
							"View"
						]
					}
		

			var distance = (( window.localStorage.getItem("filterDistance") !== null )?window.localStorage.getItem("filterDistance"):-1);
			var city = (( window.localStorage.getItem("filterCity") !== null ) ?window.localStorage.getItem("filterCity"):-1);
			var categoria = (( window.localStorage.getItem("filterCategory") !== null )?window.localStorage.getItem("filterCategory"):-1);

			$(document).ready(function()
			{


				switch (langP)
				{
					case 'it':
						$("#distance option").each(function(i) {
							$(this).html( trad.it[4][i] );
						});

						$("#category option").each(function(i) {
							$(this).html( trad.it[2][i] );
						});

						$("#city option").each(function(i) {
							$(this).html( trad.it[3][i] );
						});

						$("#filter-box div span").each(function(i) {
							$(this).html( trad.it[5][i] );
						});

						$('#titolo').html( trad.it[0] );
						$("#filterNow").html( trad.it[7] );
						$("#filtra").html( trad.it[1] );

						$("#header .barbtn").html( trad.it[6] );
						// $('#distance').html( trad.it[1] );
						// $('#category').html( trad.it[2] );
						// $('#city').html( trad.it[3] );
					break;

					case 'en':
						$("#distance option").each(function(i) {
							$(this).html( trad.en[4][i] );
						});

						$("#category option").each(function(i) {
							$(this).html( trad.en[2][i] );
						});

						$("#city option").each(function(i) {
							$(this).html( trad.en[3][i] );
						});

						$("#filter-box div span").each(function(i) {
							$(this).html( trad.en[5][i] );
						});

						$('#titolo').html( trad.en[0] );
						$("#filterNow").html( trad.en[7] );
						$("#filtra").html( trad.en[1] );

						$("#header .barbtn").html( trad.en[6] );
						// $('#distance').html( trad.en[1] );
						// $('#category').html( trad.en[2] );
						// $('#city').html( trad.en[3] );
					break;

				};


				if ( distance != -1 || city != -1 || categoria!= -1 )
				{
					$("#filter-box").css( 'height', '0');
				}

				$('#distance').val(distance);
				$('#category').val(categoria);
				$('#city').val(city);

				loadVantage();				

				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			});

			$(window).on('tap','.fumetto',function(e) {
				var idTmp=$(this).attr('rel');

				window.localStorage.setItem('detailID',idTmp);
				window.location.href='vanDetail.html';
			});

			$(window).on('tap','.row',function(e) {
				var idTmp=$(this).attr('id');

				window.localStorage.setItem('detailID',idTmp);
				window.location.href='vanDetail.html';
			});

			$(window).on('tap','#filtra',function(e) {
				$("#filter-box").animate({ height: '100%'}, 500);
			});

			$(window).on('tap','#filterNow',function(e) {

				window.localStorage.setItem('filterCity',city);
				window.localStorage.setItem('filterCategory',categoria);
				window.localStorage.setItem('filterDistance',distance);
				
				$('#list-Van').empty();
				loadVantage();

				$("#filter-box").animate({ height: 0}, 500);
			});

			function filterChange()
			{
				if( distance != -1 && $('#city').val() != -1 )
				{
					$('#distance').val(-1);
				}
				
				if( city != -1 && $('#distance').val() != -1 )
				{
					$('#city').val(-1);
					
				}

				distance = $('#distance').val();
				categoria = $('#category').val();
				city = $('#city').val();
			}


			function loadVantage()
			{
				CPage=0;

				console.log('distanza: '+distance+', categoria: '+categoria+', città: '+city);

				prepareSectionJson('vantaggi',distance,categoria,city);
			}

			function onSuccess(position)
			{
				ulat = position.coords.latitude;
				ulon = position.coords.longitude;

				window.localStorage.setItem('ulat',ulat);
				window.localStorage.setItem('ulon',ulon);
			}

			function onError(error) {}


		

					$(window).scroll(function()
					{
						if ($(window).scrollTop() + $(window).height() >= $(document).height())
						{
							var pag = getNumberOfPage();
							CPage++;

							if ( CPage+1 <= pag )
							{
								var ThisPage=getPage();
								loadList('#list-Van',ThisPage);

								if ( CPage+1 == pag )
								{
									$('#indicatore').remove();
								}
							}
							
						}
					});
				







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
        






			var trad = {
    						"it": [
								"REGISTRAZIONE",
                                "Hai già il Piceno Pass?",
                                "Si",
                                "No",
                                "Nome*",
                                "Cognome*",
                                "Cellulare",
                                "Ho letto e accetto le condizioni della normativa sulla <a href='privacy.html'>privacy</a>",
                                "Registrati",
								"Indietro"
                                
							],
							"en": [
                                "REGISTRATION",
                                "You already have the Piceno Pass?",
                                "Yes",
                                "No",
                                "First name*",
                                "Last name*",
                                "Cellphone",
                                "I have read and agree to the terms of the <a href='privacy_en.html'>Privacy Policy</a>",
                                "Register",
								"Back"
								
							]
						}
		

			$(document).ready(function() {

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$(".radio span").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );
				$("label[for='guest']").html( ((langP == 'it')?trad.it[2]:trad.en[2]) );
				$("label[for='city']").html( ((langP == 'it')?trad.it[3]:trad.en[3]) );
				$("#nome").attr('placeholder', ((langP == 'it')?trad.it[4]:trad.en[4]) );
				$("#cognome").attr('placeholder', ((langP == 'it')?trad.it[5]:trad.en[5]) );
				$("#cellulare").attr('placeholder', ((langP == 'it')?trad.it[6]:trad.en[6]) );
				$("label[for='privacy']").html( ((langP == 'it')?trad.it[7]:trad.en[7]) );
				$("#registrati").html( ((langP == 'it')?trad.it[8]:trad.en[8]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[9]:trad.en[9]) );

				// MULTI LINGUA



				$('#card_code').hide();


				$('#registrati').click(function()
				{
					sendRegRequest();
				});

				$('#guest').click(function()
				{
					$('#card_code').show();
				});

				$('#city').click(function()
				{
					$('#card_code').hide();
				});

			})
		









			var trad = {
							"it": [
								"Login",
								"Utente",
								"Messaggi",
								"Vantaggi",
								"Magazine",
								"Attrazioni",
								"Informazioni Utili",
								"Social Wall",
								"Eventi &amp; Tour",
								"<span>&#xe03d;</span>Chi Siamo",
								"<span>&#xe14d;</span>Partners"
							],
							"en": [
								"Login",
								"User",
								"Messages",
								"Advantages",
								"Magazine",
								"Attractions",
								"Useful Info",
								"Social Wall",
								"Events &amp; Tours",
								"<span>&#xe03d;</span>About",
								"<span>&#xe14d;</span>Partners"
							]
						}
		

			function setupMainPage()
			{
				window.localStorage.removeItem("filterCity");
				window.localStorage.removeItem("filterCategory");
				window.localStorage.removeItem("filterDistance");

				if(window.localStorage.getItem("id") !== null)
				{
					$('#loginButton').hide();
					$('#userButton').hide();
					$('#userButton').show();
					$('#scollegatiButton').show();
				}
				else
				{
					$('#userButton').hide();
					$('#loginButton').hide();
					$('#loginButton').show();
					$('#scollegatiButton').hide();
				}
			}

			$(document).ready(function() {

				if(window.localStorage.getItem("lang") === null)
				{
					window.localStorage.setItem("lang", "it");
				}


				switch(window.localStorage.getItem("lang"))
				{
					case 'it':
						$('#en').show();
						$('#it').hide();
					break;

					case 'en':
						$('#it').show();
						$('#en').hide();
					break;

				}

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$('#loginButton h1').html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$('#userButton h1').html( ((langP == 'it')?trad.it[1]:trad.en[1]) );
				$('#messaggiHbutton h1').html( ((langP == 'it')?trad.it[2]:trad.en[2]) );
				$('#vantagginHbutton h1').html( ((langP == 'it')?trad.it[3]:trad.en[3]) );
				$('#magazineHbutton h1').html( ((langP == 'it')?trad.it[4]:trad.en[4]) );
				$('#attrazioniHbutton h1').html( ((langP == 'it')?trad.it[5]:trad.en[5]) );
				$('#infoHbutton h1').html( ((langP == 'it')?trad.it[6]:trad.en[6]) );
				$('#swHbutton h1').html( ((langP == 'it')?trad.it[7]:trad.en[7]) );
				$('#etHbutton h1').html( ((langP == 'it')?trad.it[8]:trad.en[8]) );
				$('#about').html( ((langP == 'it')?trad.it[9]:trad.en[9]) );
				$('#partner').html( ((langP == 'it')?trad.it[10]:trad.en[10]) );

				//FNE MULTI

				//calcolo altezza
				var h = parseInt($(window).height());
				// h = (h-146);
				h = (h-133);
				$('#content').css('height', h+'px');

				//var h = $('#content').height();
				var cH = (Math.floor(((h-12) /8)))-1;
				var fontS = (15*cH)/130;
				fontS = (fontS<10)? 10 : fontS;
				//alert(h);
				$('#content div').css('height', cH+'px');
				$('#content div a h1').css('font-size', (fontS)*2+'px');
				$('#content div a h1').css('line-height', cH+'px');
				$('#content div a span').css('font-size', (fontS)*3+'px');
				$('#content div a span').css('line-height', cH+'px');
				$('#content div').css('background-size', cH+'px');
				// $('#content div a h1').css('line-height', cH+'px');

				setupMainPage();

				$(window).on('tap','#impostazioni', function(){
					var tog = $("#impo").css('height');

					if( tog == '0px' )
					{
						$("#impo").animate({ height: '50%'}, 500);
					}
					else
					{
						$("#impo").animate({ height: '0'}, 500);
					}
				});

				$(window).on('tap','.langChoice', function(){
					var langId = $(this).attr('id');

					window.localStorage.setItem("lang", langId);

					location.href="index.html";
				});
			});

			window.onresize=function(){
				//calcolo altezza
				var h = parseInt($(window).height());
				// h = (h-146);
				h = (h-133);
				$('#content').css('height', h+'px');

				//var h = $('#content').height();
				var cH = (Math.floor(((h-12) /8)))-1;
				var fontS = (15*cH)/130;
				fontS = (fontS<10)? 10 : fontS;
				//alert(h);
				$('#content div').css('height', cH+'px');
				$('#content div a h1').css('font-size', (fontS)*2+'px');
				$('#content div a h1').css('line-height', cH+'px');
				$('#content div a span').css('font-size', (fontS)*3+'px');
				$('#content div a span').css('line-height', cH+'px');
				$('#content div').css('background-size', cH+'px');
				// $('#content div a h1').css('line-height', cH+'px');
			};
	
			function scollega()
			{
				lOut();
				setupMainPage();
			}

		


		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-41699387-1']);
		_gaq.push(['_setDomainName', 'none']);
		_gaq.push(['_trackPageview', 'homepage']);
	










			var trad = {
							"it": [
								"ATTRAZIONI",
								"Filtra",
								[
									"Tutte le categorie",
									"Biblioteche",
									"Chiese",
									"Luoghi d'interesse",
									"Monumenti",
									"Musei"
								],
								[
									"Tutte città",
									"San Benedetto del Tronto",
									"Ascoli Piceno",
									"Acquasanta Terme",
									"Acquaviva Picena",
									"Appignano del Tronto",
									"Arquata del Tronto",
									"Carassai",
									"Castel di Lama",
									"Castignano",
									"Castorano",
									"Colli del Tronto",
									"Comunanza",
									"Cossignano",
									"Cupra Marittima",
									"Folignano",
									"Force",
									"Grottammare",
									"Maltignano",
									"Massignano",
									"Monsampolo del Tronto",
									"Montalto Marche",
									"Montedinove",
									"Montefiore dell'Aso",
									"Montegallo",
									"Montemonaco",
									"Monteprandone",
									"Offida",
									"Palmiano",
									"Ripatransone",
									"Roccafluvione",
									"Rotella",
									"Spinetoli",
									"Venarotta",
									"Accumoli"
								],
								[
									"Tutte le distanze",
									"500m dalla mia posizione",
									"1Km dalla mia posizione",
									"2Km dalla mia posizione",
									"5Km dalla mia posizione",
									"10Km dalla mia posizione",
									"50Km dalla mia posizione"
								],
								[
									"Categoria:",
									"Città:",
									"Distanza:"
								],
								"Indietro",
								"Guarda"
							],
							"en": [
								"ATTRACTIONS",
								"Filter",
								[
									"All category",
									"Libraries",
									"Churches",
									"Places of interest",
									"Monuments",
									"Museums"
								],
								[
									"All city",
									"San Benedetto del Tronto",
									"Ascoli Piceno",
									"Acquasanta Terme",
									"Acquaviva Picena",
									"Appignano del Tronto",
									"Arquata del Tronto",
									"Carassai",
									"Castel di Lama",
									"Castignano",
									"Castorano",
									"Colli del Tronto",
									"Comunanza",
									"Cossignano",
									"Cupra Marittima",
									"Folignano",
									"Force",
									"Grottammare",
									"Maltignano",
									"Massignano",
									"Monsampolo del Tronto",
									"Montalto Marche",
									"Montedinove",
									"Montefiore dell'Aso",
									"Montegallo",
									"Montemonaco",
									"Monteprandone",
									"Offida",
									"Palmiano",
									"Ripatransone",
									"Roccafluvione",
									"Rotella",
									"Spinetoli",
									"Venarotta",
									"Accumoli"
								],
								[
									"All distance",
									"500m from here",
									"1Km from here",
									"2Km from here",
									"5Km from here",
									"10Km from here",
									"50Km from here"
								],
								[
									"Category:",
									"City:",
									"Distance:"
								],
								"Back",
								"View"
							]
						};
		



			var distance = (( window.localStorage.getItem("filterDistance") !== null )?window.localStorage.getItem("filterDistance"):-1);
			var city = (( window.localStorage.getItem("filterCity") !== null ) ?window.localStorage.getItem("filterCity"):-1);
			var categoria = (( window.localStorage.getItem("filterCategory") !== null )?window.localStorage.getItem("filterCategory"):-1);

			$(document).ready(function()
			{
				switch (langP)
				{
					case 'it':
						$("#distance option").each(function(i) {
							$(this).html( trad.it[4][i] );
						});

						$("#category option").each(function(i) {
							$(this).html( trad.it[2][i] );
						});

						$("#city option").each(function(i) {
							$(this).html( trad.it[3][i] );
						});

						$("#filter-box div span").each(function(i) {
							$(this).html( trad.it[5][i] );
						});

						$('#titolo').html( trad.it[0] );
						$("#filterNow").html( trad.it[7] );
						$("#filtra").html( trad.it[1] );

						$("#header .barbtn").html( trad.it[6] );
						// $('#distance').html( trad.it[1] );
						// $('#category').html( trad.it[2] );
						// $('#city').html( trad.it[3] );
					break;

					case 'en':
						$("#distance option").each(function(i) {
							$(this).html( trad.en[4][i] );
						});

						$("#category option").each(function(i) {
							$(this).html( trad.en[2][i] );
						});

						$("#city option").each(function(i) {
							$(this).html( trad.en[3][i] );
						});

						$("#filter-box div span").each(function(i) {
							$(this).html( trad.en[5][i] );
						});

						$('#titolo').html( trad.en[0] );
						$("#filterNow").html( trad.en[7] );
						$("#filtra").html( trad.en[1] );

						$("#header .barbtn").html( trad.en[6] );
						// $('#distance').html( trad.en[1] );
						// $('#category').html( trad.en[2] );
						// $('#city').html( trad.en[3] );
					break;

				};

				if ( distance != -1 || city != -1 || categoria!= -1 )
				{
					$("#filter-box").css( 'height', '0');
				}

				$('#distance').val(distance);
				$('#category').val(categoria);
				$('#city').val(city);
				
				loadAttraction();

				navigator.geolocation.getCurrentPosition(onSuccess, onError);				
			});

			$(window).on('tap','.fumetto', function(){
				var idTmp=$(this).attr('rel');

				window.localStorage.setItem('detailID',idTmp);
				window.location.href='attrDetail.html';
			});

			$(window).on('tap','.row', function(){
				var idTmp=$(this).attr('id');

				window.localStorage.setItem('detailID',idTmp);
				window.location.href='attrDetail.html';
			});

			$(window).on('tap','#filtra', function(){
				$("#filter-box").animate({ height: '100%'}, 500);
			});

			$(window).on('tap','#filterNow', function(){

				window.localStorage.setItem('filterCity',city);
				window.localStorage.setItem('filterCategory',categoria);
				window.localStorage.setItem('filterDistance',distance);

				$('#list-Atr').empty();
				loadAttraction();

				$("#filter-box").animate({ height: 0}, 500);
			});

			function filterChange()
			{
				if( distance != -1 && $('#city').val() != -1 )
				{
					$('#distance').val(-1);
				}
				
				if( city != -1 && $('#distance').val() != -1 )
				{
					$('#city').val(-1);
					
				}

				distance = $('#distance').val();
				categoria = $('#category').val();
				city = $('#city').val();
			}

			function loadAttraction()
			{
				CPage=0;

				prepareSectionJson('luoghi_interesse',distance,categoria,city);
			}

			function onSuccess(position)
			{
				ulat = position.coords.latitude;
				ulon = position.coords.longitude;

				window.localStorage.setItem('ulat',ulat);
				window.localStorage.setItem('ulon',ulon);
			}

			function onError(error) {}
		

					$(window).scroll(function()
					{
						if ($(window).scrollTop() + $(window).height() >= $(document).height())
						{
							var pag = getNumberOfPage();
							CPage++;

							if ( CPage+1 <= pag )
							{
								var ThisPage=getPage();
								loadList('#list-Atr',ThisPage);

								if ( CPage+1 == pag )
								{
									$('#indicatore').remove();
								}
							}
						}
					});
				








			$(document).ready(function() {

				$.ajax({
					type: "GET",
					url: "http://seapass.it/core/app/initialize.php?callback=?",
					// data: 'id=1',
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						switch ( langP )
						{
							case 'it':
								alert('Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.');
							break;

							case 'en':
								alert('A network error has occurred. Check your connection and retry');
							break;
						}
					},
					success: function(data)
					{
						$('#wall').dcSocialStream({
							feeds:{
								twitter: {
									id: 'RolandDGItalia',
									thumb: true
								},
								rss: {
									id: 'http://feeds.feedburner.com/rolandblog/jhDB'
								},
								youtube: {
									id: 'rolanddme'
								}
							},
							rotate: {
								delay: 0
							},
							control: false,
							filter: true,
							wall: true,
							cache: false,
							max: 'limit',
							limit: 10,
						});
					}
				});

				

			});
		






			var trad = {
    						"it": [
								"Indietro",
								"Registrati"
							],
							"en": [
								"Back",
								"Register"
							]
						}
		


			$(document).ready(function() {
				var langP = window.localStorage.getItem("lang");


				$("#header .barbtn").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$("#RegisterNow").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );

			});

			// $('#ConnectNow').tap(function()
			// {
			// 	sendLogRequest();
			// })
			$('#ConnectNow').click(function()
			{
				sendLogRequest();
			});

			$('#RegisterNow').click(function()
			{
				location.href="register.html";
			});
		










			var trad = {
							"it": [
								"EVENTI &amp; TOUR",
								"Indietro"
							],
							"en": [
								"EVENTS &amp; TOURS",
								"Back"
							]
						}
		

			var urlInfo="http://seapass.it/core/json_et.php";
//			var urlInfo="http://192.168.1.242/seapass/core/json_et.php";

			$(document).ready(function() {

				// var connStat = checkConnection();

				// if(!connStat)
				// {
				// 	window.location.href = "index.html";
				// }

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );

				// MULTI LINGUA

				$.ajax({
					type: "GET",
					url: urlInfo+'?callback=?'+'&lang='+langP,
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						// $('#loading').remove();

						var infoRow = 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';

						switch ( langP )
						{
							case 'it':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.</h5>';
							break;

							case 'en':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">A network error has occurred. Check your connection and retry</h5>';
							break;
						}
						
						infoRow += 	'</div>';
						$('#content').append(infoRow);

					},
					success: function(data)
					{
						// $('#content').append(data.length);
						// $('#content').append(JSON.stringify(data));
						$('#content').append(" ");

						var infoRow = ""

						for (var i = 0; i < data.length; i++)
						{ 
							//var color = (data[i].categoria == 'Tour')?'background: #428736; ':'background: #CB00FF; '
							// var infoRow = '<div class="row" style="min-height: 80px; height: auto; padding-left: 4%; width: 96%">';
								infoRow += 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';
								infoRow +=		'<a href="'+data[i].link+'">'
								//infoRow +=		'<div id="link" style="display: none;">'+data[i].link+'</div>'
								infoRow += 		'<h5 style="font-size: 18px; margin: 10px 0 0;">'+data[i].title+'</h5>';
								infoRow += 		(data[i].categoria == 'Tour')?'<span style="color: #1E2636;">'+data[i].categoria+' - prossima data: '+data[i].data+'</span>':'<span style="color: #1E2636;">'+data[i].categoria+'</span>';
								infoRow +=		'</a>'
								infoRow += 	'</div>';
							
						}
						$('#content').html(infoRow);
						// $('#content').append(infoRow);
						// $('#loading').remove();
					}
				});

				// $(window).on('tap','.row',function(e) {
				// 	loadURL($(this).children('#link').html());
				// });
			});
		





			var trad = {
							"it": [
								"MAGAZINE",
								"Indietro"
							],
							"en": [
								"MAGAZINE",
								"Back"
							]
						}
		

			var urlInfo="http://seapass.it/core/json_news.php";
//			var urlInfo="http://192.168.1.242/seapass/core/json_news.php";

			$(document).ready(function() {

				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );

				// MULTI LINGUA

				$.ajax({
					type: "GET",
					url: urlInfo+'?callback=?'+'&lang='+langP,
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						// $('#loading').remove();
						// spinner.stop();

						var infoRow = 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';

						switch ( langP )
						{
							case 'it':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.</h5>';
							break;

							case 'en':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">A network error has occurred. Check your connection and retry</h5>';
							break;
						}
						
						infoRow += 	'</div>';
						$('#content').append(infoRow);

					},
					success: function(data)
					{
						// spinner.stop();

						// $('#content').append(data.length);

						var infoRow = "";

						for (var i = 0; i < data.length; i++)
						{
								infoRow += '<div class="row" style="min-height: 60px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';
								infoRow += '<a href="'+data[i].link+'">';
								infoRow += '<h5 style="font-size: 18px; margin: 10px 0 0; color: #FFFFFF;">'+data[i].title.replace(/(<([^>]+)>)/ig,"")+'</h5>';
								infoRow += '<span style="color: #1E2636;">'+pub2date(data[i].date)+'</span>';
								infoRow += '</a>';
								infoRow += '</div>';
						}

						$('#content').html(infoRow);
					}
				});

				// $(window).on('tap','.row',function(e) {
				// 	loadURL($(this).children('#link').html());
				// });
			});
		





			var trad = {
							"it": [
								"MESSAGGI",
								"Indietro"
							],
							"en": [
								"MESSAGES",
								"Back"
							]
						}
		

			var urlInfo="http://seapass.it/core/jsonMsg.php";
//			var urlInfo="http://192.168.1.242/seapass/core/jsonMsg.php";
			var langP = window.localStorage.getItem("lang");

			$(document).ready(function() {

				var connStat = checkConnection();

				if(!connStat)
				{
					window.location.href = "index.html";
				}
				
				// MULTI LINGUA

				var langP = window.localStorage.getItem("lang");

				$("#titolo").html( ((langP == 'it')?trad.it[0]:trad.en[0]) );
				$("#header .barbtn").html( ((langP == 'it')?trad.it[1]:trad.en[1]) );

				// MULTI LINGUA

				$.ajax({
					type: "GET",
					url: urlInfo+'?callback=?',
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						var infoRow = 	'<div class="row" style="min-height: 40px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';

						switch ( langP )
						{
							case 'it':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">Si è verificato un problema di connessione. Controlla le tue impostazioni di rete e riprova.</h5>';
							break;

							case 'en':
								infoRow += 	'<h5 style="font-size: 18px; margin: 10px 0 0;">A network error has occurred. Check your connection and retry</h5>';
							break;
						}
							
						infoRow += 	'</div>';
						$('#content').html(infoRow);

					},
					success: function(data)
					{
						var infoRow = "";

						for (var i = 0; i < data.length; i++)
						{
							// var infoRow = '<div class="row" style="min-height: 80px; height: auto; padding-left: 4%; width: 96%">';
							infoRow += '<div class="row" style="min-height: 80px; height: auto; padding-left: 4%; padding-right: 4%; padding-bottom: 1%; width: 92%">';
							infoRow += '<h5 style="font-size: 18px; margin: 10px 0 0; color: #1E2636;">'+clearLangTag(data[i].title,langP)+'</h5>';
							infoRow += '<span>'+formatDate(data[i].pubDate)+'<br><br>'+clearLangTag(data[i].description,langP)+'</span>';
							infoRow += '</div>';
							
						}
						
						$('#content').html(infoRow);
						//console.log(data);
					}
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


function sendRegRequest()
{
	var nome = document.getElementById('nome').value;
	var cognome = document.getElementById('cognome').value;
	var mail = document.getElementById('email').value;
	var pasw = document.getElementById('psw').value;

	var type = $('input[name="tipo"]:checked').val();
	var code = ((type=='guest')? 'PICPSB'+document.getElementById('cod1').value+document.getElementById('cod2').value : '');

	var cell = document.getElementById('cellulare').value;

	var privacy = document.getElementById('privacy').value;


	var dataR = "http://www.picenopass.it/registrazioneM.php?callback=?&asdh738gd7fv81g93dh";
//	var dataR = "http://192.168.1.242/seacard.it/registrazioneM.php?callback=?";

	if ( nome!="" && cognome!="" && mail!="" && pasw!="" && privacy=="1" )
	{
		$.ajax({
			type: "GET",
			url: dataR,
			data:	"nome="+nome
					+"&cognome="+cognome
					+"&email="+mail
					+"&psw="+pasw
					+"&aType="+type
					+"&cellulare="+cell
					+"&privacy="+privacy
					+"&codice="+code,
			dataType: 'jsonp',
			success: function(UD)
			{
				console.log(UD);
				if(UD.status=="200")
				{

					switch ( window.localStorage.getItem("lang") )
					{
						case 'it':
							alert('Ti è stata inviata una email con il riepilogo dei dati della tua registrazione. Puoi accedere con la tua email e la tua password');
						break;

						case 'en':
							alert('We have just sent you an email with a summary of your registration details. You can sign in with your email and password');
						break;
					}
					
					location.href="login.html";
				}
				else
				{
					showError(UD.messaggio);
				}
			},
			error: function()
			{
				switch ( window.localStorage.getItem("lang") )
				{
					case 'it':
						showError('Connessione al server fallita');
					break;

					case 'en':
						showError('Connecting to the server failed');
					break;
				}
				
			}
		});
		// $.ajax({
		// 	type: "POST",
		// 	url: dataR,
		// 	data: JSON.stringify({
		// 			"nome":			nome,
		// 			"cognome":		cognome,
		// 			"email":		mail,
		// 			"psw":			pasw,
		// 			"aType":		type,
		// 			"cellulare":	cell,
		// 			"privacy":		privacy, 
		// 			"codice":		code
		// 		}),
		// 	dataType: 'jsonp',
		// 	success: function(UD)
		// 	{
		// 		alert('richiesta avvenuta con successo');
		// 		console.log(UD);
		// 		if(UD.status==200)
		// 		{
		// 			alert('stato 200');
		// 			location.href="login.html";
		// 		}
		// 		else
		// 		{
		// 			alert('stato 400');
		// 			showError(UD.messaggio);
		// 		}
		// 	},
		// 	error: function()
		// 	{
		// 		alert('richiesta avvenuta con insuccesso');
		// 		showError('Connessione al server fallita');
		// 	}
		// });
	}
	else
	{
		switch ( window.localStorage.getItem("lang") )
		{
			case 'it':
				showError('Devi riempire i campi obligatori');
			break;

			case 'en':
				showError('You must fill in the required fields');
			break;
		}	
	}
}

var exitPagJson="";
var CPage=0;
var stopSemaforo=false;
var CurrentSection="";
var uLat=42.949958;
var uLon=13.882078;
var langP = window.localStorage.getItem("lang");
window.localStorage.setItem('ulat',42.949958);
window.localStorage.setItem('ulon',13.882078);


function loadList(contenitore, elements)
{
	// alert('load list');
	//$(contenitore).empty();
	//console.log(elements);

	// console.log(CPage);

	if ( elements.length > 0 )
	{
		for (var i = 0; i < elements.length; i++)
		{
			var cat = (elements[i].macroCat)?clearLangTag(elements[i].macroCat,'it').replace(/ /g,"-"):clearLangTag(elements[i].categoria,'it').replace(/ /g,"-");
			
			var strTmp = '<div class="row" style="height: auto; min-height: 80px;" id="'
			+elements[i].id
			+'">  <img src="img/categorie/'
			+cat
			+'.png" > <div> <h5>'
			+clearLangTag(elements[i].nome,langP)
			+'</h5> <span>a '
			+roundTwo(elements[i].dist)
			+'Km</span></div></div>';
			// console.log(strTmp);
			$(contenitore).append(strTmp);
		}
	}
	else
	{
		var strTmp = '<h4 style="text-align: center;">Nessun elemento da visualizzare</h4>';
		// console.log(strTmp);
		$(contenitore).append(strTmp);
	}
	
}

function printPageActive(blocco)
{
	var npage=getNumberOfPage();
	if (npage > 0)
	{
		$(blocco).empty().append((CPage+1)+'/'+npage);
	}
	else
	{
		$(blocco).empty().append('0/0');
	}

}

function getNumberOfPage()
{
	var paginationObject = JSON.parse(exitPagJson);
	
	return paginationObject.length;
}

function getPageSize()
{
	// alert('get page size');
	
	var paginationObject = JSON.parse(exitPagJson);
	if (paginationObject.length > 0)
	{
		return paginationObject[CPage].length;
	}
	else
	{
		return 0;
	}
}

function getJsonPage()
{
	// alert('get Json Page');
	return exitPagJson;
}

function getPage()
{
	// alert('get page');
	var paginationObject = JSON.parse(exitPagJson);
	var returnOBJ;

	if (paginationObject.length <= 0)
	{
		returnOBJ = JSON.parse('[]'); 
	}
	else
	{
		returnOBJ = paginationObject[CPage];
	}

	return returnOBJ;
}

function filtraDistanza(element,dist)
{
	var resultB = new Array();
	var c = 0;
	for (var i = 0; i < element.length; i++)
	{
		var tempdist = Math.acos(Math.cos(deg2rad(90-element.item(i).latitudine))*Math.cos(deg2rad(90-uLat))+Math.sin(deg2rad(90-element.item(i).latitudine))*Math.sin(deg2rad(90-uLat))*Math.cos(deg2rad(element.item(i).longitudine-uLon)))*6371;
		if ( tempdist <= dist || dist <= 0 )
		{
			// console.log(element.item(i));
			resultB[c] = element.item(i);
			resultB[c]["dist"] = tempdist;
			c++;
		}
	}
	return resultB;
}

function prepareSectionJson(tableSection,dist,categoria,citta)
{

	CurrentSection = tableSection;
	$('#paginationBox').hide();//nascondo frecce affinchè l' utente non possa cambiare pagina
	var nepp=10; //numero elementi per pagina
	var query='';

	if(tableSection=='luoghi_interesse')
	{
		query = "SELECT id, nome, latitudine, longitudine, categoria FROM "+tableSection;
	}
	else
	{
		query = "SELECT id, titolo, latitudine, longitudine, categoria, macroCat FROM "+tableSection;
	}

	if ( categoria != -1 && citta != -1 )
	{
		if(tableSection=='luoghi_interesse')
		{
			query += ' WHERE id_category = '+categoria+' AND id_place = '+citta;
		}
		else
		{
			query += ' WHERE ( id_parent = '+categoria+' OR id_category = '+categoria+' ) AND id_place = '+citta;
		}
	}
	else
	{
		if (categoria != -1)
		{
			if(tableSection=='luoghi_interesse')
			{
				query += ' WHERE id_category = '+categoria;
			}
			else
			{
				query += ' WHERE ( id_category = '+categoria+' OR id_parent = '+categoria+')';
			}
		}

		if (citta != -1)
		{
			query += ' WHERE id_place = '+citta;
		}
	}

	console.log(query);

	// if (dist>0)
	// {
	// 	var delta=dist/111.19;
	// 	query += " WHERE latitudine>"+(uLat-delta)+" AND latitudine<"+(uLat+delta)+" AND longitudine>"+(uLon-delta)+" AND longitudine<"+(uLon+delta);
	// }

	db.transaction(function(ctx) {
		//$('#paginationBox').hide();
		ctx.executeSql(query, [], function(tx,resultA) {
			// alert ('get data from db');
			//console.log(resultA.rows);
			var items=resultA.rows;
			items=filtraDistanza(items,dist);

			//numero di pagine
			var np = items.length/nepp;
			np= Math.ceil(np);
				
			var c=0; //indice progressivo
				
			var json="[";
				
			for(var i=0; i<np; i++)
			{
				json+="[";
					
				for(var j=0; j<nepp; j++)
				{
						
					json+="{";
						
					if(tableSection=='luoghi_interesse')
					{
						/*json+=
						"\"id\": \""+items.item(c).id+"\""+
						", \"nome\": \""+esapeDQ(items.item(c).nome)+
						"\", \"latitudine\": \""+items.item(c).latitudine+
						"\", \"longitudine\": \""+items.item(c).longitudine+
						"\", \"categoria\": \""+esapeDQ(items.item(c).categoria)+"\"";*/
						json+=
						"\"id\": \""+items[c].id+"\""+
						", \"nome\": \""+esapeDQ(items[c].nome)+
						"\", \"latitudine\": \""+items[c].latitudine+
						"\", \"longitudine\": \""+items[c].longitudine+
						"\", \"dist\": \""+items[c]["dist"]+
						"\", \"categoria\": \""+esapeDQ(items[c].categoria)+"\"";

					}
					else
					{
						json+=
						"\"id\": \""+items[c].id+"\""+
						", \"nome\": \""+esapeDQ(items[c].titolo)+
						"\", \"latitudine\": \""+items[c].latitudine+
						"\", \"longitudine\": \""+items[c].longitudine+
						"\", \"dist\": \""+items[c]["dist"]+
						"\", \"macroCat\": \""+esapeDQ(items[c].macroCat)+
						"\", \"categoria\": \""+esapeDQ(items[c].categoria)+"\"";
						/*json+=
						"\"id\": \""+items.item(c).id+"\""+
						", \"nome\": \""+esapeDQ(items.item(c).titolo)+
						"\", \"latitudine\": \""+items.item(c).latitudine+
						"\", \"longitudine\": \""+items.item(c).longitudine+
						"\", \"categoria\": \""+esapeDQ(items.item(c).categoria)+"\"";*/
					}
						
					json+="},";
					c++;
					if (c >= items.length){ break;}
				}
				json=json.substring(0, json.length-1);
				json+="],";
			}

			if (json != "[")
			{
				json=json.substring(0, json.length-1);
			}

			json+="]";

			exitPagJson=json;
		});
	},
		function() {stopSemaforo=false;},
		function() {
			// alert('finish get data');
			$('#paginationBox').show();
			switch(CurrentSection)
			{
				case "luoghi_interesse":
					var ThisPage = getPage();
					loadList('#list-Atr',ThisPage);
				break;

				case "offerte":
				break;

				case "vantaggi":
					var ThisPage = getPage();
					loadList('#list-Van',ThisPage);
				break;
			}
		}
	);
}

/*
 * DC jQuery Social Stream
 * Copyright (c) 2013 Design Chemical
 * http://www.designchemical.com/blog/index.php/premium-jquery-plugins/jquery-social-stream-plugin/
 * Version 1.5.1 (12-3-2013)
 *
 */
 
(function($){SocialStreamObject=function(el,options){this.create(el,options)};$.extend(SocialStreamObject.prototype,{version:"1.5",create:function(el,options){this.defaults={feeds:{facebook:{id:"",intro:"Posted",out:"intro,thumb,title,text,user,share",text:"content",comments:3,image_width:6,icon:"facebook.png"},twitter:{id:"",intro:"Tweeted",search:"Tweeted",out:"intro,thumb,text,share",retweets:false,replies:false,images:"",url:"twitter.php",icon:"twitter.png"},google:{id:"",intro:"Shared",out:"intro,thumb,title,text,share",
api_key:"",image_height:75,image_width:75,shares:true,icon:"google.png"},youtube:{id:"",intro:"Uploaded,Favorite,New Video",search:"Search",out:"intro,thumb,title,text,user,share",feed:"uploads,favorites,newsubscriptionvideos",thumb:"default",icon:"youtube.png"},flickr:{id:"",intro:"Uploaded",out:"intro,thumb,title,text,share",lang:"en-us",icon:"flickr.png"},delicious:{id:"",intro:"Bookmarked",out:"intro,thumb,title,text,user,share",icon:"delicious.png"},pinterest:{id:"",intro:"Pinned",out:"intro,thumb,text,user,share",
icon:"pinterest.png"},rss:{id:"",intro:"Posted",out:"intro,title,text,share",text:"contentSnippet",icon:"rss.png"},lastfm:{id:"",intro:"Listened to,Loved,Replied",out:"intro,thumb,title,text,user,share",feed:"recenttracks,lovedtracks,replytracker",icon:"lastfm.png"},dribbble:{id:"",intro:"Posted,Liked",out:"intro,thumb,title,text,user,share",feed:"shots,likes",icon:"dribbble.png"},vimeo:{id:"",intro:"Liked,Video,Appeared In,Video,Album,Channel,Group",out:"intro,thumb,title,text,user,share",feed:"likes,videos,appears_in,all_videos,albums,channels,groups",
thumb:"medium",stats:true,icon:"vimeo.png"},stumbleupon:{id:"",intro:"Shared,Reviewed",out:"intro,thumb,title,text,user,share",feed:"favorites,reviews",icon:"stumbleupon.png"},deviantart:{id:"",intro:"Deviation",out:"intro,thumb,title,text,user,share",icon:"deviantart.png"},tumblr:{id:"",intro:"Posted",out:"intro,title,text,user,share",thumb:100,video:250,icon:"tumblr.png"},instagram:{id:"",intro:"Posted",search:"Search",out:"intro,thumb,text,user,share,meta",accessToken:"",redirectUrl:"",clientId:"",
thumb:"low_resolution",comments:3,likes:8,icon:"instagram.png"}},twitterId:"",days:10,limit:50,max:"days",external:true,speed:600,height:550,wall:false,order:"date",filter:true,controls:true,rotate:{direction:"up",delay:8E3},cache:true,container:"dcsns",cstream:"stream",content:"dcsns-content",iconPath:"images/dcsns-dark/",imagePath:"images/dcsns-dark/",debug:false};this.o={},this.timer_on=0,this.id="dcsns-"+$(el).index(),this.timerId="",this.o=$.extend(true,this.defaults,options),opt=this.o,$load=
$('<div class="dcsns-loading">creating stream ...</div>');$(el).addClass(this.o.container).append('<div class="'+this.o.content+'"><ul class="'+this.o.cstream+'"></ul></div>');var $c=$("."+this.o.content,el),$a=$("."+this.o.cstream,el),$l=$("li",$a);if(opt.height>0&&opt.wall==false)$c.css({height:opt.height+"px"});if(this.o.filter==true||this.o.controls==true){var x='<div class="dcsns-toolbar">';if(this.o.filter==true){x+='<ul id="dcsns-filter" class="option-set filter">';x+=this.o.wall==true?'<li><a href="#filter" data-group="dc-filter"  data-filter="*" class="selected link-all">all</a></li>':
"";var $f=$(".filter",el);$.each(opt.feeds,function(k,v){x+=v.id!=""?'<li class="active f-'+k+'"><a href="#filter" rel="'+k+'" data-group="dc-filter" data-filter=".dcsns-'+k+'"><img src="'+opt.imagePath+opt.feeds[k].icon+'" alt="" /></a></li>':""});x+="</ul>"}if(this.o.controls==true&&opt.wall==false){var play=this.o.rotate.delay<=0?"":'<li><a href="#" class="play"></a></li>';x+='<div class="controls"><ul>'+play+'<li><a href="#" class="prev"></a></li><li><a href="#" class="next"></a></li></ul></div>'}x+=
"</div>";if(opt.wall==false)$(el).append(x);else $(el).before(x)}if(this.o.wall==true){$(".dcsns-toolbar").append($load);this.createwall($a)}else $c.append($load);this.createstream(el,$a,0,opt.days);this.addevents(el,$a);if(this.o.rotate.delay>0)this.rotate(el);$load.remove()},createstream:function(obj,s,f1,f2){$.each(opt.feeds,function(k,v){if(opt.feeds[k].id!=""){var txt=[];$.each(opt.feeds[k].intro.split(","),function(i,v){v=$.trim(v);txt.push(v)});$.each(opt.feeds[k].id.split(","),function(i,
v){v=$.trim(v);if(opt.feeds[k].feed&&v.split("#").length<2)if(k=="youtube"&&v.split("/").length>1)getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,"posted","",i);else $.each(opt.feeds[k].feed.split(","),function(i,feed){getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,txt[i],feed,i)});else{intro=v.split("#").length<2?opt.feeds[k].intro:opt.feeds[k].search;getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,intro,"",i)}})}})},createwall:function(obj){obj.imagesLoaded(function(){obj.isotope({itemSelector:"li.dcsns-li",
getSortData:{postDate:function($elem){return parseInt($elem.attr("rel"),10)}},sortBy:"postDate"})})},addevents:function(obj,$a){var self=this,speed=this.o.speed;var $container=$(".stream",obj),filters={};$(".controls",obj).delegate("a","click",function(){var x=$(this).attr("class");switch(x){case "prev":self.pauseTimer();ticker($a,"prev",speed);break;case "next":self.pauseTimer();ticker($a,"next",speed);break;case "play":self.rotate(obj);$(".controls .play").removeClass("play").addClass("pause");
break;case "pause":self.pauseTimer();break}return false});$(".filter",obj).delegate("a","click",function(){if(opt.wall==false){var rel=$(this).attr("rel");if($(this).parent().hasClass("active")){$(".dcsns-"+rel,$a).slideUp().addClass("inactive");$(this).parent().animate({opacity:0.3},400)}else{$(".dcsns-"+rel,$a).slideDown().removeClass("inactive");$(this).parent().animate({opacity:1},400)}$(this).parent().toggleClass("active")}return false});if(this.o.external)$a.delegate("a","click",function(){if(!$(this).parent().hasClass("section-share"))this.target=
"_blank"})},rotate:function(a){var self=this,stream=$("."+this.o.cstream,a),speed=this.o.speed,delay=this.o.rotate.delay,r=this.o.rotate.direction=="up"?"prev":"next";this.timer_on=1;$(".controls .play").removeClass("play").addClass("pause");this.timerId=setTimeout(function(){ticker(stream,r,speed);self.rotate(a)},delay)},pauseTimer:function(){clearTimeout(this.timerId);this.timer_on=0;$(".controls .pause").removeClass("pause").addClass("play")}});$.fn.dcSocialStream=function(options,callback){var d=
{};this.each(function(){var s=$(this);d=s.data("socialtabs");if(!d){d=new SocialStreamObject(this,options,callback);s.data("socialtabs",d)}});return d};function getFeed(type,id,path,o,obj,opt,f1,f2,intro,feed,fn){var stream=$(".stream",obj),list=[],d="",px=300,c=[],data,href,url,n=opt.limit,txt=[],src;frl="https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+n+"&callback=?&q=";switch(type){case "facebook":var cp=id.split("/");url=url=cp.length>1?"https://graph.facebook.com/"+cp[1]+"/photos?limit="+
n:frl+encodeURIComponent("https://www.facebook.com/feeds/page.php?id="+id+"&format=rss20");break;case "twitter":var curl=o.url.replace(/\&#038;/gi,"&");var cp=id.split("/"),cq=id.split("#"),cu=o.url.split("?"),replies=o.replies==true?"&exclude_replies=false":"&exclude_replies=true";var param="&include_entities=true&include_rts="+o.retweets+replies;url1=cu.length>1?curl+"&":curl+"?";url=cp.length>1?url1+"url=list&list_id="+cp[1]+"&per_page="+n+param:url1+"url=timeline&screen_name="+id+"&count="+n+
param;if(cq.length>1){var rts=o.retweets==false?"+exclude:retweets":"";url=url1+"url=search&q="+encodeURIComponent(cq[1])+"&count="+n}break;case "google":n=n>100?100:n;href="https://plus.google.com/"+id;url="https://www.googleapis.com/plus/v1/people/"+id+"/activities/public";data={key:o.api_key,maxResults:n,prettyprint:false,fields:"items(id,kind,object(attachments(displayName,fullImage,id,image,objectType,url),id,objectType,plusoners,replies,resharers,url),published,title,url,verb)"};break;case "youtube":var cp=
id.split("/"),cq=id.split("#");n=n>50?50:n;href="https://www.youtube.com/";href+=cq.length>1?"results?search_query="+encodeURIComponent(cq[1]):"user/"+id;href=cp.length>1?"https://www.youtube.com/playlist?list="+cp[1]:href;url="https://gdata.youtube.com/feeds/";if(cp.length>1)url+="api/playlists/"+cp[1]+"?v=2&orderby=published";else url+=cq.length>1?"api/videos?alt=rss&orderby=published&max-results="+n+"&racy=include&q="+encodeURIComponent(cq[1]):"base/users/"+id+"/"+feed+"?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile";
url=frl+encodeURIComponent(url);break;case "flickr":var cq=id.split("/"),fd=cq.length>1?"groups_pool":"photos_public";id=cq.length>1?cq[1]:id;href="https://www.flickr.com/photos/"+id;url="http://api.flickr.com/services/feeds/"+fd+".gne?id="+id+"&lang="+o.lang+"&format=json&jsoncallback=?";break;case "delicious":href="https://www.delicious.com/"+id;url="http://feeds.delicious.com/v2/json/"+id;break;case "pinterest":var cp=id.split("/");url="https://www.pinterest.com/"+id+"/";url+=cp.length>1?"rss":
"feed.rss";href="http://www.pinterest.com/"+id;url=frl+encodeURIComponent(url);break;case "rss":href=id;url=frl+encodeURIComponent(id);break;case "lastfm":href="https://www.last.fm/user/"+id;var ver=feed=="lovedtracks"?"2.0":"1.0";url=frl+encodeURIComponent("https://ws.audioscrobbler.com/"+ver+"/user/"+id+"/"+feed+".rss");break;case "dribbble":href="https://www.dribbble.com/"+id;url=feed=="likes"?"http://api.dribbble.com/players/"+id+"/shots/likes":"http://api.dribbble.com/players/"+id+"/shots";break;
case "vimeo":href="https://www.vimeo.com/"+id;url="https://vimeo.com/api/v2/"+id+"/"+feed+".json";break;case "stumbleupon":href="https://www.stumbleupon.com/stumbler/"+id;url=frl+encodeURIComponent("http://rss.stumbleupon.com/user/"+id+"/"+feed);break;case "deviantart":href="https://"+id+".deviantart.com";url=frl+encodeURIComponent("https://backend.deviantart.com/rss.xml?type=deviation&q=by%3A"+id+"+sort%3Atime+meta%3Aall");break;case "tumblr":href="https://"+id+".tumblr.com";url="http://"+id+".tumblr.com/api/read/json?callback=?";
break;case "instagram":href="#";url="https://api.instagram.com/v1";var cp=id.substr(0,1),cq=id.split(cp),url1=encodeURIComponent(cq[1]),qs="",ts=0;switch(cp){case "?":var p=cq[1].split("/");qs="&lat="+p[0]+"&lng="+p[1]+"&distance="+p[2];url+="/media/search";break;case "#":url+="/tags/"+url1+"/media/recent";ts=1;break;case "!":url+="/users/"+url1+"/media/recent";break;case "@":url+="/locations/"+url1+"/media/recent";break}if(o.accessToken==""&&ts==0)if(location.hash)o.accessToken=location.hash.split("=")[1];
else location.href="https://instagram.com/oauth/authorize/?client_id="+o.clientId+"&redirect_uri="+o.redirectUrl+"&response_type=token";url+="?access_token="+o.accessToken+"&client_id="+o.clientId+"&count="+n+qs;break}var dataType=type=="twitter"?"json":"jsonp";jQuery.ajax({url:url,data:data,cache:opt.cache,dataType:dataType,success:function(a){var error="";switch(type){case "facebook":if(cp.length>1)a=a.data;else if(a.responseStatus==200)a=a.responseData.feed.entries;else error=a.responseDetails;
break;case "google":error=a.error?a.error:"";a=a.items;break;case "flickr":a=a.items;break;case "instagram":a=a.data;break;case "twitter":error=a.errors?a.errors:"";if(cq.length>1)a=a.statuses;break;case "youtube":if(a.responseStatus==200){a=a.responseData.feed.entries;if(cp.length>1)var pl=cp[0]}else error=a.responseDetails;break;case "dribbble":a=a.shots;break;case "tumblr":a=a.posts;break;case "delicious":break;case "vimeo":break;default:if(a.responseStatus==200)a=a.responseData.feed.entries;else error=
a.responseDetails;break}if(error=="")$.each(a,function(i,item){if(i<n){var html=[],q=item.link,u='<a href="'+href+'">'+id+"</a>",w="",x='<a href="'+q+'">'+item.title+"</a>",y="",z="",zz="",m="",d=item.publishedDate,sq=q,st=item.title,s="";switch(type){case "facebook":if(cp.length>1){id=item.from.id;var d=new Date;d=d.setFbAlbum(item.updated_time);var set=parseQ(item.link);st=cp[0]!=""?cp[0]:item.from.name;u='<a href="http://www.facebook.com/media/set/?set='+set[1]+'">'+st+"</a>";x="";z='<a href="'+
item.link+'"><img src="'+item.images[o.image_width].source+'" alt="" /></a>';if(o.comments>0&&item.comments){i=0;m+='<span class="meta"><span class="comments">comments</span></span>';$.each(item.comments.data,function(i,cmt){if(o.comments>i){m+='<span class="meta item-comments"><a href="http://facebook.com/'+cmt.from.id+'">'+cmt.from.name+"</a>"+cmt.message+"</span>";i++}else return false})}z+=m}else z=item[o.text];break;case "twitter":d=parseTwitterDate(item.created_at);var un=item.user.screen_name,
ua=item.user.profile_image_url_https;href="https://www.twitter.com/"+un;q=href;y='<a href="'+q+'" class="thumb"><img src="'+ua+'" alt="" /></a>';z='<span class="twitter-user"><a href="https://www.twitter.com/'+un+'"><strong>'+item.user.name+" </strong>@"+un+"</a></span><br />";z+=linkify(item.text);if(o.images!=""&&item.entities.media)$.each(item.entities.media,function(i,media){z+='<a href="'+media.media_url_https+'"><img src="'+media.media_url_https+":"+o.images+'" alt="" /></a>'});sq=item.id_str;
break;case "delicious":var d=new Date;d=d.setRFC3339(item.dt);x='<a href="'+item.u+'">'+item.d+"</a>";q=item.u;z=item.n;sq=item.u;st=item.d;break;case "rss":z=item[o.text];break;case "pinterest":var src=$("img",item.content).attr("src");y=src?'<a href="'+q+'"><img src="'+src+'" alt="" /></a>':"";z=item.contentSnippet;st=z;break;case "youtube":var v=[];v=parseQ(item.link);y='<a href="'+q+'"><img src="http://img.youtube.com/vi/'+v["v"]+"/"+o.thumb+'.jpg" alt="" /></a>';z=item.contentSnippet;if(cp.length>
1)u='<a href="'+href+'">'+pl+"</a>";break;case "flickr":d=parseTwitterDate(item.published);x=item.title;y='<a href="'+q+'" title="'+item.title+'"><img src="'+item.media.m+'" alt="" /></a>';break;case "lastfm":q=item.content;break;case "dribbble":q=item.url;d=item.created_at;y='<a href="'+q+'"><img src="'+item.image_teaser_url+'" alt="'+item.title+'" /></a>';z='<span class="meta"><span class="views">'+num(item.views_count)+'</span><span class="likes">'+num(item.likes_count)+'</span><span class="comments">'+
num(item.comments_count)+"</span></span>";sq=item.url;break;case "instagram":d=parseInt(item.created_time*1E3,10);x="";y='<a href="'+item.images[o.thumb].url+'"><img src="'+item.images[o.thumb].url+'" alt="" /></a>';z=item.caption!=null?htmlEncode(item.caption.text):"";if(item.comments.count>0&&o.comments>0){i=0;m+='<span class="meta"><span class="comments">'+num(item.comments.count)+" comments</span></span>";$.each(item.comments.data,function(i,cmt){if(o.comments>i){m+='<span class="meta item-comments"><img src="'+
cmt.from.profile_picture+'" />';m+=cmt.from.full_name+" - "+cmt.text+"</span>";i++}else return false})}if(item.likes.count>0&&o.likes>0){i=0;m+='<span class="meta"><span class="likes">'+num(item.likes.count)+" likes</span></span>";m+='<span class="meta item-likes">';$.each(item.likes.data,function(i,lk){if(o.likes>i){m+='<img src="'+lk.profile_picture+'" />';i++}else return false});m+="</span>"}u='<a href="'+q+'">'+item.user.username+"</a>";st=item.caption!=null?item.caption.text:"";break;case "vimeo":f=
feed,at=item.name,tx=item.description,q=item.url;if(f=="channels")y=item.logo!=""?'<a href="'+q+'" class="logo"><img src="'+item.logo+'" alt="" width="'+px+'" /></a>':"";else if(f=="groups")y='<a href="'+q+'"><img src="'+item.thumbnail+'" alt="" /></a>';else{var thumb="thumbnail_"+o.thumb,at=item.title,tx=f!="albums"?item.duration+" secs":item.description;y='<a href="'+item.url+'"><img src="'+item[thumb]+'" alt="" /></a>'}x='<a href="'+q+'">'+at+"</a>";z=tx;if(o.stats==true){var m="";m+=f=="albums"||
f=="channels"||f=="groups"?'<span class="videos">'+num(item.total_videos)+"</span>":"";if(f=="channels")m+='<span class="users">'+num(item.total_subscribers)+"</span>";else if(f=="groups")m+='<span class="users">'+num(item.total_members)+"</span>";else if(f!="albums")m+='<span class="likes">'+num(item.stats_number_of_likes)+'</span><span class="views">'+num(item.stats_number_of_plays)+'</span><span class="comments">'+num(item.stats_number_of_comments)+"</span>";z+='<span class="meta">'+m+"</span>"}var dt=
item.upload_date;if(f=="likes")dt=item.liked_on;else if(f=="albums"||f=="channels"||f=="groups")dt=item.created_on;var d=new Date;d=d.setVimeo(dt);sq=q;st=at;break;case "stumbleupon":var src=$("img",item.content).attr("src");y=src!=""&&feed=="favorites"?'<a href="'+q+'"><img src="'+src+'" alt="" /></a>':"";z=item.contentSnippet;break;case "deviantart":var src=$("img",item.content).attr("src");y=src?'<a href="'+q+'"><img src="'+src+'" alt="" /></a>':"";z=item.contentSnippet;break;case "tumblr":q=item["url-with-slug"];
d=item.date;x='<a href="'+q+'">';switch(item.type){case "photo":x=item["photo-caption"];z='<a href="'+q+'"><img src="'+item["photo-url-"+o.thumb]+'" alt="" /></a>';st=x;break;case "video":x+=item["video-caption"];z=o.video!="400"?item["video-player-"+o.video]:item["video-player"];st=x;break;case "regular":x+=item["regular-title"];z=item["regular-body"];st=x;break;case "quote":x+=item["quote-source"];z=item["quote-text"];st=x;break;case "audio":x=item["id3-artist"]?'<a href="'+q+'">'+item["id3-artist"]+
" - "+item["id3-album"]+"</a>":"";x+=item["id3-title"]?'<a href="'+q+'" class="track">'+item["id3-title"]+"</a>":"";z=item["audio-caption"];z+=item["audio-player"];st=item["id3-artist"]+" - "+item["id3-album"]+" - "+item["id3-title"];break;case "conversation":x+=item["conversation-title"];z=item["conversation-text"];st=x;break;case "link":var ltxt=item["link-text"].replace(/:/g,"").replace(/\?/g,"").replace(/\!/g,"").replace(/\./g,"");x='<a href="'+item["link-url"]+'">'+ltxt+"</a>";z=item["link-description"];
st=ltxt;break}x+=item.type!="photo"||item.type!="audio"?"</a>":"";st=stripHtml(st);sq=q;break;case "google":var g=item.object.replies?num(item.object.replies.totalItems):0,m=item.object.plusoners?num(item.object.plusoners.totalItems):0,p=item.object.resharers?num(item.object.resharers.totalItems):0,dl;var d=new Date;d=d.setRFC3339(item.published);dl={src:"",imgLink:"",useLink:"",useTitle:""};var k=item.object.attachments;if(k)if(k.length){for(var l=0;l<k.length;l++){var h=k[l];if(h.image){dl.src=
h.image.url;dl.imgLink=h.url;if(h.fullImage){dl.w=h.fullImage.width||0;dl.h=h.fullImage.height||0}}if(h.objectType=="article")dl.useLink=h.url;if(h.displayName)dl.useTitle=h.displayName}if(!dl.useLink)dl.useLink=dl.imgLink;var img_h=o.image_height?o.image_height:75;var img_w=o.image_width?o.image_width:75;if(dl.src.indexOf("resize_h")>=0)dl.src=dl.w>=dl.h?dl.src.replace(/resize_h=\d+/i,"resize_h="+img_h):dl.src.replace(/resize_h=\d+/i,"resize_w="+img_w)}dl=dl;q=dl.useLink;y=dl.src?(dl.useLink?'<a href="'+
dl.useLink+'">':"")+'<img src="'+dl.src+'" />'+(dl.useLink?"</a>":""):"";var t1=px/(dl.w/dl.h)<px/3?' class="clear"':"";x=(dl.useLink?'<a href="'+dl.useLink+'"'+t1+">":"")+(item.title?item.title:dl.useTitle)+(dl.useLink?"</a>":"");if(o.shares)z='<span class="meta"><span class="plusones">+1s '+m+'</span><span class="shares">'+p+'</span><span class="comments">'+g+"</span></span>";sq=q;st=dl.useTitle;break}icon='<a href="'+href+'"><img src="'+path+o.icon+'" alt="" class="icon" /></a>';if(type=="twitter"){var intent=
"https://twitter.com/intent/";s='<a href="'+intent+"tweet?in_reply_to="+sq+"&via="+opt.twitterId+'" class="share-reply"></a>';s+='<a href="'+intent+"retweet?tweet_id="+sq+"&via="+opt.twitterId+'" class="share-retweet"></a>';s+='<a href="'+intent+"favorite?tweet_id="+sq+'" class="share-favorite"></a>'}else s=share(st,sq,opt.twitterId);$.each(o.out.split(","),function(i,v){zz+=v!="intro"?'<span class="section-'+v+'">':"";switch(v){case "intro":if(type=="twitter")zintro='<span class="section-'+v+'"><a href="'+
q+'">'+decodeURIComponent(intro)+'</a> <span><a href="https://twitter.com/'+un+"/status/"+item.id_str+'">'+nicetime((new Date(d)).getTime(),0)+"</a></span></span>";else zintro='<span class="section-'+v+'"><a href="'+q+'">'+decodeURIComponent(intro)+"</a> <span>"+nicetime((new Date(d)).getTime(),0)+"</span></span>";break;case "title":zz+=x;break;case "thumb":if(type=="rss"){var src=item.content.indexOf("img")>=0?$("img",item.content).attr("src"):"";y=src?'<a href="'+q+'" class="thumb"><img src="'+
src+'" alt="" /></a>':""}zz+=y;break;case "text":zz+=z;break;case "user":zz+=u;break;case "meta":zz+=m;break;case "share":zz+=s;break}zz+=v!="intro"?"</span>":""});var df=type=="instagram"?nicetime(d,1):nicetime((new Date(d)).getTime(),1);var ob=df;switch(opt.order){case "random":ob=randomish(6);break;case "none":ob=1;break}var out='<li rel="'+ob+'" class="dcsns-li dcsns-'+type+" dcsns-feed-"+fn+'">'+w+'<div class="inner">'+zz+'<span class="clear"></span></div>'+zintro+icon+"</li>";if(opt.max=="days")if(df<=
f2*86400&&df>=f1*86400)list.push(out);else{if(df>f2*86400)return false}else list.push(out)}});else if(opt.debug==true)list.push('<li class="dcsns-li dcsns-error">Error. '+error+"</li>")},complete:function(){var $newItems=$(list.join(""));if(opt.wall==true)stream.isotope("insert",$newItems);else{stream.append($newItems);sortstream(stream,"asc")}if(type=="facebook"&&cp.length<2)fbHrefLink(id,$newItems);else if(type=="flickr"&&cq.length>1)flickrHrefLink(cq[1],$newItems)}});return}function linkify(text){text=
text.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,function(url){var full_url=!url.match("^https?://")?"http://"+url:url;return'<a href="'+full_url+'">'+url+"</a>"});text=text.replace(/(^|\s)@(\w+)/g,'$1@<a href="http://www.twitter.com/$2">$2</a>');text=text.replace(/(^|\s)#(\w+)/g,'$1#<a href="http://twitter.com/search/%23$2">$2</a>');return text}function htmlEncode(v){return $("<div/>").text(v).html()}function stripHtml(v){var $html=$(v);return $html.text()}
Date.prototype.setRFC3339=function(dString){var utcOffset,offsetSplitChar;var offsetMultiplier=1;var dateTime=dString.split("T");var date=dateTime[0].split("-");var time=dateTime[1].split(":");var offsetField=time[time.length-1];var offsetString;offsetFieldIdentifier=offsetField.charAt(offsetField.length-1);if(offsetFieldIdentifier=="Z"){utcOffset=0;time[time.length-1]=offsetField.substr(0,offsetField.length-2)}else{if(offsetField[offsetField.length-1].indexOf("+")!=-1){offsetSplitChar="+";offsetMultiplier=
1}else{offsetSplitChar="-";offsetMultiplier=-1}offsetString=offsetField.split(offsetSplitChar);time[time.length-1]==offsetString[0];offsetString=offsetString[1].split(":");utcOffset=offsetString[0]*60+offsetString[1];utcOffset=utcOffset*60*1E3}this.setTime(Date.UTC(date[0],date[1]-1,date[2],time[0],time[1],time[2])+utcOffset*offsetMultiplier);return this};Date.prototype.setFbAlbum=function(dString){var utcOffset,offsetSplitChar="+",offsetMultiplier=1,dateTime=dString.split("T"),date=dateTime[0].split("-"),
time=dateTime[1].split(":"),offsetField=time[time.length-1],offsetString;if(offsetField[offsetField.length-1].indexOf("+")!=-1){offsetSplitChar="-";offsetMultiplier=-1}offsetTime=offsetField.split(offsetSplitChar);utcOffset=parseInt(offsetTime[1]/100,10)*60*1E3;this.setTime(Date.UTC(date[0],date[1]-1,date[2],time[0],time[1],offsetTime[0])+utcOffset*offsetMultiplier);return this};Date.prototype.setVimeo=function(dString){var utcOffset=0,offsetSplitChar,offsetMultiplier=1;var dateTime=dString.split(" ");
var date=dateTime[0].split("-");var time=dateTime[1].split(":");this.setTime(Date.UTC(date[0],date[1]-1,date[2],time[0],time[1],time[2])+utcOffset*offsetMultiplier);return this};function parseTwitterDate(a){var out=$.browser.msie?a.replace(/(\+\S+) (.*)/,"$2 $1"):a;return out}function nicetime(a,out){var d=Math.round((+new Date-a)/1E3),fuzzy="";if(out==1)return d;else if(out==0){var chunks=new Array;chunks[0]=[60*60*24*365,"year","years"];chunks[1]=[60*60*24*30,"month","months"];chunks[2]=[60*60*
24*7,"week","weeks"];chunks[3]=[60*60*24,"day","days"];chunks[4]=[60*60,"hr","hrs"];chunks[5]=[60,"min","mins"];var i=0,j=chunks.length;for(i=0;i<j;i++){s=chunks[i][0];if((xj=Math.floor(d/s))!=0){n=xj==1?chunks[i][1]:chunks[i][2];break}}fuzzy+=xj==1?"1 "+n:xj+" "+n;if(i+1<j){s2=chunks[i+1][0];if((xj2=Math.floor((d-s*xj)/s2))!=0){n2=xj2==1?chunks[i+1][1]:chunks[i+1][2];fuzzy+=xj2==1?" + 1 "+n2:" + "+xj2+" "+n2}}fuzzy+=" ago";return fuzzy}}function num(a){var b=a;if(a>999999)b=Math.floor(a/1E6)+"M";
else if(a>9999)b=Math.floor(a/1E3)+"K";else if(a>999)b=Math.floor(a/1E3)+","+a%1E3;return b}function parseQ(url){var v=[],hash,q=url.split("?")[1];if(q!=undefined){q=q.split("&");for(var i=0;i<q.length;i++){hash=q[i].split("=");v.push(hash[1]);v[hash[0]]=hash[1]}}return v}function sortstream(obj,d){var $l=$("li",obj);$l.sort(function(a,b){var keyA=parseInt($(a).attr("rel"),10),keyB=parseInt($(b).attr("rel"),10);if(d=="asc")return keyA>keyB?1:-1;else return keyA<keyB?1:-1;return 0});$.each($l,function(index,
row){obj.append(row)});$(".dcsns-loading").slideUp().remove();return}function randomish(l){var i=0,out="";while(i<l){out+=Math.floor(Math.random()*10+1)+"";i++}return out}function ticker(s,b,speed){var $a=$("li:last",s),$b=$("li:first",s),$gx,bh=$b.outerHeight(true);if($("li",s).not(".inactive").length>2)if(b=="next"){$gx=$a.clone().hide();$b.before($gx);$a.remove();if($a.hasClass("inactive"))ticker(s,b,speed);else{$(".inner",$gx).css({opacity:0});$gx.slideDown(speed,"linear",function(){$(".inner",
this).animate({opacity:1},speed)});return}}else{$gx=$b.clone();if($b.hasClass("inactive")){$a.after($gx);$b.remove();ticker(s,b,speed)}else{$b.animate({marginTop:-bh+"px"},speed,"linear",function(){$a.after($gx);$b.remove()});$(".inner",$b).animate({opacity:0},speed)}}}function fbHrefLink(id,obj){jQuery.ajax({url:"https://graph.facebook.com/"+id,dataType:"jsonp",success:function(a){$(".icon",obj).each(function(){$(this).parent().attr("href",a.link)});$(".section-user a",obj).each(function(){$(this).attr("href",
a.link);$(this).text(a.name)})}})}function flickrHrefLink(id,obj){jQuery.ajax({url:"http://api.flickr.com/services/feeds/groups_pool.gne?id="+id+"&format=json&jsoncallback=?",dataType:"jsonp",success:function(a){$(".icon",obj).each(function(){$(this).parent().attr("href",a.link)})}})}function share(st,sq,twitterId){var s="",sq=encodeURIComponent(sq),st=encodeURIComponent(st);s='<a href="http://www.facebook.com/sharer.php?u='+sq+"&t="+st+'" class="share-facebook"></a>';s+='<a href="https://twitter.com/share?url='+
sq+"&text="+st+"&via="+twitterId+'" class="share-twitter"></a>';s+='<a href="https://plus.google.com/share?url='+sq+'" class="share-google"></a>';s+='<a href="http://www.linkedin.com/shareArticle?mini=true&url='+sq+"&title="+st+'" class="share-linkedin"></a>';return s}})(jQuery);
jQuery(window).load(function(){jQuery.getScript("//platform.twitter.com/widgets.js",function(){});jQuery(".section-share a").click(function(){var u=jQuery(this).attr("href");window.open(u,"sharer","toolbar=0,status=0,width=626,height=436");return false});jQuery(".dcsns-facebook .section-text a").each(function(i){var txt=jQuery(this).attr("href");var href=decodeURIComponent(txt.replace("http://www.facebook.com/l.php?u=","")).split("&");jQuery(this).attr("href",href[0])})});


(function(t,e){if(typeof exports=="object")module.exports=e();else if(typeof define=="function"&&define.amd)define(e);else t.Spinner=e()})(this,function(){"use strict";var t=["webkit","Moz","ms","O"],e={},i;function o(t,e){var i=document.createElement(t||"div"),o;for(o in e)i[o]=e[o];return i}function n(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var r=function(){var t=o("style",{type:"text/css"});n(document.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function s(t,o,n,s){var a=["opacity",o,~~(t*100),n,s].join("-"),f=.01+n/s*100,l=Math.max(1-(1-t)/o*(100-f),t),d=i.substring(0,i.indexOf("Animation")).toLowerCase(),u=d&&"-"+d+"-"||"";if(!e[a]){r.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+f+"%{opacity:"+t+"}"+(f+.01)+"%{opacity:1}"+(f+o)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",r.cssRules.length);e[a]=1}return a}function a(e,i){var o=e.style,n,r;if(o[i]!==undefined)return i;i=i.charAt(0).toUpperCase()+i.slice(1);for(r=0;r<t.length;r++){n=t[r]+i;if(o[n]!==undefined)return n}}function f(t,e){for(var i in e)t.style[a(t,i)||i]=e[i];return t}function l(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)if(t[o]===undefined)t[o]=i[o]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var u={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function p(t){if(typeof this=="undefined")return new p(t);this.opts=l(t||{},p.defaults,u)}p.defaults={};l(p.prototype,{spin:function(t){this.stop();var e=this,n=e.opts,r=e.el=f(o(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex}),s=n.radius+n.length+n.width,a,l;if(t){t.insertBefore(r,t.firstChild||null);l=d(t);a=d(r);f(r,{left:(n.left=="auto"?l.x-a.x+(t.offsetWidth>>1):parseInt(n.left,10)+s)+"px",top:(n.top=="auto"?l.y-a.y+(t.offsetHeight>>1):parseInt(n.top,10)+s)+"px"})}r.setAttribute("role","progressbar");e.lines(r,e.opts);if(!i){var u=0,p=(n.lines-1)*(1-n.direction)/2,c,h=n.fps,m=h/n.speed,y=(1-n.opacity)/(m*n.trail/100),g=m/n.lines;(function v(){u++;for(var t=0;t<n.lines;t++){c=Math.max(1-(u+(n.lines-t)*g)%m*y,n.opacity);e.opacity(r,t*n.direction+p,c,n)}e.timeout=e.el&&setTimeout(v,~~(1e3/h))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=undefined}return this},lines:function(t,e){var r=0,a=(e.lines-1)*(1-e.direction)/2,l;function d(t,i){return f(o(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:i,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*r+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;r<e.lines;r++){l=f(o(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:i&&s(e.opacity,e.trail,a+r*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)n(l,f(d("#000","0 0 4px "+"#000"),{top:2+"px"}));n(t,n(l,d(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});function c(){function t(t,e){return o("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}r.addRule(".spin-vml","behavior:url(#default#VML)");p.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function s(){return f(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",l=f(s(),{position:"absolute",top:a,left:a}),d;function u(e,r,a){n(l,n(f(s(),{rotation:360/i.lines*e+"deg",left:~~r}),n(f(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(d=1;d<=i.lines;d++)u(d,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(d=1;d<=i.lines;d++)u(d);return n(e,l)};p.prototype.opacity=function(t,e,i,o){var n=t.firstChild;o=o.shadow&&o.lines||0;if(n&&e+o<n.childNodes.length){n=n.childNodes[e+o];n=n&&n.firstChild;n=n&&n.firstChild;if(n)n.opacity=i}}}var h=f(o("group"),{behavior:"url(#default#VML)"});if(!a(h,"transform")&&h.adj)c();else i=a(h,"animation");return p});

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


//document.addEventListener('deviceready', this.onDeviceReady, false);
// window.localStorage.setItem('lastU',0);


var QQuery;

//function onDeviceReady()
//{
	var db = window.openDatabase("picenopassDb", "1.0", "database per picenopass", 2000000);
	db.transaction(populateDB, errorCB, successCB);
//}

function populateDB(tx)
{
	
	var langP = window.localStorage.getItem("lang");
	
	//tabella offerte
	//tx.executeSql('CREATE TABLE IF NOT EXISTS offerte ( id INTEGER PRIMARY KEY, id_user INT NOT NULL, id_category INT NOT NULL, categoria TEXT NOT NULL, data_inizio INT NOT NULL, data_fine INT NOT NULL, tipo TEXT NOT NULL, titolo TEXT NOT NULL, descrizione TEXT NOT NULL, prezzo INT NULL, prezzo_full INT NULL, sconto TEXT NULL, img TEXT NULL, off_settimana_inizio INT NULL, off_settimana_fine INT NULL, via TEXT NULL, num TEXT NULL, cap TEXT NULL, citta TEXT NULL, prov TEXT NULL, stato TEXT NULL, telefono TEXT NULL, fax TEXT NULL, latitudine TEXT NULL, longitudine TEXT NULL, note TEXT NULL, ragione_sociale TEXT NULL, email TEXT NULL, sito_web TEXT NULL, data_creazione INT NOT NULL, data_modifica INT NOT NULL )');
	
	//tabella attrazioni (luogi di interesse)
	tx.executeSql('CREATE TABLE IF NOT EXISTS luoghi_interesse (  id INTEGER PRIMARY KEY, id_place INT NOT NULL, id_category INT NOT NULL, nome TEXT NOT NULL, descrizione TEXT NOT NULL, latitudine TEXT NULL, longitudine TEXT NULL, email TEXT NULL, telefono TEXT NULL, indirizzo TEXT NULL, sito_web TEXT NULL, data_inizio INT NULL, data_fine INT NULL, info TEXT NULL, img TEXT NULL, categoria TEXT NOT NULL, citta TEXT NULL, data_creazione NOT NULL,data_modifica INT NOT NULL)');
	
	//tabella utente
	tx.executeSql('CREATE TABLE IF NOT EXISTS utente ( id INTEGER PRIMARY KEY, nome TEXT NOT NULL, cognome TEXT NOT NULL, codice_card TEXT NOT NULL, genere TEXT NULL, cellulare TEXT NULL, data_nascita TEXT NULL, email TEXT NULL, usr TEXT NOT NULL, psw TEXT NOT NULL, qrcode TEXT NULL, barcode TEXT NULL )');
	
	//tabella vantaggi
	tx.executeSql('CREATE TABLE IF NOT EXISTS vantaggi ( id INTEGER PRIMARY KEY, id_user INT NOT NULL, id_category INT NOT NULL, id_place INT NOT NULL, categoria TEXT NOT NULL, id_parent INT NOT NULL, macroCat TEXT NOT NULL, data_inizio INT NOT NULL, data_fine INT NOT NULL, tipo TEXT NOT NULL, titolo TEXT NOT NULL, descrizione TEXT NOT NULL, prezzo INT NULL, prezzo_full INT NULL, sconto TEXT NULL, img TEXT NULL, off_settimana_inizio INT NULL, off_settimana_fine INT NULL, via TEXT NULL, num TEXT NULL, cap TEXT NULL, citta TEXT NULL, prov TEXT NULL, stato TEXT NULL, telefono TEXT NULL, fax TEXT NULL, latitudine TEXT NULL, longitudine TEXT NULL, note TEXT NULL, ragione_sociale TEXT NULL, email TEXT NULL, sito_web TEXT NULL, data_creazione INT NOT NULL, data_modifica INT NOT NULL )');

	db.transaction(function(ctx) {
		ctx.executeSql("select id from luoghi_interesse", [], function(tx,checkres) {
			if(!checkres.rows.length) {
				$.ajax({
					type: "GET",
					url: "http://seapass.it/core/app/initialize.php?callback=?",
					// url: "http://192.168.1.242/seapass/core/app/initialize.php?callback=?",
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){
						switch ( langP )
						{
							case 'it':
								var r = confirm("Si è verificato un problema di connessione. vuoi riprovare?");
								
							break;

							case 'en':
								var r = confirm("A network error has occurred. You want to try again?");
							break;
						}

						if (r==true)
						{
							update();
						}
					},
					success: function(data)
					{
						var timestamp = Math.round(new Date().getTime() / 1000);
						timestamp += 43200;
						window.localStorage.setItem('lastU',timestamp);

						QQuery=data;
						db.transaction(executeQ, errorCB, successCB);
					}
				});
			}
		});
	});

	// if ( Math.round(new Date().getTime() / 1000) > window.localStorage.getItem("lastU") )
	// {
	// 	update();
	// }
}

function executeQ(tx)
{
	for (var i = QQuery.length - 1; i >= 0; i--)
	{
		tx.executeSql(QQuery[i]);
	}	
}

function update()
{
	// var networkState = navigator.connection.type;
	// var langP = window.localStorage.getItem("lang");

	// var states = {};
	// states[Connection.UNKNOWN]  = 'true';
	// states[Connection.ETHERNET] = 'true';
	// states[Connection.WIFI]     = 'true';
	// states[Connection.CELL_2G]  = 'true';
	// states[Connection.CELL_3G]  = 'true';
	// states[Connection.CELL_4G]  = 'true';
	// states[Connection.NONE]     = 'false';

	// alert(networkState+' - '+states[networkState]);

	// if (states[networkState] == 'false')
	// {
		db.transaction(function(tx) {

			// tx.executeSql('DELETE FROM offerte');
			tx.executeSql('DELETE FROM luoghi_interesse');
			tx.executeSql('DELETE FROM vantaggi');
		}, errorCB, successCB);
	
		$.ajax({
			type: "GET",
			url: "http://seapass.it/core/app/initialize.php?callback=?",
			// data: 'id=1',
			dataType: 'jsonp',
			beforeSend: function(x){},
			error: function(){
				switch ( langP )
				{
					case 'it':
						var r = confirm("Si è verificato un problema di connessione. vuoi riprovare?");	
					break;

					case 'en':
						var r = confirm("A network error has occurred. You want to try again?");
					break;
				}

				if (r==true)
				{
					update();
				}
			},
			success: function(data)
			{
				QQuery=data;
	
				var timestamp = Math.round(new Date().getTime() / 1000);
				timestamp += 43200;
				window.localStorage.setItem('lastU',timestamp);
	
				db.transaction(executeQ, errorCB, successCB);
			}
		});
	// }
}

function cb(data)
{
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    //alert("success!");
}


function refreshPage() {
	$.mobile.changePage(
		"index.html",
		{
			allowSamePageTransition: true,
			changeHash: false,
			transition: 'none',
			reloadPage: true
		}
	);
}

function showError(message)
{
	$('.userMessage').empty();

	var e = '<div class="errore"><span>'+message+'<span></div>';
	$('.userMessage').append(e);
}

function checkConnection()
{
	return true;
	
	var networkState = navigator.connection.type;

	var langP = window.localStorage.getItem("lang");

	var states = {};
	states[Connection.UNKNOWN]  = 'true';
	states[Connection.ETHERNET] = 'true';
	states[Connection.WIFI]     = 'true';
	states[Connection.CELL_2G]  = 'true';
	states[Connection.CELL_3G]  = 'true';
	states[Connection.CELL_4G]  = 'true';
	states[Connection.NONE]     = 'false';

	alert(networkState+' - '+states[networkState]);

	if (states[networkState] == 'false')
	{
		if ( langP == 'it' )
		{
			alert('connessione assente');
		}
		else
		{
			alert('no connection');
		}

		return false;
	}
	else
	{
		return true;
	}
}

function loadURL(url)
{
	//alert(url);
	var finalUrl = encodeURI(url);

	window.open(finalUrl, '_system', 'location=yes');
	return false;
}

function formatDate(data)
{
	var dateParts = data.split(" ");
	dateParts = dateParts[0].split('-');
	return dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0];
}

function roundTwo(value)
{
	return(Math.round(value * 100) / 100);
}

function deg2rad (angle)
{
  return angle * .017453292519943295;
}

function strpos (haystack, needle, offset)
{
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}

function clearLangTag(str,lang)
{
	var tagStart = '|'+lang+':|';
	var tagEnd = '|:'+lang+'|';

	return str.substring(strpos(str,tagStart)+5,strpos(str,tagEnd));

	// console.log(str);

	// if(lang=='it')
	// {
	// 	var patt = /.*\|it:\|(.*)\|:it\|.*/im;
	// }
	
	// if(lang=='en')
	// {
	// 	var patt = /.*\|en:\|(.*)\|:en\|.*/im;
	// }

	// console.log(patt);

	
	// var resultM=patt.exec(str);

	// console.log(resultM);

	// return resultM[1];
}

function addslashes (str)
{
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function esapeDQ (str)
{
  return (str + '').replace(/[\\"]/g, '\\$&').replace(/\u0000/g, '\\0').replace(/\u000A/g, '');
}

function stripslashes (str)
{
  return (str + '').replace(/\\(.?)/g, function (s, n1) {
	switch (n1) {
	case '\\':
	  return '\\';
	case '0':
	  return '\u0000';
	case '':
	  return '';
	default:
	  return n1;
	}
  });
}

function pub2date(pub)
{
  var	date = new Date(pub)
  var string = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
  return string;
}

function spinnerLoader(contenitore)
{
	var opts = {
		lines: 15, // The number of lines to draw
		length: 8, // The length of each line
		width: 4, // The line thickness
		radius: 14, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 7, // The rotation offset
		color: '#000', // #rgb or #rrggbb
		speed: 1.3, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById(contenitore);
	var spinner = new Spinner(opts).spin(target);
}



(function(){var g=void 0,h=!0,Ge=null,l=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,da=isNaN,m=Math,ea=decodeURIComponent;function He(a,b){return a.onload=b}function Ie(a,b){return a.onerror=b}function ha(a,b){return a.name=b}
var n="push",ia="test",ja="slice",p="replace",ka="load",la="floor",ma="charAt",na="value",q="indexOf",oa="match",pa="port",qa="createElement",ra="path",r="name",kf="getTime",u="host",v="toString",w="length",x="prototype",sa="clientWidth",y="split",ta="stopPropagation",ua="scope",z="location",va="search",Je="random",A="protocol",wa="clientHeight",xa="href",B="substring",ya="apply",za="navigator",C="join",D="toLowerCase",E;function Aa(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Ba(a){return"function"==typeof a}function Ca(a){return a!=g&&-1<(a.constructor+"")[q]("String")}function F(a,b){return g==a||"-"==a&&!b||""==a}function Da(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[q](a[ma](0));)a=a[B](1);for(;a&&-1<" \n\r\t"[q](a[ma](a[w]-1));)a=a[B](0,a[w]-1);return a}function Ea(){return m.round(2147483647*m[Je]())}function Fa(){}
function G(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);H(68);return escape(a)}function I(a){a=a[y]("+")[C](" ");if(ea instanceof Function)try{return ea(a)}catch(b){H(17)}else H(68);return unescape(a)}var Ga=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ha=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function Ia(a,b){if(a){var c=J[qa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=J.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function K(a){return a&&0<a[w]?a[0]:""}function L(a){var b=a?a[w]:0;return 0<b?a[b-1]:""}var Ja=function(){this.prefix="ga.";this.R={}};Ja[x].set=function(a,b){this.R[this.prefix+a]=b};Ja[x].get=function(a){return this.R[this.prefix+a]};Ja[x].contains=function(a){return this.get(a)!==g};function Ne(){return"https:"==J[z][A]}function Ka(a){0==a[q]("www.")&&(a=a[B](4));return a[D]()}
function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[q]("://");0<=c&&(d.protocol=a[B](0,c),a=a[B](c+3));c=a[va]("/|\\?|#");if(0<=c)d.host=a[B](0,c)[D](),a=a[B](c);else return d.host=a[D](),d;c=a[q]("#");0<=c&&(d.anchor=a[B](c+1),a=a[B](0,c));c=a[q]("?");0<=c&&(Na(d.d,a[B](c+1)),a=a[B](0,c));d.anchor&&b&&Na(d.d,d.anchor);a&&"/"==a[ma](0)&&(a=a[B](1));d.path=a;return d}
function Oa(a,b){function c(a){var b=(a.hostname||"")[y](":")[0][D](),c=(a[A]||"")[D](),c=1*a[pa]||("http:"==c?80:"https:"==c?443:"");a=a.pathname||"";0==a[q]("/")||(a="/"+a);return[b,""+c,a]}var d=b||J[qa]("a");d.href=J[z][xa];var e=(d[A]||"")[D](),f=c(d),Be=d[va]||"",k=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[q]("//")?a=e+a:0==a[q]("/")?a=k+a:!a||0==a[q]("?")?a=k+f[2]+(a||Be):0>a[y]("/")[0][q](":")&&(a=k+f[2][B](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[A]||"")[D](),host:e[0],
port:e[1],path:e[2],Oa:d[va]||"",url:a||""}}function Na(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[n](c)}for(var d=Da(b)[y]("&"),e=0;e<d[w];e++)if(d[e]){var f=d[e][q]("=");0>f?c(d[e],"1"):c(d[e][B](0,f),d[e][B](f+1))}}function Pa(a,b){if(F(a)||"["==a[ma](0)&&"]"==a[ma](a[w]-1))return"-";var c=J.domain;return a[q](c+(b&&"/"!=b?b:""))==(0==a[q]("http://")?7:0==a[q]("https://")?8:0)?"0":a};var Qa=0;function Ra(a,b,c){!(1<=Qa)&&!(1<=100*m[Je]())&&(a=["utmt=error","utmerr="+a,"utmwv=5.4.2","utmn="+Ea(),"utmsp=1"],b&&a[n]("api="+b),c&&a[n]("msg="+G(c[B](0,100))),M.w&&a[n]("aip=1"),Sa(a[C]("&")),Qa++)};var Ta=0,Ua={};function N(a){return Va("x"+Ta++,a)}function Va(a,b){Ua[a]=!!b;return a}
var Wa=N(),Xa=Va("anonymizeIp"),Ya=N(),$a=N(),ab=N(),bb=N(),O=N(),P=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(),Eb=N(),Fb=N(h),Gb=Va("currencyCode"),Hb=Va("page"),Ib=Va("title"),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Qb=N(),Rb=N(),Q=N(h),Sb=N(h),Tb=N(h),Ub=N(h),Vb=N(h),Wb=N(h),Zb=N(h),$b=N(h),ac=N(h),bc=N(h),cc=N(h),R=N(h),dc=N(h),ec=N(h),fc=
N(h),gc=N(h),hc=N(h),ic=N(h),jc=N(h),S=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=N(h),pc=N(h),qc=N(h),rc=Va("campaignParams"),sc=N(),tc=Va("hitCallback"),uc=N();N();var vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N(),Ec=N(),Fc=N(),Gc=N(),Hc=N(),Ic=N();N();var Mc=N(),Nc=N(),Oc=N(),Oe=Va("uaName"),Pe=Va("uaDomain"),Qe=Va("uaPath");var Re=function(){function a(a,c,d){T($[x],a,c,d)}a("_createTracker",$[x].r,55);a("_getTracker",$[x].oa,0);a("_getTrackerByName",$[x].u,51);a("_getTrackers",$[x].pa,130);a("_anonymizeIp",$[x].aa,16);a("_forceSSL",$[x].la,125);a("_getPlugin",Pc,120)},Se=function(){function a(a,c,d){T(U[x],a,c,d)}Qc("_getName",$a,58);Qc("_getAccount",Wa,64);Qc("_visitCode",Q,54);Qc("_getClientInfo",ib,53,1);Qc("_getDetectTitle",lb,56,1);Qc("_getDetectFlash",jb,65,1);Qc("_getLocalGifPath",wb,57);Qc("_getServiceMode",
xb,59);V("_setClientInfo",ib,66,2);V("_setAccount",Wa,3);V("_setNamespace",Ya,48);V("_setAllowLinker",fb,11,2);V("_setDetectFlash",jb,61,2);V("_setDetectTitle",lb,62,2);V("_setLocalGifPath",wb,46,0);V("_setLocalServerMode",xb,92,g,0);V("_setRemoteServerMode",xb,63,g,1);V("_setLocalRemoteServerMode",xb,47,g,2);V("_setSampleRate",vb,45,1);V("_setCampaignTrack",kb,36,2);V("_setAllowAnchor",gb,7,2);V("_setCampNameKey",ob,41);V("_setCampContentKey",tb,38);V("_setCampIdKey",nb,39);V("_setCampMediumKey",
rb,40);V("_setCampNOKey",ub,42);V("_setCampSourceKey",qb,43);V("_setCampTermKey",sb,44);V("_setCampCIdKey",pb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",yb,0,1);V("_setVisitorCookieTimeout",cb,28,1);V("_setSessionCookieTimeout",db,26,1);V("_setCampaignCookieTimeout",eb,29,1);V("_setReferrerOverride",Jb,49);V("_setSiteSpeedSampleRate",Dc,132);a("_trackPageview",U[x].Fa,1);a("_trackEvent",U[x].F,4);a("_trackPageLoadTime",U[x].Ea,100);a("_trackSocial",U[x].Ga,104);a("_trackTrans",U[x].Ia,
18);a("_sendXEvent",U[x].t,78);a("_createEventTracker",U[x].ia,74);a("_getVersion",U[x].qa,60);a("_setDomainName",U[x].B,6);a("_setAllowHash",U[x].va,8);a("_getLinkerUrl",U[x].na,52);a("_link",U[x].link,101);a("_linkByPost",U[x].ua,102);a("_setTrans",U[x].za,20);a("_addTrans",U[x].$,21);a("_addItem",U[x].Y,19);a("_clearTrans",U[x].ea,105);a("_setTransactionDelim",U[x].Aa,82);a("_setCustomVar",U[x].wa,10);a("_deleteCustomVar",U[x].ka,35);a("_getVisitorCustomVar",U[x].ra,50);a("_setXKey",U[x].Ca,83);
a("_setXValue",U[x].Da,84);a("_getXKey",U[x].sa,76);a("_getXValue",U[x].ta,77);a("_clearXKey",U[x].fa,72);a("_clearXValue",U[x].ga,73);a("_createXObj",U[x].ja,75);a("_addIgnoredOrganic",U[x].W,15);a("_clearIgnoredOrganic",U[x].ba,97);a("_addIgnoredRef",U[x].X,31);a("_clearIgnoredRef",U[x].ca,32);a("_addOrganic",U[x].Z,14);a("_clearOrganic",U[x].da,70);a("_cookiePathCopy",U[x].ha,30);a("_get",U[x].ma,106);a("_set",U[x].xa,107);a("_addEventListener",U[x].addEventListener,108);a("_removeEventListener",
U[x].removeEventListener,109);a("_addDevId",U[x].V);a("_getPlugin",Pc,122);a("_setPageGroup",U[x].ya,126);a("_trackTiming",U[x].Ha,124);a("_initData",U[x].v,2);a("_setVar",U[x].Ba,22);V("_setSessionTimeout",db,27,3);V("_setCookieTimeout",eb,25,3);V("_setCookiePersistence",cb,24,1);a("_setAutoTrackOutbound",Fa,79);a("_setTrackOutboundSubdomains",Fa,81);a("_setHrefExamineLimit",Fa,80)};function Pc(a){var b=this.plugins_;if(b)return b.get(a)}
var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&H(d),c[ya](this,arguments)}catch(a){throw Ra("exc",b,a&&a[r]),a;}}},Qc=function(a,b,c,d){U[x][a]=function(){try{return H(c),Aa(this.a.get(b),d)}catch(e){throw Ra("exc",a,e&&e[r]),e;}}},V=function(a,b,c,d,e){U[x][a]=function(f){try{H(c),e==g?this.a.set(b,Aa(f,d)):this.a.set(b,e)}catch(Be){throw Ra("exc",a,Be&&Be[r]),Be;}}},Te=function(a,b){return{type:b,target:a,stopPropagation:function(){throw"aborted";}}};var Rc=RegExp(/(^|\.)doubleclick\.net$/i),Sc=function(a,b){return Rc[ia](J[z].hostname)?h:"/"!==b?l:(0==a[q]("www.google.")||0==a[q](".google.")||0==a[q]("google."))&&!(-1<a[q]("google.org"))?h:l},Tc=function(a){var b=a.get(bb),c=a.c(P,"/");if(Sc(b,c))a[ta]()};var Zc=function(){var a={},b={},c=new Uc;this.g=function(a,b){c.add(a,b)};var d=new Uc;this.e=function(a,b){d.add(a,b)};var e=l,f=l,Be=h;this.T=function(){e=h};this.j=function(a){this[ka]();this.set(sc,a,h);a=new Vc(this);e=l;d.execute(this);e=h;b={};this.n();a.Ja()};this.load=function(){e&&(e=l,this.Ka(),Wc(this),f||(f=h,c.execute(this),Xc(this),Wc(this)),e=h)};this.n=function(){if(e)if(f)e=l,Xc(this),e=h;else this[ka]()};this.get=function(c){Ua[c]&&this[ka]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ka]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.Za=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.Ka=function(){if(Be){var b=this.c(bb,""),c=this.c(P,"/");Sc(b,c)||(a[O]=a[hb]&&""!=b?Yc(b):1,Be=l)}}};Zc[x].stopPropagation=function(){throw"aborted";};
var Vc=function(a){var b=this;this.q=0;var c=a.get(tc);this.Ua=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ja=function(){!b.q&&c&&ca(c,10)};a.set(uc,b,h)};function $c(a,b){b=b||[];for(var c=0;c<b[w];c++){var d=b[c];if(""+a==d||0==d[q](a+"."))return d}return"-"}
var bd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(6!==b[w]||ad(b[0],c))return l;c=1*b[1];var d=1*b[2],e=1*b[3],f=1*b[4];b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return l;a.set(Q,c);a.set(Vb,d);a.set(Wb,e);a.set(Zb,f);a.set($b,b);return h},cd=function(a){var b=a.get(Q),c=a.get(Vb),d=a.get(Wb),e=a.get(Zb),f=a.b($b,1);return[a.b(O,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][C](".")},dd=function(a){return[a.b(O,1),a.b(cc,0),a.b(R,1),a.b(dc,0)][C](".")},ed=function(a,b,c){c=c?"":a.c(O,"1");var d=b[y](".");
if(4!==d[w]||ad(d[0],c))d=Ge;a.set(cc,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(dc,d?1*d[3]:a.get(ab));return d!=Ge||!ad(b,c)},fd=function(a,b){var c=G(a.c(Tb,"")),d=[],e=a.get(Fb);if(!b&&e){for(var f=0;f<e[w];f++){var Be=e[f];Be&&1==Be[ua]&&d[n](f+"="+G(Be[r])+"="+G(Be[na])+"=1")}0<d[w]&&(c+="|"+d[C]("^"))}return c?a.b(O,1)+"."+c:Ge},gd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(2>b[w]||ad(b[0],c))return l;b=b[ja](1)[C](".")[y]("|");0<b[w]&&a.set(Tb,I(b[0]));if(1>=b[w])return h;b=b[1][y](-1==
b[1][q](",")?"^":",");for(c=0;c<b[w];c++){var d=b[c][y]("=");if(4==d[w]){var e={};ha(e,I(d[1]));e.value=I(d[2]);e.scope=1;a.get(Fb)[d[0]]=e}}return h},hd=function(a,b){var c=Ue(a,b);return c?[a.b(O,1),a.b(ec,0),a.b(fc,1),a.b(gc,1),c][C]("."):""},Ue=function(a){function b(b,e){if(!F(a.get(b))){var f=a.c(b,""),f=f[y](" ")[C]("%20"),f=f[y]("+")[C]("%20");c[n](e+"="+f)}}var c=[];b(ic,"utmcid");b(nc,"utmcsr");b(S,"utmgclid");b(kc,"utmgclsrc");b(lc,"utmdclid");b(mc,"utmdsid");b(jc,"utmccn");b(oc,"utmcmd");
b(pc,"utmctr");b(qc,"utmcct");return c[C]("|")},id=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(5>b[w]||ad(b[0],c))return a.set(ec,g),a.set(fc,g),a.set(gc,g),a.set(ic,g),a.set(jc,g),a.set(nc,g),a.set(oc,g),a.set(pc,g),a.set(qc,g),a.set(S,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),l;a.set(ec,1*b[1]);a.set(fc,1*b[2]);a.set(gc,1*b[3]);Ve(a,b[ja](4)[C]("."));return h},Ve=function(a,b){function c(a){return(a=b[oa](a+"=(.*?)(?:\\|utm|$)"))&&2==a[w]?a[1]:g}function d(b,c){c?(c=e?I(c):c[y]("%20")[C](" "),
a.set(b,c)):a.set(b,g)}-1==b[q]("=")&&(b=I(b));var e="2"==c("utmcvr");d(ic,c("utmcid"));d(jc,c("utmccn"));d(nc,c("utmcsr"));d(oc,c("utmcmd"));d(pc,c("utmctr"));d(qc,c("utmcct"));d(S,c("utmgclid"));d(kc,c("utmgclsrc"));d(lc,c("utmdclid"));d(mc,c("utmdsid"))},ad=function(a,b){return b?a!=b:!/^\d+$/[ia](a)};var Uc=function(){this.filters=[]};Uc[x].add=function(a,b){this.filters[n]({name:a,s:b})};Uc[x].execute=function(a){try{for(var b=0;b<this.filters[w];b++)this.filters[b].s.call(W,a)}catch(c){}};function jd(a){if(100!=a.get(vb)&&a.get(Q)%1E4>=100*a.get(vb))a[ta]()}function kd(a){if(ld(a.get(Wa)))a[ta]()}function md(a){if("file:"==J[z][A])a[ta]()}function nd(a){a.get(Ib)||a.set(Ib,J.title,h);a.get(Hb)||a.set(Hb,J[z].pathname+J[z][va],h)};var od=new function(){var a=[];this.set=function(b){a[b]=h};this.Xa=function(){for(var b=[],c=0;c<a[w];c++)a[c]&&(b[m[la](c/6)]=b[m[la](c/6)]^1<<c%6);for(c=0;c<b[w];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[ma](b[c]||0);return b[C]("")+"~"}};function H(a){od.set(a)};var W=window,J=document,ld=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},We=function(a,b){ca(a,b)},pd=function(a){var b=[],c=J.cookie[y](";");a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$");for(var d=0;d<c[w];d++){var e=c[d][oa](a);e&&b[n](e[1])}return b},X=function(a,b,c,d,e,f){e=ld(e)?l:Sc(d,c)?l:h;if(e){if(b&&0<=W[za].userAgent[q]("Firefox")){b=b[p](/\n|\r/g," ");e=0;for(var Be=b[w];e<Be;++e){var k=b.charCodeAt(e)&255;if(10==k||13==k)b=b[B](0,e)+"?"+b[B](e+1)}}b&&
2E3<b[w]&&(b=b[B](0,2E3),H(69));a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date)[kf]()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");J.cookie=a}};var qd,rd,sd=function(){if(!qd){var a={},b=W[za],c=W.screen;a.Q=c?c.width+"x"+c.height:"-";a.P=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[D]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";try{var d;var e=J.documentElement,f=J.body,Be=f&&f[sa]&&f[wa],c=[];e&&(e[sa]&&e[wa])&&("CSS1Compat"===J.compatMode||!Be)?c=[e[sa],e[wa]]:Be&&(c=[f[sa],f[wa]]);d=0>=c[0]||0>=c[1]?"":c[C]("x");a.Wa=d}catch(k){H(135)}"preview"==b.loadPurpose&&
H(138);qd=a}},td=function(){sd();for(var a=qd,b=W[za],a=b.appName+b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.Q+a.P+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[w],c=W.history[w];0<c;)a+=c--^b++;return Yc(a)},ud=function(a){sd();var b=qd;a.set(Lb,b.Q);a.set(Mb,b.P);a.set(Pb,b.language);a.set(Qb,b.characterSet);a.set(Nb,b.javaEnabled);a.set(Rb,b.Wa);if(a.get(ib)&&a.get(jb)){if(!(b=rd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[za])?b.plugins:g)&&0<b[w])for(c=0;c<b[w]&&!e;c++)d=
b[c],-1<d[r][q]("Shockwave Flash")&&(e=d.description[y]("Shockwave Flash ")[1]);else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(Be){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(k){}e&&(e=e[y](" ")[1][y](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}rd=b;a.set(Ob,rd)}else a.set(Ob,"-")};var vd=function(a){if(Ba(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[B](0,d),this.h=b[B](d+1)):-1!=c&&-1==d?(this.l=b[B](0,c),this.h=b[B](c+1)):c>d?(this.i=b[B](0,d),this.l=b[B](d+1,c),this.h=b[B](c+1)):(this.i=b[B](0,d),this.h=b[B](d+1));this.k=a[ja](1);this.Ma=!this.l&&"_require"==this.h;this.J=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[x],"push",Y[x][n],5);T(Y[x],"_getPlugin",Pc,121);T(Y[x],
"_createAsyncTracker",Y[x].Sa,33);T(Y[x],"_getAsyncTracker",Y[x].Ta,34);this.I=new Ja;this.p=[]};E=Y[x];E.Na=function(a,b,c){var d=this.I.get(a);if(!Ba(d))return l;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};E.push=function(a){var b=Z.Va[ya](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[w]&&!Z.O(b[0])&&!(b.shift(),0<Z.p[w]););Z.p=Z.p.concat(b);return 0};E.Va=function(a){for(var b=[],c=0;c<arguments[w];c++)try{var d=new vd(arguments[c]);d.J?this.O(d):b[n](d)}catch(e){}return b};
E.O=function(a){try{if(a.s)a.s[ya](W);else if(a.J)this.I.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Ma){if(!this.Na(a.k[0],b,a.k[2])){if(!a.Pa){var c=Oa(""+a.k[1]);var d=c[A],e=J[z][A];var f;if(f="https:"==d||d==e?h:"http:"!=d?l:"http:"==e){var Be;t:{var k=Oa(J[z][xa]);if(!(c.Oa||0<=c.url[q]("?")||0<=c[ra][q]("://")||c[u]==k[u]&&c[pa]==k[pa]))for(var s="http:"==c[A]?80:443,t=M.S,b=0;b<t[w];b++)if(c[u]==t[b][0]&&(c[pa]||s)==(t[b][1]||s)&&0==c[ra][q](t[b][2])){Be=h;break t}Be=
l}f=Be&&!ld()}f&&(a.Pa=Ia(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][ya](b,a.k)}}catch(Za){}};E.Sa=function(a,b){return M.r(a,b||"")};E.Ta=function(a){return M.u(a)};var yd=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<Be[w];d++)if(g!=f[a][Be[d]]){c=l;break}c&&(f[a]=g)}}function d(a){var b="",c=l,d,e;for(d=0;d<Be[w];d++)if(e=a[Be[d]],g!=e){c&&(b+=Be[d]);for(var c=[],f=g,ga=g,ga=0;ga<e[w];ga++)if(g!=e[ga]){f="";ga!=mb&&g==e[ga-1]&&(f+=ga[v]()+Za);for(var Cd=e[ga],Jc="",Yb=g,Kc=g,Lc=g,Yb=0;Yb<
Cd[w];Yb++)Kc=Cd[ma](Yb),Lc=Ma[Kc],Jc+=g!=Lc?Lc:Kc;f+=Jc;c[n](f)}b+=k+c[C](t)+s;c=l}else c=h;return b}var e=this,f=[],Be=["k","v"],k="(",s=")",t="*",Za="!",Ma={"'":"'0"};Ma[s]="'1";Ma[t]="'2";Ma[Za]="'3";var mb=1;e.Ra=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[w];b++)g!=f[b]&&(a+=b[v]()+d(f[b]));return a};e.Qa=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[w];c++)g!=f[c]&&!a.Ra(c)&&(b+=c[v]()+d(f[c]));return b};e.f=function(b,c,d){if(!wd(d))return l;a(b,"k",c,d);return h};
e.o=function(b,c,d){if(!xd(d))return l;a(b,"v",c,d[v]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.N=function(a,c){return b(a,"v",c)};e.L=function(a){c(a,"k")};e.M=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.N,88);T(e,"_clearKey",e.L,85);T(e,"_clearValue",e.M,86)};function wd(a){return"string"==typeof a}function xd(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||m.round(a)!=a||da(a)||a==ba?l:h};var zd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},Ad=function(){var a=zd(h).hid;a==Ge&&(a=Ea(),zd(h).hid=a);return a},Dd=function(a){a.set(Kb,Ad());var b=zd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&(a.get(ac)?H(112):H(132),a.set(Zb,c),a.get(Sb)&&a.set(Wb,c));b=b.vid;a.get(Sb)&&b&&(b=b[y]("."),a.set(Q,1*b[0]),a.set(Vb,1*b[1]))}};var Ed,Fd=function(a,b,c,d){var e=a.c(bb,""),f=a.c(P,"/");d=d!=g?d:a.b(cb,0);a=a.c(Wa,"");X(b,c,f,e,a,d)},Xc=function(a){var b=a.c(bb,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",cd(a),c,b,d,a.get(cb));X("__utmb",dd(a),c,b,d,a.get(db));X("__utmc",""+a.b(O,1),c,b,d);var e=hd(a,h);e?X("__utmz",e,c,b,d,a.get(eb)):X("__utmz","",c,b,"",-1);(e=fd(a,l))?X("__utmv",e,c,b,d,a.get(cb)):X("__utmv","",c,b,"",-1)},Wc=function(a){var b=a.b(O,1);if(!bd(a,$c(b,pd("__utma"))))return a.set(Ub,h),l;var c=!ed(a,
$c(b,pd("__utmb")));a.set(bc,c);id(a,$c(b,pd("__utmz")));gd(a,$c(b,pd("__utmv")));Ed=!c;return h},Gd=function(a){!Ed&&!(0<pd("__utmb")[w])&&(X("__utmd","1",a.c(P,"/"),a.c(bb,""),a.c(Wa,""),1E4),0==pd("__utmd")[w]&&a[ta]())};var lf=0,Jd=function(a){a.get(Q)==g?Hd(a):a.get(Ub)&&!a.get(Mc)?Hd(a):a.get(bc)&&(Id(a),lf++,1<lf&&H(137))},Kd=function(a){a.get(hc)&&!a.get(ac)&&(Id(a),a.set(fc,a.get($b)))},Hd=function(a){var b=a.get(ab);a.set(Sb,h);a.set(Q,Ea()^td(a)&2147483647);a.set(Tb,"");a.set(Vb,b);a.set(Wb,b);a.set(Zb,b);a.set($b,1);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,b);a.set(Fb,[]);a.set(Ub,l);a.set(bc,l)},Id=function(a){a.set(Wb,a.get(Zb));a.set(Zb,a.get(ab));a.Za($b);a.set(ac,h);a.set(cc,0);a.set(R,10);a.set(dc,
a.get(ab));a.set(bc,l)};var Ld="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q 360.cn:q".split(" "),
Sd=function(a){if(a.get(kb)&&!a.get(Mc)){for(var b=!F(a.get(ic))||!F(a.get(nc))||!F(a.get(S))||!F(a.get(lc)),c={},d=0;d<Md[w];d++){var e=Md[d];c[e]=a.get(e)}(d=a.get(rc))?(H(149),e=new Ja,Na(e,d),d=e):d=La(J[z][xa],a.get(gb)).d;if(!("1"==L(d.get(a.get(ub)))&&b)&&(d=Xe(a,d)||Qd(a),!d&&(!b&&a.get(ac))&&(Pd(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h),d&&(a.set(hc,Rd(a,c)),b="(direct)"==a.get(nc)&&"(direct)"==a.get(jc)&&"(none)"==a.get(oc),a.get(hc)||a.get(ac)&&!b)))a.set(ec,a.get(ab)),a.set(fc,
a.get($b)),a.Za(gc)}},Xe=function(a,b){function c(c,d){d=d||"-";var e=L(b.get(a.get(c)));return e&&"-"!=e?I(e):d}var d=L(b.get(a.get(nb)))||"-",e=L(b.get(a.get(qb)))||"-",f=L(b.get(a.get(pb)))||"-",Be=L(b.get("gclsrc"))||"-",k=L(b.get("dclid"))||"-",s=c(ob,"(not set)"),t=c(rb,"(not set)"),Za=c(sb),Ma=c(tb);if(F(d)&&F(f)&&F(k)&&F(e))return l;var mb=!F(f)&&!F(Be),mb=F(e)&&(!F(k)||mb),Xb=F(Za);if(mb||Xb){var Bd=Nd(a),Bd=La(Bd,h);if((Bd=Od(a,Bd))&&!F(Bd[1]&&!Bd[2]))mb&&(e=Bd[0]),Xb&&(Za=Bd[1])}Pd(a,d,
e,f,Be,k,s,t,Za,Ma);return h},Qd=function(a){var b=Nd(a),c=La(b,h);if(!(b!=g&&b!=Ge&&""!=b&&"0"!=b&&"-"!=b&&0<=b[q]("://"))||c&&-1<c[u][q]("google")&&c.d.contains("q")&&"cse"==c[ra])return l;if((b=Od(a,c))&&!b[2])return Pd(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(ac))return l;t:{for(var b=a.get(Bb),d=Ka(c[u]),e=0;e<b[w];++e)if(-1<d[q](b[e])){a=l;break t}Pd(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[ra]);a=h}return a},Od=function(a,b){for(var c=a.get(zb),d=0;d<c[w];++d){var e=c[d][y](":");
if(-1<b[u][q](e[0][D]())){var f=b.d.get(e[1]);if(f&&(f=K(f),!f&&-1<b[u][q]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[q](e[3]))){t:{for(var c=f,d=a.get(Ab),c=I(c)[D](),Be=0;Be<d[w];++Be)if(c==d[Be]){c=h;break t}c=l}return[e[2]||e[0],f,c]}}}return Ge},Pd=function(a,b,c,d,e,f,Be,k,s,t){a.set(ic,b);a.set(nc,c);a.set(S,d);a.set(kc,e);a.set(lc,f);a.set(jc,Be);a.set(oc,k);a.set(pc,s);a.set(qc,t)},Md=[jc,ic,S,lc,nc,oc,pc,qc],Rd=function(a,b){function c(a){a=(""+a)[y]("+")[C]("%20");return a=a[y](" ")[C]("%20")}
function d(c){var d=""+(a.get(c)||"");c=""+(b[c]||"");return 0<d[w]&&d==c}if(d(S)||d(lc))return H(131),l;for(var e=0;e<Md[w];e++){var f=Md[e],Be=b[f]||"-",f=a.get(f)||"-";if(c(Be)!=c(f))return h}return l},Td=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Nd=function(a){a=Pa(a.get(Jb),a.get(P));try{if(Td[ia](a))return H(136),a+"?q="}catch(b){H(145)}return a};var Ud,Vd,Wd=function(a){Ud=a.c(S,"");Vd=a.c(kc,"")},Xd=function(a){var b=a.c(S,""),c=a.c(kc,"");b!=Ud&&(-1<c[q]("ds")?a.set(mc,g):!F(Ud)&&-1<Vd[q]("ds")&&a.set(mc,Ud))};var Zd=function(a){Yd(a,J[z][xa])?(a.set(Mc,h),H(12)):a.set(Mc,l)},Yd=function(a,b){if(!a.get(fb))return l;var c=La(b,a.get(gb)),d=K(c.d.get("__utma")),e=K(c.d.get("__utmb")),f=K(c.d.get("__utmc")),Be=K(c.d.get("__utmx")),k=K(c.d.get("__utmz")),s=K(c.d.get("__utmv")),c=K(c.d.get("__utmk"));if(Yc(""+d+e+f+Be+k+s)!=c){d=I(d);e=I(e);f=I(f);Be=I(Be);f=$d(d+e+f+Be,k,s,c);if(!f)return l;k=f[0];s=f[1]}if(!bd(a,d,h))return l;ed(a,e,h);id(a,k,h);gd(a,s,h);ae(a,Be,h);return h},ce=function(a,b,c){var d;d=cd(a)||
"-";var e=dd(a)||"-",f=""+a.b(O,1)||"-",Be=be(a)||"-",k=hd(a,l)||"-";a=fd(a,l)||"-";var s=Yc(""+d+e+f+Be+k+a),t=[];t[n]("__utma="+d);t[n]("__utmb="+e);t[n]("__utmc="+f);t[n]("__utmx="+Be);t[n]("__utmz="+k);t[n]("__utmv="+a);t[n]("__utmk="+s);d=t[C]("&");if(!d)return b;e=b[q]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[q]("?");0<e&&(c=b[B](e),b=b[B](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},$d=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Yc(a+b+c))return H(127),[b,c];var Be=b[p](/ /g,
"%20"),k=c[p](/ /g,"%20");if(d==Yc(a+Be+k))return H(128),[Be,k];Be=Be[p](/\+/g,"%20");k=k[p](/\+/g,"%20");if(d==Yc(a+Be+k))return H(129),[Be,k];try{var s=b[oa]("utmctr=(.*?)(?:\\|utm|$)");if(s&&2==s[w]&&(Be=b[p](s[1],G(I(s[1]))),d==Yc(a+Be+c)))return H(139),[Be,c]}catch(t){}b=I(b)}c=I(c)}};var de="|",fe=function(a,b,c,d,e,f,Be,k,s){var t=ee(a,b);t||(t={},a.get(Cb)[n](t));t.id_=b;t.affiliation_=c;t.total_=d;t.tax_=e;t.shipping_=f;t.city_=Be;t.state_=k;t.country_=s;t.items_=t.items_||[];return t},ge=function(a,b,c,d,e,f,Be){a=ee(a,b)||fe(a,b,"",0,0,0,"","","");var k;t:{if(a&&a.items_){k=a.items_;for(var s=0;s<k[w];s++)if(k[s].sku_==c){k=k[s];break t}}k=Ge}s=k||{};s.transId_=b;s.sku_=c;s.name_=d;s.category_=e;s.price_=f;s.quantity_=Be;k||a.items_[n](s);return s},ee=function(a,b){for(var c=
a.get(Cb),d=0;d<c[w];d++)if(c[d].id_==b)return c[d];return Ge};var he,ie=function(a){if(!he){var b;b=J[z].hash;var c=W[r],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[oa](d)||c&&c[oa](d))?b[1]:K(pd("GASO")))&&b[oa](/^(?:!([-0-9a-z.]{1,40})!)?([-.\w]{10,1200})$/i))Fd(a,"GASO",""+b,0),M._gasoDomain=a.get(bb),M._gasoCPath=a.get(P),a=c[1],Ia("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Ea(),"_gasojs");he=h}};var ae=function(a,b,c){c&&(b=I(b));c=a.b(O,1);b=b[y](".");!(2>b[w])&&/^\d+$/[ia](b[0])&&(b[0]=""+c,Fd(a,"__utmx",b[C]("."),g))},be=function(a,b){var c=$c(a.get(O),pd("__utmx"));"-"==c&&(c="");return b?G(c):c},Ye=function(a){try{var b=La(J[z][xa],l),c=ea(L(b.d.get("utm_referrer")))||"";c&&a.set(Jb,c);var d=W.gaData&&W.gaData.expId;d||(d=ea(K(b.d.get("utm_expid")))||"");d&&a.set(Oc,""+d)}catch(e){H(146)}};var ke=function(a,b){var c=m.min(a.b(Dc,0),100);if(a.b(Q,0)%100>=c)return l;c=Ze()||$e();if(c==g)return l;var d=c[0];if(d==g||d==ba||da(d))return l;0<d?af(c)?b(je(c)):b(je(c[ja](0,1))):Ga(W,"load",function(){ke(a,b)},l);return h},me=function(a,b,c,d){var e=new yd;e.f(14,90,b[B](0,500));e.f(14,91,a[B](0,150));e.f(14,92,""+le(c));d!=g&&e.f(14,93,d[B](0,500));e.o(14,90,c);return e},af=function(a){for(var b=1;b<a[w];b++)if(da(a[b])||a[b]==ba||0>a[b])return l;return h},le=function(a){return da(a)||0>a?
0:5E3>a?10*m[la](a/10):5E4>a?100*m[la](a/100):41E5>a?1E3*m[la](a/1E3):41E5},je=function(a){for(var b=new yd,c=0;c<a[w];c++)b.f(14,c+1,""+le(a[c])),b.o(14,c+1,a[c]);return b},Ze=function(){var a=W.performance||W.webkitPerformance;if(a=a&&a.timing){var b=a.navigationStart;if(0==b)H(133);else return[a.loadEventStart-b,a.domainLookupEnd-a.domainLookupStart,a.connectEnd-a.connectStart,a.responseStart-a.requestStart,a.responseEnd-a.responseStart,a.fetchStart-b,a.domInteractive-b,a.domContentLoadedEventStart-
b]}},$e=function(){if(W.top==W){var a=W.external,b=a&&a.onloadT;a&&!a.isValidLoadTime&&(b=g);2147483648<b&&(b=g);0<b&&a.setPageReadyTime();return b==g?g:[b]}};var cf=function(a){if(a.get(Sb))try{var b;t:{var c=pd(a.get(Oe)||"_ga");if(c&&!(1>c[w])){for(var d=[],e=0;e<c[w];e++){var f;var Be=c[e][y]("."),k=Be.shift();if(("GA1"==k||"1"==k)&&1<Be[w]){var s=Be.shift()[y]("-");1==s[w]&&(s[1]="1");s[0]*=1;s[1]*=1;f={Ya:s,$a:Be[C](".")}}else f=g;f&&d[n](f)}if(1==d[w]){b=d[0].$a;break t}if(0!=d[w]){var t=a.get(Pe)||a.get(bb),d=bf(d,(0==t[q](".")?t.substr(1):t)[y](".")[w],0);if(1==d[w]){b=d[0].$a;break t}var Za=a.get(Qe)||a.get(P);(c=Za)?(1<c[w]&&"/"==c[ma](c[w]-
1)&&(c=c.substr(0,c[w]-1)),0!=c[q]("/")&&(c="/"+c),Za=c):Za="/";d=bf(d,"/"==Za?1:Za[y]("/")[w],1);b=d[0].$a;break t}}b=g}if(b){var Ma=(""+b)[y](".");2==Ma[w]&&/[0-9.]/[ia](Ma)&&(H(114),a.set(Q,Ma[0]),a.set(Vb,Ma[1]),a.set(Sb,l))}}catch(mb){H(115)}},bf=function(a,b,c){for(var d=[],e=[],f=128,Be=0;Be<a[w];Be++){var k=a[Be];if(k.Ya[c]==b)d[n](k);else if(k.Ya[c]==f)e[n](k);else k.Ya[c]<f&&(e=[k],f=k.Ya[c])}return 0<d[w]?d:e};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Nc)[a])&&b[w])for(var c=Te(e,a),d=0;d<b[w];d++)b[d].call(e,c)}}var e=this;this.a=new Zc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set($a,a||"");this.set(Ya,c||"");this.set(ab,m.round((new Date)[kf]()/1E3));this.set(P,"/");this.set(cb,63072E6);this.set(eb,15768E6);this.set(db,18E5);this.set(fb,l);this.set(yb,50);this.set(gb,l);this.set(hb,h);this.set(ib,
h);this.set(jb,h);this.set(kb,h);this.set(lb,h);this.set(ob,"utm_campaign");this.set(nb,"utm_id");this.set(pb,"gclid");this.set(qb,"utm_source");this.set(rb,"utm_medium");this.set(sb,"utm_term");this.set(tb,"utm_content");this.set(ub,"utm_nooverride");this.set(vb,100);this.set(Dc,1);this.set(Ec,l);this.set(wb,"/__utm.gif");this.set(xb,1);this.set(Cb,[]);this.set(Fb,[]);this.set(zb,Ld[ja](0));this.set(Ab,[]);this.set(Bb,[]);this.B("auto");this.set(Jb,J.referrer);Ye(this.a);this.set(Nc,{hit:[],load:[]});
this.a.g("0",Zd);this.a.g("1",Wd);this.a.g("2",Jd);this.a.g("3",cf);this.a.g("4",Sd);this.a.g("5",Xd);this.a.g("6",Kd);this.a.g("7",d("load"));this.a.g("8",ie);this.a.e("A",kd);this.a.e("B",md);this.a.e("C",Jd);this.a.e("D",jd);this.a.e("E",Tc);this.a.e("F",ne);this.a.e("G",Gd);this.a.e("H",nd);this.a.e("I",ud);this.a.e("J",Dd);this.a.e("K",d("hit"));this.a.e("L",oe);this.a.e("M",pe);0===this.get(ab)&&H(111);this.a.T();this.H=g};E=U[x];
E.m=function(){var a=this.get(Db);a||(a=new yd,this.set(Db,a));return a};E.La=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};E.K=function(a){if(this.get(Ec))return l;var b=this,c=ke(this.a,function(c){b.set(Hb,a,h);b.t(c)});this.set(Ec,c);return c};E.Fa=function(a){a&&Ca(a)?(H(13),this.set(Hb,a,h)):"object"===typeof a&&a!==Ge&&this.La(a);this.H=a=this.get(Hb);this.a.j("page");this.K(a);42==m[la](1E4*m[Je]())&&df(this.a.get(Q),this.a.get(Vb))};
E.F=function(a,b,c,d,e){if(""==a||(!wd(a)||""==b||!wd(b))||c!=g&&!wd(c)||d!=g&&!xd(d))return l;this.set(wc,a,h);this.set(xc,b,h);this.set(yc,c,h);this.set(zc,d,h);this.set(vc,!!e,h);this.a.j("event");return h};E.Ha=function(a,b,c,d,e){var f=this.a.b(Dc,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return l;c=1*(""+c);if(""==a||(!wd(a)||""==b||!wd(b)||!xd(c)||da(c)||0>c||0>f||100<f)||d!=g&&(""==d||!wd(d)))return l;this.t(me(a,b,c,d));return h};
E.Ga=function(a,b,c,d){if(!a||!b)return l;this.set(Ac,a,h);this.set(Bc,b,h);this.set(Cc,c||J[z][xa],h);d&&this.set(Hb,d,h);this.a.j("social");return h};E.Ea=function(){this.set(Dc,10);this.K(this.H)};E.Ia=function(){this.a.j("trans")};E.t=function(a){this.set(Eb,a,h);this.a.j("event")};E.ia=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){H(91);b.F(a,c,d,e)}}};E.ma=function(a){return this.get(a)};
E.xa=function(a,b){if(a)if(Ca(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};E.addEventListener=function(a,b){var c=this.get(Nc)[a];c&&c[n](b)};E.removeEventListener=function(a,b){for(var c=this.get(Nc)[a],d=0;c&&d<c[w];d++)if(c[d]==b){c.splice(d,1);break}};E.qa=function(){return"5.4.2"};E.B=function(a){this.get(hb);a="auto"==a?Ka(J.domain):!a||"-"==a||"none"==a?"":a[D]();this.set(bb,a)};E.va=function(a){this.set(hb,!!a)};
E.na=function(a,b){return ce(this.a,a,b)};E.link=function(a,b){if(this.a.get(fb)&&a){var c=ce(this.a,a,b);J[z].href=c}};E.ua=function(a,b){this.a.get(fb)&&(a&&a.action)&&(a.action=ce(this.a,a.action,b))};
E.za=function(){this.v();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:Ge;if(b&&b[na]){a.set(Cb,[]);for(var b=b[na][y]("UTM:"),c=0;c<b[w];c++){b[c]=Da(b[c]);for(var d=b[c][y](de),e=0;e<d[w];e++)d[e]=Da(d[e]);"T"==d[0]?fe(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&ge(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};E.$=function(a,b,c,d,e,f,Be,k){return fe(this.a,a,b,c,d,e,f,Be,k)};E.Y=function(a,b,c,d,e,f){return ge(this.a,a,b,c,d,e,f)};
E.Aa=function(a){de=a||"|"};E.ea=function(){this.set(Cb,[])};E.wa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(yb))a=l;else if(!b||!c||128<b[w]+c[w])a=l;else{1!=d&&2!=d&&(d=3);var f={};ha(f,b);f.value=c;f.scope=d;e.get(Fb)[a]=f;a=h}a&&this.a.n();return a};E.ka=function(a){this.a.get(Fb)[a]=g;this.a.n()};E.ra=function(a){return(a=this.a.get(Fb)[a])&&1==a[ua]?a[na]:g};E.Ca=function(a,b,c){this.m().f(a,b,c)};E.Da=function(a,b,c){this.m().o(a,b,c)};E.sa=function(a,b){return this.m().getKey(a,b)};
E.ta=function(a,b){return this.m().N(a,b)};E.fa=function(a){this.m().L(a)};E.ga=function(a){this.m().M(a)};E.ja=function(){return new yd};E.W=function(a){a&&this.get(Ab)[n](a[D]())};E.ba=function(){this.set(Ab,[])};E.X=function(a){a&&this.get(Bb)[n](a[D]())};E.ca=function(){this.set(Bb,[])};E.Z=function(a,b,c,d,e){if(a&&b){a=[a,b[D]()][C](":");if(d||e)a=[a,d,e][C](":");d=this.get(zb);d.splice(c?0:d[w],0,a)}};E.da=function(){this.set(zb,[])};
E.ha=function(a){this.a[ka]();var b=this.get(P),c=be(this.a);this.set(P,a);this.a.n();ae(this.a,c);this.set(P,b)};E.ya=function(a,b){if(0<a&&5>=a&&Ca(b)&&""!=b){var c=this.get(Fc)||[];c[a]=b;this.set(Fc,c)}};E.V=function(a){a=""+a;if(a[oa](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Ic)||[];b[n](a);this.set(Ic,b)}};E.v=function(){this.a[ka]()};E.Ba=function(a){a&&""!=a&&(this.set(Tb,a),this.a.j("var"))};var ef=l;
function df(a,b){function c(c,Be){var k="p="+c+"&vid="+a+"."+b+"&tid="+d+"&rid="+e,Ma=new Image(1,1);Ma.src=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/u/"+f[Be]+".gif?"+k;He(Ma,function(){He(Ma,Ge);Ie(Ma,Ge)});Ie(Ma,function(){He(Ma,Ge);Ie(Ma,Ge)})}if(!ef){ef=h;var d=(new Date)[kf](),e=Ea(),f=["a","b","c"],Be=[[0,1],[1,0],[0,2],[2,0]],k=m[la](m[Je]()*Be[w]);c(k,Be[k][0]);c(k,Be[k][1])}};var ne=function(a){"trans"!==a.get(sc)&&500<=a.b(cc,0)&&a[ta]();if("event"===a.get(sc)){var b=(new Date)[kf](),c=a.b(dc,0),d=a.b(Zb,0),c=m[la](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(dc,b),a.set(R,m.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[ta]()}},pe=function(a){"event"===a.get(sc)&&a.set(R,m.max(0,a.b(R,10)-1))};var qe=function(){var a=[];this.add=function(b,c,d){d&&(c=G(""+c));a[n](b+"="+c)};this.toString=function(){return a[C]("&")}},re=function(a,b){(b||2!=a.get(xb))&&a.Za(cc)},se=function(a,b){b.add("utmwv","5.4.2");b.add("utms",a.get(cc));b.add("utmn",Ea());var c=J[z].hostname;F(c)||b.add("utmhn",c,h);c=a.get(vb);100!=c&&b.add("utmsp",c,h)},te=function(a,b){b.add("utmht",(new Date)[kf]());b.add("utmac",Da(a.get(Wa)));a.get(Oc)&&b.add("utmxkey",a.get(Oc),h);a.get(vc)&&b.add("utmni",1);var c=a.get(Ic);
c&&0<c[w]&&b.add("utmdid",c[C]("."));ff(a,b);a.get(Xa)!==l&&(a.get(Xa)||M.w)&&b.add("aip",1);b.add("utmu",od.Xa())},ue=function(a,b){for(var c=a.get(Fc)||[],d=[],e=1;e<c[w];e++)c[e]&&d[n](e+":"+G(c[e][p](/%/g,"%25")[p](/:/g,"%3A")[p](/,/g,"%2C")));d[w]&&b.add("utmpg",d[C](","))},ff=function(a,b){function c(a,b){b&&d[n](a+"="+b+";")}var d=[];c("__utma",cd(a));c("__utmz",hd(a,l));c("__utmv",fd(a,h));c("__utmx",be(a));b.add("utmcc",d[C]("+"),h)},ve=function(a,b){a.get(ib)&&(b.add("utmcs",a.get(Qb),h),
b.add("utmsr",a.get(Lb)),a.get(Rb)&&b.add("utmvp",a.get(Rb)),b.add("utmsc",a.get(Mb)),b.add("utmul",a.get(Pb)),b.add("utmje",a.get(Nb)),b.add("utmfl",a.get(Ob),h))},we=function(a,b){a.get(lb)&&a.get(Ib)&&b.add("utmdt",a.get(Ib),h);b.add("utmhid",a.get(Kb));b.add("utmr",Pa(a.get(Jb),a.get(P)),h);b.add("utmp",G(a.get(Hb),h),h)},xe=function(a,b){for(var c=a.get(Db),d=a.get(Eb),e=a.get(Fb)||[],f=0;f<e[w];f++){var Be=e[f];Be&&(c||(c=new yd),c.f(8,f,Be[r]),c.f(9,f,Be[na]),3!=Be[ua]&&c.f(11,f,""+Be[ua]))}!F(a.get(wc))&&
!F(a.get(xc),h)&&(c||(c=new yd),c.f(5,1,a.get(wc)),c.f(5,2,a.get(xc)),e=a.get(yc),e!=g&&c.f(5,3,e),e=a.get(zc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Qa(d),h):d&&b.add("utme",d.A(),h)},ye=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&
d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[v]()},ze=function(a,b,c){var d=new qe;re(a,c);se(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);xe(a,d);ve(a,d);we(a,d);(b=a.get(Gb))&&d.add("utmcu",b,h);c||(ue(a,d),te(a,d));return d[v]()},Ae=function(a,b){var c=a.get(sc);if("page"==c)c=new qe,re(a,b),se(a,c),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),
c=[c[v]()];else if("event"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","event"),xe(a,c),ve(a,c),we(a,c),b||(ue(a,c),te(a,c)),c=[c[v]()];else if("var"==c)c=new qe,re(a,b),se(a,c),c.add("utmt","var"),!b&&te(a,c),c=[c[v]()];else if("trans"==c)for(var c=[],d=a.get(Cb),e=0;e<d[w];++e){c[n](ye(a,d[e],b));for(var f=d[e].items_,Be=0;Be<f[w];++Be)c[n](ze(a,f[Be],b))}else"social"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","social"),c.add("utmsn",a.get(Ac),h),c.add("utmsa",a.get(Bc),h),c.add("utmsid",a.get(Cc),
h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[v]()]):"feedback"==c?b?c=[]:(c=new qe,re(a,b),se(a,c),c.add("utmt","feedback"),c.add("utmfbid",a.get(Gc),h),c.add("utmfbpr",a.get(Hc),h),xe(a,c),ve(a,c),we(a,c),ue(a,c),te(a,c),c=[c[v]()]):c=[];return c},oe=function(a){var b,c=a.get(xb),d=a.get(uc),e=d&&d.Ua,f=0;if(0==c||2==c){var Be=a.get(wb)+"?";b=Ae(a,h);for(var k=0,s=b[w];k<s;k++)Sa(b[k],e,Be,h),f++}if(1==c||2==c){b=Ae(a);k=0;for(s=b[w];k<s;k++)try{Sa(b[k],e),f++}catch(t){t&&Ra(t[r],g,t.message)}}d&&
(d.q=f)};var Ce=function(a){ha(this,"len");this.message=a+"-8192"},De=function(a){ha(this,"ff2post");this.message=a+"-2036"},Sa=function(a,b,c,d){b=b||Fa;if(d||2036>=a[w])gf(a,b,c);else if(8192>=a[w]){if(0<=W[za].userAgent[q]("Firefox")&&![].reduce)throw new De(a[w]);hf(a,b)||Ee(a,b)}else throw new Ce(a[w]);},gf=function(a,b,c){c=c||(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/__utm.gif?";var d=new Image(1,1);d.src=c+a;He(d,function(){He(d,Ge);Ie(d,Ge);b()});Ie(d,function(){He(d,
Ge);Ie(d,Ge);b()})},hf=function(a,b){var c,d=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/p/__utm.gif",e=W.XDomainRequest;if(e)c=new e,c.open("POST",d);else if(e=W.XMLHttpRequest)e=new e,"withCredentials"in e&&(c=e,c.open("POST",d,h),c.setRequestHeader("Content-Type","text/plain"));if(c)return c.onreadystatechange=function(){4==c.readyState&&(b(),c=Ge)},c.send(a),h},Ee=function(a,b){if(J.body){a=aa(a);try{var c=J[qa]('<iframe name="'+a+'"></iframe>')}catch(d){c=
J[qa]("iframe"),ha(c,a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var e=J[z],e=(Ne()||M.G?"https://ssl.google-analytics.com":"http://www.google-analytics.com")+"/u/post_iframe.html#"+aa(e[A]+"//"+e[u]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Ga(W,"beforeunload",f);var Be=l,k=0,s=function(){if(!Be){try{if(9<k||c.contentWindow[z][u]==J[z][u]){Be=h;f();Ha(W,"beforeunload",f);b();return}}catch(a){}k++;ca(s,200)}};Ga(c,"load",s);
J.body.appendChild(c);c.src=e}else We(function(){Ee(a,b)},100)};var $=function(){this.G=this.w=l;this.C={};this.D=[];this.U=0;this.S=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;Re();Se()};E=$[x];E.oa=function(a,b){return this.r(a,g,b)};E.r=function(a,b,c){b&&H(23);c&&H(67);b==g&&(b="~"+M.U++);a=new U(b,a,c);M.C[b]=a;M.D[n](a);return a};E.u=function(a){a=a||"";return M.C[a]||M.r(g,a)};E.pa=function(){return M.D[ja](0)};E.aa=function(){this.w=h};E.la=function(){this.G=h};var Fe=function(a){if("prerender"==J.webkitVisibilityState)return l;a();return h};var M=new $;var jf=W._gat;jf&&Ba(jf._getTracker)?M=jf:W._gat=M;var Z=new Y;(function(a){if(!Fe(a)){H(123);var b=l,c=function(){!b&&Fe(a)&&(b=h,Ha(J,"webkitvisibilitychange",c))};Ga(J,"webkitvisibilitychange",c)}})(function(){var a=W._gaq,b=l;if(a&&Ba(a[n])&&(b="[object Array]"==Object[x][v].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[n][ya](Z,a)});function Yc(a){var b=1,c=0,d;if(a){b=0;for(d=a[w]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b};})();


/*
<|-------------------- GLOBAL VARIABLE --------------------|>
*/

var mapInstance; //instanza globale della mappa
var geocoder;
var infowindow;
var markers=[]; //array dei marker

/*
<|-------------------- END VARIABLE --------------------|>
*/



/*
<|-------------------- MAPS FUNCTION --------------------|>
*/

function initialize_map(sufix) {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(42.7,13.5);
	var myOptions = {
		zoom: 8,
		center: latlng,
		disableDefaultUI: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapInstance = new google.maps.Map(document.getElementById("map_canvas-"+sufix), myOptions);
	infowindow = new google.maps.InfoWindow;
}

function AutoCenter() {
	var bounds = new google.maps.LatLngBounds();
	for(var i in markers){
		bounds.extend(markers[i].position);
	}
	mapInstance.fitBounds(bounds);
}

function nuovomarker(lat,lng,quale,info,identifier,marker) {
	var myLatlng = new google.maps.LatLng(lat,lng);

	if (marker!="")
	{
		var marker = new google.maps.Marker({
			map: mapInstance,
			position: myLatlng,
			html:info,
			icon: marker
		});
	}
	else
	{
		var marker = new google.maps.Marker({
			map: mapInstance,
			position: myLatlng,
			html:"<div rel=\""+identifier+"\" class=\"fumetto box\" style=\"width: 70px; height: 70px; color: #1E2636; font-size: 12px; font-family: Helvetica;\"><b>"+quale+"</b><br />"+info+"</div>"
		});
	}
	markers.push(marker);

	console.log('nome: '+marker.html);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.html);
		infowindow.open(mapInstance, marker);
	}); 

	// google.maps.event.addListener(marker, 'click', function () {
	// 	showInfo(this.html);
	// });
}

// function showInfo(out){
// 	top.location="<? 
// 	//~ echo substr($_SERVER['HTTP_REFERER'], 0, strpos($_SERVER['HTTP_REFERER'],'?')) ;
// 	echo $_SERVER['HTTP_REFERER'];
// 	?>?idscheda="+out;
// }

function clearMarker()
{
	if (markers!=null)
	{
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers.splice(0,markers.length);
	}
}

function assemblyMap(listArr)
{
	clearMarker();

	if (listArr.length > 0)
	{
		for (var i = 0; i < listArr.length; i++)
		{
			nuovomarker(listArr[i].latitudine,listArr[i].longitudine,clearLangTag(listArr[i].nome,'it'),clearLangTag(listArr[i].categoria,'it'),listArr[i].id,"");
		}
	}
	nuovomarker(uLat,uLon,"Sei Qui","posizione attuale","img/seiQui.png");
	AutoCenter();
}

/*
<|-------------------- END MAPS --------------------|>
*/

var pushNotification;

function onDeviceReady()
{	
	// alert('Prova notifiche push on device ready');
	try
	{
		// alert('Prova notifiche push-up: try!');
		pushNotification = window.plugins.pushNotification;
		if (device.platform == 'android' || device.platform == 'Android')
		{
			//registro configurazione per Android
			// alert( 'pushNotification: '+ pushNotification );
			
			pushNotification.register( successHandler, errorHandler, {"senderID":"863415380636","ecb":"onNotificationGCM"} );
			// alert('Prova notifiche post register');			
		}
	}
	catch(err)
	{
		//alert('Prova notifiche push-up: errore!');
		//console.log('err: ',err);
	}
}

// handle GCM notifications for Android
function onNotificationGCM(e)
{
	// $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
		/*for(var p in e ){
			console.log(p);
		}
		*/
	switch( e.event )
	{
		case 'registered':
			//console.log('registered');
		if ( e.regid.length > 0 )
		{
			// $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
			// Your GCM push server needs to know the regID before it can push to this device
			// here is where you might want to send it the regID for later use.
			//console.log("regID = " + e.regID);
			//console.log("regID = " + e.regid);

			$.ajax({
					type: "GET",
					url: 'http://www.seapass.it/core/push_msg/reg_android.php?rid='+e.regid+'&callback=?',
					// url: 'http://office.norz.it/picenoPush/reg_android.php?rid='+e.regid+'&callback=?',
					dataType: 'jsonp',
					beforeSend: function(x){},
					error: function(){ console.log('error'); },
					success: function(data){
						//alert('success: '+data);
						//console.log('Data: ',data);
					}
				});
		}
		break;
		
		case 'message':
			// if this flag is set, this notification happened while we were in the foreground.
			// you might want to play a sound to get the user's attention, throw up a dialog, etc.
			
			// if (e.foreground)
			// {
			// 	$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
				
			// 	// if the notification contains a soundname, play it.
			// 	var my_media = new Media("/android_asset/www/"+e.soundname);
			// 	my_media.play();
			// }
			// else
			// {	// otherwise we were launched because the user touched a notification in the notification tray.
			// 	if (e.coldstart)
			// 		$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
			// 	else
			// 	$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
			// }
				
			// $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
			alert(e.payload.message);
			// $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
		break;
		
		case 'error':
			// $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
			// console.log('ERROR -> MSG:' + e.msg);
		break;
		
		default:
			// $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
			// console.log('EVENT -> ');
		break;
	}
}
						
function successHandler (result) {
	//alert('reg success'+result);
	// $("#app-status-ul").append('<li>success:'+ result +'</li>');
}
			
function errorHandler (error) {
	// console.log('reg error '+error);
	// $("#app-status-ul").append('<li>error:'+ error +'</li>');
}
			
document.addEventListener('deviceready', onDeviceReady, true);


function sendLogRequest()
{
	var usr = document.getElementById('user').value;
	var pasw = document.getElementById('psw').value;
	var autU = "http://seapass.it/core/app/login.php?callback=?&user="+usr+"&passw="+pasw;
	var dataU = "http://seapass.it/core/retrieve_json_user.php?callback=?&id=";

	if( usr != "" && pasw != "")
	{
		$.ajax({
			type: "GET",
			url: autU,
			dataType: 'jsonp',
			success: function(data)
			{
				//logC.innerHTML=JSON.stringify(data)+'<br/>';
				
				console.log(data);
				if(data.state==200)
				{
					var brige = window.localStorage;
					brige.setItem("id", data.id);
					brige.setItem("tipo", data.tipo);
					brige.setItem("token", data.token);
					
					dataU += brige.getItem("id")+"&code=UkVUUklFVkVfVEhFX1VTRVJfSU5GT19QTEVBU0U=";
					$.ajax({
						type: "GET",
						url: dataU,
						dataType: 'jsonp',
						success: function(UD)
						{
							if(UD.status==200)
							{
								//logC.innerHTML=JSON.stringify(UD)+'<br/>';
								db.transaction(function(tx) {
									tx.executeSql('DELETE FROM utente');
									tx.executeSql(UD.query);

									switch ( window.localStorage.getItem("lang") )
									{
										case 'it':
											alert('Accesso effettuato con successo');
										break;

										case 'en':
											alert('Successfully logged in');
										break;
									}
									
									location.href="index.html";
								});
							}
						},
						error: function()
						{
							switch ( window.localStorage.getItem("lang") )
							{
								case 'it':
									showError('Impossibile recuperare dati utente');
								break;

								case 'en':
									showError('Unable to retrieve user data');
								break;
							}

							
						}
					});
				}
				else
				{
					switch ( window.localStorage.getItem("lang") )
					{
						case 'it':
							showError('Dati di accesso errati');
						break;

						case 'en':
							showError('Username or Password are not correct');
						break;
					}
				}
			},
			error: function(err)
			{
				switch ( window.localStorage.getItem("lang") )
				{
					case 'it':
						showError('Impossibile contattare il server');
					break;

					case 'en':
						showError('Unable to contact the server');
					break;
				}
				
			}
		});
	}
	else
	{
		switch ( window.localStorage.getItem("lang") )
		{
			case 'it':
				showError('Riempire tutti i campi');
			break;

			case 'en':
				showError('All fields are required');
			break;
		}
	}

	return false;
}

function lOut()
{
	var brige = window.localStorage;
	brige.removeItem("id");
	brige.removeItem("tipo");
	brige.removeItem("token");
	
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM utente');

		switch ( window.localStorage.getItem("lang") )
		{
			case 'it':
				alert('Logout eseguito con successo');
			break;

			case 'en':
				alert('Successfully logged out');
			break;
		}
		
	});
}

function cb(data)
{
}


var PushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

	cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
};
 
 
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}

