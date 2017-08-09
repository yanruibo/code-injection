


    $(document).bind("mobileinit", function(){
    $.mobile.loadingMessage = 'Chargement en cours...';
    });















 	document.addEventListener("deviceready", onDeviceReady, false);
	function onBodyLoad()
	{
      //  $.mobile.changePage($("#home"));
		//alert('test');
      //  $.mobile.pageLoading();

	//	document.addEventListener("deviceready",onDeviceReady,false);
	}

	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	var db;
	function onDeviceReady()
	{
		//navigator.network.isReachable(ndd, reachableCallback);
		//alert('go');
	///	db = window.openDatabase("tlf", "1.0", "TLF", 6553600);
//		createDatabase();
	//	fillDatabase();
	//	checkDatabase();
		//getAllDonnees();
        //$.mobile.pageLoading(true);
        $('a.native-anchor').bind('click', function(ev) {
            var target = $( $(this).attr('href') ).get(0).offsetTop;
            $.mobile.silentScroll(target);
            return false;
        });
        powerOn();
        voirMenu();
        $('#body').scrollstart(function() { $(pathFooter).hide(); } );
        $('#body').scrollstop(function() { var offsety = window.pageYOffset+$(window).height()-$(pathFooter).height();
                              // var offsetx = window.pageXOffset;
                              //      console.log(offsety);
                              //placeObj(offsetx,offsety);
                              //   console.log(offsety+'--- '+pathFooter+' ' + $(pathFooter).height());
                              $(pathFooter).css('top',offsety);
                              $(pathFooter).fadeIn(); } );
       // $.mobile.changePage($('#home'),'fade');
	}
		//navigator.network.isReachable(ndd, reachableCallback);
		//pictureSource=navigator.camera.PictureSourceType;
        //destinationType=navigator.camera.DestinationType;
		// do your thing!
		//alert(getStorage('cle'));
		/*if(getStorage('cle') && miseAJourAEffectuer(true))
		{
			//alert('on essaye');
			getDonneesMembre();
			//remplissageDonneesMembre();
			
			jQT.goTo('#hp', 'slide');
			
		
		}	
		initInputs();
		*/
    
    
    //var div1 = document.getElementById("footerBasPage").style;
    
    var pathFooter = "#home .basPage"; 
    var activeFooter = true;
    
    function placeObj(px,py)
    {
        //div1.left=px;
        div1.top=py;
        console.log(py);
    }
    
    function voirMenu()
    {
        var posy;
        if(!activeFooter) {
            setTimeout("voirMenu()",100);
            return;
        }
        var offsety = window.pageYOffset+$(window).height()-$(pathFooter).height();
       // var offsetx = window.pageXOffset;
  //      console.log(offsety);
        //placeObj(offsetx,offsety);
     //   console.log(offsety+'--- '+pathFooter+' ' + $(pathFooter).height());
        $(pathFooter).css('top',offsety);
        $(pathFooter).fadeIn();
//        console.log(offsety+' Ok');
        setTimeout("voirMenu()",100);
    }
    
/*    if(document.getElementById) */
     //   voirMenu();
    
    
   

var franchiseursSelectionnes=new Array();

function demandeDocResultats()
{
    //On rajoute tout le monde dans la selection
    addFranchiseursToSelection(arrFranchiseursCourant);
    goToFormulaire();
}

function listeSelection()
{
    
}
function viderSelection()
{
    console.log('Vidage sélection');
    franchiseursSelectionnes = new Array();
    _sauverSelection()
    majNombreSelection();
    console.log('Fin vidage');
}
function _initSelection()
{
    var selection;

    selection=getStorage('selection')
    if(selection && selection.length) {
        //console.log(getStorage('selection'));
        franchiseursSelectionnes = explode(',',selection);   
        //console.log(franchiseursSelectionnes.length);
        majNombreSelection();
    }
    
}
function addFranchiseursToSelection(tabFranchiseurs)
{
    var idReseau;
    for(i in tabFranchiseurs) {
        idReseau = tabFranchiseurs[i];
        if(!franchiseurSelectionne(idReseau))
            franchiseursSelectionnes[franchiseursSelectionnes.length]=idReseau;
    }
    _sauverSelection();
    majNombreSelection();
    
}
function addFranchiseurToSelection(idReseau,obj)
{
  //  alert(idReseau+' '+obj);
    if(!franchiseurSelectionne(idReseau)) {
        franchiseursSelectionnes[franchiseursSelectionnes.length]=idReseau;
        _sauverSelection();
        majNombreSelection();
     //   if(obj)
            changeBoutonToSelectionne(idReseau,obj);
    }
}
function changeBoutonToSelectionne(idReseau,btn)
{
   // alert(obj);
//    var obj = $('#'+btnSelection.getAttribute('id'));
    var obj = $('.btnSelection'+idReseau);
    obj.removeClass("btnAjouter");
    obj.html("SUPPRIMER");
    var objs = document.getElementsByClassName('btnSelection'+idReseau);
    for(objC in objs)
      objs[objC].setAttribute('onclick','delFranchiseurFromSelection('+idReseau+',this);');  
    //obj.attr('onclick','delFranchiseurFromSelection('+idReseau+',this);');
    //btn.setAttribute('onclick','delFranchiseurFromSelection('+idReseau+',this);');
    /*if(btn.getAttribute('id')!='btnSelection'+idReseau && document.getElementById('btnSelection'+idReseau)) {
        changeBoutonToSelectionne(idReseau,document.getElementById('btnSelection'+idReseau));
    }*/
}
function changeBoutonToDeselectionne(idReseau,btn)
{
    //alert(obj);
//    var obj = $('.'+btn.getAttribute('id'));
        var obj = $('.btnSelection'+idReseau);
    obj.addClass("btnAjouter");
    obj.html("AJOUTER<br /><span style='font-size:8px;'>A LA SELECTION</span>");
    
    var objs= document.getElementsByClassName('btnSelection'+idReseau);
    for(objC=0;objC<objs.length;objC++) {
        console.log(objC);
        if(objC && objs[objC]) {
        console.log(objs[objC].getAttribute('onclick'));
        objs[objC].setAttribute('onclick','addFranchiseurToSelection('+idReseau+',this);');
        console.log(objs[objC].getAttribute('onclick'));
        }
    }
    console.log('fin function');
    return;
   // btn.setAttribute('onclick','addFranchiseurToSelection('+idReseau+',this);');
    //if(btn.getAttribute('id')!='btnSelection'+idReseau && document.getElementById('btnSelection'+idReseau)) {
    //    changeBoutonToDeselectionne(idReseau,document.getElementById('btnSelection'+idReseau));
    //}
}
function delFranchiseurFromSelection(idReseau,obj)
{
    //alert('del');
 //   effacerLigne(franchiseursSelectionnes,idReseau);
  //  if(obj)
    console.log('deLFR');
        changeBoutonToDeselectionne(idReseau,obj);
    console.log('desel');
    deselectionneFranchiseur(idReseau);
    console.log('del');
    if(pageCourante == '#listeSelection')
        delFranchiseurFromListeSelection(idReseau);
    console.log('delfromliste');
    _sauverSelection();
    majNombreSelection();
    
}
function delFranchiseurFromListeSelection(idReseau)
{
    console.log('FromListe '+idReseau);
    var lsf=document.getElementById('listeResultatFranchiseursSelectionnes');
    var elem = document.getElementById('ficheListing'+idReseau);
    console.log(lsf+' '+elem);
    if(lsf && elem)
    lsf.removeChild(elem);
}
function _sauverSelection()
{
    console.log(franchiseursSelectionnes.length);
    setStorage('selection',implode(',',franchiseursSelectionnes));
    console.log('sauvé '+getStorage('selection'));
}
function getNombreFranchiseursSelectionnes()
{
    return franchiseursSelectionnes.length;
}
function deselectionneFranchiseur(idReseau)
{
    for(i in franchiseursSelectionnes)
        if(franchiseursSelectionnes[i]==idReseau)
            franchiseursSelectionnes.splice(i,1);
}
function franchiseurSelectionne(idReseau)
{
    for(i in franchiseursSelectionnes)
        if(franchiseursSelectionnes[i]==idReseau)
            return true;
    return false;
}
function majNombreSelection()
{
    $('.nombreFranchiseursSelectionnes').html(franchiseursSelectionnes.length);
}
function loadLogosFromSelection()
{
    var codeHtml = "";
    for(i in franchiseursSelectionnes) {
        var id = franchiseursSelectionnes[i];
        codeHtml+='<div class="logoReseau" onclick="ficheFranchiseur('+ id +');" style="background-image:url(http://www.toute-la-franchise.com/images/zoom/reseaux/micro/'+id+'.jpg);float:left;margin-right:2px;margin-bottom:4px;" /></a>';
    }
    //alert(codeHtml);
    return codeHtml;
}


var arrApportsAppli = new Array();
var finActuelle = null;
var debutActuel = null;
var nicheActuelle = null;

function _createTableApports()
{
    requetesSql[requetesSql.length]='DROP TABLE IF EXISTS apports';
	requetesSql[requetesSql.length] = 'CREATE TABLE IF NOT EXISTS apports(nom TXT,value TXT,deb INT,fin INT,   PRIMARY KEY   (`value`))';    
}

/*function _getApports()
{
    req = 'SELECT * FROM apports ORDER BY deb';        
    db = _openDatabase();    
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(req
        , 
        errorSQL, 
        function (transaction, result) {
            for (var i=0; i < result.rows.length; i++) {
                arr[i] = result.rows.item(i);
            }
        });
    }
    );
    return arr;
    
}*/
function _getDonneesApports()
{
	var args = '?ac=apports';
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: false,
        error: function(){alerte('Erreur','Pas de connexion ou erreur...');},
        success: function(dataJSON) {
            //alert('jsoning');
            
            var arrApports = dataJSON;
            requetesSql[requetesSql.length] = "DELETE FROM apports";
            for(i=0;i<arrApports.length;i++) {
                requetesSql[requetesSql.length] = 'INSERT INTO apports(nom,value,deb,fin) VALUES ("' + arrApports[i].nom + '","' + arrApports[i].value + '",'+arrApports[i].deb+','+arrApports[i].fin+')';
                
            }
			//  setStorage('apports',	apports);
        }});
}
function initApports()
{
    db = _openDatabase();    
    
    db.transaction(
    function(transaction) {
        transaction.executeSql('SELECT * FROM apports ORDER BY deb'
        , 
        [], 
        function (transaction, result) {
            var apports = new Array();
            var htmlApports='';
            var htmlFormApports='';
           // alert(result.rows.length);
            for (var i=0; i < result.rows.length; i++) {
                
                apports[i] = result.rows.item(i);
              //  var apports = _getApports();
//                arrApportsAppli[apports[i].value]=new Array();
  //              arrApportsAppli[apports[i].value]['deb']=apports[i].deb;
    //            arrApportsAppli[apports[i].value]['fin']=apports[i].fin;
                htmlApports+='<option  value="'+apports[i].deb+'">'+apports[i].deb+'</option>';
                htmlFormApports +='<option value="'+apports[i].value+'">'+apports[i].nom+'</option>';
                
                
            }
            $('#apportMini').html(htmlApports);
            $('#apportMax').html(htmlApports);
            $('#formApports').html($('#formApports').html()+htmlFormApports);            
        },errorSQL);
    }
    );

    
}


