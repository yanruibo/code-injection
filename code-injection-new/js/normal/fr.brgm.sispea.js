

		
		if (typeof g_firstTimeSearch === 'undefined' || !g_firstTimeSearch) {
		
			$('#located').hide();
			$('#locimpossible').hide();		
			if ( g_newLocation && g_theCommune == "" ) 
				gps(true); 
			else {
				$(document).bind( "pageload", function( event, data ) {
					//alert("pageload: "+data.url);
					if (data.url.indexOf("services.html") != -1) {
						servicesReload();
					}
				});
				g_firstTimeSearch = true;
			}
		}		
	






		
			
            isAndroid = false;
			isIPhone = false;
            firstTimeMessageDone = false;
            
			function onBackKeyDown() { 
                if(String($.mobile.activePage.attr("id")) == "main")
                    setTimeout( function(){ device.exitApp(); }, 100 );
				else if(String($.mobile.activePage.attr("id")) == "localiser")
					setTimeout( function(){ device.exitApp(); }, 100 );
			    else 
					setTimeout( function(){ window.history.back(); }, 100 );
			}

			function onSearchKeyDown() {

				$.mobile.hidePageLoadingMsg();
				$.mobile.loadingMessage = loadingMessage;
				$.mobile.changePage( "index.html#localiser", { transition: "slideup"} );
			}
			
			function showFirstTimeMessage() {
				//$.mobile.fixedToolbars.hide(true);
				$('#searchForm').hide();
				$('#result').hide();				
				//$('.footer').hide();
				$('#firstTimeMessage').show();
				$('#localiser').trigger('updatelayout');
				$('#indexheader').html("SISPEA Eau et Assainissement");
			}
			
			function hideFirstTimeMessage() {
				//$.mobile.fixedToolbars.show(true);
				//$('.footer').show();
				//$('#firstTimeMessage').hide();
                $('[id^=firstTimeMessage]').each(function() { $(this).hide(); });
				$('#indexheader').html('Localiser'); 
				$('#localiser').trigger('updatelayout');
                //alert("hiding");
			}         
            
            function showMessageOrGPS(showMessage) {
                
                if (showMessage)
                    showFirstTimeMessage();
                else 
                    gps(true);
            }
			
			function letsStart() {
                
                if (firstTimeMessageDone) {
                    hideFirstTimeMessage();
                    return;
                }
                firstTimeMessageDone = true;
                
                if (isIPhone) {
                    var cb = function(r) { 
                        showMessageOrGPS(r == 1);
                    }
                    PhoneGap.exec(cb, cb, "FirstTimeLaunchTest", "isFirstTimeLaunched", '');
                }
                else if (isAndroid)
                    showMessageOrGPS(window.firstTimeLaunchTest.isFirstTimeLaunched());
                else
                    showMessageOrGPS(false);                
			}
			
			window.addEventListener('load', function() {

			$('[id^=firstTimeMessage]').each(function() { $(this).hide(); });
				
                document.addEventListener('deviceready', function() {
                    $.mobile.pageLoadErrorMessage = "Accès au service Internet impossible !\nMerci de vérifier la connexion de votre appareil.";
					if (device.platform == "Android") {
                        isAndroid = true;
						//if (parseFloat(device.version) < 3.0) 
						{
							$.mobile.defaultPageTransition = 'none';
							$.mobile.defaultDialogTransition = 'none';
						}
						document.addEventListener("backbutton", onBackKeyDown, false);
						document.addEventListener("searchbutton", onSearchKeyDown, false);
					}
					else if (device.platform.indexOf("iPhone")>=0) {
                        isIPhone = true;
						if (parseFloat(device.version) >= 5.0) {
							//$.mobile.touchOverflowEnabled = true;
						}
					}
					/*if (typeof navigator.app !== 'undefined' && typeof navigator.app.origHistoryBack !== 'undefined') {
						window.history.back = navigator.app.origHistoryBack;
                    }*/
					letsStart();
				}, false);				
				if (!mobileSite) letsStart();
            }, false);
        




			$('#searchForm').submit(search); 	
			$('#submit').click(search);
		


﻿// SISPEA Mobile
// Code by Joachim Pouderoux
// (c) brgm 2012

/*global escape: true */
	
var mobileSite = true;

//var dataServerUrl = "http://mapsrefrec.brgm.fr/WMS/mapserv6?map=/carto/wxs/sispea/spea.map&";
var dataServerUrl = "http://mapsref.brgm.fr/wxs/sispea/spea?";

var geonamesServerUrl = "http://api.geonames.org";
var username = "sispea";
var loadingMessage = "Chargement en cours...";
var locationMessage = "Localisation en cours...";
var searchCityMessage = "Recherche de la commune en cours...";
var searchDataMessage = "Collecte des données en cours...";
var gpsErrorMessage = "Impossible de déterminer la position de votre appareil.\nMerci de rééssayer.";
var gpsPermissionErrorMessage = "L'application ne possède pas l'autorisation de déterminer la position de votre appareil.\nMerci de la lui accorder avant de rééssayer.";
var searchingMessage = "Recherche en cours...";
var unknownLocationMessage = "Commune introuvable !";
var resultsMessage = "Résultats";
var currentLocationMessage = "Commune actuelle";
var requestErrorMessage = "Accès au service Internet impossible !\nMerci de vérifier la connexion de votre appareil.";
var noServicesMessage = "<i>Aucun service trouvé !</i>";
var noConnectionMessage = "Accès Internet indisponible !\nMerci de vérifier la connexion de votre appareil avant de réitérer votre requête.";
var showAllIndicateursMessage = "Tous les indicateurs";
var showMainIndicateursMessage = "Indicateurs principaux";
var availableServicesMessage = "Commune desservie par";

var g_labelsIndicateurs = {
	"D101.0": "Population desservie",
	"D102.0": "Prix de l'eau potable",
	"D151.0": "Délai accès au service",
	"P101.1": "Qualité bactériologique",
	"P101.1a": "Nb prélèvements bact.",
	"P101.1b": "Nb prélèvements bact. non conformes",
	"P102.1": "Qualité physico-chimique",
	"P102.1a": "Nb prélèvements p/c",
	"P102.1b": "Nb prélèvements p/c non conformes",
	"P103.2A": "Connaissance du réseau",
	"P103.2B": "Connaissance du réseau",
	"P104.3": "Rendement du réseau",
	"P105.3": "Pertes volumes non comptés",
	"P106.3": "Pertes par fuite",
	"P107.2": "% renouvellement réseau",
	"P108.3": "% protection ressource",
	"P109.0": "Solidarité aux usagers",
	"P151.1": "Coupures d'eau",
	"P152.1": "Respect délai accès service",
	"P153.2": "Endettement du service",
	"P154.0": "% d'impayés",
	"P155.1": "Taux de réclamations",
	"D201.0": "Population desservie",
	"D202.0": "Raccordements industriels",
	"D203.0": "Boues évacuées",
	"D204.0": "Prix de l'assainissement",
	"P201.1": "% d'abonnés raccordés",
	"P202.2A": "Connaissance du réseau",
	"P202.2B": "Connaissance du réseau",
	"P203.3": "Conformité réseau",
	"P204.3": "Conformité équipement épuration",
	"P205.3": "Performance épuration",
	"P206.3": "Conformité boues évacuées",
	"P207.0": "Solidarité aux usagers",
	"P251.1": "Débordements usagers",
	"P252.2": "Points noirs du réseau",
	"P253.2": "% de renouvellement réseau",
	"P254.3": "Performance épuration locale",
	"P255.3": "Connaissance des rejets",
	"P256.2": "Extinction de la dette",
	"P257.0": "% d'impayés",
	"P258.1": "Taux de réclamations"
};
	
