

document.write('<script src=' +
('__proto__' in {} ? 'js/zepto' : 'js/jquery') +
'.js><\/script>')
    





    if (window.location.hostname=="m.fmi.fi")
        document.write('<script src="js/weather_ui.min.js"><\/script>');
    else {
        document.write('<script src="js/weather_ui.js"><\/script>');
        //document.write('<script src="js/cordova.js"><\/script>');
    }
    

    
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-9509467-30']);
    _gaq.push(['_trackPageview']);
    
    (function() {
        if (window.location.hostname=="m.fmi.fi") {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        }
    })();
    
    

function translate(s)
{    
    if (app.language=="fi" && fi[s]!=undefined)
        return fi[s]
    if (app.language=="en" && en[s]!=undefined)
        return en[s]
    if (app.language=="sv" && sv[s]!=undefined)
        return sv[s]
    
    return s;
}

// HTML

var fi = new Array();
fi["chooseLanguageTitle"] = "Valitse kieli";
fi["feedbackTitle"] = "Anna palautetta";
fi["feelsLikeTitle"] = '"Tuntuu kuin" ikoni';
fi["applicationDescription"] = "Tämä on Ilmatieteen laitoksen mobiilisääpalvelu.";
fi["version"] = "Versio";
fi["warningsTitle"] = "Varoitukset";
fi["warningsSeaTitle"] = "Varoitukset merialueilla";
fi["warningsLandTitle"] = "Varoitukset maa-alueilla";
fi["warningsRoadTitle"] = "Liikennesää pääteillä";
fi["earlyWarningsTitle"] = "Ennakkovaroitukset";
fi["earlyWarningsSeaTitle"] = "Ennakkovaroitukset merialueille";
fi["earlyWarningsLandTitle"] = "Ennakkovaroitukset maa-alueille";
fi["earlyWarningsRoadTitle"] = "Liikennesää pääteillä";
fi["warningIconDescriptions"] = "Merkkien selitykset";
fi["shortForecastTitle"] = "12 tunnin ennuste";
fi["longForecastLinkTitle"] = "10 päivän ennuste";
fi["locationSearch"] = "Kirjoita paikkakunta";
fi["back"] = "Takaisin";
fi["locationSearchInfoPhrase1"] = "Paikkakunnan nimi avaa säätiedot";
fi["locationSearchInfoPhrase2"] = "lisää paikkakunnan suosikiksi";
fi["locationSearchInfoPhrase3"] = "poistaa paikkakunnan suosikeista";
fi["favoritesTitle"] = "Suosikit";
fi["recentTitle"] = "Viimeisimmät";
fi["feelsLikeInfoText"] = "Tuntuu kuin -lämpötila";
fi["warningNumberInfoText"] = "Numero kertoo kuinka monta eri varoituslajia (esim. metsäpalo, sadevaroitus) on parhaillaan voimassa Suomen alueella.";
fi["rainInfoText"] = "Ennustettu sateen todennäköisyys (%) ja tunnin sademäärä (mm)";
fi["radarAppPublishedText"] = "Ilmatieteen laitoksen uusi Rainman-tutkasovellus julkaistu. Sisältää sateet ja salamat.";
fi["appStoreLink"] = "Lataa Rainman";
fi["startRadarApp"] = "Käynnistä Rainman";
fi["radarAppAutoStart"] = "Käynnistä automaattisesti";
fi["radarAppComingSoon"] = "Tulossa pian Ilmatieteen laitoksen uusi tutkasovellus. Sisältää sateet ja salamat.";
fi["positioningTitle"] = "Paikannus";
fi["usePositioning"] = "Käytä paikannusta";
fi["privacyPolicy"] = "Paikannuspalvelua käytetään säätietojen toimittamiseen nykyiseen sijaintipaikkaasi. Paikkatietoa ei välitetä kolmansille osapuolille.";

// Images

fi["warningIcons"] = "images-2x/warningIcons_fi.png";
fi["fmilogo"] = "images-2x/fmilogo_fi.png";

// Javascript

fi["Loading weather data"] = "Ladataan säätietoja";
fi["Updated"] = "Päivitetty";
fi["Temperature"] = "Lämpötila";
fi["Dew point"] = "Kastepiste";
fi["wind from the north"] = "pohjoistuulta";
fi["wind from the north-east"] = "koillistuulta";
fi["wind from the east"] = "itätuulta";
fi["wind from the south-east"] = "kaakkoistuulta";
fi["wind from the south"] = "etelätuulta";
fi["wind from the south-west"] = "lounaistuulta";
fi["wind from the west"] = "länsituulta";
fi["wind from the north-west"] = "luoteistuulta";
fi["calm"] = "tyyntä";
fi["Wind gust"] = "Puuska";
fi["Humidity"] = "Kosteus";
fi["Pressure"] = "Paine";
fi["Snow depth"] = "Lumensyvyys";
fi["Visibility"] = "Näkyvyys";
fi["Weather station"] = "Havaintoasema";
fi["No search results"] = "Ei hakutuloksia";
fi["More than"] = "Yli";
fi["search results, try more exact search."] = "hakutulosta, tarkenna hakua.";
fi["Loading warnings"] = "Päivitetään varoituksia";
fi["Forest fire warning"] = "Metsäpalovaroitus";
fi["Cold warning"] = "Pakkasvaroitus";
fi["Grass fire warning"] = "Ruohikkopalovaara";
fi["Heat warning"] = "Hellevaroitus";
fi["Ice accretion warning"] = "Jäätämisvaroitus";
fi["Weather warning for pedestrian"] = "Erittäin liukas jalankulkusää";
fi["Heavy rain warning"] = "Sadevaroitus";
fi["Severe thunderstorm warning"] = "Raju ukonilma";
fi["Traffic weather warning"] = "Liikennesää";
fi["Ultraviolet advisory"] = "UV-huomautus";
fi["Sea level warning"] = "Merivedenkorkeus";
fi["Wave height warning"] = "Aallon korkeus";
fi["Wind warning"] = "Tuulivaroitus";
fi["sky clear"] = "selkeää";
fi["almost clear"] = "melkein selkeää";
fi["partly cloudy"] = "puolipilvistä";
fi["almost cloudy"] = "melkein pilvistä";
fi["cloudy"] = "pilvistä";
fi["Cloudiness"] = "Pilvisyys";
fi["No observations available"] = "Ei havaintoja saatavilla";
fi["Positioning location"] = "Paikannetaan sijainti";
fi["Loading warnings"] = "Päivitetään varoituksia";
fi["Could not update warnings"] = "Varoitusten päivittäminen epäonnistui";
fi["No locations defined. Allow positioning or add locations."] = "Ei sijainteja määriteltynä. Salli paikannus tai lisää paikkakuntia.";
fi["Could not update weather data"] = "Säätietojen päivittäminen epäonnistui";
fi["Too many favorites"] = "Liikaa suosikkeja";
fi["You have already defined 5 favorites, that is maximum. Please remove one favorite before adding new one."] = "Olet määritellyt jo 5 suosikkipaikkaa, joka on maksimimäärä. Poista yksi paikka suosikeista ennen uuden lisäämistä.";
fi["Bulletin"] = "Tiedote";
fi["Input location"] = "Kirjoita paikkakunta";
fi["Mobile%20application%20feedback"] = "Palaute%20mobiilisovelluksesta";
fi["10 days"] = "10 vrk";
fi["Distance"] = "Etäisyys";
fi["Rain"] = "Sadetta";
fi["Wind"] = "Tuuli";
fi["over"] = "yli";
fi["Precipitation rate"]  = "Sateen intensiteetti";
fi["Location search failed"] = "Paikkojen haku epäonnistui";
fi["Forecast updated"] = "Ennuste päivitetty";
fi["Weather"] = "Säätila";
fi["clear"] = "poutaa";
fi["haze, smoke or dust"] = "auerta, savua tai pölyä";
fi["mist"] = "utua";
fi["fog"] = "sumua";
fi["precipitation"] = "sadetta";
fi["drizzle"] = "tihkusadetta";
fi["rain"] = "vesisadetta";
fi["snow"] = "lumisadetta";
fi["freezing rain or freezing drizzle"] = "jäätävää sadetta tai jäätävää tihkusadetta";
fi["light or moderate precipitation"] = "heikkoa tai kohtalaista sadetta";
fi["heavy precipitation"] = "voimakasta sadetta";
fi["freezing drizzle"] = "jäätävää tihkusadetta";
fi["light rain"] = "heikkoa vesisadetta";
fi["moderate rain"] = "kohtalaista vesisadetta";
fi["heavy rain"] = "kovaa vesisadetta";
fi["light freezing rain"] = "heikkoa jäätävää sadetta";
fi["moderate freezing rain"] = "kohtalaista jäätävää sadetta";
fi["heavy freezing rain"] = "kovaa jäätävää sadetta";
fi["light sleet"] = "heikkoa räntäsadetta";
fi["moderate sleet"] = "kohtalaista räntäsadetta";
fi["snow"] = "lumisadetta";
fi["light snow"] = "heikkoa lumisadetta";
fi["moderate snow"] = "kohtalaista lumisadetta";
fi["heavy snow"] = "tiheää lumisadetta";
fi["ice pellets"] = "jääjyväsiä";
fi["showers or intermittent precipitation"] = "kuuroja tai ajoittaista sadetta";
fi["light rain showers"] = "heikkoja vesikuuroja";
fi["moderate rain showers"] = "kohtalaisia vesikuuroja";
fi["heavy rain showers"] = "voimakkaita vesikuuroja";
fi["violent rain showers"] = "erittäin voimakkaita vesikuuroja";
fi["light snow showers"] = "heikkoja lumikuuroja";
fi["moderate snow showers"] = "kohtalaisia lumikuuroja";
fi["heavy snow showers"] = "voimakkaita lumikuuroja";
fi["Forecast missing"] = "Ennuste puuttuu";
fi["Positioning"] = "Paikannus";
fi["Saving favorites and settings"] = "Suosikkien ja asetusten tallennus";
fi["The service doesn't work correctly, because your browser doesn't support following features"] = "Palvelu ei toimi oikein, koska selaimesi ei tue seuraavia ominaisuuksia";
fi["Sunrise and sunset"] = "Auringonnousu- ja lasku";
fi["No network connection"] = "Ei verkkoyhteyttä";
fi["Weather data can't be updated without network connection"] = "Säätietoja ei voida päivittää ilman verkkoyhteyttä";

// Weathersymbols

fi["1"] = "selkeää";
fi["2"] = "puolipilvistä";
fi["21"] = "heikkoja sadekuuroja";
fi["22"] = "sadekuuroja";
fi["23"] = "voimakkaita sadekuuroja";
fi["3"] = "pilvistä";
fi["31"] = "heikkoa vesisadetta";
fi["32"] = "vesisadetta";
fi["33"] = "voimakasta vesisadetta";
fi["41"] = "heikkoja lumikuuroja";
fi["42"] = "lumikuuroja";
fi["43"] = "voimakkaita lumikuuroja";
fi["51"] = "heikkoa lumisadetta";
fi["52"] = "lumisadetta";
fi["53"] = "voimakasta lumisadetta";
fi["61"] = "ukkoskuuroja";
fi["62"] = "voimakkaita ukkoskuuroja";
fi["63"] = "ukkosta";
fi["64"] = "voimakasta ukkosta";
fi["71"] = "heikkoja räntäkuuroja";
fi["72"] = "räntäkuuroja";
fi["73"] = "voimakkaita räntäkuuroja";
fi["81"] = "heikkoa räntäsadetta";
fi["82"] = "räntäsadetta";
fi["83"] = "voimakasta räntäsadetta";
fi["91"] = "utua";
fi["92"] = "sumua";

var sv = new Array();
sv["chooseLanguageTitle"] = "Välj språk";
sv["feedbackTitle"] = "Ge feedback";
sv["feelsLikeTitle"] = '"Känns som" ikon';
sv["applicationDescription"] = "Detta är Meteorologista institutets mobilvädertjänst.";
sv["version"] = "Version";
sv["warningsTitle"] = "Varningar";
sv["warningsSeaTitle"] = "Varningar på havsområden";
sv["warningsLandTitle"] = "Varningar på landområden";
sv["warningsRoadTitle"] = "Trafikvädret på huvudvägarna";
sv["earlyWarningsTitle"] = "Förhandsvarningar för de närmaste 2–5 dagarna";
sv["earlyWarningsSeaTitle"] = "Förhandsvarningar på havsområden";
sv["earlyWarningsLandTitle"] = "Förhandsvarningar på landområden";
sv["earlyWarningsRoadTitle"] = "Trafikvädret på huvudvägarna";
sv["warningIconDescriptions"] = "Tecknens betydelse";
sv["shortForecastTitle"] = "12 timmars prognos";
sv["locationSearch"] = "Skriv ort";
sv["longForecastLinkTitle"] = "10 dygnsprognos";
sv["back"] = "Tillbaka";
sv["favoritesTitle"] = "Favoriter";
sv["recentTitle"] = "Senaste";
sv["feelsLikeInfoText"] = "Känns som temperaturen";
sv["warningNumberInfoText"] = "Talet visar antalet varningskategorier (t.ex. skogsbrand, nederbördsvarning), vilka som bäst är i kraft inom Finland.";
sv["rainInfoText"] = "Prognos av nederbördens sannolikhet (%) samt nederbördssumman under en timme (mm)";
sv["radarAppPublishedText"] = "Meteorologiska institutets nya Rainman-väderapplikation har utkommit. Innefattar nederbörd och blixtar.";
sv["appStoreLink"] = "Ladda Rainman";
sv["startRadarApp"] = "Starta Rainman";
sv["radarAppAutoStart"] = "Starta automatiskt";
sv["radarAppComingSoon"] = "På kommande inom kort: Meteorologiska institutets nya radarapplikation. Innefattar nederbörd och blixtar.";
sv["positioningTitle"] = "Lokalisering";
sv["usePositioning"] = "Använd lokalisering";
sv["privacyPolicy"] = "Lokalisering används för att ge dig väderdata för den plats du befinner dig på. Geografisk information sänds inte vidare till tredje part.";
sv["No network connection"] = "Ingen nätverksförbindelse";
sv["Weather data can't be updated without network connection"] = "Väderinformation kan inte uppdateras utan nätverksförbindelse";

// Images

sv["warningIcons"] = "images-2x/warningIcons_sv.png";
sv["fmilogo"] = "images-2x/fmilogo_sv.png";

// Javascript