var nbParPage = 10;
var page = 0;
var finListe=false;
var fonctionAutrePage = '';
var pageCourante = '';

function majPagination()
{
    if(fonctionAutrePage == '') {
        
        
    } else {
        if(!finListe) {
            $('.imgSuivant').attr('src','images/btn-suivant.gif');
        }
        else {
            $('.imgSuivant').attr('src','images/rien5.gif');
        }
        if(page>0) {
            $('.imgPrecedent').attr('src','images/btn-precedent.gif');
        }
        else { 
            $('.imgPrecedent').attr('src','images/rien5.gif');
        }
            
        //
        /*
       // alert(document.geElementById('btnSuivantResultats').getAttribute('onclick');
//        alert($('#btnSuivantResultats').attr('onclick'));
         */
    }
}
function pagePrecedante()
{
    _scrollTop();
    page--;
    eval(fonctionAutrePage+'()');
    majPagination();
}
function pageSuivante()
{
//    alert('suite');
    _scrollTop();
    page++;
  //  alert(fonctionAutrePage);
    //if(fonctionAutrePage=='_initFranchiseursFromRubrique') {
    //    alert(fonctionAutrePage);
     //   _initFranchiseursFromRubriques(rubriqueActuelle);
        eval(fonctionAutrePage+'()');
    majPagination();
//    eval(fonctionAutrePage+'('+rubriqueActuelle+')');
}

var defautTransition = 'slide';
var indicePageActuelle=0;
var pagesVisitees = new Array();
var changementPageEnCours = false;

function _initPagesVisitees()
{
    indicePageActuelle = 0;
    pagesVisitees[indicePageActuelle] = '#home';
    pageCourante='';
}
function _initMenuBas()
{
    pathFooter = pageCourante +" .basPage";
   // pathFooter = "#basPage";
    /*var positionCourante =$(pageCourante).position();
    console.log($(pageCourante).position());
    console.log(pathFooter);*/
//    $(pathFooter).hide();
  //      $(pathFooter).show();
    //$(pathFooter).css('left',positionCourante.left+'px');
    //console.log($(pathFooter).css('left'));
}
function goToPage(page,retour)
{
    console.log(pageCourante+' '+page+' '+changementPageEnCours);
    if(!changementPageEnCours)
        changementPageEnCours = true;
    else return false;
    
    if(pageCourante!=page) {
        pageCourante=page;
        indicePageActuelle++;
        pagesVisitees[indicePageActuelle]=page;
       // alert(indicePageActuelle+' '+page);
        pageCourante=page;
        $.mobile.changePage($(page),defautTransition,retour);
        changementPageEnCours=false;
        _initMenuBas();
        
    }
    setTimeout("emptyChangementPageEnCours()",2000);
}
function emptyChangementPageEnCours()
{
    changementPageEnCours = false;
    
}
function goToAccueil()
{

    //alert('ret');
    powerOn();
    $.mobile.changePage($('#home'),defautTransition,true);
    pageCourante="#home";
    _initMenuBas();
    changementPageEnCours = false;
    _initPagesVisitees();
}
function goToSelection(retour)
{
    if(getNombreFranchiseursSelectionnes()) {
        getFranchiseurs(franchiseursSelectionnes,true);
        
    } else navigator.notification.alert("Aucune enseigne n'est sélectionnée.",
                null,
                "Sélection vide");
}
function goToFormulaire()
{
  //  alert(1);
  //  alert(getNombreFranchiseursSelectionnes());
    if(getNombreFranchiseursSelectionnes()) {
        $("#logosReseauxSelection").html(loadLogosFromSelection());
        //loadLogosFromSelection();
        goToPage('#formulaire');
    } else navigator.notification.alert("Aucune enseigne n'est sélectionnée.",
            null,
            "Sélection vide");
}
function goToGeolocalisation(retour)
{
    goToPage('#geolocalisation',retour);
}
function goToMenuResultats(retour)
{
    goToPage('#listeResultats',retour);
}
function goToMenuSecteurActivite(retour)
{
    goToPage('#menuSecteurActivite',retour);
}
function goToMenuSousSecteurActivite(retour)
{
    goToPage('#sousMenuSecteur',retour);
}
function goToMenuApports(retour)
{
    goToPage('#selectionParApport',retour);
    majPagination();
}
function goToConceptPorteurs(retour)
{
    goToPage('#conceptsPorteurs',retour);
}
function goToResultats()
{
    if(fonctionAutrePage == '_getFranchiseurs' && modeSelectionActuel)
        goToPage('#listeSelection',true);
    else if(fonctionAutrePage == '_initFranchiseursFromApport')
        goToPage('#selectionParApport',true);
    else
        goToPage('#listeResultats',true);
}
function goToChoixResultats()
{
    //$.mobile.changePage($(pageCourante),defautTransition,true);
    if(fonctionAutrePage == '_getFranchiseurs' && modeSelectionActuel)
        goToAccueil();
    else if(fonctionAutrePage == '_getFranchiseurs' && modeSelectionActuel)
        goToGeolocalisation(true);
    else if(fonctionAutrePage == '_initFranchiseursFromApport')
        goToMenuApports(true);
    else if(fonctionAutrePage == '_initFranchiseursFromRubrique')
        goToMenuSousSecteurActivite(true);
    else if(fonctionAutrePage == '_initFranchiseursFromNiche')
        goToConceptPorteurs(true);
    else
        goToAccueil();
 
}
function _scrollTop()
{
$('html, body').animate({scrollTop: '0px'}, 800);
}

function goToMerci()
{
    goToPage('#merci');
}
function goBack()
{
    
    indicePageActuelle--;
   // alert(indicePageActuelle +' '+pagesVisitees[indicePageActuelle]);
    pageCourante = pagesVisitees[indicePageActuelle];
    if(pageCourante == '#listeSelection') // On réinit la liste sélectionnée
        getFranchiseurs(franchiseursSelectionnes,true);
    
    $.mobile.changePage($(pageCourante),defautTransition,true);
    _initMenuBas();
    changementPageEnCours = false;
    _scrollTop();
}
_initPagesVisitees();

function _createTableRubriques()
{
	requetesSql[requetesSql.length]='DROP TABLE IF EXISTS rubriques';
	requetesSql[requetesSql.length] = 'CREATE TABLE IF NOT EXISTS rubriques(num INT,txt_fr TXT,pere INT,PRIMARY KEY  (`num`))';
    
}

function _createTableJointuresFranchiseursRubriques()
{
    requetesSql[requetesSql.length]='DROP TABLE IF EXISTS jointure_reseaux_rubriques_tlf';
	requetesSql[requetesSql.length] = 'CREATE TABLE IF NOT EXISTS jointure_reseaux_rubriques_tlf(id_reseau INT,id_rubrique INT,PRIMARY KEY  (`id_reseau`,`id_rubrique`))';
}


function _initRubriques(pere,libelle)
{
    //    var arr = new Array();
    if(pere && libelle)
    $('#libelleRubriquePere').html(libelle);
    db = _openDatabase();
    // alert(db);
    var req = '';
    if(pere)
        req = 'SELECT rubriques.num,rubriques.txt_fr FROM rubriques, jointure_reseaux_rubriques_tlf,reseaux_tlf WHERE rubriques.num = jointure_reseaux_rubriques_tlf.id_rubrique AND jointure_reseaux_rubriques_tlf.id_reseau=reseaux_tlf.id AND rubriques.pere='+pere+' GROUP BY rubriques.num ORDER BY rubriques.txt_fr';
    else 
        req = 'SELECT rubriques.num,rubriques.txt_fr FROM rubriques WHERE rubriques.pere='+pere+'  ORDER BY rubriques.txt_fr';
    db.transaction(
    
    function(transaction) {
        //   alert(transaction);
        transaction.executeSql(
        req,        
        [],
        function (transaction, result) {
            //  alert('Resultat '+result.rows.length);
            var arr;
            var htmlRubriques = '';
            var fonction = 'initRubriques';
            if(pere)
            fonction = 'initFranchiseursFromRubrique';
            
            
            for (var i=0; i < result.rows.length; i++) {
                arr = result.rows.item(i);
                
                htmlRubriques += '<li><a href="javascript:void(0);" onclick="'+fonction+'('+arr.num+',\''+addslashes(arr.txt_fr)+'\');" data-role="none">'+arr.txt_fr+'</a></li>';
            }
            //alert(htmlRubriques);
            if(pere)
            $('#listeSousRubriques').html(htmlRubriques);
            else
            $('#listeRubriques').html(htmlRubriques);
        },
        errorSQL);
    }
    );
    //return arr;
}
function _getRubrique(id)
{
    var arr = new Array();
    
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT * FROM rubriques WHERE num='+pere, 
        errorSQL, 
        function (transaction, result) {
            for (var i=0; i < result.rows.length; i++) {
                arr = result.rows.item(i);
            }
        });
    }
    );
    return arr;
    
}
function _getDonneesRubriques()
{
    //alert('rubs');
	var args = '?ac=rubriques';
    //alert('rubriques'+' '+url_site+page_ws+args);    
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: false,
           error: function(){alerte('Erreur','Pas de connexion ou erreur...');},
        success: function(dataJSON) {
            //  alert('jsoning');
            //  alert(dataJSON.length+' '+requetesSql.length);
            var requete='';
           requetesSql[requetesSql.length] = "DELETE FROM rubriques";           

            for(i=0;i<dataJSON.length;i++) {
                // alert(dataJSON[i].getAttribute('txt_fr'));
                
                /*           for(k in dataJSON[i]) 
                 alert(k+' '+dataJSON[i][k]);
                 alert('I' + i );*/
                requete = 'INSERT INTO rubriques(num,txt_fr,pere) VALUES (' + dataJSON[i].num + ',"' +dataJSON[i].txt_fr + '",'+dataJSON[i].pere+')';
                //alert(requete);
                requetesSql[requetesSql.length] = requete;
                
                
            }
            //  alert(requetesSql.length);
            
            //setStorage('rubriques',	rubriques);
        }});
}
function clickRubriqueMere(idRub)
{
    _initSousRubriques(idRub);
    
}
function clickRubrique(idRub)
{
    $('#listeFranchiseurs').html(_initListingFranchiseurs(_getIdsFranchiseursFromRubrique(idRub)));
    // alert('clic');
    goToPage('#listeFranchiseurs');
    
}
function initRubriques(pere,libelle)
{
    if(!pere) 
    pere = 0;
    if(!libelle)
    libelle = '';
    _initRubriques(pere,libelle);
    if(pere)
        goToPage('#sousMenuSecteur');
}
function _getDonneesJointuresRubriques()
{
	var args = '?ac=jointure_reseaux_rubriques';
	$.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: false,
           error: function(){alerte('Erreur','Pas de connexion ou erreur...');},
        success: function(dataJSON) {
            
            var arrRubriques = dataJSON;
            requetesSql[requetesSql.length]="DELETE FROM jointure_reseaux_rubriques_tlf";
            //alert(arrRubriques.length);
            for(i=0;i<arrRubriques.length;i++) {
                requetesSql[requetesSql.length] = 'INSERT INTO jointure_reseaux_rubriques_tlf(id_reseau,id_rubrique) VALUES (' + arrRubriques[i].id_reseau + ',' + arrRubriques[i].id_rubrique + ')';
            }
            
        }});
}

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function saveLocation(position) {

	//alert('saveLocation');
/*	if(!document.getElementById('latitude').value)
		document.getElementById('latitude').value = position.coords.latitude;
	
	if(!document.getElementById('longitude').value)
		document.getElementById('longitude').value = position.coords.longitude;*/
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
	 */
	//alert('Ton téléphone a été localisé');
	//updatePosition(new LatLng(document.getElementById('latitude').value,document.getElementById('longitude').value));
//    alert(position.coords.latitude + ' ' +position.coords.longitude);
    $('#chargementLocalisation').html('Chargement en cours...');
	getFranchiseursFromLocation(position.coords.latitude,position.coords.longitude);
	
}
var map = null;
function loadMap()
{ 
	//<![CDATA[
	
//	if(!map) {
		var latlng = new google.maps.LatLng(document.getElementById('latitude').value, document.getElementById('longitude').value);
		var myOptions = {
			zoom: 12,
			center: latlng,
			panControl: false,
			zoomControl: true,	
			zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
			},
			scaleControl: true,
			streetViewControl: false,
			mapTypeControl : false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById("map"),
								  myOptions);
	
		var marqueur = new google.maps.Marker({
										  position: new google.maps.LatLng(document.getElementById('latitude').value, document.getElementById('longitude').value),
										  map: map,
										  draggable:true										  	  
										  });

		marqueur.setDraggable(true);
		geocoder = new google.maps.Geocoder();
		google.maps.event.addListener(marqueur, 'dragend', function() {
								  updatePosition(marqueur.getPosition());
								  });