var g_definitionsIndicateurs = {
"D101.0": "Le nombre d'habitants desservis correspond à la population disposant d'un accès au réseau d'eau, que cette population soit permanente ou présente une partie de l'année seulement.<br/><i><i>Bon à savoir :</i></i> Le cas des populations saisonnières est particulièrement important à prendre en compte pour les services de régions touristiques qui doivent disposés d'installations dimensionnées pour faire face à cet afflux ponctuel de la population présente en période de pointe.",
"D102.0": "Le prix au m3 est calculé pour une consommation annuelle de 120 m3 (référence INSEE). Fixé par les organismes publics, le prix dépend notamment de nature et de la qualité de la ressource en eau, des conditions géographiques, de la densité de population, du niveau de service choisi, de la politique de renouvellement du service, des investissements réalisés et de leur financement.<br/><i>Bon à savoir :</i> ce prix intègre toutes les composantes du service rendu (production, transfert, distribution) ainsi que les redevances préservation des ressources et pollution de l'agence de l'eau et, le cas échéant, celle des Voies Navigables de France (prélèvement en rivière), ainsi que la TVA.",
"D151.0": "Cet indicateur  correspond au délai maximal auquel s'est engagé le service d'eau potable pour fournir de l'eau aux nouveaux abonnés dotés d'un branchement fonctionnel.<br/><i>Bon à savoir :</i> Il est à mettre en lien avec l'indicateur P152.1 qui reflète le respect de cet engagement.",
"P101.1": "Cet indicateur évalue le respect des limites règlementaires de qualité de l'eau distribuée à l'usager concernant les paramètres bactériologiques (présence de bactéries pathogènes dans l'eau). Il se réfère aux mesures de l'Agence Régionale de Santé (ARS) et, sous certaines conditions, à celles de l'exploitant.<br/><i>Bon à savoir :</i> En cas d'analyses non conformes, diverses mesures peuvent être prises : avertissement de la population, recherches des causes et traitements correctifs.",
"P101.1a": "Il s'agit du nombre de prélèvements effectués pour  l'Agence Régionale de Santé (ARS) (et, sous certaines conditions, par celles de l'exploitant) dans le cadre du suivi de la qualité de l'eau distribuée par le service d'eau potable.",
"P101.1b": "Il s'agit du nombre de prélèvements effectués pour  l'Agence Régionale de Santé (ARS) et, sous certaines conditions, par celles de l'exploitant jugés NON CONFORMES du point de vue bactériologique dans le cadre du suivi de la qualité de l'eau distribuée par le service d'eau potable.",
"P102.1": "Cet indicateur évalue le respect des limites règlementaires de qualité de l'eau distribuée à l'usager concernant les paramètres physico-chimiques tels que pesticides, nitrates, chrome, bromate. Il se réfère aux mesures de l'Agence Régionale de Santé (ARS) (et, sous certaines conditions), à celles de l'exploitant.<br/><i>Bon à savoir :</i> En cas d'analyses non conformes, diverses mesures sont prises : avertissement de la population, recherches des causes et traitements correctifs.",
"P102.1a": "Il s'agit du nombre de prélèvements effectués pour  l'Agence Régionale de Santé (ARS) (et, sous certaines conditions, par celles de l'exploitant) dans le cadre du suivi de la qualité de l'eau distribuée par le service d'eau potable.",
"P102.1b": "Il s'agit du nombre de prélèvements effectués pour  l'Agence Régionale de Santé (ARS) (et, sous certaines conditions, par celles de l'exploitant) jugés NON CONFORMES du point de vue physico-chimique dans le cadre du suivi de la qualité de l'eau distribuée par le service d'eau potable.",
"P103.2A": "Cet indicateur évalue sur une échelle de 0 à 100, à la fois le niveau de connaissance du réseau et des branchements et l'existence d'une politique de renouvellement pluriannuelle du service d'eau potable.<br/><i>Bon à savoir :</i> la mise à jour annuelle du plan des réseaux est un condition nécessaire à l'obtention d'un total de point supérieur ou égal à 20.",
"P103.2B": "Cet indicateur évalue sur une échelle de 0 à 120, à la fois le niveau de connaissance du réseau et des branchements et l'existence d'une politique de renouvellement pluriannuelle du service d'eau potable. La définition de cet indicateur est celle applicable à partir du RPQS 2013.<br/><i>Bon à savoir :</i> cet indice de connaissance, valorisé à 40 points ou plus, traduit l’existence du descriptif détaillé de transport ou de distribution d'eau du service exigé par la règlementation au 31/12/2013, donc à compter de l'exercice 2013.",
"P104.3": "C'est le rapport entre le volume d'eau consommé par les usagers (particuliers, industriels) et le service public (pour la gestion du dispositif d'eau potable) et le volume d'eau potable d'eau introduit dans le réseau de distribution.<br/><i>Bon à savoir :</i> plus le rendement est élevé, moins les pertes par fuites sont importantes. De fait, les  prélèvements sur la ressource en eau en sont d'autant diminués. Le décret du 27 janvier 2012 pénalise les collectivités qui ne respectent pas un seuil minimum de rendement, au regard de la consommation de leur service et de la ressource utilisée.",
"P105.3": "L'indice linéaire des volumes non comptés évalue, en les rapportant à la longueur des canalisations (hors branchements), la somme des pertes par fuites et des volumes d'eau consommés sur le réseau de distribution qui ne font pas l'objet d'un comptage.<br/><i>Bon à savoir :</i> Cet indicateur diffère de l'indice linéaire de pertes en réseau qui n'intègre que les pertes par fuites. Il lui est toujours supérieur.",
"P106.3": "L'indice linéaire des pertes en réseau évalue, en les rapportant à la longueur des canalisations (hors branchements), les pertes par fuites sur le réseau de distribution.<br/><i>Bon à savoir :</i> Cet indicateur est par définition inférieur à l'indice linéaire des volumes non comptés.",
"P107.2": "Cet indicateur donne le pourcentage de renouvellement moyen annuel (calculé sur les 5 dernières années) du réseau d'eau potable par rapport à la longueur totale du réseau, hors branchements",
"P108.3": "Cet indicateur  traduit l'avancement des démarches administratives et de terrain mises en œuvre pour protéger les points de captage.<br/><i>Bon à savoir :</i> cet indicateur résulte des indices d'avancement individuels de tous les points de prélèvements (y compris ceux non gérés par le service de l'eau potable mais contribuant à son alimentation) pondérés avec les volumes produits par ces ressources.",
"P109.0": "Cet indicateur représente la part des abandons de créance à caractère social ou des versements à un fonds de solidarité, notamment au fond de solidarité logement géré par les conseils généraux dans le cadre de l'aide aux personnes défavorisées.<br/><i>Bon à savoir :</i> exprimé en €/m3, il représente la part de la solidarité aux abonnés les plus démunis, dans le prix de l'eau",
"P151.1": "Cet indicateur sert à mesurer la continuité du service d'eau potable en suivant le nombre de coupures d'eau impromptues pour lesquelles les abonnés concernés n'ont pas été prévenus au moins 24h à l'avance, rapporté à 1000 habitants.<br/><i>Bon à savoir :</i> ces interruptions de service sont dues, en général, à des ruptures de canalisations. Des coupures peuvent être également décidées inopinément pour cause de pollution représentant un danger pour la population.",
"P152.1": "Cet indicateur évalue l'efficacité du service d'ouverture des branchements de nouveaux abonnés. Il s'applique aussi bien aux branchements neufs qu'aux branchements existants. Il donne le pourcentage d'ouvertures réalisées dans le délai auquel s'est engagé le service d'eau potable (l'indicateur descriptif D151.0 rend compte de cet engagement).<br/><i>Bon à savoir :</i> le délai est calculé à partir d'une demande complète (par téléphone ou par écrit) en permettant le traitement.",
"P153.2": "Cet indicateur présente le nombre théorique d'années nécessaires à la collectivité pour rembourser la dette résultant des emprunts contractés pour financer les investissements nécessaires au bon fonctionnement du service d'eau potable.<br/><i>Bon à savoir :</i> le nombre d'années calculé constitue un durée minimum de remboursement : il est calculé en supposant que la collectivité consacre l'intégralité des bénéfices du service au remboursement de cette dette, ce qui rarement le cas (une partie des bénéfices est notamment affecté aux nouveaux investissements).",
"P154.0": "Le taux d'impayés au 31 décembre de l'année N sur les factures d'eau de l'année N-1 exprimé comme le rapport des factures impayées sur le montant des factures d'eau émises par le service mesure l'efficacité des mesures de recouvrement.<br/><i>Bon à savoir :</i> toute facture d'eau non payée, même partiellement, est comptabilisée dans cet indicateur, quel que soit le motif du non-paiement. Ne sont concernées que les factures d'eau consommée.",
"P155.1": "Cet indicateur exprime le niveau de réclamations écrites enregistrées par le service de l'eau, rapporté à 1000 abonnés.<br/><i>Bon à savoir :</i> sont prises en compte les réclamations sur le goût, les fuites avant compteur, la lisibilité des factures, la qualité de la relation clientèle, etc. Les réclamations sur le prix ne sont pas prises en compte. Cet indicateur témoigne du niveau de satisfaction des abonnés à la condition que toutes les réclamations soient correctement comptabilisées.",
"D201.0": "Le nombre d'habitants desservis correspond à la population disposant d'un accès ou pouvant accéder au réseau d'assainissement collectif, que cette population soit permanente ou présente une partie de l'année seulement. <br/><i>Bon à savoir :</i> Le cas des populations saisonnières est particulièrement important à prendre en compte pour les services de régions touristiques qui doivent disposés d'installations dimensionnées pour faire face à cet afflux ponctuel de la population présente en période de pointe.",
"D202.0": "Cet indicateur recense le nombre d'autorisations de rejets d'effluents non domestiques dans le réseau délivrées par la collectivité qui gère le service d'assainissement.",
"D203.0": "Cet indicateur évalue, en tonnes de matière sèche, la quantité de boues évacuées par la ou les stations d'épuration.",
"D204.0": "Le prix au m3 est calculé pour une consommation annuelle de 120 m3 (référence INSEE). Fixé par les organismes publics, le prix dépend notamment de la nature et de la sensibilité du milieu récepteur, des conditions géographiques, de la densité de population, du niveau de service choisi, de la politique de renouvellement du service, des investissements réalisés et de leur financement.<br/><i>Bon à savoir :</i> ce prix intègre toutes les composantes du service rendu (collecte, transport, dépollution) ainsi que la redevance modernisation des réseaux de collecte de l'agence de l'eau et, le cas échéant, celle des Voies Navigables de France (rejet en rivière), ainsi que la TVA.",
"P201.1": "Cet indicateur précise le pourcentage d'abonnés raccordables et raccordés au réseau d'assainissement, par rapport au nombre d'abonnés résident en zone d'assainissement collectif.<br/><i>Bon à savoir :</i> Si le zonage d'assainissement collectif n'a pas été établi par les collectivité cet indicateur n'est pas calculable. Un indicateur inférieur à 100% indique que le service d'assainissement n'a pas achevé la desserte par réseau de toute sa zone d'assainissement collectif.",
"P202.2A": "Cet indicateur évalue sur une échelle de 0 à 100, à la fois le niveau de connaissance du réseau et des branchements et l'existence d'une politique de renouvellement pluriannuelle du service d'assainissement.<br/><i>Bon à savoir :</i> la mise à jour annuelle du plan des réseaux est un condition nécessaire à l'obtention d'un total de point supérieur ou égal à 20.",
"P202.2B": "Cet indicateur évalue sur une échelle de 0 à 120, à la fois le niveau de connaissance du réseau et des branchements et l'existence d'une politique de renouvellement pluriannuelle du service d'assainissement collectif.<br/><i>Bon à savoir :</i> Cet indice de connaissance, valorisé à 40 points ou plus, traduit l’existence du descriptif détaillé des ouvrages de collecte et de transport des eaux usées du service exigé par la règlementation au 31/12/2013, donc à compter de l'exercice 2013.",
"P203.3": "Cet indicateur permet d'évaluer la conformité du  réseau de collecte d'un service d'assainissement, au regard des dispositions règlementaires issues de la directive européenne ERU.<br/><i>Bon à savoir :</i> cet indicateur résulte des conformités des seuls réseaux de collecte du service (y compris ceux se déversant dans une station d'épuration non gérée par le service de l'assainissement) générant plus de 2 000 équivalents-habitants de Charge Brute de Pollution Organique charge (CBPO), pondérés avec cette même CBPO.",
"P204.3": "Cet indicateur permet d'évaluer la conformité des équipements de l'ensemble des stations d'épuration d'un service d'assainissement, au regard des dispositions règlementaires issues de la directive européenne ERU.<br/><i>Bon à savoir :</i> cet indicateur résulte des conformités des seules stations d'épurations du service de plus de 2 000 équivalents-habitants de capacité de traitement, pondérées avec la Charge Brute de Pollution Organique (CBPO).",
"P205.3": "Cet indicateur permet d'évaluer la conformité de la performance de l'ensemble des stations d'épuration d'un service d'assainissement, au regard des dispositions règlementaires issues de la directive européenne ERU.<br/><i>Bon à savoir :</i> cet indicateur résulte des conformités des seules stations d'épurations du service de plus de 2 000 équivalents-habitants de capacité de traitement, pondérées avec la Charge Brute de Pollution Organique (CBPO).",
"P206.3": "Cet indicateur mesure le pourcentage la part des boues de boues évacuées par l'ensemble des stations d'épuration d'un service d'assainissement,  et traitées ou valorisées conformément à la réglementation.<br/><i>Bon à savoir :</i> .les filières de traitement et/ou de valorisation ces boues peuvent être la valorisation agricole, le compostage, l'incinération, la gazéification et la décharge agréée.",
"P207.0": "Cet indicateur représente la part des abandons de créance à caractère social ou des versements à un fonds de solidarité, notamment au fond de solidarité logement géré par les conseils généraux dans le cadre de l'aide aux personnes défavorisées.<br/><i>Bon à savoir :</i> exprimé en €/m3, il représente la part de la solidarité aux abonnés les plus démunis, dans le prix de l'assainissement.",
"P251.1": "Cet indicateur mesure le nombre de demandes d'indemnisation suite à un incident dû à l'impossibilité de rejeter les effluents dans le réseau public de collecte des eaux usées (débordement dans la partie privée), rapporté à 1 000 habitants desservis.",
"P252.2": "L'indicateur recense, pour 100 km de réseau d'assainissement, le nombre de sites d'intervention, dits `points noirs`, nécessitant au moins deux interventions par an pour entretien (curage, lavage, mise en sécurité).<br/><i>Bon à savoir :</i> en cas de réseau séparatif, le réseau d'eaux usées est pris en compte mais pas le réseau d'eaux pluviales.",
"P253.2": "Cet indicateur donne le pourcentage de renouvellement moyen annuel (calculé sur les 5 dernières années) du réseau d'assainissement collectif par rapport à la longueur totale du réseau, hors branchements.",
"P254.3": "Cet indicateur permet de mesurer le pourcentage de bilans 24h conformes de  l'ensemble des stations d'épuration d'un service d'assainissement, au regard des prescriptions d'auto-surveillance du ou des arrêtés préfectoraux d'autorisation de traitement.<br/><i>Bon à savoir :</i> cet indicateur résulte des conformités des seules stations d'épurations du service de plus de 2 000 équivalents-habitants de capacité de traitement, pondérées avec la Charge Brute de Pollution Organique (CBPO).",
"P255.3": "Cet indicateur permet de mesurer, sur une échelle de 0 à 120, le niveau d'implication du service d'assainissement dans la connaissance et le suivi des rejets directs par temps sec et par temps de pluie (hors pluies exceptionnelles des réseaux de collecte des eaux usées au milieu naturel (rejets des déversoirs d'orage, trop-pleins des postes de refoulement, des bassins de pollution...).",
"P256.2": "Cet indicateur présente le nombre théorique d'années nécessaires à la collectivité pour rembourser la dette résultant des emprunts contractés pour financer les investissements nécessaires au bon fonctionnement du service d'eau potable.<br/><i>Bon à savoir :</i> le nombre d'années calculé constitue un durée minimum de remboursement : il est calculé en supposant que la collectivité consacre l'intégralité des bénéfices du service au remboursement de cette dette, ce qui est rarement le cas (une partie des bénéfices est notamment affectée aux nouveaux investissements).",
"P257.0": "Le taux d'impayés au 31 décembre de l'année N sur les factures d'eau de l'année N-1 exprimé comme le rapport des factures impayées sur le montant des factures d'eau émises par le service mesure l'efficacité des mesures de recouvrement.<br/><i>Bon à savoir :</i> toute facture d'assainissement non payée, même partiellement, est comptabilisée dans cet indicateur, quel que soit le motif du non-paiement. Ne sont concernées que les factures d'eau consommée.",
"P258.1": "Cet indicateur exprime le niveau de réclamations écrites enregistrées par le service de l'assainissement collectif, rapporté à 1000 abonnés.<br/><i>Bon à savoir :</i> sont prises en compte les réclamations sur l'odeur, les débordements, les infiltrations, la qualité de la relation clientèle, etc. Les réclamations sur le prix ne sont pas prises en compte. Cet indicateur témoigne du niveau de satisfaction des abonnés à la condition que toutes les réclamations soient correctement comptabilisées.",
"D301.0": "Le nombre d'habitants desservis correspond à la population ayant accès au Service Public d'Assainissement non Collectif, que cette population soit permanente ou présente une partie de l'année seulement.<br/><i>Bon à savoir :</i> relèvent du service public d'assainissement non collectif (SPANC) toutes les populations délimitées en zone d'assainissement non collectif. Si la délimitation des zonages collectif/non collectif n'a pas été réalisée, cet indicateur ne devrait pas être renseigné.",
"D302.0": "Cet indicateur, sur une échelle de 0 à 100, renseigne sur les prestations obligatoires fournies par la collectivité dans le cadre du service public d'assainissement non collectif  (SPANC). Au-delà de 100, sur une échelle allant jusqu'à 140, il évalue l'étendue des services complémentaires et facultatifs proposés par le SPANC.<br/><i>Bon à savoir :</i> cet indicateur est descriptif, il ne permet pas d'évaluer la qualité, mais le niveau du service rendu.",
"P301.3": "Cet indicateur évalue le pourcentage d'installations d'assainissement non collectif conformes, après contrôle, à la réglementation sur l'ensemble des installations contrôlées depuis la création du service.<br/><i>Bon à savoir :</i> cet indicateur n'aura de véritable signification que lorsque l'ensemble des habitations relevant du SPANC aura été contrôlée."
};
	
