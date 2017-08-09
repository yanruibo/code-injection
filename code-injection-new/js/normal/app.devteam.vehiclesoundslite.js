
var browser,simula_numero_utilizzi_rating, estensione_img;
//*********************
//*********************
browser = false;
simula_numero_utilizzi_rating = false;
//*********************
//*********************

var evento = "touchstart"
estensione_img = "";

if (browser){
  evento = "click"
}

function impostaFormatoImg(){
  dispositivoOld = false
  estensione_img = "";
  deviceVersion = "";
  deviceSO = "";

  try{
    deviceSO = device.platform;
  } catch(err) {}

  if(deviceSO == "Android"){
    deviceVersion = device.version;
    if (parseInt(deviceVersion.substring(0, 1)) < 4){
      dispositivoOld = true
    }else{
      dispositivoOld = false
    }
  }

  if(dispositivoOld){
      return "png";
  } else {
      return "svg";
  }
}

function getImgSize(imgSrc) {
  var newImg;
  newImg = new Image();
  newImg.src = imgSrc;
  return newImg.height;
}

function caricaLayout() {

  var altezza_animale, altezza_box, altezza_schermo, estensione_img, fsiz, goToMarket, larghezza_schermo, openMarket;
  estensione_img = impostaFormatoImg();

  altezza_schermo = $(document).height() - 10;
  larghezza_schermo = $(document).width() - 10;
  $("#contenuto").height(altezza_schermo);
  $(".maschera").height(altezza_schermo - 7).width(larghezza_schermo - 5).css({
    margin: 8
  });

  altezza_box = ((altezza_schermo / 10) * 8) / 3;
  altezza_animale = (((altezza_schermo - 46) / 10) * 8) / 3;
  $("#img_promo").height((altezza_schermo * 23) / 100);
  $(".animale").height(altezza_box).width(larghezza_schermo / 3);
  $(".zoom").height(altezza_animale).width((larghezza_schermo - 36) / 3);
  $(".zoom .immagine").css({
    "line-height": altezza_animale + "px"
  });
  $(".freccia").height(((altezza_schermo / 10) * 2) - (altezza_schermo / 16)).width(larghezza_schermo / 2).css({
    marginTop: altezza_schermo / 32,
    marginBottom: altezza_schermo / 32
  });
  fsiz = (altezza_schermo * 5) / 100;

  $("#airplane").attr("src", "immagini/airplane." + estensione_img);
  $("#truck3").attr("src", "immagini/truck3." + estensione_img);
  $("#police2").attr("src", "immagini/police2." + estensione_img);
  $("#train").attr("src", "immagini/train." + estensione_img);
  $("#bike").attr("src", "immagini/bike." + estensione_img);
  $("#ship1").attr("src", "immagini/ship1." + estensione_img);
  $("#car2").attr("src", "immagini/car2." + estensione_img);
  $("#moto").attr("src", "immagini/moto." + estensione_img);
  $("#bus2").attr("src", "immagini/bus2." + estensione_img);

  $("#ambulance").attr("src", "immagini/ambulance." + estensione_img);
  $("#firefighters1").attr("src", "immagini/firefighters1." + estensione_img);
  $("#police3").attr("src", "immagini/police3." + estensione_img);
  $("#truck2").attr("src", "immagini/truck2." + estensione_img);
  $("#helicopter").attr("src", "immagini/helicopter." + estensione_img);
  $("#car1").attr("src", "immagini/car1." + estensione_img);
  $("#ship2").attr("src", "immagini/ship2." + estensione_img);
  $("#police1").attr("src", "immagini/police1." + estensione_img);
  $("#firefighters3").attr("src", "immagini/firefighters3." + estensione_img);

  $("#airship").attr("src", "immagini/airship." + estensione_img);
  $("#firefighters2").attr("src", "immagini/firefighters2." + estensione_img);
  $("#scraper1").attr("src", "immagini/scraper1." + estensione_img);
  $("#bus1").attr("src", "immagini/bus1." + estensione_img);
  $("#moto2").attr("src", "immagini/moto2." + estensione_img);
  $("#ship3").attr("src", "immagini/ship3." + estensione_img);
  $("#tractor").attr("src", "immagini/tractor." + estensione_img);
  $("#truck1").attr("src", "immagini/truck1." + estensione_img);
  $("#truck7").attr("src", "immagini/truck7." + estensione_img);

  $("#forklift").attr("src", "immagini/forklift." + estensione_img);
  $("#digger").attr("src", "immagini/digger." + estensione_img);
  $("#truck4").attr("src", "immagini/truck4." + estensione_img);
  $("#truck5").attr("src", "immagini/truck5." + estensione_img);
  $("#truck6").attr("src", "immagini/truck6." + estensione_img);
  $("#auger").attr("src", "immagini/auger." + estensione_img);
  $("#truck8").attr("src", "immagini/truck8." + estensione_img);
  $("#truck9").attr("src", "immagini/truck9." + estensione_img);
  $("#truck10").attr("src", "immagini/truck10." + estensione_img);

  $(".freccia a").bind(evento, function(){
    var direzione, immagine, percorso;
    immagine = $("img", this);
    percorso = immagine.attr("src");
    direzione = immagine.attr("direzione");
    immagine.attr("src", "immagini/freccia_" + direzione + "_click.png");
    setTimeout(function() {
      return immagine.attr("src", percorso);
    }, 500);
    $.mobile.changePage($(this).attr("href"));
    return false
  });

  $(".freccia a").click(function() {
    if(evento == "touchstart"){
      return false;
    } else {
      return true;
    }
  });

  $(".lite .zoom, .buy-full").live(evento, function() {
    if(browser){
      alert("messaggio x acquisto (su browser non esiste metodo")
    }else{
      azione_maschera_sblocco = "VehiclesFull";
      $("#maschera-sblocco").fadeIn();
    }
  });

  $(".full .zoom").live(evento, function() {
    var altezza, elemento_zoom, err, etichetta, larghezza, margine_alto, margine_left, my_media, my_media_src, succ;
    $(".blocco").show();
    etichetta = $(".etichetta", this);
    margine_alto = $(this).position().top;
    margine_left = $(this).position().left;
    larghezza = $(this).width();
    altezza = $(this).height();
    elemento_zoom = $(this);
    elemento_zoom.addClass("sfondo-attivo", 50);
    my_media_src = percorso_audio + elemento_zoom.attr("suono");
    err = function(){
      elemento_zoom.removeClass("sfondo-attivo");
      $(".maschera").fadeOut(300);
      elemento_zoom.fadeIn(300);
      return $(".blocco").hide();
    };
    succ = function(){
      try{
        my_media.release();
      }catch(err){}
      elemento_zoom.removeClass("sfondo-attivo");
      $(".maschera").fadeOut(300);
      elemento_zoom.fadeIn(300);
      return $(".blocco").hide();
    };
    try{
      my_media = new Media(my_media_src, succ, err);
    }catch(err){}
    $(".maschera").html($(this).html());
    $(".maschera .immagine").css({
      height: altezza_schermo - 50
      //paddingTop: (altezza_schermo - getImgSize($(".maschera .immagine img").attr("src"))) / 2
    });
    return elemento_zoom.fadeOut(300, function() {
      return $(".maschera").fadeIn(300, function() {
        return my_media.play();
      });
    });
  })

  $(".tasto_start").show();
  $(".loading").hide();
}