/*		google.maps.event.addListener(map, 'click', function(event) {
									  //updatePosition(event.LatLng);
									  alert('event');
									  alert(event.latLng);
									  map.setCenter(event.latLng);
									  });*/
		$("#address").autocomplete({
							   //This bit uses the geocoder to fetch address values
							   source: function(request, response) {
							   geocoder.geocode( {'address': request.term, 'region': 'FR' }, function(results, status) {
												response($.map(results, function(item) {
															   var cityresult=address_component(results, 'locality', 'long_name');
															   
															   return {
															   label:  item.formatted_address,
															   value: item.formatted_address,
															   latitude: item.geometry.location.lat(),
															   longitude: item.geometry.location.lng(),
															   city : cityresult
															   }
															   }));
												})
							   },
							   //This bit is executed upon selection of an address
							   select: function(event, ui) {
							   $("#city").val(ui.item.city);
							   $("#latitude").val(ui.item.latitude);
							   $("#longitude").val(ui.item.longitude);
							   var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
							   marqueur.setPosition(location);
							   map.setCenter(location);
							   }
							   });
//});

		
	//}
	google.maps.event.trigger(map, 'resize');
	map.setCenter(latlng);
	toggleChampsOptionnels();
	jQTGoTo('#localiser');	
	updatePosition(marqueur.getPosition());
}
/*function updatePosition(LatLng)
{
	//alert(LatLng);
	geocoder.geocode({'latLng': LatLng}, function(results, status) {
					 //alert(status);
					 if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							$("#city").val(address_component(results, 'locality', 'long_name'));
						//	alert(results[0].formatted_address);
							$('.address').val(results[0].formatted_address);
							cloneContenuInputToId(document.getElementById('address'),'apercuAdresseBp');
							$('#latitude').val(LatLng.lat());
							$('#longitude').val(LatLng.lng());
							map.setCenter(LatLng);
						}
					 }
					 });
}
*/
function getLocation() {
	//jQTGoTo('#chargement');
	//$("#txtLoading").html('Localisation en cours...');

	navigator.geolocation.getCurrentPosition(saveLocation, null);

}

/*function address_component(results, address_type, name_type){
	var address_type = (address_type == null) ? 'country' : address_type;
	var name_type = (name_type == null) ? 'long_name' : name_type;
	
	if(results.length>0){
		var res = results[0];
		for(i=0; i<res.address_components.length; i++){
			for(j=0; j<res.address_components[i].types.length; j++){
				if(res.address_components[i].types[j] == address_type){
					if(res.address_components[i][name_type]){
						return res.address_components[i][name_type];
					}
				}
			}
		}
	}
}
function reloadMap() {
	google.maps.event.trigger(map, 'resize');
}
*/
var dernRechercheLocalisation;
function rechercheLiveLocalisation(recherche)
{
    //alert(recherche);
    if(recherche != dernRechercheLocalisation)
        dernRechercheLocalisation = recherche;
    else return false;
    
    
    
    if(recherche*1 == recherche && recherche.length<5)
    {
        while(recherche.length<5) recherche += '0';
    }
    var args='?ac=recherche&search='+recherche;
    console.log(url_site+page_ws+args);
    
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: true,
        success: function(dataJSON) {

            var resultats = dataJSON;
            var html='';
            //alert(resultats.length);
            if(resultats.length==1) {
                getFranchiseursFromLocation(resultats[0].latitude,resultats[0].longitude);
                return;
            }
            for(i=0;i<resultats.length;i++)
            {
                
                html += '<li><a href="javascript:void(0);" onclick="getFranchiseursFromLocation('+resultats[i].latitude+','+resultats[i].longitude+');">' + resultats[i].nom + '</a></li>';
            }
            //alert(html);
            $('#resultatsVille').html(html);
            //$('#rechercheLiveVille').hide();            
           // $('#resultatsVille').show();
         //   $('#resultatsVille').selectmenu('refresh');
            //document.getElementById('resultatsVille').focus();
          //  setTimeout("focusResultats()",1000);
//            $('#resultatsVille').focus();
        }}
    );
    return false;
    
}
function focusResultats()
{
    $('#resultatsVille').focus();
 //   $('#resultatsVille').focus();
 //   $('#resultatsVille').click();
}

function getFranchiseursFromListeVille(valueSelect)
{
    page = 0;
    var arr = explode(',',valueSelect);
    getFranchiseursFromLocation(arr[0], arr[1]);
    
}

function whatFocus(obj)
{
	//alert('val '+obj.id);
	//alert('in '+inputs[obj.id]);
	if(obj.value == inputs[obj.id])
    obj.value='';
}
function whatBlur(obj)
{
	if(obj.value == '')
    obj.value = inputs[obj.id];
}
function demandeDocumentation() {
    //Appel ajax et écran merci
    //Sauvegarde contenu form et réaffichage
    
    //    var args = '';
 //   alert(inputsDefaut['formNom']+' ');
    if(!$("#formNom").val() || $("#formNom").val()==inputsDefaut['formNom']) {
        alerte('Erreur','Merci de remplir votre nom');
        $("#formNom").focus();
        return false;
    } else if(!$("#formPrenom").val() || $("#formPrenom").val()==inputsDefaut['formPrenom']){
        alerte('Erreur','Merci de remplir votre prénom');
        $("#formPrenom").focus();
        return false;
    } else if(!$("#formAdresse").val() || $("#formAdresse").val()==inputsDefaut['formAdresse']){
        alerte('Erreur',"Merci de remplir votre adresse");
        $("#formAdresse").focus();
        return false;
    } else if(!$("#formCp").val() || $("#formCp").val()==inputsDefaut['formCodePostal']){
        alerte('Erreur',"Merci de remplir votre code postal");
        $("#formCodePostal").focus();
        return false;
    } else if(!$("#formVille").val() || $("#formVille").val()==inputsDefaut['formVille']){
        alerte('Erreur',"Merci de remplir votre ville");
        $("#formVille").focus();
        return false;
    } else if(!$("#formApports").val() || $("#formApports").val()==inputsDefaut['formApports']){
        alerte('Erreur',"Merci de remplir votre apport personnel");
        $("#formApports").focus();
        return false;
    } else if(!$("#formEmail").val() || $("#formEmail").val()==inputsDefaut['formEmail']){
        alerte('Erreur',"Merci de remplir votre email");
        $("#formEmail").focus();
        return false;
    } 
    var Fsociete;
    var Fnom;
    var Fprenom;
    var Fadresse;
    var Fcp;
    var Fville;
    var Fapport_personnel;
    var Femail;
    var Ftelephone;
    var Fptb;
    var Fsecteur_geographique;
    var Fcommentaire;
    var Ffax;
//    var Ffranchise;

    if($('#formSociete').val() && $('#formSociete').val()!=inputsDefaut['formSociete'])
        Fsociete = $('#formSociete').val();
    if($('#formNom').val() && $('#formNom').val()!=inputsDefaut['formNom'])
        Fnom = $('#formNom').val();
    if($('#formPrenom').val() && $('#formPrenom').val()!=inputsDefaut['formPrenom'])
        Fprenom = $('#formPrenom').val();
    if($('#formAdresse').val() && $('#formAdresse').val()!=inputsDefaut['formAdresse'])
        Fadresse = $('#formAdresse').val();
    if($('#formCp').val() && $('#formCp').val()!=inputsDefaut['formCp'])
        Fcp = $('#formCp').val();
    if($('#formAdresse').val() && $('#formAdresse').val()!=inputsDefaut['formAdresse'])
        Fville = $('#formAdresse').val();
    if($('#formApports').val() && $('#formApports').val()!=inputsDefaut['formApports'])
        Fapport_personnel = $('#formApports').val();
    if($('#formEmail').val() && $('#formEmail').val()!=inputsDefaut['formEmail'])
        Femail = $('#formEmail').val();
    if($('#formTel').val() && $('#formTel').val()!=inputsDefaut['formTel'])
        Ftelephone = $('#formTel').val();
   /* if($('#formPtb').val() && $('#formPtb').val()!=inputsDefaut['formPtb'])
        Fptb = $('#formPtb').val();*/
    Fptb = '';
    if($('#formFax').val() && $('#formFax').val()!=inputsDefaut['formFax'])
        Ffax = $('#formFax').val();
    
    if($('#formSecteurGeographique').val() && $('#formSecteurGeographique').val()!=inputsDefaut['formSecteurGeographique'])
        Fsecteur_geographique = $('#formSecteurGeographique').val();
    if($('#formCommentaire').val() && $('#formCommentaire').val()!=inputsDefaut['formCommentaire'])
        Fcommentaire = $('#formCommentaire').val();


    var Ffranchises = implode(';',franchiseursSelectionnes);
   // alert('ajax');  
    
    var args = '?societe='+urlencode(Fsociete)+'&nom='+urlencode(Fnom)+'&prenom='+urlencode(Fprenom);
   // alert('ajax1');
    args +='&adresse='+urlencode(Fadresse)+'&cp='+urlencode(Fcp)+'&ville='+urlencode(Fville)+'&apport_personnel='+urlencode(Fapport_personnel);
     //   alert('ajax11');
    args+='&email='+ urlencode(Femail)+'&tel='+ urlencode(Ftelephone)+'&fax='+ urlencode(Ffax);
     //   alert('ajax2');
    args +='&ptb='+ urlencode(Fptb)+'&secteur_geographique='+urlencode(Fsecteur_geographique)+'&commentaire='+ urlencode(Fcommentaire)+'&origine=iphone&franchise='+urlencode(Ffranchises);
    //alert(url_site+'enregistrement_demande_deporte.php'+args);
   // alert($.param({societe:Fsociete, nom:Fnom, prenom:Fprenom,adresse:Fadresse,cp:Fcp,ville:Fville, apport_personnel:Fapport_personnel,email: Femail,telephone: Ftelephone,fax: Ffax, ptb: Fptb, secteur_geographique:Fsecteur_geographique,commentaire: Fcommentaire, origine: 'iphone',franchise:Ffranchises}));
//    $.get( url_site+'enregistrement_demande_deporte.php',
  //  alert('preAjax');
    $.ajax({type: 'GET',
        url: url_site+'enregistrement_demande_deporte.php'+args,
        error: function(){ alerte('Erreur',"La demande n'a pas pu être transmise.");},
        dataType: 'html',
        async: false,
        success: function(data) {
       //    alert('ok');
           sauvegardeFormulaire();
           viderSelection();
         //  alert('ok');
           goToMerci();
            //		setStorage('niches', niches);
        }});
}
function sauvegardeFormulaire()
{
    setStorage('formSociete',$('#formSociete').val());
    setStorage('formNom',$('#formNom').val());    
    setStorage('formPrenom',$('#formPrenom').val());    
    setStorage('formAdresse',$('#formAdresse').val());    
    setStorage('formCp',$('#formCp').val());    
    setStorage('formVille',$('#formVille').val());    
    setStorage('formEmail',$('#formEmail').val());    
    setStorage('formTel',$('#formTel').val());    
    setStorage('formPtb',$('#formPtb').val());    
    setStorage('formFax',$('#formFax').val());    
    setStorage('formSecteurGeographique',$('#formSecteurGeographique').val());    
    setStorage('formCommentaire',$('#formCommentaire').val());    
}