sv["Loading weather data"] = "Laddar väderdata";
sv["Updated"] = "Uppdaterad";
sv["Temperature"] = "Temperatur";
sv["Daggpunkt"] = "Kastepiste";
sv["wind from the north"] = "nordlig vind";
sv["wind from the north-east"] = "nordostlig vind";
sv["wind from the east"] = "ostlig vind";
sv["wind from the south-east"] = "sydostlig vind";
sv["wind from the south"] = "sydlig vind";
sv["wind from the south-west"] = "sydvästlig vind";
sv["wind from the west"] = "västlig vind";
sv["wind from the north-west"] = "nordvästlig vind";
sv["calm"] = "lugnt";
sv["Wind gust"] = "Vindby";
sv["Humidity"] = "Fuktighet";
sv["Pressure"] = "Lufttryck";
sv["Snow depth"] = "Snödjup";
sv["Visibility"] = "Sikt";
sv["Dew point"] = "Daggpunkt";
sv["Weather station"] = "Väderstation";
sv["No search results"] = "Inga sökresultat";
sv["More than"] = "Över";
sv["search results, try more exact search."] = "resultat, precisera sökningen.";
sv["Loading warnings"] = "Varningarna uppdateras";
sv["Forest fire warning"] = "Varning för skogsbrand ";
sv["Cold warning"] = "Köldvarning";
sv["Grass fire warning"] = "Faran för gräsbränder ";
sv["Heat warning"] = "Varning för värmebölja ";
sv["Ice accretion warning"] = "Varning för isbildning ";
sv["Weather warning for pedestrian"] = "Fotgängarvädret ";
sv["Heavy rain warning"] = "Nederbördsvarning ";
sv["Severe thunderstorm warning"] = "Våldsamt åskväder ";
sv["Traffic weather warning"] = "Trafikvädret ";
sv["Ultraviolet advisory"] = "UV-meddelande";
sv["Sea level warning"] = "Vattenståndet";
sv["Wave height warning"] = "Våghöjden";
sv["Wind warning"] = "Vindvarning";
sv["sky clear"] = "klart";
sv["almost clear"] = "nästan klart";
sv["partly cloudy"] = "halvklart";
sv["almost cloudy"] = "nästan mulet";
sv["Cloudiness"] = "Molnighet";
sv["cloudy"] = "mulet";
sv["No observations available"] = "Inga observationer tillgängliga";
sv["Positioning location"] = "Positionen bestäms";
sv["Could not update warnings"] = "Uppdatering av varningar misslyckades";
sv["No locations defined. Allow positioning or add locations."] = "Inga positioner definierade. Tillåt lokalisering eller ge nya orter.";
sv["Could not update weather data"] = "Uppdatering av väderdata misslyckades";
sv["Too many favorites"] = "För många favoriter";
sv["You have already defined 5 favorites, that is maximum. Please remove one favorite before adding new one."] = "Du har gett redan 5 favoritplatser, som är maksimum. Slopa en före tillsättningen.";
sv["Bulletin"] = "Meddelande";
sv["Input location"] = "Skriv ort";
sv["Mobile%20application%20feedback"] = "Feedback%20från%20mobilprogrammet";
sv["10 days"] = "10 dygns";
sv["locationSearchInfoPhrase1"] = "Ortnamnet öppnar väderdatan";
sv["locationSearchInfoPhrase2"] = "lägger till favoritort";
sv["locationSearchInfoPhrase3"] = "avlägsnar favoritort";
sv["Distance"] = "Distans";
sv["Rain"] = "Nederbörd";
sv["Wind"] = "Vind";
sv["over"] = "över";
sv["Precipitation rate"]  = "Nederbördsintensitet";
sv["Location search failed"] = "Ortsökningen mislyckades";
sv["Forecast updated"] = "Prognosen uppdaterad";
sv["Forecast missing"] = "Prognosen saknas";
sv["Weather"] = "Väderläget";
sv["clear"] = "uppehåll";
sv["haze, smoke or dust"] = "torrdis, rök eller damm";
sv["mist"] = "dis";
sv["fog"] = "dimma";
sv["precipitation"] = "nederbörd";
sv["drizzle"] = "duggregn";
sv["rain"] = "regn";
sv["snow"] = "snöfall";
sv["freezing rain or freezing drizzle"] = "isbildande regn eller duggregn";
sv["slight or moderate precipitation"] = "svagt eller måttligt regn";
sv["heavy precipitation"] = "kraftigt regn";
sv["freezing drizzle"] = "isbildande duggregn";
sv["light rain"] = "svagt regn";
sv["moderate rain"] = "måttligt regn";
sv["heavy rain"] = "kraftigt regn";
sv["light freezing rain"] = "svagt isbildande regn";
sv["moderate freezing rain"] = "måttligt isbildande regn";
sv["heavy freezing rain"] = "kraftigt isbildande regn";
sv["light sleet"] = "kevyttä räntäsadetta";
sv["moderate sleet"] = "måttligt snöblandat regn";
sv["snow"] = "snöfall";
sv["light snow"] = "lätt snöfall";
sv["moderate snow"] = "måttligt snöfall";
sv["heavy snow"] = "ymnigt snöfall";
sv["ice pellets"] = "iskorn";
sv["showers or intermittent precipitation"] = "skurar eller tidvis regn";
sv["light rain showers"] = "lätta regnskurar";
sv["moderate rain showers"] = "måttliga regnskurar";
sv["heavy rain showers"] = "kraftiga regnskurar";
sv["violent rain showers"] = "mycket kraftiga regnskurar";
sv["light snow showers"] = "lätta snöbyar";
sv["moderate snow showers"] = "måttliga snöbyar";
sv["heavy snow showers"] = "kraftiga snöbyar";
sv["Sunrise and sunset"] = "Soluppgång och solnedgång";

// Weathersymbols

sv["1"] = "klart";
sv["2"] = "halvklart";
sv["21"] = "lätta skurar";
sv["22"] = "skurar";
sv["23"] = "kraft skurar";
sv["3"] = "mulet";
sv["31"] = "lätt regn";
sv["32"] = "regn";
sv["33"] = "kraft regn";
sv["41"] = "lätta snöb";
sv["42"] = "snöbyar";
sv["43"] = "täta snöb";
sv["51"] = "lätt snöf";
sv["52"] = "snöfall";
sv["53"] = "kraft snöf";
sv["61"] = "åskbyar";
sv["62"] = "kraft åskbyar";
sv["63"] = "åska";
sv["64"] = "kraft åska";
sv["71"] = "tidv slask";
sv["72"] = "tidv slask";
sv["73"] = "tidv slask";
sv["81"] = "slask";
sv["82"] = "slask";
sv["83"] = "slask";
sv["91"] = "dis";
sv["92"] = "dimma";

// HTML

var en = new Array();
en["chooseLanguageTitle"] = "Choose language";
en["feedbackTitle"] = "Send feedback";
en["feelsLikeTitle"] = '"Feels like" icon';
en["applicationDescription"] = "This is mobile weather application provided by Finnish Meteorological Institute.";
en["version"] = "Version";
en["warningsTitle"] = "Warnings";
en["warningsSeaTitle"] = "Warnings for sea areas";
en["warningsLandTitle"] = "Warnings for land areas";
en["warningsRoadTitle"] = "Road weather on main roads";
en["earlyWarningsTitle"] = "Early warnings for the next 2–5 days";
en["earlyWarningsSeaTitle"] = "Early warnings for sea areas";
en["earlyWarningsLandTitle"] = "Early warnings for land areas";
en["earlyWarningsRoadTitle"] = "Road weather on main roads";
en["warningIconDescriptions"] = "Warning icon descriptions";
en["shortForecastTitle"] = "12-hour forecast";
en["locationSearch"] = "Input location";
en["longForecastLinkTitle"] = "10-day forecast";
en["back"] = "Back";
en["locationSearchInfoPhrase1"] = "Location name opens weather information";
en["locationSearchInfoPhrase2"] = "adds location to favorites";
en["locationSearchInfoPhrase3"] = "removes location from favorites";
en["favoritesTitle"] = "Favorites";
en["recentTitle"] = "Recent";
en["feelsLikeInfoText"] = "Feels like temperature";
en["warningNumberInfoText"] = "The number indicates how many warning types (e.g. forest fire warning or storm warning) are active in Finland at the moment.";
en["rainInfoText"] = "Forecasted rain probability (%) and one hour precipitation amount (mm)";
en["radarAppPublishedText"] = "The Finnish Meteorological Institute’s new radar application, Rainman. Check where it’s raining and thundering.";
en["appStoreLink"] = "Download Rainman";
en["startRadarApp"] = "Start Rainman";
en["radarAppAutoStart"] = "Start automatically";
en["radarAppComingSoon"] = "Coming soon The Finnish Meteorological Institute’s new radar application, Rainman. Check where it’s raining and thundering.";
en["positioningTitle"] = "Positioning";
en["usePositioning"] = "Use positioning";
en["privacyPolicy"] = "Location service is used to deliver weather data for your current location. Location information is not passed to any 3rd parties.";

// Images

en["warningIcons"] = "images-2x/warningIcons_en.png";
en["fmilogo"] = "images-2x/fmilogo_en.png";

// Javascript

en["wind from the north"] = "north";
en["wind from the north-east"] = "north-east";
en["wind from the east"] = "east";
en["wind from the south-east"] = "south-east";
en["wind from the south"] = "south";
en["wind from the south-west"] = "south-west";
en["wind from the west"] = "west";
en["wind from the north-west"] = "north-west";

// Weathersymbols

en["1"] = "sunny";
en["2"] = "partly cloudy";
en["21"] = "light showers";
en["22"] = "showers";
en["23"] = "heavy showers";
en["3"] = "cloudy";
en["31"] = "light rain";
en["32"] = "rain";
en["33"] = "heavy rain";
en["41"] = "light snow showers";
en["42"] = "snow showers";
en["43"] = "heavy snow showers";
en["51"] = "light snowfall";
en["52"] = "snowfall";
en["53"] = "heavy snowfall";
en["61"] = "thundershowers";
en["62"] = "heavy thundershowers";
en["63"] = "thunder";
en["64"] = "heavy thunder";
en["71"] = "light sleet showers";
en["72"] = "sleet showers";
en["73"] = "heavy sleet showers";
en["81"] = "light sleet";
en["82"] = "sleet";
en["83"] = "heavy sleet";
en["91"] = "moderate fog";
en["92"] = "heavy fog";


function isset () {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // +   improved by: Rafał Kukawski
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true
    var a = arguments,
        l = a.length,
        i = 0,
        undef;

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}


