





/*

Toevoegen onder <container>
<header>
<a href="Calendar.html"><img src="style/vorige.png" alt="Vorige" /> </a>
<a href="Calendar.html"><img src="style/left.png" alt="terug" /> </a>
<a href="Calendar.html"><img src="style/vandaag.png" alt="Vandaag" />Vandaag</a>
<a href="Calendar.html"><img src="style/right.png" alt="verder" /> </a>
<a href="Calendar.html"><img src="style/volgende.png" alt="Volgende" /> </a>
</header>

toevoegen aan main:
style="padding-top: 55px;"

*/
	

	



















	var build = "prod";
	
	if(build == "prod"){
		var get_host = function() { return "/android_asset/www/"; };
		var currentDir = "/android_asset/www/";
	}else
	{
		var get_host = function() { return "/data/data/com.test/hydra_app/"; };
		var currentDir = "/data/data/com.test/hydra_app/";
	}
	sessionStorage.setItem("playing", "nee");
	sessionStorage.setItem("oneTime", 1);

	
	
	
// kalender

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var maand = " - "+mm;
	var gevraagd = today;

	
	
	function txtMaand(tekst){
		if (tekst==1){
		return "Jannewarie";
		}else if (tekst==2){
		return "Febrewarie";
		}else{
		return " - "+tekst;
		}
	}