var inputs = new Array();
var inputsDefaut = new Array();

function initFormulaire()
{
    $('#formDemandeDocs input').each(function() {
        inputsDefaut[$(this).attr('id')] = $(this).val();
    });
    if(getStorage('formSociete'))
        $('#formSociete').val(getStorage('formSociete'));
    if(getStorage('formNom'))
        $('#formNom').val(getStorage('formNom'));    
    if(getStorage('formPrenom'))
        $('#formPrenom').val(getStorage('formPrenom'));        
    if(getStorage('formAdresse'))
        $('#formAdresse').val(getStorage('formAdresse'));        
    if(getStorage('formAdresse'))
        $('#formCp').val(getStorage('formAdresse'));        
    if(getStorage('formVille'))
        $('#formVille').val(getStorage('formVille'));        
    if(getStorage('formEmail'))
        $('#formEmail').val(getStorage('formEmail'));        
    if(getStorage('formTel'))
        $('#formTel').val(getStorage('formTel'));        
    if(getStorage('formPtb'))
        $('#formPtb').val(getStorage('formAdresse'));        
    if(getStorage('formFax'))
        $('#formFax').val(getStorage('formFax'));        
    if(getStorage('formSecteurGeographique'))
        $('#formSecteurGeographique').val(getStorage('formSecteurGeographique'));        
    if(getStorage('formCommentaire'))
        $('#formCommentaire').val(getStorage('formCommentaire'));  
    
    var formApports = getStorage('formApports');
    $("#formApports option").each(function () {
        if($(this).val() == formApports)
            $(this).attr('selected','selected');                                  
    });

    
    $('#formDemandeDocs input').each(function() {
        inputs[$(this).attr('id')] = $(this).val();
    });
    
}
function whatFocus(obj)
{
	//alert('val '+obj.id);
	//alert('in '+inputs[obj.id]);
	if(obj.value == inputs[obj.id] || obj.value == inputsDefaut[obj.id])
    obj.value='';
}
function whatBlur(obj)
{
	if(obj.value == '')
        if(inputs[obj.id])
            obj.value = inputs[obj.id];
        else
            obj.value = inputsDefaut[obj.id];
}



var url_site='http://www.toute-la-franchise.com/';
var ndd = 'www.toute-la-franchise.com';
var page_ws = 'ws_mobile.php';
var rien5 = 'R0lGODlhBQAFAIAAAP///wAAACH5BAEAAAAALAAAAAAFAAUAAAIEhI+pWAA7';
var franchiseurs = new Array();
var rubriques = new Array();
var apports = new Array();
var jointureRubriquesFranchiseurs = new Array();
var niches = new Array();
var jointureNichesFranchiseurs = new Array();
var requetesAExecuter = Array();
var txGlobal;
var pageCourante='#home';

$.ajaxSetup({
            timeout: 60000
            });

/* Liste des actions :
 http://www.toute-la-franchise.com/ws_mobile.php?ac=franchises
 http://www.toute-la-franchise.com/ws_mobile.php?ac=franchises&date=2011-04-13
 http://www.toute-la-franchise.com/ws_mobile.php?ac=niches
 http://www.toute-la-franchise.com/ws_mobile.php?ac=rubriques
 http://www.toute-la-franchise.com/ws_mobile.php?ac=apports
 http://www.toute-la-franchise.com/ws_mobile.php?ac=jointure_reseaux_rubriques
 http://www.toute-la-franchise.com/ws_mobile.php?ac=jointure_reseaux_rubriques_niche_marketing
 http://www.toute-la-franchise.com/ws_mobile.php?ac=ws_geolocalisation&latitude=48.8666687&longitude=2.333333
 */



var nullDataHandler = function (transaction, results) { } 
function alerte(titre,contenu)
{
    navigator.notification.alert(contenu,
                                 null,
                                 titre);
}
//Fonction qui fait tout les traitements à l'allumage de l'appli
function powerOn(force)
{
    //alert(typeof(force));
   // $.mobile.loadingMessage('Chargement');
    //    $.mobile.loadingMessage('Chargement');
   // alert('go2');
    if(getDateDerniereMaj()!=getDate()) {
        $('#chargement').show();   
    }
    
    etape('Initialisation');
    if(typeof(force)!='undefined' || !databaseCreated()) { // Si pas de bdd on crée la base
        _createDatabase();
       // alert('création');
    }
    
    if(typeof(force)!='undefined' || getDateDerniereMaj()!=getDate()) {
      //  chargement
      //  alert('Maj');
        etape('Importation');
        _getDonnees();
        etape('Implantation');
        _executeMaj();
       // alert('Màj effectuées');
    }
   //     alert(getDateDerniereMaj()+' '+getDate());
    etape('Interfacage');
    initInterface();

   // $.mobile.pageLoading(true);    
    
}

function etape(etapeTxt)
{
    $('#etapeChargement').html(etapeTxt);
    $.mobile.loadingMessage=etapeTxt;
}
function _createDatabase()
{
	_createTableFranchiseurs();
    _createTableRubriques();
    _createTableApports(); 
    _createTableNichesMarketing();
    _createTableJointuresFranchiseursRubriques();
    _createTableJointuresFranchiseursConcepts();
   
}

function getDate() 
{
    var d = new Date();
    var month = d.getMonth()+1;
    if(month*1<10)
        month = '0'+month;
    return d.getFullYear()+'-'+month+'-'+d.getDate();
}


function _queryDB(tx) {
	tx.executeSql('SELECT * FROM rubriques', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
	alert("DEMO table: " + len + " rows found.");
	for (var i=0; i<len; i++){
		alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).nom_enseigne);
    }
}	

function _getDonnees() {

    
    _getDonneesRubriques();
    _getDonneesApports();
    _getDonneesNiches();
	_getDonneesJointuresRubriques();
    _getDonneesJointuresNiches();
    _getDonneesFranchiseurs();

}
function updateFranchiseurs() {
	var dateDerniereMaj = getStorage('dateDerniereMaj');
	//getDonneesFranchiseurs(dateToMysql(dateDerniereMaj));
}
function dateToMysql(date)
{
	return date.getYear()+'-'+date.getMonth()+'-'+date.getDate();
}
function mysqlToDate(str)
{
    return str.substring(8,10)+'/'+str.substring(5,7)+'/'+str.substring(0,4);

}


function initInterface()
{
    //alert('Init If');
    initRubriques();
    //alert('ok ?');
    initApports();
    initNichesMarketing();
    initFormulaire();
    _initSelection();
    $('#chargement').hide();
    //$.mobile.changePage($('#accueil'),'fade');
}
                                                        

