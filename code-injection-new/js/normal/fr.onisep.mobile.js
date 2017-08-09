


































































































































/*=======================================================================================*/
/*|                      Fonction d'affichage de la fiche métier                        |*/
/*=======================================================================================*/


$(document).on("pageshow", "#favoris", function() {	
favoris();

});


function favoris(){
		$("#favoris .contenu .zonehaut").empty();
		$.mobile.showPageLoadingMsg();	

	
 
		//affichage des informations
		var contenu ="";		
						
		contenu+= '<li data-role="list-divider" class="ui-bar-d" ><b>Métier(s) : </b></li>';
	
		var cookiemetiers = $.cookie('metiers');
		//Load the items or a new array if null.
		var itemsmetiers = cookiemetiers ? cookiemetiers.split(/,/) : new Array();

		var nbm = 0;
	
		$.each( itemsmetiers, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		if(nbm/2 == Math.round(nbm/2))							 						 
		contenu+='<li data-theme="e"><a style=" white-space: normal;" href="metiers.html?idmetier='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="metiers.html?idmetier='+o[1]+'" >'+oname+'</a></li>';
  		nbm++;
		
		});		
		
		
		contenu+= '<li data-role="list-divider" class="ui-bar-d"><b>Formation(s) : </b></li>';
	
		var cookieforma = $.cookie('formation');
		//Load the items or a new array if null.
		var itemsforma = cookieforma ? cookieforma.split(/,/) : new Array();

		var nbf = 0;
		$.each( itemsforma, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		
		if(nbf/2 == Math.round(nbf/2))							 						 
		contenu+='<li data-theme="e"><a style=" white-space: normal;" href="formation.html?idforma='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="formation.html?idforma='+o[1]+'" >'+oname+'</a></li>';
  		nbf++;
		
		});		
		
		
		
		contenu+= '<li data-role="list-divider" class="ui-bar-d"><b>Etablissement(s) : </b></li>';
	
		var cookieetab = $.cookie('etab');
		//Load the items or a new array if null.
		var itemsetab = cookieetab ? cookieetab.split(/,/) : new Array();

		var nbfet= 0;
	
		$.each( itemsetab, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		if(nbfet/2 == Math.round(nbfet/2))							 						 
		contenu+='<li data-theme="e"><a style=" white-space: normal;" href="etablissement.html?idetab='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="etablissement.html?idetab='+o[1]+'" >'+oname+'</a></li>';
		nbfet++;
		
	   
		});		
		
		

		
		//creation de la liste
		$('<ul />', {'class': 'liste','data-role':'listview',html: contenu} ).appendTo('#favoris .contenu .zonehaut');
		//Prise en compte de la liste par JQM 
		$('#favoris .contenu .zonehaut .liste').listview();
		$('#favoris .contenu .zonehaut .liste').listview('refresh');
											
  		//suppressio du loader
		$.mobile.hidePageLoadingMsg();
		



	
	
	
}




 




