






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
        











/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.v(".")[0],a=a.v(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){I.O&&2.1i(a,b)};d[c][a].K=d.n({1s:c,1u:a},b);d.N[a]=3(b){j g="1p"===1k b,f=L.K.X.W(I,1),i=2;l(g&&"1j"===b.1l(0,1))6 i;2.18(3(){j h=d.1b(2,a);h||(h=d.1b(2,a,k d[c][a](b,2)));g&&(i=h[b].14(h,f))});6 i}};d.a("1J.1G",{u:{1A:"1x",1y:5},1B:3(a,b){6 b?(2.u[a]=b,2.4("9").x(a,b),2):2.u[a]},1i:3(a,b){2.E=b;a=a||{};m.n(2.u,a,{1h:2.w(a.1h)});2.1g();2.1f&&2.1f()},1g:3(){j a=2;2.o={9:k 8.7.1D(a.E,a.u),M:[],p:[],q:[]};8.7.G.1C(a.o.9,"1F",3(){d(a.E).19("1E",a.o.9)});a.C(a.u.1t,a.o.9)},Z:3(a){j b=2.4("12",k 8.7.1z);b.n(2.w(a));2.4("9").1M(b);6 2},1L:3(a){j b=2.4("9").1O();6 b?b.1N(a.Y()):!1},1K:3(a,b){2.4("9").1H[b].J(2.F(a));6 2},1I:3(a,b){a.9=2.4("9");a.13=2.w(a.13);j c=k(a.1n||8.7.1o)(a),e=2.4("M");c.16?e[c.16]=c:e.J(c);c.12&&2.Z(c.Y());2.C(b,a.9,c);6 d(c)},z:3(a){2.B(2.4(a));2.x(a,[]);6 2},B:3(a){y(j b Q a)a.11(b)&&(a[b]r 8.7.17?(8.7.G.1v(a[b]),a[b].A&&a[b].A(t)):a[b]r L&&2.B(a[b]),a[b]=t)},1w:3(a,b,c){a=2.4(a);b.s=d.1m(b.s)?b.s:[b.s];y(j e Q a)l(a.11(e)){j g=!1,f;y(f Q b.s)l(-1<d.1r(b.s[f],a[e][b.1q]))g=!0;10 l(b.V&&"1P"===b.V){g=!1;2c}c(a[e],g)}6 2},4:3(a,b){j c=2.o;l(!c[a]){l(-1<a.2e(">")){y(j e=a.T(/ /g,"").v(">"),d=0;d<e.O;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.O?[]:b;10 6 t;c=c[e[d]]}6 c}b&&!c[a]&&2.x(a,b)}6 c[a]},2g:3(a,b,c){j d=2.4("H",a.2f||k 8.7.2i);d.R(a);d.2h(2.4("9"),2.F(b));2.C(c,d);6 2},2b:3(){t!=2.4("H")&&2.4("H").2a();6 2},x:3(a,b){2.o[a]=b;6 2},2d:3(){j a=2.4("9"),b=a.2o();d(a).1e("2q");a.2p(b);6 2},2k:3(){2.z("M").z("q").z("p").B(2.o);m.2n(2.E,2.1W)},C:3(a){a&&d.1X(a)&&a.14(2,L.K.X.W(I,1))},w:3(a){l(!a)6 k 8.7.P(0,0);l(a r 8.7.P)6 a;a=a.T(/ /g,"").v(",");6 k 8.7.P(a[0],a[1])},F:3(a){6!a?t:a r m?a[0]:a r 1Q?a:d("#"+a)[0]},1S:3(a,b,c){j d=2,g=2.4("q > U",k 8.7.U),f=2.4("q > S",k 8.7.S);b&&f.R(b);g.1U(a,3(a,b){"1T"===b?(f.26(a),f.A(d.4("9"))):f.A(t);c(a,b)})},27:3(a,b){2.4("9").29(2.4("q > 1d",k 8.7.1d(2.F(a),b)))},28:3(a,b){2.4("q > 1a",k 8.7.1a).21(a,b)},20:3(a,b){j c=k 8.7[a](m.n({9:2.4("9")},b));2.4("p > "+a,[]).J(c);6 d(c)},22:3(a,b){(!b?2.4("p > D",k 8.7.D):2.4("p > D",k 8.7.D(b,a))).R(m.n({9:2.4("9")},a))},23:3(a,b,c){2.4("p > "+a,k 8.7.1Y(b,m.n({9:2.4("9")},c)))}});m.N.n({1e:3(a){8.7.G.19(2[0],a);6 2},15:3(a,b,c){8.7&&2[0]r 8.7.17?8.7.G.24(2[0],a,b):c?2.1c(a,b,c):2.1c(a,b);6 2}});m.18("25 1R 1Z 1V 2m 2l 2j".v(" "),3(a,b){m.N[b]=3(a,d){6 2.15(b,a,d)}})})(m);',62,151,'||this|function|get||return|maps|google|map||||||||||var|new|if|jQuery|extend|instance|overlays|services|instanceof|value|null|options|split|_latLng|set|for|clear|setMap|_c|_call|FusionTablesLayer|el|_unwrap|event|iw|arguments|push|prototype|Array|markers|fn|length|LatLng|in|setOptions|DirectionsRenderer|replace|DirectionsService|operator|call|slice|getPosition|addBounds|else|hasOwnProperty|bounds|position|apply|addEventListener|id|MVCObject|each|trigger|Geocoder|data|bind|StreetViewPanorama|triggerEvent|_init|_create|center|_setup|_|typeof|substring|isArray|marker|Marker|string|property|inArray|namespace|callback|pluginName|clearInstanceListeners|find|roadmap|zoom|LatLngBounds|mapTypeId|option|addListenerOnce|Map|init|bounds_changed|gmap|controls|addMarker|ui|addControl|inViewport|fitBounds|contains|getBounds|AND|Object|rightclick|displayDirections|OK|route|mouseover|name|isFunction|KmlLayer|dblclick|addShape|geocode|loadFusion|loadKML|addListener|click|setDirections|displayStreetView|search|setStreetView|close|closeInfoWindow|break|refresh|indexOf|infoWindow|openInfoWindow|open|InfoWindow|dragend|destroy|drag|mouseout|removeData|getCenter|setCenter|resize'.split('|'),0,{}))

	var debug = false;
	
	var server = "http://54.217.213.240/";
	var mediaPath = server + "centergrossmedia/";
	
	// DEVICE
	var deviceReady = false;
	var hasLocation = false;
	var jsonLingua;
	var jsonAllLingue;
	
	// USER SETTINGS
	var language = "it";
	var loggedUsername;
	var loggedPassword;
	var loggedNome;
	var loggedCognome;
	var loggedTipo;
	var loggedIdUtente;
	var loggedIdAzienda;
	var logged = false;
	var welcome = true;
	
	// PARAMETRI SEARCH
	var radius = 100; // Si tratta di 100 km, forse sarebbe da abbassare
	var pageSize = 10; // Si potrebbe portare a 10
	var latitude;
	var longitude;
	var searchBy = "distance";
	var query;
	
	// BRAND
	var brandToLoad;
	var gallerieArray = new Array();
	
	// CARRELLO
	var carrelloArray = new Array();
	var mapDisegnata = false;
	
	// MAPPE
	var distanza;
	var zoom = false;
	var latlngUtente;
	var distanzaMassima = 20000;
	var alertSearch = false;
	var alertCarrello = false;
	var googleMapScriptLoaded = false;
	var latCentro = 44.587694;
	var lonCentro = 11.374985;
	
	// WAIT FOR CORDOVA TO LOAD
    document.addEventListener("deviceready", onDeviceReady, false);

    // CORDOVA IS READY
    function onDeviceReady() {
	    console.log("Device ready");
	    deviceReady = true;
	    
	    if(!debug){
			if( device.platform == 'Android'){
				console.log(device.version);
				if (parseFloat(device.version) < 2.4)
				{
					console.log('zoom true');
					zoom = true;
				}
			}
		}
	    				 		    
		if(checkConnection()){
			if(localStorage.getItem('logged'))
				checkLoginSalvato();
				
			if(!googleMapScriptLoaded){
				loadMapScript();
				googleMapScriptLoaded = true;
			}
		}		
    };
    
    // PAGE INIT
    $(document).on('pageinit', function(){
		$.extend($.mobile.zoom, {locked:true,enabled:false});
		
		localizeMe();

		loadImpostazioniSalvate();

		if(window.localStorage.getItem('welcome') == null){
			$.mobile.changePage("#welcome-page", {transition : 'none'});
			window.localStorage.setItem('welcome', 'false');
			console.log("welcome-page");
		}
		
		if(debug){
			console.log('*** DEBUG MODE ***');
			onDeviceReady();
		}
    });
    
	function initializeMapScript() {
		console.log('Script mappe caricato');
	}
	
	function loadMapScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyCv07egU_ZeSN9WDzAaO76ttuz5Y4w7lV8&sensor=false&callback=initializeMapScript";
		//script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize";
		document.body.appendChild(script);
	}
    
    function localizeMe(){
    	console.log("localizeMe()");
	    $.getJSON("resources/js/localization.json", function(json) {
	    
	    	jsonAllLingue = json;
		    
		    renderLocalizeMe();
    	});
    }
    
    function renderLocalizeMe(){
	    console.log("renderLocalizeMe() with locale " + language);
    
		if(language == "it"){
		    jsonLingua = jsonAllLingue.it;
	    }
	    else if (language == "en"){
		    jsonLingua = jsonAllLingue.en;
	    }
	    else if(language == "ru"){
		    jsonLingua = jsonAllLingue.ru;
	    }
	    else {
		    jsonLingua = jsonAllLingue.it;
	    }
	    
	    // FIX TITOLI
	    $('#allfeedstitle').html(jsonLingua.pagina_allfeeds.titolo + '...');
	    $('#myfeedstitle').html(jsonLingua.pagina_myfeeds.titolo + '...');
	    $('#mybrandstitle').html(jsonLingua.pagina_mybrands.titolo);
	    $('#carrellotitle').html(jsonLingua.pagina_carrello.titolo);
	    $('#accounttitle').html(jsonLingua.pagina_account.titolo);
	    $('#logintitle').html(jsonLingua.pagina_login.titolo);
	    $('#searchtitle').html(jsonLingua.pagina_search.titolo);
	    $('#relaxtitle').html(jsonLingua.pagina_relax.titolo);
	    $('#impostazionititle').html(jsonLingua.pagina_impostazioni.titolo);
	    $('#trasportititle').html(jsonLingua.pagina_trasporti.titolo);
	    $('#faqtitle').html(jsonLingua.pagina_faq.titolo);
	    $('#infotitle').html(jsonLingua.pagina_info.titolo);
	    $('#brandtitle').html(jsonLingua.pagina_brand.titolo);
	    
	    // MENU
	    $('a[value="btn-menu"]').html(jsonLingua.pagina_menu.titolo);
	    $('a[value="btn-all-feeds"]').html(jsonLingua.pagina_allfeeds.titolo + '...');
	    $('a[value="btn-my-feeds"]').html(jsonLingua.pagina_myfeeds.titolo + '...');
	    $('a[value="btn-my-brands"]').html(jsonLingua.pagina_mybrands.titolo);
	    $('a[value="btn-carrello"]').html(jsonLingua.pagina_carrello.titolo);
	    $('a[value="btn-login"]').html(jsonLingua.pagina_login.titolo);
	    $('a[value="btn-account"]').html(jsonLingua.pagina_account.titolo);
	    $('a[value="btn-search"]').html(jsonLingua.pagina_search.titolo);
	    $('a[value="btn-relax"]').html(jsonLingua.pagina_relax.titolo);
	    $('a[value="btn-impostazioni"]').html(jsonLingua.pagina_impostazioni.titolo);
	    $('a[value="btn-faq"]').html(jsonLingua.pagina_faq.titolo);
	    $('a[value="btn-trasporti"]').html(jsonLingua.pagina_trasporti.titolo);
	    $('a[value="btn-info"]').html(jsonLingua.pagina_info.titolo);
	    
	    // SEARCH
	    $('#search-by-abc').html(jsonLingua.pagina_search.search_by_abc);
	    $('#search-by-distanza').html(jsonLingua.pagina_search.search_by_distanza);
	    $('#search-by-attivita').html(jsonLingua.pagina_search.search_by_attivita);
	    $('#brand-search-text').attr("placeholder", jsonLingua.pagina_search.cerca_aziende);
	    
	    // BRAND
	    $('#contatti-label').html(jsonLingua.pagina_brand.contatti);
	    
	    // LOGIN
	    $('#testo-login').html(jsonLingua.pagina_login.testo);
	    $('#testo-registrati').html(jsonLingua.pagina_login.registrati);
	    
	    // ACCOUNT
	    $('#testo-account').html(jsonLingua.pagina_account.testo);
	    $('#btn-save-options-account').buttonMarkup( "refresh" );
	    $('#testo-btn-salva-account').html(jsonLingua.pagina_impostazioni.salva);
	    
	    // SETTINGS
	    $('#label-lingua').html(jsonLingua.pagina_impostazioni.lingua);
	    $('#testo-btn-salva').html(jsonLingua.pagina_impostazioni.salva);
	    $('#btn-save-options').buttonMarkup( "refresh" );
	    
	    // FIX NO CONNECTION BANNER
	    $('#no-connection-1').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-2').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-3').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-4').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-5').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-6').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-7').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-8').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-9').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-10').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-11').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-12').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-13').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-14').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);    
	    $('#no-connection-15').html('<i class="icon-warning-sign"></i> ' + jsonLingua.varie.no_connessione);      
    }
    
    /*****************************/
    /* EVENTI CARICAMENTO PAGINA */
    /*****************************/
    // ALL FEEDS PAGE
	$( "#all-feeds-page" ).on( "pagebeforeshow", function( event ) {
		console.log("all-feeds-page");
/*
		if(checkConnection()){	
			getAllFeeds();
		}
*/
		getAllFeeds();
	});
	
	// MY FEEDS PAGE
	$( "#my-feeds-page" ).on( "pagebeforeshow", function( event ) {
		console.log("my-feeds-page");
		if(checkConnection()){
			if(!logged){
				$.mobile.changePage("#login-page", {transition : 'none'});
			}
			else{
				getMyFeeds();	
			}
		}
	});
		
	// MY BRANDS PAGE
	$( "#my-brands-page" ).on( "pagebeforeshow", function( event ) {
		console.log("my-brands-page");
		if(checkConnection()){	
			if(!logged){
				$.mobile.changePage("#login-page", {transition : 'none'});
			}
			else{
				getMyBrands();	
			}
		}
	});
	
	// CARRELLO PAGE
	$( "#carrello-page" ).on( "pagebeforeshow", function( event ) {
		console.log("carrello-page");
		if(checkConnection()){	
			if(!logged){
				$.mobile.changePage("#login-page", {transition : 'none'});
			}
			else{
				getLocation("carrello");
				loadCarrello();
			}
		}
	});	
	
	// CARRELLO PAGE
	$( "#carrello-map-page" ).on( "pagebeforeshow", function( event ) {
		console.log("carrello-map-page");
		if(checkConnection()){	
			if(!logged){
				$.mobile.changePage("#login-page", {transition : 'none'});
			}
			else{
				$('#map_div').gmap('refresh');
			}
		}
	});
			
	// SEARCH PAGE
	$( "#search-page" ).on( "pagebeforeshow", function( event ) {
		console.log("search-page");
		if(checkConnection()){	
			$('#brand-search-text').focus();
					
			getLocation("search");
		}
	});
	
	// LOGIN PAGE
	$( "#login-page" ).on( "pagebeforeshow", function( event ) {
		console.log("login-page");
		if(checkConnection()){	
			if(logged){
				$.mobile.changePage("#account-page", {transition : 'none'});
			}		
		}
	});	
		
	// ACCOUNT PAGE
	$( "#account-page" ).on( "pagebeforeshow", function( event ) { 
		console.log("account-page");
		if(checkConnection()){	
			if(!logged){
				$.mobile.changePage("#login-page", {transition : 'none'});
			}
			else{
				$('#nome-account-page').html(loggedNome + " " + loggedCognome);
				$('#email-account-page').html(loggedUsername);
				if(checkConnection()){	
					readImpostazioniAccount();
				}
			}
		}
	});
	