function whatFocus(obj)
{
	//alert('val '+obj.id);
	//alert('in '+inputs[obj.id]);
	if(obj.value == inputs[obj.id])
		obj.value='';
}
function whatBlur(obj)
{
	if(obj.value == '')
		obj.value = inputs[obj.id];
}
var divDest='';
function jQTGoToDelay(div,delay)
{
		setTimeout(delayJQTGoTo,delay);
}
function jQTGoTo(div)
{
	
	//if(divDest)return;
	divDest = div;
	//alert(divDest);
	setTimeout(delayJQTGoTo,500);
}
function delayJQTGoTo()
{
	//alert(divDest);
	if(divDest=='')
		jQT.goTo("#hp",'slide');
	else {
	jQT.goTo(divDest,'slide');
	divDest ='';
	}
	//alert(divDest);
	//setTimeout(reinitJQTGoTo,500);
}
function reinitJQTGoTo() {
	divDest ='';	
}
function effacerLigne(array, valueOrIndex){
    var output=[];
    var j=0;
    for(var i in array){
        if (i!=valueOrIndex){
            output[j]=array[i];
            j++;
        }
    }
    return output;
}
function serialize(mixed_value){var _utf8Size=function(str){var size=0,i=0,l=str.length,code='';for(i=0;i<l;i++){code=str[i].charCodeAt(0);if(code<0x0080){size+=1;}else if(code<0x0800){size+=2;}else{size+=3;}}
	return size;};var _getType=function(inp){var type=typeof inp,match;var key;if(type==='object'&&!inp){return'null';}
		if(type==="object"){if(!inp.constructor){return'object';}
			var cons=inp.constructor.toString();match=cons.match(/(\w+)\(/);if(match){cons=match[1].toLowerCase();}
																 var types=["boolean","number","string","array"];for(key in types){if(cons==types[key]){type=types[key];break;}}}
																 return type;};var type=_getType(mixed_value);var val,ktype='';switch(type){case"function":val="";break;case"boolean":val="b:"+(mixed_value?"1":"0");break;case"number":val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value;break;case"string":val="s:"+_utf8Size(mixed_value)+":\""+mixed_value+"\"";break;case"array":case"object":val="a";var count=0;var vals="";var okey;var key;for(key in mixed_value){if(mixed_value.hasOwnProperty(key)){ktype=_getType(mixed_value[key]);if(ktype==="function"){continue;}
																 okey=(key.match(/^[0-9]+$/)?parseInt(key,10):key);vals+=this.serialize(okey)+
																 this.serialize(mixed_value[key]);count++;}}
																 val+=":"+count+":{"+vals+"}";break;case"undefined":default:val="N";break;}
																 if(type!=="object"&&type!=="array"){val+=";";}
																 return val;}
function nl2br(str,is_xhtml){var breakTag=(is_xhtml||typeof is_xhtml==='undefined')?'<br />':'<br>';return(str+'').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,'$1'+breakTag+'$2');}


function unserialize(data){var that=this;var utf8Overhead=function(chr){var code=chr.charCodeAt(0);if(code<0x0080){return 0;}
																 if(code<0x0800){return 1;}
																 return 2;};var error=function(type,msg,filename,line){alert(that.window[type](msg,filename,line));};var read_until=function(data,offset,stopchr){var buf=[];var chr=data.slice(offset,offset+1);var i=2;while(chr!=stopchr){if((i+offset)>data.length){error('Error','Invalid');}
																 buf.push(chr);chr=data.slice(offset+(i-1),offset+i);i+=1;}
																 return[buf.length,buf.join('')];};var read_chrs=function(data,offset,length){var buf;buf=[];for(var i=0;i<length;i++){var chr=data.slice(offset+(i-1),offset+i);buf.push(chr);length-=utf8Overhead(chr);}
																 return[buf.length,buf.join('')];};var _unserialize=function(data,offset){var readdata;var readData;var chrs=0;var ccount;var stringlength;var keyandchrs;var keys;if(!offset){offset=0;}
																 var dtype=(data.slice(offset,offset+1)).toLowerCase();var dataoffset=offset+2;var typeconvert=function(x){return x;};switch(dtype){case'i':typeconvert=function(x){return parseInt(x,10);};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'b':typeconvert=function(x){return parseInt(x,10)!==0;};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'd':typeconvert=function(x){return parseFloat(x);};readData=read_until(data,dataoffset,';');chrs=readData[0];readdata=readData[1];dataoffset+=chrs+1;break;case'n':readdata=null;break;case's':ccount=read_until(data,dataoffset,':');chrs=ccount[0];stringlength=ccount[1];dataoffset+=chrs+2;readData=read_chrs(data,dataoffset+1,parseInt(stringlength,10));chrs=readData[0];readdata=readData[1];dataoffset+=chrs+2;if(chrs!=parseInt(stringlength,10)&&chrs!=readdata.length){error('SyntaxError','String length mismatch');}
																 readdata=that.utf8_decode(readdata);break;case'a':readdata={};keyandchrs=read_until(data,dataoffset,':');chrs=keyandchrs[0];keys=keyandchrs[1];dataoffset+=chrs+2;for(var i=0;i<parseInt(keys,10);i++){var kprops=_unserialize(data,dataoffset);var kchrs=kprops[1];var key=kprops[2];dataoffset+=kchrs;var vprops=_unserialize(data,dataoffset);var vchrs=vprops[1];var value=vprops[2];dataoffset+=vchrs;readdata[key]=value;}
																 dataoffset+=1;break;default:error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);break;}
																 return[dtype,dataoffset-offset,typeconvert(readdata)];};return _unserialize((data+''),0)[2];}
		
																

function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}
                                                                                                           function explode(delimiter,string,limit){var emptyArray={0:''};if(arguments.length<2||typeof arguments[0]=='undefined'||typeof arguments[1]=='undefined'){return null;}
                                                                                                           if(delimiter===''||delimiter===false||delimiter===null){return false;}
                                                                                                           if(typeof delimiter=='function'||typeof delimiter=='object'||typeof string=='function'||typeof string=='object'){return emptyArray;}
                                                                                                           if(delimiter===true){delimiter='1';}
                                                                                                           if(!limit){return string.toString().split(delimiter.toString());}else{var splitted=string.toString().split(delimiter.toString());var partA=splitted.splice(0,limit-1);var partB=splitted.join(delimiter.toString());partA.push(partB);return partA;}}

    function implode(glue,pieces){var i='',retVal='',tGlue='';if(arguments.length===1){pieces=glue;glue='';}
    if(typeof(pieces)==='object'){if(pieces instanceof Array){return pieces.join(glue);}
    else{for(i in pieces){retVal+=tGlue+pieces[i];tGlue=glue;}
    return retVal;}}
    else{return pieces;}}
function addslashes(str){return(str+'').replace(/[\\"']/g,'\\$&').replace(/\u0000/g,'\\0');}
function stripslashes(str){return(str+'').replace(/\\(.?)/g,function(s,n1){switch(n1){case'\\':return'\\';case'0':return'\u0000';case'':return'';default:return n1;}});}
                                                            
                                                                 
                                                                 function str_replace(search,replace,subject,count){var i=0,j=0,temp='',repl='',sl=0,fl=0,f=[].concat(search),r=[].concat(replace),s=subject,ra=r instanceof Array,sa=s instanceof Array;s=[].concat(s);if(count){this.window[count]=0;}
                                                                 for(i=0,sl=s.length;i<sl;i++){if(s[i]===''){continue;}
                                                                 for(j=0,fl=f.length;j<fl;j++){temp=s[i]+'';repl=ra?(r[j]!==undefined?r[j]:''):r[0];s[i]=(temp).split(f[j]).join(repl);if(count&&s[i]!==temp){this.window[count]+=(temp.length-s[i].length)/f[j].length;}}}
                                                                 return sa?s:s[0];}

                                                                 


function _createTableNichesMarketing()
{
    requetesSql[requetesSql.length]='DROP TABLE IF EXISTS rubriques_niches_marketing';
	requetesSql[requetesSql.length] = 'CREATE TABLE IF NOT EXISTS rubriques_niches_marketing(num INT,txt_fr TXT,PRIMARY KEY  (`num`))';
}
function _createTableJointuresFranchiseursConcepts()
{
    requetesSql[requetesSql.length]='DROP TABLE IF EXISTS jointure_reseaux_rubriques_niche_marketing';
	requetesSql[requetesSql.length] = 'CREATE TABLE IF NOT EXISTS jointure_reseaux_rubriques_niche_marketing(id_reseau INT,id_rubrique INT,PRIMARY KEY  (`id_reseau`,`id_rubrique`))';
}


function _getDonneesJointuresNiches()
{
    var args = '?ac=jointure_reseaux_rubriques_niche_marketing';
    
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: false,
           error: function(){alerte('Erreur','Pas de connexion ou erreur...');},
        success: function(dataJSON) {
            
            var arrRubriques = dataJSON;
            requetesSql[requetesSql.length] = "DELETE FROM jointure_reseaux_rubriques_niche_marketing";
            //alert(arrRubriques.length);
            for(i=0;i<arrRubriques.length;i++) {
                requetesSql[requetesSql.length] = 'INSERT INTO jointure_reseaux_rubriques_niche_marketing(id_reseau,id_rubrique) VALUES (' + arrRubriques[i].id_reseau + ',"' + arrRubriques[i].id_rubrique + '")';
            }
            //		setStorage('niches', niches);
        }});
}
function _getDonneesNiches()
{
	var args = '?ac=niches';
    
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        async: false,
           error: function(){alerte('Erreur','Pas de connexion ou erreur...');},
        success: function(dataJSON) {
            
            var arrRubriques = dataJSON;
            requetesSql[requetesSql.length] = "DELETE FROM rubriques_niches_marketing";
            for(i=0;i<arrRubriques.length;i++) {
                requetesSql[requetesSql.length] = 'INSERT INTO rubriques_niches_marketing(num,txt_fr) VALUES (' + arrRubriques[i].num + ',"' + arrRubriques[i].txt_fr + '")';
            }
            //		setStorage('niches', niches);
        }});
    
}
function initNichesMarketing()
{
    _initNiches();
}
function _initNiches()
{
    db = _openDatabase();    
    var req = 'SELECT rubriques_niches_marketing.num,rubriques_niches_marketing.txt_fr FROM rubriques_niches_marketing,jointure_reseaux_rubriques_niche_marketing WHERE rubriques_niches_marketing.num=jointure_reseaux_rubriques_niche_marketing.id_reseau ORDER BY rubriques_niches_marketing.txt_fr';
    
    req = 'SELECT num,txt_fr FROM rubriques_niches_marketing ORDER BY rubriques_niches_marketing.txt_fr';
    db.transaction(
    function(transaction) {
        transaction.executeSql(req
        , 
        [], 
        function (transaction, result) {
            var niches = new Array();
            var htmlNiches='';
            // alert(result.rows.length);
            for (var i=0; i < result.rows.length; i++) {
                
                niches[i] = result.rows.item(i);
                //  var apports = _getApports();
                //                arrApportsAppli[apports[i].value]=new Array();
                //              arrApportsAppli[apports[i].value]['deb']=apports[i].deb;
                //            arrApportsAppli[apports[i].value]['fin']=apports[i].fin;
                htmlNiches+='<li><a href="#" onclick="getFranchiseursFromNiche('+niches[i].num+');" data-role="none">'+niches[i].txt_fr+'</a></li>';
                
                
            }
            //alert(htmlNiches);
            $('#listeConcepts').html(htmlNiches);
        },errorSQL);
    }
    );
//    <li><a href="#">NOUVEAUX CONCEPTS</a></li>
}


var arrFranchiseursCourant = new Array();
var nicheActuelle = 0;
var rubriqueActuelle=0;
var idsActuels;
var modeSelectionActuel;