var g_missionsIcons = {
	"Production": "images/production.png", 
	"Transfert": "images/transfert.png",
	"Distribution": "images/distribution.png",
	"Collecte": "images/collecte.png", 
	"Transport": "images/transport.png",
	"Dépollution": "images/depollution.png"
};

var g_missionsDefinitions = {
	"Production": "La mission de production consiste à assurer la mise à disposition d'eau potable en tête de réseau de distribution après avoir effectué les traitements requis. Elle peut comprendre ou non le captage, l'adduction de l'eau brute, le pompage en sortie d'usine. La conduite de transfert jusqu'au réservoir situé en dehors des limites de l'usine et ce même réservoir font partie de la distribution.", 
	"Transfert": "La mission de transfert consiste à assurer le transport de l'eau potable depuis la sortie de l'usine de production jusqu'à des points de livraison de ventes en gros. Il n'y a pas d'abonnés directement desservis.",
	"Distribution": "La mission de distribution consiste à acheminer l'eau potable pour la mettre à disposition des abonnés de toute nature. Cette mission peut inclure une mission de transfert.",
	"Collecte": "La mission de collecte consiste à collecter les eaux usées et unitaires au droit des branchements des abonnés et à les acheminer jusqu'aux réseaux de transport ou aux usines de dépollution. Cette mission peut inclure une mission de transport.", 
	"Transport": "La mission de transport consiste à assurer le transport des eaux usées et unitaires depuis l'aval des canalisations de collecte jusqu'à des usines de dépollution ou à des points de livraison à un autre service. Il n'y a pas d'abonnés directement desservis.",
	"Dépollution": "La mission de dépollution consiste à assurer le traitement des eaux usées et unitaires en vue de leur rejet au milieu naturel dans le respect de la réglementation. Elle peut comprendre ou non le pompage en sortie d'usine et le rejet lui-même. Les ouvrages situés à l'amont de l'entrée de l'usine de dépollution et de son by-pass font partie de la mission de transport."
};

