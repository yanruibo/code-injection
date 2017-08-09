





    	$_GET = getQueryParams(decodeURIComponent(document.location.search));
		if(typeof($_GET['id'])!='undefined' && typeof($_GET['arborescence'])!='undefined') {
			window.location.href="index.html?id="+$_GET['id']+"&arborescence="+$_GET['arborescence'];	
		} else {
			window.location.href="index.html";
		}
    

// JavaScript Document
function meteo() {
	event.preventDefault();
	$(".homeButton").removeClass("active");
	var ref = window.open('http://mobile.meteofrance.com/france/ville/lourdes/65100', '_blank');
}
function qrCode() {
	if(isIos() || isAndroid())
		launchBarcodeScanner();
	else
		alert(lang[langencours][30]);
}

function contact() {
	if (navigator.onLine) {
		if($('#contactEmail').val() == "") {
			alert(langContact[langencours][1]);
		} else if($('#contactMessage').val() == "") {
			alert(langContact[langencours][2]);
		} else {
			$.blockUI({ message: '<h1>'+lang[langencours][2]+'</h1><img src="settings/themes/'+_Theme+'/images/loader.gif" />'});
			$.ajax({
				 type: "POST",
				 url: _UrlWebApp+"/webservice/contact/receiveform.php",
				 data: {
					 contactNom: $('#contactNom').val(),
					 contactPrenom: $('#contactPrenom').val(),
					 contactAdresse: $('#contactAdresse').val(),
					 contactAdresseCp: $('#contactAdresseCp').val(),
					 contactAdresseVille: $('#contactAdresseVille').val(),
					 contactTelephone: $('#contactTelephone').val(),
					 contactEmail: $('#contactEmail').val(),
					 contactMessage: $('#contactMessage').val()
				 }
				 }).done(function( msg ) {
						 $.blockUI({ message: '<h1>'+langContact[langencours][3]+'</h1>'});
						 setTimeout($.unblockUI, 2000);
			});
		}
	} else {
		alert(lang[langencours][24]); 
	}
}

function facebook() {
	event.preventDefault();
	$(".homeButton").removeClass("active");
	var ref = window.open('https://www.facebook.com/daxlaferia', '_blank');
}

function slider(id) {
	if(id=="slider_photomaton") {
		$('#cat65 #content').height(window.innerHeight);
		$('#cat65 #content #contentPhotoMaton').height(window.innerHeight-44);
	}
	
    $('#'+id).iosSlider({
                        scrollbar: true,
                        snapToChildren: true,
                        desktopClickDrag: true,
                        scrollbarMargin: '5px 40px 0 40px',
                        scrollbarBorderRadius: 0,
                        scrollbarHeight: '2px',
                        navPrevSelector: $('.prevButton'),
                        navNextSelector: $('.nextButton'),
                        responsiveSlideContainer: false,
						responsiveSlides: false
                        });
}

function findMe() {
    event.preventDefault();
    if (typeof(device) != 'undefined') {
        
    	var onSuccessSmsGeolocation = function(position) {
    		var args = {};
            args.body = "Je suis ici : http://maps.google.com/?q="+position.coords.latitude+","+position.coords.longitude+" ! Rejoins-moi !";
    		if (isIos()) {
            	cordova.exec(null, null, "SMSComposer", "showSMSComposer",[args]);
        	} else if (isAndroid()) {
            	window.location.href = "sms:?body="+args.body;
        	}
        };
        
        function onErrorSmsGeolocation(error) {
            navigator.notification.alert("Impossible de localiser votre appareil.");
        }
        
        navigator.geolocation.getCurrentPosition(onSuccessSmsGeolocation, onErrorSmsGeolocation);
    } else {
        navigator.notification.alert("Ce module n'est disponible que sur mobile");
    }
}


var _Theme="theme_1";
var _LanguePrete=new Array("fr");
//var _LanguePrete=new Array("fr");
var _LangueDefaut="fr";
var _VersionFramework="6_0_0_1";
var _UrlWebApp="http://dax.blueapps.com";

//galerie photo mise en avant premiere Photo
var _galeriePhotoUne=true;

// Fond écran local
var _fondEcranLocal=new Array();
_fondEcranLocal["fr"]=new Array("fond","fond_menu","fond_categorie","fond_liste","fond_detail");
//_fondEcranLocal["fr"]=new Array();

//Article sur la homePage
var _HomeArt=new Array();
_HomeArt["fr"]=new Array("cat50","10");
/*_HomeArt["en"]=new Array("cat4","10");*/

//Galerie photo sur la homePage
var _HomegaleriePhoto=new Array();
/*_HomegaleriePhoto["fr"]=new Array("cat13","SYNC8");
_HomegaleriePhoto["en"]=new Array("cat5","SYNC1");
_HomegaleriePhoto["nl"]=new Array("cat5","SYNC1");*/


//Flash actu sur la homePage
var _LoadModuleMarquee=false;
var _HomeFlashActu=new Array();
/*_HomeFlashActu["fr"]=new Array("cat3");
_HomeFlashActu["en"]=new Array("cat4");*/