function _createTableFranchiseurs()
{
	requetesSql[requetesSql.length]='DROP TABLE IF EXISTS reseaux_tlf';
	requetesSql[requetesSql.length]='CREATE TABLE IF NOT EXISTS reseaux_tlf (id INT,nom_enseigne TXT,slogan TXT,resume_activite TXT,resume_activite_txt TXT,introduction TXT,introduction_txt TXT,profil_candidat TXT,conditions_d_acces TXT,logo TXT,site_internet TXT,date_fin_affichage TXT,lien_dossier TXT,lien_coupures TXT,lien_galerie TXT,date_modif TXT, date_creation TXT,date_lancement TXT,nbre_implantation INT,surface_moyenne TXT,droit_entree TXT,apport_personnel INT,redevance_fonctionnement TXT, redevance_pub TXT,investissement TXT,emplacement TXT,ca_apres2ans TXT,tarification TXT,royalties TXT,description TXT,type_de_contrat TXT, aide_au_financement TXT,formation_et_assistances TXT,rubrique_principale INT,date_entree TXT,historique TXT,historique_txt TXT,PRIMARY KEY  (`id`))';
}
function _initFicheFranchiseur(id)
{
    
    //req =  ';
    //alert(id);
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT nom_enseigne, apport_personnel, nbre_implantation, slogan, id, profil_candidat,resume_activite,introduction,date_creation,date_lancement,surface_moyenne,droit_entree,redevance_fonctionnement,redevance_pub,investissement,emplacement,ca_apres2ans,royalties,description,type_de_contrat,aide_au_financement,formation_et_assistances,rubrique_principale,date_entree,historique FROM reseaux_tlf WHERE id='+id+' ',                  
        [], 
        function (transaction, result) {
           // var htmlFranchiseur = '';
//            var franchiseur;
            
            
            //    franchiseur = ;
                _htmlFranchiseur(result.rows.item(0));
                
                //alert(franchiseur.nom_enseigne);
            
        },
        errorSQL);
    }
    );
    
    // return _getFranchiseurs(arrReseaux);
}

function _initFranchiseursFromRubrique(rub)
{
    
    var arrReseaux = new Array();
    fonctionAutrePage='_initFranchiseursFromRubrique';
    var req = '';
    if(!rub && rubriqueActuelle)
        rub = rubriqueActuelle;
    rubriqueActuelle=rub;
    //req =  ';
  //  alert(rub);
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT reseaux_tlf.nom_enseigne,reseaux_tlf.apport_personnel,reseaux_tlf.nbre_implantation,reseaux_tlf.slogan,reseaux_tlf.id,reseaux_tlf.resume_activite FROM reseaux_tlf,jointure_reseaux_rubriques_tlf WHERE reseaux_tlf.id=jointure_reseaux_rubriques_tlf.id_reseau AND jointure_reseaux_rubriques_tlf.id_rubrique='+rub+' ORDER BY reseaux_tlf.nom_enseigne'/* LIMIT '+(page*nbParPage)+','+(nbParPage*(page+1))*/,                  
        [], 
        function (transaction, result) {
            var htmlFranchiseurs = '';
            var franchiseur;
            arrFranchiseursCourant = new Array();
                               
            for (var i=0; i < result.rows.length; i++) {
                franchiseur = result.rows.item(i);
//                alert(i+'--'+page+ ' '+result.rows.length+' '+(page * nbParPage)+' '+(nbParPage*(page + 1)));
                if(i >= page * nbParPage && i<nbParPage*(page + 1)) {
                    
                    htmlFranchiseurs+=_htmlFranchiseurListing(franchiseur,false);
                    
                    if(i == result.rows.length - 1) finListe = true;
                    else finListe = false;
                }
                arrFranchiseursCourant[arrFranchiseursCourant.length] = franchiseur.id;
                //alert(franchiseur.nom_enseigne);
            }
            //alert(htmlFranchiseurs);
            //On change l'affichage uniquement si code html
            if(htmlFranchiseurs) {
                $('#listeResultatFranchiseurs').html(htmlFranchiseurs);
                if(pageCourante != '#listeResultats' && !page) {
                    goToPage('#listeResultats');               
                    _scrollTop();
                }
                majPagination();
            }
        },
        errorSQL);
    }
    );
    
    // return _getFranchiseurs(arrReseaux);
}
function _initFranchiseursFromApport(debut,fin)
{
    var arrReseaux = new Array();
    fonctionAutrePage='_initFranchiseursFromApport';
    var req = '';
    
    
    if(!fin && finActuelle)
        fin = finActuelle;
    if(!debut && debutActuel)
        debut = debutActuel;
    finActuelle = fin;
    debutActuel = debut;
    
    if(!finActuelle || debutActuel>finActuelle)
        return;
    //req =  ';
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT reseaux_tlf.nom_enseigne,reseaux_tlf.apport_personnel,reseaux_tlf.nbre_implantation,reseaux_tlf.slogan,reseaux_tlf.id,reseaux_tlf.resume_activite FROM reseaux_tlf WHERE apport_personnel BETWEEN '+debut+' AND '+fin+' ORDER BY reseaux_tlf.nom_enseigne'/*  LIMIT '+(page*nbParPage)+','+(nbParPage*(page+1))*/,                  
        [], 
        function (transaction, result) {
            var htmlFranchiseurs = '';
            var franchiseur;
            //alert('af '+result.rows.length);
            console.log('Résultats '+result.rows.length);
            arrFranchiseursCourant = new Array();
            for (var i=0; i < result.rows.length; i++) {
                franchiseur = result.rows.item(i);
                if(i >= page * nbParPage && i<nbParPage*(page + 1)) {
                
                    htmlFranchiseurs+=_htmlFranchiseurListing(franchiseur,false);

                    if(i == result.rows.length - 1) finListe = true;
                    else finListe = false;
                }
                arrFranchiseursCourant[arrFranchiseursCourant.length] = franchiseur.id;
                //alert(franchiseur.nom_enseigne);
            }
            if(result.rows.length) {
                $('#listeFranchiseursApport').html(htmlFranchiseurs+' <a href="#" onclick="demandeDocResultats()" class="btnDemandeDoc btnLarge"><span class="txtMauveMoyen">DEMANDE DE DOCUMENTATION</span><br />DE TOUS LES RESEAUX LISTES</a>');
                majPagination();
               // $.mobile.changePage($('#listeResultats'),defautTransition);
            } else {
                alerte('Aucun franchiseur','Aucun franchiseur ne correspond à cet apport');
            }
        },
        errorSQL);
    }
    );
    
    // return _getFranchiseurs(arrReseaux);
}
function getFranchiseursFromNiche(id_niche)
{
    _reInitListing();
    _initFranchiseursFromNiche(id_niche);
    
    
}
function _initFranchiseursFromNiche(id_niche)
{
    var arrReseaux = new Array();
    
    var req = '';
    //alert(id_niche);
    
    fonctionAutrePage='_initFranchiseursFromNiche';
    var req = '';
    if(!id_niche && nicheActuelle)
        id_niche = nicheActuelle;
    nicheActuelle = id_niche;
    
    req = 'SELECT reseaux_tlf.nom_enseigne,reseaux_tlf.apport_personnel, reseaux_tlf.nbre_implantation, reseaux_tlf.slogan,reseaux_tlf.id, reseaux_tlf.resume_activite FROM reseaux_tlf, jointure_reseaux_rubriques_niche_marketing WHERE jointure_reseaux_rubriques_niche_marketing.id_rubrique='+id_niche+' AND reseaux_tlf.id=jointure_reseaux_rubriques_niche_marketing.id_reseau ORDER BY reseaux_tlf.nom_enseigne'/*  LIMIT '+(page*nbParPage)+','+(nbParPage*(page+1))*/;
    
    db = _openDatabase();    
    db.transaction(
    function(transaction) {
        transaction.executeSql(req,
        [],
        function (transaction, result) {
            var htmlFranchiseurs = '';
            var franchiseur;
            arrFranchiseursCourant = new Array();
                 //              alert(result.rows.length);
            for (var i=0; i < result.rows.length; i++) {
                franchiseur = result.rows.item(i);
                if(i >= page * nbParPage && i<nbParPage*(page + 1)) {

                htmlFranchiseurs+=_htmlFranchiseurListing(franchiseur,false);
            
                if(i == result.rows.length - 1) finListe = true;
                else finListe = false;
                }
                arrFranchiseursCourant[arrFranchiseursCourant.length] = franchiseur.id;
               // alert(franchiseur.nom_enseigne);
            }
            
              //                 alert(htmlFranchiseurs);
            if(result.rows.length) {
                $('#listeResultatFranchiseurs').html(htmlFranchiseurs);
                if(pageCourante != '#listeResultats') {                    
                    goToPage('#listeResultats');
                    _scrollTop();
                }
            } else alerte('Aucun franchiseur','Pas de franchiseur dans ce concept');
            majPagination();
        },
        errorSQL);
    }
    );
    
   // return _getFranchiseurs(arrReseaux);
}
function _getFranchiseursFromApport(debut,fin)
{
    if(!fin && finActuelle)
        fin = finActuelle;
    if(!debut && debutActuel)
        debut = debutActuel;
    finActuelle = fin;
    debutActuel = debut;
    console.log('Apports : '+debutActuel+' '+finActuelle);
    if(!finActuelle || debutActuel>finActuelle)
        return;
    $('#listeFranchiseursApport').html('Chargement en cours...');
    var req = '';
    //var franchiseur = new Array();
    req = 'SELECT * FROM reseaux_tlf WHERE apport_personnel BETWEEN '+debut+' AND '+fin+' ORDER BY nom_enseigne';        
    //alert(req);
    fonctionAutrePage = '_getFranchiseursFromApport';
    db = _openDatabase();
    db.transaction(
    function(transaction) {
        transaction.executeSql(req,
        [], 

        function (transaction, result) {
            arrFranchiseursCourant = new Array();
            var htmlFranchiseurs = '';                   
            var franchiseur = null;
                           //    alert(result.rows.length);
            console.log("Trouvé "+result.rows.length);
            for (var i=0; i < result.rows.length; i++) {
                franchiseur = result.rows.item(i);
                arrFranchiseursCourant[arrFranchiseursCourant.length] = franchiseur.id;
                
                if(i >= page * nbParPage && i<nbParPage*(page + 1)) {
                               
                    htmlFranchiseurs+=_htmlFranchiseurListing(franchiseur,false);
                               
                    if(i == result.rows.length - 1) finListe = true;
                    else finListe = false;
                }
            }
            majPagination();                   
            if(result.rows.length) {
                $('#listeFranchiseursApport').html(htmlFranchiseurs);
                _scrollTop();
                
            } else alerte('Aucun franchiseur','Pas de franchiseur dans cette fourchette');
            
        },
                errorSQL );
    }
    );
    return arr;
}
function _getFranchiseur(id)
{
    var arr = new Array();
    
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT * FROM reseaux_tlf WHERE id='+id, 
        errorSQL, 
        function (transaction, result) {
            for (var i=0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
                arr = row;
            }
        });
    }
    );
    return arr;
}
function _getFranchiseurs(ids,selection)
{
    var arr = new Array();
    
    var req = '';
    fonctionAutrePage='_getFranchiseurs';

    if(!ids && idsActuels)
        ids = idsActuels;
    if(!selection && modeSelectionActuel)
        selection = modeSelectionActuel;
    idsActuels = ids;
    modeSelectionActuel = selection;
    if(!ids) // Aucune sélection on a pas à rester
        return;
    
    if(!ids) {
        req = 'SELECT * FROM reseaux_tlf ORDER BY nom_enseigne';
    } else {
        req = 'SELECT * FROM reseaux_tlf WHERE id IN('+implode(',',ids)+') ORDER BY nom_enseigne'/* LIMIT '+(page*nbParPage)+','+(nbParPage*(page+1))*/;        
    }
    //alert(req);
    db = _openDatabase();
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(req
        ,
        [], 
        
        function (transaction, result) {
            var htmlFranchiseurs = '';
            var franchiseur;
            arrFranchiseursCourant = new Array();
                     //          alert(result.rows.length);
            for (var i=0; i < result.rows.length; i++) {
                // i >=0 && i<10(0+1)
                franchiseur = result.rows.item(i);
                
                if(i >= page * nbParPage && i<nbParPage*(page + 1)) {
                
                    htmlFranchiseurs+=_htmlFranchiseurListing(franchiseur);
                  

                    if(i == result.rows.length - 1) finListe = true;
                    else finListe = false;
                }
                arrFranchiseursCourant[arrFranchiseursCourant.length] = franchiseur.id;
                //alert(franchiseur.nom_enseigne);
            }
            //alert(htmlFranchiseurs);
            if(selection) {
                            //   alert('sel');
                $('#listeResultatFranchiseursSelectionnes').html(htmlFranchiseurs);     
                if(pageCourante!='#listeSelection' && !page) {
                    goToPage('#listeSelection');    
                    _scrollTop();
                }
                
            } else {
                         //      alert('aut');
                $('#listeResultatFranchiseurs').html(htmlFranchiseurs);     
                               
                //if(pageCourante!='#listeResultats' && !page) {
                    goToPage('#listeResultats');                               
                   // _scrollTop();
               // }
            }                               
            majPagination();
            
        },
        errorSQL );
    }
    );
    return arr;
}
function getDonneesFranchiseur(id)
{
	//var args = {ac:'franchises',id: id};
	var args='';
	
	$.getJSON(url_site + page_ws, args, function(dataJSON) {
        
		var franchiseur = dataJSON;
		
		franchiseurs[franchiseur.id]=franchiseur;
        //	setStorage('franchiseurs',	franchiseurs);
        /*var retFranchiseurs = getStorage('franchiseurs');
         alert(retFranchiseurs);*/
	});
}

