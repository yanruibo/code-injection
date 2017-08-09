










  
	var offset = new Number(0);    
    var pager = null;
    var pagel = null;
    var bouton_page =null;
    
     //etab
    var latitude = 0;
    var longitude = 0;
    var adressecomplete = "";
      
    $(document).ready(function () {
        
    bouton_page = $('#bouton_page'); 
    pager = $('#pager');
    pagel = $('#pagel');
    
    });
    
    
    
    	












/*==============================================================================================================*/
/*||                                                 JAVASCRIPT                                               ||*/
/*==============================================================================================================*/		
		
	
//------------------------------------ VARIABLES GLOBALES -----------------------------------------

    //recherche libre
    var inputLibre = null;

    //resultats
    var offset = new Number(0);    
    var pager = null;
    var pagel = null;
    var bouton_page =null;


    //etab
    var latitude = 0;
    var longitude = 0;
    var adressecomplete = "";

//--------------------------------------- EVENEMENTS ----------------------------------------------


    $(document).ready(function () { 

       
        //resultats
        bouton_page = $('#bouton_page'); 
        pager = $('#pager');
        pagel = $('#pagel');
    });






















  
	
    var latitude = 0;
    var longitude = 0;
    var adressecomplete = "";
 
    	











 	
    
    
    $(document).ready(function () {
   
    	if($('input[name="tri_metiers"]').filter(':checked').val() !="1" &&
    $('input[name="tri_metiers"]').filter(':checked').val() !="2" &&
    $('input[name="tri_metiers"]').filter(':checked').val() !="3"
	)
	{
	
        $('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
        $('#metier #oni_select_contres_interets_me select').selectmenu('disable');
        $('#metier #boutonmetiers input').textinput('disable');	
	}
	
		$('input[name="tri_metiers"]').change( function() {

        var val = $(this).filter(':checked').val();

        if( val == '1' ) {
	
			$("#metier .boutontravail").attr('style', 'border: 2px solid #C1D201;');
			$("#metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', 'border: 2px solid #C1D201;');
			
			$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr('style', '');
			$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr('style', '');
												
			
			$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text');
			$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
			$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
			
			$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('enable');
			$('#metier #oni_select_contres_interets_me select').selectmenu('disable');
			$('#metier #boutonmetiers input').textinput('disable');	

		
			
			
			
			$("#oni_nom_metier2").val("");
			
			$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
				
			$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
				
			$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text');
			
			$("#metier #bboutonmetiers").attr('style', 'display:none;');
			
			$("#metier #bboutonmetierssecteurs").attr('style', 'display:block;');
			
			$("#metier #bboutonmetiersinterets").attr('style', 'display:none;');
			
		 
		
	
	
					}
					else if( val == '2' ) {
					
									
									
									$("#metier .boutonjaime").attr('style', 'border: 2px solid #C1D201;');
									$("#metier #oni_select_contres_interets_me .ui-btn-up-c").attr('style', 'border: 2px solid #C1D201;');
									
									
									$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', '');
									$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr('style', '');
												
									
								
									$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ');
									$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									
									$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
									$('#metier #oni_select_contres_interets_me select').selectmenu('enable');
									$('#metier #boutonmetiers input').textinput('disable');	
									
									
			
									$("#oni_nom_metier2").val("");	


									$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text');
										
									$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
										
									$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									
									$("#metier #bboutonmetiers").attr('style', 'display:none;');
									
									$("#metier #bboutonmetierssecteurs").attr('style', 'display:none;');
									
									$("#metier #bboutonmetiersinterets").attr('style', 'display:block;');
									
													
					
					
											}
											else
											{
																								
												$("#metier .boutonlibre").attr('style', 'border: 2px solid #C1D201;');
												$("#metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c ").attr('style', 'border: 2px solid #C1D201;');
												
												$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr('style', '');
												$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', '');
												
												
												
												
									
												$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
												$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
												$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ');
												
												$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
												$('#metier #oni_select_contres_interets_me select').selectmenu('disable');
												$('#metier #boutonmetiers input').textinput('enable');	
											
											
												$("#oni_nom_metier2").val("");
																		
																		
												$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
													
												$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text');
													
												$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');

											
												$("#metier #bboutonmetiers").attr('style', 'display:block;');
												
												$("#metier #bboutonmetierssecteurs").attr('style', 'display:none;');
												
												$("#metier #bboutonmetiersinterets").attr('style', 'display:none;');
											
											}


 });
    
    
    });
    	











  
	
     
        $(document).ready(function () {
   
    $('input[name="attr_niveau_etude_t"]').change( function() {

	var val = $(this).filter(':checked').val();

	
	
		
		$("#formation #region_select_forma").attr('style', 'display:block;'); 			   
		$("#formation #domain_select_forma").attr('style', 'display:block;');

		var myselect1 = $("#rechercheforma select#region_select");
		myselect1[0].selectedIndex = 0;
		myselect1.selectmenu("refresh");
		
		var myselect3 = $("#rechercheforma select#domain_select");
		myselect3[0].selectedIndex = 0;
		myselect3.selectmenu("refresh");
		
					


		});
        
        
        $("#rechercheforma").submit(function(event) {
			   
					if( $('input[name="attr_niveau_etude_t"]').filter(':checked').val() != '' ) {
												
						if($("#rechercheforma #domain_select").attr('value') =="") 
						
						 {                        
						
						alert("Veuillez sélectionner un domaine");
						
						return false;
						}	

							
						if($("#rechercheforma #region_select").attr('value') =="") 
						 {                        
						
						alert("Veuillez sélectionner une région");
						
						
						return false;
						}
						   
					}
				
			});
			
        
    
    });
    
    












        


/*==============================================================================================================*/
/*||                                                 JAVASCRIPT                                               ||*/
/*==============================================================================================================*/		
		
	
//------------------------------------ VARIABLES GLOBALES -----------------------------------------

   

//--------------------------------------- EVENEMENTS ----------------------------------------------


    $(document).ready(function () { 

        inputLibre = $('#inputLibre'); 


        //resultats
        bouton_page = $('#bouton_page'); 
        pager = $('#pager');
        pagel = $('#pagel');
        
        
        $("#inputLibre").click( function()
           {
             //alert('button clicked');
           }
      );
    });
    
    


















  
	
    //resultats
    var offset = new Number(0);    
    var pager = null;
    var pagel = null;
    var bouton_page =null;
        
    
    $(document).ready(function () {
       
     mapposition();
     
     	var myselect2 = $("select#dpt_select");
		myselect2[0].selectedIndex = 0;
		myselect2.selectmenu("refresh");
		
		var myselect1 = $("select#region_select");
		myselect1[0].selectedIndex = 0;
		myselect1.selectmenu("refresh");
 
	 
	 
	 
 var rg ="";
 
	 $('select[name="region_select"]').change( function() {
	 
	switch ($("#region_select").attr('value')) {
	 case "1":
	 rg =  "Alsace";
	  break;
	case "2": 
	rg = "Aquitaine";
	 break;
	case "3":  
	rg = "Auvergne";
	 break;
	case "4": 
	rg = "Basse-Normandie";
	  break;
	case "5":
	rg = "Bourgogne";
	   break;
	case "6":
	rg = "Bretagne";
	  break;
	case "7":  
	rg = "Centre";
	 break;
	case "8":  
	rg = "Champagne-Ardenne";
	 break;
	case "9":  
	rg = "Corse";
	 break;
	case "10":
	rg = "Franche-Comté";
	 break;
	case "24":
	rg = "Guadeloupe";
	 break;
	case "25":
	rg = "Guyane";
	 break;
	case "11":
	rg = "Haute-Normandie";
	 break;
	case "12":
	rg = "Ile-de-France";
	 break;
	case "23":
	rg = "La Réunion";
	 break;
	case "13":
	rg = "Languedoc-Roussillon";
	 break;
	case "14":
	rg = "Limousin";
	 break;
	case "15":
	rg = "Lorraine";
	 break;
	case "26":
	rg = "Martinique";
	 break;
	case "16":
	rg = "Midi-Pyrénées";
	 break;
	case "17":
	rg = "Nord-Pas-de-Calais";
	 break;
	case "18":
	rg = "Pays de la Loire";
	 break;
	case "19":
	rg = "Picardie";
	 break;
	case "20":
	rg = "Poitou-Charentes";
	 break;
	case "21":
	rg = "Provence-Alpes-Côte d'Azur";
	 break;
	case "22":
	rg = "Rhône-Alpes";
	 break;
	case "27":
	rg = "Territoires d'Outre Mer";
	 break;
	default: 
	rg = "Inconnu";
	 break; 
	 
	}
	 
	 
	$("#rechercheGeoloc #geolocalisationdept").empty();		
	$("#rechercheGeoloc #geolocalisationdept").prepend('Vous avez choisi la région : <h3>'+rg+'</h3>');
	 
	 });
	 
	 
	 
	 $('select[name="dpt_select"]').change( function() {
	 
	switch ($("#dpt_select").attr('value')) {
	case "99" :
	rg = "Ain";
	 break;
	case "85" :
	rg = "Aisne";
	 break;
	case "14" :
	rg = "Allier";
	 break;
	case "92" :
	rg = "Alpes de Hte Provence";
	 break;
	case "94" :
	rg = "Alpes Maritimes";
	 break;
	case "100" :
	rg = "Ardèche";
	 break;
	case "35" :
	rg = "Ardennes";
	 break;
	case "70" :
	rg = "Ariège";
	 break;
	case "36" :
	rg = "Aube";
	 break;
	case "57" :
	rg = "Aude";
	 break;
	case "71" :
	rg = "Aveyron";
	 break;
	case "7" :
	rg = "Bas Rhin";
	 break;
	case "95" :
	rg = "Bouches du Rhône";
	 break;
	case "18" :
	rg = "Calvados";
	 break;
	case "15" :
	rg = "Cantal";
	 break;
	case "88" :
	rg = "Charente";
	 break;
	case "89" :
	rg = "Charente Maritime";
	 break;
	case "29" :
	rg = "Cher";
	 break;
	case "62" :
	rg = "Corrèze";
	 break;
	case "39" :
	rg = "Corse du Sud";
	 break;
	case "21" :
	rg = "Côte d'Or";
	 break;
	case "25" :
	rg = "Côtes d'Armor";
	 break;
	case "63" :
	rg = "Creuse";
	 break;
	case "90" :
	rg = "Deux Sèvres";
	 break;
	case "9" :
	rg = "Dordogne";
	 break;
	case "41" :
	rg = "Doubs";
	 break;
	case "101" :
	rg = "Drôme";
	 break;
	case "52" :
	rg = "Essonne";
	 break;
	case "47" :
	rg = "Eure";
	 break;
	case "30" :
	rg = "Eure et Loir";
	 break;
	case "26" :
	rg = "Finistère";
	 break;
	case "58" :
	rg = "Gard";
	 break;
	case "73" :
	rg = "Gers";
	 break;
	case "10" :
	rg = "Gironde";
	 break;
	case "45" :
	rg = "Guadeloupe";
	 break;
	case "46" :
	rg = "Guyane";
	 break;
	case "8" :
	rg = "Haut Rhin";
	 break;
	case "40" :
	rg = "Haute Corse";
	 break;
	case "72" :
	rg = "Haute Garonne";
	 break;
	case "16" :
	rg = "Haute Loire";
	 break;
	case "38" :
	rg = "Haute Marne";
	 break;
	case "43" :
	rg = "Haute Saône";
	 break;
	case "106" :
	rg = "Haute Savoie";
	 break;
	case "64" :
	rg = "Haute Vienne";
	 break;
	case "93" :
	rg = "Hautes Alpes";
	 break;
	case "75" :
	rg = "Hautes Pyrénées";
	 break;
	case "53" :
	rg = "Hauts de Seine";
	 break;
	case "59" :
	rg = "Hérault";
	 break;
	case "27" :
	rg = "Ille et Vilaine";
	 break;
	case "31" :
	rg = "Indre";
	 break;
	case "32" :
	rg = "Indre et Loire";
	 break;
	case "102" :
	rg = "Isère";
	 break;
	case "42" :
	rg = "Jura";
	 break;
	case "98" :
	rg = "La Réunion";
	 break;
	case "11" :
	rg = "Landes";
	 break;
	case "33" :
	rg = "Loir et Cher";
	 break;
	case "103" :
	rg = "Loire";
	 break;
	case "80" :
	rg = "Loire Atlantique";
	 break;
	case "34" :
	rg = "Loiret";
	 break;
	case "74" :
	rg = "Lot";
	 break;
	case "12" :
	rg = "Lot et Garonne";
	 break;
	case "60" :
	rg = "Lozère";
	 break;
	case "81" :
	rg = "Maine et Loire";
	 break;
	case "19" :
	rg = "Manche";
	 break;
	case "37" :
	rg = "Marne";
	 break;
	case "69" :
	rg = "Martinique";
	 break;
	case "82" :
	rg = "Mayenne";
	 break;
	case "5" :
	rg = "Mayotte";
	 break;
	case "65" :
	rg = "Meurthe et Moselle";
	 break;
	case "66" :
	rg = "Meuse";
	 break;
	case "28" :
	rg = "Morbihan";
	 break;
	case "67" :
	rg = "Moselle";
	 break;
	case "22" :
	rg = "Nièvre";
	 break;
	case "78" :
	rg = "Nord";
	 break;
	case "1" :
	rg = "Nouvelle Calédonie";
	 break;
	case "86" :
	rg = "Oise";
	 break;
	case "20" :
	rg = "Orne";
	 break;
	case "49" :
	rg = "Paris";
	 break;
	case "79" :
	rg = "Pas de Calais";
	 break;
	case "4" :
	rg = "Polynésie française";
	 break;
	case "17" :
	rg = "Puy de Dôme";
	 break;
	case "13" :
	rg = "Pyrénées Atlantiques";
	 break;
	case "61" :
	rg = "Pyrénées Orientales";
	 break;
	case "104" :
	rg = "Rhône";
	 break;
	case "6" :
	rg = "Saint Pierre et Miquelon";
	 break;
	case "23" :
	rg = "Saône et Loire";
	 break;
	case "83" :
	rg = "Sarthe";
	 break;
	case "105" :
	rg = "Savoie";
	 break;
	case "50" :
	rg = "Seine et Marne";
	 break;
	case "48" :
	rg = "Seine Maritime";
	 break;
	case "54" :
	rg = "Seine St Denis";
	 break;
	case "87" :
	rg = "Somme";
	 break;
	case "76" :
	rg = "Tarn";
	 break;
	case "77" :
	rg = "Tarn et Garonne";
	 break;
	case "44" :
	rg = "Territoire de Belfort";
	 break;
	case "56" :
	rg = "Val d'Oise";
	 break;
	case "55" :
	rg = "Val de Marne";
	 break;
	case "96" :
	rg = "Var";
	 break;
	case "97" :
	rg = "Vaucluse";
	 break;
	case "84" :
	rg = "Vendée";
	 break;
	case "91" :
	rg = "Vienne";
	 break;
	case "68" :
	rg = "Vosges";
	 break;
	case "3" :
	rg = "Wallis et Futuna";
	 break;
	case "24" :
	rg = "Yonne";
	 break;
	case "51" :
	rg = "Yvelines";
	 break;
	 default: 
	rg = "Inconnu";
	 break; 
		
	}	
	 
	$("#rechercheGeoloc #geolocalisationdept").empty();		
	$("#rechercheGeoloc #geolocalisationdept").prepend('Vous avez choisi le département : <h3>'+rg+'</h3>');
	 
	 
	});
	 
    
    });
    	
















/*==============================================================================================================*/
/*||                                                 JAVASCRIPT                                               ||*/
/*==============================================================================================================*/		
		
	
//------------------------------------ VARIABLES GLOBALES -----------------------------------------


    //resultats
    var offset = new Number(0);    
    var pager = null;
    var pagel = null;
    var bouton_page =null;


    //etab
    var latitude = 0;
    var longitude = 0;
    var adressecomplete = "";

//--------------------------------------- EVENEMENTS ----------------------------------------------


    $(document).ready(function () { 

       favoris();
        //resultats
        bouton_page = $('#bouton_page'); 
        pager = $('#pager');
        pagel = $('#pagel');
    });



















/*==============================================================================================================*/
/*||                                                 JAVASCRIPT                                               ||*/
/*==============================================================================================================*/		
		
	
//------------------------------------ VARIABLES GLOBALES -----------------------------------------


    //resultats
    var offset = new Number(0);    
    var pager = null;
    var pagel = null;
    var bouton_page =null;


    //etab
    var latitude = 0;
    var longitude = 0;
    var adressecomplete = "";

//--------------------------------------- EVENEMENTS ----------------------------------------------


    $(document).ready(function () { 

       
        //resultats
        bouton_page = $('#bouton_page'); 
        pager = $('#pager');
        pagel = $('#pagel');
    });
























/*=======================================================================================*/
/*|                      Fonction d'affichage de la fiche métier                        |*/
/*=======================================================================================*/

 $(document).ready(function () { 
 	
$('#favoris').live("pageshow", function() {  
favoris();

});
		
 });


function favoris(){
		$("#favoris .contenu .zonehaut").empty();
		$.mobile.showPageLoadingMsg();	

	
 
		//affichage des informations
		var contenu ="";		
						
		contenu+= '<li data-role="list-divider" class="ui-bar-d" ><b>Métier(s) : </b></li>';
	
		var cookiemetiers = testvaleurm;
		//Load the items or a new array if null.
		var itemsmetiers = cookiemetiers ? cookiemetiers.split(/,/) : new Array();

		var nbm = 0;
	
		$.each( itemsmetiers, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		if(nbm/2 == Math.round(nbm/2))							 						 
		contenu+='<li data-theme="c"><a style=" white-space: normal;" href="metiers.html?idmetier='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="metiers.html?idmetier='+o[1]+'" >'+oname+'</a></li>';
  		nbm++;
		
		});		
		
		
		contenu+= '<li data-role="list-divider" class="ui-bar-d"><b>Formation(s) : </b></li>';
	
		var cookieforma =  testvaleurf;
		//Load the items or a new array if null.
		var itemsforma = cookieforma ? cookieforma.split(/,/) : new Array();

		var nbf = 0;
		$.each( itemsforma, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		
		if(nbf/2 == Math.round(nbf/2))							 						 
		contenu+='<li data-theme="c"><a style=" white-space: normal;" href="formation.html?idforma='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="formation.html?idforma='+o[1]+'" >'+oname+'</a></li>';
  		nbf++;
		
		});		
		
		
		
		contenu+= '<li data-role="list-divider" class="ui-bar-d"><b>Etablissement(s) : </b></li>';
	
		var cookieetab = testvaleure;
		//Load the items or a new array if null.
		var itemsetab = cookieetab ? cookieetab.split(/,/) : new Array();

		var nbfet= 0;
	
		$.each( itemsetab, function(i, n){
		var o = n ? n.split(/--/) : new Array();
		var oname= decodeURIComponent(o[0]);
		
		if(nbfet/2 == Math.round(nbfet/2))							 						 
		contenu+='<li data-theme="c"><a style=" white-space: normal;" href="etablissement.html?idetab='+o[1]+'" >'+oname+'</a></li>';
		else
  		contenu+='<li data-theme="d"><a style=" white-space: normal;" href="etablissement.html?idetab='+o[1]+'" >'+oname+'</a></li>';
		nbfet++;
		
	   
		});		
		
		

		
		//creation de la liste
  					$('<ul />', {'class': 'liste','data-role':'listview',html: contenu} ).appendTo('#favoris .contenu .zonehaut');
  					//Prise en compte de la liste par JQM 
  					$('#favoris .contenu .zonehaut .liste').listview();
					$('#favoris .contenu .zonehaut .liste').listview('refresh');						
		//$("#favoris .contenu .zonehaut").append(contenu);
		
				
		
					
					  				
  		//suppressio du loader
		$.mobile.hidePageLoadingMsg();
		



	
	
	
}




 





	
	var offset = new Number(0);    
    var pager = null;
    var pagel = null;
	var bouton_page =null;
	

	
	var menu = "";
	var region_select1 = "";
	var dpt_select1 = "";
	var attr_centres_interet_t1 = "";


	var univers = "";
	var inputLibre = null;
	var attr_centres_interet_t = "";
	var formationid = "";
	var titrerecheche = "";


	// Metier
	var oni_select_secteurs_professionnels = "";
	var oni_select_contres_interets = "";
	var oni_nom_metier2 = "";
	var tri_metiers = "";


	// metier
	var oni_select_secteurs_professionnels1 =""; 
	var attr_centres_interet_t1 =""; 
	
	
	//vidéo
	var oni_select_secteurs_professionnels_video = "";
	var oni_nom_metier2_video = "";
	var oni_select_secteurs_professionnels_video1 = "";
	

	// Formation
	var region_select = "";
	var dpt_select = "";
	var domain_select = "";
	var attr_niveau_enseignement_t = "";
	var attr_niveau_etude_t ="";


	// Formation
	var domain_select1 ="";
		
	var attr_niveau_enseignement_t1 = "";
	
	var attr_niveau_etude_t1 ="";


	// Géoloc
	var tri_region = "";
	var imputGeoloc = "";
	var codePostal = "";
	var adressecomplete = "";
	
	var latitude = 0;
    var longitude = 0;
  
	
	
	//liste region dans fiche formation
	function listeregion(id) {
		var imputGeoloctest = document.getElementById('imputGeoloc').value;
		var adressecomplete = document.getElementById('adressecomplete').value;
		$("#listeregion #"+id).attr('href', 'resultats.html?univers=etab&menu=etab&adressecomplete='+adressecomplete+'&tri_region=1&region_select='+id+'&imputGeoloc='+imputGeoloctest+'');
	
		}
		
	
	function mapposition()
	{	
				if (navigator.geolocation)
				{
				navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
				$("#rechercheGeoloc #geolocalisationdept").empty();
				$("#rechercheGeoloc #geolocalisationdept").prepend('<h3>Géolocalisation en cours <img src=\'img/loading.gif\'/></h3>');
				} 
				else {
				positionError(-1);
				}

	}

				
	function positionSuccess(position) {
    
	//récuperation de la position actuelle 
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
			
		latitudegoogle = latitude;
		longitudegoogle = longitude;						
    		 
		//récupération du code postal avec API Google Maps
    	var latlng = new google.maps.LatLng(latitude, longitude);
    	var geocoder = new google.maps.Geocoder();
    	geocoder.geocode({'latLng': latlng}, function(results, status) {
    	  		if (status == google.maps.GeocoderStatus.OK) {
								 
						if (results[0]) 
						{
							var trouve = false;
							place = results[0].address_components[3].long_name;
							adressecomplete = latitudegoogle+','+longitudegoogle;							
								
								for(var i=0; i<results[0].address_components.length; i++)
								{													
									if(results[0].address_components[i].types[0] == "postal_code")
									codePostal=results[0].address_components[i].long_name;
								
								}
																										
							$("#rechercheGeoloc #codePostal").attr('value', codePostal); 
							$("#rechercheGeoloc #adressecomplete").attr('value', adressecomplete); 
							$("#rechercheGeoloc #geolocalisationdept").empty();					
							$("#rechercheGeoloc #geolocalisationdept").prepend('Vous êtes localisé : <h3>'+place+'</h3>');								
						
														
						}
					
    	    	}
				
    	    });
  		}
		
		
	function positionError(err) {
    var msg;
    switch(err.code) {
      case err.UNKNOWN_ERROR:
        msg = "Unable to find your location";
        break;
      case err.PERMISSION_DENINED:
        msg = "Permission denied in finding your location";
        break;
      case err.POSITION_UNAVAILABLE:
        msg = "Your location is currently unknown";
        break;
      case err.BREAK:
        msg = "Attempt to find location took too long";
        break;
      default:
        msg = "Location detection not supported in browser";
    }
    		
		$("#rechercheGeoloc #codePostal").attr('value', ''); 
		$("#rechercheGeoloc #adressecomplete").attr('value', ''); 
		$("#rechercheGeoloc #geolocalisationdept ").empty();
		$("#rechercheGeoloc #geolocalisationdept ").prepend('<h3>Vous n\'avez pas pu être localisé</h3>');		
		$("#rechercheGeoloc .loader").remove();
					
  }
  

	
		

 $(document).ready(function () {
  

	 //menu
	  $('#libre').live("pagebeforeshow", function() {  
		testmenu('libre');  
	  });
	  
	   $('#formation').live("pagebeforeshow", function() {  
		testmenu('formation');  
	  });
	  
		$('#metier').live("pagebeforeshow", function() {  
		testmenu('metier');  
	  });
	  
		$('#rechercheGeoloc').live("pagebeforeshow", function() {  
		testmenu('etab');  
	  });
	   
		$('#ficheVideo').live("pagebeforeshow", function() {	  
		testmenu('video');	  
	  });
  
   
 
  /*=======================================================================================*/
/*|                  recherche geoloc                     |*/
/*=======================================================================================*/

	 $('#rechercheGeoloc').live("pagecreate", function() {
	 mapposition();
	 
		
		
	 });
	 
  	 $('#rechercheGeoloc').live("pagebeforeshow", function() {  
	 
	var rg ="";
 
	 $('#rechercheGeoloc select[name="region_select"]').change( function() {
	 
	 var myselect2 = $("#rechercheGeoloc select#dpt_select");
		myselect2[0].selectedIndex = 0;
		myselect2.selectmenu("refresh");
		
	 
	switch ($("#rechercheGeoloc #region_select").attr('value')) {
	 case "1":
	 rg =  "Alsace";
	  break;
	case "2": 
	rg = "Aquitaine";
	 break;
	case "3":  
	rg = "Auvergne";
	 break;
	case "4": 
	rg = "Basse-Normandie";
	  break;
	case "5":
	rg = "Bourgogne";
	   break;
	case "6":
	rg = "Bretagne";
	  break;
	case "7":  
	rg = "Centre";
	 break;
	case "8":  
	rg = "Champagne-Ardenne";
	 break;
	case "9":  
	rg = "Corse";
	 break;
	case "10":
	rg = "Franche-Comté";
	 break;
	case "24":
	rg = "Guadeloupe";
	 break;
	case "25":
	rg = "Guyane";
	 break;
	case "11":
	rg = "Haute-Normandie";
	 break;
	case "12":
	rg = "Ile-de-France";
	 break;
	case "23":
	rg = "La Réunion";
	 break;
	case "13":
	rg = "Languedoc-Roussillon";
	 break;
	case "14":
	rg = "Limousin";
	 break;
	case "15":
	rg = "Lorraine";
	 break;
	case "26":
	rg = "Martinique";
	 break;
	case "16":
	rg = "Midi-Pyrénées";
	 break;
	case "17":
	rg = "Nord-Pas-de-Calais";
	 break;
	case "18":
	rg = "Pays de la Loire";
	 break;
	case "19":
	rg = "Picardie";
	 break;
	case "20":
	rg = "Poitou-Charentes";
	 break;
	case "21":
	rg = "Provence-Alpes-Côte d'Azur";
	 break;
	case "22":
	rg = "Rhône-Alpes";
	 break;
	case "27":
	rg = "Territoires d'Outre Mer";
	 break;
	default: 
	rg = "Inconnu";
	 break; 
	 
	}
	 
	 
	$("#rechercheGeoloc #geolocalisationdept").empty();		
	$("#rechercheGeoloc #geolocalisationdept").prepend('Vous avez choisi la région :  <h3>'+rg+'</h3>');
	 
	 });
	 
	 
	 
	 $('#rechercheGeoloc select[name="dpt_select"]').change( function() {
	 
	  var myselect1 = $("#rechercheGeoloc select#region_select");
								myselect1[0].selectedIndex = 0;
								myselect1.selectmenu("refresh");
	 
	switch ($("#rechercheGeoloc #dpt_select").attr('value')) {
	case "99" :
	rg = "Ain";
	 break;
	case "85" :
	rg = "Aisne";
	 break;
	case "14" :
	rg = "Allier";
	 break;
	case "92" :
	rg = "Alpes de Hte Provence";
	 break;
	case "94" :
	rg = "Alpes Maritimes";
	 break;
	case "100" :
	rg = "Ardèche";
	 break;
	case "35" :
	rg = "Ardennes";
	 break;
	case "70" :
	rg = "Ariège";
	 break;
	case "36" :
	rg = "Aube";
	 break;
	case "57" :
	rg = "Aude";
	 break;
	case "71" :
	rg = "Aveyron";
	 break;
	case "7" :
	rg = "Bas Rhin";
	 break;
	case "95" :
	rg = "Bouches du Rhône";
	 break;
	case "18" :
	rg = "Calvados";
	 break;
	case "15" :
	rg = "Cantal";
	 break;
	case "88" :
	rg = "Charente";
	 break;
	case "89" :
	rg = "Charente Maritime";
	 break;
	case "29" :
	rg = "Cher";
	 break;
	case "62" :
	rg = "Corrèze";
	 break;
	case "39" :
	rg = "Corse du Sud";
	 break;
	case "21" :
	rg = "Côte d'Or";
	 break;
	case "25" :
	rg = "Côtes d'Armor";
	 break;
	case "63" :
	rg = "Creuse";
	 break;
	case "90" :
	rg = "Deux Sèvres";
	 break;
	case "9" :
	rg = "Dordogne";
	 break;
	case "41" :
	rg = "Doubs";
	 break;
	case "101" :
	rg = "Drôme";
	 break;
	case "52" :
	rg = "Essonne";
	 break;
	case "47" :
	rg = "Eure";
	 break;
	case "30" :
	rg = "Eure et Loir";
	 break;
	case "26" :
	rg = "Finistère";
	 break;
	case "58" :
	rg = "Gard";
	 break;
	case "73" :
	rg = "Gers";
	 break;
	case "10" :
	rg = "Gironde";
	 break;
	case "45" :
	rg = "Guadeloupe";
	 break;
	case "46" :
	rg = "Guyane";
	 break;
	case "8" :
	rg = "Haut Rhin";
	 break;
	case "40" :
	rg = "Haute Corse";
	 break;
	case "72" :
	rg = "Haute Garonne";
	 break;
	case "16" :
	rg = "Haute Loire";
	 break;
	case "38" :
	rg = "Haute Marne";
	 break;
	case "43" :
	rg = "Haute Saône";
	 break;
	case "106" :
	rg = "Haute Savoie";
	 break;
	case "64" :
	rg = "Haute Vienne";
	 break;
	case "93" :
	rg = "Hautes Alpes";
	 break;
	case "75" :
	rg = "Hautes Pyrénées";
	 break;
	case "53" :
	rg = "Hauts de Seine";
	 break;
	case "59" :
	rg = "Hérault";
	 break;
	case "27" :
	rg = "Ille et Vilaine";
	 break;
	case "31" :
	rg = "Indre";
	 break;
	case "32" :
	rg = "Indre et Loire";
	 break;
	case "102" :
	rg = "Isère";
	 break;
	case "42" :
	rg = "Jura";
	 break;
	case "98" :
	rg = "La Réunion";
	 break;
	case "11" :
	rg = "Landes";
	 break;
	case "33" :
	rg = "Loir et Cher";
	 break;
	case "103" :
	rg = "Loire";
	 break;
	case "80" :
	rg = "Loire Atlantique";
	 break;
	case "34" :
	rg = "Loiret";
	 break;
	case "74" :
	rg = "Lot";
	 break;
	case "12" :
	rg = "Lot et Garonne";
	 break;
	case "60" :
	rg = "Lozère";
	 break;
	case "81" :
	rg = "Maine et Loire";
	 break;
	case "19" :
	rg = "Manche";
	 break;
	case "37" :
	rg = "Marne";
	 break;
	case "69" :
	rg = "Martinique";
	 break;
	case "82" :
	rg = "Mayenne";
	 break;
	case "5" :
	rg = "Mayotte";
	 break;
	case "65" :
	rg = "Meurthe et Moselle";
	 break;
	case "66" :
	rg = "Meuse";
	 break;
	case "28" :
	rg = "Morbihan";
	 break;
	case "67" :
	rg = "Moselle";
	 break;
	case "22" :
	rg = "Nièvre";
	 break;
	case "78" :
	rg = "Nord";
	 break;
	case "1" :
	rg = "Nouvelle Calédonie";
	 break;
	case "86" :
	rg = "Oise";
	 break;
	case "20" :
	rg = "Orne";
	 break;
	case "49" :
	rg = "Paris";
	 break;
	case "79" :
	rg = "Pas de Calais";
	 break;
	case "4" :
	rg = "Polynésie française";
	 break;
	case "17" :
	rg = "Puy de Dôme";
	 break;
	case "13" :
	rg = "Pyrénées Atlantiques";
	 break;
	case "61" :
	rg = "Pyrénées Orientales";
	 break;
	case "104" :
	rg = "Rhône";
	 break;
	case "6" :
	rg = "Saint Pierre et Miquelon";
	 break;
	case "23" :
	rg = "Saône et Loire";
	 break;
	case "83" :
	rg = "Sarthe";
	 break;
	case "105" :
	rg = "Savoie";
	 break;
	case "50" :
	rg = "Seine et Marne";
	 break;
	case "48" :
	rg = "Seine Maritime";
	 break;
	case "54" :
	rg = "Seine St Denis";
	 break;
	case "87" :
	rg = "Somme";
	 break;
	case "76" :
	rg = "Tarn";
	 break;
	case "77" :
	rg = "Tarn et Garonne";
	 break;
	case "44" :
	rg = "Territoire de Belfort";
	 break;
	case "56" :
	rg = "Val d'Oise";
	 break;
	case "55" :
	rg = "Val de Marne";
	 break;
	case "96" :
	rg = "Var";
	 break;
	case "97" :
	rg = "Vaucluse";
	 break;
	case "84" :
	rg = "Vendée";
	 break;
	case "91" :
	rg = "Vienne";
	 break;
	case "68" :
	rg = "Vosges";
	 break;
	case "3" :
	rg = "Wallis et Futuna";
	 break;
	case "24" :
	rg = "Yonne";
	 break;
	case "51" :
	rg = "Yvelines";
	 break;
	 default: 
	rg = "Inconnu";
	 break; 
		
	}	
	 
	$("#rechercheGeoloc #geolocalisationdept").empty();		
	$("#rechercheGeoloc #geolocalisationdept").prepend('Vous avez choisi le département : <h3>'+rg+'</h3>');
	 
	 
	});
	 
    	
});
	  
	



 /*=======================================================================================*/
/*|                  recherche formations                     |*/
/*=======================================================================================*/

	
	 //postbac
 
 
 	 $('#formation').live("pagebeforeshow", function() {
	 
  $('input[name="attr_niveau_etude_t"]').change( function() {

	var val = $(this).filter(':checked').val();

	
	
		
		$("#formation #region_select_forma").attr('style', 'display:block;'); 			   
		$("#formation #domain_select_forma").attr('style', 'display:block;');

		var myselect1 = $("#formation select#region_select");
		myselect1[0].selectedIndex = 0;
		myselect1.selectmenu("refresh");
		
		var myselect3 = $("#formation select#domain_select");
		myselect3[0].selectedIndex = 0;
		myselect3.selectmenu("refresh");
		
					


		});
		
			 });
			 
			 
        
         $("#formation").live("pagecreate", function() {
		 
        $("#rechercheforma").submit(function(event) {
			   
					if( $('input[name="attr_niveau_etude_t"]').filter(':checked').val() != '' ) {
												
						if($("#rechercheforma #domain_select").attr('value') =="") 
						
						 {                        
						
						alert("Veuillez sélectionner un domaine");
						
						return false;
						}
						
						if($(" #rechercheforma #region_select").attr('value') =="") 
						 {                        
						
						alert("Veuillez sélectionner une région");
						
						
						return false;
						}
						   
					}
				
			});
			
			});
 
 
 /*=======================================================================================*/
/*|                  recherche métiers                     |*/
/*=======================================================================================*/

 $('#metier').live("pagebeforeshow", function() {
 
	if($('input[name="tri_metiers"]').filter(':checked').val() !="1" &&
	$('input[name="tri_metiers"]').filter(':checked').val() !="2" &&
	$('input[name="tri_metiers"]').filter(':checked').val() !="3"
	)
	{	
		$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
		$('#metier #oni_select_contres_interets_me select').selectmenu('disable');
		$('#metier #boutonmetiers input').textinput('disable');	
	}
	
		$('input[name="tri_metiers"]').change( function() {

		var val = $(this).filter(':checked').val();

		if( val == '1' ) {
	
			$("#metier .boutontravail").attr('style', 'border: 2px solid #C1D201;');
			$("#metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', 'border: 2px solid #C1D201;');
			
			$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr('style', '');
			$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr('style', '');
												
			
			$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text');
			$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
			$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
			
			$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('enable');
			$('#metier #oni_select_contres_interets_me select').selectmenu('disable');
			$('#metier #boutonmetiers input').textinput('disable');	

			
			
			$("#oni_nom_metier2").val("");
			
			$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
				
			$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
				
			$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text');
			
			$("#metier #bboutonmetiers").attr('style', 'display:none;');
			
			$("#metier #bboutonmetierssecteurs").attr('style', 'display:block;');
			
			$("#metier #bboutonmetiersinterets").attr('style', 'display:none;');
			
	

	
	
					}
					else if( val == '2' ) {
					
									
									
									$("#metier .boutonjaime").attr('style', 'border: 2px solid #C1D201;');
									$("#metier #oni_select_contres_interets_me .ui-btn-up-c").attr('style', 'border: 2px solid #C1D201;');
									
									
									$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', '');
									$("#metier .boutonlibre, #metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c").attr('style', '');
												
									
								
									$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ');
									$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									
									$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
									$('#metier #oni_select_contres_interets_me select').selectmenu('enable');
									$('#metier #boutonmetiers input').textinput('disable');	
									
									
			
									$("#oni_nom_metier2").val("");	


									$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text');
										
									$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
										
									$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
									
									$("#metier #bboutonmetiers").attr('style', 'display:none;');
									
									$("#metier #bboutonmetierssecteurs").attr('style', 'display:none;');
									
									$("#metier #bboutonmetiersinterets").attr('style', 'display:block;');
									
									
														
					
					
											}
											else
											{
											
												
												$("#metier .boutonlibre").attr('style', 'border: 2px solid #C1D201;');
												$("#metier #boutonmetiers .ui-input-search, #metier #bboutonmetiers .ui-btn-up-c ").attr('style', 'border: 2px solid #C1D201;');
												
												$("#metier #oni_select_contres_interets_me .ui-btn-up-c, #metier .boutonjaime").attr('style', '');
												$("#metier .boutontravail, #metier #oni_select_secteurs_professionnels_me .ui-btn-up-c").attr('style', '');
												
												
												
												
									
												$("#metier #oni_select_secteurs_professionnels_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
												$("#metier #oni_select_contres_interets_me span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
												$("#metier #boutonmetiers span.ui-btn-text").attr('class', 'ui-btn-text ');
												
												$('#metier #oni_select_secteurs_professionnels_me select').selectmenu('disable');
												$('#metier #oni_select_contres_interets_me select').selectmenu('disable');
												$('#metier #boutonmetiers input').textinput('enable');	
											
											
												$("#oni_nom_metier2").val("");
																		
																		
												$("#metier .boutonjaime span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');
													
												$("#metier .boutonlibre span.ui-btn-text").attr('class', 'ui-btn-text');
													
												$("#metier .boutontravail span.ui-btn-text").attr('class', 'ui-btn-text ui-disabled');

											
												$("#metier #bboutonmetiers").attr('style', 'display:block;');
												
												$("#metier #bboutonmetierssecteurs").attr('style', 'display:none;');
												
												$("#metier #bboutonmetiersinterets").attr('style', 'display:none;');
											
											}


 });
	 });
	 


	
	 $('#metier').live("pagecreate", function() {
 
         /* Controle du formulaire avant envoie */
        $("#recherchemetier").submit(function(event) {
				
				  
			
				if( $('input[name="tri_metiers"]').filter(':checked').val() == '3' ) {
                    
					if($("#oni_nom_metier2").attr('value') =="") 
					 {                        
					
					alert("Aucun mot clé n'est renseigné");
					return false;
					}
					
					                       
                }
				
        });
		
		
  });






 /*=======================================================================================*/
/*|                  liste résultats                     |*/
/*=======================================================================================*/
 


 //si error xml
 $(document).ajaxError(function(event, request, settings) {
	$.mobile.hidePageLoadingMsg();
	$("#resultatrecherchelibre .contenuliste").empty();
	$("#resultatrecherchelibre .contenuliste").prepend("Erreur de chargement");
	$("#resultatrecherchelibre .contenu").show();
	$(".ui-footer").show();

});

 
		$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
	  if($.getUrlVars()[name] ==null) return "";
	  else
		return $.getUrlVars()[name];
	  }
	});

		

		function getParameterByName( name ) //courtesy Artem
		{
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec( window.location.href );
		  if( results == null )
			return "";
		  else
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}

	



	univers = $.getUrlVar('univers');  
	inputLibre = $.getUrlVar('inputLibre'); 
	
	if(univers != "")
	{
	
	univers =""; 
  $("#resultatrecherchelibre .contenuliste").empty();
  $("#resultatrecherchelibre .contenu").hide();
  
 
	id = $.getUrlVar('id'); 
	menu = $.getUrlVar('menu'); 
	univers = $.getUrlVar('univers'); 
	if(univers == "all") univers = "";
	inputLibre = $.getUrlVar('inputLibre');  
	attr_centres_interet_t = $.getUrlVar('attr_centres_interet_t'); 
	formationid = $.getUrlVar('formationid'); 
	titrerecheche = $.getUrlVar('titrerecheche'); 
	offset = Number($.getUrlVar('offset'));


	// Metier
	oni_select_secteurs_professionnels = $.getUrlVar('oni_select_secteurs_professionnels'); 
	oni_select_contres_interets = $.getUrlVar('oni_select_contres_interets'); 
	oni_nom_metier2 = $.getUrlVar('oni_nom_metier2'); 
	var tri_metiers = $.getUrlVar('tri_metiers'); 
	// test metier
	if(oni_select_secteurs_professionnels != "" ) oni_select_secteurs_professionnels1 = 'attr_secteurs_activite_t:'+oni_select_secteurs_professionnels;
	if(oni_select_contres_interets != "" ) attr_centres_interet_t1 = '&attr_centres_interet_t='+oni_select_contres_interets;
	if(oni_nom_metier2 != "" ) inputLibre = oni_nom_metier2;
	if(tri_metiers == 1) {attr_centres_interet_t1 = "";    inputLibre = "";}
	else if(tri_metiers == 2) {oni_select_secteurs_professionnels1 = "";   inputLibre = "";}
	else if(tri_metiers == 3) {oni_select_secteurs_professionnels1 = "";  attr_centres_interet_t1 = ""; }

	
	// Video
	oni_select_secteurs_professionnels_video = $.getUrlVar('oni_select_secteurs_professionnels_video'); 
	oni_nom_metier2_video = $.getUrlVar('oni_nom_metier2_video'); 
	
	// test video
	if(oni_select_secteurs_professionnels_video == "00" ) oni_select_secteurs_professionnels_video = "";
	if(oni_select_secteurs_professionnels_video != "" ) oni_select_secteurs_professionnels_video1 = 'attr_secteurs_t:'+oni_select_secteurs_professionnels_video;
	if(oni_nom_metier2_video !="" ) inputLibre = oni_nom_metier2_video;

	
	// Formation
	region_select = $.getUrlVar('region_select'); 
	dpt_select = $.getUrlVar('dpt_select'); 
	domain_select = $.getUrlVar('domain_select'); 
	attr_niveau_enseignement_t = $.getUrlVar('attr_niveau_enseignement_t'); 
	//postbac
	attr_niveau_etude_t = $.getUrlVar('attr_niveau_etude_t'); 
	// test Formation
	if(domain_select != "" ) domain_select1 = 'attr_domaines_t:'+domain_select;
	if(region_select != "" ) region_select1 = 'attr_regions_t:'+region_select;
	if(dpt_select != "" ) dpt_select1 = 'attr_departements_t:'+dpt_select;
	if(univers == "formation_etab" || univers == "etab"  )
		{
			if(dpt_select != "" ) dpt_select1 = 'attr_departement_t:'+dpt_select;
			if(region_select != "" ) region_select1 = 'attr_region_t:'+region_select;
		}

	if(attr_niveau_enseignement_t == 5){ region_select1 = ""; }
	else if (attr_niveau_enseignement_t == 8){ dpt_select1 = "";}	
	if(attr_niveau_enseignement_t != "" ) attr_niveau_enseignement_t1 = '&attr_niveau_enseignement_t='+attr_niveau_enseignement_t;
	
	//formation postbac
	if(attr_niveau_etude_t == "Bac1"){ attr_niveau_etude_t1 = '&attr_typologie_generique_t=(5 6)'; }
	else if (attr_niveau_etude_t == "Bac4"){ attr_niveau_etude_t1 = '&attr_typologie_generique_t=(7 8)';}	


	// Géoloc
	tri_region = $.getUrlVar('tri_region'); 
	imputGeoloc = $.getUrlVar('imputGeoloc'); 
	codePostal = $.getUrlVar('codePostal'); 
	adressecomplete = $.getUrlVar('adressecomplete'); 
	// test Géoloc
	if(imputGeoloc !="" ) inputLibre = imputGeoloc;
	if(dpt_select !="" && codePostal != "" ) codePostal = "";
	if(region_select !="" && codePostal != "" ) codePostal = "";

	if(tri_region == 1) {  dpt_select1 =""; }
	else if(tri_region == 2) { region_select1 =""; }


	if(attr_centres_interet_t != "") attr_centres_interet_t1 = '&attr_centres_interet_t='+attr_centres_interet_t;
	
 	creationListegene();
	
	
	}
		

 $('#resultatrecherchelibre').live("pagebeforeshow", function() {
  $("#resultatrecherchelibre .contenuliste").empty();
  $("#resultatrecherchelibre .contenu").hide();
  $(".ui-footer").hide();
 
  });


 $('#resultatrecherchelibre').live("pageshow", function() { 

	
 
	region_select1 = "";
	dpt_select1 = "";
	attr_centres_interet_t1 = "";

	univers = "";
	menu = "";
	inputLibre = "";
	attr_centres_interet_t = "";
	formationid = "";
	titrerecheche = "";


		// Metier
	oni_select_secteurs_professionnels = "";
	oni_select_contres_interets = "";
	oni_nom_metier2 = "";
	tri_metiers = "";


		// metier
	oni_select_secteurs_professionnels1 =""; 
	attr_centres_interet_t1 =""; 


		//vidéo
	oni_select_secteurs_professionnels_video = "";
	oni_nom_metier2_video= "";	
	oni_select_secteurs_professionnels_video1 = "";


		// Formation
	region_select = "";
	dpt_select = "";
	domain_select = "";
	attr_niveau_enseignement_t = "";
	attr_niveau_etude_t ="";


		// Formation
	domain_select1 ="";

	attr_niveau_enseignement_t1 = "";
	
	attr_niveau_etude_t1= "";


		// Géoloc
	tri_region = "";
	imputGeoloc = "";
	codePostal = "";
	adressecomplete = ""; 

  $("#resultatrecherchelibre .contenuliste").empty();
  $("#resultatrecherchelibre .contenu").hide();
  
 
	id = getParameterByName("id", $(this).data("url")); 
	
	menu = getParameterByName("menu", $(this).data("url")); 	
	univers = getParameterByName("univers", $(this).data("url")); 
	if(univers == "all") univers = "";	
	
	
	inputLibre = getParameterByName("inputLibre", $(this).data("url"));  
	attr_centres_interet_t = getParameterByName("attr_centres_interet_t", $(this).data("url")); 
	formationid = getParameterByName("formationid", $(this).data("url")); 
	titrerecheche = getParameterByName("titrerecheche", $(this).data("url")); 
	offset = Number(getParameterByName("offset", $(this).data("url")));
	

	// Metier
	oni_select_secteurs_professionnels = getParameterByName("oni_select_secteurs_professionnels", $(this).data("url")); 
	oni_select_contres_interets = getParameterByName("oni_select_contres_interets", $(this).data("url")); 
	oni_nom_metier2 = getParameterByName("oni_nom_metier2", $(this).data("url")); 
	var tri_metiers = getParameterByName("tri_metiers", $(this).data("url")); 
	// test metier
	if(oni_select_secteurs_professionnels != "" ) oni_select_secteurs_professionnels1 = 'attr_secteurs_activite_t:'+oni_select_secteurs_professionnels;
	if(oni_select_contres_interets != "" ) attr_centres_interet_t1 = '&attr_centres_interet_t='+oni_select_contres_interets;
	if(oni_nom_metier2 != "" ) inputLibre = oni_nom_metier2;
	if(tri_metiers == 1) {attr_centres_interet_t1 = "";    inputLibre = "";}
	else if(tri_metiers == 2) {oni_select_secteurs_professionnels1 = "";   inputLibre = "";}
	else if(tri_metiers == 3) {oni_select_secteurs_professionnels1 = "";  attr_centres_interet_t1 = ""; }

	// Video
	oni_select_secteurs_professionnels_video = getParameterByName("oni_select_secteurs_professionnels_video", $(this).data("url"));
	oni_nom_metier2_video = getParameterByName("oni_nom_metier2_video", $(this).data("url"));
	// test video
	if(oni_select_secteurs_professionnels_video == "00" ) oni_select_secteurs_professionnels_video = "";
	if(oni_select_secteurs_professionnels_video != "" ) oni_select_secteurs_professionnels_video1 = 'attr_secteurs_t:'+oni_select_secteurs_professionnels_video;
	if(oni_nom_metier2_video !="" ) inputLibre = oni_nom_metier2_video;
	
	
	

	// Formation
	region_select = getParameterByName("region_select", $(this).data("url")); 
	dpt_select = getParameterByName("dpt_select", $(this).data("url"));

	domain_select = getParameterByName("domain_select", $(this).data("url")); 
	attr_niveau_enseignement_t = getParameterByName("attr_niveau_enseignement_t", $(this).data("url")); 
	attr_niveau_etude_t = getParameterByName("attr_niveau_etude_t", $(this).data("url")); 
	// test Formation
	if(domain_select != "" ) domain_select1 = 'attr_domaines_t:'+domain_select;
	if(region_select != "" ) region_select1 = 'attr_regions_t:'+region_select;
	if(dpt_select != "" ) dpt_select1 = 'attr_departements_t:'+dpt_select;
	if(univers == "formation_etab" || univers == "etab"  )
		{
		
			if(dpt_select != "" ) dpt_select1 = 'attr_departement_t:'+dpt_select;
			if(region_select != "" ) region_select1 = 'attr_region_t:'+region_select;
		}

	if(attr_niveau_enseignement_t == 5){ region_select1 = ""; }
	else if (attr_niveau_enseignement_t == 8){ dpt_select1 = "";}	
	if(attr_niveau_enseignement_t != "" ) attr_niveau_enseignement_t1 = '&attr_niveau_enseignement_t='+attr_niveau_enseignement_t;
	
	//formation postbac
	if(attr_niveau_etude_t == "Bac1"){ attr_niveau_etude_t1 = '&attr_typologie_generique_t=(5 6)'; }
	else if (attr_niveau_etude_t == "Bac4"){ attr_niveau_etude_t1 = '&attr_typologie_generique_t=(7 8)';}


	// Géoloc
	tri_region = getParameterByName("tri_region", $(this).data("url")); 
	imputGeoloc = getParameterByName("imputGeoloc", $(this).data("url")); 
	codePostal = getParameterByName("codePostal", $(this).data("url")); 
	adressecomplete = getParameterByName("adressecomplete", $(this).data("url")); 
	// test Géoloc
	if(imputGeoloc !="" ) inputLibre = imputGeoloc;
	if(dpt_select !="" && codePostal != "" ) codePostal = "";
	if(region_select !="" && codePostal != "" ) codePostal = "";

	if(tri_region == 1) {  dpt_select1 =""; }
	else if(tri_region == 2) { region_select1 =""; }


	if(attr_centres_interet_t != "") attr_centres_interet_t1 = '&attr_centres_interet_t='+attr_centres_interet_t;

		
	creationListegene();
	
    });
	
	
	
function creationListegene(){

	$.mobile.showPageLoadingMsg();
	testmenu(menu);
	

				var jqxhr = $.getJSON('http://www.onisep.fr/mobile/search/postbac/'+univers+'/'+inputLibre+''+attr_centres_interet_t1+''+attr_niveau_enseignement_t1+''+attr_niveau_etude_t1+'/'+formationid+'/'+codePostal+'/'+dpt_select1+''+region_select1+'/'+domain_select1+''+oni_select_secteurs_professionnels1+''+oni_select_secteurs_professionnels_video1+'/'+offset+'', function(data) {
  					var items = [];
  					var nb = 0; 
					nb = offset+1;
  					var typeDonnee = "";
					var typeDonnees = "";
					var texterecheche = "";					
					
					var nbpage = data[0].nbpage;
					
					
					if(univers == "") univers = "all";
					
					if(dpt_select != "") dpt_select = '&dpt_select='+dpt_select+'';
					if(region_select != "") region_select = '&region_select='+region_select+'';
					if(codePostal != "") codePostal = '&codePostal='+codePostal+'';
					if(adressecomplete != "") adressecomplete = '&adressecomplete='+adressecomplete+'';
					if(attr_niveau_enseignement_t != "") attr_niveau_enseignement_t = '&attr_niveau_enseignement_t='+attr_niveau_enseignement_t+'';
					if(domain_select != "") domain_select = '&domain_select='+domain_select+'';
					if(oni_select_secteurs_professionnels != "") oni_select_secteurs_professionnels = '&oni_select_secteurs_professionnels='+oni_select_secteurs_professionnels+'';
					if(oni_select_contres_interets != "") oni_select_contres_interets = '&oni_select_contres_interets='+oni_select_contres_interets+'';
					if(oni_nom_metier2 != "") oni_nom_metier2 = '&oni_nom_metier2='+oni_nom_metier2+'';
					
					if(imputGeoloc != "") imputGeoloc = '&imputGeoloc='+imputGeoloc+'';
					if(formationid != "") formationid = '&formationid='+formationid+'';
					if(univers != "") univers = '&univers='+univers+'';
					
										
					if(titrerecheche != "") texterecheche = titrerecheche;
					else { texterecheche = inputLibre; }
					
					
					texterecheche = unescape(texterecheche);
					texterecheche = texterecheche.replace(/[+]/gi, " ");
					texterecheche = texterecheche.replace("Ã©","é").replace("à©","é").replace("Ã´","ô").replace("Ã¨","è").replace("Ã§","ç").replace("Ã¹","ù").replace("Ã","à");	
					
					var namevideo;
					
					if(texterecheche == "") texterecheche = ""; else texterecheche = 'pour : "'+texterecheche+'"' ;
					
					if(inputLibre != "") inputLibre = '&inputLibre='+inputLibre+'';
					
					var count = data[0].count;
					//test etab identique
					if(count == 2 && data[0].identifiant == data[1].identifiant ) { count = 1; }
					if(count == 3 && data[0].identifiant == data[1].identifiant ) { count = 2; nb = 0;   }
					if(count == 2 && (data[0].identifiant == data[1].identifiant) && (data[0].identifiant == data[2].identifiant) ) { count = 1; nb = 0;  }
					
					if(offset < 20){
					if(count <= 20)	items.push('<li data-role="fieldcontain">Voici le(s) '+count+' résultat(s)  de votre recherche '+texterecheche+'</li>');
					else items.push('<li data-role="fieldcontain">Les 20 premiers résultats trouvés '+texterecheche+'</li>');
  					}else
					{
					var countsuv = count - offset ;
					if(countsuv >= 20) countsuv = 20;
					if(countsuv == 1) countsuv = "";
					items.push('<li data-role="fieldcontain">Le(s) '+countsuv+' résultat(s) suivant(s)  '+texterecheche+'</li>');
					}					
					//parcour du JSON et création des elements de la liste
					
  					jQuery.each(data, function(element){
  							//type de résultat	
							
			if((nb == 0 && count == 2) || (nb == 2 && count == 1) || (nb == 0 && count == 1)  ){} 
			else{
  							if(data[element].classidentifier == "metier"){typeDonnee = "metiers.html?idmetier"; typeDonnees = "Métier";}
  							else if(data[element].classidentifier == "formation") { typeDonnee = "formation.html?idforma"; typeDonnees = "Formation";}
							else  if(data[element].classidentifier == "lycee" || data[element].classidentifier == "college" || data[element].classidentifier == "ems" || data[element].classidentifier == "postbac" || data[element].classidentifier == "universite")  {typeDonnee = "etablissement.html?idetab"; typeDonnees = "Etablissement / "+data[element].departement+"";}
  							
							if(data[element].classidentifier == "webtv_mobile") {
							namevideo = data[element].name.replace("(1)","").replace("(2)","").replace("(3)","");
							 if(nb/2 == Math.round(nb/2))							 						 
							 items.push('<li data-theme="c" class="videosrecherche"><a style="white-space: normal;" href="'+data[element].url_video+'"  class="listeR"><img src="http://www.onisep.fr/'+data[element].photo+'" >'+nb+' - '+namevideo+'</a></li>');
							 else
  							//ajout du lien dans la liste
  							items.push('<li data-theme="d" class="videosrecherche"><a style=" white-space: normal;" href="'+data[element].url_video+'"  class="listeR"><img src="http://www.onisep.fr/'+data[element].photo+'" >'+nb+' - '+namevideo+'</a></li>');
							}
							else{
							
							if(nb/2 == Math.round(nb/2))							 						 
							 items.push('<li data-theme="c"><a style=" white-space: normal;" href="'+typeDonnee+'='+data[element].nodeId+''+dpt_select+''+region_select+''+codePostal+''+adressecomplete+'&menu='+menu+'"  class="listeR"><strong style="font-size:0.8em">'+nb+' - '+typeDonnees+'</strong><br />  '+data[element].name+'</a></li>');
							 else
  							//ajout du lien dans la liste
  							items.push('<li data-theme="d"><a style=" white-space: normal;" href="'+typeDonnee+'='+data[element].nodeId+''+dpt_select+''+region_select+''+codePostal+''+adressecomplete+'&menu='+menu+'"  class="listeR"><strong style="font-size:0.8em">'+nb+' - '+typeDonnees+'</strong><br />  '+data[element].name+'</a></li>');
							}
							
				}
  							nb++;
							
				
  					});
					
					if(count > 0){
					
					
						if( count < 20 )
						{
						$("#resultatrecherchelibre #pagel").attr("disabled","disabled");
						$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left ui-disabled');
						$("#resultatrecherchelibre#pager").attr("disabled","disabled");
						$("#resultatrecherchelibre #pager span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-right ui-controlgroup-last ui-disabled');
						}
						else
						{
							
									if(count == 20) 
									{
									$("#resultatrecherchelibre #pagel").attr("disabled","disabled");
									$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left ui-disabled');
									$("#resultatrecherchelibre #pager").attr("disabled","disabled");							
									$("#resultatrecherchelibre #pager span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-right ui-controlgroup-last ui-disabled');					
											
									}
									else{
									
									
									if(offset == 0) 
										{
										
										$("#resultatrecherchelibre #pagel").attr("disabled","disabled");
										$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left ui-disabled');	
										
										$("#resultatrecherchelibre #pager").attr("disabled","");
										$("#resultatrecherchelibre #pager span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left');
										var offsetr = offset + Number(20);												
										$("#resultatrecherchelibre #pager").attr('href', 'resultats.html?'+inputLibre+''+univers+'&menu='+menu+''+attr_niveau_enseignement_t+''+region_select+''+dpt_select+''+domain_select+''+oni_select_secteurs_professionnels+''+oni_select_contres_interets+''+oni_nom_metier2+''+codePostal+''+adressecomplete+''+imputGeoloc+''+formationid+'&offset='+offsetr);
										
									
										}
												
										if(offset > 0 ) 
										{
										
										$("#resultatrecherchelibre #pagel").attr("disabled","");
										$("#resultatrecherchelibre #pagel span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left');
										var offsetl = offset - Number(20);
										$("#resultatrecherchelibre #pagel").attr('href', 'resultats.html?'+inputLibre+''+univers+'&menu='+menu+''+attr_niveau_enseignement_t+''+region_select+''+dpt_select+''+domain_select+''+oni_select_secteurs_professionnels+''+oni_select_contres_interets+''+oni_nom_metier2+''+codePostal+''+adressecomplete+''+imputGeoloc+''+formationid+'&offset='+offsetl); 
										
										if (offset+20 > count) 
										{	
										
										$("#resultatrecherchelibre #pager").attr("disabled","disabled");								
										$("#resultatrecherchelibre #pager span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-right ui-controlgroup-last ui-disabled');
										$("#resultatrecherchelibre #pager").attr('href', '');
										}
										else
										{
										$("#resultatrecherchelibre #pager").attr("disabled","");
										$("#resultatrecherchelibre #pager span.ui-btn-inner").attr('class', 'ui-btn-inner ui-corner-left');
										var offsetr = offset + Number(20);												
										$("#resultatrecherchelibre #pager").attr('href', 'resultats.html?'+inputLibre+''+univers+'&menu='+menu+''+attr_niveau_enseignement_t+''+region_select+''+dpt_select+''+domain_select+''+oni_select_secteurs_professionnels+''+oni_select_contres_interets+''+oni_nom_metier2+''+codePostal+''+adressecomplete+''+imputGeoloc+''+formationid+'&offset='+offsetr);
										}
										
									
										}	
											
											
	
											
											
						
											}
										
										
								
											
						
						}
					
									
					
					$("#resultatrecherchelibre #bouton_page").attr("style", "display:block;");
					
					$("#resultatrecherchelibre #bouton_page .legend").empty();					
					$("#resultatrecherchelibre #bouton_page .legend").prepend('<strong>'+count+'</strong> résultat(s) trouvé(s) ');
						

					$("#resultatrecherchelibre .contenu").show();				
					
					//creation de la liste
  					$('<ul />', {'class': 'liste','data-role':'listview',html: items.join('')} ).appendTo('#resultatrecherchelibre  .contenuliste');
  					//Prise en compte de la liste par JQM 
  					$('#resultatrecherchelibre .contenuliste .liste').listview();
					$('#resultatrecherchelibre .contenuliste .liste').listview('refresh');
				
						
					//suppressio du loader
					$.mobile.hidePageLoadingMsg();
					
					
					$(".ui-footer").show();
					
					$("#resultatrecherchelibre .videosrecherche a.listeR").click( function()
						   {
						   
						   var linkvideo = $(this).attr('href')
							//alert(linkvideo);
													
							window.plugins.videoPlayer.play(linkvideo);
							  void(0);
							 return false; 
							 							
							 
						   }
					  );
						
					}
					else
					{
					
					$("#resultatrecherchelibre .contenuliste").empty();
					$("#resultatrecherchelibre .contenuliste").prepend("Aucun résultat");
					$("#resultatrecherchelibre .contenu").show();	
					$.mobile.hidePageLoadingMsg();	
					$(".ui-footer").show();			
					$('#resultatrecherchelibre .listeresultat').listview();
					$('#resultatrecherchelibre .listeresultat').listview('refresh');					
					
					}
					

				})
				
				

 


}




 
 
 
 /*=======================================================================================*/
/*|                  Fonction d'affichage de la fiche établissement                     |*/
/*=======================================================================================*/
  

		var idetab = $.getUrlVar('idetab');
		

		if(idetab !="")
		{
		
		adressecomplete = $.getUrlVar('adressecomplete');
		univers = $.getUrlVar('univers'); 
		menu = $.getUrlVar('menu');
	
		ficheEtablissement();

		}

	$('#ficheEtablissement').live("pagebeforeshow", function() {
 
	$("#ficheEtablissement .contenu").hide();
	$(".ui-footer").hide();
	
  });

	$('#ficheEtablissement').live("pageshow", function() {

	idetab = getParameterByName("idetab", $(this).data("url"));  
	adressecomplete = getParameterByName("adressecomplete", $(this).data("url")); 
	univers = getParameterByName("univers", $(this).data("url")); 
	menu = getParameterByName("menu", $(this).data("url")); 	

    ficheEtablissement();

	
    });	
	




 
	function ficheEtablissement(){

						
			
				$.mobile.showPageLoadingMsg();
				$(".ui-footer").hide();
				$("#ficheEtablissement .contenu .zonehaut").empty();
				
				testmenu(menu);
				
				var jqxhr = $.getJSON('http://www.onisep.fr/mobile/etab/'+idetab, function(data) {
					var items = [];
				
								
					//recuperation et formatage des donnees
					var name = data['name'];
					
					
					var adresse = data['voie']; 
					var CP = data['code_postal']; 
					var ville = data['commune']; 
					var tel = data['telephone']; 
						if(tel != "") {
							tel = tel.replace(/[ ]/gi,"");
							tel = '+33'+tel.substring(1,tel.length);
						}
					
					var courriel = data['courriel'];
					var site_web = data['site_web'];
					
					var latitudes = data['latitude'];
					var longitudes = data['longitude'];
								
					//affichage des informations
						var courriel = data['courriel'];
					var site_web = data['site_web'];
					
					var statut_etablissement = data['statut_etablissement'];
					
					var journees_portes_ouvertes = data['journees_portes_ouvertes'];
					
					var latitudes = data['latitude'];
					var longitudes = data['longitude'];
								
					//affichage des informations
					var contenu ="";
					var namecookies = name.replace(/[']/gi, "\\'");
					contenu+='<a href ="messagefavorise.html" onclick="cook(\''+namecookies+'';
					contenu+='--'+idetab+'\',\'etab\')" style="float:right" ><img src="img/ajout_favoris.png" /></a>';
					contenu+='<h4>Etablissement</h4>';
					contenu+='<h3>'+name+'</h3>';
					contenu+='<p>';
					if(adresse != "") contenu+=''+adresse+'<br />';
					if(CP != "") contenu+=''+CP+' ';
					if(ville != "") contenu+=''+ville+'<br />';
					if(tel != "") contenu+='<b>Tél: </b><a href ="tel:'+tel+'">'+tel+'</a><br />';
					if(courriel != "") contenu+='<b>Mél: </b><a href ="mailto:'+courriel+'">'+courriel+'</a><br />';
					if(site_web != "") contenu+='<b>Site: </b><a href ="http://'+site_web+'"  >'+site_web+'</a><br />';
					if(statut_etablissement != "" && statut_etablissement != "CFA privé" && statut_etablissement != "CFA public" && statut_etablissement != "non communiqué") contenu+='<b>Statut: </b>'+statut_etablissement+'<br />';
					if(journees_portes_ouvertes != "") contenu+='<b>Portes ouvertes: </b>'+journees_portes_ouvertes+'<br />';
					
								
					contenu+='<br /><b>Situer sur la carte: </b>';
					if(adressecomplete != "") contenu+='<a href="http://maps.google.fr/maps?saddr='+adressecomplete+'&daddr='+latitudes+','+longitudes+'" target=_blank >Itinéraire</a>';
					
					var widthmap = $(document).width() - 60;
					
					contenu+='<br /><a href="http://maps.google.fr/maps?q='+latitudes+','+longitudes+'" target=_blank ><img src="http://maps.google.com/staticmap?zoom=14&size='+widthmap+'x300&format=jpg-baseline&maptype=roadmap&markers='+latitudes+','+longitudes+'&key=ABQIAAAAqkDFarbLiZu6nc7_FF0DPBT0z_T0kX_VKP-BAVnVAz4WK3pLThQwCmOEdFYNbFNESGQTA4KkgQHCcQ"></a><br />';
					
					
								
					contenu+='</p>';
					
									
					
					$('<ul />', {'class': 'liste','data-role':'listview',html: contenu} ).appendTo('#ficheEtablissement  .zonehaut');
  					
					//Prise en compte de la liste par JQM 
  					$('#ficheEtablissement .zonehaut .liste').listview();
					$('#ficheEtablissement .zonehaut .liste').listview('refresh');
					
												
							
					$(".ui-footer").show();
							
					//suppressio du loader
					$.mobile.hidePageLoadingMsg();				
					
					$("#ficheEtablissement .contenu").show();
								
					})
					
				
 
				
					
		}




 




/*=======================================================================================*/
/*|                      Fonction d'affichage de la fiche métier                        |*/
/*=======================================================================================*/


	
	var idmetier = $.getUrlVar('idmetier');


	if(idmetier !="")
	{
	menu = $.getUrlVar('menu');
	ficheMetier();

	}
	


	$('#ficheMetier').live("pagebeforeshow", function() {
	
	$("#ficheMetier .contenu .zonehaut").empty();
	$("#ficheMetier .contenu").hide();
	$(".ui-footer").hide();
	
	 });


	 $('#ficheMetier').live("pageshow", function() { 
	 
	 $("#ficheMetier .contenu .zonehaut").empty();
	 $("#ficheMetier .contenu").hide();
	 $(".ui-footer").hide();
	  
	 idmetier = getParameterByName("idmetier", $(this).data("url"));
	 menu = getParameterByName("menu", $(this).data("url")); 
	
		ficheMetier();
		
		
		
	});	




function ficheMetier(){
		$("#ficheMetier .contenu .zonehaut").empty();
		$("#ficheMetier .contenu .exemple_forma div").empty();
		$("#ficheMetier .contenu .liste_video div").empty();	
		
		$.mobile.showPageLoadingMsg();	
		$(".ui-footer").hide();
	
		testmenu(menu);
	
	var jqxhr = $.getJSON('http://www.onisep.fr/mobile/metier/'+idmetier, function(data) {
	
		var idmetierideo = data['id_ideo'];
		var boutonformation = "";
		var formations = data['formations'];
		if(formations != "") boutonformation = "ok";
		var nom = data['nom'];
		var accroche = data['accroche'];			
		var niveau = data['niveau_access'];
		var salaireD = data['salaire_debut'];
		var CI = data['centres_interet'];
		var SE = data['secteurActi'];
 
		//affichage des informations
		var contenu ="";
		var namecookies = nom.replace(/[']/gi, "\\'");
		contenu+='<a href ="messagefavorism.html" onclick="cook(\''+namecookies+'';
		contenu+='--'+idmetier+'\',\'metiers\')" style="float:right" ><img src="img/ajout_favoris.png" /></a>';				
		contenu+='<h4>Métier</h4>';
		contenu+= '			<h3>'+nom+'</h3>';
		if(accroche != "") contenu+= '<p>'+accroche+'</p>';
		if(niveau != "") contenu+= '<b>Niveau d\'études :</b> '+niveau+'<br />';
		if((salaireD !='') && (salaireD != null)) contenu+= '<b>Salaire du débutant :</b> '+salaireD+' € « bruts par mois »<br />';
				
		contenu+= '	<br />';		
		contenu+= '<p class="lineheightp"><b>D\'autres métiers avec ces centres d\'interêts : </b><br />';
	
		//parcour des centres d'interets  					
		jQuery.each(data['centres_interet'], function(element){
		
		contenu+= '<a  href="resultats.html?attr_centres_interet_t='+data["centres_interet"][element]["id"]+'&univers=metier&menu='+menu+'" >'+data["centres_interet"][element]["name"]+'</a><br />';
		
		});		
		
		contenu+= '</p>';
		contenu+= '<p class="lineheightp"><b>D\'autres métiers dans ces secteur(s) professionnel(s) : </b><br />';	
		
		//parcour des secteur acti  					
		jQuery.each(data['secteurActi'], function(element){
		
		contenu+= '<a  href="resultats.html?oni_select_secteurs_professionnels='+data["secteurActi"][element]["id"]+'&univers=metier&menu='+menu+'" >'+data["secteurActi"][element]["name"]+'</a><br />';
		
		});
		
		contenu+= '</p>';

										
				

		
		
		$('<ul />', {'class': 'liste','data-role':'listview',html: contenu} ).appendTo('#ficheMetier .contenu .zonehaut');
  					//Prise en compte de la liste par JQM 
  					$('#ficheMetier .contenu .zonehaut .liste').listview();
					$('#ficheMetier .contenu .zonehaut .liste').listview('refresh');
		
		
		
		
				
		var urlvideo = "";
		var namevideo = "";

		var jqxhr = $.getJSON('http://www.onisep.fr/mobile/search/postbac/video/////attr_metiers_t:'+idmetierideo+'/0', function(data) {
		
		var count = data[0].count;
		var namevideo;
				if(count > 0)
				{
							
							var contenuvideo ='<ul class="listes ui-selectmenu-list ui-listview" >';
										
							//parcour du JSON et création des elements de la liste
								jQuery.each(data, function(element){
										//type de résultat							
						
										namevideo = data[element].name.replace("(1)","").replace("(2)","").replace("(3)","");
										
										contenuvideo += '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit videometier"  style=" white-space: normal;" href="'+data[element].url_video+'" ><img src="http://www.onisep.fr/'+data[element].photo+'" class="ui-li-thumb">'+namevideo+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li> ';
								});
								
							
								
											
												
											contenuvideo +="</ul>";
											$("#ficheMetier .contenu .liste_video div").append(contenuvideo);	
											$("#ficheMetier .contenu .liste_video").attr("style", "display:block;");
										

											$("#ficheMetier a.videometier").click( function()
											   {
											 
											   var linkvideo = $(this).attr('href')
												//alert(linkvideo);
												 
												 window.plugins.videoPlayer.play(linkvideo);
												  void(0);
												 return false;
												 
											   }
										  );										
											
				  
											
				}									
											
		});

			
   
		
		
		
		var contenus ="";
		
		contenus+= '<ul class="listes ui-selectmenu-list ui-listview" >'
		jQuery.each(data['listeformation'], function(element){
		contenus+= '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit" href="formation.html?idforma='+data["listeformation"][element]["id"]+'&menu='+menu+'"    >'+data["listeformation"][element]["name"]+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
		});				
				
		$("#ficheMetier .contenu .exemple_forma div").append(contenus);	 
 
 
 		if (boutonformation == "ok") $("#ficheMetier .contenu .exemple_forma").attr("style", "display:block;"); else $("#ficheMetier .contenu .exemple_forma").attr("style", "display:none;");
		

		
					  				
  		//suppressio du loader
		$.mobile.hidePageLoadingMsg();
		$(".ui-footer").show();
		
		$("#ficheMetier .contenu").show();
		
		
  
})


	
	
	
}




 
	

 
/*=======================================================================================*/
/*|                  Fonction d'affichage de la fiche formation                     |*/
/*=======================================================================================*/
	
	
	var idforma = $.getUrlVar('idforma');

	if(idforma !="")
	{
	var dpt_select = $.getUrlVar('dpt_select');
	var region_select = $.getUrlVar('region_select');
	var codePostal = $.getUrlVar('codePostal');
	
	if(dpt_select != "") dpt_select = '&dpt_select='+dpt_select+'';
	if(region_select != "") region_select = '&region_select='+region_select+'';
	if(codePostal != "") codePostal = '&codePostal='+codePostal+'';
	
	ficheFormation();

	}
		


	$('#ficheFormation').live("pagebeforeshow", function() {
	$("#ficheFormation .contenu .zonehaut").empty();
	$("#ficheFormation .contenu").hide();
	$(".ui-footer").hide();
	});	


	$('#ficheFormation').live("pageshow", function() {  
	$("#ficheFormation .contenu .zonehaut").empty();
    $("#ficheFormation .contenu").hide();
	$(".ui-footer").hide();
  
	idforma = getParameterByName("idforma", $(this).data("url"));
	
	menu = getParameterByName("menu", $(this).data("url")); 
	
 
	region_select = getParameterByName("region_select", $(this).data("url"));  
	dpt_select = getParameterByName("dpt_select", $(this).data("url"));  
	codePostal = getParameterByName("codePostal", $(this).data("url"));  

	if(dpt_select != "") dpt_select = '&dpt_select='+dpt_select+'';
	if(region_select != "") region_select = '&region_select='+region_select+'';
	if(codePostal != "") codePostal = '&codePostal='+codePostal+'';
			
    ficheFormation();
    });	
	
	
	

function ficheFormation(){
				$("#ficheFormation .contenu .zonehaut").empty();
				$("#ficheFormation .contenu .debouches div").empty();
				$("#ficheFormation .contenu .liste_metiers div").empty();
				$("#formaregion .listedept").empty();
				$("#ficheFormation .contenu .liste_metiers").attr("style", "display:none;");
				$("#ficheFormation .contenu .debouches").attr("style", "display:none;");
				
				$("#ficheFormation .contenu #buttonEtab").attr("style", "display:none;");
				$.mobile.showPageLoadingMsg();
				$(".ui-footer").hide();
				
				testmenu(menu);
				
				var jqxhr = $.getJSON('http://www.onisep.fr/mobile/formation/'+idforma, function(data) {
								
					//recuperation et formatage des donnees
					var name = data['name'];
					var libelle = data['libelle'];
					var sigle = data['sigle']; //if(sigle == "") sigle = "-";
					var diplome = data['diplome']; //if(diplome == "") diplome = "-";
					var type_formation = data['type_formation'];
					var duree = data['duree'];
					var niveau_terminal_etude = data['niveau_terminal_etude'];
					var natures_diplome = "";
					
					jQuery.each(data['natures_diplome'], function(element){
					natures_diplome = data['natures_diplome'][element]["name"];
					});	
				
					var descriptif_debouches_pro = data['descriptif_debouches_pro'];
												
					//affichage des informations
					var contenu ="";
					var namecookies = name.replace(/[']/gi, "\\'");
					contenu+='<a href ="messagefavorisf.html" onclick="cook(\''+namecookies+'';
					contenu+='--'+idforma+'\',\'formation\')" style="float:right" ><img src="img/ajout_favoris.png" /></a>';
					contenu+='<h4>Formation</h4>';
					contenu+='<h3>'+name+'</h3>';
									
					if(duree != "") contenu+='<p><b>Durée de la formation</b>: '+duree+'</p>';		
					if(niveau_terminal_etude != "") contenu+='<p><b>Niveau terminal d\'études</b>: '+niveau_terminal_etude+'</p>';		
					if(natures_diplome != "") contenu+='<p><b>Nature du diplôme</b>: '+natures_diplome+'</p>';						
					contenu+='';
					
					
					
					
					$('<ul />', {'class': 'liste','data-role':'listview',html: contenu} ).appendTo('#ficheFormation .contenu .zonehaut');
  					//Prise en compte de la liste par JQM 
  					$('#ficheFormation .contenu .zonehaut .liste').listview();
					$('#ficheFormation .contenu .zonehaut .liste').listview('refresh');
					
					
										
					if(descriptif_debouches_pro =="" && data['metiers_debouches_pro'] != "")
					{ 
					var contenuss ='<ul class="listes ui-selectmenu-list ui-listview" >';
					
					jQuery.each(data['metiers_debouches_pro'], function(element){
					contenuss+= '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit" href="metiers.html?idmetier='+data["metiers_debouches_pro"][element]["id"]+'&menu='+menu+'" class="listeR"  >'+data["metiers_debouches_pro"][element]["name"]+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
					});	
					contenuss+=" </ul>";
					
					$("#ficheFormation .contenu .liste_metiers div").append(contenuss);
					
					$("#ficheFormation .contenu .liste_metiers").attr("style", "display:block;");
					$("#ficheFormation .contenu .debouches").attr("style", "display:none;");
																			
					
					}else	{
					
							var contenus ="";
							contenus+='	'+descriptif_debouches_pro+'';
							
							if(data['metiers_debouches_pro'] != ""){
							contenus+='	<p class="lineheightp" ><strong>Exemple(s) de métier(s):</strong><br />';	
							
							jQuery.each(data['metiers_debouches_pro'], function(element){
							contenus+= '<a href="metiers.html?idmetier='+data["metiers_debouches_pro"][element]["id"]+'&menu='+menu+'" class="listeR"  >'+data["metiers_debouches_pro"][element]["name"]+'</a><br />';
							});	
							
							contenus+='</p>	';
							}
														
							$("#ficheFormation .contenu .debouches div").append(contenus);
							$("#ficheFormation .contenu .liste_metiers").attr("style", "display:none;");
							if(descriptif_debouches_pro =="") $("#ficheFormation .contenu .debouches").attr("style", "display:block;");					
					
							}
					
							
							
							if( (dpt_select =="" && region_select =="")  )
							{
									//ou se former
									var contenuss ="";
									
									if(data['deptformation'] != ""){
									
									contenuss+= '<ul class="listes ui-selectmenu-list ui-listview" >'
									contenuss+= '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit" href="resultats.html?univers=formation_etab&formationid='+idforma+''+dpt_select+''+region_select+'&codePostal='+codePostal+'&menu='+menu+'"  >Tous les départements</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
									var nbdeptfor ="0"
									jQuery.each(data['deptformation'], function(element){
									
									contenuss+= '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li" aria-hidden="true"><div class="ui-btn-text"><a class="listeR ui-link-inherit" href="resultats.html?univers=formation_etab&formationid='+idforma+'&dpt_select='+data["deptformation"][element]["identifiant"]+''+region_select+''+codePostal+'&menu='+menu+'"  >'+data["deptformation"][element]["name"]+'</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
									
									nbdeptfor++;
													});
									contenuss+= '</ul>'
									
									$("#formaregion .listedept").append(contenuss);
									
									if(nbdeptfor=="1"){
									$("#ficheFormation .contenu #buttonEtab").attr('href', 'resultats.html?univers=formation_etab&formationid='+idforma+''+dpt_select+''+region_select+''+codePostal+'&menu='+menu+''); 
									}
										
												
									
									$("#ficheFormation .contenu #buttonEtab").attr("style", "display:block;");									
																
								
									}
									
									
									
														
											
						}else{
							
					
					$("#ficheFormation .contenu #buttonEtab").attr('href', 'resultats.html?univers=formation_etab&formationid='+idforma+''+dpt_select+''+region_select+''+codePostal+'&menu='+menu+''); 
					
					//affichage du bouton 			
					$("#ficheFormation .contenu #buttonEtab").attr("style", "display:block;");
					
					}
					
					
					if(data['descriptif_debouches_pro'] == "") $("#ficheFormation .contenu .debouches").attr("style", "display:none;"); else $("#ficheFormation .contenu .debouches").attr("style", "display:block;");
						
					
					
					
					//$('#ficheFormation .contenu .listeforma').listview('refresh');	
					
					//suppressio du loader
					$.mobile.hidePageLoadingMsg();
					
					$(".ui-footer").show();
					
					$("#ficheFormation .contenu").show();
					
	})
	
	
 
 
			}


/*=======================================================================================*/
/*|                  menu                    |*/
/*=======================================================================================*/
			
function testmenu(menuactif){	
	switch (menuactif) {
	 case "libre":
	 $(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-b');	
	 $(".ui-block-b a").attr('class', 'metier ui-btn ui-btn-icon-top ui-btn-up-a');	
	  $(".ui-block-c a").attr('class', 'formation ui-btn ui-btn-icon-top ui-btn-up-a');
	  $(".ui-block-d a").attr('class', 'geoloc ui-btn ui-btn-icon-top ui-btn-up-a');
	 $(".ui-block-e a").attr('class', 'video ui-btn ui-btn-icon-top ui-btn-up-a');	  
	 break;
	 case "metier":
	 $(".ui-block-b a").attr('class', 'metier ui-btn ui-btn-icon-top ui-btn-up-b');	
	 $(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-a');	
	  $(".ui-block-c a").attr('class', 'formation ui-btn ui-btn-icon-top ui-btn-up-a');
	  $(".ui-block-d a").attr('class', 'geoloc ui-btn ui-btn-icon-top ui-btn-up-a');
	   $(".ui-block-e a").attr('class', 'video ui-btn ui-btn-icon-top ui-btn-up-a');	  
	  break;
	 case "formation":
	 $(".ui-block-c a").attr('class', 'formation ui-btn ui-btn-icon-top ui-btn-up-b');	
	 $(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-a');	
	 $(".ui-block-b a").attr('class', 'metier ui-btn ui-btn-icon-top ui-btn-up-a');	
	  $(".ui-block-d a").attr('class', 'geoloc ui-btn ui-btn-icon-top ui-btn-up-a');
	   $(".ui-block-e a").attr('class', 'video ui-btn ui-btn-icon-top ui-btn-up-a');	  
	  break;
	  case "etab":
	 $(".ui-block-d a").attr('class', 'geoloc ui-btn ui-btn-icon-top ui-btn-up-b');	
	 $(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-a');	
	 $(".ui-block-b a").attr('class', 'metier ui-btn ui-btn-icon-top ui-btn-up-a');	
	  $(".ui-block-c a").attr('class', 'formation ui-btn ui-btn-icon-top ui-btn-up-a');
	   $(".ui-block-e a").attr('class', 'video ui-btn ui-btn-icon-top ui-btn-up-a');	  
	  
	  break;
	  case "video":
	 $(".ui-block-d a").attr('class', 'geoloc ui-btn ui-btn-icon-top ui-btn-up-a');	
	 $(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-a');	
	 $(".ui-block-b a").attr('class', 'metier ui-btn ui-btn-icon-top ui-btn-up-a');	
	  $(".ui-block-c a").attr('class', 'formation ui-btn ui-btn-icon-top ui-btn-up-a');
	  $(".ui-block-e a").attr('class', 'video ui-btn ui-btn-icon-top ui-btn-up-b');	  
	  
	  break;
	 default: 
	$(".ui-block-a a").attr('class', 'search ui-btn ui-btn-icon-top ui-btn-up-b');	
	 break; 
	 
	}
			


 
 }


 
 });




//Code G.A. pour le site http://mobile.onisep.fr		
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27009047-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  



$(document).ready(function () { 

 $.mobile.page.prototype.options.backBtnText ='Retour';
$.mobile.dialog.prototype.options.closeBtnText ='Fermer';
$.mobile.loadingMessage='Chargement en cours...';
$.mobile.pageLoadErrorMessage='Une erreur s\'est produite lors du chargement de la page';
$.mobile.minScrollBack='0';
$.mobile.defaultPageTransition='none';
//$.mobile.touchOverflowEnabled = true; 
$.mobile.defaultDialogTransition = 'none';
$.mobile.page.prototype.options.domCache = true;




});