//module Jeux
var _LoadModuleSnapfit = false;

//Module Plan 3D
var _LoadModulePlan3D = true;

//Shoot'n'Send
var _ConfigSNS = new Array();
_ConfigSNS[0] = {
    type:"mailBox",
    calque:"settings/themes/"+_Theme+"/images/sns/sn0.png",
    recipient:[],
    cc:["appliferia@gmail.com"],
    subject:"ShootnSend Postcard",
    content:{
        fr:"Bonjour, <br /> \
        Un(e) ami(e) vous a envoyé une photo via l'application mobile #NOMAPP. <br /> \
        Pour visualiser la localisation de cette photo, veuillez cliquer <a href='http://maps.google.com/maps?q=#LATITUDE,#LONGITUDE'>ici</a> <br /><br /> \
        #URLGOOGLEPLAY<br /> \
        #URLAPPSTORE<br /> \
        ",
        en:"THIS IS A TEST",
        nl:"VLICHTIG BOCH TESTIEREN"
    },
    htmlMailField:"sns_email0",
    htmlCommentField:"sns_commentaires0",
	htmlSNSSendPicture:"SNSSendPicture1",
	htmlSNSAddCC:"SNSAddCC1"
};
_ConfigSNS[1] = {
    type:"mailBox",
    calque:"settings/themes/"+_Theme+"/images/sns/sn1.png",
    recipient:[],
    cc:["appliferia@gmail.com"],
    subject:"ShootnSend Postcard",
    content:{
        fr:"Bonjour, <br /> \
        Un(e) ami(e) vous a envoyé une photo via l'application mobile #NOMAPP. <br /> \
        Pour visualiser la localisation de cette photo, veuillez cliquer <a href='http://maps.google.com/maps?q=#LATITUDE,#LONGITUDE'>ici</a> <br /><br /> \
        #URLGOOGLEPLAY<br /> \
        #URLAPPSTORE<br /> \
        ",
        en:"THIS IS A TEST",
        nl:"VLICHTIG BOCH TESTIEREN"
    },
    htmlMailField:"sns_email1",
    htmlCommentField:"sns_commentaires1",
	htmlSNSSendPicture:"SNSSendPicture1",
	htmlSNSAddCC:"SNSAddCC1"
};
_ConfigSNS[2] = {
    type:"mailBox",
    calque:"settings/themes/"+_Theme+"/images/sns/sn2.png",
    recipient:[],
    cc:["appliferia@gmail.com"],
    subject:"ShootnSend Postcard",
    content:{
		fr:"Bonjour, <br /> \
		Un(e) ami(e) vous a envoyé une photo via l'application mobile #NOMAPP. <br /> \
		Pour visualiser la localisation de cette photo, veuillez cliquer <a href='http://maps.google.com/maps?q=#LATITUDE,#LONGITUDE'>ici</a> <br /><br /> \
		#URLGOOGLEPLAY<br /> \
		#URLAPPSTORE<br /> \
		",
		en:"THIS IS A TEST",
		nl:"VLICHTIG BOCH TESTIEREN"
    },
    htmlMailField:"sns_email2",
    htmlCommentField:"sns_commentaires2",
	htmlSNSSendPicture:"SNSSendPicture1",
	htmlSNSAddCC:"SNSAddCC1"
};

var imgPlanArray = new Array();
imgPlanArray["fr"] = new Array();
//imgPlanArray["en"] = new Array();
var imgPlanLandmarksArray = new Array();
imgPlanLandmarksArray["fr"] = new Array(); 
//imgPlanLandmarksArray["en"] = new Array();


//EXEMPLE PLAN 3D FR
imgPlanArray["fr"]['cat8'] = {
    width: "873px",
    height: "1010px",
	nomFichier: "planappli_dax.png",
	zoomMin: 0,
	zoomMax: 150,
	initialZOOM : 0,
	PlanSansPoi : 1
}