function date (format, timestamp) {
    var that = this,
        jsdate, f, formatChr = /\\?([a-z])/gi,
        formatChrCb,
        // Keep this here (works, but for code commented-out
        // below for file size reasons)
        //, tal= [],
        _pad = function (n, c) {
            if ((n = n + '').length < c) {
                return new Array((++c) - n.length).join('0') + n;
            }
            return n;
        };

    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () { // Shorthand day name; Mon...Sun
            if (isset(app.language) && (app.language=="fi" || app.language=="sv"))
                return f.l().slice(0, 2);
            else
                return f.l().slice(0, 3);
        },
        j: function () { // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () { // Full day name; Monday...Sunday

            if (isset(app.language) && app.language=="fi") {
                var weekday_names = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
            } else if (isset(app.language) && app.language=="sv") {
                var weekday_names = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
            } else {
                var weekday_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            }

            return weekday_names[f.w()];
        },
        N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () { // Ordinal suffix for day of month; st, nd, rd, th
            var j = f.j();
            return j < 4 | j > 20 && ['st', 'nd', 'rd'][j%10 - 1] || 'th';
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () { // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j()),
                b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5) + 1;
        },

        // Week
        W: function () { // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },

        // Month
        F: function () { // Full month name; January...December

            if (isset(app.language) && app.language=="fi") {
              var month_names = ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"];
            } else if (isset(app.language) && app.language=="sv") {
              var month_names = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
            } else {
              var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            }

            return month_names[f.n() -1];
        },
        m: function () { // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () { // Shorthand month name; Jan...Dec
            return f.F().slice(0, 3);
        },
        n: function () { // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () { // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },

        // Year
        L: function () { // Is leap year?; 0 or 1
            var j = f.Y();
            return j%4==0 & j%100!=0 | j%400==0;
        },
        o: function () { // ISO-8601 year
            var n = f.n(),
                W = f.W(),
                Y = f.Y();
            return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
        },
        Y: function () { // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
            return (f.Y() + "").slice(-2);
        },

        // Time
        a: function () { // am or pm
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function () { // AM or PM
            return f.a().toUpperCase();
        },
        B: function () { // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2,
                // Hours
                i = jsdate.getUTCMinutes() * 60,
                // Minutes
                s = jsdate.getUTCSeconds(); // Seconds
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () { // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () { // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () { // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () { // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },

        // Timezone
        e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
/*              return this.date_default_timezone_get();
*/
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0),
                // Jan 1
                c = Date.UTC(f.Y(), 0),
                // Jan 1 UTC
                b = new Date(f.Y(), 6),
                // Jul 1
                d = Date.UTC(f.Y(), 6); // Jul 1 UTC
            return 0 + ((a - c) !== (b - d));
        },
        O: function () { // Difference to GMT in hour format; e.g. +0200
            var tzo = jsdate.getTimezoneOffset(),
                a = Math.abs(tzo);
            return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function () { // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },
        T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
            if (!tal.length) {
                tal = that.timezone_abbreviations_list();
            }
            if (that.php_js && that.php_js.default_timezone) {
                default = that.php_js.default_timezone;
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].timezone_id === default) {
                            return abbr.toUpperCase();
                        }
                    }
                }
            }
            for (abbr in tal) {
                for (i = 0; i < tal[abbr].length; i++) {
                    os = -jsdate.getTimezoneOffset() * 60;
                    if (tal[abbr][i].offset === os) {
                        return abbr.toUpperCase();
                    }
                }
            }
*/
            return 'UTC';
        },
        Z: function () { // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },

        // Full Date/Time
        c: function () { // ISO-8601 date.
            return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { // Seconds since UNIX epoch
            return jsdate / 1000 | 0;
        }
    };

    this.date = function (format, timestamp) {
        that = this;
        jsdate = (timestamp == null ? new Date() : // Not provided
        (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
        );
        return format.replace(formatChr, formatChrCb);
    };

    return this.date(format, timestamp);
}

function is_int (mixed_var) {
    return mixed_var === ~~mixed_var;
}



var version = "1.1.9"; // Application version
var dev = false; // Enabled development features like resetting localstorage and JSONP
var app = new Object(); // Contains global variables needed by application
var fakestorage = new Object(); // Localstorage for browsers without localstorage support
         
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
    // Now safe to use the PhoneGap API
	
    document.addEventListener("resume", resumeApplication, false);
    document.addEventListener("pause", pauseApplication, false);
    
    // This has not been tested/difficult to test, 
    // maybe can be enabled in later releases?    
    //document.addEventListener("offline", handleNetworkOffline, false);
   
	if ($.os.windows) {
		restoreSettings();
		updateLiveTile();
	}
	
	if ($.os.android || $.os.ios)
		app.analytics = true;

	saveSettingsToFile();
    runStartUpTasks();
}

$(document).ready(function()
{
    initializeOsObject();

   	document.addEventListener("deviceready", onDeviceReady, false);
    $(window).bind("orientationchange", onOrientationChange);
    
    $("#warningImportant").hide();

    // Fixes different kind of bugs in different webkit-versions 
    applyBrowserFixes();
    
    calculateMinHeights();
    initializeAppVariable();

    if (!$.os.ios) {
        $("#radarPanel").empty().remove();
        $(".topPanel").width("25%");
        $("#positioningSettingsBlock").show();
        bindSmartClick("#changePositioningSetting", changePositioningSetting);
    } else {
    	bindSmartClick("#changeRadarAppAutoStart", changeRadarAppAutoStart);    
    }
   
    $("#locations").bind("tabshow", initializeLocationSearch);
    $("#weather").bind("tabshow", updateSwipeUi);
    $("#warnings").bind("tabshow", clearWarningsNotification);
    $("#radar").bind("tabshow", checkRadarAppAutoStart);
    $("#locationSearch").bind("keyup", searchLocations).bind("focus", scrollToAutocomplete);
    
    bindSmartClick(".topPanel", changeActiveTab);    
    bindSmartClick("#info .changeLanguage", changeLanguage);
    bindSmartClick("#hideLongForecastLink", hideLongForecast);
    bindSmartClick("#startRadarApp", startRadarApplication);
    bindSmartClick(".refreshWeather", refreshForecast);
    bindSmartClick(".refreshWarnings", refreshWarnings);
            
    bindWeatherTabEvents();
    
    if (dev) {
        $("#resetButton").show();
        bindSmartClick("#resetButton", resetApplication);
    }

	// Have to wait PhoneGap to provide localstorage in Windows Phone
	// Windows phone needs jQuery.support.cors setting for cross domain AJAX

	if (!$.os.windows || window.location.hostname==app.ajaxserver)
		restoreSettings();

    if ($.os.windows)
		jQuery.support.cors = true;
        
    if (!($.os.ios || $.os.android || $.os.windows))  
        checkCompatibility();
                                             
    if (window.location.hostname=="m.fmi.fi")
        runStartUpTasks();

});

// Initialize $.os object if Zepto missing

function initializeOsObject() 
{

    var useragent = navigator.userAgent;

    // Initialize $.os if jQuery is used (IE) instead of Zepto
	// Add $.os.windows for Zepto

	if (!isset($.os)) {
		$.os = new Object();
		$.os.ios = false;
		$.os.iphone = false;
		$.os.android = false;
		$.os.ipad = false;
		$.os.windows = true;
	} else
		$.os.windows = false;
    
	useragent = useragent.toLowerCase();
    
	if (useragent.indexOf('symbian') != -1)
        $.os.symbian = true;
    else
        $.os.symbian = false;
	if (useragent.indexOf('maemo') != -1)
        $.os.maemo = true;
    else
        $.os.maemo = false;
}

// Initializes global app-variable that contains application state information

function initializeAppVariable()
{
    app.language = "en";
    app.favorites = new Array(); // Favorite locations
    app.location_slides = new Array(); // Slides for location swipeview
    app.observation_slides = new Array(); // Slides for observation swipeview
    app.carousel = false; // Swipeview for locations
    app.observation_carousel = false; // Swipeview for observations
    app.position = false; // Positioned location
    app.current_slide = false; // Currently selected location in swipe UI
    app.current_observation_slide = false; // Currently selected observation slide
    app.locate_timer = false; // Timer to update current location and weather data
    app.locate_again_timer = false;  // Timer for second positioning attempt
    app.warnings_timer = false; // Timer to update warnings
    app.location_slider_timer = false; // Timer to update short forecast and observations
    app.observation_slider_timer = false; // Timer to update observation swipe indicators
    app.autocomplete_query = false; // Ajax autocomplete query (used to abort query)
    app.weatherdata_query = false; // Ajax query for weatherdata
    app.warnings_query = false; // Ajax query for warnings
    app.show_location = false; // Location after weatherdata update
    app.latest_weather_stations = new Object(); // Latest selected weather station for locations
    app.autocomplete_cache = new Array(); // Cache for autocomplete
    app.radar_app_auto_start = false; // Should radar app started automatically
    app.use_positioning = true;
    app.ajaxserver = "m.fmi.fi";
    app.datatype = "json";
    app.analytics = false; // Is Google Analytics used

    // Detect correct image directory based on display dpi or platform
    
    if (window.devicePixelRatio <= 1)
        app.images = "images";
    else
        app.images = "images-2x";
        
    if (navigator.userAgent.indexOf("Windows Phone OS 7")!=-1 || $.os.maemo)
		app.swipeui = false;
	else
		app.swipeui = true;
            
    if (dev)
        app.datatype = "jsonp";

}

function restoreSettings()
{
   // Restore language setting or initialize it if not set
    
    if (getLocalStorageItem("language")==null) {
        
        // Use device language if supported, otherwise english
    	// Android browser doesn't return correct language -> fi is used
        
        var full_language = window.navigator.userLanguage || window.navigator.language;
        var device_language = full_language.split("-");
        var device_language = device_language[0];         
        
        if ($.os.android || $.os.symbian)
        	app.language = "fi";        
        else if (device_language=="fi" || device_language=="sv" || device_language=="en")
            app.language = device_language;
        else
            app.language = "en";
                
        setLocalStorageItem("language", app.language);
    } else
        app.language = getLocalStorageItem("language");
                    
    if (getLocalStorageItem("favorites")!=null) {
        app.favorites = JSON.parse(getLocalStorageItem("favorites"));
    }

    if (getLocalStorageItem("latest_weather_stations")!=null) {
        app.latest_weather_stations = JSON.parse(getLocalStorageItem("latest_weather_stations"));
    }
    
    if (!$.os.ios && getLocalStorageItem("use_positioning")!=null) {
    	var use_positioning = getLocalStorageItem("use_positioning"); 
    	
        if (use_positioning==="true")
            app.use_positioning = true;
        else
            app.use_positioning = false;
    	showPositioningSetting();
    }
    
    if ($.os.ios) { 
        var autostart = getLocalStorageItem("radar_app_auto_start");
        
        if (autostart==="true")
            app.radar_app_auto_start = true;
        else
            app.radar_app_auto_start = false;

        showRadarAppAutoStart();
    }
    
    $("#applicationVersion").html(version);
    showLanguageSetting(app.language);

    if (app.language!="fi")
        translateUi();
}

// Applies fixes for known browser bugs

function applyBrowserFixes()
{   
	// Fixed positioning causes problems in Android
	
    if (!($.os.ios || $.os.windows)) {
    	$("#hideLongForecastLink").css("position", "absolute");
    	$("#weatherLoadingDialog").css("position", "absolute");
    	$("#warningsLoadingDialog").css("position", "absolute");
    }
    
    if ($.os.ios && $.os.version.substr(0,1)>=7) {
          document.body.style.marginBottom = "20px";
    }
    
}

// Calculates min-heights for taps

function calculateMinHeights()
{
    var minheight = $(window).height()-120;
    minheight = minheight+"px";
    
    $("#radar").css("min-height", minheight);
    $("#locations").css("min-height", minheight);
    $("#info").css("min-height", minheight);
}

// Cleans local storage and reloads application (simulates clean startup)

function resetApplication() 
{
    localStorage.clear();
    window.location.reload();    
}

// Binds events for weather tab

function bindWeatherTabEvents()
{
    bindSmartClick("#longForecastLink", showLongForecast);
}

// Unbinds events for weather tab

function unbindWeatherTabEvents()
{
    if ($.os.ios || ($.os.android && navigator.userAgent.search("Android 4.0")<0)
        || $.os.symbian)
        $("#longForecastLink").unbind("tap");
    else
        $("#longForecastLink").unbind("click");
}

// Binds tap event for given selector in iOs and Android, click in others

function bindSmartClick(element, func)
{

	if (typeof element == 'string' )
		element = $(element);

	// tap event doesn't work well in Android 4.0
	
    if ($.os.ios || ($.os.android && navigator.userAgent.search("Android 4.0")<0)
        || $.os.symbian)
        element.unbind("tap").bind("tap", func);
    else
    	element.unbind("click").bind("click", func);
}

// Tasks to run in startup

function runStartUpTasks() 
{

	if ($.os.ios || app.use_positioning)	
		showLoadingDialog("weather", translate("Positioning location"));
	
    if (getCachedWeatherdata()!==false)
        useCachedForecast();

    locateUser();
    updateWarnings();
    startTracking();
    
    // Wait 10 seconds to update bulletins
    
    if (window.location.hostname!="m.fmi.fi")
        setTimeout(updateAppInfo, 10000);        
};

// Locates user and updates weather data

function locateUser()
{
	// Positioning is always tried in iOS. In other platforms only if
	// user has allowed it in application settings.
	// Positioning is done twice to improve accuracy

	if ($.os.ios || app.use_positioning) {
		if ($.os.ios)
			var options = { enableHighAccuracy: true };        
        else if ($.os.android)
			var options = { timeout: 5000 };
		else
        	var options = {};

		navigator.geolocation.getCurrentPosition(waitAndLocateAgain,
                                                handlePositioningFailure,
                                                options);
	} else
		updateForecasts();
    
    // Update position and weather data every 5 minutes
    
    clearTimeout(app.locate_timer);
    app.locate_timer = setTimeout(locateUser, 5*60*1000);
    
}

// Helper function to wait 1 second and try positioning again

function waitAndLocateAgain()
{
    // First location is usually inaccurate, try again after one second
    clearTimeout(app.locate_again_timer);
    app.locate_again_timer = setTimeout(locateUserAgain, 1000);
}

// Helper function for second positioning attempt

function locateUserAgain() 
{
    //console.log("Second positioning attempt");
   
	if ($.os.windows)
		var options = {};
	else
		var options = { enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(updateUserLocation,
                                                handlePositioningFailure,
                                                options);
}

// Updates user location. Called after successful positioning.

function updateUserLocation(newposition)
{
    //console.log("Got position, accuracy: "+newposition.coords.accuracy);
    hideLoadingDialog("weather");
    app.position = newposition;
    updateForecasts();
}

// Handles positioning failure

function handlePositioningFailure(error)
{
    console.log("positioning failed: "+error.message);
        
    hideLoadingDialog("weather");
    app.position = false;        
    updateForecasts();
}

// Updates warnings

function updateWarnings() 
{
    //console.log("updateWarnings: "+app.language);

    hideErrorDialog("warnings");
    hideLoadingDialog("warnings");

    var currenttime = new Date();
    var ms = currenttime.getTime();
    
    // Don't update warnings if cached are fresh
    
    var warnings = getCachedWarnings();
    
    if (warnings && warnings.language==app.language) {
        var generated = convertIsoTimeStampToDate(warnings.generated, true);
        var timediff = Math.abs(currenttime.getTime()-generated.getTime());

        //console.log("now: "+date("d.m.Y H:i", currenttime)+" generated: "+date("d.m.Y H:i", generated));

        useCachedWarnings();
        
        if (timediff<(10*60*1000)) {
            //console.log("Don't need to update warnings, because cached are fresh");
            return;
        }
        
        // Show loading dialog only when needed, because it can be irritating
        // for user 
        
        if (timediff>(60*60*1000))
            showLoadingDialog("warnings", translate("Loading warnings"));        
    } else {
        showLoadingDialog("warnings", translate("Loading warnings"));  
    }
    
    if (app.warnings_query)
        app.warnings_query.abort();
        
    app.warnings_query = $.ajax({
        type: 'GET',
        url: 'http://'+app.ajaxserver+'/mobile/interfaces/warnings.php',
        data: {l: app.language, version: version, preventcache: ms}, 
        dataType: app.datatype, 
        error: useCachedWarnings,
        success: updateWarningsTab       
    });
           
    // Update warnings every 10 minutes
    
    if (app.warnings_timer)
        clearTimeout(app.warnings_timer);    
    
    app.warnings_timer = setTimeout(updateWarnings, 10*60*1000);
                            
}

// Updates warning tab html using cached or fresh data

function updateWarningsTab(json, cached)
{
	//console.log("updateWarningsTab");

    hideLoadingDialog("warnings");

    if (json.status=="error") {       
        if (cached!==false)
            showErrorDialog("warnings", translate("Could not update warnings"));
        else
            useCachedWarnings();
        return;
    }
       
    var generated = convertIsoTimeStampToDate(json.generated, true);
    $("#warningsGenerated").val(generated);    
    
    $("#warningmap").attr("src", "data:image/gif;base64,"+json.map);

    $("#warningsSea").html(json.warnings.sea);
    $("#warningsLand").html(json.warnings.land);
    $("#warningsRoad").html(json.warnings.road);
    $("#warningsUpdated").html(translate("Updated")+" "+json.warnings.updated);

    $("#earlyWarningsSea").html(json.early.sea);
    $("#earlyWarningsLand").html(json.early.land);
    $("#earlyWarningsRoad").html(json.early.road);
    $("#earlyWarningsUpdated").html(translate("Updated")+" "+json.early.updated);

    $("#warningCount").html(json.count);

    var warnings_viewed = null;
    
    try {
        warnings_viewed = getLocalStorageItem("warnings_viewed");
    } catch(err) {}

    if (json.count>0 && json.warnings.updated!=warnings_viewed 
        && !$("#warningsPanel").hasClass("#selected"))
        $("#numberIndicator").show();
    else
        $("#numberIndicator").hide();    

    if (json.crisismessage) {
        $("#crisismessage").html(json.crisismessage);
        $(".topWrapper").hide();
        $("#warningImportant").show();
    } else {
        $("#crisismessage").html("");
        $("#warningImportant").hide();
        $(".topWrapper").show();
    }

    if (cached!==true)
        setLocalStorageItem("warnings", JSON.stringify(json));
}

// Updates warning tab using cached data

function useCachedWarnings()
{
	//console.log("useCachedWarnings");
	
    hideLoadingDialog("warnings");

    var warnings = getCachedWarnings();
    
    if (warnings && warnings.language==app.language) {
        //console.log("using cached warnings");
        
        // If same warnings are already displayed, then don't need to update
               
       var generated = convertIsoTimeStampToDate(warnings.generated, true);
       
       if ($("#warningsGenerated").val()==generated) {
            //console.log("Don't need to update warnings tab");
            return;
        }
        
        updateWarningsTab(warnings, true); 
    } else {
        //console.log("cached warnings are too old");
        showErrorDialog("warnings", translate("Could not update warnings"));
    }

}

// helper function to get cached warning from local storage

function getCachedWarnings()
{
    var warnings = null;

    try {
        warnings = getLocalStorageItem("warnings");
    } catch (err) {
        return false;
    }
    
    if (warnings!=null) {        
        warnings = JSON.parse(warnings);
        
        var now = new Date();
        var generated = convertIsoTimeStampToDate(warnings.generated, true);
        
        // Check is cached data too old
               
        if (Math.abs((now.getTime()-generated.getTime()))<(1*60*60*1000))       
            return warnings;
        else
            return false;
    }
    
    return false;

}

// Translates UI (html)

function translateUi()
{
       
    $(".translate").each(function() {
        var identifier = false;
        if ($(this).attr("id")!==undefined)
            identifier = $(this).attr("id");
        else if ($(this).attr("href")!==undefined)
            identifier = $(this).attr("href").substring(1);
        
        if (identifier) {
            var translation = translate(identifier);
            if (translation!="") {
                if ($(this).is("img"))
                    $(this).attr("src", translation);  
                else if ($(this).is("input"))
                    $(this).val(translation);                
                else
                    $(this).html(translation);
            }
        }
    });
     
}

// Changes language after user has tapped new language option

function changeLanguage()
{
    var name = $(this).find(".languageName").html();
    
    if (name=="Suomi")
        app.language = "fi";
    else if (name=="Svenska")
        app.language = "sv";    
    else
        app.language = "en";
   
    // Store language in settings
    
    setLocalStorageItem("language", app.language);
	saveSettingsToFile();
    
    // Clear autocomplete cache
    
    app.autocomplete_cache = new Array();    
    
    // Update UI
   
    showLanguageSetting(app.language);
    translateUi();
    updateForecasts();
    updateWarnings();
    
}

// Updates weather data from server

function updateForecasts(loading)
{   

    //console.log("updateForecasts");
   
    hideErrorDialog("weather");
    showForecastLoading();
    
    // Show loading message on first time or if cached weatherdata is too old
    
    if (loading===true || areFavoritesInCachedWeatherData()===false)
        showLoadingDialog("weather", translate("Loading weather data"));
    
    var locations = "";
    
    if (app.favorites.length==0 && app.position==false) {
        // Use Helsinki as default location
                
        locations = "658225";
        
    } else {
        // Use positioned location and favorites
    
        if (app.position) {
            locations += app.position.coords.latitude+","+app.position.coords.longitude; 
        }

        var temporary = false;
        
        $.each(app.favorites, function(i, location) {
            if (location.temporary==true) {
            	temporary = location;
            	return true; // jQuery continue
            }
            
            if (locations!="")
                locations += "|";
            
            locations += location.id;
        });
        
        // Temporary favorite has fixed location as last one in swipe
        
        if (temporary) {
            if (locations!="")
                locations += "|";
            
            locations += temporary.id;
        }
    }

    if (app.weatherdata_query) {
        //console.log("abort weatherdata query");
        app.weatherdata_query.abort();
    }

    var currenttime = new Date();
    var ms = currenttime.getTime();
    
    app.weatherdata_query = $.ajax({
        type: 'GET',
        url: 'http://'+app.ajaxserver+'/mobile/interfaces/weatherdata.php',
        data: {locations: locations, l: app.language, version: version, preventcache: ms}, 
        dataType: app.datatype, 
        error: useCachedForecast,
        success: updateSlides       
    });
    
}

// Updates slides for location Swipeview using weatherdata

function updateSlides(json, cached)
{
    hideLoadingDialog("weather");
    hideErrorDialog("weather");
    hideForecastLoading();
    
    if (cached==false)
        app.weatherdata_query = false;    
    
    if (json.status=="error") {
        if (cached!==true)
            useCachedForecast();
        return;
    }
    
    app.location_slides = new Array();
            
    var now = new Date();
    var maxtime = new Date();
    maxtime.setTime(now.getTime()+(12*60*60*1000));
    var swipeui_page = false;
    
    $.each(json.forecasts, function(n, item) {
            
        var first = true;
        var geoid = item.forecast[0].geoid;
        var html = "";
           
        $.each(item.forecast, function(i, timestep) {
                   
            // Also have to update positioned location name in location tab
                       
            if (app.position && n==0) {
                // Check that is location favorite
                
                var found = false;
                
                $.each(app.favorites, function(i, favorite) {                
                    if (favorite.id==timestep.geoid && favorite.temporary==false)
                        found = true;
                });
                
                var img = '<img src="'+app.images+'/favSelected.png" class="positioningIcon" width="12" height="12"/>';
                
                if (!found) {
                    $("#positionedLocation").html('<div id="searchResult_'+timestep.geoid
                                                    +'" class="placeWrapper">'
                                                    +img+'<div class="placeName positioned">'
                                                    +formatSmartName(timestep, false)
                                                    +'</div><div class="placeStarGray addFavorite">&nbsp;</div></div>');
                    $("#recentBlock").show();
                    bindSmartClick("#positionedLocation .addFavorite", addFavoriteLocation);
                    bindSmartClick("#positionedLocation .placeName", addTemporaryFavoriteLocation);
                } else {
                    $("#positionedLocation").html("");
                }
                
            }
            
            var utctime = convertIsoTimeStampToDate(timestep.utctime, true);
            
            // Skip timesteps in past and missing values
            
            if (utctime<now || !isTimestepValid(timestep))
                return true; // jQuery continue
                                
            if (geoid==app.show_location) {
                //console.log("swipeui_page: "+n);
                swipeui_page = n;
            } 
    
            // First timestep in forecast with big weathersymbol and etc.
            html = '<div class="locationTxt">'+formatSmartName(timestep, true)
                    +'</div>';
                        
            html += '<div class="weatherAndTemperatureWrapper">';
            
            if (timestep.dark==1)
                var weathersymbol = "1"+timestep.WeatherSymbol3;
            else
                var weathersymbol = timestep.WeatherSymbol3;                
            
            html += '<div class="weatherIconLarge"><img src="'+app.images
                    +'/weathersymbols/large/'+weathersymbol
                    +'.png" height="161" width="161" alt="'
                    +translate(timestep.WeatherSymbol3)+'"></div>';
            
            var sign = "";
            var tempclass = "";
            
            if (timestep.Temperature>0 && timestep.Temperature<10) {
                sign = "+";
                // CSS first-letter definition doesn't work in some
                // Samsung Android 2.x devices
                if (!($.os.android && $.os.version.substring(0,1)==2))
                    tempclass = " temperatureSign";
            }
            if (timestep.Temperature<0
                && !($.os.android && $.os.version.substring(0,1)==2))
                tempclass = " temperatureSign";
                
            html += '<div class="temperatureLarge'+tempclass+'">'
                    +sign+timestep.Temperature
                    +'<span class="temperaturePoint">°</span><span class="temperatureC">c</span></div>';
            html += '</div>';
            
            $("#firstTimestepUTC").val(utctime.getTime());
            var localtime = convertIsoTimeStampToDate(timestep.localtime, false);
            
            html += '<div id="feelsLikeWrapper" class="feelsLikeWrapper">';
            html += '<div id="largeForecastDate" class="date">'
                    +date("j.n.", localtime)+'</div>';
            html += '<div class="clockIcon"></div>';
            html += '<div id="largeForecastTime" class="time">'
                    +date("G:i", localtime)+'</div>';
                    
            if (isNaN(timestep.FeelsLike))
            	var feelslike = "";
            else if (timestep.FeelsLike>0)
                var feelslike = "+"+timestep.FeelsLike+'&deg;C';
            else
                var feelslike = timestep.FeelsLike+'&deg;C';      
                
            var iso2 = timestep.iso2.toLowerCase();
                
            if (isset(json.feelslike[iso2]) && cached!==true)
                var feelslikeicon = json.feelslike[iso2];
            else if (isset(json.feelslike["all"]) && cached!==true)
                var feelslikeicon = json.feelslike["all"];
            else
                var feelslikeicon = resolveFeelsLikeIcon(timestep);
            
            html += '<span class="feelLikeTemperature">'+feelslike
                    +'<span></span></span><img src="'+app.images
                    +'/feelslike/'+feelslikeicon
                    +'" class="feelsLikeIcon" style="width: auto" height="42" width="auto"></div>';
            html += '<div class="weatherWrapper">';
            html += '<div class="rainBox">';
            html += '<div class="rainBoxCentered">';           
            html += '<div id="rainIcon" class="rainIcon rainOne"></div>';
            html += '<div class="rainData">';
            
            if (!isNaN(timestep.PoP)) {
                var popclass = "";
                if (app.language=="en")
                    var pop = formatRainProbability(timestep.PoP)+"%";            
                else
                    var pop = formatRainProbability(timestep.PoP)+"&nbsp;%";
            } else {
                var pop = "";
                var popclass = " popMissing";
            }
            
            html += '<div id="PoP" class="humidy">'+pop+'</div>';
            html += '<div id="rainAmount" class="rainAmount'+popclass+'">'
                    +formatNumber(timestep.Precipitation1h)+'&nbsp;mm</div>';
            html += '</div></div></div>';
            
            var suninfo = json.suninfo[geoid];
            if (suninfo===false)
                var suntxt = "";            
            else
                var suntxt = suninfo.suntxt;
               
            var sunimg = "sunrise.png";
               
            if (suninfo.sunrisetoday==0 && suninfo.sunsettoday==0) {
                var sunset = convertIsoTimeStampToDate(suninfo.sunset);
                if (sunset<now)
                    sunimg = "sundown.png";
            }
            
            html += '<div class="sunriseBox">';
            html += '<div class="sunRiseIcon"><img src="'+app.images
                    +'/'+sunimg+'" height="21" width="42" alt="'
                    +translate("Sunrise and sunset")+'"/></div>';
            html += '<div id="sunSetAndRise" class="sunRiseTime">'+suntxt+'</div>';
            html += '</div>';
            html += '<div class="windBox">';
            html += '<div class="windBoxCentered">';
            
            var wd = "windDirection"+timestep.WindCompass8;
            
            html += '<div id="windIcon" class="windIconLarge '+wd+'">';
            html += '<div id="windSpeed" class="windSpeed">'+timestep.WindSpeedMS+'</div>';
            html += '</div></div></div></div>';                                          
            
            return false;
            
        });
        
        if (html=="")
            html = '<div class="locationTxt">'+formatSmartName(item.forecast[0], true)
                    +'</div><div class="shortForecastMissing">'
                    +translate("Forecast missing")+'</div>';
               
        app.location_slides.push(html);         
    });
    
    // Store weatherdata json in localstorage
    
    if (cached!==true) {    
        //console.log("storing weatherdata");
        setLocalStorageItem("weatherdata", JSON.stringify(json));
    }
        
    updateSwipeUi(swipeui_page);    
    updateFavoriteLocationNames();

}

// Updates local warnings

function updateLocalWarnings(warnings) 
{
    var warningtext = "";
    
    $("#warningListWrapper").remove();
    
    if (warnings!=false) {
        if (warnings.forestfire!=false)
            warningtext += translate("Forest fire warning")+", ";
        if (warnings.freeze!=false)
            warningtext += translate("Cold warning")+", ";
        if (warnings.grassfire!=false)
            warningtext += translate("Grass fire warning")+", ";
        if (warnings.icing!=false)
            warningtext += translate("Ice accretion warning")+", ";
        if (warnings.heat!=false)
            warningtext += translate("Heat warning")+", ";
        if (warnings.pedestrian!=false)
            warningtext += translate("Weather warning for pedestrian")+", ";
        if (warnings.wind!=false)
            warningtext += translate("Wind warning")+", ";
        if (warnings.rain!=false)
            warningtext += translate("Heavy rain warning")+", ";
        if (warnings.thunder!=false)
            warningtext += translate("Severe thunderstorm warning")+", ";
        if (warnings.traffic!=false)
            warningtext += translate("Traffic weather warning")+", ";                
        if (warnings.ultraviolet!=false)
            warningtext += translate("Ultraviolet advisory")+", ";
        if (warnings.waterlevel!=false)
            warningtext += translate("Sea level warning")+", ";
        if (warnings.waveheight!=false)
            warningtext += translate("Wave height warning")+", ";
            
        if (warningtext.length>0)
            warningtext = warningtext.substring(0, warningtext.length-2);
    }
   
    if (warningtext!="") {
        var html = '<div id="warningListWrapper" class="warningListWrapper"><div class="warningRowHeader"><h3>'
                    +translate("warningsTitle")+'</h3></div><div class="warningRow"><div class="warningItem">'
                    +warningtext+'</div></div></div>';
        $("#shortforecast").before(html);
    }
}

// Converts ISO timestamp to Javascript date

function convertIsoTimeStampToDate(timestamp, utc) 
{
    var year = timestamp.substring(0,4);
    var month = timestamp.substring(4,6);
    var day = timestamp.substring(6,8);
    var hours = timestamp.substring(9,11);
    var minutes = timestamp.substring(11,13);
    var seconds = timestamp.substring(13,15);

    var d = new Date();
    
    if (utc) {    
        d.setUTCFullYear(year);
        d.setUTCMonth(month-1, day);
        d.setUTCHours(hours);
        d.setUTCMinutes(minutes);
        d.setUTCSeconds(seconds);
    } else {
        d.setFullYear(year);
        d.setMonth(month-1, day);
        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);
    }
    
    return d;
}

// Updates displayed forecast using cached weatherdata

function useCachedForecast()
{
    hideForecastLoading();
   
    // Don't update display if first forecast timestep is already in future
    
    var first = $("#firstTimestepUTC").val();
    var now = new Date();
    
    //console.log("first: "+first+" now: "+now.getTime());
    
    if (first!="" && now.getTime()<first) {
        //console.log("Don't update with cached forecast, because displayed data is fresh");
        return;
    }

    if (getLocalStorageItem("weatherdata")!=null) {
        hideLoadingDialog("weather");
        
        var weatherdata = JSON.parse(getLocalStorageItem("weatherdata"));
               
        var now = new Date();
        var generated = new Date(weatherdata.generated*1000);
        
        // Check is cached data too old
        
        if ((now.getTime()-generated.getTime())>(24*60*60*1000)) {
            //console.log("cached weatherdata is too old: "+date("d.m.Y H:i:s", generated));
            $("#firstTimestepUTC").val("");
            showErrorDialog("weather", translate("Could not update weather data"));
        } else {
            //console.log("using cached forecast");
            updateSlides(weatherdata, true);    
        }
    } else {
        $("#firstTimestepUTC").val("");
        showErrorDialog("weather", translate("Could not update weather data"));
    }    
    
}

// To check is value nan

function isNaN(value) 
{
	if (typeof value!=="string")
		return false;

	if ((typeof value === "undefined") || value.toLowerCase()=="nan")
		return true;
	else
		return false;
}

// Formats location names using region or country information

function formatSmartName(row, html) 
{
        
    if (row.iso2.toLowerCase()=="fi" || isNaN(row.country)) {
        if (row.region==null || row.region=="" 
            || row.name.toLowerCase()==row.region.toLowerCase()) {
            if (html)
                return '<span class="forecastCity">'+row.name+'</span>';
            else
                return row.name;
        } else {
            if (html)
                return '<span class="forecastCity">'+row.name
                        +'</span><span class="forecastArea">'+row.region
                        +'</span>';
            else
                return row.name+", "+row.region;
        }
    } else {
        if (html) {
            if (row.name==row.country)
                return '<span class="forecastCity">'+row.name+'</span>';
            else
                return '<span class="forecastCity">'+row.name
                    +'</span><span class="forecastArea">'+row.country+'</span>';
        } else {
            if (row.name==row.country)
                return row.name;
            else
                return row.name+", "+row.country;
        }
    }
    
}

// Converts FMI timestamp to Javascript date

function convertTimestampToDate(timestamp)
{
    if (timestamp.length!=12)
        return false;
        
    var day =  timestamp.substring(6,8);
    var month = timestamp.substring(4,6)-1;
    var year = timestamp.substring(0,4);
    var hour = timestamp.substring(8,10);
    var minute = timestamp.substring(10,12);
    
    try {
        var d = new Date(year, month, day, hour, minute);
    } catch(err) {
        return false;
    }
    
    return d;
    
}

// Shows long forecast using weatherdata from local storage

function showLongForecast(daystamp)
{    
    var weatherdata = getCachedWeatherdata();
    
    if (!weatherdata)
        return;
    
    $("#warningImportant").hide();
        
    changeTabProgrammatically("#longForecast");
    
    var forecast = weatherdata.forecasts[app.current_slide].forecast;
    
    var now = new Date();
    var previous_date = false;
    
    var html = "";
    var divider = 3;
    
    $("#longForecastTitle").html(formatSmartName(forecast[0]));

    $.each(forecast, function(i, timestep) {
        if (isNaN(timestep.Temperature))
            return true; // jQuery continue
    
        var utctime = convertIsoTimeStampToDate(timestep.utctime, true);
                    
        if (utctime<now || !isTimestepValid(timestep))
            return true; // jQuery continue

        var localtime = convertIsoTimeStampToDate(timestep.localtime, false);
        var hour = localtime.getHours();
        
        if ((hour%divider)!=0)
            return true;
                  
        if (localtime.toDateString()!=previous_date) {
            if (html!="")
                html += "</div>";
        
            var daystr = date("D j.n.", localtime);
                       
            html += '<div id="tendays_'+date("Ymd", localtime)
                    +'" class="tenDaysHeader"><h3>'+daystr.toUpperCase()
            		+'</h3></div><div class="dataListWrapper">';
            previous_date = localtime.toDateString();
        }
        
        if (timestep.dark==1) {
            var dark = "1";
            var darkclass = " dark3";
        } else {
            var dark = "";
            var darkclass = "";
        }
        
        if (timestep.Temperature>0 && timestep.Temperature<10)
            var tempsign = "+";
        else
            var tempsign = "";
        
        html += '<div class="dataRow'+darkclass+'"><div class="dataRowTime">'
                +date("H:i", localtime)+'</div><div class="dataRowWeatherIcon"><img src="'
                +app.images+'/weathersymbols/small/'+dark+timestep.WeatherSymbol3
                +'.png" width="52" height="45" alt="'+translate(timestep.WeatherSymbol3)
                +'"/></div><div class="dataRowTemperature">'
                +tempsign+timestep.Temperature
                +'&nbsp;&deg;C</div><div class="dataRowWind"><div class="dataRowWindSpeed windDirection'
                +timestep.WindCompass8+'"><span>'+timestep.WindSpeedMS
                +'</span></div></div><div class="dataRowRainData"><div class="dataRowRainIcon rainOne"></div><div class="dataRowHumidy">';
        
        var popclass = " popMissing"; 

        if (!isNaN(timestep.PoP)) {
            popclass = "";
            if (app.language=="en")
                html += formatRainProbability(timestep.PoP)+"%";
            else
                html += formatRainProbability(timestep.PoP)+"&nbsp;%";
        }
                
        html += '</div><div class="dataRowRainAmount'+popclass+'">'
                +formatNumber(timestep.Precipitation1h)
                +'&nbsp;mm</div></div></div>';
       
    });
    
    if (html=="")
        html = '<div class="longForecastMissing">'+translate("Forecast missing")
                +"</div>";
    
    $("#longForecastContent").html(html);

    if (typeof daystamp != 'undefined' && typeof daystamp != "object" 
    	&& $("#tendays_"+daystamp).length>0) {
       
        // Scroll to selected day. iOS and Windows Phone have fixed back-header
        // in the top that takes some space and we have to scroll to previous
        // element.
        
        if ($.os.ios || $.os.windows)       
            window.scrollTo(0, $("#tendays_"+daystamp).offset().top-60);
        else
            document.getElementById("tendays_"+daystamp).scrollIntoView();
    } else
    	window.scroll(0, 0);
       
    document.addEventListener("backbutton", hideLongForecast, false);
    trackPageView("longforecast");

}

// Hides long forecast

function hideLongForecast() 
{	
    $("#longForecastContent").html("");
    
    if ($("#crisismessage").html()!="")
        $("#warningImportant").show();        
    
    changeTabProgrammatically("#weather");
    document.removeEventListener("backbutton", hideLongForecast, false);   
}

// Adds temporary favorite and shows weather data for it

function addTemporaryFavoriteLocation()
{

    var parent = $(this).parent();
    var items = parent.attr("id").split("_");
    var id = items[1];
    
    // Check that item is not positioned locaiton
       
    if ($(this).hasClass("positioned")) {
        $("#locationSearch").blur();
        app.carousel.goToPage(0);
        changeTabProgrammatically("#weather");
        return;   
    }
        
    var favorite = new Object;
    favorite.id = id;
    favorite.temporary = true;
    favorite.name = parent.find(".placeName").html();
    
    // Temporary favorite replaces current temporary if defined
    
    var found = false;
    
    $.each(app.favorites, function(i, location) {
        if (location.id==id)
            found = true;    
    });
    
    if (!found) {
        var pushed = false;
        var new_favorites = new Array();
        
        $.each(app.favorites, function(i, location) {
            if (location.temporary==true) {
                new_favorites.push(favorite);
                pushed = true;
            } else 
                new_favorites.push(location);
        });
        
        if (!pushed)
            new_favorites.push(favorite);
            
        app.favorites = new_favorites;
    }
    
    var str = JSON.stringify(app.favorites);
    setLocalStorageItem("favorites", str); 
    saveSettingsToFile();
    
    // Add to recent locations
    
    addRecentLocation(favorite);

    $("#locationSearch").blur();
    
    app.show_location = favorite.id; // So that swipe UI knows location to show

    updateForecasts();
    changeTabProgrammatically("#weather");
}

// Adds favorite location and shows weather data to it

function addFavoriteLocation() 
{
	//console.log("addFavorite");
	
    var parent = $(this).parent();
    var items = parent.attr("id").split("_");
    var id = items[1];
    
    // Check that location is not already in favorites
    
    var found = false;
    var temporary = 0;
    var new_favorites = new Array();
    
    $.each(app.favorites, function(i, location) {
        if (location.temporary===true)
            temporary = 1;    
        if (location.id==id && location.temporary==false)
            found = true;
        if (!(location.id==id && location.temporary))
            new_favorites.push(location);            
    });
       
    if (found) {
        //console.log("dublicate favorite found");
        return;
    }
    
    // Are we adding temporary
        
    if (temporary==1 && $(this).parent().parent().attr("id")=="temporaryLocation")
        temporary = 0;
        
    app.favorites = new_favorites;
        
    // If already 5 favorites, then ask user to remove one location
    
    if ((app.favorites.length-temporary)>=5) {
        showAlert(translate("Too many favorites"), 
                    translate("You have already defined 5 favorites, that is maximum. Please remove one favorite before adding new one."));
        return;
    }
    
    var favorite = new Object;
    favorite.id = id;
    favorite.temporary = false;
    favorite.name = parent.find(".placeName").html();
    
    app.favorites.push(favorite);
       
    var str = JSON.stringify(app.favorites);
    setLocalStorageItem("favorites", str);
	saveSettingsToFile();    
    
    // Mark selected
    
    $(this).removeClass("placeStarGray").removeClass("addFavorite").addClass("placeStar").addClass("removeFavorite");
    parent.removeClass("placeWrapper").addClass("placeWrapperSelected");
    parent.find(".placeName").removeClass("placeName").addClass("placeNameSelected"); 

    // Add to recent locations
    
    addRecentLocation(favorite);
    
    $("#locationSearch").blur();
    app.show_location = favorite.id; // So that swipe UI knows location to show
    updateForecasts();
    changeTabProgrammatically("#weather");
}

// Refresh favorite location list

function refreshFavoriteLocations()
{
    var html = "";
    var temporary = false;
    
    if (app.favorites.length==0)
        $("#favoriteBlock").hide();
    else if (app.favorites.length==1 && app.favorites[0].temporary===true)
        $("#favoriteBlock").hide();       
    else
        $("#favoriteBlock").show();
    
    $.each(app.favorites, function(i, location) {
        if (!location.temporary) {
            html += '<div id="favorite_'+location.id
                    +'" class="placeWrapperSelected"><div class="placeNameSelected">'
                    +location.name+'</div><div class="placeStar removeFavorite">&nbsp;</div></div>' 
        } else {
            var temp = '<div id="favorite_'+location.id
                        +'" class="placeWrapper"><div class="placeName">'
                        +location.name+'</div><div class="placeStarGray addFavorite">&nbsp;</div></div>';
            $("#temporaryLocation").html(temp);
            bindSmartClick("#temporaryLocation .placeName", showFavoriteLocation);
            temporary = true;
        }
    
    });
    
    $("#favoriteLocations").html(html);
    
    if (!temporary)
        $("#temporaryLocation").html("");
    
    bindSmartClick("#locations .addFavorite", addFavoriteLocation);
    bindSmartClick("#locations .removeFavorite", removeFavoriteLocation);
    bindSmartClick("#locations .placeNameSelected", showFavoriteLocation);
}

// Adds location to recent locations

function addRecentLocation(location)
{
    //console.log("addRecentLocation");
    //console.log(location);

    var recent_locations = null;

	try {
		recent_locations = JSON.parse(getLocalStorageItem("recent_locations"));
	} catch (err) {}
    
    if (recent_locations==null)
        recent_locations = new Array();
        
    var new_recent = new Array();
    
    // Remove if already exist
    
    $.each(recent_locations, function(i, item) {
        if (item.id!=location.id)
            new_recent.push(item);
    });
    
    new_recent.unshift(location);
    
    if (new_recent.length>8)
        new_recent.pop();
        
    var str = JSON.stringify(new_recent);
    setLocalStorageItem("recent_locations", str);  
    
}

// Reresh list of recent locations

function refreshRecentLocations() { 

    var html = "";
    var recent_locations = null;

	try {
		recent_locations = JSON.parse(getLocalStorageItem("recent_locations"));
	} catch (err) {}
    
    if (recent_locations==null)
        recent_locations = new Array();
                       
    $.each(recent_locations, function(i, location) {
    
        // Check that location is not found in favorites
    
        var found = false;
        
        $.each(app.favorites, function(i, favorite) {
            if (favorite.id==location.id && favorite.temporary==false) {
                found = true;
                return false;
            }
        });
        
        if (!found)    
            html += '<div id="favorite_'+location.id
                    +'" class="placeWrapper"><div class="placeName">'
                    +location.name+'</div><div class="placeStarGray addFavorite">&nbsp;</div></div>';
    });
    
   
    $("#recentLocations").html(html);
       
    if (html=="" && $("#positionedLocation").html()=="") {
        $("#recentBlock").hide();
        return;
    }
    
    $("#recentBlock").show();   
    bindSmartClick("#recentLocations .addFavorite", addFavoriteLocation);
    bindSmartClick("#recentLocations .placeName", addTemporaryFavoriteLocation);

}

// Shows weather data for favorite location

function showFavoriteLocation()
{
    var parent = $(this).parent();
    var items = parent.attr("id").split("_");
    var id = items[1];
    
    $("#locationSearch").blur();
   
    if (areFavoritesInCachedWeatherData()) {
        weatherdata = getCachedWeatherdata();
        
        $.each(weatherdata.forecasts, function(i, item) {
            if (item.forecast[0].geoid==id) {
                if (app.swipeui)
                   app.carousel.goToPage(i);
                else
                    updateSwipeUi(i);
            }
        });
        
    } else {
        app.show_location = id;
        updateForecasts();
    }
    
    changeTabProgrammatically("#weather");
}

// Removes favorite location

function removeFavoriteLocation() 
{
	console.log("removeFavorite");
	
    var parent = $(this).parent();
    var items = parent.attr("id").split("_");
    var id = items[1];
    
    var new_favorites = new Array();
    var new_slides = new Array();
    new_slides.push(app.location_slides[0]); // Positioned location     
    
    $.each(app.favorites, function(i, location) {
        if (location.id!=id) {
            new_favorites.push(location);
            new_slides.push(app.location_slides[i+1]);
        } else {
            // Update slide index
            if (app.current_slide>(i+1))
                app.current_slide--;
        }
    });
      
    app.favorites = new_favorites;
    app.location_slides = new_slides;
    
    var str = JSON.stringify(app.favorites);
    setLocalStorageItem("favorites", str);    
    
    $(this).removeClass("placeStar").removeClass("removeFavorite").addClass("placeStarGray").addClass("addFavorite");
    parent.find(".placeNameSelected").removeClass("placeNameSelected").addClass("placeName");
    parent.removeClass("placeWrapperSelected").addClass("placeWrapper");    
    
    bindSmartClick($(this), addFavoriteLocation);
    bindSmartClick("#locations .placeName", addTemporaryFavoriteLocation);
    
    updateForecasts();
	saveSettingsToFile();
}

// Updates location Swipeview

function updateSwipeUi(showpage)
{
    var	el, i, page;
    
    //console.log("swipeui");
    
    // If slides are empty then don't use swipeui
    
    if (app.location_slides.length==0)
        return;
    
    $("#swipelocations").html("");
    
    if (app.carousel) {
        app.carousel.destroy();
        app.carousel = false;
    }
    
    // Don't use swipe if only one page or non-webkit browser 
    // because of bad performance and compatibility
    
    if (app.location_slides.length==1 || app.swipeui===false) {
		if (showpage!==false && is_int(showpage)) {
			$("#swipelocations").html(app.location_slides[showpage]);			
			app.current_slide = showpage;
        } else if (app.current_slide!==false && app.current_slide<app.location_slides.length) {
			$("#swipelocations").html(app.location_slides[app.current_slide]);
        } else { 
			$("#swipelocations").html(app.location_slides[0]);
			app.current_slide = 0;
		}

		updateLocationSwipeindicators();
		updateShortForecastAndObservations(app.current_slide);
        return;
    }
        
    app.carousel = new SwipeView('#swipelocations', {
        numberOfPages: app.location_slides.length,
        hastyPageFlip: true
    });

    for (i=0; i<3; i++) {
        page = i==0 ? app.location_slides.length-1 : i-1;
        el = document.createElement('span');
        el.className = "slider";
        el.innerHTML = app.location_slides[page];
        app.carousel.masterPages[i].appendChild(el)
    }

    app.carousel.onFlip(function () {
        var el, upcoming, i;
        var masterPages = app.carousel.masterPages;
        
        for (i=0; i<3; i++) {
            upcoming = masterPages[i].dataset.upcomingPageIndex;

            if (upcoming != masterPages[i].dataset.pageIndex) {
                el = masterPages[i].querySelector('span');
                el.innerHTML = app.location_slides[upcoming];
            }
        }

        app.current_slide = app.carousel.pageIndex;
        updateLocationSwipeindicators();
        
        // Timeout makes slider to work more smooth
        
        if (app.location_slider_timer)
            clearTimeout(app.location_slider_timer);
        
        app.location_slider_timer = setTimeout(function() {
            updateShortForecastAndObservations(app.current_slide);
        }, 250);
                     
    });
    
    // Restore position or select some sensible location to view
        
    if (showpage!==false && is_int(showpage)) {
        //console.log("showpage: "+showpage);
        app.carousel.goToPage(showpage);
        app.show_location = false;
    } else if (app.current_slide!==false && app.current_slide<app.location_slides.length) {
        //console.log("current_slide: "+app.current_slide);
        app.carousel.goToPage(app.current_slide);
    } else {
        app.carousel.goToPage(0);
    }
    
    updateLocationSwipeindicators();
             
}

// Updates swipe indicators for location Swipeview

function updateLocationSwipeindicators()
{
    var html = "";
    if (app.swipeui)    
		var index = app.carousel.pageIndex;
    else
		var index = app.current_slide;
	
	if (app.swipeui===false && app.location_slides.length>1)
		html += '<img id="prevSlideButton" class="swipeButton" style="float: left; padding-left:12px;" width="23" height="28" src="'
					+app.images+'/leftArrowGray.png"/>';
	
    for(var n=0; n<app.location_slides.length; n++) {
        html += '<div class="swipeIndicator';

        if (n==0 && app.position && n==index)
            html += " fav";
        else if (n==0 && app.position)
            html += " favNot";
        else if (n==index)
            html += " current";
        
        html += '"></div>';
    }

	if (app.swipeui===false && app.location_slides.length>1)
		html += '<img id="nextSlideButton" class="swipeButton" style="float: right; padding-right:12px;" width="23" height="28" src="'
				+app.images+'/rightArrowGray.png"/>';
    
    $("#locationSwipeIndicators").html(html);
    
    if (app.swipeui===false && app.location_slides.length>1) {
		bindSmartClick("#prevSlideButton", goToPreviousSlide);
		bindSmartClick("#nextSlideButton", goToNextSlide);
	}
}

function goToPreviousSlide()
{
	var newpage = app.current_slide-1;
	if (newpage<0)
		newpage = app.location_slides.length-1;
	updateSwipeUi(newpage);
}

function goToNextSlide()
{
	var newpage = app.current_slide+1;
	if (newpage>=app.location_slides.length)
		newpage = 0;	
	updateSwipeUi(newpage);
}

// Gets weatherdata from local storage

function getCachedWeatherdata()
{    
    var weatherdata = null;
    
	try {
		weatherdata = JSON.parse(getLocalStorageItem("weatherdata"));
	} catch (err) {
		return false;		
	}
    
    if (weatherdata==null)
        return false;
    
    // Check that data is not too old (older than 24 hours)
    
    var generated = new Date();
    generated.setTime(weatherdata.generated*1000);
    var now = new Date();
    
    if ((now.getTime()-generated.getTime())>(24*60*60*1000))
        return false;
    
    return weatherdata;
}

// Updates short forecast and observations for given location (slide)

function updateShortForecastAndObservations(slide)
{
    // FeelsLike man is mispositioned in iOS

    if ($.os.ios)
        $(".feelsLikeWrapper").css("position", "relative").css("top", "1px");
        
    if ($('#longForecast').hasClass("hidden")) {
        $("#shortforecast").show();
        $("#swipeobservations").show();
    }

    var weatherdata = getCachedWeatherdata();
    
    if (!weatherdata)
        return;
    
    forecast = weatherdata.forecasts[slide].forecast;
        
    var now = new Date();
    var now_plus_one = new Date(now.getTime()+1*60*60*1000);
    var maxtime = new Date(now.getTime()+12*60*60*1000);
    var generated = new Date(weatherdata.generated*1000);
    var geoid = forecast[0].geoid;
    var iso2 = forecast[0].iso2.toLowerCase();
    var suninfo = weatherdata.suninfo[geoid];
    
    var html = "";    
    var darkclass = "";
    
    if (suninfo && suninfo["sunrisetoday"]==1) {
        var sunrise = convertIsoTimeStampToDate(suninfo["sunrise"], false);
    } else {
        var sunrise = false;
    }

    if (suninfo && suninfo["sunsettoday"]==1) {
        var sunset = convertIsoTimeStampToDate(suninfo["sunset"], false);
    } else {
        var sunset = false;
    }

    $.each(forecast, function(i, timestep) {
    
        var utctime = convertIsoTimeStampToDate(timestep.utctime, true);
                    
        if (utctime<now_plus_one || !isTimestepValid(timestep)) {
            return true; // jQuery continue
        }
            
        // Show only 12 hours
                       
        if (utctime>maxtime)
            return false; // jQuery break
           
        var localtime = convertIsoTimeStampToDate(timestep.localtime, false);

        if (timestep.dark==1) {
            var weathersymbol = "1"+timestep.WeatherSymbol3;
            darkclass = " dark3";
        } else {
            var weathersymbol = timestep.WeatherSymbol3;
            darkclass = "";
        }
        
        var sunclass = "";
        
        if (sunrise && date("H",localtime)==date("H", sunrise))
            sunclass = " sunrise";
        if (sunset && date("H",localtime)==date("H", sunset))
            sunclass = " sunset";
           
        if (timestep.Temperature>0 && timestep.Temperature<10)
            var tempsign = "+";
        else
            var tempsign = "";

        html += '<div class="dataRow'+darkclass+sunclass+'">';        
        html += '<div class="dataRowTime">'+date("H:i", localtime)+'</div>';

        html += '<div class="dataRowWeatherIcon">'
                +'<img src="'+app.images+'/weathersymbols/small/'
                +weathersymbol+'.png" width="52" height="45" alt="'
                +translate(timestep.WeatherSymbol3)+'"/></div>';
        html += '<div class="dataRowTemperature">'+tempsign+timestep.Temperature
                +'&nbsp;°C</div>';
        html += '<div class="dataRowWind"><div class="dataRowWindSpeed windDirection'
                +timestep.WindCompass8+'"><span>'+timestep.WindSpeedMS
                +'</span></div></div>';
        html += '<div class="dataRowRainData"><div class="dataRowRainIcon rainOne"></div><div class="dataRowHumidy">';

        var popclass = " popMissing"; 

        if (!isNaN(timestep.PoP)) {
            popclass = "";
            if (app.language=="en")
                html += formatRainProbability(timestep.PoP)+"%";
            else
                html += formatRainProbability(timestep.PoP)+"&nbsp;%";
        }
        
        html += '</div><div class="dataRowRainAmount'+popclass+'">'
                +formatNumber(timestep.Precipitation1h)+'&nbsp;mm</div></div>';
        html += '</div>';
       
    });
    
    // Quick look for next 5 days

    var count = 0;
    var timesteps = Math.floor($("body").width()/64);
    
    html += '<div id="dataRowFiveDay" class="dataRowFiveDay">';
    
    $.each(forecast, function(i, timestep) {
           
        var utctime = convertIsoTimeStampToDate(timestep.utctime, true);
        
        if (utctime<maxtime || !isTimestepValid(timestep))
        	return true; // jQuery continue
                       
        var localtime = convertIsoTimeStampToDate(timestep.localtime, false);

        if (date("H", localtime)!=15)
            return true; // jQuery continue

        if (count>0)
            html += '<div class="dataRowFiveDayBorder"></div>'
        
        if (timestep.dark==1)
            var weathersymbol = "1"+timestep.WeatherSymbol3;
        else
            var weathersymbol = timestep.WeatherSymbol3;

        html += '<div onclick="showLongForecast('+"'"
                +date("Ymd", localtime)+"'"+')" class="dataRowFiveDayItem">'
                +'<span class="weekDay">'+capitaliseFirstLetter(date("D", localtime))
                +'</span><br><img class src="'
                +app.images+'/weathersymbols/small/'
                +weathersymbol+'.png" width="52" height="45"/><br/>'
                +timestep.Temperature+'&deg;C</div>';
        
        count++;
        
        if (count>=timesteps)
            return false; // jQuery break
    });
    
    html += '</div>';
          
    $("#shortForecastData").html(html);
        
    // Set shadows based on sundata
    
    setShortForecastShadows();
           
    var origintime = convertIsoTimeStampToDate(forecast[0].origintime, false);
    var updated = translate("Forecast updated")+" "+date("j.n.Y", origintime)+" "
                    +date("G:i", origintime)+"</p>";
                    
    $("#shortForecastUpdated").html(updated);
    $("#longForecastUpdated").html(updated);  
    
    // If data is older than 12 hours show update times with red background
    
    if (Math.abs(now.getTime()-generated.getTime())>(12*60*60*1000)) {
        $("#shortForecastUpdated").addClass("warning");
        $("#longForecastUpdated").addClass("warning");    
    } else {
        $("#shortForecastUpdated").removeClass();
        $("#longForecastUpdated").removeClass();
    }                    
     
    // Updates warnings
    
    updateLocalWarnings(weatherdata.warnings[geoid]);
    
    // Make observations slides
    
    app.observation_slides = new Array();
    var observations = weatherdata.observations[geoid];
    
    if (observations==false) {
        var item = new Object();
        item.geoid = geoid;
        item.fmisid = false;
        item.html = '<div class="observationLocationTxt">'
                                +translate("No observations available")+'</div>';
        app.observation_slides.push(item);           
    } else {    
        $.each(observations, function(i, station) {
            var obstime = convertTimestampToDate(station.time);
            var distance = Number(station.distance);
            
            var html = '<div class="observationLocationTxt"><span>'
                        +translate("Weather station")+' • '
                        +date("j.n.Y", obstime)+" "+date("G:i", obstime)
                        +'  • '+translate("Distance")+' '+distance.toFixed(1)
                        +' km</span>'+station.name;
            if (!isNaN(station.region))
            	html += ", "+station.region;
            
            html += '</div>';

            if (!isNaN(station.Temperature))
                html += makeObservationDataRow(translate("Temperature"), 
                                                formatNumber(station.Temperature), 
                                                "&deg;C");
            if (!isNaN(station.DewPoint))
                html += makeObservationDataRow(translate("Dew point"), 
                                                formatNumber(station.DewPoint), 
                                                "&deg;C");
            if (!isNaN(station.WindSpeedMS))
                html += makeObservationDataRow(translate("Wind"),
                                                convertWindCompassToText(station.WindCompass8, station.WindSpeedMS)+" "+Math.round(Number(station.WindSpeedMS)),
                                                "m/s");
            if (!isNaN(station.WindGust))
                html += makeObservationDataRow(translate("Wind gust"),
                                                Math.round(Number(station.WindGust)),
                                                "m/s");
            if (!isNaN(station.Humidity))
                html += makeObservationDataRow(translate("Humidity"),
                                                Math.round(Number(station.Humidity)),
                                                "%");                    
            if (!isNaN(station.Pressure))
                html += makeObservationDataRow(translate("Pressure"), 
                                                formatNumber(station.Pressure),
                                                "hPa"); 
            if (!isNaN(station.RI_10MIN))
                html += makeObservationDataRow(translate("Precipitation rate"), 
                								formatNumber(station.RI_10MIN),
                                                "mm/h");
            if (!isNaN(station.TotalCloudCover))
                html += makeObservationDataRow(translate("Cloudiness"), 
                                                convertCloudinessToText(station.TotalCloudCover)+" ("+Math.round(station.TotalCloudCover)+"/8)",
                                                "");
                                                                                                                                                                                                            
            if (!isNaN(station.Visibility)) {
                if (station.Visibility<1000) {
                    html += makeObservationDataRow(translate("Visibility"), 
                                                    Math.round(Number(station.Visibility)), 
                                                    "m");
                } else if(station.Visibility<5000) {
                    var visibility = station.Visibility/1000;
                    visibility = formatNumber(visibility.toFixed(1));
                    html += makeObservationDataRow(translate("Visibility"), 
                                                    visibility, 
                                                    "km"); 
                } else if(station.Visibility>=50000) {
                    html += makeObservationDataRow(translate("Visibility"), 
                                                    translate("over")+" 50", 
                                                    "km");                                                      
                } else {
                    var visibility = Math.round(station.Visibility/1000);
                    html += makeObservationDataRow(translate("Visibility"), 
                                                    visibility, 
                                                    "km");                    
                }
            }
            if (!isNaN(station.WW_AWS))
                html += makeObservationDataRow(translate("Weather"), 
                								resolveWawaCode(Number(station.WW_AWS)), 
                                                "");             
            if (!isNaN(station.SnowDepth) && station.SnowDepth>=0)
                html += makeObservationDataRow(translate("Snow depth"), 
                                                Math.round(Number(station.SnowDepth)),
                                                "cm"); 
           
            var item = new Object();
            item.geoid = geoid;
            item.fmisid = station.fmisid;
            item.html = html;
            app.observation_slides.push(item);
                       
        });
        
    }
    
    // Updates observation carousel
    
    //console.log("Updating observations carousel "+geoid);
    
    $("#swipeobservations").html("");

    if (app.observation_carousel) {
        app.observation_carousel.destroy();
        app.observation_carousel = false;
    }
    
    // Don't use carousel if only one page or Swipe UI doesn't work in
    // current platform
    
    if (app.observation_slides.length==1 || app.swipeui===false) {
		var index = false;
		
		if (app.observation_slides.length>1)
			var index = findLatestObservationStationFromSlides(geoid);
		
		if (index===false)
			index = 0;
		
        $("#swipeobservations").html('<div class="slider">'
                                        +app.observation_slides[index].html
                                        +"</div>");
        app.current_observation_slide = index;
        updateObservationSwipeIndicators();
        return;
    }
    
    app.observation_carousel = new SwipeView('#swipeobservations', {
        numberOfPages: app.observation_slides.length,
        hastyPageFlip: true
    });

    for (i=0; i<3; i++) {
        page = i==0 ? app.observation_slides.length-1 : i-1;
        el = document.createElement('span');
        el.className = "slider";
        el.innerHTML = app.observation_slides[page].html;
        app.observation_carousel.masterPages[i].appendChild(el)
    }

    app.observation_carousel.onFlip(function () {
        var el, upcoming, i;
        var masterPages = app.observation_carousel.masterPages;

        for (i=0; i<3; i++) {
            upcoming = masterPages[i].dataset.upcomingPageIndex;

            if (upcoming != masterPages[i].dataset.pageIndex) {
                el = masterPages[i].querySelector('span');
                el.innerHTML = app.observation_slides[upcoming].html;
            }
        }                
    
        if (app.observation_slider_timer)
            clearTimeout(app.observation_slider_timer);
    
        app.observation_slider_timer = setTimeout(updateObservationSwipeIndicators, 250);
    
    });
            
    // Restore latest weather station
       
    var index = findLatestObservationStationFromSlides(geoid)
       
    if (index===false)
        updateObservationSwipeIndicators();
    else
		app.observation_carousel.goToPage(index);    
    
}

// Finds latest observation station from observation slides

function findLatestObservationStationFromSlides(geoid)
{
	var index = false;
	
    if (isset(app.latest_weather_stations[geoid])) {
        var latest = app.latest_weather_stations[geoid];
           
        $.each(app.observation_slides, function(i, item) {
            if (latest==item.fmisid) {
                index = i;
                return false;
            }
        });
    }
    
    return index;
}

// Set short forecast shadows based on sunrise and sunset

function setShortForecastShadows()
{
    $("#shortForecastData .sunset").addClass("dark1");
    var next = $("#shortForecastData .sunset").next();
    
    if (next.hasClass("dataRow"))
        next.addClass("dark2");
        
    $("#shortForecastData .sunrise").addClass("dark1");
    var prev = $("#shortForecastData .sunrise").prev();
    next = $("#shortForecastData .sunrise").next();
    
    if (prev.hasClass("dataRow"))
        prev.addClass("dark2");
        
    // Pointforecast sometimes gives dark==1 value for next hour after sunset
    // This fixes nonlogical shadows in these cases        
    if (next.hasClass("dark3"))
        next.removeClass("dark3");
}

// Converts windcompass8 value to text presentation

function convertWindCompassToText(wc, ws)
{

    if (ws==0)
        return translate("calm");
    if (wc=="N")
        return translate("wind from the north");
    if (wc=="NE")
        return translate("wind from the north-east");
    if (wc=="E")
        return translate("wind from the east");
    if (wc=="SE")
        return translate("wind from the south-east");
    if (wc=="S")
        return translate("wind from the south");
    if (wc=="SW")
        return translate("wind from the south-west");
    if (wc=="W")
        return translate("wind from the west");
    if (wc=="NW")
        return translate("wind from the north-west");    
    
    return "";
}

// Converts cloudiness to text

function convertCloudinessToText(cloudiness)
{
    if (cloudiness<1)
        return translate("sky clear");
    if (cloudiness==1 || cloudiness==2)
        return translate("almost clear");
    if (cloudiness>=3 && cloudiness<=5)
        return translate("partly cloudy");
    if (cloudiness==6 || cloudiness==7)
        return translate("almost cloudy");
    if (cloudiness>=8)
        return translate("cloudy");
    
    return "";
}

// Updates observation swipe indicators when observations are swiped

function updateObservationSwipeIndicators()
{
    var html = "";
    var length = app.observation_slides.length;
    
    if (app.swipeui===false)
		var index = app.current_observation_slide;
	else
        var index = app.observation_carousel.pageIndex;
    
	if (app.swipeui===false && app.observation_slides.length>1)
		html += '<img id="prevObservationSlideButton" class="swipeButton" style="float: left; padding-left: 12px;"  width="23" height="28" src="'
				+app.images+'/leftArrowDark.png"/>';
	
    for(var n=0; n<length; n++) {
        html += '<div class="swipeIndicator';

        if (n==index || length==1)
            html += " current";
        
        html += '"></div>';
    }
    
	if (app.swipeui===false  && app.observation_slides.length>1)
		html += '<img id="nextObservationSlideButton" class="swipeButton" style="float: right; padding-right: 12px;" width="23" height="28" src="'
				+app.images+'/rightArrowDark.png"/>';
        
    $("#observationSwipeIndicators").html(html);
    
    if (app.swipeui===false && app.observation_slides.length>1) {
		bindSmartClick("#prevObservationSlideButton", goToPreviousObservationSlide);
		bindSmartClick("#nextObservationSlideButton", goToNextObservationSlide);		
	}
    
    // Remember observation station for location
    
    if (app.observation_slides.length>1) {    
        var geoid = app.observation_slides[index].geoid;
        var fmisid = app.observation_slides[index].fmisid;
        
        //console.log("Remember station "+geoid+" "+fmisid);

        app.latest_weather_stations[geoid] = fmisid;   
        var str = JSON.stringify(app.latest_weather_stations);
        setLocalStorageItem("latest_weather_stations", str); 
    }

}

function goToPreviousObservationSlide() 
{
	if (app.current_observation_slide>0)
		app.current_observation_slide--;
	else
		app.current_observation_slide = app.observation_slides.length-1;
	
	$("#swipeobservations").html('<div class="slider">'
										+app.observation_slides[app.current_observation_slide].html+"</div>");	
	updateObservationSwipeIndicators();
	return false;
}

function goToNextObservationSlide() 
{
	if ((app.current_observation_slide+1)<app.observation_slides.length)
		app.current_observation_slide++;
	else
		app.current_observation_slide = 0;
			
	$("#swipeobservations").html('<div class="slider">'
									+app.observation_slides[app.current_observation_slide].html+"</div>");	
	updateObservationSwipeIndicators();
	return false;
}

// Makes html for observation data row

function makeObservationDataRow(title, value, unit)
{
    var html = '<div class="observationDataRow">';
    html += '<div class="observationDataHeader">'+title+'</div>';
    html += '<div class="observationDataValue">'+value
    
    if (unit!="") {
        if (app.language=="en" && unit=="%")
           html += unit;        
        else
           html += "&nbsp;"+unit;
    }
        
    html += '</div>';
    html += '</div>';
    return html;
}

// Changes tab when user taps top panel item

function changeActiveTab() 
{
    $("div.tabs div.selected").removeClass("selected").addClass("hidden");
    $("#topPanels .selected").removeClass("selected").find("div .arrow").addClass("hidden");
    $(this).addClass("selected");
    $(this).find("div .arrow").removeClass("hidden");
    var target = $(this).attr("id");
    target = target.replace("Panel", "");
    $("#"+target).removeClass("hidden").addClass("selected").trigger("tabshow");
    trackPageView(target);
    return false;          
}

// Changes tab given as parameter

function changeTabProgrammatically(tab)
{       
    $("div.tabs div.selected").removeClass("selected").addClass("hidden");
    
    if ($(tab).hasClass("noTopPanels")) {
        $("#topPanels").hide();
    } else {
        $("#topPanels .selected").removeClass("selected").find("div .arrow").addClass("hidden");

        // Find correct panel to activate
        
        target = tab+"Panel";
        $(target).addClass("selected").find("div .arrow").removeClass("hidden");              
        $("#topPanels").show();
    }
        
    $(tab).removeClass("hidden").addClass("selected").trigger("tabshow");
    window.scroll(0,0);
    trackPageView(tab);
    return false;
}

// Autocomplete location search

function searchLocations()
{   
    var location = $("#locationSearch").val();
    
    // Cancel earlier query
    
    if (app.autocomplete_query) {
        //console.log("abort autocomplete query");
        app.autocomplete_query.abort();
    }
    
    if (location.length<1) {
        $("#autocompleteLoading").css("visibility", "hidden");
        $("#searchLocations").html("");
        return;
    }
    
    if (isset(app.autocomplete_cache[location])) {
        //console.log("Using autocomplete cache");
        handleAutocompleteResults(app.autocomplete_cache[location]);
        return;
    }
        
    var currenttime = new Date();
    var ms = currenttime.getTime();
    
    $("#autocompleteLoading").css("visibility", "visible");
    
    app.autocomplete_query = $.ajax({
        type: 'GET',
        url: 'http://'+app.ajaxserver+'/mobile/interfaces/autocomplete.php',
        data: {q: location, l: app.language, version: version}, 
        dataType: app.datatype,
        error: handleAutocompleteError,
        success: handleAutocompleteResults       
    });
    
}

// Displays error if autocomplete location search fails

function handleAutocompleteError(xhr, errortype, error) 
{   
    app.autocomplete_query = false;
    $("#autocompleteLoading").css("visibility", "hidden");
	if (errortype=="abort")
		var html = "";
	else
		var html = '<div class="placeWrapper"><div class="autocompleteInfo">'
					+translate("Location search failed")+'</div></div>';
    $("#searchLocations").html(html);

}

// Shows autocomplete location search results

function handleAutocompleteResults(json)
{
    app.autocomplete_query = false;
    $("#autocompleteLoading").css("visibility", "hidden");

    if (json.status=="error") {
        handleAutocompleteError(false, "json", false)
        return;
    }
    
    var html = "";
    
    if (json.result.length==0)
        html += '<div class="placeWrapper"><div class="autocompleteInfo">'
                +translate("No search results")+'</div></div>';
    
    $.each(json.result, function(i, location) {
        if (location.area!="")
            var name = location.name+", "+location.area;
        else
            var name = location.name;
        
        var found = false;
        
        $.each(app.favorites, function(n, favorite) {
            if (favorite.id==location.id && favorite.temporary==false)
                found = true;
        });        
        
        if (found)
            html += '<div id="searchResult_'+location.id
                    +'" class="placeWrapperSelected"><div class="placeNameSelected">'
                    +name+'</div><div class="placeStar removeFavorite">&nbsp;</div></div>';        
        else
            html += '<div id="searchResult_'+location.id
                    +'" class="placeWrapper"><div class="placeName">'
                    +name+'</div><div class="placeStarGray addFavorite">&nbsp;</div></div>';
    });
    
    if (json.more) {
        html += '<div class="placeWrapper"><div class="autocompleteInfo">'
                +translate("More than")+' '+json.result.length+' '
                +translate("search results, try more exact search.")
                +'</div></div>';    
    }
    
    $("#searchLocations").html(html);
    bindSmartClick("#searchLocations .placeNameSelected", showFavoriteLocation);
    bindSmartClick("#searchLocations .placeName", addTemporaryFavoriteLocation);
    bindSmartClick("#searchLocations .addFavorite", addFavoriteLocation);
    bindSmartClick("#searchLocations .removeFavorite", removeFavoriteLocation); 
    
    app.autocomplete_cache[json.query] = json;
    
}

// Resumes application after resume event

function resumeApplication()
{
    //console.log("resume");
    app.autocomplete_cache = new Array();
    useCachedForecast();
    locateUser(); // Updates also weather data
    updateWarnings();
    setTimeout(updateAppInfo, 10000);  
}

// Handles network offline event (not tested!)

function handleNetworkOffline()
{
    //console.log("Network offline event");

    document.addEventListener("online", handleNetworkOnline, false);
    document.removeEventListener("offline", handleNetworkOffline);
}

//Handles network online event (not tested!)

function handleNetworkOnline()
{
    //console.log("Network online event");
    
    document.addEventListener("offline", handleNetworkOffline, false);
    document.removeEventListner("online", handleNetworkOnline);
    
    var warnings = getCachedWarnings();
    var weatherdata = getCachedWeatherdata();

    if (warnings===false)
        updateWarnings();
    if (weatherdata===false);
        locateUser();
}

// Things that must be done after pause event

function pauseApplication() 
{
    //console.log("pause");
    if (app.locate_timer)
        clearTimeout(app.locate_timer);
    if (app.locate_again_timer)
        clearTimeout(app.locate_again_timer);
    if (app.warnings_timer)
        clearTimeout(app.warnings_timer);
    if (app.location_slider_timer)
        clearTimeout(app.location_slider_timer);
    if (app.observation_slider_timer)
        clearTimeout(app.observation_slider_timer);
}

// Updates application metadata from server

function updateAppInfo()
{
    var currenttime = new Date();
    var ms = currenttime.getTime();

    //console.log("update bulletins");
    
    try {
        var platform = device.platform;
    } catch (err) {
        var platform = "web";
    }
    
    $.getJSON("http://"+app.ajaxserver+"/mobile/interfaces/appinfo.php?l="
                +app.language+"&version="+encodeURIComponent(version)
                +"&platform="+encodeURIComponent(platform)+"&preventcache="+ms, 
                function(json, status) {
        if (json.status=="error") {
            // Not critical if bulletins are not received
            return;
        }
                   
        if (getLocalStorageItem("latest_shown_bulletin")!=null)
            var latest_shown_bulletin = getLocalStorageItem("latest_shown_bulletin");            
        else
            var latest_shown_bulletin = false;
        
        $.each(json.bulletins, function(i, bulletin) {       
            if (!latest_shown_bulletin || bulletin.id>latest_shown_bulletin) {
                //console.log("bulletin notification");
                showAlert(translate("Bulletin")+" "
                            +formatXmlTimeStamp(bulletin.published),
                            bulletin.text);
                setLocalStorageItem("latest_shown_bulletin", bulletin.id);
            }

        });
    });
}

// Starts radar application using custom url

function startRadarApplication()
{
    //console.log("start radar application via URL scheme");
    
    var weatherdata = getCachedWeatherdata();
    var locations = "";
    var selected = "0";
    var index = 0;
    
    if (weatherdata) {
        $.each(weatherdata.forecasts, function(i, forecast) {
            var iso2 = forecast.forecast[0].iso2.toLowerCase();
            
            // Radar app only supports Scandinavia + Baltic countries
            
            if (iso2!="fi" && iso2!="sv!" && iso2!="no" && iso2!="dk"
                && iso2!="ee" && iso2!="lv" && iso2!="lt")
                return true; // jQuery continue
        
            if (locations!="")
                locations += ",";
            locations += formatSmartName(forecast.forecast[0])+","
                            +forecast.forecast[0].latitude+" "
                            +forecast.forecast[0].longitude;
            if (i==app.current_slide)
                selected = index;
                            
            index++;
        });
  
    }    
        
    document.location = 'rainman://?locations='+encodeURIComponent(locations)
                            +"&selected="+selected;
    
}

// Formats XML timestamp to finnish format

function formatXmlTimeStamp(timestamp)
{
    var items = timestamp.split("T");
    var dateitems = items[0].split("-");
    var timeitems = items[1].split(":");
    
    return dateitems[2]+"."+dateitems[1]+dateitems[0]+" "
            +timeitems[0]+":"+timeitems[1]; 
}

// Shows alert using Phonegap alert or browser alert

function showAlert(title, message) {
    // Use native mobile platform dialog if available

    try {
        navigator.notification.alert(message, null, title);        
    } catch(err) {
        alert(message);
    }

} 

// Scrolls user interface to autocomplete input to maximize space
// for location suggestions

function scrollToAutocomplete()
{    
    obj = document.getElementById('locationSearch');
    
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}    

    window.scroll(0, curtop);
    
    var value = $("#locationSearch").val();
    
    if (value.search("Kirjoita")>-1 || value.search("Input")>-1 
        || value.search("Skriv")>-1)
        $("#locationSearch").val("");
    
}

