



                    var selectField = document.getElementById('tarifPlein');
					selectField.addEventListener('touchstart' /*'mousedown'*/, function(e) {
						e.stopPropagation();
					}, false);
                    



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
					 contactTelephone: $('#contactTelephone').val(),
					 contactEmail: $('#contactEmail').val(),
					 contactTitre: $('#contactTitre').val(),
					 contactDateSouhait: $('#contactDateSouhait').val(),
					 contactDateRepli: $('#contactDateRepli').val(),
					 tarifPlein: $('#tarifPlein').val(),
					 moins18: $('#moins18').val(),
					 de18a25: $('#de18a25').val(),
					 plusde65: $('#plusde65').val(),
					 minimiaSociaux: $('#minimiaSociaux').val(),
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

function slider(id) {
    $('#'+id).iosSlider({
        scrollbar: true,
        snapToChildren: true,
        desktopClickDrag: true,
        scrollbarMargin: '5px 40px 0 40px',
        scrollbarBorderRadius: 0,
        scrollbarHeight: '2px',
        navPrevSelector: $('.prevButton'),
        navNextSelector: $('.nextButton')
    });
}


function overlayDetailPoi(results) {
	var row = results.rows.item(0);
	/*
	if(arborescence=="cat3" || arborescence=="cat4" || arborescence=="cat24" || arborescence=="cat25" || arborescence=="cat26") {
		$(".bouton_content").css('display','none');
		$(".ui-tabs-nav").css('display','none');
	}
	*/
	$(".bouton_content").on("click",function() {
		tabDateSpectacle=$("#datesSpectacle").html().split(",");
		tabMinDate=row['date_debut'].split("-");
		tabMaxDate=row['date_fin'].split("-");
		$( "#contactDateSouhait" ).val("");
		$( "#contactDateSouhait" ).datepicker( "destroy" );
		$( "#contactDateSouhait" ).datepicker({
			minDate: new Date(tabMinDate[0],tabMinDate[1]-1,tabMinDate[2]), 
				maxDate: new Date(tabMaxDate[0],tabMaxDate[1]-1,tabMaxDate[2]), 
			dateFormat : 'dd-mm-yy',
			regional : 'fr',
			beforeShowDay:  closedDays2
	
		});
		$( "#contactDateSouhait" ).on("focus",function() {
			$('input#contactDateSouhait').blur()
		});
		$( "#contactDateRepli" ).val("");
		$( "#contactDateRepli" ).datepicker( "destroy" );
		$( "#contactDateRepli" ).datepicker({
			minDate: new Date(tabMinDate[0],tabMinDate[1]-1,tabMinDate[2]), 
				maxDate: new Date(tabMaxDate[0],tabMaxDate[1]-1,tabMaxDate[2]), 
			dateFormat : 'dd-mm-yy',
			regional : 'fr',
			beforeShowDay:  closedDays2
	
		});	
		$( "#contactDateRepli" ).on("focus",function() {
			$('input#contactDateRepli').blur()
		});
		$("#contactTitre").val(row['titre']);
		var dateSpectacle=$("#datesSpectacle").html();
		$("#contactDateSpectacle").val(dateSpectacle);
		jQT.goBack();
		jQT.goTo("#catReserver");
		
	});
}


function closedDays(date) {
	tabDateSpectacle=$("#datesSpectacle").html().split(",");
		
	$(tabDateSpectacle).each(function(index, element) {
		dateduSpectacle=new Date;
		dateduSpectacle.setTime(element*1000);
        tabDateSpectacle[index]=(dateduSpectacle.getMonth()+1)+"-"+ dateduSpectacle.getDate()+"-"+ dateduSpectacle.getFullYear();
    });
	dateTemp=(date.getMonth()+1)+"-"+ date.getDate()+"-"+ date.getFullYear();
  	if ($.inArray(dateTemp, tabDateSpectacle) == -1) {
		return [false,"",""]; 
  	} else { 
  		return [true, ""];
	}
}

function closedDays2(date) {
	tabDateSpectacle=$("#contactDateSpectacle").val().split(",");
	$(tabDateSpectacle).each(function(index, element) {
		dateduSpectacle=new Date;
		dateduSpectacle.setTime(element*1000);
        tabDateSpectacle[index]=(dateduSpectacle.getMonth()+1)+"-"+ dateduSpectacle.getDate()+"-"+ dateduSpectacle.getFullYear();
    });
	dateTemp=(date.getMonth()+1)+"-"+ date.getDate()+"-"+ date.getFullYear();
  	if ($.inArray(dateTemp, tabDateSpectacle) == -1) {
		return [false,"",""]; 
  	} else { 
  		return [true, ""];
	}
}