function _initListingFranchiseurs(arrFranchiseurs) {
    db = _openDatabase();
    
    var html='';
    
    db.transaction(
    function(transaction) {
        transaction.executeSql(
        'SELECT * FROM reseaux_tlf WHERE id IN('+implode(',',arrFranchiseurs)+') ORDER BY nom_enseigne', 
        errorSQL, 
        function (transaction, result) {
            for (var i=0; i < result.rows.length; i++) {
                html += _htmlFranchiseurListing(result.rows.item(i));
            }
        });
    }
    );
    return html;
    
}

function _htmlFranchiseurListing(objFranchiseur,selection)
{
    var html = '<div class="enseigne" id="ficheListing'+objFranchiseur.id+'"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td onclick="ficheFranchiseur('+objFranchiseur.id+')" width="10%" valign="top"><div class="logoReseau" style="background-image:url(http://www.toute-la-franchise.com/images/zoom/reseaux/micro/'+objFranchiseur.id+'.jpg)" /></td><td class="description" onclick="ficheFranchiseur('+objFranchiseur.id+')"><span class="txtOrangeMoyen"><strong>'+stripslashes(objFranchiseur.nom_enseigne)+'</strong></span><br /><span class="txtGris">'+stripslashes(objFranchiseur.slogan)+'</span><br /><span class="txtPetit">'+stripslashes(objFranchiseur.resume_activite)+'</span></td></tr><tr><td colspan="2"><div class="infosReseau" onclick="ficheFranchiseur('+objFranchiseur.id+')">Apport : <span class="txtMauve">'+stripslashes(objFranchiseur.apport_personnel)+'</span><br />Implantation : <span class="txtMauve">'+stripslashes(objFranchiseur.nbre_implantation)+'</span></div>';
    if(franchiseurSelectionne(objFranchiseur.id)) {
        html +='<a href="javascript:void(0);"  data-role="none" id="btnSelection'+objFranchiseur.id+'" onclick="delFranchiseurFromSelection('+objFranchiseur.id+',this);';
        if(selection)
            html+="delFranchiseurFromListeSelection("+objFranchiseur.id+");";
        html +='" class="btnSupprimer btnSelection'+objFranchiseur.id+'">SUPPRIMER</a>';
        
        //<a href="#" class="btnSupprimer btnAjouter">AJOUTER<br /><span style="font-size:8px;">A LA SELECTION</span></a>
    }
    else {
       html +='<a href="javascript:void(0);" data-role="none" id="btnSelection'+objFranchiseur.id+'" onclick="addFranchiseurToSelection('+objFranchiseur.id+',this);" class="btnSupprimer btnAjouter btnSelection'+objFranchiseur.id+'">AJOUTER<br /><span style="font-size:8px;">A LA SELECTION</span></a>';
    }   
    html += '<a href="javascript:void(0);" data-role="none" onclick="ficheFranchiseur('+objFranchiseur.id+')" class="btnVoirFiche"><span class="txtOrange11">VOIR</span> LA FICHE<br />ENSEIGNE</a></td></tr></table></div>';
    //alert(html);
    return html;
}
function _htmlFranchiseur(objFranchiseur)
{
 //    alert('aff');
    $(".ficheNomEnseigne").html(objFranchiseur.nom_enseigne);
    $("#ficheApport").html(objFranchiseur.apport_personnel);
    $("#ficheSlogan").html(objFranchiseur.slogan);
    
    $("#ficheProfil").html(nl2br(objFranchiseur.profil_candidat));
    if(objFranchiseur.profil_candidat) {
        $('#liFicheReseauAncreProfil').show();
        $('#titreFicheReseauAncreProfil').show();        
    } else {
        $('#liFicheReseauAncreProfil').hide();
        $('#titreFicheReseauAncreProfil').hide();
    }
    
    $("#ficheHistorique").html(nl2br(objFranchiseur.historique));
    if(objFranchiseur.historique) {
        $('#liFicheReseauAncreHistorique').show();
        $('#titreFicheReseauAncreHistorique').show();        
    } else {
        $('#liFicheReseauAncreHistorique').hide();
        $('#titreFicheReseauAncreHistorique').hide();
    }

    
    $("#ficheConcept").html(nl2br(objFranchiseur.introduction));
    if(objFranchiseur.introduction) {
        $('#liFicheReseauAncrePresentation').show();
        $('#titreFicheReseauAncrePresentation').show();        
    } else {
        $('#liFicheReseauAncrePresentation').hide();
        $('#titreFicheReseauAncrePresentation').hide();
    }
    
    $("#ficheAnneeCreation").html(mysqlToDate(objFranchiseur.date_creation));
    $("#ficheAnneeLancement").html(mysqlToDate(objFranchiseur.date_lancement));
    $("#ficheNbreImplantations").html(objFranchiseur.nbre_implantation);
    $("#ficheDroitsEntree").html(objFranchiseur.droit_entree);
    $("#ficheApport").html(objFranchiseur.apport_personnel);
    $("#ficheRedevanceFonctionement").html(objFranchiseur.redevance_fonctionnement);
    $("#ficheRedevancePub").html(objFranchiseur.redevance_pub);
    $("#ficheRoyalties").html(objFranchiseur.royalties);
    $("#ficheInvestissement").html(objFranchiseur.investissement);
    $("#caApres2ans").html(objFranchiseur.ca_apres2ans);

    //$("#ficheSurfaceMoyenne").html();
    $("#ficheContrat").html(objFranchiseur.type_de_contrat);
    $("#ficheAideAuFinancement").html(objFranchiseur.aide_au_financement);
    $("#ficheSurfaceMoyenne").html(objFranchiseur.surface_moyenne);
    $(".ficheReseauDemandeDoc").attr('href','javascript:addFranchiseurToSelection('+objFranchiseur.id+');goToFormulaire();');
    $("#ficheLogo").css('background-image','url(http://www.toute-la-franchise.com/images/zoom/reseaux/micro/'+objFranchiseur.id+'.jpg)');

    $('#ficheAjouterSelection').attr('class','btnSupprimer btnAjouter btnSelection'+objFranchiseur.id);
/*    $('#ficheAjouterSelection').addClass('btnAjouter');
    $('#ficheAjouterSelection').addClass('btnSelection'+objFranchiseur.id);*/
    if(franchiseurSelectionne(objFranchiseur.id)) {
        $('#ficheAjouterSelection').removeClass('btnAjouter');
        changeBoutonToSelectionne(objFranchiseur.id,document.getElementById('ficheAjouterSelection'));
    }
    else
        changeBoutonToDeselectionne(objFranchiseur.id,document.getElementById('ficheAjouterSelection'));
    console.log($('#ficheAjouterSelection').attr('class'));
   // $("#ficheAjouterSelection").attr('click','http://www.toute-la-franchise.com/images/zoom/reseaux/mini/'+objFranchiseur.id+'.jpg');

 //   alert('affFini');
/*    $("#ficheNomEnseigne").html(objFranchiseur.nom_enseigne
    $("#ficheNomEnseigne").html(objFranchiseur.nom_enseigne
    $("#ficheNomEnseigne").html(objFranchiseur.nom_enseigne
    $("#ficheNomEnseigne").html(objFranchiseur.nom_enseigne*/
}

function initFranchiseursFromRubrique(rub)
{
    _reInitListing();    
    _initFranchiseursFromRubrique(rub);
    
}
function initListingFranchiseursApports(debut,fin)
{
    //alert(debut+' '+fin);
    _reInitListing();
    _getFranchiseursFromApport(debut,fin);
    //On change pas de page
}
function _reInitListing()
{
    page = 0;
   // pageCourante = '';
    modeSelectionActuel = '';
}
function ficheFranchiseur(id)
{
    _initFicheFranchiseur(id);
    goToPage('#ficheReseau');
}
function getFranchiseurs(franchiseurs,selection)
{
    _reInitListing();
    _getFranchiseurs(franchiseurs,selection);
}