// Displays correct language settings in info-page

function showLanguageSetting(language)
{
	var info = $("#info");
    info.find(".languageStar").removeClass("languageStar").addClass("languageStarGray");
    info.find("."+language).find(".star").removeClass("languageStarGray").addClass("languageStar");
    info.find(".languageWrapperSelected").removeClass("languageWrapperSelected").addClass("languageWrapper");
    info.find("."+language).removeClass("languageWrapper").addClass("languageWrapperSelected");
    info.find(".languageNameSelected").removeClass("languageNameSelected").addClass("languageName");
    info.find("."+language).find(".languageName").removeClass("languageName").addClass("languageNameSelected");
}

// Shows loading layer

function showLoadingDialog(tab, message)
{
    $("#"+tab+"LoadingMessage").html(message);    
    $("#"+tab+"LoadingDialog").show();
   
    if (tab=="weather")
        unbindWeatherTabEvents();
    
}

// Hides loading layer

function hideLoadingDialog(tab)
{
    $("#"+tab+"LoadingDialog").hide();

    if (tab=="weather")
        bindWeatherTabEvents();

}

// Shows error dialog/layer

function showErrorDialog(tab, message) 
{
    $("#"+tab).children("div").hide();
    $("#"+tab+"ErrorMessage").html(message);    
    $("#"+tab+"ErrorDialog").show();

    if (tab=="weather")
        unbindWeatherTabEvents();

}