// http://stream.vastenavendfm.nl:1111

	document.addEventListener("deviceready", onDeviceReady, false);
	
	
	function onMenuKeyDown(e){
	//geleend uit mobile.js
		if($(this).hasClass('extern')) return true;
		e.preventDefault();
		$('body').prepend('<indicator></indicator>');
		post_option = {ajax: 1, device: typeof device != 'undefined' ? device.platform : 'browser', unique: Math.round((new Date()).getTime() / 1000)};
		// load page
		$.post(get_host()+"Menu.html", post_option, function(data){
			$('body').html(data);
			initializeInteraction();
		});
	}
	
	
    // Cordova is ready    //		
	    function onDeviceReady() {
		document.addEventListener("menubutton", onMenuKeyDown, false);
			$('#radio').click(function() {
		
				onMusicLoad();
			});

			
			$('#dagterug').live('touchstart', function() {
				kalenderBack(1);
			});
			
			$('#weekterug').live('touchstart', function() {
				kalenderBack(7);
			});
			
			$('#dagvooruit').live('touchstart', function() {
				kalenderNext(1);
			});
			
			$('#weekvooruit').live('touchstart', function() {
				kalenderNext(7);
			});
			
			
		var deviceVersion = device.version;
		//alert(deviceVersion);
		sessionStorage.setItem("deviceVersion", deviceVersion);
		
		// Alles klaar. Verberg splashscreen.
		fillCalendar();
		navigator.splashscreen.hide();
		}
		
   function onSuccess() {            
		my_media.stop();
		my_media.release();
	}
   function onSuccessTuning() {            
	tuningSound.release();
	}        	
   function onError() {            

	}
   function onStatus(s) {            
	var vastenavendStream = JSON.stringify(s);
		if (vastenavendStream == 1 || vastenavendStream == 2 || vastenavendStream == 3)
		{
		sessionStorage.setItem("vastenavendStream", vastenavendStream);
		$('#radio').attr('src','style/radio_aan.png');
		}
		else
		{
		$('#radio').attr('src','style/radio_uit.png');
		}
	}
		function loadnews() { 
			   var iabRef = null;

				function iabLoadStart(event) {
					sessionStorage.setItem("iabURL", event.url);
				}

				function iabLoadStop(event) {
		
				}

				function iabClose(event) {
					 iabRef.removeEventListener('loadstart', iabLoadStart);
					 iabRef.removeEventListener('loadstop', iabLoadStop);
					 iabRef.removeEventListener('exit', iabClose);					
					 
					 if (sessionStorage.getItem("iabURL") != "http://www.vastenavend.nl/mobi/content/nieuws/nieuws.php") {
							iabRef = window.open('http://www.vastenavend.nl/mobi/content/nieuws/nieuws.php', '_blank', 'location=no');
						    iabRef.addEventListener('loadstart', iabLoadStart);
						   iabRef.addEventListener('loadstop', iabLoadStop);
						   iabRef.addEventListener('exit', iabClose);
					}else{
					
					}
					
				}
				var deviceVersion = device.version;
				
				if (deviceVersion.indexOf("2.") !== -1){

				   iabRef = window.open('http://www.vastenavend.nl/mobi/content/nieuws/nieuws.php', '_blank', 'location=no');
				   iabRef.addEventListener('loadstart', iabLoadStart);
				   iabRef.addEventListener('loadstop', iabLoadStop);
				   iabRef.addEventListener('exit', iabClose);
				document.getElementById('loading').style.display='none'; 
				
				}else{
				
				$('#nuuws').attr('src','http://www.vastenavend.nl/mobi/content/nieuws/nieuws.php');
			
				}
								
		}	

			function timeout_trigger() {
				sessionStorage.setItem("oneTime", 1);   
			}


		function onMusicLoad() {
				
			
			// oneTime is een Android 4.1 of hoger fix
			
			if (sessionStorage.getItem("oneTime") == 1){
				sessionStorage.setItem("oneTime", 0);
				setTimeout('timeout_trigger()', 1000);
	
				var playing = sessionStorage.getItem("playing");				
				if (playing == "nee") {

						sessionStorage.setItem("playing", "ja");
						var tuningfilename = "tuning.mp3";
						var tuningpath = currentDir.concat(tuningfilename); 
						tuningSound = new Media(tuningpath, onSuccessTuning);
						tuningSound.play(); 
						my_media = new Media("http://stream.vastenavendfm.nl:1111", onSuccess, onError, onStatus);
						my_media.play();
					
					
				} else if (playing == "ja"){

					sessionStorage.setItem("playing", "nee");
					$('#radio').attr('src','style/radio_uit.png');
					tuningSound.stop(); 
					tuningSound.release(); 
					my_media.stop();
					my_media.release();
					my_media = null;		
				}
			}
		}
		
		function checkPlaying(){
				if (sessionStorage.getItem("playing") == "ja") {
					$('#radio').attr('src','style/radio_aan.png');
				}
			}
			
		function showAlert(message){
			alert(message);		
		}
		
		
		
		function fillCalendar(){
		
			sessionStorage.setItem("26-1", "<b>Vastenavendrevu Merakels!</b><br /><i><b>13:30</b> - De Stoelemat</i><br />De Vastenavendrevu van 2013 is Merakels! Kaarte kende vanaf 3 jannewarie kope voor 15 euro bij R&#242;&#242;ksjop De Schelde, Bruna Zonneplein, MCD Blommedaal, Tabakstoor Altere n&#39;en de Berregse Dump&#39;al. <br /><br />Meer infermasie kende vinde n&#39;op www.leutopdeplanke.nl<br /><br /><hr><b>Vastenavendkesert.</b><br /><i><b>20:11</b> - De Stoelemat</i><br />Vanaf di jaar organiseert erremenie de Sjefkes nou zellef &#39;t Vastenavendkesert. Da kesert wor voor de 12e keer g&#39;ouwe. D&#39;opbrengst kom &#242;&#242;fdzakeluk ten goede n&#39;aan Stichting CliniClowns Nederland.<br /><br /><hr><b>Foute Avend.</b><br /><i><b>21:00</b> - F&#233;&#233;sttent neffe Krijne</i><br />De foute n&#39;avend van dweilbend &#39;t Laffeseeke. <br />De gast is Miss Edith.<br /><br /><hr><b>Dubbelstrietpereet.</b><br /><i><b>21:30</b> - De Kaai, Stadsschuur, Mortier en Krijne</i><br />Ok di jaar is t&#39;r weer een Dubbelstrietpereet in de Stadsschuur in samewerking m&#232; kefee Jan Krijne, kefee de Mortier n&#39;en kefee de Kaai. <br />Een sjurie zal d&#39;optrejes van de bendjes beoordele n&#39;op d&#39;r muzikale optreje m&#232; voorkeur mee &#39;n &#232;kt. De winnaar van de Dubbelstrietpereet kregt de Tante Door Trefee.<br /><br />");
			sessionStorage.setItem("27-1", "<b>Optocht compensatiebal.</b><br /><i><b>14:00</b> - Leuttempel Die Twee</i><br />&#39;t Optocht compensatiebal van Leuttempel Die Twee <br />d&#39;Optocht kom nie meer lengst keffee Die Twee en d&#232;&#232;rom is t&#39;r di bal. Kom oew steun betuige. <br />Dweilbend La Mar L&#242;pe zurregt voor de meziek en Ko van de Ketterij et d&#39;n gastoptreje.<br /><br /><hr><b>Jubeleejemf&#233;&#233;st &#39;t Laffeseeke.</b><br /><i><b>14:30</b> - F&#233;&#233;sttent neffe Krijne</i><br />Jubeleejemf&#233;&#233;st van dweilbend &#39;t Laffeseeke. De dweilbend besta 33 jaar. Iedereen is welkom.<br /><br /><hr><b>Donneteursbal van Dweilbend de N&#39;ond van Ellewie.</b><br /><i><b>14:33</b> - &#39;t Slikpeleis</i><br />Donneteursbal van Dweilbend de N&#39;ond van Ellewie<br />Gouwe Ouwe.<br /><br /><hr><b>De Vastenavendtent&#243;&#243;nstelling.</b><br /><i><b>15:00</b> - Atelier Sint Sebastiaan Steenbergsestraat 25</i><br />D&#233; Vastenavendtent&#243;&#243;nstelling van ateljee Sint Sebastiaan. M&#232; bel&#232;g! <br />d&#39;offisjeele n&#39;opening is op zondag 27 febrewarie om 14:00 uur deur Kees Theunisse en de meziek is van &#39;t Stadslijntje. <br/>De tentoonstelling is van 27 jannewarie tottemet 17 febrewarie.<br /><br /><hr><b>Toeteroet Experience.</b><br /><i><b>15:00</b> - Gr&#242;&#242;t Arsenaal</i><br />Dweilorkest Toeteroet mette Experience. Nou ge mot komme n&#39;or omdaddut &#39;n &#233;le belevenis ga zijn die ge nie gauw meer zal vergete. &#39;t Is voor niks en arstikke grates, mar agge &#39;t leuteg vindt kende een Leutneutbonneke donere. Da d&#39;ellept. <br />De Toeteroet Experience is van 15.00 tot 18.00 ure.<br /><br /><hr><b>Leut, Br&#242;&#242;d en Winterspeule.</b><br /><i><b>15:11</b> - Kefee Gin Flauw Idee</i><br />Donneteursbal van Dweilbend Wadoeterop?! <br />Dweilbend Wadoeterop?! organiseert Leut, Br&#242;&#242;d en Winterspeule<br /><br /><hr><b>D&#39;r is gin bal aan! (bal).</b><br /><i><b>15:11</b> - Balletent Friends</i><br />D&#39;r is gin bal aan! (bal) van dweilbend Vrouwekul<br /><br /><hr><b>Top of de Kaai.</b><br /><i><b>15:33</b> - &#39;t Dobbertje</i><br />Dweilbendkompetisie Top op de Kaai.<br /><br /><hr><b>Kriebel Krabbe Krulle 2013: &#39;De Geit is Los&#39;.</b><br /><i><b>16:11</b> - De Stoelemat</i><br />Ok di jaar kenne alle Kreukeltjes en Krabbe weer komme kijke naar Kriebel Krabbe Krulle in &#39;t Leutpeleis de Stoelemat. Gin 3 keer zoas d&#39;andere jare, maar twee keer. t&#39;Eerste wiekent sta g&#39;&#233;&#233;l in &#39;t teke van &#39;t Nuskesbal.<br /><br /><hr><b>Afscheidsresepsie Han Polman.</b><br /><i><b>21:00</b> - Keffee De Mortier</i><br />Afscheidsresepsie Han Polman deur dweilbend Un &#39;Opke Leut. <br />Leut en Gein<br /><br />");
			sessionStorage.setItem("1-2", "<b>Ekspesisie Tent&#242;&#242;ngespreid!</b><br /><i><b>19:00</b> - Teejater de Maagd</i><br />Ekspesisie Tent&#242;&#242;ngespreid! Een ekspesisie van d&#39;ontwerrepe van diverse bouwclubs uit &#39;t Krabbegat en de randgem&#233;&#233;nte. Te bezichtege n&#39;in de Kapitelezaal van teejater de Maagd. Teves zijn d&#39;ontwerrepe n&#39;onderd&#233;&#233;l van de Vastenavendwandeling van SBM (Stichting Bezichteging Monemente)<br /><br />Tijd van 19:00 tot 21.30 ure.<br /><br /><hr><b>Bal Nostalgie la legende.</b><br /><i><b>21:00</b> - keffee de Ponderosa</i><br />Bal Nostalgie la legende.<br /><br /><hr><b>Vastenavendveiling.</b><br /><i><b>21:00</b> - Keffee &#39;t Slik</i><br />De Vastenavendveiling van bouwclub Agge Mar Leut Et. <br />Een veiling mee ouwe Vastenavendkrante, oude Veldtekes, Schilderije enz. Feiteluk alles wa mette Vastenavend te make n&#39;et. <br /><br /><hr><b>Dweilmeziek ontmoet...VII.</b><br /><i><b>21:30</b> - Keffee de Mortier</i><br />Dweilmeziek ontmoet...VII m&#232; Dweilbend Krabbestamp <br />Majstro gezocht. Wie wor onze leutegste dirigent.<br /><br />");
			sessionStorage.setItem("2-2", "<b>Tusse de Schuifdeure.</b><br /><i><b>14:00</b> - De Stoelemat</i><br />Tusse de Schuifdeure, een Vastenavendteejater van leut, nostalgie en muzikale verrassinge. <br /><br />De zaal ga d&#39;ope n&#39;om 13:00 uur. Na t&#39;einde n&#39;om 16:30 uur is t&#39;r tredisiegetrouw aansluitend &#39;t Shuifdeurebal in de foj&#233;&#233; van de Stoelmat tot 19:00 uur. <br /><br />Kaarte &#224; €6 zijn verkrijgbaar bij R&#242;&#242;ksjop De Schelde, MCD Bloemendaal n&#39;en Primera Zonneplein.<br /><br /><hr><b>Ope n&#39;avend van CV &#39;t Vagevuur.</b><br /><i><b>20:00</b> - Canadaweg 34a in Altere</i><br />Ope n&#39;avend van CV &#39;t Vagevuur.<br /><br /><hr><b>Meziekaal defilee van Steketee.</b><br /><i><b>21:00</b> - &#39;t Beurspleintje</i><br />Dweilbend Ge Wit Ut Mar Nooit, de dweilbend die Steketee meziekaal begeleidt deur d&#39;n n&#39;Intocht en d&#39;n n&#39;Optocht, zal een defilee organisere ter ere van ellef jaar Wally. Ge zou &#39;t bekant vergete, mar t&#39;is awweer ellef jaar geleeje da d &#39;in 2003 Wally de sabel overnam van Jan Slokkers. <br /><br />Ieder&#233;&#233;n is uitgen&#242;&#242;degd om 21:00 ure n&#39;op &#39;t Beurspleintje. D&#39;r komme &#39;n &#242;&#242;p dweilbendjes. Wa dogte van T&#39;is Wezeluk Waar, Nie te vermei(d)e, La Belle Jans, Leutig Spul, Allaremfase 11, Das Effe Slikke n&#39;en MISSkend Telent. <br />&#39;t Beursplein wor arstikke mooi uitgelicht en me n&#39;ebbe ok g&#39;oord dasse iets gaan ont&#39;ulle. Nou agge nou nie benuuwd ben geworre...<br /><br />");
			sessionStorage.setItem("3-2", "<b>&#39;L Aanesrat presenteert &#39;Toverdrankconcert&#39;.</b><br /><i><b>12:00</b> - Keffee Krijne</i><br />&#39;t Arsenaal m&#232; d&#39;t Toverdrankconcert. Lekker belangrijk <br />Meziek van Duo &#39;L Aanesrat, Das ok wa, De Naoweeen.<br /><br /><hr><b>Ekspesisie Tent&#242;&#242;ngespreid!</b><br /><i><b>13:30</b> - Teejater de Maagd</i><br />Ekspesisie Tent&#242;&#242;ngespreid! Een ekspesisie van d&#39;ontwerrepe van diverse bouwclubs uit &#39;t Krabbegat en de randgem&#233;&#233;nte. Te bezichtege n&#39;in de Kapitelezaal van teejater de Maagd. Teves zijn d&#39;ontwerrepe n&#39;onderd&#233;&#233;l van de Vastenavendwandeling van SBM (Stichting Bezichteging Monemente)<br /><br />Tijd van 13:30 tot 17.00 ure.<br /><br /><hr><b>Leut, Br&#242;&#242;d en.....Wagerenne!</b><br /><i><b>14:02</b> - Rommetom &#39;t Forum van de Gr&#242;&#242;te Mart</i><br />W&#233;&#233;rgal&#242;&#242;s wervelende wedrenne op &#39;t scherrep van de snee en onder Keyzerlek toezicht. <br />Spektakel! Spierkracht! Sensatie en Snel&#39;eid onder &#39;t Remeinse motto: TIS M&#201;&#201;NUS EST!<br /><br /><hr><b>AKSIE! Kamera lopt, de lampe n&#39;aan!</b><br /><i><b>14:33</b> - &#39;t Zwijns&#39;&#242;&#242;fd</i><br />Donneteursf&#233;&#233;st Wa Motter D&#39;r Mee. <br />Komme gullie ok naar d&#39;uitreiking van de MIE D&#39;N OSCARS?<br /><br /><hr><b>Kookclub Neut, Br&#242;&#242;d &amp; Peule.</b><br /><i><b>15:00</b> - Keffee De Saeck</i><br />&#39;t Donneteursbal van dweilbend Slapg&#39;ouwoer. Kookclub Neut, Br&#242;&#242;d &amp; Peule. Kookf&#233;&#233;st<br /><br /><hr><b>Toeteroet Experience.</b><br /><i><b>15:00</b> - Gr&#242;&#242;t Arsenaal</i><br />Dweilorkest Toeteroet mette Experience. Nou ge mot komme n&#39;or omdaddut &#39;n &#233;le belevenis ga zijn die ge nie gauw meer zal vergete. &#39;t Is voor niks en arstikke grates, mar agge &#39;t leuteg vindt kende een Leutneutbonneke donere. Da d&#39;ellept. <br />De Toeteroet Experience is van 15.00 tot 18.00 ure.<br /><br /><hr><b>Donneteursbal Elluf.com.</b><br /><i><b>15:11</b> - &#39;t Slik</i><br />&#39;t donneteursbal van Elluf.com m&#232; d&#39;t motto: Vrienden van Elluf Live!<br /><br /><hr><b>Kriebel Krabbe Krulle 2013: &#39;De Geit is Los&#39;.</b><br /><i><b>16:11</b> - De Stoelemat</i><br />Ok di jaar kenne alle Kreukeltjes en Krabbe weer komme kijke naar Kriebel Krabbe Krulle in &#39;t Leutpeleis de Stoelemat. Gin 3 keer zoas d&#39;andere jare, maar twee keer. t&#39;Eerste wiekent sta g&#39;&#233;&#233;l in &#39;t teke van &#39;t Nuskesbal.<br /><br />");
			sessionStorage.setItem("4-2", "<b>Bosstraatbal</b><br /><i><b>21:00</b> - Tapperij de Kr&#242;&#242;n.</i><br />&#39;t Bosstraatbal bij Tapperij de Kr&#242;&#242;n. D&#39;r wor gezocht naar gladiatore die d&#39;arena wulle betreeje as stikg&#232;ve dweil. D&#39;r wor gezurregd voor leutege prijze<br /><br />");
			sessionStorage.setItem("6-2", "<b>Wagetjes kijke.</b><br /><i><b>13:00</b> - &#39;t Konterscherp en De Stadsschuur</i><br />Kijke n&#39;op &#39;t Konterscherp en in de Stadsschuur naar de bouwsels van de Berregse bouwers. &#39;s Middags vanaf 13:00 uur zijn de kinders en de wa d&#39;ouwere Bergen&#232;&#232;re van arte welkom. s&#39;Aves ken ieder&#233;&#233;n &#39;n bezoek brenge n&#39;aan de bouwkote.<br /><br /><hr><b>Ekspesisie Tent&#242;&#242;ngespreid!.</b><br /><i><b>13:30</b> - Teejater de Maagd</i><br />Ekspesisie Tent&#242;&#242;ngespreid! Een ekspesisie van d&#39;ontwerrepe van diverse bouwclubs uit &#39;t Krabbegat en de randgem&#233;&#233;nte. Te bezichtege n&#39;in de Kapitelezaal van teejater de Maagd. Teves zijn d&#39;ontwerrepe n&#39;onderd&#233;&#233;l van de Vastenavendwandeling van SBM (Stichting Bezichteging Monemente)<br /><br />Tijd van 13:30 tot 17.00 ure.<br /><br />");
			sessionStorage.setItem("9-2", "<b>De n&#39;Intocht.</b><br /><i><b>14:22</b> - &#39;t Krabbegat</i><br />Gr&#242;&#242;tse n&#39;intocht van onze n&#39;&#210;&#242;g&#39;eid Nilles III; om 14:22 uur kom de Prins same m&#232; de Nar m&#232; de Blauwe Schuit aan in de stesjonsstraat. D&#232;&#232;rnaar stap de n&#39;&#210;&#242;g&#39;eid Nilles III in z&#39;n nuuwe gerijke en ga naar de Gr&#242;&#242;te Mart voor d&#39;overdracht van de stadssleutel en d&#39;Ellef Geb&#242;&#242;je van n&#39;onze Gr&#242;&#242;tste Boer.<br /><br />");
			sessionStorage.setItem("10-2", "<b>Vastenavendviering.</b><br /><i><b>12:00</b> - Gertrudiskerk</i><br />Vastenavendviering in de Gertrudiskerk. Koor onder leiding van Marielle Tempelaars. <br />Meezinge in &#39;t koor? meel naar janetta.van.beek@home.nl <br />D&#39;r zijn 3 rippetisies voor &#39;t koor. zondag 20 en 27 jannewarie en 3 febrewarie vanaf 12:00 uur.<br /><br /><hr><b>Ekspesisie Tent&#242;&#242;ngespreid!</b><br /><i><b>13:30</b> - Teejater de Maagd</i><br />Ekspesisie Tent&#242;&#242;ngespreid! Een ekspesisie van d&#39;ontwerrepe van diverse bouwclubs uit &#39;t Krabbegat en de randgem&#233;&#233;nte. Te bezichtege n&#39;in de Kapitelezaal van teejater de Maagd. Teves zijn d&#39;ontwerrepe n&#39;onderd&#233;&#233;l van de Vastenavendwandeling van SBM (Stichting Bezichteging Monemente)<br /><br />Tijd van 13:30 tot 17.00 ure.<br /><br /><hr><b>&#39;t Dweilbendfestival.</b><br /><i><b>14:30</b> - De Stoelemat</i><br />All&#233;&#233;neg tijdes &#39;t Dweilbendfestival ziede en &#242;&#242;rde zo veul Berregse dweilbendjes. De zaal ga d&#39;ope om 14:00 uur. Tege n&#39;allef acht s&#39;aves is de apotheose op de Gr&#242;&#242;te Mart.<br /><br />");
			sessionStorage.setItem("11-2", "<b>De Kindervastenavend.</b><br /><i><b>14:22</b> - De Gr&#242;&#242;te Mart</i><br />De Kindervastenavend op 't bordes van 't Stad'uis en naar aflòòp dweile mè de n'Òòg'eid Nilles III, de Gròòtste Boer, de Nar of Steketee en bij de Geit van Mie d'n Os de Zeuvesprong zinge n'en danse. <br /><br />Verzoek van Stichting Vastenavend: Nim gin trapkes of ver'oginge mee naar de Kindervastenavend, zo ken ieleke Krab en Kreukel de Kindervastenavend in z'n ge'éél zien.<br /><br /><hr><b>&#39;t Z.O.O.I. bij de Moor.</b><br /><i><b>21:30</b> - De Gr&#242;&#242;te Mart</i><br />&#39;t Z.O.O.I kom speule bij de Moor. Ge ken geniete van 3 sessies.<br /><br />");
			sessionStorage.setItem("12-2", "<b>De n&#39;Optocht.</b><br /><i><b>13:00</b> - De Gr&#242;&#242;te Mart</i><br />Gr&#242;&#242;tse n&#39;optocht deur de strate van ons Krabbegat. Om 13:00 uur begin de reklamestoet te trekke, de n&#39;optocht start om 13:30 uur. <br /><br />Oproep van de d&#233;&#233;lnemers en bouwers: Nim gin spuitserrepetine mee, mar gebruk gew&#242;&#242;n ouwerwetse pepiere serrepetine. Da leste gif namelek gin schade n&#39;aan de wages en uitdossing van de d&#233;&#233;lnemers!<br /><br />");
			sessionStorage.setItem("17-2", "<b>Kijkdag op de Kaai.</b><br /><i><b>10:00</b> - De Kaai of te wel de Gedempte Ave</i><br />Nog ene keer kende n&#39;op deze zondag de wages en groepe bekijke, die ebbe meegedaan aan de n&#39;optocht. Ok ister netuurlek de mogelek&#39;eid om oew leste bonne n&#39;op te make in de verschillende kefees.<br /><br /><hr><b>Ekspesisie Tent&#242;&#242;ngespreid!</b><br /><i><b>10:00</b> - Teejater de Maagd</i><br />Ekspesisie Tent&#242;&#242;ngespreid! Een ekspesisie van d&#39;ontwerrepe van diverse bouwclubs uit &#39;t Krabbegat en de randgem&#233;&#233;nte. Te bezichtege n&#39;in de Kapitelezaal van teejater de Maagd. Teves zijn d&#39;ontwerrepe n&#39;onderd&#233;&#233;l van de Vastenavendwandeling van SBM (Stichting Bezichteging Monemente)<br /><br />Tijd van 10:00 tot 17.00 ure.<br /><br />");
		}

		function kalender(e){
		
			gevraagd = new Date();
		
			$('#datum').html("<b>"+dd+" "+txtMaand(mm)+"</b>");
			if(!sessionStorage.getItem(dd+"-"+mm))
			{
				$('#info').html("Zet VastenavendFM mar op en mak tuis &#39;n feestje, want t&#39;r is niks te doen in de stad.");
			}else{
			
				$('#info').html(sessionStorage.getItem(dd+"-"+mm));
			}
			setTimeout(function () { scrollContent.refresh(); }, 0);
			$('#loading').hide();
			
			delete dagen;
		}
		
		function kalenderNext(dagen){
			
			gevraagd.setDate(gevraagd.getDate()+dagen);
			kalenderInfo();
		}
		
		function kalenderBack(dagen){
			
			gevraagd.setDate(gevraagd.getDate()-dagen);
			kalenderInfo();
		}
		
		
		function kalenderInfo(){
			var dagnummer = gevraagd.getDate();
			var maandnummer = gevraagd.getMonth()+1; //January is 0!
			var jaarnummer = gevraagd.getFullYear();
			
			
			$('#datum').html("<b>"+dagnummer+" "+txtMaand(maandnummer)+"</b>");

			if(!sessionStorage.getItem(dagnummer+"-"+maandnummer))
			{
				$('#info').html("Zet VastenavendFM mar op en mak tuis &#39;n feestje, want t&#39;r is niks te doen in de stad.");
			}else{
			
				$('#info').html(sessionStorage.getItem(dagnummer+"-"+maandnummer));
			}
			setTimeout(function () { scrollContent.refresh(); }, 0);
			scrollContent.scrollTo(0, 1, 0);
			$('#loading').hide();
		}
		
	