function _getFranchiseursFromRubriques(idRub) {
	var listeFranchiseurs = new Array();
	var idsFranchiseurs = getIdsFranchiseursFromRubrique[idRub];
	for(i=0;i<idsFranchieurs.length;i++) {
		listeFranchiseurs[i] = franchiseurs[idsFranchieurs[i]];													
	}
	return listeFranchiseurs;
}
function _getIdsFranchiseursFromRubrique(idRub) {
	var arrFranchiseurs = new Array();
	for(i=0;i<jointureRubriques.length;i++)
    if(jointureRubriques[i] == idRub)
    arrFranchiseurs[jointureRubriques[i]];
	return arrFranchiseurs;
}
function getFranchiseursFromLocation(latitude,longitude) {
    
    $('#chargementLocalisation').html('Chargement en cours...');
    
    _reInitListing();
    
    var args = '?ac=ws_geolocalisation&latitude='+latitude+'&longitude='+longitude;
    var idsFranchieurs=new Array();
    console.log(url_site+page_ws+args);
    $.ajax({type: 'GET',
           url: url_site+page_ws+args,
           dataType: 'json',
           error: function(){alerte('Erreur','Pas de connexion ou erreur...');$('#chargementLocalisation').html('');},
           async: true,
           success: function(dataJSON) {
                var arrFranchiseurs = dataJSON;
              //  alert(dataJSON.length);
                if(dataJSON.length) {
                    _getFranchiseurs(arrFranchiseurs);
                    majPagination();
                 //   $.mobile.changePage($('#listeResultats'),defautTransition);
                } else alerte('Aucun franchiseur','Pas de résultat pour cette ville');
                $('#chargementLocalisation').html('');
           }}
           );
}

function _getDonneesFranchiseurs()
{
	var args = null;
	var requete = '';
	//alert('franchiseurs');
    var date = getDateDerniereMaj();
    if(!date)
        args = '?ac=franchises&date=2001-01-01';
    else args ='?ac=franchises&date='+ date;
	console.log(url_site+page_ws+args);
	//alert('pre');
    
    $.ajax({type: 'GET',
        url: url_site+page_ws+args,
        dataType: 'json',
        timeout: 600000,
        async: false,
           error: function()  {console.warn('Erreur JSON');},
        success: function(dataJSON) {
            //		  alert(dataJSON);	
            var arrFranchiseurs = dataJSON;
           console.log('NBF '+arrFranchiseurs.length);
            //alert(arrFranchiseurs.length);
            //alert(requetesSql.length);
            for(i=0;/*i<1 */i<arrFranchiseurs.length;i++) {
                //			  franchiseurs[arrFranchiseurs[i].id]=arrFranchiseurs[i];
           requetesSql[requetesSql.length] = "DELETE FROM reseaux_tlf WHERE id=" + arrFranchiseurs[i].id;
                requetesSql[requetesSql.length] = "INSERT INTO reseaux_tlf(id,nom_enseigne,slogan,apport_personnel,nbre_implantation, profil_candidat,resume_activite,date_creation,date_lancement,surface_moyenne,droit_entree,redevance_fonctionnement,redevance_pub,investissement,emplacement,ca_apres2ans,royalties,description,type_de_contrat,aide_au_financement,formation_et_assistances,rubrique_principale,historique,introduction) VALUES(" + arrFranchiseurs[i].id + ",'" + parseSQL(arrFranchiseurs[i].nom_enseigne) + "' ,'"+parseSQL(arrFranchiseurs[i].slogan)+"','"+parseSQL(arrFranchiseurs[i].apport_personnel)+"','"+parseSQL(arrFranchiseurs[i].nbre_implantation)+"','"+parseSQL(arrFranchiseurs[i].profil_candidat)+"','"+parseSQL(arrFranchiseurs[i].resume_activite)+"','"+parseSQL(arrFranchiseurs[i].date_creation)+"','"+parseSQL(arrFranchiseurs[i].date_lancement)+"','"+parseSQL(arrFranchiseurs[i].surface_moyenne)+"','"+parseSQL(arrFranchiseurs[i].droit_entree)+"','"+parseSQL(arrFranchiseurs[i].redevance_fonctionnement)+"','"+parseSQL(arrFranchiseurs[i].redevance_pub)+"','"+parseSQL(arrFranchiseurs[i].investissement)+"','"+parseSQL(arrFranchiseurs[i].emplacement)+"','"+parseSQL(arrFranchiseurs[i].ca_apres2ans)+"','"+parseSQL(arrFranchiseurs[i].royalties)+"','"+parseSQL(arrFranchiseurs[i].description)+"','"+parseSQL(arrFranchiseurs[i].type_de_contrat)+"','"+parseSQL(arrFranchiseurs[i].aide_au_financement)+"','"+parseSQL(arrFranchiseurs[i].formation_et_assistances)+"','"+parseSQL(arrFranchiseurs[i].rubrique_principale)+"','"+parseSQL(arrFranchiseurs[i].historique)+"','"+parseSQL(arrFranchiseurs[i].introduction)+"')";
     
         //  requetesSql[requetesSql.length] = 'INSERT INTO reseaux_tlf(id,nom_enseigne,slogan,apport_personnel,nbre_implantation, profil_candidat,resume_activite,date_creation,date_lancement,surface_moyenne,droit_entree,redevance_fonctionnement,redevance_pub,investissement,emplacement,ca_apres2ans,royalties,description,type_de_contrat,aide_au_financement,formation_et_assistances,rubrique_principale,date_entree,historique) VALUES(' + arrFranchiseurs[i].id + ',"' + addslashes(arrFranchiseurs[i].nom_enseigne) + '","'+ addslashes(arrFranchiseurs[i].slogan)+'","'+addslashes(arrFranchiseurs[i].apport_personnel)+'","'+addslashes(arrFranchiseurs[i].nbre_implantation)+'","'+addslashes(arrFranchiseurs[i].profil_candidat)+'" ,"'+addslashes(arrFranchiseurs[i].resume_activite)+'", "'+addslashes(arrFranchiseurs[i].date_creation)+'", "'+ addslashes(arrFranchiseurs[i].date_lancement)+'","'+addslashes(arrFranchiseurs[i].surface_moyenne)+'","'+addslashes(arrFranchiseurs[i].droit_entree)+'" ,"'+ addslashes(arrFranchiseurs[i].redevance_fonctionnement)+'" ,"'+addslashes(arrFranchiseurs[i].redevance_pub)+'" ,"'+addslashes(arrFranchiseurs[i].investissement)+'" ,"'+addslashes(arrFranchiseurs[i].emplacement)+'" ,"'+addslashes(arrFranchiseurs[i].ca_apres2ans)+'" ,"'+addslashes(arrFranchiseurs[i].royalties)+'" ,"'+addslashes(arrFranchiseurs[i].description)+'" ,"'+addslashes(arrFranchiseurs[i].type_de_contrat)+'","'+addslashes(arrFranchiseurs[i].aide_au_financement)+'" ,"'+addslashes(arrFranchiseurs[i].formation_et_assistances)+'" ,"'+addslashes(arrFranchiseurs[i].rubrique_principale)+'" ,"'+addslashes(arrFranchiseurs[i].date_entree)+'" ,"'+addslashes(arrFranchiseurs[i].historique)+'")';
              //   alert(requetesSql[requetesSql.length-1]);
                //setStorage('franchiseurs'+arrFranchiseurs[i].id,serialize(arrFranchiseurs[i]));
                
            }
            //alert(requetesSql.length);
            //		setStorage('franchiseurs',	serialize(franchiseurs));
            //		alert(unserialize(getStorage('franchiseurs576')));
            //var dateMaj = new Date();
            //setStorage('dateDerniereMaj',dateMaj.getTime());
            /*var retFranchiseurs = getStorage('franchiseurs');
             alert(retFranchiseurs);*/
            //		  alert('ok');
        }});
}


/*
 Process de création de base de données

 1- Check 1ère utilisation
 2a- Download de toutes les entités + génération des requetes
 2b- Download entités manquantes + génération des requetes
 3- execution des requêtes
 4- Création des éléments HTML des entités fixes : rubriques, concepts
 5- arrivée dans l'appli
 
 */
var requetesSql = new Array();



function parseSQL(str) {
    return str_replace("'","''",str);
}

function errorSQL(err) {
	alert("Error processing SQL: "+err.code+" "+err.message);
}

// Transaction success callback
//
function successCreateDatabase() {
	/*var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
     db.transaction(queryDB, errorCB);*/
	//alert('ok');
    setStorage('bdd',true);
    initInterface();
}


function databaseCreated()
{
    if(getStorage('bdd'))
        return true;
    else
        return false;
}
function _executeMultiSql(tx)
{
    for(i=0;i<requetesSql.length;i++) {
     //  alert(requetesSql[i]);
       //  console.log(requetesSql[i]);
        tx.executeSql(requetesSql[i]);
       
//nitInterface
    }
    //alert('SQL FAIT : '+requetesSql.length);
    
}
function _openDatabase()
{
    return window.openDatabase("tlf", "1.0", "TLF", 2*1024*1024);
    
}
function _executeMaj()
{
    
    db = _openDatabase();
    db.transaction(_executeMultiSql,errorSQL,successCreateDatabase);
    majDateDerniereMaj();
}

function initApports()
{
    db = _openDatabase();
    db.transaction(_initApports,errorSQL,successSQL);    
    
}
function setStorage(key,value)
{
	//alert(key+ ' ' + value);
	window.localStorage.setItem(key, value);
}
function getStorage(key)
{
	return window.localStorage.getItem(key);
}
function clearStorage()
{
	return window.localStorage.clear();
}

/*
function initBDD()
{
	alert('prepreinit');
	db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(createBDD, errorBDD, successBDD);
	alert('finpreinit');
}
function createBDD(tx)
{ 
	alert('preinit');
	tx.executeSql(
									  'CREATE TABLE IF NOT EXISTS cle ' +
									  '   (cle VARCHAR(50) NOT NULL PRIMARY KEY );');
			 	alert('init');
}
function createEntry(cle) {
	db.transaction(
				   function(transaction) {
				   transaction.executeSql(
										  'INSERT INTO cle (cle) ' + 
										  'VALUES (?);',
										  [cle]
								   }
				   );
    
    
    alert('create');
}
function getEntry() {
    db.transaction(
			   function(transaction) {
			   transaction.executeSql(
									  'SELECT * FROM cle;', 
									  null, 
									  function (transaction, result) {
										for (var i=0; i < result.rows.length; i++) {
											var row = result.rows.item(i);
											alert(row.id);
										}
                                      });
			   }
			   );
	alert('get');
}
 */





function errorBDD(err) {
    alert("Error processing SQL: "+err.code+' '+err.message);
}

function successBDD() {
    alert("success!");
}
function majDateDerniereMaj()
{
    setStorage('dateDerniereMaj',getDate());
}
function getDateDerniereMaj()
{
    return getStorage('dateDerniereMaj');
}