imgPlanLandmarksArray["fr"]['cat8'] = new Array();
/*
imgPlanLandmarksArray["fr"]['cat8'][0] = new Array();
imgPlanLandmarksArray["fr"]['cat8'][0]['id'] = "SYNC9";
imgPlanLandmarksArray["fr"]['cat8'][0]['x'] = "345";
imgPlanLandmarksArray["fr"]['cat8'][0]['y'] = "682";
imgPlanLandmarksArray["fr"]['cat8'][0]['label'] = "1";
imgPlanLandmarksArray["fr"]['cat8'][0]['text'] = "";

imgPlanLandmarksArray["fr"]['cat8'][1] = new Array();
imgPlanLandmarksArray["fr"]['cat8'][1]['id'] = "SYNC10";
imgPlanLandmarksArray["fr"]['cat8'][1]['x'] = "284";
imgPlanLandmarksArray["fr"]['cat8'][1]['y'] = "714";
imgPlanLandmarksArray["fr"]['cat8'][1]['label'] = "2";
imgPlanLandmarksArray["fr"]['cat8'][1]['text'] = "";




// eXEMPLE PLAN 2D
imgPlanArray["fr"]['cat34'] = {
    width: "1600px",
    height: "1112px",
	nomFichier: "plan.jpg",
	zoomMin: 0,
	zoomMax: 150,
	initialZOOM : 50
}

imgPlanLandmarksArray["fr"]['cat34'] = new Array();

imgPlanLandmarksArray["fr"]['cat34'][0] = new Array();
imgPlanLandmarksArray["fr"]['cat34'][0]['id'] = "SYNC13";
imgPlanLandmarksArray["fr"]['cat34'][0]['x'] = "587";
imgPlanLandmarksArray["fr"]['cat34'][0]['y'] = "770";
imgPlanLandmarksArray["fr"]['cat34'][0]['label'] = "7";
imgPlanLandmarksArray["fr"]['cat34'][0]['text'] = "";

imgPlanLandmarksArray["fr"]['cat34'][1] = new Array();
imgPlanLandmarksArray["fr"]['cat34'][1]['id'] = "SYNC14";
imgPlanLandmarksArray["fr"]['cat34'][1]['x'] = "590";
imgPlanLandmarksArray["fr"]['cat34'][1]['y'] = "695";
imgPlanLandmarksArray["fr"]['cat34'][1]['label'] = "8";
imgPlanLandmarksArray["fr"]['cat34'][1]['text'] = "";


// EXEMPLE PLAN 2D ANGLAIS
imgPlanArray["en"]['cat13'] = {
    width: "1600px",
    height: "1112px",
	nomFichier: "plan.jpg",
	zoomMin: 0,
	zoomMax: 150,
	initialZOOM : 50
}


imgPlanLandmarksArray["en"]['cat13'] = new Array();

imgPlanLandmarksArray["en"]['cat13'][0] = new Array();
imgPlanLandmarksArray["en"]['cat13'][0]['id'] = "SYNC2";
imgPlanLandmarksArray["en"]['cat13'][0]['x'] = "587";
imgPlanLandmarksArray["en"]['cat13'][0]['y'] = "770";
imgPlanLandmarksArray["en"]['cat13'][0]['label'] = "7";
imgPlanLandmarksArray["en"]['cat13'][0]['text'] = "";

imgPlanLandmarksArray["en"]['cat13'][1] = new Array();
imgPlanLandmarksArray["en"]['cat13'][1]['id'] = "SYNC3";
imgPlanLandmarksArray["en"]['cat13'][1]['x'] = "590";
imgPlanLandmarksArray["en"]['cat13'][1]['y'] = "695";
imgPlanLandmarksArray["en"]['cat13'][1]['label'] = "8";
imgPlanLandmarksArray["en"]['cat13'][1]['text'] = "";*/


// Fonction appelÃ© lors du lancement de l'application
// Initialise la langue, tÃ©lÃ©charge le bind et le contenu des categories
// Et lance le framework 
function appInit(isaffichecontenu) {
	console.log("appInit");
	if(_LanguePrete.inArray(langencours) && langencours!='fr') {
		var urlContenu=_UrlWebApp+"/photos/contenu_"+_VersionFramework+"_"+langencours+".json";
		var urlBind=_UrlWebApp+"/photos/bind_"+_VersionFramework+"_"+langencours+".html";
		var urlMap=_UrlWebApp+"/photos/map_"+_VersionFramework+"_"+langencours+".json";
		/*if(retournePage()=="index") {
			console.log('index_'+langencours+'.html');
			window.location.href='index_'+langencours+'.html'; 
			return;
		}*/
	} else {
		/*if(retournePage()!="index")Â  {
			window.location.href='index.html'; 
			return;
		}*/
		var urlContenu=_UrlWebApp+"/photos/contenu_"+_VersionFramework+".json";
		var urlBind=_UrlWebApp+"/photos/bind_"+_VersionFramework+".html";
		var urlMap=_UrlWebApp+"/photos/map_"+_VersionFramework+".json";
	}
	downloadUrlArray=new Array(urlContenu,urlBind,urlMap); 
	Core.init();
	
	slider("slider_home");
	
    $('#cat65').bind('pageAnimationEnd', function(e, info){
        if (info.direction == 'in') {
            slider("slider_photomaton");
        }
    });
}

var langContact=new Array("");
langContact["fr"]=new Array("");
langContact["en"]=new Array("");
langContact["nl"]=new Array("");


langContact["fr"][1]="Veuillez remplir votre email";
langContact["fr"][2]="Veuillez remplir un message";
langContact["fr"][3]="Votre demande a bien été envoyé !";

langContact["en"][1]="Please fill in your email";
langContact["en"][2]="Please fill in your reviews";
langContact["en"][3]="Your request has been sent !";




//remplacement des textes non traduit par les textes français
for(var i=0;i<langContact["fr"].length;i++){
  if (typeof(langContact["en"][i])=='undefined') langContact["en"][i]=langContact["fr"][i] ;
  if (typeof(langContact["nl"][i])=='undefined') langContact["nl"][i]=langContact["fr"][i] ;
}