/*
jquery.animate-enhanced plugin v0.99
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(c,I,J){function O(a,b,c,f,l,k,h,p,q){var t=!1,h=!0===h&&!0===p,b=b||{};b.original||(b.original={},t=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var p=b.meta,m=b.original,g=b.properties,P=b.secondary,B=r.length-1;0<=B;B--){var D=r[B]+"transition-property",E=r[B]+"transition-duration",i=r[B]+"transition-timing-function",c=h?r[B]+"transform":c;t&&(m[D]=a.css(D)||"",m[E]=a.css(E)||"",m[i]=a.css(i)||"");P[c]=h?(!0===q||!0===y&&!1!==q)&&K?"translate3d("+p.left+"px, "+p.top+
"px, 0)":"translate("+p.left+"px,"+p.top+"px)":k;g[D]=(g[D]?g[D]+",":"")+c;g[E]=(g[E]?g[E]+",":"")+f+"ms";g[i]=(g[i]?g[i]+",":"")+l}return b}function z(a){for(var c in a)return!1;return!0}function G(a){return parseFloat(a.replace(a.match(/\D+$/),""))}function L(a){var c=!0;a.each(function(a,f){return c=c&&f.ownerDocument});return c}var Q="top right bottom left opacity height width".split(" "),H=["top","right","bottom","left"],r=["-webkit-","-moz-","-o-",""],R=["avoidTransforms","useTranslate3d","leaveTransforms"],
S=/^([+-]=)?([\d+-.]+)(.*)$/,T=/([A-Z])/g,U={secondary:{},meta:{top:0,right:0,bottom:0,left:0}},M=null,F=!1,A=(document.body||document.documentElement).style,N=void 0!==A.WebkitTransition||void 0!==A.MozTransition||void 0!==A.OTransition||void 0!==A.transition,K="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,y=K;c.expr&&c.expr.filters&&(M=c.expr.filters.animated,c.expr.filters.animated=function(a){return c(a).data("events")&&c(a).data("events")["webkitTransitionEnd oTransitionEnd transitionend"]?
!0:M.call(this,a)});c.extend({toggle3DByDefault:function(){return y=!y},toggleDisabledByDefault:function(){return F=!F}});c.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),c={x:0,y:0};if(a)for(var n=r.length-1;0<=n;n--){var f=a.getPropertyValue(r[n]+"transform");if(f&&/matrix/i.test(f)){a=f.replace(/^matrix\(/i,"").split(/, |\)$/g);c={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return c};c.fn.animate=function(a,b,n,f){var a=a||{},l=!("undefined"!==
typeof a.bottom||"undefined"!==typeof a.right),k=c.speed(b,n,f),h=this,p=0,q=function(){p--;0===p&&"function"===typeof k.complete&&k.complete.apply(h,arguments)},t;if(!(t=!0===("undefined"!==typeof a.avoidCSSTransitions?a.avoidCSSTransitions:F)))if(!(t=!N))if(!(t=z(a))){var m;a:{for(m in a)if(("width"==m||"height"==m)&&("show"==a[m]||"hide"==a[m]||"toggle"==a[m])){m=!0;break a}m=!1}t=m||0>=k.duration||!0===c.fn.animate.defaults.avoidTransforms&&!1!==a.avoidTransforms}return t?I.apply(this,arguments):
this[!0===k.queue?"queue":"each"](function(){var g=c(this),b=c.extend({},k),h=function(b){var f=g.data("jQe")||{original:{}},e={};if(2==b.eventPhase){if(!0!==a.leaveTransforms){for(b=r.length-1;0<=b;b--)e[r[b]+"transform"]="";if(l&&"undefined"!==typeof f.meta)for(var b=0,d;d=H[b];++b)e[d]=f.meta[d+"_o"]+"px",c(this).css(d,e[d])}g.unbind("webkitTransitionEnd oTransitionEnd transitionend").css(f.original).css(e).data("jQe",null);"hide"===a.opacity&&g.css({display:"none",opacity:""});q.call(this)}},
f={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",
easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",
easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},m={},f=f[b.easing||"swing"]?f[b.easing||"swing"]:b.easing||"swing",i;for(i in a)if(-1===c.inArray(i,R)){var n=-1<c.inArray(i,H),j;var d=g,w=a[i],u=i,s=n&&!0!==
a.avoidTransforms;if("d"==u)j=void 0;else if(L(d)){var e=S.exec(w);j="auto"===d.css(u)?0:d.css(u);j="string"==typeof j?G(j):j;"string"==typeof w&&G(w);var s=!0===s?0:j,t=d.is(":hidden"),v=d.translation();"left"==u&&(s=parseInt(j,10)+v.x);"right"==u&&(s=parseInt(j,10)+v.x);"top"==u&&(s=parseInt(j,10)+v.y);"bottom"==u&&(s=parseInt(j,10)+v.y);!e&&"show"==w?(s=1,t&&d.css({display:"LI"==d.context.tagName?"list-item":"block",opacity:0})):!e&&"hide"==w&&(s=0);e?(d=parseFloat(e[2]),e[1]&&(d=("-="===e[1]?
-1:1)*d+parseInt(s,10)),j=d):j=s}else j=void 0;if(e=!0!==a.avoidTransforms)if(e=i,d=j,w=g,L(w)){u=-1<c.inArray(e,Q);if(("width"==e||"height"==e||"opacity"==e)&&parseFloat(d)===parseFloat(w.css(e)))u=!1;e=u}else e=!1;if(e){e=g;d=i;w=b.duration;u=f;j=n&&!0===a.avoidTransforms?j+"px":j;var n=n&&!0!==a.avoidTransforms,s=l,t=!0===a.useTranslate3d,v=(v=e.data("jQe"))&&!z(v)?v:c.extend(!0,{},U),x=j;if(-1<c.inArray(d,H)){var C=v.meta,A=G(e.css(d))||0,y=d+"_o",x=j-A;C[d]=x;C[y]="auto"==e.css(d)?0+x:A+x||0;
v.meta=C;s&&0===x&&(x=0-C[y],C[d]=x,C[y]=0)}e.data("jQe",O(e,v,d,w,u,x,n,s,t))}else m[i]=a[i]}g.unbind("webkitTransitionEnd oTransitionEnd transitionend");if((i=g.data("jQe"))&&!z(i)&&!z(i.secondary)){p++;g.css(i.properties);var F=i.secondary;setTimeout(function(){g.bind("webkitTransitionEnd oTransitionEnd transitionend",h).css(F)})}else b.queue=!1;z(m)||(p++,I.apply(g,[m,{duration:b.duration,easing:c.easing[b.easing]?b.easing:c.easing.swing?"swing":"linear",complete:q,queue:b.queue}]));return!0})};
c.fn.animate.defaults={};c.fn.stop=function(a,b,n){if(!N)return J.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var f=c(this),l=f.data("jQe");if(l&&!z(l)){var k,h={};if(b){if(h=l.secondary,!n&&void 0!==typeof l.meta.left_o||void 0!==typeof l.meta.top_o){h.left=void 0!==typeof l.meta.left_o?l.meta.left_o:"auto";h.top=void 0!==typeof l.meta.top_o?l.meta.top_o:"auto";for(k=r.length-1;0<=k;k--)h[r[k]+"transform"]=""}}else if(!z(l.secondary)){var p=window.getComputedStyle(f[0],null);if(p)for(var q in l.secondary)if(l.secondary.hasOwnProperty(q)&&
(q=q.replace(T,"-$1").toLowerCase(),h[q]=p.getPropertyValue(q),!n&&/matrix/i.test(h[q]))){k=h[q].replace(/^matrix\(/i,"").split(/, |\)$/g);h.left=parseFloat(k[4])+parseFloat(f.css("left"))+"px"||"auto";h.top=parseFloat(k[5])+parseFloat(f.css("top"))+"px"||"auto";for(k=r.length-1;0<=k;k--)h[r[k]+"transform"]=""}}f.unbind("webkitTransitionEnd oTransitionEnd transitionend");f.css(l.original).css(h).data("jQe",null)}else J.apply(f,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);