/*
	// RELAX PAGE
	$( "#relax-page" ).on( "pagebeforeshow", function( event ) { 
		if(checkConnection()){	
			getRelax();
		}
	});
*/
		
	// IMPOSTAZIONI PAGE
	$( "#impostazioni-page" ).on( "pagebeforeshow", function( event ) { 
		console.log("impostazioni-page");
		if(checkConnection()){	
			readImpostazioni();
		}
	});
		
	/* */
	
	/********************/
	/* LISTENER BOTTONI */
	/********************/
	// REFRESH ALL FEEDS
	$("#btn-refresh-all-feeds").on('click', function() {
		if(checkConnection()){
			console.log("Btn refresh All Feeds");
			getAllFeeds();
		}
	});
		
	// GET MORE ALL FEEDS
	$("#more-all-feeds-div").on('click', '#btn-more-all-feeds', function() {
		if(checkConnection()){
			console.log("Btn get More All Feeds");
			getMoreAllFeeds($("#btn-more-all-feeds").attr("value"));
		}
	});	
	
	// GET BRAND FROM ALL FEEDS
	$("#all-feeds-div").on('click', '[id^="btn-brand-all-feeds-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-all-feeds-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});

	// REFRESH MY FEEDS	
	$("#btn-refresh-my-feeds").on('click', function() {	
		if(checkConnection()){
			console.log("Btn refresh My Feeds");
			getMyFeeds();
		}
	});
		
	// GET MORE MY FEEDS
	$("#more-my-feeds-div").on('click', '#btn-more-my-feeds', function() {
		if(checkConnection()){
			console.log("Btn get More My Feeds");
			getMoreMyFeeds($("#btn-more-my-feeds").attr("value"));
		}
	});
	
	// GET BRAND FROM MY FEEDS		
	$("#my-feeds-div").on('click', '[id^="btn-brand-my-feeds-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-my-feeds-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});
		
	// GET BRAND FROM MY BRANDS		
	$("#my-brands-div").on('click', '[id^="btn-brand-my-brands-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-my-brands-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});

	// GET BRAND FROM MY CARRELLO		
	$("#carrello-div").on('click', '[id^="btn-brand-carrello-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-carrello-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});
	
	// GET BRAND FROM MY CARRELLO		
	$('[id^="btn-brand-carrello-"]').on('click', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-carrello-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});
	
	// CLICK MAPPA SCREEN
	$("#mappa-screen").on('click', function() {
		if(checkConnection()){
			drawCarelloMap();
		}
	});
	
	// GET BRAND FROM RELAX		
	$("#relax-div").on('click', '[id^="btn-brand-relax-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-relax-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});
		
	// SAVE OPTIONS
	$("#btn-save-options").on('click', function() {
		if(checkConnection()){
			console.log("Btn Save Options");
			language = $('#lingua-select option:selected').val();
			localStorage.setItem( 'language', language );
			localizeMe();
			toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_impostazioni.impostazioni_salvate);
		}
	});	
	
	$("#btn-save-options-account").on('click', function() {
		if(checkConnection()){
			console.log("Btn Save Options Account");
			language = $('#lingua-select-account option:selected').val();
			localStorage.setItem( 'language', language );
			localizeMe();
			toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_impostazioni.impostazioni_salvate);
		}
	});	
	
	// LOGOUT
	$("#btn-logout").on('click', function() {	
		if(checkConnection()){
			console.log("Btn logout");
			logout(true);
		}
	});
		
	// SUBMIT LOGIN BTN
	$("#btn-submit-login").on('click', function() {
		if(checkConnection()){
			console.log("Btn sumbit login");
			
			if(checkLoginFields()){
				login($('#login-username-text').val(), $('#login-password-text').val());
			}
		}
	});
	
	// SUBMIT LOGIN TASTIERA
	$("#login-form").submit(function(event) {
		console.log("Keyboard sumbit login");		
		event.preventDefault();

		if(checkConnection()){
			if(checkLoginFields()){
				login($('#login-username-text').val(), $('#login-password-text').val());
			}
		}
				
		return false;
	});
	
	// OPEN CENTERGROSS
	$("#btn-open-centergross-login, #btn-open-centergross-account").on('click', function() {
		if(checkConnection()){
			console.log("Btn Open Centergross");
			window.open(server, "_blank");
		}
	});
		
	// GET MORE SEARCH RESULT
	$("#more-search-result-div").on('click', '#btn-more-search-result', function() {
		if(checkConnection()){
			console.log("Btn get more search result");
			
			url = $("#btn-more-search-result").attr("value");
			url = url.replace("centergross/", "");
			
			if(searchBy == "abc"){
				moreSearchByAbc(url);
			}
			else if(searchBy == "activity"){
				moreSearchByActivity(url);
			}
			else if(searchBy == "distance"){
				moreSearchByDistance(url);
			}
			else{
				moreSearchByDistance(url);
			}
		}
	});
	
	// SEARCH BY ABC
	$("#search-by-abc").on('click', function() {
		if(checkConnection()){
			console.log("Btn search-by-abc");
			
			searchBy = "abc";
			query = $('#brand-search-text').val();
			
			$("#search-by-abc").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li'
			});
			$("#search-by-distanza").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
			});
			$("#search-by-attivita").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
			});
			
			if(query != null && query != ""){	
				searchByAbc(query);
			}
		}
	});	
	
	// SEARCH BY DISTANCE
	$("#search-by-distanza").on('click', function() {
		if(checkConnection()){
			console.log("Btn search-by-distanza");
			if(latitude != '' && latitude != 'undefined' && longitude != '' && longitude !='undefined'){			
				searchBy = "distance";
				query = $('#brand-search-text').val();
				
				$("#search-by-distanza").attr({
				  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li'
				});
				$("#search-by-abc").attr({
				  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
				});
				$("#search-by-attivita").attr({
				  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
				});
				
				if(query != null && query != ""){	
					searchByDistance(query);
				}
			}
			else{
				console.log(jsonLingua.pagina_search.alert_gps);
				showAlert(jsonLingua.pagina_search.alert_gps);
			}
		}
	});

	// SEARCH BY ACTIVITY
	$("#search-by-attivita").on('click', function() {	
		if(checkConnection()){
			console.log("Btn search-by-attivita");
			
			searchBy = "activity";
			query = $('#brand-search-text').val();
			
			$("#search-by-attivita").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li'
			});
			$("#search-by-distanza").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
			});
			$("#search-by-abc").attr({
			  class: 'ui-bar ui-bar-g btn-search-menu Steagal-Li light-grey'
			});
			
			if(query != null && query != ""){	
				searchByActivity(query);
			}
		}
	});		
	
	// GET BRAND FROM SEARCH RESULT
	$("#search-result-div").on('click', '[id^="btn-brand-search-"]', function() {
		if(checkConnection()){
			brandToLoad = $(this).attr('id').replace('btn-brand-search-', '');
			console.log("Btn brand id " + brandToLoad);
			loadBrandPage();
		}
	});
	/* */
	
	/*****************/
	/* METODI SEARCH */
	/*****************/
	$("#brand-search-form").submit(function(event) {
		event.preventDefault();
		
		if(checkConnection()){
			console.log("Sumbit search form");
			
			hideKeyboard();
			
			query = $('#brand-search-text').val();
			
			if(searchBy == "abc"){
				searchByAbc(query);
			}
			else if(searchBy == "activity"){
				searchByActivity(query);
			}
			else if(searchBy == "distance"){
				searchByDistance(query);
			}
			else{
				searchByDistance(query);
			}
		}
		
		return false;
	});
	
	function searchByAbc(query){
		console.log("searchByAbc()");
		console.log("searchByAbc with query " + query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    
		searchRequestData = {
			query : query
		};
		
		url = server + 'api/search/'+language+'?page=0&pageSize='+pageSize;
		request = $.ajax({
	    	type : 'POST',
	    	dataType : "json",
    		contentType : 'application/json',
	        data : JSON.stringify(searchRequestData),
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, false);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}	
	
	function moreSearchByAbc(url){
		console.log("moreSearchByAbc()");
		console.log("moreSearchByAbc with url " + url + " and query " + query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    
		searchRequestData = {
			query : query
		};
		
		request = $.ajax({
	    	type : 'POST',
	    	dataType : "json",
    		contentType : 'application/json',
	        data : JSON.stringify(searchRequestData),
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, true);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
	
	function searchByDistance(query){
		console.log("searchByDistance()");
		console.log("searchByDistance with query " + query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    
	    if(latitude == undefined){
		    latitude = latCentro;
		    longitude = lonCentro;
	    }
		
		url = server + 'api/search/'+language+'/latitude/'+latitude+'/langitude/'+longitude+'/radius/'+radius+'?page=0&pageSize='+pageSize;
		request = $.ajax({
	    	type : 'POST',
	    	contentType: "text/xml;charset=utf-8",
	        data : query,
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, false);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
		
	function moreSearchByDistance(url){
		console.log("moreSearchByDistance()");
		console.log("moreSearchByDistance with url " + url + " and query " + query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
		
		request = $.ajax({
	    	type : 'POST',
	    	contentType: "text/xml;charset=utf-8",
	        data : query,
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, true);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
			
	function searchByActivity(query){
		console.log("searchByActivity()");
		console.log("searchByActivity with query " +  query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    		
		url = server + 'api/search/'+language+'/activity?page=0&pageSize='+pageSize;
		
		console.log(url);
		
		request = $.ajax({
	    	type : 'POST',
	    	contentType: "text/xml;charset=utf-8",
	        data : query,
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, false);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
				
	function moreSearchByActivity(url){
		console.log("moreSearchByActivity()");
		console.log("moreSearchByActivity with url " +  url + " and query " + query);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
		
		request = $.ajax({
	    	type : 'POST',
	    	contentType: "text/xml;charset=utf-8",
	        data : query,
	        url : url,
	        cache: false
	    });
	    
	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderSearchResults(jsonResponse, true);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
	
	function renderSearchResults(searchResult, appendi){
		console.log("renderSearchResults()");
		console.log("renderSearchResults with url "+ searchResult.nextUrl);
		
		searchResultDiv = $("#search-result-div");
		
		if(!appendi){
			searchResultDiv.empty();
		}

		out ='';

		if(searchResult.brands.length > 0){
			$.each(searchResult.brands, function(i, brand) {
	
				out+='<table id="btn-brand-search-'+brand.id+'" class="ui-responsive" width="100%" style="border-spacing: 0 !important; margin-bottom: 10px;">';
			    out+='<tr>';
			    if(brand.imageUrl != null && brand.imageUrl != ""){
				    out+='<td width="20%" rowspan="4" valign="top"><img src="'+mediaPath+brand.imageUrl+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';			    
			    }
			    else{
				    out+='<td width="20%" rowspan="4" valign="top"><img src="resources/img/brand-default.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
			    }
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;">';
				out+='<span class="search-brand-name AvenirLT-Medium dark-gray">'+brand.name+'</span>';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;">';
				out+='<span class="search-text AvenirLT-Light dark-gray">by '+brand.aziendaOperatoreName+'</span><br />';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;" valign="bottom">';
			    if(searchBy == "distance"){
			    	if(hasLocation)
						out+='<span class="feeds-date AvenirLT-Light light-grey">'+parseFloat(brand.distanceFromUser).toFixed(0)+ ' ' + jsonLingua.pagina_search.metri +'</span>';
					else
						out+='<span class="feeds-date AvenirLT-Light light-grey">'+parseFloat(brand.distanceFromUser).toFixed(0)+ ' ' + jsonLingua.pagina_search.metri_dal_centro +'</span>';
				}
				else if(searchBy == "activity"){
					out+='<span class="feeds-date AvenirLT-Light light-grey">'+brand.followerCount+' ' + jsonLingua.pagina_brand.followers + '</span>';
				}
				else{
					out+='<span class="feeds-date AvenirLT-Light light-grey">&nbsp;</span>';
				}
				out+='</td>';
				out+='</tr>';	    
				out+='</table>';
		    });
		}else{
			out+='<h3 class="dark-gray Steagal-Re">'+jsonLingua.pagina_search.no_risultati+'</h3>';
		}
	    
		searchResultDiv.append(out);
		$.mobile.loading( "hide" );
		
		moreSearchResultDiv = $('#more-search-result-div');		
		moreSearchResultDiv.empty();
		
		if(searchResult.nextUrl != null && searchResult.nextUrl != ""){
			outBtn='<a id="btn-more-search-result" data-role="button" data-mini="true" value="'+searchResult.nextUrl+'">Altro</a>';
			moreSearchResultDiv.append(outBtn);
			
			$("#btn-more-search-result").buttonMarkup( "refresh" );
		}
	}
	
	/****************/
	/* METODI BRAND */
	/****************/		
	function loadBrandPage(){
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    
		url = server + 'api/brand/'+brandToLoad+'/'+language;
		
		var request;
		if(logged == true){ 
			request = $.ajax({
		    	type : "GET",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: url,
		        cache: false,
			    xhrFields: {
			        withCredentials: true
			    },
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
			    }
	    	});
    	}
    	else { 
			request = $.ajax({
		    	type : "GET",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: url,
		        cache: false
	    	});
    	}
	
	    request.done(function(brand) {
		    console.log(url + " ok");
		    
		    if (brand.imageUrl) {
		    	imageSrc = mediaPath+brand.imageUrl+'-thumbnail.jpg';
		    }
		    else {
				if (brand.settore.indexOf('Fashion') !== -1 ) {
			    	imageSrc = 'resources/img/operatoremoda@2x.jpg';
		    	} else if (brand.settore.indexOf('Commercio') !== -1 ) {
			    	imageSrc = 'resources/img/operatoretecnico@2x.jpg';
		    	} else if (brand.settore.indexOf('Servizi') !== -1 ) {
			    	imageSrc = 'resources/img/operatoreservizi@2x.jpg';
		    	}
		    } 

		    $('#brand_avatar').attr('src', imageSrc);
		    		    
		    $('#brand-name-span').html(brand.name);
		    
	    	if (""!=brand.aziendaOperatoreName)
	    		$('#operatore-name-span').html('by ' + brand.aziendaOperatoreName);
	    	else
		    	$('#operatore-name-span').html('');
		    
	    	if (""!=brand.longDescription)
	    		$('#descrizione-span').html(brand.longDescription);		    
		    
		    console.log("numero follower " + brand.followerCount);
		    
		    if(Number(brand.followerCount)>0)
			    $('#follower-number-span').text(jsonLingua.pagina_brand.followers + " " + brand.followerCount);
			else
				$('#follower-number-span').text('');
		    
		    if (brand.tel!='' && brand.tel!='0'){
			    $('#brand-tel-span').html('<a href="tel:'+ brand.tel+'"><i class="icon-phone icon-2x"></i><br/><span style="text-decoration: underline !important">'+brand.tel+'</span></a>');
		    }
	    	else{
		    	$('#brand-tel-span').html('<i class="icon-phone icon-2x"></i><br/>-');
	    	}     		

	       	if ( "" != brand.email ){
		       	$('#brand-email-span').html('<a href="mailto:'+ brand.email +'"><i class="icon-envelope icon-2x"></i><br/><span style="text-decoration: underline !important">Email</span></a>');
	       	}
	    	else{
		    	$('#brand-email-span').html('<i class="icon-envelope icon-2x"></i><br/>-');
	    	} 

	    	if (brand.blocco!=''){
	    	
		    	popupBlocco ='';
		    	popupBlocco+='<p><strong>Blocco '+brand.blocco+'</strong></p>';
		    	if(brand.indirizzoBlocco != null){
					popupBlocco+='<p>'+brand.indirizzoBlocco.via+'</p>';			    	
					popupBlocco+='<p>'+brand.indirizzoBlocco.cap+', ' + brand.indirizzoBlocco.localita+ ' (BO)</p>';			    	
					popupBlocco+='<p>'+brand.indirizzoBlocco.paese+'</p>';			    	
		    	}
				
				$('#popup-blocco').html(popupBlocco);
				
				$('#brand-blocco-span').html('<a href="#popup-blocco" data-rel="popup" data-position-to="window"><i class="icon-map-marker icon-2x"></i><br/><span style="text-decoration: underline !important">Blocco '+brand.blocco+'</span></a>');
	    	}
	    	else{
		    	$('#brand-blocco-span').html('<i class="icon-map-marker icon-2x"></i><br/><a href="">-</a>');
		    	$('#popup-blocco').empty();
	    	}

	    	if(brand.inTrip == true){
	    		$('#btn-brand-cart').html('<i class="icon-ok"></i>' + jsonLingua.pagina_brand.in_carrello);
	    		$('#btn-brand-cart').attr('cart', "false");
	    	}
	    	else{
	    		$('#btn-brand-cart').html(jsonLingua.pagina_brand.fuori_carrello);
	    		$('#btn-brand-cart').attr('cart', "true");		    	
	    	}	    	
	    	
	    	console.log("sto seguendo " + brand.following);
	    	if(brand.following == true){
		    	$('#btn-brand-follow').html('<i class="icon-ok"></i>' + jsonLingua.pagina_brand.follow);
		    	$('#btn-brand-follow').attr('follow', "false");
	    	}
	    	else{
		    	$('#btn-brand-follow').html(jsonLingua.pagina_brand.unfollow);
		    	$('#btn-brand-follow').attr('follow', "true"); 	
	    	}
	    			    	
	    	loadBrandGalleries();
	    	
	    	$.mobile.loading( "hide" );
		    $.mobile.changePage("#brand-page", {transition : 'slide'});
		});
		
	    request.fail(function(jqXHR, textStatus) {
		    $.mobile.loading( "hide" );
	    	console.log(jqXHR);
	    });
	}
	
	// NON UTILIZZATO
	function checkFollow() {
		console.log("checkFollow()");
	
		url = server + 'api/follow/'+loggedIdAzienda+'/'+brandToLoad;
		var request = $.ajax({
	    	type : "GET",
    		dataType : "json",
    		contentType : 'application/json',
    		url: url,
	        cache: false
    	});
    	
	    request.done(function(response) {
	    	buyerAlreadyFollows = true;
	    	$('#btn-brand-follow').html('<i class="icon-ok"></i>' + jsonLingua.pagina_brand.follow);
	    	$('#btn-brand-follow').attr('follow', "false");
	    });
	    
	    request.fail(function(jqXHR, textStatus) {
	    	buyerAlreadyFollows = false;
	    	$('#btn-brand-follow').html(jsonLingua.pagina_brand.unfollow);
	    	$('#btn-brand-follow').attr('follow', "true");
	    });
	};

	$('#btn-brand-follow').on('click', function() {
		console.log("btn-brand-follow");
		if(!logged){
			$.mobile.changePage("#login-page", {transition : 'none'});
		}
		else{
			followMethod();
		}
	});
	
	function followMethod(){
		follow = $('#btn-brand-follow').attr('follow');

		if(follow == "true"){
			console.log("chiamato follow");
			FollowBrand = server + 'api/follow/'+loggedIdAzienda+'/'+brandToLoad;
			var request = $.ajax({
		    	type : "PUT",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: FollowBrand,
	    		cache: false,
			    xhrFields: {
			        withCredentials: true
			    },
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
			    }
	    	});
		    request.done(function(response) {
		    	$('#btn-brand-follow').html('<i class="icon-ok"></i>'+ jsonLingua.pagina_brand.follow);
		    	$('#btn-brand-follow').attr('follow', "false");
		    	toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_brand.follow_toast);
		    });
		    request.fail(function(jqXHR, textStatus) {
		    	console.log(jqXHR);
		    });
	    }
	    else{
		    console.log("chiamato unfollow");
		    UnfollowBrand = server + 'api/unfollow/'+loggedIdAzienda+'/'+brandToLoad;
			var request = $.ajax({
		    	type : "PUT",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: UnfollowBrand,
	    		cache: false,
			    xhrFields: {
			        withCredentials: true
			    },
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
			    }
	    	});
		    request.done(function(response) {
			    $('#btn-brand-follow').html(jsonLingua.pagina_brand.unfollow);
		    	$('#btn-brand-follow').attr('follow', "true");
		    	toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_brand.unfollow_toast);
		    });
		    request.fail(function(jqXHR, textStatus) {
			    console.log(jqXHR);
		    });
	    }
	    
	    setTimeout(function(){updateFollowersCount();}, 1000);
	}
	
	function updateFollowersCount() {
		console.log("updateFollowersCount()");
		url = server + 'api/followers/'+brandToLoad;
		var request = $.ajax({
	    	type : "GET",
    		dataType : "json",
    		contentType : 'application/json',
    		url: url,
	        cache: false
    	});
	    request.done(function(response) {
		    console.log(url + ' ok');
		    console.log(JSON.stringify(response));
		    console.log('Lunghezza risposta: ' + response.length);
	  	    $('#follower-number-span').text("Follower " + response.length);
	    });
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(jqXHR);
	    });
	};
	
	$('#btn-brand-cart').on('click', function() {
		if(!logged){
			$.mobile.changePage("#login-page", {transition : 'none'});
		}
		else{
			cartMethod();
		}
	});
	
	function cartMethod(){
		cart = $('#btn-brand-cart').attr('cart');
		
		if(cart == "true"){
			console.log("add to cart");
			url = server + 'api/planYourTrip/'+loggedIdUtente+'/add/'+brandToLoad;
			var request = $.ajax({
		    	type : "PUT",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: url,
	    		cache: false,
			    xhrFields: {
			        withCredentials: true
			    },
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
			    }
	    	});
		    request.done(function(response) {
			    $('#btn-brand-cart').html('<i class="icon-ok"></i>'+ jsonLingua.pagina_brand.in_carrello);
		    	$('#btn-brand-cart').attr('cart', "false");
		    	toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_brand.in_carrello_toast);
		    });
		    request.fail(function(jqXHR, textStatus) {
		    	console.log(textStatus);
		    });
	    }
		else {
			console.log("remove to cart");
			url = server + 'api/planYourTrip/'+loggedIdUtente+'/remove/'+brandToLoad;
			var request = $.ajax({
		    	type : "DELETE",
	    		dataType : "json",
	    		contentType : 'application/json',
	    		url: url,
	    		cache: false,
			    xhrFields: {
			        withCredentials: true
			    },
			    beforeSend: function(xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
			    }
	    	});
		
		    request.done(function(response) {
			    $('#btn-brand-cart').html(jsonLingua.pagina_brand.fuori_carrello);
		    	$('#btn-brand-cart').attr('cart', "true");
		    	toast('<i class="icon-ok"></i> ' + jsonLingua.pagina_brand.fuori_carrello_toast);
		    });
		    request.fail(function(jqXHR, textStatus) {
		    	console.log(textStatus);
		    });
	    }
	}
	
	function loadBrandGalleries() {
	
		gallerieArray = [];
	
		url = server + 'api/brand/'+brandToLoad+'/galleries';
		
		var request = $.ajax({
	    	type : "GET",
    		dataType : "json",
    		contentType : 'application/json',
    		url: url,
	        cache: false
    	});
	
	    request.done(function(galleries) {
	    
	    	gallery_space_div = $('#gallery-space-div');
			gallery_space_div.css("display","none");
					
			gallery_lookbook_div = $('#gallery-lookbook-div');
			gallery_lookbook_div.css("display","none");
					
		    gallery_generiche_div = $('#gallery-generiche-div');
		    gallery_generiche_div.empty();
			
			counter = 0;
			
			$.each( galleries, function( i, gallery ) {
				
				if (gallery.nome === 'Lookbook') {
					if(gallery.immagine.length > 0 ){
						gallerieArray.push(gallery);
						
						gallery_lookbook_div.css("display","block");

						src = mediaPath+gallery.immagine[0].nomeFile+'-thumbnail.jpg';
						
						$('#gallery-lookbook-first-thumb-img').attr("src", src);
						$('#href-gallery-lookbook').attr("value", counter);
						
						counter++;
					}					
					
				} 
				else if (gallery.nome === 'Space') {
					if(gallery.immagine.length > 0 ){
						gallerieArray.push(gallery);
						gallery_space_div.css("display","block");
						
						src = mediaPath+gallery.immagine[0].nomeFile+'-thumbnail.jpg';
						
						$('#gallery-space-first-thumb-img').attr("src", src);
						$('#href-space-lookbook').attr("value", counter);
						
						counter++;
					}

				} else { 
					if(gallery.immagine.length > 0 ){
						gallerieArray.push(gallery);
						out = '';
						src = mediaPath+gallery.immagine[0].nomeFile+'-thumbnail.jpg';

						out+='<div>';
						out+='<div class="brand-banner amaranth-background">';
						out+='<span class="btn-search-menu Steagal-Bo">'+gallery.nome+'</span>';
						out+='</div>';
						out+='<a href="#" id="#href-gallery-'+gallery.id+'" value="'+counter+'"><img src="'+src+'" width="100%"/></a>';
						out+='</div>';
		
						counter++;
						
						gallery_generiche_div.append(out);
					}
				}		
			});	
	    });
	    
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(jqXHR);
	    });
	};
	
	$("#galleries-container").on('click', 'a', function() {
		
		galleryToLoad = gallerieArray[$(this).attr('value')];
		console.log("gallery id " + galleryToLoad.id);
		
		console.log(galleryToLoad.nome);
		$('#title-gallery-page').html(galleryToLoad.nome);

		container_gallery_page = $('#container-gallery-page');
		container_gallery_page.empty();
		
		out='';
		$.each( galleryToLoad.immagine, function( i, photo ) {
			srcThumb = mediaPath+photo.nomeFile+'-thumbnail.jpg';
			src = mediaPath+photo.nomeFile+'.jpg';
			console.log(src);
						
			out+='<div>';
			out+='<a href="'+src+'" rel="external"><img src="'+srcThumb+'" alt="'+photo.descrizione+'" /></a>';
			out+='</div>';	
		});
		
		container_gallery_page.append(out);
		
		$.mobile.changePage("#gallery-page", {transition : 'slide'});
		
		$("#container-gallery-page a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false, preventSlideshow: true });
	});
	
	/********************/
	/* METOTI ALL FEEDS */
	/********************/
	function getAllFeeds(){
		console.log("getAllFeeds()");
	
	    $.mobile.loading( "show", {
	            textVisible: false,
	            textonly: false
	    });
		
		url = server + 'api/brand/status?page=1&pageSize='+pageSize+'&language='+language;
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderAllFeeds(jsonResponse, false);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
	
	function getMoreAllFeeds(url){
		console.log("getMoreAllFeeds()");
	
	    $.mobile.loading( "show", {
	            textVisible: false,
	            textonly: false
	    });
		
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderAllFeeds(jsonResponse, true);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}


	function replaceURLWithHTMLLinks(text) {
	    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    return text.replace(exp,"<a href='#' onClick='openWindow(\"$1\");'>link</a>"); 
	}
	
	function openWindow(url) {
		if(checkConnection()){
			console.log("Btn Open Link");
			window.open(url, "_blank");
		}
	}

	function renderAllFeeds(allFeeds, appendi) {
		console.log("renderAllFeeds()");
		console.log("next url " + allFeeds.nextUrl);
		console.log("loadAllFeeds with " + allFeeds.status.length + " feeds");

		allFeedsDiv = $("#all-feeds-div");
		
		if(!appendi){
			allFeedsDiv.empty();
		}

		out ='';
		
		if(allFeeds.status.length > 0){
		    $.each(allFeeds.status, function(i, feed) {
			    out+='<table class="ui-responsive" width="100%" style="margin-bottom: 10px;">';
							    	
		    	// fix formato data
		    	if(feed.data != null){
				    feed.data = feed.data.replace('-','/');
				    feed.data = feed.data.replace('-','/');
			    }

			    out+='<tr>';
			    // default brand logo
			    if(feed.brandLogo != null && feed.brandLogo!="")
					out+='<td width="30%" rowspan="4" valign="top" id="btn-brand-all-feeds-'+feed.brandId+'"><img src="'+mediaPath+feed.brandLogo+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				else
					out+='<td width="30%" rowspan="4" valign="top" id="btn-brand-all-feeds-'+feed.brandId+'"><img src="resources/img/brand-default.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;" valign="top">';
				out+='<span class="feeds-brand-name AvenirLT-Medium dark-gray">'+feed.nomeBrand+'</span>';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;word-wrap: break-word;">';
				out+='<span class="feeds-text AvenirLT-Light dark-gray">"'+replaceURLWithHTMLLinks(feed.testo)+'"</span><br />';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td valign="bottom" align="right">';
				out+='<span class="feeds-date AvenirLT-Light">'+feed.data+'</span>';
				out+='</td>';
				out+='</tr>';
				out+='</table>';
			});
		} else {
			out+='<h3 class="dark-gray Steagal-Re">'+jsonLingua.pagina_allfeeds.no_feeds+'</h3>';	
		}
			
		allFeedsDiv.append(out);
		
		$.mobile.loading( "hide" );
				
		moreAllFeedsDiv = $('#more-all-feeds-div');
		moreAllFeedsDiv.empty();
		
		if(allFeeds.nextUrl != null && allFeeds.nextUrl != ""){
			outBtn='<a id="btn-more-all-feeds" data-role="button" data-mini="true" value="'+allFeeds.nextUrl+'">Altro</a>';
			moreAllFeedsDiv.append(outBtn);
			
			$("#btn-more-all-feeds").buttonMarkup( "refresh" );
		}
	}
	/* */
	
	/*******************/
	/* METODI MY FEEDS */
	/*******************/
	function getMyFeeds(){
		console.log("getMyFeeds()");
	
	    $.mobile.loading( "show", {
	            textVisible: false,
	            textonly: false
	    });

		url = server + 'api/azienda/buyer/followingBrandsStatus?page=1&pageSize='+pageSize+'&aziendaBuyerId='+loggedIdAzienda;
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
		    }
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderMyFeeds(jsonResponse, false);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}
	
	function getMoreMyFeeds(url){
		console.log("getMoreMyFeeds()");
	
	    $.mobile.loading( "show", {
	            textVisible: false,
	            textonly: false
	    });
		
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
		    }
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderMyFeeds(jsonResponse, true);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}

	function renderMyFeeds(allFeeds, appendi) {
		console.log("renderMyFeeds()");
		console.log("next url " + allFeeds.nextUrl);
		console.log("loadMyFeeds with " + allFeeds.objects.length + " feeds");

		allFeedsDiv = $("#my-feeds-div");
		
		if(!appendi){
			allFeedsDiv.empty();
		}

		out ='';
		
		if(allFeeds.objects.length > 0){
		    $.each(allFeeds.objects, function(i, feed) {
			    out+='<table class="ui-responsive" width="100%" style="margin-bottom: 10px;">';
			    
		    	// fix formato data
		    	if(feed.data != null){
				    feed.data = feed.data.replace('-','/');
				    feed.data = feed.data.replace('-','/');
			    }
			    
			    out+='<tr>';
			    // default brand logo
			    if(feed[5] != null && feed[5] !="")
					out+='<td id="btn-brand-my-feeds-'+feed[2]+'" width="30%" rowspan="4" valign="top"><img src="'+mediaPath+feed[5]+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				else
					out+='<td id="btn-brand-my-feeds-'+feed[2]+'" width="30%" rowspan="4" valign="top"><img src="resources/img/brand-default.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;" valign="top">';
				out+='<span class="feeds-brand-name AvenirLT-Medium dark-gray">'+feed[3]+'</span>';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;word-wrap: break-word">';
				out+='<span class="feeds-text AvenirLT-Light dark-gray">"'+replaceURLWithHTMLLinks(feed[0])+'"</span><br />';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td valign="bottom" align="right">';
				out+='<span class="feeds-date AvenirLT-Light">'+timeConverter(feed[1])+'</span>';
				out+='</td>';
				out+='</tr>';
				
				out+='</table>';
			});
		} else {
			out+='<h3 class="dark-gray Steagal-Re">'+jsonLingua.pagina_myfeeds.no_feeds+'</h3>';	
		}
		
		allFeedsDiv.append(out);
		
		$.mobile.loading( "hide" );
				
		moreAllFeedsDiv = $('#more-all-feeds-div');
		moreAllFeedsDiv.empty();
		
		if(allFeeds.nextUrl != null && allFeeds.nextUrl != ""){
			outBtn='<a id="btn-more-all-feeds" data-role="button" data-mini="true" value="'+allFeeds.nextUrl+'">Altro</a>';
			moreAllFeedsDiv.append(outBtn);
			
			$("#btn-more-all-feeds").buttonMarkup( "refresh" );
		}
	}
	/* */	
	
	/********************/
	/* METOTI MY BRANDS */
	/********************/
	function getMyBrands(){
		console.log("getMyBrands()");
	
	    $.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
		
		url = server + '/api/followings/'+loggedIdAzienda+'/'+language;
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
		    }
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderMyBrands(jsonResponse);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}

	function renderMyBrands(brands) {
		console.log("renderMyBrands()");

		my_brands_div = $("#my-brands-div");
		my_brands_div.empty();

		out ='';
		
		if(brands.length > 0){
		    $.each(brands, function(i, brand) {
	
			    out+='<table id="btn-brand-my-brands-'+brand.id+'" class="ui-responsive" width="100%" style="margin-bottom: 10px;">';
			    
			    out+='<tr>';
			    // default brand logo
			    if(brand.imageFileName != null && brand.imageFileName !="")
					out+='<td width="30%" rowspan="4" valign="top"><img src="'+mediaPath+brand.imageFileName+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				else
					out+='<td width="30%" rowspan="4" valign="top"><img src="resources/img/brand-default.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;" valign="top">';
				out+='<span class="feeds-brand-name AvenirLT-Medium dark-gray">'+brand.name+'</span>';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td style="padding-left: 10px;">';
				out+='<span class="feeds-text AvenirLT-Light dark-gray">by "'+brand.nomeAziendaOperatore+'"</span><br />';
				out+='</td>';
				out+='</tr>';
				out+='<tr>';
				out+='<td valign="bottom" align="right">';
				out+='<span class="feeds-date AvenirLT-Light">&nbsp;</span>';
				out+='</td>';
				out+='</tr>';
				
				out+='</table>';
			});
		} else {
			out+='<h3 class="dark-gray Steagal-Re">'+jsonLingua.pagina_mybrands.no_brands+'</h3>';	
		}

		my_brands_div.append(out);
		
		$.mobile.loading( "hide" );
	}
	/* */	
	
	/****************/
	/* METOTI RELAX */
	/****************/
	/*
function getRelax(){
		console.log("getRelax()");
	
	    $.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });

		url = server + 'api/brand/aziendaSettore/servizi/'+language;
		request = $.ajax({
	    	type : 'GET',
	        dataType : 'json',
	        url : url,
	        cache: false
	    });

	    request.done(function(jsonResponse) {
	    	console.log(url + " request ok");
			renderRelax(jsonResponse);
	    });

	    request.fail(function(jqXHR, textStatus) {
	    	console.log(url + " request fail");
	    	$.mobile.loading( "hide" );
	    });
	}

	function renderRelax(brands) {
		console.log("renderRelax()");

		relax_div = $("#relax-div");
		relax_div.empty();

		out ='';
		
	    $.each(brands, function(i, brand) {

		    out+='<table id="btn-brand-relax-'+brand.id+'" class="ui-responsive" width="100%" style="margin-bottom: 10px;">';
		    
		    out+='<tr>';
		    // default brand logo
		    if(brand.imageFileName != null && brand.imageFileName !="")
				out+='<td width="30%" valign="top"><img src="'+mediaPath+brand.imageFileName+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
			else
				out+='<td width="30%" valign="top"><img src="resources/img/operatoreservizi@2x.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
			out+='<td style="padding-left: 10px;" valign="top">';
			out+='<span class="feeds-brand-name AvenirLT-Medium dark-gray">'+brand.name+'</span><br />';
			out+='<span class="feeds-text AvenirLT-Light dark-gray">by "'+brand.aziendaOperatoreName+'"</span><br />';
			out+='<span class="feeds-date AvenirLT-Light">'+brand.description+'</span>';
			out+='</td>';
			out+='</tr>';
			
			out+='</table>';
		});

		relax_div.append(out);
		
		$.mobile.loading( "hide" );
	}
*/
	/* */
		
	/*******************/
	/* METODI CARRELLO */
	/*******************/	
	function loadCarrello(){
		
		carrello_div = $('#carrello-div');
		carrello_div.empty();
		
		carrelloArray = [];
		
		url = server + 'api/planYourTrip/'+loggedIdUtente+'/getBrands/'+language;
		var request = $.ajax({
	    	type : "GET",
    		dataType : "json",
    		contentType : 'application/json',
    		url: url,
	        cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
		    }
    	});
	
	    request.done(function(brands) {
	    
	    	console.log(url + " ok");
		    
		    out = '';
		    
		    if(brands.length > 0){
		    	out = '<br />' +jsonLingua.pagina_carrello.brand_in_carrello + ':<br />';
			    $.each(brands, function(index, brand) {
			    	carrelloArray.push(brand);
			    	
				    out+='<table id="btn-brand-carrello-'+brand.id+'" class="ui-responsive" width="100%" style="padding-bottom: 10px">';
			    
				    out+='<tr>';
				    // default brand logo
				    if(brand.imageUrl != null && brand.imageUrl !="")
						out+='<td width="30%" valign="top"><img src="'+mediaPath+brand.imageUrl+'-thumbnail.jpg" width="100%" style="border: solid 1px #504D4B"></td>';
					else {
						if (brand.settore.indexOf('Fashion') !== -1 ) {
					    	imageSrc = 'resources/img/operatoremoda@2x.jpg';
				    	} else if (brand.settore.indexOf('Commercio') !== -1 ) {
					    	imageSrc = 'resources/img/operatoretecnico@2x.jpg';
				    	} else if (brand.settore.indexOf('Servizi') !== -1 ) {
					    	imageSrc = 'resources/img/operatoreservizi@2x.jpg';
				    	}
				    	out+='<td width="30%" valign="top"><img src="'+imageSrc+'" width="100%" style="border: solid 1px #504D4B"></td>';
			    	} 
					out+='<td style="padding-left: 10px;" valign="top">';
					out+='<span class="feeds-brand-name AvenirLT-Medium dark-gray">'+brand.name+'</span><br />';
					out+='<span class="feeds-text AvenirLT-Light dark-gray">by '+brand.aziendaOperatoreName+'</span><br />';
					out+='<span class="feeds-text AvenirLT-Light dark-gray">'+brand.description+'</span><br />';
					out+='<span class="feeds-text AvenirLT-Light dark-gray"><strong>Blocco '+brand.blocco+'</strong></span>';
					out+='</td>';
					out+='</tr>';
					
					out+='</table>';
				});
			} else {
				out+='<h3 class="dark-gray Steagal-Re">'+jsonLingua.pagina_carrello.no_brands+'</h3>';	
			}
				
			carrello_div.append(out);
	    });
	    
	    request.fail(function(jqXHR, textStatus) {
	    	console.log(textStatus);
	    });    
	}
	
	function calculateDistances(latlngCentro, latlngUtente) {
		var service = new google.maps.DistanceMatrixService();
		
		service.getDistanceMatrix(
		{
			origins: [latlngCentro],
			destinations: [latlngUtente],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		}, 
		callbackCalculateDistances);
	}

	function callbackCalculateDistances(response, status) {
		console.log("callback()");
		if (status != google.maps.DistanceMatrixStatus.OK) {
			//alert('Error was: ' + status);
		} else {
			distanza = response.rows[0].elements[0].distance.value;
		}
	}
    
	function drawCarelloMap(){

		$.mobile.changePage("#carrello-map-page", {transition : 'slide'});
		$('#map_div').css("height", contentHeight()-30);
		
		if(mapDisegnata){
			$('#map_div').gmap('clear', 'markers');
			$('#map_div').gmap('destroy');
			$('#map_div').empty();
		}
		
		44.587694,11.374985
		latlngCentro = new google.maps.LatLng(latCentro, lonCentro);
		
		$('#map_div').gmap({'center': latlngCentro, 'disableDefaultUI': true, 'zoomControl': zoom, 'callback': function() {
			var self = this;
			self.refresh();
		}});
						
		if(latitude != '' && latitude != 'undefined' && longitude != '' && longitude !='undefined' && latitude != 44.587411){
			if(parseInt(distanza) < distanzaMassima){ 

				$('#map_div').gmap('addMarker', { 'position': latlngUtente, 'bounds': true, 'animation': google.maps.Animation.DROP, 'icon': 'resources/img/pinblu.png'}).click(function() {
					$('#map_div').gmap('openInfoWindow', { 'content': 'Tu sei qui' }, this);
				});
			}
		}
		    	
		mapDisegnata = true;
							
		width = $(window).width()/2;
		var lottiArray = Array();	
		$.each(carrelloArray, function(index, brand) {
			if($.inArray(brand.lottoId, lottiArray) == -1){
				lottiArray.push(brand.lottoId);
				
		    	gpsLotto = brand.gpsLotto.replace(' ', '');
		    	console.log("aggiungo marker in " + gpsLotto);
		    	
		    	$('#map_div').gmap('addMarker', { 'position': gpsLotto, 'bounds': true, 'animation': google.maps.Animation.DROP, 'icon': 'resources/img/pinrosso.png'}).click(function() {
	                $('#map_div').gmap('openInfoWindow', { 'content': '<div style="width: '+width+'px !important"><strong>' + brand.name + '</strong><br />' + brand.description + '<br/><strong>Blocco '+ brand.blocco +'</strong></div>' }, this);
		    	});
			}
		});
		
		$('#map_div').gmap('option', 'disableDefaultUI', true);
		$('#map_div').gmap('option', 'zoomControl', zoom);
	}
	/* */
		
	/***********************/
	/* METODI IMPOSTAZIONI */
	/***********************/
	function readImpostazioni(){
		console.log("readImpostazioni()");
		$("#lingua-select").val(language);
	}
	
	function loadImpostazioniSalvate(){
		console.log("loadImpostazioniSalvate()");
		if(window.localStorage.getItem('language') != null && window.localStorage.getItem('language') != ""){
			language = localStorage.getItem('language');
			console.log("Caricata lingua da local storage: " + language);
			$("#lingua-select").val(language);
			$("#lingua-select-account").val(language);
		}
	}	
	
	function readImpostazioniAccount(){
		console.log("readImpostazioniAccount()");
		$("#lingua-select-account").val(language);
	}
	
	function loadImpostazioniSalvateAccount(){
		console.log("loadImpostazioniSalvateAccount()");
		if(window.localStorage.getItem('language') != null && window.localStorage.getItem('language') != ""){
			language = localStorage.getItem('language');
			console.log("Caricata lingua da local storage: " + language);
			$("#lingua-select-account").val(language);
			$("#lingua-select").val(language);
		}
	}
	/* */	
	
	/****************/
	/* METODI LOGIN */	
	/****************/
	function login(username, password){
		console.log("Login()");
		console.log("Login username: " +username + " e password " + password);
		
		$.mobile.loading( "show", {
            textVisible: false,
            textonly: false
	    });
	    
	    $.ajax({
		    url: server + 'api/utente/whoami',
		    method: 'GET',
		    async: true,
		    data: {},
		    dataType: 'json',
		    crossDomain: true,
		    timeout: 5000,
		    cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(username + ":" + password));
		    },
		    success: function(data){
		    	if(data.tipo == 'buyer'){
				    console.log("loggato");
				    
				    loggedUsername = username;
				    loggedPassword = password;
				    loggedNome = data.nome;
				    loggedCognome = data.cognome;
				    loggedTipo = data.tipo;
				    loggedIdUtente = data.idUtente;
				    loggedIdAzienda = data.idAzienda;
				    			    
				    localStorage.setItem('loggedUsername', loggedUsername);
				    localStorage.setItem('loggedPassword', loggedPassword);
				    localStorage.setItem('loggedNome', loggedNome);
				    localStorage.setItem('loggedCognome', loggedCognome);
				    localStorage.setItem('loggedTipo', loggedTipo);
				    localStorage.setItem('loggedIdUtente', loggedIdUtente);
				    localStorage.setItem('loggedIdAzienda', loggedIdAzienda);
				    localStorage.setItem('logged', true);
				    
				    logged = true;
				    $.mobile.loading( "hide" );
				    
				    showHideMenu();
				    
				    $.mobile.changePage("#account-page", {transition : 'slide'});
			    }
			    else{
				    logged = false;
				    $.mobile.loading( "hide" );
				    console.log("utente non di tipo buyer");
				    showAlert(jsonLingua.pagina_login.non_buyer);
			    }
		    },
		    error: function(xhr, status, errThrown) {
		        showAlert(jsonLingua.pagina_login.errore);
		        console.log(jsonLingua.pagina_login.errore);
		        
		        logged = false;
		        $.mobile.loading( "hide" );
		    }
		});
	}
	
	function checkLoginSalvato(){
		console.log("checkLoginSalvato()");
	    
		loggedUsername = localStorage.getItem('loggedUsername');
		loggedPassword = localStorage.getItem('loggedPassword');
		
		console.log("LoginSalvato username: " + loggedUsername + " e password " + loggedPassword);
			    
		$.ajax({
		    url: server + 'api/utente/whoami',
		    method: 'GET',
		    async: true,
		    data: {},
		    dataType: 'json',
		    crossDomain: true,
		    timeout: 5000,
		    cache: false,
		    xhrFields: {
		        withCredentials: true
		    },
		    beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic " + $.base64Encode(loggedUsername + ":" + loggedPassword));
		    },
		    success: function(data){
			    console.log("loggato");
			    
			    loggedUsername = loggedUsername;
			    loggedPassword = loggedPassword;
			    loggedNome = data.nome;
			    loggedCognome = data.cognome;
			    loggedTipo = data.tipo;
			    loggedIdUtente = data.idUtente;
			    loggedIdAzienda = data.idAzienda;
			    			    
			    localStorage.setItem('loggedUsername', loggedUsername);
			    localStorage.setItem('loggedPassword', loggedPassword);
			    localStorage.setItem('loggedNome', loggedNome);
			    localStorage.setItem('loggedCognome', loggedCognome);
			    localStorage.setItem('loggedTipo', loggedTipo);
			    localStorage.setItem('loggedIdUtente', loggedIdUtente);
			    localStorage.setItem('loggedIdAzienda', loggedIdAzienda);
			    localStorage.setItem('logged', true);
			    
			    logged = true;
			    
			    showHideMenu();
		    },
		    error: function(xhr, status, errThrown) {
		        console.log("Errore checkLoginSalvato");
		        
		        logged = false;
		        logout(false);
		    }
		});
	}
	
	function logout(redirect){
		
		loggedUsername = null;
		loggedPassword = null;
		loggedNome = null;
		loggedCognome = null;
		loggedTipo = null;
		loggedIdUtente = null;
		loggedIdAzienda = null;
		logged = false;
		
	    localStorage.setItem('loggedUsername', null);
	    localStorage.setItem('loggedPassword', null);
	    localStorage.setItem('loggedNome', null);
	    localStorage.setItem('loggedCognome', null);
	    localStorage.setItem('loggedTipo', null);
	    localStorage.setItem('loggedIdUtente', null);
	    localStorage.setItem('loggedIdAzienda', null);
	    localStorage.setItem('logged', false);
	    
	    deleteCookie("JSESSIONID");
	    
	    showHideMenu();
	    
	    if(redirect)
			$.mobile.changePage("#login-page", {transition : 'none'});
	}
	
	function checkLoginFields(){
		console.log("checkLoginFields()");
		
		if($('#login-username-text').val() == ""){
			showAlert(jsonLingua.pagina_login.compilare_tutti_campi);
			$('#login-username-text').focus();
			return false;
		}
		else if ($('#login-password-text').val() == ""){
			showAlert(jsonLingua.pagina_login.compilare_tutti_campi);
			$('#login-password-text').focus();
			return false;
		}
		return true;
	}
	
	function showHideMenu(){
    	console.log("showHideMenu() con loggato " + logged);
    
	    if(logged){
		    $('#btn-my-feeds-all-feeds-page').css("display","block");
		    $('#btn-my-brands-all-feeds-page').css("display","block");
		    $('#btn-carrello-all-feeds-page').css("display","block");
		    $('#btn-login-all-feeds-page').css("display","none");
		    $('#btn-account-all-feeds-page').css("display","block");
		    $('#all-feeds-footer').css("display","block");
		    $('#btn-impostazioni-all-feeds-page').css("display","none");
		    
		    $('#btn-my-feeds-search-page').css("display","block");
		    $('#btn-my-brands-search-page').css("display","block");
		    $('#btn-carrello-search-page').css("display","block");
		    $('#btn-login-search-page').css("display","none");
		    $('#btn-account-search-page').css("display","block");
		    $('#btn-impostazioni-search-page').css("display","none");
		    		    
		    $('#btn-my-feeds-impostazioni-page').css("display","block");
		    $('#btn-my-brands-impostazioni-page').css("display","block");
		    $('#btn-carrello-impostazioni-page').css("display","block");
		    $('#btn-login-impostazioni-page').css("display","none");
		    $('#btn-account-impostazioni-page').css("display","block");
		    		    		    
		    $('#btn-my-feeds-relax-page').css("display","block");
		    $('#btn-my-brands-relax-page').css("display","block");
		    $('#btn-carrello-relax-page').css("display","block");
		    $('#btn-login-relax-page').css("display","none");
		    $('#btn-account-relax-page').css("display","block");
		    $('#btn-impostazioni-relax-page').css("display","none");
		    		    		    		    
		    $('#btn-my-feeds-faq-page').css("display","block");
		    $('#btn-my-brands-faq-page').css("display","block");
		    $('#btn-carrello-faq-page').css("display","block");
		    $('#btn-login-faq-page').css("display","none");
		    $('#btn-account-faq-page').css("display","block");
		    $('btn-impostazioni-faq-page').css("display","none");
		    		    		    		    		    
		    $('#btn-my-feeds-trasporti-page').css("display","block");
		    $('#btn-my-brands-trasporti-page').css("display","block");
		    $('#btn-carrello-trasporti-page').css("display","block");
		    $('#btn-login-trasporti-page').css("display","none");
		    $('#btn-account-trasporti-page').css("display","block");
		    $('btn-login-trasporti-page').css("display","none");
		    		    		    		    		    		    
		    $('#btn-my-feeds-info-page').css("display","block");
		    $('#btn-my-brands-info-page').css("display","block");
		    $('#btn-carrello-info-page').css("display","block");
		    $('#btn-login-info-page').css("display","none");
		    $('#btn-account-info-page').css("display","block");
		    $('#btn-impostazioni-info-page').css("display","none");
		    		    		    		    		    		    		    
		    $('#btn-my-feeds-infopoint-page').css("display","block");
		    $('#btn-my-brands-infopoint-page').css("display","block");
		    $('#btn-carrello-infopoint-page').css("display","block");
		    $('#btn-login-infopoint-page').css("display","none");
		    $('#btn-account-infopoint-page').css("display","block");
		    $('#btn-impostazioni-infopoint-page').css("display","none");
		    		    		    		    		    		    		    
		    $('#btn-my-feeds-welcome-page').css("display","block");
		    $('#btn-my-brands-welcome-page').css("display","block");
		    $('#btn-carrello-welcome-page').css("display","block");
		    $('#btn-login-welcome-page').css("display","none");
		    $('#btn-account-welcome-page').css("display","block");
		    $('#btn-impostazioni-welcome-page').css("display","none");
	    }
	    else{
		    $('#btn-my-feeds-all-feeds-page').css("display","none");
		    $('#btn-my-brands-all-feeds-page').css("display","none");
		    $('#btn-carrello-all-feeds-page').css("display","none");
		    $('#btn-login-all-feeds-page').css("display","block");
		    $('#btn-account-all-feeds-page').css("display","none");
		    $('#all-feeds-footer').css("display","none");
		    $('#btn-impostazioni-all-feeds-page').css("display","block");
		    
		    $('#btn-my-feeds-search-page').css("display","none");
		    $('#btn-my-brands-search-page').css("display","none");
		    $('#btn-carrello-search-page').css("display","none");
		    $('#btn-login-search-page').css("display","block");
		    $('#btn-account-search-page').css("display","none");
		    $('#btn-impostazioni-search-page').css("display","block");
		    		    		    
		    $('#btn-my-feeds-impostazioni-page').css("display","none");
		    $('#btn-my-brands-impostazioni-page').css("display","none");
		    $('#btn-carrello-impostazioni-page').css("display","none");
		    $('#btn-login-impostazioni-page').css("display","block");
		    $('#btn-account-impostazioni-page').css("display","none");
		    		    		    		    
		    $('#btn-my-feeds-relax-page').css("display","none");
		    $('#btn-my-brands-relax-page').css("display","none");
		    $('#btn-carrello-relax-page').css("display","none");
		    $('#btn-login-relax-page').css("display","block");
		    $('#btn-account-relax-page').css("display","none");
		    $('#btn-impostazioni-relax-page').css("display","none");
		    		    		    		    		    
		    $('#btn-my-feeds-faq-page').css("display","none");
		    $('#btn-my-brands-faq-page').css("display","none");
		    $('#btn-carrello-faq-page').css("display","none");
		    $('#btn-login-faq-page').css("display","block");
		    $('#btn-account-faq-page').css("display","none");
		    $('btn-impostazioni-faq-page').css("display","block");
		    		    		    		    		    		    
		    $('#btn-my-feeds-trasporti-page').css("display","none");
		    $('#btn-my-brands-trasporti-page').css("display","none");
		    $('#btn-carrello-trasporti-page').css("display","none");
		    $('#btn-login-trasporti-page').css("display","block");
		    $('#btn-account-trasporti-page').css("display","none");
		    $('btn-login-trasporti-page').css("display","block");
		    		    		    		    		    		    		    
		    $('#btn-my-feeds-info-page').css("display","none");
		    $('#btn-my-brands-info-page').css("display","none");
		    $('#btn-carrello-info-page').css("display","none");
		    $('#btn-login-info-page').css("display","block");
		    $('#btn-account-info-page').css("display","none");
		    $('#btn-impostazioni-info-page').css("display","block");
		    		    		    		    		    		    		    		    
		    $('#btn-my-feeds-infopoint-page').css("display","none");
		    $('#btn-my-brands-infopoint-page').css("display","none");
		    $('#btn-carrello-infopoint-page').css("display","none");
		    $('#btn-login-infopoint-page').css("display","block");
		    $('#btn-account-infopoint-page').css("display","none");
		    $('#btn-impostazioni-infopoint-page').css("display","block");
		    		    		    		    		    		    		    		    
		    $('#btn-my-feeds-welcome-page').css("display","none");
		    $('#btn-my-brands-welcome-page').css("display","none");
		    $('#btn-carrello-welcome-page').css("display","none");
		    $('#btn-login-welcome-page').css("display","block");
		    $('#btn-account-welcome-page').css("display","none");
		    $('#btn-impostazioni-welcome-page').css("display","block");
	    }
    }
    
    function showHideNoConnection(connessione){
	    if(connessione){
		    $('#no-connection-1').css("display","block");
		    $('#no-connection-2').css("display","block");
		    $('#no-connection-3').css("display","block");
		    $('#no-connection-4').css("display","block");
		    $('#no-connection-5').css("display","block");
		    $('#no-connection-6').css("display","block");
		    $('#no-connection-7').css("display","block");
		    $('#no-connection-8').css("display","block");
		    $('#no-connection-9').css("display","block");
		    $('#no-connection-10').css("display","block");
		    $('#no-connection-11').css("display","block");
		    $('#no-connection-12').css("display","block");
		    $('#no-connection-13').css("display","block");
		    $('#no-connection-14').css("display","block");
		    $('#no-connection-15').css("display","block");
		}
		else{
			$('#no-connection-1').css("display","none");
			$('#no-connection-2').css("display","none");
			$('#no-connection-3').css("display","none");
			$('#no-connection-4').css("display","none");
			$('#no-connection-5').css("display","none");
			$('#no-connection-6').css("display","none");
			$('#no-connection-7').css("display","none");
			$('#no-connection-8').css("display","none");
			$('#no-connection-9').css("display","none");
			$('#no-connection-10').css("display","none");
			$('#no-connection-11').css("display","none");
			$('#no-connection-12').css("display","none");
			$('#no-connection-13').css("display","none");
			$('#no-connection-14').css("display","none");
			$('#no-connection-15').css("display","none");
		}
    }
	/* */
	
	/***************************/
	/* UTILS E METODI GENERICI */	
	/***************************/
	function hideKeyboard() {
		document.activeElement.blur();
		$("input").blur();
	};
	
    function checkConnection() {
    	if(!debug){
		    console.log("chiamato checkConnection");
		    
		    var networkState = navigator.connection.type;
		    
		    var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.CELL]     = 'Cell generic connection';
		    states[Connection.NONE]     = 'No network connection';
		
		    console.log('Connection type: ' + states[networkState]);
		    
		    if(navigator.connection.type == Connection.NONE){
				showHideNoConnection(true);
			    return false;
		    }
		    else{
					
				if(!googleMapScriptLoaded){
					console.log('Dovrei caricare la mappa');
					loadMapScript();
					googleMapScriptLoaded = true;
				}
				
			    showHideNoConnection(false);
			    return true;
		    }
	    }
	    else
	    	return true;
    }

    function timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp);
		var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date+'/'+month+'/'+year;
		return time;
	 };

	function deleteCookie(name)
	{
	    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	
	function getLocation(pagina){
		console.log("getLocation");
		
		latlngCentro = new google.maps.LatLng(latCentro, lonCentro);

		navigator.geolocation.getCurrentPosition(
			function(position){
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
				console.log("getLocaion ok : " + latitude + ", " + longitude);
				hasLocation = true;
				latlngUtente = new google.maps.LatLng(latitude, longitude);
				calculateDistances(latlngCentro, latlngUtente);
			}, 
			function(error){
				if(pagina == 'carrello' && alertCarrello == false){
					showAlert(jsonLingua.pagina_search.alert_gps);
					alertCarrello = true;
				}
				else if(pagina == 'search' && alertSearch == false) {
					showAlert(jsonLingua.pagina_search.alert_gps);
					alertSearch = true;
				}
				
				latitude = latCentro;
				longitude = lonCentro;
                hasLocation = false;
			}
		);
	}
	
	function contentHeight(){
	    scroll(0, 0);

	    var header = $(".ui-header:visible");
	    var footer = $(".ui-footer:visible");
	    var content = $(".info_content:visible");
	    var viewport_height = $(window).height();
	    
	    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
	    
	    content_height -= (content.outerHeight() - content.height());
	    
	    return content_height;
    }
    
    function toast(msg){
		$("<div class='ui-loader ui-overlay-shadow ui-body-a ui-corner-all'><h3>"+msg+"</h3></div>")
		.css({ display: "block", 
			opacity: 0.90, 
			position: "fixed",
			padding: "7px",
			"text-align": "center",
			width: "270px",
			left: ($(window).width() - 284)/2,
			top: $(window).height()/2 })
		.appendTo( $.mobile.pageContainer ).delay( 1500 )
		.fadeOut( 400, function(){
			$(this).remove();
		});
	}
	
	function showAlert(message) {
        navigator.notification.alert(
            message,  // message
            alertDismissed,         // callback
            'Centergross',            // title
            'OK'                  // buttonName
        );
    }
		
	function alertDismissed() {

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

