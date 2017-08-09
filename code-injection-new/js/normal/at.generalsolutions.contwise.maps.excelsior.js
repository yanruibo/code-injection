








		function onBootstrapFailed() {
			var el = document.getElementById("loadingScreen");
			el.removeChild(el.firstChild); //remove image
			el.style.color = "white";
			el.style.fontColor = "white";
			
			el.innerHTML = "<h2>Initialisierung der Applikation nicht erfolgreich.</h2>" +
				"<p>Bitte stellen Sie sicher, dass eine Internet-Verbindung besteht und versuchen Sie es erneut.</p>" +
				"<h2>Initialisation failed.</h2>" + 
				"<p>Please check that your device is connected to the internet and try again</p>" +
				"<button onClick='doBootstrap();this.disabled=true;'>Erneut versuchen / Try again</button>";
		};
	
	
		function doBootstrap() {
				var boot = new AppBootstrap("http://mapservices.eu/nefos_app/", nefos.bootstrapApiKey);
				//var boot = new AppBootstrap("http://192.168.0.67:8080/contwise_maps/", nefos.bootstrapApiKey);
				boot.bootstrapApp(function(ok) {
				if (ok) {
					onDeviceReady();
				}
				else {
					boot.downloadAndBootstrap(function(ok, e, msg) {
						if (!ok) {
							onBootstrapFailed();
						}
						else {
							onDeviceReady();
						}
					});
				}
			});
		};
		
		document.addEventListener("deviceready", function() {
			doBootstrap();
		}, false);
	

//Is called automatically on page load
(function() {
    var myGlobals = {
		
		mandatorId: 14,
		apiKey: "alpenwelt",
		masterResourceId: 4105467,
		
		mapZoomLevel: 13,
		mapCenter: new nefos.LatLng(46.617815,10.857519)
	};

    nefos.InitGlobals(myGlobals);
})();

//Is called automatically on page load
//Will hold config for all zillertal pages, f.ex. export_names
(function() {
    var myGlobals = {
    	
    	dataService : {
	    	parallelRequests : true
    	},
    	
    	weatherCodeMapping : {
    		0 : "weather_storm.gif",
    		1 : "weather_storm.gif",
    		2 : "weather_storm.gif",
    		3 : "weather_storm.gif",
    		4 : "weather_storm.gif",
    		5 : "weather_snow_rain.gif",
    		6 : "weather_snow_rain.gif",
    		7 : "weather_snow_rain.gif",
    		8 : "weather_freezing_rain.gif",
    		9 : "weather_showers_scattered.gif",
    		10 : "weather_freezing_rain.gif",
    		11 : "weather_showers.gif",
    		12 : "weather_showers.gif",
    		13 : "weather_snow_scattered.gif",
    		14 : "weather_snow_scattered.gif",
    		15 : "weather_snow_scattered.gif",
    		16 : "weather_snow.gif",
    		17 : "weather_hail.gif",
    		18 : "weather_snow_rain.gif",
    		19 : "weather_few_clouds.gif",
    		20 : "weather_few_clouds.gif",
    		21 : "weather_few_clouds.gif",
    		22 : "weather_few_clouds.gif",
    		23 : "weather_few_clouds.gif",
    		24 : "weather_few_clouds.gif",
    		25 : "weather_few_clouds.gif",
    		26 : "weather_many_clouds.gif",
    		27 : "weather_clouds_night.gif",
    		28 : "weather_clouds.gif",
    		29 : "weather_few_clouds_night.gif",
    		30 : "weather_few_clouds.gif",
    		31 : "weather_clear_night.gif",
    		32 : "weather_clear.gif",
    		33 : "weather_clear_night.gif",
    		34 : "weather_clear.gif",
    		35 : "weather_hail.gif",
    		36 : "weather_clear.gif",
    		37 : "weather_storm.gif",
    		38 : "weather_storm.gif",
    		39 : "weather_storm.gif",
    		40 : "weather_showers_scattered.gif",
    		41 : "weather_snow.gif",
    		42 : "weather_snow_scattered.gif",
    		43 : "weather_snow.gif",
    		44 : "weather_few_clouds.gif",
    		45 : "weather_storm.gif",
    		46 : "weather_snow.gif",
    		47 : "weather_storm.gif"
    	},
    	
    	altitudeProfileOptions : {
            flagPoleColor: "#999999",
            crosshairColor : "#800000",
            crosshairWidth: "2px",
            legendHeight: 1,
            marginWidth: 15
        },
        
        ResourceType : {
            Route : "route",
            Camera : "cam",
            General : "general",
            Ropeway : "ropeway",
            Homepage : "homepage",
            ServiceProvider : "serviceProvider",
            Infrastruktur : "infrastructure",
            Infrastructure: "infrastructure", //ENGLISH NAMES WTF!! [FF]
            Information: "information",
            PublicEvent: "publicEvent",
            Hut: "hut"						//AAAARGH!!!! GROSS UND KLEINSCHREIBUNG EINHEITLICH!!
        },
        
        DifficultyColors : {
        	easy : '#000099',
        	average : '#ff0000',
        	hard : '#000000',
        	winter: '#00ccff',
        	theme: '#ff9900'
        },
                
		mapTypes : {
			satellite : {
				folderName : "nefos_ortho_neu",
				coreBounds : new nefos.LatLngBounds(
		                new nefos.LatLng(
		                        46.933385414813976,
		                        11.6180419921875
		                ),
		                new nefos.LatLng(
		                        47.42158349573474,
		                        12.207183837890625
		                )),
				type : "png.jpg",
				boundsCheck: "intersects",
				attribution : "<div style='float:left'><img src='http://www.mapservices.eu/nefos/static/img/eu_logo.png' style='margin-top:4px;margin-right:4px;opacity:0.8;height:30px'>" +
				"<img src='http://www.mapservices.eu/nefos/static/img/tirolwerbung_logo.png' style='margin-top:4px;opacity:0.8;margin-right:4px;height:30px'>" +
				"<img src='http://www.mapservices.eu/nefos/static/img/land_tirol_logo.png' style='margin-top:4px;opacity:0.8;height:30px'></div>" +
				"<div style='float:right;' class='nefos-clearfix'><b>&copy;&nbsp;<i style='color:red'>tiris</i></b> 2012<br>OpenStreetMap contributors 2012<br>Powered by <a target='_blank' href='http://general-solutions.eu'>Contwise Maps</a></div>",
				attributionPrefix : false
			},
			mobileMapType : {}
		},
		
	    GetObjectType : function(type){
			var oTypeName = type.name;
			
			if(oTypeName=="Wandern" || oTypeName=="Mountainbike" || oTypeName=="Run und Walk" || oTypeName=="Langlauf" || oTypeName=="route"){
				return nefos.Globals.ResourceType.Route;
			}
			else if (oTypeName=="Seilbahn") {
				return nefos.Globals.ResourceType.Ropeway;
			}
			else if (oTypeName=="Information") {
				return nefos.Globals.ResourceType.Information;
			}
			else if (oTypeName=="Öffentlicher Veranstaltungsort") {
				return nefos.Globals.ResourceType.PublicEvent;
			}
			else if (oTypeName=="Hütte") {
				return nefos.Globals.ResourceType.Hut;
			}
			else if(oTypeName=="Livecam"){
				return nefos.Globals.ResourceType.Camera;
			}
			else if(oTypeName=="Homepage"){
				return nefos.Globals.ResourceType.Homepage;
			}
			else if(oTypeName=="ServiceProvider"){
				return nefos.Globals.ResourceType.ServiceProvider;
			}
			else if(oTypeName=="infrastructure"){
				return nefos.Globals.ResourceType.Infrastructure;
			}
			else{
				return nefos.Globals.ResourceType.General;
			}
		},
		
		gdiAttribution : "<div style='float:left'><img src='http://www.mapservices.eu/nefos/static/img/eu_logo.png' style='margin-top:4px;margin-right:4px;opacity:0.8;height:30px'>" +
			"<img src='http://www.mapservices.eu/nefos/static/img/land_tirol_logo.png' style='margin-top:4px;opacity:0.8;height:30px'></div>" +
			"<div style='float:right;' class='nefos-clearfix'><b>&copy;&nbsp;<i style='color:red'>tiris</i></b> 2012<br>OpenStreetMap contributors 2012<br>Powered by <a target='_blank' href='http://general-solutions.eu'>Contwise Maps</a></div>"

    };

    var myI18n = {
        de : {
        	firstTimeOnline : "<b>Achtung!</b> Sie starten die App zum <b>ersten mal</b>. Bitte stellen Sie sicher, dass Sie mit dem <b>Internet verbunden</b> sind und starten Sie die App neu.",
        	unsupportedBrowser : "<b>Achtung!</b> Diese App ist für iOS- u. Android Systeme optimiert. Auf Ihrem Gerät können daher Fehler auftreten!",
        	informationUnterkunft : "Informationen zur Unterkunft",
        	informationRestaurant : "Informationen zum Restaurant",
        	awards			: "Auszeichnungen",
        	typeRooms		: "Anzahl/Art der Zimmer",
        	priceEZ			: "Preis EZ",
        	priceDZ			: "Preis DZ",
        	downloadByQR	: "Laden Sie dieses Objekt in Ihre mobile App!",
        	individual		: "Individuelle Angebote",
        	specialInfo		: "Besonderheiten",
        	services		: "Serviceleistungen",
        	kitchenType		: "Art der Küche",
        	mainMenuPrice	: "Preis des Hauptgerichts",
        	payment			: "Bezahlung",
        	hiking_route	: "Wanderweg",
        	selectRouteType	: "Routentyp wählen",
        	configuration	: "Einstellungen",
        	biking_route	: "Bikeweg",
        	welcome			: "Willkommen",
        	password		: "Passwort",
        	installUpdateQuestion : "Es sind Updates verfügbar. Diese jetzt installieren?",
        	gotoDescription : "Zustieg",
        	ropeLength		: "Seillänge",
        	info_impressum	: "Info / Impressum",
        	targetGroup		: "Zielgruppe",
        	forSmartphones	: "Optimiert für Smartphones",
        	surrounding		: "Lage und Umgebung",
        	noWifi			: "Es besteht derzeit keine Wlan-Verbindung. Es werden größere Datenmengen heruntergeladen. Dies kann einige Zeit in Anspruch nehmen. Wollen Sie fortfahren?",
        	routeType		: "Art des Weges",
        	Technik			: "Technik",
        	routeStart		: "Startpunkt",
        	routeFinish		: "Zielpunkt",
        	landscape		: "Landschaft",
        	wrongPassword	: "Passwort ungültig!",
        	feeling			: "Erlebniswert",
        	HoechsterPunkt  : "Höchster Punkt",
        	NiedrigsterPunkt: "Niedrigster Punkt",
        	HoehenmeterAuf  : "Höhenmeter Auf",
        	routingActive	: "Routing <b>aktiviert</b>. Sie werden <b>geortet</b>!",
        	routing			: "Anreise / Routing",
        	routingMobile	: "Anreise",
        	HoehenmeterAb   : "Höhenmeter Ab",
        	noUpdates		: "Keine Updates vorhanden!",
        	startHeight		: "Höhe Start",
        	contentNotUnlocked : "Sie haben die Inhalte Ihrer App noch nicht aktiviert. Bitte führen Sie diesen Schritt zuerst durch!",
        	endHeight		: "Höhe Ziel",
        	errorReadingBounds : "Fehler beim Download der Karte!",
        	routeStart		: "Startpunkt",
        	routeEnd		: "Zielpunkt",
        	routeStartEnd   : "Start-/Zielpunkt",
        	routeDescription: "Wegbeschreibung",
        	signs			: "Beschilderung",
        	gotoWay			: "Anfahrt",
        	parking			: "Parken",
        	traffic			: "Öffentl. Verkehrsmittel",
        	source			: "Quelle",
        	Wegbeschaffenheit:"Beschaffenheit",
        	reception		: "Öffnungszeiten Rezeption",
        	amountCamping   : "Campingplätze",
        	amountCampingPlaces:"Stellplätze",
        	registration	: "Voranmeldung",
        	nameTraffic		: "Name des Verkehrsverbundes",
        	eventPlace		: "Veranstaltungsort",
        	visitors		: "Erwartete Besucher",
        	
        	noRepeat		: "keine",
        	repeatPerDay	: "täglich",
        	repeatPerWeek	: "wöchentlich",
        	repeatPerMonth	: "monatlich",
        	dayOfWeek		: "Wochentag",
        	notDownloaded	: "Sie müssen die App zuerst <b>installieren</b> um diese Funktion nutzen zu können!",
        	repeat			: "Wiederholung",
        	date			: "Datum",
        	crossCountryTypeClassic : "Klassisch",
        	crossCountryTypeSkating	: "Skating",
        	crossCountryTypeSledge : "Schlittenlanglauf",
        	start			: "Start",
        	end				: "Ende",
        	priceAdult		: "Preis Erw.",
        	priceChildren	: "Preis Kinder",
        	reductions		: "Ermäßigungen",
        	deadline		: "Meldeschluss",
        	location		: "Treffpunkt",
        	linkedResources : "Empfehlenswertes",
        	contents		: "Inhalte",
        	contentOfWatchlist : "Inhalte der Merkliste",
        	emptyWatchlist	: "Aktuell befinden sich keine Elemente in Ihrer Merkliste.<br>Über den Button Merkliste können Inhalte hinzugefügt werden.",
        	tomorrow		: "Morgen",
        	addedToWatchlist: "Das <b>Objekt</b> wurde zur Merkliste <b>hinzugefügt</b>",
        	removedFromWatchlist: "Das <b>Objekt</b> wurde von der Merkliste <b>entfernt</b>",
        	userLocateError : "Beim Versuch Ihre Position abzufragen ist ein Fehler aufgetreten! Bitte überprüfen Sie die Einstellungen.",
        	routeCount		: "Routenanzahl",
        	goOffline		: "Sie sind nicht mit dem Internet verbunden! Wollen Sie zur Offline-App wechseln?",
        	notSupported : "Es ist ein Fehler bei der Standortabfrage aufgetreten! Es kann sein, dass diese Funktion auf Ihrem Gerät nicht unterstützt wird.",
        	connectionNeeded : "Bitte stellen Sie eine <b>Internetverbindung</b> her um diesen Schritt durchführen zu können!",
        	emptyResourceList : "Keine Einträge gefunden!",
        	searchHelpText	: "Suche...",
        	infoHelpText	: "Anzeigen von Informationen zur Funktionalität der Web-App, den Sponsoren sowie Impressum.",
        	offlineHelpText	: "Download der Seite als HTML5 Web-App. Dadurch kann die Applikation offline verwendet werden.",
        	offlineAvailiable : "<b>Download abgeschlossen!</b> Sie können Ihre App nun auch offline nutzen.",
        	downloadingText : "Bitte haben Sie einen Augenblick Geduld. Ihre App wird heruntergeladen!",
        	rockQuality		: "Felsqualität",
        	routeLength		: "Routenlänge",
        	difficulty		: "Schwierigkeit",
        	bestSeason		: "Jahreszeit",
        	exposition		: "Exposition",
        	seaHeight		: "Seehöhe",
        	safety			: "Absicherung",
        	childrenFriendly : "Kinderfreundl.",
        	skiResort		: "Skigebiet",
        	unzipMap		: "Karte entpacken...",
        	unzipMediums	: "Bilder entpacken...",
        	noResourcesToCache :"Keine Ressourcen vorhanden...",
        	loadingCategories :"Kategorien laden...",
        	downloadingMediums: "Bilder laden...",
        	locating		: "Orte...",
        	loadingComplete : "Laden abgeschlossen!",
        	pistNumber		: "Pistennummer",
        	errorOnReportCreation	: "Beim Generieren der Datei ist ein Fehler aufgetreten! Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.",
        	generationComplete	: "Abgeschlossen",
        	generating		: "Datei wird generiert ...",
        	download		: "Download",
        	other_category	: "Andere",
        	messureTool		: "Distanzen messen",
        	lang_de			: "Deutsch",
        	lang_en			: "Englisch",
        	lang_it			: "Italienisch",
        	
        	loadingHeading	: "<b>Die aktuellen Inhalte werden heruntergeladen, bitte haben Sie einen Augenblick Geduld.</b>",
        	loadingMap		: "Karte laden",
        	unpackMap		: "Karte entpacken",
        	loadingCategories : "Kategorien laden",
        	loadingContent	: "Inhalte laden",
        	loadingMediums	: "Bilder laden",
        	unpackMediums	: "Bilder entpacken",
        	startingApp		: "Anwendung wird gestartet...",
        	
        	summer			: "Sommer",
        	winter			: "Winter",
        	satellite		: "Satellit",
        	searchTipp		: "Suchen...",
        	backToOverview	: "Zurück zur Übersicht",
        	shareByMail		: "Per Mail teilen",
        	prices			: "Preise",
        	snowed			: "Beschneit",
        	events			: "Veranstaltungen",
        	scanQRCode		: "QR-Code einscannen",
        	panorama		: "Panorama",
        	unlockContent	: "Inhalte freischalten",
        	update			: "Auf Aktualisierungen pr&uuml;fen",
        	quit			: "Beenden",
        	menuContent		: "Inhalte",
        	menuSearch		: "Suche",
        	lighted			: "Beleuchtet",
        	height			: "Höhe",
        	yes				: "ja",
        	openingExternalBrowser : "Browser wird geöffnet...",
        	no				: "nein",
        	bookingLink		: "Jetzt buchen!",
        	reservationLink : "Anfrage senden!",
        	difficulty_easy : "Leicht",
        	difficulty_average : "Mittel",
        	difficulty_hard : "Schwer",
        	difficulty_winter: "Winter",
        	difficulty_theme: "Themenweg",
            type            : "Art",
            category        : "Kategorie",
            condition       : "Kondition",
            number			: "Nummer",
            panorama        : "Panorama",
            loadingMap		: "Karte laden...",
        	loadingObjects	: "Objekte laden...",
        	loading			: "Laden...",
            duration        : "Dauer",
            content			: "Highlights & Aktivitäten",
            distanceFromMe	: "Entfernung von mir",
            weather			: "Wetter",
            length          : "Länge",
            altitude        : "Höhenmeter",
            maxAltitude     : "Max. Höhe",
            details         : "Details",
            close           : "Schließen",
            asphalt         : "Asphalt",
            brokenStone     : "Schotter",
            hillClimbing    : "Steig",
            hikingTrail     : "Wald-, Wanderweg",
            grasslandTrail  : "Wiesenweg",
            trail           : "Pfad",
            bikeAsphalt     : "Radweg asphaltiert",
            singleTrail     : "Singletrail",
            showOnMap       : "Auf Karte anzeigen",
            back            : "Zurück",
            moreInfo		: "Mehr Informationen",
            overview		: "Überblick",
            crossCountryType: "Stil",
            basicData		: "Eckdaten",
            character		: "Wegbeschaffenheit",
            heightProfile	: "Höhenprofil",
            profileInDetail : "Profil im Detail",
            description		: "Beschreibung",
            contactInfo		: "Kontakt",
            information		: "Informationen",
            additionalInfo	: "Zusatzinfos",
            telephone		: "Telefon",
            mobile			: "Mobil",
            fax				: "Fax",
            email			: "Email",
            generateQRCode	: "QR-Code generieren",
            website			: "Website",
            nation			: "Nation",
            webcams			: "Webcams",
            sleep			: "Übernachtung",
            summerSeason	: "Sommersaison",
            winterSeason	: "Wintersaison",
            menuMap			: "Karte",
            back			: "Zurück",
            mainMenu		: "Startseite",
            bookmark		: "Bookmark",
            openingHours	: "Öffnungszeiten",
            eventHours		: "Veranstaltungszeiten",
            categories		: "Kategorien",
            classification	: "Klassifizierung",
            houseName		: "Hausbezeichnung",
            toWatchlist		: "Zur Merkliste hinzufügen",
            removeFromWatchlist: "Von Merkliste entfernen",
            popupBlocker	: "Sie haben einen Popupblocker aktiviert! Dadurch kann die Seite nicht angezeigt werden. Bitte deaktivieren Sie diesen und führen Sie die Aktion erneut aus!",
            watchlist		: "Merkliste",
            watchlistElements: "Elemente",
            pictureGallery	: "Bildergallerie",
            generateGPX		: "GPX-File generieren",
            print			: "Objekt drucken",
            noElementsInWatchlist: "Keine Elemente in Ihrer Merkliste!",
            noElementsInSearch:	"Die Suche lieferte keine Ergebnisse!",
            printWatchlist	: "Merkliste drucken",
            showNextResults : "Weitere anzeigen",
            qrCodeDescription : "<b>QR-Code einscannen.</b><br/><br/><b>&bull; Sie haben das App bereits installiert?</b><p style='margin-left:20px'>Der Inhalt wird zur App hinzugefügt.</p><b>&bull; Sie haben das App noch nicht installiert?</b><p style='margin-left:20px'>Sie werden automatisch zum Download weitergeleitet. Nach Installation erneut scannen.</p>",
            mapTypeMap		: "Karte",
            mapTypeSatellite: "Satellit",
            mapTypeWinter	: "Winter",
            map				: "Karte",
            city			: "Ort",
            street			: "Straße",
            contact			: "Kontakt",
            open			: "Öffnen",
            enlarge			: "Vergrößern",
            feratelLink		: "Buchungslink",
            awayFromYou     : "von Ihnen entfernt",
            imgNotEnlargable   : "Bild kann nicht vergößert werden.",
            hutOverview		: "Hüttenübersicht drucken",
            stars			: "Sterne",
            startAltitude	: "Starthöhe",
            targetAltitude	: "Zielhöhe",
            terrain			: "Terrain",
            noBookingPossible 	: "Keine Buchung möglich!",
            mapTypeHiking		: "Karte",
            mapTypeHikingWinter : "Winterkarte",
            transferToSmartphone: "Auf das Smartphone übernehmen",
            geocodeFailed	: "Konnte gesuchten Ort nicht finden!",
            routingFailed	: "Konnte keine Route zwischen den beiden Orten berechnen!",
            startRouting	: "Route berechnen",
            printRoute		: "Route drucken",
            routingStart	: "Start",
            routingEnd		: "Ziel",
            dragRoutingMarker: "Zum Verschieben ziehen und halten",
            pleaseEnablePopups : "Bitte aktivieren Sie Popups für diese Seite!",
            routeTypeSelected : "Der von Ihnen gewählte Routentyp wird nun angezeigt",
            route_type_car	: "Autoroute",
            route_type_bike	: "Radroute",
            route_type_hike	: "Wanderroute",
            openPano 		: "360° Panorama öffnen",
            backToMap		: "Zurück zur Karte",
            toOverview		: "Zur Übersicht",
            overviewHelpText: "Klicken Sie auf dieses Symbol um die aktuellen Inhalte übersichtlich in einer Galerie darzustellen.",
            next			: "Weiter",
            previous		: "Zurück",
            clusterItems	: "Objekte an diesem Ort"
        },
    
        en : {
        	firstTimeOnline : "<b>Attention!</b> You are starting the app for the <b>first time</b>. Please ensure that you are <b>connected</b> to the internet and restart the app.",
        	unsupportedBrowser : "<b>Attention!</b> This app was designed for iOS and android systems. There may be problems on your device!",
        	informationUnterkunft : "Information of Accomodation",
        	informationRestaurant : "Information of Restaurant",
        	typeUnterkunft : "Type of Accomodation",
        	awards			: "Awards",
        	typeRooms		: "Amount/Type of rooms",
        	priceEZ			: "Price single room",
        	welcome			: "Welcome",
        	routeStart		: "Start",
        	routeFinish		: "Finish",
        	content			: "Traveller information",
        	priceDZ			: "Price double room",
        	individual		: "Individual services",
        	downloadByQR	: "Download this object into your mobile app!",
        	noWifi			: "You do not have a wifi connection activated. Do you want to download data with current connection? This may take a bit of time!",
        	specialInfo		: "Special info",
        	services		: "Services",
        	kitchenType		: "Type of kitchen",
        	mainMenuPrice	: "Price of main menu",
        	errorReadingBounds : "Error downloading map!",
        	contentNotUnlocked : "The content of your app has not been activated. Please take this step first!",
        	payment			: "Payment",
        	gotoDescription : "Access",
        	noUpdates		: "No new updates on server!",
        	ropeLength		: "Rope length",
        	selectRouteType	: "Select type of route",
        	targetGroup		: "Target group",
        	forSmartphones	: "Optimized for smartphones",
        	surrounding		: "Countryside",
        	map				: "Map",
        	routeType		: "Type of route",
        	password		: "Password",
        	info_impressum	: "Info / About",
        	menuMap			: "&nbsp;&nbsp;Map&nbsp;&nbsp;",
            back			: "&nbsp;&nbsp;Back&nbsp;&nbsp;",
            events			: "Events",
        	scanQRCode		: "Scan QR-Code",
        	
        	loadingHeading	: "<b>Downloading the newest content, please have a little patience.</b>",
        	loadingMap		: "Loading map",
        	unpackMap		: "Unpacking map",
        	configuration	: "Configuration",
        	loadingCategories : "Loading categories",
        	loadingContent	: "Loading content",
        	loadingMediums	: "Loading mediums",
        	unpackMediums	: "Unpacking mediums",
        	startingApp		: "App gets started...",
        	
        	panorama		: "Panorama",
        	unlockContent	: "Unlock content",
        	update			: "Check for updates",
        	routingMobile	: "Routing",
        	quit			: "Quit",
        	menuContent		: "Content",
        	menuSearch		: "Search",
            mainMenu		: "Home",
            routing			: "Routing",
            hiking_route	: "Hiking",
            installUpdateQuestion : "Nuovi aggiornamenti disponibili. Installare adesso?",
        	biking_route	: "Biking",
            bookmark		: "Bookmark",
        	Technik			: "Technik",
        	landscape		: "Landscape",
        	feeling			: "Feeling",
        	routingActive	: "Routing is now <b>active</b>. Trying to get your <b>position</b>!",
        	openingExternalBrowser : "Opening browser...",
        	HoechsterPunkt  : "Highest point (m)",
        	weather			: "Weather",
        	webcams			: "Webcams",
        	distanceFromMe	: "Distance from me",
        	NiedrigsterPunkt: "Lowest point (m)",
        	HoehenmeterAuf  : "Höhenmeter Auf (m)",
        	HoehenmeterAb   : "Höhenmeter Ab (m)",
        	startHeight		: "Höhe Start (m)",
        	endHeight		: "Höhe Ziel (m)",
        	routeStart		: "Startpunkt",
        	routeEnd		: "Zielpunkt",
        	wrongPassword	: "incorrect password!",
        	routeStartEnd   : "Start-/Zielpunkt",
        	routeDescription: "Wegbeschreibung",
        	signs			: "Beschilderung",
        	gotoWay			: "Anfahrt",
        	parking			: "Parken",
        	traffic			: "Öffentl. Verkehrsmittel",
        	source			: "Quelle",
        	
        	noRepeat		: "none",
        	repeatPerDay	: "daily",
        	repeatPerWeek	: "weekly",
        	repeatPerMonth	: "per month",
        	dayOfWeek		: "Day of week",
        	notDownloaded	: "You first have to <b>install</b> the app to use this feature!",
        	repeat			: "Repeat",
        	date			: "Date",
        	start			: "Start",
        	end				: "End",
        	unzipMap		: "Unpacking map...",
        	unzipMediums	: "Unpacking mediums...",
        	noResourcesToCache :"No resources for caching...",
        	loadingCategories :"Loading categories...",
        	downloadingMediums: "Downloading mediums...",
        	loadingComplete : "Loading complete!",
        	priceAdult		: "Price Adult",
        	priceChildren	: "Price Childs",
        	reductions		: "Reductions",
        	deadline		: "Deadline",
        	location		: "Meet at",
        	linkedResources : "Interesting places",
        	contents		: "Contents",
        	contentOfWatchlist : "Content of watchlist",
        	emptyWatchlist	: "There are no entries in your watchlist!",
        	tomorrow		: "Tomorrow",
        	addedToWatchlist: "The object was <b>added</b> to <b>watchlist</b>",
        	removedFromWatchlist: "The object has been <b>removed</b> from <b>watchlist</b>",
        	userLocateError : "An error occured while trying to read your geographical position!",
        	routeCount		: "Number of routes",
        	goOffline		: "You are not connected to the internet! Do you wish to switch to the offline app?",
        	notSupported : "An error occured while trying to read your geographical position! Seems to be not supported.",
        	connectionNeeded : "You have to <b>connect</b> to the internet to perfom this operation!",
        	emptyResourceList : "No object could be found!",
        	searchHelpText	: "search...",
        	infoHelpText	: "Display information about the functionality of the app and sponsors.",
        	offlineHelpText	: "Download the app. You then can use it without an internet connection.",
        	offlineAvailiable : "Download complete! You are now able to use your app in offline mode.",
        	downloadingText : "Your app gets downloaded. This may take a few minutes!",
        	rockQuality		: "Rock quality",
        	routeLength		: "Length",
        	difficulty		: "Difficulty",
        	bestSeason		: "Best season",
        	exposition		: "Exposition",
        	seaHeight		: "Sea height",
        	safety			: "Safety",
        	childrenFriendly : "Child friendly",
        	skiResort		: "Ski resort",
        	pistNumber		: "Pist number",
        	errorOnReportCreation : "Error on generating file! Please try again later.",
        	generationComplete : "complete",
        	generating		: "File get's generated!",
        	download		: "download",
        	other_category	: "other",
        	messureTool		: "messure distance",
        	lang_de			: "german",
        	lang_en			: "english",
        	lang_it			: "italian",
        	locating		: "Locating...",
        	loadingMap		: "Loading map...",
        	loadingObjects	: "Loading objects...",
        	loading			: "Loading...",
        	summer			: "summer",
        	winter			: "winter",
        	satellite		: "satellite",
        	searchTipp		: "search...",
        	backToOverview	: "back to overview",
        	shareByMail		: "share by mail",
        	prices			: "Prices",
        	snowed			: "Artificial snow",
        	lighted			: "Lighted",
        	height			: "Height",
        	yes				: "yes",
        	no				: "no",
        	bookingLink		: "book now!",
        	difficulty_easy : "easy",
        	difficulty_average : "average",
        	difficulty_hard : "hard",
        	difficulty_winter: "winter",
        	difficulty_theme: "theme-path",
            type            : "Type",
            category        : "Category",
            condition       : "Condition",
            number			: "Number",
            panorama        : "Panorama",
            duration        : "Duration",
            length          : "Length",
            altitude        : "Altitude",
            maxAltitude     : "Max. altitude",
            details         : "Details",
            close           : "close",
            asphalt         : "Asphalt",
            brokenStone     : "Gravel",
            hillClimbing    : "Steep track",
            hikingTrail     : "Hiking trail",
            grasslandTrail  : "Grassland trail",
            trail           : "Trail",
            bikeAsphalt     : "Asphaltic bike trail",
            singleTrail     : "Singletrail",
            showOnMap       : "Show on map",
            moreInfo		: "More Information",
	        overview		: "Overview",
            crossCountryType: "Type",
            basicData		: "Basic Data",
            character		: "Character",
            heightProfile	: "Height Profile",
            profileInDetail : "Profile in detail",
            description		: "Description",
            contactInfo		: "Contact",
            information		: "Information",
            additionalInfo	: "Additional info",
            noInformation	: "no informationen availiable",
            telephone		: "Telephone",
            mobile			: "Mobile",
            fax				: "Fax",
            email			: "Email",
            website			: "Website",
            nation			: "Nation",
            sleep			: "Overnight stay",
            summerSeason	: "Summerseason",
            winterSeason	: "Winterseason",
            openingHours	: "Opening hours",
            eventHours		: "Opening hours",
            generateQRCode	: "generate QR-Code",
            categories		: "Categories",
            classification	: "Classification",
            houseName		: "House name",
            toWatchlist		: "add to watchlist",
            removeFromWatchlist: "remove from watchlist",
            popupBlocker	: "Warning. A popup blocker is activated! Please turn it off to display the site correctly!",
            watchlist		: "Watchlist",
            watchlistElements: "elements",
            pictureGallery	: "picture gallery",
            generateGPX		: "generate GPX file",
            print			: "print object",
            noElementsInWatchlist: "No elements in watchlist!",
            noElementsInSearch:	"No results where found!",
            printWatchlist	: "print watchlist",
            noDescription	: "No description availiable",
            showNextResults : "show further results",
            mapTypeMap		: "map",
            mapTypeSatellite: "satellite",
            mapTypeWinter	: "winter",
            open			: "Open",
            enlarge			: "Enlarge",
            feratelLink		: "Booking link",
            awayFromYou     : "away from you",
            imgNotEnlargable   : "Image is not enlargeable.",
            hutOverview		: "print overview of huts",
            stars			: "Stars",
            startAltitude	: "Start height",
            targetAltitude	: "Target height",
            terrain			: "Terrain",
            noBookingPossible : "No booking possible!",
            mapTypeHiking	:	"Map",
            mapTypeHikingWinter : "winter map",
            geocodeFailed	: "Couldn't find specified location!",
            routingFailed	: "Couldn't find a route!",
            startRouting	: "Start Routing",
            printRoute		: "Print Route",
            routingStart	: "Start",
            routingEnd		: "Destination",
            dragRoutingMarker: "Drag marker to move",
            pleaseEnablePopups : "Please enable popups on this page!",
            routeTypeSelected : "Your selected route type is now displayed on the map!",
            route_type_car	: "Car route",
            route_type_bike	: "Bike route",
            route_type_hike	: "Hike route",
            openPano 		: "Open 360° panorama",
			next			: "Next",
			previous		: "Previous",
			clusterItems	: "Objects at that location"
        },
        it : {
        	firstTimeOnline : "Siete sicuri di essere collegati con internet? Riattivate l‘app.",
        	unsupportedBrowser : "Questa app è ottimizzata per IOS e Android. Possono risultare errori sul suo device.",
        	informationUnterkunft : "Informazioni alloggio",
        	informationRestaurant : "Informazioni ristorante",
        	awards                                 : "Premi",
        	typeRooms                         : "Quantitá/Tipo di camere",
        	priceEZ                                 : "Prezzo camera sing.",
        	priceDZ                                 : "Prezzo camera doppia",
        	downloadByQR : "Scaricate quest’oggetto nella Sua mobile App",
        	individual                             : "Offerte individuali",
        	specialInfo                          : "Specialità",
        	services                                : "Servizi",
        	kitchenType                       : "Cucina",
        	mainMenuPrice                : "Prezzo piatto principale",
        	payment                                              : "Pagamento",
        	welcome                                             : "Benvenuti",
        	password                            : "Password",
        	gotoDescription : "Accesso",
        	ropeLength                        : "Lunghezza tiro di corda",
        	info_impressum               : "Info/Impressum",
        	targetGroup                       : "Gruppo target",
        	forSmartphones               : "Ottimizzato per smartphone",
        	surrounding                       : "Posizione e dintorni",
        	noWifi                                   : "Al momento non Siete collegati con internet. Scarica dati. Prego attendere",
        	routeType                           : "Tipo sentiero",
        	Technik                                                : "Tecnica",
        	landscape                            : "Paessaggio",
        	wrongPassword               : "Password non valido",
        	feeling                                  : "Avventura",
        	HoechsterPunkt  : "Punto più alto",
        	NiedrigsterPunkt: "Punto più basso",
        	HoehenmeterAuf  : "Metri altezza scalata",
        	routingActive     : "Posizionamento in corso",
        	routing                                 : "Posizionamento",
        	routingMobile   : "Arrivo",
        	HoehenmeterAb   : "Metri altezza discesa",
        	noUpdates                         : "Nessun aggiornamento possibile",
        	startHeight                         : "Altezza partenza",
        	contentNotUnlocked : "Non ha ancora attivato i contenuti dell’app. Prego attivare.",
        	endHeight                           : "Altezza arrivo",
        	errorReadingBounds : "Download piantina errato",
        	routeStart                           : "Punto di partenza",
        	routeEnd                             : "Punto di arrivo",
        	routeStartEnd   : "Partenza/Arrivo",
        	routeDescription: "Descrizione percorso",
        	signs                                      : "Segnaletica",
        	gotoWay                                              : "Arrivo",
        	parking                                 : "Parcheggio",
        	traffic                                    : "Mezzi di trasporto pubblico",
        	source                                  : "Sorgente",
        	Wegbeschaffenheit:"Terreno",
        	reception                            : "Orario réception",
        	amountCamping   : "Campeggio",
        	amountCampingPlaces:"Area di sosta",
        	registration         : "Registrazione",
        	nameTraffic                        : "Nome servizio di trasporto pubblico",
        	eventPlace                         : "Località d‘evento",
        	visitors                  : "Visitatori",

        	noRepeat                            : "nessuno",
        	repeatPerDay    : "giornaliero",
        	repeatPerWeek               : " settimanale",
        	repeatPerMonth             : "mensile",
        	dayOfWeek                        : "Giorno",
        	notDownloaded               : "Prima di poter usare questa funzione, dovete installare l’app.",
        	repeat                                  : "Ripetizione",
        	date                                       : "Data",
        	start                                       : "Partenza",
        	end                                                        : "Arrivo",
        	priceAdult                           : "Prezzo Adulto",
        	priceChildren     : "Prezzo Bambini",
        	reductions                          : "Sconto",
        	deadline                              : " Deadline",
        	location                                : "Punto d‘incontro",
        	linkedResources : "Da raccomandare",
        	contents                              : "Contenuti",
        	contentOfWatchlist : "Contenuti della lista",
        	emptyWatchlist                : "Attualmente non si trova nessun elemento nella lista. Aggiungiete un oggetto con il commando.",
        	tomorrow                           : "Domani",
        	addedToWatchlist: "L’oggetto è stato aggiunto nella lista.",
        	removedFromWatchlist: "L’oggetto è stato tolto dalla lista",
        	userLocateError : "È stato scoperto un errore nel posizionamento. Prego controllare le impostazioni",
        	routeCount                        : "Numero percorsi",
        	goOffline                             : "Non siete collegati con Internet. Vuole cambiare alla versione offline?",
        	notSupported : "È stato scoperto un’errore . Probabilmente il suo sistema non sopporta la funzione del posizionamento",
        	connectionNeeded : "Per favore collegare con Internet per poter continuare",
        	emptyResourceList : "Nessun contenuto",
        	searchHelpText                : "Cerco…",
        	infoHelpText      : "Visualizza informazioni: funzionalità dell‘ app, sponsori e impressum",
        	offlineHelpText                : "Carica il sito come html 5 web app. Così l’applicazione può essere usata offline.",
        	offlineAvailiable : "Download concluso. App- uso offline possibile",
        	downloadingText : "Attendere prego",
        	rockQuality                         : "Qualità di roccia",
        	routeLength                       : "Lunghezza del tiro",
        	difficulty                              : "Difficoltà",
        	bestSeason                        : "Stagione",
        	exposition                           : "Esposizione",
        	seaHeight                            : "Livello mare",
        	safety                                   : "Sicurezza",
        	childrenFriendly : "Per bambini",
        	skiResort                             : "Comprensorio di sci",
        	unzipMap                            : "Aprire piantina",
        	unzipMediums  : "Aprire media",
        	noResourcesToCache :" Nessun’ oggetto disponibile",
        	loadingCategories :"Caricare categoria",
        	downloadingMediums: "Caricare media",
        	locating                                : "Località",
        	loadingComplete : "Processo concluso",
        	pistNumber                        : "Numero pista",
        	errorOnReportCreation                : "?",
        	generationComplete      : "Completo",
        	generating                          : "Processo in corso",
        	download                            : "Download",
        	other_category                : "Altri",
        	messureTool                      : "Misurare distanza",
        	lang_de                                                : "Tedesco",
        	lang_en                                                : "Inglese",
        	lang_it                                  : "Italiano",

        	loadingHeading : "I contenuti vengono scaricati. Per favore attendere.",
        	loadingMap                        : "Caricare piantina",
        	unpackMap                        : "Aprire piantina",
        	loadingCategories : "Aprire categorie",
        	loadingContent : "Caricare contenuti",
        	loadingMediums              : "Caricare media",
        	unpackMediums              : " Aprire media",
        	startingApp                        : "Processo in corso",

        	summer                                               : "Estate",
        	winter                                   : "Inverno",
        	satellite                                : "Satellite",
        	searchTipp                          : "Cerca",
        	backToOverview              : "Indietro",
        	shareByMail                       : "Condividere per mail",
        	prices                                    : "Prezzi",
        	snowed                                                : " Nevicato",
        	events                                  : "Manifestazioni",
        	scanQRCode                      : " Riprendere QR Code",
        	panorama                           : "Panorama",
        	unlockContent  : " Libera contenuti",
        	update                                 : "Verifica aggiornamenti",
        	quit                                        : "Esci",
        	menuContent                   : "Contenuti",
        	menuSearch                      : "Cerca",
        	lighted                                  : "illuminata",
        	height                                   : "altezza",
        	yes                                                         : "Si",
        	openingExternalBrowser : "Aprire browser",
        	no                                                           : "No",
        	bookingLink                        : "Prenota",
        	reservationLink : "Manda richiesta",
        	difficulty_easy : "Facile",
        	difficulty_average : "Medio",
        	difficulty_hard : "Difficile",
        	difficulty_winter: "Inverno",
        	difficulty_theme: "Sentiero a tema",
        	type            : "Tipo",
        	category        : "Categoria",
        	condition       : "Condizione",
        	number                                                : "Numero",
        	panorama        : "Panorama",
        	loadingMap                        : "Apre piantina",
        	loadingObjects  : "Carica oggetto",
        	loading                                 : "Carica",
        	duration        : "Durata",
        	content                                                : "Attrazioni ed attività",
        	distanceFromMe             : "Distanza da me",
        	weather                                               : "Tempo",
        	length          : "Lunghezza",
        	altitude        : "Metri altezza",
        	maxAltitude     : "Altezza mass.",
        	details         : "Dettagli",
        	close           : "Chiudere",
        	asphalt         : "Asfalto",
        	brokenStone     : "Ghiaia",
        	hillClimbing    : "Sentiero",
        	hikingTrail     : "Sentiero",
        	grasslandTrail  : "Sentiero",
        	trail           : "Sentiero",
        	bikeAsphalt     : "Pista ciclabile",
        	singleTrail     : "Singletrail",
        	showOnMap       : "Mostra su piantina",
        	back            : "Indietro",
        	moreInfo                             : "Altre informazioni",
        	overview                             : "Sintesi",
        	crossCountryType: "Stile",
        	basicData                             : "Dati",
        	character                             : "Caratteristiche sentiero",
        	heightProfile      : "profilo altezza",
        	profileInDetail : "dettagli profilo",
        	description                         : "Descrizione",
        	contactInfo                         : "Contatto",
        	information                        : "Informazioni",
        	additionalInfo    : "Informazioni aggiuntivi",
        	telephone                           : "Telefono",
        	mobile                                  : "Cellulare",
        	fax                                                          : "Fax",
        	email                                     : "Email",
        	generateQRCode             : "Genera QR-Code",
        	website                                                : "Sito Web",
        	nation                                   : "Nazione",
        	webcams                                             : "Webcam",
        	sleep                                     : "Soggiorno",
        	summerSeason                : "Stagione d’estate",
        	winterSeason    : "Stagione invernale",
        	menuMap                                           : "Piantina",
        	back                                       : "Indietro",
        	mainMenu                          : "Menu iniziale",
        	bookmark                           : "Segna",
        	openingHours   : "Orario",
        	categories                           : "Categorie",
        	classification       : "Classificazione",
        	houseName                       : "Nominazione casa",
        	toWatchlist                         : "Aggiungi alla lista",
        	removeFromWatchlist: "Rimuovi dalla lista",
        	popupBlocker    : "È bloccato il servizio Pop-up. Il sito non può essere mostrato. Riprova.",
        	watchlist                              : "Lista dei preferiti",
        	watchlistElements: "Elemento",
        	pictureGallery   : "Galeria photo",
        	generateGPX                     : "Genera GPX File",
        	print                                      : "Stampa oggetto",
        	noElementsInWatchlist: "Nessun elemento nella lista",
        	noElementsInSearch:     "Nessun risultato di ricerca",
        	printWatchlist    : "Stampa lista",
        	showNextResults : "Visualizza altri",
        	qrCodeDescription : "Riprende QR Code. Ha già installato l’app? Aggiunge contenuto all’app. Inoltro automatico al download. Riprova.",
        	mapTypeMap                    : "Piantina",
        	mapTypeSatellite: "Satellite",
        	mapTypeWinter               : "Inverno",
        	map                                                       : "Piantina",
        	city                                         : "Luogo",
        	street                                    : "Via",
        	contact                                 : "Contatto",
        	open                                     : "Apre",
        	enlarge                                 : "Ingrandisce",
        	feratelLink                          : "Link prenotazione",
        	awayFromYou     : "distante da Lei",
        	imgNotEnlargable   : "Ingrandimento imagine non possibile",
        	hutOverview                     : "Visione generale capanne",
        	stars                                      : "Stelle",
        	startAltitude      : "Altezza partenza",
        	targetAltitude   : "Altezza arrivo",
        	terrain                                  : "Terreno",
        	noBookingPossible          : "Prenotazione non possibile",
        	mapTypeHiking                 : "Piantina",
        	mapTypeHikingWinter : "winter",
        	transferToSmartphone: "Trasferire su smartphone",
        	geocodeFailed  : "Località non trovata",
        	routingFailed     : "Calcolo percorso fallito",
        	startRouting       : "Calcola percorso",
        	printRoute                          : "Stampa percorso",
        	routingStart        : "Partenza",
        	routingEnd                          : "Arrivo",
        	dragRoutingMarker: "Drag&Drop per spostare",
        	pleaseEnablePopups : "Prego attivare il servizio pop-up!",
        	selectRouteType	: "Routentyp wählen",
        	configuration	: "Einstellungen",
        	routeTypeSelected : "Der von Ihnen gewählte Routentyp wird nun angezeigt",
        	route_type_car	: "Autoroute",
            route_type_bike	: "Radroute",
            route_type_hike	: "Wanderroute"
        },
        fr: {
        	installUpdateQuestion : "New updates are availiable. Install now?",
        	selectRouteType	: "Routentyp wählen",
        	configuration	: "Einstellungen",
        	routeTypeSelected : "Der von Ihnen gewählte Routentyp wird nun angezeigt",
        	route_type_car	: "Autoroute",
            route_type_bike	: "Radroute",
            route_type_hike	: "Wanderroute",
            routingMobile	: "Anreise"
        }
    };

    nefos.InitGlobals(myGlobals);
    nefos.InitI18n(myI18n);
})();


nefos.ZillertalPage = nefos.Page.extend({
	init : function(settings) {
		this.mapLoadComplete = false;
		this.categoryLoadComplete = false;
		this.mandatorConfigLoadComplete = false;
		this.objectTypesLoadComplete = false;
		settings.cacheMethod = settings.cacheMethod || nefos.CACHE_TYPE_COMPLEX;
		
		this.settings = jQuery.extend({}, settings);
		
		if (this.settings.site && this.settings.site.createStructure) {
			this.initTarget();
			this.createSiteStructure();
		}
		
		this._super(settings);
		
		this.settings.hideMapTypeSelection = this.settings.hideMapTypeSelection || false;
		this.settings.zoomControl = (this.settings.zoomControl === undefined ? true : this.settings.zoomControl);
		this.settings.attributionControl = (this.settings.attributionControl === undefined ? true : this.settings.attributionControl);
		this.settings.trackResize = (this.settings.trackResize === undefined ? true : this.settings.trackResize);
		this.settings.showFluentInterface =  (this.settings.showFluentInterface === undefined ? true : this.settings.showFluentInterface);
        this.settings.mobileCluster = this.settings.mobileCluster || false;
        this.settings.interfaceDir = (this.settings.interfaceDir === undefined ? "right" : this.settings.interfaceDir);
		
		this.gallery = null;
		this.dateLine = null;
		
		this.initStartPageLang();
		this.initLayout();
		this.initDateLine();
		this.initFullscreenOverview();
		
		this.huts = [];	//for hut overview printing
		this.overviewCategory = null;
		this.infoRes = null;
		this.detailRes = null;
		this.overviewRes = null;
		this.routingInfo = null;
		
		var outer = this;
		//Attention, a major hack follows
		nefos.Override(this, "resizeInfoContainer", function() {	
			var innerHeight = window.innerHeight || document.body.clientHeight;
			var innerWidth = window.innerWidth || document.body.clientWidth;
			
			//ATTENTION HACK! UAAA
			//No other method is called when the size of the window is altered!!
			//[FF] This needs to be done via an event, R E A L L Y !!!
			if (outer.fullscreenOverview) {
				outer.resizeFullscreenOverview();
			}		
			
			if (outer.detailPanel) {
				outer.detailPanel.setHeight(innerHeight - nefos.Globals.panelMargin);
			}
			
			if (outer.listPanel) {
				outer.listPanel.setHeight(innerHeight - nefos.Globals.panelMargin);
			}
			
			if (outer.globeViewer && (outer.oldInnerWidth != innerWidth || outer.oldInnerHeight != innerHeight)) {
				outer.globeViewer.resizeMap();
			}
			
			outer.oldInnerWidth = innerWidth;
			outer.oldInnerHeight = innerHeight;
		});
		
	},
	
	/** new methods for dynamically creating the whole site structure */
	/* Creates structure like zillertalarena with header logo */
	
	createDescription : function() {
		this.$target.append('<div id="nefos-siteDescription"><div><b>' + this.settings.site.name + '</b></div><br/><div>' + this.settings.site.description + '</div><br/><br/><div id="nefos-gsLink">Powered by <a target="_blank" href="http://www.general-solutions.at">Contwise Maps</a> &copy; - General Solutions Steiner GmbH</div><input id="nefos-closeDescription" onclick="javascript:nefos.PageInstance.toggleInfo();" value="' + nefos._('close') + '" type="button"></div>');
	},
	
	createCenter : function() {
		this.$target.append('<div id="nefos-centerBody"></div>');
	},
	
	createMapCategoryMenu : function() {
		this.$target.append('<div id="nefos-mapMenu"></div>');
	},
	
		
	createNorthPanel : function() {
		this.$target.append('<div class="nefos-outer-north">' +
				'<div id="nefos-pictureGallery" style="display:none;"></div>' +
			'</div>');
		this.createTools($("#nefos-outer-north"));
	},
	
	createTools : function($parent) {
		var $toolsPanel = $("<div class='nefos-north-bottom'></div>");
		var $watchlistPanel = $("<div style='float:left;width:33%'></div>");
		var $categoryPanel = $("<div style='float:left;width:33%'><div id='nefos-categoryCaption'></div>&nbsp;</div>");
		var $searchPanel = $("<div style='float:right;width:33%'></div>");
		
		this.createSearchInput($searchPanel);
		this.createWatchlistButton($watchlistPanel);
		
		$toolsPanel.append($watchlistPanel).append($categoryPanel).append($searchPanel);
		
		$parent.append($toolsPanel);
	},
		
	createMapContainer : function() {
		
		var contactHtml = "";
		if(this.settings.site.contact && this.settings.site.contact != ""){
			contactHtml = ", " + this.settings.site.contact;
		}
		
		this.$target.append('<div id="nefos-outerCenter" class="nefos-outer-center">' +
				'<div id="nefos-mapContainer" class="nefos-center-center"></div>' +
				(this.settings.site.createToolsPanel ? 
						'<div class="nefos-center-south"><div style="float:left;"><b>' + this.settings.site.name + '</b>' + contactHtml + '</div>' +
						'<div style="float:right;margin-right:20px;"><a id="nefos-info-link" href="javascript:nefos.PageInstance.toggleInfo();">Info</a></div></div>'
				: "") +
				'</div>');
	},
	
	createMapLayerSwitcher : function() {
		var switcherHtml = '<div class="nefos-mapTypeSwitcher"><div class="leaflet-control-zoom">';
		var cnt = 0;
		
		var marginTop = "margin-top:0px";
		if (this.settings.site.mapTypeSummer) {
			switcherHtml += '<a href="javascript:void(0)" class="nefos-mapTypeSwitch" id="nefos-summer" style="' + marginTop + '"><div>' + nefos._('summer') + '</div></a>';
			marginTop = "margin-top:5px";
			cnt++;
		}
		
		if (this.settings.site.mapTypeWinter) {
			switcherHtml += '<a href="javascript:void(0)" class="nefos-mapTypeSwitch" id="nefos-winter" style="' + marginTop + '"><div>' + nefos._('winter') + '</div></a>';
			marginTop = "margin-top:5px";
			cnt++;
		}
		
		if (this.settings.site.mapTypeSatellite) {
			switcherHtml += '<a href="javascript:void(0)" class="nefos-mapTypeSwitch" id="nefos-satellite" style="' + marginTop + '"><div>' + nefos._('satellite') + '</div></a>';
			marginTop = "margin-top:5px";
			cnt++;
		}

		if (this.settings.site.mapTypeAlpenwelt) {
			switcherHtml += '<a href="javascript:void(0)" class="nefos-mapTypeSwitch" id="nefos-alpenwelt" style="' + marginTop + '"><div>' + nefos._('mapTypeHiking') + '</div></a>';
			marginTop = "margin-top:5px";
			cnt++;
		}
		
		if (this.settings.site.mapTypeAlpenweltWinter) {
			switcherHtml += '<a href="javascript:void(0)" class="nefos-mapTypeSwitch" id="nefos-alpenwelt_winter" style="' + marginTop + '"><div>' + nefos._('mapTypeHikingWinter') + '</div></a>';
			marginTop = "margin-top:5px";
			cnt++;
		}
		
		switcherHtml += "</div></div>";
		
		if(cnt == 0){
			switcherHtml = "";
		}
		
		if (this.settings.site.overview) {
			this.createOverviewButton();
		}
		
		if (this.settings.site.globeViewer) {
			this.createGlobeViewerButton();
		}
		
		
		$("#nefos-outerCenter").append(switcherHtml);	
	},
	
	createProfileContainer : function() {
		this.$target.append('<div id="nefos-closeOuterProfileContainer"></div>');	
	},
	
	createSearchInput : function($parent) {
		$parent.append(
			'<div id="nefos-searchContainer">' +
				'<div id="nefos-searchLens"></div>' +
				'<input id="nefos-search" type="text" value="' + nefos._('searchTipp') + '" onClick="$(\'#nefos-search\').val(\'\')" style="float:left" onblur="$(\'#nefos-searchRight\').fadeOut(450)" onfocus="$(\'#nefos-searchRight\').fadeIn(450)"/>' +
				'<div id="nefos-searchRight" onClick="$(\'#nefos-search\').val(\'\')"></div>' +
				'<div style="clear:both"></div>' +
			'</div>'
		);
	},
	
	createWatchlistButton : function($parent) {
		$parent.append('<div id="nefos-watchlistButtonContainer">' +
			'<a href="javascript:nefos.PageInstance.openWatchlist()">' +
				'<div id="nefos-watchlistButtonIcon"></div>' +
				'<div id="nefos-watchlistButtonText"></div>' +
				'<div style="clear:both;"></div>' +
		'</a></div>');
		
		this.$target.append('<div id="nefos-watchlistContainer"><div id="nefos-watchlistContent"></div></div>');
	},
	
	createLanguageButtons : function(langConfig){
		var outer = this;
		
		var langs = langConfig.split(",");
		var html = '<div id="nefos-languageSwitcher">';
		
		for(lang in langs){
			html += '<img id="' + langs[lang] + '" title="' + nefos._('lang_' + langs[lang]) + '">';
		}
		
		this.$target.append(html + '</div>');
		
		$('#nefos-languageSwitcher > img').each(function(){
			var lang = $(this).attr('id');
			
			$(this).addClass('nefos-languageFlag');
			$(this).attr('src', 'http://mapservices.eu/nefos/static/img/flags/flag-' + lang + '.png');
			
			$(this).click(function(){
				if(nefos.Lang.language != lang){
					window.location.href = 'http://' + document.domain + '/' + lang;
				}
			});
		});
	},
	
	createSiteStructure : function() {
		var outer = this;
		
		if (this.settings.site.includeCSS) {
			this.includeCSS(this.getPageCSS("combined.css"));
			
			if (nefos.Browser.oldIe) {
				this.includeCSS(this.getFullRequestPath() + "/contwise/css/leaflet.ie.css");
			}
		}
		
		if (this.settings.site.createFooterPanel) {
			this.createDescription();
		}
		
		this.createCenter();
		
		if (this.settings.site.createToolsPanel) {
			this.createNorthPanel();
		}
		
		this.createMapContainer();
		this.createMapLayerSwitcher(); //TODO: get from maptypes hash in globals
		
		if (this.settings.site.createMapCategoryMenu) {
			this.createMapCategoryMenu(); //TODO: get from maptypes hash in globals
		}
		
		if (this.settings.site.createLanguageButtons) {
			this.createLanguageButtons(this.settings.site.createLanguageButtons);
		}
		
	},
	
	
	includeCSS : function(file) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", file);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	},
	
	unloadCSS : function(file) {
		var targetElement = "link"; // in case of css this will be "link"
		var targetAttr = "href"; // in case of css this will be "href"

		var allCtrl = document.getElementsByTagName(targetElement);
		for (var i=allCtrl.length; i>=0; i--)  { //search backwards within nodelist for matching elements to remove
			if (allCtrl[i] && allCtrl[i].getAttribute(targetAttr)!=null && allCtrl[i].getAttribute(targetAttr).indexOf(filename)!=-1) {
				allCtrl[i].parentNode.removeChild(allCtrl[i]);
			}
		}
	},
	
	/**
	 * Whole fullscreen overview initialisation stuff follows
	 */
	initFullscreenOverview : function() {
		if (nefos.Globals.fullscreenOverview) {
			this.createOverviewButton();
			this.createGlobeViewerButton();
			this.initOverviewSwitcher();
			this.initGlobeViewerSwitcher();
			this._initFullscreenEventHandler();
			this._initOverviewTooltip();
		}
	},
	
	createOverviewButton : function() {
		if (!$("#nefos-mapOverviewButton").get(0)) {
			$("#nefos-outerCenter").append("<div id='nefos-mapOverviewButton' class='leaflet-control-zoom'><i class='nefos-fontImage-grid nefos-mapOverviewIcon'></i></div>");
		}
	},
	
	createGlobeViewerButton : function() {
		if (!$("#nefos-globeViewerButton").get(0)) {
			$("#nefos-outerCenter").append("<div id='nefos-globeViewerButton' class='leaflet-control-zoom'><i class='nefos-fontImage-globe nefos-globeViewerIcon'></i></div>");
		}
	},
		
	closeFullscreenOverview : function() {
		if (this.fullscreenOverview) {
			this.fullscreenOverview.destroy();
			this.$fullscreenOverviewBg.fadeOut("fast", function() {
				$(this).remove();
			});
			this.fullscreenOverview = null;
			this.disableOverview = false;
			this.showMapControls();
			$("#nefos-mapMenu").animate({top: 0}, 700);
		}
	},

	
	_loadFullscreenImages : function(imagesToLoad) {
		var outer = this;
		if (imagesToLoad.length > 0) {
			this.dataService.getMediumsByResourceIds(
					{"resIds" : imagesToLoad}, 
					function(data) {
						outer.fullscreenOverview.setResourcesMediums(data);
					}
				);
		}
	},

	_initFullscreenEventHandler : function() {
		var outer = this;
	
		this.firstCat = true;

		//TODO: make muchos better!
		this.addEventListener("categoryHide", function(cat) {
			if (outer.fullscreenOverview) {
				outer.fullscreenOverview.removeGroup(cat.choppedOrderNr);
				outer.fullscreenOverview.scrollToTop();
			}
		});
		
		this.addEventListener("categoryShow", function(cat, res) {
			if (outer.fullscreenOverview) {
				outer._addFullscreenCategory(cat, res);
			}
			else {
				if (outer.firstCat) {					
					outer.overviewTooltip.moveIn(outer._getAnimDirection(30, true));
					outer.firstCat = false;
				}
			}
		});
		
		this.addEventListener("reset", function() {
			outer.closeFullscreenOverview();
		});
		

	},
	
	_addFullscreenCategory : function(cat, res) {
		this._orderResByName(res);
			
		var imagesToLoad = [];
		
		var icon = cat.icon;

		if (this.getParentCategory(cat) != null) {
			icon = this.getParentCategory(cat).icon;
		}
		
		var grp = {
		        cat: cat,
				resources: res,
				resIdx: {},
				icon: icon
		};
		for (var i=0;i<res.length;i++) {
			grp.resIdx["" + res[i].id]=i;
			this.setResourceObjectType(res[i]);
			
			if (!res.images) {
				imagesToLoad.push(res[i].id);
			}
		}
		
		this.fullscreenOverview.addGroup(cat.choppedOrderNr, grp, true);
		this._loadFullscreenImages(imagesToLoad);
	},
	
	_prepareFullscreenResources : function() {
		var groupedRes = {};	
		var imagesToLoad = [];
		
		//get current ressources
		var orderedRes = this._filterResNotInCategory(this.map.resources, this.getHomepageCategoryId());
		this._orderResByName(orderedRes);
		
		//group by main categories
		for (var i=0;i<orderedRes.length;i++) {
			var res = orderedRes[i];
			var resCatIds = res.content.categories;
		
			for (var j=0;j<resCatIds.length;j++) {
				var resCat = this.getCategoryById(resCatIds[j]);
				if (resCat.choppedOrderNr.length <= 5) {
					var key = resCat.choppedOrderNr;
					
					if (!groupedRes[key]) {
						var icon = resCat.icon;
						if (this.getParentCategory(resCat) != null) {
							icon = this.getParentCategory(resCat).icon;
						}
						
						groupedRes[key] = {
							cat: resCat,
							resources: [],
							resIdx : {},
							icon : icon
						};
					}
					
					var idx = groupedRes[key].resources.length;
					groupedRes[key].resources[idx]=res;
					groupedRes[key].resIdx["" + res.id]=idx;
				}
			}
			
			if (!res.images) {
				imagesToLoad.push(res.id);
			}
			
			this.setResourceObjectType(res);
		}
		this._loadFullscreenImages(imagesToLoad);
		
		return groupedRes;
	},

	_initOverviewTooltip : function() {
		var position = this._getAnimDirection(-250, true);
		//position["top"] = 175;
	
		var arrowOffset = 10;
		
		if (this.settings.interfaceDir == "left") {
			arrowOffset = 102;
		}
		this.overviewTooltip = new nefos.ui.Tooltip("nefos-overviewHelpText", "overviewHelpText", {
			position: position, 
			width: 200,
			arrowOffset : arrowOffset
		});
		var $center = $("#nefos-outerCenter");
		$center.append(this.overviewTooltip.render($center));
	},
	
	_showFullscreenDetail : function(group, res, resIdx, prevRes, nextRes) {
		var outer = this;
	
		if (nefos.Globals.GetObjectType(res.content.objectType) == nefos.Globals.ResourceType.Camera) {
			outer._openWebcam(res);
			return;
		}
		
		if (outer.fullscreenOverview.visible) {
			outer.fullscreenOverview.moveOut();
		}
		
		var showDetail = function(clone) {
			clone.settings.visible = true;
			
			var mapTypeKey = outer.map.currentMapTypeKey;
			var mapType = jQuery.extend({}, nefos.Globals.mapTypes[mapTypeKey]);
			
			outer.fullscreenOverviewDetail = new nefos.ui.ResourceOverviewDetail(null, {
				mapTypeKey: mapTypeKey,
				mapType: mapType,
				resource: clone,
				previousResource: prevRes,
				nextResource: nextRes
			})
			outer.fullscreenOverviewDetail.setMargin(70, 150, 30, 150);
			outer.$fullscreenOverviewBg.append(outer.fullscreenOverviewDetail.render(outer.$fullscreenOverviewBg));
			outer.fullscreenOverviewDetail.afterDomInsert();
			
			outer.fullscreenOverviewDetail.addEventListener("detailClose", function() {
				outer.fullscreenOverviewDetail.animatedDestroy(function() {
					outer.fullscreenOverview.moveIn();
					outer.fullscreenOverview.resizeToParent();
					outer.fullscreenOverviewDetail = null;
				});
			});
			
			var pageResource = function(pageRes) {				
				outer.fullscreenOverviewDetail.animatedDestroy(function() {
					var idx = outer.fullscreenOverview.resources[group.settings.orderNr].resIdx[pageRes.id];		
					
					var nextRes1 = null, prevRes1 = null;
					if (idx > 0) {
						prevRes1 = outer.fullscreenOverview.resources[group.settings.orderNr].resources[idx-1];
					}
					if (idx < outer.fullscreenOverview.resources[group.settings.orderNr].resources.length-1) {
						nextRes1 = outer.fullscreenOverview.resources[group.settings.orderNr].resources[idx+1];
					}
					
					outer._showFullscreenDetail(group, pageRes, idx, prevRes1, nextRes1);
				});
			};
			
			
			outer.fullscreenOverviewDetail.addEventListener("showNextResource", function(nextRes) {
				pageResource(nextRes);
			});
			
			outer.fullscreenOverviewDetail.addEventListener("showPreviousResource", function(prevRes) {
				pageResource(prevRes);
			});
			
			outer.fullscreenOverviewDetail.addEventListener("toggleBookmark", function(bookmarkRes) {
				outer.toggleBookmark(bookmarkRes);
			});
		};		
		
		if (res.hasLinkedPolyline()) {
			outer._loadPolylinePoints(res, function(resource) {
				showDetail(resource.clone());
			});
		}
		else {
			showDetail(res.clone());
		}
		
		
	},

	showFullscreenOverview : function() {
		var outer = this;
		
		var $outerCenter = $("#nefos-outerCenter");

		this.fullscreenOverview = new nefos.ui.ResourceOverview("resourceOverview");
				
		this.$fullscreenOverviewBg = $("<div class='nefos-ui-resourceOverview-background'></div>");
		$outerCenter.append(this.$fullscreenOverviewBg);
		
		this.$fullscreenOverviewBg.bind("mousewheel", function(event) {
			event.cancelBubble = true;
			event.returnValue = false;

			//e.stopPropagation works only in Firefox.
			if (event.stopPropagation) {
				event.stopPropagation();
				event.preventDefault();
			}
		});
		
		
		this.fullscreenOverview.setResources(this._prepareFullscreenResources());
		this.fullscreenOverview.setMargin(70, 150, 30, 150);
		this.$fullscreenOverviewBg.append(this.fullscreenOverview.render(this.$fullscreenOverviewBg));
		
		this.fullscreenOverview.afterDomInsert();
		this.fullscreenOverview.fadeInElements();
		
		this.fullscreenOverview.addEventListener("resourceClick", function(group, res, resIdx, prevRes, nextRes) {
			outer._showFullscreenDetail(group, res, resIdx, prevRes, nextRes);
		});
		
		this.fullscreenOverview.addEventListener("overviewClose",function() {
			outer.closeFullscreenOverview();
		});
		
		this.closeResDetail();
		this.disableOverview = true;
		this.hideMapControls();
	},
	
	hideMapControls : function() {
		$(".leaflet-control-attribution, .nefos-mapTypeSwitcher, .leaflet-control-zoom").fadeOut();
	},
	
	showMapControls : function() {
		$(".leaflet-control-attribution, .nefos-mapTypeSwitcher, .leaflet-control-zoom").fadeIn();
	},
	
	resizeFullscreenOverview : function() {
		var $outerCenter = $("#nefos-outerCenter");
		
		var h = nefos.CssInt($outerCenter, "height");
		var w = nefos.CssInt($outerCenter, "width");
		
		this.$fullscreenOverviewBg.css({width: w +"px", height: h +"px"});
		
		this.fullscreenOverview.updateScrollbars();
		if (this.fullscreenOverviewDetail) {
			this.fullscreenOverviewDetail.updateScrollbars();
		}
		
	},
	
	/** globe viewer 3d stuff */
	onGlobeViewerClick : function() {
		var outer = this;
		
		this.overviewTooltip.moveOut();
		this.hideMapControls();
		
		$("#nefos-mapContainer").hide();
		this.globeViewer = new nefos.GlobeViewer("#nefos-outerCenter", {
			center: this.map.getCenter(),
			autoLoad: true,
			heightOffset: this.mapOffsetTop
		});
		
		this.addEventListener("categoryShow", function(cat, res) {
			if (this.globeViewer) {
				this.globeViewer.addResources(res);
			}
		});
		
		this.addEventListener("categoryHide", function(cat) {
			if (this.globeViewer) {
				this.globeViewer.removeResourceCb(this.getCheckRemoveResCb());
			}
		});
		
		this.globeViewer.addEventListener("resourceClick", function(resource) {
			outer.closeResDetail();
			outer.showResDetail(resource);
		});
		
		this.addEventListener("resourceClick", function(resource) {
			this.globeViewer.flyToResource(resource);
		});
		
		this.addEventListener("reset", function() {
			this.globeViewer.reset();
		});
		
		this.globeViewer.addEventListener("close", function() {
			this.destroy();
			outer.globeViewer = null;
			
			$("#nefos-mapContainer").show();
			outer.showMapControls();
		});
		
	},
	
	
	/** Various initialization methods
	 * ======================================================
	 */
		
	initStartPageLang : function(){
		var outer = this;
		
		this.reloadWatchlistFromStorage(function(){
			outer.updateWatchlistString();
		});
	},
	
	initLayout : function() {
		alert("function initLayout not implemented!");
	},
	
	initMap : function() {
		var outer = this;
		
		this.map = new nefos.LeafletMaps("#nefos-mapContainer", {
			zoomLevel: outer.settings.mapZoomLevel,
			center: outer.settings.mapCenter,
			routePositionIcon: "http://mapservices.eu/nefos/static/img/mapIcons/zaz/route_position.png",
			zoomControl: this.settings.zoomControl,
			attributionControl: this.settings.attributionControl,
			trackResize: this.settings.trackResize,
			enableHighlight: this.settings.enableHighlight,
			minZoom: 0,
			maxZoom: 18
		});
		
		this.map.addMapTypes(nefos.Globals.mapTypes);
		
		this.mapCluster = new nefos.MapCluster(this.map, {
			maxClusterZoomLevel: -1,
			maxClusterSize: nefos.Globals.maxClusterSize || 8,
			clusterItemLabelWidth: 32,
			gridSize: 100,
			stackItemCallback: function(resource) {
					var type = resource.content.objectType;
					
					var getDifficultyPanel = function(resource){
						var color = resource.geoObjects[0].settings.strokeColor;
						var html = '<div class="nefos-difficultyBubble" style="background-color:' + color + ';"></div><div style="float:left;">';
						var diff = nefos.PageInstance.getDifficultyString(resource);
						
						if(diff != ''){
							html += diff;
						}
						else{
							return "";
						}
						
						return html + '</div><div style="clear:both;"></div>';
					};
					
					if(nefos.Globals.GetObjectType(type) == nefos.Globals.ResourceType.ServiceProvider && resource.content.stars){
						return nefos.components.GetCorrectedSpName(resource.getName()) + '<br/>' + resource.content.stars;
					}
					else if(nefos.Globals.GetObjectType(type) == nefos.Globals.ResourceType.ServiceProvider){
						return nefos.components.GetCorrectedSpName(resource.getName());
					}
					else if(nefos.Globals.GetObjectType(type) == nefos.Globals.ResourceType.Route){
						return resource.getName() + '<br/>' + getDifficultyPanel(resource);
					}
					return resource.getName();
			},
			orderingCallback: function(resources){
				var ordered = {};
				
				var putIntoHash = function(key, val){
					if(!ordered[key]){
						ordered[key] = [];
					}
					ordered[key].push(val);
				};
				
				for(var i=0;i<resources.length;i++){
					if(nefos.Globals.GetObjectType(resources[i].content.objectType) == nefos.Globals.ResourceType.Route){
						var color = resources[i].geoObjects[0].settings.strokeColor;
						var diff = nefos.PageInstance.getDifficultyString(resources[i]);
						
						if(diff != ''){
							putIntoHash(diff, resources[i]);
						}
						else{
							putIntoHash(nefos._('other_category'), resources[i]);
						}
					}
					else{
						putIntoHash(nefos._('other_category'), resources[i]);
					}
				}
				
				return ordered;
			},
            mobile: this.settings.mobileCluster
		});
		
		this.map.addEventListener("mapLoad", function() {
			outer.mapLoadComplete = true;
			outer.checkInitialisationComplete();
			outer.emitEvent("mapLoad", outer.map);
		});

		this.map.addEventListener("mapMove", function() {
			outer.displayResources();
		});
		
        
        this.map.addEventListener("markerMouseOver", function(resource, marker){
        	if (outer.settings.showFluentInterface) {
        		outer.showResInfo(resource);
        	}
        	else {
        		outer._loadGeoObjectPoints(resource);
        	}
        	outer.emitEvent("resourceMouseOver", resource, marker);
        });

        this.map.addEventListener("markerMouseOut", function(resource, marker){
        	if (outer.settings.showFluentInterface) {
        		outer._hideGeoObject(resource);
        		outer.closeResInfo();
        	}
        	else {
        		outer._hideGeoObject(resource);
        	}
        	outer.emitEvent("resourceMouseOut", resource, marker);
        });

        this.map.addEventListener("markerClick", function(resource, marker){
        	if (outer.settings.showFluentInterface) {
        		outer.showResDetail(resource);
        	}
        	outer.emitEvent("resourceClick", resource, marker);
        });	

		this.map.loadMap(); //necessary to load afterwards, so that event listener maybe registered!
		
		if (nefos.Globals.fullscreenOverview) {
			this.initClusterOverview();
		}
	},
	
	initSearch : function() {
		var outer = this;
		
		$('#nefos-search').keypress(function(event){
			if(event.keyCode == 13){
				outer.search($('#nefos-search').val());
			}
		});
		
		$('#nefos-searchLens').click(function(event){
			outer.search($('#nefos-search').val());
		});
		
		this.$target.append('<div id="nefos-searchResult"></div>');
		
		$('#nefos-mapContainer').click(function(){
			outer.hideSearchResult();
			outer.hideWatchlistResult();
		});
	},
	
	initDateLine : function(){
		var outer = this;
		
		if(!this.dateLine && this.getDateLineInstance){
			this.getDateLineInstance();
		}
		
		$('div.nefos-dateLineSpanButton').click(function(){
			var selection = $(this).attr('id');
			
			$('div.nefos-dateLineSpanButton').removeClass("nefos-dateLineSpanButtonSelected");
			$(this).addClass("nefos-dateLineSpanButtonSelected");
			
			if(selection == "week"){
				outer.getDateLineInstance(7);
			}
			else if(selection == "weeks"){
				outer.getDateLineInstance(14);
			}
			else if(selection == "month"){
				outer.getDateLineInstance(31);
			}
			else if(selection == "year"){
				outer.getDateLineInstance(365);
			}
		});
	},
	
	initMenu : function(initialLoading) {
		var outer = this;
		var $mapMenu = $("#nefos-mapMenu");
		var cat;
		var html = '';
		var mainEntryCount = 0;
		var type;
		
		var init = function(){
			var categories = outer.getOrderedCategories(outer.map.getMapTypeName());
			
			for(var i=0;i<categories.length;i++){
				cat = categories[i];
				
				type = outer.getCategoryType(categories, i);
				
				if(outer.submenuClose(categories, i)){
					html += '</ul></li>';
				}
				
				if(type == 'main'){
					html += '<li class="nefos-mainMenuButton" id="nefos-categoryMenu_' + cat.id + '">' +
						'<div class="nefos-mainMenuButtonInner" onmouseout="javascript:nefos.PageInstance.hideCategoryName()" onmouseover="javascript:nefos.PageInstance.showCategoryName(' + cat.id + ')" onclick="nefos.PageInstance.toggleCategory(' + cat.id + ')" style="background-image:url(' + cat.icon + ')"></div>' + 
						'</li>';
					mainEntryCount++;
				}
				else if(type == 'parent'){
					html += '<li id="nefos-categoryMenu_' + cat.id + '" class="jd_menu_submenu nefos-mainMenuButton" onmouseout="javascript:nefos.PageInstance.hideCategoryName()" onmouseover="javascript:nefos.PageInstance.showCategoryName(' + cat.id + ')">' + 
					'<div class="nefos-mainMenuButtonInner" style="background-image:url(' + cat.icon + ')"></div>' +
					'<ul class="jd_menu_submenu">';
					mainEntryCount++;
				}
				else{
					if(cat.icon && cat.icon != ''){
						html += '<li id="nefos-categoryMenu_' + cat.id + '"><img src="' + cat.icon + '" align="absmiddle" style="width:20px;float:left;"><div class="nefos-menuTitle">' + cat.name + '</div><div style="clear:both;"></div></li>';
					}
					else{
						html += '<li id="nefos-categoryMenu_' + cat.id + '">' + cat.name + '</li>';
					}
					
					//last category in a tree is sub
					if(categories.length-1 == i){
						html += '</ul></li>';
					}
				}
			}
			
			$mapMenu.html('<ul id="nefos-menu-globalnav" class="jd_menu">' + html + '</ul><div id="nefos-reset"><img src="' + outer.getPageImage("reset.png") + '" align="absmiddle" onclick="nefos.PageInstance.resetCategories(true)" onmouseover="this.src=\'' + outer.getPageImage("reset_black.png") + '\'" onmouseout="this.src=\'' + outer.getPageImage("reset.png") + '\'"></div><div style="clear:both"></div>');
			
			//width of menu: main entys plus reset enty and spacing between them
			var width = (mainEntryCount + 1) * 42 + 40;
			$mapMenu.css('width', width + 'px');
			
			var animate = function (show) {
				if (show) {
					$(this).slideDown('normal').show();
				}
				else {
					$(this).slideUp('normal');
				}
			};
			
			//use delegate for top menu
			$("ul.jd_menu li.jd_menu_submenu ul").on("click", "li", function(event) {
				var $this = $(event.target);
				if (!$this.is("li")) {
					$this = $this.parents("li");
				}
				var id = $this.attr('id');
				outer.toggleCategory(parseInt(id.replace(/[^\d.]/g, "")));
			});
			
			/*$('ul.jd_menu > li.jd_menu_submenu').each(function(){
				//setting click event for submenus
				$(this).find('ul > li').each(function(){
					$(this).click(function(){
						var id = $(this).attr('id');
						outer.toggleCategory(parseInt(id.replace(/[^\d.]/g, "")));
					});
				});
			});*/
			

			$('ul.jd_menu').jdMenu({
				onAnimate: animate
			}).find("li").disableSelection();
	
			//ATTENTION: Untested in IE! [FF]
			var $menuContainer = $("<div style='width:100%;position:absolute;top:0px'></div>");
			$menuContainer.append($mapMenu);
			
			$("#nefos-outerCenter").append($menuContainer);
	
			if (nefos.oldIe == 8) {
				$mapMenu.css({
					"-ms-filter": "progid:DXImageTransform.Microsoft.Shadow(color='#585858', Direction=210, Strength=3) progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
					filter: "progid:DXImageTransform.Microsoft.Shadow(color='#585858', Direction=210, Strength=3) progid:alpha(opacity=90);"
				});
			}
			
			$("#nefos-mapMenu").show();
			//event required for toggling auto visible menus.
			outer.emitEvent("initMenu");
		};
		
		//ATTENTION:
		//Don't mess with the menu opacity, f.ex. $("#mapMenu").css("opacity", 1). This breaks the menu in IE 8 completly!
		//not animate on first loading
		if(!initialLoading && !$("#nefos-mapMenu").is(":animated")){
			$("#nefos-mapMenu").fadeOut('slow',function(){
				init();
			});
		}
		else{
			init();
		}
	},
	
	initClusterOverview : function() {
		var outer = this;
		
		this.mapCluster.addEventListener("clusterClick", function(resources, cluster, event) {
			if (resources.length > 20) {
				outer.map.fitBounds(cluster.getBounds());
				return;
			}
			else {
				var p = outer.map.getPoint(cluster.clusterOverlay.getPosition());
				outer.showClusterAnimation(p, resources);
			}
		});
		
		this.addEventListener("reset", function() {
			if (outer.clusterPanel) {
				outer.clusterPanel.animatedDestroy(outer._getAnimDirection("-440px"));
			}
		});
	},
	
	showClusterAnimation : function(screenPos, resources) {
		var outer = this;
		
		var targetY = screenPos.y - 100;
		if (targetY < 0) {
			targetY = screenPos.y + 100;
		}
		var targetX = screenPos.x;

		var max = Math.min(resources.length, 5);

		var shuffled = resources.slice(0);
		nefos.ArrayShuffle(shuffled);
		
		for (var i=0;i<max;i++) {
			var resource = shuffled[i];
			var img = resource.getClusterGeoObject().getClusterIcon().image;
			var $img = $("<img class='nefos-clusterItemFlyer' src='" + img + "'>");

			var rndX = nefos.GetRandomInt(-20,20);
			var rndY = nefos.GetRandomInt(-20,20);

			$("#nefos-outerCenter").append($img);

			var sideAnimation = {};
			if (outer.settings.interfaceDir == "right") {
				sideAnimation.left=outer.map.$mapContainer.width() - 200;
			}
			else{
				sideAnimation.left=200;
			}

			sideAnimation.top = 200 - rndY;
			sideAnimation.opacity = 0;
			rotation: 360

			$img.delay((200+rndY)*i).css({"left" : screenPos.x, "top" : screenPos.y}).animate({
				opacity: 0.7,
				top: targetY + rndY,
				left: targetX + rndY,
				rotation: 360
			}, 
			{
				duration: 500,
				step: function(now, fx) {
				      $(this).css({"transform": "rotate("+now+"deg)"});
				}
			})
			.delay(50)
			.animate({top: targetY + (targetY < screenPos.y ? +20 : -20)}, 300)
			.animate(sideAnimation, 500, function(){
				$(this).remove();
			});
		}

		window.setTimeout(function() {
			var res = resources.slice(0)
			res = outer.mapResByCategory(res);
	
			if (outer.clusterPanel) {
				outer.clusterPanel.animatedDestroy(outer._getAnimDirection("-440px"));
			}
	
			outer.clusterPanel = new nefos.ui.ResourceList(null, {
				resources: res,
				showTab: false,
				height: $(document).height() - nefos.Globals.panelMargin,
				category: {
					name: nefos._("clusterItems")
				},
				expandableGroups: false
			});
			$("#nefos-outerCenter").append(outer.clusterPanel.render($("#nefos-outerCenter")));
			outer.clusterPanel.afterDomInsert();
			outer.clusterPanel.moveIn(outer._getAnimDirection("0px"));
	
			outer._registerStdListPanelEvents(outer.clusterPanel);
	
			outer.clusterPanel.addEventListener("closeDialog", function() {
				outer.clusterPanel.animatedDestroy(outer._getAnimDirection("-440px"));
				outer.clusterPanel = null;
			});
	
			outer.clusterPanel.addEventListener("reset", function() {
				outer.clusterPanel.animatedDestroy(outer._getAnimDirection("-440px"));
				outer.clusterPanel = null;

			});
		}, 700);
	},
	
	onDateLineChange : function(selection){
		var eventId = this.getCategoryIdByExportName("events");
		
		this.selectedCategories = $.grep(this.selectedCategories, function(val) {
			return val != eventId; }
		);
		
		if(this.map){
			this.updateResources();
		}
		this.selectedCategories.push(eventId);
		this.displayResources(eventId);
	},
	
	onMapTypeSwitch : function(lastMapTypeSelection){
		if (this.map.getMapType()) {
			if ((!this.map.getMapTypeName().match(/winter$/) && lastMapTypeSelection.match(/winter$/)) || (this.map.getMapTypeName().match(/winter$/) && !lastMapTypeSelection.match(/winter$/))) {
				this.resetCategories(true);
				this.initMenu();
			}
		}
	},
	
	initInfoField : function() {
		var outer = this;
		
		var infoField = "<div id=\"nefos-infoField\">" +
				"<div id=\"nefos-infoField-north\"></div>" +
				"<div id=\"nefos-infoField-img\"></div>" +
				"<div id=\"nefos-infoField-center\"></div>" +
			"</div>";
		
		$("#nefos-outerCenter").append(infoField);
		$("#nefos-outerCenter").append("<a href='javascript:nefos.PageInstance.closeResInfo()' id='nefos-closeInfoField'><img style='border:none;' src='" + this.getPageImage("close.png") + "' alt='close icon' /></a>");
	},
	
	//check if category is a main and last was a sub
	submenuClose : function(categories, index){
		//category is a main
		if(categories[index].orderNr % nefos.categoryRootOrderNr == 0){
			//last was a sub
			if(categories[index-1] && categories[index-1].orderNr % nefos.categoryRootOrderNr != 0){
				return true;
			}
			return false;
		}
		return false;
	},
	
	showPreloadedResources : function(){
		if(this.settings.loadCategory != null && this.settings.loadCategory != ''){
			return true;
		}
		if(this.settings.loadResource != null && this.settings.loadResource != ''){
			return true;
		}
		
		return false;
	},
	
	checkInitialisationComplete : function(){
		if(!this.mapLoadComplete || !this.categoryLoadComplete || !this.mandatorConfigLoadComplete || !this.objectTypesLoadComplete){
			return;
		}
		
		this.initMenu(true);
		
		if(this.getHomepageCategoryId() != null){
			this.displayResources(this.getHomepageCategoryId(), false);
		}
		
		if(this.getCategoryIdByExportName("showAlways") && !this.showPreloadedResources()){
			this.displayResources(this.getCategoryIdByExportName("showAlways"), false);
		}
		
		if(this.settings.loadCategory != null && this.settings.loadCategory != ''){
			this.toggleCategory(parseInt(this.settings.loadCategory));
		}
		else{
			//loading categoryOverview for sitemap
			var idx = window.location.href.lastIndexOf('/resources/');
			if(idx > 0){
				var params = window.location.href.slice(idx + 1).split('/');
				this.toggleCategory(parseInt(params[1]));
			}
		}
		if(this.settings.loadResource != null && this.settings.loadResource != ''){
			this._loadAndShowRes(this.settings.loadResource);
		}
		else if(this.settings.loadForeignResource != null && this.settings.loadForeignResource != ''){
			this._loadAndShowRes(this.settings.loadForeignResource, true);
		}
		else{
			//loading detailResource for sitemap
			var idx = window.location.href.lastIndexOf('/detail/');
			if(idx > 0){
				var param = window.location.href.slice(idx + 1).split('/')[1];
				param = param.split("#")[0];
				this._loadAndShowRes(param, !Number(param));
			}
		}
		
		this.emitEvent("initialisationComplete");
	},
	
	onCategoriesLoad : function(){
		this.categoryLoadComplete = true;
		this.checkInitialisationComplete();		
	},
	
	initInfoContainer : function() {
		var infoContainer = "<div id=\"nefos-infoContainer\">" +
								"<div id=\"nefos-info-north\"></div>" +
								"<div id=\"nefos-info-center\">" +
								"<div id=\"nefos-info-center-west\"></div>" +
								"<div id=\"nefos-info-center-east\"></div>" +
								"<div style=\"clear:both;\"></div></div>" +
								"<div id=\"nefos-info-south\"></div>" +
							"</div>";
		
		$("#nefos-outerCenter").append(infoContainer);
		//TODO: Check works this in IE??
		$("#nefos-outerCenter").append("<a href='javascript:nefos.PageInstance.closeResDetail()' id='nefos-closeInfoContainer'><img style='border:none;' src='" + this.getPageImage("close.png") + "' alt='close icon' /></a>");
	},
		
	/** 
	* Global event listeners for the initialization stage
	* =====================================================
	*/
	onMapLoad : function() {
		this.initInfoContainer();
		this.initInfoField();
		this.initHeightProfile();
		this.initSearch();
		this.startEventLoop();
		this.emitEvent("mapLoadComplete");
	},
	
	onMandatorConfigLoad : function(data) {
		var outer = this;
		
		this.mandatorConfig = data;
		this.dataService.setIconConfig(data.mapIconConfig);
		this.dataService.setIconShadowConfig(data.mapIconShadowConfig);
		
		this.dataService.setClusterIconConfig({
			 imageFunction : function(img) { return img; }
		});
		
		outer.initMap();
	
		outer.map.setIconConfig(data.mapIconConfig);
		outer.map.setIconShadowConfig(data.mapIconShadowConfig);
		
		this.settings.mapType = this.settings.mapType || this.getMapTypeBySeason();
		
		if(outer.settings.mapType != null && outer.settings.mapType != ''){
			outer.setMapType(outer.settings.mapType);
		}
		
		outer.mandatorConfigLoadComplete = true;
		outer.checkInitialisationComplete();
		
		$('#nefos-headerLogo').click(function(){
			if(data['officialSite'] && data['officialSite'] != '' && data['officialSite'] != 'http://'){
				window.open(data['officialSite']);
			}
		});		
		
		if (nefos.RoutingService) {
			outer.routingService = new nefos.RoutingService({
				routeMarker: {
					icon: data.mapIconConfig,
					shadow: data.mapIconShadowConfig
				},
				language: nefos.Lang.language
			});
		}
		
	},
	
	onObjectTypesLoad : function() {
		this.objectTypesLoadComplete = true;
		this.checkInitialisationComplete();
	},
		
	/**
	 * NEW event handling API
	 * =========================================================
	 */
	
	/**
	 * Show (small) info panel for resource.
	 * Loads images from server if necessary.
	 */
	showResInfo : function(resource) {
		if (!resource || !resource.id) {
			return;
		}
		
		//If the resource is already loaded in the detail or info panel, but show if detailContainer is closed
		if ((this.infoRes && this.infoRes.id == resource.id) || this.isDetailContainerVisible()) {
			//if detail of other resource is opened
			if(this.detailRes != resource.id && this.isDetailContainerVisible()){
				this._loadGeoObjectPoints(resource);
			}
			
			this.emitEvent("showResourceInfo", resource, true);
			
			this.infoRes = resource;
			
			return;
		}
				
		var outer = this;
		
		this.getResourcePictures(resource, function(){
			outer.closeResInfo();
			
			outer.emitEvent("showResourceInfo", resource, false);
			
			if (!nefos.Globals.fullscreenOverview) {
				nefos.components.InfoPanel({
					resource:resource,
					getPageImage: function(img){return outer.getPageImage(img);},
					getUploadImage: function(img, thumbnail){return outer.getUploadImage(img, thumbnail);},
					image: (resource.images.length ? resource.images[0] : null),
					categoryName: outer.categories[resource.content.categories[0]] ? outer.categories[resource.content.categories[0]].name : "",
					interfaceDir : outer._getAnimDirection("0px"),
					difficultyCallback: function(resource) {
						if (!outer.difficultyCallback) {
							return null;
						}
						//needed for testing if callback exists
						if(!resource){
							return true;
						}
						return outer.difficultyCallback(resource);
					}
				});
			}
			else {
				outer.setResourceObjectType(resource);
				outer.infoPanel = new nefos.ui.ResourceInfo(null, {
					resource: resource
				});
				$("#nefos-mapContainer").append(outer.infoPanel.render($("#nefos-mapContainer")));
				outer.infoPanel.afterDomInsert();
				outer.infoPanel.moveIn(outer._getAnimDirection("0px"));
			}
			
			outer.infoRes = resource;
			
			outer._loadGeoObjectPoints(resource);
		});
	},
	
    //For public API [FF]
    showResourceInfo : function(resource) {
    	return this.showResInfo(resource);
    },
	
	clearSearch : function(){
		if($('#nefos-search').val() == nefos._('searchHelpText')){
			$('#nefos-search').val('');
		}
	},
	
	/**
	 * Get the difficulty of a route by stroke color
	 * @param resource
	 * @returns {String}
	 */
	getDifficultyString : function(resource){
		var color = resource.geoObjects[0].settings.strokeColor;
		
		if(color == nefos.Globals.DifficultyColors.average){
			return nefos._("difficulty_average");
		}
		else if(color == nefos.Globals.DifficultyColors.easy){
			return nefos._("difficulty_easy");
		}
		else if(color == nefos.Globals.DifficultyColors.hard){
			return nefos._("difficulty_hard");
		}
		else if(color == nefos.Globals.DifficultyColors.winter){
			return nefos._("difficulty_winter");
		}
		else if(color == nefos.Globals.DifficultyColors.theme){
			return nefos._("difficulty_theme");
		}
		else{
			return "";
		}
	},

	_getAnimDirection : function(targetValue, inverse) {
		var edge = (this.settings.interfaceDir == "right" ? "right" : "left");
		if (inverse) {
			if (edge == "right") {
				edge = "left";
			}
			else {
				edge = "right";
			}
		}
		
		var anim = {};
		anim[edge] = targetValue;
		return anim;
	},
	
	/**
	 * Closes the info panel
	 */
	closeResInfo : function() {
		var outer = this;
		
		if (this.infoPanel) {
			this.emitEvent("closeResourceInfo");
			this.infoPanel.moveIn(outer._getAnimDirection("-260px"), function() {
				outer.destroy();
				outer.infoPanel = null;
			});
		}
		else {
			if ($('#nefos-closeInfoField').is(":visible")) {
				this.emitEvent("closeResourceInfo");
			}
			
			$('#nefos-closeInfoField').hide();
			
			
			
			$('#nefos-infoField').stop().animate(this._getAnimDirection("-260px"));
		}
		this._hideGeoObject(this.infoRes);
		this.infoRes = null;
	},
	
	/**
	 * load pictures of resource from server
	 */
	getResourcePictures : function(resource, cb){
		if (resource.images) {
			cb(resource.images);
		}
		else {
			this.dataService.getPicturesOfResource({
				resourceId: resource.id,
				language: nefos.Lang.language
			}, 
			function(data){
				resource.images = [];
				for(var id in data){
					resource.images.push(data[id]);
				}
				cb(resource.images);
			});
		}
	},
	
	_openWebcam : function(resource) {
		var width = 1200;
		var height = 900;
		
		this.closeResDetail();
		
		var popupType = 'img';
		//check id mediums are linked or a direct link is provided, because then we open it in a iframe (can't be opened directly)
		if(resource.content["direkter Link"] || (resource.images && resource.images.length > 0)){
			popupType = 'iframe';
			if(resource.content.width && resource.content.height){
				width = resource.content.width;
				height = resource.content.height;
			}
		}
		
		new PopupWindow('http://' + resource.content.Link, {
			type: popupType,
			iframeWidth: width,
			iframeHeight: height,
			parentContainer: this.$target
		});
		
		return;
	},

	
	/**
	 * Show detail panel of resource
	 */
	showResDetail : function(resource) {
		if (!this.settings.showFluentInterface) {
			return;
		}
		
		var outer = this;

		this.getResourcePictures(resource, function(){
			//directly open link if its an homepage or a camera
			if (nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Camera) {
				outer._openWebcam(resource);
				return;
			}
			else if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Homepage){
				outer.closeResDetail();
				window.open("http://" + resource.content.Link);
				return;
			}
			
			var cats = "";
			var first = true;
			for(id in resource.content.categories){
				if(!first){
					cats += ", ";
				}
				cats += outer.categories[resource.content.categories[id]].name;
				first = false;
			}
			
			outer.closeResDetail(true, resource.content.isLinkedResource);
			outer.closeResInfo();		//Close info panel
			outer._resetRoutingInfo();
			
			if (!nefos.Globals.fullscreenOverview) {
				nefos.components.DetailPanel({
					resource: resource,
					getPageImage: function(img){return outer.getPageImage(img);},
					getUploadImage : function(img, size) { return outer.getUploadImage(img, size); },
					getBookingLink: function(resource){return outer.getBookingLink(resource);},
					resourcesAvailiable: function(catId){return outer.resourcesAvailiable(catId);},
					resourceCategories: cats,
					generateBarcode: nefos.Globals.generateBarcode,
					mandatorConfig: outer.mandatorConfig,
					categories:	outer.categories,
					interfaceDir : outer._getAnimDirection("0px")
				});
			}
			else {
				if (outer.detailPanel) {
					outer.detailPanel.destroy();
				}
				outer.setResourceObjectType(resource);
				outer.detailPanel = new nefos.ui.ResourceDetail(null, {
					resource: resource,
					height: $(document).height() - nefos.Globals.panelMargin
				});
				$("#nefos-outerCenter").append(outer.detailPanel.render($("#nefos-outerCenter")));
				outer.detailPanel.afterDomInsert();
				outer.detailPanel.moveIn(outer._getAnimDirection("0px"));
				outer._initToolboxEvents(resource, outer.detailPanel); //hides non used menu items

				outer.detailPanel.addEventListener("closeDialog", function() {
					outer.detailPanel.animatedDestroy(outer._getAnimDirection("-440px"));
					outer.listPanel.preventClickEvent = false;
					outer.detailPanel = null;
				});
				
				var openLinkedResource = function(resource) {
					if (outer.linkedDetailPanel) {
						outer.linkedDetailPanel.moveOut(outer._getAnimDirection("-440px"), function() {
							outer.linkedDetailPanel.destroy();
							delete outer.linkedDetailPanel;
							openLinkedResource(resource);
						});
						return;
					}
					else {
						outer.setResourceObjectType(resource);
						outer.linkedDetailPanel = new nefos.ui.ResourceDetail(null, {
							resource: resource,
							height: $(document).height() - nefos.Globals.panelMargin
						});
						$("#nefos-outerCenter").append(outer.linkedDetailPanel.render($("#nefos-outerCenter")));
						outer.linkedDetailPanel.afterDomInsert();
						outer.linkedDetailPanel.moveIn(outer._getAnimDirection("0px"));
						outer._initToolboxEvents(resource, outer.linkedDetailPanel);

						outer.linkedDetailPanel.addEventListener("closeDialog", function() {
							outer.linkedDetailPanel.moveOut(outer._getAnimDirection("-440px"), function() {
								outer.linkedDetailPanel.destroy();
								delete outer.linkedDetailPanel;
								outer.detailPanel.moveIn(outer._getAnimDirection("0px"));
							});
							
						});
						
						outer.linkedDetailPanel.addEventListener("linkedResourceClick", function(linked2) {
							openLinkedResource(linked2);
						});
					}
					
				};
				
				outer.detailPanel.addEventListener("linkedResourceClick", function(linked) {
					outer.detailPanel.moveOut(outer._getAnimDirection("-440px"));
					openLinkedResource(linked);
				});
			}
						
			outer.detailRes = resource;
			
			var callback = function(resource) {
				
				if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Route) {
					outer._initMiniProfile(resource);
				}
				
				outer._createImageGallery(resource);
				outer._initToolboxEvents(resource);
								
				outer.showHighlight(resource);
				
				if(outer.map.getZoomLevel() < 15){
					outer.panToResource(resource, 15);
				}
				else{
					outer.panToResource(resource);
				}
				
				outer.setWindowHash("resourceDetail," + resource.id);
				outer.emitEvent("resourceDetailShow", resource);
				outer._resizeSidePanel();
			};

			outer._loadGeoObjectPoints(resource, function() {
				callback(resource);
			});
			
			outer.dataService.loadLinkedResources({
				resourceId: resource.id,
				language: nefos.Lang.language,
				loadCompleteResources: outer.getLoadFullResources(),
				cache: true
			}, function(data){
				var displayedResources = outer.dataService.generateResources(data, {
					doNotCluster: outer.getLoadFullResources(),
					showMarkerMenu: true,
					isLinkedResource: true
				});
				
				outer.map.addResources(displayedResources);

				if (outer.mapCluster) {
					outer.mapCluster.resetAndCluster(false);
				}

				if(displayedResources.length > 0){
					if (outer.detailPanel) {
						outer.detailPanel.setLinkedResources(displayedResources);
					}
					else {
						var html = '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('linkedResources') + '</div>';
						
						for(var i=0;i<displayedResources.length;i++){
							html += '<div class="nefos-overviewEntry"><div class="nefos-overviewIcon"><img src="' + outer.getMapIcon(displayedResources[i]) + '"></div><div class="nefos-overviewText nefos-linkedResourceText">' + displayedResources[i].content.name + '</div><div style="clear:both;"></div></div>';
						}
						
						$('#nefos-info-south').append(html + '</div>');
						
						$("#nefos-info-south").find(".nefos-overviewEntry").each(function(idx, el) {
							$(el).click(function(){
								outer.showResDetail(displayedResources[idx]);
							});
						});
						
						outer.initJsp(true);	
					}
				}
			});
		});
	},
	
	/**
	 * Closes detail panel on the right side
	 * Also resets overviewRes array, because overview is rendered in same container.
	 */
	closeResDetail : function(hidePolyline, isLinkedResource, destroyListPanel) {
		var outer = this;
		
		if (hidePolyline) {
			var resToHide = this.detailRes;
			
			this.overviewRes = null;
			this.detailRes = null;
			this.infoRes = null;
			
			this._hideGeoObject(resToHide);
		}
		if (nefos.Globals.fullscreenOverview && destroyListPanel) {
			if (this.listPanel) {
				this.listPanel.animatedDestroy(this._getAnimDirection("-440px"));
				this.listPanel = null;
				this.emitEvent("closeResourceOverview");
			}
		}
		else {
			if (nefos.Globals.fullscreenOverview) {
				if (this.listPanel && !hidePolyline) { //a bit of hack that detail overlays list
					this.listPanel.moveOut(this._getAnimDirection("-440px"), function() {
						outer.listPanel.preventClickEvent = false;
					});
					this.emitEvent("closeResourceOverview");
				}
				if (this.detailPanel) {
					this.detailPanel.animatedDestroy(this._getAnimDirection("-440px"));
					this.detailPanel = null;
					this.emitEvent("closeResourceDetail");
				}
				return;
			}
			
			if ($('#nefos-closeInfoContainer').is(":visible")) {
				this.emitEvent("closeResourceDetail");
			}
			
			$('#nefos-closeInfoContainer').hide();
			
			var edge = (this.settings.interfaceDir == "right" ? "right" : "left");
			
			$('#nefos-infoContainer').stop().animate(this._getAnimDirection("-430px"));
			
			$('#nefos-info-south').html("");
			$('#nefos-panelMenuContainer').remove();
			
			if (this.detailRes) {
				this.map.removeHighlight();
								
				/* OK: This should be set, otherwise polyline of detail object is left on the map when 
				 * category is toggled. BUT: than it's also hidden because when we recenter map on detail-load
				 * See the section in _loadGeoObjectPoints
				 * var polyline = this.detailRes.geoObjects[0];
				 * if(polyline.type == nefos.GeoObject.TYPE_POLYLINE) {
					polyline.setPermanentLine(false);
				}*/
			}
		}
		
		if (this.gallery) {
			this.gallery.stopAnimation();
		}
		
		//remove linked resources
		if(!isLinkedResource){
			for(idx in this.map.resources){
				if(this.map.resources[idx].content.isLinkedResource){
					this._hideGeoObject(this.map.resources[idx], true);
					this.map.removeResource(this.map.resources[idx]);
				}
			}
			this.mapCluster.resetAndCluster(true);
		}
	},
	
	initJsp : function(toTop){
		if (!$("#nefos-infoContainer")[0]) {
			return;
		}
		$("#nefos-infoContainer").easyScroll("update");
		
		if (toTop) {
			$("#nefos-infoContainer").easyScroll().scrollToPosition(0);
		}

		/*if ($('#nefos-infoContainer').data("jsp")) {
			$('#nefos-infoContainer').data("jsp").reinitialise();
			if(toTop){
				$('#nefos-infoContainer').data("jsp").scrollTo(0,0);
			}
		}
		else {
			$('#nefos-infoContainer').jScrollPane({showArrows:true});
		}*/
	},
	
	/**
	 * If the detail panel on the right is visible
	 * detailRes maybe set even when panel is hidden
	 * (show polyline after close)
	 */
	isDetailContainerVisible : function() {
		if ((this.listPanel && !this.listPanel.isHidden()) || this.detailPanel) {
			return true;
		}
		return (this.settings.interfaceDir == "right" ? nefos.CssInt($("#nefos-infoContainer"),"right") > -430 : nefos.CssInt($("#nefos-infoContainer"),"left") > -430);
	},

	
	/**
	 * @param resource
	 * Init the mini altitude profile in the resource detail panel
	 */
	_initMiniProfile : function(resource) {
		var outer = this;
		if (this.detailPanel) {
			this.detailPanel.addEventListener("altitudeProfileMouseMove", function(resource, polyline, pointIndex) {
				outer.map.setRoutePositionMarker(resource, polyline, pointIndex);
			});
			
			this.detailPanel.addEventListener("altitudeProfileMouseOut", function() {
				outer.map.hideRoutePositionMarker();
			});
		}
		else {
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Route && resource.geoObjects[0] && resource.geoObjects[0].points[0] && resource.geoObjects[0].points[0].altitude() > 0){
				this.profile.reset();
				this.displayMiniProfile(resource);
				this.profile.draw(resource);
			}
			else{
				$('#altProf').remove();
			}
		}
	},
	
	/**
	 *  @param resource
	 *  Create the image gallery in the resource detail panel
	 */
	_createImageGallery : function(resource) {
		var outer = this;
		
		var cb = function() {
			if (resource.images.length && resource.imageGallery !== false) {
				if (outer.detailPanel) {
					outer.detailPanel.setImages(resource.images);
				}
				else {
					var $galleryLi = $("<div class='nefos-imageGalleryRow'></div>");
					$('#nefos-info-north').append($galleryLi);
										
					outer.gallery = new nefos.ImageGallery($galleryLi, resource.images, {
						maxHeight: 600,
						maxWidth: 800,
			            imageFunction : function(img, size) {
			               return outer.getUploadImage(img, size);
			            },
			            parentContainer: outer.$target
					});
				}
			}
		};
		
		if (resource.images) {
			cb();
		}
		else {
			this.dataService.getPicturesOfResource({
				resourceId: resource.id,
				language: nefos.Lang.language
			}, function(data){
				resource.images = [];
				for(var id in data){
					resource.images.push(data[id]);
				}
				cb();
			});
		}
	},
	
	/**
	 * check if resources of given category are present on map
	 */
	resourcesAvailiable : function(category){
		var count = 0;
		var i;
		
		for(i=0; i<this.map.resources.length; i++){
			if(this.map.resources[i].content.categories && this.map.resources[i].content.categories[0] == category){
				count++;
			}
		}
		
		return count;
	},
	
	_showRoutingPanel : function(resource) {
		var outer = this;
		
		if (!$("#nefos-routingDetail").get(0)) {
			outer.$target.append('<div id="nefos-routingDetail"></div>');
		}
		
		$("#nefos-routingDetail").html("<legend>" + nefos._("startRouting") + "</legend>" +
				"<label id='nefos-routingStartLabel'>" + nefos._("routingStart") + "</label>" +
				"<div style='height:22px'><input type='text' id='nefos-routingStartInput'><div id='nefos-routingProgress' class='progress progress-success progress-striped active' style='display:none'><div class='bar' id='nefos-routingProgressBar' style='width: 5%;'></div></div>" +
				"<label>" + nefos._("routingEnd") + ": <b>" + resource.content.name + "</b></label>" +
				"<div id='nefos-routingDescription'></div>" + 
				"<button type='button' class='btn btn-success' id='nefos-startRoutingBtn'>" + nefos._("startRouting") + "</button>&nbsp;&nbsp;" +
				"<button type='button' class='btn' id='nefos-printRouteBtn' style='display:none'>" + nefos._("printRoute") + "</button>");
		
		var popup = new PopupWindow('#nefos-routingDetail', {
			type: 'div',
			elementWidth: 400,
			elementHeight: 240,
			animateResize: false,
			parentContainer: outer.$target
		});
		
		$("#nefos-routingStartInput").focus().keyup(function(e) {
			if(e.keyCode == 13) {
				$("#nefos-startRoutingBtn").click();
			}
		});
		
		var setRoutingInProgress = function(val) {
			$("#nefos-routingStartLabel").html("Start: <b>" + val + "</b>");
			$("#nefos-routingStartInput").hide();
			$("#nefos-routingProgress").fadeIn();
			$("#nefos-startRoutingBtn").addClass("disabled");
			$("#nefos-printRouteBtn").fadeOut();
		};
		
		var setRoutingFinished = function() {
			$("#nefos-routingProgress").fadeOut("normal", function() {
				$("#nefos-routingStartInput").show();
				$("#nefos-routingStartLabel").html("Start");
			});
			$("#nefos-startRoutingBtn").removeClass("disabled");
			$("#nefos-printRouteBtn").fadeIn();
		};
		
		var resizeRoutingPopup = function() {
			var bounds = popup.resizePopup(400, 800, "forceWidth");
			$("#nefos-routingDescription").css("height",(bounds.resizedH - 200) + "px");
		};
		
		if (outer.routingInfo) {
			outer.addUserMapObject(outer.routingInfo.polyline);
			$("#nefos-routingDescription").html(outer.routingInfo.description);
			$("#nefos-routingStartInput").val(outer.routingInfo.searchTermStart);
			resizeRoutingPopup();
		}	
			
		$("#nefos-startRoutingBtn").click(function() {
			var $this = $(this);
			
			if (!$this.hasClass("disabled")) {					
				var val = $("#nefos-routingStartInput").val();
				$("#nefos-routingProgressBar").width("33%");
				
				setRoutingInProgress(val);
				
				outer.routingService.geocode(val, function(data) {
					if (!data) {
						alert(nefos._("geocodeFailed"));
						setRoutingFinished();
						return;
					}
					
					var endPoint;
					if (resource.geoObjects[0].getType() == nefos.GeoObject.TYPE_MARKER) {
						endPoint = resource.geoObjects[0].getPosition();
					}
					else {
						endPoint = resource.geoObjects[0].points[0];
					}
					
					var doRouting = function(startPoint, endPoint, startIndex) {
						startIndex =  startIndex || 0;
						
						$("#nefos-routingProgressBar").width("66%");
						outer.routingService.route(startPoint, endPoint, function(route){
							if (!route) {
								var newIdx = startIndex + 1;
								var secondMatch = outer.routingService.getBestGeocodeMatch(data.rawData, newIdx);
								
								if (secondMatch != null) {
									doRouting(secondMatch.point, endPoint, newIdx);
								}
								else {
									alert(nefos._("routingFailed"));
									setRoutingFinished();
								}
								return;
							}
							
							if (outer.routingInfo) {
								outer.removeUserMapObject(outer.routingInfo.polyline);
							}
							
							$("#nefos-routingProgressBar").width("95%");
							outer.addUserMapObject(route.polyline);
							
							route.polyline.getStartMarker().addEventListener("drag", function(evt, resource, marker) {
								outer.removeUserMapObject(route.polyline);
								doRouting(evt.latLng, endPoint);
							});
							
							outer.map.fitBounds(route.polyline.getBounds(),true);
							
							$("#nefos-routingDescription").html(route.description);

							resizeRoutingPopup();
							setRoutingFinished();
							
							outer.routingInfo = route;
							outer.routingInfo.searchTermStart = val;
						});
					};
					
					doRouting(data.point, endPoint);					
					
				});
			}
		});
		
		$("#nefos-printRouteBtn").click(function() {
			var w=window.open();
			if(!w) {
				alert(nefos._("pleaseEnablePopups"));
				return;
			}
			
			var html = "";
			html = "<p><b>" + nefos._("routingStart") + ": " + $("#nefos-routingStartInput").val() + "</b></p>" +
				"<p><b>" + nefos._("routingEnd") + ": " + resource.content.name + "</p></b>" +
				"<p>" + outer.routingService.createRoutePrintDescription(outer.routingInfo.rawData, outer.routingInfo.polyline) + "</p>";
			
			w.document.write(html);
			w.print();
			w.close();
			
		});
	},
	
	_initShareButtons : function(resource, $parent) {
		var outer = this;
		
		var idLink = resource.content.foreignId ? resource.content.foreignId : resource.id;
		var location = '';
		var splited = window.location.href.split('/');
		
		$parent = $parent || $("#nefos-panelMenuContainer");
		
		for(i=0;i<5;i++){
			location += splited[i] + "/";
		}
		var shareUrl = location + 'page/' + nefos.Globals.apiKey + '/' + nefos.Lang.language + '/index/false/detail/' + idLink;
		
		if(!$('#nefos-shareFacebook').socialSharePrivacy){
			return;
		}
		
		$parent.find('.nefos-shareFacebook').socialSharePrivacy({
			services : {
		        twitter : {
		            'status' : 'off'
		        },
		        gplus : {
		            'status' : 'off'
		        },
		        facebook : {
		        	'perma_option': 'off',
		        	'action' : 'like',
		        	'dummy_img' : 'http://mapservices.eu/nefos/static/img/dummy_facebook.png'
		        }
		    },
		    uri : shareUrl
		});
		
		$parent.find('.nefos-shareTwitter').socialSharePrivacy({
			services : {
		        twitter : {
		        	'perma_option': 'off',
		        	'action' : 'like',
		        	'dummy_img' : 'http://mapservices.eu/nefos/static/img/dummy_twitter.png'
		        },
		        gplus : {
		            'status' : 'off'
		        },
		        facebook : {
		        	'status' : 'off'
		        }
		    },
		    uri : shareUrl
		});
		
		$parent.find('.nefos-shareGooglePlus').socialSharePrivacy({
			services : {
		        twitter : {
		            'status' : 'off'
		        },
		        gplus : {
		        	'perma_option': 'off',
		        	'action' : 'like',
		        	'dummy_img' : 'http://mapservices.eu/nefos/static/img/dummy_gplus.png'
		        },
		        facebook : {
		        	'status' : 'off'
		        }
		    },
		    uri : shareUrl
		});
	},
	
	_openBookingPanel : function(resource) {
		var outer = this;
		
		var linkObj = outer.getBookingLink(resource);
		
		if(linkObj != null && linkObj != ''){
			if(linkObj.iframe){
				new PopupWindow(linkObj.link, {
					type: 'iframe',
					iframeWidth: linkObj.width,
					iframeHeight: linkObj.height,
					parentContainer: linkObj.parentContainer ? linkObj.parentContainer : outer.$target
				});
			}
			else{
				window.open(linkObj.link);
			}
		}
	},
	
	_shareResourceByMail : function(resource) {
		var outer = this;
		
		if(outer.settings.requestBasePath){
			if(resource.foreignId){
				window.location.href = 'mailto:?body=http://' + outer.getDomain() + "/" + outer.settings.requestBasePath + "/frontend/page/" + outer.apiKey + "/" + nefos.Lang.language + "?foreignResource=" + resource.foreignId;
			}
			else{
				window.location.href = 'mailto:?body=http://' + outer.getDomain() + "/" + outer.settings.requestBasePath + "/frontend/page/" + outer.apiKey + "/" + nefos.Lang.language + "?resource=" + resource.id;
			}
		}
		else{
			if(resource.foreignId){
				window.location.href = 'mailto:?body=http://' + outer.getDomain() + nefos.GetBasePath() + "/frontend/page/" + outer.apiKey + "/" + nefos.Lang.language + "?foreignResource=" + resource.foreignId;
			}
			else{
				window.location.href = 'mailto:?body=http://' + outer.getDomain() + nefos.GetBasePath() + "/frontend/page/" + outer.apiKey + "/" + nefos.Lang.language + "?resource=" + resource.id;
			}
		}
	},
	
	_generateQrCode : function(resource) {
		var outer = this;
		
		if (!$("#nefos-qrCodeDetail").get(0)) {
			outer.$target.append('<div id="nefos-qrCodeDetail"></div>');
		}
		
		var baseUrl = outer.mandatorConfig.barcodeBaseUrl;
		var encoded = encodeURIComponent(baseUrl + "/frontend/page/" + nefos.Globals.apiKey + "/mobile/false/detail/" + resource.id + "?d," + resource.id);
		var url = outer.mandatorConfig.printBarcodeUrl + "/frontend/barcode/" + nefos.Globals.apiKey + "/url/200/200?text=" + encoded;
		
		$("#nefos-qrCodeDetail").html("<img style='margin-left:100px;' src='" + url + "' width='200' height='200'><div>" + nefos._('qrCodeDescription') + "</div>");
		
		new PopupWindow('#nefos-qrCodeDetail', {
			type: 'div',
			iframeWidth: 400,
			iframeHeight: 380,
			parentContainer: outer.$target
		});
	},
	
	/**
	 * @param resource
	 * Init eventhandling for toolbox in detail panel
	 */
	_initToolboxEvents : function(resource, panel){
		var outer = this;
		
		if (panel !== undefined) {
			if (!nefos.containsResource(resource, this.watchlist)){
				panel.hideMenuItem("no-bookmark");
			}
			else {
				panel.hideMenuItem("bookmark");
			}
			
			if (!nefos.Globals.generateBarcode) {
				panel.hideMenuItem("barcode");
			}
			
			if (!resource.hasLinkedPolyline()) {
				panel.hideMenuItem("gpxdownload");
			}
			if(nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.Hut){
				panel.hideMenuItem("list");
			}
			if(nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.ServiceProvider) {
				panel.hideMenuItem("booking");
			}
			
			this._initShareButtons(resource, panel.getMenuContainer());
			
			panel.addEventListener("menuItemClick", function(item, event) {
				if (item == "bookmark" || item == "no-bookmark") {
					outer.toggleBookmark(resource, event);
					if (item == "bookmark") {
						outer.detailPanel.hideMenuItem("bookmark");
						outer.detailPanel.showMenuItem("no-bookmark");
					}
					else {
						outer.detailPanel.hideMenuItem("no-bookmark");
						outer.detailPanel.showMenuItem("bookmark");
					}
				}
				else if (item == "booking") {
					outer._openBookingPanel(resource);
				}
				else if (item == "gpsdownload") {
					outer._generateGPXFile(resource);
				}
				else if (item == "mail") {
					outer._shareResourceByMail(resource);
				}
				else if (item == "routing") {
					outer._showRoutingPanel(resource);
				}
				else if (item == "list") {
					outer.printHutOverview();
				}
				else if (item == "barcode") {
					outer._generateQrCode(resource);
				}
			});
		}
		else {
			if (!nefos.containsResource(resource, this.watchlist)){
				$('#nefos-addToWatchlist').show();
				$('#nefos-removeFromWatchlist').hide();
			}
			else{
				$('#nefos-addToWatchlist').hide();
				$('#nefos-removeFromWatchlist').show();
			}
			
			this._initShareButtons(resource);
			
			$('#nefos-addToWatchlist').click(function(evt){
				outer.toggleBookmark(resource, evt);
			});
			
			$('#nefos-bookingLink').click(function(){
				outer._openBookingPanel(resource);
			});
			
			$('#nefos-removeFromWatchlist').click(function(evt){
				outer.toggleBookmark(resource);
			});
			
			$('#nefos-printResource').click(function(){
				outer.printResource(resource);
			});
			
			$('#nefos-generateGPXFile').click(function(){
				outer.generateGPXFile(resource);
			});
			
			$('#nefos-shareByMail').click(function(){
				outer._shareResourceByMail(resource);
			});
			
			$('#nefos-generateQRCode').click(function(){
				outer._generateQrCode(resource);
			});
			
			$('#nefos-routing').click(function(){
				outer._showRoutingPanel(resource);
			});
	
			$('#nefos-printHuts').click(function(){
				outer.printHutOverview();
			});
			
			$('#nefos-backToOverview, #nefos-backToOverviewIcon').click(function(){
				$('#nefos-panelMenuContainer').remove();
				window.history.back();
			});
			
			$('#nefos-closeDetailTool').click(function(){
				outer.closeResDetail();
			});
		}
		
		
	},
		
	
	_registerStdListPanelEvents : function(panel) {
		var outer = this;
		
		panel.addEventListener("resourceMouseOver", function(resource) {
			if (outer.settings.showFluentInterface) {
				outer.showResInfo(resource);
				outer.map.setResourceFocus(resource);
			}
			outer.emitEvent("resourceMouseOver", resource);
		});
		
		panel.addEventListener("resourceMouseOut", function(resource) {
			if (outer.settings.showFluentInterface) {
				outer.closeResInfo();
				outer.map.removeResourceFocus(resource);
			}
			outer.emitEvent("resourceMouseOut", resource);
		});
		
		panel.addEventListener("resourceClick", function(resource) {
			if (outer.settings.showFluentInterface) {
				outer.listPanel.preventClickEvent = true;
				outer.showResDetail(resource);
			}
			outer.emitEvent("resourceClick", resource);
		});
	},
	
	/**
	 * @param type Type of resources for overview (hike, bike, etc.), if not specified, listing all resources of map
	 * Show overview panel of resources
	 */
	showResOverview : function(categoryId) {
		var outer = this;
		var caption = '';
		
		if(categoryId && this.categories[categoryId]){
			caption = ' ' + this.categories[categoryId].name;
			if(!this.categories[categoryId].showOverview){
				return;
			}
			
			this.overviewRes = this._filterResByCategory(this.map.resources, this.categories[categoryId].id);
		}
		else{
			this.overviewRes = this._filterResNotInCategory(this.map.resources, this.getHomepageCategoryId());
		}
		
		this.overviewCategory = categoryId;
		
		if (!this.overviewRes || this.overviewRes.length <= 0) {
			return;
		}
		
		this._orderResByName(this.overviewRes);
		
		if (!this.settings.showFluentInterface) {
			return;
		}
		
		var bounds = this.getResourceBounds(this.overviewRes);
		if (bounds.ne != null) {
			this.map.fitBounds(bounds);
		}
		
		if(categoryId == this.getHutCategoryId()){
			this.huts = this.overviewRes;
		}
		
		this.emitEvent("showResourceOverview", this.overviewRes);
		
		var resources;
		if(!this.isEventCategory(categoryId)){
			if(this.overviewRes[0].content.groupingField){
				resources = this.mapResByProperty(this.overviewRes);
			}
			else{
				resources = this.mapResByCategory(this.overviewRes, categoryId);
			}
			
			if (!nefos.Globals.fullscreenOverview) {
				nefos.components.OverviewPanel({
					resources: resources,
					difficultyCallback: function(resource) {
						if (!outer.difficultyCallback) {
							return null;
						}
						//needed for testing if callback exists
						if(!resource){
							return true;
						}
						return outer.difficultyCallback(resource);
					},
					getPageImage: function(img){return outer.getPageImage(img);},
					hutId: this.getHutCategoryId(),
					categoryId: categoryId,
					categoryName: nefos._("overview") + ": " + caption,
					interfaceDir : outer._getAnimDirection("0px"),
					onResourceClick: function(idx) {
						if (outer.settings.showFluentInterface) {
							var resource = outer.overviewRes[idx];
							outer.showResDetail(resource);
						}
						outer.emitEvent("resourceClick", resource);
					},
					onResourceOver : function(idx) {
						if (outer.settings.showFluentInterface) {
							var resource = outer.overviewRes[idx];
							outer.showResInfo(resource);
							outer.map.setResourceFocus(resource);
						}
						outer.emitEvent("resourceMouseOver", resource);
					},
					onResourceOut : function(idx) {
						if (outer.settings.showFluentInterface) {
							var resource = outer.overviewRes[idx];
							outer.closeResInfo();
							outer.map.removeResourceFocus(resource);
						}
						outer.emitEvent("resourceMouseOut", resource);
					}
				});
			}
		}
		else if (!nefos.Globals.fullscreenOverview){
			resources = this.mapResByDate(this.overviewRes, this.dateLine.getSelection(), "ddd - mmm d, yyyy");
			
			nefos.components.EventOverviewPanel({
				resources: resources,
				difficultyCallback: function(resource) {
					if (!outer.difficultyCallback) {
						return null;
					}
					//needed for testing if callback exists
					if(!resource){
						return true;
					}
					return outer.difficultyCallback(resource);
				},
				getPageImage: function(img){return outer.getPageImage(img);},
				hutId: this.getHutCategoryId(),
				categoryId: categoryId,
				categoryName: nefos._("overview") + caption,
				onResourceClick: function(idx) {
					if (outer.settings.showFluentInterface) {
						var resource = outer.overviewRes[idx];
						outer.showResDetail(resource);
					}
					outer.emitEvent("resourceClick", resource);
				},
				onResourceOver : function(idx) {
					if (outer.settings.showFluentInterface) {
						var resource = outer.overviewRes[idx];
						outer.showResInfo(resource);
						outer.map.setResourceFocus(resource);
					}
					outer.emitEvent("resourceMouseOver", resource);
				},
				onResourceOut : function(idx) {
					if (outer.settings.showFluentInterface) {
						var resource = outer.overviewRes[idx];
						outer.closeResInfo();
						outer.map.removeResourceFocus(resource);
					}
					outer.emitEvent("resourceMouseOut", resource);
				}
			});
		}
		if (nefos.Globals.fullscreenOverview) {
			var expandableIcons = true, groupIcon = null;
			
			if(!this.isEventCategory(categoryId)){
				if(this.overviewRes[0].content.groupingField){
					resources = this.mapResByProperty(this.overviewRes);
				}
				else{
					resources = this.mapResByCategory(this.overviewRes, categoryId);
				}
			}
			else {
				resources = this.mapResByDate(this.overviewRes, this.dateLine.getSelection(), "ddd - mmm d, yyyy");
				expandableIcons = false;
				groupIcon = "calendar";
			}
			
			if (outer.listPanel) {
				outer.listPanel.animatedDestroy(outer._getAnimDirection("-440px"));
			}
			if (outer.detailPanel) {
				outer.detailPanel.destroy();
				outer.detailPanel = null;
			}
			outer.listPanel = new nefos.ui.ResourceList(null, {
				resources: resources,
				height: $(document).height() - nefos.Globals.panelMargin,
				category: this.categories[categoryId],
				expandableGroups: expandableIcons,
				groupIcon : groupIcon
			});
			
			$("#nefos-outerCenter").append(outer.listPanel.render($("#nefos-outerCenter")));
			outer.listPanel.afterDomInsert();
			
			outer._registerStdListPanelEvents(outer.listPanel);
						
			outer.listPanel.addEventListener("closeDialog", function() {
				outer.listPanel.moveOut(outer._getAnimDirection("-440px"));
			});
			
			outer.listPanel.addEventListener("showDialog", function() {
				outer.listPanel.moveIn(outer._getAnimDirection("0px"));
			});
			
			outer.listPanel.addEventListener("beforeMoveOut", function() {
				if(outer.isEventCategory(this.category.id)){
					outer.closeEventPanel();
				}
			});
			
			outer.listPanel.addEventListener("beforeMoveIn", function() {
				if(outer.isEventCategory(this.category.id)){
					outer.openEventPanel();
				}
			});
			
			outer.listPanel.moveIn(outer._getAnimDirection("0px"));
		}
		
		//[FF] Special hack for hash navigation
		//now following path works:
		//open overview -> select first resource -> history.back() -> select first resource again 
		//(otherwise second time path woudln't be shown, because detailRes is still set from the first time and assumed that path is already there.
		var tmp = this.detailRes;
		this.detailRes = null;
		this._hideGeoObject(tmp);
				
		this._resizeSidePanel();
		
		if(categoryId){
			this.setWindowHash("overview," + categoryId);
		}
	},
	
    //For public API [FF]
    showResourceOverview : function(resource) {
    	return this.showResOverview(resource);
    },
	
	/**
	 * @param type String
	 * Filter resources by type.
	 */
	_filterResByCategory : function (resources, categoryId) {
		var filteredRes = [];
		
		for(var i=0;i<resources.length;i++){
			if($.inArray(categoryId,resources[i].content.categories) != -1){
				filteredRes.push(resources[i]);
			}
		}
		
		return filteredRes;
	},
	
	_filterResNotInCategory : function(resources, categoryId){
		var filteredRes = [];
		
		for(var i=0;i<resources.length;i++){
			if($.inArray(categoryId, resources[i].content.categories) == -1){
				filteredRes.push(resources[i]);
			}
		}
		
		return filteredRes;
	},
	
	/**
	 * Utility methods
	 * =================================================================
	 */
	
	/**
	 * Calls the function implemented by the concrete class to resize the side panel according to the layout.
	 */
	_resizeSidePanel : function() {
		this.resizeInfoContainer();
	},
	
	/**
	 * Loads the geoObject points of this resource
	 * Otherwise the callback will be executed
	 * @param resource Resource with geoObject
	 * @param cb Callback thats called upon finish
	 */
	_loadGeoObjectPoints : function(resource, cb){
		var outer = this;
		var geoObject = resource.geoObjects[0];
		cb = cb || function() {};
		
		if(!geoObject){
			cb(resource);
			return;
		}
		
		//only first geoObject gets checked!
		if(geoObject.type == nefos.GeoObject.TYPE_POLYLINE){
			this._loadPolylinePoints(resource, cb);
		}
		else if(geoObject.type == nefos.GeoObject.TYPE_POLYGON){
			this._loadPolygonPoints(resource, cb);
		}
		else{
			cb(resource);
			return;
		}
	},
	
	_loadPolygonPoints : function(resource, cb) {
		var outer = this;
		var polygon = resource.geoObjects[0];
		
		//TODO: currently we check only if the first polygon is a stub.
		//maybe we should check every polygon of the resource? [FF]
		if(polygon.isStub()){
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				
				if (geoObj.type == nefos.GeoObject.TYPE_POLYGON) {
					geoObj.setPolygonHidden(true);
					geoObj.setPermanentPolygon(true);
				}
			}
			
			outer.dataService.loadResource({
					resourceId: resource.id	
				},
				function(data) {
					
					var polygons = outer.dataService.generateResources(data, {
						doNotCluster: outer.getLoadFullResources(),
						showMarkerMenu: true,
						checkResourceIdCallback : function(id) {
							return true;
						}
					});
				
					for (var i=0;i<resource.geoObjects.length;i++) {
						var geoObj = resource.geoObjects[i];
						if (geoObj.type == nefos.GeoObject.TYPE_POLYGON) {
							geoObj.points = polygons[0].geoObjects[i].points;
							outer.map.createPolygonLineOnMap(geoObj, resource);
							geoObj.setPermanentPolygon(true); //always show line, even if clustered
							geoObj.setStub(false);
							
							if ((outer.detailRes && outer.detailRes.id == resource.id) || (outer.infoRes && outer.infoRes.id == resource.id)) {
								geoObj.showPolygon(outer.map);
							}
							
							break;
						}
					}	
					cb(resource);
				}
			);
		}
		else {
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				if (geoObj.type == nefos.GeoObject.TYPE_POLYGON) {
					outer.map.createPolygonLineOnMap(polygon, resource);
					geoObj.showPolygon(outer.map);
					
					//Okay, this is a major clusterfuck:
					//permanentLine is set, so that when the map is moved and reclustered
					//the active element isn't hidden through the cluster
					//Now: if we don't to this, all the polylines of the seilbahnen (visible on default!) left standing after first hover.
					//if (geoObj.isLineHidden()) {
						geoObj.setPermanentPolygon(true); //always show line, even if clustered
						//nefos.L("setting permanent line for " + resource.getName());
					//}		
				}
			}
			cb(resource);
		}
	},
	
	/**
	 * Loads the polyline points of this resource, if the first geoobject of this resource is a polyline
	 * Otherwise the callback will be executed
	 * @param resource Resource with polyline geoObject
	 * @param cb Callback thats called upon finish
	 */
	_loadPolylinePoints : function(resource, cb) {
		var outer = this;
		var polyline = resource.geoObjects[0];
		
		//TODO: currently we check only if the first polyline is a stub.
		//maybe we should check every polyline of the resource? [FF]
		if(polyline.isStub()){
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				
				if (geoObj.type == nefos.GeoObject.TYPE_POLYLINE) {
					geoObj.setLineHidden(true);
					geoObj.setPermanentLine(true);
				}
			}
			
			var param = {
					resourceId: resource.id	
				};
				
			if (nefos.Globals.maxPolylinePoints) {
				param.maxPoints = nefos.Globals.maxPolylinePoints;
			}
			
			outer.dataService.loadPointsOfPolyline(param,
				function(data) {
					var pointAry = outer.dataService.generateCoordinates(data);
					for (var i=0;i<resource.geoObjects.length;i++) {
						var geoObj = resource.geoObjects[i];
						var points = pointAry[i];
						if (geoObj.type == nefos.GeoObject.TYPE_POLYLINE) {
							geoObj.setPoints(points);
							outer.map.createPolylineLineOnMap(geoObj, resource);

							geoObj.setPermanentLine(true); //always show line, even if clustered
							geoObj.setStub(false);
							
							if ((outer.detailRes && outer.detailRes.id == resource.id) || (outer.infoRes && outer.infoRes.id == resource.id)) {
								geoObj.showLine(outer.map);
							}		
						}
					}	
					cb(resource);
				}
			);
		}
		else {
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				if (geoObj.type == nefos.GeoObject.TYPE_POLYLINE) {
					outer.map.createPolylineLineOnMap(polyline, resource);
					geoObj.showLine(outer.map);
					
					//Okay, this is a major clusterfuck:
					//permanentLine is set, so that when the map is moved and reclustered
					//the active element isn't hidden through the cluster
					//Now: if we don't to this, all the polylines of the seilbahnen (visible on default!) left standing after first hover.
					//if (geoObj.isLineHidden()) {
						geoObj.setPermanentLine(true); //always show line, even if clustered
						//nefos.L("setting permanent line for " + resource.getName());
					//}		
				}
			}
			cb(resource);
		}
	},
	
	_hideGeoObject : function(resource, all){
		if (resource == null || resource.geoObjects == null || resource.geoObjects.length < 1) {
			return;
		}
		
		//return if type of resource shouldn't be hidden (eg ropeway)
		if(resource.content.categories && this.categories[resource.content.categories[0]] && this.categories[resource.content.categories[0]].loadCompleteResources == true){
			if(!all){
				return;
			}
		}
		
		if(resource.geoObjects[0].type == nefos.GeoObject.TYPE_POLYLINE){
			this._hidePolyline(resource, all);
		}
		else if(resource.geoObjects[0].type == nefos.GeoObject.TYPE_POLYGON){
			this._hidePolygon(resource, all);
		}
		else{
			return;
		}
	},
	
	/**
	 * Hides the lines of the polygon geoobject.
	 * @param resource
	 */
	_hidePolygon : function(resource, all) {
		//TODO: again we only check the first object.
		var polygon = resource.geoObjects[0];
		
		if (all || this.detailRes == null || resource.id != this.detailRes.id) {
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				if (geoObj.type == nefos.GeoObject.TYPE_POLYGON) {
					geoObj.hidePolygon(this.map);
				}
			}
		}
	},
	
	/**
	 * Hides the line of the polyline geoobject.
	 * @param resource
	 */
	_hidePolyline : function(resource, all) {
		//TODO: again we only check the first object.
		var polyline = resource.geoObjects[0];
		
		if (all || this.detailRes == null || resource.id != this.detailRes.id) {
			for (var i=0;i<resource.geoObjects.length;i++) {
				var geoObj = resource.geoObjects[i];
				if (geoObj.type == nefos.GeoObject.TYPE_POLYLINE) {
					geoObj.hideLine(this.map);
				}
			}
		}
	},
	
	/**
	 * Loads the resource from the server and displays the detail panel, or if arrayof fid'show the overview
	 * @param id Id from resource to load from server
	 * @param isForeignId Wether the given id is a foreign id or not
	 * @param callback that should be called instead of adding the resource to the map
	 */
	_loadAndShowRes : function(id, isForeignId, cb){
		var outer = this;		
					
		var generateResourceCb = function(data){
			var resources = [];
			var resource;			
			
			for(key in data) {
				resource = outer.dataService.generateResource(data[key], {
					doNotCluster: outer.getLoadFullResources(),
					showMarkerMenu: true,
					checkResourceIdCallback : function(id) {
						return !outer.map.hasResource(id);
					}
				});
				
				if($.isArray(id) && !cb){
					outer.map.addResource(resource);
					
					if (outer.mapCluster) {
						outer.mapCluster.resetAndCluster(false);
					}
				}
				else if (cb) {
					resources.push(resource);
				}
			}
			
			if(!$.isArray(id) && !cb){
				if (resource) {
					outer.map.addResource(resource);
					outer.showResDetail(resource);
					
					//switch map type to selection in category
					if(!outer.settings.mapType){
						if(outer.categories[resource.content.categories[0]] && outer.categories[resource.content.categories[0]].displayInSummer || outer.categories[resource.content.categories[0]].displayInWinter){
							if(outer.categories[resource.content.categories[0]].displayInSummer && ((outer.map.getMapTypeName() == 'summer') || (outer.map.getMapTypeName() == 'alpenwelt'))){}
							else if(outer.categories[resource.content.categories[0]].displayInWinter && outer.map.getMapTypeName() == 'winter'){}
							else{
								if(outer.categories[resource.content.categories[0]].displayInSummer && !outer.categories[resource.content.categories[0]].displayInWinter){
									outer.setMapType('summer');
								}
								else{
									outer.setMapType('winter');
								}
							}
						}
					}
					
					outer.emitEvent("resourceLoad", resource);
				}
			}
			else if (!cb){
				outer.showResOverview();
			}
			else {
				cb(resources);
			}
		};
		
		if(isForeignId){
			if(!$.isArray(id)){
				this.dataService.loadResource({
					foreignId: id.toString().toLowerCase(),
					language: nefos.Lang.language
				}, generateResourceCb);
			}
			else{
				this.dataService.loadResources({
					foreignIds: id,
					language: nefos.Lang.language
				}, generateResourceCb);
			}
		}
		else {
			if(!$.isArray(id)){
				this.dataService.loadResource({
					resourceId: id,
					language: nefos.Lang.language
				}, generateResourceCb);
			}
			else{
				this.dataService.loadResourcesByIds({
					resourceIds: id,
					language: nefos.Lang.language
				}, generateResourceCb);
			}
		}
	},
	
	getVisibleResources : function() {
		return this.map.resources;
	},
	
	//UTILS END

	//HASH METHODS / URL 
	//==========================================================
	hashFunctionResourceDetail : function(hash, param){
    	for(idx in this.map.resources){
    		if(this.map.resources[idx].id == param){
    			this.showResDetail(this.map.resources[idx]);
    		}
    	}
    },
    	
	onHashChange : function(hash) {
        var param = hash.replace(/.*?,(.*)/i,"$1");
        hash = hash.replace(/(.*?),(.*)/i,"$1");
        
        //No param given
        if (param == hash) {
        	param = null;
        }

        var handler = this['hashFunction' + hash.capitalize()];
        if (typeof handler === 'function') {
        	handler.apply(this, [hash, param]);
        }
    },
    
    
    hashFunctionOverview : function(hash, param){
    	if(this.map.resources.length > 0){
    		this.showResOverview(parseInt(param));
    	}
    },
    //HASH METHODS END
    
    //SEARCH METHODS
    //=======================================
	hideSearchResult : function(){
		$('#nefos-searchResult').animate({
			height: '0px'
		}, null, null, function(){
			$('#nefos-searchResult').hide();
		});
	},
	
	displaySearchResult : function(){
		var position = this.getSearchResultPos();
		if (position == null) {
			return;
		}
		$('#nefos-searchResult').css(position).show();
		$('#nefos-searchResult').animate({
			height: $('#nefos-innerResult').css('height')
		}, null, null, function(){
			//this is needed, because of strange height on first resize
			$('#nefos-searchResult').css('height', nefos.CssInt($('#nefos-innerResult'), 'height') + 'px');
		});
		$("#nefos-searchRight").removeClass("nefos-searchRightLoading");
	},

	openSearchResult : function(id){
		if(nefos.Globals.GetObjectType(this.searchResults[id].content.objectType) == nefos.Globals.ResourceType.Homepage || nefos.Globals.GetObjectType(this.searchResults[id].content.objectType) == nefos.Globals.ResourceType.Camera){
    		window.open("http://" + this.searchResults[id].content.Link);
    		return;
		}
    		
		this._loadAndShowRes(this.searchResults[id].id);
		this.hideSearchResult();
	},

	search : function(term) {
		var outer = this;
		
		$("#nefos-searchRight").addClass("nefos-searchRightLoading");
		
		this.dataService.search({
			searchTerm: term,
			language: nefos.Lang.language
		}, function(data){
			outer.searchResults = data;
			outer.generateSearchResult();
		});
	},
	
	generateSearchResult : function(offset){
		var result = "<div id=\"nefos-innerResult\">";
		
		if(this.searchResults.length < 1){
			result += '<div class="nefos-searchResultEntry">' + nefos._("noElementsInSearch") + '</div>';
		}
		
		var img;
		var i = 0;
		var start = 0;
		
		if(offset){
			start = offset + 1;
			i = start;
		}
		
		for(i=i; i<this.searchResults.length; i++){
			img = this.getMapIcon(this.searchResults[i]);
			if(!img){
				img = "http://mapservices.eu/nefos/static/img/mapIcons/zaz/homepage.png";
			}
			result += '<a href="javascript:nefos.PageInstance.openSearchResult(' + i + ')"><div class="nefos-searchResultEntry"><img class="nefos-watchlistImage" src="' + img + '"><div class="nefos-searchText"><div class="nefos-searchResultText">' + this.searchResults[i].content.name + '</div><div class="nefos-searchDescription">' + this.getResourceDescription(this.searchResults[i]) + '</div></div><div style="clear:both;"></div></div></a>';
			
			if(i > 3 + start){
				result += '<a href="javascript:nefos.PageInstance.generateSearchResult(' + i + ')"><div class="nefos-searchResultEntry"><img style="float:left;" src="http://mapservices.eu/nefos/static/img/search_lens_grey.png"><div style="float:left;font-size:80%;font-weight:bold;margin-left:15px;">' + nefos._("showNextResults") + ' (' + (this.searchResults.length - i - 1) + ')</div><div style="clear:both;"></div></div></a>';
				break;
			}
		}
		result += '</div>';
		
		$('#nefos-searchResult').html(result);
		this.displaySearchResult();
	},
	
	//SEARCH METHODS END

	
	//NOT YET TOUCHED START
	//================================================================================ 
		
	generateGPXFile : function(resource){
		var popup = window.open(this.getFullRequestPath() + '/frontend/GenerateGPX.action?apiKey=' + this.apiKey + '&resource.id=' + resource.id);
		
		if(popup == null || typeof(popup) == 'undefined'){
			alert(nefos._("popupBlocker"));
		}
	},
	
	printHutOverview : function(){
		var watchlistIds = "";
		
		for(var i=0;i<this.huts.length;i++){
			watchlistIds += "&watchlistIds[" + i + "]=" + this.huts[i].id;
		}
		
		var reportId = new Date().getTime();
		var path = this.getFullRequestPath() + '/frontend/Guide.action?reportId=' + reportId + '&locale=' + nefos.Lang.language + '&apiKey=' + this.apiKey + '&reportClass=PrintHutsOfZillertal.groovy' + watchlistIds;
		
		this.startDownload(path, reportId);
	},
	
	printResource : function(resource){
		var path;
		var reportId = new Date().getTime();
		
		if(resource){
			path = this.getFullRequestPath() + '/frontend/Guide.action?reportId=' + reportId + '&locale=' + nefos.Lang.language + '&apiKey=' + this.apiKey + '&resource.id=' + resource.id + '&reportClass=PrintResourceOfZillertal.groovy';
		}
		else{
			var watchlistIds = "";
			
			//watchlist items
			for(var i=0;i<this.watchlist.length;i++){
				watchlistIds += "&watchlistIds[" + i + "]=" + this.watchlist[i].id;
			}
			
			path = this.getFullRequestPath() + '/frontend/Guide.action?reportId=' + reportId + '&locale=' + nefos.Lang.language + '&apiKey=' + this.apiKey + '&reportClass=PrintWatchlistOfZillertal.groovy' + watchlistIds;
		}
		
		this.startDownload(path, reportId);
	},
	
	
	/**
	 * No API method anymore
	 * Loads resources with specified settings
	 * @param settings
	 * int categoryId : 		category to show. If this category is already shown, the category will be deselected
	 * boolean noAnimation: 	show loading animation above menu item
	 */
	toggleCategory : function(id, noAnimation) {
		var $li = $("#nefos-categoryMenu_" + id);
		var $parentUl = $li.parents("ul:first");
		
		if ($.inArray(id, this.selectedCategories) != -1){
			this.removeCategory(id);

			if ($parentUl.get(0) &&  $parentUl.get(0).id != "nefos-menu-globalnav" && this.noSelection($parentUl)) {
				$li.parent().parent().removeClass("jdm_menu_toggled");
				$li.parent().parent().children(".nefos-mainMenuButtonInner").removeClass("nefos-mainMenuButtonInnerPressed");
			}
			else {
				$li.removeClass("jdm_menu_toggled");
				$li.children(".nefos-mainMenuButtonInner").removeClass("nefos-mainMenuButtonInnerPressed");
			}
				
			//close overview panel if current category in overview is deselected
			if(this.overviewCategory == id){
				this.closeResDetail(null, null, true);
				this.overviewCategory = null;
			}
			
			//close event panel
			if (!nefos.Globals.fullscreenOverview) {
				if(this.isEventCategory(id)){
					this.closeEventPanel();
				}	
			}
			
			this.emitEvent("categoryHide", this.categories[id]);
		}
		else {
			//if its a submenu add toggled class to parent
			if($li.parent().parent().hasClass("jd_menu_submenu")){
				$li.parent().parent().addClass("jdm_menu_toggled");
				$li.parent().parent().children(".nefos-mainMenuButtonInner").addClass("nefos-mainMenuButtonInnerPressed");
			}
			else {
				$li.children(".nefos-mainMenuButtonInner").addClass("nefos-mainMenuButtonInnerPressed");
			}
			
			$li.addClass("jdm_menu_toggled");
			this.selectedCategories.push(id);
			
			//no animation needed when categories selected at initialisation of page
			if(noAnimation){
				this.displayResources(id, false, true);
			}
			else{
				this.showLoadingAnimation(id, $parentUl);
				this.displayResources(id, false);
			}
			
			if (!nefos.Globals.fullscreenOverview) {
				if(this.isEventCategory(id)){
					this.openEventPanel();
				}
			}
		}
	},
	
	closeEventPanel : function(){
		$('#nefos-eventPanel').slideUp();
	},
	
	openEventPanel : function(){
		$('#nefos-eventPanel').slideDown();
	},
	
	showLoadingAnimation : function(id, $parentUl){
		var outer = this;
		
		if (id) {
			$("#nefos-categoryMenu_" + id + " div.nefos-mainMenuButtonInner").each(function(idx, el) {
				var $this = $(this);
				var div = $this.get(0);
				
				if(div && !$(div).hasClass("nefos-menuIconLoading")){
					$this.attr("oldSrc", $this.css("backgroundImage"));
					$this.css('backgroundImage', "url(" + nefos.Globals.menuLoadingIcon + ")");
					$this.addClass("nefos-menuIconLoading");
				}

				
				/*$this.attr("oldSrc", $this.attr("src"));
				$this.attr("src", nefos.Globals.menuLoadingIcon);
				$this.addClass("nefos-menuIconLoading");*/
			});
			
			if($parentUl){
				//only animate parent if its not root of menu
				if(!$("#nefos-categoryMenu_" + id).hasClass("nefos-mainMenuButton")){
					var div = $parentUl.parent().find(".nefos-mainMenuButtonInner")[0];
					if(div && !$(div).hasClass("nefos-menuIconLoading")){
						$(div).attr("oldSrc", $(div).css("backgroundImage"));
						$(div).css('backgroundImage', "url(" + nefos.Globals.menuLoadingIcon + ")");
						$(div).addClass("nefos-menuIconLoading");
					}
				}
			}
		}
	},
	
	hideLoadingAnimation : function(){
		$('img.nefos-menuIconLoading').each(function(idx, el) {
			var $this = $(this);
			$this.attr("src", $this.attr("oldSrc"));
			$this.removeClass("nefos-menuIconLoading");
		});
		
		$(".nefos-menuIconLoading").each(function(idx, el) {
			var $this = $(this);
			$this.css("backgroundImage", $this.attr("oldSrc"));
			$this.removeClass("nefos-menuIconLoading");
		});
	},
	
	noSelection : function($el){
		var selection = true;
		
		$.each($el.find("li"), function(key, val){
			if($(val).hasClass('jdm_menu_toggled')){
				selection = false;
			}
		});
		
		return selection;
	},

	removeCategory : function(id){
		this.selectedCategories = $.grep(this.selectedCategories, function(val) { 
			return val != id; }
		);
		
		$("#nefos-categoryMenu_" + id).removeClass("jdm_menu_toggled");

		//hide polylines of removed resources
		for(idx in this.map.resources){
			var resource = this.map.resources[idx];
			
			if($.inArray(id, resource.content.categories) != -1){
				this._hideGeoObject(resource, true);
			}
		}
		
		this.updateResources();
	},
	
	showCategoryName : function(categoryId) {
		$('#nefos-categoryCaption').html(this.categories[categoryId].name);
		$('#nefos-categoryCaption').show();
	},
	
	hideCategoryName : function() {
		$('#nefos-categoryCaption').hide();
	},
	
	//function of reset button in menu
	resetCategories : function(resetMap){
		this.dataService.abortRequests();
		
		$("#nefos-mapMenu li, #nefos-mapMenu div").removeClass("jdm_menu_toggled").removeClass("nefos-mainMenuButtonInnerPressed");
		
		for(idx in this.map.resources){
			this._hideGeoObject(this.map.resources[idx], true);
		}
		
		this.selectedCategories = [];
		this.updateWatchlistString();
		if (!nefos.Globals.fullscreenOverview) {
			this.closeEventPanel();
		}
		
		this.closeResInfo();
		this.closeResDetail(true, null, true); //remove line
		this.closeResDetail(); //close window
		
		this.updateResources();
		this.mapCluster.resetAndCluster(true);
		
		if(resetMap){
			this.map.panTo(this.settings.mapCenter);
			this.map.setZoomLevel(this.settings.mapZoomLevel);
		}
		
		this.map.removeHighlight();
		
		if(this.getHomepageCategoryId() != null){
			this.displayResources(this.getHomepageCategoryId(), false);
		}
		
		var allwaysId = this.getCategoryIdByExportName("showAlways");
		if(allwaysId){
			this.displayResources(allwaysId, false, null, function(){
				$("#nefos-categoryMenu_" + allwaysId).addClass("jdm_menu_toggled");
			});
		}

		this._resetRoutingInfo();
		
		this.emitEvent("reset");
	},
	
	_resetRoutingInfo : function() {
		if (this.routingInfo) {
			this.removeUserMapObject(this.routingInfo.polyline);
		}
		this.routingInfo = null;
	},
	
	updateWatchlistString : function(){
		$('#nefos-watchlistButtonText').html("" + nefos._("watchlist") + " (" + this.watchlist.length + " " + nefos._("watchlistElements") + ")");
	},

	setOrCreateMetaTag : function(metaName, name, value) {
        var t = 'meta['+metaName+'="'+name+'"]';
        var mt = $(t);
        if (mt.length === 0) {
            t = '<meta '+metaName+'="'+name+'" />';
            mt = $(t).appendTo('head');
        }
        mt.attr('content', value);
    },
		
	toggleBookmark : function(resource, evt){
		if (nefos.containsResource(resource, this.watchlist)){
			this.removeBookmark(resource.getId());
			this.updateWatchlistStorage();
			$('#nefos-addToWatchlist').show();
			$('#nefos-removeFromWatchlist').hide();
			this.openWatchlist();
			
			this.emitEvent("bookmarkRemove", resource);
		}
		else {
			this.showBookmarkAnimation(this.getMapIcon(resource), evt);
			this.addBookmark(resource);
			this.updateWatchlistStorage();
			$('#nefos-addToWatchlist').hide();
			$('#nefos-removeFromWatchlist').show();
			
			this.emitEvent("bookmarkAdd", resource);
		}
		
		this.updateWatchlistString();
	},
	
	//update storage of watchlist, add ids if specified
	updateWatchlistStorage : function(){
		
		if(!this.isLocalStorageSupported()){
			return;
		}
		
		var watchlistIds = [];
		
		for(i in this.watchlist){
			watchlistIds.push(this.watchlist[i].id);
		}
		
		localStorage.removeItem("watchlist");
		localStorage.setItem("watchlist", watchlistIds);
	},
	
	/**
	 * API Method
	 * @param resource to add to bookmarks
	 */
	addBookmark : function(resource) {
		this.watchlist.push(resource);
	},
		
	/**
	 * API Method for updating bookmark counter string
	 */
	updateBookmarkString : function() {
		this.updateWatchlistString();
	},
	
	showBookmarkAnimation : function(img, evt){
		var outer = this;

		if (!evt) {
			window.setTimeout(function() {
				outer.openWatchlist();		
			}, 500);
			return;
		}
		
		var top = evt.pageY;
		var left = evt.pageX;
		
		var targetPos = $('#nefos-watchlistButtonContainer').position();
		
		if (!targetPos) {
			return;
		}
				
		this.$target.append('<div id="nefos-bookmarkAnimation"><img src="' + img + '"></div>');
		var $bookmarkAnimation = $('#nefos-bookmarkAnimation');
		
		$bookmarkAnimation.css("top", top + "px");
		$bookmarkAnimation.css("left", left + "px");
		
		$bookmarkAnimation.animate({
			left: targetPos.left,
			top: targetPos.top
		}, 1500, function(){
			$bookmarkAnimation.remove();
			outer.openWatchlist();
		});
	},
	
	openWatchlist : function(){
		var result = '<div id="nefos-watchlistResult" style="width:420px">';
		var imgSrc;
		var outer = this;
		var ids = "";
		
		var cb = function(){
			for(var i=0; i<outer.watchlist.length; i++){
				ids += outer.watchlist[i].id + "|";
				
				if(outer.watchlist[i].images && outer.watchlist[i].images.length > 0){
					imgSrc = outer.getUploadImage(outer.watchlist[i].images[0].src,true);
				}
				else{
					imgSrc = outer.getMapIcon(outer.watchlist[i]);
				}
				
				result += '<div class="nefos-searchResultEntry">'
							+ '<a style="float:left;" href="javascript:nefos.PageInstance.displayWatchlistResource(' + i + ')">'
								+ '<img id="nefos-watchlistImage" class="nefos-watchlistImage" src="' + imgSrc + '">'
								+ '<div class="nefos-searchText">'
									+ '<div class="nefos-searchResultText">' + outer.watchlist[i].content.name + '</div>'
									+ outer.getResourceDescription(outer.watchlist[i])
								+ '</div>'
								+ '<div style="clear:both;"></div>'
							+ '</a>'
							+ '<a style="float:right;" class="nefos-removeWatchlistIcon" href="javascript:nefos.PageInstance.removeFromWatchlist(' + i + ')">'
								+ '<img style="width:13px;height:13px;" src="' + outer.getPageImage("reset_search.png") + '">'
							+ '</a>'
							+ '<div style="clear:both;"></div>'
						+ '</div>';
			}
			
			if(outer.watchlist.length < 1){
				result += '<div class="nefos-searchResultEntry">' + nefos._("noElementsInWatchlist") + '</div>';
			}
			else{
				//generate QR-Code for app interaction
				if(nefos.Globals.generateBarcode){
					result += '<div id="nefos-qrCodeDetailWatchlist" align="center"></div>';
				}
				result += '<a href="javascript:nefos.PageInstance.printResource()"><div class="nefos-searchResultEntry"><img style="float:left;width:20px;" src="' + outer.getPageImage("print_watchlist.png") + '"><div style="float:left;font-size:80%;font-weight:bold;margin-left:12px;">' + nefos._("printWatchlist") + '</div><div style="clear:both;"></div></div></a>';
			}
			
			result += '</div>';
			
			$('#nefos-watchlistContent').html(result);
					
			//generate QR-Code for app interaction
			if(nefos.Globals.generateBarcode){
				var baseUrl = outer.mandatorConfig.barcodeBaseUrl;
				var encoded = encodeURIComponent(baseUrl + "/frontend/page/" + nefos.Globals.apiKey + "/mobile/?w," + ids);
				var url = outer.mandatorConfig.printBarcodeUrl + "/frontend/barcode/" + nefos.Globals.apiKey + "/url/200/200?text=" + encoded;
				
				$("#nefos-qrCodeDetailWatchlist").html("<div>" + nefos._("transferToSmartphone") +"</div><img src='" + url + "' width='200' height='200'>");
			}
			
			outer.displayWatchlistResult();
		};
		
		this.reloadWatchlistFromStorage(cb);
	},
	
	reloadWatchlistFromStorage : function(cb){
		var outer = this;
		
		if(this.isLocalStorageSupported() && localStorage.getItem("watchlist")){
			var ids = localStorage.getItem("watchlist").split(",");
			this.loadWatchlistResources(ids, cb);
		}
		else{
			cb();
		}
	},
	
	loadWatchlistResources : function(ids, cb) {
		var outer = this;
		
		outer.dataService.loadResourcesByIds({
			resIds: ids,
			language: nefos.Lang.language,
			cache: false,
			online: true
		}, function(data){
			var res  = outer.dataService.generateResources(data, {
				doNotCluster: outer.getLoadFullResources(),
				showMarkerMenu: true,
				checkResourceIdCallback : function(id) {
					return true;
				}
			});
			
			outer.watchlist = res;
			cb();
		});
	},
	
	displayWatchlistResult : function(){
		var position = this.getWatchlistResultPos();
		if (position == null) {
			return;
		}
		
		$('#nefos-watchlistContent').show();
		$('#nefos-watchlistContainer').css(position).show(); 
				
		$('#nefos-watchlistContainer').stop().animate({
			height: $('#nefos-watchlistResult').height() + 'px'
		}, null, null, function(){
			//we have to resize again because of strange height in first resize
			$('#nefos-watchlistContent').css('height', $('#nefos-watchlistResult').height() + 'px');
			$('#nefos-watchlistContainer').css('height', $('#nefos-watchlistResult').height() + 'px');
		});
	},
	
	_getToolbarBottomPos : function() {
		var $container = $('#nefos-watchlistButtonContainer');
		if (!$container.get(0)) {
			return -1;
		}
		else {
			return $container.position().top + nefos.CssInt($container,'margin-top') + 20 + 3;
		}
	},
	
	getWatchlistResultPos : function() {
		var top = this._getToolbarBottomPos();
		
		if (top == -1) {
			return null;
		}
		
		return {
			top: top + "px",
			left:  $("#nefos-watchlistButtonContainer").position.left + "px"
		};
	},
	
	getSearchResultPos : function() {
		var top = this._getToolbarBottomPos();
		
		if (top == -1) {
			return null;
		}
		
		return {
			top: top + "px",
			left:  $("#nefos-searchContainer").position.left + "px"
		};
	},
	
	hideWatchlistResult : function(){
		var outer = this;
		
		$('#nefos-watchlistContainer').animate({
			height: '0px'
		}, null, null, function(){
			$('#nefos-watchlistContent').hide();
			$('#nefos-watchlistContainer').hide();
		});
	},
	
	removeFromWatchlist : function(index){
		this.watchlist.splice(index, 1);
		this.updateWatchlistStorage();
		this.updateWatchlistString();
		this.openWatchlist();
		
		$('#nefos-addToWatchlist').show();
		$('#nefos-removeFromWatchlist').hide();
	},
	
	displayWatchlistResource : function(index){
		this.showResDetail(this.watchlist[index]);
	},
	
	displayMiniProfile : function(resource){
		var outer = this;
		var $heightProfile = $("<div id='nefos-miniProfileContainer'></div>");
		var $outerProfileContainer = $('#nefos-miniAltitudeProfile');

		//Container doesn't exist, return
		if (!$outerProfileContainer.get(0)) {
			return;
		}
		
		$outerProfileContainer.append($heightProfile);
		
		nefos.Globals.altitudeProfileOptions.width = nefos.CssInt($("#nefos-miniProfileContainer"), "width") - nefos.Globals.altitudeProfileOptions.marginWidth; /*beschriftung*/
		
		if(this.miniProfile != null){
			this.miniProfile.removeAllEventListeners("mouseOut");
		}
		
		this.miniProfile = new nefos.AltitudeProfile("nefos-miniProfileContainer", $.extend(nefos.Globals.altitudeProfileOptions, {noMouseOver: false}));		
		
		this.miniProfile.addEventListener("mouseMove", function(resource, polyline, pointIndex) {
			outer.map.setRoutePositionMarker(resource, polyline, pointIndex);
		});

		this.miniProfile.addEventListener("mouseOut", function() {
			outer.map.hideRoutePositionMarker();
		});
		
		this.miniProfile.draw(resource);
	},
	
	initHeightProfile : function() {
		if (!nefos.AltitudeProfile) {
			return;
		}
		var outer = this;
		var $heightProfile = $("<div id='nefos-profileContainer'></div>");
		var $outerProfileContainer = $("<div id='nefos-outerProfileContainer'></div>");
		
		$outerProfileContainer.css({
			"-ms-filter": "progid:DXImageTransform.Microsoft.Shadow(color='#585858', Direction=300, Strength=3)",
			"filter": "progid:DXImageTransform.Microsoft.Shadow(color='#585858', Direction=300, Strength=3)"
		});

		$outerProfileContainer.append($heightProfile);
		$("#nefos-mapContainer").append($outerProfileContainer);
		
		nefos.Globals.altitudeProfileOptions.width = nefos.CssInt($("#nefos-profileContainer"), "width") - nefos.Globals.altitudeProfileOptions.marginWidth; /*beschriftung*/
		this.profile = new nefos.AltitudeProfile("nefos-profileContainer", $.extend(nefos.Globals.altitudeProfileOptions, {noMouseOver: true}));
	},
		
	getResourceDescription : function(resource){
		if(resource.content.teaser != null && typeof resource.content.teaser != "undefined"){
			return resource.content.teaser;
		}
		else if(resource.content.description != null && typeof resource.content.description != "undefined"){
			return resource.content.description;
		}
		else if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.ServiceProvider){
			var resultDiv = '<div class="resultDiv">' +
				"<div>" + this.getValue(resource.content.title, true) + " " + this.getValue(resource.content.firstName, true) + " " + this.getValue(resource.content.lastName, true) + "</div>" +
				"<div>" + this.getValue(resource.content.addressLine1, true) + "</div>" +
				"<div>" + this.getValue(resource.content.addressLine2, true) + "</div>" +
				"<div>" + this.getValue(resource.content.zipCode, true) + "  " + this.getValue(resource.content.town, true) + "</div>";
			return resultDiv + '</div>';
		}
		else {
			var resultDiv = '<div class="resultDiv">' +
				"<div>" + this.getValue(resource.content.Kontakt, true) + "</div>" +
				"<div>" + this.getValue(resource.content.Strasse, true) + "  " + this.getValue(resource.content.Hausnummer, true) + "</div>" +
				"<div>" + this.getValue(resource.content.PLZ, true) + "  " + this.getValue(resource.content.Ort, true) + "</div>";
			return resultDiv + '</div>';
		}
	},
	
	displayResources : function(categoryId, fullRebuild, disableOverview, cb, maxPoints) {
		var outer = this;
		var noLoadingAnimationStop = false;
		
		//[FF] also check against a global variable to disable overviews (fullscreen mode)
		disableOverview = (disableOverview !== undefined ? disableOverview : 
								(this.disableOverview !== undefined ? this.disableOverview : false));

		//function is called by mapMove, so don't cancel loading animation
		if(!categoryId){
			noLoadingAnimationStop = true;
		}
		
		if (!this.mandatorConfig) {
			return;
		}
		
		if (outer.mapCluster) {
			outer.mapCluster.resetAndCluster(fullRebuild);
		}
		
		var tmpId = this.getHomepageCategoryId();
		if(tmpId){
			if ($.inArray(tmpId, this.selectedCategories) == -1){
				this.selectedCategories.push(tmpId);
			}
		}
		
		tmpId = this.getCategoryIdByExportName("showAlways");
		if(tmpId){
			outer.selectedCategories.push(tmpId);
		}
		
		var dateLow = null;
		var dateHigh = null;
		var cache = true;
		if(categoryId && this.isEventCategory(categoryId)){
			if(this.dateLine){
				dateLow = this.dateLine.getSelection().low.getTime();
				dateHigh = this.dateLine.getSelection().high.getTime();
				cache = false;
			}
		}
		
		this.dataService.loadResourcesByCategories({
			categories: [categoryId],
			buffered: false,
			clickableLinestring: true,
			maxPoints: maxPoints,
			cache: cache,
			language: nefos.Lang.language,
			loadCompleteResources: this.getLoadFullResources(),
			objectTypeName: this.getLoadObjectType(categoryId),
			dateLow: dateLow,
			dateHigh: dateHigh
		}, function(data){
			if (jQuery.isEmptyObject(data)) {
				//outer.emitEvent("resourcesLoad"); [FF] Removed, not needed anyways?
				if(!noLoadingAnimationStop){
					outer.hideLoadingAnimation();
				}
				
				//close if no result and action is no map move
				if(categoryId){
					outer.closeResDetail(false);
				}
				return;
			}
			
			var displayedResources = outer.dataService.generateResources(data, {
				doNotCluster: outer.getLoadFullResources(),
				showMarkerMenu: true,
				checkResourceIdCallback : function(id) {
					return !outer.map.hasResource(id);
				}
			});
			
			//add watchlist resources
			for(var i=0;i<outer.watchlist.length;i++){
				outer.map.addResource(outer.watchlist[i]);
			}
			
			outer.map.addResources(displayedResources);

			if (outer.mapCluster) {
				outer.mapCluster.resetAndCluster(false);
			}

			if(!disableOverview){
				outer.showResOverview(categoryId);
			}
			
			if(!noLoadingAnimationStop){
				outer.hideLoadingAnimation();
			}
			
			if (categoryId && categoryId !== outer.getHomepageCategoryId()) {
				outer.emitEvent("categoryShow", outer.categories[categoryId], displayedResources); //[FF] second parameter is currently undocumented in public API
			}
						
			outer.emitEvent("resourcesLoad", displayedResources);

			if(cb){
				cb(displayedResources);
			}
		});
	},
	
	getLoadObjectType : function(categoryId) {
		return null;
	},
	
	/*=======================================================================
	 * API methods following
	 * ======================================================================
	 */
	
	/**
	 * API Method to load and return resources
	 * @param settings Object with settings
	 * @param settings.cb Callback to execute asynch when resources are loaded
	 * @param settings.categoryIds Array of category id's to load
	 * @param settings.resourceIds Array of resource id's to load
	 * @param settings.foreignResourceIds Array of foreign resource id's to load
	 */
	loadResources : function(settings) {
		var outer = this;
		
		settings = settings || {};
		
		if (!settings.callback) {
			return "No callback given!";
		}
				
		if (settings.categoryIds) {				
			this.dataService.loadResourcesByCategories({
				categories: settings.categoryIds,
				buffered: false,
				clickableLinestring: true,
				maxPoints: settings.maxPoints,
				cache: true,
				language: nefos.Lang.language,
				loadCompleteResources: this.getLoadFullResources(),
				objectTypeName: this.getLoadObjectType(settings.categoryIds)
			}, function(data){
				var displayedResources = outer.dataService.generateResources(data, {
					doNotCluster: outer.getLoadFullResources(),
					showMarkerMenu: true,
					checkResourceIdCallback : function(id) {
						return !outer.map.hasResource(id);
					}
				});
				
				settings.callback(displayedResources);
			});
		}
		else if (settings.resourceIds || settings.resourceForeignIds) {
			var ids = settings.resourceIds || settings.resourceForeignIds;
			var isForeignId = settings.resourceForeignIds != null;
			this._loadAndShowRes(ids, isForeignId, settings.callback);
		}
		else {
			settings.callback([]);
		}
	},	
	
	/**
	 * API Method
	 * @param resetMap
	 * Removes all resources from the map, but not the user added map objects
	 */
	clearAll : function(){
		this.resetCategories(true);
	},
	
	/**
	 * API Method
	 * Loads and shows the detail panel of a resource
	 * @param id Id of the resource to show
	 */
	showResourceDetail : function(id) {
		this._loadAndShowRes(id);
	},
	
	/**
	 * API Method
	 * Closes the detail panel of the current resource
	 */
	closeResourceDetail : function() {
		this.closeResDetail(true,false);
	},
	
	/**
	 * API Method
	 * Shows all resources of this category and highlights category in menu (if visible)
	 * @param id Category id to be shown
	 * @param showOverviewPanel if the overview panel shoud be shown, optional default true
	 */
	showCategory : function(id, showOverviewPanel) {
		showOverviewPanel = showOverviewPanel === undefined ? true : showOverviewPanel;
		
		if ($.inArray(id, this.selectedCategories) != -1) {
			return;
		}
		else {
			this.toggleCategory(id, !showOverviewPanel);
		}
	},
	
	/**
	 * API Method
	 * Hides all resources of this category and removes highlight in menu (if visible)
	 * @param id Category id to be hidden
	 */
	hideCategory : function(id) {
		if ($.inArray(id, this.selectedCategories) != -1) {
			this.toggleCategory(id);
		}
	},
	
	/**
	 * API Method
	 * @returns Array of currently bookmarked resources
	 */
	getBookmarks : function() {
		return this.watchlist;
	},
	
	/**
	 * API Method
	 * Adds resources by id to the watchlist
	 * @param newIds Array of id's to add to the watchlist
	 */
	addBookmarks : function(newIds) {
		var outer = this;
		
		var ids = [];
		if (this.isLocalStorageSupported() && localStorage.getItem("wachtlist") != null){
			ids = localStorage.getItem("watchlist").split(",");
		}
		
		for (var i=0;i<newIds.length;i++) {
			var found = false;
			for (var j=0;j<ids;j++) {
				if (newIds[i] == ids[j]) {
					found = true;
					break;
				}
			}
			
			if (!found) {
				ids.push(newIds[i]);
			}
		}
		
		this.loadWatchlistResources(ids, function() {
			outer.updateWatchlistString();
			outer.updateWatchlistStorage();
			
			for (var i=0;i<outer.watchlist.length;i++) {
				outer.addResourceToMap(outer.watchlist[i]);
			}
			
			outer.mapCluster.resetAndCluster(false);
		});
	},
	
	/**
	 * API Method
	 * @param resource id to remove from bookmarks
	 */
	removeBookmark : function(id) {
		this.watchlist = $.grep(this.watchlist, function(val) {
			return val.getId() != id; }
		);
		this.updateWatchlistString();
		this.updateWatchlistStorage();
	},
		
	/**
	 * API Method
	 * Adds a loaded resource to the map
	 * @param resource Resource to add to map
	 * @param rebuildCluster Rebuild cluster after adding
	 */
	addResourceToMap : function(resource, rebuildCluster) {
		this.map.addResource(resource);
		if (this.mapCluster && rebuildCluster) {
			this.mapCluster.resetAndCluster(false);
		}
	},
	
	/**
	 * API Method
	 * Remove a resource from the map.
	 * @param id of the resource that should be removed
	 * @param rebuildCluster If the map resources should be reclustered automatically
	 */
	removeResourceFromMap : function(id, rebuildCluster) {
		this.map.removeResourceCb(function(resource) {
			return resource.id == id;
		});
		if (this.mapCluster && rebuildCluster) {
			this.mapCluster.resetAndCluster(true);
		}
	},
	
	/**
	 * API Method
	 * Rebuilds all clusters on the map after resources are removed or added
	 * @param fullRebuild Full rebuild is only needed after removal of resources
	 */
	rebuildMapClusters : function(fullRebuild) {
		if (this.mapCluster) {
			return;
		}
		this.mapCluster.resetAndCluster(fullRebuild);
	},
	
	/**
	 * API Method
	 * Gets the map 
	 */
	getMapCenter : function(center) {
		return this.map.getCenter();
	},
	
	/**
	 * API Method
	 * Sets the map center to the specified position
	 * @param center nefos.LatLng object to set map center
	 */
	setMapCenter : function(center) {
		this.map.setCenter(center);
	},
	
	/**
	 * API Method
	 * Fits the map bounds to show all resources in the list
	 * @param resources List of resources for bounds
	 */
	fitMapBounds : function(resources) {
		var bounds = this.getResourceBounds(resources);
		if (bounds.ne != null) {
			this.map.fitBounds(bounds);
		}
	},
	
	/**
	 * API Method
	 * Pans the map to the specified resource
	 * @param resource Resource to pan to
	 */
	panMapTo : function(resource) {
		this.panToResource(resource);
	},
	
	/**
	 * API Method
	 * Sets the zoom level of the map
	 * @param zoomLevel to set
	 */
	setMapZoomLevel : function(zoomLevel) {
		this.map.setZoomLevel(zoomLevel);
	},
	
	/**
	 * API Method
	 * Gets the zoom level of the map
	 * @returns zoomLevel ot the map
	 */
	getMapZoomLevel : function() {
		return this.map.getZoomLevel();
	},
	
	/**
	 * API Method
	 * Sets the view, center and zoom, of the map in one step
	 * @param center nefos.LatLng center of map
	 * @param zoom desired zoomLevel
	 */
	setMapView : function(center, zoom) {
		this.map.setView(center, zoom);
	},
	
	/**
	 * API Method
	 * Sets the speficied map type. 
	 * @param mapType Valid values are: summer, winter, satellite
	 */
	setMapBaseType : function(mapType) {
		var lastMapType = this.map.getMapTypeName();
		
		this.setMapType(mapType);
		
		//Emit event for switching category menu
		if(mapType != lastMapType){
			this.emitEvent("mapTypeSwitch", lastMapType);
		}
	},
	
	/**
	 * API Method
	 * Adds a user managed geoObject to the map
	 * @param geoObject To add to the map
	 */
	addUserMapObject : function(geoObject) {
		this.map.addRawGeoObject(geoObject, true);
	},
	
	/**
	 * API Method
	 * Removes a user managed geoObject from the map
	 * @param geoObject To remove to the map
	 */
	removeUserMapObject : function(geoObject) {
		this.map.removeRawGeoObject(geoObject);
	},
	
	/**
	 * API Method
	 * Returns a list of all map categories
	 */
	getCategories : function() {
		return this.categories;
	},
	
	/**
	 * API Method
	 * Returns a list of all linked mediums of a resource
	 */
	loadResourceMediums : function(resource, callback) {
		return this.getResourcePictures(resource, callback);
	},
	
	
	/**
	 * API Method
	 * Returns the absolute URL of a medium
	 * @param medium 
	 * @param size (optional) Size of image if medium is an image
	 */
	getMediumUrl : function (medium, size) {
		return this.getUploadImage(medium, size);
	}
});


nefos.components = {
		OverviewPanel : function(settings){
			var resources = settings.resources;
			var categoryId = settings.categoryId;
			var getPageImage = settings.getPageImage;
			var difficultyCallback = settings.difficultyCallback;
			var categoryName = settings.categoryName;		
			var onResourceClick = settings.onResourceClick; //for now simple callbacks without event subscribing.
			var onResourceOver = settings.onResourceOver;
			var onResourceOut = settings.onResourceOut;
			var hutId = settings.hutId;
			var interfaceDir = settings.interfaceDir;
			
			$('#nefos-panelMenuContainer').remove();
			
			//TODO: hardcoded divs. should optimally only return an html string.
			$('#nefos-info-north').html(categoryName);
			$('#nefos-info-south').html("");
			$('#nefos-info-center-west').css('width', '100%');
			$('#nefos-info-center-east').html('');
					
			var routen = "<div id=\"nefos-overview\">";
						
			for (var k=0;k<resources.length;k++) {
				var subRes = resources[k].resources;
				//TODO: we need to think about a proper event handling. 
				//EventEmitter seems a bit overkill, a simple callback for now
				
				if (subRes && subRes.length > 0 && resources.length > 1) {
					routen += "<a class='nefos-overviewLink' href='javascript: void(0)'>";
					
					var group = resources[k].group;
					routen += "<div class='nefos-overviewEntry'><div class='nefos-overviewIcon'><div class='nefos-overviewIconNumber'>" + subRes.length + "</div></div>";
					routen += "<div class='nefos-overviewText nefos-overviewGroupText' style='padding-top:7px'>" + group + "</div>" +
							"<div class='nefos-overviewPlus'></div>" +
							"<div style='clear:both'></div></div>";
					routen += "</a><div style='display:none' class='nefos-overviewGroup' id='nefos-overviewgroup_" + k + "'>";
				}
				
				for(var i=0;i<subRes.length;i++){
					var res = subRes[i];
					var src = nefos.PageInstance.getMapIcon(res);
					
					routen += '<a class="nefos-resourceLink" href="javascript: void(0)" id="nefos-resourceListIdx_' + res.listIndex +  '"><div class="nefos-overviewEntry">';
					routen += "<div class='nefos-overviewIcon'><img src='" + src + "'></div>";
					routen += '<div class="nefos-overviewText">' + res.content.name;
					
					if(nefos.Globals.GetObjectType(res.content.objectType) == nefos.Globals.ResourceType.Route){	
						routen += '<div class="nefos-overviewSubtext">';
						//testing if callback exists this way because of anonymous function, f.ex Achensee
						if(difficultyCallback()) {
							routen += difficultyCallback(res);
						}
						else {
							var show = false;
							if (nefos.GetValue(res.content["Länge"]) != "")	{
								routen += nefos._("length") + ": " + nefos.GetValue(res.content["Länge"]) + "km, ";
								show = true;
							}
							if (nefos.GetValue(res.content["Dauer"]) != "") {
					    		routen += nefos._("duration") + ": " + nefos.GetValue(res.content.Dauer) + "h";
					    		show = true;
							}
							if (nefos.GetValue(res.content["type"]) != "" && !show) {
					    		routen += nefos.GetValue(res.content.type);
							}
							if (res.content.Kondition && !show) {
								routen += nefos.components.utils.BuildDifficultyBar({
									difficulty: res.content.Kondition
								});
							}
						}
						routen += '</div></div>';
					}
					else if (nefos.GetValue(res.content.type) != ""){
						routen += '<div class="nefos-overviewSubtext">' + nefos.GetValue(res.content.type) + '</div></div>';
					}
					else if (nefos.GetValue(res.content.Pistennummer) != ""){
						routen += '<div class="nefos-overviewSubtext">' + nefos._('pistNumber') + ": " + nefos.GetValue(res.content.Pistennummer) + '</div></div>';
					}
					else if (nefos.GetValue(res.content["Höhe"]) != ""){
						routen += '<div class="nefos-overviewSubtext">' + nefos._('height') + ": " + nefos.GetValue(res.content["Höhe"]) + 'm</div></div>';
					}
					else if (nefos.GetValue(res.content.PLZ) != "" && nefos.GetValue(res.content.Ort) != "") {
						routen += '<div class="nefos-overviewSubtext">';
						routen += res.content.PLZ + " " + res.content.Ort;
						routen += '</div></div>';
					}
					else {
						routen += "</div>"; //close text div
					}
									
					routen += '<div style="clear:both;"></div></div></a>';
				}
				if (subRes && subRes.length > 0 && resources.length > 1) {
					routen += "</div>";
				}
			}
			if(categoryId == hutId){
				$('#nefos-info-north').prepend('<a href="javascript:nefos.PageInstance.printHutOverview();"><img alt="' + nefos._('hutOverview') + '" title="' + nefos._('hutOverview') + '" src="' + getPageImage("f_print_hut.png") + '" align="absmiddle"></a>');
			}
			
			$('#nefos-info-center-west').empty().html(routen + "</div>");
			
			var $overviewContainer = $("#nefos-overview");
	
			var evtString = onResourceOver ? "click mouseenter mouseleave" : "click";
			
			$overviewContainer.on(evtString, "a", function(event) {
				var $this = $(this);
				var overview = $this.hasClass("nefos-overviewLink");
				
				if (overview) {				
					if (event.type === "click") {
						var $grp = $this.next();
						if (!$grp.hasClass("nefos-visibleOverviewGroup")) {
							
							$("#nefos-overview").find("div.nefos-overviewMinus").removeClass("nefos-overviewMinus").addClass("nefos-overviewPlus");
							$overviewContainer.find("div.nefos-overviewGroup").removeClass("nefos-visibleOverviewGroup").slideUp("fast");
							
							$grp.addClass("nefos-visibleOverviewGroup").slideDown("normal", function() {
								nefos.components.InitScrollPanel($this);
							});
							$this.find("div.nefos-overviewPlus").removeClass("nefos-overviewPlus").addClass("nefos-overviewMinus");
						}
						else {
							$overviewContainer.find("div.nefos-overviewGroup").removeClass("nefos-visibleOverviewGroup").slideUp("normal",function() {
								nefos.components.InitScrollPanel($this);
							});
							$overviewContainer.find("div.nefos-overviewMinus").removeClass("nefos-overviewMinus").addClass("nefos-overviewPlus");
						}
					}
					return;
				}
				else {
					var listIdx = parseInt($(this).attr("id").replace("nefos-resourceListIdx_",""));
					if (event.type === "mouseenter") {
						onResourceOver(listIdx);
					}
					else if (event.type === "mouseleave") {
						onResourceOut(listIdx);
					}
					else {
						onResourceClick(listIdx);
					}
				}
				
			});
			
			$('#nefos-infoContainer').stop().animate(interfaceDir, null, null, function(){
				$('#nefos-closeInfoContainer').show();
			});
		},
		
		EventOverviewPanel : function(settings){
			var resources = settings.resources;
			var getPageImage = settings.getPageImage;
			var difficultyCallback = settings.difficultyCallback;
			var categoryName = settings.categoryName;		
			var onResourceClick = settings.onResourceClick; //for now simple callbacks without event subscribing.
			var onResourceOver = settings.onResourceOver;
			var onResourceOut = settings.onResourceOut;
			var hutId = settings.hutId;
			
			$('#nefos-panelMenuContainer').remove();
			
			//order the events by starting time
			var orderByStart = function(ress){
				var tmp, change = true;
				
				while(change == true){
					change = false;
					for(var i=0; i<ress.length-1; i++){
						if(ress[i].content.start > ress[i+1].content.start){
							change = true;
							tmp = ress[i];
							ress[i] = ress[i+1];
							ress[i+1] = tmp;
						}
					}
				}
			};
			
			//TODO: hardcoded divs. should optimally only return an html string.
			$('#nefos-info-north').html(categoryName);
			$('#nefos-info-south').html("");
			$('#nefos-info-center-west').css('width', '100%');
			$('#nefos-info-center-east').html('');
					
			var html = "<div>";
						
			for (var k=0;k<resources.length;k++) {
				var subRes = resources[k].resources;
				orderByStart(subRes);
				
				if (subRes && subRes.length > 0) {
					html += '<div class="nefos-eventGroup"><div class="nefos-calendarIcon"><div class="nefos-overviewCalMonth">' + resources[k].date.format("mmm") + "</div><div class='nefos-overviewCalDay'>" + resources[k].date.format("d") + "</div></div>";
				}
				
				for(var i=0;i<subRes.length;i++){
					var res = subRes[i];
					var src = nefos.PageInstance.getMapIcon(res);
					
					html += '<a class="nefos-resourceLink" href="javascript: void(0)" id="nefos-resourceListIdx_' + res.listIndex +  '"><div class="nefos-overviewEntry" style="float:right;">';
					html += "<div class='nefos-overviewIcon'><img src='" + src + "'></div>";
					html += '<div class="nefos-overviewText" style="width:276px;">' + res.content.name;
					html += '<div class="nefos-overviewSubtext">';
					html += res.content.start;
					
					if(res.content.end){
			    		html += " - " + res.content.end;
					}
					html += '</div></div>';
									
					html += '<div style="clear:both;"></div></div><div style="clear:both;"></div></a>';
				}
				
				if (subRes && subRes.length > 0) {
					html += '</div>';
				}
			}
			
			var $overviewContainer = $("#nefos-info-center-west");
			$overviewContainer.empty().html(html + "</div>");
			
			var evtString = onResourceOver ? "click mouseenter mouseleave" : "click";
			
			$overviewContainer.on(evtString, "a", function(event) {
				var $this = $(this);
				var listIdx = parseInt($this.attr("id").replace("nefos-resourceListIdx_",""));
				
				if (event.type === "mouseenter") {
					onResourceOver(listIdx);
				}
				else if (event.type === "mouseleave") {
					onResourceOut(listIdx);
				}
				else {
					onResourceClick(listIdx);
				}
				
			});
						
			$('#nefos-infoContainer').stop().animate({
				right: "0px"
			}, null, null, function(){
				$('#nefos-closeInfoContainer').show();
			});
		},
		
		InitScrollPanel : function($el) {
			$('#nefos-infoContainer').easyScroll("update");
			if ($el) {
				$('#nefos-infoContainer').easyScroll().scrollToElement($el);
			}
		},
		
		//display the name of serviceprovider the other way around (Puz-style)
		GetCorrectedSpName : function(name){
			if(!name){
				return "";
			}
			
			var splitted = name.split(',');
			var erg = splitted[splitted.length-1].replace(/^\s+|\s+$/g, '');
			
			if(splitted.length > 1){
				erg += ' ' + splitted[0].replace(/^\s+|\s+$/g, '');
			}
			
			return erg;
		},
		
		InfoPanel : function(settings){
			var resource = settings.resource;
			var image = settings.image;
			var getPageImage = settings.getPageImage;
			var getUploadImage = settings.getUploadImage;
			var categoryName = settings.categoryName;
			var difficultyCallback = settings.difficultyCallback;
			var interfaceDir = settings.interfaceDir;
			
			var ncu = nefos.components.utils;

			if(image != null){
				$('#nefos-infoField-img').html('<img style="height:100px" src="' + getUploadImage(image.src, true) + '" />');
			}
			else{
				//$('#nefos-infoField-img').css("height", "0px"); [FF] this is bs.
				$('#nefos-infoField-img').html("");
			}
			
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Route){
				
				var diff = '';
				//testing if callback exists this way because of anonymous function
				if(difficultyCallback()){
					diff = difficultyCallback(resource);
				}
				else{
					diff = ncu.BuildDifficultyBar(resource.content.Kondition);
				}
				
				$('#nefos-infoField-north').html("<div>" + categoryName + "</div><div style=\"margin-bottom:5px;\">" + diff + "</div>");
				$('#nefos-infoField-center').html("<div id=\"nefos-infoFieldName\" style=\"margin-bottom:5px;\"><b>" + resource.content.name + "</b></div><div id=\"nefos-infoFieldTeaser\">" + nefos.GetValue(resource.content.teaser) + "</div>"
					+ (resource.content.Dauer ? "<div class=\"nefos-infoElementLeft\"><img class=\"nefos-infoImage\" src=\"" + getPageImage("time_orange.png") + "\"><div class=\"nefos-infoField\"><div class=\"nefos-infoCaption\">" + nefos._("duration") + "</div><div class=\"nefos-infoText\">" + nefos.GetQmValue(resource.content.Dauer) + " h</div></div></div>" : "")
					+ (resource.content["Höhenmeter Auf"] ? "<div class=\"nefos-infoElementRight\"><img class=\"nefos-infoImage\" src=\"" + getPageImage("height_orange.png") + "\"><div class=\"nefos-infoField\"><div class=\"nefos-infoCaption\">" + nefos._("altitude") + "</div><div class=\"nefos-infoText\">" + nefos.GetQmValue(resource.content["Höhenmeter Auf"]) + " m</div></div></div>" : "") + "<div style=\"clear:both\"></div>"
					+ (resource.content["Länge"] ? "<div class=\"nefos-infoElementLeft\"><img class=\"nefos-infoImage\" src=\"" + getPageImage("length_orange.png") + "\"><div class=\"nefos-infoField\"><div class=\"nefos-infoCaption\">" + nefos._("length") + "</div><div class=\"nefos-infoText\">" + nefos.GetQmValue(resource.content["Länge"]) + " km</div></div></div>" : "")
					+ (resource.content["Höchster Punkt"] ? "<div class=\"nefos-infoElementRight\"><img class=\"nefos-infoImage\" src=\"" + getPageImage("max_height_orange.png") + "\"><div class=\"nefos-infoField\"><div class=\"nefos-infoCaption\">" + nefos._("maxAltitude") + "</div><div class=\"nefos-infoText\">" + nefos.GetQmValue(resource.content['Höchster Punkt']) + " m</div></div></div>" : "") + "<div style=\"clear:both;\"></div>");
			}
			else if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Camera){
				$('#nefos-infoField-img').css("height", "100px");
				$('#nefos-infoField-north').html("<div style=\"margin-bottom:7px;\">" + categoryName + "</div>");
				
				if(image == null){
					if(resource.content["direkter Link"]){
						$('#nefos-infoField-img').html("<img id=\"camPicture\" style=\"height:100px; width:200px;\" src=\"http://" + resource.content["direkter Link"] + "\">");
					}
					else{
						$('#nefos-infoField-img').html("<img id=\"camPicture\" style=\"height:100px; width:200px;\" src=\"http://" + resource.content.Link + "\">");
					}
				}
				
				$('#nefos-infoField-center').html('<div style="margin-bottom:5px;"><b>' + resource.content.name + '</b></div>');
			}
			else if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Homepage){
				$('#nefos-infoField-north').html("<div style=\"margin-bottom:7px;\">" + categoryName + "</div>");
				$('#nefos-infoField-center').html("<div style=\"margin-bottom:5px;\"><b>" + resource.content.name + "</b></div><div id=\"nefos-infoFieldTeaser\">" + nefos.GetValue(resource.content.teaser) + "</div>");
			}
			else if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.ServiceProvider || nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Infrastruktur){
				$('#nefos-infoField-north').html("<div style=\"margin-bottom:7px;\"><div style=\"float:left;margin-right:10px;\">" + categoryName + "</div>" + ncu.BuildStarBar(resource.content.stars, getPageImage) + "</div><div style=\"clear:both;\"></div>");
				$('#nefos-infoField-center').html("<div style=\"margin-bottom: 8px;\"><b>" + this.GetCorrectedSpName(resource.content.name) + "</b></div>" +
					"<div>" + nefos.GetValue(resource.content.title) + " " + nefos.GetValue(resource.content.firstName) + " " + nefos.GetValue(resource.content.lastName) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.addressLine1) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.addressLine2) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.zipCode) + "  " + nefos.GetValue(resource.content.town) + "</div>");
			}
			else {
				$('#nefos-infoField-north').html("<div style=\"margin-bottom:7px;\">" + categoryName + "</div>");
				$('#nefos-infoField-center').html("<div style=\"margin-bottom: 8px;\"><b>" + resource.content.name + "</b></div><div id=\"nefos-infoFieldTeaser\" style=\"margin-bottom:10px;\">" + nefos.GetValue(resource.content.teaser, true) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.Kontakt) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.Strasse) + "  " + nefos.GetValue(resource.content.Hausnummer) + "</div>" +
					"<div>" + nefos.GetValue(resource.content.PLZ) + "  " + nefos.GetValue(resource.content.Ort) + "</div>");
			}
			
			$('#nefos-infoField').stop().animate(interfaceDir, null, null, function(){
				$('#nefos-closeInfoField').show();
			});
		},
			
		DetailPanel : function(settings){		
			var resource = settings.resource;
			var getPageImage = settings.getPageImage;
			var getUploadImage = settings.getUploadImage;
			var resourceCategories = settings.resourceCategories;
			var getBookingLink = settings.getBookingLink;
			var resourcesAvailiable = settings.resourcesAvailiable;
			var categories = settings.categories;
			var interfaceDir = settings.interfaceDir;
			var generateBarcode = settings.generateBarcode;
			var ncu = nefos.components.utils;
			var mandatorConfig = settings.mandatorConfig;

			$('#nefos-info-center-east').html('');
			$('#nefos-panelMenuContainer').remove();
			
			//Helper
			//check if all entries of path panel are blank
			var noPath = function(resource) {
				var noVal = function(prop){
					if(typeof prop != "undefined" && prop != 0){
						return false;
					}
					return true;
				};
				
				return noVal(resource.content.Asphalt)
					&& noVal(resource.content.Schotter)
					&& noVal(resource.content.Steig)
					&& noVal(resource.content['Wald-, Wanderweg'])
					&& noVal(resource.content.Wiesenweg)
					&& noVal(resource.content.Pfad)
					&& noVal(resource.content['Radweg asphaltiert'])
					&& noVal(resource.content.Singletrail);
			};
			
			//Helper
			//check if all entries of info panel are blank
			var noInfo = function(resource){
				return nefos.noVal(resource.content.type)
					&& nefos.noVal(resource.content.Skigebiet)
					&& nefos.noVal(resource.content.Pistennummer)
					&& nefos.noVal(resource.content.Kategorie)
					&& nefos.noVal(resource.content.Charakteristik)
					&& nefos.noVal(resource.content["Felsqualität"])
					&& nefos.noVal(resource.content["Routenlänge"])
					&& nefos.noVal(resource.content.Schwierigkeitsgrad)
					&& nefos.noVal(resource.content["Beste Jahreszeit"])
					&& nefos.noVal(resource.content.Exposition)
					&& nefos.noVal(resource.content["Seehöhe"])
					&& nefos.noVal(resource.content.Absicherung)
					&& nefos.noVal(resource.content.Kinderfreundlich)
					&& nefos.noVal(resource.content.Dauer)
					&& nefos.noVal(resource.content["Höhenmeter"])
					&& nefos.noVal(resource.content.date
					&& nefos.noVal(resource.content.start)
					&& nefos.noVal(resource.content.end)
					&& nefos.noVal(resource.content.repeat)
					&& nefos.noVal(resource.content.priceAdult)
					&& nefos.noVal(resource.content.priceChildren)
					&& nefos.noVal(resource.content.reductions)
					&& nefos.noVal(resource.content.deadline)
					&& nefos.noVal(resource.content.location));
			};
			
			//Helper
			//check if all entries of contact info are blank
			var noContact = function(resource){
				return nefos.noVal(resource.content.Kontakt)
					&& nefos.noVal(resource.content.Strasse)
					&& nefos.noVal(resource.content.Hausnummer)
					&& nefos.noVal(resource.content.PLZ)
					&& nefos.noVal(resource.content.Ort)
					&& nefos.noVal(resource.content.Telefon)
					&& nefos.noVal(resource.content.Mobil)
					&& nefos.noVal(resource.content.Fax)
					&& nefos.noVal(resource.content.Email)
			};
			
			//north info
			$('#nefos-info-north').html("<img class='nefos-backIcon' id='nefos-backToOverviewIcon' alt='" + nefos._('back') + "' title='" + nefos._('back') + "' align='absmiddle' src='" + getPageImage("f_back.png") + "'>" + this.GetCorrectedSpName(resource.content.name));
			$('#nefos-info-center-west').css('width', '60%');

			var catArray = resourceCategories.split(",");
			
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Route){
				//begin center info west
				var centerWest = '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("basicData") + '</div><div class="nefos-infoBody">'
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("type"), catArray[0]);
				
				if(catArray.length > 1){
					centerWest += ncu.BuildInfoElement("nefos-infoKey", nefos._("category"), catArray[catArray.length-1]);
				}
				
				centerWest += ncu.BuildInfoElement("nefos-infoKey", nefos._("crossCountryType"), resource.content['Loipenart'])
					+ ncu.BuildYesNoElement(nefos._("snowed"), resource.content['snowed'])
					+ ncu.BuildYesNoElement(nefos._("crossCountryTypeClassic"), resource.content['crossCountryTypeClassic'])
					+ ncu.BuildYesNoElement(nefos._("crossCountryTypeSkating"), resource.content['crossCountryTypeSkating'])
					+ ncu.BuildYesNoElement(nefos._("crossCountryTypeSledge"), resource.content['crossCountryTypeSledge'])
					+ ncu.BuildYesNoElement(nefos._("lighted"), resource.content['lighted'])
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("number"), resource.content.Nummer)
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("condition"), '', resource.content.Kondition, nefos.Globals.difficultySquareColorA, nefos.Globals.difficultySquareColorB)
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("panorama"), '', resource.content.Panorama, nefos.Globals.difficultySquareColorA, nefos.Globals.difficultySquareColorB)
					+ ncu.BuildInfoElement({key: nefos._("length"), val: nefos.GetValue(resource.content["Länge"]), unit: 'km', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("duration"), val: nefos.GetValue(resource.content.Dauer), unit: 'h', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("altitude"), val: nefos.GetValue(resource.content["Höhenmeter"]), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("startAltitude"), val: nefos.GetValue(resource.content['startHeight']), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("targetAltitude"), val: nefos.GetValue(resource.content['targetHeight']), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("altitude") + ' &Delta;', val: nefos.GetValue(resource.content['Höhenmeter Auf']), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("altitude") + ' &nabla;', val: nefos.GetValue(resource.content['Höhenmeter Ab']), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement({key: nefos._("maxAltitude"), val: nefos.GetValue(resource.content['Höchster Punkt']), unit: 'm', keyClass: 'nefos-infoKey'})
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("terrain"), nefos.GetValue(resource.content.terrain))
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("routeStart"), resource.content.Start)
					+ ncu.BuildInfoElement("nefos-infoKey", nefos._("routeFinish"), resource.content.Ziel)
				+ '</div></div>';
				
				if(!noPath(resource)){
					centerWest += '<div id="pathGroup" class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("character") + '</div><div class="nefos-infoBody">'
						+ ncu.BuildInfoElementPath(nefos._("asphalt"), resource.content.Asphalt)
						+ ncu.BuildInfoElementPath(nefos._("brokenStone"), resource.content.Schotter)
						+ ncu.BuildInfoElementPath(nefos._("hillClimbing"), resource.content.Steig)
						+ ncu.BuildInfoElementPath(nefos._("hikingTrail"), resource.content['Wald-, Wanderweg'])
						+ ncu.BuildInfoElementPath(nefos._("grasslandTrail"), resource.content.Wiesenweg)
						+ ncu.BuildInfoElementPath(nefos._("trail"), resource.content.Pfad)
						+ ncu.BuildInfoElementPath(nefos._("bikeAsphalt"), resource.content['Radweg asphaltiert'])
						+ ncu.BuildInfoElementPath(nefos._("singleTrail"), resource.content.Singletrail)
					+ '</div></div>';
				}
				
				centerWest += '<div id="altProf" class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("heightProfile") + '</div><div class="nefos-infoBody">'
				+ '<div id="nefos-miniAltitudeProfile"></div>'
				+ '</div></div>';
				
				$('#nefos-info-center-west').html(centerWest);
				
				var southHtml = "";
				if(resource.content.description && resource.content.description != '<br />\r\n'){
					southHtml += '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('description') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
						+ resource.content.description
					+ '</div></div>';
				}
				
				if(resource.content.Information){
					southHtml += '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('additionalInfo') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
						+ resource.content.Information
					+ '</div></div>';
				}
				
				$('#nefos-info-south').html(southHtml);
				
				//begin center info east				
				var rightHtml = '';
				
				if(nefos.GetValue(resource.content.Dauer) != ''){
					rightHtml += '<div class="nefos-infoGroupRight">'
						+ '<div class="nefos-infoRightHeading"><div class="nefos-infoRightCaption">' + nefos._("duration") + '</div><div class="nefos-infoRightImg"><img src="' + getPageImage("time_orange.png") + '"></div><div style="clear:both;"></div></div>'
						+ '<div style="height:0px;"><hr style="width:120px;"/></div>'
						+ '<div class="nefos-infoRightValue">' + nefos.GetValue(resource.content.Dauer) + ' h</div>'
					+ '</div>';
				}
				
				if(nefos.GetValue(resource.content["Länge"]) != ''){
					rightHtml += '<div class="nefos-infoGroupRight">'
						+ '<div class="nefos-infoRightHeading"><div class="nefos-infoRightCaption">' + nefos._("length") + '</div><div class="nefos-infoRightImg"><img src="' + getPageImage("length_orange.png") + '"></div><div style="clear:both;"></div></div>'
						+ '<div style="height:0px;"><hr style="width:120px;"/></div>'
						+ '<div class="nefos-infoRightValue">' + nefos.GetValue(resource.content["Länge"]) + ' km</div>'
					+ '</div>';
				}
				
				if(nefos.GetValue(resource.content["Höhenmeter"]) != ''){
					rightHtml += '<div class="nefos-infoGroupRight">'
						+ '<div class="nefos-infoRightHeading"><div class="nefos-infoRightCaption">' + nefos._("altitude") + '</div><div class="nefos-infoRightImg"><img src="' + getPageImage("height_orange.png") + '"></div><div style="clear:both;"></div></div>'
						+ '<div style="height:0px;"><hr style="width:120px;"/></div>'
						+ '<div class="nefos-infoRightValue">' + nefos.GetValue(resource.content["Höhenmeter"]) + ' m</div>'
					+ '</div>';
				}
				
				if(nefos.GetValue(resource.content['Höchster Punkt']) != ''){
					rightHtml += '<div class="nefos-infoGroupRight">'
						+ '<div class="nefos-infoRightHeading"><div class="nefos-infoRightCaption">' + nefos._("maxAltitude") + '</div><div class="nefos-infoRightImg"><img src="' + getPageImage("max_height_orange.png") + '"></div><div style="clear:both;"></div></div>'
						+ '<div style="height:0px;"><hr style="width:120px;"/></div>'
						+ '<div class="nefos-infoRightValue">' + nefos.GetValue(resource.content['Höchster Punkt']) + ' m</div>'
					+ '</div>';
				}
								
				$('#nefos-info-center-east').append(rightHtml);
				$('div.nefos-infoKey').css('width', '120px');
			}
			else{
				//begin center info west
				if(nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.ServiceProvider && nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.Infrastruktur){
					var westHtml = "";
					
					if(!noContact(resource)){
						westHtml += '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("contactInfo") + '</div><div class="nefos-infoBody">'
							+ '<div>' +  nefos.GetValue(resource.content.Kontakt) + '</div>'
							+ "<div>" +  nefos.GetValue(resource.content.Strasse) + "  " +  nefos.GetValue(resource.content.Hausnummer) + "</div>"
							+ "<div style=\"margin-bottom:10px;\">" + nefos.GetValue(resource.content.PLZ) + "  " + nefos.GetValue(resource.content.Ort) + '</div>'
							+ ncu.BuildTelInfoElement("nefos-infoKeyShort", nefos._("telephone"), resource.content.Telefon)
							+ ncu.BuildTelInfoElement("nefos-infoKeyShort", nefos._("mobile"), resource.content.Mobil)
							+ ncu.BuildShortInfoLink('Email', resource.content.Email, true)
							+ ncu.BuildShortInfoLink('Website', resource.content.Website)
						+ '</div></div>';
					}
					
					if(!noInfo(resource)){
						westHtml += '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("information") + '</div><div class="nefos-infoBody">'
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('type'), resource.content.type)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('skiResort'), resource.content.Skigebiet)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('pistNumber'), resource.content.Pistennummer)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('category'), resource.content.Kategorie)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('rockQuality'), resource.content["Felsqualität"])
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('routeLength'), resource.content["Routenlänge"])
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('routeCount'), resource.content.Routenanzahl)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('targetGroup'), resource.content.Zielgruppe)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('difficulty'), resource.content.Schwierigkeitsgrad)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('bestSeason'), resource.content["Beste Jahreszeit"])
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('exposition'), resource.content.Exposition)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('seaHeight'), resource.content["Seehöhe"])
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('safety'), resource.content.Absicherung)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('childrenFriendly'), resource.content.Kinderfreundlich)
							+ ncu.BuildInfoElement({keyClass: "nefos-infoKey", key: nefos._('duration'), val: resource.content.Dauer, unit: "h"})
							+ ncu.BuildInfoElement({keyClass: "nefos-infoKey", key: nefos._('altitude'), val: resource.content["Höhenmeter"], unit: "m"});
							
							if(!resource.content.repeat || resource.content.repeat == 0){
								westHtml += ncu.BuildInfoElement("nefos-infoKey", nefos._('date'), new Date(resource.content.date).format("ddd mmm d, yyyy"));
							}
							else if(nefos.dateUtils.GetNextDate(resource) != null){
								westHtml += ncu.BuildInfoElement("nefos-infoKey", nefos._('date'), nefos.dateUtils.GetNextDate(resource).format("ddd mmm d, yyyy"));
							}
						
							westHtml += ncu.BuildInfoElement("nefos-infoKey", nefos._('location'), resource.content.location)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('start'), resource.content.start)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('end'), resource.content.end)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('priceAdult'), resource.content.priceAdult)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('priceChildren'), resource.content.priceChildren)
							+ ncu.BuildInfoElement("nefos-infoKey", nefos._('reductions'), resource.content.reductions)
							+ ncu.BuildInfoElement({keyClass: "nefos-infoKey", key: nefos._('ropeLength'),val: resource.content["Seillänge"], unit: "m"})
							+ ncu.BuildShortInfoLink('Website', resource.content.Website)
						+ '</div></div>';
					}
					
					$('#nefos-info-center-west').html(westHtml);
				}
				else{
					$('#nefos-info-center-west').html('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("contactInfo") + '</div><div class="nefos-infoBody">'
						+ '<div>' + nefos.GetValue(resource.content.title) + " " + nefos.GetValue(resource.content.firstName) + ' ' + nefos.GetValue(resource.content.lastName) + '</div>'
						+ "<div>" + nefos.GetValue(resource.content.addressLine1) + "</div>"
						+ "<div>" + nefos.GetValue(resource.content.addressLine2) + "</div>"
						+ "<div style=\"margin-bottom:10px;\">" + nefos.GetValue(resource.content.zipCode) + "  " + nefos.GetValue(resource.content.town) + '</div>'
						+ ncu.BuildTelInfoElement("nefos-infoKeyShort", nefos._("telephone"), resource.content.phone)
						+ ncu.BuildTelInfoElement("nefos-infoKeyShort", nefos._("mobile"), resource.content.mobile)
						+ ncu.BuildTelInfoElement("nefos-infoKeyShort", 'Fax', resource.content.fax)
						+ ncu.BuildShortInfoLink('Email', resource.content.email, true)
						+ ncu.BuildShortInfoLink('Website', (resource.content.url + '').replace(/http:\/\//, ""))
						+ ncu.BuildShortInfoLink('TVB', (resource.content.backlink + '').replace(/http:\/\//, ""))
					+ '</div></div>');
				}
				
				$('#nefos-info-south').html('');
				
				if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Hut){
					$('#nefos-info-center-west').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("information") + '</div><div class="nefos-infoBody">'
						+ '<div class="nefos-infoElement"><div class="nefos-infoKey">' + nefos._("height") + '</div><div class="nefos-infoValue">' + nefos.GetValue(resource.content["Höhe"]) + ' m</div><div style="clear:both;"></div></div>'
						+ ncu.BuildInfoElement("nefos-infoKey", nefos._("nation"), resource.content.Nation)
						+ ncu.BuildYesNoElement(nefos._("sleep"), resource.content["Übernachtung"])
						+ ncu.BuildInfoElement("nefos-infoKey", nefos._("openingHours"), resource.content.Sommersaison)
						+ ncu.BuildShortInfoLink('TVB', (resource.content.backlink + '').replace(/http:\/\//, ""))
					+ '</div></div>');
					
					if(resource.content.description && resource.content.description != '<br />\r\n'){
						$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('description') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
							+ resource.content.description
						+ '</div></div>');
					}
					
					$('div.nefos-infoKey').css('width', '100px');
				}
				else if((nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.Information) && (nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.PublicEvent)){
					if(nefos.Globals.GetObjectType(resource.content.objectType) != nefos.Globals.ResourceType.ServiceProvider){
						$('#nefos-info-center-west').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("categories") + '</div><div class="nefos-infoBody">'
								+ resourceCategories
						+ '</div></div>');
						
						if(resource.content.description && resource.content.description != '<br />\r\n'){
							$('#nefos-info-south').html('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('description') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
								+ resource.content.description
							+ '</div></div>');
						}
						
						if(resource.content["Öffnungszeiten"]){
							$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('openingHours') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
								+ resource.content["Öffnungszeiten"]
							+ '</div></div>');
						}
						
						if(resource.content.openingHours){
							$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('openingHours') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
								+ resource.content.openingHours
							+ '</div></div>');
						}
						
						if(resource.content.prices){
							$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('prices') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
								+ resource.content.prices
							+ '</div></div>');
						}
					}
					else{
						if(resource.content.stars || resource.content.classification){
							$('#nefos-info-center-west').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("classification") + '</div><div class="nefos-infoBody">'
									+ ncu.BuildStarInfoElement(nefos._("stars"), resource.content.stars, getPageImage)
									+ ncu.BuildInfoElement("nefos-infoKey", nefos._("classification"), resource.content.classification)
							+ '</div></div>');
						}
						
						var southHtml = "";
						
						if(resource.content.description){
							southHtml = '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('description') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
								+ resource.content.description
							+ '</div></div>';
						}
						
						if(resource.content.facilities){
							southHtml += '<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._("additionalInfo") + '</div><div class="nefos-infoBody">'
									+ resource.content.facilities
							+ '</div></div>';
						}
						
						$('#nefos-info-south').html(southHtml);
					}
					$('div.nefos-infoKey').css('width', '100px');
				}
				
				if(resource.content.Zustieg){
					$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('gotoDescription') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
						+ resource.content.Zustieg
					+ '</div></div>');
				}
				
				if(resource.content.Information){
					$('#nefos-info-south').append('<div class="nefos-infoGroup"><div class="nefos-infoHeading">' + nefos._('additionalInfo') + '</div><div id=\"nefos-infoContainerTeaser\" class="nefos-infoBody">'
						+ resource.content.Information
					+ '</div></div>');
				}
				
				if (resource.content.objectType.name == "artfabrik_panorama") {
					var img = getUploadImage(resource.images[0].src,"medium");
					$("#nefos-info-north").append("<div class='nefos-artPanoContainer'>" +
							"<img src='" + img + "' class='nefos-artPanoImg'>" +
							"<div class='nefos-artPanoButton' alt='" + nefos._('openPano')  + "' title='" + nefos._('openPano')  + "' onclick='document.location.href=\"http://" + resource.content.url + "\"'>" +
							"</div></div>");
					resource.imageGallery = false; 
					
				}
			}
			
			ncu.CreateToolBox({
				resource:resource,
				categories: categories,
				getBookingLink: getBookingLink,
				resourcesAvailiable: resourcesAvailiable,
				generateBarcode: generateBarcode,
				interfaceDir: interfaceDir
			});
			
			$('#nefos-miniAltitudeProfile').click(function(){
				new PopupWindow("#nefos-outerProfileContainer", {
					type: 'div',
					iframeWidth: 710,
					iframeHeight: 400,
					interfaceDir: interfaceDir
				});
			});
			
			$('div.facilityGroup, div.nefos-facilityGroup').click(function(){
				$('div.facilityGroupContent, div.nefos-facilityGroupContent').hide();
				
				var content = $(this.children[1]);
				content.show();
				nefos.PageInstance.initJsp(false);
			});
		}
};

nefos.components.utils = {
		
		BuildDifficultyBar : function(settings){
			var diff, colorA, colorB;
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];

				diff = settings.difficulty;
				colorA = settings.colorA;
				colorB = settings.colorB;
			}
			else {
				diff = arguments[0];
				colorA = arguments[1];
				colorB = arguments[2];
			}
			
			var bar = '<div class="nefos-difficultyBar">';
			
			for(var i=1; i<6; i++){
				if(i<=diff){
					bar += '<div class="nefos-difficultySquare difficultySquareColorA"></div>';
				}
				else{
					bar += '<div class="nefos-difficultySquare difficultySquareColorB"></div>';
				}
			}
			
			return bar + '<div style="clear:both;"></div></div>';
		},
		
		BuildTelInfoElement : function() {
			var key, val, difficulty, colorA, colorB, keyClass;
			var unit = "";
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];
				
				key = settings.key;
				val = settings.val;
				unit = settings.unit;
				difficulty = settings.difficulty;
				colorA = settings.colorA;
				colorB = settings.colorB;
				keyClass = settings.keyClass;
			}
			else {
				keyClass = arguments[0];
				key = arguments[1];
				val = arguments[2];
				difficulty = arguments[3];
				colorA = arguments[4];
				colorB = arguments[5];
			}
			
			return nefos.components.utils.BuildInfoElement({
				key: key,
				val: val,
				unit: unit,
				difficulty: difficulty,
				colorA : colorA,
				colorB : colorB,
				keyClass: keyClass
			});
		},
		
		BuildInfoElement : function() {
			var key, val, difficulty, colorA, colorB, keyClass;
			var unit = "";
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];
				
				key = settings.key;
				val = settings.val;
				unit = settings.unit;
				difficulty = settings.difficulty;
				colorA = settings.colorA;
				colorB = settings.colorB;
				keyClass = settings.keyClass;
			}
			else {
				keyClass = arguments[0];
				key = arguments[1];
				val = arguments[2];
				difficulty = arguments[3];
				colorA = arguments[4];
				colorB = arguments[5];
			}
			
			if(unit != ""){
				unit = " " + unit;
			}
			
			if(difficulty == null){
				if(typeof val != "undefined" && val != ""){
					return '<div class="nefos-infoElement"><div class="' + keyClass + '">' + key + '</div><div class="nefos-infoValue">' + val + unit + '</div><div style="clear:both;"></div></div>';
				}
				return "";
			}
			else{
				return '<div class="nefos-infoElement"><div class="' + keyClass + '">' + key + '</div><div class="nefos-infoValue">' + this.BuildDifficultyBar(difficulty) + '</div><div style="clear:both;"></div></div>';
			}
		},
		
		BuildInfoElementPath : function(key, val){
			if(typeof val != "undefined" && val != 0){
				return this.BuildInfoElement('nefos-infoKey', key, val + ' km');
			}
			return "";
		},
		
		CreateToolBox : function(settings){
			var resource = settings.resource;
			var categories = settings.categories;
			var getBookingLink = settings.getBookingLink;
			var resourcesAvailiable = settings.resourcesAvailiable;
			var generateBarcode = settings.generateBarcode;
			var interfaceDir = settings.interfaceDir;
			var html = "";
			
			if(generateBarcode){
				html += '<div id="nefos-generateQRCode" class="nefos-panelMenuItem"><i class="nefos-fontImage-barcode nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('generateQRCode') + '</span></div>';
			}
			
			html += '<div id="nefos-addToWatchlist" class="nefos-panelMenuItem"><i class="nefos-fontImage-bookmark nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._("toWatchlist") + '</span></div>';
			html += '<div id="nefos-removeFromWatchlist" class="nefos-panelMenuItem"><i class="nefos-fontImage-no-bookmark nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._("removeFromWatchlist") + '</span></div>';
			
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Route){
				html += '<div id="nefos-generateGPXFile" class="nefos-panelMenuItem"><i class="nefos-fontImage-gpxdownload nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('generateGPX') + '</span></div>';
			}
			
			html += '<div id="nefos-printResource" class="nefos-panelMenuItem"><i class="nefos-fontImage-print nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('print') + '</span></div>';
			
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.Hut){
				html += '<div id="nefos-printHuts" class="nefos-panelMenuItem"><i class="nefos-fontImage-print nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('hutOverview') + '</span></div>';
			}
			
			if(nefos.Globals.GetObjectType(resource.content.objectType) == nefos.Globals.ResourceType.ServiceProvider && getBookingLink && getBookingLink(resource) != ''){
				html += '<div id="nefos-bookingLink" class="nefos-panelMenuItem"><i class="nefos-fontImage-booking nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('bookingLink') + '</span></div>';
			}

			html += '<div id="nefos-routing" class="nefos-panelMenuItem"><i class="nefos-fontImage-routing nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('routing') + '</span></div>';
			html += '<div id="nefos-shareByMail" class="nefos-panelMenuItem"><i class="nefos-fontImage-mail nefos-panelMenuButton"></i><span class="nefos-panelMenuText">' + nefos._('shareByMail') + '</span></div>';
			html += '<div class="nefos-panelMenuItem"><i class="nefos-fontImage-facebook nefos-panelMenuButton" style="float:left;margin-top:4px;"></i><div class="nefos-shareFacebook" style="float:left;margin-left:3px;"></div><div style="clear:both;"></div></div>';
			html += '<div class="nefos-panelMenuItem"><i class="nefos-fontImage-twitter nefos-panelMenuButton" style="float:left;margin-top:4px;"></i><div class="nefos-shareTwitter" style="float:left;margin-left:3px"></div><div style="clear:both;"></div></div>';
			html += '<div class="nefos-panelMenuItem"><i class="nefos-fontImage-googleplus nefos-panelMenuButton" style="float:left;margin-top:4px;"></i><div class="nefos-shareGooglePlus" style="float:left;margin-left:3px"></div><div style="clear:both;"></div></div>';
			
			var showOverview = false;
			for (var i=0;i<resource.content.categories.length;i++) {
				if (categories[resource.content.categories[i]].showOverview) {
					showOverview = true;
					break;
				}
			}
			
			if(showOverview && resourcesAvailiable(resource.content.categories[0]) > 1){}
			else{
				$('#nefos-backToOverviewIcon').remove();
			}
			
			$('#nefos-infoContainer').parent().append('<div id="nefos-panelMenuContainer">' + html + '</div>');
			
			$('#nefos-infoContainer').animate(interfaceDir, null, null, function(){
				$('#nefos-closeInfoContainer').show();
				var $this = $(this);
				var pos = $this.position();
				var $panelMenu = $("#nefos-panelMenuContainer");
				
				$panelMenu = $("#nefos-panelMenuContainer").fadeIn("slow");
				
				$panelMenu.mouseenter(function() {
					$panelMenu.stop().animate({width: "180px"}, 700, function() {
						$(this).css("opacity",1);
					});
				});
				
				$panelMenu.mouseleave(function(event) {
					$panelMenu.stop().animate({width: "30px"}, 1000, function() {
						$(this).css("opacity",1);
					});
				});
			});
		},
		
		BuildShortInfoLink : function(){
			var key, val, mail;
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];
				
				key = settings.key;
				val = settings.val;
				mail = settings.mail;
			}
			else {
				key = arguments[0];
				val = arguments[1];
				mail = arguments[2];
			}
			
			if(typeof val != "undefined" && val != "" && val != "undefined"){
				if(!mail){
					return '<div class="nefos-infoElement"><div class="nefos-infoKeyShort">' + key + '</div><div class="nefos-infoValue"><a target="_blank" href=\"http://' + val + '\">Link</a></div><div style="clear:both;"></div></div>';
				}
				else{
					return '<div class="nefos-infoElement"><div class="nefos-infoKeyShort">' + key + '</div><div class="nefos-infoValue"><a href=\"mailto:' + val + '\">Link</a></div><div style="clear:both;"></div></div>';
				}
			}
			return "";
		},
		
		BuildYesNoElement : function() {
			var key, val;
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];
				
				key = settings.key;
				val = settings.val;
			}
			else {
				key = arguments[0];
				val = arguments[1];
			}
			
			if(typeof val != "undefined"){
				if(val == 0){
					return '<div class="nefos-infoElement"><div class="nefos-infoKey">' + key + '</div><div class="nefos-infoValue">' + nefos._('no') + '</div><div style="clear:both;"></div></div>';
				}
				else{
					return '<div class="nefos-infoElement"><div class="nefos-infoKey">' + key + '</div><div class="nefos-infoValue">' + nefos._('yes') + '</div><div style="clear:both;"></div></div>';
				}
			}
			return "";
		},
				
		BuildStarInfoElement : function() {
			var key, val;
			
			//Compat for settings!
			if ($.isPlainObject(arguments[0])) {
				var settings = arguments[0];
				
				key = settings.key;
				val = settings.stars;
				getPageImage = settings.getPageImage;
			}
			else {
				key = arguments[0];
				stars = arguments[1];
				getPageImage = arguments[2];
			}
			
			if(typeof stars == "undefined" || stars == null){
				return '';
			}
			
			return '<div class="nefos-infoElement"><div class="nefos-infoKeyShort">' + key + '</div><div class="nefos-infoValue">' + this.BuildStarBar(stars, getPageImage) + '</div><div style="clear:both;"></div></div>';
		},
		
		BuildStarBar : function(stars, getPageImage){
			var starVal = 0;
			var pic;
			var bar = '<div class="nefos-starBar">';
			
			if(typeof stars != "undefined" || stars != null){
				starVal = stars.charAt(0);
			}
			else{
				return '';
			}
			
			for(var i=1; i<6; i++){
				if(i<=starVal){
					pic = getPageImage("star.png");
					bar += '<div class="nefos-starBarItem"><img src="' + pic + '"></div>';
				}
				else{
					pic = getPageImage("noStar.png");
					bar += '<div class="nefos-starBarItem"><img src="' + pic + '"></div>';
				}
			}
			
			return bar + '<div style="clear:both;"></div></div>';
		}
};




nefos.PanelManager = nefos.EventEmitter.extend({
	init : function($parent, settings) {
	   this._super(settings);
	
	   this.$parent = $parent;
	   
	   this.settings.cacheSize = this.settings.cacheSize || 5;
	  	   
	   this.panels = new Array(this.settingsCacheSize);
	   this.staticPanels = {};
	   
	   this.$nextPanel = null;
	   this.$activePanel = null;
	   
	   this.TRANSITION = nefos.TestCssProp(['webkitTransition', 'OTransition', 'MozTransition', 'msTransition','transition']);
	   this.TRANSFORM = nefos.TestCssProp(['WebkitTransform', 'OTransform', 'MozTransform', 'msTransform', 'transform']);
	   this.TRANSITION_HANDLER = nefos.TestTransitionEventHandler();
	   
	   this.reverseNextAnim = false;
	   this.inAnimation = false;
	   this.animationDuration = 0.8;
	},
	
	setReverseNextAnim : function(reverse) {
		this.reverseNextAnim = reverse;
	},
	
	getReverseNextAnim : function() {
		return this.reverseNextAnim;
	},
	
	isInAnimation : function() {
		return this.inAnimation;
	},
	
	setInAnimation : function(anim) {
		this.inAnimation = anim;
	},
		
	isCached : function(id) {
		for (var i=0;i<this.settings.cacheSize;i++) {
			if (this.panels[i].id === id) {
				return true;
			}
		}
		
		return false;
	},
		
	prepareSwap : function(id, staticPanel) {
		var $panel = null;
		
		if (staticPanel) {
			if (!this.staticPanels[id]) {
				this.staticPanels = $(id);
			}
			
			$panel = this.staticPanels[id];
		}
		else {
			for (var i=0;i<this.settings.cacheSize;i++) {
				if (this.panels[i].id === id) {
					var panel = this.panels[i]
					
					if (i > 0){
						this.panels.splice(i,1);
						this.panels.unshift(panel);
					}
					
					$panel = panel.$panel;
					break;
				}
			}
		}
		
		if (!$panel){
			var panel = this.panels.pop() || {};
			
			if ($panel.panel) {
				panel.$panel.empty();
			}
			else {
				//TODO: proper new panel init code.
				panel.$panel = this._createPanel();
			}
			
			panel.id = id;
			this.panels.unshift(panel);
			$panel = panel.$panel;
		}
			
		this.$nextPanel = $panel;		
		this.hidePanel(this.$activePanel);
		
		return $panel;
	},
	
	swap : function() {
		this.showPanel(this.$nextPanel);
		this.$activePanel = this.$nextPanel;
		this.$nextPanel = null;
	},
		
	resize : function($panel) {
		//TODO: how to calculate height properly?
		$panel.css('height', $('body').height() + "px");
	},
		
	hidePanel : function($panel) {
		if(!$panel){
			this.hidePanel(this.$activePanel);
			return;
		}
		
		if (!$panel.get(0)) {
			return;
		}
		
		var xPos = (this.getReverseNextAnim() ? 1 : -1) * parseInt($panel.width());
		
		this.setInAnimation(true);
		
		//nefos.L("panel_manager", "hiding panel", $panel.attr("id"));
		
		this._movePanel($panel, xPos);
	},
	
	showPanel : function($panel, addPlaceholders, appendMenu) {
		var outer = this;
		var xPos = (this.getReverseNextAnim() ? -1 : 1) * this.$parent.width();

		addPlaceholders = (addPlaceholders === undefined ? true : addPlaceholders);
		appendMenu = (appendMenu === undefined ? true : appendMenu);
		
		if($panel.find('.menu-placeholder').length <= 0 && addPlaceholders){
			if(this.settings.northPanelSize){
				$panel.prepend('<div class="menu-placeholder" style="height:' + this.settings.northPanelSize + ';"></div>');
			}
			if(this.settings.southPanelSize){
				$panel.append('<div class="menu-placeholder menu-placeholder-south" style="height:' + this.settings.southPanelSize + ';"></div>');
			}
		}
		
		if (this.settings.iOS4Menu && (nefos.Browser.iOSVersion < 5 /*|| nefos.Browser.androidVersion < 4*/)) {
			if(appendMenu){
				$panel.append($(this.settings.iOS4Menu).css("position","static"));
				$('div.menu-placeholder-south').remove();
			}
			else{
				$('body').append($(this.settings.iOS4Menu).css("position","fixed"));
			}
		}

		if (this.$activePanel && this.$activePanel.attr("id") != $panel.attr("id")) {
   			this.hidePanel(this.$activePanel);
   		}
		
		//move to right border
    	var panel = $panel.get(0);
    	panel.style[this.TRANSITION] = "none";
    	panel.style[this.TRANSFORM] = "translateX(" + xPos + "px)";
    	panel.style.visibility = "visible";
    	panel.style.display = "block";
    	panel.style.top = 0;
   		//$panel.show();
   		//alert(xPos);
   		
   		this.$activePanel = $panel;
   		//nefos.L("panel_manager","gonna set timeout for " + $panel.attr("id"));
   		/*if(!noResize){
	   		//check body height
	   		//$('body').css('height', $panel.height() + "px");
   		}
   		*/
   		//nefos.L("movepANELELELELELE");
   		//needed for android 4
   		window.setTimeout(function() {
   			//nefos.L("panel_manager", "showing panel", $panel.attr("id"));
   			outer._movePanel(outer.$activePanel,0);
   			outer.setReverseNextAnim(false);
   		}, this.animationDuration * 1000);
   		
		//this._movePanel($panel, 0);
	},

	_registerTransitionHandler : function($panel) {
		if ($panel.hasClass("transitionHandlerRegistered")) {
			return;
		}
		
		var outer = this;
		
    	var animEnd = function(evt) {
    		if (evt.target.id != $panel.attr("id")) {
    			return;
    		}
    		
    		if ($panel.get(0).style[outer.TRANSFORM] != "translateX(0px)") {
    			//Bugfix for Android 4. Sometimes transitionEnd is also fired for element when set to pos -320 for animation
    			//so ignore hiding of element if it's the active element.
    			if ($panel.attr("id") != outer.$activePanel.attr("id")) {
    				//nefos.L("panel_manager","finished hiding css anim for " + $panel.attr("id") + " visible: " + $panel.css("display") + " transform: " + $panel.get(0).style[outer.TRANSFORM] + " transition:" + $panel.get(0).style[outer.TRANSITION]);
	    			$panel.hide(); //hide panel when hidden on the left TODO: DOES THIS WORK???
	    			outer.setInAnimation(false);
	    			$("body, html").scrollTop(0);
    			}
    			/*else {
    				nefos.L("panel_manager","IGNORING transitionEnd css anim for " + $panel.attr("id") + " visible: " + $panel.css("display"));
    			}*/
    		}
    		else {
    			//Resize fix for android 4
    			/*$("body").css("width","99%");
    			window.setTimeout(function() {
    				$("body").css("width","100%");
    				//TODO: remove this hack
    			}, 250);
    		    	*/
    			$("body").css("margin-bottom","10px");
    			window.setTimeout(function() {
    				$("body").css("margin-bottom","0px");
    				//TODO: remove this hack
    			}, 250);
    		}
    	};
    	
		$panel.bind(this.TRANSITION_HANDLER, animEnd);
		$panel.addClass("transitionHandlerRegistered");
	},
	
	_createPanel : function() {
		var $panel = $("<div class='nefos-panel' style='display:none'></div>");
		
		this._registerTransitionHandler($panel);
		this.$parent.append($panel);
		
		return $panel;
	},
	
    _movePanel : function($panel, xPos) {   	
    	//this.resize($panel);
    	
    	this._registerTransitionHandler($panel);	
    	    	
    	var panel = $panel.get(0);
    	if(panel){
			var transformation = "";
			
			if(this.TRANSITION == "transition"){
				transformation = "transform " + this.animationDuration + "s ease-in-out";
			}
			else if(this.TRANSITION == "OTransition"){
				transformation = "-o-transform " + this.animationDuration + "s ease-in-out";
			}
			else if(this.TRANSITION == "msTransition"){
				transformation = "-ms-transform " + this.animationDuration + "s ease-in-out";
			}
			else if(this.TRANSITION == "MozTransition"){
				transformation = "-moz-transform " + this.animationDuration + "s ease-in-out";
			}
			else if(this.TRANSITION == "webkitTransition"){
				transformation = "-webkit-transform " + this.animationDuration + "s ease-in-out";
			}
			panel.style[this.TRANSITION] = transformation;
	    	panel.style[this.TRANSFORM] =  "translateX(" + xPos + "px)";
    	}
    }
});



/*
 Copyright (c) 2010-2012, CloudMade, Vladimir Agafonkin
 Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.
 http://leafletjs.com
*/
(function (window, undefined) {

var L, originalL;

if (typeof exports !== undefined + '') {
	L = exports;
} else {
	originalL = window.L;
	L = {};

	L.noConflict = function () {
		window.L = originalL;
		return this;
	};

	window.L = L;
}

L.version = '0.5';


/*
 * L.Util is a namespace for various utility functions.
 */

L.Util = {
	extend: function (dest) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
		    i, j, len, src;

		for (j = 0, len = sources.length; j < len; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dest[i] = src[i];
				}
			}
		}
		return dest;
	},

	bind: function (fn, obj) { // (Function, Object) -> Function
		var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
		return function () {
			return fn.apply(obj, args || arguments);
		};
	},

	stamp: (function () {
		var lastId = 0, key = '_leaflet_id';
		return function (/*Object*/ obj) {
			obj[key] = obj[key] || ++lastId;
			return obj[key];
		};
	}()),

	limitExecByInterval: function (fn, time, context) {
		var lock, execOnUnlock;

		return function wrapperFn() {
			var args = arguments;

			if (lock) {
				execOnUnlock = true;
				return;
			}

			lock = true;

			setTimeout(function () {
				lock = false;

				if (execOnUnlock) {
					wrapperFn.apply(context, args);
					execOnUnlock = false;
				}
			}, time);

			fn.apply(context, args);
		};
	},

	falseFn: function () {
		return false;
	},

	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	splitWords: function (str) {
		return str.replace(/^\s+|\s+$/g, '').split(/\s+/);
	},

	setOptions: function (obj, options) {
		obj.options = L.extend({}, obj.options, options);
		return obj.options;
	},

	getParamString: function (obj) {
		var params = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				params.push(i + '=' + obj[i]);
			}
		}
		return '?' + params.join('&');
	},

	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (!data.hasOwnProperty(key)) {
				throw new Error('No value provided for variable ' + str);
			}
			return value;
		});
	},

	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {

	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		var i, fn,
		    prefixes = ['webkit', 'moz', 'o', 'ms'];

		for (i = 0; i < prefixes.length && !fn; i++) {
			fn = window[prefixes[i] + name];
		}

		return fn;
	}

	var lastTime = 0;

	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame ||
	        getPrefixed('RequestAnimationFrame') || timeoutDefer;

	var cancelFn = window.cancelAnimationFrame ||
	        getPrefixed('CancelAnimationFrame') ||
	        getPrefixed('CancelRequestAnimationFrame') ||
	        function (id) { window.clearTimeout(id); };


	L.Util.requestAnimFrame = function (fn, context, immediate, element) {
		fn = L.bind(fn, context);

		if (immediate && requestFn === timeoutDefer) {
			fn();
		} else {
			return requestFn.call(window, fn, element);
		}
	};

	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};

}());

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;


/*
 * Class powers the OOP facilities of the library. Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (/*Object*/ props) /*-> Class*/ {

	// extended class with the new prototype
	var NewClass = function () {
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (props.options && proto.options) {
		props.options = L.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};


/*
 * L.Mixin.Events adds custom events functionality to Leaflet classes
 */

var key = '_leaflet_events';

L.Mixin = {};

L.Mixin.Events = {

	addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])
		var events = this[key] = this[key] || {},
			type, i, len;

		// Types can be a map of types/handlers
		if (typeof types === 'object') {
			for (type in types) {
				if (types.hasOwnProperty(type)) {
					this.addEventListener(type, types[type], fn);
				}
			}

			return this;
		}

		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			events[types[i]] = events[types[i]] || [];
			events[types[i]].push({
				action: fn,
				context: context || this
			});
		}

		return this;
	},

	hasEventListeners: function (type) { // (String) -> Boolean
		return (key in this) && (type in this[key]) && (this[key][type].length > 0);
	},

	removeEventListener: function (types, fn, context) { // (String[, Function, Object]) or (Object[, Object])
		var events = this[key],
			type, i, len, listeners, j;

		if (typeof types === 'object') {
			for (type in types) {
				if (types.hasOwnProperty(type)) {
					this.removeEventListener(type, types[type], fn);
				}
			}

			return this;
		}

		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {

			if (this.hasEventListeners(types[i])) {
				listeners = events[types[i]];

				for (j = listeners.length - 1; j >= 0; j--) {
					if (
						(!fn || listeners[j].action === fn) &&
						(!context || (listeners[j].context === context))
					) {
						listeners.splice(j, 1);
					}
				}
			}
		}

		return this;
	},

	fireEvent: function (type, data) { // (String[, Object])
		if (!this.hasEventListeners(type)) {
			return this;
		}

		var event = L.extend({
			type: type,
			target: this
		}, data);

		var listeners = this[key][type].slice();

		for (var i = 0, len = listeners.length; i < len; i++) {
			listeners[i].action.call(listeners[i].context || this, event);
		}

		return this;
	}
};

L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


(function () {

	var ie = !!window.ActiveXObject,
	    // http://tanalin.com/en/articles/ie-version-js/
	    ie6 = ie && !window.XMLHttpRequest,
	    ie7 = ie && !document.querySelector,

	    // terrible browser detection to work around Safari / iOS / Android browser bugs
	    // see TileLayer._addTile and debug/hacks/jitter.html

	    ua = navigator.userAgent.toLowerCase(),
	    webkit = ua.indexOf("webkit") !== -1,
	    chrome = ua.indexOf("chrome") !== -1,
	    android = ua.indexOf("android") !== -1,
	    android23 = ua.search("android [23]") !== -1,

	    mobile = typeof orientation !== undefined + '',
	    msTouch = (window.navigator && window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints),
	    retina = (('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
	              ('matchMedia' in window && window.matchMedia("(min-resolution:144dpi)").matches)),

	    doc = document.documentElement,
	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()),
	    gecko3d = 'MozPerspective' in doc.style,
	    opera3d = 'OTransition' in doc.style,
	    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d);


	var touch = !window.L_NO_TOUCH && (function () {

		var startName = 'ontouchstart';

		// IE10+ (We simulate these into touch* events in L.DomEvent and L.DomEvent.MsTouch) or WebKit, etc.
		if (msTouch || (startName in doc)) {
			return true;
		}

		// Firefox/Gecko
		var div = document.createElement('div'),
		    supported = false;

		if (!div.setAttribute) {
			return false;
		}
		div.setAttribute(startName, 'return;');

		if (typeof div[startName] === 'function') {
			supported = true;
		}

		div.removeAttribute(startName);
		div = null;

		return supported;
	}());


	L.Browser = {
		ie6: ie6,
		ie7: ie7,
		webkit: webkit,

		android: android,
		android23: android23,

		chrome: chrome,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera3d: opera3d,
		any3d: any3d,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,

		touch: touch,
		msTouch: msTouch,

		retina: retina
	};
	
	//[FF] hack
	if (L.Browser.android) {
		var start = navigator.userAgent.indexOf( 'Android ' );
		var version = navigator.userAgent.substr( start + 8, 3 );
		L.Browser.androidVersion = window.Number(version);
	}

}());


/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(L.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		return point.x === this.x &&
		       point.y === this.y;
	},

	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (x instanceof Array) {
		return new L.Point(x[0], x[1]);
	}
	if (isNaN(x)) {
		return x;
	}
	return new L.Point(x, y, round);
};


/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = L.Class.extend({

	initialize: function (a, b) {	//(Point, Point) or Point[]
		if (!a) { return; }

		var points = b ? [a, b] : a;

		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	},

	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = L.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new L.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
});

L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};


/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = L.Class.extend({
	initialize: function (/*Number*/ a, /*Number*/ b, /*Number*/ c, /*Number*/ d) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	},

	transform: function (point, scale) {
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (/*Point*/ point, /*Number*/ scale) /*-> Point*/ {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (/*Point*/ point, /*Number*/ scale) /*-> Point*/ {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
});


/*
 * L.DomUtil contains various utility functions for working with DOM.
 */

L.DomUtil = {
	get: function (id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	},

	getStyle: function (el, style) {

		var value = el.style[style];

		if (!value && el.currentStyle) {
			value = el.currentStyle[style];
		}

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	getViewportOffset: function (element) {

		var top = 0,
		    left = 0,
		    el = element,
		    docBody = document.body,
		    pos,
		    ie7 = L.Browser.ie7;

		do {
			top  += el.offsetTop  || 0;
			left += el.offsetLeft || 0;
			pos = L.DomUtil.getStyle(el, 'position');

			if (el.offsetParent === docBody && pos === 'absolute') { break; }

			if (pos === 'fixed') {
				top  += docBody.scrollTop  || 0;
				left += docBody.scrollLeft || 0;
				break;
			}
			el = el.offsetParent;

		} while (el);

		el = element;

		do {
			if (el === docBody) { break; }

			top  -= el.scrollTop  || 0;
			left -= el.scrollLeft || 0;

			// webkit (and ie <= 7) handles RTL scrollLeft different to everyone else
			// https://code.google.com/p/closure-library/source/browse/trunk/closure/goog/style/bidi.js
			if (!L.DomUtil.documentIsLtr() && (L.Browser.webkit || ie7)) {
				left += el.scrollWidth - el.clientWidth;

				// ie7 shows the scrollbar by default and provides clientWidth counting it, so we
				// need to add it back in if it is visible; scrollbar is on the left as we are RTL
				if (ie7 && L.DomUtil.getStyle(el, 'overflow-y') !== 'hidden' &&
				           L.DomUtil.getStyle(el, 'overflow') !== 'hidden') {
					left += 17;
				}
			}

			el = el.parentNode;
		} while (el);

		return new L.Point(left, top);
	},

	documentIsLtr: function () {
		if (!L.DomUtil._docIsLtrCached) {
			L.DomUtil._docIsLtrCached = true;
			L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === "ltr";
		}
		return L.DomUtil._docIsLtr;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	disableTextSelection: function () {
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		}
		if (!this._onselectstart) {
			this._onselectstart = document.onselectstart;
			document.onselectstart = L.Util.falseFn;
		}
	},

	enableTextSelection: function () {
		if (document.onselectstart === L.Util.falseFn) {
			document.onselectstart = this._onselectstart;
			this._onselectstart = null;
		}
	},

	hasClass: function (el, name) {
		return (el.className.length > 0) &&
		        new RegExp("(^|\\s)" + name + "(\\s|$)").test(el.className);
	},

	addClass: function (el, name) {
		if (!L.DomUtil.hasClass(el, name)) {
			el.className += (el.className ? ' ' : '') + name;
		}
	},

	removeClass: function (el, name) {

		function replaceFn(w, match) {
			if (match === name) { return ''; }
			return w;
		}

		el.className = el.className
		        .replace(/(\S+)\s*/g, replaceFn)
		        .replace(/(^\s+|\s+$)/, '');
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {

			var filter = false,
			    filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try { filter = el.filters.item(filterName); } catch (e) {}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = (value !== 100);
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	getTranslateString: function (point) {
		// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
		// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
		// (same speed either way), Opera 12 doesn't support translate3d

		var is3d = L.Browser.webkit3d,
		    open = 'translate' + (is3d ? '3d' : '') + '(',
		    close = (is3d ? ',0' : '') + ')';

		return open + point.x + 'px,' + point.y + 'px' + close;
	},

	getScaleString: function (scale, origin) {

		var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
		    scaleStr = ' scale(' + scale + ') ';

		return preTranslateStr + scaleStr;
	},

	setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])

		el._leaflet_pos = point;

		if (!disable3D && L.Browser.any3d) {
			el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);

			// workaround for Android 2/3 stability (https://github.com/CloudMade/Leaflet/issues/69)
			if (L.Browser.mobileWebkit3d) {
				el.style.WebkitBackfaceVisibility = 'hidden';
			}
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance
		return el._leaflet_pos;
	}
};


// prefix style property names

L.DomUtil.TRANSFORM = L.DomUtil.testProp(
        ['WebkitTransform', 'OTransform', 'MozTransform', 'msTransform','transform']);

L.DomUtil.TRANSITION = L.DomUtil.testProp(
        ['webkitTransition', 'OTransition', 'MozTransition', 'msTransition','transition']);

L.DomUtil.TRANSITION_END = 
        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
        L.DomUtil.TRANSITION + 'End' : 'transitionend';

//hack for galaxy tab
/*if (L.Browser.androidVersion > 4) {
	L.DomUtil.TRANSFORM = false;
	L.DomUtil.TRANSITION = false;
	L.DomUtil.TRANSITION_END = false;
}*/

/*
	L.LatLng represents a geographical point with latitude and longitude coordinates.
*/

L.LatLng = function (rawLat, rawLng, noWrap) { // (Number, Number[, Boolean])
	var lat = parseFloat(rawLat),
	    lng = parseFloat(rawLng);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + rawLat + ', ' + rawLng + ')');
	}

	if (noWrap !== true) {
		lat = Math.max(Math.min(lat, 90), -90);					// clamp latitude into -90..90
		lng = (lng + 180) % 360 + ((lng < -180 || lng === 180) ? 180 : -180);	// wrap longitude into -180..180
	}

	this.lat = lat;
	this.lng = lng;
};

L.extend(L.LatLng, {
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
});

L.LatLng.prototype = {
	equals: function (obj) { // (LatLng) -> Boolean
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(Math.abs(this.lat - obj.lat), Math.abs(this.lng - obj.lng));
		return margin <= L.LatLng.MAX_MARGIN;
	},

	toString: function (precision) { // -> String
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
	distanceTo: function (other) { // (LatLng) -> Number
		other = L.latLng(other);

		var R = 6378137, // earth radius in meters
		    d2r = L.LatLng.DEG_TO_RAD,
		    dLat = (other.lat - this.lat) * d2r,
		    dLon = (other.lng - this.lng) * d2r,
		    lat1 = this.lat * d2r,
		    lat2 = other.lat * d2r,
		    sin1 = Math.sin(dLat / 2),
		    sin2 = Math.sin(dLon / 2);

		var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}
};

L.latLng = function (a, b, c) { // (LatLng) or ([Number, Number]) or (Number, Number, Boolean)
	if (a instanceof L.LatLng) {
		return a;
	}
	if (a instanceof Array) {
		return new L.LatLng(a[0], a[1]);
	}
	if (isNaN(a)) {
		return a;
	}
	return new L.LatLng(a, b, c);
};



/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = L.Class.extend({
	initialize: function (southWest, northEast) {	// (LatLng, LatLng) or (LatLng[])
		if (!southWest) { return; }

		var latlngs = northEast ? [southWest, northEast] : southWest;

		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	},

	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (LatLng) or (LatLngBounds)
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		if (obj instanceof L.LatLng) {
			if (!this._southWest && !this._northEast) {
				this._southWest = new L.LatLng(obj.lat, obj.lng, true);
				this._northEast = new L.LatLng(obj.lat, obj.lng, true);
			} else {
				this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
				this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

				this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
				this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
			}
		} else if (obj instanceof L.LatLngBounds) {
			this.extend(obj._southWest);
			this.extend(obj._northEast);
		}
		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> LatLngBounds
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	getCenter: function () { // -> LatLng
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this._northEast.lat, this._southWest.lng, true);
	},

	getSouthEast: function () {
		return new L.LatLng(this._southWest.lat, this._northEast.lng, true);
	},

	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (bounds) { // (LatLngBounds)
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	toBBoxString: function () {
		var sw = this._southWest,
		    ne = this._northEast;

		return [sw.lng, sw.lat, ne.lng, ne.lat].join(',');
	},

	equals: function (bounds) { // (LatLngBounds)
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
});

//TODO International date line?

L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
	if (!a || a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};


/*
 * L.Projection contains various geographical projections used by CRS classes.
 */

L.Projection = {};



L.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    x = latlng.lng * d,
		    y = lat * d;

		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    lng = point.x * d,
		    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		// TODO refactor LatLng wrapping
		return new L.LatLng(lat, lng, true);
	}
};



L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x, true);
	}
};



L.CRS = {
	latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	project: function (latlng) {
		return this.projection.project(latlng);
	},

	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	}
};



L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, 1, 0)
});



L.CRS.EPSG3857 = L.extend({}, L.CRS, {
	code: 'EPSG:3857',

	projection: L.Projection.SphericalMercator,
	transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (latlng) { // (LatLng) -> Point
		var projectedPoint = this.projection.project(latlng),
		    earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	}
});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});



L.CRS.EPSG4326 = L.extend({}, L.CRS, {
	code: 'EPSG:4326',

	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
});


/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		crs: L.CRS.EPSG3857,

		/*
		center: LatLng,
		zoom: Number,
		layers: Array,
		*/

		fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
		trackResize: true,
		markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);

		this._initContainer(id);
		this._initLayout();
		this._initHooks();
		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, true);
		}

		this._initLayers(options.layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		this._resetView(L.latLng(center), this._limitZoom(zoom));
		return this;
	},

	setZoom: function (zoom) { // (Number)
		return this.setView(this.getCenter(), zoom);
	},

	zoomIn: function (delta) {
		return this.setZoom(this._zoom + (delta || 1));
	},

	zoomOut: function (delta) {
		return this.setZoom(this._zoom - (delta || 1));
	},

	fitBounds: function (bounds) { // (LatLngBounds)
		var zoom = this.getBoundsZoom(bounds);
		return this.setView(L.latLngBounds(bounds).getCenter(), zoom);
	},

	fitWorld: function () {
		var sw = new L.LatLng(-60, -170),
		    ne = new L.LatLng(85, 179);

		return this.fitBounds(new L.LatLngBounds(sw, ne));
	},

	panTo: function (center) { // (LatLng)
		return this.setView(center, this._zoom);
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.Animation.js
		this.fire('movestart');

		this._rawPanBy(L.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		this.options.maxBounds = bounds;

		if (!bounds) {
			this._boundsMinZoom = null;
			return this;
		}

		var minZoom = this.getBoundsZoom(bounds, true);

		this._boundsMinZoom = minZoom;

		if (this._loaded) {
			if (this._zoom < minZoom) {
				this.setView(bounds.getCenter(), minZoom);
			} else {
				this.panInsideBounds(bounds);
			}
		}

		return this;
	},

	panInsideBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		var viewBounds = this.getBounds(),
		    viewSw = this.project(viewBounds.getSouthWest()),
		    viewNe = this.project(viewBounds.getNorthEast()),
		    sw = this.project(bounds.getSouthWest()),
		    ne = this.project(bounds.getNorthEast()),
		    dx = 0,
		    dy = 0;

		if (viewNe.y < ne.y) { // north
			dy = ne.y - viewNe.y;
		}
		if (viewNe.x > ne.x) { // east
			dx = ne.x - viewNe.x;
		}
		if (viewSw.y > sw.y) { // south
			dy = sw.y - viewSw.y;
		}
		if (viewSw.x < sw.x) { // west
			dx = sw.x - viewSw.x;
		}

		return this.panBy(new L.Point(dx, dy, true));
	},

	addLayer: function (layer) {
		// TODO method is too big, refactor

		var id = L.stamp(layer);

		if (this._layers[id]) { return this; }

		this._layers[id] = layer;

		// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
		if (layer.options && !isNaN(layer.options.maxZoom)) {
			this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, layer.options.maxZoom);
		}
		if (layer.options && !isNaN(layer.options.minZoom)) {
			this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, layer.options.minZoom);
		}

		// TODO looks ugly, refactor!!!
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum++;
            this._tileLayersToLoad++;
            layer.on('load', this._onTileLayerLoad, this);
		}

		this.whenReady(function () {
			layer.onAdd(this);
			this.fire('layeradd', {layer: layer});
		}, this);

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return; }

		layer.onRemove(this);

		delete this._layers[id];

		// TODO looks ugly, refactor
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum--;
            this._tileLayersToLoad--;
            layer.off('load', this._onTileLayerLoad, this);
		}

		return this.fire('layerremove', {layer: layer});
	},

	hasLayer: function (layer) {
		var id = L.stamp(layer);
		return this._layers.hasOwnProperty(id);
	},

	invalidateSize: function (animate) {
		var oldSize = this.getSize();

		this._sizeChanged = true;

		if (this.options.maxBounds) {
			this.setMaxBounds(this.options.maxBounds);
		}

		if (!this._loaded) { return this; }

		var offset = oldSize._subtract(this.getSize())._divideBy(2)._round();

		if (animate === true) {
			this.panBy(offset);
		} else {
			this._rawPanBy(offset);

			this.fire('move');

			clearTimeout(this._sizeTimer);
			this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
		}
		return this;
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return; }

		this[name] = new HandlerClass(this);

		if (this.options[name]) {
			this[name].enable();
		}

		return this;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> LatLng
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		var z1 = this.options.minZoom || 0,
		    z2 = this._layersMinZoom || 0,
		    z3 = this._boundsMinZoom || 0;

		return Math.max(z1, z2, z3);
	},

	getMaxZoom: function () {
		var z1 = this.options.maxZoom === undefined ? Infinity : this.options.maxZoom,
		    z2 = this._layersMaxZoom  === undefined ? Infinity : this._layersMaxZoom;

		return Math.min(z1, z2);
	},

	getBoundsZoom: function (bounds, inside) { // (LatLngBounds, Boolean) -> Number
		bounds = L.latLngBounds(bounds);

		var size = this.getSize(),
		    zoom = this.options.minZoom || 0,
		    maxZoom = this.getMaxZoom(),
		    ne = bounds.getNorthEast(),
		    sw = bounds.getSouthWest(),
		    boundsSize,
		    nePoint,
		    swPoint,
		    zoomNotFound = true;

		if (inside) {
			zoom--;
		}

		do {
			zoom++;
			nePoint = this.project(ne, zoom);
			swPoint = this.project(sw, zoom);

			boundsSize = new L.Point(
			        Math.abs(nePoint.x - swPoint.x),
			        Math.abs(swPoint.y - nePoint.y));

			if (!inside) {
				zoomNotFound = boundsSize.x <= size.x && boundsSize.y <= size.y;
			} else {
				zoomNotFound = boundsSize.x < size.x || boundsSize.y < size.y;
			}
		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint();
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		return this._initialTopLeftPoint;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom) {
		var crs = this.options.crs;
		return crs.scale(toZoom) / crs.scale(this._zoom);
	},

	getScaleZoom: function (scale) {
		return this._zoom + (Math.log(scale) / Math.LN2);
	},


	// conversion methods

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	layerPointToLatLng: function (point) { // (Point)
		var projectedPoint = L.point(point).add(this._initialTopLeftPoint);
		return this.unproject(projectedPoint);
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this._initialTopLeftPoint);
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (container._leaflet) {
			throw new Error("Map container is already initialized.");
		}

		container._leaflet = true;
	},

	_initLayout: function () {
		var container = this._container;

		container.innerHTML = '';
		L.DomUtil.addClass(container, 'leaflet-container');

		if (L.Browser.touch) {
			L.DomUtil.addClass(container, 'leaflet-touch');
		}

		if (this.options.fadeAnimation) {
			L.DomUtil.addClass(container, 'leaflet-fade-anim');
		}

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

		this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
		panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
		panes.shadowPane = this._createPane('leaflet-shadow-pane');
		panes.overlayPane = this._createPane('leaflet-overlay-pane');
		panes.markerPane = this._createPane('leaflet-marker-pane');
		panes.popupPane = this._createPane('leaflet-popup-pane');

		var zoomHide = ' leaflet-zoom-hide';

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, zoomHide);
			L.DomUtil.addClass(panes.shadowPane, zoomHide);
			L.DomUtil.addClass(panes.popupPane, zoomHide);
		}
	},

	_createPane: function (className, container) {
		return L.DomUtil.create('div', className, container || this._panes.objectsPane);
	},

	_initializers: [],

	_initHooks: function () {
		var i, len;
		for (i = 0, len = this._initializers.length; i < len; i++) {
			this._initializers[i].call(this);
		}
	},

	_initLayers: function (layers) {
		layers = layers ? (layers instanceof Array ? layers : [layers]) : [];

		this._layers = {};
		this._tileLayersNum = 0;

		var i, len;

		for (i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},


	// private methods that modify map state

	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
		} else {
			this._initialTopLeftPoint._add(this._getMapPanePos());
		}

		this._tileLayersToLoad = this._tileLayersNum;

		var loading = !this._loaded;
		this._loaded = true;

		this.fire('viewreset', {hard: !preserveMapOffset});

		this.fire('move');

		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}

		this.fire('moveend', {hard: !preserveMapOffset});

		if (loading) {
			this.fire('load');
		}
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},


	// map events

	_initEvents: function () {
		if (!L.DomEvent) { return; }

		L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

		var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
		              'mouseleave', 'mousemove', 'contextmenu'],
		    i, len;

		for (i = 0, len = events.length; i < len; i++) {
			L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
		}

		if (this.options.trackResize) {
			L.DomEvent.on(window, 'resize', this._onResize, this);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        this.invalidateSize, this, false, this._container);
	},

	_onMouseClick: function (e) {
		if (!this._loaded || (this.dragging && this.dragging.moved())) { return; }

		this.fire('preclick');
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._loaded) { return; }

		var type = e.type;

		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) { return; }

		if (type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}

		var containerPoint = this.mouseEventToContainerPoint(e),
		    layerPoint = this.containerPointToLayerPoint(containerPoint),
		    latlng = this.layerPointToLatLng(layerPoint);

		this.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});
	},

	_onTileLayerLoad: function () {
		// TODO super-ugly, refactor!!!
		// clear scaled tiles after all new tiles are loaded (for performance)
		this._tileLayersToLoad--;
		if (this._tileLayersNum && !this._tileLayersToLoad && this._tileBg) {
			clearTimeout(this._clearTileBgTimer);
			this._clearTileBgTimer = setTimeout(L.bind(this._clearTileBg, this), 500);
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, this);
		} else {
			this.on('load', callback, context);
		}
		return this;
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane);
	},

	_getTopLeftPoint: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}

		return this._initialTopLeftPoint.subtract(this._getMapPanePos());
	},

	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(latlng, newZoom)._subtract(topLeft);
	},

	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	_getCenterOffset: function (center) {
		return this.latLngToLayerPoint(center).subtract(this._getCenterLayerPoint());
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

L.Map.addInitHook = function (fn) {
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initializers.push(init);
};

L.map = function (id, options) {
	return new L.Map(id, options);
};



L.Projection.Mercator = {
	MAX_LATITUDE: 85.0840591556,

	R_MINOR: 6356752.3142,
	R_MAJOR: 6378137,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    x = latlng.lng * d * r,
		    y = lat * d,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1.0 - tmp * tmp),
		    con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r2 * Math.log(ts);

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    lng = point.x * d / r,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1 - (tmp * tmp)),
		    ts = Math.exp(- point.y / r2),
		    phi = (Math.PI / 2) - 2 * Math.atan(ts),
		    numIter = 15,
		    tol = 1e-7,
		    i = numIter,
		    dphi = 0.1,
		    con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts *
			            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, lng, true);
	}
};



L.CRS.EPSG3395 = L.extend({}, L.CRS, {
	code: 'EPSG:3395',

	projection: L.Projection.Mercator,

	transformation: (function () {
		var m = L.Projection.Mercator,
		    r = m.R_MAJOR,
		    r2 = m.R_MINOR;

		return new L.Transformation(0.5 / (Math.PI * r), 0.5, -0.5 / (Math.PI * r2), 0.5);
	}())
});


/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: '',
		attribution: '',
		zoomOffset: 0,
		opacity: 1,
		/* (undefined works too)
		zIndex: null,
		tms: false,
		continuousWorld: false,
		noWrap: false,
		zoomReverse: false,
		detectRetina: false,
		reuseTiles: false,
		*/
		unloadInvisibleTiles: L.Browser.mobile,
		updateWhenIdle: L.Browser.mobile
	},

	initialize: function (url, options) {
		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			if (options.minZoom > 0) {
				options.minZoom--;
			}
			this.options.maxZoom--;
		}

		this._url = url;

		var subdomains = this.options.subdomains;

		if (typeof subdomains === 'string') {
			this.options.subdomains = subdomains.split('');
		}
	},

	onAdd: function (map) {
		this._map = map;

		// create a container div for tiles
		this._initContainer();

		// create an image to clone for tiles
		this._createTileProto();

		// set up events
		map.on({
			'viewreset': this._resetCallback,
			'moveend': this._update
		}, this);

		if (!this.options.updateWhenIdle) {
			this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
			map.on('move', this._limitedUpdate, this);
		}

		this._reset();
		this._update();
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		map._panes.tilePane.removeChild(this._container);

		map.off({
			'viewreset': this._resetCallback,
			'moveend': this._update
		}, this);

		if (!this.options.updateWhenIdle) {
			map.off('move', this._limitedUpdate, this);
		}

		this._container = null;
		this._map = null;
	},

	bringToFront: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.appendChild(this._container);
			this._setAutoZIndex(pane, Math.max);
		}

		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.insertBefore(this._container, pane.firstChild);
			this._setAutoZIndex(pane, Math.min);
		}

		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this._map._panes.tilePane.empty = false;
			this._reset(true);
			this._update();
		}
		return this;
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (pane, compare) {

		var layers = pane.getElementsByClassName('leaflet-layer'),
		    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
		    zIndex, i, len;

		for (i = 0, len = layers.length; i < len; i++) {

			if (layers[i] !== this._container) {
				zIndex = parseInt(layers[i].style.zIndex, 10);

				if (!isNaN(zIndex)) {
					edgeZIndex = compare(edgeZIndex, zIndex);
				}
			}
		}

		this.options.zIndex = this._container.style.zIndex =
		        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._container, this.options.opacity);

		// stupid webkit hack to force redrawing of tiles
		var i,
		    tiles = this._tiles;

		if (L.Browser.webkit) {
			for (i in tiles) {
				if (tiles.hasOwnProperty(i)) {
					tiles[i].style.webkitTransform += ' translate(0,0)';
				}
			}
		}
	},

	_initContainer: function () {
		var tilePane = this._map._panes.tilePane;

		if (!this._container || tilePane.empty) {
			this._container = L.DomUtil.create('div', 'leaflet-layer');

			this._updateZIndex();

			tilePane.appendChild(this._container);

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}
	},

	_resetCallback: function (e) {
		this._reset(e.hard);
	},

	_reset: function (clearOldContainer) {
		var tiles = this._tiles;

		for (var key in tiles) {
			if (tiles.hasOwnProperty(key)) {
				this.fire('tileunload', {tile: tiles[key]});
			}
		}

		this._tiles = {};
		this._tilesToLoad = 0;

		if (this.options.reuseTiles) {
			this._unusedTiles = [];
		}

		if (clearOldContainer && this._container) {
			this._container.innerHTML = "";
		}

		this._initContainer();
	},

	_update: function (e) {

		if (!this._map) { return; }

		var bounds = this._map.getPixelBounds(),
		    zoom = this._map.getZoom(),
		    tileSize = this.options.tileSize;

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var nwTilePoint = new L.Point(
		        Math.floor(bounds.min.x / tileSize),
		        Math.floor(bounds.min.y / tileSize)),

		    seTilePoint = new L.Point(
		        Math.floor(bounds.max.x / tileSize),
		        Math.floor(bounds.max.y / tileSize)),

		    tileBounds = new L.Bounds(nwTilePoint, seTilePoint);

		this._addTilesFromCenterOut(tileBounds);

		if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
		    center = bounds.getCenter();

		var j, i, point;

		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {
				point = new L.Point(i, j);

				if (this._tileShouldBeLoaded(point)) {
					queue.push(point);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		// load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		var fragment = document.createDocumentFragment();

		// if its the first batch of tiles to load
		if (!this._tilesToLoad) {
			this.fire('loading');
		}

		this._tilesToLoad += tilesToLoad;

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i], fragment);
		}

		this._container.appendChild(fragment);
	},

	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		if (!this.options.continuousWorld) {
			var limit = this._getWrapTileNum();

			if (this.options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit) ||
				                        tilePoint.y < 0 || tilePoint.y >= limit) {
				return false; // exceeds world bounds
			}
		}

		return true;
	},

	_removeOtherTiles: function (bounds) {
		var kArr, x, y, key;

		for (key in this._tiles) {
			if (this._tiles.hasOwnProperty(key)) {
				kArr = key.split(':');
				x = parseInt(kArr[0], 10);
				y = parseInt(kArr[1], 10);

				// remove tile if it's out of bounds
				if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
					this._removeTile(key);
				}
			}
		}
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];

		this.fire("tileunload", {tile: tile, url: tile.src});

		if (this.options.reuseTiles) {
			L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
			this._unusedTiles.push(tile);

		} else if (tile.parentNode === this._container) {
			this._container.removeChild(tile);
		}

		// for https://github.com/CloudMade/Leaflet/issues/137
		if (!L.Browser.android) {
			tile.src = L.Util.emptyImageUrl;
		}

		delete this._tiles[key];
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint);

		// get unused tile - or create a new tile
		var tile = this._getTile();

		/*
		Chrome 20 layouts much faster with top/left (verify with timeline, frames)
		Android 4 browser has display issues with top/left and requires transform instead
		Android 3 browser not tested
		Android 2 browser requires top/left or tiles disappear on load or first drag
		(reappear after zoom) https://github.com/CloudMade/Leaflet/issues/866
		(other browsers don't currently care) - see debug/hacks/jitter.html for an example
		*/
		L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome || L.Browser.android23);

		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

		this._loadTile(tile, tilePoint);

		if (tile.parentNode !== this._container) {
			container.appendChild(tile);
		}
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		return zoom + options.zoomOffset;
	},

	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
		    tileSize = this.options.tileSize;

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},

	// image-specific code (override to implement e.g. Canvas or SVG tile layer)

	getTileUrl: function (tilePoint) {
		this._adjustTilePoint(tilePoint);

		return L.Util.template(this._url, L.extend({
			s: this._getSubdomain(tilePoint),
			z: this._getZoomForUrl(),
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	},

	_getWrapTileNum: function () {
		// TODO refactor, limit is not valid for non-standard projections
		return Math.pow(2, this._getZoomForUrl());
	},

	_adjustTilePoint: function (tilePoint) {

		var limit = this._getWrapTileNum();

		// wrap tile coordinates
		if (!this.options.continuousWorld && !this.options.noWrap) {
			tilePoint.x = ((tilePoint.x % limit) + limit) % limit;
		}

		if (this.options.tms) {
			tilePoint.y = limit - tilePoint.y - 1;
		}
	},

	_getSubdomain: function (tilePoint) {
		var index = (tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	_createTileProto: function () {
		var img = this._tileImg = L.DomUtil.create('img', 'leaflet-tile');
		img.style.width = img.style.height = this.options.tileSize + 'px';
		img.galleryimg = 'no';
	},

	_getTile: function () {
		if (this.options.reuseTiles && this._unusedTiles.length > 0) {
			var tile = this._unusedTiles.pop();
			this._resetTile(tile);
			return tile;
		}
		return this._createTile();
	},

	_resetTile: function (tile) {
		// Override if data stored on a tile needs to be cleaned up before reuse
	},

	_createTile: function () {
		var tile = this._tileImg.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		tile.src     = this.getTileUrl(tilePoint);
	},

    _tileLoaded: function () {
        this._tilesToLoad--;
        if (!this._tilesToLoad) {
            this.fire('load');
        }
    },

	_tileOnLoad: function (e) {
		var layer = this._layer;

		//Only if we are loading an actual image
		if (this.src !== L.Util.emptyImageUrl) {
			L.DomUtil.addClass(this, 'leaflet-tile-loaded');

			layer.fire('tileload', {
				tile: this,
				url: this.src
			});
		}

		layer._tileLoaded();
	},

	_tileOnError: function (e) {
		var layer = this._layer;

		layer.fire('tileerror', {
			tile: this,
			url: this.src
		});

		var newUrl = layer.options.errorTileUrl;
		if (newUrl) {
			this.src = newUrl;
		}

        layer._tileLoaded();
    }
});

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};


L.TileLayer.WMS = L.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (url, options) { // (String, Object)

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams);

		if (options.detectRetina && L.Browser.retina) {
			wmsParams.width = wmsParams.height = this.options.tileSize * 2;
		} else {
			wmsParams.width = wmsParams.height = this.options.tileSize;
		}

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i)) {
				wmsParams[i] = options[i];
			}
		}

		this.wmsParams = wmsParams;

		L.setOptions(this, options);
	},

	onAdd: function (map) {

		var projectionKey = parseFloat(this.wmsParams.version) >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = map.options.crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String

		var map = this._map,
		    crs = map.options.crs,
		    tileSize = this.options.tileSize,

		    nwPoint = tilePoint.multiplyBy(tileSize),
		    sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),

		    nw = crs.project(map.unproject(nwPoint, zoom)),
		    se = crs.project(map.unproject(sePoint, zoom)),

		    bbox = [nw.x, se.y, se.x, nw.y].join(','),

		    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

		return url + L.Util.getParamString(this.wmsParams) + "&bbox=" + bbox;
	},

	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};


L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	redraw: function () {
		var tiles = this._tiles;

		for (var i in tiles) {
			if (tiles.hasOwnProperty(i)) {
				this._redrawTile(tiles[i]);
			}
		}
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, this._map._zoom);
	},

	_createTileProto: function () {
		var proto = this._canvasProto = L.DomUtil.create('canvas', 'leaflet-tile');
		proto.width = proto.height = this.options.tileSize;
	},

	_createTile: function () {
		var tile = this._canvasProto.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer = this;
		tile._tilePoint = tilePoint;

		this._redrawTile(tile);

		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},

	drawTile: function (tile, tilePoint) {
		// override with rendering code
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.tileLayer.canvas = function (options) {
	return new L.TileLayer.Canvas(options);
};


L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		opacity: 1
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map._panes.overlayPane.appendChild(this._image);

		map.on('viewreset', this._reset, this);

		if (map.options.zoomAnimation && L.Browser.any3d) {
			map.on('zoomanim', this._animateZoom, this);
		}

		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._image);

		map.off('viewreset', this._reset, this);

		if (map.options.zoomAnimation) {
			map.off('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
	bringToFront: function () {
		if (this._image) {
			this._map._panes.overlayPane.appendChild(this._image);
		}
		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.overlayPane;
		if (this._image) {
			pane.insertBefore(this._image, pane.firstChild);
		}
		return this;
	},

	_initImage: function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');

		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
		} else {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
		}

		this._updateOpacity();

		//TODO createImage util method to remove duplication
		L.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.bind(this._onImageLoad, this),
			src: this._url
		});
	},

	_animateZoom: function (e) {
		var map = this._map,
		    image = this._image,
		    scale = map.getZoomScale(e.zoom),
		    nw = this._bounds.getNorthWest(),
		    se = this._bounds.getSouthEast(),

		    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
		    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
		    currentSize = map.latLngToLayerPoint(se)._subtract(map.latLngToLayerPoint(nw)),
		    origin = topLeft._add(size._subtract(currentSize)._divideBy(2));

		image.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
	},

	_reset: function () {
		var image   = this._image,
		    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		    size    = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

		L.DomUtil.setPosition(image, topLeft);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this.fire('load');
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};


L.Icon = L.Class.extend({
	options: {
		/*
		iconUrl: (String) (required)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (Point) (no shadow by default)
		shadowSize: (Point)
		shadowAnchor: (Point)
		*/
		className: ''
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	createIcon: function () {
		return this._createIcon('icon');
	},

	createShadow: function () {
		return this._createIcon('shadow');
	},

	_createIcon: function (name) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error("iconUrl not set in Icon options (see the docs).");
			}
			return null;
		}

		var img = this._createImg(src);
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = L.point(options[name + 'Size']),
		    anchor;

		if (name === 'shadow') {
			anchor = L.point(options.shadowAnchor || options.iconAnchor);
		} else {
			anchor = L.point(options.iconAnchor);
		}

		if (!anchor && size) {
			anchor = size.divideBy(2, true);
		}

		img.className = 'leaflet-marker-' + name + ' ' + options.className;

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src) {
		var el;

		if (!L.Browser.ie6) {
			el = document.createElement('img');
			el.src = src;
		} else {
			el = document.createElement('div');
			el.style.filter =
			        'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '")';
		}
		return el;
	},

	_getIconUrl: function (name) {
		return this.options[name + 'Url'];
	}
});

L.icon = function (options) {
	return new L.Icon(options);
};



L.Icon.Default = L.Icon.extend({

	options: {
		iconSize: new L.Point(25, 41),
		iconAnchor: new L.Point(12, 41),
		popupAnchor: new L.Point(1, -34),

		shadowSize: new L.Point(41, 41)
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
		}

		return path + '/marker-' + name + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/;

	var i, len, src, matches;

	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		matches = src.match(leafletRe);

		if (matches) {
			return src.split(leafletRe)[0] + '/images';
		}
	}
}());


/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		icon: new L.Icon.Default(),
		title: '',
		clickable: true,
		draggable: false,
		zIndexOffset: 0,
		opacity: 1,
		riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._map = map;

		map.on('viewreset', this.update, this);

		this._initIcon();
		this.update();

		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
			map.on('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		this._removeIcon();

		this.fire('remove');

		map.off({
			'viewreset': this.update,
			'zoomanim': this._animateZoom
		}, this);

		this._map = null;
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);

		this.update();

		this.fire('move', { latlng: this._latlng });
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		this.update();
	},

	setIcon: function (icon) {
		if (this._map) {
			this._removeIcon();
		}

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}
	},

	update: function () {
		if (!this._icon) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng).round();
		this._setPos(pos);
	},

	_initIcon: function () {
		var options = this.options,
		    map = this._map,
		    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
		    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide',
		    needOpacityUpdate = false;

		if (!this._icon) {
			this._icon = options.icon.createIcon();

			if (options.title) {
				this._icon.title = options.title;
			}

			this._initInteraction();
			needOpacityUpdate = (this.options.opacity < 1);

			L.DomUtil.addClass(this._icon, classToAdd);

			if (options.riseOnHover) {
				L.DomEvent
					.on(this._icon, 'mouseover', this._bringToFront, this)
					.on(this._icon, 'mouseout', this._resetZIndex, this);
			}
		}

		if (!this._shadow) {
			this._shadow = options.icon.createShadow();

			if (this._shadow) {
				L.DomUtil.addClass(this._shadow, classToAdd);
				needOpacityUpdate = (this.options.opacity < 1);
			}
		}

		if (needOpacityUpdate) {
			this._updateOpacity();
		}

		var panes = this._map._panes;

		panes.markerPane.appendChild(this._icon);

		if (this._shadow) {
			panes.shadowPane.appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		var panes = this._map._panes;

		if (this.options.riseOnHover) {
			L.DomEvent
			    .off(this._icon, 'mouseover', this._bringToFront)
			    .off(this._icon, 'mouseout', this._resetZIndex);
		}

		panes.markerPane.removeChild(this._icon);

		if (this._shadow) {
			panes.shadowPane.removeChild(this._shadow);
		}

		this._icon = this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.clickable) { return; }

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
		    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_onMouseClick: function (e) {
		var wasDragged = this.dragging && this.dragging.moved();

		if (this.hasEventListeners(e.type) || wasDragged) {
			L.DomEvent.stopPropagation(e);
		}

		if (wasDragged) { return; }

		if (this._map.dragging && this._map.dragging.moved()) { return; }

		this.fire(e.type, {
			originalEvent: e
		});
	},

	_fireMouseEvent: function (e) {

		this.fire(e.type, {
			originalEvent: e
		});

		// TODO proper custom event propagation
		// this line will always be called if marker is in a FeatureGroup
		if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousedown') {
			L.DomEvent.stopPropagation(e);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._icon, this.options.opacity);
		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, this.options.opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	}
});

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};


L.DivIcon = L.Icon.extend({
	options: {
		iconSize: new L.Point(12, 12), // also can be set through CSS
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'leaflet-div-icon'
	},

	createIcon: function () {
		var div = document.createElement('div'),
		    options = this.options;

		if (options.html) {
			div.innerHTML = options.html;
		}

		if (options.bgPos) {
			div.style.backgroundPosition =
			        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}

		this._setIconStyles(div, 'icon');
		return div;
	},

	createShadow: function () {
		return null;
	}
});

L.divIcon = function (options) {
	return new L.DivIcon(options);
};



L.Map.mergeOptions({
	closePopupOnClick: true
});

L.Popup = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minWidth: 50,
		maxWidth: 300,
		maxHeight: null,
		autoPan: true,
		closeButton: true,
		offset: new L.Point(0, 6),
		autoPanPadding: new L.Point(5, 5),
		className: ''
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initLayout();
		}
		this._updateContent();

		var animFade = map.options.fadeAnimation;

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 0);
		}
		map._panes.popupPane.appendChild(this._container);

		map.on('viewreset', this._updatePosition, this);

		if (L.Browser.any3d) {
			map.on('zoomanim', this._zoomAnimation, this);
		}

		if (map.options.closePopupOnClick) {
			map.on('preclick', this._close, this);
		}

		this._update();

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 1);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onRemove: function (map) {
		map._panes.popupPane.removeChild(this._container);

		L.Util.falseFn(this._container.offsetWidth); // force reflow

		map.off({
			viewreset: this._updatePosition,
			preclick: this._close,
			zoomanim: this._zoomAnimation
		}, this);

		if (map.options.fadeAnimation) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		this._map = null;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		this._update();
		return this;
	},

	setContent: function (content) {
		this._content = content;
		this._update();
		return this;
	},

	_close: function () {
		var map = this._map;

		if (map) {
			map._popup = null;

			map
			    .removeLayer(this)
			    .fire('popupclose', {popup: this});
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
			containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-animated',
			container = this._container = L.DomUtil.create('div', containerClass),
			closeButton;

		if (this.options.closeButton) {
			closeButton = this._closeButton =
			        L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper =
		        L.DomUtil.create('div', prefix + '-content-wrapper', container);
		L.DomEvent.disableClickPropagation(wrapper);

		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
		L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	_updateContent: function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			while (this._contentNode.hasChildNodes()) {
				this._contentNode.removeChild(this._contentNode.firstChild);
			}
			this._contentNode.appendChild(this._content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    is3d = L.Browser.any3d,
		    offset = this.options.offset;

		if (is3d) {
			L.DomUtil.setPosition(this._container, pos);
		}

		this._containerBottom = -offset.y - (is3d ? 0 : pos.y);
		this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (is3d ? 0 : pos.x);

		//Bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = this._containerBottom + 'px';
		this._container.style.left = this._containerLeft + 'px';
	},

	_zoomAnimation: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

		L.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,

		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (L.Browser.any3d) {
			layerPos._add(L.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = this.options.autoPanPadding,
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x < 0) {
			dx = containerPos.x - padding.x;
		}
		if (containerPos.x + containerWidth > size.x) {
			dx = containerPos.x + containerWidth - size.x + padding.x;
		}
		if (containerPos.y < 0) {
			dy = containerPos.y - padding.y;
		}
		if (containerPos.y + containerHeight > size.y) {
			dy = containerPos.y + containerHeight - size.y + padding.y;
		}

		if (dx || dy) {
			map.panBy(new L.Point(dx, dy));
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});

L.popup = function (options, source) {
	return new L.Popup(options, source);
};


/*
 * Popup extension to L.Marker, adding openPopup & bindPopup methods.
 */

L.Marker.include({
	openPopup: function () {
		if (this._popup && this._map) {
			this._popup.setLatLng(this._latlng);
			this._map.openPopup(this._popup);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	bindPopup: function (content, options) {
		var anchor = L.point(this.options.icon.options.popupAnchor) || new L.Point(0, 0);

		anchor = anchor.add(L.Popup.prototype.options.offset);

		if (options && options.offset) {
			anchor = anchor.add(options.offset);
		}

		options = L.extend({offset: anchor}, options);

		if (!this._popup) {
			this
			    .on('click', this.openPopup, this)
			    .on('remove', this.closePopup, this)
			    .on('move', this._movePopup, this);
		}

		this._popup = new L.Popup(options, this)
			.setContent(content);

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this.openPopup)
			    .off('remove', this.closePopup)
			    .off('move', this._movePopup);
		}
		return this;
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});



L.Map.include({
	openPopup: function (popup) {
		this.closePopup();

		this._popup = popup;

		return this
		    .addLayer(popup)
		    .fire('popupopen', {popup: this._popup});
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	}
});


/*
 * L.LayerGroup is a class to combine several layers so you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Class.extend({
	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = L.stamp(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		delete this._layers[id];

		if (this._map) {
			this._map.removeLayer(layer);
		}

		return this;
	},

	clearLayers: function () {
		this.eachLayer(this.removeLayer, this);
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				layer = this._layers[i];

				if (layer[methodName]) {
					layer[methodName].apply(layer, args);
				}
			}
		}

		return this;
	},

	onAdd: function (map) {
		this._map = map;
		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		this.eachLayer(map.removeLayer, map);
		this._map = null;
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				method.call(context, this._layers[i]);
			}
		}
	}
});

L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};


/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and bindPopup method shared between a group of layers.
 */

L.FeatureGroup = L.LayerGroup.extend({
	includes: L.Mixin.Events,

	statics: {
		EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu'
	},

	addLayer: function (layer) {
		if (this._layers[L.stamp(layer)]) {
			return this;
		}

		layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);

		L.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._popupContent && layer.bindPopup) {
			layer.bindPopup(this._popupContent);
		}

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);

		L.LayerGroup.prototype.removeLayer.call(this, layer);


		if (this._popupContent) {
			this.invoke('unbindPopup');
		}

		return this.fire('layerremove', {layer: layer});
	},

	bindPopup: function (content) {
		this._popupContent = content;
		return this.invoke('bindPopup', content);
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		this.eachLayer(function (layer) {
			bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
		});

		return bounds;
	},

	_propagateEvent: function (e) {
		e.layer  = e.target;
		e.target = this;

		this.fire(e.type, e);
	}
});

L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};


/*
 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
 */

L.Path = L.Class.extend({
	includes: [L.Mixin.Events],

	statics: {
		// how much to extend the clip area around the map view
		// (relative to its size, e.g. 0.5 is half the screen in each direction)
		// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
		CLIP_PADDING: L.Browser.mobile ?
			Math.max(0, Math.min(0.5,
			        (1280 / Math.max(window.innerWidth, window.innerHeight) - 1) / 2)) : 0.5
	},

	options: {
		stroke: true,
		color: '#0033ff',
		dashArray: null,
		weight: 5,
		opacity: 0.5,

		fill: false,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,

		clickable: true
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initElements();
			this._initEvents();
		}

		this.projectLatlngs();
		this._updatePath();

		if (this._container) {
			this._map._pathRoot.appendChild(this._container);
		}

		map.on({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		map._pathRoot.removeChild(this._container);

		this._map = null;

		if (L.Browser.vml) {
			this._container = null;
			this._stroke = null;
			this._fill = null;
		}

		this.fire('remove');

		map.off({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	projectLatlngs: function () {
		// do all projection stuff here
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._container) {
			this._updateStyle();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._updatePath();
		}
		return this;
	}
});

L.Map.include({
	_updatePathViewport: function () {
		var p = L.Path.CLIP_PADDING,
		    size = this.getSize(),
		    panePos = L.DomUtil.getPosition(this._mapPane),
		    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
		    max = min.add(size.multiplyBy(1 + p * 2)._round());

		this._pathViewport = new L.Bounds(min, max);
	}
});


L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

L.Path = L.Path.extend({
	statics: {
		SVG: L.Browser.svg
	},

	bringToFront: function () {
		var root = this._map._pathRoot,
		    path = this._container;

		if (path && root.lastChild !== path) {
			root.appendChild(path);
		}
		return this;
	},

	bringToBack: function () {
		var root = this._map._pathRoot,
		    path = this._container,
		    first = root.firstChild;

		if (path && first !== path) {
			root.insertBefore(path, first);
		}
		return this;
	},

	getPathString: function () {
		// form path string here
	},

	_createElement: function (name) {
		return document.createElementNS(L.Path.SVG_NS, name);
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._initPath();
		this._initStyle();
	},

	_initPath: function () {
		this._container = this._createElement('g');

		this._path = this._createElement('path');
		this._container.appendChild(this._path);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke-linejoin', 'round');
			this._path.setAttribute('stroke-linecap', 'round');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill-rule', 'evenodd');
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke', this.options.color);
			this._path.setAttribute('stroke-opacity', this.options.opacity);
			this._path.setAttribute('stroke-width', this.options.weight);
			if (this.options.dashArray) {
				this._path.setAttribute('stroke-dasharray', this.options.dashArray);
			} else {
				this._path.removeAttribute('stroke-dasharray');
			}
		} else {
			this._path.setAttribute('stroke', 'none');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill', this.options.fillColor || this.options.color);
			this._path.setAttribute('fill-opacity', this.options.fillOpacity);
		} else {
			this._path.setAttribute('fill', 'none');
		}
	},

	_updatePath: function () {
		var str = this.getPathString();
		if (!str) {
			// fix webkit empty string parsing bug
			str = 'M0 0';
		}
		this._path.setAttribute('d', str);
	},

	// TODO remove duplication with L.Map
	_initEvents: function () {
		if (this.options.clickable) {
			if (L.Browser.svg || !L.Browser.vml) {
				this._path.setAttribute('class', 'leaflet-clickable');
			}

			L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover',
			              'mouseout', 'mousemove', 'contextmenu'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
			}
		}
	},

	_onMouseClick: function (e) {
		if (this._map.dragging && this._map.dragging.moved()) { return; }

		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this.hasEventListeners(e.type)) { return; }

		var map = this._map,
		    containerPoint = map.mouseEventToContainerPoint(e),
		    layerPoint = map.containerPointToLayerPoint(containerPoint),
		    latlng = map.layerPointToLatLng(layerPoint);

		this.fire(e.type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});

		if (e.type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousemove') {
			L.DomEvent.stopPropagation(e);
		}
	}
});

L.Map.include({
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = L.Path.prototype._createElement('svg');
			this._panes.overlayPane.appendChild(this._pathRoot);

			if (this.options.zoomAnimation && L.Browser.any3d) {
				this._pathRoot.setAttribute('class', ' leaflet-zoom-animated');

				this.on({
					'zoomanim': this._animatePathZoom,
					'zoomend': this._endPathZoom
				});
			} else {
				this._pathRoot.setAttribute('class', ' leaflet-zoom-hide');
			}

			this.on('moveend', this._updateSvgViewport);
			this._updateSvgViewport();
		}
	},

	_animatePathZoom: function (opt) {
		var scale = this.getZoomScale(opt.zoom),
		    offset = this._getCenterOffset(opt.center),
		    translate = offset.multiplyBy(-scale)._add(this._pathViewport.min);

		this._pathRoot.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(translate) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	},

	_endPathZoom: function () {
		this._pathZooming = false;
	},

	_updateSvgViewport: function () {

		if (this._pathZooming) {
			// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
			// When the zoom animation ends we will be updated again anyway
			// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
			return;
		}

		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    max = vp.max,
		    width = max.x - min.x,
		    height = max.y - min.y,
		    root = this._pathRoot,
		    pane = this._panes.overlayPane;

		// Hack to make flicker on drag end on mobile webkit less irritating
		if (L.Browser.mobileWebkit) {
			pane.removeChild(root);
		}

		L.DomUtil.setPosition(root, min);
		root.setAttribute('width', width);
		root.setAttribute('height', height);
		root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

		if (L.Browser.mobileWebkit) {
			pane.appendChild(root);
		}
	}
});


/*
 * Popup extension to L.Path (polylines, polygons, circles), adding bindPopup method.
 */

L.Path.include({

	bindPopup: function (content, options) {

		if (!this._popup || options) {
			this._popup = new L.Popup(options, this);
		}

		this._popup.setContent(content);

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this._openPopup, this)
			    .on('remove', this.closePopup, this);

			this._popupHandlersAdded = true;
		}

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this.openPopup)
			    .off('remove', this.closePopup);

			this._popupHandlersAdded = false;
		}
		return this;
	},

	openPopup: function (latlng) {

		if (this._popup) {
			// open the popup from one of the path's points if not specified
			latlng = latlng || this._latlng ||
			         this._latlngs[Math.floor(this._latlngs.length / 2)];

			this._openPopup({latlng: latlng});
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	_openPopup: function (e) {
		this._popup.setLatLng(e.latlng);
		this._map.openPopup(this._popup);
	}
});


/*
 * Vector rendering for IE6-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
	statics: {
		VML: true,
		CLIP_PADDING: 0.02
	},

	_createElement: (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement(
				        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	}()),

	_initPath: function () {
		var container = this._container = this._createElement('shape');
		L.DomUtil.addClass(container, 'leaflet-vml-shape');
		if (this.options.clickable) {
			L.DomUtil.addClass(container, 'leaflet-clickable');
		}
		container.coordsize = '1 1';

		this._path = this._createElement('path');
		container.appendChild(this._path);

		this._map._pathRoot.appendChild(container);
	},

	_initStyle: function () {
		this._updateStyle();
	},

	_updateStyle: function () {
		var stroke = this._stroke,
		    fill = this._fill,
		    options = this.options,
		    container = this._container;

		container.stroked = options.stroke;
		container.filled = options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = this._stroke = this._createElement('stroke');
				stroke.endcap = 'round';
				container.appendChild(stroke);
			}
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;
			if (options.dashArray) {
				stroke.dashStyle = options.dashArray.replace(/ *, */g, ' ');
			} else {
				stroke.dashStyle = '';
			}
		} else if (stroke) {
			container.removeChild(stroke);
			this._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = this._fill = this._createElement('fill');
				container.appendChild(fill);
			}
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;
		} else if (fill) {
			container.removeChild(fill);
			this._fill = null;
		}
	},

	_updatePath: function () {
		var style = this._container.style;

		style.display = 'none';
		this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
		style.display = '';
	}
});

L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
	_initPathRoot: function () {
		if (this._pathRoot) { return; }

		var root = this._pathRoot = document.createElement('div');
		root.className = 'leaflet-vml-container';
		this._panes.overlayPane.appendChild(root);

		this.on('moveend', this._updatePathViewport);
		this._updatePathViewport();
	}
});


/*
 * Vector rendering for all browsers that support canvas.
 */

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
	statics: {
		//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
		CANVAS: true,
		SVG: false
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._requestUpdate();
		}
		return this;
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._map) {
			this._updateStyle();
			this._requestUpdate();
		}
		return this;
	},

	onRemove: function (map) {
		map
		    .off('viewreset', this.projectLatlngs, this)
		    .off('moveend', this._updatePath, this);

		this._requestUpdate();

		this._map = null;
	},

	_requestUpdate: function () {
		if (this._map && !L.Path._updateRequest) {
			L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
		}
	},

	_fireMapMoveEnd: function () {
		L.Path._updateRequest = null;
		this.fire('moveend');
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._ctx = this._map._canvasCtx;
	},

	_updateStyle: function () {
		var options = this.options;

		if (options.stroke) {
			this._ctx.lineWidth = options.weight;
			this._ctx.strokeStyle = options.color;
		}
		if (options.fill) {
			this._ctx.fillStyle = options.fillColor || options.color;
		}
	},

	_drawPath: function () {
		var i, j, len, len2, point, drawMethod;

		this._ctx.beginPath();

		for (i = 0, len = this._parts.length; i < len; i++) {
			for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
				point = this._parts[i][j];
				drawMethod = (j === 0 ? 'move' : 'line') + 'To';

				this._ctx[drawMethod](point.x, point.y);
			}
			// TODO refactor ugly hack
			if (this instanceof L.Polygon) {
				this._ctx.closePath();
			}
		}
	},

	_checkIfEmpty: function () {
		return !this._parts.length;
	},

	_updatePath: function () {
		if (this._checkIfEmpty()) { return; }

		var ctx = this._ctx,
		    options = this.options;

		this._drawPath();
		ctx.save();
		this._updateStyle();

		if (options.fill) {
			if (options.fillOpacity < 1) {
				ctx.globalAlpha = options.fillOpacity;
			}
			ctx.fill();
		}

		if (options.stroke) {
			if (options.opacity < 1) {
				ctx.globalAlpha = options.opacity;
			}
			ctx.stroke();
		}

		ctx.restore();

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_initEvents: function () {
		if (this.options.clickable) {
			// TODO hand cursor
			// TODO mouseover, mouseout, dblclick
			this._map.on('click', this._onClick, this);
		}
	},

	_onClick: function (e) {
		if (this._containsPoint(e.layerPoint)) {
			this.fire('click', e);
		}
	}
});

L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
	_initPathRoot: function () {
		var root = this._pathRoot,
		    ctx;

		if (!root) {
			root = this._pathRoot = document.createElement("canvas");
			root.style.position = 'absolute';
			ctx = this._canvasCtx = root.getContext('2d');

			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			this._panes.overlayPane.appendChild(root);

			if (this.options.zoomAnimation) {
				this._pathRoot.className = 'leaflet-zoom-animated';
				this.on('zoomanim', this._animatePathZoom);
				this.on('zoomend', this._endPathZoom);
			}
			this.on('moveend', this._updateCanvasViewport);
			this._updateCanvasViewport();
		}
	},

	_updateCanvasViewport: function () {
		// don't redraw while zooming. See _updateSvgViewport for more details
		if (this._pathZooming) { return; }
		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    size = vp.max.subtract(min),
		    root = this._pathRoot;

		//TODO check if this works properly on mobile webkit
		L.DomUtil.setPosition(root, min);
		root.width = size.x;
		root.height = size.y;
		root.getContext('2d').translate(-min.x, -min.y);
	}
});


/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	/*jshint bitwise:false */ // temporarily allow bitwise oprations

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var min = bounds.min,
		    max = bounds.max,

		    codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				codeOut = codeA || codeB,
				p = this._getEdgeIntersection(a, b, codeOut, bounds),
				newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max;

		if (code & 8) { // top
			return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
		} else if (code & 4) { // bottom
			return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
		} else if (code & 2) { // right
			return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
		} else if (code & 1) { // left
			return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
		}
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	/*jshint bitwise:true */

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};


L.Polyline = L.Path.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlngs = this._convertLatLngs(latlngs);

		// TODO refactor: move to Polyline.Edit.js
		if (L.Handler.PolyEdit) {
			this.editing = new L.Handler.PolyEdit(this);

			if (this.options.editable) {
				this.editing.enable();
			}
		}
	},

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0,
		noClip: false
	},

	projectLatlngs: function () {
		this._originalPoints = [];

		for (var i = 0, len = this._latlngs.length; i < len; i++) {
			this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
		}
	},

	getPathString: function () {
		for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
			str += this._getPathPartStr(this._parts[i]);
		}
		return str;
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._latlngs = this._convertLatLngs(latlngs);
		return this.redraw();
	},

	addLatLng: function (latlng) {
		this._latlngs.push(L.latLng(latlng));
		return this.redraw();
	},

	spliceLatLngs: function (index, howMany) {
		var removed = [].splice.apply(this._latlngs, arguments);
		this._convertLatLngs(this._latlngs);
		this.redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

		for (var j = 0, jLen = parts.length; j < jLen; j++) {
			var points = parts[j];
			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];
				var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds(),
		    latLngs = this.getLatLngs(),
		    i, len;

		for (i = 0, len = latLngs.length; i < len; i++) {
			bounds.extend(latLngs[i]);
		}

		return bounds;
	},

	// TODO refactor: move to Polyline.Edit.js
	onAdd: function (map) {
		L.Path.prototype.onAdd.call(this, map);

		if (this.editing && this.editing.enabled()) {
			this.editing.addHooks();
		}
	},

	onRemove: function (map) {
		if (this.editing && this.editing.enabled()) {
			this.editing.removeHooks();
		}

		L.Path.prototype.onRemove.call(this, map);
	},

	_convertLatLngs: function (latlngs) {
		var i, len;
		for (i = 0, len = latlngs.length; i < len; i++) {
			if (latlngs[i] instanceof Array && typeof latlngs[i][0] !== 'number') {
				return;
			}
			latlngs[i] = L.latLng(latlngs[i]);
		}
		return latlngs;
	},

	_initEvents: function () {
		L.Path.prototype._initEvents.call(this);
	},

	_getPathPartStr: function (points) {
		var round = L.Path.VML;

		for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
			p = points[j];
			if (round) {
				p._round();
			}
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		return str;
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    len = points.length,
		    i, k, segment;

		if (this.options.noClip) {
			this._parts = [points];
			return;
		}

		this._parts = [];

		var parts = this._parts,
		    vp = this._map._pathViewport,
		    lu = L.LineUtil;

		for (i = 0, k = 0; i < len - 1; i++) {
			segment = lu.clipSegment(points[i], points[i + 1], vp, i);
			if (!segment) {
				continue;
			}

			parts[k] = parts[k] || [];
			parts[k].push(segment[0]);

			// if segment goes out of screen, or it's the last one, it's the end of the line part
			if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
				parts[k].push(segment[1]);
				k++;
			}
		}
	},

	// simplify each clipped part of the polyline
	_simplifyPoints: function () {
		var parts = this._parts,
		    lu = L.LineUtil;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
		}
	},

	_updatePath: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();

		L.Path.prototype._updatePath.call(this);
	}
});

L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};


/*
 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise operations here

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds) {
	var min = bounds.min,
	    max = bounds.max,
	    clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};

/*jshint bitwise:true */


/*
 * L.Polygon is used to display polygons on a map.
 */

L.Polygon = L.Polyline.extend({
	options: {
		fill: true
	},

	initialize: function (latlngs, options) {
		L.Polyline.prototype.initialize.call(this, latlngs, options);

		if (latlngs && (latlngs[0] instanceof Array) && (typeof latlngs[0][0] !== 'number')) {
			this._latlngs = this._convertLatLngs(latlngs[0]);
			this._holes = latlngs.slice(1);
		}
	},

	projectLatlngs: function () {
		L.Polyline.prototype.projectLatlngs.call(this);

		// project polygon holes points
		// TODO move this logic to Polyline to get rid of duplication
		this._holePoints = [];

		if (!this._holes) { return; }

		var i, j, len, len2, hole;

		for (i = 0, len = this._holes.length; i < len; i++) {
			this._holePoints[i] = [];

			for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
				this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
			}
		}
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    newParts = [];

		this._parts = [points].concat(this._holePoints);

		if (this.options.noClip) { return; }

		for (var i = 0, len = this._parts.length; i < len; i++) {
			var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
			if (clipped.length) {
				newParts.push(clipped);
			}
		}

		this._parts = newParts;
	},

	_getPathPartStr: function (points) {
		var str = L.Polyline.prototype._getPathPartStr.call(this, points);
		return str + (L.Browser.svg ? 'z' : 'x');
	}
});

L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};


/*
 * Contains L.MultiPolyline and L.MultiPolygon layers.
 */

(function () {
	function createMulti(Klass) {

		return L.FeatureGroup.extend({

			initialize: function (latlngs, options) {
				this._layers = {};
				this._options = options;
				this.setLatLngs(latlngs);
			},

			setLatLngs: function (latlngs) {
				var i = 0,
				    len = latlngs.length;

				this.eachLayer(function (layer) {
					if (i < len) {
						layer.setLatLngs(latlngs[i++]);
					} else {
						this.removeLayer(layer);
					}
				}, this);

				while (i < len) {
					this.addLayer(new Klass(latlngs[i++], this._options));
				}

				return this;
			}
		});
	}

	L.MultiPolyline = createMulti(L.Polyline);
	L.MultiPolygon = createMulti(L.Polygon);

	L.multiPolyline = function (latlngs, options) {
		return new L.MultiPolyline(latlngs, options);
	};

	L.multiPolygon = function (latlngs, options) {
		return new L.MultiPolygon(latlngs, options);
	};
}());


/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds
 */

L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	setBounds: function (latLngBounds) {
		this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast(),
			latLngBounds.getSouthWest()
		];
	}
});

L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};


/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 */

L.Circle = L.Path.extend({
	initialize: function (latlng, radius, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = L.latLng(latlng);
		this._mRadius = radius;
	},

	options: {
		fill: true
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		return this.redraw();
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	projectLatlngs: function () {
		var lngRadius = this._getLngRadius(),
		    latlng2 = new L.LatLng(this._latlng.lat, this._latlng.lng - lngRadius, true),
		    point2 = this._map.latLngToLayerPoint(latlng2);

		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._radius = Math.max(Math.round(this._point.x - point2.x), 1);
	},

	getBounds: function () {
		var lngRadius = this._getLngRadius(),
		    latRadius = (this._mRadius / 40075017) * 360,
		    latlng = this._latlng,
		    sw = new L.LatLng(latlng.lat - latRadius, latlng.lng - lngRadius),
		    ne = new L.LatLng(latlng.lat + latRadius, latlng.lng + lngRadius);

		return new L.LatLngBounds(sw, ne);
	},

	getLatLng: function () {
		return this._latlng;
	},

	getPathString: function () {
		var p = this._point,
		    r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return "M" + p.x + "," + (p.y - r) +
			       "A" + r + "," + r + ",0,1,1," +
			       (p.x - 0.1) + "," + (p.y - r) + " z";
		} else {
			p._round();
			r = Math.round(r);
			return "AL " + p.x + "," + p.y + " " + r + "," + r + " 0," + (65535 * 360);
		}
	},

	getRadius: function () {
		return this._mRadius;
	},

	// TODO Earth hardcoded, move into projection code!

	_getLatRadius: function () {
		return (this._mRadius / 40075017) * 360;
	},

	_getLngRadius: function () {
		return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
	},

	_checkIfEmpty: function () {
		if (!this._map) {
			return false;
		}
		var vp = this._map._pathViewport,
		    r = this._radius,
		    p = this._point;

		return p.x - r > vp.max.x || p.y - r > vp.max.y ||
		       p.x + r < vp.min.x || p.y + r < vp.min.y;
	}
});

L.circle = function (latlng, radius, options) {
	return new L.Circle(latlng, radius, options);
};


/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Circle.extend({
	options: {
		radius: 10,
		weight: 2
	},

	initialize: function (latlng, options) {
		L.Circle.prototype.initialize.call(this, latlng, null, options);
		this._radius = this.options.radius;
	},

	projectLatlngs: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
	},

	setRadius: function (radius) {
		this._radius = radius;
		return this.redraw();
	}
});

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};



L.Polyline.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p, closed) {
		var i, j, k, len, len2, dist, part,
		    w = this.options.weight / 2;

		if (L.Browser.touch) {
			w += 10; // polyline click tolerance on touch devices
		}

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];
			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				if (!closed && (j === 0)) {
					continue;
				}

				dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

				if (dist <= w) {
					return true;
				}
			}
		}
		return false;
	}
});



L.Polygon.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p) {
		var inside = false,
		    part, p1, p2,
		    i, j, k,
		    len, len2;

		// TODO optimization: check if within bounds first

		if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
			// click on polygon border
			return true;
		}

		// ray casting algorithm for detecting if point is in polygon

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];

			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				p1 = part[j];
				p2 = part[k];

				if (((p1.y > p.y) !== (p2.y > p.y)) &&
						(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}

		return inside;
	}
});


/*
 * Circle canvas specific drawing parts.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function () {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
	},

	_containsPoint: function (p) {
		var center = this._point,
		    w2 = this.options.stroke ? this.options.weight / 2 : 0;

		return (p.distanceTo(center) <= this._radius + w2);
	}
});


L.GeoJSON = L.FeatureGroup.extend({
	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = geojson instanceof Array ? geojson : geojson.features,
		    i, len;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				this.addData(features[i]);
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer);
		layer.feature = geojson;

		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		var style = this.options.style;
		if (style) {
			this._setLayerStyle(layer, style);
		}
	},

	setStyle: function (style) {
		this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

L.extend(L.GeoJSON, {
	geometryToLayer: function (geojson, pointToLayer) {
		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry.coordinates,
		    layers = [],
		    latlng, latlngs, i, len, layer;

		switch (geometry.type) {
		case 'Point':
			latlng = this.coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = this.coordsToLatLng(coords[i]);
				layer = pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);
				layers.push(layer);
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
			latlngs = this.coordsToLatLngs(coords);
			return new L.Polyline(latlngs);

		case 'Polygon':
			latlngs = this.coordsToLatLngs(coords, 1);
			return new L.Polygon(latlngs);

		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, 1);
			return new L.MultiPolyline(latlngs);

		case "MultiPolygon":
			latlngs = this.coordsToLatLngs(coords, 2);
			return new L.MultiPolygon(latlngs);

		case "GeometryCollection":
			for (i = 0, len = geometry.geometries.length; i < len; i++) {
				layer = this.geometryToLayer(geometry.geometries[i], pointToLayer);
				layers.push(layer);
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (coords, reverse) { // (Array, Boolean) -> LatLng
		var lat = parseFloat(coords[reverse ? 0 : 1]),
		    lng = parseFloat(coords[reverse ? 1 : 0]);

		return new L.LatLng(lat, lng, true);
	},

	coordsToLatLngs: function (coords, levelsDeep, reverse) { // (Array, Number, Boolean) -> Array
		var latlng,
		    latlngs = [],
		    i, len;

		for (i = 0, len = coords.length; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, reverse) :
			        this.coordsToLatLng(coords[i], reverse);

			latlngs.push(latlng);
		}

		return latlngs;
	}
});

L.geoJson = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};


/*
 * L.DomEvent contains functions for working with DOM events.
 */

L.DomEvent = {
	/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler, originalHandler, newType;

		if (obj[key]) { return this; }

		handler = function (e) {
			return fn.call(context || obj, e || L.DomEvent._getEvent());
		};

		if (L.Browser.msTouch && type.indexOf('touch') === 0) {
			return this.addMsTouchListener(obj, type, handler, id);
		} else if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			return this.addDoubleTapListener(obj, handler, id);

		} else if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {

				originalHandler = handler;
				newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');

				handler = function (e) {
					if (!L.DomEvent._checkMouse(obj, e)) { return; }
					return originalHandler(e);
				};

				obj.addEventListener(newType, handler, false);

			} else {
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent("on" + type, handler);
		}

		obj[key] = handler;

		return this;
	},

	removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler = obj[key];

		if (!handler) { return; }

		if (L.Browser.msTouch && type.indexOf('touch') === 0) {
			this.removeMsTouchListener(obj, type, id);
		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent("on" + type, handler);
		}

		obj[key] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		return this;
	},

	disableClickPropagation: function (el) {

		var stop = L.DomEvent.stopPropagation;

		return L.DomEvent
			.addListener(el, L.Draggable.START, stop)
			.addListener(el, 'click', stop)
			.addListener(el, 'dblclick', stop);
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return L.DomEvent.preventDefault(e).stopPropagation(e);
	},

	getMousePosition: function (e, container) {

		var body = document.body,
		    docEl = document.documentElement,
		    x = e.pageX ? e.pageX : e.clientX + body.scrollLeft + docEl.scrollLeft,
		    y = e.pageY ? e.pageY : e.clientY + body.scrollTop + docEl.scrollTop,
		    pos = new L.Point(x, y);

		return (container ? pos._subtract(L.DomUtil.getViewportOffset(container)) : pos);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_checkMouse: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	/*jshint noarg:false */
	_getEvent: function () { // evil magic for IE

		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	}
	/*jshint noarg:false */
};

L.DomEvent.on = L.DomEvent.addListener;
L.DomEvent.off = L.DomEvent.removeListener;


/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		START: L.Browser.touch ? 'touchstart' : 'mousedown',
		END: L.Browser.touch ? 'touchend' : 'mouseup',
		MOVE: L.Browser.touch ? 'touchmove' : 'mousemove',
		TAP_TOLERANCE: 15
	},

	initialize: function (element, dragStartTarget, longPress) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
		this._longPress = longPress && !L.Browser.msTouch;
	},

	enable: function () {
		if (this._enabled) { return; }

		L.DomEvent.on(this._dragStartTarget, L.Draggable.START, this._onDown, this);
		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) { return; }

		L.DomEvent.off(this._dragStartTarget, L.Draggable.START, this._onDown);
		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		if ((!L.Browser.touch && e.shiftKey) ||
		    ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }

		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);

		if (L.Draggable._disabled) { return; }

		this._simulateClick = true;

		if (e.touches && e.touches.length > 1) {
			this._simulateClick = false;
			clearTimeout(this._longPressTimeout);
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    el = first.target;

		if (L.Browser.touch && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		this._moved = false;
		if (this._moving) { return; }

		this._startPoint = new L.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

		//Touch contextmenu event emulation
		if (e.touches && e.touches.length === 1 && L.Browser.touch && this._longPress) {
			this._longPressTimeout = setTimeout(L.bind(function () {
				var dist = (this._newPos && this._newPos.distanceTo(this._startPos)) || 0;

				if (dist < L.Draggable.TAP_TOLERANCE) {
					this._simulateClick = false;
					this._onUp();
					this._simulateEvent('contextmenu', first);
				}
			}, this), 1000);
		}

		L.DomEvent.on(document, L.Draggable.MOVE, this._onMove, this);
		L.DomEvent.on(document, L.Draggable.END, this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) { return; }

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    diffVec = newPoint.subtract(this._startPoint);

		if (!diffVec.x && !diffVec.y) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');
			this._moved = true;

			this._startPos = L.DomUtil.getPosition(this._element).subtract(diffVec);

			if (!L.Browser.touch) {
				L.DomUtil.disableTextSelection();
				this._setMovingCursor();
			}
		}

		this._newPos = this._startPos.add(diffVec);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function (e) {
		var simulateClickTouch;
		clearTimeout(this._longPressTimeout);
		if (this._simulateClick && e.changedTouches) {
			var first = e.changedTouches[0],
			    el = first.target,
			    dist = (this._newPos && this._newPos.distanceTo(this._startPos)) || 0;

			if (el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			if (dist < L.Draggable.TAP_TOLERANCE) {
				simulateClickTouch = first;
			}
		}

		if (!L.Browser.touch) {
			L.DomUtil.enableTextSelection();
			this._restoreCursor();
		}

		L.DomEvent.off(document, L.Draggable.MOVE, this._onMove);
		L.DomEvent.off(document, L.Draggable.END, this._onUp);

		if (this._moved) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend');
		}
		this._moving = false;

		if (simulateClickTouch) {
			this._moved = false;
			this._simulateEvent('click', simulateClickTouch);
		}
	},

	_setMovingCursor: function () {
		L.DomUtil.addClass(document.body, 'leaflet-dragging');
	},

	_restoreCursor: function () {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});


/*
 * L.Handler classes are used internally to inject interaction features to classes like Map and Marker.
 */

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * L.Handler.MapDrag is used internally by L.Map to make the map draggable.
 */

L.Map.mergeOptions({
	dragging: true,

	inertia: !L.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
	easeLinearity: 0.25,

	longPress: true,

	// TODO refactor, move to CRS
	worldCopyJump: true
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container, map.options.longPress);

			this._draggable.on({
				'dragstart': this._onDragStart,
				'drag': this._onDrag,
				'dragend': this._onDragEnd
			}, this);

			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDrag, this);
				map.on('viewreset', this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		var map = this._map;

		if (map._panAnim) {
			map._panAnim.stop();
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function () {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 200) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move')
		    .fire('drag');
	},

	_onViewReset: function () {
		var pxCenter = this._map.getSize()._divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint(new L.LatLng(0, 0));

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.project(new L.LatLng(0, 180)).x;
	},

	_onPreDrag: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var map = this._map,
		    worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function () {
		var map = this._map,
		    options = map.options,
		    delay = +new Date() - this._lastTime,

		    noInertia = !options.inertia ||
		            delay > options.inertiaThreshold ||
		            !this._positions[0];

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime + delay - this._times[0]) / 1000,

			    speedVector = direction.multiplyBy(options.easeLinearity / duration),
			    speed = speedVector.distanceTo(new L.Point(0, 0)),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * options.easeLinearity),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			L.Util.requestAnimFrame(function () {
				map.panBy(offset, decelerationDuration, options.easeLinearity);
			});
		}

		map.fire('dragend');

		if (options.maxBounds) {
			// TODO predrag validation instead of animation
			L.Util.requestAnimFrame(this._panInsideMaxBounds, map, true, map._container);
		}
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	}
});

L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);


/*
 * L.Handler.DoubleClickZoom is used internally by L.Map to add double-click zooming.
 */

L.Map.mergeOptions({
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick);
	},

	_onDoubleClick: function (e) {
		this.setView(e.latlng, this._zoom + 1);
	}
});

L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);

/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

L.Map.mergeOptions({
	scrollWheelZoom: !L.Browser.touch || L.Browser.msTouch
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(40 - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		delta = delta > 0 ? Math.ceil(delta) : Math.round(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;

		this._startTime = null;

		if (!delta) { return; }

		var newZoom = zoom + delta,
		    newCenter = this._getCenterForScrollWheelZoom(newZoom);

		map.setView(newCenter, newZoom);
	},

	_getCenterForScrollWheelZoom: function (newZoom) {
		var map = this._map,
		    scale = map.getZoomScale(newZoom),
		    viewHalf = map.getSize()._divideBy(2),
		    centerOffset = this._lastMousePos._subtract(viewHalf)._multiplyBy(1 - 1 / scale),
		    newCenterPoint = map._getTopLeftPoint()._add(viewHalf)._add(centerOffset);

		return map.unproject(newCenterPoint);
	}
});

L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);


L.extend(L.DomEvent, {

	_touchstart: L.Browser.msTouch ? 'MSPointerDown' : 'touchstart',
	_touchend: L.Browser.msTouch ? 'MSPointerUp' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
		    doubleTap = false,
		    delay = 250,
		    touch,
		    pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend,
		    trackedTouches = [];

		function onTouchStart(e) {
			var count;
			if (L.Browser.msTouch) {
				trackedTouches.push(e.pointerId);
				count = trackedTouches.length;
			} else {
				count = e.touches.length;
			}
			if (count > 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}
		function onTouchEnd(e) {
			if (L.Browser.msTouch) {
				var idx = trackedTouches.indexOf(e.pointerId);
				if (idx === -1) {
					return;
				}
				trackedTouches.splice(idx, 1);
			}

			if (doubleTap) {
				if (L.Browser.msTouch) {
					//Work around .type being readonly with MSPointer* events
					var newTouch = { },
						prop;
					for (var i in touch) {
						if (true) { //Make JSHint happy, we want to copy all properties
							prop = touch[i];
							if (typeof prop === 'function') {
								newTouch[i] = prop.bind(touch);
							} else {
								newTouch[i] = prop;
							}
						}
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		//On msTouch we need to listen on the document otherwise a drag starting on the map and moving off screen will not come through to us
		// so we will lose track of how many touches are ongoing
		var endElement = L.Browser.msTouch ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);
		endElement.addEventListener(touchend, onTouchEnd, false);
		if (L.Browser.msTouch) {
			endElement.addEventListener('MSPointerCancel', onTouchEnd, false);
		}
		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';
		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
		(L.Browser.msTouch ? document.documentElement : obj).removeEventListener(this._touchend, obj[pre + this._touchend + id], false);
		if (L.Browser.msTouch) {
			document.documentElement.removeEventListener('MSPointerCancel', obj[pre + this._touchend + id], false);
		}
		return this;
	}
});


L.extend(L.DomEvent, {

	_msTouches: [],
	_msDocumentListener: false,

	// Provides a touch events wrapper for msPointer events.
	// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019

	addMsTouchListener: function (obj, type, handler, id) {

		switch (type) {
		case 'touchstart':
			return this.addMsTouchListenerStart(obj, type, handler, id);
		case 'touchend':
			return this.addMsTouchListenerEnd(obj, type, handler, id);
		case 'touchmove':
			return this.addMsTouchListenerMove(obj, type, handler, id);
		default:
			throw 'Unknown touch event type';
		}
	},

	addMsTouchListenerStart: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._msTouches;

		var cb = function (e) {

			var alreadyInArray = false;
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					alreadyInArray = true;
					break;
				}
			}
			if (!alreadyInArray) {
				touches.push(e);
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchstart' + id] = cb;
		obj.addEventListener('MSPointerDown', cb, false);

		// need to also listen for end events to keep the _msTouches list accurate
		// this needs to be on the body and never go away
		if (!this._msDocumentListener) {
			var internalCb = function (e) {
				for (var i = 0; i < touches.length; i++) {
					if (touches[i].pointerId === e.pointerId) {
						touches.splice(i, 1);
						break;
					}
				}
			};
			//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener('MSPointerUp', internalCb, false);
			document.documentElement.addEventListener('MSPointerCancel', internalCb, false);

			this._msDocumentListener = true;
		}

		return this;
	},

	addMsTouchListenerMove: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._msTouches;

		function cb(e) {

			// don't fire touch moves when mouse isn't down
			if (e.pointerType === e.MSPOINTER_TYPE_MOUSE && e.buttons === 0) { return; }

			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches[i] = e;
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		}

		obj[pre + 'touchmove' + id] = cb;
		obj.addEventListener('MSPointerMove', cb, false);

		return this;
	},

	addMsTouchListenerEnd: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._msTouches;

		var cb = function (e) {
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchend' + id] = cb;
		obj.addEventListener('MSPointerUp', cb, false);
		obj.addEventListener('MSPointerCancel', cb, false);

		return this;
	},

	removeMsTouchListener: function (obj, type, id) {
		var pre = '_leaflet_',
		    cb = obj[pre + type + id];

		switch (type) {
		case 'touchstart':
			obj.removeEventListener('MSPointerDown', cb, false);
			break;
		case 'touchmove':
			obj.removeEventListener('MSPointerMove', cb, false);
			break;
		case 'touchend':
			obj.removeEventListener('MSPointerUp', cb, false);
			obj.removeEventListener('MSPointerCancel', cb, false);
			break;
		}

		return this;
	}
});


/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

L.Map.mergeOptions({
	touchZoom: L.Browser.touch && !L.Browser.android23 && !(L.Browser.android && L.Browser.androidVersion > 4) //hack [ff]
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]),
		    viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2)._divideBy(2);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		if (map._panAnim) {
			map._panAnim.stop();
		}

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		if (!e.touches || e.touches.length !== 2) { return; }

		var map = this._map;

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

		if (this._scale === 1) { return; }

		if (!this._moved) {
			L.DomUtil.addClass(map._mapPane, 'leaflet-zoom-anim leaflet-touching');

			map
			    .fire('movestart')
			    .fire('zoomstart')
			    ._prepareTileBg();

			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(
		        this._updateOnMove, this, true, this._map._container);

		L.DomEvent.preventDefault(e);
	},

	_updateOnMove: function () {
		var map = this._map,
		    origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin);

		map.fire('zoomanim', {
			center: center,
			zoom: map.getScaleZoom(this._scale)
		});

		// Used 2 translates instead of transform-origin because of a very strange bug -
		// it didn't count the origin on the first touch-zoom but worked correctly afterwards

		map._tileBg.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(this._delta) + ' ' +
		        L.DomUtil.getScaleString(this._scale, this._startCenter);
	},

	_onTouchEnd: function (e) {
		if (!this._moved || !this._zooming) { return; }

		var map = this._map;

		this._zooming = false;
		L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),

		    oldZoom = map.getZoom(),
		    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
		    roundZoomDelta = (floatZoomDelta > 0 ?
		            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),

		    zoom = map._limitZoom(oldZoom + roundZoomDelta);

		map.fire('zoomanim', {
			center: center,
			zoom: zoom
		});

		map._runAnimation(center, zoom, map.getZoomScale(zoom) / this._scale, origin, true);
	},

	_getScaleOrigin: function () {
		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
		return this._startCenter.add(centerOffset);
	}
});

L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);


/*
 * L.Handler.ShiftDragZoom is used internally by L.Map to add shift-drag zoom (zoom to a selected bounding box).
 */

L.Map.mergeOptions({
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
	},

	_onMouseDown: function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		L.DomUtil.disableTextSelection();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
		L.DomUtil.setPosition(this._box, this._startLayerPoint);

		//TODO refactor: move cursor to styles
		this._container.style.cursor = 'crosshair';

		L.DomEvent
		    .on(document, 'mousemove', this._onMouseMove, this)
		    .on(document, 'mouseup', this._onMouseUp, this)
		    .preventDefault(e);

		this._map.fire("boxzoomstart");
	},

	_onMouseMove: function (e) {
		var startPoint = this._startLayerPoint,
		    box = this._box,

		    layerPoint = this._map.mouseEventToLayerPoint(e),
		    offset = layerPoint.subtract(startPoint),

		    newPos = new L.Point(
		        Math.min(layerPoint.x, startPoint.x),
		        Math.min(layerPoint.y, startPoint.y));

		L.DomUtil.setPosition(box, newPos);

		// TODO refactor: remove hardcoded 4 pixels
		box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
		box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
	},

	_onMouseUp: function (e) {
		this._pane.removeChild(this._box);
		this._container.style.cursor = '';

		L.DomUtil.enableTextSelection();

		L.DomEvent
		    .off(document, 'mousemove', this._onMouseMove)
		    .off(document, 'mouseup', this._onMouseUp);

		var map = this._map,
		    layerPoint = map.mouseEventToLayerPoint(e);

		if (this._startLayerPoint.equals(layerPoint)) { return; }

		var bounds = new L.LatLngBounds(
		        map.layerPointToLatLng(this._startLayerPoint),
		        map.layerPointToLatLng(layerPoint));

		map.fitBounds(bounds);

		map.fire("boxzoomend", {
			boxZoomBounds: bounds
		});
	}
});

L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);


L.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

L.Map.Keyboard = L.Handler.extend({

	// list of e.keyCode values for particular actions
	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61],
		zoomOut: [189, 109]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex === -1) {
			container.tabIndex = "0";
		}

		L.DomEvent
		    .addListener(container, 'focus', this._onFocus, this)
		    .addListener(container, 'blur', this._onBlur, this)
		    .addListener(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .on('focus', this._addHooks, this)
		    .on('blur', this._removeHooks, this);
	},

	removeHooks: function () {
		this._removeHooks();

		var container = this._map._container;

		L.DomEvent
		    .removeListener(container, 'focus', this._onFocus, this)
		    .removeListener(container, 'blur', this._onBlur, this)
		    .removeListener(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .off('focus', this._addHooks, this)
		    .off('blur', this._removeHooks, this);
	},

	_onMouseDown: function () {
		if (!this._focused) {
			this._map._container.focus();
		}
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		L.DomEvent.addListener(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.removeListener(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		var key = e.keyCode;

		if (this._panKeys.hasOwnProperty(key)) {
			this._map.panBy(this._panKeys[key]);

		} else if (this._zoomKeys.hasOwnProperty(key)) {
			this._map.setZoom(this._map.getZoom() + this._zoomKeys[key]);

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);


/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;
		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon)
			    .on('dragstart', this._onDragStart, this)
			    .on('drag', this._onDrag, this)
			    .on('dragend', this._onDragEnd, this);
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function (e) {
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function (e) {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;

		marker
		    .fire('move', {latlng: latlng})
		    .fire('drag');
	},

	_onDragEnd: function () {
		this._marker
		    .fire('moveend')
		    .fire('dragend');
	}
});


L.Handler.PolyEdit = L.Handler.extend({
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		})
	},

	initialize: function (poly, options) {
		this._poly = poly;
		L.setOptions(this, options);
	},

	addHooks: function () {
		if (this._poly._map) {
			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._poly._map.addLayer(this._markerGroup);
		}
	},

	removeHooks: function () {
		if (this._poly._map) {
			this._poly._map.removeLayer(this._markerGroup);
			delete this._markerGroup;
			delete this._markers;
		}
	},

	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		this._markers = [];

		var latlngs = this._poly._latlngs,
		    i, j, len, marker;

		// TODO refactor holes implementation in Polygon to support it here

		for (i = 0, len = latlngs.length; i < len; i++) {

			marker = this._createMarker(latlngs[i], i);
			marker.on('click', this._onMarkerClick, this);
			this._markers.push(marker);
		}

		var markerLeft, markerRight;

		for (i = 0, j = len - 1; i < len; j = i++) {
			if (i === 0 && !(L.Polygon && (this._poly instanceof L.Polygon))) {
				continue;
			}

			markerLeft = this._markers[j];
			markerRight = this._markers[i];

			this._createMiddleMarker(markerLeft, markerRight);
			this._updatePrevNext(markerLeft, markerRight);
		}
	},

	_createMarker: function (latlng, index) {
		var marker = new L.Marker(latlng, {
			draggable: true,
			icon: this.options.icon
		});

		marker._origLatLng = latlng;
		marker._index = index;

		marker.on('drag', this._onMarkerDrag, this);
		marker.on('dragend', this._fireEdit, this);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_fireEdit: function () {
		this._poly.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target;

		L.extend(marker._origLatLng, marker._latlng);

		if (marker._middleLeft) {
			marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
		}
		if (marker._middleRight) {
			marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
		}

		this._poly.redraw();
	},

	_onMarkerClick: function (e) {
		// we want to remove the marker on click, but if latlng count < 3, polyline would be invalid
		if (this._poly._latlngs.length < 3) { return; }

		var marker = e.target,
		    i = marker._index;

		// remove the marker
		this._markerGroup.removeLayer(marker);
		this._markers.splice(i, 1);
		this._poly.spliceLatLngs(i, 1);
		this._updateIndexes(i, -1);

		// update prev/next links of adjacent markers
		this._updatePrevNext(marker._prev, marker._next);

		// remove ghost markers near the removed marker
		if (marker._middleLeft) {
			this._markerGroup.removeLayer(marker._middleLeft);
		}
		if (marker._middleRight) {
			this._markerGroup.removeLayer(marker._middleRight);
		}

		// create a ghost marker in place of the removed one
		if (marker._prev && marker._next) {
			this._createMiddleMarker(marker._prev, marker._next);

		} else if (!marker._prev) {
			marker._next._middleLeft = null;

		} else if (!marker._next) {
			marker._prev._middleRight = null;
		}

		this._poly.fire('edit');
	},

	_updateIndexes: function (index, delta) {
		this._markerGroup.eachLayer(function (marker) {
			if (marker._index > index) {
				marker._index += delta;
			}
		});
	},

	_createMiddleMarker: function (marker1, marker2) {
		var latlng = this._getMiddleLatLng(marker1, marker2),
		    marker = this._createMarker(latlng),
		    onClick,
		    onDragStart,
		    onDragEnd;

		marker.setOpacity(0.6);

		marker1._middleRight = marker2._middleLeft = marker;

		onDragStart = function () {
			var i = marker2._index;

			marker._index = i;

			marker
			    .off('click', onClick)
			    .on('click', this._onMarkerClick, this);

			latlng.lat = marker.getLatLng().lat;
			latlng.lng = marker.getLatLng().lng;
			this._poly.spliceLatLngs(i, 0, latlng);
			this._markers.splice(i, 0, marker);

			marker.setOpacity(1);

			this._updateIndexes(i, 1);
			marker2._index++;
			this._updatePrevNext(marker1, marker);
			this._updatePrevNext(marker, marker2);
		};

		onDragEnd = function () {
			marker.off('dragstart', onDragStart, this);
			marker.off('dragend', onDragEnd, this);

			this._createMiddleMarker(marker1, marker);
			this._createMiddleMarker(marker, marker2);
		};

		onClick = function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._poly.fire('edit');
		};

		marker
		    .on('click', onClick, this)
		    .on('dragstart', onDragStart, this)
		    .on('dragend', onDragEnd, this);

		this._markerGroup.addLayer(marker);
	},

	_updatePrevNext: function (marker1, marker2) {
		if (marker1) {
			marker1._next = marker2;
		}
		if (marker2) {
			marker2._prev = marker1;
		}
	},

	_getMiddleLatLng: function (marker1, marker2) {
		var map = this._poly._map,
		    p1 = map.latLngToLayerPoint(marker1.getLatLng()),
		    p2 = map.latLngToLayerPoint(marker2.getLatLng());

		return map.layerPointToLatLng(p1._add(p2)._divideBy(2));
	}
});



L.Control = L.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	addTo: function (map) {
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	removeFrom: function (map) {
		var pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		corner.removeChild(this._container);
		this._map = null;

		if (this.onRemove) {
			this.onRemove(map);
		}

		return this;
	}
});

L.control = function (options) {
	return new L.Control(options);
};


L.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.removeFrom(this);
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	}
});


L.Control.Zoom = L.Control.extend({
	options: {
		position: 'topleft'
	},

	onAdd: function (map) {
		var className = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', className);

		this._map = map;

		this._zoomInButton = this._createButton(
		        '+', 'Zoom in',  className + '-in',  container, this._zoomIn,  this);
		this._zoomOutButton = this._createButton(
		        '-', 'Zoom out', className + '-out', container, this._zoomOut, this);

		map.on('zoomend', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend', this._updateDisabled, this);
	},

	_zoomIn: function (e) {
		this._map.zoomIn(e.shiftKey ? 3 : 1);
	},

	_zoomOut: function (e) {
		this._map.zoomOut(e.shiftKey ? 3 : 1);
	},

	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		L.DomEvent
		    .on(link, 'click', L.DomEvent.stopPropagation)
		    .on(link, 'mousedown', L.DomEvent.stopPropagation)
		    .on(link, 'dblclick', L.DomEvent.stopPropagation)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
			className = 'leaflet-control-zoom-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



L.Control.Attribution = L.Control.extend({
	options: {
		position: 'bottomright',
		prefix: 'Powered by <a target="_blank" href="http://general-solutions.eu">Contwise Maps</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);

		map
		    .on('layeradd', this._onLayerAdd, this)
		    .on('layerremove', this._onLayerRemove, this);

		this._update();

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerAdd)
		    .off('layerremove', this._onLayerRemove);

	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return; }

		this._attributions[text]--;
		this._update();

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions.hasOwnProperty(i) && this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' &#8212; ');
	},

	_onLayerAdd: function (e) {
		if (e.layer.getAttribution) {
			this.addAttribution(e.layer.getAttribution());
			if (!e.layer.attributionPrefix) {
				this.options.prefix = "";
			}
		}
	},

	_onLayerRemove: function (e) {
		if (e.layer.getAttribution) {
			this.removeAttribution(e.layer.getAttribution());
		}
	}
});

L.Map.mergeOptions({
	attributionControl: true
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new L.Control.Attribution()).addTo(this); 
	}
});

L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};


L.Control.Scale = L.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 100,
		metric: true,
		imperial: true,
		updateWhenIdle: false
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className, container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className + '-line', container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_update: function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,
		    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
		    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

		    size = this._map.getSize(),
		    options = this.options,
		    maxMeters = 0;

		if (size.x > 0) {
			maxMeters = dist * (options.maxWidth / size.x);
		}

		this._updateScales(options, maxMeters);
	},

	_updateScales: function (options, maxMeters) {
		if (options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters);

		this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
		this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    scale = this._iScale,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);

			scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
			scale.innerHTML = miles + ' mi';

		} else {
			feet = this._getRoundNum(maxFeet);

			scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
			scale.innerHTML = feet + ' ft';
		}
	},

	_getScaleWidth: function (ratio) {
		return Math.round(this.options.maxWidth * ratio) - 10;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});

L.control.scale = function (options) {
	return new L.Control.Scale(options);
};


L.Control.Layers = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;

		for (var i in baseLayers) {
			if (baseLayers.hasOwnProperty(i)) {
				this._addLayer(baseLayers[i], i);
			}
		}

		for (i in overlays) {
			if (overlays.hasOwnProperty(i)) {
				this._addLayer(overlays[i], i, true);
			}
		}
	},

	onAdd: function (map) {
		this._initLayout();
		this._update();

		return this._container;
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		this._update();
		return this;
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		this._update();
		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);
		delete this._layers[id];
		this._update();
		return this;
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className);

		if (!L.Browser.touch) {
			L.DomEvent.disableClickPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			L.DomEvent
			    .on(container, 'mouseover', this._expand, this)
			    .on(container, 'mouseout', this._collapse, this);

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent
				    .on(link, 'click', L.DomEvent.stopPropagation)
				    .on(link, 'click', L.DomEvent.preventDefault)
				    .on(link, 'click', this._expand, this);
			}
			else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}

			this._map.on('movestart', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		var id = L.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
		    overlaysPresent = false;

		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				var obj = this._layers[i];
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
			}
		}

		this._separator.style.display = (overlaysPresent && baseLayersPresent ? '' : 'none');
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
		if (checked) {
			radioHtml += ' checked="checked"';
		}
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    input,
		    checked = this._map.hasLayer(obj.layer);

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);
	},

	_onInputClick: function () {
		var i, input, obj,
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length,
		    baseLayer;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			obj = this._layers[input.layerId];

			if (input.checked && !this._map.hasLayer(obj.layer)) {
				this._map.addLayer(obj.layer);
				if (!obj.overlay) {
					baseLayer = obj.layer;
				}
			} else if (!input.checked && this._map.hasLayer(obj.layer)) {
				this._map.removeLayer(obj.layer);
			}
		}

		if (baseLayer) {
			this._map.fire('baselayerchange', {layer: baseLayer});
		}
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
	}
});

L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};


/*
 * L.PosAnimation is used by Leaflet internally for pan animations.
 */

L.PosAnimation = L.Class.extend({
	includes: L.Mixin.Events,

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;

		this.fire('start');

		el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
		        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

		L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
		L.DomUtil.setPosition(el, newPos);

		// toggle reflow, Chrome flickers for some reason if you don't do this
		L.Util.falseFn(el.offsetWidth);

		// there's no native way to track value updates of transitioned properties, so we imitate this
		this._stepTimer = setInterval(L.bind(this.fire, this, 'step'), 50);
	},

	stop: function () {
		if (!this._inProgress) { return; }

		// if we just removed the transition property, the element would jump to its final position,
		// so we need to make it stay at the current position

		L.DomUtil.setPosition(this._el, this._getPos());
		this._onTransitionEnd();
		L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
	},

	// you can't easily get intermediate values of properties animated with CSS3 Transitions,
	// we need to parse computed style (in case of transform it returns matrix string)

	_transformRe: /(-?[\d\.]+), (-?[\d\.]+)\)/,

	_getPos: function () {
		var left, top, matches,
		    el = this._el,
		    style = window.getComputedStyle(el);

		if (L.Browser.any3d) {
			matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
			left = parseFloat(matches[1]);
			top  = parseFloat(matches[2]);
		} else {
			left = parseFloat(style.left);
			top  = parseFloat(style.top);
		}

		return new L.Point(left, top, true);
	},

	_onTransitionEnd: function () {
		L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

		if (!this._inProgress) { return; }
		this._inProgress = false;

		this._el.style[L.DomUtil.TRANSITION] = '';

		clearInterval(this._stepTimer);

		this.fire('step').fire('end');
	}

});



L.Map.include({

	setView: function (center, zoom, forceReset) {
		zoom = this._limitZoom(zoom);

		var zoomChanged = (this._zoom !== zoom);

		if (this._loaded && !forceReset && this._layers) {

			if (this._panAnim) {
				this._panAnim.stop();
			}

			var done = (zoomChanged ?
			        this._zoomToIfClose && this._zoomToIfClose(center, zoom) :
			        this._panByIfClose(center));

			// exit if animated pan or zoom started
			if (done) {
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, duration, easeLinearity) {
		offset = L.point(offset);

		if (!(offset.x || offset.y)) {
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		this.fire('movestart');

		L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

		var newPos = L.DomUtil.getPosition(this._mapPane).subtract(offset)._round();
		this._panAnim.run(this._mapPane, newPos, duration || 0.25, easeLinearity);

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_panByIfClose: function (center) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		if (this._offsetIsWithinView(offset)) {
			this.panBy(offset);
			return true;
		}
		return false;
	},

	_offsetIsWithinView: function (offset, multiplyFactor) {
		var m = multiplyFactor || 1,
		    size = this.getSize();

		return (Math.abs(offset.x) <= size.x * m) &&
		       (Math.abs(offset.y) <= size.y * m);
	}
});


/*
 * L.PosAnimation fallback implementation that powers Leaflet pan animations
 * in browsers that don't support CSS3 Transitions.
 */
 
L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step();
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function () {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		L.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


L.Map.mergeOptions({
	zoomAnimation: L.DomUtil.TRANSITION && !L.Browser.android23 && !L.Browser.mobileOpera
});

if (L.DomUtil.TRANSITION) {
	L.Map.addInitHook(function () {
		L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
	});
}

L.Map.include(!L.DomUtil.TRANSITION ? {} : {

	_zoomToIfClose: function (center, zoom) {

		if (this._animatingZoom) { return true; }

		if (!this.options.zoomAnimation) { return false; }

		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

		// if offset does not exceed half of the view
		if (!this._offsetIsWithinView(offset, 1)) { return false; }

		L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');

		this
		    .fire('movestart')
		    .fire('zoomstart');

		this.fire('zoomanim', {
			center: center,
			zoom: zoom
		});

		var origin = this._getCenterLayerPoint().add(offset);

		this._prepareTileBg();
		this._runAnimation(center, zoom, scale, origin);

		return true;
	},

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom) {
			this._onZoomTransitionEnd();
		}
	},

	_runAnimation: function (center, zoom, scale, origin, backwardsTransform) {
		this._animateToCenter = center;
		this._animateToZoom = zoom;
		this._animatingZoom = true;

		if (L.Draggable) {
			L.Draggable._disabled = true;
		}

		var transform = L.DomUtil.TRANSFORM,
		    tileBg = this._tileBg;

		clearTimeout(this._clearTileBgTimer);

		L.Util.falseFn(tileBg.offsetWidth); //hack to make sure transform is updated before running animation

		var scaleStr = L.DomUtil.getScaleString(scale, origin),
		    oldTransform = tileBg.style[transform];

		tileBg.style[transform] = backwardsTransform ?
		        oldTransform + ' ' + scaleStr :
		        scaleStr + ' ' + oldTransform;
	},

	_prepareTileBg: function () {
		var tilePane = this._tilePane,
		    tileBg = this._tileBg;

		// If foreground layer doesn't have many tiles but bg layer does, keep the existing bg layer and just zoom it some more
		if (tileBg && this._getLoadedTilesPercentage(tileBg) > 0.5 &&
			          this._getLoadedTilesPercentage(tilePane) < 0.5) {

			tilePane.style.visibility = 'hidden';
			tilePane.empty = true;
			this._stopLoadingImages(tilePane);
			return;
		}

		if (!tileBg) {
			tileBg = this._tileBg = this._createPane('leaflet-tile-pane', this._mapPane);
			tileBg.style.zIndex = 1;
		}

		// prepare the background pane to become the main tile pane
		tileBg.style[L.DomUtil.TRANSFORM] = '';
		tileBg.style.visibility = 'hidden';

		// tells tile layers to reinitialize their containers
		tileBg.empty = true; //new FG
		tilePane.empty = false; //new BG

		//Switch out the current layer to be the new bg layer (And vice-versa)
		this._tilePane = this._panes.tilePane = tileBg;
		var newTileBg = this._tileBg = tilePane;

		L.DomUtil.addClass(newTileBg, 'leaflet-zoom-animated');

		this._stopLoadingImages(newTileBg);
	},

	_getLoadedTilesPercentage: function (container) {
		var tiles = container.getElementsByTagName('img'),
		    i, len, count = 0;

		for (i = 0, len = tiles.length; i < len; i++) {
			if (tiles[i].complete) {
				count++;
			}
		}
		return count / len;
	},

	// stops loading all tiles in the background layer
	_stopLoadingImages: function (container) {
		var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
		    i, len, tile;

		for (i = 0, len = tiles.length; i < len; i++) {
			tile = tiles[i];

			if (!tile.complete) {
				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;
				tile.src = L.Util.emptyImageUrl;

				tile.parentNode.removeChild(tile);
			}
		}
	},

	_onZoomTransitionEnd: function () {
		this._restoreTileFront();
		L.Util.falseFn(this._tileBg.offsetWidth); // force reflow
		this._resetView(this._animateToCenter, this._animateToZoom, true, true);

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');
		this._animatingZoom = false;

		if (L.Draggable) {
			L.Draggable._disabled = false;
		}
	},

	_restoreTileFront: function () {
		this._tilePane.innerHTML = '';
		this._tilePane.style.visibility = '';
		this._tilePane.style.zIndex = 2;
		this._tileBg.style.zIndex = 1;
	},

	_clearTileBg: function () {
		if (!this._animatingZoom && !this.touchZoom._zooming) {
			this._tileBg.innerHTML = '';
		}
	}
});


/*
 * Provides L.Map with convenient shortcuts for W3C geolocation.
 */

L.Map.include({
	_defaultLocateOptions: {
		watch: false,
		setView: false,
		maxZoom: Infinity,
		timeout: 10000,
		maximumAge: 0,
		enableHighAccuracy: false
	},

	locate: function (/*Object*/ options) {

		options = this._locationOptions = L.extend(this._defaultLocateOptions, options);

		if (!navigator.geolocation) {
			this._handleGeolocationError({
				code: 0,
				message: "Geolocation not supported."
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
			onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? "permission denied" :
		            (c === 2 ? "position unavailable" : "timeout"));

		if (this._locationOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: "Geolocation error: " + message + "."
		});
	},

	_handleGeolocationResponse: function (pos) {
		var latAccuracy = 180 * pos.coords.accuracy / 4e7,
		    lngAccuracy = latAccuracy * 2,

		    lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),

		    sw = new L.LatLng(lat - latAccuracy, lng - lngAccuracy),
		    ne = new L.LatLng(lat + latAccuracy, lng + lngAccuracy),
		    bounds = new L.LatLngBounds(sw, ne),

		    options = this._locationOptions;

		if (options.setView) {
			var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
			this.setView(latlng, zoom);
		}

		this.fire('locationfound', {
			latlng: latlng,
			bounds: bounds,
			accuracy: pos.coords.accuracy
		});
	}
});




}(this));

/***
 * Class for querying resources and categories from server
 * Needs an api key for correct operation
 */
nefos.AltitudeProfile = nefos.EventEmitter.extend({
	/***
	 * Constructor
	 * @param settings map of settings. apiKey is mandatory.
	 */	
	init : function(targetId, settings) {
		this._super(settings);
				
		this.targetId = targetId;
		this.$profileContainer = (typeof this.targetId == 'string' ? jQuery("#" + this.targetId) : this.targetId);
			
		this.settings.width = this.settings.width || this.$profileContainer.width();
		this.settings.height = this.settings.height || this.$profileContainer.height();
				
		this.settings.legendHeight = this.settings.legendHeight || 100;
		this.settings.chartHeight = this.settings.chartHeight || this.settings.height - this.settings.legendHeight;
		this.settings.chartWidth = this.settings.width;
		
		this.settings.smoothFactor = this.settings.smoothFactor || 4;
		
		this.settings.legendClass = this.settings.legendClass || 'nefos-altitudeProfileLegend';
		this.settings.chartClass = this.settings.chartClass || 'nefos-altitudeProfileChart';
		this.settings.flagClass = this.settings.flagClass || 'nefos-altitudeProfileFlag';
		this.settings.flagPoleClass = this.settings.flagPoleClass || 'nefos-altitudeProfileFlagPole';
		this.settings.flagPoleWidth = this.settings.flagPoleWidth || 1;
		this.settings.flagMaxTextLength = this.settings.flagMaxTextLength || 30;
				
		this.settings.poiDetailClass = this.settings.poiDetailClass || "nefos-altitudeProfileDetails";
		this.settings.poiDetailCallback = this.settings.poiDetailCallback || function(mapping) {  return "<b>" + mapping.linkedResource.getName() + "</b><p>" + mapping.linkedResource.getDescription() + "</p>"; };
		this.settings.poiToggleTimeout = this.settings.poiToggleTimeout || 400;
				
		this.settings.flagPoleColor = this.settings.flagPoleColor || "#808080";
		this.settings.flagStepSize = this.settings.flagStepSize || 20;
		this.settings.flagOffsetLeft = this.settings.flagOffsetLeft || 0;
		this.settings.flagPosition = this.settings.flagPosition || "left";
		this.settings.flagRows = this.settings.flagRows || 6;
		
		this.settings.noMouseOver = this.settings.noMouseOver || false;
		
		this.settings.crosshairWidth = this.settings.crosshairWidth || "1px";
		this.settings.crosshairColor = this.settings.crosshairColor || "#333333";
		this.settings.crosshairHideTimeout = this.settings.crosshairHideTimeout || 1500;
		
		this.settings.showLinkedPoiDetails = this.settings.showLinkedPoiDetails || false;
		
		this.settings.colors = this.settings.colors || /* Debugging colors.
														[
		                                                "#FF0000", //0-500
		                                                "#00C000", //500-1000
		                                                "#FF8000", //1000-1500
		                                                "#000080", //1500-2000
		                                                "#DAD8CC", //2000-2500
		                                                "#E0E5E9", //2500-3000
		                                                "#F4F8FB", //3000-3500
		                                                "#F4F8FB" //3500-4000
		                                                ];*/
		
		{
		                                                "0": "#7B982F", //0-500
		                                                "500" : "#93BB3A", //500-1000
		                                                "1000" :"#BFCB5E", //1000-1500
		                                                "1500" :"#D6D88C", //1500-2000
		                                                "2000" :"#DAD8CC", //2000-2500
		                                                "2500" :"#E0E5E9", //2500-3000
		                                                "3000" :"#F4F8FB", //3000-3500
		                                                "3500" :"#F4F8FB", //3500-4000
		                                                "4000" :"#F4F8FB", //4000-4500
		                                                "4500" : "#F4F8FB" //4500-5000
		};
		
		this.apiKey = this.settings.apiKey;
		this._createElements();
		
		this.mouseMoveTimeout = null;
	},
	
	reset : function() {
		this.$profileContainer.find('div.nefos-altitudeProfileFlag').remove();
		this.$profileContainer.find('div.nefos-altitudeProfileFlagPole').remove();
		this.$profileContainer.find('div.profilePointLabel').remove();
		
		this.$profileChart.html("");
	},
	
	_createElements : function() {
		this.$profileLegend = jQuery("<div class='" + this.settings.legendClass + "'></div>").css({
			width: this.settings.width,
			height: this.settings.legendHeight
		});
		this.$profileContainer.append(this.$profileLegend);
		
		this.chartId = this.getUniqueId();
		
		this.$profileChart = jQuery("<div class='" + this.settings.chartClass + "' id='" + this.chartId + "'></div>").css({
			width: this.settings.width,
			height: this.settings.chartHeight
		});
		this.$profileContainer.append(this.$profileChart);
		
		this.settings.flagOffsetLeft = nefos.CssInt(this.$profileContainer, "paddingLeft") 
										+ nefos.CssInt(this.$profileChart, "paddingLeft");
		
	},
	
	_createCrosshair : function() {
		this.$crosshair = jQuery("<div id='nefos-altitudeCrosshair'></div>").css({
			left: this.curveStartX + "px",
			width: this.settings.crosshairWidth,
			height: this.curveHeight,
			backgroundColor: this.settings.crosshairColor,
			top: this.curveStartY + "px",
			position: "absolute",
			zIndex: 3,
			display: "none"
		});
		
		this.$profileChart.append(this.$crosshair);
		this.lastCrosshairEvtX = -1000;
	},

		
	_setupChartEventHandler :function() {
		var outer = this;
		
		setInterval(function() {		
			var timeDelta = new Date().getTime() - outer.lastMove;
			
			if (timeDelta > outer.settings.crosshairHideTimeout) {
				outer.$crosshair.fadeOut();
				outer.emitEvent("mouseout");
			}
						
			if (timeDelta > outer.settings.poiToggleTimeout && outer.linkedPoiMouseOver != null && (!outer.poiMouseOver || outer.linkedPoiMouseOver != outer.lastLinkedPoiMouseOver)) {							
				outer.emitEvent("linkedPoiMouseOver", outer.linkedPoiMouseOver);
				outer.poiMouseOver = true;
				outer.lastLinkedPoiMouseOver = outer.linkedPoiMouseOver;
			}
			else if (outer.linkedPoiMouseOver == null && timeDelta > outer.settings.poiToggleTimeout && outer.poiMouseOver) {
				outer.emitEvent("linkedPoiMouseOut");
				outer.poiMouseOver = false;
			}
			
			
		}, 100); 
		
		
		this.$chart.bind("mousemove", function(evt) {
			if (!outer.mouseMoveTimeout) {
				outer.mouseMoveTimeout = window.setTimeout(function() {
					outer.mouseMoveTimeout = null;
					outer._chartOnMouseMove(evt);
				}, 50);
			}
		});
	},
	
	_chartOnMouseMove : function(evt) {
		
		if(this.settings.noMouseOver){
			return;
		}
		
		this.$crosshair.show();
		
		this.lastMove =  new Date().getTime();			
		var diffX = Math.abs(this.lastCrosshairEvtX - evt.pageX);

		var pos = this.getCurveMousePosition(evt);
		if (pos) {
			this.$crosshair.css({
				left: pos.x + "px"
			});
			
			this.lastCrosshairEvtX = evt.pageX;
			var pointIdx = Math.round((pos.x - this.curveStartX) / this.pointXPxDist);
			
			var dist = 0;
			var pixels;
			for(var i=0;i<this.profileData.distances.length;i++){
				dist += this.profileData.distances[i];
				pixels = dist * this.curveWidth / this.profileData.totalLength;
				
				if(pixels > pos.x - this.curveStartX){
					pointIdx = i;
					break;
				}
			}
			
			if (pointIdx >= this.profileData.flatPoints.length) {
				pointIdx = this.profileData.flatPoints.length -1;
			}
			else if (pointIdx < 0){ 
				pointIdx = 0;
			}
			
			var polyline = null;
			var polylineIdx = -1;
			
			var totalLength = 0;
			
			/*
			nefos.L("profile", "no.points", this.profileData.flatPoints.length);
			nefos.L("profile", "point.index", pointIdx);
			*/
			
			for (var i=0;i<this.profileData.chartPolylines.length;i++) {
				polyline = this.profileData.chartPolylines[i];
				polylineIdx = i;
				
				if ((totalLength + polyline.getPoints().length) > pointIdx) {
					pointIdx = pointIdx - totalLength;
					break;
				}
				
				totalLength += polyline.getPoints().length;
			}
			
			/*
			nefos.L("profile", "polyline.index", polylineIdx);
			nefos.L("profile", "polyline.length", polyline.getPoints().length);
			nefos.L("profile", "relative.point.index", pointIdx);
			nefos.L("profile", "=================================");
			*/
			
			var linkedPoiTolerance = Math.round(30 / this.pointXPxDist);
			
			
			//nefos.L("profile","tolerance", linkedPoiTolerance);
			//nefos.L("profile","pointXPxDist", this.pointXPxDist);
			
			
			var linkedPoiSet = false;
			for (var i=pointIdx-linkedPoiTolerance;i<pointIdx+linkedPoiTolerance;i++) {
				if (this.profileData.pointLabels[polylineIdx][i]) {
					this.linkedPoiMouseOver = this.profileData.pointLabels[polylineIdx][i];
					linkedPoiSet = true;
					break;
				}
			}
			if (!linkedPoiSet) {
				this.linkedPoiMouseOver = null;
			}

			this.emitEvent("mouseMove", this.profileData.resource, polyline, pointIdx);
		}
	},
	
	onLinkedPoiMouseOver : function(poiMapping) {
		if (!this.settings.showLinkedPoiDetails) {
			return;
		}
		
		var resource = poiMapping.linkedResource;
		
		var html = this.settings.poiDetailCallback(poiMapping);
		if (!html) {
			return;
		}
				
		if (!this.$detailContainer) {
			this.$detailContainer = jQuery("<div class='"+ this.settings.poiDetailClass + "'></div>");
			this.$profileContainer.append(this.$detailContainer);
		}
		
		if (this.$detailContainer.hasClass("nefos-altitudeProfileDetailsVisible")) {
			this.$detailContainer.html(html);
		}
		else {
			this.$detailContainer.css({
				position: "absolute",
				top: 0 + "px",
				left:0 + "px"
			})
			.html(html)
			.fadeIn("normal",function() {
				jQuery(this).addClass("nefos-altitudeProfileDetailsVisible");
			});
		}
	},
		
	onLinkedPoiMouseOut : function() {
		if (!this.settings.showLinkedPoiDetails) {
			return;
		}
		
		this.$detailContainer.fadeOut("normal", function() {
			jQuery(this).removeClass("nefos-altitudeProfileDetailsVisible");
		});
	},
	
	draw : function(resource) {	
		this.reset();
		
		//Chart init
		this.profileData = this.getAltitudeProfileData(resource);
		
		if (this.profileData.length <= 0) {
			return;
		}
		
		var yTicks = [];
		var colors = [];

		var yStep = 50;
		var minHundred = this.profileData.minAltitude - this.profileData.minAltitude % yStep;
		var maxHundred = (this.profileData.maxAltitude - this.profileData.maxAltitude % yStep) + yStep;
		
		while((maxHundred - minHundred)/yStep > 4){
			yStep += 50;
			minHundred = this.profileData.minAltitude - this.profileData.minAltitude % yStep;
			maxHundred = (this.profileData.maxAltitude - this.profileData.maxAltitude % yStep) + yStep;
		}
			
		var currentTick = minHundred;
		while (currentTick <= maxHundred) {
			yTicks.push(currentTick);
			currentTick += yStep;
		}
		
		var outer = this;
		jQuery.each(yTicks, function(idx, height) {
			while(!outer.settings.colors[height]){
				height += 50;
			}
			colors.push(outer.settings.colors[height]);
		});	
						
		var stepSize = 0;
		var maxDist = this.profileData.totalLength/1000;
			
		stepSize = maxDist / 5;
		
		var xTicks = this._buildTicks(stepSize, this.profileData.totalLength/1000);
		
		this.chart = new Chart(this.$profileChart[0]);
		this.chart.setDefaultType(CHART_AREA | CHART_STACKED);
		this.chart.setGridDensity(xTicks.length,yTicks.length);
		
		this.chart.add(0, colors, this.profileData.areaData);
		
		this.chart.setLineSerial(true);
		for (var i=0;i<this.profileData.lineData.length;i++) {
			this.chart.add(i + "_line", this.profileData.lineColors[i], this.profileData.lineData[i], CHART_LINE, this.profileData.pointLabels[i]);
		}
		
		this.chart.setDistances(this.profileData.distances);
		this.chart.setTotalLength(this.profileData.totalLength);
				
		this.chart.setShowLegend(false);
				
		this.chart.setVerticalRange(yTicks[0], yTicks[yTicks.length-1]);
		this.chart.setHorizontalLabels(xTicks);
		this.chart.draw();
		
		this.curveStartX = this.chart.chartCurveX;
		this.curveStartY = this.chart.chartCurveY;
		
		this.curveWidth = this.chart.chartCurveWidth;
		this.curveHeight = this.chart.chartCurveHeight;
						
		this.$chart = jQuery("#" + this.chartId);
								
		this.pointXPxDist = this.curveWidth / this.profileData.flatPoints.length;
		this.drawLegend();
		
		this._createCrosshair();
		this._setupChartEventHandler();
	},
	
	getCurveMousePosition : function(evt) { 
	    var offset = nefos.GetRelativeCoordinates(this.$chart, evt);
				
		if (offset.left <= (this.curveWidth + this.curveStartX) && offset.left >= this.curveStartX) {
			return { x: offset.left, y: offset.top};
		}
		
		return null;
	},

	drawLegend : function() {
		var outer = this;
		var offsetTop = 0;		
		
		this.$profileChart.find("div.profilePointLabel").each(function(index) {
			var $this = $(this);
			var data = $this.data("labelData");	
			
			$this.click(function() {
				outer.emitEvent("onLinkedPoiClick", data);
			});
						
			var iconTop = data.icon.top;
			var iconLeft = data.icon.left;
			
			var left = (iconLeft + data.linkedGeoObject.getAltitudeProfileIcon().width / 2);
			var flagPos = ((index % outer.settings.flagRows) * outer.settings.flagStepSize);
			
			var flagText = data.linkedResource.getName();
			if (flagText.length > outer.settings.flagMaxTextLength) {
				flagText = flagText.substring(0, outer.settings.flagMaxTextLength) + "..";
			}			
			
			var $flag = jQuery("<div></div>").css({
				position: "absolute",
				cursor: "pointer",
				top: flagPos
			}).addClass(outer.settings.flagClass).attr("id", "nefos-altitudeProfileFlag_" + data.linkedResource.getId()).text(flagText);
			
			$flag.click(function() {
				outer.emitEvent("onLinkedPoiClick", data);
			});
			
			if (left > (outer.settings.width  / 2)) {
				//start with profile container, because chart is generally a bit smaller (overlapping of legend)
				$flag.css({
					right: (outer.$profileContainer.width() - left) + "px"
				});
			}
			else {
				$flag.css({
					left: (outer.settings.flagOffsetLeft + left) + "px"
				});
			}
			
			var $flagPole = jQuery("<div></div>").css({
				left: (outer.settings.flagOffsetLeft + left) + "px",
				width: outer.settings.flagPoleWidth + "px",
				height: (outer.settings.legendHeight + iconTop - flagPos) + "px",
				backgroundColor: outer.settings.flagPoleColor,
				top: flagPos,
				position: "absolute"
			}).addClass(outer.settings.flagPoleClass);
			
			outer.$profileContainer.append($flag);
			outer.$profileContainer.append($flagPole);
		});
	},
	
	_buildTicks : function(stepSize, maxVal) {
		var ticks = [];
		
		//prevent endless loop on emtpy resource
		if (stepSize == 0) {
			return ticks;
		}
		
		for (var i=0;i*stepSize<=maxVal;i++) {
			ticks.push(Math.floor(i*stepSize*10)/10 + "km");
		}

		return ticks;
	},
	
	getAltitudeProfileData : function(resource) {				
		
		var lineData = [];
		var areaData = [];
		
		var chartPolylines = [];
		var pointCounter = 0;
		var lineColors = [];
		
		var pointLabels = [];
		
		var minAltitude = 12000;
		var maxAltitude = 0;
		
		var distances = [];
		var totalLength = 0;
		
		var dist = 0;
		var flatPoints = [];
		
		var outer = this;
		
		resource.getLinkedPois();
		
		jQuery.each(resource.getGeoObjects(), function(idx, geoObject) {
			if (geoObject.getType() == nefos.GeoObject.TYPE_LINESTRING) {
				lineData.push([]);
				pointLabels.push([]);
				
				chartPolylines.push(geoObject);
								
				var legHeight = 0;
				var legLength = 0;
							
				jQuery.each(geoObject.points, function(pointIdx, point) {
					var flatAltitude = point.altitude();
					var div = 1;
					
					//New flatten 
					for (var i=-outer.settings.smoothFactor;i<outer.settings.smoothFactor;i++) {
						var geoObjectIdx = pointIdx + i;
						var flatIdx = flatPoints.length + i;
						
						if (i < 0) {
							if (flatIdx >= 0) {
								flatAltitude += flatPoints[flatIdx].altitude();
								div++;
							}
						}
						else if (i > 0) {
							if (geoObjectIdx < geoObject.points.length-1) {
								flatAltitude += geoObject.points[geoObjectIdx].altitude();
								div++;
							}
						}
					}
					
					flatAltitude = flatAltitude / div;
					
					if(pointIdx > 0){
						distances.push(point.distance(geoObject.points[pointIdx-1]));
						legLength += distances[distances.length-1];
						
						if(areaData[areaData.length-1] < flatAltitude){
							legHeight += flatAltitude - areaData[areaData.length-1];
						}
					}
					
					areaData.push(flatAltitude);
					flatPoints.push(point);
					lineData[lineData.length-1].push(flatAltitude);
					
					pointLabels[pointLabels.length-1].push(null);
					
					minAltitude = Math.min(minAltitude, flatAltitude);
					maxAltitude = Math.max(maxAltitude, flatAltitude);

					pointCounter++;
				});
				
				if (geoObject.linkedPois) {
					jQuery.each(geoObject.linkedPois, function(idx, mapping) {
						var pointLabel = {
								flagPosition : outer.settings.flagPosition
						};
						jQuery.extend(pointLabel, mapping);
						pointLabels[pointLabels.length-1][mapping.pointIdx] = pointLabel;
					});
				}
				
				geoObject.length = Math.floor(legLength/100)/10;
				totalLength += legLength;
				geoObject.height = Math.floor(legHeight);
				dist += geoObject.getLength();
				
				lineColors.push(geoObject.settings.strokeColor);
				pointCounter--; //decrement point counter, so that last point of first route == first point of next route
			}
						
		});
		
		return {
			chartPolylines: chartPolylines, //needed for mousemove event
			flatPoints: flatPoints,			//mousemove event
			pointLabels: pointLabels,		//legend labels
			resource: resource,		
			maxDist: dist,
			minAltitude: minAltitude,
			maxAltitude: maxAltitude,
			lineData: lineData,
			areaData: areaData,
			lineColors: lineColors,
			totalLength: totalLength,
			distances: distances
		};
	}

});


/*
 * get the number of days in this month
 */
Date.prototype.daysInMonth = function() {
    return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate();
};

/*
 * days between the two dates
 */
Date.prototype.diffInDays = function(compareTo){
	var one_day = 1000*60*60*24;
	return (this.getTime()-compareTo.getTime())/one_day;
};

/*
 * adds days to date
 */
Date.prototype.addDays = function(days){
	var date = new Date();
	date.setMonth(this.getMonth());
	date.setDate(this.getDate()+days);
	return new Date(date);
};

Date.prototype.getRepetitionInDays = function(repeat){
	if(repeat == 1){
		return 1;
	}
	else if(repeat == 2){
		return 7;
	}
	else if(repeat == 3){
		return this.daysInMonth();
	}
};

/*
 * Examples
 * 
Mask	Example
ddd mmm dd yyyy HH:MM:ss	Sat Jun 09 2007 17:46:21
m/d/yy	6/9/07
mmm d, yyyy	Jun 9, 2007
mmmm d, yyyy	June 9, 2007
dddd, mmmm d, yyyy	Saturday, June 9, 2007
h:MM TT	5:46 PM
h:MM:ss TT	5:46:21 PM
h:MM:ss TT Z	5:46:21 PM EST
yyyy-mm-dd	2007-06-09
HH:MM:ss	17:46:21
yyyy-mm-dd'T'HH:MM:ss	2007-06-09T17:46:21
UTC:yyyy-mm-dd'T'HH:MM:ss'Z'	2007-06-09T22:46:21Z
*/
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc, locale) {
		var dF = dateFormat;

		if(!locale){
			locale = "de";
		}
		
		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		if (isNaN(date)){
			return "";
		}

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n[locale].dayNames[D],
				dddd: dF.i18n[locale].dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n[locale].monthNames[m],
				mmmm: dF.i18n[locale].monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

dateFormat.i18n = {
	de: {dayNames: [
		"So ", "Mo ", "Di ", "Mi ", "Do ", "Fr ", "Sa ",
		"Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"
	],
	monthNames: [
		"Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
		"Jänner", "Feber", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
	]},
	en: {dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]}
};

window["nefos"] = window["nefos"] ? window["nefos"] : {};

nefos.dateUtils = {
	GetRepeatAsText : function(resource){
		if(!resource.content.repeat || resource.content.repeat == 0){
			return nefos._('noRepeat');
		}
		else if(resource.content.repeat == 1){
			return nefos._('repeatPerDay');
		}
		else if(resource.content.repeat == 2){
			return nefos._('repeatPerWeek');
		}
		else if(resource.content.repeat == 3){
			return nefos._('repeatPerMonth');
		}
	},
	
	GetNextDate : function(resource){
		var currentDate = new Date();
		var tempDate = new Date(resource.content.date);
		
		while(tempDate < currentDate){
			tempDate = tempDate.addDays(tempDate.getRepetitionInDays(resource.content.repeat));
		}
		
		if(resource.content.endRepeat){
			if(tempDate > resource.content.endRepeat){
				return null;
			}
		}
		return tempDate;
	}
};

nefos.ImageGallery = nefos.EventEmitter.extend({
	init : function(container, images, settings) {
		var outer = this;
		this._super(settings);
		
		if (nefos.IsArray(images)) {
			this.images = [];
			$.each(images, function(idx, img) {
				outer.images.push(img);
			});
		}
		else {
			this.images = [];
			for (var key in images) {
				this.images.push(images[key]);
			}
		}
		
		this.$container = container;
	
		this.settings.imageFunction = this.settings.imageFunction || function(img) { return img;};
		this.settings.loadInitial = this.settings.loadInitial || 8;
		this.settings.animation = this.settings.animation || "blend";
		this.settings.fullImageSize = this.settings.fullImageSize || "medium";
		this.settings.animationInterval = this.settings.animationInterval || 1500;
		this.settings.blendDuration = this.settings.blendDuration || this.settings.animationInterval * 3;
		this.settings.noShiftingAnimation = this.settings.noShiftingAnimation || false;
		this.settings.$parentContainer = this.settings.parentContainer || $("body");
		
		//Passthroughs for Popup
		this.settings.maxHeight = this.settings.maxHeight || false;
		this.settings.maxWidth = this.settings.maxWidth || false;
		this.settings.dimBackground = (this.settings.dimBackground === undefined ? true : this.settings.dimBackground);
		
		this.start = 0;
		this.offset = 0;

		this.loadInProgress = 0;
		this.animationCounter = 0;
		
		this.marginLeft = 0;
		this.animTicker = null;
        this.loadingInProgress = false;
		
		this._createGallery();
		this._initGallery();
		
		this.visibleIndex = -1;
	},
	
	_createGallery : function() {
		var outer = this;
			
		this.$overflowContainer = $("<div class='nefos-imageGalleryOverflow'></div>");
		this.$imgContainer = $("<div class='nefos-imageGalleryImageContainer'></div>");
		
		this.$imgContainer.bind("click", "img", function(event) {
			var $this = $(event.target);
			var idxStr = $this.attr("id");
			if (!idxStr) {
				return;
			}
			var idx = idxStr.substring(idxStr.lastIndexOf("-") + 1, idxStr.length);
			outer.emitEvent("imageClick", idx);
		});
		
		this.availWidth = this.$container.width();
		this.$overflowContainer.append(this.$imgContainer);
			
		//Flickering prevention
		if (this.settings.noShiftingAnimation) {
			this.$overflowContainer.css({
				width: this.availWidth - 20,
				position: "absolute",
				left: "10px",
				height: "111px" //TODO Make this configurable or auto detectable...
			});
		}
				
		this.$container.append(this.$overflowContainer);
		
	},
	
	_initGallery : function() {
		var outer = this;
				
		this.offset = this.settings.loadInitial;
		
		this._loadImages();
		this.startAnimation();
	},
	
	_loadImages : function() {
		var outer = this;

        if (this.offset > this.images.length) {
			this.offset = this.images.length;
		}
		
		this.loadInProgress = this.offset - this.start;
		
		var $img;
		var $outer;
		for (var i=this.start;i<this.offset;i++) {
			//nefos.L("ig", "creating image", i, " start ", this.start, " offset ", this.offset);
			$img = this._createImg(this.images[i].src, i);
            $outer = $("<div class='nefos-imageGalleryItem'></div>").append($img).append("<div class='nefos-imageGalleryEnlargeIcon'></div>");
            
            this.$imgContainer.append($outer);
		}
	},
	
	_createImg : function(src, idx) {
		var outer = this;
		
		var $img = $("<img id='nefos-imageGalleryImage-" + idx + "'></img>");
		$img.bind("load error", function() {
			outer.imageLoad($img);
		});

		$img.attr("src", this.settings.imageFunction(src, "thumbnail"));
		
		return $img;
	},
	
	_animationStep : function() {
		var outer = this;
		if (this.loadInProgress <= 0) {
            if ((this.animationCounter * this.settings.animationInterval) < this.settings.blendDuration) {
				this.animationCounter++;
				return;
			}
			
			this.availWidth = this.$container.width();
			
			this.animationCounter = 0;
			
			var diff = this.offset - this.start;
			this.start = this.offset;
			this.offset = this.start + diff;
			
			var visibleWidth = 0;
			var endReached = true; 			
			var newIndex = this.visibleIndex;
						
			this._loadImages();
			
			if (this.settings.noShiftingAnimation) {				
				var loop = function() {
					var $img;
					var imgWidth;
					outer.$imgContainer.find("img").each(function(idx) {
						$img = $(this);
						imgWidth = $img.width() + nefos.CssInt($img,"paddingRight") + nefos.CssInt($img, "marginRight");
						
						if (idx > outer.visibleIndex) {
							if ((visibleWidth + imgWidth) > (outer.availWidth)) { //left is negative!
								//newLeft = -visibleWidth;
								endReached = false;
								//nefos.L("ig","ending: " + idx," total ",  outer.$imgContainer.find("img").length, "length", outer.images.length);
								return false;
							}
							else {
								visibleWidth += imgWidth;
								$img.fadeIn();
								newIndex++;
							}
						}
						else {
							$img.fadeOut();
						}
					});
				};
				
				loop();
				if (endReached) {
					this.visibleIndex = -1;
					visibleWidth = 0;
					endReached = true; 			
					newIndex = this.visibleIndex;
					
					loop();
				}
				else {
					this.visibleIndex = newIndex;
				}
				
			}
			else {
				var left = nefos.CssInt(this.$imgContainer,"marginLeft");
				var newLeft = (left - this.availWidth);
				var temp = this.availWidth + Math.abs(left);
				
				var $img;
				var imgWidth;
				this.$imgContainer.find("img").each(function(idx) {
					$img = $(this);
					
					if (!outer.imgSpacing) {
						outer.imgSpacing = nefos.CssInt($img,"paddingRight") + nefos.CssInt($img, "marginRight");
					}
					
					imgWidth = $img.width() + outer.imgSpacing;
									
					if ((visibleWidth + imgWidth) > temp) { //left is negative!
						newLeft = -visibleWidth;
						endReached = false;
						//nefos.L("ig","ending: " + idx," total ",  outer.$imgContainer.find("img").length, "length", outer.images.length);
						return false;
					}
					else {
						visibleWidth += imgWidth;
					}
				});
				
				if (endReached) {
					newLeft = 0;
				}
				
				this.$imgContainer.animate({"marginLeft" : newLeft + "px"}, 1000, "swing");

			}
		}
	},
		
	stopAnimation : function() {
		try {
			window.clearInterval(this.animTicker);
		}
		catch(e) {};		
	},
	
	startAnimation : function() {
		var outer = this;
				
		this.animTicker = window.setInterval(function() {
			outer._animationStep();
		}, 1500);	
	},
	
	destroy : function() {
		//this.$detailContainer.remove();
		this._super();
		if (this.$closeIcon) {
			this.$closeIcon.remove();
		}
		this.stopAnimation();		
	},
	
	imageLoad : function($img) {
		this.loadInProgress--;
        $img.parent().show();
        this.emitEvent("imageLoad", $img);
	},
	
	onImageClick : function(index) {
		var outer = this;

        if (this.loadingInProgress) {
            return;
        }
		
		this.stopAnimation();
		this.emitEvent("beforeImageLoad");
		var detailSrc = this.settings.imageFunction(this.images[index].src, this.settings.fullImageSize);
        this.loadingInProgress = true;
        
        var popup = new PopupWindow(detailSrc, {
        	maxWidth: outer.settings.maxWidth,
        	maxHeight: outer.settings.maxHeight,
        	onLoad : function(obj, success) {
        		outer.loadingInProgress = false;
        		outer.emitEvent("imageDetailLoad");
        	},
        	onClose : function() {
        		outer.startAnimation();
        	},
        	title: outer.images[index].teaser,
        	author: outer.images[index].author,
        	dimBackground: outer.settings.dimBackground,
        	parentContainer: outer.$parentContainer
        });
	}
});

(function() {
    var myGlobals = {
        categoryIds : {},

        altitudeProfileOptions : {
            flagPoleColor: "#999999",
            crosshairColor : "#800000",
            crosshairWidth: "2px",
            legendHeight: 1,
            marginWidth: 15
        },
        
        menuLoadingIcon : "http://www.mapservices.eu/nefos/static/img/mapIcons/zaz/loading.gif",
        popupLoadingIcon : "http://www.mapservices.eu/nefos/static/img/loading.gif"
    };

    nefos.InitGlobals(myGlobals);
    nefos.PageInstance = null;
})();

nefos.Page = nefos.EventEmitter.extend({
	init : function(settings) {
		this._super(settings);
		
		//This is needed for IE, prevent caching of AJAX request
		$.ajaxSetup( {
			beforeSend : function(request) {
				request.setRequestHeader("Pragma", "no-cache");
				request.setRequestHeader("Cache-Control", "must-revalidate");
				request.setRequestHeader("If-Modified-Since", document.lastModified);
				request.setRequestHeader("Content-Type","application/x-json; charset:utf-8"); 
			}
		});

		this.apiKey = nefos.Globals.apiKey;
		
		var urlVars = nefos.getUrlVars();

		//dynamic positioning of map
		var lat = urlVars["lat"];
		var lng = urlVars["lng"];
		var center = null;
		if(lat && lng){
			center = new nefos.LatLng(lat,lng);
		}
		this.settings.mapCenter = center || nefos.Globals.mapCenter;
		this.settings.mapZoomLevel = urlVars["zoom"] || nefos.Globals.mapZoomLevel;

		//foreign resources can be an array or simple resource
		var fids = urlVars["fid"];
		var foreignResources = null;
		if(fids){
			foreignResources = fids;
		}
		else{
			foreignResources = urlVars["foreignResource"];
		}
		this.settings.loadForeignResource = foreignResources || false;
		
		this.settings.loadCategory = this.settings.loadCategory || urlVars["type"] || null;
		this.settings.loadResource = this.settings.loadResource || urlVars["resource"] || null;
		this.settings.cacheMethod = this.settings.cacheMethod || nefos.CACHE_TYPE_SIMPLE;
		this.settings.mapType = urlVars["mapType"] || null;
		this.settings.requestHost = this.settings.requestHost || null;
		this.settings.requestBasePath = this.settings.requestBasePath || null;
		this.settings.addCategoryCb = this.settings.addCategoryCb || function(category) { return true;};
		
		if (this.settings.language && !nefos.Lang.language) {
			nefos.Lang.language = this.settings.language;
		}
		
		this.connectionOnline = this.settings.connectionOnline || false;
		this.selectedCategories = [];
		
		this.categories = [];
		this.catOrderIdx = {};
		
		this.watchlist = [];
		this.searchResults = [];
		this.checkLoop = null;
		
		/** Mobile attributes */
		this.portraitHeight = null;
		this.landscapeHeight = null;
		this.orientation = null;
		this.scrollOffset = null;
        this.windowHash = null;
        this.userLocation = null;
        this.userPositionHighAccuracy = true;
		
        this.initTarget();
		this.initDataService();
		this.initMapTypeSwitcher();
				
		nefos.PageInstance = this;
	},
	
	initTarget : function() {
		if (this.$target) {
			return;
		}
        //if no container is specified (for injected map), use body
        if(!this.settings.target){
        	this.$target = $('body');
        }
        else {
        	this.$target = $(this.settings.target);
        }
	},
	
	initDataService : function(cb) {
		var outer = this;
		
		this.dataService = new nefos.DataService({
			requestPath : this.getFullRequestPath(),
			apiKey : this.apiKey,
			cacheMethod : this.settings.cacheMethod,
			parallelRequests : nefos.Globals.dataService.parallelRequests
		});
		
		this.dataService.addEventListener('cacheReady', function(){
			outer.loadMandatorConfig();
		});
		
		this.dataService.initCache();
	},
	
	//get mapIcon of resource, if not on map (eg in search) then return category image
	getMapIcon : function(resource){
		if(resource.geoObjects[0]){
			if(resource.geoObjects[0].settings.startMarker){
				return this.getNativeAppResource(resource.geoObjects[0].settings.startMarker.settings.icon.image);
			}
			else if(resource.geoObjects[0].settings.middleMarker){
				return this.getNativeAppResource(resource.geoObjects[0].settings.middleMarker.settings.icon.image);
			}
			else if(resource.geoObjects[0].settings.endMarker){
				return this.getNativeAppResource(resource.geoObjects[0].settings.endMarker.settings.icon.image);
			}
			else if(resource.geoObjects[0].settings.centerMarker){
				return this.getNativeAppResource(resource.geoObjects[0].settings.centerMarker.settings.icon.image);
			}
			else{
				if(resource.geoObjects[0].settings.icon){
					//its a poi
					return this.getNativeAppResource(resource.geoObjects[0].settings.icon.image);
				}
			}
		}
		
		//its eighter a polygon, or a searchObject without geoObject
		if(resource.content.categories){
			return this.getNativeAppResource(this.categories[resource.content.categories[0]].icon);
		}
	
		//welcome item?
		if(resource.content.icon){
			return resource.content.icon;
		}
	},
	
	getFullRequestPath : function(){
		if(this.settings.requestHost && this.settings.requestBasePath){
			return "http://" + this.settings.requestHost + "/" + this.settings.requestBasePath;
		}
		return nefos.GetBasePath();
	},

	getPageImage : function(image, mobile){
		if(mobile){
			return this.getFullRequestPath() + "/page/mobile/pics/" + image;
		}
		return this.getFullRequestPath() + "/page/" + (this.apiKey ? this.apiKey : nefos.Globals.apiKey) + "/pics/" + image;
	},
	
	//extract filename from link to MediumUtils.action
	getMetadataImageFilename : function(value){
		return value.split("?")[1].split("&")[3].split("=")[1];
	},
	
	//extract id from link to MediumUtils.action
	getMetadataImageId : function(value){
		return value.split("?")[1].split("&")[1].split("=")[1];
	},
	
	getNativeAppResource : function(resource){
		return resource;
	},
	
	getPageCSS : function(css) {
		return this.getFullRequestPath() + "/compiled-js/" + (this.apiKey ? this.apiKey : nefos.Globals.apiKey) + "/" + css;
	},
	
	getDomain : function(){
		if(this.settings.requestHost){
			return this.settings.requestHost;
		}
		else if(document.domain == "localhost" || document.domain.indexOf("192.168.") != -1) {
			return "www.mapservices.eu";
		}
		else{
			return document.domain;
		}
	},
	
	isLocalStorageSupported : function(){
		var test = null;
		
		try{
			test = localStorage;
			
			if(test){
				return true;
			}
		}
		catch(e){
			return false;
		}
		
		return false;
	},
	
	getUploadImage : function(image, size) {
		var imageSize = "";
		
		if (size == "medium") {
			imageSize = "medium/";
		}
		else if (size == "thumbnail" || size) {
			imageSize = "thumbnail/";
		}
		else if (size === undefined || size ===  false) {
			imageSize = "";
		}
		
		
		return "http://" + this.getDomain() + "/nefos/site-files/" + nefos.Globals.mandatorId + '/uploads/' + imageSize + image;
	},
	
	getHutCategoryId : function(){
		for(id in this.categories){
			if(this.categories[id].name == 'Hütte' || this.categories[id].name == 'Hut'){
				return this.categories[id].id;
			}
		}
		return null;
	},
	
	getWeatherImage : function(weatherCode){
		return this.getPageImage(nefos.Globals.weatherCodeMapping[weatherCode], true);
	},
	
	toggleInfo : function(){
		$('#nefos-siteDescription').toggle();
	},
	
	getHomepageCategoryId : function(){
		for(id in this.categories){
			if(this.categories[id].name == 'Homepage'){
				return this.categories[id].id;
			}
		}
		return null;
	},
	
	getEventCategoryId : function(){
		for(id in this.categories){
			if(this.categories[id].exportName == 'events'){
				return this.categories[id].id;
			}
		}
		return null;
	},
	
	getCategoryByExportName : function(name){
		for(id in this.categories){
			if(this.categories[id].exportName == name){
				return this.categories[id];
			}
		}
		return null;
	},
	
	getCategoryIdByExportName : function(name){
		for(id in this.categories){
			if(this.categories[id].exportName == name){
				return parseInt(id);
			}
		}
		return null;
	},
	
	getCategoryIdByName : function(name){
		for(id in this.categories){
			if(this.categories[id].name == name){
				return parseInt(id);
			}
		}
		return null;
	},
	
	getCategoryById : function(id) {
		return this.categories[id];
	},
	
	getParentCategory : function(cat) {
		if (typeof(cat) == 'string' || cat instanceof String) {
			cat = this.categories[cat];
		}
		
		if (cat.choppedOrderNr.length <= 5) {
			return null;
		}
		else {
			return this.categories[this.catOrderIdx[cat.choppedOrderNr.substring(0, cat.choppedOrderNr.length-2)]];
		}
	},
	
	getParentOrderNr : function(choppedOrderNr) {
		if (choppedOrderNr <= 5) {
			return null;
		}
		else {
			return choppedOrderNr.substring(0, choppedOrderNr.length-2);
		}
	},
	
	getMainOrderNr : function(choppedOrderNr) {
		if (choppedOrderNr <= 5) {
			return choppedOrderNr;
		}
		else {
			return choppedOrderNr.substring(0, 5);
		}
	},

	getLoadFullResources : function(){
		var categories = [];
		
		for(id in this.categories){
			if(this.categories[id].loadCompleteResources == true){
				categories.push(this.categories[id].id);
			}
		}
		return categories;
	},
		
	setResourceObjectType : function(res) {
		if (res.completeObjectType) {
			return;
		}
		res.completeObjectType = this.objectTypes[this.objectTypesIdx[res.content.objectType.id]];
	},
		
	//start generation of a file, show progress
	startDownload : function(path, reportId){
		var outer = this;
		var alreadyDownloaded = false;
		var progress = 0;
		var maxProgress = 400;
		
		this.showProgressContainer(outer.getFullRequestPath() + '/frontend/Guide.action?Download=action&reportId=' + reportId + '&apiKey=' + outer.apiKey);
		
		statusUpdateCallback = function(){
			var random = Math.floor(Math.random() * 10000);
			$.ajax({
			  	url: outer.getFullRequestPath() + '/frontend/Guide.action?UpdateStatusBar=action&random=' + random + '&reportId=' + reportId + '&apiKey=' + outer.apiKey,
			  	jsonp: 'jsonp_callback',
			    dataType: 'jsonp',
			    type: 'GET',
				success: function(data) {
					if(progress < maxProgress - 20){
						progress += 20;
						$('#nefos-progressBarProgress').css('width', progress + 'px');
					}
    				if(!alreadyDownloaded && data == "DOWNLOAD"){
    					alreadyDownloaded = true;
    					$('#nefos-progressBarProgress').css('width', maxProgress + 'px');
    					window.clearInterval(outer.checkLoop);
    					//$('#nefos-statusBar').html(nefos._('generationComplete'));
    					$('#nefos-progressBar').removeClass("active");
    					$('#nefos-progressButtonDownload').show();
    				}
    				if(data == "ERROR"){
    					alert(nefos._('errorOnReportCreation'));
    					outer.stopDownload();
    				}
				}
			});
		};
		
		$.ajax({
		  	url: path + '&random=' + Math.floor(Math.random() * 10000),
		  	jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
			success: function(data) {
				if(data != "GENERATE"){
					alert(nefos._('errorOnReportCreation'));
					outer.stopDownload();
				}
				
				if(!outer.checkLoop){
					outer.checkLoop = window.setInterval(function() {
						statusUpdateCallback();
			        }, 1500);
				}
			}
		});
	},
	
	//add progress container to body
	showProgressContainer : function(downloadPath){
		var outer = this;
		
		if (!$("#nefos-progressContainer").get(0)) {
			this.$target.append('<div id="nefos-progressContainer">' +
								'<div style="margin-bottom:8px;font-weight:bold;color:#333;"><div style="float:left;"><img style="width:20px;height:20px;margin-left:35px;" src="http://mapservices.eu/nefos/static/img/contwise_maps_logo.png"></div><div style="float:left;margin-left:10px;margin-top:1px;">' + nefos._('generating') + '</div><div style="clear:both;"></div></div>' +
								"<div id='nefos-progressBar' class='progress progress-success progress-striped active'><div id='nefos-progressBarProgress' class='bar' style='width: 10px;'></div></div>" + 
								//'<div id="nefos-staticBar"></div>' +
								//'<div id="nefos-statusBar"></div>' +
								'<div id="nefos-progressButtons"><input id="nefos-progressButtonDownload" type="button" value="' + nefos._('download') + '" class="btn btn-success"/><input id="nefos-progressButtonClose" type="button" value="' + nefos._('close') + '" class="btn"/><div style="clear:both;"></div></div>' +
							'</div>');
		}
		
		$('#nefos-progressButtonDownload').click(function(){
			window.location.href = downloadPath;
			outer.stopDownload();
		});
		
		$('#nefos-progressButtonClose').click(function(){
			outer.stopDownload();
		});
		
		var $progressContainer = $('#nefos-progressContainer');
		$progressContainer.css('top', this.$target.height()/2 - $progressContainer.height());
		$progressContainer.css('left', this.$target.width()/2 - $progressContainer.width()/2);
	},

	//stopping interval of polling and closing print
	stopDownload : function(){
		window.clearInterval(this.checkLoop);
		this.checkLoop = null;
		$('#nefos-progressContainer').remove();
	},
	
	//get current map type depending on date
	getMapTypeBySeason : function(){
		var defaultMapType = null;
		var winterAvailiable = false;
		var summerAvailiable = false;
		
		var outer = this;
				
		//check if winter map availiable and check default map type
		for(id in nefos.Globals.mapTypes){
			if(id == 'winter'){
				winterAvailiable = true;
			}
			if(id == 'summer'){
				summerAvailiable = true;
				defaultMapType = id;
			}
			if(!defaultMapType){
				defaultMapType = id;
			}
		}
		
		//check if properties are set in mandator config
		if(!this.mandatorConfig["winterTime"] || !this.mandatorConfig["summerTime"]){
			return defaultMapType;
		}
		
		var currentDate = new Date();
		var winterTime = new Date(currentDate.getFullYear(), this.mandatorConfig["winterTime"].split(".")[1] - 1, this.mandatorConfig["winterTime"].split(".")[0]);
		var summerTime = new Date(currentDate.getFullYear(), this.mandatorConfig["summerTime"].split(".")[1] - 1, this.mandatorConfig["summerTime"].split(".")[0]);
		
		if((currentDate >= summerTime) && (currentDate < winterTime)){
			if(summerAvailiable){
				return 'summer';
			}
			return defaultMapType;
		}
		else{
			if(winterAvailiable){
				return 'winter';
			}
			return defaultMapType;
		}
	},
	
	getResourceBounds : function(resources){
		var bounds = new nefos.LatLngBounds();
		
		for(var i=0;i<resources.length;i++){
			if(resources[i].geoObjects[0]){
				if (resources[i].geoObjects[0].type == nefos.GeoObject.TYPE_POLYLINE) {
					if(resources[i].geoObjects[0].getStartMarker() != null){
						bounds.extend(resources[i].geoObjects[0].getStartMarker().getPosition());
					}
					if(resources[i].geoObjects[0].getMiddleMarker() != null){
						bounds.extend(resources[i].geoObjects[0].getMiddleMarker().getPosition());
					}
					if(resources[i].geoObjects[0].getEndMarker() != null){
						bounds.extend(resources[i].geoObjects[0].getEndMarker().getPosition());
					}
				}
				else if (resources[i].geoObjects[0].type == nefos.GeoObject.TYPE_POLYGON) {
					if(resources[i].geoObjects[0].getCenterMarker() != null){
						bounds.extend(resources[i].geoObjects[0].getCenterMarker().getPosition());
					}
					else{
						var pos;
						var temp = resources[i].geoObjects[0].points[0];
						if(temp){
							for(var z=0;z<temp.length;z++){
								pos = temp[z];
								if(pos.lat() && pos.lng()){
									bounds.extend(pos);
								}
							}
						}
					}
				}
				else{
					var pos = resources[i].geoObjects[0].position;
					if(pos.lat() && pos.lng()){
						bounds.extend(pos);
					}
				}
			}
		}
		
		return bounds;
	},
	
	getCheckRemoveResCb : function(selectedResource) {
		var outer = this;
		
		return function(resource) {
			if(selectedResource == resource.id){
				return false;
			}
			
			//Special leg resources
			if (!resource.content.categories) {
				return false;
			}
			
			//resource in watchlist
			if(nefos.containsResource(resource, outer.watchlist)){
				return false;
			}

			//category selected
			for (var i=0;i<outer.selectedCategories.length;i++) {
				if (resource.inCategory(outer.selectedCategories[i])) {
					return false;
				}
			}

			return true;
		};
	},
	
	updateResources : function(selectedResource) {
		var outer = this;

		this.map.removeResourceCb(this.getCheckRemoveResCb(selectedResource));

		if(this.dataService.cache.getCacheType() == nefos.CACHE_TYPE_SIMPLE){
			this.dataService.clearCache();  //clear cache, because we remove some resources from the map, those need to be reloaded.
		}

		if (this.mapCluster) {
			this.mapCluster.resetAndCluster(true);
		}
	},
	
	panToResource : function(resource, zoomLevel){
		this.map.panToResource(resource, zoomLevel);
	},
	
	/**
	 * @param resources Array of resources to order
	 * Order resources ascending by name (alphabetically)
	 */
	_orderResByName : function(resources){
		resources.sort(function(a,b) {
			if(a.content.name == null){
				return -1;
			}
			if(b.content.name == null){
				return 1;
			}
			if(a.content.name.toLowerCase() > b.content.name.toLowerCase()){
				return 1;
			}
			else if(a.content.name.toLowerCase() < b.content.name.toLowerCase()){
				return -1;
			}
			return 0;
		});
	},
	
	//order resources by distance to latLng
	orderResByDistance : function(resources, latLng){
		var outer = this;
		
		resources.sort(function(a,b) {
			if(outer.distanceTo(a, latLng) > outer.distanceTo(b, latLng)){
				return 1;
			}
			else if(outer.distanceTo(a, latLng) < outer.distanceTo(b, latLng)){
				return -1;
			}
			return 0;
		});
	},
	
	isEventCategory : function(id){
		if(id == this.getCategoryIdByExportName("events")){
			return true;
		}
		else{
			return false;
		}
	},
	
	distanceTo : function(resource, latLng){
		if(resource.geoObjects && resource.geoObjects.length > 0){
			if(resource.geoObjects[0].points && resource.geoObjects[0].points.length > 0){
				return resource.geoObjects[0].points[0].distance(latLng);
			}
			if(resource.geoObjects[0].position){
				return resource.geoObjects[0].position.distance(latLng);
			}
		}
		return 999999999;
	},
	
	//order resources by distance, return map
	mapResByDistance : function(resources, latLng){
		var ordered = {};
		var keys = [];
		var result = [];
		var group;
		
		var groupByDist = function(dist){
			if(dist < 500){
				return "Entfernung < 500m";
			}
			else if(dist < 1000){
				return "Entfernung < 1km";
			}
			else if(dist < 5000){
				return "Entfernung < 5km";
			}
			if(dist < 10000){
				return "Entfernung < 10km";
			}
			else{
				return "Entfernung > 10km";
			}
		};
		
		for(var i=0;i<resources.length;i++){
			group = groupByDist(this.distanceTo(resources[i],latLng));
			if(!ordered[group]){
				ordered[group] = [];
				keys.push(group);
			}
			ordered[group].push(resources[i]);
			resources[i].listIndex = i;	//Hack vor original index in list (overview resources events) [FF]
		}
		
		if(ordered["Entfernung < 500m"]) result.push({group: "Entfernung < 500m", resources: ordered["Entfernung < 500m"]});
		if(ordered["Entfernung < 1km"]) result.push({group: "Entfernung < 1km", resources: ordered["Entfernung < 1km"]});
		if(ordered["Entfernung < 5km"]) result.push({group: "Entfernung < 5km", resources: ordered["Entfernung < 5km"]});
		if(ordered["Entfernung < 10km"]) result.push({group: "Entfernung < 10km", resources: ordered["Entfernung < 10km"]});
		if(ordered["Entfernung > 10km"]) result.push({group: "Entfernung > 10km", resources: ordered["Entfernung > 10km"]});
		
		return result;
	},
	
	//order resources by date, return map
	mapResByDate : function(resources, selection, format){
		var ordered = {};
		var keys = [];
		var result = [];
		var group;
		
		for(var day=0;day<selection.high.diffInDays(selection.low);day++){ //var date = selection.low; date <= selection.high; date.addDays(1)
			var date = selection.low.addDays(day);
			group = date.format(format);
			
			if(!ordered[group]){
				ordered[group] = [];
				keys.push({groupName: group, groupDate: date});
			}
			
			for(var i=0;i<resources.length;i++){
				this.setResourceObjectType(resources[i]);	//needed for new ui [FF]
				if(resources[i].content.repetitions[day] == 1){
					ordered[group].push(resources[i]);
					resources[i].listIndex = i;
				}
			}
		}
		
		for(var i=0;i<keys.length;i++){
			if(ordered[keys[i].groupName].length > 0){
				result.push({
					group: keys[i].groupName,
					date: keys[i].groupDate,
					resources: ordered[keys[i].groupName]
				});
			}
		}
		
		return result;
	},
	
	//show Overview by special property
	mapResByProperty : function(resources){
		var ordered = {};
		var keys = [];
		var result = [];
		var groups = [];
		
		for(var i=0;i<resources.length;i++){
			this.setResourceObjectType(resources[i]);	//needed for new ui [FF]
			
			if(resources[i].content.groupingField){
				groups = resources[i].content.groupingField.split("|");
			}
			
			for(index in groups){
				if(!ordered[groups[index]]) {
					ordered[groups[index]] = [];
					keys.push(groups[index]);
				}
				
				if(!nefos.containsResource(resources[i], ordered[groups[index]])){
					ordered[groups[index]].push(resources[i]);
				}
			}
			resources[i].listIndex = i;	//Hack vor original index in list (overview resources events) [FF]
		}
		keys.sort();
		
		for(var i=0;i<keys.length;i++){
			result.push({
				group: keys[i],
				resources: ordered[keys[i]]
			});
		}
		
		if (result.length == 0) {
			result.push({
				group: "    ",
				resources: resources
			});
		}
		
		return result;
	},
	
	//order resources by last subcategory, return map
	mapResByCategory : function(resources, parentCategoryId, parentName){
		var ordered = {};
		var keys = [];
		var result = [];
		var categories;
		var parentCategory = (parentCategoryId ? this.categories[parentCategoryId] : null);
		
		for(var i=0;i<resources.length;i++){
			this.setResourceObjectType(resources[i]);	//needed for new ui [FF]
			categories = resources[i].content.categories;
			
			if (parentCategory) {
				for (var j=0;j<categories.length;j++) {
					var cat = this.categories[categories[j]];
					
					if ((cat.orderNr == parentCategory.orderNr || (("" + cat.orderNr).indexOf(parentCategory.choppedOrderNr) == -1))) {
						continue;
					}
					
					if(!ordered[cat.name]) {
						ordered[cat.name] = [];
						keys.push(cat.name);
					}
					
					ordered[cat.name].push(resources[i]);
				}
			}
			else {
				if(categories && this.categories[categories[categories.length-1]]){
					if(parentName){
						if(!ordered[parentName + " > " + this.categories[categories[categories.length-1]].name]){
							ordered[parentName + " > " + this.categories[categories[categories.length-1]].name] = [];
							keys.push(parentName + " > " + this.categories[categories[categories.length-1]].name);
						}
						ordered[parentName + " > " + this.categories[categories[categories.length-1]].name].push(resources[i]);
					}
					else{
						if(!ordered[this.categories[categories[categories.length-1]].name]){
							ordered[this.categories[categories[categories.length-1]].name] = [];
							keys.push(this.categories[categories[categories.length-1]].name);
						}
						ordered[this.categories[categories[categories.length-1]].name].push(resources[i]);
					}
				}
				else{
					if(!ordered[""]){
						ordered[""] = [];
						keys.push("");
					}
					ordered[""].push(resources[i]);
				}
			}
			resources[i].listIndex = i;	//Hack vor original index in list (overview resources events) [FF]
		}
		keys.sort();
		
		for(var i=0;i<keys.length;i++){
			result.push({
				group: keys[i],
				resources: ordered[keys[i]]
			});
		}
		
		if (result.length == 0) {
			result.push({
				group: "    ",
				resources: resources
			});
		}
		
		return result;
	},
	
	getResourceLatLng : function(resource){
		if(resource.geoObjects[0]){
			if(resource.geoObjects[0].position != null){
				return resource.geoObjects[0].position;
			}
			else{
				if(resource.geoObjects[0].settings.startMarker){
					return resource.geoObjects[0].settings.startMarker.getPosition();
				}
				else if(resource.geoObjects[0].settings.centerMarker){
					return resource.geoObjects[0].settings.centerMarker.getPosition();
				}
				else if(resource.geoObjects[0].points[0]){
					return resource.geoObjects[0].points[0];
				}
			}
		}
		return null;
	},
	
	showHighlight : function(resource){
		if(resource.geoObjects[0]){
			if(resource.geoObjects[0].position != null){
				this.map._setHighlight(resource, resource.geoObjects[0]);
			}
			else{
				if(resource.geoObjects[0].settings.startMarker){
					this.map._setHighlight(resource, resource.geoObjects[0].settings.startMarker);
				}
				else if(resource.geoObjects[0].settings.centerMarker){
					this.map._setHighlight(resource, resource.geoObjects[0].settings.centerMarker);
				}
			}
		}
	},
	
	getValue : function(val, returnEmpty){
		if(typeof val != "undefined" && val != null){
			return val;
		}
		if(returnEmpty){
			return "";
		}
		return "?";
	},
	
	//check position of category in tree
	getCategoryType : function(categories, index){
		var orderNr = categories[index].orderNr;
		var nextOrderNr = null;
		
		if(index < categories.length-1){
			nextOrderNr = categories[index+1].orderNr;
		}
			
		//category has to be a root child
		if(orderNr % nefos.categoryRootOrderNr == 0){
			//next category is also root, so category has to be a main without childs
			if((nextOrderNr == null) || (nextOrderNr % nefos.categoryRootOrderNr == 0)){
				return 'main';
			}
			else{
				return 'parent';
			}
		}
		
		return 'sub';
	},
	
	//order categories for menu by ordernr asc and return as array
	getOrderedCategories : function(type){
		var allCat = nefos.objectToArray(this.categories);
		var categories = [];
		var temp;
			
		//only copy menu item categories
		for(var i=0;i<allCat.length;i++){
			//TODO: type should be a propery of the layer.
			if((type == 'summer' || type == 'satellite' || type == 'alpenwelt') && allCat[i]['displayInSummer'] == true){
				if(this.settings.addCategoryCb(allCat[i])){
					categories.push(allCat[i]);
				}
			}
			else if(type.match(/winter$/) && allCat[i]['displayInWinter'] == true){
				if(this.settings.addCategoryCb(allCat[i])){
					categories.push(allCat[i]);
				}
			}
			else if(type == 'mobile' && allCat[i]['displayInMobile'] == true){
				if(this.settings.addCategoryCb(allCat[i])){
					categories.push(allCat[i]);
				}
			}
		}
		
		categories.sort(function(a,b) { 
			if (a.orderNr > b.orderNr) {
				return 1;
			}
			else if (a.orderNr < b.orderNr) {
				return -1;
			}
			return 0;
		});
		
		return categories;
	},
	
	loadMandatorConfig : function() {
		var outer = this;
		
		this.dataService.loadMandatorConfig({}, function(data) {
			outer.emitEvent("mandatorConfigLoad", data);
		});
		
		this.dataService.loadResourceCategories({language: nefos.Lang.language}, function(data){
			outer.categories = data;
			for (var key in outer.categories) {
				outer.catOrderIdx[outer.categories[key].choppedOrderNr] = key;
			}
			
			outer.emitEvent("categoriesLoad");
		});
		
		this.dataService.loadObjectTypes({language: nefos.Lang.language}, function(data){
			outer.objectTypes = data;
			outer.objectTypesIdx = {};
			for (var i=0;i<outer.objectTypes.length;i++) {
				outer.objectTypesIdx["" + outer.objectTypes[i].settings.id] = i;
			}
			outer.emitEvent("objectTypesLoad");
		});
	},
	
	startEventLoop : function(){
		var outer = this;
        window.setInterval(function() {
        	if (outer.windowHash != window.location.hash) {
                outer.emitEvent("hashChange", window.location.hash.replace(/#/i,""));
                outer.windowHash = window.location.hash;
            }
        }, 750);
	},

    setWindowHash : function(hash, preventHashEvent) {
    	preventHashEvent = preventHashEvent === undefined ? true : preventHashEvent;
    	
        var url = window.location.href.replace(/(.*?)#.*/i,"$1");
        
        hash = hash.replace("###", "#");
        hash = hash.replace("##", "#");
        
        url += "#" + hash;  
        if (preventHashEvent) {
        	this.windowHash = "#" + hash;          //Prevent onhashchanged event
        }
        
        url = url.replace("###", "#");
        url = url.replace("##", "#");
        
        window.location.href = url;
    },
	
	startWatchingUserPosition : function(firstLocateCallback) {
		var outer = this;
		firstLocateCallback = firstLocateCallback || function(){};
		
		nefos.L("page", "geolocate", this.userPositionWatchId);
		
		if (navigator.geolocation && !this.userPositionWatchId) {
			nefos.L("page", "starting geolocation");
			this.userPositionWatchId = navigator.geolocation.watchPosition(
					function(position) {
						outer.userLocation = new nefos.LatLng(position.coords.latitude, position.coords.longitude);
						outer.emitEvent("userLocate", position);
						if (outer.firstLocate) {
							outer.emitEvent("userFirstLocate", position);
							outer.firstLocate = false;
							firstLocateCallback();
						}
					},
					function(error) {
						nefos.L("page", "location error: " + error + " " + JSON.stringify(error));
						if (outer.userPositionHighAccuracy) {
							outer.userPositionHighAccuracy = false;
							outer.stopWatchingUserPosition();
							outer.startWatchingUserPosition(firstLocateCallback);
						}
						else {
							outer.emitEvent("userLocateError");
							outer.stopWatchingUserPosition();
						}
						
					},
					{
						enableHighAccuracy: this.userPositionHighAccuracy,
						maximumAge: Infinity
					}
			);
		}
		else if (this.userPositionWatchId) {
			//this.stopWatchingUserPosition();
			//we are alread watching..
		}
		else {
			this.emitEvent("userLocateNotSupported");
		}
	},
	
	stopWatchingUserPosition : function() {
		nefos.L("page", "STOPPING geolocation",this.userPositionWatchId);
		if (navigator.geolocation && this.userPositionWatchId) {
			navigator.geolocation.clearWatch(this.userPositionWatchId);
		}
		this.userPositionWatchId = null;
		this.userLocation = null;
		this.firstLocate = true;
	},
	
	createUserLocationMarker : function(latLng) {
		if (!this.userLocationMarker) {
			var outerCircle = new nefos.Circle(latLng, {
	    		fixedSize: true,
	    		radius: 13
	    	});
			
			var innerCircle = new nefos.Circle(latLng, {
				fixedSize : true,
				weight: 0,
				radius: 5,
				fillOpacity: 1,
				fillColor: "#000053"
			});
						
			this.userLocationMarker = {
					outer: outerCircle,
					inner: innerCircle
			};
			
			this.map.addRawGeoObject(outerCircle, true);
			this.map.addRawGeoObject(innerCircle, true);
		}
		else {
			this.userLocationMarker.outer.setPosition(latLng);
			this.userLocationMarker.inner.setPosition(latLng);
			
			if (this.userLocationMarker.outer.getMap() == null) {
				this.map.addRawGeoObject(this.userLocationMarker.outerCircle, true);
				this.map.addRawGeoObject(this.userLocationMarker.innerCircle, true);
			}
		}
	},
	
	hideUserLocationMarker : function() {
		if (this.userLocationMarker) {
			this.userLocationMarker.outer.removeFromMap();
			this.userLocationMarker.inner.removeFromMap();
			this.userLocationMarker = null;
		}
	},
	
	initMapTypeSwitcher : function() {
		var outer = this;
			
		$("a.nefos-mapTypeSwitch").click(function() {
			var $this = $(this);
			var id = $this.attr("id");
			
			/* remove nefos prefix from map type selection id */
			id = id.replace(/nefos-/,"");
			
			var lastMapTypeSelection = outer.map.getMapTypeName();
			
			if(id != lastMapTypeSelection){
				outer.setMapType(id);
				outer.emitEvent("mapTypeSwitch", lastMapTypeSelection, id);
			}
		});
	},
	
	initOverviewSwitcher : function() {
		var outer = this;
		
		$("#nefos-mapOverviewButton").click(function() {
			outer.overviewTooltip.moveOut();
			outer.showFullscreenOverview();
		});
	},
	
	initGlobeViewerSwitcher : function() {
		var outer = this;
		
		$("#nefos-globeViewerButton").click(function() {
			outer.emitEvent("globeViewerClick");
		});
	},

	getMap : function() {
		return this.map;
	},
	
	setMapType : function(mapType) {
		if (this.map) {
			this.map.setMapType(mapType);
		}
		$('.nefos-mapTypeSwitch').removeClass('nefos-mapTypeActive');
		$('#nefos-' + mapType).addClass('nefos-mapTypeActive');
	}
});


/**
 * Overrides some nefos Objects for easier integration with Google Maps
 */

/**
 * @returns google.maps.LatLng Object
 */
nefos.LatLng.prototype.toNative = function() {
	return new L.LatLng(this.lat(), this.lng());
};

/**
 * @returns {google.maps.LatLngBounds} Object
 */
nefos.LatLngBounds.prototype.toNative = function() {
	return new L.LatLngBounds(this.sw.toNative(), this.ne.toNative());
};

nefos.GeoObject.prototype.getGm = function() {
	return this.mapData.gmObject;
};

/**
 * Shows geoObject on Google Maps
 * @param {google.maps.Map} or {nefos.Map}
 */
nefos.GeoObject.prototype.showOnMap = function(map) {
	if (this.getMap() != null || this.mapData.nativeObject == null) {
		return;
	}
	this.mapData.nativeMap = map.nativeMap;
	map.nativeMap.addLayer(this.mapData.nativeObject);
};

/**
 * Returns Google Maps map object of this marker
 * @returns {google.maps.Map}
 */
nefos.GeoObject.prototype.getMap = function() {
	return this.mapData.nativeMap;
};

/**
 * Removes marker from google maps
 */
nefos.GeoObject.prototype.removeFromMap = function() {
	if (this.mapData.nativeMap) {
		this.mapData.nativeMap.removeLayer(this.mapData.nativeObject);
		
		/*delete this.mapData.nativeObject._icon;
		delete this.mapData.nativeObject._shadow;
		delete this.mapData.nativeObject._leaflet_id;
		delete this.mapData.nativeObject._map;
		delete this.mapData.nativeObject.dragging;
		*/
	}
	this.mapData.nativeMap = null;

};

/**
 * Shows polyline on Google Maps
 * @param {google.maps.Map} or {nefos.Map}
*/
nefos.Polyline.prototype.showOnMap = function(map) {
	/*if (this.mapData.nativeMap && !this.getPermanentLine()) {
		return;
	}*/
		
	if (!this.isLineHidden() && !this.isStub() && !this.mapData.nativeMap) {
		if(this.mapData.nativeObject){
			map.nativeMap.addLayer(this.mapData.nativeObject);
			this.setLineHidden(false);
		}
		this.mapData.nativeMap = map.nativeMap;
	}
	
	if (this.getStartMarker()) {
		this.getStartMarker().showOnMap(map);
	}
	if (this.getMiddleMarker()) {
		this.getMiddleMarker().showOnMap(map);
	}
	if (this.getEndMarker()) {
		this.getEndMarker().showOnMap(map);
	}
};

nefos.Polyline.prototype.hideLine = function(map) {
	if (this.mapData.nativeMap) {
		this.mapData.nativeMap.removeLayer(this.mapData.nativeObject);
		this.mapData.nativeMap = null;
		this.setLineHidden(true);
	}	
};


nefos.Polyline.prototype.showLine = function(map) {
	
	//no data on map defined for geoObject
	if(!this.mapData.nativeObject){
		return;
	}
	
	if (this.mapData.nativeMap == null) {
		map.nativeMap.addLayer(this.mapData.nativeObject);
		this.mapData.nativeMap = map.nativeMap;
		this.setLineHidden(false);
	}	
};

nefos.Polyline.prototype.removeFromMap = function() {
	try {
		if (this.mapData.nativeMap && !this.getPermanentLine()) {
			this.hideLine();
		}
	}
	catch (e) {
		//TODO: Currently polylines are not removed, is a leaflet bug #172
        //alert(e);
	}
	if (this.getStartMarker()) {
		this.getStartMarker().removeFromMap();
	}
	if (this.getMiddleMarker()) {
		this.getMiddleMarker().removeFromMap();
	}
	if (this.getEndMarker()) {
		this.getEndMarker().removeFromMap();
	}
};

//Fixes bug for not completly loaded polylines.
//Marker of polyline was visible, but not the line itself
//so getMap() == null, marker was neva removed. [FF]
nefos.Polyline.prototype.getMap = function() {
	if (this.mapData.nativeMap) {
		return this.mapData.nativeMap;
	}
	
	if (this.getStartMarker()) {
		return this.getStartMarker().getMap();
	}
	else if (this.getEndMarker()) {
		return this.getEndMarker().getMap();
	}
	else if (this.getMiddleMarker()) {
		return this.getMiddleMarker().getMap();
	}
	
	return null;
};

nefos.Override(nefos.Polyline.prototype, "setStyle", function(style) {
	if (this.mapData.nativeObject) {
		style["color"] = style["strokeColor"];
		this.mapData.nativeObject.setStyle(style);
	}
});
 
/**
 * TODO: Nicer mechanism for overriding methods without subclassing, it's js after all.
 * Super method.
 */
//nefos.CustomMapOverlay.prototype.superSetPosition = nefos.CustomMapOverlay.prototype.setPosition;

/**
 * Overrides nefos.Marker setPosition. Also sets position of google maps object.
 * @param latLng
 */
/*nefos.CustomMapOverlay.prototype.setPosition = function(latLng) {
	this.superSetPosition(latLng);
	if (this.mapData.nativeObject != null) {
		this.mapData.nativeObject.setLatLng(latLng.toNative());
	}
};*/

nefos.Override(nefos.CustomMapOverlay.prototype, "setPosition", function(latLng) {
	if (this.mapData.nativeObject != null) {
		this.mapData.nativeObject.setLatLng(latLng.toNative());
	}
});

//Because of fancy positioning with some magic translate, height doesn't need to be added.
nefos.CustomMapOverlay.prototype.getHeight = function() {
	return 0;
};


/**
 * TODO: Nicer mechanism for overriding methods without subclassing, it's js after all.
 * Super method.
 */
//nefos.Marker.prototype.superSetPosition = nefos.Marker.prototype.setPosition;

/**
 * Overrides nefos.Marker setPosition. Also sets position of google maps object.
 * @param latLng
 */
/*nefos.Marker.prototype.setPosition = function(latLng) {
	this.superSetPosition(latLng);
	if (this.mapData.nativeObject != null) {
		this.mapData.nativeObject.setLatLng(latLng.toNative());
	}
};
*/

nefos.Override(nefos.Marker.prototype, "setPosition", function(latLng) {
	if (this.mapData.nativeObject != null) {
		this.mapData.nativeObject.setLatLng(latLng.toNative());
	}
});

nefos.Polyline.prototype.getNativePoints = nefos.Linestring.prototype.getNativePoints = function() {
	var nativeLatLng = [];
	
	jQuery.each(this.points, function(idx, latLng) {
		nativeLatLng.push(latLng.toNative());
	});
	
	return nativeLatLng;
};

/**
 * Shows polygon on Google Maps
 * @param {google.maps.Map} or {nefos.Map}
*/
nefos.Polygon.prototype.showOnMap = function(map) {
	if (!this.isPolygonHidden() && !this.isStub() && !this.mapData.nativeMap) {
		if(this.mapData.nativeObject){
			map.nativeMap.addLayer(this.mapData.nativeObject);
			this.setPolygonHidden(false);
		}
		this.mapData.nativeMap = map.nativeMap;
	}
	
	if (this.getCenterMarker()) {
		this.getCenterMarker().showOnMap(map);
	}
};

nefos.Polygon.prototype.hidePolygon = function(map) {
	if (this.mapData.nativeMap) {
		this.mapData.nativeMap.removeLayer(this.mapData.nativeObject);
		this.mapData.nativeMap = null;
		this.setPolygonHidden(true);
	}	
};


nefos.Polygon.prototype.showPolygon = function(map) {
	
	//no data on map defined for geoObject
	if(!this.mapData.nativeObject){
		return;
	}
	
	if (this.mapData.nativeMap == null) {
		map.nativeMap.addLayer(this.mapData.nativeObject);
		this.mapData.nativeMap = map.nativeMap;
		this.setPolygonHidden(false);
	}	
};

nefos.Polygon.prototype.removeFromMap = function() {
	try {
		if (this.mapData.nativeMap && !this.getPermanentPolygon()) {
			this.hidePolygon();
		}
	}
	catch (e) {
		//TODO: Currently Polygon are not removed, is a leaflet bug #172
        //alert(e);
	}
	
	if (this.getCenterMarker()) {
		this.getCenterMarker().removeFromMap();
	}
};

nefos.Polygon.prototype.getMap = function() {
	if (this.mapData.nativeMap) {
		return this.mapData.nativeMap;
	}
	
	if (this.getCenterMarker()) {
		return this.getCenterMarker().getMap();
	}
	
	return null;
};

nefos.Polygon.prototype.getNativePoints = function() {
	var nativeLatLng = [];
	
	jQuery.each(this.points, function(idx, item) {
		var ring = [];
		jQuery.each(item, function(idx, latLng) {
			ring.push(latLng.toNative());
		});
		nativeLatLng.push(ring);
	});
	
	return nativeLatLng;
};

/**
 * TODO: Nicer mechanism for overriding methods without subclassing, it's js after all.
 * Super method.
 */
nefos.Circle.prototype.superSetPosition = nefos.Circle.prototype.setPosition;

/**
 * Overrides nefos.Circle setPosition. Also sets position of google maps object.
 * @param latLng
 */
nefos.Circle.prototype.setPosition = function(latLng) {
	this.superSetPosition(latLng);
	if (this.mapData.nativeObject != null) {
		this.mapData.nativeObject.setLatLng(latLng.toNative());
	}
};

/**
 * Leaflet wrapper class, extends nefos.Map
 */
nefos.LeafletMaps =  nefos.Map.extend({
	
	/**
	 * Construcotor
	 * @param mapContainer where to draw the map
	 * @param settings map of settings. 
	 */
	init : function(mapContainer, settings) {
		this._super(mapContainer, settings);

		this.settings.mapTypeBaserUrl = this.settings.mapTypeBaserUrl || "http://map{rnd}.mapservices.eu";
		this.currentMapType = settings.mapType;
		this.mapTypes = {};
		
		this._initOverlayWrapper();
		
		if (this.settings.autoLoad) {
			$(document).bind("ready", { context: this}, this.loadMap);
		}
		
	},
		
	/**
	 * Actually loads the google map into the container.
	 * Context aware
	 */
	loadMap : function() {
		nefos.CallInContext(this, arguments, function() {
			var context = this;
			// initialize the map on the "map" div
			this.nativeMap = new L.Map(this.$mapContainer.get(0), {
				trackResize: (this.settings.trackResize !== undefined ? this.settings.trackResize : true),
				attributionControl: (this.settings.attributionControl !== undefined ? this.settings.attributionControl : true),
				markerZoomAnimation: (this.settings.markerZoomAnimation !== undefined ? this.settings.markerZoomAnimation : false),
				zoomControl: (this.settings.zoomControl !== undefined ? this.settings.zoomControl : true),
				fadeAnimation: !(nefos.Browser.android),
				zoomAnimation: !(nefos.Browser.android),
				markerZoomAnimation: false //we don't want that! [FF]
				/*,
				No global zoom settings, always take zoom levels from layers [FF] 12.03.2012
				minZoom: this.settings.minZoom,
				maxZoom: this.settings.maxZoom
				*/
			});
			
			if (this.settings.mapType) {
				this.setMapType(this.settings.mapType);
			}
			
			this.nativeMap.setView(this.settings.center.toNative(), this.settings.zoomLevel);
			
			this.nativeMap.on("zoomend", function() {
				context.emitEvent("mapBeforeZoom");
				context.emitEvent("mapZoom");
			});
			
			this.nativeMap.on("moveend", function() {
				context.emitEvent("mapMoveEnd");
			});
				
			/*this.nativeMap.on("click", function(evt) {
				nefos.L("latlng", "new LatLng(" + evt.latlng.lat + "," + evt.latlng.lng + ");\n");
			});
			*/
			
			this.emitEvent("mapLoad");
			
		});
	},
		
	
	/**
	 * Convert google.maps.LatLngBounds to nefos.LagLngBounds
	 * @param bounds
	 * @returns {nefos.LatLngBounds}
	 */
	_fromNativeBounds : function(bounds) {
		return new nefos.LatLngBounds(
	        	new nefos.LatLng(
	            		bounds.getSouthWest().lat,
	            		bounds.getSouthWest().lng
	            ),
            	new nefos.LatLng(
            		bounds.getNorthEast().lat,
            		bounds.getNorthEast().lng
            	)
		);
		
	},
	
	_initCloudmadeType : function() {
		// create a CloudMade tile layer
		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/9a90e822e26c4fbd898a4cb634925456/997/256/{z}/{x}/{y}.png',
		    cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
		    cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
		cloudmade._prefix = "Powered by <a href='http://www.general-solutions.at'>nefos</a>";
		return cloudmade;
	},
	
	addOfflineMapType : function(key, type, storage){
		var outer = this;
		
		type.offlineMaxZoom = type.offlineMaxZoom || 18;
		type.offlineMinZoom = type.offlineMinZoom || 0;
		
		var nefosLayer = new L.TileLayer.LocalCache('', storage, {minZoom: type.offlineMinZoom, maxZoom: type.offlineMaxZoom});
	    nefosLayer.name = key;
	    
	    this.mapTypes[key] = nefosLayer;
	},
	
	addMapTypes : function(types) {
		var outer = this;
					
		for(key in types){
			types[key].maxZoom = types[key].maxZoom || 18;
			types[key].minZoom = types[key].minZoom || 0;
			
			var attribution = types[key].attribution === undefined ? 
					'Map data &copy; 2012 <b><i>tiris</i></b>,GDM, General-Solutions. 2012 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade' 
					: types[key].attribution;
			
			var createLayer = function(index){
			
				var showOSM = ((types[key].showOSM === undefined || types[key].showOSM) ? true : false);
			    var minZoom = showOSM ? 0 : types[key].minZoom;
			    var maxZoom = types[key].maxZoom;
			
			    var nefosLayer = new L.TileLayer("", {maxZoom: maxZoom, minZoom: minZoom, attribution: attribution});
			    
			    nefosLayer.minZoom = minZoom;
			    nefosLayer.maxZoom = maxZoom;
		    	nefosLayer.showOSM = showOSM;
		    
			    nefosLayer.coreBounds = types[key].coreBounds;
			    nefosLayer.polygonBounds = types[key].polygonBounds;
	            nefosLayer.boundsCheck = types[key].boundsCheck || "containsBounds";
	           
			    nefosLayer.name = key;
			    
			    //minimum zoom level of native layer
		    	nefosLayer.nativeMinZoom = types[key].nativeMinZoom || types[key].minZoom;
		    
			    nefosLayer.protocol = types[key].protocol || "http";
			    nefosLayer.emptyTile = types[key].emptyTile || "http://mapservices.eu/nefos/static/img/white_tile.jpg";
			    nefosLayer.foreignUrl = types[key].foreignUrl;
			    nefosLayer.subDomains = types[key].subDomains || [0,1,2,3,4];
			    
			    //remove attribution prefix
			    nefosLayer.attributionPrefix = types[key].attributionPrefix === undefined ? true : types[key].attributionPrefix;
			    
			    //Closure for key in closure ;-)
			    (function() {
			    	var type = key;
			    	nefosLayer.getTileUrl = function(tile) {
			    		var zz = outer.getZoomLevel();
				    	var ymax = 1 << zz;
						var y = ymax - tile.y -1;
						var sub = Math.round(tile.x + y) % (nefosLayer.subDomains.length-1);
						sub = sub || 1;
						
						var tileBounds = outer.getTileLatLngBounds(tile.x, y, zz);
									
						/*var polygon = new nefos.Marker({
							position: tileBounds.getCenter()
						}, {
							name: "tile: " + tile.x + " " + tile.y
						});
						
						outer.addRawGeoObject(polygon);
						polygon.showOnMap(outer);
						*/
						//Needs to be the first check, because of how the extension of the map types works!
						if (this.foreignUrl) {
							//http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png
							return  this.foreignUrl.replace("{s}",this.subDomains[sub]).replace("{z}",zz).replace("{x}",tile.x).replace("{y}",tile.y);
							
						}
						
						if (this.showOSM && zz < this.nativeMinZoom) {
							//return 'http://a.tile.cloudmade.com/9a90e822e26c4fbd898a4cb634925456/997/256/' + zz + '/' + tile.x + '/' + tile.y + '.png';
							return "http://otile" + sub + ".mqcdn.com/tiles/1.0.0/osm/" + zz + "/" + tile.x + "/" + tile.y + ".png";
						}
						else if (zz < this.nativeMinZoom){
							return this.emptyTile;
						}
						
						if (this.coreBounds && !this.coreBounds[this.boundsCheck](tileBounds)) {
							/* No polygonbounds needed [FF]
							 * if (this.polygonBounds) {
								if (!this.polygonBounds.contains(tileBounds.getCenter()) && this.showOSM) {
									return 'http://a.tile.cloudmade.com/9a90e822e26c4fbd898a4cb634925456/997/256/' + zz + '/' + tile.x + '/' + tile.y + '.png';
								}
								else if (!this.polygonBounds.contains(tileBounds.getCenter())) {
									return "http://mapservices.eu/nefos/static/img/white_tile.jpg";
								}
							}*/
							if (this.showOSM) {
								//return 'http://a.tile.cloudmade.com/9a90e822e26c4fbd898a4cb634925456/997/256/' + zz + '/' + tile.x + '/' + tile.y + '.png';
								return "http://otile" + sub + ".mqcdn.com/tiles/1.0.0/osm/" + zz + "/" + tile.x + "/" + tile.y + ".png";
							}
							else {
								return this.emptyTile;
							}
						}
						
						//return empty tile for placeholder mapType
						if(type == 'emptyMapType'){
							return "http://mapservices.eu/nefos/static/img/white_tile.jpg";
						}
						
						if (this.protocol == "http") {
							if(types[type].multiLayer){
								return  outer.settings.mapTypeBaserUrl.replace(/\{rnd\}/i,sub) + "/" + types[type].folderName[index] + "/" + zz + "/" + tile.x + "/" + y + "." + types[type].type[index];
							}
							return  outer.settings.mapTypeBaserUrl.replace(/\{rnd\}/i,sub) + "/" + types[type].folderName + "/" + zz + "/" + tile.x + "/" + y + "." + types[type].type;	
						}
						else {
							if(types[type].multiLayer){
								return  types[type].folderName[index] + "/" + zz + "/" + tile.x + "/" + y + "." + types[type].type[index];
							}
							return  types[type].folderName + "/" + zz + "/" + tile.x + "/" + y + "." + types[type].type;
						}
						
				    };
			    })();
			    
			    return nefosLayer;
			};
		    
		    if(types[key].multiLayer){
		    	var multiLayer = [createLayer(0), createLayer(1)];
		    	this.mapTypes[key] = multiLayer;
		    }
		    else{
		    	this.mapTypes[key] = createLayer();;
		    }
		}
	},
	
	_initNefosOverlayMapType : function(layer) {
		//http://mapservices.eu/geoserver/gwc/service/wms?mm=22 CACHED
		//http://mapservices.eu/geoserver/wms? UNCACHED
		var nefosVector = new L.TileLayer.WMS("http://mapservices.eu/geoserver/gwc/service/wms", {
		    layers: layer,
		    format: 'image/png',
		    transparent: true
		});
		return nefosVector;
	},
		
	_initOverlayWrapper : function() {
		var outer = this;
		
		nefos.LeafletOverlay = L.Class.extend({

			includes: L.Mixin.Events,

			options: {

			},

			initialize: function(overlay, options) {
				L.Util.setOptions(this, options);
				this._latlng = overlay.getPosition().toNative();
				this._overlay = overlay;
			},

			onAdd: function(map) {
				this._map = map;
				map._panes.markerPane.appendChild(this._overlay.getOverlay()[0]);
				map.on('viewreset', this._reset, this);
				this._reset();
			},

			onRemove: function(map) {
				map._panes.markerPane.removeChild(this._overlay.getOverlay()[0]);
				map.off('viewreset', this._reset, this);
			},

			getLatLng: function() {
				return this._latlng;
			},

			setLatLng: function(latlng) {
				this._latlng = latlng;
				this._reset();
			},

			_reset: function() {
				var pos = this._map.latLngToLayerPoint(this._latlng).round();
				
				//Alter position, hackish for MarkerHighlight(yes) and ClusterOverlay(no) compat.
				if (this._overlay.isCenterOverlay()) {
					var center = this._overlay.getCenter();
					pos.y -= center.y;
					pos.x -= center.x;
				}
				
				/*pos.y -= 27;
				pos.x -= 27;
				*/
				L.DomUtil.setPosition(this._overlay.getOverlay()[0], pos);			
				
				//Don't position
				//var pos = outer.getPoint(new nefos.LatLng(this._latlng.lat, this._latlng.lng));
				this._overlay.showOverlay();
			},

			_initInteraction: function() {
				
			},

			_onMouseClick: function(e) {
				nefos.L("ll", "onMouseClick N");
			},

			_fireMouseEvent: function(e) {
			}
		});
	},
	
	createPolylineLineOnMap : function(polyline, resource) {
		var context = this;
		
		if (polyline.mapData.nativeObject) {
			return;
		}
		var nativePolyline = new L.Polyline(polyline.getNativePoints(), {
	            color: polyline.settings.strokeColor,
	            opacity: polyline.settings.strokeOpacity,
	            weight: polyline.settings.strokeWidth,
	            zIndex: polyline.settings.zIndex,
	            smoothFactor: polyline.settings.smoothFactor,
	            clickable: polyline.settings.clickable || polyline.settings.hoverable
		});
		
		if (polyline.settings.clickable) {
			nativePolyline.on("click", function() {
				if (resource != null) {
					resource.emitEvent("click", context, resource, marker);
				}
				else {
					polyline.emitEvent("click", context);
				}
				context.emitEvent("polylineClick", resource, polyline);
			});
		}
		
		if (polyline.settings.hoverable) {
			nativePolyline.on("mouseover", function(event) {
				polyline.emitEvent("mouseover", event, resource, polyline);
				context.emitEvent("polylineMouseOver", resource, polyline);
			});
			
			nativePolyline.on("mouseout", function(event) {
				polyline.emitEvent("mouseout", event, resource, polyline);
				context.emitEvent("polylineMouseOut", resource, polyline);
			});
		}
		
		polyline.mapData.nativeObject = nativePolyline;
	},
	
	createPolygonLineOnMap : function(polygon, resource) {
		var context = this;
		
		if (polygon.mapData.nativeObject) {
			return;
		}
		
		var options = {
            color: polygon.settings.strokeColor,
            opacity: polygon.settings.strokeOpacity,
            weight: polygon.settings.strokeWidth,
            fillColor: polygon.settings.fillColor,
            fillOpacity: polygon.settings.fillOpacity,
            zIndex: polygon.settings.zIndex,
            clickable: polygon.settings.clickable || polygon.settings.hoverable,
            smoothFactor: polygon.settings.smoothFactor
		};
				
		var nativePolygon = new L.Polygon(polygon.getNativePoints(),options);
	
		if (polygon.settings.clickable) {
			nativePolygon.on("click", function() {
				if (resource != null) {
					resource.emitEvent("click", context, resource, polygon);
				}
				else {
					polygon.emitEvent("click", context);
				}
				context.emitEvent("polygonClick", resource, polygon);
			});
		}
		
		if (polygon.settings.hoverable) {
			nativePolygon.on("mouseover", function(event) {
				polygon.emitEvent("mouseover", event, resource, polygon);
				context.emitEvent("polygonMouseOver", event, resource, polygon);
			});
			
			nativePolygon.on("mouseout", function(event) {
				polygon.emitEvent("mouseout", event, resource, polygon);
				context.emitEvent("polygonMouseOut", event, resource, polygon);
			});
		}
		
		polygon.mapData.nativeObject = nativePolygon;
	},
	
	createCustomOverlayOnMap : function(overlay, resource) {
		overlay.mapData.nativeObject = new nefos.LeafletOverlay(overlay);
	},
	
	_createMarkerIcon : function(marker, iconImage) {		
		var icon = marker.getIcon();
		var shadow = marker.getShadow();
		
		iconImage = iconImage || icon.image;
		
		var iconOptions = {
			    iconUrl: iconImage,
			    iconSize: new L.Point(icon.width, icon.height),
			    iconAnchor: new L.Point(icon.anchor.x, icon.anchor.y),
			    clickable: marker.settings.clickable,
			    draggable: marker.settings.draggable
		};
		if (shadow) {
			iconOptions.shadowUrl = shadow.image;
			iconOptions.shadowSize = new L.Point(shadow.width, shadow.height);
		}
		
		return L.icon(iconOptions);
	},
	
	/**
	 * Creates map representation of specified {nefos.Marker}
	 * @param marker {nefos.Marker} to create on map
	 * @param resource {nefos.Resource} to which marker belongs
	 * @returns {google.maps.Marker}
	 */
	createMarkerOnMap : function(marker, resource) {
		if (marker.mapData.nativeObject) {
			return;
		}
		
		var nativeIcon = this._createMarkerIcon(marker);

		var name = (resource && resource.getName() ? resource.getName() : "").replace(/\&amp;/g,"&");			//Replace name for title tag of image
		name = (marker.settings.name ? marker.settings.name : name);
		var nativeMarker = new L.Marker(marker.getPosition().toNative(), {icon: nativeIcon, title: name, draggable: marker.settings.draggable});
		
		var context = this;
		if (marker.settings.clickable) {
			nativeMarker.on("click", function() {
				if (resource != null) {
					resource.emitEvent("click", context, resource, marker);
				}
				else {
					marker.emitEvent("click", context);
				}
				context.emitEvent("markerClick", resource, marker);
			});
		}
		
		if (marker.settings.draggable) {
			nativeMarker.on("dragend", function(event) {
				marker.setPosition(new nefos.LatLng(event.target.getLatLng().lat, event.target.getLatLng().lng));
				
				var evtWrapper = {
						latLng: marker.getPosition()
				};
				
				marker.emitEvent("drag", evtWrapper, resource, marker);
				//nefos.L("leafletmaps", "missing marker drag implementation.", arguments);
				//marker.setPosition()
			});
		}
		
		if (marker.settings.hoverable) {
			nativeMarker.on("mouseover", function(event) {
				marker.emitEvent("mouseover", event, resource, marker);
				context.emitEvent("markerMouseOver", resource, marker);
			});
			
			nativeMarker.on("mouseout", function(event) {
				marker.emitEvent("mouseout", event, resource, marker);
				context.emitEvent("markerMouseOut", resource, marker);
			});
		}
		
		marker.mapData.nativeObject = nativeMarker;
		return marker.mapData.nativeObject;	
	},
	
	setResourceFocus : function(resource) {
		this._super(resource);
		
		var marker = resource.getReferencePoint();
		
		var nativeIcon = this._createMarkerIcon(marker, marker.settings.focusIcon);
		marker.mapData.nativeObject.setIcon(nativeIcon);
	},
	
	removeResourceFocus : function(resource) {
		this._super(resource);
		var marker = resource.getReferencePoint();
		
		var nativeIcon = this._createMarkerIcon(marker);
		marker.mapData.nativeObject.setIcon(nativeIcon);
	},
	
	createCircleOnMap : function(circle, resource) {
		if (circle.mapData.nativeObject) {
			return;
		}
		var opt  = {
	            color: circle.settings.strokeColor,
	            opacity: circle.settings.strokeOpacity,
	            weight: circle.settings.strokeWidth,
	            fillColor: circle.settings.fillColor,
	            fillOpacity: circle.settings.fillOpacity,
	            zIndex: circle.settings.zIndex,
	            radius: circle.settings.radius
		};
		
		var nativeCircle = null;
		if (circle.settings.fixedSize) {
			nativeCircle = new L.CircleMarker(circle.getPosition().toNative(), opt);	
		}
		else {
			nativeCircle = new L.Circle(circle.getPosition().toNative(), opt.radius, opt);	
		}
		
		//TODO: doesn't work with 
		circle.mapData.nativeObject = nativeCircle;
	},		
		
	/**
	 * Get map bounds
	 * @returns {nefos.LatLngBounds}
	 */
	getBounds : function() {
		return this._fromNativeBounds(this.nativeMap.getBounds());
	},
	
	/**
	 * Get current map zoomLevel
	 * @returns int zoomLevel
	 */
	getZoomLevel : function() {
		return this.nativeMap.getZoom();
	},
		
	fitBounds : function(latLngBounds) {
		if (this.$mapContainer.is(":visible")) {
			this.nativeMap.fitBounds(latLngBounds.toNative());
		}
	},
	
	/**
	 * @Deprecated use getCenter() instead
	 * @returns {nefos.LatLng}
	 */
	getCurrentCenter : function() {
		return this.getCenter();
	},
	
	getCenter : function() {
		var nativeCenter = this.nativeMap.getCenter();
		return new nefos.LatLng(nativeCenter.lat, nativeCenter.lng);
	},
	
	setMapType : function(mapType) {
		var context = this;
		
		if (this.currentMapTypeKey === mapType) {
			return;
		}
		
		if (this.currentMapType) {
			if($.isArray(this.currentMapType)){
				this.nativeMap.removeLayer(this.currentMapType[0]);
				this.nativeMap.removeLayer(this.currentMapType[1]);
			}
			else{
				this.nativeMap.removeLayer(this.currentMapType);
			}
		}
		
		this.currentMapTypeKey = mapType;		
		this.currentMapType = this.mapTypes[mapType];
		
		//return here allows to custom map types in mapTypeSwitch Event [FF]
		if (!this.currentMapType) {
			return;
		}		
		
		if($.isArray(this.currentMapType)){
			this.nativeMap._layersMaxZoom = this.currentMapType[0].maxZoom;
			this.nativeMap._layersMinZoom = this.currentMapType[0].minZoom;
			
			if (this.getZoomLevel() > this.currentMapType[0].maxZoom) {
				this.setZoomLevel(this.currentMapType[0].maxZoom);
			}
			else if (this.getZoomLevel() < this.currentMapType[0].minZoom) {
				this.setZoomLevel(this.currentMapType[0].minZoom);
			}
			
			this.nativeMap.addLayer(this.currentMapType[0]);
			this.nativeMap.addLayer(this.currentMapType[1]);
		}
		else{
			this.nativeMap._layersMaxZoom = this.currentMapType.maxZoom;
			this.nativeMap._layersMinZoom = this.currentMapType.minZoom;
			
			if (this.getZoomLevel() > this.currentMapType.maxZoom) {
				this.setZoomLevel(this.currentMapType.maxZoom);
			}
			else if (this.getZoomLevel() < this.currentMapType.minZoom) {
				this.setZoomLevel(this.currentMapType.minZoom);
			}
			
			this.nativeMap.addLayer(this.currentMapType);
		}
	},

	getMapTypeName : function(){
		if($.isArray(this.currentMapType)){
			return this.currentMapType[0].name;
		}
		return this.currentMapType.name;
	},
	
	getMapType : function(){
		return this.currentMapType;
	},
	
	setZoomLevel : function(zoomLevel) {
		if (this.$mapContainer.is(":visible")) {
			this.nativeMap.setZoom(zoomLevel);
		}
	},
	
	panTo : function(latLng) {
		if (this.$mapContainer.is(":visible")) {
			this.nativeMap.panTo(latLng.toNative());
		}
	},
	
	resizeMap : function() {
		this.nativeMap.invalidateSize();
	},
	
	setView : function(center, zoom) {
		if (this.$mapContainer.is(":visible")) {
			this.nativeMap.setView(center.toNative(), zoom);
		}
	},
	
	setCenter : function(center) {
		if (this.$mapContainer.is(":visible")) {
			this.setView(center, this.getZoomLevel());
		}
	}
});

nefos.LOCAL_STORAGE_KEY = "localStorage";

nefos.LocalStorage = nefos.EventEmitter.extend({
	init : function(cache) {
		this._super();
		
		this.cache = cache;
		this.storage = null;
		
		this.initLocalStorage();
	},
	
	getItem : function(key){
		if(!this.storage[key]){
			return null;
		}
		return this.storage[key] + "";
	},
	
	setItem : function(key, val){
		this.storage[key] = val;
		this._updateDB();
	},
	
	removeItem : function(key){
		delete this.storage[key];
		this._updateDB();
	},
	
	setupLocalStorage : function(cb){
		var outer = this;
		this.storage = {};
		
		this.cache.getDirectlyFromCache(nefos.LOCAL_STORAGE_KEY, function(result){
			if(result){
				var pairs = result.split(";");
				var key, val;
				for(idx in pairs){
					key = pairs[idx].split("=")[0];
					val = pairs[idx].split("=")[1];
					
					if(val){
						outer.storage[key] = val;
					}
				}
			}
			else{
				nefos.L("localStorage", "setup localStorage, data was empty");
			}
			if(cb){
				cb();
			}
		});
	},
	
	initLocalStorage : function(){
		var outer = this;
		
		this.cache.getDirectlyFromCache(nefos.LOCAL_STORAGE_KEY, function(result){
			
			if(!result){
				outer.cache.putDirectlyIntoCache(nefos.LOCAL_STORAGE_KEY, outer._getLocalStorageString(), function(success, error){
					if(error){
						nefos.L("localStorage", "error on init localStorage");
					}
				});
			}
		});
	},
	
	_updateDB : function(){
		this.cache.updateCache(nefos.LOCAL_STORAGE_KEY, this._getLocalStorageString(), function(success, error){
			if(error){
				nefos.L("localStorage", "error on updating localStorage");
			}
		});
	},
	
	_getLocalStorageString : function(){
		var storageString = "";
		
		for(key in this.storage){
			storageString += key + "=" + this.storage[key] + ";"
		}
		
		return storageString;
	}
});



nefos.CACHE_TYPE_SIMPLE = "simple";
nefos.CACHE_TYPE_COMPLEX = "complex";
nefos.CACHE_TYPE_MOBILE = "mobile";
nefos.CACHE_TYPE_MOBILE_DB = "mobile_db";
nefos.CACHE_TYPE_UNDEFINED = "undefined";
nefos.cacheDB = null;

nefos.Cache = nefos.EventEmitter.extend({
	init : function(settings) {
		this._super(settings);
		
		this.cacheType = nefos.CACHE_TYPE_UNDEFINED;
		this.cache = {};
	},
	
	getCacheKey : function(options){
		var sum = 0;
		
		if($.isEmptyObject(options)){
			return "";
		}
		
		$.map(options["search.categories"], function(val, i){
			sum += parseInt(val);
		});
		
		if(isNaN(sum)){
			return "";
		}
		
		return sum;
	},
	
	putIntoCache : function(options, cb){
		alert('not implemented');
	},
	
	getFromCache : function(options, cb){
		alert('not implemented');
	},
	
	putDirectlyIntoCache : function(key, val, cb){
		alert('not implemented');
	},
	
	getDirectlyFromCache : function(key, cb){
		alert('not implemented');
	},
	
	getCacheType : function(){
		return this.cacheType;
	},
	
	clearCache : function(){
		alert('not implemented');
	}
});

nefos.SimpleCache = nefos.Cache.extend({
	init : function(settings) {
		this._super(settings);
		this.cacheType = nefos.CACHE_TYPE_SIMPLE;
	},

	_putInBoundsChache : function(cacheKey, bounds) {
		if (!this.cache[cacheKey]) {
			this.cache[cacheKey] = [bounds];
		}
		else {
			if (this.cache[cacheKey].length > 50) {
				this.cache[cacheKey].pop();
			}
			this.cache[cacheKey].unshift(bounds);
		}
	},
	
	putDirectlyIntoCache : function(key, val, cb){
		cb(null);
	},
	
	getDirectlyFromCache : function(key, cb){
		cb(null);
	},
	
	putIntoCache : function(options, cb){
		this._putInBoundsChache(this.getCacheKey(options), options.bounds);
		cb(true);
	},
	
	getFromCache : function(options, cb){
		var key = this.getCacheKey(options);
		
		if (this.cache[key]) {
			var cachedBounds = this.cache[key];
			
			for (var i=0;i<cachedBounds.length;i++) {
				if (cachedBounds[i].containsBounds(options.bounds)) {
					cb({});
					return;
				}
			}
		}
		cb(null);
	},
	
	clearCache : function(){
		this.cache = {};
	}
});

nefos.ComplexCache = nefos.Cache.extend({
	init : function(settings) {
		this._super(settings);
		this.cacheType = nefos.CACHE_TYPE_COMPLEX;
	},
	
	putDirectlyIntoCache : function(key, val, cb){
		cb(null);
	},
	
	getDirectlyFromCache : function(key, cb){
		cb(null);
	},
	
	putIntoCache : function(options, cb){
		this.cache[this.getCacheKey(options)] = options.data;
		cb(true);
	},
	
	getFromCache : function(options, cb){
		var key = this.getCacheKey(options);
			
		if (this.cache[key]) {
			cb(this.cache[key]);
			return;
		}
		cb(null);
	},
	
	clearCache : function(){
		this.cache = {};
	}
});

nefos.MobileCache = nefos.Cache.extend({
	init : function(settings) {
		this._super(settings);
		this.cacheType = nefos.CACHE_TYPE_MOBILE;
	},
	
	putDirectlyIntoCache : function(key, val, cb){
		cb(null);
	},
	
	getDirectlyFromCache : function(key, cb){
		cb(null);
	},
	
	putIntoCache : function(options, cb){
		localStorage.setItem(this.getCacheKey(options), JSON.stringify(options.data));
		cb(true);
	},
	
	getFromCache : function(options, cb){
		var key = this.getCacheKey(options);
			
		if (localStorage.getItem(key)) {
			cb(JSON.parse(localStorage.getItem(key)));
			return;
		}
		cb(null);
	}
});

nefos.MobileDBCache = nefos.Cache.extend({
	init : function(settings, cb) {
		this._super(settings);
		this.cacheType = nefos.CACHE_TYPE_MOBILE_DB;
		
		this.settings.size = this.settings.size || 10*1024*1024;
		
		this.initDB(false, cb);
	},
	
	initDB : function(reset, cb){	
		if(window.openDatabase){
			nefos.cacheDB = openDatabase('cmOfflineDB', '1.0', 'Offline Storage of Contwise Maps', this.settings.size);
		}
		
		if(!nefos.cacheDB) {
	    	nefos.L("sqlDB-cmStorage", "Database open failed.");
	    	return;
	    }
	    
	    if (reset) {
	    	nefos.L("sqlDB-cmStorage", "Clearing database chache.");
	    	this.clearCache();
	    }
	    else{
	    	nefos.cacheDB.transaction(function(tx) {
	            tx.executeSql("CREATE TABLE IF NOT EXISTS cmOfflineStorage (key TEXT, data TEXT);", [], 
	                function(tx, result) {
	            		if(cb){
	            			cb();
	            		}
	            		//nefos.L("sqlDB-cmStorage",'table created if not exists.');
	            		/*
	            		tx.executeSql("SELECT * FROM cmOfflineStorage", [], 
	                            function(tx2, result2) {
	                                if (result2.rows.length > 0) {
	                                    var len=result2.rows.length;
	                                    var i;
	                                	
	                                    nefos.L("sqlDB-cmStorage", "got an result. ccool, length: " + len);
	                  
	                                    alert("prepare for dump.");
	                                    for(i=0; i<len; i++) {
	                                      //Set values coming from the database
	                                      nefos.L("sqlDB-cmStorage","key: " + result2.rows.item(i).key +
	                                             " val: " + result2.rows.item(i).data);
	                                    }
	                                    alert("dump finished.");
	                                    
	                                }
	                                else {
	                                	nefos.L("sqlDB-cmStorage", "empty result not so ccool");
	                                }
	                            },
	                            function(tx2, error) {
	                            	nefos.L("sqlDB-cmStorage", "error creating table: " + JSON.stringfy(error));
	                            }
	                    );*/
	                }, 
	                function(tx, error) {
	                	if(cb){
	            			cb();
	            		}
	                    nefos.L("sqlDB-cmStorage", "error creating table: " + JSON.stringfy(error));
	                }
	            );
	        });
	    }
	},
	
	clearCache : function() {
		nefos.L("sqlDB-cmStorage","Reseting tables...");
        nefos.cacheDB.transaction(function(tx) {
            tx.executeSql("DROP TABLE cmOfflineStorage;", [], function(tx, result) {}, function(tx, error) {});
            tx.executeSql("CREATE TABLE cmOfflineStorage (key TEXT, data TEXT);", [], 
                function(tx, result) {
            		//nefos.L("sqlDB-cmStorage",'table created.');
                }, 
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error creating table");
                }
            );
        });
	},
	
	clearResourceCache : function(masterResourceId) {
		nefos.L("sqlDB-cmStorage","Clearing all resources...");
        nefos.cacheDB.transaction(function(tx) {
            tx.executeSql("DELETE FROM cmOfflineStorage WHERE key LIKE 'resource%' AND key != ?", ['resource' + masterResourceId], 
                function(tx, result) {
            		//nefos.L("sqlDB-cmStorage",'resources deleted');
                },
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error deleting resources");
                }
            );
        });
	},
	
	putDirectlyIntoCache : function(key, val, cb){
		var outer = this;
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", "Database open failed.");
	    	cb(false);
	    	return;
	    }
		
		nefos.cacheDB.transaction(function (tx) {
        	tx.executeSql("INSERT INTO cmOfflineStorage (key, data) VALUES (?, ?);", [key, JSON.stringify(val)],
    			function(tx, result) {
        			//nefos.L("sqlDB-cmStorage", "inserted " + key);
    				cb(true);
    			},
    			function(tx, error) {
    				nefos.L("sqlDB-cmStorage", "error directly inserting");
    				cb(false, error);
    			}
        	);
        });
	},
	
	updateCache : function(key, val, cb){
		var outer = this;
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", "Database open failed.");
	    	cb(false);
	    	return;
	    }
		
		nefos.cacheDB.transaction(function (tx) {
        	tx.executeSql("UPDATE cmOfflineStorage SET data = ? WHERE key = ?", [JSON.stringify(val), key],
    			function(tx, result) {
        			//nefos.L("sqlDB-cmStorage", "inserted " + key);
    				cb(true);
    			},
    			function(tx, error) {
    				nefos.L("sqlDB-cmStorage", "error directly inserting");
    				cb(false, error);
    			}
        	);
        });
	},
	
	deleteFromCache : function(key, cb){
		var outer = this;
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", "Database open failed.");
	    	cb(false);
	    	return;
	    }
		
		nefos.cacheDB.transaction(function (tx) {
        	tx.executeSql("DELETE FROM cmOfflineStorage WHERE key = ?", [key],
    			function(tx, result) {
        			//nefos.L("sqlDB-cmStorage", "deleted " + key);
    				cb(true);
    			},
    			function(tx, error) {
    				nefos.L("sqlDB-cmStorage", "error on deleting");
    				cb(false, error);
    			}
        	);
        });
	},
	
	putMapDirectlyIntoCache : function(map, prefix, cb){
		var outer = this;
		
		nefos.cacheDB.transaction(function (tx) {
			for (key in map) {
				var dbKey = prefix + key;
				
				var object = {};
				object[key] = map[key];
				
				tx.executeSql("INSERT INTO cmOfflineStorage (key, data) VALUES (?, ?);", 
						[dbKey, JSON.stringify(object)],
						function(tx, result) {
							cb(true);
        					//nefos.L("sqlDB-cmStorage", "inserted " + dbKey);
    					},
    					function(tx, error) {
    						cb(false, error);
    						nefos.L("sqlDB-cmStorage", "error map directly inserting" + dbKey);
    					}		
				);	
			}
        });
	},
	
	getAllResources : function(cb){
		nefos.cacheDB.transaction(function (tx) {
            tx.executeSql("SELECT data FROM cmOfflineStorage WHERE key LIKE 'resource%'", [], 
                function(tx, result) {
                    if (result.rows.length > 0) {
                        cb(result.rows);
                    }
                    else {
                    	cb(null);
                    }
                }, 
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error loading from offline cache");
                    cb(null, error);
                }
            );
        });
	},
	
	getDirectlyFromCache : function(key, cb){
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", key + " searched, but no db opened!");
			cb(null);
	    	return;
	    }
		
        nefos.cacheDB.transaction(function (tx) {
            tx.executeSql("SELECT data FROM cmOfflineStorage WHERE key = ?", [key], 
                function(tx, result) {
                    if (result.rows.length > 0) {
                        cb(JSON.parse(result.rows.item(0).data));
                    }
                    else {
                    	//nefos.L("mobileCache", key + " searched, but not found in DB!");
                    	cb(null);
                    }
                }, 
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error loading from offline cache");
                    cb(null, error);
                }
            );
        });
	},
	
	dump : function(key){
		this.getDirectlyFromCache(key, function(result){
			if(result){
				nefos.L("sqlDB-cmStorage", "content of \"" + key + "\" is: " + result);
			}
			else{
				nefos.L("sqlDB-cmStorage", "content of \"" + key + "\" is empty");
			}
		});
	},
	
	putIntoCache : function(options, cb){
		var outer = this;
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", key + " to insert, but no db opened!");
			cb(false);
	    	return;
	    }
		
		nefos.cacheDB.transaction(function (tx) {
        	tx.executeSql("INSERT INTO cmOfflineStorage (key, data) VALUES (?, ?);", [outer.getCacheKey(options), JSON.stringify(options.data)],
    			function(tx, result) {
        			//nefos.L("sqlDB-cmStorage", "inserted " + outer.getCacheKey(options));
    				cb(true);
    			},
    			function(tx, error) {
    				nefos.L("sqlDB-cmStorage", "error inserting");
    				cb(false, error);
    			}
        	);
        });
	},
	
	loadResourcesByIds : function(ids, cb){
		var list = '(';
		
		if(!ids){
			ids = [];
		}
		
		for(var i=0;i<ids.length;i++){
			if(i!=0){
				list += ",";
			}
			list += '\'resource' + ids[i] + '\'';
		}
		list += ")";
		
		nefos.cacheDB.transaction(function (tx) {
            tx.executeSql("SELECT data FROM cmOfflineStorage WHERE key IN " + list, [], 
                function(tx, result) {
                    if (result.rows.length > 0) {
                    	var erg = {};
                    	for(var i=0;i<result.rows.length;i++){
                    		$.extend(erg, JSON.parse(result.rows.item(i).data));
                    	}
                        cb(erg);
                    }
                    else {
                    	cb(null);
                    }
                }, 
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error loading from offline cache");
                    cb(null, error);
                }
            );
        });
	},
	
	getFromCache : function(options, cb){
		var key = this.getCacheKey(options);
		
		if(!nefos.cacheDB) {
			nefos.L("sqlDB-cmStorage", "Database open failed.");
	    	cb(null);
	    	return;
	    }
		
        nefos.cacheDB.transaction(function (tx) {
            tx.executeSql("SELECT data FROM cmOfflineStorage WHERE key = ?", [key], 
                function(tx, result) {
                    if (result.rows.length > 0) {
                        cb(JSON.parse(result.rows.item(0).data));
                    }
                    else {
                    	cb(null);
                    }
                }, 
                function(tx, error) {
                    nefos.L("sqlDB-cmStorage", "error loading from offline cache");
                    cb(null, error);
                }
            );
        });
	}
});


nefos.LOCAL_STORAGE_KEY = "localStorage";

nefos.LocalStorage = nefos.EventEmitter.extend({
	init : function(cache) {
		this._super();
		
		this.cache = cache;
		this.storage = null;
		
		this.initLocalStorage();
	},
	
	getItem : function(key){
		if(!this.storage[key]){
			return null;
		}
		return this.storage[key] + "";
	},
	
	setItem : function(key, val){
		this.storage[key] = val;
		this._updateDB();
	},
	
	removeItem : function(key){
		delete this.storage[key];
		this._updateDB();
	},
	
	setupLocalStorage : function(cb){
		var outer = this;
		this.storage = {};
		
		this.cache.getDirectlyFromCache(nefos.LOCAL_STORAGE_KEY, function(result){
			if(result){
				var pairs = result.split(";");
				var key, val;
				for(idx in pairs){
					key = pairs[idx].split("=")[0];
					val = pairs[idx].split("=")[1];
					
					if(val){
						outer.storage[key] = val;
					}
				}
			}
			else{
				nefos.L("localStorage", "setup localStorage, data was empty");
			}
			if(cb){
				cb();
			}
		});
	},
	
	initLocalStorage : function(){
		var outer = this;
		
		this.cache.getDirectlyFromCache(nefos.LOCAL_STORAGE_KEY, function(result){
			
			if(!result){
				outer.cache.putDirectlyIntoCache(nefos.LOCAL_STORAGE_KEY, outer._getLocalStorageString(), function(success, error){
					if(error){
						nefos.L("localStorage", "error on init localStorage");
					}
				});
			}
		});
	},
	
	_updateDB : function(){
		this.cache.updateCache(nefos.LOCAL_STORAGE_KEY, this._getLocalStorageString(), function(success, error){
			if(error){
				nefos.L("localStorage", "error on updating localStorage");
			}
		});
	},
	
	_getLocalStorageString : function(){
		var storageString = "";
		
		for(key in this.storage){
			storageString += key + "=" + this.storage[key] + ";"
		}
		
		return storageString;
	}
});


/* 
 * L.TileLayer.LocalCache : A tile layer using SQL Storage, if available.
 */

L.TileLayer.LocalCache = L.TileLayer.extend({
    options: {
        minZoom: 0,
        maxZoom: 18,
        tileSize: 256,
        subdomains: 'abc',
        errorTileUrl: '',
        attribution: '',
        opacity: 1,
        scheme: 'xyz',
        noWrap: false,
        unloadInvisibleTiles: L.Browser.mobileWebkit,
        updateWhenIdle: L.Browser.mobileWebkit
    },
    
    initialize: function(url, tilestorage, options) {
        this._url = url;
        this.tilestorage = tilestorage;

        if (typeof this.options.subdomains == 'string') {
            this.options.subdomains = this.options.subdomains.split('');
        }
        L.Util.setOptions(this, options);
    },

    _loadTile: function(tile, tilePoint, zoom) {
        tile._layer = this;
        tile.onload = this._tileOnLoad;
        tile.onerror = this._tileOnError;
        this.getTileUrl(tile, tilePoint, zoom);
    },

    getTileUrl: function(tile, tilePoint, zoom) {
        var subdomains = this.options.subdomains,
                     s = this.options.subdomains[(tilePoint.x + tilePoint.y) % subdomains.length];
        var fallback = this._url
                           .replace('{s}', s)
                           .replace('{z}', zoom)
                           .replace('{x}', tilePoint.x)
                           .replace('{y}', tilePoint.y);
        var ymax = 1 << zoom;
		var y = ymax - tilePoint.y - 1;
        this.tilestorage.loadTile(tile, zoom, tilePoint.x, y, fallback);
    }
});

/* 
 *  $.TileStorage : A tile SQL storage. (using Jquery, TODO: rewrite for Leaflet class model!)
 */
(function($){
    $.TileStorage = function(options) {
        var self = this;
        
        var size = 10*1024*1024;
		
        var settings = $.extend({dbname: 'cmOfflineDB', version: '1.0', comment: 'Offline Storage of Contwise Maps', size: size}, options || {});

        self.initTiles = function (reset) {
        	if(window.openDatabase){
        		nefos.cacheDB = openDatabase(settings.dbname, settings.version, settings.comment, settings.size);
        	}
            if(!nefos.cacheDB) {
            	nefos.L("Database open failed.");
            	return;
            }
            if (reset) {
            	nefos.L("sqlDB-cmTiles","Creating tables...");
                nefos.cacheDB.transaction(function(tx) {
                	
                    tx.executeSql("DROP TABLE tiles;", [],
                    	function(tx, result) {
                    		nefos.L("sqlDB-cmTiles",'dropped table tiles.');
                    	}, function(tx, error) {
                    		nefos.L("sqlDB-cmTiles",'error on dropping table tiles.');
                    	}
                    );
                    
                    tx.executeSql("CREATE TABLE tiles (z INT, x INT, y INT, data TEXT);", [], 
                        function(tx, result) {
                    		nefos.L("sqlDB-cmTiles",'Database created.');
                        }, 
                        function(tx, error) {
                            nefos.L("sqlDB-cmTiles", "error creating db");
                        }
                    );
                });
            }
        };
        
        self.tableExists = function(tableName, cb){
        	nefos.cacheDB.transaction(function (tx) {
            	tx.executeSql("SELECT data FROM " + tableName, [], 
                        function(tx, result) {
                    		nefos.L("sqlDB-cmTiles", 'table ' + tableName + ' exists');
                    		cb(true);
                        },
                        function(tx, error) {
                            nefos.L("sqlDB-cmTiles", 'table ' + tableName + ' does not exist');
                            cb(false);
                        }
                    );
        	});
        };

        self.storeTiles = function (data, cb) {
        	var sqlCount = 0;
        	var dataSize = nefos.HashSize(data);
        	
        	if(jQuery.isEmptyObject(data)){
        		nefos.L("sqlDB-cmTiles", "empty object when trying to store");
        		cb(0, 0);
        	}
            if (!nefos.cacheDB) {
                self.initTiles(true);
            }
            
            var testComplete = function(error){
            	sqlCount++;
            	cb(sqlCount, dataSize, error);
            };
            
            nefos.cacheDB.transaction(function (tx) {
            	tx.executeSql("CREATE TABLE IF NOT EXISTS tiles (z INT, x INT, y INT, data TEXT);", [], 
                        function(tx, result) {
                    		nefos.L("sqlDB-cmTiles",'Database created.');
                        }, 
                        function(tx, error) {
                            nefos.L("sqlDB-cmTiles", "error creating db");
                        }
                    );
            	
            	for(index in data){
                    var z = index.split(";")[0],
                        x = index.split(";")[1],
                        y = index.split(";")[2],
                        tiledata = "data:image/jpeg;base64," + data[index];
                    
                    tx.executeSql("INSERT INTO tiles (z, x, y, data) VALUES (?, ?, ?, ?);", [z, x, y, tiledata],
	                    function(tx, result) {
		                	nefos.L("sqlDB-cmTiles","stored tile " + result.insertId);
		                	testComplete();
		                },
		                function(tx, error) {
		                    nefos.L("sqlDB-cmTiles", "error storing tile");
		                    testComplete(error);
		                }
                    );
            	}
            });
        };

        self._storeTile = function (z, x, y, data, success, error) {
            nefos.cacheDB.transaction(function (tx) {
            	tx.executeSql("INSERT INTO tiles (z, x, y, data) VALUES (?, ?, ?, ?);", [z, x, y, data], success, error);
            });
        };
        
        self.loadTile = function (tile, z, x, y, fallback) {
            if (!nefos.cacheDB) {
                self.initTiles();
            }
            nefos.cacheDB.transaction(function (tx) {
                tx.executeSql("SELECT data FROM tiles WHERE z = ? AND x = ? AND y = ?", [z, x, y], 
                    function(tx, result) {
                        if (result.rows.length > 0) {
                            tile.src = result.rows.item(0).data;
                        }
                        else {
                            tile.src = fallback;
                        }
                    }, 
                    function(tx, error) {
                        nefos.L("mobile", "error loading tile");
                    }
                );
            });
        };
   };
})(jQuery);



function AppBootstrap(serverUrl, apiKey) {
	this.serverUrl = serverUrl || "http://mapservices.eu/nefos_app/";
	
	this.scriptName = apiKey + "_app.js";
	this.cssName = apiKey + "_app.css";
	
	this.scriptUrl = this.serverUrl + "compiled-js/" + apiKey + "/" + this.scriptName;
	this.cssUrl = this.serverUrl + "compiled-js/" + apiKey + "/" + this.cssName;
	
	this.localScriptPath = null;
	this.localCssPath = null;
	this.bootstrapFinishedCb = null;
};

AppBootstrap.prototype.bootstrapApp = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._checkJsFile();
};

AppBootstrap.prototype.downloadAndBootstrap = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._downloadJsFile();
};

AppBootstrap.prototype.download = function(cb) {
	this.bootstrapFinishedCb = cb;
	this._downloadJsFile(false);
};

AppBootstrap.prototype._downloadJsFile = function(includeScript) {
	var outer = this;
	
	includeScript = includeScript === undefined ? true : includeScript;
	
	Downloader.requestURL = outer.scriptUrl;
	Downloader.filename = "js/" + outer.scriptName;
	
	Downloader.downloadFile(function(dlPath, e, msg){
		if (!dlPath) {
			outer.bootstrapFinishedCb(false, e, msg);
			return;
		}
		outer.localScriptPath = dlPath;
		if (includeScript) {
			outer._loadScript(function() {
				outer._downloadCssFile();
			});
		}
		else {
			outer._downloadCssFile(false);
		}
	});	
};

AppBootstrap.prototype._downloadCssFile = function(includeCss) {
	var outer = this;
	
	includeCss = includeCss === undefined ? true : includeCss;
	
	Downloader.requestURL = outer.cssUrl;
	Downloader.filename = "css/" + outer.cssName;
	
	Downloader.downloadFile(function(dlPath,e, msg){
		if (!dlPath) {
			outer.bootstrapFinishedCb(false, e, msg);
			return;
		}
		outer.localCssPath = dlPath;
		if (includeCss) {
			outer._loadCss();
		}
		outer.bootstrapFinishedCb(true);
	});	
};


AppBootstrap.prototype._checkJsFile = function() {
	var outer = this;
	
	Downloader.checkIfFileExists("downloads/js/" + this.scriptName , function(path) {
		if (path) {
			outer.localScriptPath = path;
			outer._loadScript(function() {
				outer._checkCssFile();
			});
		}
		else {
			outer.bootstrapFinishedCb(false);
		}
	});
};


AppBootstrap.prototype._checkCssFile = function() {
	var outer = this;
	
	Downloader.checkIfFileExists("downloads/css/" + this.cssName , function(path) {
		if (path) {
			outer.localCssPath = path;
			outer._loadCss();
			outer.bootstrapFinishedCb(true);
		}
		else {
			outer.bootstrapFinishedCb(false);
		}
	});
};

AppBootstrap.prototype._loadScript = function(cb) {
	var s   = document.createElement('script');
	s.type  = 'text/javascript';
	s.async = true;
	s.src   = this.localScriptPath;
	
	if (s.readyState) {
		s.onreadystatechange = function () {
			if (s.readyState === "loaded" || s.readyState === "complete") {
				s.onreadystatechange = null;
				cb();
			}
		};
	}
	else {
		s.onload = function () {
			cb();
		};
	};
	document.head.appendChild(s);
};

AppBootstrap.prototype._loadCss = function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.type = 'text/css';
	link.href = this.localCssPath;
		
	document.head.appendChild(link);
};




/***
 * Class for querying resources and categories from server
 * Needs an api key for correct operation
 */
nefos.DataService = nefos.EventEmitter.extend({
	/***
	 * Constructor
	 * @param settings map of settings. apiKey is mandatory.
	 */	
	init : function(settings) {
		this._super(settings);
		
		this.apiKey = settings.apiKey;
		
		this.settings.iconConfig = this.settings.iconConfig || {};
		this.settings.iconShadowConfig = this.settings.iconShadowConfig || {};
		this.settings.bufferThreshold = this.settings.bufferThreshold || 700;
		this.settings.language = this.settings.language || "de";
		this.settings.parallelRequests = this.settings.parallelRequests || false;
		this.settings.cacheMethod = this.settings.cacheMethod || nefos.CACHE_TYPE_SIMPLE;
		this.settings.requestPath = this.settings.requestPath || null;
		this.settings.cacheReadyCb = this.settings.cacheReadyCb || null;
		
		this.requestBuffer = {};
		this.runningRequest = null;
	},
	
	initCache : function(){
		var outer = this;
		
		if(this.settings.cacheMethod == nefos.CACHE_TYPE_SIMPLE){
			this.cache = new nefos.SimpleCache({});
			this.emitEvent("cacheReady");
		}
		else if(this.settings.cacheMethod == nefos.CACHE_TYPE_COMPLEX){
			this.cache = new nefos.ComplexCache({});
			this.emitEvent("cacheReady");
		}
		else if(this.settings.cacheMethod == nefos.CACHE_TYPE_MOBILE_DB){
			this.cache = new nefos.MobileDBCache({
				size: 5*1024*1024
			}, function(){
				outer.emitEvent("cacheReady");
			});
		}
		else{
			this.cache = new nefos.MobileCache({});
			this.emitEvent("cacheReady");
		}
	},
	
	_executeBufferedAJAX : function(baseUrl) {
		var context = this;
		
		if (!this.settings.parallelRequests) {
			if (this.runningRequest) {
				this.runningRequest.abort();
				this.runningRequest = null;
			}
		}
		
		if (!this.requestBuffer || !this.requestBuffer[baseUrl]) {
			return; //maybe cleared through second thread. IE only issue. Has something todo with parallel requests.
		}
		
		var parameter = this.requestBuffer[baseUrl].parameter;
		var options = this.requestBuffer[baseUrl].options;
		
		this.requestBuffer[baseUrl] = null;
				
		var request = jQuery.getJSON(baseUrl, parameter, function(data) {
			context.runningRequest = null;
		
			if (options.cb) {
				if (options.cache) {
					jQuery.extend(options, {data: data}, parameter);
					context.cache.putIntoCache(options, function(){});
				}
				options.cb(data);
			}
		});
		
		this.runningRequest = request;
	},
	
	_getBufferedJSON : function(baseUrl, parameter, options) {
		var outer = this;
		
		var newTimeout = window.setTimeout(function() {
			outer._executeBufferedAJAX(baseUrl);
		}, 
		this.settings.bufferThreshold);
		
		if (this.requestBuffer[baseUrl]) {
			var obj = this.requestBuffer[baseUrl];
			
			window.clearTimeout(obj.timeout);
			obj.timeout = newTimeout;
			obj.baseUrl = baseUrl;
			obj.parameter = parameter;
			obj.options = options;
			
			this.requestBuffer[baseUrl] = obj;
		}
		else {
			this.requestBuffer[baseUrl] = {
					timeout : newTimeout,
					url : baseUrl,
					"parameter": parameter,
					"options" : options
			};
		}	
	},
	
	abortRequests : function(){
		if(this.runningRequest != null){
			this.runningRequest.abort();
		}
		this.requestBuffer = {};
	},
	
	clearCache : function() {
		this.cache.clearCache();
	},
	
	clearResourceCache : function(masterResourceId) {
		this.cache.clearResourceCache(masterResourceId);
	},
	
	setIconConfig : function(config) {
		this.settings.iconConfig = config;
	},
	
	setIconShadowConfig : function(config) {
		this.settings.iconShadowConfig = config;
	},
	
	setClusterIconConfig : function(config) {
		this.settings.clusterIconConfig = config;
	},
	
	loadMandatorConfig : function(options, cb) {
		var outer = this;
		this.setStandardOptions(options);
		options.LoadMandatorConfig = "action";
		
		this.cache.getDirectlyFromCache('mandatorConfig' + nefos.Globals.mandatorId, function(result){
			if(result){
				cb(result);
			}
			else{
				$.ajax({
				    url: outer.settings.requestPath + "/frontend/mandator/json/Mandator.action",
				    jsonp: 'jsonp_callback',
				    dataType: 'jsonp',
				    type: 'GET',
				    data: options,
				    success: function(data) {
				    	outer.cache.putDirectlyIntoCache('mandatorConfig' + nefos.Globals.mandatorId, data, function(){});
				        cb(data);
				    }
				});
			}
		});
	},
	
	testPassword : function(options, cb) {
		var outer = this;
		this.setStandardOptions(options);
		options.TestPassword = "action";
		
		$.ajax({
		    url: outer.settings.requestPath + "/frontend/password/json/Password.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(data) {
		        cb(data.result);
		    }
		});
	},
	
	/**
	 * Loads resources from server and puts them into db cache
	 */
	cacheAllResources : function(options, cb){
		if(this.settings.cacheMethod != nefos.CACHE_TYPE_MOBILE_DB){
			alert("method not implemented for this cache type, cacheAllResources");
			return;
		}
		
		var outer = this;
		
		if(options.bounds){
			jQuery.extend(options, outer._boundsToParameter(options.bounds));
			delete options.bounds;
		}
		
		this.setStandardOptions(options);
		options["CacheAllResources"] = "action";
		
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary);
		    	
		    	var sqlCount = 0;
	        	var dataSize = nefos.HashSize(data);
	        	
	        	if(dataSize == 0){
	        		cb(true);
	        	}
	        	
		    	var cacheCB = function(){
		    		sqlCount++;
		    		if(sqlCount >= dataSize){
		    			cb(data);
		    		}
		    	};
		    	
	    		outer.cache.putMapDirectlyIntoCache(data, 'resource', 
	    				function(){
	    					cacheCB();
	    				}
	    		);
		    },
		    error: function(error) {
		    	cb(false, error);
		    }
		});
	},
	
	/***
	 * Loads a resource from server
	 * @param options Filter options for resource query (needed: resourceId)
	 */
	loadSitemapResources : function(cb) {
		var outer = this;
		
		var options = {};
		this.setStandardOptions(options);
		options["LoadSitemapResources"] = "action";
				
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary);
		        cb(data);
		    }
		});
	},
	
	/***
	 * Loads a resource from server
	 * @param options Filter options for resource query (needed: resourceId)
	 */
	loadResource : function(options, cb) {
		var outer = this;
		this.setStandardOptions(options);
		options["LoadResource"] = "action";
		
		this.cache.getDirectlyFromCache('resource' + options.resourceId, function(result){
			if(result && options.cache){
				cb(result);
			}
			else{
				if((options.online === undefined) || options.online == true){
					$.ajax({
					    url: outer.settings.requestPath + "/frontend/resource/json/Resource.action",
					    jsonp: 'jsonp_callback',
					    dataType: 'jsonp',
					    type: 'GET',
					    data: options,
					    success: function(ary) {
					    	var data = outer._convertArrayToMap(ary);
					    	if (options.cache) {
								outer.cache.putDirectlyIntoCache('resource' + options.resourceId, data, function(){});
							}
					    	cb(data);
					    }
					});
				}
				else{
					//do not try to load from server
					cb(null);
				}
			}
		});
	},
	
	/***
	 * Loads mediums from server
	 */
	getPicturesOfResource : function(options, cb) {
		var outer = this;
		
		this.setStandardOptions(options);
		options["GetPicturesOfResource"] = "action";
				
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary, true);
		        cb(data);
		    }
		});
	},
	
	/***
	 * Loads mediums from server
	 */
	getMediumsByResourceIds : function(options, cb) {
		var outer = this;
		
		this.setStandardOptions(options);
		options["GetMediumsByResourceIds"] = "action";
				
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(data) {
		        cb(data);
		    }
		});
	},
	
	/***
	 * Loads object types definition from server
	 */
	loadObjectTypes : function(options, cb) {
		var outer = this;
		
		this.setStandardOptions(options);
		options["LoadObjectTypes"] = "action";
				
		$.ajax({
		    url: this.settings.requestPath + "/frontend/objecttype/json/ObjectType.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(data) {
		    	var ret = [];
		    	if (data != null && data.length > 0) {
			    	for (var i=0;i<data.length;i++) {
			    		ret.push(new nefos.ObjectType(data[i]));
			    	}
		    	}
		        cb(ret);
		    }
		});
	},
	
	/***
	 * Loads categories from server
	 */
	getCategoriesOfResource : function(options, cb) {
		var outer = this;
		
		this.setStandardOptions(options);
		options["GetCategoriesOfResource"] = "action";
		
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary);
		        cb(data);
		    }
		});
	},
	
	loadResourcesByCategory : function(options, cb) {
		var outer = this;
		
		this.setStandardOptions(options);
		options["LoadResourcesByCategory"] = "action";
				
		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary);
		        cb(data);
		    }
		});
	},
		
	_boundsToParameter : function(bounds) {		
		var outer = this;
	
		var convertSingleBounds = function(singleBounds, idx) {
			var searchKey = "search.bounds.";
			if (idx !== undefined) { //notice !== no typo.
				searchKey = "search.boundsList[" + idx + "].";
			}
			
			var boundsParam = {};
			boundsParam[searchKey + "southWest.lat"] = singleBounds.getSouthWest().lat();
			boundsParam[searchKey + "southWest.lng"] = singleBounds.getSouthWest().lng();
			boundsParam[searchKey + "northEast.lat"] = singleBounds.getNorthEast().lat();
			boundsParam[searchKey + "northEast.lng"] = singleBounds.getNorthEast().lng();
			
			return boundsParam;

		};
		
		if (nefos.IsArray(bounds)) {
			var boundsList = {};
			jQuery.each(bounds, function(idx,el) {
				jQuery.extend(boundsList, convertSingleBounds(el, idx));
			});
			
			return boundsList;
		}
		
		return convertSingleBounds(bounds);
		

	},
	
	loadResourcesInBounds : function(bounds, options, cb) {
		var outer = this;
		var completeData = {};
		var categories = options.categories;
		
		options.loadCompleteResources = options.loadCompleteResources || [];
		
		//loading categories for simple(fast) resources
		var loadSimple = function(){
			var options_simple = jQuery.extend({},options);
			options_simple["LoadResourcesInBounds"] = "action";
			var categories_simple = [];
			for(var i=0; i<categories.length; i++){
				if($.inArray(categories[i], options.loadCompleteResources) == -1){
					categories_simple.push(categories[i]);
				}
			}
			options_simple.categories = categories_simple;
			if(categories_simple.length > 0){
				outer._loadResourcesInBounds(bounds, options_simple, function(data){
					jQuery.extend(completeData, data);
					cb(completeData);
				});
			}
			else{
				cb(completeData);
			}
		};
		
		//loading categories for full(eg polygons) resources
		var options_full = jQuery.extend({},options);
		options_full["LoadFullResourcesInBounds"] = "action";
		var categories_full = [];
		for(var i=0; i<categories.length; i++){
			if($.inArray(categories[i], options.loadCompleteResources) != -1){
				categories_full.push(categories[i]);
			}
		}
		options_full.categories = categories_full;
		if(categories_full.length > 0){
			this._loadResourcesInBounds(bounds, options_full, function(data){
				jQuery.extend(completeData, data);
				loadSimple();
			});
		}
		else{
			loadSimple();
		}
	},
	
	/***
	 * Loads resources from server
	 * @param options Filter options for resource query (needed: leftLowerLat leftLowerLng rightUpperLat rightUpperLng)
	 */
	_loadResourcesInBounds : function(bounds, options, cb) {
		var context = this;
		
		this.setStandardOptions(options);
		
		if (!options["search.categories"] || options["search.categories"].length == 0) {
			cb({});
			return;
		}
		
		var cacheOptions = {};
		jQuery.extend(cacheOptions, options, {bounds: bounds});
		
		var getWithoutCache = function(){
			jQuery.extend(options, context._boundsToParameter(bounds));
			
			if ((options.buffered || options.cache) && nefos.IsArray(bounds)) {
				alert("Buffering and caching currently not implemented for multi bound requests!");
				return;
			}
			
			if (options.buffered) {
				context._getBufferedJSON(context.settings.requestPath + "/frontend/resource/json/Resource.action", options, {
					"cb": function(ary) {
						var data = context._convertArrayToMap(ary);
						cb(data);
					},
					"bounds": bounds,
					"cache" : options.cache
				});
			}
			else {
				$.ajax({
				    url: context.settings.requestPath + "/frontend/resource/json/Resource.action",
				    jsonp: 'jsonp_callback',
				    dataType: 'jsonp',
				    type: 'GET',
				    data: options,
				    success: function(ary) {
				    	var data = context._convertArrayToMap(ary,true);
				    	if (options.cache) {
							jQuery.extend(cacheOptions, {data: data});
							context.cache.putIntoCache(cacheOptions, function(){});
						}
				        cb(data);
				    }
				});
			}
		};
		
		if (options.cache){
			this.cache.getFromCache(cacheOptions, function(result){
				if(result){
					cb(result);
					return;
				}
				else{
					getWithoutCache();
				}
			});
		}
		else{
			getWithoutCache();
		}		
	},
	
	loadResourcesByCategories : function(options, cb) {
		var outer = this;
		var completeData = {};
		var categories = options.categories;
		
		options.loadCompleteResources = options.loadCompleteResources || [];
		
		if(this.cache.getCacheType() == nefos.CACHE_TYPE_SIMPLE){
			alert("method not implemented for this cacheType!");
			return;
		}

		//loading categories for simple(fast) resources
		var loadSimple = function(){
			var options_simple = jQuery.extend({},options);
			var categories_simple = [];
			options_simple["polylineStubs"] = "true";
			for(var i=0; i<categories.length; i++){
				if($.inArray(categories[i], options.loadCompleteResources) == -1){
					categories_simple.push(categories[i]);
				}
			}
			options_simple.categories = categories_simple;
			if(categories_simple.length > 0){
				outer._loadCachedResourcesByCategory(options_simple, function(data){
					jQuery.extend(completeData, data);
					cb(completeData);
				});
			}
			else{
				cb(completeData);
			}
		};
		
		//loading categories for full(eg polygons) resources
		var options_full = jQuery.extend({},options);
		var categories_full = [];
		options_full["polylineStubs"] = "false";
		for(var i=0; i<categories.length; i++){
			if($.inArray(categories[i], options.loadCompleteResources) != -1){
				categories_full.push(categories[i]);
			}
		}
		options_full.categories = categories_full;
		if(categories_full.length > 0){
			this._loadCachedResourcesByCategory(options_full, function(data){
				jQuery.extend(completeData, data);
				loadSimple();
			});
		}
		else{
			loadSimple();
		}
	},
	
	/***
	 * Loads resources from server
	 * @param options Filter options for resource query
	 */
	_loadCachedResourcesByCategory : function(options, cb) {
		var context = this;
		
		if(options.bounds){
			jQuery.extend(options, context._boundsToParameter(options.bounds));
			delete options.bounds;
		}
		
		this.setStandardOptions(options);
		options["LoadResourcesByCategory"] = "action";
		
		if (!options["search.categories"] || options["search.categories"].length == 0 || !options["search.categories"][0]) {
			cb({});
			return;
		}
		
		var cacheOptions = {};
		jQuery.extend(cacheOptions, options);
		
		var getWithoutCache = function(){
			if (options.buffered) {
				this._getBufferedJSON(context.settings.requestPath + "/frontend/resource/json/Resource.action", options, {
					"cb": cb,
					"cache" : options.cache
				});
			}
			else {
				$.ajax({
				    url: context.settings.requestPath + "/frontend/resource/json/Resource.action",
				    jsonp: 'jsonp_callback',
				    dataType: 'jsonp',
				    type: 'GET',
				    data: options,
				    success: function(ary) {
				    	var data = context._convertArrayToMap(ary);
				    	if (options.cache) {
							jQuery.extend(cacheOptions, {data: data});
							context.cache.putIntoCache(cacheOptions, function(){});
						}
				        cb(data);
				    }
				});
			}
		};
		
		if (options.cache){
			this.cache.getFromCache(cacheOptions, function(result){
				if(result){
					cb(result);
					return;
				}
				else{
					getWithoutCache();
				}
			});
		}
		else{
			getWithoutCache();
		}
	},
	
	search : function(options, cb){
		var outer = this;
		var resources = [];
		
		//categories only needed for search in cache, dont send to server
		var categories = options.categories;
		var term = options.term;
		delete options.categories;
		delete options.term;
		
		this.setStandardOptions(options);
		options["Search"] = "action";
		
		if(options.cache){
			var key, temp, resource, found = false;
			
			var fullTextSearch = function(string, term){
				if(string && (string.toLowerCase().match(term.toLowerCase()) == term.toLowerCase())){
					return true;
				}
				return false;
			};
			
			var searchInContent = function(data){
				temp = eval('(' + data + ')');
				for(id in temp){
					resource = temp[id];
					found = false;
					
					if(fullTextSearch(resource.name, term)){
						resources.push(outer.generateResource(resource, {}));
						break;
					}
					if (resource.categories) {
						for(var idx=0;idx<resource.categories.length;idx++){
							if(fullTextSearch(categories[resource.categories[idx]].name, term)){
								resources.push(outer.generateResource(resource, {}));
								found = true;
								break;
							}
						}
					}
					if(found){
						break;
					}
					if(fullTextSearch(resource.teaser, term)){
						resources.push(outer.generateResource(resource, {}));
						break;
					}
					if(!resource.teaser && fullTextSearch(resource.description, term)){
						resources.push(outer.generateResource(resource, {}));
						break;
					}
				}
			};
			
			this.cache.getAllResources(function(rows){
				if(rows != null){
					for(var i=0;i<rows.length;i++){
							searchInContent(rows.item(i).data);
					}
				}
				cb(resources);
			});
		}
		else{
			$.ajax({
			    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
			    jsonp: 'jsonp_callback',
			    dataType: 'jsonp',
			    type: 'GET',
			    data: options,
			    success: function(ary) {
			    	var data = outer._convertArrayToMap(ary);
			    	if (options.cache) {
						jQuery.extend(cacheOptions, {data: data});
						context.cache.putIntoCache(cacheOptions, function(){});
					}
			        cb(outer.generateResources(data, {}));
			    }
			});
		}
	},
	
	_convertArrayToMap : function(ary, useIndex) {
		ary = ary || [];
    	var map = {};
    	$(ary).each(function(index,obj) {
    		if (useIndex) {
    			map[index] = obj;
    		}
    		else {
    			map[obj.id] = obj;
    		}
    	});
    	return map;
	},
	
	cacheResourcesByIds : function(options, cb){
		var outer = this;
		
		this.setStandardOptions(options);
		options.LoadResourcesByIds = "action";
		
		if((options.online === undefined) || options.online == true){
			$.ajax({
			    url: outer.settings.requestPath + "/frontend/resource/json/Resource.action",
			    jsonp: 'jsonp_callback',
			    dataType: 'jsonp',
			    type: 'GET',
			    data: options,
			    success: function(ary) {
			    	var data = outer._convertArrayToMap(ary);
			    	outer.cache.putMapDirectlyIntoCache(data, 'resource', function(success){
			    		cb(success);
			    	});
			    }
			});
		}
		else{
			cb(false);
		}
	},
	
	loadResourcesByIds : function(options, cb){
		var outer = this;
		
		this.setStandardOptions(options);
		options.LoadResourcesByIds = "action";
		
		var loadWithoutCache = function(){
			if((options.online === undefined) || options.online == true){
				$.ajax({
				    url: outer.settings.requestPath + "/frontend/resource/json/Resource.action",
				    jsonp: 'jsonp_callback',
				    dataType: 'jsonp',
				    type: 'GET',
				    data: options,
				    success: function(ary) {
				    	var data = outer._convertArrayToMap(ary);
				        cb(data);
				    }
				});
			}
			else{
				cb(null);
			}
		}
		
		if(options.cache){
			this.cache.loadResourcesByIds(options.resIds, function(result){
				if(result){
					cb(result);
				}
				else{
					loadWithoutCache();
				}
			});
		}
		else{
			loadWithoutCache();
		}
	},
	
	loadResources : function(options, cb){
		var outer = this;
		this.setStandardOptions(options);
		options.LoadResourceArray = "action";

		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(ary) {
		    	var data = outer._convertArrayToMap(ary);
		        cb(data);
		    }
		});
	},
	
	/***
	 * Loads linked resources from server
	 * @param options Filter options for resource query (needed: resourceId)
	 */
	loadLinkedResources : function(options, cb) {
		var outer = this;
		this.setStandardOptions(options);
		options.LoadLinkedResources = "action";
		
		this.cache.getDirectlyFromCache('linkedResources' + options.resourceId, function(result){
			if(result && options.cache){
				cb(result);
			}
			else{
				$.ajax({
				    url: outer.settings.requestPath + "/frontend/resource/json/Resource.action",
				    jsonp: 'jsonp_callback',
				    dataType: 'jsonp',
				    type: 'GET',
				    data: options,
				    success: function(ary) {
				    	
				    	var idList = "";
				    	for(id in ary){
				    		idList += id + ",";
				    	}
				    	
				    	var data = outer._convertArrayToMap(ary);
				    	outer.cache.putDirectlyIntoCache('linkedResources' + options.resourceId, data, function(){});
				        cb(data);
				    }
				});
			}
		});
	},
	
	/***
	 * Loads categories from server
	 * @param options Filter options for category query
	 */
	loadResourceCategories : function(options, cb) {
		var outer = this;
		this.setStandardOptions(options);
		options.LoadResourceCategories = "action";
		
		var loadWithoutCache = function(){
			$.ajax({
			    url: outer.settings.requestPath + "/frontend/category/json/Category.action",
			    jsonp: 'jsonp_callback',
			    dataType: 'jsonp',
			    type: 'GET',
			    data: options,
			    success: function(ary) {
			    	for (var i=0;i<ary.length;i++) {
			    		ary[i].choppedOrderNr = nefos.ChopOrdernr("" + ary[i].orderNr);
			    	}
			    	
			    	var data = outer._convertArrayToMap(ary);
			    					    				    	
			    	outer.cache.putDirectlyIntoCache('categories' + nefos.Globals.mandatorId, data, function(){});
			        cb(data);
			    }
			});
		};
		
		if((options.cache === undefined) || options.cache){
			this.cache.getDirectlyFromCache('categories' + nefos.Globals.mandatorId, function(result){
				if(result){
					cb(result);
				}
				else{
					loadWithoutCache();
				}
			});
		}
		else{
			loadWithoutCache();
		}
	},
	
	loadPointsOfPolyline : function(options, cb) {
		this.setStandardOptions(options);
		options["LoadPointsOfPolyline"] = "action";

		$.ajax({
		    url: this.settings.requestPath + "/frontend/resource/json/Resource.action",
		    jsonp: 'jsonp_callback',
		    dataType: 'jsonp',
		    type: 'GET',
		    data: options,
		    success: function(data) {
		        cb(data);
		    }
		});
	},
	
	/***
	 * Sets the standard options for server queries
	 * @param options Map on which to set the standard options.
	 */
	setStandardOptions : function(options) {
		options["apiKey"] = this.apiKey;
				
		if (options.categories) {
			options["search.categories"] = options.categories;
			delete options.categories;
		}
		
		if (options.contentQuery) {
			options["search.contentString"] = options.contentQuery;
			delete options.contentQuery;
		}
		
		if (options.dateLow) {
			options["search.dateLow"] = options.dateLow;
			delete options.dateLow;
		}
		
		if (options.dateHigh) {
			options["search.dateHigh"] = options.dateHigh;
			delete options.dateHigh;
		}
		
		if (options.bounds) {
			options["search.bounds"] = options.bounds;
			delete options.bounds;
		}
		
		if (options.language) {
			options["search.language"] = options.language;
		}
		else {
			options["search.language"] = this.settings.language;
		}
		
		if (options.loadLinkedMediums) {
			options["search.loadLinkedMediums"] = options.loadLinkedMediums;
			delete options.loadLinkedMediums;
		}
		
		if (options.loadBase64Mediums) {
			options["search.loadBase64Mediums"] = options.loadBase64Mediums;
			delete options.loadBase64Mediums;
		}
		
		if (options.objectTypeName) {
			options["search.objectTypeName"] = options.objectTypeName;
			delete options.objectTypeName;
		}

	},
	
	/***
	 * Get application base path
	 * @returns {String}
	 */
	getBasePath : function() {
		return "/" + location.href.replace(/http:\/\/(.*?)\/(.*?)\/(.*)/,"$2");
	},
	
	/***
	 * Converts json-Resource to Objects to show on map
	 * @param json json-Object with resource to convert
	 * @param inEditMode on edit page, from- and toZoomlevel gets ignored
	 * @returns {nefos.Resource}
	 */
	generateResource : function(json, settings, inEditMode){
		settings = settings || {};
		
		this.settings.doNotCluster = settings.doNotCluster || false;
		this.settings.showMarkerMenu = settings.showMarkerMenu || false;
		this.settings.clickableLinestring = settings.clickableLinestring || false;
		this.settings.isLinkedResource = settings.isLinkedResource || false;
		this.settings.draggable = settings.draggable || false;
		
		this.settings.polygonHoverable = settings.polygonHoverable || false;
		this.settings.polygonClickable = settings.polygonClickable || false;
		
		this.settings.polylineHoverable = settings.polylineHoverable || false;
		this.settings.polylineClickable = settings.polylineClickable || false;

				
		var geoObjects = new Array();
		var geo = null;
		
		if(json.geoObjects){
			for(var i=0; i<json.geoObjects.length; i++){
				if(json.geoObjects[i].coordinates != null || json.geoObjects[i].outerRing != null){
					
					var fromZoomlevel = json.geoObjects[i].displayFromZoomLevel;
					var toZoomlevel = json.geoObjects[i].displayToZoomLevel;
					
					if(inEditMode){
						fromZoomlevel = 0;
						toZoomlevel = 18;
					}
					else{
						if((fromZoomlevel == null) || isNaN(fromZoomlevel)){
							fromZoomlevel = json.displayFromZoomlevel;
						}
						if((toZoomlevel == null) || isNaN(toZoomlevel)){
							toZoomlevel = json.displayToZoomlevel;
						}
					}
					
					if(json.geoObjects[i].type == "point"){
						geo = this.generatePoint(json.geoObjects[i], fromZoomlevel, toZoomlevel, this.settings.draggable)
					} else if(json.geoObjects[i].type == "linestring"){
						geo = this.generateLinestring(json.geoObjects[i], fromZoomlevel, toZoomlevel)
					} else if(json.geoObjects[i].type == "polygon"){
						geo = this.generatePolygon(json.geoObjects[i], fromZoomlevel, toZoomlevel)
					}
					
					if(geo){
						geoObjects.push(geo);
					}
				}
			}
		}
		
		jQuery.extend(json.metadata, {
			foreignId: json.foreignId,
			name: json.name,
			creationDate: json.creationDate,
			editDate: json.editDate,
			teaser: json.teaser,
			description: json.description,
			isLinkedResource: this.settings.isLinkedResource,
			mediums: json.mediums,
			categories: json.categories,
			repetitions: json.repetitions,
			objectType: {name: json.objectType, id: json.objectTypeId}
		});
		
		json.metadata.objecttype = json.metadata.objectType; //[FF] Backwards compat, will be removed!
		
		var cluster = true;
		if(this.settings.doNotCluster && json.metadata){
			if(json.metadata.categories && $.inArray(json.metadata.categories[0], this.settings.doNotCluster) != -1){
				cluster = false;
			}
		}
		
		var resource = new nefos.Resource(json.id,
			json.metadata,
			geoObjects,
			{
				clusterable : cluster
			}
		);
		
		return resource;
	},
	
	/***
	 * Converts json-Resources to Objects to show on map
	 * @param json json-Object with resources to convert
	 * @returns List<nefos.Resource>
	 */
	generateResources : function(json, settings){		
		var resources = new Array();
		
		settings = settings || {};
		
		settings.checkResourceIdCallback = settings.checkResourceIdCallback || function(id) { return true;};
		
		for(var id in json){
			if (settings.checkResourceIdCallback(id)) {
				resources.push(this.generateResource(json[id], settings));
			}
		}
		
		return resources;
	},
	
	_preparePolygonRings : function(geoObject) {
		var paths = [];
		var outer = [];
		
		//if encoded ring
		if(!geoObject.outerRing[0].x){
			geoObject.outerRing = this.decodeGMPolyline(geoObject.outerRing[0]);
		}
		
		for(var i=0; i<geoObject.outerRing.length; i++){
			outer.push(new nefos.LatLng(geoObject.outerRing[i].y, geoObject.outerRing[i].x, geoObject.outerRing[i].z));
		}
		paths.push(outer);
		
		if(geoObject.innerRings){
			for(var i=0; i<geoObject.innerRings.length; i++){
				
				//if encoded ring
				if(!geoObject.innerRings[i][0].x){
					geoObject.innerRings[i] = this.decodeGMPolyline(geoObject.innerRings[i][0]);
				}
				
				var inner = [];
				for(var j=0;j<geoObject.innerRings[i].length;j++){
					inner.push(new nefos.LatLng(geoObject.innerRings[i][j].y, geoObject.innerRings[i][j].x, geoObject.innerRings[i][j].z));
				}
				paths.push(inner);
			}
		}
		
		return paths;
	},
	
	/***
	 * Create a polygon from a json-Object
	 * @param geoObject json-Object
	 * @param fromZoomlevel
	 * @param toZoomlevel
	 * @returns {nefos.Polygon}
	 */
	generatePolygon : function(geoObject, fromZoomlevel, toZoomlevel){
		var paths = this._preparePolygonRings(geoObject);
		
		var startIcon = {
			image: geoObject.startIcon
		};
		jQuery.extend(true,startIcon,this.settings.iconConfig);
		
		var polygon = new nefos.Polygon({
			points : paths,
			name : geoObject.name,
			teaser : geoObject.teaser,
			description: geoObject.description,
			stub: geoObject.stub,
			fromZoomLevel: fromZoomlevel,
			toZoomLevel: toZoomlevel,
			strokeColor: geoObject.strokeColor,
			strokeWidth: geoObject.lineWidth,
			strokeOpacity: geoObject.strokeOpacity / 100,
			fillColor: geoObject.fillColor,
			fillOpacity: geoObject.fillOpacity / 100,
			clickable: this.settings.polygonClickable,
			hoverable: this.settings.polygonHoverable
		});
		
		if(geoObject.startIcon && geoObject.stub){
			polygon.setCenterMarker(new nefos.Marker({
						position: paths[0][0],
						clickable: true,
						fromZoomLevel: fromZoomlevel,
						toZoomLevel: toZoomlevel, 
						highlight: true,
						hoverable: true,
						icon : startIcon,
						shadow: this.settings.iconShadowConfig,
						clusterIcon: this.settings.clusterIconConfig,
						alwaysVisible: true
					})
			);
		}
		
		return polygon;
	},
	
	decodeGMPolyline : function(encoded){
		var length = encoded.length;
		var index = 0;
		var points = [];
		var y = 0;
		var x = 0;
		var z = 0;

		if(encoded == ""){
			return points;
		}
		
		while (index < length)
		{
			var b = 0;
		    var shift = 0;
		    var result = 0;
		    
		    do
		    {
		      b = encoded.charCodeAt(index) - 63;
		      index++;
		      
		      result |= (b & 0x1f) << shift;
		      shift += 5;
		    }
		    while (b >= 0x20);
		    var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
		    y += dlat;
		    
		    
		    shift = 0;
		    result = 0;
		    do
		    {
		      b = encoded.charCodeAt(index) - 63;
		      index++;
		      result |= (b & 0x1f) << shift;
		      shift += 5;
		    }
		    while (b >= 0x20);
		    var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
		    x += dlng;
		    
		    shift = 0;
		    result = 0;
		    do
		    {
		      b = encoded.charCodeAt(index) - 63;
		      index++;
		      result |= (b & 0x1f) << shift;
		      shift += 5;
		    }
		    while (b >= 0x20);
		    var dalt = ((result & 1) ? ~(result >> 1) : (result >> 1));
		    z += dalt;
	
		    var coord = {
	    		x: x * 1e-5,
	    		y: y * 1e-5,
	    		z: z * 1e-5
		    };
		    
		    points.push(coord);
		  }

		return points;
	},
	
	/***
	 * Create a linestring from a json-Object
	 * @param geoObject json-Object
	 * @param fromZoomlevel
	 * @param toZoomlevel
	 * @returns {nefos.Linestring}
	 */
	generateLinestring : function(geoObject, fromZoomlevel, toZoomlevel){
		var geoPoints = new Array();	
		var coords = geoObject.coordinates;
		
		if(!coords[0].x){
			coords = this.decodeGMPolyline(coords[0]);
		}
		
		for(var i=0; i<coords.length; i++){
			geoPoints.push(new nefos.LatLng(coords[i].y, coords[i].x, coords[i].z));
		}
		
		if(geoPoints.length < 1){
			return null;
		}
		
		var startIcon = {
			image: geoObject.startIcon
		};
		jQuery.extend(true,startIcon,this.settings.iconConfig);
		
		var middleIcon = {
				image: geoObject.middleIcon
			};
		jQuery.extend(true,middleIcon,this.settings.iconConfig);
		
		var endIcon = {
				image: geoObject.endIcon
			};
		jQuery.extend(true,endIcon,this.settings.iconConfig);
				
		var polyline = new nefos.Polyline({
			points : geoPoints,
			name : geoObject.name,
			teaser : geoObject.teaser,
			description: geoObject.description,
			strokeColor: geoObject.strokeColor,
			strokeWidth: geoObject.lineWidth,
			strokeOpacity: geoObject.strokeOpacity / 100,
			fromZoomLevel: fromZoomlevel,
			toZoomLevel: toZoomlevel,
			clickable: this.settings.clickableLinestring,
			length: geoObject.length,
			stub: geoObject.stub,
			zIndex: 5,
			clickable: this.settings.polylineClickable,
			hoverable: this.settings.polylineHoverable
		});
		
		if(geoObject.startIcon){
			polyline.setStartMarker(new nefos.Marker({
						position: geoPoints[0],
						clickable: true,
						fromZoomLevel: fromZoomlevel,
						toZoomLevel: toZoomlevel, 
						highlight: true,
						hoverable: true,
						icon : startIcon,
						shadow: this.settings.iconShadowConfig,
						clusterIcon: this.settings.clusterIconConfig,
						alwaysVisible: true
					})
			);
		}
		
		if (geoObject.middleIcon && geoPoints.length > 1) {
			polyline.setMiddleMarker(new nefos.Marker(
					{
						position: geoPoints[Math.floor((geoPoints.length-1) / 2)],
						clickable: true,
						fromZoomLevel: fromZoomlevel,
						toZoomLevel: toZoomlevel,
						highlight: true,
						hoverable: true,
						alwaysVisible: true,
						icon : middleIcon,
						clusterIcon: this.settings.clusterIconConfig,
						shadow: this.settings.iconShadowConfig
					})
			);
		}
		
		if(geoObject.endIcon){
			polyline.setEndMarker(new nefos.Marker(
					{
						position: geoPoints[geoPoints.length-1],
						clickable: true,
						fromZoomLevel: fromZoomlevel,
						toZoomLevel: toZoomlevel,
						highlight: true,
						hoverable: true,
						alwaysVisible: true,
						icon : endIcon,
						clusterIcon: this.settings.clusterIconConfig,
						shadow: this.settings.iconShadowConfig
					})
			);
		}
		
		return polyline;
	},
	
	/***
	 * Create a point from a json-Object
	 * @param geoObject json-Object
	 * @param fromZoomlevel
	 * @param toZoomlevel
	 * @returns {nefos.Point}
	 */
	generatePoint : function(geoObject, fromZoomlevel, toZoomlevel, isDraggable){
		var markerIcon = {
				image: geoObject.startIcon
			};
		jQuery.extend(true,markerIcon,this.settings.iconConfig);
		
		var marker = new nefos.Marker({
			lat: geoObject.coordinates[0].y,
			lng: geoObject.coordinates[0].x,
			alt: geoObject.coordinates[0].z,
			name : geoObject.name,
			teaser : geoObject.teaser,
			description: geoObject.description,
			fromZoomLevel: fromZoomlevel,
			toZoomLevel: toZoomlevel,
			hoverable: true,
			icon :markerIcon,
			draggable: isDraggable,
			shadow: this.settings.iconShadowConfig,
			clusterIcon: this.settings.clusterIconConfig,
			clickable: true,
			highlight: true,
			showMarkerMenu : this.settings.showMarkerMenu
		});
		return marker;
	},
	
	/***
	 * Generate the Coordinates of a polyline
	 * @param json The json Object with coordinates
	 * @returns {Array}
	 */
	generateCoordinates : function(json){
		var geoPoints = new Array();
		
		for (var i=0;i<json.length;i++) {
			var coords = json[i];
			
			if(!coords[0].x){
				coords = this.decodeGMPolyline(coords[0]);
			}
			
			geoPoints.push([]);
			for(var j=0; j<coords.length; j++){
				geoPoints[i].push(new nefos.LatLng(coords[j].y, coords[j].x, coords[j].z));
			}
		}

		return geoPoints;
	}
});


/**
 * TODO: make this general for iOS and Android
 */


nefos.MobilePage = nefos.ZillertalMobilePage.extend({
	init : function(settings) {
        nefos.Time("init","Starting initialisation");
		settings.cacheMethod = nefos.CACHE_TYPE_MOBILE_DB;
        settings.resizeSplash = false;
        settings.maxPolylinePoints = settings.maxPolylinePoints || 150;
        
        this.requestHost = settings.requestHost || "mapservices.eu";
    	this.requestBasePath = settings.requestBasePath || "nefos_app";
    	this.connectionType = navigator.network.connection.type;
    	
		this._super(settings);
	},
	
	onMapLoad : function() {
		this._super();
	},
	
	getPageImage : function(image, mobile){
		return 'generated/page/pics/' + image;
	},
	
	getNativeAppImage :function(file){
		if(this.localStorage.getItem("mediaPath")){
			return this.localStorage.getItem("mediaPath") + '/' + file + this.imageSuffix;
		}
		return '';
	},
	
	openNativeBrowserPlugin : function(url){
		if (this.connectionOnline) {
			this.showInfoPanel(nefos._('openingExternalBrowser'));
			window.plugins.childBrowser.showWebPage(url);
		}
		else{
			this.showInfoPanel(nefos._('connectionNeeded'));
		}
	},
	
	onResourceDetailShow : function() {
		var outer = this;
		this.$resourceDetailPanel.find("a").click(function(e) {
			e.preventDefault();
			var href = $(this).attr("href");
			
			if (href.indexOf("tel:") == -1 && href.indexOf("mailto:") == -1) {
				outer.openNativeBrowserPlugin(href);
			}
			else {
				window.location.href = href;
			}
		});
	},
	
	onStartEntryMediumsSet : function(){
		this.startEntryMediumsSet = true;
		this.emitEvent("downloadStartEntryMediums");
	},
	
	onLockedContentMediumDownload : function(){
		this.lockedContentMediumDownload = true;
		this.emitEvent("downloadStartEntryMediums");
	},
	
	//download startEntryMediums and masterResource mediums if locked content
	onDownloadStartEntryMediums : function(){
		//both events have taken place
		if(this.startEntryMediumsSet && this.lockedContentMediumDownload){
			this.setResourceCacheComplete();
			this.setTileCacheComplete();
	    	
			if(this.startEntryMediumIds.length > 0){
				if (!this.isMediumCacheComplete()) {
					nefos.L("mobile", "Downloading mediums for caching", this.startEntryMediumIds,this.startEntryLoadFullMedium);
					this.updateDownloadProgress("#loading-downloadImages", nefos._('downloadingMediums'));
					this.cacheMediums(this.startEntryMediumIds, this.startEntryLoadFullMedium);
				}
			}
			else{
				this.setMediumCacheComplete();
				this.checkCachingComplete();
			}
		}
	},
	
	checkProgressFileSize : function(fileEntry, progressTarget, progressText){
		var outer = this;
		
		fileEntry.file(function(file){
			outer.updateDownloadProgress(progressTarget, progressText + " " + Math.round(file.size/1024)/1000 + " Mbyte", true);
		});
	},
	
	resetDownloadProgress : function(resetTileCache){
		$("div.nefos-loadingItem").removeClass("nefos-loadingFinished");
		$("div.nefos-loadingItem").addClass("nefos-loadingPending");
		$("div.nefos-loadingItem").removeClass("nefos-loadingCurrent");
		$("div.nefos-loadingItem").removeClass("nefos-downloadItemOk");
		$('div.nefos-downloadItem').remove();
		
		if(!resetTileCache){
			$($("div.nefos-loadingItem").get(0)).addClass("nefos-loadingFinished").prepend("<div class='nefos-downloadItem nefos-downloadItemOk'></div>");
			$($("div.nefos-loadingItem").get(1)).addClass("nefos-loadingFinished").prepend("<div class='nefos-downloadItem nefos-downloadItemOk'></div>");
			$($("div.nefos-loadingItem").get(2)).removeClass("nefos-loadingPending").addClass("nefos-loadingCurrent");
		}
	},
	
	updateDownloadProgress : function(activeStep, text, failed) {
		var $activeStep = $(activeStep);
		
		var cur = $("#downloadProgress").children(".nefos-loadingCurrent").get(0);
		
		if (text) {
			$activeStep.html(text);
		}
		
		if (cur && cur.id === $activeStep.get(0).id) {
			return;
		}
		
		if(failed){
			$("#downloadProgress").children(".nefos-loadingCurrent").removeClass("nefos-loadingCurrent").addClass("nefos-loadingFinished").prepend("<div class='nefos-downloadItem nefos-downloadItemFailed'></div>");
		}
		else{
			$("#downloadProgress").children(".nefos-loadingCurrent").removeClass("nefos-loadingCurrent").addClass("nefos-loadingFinished").prepend("<div class='nefos-downloadItem nefos-downloadItemOk'></div>");
		}
		
		$activeStep.removeClass("nefos-loadingPending").addClass("nefos-loadingCurrent");
	},
	
	setSystemLanguage : function(languages){
		var systemLang;
		
		if ( navigator && navigator.userAgent
			&& (systemLang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
				systemLang = systemLang[1];
		}

		if (!systemLang && navigator) {
			if (navigator.language) {
				systemLang = navigator.language;
			} else if (navigator.browserLanguage) {
				systemLang = navigator.browserLanguage;
			} else if (navigator.systemLanguage) {
				systemLang = navigator.systemLanguage;
			} else if (navigator.userLanguage) {
				systemLang = navigator.userLanguage;
			}
			systemLang = systemLang.substr(0, 2);
		}

		var setDefault = true;
		for(lang in languages){
			if(languages[lang].languageCode == systemLang){
				nefos.L("mobile", "setting language " + systemLang);
				nefos.Lang.language = systemLang;
				setDefault = false;
			}
		}
		
		if(setDefault){
			nefos.L("mobile", "setting default language de");
			nefos.Lang.language = 'de';
		}
	},
	
	deleteFile : function(path, cb){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
			fs.root.getFile(path, {create: false, exclusive: false}, function(fileEntry){
				fileEntry.remove(function(){cb(true);}, function(){cb(false);});
			});
		});
	},
	
	downloadTiles : function(cats){
		var outer = this;
		
		nefos.L("mobile", "downloading tiles");
		this.updateDownloadProgress('#loading-downloadTiles', nefos._('loadingMap'));
		
		var content = this.masterResource.content;
    	if(content.sLat && content.nLat && content.wLng && content.eLng && content.mapLayer){
    		var url = "http://" + outer.requestHost + "/" + outer.requestBasePath + 
    			"/frontend/view/Tile.action?ZippedTiles=action&apiKey=" + nefos.Globals.apiKey + 
    			"&layer=" + content.mapLayer + "&type=" + content.tileType + 
    				"&fromZoom=" + content.minZoom + "&toZoom=" + content.maxZoom + 
    				"&nLat=" + content.nLat + "&sLat=" + content.sLat + "&wLng=" + content.wLng + "&eLng=" + content.eLng + 
    				"&suffix=" + this.imageSuffix;
    				
    		
			Downloader.requestURL = url;
			Downloader.filename = content.mapLayer + "/tiles.zip";
			Downloader.downloadFile(function(dlPath){
				
				if(!dlPath){
					//error downloading tiles
					outer.setTileCacheComplete();
					outer.updateDownloadProgress('#loading-unzipTiles', nefos._('unzipMap'), true);
					outer.cacheAllResources(cats);
					return;
				}
				else{
					outer.updateDownloadProgress('#loading-unzipTiles', nefos._('unzipMap'));
				}
				
				//setting path to unzipped tiles
				outer.localStorage.setItem("tilePath", dlPath.substring(0, dlPath.lastIndexOf("/")).replace(/file\:\/\//,"") + "/tiles");
				
				outer.unzip(dlPath, function(status, msg){
					outer.deleteFile(dlPath.replace(/file\:\/\//,""), function(success){});
					outer.setTileCacheComplete();
					outer.cacheAllResources(cats);
				});
			});
    	}
    	else{
    		this.showInfoPanel(nefos._('errorReadingBounds'));
    		this.setResourceCacheComplete();
			this.cacheAllResources(cats);
    	}
	},
	
	isNativeApp : function(){
		return true;
	},
	
	getNativeAppResource : function(resource){
		if(resource){
			var splitted = resource.split("/");
			return "generated/page/pics/" + splitted[splitted.length-1];
		}
		return "";
	},
	
	isUseOfflineCache : function(){
		return true;
	},
	
	makeOfflineAvailiable : function(){
		
		if(this.connectionType != Connection.WIFI){
			if(!confirm(nefos._('noWifi'))){
				this.showStart();
				return;
			}
		}
		
		var categories = this.getOrderedCategories('mobile');
		var cats = [];
		
		if(this.isContentUnlocked()){
			nefos.L("mobile", "content is unlocked");
			
			//regular categories
	    	for(id in categories){
	    		cats.push(categories[id].id);
	    	}
	    	
	    	//special categories for download, eg route verte
	    	if(this.getSpecialCategories){
	    		var special = this.getSpecialCategories();
	    		
	    		for(idx in special){
	    			cats.push(special[idx]);
	    		}
	    	}
			
			if(!this.isTileCacheComplete()){
				this.downloadTiles(cats);
			}
			else{
				//cache resources
				nefos.L("mobile", "tiles already cached, cache resources");
				this.cacheAllResources(cats);
			}
		}
		else{
			nefos.L("mobile", "content locked, emitting event");
			this.emitEvent("lockedContentMediumDownload");
		}
	},
	
	isCacheComplete : function() {
		return this.isResourceCacheComplete() && (this.isTileCacheComplete() || !this.isContentUnlocked()) && this.isMediumCacheComplete();
	},	
	
	resetCache : function(clearResourceCache, resetTileCachingComplete) {
		this.localStorage.removeItem("resourceCachingComplete");
		this.localStorage.removeItem("mediumCachingComplete");
		
		if(resetTileCachingComplete){
			this.localStorage.removeItem("tileCachingComplete");
		}
		
		if (clearResourceCache) {
			//clear all resources but keep masterresource
			this.dataService.clearResourceCache(this.getMasterResourceId());
		}
	},
	
	setResourceCacheComplete : function(reset) {
		if (reset !== undefined && reset == false) {
			this.localStorage.removeItem("resourceCachingComplete");
		}
		else  {
			this.localStorage.setItem("resourceCachingComplete", "" + (new Date()).getTime());
		}
	},
	
	setTileCacheComplete : function(reset) {
		if (reset !== undefined && reset == false) {
			this.localStorage.removeItem("tileCachingComplete");
		}
		else {
			this.localStorage.setItem("tileCachingComplete", "" + (new Date()).getTime());
		}
	},
	
	setMediumCacheComplete : function(reset) {
		if (reset !== undefined && reset == false) {
			this.localStorage.removeItem("mediumCachingComplete");
		}
		else {
			this.localStorage.setItem("mediumCachingComplete", "" + (new Date()).getTime());
		}
	},
	
	isResourceCacheComplete : function() {
		return this.localStorage.getItem("resourceCachingComplete") != null;
	},
	
	isTileCacheComplete : function() {
		return this.localStorage.getItem("tileCachingComplete") != null;
	},
	
	isMediumCacheComplete : function() {
		return this.localStorage.getItem("mediumCachingComplete") != null;
	},
	
	//TODO: make better.
    checkCachingComplete : function(){
    	if(!this.isCacheComplete()){
    		return;
    	}
    	this.emitEvent('cachingComplete');
    },
	
	//caching of all resources complete for offline app
    onCachingComplete : function(){
    	nefos.L("mobile","caching completed");
    	this.localStorage.setItem("lastUpdate", ((new Date()).addDays(7)).getTime());
    	this.updateDownloadProgress("#loading-startingApp");
    	nefos.Time("init","Finished loading app");
    	
    	this.showStart(true, true);
    },
    
    setEmptyCategories : function(categories){
    	this.localStorage.removeItem("emptyCategories");
    	this.localStorage.setItem("emptyCategories", categories);
    },
    
    //make all Resources availiable offline
    cacheAllResources : function(cats){
    	var outer = this;
    	var catLength = cats.length;
    	var mediumIds = this.startEntryMediumIds;
    	var loadFullMedium = this.startEntryLoadFullMedium;
    	var metadata;
    	    	
    	if(catLength < 1){
    		//all resources cached
			nefos.L("mobile","no resources and mediums for caching");
			outer.setResourceCacheComplete();
			outer.setMediumCacheComplete();
	    	outer.checkCachingComplete();
	    	return;
    	}
    	
    	var cacheResources = function(catArray, i, bounds){
    		outer.updateDownloadProgress("#loading-downloadResources", nefos._('loadingObjects') + " " + i + "/" + (catLength-1));
    		
    		outer.dataService.cacheAllResources({
        		categories: [catArray[i]],
    			language: nefos.Lang.language,
        		maxPoints: 150,
        		encoded: true,
        		bounds: bounds
        	}, function(data){
        		//collect medium ids for getting pictures later
        		var tempRes;
        		for(key in data){
        			tempRes = data[key];
        			for(idx in tempRes.mediums){
        				if($.inArray(tempRes.mediums[idx].id, mediumIds) == -1){
        					mediumIds.push(tempRes.mediums[idx].id);
        					//load medium size
        					loadFullMedium += "1,";
        				}
        			}
        			
        			for(meta in tempRes.metadata){
        				metadata = tempRes.metadata[meta];
        				//is medium property
        				if(metadata.match && metadata.match("^MediaUtils.action")=="MediaUtils.action"){
        					if($.inArray(outer.getMetadataImageId(metadata), mediumIds) == -1){
	        					mediumIds.push(outer.getMetadataImageId(metadata));
	        					
	        					//load original size? 0=thumbnail 1=medium 2=orig
	        					if(metadata.match("type=file")=="type=file"){
	        						loadFullMedium += "2,";
	        					}
	        					else if(metadata.match("type=medium")=="type=medium"){
	        						loadFullMedium += "1,";
	        					}
	        					else{
	        						loadFullMedium += "0,";
	        					}
        					}
        				}
        			}
        		}
        		
        		if(i == catLength-1){

        			//all resources cached
	    			nefos.L("mobile","all resources cached");
	    			outer.setResourceCacheComplete();
	    			
        			//loading zipped mediums if availiable and is native app
        			if(mediumIds.length > 0){
	        			if (!outer.isMediumCacheComplete()) {
	        				nefos.L("mobile", "Downloading mediums for caching", mediumIds,loadFullMedium);
	        				outer.updateDownloadProgress("#loading-downloadImages", nefos._('downloadingMediums'));
	        				outer.cacheMediums(mediumIds, loadFullMedium);
	        			}
        			}
        			else{
        				outer.checkCachingComplete();
        			}
	    	    	return;
        		}
        		
        		cacheResources(catArray, i+1, bounds);
        	});
    	};
    	
    	var bounds;
    	if(outer.masterResource.content.sLat && outer.masterResource.content.nLat && outer.masterResource.content.wLng && outer.masterResource.content.eLng){
    		bounds = new nefos.LatLngBounds(
    			new nefos.LatLng(outer.masterResource.content.sLat, outer.masterResource.content.wLng),
    			new nefos.LatLng(outer.masterResource.content.nLat, outer.masterResource.content.eLng));
    	}
    	
    	var now = new Date();
    	var emptyCategories = [];
    	
    	var cacheCategories = function(catArray, i){
    		outer.dataService.loadResourcesByCategories({
    			categories: [catArray[i]],
    			buffered: false,
    			dateLow: now.getTime(),
    			dateHigh: now.addDays(7).getTime(),
    			clickableLinestring: true,
    			cache: true,
    			bounds: bounds,
    			language: nefos.Lang.language,
    			loadCompleteResources: []
    		}, function(data){
    			outer.updateDownloadProgress("#loading-downloadCategories", nefos._('loadingCategories') + " " + i + "/" + (catLength-1));

    			//create array for categories without content (not shown in menu later)
    			if(jQuery.isEmptyObject(data)){
    				emptyCategories.push(catArray[i]);
    			}
    			
    			if(i == catLength-1){
    				nefos.L("mobile","all categories cached");
    				outer.setEmptyCategories(emptyCategories);
    				outer.updateDownloadProgress("#loading-downloadResources", nefos._('loadingObjects') + " " + i + "/" + (catLength-1));
    				cacheResources(cats, 0, bounds);
    				return;
    			}
    			
    			cacheCategories(catArray, i+1);
    		});
    	};
    	
    	if(!outer.isResourceCacheComplete()){
    		nefos.L("mobile", "caching all categories");
    		outer.updateDownloadProgress("#loading-downloadCategories", nefos._('loadingCategories'));
    		cacheCategories(cats, 0);
    	}
    	else{
    		nefos.L("mobile", "resources already cached, ignoring mediums...");
    		outer.setMediumCacheComplete();
    		outer.checkCachingComplete();
    	}
    },
    
    cacheMediums : function(mediumIds, loadFullMedium) {
		var outer = this;
		
		var idParam = "";
		for(idx in mediumIds){
			idParam += "&" + encodeURIComponent("mediumIds[" + idx + "]") + "=" + mediumIds[idx];
		}
		
		var url = "http://" + outer.requestHost + "/" + outer.requestBasePath + 
			"/frontend/medium/json/Medium.action?apiKey=" + nefos.Globals.apiKey + 
			"&loadFullMedium=" + loadFullMedium + idParam + 
			"&masterResourceId=" + this.masterResource.id + 
			"&suffix=" + this.imageSuffix;
		
		nefos.L("app", "download url: ", url);
		
		Downloader.requestURL = url;
		Downloader.filename = "mediums/mediums.zip";
		Downloader.downloadFile(function(dlPath){
			
			if(!dlPath){
				//error downloading mediums
				outer.setMediumCacheComplete();
				outer.updateDownloadProgress("#loading-unzipImages", nefos._('unzipMediums'), true);
				outer.checkCachingComplete();
				return;
			}
			else{
				outer.updateDownloadProgress("#loading-unzipImages", nefos._('unzipMediums'));
			}
			
			//setting mediaPath for media callback
			outer.localStorage.setItem("mediaPath", dlPath.substring(0, dlPath.lastIndexOf("/")));
			
			outer.unzip(dlPath, function(status, msg){
				outer.deleteFile(dlPath.replace(/file\:\/\//,""), function(success){});
				outer.setMediumCacheComplete();
				outer.checkCachingComplete();
			});
		});
	},

	unzip : function(filePath, cb) {
		var path = filePath.replace(/file\:\/\//,"");
		var ZipClient = new ExtractZipFilePlugin();
		
		ZipClient.extractFile(path,
		function(msg) {
			if(cb){cb(true);}
		},
		function(msg) {
			console.log("unzip FAILED: " + JSON.stringify(msg));
			if(cb){cb(false);}
		},'ExtractZipFilePlugin');
	},
	
	onPageFirstLoad : function() {
		
		//lock content if a year old
		if(this.isContentUnlocked()){
			var unlockTime = this.localStorage.getItem("contentUnlocked");
			var yearBefore = ((new Date()).addDays(-365)).getTime();
			
			if(yearBefore > unlockTime){
				nefos.L("mobile", "locking content, a year old");
				this.lockContent();
			}
		}
		
		if (this.isCacheComplete()) {
			//update if older than 7 days
			if(this.localStorage.getItem("lastUpdate")){
				var lastUpdate = this.localStorage.getItem("lastUpdate");
				var now = (new Date()).getTime();
				
				if((lastUpdate < now) && this.connectionOnline && (this.connectionType == Connection.WIFI)){
					nefos.L("mobile", "last update 7 days ago, try update");
					this.reloadApp();
					return;
				}
			}
			this._super();
		}
		else {
			this.panelManager.showPanel($('#downloadProgress'), false);
			this.makeOfflineAvailiable();
		}
	},
	
	cacheStartEntries : function(ids){
		this.cacheResourcesByIds(ids);
	},
	
	cacheResourcesByIds : function(ids, cb){
		var outer = this;
		var splitted;
		
		if($.isArray(ids)){
			splitted = ids;
		}
		else{
			splitted = (ids + "").split(",");
		}
		
		this.dataService.cacheResourcesByIds({
			resIds: splitted,
			language: nefos.Lang.language,
			loadLinkedMediums: true,
			loadBase64Mediums: false,
			maxPoints: outer.settings.maxPolylinePoints,
			encoded: true,
			online: outer.connectionOnline
		}, function(success){
			if(cb){
				cb(success);
			}
		});
	},
	
	isProtectedContent : function(){
		return this.masterResource.content.protectedContent;
	},
	
	unlockContent : function(){
		this.localStorage.setItem("contentUnlocked", (new Date()).getTime());
	},
	
	lockContent : function(){
		this.localStorage.removeItem("contentUnlocked");
	},
	
	isContentUnlocked : function(){
		if(this.isProtectedContent()){
			if(this.localStorage.getItem("contentUnlocked") != null){
				return true;
			}
			return false;
		}
		return true;
	},
	
	//reload the app, clear tiles if its a customization or an unlock procedure, ask user "update wanted" if not
	reloadApp : function(resetTileCache){
		var outer = this;
		$(document).scrollTop(0);
		
		this.dataService.loadResourceCategories({language: nefos.Lang.language, cache: false}, function(categories){
			//only set categories if new masterresource also
			outer.loadMasterResource(function(masterResource) {
				if(resetTileCache || (masterResource.content.editDate > outer.masterResource.content.editDate)){
					if(resetTileCache || confirm(nefos._('installUpdateQuestion'))){
						outer.categories = categories;
						outer.resetCache("clearResourceCache", resetTileCache);
						outer.resetDownloadProgress(resetTileCache);
						outer.masterResource = masterResource;
						outer.initWelcomeScreen();
						outer.initPage();
					}
					else{
						outer.showStart(true);
					}
				}
				else{
					outer.showInfoPanel(nefos._('noUpdates'));
					outer.showStart(true);
				}
			}, true);
		});
	}
});

function onDeviceReady() {
	var requestHost = "mapservices.eu";
	var requestBasePath = "nefos_app";
	
	var status = navigator.network.connection.type != Connection.UNKNOWN && navigator.network.connection.type != Connection.NONE;
	
	nefos.PageInstance = new nefos.MobilePage({
		connectionOnline: status,
		requestHost : requestHost,
		requestBasePath: requestBasePath,
		showSplashScreen: true
	});
	
	var nPI = nefos.PageInstance;
	
	nefos.PageInstance.addEventListener("welcomItemClick", function(id) {
		
		if (id == "welcomeItemBarcode") {
			window.plugins.barcodeScanner.scan(
				function(result) {
			        if (!result.cancelled) {
			        	var params;
			        	//is url?
			        	var splitted = result.text.split('?')
			        	
			        	if(splitted.length < 2){
			        		//zb c,3274852,Herr Lukas Frena,20.01.2012,29.01.2012
			        		params = splitted[0].split(",");
			        	}
			        	else{
			        		//zb http://maps.google.at?c,3274852,Herr Lukas Frena,20.01.2012,29.01.2012
			        		params = splitted[1].split(",");
			        	}
			        	
			        	if(!params || params.length < 2){
			        		nPI.showStart();
			        	}
			        	
			        	//scan resource
			        	if (params[0] == "d") {
			            	//valid example = d,3102401
			        		
			        		if(!nPI.isContentUnlocked()){
				        		nPI.showInfoPanel(nefos._('contentNotUnlocked'));
			        			nPI.showStart();
			        			return;
				        	}
			            	
			            	var cb = null;
			            	cb = function(res) {
			            		nPI.toggleBookmark(res);
			            		nPI.map.addResource(res);
			            		nPI.removeEventListener("resourceDetailShow",cb);
			            		cb = null;
			            	};
			            	
			            	nPI.addEventListener("resourceDetailShow", cb);
			            	nPI.setWindowHash("resourceDetail," + params[1], true);
			            	nPI.showResDetail({id: params[1]});
			            }
			        	//scan watchlist
			        	else if (params[0] == "w") {
			        		
			        		if(!nPI.isContentUnlocked()){
				        		nPI.showInfoPanel(nefos._('contentNotUnlocked'));
			        			nPI.showStart();
			        			return;
				        	}
			        		
			        		//valid example = w,3102401,12345,...
			        		params.shift();
			        		if (params[0].indexOf("|") != -1) {
			        			params = params[0].split("|");
			        		}
		        			if (params[params.length-1] == "") {
		        				params.pop();
		        			}
		        			
		        			nPI.cacheResourcesByIds(params);
			        		nPI.updateWatchlistStorage(params);
		        			nPI.showInfoPanel(nefos._("addedToWatchlist"));
			        		nPI.openWatchlist();
			        	}
			        	//customization
			        	else if (params[0] == "c") {
			        		if(nPI.connectionOnline){
				        		//valid example = c,3274852,Herr Lukas Frena,20.01.2012,29.01.2012 oder (3286101)
				        		if(params.length >= 5){
				        			nPI.setWelcomeText(params[2] + "|" + params[3] + "|" + params[4]);
				        		}
				        		
				        		nPI.lockContent();
				    			nPI.setMasterResourceId(params[1]);
				    			nPI.reloadApp("resetTileCache");
			        		}
			        		else{
			        			nPI.showInfoPanel(nefos._('connectionNeeded'));
			        			nPI.showStart();
			        		}
			            }
			        	else{
			        		window.setTimeout(function(){
			        			nPI.openNativeBrowserPlugin(splitted[0]);
			        		}, 1000);
			        	}
			        }
			        else {
			        	nPI.showStart();
			        }
			    },
			    function(error) {
			    	nPI.showStart();
			    }
			);
		}
		else if (id == 'welcomeItemUpdate') {
			
			if(nPI.connectionOnline){
				var boot = new AppBootstrap("http://" + nPI.requestHost + "/" + nPI.requestBasePath + "/", nefos.bootstrapApiKey);
				//var boot = new AppBootstrap("http://192.168.0.67:8080/contwise_maps/", nefos.bootstrapApiKey);
				boot.download(function(ok) {
					nefos.L("app","Got response in bootstrap: " + ok);
					if (ok) {
						nPI.reloadApp();
					}
					else {
		    			nPI.showInfoPanel(nefos._('connectionNeeded'));
		    			nPI.showStart();
					}
				});
			}
			else{
    			nPI.showInfoPanel(nefos._('connectionNeeded'));
    			nPI.showStart();
    		}
		}
		else if (id == 'welcomeItemPassword') {
			var passw = window.prompt(nefos._('password'));
			if (passw && passw != "") {
				nPI.dataService.testPassword({
						passw: passw,
						resourceId: nPI.getMasterResourceId()
					}, function(match){
						if(match == "true"){
							nPI.unlockContent();
							nPI.reloadApp("resetTileCache");
						}
						else{
							nPI.showInfoPanel(nefos._('wrongPassword'));
		        			nPI.showStart();
						}
				});
			}
		}
    });
	
	document.addEventListener("offline", function() {
		if(nefos.PageInstance.connectionOnline){
			nefos.PageInstance.emitEvent("connectionStateChanged", false);
		}
	});
	
	document.addEventListener("online", function() {
		if(!nefos.PageInstance.connectionOnline){
			nefos.PageInstance.emitEvent("connectionStateChanged", true);
		}
	});
	
	document.addEventListener("resume", function() {
		nefos.ConnectionOnline(function(status){
			nefos.L("phonegap","Resuming application.");
			nPI._toggleWelcomeScreenItems(status);
			
			if(!nPI.isCacheComplete()){
				nefos.L("phonegap","Cache is not complete, resetting.");
				nPI.dataService.loadResourceCategories({language: nefos.Lang.language, cache: false}, function(categories){
					nPI.loadMasterResource(function(masterResource) {
							nPI.categories = categories;
							nPI.resetCache("clearResourceCache", "resetTileCachingComplete");
							nPI.resetDownloadProgress("resetTileCache");
							nPI.masterResource = masterResource;
							nPI.initWelcomeScreen();
							nPI.initPage();
					});
				});
			}
		});
	}, false);
}



var Downloader = {};

Downloader.requestURL = null;
Downloader.DATADIR = null;
Downloader.filename = "download";
Downloader.cb = null;

Downloader.checkIfFileExists = function(path, cb){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile(path, { create: false },
				function(fileEntry) {
			cb(fileEntry.fullPath);
		},
		function() {
			cb(false);
		});
	},
	function(e) {
		cb(false);
	});
};

Downloader.downloadFile = function(cb){
	Downloader.cb = cb;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFsError);
};

function onFSSuccess(fileSystem) {
	/*console.log("GOT FS", JSON.stringify(fileSystem));
	console.log("fs name: " + fileSystem.name);
	console.log("is dir name: " + fileSystem.name);
	console.log("root: " + JSON.stringify(fileSystem.root));
	console.log("fullpath: " + fileSystem.root.fullPath);
	console.log("Trying to create data dir");*/
	
	fileSystem.root.getDirectory("downloads", {create: true, exclusive: false}, 
		function(parent) {
		
			//set data not to be backuped on icloud, important to get positive review on iOS store
			if(parent.setMetadata){
				parent.setMetadata(function(){}, function(){}, { "com.apple.MobileBackup": 1});
			}
			
			Downloader.DATADIR = parent;
			downloadToFs();
		},
		function() {
			alert("couldn't create dir");
		}
	);
}

function downloadToFs() {
	var ft = new FileTransfer();
	var dlPath = Downloader.DATADIR.fullPath + "/" + Downloader.filename;
	
	ft.download(Downloader.requestURL, dlPath, function(){
		Downloader.cb(dlPath);
    }, onFsError);
	
	return;
}

function onFsError(e) {
	var msg = '';
	
	switch (e.code) {
	  case FileError.QUOTA_EXCEEDED_ERR:
	    msg = 'QUOTA_EXCEEDED_ERR';
	    break;
	  case FileError.NOT_FOUND_ERR:
	    msg = 'NOT_FOUND_ERR';
	    break;
	  case FileError.SECURITY_ERR:
	    msg = 'SECURITY_ERR';
	    break;
	  case FileError.INVALID_MODIFICATION_ERR:
	    msg = 'INVALID_MODIFICATION_ERR';
	    break;
	  case FileError.INVALID_STATE_ERR:
	    msg = 'INVALID_STATE_ERR';
	    break;
	  default:
	    msg = 'Unknown Error';
	    break;
	};
	
	console.log('FS Error: ' + msg + "  " + JSON.stringify(e));
	Downloader.cb(false, e, msg);
}


//jquery animation tweaking for older browsers
jQuery.fx.interval = 60;

// Inspired by base2 and Prototype

var Class;

(function(){
  var initializing = false;
  //var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  Class = function(){
	  this.a = "o";
  };
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" /*&& fnTest.test(prop[name])*/ ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

window['Class'] = Class; // <-- Constructor
Class.prototype['extend'] = Class.prototype.extend;

//TODO: move to helper.js or utils.js
String.prototype.capitalize =  function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/* [FF] DONT DO THAT! because indexOf is now in every for in loop in f*cking ie.
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = 0;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex, j = this.length; i < j; i++) {
			if (this[i] === obj)
				return i;
		}
		return -1;
	};
}
*/

jQuery.fn.disableSelection = function() {
    $(this).attr('unselectable', 'on')
           .css('-moz-user-select', 'none')
           .each(function() { 
               this.onselectstart = function() { return false; };
            });
};

window["nefos"] = window["nefos"] ? window["nefos"] : {};


nefos.categoryRootOrderNr = 100000000000000;

nefos._ = function(key,lang) {
	lang = lang || nefos.Lang.language;
    var val = nefos.Lang[lang][key];
    if (val === undefined) {
        return key;
    }
    return val;
};
nefos.LogGroup = null;
nefos.LogCount = 0;

nefos._Log = function(/* args 1 .. n*/) {
	jQuery.each(arguments, function(idx, arg) {
		if (window["console"] && window["console"]["log"] && arg != null) {
			window["console"].log(arg);
		}
		else if ($("#debugConsole").length > 0) {
			/*
			if ($("#debugConsole").text().length > 300) {
				$("#debugConsole").text("");
			}*/
			$("#debugConsole").prepend("<div" + (nefos.LogCount % 2 == 1 ? " style='background-color:#eae'" : "") +  ">" + nefos.LogCount + ": '" + arg + "'</div>");
			nefos.LogCount++;
		}
	}
	);
};

nefos.L = function(/* args 1 .. n*/) {
	var doLog = false;
	var allPrimitives = true;
	
	jQuery.each(arguments, function(idx, arg) {
		if (allPrimitives && typeof arg != "string" && typeof arg != "number") {
			allPrimitives = false;
		}
	});
	
	var logString = "";
	jQuery.each(arguments, function(idx, arg) {
		if (idx == 0) {
			if (this.LogGroup == null || arguments[idx] == nefos.LogGroup) {
				doLog = true;
				if (allPrimitives) {
					logString = arg.toUpperCase() + ": ";
				}
				else {
					nefos._Log(arg.toUpperCase() + ":");
				}
			}
		}
		else {
			if (doLog) {
				if (allPrimitives) {
					logString += (idx > 1 ) ? ", " + arg : arg;
				}
				else {
					nefos._Log(arg);
				}
			}
		}
	});	
	
	if (logString != "") {
		nefos._Log(logString);
	}
};

nefos.Time = function(tag, text) {
	text = text || "";
	var logged = false;
	var now = (new Date()).getTime()
	if (nefos._timeEvents) {
		if (nefos._timeEvents[tag]) {
			var tagDiff = now - nefos._timeEvents[tag];
			nefos.L("timer", text + " Diff to last " + tag + " : " + tagDiff);
			logged = true;
		}
		nefos._timeEvents[tag] = now;
	}
	else {
		nefos._timeEvents = {};
	}
	if (nefos._lastEvent) {
		var lastDiff = now - nefos._lastEvent;
		if (!logged) {
			nefos.L("timer", text + " Diff to last event: " + lastDiff);
		}
	}
	else {
		nefos.L("timer", text + " Starting timing at " + now);
	}
	nefos._lastEvent = now;
	
};

nefos.HexToRgb = function(hex, convertToFloat) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    if (convertToFloat) {
    	r /= 256;
    	g /= 256;
    	g /= 256;
    }
    
    return [r,g,b];
};

nefos.CssInt = function($el, prop) {
	if (!$el) {
		return 0;
	}
	var prop = $el.css(prop);
	if (!prop || prop == "auto") {
		return 0;
	}
	return parseInt(prop.replace(/px/,""));
};

nefos.GetUrlVars = function(){
    var vars = [], hash;
    var arrayVal = [], arrayName = null;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        
        //test if parameters are an array
        if(hash[0].split('[').length > 1){
        	arrayName = hash[0].split('[')[0];
        	arrayVal.push(hash[1]);
        }
        else{
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
        }
    }
    //add array parameter if existing
    if(arrayName){
    	vars[arrayName] = arrayVal;
    }
    
    return vars;
};
nefos.getUrlVars = nefos.GetUrlVars; //[FF] Deprecated

nefos.ConnectionOnline = function(cb){
	
	//nefos.L("base", "checking connectivity...");
	var $img = $('<img style="display:none;">');
	
	$img.error(function(){
		$img.remove();
		//nefos.L("base","No internet connection.");
		cb(false);
	});
	
	$img.load(function(){
		$img.remove();
		//nefos.L("base","Internet connection OK.");
		cb(true);
	});
	
	$img.attr('src', 'http://mapservices.eu/nefos/static/img/cmConnectivityTest.png?' + Math.random());
	
	$('body').append($img);
};

nefos.GetRelativeCoordinates = function($parent, evt) {
	var el = $parent[0];
	
	//get the top and left x / y coords of the target
    var offsetTop = el.offsetTop;
    var offsetLeft = el.offsetLeft;

    //if the node is within a parent container, loop through each parent
    //and add their height / width offsets to the top / left
    var nodeParent = el.offsetParent;
    if (nodeParent != el) {
        while (nodeParent) {
        	offsetLeft += nodeParent.offsetLeft;
        	offsetTop += nodeParent.offsetTop;
            nodeParent = nodeParent.offsetParent;
        }
    }
    
    var offset = {};
    
    if (evt) {
    	offset = {
    		left: evt.pageX - offsetLeft,
    		top: evt.pageY - offsetTop
    	};
    }
    else {
    	offset = {
    		left: offsetLeft,
    		top: offsetTop
    	};
    }
    
    return offset;
};

nefos.CallInContext = function(orgContext, args, fn) {	
	//check if first object is jquery event object
	if (args.length > 0 && args[0]) {
		try {
			if (args[0]["data"] && args[0]["type"]) {
				return fn.apply(args[0]["data"]["context"], args[0]["data"]["args"]);
			}
		}
		catch(e) {}
	}
	return fn.apply(orgContext, args);
};

nefos.GetBasePath = function() {
	if (window["basePath"]) {
		return window["basePath"];
	}
	
	return "/" + window.location.href.replace(/http:\/\/.*?\/(.*?)\/.*/,"$1");
};

nefos.GetValue = function(val){
	if(typeof val != "undefined" && val != null){
		var tmp = val.toString().split(".");
		//return 1 instead of 1.0 eg
		if(tmp.length > 1 && tmp[1] == "0"){
			return tmp[0];
		}
		return val;
	}
	return "";
};

nefos.NoVal = function(prop){
	if(typeof prop != "undefined" && prop != null){
		return false;
	}
	return true;
};
nefos.noVal = nefos.NoVal; //[FF] DEPRECATED

nefos.GetQmValue = function(val){
	if(typeof val != "undefined" && val != null){
		var tmp = val.split(".");
		//return 1 instead of 1.0 eg
		if(tmp.length > 1 && tmp[1] == "0"){
			return tmp[0];
		}
		return val;
	}
	return "?";
};

nefos.GetNearestPoint = function(latLng, geoObjects) {
	var minDist = Math.pow(2, 53); //== Integer.MAX
	var nearestPont = {};
	
	for (var i=0;i<geoObjects.length;i++) {
		var geoObject = geoObjects[i];
		if (geoObject.getType() == nefos.GeoObject.TYPE_LINESTRING) {
			for (var j=0;j<geoObject.getPoints().length;j++) {
				var point = geoObject.getPoints()[j];
				var dist = point.distance(latLng);
				if (dist < minDist) {
					minDist = dist;
					nearestPoint = {
							point: point,
							dist: minDist,
							polyline: geoObject,
							pointIdx:j,
							polylineIdx: i
					};
				}
			}
		}
	}
	
	return nearestPoint;	
};

nefos.IsArray = function(obj) {
	return  (obj != null && obj.constructor.toString().indexOf("Array") != -1);
};

nefos.HashSize = function(hash){
	var size = 0;
	
	for(var key in hash){
		size++;
	}
	
	return size;
};

nefos.ArrayContains = function(ary, el) {
    var i=0;
    for(i=0;i<ary.length;i++) {
        if (ary[i] == el) {
            return true;
        }
    }
    return false;
};

nefos.ArrayIndexOf = function(array, obj, fromIndex) {
	if (fromIndex == null) {
		fromIndex = 0;
	} else if (fromIndex < 0) {
		fromIndex = Math.max(0, array.length + fromIndex);
	}
	for (var i = fromIndex, j = array.length; i < j; i++) {
		if (array[i] === obj)
			return i;
	}
	return -1;
};

nefos.ContainsResource = function(resource, array){
	for(var i=0; i<array.length; i++){
		if(array[i].id == resource.id){
			return true;
		}
	}
	return false;
};
nefos.containsResource = nefos.ContainsResource; //[FF] DEPRECATED

nefos.ArrayShuffle = function(array){
	var tmp, rand;
	
	for(var i =0; i < array.length; i++){
		rand = Math.floor(Math.random() * array.length);
		tmp = array[i]; 
		array[i] = array[rand]; 
		array[rand] = tmp;
	}
	
	return array;
};
nefos.arrayShuffle = nefos.ArrayShuffle;

nefos.GetRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

nefos.ObjectToArray = function(obj){
	var arr = [];
	
	for(var i in obj){
		arr.push(obj[i]);
	}
	
	return arr;
};
nefos.objectToArray = nefos.ObjectToArray; //[FF] DEPRECATED

nefos.ArrayEquals = function(ary1, ary2) {
    if (ary1.length != ary2.length) {
        return false;
    }
    var i=0;
    for(i=0;i<ary1.length;i++) {
        if (!nefos.ArrayContains(ary2, ary1[i])) {
            return false;
        }
    }
    return true;
};

nefos._InitGlobalVariable = function(globalVar, prop, val) {
    if (window[globalVar] === undefined) {
        window[globalVar] = {};
        window[globalVar][prop] = val;
    }
    else {
        if (window[globalVar][prop]) {
            window[globalVar][prop] = jQuery.extend(true, window[globalVar][prop], val);
        }
        else {
            window[globalVar][prop] = val;
        }
    }
};

nefos.InitGlobals = function(myGlobals) {
    nefos._InitGlobalVariable("nefos","Globals",myGlobals);
};

nefos.InitI18n = function(i18n) {
    nefos._InitGlobalVariable("nefos","Lang",i18n);
    if (!nefos.Lang.language) {
         nefos.Lang.language = "de";
    }
};

nefos.Override = function(prototype, fnName, fn) {
	var oldFn = prototype[fnName];
	prototype[fnName] = function() {
		var ret = fn.apply(this, arguments);
		if (ret !== undefined && !ret) {
			return;
		}
		oldFn.apply(this, arguments);
	};
	prototype[fnName].oldFunction = oldFn;
};

nefos.UnOverride = function(prototype, fnName) {
	prototype[fnName] = prototype[fnName].oldFunction;
	delete prototype[fnName].oldFunction;
};

nefos.ChopOrdernr = function(ordernr) {
	while (ordernr.length > 5 && ordernr.substring(ordernr.length-2,ordernr.length) == "00") {
		ordernr = ordernr.substring(0, ordernr.length-2);
	}
	return ordernr;
};

/* Mobile variables */
nefos.ClickEvent = "click";

nefos.Orientation = {
		Portrait: 0,
		Landscape: 90
};

/* Taken from Leaflet */
(function() {
	var ua = navigator.userAgent.toLowerCase(),
	isIe = !!window.ActiveXObject,
	webkit = ua.indexOf("webkit") != -1,
	mobile = typeof orientation != 'undefined' ? true : false,
	android = ua.indexOf("android") != -1,
    iPad = ua.match(/iPad/i) != null,
    iPhone = ua.match(/iPhone/i) != null, 
	opera = window.opera,
	isIe6 = isIe && !window.XMLHttpRequest,
	isIe7 = isIe && ua.match(/msie 7.0/) != null,
	isIe8 = isIe && ua.match(/msie 8.0/) != null;
	
	nefos.Browser = {
		ie: isIe,
		ie6: isIe6,
		ie7: isIe7,
		ie8: isIe8,
		oldIe : isIe && (isIe6 || isIe7 || isIe8),
		
		webkit: webkit,
		webkit3d: webkit && ('WebKitCSSMatrix' in window) && ('m11' in new WebKitCSSMatrix()),
        iPad : ua.match(/iPad/i) != null,
        iPhone : ua.match(/iPhone/i) != null,
        iPad: iPad,
        iPhone : iPhone,
        iOS : iPad || iPhone,
	
		gecko: ua.indexOf("gecko") != -1,
	
		opera: opera,
	
		android: android,
		mobileWebkit: mobile && webkit,
		mobileOpera: mobile && opera,
	
		mobile: mobile,
		touch: ('ontouchstart' in document.documentElement),
		
		canvas : !!document.createElement('canvas').getContext
	};
	
	if (nefos.Browser.iOS) {
		var start = navigator.userAgent.indexOf( 'OS ' );
		nefos.Browser.iOSVersion = window.Number( navigator.userAgent.substr( start + 3, 3 ).replace( '_', '.' ) );
	}
	
	if (nefos.Browser.android) {
		var start = navigator.userAgent.indexOf( 'Android ' );
		var version = navigator.userAgent.substr( start + 8, 3 );
		nefos.Browser.androidVersion = window.Number(version);
	}
	
	if (nefos.Browser.touch) {
		nefos.ClickEvent = "touchstart";
	}
})();

nefos.TestCssProp = function (props) {
	var style = document.documentElement.style;

	for (var i = 0; i < props.length; i++) {
		if (props[i] in style) {
			return props[i];
		}
	}
	return false;
};

nefos.TestTransitionEventHandler = function () {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }
var res = ""
    for(t in transitions){
        if( el.style[t] !== undefined ){
            res += transitions[t] + " ";
        }
    }
    return res;
};


nefos.EventEmitter = Class.extend({
	init : function(settings) {
		this.settings = jQuery.extend({}, settings);
		this.eventListeners = {};
		this.idCounter = 1;
	},
	
	setSettings : function(settings) {
		jQuery.extend(this.settings, settings);
	},	
	
	addEventListener : function(event, listener, once) {
		event = event.toLowerCase();
		if (!this.eventListeners[event]) {
			this.eventListeners[event] = [];
		}
		
		this.eventListeners[event].push({action: listener, once: once});
	},
	    
    removeEventListener : function(event, listener) {
    	event = event.toLowerCase();
    	if (this.eventListeners[event]) {
    		var list = this.eventListeners[event];
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i].action === listener) list.splice(i, 1);
            }
    	}
    },
    
    removeAllEventListeners : function(event) {
    	event = event.toLowerCase();
    	this.eventListeners[event] = [];
    },
    
    emitEvent : function(event /* args... */) {
        var i = 0;
        var list = this.eventListeners[event.toLowerCase()] || [];
        var eventArgs = Array.prototype.slice.call(arguments, 1);
        var handler = this['on' + event.capitalize()];

	    // Emit on this object
	    if (typeof handler === 'function') {
	        handler.apply(this, eventArgs);
	    }
	
	    // Emit standard events
	    for (i = 0; i < list.length; i++) {
	        list[i].action.apply(this, eventArgs);
	        if (list[i].once) {
	        	list.splice(i, 1);	
	        }
	    }
    },
    
    getUniqueId : function() {
    	return "nefos_" + (this.idCounter++) + "_" + (new Date().getMilliseconds());
    },
    
    override : function(methodName, target) {
    	var context = this;
    	var overridenMethod = this[methodName];
    	
    	var stub  = function() {
    		var tmp = context._super;
    		context._super = overridenMethod;
    		var retValue = target.apply(context, arguments);
    		context._super = tmp;
    		return retValue;
    		
    	};
    	this[methodName] = stub;
    },
    
    advise : function(methodName, advice, target) {
        var originalMethod = this[methodName];
        var advisorStub, adviceList;

        if (!originalMethod || !originalMethod.__stub__ || !this.hasOwnProperty(methodName)) {
        	advisorStub = this[methodName] = this._getAdvisorStub(originalMethod);
        }
        else {
        	advisorStub = originalMethod;
        }

        adviceList = advisorStub[advice];
        if (adviceList) {
        	adviceList.push(target);
        }
    },
    
    _getAdvisorStub : function (method){
    	var stub = function() {
            var i, thisFunction = arguments.callee,
                list, retValue;

            // Apply before advice
            list = thisFunction.before;
            for (i = 0; i < list.length; i++) {
                list[i].apply(this, arguments);
            }

            // Invoke original method
            if (method) retValue = method.apply(this, arguments);

            // Invoke after method
            list = thisFunction.after;
            for (i = 0; i < list.length; i++) {
                retValue = list[i].apply(this, arguments);
            }
            
            return retValue;
        };
        stub.__stub__ = true;
        stub.before = [];
        stub.after = [];
        return stub;
    },
    
    destroy : function() {
		for (var l in this.eventListeners) {
			delete this.eventListeners[l];
		}
		
		delete this.eventListeners;
	}

});

//Simple class, because is used very often
nefos.Point = function(x, y, settings) {
	this.x = x;
	this.y = y;
	this.settings = settings;
};

nefos.Point.prototype.toString = function() {
	return "x: " + this.x + ", y: " + this.y;
};

nefos.Point.prototype.equals = function(point) {
	if (point != null) {
		return this.x == point.x && this.y == point.y;		
	}
	
	return false;
};


nefos.PointBounds = nefos.EventEmitter.extend({
	init : function(ne, sw, settings) {
		this._super(settings);
		
		this.ne = ne;
		this.sw = sw;
	},
	
	getNorthEast : function() {
		return this.ne;
	},
	
	getSouthWest : function() {
		return this.sw;
	},
	
	contains : function(point) {
		//Attention: inverted y!
		return ((point.y >= this.ne.y) && (point.x <= this.ne.x) &&
				(point.y <= this.sw.y) && (point.x >= this.sw.x));
	},
	
	extend : function(amount) {
		this.ne.x -= (amount / 2);
		this.ne.y += (amount / 2);
		
		this.sw.x += (amount / 2);
		this.sw.y -= (amount / 2);
	},
	
	toString : function() {
		return "Ne: [" + this.ne.toString() + "], Sw: [" + this.sw.toString() + "]";
	}
});

//Simple class, because is used very often
nefos.LatLng = function(lat, lng, altitude, settings) {
	this._lat = lat;
	this._lng = lng;
	this._altitude = altitude;
	this.settings = settings;
};

nefos.LatLng.prototype.lat = function() {
	return this._lat;
};

nefos.LatLng.prototype.lng = function() {
	return this._lng;
};

nefos.LatLng.prototype.getAltitude = function() {
	return this._altitude;
};

nefos.LatLng.prototype.altitude = function() {
	return this._altitude;
};

nefos.LatLng.prototype.setAltitude = function(altitude) {
	this._altitude = altitude;
};

nefos.LatLng.prototype.equals = function(other) {
	if (this._lat == other.lat() && this._lng == other.lng()) {
		return true;
	}
	return false;
};

nefos.LatLng.prototype.add = function(latLng) {
	this._lat += latLng.lat();
	this._lng += latLng.lng();
};

nefos.LatLng.prototype.sub = function(latLng) {
	this._lat -= latLng.lat();
	this._lng -= latLng.lng();
};

nefos.LatLng.prototype.distance = function(p2) {
    var p1 = this;
	
	if (!p1 || !p2) {
        return 0;
    }

    var R = 6371000; // Radius of the Earth in m
    var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

nefos.LatLng.prototype.fastDistance = function(p2) {
	var x = 69100 * (p2.lat() - this.lat());
	var y = 53000 * (p2.lng() - this.lng());
	return Math.sqrt(x * x + y * y);
};

nefos.LatLng.prototype.toString = function() {
	return this.lat() + "," + this.lng() + "," + this.altitude();
};

nefos.LatLng.prototype.clone = function() {
	return new nefos.LatLng(this._lat, this._lng);
};


//Simple class, because is used very often
nefos.LatLngBounds = function(sw, ne) {
	this.ne = ne;
	this.sw = sw;
};

nefos.LatLngBounds.prototype.getNorthEast = function() {
	return this.ne;
};

nefos.LatLngBounds.prototype.getSouthWest = function() {
	return this.sw;
};
	
nefos.LatLngBounds.prototype.contains = function(latLng) {
	return ((latLng.lat() <= this.ne.lat()) && (latLng.lng() <= this.ne.lng()) &&
			(latLng.lat() >= this.sw.lat()) && (latLng.lng() >= this.sw.lng()));
};
	
nefos.LatLngBounds.prototype.equals = function(bounds) {
	return this.ne.equals(bounds.getNorthEast()) && this.sw.equals(bounds.getSouthWest());
};
	
nefos.LatLngBounds.prototype.containsBounds = function(bounds) {
	return this.contains(bounds.ne) && this.contains(bounds.sw);
};

//Fast intersection check. May not be accurate in large zoom levels [FF] 07.09.2011
//Excat calculation would need conversion to Mercator Meters
nefos.LatLngBounds.prototype.intersects = function(bounds) {
	return this.contains(bounds.ne) || this.contains(bounds.sw)
        || this.contains(new nefos.LatLng(bounds.ne.lat(), bounds.sw.lng()))
        || this.contains(new nefos.LatLng(bounds.sw.lat(), bounds.ne.lng())) ;
};

nefos.LatLngBounds.prototype.add = function(lat, lng) {
	this.sw._lat-=lat;
	this.sw._lng-=lng;
	this.ne._lat+=lat;
	this.ne._lng+=lng;	
};

nefos.LatLngBounds.prototype.extend = function(latlng) {
	if (latlng == null) {
		return;
	}
	if (!this.sw && !this.ne) {
		this.sw = new nefos.LatLng(latlng.lat(), latlng.lng());
		this.ne = new nefos.LatLng(latlng.lat(), latlng.lng());
	} 
	else {
		this.sw._lat = Math.min(latlng.lat(), this.sw.lat());
		this.sw._lng = Math.min(latlng.lng(), this.sw.lng());
		
		this.ne._lat = Math.max(latlng.lat(), this.ne.lat());
		this.ne._lng = Math.max(latlng.lng(), this.ne.lng());
	}
};

nefos.LatLngBounds.prototype.extendByBounds = function(bounds) {
	this.extend(bounds.sw);
	this.extend(bounds.ne);
};
	
nefos.LatLngBounds.prototype.getCenter = function() {
	return new nefos.LatLng((this.sw.lat() + this.ne.lat()) / 2, (this.sw.lng() + this.ne.lng()) / 2);
};

nefos.LatLngBounds.prototype.clone = function() {
	return new nefos.LatLngBounds(this.sw.clone(), this.ne.clone());
};

nefos.ObjectType = nefos.EventEmitter.extend({
	init : function(settings) {
		this._super(settings);
		
		this.overviewMetadata = null;
	},
	
	getOverviewMetadata : function(filterAppearance) {
		if (this.overviewMetadata == null) {
			this.overviewMetadata = this.getMetadataByPriority(nefos.ObjectType.METADATA_OVERVIEW_PRIORITY);
		}
		
		if (filterAppearance !== undefined) {
			var res = [];
			for (var i=0;i<this.overviewMetadata.length;i++) {
				if (this.overviewMetadata[i].appearance === filterAppearance) {
					res.push(this.overviewMetadata[i]);
				}
			}
			return res;
		}
				
		return this.overviewMetadata;
	},
	
	getMetadataByPriority : function(prio, greater) {
		greater = greater === undefined ? true : greater;
		var result = [];
		for (var i=0;i<this.settings.metadataGroups.length;i++) {
			var grp = this.settings.metadataGroups[i];
			for (var j=0;j<grp.metadata.length;j++) {
				var meta = grp.metadata[j];
				if (meta.priority != null && (meta.priority >= prio && greater || meta.priority <= prio && !greater)) {
					meta.group = grp;
					result.push(meta);
				}
			}
		}
		return result;
	},
	
	getId : function() {
		return this.settings.id;
	},
	
	getMetadataAppearance : function(metadata) {
		if (!metadata.appearance) {
			return "";
		}
		
		return metadata.appearance.replace(/_br/,"");
	},
	
	isMetadataBreakAfter : function(metadata) {
		if (!metadata.appearance) {
			return false;
		}
		return metadata.appearance.indexOf("_br") > 0;
	}
});

nefos.ObjectType.METADATA_OVERVIEW_PRIORITY = 4;
nefos.ObjectType.METADATA_LIST_PRIORITY = 5;

nefos.GeoObject =  nefos.EventEmitter.extend({	
	init : function(type, settings) {
		this._super(settings);
		
		this.type = type;
	
		this.settings.fromZoomLevel =  this.settings.fromZoomLevel || 0;
		this.settings.toZoomLevel = this.settings.toZoomLevel || 20;
		this.settings.clickable = this.settings.clickable || false;
		this.settings.clusterObject = this.settings.clusterObject || false;
		this.settings.alwaysVisible = this.settings.alwaysVisible || false;
		
		this.mapData = {}; //Property container for map specific objects
	},
	
	clone : function(obj) {	
		obj.type = this.type;
		obj.settings = {
			fromZoomLevel: this.settings.fromZoomLevel,
			toZoomLevel: this.settings.toZoomLevel,
			clickable : this.settings.clickable,
			clusterObject: this.settings.clusterObject,
			alwaysVisible: this.settings.alwaysVisibile
		};
		return obj;
	},
	
	getType : function() {
		return this.type;
	},
	
	setAlwaysVisible : function(visible) {
		this.settings.alwaysVisible = visible;
	},
	
	getAlwaysVisible : function() {
		return this.settings.alwaysVisible;
	},
	
	showOnMap : function(map) {
		alert("not implemented in marker class! needs to be overriden by map backend!");
	},
	
	removeFromMap : function() {
		alert("not implemented in marker class! needs to be overriden by map backend!");
	},
	
	getMap : function() {
		alert("not implemented in marker class! needs to be overriden by map backend!");
	}
});

nefos.GeoObject.TYPE_POINT = nefos.GeoObject.TYPE_MARKER = "point";
nefos.GeoObject.TYPE_POLYLINE = "linestring";
nefos.GeoObject.TYPE_LINESTRING = nefos.GeoObject.TYPE_POLYLINE ; //is the same as polyline.
nefos.GeoObject.TYPE_CIRCLE = "circle";
nefos.GeoObject.TYPE_POLYGON = "polygon";
nefos.GeoObject.TYPE_CUSTOM_OVERLAY = "customOverlay";
//TODO implement proper overlay mechanism
//nefos.MapOverlay.TYPE_CANVAS_OVERLAY = "canvasOverlay";

nefos.Marker = nefos.GeoObject.extend({
	init : function(settings) {
		this._super(nefos.GeoObject.TYPE_POINT, settings);
		
		this.position = settings.position || new nefos.LatLng(settings.lat, settings.lng, settings.alt);
		
		this.settings.imageBasePath = this.settings.imageBasePath || nefos.GetBasePath();
		
		this.settings.name = this.settings.name || null;
		
		this.settings.icon = this.settings.icon || {};
		this.settings.icon.image = this.settings.icon.image || "http://mapservices.eu/nefos/static/img/default_marker.png";
		this.settings.icon.width = this.settings.icon.width || 21;
		this.settings.icon.height = this.settings.icon.height || 32;
		this.settings.icon.anchor = this.settings.icon.anchor || {};
		this.settings.icon.anchor.x = this.settings.icon.anchor.x || 10;
		this.settings.icon.anchor.y = this.settings.icon.anchor.y || 32;
		
		this.settings.infoWindowAnchor = this.settings.infoWindowAnchor || {};
		this.settings.infoWindowAnchor.x = this.settings.infoWindowAnchor.x || 10;
		this.settings.infoWindowAnchor.y = this.settings.infoWindowAnchor.y || 32;
		
		this.settings.shadow = this.settings.shadow || {};
		this.settings.shadow.image = this.settings.shadow.image || "http://mapservices.eu/nefos/static/img/shadow.png";
		this.settings.shadow.width = this.settings.shadow.width || 40;
		this.settings.shadow.height = this.settings.shadow.height || 30;
		this.settings.shadow.anchor = this.settings.shadow.anchor || {};
		this.settings.shadow.anchor.x = this.settings.shadow.anchor.x || this.settings.icon.anchor.x;
		this.settings.shadow.anchor.y = this.settings.shadow.anchor.y || this.settings.icon.anchor.y;
		
		this.settings.focusIcon = this.settings.focusIcon || "http://mapservices.eu/nefos/static/img/marker_focus.gif";
		
		this.settings.altitudeProfileIcon = this.settings.altitudeProfileIcon || {};
		this.settings.altitudeProfileIcon.image = this.settings.altitudeProfileIcon.image || this.settings.icon.image;
		this.settings.altitudeProfileIcon.width = this.settings.altitudeProfileIcon.width || 16; //TODO: are values from vca! should be some std like 20x20
		this.settings.altitudeProfileIcon.height = this.settings.altitudeProfileIcon.height || 20;
		
		this.settings.icon.image = this.createImagePath(this.settings.icon.image);
		this.settings.shadow.image =  this.createImagePath(this.settings.shadow.image);
		
		//TODO overlay on marker to show numbers etc
		//this.settings.markerOverlay = this.settings.markerOverlay || null;
		
		if (!this.settings.clusterIcon) {
			this.settings.clusterIcon = {};
			jQuery.extend(this.settings.clusterIcon, this.settings.icon);
			
			this.settings.clusterIcon.imageFunction = function(img) { return img.replace(new RegExp("(.*)?\.png$", "g"), "$1_cluster.png"); }; //default value
		}
				
		
		this.settings.zIndex = this.settings.zIndex || 10;
		this.settings.clickable = this.settings.clickable || this.showMarkerMenu;
	},
	
	clone : function() {
		var obj = this._super(new nefos.Marker({}));
		obj.position = this.position.clone();
		obj.settings.imageBasePath = this.settings.imageBasePath;
		obj.settings.name = this.settings.name;
		obj.settings.icon = jQuery.extend({}, this.settings.icon);
		obj.settings.infoWindowAnchor = jQuery.extend(true, {}, this.settings.infoWindowAnchor);
		obj.settings.shadow = jQuery.extend(true, {}, this.settings.shadow);
		obj.settings.focusIcon = this.settings.focusIcon;
		obj.settings.altitudeProfileIcon = jQuery.extend(true, {}, this.settings.altitudeProfileIcon);
		obj.settings.clusterIcon = jQuery.extend(true, {}, this.settings.clusterIcon);
		obj.settings.zIndex = this.settings.zIndex;
		obj.settings.clickable = this.settings.clickable;
		return obj;
	},
			
	createImagePath : function(path) {
		if (this.isAbsolutePath(path)) {
			return path;
		}
		else {
			return this.settings.imageBasePath + "/" + path;
		}
	},
			
	isAbsolutePath : function(path) {
		return path.charAt(0) == '/' || path.indexOf("http://") != -1;
	},
	
	setPosition : function(latLng) {
		this.position = latLng;
	},
	
	getPosition : function() {
		return this.position;
	},
	
	getAltitudeProfileIcon : function() {
		var icon = this.settings.altitudeProfileIcon;
		
		icon.preProcessedImage = null;
		icon.image = this.getIcon().image;
		
		return this._getImage(icon);
	},
	
	getClusterIcon : function() {
		var icon = this.settings.clusterIcon;
		
		icon.preProcessedImage = null;
		icon.image = this.getIcon().image;
				
		return this._getImage(icon);
	},
	
	getIcon : function() {
		return this._getImage(this.settings.icon);
	},
	
	getShadow : function() {
		return this.settings.shadow;
	},
	
	_getImage : function(icon) {
		if (jQuery.isFunction(icon.imageFunction)) {
			if (!icon.preProcessedImage) {
				icon.preProcessedImage = icon.image;
			}
			icon.image = icon.imageFunction(icon.preProcessedImage);
		}
		return icon;
	},
	
	setIcon : function(icon) {
		this.icon = icon;
	},
	
	setFocus : function(focus) {
		alert("marker focus not implemented in base class");
	},
	
	getBounds : function() {
		var bounds = new nefos.LatLngBounds();
		bounds.extend(this.getPosition());
		return bounds;
	}
});

nefos.Polyline = nefos.Linestring = nefos.GeoObject.extend({
	init : function(settings) {
		this._super(nefos.GeoObject.TYPE_POLYLINE, settings);
		
		this.settings.startMarker = this.settings.startMarker || null;
		this.settings.middleMarker = this.settings.middleMarker || null;
		this.settings.endMarker = this.settings.endMarker || null;
		
		this.settings.strokeColor = this.settings.strokeColor || "#000053"; //dark nefoslike blue
		this.settings.strokeWidth = this.settings.strokeWidth || 2;
		this.settings.strokeOpacity = this.settings.strokeOpacity || 1;
		this.settings.permanentLine = this.settings.permanentLine || false;
		this.settings.smoothFactor = this.settings.smoothFactor || nefos.Polyline.DEFAULT_SMOOTH_FACTOR;
		this.settings.clickable = this.settings.clickable || false;
		this.settings.stub = this.settings.stub === undefined ? false : this.settings.stub;
		
		this.points = settings.points || []; 
		this.length = settings.length || 0;
		this.height = settings.height || 0;
		
		this.lineHidden = false;
	},
	
	clone : function() {
		var obj = this._super(new nefos.Polyline({}));
		obj.settings.startMarker = (this.settings.startMarker ? this.settings.startMarker.clone() : null);
		obj.settings.middleMarker = (this.settings.endMarker ? this.settings.endMarker.clone() : null);
		obj.settings.endMarker = (this.settings.endMarker ? this.settings.endMarker.clone() : null);
		
		obj.settings.strokeColor = this.settings.strokeColor;
		obj.settings.strokeWidth = this.settings.strokeWidth;
		obj.settings.strokeOpacity = this.settings.strokeOpacity;
		obj.settings.permanentLine = this.settings.permanentLine;
		obj.settings.smoothFactor = this.settings.smoothFactor;
		obj.settings.clickable = this.settings.clickable;
		obj.settings.stub = this.settings.stub;
		
		obj.points = [];
		for (var i=0;i<this.points.length;i++) {
			obj.points.push(this.points[i].clone());
		}
		
		obj.length = this.length;
		obj.height = this.height;

		return obj;
	},

	
	/**
	 * @param points new Array<nefos.LatLng>
	 * TODO: if required, the array needs to be checked for changes, so that old height information isn't lost.
	 * otherwise height information will be overriden (possibly coming from google maps api, and original data from gpx file).
	 */
	setPoints : function(points) {
		this.points = points;
	},
	
	getPoints : function() {
		return this.points;
	},
	
	addToPoints : function(latLng) {
		this.points.push(latLng);
	},
	
	getStartMarker : function() {
		return this.settings.startMarker;
	},
	
	setStartMarker : function(marker) {
		this.settings.startMarker = marker;
	},
	
	getMiddleMarker : function() {
		return this.settings.middleMarker;
	},
	
	setMiddleMarker : function(marker) {
		this.settings.middleMarker = marker;
	},
	
	getEndMarker : function() {
		return this.settings.endMarker;
	},
	
	setEndMarker : function(marker) {
		this.settings.endMarker = marker;
	},
	
	getLength : function() {
		return this.length;
	},
	
	setHeight : function() {
		return this.height;
	},
	
	isStub : function() {
		return this.settings.stub;
	},
	
	setStub : function(stub) {
		this.settings.stub = stub;
	},
	
	isLineHidden : function() { 
		return this.lineHidden;
	},
	
	setLineHidden : function(hidden) {
		this.lineHidden = hidden;
	},
	
	showLine : function() {
		alert("not implemented in base class");
	},
	
	hideLine : function() {
		alert("not implemented in base class");
	},
	
	setPermanentLine : function(permanentLine) {
		this.settings.permanentLine = permanentLine;
	},
	
	getPermanentLine : function() {
		return this.settings.permanentLine;
	},
	
	getBounds : function() {
		var bounds = new nefos.LatLngBounds();
		for (var i = 0; i < this.points.length; i++) {
		    bounds.extend(this.points[i]);
		}
		return bounds;
	},
	
	setStyle : function(style) {
		jQuery.extend(this.settings, style);
	},
	
	calculateLength : function() {
        var meters = 0;
        var firstPoint = null;

        for (i = 0; i < this.points.length - 1; i++) {
            firstPoint = this.points[i];
            meters  += firstPoint.distance(this.points[i + 1]);

        }
        
        return meters.toFixed();
    },
    
    getAsGeoJSON : function() {
    	var json = {
    			type: "FeatureCollection",
    			features: []
    	};
    	
    	var strokeColor = nefos.HexToRgb(this.settings.strokeColor.replace(/#/,""), true);
    	strokeColor[3] = this.settings.strokeOpacity;
    	
    	json.features[0] = {
    			type : "Feature",
    			properties : {
    				id: "Polylines",
    				color: strokeColor,
    				highlightColor: strokeColor,
    				linewidth: 5,
    				minelv: -2000,
    				maxelv: 5000
    			},
    			geometry : {
    				type: "LineString",
    				coordinates: []
    			}
    	};
    	
    	for (var i=0;i<this.points.length;i++) {
    		json.features[0].geometry.coordinates.push([this.points[i].lng(), this.points[i].lat()]);
    	}
    	
    	return json;
    }
});

if(nefos.Browser.oldIe){
	nefos.Polyline.DEFAULT_SMOOTH_FACTOR = 5;
}
else{
	nefos.Polyline.DEFAULT_SMOOTH_FACTOR = 1;
}


nefos.Polygon = nefos.GeoObject.extend({
	init : function(settings) {
		this._super(nefos.GeoObject.TYPE_POLYGON, settings);
		
		this.settings.fillColor = this.settings.fillColor || "#9999FF"; //lightblue
		this.settings.fillOpacity = this.settings.fillOpacity === undefined ? 0.5 : this.settings.fillOpacity;
		this.settings.strokeColor = this.settings.strokeColor || "#000053"; //dark nefoslike blue
		this.settings.strokeWidth = this.settings.strokeWidth || 2;
		this.settings.strokeOpacity = this.settings.strokeOpacity || 1;
		this.settings.smoothFactor = this.settings.smoothFactor || nefos.Polygon.DEFAULT_SMOOTH_FACTOR;
		this.settings.clickable = this.settings.clickable || false;
		this.settings.stub = this.settings.stub === undefined ? false : this.settings.stub;
		this.settings.permanentPolygon = this.settings.permanentPolygon || false;
		this.settings.centerMarker = this.settings.centerMarker || null;
		
		this.points = settings.points || [[]]; //Changed default to array of arrays (rings), by Luggasn
		
		this.polygonHidden = false;
	},
	
	clone : function() {
		var obj = this._super(new nefos.Polygon({}));
		obj.settings.centerMarker = (this.settings.centerMarker ? this.settings.centerMarker.clone() : null);
		
		obj.settings.fillColor = this.settings.fillColor;
		obj.settings.fillOpacity = this.settings.fillOpacity;
		obj.settings.strokeColor = this.settings.strokeColor;
		obj.settings.strokeWidth = this.settings.strokeWidth;
		obj.settings.strokeOpacity = this.settings.strokeOpacity;
		obj.settings.permanentLine = this.settings.permanentLine;
		obj.settings.smoothFactor = this.settings.smoothFactor;
		obj.settings.clickable = this.settings.clickable;
		obj.settings.stub = this.settings.stub;
		obj.settings.permanentPolygon = this.settings.permanentPolygon;
		
		obj.points = [[]];
		for (var i=0;i<this.points.length;i++) {
			obj.points.push([]);
			for (var j=0;j<this.points[i].length;j++) {
				obj.points[i].push(this.points[i][j].clone());
			}
		}

		return obj;
	},
	
	setPoints : function(points) {
		this.points = points;
	},
	
	getPoints : function() {
		return this.points;
	},
	
	addToPoints : function(latLng) {
		this.points[0].push(latLng);
	},
	
	isStub : function() {
		return this.settings.stub;
	},
	
	getCenterMarker : function() {
		return this.settings.centerMarker;
	},
	
	setCenterMarker : function(marker) {
		this.settings.centerMarker = marker;
	},
	
	setStub : function(stub) {
		this.settings.stub = stub;
	},
	
	isPolygonHidden : function() { 
		return this.polygonHidden;
	},
	
	setPolygonHidden : function(hidden) {
		this.polygonHidden = hidden;
	},
	
	setPermanentPolygon : function(permanentPolygon) {
		this.settings.permanentPolygon = permanentPolygon;
	},
	
	getPermanentPolygon : function() {
		return this.settings.permanentPolygon;
	},
	
	showPolygon : function() {
		alert("not implemented in base class");
	},
	
	hidePolygon : function() {
		alert("not implemented in base class");
	},
	
	getBounds : function() {
		var bounds = new nefos.LatLngBounds();
		for (var i = 0; i < this.points[0].length; i++) {
		    bounds.extend(this.points[0][i]);
		}
		return bounds;
	},
	
	contains : function(latLng) {		
		// Raycast point in polygon method
		var numPoints = this.points[0].length;
		var inPoly = false;
		var i;
		var j = numPoints-1;
		
		for(var i=0; i < numPoints; i++) { 
			var vertex1 = this.points[0][i];
			var vertex2 = this.points[0][j];
			
			if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())	 {
				if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
					inPoly = !inPoly;
				}
			}
			
			j = i;
		}
		
		return inPoly;
	},
	
	setStyle : function() {
		jQuery.extend(this.settings, style);
	}
});

if(nefos.Browser.oldIe){
	nefos.Polygon.DEFAULT_SMOOTH_FACTOR = 4;
}
else{
	nefos.Polygon.DEFAULT_SMOOTH_FACTOR = 1;
}

nefos.Circle = nefos.GeoObject.extend({
	init : function(position, settings) {
		this._super(nefos.GeoObject.TYPE_CIRCLE, settings);
		
		this.settings.fillColor = this.settings.fillColor || "#9999FF"; //lightblue
		this.settings.fillOpacity = this.settings.fillOpacity || 0.5;
		this.settings.strokeColor = this.settings.strokeColor || "#000053"; //dark nefoslike blue
		this.settings.strokeWidth = this.settings.strokeWidth || 2;
		this.settings.strokeOpacity = this.settings.strokeOpacity || 1;
		this.settings.radius = this.settings.radius || 10;
		this.settings.fixedSize = this.settings.fixedSize || false;
		
		this.position = position;
	},
	
	clone : function() {
		alert("clone() not yet implemented for circle.");
	},
	
	setPosition : function(position) {
		this.position = position;
	},
	
	getPosition : function() {
		return this.position;
	}
	
	
});

nefos.Resource = nefos.EventEmitter.extend({
	init : function(id, content, geoObjects, settings) {
		this._super(settings);
		
		this.id = id;
		this.content = content;
		this.geoObjects = geoObjects || [];
		this.addedMaps = [];
		
		this.listData = {}; //Container for listview specific objects
		
		this.settings.visible = !this.settings.hidden;
		this.settings.id = this.settings.id || -1;
		this.settings.clusterable = this.settings.clusterable || false;
		
		this.linkedResources = [];
		this.linkedPois = null;
		
		this.type = "resource";
	},
	
	clone : function() {
		var obj = new nefos.Resource();
		obj.id = this.id;
		
		obj.settings = {};
		obj.content = jQuery.extend(true, {}, this.content);
		obj.geoObjects = [];
		for (var i=0;i<this.geoObjects.length;i++) {
			obj.geoObjects.push(this.geoObjects[i].clone());
		}
		obj.settings.visible = this.settings.visible;
		obj.settings.id = this.settings.id;
		obj.settings.clusterable = this.settings.clusterable;
		
		obj.completeObjectType = this.completeObjectType;
		
		obj.linkedResources = [];
		for (var i=0;i<this.linkedResources.length;i++) {
			obj.linkedResources.push(this.linkedResources[i].clone());
		}
		
		if (this.images) {
			obj.images = this.images.slice();
		}
		

		obj.type = this.type;
		return obj;
	},
	
	getResourceBounds : function() {
		var bounds = new nefos.LatLngBounds();
		
		if (this.hasLinkedPolyObject()) {
			for (var i=0;i<this.geoObjects.length;i++) {
				if(this.geoObjects[i].position == null){
					if(this.geoObjects[i].getMap()){ //is object on map?
						bounds.extendByBounds(this.geoObjects[i].getBounds());
					}
				}
			}
			return bounds;
		}
		else {
			return null;
		}
	},
	
	hasLinkedPolyObject : function() {
		for (var i=0;i<this.geoObjects.length;i++) {
			var geoObject = this.geoObjects[i];
			if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE || geoObject.getType() == nefos.GeoObject.TYPE_POLYGON) {
				return true;
			}
		}
		return false;
	},

	hasLinkedPolyline : function() {
		for (var i=0;i<this.geoObjects.length;i++) {
			var geoObject = this.geoObjects[i];
			if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE) {
				return true;
			}
		}
		return false;
	},
	
	getTotalPolylinePoints : function() {
		var points = 0;
		for (var i=0;i<this.geoObjects.length;i++) {
			var geoObject = this.geoObjects[i];
			if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE) {
				points += geoObject.points.length;
			}
		}
		return points;
	},
	
	getPolylineFromIndex : function(index) {
		var globalIndex = 0;
		for (var i=0;i<this.geoObjects.length;i++) {
			var geoObject = this.geoObjects[i];
			if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE) {
				if (index < (globalIndex + geoObject.points.length)) {
					return {
						polyline: geoObject,
						index: index - globalIndex
					}
				}
			}
			globalIndex += geoObject.length
		}
	},
	
	setLinkedPois : function(pois) {
		this.linkedPois = pois;
	},
	
	getGeoObjects : function() {
		return this.geoObjects;
	},
	
	addGeoObject : function(geoObject) {
		this.geoObjects.push(geoObject);
	},
	
	getContent : function() {
		return this.content;
	},
	
	setContent : function(content) {
		this.content = content;
	},
	
	addToMap : function(map) {
		map.addResource(this);
		this.addedMaps.push(map);
	},
	
	getMap : function() {
		if (this.addedMaps.length > 0) {
			return this.addedMaps[0];
		}
		return null;
	},
	
	getMaps : function() {
		return this.addedMaps;
	},
	
	getClusterGeoObject : function() {
		if (!this.settings.clusterable) {
			return null;
		}
		return this.getReferencePoint();
	},
	
	getReferencePoint : function() {
		var firstPoint = null;
		
		for (var i=0;i<this.geoObjects.length;i++) {
			var geoObject = this.geoObjects[i];
			
			if (firstPoint == null && geoObject.getType() == nefos.GeoObject.TYPE_POINT) {
				firstPoint = geoObject;
			}
			
			if (firstPoint == null && (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE)) {
				if (geoObject.getStartMarker()) {
					firstPoint = geoObject.getStartMarker();
				}
				else if (geoObject.getMiddleMarker()) {
					firstPoint = geoObject.getMiddleMarker();
				}
				else if (geoObject.getEndMarker()) {
					firstPoint = geoObject.getEndMarker();
				}
			}
			
			if (firstPoint == null && (geoObject.getType() == nefos.GeoObject.TYPE_POLYGON)) {
				if (geoObject.getCenterMarker()) {
					firstPoint = geoObject.getCenterMarker();
				}
			}
			
			if (geoObject.clusterObject) {
				return geoObject;
			}
		}
		
		return firstPoint;
	},
	
	getName : function() {
		return this.content.name;
	},
	
	getTrimmedName : function(maxLength) {
		maxLength = maxLength || 10;
    	var name = this.getName();
    	if (name.length > maxLength) {
    		name = name.substring(0, 8) + "..";
    	}
    	return name;
	},
	
	getDescription : function() {
		return this.content.description;
	},
	
	getId : function() {
		return this.id;
	},
	
	setLinkedResources : function(linkedResources) {
		this.linkedResources = linkedResources;
	},
	
	getLinkedResources : function() {
		return this.linkedResources;
	},
	
	addLinkedResource : function(resource) {
		this.linkedResources.push(resource);
	},
	
	getLinkedPois : function() {
		if (!this.linkedPois) {
			this.buildLinkedPois(true);
		}
		return this.linkedPois;
	},
	
	resetLinkedPois : function() {
		jQuery.each(this.linkedResources, function(idx, resource) {
			resource.routeMapping = null;
		});
		this.linkedPois = null;
	},
	
	inCategory : function(catId) {
		if (!this.content.categories) {
			return false;
		}
		for (var i=0;i<this.content.categories.length;i++) {
			if (this.content.categories[i] == catId) {
				return true;
			}
		}
		return false;
	},
	
	//TODO:
	//Plenty of room for optimisation!
	getNearestPoint : function(latLng) {
		return nefos.GetNearestPoint(latLng, this.geoObjects);
	},
	
	buildLinkedPois : function(mapToRoute) {
		this.linkedPois = [];
		var outer = this;		
						
		jQuery.each(this.linkedResources, function(resourceIdx, linkedResource) {
			jQuery.each(linkedResource.geoObjects, function(geoObjectIdx, geoObject) {
				if (geoObject.getType() == nefos.GeoObject.TYPE_POINT) {
					
					//push to linkedPois
					outer.linkedPois.push(linkedResource);
					
					if (mapToRoute) {
						var minDist = Math.pow(2, 53); //== Integer.MAX
						var poiMarker = geoObject;
						var routeMapping = {};
						
						jQuery.each(outer.geoObjects, function(myGeoObjectIdx, myGeoObject) {
							var polylineCnt = 0;
							if (myGeoObject.getType() == nefos.GeoObject.TYPE_LINESTRING) {
								
								var i = 0;								
								for (var i=0;i<myGeoObject.getPoints().length;i++) {
									var point = myGeoObject.getPoints()[i];
									var dist = point.distance(poiMarker.getPosition());
									
									if (dist < minDist) {
										minDist = dist;
										routeMapping = {
											//source geoobject and point idx
											geoObject: myGeoObject,
											geoObjectIdx : myGeoObjectIdx,
											pointIdx : i,
											
											//target resource & geoobject
											linkedGeoObject: geoObject,
											linkedGeoObjectIdx: geoObjectIdx,
											linkedResource: linkedResource
										};
									}
								}
								
								polylineCnt++;
							}
						});
						
						//Add to linkedPois in linestring geoObject (source)
						if (routeMapping.geoObject.linkedPois) {
							routeMapping.geoObject.linkedPois.push(routeMapping);
						}
						else {
							routeMapping.geoObject.linkedPois = [routeMapping];
						}
	
						//set target linked resource mapping
						linkedResource.routeMapping = routeMapping; //eventally make this with getter & setter?
						
					}
					return;
				} 
			});
		});
	}
});




/* Todo: Implement a proper overlay / tile  mechanism!
nefos.CanvasMapOverlay = nefos.EventEmitter.extend({
	init : function(settings) {
		this._super(settings);
		
		this.canvas = null;
		this.ctx = null;
		this.interval = null;
		
		
	},
	
	createCanvas : function(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.position = 'absolute';
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.top = "0px";
		this.canvas.style.left = "0px";
		
		
		this.ctx = this.canvas.getContext('2d');

		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
	},
	
	updateDimension : function(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
	},
	
	getCanvas : function() {
		return this.canvas;
	},
	
	render : function() {
		
	},
	
	startRenderLoop : function() {
		var outer = this;
		this.interval = setInterval(function() {
			outer.render();
		}, 33);
	}
	
});
*/

nefos.CustomMapOverlay = nefos.GeoObject.extend({
	init : function(latLng, settings) {
		this._super(nefos.GeoObject.TYPE_CUSTOM_OVERLAY, settings);
		
		this.latLng = latLng;
		this.settings.clickable = this.settings.clickable || false;
	},
	
	setPosition : function(latLng) {
		this.latLng = latLng;
	},
	
	getPosition : function(latLng) {
		return this.latLng;
	},
	
	isClickable : function() {
		return this.settings.clickable;
	},
	
	getOverlay : function() {
		alert("not implemented in base class!");
	},
	
	createOverlay : function() {
		alert("not implemented in base class!");
	},
	
	showOverlay : function(point) {
		//Noop
	},
	
	hideOverlay : function() {
		//Noop.
	},
	
	destroyOverlay : function() {
		//Noop
	},
	
	setRelativePosition : function(point) {
		this.settings.relativePosition = point;
	},
	
	getRelativePosition : function() {
		return this.settings.relativePosition;
	},
	
	getHeight : function() {
		return  nefos.CssInt(this.getOverlay(), "height");
	},
	
	getWidth : function() {
		return nefos.CssInt(this.getOverlay(), "width");
	},
	
	isCenterOverlay : function() {
		return false;
	},
	
	getCenter : function() {
		alert("getCenter() not implemented in base class!");
	}
});

nefos.MapMarkerMenu = nefos.CustomMapOverlay.extend({
	init : function(latLng, settings) {
		this._super(latLng, settings);
		
		this.settings.menu = this.settings.menu || {};
		this.settings.clickable = true;
		this.settings.borderWidth = this.settings.borderWidth || 6;
		
		this.dimensionsInit = false;
		this.hideTimeout = null;
	},
	
	hideMenu : function() {
		var context = this;
		if (!this.hideTimeout) {
			this.hideTimeout = setTimeout(function() {
				context._doHideMenu();
			}, 700);
		}
	},
	
	resetHideTimeout : function() {
		if (this.hideTimeout) {
			clearTimeout(this.hideTimeout);
			this.hideTimeout = null;
		}
	},
	
	_doHideMenu : function() {
		this.removeFromMap();
	},
	
	initDimensions : function() {
		if (!this.dimensionsInit) {
			var context = this;
			
			this.markerWidth = parseInt(this.settings.markerWidth);
			this.markerHeight = parseInt(this.settings.markerHeight);
			
			this.itemWidth = 0;
			this.itemHeight = 0;
			
			jQuery.each(["north","south","east","west"], function(idx, dir) {
				if (context["$menuItem" + dir.capitalize()]) {
					var item = context["$menuItem" + dir.capitalize()];
					context.itemWidth = Math.max(context.itemWidth, nefos.CssInt(item, "width"));
					context.itemHeight = Math.max(context.itemHeight, nefos.CssInt(item, "height"));
				}
			});
			
			if (this.$menuItemNorth) {
				this.$menuItemNorth.css({
					top: "0px",
					left: ((this.itemWidth + this.markerWidth) / 2) + "px"
				});
				
			}
			
			if (this.$menuItemEast) {
				this.$menuItemEast.css({
					top: ((this.itemHeight + this.markerHeight) / 2) + "px",
					right: "0px"
				});
			}
			
			if (this.$menuItemSouth) {
				this.$menuItemSouth.css({
					bottom: "0px",
					left: ((this.itemWidth + this.markerWidth) / 2) + "px"
				});
			}
			
			if (this.$menuItemWest) {
				this.$menuItemWest.css({
					top: ((this.itemHeight + this.markerHeight) / 2) + "px",
					left: "0px"
				});
			}
		}
		
		this.dimensionsInit = true;
	},
	
	createOverlay : function() {
		var context = this;
		
		this.$container = jQuery("<div class='markerMenuContainer'></div>");
				
		jQuery.each(["north","south","east","west"], function(idx, dir) {
			if (context.settings.menu[dir]) {
				context._createMenuItem(dir);
			}
		});		
	},
	
	_createMenuItem : function(dir) {	
		var context = this;
		
		var menuItem =  jQuery("<div class='markerMenuItem" + dir.capitalize() + " markerMenuItem'></div>");
		
		if (this.settings.menu[dir].image) {
			var menuItemImg = jQuery("<div class='markerMenuItemImg'></div>").html("<img src='" + this.settings.menu[dir].image +"' title='" + this.settings.menu[dir].imageTitle + "'>");
			menuItem.append(menuItemImg);
		}
		
		if (this.settings.menu[dir].title) {
			var menuItemText = jQuery("<div class='markerMenuItemText'></div>");
			menuItemText.html(this.settings.menu[dir].title);
			menuItem.append(menuItemText);
		}
		
		menuItem.click(function() {
			context.emitEvent("menuItemClick", "" + dir);
		});
		
		menuItem.hover(
			function() {
				context.resetHideTimeout();
			},
			function() {
				context.hideMenu();
			}
		);
		
		this.$container.append(menuItem);
	
		this["$menuItem" + dir.capitalize()] = menuItem;
	},
	
	getOverlay : function() {
		return this.$container;
	},
	
	hideOverlay : function() {
		var context = this;
		if (this.$container) {
			this.$container.fadeOut("fast", function() {
				context.$container.remove();
			});
		}
	},
	
	showOverlay : function (point) {	
		var context = this;
		this.initDimensions();
		
		this.$container.css({
			top: (point.y - this.markerHeight - this.itemHeight - this.settings.borderWidth) + "px",
			left: (point.x - this.itemWidth- this.settings.borderWidth) + "px",
			width: (this.markerWidth + this.itemWidth * 2 + this.settings.borderWidth * 2) + "px",
			height: ( this.markerHeight + this.itemHeight * 2 + this.settings.borderWidth * 2) + "px"
		}).fadeIn();
		
		this.hideTimeout = setTimeout(function(){
			context._doHideMenu()
		}, 2500);
	}
});

nefos.MapMarkerHighlight = nefos.CustomMapOverlay.extend({
	init : function(latLng, settings) {
		this._super(latLng, settings);
		
		this.settings.borderWidth = this.settings.borderWidth || 4;


		this.outerWidth = parseInt(this.settings.width) + this.settings.borderWidth * 4;
		this.outerHeight = parseInt(this.settings.height) + this.settings.borderWidth * 4;

        this.settings.anchorX = parseInt(this.settings.anchorX);
        this.settings.anchorY = parseInt(this.settings.anchorY);

        this.offsetX = 0;
        this.offsetY = 0;

        if (this.settings.anchorX != Math.floor(this.settings.width / 2)) {
            if (this.settings.anchorX === 0) {
                this.offsetX = -this.settings.width / 2;
            }
            else {
                //alert("other x offset not implemented!");
            	//TODO	implement other x offset
            }
        }
        if (this.settings.anchorY != Math.floor(this.settings.height / 2))  {
            if (this.settings.anchorY > 0) {
                this.offsetY = this.settings.anchorY / 2;
            }
            else {
                //alert("other y offset not implemented!");
            	//TODO	implement other y offset
            }
        }
		this.animationStep = 0;
		this.stop = false;
			
		this.createOverlay();
	},
	
	createOverlay : function() {
		//Already initialized.
		if (this.$container) {
			return;
		}
		
		this.$outerDiv = jQuery("<div class='nefos-markerHighlight nefos-markerHighlightOuter'></div>");
		this.$middleDiv = jQuery("<div class='nefos-markerHighlight nefos-markerHighlightMiddle'></div>");
		this.$innerDiv = jQuery("<div class='nefos-markerHighlight nefos-markerHighlightInner'></div>");
	
		this.$container = jQuery("<div class='nefos-markerHighlightContainer'></div>");
		
		this.$container.append(this.$outerDiv);
		this.$container.append(this.$middleDiv);
		this.$container.append(this.$innerDiv);

	},
	
	getOverlay : function() {
		return this.$container;
	},
	
	hideOverlay : function() {
		this.stopAnimation();
	},
	
	stopAnimation : function() {
		this.stop = true;
		this.animationStep = 0;
		this.$outerDiv.stop().hide().css("opacity",1);
		this.$middleDiv.stop().hide().css("opacity",1);
		this.$innerDiv.stop().hide().css("opacity",1);
	},
	
	showOnMap : function(map) {
		this._super(map);
	},
	
	removeFromMap : function() {
		this._super();
	},
	
	showOverlay : function () {
		this.$innerDiv.css({
			width: this.outerWidth - this.settings.borderWidth * 4,
			height:this.outerHeight - this.settings.borderWidth * 4,
			top: (this.settings.borderWidth * 2) + "px",
			left: (this.settings.borderWidth * 2) + "px"
		});
		
		this.$middleDiv.css({
			width: this.outerWidth - (this.settings.borderWidth * 2),
			height:this.outerHeight - (this.settings.borderWidth * 2),
			top: (this.settings.borderWidth) + "px",
			left: (this.settings.borderWidth) + "px"
		});
		
		this.$outerDiv.css({
			"width": this.outerWidth,
			"height": this.outerHeight,
			top: "0px",
			left: "0px"
		});

		this.$outerDiv.show();
		this.$middleDiv.show();
		this.$innerDiv.show();
		
		this.stopAnimation();
		this.stop = false;
		this._nextAnimationStep();
	},	
	
	getCenter : function() {
		return {
			x: this.outerWidth / 2 + this.settings.borderWidth + this.offsetX,
			y: this.outerHeight / 2 + this.settings.borderWidth + this.offsetY
		};
	},
	
	isCenterOverlay : function() {
		return true;
	},
	
	_nextAnimationStep : function() {
		var context = this;
			
		if (this.animationStep == 0) {
			context.$innerDiv.fadeOut(1000);
			context.$outerDiv.fadeIn(1800, function() {
				if (context.stop) {
					return;
				}
				context.animationStep++;
				context._nextAnimationStep();
			});
		}
		else if (this.animationStep == 1) {
			context.$outerDiv.fadeOut(1000);
			
			context.$middleDiv.fadeIn(1800, function() {
				if (context.stop) {
					return;
				}
				context.animationStep++;
				context._nextAnimationStep();
			});
		}
		else {
			context.$middleDiv.fadeOut(1000);
			context.$innerDiv.fadeIn(1800, function() {
				if (context.stop) {
					return;
				}
				context.animationStep = 0;
				context._nextAnimationStep();
			});
		}
	}
	
});


nefos.Map = nefos.EventEmitter.extend({
	init : function(mapContainer, settings) {
		this._super(settings);
		
		this.mapContainer = mapContainer;
		this.$mapContainer = $(this.mapContainer);
		
		this.resources = [];
		
		this.settings.iconConfig = this.settings.iconConfig || {};
		this.settings.iconShadowConfig = this.settings.iconShadowConfig || {};
		
		this.settings.routePositionIcon = this.settings.routePositionIcon || "http://mapservices.eu/nefos/static/img/position.png";
		
		//Default center to IBK
		this.settings.center = this.settings.center || new nefos.LatLng(46.70059219342468, 11.3983154296875);
		this.settings.zoomLevel = this.settings.zoomLevel || 15;
		this.settings.enableHighlight = this.settings.enableHighlight === undefined ? true : this.settings.enableHighlight;
		
		this.DEFAULT_RESOLUTION=611.4962;

		this.EARTH_RADIUS = 6378137.0;
		this.DEG_TO_RAD = .0174532925199432958;
		this.RAD_TO_DEG = 57.29577951308232;
		this.FOURTHPI = 0.78539816339744833;
		this.HALFPI = 1.5707963267948966;
		this.HIGHEST_RES = 78271.5170;
		this.ORIGIN_SHIFT = 20037508.342789244; //2 * math.pi * 6378137 / 2.0
		this.TILE_SIZE = 256;
		
		this.rawGeoObjects = []; //this arent checked/managed by the map for visibility, event broadcasting, etc.
		
		this.highlight = null; //higlight map object
		this.focus = null; //focus map object
		
		this.markerMenu = null; //markerMenu
		this.routePositionMarker = null; //position marker on route
		
		this.resourceIndex = {};
	},
	
	setIconConfig : function(config) {
		this.settings.iconConfig = config;
	},
	
	setIconShadowConfig : function(config) {
		this.settings.iconShadowConfig = config;
	},
	
	setRoutePositionIcon : function(icon) {
		this.settings.routePositionIcon = icon;
		if (this.routePositionMarker) {
			this.routePositionMarker.removeFromMap();
			this.routePositionMarker = null;
		}
	},
	
	/**
	 * @public
	 * Return the map container of this map, normally surrounding DIV element.
	 * @return jQuery object of map container
	 */
	getMapContainer : function() {
		return this.$mapContainer;
	},
	
	
	/**
	 * Return the resolution (m/px) for the given zoom index given a standard
	 * power of two zoom breakdown.
	 * @public
	 * @name fromLevel
	 * @methodOf nanomaps.Projections.WebMercator#
	 * @param {Number} level
	 * @return {Number} resolution
	 */
	getResolutionFromZoomLevel : function(level) {
		return this.HIGHEST_RES/Math.pow(2, level-1);
	},

	/**
	 * Return the level for the given resolution on the standard power of
	 * two scale.
	 * @public
	 * @name toLevel
	 * @methodOf nanomaps.Projections.WebMercator#
	 * @param {Number} resolution
	 * @return {Number} level
	 */
	getZoomLevelFromResolution : function(resolution) {
		return Math.log(this.HIGHEST_RES/resolution) / Math.log(2) + 1;
	},
	
	/**
	 * Convert the given longitude/latitude to returned [x, y] coordinates.
	 * Returns null if the lng/lat is out of bounds.
	 * NOTE: the order of the parameters is longitude, latitude, corresponding
	 * with x and y.
	 * In order to align to the viewport, the return value should be subtracted
	 * from this.zeroPx (see toViewport).
	 * @public
	 * @param {Number} lng longitude
	 * @param {Number} lat latitude
	 * @return {Array[x,y]} Global projected pixels of the given lng/lat
	 */
	getAbsolutePoint: function(latLng) {
		var zoomLevel = this.getZoomLevel();
		var point = new nefos.Point(
		          latLng.lng() * this.DEG_TO_RAD * this.EARTH_RADIUS, 
		          Math.log(Math.tan(this.FOURTHPI + 0.5 * this.DEG_TO_RAD * latLng.lat())) * this.EARTH_RADIUS 
		);		
			
		var resolution = this.getResolutionFromZoomLevel(zoomLevel);
		
		point.x/=resolution;
		point.y/=resolution;

		return point;
	},

	/**
	 * Return surface coordinates of the given lat/lng (offset relative to
	 * the zero point)
	 * @public
	 * @param {Number} lng longitude
	 * @param {Number} lat latitude
	 * @return {Array[x,y]} Surface pixels of the given lng/lat
	 */
	getPoint : function(latLng) {
		var zoomLevel = this.getZoomLevel();
		var point = this.getAbsolutePoint(latLng, zoomLevel);
		
		var topLeft = this.getAbsolutePoint(this.getTopLeftLatLng());
		
		point.x-= Math.floor(topLeft.x);
		point.y = Math.floor(topLeft.y - point.y); // Note Y axis inversion
		return point;
	},

	/**
	 * Convert from surface coordinates to [lng, lat] offset from the zero point.
	 * @public
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Array[lng,lat]} Lng/lat corresponding to the suface pixels
	 */
	getLatLng : function(point, absolute) {
		var zoomLevel = this.getZoomLevel();
		var topLeft = new nefos.Point(0,0);
		
		if (!absolute) {
			topLeft = this.getAbsolutePoint(this.getTopLeftLatLng());
		}
		point.x = point.x + topLeft.x;
		point.y = topLeft.y - point.y;	// Note Y axis inversion
	
		var resolution=this.getResolutionFromZoomLevel(zoomLevel);
		
		point.x = point.x * resolution;
		point.y = point.y * resolution;
		 
		return new nefos.LatLng(this.RAD_TO_DEG * (this.HALFPI - 2. * Math.atan(Math.exp(-point.y/this.EARTH_RADIUS))), 
				this.RAD_TO_DEG * point.x / this.EARTH_RADIUS);
	},
	
	//"Converts pixel coordinates in given zoom level of pyramid to EPSG:900913"
    _pixelsToMeters : function (px, py, zoom) {
        var mx = px * this.getResolutionFromZoomLevel(zoom) - this.ORIGIN_SHIFT;
        var my = py * this.getResolutionFromZoomLevel(zoom) - this.ORIGIN_SHIFT;
        return [mx, my];
    },   
	
	// "Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum"
	_metersToLatLng : function(mx, my) {
        var lng = (mx / this.ORIGIN_SHIFT) * 180.0;
        var lat = (my / this.ORIGIN_SHIFT) * 180.0;

        lat = 180 / Math.PI * (2 * Math.atan( Math.exp( lat * Math.PI / 180.0)) - this.HALFPI);
        
        return new nefos.LatLng(lat, lng);
	},
	
	//"Returns bounds of the given tile in EPSG:900913 coordinates"
	getTileBoundsInMeters : function(tx, ty, zoom) {    
        var min = this._pixelsToMeters( tx*this.TILE_SIZE, ty* this.TILE_SIZE, zoom );
        var max = this._pixelsToMeters( (tx+1)*this.TILE_SIZE, (ty+1)*this.TILE_SIZE, zoom );
        return [min, max];
	},	
	
	// "Returns bounds of the given tile in latutude/longitude using WGS84 datum"
    getTileLatLngBounds : function(tx, ty, zoom ) {
        var bounds = this.getTileBoundsInMeters( tx, ty, zoom);
        
        var sw = this._metersToLatLng(bounds[0][0], bounds[0][1]);
        var ne = this._metersToLatLng(bounds[1][0], bounds[1][1]);
         
        return new nefos.LatLngBounds(sw, ne);
    },
    
    getMapTile : function(latLng, zoom) {
    	var lon = latLng.lng();
    	var lat = latLng.lat();
    	
        var mx = lon * this.ORIGIN_SHIFT / 180.0;
        var my = Math.log( Math.tan((90 + lat) * Math.PI / 360.0 )) / (Math.PI / 180.0);

        my = my * this.ORIGIN_SHIFT / 180.0;

        var res = this.getResolutionFromZoomLevel(zoom);
        var px = (mx + this.ORIGIN_SHIFT) / res;
        var py = (my + this.ORIGIN_SHIFT) / res;

        var tx = parseInt( Math.ceil( px / this.TILE_SIZE ) - 1 );
        var ty = parseInt( Math.ceil( py / this.TILE_SIZE ) - 1 );

        return {
        		x: tx, 
        		y:ty
        };
    },
	
	getTopLeftLatLng : function() {
		return new nefos.LatLng(this.getBounds().getNorthEast().lat(), this.getBounds().getSouthWest().lng());
	},

	/**
	 * Adds a {nefos.Resource} to this map
	 * All geoObjects of this resource will be shown on map. 
	 * zoomLevel specs and map bounds are automatically considered (managed geoObject)
	 * @param resource to add
	 */
	addResource : function(toAdd) {
		nefos.CallInContext(this, arguments, function(resource) {
			var context = this;
			
			if (context.hasResource(toAdd.getId())) {
				return;
			}
			
			this.emitEvent("beforeResourceAdd", resource);
			
			this.resourceIndex[toAdd.getId()] = this.resources.length;
			this.resources.push(toAdd);
						
			jQuery.each(resource.getGeoObjects(), function(index, geoObject) {
				context._createGeoObjectOnMap(resource, geoObject);
			});
			this._updateResource(resource);

			
			this.emitEvent("resourceAdd", resource);
			
		});
	},
	
	hasResource : function(id) {
		//Attention === is no typo!
		//AND: dont remove the parenthesis!!
		return !(this.resourceIndex[id] === undefined);
	},
	
	getResourceById : function(id) {
		if (this.hasResource(id)) {
			return this.resources[this.resourceIndex[id]];
		}
		return null;
	},
	
	addResources : function(resources) {
		var outer = this;
		jQuery.each(resources, function(idx, resource) {
			outer.addResource(resource);
		});
	},
	
	addGeoObjectToResource : function(resource, geoObject) {
		resource.addGeoObject(geoObject);
		this._createGeoObjectOnMap(resource, geoObject);
	},
	
	_createGeoObjectOnMap : function(resource, geoObject)	{
		if (geoObject.getType() == nefos.GeoObject.TYPE_POINT) {
			this.createMarkerOnMap(geoObject, resource);
		}
		else if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE) {
			this.createPolylineOnMap(geoObject, resource);
		}
		
		else if (geoObject.getType() == nefos.GeoObject.TYPE_POLYGON) {
			this.createPolygonOnMap(geoObject, resource);
		}
	},
	
	reindexResources : function() {
		var context = this;
		this.resourceIndex = {};
		jQuery.each(this.resources, function(idx, cur) {
			context.resourceIndex[cur.getId()] = idx;
		});
	},
	
	/**
	 * Remove resource from this {google.maps.Map}
	 * @param resource to remove
	 */
	removeResource : function(resource) {
		if (resource == null) {
			return;
		}
		var context = this;
		var idx = this.resourceIndex[resource.getId()];
		var resource = this.resources[idx];
		
		jQuery.each(resource.getGeoObjects(), function(index, geoObject) {
			geoObject.removeFromMap();
		});
		context.resources.splice(idx,1);
		
		resource.linkedPois = null; //memory leak prevention (circular ref)
		
		this.reindexResources();		
		context.emitEvent("resourceRemove", resource);
	},
	
	removeResourceCb : function(cb) {
		if (cb == null) {
			return;
		}
		var context = this;
		
		var toDelete = [];
		
		jQuery.each(this.resources, function(idx, resource) {
			if (cb(resource)) {
				toDelete.push(context.resourceIndex[resource.getId()]);
			}
		});
		
		//delete from the end so that indices won't be altered
		toDelete.reverse();
		
		jQuery.each(toDelete, function(i, resIdx) {
			var resource = context.resources[resIdx];
			
			jQuery.each(resource.getGeoObjects(), function(j, geoObject) {
				geoObject.removeFromMap();
			});
						
			context.resources.splice(resIdx,1);
			context.emitEvent("resourceRemove", resource);
			return;
		});
		
		this.reindexResources();
	},

    removeResources : function() {
        this.resources = [];
        this.reindexResources();
    },
	
	getResources : function() {
		return this.resources;
	},
			
	getPointBounds : function(bounds) {
		var ne = this.getPoint(bounds.getNorthEast());
		var sw = this.getPoint(bounds.getSouthWest());
		
		return new nefos.PointBounds(ne,sw);
	},
	
	getLatLngBounds : function(bounds) {
		var ne = this.getLatLng(bounds.getNorthEast());
		var sw = this.getLatLng(bounds.getSouthWest());
		
		return new nefos.LatLngBounds(ne,sw);
	},
	
	/**
	 * Add raw unmanaged (visibility, bounds, etc.) to map.
	 * Checks for duplicates, important for cluster!
	 * @param geoObject to add
	 */
	addRawGeoObject : function(toAdd, show) {
		var found = false;
		jQuery.each(this.rawGeoObjects, function(idx, geoObject) {
			if (geoObject == toAdd) {
				found = true;
				return;
			}
		});

		if (!found) {
			this.rawGeoObjects.push(toAdd);
			if (toAdd.getType() == nefos.GeoObject.TYPE_POINT) {
				this.createMarkerOnMap(toAdd, null);
			}
			else if (toAdd.getType() == nefos.GeoObject.TYPE_POLYLINE) {
				this.createPolylineOnMap(toAdd, null);
			}
			else if (toAdd.getType() == nefos.GeoObject.TYPE_POLYGON) {
				this.createPolygonOnMap(toAdd, null);
			}
			else if (toAdd.getType() == nefos.GeoObject.TYPE_CUSTOM_OVERLAY) {
				this.createCustomOverlayOnMap(toAdd, null);
			}
			else if (toAdd.getType() == nefos.GeoObject.TYPE_CIRCLE) {
				this.createCircleOnMap(toAdd, null);
			}
			/* Todo: Implement a proper overlay mechanism!
			 * else if (toAdd.getType() == nefos.Overlay.TYPE_CANVAS_OVERLAY) {
				this.createCanvasOverlayOnMap(toAdd);
			}*/
		}
		
		if (show) {
			toAdd.showOnMap(this);
		}
	},
	
	setRoutePositionMarker : function(resource, route, pointIndex) {
		if (this.routePositionMarker == null) {
			var icon = {
					image: this.settings.routePositionIcon
			};
			jQuery.extend(true,icon,this.settings.iconConfig);
			
			this.routePositionMarker = new nefos.Marker({
				position: route.getPoints()[pointIndex],
				fromZoomLevel: 0, 
				toZoomLevel: 19,
				zIndex: 1000,
				icon : icon,
				shadow: this.settings.iconShadowConfig
			});
			this.addRawGeoObject(this.routePositionMarker);
			this.routePositionMarker.showOnMap(this);
		}
		else {
			this.routePositionMarker.showOnMap(this);
			this.routePositionMarker.setPosition(route.getPoints()[pointIndex]);
		}
	},
	
	hideRoutePositionMarker : function() {
		if (this.routePositionMarker) {
			this.routePositionMarker.removeFromMap();
		}
	},
	
	removeRawGeoObject : function(geoObject) {
		if (geoObject == null || this.rawGeoObjects == null || this.rawGeoObjects.length == 0) {
			return;
		}
				
		var idx = -1;
		var i = 0;
		for (i=0;i<this.rawGeoObjects.length;i++) {
			if (this.rawGeoObjects[i] == geoObject) {
				idx = i;
				break;
			}
		}
		
		if (idx > -1) {
			geoObject.removeFromMap();
			this.rawGeoObjects.splice(idx,1);
		}
				
	},
	
		
	// a1 is line1 start, a2 is line1 end, b1 is line2 start, b2 is line2 end
	intersects : function(a1, a2, b1, b2) {
	    var intersection = new nefos.LatLng(0,0);
	    
	    var b = new nefos.LatLng(a2.lat(), a2.lng());
	    var d = new nefos.LatLng(b2.lat(), b2.lng());
	    
	    b.sub(a1);
	    d.sub(b1);
	    
	    var bDotDPerp = b.lng() * d.lat() - b.lat() * d.lng();
	    
	    if (bDotDPerp == 0) {
	    	return false;
	    }
	    
	    var c = new nefos.LatLng(b1.lat(), b1.lng());
	    c.sub(a1);
	    
	    var t = (c.lng() * d.lat() - c.lat() * d.lng()) / bDotDPerp;
	    if (t < 0 || t > 1) {
	    	return false;
	    }
	    
	    var u = (c.lng() * b.lat() - c.lat() * b.lng()) / bDotDPerp;
	    if (u < 0 || u > 1) {
	    	return false;
	    }
	    
	    return true;
	},
	
	checkGeoObjectVisibility : function(geoObject) {	
		if (!this.checkGeoObjectZoomLevel(geoObject)) {
			return false;
		}
				
		if (geoObject.getType() == nefos.GeoObject.TYPE_POINT) {
			return this.getBounds().contains(geoObject.getPosition());
		}
		else if (geoObject.getType() == nefos.GeoObject.TYPE_POLYLINE ||
				geoObject.getType() == nefos.GeoObject.TYPE_POLYGON) {
			var points = geoObject.getPoints();
			
			/*if (geoObject.getType() == nefos.GeoObject.TYPE_POLYGON) {
				points.push(points[0]); //for polygons, add closing edge
			}*/
			
			for (var i=0;i<points.length; i++) {
				var point = points[i];
				var nextPoint = null;
				
				if (i == (points.length - 1)) {
					//lastPoint == firstPoint for Polygon
					if (geoObject.getType() == nefos.GeoObject.TYPE_POLYGON) {
						nextPoint = points[0];
					}
					//otherwise leave
					else {
						break;
					}
				}
				else {
					nextPoint = points[i+1];
				}
			
				if (this.getBounds().contains(point)) {
					return true;
				}
				
				var ne = this.getBounds().getNorthEast();
				var sw = this.getBounds().getSouthWest();
				var nw = new nefos.LatLng(ne.lat(), sw.lng());
				var se = new nefos.LatLng(sw.lat(), ne.lng());
								
				if (this.intersects(nw,ne,point,nextPoint) ||
						this.intersects(ne, se, point, nextPoint) ||
						this.intersects(sw, se, point, nextPoint) ||
						this.intersects(sw, nw, point, nextPoint)) {
					return true;
				}
				
				if (i == points.length-2) {
					return this.getBounds().contains(nextPoint);
				}
			} //endfor
			return false;
		}
	},
		
	/**
	 * Eventhandler for moving the map.
	 */
	onMapMoveEnd : function() {
		this.emitEvent("mapMove");
	},
	
	/**
	 * Eventhandler when a nefos.Marker is clicked.
	 * @param resource to which this marker belongs
	 * @param marker which marker was clicked
	 */
	onMarkerClick : function(resource, marker) {
		var context = this;
		if (marker.settings.highlight && this.settings.enableHighlight) {
			this._setHighlight(resource, marker);
			this.emitEvent("resourceClick", resource, marker);
		}
		
		if (marker.settings.showMarkerMenu) {
			var menu = marker.settings.markerMenu || this.settings.markerMenu;
			if (!menu) {
				return;
			}
			var markerMenu = new nefos.MapMarkerMenu(marker.getPosition(), {
				menu: menu,
				markerWidth: marker.settings.icon.width,
				markerHeight: marker.settings.icon.height
			});
			
			markerMenu.createOverlay();
			this.createCustomOverlayOnMap(markerMenu, null);
			markerMenu.showOnMap(this);
		}
	},
	
	onMarkerDrag : function(event, resource, marker) {
		if (this.highlight != null && this.settings.enableHighlight) {
			this.emitEvent("highlightMoved", event, resource, marker);
		}
	},
	
	removeHighlight : function() {
		if (this.highlight) {
			jQuery.each(this.resources, function(idx, res) {
				jQuery.each(res.geoObjects, function(idx, geoObject) {
					if (geoObject.mapData) {
						geoObject.mapData.highlight = null;
					}
				});
			});
			
			this.highlight.removeFromMap();
			this.highlight = null;
		}
	},
	
	/**
	 * @private Add highlight to specified marker
	 * @param marker nefos.Marker to highlight
	 */
	_setHighlight : function(resource, marker) {		
		/*if (this.highlight != null && marker.mapData.highlight == this.highlight) {
			return;
		}*/
		
		if (marker == null || !this.settings.enableHighlight) {
			return;
		}
		
		if (this.focus) {
			this.removeResourceFocus(this.focus);
		}
		
		if (this.highlight) {
			//this.resetHighlight();
			if (this.highlight.marker != marker) {
				this.highlight.marker.mapData.highlight = null; //reset prev. marker
			}
			
			//show on map before setting of position,  for position calculation. (gm hack!)
			this.highlight.showOnMap(this);
			if (!this.highlight.getPosition().equals(marker.getPosition())) {
				this.highlight.setPosition(marker.getPosition());
			}
		}
		else {			
			this.highlight = new nefos.MapMarkerHighlight(marker.getPosition(), {
				width: marker.settings.icon.width,
				height: marker.settings.icon.height,
                anchorX : marker.settings.icon.anchor.x,
                anchorY : marker.settings.icon.anchor.y

			});
			
			this.highlight.createOverlay();
			this.createCustomOverlayOnMap(this.highlight, null);
			
			this.highlight.setSettings({
				width: marker.settings.icon.width,
				height: marker.settings.icon.height	
			});
			
			this.highlight.showOnMap(this);
		}
	
		this.highlight.marker = marker;
		marker.mapData.highlight = this.highlight;
		
	},
	
	checkGeoObjectZoomLevel : function(geoObject) {
		if (geoObject.getAlwaysVisible()) {
			return true;
		}
		
		return (this.getZoomLevel() >= geoObject.settings.fromZoomLevel) && 
					(this.getZoomLevel() <= geoObject.settings.toZoomLevel);

	},
	
	/**
	 * @private Updates resource visibility on map
	 * @param resource to update
	 */
	_updateResource : function(resource) {
		var context = this;
		
		var resourceWasVisible = false;
		var resourceIsVisible = false;
		
		jQuery.each(resource.getGeoObjects(), function(index, geoObject) {
			
			var onMap = geoObject.getMap();
			
			//Before update one geoobject of this resource was visible
			if (onMap != null) {
				resourceWasVisible = true;
			}
			
			if (!resource.settings.visible || !context.checkGeoObjectZoomLevel(geoObject)) {
				if (onMap != null) {
					geoObject.removeFromMap();
					
					//Eventually hide highlight marker
					if (geoObject.mapData.highlight) {
						geoObject.mapData.highlight.removeFromMap();
					}
					
					geoObject.emitEvent("geoObjectHide", context);
				}
			}
			else {			
				geoObject.showOnMap(context);
					//if (onMap == null) {
					//Always try to show geoobject. Needs to take care itself to prevent double adding to native map.
					//This solves some nasty bugs with polyline stubs and clusters. [FF]
					//geoObject.emitEvent("geoObjectShow", context); 
					//}
				//If this ressource was clicked, show hightlight marker
				if (geoObject.mapData.highlight && context.settings.enableHighlight) {
					context._setHighlight(resource, geoObject);
				}
				resourceIsVisible = true;
			}
		});
		
		if (!resourceWasVisible && resourceIsVisible) {
			this.emitEvent("resourceShow", resource);
		}
		else if (resourceWasVisible && !resourceIsVisible) {
			this.emitEvent("resourceHide", resource);
		}
	},
	
	/**
	 * Update visibility of all resources of this map
	 */
	updateResources : function() {	
		var context = this;
		jQuery.each(this.resources, function(idx, resource) {
			context._updateResource(resource);
		});
	},

	
	createMarkerOnMap : function(marker, resource) {
		alert("createMarkerOnMap not implemented in base class!");
	},

	createPolylineOnMap : function(polyline, resource) {
		if (polyline.getStartMarker()) {
			this.createMarkerOnMap(polyline.getStartMarker(), resource);
		}
		
		if (polyline.getMiddleMarker()) {
			this.createMarkerOnMap(polyline.getMiddleMarker(), resource);
		}
		
		if (polyline.getEndMarker()) {
			this.createMarkerOnMap(polyline.getEndMarker(), resource);
		}
		
		if (!polyline.isStub() && !polyline.isLineHidden()) {
			this.createPolylineLineOnMap(polyline, resource);
		}
	},
	
	createPolygonOnMap : function(polygon, resource) {
		if (polygon.getCenterMarker()) {
			this.createMarkerOnMap(polygon.getCenterMarker(), resource);
		}
		
		if (!polygon.isStub() && !polygon.isPolygonHidden()) {
			this.createPolygonLineOnMap(polygon, resource);
		}
	},
	
	createBoundsPolygon : function(bounds) {
		if (bounds) {
			var polygon = new nefos.Polygon({
				points: [[
				         bounds.getSouthWest(),
				         new nefos.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()),
				         bounds.getNorthEast(),
				         new nefos.LatLng(bounds.getSouthWest().lat(), bounds.getNorthEast().lng())
				]]
			});
			
			this.addRawGeoObject(polygon);
			polygon.showOnMap(this);
		}
	},
	
	createLatLngMarker : function (latLng) {
		if (latLng) {
			var marker = new nefos.Marker({
				position: latLng
			});
			
			this.addRawGeoObject(marker);
			marker.showOnMap(this);
		}
	},
	
	resourceDump : function() {
		jQuery.each(this.resources, function(idx, res) {
			nefos.L("map", idx, res.getName());
		});
	},
	
	/**
	 * Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	 * Improves rendering performance dramatically by lessening the number of points to draw.
	 * 
	 * @param tolerance how much to simplify the polyline on each zoom level
	 * more = better performance and smoother look, less = more accurate
	 * 
	 * @param points array of points in pixel coordinates.
	 */
	simplify : function(/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) return points.slice();
		
		// stage 1: vertex reduction
		points = this.reducePoints(points, tolerance);
		
		// stage 2: Douglas-Peucker simplification
		points = this.simplifyDP(points, tolerance);
		
		return points; 
	},
	
	// distance from a point to a segment between two points
	pointToSegmentDistance:  function(/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqPointToSegmentDist(p, p1, p2));
	},
	
	closestPointOnSegment: function(/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		var point = this._sqClosestPointOnSegment(p, p1, p2);
		point.distance = Math.sqrt(point._sqDist);
		return point;
	},
	
	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	simplifyDP: function(points, tol) {
		var maxDist2 = 0,
			index = 0,
			t2 = tol * tol;

		for (var i = 1, len = points.length, dist2; i < len - 1; i++) {
			dist2 = this._sqPointToSegmentDist(points[i], points[0], points[len - 1]);
			if (dist2 > maxDist2) {
				index = i;
				maxDist2 = dist2;
			}
		}
		
		if (maxDist2 >= t2) {
			var part1 = points.slice(0, index),
				part2 = points.slice(index),
				simplifiedPart1 = this.simplifyDP(part1, tol).slice(0, len - 2),
				simplifiedPart2 = this.simplifyDP(part2, tol);
			
			return simplifiedPart1.concat(simplifiedPart2);
		} else {
			return [points[0], points[len - 1]];
		}
	},
	
	// reduce points that are too close to each other to a single point
	reducePoints: function(points, tol) {
		var reducedPoints = [points[0]],
			t2 = tol * tol;
		
		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) < t2) continue;
			reducedPoints.push(points[i]);
			prev = i;
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},
	
	setResourceFocus : function(resource) {
		if (this.focus) {
			this.removeResourceFocus(this.focus);
		}
		this.emitEvent("resourceFocus", resource);
		this.focus = resource;
	},
	
	removeResourceFocus : function(resource) {
		if (resource) {
			this.emitEvent("resourceFocusLost", resource);
		}
		this.focus = null;
	},
	
	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function(p1, p2) {
		var dx = p2.x - p1.x,
			dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},
	
	/**
	 * @return nefos.Point point on segment with attribute _sqDist - square distance to segment
	 */	
	_sqClosestPointOnSegment: function(p, p1, p2) {
		var x2 = p2.x - p1.x,
			y2 = p2.y - p1.y,
			apoint = p1;
		if (x2 || y2) {
			var dot = (p.x - p1.x) * x2 + (p.y - p1.y) * y2,
				t = dot / this._sqDist(p1, p2);
			
			if (t > 1) {
				apoint = p2;
			} else if (t > 0) {
				apoint = new nefos.Point(p1.x + x2 * t, p1.y + y2 * t);
			}
		}
		apoint._sqDist = this._sqDist(p, apoint);
		return apoint;
	},

	// distance from a point to a segment between two points
	_sqPointToSegmentDist: function(p, p1, p2) {
		return this._sqClosestPointOnSegment(p, p1, p2)._sqDist;
	},
	
	createPolylineLineOnMap : function (polyline, resource) {
		alert("createPolylineLineOnMap not implemented in base class!");
	},
	
	createPolygonLineOnMap : function(polygon, resource) {
		alert("createPolygonLineOnMap not implemented in base class!");
	},
	
	createCustomOverlayOnMap : function(overlay, resource) {
		alert("createCustomOverlayOnMap not implemented in base class!");
	},
	
	createCanvasOverlayOnMap : function(overlay) {
		alert("createCanvasOverlayOnMap not implemented in base class!");
	},
	
	createCircleOnMap : function(circle, resource) {
		alert("createCircleOnMap not implemented in base class!");
	},
	
	getBounds : function() {
		alert("getBounds not implemented in base class!");
	},

	setZoomLevel : function(zoomLevel) {
		alert("setZoomLevel not implemented in base class!");
	},
	
	getZoomLevel : function() {
		alert("getZoomLevel not implemented in base class!");
	},
	
	zoomIn : function() {
		this.setZoomLevel(this.getZoomLevel() + 1);
	},

	zoomOut : function() {
		this.setZoomLevel(this.getZoomLevel() - 1);
	},

	fitBounds : function(latLng) {
		alert("fitBounds not implemented in base class!");
	},
	
	getCurrentCenter : function() {
		alert("getCurrentCenter not implemented in base class!");
	},
	
	setMapType : function() {
		alert("setMapType not implemented in base class!");
	},
	
	getMapType : function() {
		alert("getMapType not implemented in base class!");
	},
	
	panTo : function(latLng) {
		alert("panTo not implemented in base class!");
	},
	
	resizeMap : function() {
		alert("resizeMap not implemented in base class!");
	},
	setView : function(center, zoom) {
		alert("setView not implemented in base class!");
	},
	
	getWidth : function() {
		return this.$mapContainer.width();
	},
	
	getHeight : function() {
		return this.$mapContainer.height();
	},
	
	getCenter : function() {
		return this.settings.center;
	},
	
	setCenter : function(latLng) {
		this.settings.center = latLng;
	},
	
	panToResource : function(resource, zoomLevel) {
		var bounds = resource.getResourceBounds();
			
		if (bounds != null) {
			this.fitBounds(bounds);
		}
		else {
			if(resource.geoObjects[0].position != null){
				if(zoomLevel){
					this.setView(resource.geoObjects[0].position, zoomLevel);
				}
				else{
					this.panTo(resource.geoObjects[0].position);
				}
			}
		}	
	}

});

nefos.ClusterOverlay = nefos.CustomMapOverlay.extend({
    init : function(latLng, icons, settings) {
        this._super(latLng, settings);
        
        this.settings.clickable = true;
        this.settings.addShadow = true;
        this.settings.mobile = this.settings.mobile || false;
                
        this.icons = icons || {};
        
    },
    
    addIcon : function(url) {
        if (this.icons[url]) {
            this.icons[url]++;
        }
        else {
            this.icons[url] = 1;
        }
    },
    
    createOverlay : function() {
        var outer = this;
        
        if (this.$container) {
            this.$container.empty();
        }
        else {
            this.$container = jQuery("<div class='nefos-clusterLabelContainer'></div>");          
        }
        
        var $startDiv = jQuery("<div class='nefos-clusterLabelFront'>&nbsp;</div>");
        var $centerDiv = jQuery("<div class='nefos-clusterLabelMiddle'></div>");
        var $endDiv = jQuery("<div class='nefos-clusterLabelBack'>&nbsp;</div>");
        
        var itemCnt = 0;
        var width = 0;
        
        
        for (var icon in this.icons) {
            var $itemContainer = jQuery("<div class='nefos-clusterLabelItem'></div>");
                        
            var $item = jQuery("<div class='nefos-clusterLabelItemImage'></div>");
            $item.css({
                "backgroundImage" : "url('" + icon + "')",
                "cursor" : "pointer"
            });
            
            var $itemText = jQuery("<div class='nefos-clusterLabelItemText'></div>");
            $itemText.html(this.icons[icon]);
            
            $itemContainer.append($item).append($itemText);
            $centerDiv.append($itemContainer);
            
            itemCnt++;

            //TODO: Don't clutter all those if / else mobile things over the codebase. Should be done in an OOP way. [FF]
            if (!this.settings.mobile) {
                $itemContainer.bind(nefos.ClickEvent, function() {
                    var background = $(this).find("div.nefos-clusterLabelItemImage").css("backgroundImage");
                    var icon = background.replace(/url\(['\"]*/,"").replace(/['\"]*\)/,"");
                    outer.emitEvent("click", outer, icon);
                });

                $itemContainer.hover(
                    function() {
                        $(this).addClass("nefos-clusterLabelItemHover");
                    },
                    function() {
                        $(this).removeClass("nefos-clusterLabelItemHover");
                    }
                );
            }
        }
        
        //TODO: refactor and make configurable!
        this.$container.css("background", "url(http://mapservices.eu/nefos/static/img/mapIcons/vca/shadow" + itemCnt + ".png) 0px 100% no-repeat");
        
        $centerDiv.append("<div style='clear:both'></div>");
        
        this.$container.append($startDiv);
        this.$container.append($centerDiv);
        this.$container.append($endDiv);
        this.$container.append("<div style='clear:both'></div>");
        
        if (this.settings.clusterItemLabelWidth) {
        	var centerWidth = (this.settings.clusterItemLabelWidth * itemCnt + this.settings.clusterItemLabelPadding);
            $centerDiv.css("width", centerWidth + "px");
            if (this.settings.setLabelContainerWidth) {            	
            	this.$container.css("width", (centerWidth + 2 * this.settings.clusterItemLabelPadding) + "px");
            }
        }
        
        if (this.settings.mobile) {
            this.$container.bind(nefos.ClickEvent, function() {
                outer.emitEvent("click", outer, null);
            });
        }
    },
    
    hideOverlay : function(){ 
        if (this.$container) {
            this.$container.fadeOut();
        }
    },
    
    destroyOverlay : function() {
        if (this.$container) {
            this.$container.remove();
        }
    },
        
    getOverlay : function() {
        return this.$container;
    },
    
    
    showOverlay : function(point) {
    	if (point) {
	    	this.$container.css({
	            display: "block",
	            left: point.x + "px",
	            top: (point.y - this.getHeight()) + "px"
	        });
    	}
    	this.$container.fadeIn();
    },
    
    swapIcon : function(source, target) {
    	//nefos.L("cluster", "swap", source, target);
    	if (this.$container) {
	    	this.$container.find("div.nefos-clusterLabelItemImage[style*='" + source + "']").each(function(idx, item) {
	    		$(item).css("backgroundImage", "url('" + target + "')");
	    		//nefos.L("cluster", "backgroundImage", target, $(item).css("backgroundImage"));
	    	});
    	}
    }

});

nefos.ClusterItem = nefos.EventEmitter.extend({
    init : function(cluster, settings) {
        this._super(settings);
        
        this.cluster = cluster;
        
        this.center = new nefos.LatLng(47, 11);
        
        this.bounds = null;
        
        this.clusterOverlay = null;
        
        this.resources = [];
        
        this.settings.simple = this.settings.simple || false;
        this.settings.mobile = this.settings.mobile || false;
        this.settings.simpleImage = "http://mapservices.eu/nefos/static/img/default_cluster.png";
                
        this.settings.maxClusterSize = this.settings.maxClusterSize || 8;
        
        this.settings.expanded = false;
        this.settings.charWidth = 7;
        
        this.settings.stackItemCallback = this.settings.stackItemCallback || null;
        this.settings.orderingCallback = this.settings.orderingCallback || null;
        
        this.hideTimeout = null;
        this.$stack = null;
        
        this.dirty = false;
    },
    
    setCenter : function(center) {
        this.center = center; 
    },
    
    getCenter : function() {
        return this.center;
    },
    
    getPointBounds : function() {
        
    },
    
    hideStack : function() {
        nefos.CallInContext(this, arguments, function() {
            var context = this;
            if (this.$stack) {
                var length = context.$stack.children().length;
                
                this.$stack.children().unbind('mouseenter mouseleave mouseover mouseout');
                
                this.$stack.children().each(function(idx, item) {
                    $(item).delay(idx * 50).animate({opacity: 0}, 500, "swing", function() {
                        if (idx == length-1) {
                            context.$stack.remove();
                            context.$stack = null;
                        }   
                    });
                    
                });
            }
        });
    },
    
    //TODO: Clustermenu should be implemented as a MapOverlay.
    /**
     * event when a main cluster, or a difficulty item is clicked
     * control if its a difficulty item by property difficulty
     */
    _clusterOverlayOnClick : function(clusterOverlay, icon, difficulty) {
        nefos.CallInContext(this, arguments, function() {
            var context = this;
                        
            context.emitEvent("clusterClick", context);

            //No further event handling needed for mobile clusters
            if (this.settings.mobile) {
                return;
            }

            if (context.$stack) {
                context.$stack.remove();
                context.$stack = null;
                
                if (context.hideTimeout) {
                    window.clearTimeout(context.hideTimeout);
                    context.hideTimeout = null;
                }
            }
            
            var resources = context.resources;
            
            if (icon && !context.settings.simple) {
                resources = [];
                jQuery.each(context.resources, function(idx, resource) {
                    if (resource.getClusterGeoObject().getClusterIcon().image == icon) {
                        resources.push(resource);
                    }
                });
            }
            
            var id = context.getUniqueId();
            var $mapContainer = $(context.cluster.map.mapContainer);
            var markerPoint = context.cluster.map.getPoint(clusterOverlay.getPosition());
            
            context.$stack = $("<div class='nefos-clusterStackContainer' id='" + id + "' style='overflow: hidden; display:none'></div>");
            context.$stack.css({position: "absolute"});
            
            var reversedItems = [];
            var orderedResources;
            
            //order resources to hash if callback defined
            if(this.settings.orderingCallback){
            	orderedResources = this.settings.orderingCallback(resources);
            	
            	for(idx in orderedResources){
            		if(orderedResources[idx].length > this.settings.maxClusterSize) {
            			context.emitEvent("largeClusterClick", context);
                        return;
            		}
            	}
            }
            else{
            	if (resources.length > this.settings.maxClusterSize) {
                    context.emitEvent("largeClusterClick", context);
                    return;
                }
                else if (resources.length == 0){
                    return;
                }
            	
            	orderedResources = {'other': resources};
            }
            
            if(difficulty){
            	orderedResources = {'other': orderedResources[difficulty]};
            }
            
            var buildStackItem = function(size, iconImage, idx, resource){
            	var $stackItem = $("<div class='nefos-clusterStackItem'></div>").css({
                    "marginLeft": (size-1-idx) * Math.pow(context.cluster.settings.stackOffset,2), 
                    "marginRight" : idx * Math.pow(context.cluster.settings.stackOffset,2),
                    overflow: "hidden",
                    opacity: 0
                });
                
                var $stackItemText = $("<div class='nefos-clusterStackItemText'></div>");
                //test if its an resource or simple string
                if(resource.content){
	                if(context.settings.stackItemCallback){
	                	$stackItemText.append(context.settings.stackItemCallback(resource));
	                }
	                else{
	                	$stackItemText.append(resource.getName());
	                }
                }
                else{
                	$stackItemText.append(resource);
                	$stackItemText.css('width', '80px');
                	$stackItem.css('width', '130px');
                }
                
                var $stackItemImage = $("<div class='nefos-clusterStackItemImage'></div>");
                $stackItem.css({
                    backgroundImage : "url('" + iconImage + "')",
                    backgroundPosition: "10px 50%",
                    backgroundRepeat: "no-repeat"
                });
                
                $stackItem.append($stackItemImage);
                $stackItem.append($stackItemText);
                $stackItem.append("<div style='clear:both'></div>");
                
                return $stackItem;
            };
            
            //creates the stack items for the resources in stack
            var createResourceStack = function(resources){
	            jQuery.each(resources, function(idx, resource) {
	                var icon = resource.getClusterGeoObject().getClusterIcon();
	                var iconImage = icon.image;
	                var $stackItem = buildStackItem(resources.length, iconImage, idx, resource);
	                
	                context.$stack.append($stackItem);
	                
	                $stackItem.hover(
	                    function() {
	                        $(this).addClass("nefos-clusterStackItemHover");
	                        context.cluster.map.emitEvent("markerMouseOver", resource, resource.getClusterGeoObject()); //Mhhm, maybe event should be proxied or given another name?
	                    },
	                    function() {
	                        $(this).removeClass("nefos-clusterStackItemHover");
	                        context.cluster.map.emitEvent("markerMouseOut", resource, resource.getClusterGeoObject()); //Mhhm, maybe event should be proxied or given another name?
	                    }
	                );
	                
	                $stackItem.bind(nefos.ClickEvent,function() {
	                    context.emitEvent("stackItemClick", resource);
	                });
	                
	                reversedItems.unshift($stackItem);
	            });
            };
            
            //creates the stack items for the groupes of resources in stack
            var createDifficultyStack = function(hash){
            	var cnt = 0;
            	
	            for(var key in hash) {
	            	(function() {
	            		var copy = key;
		                var iconImage = hash[key][0].getClusterGeoObject().getClusterIcon().image;
		                var $stackItem = buildStackItem(nefos.HashSize(hash), iconImage, cnt, key + ' (' + hash[key].length + ')');
		            
		                context.$stack.append($stackItem);
		                
		                $stackItem.hover(
		                    function() {
		                        $(this).addClass("nefos-clusterStackItemHover");
		                    },
		                    function() {
		                        $(this).removeClass("nefos-clusterStackItemHover");
		                    }
		                );
		                
		                $stackItem.bind(nefos.ClickEvent,function() {
		                	//call function again with difficulty selected
		                	context._clusterOverlayOnClick(clusterOverlay, icon, copy);
		                });
		                
		                reversedItems.unshift($stackItem);
		                cnt++;
	            	})();
	            }
            };
            
            if(nefos.HashSize(orderedResources) < 2){
            	for(var key in orderedResources){
            		//only flat hierarchy
            		createResourceStack(orderedResources[key]);
                }
            }
            else{
            	//different groups of resources found
	            createDifficultyStack(orderedResources);
            }

            context.$stack.hover(
                function() {
                    if (context.hideTimeout) {
                        window.clearTimeout(context.hideTimeout);
                    }
                },
                function() {
                    if (context.hideTimeout) {
                        window.clearTimeout(context.hideTimeout);
                    }
                    context.hideTimeout = window.setTimeout(function() {
                        context.hideStack();
                    }, 700);
                }
            );
            
            context.hideTimeout = window.setTimeout(function() {
                context.hideStack();
            }, 2000);
            
            $mapContainer.append(context.$stack);
            
            var width = context.$stack.width();
            var height = context.$stack.height();
            
            var offsetTop = 0;
            
            if (context.simple) {
                offsetTop = context.marker.settings.icon.height;
            }
            else {
                offsetTop = clusterOverlay.getHeight();
            }
            
            context.$stack.css({
                left : markerPoint.x,
                top  : markerPoint.y - height
            });
                        
            context.$stack.disableSelection();
            context.$stack.show();
            
            jQuery.each(reversedItems, function(idx, $item) {
                var rotation = idx + "deg";
                $item.delay(idx * 50).animate({opacity: 1}, 500, "swing");
            });
        });
    },
    
    addResource : function(resource) {
        var context = this;
        
        if (this.resources.length == 0) {
            var position = resource.getClusterGeoObject().getPosition();
            var map = this.cluster.getMap();
            
            this.center = position;
            this.calculateBounds();
            
            if (this.settings.simple) {
                this.clusterOverlay = new nefos.Marker({
                    icon : {
                        image : this.settings.image
                    },
                    position: position,
                    fromZoomLevel: 0, 
                    toZoomLevel: 19,
                    clickable: true
                });
            }
            else {
                var icon = resource.getClusterGeoObject().getClusterIcon();
                
                this.clusterOverlay = new nefos.ClusterOverlay(position, {}, {
                    clusterItemLabelWidth: this.settings.clusterItemLabelWidth,
                    clusterItemLabelPadding: this.settings.clusterItemLabelPadding,
                    setLabelContainerWidth: this.settings.setLabelContainerWidth
                });
                this.clusterOverlay.addIcon(icon.image);                
            }
            
            this.clusterOverlay.addEventListener("click", function(clusterOverlay, icon) {
                context._clusterOverlayOnClick(clusterOverlay, icon);
            });
        }
        else {
            var position = resource.getClusterGeoObject().getPosition();
            
            //Calculate new middle
            var l = this.resources.length + 1;
            var lat = (this.center.lat() * (l - 1) + position.lat()) / l;
            var lng = (this.center.lng() * (l - 1) + position.lng()) / l;
            
            this.center = new nefos.LatLng(lat, lng);
            this.clusterOverlay.setPosition(this.center); //TODO: this moves the marker, already visible!
            
            if (!this.settings.simple) {
                var icon = resource.getClusterGeoObject().getClusterIcon();
                this.clusterOverlay.addIcon(icon.image);
            }
            
            this.calculateBounds();

        }
                
        this.dirty = true;
        this.resources.push(resource);
        resource.settings.clustered = this;
    },
    
    calculateBounds : function() {      
        var bounds = new nefos.LatLngBounds(this.center, this.center);
        this.bounds = this.cluster.getExtendedBounds(bounds);
    },
    
    getBounds : function() {
        return this.bounds;
    },
    
    contains : function(latLng) {
        return this.bounds.contains(latLng);
    },
    
    remove : function() {
        this.cluster.map.removeRawGeoObject(this.clusterOverlay);
        this.clusterOverlay.destroyOverlay();   
        
        jQuery.each(this.resources, function(idx, resource) {
            resource.settings.clustered = false;
        });
        
        this.resources.length = 0;
        delete this.resources;
    },
    
    updateCluster : function() {
        var context = this;
        
        var visibleCnt = 0;
                
        jQuery.each(this.resources, function(idx, resource) {
            if (resource.settings.clusterable) {
                if (context.cluster.map.checkGeoObjectZoomLevel(resource.getClusterGeoObject())) {
                    visibleCnt++;
                }
                resource.settings.visible = false;
            }   
            else {
                visibleCnt++;
                resource.settings.visible = true;
            }
        });
        
        //Don't cluster one resource.
        if (this.resources.length == 1) {
            this.resources[0].settings.visible = true;
        }
        else if (visibleCnt > 0){
            if (this.dirty) {
                this.clusterOverlay.createOverlay();
            }
            
            this.cluster.map.addRawGeoObject(this.clusterOverlay);
            this.clusterOverlay.showOnMap(this.cluster.map);
            
            //this.cluster.map.createBoundsPolygon(this.bounds);
            
            //only update if is new center to avoid flickering on gm.
            if (!this.clusterOverlay.getPosition().equals(this.center)) {
                this.clusterOverlay.setPosition(this.center);
            }

        }
        
        this.dirty = false;
        
    }

});

nefos.MapCluster = nefos.EventEmitter.extend({
    init : function(map, settings) {
        var context = this;
        
        this._super(settings);
        
        this.settings.gridSize = this.settings.gridSize || 100;
        this.settings.stackOffset = this.settings.stackOffset || 3;
        this.settings.autoEventHandling = this.settings.autoEventHandling || false;
        this.settings.maxClusterZoomLevel = this.settings.maxClusterZoomLevel || 15;
        
        this.settings.clusterItemLabelWidth = this.settings.clusterItemLabelWidth || 0;
        this.settings.clusterItemLabelPadding = this.settings.clusterItemLabelPadding || 0;
        this.settings.setLabelContainerWidth = this.settings.setLabelContainerWidth || false;
        
        this.settings.simpleGrid = (this.settings.mobile === undefined ? this.settings.mobile : true);
        this.settings.mobile = this.settings.mobile || false;
        this.settings.dontResolveClusters = this.settings.dontResolveClusters || false;
        this.settings.maxClusterSize = this.settings.maxClusterSize || 8;
        
        this.settings.stackItemCallback = this.settings.stackItemCallback || null;
        this.settings.orderingCallback = this.settings.orderingCallback || null;
        
        this.map = map;
        
        //Always reset clusters when zoomlevel changes
        this.map.addEventListener("mapBeforeZoom", function() {
            context.rebuildAll = true;
        });
        
        this.map.addEventListener("beforeResourceAdd", function(resource) {
            //hide elements that are gonna be clustered
            if (resource.getClusterGeoObject() != null && (context.getMap().getZoomLevel() < context.settings.maxClusterZoomLevel || context.settings.maxClusterZoomLevel < 0)) {
                resource.settings.visible = false;
                if (!context.rebuildAll) {
                    context.addToClosestCluster(resource);
                }
            }
        });
        
        if (this.settings.autoEventHandling) {
            var context = this;

            //Eventually display hidden one-marker clusters
            //because those are still settings.visible=false of initial cluster init
            this.map.addEventListener("mapBeforeMoveEnd", function() {
                context.updateAllClusters();
            });
            
            
            this.map.addEventListener("mapZoom", function() {
                context.resetAndCluster();
            });
        }
        
        this.map.addEventListener("resourceFocus", function(resource) {
        	//nefos.L("cluster","resourceFocus", resource);
        	if (resource.settings.clustered) {
            	var focusIcon = resource.getClusterGeoObject().settings.focusIcon;
            	var icon = resource.getClusterGeoObject().getClusterIcon().image;

        		resource.settings.clustered.clusterOverlay.swapIcon(icon, focusIcon);
        	}
        });
        
        this.map.addEventListener("resourceFocusLost", function(resource) {            
        	//nefos.L("cluster","resourceFocusLost", resource);
        	if (resource.settings.clustered) {
            	var focusIcon = resource.getClusterGeoObject().settings.focusIcon;
            	var icon = resource.getClusterGeoObject().getClusterIcon().image;
        		
        		resource.settings.clustered.clusterOverlay.swapIcon(focusIcon, icon);
        	}
        });
                
        this.clusters = [];
        this.rebuildAll = true;
    },
    
    hideClusterStacks : function() {
         for (var i = 0, cluster; cluster = this.clusters[i]; i++) {
             cluster.hideStack();
         }
    },
    
    resetAndCluster : function(forceRebuild) {
        if (forceRebuild) {
            this.rebuildAll = forceRebuild;
        }
        
        if (this.rebuildAll)  {
            this.resetClusters();
            this.clusterResources();
        }
        else {
            //this.updateAllClusters();
            this.clusterResources();
        }
        
        this.map.updateResources();
    },
    
    clusterResources : function() {
        var context = this;
        if (this.getMap().getZoomLevel() < this.settings.maxClusterZoomLevel || this.settings.maxClusterZoomLevel < 0) {
            this._doClusterResources();
        }
        else {
            jQuery.each(this.map.getResources(), function(index, resource) {
                resource.settings.visible = true;
            });
        }
    },
    
    updateAllClusters : function() {
        var outer = this;
        
        //Doesn't work: clusters a randomly not shown in higher zoom levels.
        //Single resources aren't displayed, only after map move.
        //Sry. IE8
        /*this.updateIndex = 0;
        this.updateRunning = true;
        
        outer.updateCluster = function() {
            if (outer.updateIndex < outer.clusters.length -1 && outer.updateRunning) {
                outer.clusters[outer.updateIndex].updateCluster();
                outer.updateIndex++;
                window.setTimeout(outer.updateCluster, 50);
            }
            else {
                outer.updateRunning = false;
            }

        };
        
        window.setTimeout(outer.updateCluster, 50);*/
        jQuery.each(this.clusters, function(index, cluster) {
            cluster.updateCluster();
        });
        
    },
    
    _doClusterResources : function() {
        var context = this;
        jQuery.each(this.map.getResources(), function(index, resource) {
            context.addToClosestCluster(resource);
        });
        
        this.updateRunning = false;     
        this.updateAllClusters();       
        this.rebuildAll = false;
    },
    
    addToClosestCluster : function(resource) {
        var distance = 400000;
        var clusterToAddTo = null;
        var context = this;
        
        var clusterObject = resource.getClusterGeoObject();
        
        //resource can't be clustered
        if (clusterObject == null) {
            resource.settings.visible = true;
            return;
        }
        
        var position = clusterObject.getPosition();
        
        //Not really tested, should bring some performance.
        //resources that are not inside map bounds are not clustered
        //resources not visible are already in a cluster so proceed here
        if (resource.settings.clustered) {
        	//nefos.L("cluster", "already clustered", position, this.map.getBounds(), resource.getName());
            return;
        }
        
        if (!this.map.getBounds().contains(position)) {
        	//nefos.L("cluster", "not in bounds", position, this.map.getBounds(), resource.getName());
        	//this.map.createLatLngMarker(position);
        	return;
        }
            
        
        for (var i = 0, cluster; cluster = this.clusters[i]; i++) {
            var center = cluster.getCenter();
            
            if (center) {
                var d = center.fastDistance(position);
                
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }

        if (clusterToAddTo && clusterToAddTo.contains(position)) {
            clusterToAddTo.addResource(resource);
        } 
        else {
            var cluster = new nefos.ClusterItem(this, { 
                image: this.settings.clusterImage,
                clusterItemLabelWidth : this.settings.clusterItemLabelWidth,
                clusterItemLabelPadding : this.settings.clusterItemLabelPadding,
                setLabelContainerWidth: this.settings.setLabelContainerWidth,
                stackItemCallback : this.settings.stackItemCallback,
                orderingCallback : this.settings.orderingCallback,
                mobile: this.settings.mobile,
                maxClusterSize: this.settings.maxClusterSize
            });
            cluster.addResource(resource);

            if (!this.settings.mobile) {
                cluster.addEventListener("clusterClick", function() {
                    context.hideClusterStacks();
                });

                cluster.addEventListener("stackItemClick", function(resource) {
                    context.hideClusterStacks();

                    //Doesn't work for zaz
                    if (context.settings.maxClusterZoomLevel > 0) {
                    	if(context.settings.dontResolveClusters == false){
                    		context.map.setZoomLevel(context.settings.maxClusterZoomLevel + 1); //make sure that resource isnt clustered on click
                    		context.resetClusters();
                    		context.map.panTo(resource.getClusterGeoObject().getPosition());
                    	}
                    }

                    context.map.emitEvent("markerClick", resource, resource.getClusterGeoObject());
                });

                cluster.addEventListener("largeClusterClick", function() {
                    context.hideClusterStacks();
                    context.resetClusters();
                    context.map.fitBounds(cluster.getBounds());
                });
            }
            else {
                cluster.addEventListener("clusterClick", function(cluster) {
                    context.emitEvent("clusterClick", cluster.resources, cluster);
                });
            }
            this.clusters.push(cluster);
        }
    },
    
    getExtendedBounds : function(latLngBounds) {
        if (this.settings.simpleGrid) {
            if (this.gridSizeLatLng == null) {
                var pointBounds = this.map.getPointBounds(latLngBounds);        
                pointBounds.extend(this.settings.gridSize);
                
                var extendedBounds = this.map.getLatLngBounds(pointBounds);
                
                this.gridSizeLatLng = {
                        lat: extendedBounds.ne.lat() - latLngBounds.ne.lat(),
                        lng: extendedBounds.ne.lng() - latLngBounds.ne.lng()
                };
                
                return extendedBounds;
            }
            else {
                var extendedBounds = latLngBounds.clone();
                extendedBounds.add(this.gridSizeLatLng.lat, this.gridSizeLatLng.lng);
                return extendedBounds;
            }
        }
        else {
            var pointBounds = this.map.getPointBounds(latLngBounds);        
            pointBounds.extend(this.settings.gridSize);
            
            var extendedBounds = this.map.getLatLngBounds(pointBounds);     
            return extendedBounds;
        }
    },

    /**
     * Clears all existing clusters and recreates them.
     */
    resetClusters : function() {
        // Remove all the clusters
        for (var i = 0;i<this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        
        this.gridSizeLatLng = null;
        this.clusters = [];
    },
    
    getMap : function() {
        return this.map;
    }

});

window["nefos"] = window["nefos"] ? window["nefos"] : {};
nefos.bootstrapApiKey='excelsior';

/*
 	Author: Vishal Rajpal
 	Filename: ZipPlugin.js
 	Created Date: 21-02-2012
 	Modified Date: 04-04-2012
*/

var ExtractZipFilePlugin=function(){
};

PhoneGap.addConstructor(function() 
{
	PhoneGap.addPlugin('ExtractZipFilePlugin', new ExtractZipFilePlugin());
});

ExtractZipFilePlugin.prototype.extractFile = function(file, successCallback, errorCallback) 
{
    return PhoneGap.exec(successCallback, errorCallback, "ZipPlugin", "extract", [file]);
};