var g_modeGestionDefinitions = {
	"Régie": "La collectivité exploite elle-même son service avec son personnel, sans aucun recours à des prestataires de service. Elle assure le suivi et l’entretien des installations, la facturation et la gestion clientèle. Le service finance ses dépenses d’investissement et de fonctionnement par une redevance perçue auprès des usagers.",
	"Concession": "La concession répond à 3 critères :\n - L'investissement initial (dit investissement `ab initio`) du patrimoine du service (frais de 1er établissement) est à la charge du concessionnaire,\n - Le concessionnaire exploite le service, de façon exclusive, sur un périmètre déterminé par la collectivité et à ses risques et périls,\n - Le concessionnaire est rémunéré par la perception directe d'une redevance auprès des usagers, lui permettant d'amortir ses frais de 1er établissement et ses charges de fonctionnement.",
	"Régie avec une prestation de services": "La régie avec une prestation de services relève du mode de gestion directe.\nLa collectivité exploite elle-même son service en recourant en tout ou partie à un ou plusieurs de service. Elle assure le suivi et l’entretien des installations, la facturation et la gestion clientèle. Le service finance ses dépenses d’investissement et de fonctionnement par une redevance perçue auprès des usagers.",
	"Affermage": "Le fermier exploite le service, de façon exclusive, sur un périmètre déterminé par la collectivité et à ses risques et périls. Il est rémunéré par la perception directe d'une redevance auprès des usagers, lui permettant d'amortir ses charges de fonctionnement.",
	"Régie intéressée": "Le régisseur n'a pas la responsabilité financière du service et ne perçoit pas directement de redevance auprès des usagers : il est directement rémunéré par la collectivité, sur une base forfaitaire et peut percevoir une prime d'intéressement aux résultats de l'exploitation, s'il répond aux objectifs de rentabilité ou de performance du service fixés par la collectivité",
	"Gérance": "La collectivité confie à un gérant le soin de d'exploiter intégralement son service public moyennant une rémunération forfaitaire sans intéressement au résultat. Le gérant est directement rémunéré par la collectivité, et non par les usagers. La collectivité garde, au travers de son trésorier, la prérogative du recouvrement des factures."
};