var _Theme="theme_1";
var _LanguePrete=new Array("fr","en","nl");
//var _LanguePrete=new Array("fr");
var _LangueDefaut="fr";
var _VersionFramework="6_0_0_1";
var _UrlWebApp="http://chaillot.blueapps.com";

//galerie photo mise en avant premiere Photo
var _galeriePhotoUne=true;

// Fond écran local
var _fondEcranLocal=new Array();
_fondEcranLocal["fr"]=new Array("fond","fond_menu","fond_categorie","fond_liste","fond_detail");

//Article sur la homePage
var _HomeArt=new Array();
//_HomeArt["fr"]=new Array("cat46","10");
//_HomeArt["en"]=new Array("cat4","10");

//Galerie photo sur la homePage
var _HomegaleriePhoto=new Array();
_HomegaleriePhoto["fr"]=new Array("cat23","SYNC3082");
//_HomegaleriePhoto["en"]=new Array("cat5","SYNC1");
//_HomegaleriePhoto["nl"]=new Array("cat5","SYNC1");


//Flash actu sur la homePage
var _LoadModuleMarquee=false;
var _HomeFlashActu=new Array();
//_HomeFlashActu["fr"]=new Array("cat3");
//_HomeFlashActu["en"]=new Array("cat4");

//module Jeux
var _LoadModuleSnapfit = false;

//Module Plan 3D
var _LoadModulePlan3D = false;

//Shoot'n'Send
var _ConfigSNS = new Array();
_ConfigSNS[0] = {
    type:"direct",
    calque:"none",
    recipient:["jeanjacque@lol.com", "jeanluc@lilol.com"],
    cc:["jeanjacque@lol.com"],
    subject:"",
    content:{
		fr:"",
		en:"",
		nl:""
    },
    htmlMailField:"sns_email0",
    htmlCommentField:"sns_commentaires0"
};
_ConfigSNS[1] = {
    type:"mailBox",
    calque:"none",
    recipient:["bienvenue@blueapps.fr", "bienvenue@blueapps.fr"],
    cc:["bienvenue@blueapps.fr"],
    subject:"ShootnSend Alert",
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
	htmlSNSSavePicture:"SNSSavePicture1",
	htmlSNSSendPicture:"SNSSendPicture1",
	htmlSNSAddGalerie:"SNSAddGalerie1"
};
_ConfigSNS[2] = {
    type:"direct",
    calque:"settings/themes/"+_Theme+"/images/sns/sn1.png",
    recipient:["jeanjacque@lol.com", "jeanluc@lilol.com"],
    cc:["jeanjacque@lol.com"],
    subject:"",
    content:{
		fr:"",
		en:"",
		nl:""
    },
    htmlMailField:"sns_email2",
    htmlCommentField:"sns_commentaires2"
};
_ConfigSNS[3] = {
    type:"mailBox",
    calque:"settings/themes/"+_Theme+"/images/sns/sn1.png",
    recipient:["bienvenue@blueapps.fr", "bienvenue@blueapps.fr"],
    cc:["bienvenue@blueapps.fr"],
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
    htmlMailField:"sns_email3",
    htmlCommentField:"sns_commentaires3"
};

var imgPlanArray = new Array();
imgPlanArray["fr"] = new Array();
imgPlanArray["en"] = new Array();
var imgPlanLandmarksArray = new Array();
imgPlanLandmarksArray["fr"] = new Array(); 
imgPlanLandmarksArray["en"] = new Array(); 


//EXEMPLE PLAN 3D FR
imgPlanArray["fr"]['cat26'] = {
    width: "1000px",
    height: "814px",
	nomFichier: "plan.png",
	zoomMin: 0,
	zoomMax: 150,
	initialZOOM : 50,
	PlanSansPoi : 1
}

imgPlanLandmarksArray["fr"]['cat26'] = new Array();

imgPlanLandmarksArray["fr"]['cat26'][0] = new Array();
imgPlanLandmarksArray["fr"]['cat26'][0]['id'] = "SYNC9";
imgPlanLandmarksArray["fr"]['cat26'][0]['x'] = "345";
imgPlanLandmarksArray["fr"]['cat26'][0]['y'] = "682";
imgPlanLandmarksArray["fr"]['cat26'][0]['label'] = "1";
imgPlanLandmarksArray["fr"]['cat26'][0]['text'] = "";

imgPlanLandmarksArray["fr"]['cat26'][1] = new Array();
imgPlanLandmarksArray["fr"]['cat26'][1]['id'] = "SYNC10";
imgPlanLandmarksArray["fr"]['cat26'][1]['x'] = "284";
imgPlanLandmarksArray["fr"]['cat26'][1]['y'] = "714";
imgPlanLandmarksArray["fr"]['cat26'][1]['label'] = "2";
imgPlanLandmarksArray["fr"]['cat26'][1]['text'] = "";




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
imgPlanLandmarksArray["en"]['cat13'][1]['text'] = "";


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