var offset=new Number(0),pager=null,pagel=null,bouton_page=null,siteBaseURLVideo="http://www.onisep.fr/",siteBaseURL=siteBaseURLVideo+"mobile",menu="",latitude=0,longitude=0;function mapposition(){navigator.geolocation?(navigator.geolocation.getCurrentPosition(positionSuccess,positionError),$("#rechercheGeoloc #geolocalisationdept").empty(),$("#rechercheGeoloc #geolocalisationdept").prepend("<h3>G\u00e9olocalisation en cours <img src='img/loading.gif'/></h3>")):positionError(-1)}
function positionSuccess(b){var a=b.coords.latitude,e=b.coords.longitude;b=new google.maps.LatLng(a,e);(new google.maps.Geocoder).geocode({latLng:b},function(b,g){if(g==google.maps.GeocoderStatus.OK&&b[0]){for(var h=b[0].address_components[3].long_name,d=a+","+e,p="",m=0;m<b[0].address_components.length;m++)"postal_code"==b[0].address_components[m].types[0]&&(p=b[0].address_components[m].long_name);$("#rechercheGeoloc #codePostal").attr("value",p);$("#rechercheGeoloc #adressecomplete").attr("value",
d);$("#rechercheGeoloc #geolocalisationdept").empty();$("#rechercheGeoloc #geolocalisationdept").prepend("Vous \u00eates localis\u00e9 : <h3>"+h+"</h3>")}})}function positionError(b){$("#rechercheGeoloc #codePostal").attr("value","");$("#rechercheGeoloc #adressecomplete").attr("value","");$("#rechercheGeoloc #geolocalisationdept ").empty();$("#rechercheGeoloc #geolocalisationdept ").prepend("<h3>Vous n'avez pas pu \u00eatre localis\u00e9</h3>");$("#rechercheGeoloc .loader").remove()}
function formatSearchVariable(){var b=$.getUrlVar("univers"),a=Number($.getUrlVar("offset")),e=siteBaseURL+"/recherche/onisep/",e=e+("all"==b?"":b)+"/";if(""!=b){$("#resultatrecherchelibre .contenuliste").empty();$("#resultatrecherchelibre .contenu").hide();var f=$.getUrlVar("tri_metiers");switch(b){case "all":b=$.getUrlVar("inputLibre");e=e+"(term)/"+b+"/(offset)/"+a;break;case "metier":if(1==f)b=$.getUrlVar("oni_select_secteurs_professionnels"),e=e+"(attr)/attr_secteurs_activite_t:"+b+"/(offset)/"+
a;else if(2==f)b=$.getUrlVar("oni_select_contres_interets"),$.getUrlVar("attr_centres_interet_t")&&(b=$.getUrlVar("attr_centres_interet_t")),e=e+"(attr)/attr_centres_interet_t:"+b+"/(offset)/"+a;else if(3==f)var g=$.getUrlVar("oni_nom_metier2"),e=e+"(term)/"+g+"/(offset)/"+a;break;case "formation":var g=$.getUrlVar("attr_niveau_enseignement_t"),h=$.getUrlVar("domain_select"),b=$.getUrlVar("region_select"),f=$.getUrlVar("dpt_select"),d="attr_regions_t:"+b;""!=f&&(d="attr_departements_t:"+f);e=e+"(attr)/attr_niveau_enseignement_t:"+
g+"/(depReg)/"+d+"/(domaine)/attr_domaines_t:"+h+"/(offset)/"+a;break;case "etab":d=$.getUrlVar("codePostal");$.getUrlVar("adressecomplete");g=$.getUrlVar("imputGeoloc");f=$.getUrlVar("dpt_select");b=$.getUrlVar("region_select");""!=f&&""!=d&&(d="");""!=b&&""!=d&&(d="");""==d?(d="attr_region_t:"+b,""==b&&(d="attr_departement_t:"+f),e=e+"(term)/"+g+"/(depReg)/"+d+"/(offset)/"+a):e=e+"(term)/"+g+"/(codepostal)/"+d+"/(offset)/"+a;break;case "formation_etab":b=$.getUrlVar("formationid");e=e+"(nodeId)/"+
b+"/";f=$.getUrlVar("dpt_select");b=$.getUrlVar("region_select");d="";""!=f&&(d="attr_departement_t:"+f);""!=b&&(d="attr_region_t:"+b);e=e+"/(depReg)/"+d+"/(offset)/"+a;break;case "video":b=$.getUrlVar("oni_select_secteurs_professionnels_video"),f=$.getUrlVar("oni_nom_metier2_video"),d="","00"==b&&(b=""),""!=b&&(d="attr_secteurs_t:"+b),e=e+"(term)/"+f+"/(domaine)/"+d+"/(offset)/"+a}}return e}
$(document).on("pageinit","#rechercheGeoloc",function(){mapposition();var b="";$('#rechercheGeoloc select[name="region_select"]').change(function(){var a=$("#rechercheGeoloc select#dpt_select");a[0].selectedIndex=0;a.selectmenu("refresh");$rg="Inconnu";""!=$(this).find("option:selected").val()&&(b=$(this).find("option:selected").text(),$("#rechercheGeoloc #codePostal").attr("value",""),$("#rechercheGeoloc #adressecomplete").attr("value",""),$("#rechercheGeoloc #geolocalisationdept").empty(),$("#rechercheGeoloc #geolocalisationdept").prepend("Vous avez choisi la r\u00e9gion :  <h3>"+
b+"</h3>"))});$('#rechercheGeoloc select[name="dpt_select"]').change(function(){var a=$("#rechercheGeoloc select#region_select");a[0].selectedIndex=0;a.selectmenu("refresh");$rg="Inconnu";""!=$(this).find("option:selected").val()&&(b=$(this).find("option:selected").text(),$("#rechercheGeoloc #codePostal").attr("value",""),$("#rechercheGeoloc #adressecomplete").attr("value",""),$("#rechercheGeoloc #geolocalisationdept").empty(),$("#rechercheGeoloc #geolocalisationdept").prepend("Vous avez choisi le d\u00e9partement : <h3>"+
b+"</h3>"))})});
$(document).on("pagebeforeshow","#formation",function(){$('input[name="attr_niveau_enseignement_t"]').change(function(){if("5"==$(this).filter(":checked").val()){$("#formation #dpt_select_forma").attr("style","display:block;");$("#formation #region_select_forma").attr("style","display:none;");$("#formation #domain_select_forma").attr("style","display:block;");var b=$("#formation select#region_select");b[0].selectedIndex=0;b.selectmenu("refresh");b=$("#formation select#dpt_select");b[0].selectedIndex=
0;b.selectmenu("refresh");b=$("#formation select#domain_select");b[0].selectedIndex=0;b.selectmenu("refresh")}else b=$("#formation select#region_select"),b[0].selectedIndex=0,b.selectmenu("refresh"),b=$("#formation select#dpt_select"),b[0].selectedIndex=0,b.selectmenu("refresh"),b=$("#formation select#domain_select"),b[0].selectedIndex=0,b.selectmenu("refresh"),$("#formation #dpt_select_forma").attr("style","display:none;"),$("#formation #region_select_forma").attr("style","display:block;"),$("#formation #domain_select_forma").attr("style",
"display:block;")})});
$(document).on("pagecreate","#formation",function(){$("#rechercheforma").submit(function(b){if("5"==$('input[name="attr_niveau_enseignement_t"]').filter(":checked").val()){if(""==$("#formation #domain_select").val())return alert("Veuillez s\u00e9lectionner un domaine"),!1;if(""==$("#formation #dpt_select").val())return alert("Veuillez s\u00e9lectionner un d\u00e9partement"),!1}if("8"==$('input[name="attr_niveau_enseignement_t"]').filter(":checked").val()){if(""==$("#formation #domain_select").val())return alert("Veuillez s\u00e9lectionner un domaine"),!1;
if(""==$("#formation #region_select").val())return alert("Veuillez s\u00e9lectionner une r\u00e9gion"),!1}})});
$(document).on("pagebeforeshow","#metier",function(){"1"!=$('input[name="tri_metiers"]').filter(":checked").val()&&("2"!=$('input[name="tri_metiers"]').filter(":checked").val()&&"3"!=$('input[name="tri_metiers"]').filter(":checked").val())&&($("#metier #oni_select_secteurs_professionnels_me select").selectmenu("disable"),$("#metier #oni_select_contres_interets_me select").selectmenu("disable"),$("#metier #boutonmetiers input").textinput("disable"));$('input[name="tri_metiers"]').change(function(){var b=
$(this).filter(":checked").val();"1"==b?($("#metier .boutontravail").attr("style","border: 2px solid #C1D201;"),$("#metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr("style","border: 2px solid #C1D201;"),$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr("style",""),$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr("style",""),$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr("class",
"ui-btn-text"),$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #boutonmetiers span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #oni_select_secteurs_professionnels_me select").selectmenu("enable"),$("#metier #oni_select_contres_interets_me select").selectmenu("disable"),$("#metier #boutonmetiers input").textinput("disable"),$("#oni_nom_metier2").val(""),$("#metier .boutonjaime span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),
$("#metier .boutonlibre span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier .boutontravail span.ui-btn-text").attr("class","ui-btn-text"),$("#metier #bboutonmetiers").attr("style","display:none;"),$("#metier #bboutonmetierssecteurs").attr("style","display:block;"),$("#metier #bboutonmetiersinterets").attr("style","display:none;")):"2"==b?($("#metier .boutonjaime").attr("style","border: 2px solid #C1D201;"),$("#metier #oni_select_contres_interets_me .ui-btn-up-c").attr("style","border: 2px solid #C1D201;"),
$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr("style",""),$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr("style",""),$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr("class","ui-btn-text "),$("#metier #boutonmetiers span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),
$("#metier #oni_select_secteurs_professionnels_me select").selectmenu("disable"),$("#metier #oni_select_contres_interets_me select").selectmenu("enable"),$("#metier #boutonmetiers input").textinput("disable"),$("#oni_nom_metier2").val(""),$("#metier .boutonjaime span.ui-btn-text").attr("class","ui-btn-text"),$("#metier .boutonlibre span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier .boutontravail span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #bboutonmetiers").attr("style",
"display:none;"),$("#metier #bboutonmetierssecteurs").attr("style","display:none;"),$("#metier #bboutonmetiersinterets").attr("style","display:block;")):($("#metier .boutonlibre").attr("style","border: 2px solid #C1D201;"),$("#metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c ").attr("style","border: 2px solid #C1D201;"),$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr("style",""),$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr("style",
""),$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #boutonmetiers span.ui-btn-text").attr("class","ui-btn-text "),$("#metier #oni_select_secteurs_professionnels_me select").selectmenu("disable"),$("#metier #oni_select_contres_interets_me select").selectmenu("disable"),$("#metier #boutonmetiers input").textinput("enable"),$("#oni_nom_metier2").val(""),
$("#metier .boutonjaime span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier .boutonlibre span.ui-btn-text").attr("class","ui-btn-text"),$("#metier .boutontravail span.ui-btn-text").attr("class","ui-btn-text ui-disabled"),$("#metier #bboutonmetiers").attr("style","display:block;"),$("#metier #bboutonmetierssecteurs").attr("style","display:none;"),$("#metier #bboutonmetiersinterets").attr("style","display:none;"))})});
$(document).on("pagecreate","#metier",function(){$("#recherchemetier").submit(function(b){if("3"==$('input[name="tri_metiers"]').filter(":checked").val()&&""==$("#oni_nom_metier2").val())return alert("Aucun mot cl\u00e9 n'est renseign\u00e9"),!1});$('select[name="oni_select_secteurs_professionnels"]').change(function(){$('select[name="oni_select_secteurs_professionnels"]').val()&&$("#recherchemetier").submit()});$('select[name="oni_select_contres_interets"]').change(function(){$('select[name="oni_select_contres_interets"]').val()&&
$("#recherchemetier").submit()})});function getParameterByName(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");b=RegExp("[\\?&]"+b+"=([^&#]*)");var a=jQuery(location).attr("href");0<a.indexOf("#")&&(a=a.slice(a.indexOf("#")+1));b=b.exec(a);return null==b?!1:decodeURIComponent(b[1].replace(/\+/g," "))}
function extendJquery(){$.extend({getUrlVars:function(){var b=[],a;a=jQuery(location).attr("href");0<a.indexOf("#")&&(a=a.slice(a.indexOf("#")+1));for(var e=a.slice(a.indexOf("?")+1).split("&"),f=0;f<e.length;f++)a=e[f].split("="),b.push(a[0]),b[a[0]]=a[1];return b},getUrlVar:function(b){var a=getParameterByName(b);!1===a&&(a="",null==$.getUrlVars()[b]&&(a=$.getUrlVars()[b]));isNaN(a)&&"offset"==b&&(a=0);"undefined"==typeof a&&(a="");return a}});$(document).ajaxError(function(b,a,e){$.mobile.hidePageLoadingMsg();
$("#resultatrecherchelibre .contenuliste").empty();$("#resultatrecherchelibre .contenuliste").prepend("Erreur de chargement");$("#resultatrecherchelibre .contenu").show();$(".ui-footer").show()})}function resultPageURL(){var b="",a;for(a in $.getUrlVars())isNaN(a)&&"offset"!=a&&(b+=""!=b?"&":"",b+=a+"="+$.getUrlVars()[a]);return"resultats.html?"+b}
$(document).on("pageshow","#resultatrecherchelibre",function(){$("#resultatrecherchelibre .contenuliste").empty();$("#resultatrecherchelibre .contenu").hide();extendJquery();creationListegene()});$(document).on("pagebeforeshow","#resultatrecherchelibre",function(){$("#resultatrecherchelibre .contenuliste").empty();$("#resultatrecherchelibre .contenu").hide();$(".ui-footer").hide()});
function creationListegene(){menu=$.getUrlVar("menu");testmenu(menu);var b=formatSearchVariable(),a=resultPageURL();$.mobile.showPageLoadingMsg();$.getJSON(b,function(b){var f=[],g,h=0,d=Number($.getUrlVar("offset")),p=$.getUrlVar("dpt_select"),m=$.getUrlVar("region_select"),k=$.getUrlVar("inputLibre"),c=$.getUrlVar("oni_nom_metier2"),s=$.getUrlVar("imputGeoloc"),l=$.getUrlVar("oni_nom_metier2_video"),h=d+1,n="",t="",q="",u=b[0].pagecount,r=b[0].count,q=unescape(k?k:c?c:s?s:l?l:""),q=q.replace(/[+]/gi,
" "),q=q.replace("\u00c3\u00a9","\u00e9").replace("\u00e0\u00a9","\u00e9").replace("\u00c3\u00b4","\u00f4").replace("\u00c3\u00a8","\u00e8").replace("\u00c3\u00a7","\u00e7").replace("\u00c3\u00b9","\u00f9").replace("\u00c3","\u00e0"),q=""==q?"":'pour : "'+q+'"';2==r&&b[0].identifiant==b[1].identifiant&&(r=1);3==r&&b[0].identifiant==b[1].identifiant&&(r=2,h=0);2==r&&(b[0].identifiant==b[1].identifiant&&b[0].identifiant==b[2].identifiant)&&(r=1,h=0);20>d?1>=u?f.push('<li data-role="fieldcontain" data-theme="d">Voici le(s) '+
r+" r\u00e9sultat(s)  de votre recherche "+q+"</li>"):f.push('<li data-role="fieldcontain" data-theme="d">Les 20 premiers r\u00e9sultats trouv\u00e9s '+q+"</li>"):(k=r-d,20<=k&&(k=20),1==k&&(k=""),f.push('<li data-role="fieldcontain" data-theme="d">Le(s) '+k+" r\u00e9sultat(s) suivant(s)  "+q+"</li>"));jQuery.each(b,function(a){var c="";if(!(0==h&&2==r)||2==h&&1==r||0==h&&1==r){if("metier"==b[a].classidentifier)n="metiers.html?idmetier",t="M\u00e9tier";else if("formation"==b[a].classidentifier)c=
"&dpt_select="+p+"&region_select="+m,n="formation.html?idforma",t="Formation";else if("lycee"==b[a].classidentifier||"college"==b[a].classidentifier||"ems"==b[a].classidentifier||"postbac"==b[a].classidentifier||"universite"==b[a].classidentifier)n="etablissement.html?idetab",t="Etablissement / "+b[a].departement+"";"webtv_mobile"==b[a].classidentifier?(g=b[a].name.replace("(1)","").replace("(2)","").replace("(3)",""),h/2==Math.round(h/2)?f.push('<li data-theme="e" class="videosrecherche"><a style="white-space: normal;" href="'+
b[a].url_video+'" data-prefetch  class="listeR"><img src="'+siteBaseURLVideo+""+b[a].photo+'" >'+h+" - "+g+"</a></li>"):f.push('<li data-theme="d" class="videosrecherche"><a style=" white-space: normal;" href="'+b[a].url_video+'" data-prefetch  class="listeR"><img src="'+siteBaseURLVideo+""+b[a].photo+'" >'+h+" - "+g+"</a></li>")):h/2==Math.round(h/2)?f.push('<li data-theme="e"><a style=" white-space: normal;" href="'+n+"="+b[a].nodeId+"&menu="+$.getUrlVar("menu")+"&adressecomplete="+$.getUrlVar("adressecomplete")+
c+'" data-prefetch  class="listeR"><strong style="font-size:0.8em">'+h+" - "+t+"</strong><br />  "+b[a].name+"</a></li>"):f.push('<li data-theme="d"><a style=" white-space: normal;" href="'+n+"="+b[a].nodeId+"&menu="+$.getUrlVar("menu")+"&adressecomplete="+$.getUrlVar("adressecomplete")+c+'" data-prefetch  class="listeR"><strong style="font-size:0.8em">'+h+" - "+t+"</strong><br />  "+b[a].name+"</a></li>")}h++});0<r?(20>=r?($("#resultatrecherchelibre #pagel").attr("disabled","disabled"),$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr("class",
"ui-btn-inner ui-corner-left ui-disabled"),$("#resultatrecherchelibre#pager").attr("disabled","disabled"),$("#resultatrecherchelibre #pager span.ui-btn-inner").attr("class","ui-btn-inner ui-corner-right ui-controlgroup-last ui-disabled"),$("#resultatrecherchelibre #pagel").css("display","none"),$("#resultatrecherchelibre #pager").css("display","none")):(q=d+20,k=d-20,0==d?($("#resultatrecherchelibre #pagel").attr("disabled","disabled"),$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr("class",
"ui-btn-inner ui-corner-left ui-disabled"),$("#resultatrecherchelibre #pager").attr("disabled",""),$("#resultatrecherchelibre #pager span.ui-btn-inner").attr("class","ui-btn-inner ui-corner-left"),$("#resultatrecherchelibre #pager").attr("href",a+"&offset="+q)):($("#resultatrecherchelibre #pagel").attr("disabled",""),$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr("class","ui-btn-inner ui-corner-left"),$("#resultatrecherchelibre #pagel").attr("href",a+"&offset="+k),q>=r?($("#resultatrecherchelibre #pager").attr("disabled",
"disabled"),$("#resultatrecherchelibre #pager span.ui-btn-inner").attr("class","ui-btn-inner ui-corner-right ui-controlgroup-last ui-disabled"),$("#resultatrecherchelibre #pager").attr("href","")):($("#resultatrecherchelibre #pager").attr("disabled",""),$("#resultatrecherchelibre #pager span.ui-btn-inner").attr("class","ui-btn-inner ui-corner-left"),$("#resultatrecherchelibre #pager").attr("href",a+"&offset="+q)))),$("#resultatrecherchelibre #bouton_page").attr("style","display:block;"),$("#resultatrecherchelibre #bouton_page .legend").empty(),
$("#resultatrecherchelibre #bouton_page .legend").prepend("<strong>"+r+"</strong> r\u00e9sultat(s) trouv\u00e9(s) "),$("#resultatrecherchelibre .contenu").show(),$("<ul />",{"class":"liste","data-role":"listview",html:f.join("")}).appendTo("#resultatrecherchelibre  .contenuliste"),$("#resultatrecherchelibre .contenuliste .liste").listview(),$("#resultatrecherchelibre .contenuliste .liste").listview("refresh"),$.mobile.hidePageLoadingMsg(),$(".ui-footer").show()):($("#resultatrecherchelibre .contenuliste").empty(),
$("#resultatrecherchelibre .contenuliste").prepend("Aucun r\u00e9sultat"),$("#resultatrecherchelibre .contenu").show(),$.mobile.hidePageLoadingMsg(),$(".ui-footer").show(),$("#resultatrecherchelibre .listeresultat").listview(),$("#resultatrecherchelibre .listeresultat").listview("refresh"))})}$(document).on("pagebeforeshow","#ficheEtablissement",function(){$("#ficheEtablissement .contenu").hide();$(".ui-footer").hide()});$(document).on("pageshow","#ficheEtablissement",function(){extendJquery();ficheEtablissement()});
function ficheEtablissement(){adressecomplete=$.getUrlVar("adressecomplete");univers=$.getUrlVar("univers");menu=$.getUrlVar("menu");testmenu(menu);var b=$.getUrlVar("idetab");$.mobile.showPageLoadingMsg();$(".ui-footer").hide();$("#ficheEtablissement .contenu .zonehaut").empty();$.getJSON(siteBaseURL+"/etab/"+b,function(a){var e=a.name,f=a.voie,g=a.code_postal,h=a.commune,d=a.telephone;""!=d&&(d=d.replace(/[ ]/gi,""),d="+33"+d.substring(1,d.length));var p=a.courriel,m=a.site_web,k=a.latitude,c=a.longitude,
p=a.courriel,m=a.site_web,s=a.statut_etablissement,l=a.journees_portes_ouvertes,k=a.latitude,c=a.longitude;a="";var n=e.replace(/[']/gi,"\\'");a=a+('<a href ="messagefavorise.html" onclick="cook(\''+n+"")+("--"+b+"','etab'); return stats(['_trackEvent', 'clic', 'favorisetab', '"+n+'\', 1]);" style="float:right" ><img src="img/ajout_favoris.png" /></a>');a+="<h4>Etablissement</h4>";a+="<h3>"+e+"</h3>";a+="<p>";""!=f&&(a+=""+f+"<br />");""!=g&&(a+=""+g+" ");""!=h&&(a+=""+h+"<br />");""!=d&&(a+='<b>T\u00e9l: </b><a href ="tel:'+
d+"\" onclick=\"return stats(['_trackEvent', 'clic', 'tel', '"+d+"', 1])\" >"+d+"</a><br />");""!=p&&(a+='<b>M\u00e9l: </b><a href ="mailto:'+p+"\" onclick=\"return stats(['_trackEvent', 'clic', 'mailto', '"+p+"', 1])\" >"+p+"</a><br />");""!=m&&(a+='<b>Site: </b><a href ="http://'+m+"\" onclick=\"return stats(['_trackEvent', 'clic', 'link', '"+m+"', 1])\"  >"+m+"</a><br />");""!=s&&("CFA priv\u00e9"!=s&&"CFA public"!=s&&"non communiqu\u00e9"!=s)&&(a+="<b>Statut: </b>"+s+"<br />");""!=l&&(a+="<b>Portes ouvertes: </b>"+
l+"<br />");a+="<br /><b>Situer sur la carte: </b>";""!=adressecomplete&&(a+='<a href="http://maps.google.fr/maps?saddr='+adressecomplete+"&daddr="+k+","+c+"\" target=_blank onclick=\"return stats(['_trackEvent', 'clic', 'itineraire', 'http://maps.google.fr/maps?saddr="+adressecomplete+"&daddr="+k+","+c+"', 1])\" >Itin\u00e9raire</a>");e=$(document).width()-60;a+='<br /><a href="http://maps.google.fr/maps?q='+k+","+c+"\" target=_blank onclick=\"return stats(['_trackEvent', 'clic', 'map', 'http://maps.google.fr/maps?q="+
k+","+c+'\', 1])" ><img src="http://maps.google.com/staticmap?zoom=14&size='+e+"x300&format=jpg-baseline&maptype=roadmap&markers="+k+","+c+'&key=ABQIAAAAqkDFarbLiZu6nc7_FF0DPBT0z_T0kX_VKP-BAVnVAz4WK3pLThQwCmOEdFYNbFNESGQTA4KkgQHCcQ" height="300"></a><br />';a+="</p>";$("<ul />",{"class":"liste","data-role":"listview",html:a}).appendTo("#ficheEtablissement  .zonehaut");$("#ficheEtablissement .zonehaut .liste").listview();$("#ficheEtablissement .zonehaut .liste").listview("refresh");$(".ui-footer").show();
$.mobile.hidePageLoadingMsg();$("#ficheEtablissement .contenu").show()})}$(document).on("pagebeforeshow","#ficheMetier",function(){$("#ficheMetier .contenu .zonehaut").empty();$("#ficheMetier .contenu").hide();$(".ui-footer").hide()});$(document).on("pageshow","#ficheMetier",function(){$("#ficheMetier .contenu .zonehaut").empty();$("#ficheMetier .contenu").hide();$(".ui-footer").hide();extendJquery();ficheMetier()});
function ficheMetier(){var b=$.getUrlVar("idmetier");menu=$.getUrlVar("menu");testmenu(menu);$("#ficheMetier .contenu .zonehaut").empty();$("#ficheMetier .contenu .exemple_forma div").empty();$("#ficheMetier .contenu .liste_video div").empty();$.mobile.showPageLoadingMsg();$(".ui-footer").hide();$.getJSON(siteBaseURL+"/metier/"+b,function(a){var e=a.id_ideo,f="";""!=a.formations&&(f="ok");var g=a.nom,h=a.accroche,d=a.niveau_access,p=a.salaire_debut,m=a.centres_interet,k=a.secteurActi,c="",s=g.replace(/[']/gi,
"\\'"),c=c+('<a href ="messagefavorism.html" onclick="cook(\''+s+""),c=c+("--"+b+"','metiers'); return stats(['_trackEvent', 'clic', 'favorismetiers', '"+s+'\', 1]);" style="float:right" ><img src="img/ajout_favoris.png" /></a>'),c=c+"<h4>M\u00e9tier</h4>",c=c+("\t\t\t<h3>"+g+"</h3>");""!=h&&(c+="<p>"+h+"</p>");""!=d&&(c+="<b>Niveau d'\u00e9tudes :</b> "+d+"<br />");""!=p&&null!=p&&(c+="<b>Salaire du d\u00e9butant :</b> "+p+" \u20ac \u00ab bruts par mois \u00bb<br />");c+="\t<br />";m.length&&(c+=
"<p class=\"lineheightp\"><b>D'autres m\u00e9tiers avec ces centres d'inter\u00eats : </b><br />",jQuery.each(a.centres_interet,function(b){c+='<a  href="resultats.html?attr_centres_interet_t='+a.centres_interet[b].id+"&univers=metier&menu="+menu+'&tri_metiers=2" data-prefetch >'+a.centres_interet[b].name+"</a><br />"}),c+="</p>");k.length&&(c+='<p class="lineheightp"><b>D\'autres m\u00e9tiers dans ces secteur(s) professionnel(s) : </b><br />',jQuery.each(a.secteurActi,function(b){c+='<a  href="resultats.html?oni_select_secteurs_professionnels='+
a.secteurActi[b].id+"&univers=metier&menu="+menu+'&tri_metiers=1" data-prefetch >'+a.secteurActi[b].name+"</a><br />"}),c+="</p>");$("<ul />",{"class":"liste","data-role":"listview",html:c}).appendTo("#ficheMetier .contenu .zonehaut");$("#ficheMetier .contenu .zonehaut .liste").listview();$("#ficheMetier .contenu .zonehaut .liste").listview("refresh");$.getJSON(siteBaseURL+"/recherche/onisep/video/(ideoId)/attr_metiers_t:"+e+"/",function(a){var b;if(0<a[0].count){var c="";jQuery.each(a,function(d){b=
a[d].name.replace("(1)","").replace("(2)","").replace("(3)","");c+='<li data-theme="e" ><a style=" white-space: normal;" href="'+a[d].url_video+"\" onclick=\"return stats(['_trackEvent', 'clic', 'video', '"+b+'\', 1])" ><img src="'+siteBaseURLVideo+"/"+a[d].photo+'" class="ui-li-thumb">'+b+"</a></li> "});$("<ul />",{"class":"liste","data-role":"listview",html:c}).appendTo("#ficheMetier .contenu .liste_video div");$("#ficheMetier .contenu .liste_video div .liste").listview();$("#ficheMetier .contenu .liste_video div .liste").listview("refresh");
$("#ficheMetier .contenu .liste_video").attr("style","display:block;")}});var l="";jQuery.each(a.listeformation,function(b){l+='<li data-theme="e" ><a style=" white-space: normal;" href="formation.html?idforma='+a.listeformation[b].id+"&menu="+menu+'" data-prefetch   >'+a.listeformation[b].name+"</a></li>"});$("<ul />",{"class":"liste","data-role":"listview",html:l}).appendTo("#ficheMetier .contenu .exemple_forma div");$("#ficheMetier .contenu .exemple_forma div .liste").listview();$("#ficheMetier .contenu .exemple_forma div .liste").listview("refresh");
"ok"==f?$("#ficheMetier .contenu .exemple_forma").attr("style","display:block;"):$("#ficheMetier .contenu .exemple_forma").attr("style","display:none;");$.mobile.hidePageLoadingMsg();$(".ui-footer").show();$("#ficheMetier .contenu").show()})}$(document).on("pagebeforeshow","#ficheFormation",function(){$("#ficheFormation .contenu .zonehaut").empty();$("#ficheFormation .contenu").hide();$(".ui-footer").hide()});
$(document).on("pageshow","#ficheFormation",function(){$("#ficheFormation .contenu .zonehaut").empty();$("#ficheFormation .contenu").hide();$(".ui-footer").hide();extendJquery();ficheFormation()});$(document).on("pagecreate","#ficheFormation",function(){$('#ficheFormation select[name="dpt_select"]').change(function(){($(this).val()||""==$(this).val())&&$(this).submit()})});
function ficheFormation(){menu=$.getUrlVar("menu");testmenu(menu);var b=$.getUrlVar("idforma"),a=$.getUrlVar("dpt_select"),e=$.getUrlVar("region_select"),f=$.getUrlVar("codePostal");""!=a&&(a="&dpt_select="+a+"");""!=e&&(e="&region_select="+e+"");""!=f&&(f="&codePostal="+f+"");$("#ficheFormation .contenu .zonehaut").empty();$("#ficheFormation .contenu .debouches div").empty();$("#ficheFormation .contenu .liste_metiers div").empty();$("#ficheFormation .contenu .liste_metiers").attr("style","display:none;");
$("#ficheFormation .contenu .debouches").attr("style","display:none;");$("#ficheFormation .contenu #buttonEtab").attr("style","display:none;");$.mobile.showPageLoadingMsg();$(".ui-footer").hide();$.getJSON(siteBaseURL+"/formation/"+b,function(g){var h=g.name,d=g.duree,p=g.niveau_terminal_etude,m="";jQuery.each(g.natures_diplome,function(a){m=g.natures_diplome[a].name});var k=g.descriptif_debouches_pro,c="",s=h.replace(/[']/gi,"\\'"),c=c+('<a href ="messagefavorisf.html" onclick="cook(\''+s+"")+("--"+
b+"','formation'); return stats(['_trackEvent', 'clic', 'favorisformations', '"+s+'\', 1]); " style="float:right" ><img src="img/ajout_favoris.png" /></a>'),c=c+"<h4>Formation</h4>",c=c+("<h3>"+h+"</h3>");""!=d&&(c+="<p><b>Dur\u00e9e de la formation</b>: "+d+"</p>");""!=p&&(c+="<p><b>Niveau terminal d'\u00e9tudes</b>: "+p+"</p>");""!=m&&(c+="<p><b>Nature du dipl\u00f4me</b>: "+m+"</p>");c+="";$("<ul />",{"class":"liste","data-role":"listview",html:c}).appendTo("#ficheFormation .contenu .zonehaut");
$("#ficheFormation .contenu .zonehaut .liste").listview();$("#ficheFormation .contenu .zonehaut .liste").listview("refresh");if(""==k){if(""!=g.metiers_debouches_pro){var l='<ul class="listes ui-selectmenu-list ui-listview" >';jQuery.each(g.metiers_debouches_pro,function(a){l+='<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit" href="metiers.html?idmetier='+
g.metiers_debouches_pro[a].id+"&menu="+menu+'" class="listeR"  >'+g.metiers_debouches_pro[a].name+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>'});l+=" </ul>";$("#ficheFormation .contenu .liste_metiers div").append(l);$("#ficheFormation .contenu .liste_metiers").attr("style","display:block;")}$("#ficheFormation .contenu .debouches").attr("style","display:none;")}else{var n="",n=n+("\t"+k+"");""!=g.metiers_debouches_pro&&(n+='\t<p class="lineheightp" ><strong>Exemple(s) de m\u00e9tier(s):</strong><br />',
jQuery.each(g.metiers_debouches_pro,function(a){n+='<a href="metiers.html?idmetier='+g.metiers_debouches_pro[a].id+"&menu="+menu+'" class="listeR" data-prefetch  >'+g.metiers_debouches_pro[a].name+"</a><br />"}),n+="</p>\t");$("#ficheFormation .contenu .debouches div").append(n);$("#ficheFormation .contenu .liste_metiers").attr("style","display:none;");$("#ficheFormation .contenu .debouches").attr("style","display:block;")}$('#ficheFormation #rechercheetabform input[name="menu"]').val(menu);$('#ficheFormation #rechercheetabform input[name="codePostal"]').val(f);
$('#ficheFormation #rechercheetabform input[name="formationid"]').val(b);$("#ficheFormation #buttonEtab").closest(".ui-select").hide();$("#ficheFormation #buttonEtab").empty();if(""==a&&""==e){if(""!=g.deptformation){var l="",l='<option value="">O\u00f9 se former ?</option>',l=l+'<option value="" >Tous les d\u00e9partements</option>',t="0";jQuery.each(g.deptformation,function(a){l+='<option value="'+g.deptformation[a].identifiant+'"  >'+g.deptformation[a].name+"</option>";t++});"1"==t?(jQuery.each(g.deptformation,
function(b){a=g.deptformation[b].identifiant;""!=a&&(a="&dpt_select="+a+"")}),$("#ficheFormation .contenu #buttonOneEtab").attr("href","resultats.html?univers=formation_etab&formationid="+b+""+a+""+e+""+f+"&menu="+menu+""),$("#ficheFormation .contenu #buttonOneEtab").attr("style","display:block;")):($("#ficheFormation #buttonEtab").append(l),$("#ficheFormation .contenu #buttonEtab").attr("style","display:block;"),$("#ficheFormation #buttonEtab").selectmenu("refresh",!0),$("#ficheFormation #buttonEtab").closest(".ui-select").show())}}else $("#ficheFormation .contenu #buttonOneEtab").attr("href",
"resultats.html?univers=formation_etab&formationid="+b+""+a+""+e+""+f+"&menu="+menu+""),$("#ficheFormation .contenu #buttonOneEtab").attr("style","display:block;");""==g.descriptif_debouches_pro?$("#ficheFormation .contenu .debouches").attr("style","display:none;"):$("#ficheFormation .contenu .debouches").attr("style","display:block;");$.mobile.hidePageLoadingMsg();$(".ui-footer").show();$("#ficheFormation .contenu").show()})}$(document).on("pageshow","#libre",function(){testmenu("libre")});
$(document).on("pageshow","#formation",function(){testmenu("formation")});$(document).on("pageshow","#metier",function(){testmenu("metier")});$(document).on("pageshow","#rechercheGeoloc",function(){testmenu("etab")});$(document).on("pageshow","#ficheVideo",function(){testmenu("video")});
function testmenu(b){MobileLogger.log("menu: "+b);switch(b){case "libre":$(".ui-block-a a").addClass("actifmenu");$(".ui-block-b a").removeClass("actifmenu");$(".ui-block-c a").removeClass("actifmenu");$(".ui-block-d a").removeClass("actifmenu");$(".ui-block-e a").removeClass("actifmenu");break;case "metier":$(".ui-block-b a").addClass("actifmenu");$(".ui-block-a a").removeClass("actifmenu");$(".ui-block-c a").removeClass("actifmenu");$(".ui-block-d a").removeClass("actifmenu");$(".ui-block-e a").removeClass("actifmenu");
break;case "formation":$(".ui-block-c a").addClass("actifmenu");$(".ui-block-a a").removeClass("actifmenu");$(".ui-block-b a").removeClass("actifmenu");$(".ui-block-d a").removeClass("actifmenu");$(".ui-block-e a").removeClass("actifmenu");break;case "etab":$(".ui-block-d a").addClass("actifmenu");$(".ui-block-a a").removeClass("actifmenu");$(".ui-block-b a").removeClass("actifmenu");$(".ui-block-c a").removeClass("actifmenu");$(".ui-block-e a").removeClass("actifmenu");break;case "video":$(".ui-block-d a").removeClass("actifmenu");
$(".ui-block-a a").removeClass("actifmenu");$(".ui-block-b a").removeClass("actifmenu");$(".ui-block-c a").removeClass("actifmenu");$(".ui-block-e a").addClass("actifmenu");break;default:$(".ui-block-d a").removeClass("actifmenu"),$(".ui-block-a a").removeClass("actifmenu"),$(".ui-block-b a").removeClass("actifmenu"),$(".ui-block-c a").removeClass("actifmenu"),$(".ui-block-e a").removeClass("actifmenu")}};


(function($) {
    function parseImagesFromCSS(doc) {
        var i, j,
            rule,
            image,
            pattern = /url\((.*)\)/,
            properties = ['background-image', '-webkit-border-image'],
            images = {};

        if (doc.styleSheets) {
            for (i = 0; i < doc.styleSheets.length; ++i) {
                images = $.extend(images, parseImagesFromCSS(doc.styleSheets[i]));
            }
        } else if (doc.cssRules) {
            for (i = 0; i < doc.cssRules.length; ++i) {
                rule = doc.cssRules[i];
                if (rule.styleSheet) {
                    images = $.extend(images, parseImagesFromCSS(rule.styleSheet));
                } else if (rule.style) {
                    for (j=0; j < properties.length; j++) {
                        image = pattern.exec(rule.style.getPropertyValue(properties[j]));
                        if (image && image.length === 2) {
                        	if((image[0]).indexOf('url("images/') != -1) {
                        		image[0] = (image[0]).replace('url("images/','url("css/images/');
                        	}
                            images[image[1]] = image[0];
                        }
                    }
                }
            }
        }

        return images;
    }

    $.extend({
        preload: {
            images: function(doc) {
             alert('ok');
                doc = doc || document;
                var images = $.map(parseImagesFromCSS(doc), function(url) { return url; }),
                    head = doc.getElementsByTagName('head')[0],
                    style = doc.createElement('style');
                style.type = 'text/css';
                style.id = 'preload';
                style.innerHTML = 'body::after { content: ' + images.join(' ') + '; display: none; }';
                head.appendChild(style);
            }
        }
    });
})(jQuery);



$(document).on('mobileinit', function () {

  var ua = navigator.userAgent;
    var pattern = /Android\s([0-9\.]+)/;
    var result = pattern.exec(ua);
    if (result) {
        var patternVersion = /([0-2]{1})/;
        var getVersionMajor = patternVersion.exec(result[1]);

         
            $.mobile.phonegapNavigationEnabled = false;
            $.mobile.transitionFallbacks.fade = "none";
            $.mobile.transitionFallbacks.slidedown = "none";
            $.mobile.transitionFallbacks.slideup = "none";
            $.mobile.transitionFallbacks.pop = "none";

    }
	
    // pre-config for jQm
    $.mobile.allowCrossDomainPages = true;
    $.mobile.page.prototype.options.domCache = true;
    $.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
    $.mobile.pushStateEnabled = true;
    $.mobile.hashListeningEnabled = true;
    $.mobile.ajaxEnabled = true;
	$.mobile.pageContainer = $('#container');


});

	
	



var onOfflineIn=!1,idGA="UA-27009047-7",deviceOS="Android",gaPlugin,myScroll,MobileLogger=function(){this.debugMode=!1;return{init:function(a){debugMode=a},log:function(a){debugMode&&console.log(a)}}}();$(function(){MobileLogger.init(!1);"iOS"==deviceOS&&$("head").append('<script src="js/iscroll.js" type="text/javascript">\x3c/script>').append('<script src="js/jquery.mobile.iscrollview.js" type="text/javascript">\x3c/script>');FastClick.attach(document.getElementById("container"))});
$(document).on("resume",function(){MobileLogger.log("resume");$.mobile.activePage.trigger("refresh");$.mobile.hidePageLoadingMsg()});$(document).on("backbutton",function(){"libre"===$.mobile.activePage.attr("id")?navigator.app.exitApp():window.history.back()});
$(document).on("deviceready",function(){navigator.splashscreen.hide();gaPlugin=window.plugins.gaPlugin;gaPlugin.init(function(){MobileLogger.log("Start: success index")},function(){MobileLogger.log("Start: failure index")},idGA,10);$(document).on("pageshow","[data-role=page]",function(a,c){try{var b=jQuery(location).attr("href");0<b.indexOf("#")&&(b=b.slice(b.indexOf("#")+1));b=b.split("/");b=b[b.length-1];"index.html"!=b&&testConnexion();gaPlugin.trackPage(function(){MobileLogger.log("Start: success "+
b)},function(){MobileLogger.log("Start: failure "+b)},b)}catch(d){MobileLogger.log(d.message)}})});$(document).on("click","a",function(){var a=$(this).attr("href"),c=-1===a.indexOf("http://")&&-1===a.indexOf("https://");0<a.indexOf(".mp4")&&(c="video");if("video"==c)return"Android"==deviceOS&&window.videoPlayer.play(a),"iOS"==deviceOS&&window.plugins.CDVVideo.play(a),!1;if(!c)return a&&display_url(a),!1});
function display_url(a){var c=a.split(":"),b="";switch(c[0]){case "https":b="LienExterne";break;case "http":b="LienExterne";break;case "mailto":b="Mail";break;case "tel":b="Tel";break;default:b="LienInterne"}var d=a;c[1]&&(d=c[1]);MobileLogger.log("liens :"+d+" type:"+c[0]+" category:"+b);window.open(a,"_blank","location=yes")}
function stats(a){"_trackEvent"==a[0]&&gaPlugin.trackEvent(function(){MobileLogger.log("Start: success _trackEvent "+a[3])},function(){MobileLogger.log("Start: failure _trackEvent "+a[3])},a[1],a[2],a[3],a[4])}function custom_alert(a){navigator.notification?navigator.notification.alert(a,null,"Alert","OK"):alert(a)}function testConnexion(){(0==navigator.connection.type||navigator.connection.type==Connection.NONE)&&onOffline()}
function onOffline(){custom_alert("Pas de r\u00e9seau internet, vous ne pouvez pas poursuivre dans cette section.");window.location.href="index.html";return!1};