// Hides error dialog/layer

function hideErrorDialog(tab)
{ 
    var loadingdialog = tab+"LoadingDialog";
    
    $("#"+tab).children("div").each(function() {
        if ($(this).attr("id")!=loadingdialog)
            $(this).show();
    });
    $("#"+tab+"ErrorDialog").hide();
    
    if (tab=="weather")
        bindWeatherTabEvents();
    
}

// Checks are all favorite locations found in cached weather data

function areFavoritesInCachedWeatherData()
{
    var allfound = true;
    var weatherdata = getCachedWeatherdata();
    
    if (!weatherdata)
        return false;

    $.each(app.favorites, function(i, favorite) {
        var found = false;
        
        $.each(weatherdata.forecasts, function(i, forecast) {
            if (forecast.forecast[0].geoid==favorite.id)
                found = true;
        });
        
        if (!found) {
            allfound = false;
            return false;
        }
    });
        
    return allfound;
}

// Updates favorite location names from weather data

function updateFavoriteLocationNames()
{
    var weatherdata = getCachedWeatherdata();
    
    if (!weatherdata)
        return;
    
    var new_favorites = new Array();
    
    $.each(app.favorites, function(i, favorite) {
    
        $.each(weatherdata.forecasts, function(i, forecast) {
            if (forecast.forecast[0].geoid==favorite.id) {
                favorite.name = formatSmartName(forecast.forecast[0]);
            }
        });
        
        new_favorites.push(favorite);
        
    });
    
    app.favorites = new_favorites;
       
    var str = JSON.stringify(app.favorites);
    setLocalStorageItem("favorites", str); 
    
}