function simulaBrowser(elemento_zoom){

  setTimeout(function(){
    elemento_zoom.removeClass("sfondo-attivo");
    $(".maschera").fadeOut(300);
    elemento_zoom.fadeIn(300);
    $(".blocco").hide();
  },3000)

}

function goToMarket(buttonIndex) {
  if (buttonIndex === 2) {
    return openMarket('animalsFull');
  } else {

  }
}

var percorso_audio;
percorso_audio = "/android_asset/www/";

var dispositivo;
dispositivo = "android";

var marketAndroid;
marketAndroid = "google"
//marketAndroid = "amazon"


// window.plugins.emailComposer

function EmailComposer() {
	this.resultCallback = null; // Function
}

EmailComposer.ComposeResultType = {
Cancelled:0,
Saved:1,
Sent:2,
Failed:3,
NotSent:4
}



// showEmailComposer : all args optional

EmailComposer.prototype.showEmailComposer = function(subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
	var args = {};
	if(toRecipients)
		args.toRecipients = toRecipients;
	if(ccRecipients)
		args.ccRecipients = ccRecipients;
	if(bccRecipients)
		args.bccRecipients = bccRecipients;
	if(subject)
		args.subject = subject;
	if(body)
		args.body = body;
	if(bIsHTML)
		args.bIsHTML = bIsHTML;
	
	cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

// this will be forever known as the orch-func -jm
EmailComposer.prototype.showEmailComposerWithCB = function(cbFunction,subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML) {
	this.resultCallback = cbFunction;
	this.showEmailComposer.apply(this,[subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML]);
}

EmailComposer.prototype._didFinishWithResult = function(res) {
	this.resultCallback(res);
}



cordova.addConstructor(function()  {
					   if(!window.plugins)
					   {
					   window.plugins = {};
					   }
					   
					   // shim to work in 1.5 and 1.6
					   if (!window.Cordova) {
					   window.Cordova = cordova;
					   };
					   
					   window.plugins.emailComposer = new EmailComposer();
					   });















    if(dispositivo == "ios") {
      $.getScript("js/iap_ios.js")
      .done(function(script, textStatus) {
        console.log("iap_ios");
      })
      .fail(function(jqxhr, settings, exception) {
        console.log("errore js iap");
      });
    } else {
      $.getScript("js/iap.js")
      .done(function(script, textStatus) {
        console.log("iap android");
      })
      .fail(function(jqxhr, settings, exception) {
        console.log("errore js iap");
      });
    }
  



	function preventBehavior(e) { 
		e.preventDefault(); 
	};
	
	document.addEventListener("touchmove", preventBehavior, false);
			
	function onBackKeyDown() {}

	$(document).bind( "mobileinit", function() {
		$.mobile.buttonMarkup.hoverDelay = 0
	});

	function onBodyLoad(){
		document.addEventListener("deviceready", onDeviceReady, false);

    if(browser){
      caricaLayout();
      initMenu();
      $(".loading").fadeOut('fast', function(){
        $(".tasto_start").fadeIn('fast')
      })
    }
	}

  function onPause(){
    $("body").empty();
  }

  function onResume(){
    location.href = "index.html";
  }
    
	function onDeviceReady(){

    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    
    caricaLayout();
    initMenu();
    if(dispositivo == "ios"){
      iapInit();
    } else {
      checkGiaAcquistato();
    }
	}

 	

      var opts = {
        lines: 13, // The number of lines to draw
        length: 15, // The length of each line
        width: 8, // The line thickness
        radius: 22, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#FFFFFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      var target = document.getElementById('full-screen-loader');
      var spinner = new Spinner(opts).spin(target);
      $("#full-screen-loader").hide();
    

          var opts = {
            lines: 13, // The number of lines to draw
            length: 15, // The length of each line
            width: 8, // The line thickness
            radius: 22, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#FFFFFF', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
          };
          var target = document.getElementById('loading');
          var spinner = new Spinner(opts).spin(target);
        


var inappbilling = { 

	// Initialize the plugin
    init: function (success, fail) { 
      return cordova.exec( success, fail, 
                           "InAppBillingPlugin", 
                           "init", ["null"]); 
    },
    // get already own items
    getPurchases: function (success, fail) {
        return cordova.exec( success, fail,
            "InAppBillingPlugin",
            "getPurchases", ["null"]);
    },
    // purchase an item
    buy: function (success, fail, productId) {
        return cordova.exec( success, fail,
            "InAppBillingPlugin",
            "buy", [productId]);
    },
    // subscribe to an item
    subscribe: function (success, fail, productId) {
        return cordova.exec( success, fail,
            "InAppBillingPlugin",
            "subscribe", [productId]);
    },
    // consume a purchased item
    consumePurchase: function (success, fail, productId) {
        return cordova.exec( success, fail,
            "InAppBillingPlugin",
            "consumePurchase", [productId]);
    }
};


var num_utilizzi_rating = 5;
var azione_maschera_sblocco = "";
var indice_direzione = parseInt(Math.random()*3);

function initDB(){
    try{
        var db = window.openDatabase("db_flapp", "1.0", "db_flapp", 100000);
        db.transaction(queryCountDB, errorCB);
    }catch(e){
        //alert("error init db");
    }
}

function getSOVersion(){
	deviceSO = "";
	deviceVersion = "0";
  try{
    deviceSO = device.platform;
  } catch(err) {}

  if(deviceSO == "Android"){
    deviceVersion = device.version.substring(0, 1);
  }
  return deviceVersion;
}

function errorCB(err) {
  //alert("Error processing SQL: " + err.code);
}

function queryCountDBError() {
	//alert("queryCountDBError")
}

function queryCountDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usage_app (id INTEGER PRIMARY KEY ASC, number_usage, locked)');
    tx.executeSql('SELECT * FROM usage_app WHERE id = 1', [], queryCountDBSuccess, queryCountDBError);
}

function queryCountDBSuccess(tx, r){
	showRating = false;
	if(r.rows.length == 0){
		//inizializzo la tabella
		tx.executeSql('INSERT INTO usage_app (id, number_usage, locked) VALUES (1,"1","F")');
	}else if((parseInt(r.rows.item(0).number_usage)+1) >= num_utilizzi_rating && r.rows.item(0).locked == "F"){
        //mostro rating
        showRating = true;
    }else if(r.rows.item(0).locked == "F"){
    	//incremento numero di utilizzi
    	incr = parseInt(r.rows.item(0).number_usage)+1;
    	tx.executeSql('UPDATE usage_app SET number_usage = "' + incr + '"');
    }

    if (showRating) $('.iconaRating').show();
    else $('.icona').show();

    $('.parents').show();
}

function bloccaIconaRating(){
    try{
        var db = window.openDatabase("db_flapp", "1.0", "db_flapp", 100000);
        db.transaction(lockRating, errorCB);
    }catch(e){
      //alert("error init db2");
    }
}

function lockRating(tx){
	tx.executeSql('UPDATE usage_app SET locked = "T"');
}

function initMenu(){

	if(browser == false){
		initDB();
	}else if (simula_numero_utilizzi_rating){
		//simulazione di raggiungimento numero utilizzi x rating
		$('.iconaRating').show();
	}else{
		$('.icona').show();
	}

	if(dispositivo != "ios"){
		$(".parents-azione.regala").hide();
	}
	$(".tasto_start").bind(evento, function(){
	  $("#home").fadeOut();
	  $("#home").empty();
	  
	  //$("#menu-principale").show();

	})

	initMascheraSblocco();

	$(".parents").bind(evento, function(){
		azione_maschera_sblocco = "menu";
		$("#maschera-sblocco").fadeIn();
	});

	$(".icona").bind(evento, function(){
		azione_maschera_sblocco = "acquistoAnimals";
		$("#maschera-sblocco").fadeIn();
	});

	$(".iconaRating").bind(evento, function(){
		azione_maschera_sblocco = "rateAnimalSoundslite";
		$("#maschera-sblocco").fadeIn();
	});

	$(".consiglia").bind(evento, function(){
		openMarket("consiglia");
	});

	$(".altre-app").bind(evento, function(){
		openMarket("altre-app");
	});
	
	$(".rating").bind(evento, function(){
		openMarket("rateAnimalSoundslite");
	});
	
	$(".regala").bind(evento, function(){
		openMarket("giftIOS");
	});

	if(browser == true) numeroDita = 1;
	else numeroDita = 2;

	//supporto android old
	if (dispositivo=="android" && parseInt(getSOVersion()) < 4) numeroDita = 1;
	
	$("#maschera-sblocco").swipe({
	  swipeUp:function(event, target){
	    swipeOk(0);
	  },
	  swipeRight:function(event, target){
	    swipeOk(1);
	  },
	  swipeDown:function(event, target){
	    swipeOk(2);
	  },
	  swipeLeft:function(event, target){
	    swipeOk(3);
	  },
	  tap:function(event, target){
	    this.fadeOut();
	  },
	  threshold:100,
	  triggerOnTouchEnd: true,
	  fingers: numeroDita,
	})

	$("#parents-menu .freccia-back").bind(evento, function(){
		$("#parents-menu").fadeOut();
		cambiaDirezioneSblocco();
	})
}

function swipeOk(dir){

	if (indice_direzione != dir) {
		$("#maschera-sblocco").fadeOut();
		return;
	}
	if(azione_maschera_sblocco == "menu"){
		mostraMenu();
	}else if (azione_maschera_sblocco == "acquistoAnimals"){
		openMarket("acquistoAnimals");
	}else if (azione_maschera_sblocco == "VehiclesFull"){
		mostraIAP();
	}else{
		bloccaIconaRating();
		openMarket("rateAnimalSoundslite");
	}

}

function initMascheraSblocco(){
	$(".testo-sblocco").html(getDirezioni_sblocco(indice_direzione));
	$(".testo-titolo-sblocco").html(getDirezioni_sblocco(4));
}

function cambiaDirezioneSblocco(){
	indice_direzione += 1;
	if (indice_direzione == 4) indice_direzione = 0;
	$(".testo-sblocco").html(getDirezioni_sblocco(indice_direzione));
	$(".testo-titolo-sblocco").html(getDirezioni_sblocco(4));
}

function mostraMenu(){
	$("#maschera-sblocco").fadeOut();
	$("#parents-menu").fadeIn();
}
function mostraIAP(){
	$("#maschera-sblocco").fadeOut();
  if(dispositivo == "ios"){
  	$("#iap-menu").fadeIn();
  } else {
    iapInit();
  }
}

function openMarket(type) {
  var androidPackage = "app.devteam.vehiclesoundslite"
  var urlAmazon = "http://www.amazon.com/gp/mas/dl/android?p=app.devteam.vehiclesounds";
  var urlGoogle = "https://play.google.com/store/apps/details?id=app.devteam.vehiclesounds";
  //*****AGGIORNARE***///
  //devi mettere il link ad animals FULL*//
  var urlIOS = "http://itunes.apple.com/us/app/id541863495";
  urlAmazon = encodeURIComponent(urlAmazon);
  urlGoogle = encodeURIComponent(urlGoogle);

 
	//Link acquisto animals Full sponsorizzato
	if (type === 'acquistoAnimals') {
		if (dispositivo === "android" && marketAndroid === "google") {
			return document.location.href = "market://details?id=animals.flapp.it";
		} else if (dispositivo === "android" && marketAndroid === "amazon") {
			return document.location.href = "amzn://apps/android?p=animals.flapp.it";
		} else {
			window.open('http://itunes.apple.com/us/app/id541863495', '_blank');
		}
/*
	//Link acquisto Baby Race sponsorizzato
	}else if (type === 'acquistoVehicleSounds') {

		if (dispositivo === "android" && marketAndroid === "google") {
			return document.location.href = "market://details?id=app.devteam.vehiclesounds";
		} else if (dispositivo === "android" && marketAndroid === "amazon") {
			return document.location.href = "amzn://apps/android?p=app.devteam.vehiclesounds";
		} else {
			window.open('http://itunes.apple.com/us/app/id541863495', '_blank');
		}
*/
	//Link rating Baby Animal Sounds FREE
	}else if (type === 'rateAnimalSoundslite') {
		if (dispositivo === "android" && marketAndroid === "google") {
			return document.location.href = "market://details?id=" + androidPackage;
		} else if (dispositivo === "android" && marketAndroid === "amazon") {
			return document.location.href = "amzn://apps/android?p=" + androidPackage;
		} else {
			window.open('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=631272228&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software', '_blank');
		}

	//Manda e-mail x consigliare l'app
	}else if (type === 'consiglia') {

		if (dispositivo === "android" && marketAndroid === "google") {
			location.href="mailto:?subject=" + getEmailMessage(0) + "&body=" + getEmailMessage(1) + urlGoogle;
		} else if (dispositivo === "android" && marketAndroid === "amazon") {
			location.href="mailto:?subject=" + getEmailMessage(0) + "&body=" + getEmailMessage(1) + urlAmazon;
		} else {
      		window.plugins.emailComposer.showEmailComposer(getEmailMessage(0), getEmailMessage(1) + urlIOS, "recipient, recipient", false, false, false);
		}

	//Link alle altre app
	}else if (type === 'altre-app') {
		if (dispositivo === "android" && marketAndroid === "google") {
			return document.location.href = "market://search?q=pub:App Dev Team";
		} else if (dispositivo === "android" && marketAndroid === "amazon") {
			return document.location.href = "amzn://apps/android?s=app.devteam&showAll=1";
		} else {
			window.open("itms-apps://itunes.com/apps/fabiobassan", '_blank');
		}
	
	}else if (type === 'giftIOS') {
		window.open('itms-appss://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/giftSongsWizard?gift=1&salableAdamId=547190127&productType=C&pricingParameter=STDQ&mt=8&ign-mscache=1', '_blank');
	}

}

function sendEmail(){
  if (dispositivo === "android") {
    location.href="mailto:android@flapp.it";
  } else {
      window.plugins.emailComposer.showEmailComposer("", "", "info@flapp.it", false, false, false);
  }
}


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
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
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



var preferences;
var idProductAndroid = "vehicles_full";
//idProductAndroid = "android.test.purchased";
//idProductAndroid = "test_acquisto_in_app";


function iapInit(){
console.log("XXX iapInit");
  iapAndroidInit();
}

function successHandler(result){
    //var strResult = "";
    //if(typeof result === 'object') {
    //    strResult = JSON.stringify(result);
    //} else {
    //    strResult = result;
    //}
    //alert("SUCCESS: \r\n"+strResult );

    //checkGiaAcquistato();
console.log("XXX successHandler");
    bindEvents();
}

function successHandlerOwned(result){
console.log("XXX successHandlerOwned");
    var strResult = "";
    if(typeof result === 'object') {
    	for (i=0;i<result.length;i++){
    		if (result[i] == idProductAndroid){
    			//alert("OWNED: " + result[i]);
    			console.log("XXX OWNED");
    			unlockProduct();
    		}else{
    			console.log("XXX NOT OWNED");
				inappbilling.buy(successPurchase, errorHandler, idProductAndroid);
    		}
        }
    }else{
    	console.log("XXX successHandlerOwned ELSE??");
		inappbilling.buy(successPurchase, errorHandler,idProductAndroid);
    }

}

function successPurchase(result){
    /*var strResult = "";
    if(typeof result === 'object') {
        strResult = JSON.stringify(result);
    } else {
        strResult = result;
    }
    alert("SUCCESS: \r\n"+strResult );*/
console.log("XXX successPurchase");
    savePreferences("VehiclesFull");
}

function errorHandler(error){
console.log("XXX errorHandler: " + error);
    //alert("ERROR: \r\n"+error );
    if(error.indexOf("7:Item Already Owned") != -1){
console.log("XXX unlockProduct");
    	unlockProduct();
    }else{
		$("#full-screen-loader").hide();
		$("#iap-menu").fadeOut();
    }
}

function unlockProduct() {
console.log("XXX unlockProduct");
	savePreferences("VehiclesFull");
	$("#full-screen-loader").hide();
	$("#iap-menu").fadeOut();
	$(".lite").addClass("full").removeClass("lite");
	$(".buy-full").hide();
}
	
function iapAndroidInit() {
console.log("XXX iapAndroidInit");
	inappbilling.init(successHandler, errorHandler);
}


function bindEvents(){
console.log("XXX bindEvents");

	$('#iap-menu').unbind();
	$("#iap-menu").bind(evento, function(){
		$("#iap-menu").fadeOut();
	});
	$('#buy-full').unbind();
	$("#buy-full").bind(evento, function(){
	$("#full-screen-loader").show();
	inappbilling.buy(successPurchase, errorHandler,idProductAndroid);

	});
	
	$('#restore-iap').unbind();
	$("#restore-iap").bind(evento, function(){
	inappbilling.getPurchases(successHandlerOwned, errorHandler);

	});
console.log("XXX iap-menu.fadeIn()");
	$("#iap-menu").fadeIn();
}

function checkGiaAcquistato(){
console.log("XXX checkGiaAcquistato");
	//controllo se già acquistato
	preferences = cordova.require("cordova/plugin/applicationpreferences");

	//clear x test
	//preferences.clear(function() {
	//	alert("Cleared all preferences!");
	//}, function(error) {
	//	alert("Error! " + JSON.stringify(error));
	//});

	preferences.get("VehiclesFull", function(value) {
  console.log("preferences.get");
	        unlockProduct();
	    }, function(error) {
	        //alert("Error! " + JSON.stringify(error));
	});
}

function savePreferences(productId){

  console.log("savePreferences");
	preferences.set(productId, true, function() {
  console.log("savePreferences OK");
	    }, function(error) {
	        //alert("Error! " + JSON.stringify(error));
	});

}


/** 
 * A plugin to enable iOS In-App Purchases.
 *
 * Copyright (c) Matt Kane 2011
 * Copyright (c) Guillaume Charhon 2012
 */


var InAppPurchaseManager = function() { 
	cordova.exec('InAppPurchaseManager.setup');
}

/**
 * Makes an in-app purchase. 
 * 
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {int} quantity 
 */

InAppPurchaseManager.prototype.makePurchase = function(productId, quantity) {
	var q = parseInt(quantity);
	if(!q) {
		q = 1;
	}
    return cordova.exec('InAppPurchaseManager.makePurchase', productId, q);		
}

/**
 * Asks the payment queue to restore previously completed purchases.
 * The restored transactions are passed to the onRestored callback, so make sure you define a handler for that first.
 * 
 */

InAppPurchaseManager.prototype.restoreCompletedTransactions = function() {
    return cordova.exec('InAppPurchaseManager.restoreCompletedTransactions');		
}


/**
 * Retrieves the localised product data, including price (as a localised string), name, description.
 * You must call this before attempting to make a purchase.
 *
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {Function} successCallback Called once for each returned product id. Signature is function(productId, title, description, price)
 * @param {Function} failCallback Called once for each invalid product id. Signature is function(productId)
 */

InAppPurchaseManager.prototype.requestProductData = function(productId, successCallback, failCallback) {
	var key = 'f' + this.callbackIdx++;
	window.plugins.inAppPurchaseManager.callbackMap[key] = {
    success: function(productId, title, description, price ) {
        if (productId == '__DONE') {
            delete window.plugins.inAppPurchaseManager.callbackMap[key]
            return;
        }
        successCallback(productId, title, description, price);
    },
    fail: failCallback
	}
	var callback = 'window.plugins.inAppPurchaseManager.callbackMap.' + key;
    cordova.exec('InAppPurchaseManager.requestProductData', productId, callback + '.success', callback + '.fail');	
}

/**
 * Retrieves localised product data, including price (as localised
 * string), name, description of multiple products.
 *
 * @param {Array} productIds
 *   An array of product identifier strings.
 *
 * @param {Function} callback
 *   Called once with the result of the products request. Signature:
 *
 *     function(validProducts, invalidProductIds)
 *
 *   where validProducts receives an array of objects of the form
 *
 *     {
 *      id: "<productId>",
 *      title: "<localised title>",
 *      description: "<localised escription>",
 *      price: "<localised price>"
 *     }
 *
 *  and invalidProductIds receives an array of product identifier
 *  strings which were rejected by the app store.
 */
InAppPurchaseManager.prototype.requestProductsData = function(productIds, callback) {
	var key = 'b' + this.callbackIdx++;
	window.plugins.inAppPurchaseManager.callbackMap[key] = function(validProducts, invalidProductIds) {
		delete window.plugins.inAppPurchaseManager.callbackMap[key];
		callback(validProducts, invalidProductIds);
	};
	var callbackName = 'window.plugins.inAppPurchaseManager.callbackMap.' + key;
	cordova.exec('InAppPurchaseManager.requestProductsData', callbackName, {productIds: productIds});
};

/* function(transactionIdentifier, productId, transactionReceipt) */
InAppPurchaseManager.prototype.onPurchased = null;

/* function(originalTransactionIdentifier, productId, originalTransactionReceipt) */
InAppPurchaseManager.prototype.onRestored = null;

/* function(errorCode, errorText) */
InAppPurchaseManager.prototype.onFailed = null;

/* function() */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFinished = null;

/* function(errorCode) */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFailed = null;

/* This is called from native.*/

InAppPurchaseManager.prototype.updatedTransactionCallback =
function(state, errorCode, errorText, transactionIdentifier,
         productId, transactionReceipt) {
    switch(state) {
        case "PaymentTransactionStatePurchased":
            if(window.plugins.inAppPurchaseManager.onPurchased) {
                
                window.plugins.inAppPurchaseManager.onPurchased(transactionIdentifier,
                                                                productId, transactionReceipt);
            } else {
                this.eventQueue.push(arguments);
                this.watchQueue();
            }
            return;
            
        case "PaymentTransactionStateFailed":
            if(window.plugins.inAppPurchaseManager.onFailed) {
                window.plugins.inAppPurchaseManager.onFailed(errorCode,
                                                             errorText);
            } else {
                this.eventQueue.push(arguments);
                this.watchQueue();
            }
            return;
            
        case "PaymentTransactionStateRestored":
            if(window.plugins.inAppPurchaseManager.onRestored) {
               
                window.plugins.inAppPurchaseManager.onRestored(transactionIdentifier,
                                                               productId, transactionReceipt);
            } else {
                this.eventQueue.push(arguments);
                this.watchQueue();
            }
            return;
    }
};
InAppPurchaseManager.prototype.restoreCompletedTransactionsFinished = function() {
    if (this.onRestoreCompletedTransactionsFinished) {
        this.onRestoreCompletedTransactionsFinished();
    }
};

InAppPurchaseManager.prototype.restoreCompletedTransactionsFailed = function(errorCode) {
    if (this.onRestoreCompletedTransactionsFailed) {
        this.onRestoreCompletedTransactionsFailed(errorCode);
    }
};

/*
 * This queue stuff is here because we may be sent events before listeners have been registered. This is because if we have 
 * incomplete transactions when we quit, the app will try to run these when we resume. If we don't register to receive these
 * right away then they may be missed. As soon as a callback has been registered then it will be sent any events waiting
 * in the queue.
 */

InAppPurchaseManager.prototype.runQueue = function() {
	if(!this.eventQueue.length || (!this.onPurchased && !this.onFailed && !this.onRestored)) {
		return;
	}
	var args;
	/* We can't work directly on the queue, because we're pushing new elements onto it */
	var queue = this.eventQueue.slice();
	this.eventQueue = [];
	while(args = queue.shift()) {
		this.updatedTransactionCallback.apply(this, args);
	}
	if(!this.eventQueue.length) {	
		this.unWatchQueue();
	}
}

InAppPurchaseManager.prototype.watchQueue = function() {
	if(this.timer) {
		return;
	}
	this.timer = setInterval("window.plugins.inAppPurchaseManager.runQueue()", 10000);
}

InAppPurchaseManager.prototype.unWatchQueue = function() {
	if(this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
}


InAppPurchaseManager.prototype.callbackMap = {};
InAppPurchaseManager.prototype.callbackIdx = 0;
InAppPurchaseManager.prototype.eventQueue = [];
InAppPurchaseManager.prototype.timer = null;

cordova.addConstructor(function()  {
					   
					   // shim to work in 1.5 and 1.6
					   if (!window.Cordova) {
					   window.Cordova = cordova;
					   };
					   
					   if(!window.plugins) {
					   window.plugins = {};
					   }
					   window.plugins.inAppPurchaseManager = InAppPurchaseManager.manager = new InAppPurchaseManager();
					   });


language = window.navigator.language.split("-"); 
l = (language[0]);


function getEmailMessage(x){
	var nl = "";
	if (dispositivo === "android") nl = "%0D%0A";
	else nl = "\n";

	var itEML = [
		"Ti consiglio Baby Vehicle Sounds!",
		"Ciao!" + nl + "Ti consiglio Baby Vehicle Sounds!! " + nl + nl
	];
	var enEML = [
		"Try out Baby Vehicle Sounds - entertain your toddler!",
		"Hi!" + nl + "Try out Baby Vehicle Sounds - entertain your toddler!!" + nl + nl
	];

  if (l == 'it') return itEML[x];
  else return enEML[x];
}

function _menu(x) {

  var enM = new Array("Share with<br>your friends","Try out our apps!","If you like this app<br>please rate it!");
  var itM = new Array("Consigliala<br>ad un amico", "Prova le nostre app!","Se ti piace questa app<br>per favore votala!");

  if (l == 'it') return itM[x];
  else return enM[x];
}

function getDirezioni_sblocco(x){

	var enDir = [
		"Swipe <strong>up</strong> with <strong>two</strong> fingers to continue",
		"Swipe <strong>right</strong> with <strong>two</strong> fingers to continue",
		"Swipe <strong>down</strong> with <strong>two</strong> fingers to continue",
		"Swipe <strong>left</strong> with <strong>two</strong> fingers to continue",
		"Hello!"
	];
	var itDir = [
		"Scorri verso <strong>l'alto</strong> con <strong>due</strong> dita per continuare",
		"Scorri verso <strong>destra</strong> con <strong>due</strong> dita per continuare",
		"Scorri verso <strong>il basso</strong> con <strong>due</strong> dita per continuare",
		"Scorri verso <strong>sinistra</strong> con <strong>due</strong> dita per continuare",
		"Ciao!"
	];
	var spDir = [
		"Pase hacia <strong>arriba</strong> con <strong>dos</strong> dedos para continuar",
		"Pase <strong>derecha</strong> con <strong>dos</strong> dedos para continuar",
		"Pase hacia <strong>abajo</strong> con <strong>dos</strong> dedos para continuar",
		"Pase a la <strong>izquierda</strong> con <strong>dos</strong> dedos para continuar",
		"Hola!"
	];
	var deDir = [
		"Streichen sie nach <strong>oben</strong> mit <strong>zwei</strong> fingern um fortzufahren",
		"Streichen sie nach <strong>rechts</strong> mit <strong>zwei</strong> fingern um fortzufahren",
		"Streichen sie nach <strong>unten</strong> mit <strong>zwei</strong> fingern um fortzufahren",
		"Streichen sie nach <strong>links</strong> mit <strong>zwei</strong> fingern um fortzufahren",
		"Hallo!"
	];
	var frDir = [
		"Glissez vers le <strong>haut</strong> avec <strong>deux</strong> doigts pour continue",
		"Glissez vers <strong>droit</strong> avec <strong>deux</strong> doigts pour continue",
		"Glissez vers le <strong>bas</strong> avec <strong>deux</strong> doigts pour continue",
		"Glissez vers la <strong>gauche</strong> avec <strong>deux</strong> doigts pour continue",
		"Bonjour!"
	];
	var ptDir = [
		"Deslize para <strong>cima</strong> com <strong>dois</strong> dedos para continuar",
		"Deslize para <strong>direito</strong> com <strong>dois</strong> dedos para continuar",
		"Deslize para <strong>baixo</strong> com <strong>dois</strong> dedos para continuar",
		"Deslize para a <strong>esquerda</strong> com <strong>dois</strong> dedos para continuar",
		"Olá!"
	];
	var nlDir = [
		"Veeg naar <strong>omhoog</strong> met <strong>twee</strong> vingers om verder te gaan",
		"Veeg naar <strong>rechts</strong> met <strong>twee</strong> vingers om verder te gaan",
		"Veeg naar <strong>beneden</strong> met <strong>twee</strong> vingers om verder te gaan",
		"Veeg naar <strong>links</strong> met <strong>twee</strong> vingers om verder te gaan",
		"Hello!"
	];
	var jaDir = [
		"スワイプは継続する<strong>2</strong>本の指で<strong>アップ</strong>",
		"スワイプは継続する<strong>2</strong>本の指で<strong>右</strong>",
		"スワイプは継続する<strong>2</strong>本の指で<strong>ダウン</strong>",
		"スワイプは継続する<strong>2</strong>本の指で<strong>左</strong>",
		"こんにちは！"
	];
	var ruDir = [
		"Проведите <strong>вверх двумя</strong> пальцами, чтобы продолжить",
		"Проведите <strong>право двумя</strong> пальцами, чтобы продолжить",
		"Проведите <strong>вниз двумя</strong> пальцами, чтобы продолжить",
		"Проведите <strong>влево двумя</strong> пальцами, чтобы продолжить",
		"Здравствуйте!"
	];
	var koDir = [
		"슬쩍 <strong>위</strong>로 <strong>두</strong> 손가락으로 계속하려면",
		"계속하려면 <strong>두</strong> 손가락을 화면에 댄 채로 <strong>오른쪽</strong>",
		"계속하려면 <strong>두</strong> 손가락을 화면에 댄 채로 <strong>아래로</strong>",
		"슬쩍 계속 <strong>두</strong> 손가락으로 <strong>왼쪽</strong>",
		"안녕하세요!"
	];
	var daDir = [
		"Knalde <strong>opad</strong> med <strong>to</strong> fingre for at fortsætte",
		"Knalde <strong>højre</strong> med <strong>to</strong> fingre for at fortsætte",
		"Knalde <strong>ned</strong> med <strong>to</strong> fingre for at fortsætte",
		"Knalde <strong>venstre</strong> med <strong>to</strong> fingre for at fortsætte",
		"Hello!"
	];
	var noDir = [
		"Sveip <strong>opp</strong> med <strong>to</strong> fingre for å fortsette",
		"Sveip til <strong>høyre</strong> med <strong>to</strong> fingre for å fortsette",
		"Sveip <strong>med</strong> <strong>to</strong> fingre for å fortsette",
		"Sveip til <strong>venstre</strong> med <strong>to</strong> fingre for å fortsette",
		"Hei!"
	];
	var svDir = [
		"Svep <strong>upp</strong> med <strong>två</strong> fingrar för att fortsätta",
		"Svep åt <strong>höger</strong> med <strong>två</strong> fingrar för att fortsätta",
		"Svep <strong>nedåt</strong> med <strong>två</strong> fingrar för att fortsätta",
		"Svep  åt <strong>vänster</strong> med <strong>två</strong> fingrar för att fortsätta",
		"Hej!"
	];

	if (l == 'it') return itDir[x];
	else if (l == 'sp') return spDir[x];
	else if (l == 'de') return deDir[x];
	else if (l == 'fr') return frDir[x];
	else if (l == 'pt') return ptDir[x];
	else if (l == 'nl') return nlDir[x];
	else if (l == 'ja') return jaDir[x];
	else if (l == 'ru') return ruDir[x];
	else if (l == 'ko') return koDir[x];
	else if (l == 'da') return daDir[x];
	else if (l == 'no') return noDir[x];
	else if (l == 'sv') return svDir[x];
	else return enDir[x];

}


(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);


(function() {
  
function applicationPreferences() {}

applicationPreferences.prototype.get = function(key,success,fail) 
{
    var args = {};
    args.key = key;
    cordova.exec(success,fail,"applicationPreferences","getSetting",[args]);
};

applicationPreferences.prototype.set = function(key,value,success,fail) 
{
    var args = {};
    args.key = key;
    args.value = value;
    cordova.exec(success,fail,"applicationPreferences","setSetting",[args]);
};


if(!window.plugins) {
    window.plugins = {};
}
if ( ! window.plugins.applicationPreferences ) {
    window.plugins.applicationPreferences = new applicationPreferences();
}

})();



function iapInit() {
  //imposta preferenza a false per test 
  // window.plugins.applicationPreferences.set("VehiclesFull", false, function() {
  //  console.log("impostata preferenza VehiclesFull")
 //  });

  //controllo se già acquistato
  window.plugins.applicationPreferences.get("VehiclesFull", function(result) {
    console.log("risultato:" + result)
    if (result && result == 1) {
      console.log("app acquistata");
      $(".lite").addClass("full").removeClass("lite")
      $(".buy-full").hide();
    } else if(result && result == 0){
      console.log("app non acquistata");
      // window.plugins.inAppPurchaseManager.makePurchase('VehiclesFull', 1);
    }
  });

  console.log('processo iap');
  window.plugins.inAppPurchaseManager.requestProductData("VehiclesFull", function(productId, title, description, price) {
      console.log("productId: " + productId + " title: " + title + " description: " + description + " price: " + price);
    }, 
    function(id) {
      console.log("Invalid product id: " + id);
  }); 

  // unlock product 
  function unlockProduct() {
    console.log("app acquistata");
    $("#full-screen-loader").hide();
    $("#iap-menu").fadeOut();
    $(".lite").addClass("full").removeClass("lite")
    $(".buy-full").hide();
    }

    // unlock product                       
    window.plugins.inAppPurchaseManager.onPurchased = function(transactionIdentifier, productId, transactionReceipt) {
      console.log('purchased: ' + productId);

      window.plugins.applicationPreferences.set(productId, true, function() {
        if(productId == "VehiclesFull"){
          unlockProduct()
        }
      });
    }
    
    
    // restore products 
    window.plugins.inAppPurchaseManager.onRestored = function(transactionIdentifier, productId, originalTransactionReceipt) {
      window.plugins.applicationPreferences.set(productId, true, function() {
        unlockProduct()
      });
      console.log('restored: ' + productId);
    }
    
    // onFailed 
    window.plugins.inAppPurchaseManager.onFailed = function(errno, errtext) {
      console.log('failed: ' + errtext);
      $("#full-screen-loader").hide();
      $("#iap-menu").fadeOut();
      // alert("error, please try again");

    }

    $("#iap-menu").bind(evento, function(){
      $("#iap-menu").fadeOut();
    })
    $("#buy-full").bind(evento, function(){
      // $("#iap-menu").fadeOut();
      window.plugins.inAppPurchaseManager.makePurchase('VehiclesFull', 1);
      $("#full-screen-loader").show();
      t = setTimeout(function(){
        $("#full-screen-loader").hide();
      },15000)
    })
    $("#restore-iap").bind(evento, function(){
      // $("#iap-menu").fadeOut();
      window.plugins.inAppPurchaseManager.restoreCompletedTransactions();
      $("#full-screen-loader").show();
      t = setTimeout(function(){
        console.log('fine timer')
        $("#full-screen-loader").hide();
      },15000)
    })
}


// process the confirmation dialog result
function onConfirm(button) {
  if(button == 2) {
    window.plugins.inAppPurchaseManager.restoreCompletedTransactions();
           // $('#popupPadded h2').addClass('loader');
         }
       }

// Show a custom confirmation dialog
function showConfirm() {
  navigator.notification.confirm(
                     'Restore All Purchases?',  // message
                    onConfirm,               // callback to invoke with index of button pressed
                     'FTK Magazine',          // title
                     'Cancel, OK'            // buttonLabels
                     );

}

cordova.define("cordova/plugin/applicationpreferences", function(require, exports, module) {
	var exec = require("cordova/exec");
	var AppPreferences = function () {};
	
	var AppPreferencesError = function(code, message) {
	    this.code = code || null;
	    this.message = message || '';
	};
	
	AppPreferencesError.NO_PROPERTY = 0;
	AppPreferencesError.NO_PREFERENCE_ACTIVITY = 1;
	
	AppPreferences.prototype.get = function(key,success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","get",[key]);
	};
	
	AppPreferences.prototype.set = function(key,value,success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","set",[key, value]);
	};
	
	AppPreferences.prototype.load = function(success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","load",[]);    
	};
	
	AppPreferences.prototype.show = function(activity,success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","show",[activity]);    
	};
	
	AppPreferences.prototype.clear = function(success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","clear", []);    
	};
	
	AppPreferences.prototype.remove = function(keyToRemove, success,fail) {
	    cordova.exec(success,fail,"applicationPreferences","remove", [keyToRemove]);    
	};

	var appPreferences = new AppPreferences();
	module.exports = appPreferences;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.applicationPreference) {
    window.plugins.applicationPreference = cordova.require("cordova/plugin/applicationpreferences");
}