var g_qualiteDefinitions = [
	"", 
	"", 
	"Avis des services de l'Etat :<br/>anomalie sur la valeur indiquée", 
	"Avis des services de l'Etat :<br/>présomption d'anomalie sur la valeur indiquée"
];

var g_serviceTypesIcons = {
	"assainissement non collectif": "images/assainissementnc.png",
	"assainissement collectif": "images/assainissementc.png",
	"eau potable": "images/eaupotable.png"
};
				
var g_defIndicateursAEP = [ "D101.0", "D102.0", "P104.3", "P101.1", "P102.1", "P155.1" ];

var g_defIndicateursASST = [ "D201.0", "D204.0", "P205.3", "P258.1" ];

var g_newLocation = true;
var g_theCommune = "", g_theLat = "", g_theLon = "";
var g_dataLoaded = false;

var g_firstTimeSearch = false;

var g_indsTable;
var g_indsTableIdx = 0;
var g_showIndicateurs = false;
var g_pagesTable = [];
var g_pagesTableIdx = 0;

var g_servicesJSON = "";

var g_definitionTitle = "";
var g_definitionValue = "";

function checkNetworkState() {
	"use strict";
	if (!mobileSite) { return true; }
	//var networkState = navigator.network.connection.type;
	//if (networkState === Connection.UNKNOWN) { myalert(noConnectionMessage, "SISPEA"); return false; }
	return true;
}

function myalert(msg, title) {
	"use strict";
	if (mobileSite) {
        navigator.notification.alert(msg, function(){}, title, 'OK');
	}
    else {
        alert(msg);
	}
}

// Recherche de la position GPS puis de la commune associée via geonames - redirection sur services.php
function gps(showMessage) {
	"use strict";
	
	$('.footer').hide();
	$("#searchForm").hide();
	$("#result").hide();
		
	try {
		$.mobile.hidePageLoadingMsg();
		
		if (showMessage) {
			$.mobile.loadingMessage = locationMessage;
			$.mobile.showPageLoadingMsg();
		}
		/*if(mobileSite)			
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: false}); //mobileSite
		else*/
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {timeout: 60000, enableHighAccuracy: false, maximumAge: 9000});
	}
	catch (ex) {
		$.mobile.hidePageLoadingMsg();
		locationError(ex);
	}
}

function locationSuccess(position) {
	"use strict";
	
	$("#searchForm").show();
	$("#result").show();
	$('.footer').show();
	$.mobile.hidePageLoadingMsg();
	
	try {		
		if (!checkNetworkState()) { return; }
		
		$.mobile.loadingMessage = searchCityMessage;
		$.mobile.showPageLoadingMsg();
		
    var url = geonamesServerUrl + '/findNearbyPlaceNameJSON?lat=' + String(position.coords.latitude)  + '&lng=' + String(position.coords.longitude) + '&username=' + username;
				
		//$.getJSON("proxy.php", { path: url }, function(msg) {
		$.getJSON(url, function(msg) {
			
			$.mobile.hidePageLoadingMsg();
			$.mobile.loadingMessage = loadingMessage;
			g_newLocation = true;
			g_theCommune = escape(msg.geonames[0].name);
			g_theLon = String(position.coords.longitude);
			g_theLat = String(position.coords.latitude);
			if (String(location).indexOf("services.html") < 0) {
				$.mobile.changePage("services.html#services");
			}
			else {
				servicesReload();
			}
		})
		.error(function(msg) {
			
			$.mobile.hidePageLoadingMsg();
			$.mobile.loadingMessage = loadingMessage;
			myalert(requestErrorMessage, "SISPEA");
		});
	}
	catch (ex) { $.mobile.hidePageLoadingMsg(); }
}
	
function locationError(err) {
	"use strict";
	$("#searchForm").show();
	$("#result").show();
	$('.footer').show();
	$.mobile.hidePageLoadingMsg();
	$.mobile.loadingMessage = loadingMessage;	
	
	try {
		var msg = gpsErrorMessage;
		if (err && err.code && err.code === err.PERMISSION_DENIED) { msg = gpsPermissionErrorMessage; }
		myalert(msg, "SISPEA");
		$.mobile.loadingMessage = loadingMessage;
		$.mobile.changePage("index.html#localiser", {transition: "none"});
	}
	catch (ex) { }
}

function searchInTab(tab, value) {
	"use strict";
	for (var i=0;i<tab.length;i++) { if (tab[i] === value) { return true; } }
	return false;
}

// Fonction de recherche d'un lieu dans le formulaire de recherche
function search(event) {
	"use strict";
	
	if (event !== null) { event.preventDefault(); }

	$('#search').blur();
	
	if (!checkNetworkState()) { return; }
		
	$.mobile.loadingMessage = searchingMessage;
	$.mobile.showPageLoadingMsg();
	
	var term = $('#search').val();
  var url = geonamesServerUrl + '/search?q=' + encodeURI(term) + '&country=FR,MQ,GP,PF,FR,RE,YT,PM&lang=fr&featureClass=P&maxRows=20&type=JSON&style=FULL'+ '&username=' + username; //&fuzzy=0.7
	//$.getJSON("proxy.php", {path : url}, function(data) {
	$.getJSON(url, function(data) {
  			
		var count = 0;
		var names = [];
		var list = $('#result');
		
		list.html("");
		list.append($('<li><a href="javascript: gps(true);"><img src="images/location16.png" alt="" class="ui-li-icon">' + currentLocationMessage + '</a></li>'));
		list.append($('<li data-role="list-divider" data-theme="a">' + resultsMessage + '</li>'));
		
		$.each(data, function(row, rowdata) {						
			$.each(rowdata, function(ele, eledata) {
				
				//if (searchInTab(names, eledata.name) == true) return;
				url = 'services.html#services';
				var adminname = eledata.adminName2 + ', ';
				list.append($('<li><a href="' + url + '" ' +
				'onclick="g_newLocation = true; g_theCommune = \'' + escape(eledata.name) + '\'; g_theLat = \'' + String(eledata.lat) + '\'; g_theLon = \'' + String(eledata.lng) +'\'; $.mobile.changePage(\'' + url + '\');"><h3>' + eledata.name + '</h3><p>' + (adminname == ', ' ? '' : adminname)+ eledata.adminName1 + '</p></a></li>'));
				names[count] = eledata.name;
				count++;
			});
		});
		
		if (count === 0) { list.append($('<li data-icon="false"><a onclick="javascript: $(\'#search\').focus();"><i>' + unknownLocationMessage + '</i></a></li>')); }

		list.listview("destroy").listview();	
		list.listview('refresh');
		$.mobile.hidePageLoadingMsg();
		$.mobile.loadingMessage = locationMessage;
		//$.mobile.fixedToolbars.show(true);
	})
	.error(function(msg) {
		$.mobile.hidePageLoadingMsg();
		$.mobile.loadingMessage = locationMessage;
		myalert(requestErrorMessage, "SISPEA");
	}); 
}