// Initializes location search

function initializeLocationSearch()
{
    $("#locationSearch").val(translate("Input location"));
    $("#searchLocations").html("");
    refreshFavoriteLocations();
    refreshRecentLocations();
}

// Makes feedback link with correct email subject

function makeFeedbackLink()
{
    var email = "mobiili@fmi.fi";
    
    try {
        var details = "%20("+device.platform+"/"+device.version+"/"+version+")";
    } catch(err) {
        var details = "";
    }
    
    var subject = translate("Mobile%20application%20feedback")+details;

    $("#feedbackLink").attr("href", "mailto:"+email+"?subject="+subject);
}

// Weather based feels like icon

function resolveFeelsLikeIcon(timestep)
{
    if (timestep.WindSpeedMS>=10)
        return "windy.png";
    if (timestep.Temperature>=30)
        return "hot.png";
    if (timestep.Temperature<=-10)
        return "winter.png";
    if (timestep.WeatherSymbol3>=21 && timestep.WeatherSymbol3<=33)
        return "raining.png";
    return "basic.png";
}

// Formats number using correct decimal separator for language

function formatNumber(number)
{
    if (app.language=="en")
        return number;
    else 
        return number.toString().replace(".", ",");
}

// Clears warning notification

function clearWarningsNotification()
{
    $("#numberIndicator").hide();
    
    warnings = getCachedWarnings();
    
    if (warnings) {
        setLocalStorageItem("warnings_viewed", warnings.warnings.updated);
    }
}

