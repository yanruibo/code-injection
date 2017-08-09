










var point="";

function affichePoints(mot,point) {
	if (point=="")
	  {
	  point=4;
	  }
	else {
	  point--;
	}
	if (point==0) {point=4;}
	console.log("point :"+point);
	var numero;
	numero=$(mot).attr("id").substr(3,2);
	$("#point"+numero).html(point);//affiche les points pour le mot
	reste=point-1;//nombre de points restant à affecter
	if (reste==0) {reste=4;}//on remet les 4 points ce qui permet de changer d'avis
	$("span[id*='affecter']").html(" "+reste+" ");//affiche les points pour le prochain mot
	if (reste==1) {$("span[id*='pluriel']").html("");} //gestion du pluriel, on enlève le s à 1 point restant
	if (reste==4) {$("span[id*='pluriel']").html("s");} // gestion du pluriel, on remet le s
	return point;
}

function calculeScores() {
	ec=Number($("#point5").html())+Number($("#point9").html())+Number($("#point13").html())+Number($("#point17").html())+Number($("#point25").html())+Number($("#point29").html());
	or=Number($("#point2").html())+Number($("#point10").html())+Number($("#point22").html())+Number($("#point26").html())+Number($("#point30").html())+Number($("#point34").html());
	ca=Number($("#point7").html())+Number($("#point11").html())+Number($("#point15").html())+Number($("#point19").html())+Number($("#point31").html())+Number($("#point35").html());
	ea=Number($("#point4").html())+Number($("#point12").html())+Number($("#point24").html())+Number($("#point28").html())+Number($("#point32").html())+Number($("#point36").html());
	ca_moins_ec=ca-ec;
	ea_moins_or=ea-or;
	console.log("ca_moins_ec : "+ca_moins_ec);//ajoute cette différence dans la console javascript
	console.log("ea_moins_or : "+ea_moins_or);
	var profil="";
	if (ca_moins_ec>=3 && ea_moins_or>=3) {profil="Convergent";}
	if (ca_moins_ec>=3 && ea_moins_or<=2) {profil="Assimilateur";}
	if (ca_moins_ec<=3 && ea_moins_or<=2) {profil="Divergent";}
	if (ca_moins_ec<=3 && ea_moins_or>=3) {profil="Accomodateur";}
	console.log("profil : "+profil);
	if (profil=="") {profil="Impossible à déterminer";}
	$("#score_ec").html(ec);
	$("#score_or").html(or);	
	$("#score_ca").html(ca);
	$("#score_ea").html(ea);
	$("#profil").html(profil);
}

function afficheProfil() {
	profil=$("#profil").html();
	location.href="./index.html#"+profil;
}

function shareProfile() {
	//var share = new Share();
	profil=$("#profil").html();
	window.plugins.share.show({
	    subject: "Mon profil d'apprentissage",
	    text: 'J\'ai réalisé un test CMA sur bolli.fr/cma pour décrire ma manière d\'apprendre et mon profil est '+profil},
	    function() {}, // Success function
	    function() {alert('Share failed')} // Failure function

	);
}


$( document ).ready( function() {
	 
	  //largeur du menu de bas de page = largeur de la page
	  var largeur=$(window).width();
	  $(".localnav").css("width",largeur);
	  //On modifie la largeur du footer quand on redimensionne la page
	  $(window).resize(function(event) {
		  largeur=$(window).width();
		  $(".localnav").css("width",largeur);
	  });
	  
	  $("div.mot").click(function(event) {
		 point=affichePoints(this,point);
	  });
	  
	  $("#btn_calculer").click(function(event) {
		 result=calculeScores(); 
	  });
	  
	  $("#btn_profil").click(function(event) {
		  result=afficheProfil();
	  });
	  
	  $("#btn_partager").click(function(event) {
		  result=shareProfile();
	  });
	  
	  $('.quit').click(function(event){
		  console.log("bye bye !");
			navigator.app.exitApp();
		});
	  
	  //Google Analytics
	  $.ga.load("UA-135702-3");
	  
	  //bouton j'aime facebook
	  $('#fbjlike').fbjlike({
			//appID: 'xxxxxxxxxxxxxxx',
			//userID: '000000000000000',
			siteTitle: "Ma manière d'apprendre : test CMA",
			siteName: 'bolli.fr',
			//siteImage: 'An individual image',
			buttonWidth: 300,
			buttonHeight: 60,
			showfaces: true,
			send:false,
			comments:true,
			numPosts:10,
			font: 'lucida grande',
			layout: 'button_count',	//box_count|button_count|standard
			action: 'like',		//recommend|like
			colorscheme: 'light',
			lang: 'fr_FR',
			hideafterlike:false,
			googleanalytics:false,	//true|false
			//googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
			onlike: "$.cookie('liked','liked');",
			onunlike: "$.cookie('liked','unliked');"
	  });
	  
	  //bouton google+1
	  $('#gplusone').gplusone({
			mode: 'insert',				//insert|append  
			size: 'medium',			//small|medium|standard|tall
			count: true,				//true|false
			href: false,				//false|url
			lang: 'fr-FR',				//en-US|en-GB|de|es|fr|...
			hideafterlike:false,		//true|false
			onlike: "$.cookie('gliked','liked',{expires: 999});",
			onunlike: "$.cookie('gliked','unliked',{expires: 999});"
		});
	  
	  //bouton twitter
	  $('#twitterbutton').twitterbutton({
		  	user: 'alainbolli',
			user_description: 'Passionné par le numérique qui se partage ...',
			url: 'http://www.bolli.fr/cma',
			//count_url: 'http://www.a-differing-url-from-the-tweeted-one.com',
			title: "Décrire ma manière d'apprendre avec un test CMA",
			mode: 'insert',
			layout: 'horizontal', //vertical|horizontal|none
			action: 'tweet',		//tweet|follow
			lang: 'fr',					//en|de|ja|fr|es
			hideafterlike:false,
			googleanalytics:false,							//true|false
			//googleanalytics_obj: 'pageTracker',	//pageTracker|_gaq
			ontweet: function(response){$.cookie('tw','tweeted',{expires: 999});},
			onretweet: function(response){$.cookie('tw','retweeted',{expires: 999});},
			onfollow: function(response){$.cookie('tw','followed',{expires: 999});}

		});
	  
	});

/*!
 * http://www.shamasis.net/projects/ga/
 * Refer jquery.ga.debug.js
 * Revision: 13
 */
(function($){$.ga={};$.ga.load=function(uid,callback){jQuery.ajax({type:'GET',url:(document.location.protocol=="https:"?"https://ssl":"http://www")+'.google-analytics.com/ga.js',cache:true,success:function(){if(typeof _gat==undefined){throw"_gat has not been defined";}t=_gat._getTracker(uid);bind();if($.isFunction(callback)){callback(t)}t._trackPageview()},dataType:'script',data:null})};var t;var bind=function(){if(noT()){throw"pageTracker has not been defined";}for(var $1 in t){if($1.charAt(0)!='_')continue;$.ga[$1.substr(1)]=t[$1]}};var noT=function(){return t==undefined}})(jQuery);

/**
*
* Phonegap share plugin for Android
* Kevin Schaul 2011
*
*/

var Share = function() {};
            
Share.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Share', '', [content]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.share) {
    window.plugins.share = new Share();
}