function capitaliseFirstLetter(string) {
	"use strict";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isFloat(s) {
	"use strict";
	return s.length > 0 && !(/[^0-9.]/).test(s) && (/\.\d/).test(s);
}

function showAllIndicateurs() {
	"use strict";
	for (var j=0; j<g_indsTable.length; j++) {
		if (g_showIndicateurs) { $('#'+g_indsTable[j]).show(); } else { $('#'+g_indsTable[j]).hide(); }
	}
	g_showIndicateurs = !g_showIndicateurs;
	$('[id^=allIndicateursMsg]').each(function() { $(this).text(g_showIndicateurs ? showAllIndicateursMessage : showMainIndicateursMessage); });
	if (!g_showIndicateurs) {
		$('[id^=allIndicateursIcon]').each(function() { $(this).data('icon', 'minus'); $(this).find(".ui-icon").addClass("ui-icon-minus").removeClass("ui-icon-plus"); });
	}
	else {
		$('[id^=allIndicateursIcon]').each(function() { $(this).data('icon', 'plus'); $(this).find(".ui-icon").addClass("ui-icon-plus").removeClass("ui-icon-minus"); });
	}
}

function isServiceAEP(service_type) {
	"use strict";
	return service_type === "eau potable";
}

function isServiceASST(service_type) {
	"use strict";
	return service_type.indexOf("assainissement") >= 0;
}

Array.prototype.swap = function (x,y) {
	"use strict";
	var b = this[x];
	this[x] = this[y];
	this[y] = b;
	return this;
};

function sortServices(a,b) { 
	"use strict";
	return a.service_type < b.service_type; 
}

function sortIndicateurs(a, b) {
	"use strict";
	var A = a.code;
    var B = b.code;
	return (A < B) ? -1 : ( A > B ? 1 : 0);
	//return ( parseFloat(a.code.substring(1)) - parseFloat(b.code.substring(1)));
}

function formatNumber(n, c, d, t){
	var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function isInteger(s) {
  return (s.toString().search(/^-?[0-9]+$/) == 0);
}

function formatServices(createPages) {
	
	$.mobile.loadingMessage = searchDataMessage;
	$.mobile.showPageLoadingMsg();		
		
	var lochtml = '<h3>' + availableServicesMessage + '</h3><ul data-role="listview" data-inset="true" data-theme="a" id="serviceslist">';
				
	g_pagesTable = [];
	g_pagesTableIdx = 0;
	if (createPages) {
		g_indsTable = [];	
		g_indsTableIdx = 0;
	}
	var count = 0, i, j, k;	
	//$.mobile.fixedToolbars.show(false);

	var obj = jQuery.parseJSON(g_servicesJSON);
	if (obj) {
		
		obj.services.sort(sortServices);
		for (i = 0; i < obj.services.length; i++) {
				
			var serviceCode = obj.services[i].code;
			if (typeof serviceCode === "undefined") { continue; }
			count++;
			var pageid = 'pservice'+ serviceCode;
			g_pagesTable[g_pagesTableIdx] = pageid;
			g_pagesTableIdx++;
			var icon = g_serviceTypesIcons[obj.services[i].service_type];
			lochtml += '<li class="ui-corner-all"><a href="#' + pageid +'"' +
				' onclick="javascript: g_showIndicateurs = false; showAllIndicateurs();" >';
			if (typeof icon != "undefined") lochtml += '<img src="' + icon + '"/>';
			lochtml += '<h3 style="white-space:normal;">' + capitaliseFirstLetter(obj.services[i].service) + '</h3><p>' + capitaliseFirstLetter(obj.services[i].collectivite) + '</p></a></li>';
			
			if (!createPages) { continue; }
			
			// Création page service
			var html = '<div data-role="page"  data-theme="a" id="' + pageid + '"><div data-role="header" data-theme="a" data-nobackbtn="false">'+
						'<a href="javascript:history.back(-1);" rel="external">Retour</a><h2>Fiche service</h2></div><div data-role="content" data-theme="a">';
            html += '<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>';
			if (typeof icon != "undefined") html += '<td width="90px;"><img align="left" src="' + icon + '"/></td>';
			html += '<td align="left" valign="top"><h2 style="margin-bottom: 0px;">' + capitaliseFirstLetter(obj.services[i].service) + '<br/></h2>'+ capitaliseFirstLetter(obj.services[i].collectivite)  + '</td></tr></table>';
			
			html += '<h3>Mode de gestion</h3>';
			var modeGestion = capitaliseFirstLetter(obj.services[i].mgt_mode);
			html += '<ul data-role="listview" data-theme="a" data-inset="true"><li><div class="tooltip" href="#" data-title="<b>' + modeGestion + '</b><br/>' + g_modeGestionDefinitions[modeGestion] + '">' + capitaliseFirstLetter(modeGestion) + '</div></li></ul>';
			
			// Section Missions
			html += '<h3>Missions</h3><script>g_showIndicateurs = false; showAllIndicateurs();</script>';					
			html += '<ul data-role="listview" data-inset="true"><li><center>';
			var missions = obj.services[i].missions;
			var missionsArray = missions.split(',');
			html += '<table cellpadding="8"><tr>';
			for (j=0; j<missionsArray.length; j++) 
				html += '<td><center><div class="tooltip" href="#" data-title="<b>' + missionsArray[j] + '</b><br/>' + g_missionsDefinitions[missionsArray[j]] + '"><img src="' + g_missionsIcons[missionsArray[j]] + '"/></div></center></td>';
			
			html += '</tr><tr>';
			for (j=0; j<missionsArray.length; j++) 
				html += '<td><center>' + missionsArray[j] + '</center></td>';
			html += '</tr></table></center></li></ul>';
			
			if ( typeof obj.services[i].indicateurs === "undefined" || obj.services[i].indicateurs.length == 0 ) {
				
				html += '<h3>Indicateurs</h3>';	
				html += 'Depuis '+ obj.services[i].annee + ', ce service n\'a publié aucune donnée. <a href="#" rel="external" onclick="javascript: document.location = \'http://www.service-public.fr/recherche/afsrecherche.php?C=10034&CAT=ANNUAIRE&GROUP_BY=TYPE|3&KEYWORDS=' + g_theCommune +'&SORT_ORDER@user1=TYPE_CONTENU|DESC-afs:relevance|DESC-DATE|DESC&SORT_ORDER@user2=afs:relevance|DESC-DATE|DESC&SORT_ORDER@user3=TYPE|DESC-afs:relevance|DESC-SERVICETETE|ASC-NBSERVICE|ASC&SORT_ORDER@user5=afs:relevance|DESC-DATE|DESC&SORT_ORDER@user6=afs:relevance|DESC-DATE|DESC&TYPE_PART_FILTER@user4=definition%20de%20glossaire&TYPE_PART_FILTER@user5=actualites&NB_REPLY=10&X=4&TYPESERVICESUPRA_FILTER=mairie\';">Contactez la mairie</a> pour en savoir plus.';
			}
			else {	
				html += '<h3>Indicateurs (' + obj.services[i].annee + ')</h3>';	
				
			// Section Indicateurs
			
			var defIndicateurs = isServiceAEP( obj.services[i].service_type ) ? g_defIndicateursAEP : g_defIndicateursASST;				
			
			// Positionne les indicateurs par défaut en tête
			for (k=0; k < defIndicateurs.length; k++) {
				var found = false;
				for (j=0; j<obj.services[i].indicateurs.length; j++) {
				
					var icode = obj.services[i].indicateurs[j].code;
					if ( icode === defIndicateurs[k] ) {
						found = true;
						obj.services[i].indicateurs.swap(k, j);
						break;
					}						
				}
				// Non trouvé ? Ajout à la position k du tableau
				/*if (!found) {
					var tab = [];
					tab.code = defIndicateurs[k];
					tab.value = "";
					tab.unit = "";
					obj.services[i].indicateurs.splice(k, 0, tab);
				}*/
			}
			
			var indictmp = obj.services[i].indicateurs.slice(defIndicateurs.length);			
			indictmp.sort(sortIndicateurs);
			k = 0;
			for (j = defIndicateurs.length; j < obj.services[i].indicateurs.length; j++) { 		
				obj.services[i].indicateurs[j] = indictmp[k];
				k++;
			}
			
			defIndicateurs = null;
			indictmp = null;
			defIndicateurs = isServiceAEP( obj.services[i].service_type ) ? g_defIndicateursAEP : g_defIndicateursASST;
			var defHash = {"_": 0};
			for (j = 0; j < defIndicateurs.length; j++) {
				defHash[defIndicateurs[j]] = "1";
			}
			
			html += '<ul data-role="listview" data-inset="true" data-theme="a">';
			for (j = 0; j < obj.services[i].indicateurs.length; j++) {
								
				var code = obj.services[i].indicateurs[j].code;//obj.services[i].indicateurs[j].code;
				var label = g_labelsIndicateurs[code];
				var quality = parseInt(obj.services[i].indicateurs[j].quality, 10);
				var v = obj.services[i].indicateurs[j].value;
				var unit = obj.services[i].indicateurs[j].unit.replace("0ab", "0 ab").replace("0km", "0 km");
				var value = isFloat(v) ? formatNumber(parseFloat(v), ((code === "P109.0" || code === "P207.0")? 3 : 2), ',', ' ') : (isInteger(v) ? formatNumber(parseInt(v), 0, ',', ' ' ) : v);
				//var value = isFloat(v) ? parseFloat(v).toFixed((code === "P109.0" || code === "P207.0")? 3 : 2).replace('\.',',') : v;
				if (unit === "unité" && value !== "0" && value !== "1") { unit = "unités"; }
				else if (unit === "an" && value !== "0" && value !== "1") { unit = "ans"; }
				else if (unit === "jour ouvrable" && value !== "0" && value !== "1") { unit = "jours ouvrables"; }
				else if (code === "D102.0" || code === "D204.0" || code === "P207.0" || code === "P109.0" ) { unit = "€/m³"; }
				
				if (value !== "") { value += ' ' + unit; if (quality > 1) {value += '<img src="images/qualite' + quality + '.png" class="tooltip" href="#" data-title="' + g_qualiteDefinitions[quality]+ '"/>';} }
				//'<div class="tooltip" href="#" data-title="' + g_qualiteDefinitions[quality]+ '"><img src="images/qualite' + quality + '.png"/></div>';}
				else { value = '<i>n.c.</i>'; }
				//if(mobileSite && device.type == "Android") value = value.replace("€", "E");
				var isInd = defHash[code];	
				var visible = (defHash[code] === "1");
				var listid = (visible ? "ind" : "unkind") + serviceCode + "_" + (i*1000+j);
				var adcls = "";
				if (j === defIndicateurs.length - 1) { adcls = "ui-btn-corner-bottom"; }
				else if (j === defIndicateurs.length) { adcls = "ui-btn-corner-top"; }
				html += '<li id="' + listid +'" data-role="list-divider" class="' + adcls + '"><div class="tooltip" href="#" data-title="<b>' + g_labelsIndicateurs[code] + '</b><br/>' + g_definitionsIndicateurs[code] + //'" onclick="javascript: showDefinition(\'' + code + '\');" data-inline="true" data-rel="dialog" 		data-transition="pop"
				'">' + (label !== null ? label : code)+ '<p class="ui-li-aside">' + value + '</p></div></li>';
				/*html += '<div id="' + listid +'"><ul data-role="listview" data-inset="true" data-theme="a">' +
						'<li data-role="list-divider"><a href="#" onclick="javascript: showDefinition(\'' + code + '\');" data-inline="true" data-rel="dialog" data-transition="pop"><small>' + 
						(label != null ? label : code)+ '</small><p class="ui-li-aside">' + value + '</p></a></li></ul></div>';*/
				if (!visible) {
					g_indsTable[g_indsTableIdx] = listid; 
					g_indsTableIdx++; 
				}				
			}
			defIndicateurs = null;
			defHash = null;
			html += '</ul>';
			}
			
			html += '</div><div data-role="footer" data-theme="a" data-position="fixed"><a href="#" id="allIndicateursIcon' + serviceCode + '" onclick="javascript:showAllIndicateurs();" data-role="button" data-icon="plus" ><div id="allIndicateursMsg' + serviceCode + '">' + showAllIndicateursMessage + '</div></a><a id="legendebut" href="#" onclick="javascript:showUnits();" data-role="button" data-icon="info">Légende</a></div></div>';
			//<a href="#" onclick="javascript:showUnits();" data-role="button" data-icon="info">Légende</a></div></div>';
			$('body').append($(html));
			html = null;
		}
	}
	
	if (count === 0) {
		lochtml += '<li class="ui-btn-corner-all"><h3>' + noServicesMessage + '</h3></li>';
	}
	
	lochtml += '</ul>';
	$('#located').html($(lochtml));
	lochtml = null;
	
	var list = $('#located ul');
	list.listview();
	list.listview('refresh');
	
	g_dataLoaded = true;	
	g_showIndicateurs = false;
	showAllIndicateurs();		
	
	//$.mobile.fixedToolbars.show(true);
	
	$.mobile.hidePageLoadingMsg();
	$.mobile.loadingMessage = loadingMessage;
}

function showDefinition(indicateur) {
	"use strict";
	g_definitionTitle = g_labelsIndicateurs[indicateur];
	g_definitionValue = g_definitionsIndicateurs[indicateur];	
	$.mobile.changePage("definition.html#definition", {reloadPage: true, transition: 'pop', role: 'dialog'});
}

function showUnits() {
	"use strict";
	$.mobile.changePage("legende.html#legende", {reloadPage: false, transition: 'pop', role: 'dialog'});
	/*$("#legendebut").simpledialog({ 'mode' : 'blank', 'prompt': false, 'forceInput': false, 'useModal':true,
        'fullHTML' : g_legende + "<a rel='close' data-role='button' href='#' id='simpleclose'>Close</a>"
    });*/
}

function utf8_decode(str_data) {

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}


function parsesServices(xml) {
	"use strict";
	try {
		g_newLocation = false;		
		/*$(xml).find('[nodeName="ms:nom_com"],nom_com,ms\\:nom_com').each(function() {
			g_theCommune = escape($(this).text());
		});*/
		
		$('#myheader').html('Vous êtes sur ' + unescape(g_theCommune));
		
		$(xml).find('[nodeName="ms:services_json"],services_json,ms\\:services_json').each(function() {	
			g_servicesJSON = $(this).text();

			if (mobileSite && device.platform == "Android") {
				g_servicesJSON = utf8_decode(g_servicesJSON); // Android
				// Fix car la fonction ne prend en pas en compte ce caractère
				g_servicesJSON = g_servicesJSON.replace(/ð/g, "É");
				// Fix car le json est mal formé
				g_servicesJSON = g_servicesJSON.replace('"Veolia"', '\\"Veolia\\"');
			}
		});
		formatServices(true);
		$.mobile.hidePageLoadingMsg();
		$.mobile.loadingMessage = loadingMessage;
	} catch (ex) { }
}

function getServicesError(xhr, ajaxOptions, thrownError) {
	"use strict";
	
	myalert(requestErrorMessage, "SISPEA");
	g_servicesJSON = "";
	formatServices(true);
	$.mobile.hidePageLoadingMsg();
	$.mobile.loadingMessage = loadingMessage;
}

function getServices() {
	"use strict";
	if (!checkNetworkState()) { return; }
	
	try {
		g_dataLoaded = false;
		
		// Formatage de l'URL
		var lat = parseFloat(g_theLat);
		var lon = parseFloat(g_theLon);
		var url = dataServerUrl + 
			"REQUEST=GetFeature&SERVICE=WFS&VERSION=1.1.0&TYPENAME=ETAT_PUBLICATION&srs=EPSG:4326" +
			"&Filter=%3Cogc:Filter%3E%3Cogc:BBOX%3E%3Cogc:PropertyName%3Emsgeometry%3C/ogc:PropertyName%3E%3Cgml:Envelope%20srsName=%27EPSG:4326%27%3E" +
			"%3Cgml:lowerCorner%3E" + (lat - 0.00001) + '%20' + (lon - 0.00001) + "%3C/gml:lowerCorner%3E" +
			"%3Cgml:upperCorner%3E" + (lat + 0.00001) + '%20' + (lon + 0.00001) + "%3C/gml:upperCorner%3E" + 
			"%3C/gml:Envelope%3E%3C/ogc:BBOX%3E%3C/ogc:Filter%3E";
				
		//$.mobile.hidePageLoadingMsg();
		$.mobile.loadingMessage = searchDataMessage;
		$.mobile.showPageLoadingMsg();		
								
		//$.get(url, parsesServices, "xml");
		if ( mobileSite ) {
			$.ajax({type: "GET", url: url, dataType: "xml", success: parsesServices, error:getServicesError});
		}
		else {
			$.ajax({type: "GET", url: "proxyXML.php", data: {path: url}, dataType: "xml", success: parsesServices, error:getServicesError});
		}
	}
	catch (ex) { $.mobile.hidePageLoadingMsg();	$('.footer').show(); }
}

function imageresize() {
	"use strict";
	$('.banner').css('width', ($('.ui-page').width() < 616) ? '100%' : '640px');
}

function servicesReload() {	
	"use strict";
	$('#located').hide();
	imageresize();
	if (g_newLocation) {
		g_servicesJSON = "";
		for (var i=0;i<g_pagesTable.length;i++) { 
			$('#'+g_pagesTable[i]).remove();
		}
		g_pagesTable = []; 
	}
	
	if (g_servicesJSON !== "") {
		$('#locimpossible').hide();		
		$('#located').show();
		formatServices(false);
		$('#myheader').html('Vous êtes sur ' + unescape(g_theCommune));
		return; 
	}
		
	if (typeof g_theCommune === "undefined") {
		$('#myheader').html('SISPEA Eau et Assainissement');
		$('#locimpossible').show();
		return;
	}
	$('#locimpossible').hide();	
	getServices();
	$('#located').show();
}

// Initialisation de la page
$(window).load(function() {
	"use strict";
	$.mobile.loadingMessage = locationMessage;	
	imageresize();
});

$(window).bind("resize", function(){ 
	"use strict";
	imageresize(); 
});

$(document).bind( "pageload", function( event, data ) { 
	"use strict";
	var page = jQuery(event.target);  
	imageresize();
    var pageName = $.mobile.activePage.attr("id");
	/*switch(pageName) {
		case "localiser": break;
	}*/
});

$(window).bind("resize", function(){ 
	"use strict";
	imageresize(); 
}); 

$(document).bind( "pagechange", function( event, data ) { 
	"use strict";
	$.mobile.hidePageLoadingMsg();
	var pageName = $.mobile.activePage.attr("id");
	switch(pageName) {
        case "main":
            $.mobile.changePage("services.html#services", {reloadPage: false, transition: 'none'});
            break;
		case "localiser": 
            //$("#firstTimeMessage").hide();
            //$('[id^=firstTimeMessage]').each(function() { $(this).hide(); });
            //$('[id^=searchForm]').each(function() { $(this).submit(search);});
            //$('[id^=submit]').each(function() { $(this).click(search);});
            //$('#searchForm').submit(search); 	
			//$('#submit').click(search);
            //alert("pagechange");
            //hideFirstTimeMessage();            
            break;
		case "comprendre": break;
		case "allerplusloin": break;
		case "contact": break;
		case "definition": 
			$("#defTitle").html(g_definitionTitle);
			$("#defValue").html(g_definitionValue);	
		break;
	}
});

function fixgeometry() {
	"use strict";
	// Some orientation changes leave the scroll position at something that isn't 0,0. This is annoying for user experience.
	scroll(0, 0);
	// Calculate the geometry that our content area should take
	var header = $(".header:visible");
	var footer = $(".footer:visible");
	var content = $(".content:visible");
	var content_height = $(window).height() - header.outerHeight() - footer.outerHeight();          
	// Trim margin/border/padding height
	content_height -= (content.outerHeight() - content.height());
	content.height(content_height);
}
       
$(document).ready(function() {
	"use strict";
	//$(window).bind("orientationchange resize pageshow", fixgeometry);
	//$('.tooltip').jqmTooltip();
	//$.mobile.fixedToolbars.setTouchToggleEnabled(false);
});

$('div:jqmData(role="page")').live('pagecreate', function(e) {	
	"use strict";
	$(e.target).find('.tooltip').jqmTooltip({'arrow': false, 'position': 'over'});
});





// jqmTooltip v1.0
// by Jon Jandoc
// jon@yupso.com

(function ($) {

    $.fn.jqmTooltip = function (options) {

        var settings = {
            'arrow': true,
            'fadeSpeed': 200,
            'maxWidth': 280,
            'minSideMargins': 15,
            'position': 'autoUnder',
            'offset': 15,
            'text': 'title'
        }, useTitle

        function showTooltip(tooltip) {
			hideTooltip('all');
            $(tooltip).addClass('active').fadeIn(settings.fadeSpeed);
        }
        function hideTooltip(tooltip) {
            if (tooltip = 'all') {
                tooltip = $('.jqmTooltip')
            }
            $(tooltip).removeClass('active').fadeOut(settings.fadeSpeed);
        }
        if (settings.text == 'title') {
        	useTitle = true;
        }
        // Hide visible tooltips when clicking rest of screen or on resize
        this.parents('div:jqmData(role="page")').bind('tap.jqmTooltip', function (e) {
			/*e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation(); 
            hideTooltip('all');*/
        });
        $(window).bind('resize.jqmTooltip', function (e) {
            //hideTooltip('all');
        });

        return this.each(function () {
            // Merge settings
            if (options) {
                $.extend(settings, options);
            }

            var $this = $(this),
            	cssStyles = {},
                tooltipID = 'tooltip-' + Math.floor(Math.random() * 1000),
                overlay, overlayWidth, overlayLeft, overlayOffset, element, elemOffset, windowHeight, windowWidth;

            // Create overlay
            overlay = $('<div class="jqmTooltip">');

            // Grab inner text from title tag by default
            if (useTitle) {
                settings.text = $this.attr('data-title');
                $this.attr('title', '');
            }
            overlay.html(settings.text)
			    .attr('id', tooltipID)
                .css('display', 'none').append('<img class="close" src="images/close.png"/>') //'<a href="#" class="close">&#215;</div>') //&#215;
                .find('.close').bind('tap', function (e) {
                    e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation (); 
                    hideTooltip('#' + tooltipID);
                });
            if (settings.arrow) {
                overlay.append('<div class="arrow">');
                var arrowLeft;
            }

            $this.parents('div:jqmData(role="page")').append(overlay);

            // Bind tap event
            $this.bind('tap.jqmTooltip', function (e) {
                e.stopPropagation();
                if (overlay.hasClass('active')) {
                    hideTooltip(overlay);
                } else {

                    element = $(e.target);
                    elemOffset = element.offset();

                    windowHeight = $(window).height();
                    windowWidth = $(window).width();
                    overlayWidth = windowWidth - (2 * settings.minSideMargins);
                    if (overlayWidth > settings.maxWidth) overlayWidth = settings.maxWidth;   
					if (overlayWidth > windowWidth) overlayWidth = windowWidth - 10;
                    cssStyles.width = overlayWidth;
					cssStyles.top = '50%'; 
                    cssStyles.bottom = 'auto';
					overlay.css(cssStyles);
                    showTooltip(overlay);
					cssStyles.left = (windowWidth - overlay.outerWidth())/2 + 'px';
                    cssStyles.top = $(window).scrollTop() + (windowHeight - overlay.outerHeight())/2; + 'px';// - settings.offset + 'px';
                    overlay.addClass('over').removeClass('under').css(cssStyles);
					return;
                };

            });

        });

    };
})(jQuery);