// User has changed (tapped) radar app auto start setting

function changeRadarAppAutoStart()
{
    app.radar_app_auto_start = !app.radar_app_auto_start;
    
    if (app.radar_app_auto_start)
        setLocalStorageItem("radar_app_auto_start", "true");
    else
        setLocalStorageItem("radar_app_auto_start", "false");        
    
    showRadarAppAutoStart();
}

// Updates radar app auto start setting in UI

function showRadarAppAutoStart() {
    
    if (app.radar_app_auto_start) {
        $("#changeRadarAppAutoStart").removeClass().addClass("settingWrapperSelected");
        $("#radarAppAutoStart").removeClass().addClass("settingNameSelected");
        $("#changeRadarAppAutoStart").find(".star").removeClass("settingStarGray").addClass("settingStar");
    } else {
        $("#changeRadarAppAutoStart").removeClass().addClass("settingWrapper");
        $("#radarAppAutoStart").removeClass().addClass("settingName");
        $("#changeRadarAppAutoStart").find(".star").removeClass("settingStar").addClass("settingStarGray");
    }
    
}

// Starts radar application automatically if settings allow

function checkRadarAppAutoStart()
{
    var url = getLocalStorageItem("radarapp");

    if (url!=="false" && url!==false && url!=null && app.radar_app_auto_start)
        startRadarApplication();
}

//Updates positioning setting in UI

function showPositioningSetting() 
{   
    if (app.use_positioning) {
        $("#changePositioningSetting").removeClass().addClass("settingWrapperSelected");
        $("#usePositioning").removeClass("settingName").addClass("settingNameSelected");
        $("#changePositioningSetting").find(".star").removeClass("settingStarGray").addClass("settingStar");
    } else {
        $("#changePositioningSetting").removeClass().addClass("settingWrapper");
        $("#usePositioning").removeClass("settingNameSelected").addClass("settingName");
        $("#changePositioningSetting").find(".star").removeClass("settingStar").addClass("settingStarGray");
    }
    
}

//User has changed (tapped) radar app auto start setting

function changePositioningSetting()
{
    app.use_positioning = !app.use_positioning;
    
    if (app.use_positioning)
        setLocalStorageItem("use_positioning", "true");
    else
        setLocalStorageItem("use_positioning", "false");        
    
    showPositioningSetting();
	saveSettingsToFile();

    // Update forecasts with or without positioning
    locateUser();
}

// Resolves weather code text

function resolveWawaCode(code)
{
	if (code==0 || (code>=20 && code<=29))
		return translate("clear");
	if (code==4 || code==5)
		return translate("haze, smoke or dust");
	if (code==10)
		return translate("mist");
	if (code>=30 && code<=34)
		return translate("fog");
	if (code==40)
		return translate("precipitation");	
	if (code>=50 && code<=53)
		return translate("drizzle");
	if (code==60)
		return translate("rain");
	if (code==41)
		return translate("light or moderate precipitation");
	if (code==42)	
		return translate("heavy precipitation");
	if (code>=54 && code<=56)
		return translate("freezing drizzle");
	if (code==61)
		return translate("light rain");
	if (code==62)
		return translate("moderate rain");		
	if (code==63)
		return translate("heavy rain");
	if (code==64)
		return translate("light freezing rain");
	if (code==65)
		return translate("moderate freezing rain");
	if (code==66)
		return translate("heavy freezing rain");
	if (code==67)
		return translate("light sleet");
	if (code==68)
		return translate("moderate sleet");
	if (code==70)
		return translate("snow");
	if (code==71)
		return translate("light snow");
	if (code==72)
		return translate("moderate snow");
	if (code==73)
		return translate("heavy snow");
	if (code==74 || code==75 || code==76)
		return translate("ice pellets");
	if (code==80)
		return translate("showers or intermittent precipitation");
	if (code==81)
		return translate("light rain showers");
	if (code==82)
		return translate("moderate rain showers");
	if (code==83)
		return translate("heavy rain showers");	
	if (code==84)
		return translate("violent rain showers");
	if (code==85)
		return translate("light snow showers");
	if (code==86)
		return translate("moderate snow showers");
	if (code==87)
		return translate("heavy snow showers");
	
	if (dev)
		return code;
	else
		return "";
}

// Checks does timestep contain enough data for display

function isTimestepValid(timestep)
{
	if (isNaN(timestep.Temperature) || isNaN(timestep.WeatherSymbol3) 
		|| isNaN(timestep.WindSpeedMS) || isNaN(timestep.WindDirection) 
		|| isNaN(timestep.Precipitation1h))
		return false;
	else
		return true;
}

// Wrapper function for setting localstorage items

function setLocalStorageItem(name, value) 
{
    if (!!window.localStorage) {
        localStorage.setItem(name, value);
    } else {
        fakestorage[name] = value;
    }
}

// Wrapper function for getting localstorage items

function getLocalStorageItem(name)
{
    if (!!window.localStorage) {
        return localStorage.getItem(name);
    } else {
        if (!isset(fakestorage[name]))
            return null;
        else
            return fakestorage[name];
    }
}

// Tests does browser support enough HTML5 features

function checkCompatibility()
{
    var failures = new Array();
    
    if (!navigator.geolocation)
        failures.push(translate("Positioning"));
    if (!window.localStorage)
        failures.push(translate("Saving favorites and settings"));    
    
    if (failures.length>0) {
        var msg = translate("The service doesn't work correctly, because your browser doesn't support following features")
                    +":\n\n";
        
        $.each(failures, function(i, item) {
            msg += item+"\n";
        });
        
        alert(msg);
    }
    
}

// Calculate some CSS values after orientation change

function onOrientationChange()
{
	calculateMinHeights();

	// Fix bug in some Android devices 
	// Screen size is slow to update after orientation change and swipeview gets broken

	if ($.os.android)
		setTimeout(updateSwipeUi, 500);
	else
		updateShortForecastAndObservations(app.current_slide);
}

// Rounds rain probability to ten percents

function formatRainProbability(prob)
{
	if (prob<10)
		return "<10";
	else if (prob>90)
		return ">90";
	else
		return Math.round(prob/10)*10;
}

// Start Google Analytics tracking

function startTracking()
{
	if (app.analytics) {
        //console.log("start tracking");
        
        if ($.os.android) {
        	analytics.startTrackerWithId('UA-9509467-29',
				function() {
					// Track default page after successful start
        			//console.log("Started Google Analytics tracking");
        			analytics.trackView("weather");
				},
				function() {
					// Start failed, disable analytics
					console.log("Analytics failed to start");
					app.analytics = false;
				}
			);
		}
        
        if ($.os.ios) {
            window.GA.trackerWithTrackingId("UA-9509467-29");
            trackPageView("weather");
        }
        
        
	}
}

// Tracks page view for Google Analytics

function trackPageView(page)
{
	if (app.analytics) {
        //console.log("trackPageView: "+page);

		if ($.os.android)
			analytics.trackView(page, function() {}, function() {
				console.log("trackPageView: "+page+" failed")
			});
        if ($.os.ios)
            window.GA.trackView(page);
	}
}

// Saves settings to JSON file if filesystem is supported

function saveSettingsToFile()
{

	if ($.os.android && window.resolveLocalFileSystemURI) {
		window.resolveLocalFileSystemURL("file:///data/data/fi.fmi.mobileweather", 
											function(dir) {
			dir.getFile('files/settings.json', {create: true}, 
			 				writeFile, handleGetFileError);
			
		}, function(error) {
			//console.log("Changing to dir "+prefix+"data/data/fi.fmi.mobileweather failed");
		});
	} else if (window.requestFileSystem) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			fs.root.getFile('settings.json', {create: true}, 
								writeFile, handleGetFileError);
		}, handleFileSystemError);
	}
}

// Writes settings.json file

function writeFile(fileEntry) {
	fileEntry.createWriter(function(fileWriter) {

		  fileWriter.onwriteend = function(e) {
			//console.log('Write completed.');
		  };

		  fileWriter.onerror = function(e) {
			//console.log('Write failed: ' + e.toString());
		  };

		  var settings = new Object();
		  settings.language = app.language;
		  settings.use_positioning = app.use_positioning;
		  
		  if (app.favorites.length>0)
			settings.geoid = app.favorites[0].id;
		  else
		    settings.geoid = "";

		  var json = JSON.stringify(settings);

		  //console.log("Writing settings: "+json);

		  fileWriter.write(json);
	});
}

// Handles filesystem error

function handleFileSystemError(e)
{
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

	console.log("file system error: "+msg);
}

function handleGetFileError(error)
{
	console.log("getFile failed: " + error.code);
}

// Updates live tile using plugin

function updateLiveTile()
{
	cordova.exec(null, null, "LiveTile", "updateTile", ["input string"]);
}

// Capitalise first letter in string

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Shows forecast loading indicator

function showForecastLoading()
{
    $("#refreshWeather").hide();
    $("#weatherLoading").show();
}

// Hides forecast loading indicator

function hideForecastLoading()
{
    $("#weatherLoading").hide();
    $("#refreshWeather").show();
}

// Manual weather data refresh

function refreshForecast()
{
    if (navigator.connection && navigator.connection.type==Connection.NONE) {
        showAlert(translate("No network connection"),
                    translate("Weather data can't be updated without network connection"));
        return;
    }

    showForecastLoading();
    locateUser();
}

// Manual warning data refresh

function refreshWarnings()
{
    if (navigator.connection && navigator.connection.type==Connection.NONE) {
        showAlert(translate("No network connection"),
                    translate("Weather data can't be updated without network connection"));
        return;
    }

    updateWarnings();
}
